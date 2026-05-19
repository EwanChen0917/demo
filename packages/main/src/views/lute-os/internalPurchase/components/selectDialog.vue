<template>
  <el-dialog
    width="65%"
    title="选择内购产品"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <KeenList>
      <template #search>
        <el-input
          v-model="search.keyword"
          placeholder="供应链产品名称/供应链SKU"
          clearable
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.saleStatus" placeholder="销售状态" clearable>
          <el-option
            v-for="(item, key) in saleStatusMap"
            :value="key"
            :label="item.desc"
            :key="key"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-button type="primary" @click="runQuery">查询</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.supplySkuList"
        row-key="supplierSku"
        class-name="table-row-dashed"
        max-height="60vh"
      >
        <el-table-column type="selection" width="40" reserve-selection>
          <template #default="scope">
            <el-radio
              v-model="currentRow"
              :label="scope.row"
              :disabled="scope.row.msku && selectedRow?.msku === scope.row.msku"
            >
              {{}}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="供应链产品信息" min-width="220">
          <template #default="{ row }">
            <GoodsInfo
              :src="row.productImage"
              :title="row.productTitle"
              :subtitle="row.productSku"
              copy-title
              copy-subtitle
              :url="`/supplyGoods/detail?code=${row.productSku}`"
            />
          </template>
        </el-table-column>
        <el-table-column label="产品分类">
          <template #default="{ row }">
            <span>{{ productTypeMap[row?.productType] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品属性" min-width="150">
          <template #default="{ row }">
            <!--          <div>产品状态：{{ productStatusMap[row?.productStatus] }}</div>-->
            <div class="fs-7">
              <div>
                产品状态：
                <Tag :color="productStatusMap[row?.productStatus]?.color">
                  {{ productStatusMap[row?.productStatus]?.desc }}
                </Tag>
              </div>
              <div>
                销售状态：
                <Tag :color="saleStatusMap[row?.saleStatus]?.color">
                  {{ saleStatusMap[row?.saleStatus]?.desc }}
                </Tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="采购信息">
          <template #default="{ row }">
            <div>采购员：{{ row?.purchaserName || '--' }}</div>
            <div>
              采购价：{{ row?.purchasePrice }}
              <span class="text-gray-500">{{ row?.purchaseCurrencyCode }}</span>
            </div>
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
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ProductApi, productApi } from '@/api';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits<{
    (event: 'success', val): void;
  }>();

  const productTypeMap = {
    1: '产品',
    2: '物料',
    3: '用研产品',
  };

  const productStatusMap = {
    0: {
      desc: '不可用',
      color: 'red',
    },
    1: {
      desc: '可用',
      color: 'green',
    },
    2: {
      desc: '开发产品',
      color: 'blue',
    },
  };
  const saleStatusMap = {
    1: {
      desc: '清货待下架',
      color: 'gray',
    },
    2: {
      desc: '正常销售',
      color: 'blue',
    },
    5: {
      desc: '订制类产品',
      color: 'purple',
    },
    6: {
      desc: '平台下架',
      color: 'red',
    },
    16: {
      desc: '停售淘汰',
      color: 'red',
    },
    17: {
      desc: '新品测试',
      color: 'blue',
    },
    18: {
      desc: '新品',
      color: 'green',
    },
  };

  const visible = ref(false);

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
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.RequestQuery,
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      productStatus: undefined,
      saleStatus: undefined,
      productType: 1,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSupplySkuQuerySupplySkuList,
  });
  const currentRow = ref<any[]>([]);
  /* const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setSelectedRows(); */

  const save = async () => {
    if (!currentRow.value || currentRow.value?.length === 0) {
      ElMessage.warning({
        message: '请选择一个产品',
        duration: 5 * 1000,
      });
      return;
    }
    emits('success', currentRow.value);
    visible.value = false;
  };

  const open = (row) => {
    visible.value = true;
    resetSearch();
    tableRef.value!.toggleRowSelection(row);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
