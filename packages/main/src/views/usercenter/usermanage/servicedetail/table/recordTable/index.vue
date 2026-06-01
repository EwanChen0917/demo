<template>
  <div class="card card-flush">
    <div class="card-body pt-0">
      <h3 class="pro-title">使用记录</h3>
      <el-table ref="tableRef" v-loading="listLoading" :data="listData?.deviceUsageRecords">
        <el-table-column prop="durationTime" label="使用时间" />
        <el-table-column prop="usageTime" label="使用时长" />
        <!-- 二期字段 -->
        <!-- <el-table-column prop="skus" label="使用时长（校正前）" min-width="100" />
        <el-table-column prop="goodsNum" label="吸奶量（校正前）" />
        <el-table-column prop="goodsUnitPrice" label="吸奶量（校正后）" />
        <el-table-column prop="totalPrice" label="模式" />
        <el-table-column prop="purchaseTime" label="左/右键" /> -->
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { deviceApi, DeviceApi } from '@/api/index';

  const route = useRoute();
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
  } = useList<
    DeviceApi.LuteosDeviceQueryDeviceUsages.RequestQuery,
    DeviceApi.LuteosDeviceQueryDeviceUsages.ResponseBody
  >({
    searchDefaults: {
      uid: route.query.uid || '',
      deviceCode: route.query.deviceCode || '',
    },
    pageSize: 10,
    service: deviceApi.luteosDeviceQueryDeviceUsages,
  });
</script>

<style scoped lang="scss">
  .pro-title {
    font-weight: 500;
    font-size: 1.275rem;
    color: #3f4254;
    display: flex;
    margin-top: 2rem;
  }
</style>
