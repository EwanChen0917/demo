<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      class="form-data"
      label-width="160px"
      label-position="left"
      scroll-to-error
    >
      <div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合作费用类型：" prop="feeType">
              <el-select v-model="form.feeType">
                <el-option
                  v-for="type in dictMap?.meta_project_fee_type"
                  :key="type.value"
                  :label="type.desc"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合作基础坑位费：" prop="baseFee">
              <el-input v-model="form.baseFee" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="独立站佣金比例：" prop="shopifyCommissionRate">
              <el-input v-model="form.shopifyCommissionRate" clearable>
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="独立站佣金费用：" prop="shopifyCommissionFee">
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                content="独⽴站佣⾦费⽤=独⽴站引⼊⾦额*独⽴站佣⾦⽐例"
              >
                <QuestionFilled class="question-icon" />
              </el-tooltip>
              <el-input v-model="shopifyCommissionFee" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Amazon佣金比例：" prop="amazonCommissionRate">
              <el-input v-model="form.amazonCommissionRate" clearable>
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Amazon佣金费用：" prop="amazonCommissionFee">
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                content="Amazon佣⾦费⽤ = 亚⻢逊引⼊⾦额 * Amazon佣⾦⽐例"
              >
                <QuestionFilled class="question-icon" style="left: -32px" />
              </el-tooltip>
              <el-input v-model="amazonCommissionFee" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="TK小店佣金：" prop="tkCommission">
              <el-input v-model="form.tkCommission" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="TK小店寄样成本：" prop="tkSampleCost">
              <el-input v-model="form.tkSampleCost" clearable />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="TK小店物流成本：" prop="tkLogisticsCost">
              <el-input v-model="form.tkLogisticsCost" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="总费用：" prop="totalFee">
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                content="总费⽤ = 合作基础坑位费 + 独⽴站佣⾦费⽤ + Amazon佣⾦费⽤ + TK⼩店佣⾦+TK⼩店寄样成本 + TK⼩店物流成本"
              >
                <QuestionFilled class="question-icon" style="left: -100px" />
              </el-tooltip>
              <el-input v-model="totalFee" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="OA实际走款费用：" prop="oaTotalFee">
              <el-input v-model="totalOaFee" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="ROI：" prop="roi">
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`${
                  totalOaFee ? 'ROI = 总引⼊⾦额 / OA实际⾛款费⽤' : 'ROI = 总引⼊⾦额 / 总费⽤'
                }`"
              >
                <QuestionFilled class="question-icon" style="left: -118px" />
              </el-tooltip>
              <el-input v-model="roi" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="CPM：" prop="CPM">
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`${
                  totalOaFee
                    ? 'CPM = OA实际⾛款费⽤ / 曝光量 * 1000'
                    : 'CPM = 总费⽤ / 曝光量 * 1000'
                }`"
              >
                <QuestionFilled class="question-icon" style="left: -110px" />
              </el-tooltip>
              <el-input v-model="cpm" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="flex-right">
          <div>
            <el-button type="primary" @click="save(index)">提交</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { metaApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const route = useRoute();
  const formRef = ref();
  const form = ref({
    projectCode: route.query.projectCode,
    amazonCommissionRate: '',
    tkLogisticsCost: '',
    tkSampleCost: '',
    baseFee: '',
    shopifyCommissionRate: '',
    tkCommission: '',
    feeType: '',
  });

  const rules = reactive({
    baseFee: [
      {
        pattern: /^\d+(\.\d{1,5})?$/,
        message: '请输入非负数字（小数仅支持小数点后五位）',
        trigger: 'change',
      },
    ],
    tkCommission: [
      {
        pattern: /^\d+(\.\d{1,5})?$/,
        message: '请输入非负数字（小数仅支持小数点后五位）',
        trigger: 'change',
      },
    ],
    tkLogisticsCost: [
      {
        pattern: /^\d+(\.\d{1,5})?$/,
        message: '请输入非负数字（小数仅支持小数点后五位）',
        trigger: 'change',
      },
    ],
    tkSampleCost: [
      {
        pattern: /^\d+(\.\d{1,5})?$/,
        message: '请输入非负数字（小数仅支持小数点后五位）',
        trigger: 'change',
      },
    ],
    amazonCommissionRate: [
      { pattern: /^(100(\.0+)?|[1-9]?\d(\.\d+)?)$/, message: '请输⼊合法数字', trigger: 'change' },
    ],
    shopifyCommissionRate: [
      { pattern: /^(100(\.0+)?|[1-9]?\d(\.\d+)?)$/, message: '请输⼊合法数字', trigger: 'change' },
    ],
  });

  const amountInfo = ref({
    totalImportAmount: '',
    totalAmazonImportAmount: '',
    totalShopifyImportAmount: '',
    totalTiktokAmount: '',
  });

  const totalOaFee = ref('');
  const videoLookNum = ref(0);
  const queryImportAmountList = async () => {
    amountInfo.value = await metaApi.luteosMetaProjectQueryImportAmountList({
      pageNum: 1,
      pageSize: 500,
      projectCode: form.value.projectCode,
    });
  };
  queryImportAmountList();
  const queryFee = async () => {
    const res = await metaApi.luteosMetaProjectQueryProjectFee({
      projectCode: form.value.projectCode,
    });
    form.value.amazonCommissionRate = res.amazonCommissionRate;
    form.value.shopifyCommissionRate = res.shopifyCommissionRate;
    form.value.tkLogisticsCost = res.tkLogisticsCost;
    form.value.tkSampleCost = res.tkSampleCost;
    form.value.tkCommission = res.tkCommission;
    form.value.baseFee = res.baseFee;
    form.value.feeType = String(res.feeType || '');
    totalOaFee.value = res.totalOaFee || 0;
    videoLookNum.value = res.videoLookNum || 0;
  };
  queryFee();

  const amazonCommissionFee = computed(() => {
    if (form.value.amazonCommissionRate && amountInfo.value.totalAmazonImportAmount) {
      return parseFloat(
        (amountInfo.value.totalAmazonImportAmount * form.value.amazonCommissionRate) / 100
      ).toFixed(5);
    }
  });

  const shopifyCommissionFee = computed(() => {
    if (form.value.shopifyCommissionRate && amountInfo.value.totalShopifyImportAmount) {
      return parseFloat(
        (amountInfo.value.totalShopifyImportAmount * form.value.shopifyCommissionRate) / 100
      ).toFixed(5);
    }
  });

  const getAmount = (val) => {
    if (!val) {
      return 0;
    }
    return Number(val);
  };

  const totalFee = computed(() => {
    if (
      form.value.baseFee ||
      form.value.tkLogisticsCost ||
      form.value.tkSampleCost ||
      form.value.tkCommission ||
      amazonCommissionFee.value ||
      shopifyCommissionFee.value
    ) {
      return parseFloat(
        getAmount(form.value.baseFee) +
          getAmount(form.value.tkLogisticsCost) +
          getAmount(form.value.tkSampleCost) +
          getAmount(form.value.tkCommission) +
          getAmount(amazonCommissionFee.value) +
          getAmount(shopifyCommissionFee.value)
      ).toFixed(5);
    }
  });

  const roi = computed(() => {
    if (amountInfo.value.totalImportAmount) {
      if (totalOaFee.value) {
        return parseFloat(amountInfo.value.totalImportAmount / totalOaFee.value).toFixed(5);
      }
      if (totalFee.value) {
        return parseFloat(amountInfo.value.totalImportAmount / totalFee.value).toFixed(5);
      }
    }
  });

  const cpm = computed(() => {
    if (totalOaFee.value && +videoLookNum.value > 0) {
      return parseFloat((totalOaFee.value / videoLookNum.value) * 1000).toFixed(5);
    }
    if (totalFee.value && +videoLookNum.value > 0) {
      return parseFloat((totalFee.value / videoLookNum.value) * 1000).toFixed(5);
    }
  });

  const dictMap = ref({});
  const queryOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['meta_project_fee_type'],
    });
    dictMap.value = res?.dictMap;
  };
  queryOptions();

  const saveLoading = ref(false);
  const save = (index) => {
    formRef.value.validate((isValid) => {
      if (isValid) {
        try {
          saveLoading.value = true;
          metaApi.luteosMetaProjectSaveOrUpdateProjectFee(form.value).then(() => {
            ElMessage.success('提交成功');
            queryFee();
          });
        } finally {
          saveLoading.value = false;
        }
      }
    });
  };
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }

  .form-flex {
    display: flex;
  }

  .form-border {
    width: 100%;
    padding: 20px;
    border: 1px dashed #ddd;
    margin-bottom: 20px;
  }

  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
  .question-icon {
    position: absolute;
    left: -44px;
    top: 18px;
    width: 15px;
    width: 15px;
    margin-top: -2px;
    cursor: pointer;
  }
</style>
