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
          placeholder="配送方式代码/配送方式名称"
          style="width: 250px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.warehouseCode" clearable filterable placeholder="仓库名称">
        <el-option
          v-for="item in warehouseList"
          :key="item.warehouseCode"
          :label="item.warehouseDesc"
          :value="item.warehouseCode"
        />
      </el-select>
      <el-select v-model="search.spCode" clearable filterable placeholder="承运商">
        <el-option
          v-for="item of supplierList"
          :key="item.supplierCode"
          :label="item.supplierName"
          :value="item.supplierCode"
        />
      </el-select>
    </template>
    <!-- <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="spCode"
      class-name="table-row-dashed"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="ps-20">
            <el-table :data="props?.row?.smWarehouseParamBeanList">
              <el-table-column label="序号" prop="rowNum" width="50" />
              <el-table-column label="配送方式代码" prop="smCode" min-width="160" />
              <el-table-column label="配送方式名称" prop="smName" min-width="160" />
              <el-table-column label="仓库名称" min-width="250">
                <template #default="{ row }">
                  <OverflowTooltip
                    :content="row?.warehouseList?.map((item) => item.desc)?.join(', ')"
                    :line="4"
                    placement="bottom"
                  />
                </template>
              </el-table-column>
              <!--              <el-table-column label="仓库代码" prop="warehouseCode" />-->
              <el-table-column label="状态" min-width="80">
                <template #default="{ row }">
                  <Tag :color="statusMap[row.smStatus]">{{ row?.smStatusDesc }}</Tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template #default="{ row }">
                  <div v-if="row?.refreshing" class="d-flex align-items-center gap-2 text-primary">
                    <span>相关配置生成中</span>
                    <el-icon><Loading /></el-icon>
                  </div>
                  <KeenActions
                    v-else
                    :actions="[
                      {
                        label: '编辑',
                        key: 'edit',
                        type: 'primary',
                        disabled: row?.warehouseList?.length === 0,
                        row,
                      },
                    ]"
                    @click="handleActions"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="承运商" prop="spName" />
      <el-table-column label="承运商代码" prop="spCode" />
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
  <EditDialog ref="editRef" @success="refreshList" />
</template>

<script setup lang="ts" name="skuSetting">
import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, dataApi } from '@/api';
  import EditDialog from '@/views/supplyChainManage/efficiencyTools/shipmentType/components/editDialog.vue';
  import { Loading } from '@element-plus/icons-vue';

  const PAGE_SIZE = 10;

  const statusMap = {
    0: 'red',
    1: 'green',
  };

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
    ErpApi.LuteosErpOrderShipmentQuerySpList.RequestBody,
    ErpApi.LuteosErpOrderShipmentQuerySpList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      spCode: undefined,
      warehouseCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOrderShipmentQuerySpList,
  });

  const warehouseList = ref<any[]>([]);
  const getWarehouseList = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      page: 1,
      pageSize: 1000,
    });
    warehouseList.value = res?.warehouseList;
  };

  const supplierList: any = ref([]);
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQueryShippingSupplierList();
    supplierList.value = res.shippingSupplierList;
  };

  const editRef = ref();
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editRef.value?.open(row);
    }
  };

  onActivated(() => {
    getWarehouseList();
    getSupplierList();
  });
</script>

<style scoped lang="scss"></style>
