<template>
  <div class="create-report" v-if="isShowPanel" :key="tick">
    <div class="create-report-header">
      <span>{{ rowData?.reportId ? '编辑报告' : '创建报告' }}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="onCancel"
      >
        <path
          d="M5 15L15 5"
          stroke="#999999"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 15L5 5"
          stroke="#999999"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <el-form
      class="create-report-content"
      :model="formData"
      ref="formRef"
      label-position="top"
      :rules="rules"
    >
      <!-- 分析对象 -->
      <el-form-item label="报告标题" prop="reportTitle" required>
        <el-input
          v-model="formData.reportTitle"
          placeholder="请输入分析报告标题"
          class="create-report-dialog-form-item"
        />
      </el-form-item>

      <!-- 分析周期 -->
      <el-form-item label="分析周期" prop="period" required>
        <WeekPicker v-model="formData.period" :date-type="dateType" />
      </el-form-item>
      <!-- 分析周期 -->
      <el-form-item
        v-if="groupAreaOptions?.length > 1"
        label="GTM组&区域"
        prop="groupAreaId"
        :rules="[
          {
            required: true,
            message: '请选择GTM组&区域',
          },
        ]"
      >
        <el-select
          v-model="formData.groupAreaId"
          :disabled="![undefined, null].includes(formData.groupAreaId)"
          @change="handleChangeGroupAreaId"
        >
          <el-option
            v-for="option in groupAreaOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item
        v-for="row in editorConfigList"
        :key="row.configId"
        :label="row.title"
        :prop="`content.${row.configId}`"
      >
        <WeeklyReportEditor v-model:content="formData.content[row.configId]" />
      </el-form-item>
    </el-form>
    <div class="create-report-footer">
      <div class="update-time">
        <span v-if="updateTime" style="flex: 1">{{ updateTime }} 本地自动保存成功</span>
        <span v-else>所写内容每间隔30s会自动保存</span>
      </div>
      <el-button @click="onCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="onConfirm()">完成</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import advancedFormat from 'dayjs/plugin/advancedFormat';
  import { mpcWeeklyReportApi, type MpcWeeklyReportContracts } from '@/api';
  import { WeeklyReportType } from '@/utils/weeklyReportType';
  import WeeklyReportEditor from '@/views/report/components/LtAnalysisReport/components/WeeklyReportEditor.vue';
  import {
    MarketWeeklyReportCreateReq,
    MarketWeeklyReportDetailCreateReq,
  } from '@/api/MPCWeeklyReport/data-contracts';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import WeekPicker from './components/WeekPicker.vue';

  dayjs.extend(weekOfYear);
  dayjs.extend(advancedFormat);

  const dateType = inject('dateType', 'week');
  const reportType = ref<WeeklyReportType>(WeeklyReportType.DefaultType);
  const branch: ComputedRef<string> = inject('branch')!;

  const isShowPanel = ref(false);

  const rowData = ref(null);
  const detailData = ref(null);

  const tick = ref(0);

  const editorConfigList = ref([]);

  const formRef = ref();
  const formData = ref({
    reportTitle: '',
    groupAreaId: undefined,
    period: '',
    branch: '',
    content: {},
  });

  const emit = defineEmits<{
    beforeInitColumns: [
      MpcWeeklyReportContracts.WeekReportConfigBean[] | undefined,
      WeeklyReportType
    ];
    refresh: [boolean];
    hidePanel: [];
    skipList: [
      {
        period: string;
        branch: string;
        reportType: WeeklyReportType;
      }
    ];
  }>();

  const showPanel = async (detail) => {
    reportType.value = detail.reportType;
    formData.value.reportTitle = '';
    formData.value.groupAreaId = detail.groupAreaId;
    formData.value.period = '';
    formData.value.branch = '';
    formData.value.content = {};
    editorConfigList.value = [];
    rowData.value = detail;
    detailData.value = null;
    isShowPanel.value = true;
    tick.value++;
    // 初始化表单数据
    const isMultiType = await queryGroupArea();
    if (!isMultiType || ![null, undefined].includes(detail.groupAreaId)) {
      await getConfig();
    }
    if (detail?.reportId) {
      const res = await mpcWeeklyReportApi.luteosMarketWeekReportQueryReportDetail({
        reportId: detail.reportId,
      });
      detailData.value = res;
      if (res) {
        formData.value.reportTitle = detail.reportTitle;
        formData.value.period = detail.period;
        formData.value.branch = detail.branch;
        const obj = {};
        (res.itemList || []).forEach((item) => {
          obj[item.configId] = item.configContent;
        });
        formData.value.content = obj;
      }
    }
    // 启动自动保存
    nextTick(() => {
      autoSave();
    });
  };

  const hidePanel = (isManual = true) => {
    isShowPanel.value = false;
    timeId && clearTimeout(timeId);
    updateTime.value = '';
    isManual && emit('refresh', false);
    emit('hidePanel');
  };

  defineExpose({
    showPanel,
    hidePanel,
  });

  const rules = {
    reportTitle: [{ required: true, message: '请输入报告标题', trigger: 'blur' }],
    period: [{ required: true, message: '请选择分析周期', trigger: 'blur' }],
  };
  const groupAreaOptions = ref<{ label: string; value: number; reportType: number }[]>([]);
  const queryGroupArea = async () => {
    // TODO 查询GTM组&区域列表
    const { currentGroupAreaList } =
      await mpcWeeklyReportApi.luteosMarketWeekReportQueryCurrentGroupArea();
    if (!currentGroupAreaList?.length) {
      return false;
    }
    const options =
      currentGroupAreaList?.map((item) => ({
        label: `${item.groupName}-${item.typeName}-${item.areaName}`,
        value: Number(item.groupAreaId),
        reportType: Number(item.reportType),
      })) || [];
    groupAreaOptions.value = [
      { label: '默认', value: 0, reportType: reportType.value },
      ...options,
    ];
    return true;
  };
  const getConfig = async () => {
    const res = await mpcWeeklyReportApi.luteosMarketWeekReportQueryConfigList({
      reportType: reportType.value,
    });
    emit('beforeInitColumns', res.recordList, reportType.value);
    editorConfigList.value = res.recordList || [];
    formData.value.content = res.recordList?.reduce((prev, item) => {
      prev[item.configId] = item.defaultContent || '';
      return prev;
    }, {});
  };

  const onCancel = async () => {
    const title = formData.value.reportTitle;

    const datas = editorConfigList.value.map((row) => {
      return formData.value.content[row.configId]?.trim();
    });
    if (!title || datas.some((x) => x)) {
      const isConfirmed = await swal.confirm('有内容尚未保存，确定关闭吗？');
      if (!isConfirmed) return;
    }
    hidePanel();
  };
  const weekList = inject<Ref<MpcWeeklyReportContracts.WeekBean[]>>('weekList');
  const loading = ref(false);
  const onConfirm = (isAutoSave = false) => {
    formRef.value.validate(async (valid) => {
      if (!valid) {
        return null;
      }
      loading.value = true;
      const targetPeriod = formData.value.period;
      let targetStartDate = '';
      let targetEndDate = '';
      if (dateType === 'week') {
        const weekOption = weekList?.value.find((item) => item.week === formData.value.period);
        targetStartDate = weekOption?.startDate || detailData.value?.startDate;
        targetEndDate = weekOption?.endDate || detailData.value?.endDate;
      } else if (dateType === 'month') {
        targetStartDate = dayjs(formData.value.period).startOf('month').format('YYYY-MM-DD');
        targetEndDate = dayjs(formData.value.period).endOf('month').format('YYYY-MM-DD');
      }
      const params: MarketWeeklyReportCreateReq = {
        reportType: reportType.value,
        branch: formData.value.branch || branch.value,
        startDate: targetStartDate,
        endDate: targetEndDate,
        period: targetPeriod,
        reportTitle: formData.value.reportTitle,
        reportId: rowData.value?.reportId,
        groupAreaId: formData.value.groupAreaId,
        itemList: editorConfigList.value.map((item) => {
          const content = formData.value.content[item.configId] || '';
          const oItem = detailData.value?.itemList?.find((x) => item.configId === x.configId);
          return {
            configId: item.configId,
            configContent: content,
            reportId: rowData.value?.reportId,
            detailId: oItem?.detailId,
            id: oItem?.id,
            reportType: reportType.value,
            status: 1,
          } as MarketWeeklyReportDetailCreateReq;
        }),
      };
      let res;
      try {
        if (rowData.value?.reportId) {
          res = await mpcWeeklyReportApi.luteosMarketWeekReportUpdate(params);
        } else {
          res = await mpcWeeklyReportApi.luteosMarketWeekReportSave(params);
          rowData.value!.reportId = res.reportId;
        }
        updateTime.value = new Date().toLocaleTimeString().slice(0, 5);
        if (isAutoSave === true) {
          return res;
        }
      } catch {
        return null;
      } finally {
        loading.value = false;
      }
      ElMessage.success(rowData.value?.reportId ? '更新成功' : '创建成功');
      hidePanel();
      emit('skipList', {
        period: formData.value.period,
        branch: formData.value.branch || branch.value,
        reportType: reportType.value,
      });
      return res;
    });
  };
  let timeId: ReturnType<typeof setTimeout> | null = null;
  const updateTime = ref('');
  function autoSave() {
    timeId && clearTimeout(timeId);
    timeId = setTimeout(async () => {
      const res = await onConfirm(true);
      if (isShowPanel.value) {
        autoSave();
      }
    }, 30 * 1000);
  }
  onUnmounted(() => {
    timeId && clearTimeout(timeId);
    updateTime.value = '';
  });

  const handleChangeGroupAreaId = (value: string) => {
    const currentOptions = groupAreaOptions.value.find((option) => option.value === value);
    reportType.value = currentOptions!.reportType;
    getConfig();
  };
</script>

<style scoped lang="scss">
  .create-report {
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .create-report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    font-style: normal;
    color: var(---N9, #1f1f1f);

    /* 常规/Medium 14 */
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    border-bottom: 1px solid var(---N2, #f5f5f5);
    padding: 0 20px;
  }
  .create-report-content {
    padding: 18px 20px;
    height: 0;
    flex: 1;
    overflow-y: auto;
  }
  :deep(.create-report-dialog-form-item) {
    width: 100% !important;
  }

  :deep(.el-form-item__label) {
    color: var(---N8, #666);
    margin-bottom: 6px !important;
    font-family: 'PingFang SC';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 169.231% */
  }
  .create-report-footer {
    display: flex;
    width: 100%;
    padding: 16px 20px 16px 20px;
    justify-content: end;
    align-items: center;
    border-top: 1px solid var(---N3, #ededed);
    background: #fff;
  }
  .update-time {
    color: var(---N6, #999);

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    margin-right: auto;
  }
</style>

<style lang="scss">
  .create-report-drawer {
    pointer-events: none;
    .create-report-panel {
      pointer-events: auto;
    }
  }
  .create-report-panel {
    .el-drawer__header {
      margin: 0;
      padding-bottom: 10px;
      color: var(---N9, #1f1f1f);
      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
  }
</style>
