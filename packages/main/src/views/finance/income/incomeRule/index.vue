<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-select
        v-model="search.ruleTypeList"
        :options="financeBillsRuleTypeMap"
        :props ="{
          label: 'name',
          value: 'value',
        }"
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="单据类型"
        v-if="ruleTypePage == '单据推送'"
      />
      <el-select v-model="ruleTypeValue" disabled placeholder="单据类型" v-else>
        <el-option
          v-for="(item, index) in billTypeMap"
          :value="item.value"
          :label="item.name"
          :key="index"
        />
      </el-select>
      <OrganizationSelect
        v-model="search.settlementOrganizationList"
        placeholder="结算组织"
        multiple
        clearable
        filterable
      />
      <PlatformSelect v-model="search.platform" filterable clearable />
      <div class="select-shop-list">
        <ProductShopSelectFinance
          v-model="shopList"
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
      <CountrySelect
        v-model="search.country"
        placeholder="国家"
        clearable
        v-if="ruleTypePage !== '单据推送'"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary" @click="checkDialogRef?.open(search.ruleTypeList)">
        完成度检查
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="ruleCode"
      class-name="table-row-dashed"
      :tree-props="{
        children: 'ruleShopList',
      }"
    >
      <el-table-column label="单据类型" prop="typeDesc" v-if="ruleTypePage === '单据推送'" />
      <el-table-column label="规则识别码" prop="ruleCode" />
      <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag v-if="[0, 1].includes(row?.status)" :color="statusColorMap[row?.status]">
            {{ statusMap[row?.status] }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="店铺" prop="shop">
        <template #default="{ row }">
          <span>{{ row?.ruleShopBean?.shop || row?.shop }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行号" prop="lineNum">
        <template #default="{ row }">
          <span>{{ row?.ruleShopBean?.lineNum || row?.lineNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台" prop="platform">
        <template #default="{ row }">
          <span>{{ row?.ruleShopBean?.platform || row?.platform }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算组织" prop="settlementOrganization">
        <template #default="{ row }">
          <span>
            {{ row?.ruleShopBean?.settlementOrganization || row?.settlementOrganization }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            v-if="[0, 1].includes(row?.status)"
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'success',
                hide: row?.status === 1,
                permissionCode: '',
                row,
              },
              {
                label: '停用',
                key: 'disable',
                type: 'danger',
                hide: row?.status === 0,
                permissionCode: '',
                row,
              },
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                permissionCode: '',
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
  <CheckDialog ref="checkDialogRef" :ruleType="search.ruleTypeList" />
</template>

<script setup lang="ts" name="incomeRule">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, FinanceSystemApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import CheckDialog from '@/views/finance/income/incomeRule/components/checkDialog.vue';
  import PlatformSelect from '@/views/finance/income/incomeRule/components/platformSelect.vue';
  import OrganizationSelect from '@/views/finance/income/incomeRule/components/organizationSelect.vue';
  import { init } from 'ace-builds/src-noconflict/ext-keybinding_menu';
  import {
    ruleType,
    financeBillsRuleTypeMap,
    billTypeMap,
  } from '@/views/finance/income/incomeRule/enum';
  import { omit } from 'lodash-es';

  const statusMap = {
    0: '未启用',
    1: '已启用',
  };
  const statusColorMap = {
    0: 'gray',
    1: 'green',
  };
  const PAGE_SIZE = 10;
  const router = useRouter();
  const route = useRoute();
  const ruleTypeList = ref(); //多选
  const ruleTypeValue = ref(); //禁用，显示单选
  const ruleTypePage = ref();
  const initData = () => {
    if (route.name === 'payBackRule') {
      ruleTypeList.value = [ruleType.收款单规则];
      ruleTypeValue.value = ruleType.收款单规则;
      ruleTypePage.value = '收款单';
    } else if (route.name === 'incomeRule') {
      ruleTypeList.value = [ruleType.结算单规则];
      ruleTypeValue.value = ruleType.结算单规则;
      ruleTypePage.value = '结算单';
    } else {
      ruleTypeList.value = [ruleType.平台入库明细];
      ruleTypePage.value = '单据推送';
    }
  };
  initData();
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
    FinanceSystemApi.FinanceIncomeRuleQueryList.RequestBody,
    FinanceSystemApi.FinanceIncomeRuleQueryList.ResponseBody
  >({
    searchDefaults: {
      settlementOrganizationList: undefined,
      shopList: undefined,
      platform: undefined,
      country: undefined,
      ruleTypeList: ruleTypeList.value,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeIncomeRuleQueryList,
  });

  const batchSearchRef = ref();
  const shopList = ref();
  // 店铺
  const handleBlur = (e) => {
    if (shopList.value) {
      search.shopList = shopList.value;
      batchSearchRef.value?.clear();
    } else {
      shopList.value = [];
      search.shopList = [];
    }
  };
  const handleBatchSearch = (val) => {
    search.shopList = val
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((res) => res);
    shopList.value = [];
  };
  const handleBatchClear = () => {
    search.shopList = [];
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    let isConfirmed = false;
    switch (key) {
      case 'view':
        // 查看详情
        if (ruleTypePage.value === '收款单') {
          router.push({
            name: 'payBackRuleDetail',
            query: { ruleCode: row.ruleCode, type: row.type },
          });
        } else if (ruleTypePage.value === '结算单') {
          router.push({
            name: 'incomeRuleDetail',
            query: { ruleCode: row.ruleCode, type: row.type },
          });
        } else {
          router.push({
            name: 'financeBillsRuleDetail',
            query: { ruleCode: row.ruleCode, type: row.type },
          });
        }
        break;
      case 'edit':
        // 编辑
        if (ruleTypePage.value === '收款单') {
          router.push({ name: 'payBackRuleEdit', query: { ruleCode: row.ruleCode } });
        } else if (ruleTypePage.value === '结算单') {
          router.push({ name: 'incomeRuleEdit', query: { ruleCode: row.ruleCode } });
        } else {
          router.push({ name: 'financeBillsRuleEdit', query: { ruleCode: row.ruleCode } });
        }
        break;
      case 'copy':
        // 复制
        isConfirmed = await swal.confirm('确认复制吗？');
        if (!isConfirmed) break;
        await financeSystemApi.financeIncomeRuleCopy({ ruleCode: row.ruleCode });
        ElMessage.success('复制成功');
        refreshList();
        break;
      case 'enable':
        // 启用
        isConfirmed = await swal.confirm('确认启用吗？');
        if (!isConfirmed) break;
        let param = {
          ruleCode: row.ruleCode,
          shop: row?.ruleShopBean?.shop || row?.shop,
          ruleType: row.type,
        };
        let check = await financeSystemApi.financeIncomeRuleEnableCheck(param);
        if (check?.result) {
          isConfirmed = await swal.confirm(
            '检测到一个店铺的同一数据，正在启用多个规则，是否继续？'
          );
          if (!isConfirmed) break;
        }
        await financeSystemApi.financeIncomeRuleChangeStatus({ ruleCode: row.ruleCode, status: 1 });
        ElMessage.success('启用成功');
        refreshList();
        break;
      case 'disable':
        // 停用
        isConfirmed = await swal.confirm('确认停用吗？');
        if (!isConfirmed) break;
        await financeSystemApi.financeIncomeRuleChangeStatus({ ruleCode: row.ruleCode, status: 0 });
        ElMessage.success('停用成功');
        refreshList();
        break;
      default:
        break;
    }
  };

  // 新增
  const add = () => {
    if (ruleTypePage.value === '收款单') {
      router.push({ name: 'payBackRuleAdd' });
    } else if (ruleTypePage.value === '结算单') {
      router.push({ name: 'incomeRuleAdd' });
    } else {
      router.push({ name: 'financeBillsRuleAdd' });
    }
  };

  const checkDialogRef = ref(null);
</script>

<style scoped lang="scss">
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
