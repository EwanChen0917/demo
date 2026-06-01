<template>
  <el-dialog
    :title="noMapping ? '添加新品预测' : '添加预测商品'"
    v-model="visibility"
    width="1050px"
    :before-close="close"
    align-center
  >
    <div>
      <el-input
        style="width: 300px"
        v-model="searchParams.keyword"
        :placeholder="
          forecastType === 1 || noMapping ? '产品SKU/产品名称' : '产品SKU/在线商品编码/产品名称'
        "
        clearable
        @input="handleKeywordChange"
        @change="handleBlur2"
        @blur="handleBlur2"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
    </div>
    <el-space class="my-3">
      <el-select
        style="width: 120px"
        v-model="searchParams.channel"
        placeholder="渠道"
        @change="
          () => {
            multipleSelection = [];
            searchParams.state = undefined;
            table?.clearSelection();
            search();
          }
        "
      >
        <!--        <el-option
            v-for="person of channelList"
            :key="person.value"
            :label="person.desc"
            :value="person.value"
          />-->
        <!--        暂时写死-->
        <!--        <el-option v-for="(val, key) in channelMap" :key="key" :label="val?.desc" :value="key" />-->
        <el-option
          v-for="item in channelList"
          :key="item.channel"
          :label="channelMap[item.channel]?.desc"
          :value="item.channel"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-if="forecastType === 1 || noMapping"
        placeholder="销售状态"
        v-model="searchParams.state"
        @change="search"
        clearable
      >
        <el-option label="未上架" :value="1" />
        <el-option label="在销售" :value="2" />
        <el-option label="清仓中" :value="3" />
        <el-option label="已退市" :value="4" />
      </el-select>
      <el-select
        style="width: 120px"
        v-if="forecastType === 2 && !noMapping"
        placeholder="销售状态"
        v-model="searchParams.state"
        @change="search"
        clearable
      >
        <el-option label="在售" value="1" />
        <el-option label="不在售" value="2" />
      </el-select>
      <el-select
        v-if="forecastType === 2 && !noMapping"
        style="width: 120px"
        v-model="searchParams.operatorList"
        multiple
        collapse-tags
        placeholder="运营"
        filterable
        clearable
        :teleported="false"
        @change="search"
      >
        <el-option
          v-for="person of planerList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <ErpSiteSelect
        v-model="searchParams.site"
        clearable
        style="width: 120px"
        online-goods
        :channel="searchParams.channel"
        @change="search"
      />
      <ProductLineSelect
        style="width: 120px"
        v-model="searchParams.productLine"
        clearable
        @change="search"
      />
      <el-select
        v-model="searchParams.modelCode"
        placeholder="型号"
        filterable
        clearable
        @change="search"
      >
        <el-option
          v-for="item in modelList"
          :key="item.modelCode"
          :label="item.modelName"
          :value="item.modelCode"
        />
      </el-select>
      <el-cascader
        style="width: 140px"
        v-model="searchParams.thirdCategoryCode"
        :options="options"
        :props="props"
        placeholder="三级分类"
        clearable
        :show-all-levels="false"
        @change="search"
      />
    </el-space>
    <p>已选择：{{ multipleSelection.length }}</p>
    <el-table
      ref="table"
      max-height="450px"
      v-loading="loading"
      :data="dataList"
      :row-key="
        (row) => {
          if (forecastType === 1 || noMapping) return row.skuCode + row.channelDesc + row.site;
          if (searchParams.channel === 'amazon') return row.asin + row.channelDesc + row.erpSite;
          if (searchParams.channel === 'shopify' || searchParams.channel === 'tiktok')
            return row.msku + row.channelDesc + row.erpSite;
          if (searchParams.channel === 'walmart') return row.itemId + row.channelDesc + row.erpSite;
        }
      "
      class-name="table-row-dashed"
      @selection-change="handleSelectedChange"
    >
      <el-table-column width="55px" type="selection" reserve-selection />
      <template v-if="forecastType === 1 || noMapping">
        <el-table-column prop="skuCode" label="产品SKU" min-width="150px" />
        <el-table-column prop="productName" label="产品信息" min-width="280px">
          <template #default="{ row }">
            <GoodsInfo :src="row.productImageUrl" :title="row.productTitle" />
          </template>
        </el-table-column>
        <el-table-column label="销售状态">
          <template #default="{ row }">
            <Tag class="mb-2" :color="stateColorMap[row.state]">
              {{ row.stateDesc }}
            </Tag>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column width="120px" prop="onlineSkuCode" label="在线商品编码">
          <template #default="{ row }">
            <!--            mx和ca站点列表展示msku-->
            <span>
              {{
                searchParams.channel === 'walmart' && ['MX'].includes(row?.site)
                  ? row?.msku
                  : row[channelMap[searchParams.channel]?.onlineCode]
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="产品信息" min-width="280px">
          <template #default="{ row }">
            <GoodsInfo :src="row.imageUrl" :title="row.productTitle" />
          </template>
        </el-table-column>
        <el-table-column prop="skuCode" label="产品SKU" min-width="150px" />
        <el-table-column label="销售状态">
          <template #default="{ row }">
            <Tag class="mb-2" :color="saleStatusColorMap[row.status]">
              {{ row.statusDesc }}
            </Tag>
          </template>
        </el-table-column>
      </template>
      <el-table-column width="80px" prop="channelDesc" label="渠道">
        <template #default>
          {{ channelMap[searchParams.channel]?.desc }}
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        :prop="forecastType === 2 && !noMapping ? 'erpSite' : 'site'"
        label="站点"
      />
      <el-table-column
        width="180px"
        prop="shop"
        label="店铺账号"
        v-if="forecastType === 2 && !noMapping"
      />
      <el-table-column width="180px" prop="productLineName" label="品线" />
      <el-table-column width="160px" prop="modelName" label="型号" />
      <el-table-column width="160px" prop="thirdCategoryName" label="三级分类" />
      <el-table-column
        width="80px"
        prop="operatorName"
        label="运营"
        v-if="forecastType === 2 && !noMapping"
      />
    </el-table>
    <KeenPagination
      :current="pagination.pageNum"
      :page-size="pagination.pageSize"
      :page-size-option="[10, 20, 50, 100]"
      :total="pagination.total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm" v-loading="confirmLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi, erpApi, memberApi, productApi } from '@/api';
  import { debounce } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  const channelMap = {
    amazon: {
      desc: 'Amazon',
      onlineCode: 'asin',
      fn: productApi.luteosProductAmazonListingQueryParentSonPage,
    },
    shopify: {
      desc: 'Shopify',
      onlineCode: 'msku',
      fn: productApi.luteosProductShopifyListingQuerySonVariantIdPage,
    },
    walmart: {
      desc: 'Walmart',
      onlineCode: 'itemId',
      fn: productApi.luteosProductWalmartListingQueryPage,
    },
    tiktok: {
      desc: 'Tik Tok',
      onlineCode: 'msku',
      fn: productApi.luteosProductTiktokListingQueryProductListingPage,
    },
    mercadocbt: {
      desc: 'Mercadocbt',
      onlineCode: 'msku',
      fn: productApi.luteosProductB2CListingQueryProductListingPage,
    },
  };

  const stateOptionsMap = {
    amazon: [
      {
        value: 1,
        label: '在售',
      },
      {
        value: 2,
        label: '不在售',
      },
    ],
    shopify: [
      {
        value: 'active',
        label: '在售',
      },
      {
        value: 'draft',
        label: '草稿',
      },
    ],
    walmart: [
      {
        value: 'ACTIVE',
        label: '在售',
      },
      {
        value: 'ARCHIVED',
        label: '草稿',
      },
      {
        value: 'RETIRED',
        label: '退市',
      },
    ],
  };

  const stateColorMap = {
    1: 'gray',
    2: 'green',
    3: 'yellow',
    4: 'red',
  };

  const saleStatusColorMap = ref({
    1: 'green',
    2: 'red',
  });

  const table = ref();
  const visibility = ref(false);
  const dataList = ref<any[]>([]);

  const handleKeywordChange = computed(() => {
    return debounce(() => {
      search();
    }, 300);
  });
  const batchSearchRef = ref();
  const handleBlur2 = (e) => {
    if (e.target?.value) {
      searchParams.value.skuCodeList = [];
      batchSearchRef.value?.clear();
      console.log(e.target?.value, searchParams.value);
    }
  };
  const handleBatchClear = (val) => {
    searchParams.value.skuCodeList = '';
  };
  const handleBatchSearch = (val) => {
    console.log(val);
    searchParams.value.keyword = '';
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    // console.log(arr);
    if (arr.length === 0) {
      ElMessage.warning('请输入产品SKU');
      return;
    }
    if (arr.length > 100) {
      ElMessage.warning('一次最多批量查询100个sku');
      return;
    }
    searchParams.value.skuCodeList = arr;
    search();
  };
  const search = () => {
    pagination.value.pageNum = 1;
    getDataList();
  };
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const searchParams = ref({
    keyword: '',
    state: undefined,
    operatorList: [],
    // channel: 'amazon',
    site: undefined,
    productLine: undefined,
    modelCode: undefined,
    thirdCategoryCode: undefined,
  });
  const planerList = ref<any[]>([]);
  /* const channelList = ref<any[]>([]);
  const getPlanerList = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
      deptId: 65717209,
    });
    channelList.value = await platformApi.platformAllList();
    planerList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getPlanerList(); */
  const forecastType = ref();
  const noMapping = ref();
  const open = (type, isNew) => {
    forecastType.value = type;
    noMapping.value = isNew;
    queryModelList();
    getCategoryTree();
    queryFSList();
    visibility.value = true;
  };
  const close = () => {
    dataList.value = [];
    searchParams.value = {
      keyword: '',
      state: undefined,
      operatorList: [],
      // channel: 'amazon',
    };
    pagination.value = {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
    multipleSelection.value = [];
    table?.value.clearSelection();
    visibility.value = false;
  };

  const emits = defineEmits(['success']);
  const confirmLoading = ref(false);
  const confirm = async () => {
    if (multipleSelection.value.length) {
      confirmLoading.value = true;
      await erpApi
        .luteosErpSaleForecastV2Save(
          multipleSelection.value.map((item) => {
            return {
              channel: searchParams.value.channel,
              country: item.site,
              onlineSkuCode: noMapping.value
                ? item.skuCode
                : searchParams.value.channel === 'walmart' && ['MX'].includes(item?.site)
                ? item?.msku
                : item[channelMap[searchParams.value.channel]?.onlineCode],
              spuCode: item.spuCode,
              skuCode: item.skuCode,
              type: forecastType.value,
              noMapping: noMapping.value,
            };
          })
        )
        .finally(() => {
          confirmLoading.value = false;
        });
      ElMessage.success('操作成功');
      emits('success');
      close();
    } else {
      ElMessage.warning('请选择商品');
    }
  };
  const multipleSelection = ref<any[]>([]);
  const loading = ref(false);
  const getDataList = async () => {
    const fn =
      forecastType.value === 1 || noMapping.value
        ? productApi.luteosProductSkuSmaSkuQueryList
        : channelMap[searchParams.value.channel]?.fn;
    // multipleSelection.value = [];

    if (fn) {
      try {
        loading.value = true;
        const res = await fn({
          keyword: searchParams.value.keyword,
          channel: searchParams.value.channel,
          operatorList: searchParams.value.operatorList,
          modelCode: searchParams.value.modelCode,
          thirdCategoryCode: searchParams.value.thirdCategoryCode,
          erpSite: forecastType.value === 2 ? searchParams.value.site : undefined,
          site: forecastType.value === 1 ? searchParams.value.site : undefined,
          state: searchParams.value.state,
          productLine: searchParams.value.productLine,
          statusList: searchParams.value.state ? [searchParams.value.state] : undefined,
          filterSalesforecast: true,
          pageSize: pagination.value.pageSize,
          pageNum: pagination.value.pageNum,
          noMapping: noMapping.value,
          platform: searchParams.value.channel,
          skuCodeList: searchParams.value.skuCodeList,
        }).catch(() => {
          dataList.value = [];
          pagination.value.total = 0;
        });
        if (res) {
          dataList.value = res?.resultList || res?.recordList;
          pagination.value.total = res.total;
          // nextTick(() => {
          //   if (multipleSelection.value.length) {
          //     console.log(table.value);
          //     multipleSelection.value.forEach((row) => {
          //       table.value?.toggleRowSelection(row, true);
          //     });
          //   } else {
          //     table.value!.clearSelection();
          //   }
          // });
        } else {
          dataList.value = [];
          pagination.value.total = 0;
        }
      } finally {
        loading.value = false;
      }
    } else {
      dataList.value = [];
      pagination.value.total = 0;
    }
  };
  const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.pageNum = 1;
    getDataList();
  };
  const handleCurrentChange = (page) => {
    pagination.value.pageNum = page;
    getDataList();
  };

  const handleSelectedChange = (row) => {
    multipleSelection.value = row;
  };

  const modelList = ref([]);
  const queryModelList = async () => {
    const res = await productApi.luteosProductModelQueryModelList({
      pageNum: 1,
      pageSize: 500,
    });
    modelList.value = res?.modelBeanList;
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

  const handleTreeData = (data, limit = 3, count = 1) => {
    return data?.map((x) => ({
      ...x,
      children: count < limit ? handleTreeData(x.children, limit, count + 1) : null,
    }));
  };

  const channelList = ref([]);
  const queryFSList = async () => {
    const res = await erpApi.luteosErpPlanPsfsQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    const seen = new Set();
    channelList.value = res?.recordList?.filter((item) => {
      if (!seen.has(item.channel) && item.type === forecastType.value) {
        seen.add(item.channel);
        return true;
      }
      return false;
    });
    searchParams.value.channel =
      forecastType.value === 1 ? 'amazon' : channelList.value?.[0]?.channel;
    getDataList();
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-cascader) {
    min-width: unset !important;
  }
</style>
