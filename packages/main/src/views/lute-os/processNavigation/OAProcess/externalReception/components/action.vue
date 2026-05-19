<template>
  <el-form :model="form" ref="formRef" label-position="top">
    <KeenCard title="申请信息">
      <div style="width: 400px; margin: 0 auto">
        <el-form-item
          label="部门"
          prop="deptIdList"
          :rules="[{ required: true, trigger: 'change', message: '请选择部门' }]"
        >
          <el-tree-select
            multiple
            ref="catTreeSelectRef"
            placeholder="请选择部门"
            v-model="form.deptIdList"
            :data="deptTree"
            filterable
            clearable
            check-strictly
            popper-class="picker-cat-tree-select"
            highlight-current
          />
        </el-form-item>
        <el-form-item
          label="招待时间"
          prop="entertainTime"
          :rules="[{ required: true, message: '请选择招待时间' }]"
        >
          <el-date-picker
            style="width: 100%"
            v-model="form.entertainTime"
            type="datetime"
            placeholder="招待时间"
            value-format="YYYY-MM-DD HH:mm"
            format="YYYY-MM-DD HH:mm"
            time-format="HH:mm"
            :disabled-date="(date) => dayjs(date).isBefore(dayjs(), 'date')"
          />
        </el-form-item>

        <el-form-item
          label="参与人数"
          prop="joinNumStr"
          :rules="[{ required: true, message: '请输入参与人数' }]"
        >
          <el-input v-model="form.joinNumStr" maxlength="50" show-word-limit />
        </el-form-item>

        <el-form-item
          label="招待类型"
          prop="entertainTypeList"
          :rules="[{ required: true, trigger: 'change', message: '请选择招待类型' }]"
        >
          <el-select v-model="form.entertainTypeList" clearable multiple>
            <el-option label="订外卖" value="take_out" />
            <el-option label="订餐厅" value="canteen" />
            <el-option label="订果盘" value="fruit_bowl" />
            <el-option label="订酒店" value="hotel" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item
          label="是否预定会议室"
          prop="hasMeetingRoom"
          :rules="[{ required: true, trigger: 'change', message: '请选择是否预定会议室' }]"
        >
          <el-select v-model="form.hasMeetingRoom" clearable style="width: 100%">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <template v-if="form.hasMeetingRoom === 1">
          <el-form-item
            label="参会人"
            prop="memberCodeList"
            :rules="[{ required: true, trigger: 'change', message: '请选择参会人' }]"
            :error="memberError"
          >
            <DeptMember
              deptCode="all_dept"
              v-model="form.memberCodeList"
              multiple
              placeholder="选择参会人"
              @change="queryMemberTimeConflict"
            />
          </el-form-item>
          <el-form-item
            label="会议时间"
            prop="meetingStartTime"
            :rules="[{ required: true, trigger: 'change', message: '请选择会议时间' }]"
          >
            <!--               :disabled-date="(date) => dayjs(date).isBefore(dayjs(), 'date')" -->
            <el-date-picker
              v-model="meetingTime"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm"
              format="YYYY-MM-DD HH:mm"
              start-placeholder="会议开始时间"
              end-placeholder="会议结束时间"
              time-format="HH:mm"
              :disabled-date="(date) => dayjs(date).isBefore(dayjs().format('YYYY-MM-DD'), 'date')"
              @change="
              (t:any) => {
                form.meetingStartTime = t ? t[0] : '';
                form.meetingEndTime = t ? t[1] : '';
                form.meetingRoom = '';
                initMeetingRoom();
                queryMemberTimeConflict()
              }
            "
            />
          </el-form-item>
          <el-form-item
            label="会议地点"
            prop="meetingRoom"
            :rules="[{ required: true, trigger: 'change', message: '请选择会议地点' }]"
          >
            <el-select filterable v-model="form.meetingRoom" clearable style="width: 100%">
              <el-option
                :disabled="item.status === 1"
                :label="`${item.roomName}(${item.statusDesc})`"
                :value="item.roomId"
                v-for="item of meetingRoomList"
                :key="item.roomId"
              />
            </el-select>
          </el-form-item>
        </template>

        <el-form-item label="付款凭证" prop="payFileName">
          <div style="width: 100%">
            <KeenFileUpload
              ref="upload"
              v-model="form.payFileList"
              directory="externalReception"
              limit="9"
              :multiple="true"
              :isPublic="true"
              :showOperate="true"
              class="file-upload"
              accept=".jpg,.png,.jpeg"
            >
              <el-button type="primary" size="small">选择文件</el-button>
            </KeenFileUpload>
          </div>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            rows="4"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </div>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">提交</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { memberApi, platformApi, shopApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import dayjs from 'dayjs';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const router = useRouter();
  const route = useRoute();
  const meetingTime = ref<any[]>([]);
  const deptTreeData = ref<any[]>([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: `${item.deptId}`,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  const initDetail = async () => {
    const res = await shopApi.luteosShopBusinessQueryDetail({
      code: route.query.code,
    });
    form.value = res;
  };
  if (route.query.code) {
    initDetail();
  }
  const memberError = ref('');
  const formOrigin = {
    deptIdList: [],
    hasMeetingRoom: undefined,
    entertainTypeList: [],
    entertainTime: '',
    meetingEndTime: '',
    meetingStartTime: '',
    joinNumStr: undefined,
    memberCodeList: [],
    meetingRoom: '',
    remark: '',
    payFileList: [],
  };
  const form = ref({ ...cloneDeep(formOrigin) });
  const formRef = ref();
  const meetingRoomList = ref<any[]>([]);
  const initMeetingRoom = async () => {
    if (form.value.hasMeetingRoom && form.value.meetingStartTime && form.value.meetingEndTime) {
      const res = await platformApi.platformMeetingRoomQueryMeetingRoomList({
        meetingStartTime: form.value.meetingStartTime,
        meetingEndTime: form.value.meetingEndTime,
      });
      meetingRoomList.value = (res.meetingRoomList as []).sort(
        (a: any, b: any) => a.status - b.status
      );
    }
  };
  const queryMemberTimeConflict = async () => {
    memberError.value = '';
    if (
      form.value.hasMeetingRoom &&
      form.value.meetingStartTime &&
      form.value.meetingEndTime &&
      form.value.memberCodeList.length
    ) {
      const res = await platformApi.platformEntertainQueryConflictList({
        memberCodeList: form.value.memberCodeList,
        meetingStartTime: form.value.meetingStartTime,
        meetingEndTime: form.value.meetingEndTime,
      });
      if (res.memberList?.length) {
        memberError.value = `${res.memberList
          .map((item: any) => item.memberName)
          .join(',')}存在会议冲突`;
      } else {
        memberError.value = '';
      }
    }
  };
  const saveLoading = ref(false);
  const cancel = () => {
    router.push({
      name: 'externalReception',
    });
  };
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params: any = {
        deptIdList: form.value.deptIdList,
        entertainTime: form.value.entertainTime,
        joinNumStr: form.value.joinNumStr,
        entertainTypeList: form.value.entertainTypeList,
        payFileList: form.value.payFileList.map((item: any) => ({
          fileKey: item.ossKey,
          payFileName: item.name,
        })),
        remark: form.value.remark,
      };
      if (form.value.hasMeetingRoom === 1) {
        params.memberCodeList = form.value.memberCodeList;
        params.meetingRoom = form.value.meetingRoom;
        params.meetingStartTime = form.value.meetingStartTime;
        params.meetingEndTime = form.value.meetingEndTime;
      }
      saveLoading.value = true;
      await platformApi
        .platformEntertainSaveEntertain({
          ...params,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('操作成功');
      cancel();
    }
  };
</script>

<style scoped lang="scss">
  :deep(.el-upload-list--text) {
    width: 334px;
    flex: 1;
    .el-upload-list__item {
      display: flex;
      padding-right: 100px;
    }
  }
</style>
