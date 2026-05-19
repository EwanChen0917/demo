<template>
  <el-dialog title="批量拆单" v-model="visible" @close="visible = false" width="850px">
    <el-form-item label="拆分方式">
      <el-radio-group size="small" v-model="splitType" @change="splitTypeChange">
        <el-radio label="split_by_product">按产品拆分</el-radio>
        <el-radio label="split_by_out_of_stock">缺货拆分</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="拆分方式">
      <el-radio-group size="small" v-model="subSplitType">
        <el-radio v-for="item in subSplitTypeList" :label="item?.value" :key="item?.value">
          {{ item?.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-if="splitType === 'split_by_product'" class="tip">
      <div class="title">说明：</div>
      <div class="bold-text">每件产品拆为一单：</div>
      <div class="text">Order1：如订单包含Asku*3个，则拆分成3个子订单：Asku*1、Asku*1、Asku*1</div>
      <div class="text">
        Order2：如订单包含Asku*2个、Bsku*2个，则拆分成4个子订单：Asku*1、Asku*1、Bsku*1、Bsku*1
      </div>
      <div class="bold-text">相同产品拆为一单：</div>
      <div class="text">
        Order1：如订单包含Asku*1、Asku*2、Bsku*2个，则拆分成2个子订单：Asku*1+Asku*2、Bsku*2
      </div>
      <div class="bold-text">每行产品拆为一单：</div>
      <div class="text">
        <div>Order1：如订单包含Asku*3、Bsku*2个，则拆分成2个子订单：Asku*3、Bsku*2</div>
        <div>
          Order2：如订单包含Asku*3、Bsku*2、Asku*1个，则拆分成3个子订单：Asku*3、Bsku*2、Asku*1
        </div>
      </div>
    </div>
    <div v-if="splitType === 'split_by_out_of_stock'" class="tip">
      <div class="title">说明：</div>
      <!---->
      <div class="bold-text">缺货SKU发货：</div>
      <div class="text">
        如订单包含产品A5个，仓库可用库存3，系统会将A的缺货部分2个(5-3=2)拆分到缺货订单中
      </div>
      <div class="bold-text">缺货SKU不发货：</div>
      <div class="text">如订单包含产品A5个，仓库可用库存3，系统会将整个A(5个)拆分到缺货订单中</div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef" />
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const splitTypeMap = {
    split_by_product: {
      label: '按产品拆分',
      children: [
        {
          label: '每件产品拆分为一单(一单一件一个)',
          value: 'each_product_num_split',
        },
        {
          label: '相同产品拆为一单(一单一件多个)',
          value: 'same_product_split',
        },
        {
          label: '每行产品拆为一单',
          value: 'each_line_product_split',
        },
      ],
    },
    split_by_out_of_stock: {
      label: '缺货拆分',
      children: [
        {
          label: '缺货SKU发货',
          value: 'out_of_stock_sku_ship',
        },
        {
          label: '缺货SKU不发货',
          value: 'out_of_stock_sku_not_ship',
        },
      ],
    },
  };

  const visible = ref(false);

  const erpCodeList = ref([]);
  const splitType = ref('split_by_product');
  const subSplitType = ref('each_product_num_split');
  const subSplitTypeList = computed(() => splitTypeMap[splitType.value].children);
  const splitTypeChange = (val: string) => {
    subSplitType.value = splitTypeMap[val].children[0].value;
  };

  const resultDialogRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      const res = await omsApi.omsFulfillmentOrderBatchSubOrder({
        erpCodeList: erpCodeList.value,
        splitType: splitType.value,
        subSplitType: subSplitType.value,
      });
      if (res?.failList?.length) {
        resultDialogRef.value?.open(res?.failList, '批量拆单');
      } else {
        ElMessage.success('批量拆单成功');
      }
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (codeList: string[]) => {
    erpCodeList.value = codeList;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .tip {
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 4px;
    background: #f7f8fa;
    font-size: 12px;
    .title {
      color: #ff7d00;
      font-weight: 600;
    }
    .bold-text {
      color: #1d2129;
      font-weight: 600;
      margin-top: 4px;
      line-height: 18px;
    }
    .text {
      color: #4e5969;
      line-height: 18px;
    }
  }
</style>
