<template>
  <el-tabs v-model="search.channel" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane label="Amazon" name="amazon" />
    <el-tab-pane label="Shopify" name="shopify" />
    <el-tab-pane label="Walmart" name="walmart" />
    <el-tab-pane label="TikTok" name="tikTok" />
    <el-tab-pane label="美客多" name="mercadocbt" />
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="handleReset"
    @reset-search-by-key="handleResetByKey"
  >
    <template #search>
      <el-select
        placeholder="物流方式"
        multiple
        collapse-tags
        collapse-tags-tooltip
        filterable
        clearable
        :teleported="false"
        v-model="selectedLogistics"
      >
        <el-option
          v-for="item in logisticsMap"
          :key="item.transportCode"
          :label="item.transportName"
          :value="item.transportName"
        />
      </el-select>
    </template>
    <template #filters>
      <el-select
        placeholder="请选择状态"
        v-model="search.status"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="启用" :value="0" />
        <el-option label="禁用" :value="1" />
      </el-select>
      <el-select
        placeholder="备货站点"
        multiple
        collapse-tags
        collapse-tags-tooltip
        filterable
        clearable
        :teleported="false"
        v-model="selectedStockSite"
      >
        <el-option
          v-for="item in stockSiteList"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="refreshList">查询</el-button>
      <el-button type="primary" @click="handleAdd">新增时效</el-button>
    </template>
    <el-table style="width: 100%" :data="listData?.stockingTimeList">
      <el-table-column prop="name" label="物流方式" />
      <el-table-column prop="stockSite" label="备货站点" />
      <el-table-column prop="stockTime" label="备货时效" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column prop="statusDesc" label="状态"></el-table-column>
      <el-table-column prop="status" label="操作">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              { label: '编辑', key: 'edit', type: 'primary', text: true, row },
              {
                label: '禁用',
                key: 'disable',
                type: 'danger',
                text: true,
                row,
                hide: row.status === 1,
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
  <stockLeadDialog
    ref="stockLeadDialogRef"
    :channel="search.channel"
    @success="runQuery"
    :id="choosenId"
    @close="choosenId = undefined"
  />
</template>
<script lang="ts" setup name="turnoverDaysStockLead">
  import { erpApi, ErpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import stockLeadDialog from './components/stockLeadDialog.vue';
  import { useTurnOverBase } from './hooks/useTurnOverBase';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  const stockLeadDialogRef = ref();
  const PAGE_SIZE = 10;
  const { stockSiteList, logisticsMap, getLogisticsMap } = useTurnOverBase();

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
    ErpApi.LuteosErpPlanTurnoverQueryStockTimeList.RequestBody,
    ErpApi.LuteosErpPlanTurnoverQueryStockTimeList.ResponseBody
  >({
    searchDefaults: {
      channel: 'amazon',
      name: '',
      stockSite: '',
      status: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanTurnoverQueryStockTimeList,
  });
  const choosenId = ref<number>();
  const handleAdd = () => {
    if (!stockLeadDialogRef.value) return;
    stockLeadDialogRef.value.open();
  };
  const selectedLogistics = computed({
    get() {
      return search.name ? search.name.split(',') : [];
    },
    set(val: string[]) {
      search.name = val.length > 0 ? val.join(',') : '';
    },
  });
  const selectedStockSite = computed({
    get() {
      return search.stockSite ? search.stockSite.split(',') : [];
    },
    set(val: string[]) {
      search.stockSite = val.length > 0 ? val.join(',') : '';
    },
  });
  const handleTabChange = (val: number) => {
    console.log(val);
  };
  const handleReset = () => {
    resetSearch();
  };
  const handleResetByKey = (key: string) => {
    search[key] = undefined;
  };
  const handleActions = (item) => {
    const { key, row } = item;
    switch (true) {
      case key === 'edit':
        choosenId.value = row.id;
        handleAdd();
        break;
      case key === 'disable':
        handleDisable(row);
        break;
    }
  };
  const handleDisable = async (row) => {
    if (!listData.value) return;
    if (!row.id) return;
    const submitData = cloneDeep(row);
    listLoading.value = true;
    submitData.status = 1;
    try {
      await erpApi.luteosErpPlanTurnoverStockingTimeSaveOrUpdate(submitData);
      ElMessage.success('操作成功');
      refreshList();
    } catch (e) {
      console.error('保存失败');
    } finally {
      listLoading.value = false;
    }
  };
  onMounted(() => {
    getLogisticsMap();
  });
  onActivated(() => {
    refreshList();
  });
</script>
<style scoped lang="scss"></style>
