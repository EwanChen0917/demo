<template>
  <el-form :model="form" ref="formRef" label-width="150px">
    <KeenCard title="客户信用详情" position="start">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <div style="padding-left: 75px">
            {{ form.customerName }}（客户编码：{{ form.customerCode }}）
          </div>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="客户基础信息">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="所属销售：">
            {{ form.developer || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="客户等级：">
            {{ form.levelDesc || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="信用信息">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="总额度：">
            {{ addNumberCommas(String(form.totalLimit)) }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="锁定额度：">
            {{ addNumberCommas(String(form.lockedLimit)) }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="已用额度：">
            {{ addNumberCommas(String(form.usedLimit)) }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="可用额度：">
            {{ addNumberCommas(String(form.availableLimit)) }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="额度调整历史信息">
      <el-tabs v-model="search.adjustType" tab-position="top" @tab-change="handleTabChange">
        <el-tab-pane
          v-for="item in tabStatusList"
          :key="item.code"
          :label="item.statusName"
          :name="item.code"
        >
          <template #label>
            {{ item.statusName }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-table :data="listData?.records" row-key="id" v-loading="listLoading" class="mt-4">
        <el-table-column prop="createTime" label="时间" min-width="120px" />
        <el-table-column prop="adjustTypeDesc" label="调整大类" />
        <el-table-column prop="operationDesc" label="调整场景" />
        <el-table-column prop="referenceNo" label="关联单据号" />
        <el-table-column prop="adjustAmount" label="调整金额">
          <template #default="{ row }">
            {{ addNumberCommas(String(row.adjustAmount)) }}
          </template>
        </el-table-column>
        <el-table-column prop="availableLimitAfter" label="可用余额">
          <template #default="{ row }">
            {{ addNumberCommas(String(row.availableLimitAfter)) }}
          </template>
        </el-table-column>
        <el-table-column prop="currencyCode" label="币种" />
        <el-table-column prop="creator" label="操作人" />
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="creditLimitDetail">
  import { FormInstance } from 'element-plus';
  import { type ErpApi, erpApi } from '@/api';
  import { addNumberCommas } from '@/views/budget/budgetTable/util/util';
  import useList from '@/hooks/list/useList';
  const tabStatusList = [
    { code: '', statusName: '全部' },
    { code: 'increase', statusName: '增加' },
    { code: 'decrease', statusName: '扣减' },
  ];
  const route = useRoute();
  const formRef = ref<FormInstance>();
  const form = ref({
    customerCode: '',
    customerName: '',
    lockedLimit: '',
    usedLimit: '',
    availableLimit: '',
    totalLimit: '',
    levelDesc: '',
    contacts: '',
  });
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
    { customerCode?: string; pageNum: number; pageSize: number },
    ErpApi.LuteosErpCustomerCreditLimitQueryOperationPageLog.ResponseBody
  >({
    searchDefaults: {
      adjustType: '',
      customerCode: route.query.customerCode,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpCustomerCreditLimitQueryOperationPageLog,
  });

  const handleTabChange = (val) => {
    search.adjustType = val;
  };

  const getDetailData = async () => {
    form.value.customerCode = route.query.customerCode as string;
    form.value.customerName = route.query.customerName as string;
    if (route.query.customerCode) {
      const res: any = await erpApi.luteosErpCustomerCreditLimitQueryCustomerCreditLimit([
        form.value.customerCode,
      ]);
      form.value.totalLimit = res[0].totalLimit;
      form.value.lockedLimit = res[0].lockedLimit;
      form.value.usedLimit = res[0].usedLimit;
      form.value.availableLimit = res[0].availableLimit;
    }
  };
  const getDetailData2 = async () => {
    if (route.query.customerCode) {
      const res: any = await erpApi.luteosErpBaseB2BClientQueryDetail({
        code: route.query.customerCode as string,
      });
      form.value.levelDesc = res.levelDesc;
      form.value.developer = res.developer;
    }
  };
  getDetailData();
  getDetailData2();
</script>

<style scoped lang="scss"></style>
