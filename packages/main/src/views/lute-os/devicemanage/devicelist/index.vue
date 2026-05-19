<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="设备编码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.model" placeholder="设备型号">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.email" placeholder="用户邮箱">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="refreshList">查询</el-button>
      <el-button
        class="button"
        type="primary"
        plain
        @click="
          handleExport({
            // codeList,
            ...search,
            pageNum: current,
            pageSize,
          })
        "
        :loading="exportLoading"
      >
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.deviceList"
      row-key="deviceCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="deviceCode" label="设备编号" />
      <el-table-column prop="model" label="设备型号" />
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="country" label="国家" />
      <el-table-column prop="address" label="省/市">
        <template #default="scope">{{ scope.row.province }}{{ scope.row.city }}</template>
      </el-table-column>
      <el-table-column prop="relateTime" label="绑定时间" width="160" />
      <el-table-column prop="activeTime" label="激活时间" width="160" />
      <el-table-column label="操作" align="right" width="55">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                payload: { code: scope.row.deviceCode, uid: scope.row.userId },
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
  </KeenList>
</template>

<script lang="ts" setup name="devicelist">
    import useList from '@/views/lute-os/hooks/list/useList';
  import useExport from '@/hooks/list/useExport';
  import { deviceApi, DeviceApi } from '@/api/index';

  const {
    search,
    // searchData,
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
    refreshList,
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    handleSelectionChange,
  } = useList<
    DeviceApi.LuteosDeviceQueryDeviceList.RequestQuery,
    DeviceApi.LuteosDeviceQueryDeviceList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      model: undefined,
      email: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: deviceApi.luteosDeviceQueryDeviceList,
  });
  const { handleExport, exportLoading } = useExport(deviceApi.luteosDeviceExportDeviceList);

  const router = useRouter();
  // 表格操作
  const handleActions = (item) => {
    const {
      key,
      payload: { code, uid },
    } = item;

    if (key === 'view') {
      router.push(`/devicelist/detail?code=${code}&uid=${uid}`);
    }
  };
</script>
