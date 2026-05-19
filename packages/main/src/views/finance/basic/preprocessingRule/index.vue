<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-select
        v-model="search.ruleTypes"
        collapse-tags
        :max-collapse-tags="1"
        placeholder="规则类型"
        multiple
        clearable
      >
        <el-option
          v-for="item in RuleTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        style="width: 200px"
        placeholder="规则识别码/备注"
        v-model="search.keyword"
        clearable
      />
      <PlatformSelect v-model="search.platformList" filterable clearable multiple />
      <div class="select-shop-list">
        <ProductShopSelectFinance
          v-model="search.shopList"
          style="width: 225px"
          placeholder="店铺名称"
          clearable
          filterable
          multiple
        />
        <div class="select-icon-more">
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </div>
      </div>
      <el-select
        :options="userList"
        v-model="search.updater"
        placeholder="更新人"
        clearable
        multiple
        collapse-tags
        :max-collapse-tags="1"
      />
      <el-date-picker
        v-model="search.updateTime"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="width: 250px"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="rowKey"
      class-name="table-row-dashed"
      :tree-props="{
        children: 'detailList',
      }"
    >
      <el-table-column label="单据类型" prop="typeDesc" />
      <el-table-column label="规则识别码" prop="ruleCode">
        <template #default="{ row }">
          {{ row.ruleDetailCode || row.ruleCode }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag v-if="[0, 1].includes(row?.status)" :color="statusColorMap[row?.status]">
            {{ statusMap[row?.status] }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="平台" prop="platform" />
      <el-table-column label="店铺" prop="shop" />
      <el-table-column label="数据类型" prop="fileType">
        <template #default="{ row }">
          {{
            Array.isArray(row.fileType)
              ? row.fileType
                  .map((x) => fileTypeMap[x])
                  .filter((x) => x)
                  .join(', ')
              : fileTypeMap[row.fileType]
          }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="更新人" prop="updateUser" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            v-if="[PreRuleStatus.Enable, PreRuleStatus.Disable].includes(row?.status)"
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'success',
                hide: row?.status === PreRuleStatus.Enable,
                row,
              },
              {
                label: '停用',
                key: 'disable',
                type: 'danger',
                hide: row?.status === PreRuleStatus.Disable,
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
</template>

<script setup lang="ts" name="preprocessingRule">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, FinanceSystemApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import {
    fileTypeMap,
    PreRuleStatus,
    RuleTypes,
  } from '@/views/finance/basic/preprocessingRule/enum';
  import DeptMember from '@/views/supplyChainManage/requisition/components/DeptMember.vue';
  import { ref } from 'vue';
  import dayjs from 'dayjs';
  import PlatformSelect from './components/platformSelect.vue';

  const statusMap = {
    0: '未启用',
    1: '已启用',
  };
  const statusColorMap = {
    0: 'gray',
    1: 'green',
  };

  const router = useRouter();

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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    FinanceSystemApi.FinancePretreatmentRuleQueryList.RequestBody,
    FinanceSystemApi.FinancePretreatmentRuleQueryList.ResponseBody
  >({
    searchDefaults: {
      ruleTypes: [],
      keyword: undefined,
      shopList: undefined,
      platformList: undefined,
      updater: [],
      updateTime: [dayjs().subtract(30, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
    },
    pageSize: 10,
    service: (params) => {
      const newParams = {
        ...params,
        updateTime: undefined,
        startDate: params.updateTime?.[0] || undefined,
        endDate: params.updateTime?.[1] || undefined,
      };

      return financeSystemApi.financePretreatmentRuleQueryList(newParams).then((res) => {
        res.recordList?.forEach?.((item) => {
          item.rowKey = item.ruleCode;
          item.detailList?.forEach?.((detail) => {
            detail.rowKey = detail.ruleDetailCode;
          });

          item.shop = item.detailList?.[0]?.shop;
          item.fileType = item.detailList?.[0]?.fileType;
        });
        return res;
      });
    },
  });
  // 店铺
  const handleBatchSearch = (val) => {
    search.shopList = val
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((x) => x);
  };
  const handleBatchClear = () => {
    search.shopList = [];
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'view':
        router.push({
          name: 'preprocessingRuleDetail',
          query: { ruleCode: row.ruleCode, type: 'detail' },
        });
        break;
      case 'edit':
        router.push({
          name: 'preprocessingRuleEdit',
          query: { ruleCode: row.ruleCode, type: 'edit' },
        });
        break;
      case 'enable': {
        // 启用
        const isConfirmed = await swal.confirm('确认启用吗？');
        if (!isConfirmed) break;
        await financeSystemApi.financePretreatmentRuleChangeStatus({
          ruleCode: row.ruleCode,
          status: PreRuleStatus.Enable,
        });
        ElMessage.success('启用成功');
        refreshList();
        break;
      }
      case 'disable': {
        // 停用
        const isConfirmed = await swal.confirm('确认停用吗？');
        if (!isConfirmed) break;
        await financeSystemApi.financePretreatmentRuleChangeStatus({
          ruleCode: row.ruleCode,
          status: PreRuleStatus.Disable,
        });
        ElMessage.success('停用成功');
        refreshList();
        break;
      }
      default:
        break;
    }
  };

  // 新增
  const add = () => {
    router.push({ name: 'preprocessingRuleAdd', query: { type: 'add' } });
  };

  const userList: any = ref([]);
  const getUserList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    userList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getUserList();
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
