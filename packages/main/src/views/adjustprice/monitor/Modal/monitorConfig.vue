<template>
  <el-dialog
    title="监控设置"
    :model-value="visible"
    @close="handleClose"
    width="780px"
    class="my-dialog"
  >
    <div class="my-card">
      <h4 class="card-title">店铺SKU信息</h4>
      <div class="detail-label">
        <span>店铺SKU：</span>
        <span>{{ monitorDetail.msku }}</span>
      </div>
      <div class="detail-label">
        <span>渠道：</span>
        <span>{{ monitorDetail.channel }}</span>
      </div>
      <div class="detail-label">
        <span>站点：</span>
        <span>{{ monitorDetail.site }}</span>
      </div>
      <div class="detail-label">
        <span>店铺：</span>
        <span>{{ monitorDetail.shop }}</span>
      </div>
      <div class="detail-label">
        <span>运营人员：</span>
        <span>{{ monitorDetail.operatorName }}</span>
      </div>
      <div class="detail-label" style="margin-bottom: 2px">
        <span>销售映射：</span>
        <div
          class="sku-code suggest-price"
          v-if="monitorDetail.productSkuList && monitorDetail.productSkuList.length"
        >
          <div v-for="(item, index) in monitorDetail.productSkuList" :key="index">
            <span>{{ item.skuCode }} * {{ item.num }}</span>
          </div>
        </div>
        <span v-else>暂无</span>
      </div>

      <div class="detail-label">
        <span>建议售价：</span>
        <span v-if="monitorDetail.suggestPrice">
          {{ monitorDetail.suggestPrice }} {{ monitorDetail.suggestCurrency }}
        </span>
        <span v-else>暂无</span>
        <el-tooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top-start"
          effect="light"
          :content="`汇总销售映射的所有SKU 建议售价*数量（如多个SKU币种不同，则换算为USD计算）`"
        >
          <QuestionFilled
            class="question-icon"
            v-if="monitorDetail.suggestPrice"
            style="margin-top: -3px; margin-left: 5px"
          />
        </el-tooltip>
        <div class="suggest-price">
          <template v-if="monitorDetail.productSkuList && monitorDetail.productSkuList.length">
            <div v-for="(item, index) in monitorDetail.productSkuList" :key="index">
              <span>{{ item.skuCode }}：</span>
              <span>{{ item.suggestPrice }}</span>
              <span v-if="item.suggestCurrency">&nbsp;{{ item.suggestCurrency }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="detail-label">
        <span>当前售价：</span>
        <span v-if="monitorDetail.currPrice">
          {{ monitorDetail.currPrice }} {{ monitorDetail.currency }}
        </span>
        <span v-else>暂无</span>
        <el-tooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top-start"
          effect="light"
          :content="`更新时间：2024/05/28`"
        >
          <QuestionFilled
            class="question-icon"
            v-if="monitorDetail.currPrice"
            style="margin-top: -3px; margin-left: 5px"
          />
        </el-tooltip>
      </div>
    </div>
    <div class="my-card">
      <h4 class="card-title monitor-title">监控设置</h4>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="left">
        <template v-for="(item, index) in monitorList" :key="index">
          <div class="d-flex">
            <div class="title">{{ item.monitorTypeDesc }}：</div>
            <div class="title" style="margin: 0 30px">{{ item.operation }}</div>
            <el-form-item
              label=""
              :prop="`monitorList[${index}].priceType`"
              :rules="rules.priceType"
            >
              <el-select
                v-model="form.monitorList[index].priceType"
                filterable
                placeholder="监控类型"
                style="width: 150px"
              >
                <el-option
                  v-for="price in priceTypeList"
                  :key="price.value"
                  :label="price.desc"
                  :value="price.value"
                />
              </el-select>
            </el-form-item>
            <div class="title" style="margin: 0 10px">*</div>
            <el-form-item label="" :prop="`monitorList[${index}].rate`" :rules="rules.rate">
              <el-input v-model="form.monitorList[index].rate" style="width: 150px">
                <template #append>%</template>
              </el-input>
            </el-form-item>
            <div class="title" v-if="monitorDetail.suggestPrice">
              （{{
                parseFloat(
                  (Number(monitorDetail.suggestPrice) * Number(form.monitorList[index].rate)) / 100
                ).toFixed(2)
              }}
              {{ monitorDetail.suggestCurrency }}）
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top"
                effect="light"
                :content="`所有SKU的建议售价 *百分比计算得出`"
              >
                <QuestionFilled class="question-icon" style="margin-top: -2px" />
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { priceApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { QuestionFilled } from '@element-plus/icons-vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      rpaCode: string;
    }>(),
    {
      visible: false,
    }
  );
  const monitorList = ref([
    {
      monitorTypeDesc: '异常警告',
      monitorType: 'error',
      symbol: '*',
      operation: '小于',
    },
  ]);
  const priceTypeList = ref([
    {
      value: 'suggest',
      desc: '建议零售价',
    },
  ]);
  const form = ref({
    monitorList: [
      {
        monitorType: 'error',
        rate: '',
        priceType: 'suggest',
      },
    ],
    rpaCodeList: [props.rpaCode],
  });

  const rules = ref({
    rate: [
      { required: true, message: '请输入', trigger: ['blur', 'change'] },
      {
        pattern: /^([1-9]\d?(\.\d{1,2})?|0\.[1-9]\d?|0\.0[1-9]|100(\.0{1,2})?)$/,
        message: '请输入合法的数字',
        trigger: ['blur', 'change'],
      },
    ],
    priceType: { required: true, message: '请选择价格类型', trigger: ['blur', 'change'] },
  });
  const monitorDetail = ref({});
  const queryMonitorDetail = async () => {
    const res = await priceApi.luteosPriceQueryMonitorDetail({
      rpaCode: props.rpaCode,
    });
    monitorDetail.value = res || {};
    if (res.monitorList && res.monitorList.length) {
      form.value.monitorList = res.monitorList;
    } else {
      form.value.monitorList = [
        {
          monitorType: 'error',
          rate: '',
          priceType: 'suggest',
        },
      ];
    }
    monitorDetail.value.productSkuList = res.productSkuList || [];
  };
  queryMonitorDetail();

  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      await priceApi
        .luteosPriceSaveMonitorRole({
          ...form.value,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      emit('close', true);
    }
  };

  const emit = defineEmits<{
    (event: 'close', r?: boolean): void;
  }>();

  const handleClose = () => {
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .title {
    height: 44px;
    line-height: 44px;
  }
  .operate {
    margin: 0 30px;
  }
  .detail-label {
    line-height: 30px;
  }
  .my-card {
    :deep(.card-header) {
      padding-left: 0;
    }
    padding-bottom: 0 !important;
  }
  .card-title {
    font-size: 15px;
    margin-left: -20px;
    margin-bottom: 10px;
  }
  .monitor-title {
    margin-top: 20px;
  }
  .question-icon {
    width: 15px;
    height: 15px;
  }
  .suggest-price {
    margin-left: 70px;
    line-height: 25px;
  }
  .sku-code {
    margin-top: -27px;
  }
</style>
