<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="SKU/产品名称/MSKU" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ProductChannelSelect v-model="search.channel" clearable filterable />
      <ProductSiteSelect v-model="search.site" clearable filterable />
      <ProductShopSelect
        v-model="search.shop"
        clearable
        filterable
        :platform="search.channel"
        :site="search.site"
      />
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.mskuList || []">
      <el-table-column type="selection" width="40" />
      <el-table-column label="产品SKU" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImageUrl"
            :title="scope.row.productTitle"
            :subtitle="scope.row.skuCode"
            copy-subtitle
            :url="`/skulist/detail?code=${scope.row.skuCode}`"
            :openNewPage="true"
          />
        </template>
      </el-table-column>

      <el-table-column label="渠道" prop="channel" min-width="100" />
      <el-table-column label="站点" prop="site" min-width="100" />
      <el-table-column label="店铺" prop="shop" min-width="100" />
      <el-table-column label="店铺SKU" prop="msku" min-width="180">
        <template #default="{ row }">
          <div class="msku-link">
            <span @click="openMskuDetail(row)">
              {{ row.msku }}
            </span>
            <i
              v-if="row.msku"
              class="fas fa-copy text-hover-primary cursor-pointer"
              @click.stop="copyFn(row.msku, '')"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="链接" prop="productLink" min-width="100">
        <template #default="{ row }">
          <div class="link" @click="openUrl(row.productLink)">
            {{ row.productLink }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: 'MSKU销售表现',
                key: 'msku',
                type: 'primary',
                row: scope.row,
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
      class="pagination"
    />
  </KeenList>
</template>

<script lang="ts" setup>
    import { ElTable as ElTableType } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { openWindow } from '@/utils';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { copyFn } from '@/utils/copyFn';
  import router from '@/router';

  const PAGE_SIZE = 100;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
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
    ProductApi.LuteosProductPerformanceQuerySkuList.RequestQuery,
    ProductApi.LuteosProductPerformanceQuerySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: undefined,
      site: undefined,
      shop: undefined,
      queryType: 2,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductPerformanceQuerySkuList,
  });

  const openUrl = (url) => {
    if (url) {
      openWindow(url);
    }
  };

  const openMskuDetail = (row) => {
    if (['amazon', 'shopify', 'walmart'].includes(row.channel)) {
      openWindow(`/${row.channel}Online?keyword=${row.msku}&tab=child`);
    } else {
      openWindow(`/productOnline?keyword=${row.msku}&channel=${row.channel}&tab=child`);
    }
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'msku') {
      router.push({
        name: 'mskuperformance',
        query: {
          code: row.msku,
          row: encryptByBase64(
            JSON.stringify({
              ...row,
            })
          ),
        },
      });
    }
  };
</script>

<style scoped lang="scss">
  .link {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #1989fa;
    cursor: pointer;
  }

  .msku-link {
    color: #1989fa;
    cursor: pointer;
  }

  .fa-copy {
    margin-left: 8px;
  }

  .pagination {
    :deep(.page-size-option-wrapper) {
      visibility: hidden;
    }
  }
</style>
