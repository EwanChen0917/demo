<template>
  <div class="card card-flush">
    <div class="card-body pt-0">
      <el-table ref="tableRef" v-loading="listLoading" :data="listData?.shippingAddresses">
        <el-table-column type="index" label="序号" min-width="50" />
        <el-table-column prop="firstName" label="收货人姓名" min-width="120">
          <template #default="scope">
            <span>{{ scope.row.firstName + ' ' + scope.row.lastName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" min-width="150" />
        <el-table-column prop="company" label="公司" min-width="120" />
        <el-table-column prop="address1" label="地址1" min-width="150" />
        <el-table-column prop="address2" label="地址2" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="province" label="省" min-width="100" />
        <el-table-column prop="zipCode" label="邮编" />
        <el-table-column prop="country" label="国家" min-width="120" />
        <el-table-column prop="defaultStatus" label="默认地址">
          <template #default="scope">
            <span>{{ +scope.row.defaultStatus === 1 ? '默认地址' : '/' }}</span>
          </template>
        </el-table-column>
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
  import { userApi, UserApi } from '@/api/index';

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
    UserApi.LuteosUserQueryUserShippingAddresses.RequestQuery,
    UserApi.LuteosUserQueryUserShippingAddresses.ResponseBody
  >({
    searchDefaults: {
      uid: route.query.uid || '',
    },
    pageSize: 10,
    service: userApi.luteosUserQueryUserShippingAddresses,
  });
</script>

<style scoped lang="scss"></style>
