<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
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
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.skuList || []"
      row-key="skuCode"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品SKU" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImageUrl"
            :title="scope.row.productTitle"
            :subtitle="scope.row.skuCode"
            copy-subtitle
            :openNewPage="true"
            :url="`/skulist/detail?code=${scope.row.skuCode}`"
          />
        </template>
      </el-table-column>

      <el-table-column label="渠道" min-width="120">
        <template #default="{ row }">
          <div>
            <template
              v-for="(item, index) of getList(row.onlineProductList, 'channel')"
              :key="index"
            >
              <div v-if="index < 3">
                {{ item }}
              </div>
            </template>
            <template v-if="getList(row.onlineProductList, 'channel').length > 3">
              <div class="total-expand">
                ...（共{{ getList(row.onlineProductList, 'channel').length }}个）
                <i class="ki-duotone ki-plus-square toggle-off fs-1" @click="showMskuDialog(row)">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="站点" min-width="120">
        <template #default="{ row }">
          <div>
            <template v-for="(item, index) of getList(row.onlineProductList, 'site')" :key="index">
              <div v-if="index < 3">
                {{ item }}
              </div>
            </template>
            <template v-if="getList(row.onlineProductList, 'site').length > 3">
              <div class="total-expand">
                ...（共{{ getList(row.onlineProductList, 'site').length }}个）
                <i class="ki-duotone ki-plus-square toggle-off fs-1" @click="showMskuDialog(row)">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺" min-width="180">
        <template #default="{ row }">
          <div>
            <template v-for="(item, index) of getList(row.onlineProductList, 'shop')" :key="index">
              <div v-if="index < 3">
                {{ item }}
              </div>
            </template>
            <template v-if="getList(row.onlineProductList, 'shop').length > 3">
              <div class="total-expand">
                ...（共{{ getList(row.onlineProductList, 'shop').length }}个）
                <i class="ki-duotone ki-plus-square toggle-off fs-1" @click="showMskuDialog(row)">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU" min-width="180">
        <template #default="{ row }">
          <div>
            <template v-for="(item, index) of getList(row.onlineProductList, 'msku')" :key="index">
              <div v-if="index < 3">
                {{ item }}
              </div>
            </template>
            <template v-if="getList(row.onlineProductList, 'msku').length > 3">
              <div class="total-expand">
                ...（共{{ getList(row.onlineProductList, 'msku').length }}个）
                <i class="ki-duotone ki-plus-square toggle-off fs-1" @click="showMskuDialog(row)">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="链接" min-width="120">
        <template #default="{ row }">
          <div class="total-expand">
            共{{ getList(row.onlineProductList, 'productLink').length }}个
            <i
              v-if="getList(row.onlineProductList, 'productLink').length > 3"
              class="ki-duotone ki-plus-square toggle-off fs-1"
              @click="showMskuDialog(row)"
            >
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '产品表现',
                key: 'sku',
                type: 'primary',
                row: scope.row,
              },
              {
                label: '查看MSKU',
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
  <MskuDialog
    v-if="mskuDialogVisible"
    :visible="mskuDialogVisible"
    :skuInfo="skuInfo"
    @close="mskuDialogVisible = false"
  />
</template>

<script lang="ts" setup>
  import { ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { productApi, ProductApi } from '@/api/index';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import router from '@/router';
  import MskuDialog from '../modal/mskuDialog.vue';

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
    refreshList,
    resetSearch,
  } = useList<
    ProductApi.LuteosProductPerformanceQuerySkuList.RequestQuery,
    ProductApi.LuteosProductPerformanceQuerySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: undefined,
      site: undefined,
      shop: undefined,
      queryType: 1,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductPerformanceQuerySkuList,
  });

  const getList = (list, key) => {
    const newList = [];
    list.forEach((item) => {
      if (item[key] && !newList.includes(item[key])) {
        newList.push(item[key]);
      }
    });
    return newList;
  };
  const mskuDialogVisible = ref(false);
  const skuInfo = ref({});
  const showMskuDialog = (row) => {
    mskuDialogVisible.value = true;
    skuInfo.value = row;
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'msku') {
      showMskuDialog(row);
    } else if (key === 'sku') {
      router.push({
        name: 'skuperformance',
        query: {
          code: row.skuCode,
          row: encryptByBase64(
            JSON.stringify({
              productImageUrl: row.productImageUrl,
              productTitle: row.productTitle,
              skuCode: row.skuCode,
            })
          ),
        },
      });
    }
  };
</script>

<style scoped lang="scss">
  .total-expand {
    display: flex;
    justify-content: space-around;
    cursor: pointer;
  }
</style>
