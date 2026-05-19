<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.supplierName" placeholder="服务商名称" clearable class="me-3">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.supplierCode" placeholder="服务商编码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        placeholder="服务商状态"
        v-model="search.lifecycleStatuses"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        style="min-width: 180px"
      >
        <el-option v-for="item in statusList" :key="item" :label="item.label" :value="item.value" />
      </el-select>
      <el-select
        placeholder="服务范围"
        v-model="search.scopeCodes"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        style="min-width: 180px"
      >
        <el-option v-for="item in rangeList" :key="item" :label="item.label" :value="item.value" />
      </el-select>
      <el-select
        placeholder="服务商分类"
        v-model="search.categories"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        style="min-width: 180px"
      >
        <el-option value="partner_coop" label="合作供应商" />
        <el-option value="strategic" label="战略供应商" />
      </el-select>
      <el-date-picker
        v-model="search.createTime"
        class="w-225px"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        value-format="YYYY-MM-DD"
      />
    </template>

    <!-- <template #buttons>
      <el-button class="button" type="primary" @click="addLogistic">新增</el-button>
    </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      row-key="supplierCode"
    >
      <el-table-column label="服务商名称" prop="supplierName" min-width="150" fixed="left" />
      <el-table-column label="服务商简称" prop="shortName" min-width="150" />
      <el-table-column label="服务商编码" prop="supplierCode" min-width="150" />
      <el-table-column label="服务商分类" prop="categoryDesc" min-width="150" />
      <el-table-column label="服务商状态" min-width="120">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.lifecycleStatus]" v-if="row?.lifecycleStatusDesc">
            {{ row?.lifecycleStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="服务范围" prop="scopeDesc">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.scopeDesc" :line="1" />
        </template>
      </el-table-column>
      <el-table-column label="系统对接能力" prop="systemIntegrationAbilityDesc" min-width="150" />
      <el-table-column label="服务商性质" prop="natureDesc" min-width="150" />
      <el-table-column label="法人" prop="legalPerson" />
      <el-table-column label="成立日期" prop="establishedDate" width="110" />
      <el-table-column label="注册资本(万元)" prop="registeredCapitalWan" min-width="150" />
      <el-table-column label="企业规模" prop="enterpriseScaleDesc" />
      <el-table-column label="代表性客户" prop="representativeClients" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.representativeClients" :line="1" />
        </template>
      </el-table-column>
      <el-table-column label="有不良记录" prop="hasBadRecordDesc" min-width="150" />
      <el-table-column label="不良记录说明" prop="badRecordDesc" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.badRecordDesc" :line="1" />
        </template>
      </el-table-column>
      <el-table-column label="公司地址" prop="companyAddress" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.companyAddress" :line="1" />
        </template>
      </el-table-column>
      <el-table-column label="仓库地址" prop="warehouseAddress" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.warehouseAddress" :line="1" />
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="创建时间" prop="createTime" min-width="150" />
      <el-table-column label="操作" min-width="110" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '查看',
                key: 'detail',
                type: 'primary',
                text: true,
                row: row,
              },
              // {
              //   label: '编辑',
              //   key: 'edit',
              //   type: 'primary',
              //   text: true,
              //   row: row,
              // },
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
  <EditLogisticDialog ref="editLogisticRef" :title="logisticDialogTitle" @success="runQuery" />
</template>

<script setup lang="ts" name="logisticsServiceManagement">
  import useList from '@/hooks/list/useList';
  import { tmsApi, TmsApi } from '@/api';
  import * as swal from '@/utils/swal';
  import EditLogisticDialog from './components/editDialog.vue';
  import dayjs from 'dayjs';
  import { omit } from 'lodash-es';

  const PAGE_SIZE = 10;
  const statusList = [
    { value: 'in_development', label: '开发中' },
    { value: 'intro_approval', label: '引入审批中' },
    { value: 'cooperating', label: '合作中' },
    { value: 'cooperation_suspended', label: '暂停合作' },
    { value: 'phased_out', label: '已淘汰' },
  ];
  const statusColorMap = {
    in_development: 'green',
    intro_approval: 'green',
    cooperating: 'green',
    cooperation_suspended: 'purple',
    phased_out: 'red',
  };
  const rangeList = [
    { value: 'air', label: '空运' },
    { value: 'sea', label: '海运' },
    { value: 'express', label: '快递' },
    { value: 'road', label: '陆运' },
    { value: 'fba', label: 'FBA' },
    { value: 'customs_declaration', label: '报关' },
    { value: 'customs_clearance', label: '清关' },
    { value: 'local_delivery', label: '本地派送' },
  ];
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const editLogisticRef = ref();
  const logisticDialogTitle = ref({});

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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    TmsApi.TmsLogisticsSupplierContactDelete.RequestQuery,
    TmsApi.TmsLogisticsSupplierContactDelete.ResponseBody
  >({
    searchDefaults: {
      categories: undefined,
      createTimeEnd: undefined,
      createTimeStart: undefined,
      lifecycleStatuses: undefined,
      scopeCodes: undefined,
      supplierName: undefined,
      supplierCode: undefined,
      createTime: [dayjs().subtract(6, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 最近7天
    },
    interceptSearchData: (searchData) => {
      const { createTime } = searchData;
      return {
        ...omit(searchData, 'createTime'),
        createTimeStart: createTime ? `${createTime[0]} 00:00:00` : undefined,
        createTimeEnd: createTime ? `${createTime[1]} 23:59:59` : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: tmsApi.tmsLogisticsSupplierQueryList,
  });

  // 新增
  const addLogistic = () => {
    logisticDialogTitle.value = {
      name: '新增',
      type: 'add',
    };
    editLogisticRef?.value?.open();
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    logisticDialogTitle.value = {
      name: key === 'detail' ? '详情' : '编辑',
      type: key,
    };
    editLogisticRef?.value?.open(row);
  };
</script>

<style lang="scss" scoped></style>
