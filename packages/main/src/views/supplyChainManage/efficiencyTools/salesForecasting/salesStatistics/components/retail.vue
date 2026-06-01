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
      <el-input
        size="small"
        v-model="search.keyword"
        :placeholder="searchTypeMap[search.keywordType]?.placeholder"
        style="width: 300px"
        clearable
      >
        <template #prepend>
          <el-select v-model="search.keywordType" class="w-100px">
            <el-option label="产品SKU" :value="1" />
            <el-option label="产品名称" :value="4" />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append v-if="search.keywordType === 1">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <customerSelect size="small" v-model="search.customerCode" placeholder="客户" clearable />
      <el-select size="small" v-model="search.operator" placeholder="运营" filterable clearable>
        <el-option
          v-for="person of dickbook.operator_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <warehouseSelect size="small" v-model="search.warehouseCode" placeholder="目的仓" clearable />
      <!-- <div class="date-picker-prepend" ref="areaCountryContainerRef">
        <el-select
          v-model="search.salesDimensionality"
          style="width: 60px"
          @change="(v) => handleChangesalesDimensionality(v)"
        >
          <el-option :value="1" label="周" />
          <el-option :value="2" label="月" />
        </el-select>
        <el-date-picker
          v-model="time"
          :type="searchTimeByWeek ? 'daterange' : 'monthrange'"
          value-format="YYYY-MM-DD HH:mm:ss"
          :format="searchTimeByWeek ? 'YYYY年第ww周' : 'YYYY-MM'"
          range-separator="-"
          :clearable="false"
          :shortcuts="searchTimeByWeek ? shortCuts : []"
          :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
          @change="handleChangeTime"
        />
      </div> -->
      <el-date-picker
        v-model="time"
        type="daterange"
        size="small"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY年第ww周"
        range-separator="-"
        :clearable="false"
        :shortcuts="shortCuts"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="handleChangeTime"
      />
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
        :fixed="index < 6 ? 'left' : false"
      >
        <template #default="{ row }">
          <template v-if="['运营'].includes(header)">
            <el-tag v-if="row[index]" round type="info">
              <SvgIcon icon="fullUser" class="me-1" />
              <span>{{ row[index] }}</span>
            </el-tag>
          </template>
          <template v-else>
            {{ row[index] }}
          </template>
          <template v-if="index === 0">
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

<script lang="ts" setup>
  import { erpApi, ErpApi, memberApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import dayjs from 'dayjs';
  import customerSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/customerSelect.vue';
  import warehouseSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/warehouseSelect.vue';

  const defaultTime = {
    1: [
      dayjs().subtract(7, 'week').startOf('week').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().endOf('week').format('YYYY-MM-DD 23:59:59'),
    ],
    2: [
      dayjs().subtract(2, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().format('YYYY-MM-DD 23:59:59'),
    ],
  };
  const time = ref<any[]>(defaultTime[1]);
  const shortCuts = ref([
    {
      text: '最近8周',
      value: defaultTime[1],
    },
  ]);

  const PAGE_SIZE = 10;

  const searchTypeMap = {
    1: {
      label: '产品SKU',
      placeholder: '产品SKU',
    },
    4: {
      label: '产品名称',
      placeholder: '产品名称',
    },
  };

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
    ErpApi.LuteosErpRetailSaleForecastQuerySalesList.RequestBody,
    ErpApi.LuteosErpRetailSaleForecastQuerySalesList.ResponseBody
  >({
    searchDefaults: {
      keywordType: 1,
      keyword: undefined,
      customerCode: '',
      operator: '',
      warehouseCode: '',
      // salesDimensionality: 1,
      startTime: time.value[0],
      endTime: time.value[1],
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpRetailSaleForecastQuerySalesList,
  });

  // const searchTimeByWeek = computed(() => search.salesDimensionality === 1);

  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    return {
      operator_dept: res?.all_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
    };
  };

  const dickbook: any = ref({
    operator_dept: [],
  });

  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    dickbook.value = {
      ...memeberList,
    };
  };
  const handleChangeTime = (dateArr) => {
    search.startTime = dateArr ? dateArr[0] : '';
    search.endTime = dateArr ? dateArr[1] : '';
    // search.endTime = dateArr
    //   ? searchTimeByWeek.value
    //     ? dateArr[1]
    //     : dayjs(dateArr[1]).endOf('month').format('YYYY-MM-DD 23:59:59')
    //   : '';
  };
  const handleChangesalesDimensionality = (val) => {
    search.salesDimensionality = val;
    time.value = defaultTime[val];
    handleChangeTime(time.value);
  };

  const handleBatchSearch = (val) => {
    search.keyword = val?.replace(/\n/g, ',');
  };

  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss">
  .batch-search {
    .batch-search-textarea {
      border: none;
      max-height: 300px;
      outline: none;
      width: 100%;
    }
  }
</style>
