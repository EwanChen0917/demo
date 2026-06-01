<template>
  <el-radio-group v-model="search.channel" size="small" class="mb-3">
    <el-radio-button value="amazon" label="amazon" />
    <el-radio-button value="shopify" label="shopify" />
    <el-radio-button value="walmart" label="walmart" />
    <el-radio-button value="tiktok" label="tiktok" />
    <el-radio-button value="mercadocbt" label="Mercadocbt" />
  </el-radio-group>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 300px"
        v-model="search.keyword"
        :placeholder="`产品SKU/产品名称/${labelMap[search.channel]}/店铺SKU`"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!--      <el-cascader
        style="width: 140px"
        v-model="search.thirdCategoryCode"
        :options="options"
        :props="props"
        placeholder="三级分类"
        clearable
        :show-all-levels="false"
      />-->
      <el-select v-model="search.modelCodeList" placeholder="型号" filterable clearable multiple>
        <el-option
          v-for="item in modelList"
          :key="item.modelCode"
          :label="item.modelName"
          :value="item.modelCode"
        />
      </el-select>
      <ErpSiteSelect
        v-model="search.siteList"
        placeholder="站点"
        :channel="search.channel"
        filterable
        clearable
        multiple
      />
      <el-select v-model="search.noMapping" placeholder="是否新品" clearable>
        <el-option label="是" :value="true" />
        <el-option label="否" :value="false" />
      </el-select>
      <el-popover
        popper-class="rt_el_pop"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="300"
        trigger="click"
      >
        <div class="h-xl-100">
          <div class="px-7 py-5">
            <div class="fs-4 text-dark fw-bold">筛选条件</div>
          </div>
          <div class="separator border-gray-200"></div>
          <div class="py-5 h-xl-100">
            <div
              style="
                height: calc(100% - 100px);
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
              "
            >
              <div class="mb-5">
                <third-category
                  style="width: 100%"
                  v-model="search.thirdCategoryCode"
                  placeholder="三级分类"
                  clearable
                />
              </div>
              <div class="mb-5">
                <ProductShopSelect
                  v-model="search.shopList"
                  filterable
                  clearable
                  multiple
                  :site="search.site"
                />
              </div>
              <div class="mb-5">
                <ProductLineSelect v-model="search.productLineList" clearable filterable multiple />
              </div>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem; margin-top: 10px"
            >
              <el-button class="button" type="primary" @click="runQuery">查询</el-button>
              <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <el-button class="button" type="primary">更多筛选</el-button>
        </template>
      </el-popover>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="importDialogRef?.open()">
        批量更新数据
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="产品信息" prop="name" min-width="200">
        <template #default="{ row }">
          <GoodsInfo :title="row.productName" :subtitle="row.skuCode" hide-image>
            <template #tag v-if="row.noMapping">
              <img src="@/assets/svgs/newProductIcon.svg" alt="" class="w-25px newProductIcon" />
            </template>
          </GoodsInfo>
        </template>
      </el-table-column>
      <el-table-column label="产品品线" prop="productLineDesc" />
      <el-table-column label="三级分类" prop="thirdCategoryDesc" />
      <el-table-column label="产品型号" prop="modelDesc" />
      <el-table-column label="站点" prop="site" />
      <el-table-column label="默认店铺" prop="shop" />
      <el-table-column :label="`默认${labelMap[search.channel]}`" prop="asin" />
      <el-table-column label="默认店铺SKU" prop="sellerSku" />
      <el-table-column label="运营" prop="operator" />
      <!--      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row?.status === 0 ? 'green' : 'red'">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
                permissionCode: '',
                hide:
                  !row?.noMapping && ['walmart', 'tiktok', 'mercadocbt'].includes(search.channel),
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
  <EditDialog ref="editDialogRef" @success="refreshList" />
  <ImportDialog ref="importDialogRef" @success="runQuery" :search-params="search" />
</template>

<script setup lang="ts" name="productMatch">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, platformApi, productApi } from '@/api';
  import EditDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/productMatch/components/editDialog.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import Tag from '@/components/Tag/index.vue';
  import ImportDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/productMatch/components/importDialog.vue';
  import ThirdCategory from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/thirdCategory.vue';

  const labelMap = {
    amazon: 'ASIN',
    shopify: 'MSKU',
    walmart: 'Item ID',
    tiktok: 'MSKU',
    mercadocbt: 'MSKU',
  };

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
    ErpApi.LuteosErpPlanPsfpcQueryList.RequestBody,
    ErpApi.LuteosErpPlanPsfpcQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: 'amazon',
      thirdCategoryCode: undefined,
      modelCodeList: undefined,
      siteList: undefined,
      noMapping: undefined,
      shopList: undefined,
      productLineList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPsfpcQueryList,
  });

  const importDialogRef = ref();
  const editDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    }
  };

  const props = {
    emitPath: false,
    label: 'categoryName',
    value: 'categoryCode',
  };

  const options = ref<any[]>([]);
  const getCategoryTree = async () => {
    const res = await productApi.luteosProductCategoryQueryCategoryTree({
      filterLevel: 3,
      filterFlag: 1,
    });
    options.value = handleTreeData(res.categoryList) || [];
  };
  getCategoryTree();

  const modelList = ref([]);
  const queryModelList = async () => {
    const res = await productApi.luteosProductModelQueryModelList({
      pageNum: 1,
      pageSize: 500,
    });
    modelList.value = res?.modelBeanList;
  };
  queryModelList();

  const handleTreeData = (data, limit = 3, count = 1) => {
    return data?.map((x) => ({
      ...x,
      children: count < limit ? handleTreeData(x.children, limit, count + 1) : null,
    }));
  };
</script>

<style scoped lang="scss">
  .newProductIcon {
    transform: rotate(45deg);
  }
</style>
