<template>
  <div class="card-row">
    <template v-for="item in stageList" :key="item.key">
      <div
        class="card-item"
        @click="searchByStage(item.key)"
        :class="{
          active:
            searchParams.productStage &&
            !searchParams.productStatus &&
            searchParams.productStage === item.key,
        }"
      >
        <div class="card-item-title">
          <div class="d-flex align-items-center gap-1">
            <span class="item-title">{{ item.label }}</span>
            <el-tooltip :content="item.tooltip" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
            <div :class="item.color" class="item-total" v-if="item?.children?.length">
              {{ statusMap[item.count] }}
            </div>
            <div v-if="item.rate" class="item-total-rate">
              占比&nbsp;&nbsp;{{ statusMap[item.rate] }}%
            </div>
          </div>
        </div>
        <div class="card-item-qty" :class="item.color" v-if="!item?.children?.length">
          {{ statusMap[item.count] }}
        </div>
        <template v-if="item?.children?.length">
          <div v-for="child in item.children" :key="child.label" class="d-flex">
            <div class="child-wrap">
              <span class="child-count-desc">{{ child.label }}</span>
            </div>
            <span class="child-count" :class="child.color">{{ statusMap[child.count] }}</span>
            <div class="child-wrap-2">
              <span class="child-rate-desc">占比</span>
              <span class="child-rate">{{ statusMap[child.rate] }}%</span>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-for="item in statusList" :key="item.key">
      <div
        class="card-item"
        @click="searchByStatus(item.key)"
        :class="{
          active:
            !searchParams.productStage && item.activeKeys.includes(searchParams.productStatus),
        }"
      >
        <div class="card-item-title">
          <div class="d-flex align-items-center gap-1">
            <span class="item-title">{{ item.label }}</span>
            <el-tooltip :content="item.tooltip" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
            <div :class="item.color" class="item-total" v-if="item?.children?.length">
              {{ statusMap[item.count] }}
            </div>
          </div>
        </div>
        <div class="card-item-qty" :class="item.color" v-if="!item?.children?.length">
          {{ statusMap[item.count] }}
          <span
            v-if="statusMap[item.count] && item.count == 'allDevelopPeriodPercentage'"
            class="percent"
          >
            %
          </span>
        </div>
        <template v-if="item?.children?.length">
          <div v-for="child in item.children" :key="child.label" class="d-flex">
            <div class="child-wrap">
              <span class="child-count-desc">{{ child.label }}</span>
            </div>
            <span class="child-count" :class="child.color">{{ statusMap[child.count] }}</span>
            <div class="child-wrap-2">
              <span class="child-rate-desc">占比</span>
              <span class="child-rate">{{ statusMap[child.rate] }}%</span>
            </div>
          </div>
        </template>
        <div v-if="item.rate" class="item-total-rate">
          占比&nbsp;&nbsp;{{ statusMap[item.rate] }}%
        </div>
      </div>
    </template>
  </div>

  <KeenList>
    <template #search>
      <el-input
        v-model="searchParams.productName"
        placeholder="搜索产品名称"
        @keydown.enter="search"
        @blur="search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!-- <el-cascader
        v-model="searchParams.planTime"
        placeholder="年规时间"
        :options="yearOptions"
        :props="{ checkStrictly: true }"
        clearable
        separator="-"
        @change="search"
      /> -->
      <el-select
        v-model="year"
        placeholder="年规年份"
        :teleported="false"
        @change="
          () => {
            initCountData();
            search();
          }
        "
        style="width: 120px"
      >
        <el-option label="2024年" :value="2024" />
        <el-option label="2025年" :value="2025" />
        <el-option label="2026年" :value="2026" />
        <el-option label="2027年" :value="2027" />
      </el-select>
      <el-select
        v-model="searchParams.planFlag"
        placeholder="是否年归"
        :teleported="false"
        @change="search"
        clearable
        style="width: 120px"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select
        v-model="searchParams.productProperty"
        placeholder="类型"
        :teleported="false"
        filterable
        clearable
        @change="search"
        style="width: 140px"
      >
        <el-option v-for="item in typeList" :label="item" :value="item" :key="item" />
      </el-select>
      <el-select
        v-model="searchParams.productStage"
        placeholder="阶段"
        filterable
        clearable
        @change="search"
        style="width: 140px"
      >
        <el-option
          v-for="item in stageList"
          :label="item.label"
          :value="item.key"
          :key="item.key"
        />
      </el-select>
      <el-select
        v-model="searchParams.productStatus"
        placeholder="状态"
        :teleported="false"
        filterable
        clearable
        @change="search"
        style="width: 120px"
      >
        <el-option
          v-for="item in statusSelectList"
          :label="item.label"
          :value="item.key"
          :key="item.key"
        />
      </el-select>
      <el-select
        v-model="searchParams.projectOwnerCode"
        placeholder="项目经理"
        :teleported="false"
        filterable
        clearable
        @change="search"
        style="width: 120px"
      >
        <el-option
          v-for="item in projectOwnerList"
          :label="item.name"
          :value="item.memberCode"
          :key="item.memberCode"
        />
      </el-select>
      <el-select
        v-model="searchParams.productLevel"
        placeholder="产品级别"
        :teleported="false"
        filterable
        clearable
        @change="search"
        style="width: 120px"
      >
        <el-option label="S" value="S" />
        <el-option label="A" value="A" />
        <el-option label="B" value="B" />
        <el-option label="C" value="C" />
      </el-select>
      <el-cascader
        style="min-width: 160px; width: 160px"
        v-model="searchParams.listingTime"
        placeholder="预计上架时间"
        :options="yearOptions"
        :props="{ checkStrictly: true }"
        clearable
        separator="-"
        @change="handlePlanChange"
      />
      <!-- <el-select
        v-model="searchParams.productLineCodeList"
        placeholder="一级分类"
        multiple
        @change="search"
        filterable
        clearable
      >
        <el-option
          v-for="item in productLineList"
          :label="item.categoryName"
          :value="item.categoryCode"
          :key="item.categoryCode"
        />
      </el-select> -->
      <ProductLineSelect
        v-model="searchParams.productLineCodeList"
        placeholder="产品品线"
        clearable
        filterable
        multiple
        @change="search"
        style="width: 160px"
      />
      <OperatorSelect
        v-model="searchParams.productOwnerCode"
        @change="search"
        style="width: 120px"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="search">查询</el-button>
      <!-- <el-popover
        popper-class="rt_el_pop h-475px"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="400"
        trigger="click"
        ref="elepopRef"
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
                <div class="form-label fs-5 fw-semibold mb-3">级别:</div>
                <el-select
                  v-model="searchParams.productLevel"
                  placeholder="请选择产品级别"
                  clearable
                  :teleported="false"
                >
                  <el-option label="S" value="S" />
                  <el-option label="A" value="A" />
                  <el-option label="B" value="B" />
                  <el-option label="C" value="C" />
                </el-select>
              </div>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem"
            >
              <el-button type="primary" @click="reset">重置</el-button>
              <el-button type="primary" @click="search">确定</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <el-button type="primary">筛选</el-button>
        </template>
      </el-popover> -->
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="uploadVisible = true" class="import-btn">导入</el-button>
      <el-button type="primary" plain @click="handleExport" v-loading="exportLoading">
        导出
      </el-button>
    </template>
    <Table
      :tableData="filterData"
      :pageInfo="pageInfo"
      @page-change="pagin"
      @selection-change="selectionChange"
      @table-btn-action="tableBtnAction"
    />
  </KeenList>
  <AddModal
    v-if="AddVisible"
    :visible="AddVisible"
    :form="curItemInfo"
    @close-modal="deleteModalAdd"
    @submit="handleSubmit"
  />
  <OperationLog v-model="showLog" :product-code="curRow.productCode" />
  <SalesTarget ref="salesTargetRef" />
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="pdt_save_import"
    title="导入"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="annualproduct">
    import { useRequest } from 'vue-request';
  import {
    reviewStar,
    updateListingTime,
    cancelPdtProduct,
    queryPdtProductTableList,
  } from '@/apis/newProduct';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { ElMessage, ElPopover } from 'element-plus';
  import { pdtApi, productApi } from '@/api';
  import { PdtLineCountBean } from '@/api/pdt/data-contracts';
  import * as swal from '@/utils/swal';
  import OperationLog from './Modal/operationLog.vue';
  import AddModal from './Modal/addModal.vue';
  import Table from './Table/index.vue';
  import SalesTarget from './Modal/salesTargetDrawer.vue';

  const year = ref<number>(new Date().getFullYear());
  const stageList = ref([
    {
      key: '0',
      label: '概念阶段',
      tooltip: '实际概念时间 < 当前时间 的产品数量；除取消状态外',
      count: 'conceptStageCount',
      rate: 'conceptStagePercentage',
      color: 'text-primary',
    },
    {
      key: '1',
      label: '立项阶段',
      tooltip: '实际立项时间 < 当前时间 的产品数量；除取消状态外',
      count: 'projectStageCount',
      rate: 'projectStagePercentage',
      color: 'text-primary',
    },
    {
      key: '2',
      label: '下单阶段',
      tooltip: '实际下单时间 < 当前时间 的产品数量；除取消状态外',
      count: 'orderStageCount',
      rate: 'orderStagePercentage',
      color: 'text-primary',
    },
    {
      key: '3',
      label: '中仓入库阶段',
      tooltip: '实际中仓入库时间 < 当前时间 的产品数量；除取消状态外',
      count: 'stockStageCount',
      rate: 'stockStagePercentage',
      color: 'text-primary',
      children: [
        {
          label: '提前',
          count: 'stockStageEarlyCount',
          rate: 'stockStageEarlyPercentage',
          color: 'text-success',
        },
        {
          label: '如期',
          count: 'stockStageCommonCount',
          rate: 'stockStageCommonPercentage',
          color: 'text-success',
        },
        {
          label: '延期',
          count: 'stockStageDelayCount',
          rate: 'stockStageDelayPercentage',
          color: 'text-warning',
        },
      ],
    },
    {
      key: '4',
      label: '上架阶段',
      tooltip: '实际上架时间 < 当前时间 的产品数量；除取消状态外',
      count: 'listingStageCount',
      rate: 'listingStagePercentage',
      color: 'text-primary',
      children: [
        {
          label: '提前',
          count: 'listingStageEarlyCount',
          rate: 'listingStageEarlyPercentage',
          color: 'text-success',
        },
        {
          label: '如期',
          count: 'listingStageCommonCount',
          rate: 'listingStageCommonPercentage',
          color: 'text-success',
        },
        {
          label: '延期',
          count: 'listingStageDelayCount',
          rate: 'listingStageDelayPercentage',
          color: 'text-warning',
        },
      ],
    },
  ]);
  const statusList = ref([
    {
      key: '0',
      label: '进行中',
      tooltip: '进行中的产品数量;',
      count: 'doing',
      rate: 'doingPercentage',
      color: 'text-success',
      activeKeys: ['0', '1'],
      children: [
        {
          label: '正常',
          count: 'normalCount',
          rate: 'normalPercentage',
          color: 'text-success',
          key: '0',
        },
        {
          label: '延期',
          count: 'delayedCount',
          rate: 'delayedPercentage',
          color: 'text-warning',
          key: '1',
        },
      ],
    },
    {
      key: '',
      label: '总开发周期缩短',
      tooltip: '求和所有项目的开发周期缩短百分比/总项目个数',
      count: 'allDevelopPeriodPercentage',
      rate: '',
      color: 'text-primary',
      activeKeys: [''],
    },
    {
      key: '2',
      label: '取消',
      tooltip: '取消状态的产品数量;',
      count: 'cancelledCount',
      rate: 'cancelledPercentage',
      color: 'text-muted',
      activeKeys: ['2'],
    },
  ]);

  const statusSelectList = ref([
    {
      key: '0',
      label: '正常',
    },
    {
      key: '1',
      label: '延期',
    },
    {
      key: '2',
      label: '取消',
    },
  ]);

  const typeList = ref([
    '自研',
    '联合开发',
    '选款改款',
    '选品',
    '预研',
    '预研转开发',
    '半自研',
    '组合套装',
    '联合研发',
  ]);
  const statusMap = ref<any>({});
  // 获取统计数据
  const initCountData = async () => {
    const res = await pdtApi.luteosPdtQueryPdtProductSummary({
      year: year.value,
    });
    statusMap.value = res;
  };
  initCountData();
  const searchByStage = (key: number) => {
    searchParams.value = {
      productStage: key === searchParams.value.productStage ? '' : key,
      productStatus: '',
      productName: '',
      projectOwnerCode: '',
      productLevel: '',
      listingTime: '',
      productLineCodeList: [],
      productOwnerCode: '',
      planFlag: '',
      productProperty: '',
    };
    getProductData();
  };
  const searchByStatus = (key: number) => {
    searchParams.value = {
      productStage: '',
      productStatus: key === searchParams.value.productStatus ? '' : key,
      productName: '',
      projectOwnerCode: '',
      productLevel: '',
      listingTime: '',
      productLineCodeList: [],
      productOwnerCode: '',
      planFlag: '',
      productProperty: '',
    };
    getProductData();
  };
  const searchParams = ref<any>({
    productStage: '',
    productStatus: '',
    productName: '',
    projectOwnerCode: '',
    productLevel: '',
    listingTime: '',
    productLineCodeList: [],
    productOwnerCode: '',
    planFlag: '',
    productProperty: '',
  });
  const state = reactive<any>({
    loading: false,
    timeList: [
      { val: 1, desc: '年规时间轴' },
      { val: 2, desc: '预计上架时间轴' },
    ],
    curTab: 2,
    filterData: [],
    curTime: 1,
    confirmTxt: '取消该产品后不可再次编辑，是否确认取消？',
    title: '取消产品上架',
    AddVisible: false,
    statusDesc: {
      0: '正常',
      1: '延期',
      2: '取消',
    },
    handleDesc: {
      1: '更新上架时间',
      2: '取消产品',
      3: '更新评分',
      4: '发起更新预计上架时间',
      5: '通过更新预计上架时间',
      7: '驳回更新预计上架时间',
      8: '发起更新实际上架时间',
      9: '通过更新实际上架时间',
      10: '驳回更新实际上架时间',
      11: '发起取消产品的审批',
      12: '通过取消产品的审批',
      13: '驳回取消产品的审批',
    },
    curItemInfo: {},
    curMonth: new Date().getMonth() + 1,
    monthInfo: {},
    curRow: {},
    productOwnerList: [],
    projectOwnerList: [],
    productLineList: [],
    pageInfo: {
      currentPage: 1,
      size: 10,
      total: 0,
    },
    yearOptions: [
      {
        label: '2023年',
        value: 2023,
        children: [
          { label: '1月', value: 1 },
          { label: '2月', value: 2 },
          { label: '3月', value: 3 },
          { label: '4月', value: 4 },
          { label: '5月', value: 5 },
          { label: '6月', value: 6 },
          { label: '7月', value: 7 },
          { label: '8月', value: 8 },
          { label: '9月', value: 9 },
          { label: '10月', value: 10 },
          { label: '11月', value: 11 },
          { label: '12月', value: 12 },
          { label: '待定', value: 13 },
        ],
      },
      {
        label: '2024年',
        value: 2024,
        children: [
          { label: '1月', value: 1 },
          { label: '2月', value: 2 },
          { label: '3月', value: 3 },
          { label: '4月', value: 4 },
          { label: '5月', value: 5 },
          { label: '6月', value: 6 },
          { label: '7月', value: 7 },
          { label: '8月', value: 8 },
          { label: '9月', value: 9 },
          { label: '10月', value: 10 },
          { label: '11月', value: 11 },
          { label: '12月', value: 12 },
          { label: '待定', value: 13 },
        ],
      },
      {
        label: '2025年',
        value: 2025,
        children: [
          { label: '1月', value: 1 },
          { label: '2月', value: 2 },
          { label: '3月', value: 3 },
          { label: '4月', value: 4 },
          { label: '5月', value: 5 },
          { label: '6月', value: 6 },
          { label: '7月', value: 7 },
          { label: '8月', value: 8 },
          { label: '9月', value: 9 },
          { label: '10月', value: 10 },
          { label: '11月', value: 11 },
          { label: '12月', value: 12 },
          { label: '待定', value: 13 },
        ],
      },
    ],
  });
  const {
    loading,
    filterData,
    AddVisible,
    curItemInfo,
    curRow,
    pageInfo,
    productOwnerList,
    projectOwnerList,
    productLineList,
    yearOptions,
  } = toRefs(state);

  const getProductData = () => {
    const { currentPage, size } = pageInfo.value;
    const data: any = {
      pageNum: currentPage,
      pageSize: size,
      year: year.value,
      planYear: searchParams.value.planYear,
      productStage: searchParams.value.productStage,
      productStatus: searchParams.value.productStatus,
      planMonth: searchParams.value.planMonth,
      productLevel: searchParams.value.productLevel,
      productLineCodeList: searchParams.value.productLineCodeList,
      productOwnerCode: searchParams.value.productOwnerCode,
      projectOwnerCode: searchParams.value.projectOwnerCode,
      productName: searchParams.value.productName,
      lineCode: searchParams.value.lineCode,
      planFlag: searchParams.value.planFlag,
      productProperty: searchParams.value.productProperty,
    };

    loading.value = true;
    queryPdtProductTableList(data)
      .then((res) => {
        if (res?.code == 200) {
          filterData.value = res.result.recordList || [];
          pageInfo.value.total = res?.result.total || 0;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const pagin = (type: string, data: number) => {
    type === 'curPage' && (pageInfo.value.currentPage = data);
    type === 'pagesize' && ((pageInfo.value.currentPage = 1), (pageInfo.value.size = data));
    getProductData();
  };

  const uploadVisible = ref(false);
  const batchUpdate = (reload) => {
    if (reload) {
      getProductData();
    }
    uploadVisible.value = false;
  };

  const queryPdtProductOwner = async () => {
    const res = await pdtApi.luteosPdtQueryOperatorList({
      operatorType: 1,
    });
    productOwnerList.value = res.memberList;
  };

  const queryPdtProjectOwner = async () => {
    const res = await pdtApi.luteosPdtQueryOperatorList({
      operatorType: 2,
    });
    projectOwnerList.value = res.memberList;
  };

  const queryPdtProductLine = async () => {
    const res = await productApi.luteosProductCategoryQueryCategoryTopAndLeafLevelList({});
    productLineList.value = res?.categoryLevelBeanList;
  };

  const lineCodeList = ref<PdtLineCountBean[]>([]);
  const queryLineCodeList = async () => {
    const res = await pdtApi.luteosPdtQueryPdtProductLine();
    lineCodeList.value = res?.pdtProductLines as PdtLineCountBean[];
  };

  const deleteModalAdd = () => {
    AddVisible.value = false;
  };

  const handleSubmit = async () => {
    if (curItemInfo.value.type === 1) {
      const data: any = {
        productCode: curItemInfo.value.productCode,
        reason: curItemInfo.value.reason,
        listingTime: curItemInfo.value.listingTime,
        updateType: curItemInfo.value.updateType,
        actualListingTime: curItemInfo.value.actualListingTime,
        stockTime: curItemInfo.value.stockTime,
        planStockTime: curItemInfo.value.planStockTime,
        fileList: curItemInfo.value.fileList,
      };
      updateListingTime(data).then((res) => {
        if (res.code == 200) {
          getProductData();
          AddVisible.value = false;
        }
      });
    } else if (curItemInfo.value.type === 2) {
      const data: any = {
        productCode: curItemInfo.value.productCode,
        star: curItemInfo.value.star,
      };
      reviewStar(data).then((res) => {
        if (res.code == 200) {
          getProductData();
          AddVisible.value = false;
        }
      });
    } else if (curItemInfo.value.type === 5) {
      const data: any = {
        categoryTopCode: curItemInfo.value.topCategoryCode,
        categoryLeafCode: curItemInfo.value.productCategoryCode,
        productCode: curItemInfo.value.productCode,
        productLevel: curItemInfo.value.productLevel,
        productSpu: curItemInfo.value.productSpu,
        productName: curItemInfo.value.productName,
        productOwnerCode: curItemInfo.value.productOwnerCode,
        projectOwner: curItemInfo.value.projectOwner,
        productProperty: curItemInfo.value.productProperty,
        actualConceptReviewTime: curItemInfo.value.actualConceptReviewTime,
        actualOrderReviewTime: curItemInfo.value.actualOrderReviewTime,
        actualProjectReviewTime: curItemInfo.value.actualProjectReviewTime,
        conceptReviewTime: curItemInfo.value.conceptReviewTime,
        projectReviewTime: curItemInfo.value.projectReviewTime,
        orderReviewTime: curItemInfo.value.orderReviewTime,
        productLineCode: curItemInfo.value.productLineCode,
        planFlag: curItemInfo.value.planFlag,
        fileList: curItemInfo.value.fileList,
        remark: curItemInfo.value.remark,
      };
      await pdtApi.luteosPdtUpdatePdtProduct(data);
      ElMessage.success('修改成功');
      getProductData();
      AddVisible.value = false;
    } else {
      const data: any = {
        productCode: curItemInfo.value.productCode,
        reason: curItemInfo.value.reason,
        fileList: curItemInfo.value.fileList,
      };
      cancelPdtProduct(data).then((res) => {
        if (res.code == 200) {
          getProductData();
          AddVisible.value = false;
        }
      });
    }
  };

  const handleUpdateProduct = (subItem, type) => {
    curItemInfo.value = { ...subItem, type };
    if (subItem?.fileList?.length) {
      // 附件回显
      curItemInfo.value.fileList = subItem?.fileList.map((item) => ({
        percentage: 100,
        fileName: item.fileName,
        name: item.fileName,
        status: 'success',
        ossKey: item.ossKey,
      }));
    }
    AddVisible.value = true;
  };

  const search = () => {
    pageInfo.value.currentPage = 1;
    getProductData();
  };

  const reset = () => {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
    for (const key in searchParams.value) {
      if (typeof searchParams.value[key] === 'object') {
        searchParams.value[key] = [];
      } else {
        searchParams.value[key] = '';
      }
    }
    getProductData();
  };
  const router = useRouter();
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(pdtApi.luteosPdtExportProduct, {
    manual: true,
    async onSuccess(d) {
      const isConfirmed = await swal.exportConfirm();
      if (!isConfirmed) return;

      await nextTick();
      router.push({
        path: '/downloadmanage',
        query: {
          module_code: d?.moduleCode,
          record_type: 2,
        },
      });
    },
    onError(e) {
      swal.error(`导出失败: ${e.message}`);
    },
  });
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    const { currentPage, size } = pageInfo.value;
    exportRun({
      pageNum: currentPage,
      pageSize: size,
      year: year.value,
      planYear: searchParams.value.planYear,
      planMonth: searchParams.value.planMonth,
      productLevel: searchParams.value.productLevel,
      productLineCodeList: searchParams.value.productLineCodeList,
      productOwnerCode: searchParams.value.productOwnerCode,
      projectOwnerCode: searchParams.value.projectOwnerCode,
      productName: searchParams.value.productName,
      lineCode: searchParams.value.lineCode,
      productCodeList: productCodeList.value,
      planFlag: searchParams.value.planFlag,
      productProperty: searchParams.value.productProperty,
      queryParam: getQueryParam(),
    });
  };

  const showLog = ref<boolean>(false);
  const salesTargetRef = ref();
  const tableBtnAction = async (type: string, row?: any) => {
    curRow.value = row;
    if (type === 'update') {
      handleUpdateProduct(row, 1);
    } else if (type === 'updateStar') {
      handleUpdateProduct(row, 2);
    } else if (type === 'cancel') {
      handleUpdateProduct(row, 3);
    } else if (type === 'view') {
      handleUpdateProduct(row, 4);
    } else if (type === 'edit') {
      handleUpdateProduct(row, 5);
    } else if (type === 'log') {
      showLog.value = true;
    } else if (type === 'detail') {
      router.push(`/goodslist/detail?code=${row.productSpu}`);
    } else if (type === 'salesTarget') {
      salesTargetRef.value?.open(row);
    } else if (type === 'delete') {
      await pdtApi.luteosPdtDeletePdtProduct({
        productCode: row.productCode,
      });
      ElMessage.success('删除成功');
      getProductData();
    }
  };

  const productCodeList = ref<string[]>([]);
  const selectionChange = (data?: any) => {
    productCodeList.value = data?.map((item) => item.productCode);
  };

  const handlePlanChange = (val) => {
    if (val) {
      searchParams.value.planYear = val[0] || '';
      searchParams.value.planMonth = val[1] || '';
    } else {
      searchParams.value.planYear = undefined;
      searchParams.value.planMonth = undefined;
    }
    search();
  };

  const getQueryParam = () => {
    const data: any = {
      产品名称: searchParams.value.productName || '',
      /* 年规时间: searchParams.value.year
  ? searchParams.value.year + (searchParams.value.month ? `-${searchParams.value.month}` : '')
  : '', */
      预计上架时间: searchParams.value.planYear
        ? searchParams.value.planYear +
          (searchParams.value.planMonth ? `-${searchParams.value.planMonth}` : '')
        : '',
      级别: searchParams.value.productLevel || '',
      一级分类:
        productLineList.value
          ?.filter((item) => searchParams.value.productLineCodeList.includes(item.categoryCode))
          ?.map((item) => item.categoryName)
          ?.join(',') || '',
      产品线:
        lineCodeList.value.find((item) => item.lineCode === searchParams.value.lineCode)
          ?.lineName || '',
    };

    for (const key in data) {
      if (data[key] === '' || data[key] === undefined) {
        delete data[key];
      }
    }

    return data;
  };

  queryPdtProductOwner();
  queryPdtProjectOwner();
  queryPdtProductLine();
  queryLineCodeList();
  getProductData();
</script>

<style lang="scss" scoped>
  .item-total {
    width: 100px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -50px;
    text-align: center;
    padding-top: 0.6vw;
  }
  .item-total-rate {
    width: 100px;
    position: absolute;
    top: 0;
    right: 10px;
    padding-top: 0.6vw;
  }
  .child-wrap {
    display: flex;
    width: 49%;
    justify-content: space-between;
    flex-wrap: nowrap;
    position: relative;
  }
  .child-wrap-2 {
    position: absolute;
    right: 10px;
    display: flex;
    width: 100px;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
  .percent {
    display: inline-block;
    margin-left: -5px;
  }
  .child-count {
    text-align: center;
    display: inline-block;
    width: 100px;
    color: #909399;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    text-align: center;
  }
  .child-rate {
    color: #909399;
    display: inline-block;
  }
  .child-rate-desc {
    display: inline-block;
    color: #909399;
    margin-right: 10px;
  }
  .container-bg {
    background-color: rgb(249, 249, 249);
  }

  .card-body {
    background: #fff;
  }

  .show-tab {
    margin-bottom: 20px;
    height: 60px;

    li {
      cursor: pointer;
    }
  }

  .my-warning-btn {
    position: absolute;
    right: 100px;
    cursor: pointer;
  }

  .my-primary-btn {
    position: absolute;
    cursor: pointer;
    right: 200px;
  }

  .badge-status {
    margin-right: 10px;
  }

  .my-card {
    margin-bottom: -40px;
    margin-top: 30px;
  }

  .rt_container {
    :deep(.el-collapse-item__header) {
      font-weight: 600 !important;
      font-size: 18px !important;
      color: #3f4254 !important;
    }

    :deep(.el-collapse) {
      border-top: none;
    }
  }

  .my-svg-icon {
    margin-left: 8px;
    margin-top: -6px;
    cursor: pointer;
  }

  .my-input {
    width: 80px;
    height: 30px;
    margin-left: 5px;
  }

  .primary-color {
    color: #3e97ff;
    font-weight: 600;
  }

  .symbol.symbol-25px > img {
    width: 40px;
    height: 40px;
  }

  .avator {
    width: 20px !important;
    height: 20px !important;
    cursor: pointer;

    :deep(.txt) {
      font-size: 16px !important;
    }
  }

  .avator-position {
    position: relative;
    top: 5px;
  }

  .nav-item {
    cursor: pointer;
  }

  .badge-bold {
    font-weight: 600;
  }

  .no-data-tips {
    width: 100%;
    height: 450px;
    line-height: 450px;
    text-align: center;
    font-size: 14px;
    color: #626466;
  }

  .wid_320 {
    :deep(.el-input__wrapper) {
      width: 320px !important;
    }
  }

  .ele_input {
    ::v-deep(.el-input__wrapper) {
      border-color: var(--bs-gray-100);
      color: var(--bs-gray-700);
      transition: color 0.2s ease;
      display: inline-flex;
      width: 100%;
      padding: 0.2rem 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.1;
      color: var(--bs-gray-700);
      background-color: #f9f9f9;
      background-clip: padding-box;
      border: 1px solid #f9f9f9;
      appearance: none;
      border-radius: 0.475rem;
      height: auto;
      box-shadow: none;
      height: 3.35rem;
    }

    ::v-deep(.el-input__inner) {
      height: auto;
      line-height: unset;
      font-weight: 500;
      color: #5e6278;
    }

    ::v-deep(.el-input__prefix) {
      flex: 0 0 25px;
    }

    ::v-deep(.el-input__wrapper.is-focus) {
      background-color: var(--bs-gray-200);
      border-color: var(--bs-gray-200);
      color: var(--bs-gray-700);
      transition: color 0.2s ease;
    }

    ::v-deep(.el-input__clear) {
      color: #5e6278;
    }
  }

  .ele_input.el-input--small {
    ::v-deep(.el-input__wrapper) {
      padding-top: 0.55rem;
      padding-bottom: 0.55rem;
      padding-left: 0.75rem;
      font-size: 0.95rem;
      border-radius: 0.425rem;
    }
  }

  .select2-selection {
    ::v-deep(.el-select__input) {
      margin-left: 0 !important;
    }
  }

  .max-content {
    width: max-content;
  }
  .card-row {
    min-width: 825px;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(4, 1fr);
    margin: 10px 0;
  }
  .card-item {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 6vw;
    min-height: 120px;
    background: #ffffff;
    padding: 0.75vw;
    border-radius: 5px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
    &-title {
      font-size: 14px;
      font-weight: 400;
    }
    &-qty {
      font-size: 16px;
      text-align: center;
    }
    &-rate {
      font-size: 12px;
      color: var(--el-color-info);
    }
    &.active {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
      .item-title {
        font-weight: bold;
      }
    }
  }
</style>
