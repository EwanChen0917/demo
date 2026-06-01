<template>
  <el-form :model="form" ref="formRef" v-loading="loading">
    <KeenCard title="基本信息" :marginBottom="0">
      <el-space :size="32">
        <el-form-item prop="supplierPickupCode" label="供应商提货批号">
          <span>{{ form.supplierPickupCode }}</span>
        </el-form-item>
        <el-form-item prop="supplierCode" label="供应商编码">
          <span>{{ form.supplierCode }}</span>
        </el-form-item>
        <el-form-item prop="supplierName" label="供应商名称">
          <span>{{ form.supplierName }}</span>
        </el-form-item>
      </el-space>
    </KeenCard>
    <KeenCard title="提货计划" :marginBottom="0">
      <el-table :data="form.pickupFormatList" row-key="materialNumber" default-expand-all>
        <el-table-column type="expand" fixed>
          <template #default="{ row }">
            <el-table
              :data="row?.pickupItemList"
              v-loading="row.loading"
              border
              row-key="orderNumber"
            >
              <el-table-column label="PO单号" prop="orderNumber" min-width="140" />
              <el-table-column label="订单行号" prop="itemNumber" min-width="80" />
              <el-table-column label="物料编码" prop="materialNumber" min-width="120" />
              <el-table-column label="供应链SKU" prop="supplySku" min-width="140" />
              <el-table-column label="物料名称" prop="materialName" min-width="120">
                <template #default="{ row }">
                  <OverflowTooltip :content="row.materialName" :line="1" />
                </template>
              </el-table-column>
              <el-table-column label="物料分类名称" prop="cateName" min-width="120" />
              <el-table-column label="采购周期" prop="purchaseCycle" min-width="80" />
              <el-table-column label="采购类型" prop="purchaseType" min-width="100" />
              <el-table-column label="采购单位" prop="purchaseUnit" min-width="80" />
              <el-table-column label="SRM行状态" prop="itemStatusDesc" min-width="100" />
              <el-table-column label="要求交期" prop="requireDate" min-width="150" />
              <el-table-column label="原始要求交期" prop="originalRequireDate" min-width="120" />
              <el-table-column label="本次需求数量" prop="requireQuantity" min-width="120" />
              <el-table-column label="回复日期" prop="replyDate" min-width="120" />
              <el-table-column label="回复数量" prop="replyQuantity" min-width="100" />
              <el-table-column label="回复已发数量" prop="replySentQuantity" min-width="100" />
              <el-table-column label="回复未发数量" prop="replyNotSentQuantity" min-width="100" />
              <el-table-column label="需方备注" prop="purchaseRemark" min-width="120" />
              <el-table-column label="供方备注" prop="supplierRemark" min-width="120" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50">
          <template #default="{ $index }">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提货SKU" prop="materialNumber" />
        <el-table-column label="提货总数量" prop="pickupQuantity" />
        <el-table-column label="回复总数量" prop="replyQuantity" />
        <el-table-column label="需求交期" prop="deliveryDate" />
      </el-table>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-button @click="close">返回</el-button>
    <!-- <template v-if="showConfirmButton"> 
      <el-button type="primary" @click="handlePlanStatus('confirm')">整单确认</el-button> 
      <el-button type="danger" @click="handlePlanStatus('reject')">整单拒绝</el-button> 
    </template> -->
  </div>
</template>

<script setup lang="ts" name="pickupPlanDetail">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { useTabs } from '@/hooks/tabs';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  const router = useRouter();
  const route = useRoute();
  const { closeTabAndRefresh } = useTabs();
  const itemId = route.query.itemId as string;
  const status = route.query.status as string;
  const supplierPickupCode = route.query.supplierPickupCode as string;

  const showConfirmButton = computed(() => {
    return status === '2' && supplierPickupCode === form.value.supplierPickupCode; // 待采购确认状态显示整单确认按钮
  });

  const loading = ref(false);
  const formRef = ref();
  const form = ref<any>({
    supplierCode: undefined, // 供应商编码
    supplierName: undefined, // 供应商名称
    code: undefined, // 计划提货批号
    supplierPickupCode: undefined, // 供应商提货批号
    pickupFormatList: [], // 提货计划
  });

  onMounted(() => {
    if (itemId) {
      getDetailData();
    }
  });

  const getDetailData = async () => {
    try {
      const res = await erpApi.luteosErpPlanPickupQueryDetail({ itemId });
      form.value = res || [];
    } catch (error) {}
  };

  // 整单确认/拒绝
  const handlePlanStatus = async (type) => {
    const confirmed = await swal.confirm({
      title: '提货整单确认',
      text: '请确认是否同意供应商回复提货信息？',
    });
    if (!confirmed) {
      return;
    }
    try {
      await erpApi.luteosErpPlanPickupConfirmOrRejectPlan({ itemId, operationType: type });
      ElMessage.success(`计划${type === 'confirm' ? '确认' : '拒绝'}成功`);
      close();
    } catch (error) {}
  };

  const close = () => {
    closeTabAndRefresh('pickupPlan');
    router.push({
      name: 'pickupPlan',
    });
  };
</script>

<style scoped></style>
