<template>
  <el-dialog title="批量更新" :model-value="visible" @close="handleClose" width="70%">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="150px"
      label-position="top"
      scroll-to-error
      :rules="rules"
    >
      <div class="d-flex">
        <el-form-item label="现在售价：" prop="currentPrice">
          <el-input v-model="form.currentPrice" />
        </el-form-item>
        <el-form-item label="" prop="currentPriceCurrencyCode" class="mr-10 mt-currency">
          <CurrencySelect v-model="form.currentPriceCurrencyCode" />
        </el-form-item>
        <el-form-item label="申请售价：" prop="adjustPrice">
          <el-input v-model="form.adjustPrice" />
        </el-form-item>
        <el-form-item label="" prop="adjustPriceCurrencyCode" class="mr-10 mt-currency">
          <CurrencySelect v-model="form.adjustPriceCurrencyCode" />
        </el-form-item>
        <el-form-item label="调整前毛利率：" prop="currentProfitRate" class="mr-10">
          <el-input v-model="form.currentProfitRate">
            <template #append>%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="调整后毛利率：" prop="adjustProfitRate">
          <el-input v-model="form.adjustProfitRate">
            <template #append>%</template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <KeenCard :title="`${props.priceList.length}个信息将被更改`">
      <el-table :data="props.priceList">
        <el-table-column :label="props.platformMap[props.type]?.firstColumnLabel" min-width="180">
          <template #default="{ row }">
            <div>{{ row.subCode || row.itemCode + row.msku + row.shop }}</div>
            <div class="text-gray-400 fs-7" v-if="row.msku">{{ row.msku }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="props.platformMap[props.type]?.secondColumnLabel">
          <template #default="{ row }">
            <div>{{ row.itemCode }}</div>
            <div class="text-gray-400 fs-7" v-if="row.shop">({{ row.shop }})</div>
          </template>
        </el-table-column>
        <el-table-column label="现在售价">
          <template #default="scope">
            <div class="pe-6">
              <div>{{ scope.row.currentPrice }}{{ scope.row.currentPriceCurrencyCode }}</div>
              <div>-></div>
              <div class="price-txt" v-if="form.currentPrice >= 0">
                {{ form.currentPrice }}{{ form.currentPriceCurrencyCode }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请售价">
          <template #default="scope">
            <div class="pe-6">
              <div>{{ scope.row.adjustPrice }}{{ scope.row.adjustPriceCurrencyCode }}</div>
              <div>-></div>
              <div class="price-txt" v-if="form.adjustPrice >= 0">
                {{ form.adjustPrice }}{{ form.adjustPriceCurrencyCode }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="调整前毛利率">
          <template #default="scope">
            <div class="pe-6">
              <div>{{ scope.row.currentProfitRate }}%</div>
              <div>-></div>
              <div class="price-txt" v-if="form.currentProfitRate >= 0">
                {{ form.currentProfitRate }}%
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="调整后毛利率">
          <template #default="scope">
            <div class="pe-6">
              <div>{{ scope.row.adjustProfitRate }}%</div>
              <div>-></div>
              <div class="price-txt" v-if="+form.adjustProfitRate >= 0">
                {{ form.adjustProfitRate }}%
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { priceRuleFixed4, rateRuleFixed4 } from '@/utils/rulesRegExp';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      priceList: Array<string>;
      platformMap: Object;
      type: string;
    }>(),
    {
      visible: false,
    }
  );

  // 表单定义
  const form = ref({
    currentPrice: undefined,
    adjustPrice: undefined,
    currentProfitRate: undefined,
    adjustProfitRate: undefined,
    currentPriceCurrencyCode: undefined,
    adjustPriceCurrencyCode: undefined,
  });

  const rules = ref({
    currentPrice: [
      {
        required: false,
        message: '请输入现在售价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur', 'change'],
      },
    ],
    adjustPrice: [
      {
        required: false,
        message: '请输入申请售价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur', 'change'],
      },
    ],
    currentProfitRate: [
      {
        required: false,
        message: '请输入调整前毛利率',
        trigger: ['blur', 'change'],
      },
      {
        pattern: rateRuleFixed4,
        message: '请输入正、负数字',
        trigger: ['blur', 'change'],
      },
    ],
    adjustProfitRate: [
      {
        required: false,
        message: '请输入调整后毛利率',
        trigger: ['blur', 'change'],
      },
      {
        pattern: rateRuleFixed4,
        message: '请输入正、负数字',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      props.priceList.forEach((item: any) => {
        item.currentPrice = form.value.currentPrice || item.currentPrice;
        item.adjustPrice = form.value.adjustPrice || item.adjustPrice;
        item.currentProfitRate = form.value.currentProfitRate || item.currentProfitRate;
        item.adjustProfitRate = form.value.adjustProfitRate || item.adjustProfitRate;
        item.currentPriceCurrencyCode =
          form.value.currentPriceCurrencyCode || item.currentPriceCurrencyCode;
        item.adjustPriceCurrencyCode =
          form.value.adjustPriceCurrencyCode || item.adjustPriceCurrencyCode;
      });
      emit('close', true, props.priceList);
    }
  };

  const emit = defineEmits<{
    (event: 'close', r?: boolean, list?: any): void;
  }>();

  const handleClose = () => {
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .mr-10 {
    margin-right: 10px;
  }
  .mt-currency {
    margin-top: 27px;
    margin-left: 4px;
  }
  .price-txt {
    color: #3e97ff;
    font-weight: 600;
  }
</style>
