<template>
  <el-dialog title="审批记录" :model-value="visible" @close="visible = false" width="1200px">
    <el-table :data="approvalList" v-loading="loading" max-height="600">
      <el-table-column label="提交时间" prop="createTime" min-width="180" fixed="left" />
      <el-table-column label="提交人" prop="creatorName" />
      <el-table-column label="产品信息" min-width="200">
        <template #default="{ row }">
          <GoodsInfo
            v-if="row?.dimensionCode"
            :title="row.dimensionCode"
            :subtitle="row.dimensionName"
            hide-image
          />
        </template>
      </el-table-column>
      <el-table-column label="周" prop="weekTag" min-width="180" />
      <el-table-column label="促销信息" min-width="350" fixed="right">
        <template #default="{ row }">
          <div>类型： {{ row.discountTypesStr }}</div>
          <div>
            折扣率： {{ row.discountRateStr }} 使用率： {{ row.usageRateStr }} 日销：
            {{ row.estimateDaySale }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" prop="approveStatusStr" fixed="right" min-width="100" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const visible = ref(false);
  const approvalList = ref<any[]>([]);
  const loading = ref(false);
  const open = (code) => {
    queryApprovalList(code);
    visible.value = true;
  };

  const queryApprovalList = async (code) => {
    approvalList.value = [];
    loading.value = true;
    const res = await productApi
      .luteosProductMsrpQueryApproveLog({
        code,
      })
      .finally(() => {
        loading.value = false;
      });
    approvalList.value = res.logList || [];
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
