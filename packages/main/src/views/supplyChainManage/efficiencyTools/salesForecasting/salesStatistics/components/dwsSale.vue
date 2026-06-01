<template>
  <KeenList
    :resetBtnOptions="{
      size: 'small',
    }"
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <!-- <el-input
        v-model="search.keyword"
        placeholder="在线商品编码/产品名称/产品SKU/seller sku"
        class="w-350px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input> -->
      <el-input
        v-model="search.keyword"
        size="small"
        :placeholder="searchTypeMap[search.keywordType]?.placeholder"
        style="width: 300px"
        clearable
      >
        <template #prepend>
          <el-select
            v-model="search.keywordType"
            class="w-100px"
            @change="
              () => {
                search.keyword = '';
                batchSearchRef.clear();
              }
            "
          >
            <el-option
              v-for="(item, key) in searchTypeMap"
              :key="key"
              :label="item?.label"
              :value="+key"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append v-if="search.keywordType !== 4">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        unlink-panels
        size="small"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :clearable="false"
        :shortCuts="shortCuts"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="
          (dateArr) => {
            search.startTime = dateArr ? dateArr[0] : '';
            search.endTime = dateArr ? dateArr[1] : '';
          }
        "
      />

      <el-select
        style="width: 120px"
        v-model="search.channel"
        size="small"
        placeholder="渠道"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.sales_forecast_channel"
          :key="person.value"
          :label="person.desc"
          :value="person.value"
        />
      </el-select>
      <ErpSiteSelect
        v-model="search.site"
        clearable
        size="small"
        style="width: 120px"
        :channel="search.channel"
      />

      <CountrySelect
        style="width: 120px"
        v-model="search.site"
        size="small"
        placeholder="国家"
        filterable
        clearable
      />
      <ProductShopSelect
        v-model="search.shopCodeList"
        size="small"
        clearable
        filterable
        multiple
        max-collapse-tags="1"
        collapse-tags-tooltip
        :platform="search.channel"
        :site="search.site"
        placeholder="店铺"
      />
      <el-select
        style="width: 120px"
        v-model="search.operatorCodeList"
        size="small"
        placeholder="运营"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        max-collapse-tags="1"
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.supply_operator_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpSaleAfterForecastExportAfterSalesList"
        :params="{ ...search }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.rowList"
      class-name="table-row-dashed"
    >
      <el-table-column
        min-width="140px"
        v-for="(header, index) of listData?.headerList"
        :key="header"
        :label="header"
        :fixed="index === 0 ? 'left' : false"
      >
        <template #default="{ row }">
          <template v-if="['渠道', '国家', '站点'].includes(header)">
            <el-tag type="info">
              {{ row[index] }}
            </el-tag>
          </template>
          <template v-else-if="['运营'].includes(header)">
            <el-tag v-if="row[index]" round type="info">
              <SvgIcon icon="fullUser" class="me-1" />
              <span>{{ row[index] }}</span>
            </el-tag>
          </template>
          <template v-else>
            {{ row[index] }}
          </template>
          <template
            v-if="
              ['在线商品编码', 'seller sku', '产品名称', '产品SKU', '店铺账号'].includes(header)
            "
          >
            <Copy :content="row[index]" />
          </template>
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

<script lang="ts" setup name="ecommerce">
  import { erpApi, ErpApi, memberApi, platformApi, dataApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { getShortcuts } from '@/utils/datePickerOptions';
  import dayjs from 'dayjs';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  const searchTypeMap = {
    [1]: {
      label: '产品SKU',
      placeholder: '产品SKU',
    },
    [2]: {
      label: '在线商品编码',
      placeholder: '在线商品编码',
    },
    [3]: {
      label: 'seller sku',
      placeholder: 'seller sku',
    },
    [4]: {
      label: '产品名称',
      placeholder: '产品名称',
    },
  };
  const time = ref<any[]>([
    dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  ]);
  const PAGE_SIZE = 10;
  const shortCuts = ref(getShortcuts([3, 4, 5, 6]));
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
    ErpApi.LuteosErpSaleAfterForecastQuerySalesList.RequestBody,
    ErpApi.LuteosErpSaleAfterForecastQuerySalesList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      operatorCodeList: [],
      shopCodeList: [],
      channel: '',
      site: '',
      startTime: time.value[0],
      endTime: time.value[1],
      keywordType: 1, // 1:产品sku 2:在线商品编码 3:seller sku 4:产品名称（支持模糊）
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSaleAfterForecastQuerySalesList,
  });

  const route = useRoute();
  const { onlineSkuCode } = route.query;
  if (onlineSkuCode) search.keyword = onlineSkuCode;

  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_operator_dept', 'supply_planer_dept'],
    });
    return {
      supply_operator_dept: res.supply_operator_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res.supply_planer_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
    };
  };
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    return res.countryList!.map((item) => {
      return {
        label: item.countryName,
        value: item.countryCode,
      };
    });
  };
  const dickbook: any = ref({
    sales_forecast_channel: [],
    countryList: [],
    supply_operator_dept: [],
    supply_planer_dept: [],
  });
  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    const channelList = await platformApi.platformAllList();
    const countryList = await getCountryList();
    dickbook.value = {
      // ...res.dictMap,
      countryList,
      sales_forecast_channel: channelList,
      ...memeberList,
    };
  };

  const batchSearchRef = ref<any>(null);
  const handleBatchSearch = (val) => {
    search.keyword = val?.replace(/\n/g, ',');
  };
  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss"></style>
