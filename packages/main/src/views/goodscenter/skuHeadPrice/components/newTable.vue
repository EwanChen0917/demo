<template>
  <el-table
    ref="tableRef"
    v-loading="listLoading"
    :data="listData?.skuHeadPriceList"
    class-name="table-row-dashed"
  >
    <!--      <el-table-column type="selection" width="40" reserve-selection />-->
    <el-table-column label="平台" prop="platform" />
    <el-table-column label="站点" prop="site" />
    <el-table-column label="新供应链SKU" prop="productSkuNew" min-width="160">
      <template #default="{ row }">
        <div>
          {{ row?.productSkuNew }}
          <Copy :content="row?.productSkuNew" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="供应链SKU" prop="productSku" min-width="160">
      <template #default="{ row }">
        <div>
          {{ row?.productSku }}
          <Copy :content="row?.productSku" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="头程单价" prop="price" min-width="100">
      <template #default="{ row }">
        <el-space v-if="row.editFlag">
          <el-input v-model="newPrice" size="small" />
          <Select class="edit-icon text-success" @click="updatePrice(row)" />
          <Close class="edit-icon text-danger" @click="row.editFlag = false" />
        </el-space>
        <div v-if="!row.editFlag">
          <span>{{ row?.price }}</span>
          <Edit class="edit-icon" @click="editPrice(row)" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="头程单价币种" prop="currencyCode" />
    <el-table-column label="头程单价取数日期" prop="priceDate" />
    <el-table-column label="状态">
      <template #default="{ row }">
        <Tag :color="row.isValid === 1 ? 'green' : 'red'">
          {{ row.isValid === 1 ? '有效' : '无效' }}
        </Tag>
      </template>
    </el-table-column>
    <el-table-column label="备注" prop="remark" />
    <el-table-column label="更新信息" min-width="150">
      <template #default="{ row }">
        <div class="fs-7">更新人：{{ row?.operatorName || '--' }}</div>
        <div class="fs-7">更新时间：{{ row?.updateTime || '--' }}</div>
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
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { dataApi, DataApi } from '@/api';
  import { Edit } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    search: any;
  }>();

  watch(props.search, () => {
    search.keyword = props.search.keyword;
  });

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
    DataApi.LuteosDataQueryDwdSkuHeadPriceList.RequestQuery,
    DataApi.LuteosDataQueryDwdSkuHeadPriceList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: dataApi.luteosDataQueryDwdSkuHeadPriceList,
  });

  const newPrice = ref();
  const editPrice = (row) => {
    newPrice.value = row.price;
    row.editFlag = true;
  };

  const updatePrice = async (row) => {
    await dataApi.luteosDataUpdateDwdSkuHeadPrice({
      productSku: row.productSku,
      price: newPrice.value,
      site: row.site,
      platform: row.platform,
    });
    ElMessage.success('修改成功');
    row.editFlag = false;
    refreshList();
  };

  defineExpose({
    runQuery,
    resetSearch,
  });
</script>

<style scoped lang="scss">
  .edit-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: 3px;
    &:hover {
      color: var(--el-color-primary);
    }
  }
</style>
