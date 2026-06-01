<template>
  <div class="card card-flush">
    <div class="card-body pt-0">
      <el-table ref="tableRef" v-loading="listLoading" :data="listData?.bindingDevices">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="deviceCode" label="设备编号" min-width="80" />
        <el-table-column prop="model" label="设备型号" />
        <el-table-column prop="email" label="用户邮箱" min-width="160" />
        <el-table-column prop="mobile" label="手机号" min-width="120" />
        <el-table-column prop="countryName" label="国家" />
        <el-table-column prop="address" label="省/市" />
        <el-table-column prop="activeTime" label="绑定时间" min-width="160" />
        <el-table-column prop="activeTime" label="激活时间" min-width="160" />
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <KeenActions
              :actions="[
                {
                  label: '查看详情',
                  key: 'view',
                  type: 'primary',
                  text: true,
                  deviceCode: scope.row.deviceCode,
                },
              ]"
              @click="handleActions"
            />
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
    UserApi.LuteosUserQueryBindingDevices.RequestQuery,
    UserApi.LuteosUserQueryBindingDevices.ResponseBody
  >({
    searchDefaults: {
      uid: route.query.uid || '',
    },
    pageSize: 10,
    service: userApi.luteosUserQueryBindingDevices,
  });

  // 表格操作
  const handleActions = (item) => {
    const { key, deviceCode } = item;

    if (key === 'view') {
      router.push(`/userlist/servicedetail?deviceCode=${deviceCode}&uid=${route.query.uid}`);
    }
  };
</script>

<style scoped lang="scss">
  .text-gray-400 {
    font-weight: 600;
    margin-top: 20px;
  }
</style>
