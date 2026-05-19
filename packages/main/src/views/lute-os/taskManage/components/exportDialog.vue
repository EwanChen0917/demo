<template>
  <el-dialog
    class="custom-dialog"
    width="670px"
    :title="title"
    v-model="visible"
    @close="visible = false"
  >
    <template #header>
      <div class="header-title">导出任务</div>
    </template>
    <div class="title">导出筛选内容</div>
    <div class="form">
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/avatar.svg" alt="" />
          <span>任务执行人</span>
        </div>
        <div class="form-item-content">
          <DeptMember
            id="handlerSelect"
            class="w-100"
            v-model="search.handlerList"
            size="small"
            multiple
            selectAll
            :maxCollapseTags="3"
            :clearable="false"
            @change="
              (val) => {
                search.handlerList = val;
              }
            "
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/avatar.svg" alt="" />
          <span>任务创建人</span>
        </div>
        <div class="form-item-content">
          <DeptMember
            id="creatorSelect"
            class="w-100"
            v-model="search.creatorList"
            size="small"
            multiple
            selectAll
            :maxCollapseTags="3"
            :clearable="false"
            @change="
              (val) => {
                search.creatorList = val;
              }
            "
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/clock.svg" alt="" />
          <span>截止时间</span>
        </div>
        <div class="form-item-content">
          <el-date-picker
            class="w-100"
            v-model="search.endDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            clearable
            size="small"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/category.svg" alt="" />
          <span>任务类别</span>
        </div>
        <div class="form-item-content">
          <el-select v-model="search.taskCategoryCode" class="w-100" size="small">
            <el-option
              v-for="item in categoryOptions"
              :value="item.taskCategoryCode"
              :label="item.taskCategoryName"
              :key="item.taskCategoryCode"
            />
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/source.svg" alt="" />
          <span>任务来源</span>
        </div>
        <div class="form-item-content">
          <el-select class="w-100" v-model="search.sourceList" multiple size="small">
            <el-option :value="1" label="日常反馈" />
            <el-option :value="2" label="重点会议" />
            <el-option :value="3" label="CEO指示" />
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/weekReport.svg" alt="" />
          <span>周报包含时间</span>
        </div>
        <div class="form-item-content">
          <el-date-picker
            class="w-100"
            v-model="search.weekReportDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            clearable
            size="small"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item-label">
          <img class="icon" src="@/assets/svgs/status.svg" alt="" />
          <span>状态</span>
        </div>
        <div class="form-item-content">
          <el-select class="w-100" v-model="search.statusList" placeholder="任务状态" multiple collapse collapse-tags max-collapse-tags="2">
            <template #label="{ label, value }">
              <StatusTag :status="value">{{ label }}</StatusTag>
            </template>
            <el-option v-for="(val, key) in statusMap" :key="key" :label="val" :value="key">
              <StatusTag :status="key">{{ val }}</StatusTag>
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">导出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { memberApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import StatusTag from '@/views/lute-os/taskManage/components/statusTag.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const statusMap = {
    0: '未开始',
    1: '进行中未延期',
    2: '预计延期',
    3: '延期一周',
    4: '延期1~2周',
    5: '延期两周以上',
    6: '已关闭',
  };
  const router = useRouter();
  const visible = ref(false);
  const title = ref('');

  const search = ref({
    creatorList: ['all'],
    handlerList: ['all'],
    endDate: [],
    weekReportDate: [],
    sourceList: [1, 2, 3],
    statusList: ['0', '1', '2', '3', '4', '5', '6'],
    taskCategoryCode: '',
  });

  const categoryOptions = ref<any[]>([]);
  const getCategoryOptions = async () => {
    const res = await platformApi.platformTaskGetTaskCategoryList();
    categoryOptions.value = res.taskCategoryList || [];
  };
  getCategoryOptions();

  const saveLoading = ref(false);
  const save = async () => {
    if (!search.value.handlerList?.length) return ElMessage.warning('请选择任务执行人');
    if (!search.value.creatorList?.length) return ElMessage.warning('请选择任务创建人');
    if (!search.value.endDate?.length) return ElMessage.warning('请选择截止时间');
    if (!search.value.weekReportDate?.length) return ElMessage.warning('请选择周报包含时间');
    if (!search.value.sourceList?.length) return ElMessage.warning('请选择任务来源');
    if (!search.value.taskCategoryCode?.length) return ElMessage.warning('请选择任务类别');
    if (!search.value.statusList?.length) return ElMessage.warning('请选择状态');
    try {
      saveLoading.value = true;
      const res = await platformApi.platformTaskExport({
        ...search.value,
        creatorList: search.value.creatorList?.includes('all') ? [] : search.value.creatorList,
        handlerList: search.value.handlerList?.includes('all') ? [] : search.value.handlerList,
        startDate: search.value.endDate?.[0],
        endDate: search.value.endDate?.[1],
        weekReportStartDate: search.value.weekReportDate?.[0],
        weekReportEndDate: search.value.weekReportDate?.[1],
      });
      visible.value = false;
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;

      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      openWindow(path.href);
    } finally {
      saveLoading.value = false;
    }
  };

  /* const memberList = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    memberList.value = res.memberList?.map((item) => item?.memberCode);
  };
*/
  const open = () => {
    search.value = {
      creatorList: ['all'],
      handlerList: ['all'],
      endDate: [],
      weekReportDate: [],
      sourceList: [1, 2, 3],
      statusList: ['0', '1', '2', '3', '4', '5', '6'],
    };
    // getOperatorOptions();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .title {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    color: rgba(60, 61, 64, 1);
    margin-bottom: 18px;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &-item {
      display: flex;
      &-label {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 200px;
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: 400;
        line-height: 22.4px;
        color: rgba(151, 151, 151, 1);
        &::before {
          content: '*';
          color: var(--el-color-danger);
          margin-right: 4px;
          font-size: 14px;
        }
        .icon {
          width: 16px;
          height: 16px;
        }
      }
      &-content {
        flex: 1;
      }
    }
  }
</style>
