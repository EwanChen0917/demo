<template>
  <OrderTabs
    v-model="search.supplierStatus"
    :tab-status-list="tabStatusList"
    :count-map="countMap"
    @tab-change="handleTabChange"
  />
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="供应商els账号/供应商名称" clearable />
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleExport" :loading="exportLoading">导出</el-button>
    </template>
    <el-table ref="tableRef" :data="listData?.recordList" v-loading="listLoading">
      <el-table-column label="序号" type="index" width="50px" />
      <el-table-column label="供应商ELS账号" prop="toElsAccount" min-width="130" />
      <el-table-column label="供应商名称" prop="supplierName" min-width="160" />
      <el-table-column label="供应商四字简称" prop="supplierSimpleName" min-width="110" />
      <el-table-column label="供应商ERP编码" prop="supplierCode" min-width="130" />
      <el-table-column label="采购类型" prop="purchaseType_dictText" min-width="100" />
      <el-table-column label="采购负责人" prop="principal" min-width="110" />
      <el-table-column label="绩效评级" prop="performanceLevel_dictText" min-width="100" />
      <el-table-column label="结算方式" prop="fbk2_dictText" min-width="100" />
      <el-table-column label="结算周期" prop="fbk3_dictText" min-width="100" />
      <el-table-column label="付款条件" prop="fbk8_dictText" min-width="100" />
      <el-table-column label="模板编号" prop="templateNumber" min-width="110" />
      <el-table-column label="模板名称" prop="templateName" min-width="140" />
      <el-table-column label="来源类型" prop="sourceType_dictText" min-width="100" />
      <el-table-column label="是否非工商注册" prop="isPerson_dictText" min-width="120" />
      <el-table-column label="接口状态" prop="returnState_dictText" min-width="100" />
      <el-table-column label="授权代理品牌" prop="authorizedBrand" min-width="150" />
      <el-table-column
        label="拼音首字母缩写（倒序）"
        prop="supplierSimpleAbbrPyReverse"
        min-width="150"
      />
      <el-table-column label="拓展信息审批状态" prop="auditStatus_dictText" min-width="130" />
      <el-table-column label="币别" prop="currency_dictText" min-width="80" />
      <el-table-column label="客户指定" prop="client_dictText" min-width="100" />
      <el-table-column label="创建时间" prop="createTime" min-width="150" />
      <el-table-column label="准入品类" prop="accessCategory" min-width="110" />
      <!-- <el-table-column label="冻结功能" prop="frozenFunction" min-width="100" /> -->
      <el-table-column label="供应商账户组" prop="accountGroup_dictText" min-width="120" />
      <el-table-column label="供应商级别" prop="supplierLevel_dictText" min-width="110" />
      <el-table-column label="供应商类型" prop="supplierType" min-width="110" />
      <el-table-column label="供应商状态" prop="supplierStatus_dictText" min-width="110" />
      <el-table-column label="供应商协同方式" prop="needCoordination_dictText" min-width="130" />
      <el-table-column label="SRM注册手机号" prop="personPhone" min-width="120" />
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
<script setup lang="ts" name="supplierMasterList">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: '0', statusName: '未认证供应商', count: '' },
    { status: '1', code: '1', statusName: '潜在供应商', count: '' },
    { status: '2', code: '2', statusName: '合格供应商', count: '' },
    { status: '3', code: '3', statusName: '淘汰供应商', count: '' },
    { status: '4', code: '4', statusName: '黑名单供应商', count: '' },
    { status: '5', code: '5', statusName: '临时供应商', count: '' },
    { status: '6', code: '6', statusName: '量产供应商', count: '' },
  ];

  const router = useRouter();

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
  } = useList<
    ErpApi.LuteosErpSrmSupplierMasterQueryList.RequestBody,
    ErpApi.LuteosErpSrmSupplierMasterQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      supplierStatus: undefined, // 供应商状态 默认全部
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSrmSupplierMasterQueryList,
  });

  const exportLoading = ref(false);
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    try {
      exportLoading.value = true;
      const res = await erpApi.luteosErpSrmSupplierMasterExportList({
        keyword: search.keyword,
        supplierStatus: search.supplierStatus,
      });
      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      router.push(path);
    } catch (error) {
    } finally {
      exportLoading.value = false;
    }
  };
  const handleTabChange = (val) => {
    search.supplierStatus = val;
  };
  const countMap = ref<any>({});
  const getCount = async () => {
    const res = await erpApi.luteosErpSrmSupplierMasterSupplierStatusCount();
    res.forEach((item) => {
      countMap.value[item.value ?? 'all'] = item.total ?? 0;
    });
  };
  onMounted(() => {
    getCount();
  });
</script>
<style scoped lang="scss"></style>
