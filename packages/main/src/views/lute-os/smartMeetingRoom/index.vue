<template>
  <div class="smart-meeting-room-page">
    <RoomTypeTabs
      v-model:roomType="roomType"
      class="room-type-tabs"
      @change="handleRoomTypeChange"
    />

    <div class="main-content">
      <!-- 左侧：会议室列表区 -->
      <KeenCard class="w-40">
        <div class="room-list-section">
          <div class="room-list-header">
            <span class="room-list-title">会议室列表</span>
            <el-input
              v-model="search"
              placeholder="搜索会议室"
              class="room-search-input"
              clearable
              @input="onSearchInput"
            >
              <template #prefix>
                <i class="iconfont icon-sousuo1" style="font-weight: 400"></i>
              </template>
            </el-input>
          </div>
          <!-- 会议室列表 -->
          <MeetingRoomList
            :rooms="rooms"
            :activeRoom="activeRoom"
            @select="handleRoomSelect"
            v-model:pageSize="roomPageSize"
            v-model:page="roomCurrentPage"
            @page="handleRoomPageChange"
            @pageSize="handleRoomSizeChange"
            :total="roomTotal"
            v-if="rooms.length"
          />
          <el-empty v-if="!rooms.length" description="暂无搜索结果">
            <el-button type="text" @click="resetSearch">清除搜索</el-button>
          </el-empty>
        </div>
      </KeenCard>

      <!-- 右侧：设备列表区 -->
      <KeenCard class="w-100">
        <div class="equipment-list-section">
          <div class="equipment-header">
            <span class="equipment-title">{{ activeRoom?.roomName }}设备列表</span>
            <el-button type="primary" @click="handleAddDevice">添加设备</el-button>
            <el-button
              type="danger"
              @click="handleDeleteDevice"
              :disabled="!activeRoom?.devices.length"
            >
              删除设备
            </el-button>
            <div
              class="refresh-icon cursor-pointer"
              @click="handleRefresh"
              :class="{ loading: refreshing }"
              role="button"
              aria-label="刷新设备列表"
            >
              <i
                class="iconfont icon-shuaxinjiazai"
                :class="{ 'rotate-animation': refreshing }"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <!-- 设备列表 -->
          <EquipmentList
            :devices="activeRoom?.devices || []"
            v-if="activeRoom?.devices.length"
            :beforeSwitch="handleBeforeSwitch"
            @switch="handleSwitch"
          />
          <el-empty :description="'暂无关联设备'" v-else />
        </div>
        <KeenPagination
          v-if="activeRoom?.devices.length"
          v-model:page="deviceCurrentPage"
          v-model:page-size="devicePageSize"
          :total="deviceTotal"
          layout="total, prev, pager, next, sizes"
          :page-size-option="[5, 10, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </KeenCard>
    </div>
  </div>

  <!-- 添加设备的弹框 -->
  <DeviceDialog
    v-model:visible="addDeviceDialogVisible"
    confirmText="确认添加"
    confirmType="primary"
  >
    <template #title>
      <div class="device-dialog-title">为{{ activeRoom?.roomName }}添加设备</div>
    </template>
    <template #form>
      <DeviceForm
        v-model:form="deviceForm"
        :deviceList="deviceList"
        @deviceTypeChange="handleDeviceTypeChange"
        operationType="add"
      />
    </template>
    <template #footer>
      <el-button
        type="primary"
        @click="handleConfirmOperationDevice('add')"
        :disabled="disableConfirmAddButton"
      >
        确认添加
      </el-button>
      <el-button @click="handleCancelOperationDevice('add')">取消</el-button>
    </template>
  </DeviceDialog>

  <!-- 二次确认的弹框 -->
  <DeviceDialog
    v-model:visible="confirmOperationDeviceDialogVisible"
    confirmText="确认"
    confirmDialog
  >
    <template #title>
      <div class="device-dialog-title">是否确认</div>
    </template>
    <template #confirmText>
      <template v-if="confirmType === 'primary'">
        <div v-if="!linkedRoomNames">
          是否确认将设备【{{
            deviceList.find((item) => deviceForm.deviceCode === item.deviceCode).deviceDesc
          }}】添加到【{{ activeRoom?.roomName }}】?
        </div>
        <div v-else>
          是否确认将设备【{{
            deviceList.find((item) => deviceForm.deviceCode === item.deviceCode).deviceDesc
          }}】从【{{ linkedRoomNames }}】取消关联，并将其关联到【{{ activeRoom?.roomName }}】?
        </div>
      </template>
      <template v-else>
        <div>
          是否确认将设备【{{
            activeRoom?.devices.find((item) => item.deviceCode === deviceForm.deviceCode)
              ?.deviceName
          }}】从【{{ activeRoom?.roomName }}】取消关联?
        </div>
      </template>
    </template>
    <template #footer>
      <el-button :type="confirmType" @click="confirmOperationDevice" :loading="loading">
        确认
      </el-button>
      <el-button @click="confirmOperationDeviceDialogVisible = false">取消</el-button>
    </template>
  </DeviceDialog>

  <!-- 删除设备的弹框 -->
  <DeviceDialog v-model:visible="deleteDeviceDialogVisible" confirmText="删除" confirmType="danger">
    <template #title>
      <div class="device-dialog-title">删除{{ activeRoom?.roomName }}的设备</div>
    </template>
    <template #form>
      <DeviceForm
        v-model:form="deviceForm"
        :deviceList="deviceList"
        operationType="delete"
        @deviceTypeChange="handleDeviceTypeChange"
      />
    </template>
    <template #footer>
      <el-button
        type="danger"
        @click="handleConfirmOperationDevice('delete')"
        :loading="loading"
        :disabled="disableConfirmAddButton"
      >
        确认
      </el-button>
      <el-button @click="handleCancelOperationDevice('delete')">取消</el-button>
    </template>
  </DeviceDialog>
</template>

<script setup name="smartMeetingRoom">
  import { platformApi } from '@/api';
  import { useDebounceFn, useThrottleFn } from '@vueuse/core';
  import RoomTypeTabs from './components/RoomTypeTabs.vue';
  import MeetingRoomList from './components/MeetingRoomList.vue';
  import EquipmentList from './components/EquipmentList.vue';
  import DeviceDialog from './components/DeviceDialog.vue';
  import DeviceForm from './components/DeviceForm.vue';
  import { ElMessage } from 'element-plus';

  const roomType = ref('all');
  const search = ref('');
  const addDeviceDialogVisible = ref(false);
  const deleteDeviceDialogVisible = ref(false);
  const confirmOperationDeviceDialogVisible = ref(false);
  const loading = ref(false);
  const refreshing = ref(false);

  const deviceForm = reactive({
    deviceCode: '',
    deviceModel: '',
    deviceType: '',
    operationHours: '',
  });

  const rooms = reactive([]);
  const activeRoom = ref({
    roomCode: '',
    roomName: '',
    roomCategory: 0,
    roomCapacity: 0,
    address: '',
    floor: '',
    locationHint: '',
    status: 0, // 0 空闲
    devices: [], // 保证有 devices 字段
  });
  const deviceList = reactive([]);

  const roomCurrentPage = ref(1);
  const roomPageSize = ref(5);
  const roomTotal = ref(0);
  const deviceCurrentPage = ref(1);
  const devicePageSize = ref(5);
  const deviceTotal = ref(0);

  const confirmType = ref('primary');

  async function handleRoomSelect(room) {
    deviceCurrentPage.value = 1;
    activeRoom.value = { ...room, devices: [] };
    await queryRoomDevices(activeRoom.value);
  }

  async function handleAddDevice() {
    if (!activeRoom.value.roomCode) {
      ElMessage.warning('请先选择一个会议室');
      return;
    }
    await queryDeviceList('add');
    addDeviceDialogVisible.value = true;
  }

  async function handleDeleteDevice() {
    await queryDeviceList('delete');
    deleteDeviceDialogVisible.value = true;
  }

  function handleRoomTypeChange(type) {
    console.log(type);
    queryRoomList();
  }

  async function confirmOperationDevice() {
    const operationFunc =
      confirmType.value === 'primary'
        ? platformApi.platformMeetingSaveMeetingRoomDevice
        : platformApi.platformMeetingDeleteMeetingRoomDevice;

    try {
      loading.value = true;
      await operationFunc({
        roomCode: activeRoom.value.roomCode,
        ...deviceForm,
      });

      // 1. 关闭相关弹窗
      confirmOperationDeviceDialogVisible.value = false;
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (confirmType.value === 'primary') {
        addDeviceDialogVisible.value = false;
      } else {
        deleteDeviceDialogVisible.value = false;
      }

      // 2. 清空表单
      Object.assign(deviceForm, {
        deviceCode: '',
        deviceModel: '',
        deviceType: '',
        operationHours: '',
      });

      // 3. 刷新当前会议室的设备列表（带分页参数）
      await queryRoomDevices(activeRoom.value);
      deviceCurrentPage.value = 1; // 刷新后重置分页

      // 4. 刷新设备选择器列表（避免已选设备还出现下次下拉）
      await queryDeviceList('add');

      // 5. 提示
      ElMessage.success(confirmType.value === 'primary' ? '设备添加成功' : '设备删除成功');
    } catch (error) {
      console.error('confirmOperationDevice error', error);
      ElMessage.error(confirmType.value === 'primary' ? '设备添加失败' : '设备删除失败');
    } finally {
      loading.value = false;
    }
  }

  function handleCancelOperationDevice(type) {
    if (type === 'add') {
      addDeviceDialogVisible.value = false;
    } else {
      deleteDeviceDialogVisible.value = false;
    }
    setTimeout(() => {
      Object.assign(deviceForm, {
        deviceCode: '',
        deviceModel: '',
        deviceType: '',
        operationHours: '',
      });
    }, 300);
  }

  function handleConfirmOperationDevice(type) {
    confirmType.value = type === 'add' ? 'primary' : 'danger';
    confirmOperationDeviceDialogVisible.value = true;
  }

  function handleBeforeSwitch(device, currentState) {
    if (activeRoom.value?.status === 1) {
      ElMessage.warning('当前会议室有人正在使用，无法操作设备。');
      return false;
    }
    return true;
  }
  async function doSwitch(device) {
    const { status } = device;
    try {
      await platformApi.platformMeetingChangeDeviceStatus({
        deviceCode: device.deviceCode,
        status,
      });
      await queryRoomDevices(activeRoom.value);
      ElMessage.success(status === 1 ? '已开启' : '已关闭');
    } catch (error) {
      console.error('handleSwitch error', error);
      ElMessage.error('修改设备状态失败');
    }
  }

  // 使用节流包装，1000ms内只会触发一次
  const handleSwitch = useThrottleFn(doSwitch, 1000, false);
  async function handleRefresh() {
    if (!activeRoom.value?.roomCode) {
      ElMessage.warning('请先选择一个会议室');
      return;
    }
    if (refreshing.value) return;

    refreshing.value = true;
    try {
      await queryRoomDevices(activeRoom.value);
      await queryDeviceList('add');
      ElMessage.success('设备列表已刷新');
    } catch (err) {
      console.error('refresh error', err);
      ElMessage.error('刷新设备列表失败');
    } finally {
      setTimeout(() => {
        refreshing.value = false;
      }, 150);
    }
  }

  function resetSearch() {
    search.value = '';
    roomCurrentPage.value = 1;
    roomType.value = 'all';
    queryRoomList();
  }
  const linkedRoomNames = computed(() => {
    console.log(
      deviceList.find((item) => deviceForm.deviceCode === item.deviceCode)?.roomName,
      'linkedRoomNames'
    );
    return deviceList.find((item) => deviceForm.deviceCode === item.deviceCode)?.roomName;
  });
  /** 查询会议室列表 */
  async function queryRoomList() {
    try {
      const res = await platformApi.platformMeetingQueryRoomList({
        roomCategory: roomType.value === 'all' ? undefined : roomType.value,
        keyword: search.value,
        pageNum: 1,
        pageSize: 100,
      });
      rooms.length = 0;
      res.meetingRoomList?.forEach((item) => rooms.push({ ...item, devices: [] }));
      roomTotal.value = res.total || res.meetingRoomList.length;
    } catch (error) {
      console.error('queryRoomList error', error);
    }
    // 默认选中第一个会议室
    // activeRoom.value = rooms[0] || null;
    // queryRoomDevices(activeRoom.value);
  }

  /** 查询设备下拉列表（添加设备时用） */
  async function queryDeviceList(operationType, deviceType = undefined) {
    try {
      const res = await platformApi.platformMeetingQueryRoomDeviceSelectList({
        roomCode: operationType === 'add' ? undefined : activeRoom.value?.roomCode,
        // roomCode: activeRoom.value?.roomCode,
        deviceType,
        pageNum: 1,
        pageSize: 100,
      });

      if (res && Array.isArray(res.deviceList) && res.deviceList.length > 0) {
        deviceList.length = 0;
        deviceList.push(...res.deviceList);
        return;
      } else {
        deviceList.length = 0;
      }
    } catch (error) {
      console.error('queryDeviceList error', error);
    }
  }
  function handleDeviceTypeChange(data) {
    queryDeviceList(data.operationType, data.deviceType);
    console.log('handleDeviceTypeChange', deviceList);
  }
  /** 添加/删除设备时，禁用确认按钮的逻辑 */
  const disableConfirmAddButton = computed(() => {
    return ['deviceCode', 'deviceType'].some(
      (key) => deviceForm[key] === '' || deviceForm[key] == null
    );
  });

  /** 查询某个会议室下的设备列表（右侧展示用） */
  async function queryRoomDevices(room) {
    if (!room?.roomCode) {
      console.warn('没有会议室编码，无法查询设备');
      return;
    }

    try {
      const res = await platformApi.platformMeetingQueryRoomDeviceList({
        roomCode: room.roomCode,
        pageNum: deviceCurrentPage.value,
        pageSize: devicePageSize.value,
      });

      if (res && Array.isArray(res.meetingRoomDeviceList) && res.meetingRoomDeviceList.length > 0) {
        activeRoom.value = {
          ...room,
          devices: res.meetingRoomDeviceList,
        };
        console.log('激活会议室的设备已添加', activeRoom.value, res.meetingRoomDeviceList.length);
        deviceTotal.value = res.total || res.meetingRoomDeviceList.length;
      } else {
        activeRoom.value = {
          ...room,
          devices: [],
        };
        deviceTotal.value = 0;
      }
    } catch (error) {
      console.error('queryRoomDevices error', error);
    }
  }

  const onSearchInput = useDebounceFn(() => {
    roomCurrentPage.value = 1;
    queryRoomList();
  }, 500);
  queryRoomList();

  function handleRoomSizeChange(size) {
    roomPageSize.value = size;
    queryRoomList();
  }
  function handleRoomPageChange(page) {
    roomCurrentPage.value = page;
    queryRoomList();
  }
  function handleSizeChange(size) {
    devicePageSize.value = size;
    queryRoomDevices(activeRoom.value);
  }

  function handleCurrentChange(page) {
    deviceCurrentPage.value = page;
    queryRoomDevices(activeRoom.value);
  }
</script>

<style lang="scss" scoped>
  @use './styles/index.scss';
</style>
