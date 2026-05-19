<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <div class="select-shop-list">
        <ProductShopSelectFinance
          v-model="sourceList"
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

      <el-select
        v-model="search.targetList"
        :options="organizationList"
        :props="{label: 'name', value: 'name'}"
        multiple
        placeholder="所属组织"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      />
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option :value="1" label="已启用" />
        <el-option :value="0" label="已停用" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="editDialogRef?.open()">新增</el-button>
      <ExportBtn :service="platformApi.platformMappingExportQueryList" :params="search">
        导出
      </ExportBtn>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div v-if="store.taskMap[refreshType.映射关系].apiSync">数据获取并更新中…</div>
          <div v-else>
            <div>获取积加的销售组织映射关系</div>
            <div>上次更新时间：{{ store.taskMap[refreshType.映射关系].lastRefreshTime }}</div>
          </div>
        </template>
        <i
          class="iconfont icon-shujutongbu1"
          :class="{ 'icon-loading': store.taskMap[refreshType.映射关系].apiSync }"
          @click="handleRefresh(refreshType.映射关系)"
        ></i>
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="所属组织" prop="target" />
      <el-table-column label="店铺名称" prop="source" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row?.status]">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" prop="vaildStartTime" />
      <el-table-column label="失效时间" prop="vaildEndTime" />

      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
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
                label: '删除',
                key: 'del',
                type: 'danger',
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
  <EditDialog
    ref="editDialogRef"
    @success="refreshList"
    name="店铺"
    mappingCode="finance_mapping_shop"
    :organizationList="organizationList"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { financeApi, platformApi, PlatformApi, financeSystemApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import EditDialog from '@/views/finance/organizationMap/components/editDialog.vue';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { handleRefresh } from '@/views/budget/base/script/api';

  const user = useStore();
  const store = useTask();
  const statusColorMap = {
    0: 'red',
    1: 'green',
  };

  const editDialogRef = ref();
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
    PlatformApi.PlatformMappingQueryList.RequestBody,
    PlatformApi.PlatformMappingQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      mappingCode: 'finance_mapping_shop',
      status: undefined,
      sourceList: undefined,
      targetList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformMappingQueryList,
  });
  const batchSearchRef = ref();
  const sourceList = ref();
  // 店铺
  const handleBlur = (e) => {
    if (sourceList.value) {
      search.sourceList = sourceList.value;
      batchSearchRef.value?.clear();
    } else {
      sourceList.value = [];
      search.sourceList = [];
    }
  };
  const handleBatchSearch = (val) => {
    search.sourceList = val
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((res) => res);
    sourceList.value = [];
  };
  const handleBatchClear = () => {
    search.sourceList = [];
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    } else if (key === 'del') {
      const isConfirm = await swal.confirm('确认删除吗？');
      if (!isConfirm) return;
      await platformApi.platformMappingDeleted({ ids: [row?.id] });
      ElMessage.success('删除成功');
      refreshList();
    } else if (key === 'enable') {
      const isConfirm = await swal.confirm('确认启用吗？');
      if (!isConfirm) return;
      await platformApi.platformMappingChangeStatus({ id: row?.id, status: 1 });
      ElMessage.success('启用成功');
      refreshList();
    } else if (key === 'disable') {
      const isConfirm = await swal.confirm('确认停用吗？');
      if (!isConfirm) return;
      await platformApi.platformMappingChangeStatus({ id: row?.id, status: 0 });
      ElMessage.success('停用成功');
      refreshList();
    }
  };

  const organizationList = ref([]);
  const queryMap = async () => {
    const res = await financeApi.luteosFinanceSettlementOrganizationList({
      pageNum: 1,
      pageSize: 100,
    });
    organizationList.value = res?.list || [];
  };

  queryMap();

  watch(
    () => store.taskMap[refreshType.映射关系].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.映射关系);
  });

  onBeforeUnmount(() => {
    stopFinanceBudgetRefresh();
  });
</script>

<style scoped lang="scss">
  .icon-shujutongbu1 {
    color: #666666;
    cursor: pointer;
  }
  .icon-loading {
    color: #666666;
    cursor: pointer;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
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
