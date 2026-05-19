<template>
  <el-dialog
    title="选择在线产品"
    :model-value="visible"
    width="1200"
    :before-close="close"
    align-center
  >
    <KeenList>
      <el-space>
        <el-input
          style="width: 200px"
          v-model="search[channelMap[props.channel]?.keyword]"
          :placeholder="channelMap[props.channel]?.placeholder + '/店铺SKU'"
          clearable
        />
        <!--        <el-input v-model="search.msku" placeholder="店铺SKU" />-->
        <ShopSelect v-model="search.shopList" clearable multiple :platform="channel" disabled />
        <DeptMember
          v-model="search.operatorIdList"
          placeholder="运营"
          deptId="65717209"
          clearable
          multiple
        />
        <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      </el-space>

      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.resultList"
        row-key="productSpu"
        max-height="450px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" width="45">
          <template #default="{ row }">
            <el-radio v-model="currentRow" :label="row">{{}}</el-radio>
          </template>
        </el-table-column>
        <template v-if="props.channel === 'amazon'">
          <el-table-column prop="asin" label="ASIN" min-width="130" />
          <el-table-column prop="parentAsin" label="父ASIN" min-width="120" />
        </template>
        <el-table-column prop="msku" label="店铺SKU" min-width="150" />
        <template v-if="props.channel === 'shopify'">
          <el-table-column prop="variantId" label="Variant ID" min-width="120" />
          <el-table-column prop="productId" label="Product ID" min-width="120" />
        </template>
        <template v-if="props.channel === 'walmart'">
          <el-table-column prop="itemId" label="Item_id" min-width="120" />
        </template>
        <el-table-column prop="shop" label="店铺" min-width="120" />
        <el-table-column v-if="props.channel === 'shopify'" prop="operatorName" label="运营">
          <template #default="{ row }">
            <div>{{ row?.operatorList?.find((item) => site === item?.site)?.operatorName }}</div>
          </template>
        </el-table-column>
        <el-table-column v-else prop="operatorName" label="运营" />
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
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import ShopSelect from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/shopSelect.vue';
  import { ElMessage } from 'element-plus';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const props = defineProps<{
    visible: boolean;
    channel: string;
    shopList: string[];
    site?: string;
  }>();

  const emit = defineEmits<{
    (event: 'success', val?: any): void;
    (event: 'close'): void;
  }>();

  const visibility = ref(false);
  const currentRow = ref<any[]>([]);

  const PAGE_SIZE = 10;

  const channel = ref('');
  const channelMap = {
    amazon: {
      keyword: 'keyword',
      placeholder: '子ASIN/父ASIN',
      service: productApi.luteosProductAmazonListingQueryAsinPage,
      saleSkuCode: 'asin',
    },
    shopify: {
      keyword: 'keyword',
      placeholder: 'Variant ID',
      service: productApi.luteosProductShopifyListingQueryProductListingPage,
      saleSkuCode: 'msku',
    },
    walmart: {
      keyword: 'keyword',
      placeholder: 'Item ID',
      service: productApi.luteosProductWalmartListingQueryProductListingPage,
      saleSkuCode: 'msku',
    },
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
    selectedRows,
    handleSelectionChange,
    tableRef,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductAmazonListingQueryParentAsinPage.RequestBody,
    ProductApi.LuteosProductAmazonListingQueryParentAsinPage.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopList: props.shopList,
      siteList: undefined,
      statusList: undefined,
      tagList: undefined,
      operatorIdList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: visibility.value ? '' : channelMap[props.channel].service,
  });

  const save = () => {
    if (!currentRow.value || currentRow.value?.length === 0) {
      ElMessage.warning({
        message: '请选择一个产品',
        duration: 5 * 1000,
      });
      return;
    }
    emit(
      'success',
      props.channel === 'amazon'
        ? {
            asin: currentRow.value?.asin,
            msku: currentRow.value?.msku,
          }
        : currentRow.value?.msku
    );
  };

  const close = () => {
    emit('close');
  };
</script>

<style scoped lang="scss"></style>
