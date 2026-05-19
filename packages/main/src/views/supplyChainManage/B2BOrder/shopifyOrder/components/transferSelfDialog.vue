<template>
  <el-dialog title="转自配送" v-model="visible" @close="visible = false">
    <div class="tip">
      <div>
        <div class="text">1. 转自配送，系统将向平台发起取消多渠道订单操作</div>
        <div class="text">2. 取消多渠道订单需要一定时间，请耐心等待取消结果</div>
      </div>
      <div style="color: rgb(245, 63, 63)">
        返回取消结果后（无论取消成功还是失败），请务必到平台后台确认下取消情况，避免重复发货！
      </div>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="发货仓库" prop="warehouseCode">
        <div class="form-flex">
          <OmsWarehouseSelect
            v-model="form.warehouseCode"
            teleported
            @change="form.shippingCode = ''"
          />
          <el-popover
            ref="inventoryPopoverRef"
            placement="bottom-end"
            trigger="click"
            @before-enter="queryInventory"
          >
            <template #default>
              <div class="inventory">
                <div class="inventory-title">库存预览</div>
                <el-table :data="inventoryData" max-height="40vh">
                  <el-table-column label="供应链SKU" prop="supplySku" min-width="100" />
                  <el-table-column label="仓库" prop="warehouseDesc" min-width="140">
                    <template #default="{ row }">
                      <OverflowTooltip :content="row.warehouseDesc" :line="3" :font-size="12" />
                    </template>
                  </el-table-column>
                  <el-table-column label="可用库存" prop="inventory" />
                  <el-table-column label="操作" width="80">
                    <template #default="{ row }">
                      <KeenActions
                        class="actions"
                        display-style="buttons"
                        :actions="[
                          {
                            label: '选择',
                            key: 'choose',
                            type: 'primary',
                            text: true,
                            row,
                          },
                        ]"
                        @click="handleActions"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
            <template #reference>
              <el-button type="text">查看库存</el-button>
            </template>
          </el-popover>
        </div>
      </el-form-item>
      <el-form-item label="物流渠道" prop="shippingCode">
        <OmsShippingSelect
          v-model="form.shippingCode"
          :warehouse-code="form.warehouseCode"
          teleported
          @sp-change="
            (val) => {
              spCode = val;
            }
          "
        />
      </el-form-item>
      <el-form-item label="是否已取消">
        <el-radio-group v-model="form.isCancelShipped">
          <el-radio :value="0">未取消转自配送</el-radio>
          <el-radio :value="1">已取消转自配送</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
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
  import OmsShippingSelect from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/omsShippingSelectUnique.vue';

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    warehouseCode: '',
    shippingCode: '',
    isCancelShipped: 0,
  });
  const rules = ref({
    warehouseCode: [
      {
        required: true,
        message: '请选择仓库',
        trigger: 'change',
      },
    ],
    shippingCode: [
      {
        required: true,
        message: '请选择物流渠道',
        trigger: 'change',
      },
    ],
  });

  const spCode = ref('');
  const erpCodelist = ref([]);
  const supplySkuList = ref([]);
  const resultDialogRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => false);
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const params = JSON.parse(
        JSON.stringify({
          ...form.value,
          spCode: spCode.value,
          erpCodeList: erpCodelist.value,
        })
      );
      params.shippingCode = params.shippingCode.split(',')?.[1];
      const res = await omsApi.omsFulfillmentOrderBatchTransferSelf(params);
      if (res?.failList?.length) {
        resultDialogRef.value?.open(res?.failList, '转自配送');
      } else {
        ElMessage.success('转自配送成功');
      }
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const inventoryData = ref([]);
  const queryInventory = async () => {
    const res = await omsApi.omsCommonStockQuerySupplySkuStock({
      supplySkuList: supplySkuList.value,
      searchInventory: true,
      pageNum: 1,
      pageSize: 100,
    });
    inventoryData.value = res?.supplySkuItemList || [];
  };

  const inventoryPopoverRef = ref();
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'choose') {
      formRef.value?.resetFields();
      form.value.warehouseCode = row.warehouseCode;

      inventoryPopoverRef.value?.hide();
    }
  };

  const open = (codeList, list) => {
    formRef.value?.resetFields();
    erpCodelist.value = codeList;
    supplySkuList.value = list;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .tip {
    border-radius: 4px;
    border: 1px solid #b0f1cc;
    background: #f0fff6;
    display: flex;
    font-size: 13px;
    padding: 12px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
    margin-bottom: 10px;
    .text {
      color: #1d2129;
      line-height: 18px;
      margin-top: 4px;
    }
  }

  .form-flex {
    display: flex;
    width: 100%;
  }

  .inventory {
    width: 600px;
    padding: 12px;
    &-title {
      font-family: 'PingFang SC Medium';
      margin-bottom: 5px;
    }
  }
</style>
