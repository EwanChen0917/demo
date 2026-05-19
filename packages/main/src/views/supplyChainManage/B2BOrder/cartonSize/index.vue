<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="产品SKU/供应链SKU/产品名称"
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.customerCode" filterable clearable placeholder="客户名称">
        <el-option
          v-for="item in customerList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="add" v-permission="'cartonSizeAdd'">新增</el-button>
      <el-button
        type="primary"
        @click="batchUpdateDialogRef?.open"
        v-permission="'cartonSizeBatchUpdate'"
      >
        批量更新
      </el-button>
      <el-button type="primary" @click="exportList" plain v-permission="'cartonSizeExport'">
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column label="产品SKU" prop="skuCode" min-width="120" />
      <el-table-column label="产品名称" prop="productName" min-width="120" />
      <el-table-column label="供应链SKU" prop="supplySkuList" min-width="120">
        <template #default="{ row }">
          <span v-if="row?.supplySkuList?.length === 1">
            {{ row?.supplySkuList[0] }}
          </span>
          <el-dropdown trigger="click" v-else-if="row?.supplySkuList?.length > 1">
            <span class="el-dropdown-link">
              {{ row?.supplySkuList[0] }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in row.supplySkuList" :key="item">
                  <span v-if="index > 0">{{ item }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" prop="customerName" />
      <el-table-column label="箱规（cm）" prop="sizeDesc" />
      <el-table-column label="件数" prop="qty" />
      <el-table-column label="出库类型" prop="outStockTypeDesc" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
                permissionCode: 'cartonSizeEdit',
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                row: row,
                permissionCode: 'cartonSizeDelete',
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
  <ImportUpdateDialog
    title="批量更新"
    notice="请注意标黄必填字段，未填写必填字段将上传失败"
    :downloadParams="search"
    type="batchUpdate"
    ref="batchUpdateDialogRef"
    @success="refreshList"
  />
</template>

<script setup lang="ts" name="cartonSize">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import ImportUpdateDialog from './components/importUpdateDialog.vue';

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
    ErpApi.LuteosErpCartonSizeQueryList.RequestBody,
    ErpApi.LuteosErpCartonSizeQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      customerCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpCartonSizeQueryList,
  });

  const batchUpdateDialogRef = ref();

  const router = useRouter();

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      window.sessionStorage.setItem('cartonSizeInfo', JSON.stringify(row));
      router.push({
        name: 'cartonSizeEdit',
      });
    }
    if (key === 'delete') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await erpApi.luteosErpCartonSizeDelete({ codeList: [row.code] });
      ElMessage.success('删除成功');
      refreshList();
    }
  };

  const add = () => {
    window.sessionStorage.removeItem('cartonSizeInfo');
    router.push('/cartonSize/add');
  };

  const customerList = ref<string[]>([]);
  const queryCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerList.value = res?.recordList || [];
  };
  queryCustomerList();

  const exportList = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    const res = await erpApi.luteosErpCartonSizeDownTemplate({ ...search });
    openWindow(res);
  };
</script>

<style scoped lang="scss"></style>
