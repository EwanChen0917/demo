<template>
  <el-dialog
    :title="props.id ? '编辑备货时效' : '新增备货时效'"
    v-model="visible"
    @close="dialogClose"
    width="800px"
  >
    <el-form :model="form" :rules="rules" ref="formRef" :disabled="loading">
      <span class="section-title">基础信息</span>
      <el-form-item label="渠道">
        <span>{{ form.channel }}</span>
      </el-form-item>
      <el-form-item label="备货站点" prop="stockSite">
        <el-select
          v-model="form.stockSite"
          placeholder="请选择备货站点"
          clearable
          filterable
          style="width: 300px"
          @change="handleStockSiteChange"
        >
          <el-option
            v-for="item in stockSiteList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="物流方式" prop="logisticsTransportId">
        <el-select
          v-model="form.logisticsTransportId"
          placeholder="请先选择备货站点"
          :disabled="isLogisticDisabled"
          clearable
          style="width: 300px"
          @change="handleLogisticChange"
        >
          <el-option
            v-for="item in logisticsMap"
            :key="item.id"
            :label="item.transportName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备货时效">
        <span>{{ prescriptionLabel }}</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="0" :inactive-value="1" />
      </el-form-item>
      <div class="section-title">旺季时间</div>
      <div class="peak-season-section">
        <el-table :data="form.peakSeasonTime" border style="width: 100%">
          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column label="旺季时间" align="center" min-width="330">
            <template #default="{ row, $index }">
              <DateRangeInput v-model="form.peakSeasonTime[$index]" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                :disabled="form.peakSeasonTime.length === 1"
                @click="handleDeleteRow($index)"
              >
                删除
              </el-button>
              <el-button
                v-if="$index === form.peakSeasonTime?.length - 1"
                type="primary"
                size="small"
                @click="handleAddRow"
              >
                新增
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="dialogClose">取消</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { erpApi, ErpApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';
  import { useTurnOverBase } from '../hooks/useTurnOverBase';
  import { StockingTimeSaveReq } from '@/api/erp/data-contracts';
  import { cloneDeep } from 'lodash-es';
  const { stockSiteList, logisticsMap, getLogisticsMap } = useTurnOverBase();
  const loading = ref(false);
  interface PeakSeasonItem {
    startTime: string;
    endTime: string;
  }
  interface Props {
    channel?: string;
    id?: number;
  }
  interface stockTimeReq
    extends Omit<
      ErpApi.LuteosErpPlanTurnoverStockingTimeSaveOrUpdate.RequestBody,
      'peakSeasonTime'
      
    > {
    peakSeasonTime: PeakSeasonItem[];
    stockTime: string;
  }
  const emits = defineEmits<{
    (success: string): void;
    (close: string): void;
  }>();
  const props = defineProps<Props>();
  const visible = ref(false);
  const form = reactive<stockTimeReq>({
    id: undefined,
    channel: '',
    logisticsTransportId: undefined,
    name: '',
    peakSeasonTime: [{ startTime: '', endTime: '' }],
    status: 0,
    stockSite: undefined,
    stockTime: '',
  });
  const formRef = ref<FormInstance>();
  const rules = reactive({
    stockSite: [{ required: true, message: '请选择备货站点' }],
    logisticsTransportId: [{ required: true, message: '请选择物流方式' }],
  });
  watch(
    () => props.id,
    (newVal) => {
      if (newVal) {
        handleGetDetail();
      }
    },
    {
      immediate: true,
    }
  );
  watch(
    () => props.channel,
    (newVal) => {
      form.channel = newVal;
    },
    {
      immediate: true,
    }
  );
  /**
   * 物流方式是否禁用
   * 规则：只有选择了备货站点后，物流方式才可选择
   *
   * 边界情况处理：
   * 1. undefined/null - 未选择，应禁用
   * 2. '' (空字符串) - 无效值，应禁用
   * 3. 0 - 可能是有效的站点ID，不应禁用
   * 4. false - 布尔值理论上不会出现，但作为falsy值处理
   */
  const isLogisticDisabled = computed(() => {
    const { stockSite } = form;
    // 排除 null 和 undefined
    if (stockSite == null) {
      return true;
    }
    // 如果是字符串类型，排除空字符串
    if (typeof stockSite === 'string' && stockSite.trim() === '') {
      return true;
    }
    // 数字 0 和布尔值 false 可能是有效值，不禁用,其他所有truthy值都允许编辑
    return false;
  });
  // // 监听备货站点变化，如果站点被清空，同时清空物流方式
  const handleStockSiteChange = (e: string | undefined) => {
    form.logisticsTransportId = undefined;
    form.stockTime = '';
    form.name = '';
    prescriptionLabel.value = '';
    getLogisticsMap(e);
    if(!form.logisticsTransportId) return
    handleLogisticChange(form.logisticsTransportId);
  }
  const prescriptionLabel = ref('');
  //选择物流方式时更新备货时效
  const handleLogisticChange = (e: number) => {
    form.stockTime = '';
    form.name = '';
    prescriptionLabel.value = '';
    if (!e) return;
    const result = logisticsMap.value.find((item) => item.id === e);
    if (!result) return;
    form.name = result.transportName;
    const firstPrescription = result.prescriptionList?.[0];
    if (!firstPrescription) return;
    if (firstPrescription.prescriptionMax && firstPrescription.prescription) {
      form.stockTime = firstPrescription.prescription + ',' + firstPrescription.prescriptionMax;
      prescriptionLabel.value = `${firstPrescription.prescription}-${
        firstPrescription.prescriptionMax
      } (${firstPrescription.destinationCountry || ''}-${
        firstPrescription.destinationCountryDesc || ''
      })`;
    }
  };
  /**
   * 新增一行旺季时间
   * 边界处理：限制最大行数，防止无限添加
   */
  const MAX_PEAK_SEASON_ROWS = 10; // 最多允许10个旺季时间段
  const handleAddRow = () => {
    if (!form.peakSeasonTime) return;
    if (form?.peakSeasonTime?.length >= MAX_PEAK_SEASON_ROWS) {
      ElMessage.warning(`最多只能添加 ${MAX_PEAK_SEASON_ROWS} 个旺季时间段`);
      return;
    }
    form.peakSeasonTime.push({ startTime: '', endTime: '' });
  };

  /**
   * 删除指定行
   * 边界处理：
   * 1. 至少保留一行
   * 2. 索引越界检查
   * 3. 数据有效性检查
   */
  const handleDeleteRow = (index: number) => {
    if (!form.peakSeasonTime) return;
    // 参数有效性检查
    if (typeof index !== 'number' || index < 0) {
      console.error('删除行失败：索引无效', index);
      return;
    }
    // 至少保留一行
    if (form.peakSeasonTime.length <= 1) {
      ElMessage.warning('至少需要保留一行旺季时间');
      return;
    }
    // 索引越界检查
    if (index >= form.peakSeasonTime.length) {
      console.error('删除行失败：索引越界', index);
      return;
    }
    form.peakSeasonTime.splice(index, 1);
  };

  /**
   * 对话框关闭时重置表单数据
   * 防止数据污染和遗留
   */
  const dialogClose = () => {
    // 重置表单到初始状态
    Object.assign(form, {
      id: undefined,
      channel: props.channel || '',
      logisticsTransportId: '',
      name: '',
      peakSeasonTime: [{ startTime: '', endTime: '' }],
      status: 0,
      stockSite: undefined,
      stockTime: '',
    });
    formRef.value?.resetFields();
    visible.value = false;
    prescriptionLabel.value = ''
    emits('close');
  };
  /**
   * 判断两个时间范围是否重叠
   * 重叠条件：range1.endTime >= range2.startTime && range1.startTime <= range2.endTime
   */
  const isDateRangeOverlap = (range1: PeakSeasonItem, range2: PeakSeasonItem): boolean => {
    // 如果开始或结束时间为空，不进行校验
    if (!range1.startTime || !range1.endTime || !range2.startTime || !range2.endTime) {
      return false;
    }
    // 判断是否重叠：range1的结束时间 >= range2的开始时间 且 range1的开始时间 <= range2的结束时间
    return range1.endTime >= range2.startTime && range1.startTime <= range2.endTime;
  };
  const validatePeakSeasonTime = (peakSeasonTime: PeakSeasonItem[]) => {
    for (let i = 0; i < peakSeasonTime.length; i++) {
      for (let j = i + 1; j < peakSeasonTime.length; j++) {
        if (isDateRangeOverlap(peakSeasonTime[i], peakSeasonTime[j])) {
          return {
            valid: false,
            message: `第${i + 1}行和第${j + 1}行时间范围存在重叠，请调整`,
            conflict: [[i, j]],
          };
        }
      }
    }
    return {
      valid: true,
      message: '',
      conflict: [],
    };
  };
  const handleSave = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    const params = cloneDeep(form);
    if (params.peakSeasonTime) {
      const filteredPeakSeasonTime = params?.peakSeasonTime?.filter((item) => {
        return item.startTime && item.endTime;
      });
      if (filteredPeakSeasonTime.length > 0) {
        params.peakSeasonTime = filteredPeakSeasonTime;
        //校验是否时间有重复，而不是重叠
        const validateResult = validatePeakSeasonTime(params.peakSeasonTime);
        if (!validateResult?.valid) {
          ElMessage.warning(validateResult?.message);
          return;
        }
      } else {
        params.peakSeasonTime = null as unknown as PeakSeasonItem[];
      }
    }
    try {
      loading.value = true;
      await erpApi
        .luteosErpPlanTurnoverStockingTimeSaveOrUpdate(params as unknown as StockingTimeSaveReq)
        .finally(() => {
          loading.value = false;
        });
      ElMessage.success('操作成功');
      emits('success');
      dialogClose();
    } catch (error) {
      console.error('保存失败', error);
    }
  };

  const handleGetDetail = async () => {
    loading.value = true;
    const res = await erpApi
      .luteosErpPlanTurnoverQueryStockTimeDetails({
        id: props.id,
      })
      .finally(() => {
        loading.value = false;
      });
    if (!res) return;
    form.id = props.id as number;
    form.channel = res.channel;
    form.logisticsTransportId = res.logisticsTransportId;
    form.name = res.name;
    form.peakSeasonTime = res.peakSeasonTime?.map((item) => ({
      startTime: item.startTime || '',
      endTime: item.endTime || '',
    })) || [{ startTime: '', endTime: '' }];
    form.status = res.status;
    form.stockSite = res.stockSite;
    form.stockTime = res.stockTime;
    await getLogisticsMap(form.stockSite);
    await handleLogisticChange(form.logisticsTransportId);
  };
  const open = () => {
    visible.value = true;
  };

  onMounted(() => {
    getLogisticsMap(undefined);
  });
  defineExpose({
    open,
  });
</script>
<style lang="scss" scoped>
  .peak-season-section {
    margin-top: 20px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 500;
    color: #606266;
    margin-bottom: 12px;
    padding-left: 8px;
    border-left: 3px solid #0bbd6e;
  }
</style>
