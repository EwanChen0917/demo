<template>
  <KeenCard>
    <p>
      <el-button type="primary" @click="bindVisible = true">关联发货指令</el-button>
    </p>
    <vxe-table
      border="inner"
      :data="form.planCommandItemList"
      row-id="commandCode"
      v-loading="detailLoading"
    >
      <vxe-column field="commandCode" title="发货指令单号" />
      <vxe-column field="skuCode" title="产品SKU" />
      <vxe-column field="productName" title="产品名称" />
      <vxe-column field="estimateQty" title="预计发货量" />
      <vxe-column field="estimateShipDate" title="预计发货时间" />
      <vxe-column field="shipMethodDesc" title="发货方式" />
      <vxe-column field="planer" title="计划" />
      <vxe-column title="操作">
        <template #default="{ row }">
          <el-link type="danger" :underline="false" @click="deleteItem(row)">删除</el-link>
        </template>
      </vxe-column>
    </vxe-table>
  </KeenCard>
  <KeenCard>
    <p class="d-flex gap-20">
      <el-date-picker
        type="date"
        v-model="form.baseInfo.pickTime"
        placeholder="提货时间"
        value-format="YYYY-MM-DD"
      />
      <el-select v-model="form.baseInfo.pickType" placeholder="提货方式" disabled>
        <el-option label="中仓自提" :value="0" />
        <el-option label="物流提货" :value="1" />
      </el-select>
    </p>
    <vxe-table max-height="900px" border="inner" :data="form.itemList" row-id="supplySku">
      <vxe-column field="supplySku" title="供应链SKU" />
      <vxe-column field="supplierDesc" title="供应商名称" />
      <vxe-column field="skuCode" title="产品SKU" />
      <vxe-column field="productName" title="产品名称" />
      <vxe-column field="purchaseWaitPickQty" title="采购未交数量" />
      <vxe-column title="提货数量">
        <template #default="{ row }">
          <el-input-number
            v-if="form.baseInfo.pickType === 0"
            v-model="row.pickQty"
            :controls="false"
            :precision="0"
            :min="minMap[row.supplySku]"
            :max="row.purchaseWaitPickQty"
          />
          <span v-else>{{ row.pickQty || '-' }}</span>
        </template>
      </vxe-column>
      <vxe-column title="关联发货指令">
        <template #default="{ row }">
          <div v-for="item in row.shipCommandCodeList" :key="item">
            {{ item }}
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button
        type="primary"
        @click="save"
        :disabled="form.itemList.length === 0"
        v-loading="saveLoading"
      >
        保存
      </el-button>
    </el-space>
  </div>
  <BindShipCommandDialog
    :visible="bindVisible"
    @close="handleBindClose"
    :selected-rows="form.planCommandItemList"
  />
</template>

<script setup lang="ts" name="takeDeliveryManageAdd">
  import BindShipCommandDialog from '@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/component/bindShipCommandDialog.vue';
  import { PlanBillLadingDetailQueryResp, PickTypeItem } from '@/api/erp/data-contracts';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useRequest } from 'vue-request';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const bindVisible = ref<boolean>(false);

  const form = reactive<PlanBillLadingDetailQueryResp>({
    baseInfo: {
      pickTime: '',
      pickType: '',
    },
    itemList: [],
    planCommandItemList: [],
  });

  const route = useRoute();
  const router = useRouter();
  const { code } = route.query;
  const { loading: detailLoading, data: detailData } = useRequest(
    erpApi.luteosErpPlanBillLadingQueryDetail,
    {
      defaultParams: [
        {
          code,
        },
      ],
      manual: !code,
    }
  );

  watchEffect(() => {
    Object.assign(form, detailData.value);
  });

  const minMap = ref({});
  const handleBindClose = async (reload, val) => {
    if (reload) {
      form.planCommandItemList = val;
      const res = await erpApi.luteosErpPlanBillLadingQueryProduct({
        shipCommandCodeList: form.planCommandItemList?.map((item) => item.commandCode),
        pageNum: 1,
        pageSize: 500,
      });
      form.itemList = res?.recordList;
      form.baseInfo.pickType = form.planCommandItemList[0]?.shipMethod === '1' ? 0 : 1;
      form.itemList?.forEach((item) => {
        minMap.value[item.supplySku] = item.pickQty;
      });
    }
    bindVisible.value = false;
  };

  const pickTypeList = ref<PickTypeItem[]>([]);
  const queryPickType = async () => {
    const res = await erpApi.luteosErpPlanBillLadingQuertPickType();
    pickTypeList.value = res?.pickTypeItemList;
  };

  const deleteItem = (row) => {
    form.planCommandItemList = form.planCommandItemList.filter(
      (item) => item.commandCode !== row.commandCode
    );
    form.itemList.forEach((item) => {
      if (item.shipCommandCodeList?.includes(row.commandCode)) {
        item.shipCommandCodeList = item.shipCommandCodeList.filter(
          (code) => code !== row.commandCode
        );
      }
    });
    form.itemList = form.itemList.filter((item) => item.shipCommandCodeList.length > 0);
  };

  queryPickType();

  const saveLoading = ref<boolean>(false);
  const save = async () => {
    if (!form.baseInfo.pickTime) {
      ElMessage.warning('未选择提货时间');
      return;
    }
    saveLoading.value = true;
    await (code
      ? erpApi.luteosErpPlanBillLadingModifyAndSubmit(form)
      : erpApi.luteosErpPlanBillLadingSaveAndSubmit(form));
    ElMessage.success('保存成功');
    saveLoading.value = false;
    closeTabAndRefresh('takeDeliveryManage');
    router.push({ name: 'takeDeliveryManage' });
  };
</script>

<style scoped lang="scss"></style>
