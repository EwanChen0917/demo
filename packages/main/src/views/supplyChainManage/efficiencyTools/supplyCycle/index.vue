<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="供应链SKU/产品SKU/产品名称"
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <third-category
        style="width: 140px"
        v-model="search.thirdCategoryCode"
        placeholder="三级分类"
        clearable
      />
      <!--      <CategoryCascader
        v-model="categoryCodeList"
        placeholder="五级分类"
        style="width: 140px"
        :filter-flag="1"
        @change="
          (val) => {
            search.categoryCode = val.categoryCode;
          }
        "
      />-->
      <ProductChannelSelect style="width: 140px" v-model="search.channel" filterable clearable />
      <!--      <ProductSiteSelect style="width: 140px" v-model="search.country" filterable clearable />-->
      <ErpSiteSelect :channel="search.channel" v-model="search.country" filterable clearable />
      <DeptMember
        style="width: 140px"
        v-model="search.plannerCode"
        deptCode="supply_planer_dept"
        placeholder="计划"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="batchUpdateDialogRef?.open">批量更新</el-button>
      <!--      <el-button
        class="button"
        type="primary"
        @click="editDialogRef.open()"
        v-permission="'supplyCycleAdd'"
      >
        新增
      </el-button>-->
      <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column prop="supplySku" label="供应链SKU" min-width="120" />
      <!-- <el-table-column prop="platformSku" label="店铺SKU" /> -->
      <!-- <el-table-column prop="skuCode" label="产品SKU" /> -->
      <el-table-column prop="supplierName" label="供应商名称" min-width="120" />
      <el-table-column prop="skuName" label="产品名称" min-width="120" />
      <el-table-column prop="thirdCategoryDesc" label="三级分类" />
      <el-table-column prop="originalPlatformMark" label="渠道唯一标识" />
      <el-table-column prop="channelDesc" label="渠道" />
      <el-table-column prop="countryDesc" label="站点" />
      <el-table-column prop="skuCode" label="产品SKU" min-width="120" />
      <el-table-column prop="plannerName" label="计划" />
      <el-table-column prop="totalCycle" label="总供应周期(D)" />
      <el-table-column prop="avgCycle" label="所需预测周数（W）" min-width="120" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="100px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'supplyCycleEdit',
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'supplyCycleDetail',
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
  <EditDialog :dickbook="dickbook" ref="editDialogRef" @success="refreshList" />
  <DetailDialog ref="detailDialogRef" />
  <ImportUpdateDialog
    title="批量更新"
    notice="请注意标黄必填字段，未填写必填字段将上传失败"
    :downloadParams="search"
    type="batchUpdate"
    ref="batchUpdateDialogRef"
    @success="refreshList"
  />
</template>

<script lang="ts" setup name="supplyCycle">
  import { erpApi, ErpApi, platformApi, dataApi, productApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import ThirdCategory from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/thirdCategory.vue';
  import ImportUpdateDialog from './components/importUpdateDialog.vue';
  import DetailDialog from './components/detailDialog.vue';
  import EditDialog from './components/editDialog.vue';

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
    ErpApi.LuteosErpPlanSupplyCycleQueryList.RequestQuery,
    ErpApi.LuteosErpPlanSupplyCycleQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      channel: '',
      country: '',
      plannerCode: '',
      categoryCode: '',
      thirdCategoryCode: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanSupplyCycleQueryList,
  });

  const batchUpdateDialogRef = ref();

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
  const getSupplySku = async () => {
    const res = await erpApi.luteosErpPlanSupplyCycleQuerySupplySku();
    // const res = await productApi.luteosProductQuerySupplySku();
    return res.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  };

  const categoryCodeList = ref([]);
  const dickbook: any = ref({ plan_cycle_channel: [], countryList: [], supplySkuList: [] });
  const initDickbook = async () => {
    const res = await platformApi.platformDict({ dictCodes: ['plan_cycle_channel'] });
    const countryList = await getCountryList();
    const supplySkuList = await getSupplySku();
    dickbook.value = { ...res.dictMap, countryList, supplySkuList };
  };
  const editDialogRef = ref();
  const detailDialogRef = ref();

  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value.open({
        channel: row.channel,
        code: row.code,
        country: row.country,
        domesticShipDay: row.domesticShipDay || 0,
        orderHandleOverDay: row.orderHandleOverDay || 0,
        originalPlatformMark: row.originalPlatformMark,
        qcHandleDay: row.qcHandleDay || 0,
        receiveListingDay: row.receiveListingDay || 0,
        seaOverDay: row.seaOverDay || 0,
        supplierHandleOverDay: row.supplierHandleOverDay || 0,
        supplySku: row.supplySku,
        trunOverDay: row.trunOverDay || 0,
      });
    }
    if (key === 'detail') {
      detailDialogRef.value.open(row);
    }
  };

  const categoryOption = ref([]);
  const getOptions = async (categoryCode: string, level: number) => {
    const res = await productApi.luteosProductCategoryQueryCategoryLevelList({
      categoryCode,
    });
    categoryOption.value = res.categoryLevelBeanList;
  };
  getOptions('', 5);

  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss"></style>
