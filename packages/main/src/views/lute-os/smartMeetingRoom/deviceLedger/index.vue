<template>
  <div class="smart-meeting-room-device-ledger-page">
    <!-- <div class="page-title">设备台账管理</div> -->
    <KeenList @refresh="fetchTable" @reset-search="handleReset">
      <template #search>
        <el-input
          v-model="filters.keyword"
          clearable
          placeholder="搜索设备名称/设备编码"
          class="w-280"
          @input="handleFiltersChange"
          @clear="handleFiltersChange"
        />
      </template>

      <template #filters>
        <el-select
          v-model="filters.roomCode"
          filterable
          clearable
          placeholder="所属会议室"
          class="w-220"
          @change="handleFiltersChange"
          @clear="handleFiltersChange"
        >
          <el-option
            v-for="opt in roomSelectOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>

        <el-select
          v-model="filters.onlineStatusList"
          multiple
          clearable
          placeholder="设备在线状态"
          class="w-220"
          @change="handleFiltersChange"
          @clear="handleFiltersChange"
        >
          <el-option label="在线" value="在线" />
          <el-option label="离线" value="离线" />
        </el-select>
      </template>

      <template #buttons>
        <el-button
          type="primary"
          :loading="syncLoading"
          @click="handleSyncThirdParty"
          v-permission="'syncThirdParty'"
        >
          {{ syncLoading ? '正在获取中...' : '获取第三方设备信息' }}
        </el-button>
      </template>

      <template #default="{ tableHeight }">
        <el-table :data="tableData" v-loading="tableLoading" :max-height="tableHeight">
          <el-table-column prop="deviceName" label="设备名称" min-width="170" show-overflow-tooltip>
            <template #default="{ row }">
              <el-link type="primary" :underline="false" @click="handleGoDetail(row)">
                {{ row.deviceName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="deviceCode"
            label="设备编码"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column prop="deviceTypeName" label="设备类型" min-width="110" />
          <el-table-column
            prop="roomName"
            label="所属会议室"
            min-width="160"
            show-overflow-tooltip
          />
          <el-table-column prop="macAddress" label="MAC地址" min-width="150" />
          <el-table-column label="当前状态" min-width="140">
            <template #default="{ row }">
              <div class="current-status-cell">
                <span class="status-text">{{ row.currentStatus }}</span>
                <el-switch
                  :model-value="row.currentStatus"
                  active-value="ON"
                  inactive-value="OFF"
                  :loading="!!statusLoadingMap[row.deviceCode]"
                  :before-change="() => handleBeforeToggleStatus(row)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="设备在线状态" min-width="120">
            <template #default="{ row }">
              <div class="online-status-cell">
                <span
                  class="status-dot"
                  :class="{
                    online: row.onlineStatus === '在线',
                    offline: row.onlineStatus === '离线',
                  }"
                ></span>
                <span class="status-label">{{ row.onlineStatus }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="lastOnlineAt" label="设备最后在线时间" min-width="170" />
          <el-table-column label="操作" width="140" fixed="right">
            <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="handleOpenDebug(row)"
                v-permission="'device:debug'"
              >
                调试
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <KeenPagination
          :current="pagination.pageNum"
          :page-size="pagination.pageSize"
          :page-size-option="[10, 20, 50, 100]"
          :total="pagination.total"
          @size-change="handlePageSizeChange"
          @current-change="handlePageNumChange"
        />
      </template>
    </KeenList>

    <DeviceLedgerDebugDialog
      v-model:visible="debugVisible"
      v-model:status="debugStatus"
      :row="activeRow"
      :loading="debugLoading"
      @confirm="handleExecuteDebug"
    />
  </div>
</template>

<script setup lang="ts" name="smartMeetingRoomDeviceLedger">
  import { useRouter, useRoute } from 'vue-router';
  import { useDebounceFn } from '@vueuse/core';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { getDeviceLedgerApi } from './api';
  import DeviceLedgerDebugDialog from './components/DeviceLedgerDebugDialog.vue';

  type OnlineStatus = '在线' | '离线' | '未知';
  type CurrentStatus = 'ON' | 'OFF';

  type DeviceLedgerRow = {
    deviceCode: string;
    deviceName: string;
    deviceTypeName: string;
    roomCode: string;
    roomName: string;
    macAddress: string;
    currentStatus: CurrentStatus;
    onlineStatus: OnlineStatus;
    lastOnlineAt: string;
  };

  const api = getDeviceLedgerApi();

  const filters = reactive<{
    keyword: string;
    roomCode: string;
    onlineStatusList: OnlineStatus[];
  }>({
    keyword: '',
    roomCode: '',
    onlineStatusList: [],
  });

  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const tableLoading = ref(false);
  const tableData = ref<DeviceLedgerRow[]>([]);
  const syncLoading = ref(false);

  const roomSelectOptions = ref<{ label: string; value: string }[]>([]);

  const activeRow = ref<DeviceLedgerRow | null>(null);
  const debugVisible = ref(false);
  const debugStatus = ref<CurrentStatus>('ON');
  const debugLoading = ref(false);
  const statusLoadingMap = reactive<Record<string, boolean>>({});

  const normalizeLastOnlineAt = (value: string) => {
    const formatted = dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : value;
    return formatted;
  };

  const fetchTable = async () => {
    tableLoading.value = true;
    try {
      const res = await api.queryDeviceLedgerList({
        keyword: filters.keyword,
        roomCode: filters.roomCode,
        onlineStatusList: filters.onlineStatusList,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      } as any);

      pagination.total = res.total ?? 0;
      tableData.value = (res.deviceLedgerList ?? []).map((item: any) => ({
        ...item,
        lastOnlineAt: normalizeLastOnlineAt(item.lastOnlineAt),
      }));
    } catch (error: any) {
      ElMessage.error(error?.message || '查询设备台账失败');
    } finally {
      tableLoading.value = false;
    }
  };

  const debouncedFetchTable = useDebounceFn(fetchTable, 300);

  const fetchRoomSelectOptions = async () => {
    const res = await api.queryMeetingRoomSelectList({});
    roomSelectOptions.value = (res.roomList ?? []) as any;
  };

  const handleFiltersChange = () => {
    pagination.pageNum = 1;
    debouncedFetchTable();
  };

  const handleReset = () => {
    filters.keyword = '';
    filters.roomCode = '';
    filters.onlineStatusList = [];
    pagination.pageNum = 1;
    debouncedFetchTable();
  };

  const handlePageNumChange = (pageNum: number) => {
    pagination.pageNum = pageNum;
    fetchTable();
  };

  const handlePageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.pageNum = 1;
    fetchTable();
  };

  const handleSyncThirdParty = async () => {
    syncLoading.value = true;
    try {
      await api.syncThirdPartyDevices();
      ElMessage.success('更新完成');
      await fetchTable();
    } catch (error: any) {
      ElMessage.error(error?.message || '更新失败');
    } finally {
      syncLoading.value = false;
    }
  };

  const router = useRouter();
  const route = useRoute();
  const handleGoDetail = (row: DeviceLedgerRow) => {
    router.push({
      name: 'smartMeetingRoomDeviceLedgerDetail',
      params: { deviceCode: row.deviceCode },
      query: route.query,
    });
  };

  const handleOpenDebug = (row: DeviceLedgerRow) => {
    activeRow.value = row;
    debugStatus.value = row.currentStatus;
    debugVisible.value = true;
  };

  const handleExecuteDebug = async () => {
    if (!activeRow.value) return;

    debugLoading.value = true;
    try {
      await api.debugDevice(activeRow.value.deviceCode, debugStatus.value);
      await swal.confirm({
        title: '执行成功',
        text: `${activeRow.value.deviceName}已${debugStatus.value === 'ON' ? '打开' : '关闭'}！`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: '确认',
      });
      debugVisible.value = false;
      await fetchTable();
    } catch (error: any) {
      await swal.confirm({
        title: '执行失败',
        text: error?.message || '执行失败',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: '确认',
      });
    } finally {
      debugLoading.value = false;
    }
  };

  const handleBeforeToggleStatus = async (row: DeviceLedgerRow) => {
    if (statusLoadingMap[row.deviceCode]) return false;

    const nextStatus: CurrentStatus = row.currentStatus === 'ON' ? 'OFF' : 'ON';

    const ok = await swal.confirm({
      title: '确认操作',
      text: `确认要将设备【${row.deviceName}】${nextStatus === 'ON' ? '打开' : '关闭'}吗？`,
      icon: 'warning',
    });
    if (!ok) return false;

    statusLoadingMap[row.deviceCode] = true;
    try {
      await api.debugDevice(row.deviceCode, nextStatus);
      row.currentStatus = nextStatus;
      ElMessage.success(nextStatus === 'ON' ? '已开启' : '已关闭');
      await fetchTable();
      return false;
    } catch (error: any) {
      ElMessage.error(error?.message || '操作失败');
      return false;
    } finally {
      statusLoadingMap[row.deviceCode] = false;
    }
  };

  onActivated(() => {
    fetchTable();
  });

  fetchRoomSelectOptions();
  fetchTable();
</script>

<style lang="scss" scoped>
  .smart-meeting-room-device-ledger-page {
    width: 100%;
    .page-title {
      font-weight: 600;
      font-size: 16px;
      margin: 12px 0;
      padding-left: 16px;
    }

    .w-280 {
      width: 280px;
    }

    .w-220 {
      width: 220px;
    }

    .current-status-cell {
      display: flex;
      align-items: center;
      gap: 10px;

      .status-text {
        width: 36px;
        font-weight: 600;
      }
    }

    .online-status-cell {
      display: flex;
      align-items: center;
      gap: 8px;

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #999; // 默认灰色

        &.online {
          background-color: #02b96b;
          box-shadow: 0 0 8px rgba(2, 185, 107, 0.4);
        }

        &.offline {
          background-color: #f5222d; // 离线通常使用更显眼的红色或深灰，这里参考设计师审美
        }
      }

      .status-label {
        font-size: 14px;
        color: #333;
      }
    }
  }
</style>
