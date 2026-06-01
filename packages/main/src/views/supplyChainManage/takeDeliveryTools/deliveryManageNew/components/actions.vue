<template>
  <el-form :model="form" ref="formRef" label-width="130px" scroll-to-error :show-message="false">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <KeenCard :title="`送货信息#${form.baseInfo.code}`">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="送货公司名称">
                <!-- <el-input v-model="form.fromInfo.companyName" /> -->
                {{ form.fromInfo.companyName }}
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="送货地址">
                <!-- <el-input v-model="form.fromInfo.address" /> -->
                {{ form.fromInfo.address }}
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系人">
                <!-- <el-input v-model="form.fromInfo.contacts" /> -->
                {{ form.fromInfo.contacts }}
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系方式">
                <!-- <el-input v-model="form.fromInfo.contactWay" /> -->
                {{ form.fromInfo.contactWay }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </el-col>
      <el-col :span="12" :offset="0">
        <KeenCard title="收货信息">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="收货公司名称">
                {{ form.toInfo.companyName }}
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="收货地址">
                {{ form.toInfo.address }}
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系人">
                {{ form.toInfo.contacts }}
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系方式">
                {{ form.toInfo.contactWay }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <KeenCard title="产品信息">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="发货时间">
                    {{ form.baseInfo.sendTime }}
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="收货人">
                    {{ form.baseInfo.receiver || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="收货时间">
                    {{ form.baseInfo.receiveTime || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <vxe-table :data="form.itemInfoList" border="inner" empty-text="请先选择提货单">
            <vxe-column field="supplySku" title="供应链SKU" min-width="160px" />
            <vxe-column field="productName" title="产品名称" min-width="280px" />
            <vxe-column field="sendQty" :title="`发货数量(${countMap.sendQty})`" min-width="120px">
              <template #default="{ row }">
                <div class="cell-container" v-for="item of row.purchaseInfoList" :key="item.poCode">
                  {{ item.sendQty }}
                </div>
              </template>
            </vxe-column>
            <vxe-column
              field="receiveQty"
              :title="`收货数量(${countMap.receiveQty})`"
              min-width="120px"
            >
              <template #default="{ row, $rowIndex }">
                <template v-if="mode === 'receive'">
                  <el-form-item
                    v-for="(item, index) of row.purchaseInfoList"
                    :key="item.poCode"
                    class="form-table-item"
                    :prop="`itemInfoList[${$rowIndex}].purchaseInfoList[${index}].receiveQty`"
                    required
                  >
                    <NumberInput
                      v-model="row.purchaseInfoList[index].receiveQty"
                      :min="0"
                      :precision="0"
                    />
                  </el-form-item>
                </template>
                <template v-else>
                  <div
                    class="cell-container"
                    v-for="item of row.purchaseInfoList"
                    :key="item.poCode"
                  >
                    {{ typeof item.receiveQty === 'number' ? item.receiveQty : '-' }}
                  </div>
                </template>
              </template>
            </vxe-column>
            <vxe-column field="purchaseOrderCode" title="入库单号" min-width="180px">
              <template #default="{ row }">
                <div class="cell-container" v-for="item of row.purchaseInfoList" :key="item.poCode">
                  {{ item.warehouseEntryCode }}
                </div>
              </template>
            </vxe-column>
            <vxe-column field="jjWarehouseEntryCode" title="积加入库单号" min-width="180px">
              <template #default="{ row }">
                <div
                  class="cell-container"
                  v-for="item of row.purchaseInfoList"
                  :key="item.jjPoCode"
                >
                  {{ item.jjWarehouseEntryCode }}
                </div>
              </template>
            </vxe-column>
            <vxe-column field="purchaseOrderCode" title="易仓采购单号" min-width="180px">
              <template #default="{ row }">
                <div class="cell-container" v-for="item of row.purchaseInfoList" :key="item.poCode">
                  {{ item.poCode }}
                </div>
              </template>
            </vxe-column>
            <vxe-column field="jjPoCode" title="积加采购单号" min-width="180px">
              <template #default="{ row }">
                <div
                  class="cell-container"
                  v-for="item of row.purchaseInfoList"
                  :key="item.jjPoCode"
                >
                  {{ item.jjPoCode }}
                </div>
              </template>
            </vxe-column>
            <vxe-column field="srmPoCode" title="企企通采购单号" min-width="180px">
              <template #default="{ row }">
                <div
                  class="cell-container"
                  v-for="item of row.purchaseInfoList"
                  :key="item.srmPoCode"
                >
                  {{ item.srmPoCode }}
                </div>
              </template>
            </vxe-column>
            <vxe-column
              field="sendBoxQty"
              :title="`发货箱数(${countMap.sendBoxQty})`"
              min-width="120px"
            />
            <vxe-column
              field="receiveBoxQty"
              :title="`收货箱数(${countMap.receiveBoxQty})`"
              min-width="120px"
            >
              <template #default="{ row, $rowIndex }">
                <template v-if="mode === 'receive'">
                  <el-form-item
                    class="form-table-item"
                    :prop="`itemInfoList[${$rowIndex}].receiveBoxQty`"
                    required
                  >
                    <NumberInput v-model="row.receiveBoxQty" :min="0" :precision="0" />
                  </el-form-item>
                </template>
                <template v-else>
                  {{ typeof row.receiveBoxQty === 'number' ? row.receiveBoxQty : '-' }}
                </template>
              </template>
            </vxe-column>
            <vxe-column field="remark" title="备注" min-width="280px">
              <template #default="{ row }">
                <div class="cell-container" v-for="item of row.purchaseInfoList" :key="item.poCode">
                  {{ item.remark }}
                </div>
              </template>
            </vxe-column>
          </vxe-table>
        </KeenCard>
      </el-col>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode === 'receive'">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确认收货</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { erpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const props = defineProps<{
    mode: 'detail' | 'receive';
  }>();
  const getDetailData = async () => {
    const res: any = await omsApi.omsDeliveryBillQueryDetail({
      code: route.query.code as string,
    });
    form.value = res;
    if (props.mode === 'receive') {
      form.value?.itemInfoList?.forEach((item) => {
        item.receiveBoxQty = item?.sendBoxQty || 0;
        item.purchaseInfoList.forEach((k) => {
          k.receiveQty = k?.sendQty || 0;
        });
      });
    }
  };
  getDetailData();
  const formRef = ref();
  const form = ref({
    baseInfo: {
      code: '',
      prebookCode: '',
      receiveTime: '',
      receiver: '',
      sendTime: '',
      status: 0,
      statusDesc: '',
    },
    fromInfo: {
      address: '',
      companyName: '',
      contactWay: '',
      contacts: '',
      type: 0,
    },
    itemInfoList: [
      {
        id: '',
        poCode: '',
        productName: '',
        receiveBoxQty: 0,
        receiveQty: 0,
        sendBoxQty: 0,
        sendQty: 0,
        supplySku: '',
        warehouseEntryCode: '',
        purchaseInfoList: [],
      },
    ],
    toInfo: {
      address: '',
      companyName: '',
      contactWay: '',
      contacts: '',
      type: 0,
    },
  });
  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'deliveryManage',
    });
  };
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const confirm = await swal.confirm({
        title: `确定收货吗？`,
        text: '确定后将推送易仓对应入库单并收货',
      });
      if (confirm) {
        saveLoading.value = true;
        await erpApi.luteosErpPlanDeliveryBillConfirm({
          code: form.value.baseInfo.code,
          itemInfoList: form.value.itemInfoList as [],
        });
        ElMessage.success('操作成功');
        closeTabAndRefresh('deliveryManage');
        cancel();
        saveLoading.value = false;
      }
    }
  };
  const countMap = computed(() => {
    return {
      receiveBoxQty: form.value.itemInfoList.reduce((sum, item) => {
        return sum + +item.receiveBoxQty;
      }, 0),
      receiveQty: form.value.itemInfoList.reduce((sum, item: any) => {
        return (
          sum +
          item.purchaseInfoList.reduce((total, row) => {
            return total + +row.receiveQty;
          }, 0)
        );
      }, 0),
      sendBoxQty: form.value.itemInfoList.reduce((sum, item) => {
        return sum + +item.sendBoxQty;
      }, 0),
      sendQty: form.value.itemInfoList.reduce((sum, item: any) => {
        return (
          sum +
          item.purchaseInfoList.reduce((total, row) => {
            return total + +row.sendQty;
          }, 0)
        );
      }, 0),
    };
  });
</script>

<style scoped lang="scss">
  :deep(.el-form-item__label:after) {
    content: '：';
  }
  .form-table-item {
    &.el-form-item {
      margin: 0 0 6px 0;
    }
    // margin: 0;
    :deep(.el-form-item__content) {
      margin: 0 !important;
    }
  }
  ::v-deep(.card-body.pt-0) {
    padding: 16px 30px !important;
  }
  .cell-container {
    min-height: 42px;
    line-height: 42px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
