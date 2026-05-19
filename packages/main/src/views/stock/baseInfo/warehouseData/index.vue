<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input placeholder="请输入职能仓名称" v-model="search.keyword" clearable />
    </template>
    <template #filters>
      <el-input
        placeholder="请输入服务商"
        v-model="search.serviceProviderName"
        clearable
        class="w-200px"
        maxlength="50"
      />
      <!-- <el-input placeholder="请选择公司" maxlength="50" v-model="search." clearable /> -->
      <el-select
        placeholder="请选择业务类型"
        :options="businessTypeMap"
        v-model="search.businessType"
        clearable
      />
      <el-select
        placeholder="请选择仓库类型"
        v-model="search.warehouseCategory"
        clearable
        :options="warehouseCategoryMap"
      />
      <CountrySelect
        v-model="search.countryCode"
        placeholder="请选择国家"
        clearable
        class="w-200px"
      />
      <!-- <el-select placeholder="请选择国家" v-model="search.countryCode" /> -->
      <el-select
        placeholder="请选择状态"
        v-model="search.functionStatus"
        :options="functionStatusMap"
        clearable
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleCreate" v-permission="'stockBaseInfoAdd'">
        新建
      </el-button>
      <el-button
        type="primary"
        @click="handleExport"
        :loading="exportLoading"
        v-permission="'stockBaseInfoExport'"
      >
        导出
      </el-button>
    </template>
    <stockTable :data="listData?.relList" :columns="warehouseDataFields" :loading="listLoading">
      <template #warehouseCategory="{ row }">
        <el-tag type="info">
          {{ row.warehouseCategory === 1 ? '实体仓' : '虚拟仓' }}
        </el-tag>
      </template>
      <template #functionStatus="{ row }">
        <el-tag :type="row.functionStatus === 1 ? 'success' : 'danger'">
          {{ row.functionStatus === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>
      <template #channelCodes="{ row }">
        <collapsibleTagList :items="toTagItems(row.channelCodes)" />
      </template>
      <template #actions="{ row }">
        <el-button @click="handleEdit(row)" type="text" v-permission="'stockBaseInfoEdit'">
          编辑
        </el-button>
      </template>
    </stockTable>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <warehouseEditDialog ref="warehouseEditDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="warehouseData">
  import { ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import collapsibleTagList from '@/views/stock/components/collapsibleTagList.vue';
  import { mdsApi, MDSApi } from '@/api';
  import warehouseDataFields from '../fields/warehouseDataFields';
  import stockTable from '../../components/stockTable.vue';
  import warehouseEditDialog from '../components/warehouseEditDialog.vue';
  import {
    businessTypeMap,
    functionStatusMap,
    warehouseCategoryMap,
  } from '../hooks/constantConfig';
  import baseInfoCommon from '../hooks/baseInfoCommon';

  const { getChannelList } = baseInfoCommon();
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
    // runQuery,
  } = useList<
    MDSApi.LuteosMdsWarehouseQuery.RequestQuery,
    MDSApi.LuteosMdsWarehouseQuery.ResponseBody
  >({
    searchDefaults: {
      businessType: '自营仓',
      countryCode: 'CN',
      functionStatus: 1,
      keyword: undefined,
      serviceProviderName: undefined,
      warehouseCategory: 1 as unknown as string,
    },
    pageSize: PAGE_SIZE,
    service: mdsApi.luteosMdsWarehouseQuery,
  });
  const handleCreate = () => {
    warehouseEditDialogRef.value?.open();
  };
  const warehouseEditDialogRef = ref<InstanceType<typeof warehouseEditDialog> | null>(null);
  const exportLoading = ref(false);
  const handleExport = async () => {
    try {
      exportLoading.value = true;
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      const res = await mdsApi.luteosMdsWarehouseExport({
        ...search,
        pageNum: current.value,
        pageSize: pageSize.value,
      });
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;
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
    } finally {
      exportLoading.value = false;
    }
  };
  const handleEdit = (row) => {
    warehouseEditDialogRef.value?.open(row);
  };
  const toTagItems = (channels?: string[]) => {
    return (channels || []).map((channel) => ({
      content: channel,
      type: 'info' as const,
    }));
  };
  onMounted(() => {
    getChannelList();
  });
</script>

<style scoped lang="scss"></style>
