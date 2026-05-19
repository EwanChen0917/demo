<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.msku" placeholder="MSKU" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-date-picker
        v-model="searchDate"
        type="daterange"
        @change="handleDateChange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
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
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.sellerPriceList" row-key="44">
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="日期" prop="recordDate" min-width="120" />
      <el-table-column label="渠道" prop="channel" min-width="100" />
      <el-table-column label="站点" prop="site" min-width="100" />
      <el-table-column label="店铺" prop="shop" min-width="180" />
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
      <el-table-column label="链接" prop="productLink" min-width="150">
        <template #default="{ row }">
          <div class="link" @click="openUrl(row.productLink)">
            {{ row.productLink }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="实时售价" prop="price" min-width="120">
        <template #default="{ row }">{{ row.price }}&nbsp;{{ row.currency }}</template>
      </el-table-column>
      <el-table-column label="大类排名" prop="bigCategoryRanking" />
      <el-table-column label="小类排名" prop="smallCategoryRanking" />
      <el-table-column label="市占" prop="marketShare" />
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
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
    />
  </KeenList>
</template>

<script lang="ts" setup>
    import { ElTable as ElTableType } from 'element-plus';
  import { productApi, ProductApi } from '@/api/index';
  import useList from '@/views/lute-os/hooks/list/useList';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { openWindow } from '@/utils';
  import { copyFn } from '@/utils/copyFn';
  import router from '@/router';
  import { encryptByBase64 } from '@/utils/aesTils';

  const route = useRoute();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 设置默认十五天
  const endDate = new Date(); // 当前日期
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 15);
  const searchDate = ref([formatDate(startDate), formatDate(endDate)]);

  const PAGE_SIZE = 10;
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
    ProductApi.LuteosProductPerformanceQuerySkuPerformance.RequestQuery,
    ProductApi.LuteosProductPerformanceQuerySkuPerformance.ResponseBody
  >({
    searchDefaults: {
      msku: undefined,
      channel: undefined,
      site: undefined,
      shop: undefined,
      startDate: undefined,
      endDate: undefined,
      skuCode: route.query.code,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductPerformanceQuerySkuPerformance,
  });

  const handleDateChange = (val) => {
    if (val && val.length) {
      search.startDate = val[0];
      search.endDate = val[1];
    } else {
      search.startDate = undefined;
      search.endDate = undefined;
    }
  };

  const openMskuDetail = (row) => {
    if (['amazon', 'shopify', 'walmart'].includes(row.channel)) {
      openWindow(`/${row.channel}Online?keyword=${row.msku}&tab=child`);
    } else {
      openWindow(`/productOnline?keyword=${row.msku}&channel=${row.channel}&tab=child`);
    }
  };

  const openUrl = (url) => {
    if (url) {
      openWindow(url);
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
    color: #1989fa;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .msku-link {
    color: #1989fa;
    cursor: pointer;
  }
</style>
