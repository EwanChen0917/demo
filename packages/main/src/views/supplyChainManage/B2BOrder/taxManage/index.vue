<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <!--    <template #search>
      <el-input v-model="search.keyword" placeholder="" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>-->
    <template #filters>
      <CountrySelect
        style="width: 160px"
        v-model="search.countryCodeList"
        clearable
        multiple
        filterable
      />
      <el-select v-model="search.isEu" placeholder="是否欧盟" clearable>
        <el-option label="是" value="1" />
        <el-option label="否" value="0" />
      </el-select>
      <el-select v-model="search.taxType" placeholder="税种" filterable clearable>
        <el-option
          v-for="item in listData?.enumsList?.taxType"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="importDialogRef?.open">导入</el-button>
      <ExportBtn :service="erpApi.luteosErpRateCfgExport" :params="search">导出</ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <!--        <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column label="国家" prop="countryName" />
      <el-table-column label="国家简称" prop="countryCode" />
      <el-table-column label="是否欧盟国家" prop="isEuDesc" />
      <el-table-column label="省/州" prop="province" />
      <el-table-column label="城市" prop="city" />
      <el-table-column label="区/县" prop="area" />
      <el-table-column label="客户名称" prop="customerName" />
      <el-table-column label="税种" prop="taxType" />
      <el-table-column label="税率" prop="taxRateDesc" />
      <el-table-column label="VAT税率" prop="vatTaxRateDesc" />
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <Tag :color="row?.status === 1 ? 'green' : 'red'">
            {{ row?.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                permissionCode: '',
                hide: row?.status === 0,
                row,
              },
              {
                label: '生效',
                key: 'enable',
                hide: row?.status === 1,
                type: 'primary',
                permissionCode: '',
                row,
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
  <ImportUpdateDialog title="导入" ref="importDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="taxManage">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';
  import ImportUpdateDialog from '@/views/supplyChainManage/B2BOrder/taxManage/components/importUpdateDialog.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const importDialogRef = ref();
  const PAGE_SIZE = 10;

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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpRateCfgQueryList.RequestBody,
    ErpApi.LuteosErpRateCfgQueryList.ResponseBody
  >({
    searchDefaults: {
      countryCodeList: undefined,
      isEu: undefined,
      taxType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpRateCfgQueryList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'cancel') {
      const isConfirm = await swal.confirm('确定要作废吗？');
      if (!isConfirm) return;
      await erpApi.luteosErpRateCfgChangeStatus({ id: row?.id, status: 0 });
      ElMessage.success('作废成功');
      refreshList();
    } else if (key === 'enable') {
      const isConfirm = await swal.confirm('确定要生效吗？');
      if (!isConfirm) return;
      await erpApi.luteosErpRateCfgChangeStatus({ id: row?.id, status: 1 });
      ElMessage.success('生效成功');
      refreshList();
    }
  };
</script>

<style scoped lang="scss"></style>
