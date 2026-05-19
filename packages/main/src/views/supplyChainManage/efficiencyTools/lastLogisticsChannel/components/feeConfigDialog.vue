<!-- 费用配置弹窗 -->
<template>
  <el-dialog v-model="visible" title="费用配置" width="800px" @close="close">
    <el-table :data="billingAgreementConfigList">
      <el-table-column label="ID" prop="id" width="80" />
      <el-table-column label="费用类别" prop="feeCategory" />
      <el-table-column label="费用名称" prop="feeName" />
      <el-table-column label="计费标准" prop="billingBasisDesc" />
      <el-table-column label="重量处理方式" prop="weightProcessMethod" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <KeenActions
            :actions="[{ label: '费用详情', key: 'feeDetail', type: 'primary', row: row }]"
            @click="handleFeeDetail(row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog v-model="feeDetailVisible" title="费用详情" width="1200px" @close="closeFeeDetail">
    <el-table :data="feeDetailList">
      <el-table-column label="包裹类型" prop="packageType" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row.packageType" :line="2" />
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="billingMethodDesc" />
      <el-table-column label="重量起始值/首重" prop="weightStart" width="120" />
      <el-table-column label="重量结束值/续重" prop="weightEnd" width="120" />
      <el-table-column label="产品价格最小值" prop="priceStart" min-width="120" />
      <el-table-column label="产品价格最大值" prop="priceEnd" min-width="120" />
      <el-table-column
        width="120"
        v-for="(column, index) in feeDetailList[0]?.extHeadList?.items"
        :key="column.id"
      >
        <template #header>
          {{ column.value }}
        </template>
        <template #default="{ row }">
          <div v-for="(c, idx) in row.detailList" :key="idx">
            {{ c.items[index].value }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script setup lang="ts" name="feeConfigDialog">
  import { TmsApi, tmsApi } from '@/api';
  const visible = ref(false);
  const feeDetailVisible = ref(false); // 费用详情弹窗
  const feeDetailList = ref<any[]>([]); // 费用详情列表
  const billingAgreementConfigList = ref<any[]>([]);
  const open = (data: any) => {
    billingAgreementConfigList.value = data;
    visible.value = true;
  };
  const handleFeeDetail = async (row: any) => {
    feeDetailVisible.value = true;
    try {
      const res = await tmsApi.tmsErpLogisticsLastmileChannelQueryRateConfig({
        configId: row.id,
      });
      feeDetailList.value = res?.recordList || [];
    } catch (error) {}
  };
  const closeFeeDetail = () => {
    feeDetailVisible.value = false;
    feeDetailList.value = [];
  };
  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>
