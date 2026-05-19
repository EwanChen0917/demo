<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-space>
        <el-input
          v-model="search.productSkuOrSupplySkuOrName"
          placeholder="产品SKU供应链SKU/产品名称"
          clearable
        />
        <el-input v-model="search.amazonAsinOrMsku" placeholder="亚马逊子ASIN/店铺MSKU" clearable />
        <CountrySelect v-model="search.site" placeholder="站点" clearable class="w-200px" />
      </el-space>
    </template>
    <template #search-actions>
      <span style="margin-left: auto; line-height: 32px">
        抓取更新时间： {{ listData?.crawlUpdateTime || '-' }}
      </span>
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleImport">导入</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      class-name="table-row-dashed"
      row-key="code"
      border
    >
      <el-table-column min-width="169px" prop="supplySku" label="供应链SKU" fixed="left" />
      <el-table-column min-width="169px" prop="productSku" label="产品SKU" fixed="left" />
      <el-table-column min-width="169px" prop="productName" label="产品名称" fixed="left" />
      <el-table-column min-width="70px" prop="site" label="站点" fixed="left" />
      <el-table-column min-width="169px" prop="amazonAsin" label="亚马逊ASIN">
        <template #default="{ row }">
          <div>{{ row.amazonAsin }}</div>
          <div>
            <el-link
              v-if="row.amazonProductUrl"
              type="primary"
              :href="row.amazonProductUrl"
              target="_blank"
            >
              <el-icon>
                <Link />
              </el-icon>
              链接
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="169px" prop="amazonListPrice" label="亚马逊价格">
        <template #default="{ row }">
          <template v-if="row.amazonListPrice || row.amazonPromotionPrice">
            <div>原价：{{ getShowPrice(row.amazonListPrice, undefined, row.amazonCurrency) }}</div>
            <div>
              促销价：{{ getShowPrice(row.amazonPromotionPrice, undefined, row.amazonCurrency) }}
            </div>
          </template>
          <template v-else><span class="empty-price">未获取到价格</span></template>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="250px" prop="independentStoreSkuList" label="独立站店铺SKU">
        <template #default="{ row }">
          <template v-if="row.independentStoreSkuList?.length">
            <div v-for="item in row.independentStoreSkuList.slice(0, 3)" :key="item">
              {{ item }}
            </div>
            <div v-if="row.independentStoreSkuList.length > 3">...</div>
          </template>
          <template v-else><span></span></template>
          <div>
            <el-link type="primary" @click="showDialog('shopify', '独立站', row)">详情</el-link>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column min-width="169px" prop="independentListPrice" label="独立站价格">
        <template #default="{ row }">
          <template
            v-if="
              row.independentListPriceMin ||
              row.independentListPriceMax ||
              row.independentPromotionPriceMin ||
              row.independentPromotionPriceMax
            "
          >
            <div>
              原价：{{
                getShowPrice(
                  row.independentListPriceMin,
                  row.independentListPriceMax,
                  row.independentCurrency
                )
              }}
            </div>
            <div>
              促销价：{{
                getShowPrice(
                  row.independentPromotionPriceMin,
                  row.independentPromotionPriceMax,
                  row.independentCurrency
                )
              }}
            </div>
          </template>
          <template v-else-if="row?.independentStoreSkuList">
            <span class="empty-price">未获取到价格</span>
          </template>
          <template v-else><span class="empty-price">暂未售卖</span></template>
          <div>
            <el-link type="primary" @click="showDialog('shopify', '独立站', row)">详情</el-link>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="250px" prop="walmartStoreSkuList" label="沃尔玛SKU">
        <template #default="{ row }">
          <template v-if="row.walmartStoreSkuList?.length">
            <div v-for="item in row.walmartStoreSkuList.slice(0, 3)" :key="item">
              {{ item }}
            </div>
            <div v-if="row.walmartStoreSkuList.length > 3">...</div>
          </template>
          <template v-else><span></span></template>
          <div>
            <el-link type="primary" @click="showDialog('walmart', '沃尔玛', row)">详情</el-link>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column min-width="169px" prop="walmartListPrice" label="沃尔玛价格">
        <template #default="{ row }">
          <template
            v-if="
              row.walmartListPriceMin ||
              row.walmartListPriceMax ||
              row.walmartPromotionPriceMin ||
              row.walmartPromotionPriceMax
            "
          >
            <div>
              原价：{{
                getShowPrice(row.walmartListPriceMin, row.walmartListPriceMax, row.walmartCurrency)
              }}
            </div>
            <div>
              促销价：{{
                getShowPrice(
                  row.walmartPromotionPriceMin,
                  row.walmartPromotionPriceMax,
                  row.walmartCurrency
                )
              }}
            </div>
          </template>
          <template v-else-if="row?.walmartStoreSkuList">
            <span class="empty-price">未获取到价格</span>
          </template>
          <template v-else><span class="empty-price">暂未售卖</span></template>
          <div>
            <el-link type="primary" @click="showDialog('walmart', '沃尔玛', row)">详情</el-link>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="250px" prop="tkStoreSkuList" label="TK店铺SKU">
        <template #default="{ row }">
          <template v-if="row.tkStoreSkuList?.length">
            <div v-for="item in row.tkStoreSkuList.slice(0, 3)" :key="item">
              {{ item }}
            </div>
            <div v-if="row.tkStoreSkuList.length > 3">...</div>
          </template>
          <template v-else><span></span></template>
          <div>
            <el-link type="primary" @click="showDialog('tiktok', 'TK', row)">详情</el-link>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column min-width="169px" prop="walmartListPrice" label="tiktok价格">
        <template #default="{ row }">
          <template
            v-if="
              row.tkListPriceMin ||
              row.tkListPriceMax ||
              row.tkPromotionPriceMin ||
              row.tkPromotionPriceMax
            "
          >
            <div>
              原价：{{ getShowPrice(row.tkListPriceMin, row.tkListPriceMax, row.tkCurrency) }}
            </div>
            <div>
              促销价：{{
                getShowPrice(row.tkPromotionPriceMin, row.tkPromotionPriceMax, row.tkCurrency)
              }}
            </div>
          </template>
          <template v-else-if="row?.tkStoreSkuList">
            <span class="empty-price">未获取到价格</span>
          </template>
          <template v-else><span class="empty-price">暂未售卖</span></template>
          <div>
            <el-link type="primary" @click="showDialog('tiktok', 'TK', row)">详情</el-link>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="250px" prop="targetStoreSkuList" label="Target店铺SKU">
        <template #default="{ row }">
          <template v-if="row.targetStoreSkuList?.length">
            <div v-for="item in row.targetStoreSkuList.slice(0, 3)" :key="item">
              {{ item }}
            </div>
            <div v-if="row.targetStoreSkuList.length > 3">...</div>
          </template>
          <template v-else><span></span></template>
          <div>
            <el-link type="primary" @click="showDialog('target', 'Target', row)">详情</el-link>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column min-width="169px" prop="targetListPrice" label="target价格">
        <template #default="{ row }">
          <template
            v-if="
              row.targetListPriceMin ||
              row.targetListPriceMax ||
              row.targetPromotionPriceMin ||
              row.targetPromotionPriceMax
            "
          >
            <div>
              原价：{{
                getShowPrice(row.targetListPriceMin, row.targetListPriceMax, row.targetCurrency)
              }}
            </div>
            <div>
              促销价：{{
                getShowPrice(
                  row.targetPromotionPriceMin,
                  row.targetPromotionPriceMax,
                  row.targetCurrency
                )
              }}
            </div>
          </template>
          <template v-else-if="row?.targetStoreSkuList">
            <span class="empty-price">未获取到价格</span>
          </template>
          <template v-else><span class="empty-price">暂未售卖</span></template>
          <div>
            <el-link type="primary" @click="showDialog('target', 'Target', row)">详情</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="169px" prop="targetListPrice" label="shopee价格">
        <template #default="{ row }">
          <template
            v-if="
              row.shopeeListPriceMin ||
              row.shopeeListPriceMax ||
              row.shopeePromotionPriceMin ||
              row.shopeePromotionPriceMax
            "
          >
            <div>
              原价：{{
                getShowPrice(row.shopeeListPriceMin, row.shopeeListPriceMax, row.shopeeCurrency)
              }}
            </div>
            <div>
              促销价：{{
                getShowPrice(
                  row.shopeePromotionPriceMin,
                  row.shopeePromotionPriceMax,
                  row.shopeeCurrency
                )
              }}
            </div>
          </template>
          <template v-else-if="row?.shopeeStoreSkuList">
            <span class="empty-price">未获取到价格</span>
          </template>
          <template v-else><span class="empty-price">暂未售卖</span></template>
          <div>
            <el-link type="primary" @click="showDialog('shopee', 'Shopee', row)">详情</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="169px" prop="targetListPrice" label="Lazada价格">
        <template #default="{ row }">
          <template
            v-if="
              row.lazadaListPriceMin ||
              row.lazadaListPriceMax ||
              row.lazadaPromotionPriceMin ||
              row.lazadaPromotionPriceMax
            "
          >
            <div>
              原价：{{
                getShowPrice(row.lazadaListPriceMin, row.lazadaListPriceMax, row.lazadaCurrency)
              }}
            </div>
            <div>
              促销价：{{
                getShowPrice(
                  row.lazadaPromotionPriceMin,
                  row.lazadaPromotionPriceMax,
                  row.lazadaCurrency
                )
              }}
            </div>
          </template>
          <template v-else-if="row?.lazadaStoreSkuList">
            <span class="empty-price">未获取到价格</span>
          </template>
          <template v-else><span class="empty-price">暂未售卖</span></template>
          <div>
            <el-link type="primary" @click="showDialog('lazada', 'Lazada', row)">详情</el-link>
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
  <ImportDialog ref="importDialogRef" />
  <DetailModal ref="detailModalRef" />
</template>

<script lang="ts" setup name="sameProductPriceComparison">
  import useList from '@/hooks/list/useList';
  import { BudgetApi, commonApi, erpApi, productApi } from '@/api';
  import { Link } from '@element-plus/icons-vue';

  import ImportDialog from '@/views/adjustprice/sameProductPriceComparison/importDialog.vue';
  import DetailModal from '@/views/adjustprice/sameProductPriceComparison/detailModal.vue';

  const PAGE_SIZE = 10;

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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    BudgetApi.FinanceBudgetPresentationQueryPresentationList.RequestQuery,
    BudgetApi.FinanceBudgetPresentationQueryPresentationList.ResponseBody
  >({
    searchDefaults: {
      amazonAsinOrMsku: '',
      productSkuOrSupplySkuOrName: '',
      site: '',
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMultiPriceQueryList,
  });
  const importDialogRef = ref();
  const handleImport = () => {
    importDialogRef.value.open();
  };

  const getShowPrice = (minPrice, maxPrice, currency) => {
    minPrice = minPrice ? `${minPrice} ${currency || ''}` : '';
    maxPrice = maxPrice ? `${maxPrice} ${currency || ''}` : '';
    if (minPrice && maxPrice) {
      if (minPrice === maxPrice) {
        return minPrice;
      }
      return `${minPrice} - ${maxPrice}`;
    }
    if (minPrice || maxPrice) {
      return `${minPrice || maxPrice}`;
    }
    return '-';
  };

  const detailModalRef = ref();
  const showDialog = (site, siteName, row) => {
    detailModalRef.value.showModal({
      site,
      siteName,
      row,
    });
  };
</script>

<style scoped lang="scss">
  .empty-price {
    color: #aaa;
  }
</style>
