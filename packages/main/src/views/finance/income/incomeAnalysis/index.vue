<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-select
        v-model="search.ruleTypeList"
        :options="financeBillsRuleTypeMap"
        :props="{label: 'name', value: 'value'}"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        v-if="ruleTypePage == '单据推送'"
        placeholder="单据类型"
      />
      <el-select v-model="ruleTypeValue" disabled placeholder="单据类型" v-else>
        <el-option
          v-for="(item, index) in billTypeMap"
          :value="item.value"
          :label="item.name"
          :key="index"
        />
      </el-select>
      <div class="select-shop-list">
        <ProductShopSelectFinance
          v-model="shops"
          style="width: 225px"
          placeholder="店铺名称"
          clearable
          filterable
          multiple
          @change="handleBlur"
        />
        <div class="select-icon-more">
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </div>
      </div>
      <OrganizationSelect
        v-model="search.settlementOrganizations"
        placeholder="结算组织"
        multiple
        clearable
        filterable
      />
      <PlatformSelect v-model="search.platforms" filterable clearable multiple />
      <CountrySelect v-model="search.countrys" filterable clearable multiple />
      <el-select
        style="width: 120px"
        v-model="search.uploadStatus"
        placeholder="上传状态"
        clearable
      >
        <el-option v-for="(val, key) in uploadStatusMap" :value="key" :label="val" :key="key" />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.generateFinalStatementStatus"
        placeholder="生成状态"
        clearable
      >
        <el-option
          v-for="(val, key) in generateFinalStatementStatusMap"
          :value="key"
          :label="val"
          :key="key"
        />
      </el-select>
      <el-date-picker
        style="width: 120px"
        v-model="search.nowTime"
        type="month"
        value-format="YYYYMM"
        placeholder="选择期间"
        :clearable="false"
      />
    </template>
    <template #buttons>
      <el-dropdown @command="handleCommand">
        <el-button type="primary" :loading="batchExecuteLoading">
          上传并生成
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="batchExecute">执行所选</el-dropdown-item>
            <el-dropdown-item command="batchSearchExecute">按筛选条件执行</el-dropdown-item>
            <!--            <el-dropdown-item command="batchOverrideExecute">执行所选（覆盖上传）</el-dropdown-item>-->
            <!--            <el-dropdown-item command="batchSearchOverrideExecute">-->
            <!--              按筛选条件执行（覆盖上传）-->
            <!--            </el-dropdown-item>-->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown @command="handleCommand">
        <el-button type="primary" :loading="batchExecuteLoading2">
          批量查单
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="selectCode">查询所选行标识</el-dropdown-item>
            <el-dropdown-item command="searchCode">按筛选行标识查询</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>

    <div class="status-card d-flex flex-wrap gap-4">
      <div class="d-flex justify-content-between w-100">
        <div class="w-100 pt-4 ps-4">总计 {{ listData?.staticsInfo?.all || 0 }} 条记录</div>
        <div
          v-show="!showFlag"
          @click="showFlag = !showFlag"
          class="text-center cursor-pointer arrows-icon-down"
        >
          <svgIcon icon="arrows-arr072" class="svg-icon svg-icon-1 text-primary" />
        </div>
        <div
          v-show="showFlag"
          @click="showFlag = !showFlag"
          class="text-center cursor-pointer arrows-icon-up"
        >
          <svgIcon icon="arrows-arr073" class="svg-icon svg-icon-1 text-primary" />
        </div>
      </div>
      <div class="d-flex gap-4 card-row" v-if="showFlag">
        <template v-for="(item, index) in uploadStatusList" :key="item.status">
          <div class="card-item" :style="{ background: item?.bgColor }">
            <div class="card-item-title">
              <div class="d-flex align-items-center gap-1">
                <span :style="{ color: item?.color }">{{ item.label }}</span>
              </div>
            </div>
            <div class="card-item-qty" :class="item.color">
              {{ listData?.staticsInfo[item.code] }}
            </div>
          </div>
        </template>
      </div>
      <div class="d-flex gap-4 card-row" v-if="showFlag">
        <template v-for="(item, index) in generateFinalStatementStatusList" :key="index">
          <div class="card-item" :style="{ background: item?.bgColor }">
            <div class="card-item-title">
              <div class="d-flex align-items-center gap-1">
                <span :style="{ color: item?.color }">{{ item.label }}</span>
              </div>
            </div>
            <div class="card-item-qty" :class="item.color">
              {{ listData?.staticsInfo[item.code] }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="shop"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="单据类型" prop="typeDesc" v-if="ruleTypePage === '单据推送'" />
      <el-table-column label="店铺" prop="shop" />
      <el-table-column label="月报上传进度" prop="uploadProgress">
        <template #default="{ row }">
          <el-progress
            :percentage="row.uploadProgress"
            :stroke-width="8"
            :status="progressStatusMap[row?.uploadStatus]"
          />
        </template>
      </el-table-column>
      <el-table-column label="结算单生成进度" prop="generateFinalStatementProgress">
        <template #default="{ row }">
          <el-progress
            :percentage="row.generateFinalStatementProgress"
            :stroke-width="8"
            :status="progressStatusMap[row?.generateFinalStatementStatus]"
          />
        </template>
      </el-table-column>
      <el-table-column label="当前期间" prop="nowTime" />
      <el-table-column label="平台" prop="platform" />
      <el-table-column label="结算组织" prop="orgName" />
      <el-table-column label="行标识" prop="code" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '执行',
                key: 'execute',
                type: 'primary',
                permissionCode: '',
                row,
              },
              /*{
                label: '覆盖执行',
                key: 'overrideExecute',
                type: 'primary',
                permissionCode: '',
                row,
              },*/
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: '',
                disabled: !row?.code,
                row,
              },
              {
                label: getLabel(),
                key: 'toStatement',
                type: 'primary',
                permissionCode: '',
                disabled: !row?.code,
                row,
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
  <DetailDialog ref="detailDialogRef" />
  <FailDialog ref="failDialogRef" />
</template>

<script setup lang="ts" name="incomeAnalysis">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, FinanceSystemApi } from '@/api';
  import dayjs from 'dayjs';
  import PlatformSelect from '@/views/finance/income/incomeRule/components/platformSelect.vue';
  import OrganizationSelect from '@/views/finance/income/incomeRule/components/organizationSelect.vue';
  import {
    generateFinalStatementStatusList,
    progressStatusMap,
    uploadStatus,
    uploadStatusList,
    uploadStatusMap,
    generateFinalStatementStatusMap,
    generateFinalStatementStatus,
  } from '@/views/finance/income/incomeAnalysis/enum';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import DetailDialog from '@/views/finance/income/incomeAnalysis/components/detailDialog.vue';
  import FailDialog from '@/views/finance/income/incomeAnalysis/components/failDialog.vue';
  import {
    ruleType,
    financeBillsRuleTypeMap,
    billTypeMap,
  } from '@/views/finance/income/incomeRule/enum';
  import { omit } from 'lodash-es';

  const route = useRoute();
  const router = useRouter();

  const tableRef = ref(null);
  const PAGE_SIZE = 10;

  const showFlag = ref(true);

  const ruleTypeList = ref(); //多选
  const ruleTypeValue = ref(); //禁用，显示单选
  const ruleTypePage = ref();
  const initData = () => {
    if (route.name === 'payBackAnalysis') {
      ruleTypeList.value = [ruleType.收款单规则];
      ruleTypeValue.value = ruleType.收款单规则;
      ruleTypePage.value = '收款单';
    } else if (route.name === 'incomeAnalysis') {
      ruleTypeList.value = [ruleType.结算单规则];
      ruleTypeValue.value = ruleType.结算单规则;
      ruleTypePage.value = '结算单';
    } else {
      ruleTypeList.value = [ruleType.平台入库明细];
      ruleTypePage.value = '单据推送';
    }
  };
  initData();

  const timer = ref(null);
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
  } = useList<
    FinanceSystemApi.FinanceIncomeRuleAnalysisQueryList.RequestBody,
    FinanceSystemApi.FinanceIncomeRuleAnalysisQueryList.ResponseBody
  >({
    searchDefaults: {
      shops: undefined,
      platforms: undefined,
      countrys: undefined,
      uploadStatus: undefined,
      generateFinalStatementStatus: undefined,
      settlementOrganizations: undefined,
      nowTime: dayjs().subtract(1, 'month').format('YYYYMM'),
      ruleTypeList: ruleTypeList.value,
    },
    onSuccess: () => {
      // 轮询进度
      if (timer.value) clearInterval(timer.value);
      timer.value = setInterval(async () => {
        if (listData.value?.recordList?.length) {
          const ids = listData.value?.recordList
            ?.filter(
              (item) =>
                item?.id &&
                !(
                  item?.uploadStatus?.toString() === uploadStatus.上传失败 ||
                  (item?.uploadStatus?.toString() === uploadStatus.上传成功 &&
                    [
                      generateFinalStatementStatus.生成成功,
                      generateFinalStatementStatus.生成失败,
                    ].includes(item?.generateFinalStatementStatus?.toString()))
                )
            )
            ?.map((item) => item?.id);
          if (ids?.length) {
            const res = await financeSystemApi.financeIncomeRuleAnalysisQueryByIds({
              ids: ids,
              // ruleType: ruleTypeValue.value,
            });
            listData.value.recordList = listData.value?.recordList?.map((item) => {
              const newItem = res?.find((i) => i?.shop === item?.shop);
              if (newItem) {
                return { ...item, ...newItem };
              }
              return item;
            });
          }
        }
      }, 5000);
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeIncomeRuleAnalysisQueryList,
  });

  const resetSearchData = () => {
    Object.keys(search).forEach((key) => {
      search[key] = undefined;
    });
    shops.value = [];
    resetSearch();
  };
  const getLabel = () => {
    if (ruleTypePage.value === '结算单') {
      return '查看结算单';
    } else if (ruleTypePage.value === '收款单') {
      return '查看收款单';
    } else if (ruleTypePage.value === '单据推送') {
      return '查看单据';
    }
  };

  const batchSearchRef = ref();
  const shops = ref();
  // 店铺
  const handleBlur = (e) => {
    if (shops.value) {
      search.shops = shops.value;
      batchSearchRef.value?.clear();
    } else {
      shops.value = [];
      search.shops = [];
    }
  };
  const handleBatchSearch = (val) => {
    search.shops = val
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((res) => res);
    shops.value = [];
  };
  const handleBatchClear = () => {
    search.shops = [];
  };

  // 表格操作
  const detailDialogRef = ref(null);
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'execute': {
        // 执行
        const isConfirmed = await swal.confirm('确认执行吗？');
        if (!isConfirmed) return;
        await financeSystemApi.financeIncomeRuleAnalysisExecute({
          shop: row?.shop,
          nowTime: search.nowTime,
          override: true,
          ruleType: row.type,
        });
        ElMessage.success('执行成功');
        refreshList();
        break;
      }
      /* case 'overrideExecute': {
        // 覆盖执行
        const isConfirmed = await swal.confirm('确认覆盖执行吗？');
        if (!isConfirmed) return;
        await financeSystemApi.financeIncomeRuleAnalysisExecute({
          shop: row?.shop,
          nowTime: search.nowTime,
          override: true,
        });
        ElMessage.success('执行成功');
        refreshList();
        break;
      } */
      case 'view':
        // 详情
        detailDialogRef.value?.open(row?.code);
        break;
      case 'toStatement':
        openPage([row?.code]);
        break;
      default:
        break;
    }
  };

  const openPage = (code) => {
    // 查看收款单
    if (ruleTypePage.value === '收款单') {
      router.push({
        name: 'payBackStatement',
        query: {
          code: code,
        },
      });
    } else if (ruleTypePage.value === '结算单') {
      // 查看结算单
      router.push({
        name: 'incomeStatement',
        query: {
          code: code,
        },
      });
    } else {
      router.push({
        name: 'financeBillsStatement',
        query: {
          code: code,
        },
      });
    }
  };
  // 选中行
  const shopList = ref([]);
  const codeList = ref([]);
  const handleSelectionChange = (selection) => {
    shopList.value = selection.map((item) => item.shop);
    codeList.value = selection.map((item) => item.code).filter((res) => res);
  };

  // 批量操作
  const failDialogRef = ref(null);
  const batchExecuteLoading = ref(false);
  const batchExecuteLoading2 = ref(false);
  const batchExecute = async (params, tip) => {
    try {
      batchExecuteLoading.value = true;
      const res = await financeSystemApi.financeIncomeRuleAnalysisExecuteBatch(params);
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      batchExecuteLoading.value = false;
    }
  };

  const handleCommand = async (command: string, item: any) => {
    switch (command) {
      case 'batchExecute': {
        // 执行所选
        if (!shopList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认执行所选吗？');
        if (!isConfirmed) return;
        batchExecute(
          {
            shops: shopList.value,
            nowTime: search.nowTime,
            override: true,
            ruleTypeList: search.ruleTypeList,
          },
          '执行所选'
        );
        break;
      }
      case 'selectCode': {
        console.log(codeList.value);
        // 执行所选
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认查询所选行标识吗？');
        if (!isConfirmed) return;
        openPage(codeList.value);
        tableRef.value?.clearSelection();
        break;
      }
      case 'searchCode': {
        // 按筛选条件执行
        const isConfirmed = await swal.confirm('确认按筛选行标识查询吗？');
        if (!isConfirmed) return;
        try {
          batchExecuteLoading2.value = true;
          let param = { ...omit(search, 'pageSize') };
          param.pageSize = 100;
          const res = await financeSystemApi.financeIncomeRuleAnalysisQueryList(param);
          if (res?.recordList?.length) {
            codeList.value = res?.recordList.map((item) => item.code).filter((code) => code);
            openPage(codeList.value);
          }
        } finally {
          batchExecuteLoading2.value = false;
        }
        break;
      }
      case 'batchSearchExecute': {
        // 按筛选条件执行
        const isConfirmed = await swal.confirm('确认按筛选条件执行吗？');
        if (!isConfirmed) return;
        batchExecute(
          {
            override: true,
            ...search,
          },
          '按筛选条件执行'
        );
        break;
      }
      /* case 'batchOverrideExecute': {
        // 执行所选（覆盖上传）
        if (!shopList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认执行所选（覆盖上传）吗？');
        if (!isConfirmed) return;
        batchExecute(
          {
            shops: shopList.value,
            nowTime: search.nowTime,
            override: true,
          },
          '执行所选（覆盖上传）'
        );
        break;
      }
      case 'batchSearchOverrideExecute': {
        // 按筛选条件执行（覆盖上传）
        const isConfirmed = await swal.confirm('确认按筛选条件执行（覆盖上传）吗？');
        if (!isConfirmed) return;
        batchExecute(
          {
            override: true,
            ...search,
          },
          '按筛选条件执行（覆盖上传）'
        );
        break;
      } */
      default:
        break;
    }
  };

  watch(
    () => route.path,
    () => {
      // 组件销毁时清除定时器
      if (timer.value) {
        clearInterval(timer.value);
      }
    }
  );
</script>

<style scoped lang="scss">
  .status-card {
    margin: 10px 0;
    .card-row {
      min-width: 825px;
      flex-grow: 1;
    }
    .card-item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 33%;
      height: 4vw;
      min-height: 70px;
      background: #ffffff;
      padding: 0.5vw 1vw;
      border-radius: 12px;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      position: relative;
      cursor: pointer;
      &-title {
        font-size: 14px;
        font-weight: 400;
      }
      &-qty {
        font-size: 16px;
        font-weight: 600;
      }
      &-rate {
        font-size: 12px;
        color: var(--el-color-info);
      }
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
        //box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1);
      }
    }
  }
  :deep(.el-progress__text) {
    color: var(--el-table-text-color);
  }

  .arrows-icon-down {
    &:hover {
      animation: moveDown 2s linear infinite;

      @keyframes moveDown {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
  .arrows-icon-up {
    &:hover {
      animation: moveUp 2s linear infinite;

      @keyframes moveUp {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(-3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
  .select-shop-list {
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    :deep(.el-select__wrapper) {
      box-shadow: none;
      border-right: 1px solid var(--el-border-color);
      border-radius: 6px 0 0 6px;
    }
    .select-icon-more {
      display: inline-block;
      color: var(--el-color-info);
      padding: 0 9px;
    }
  }
</style>
