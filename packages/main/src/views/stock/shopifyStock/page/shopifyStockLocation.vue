<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetAll"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select
        placeholder="库存地点"
        v-model="search.country"
        clearable
        :options="shopifyLocationEnumList"
      />
    </template>
    <template #filters>
      <el-select
        placeholder="请选择仓库"
        v-model="warehouseKeywordArray"
        :options="warehouseOptions"
        clearable
        style="width: 300px"
        multiple
        collapse-tags
        collapse-tags-tooltip
        max-collapse-tags="1"
      />
      <el-select
        placeholder="请选择映射状态"
        v-model="search.mappingStatus"
        clearable
        :options="mappingStatusOptions"
      />
      <el-select
        placeholder="请选择状态"
        v-model="search.active"
        clearable
        :options="statusOptions"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="openSync" :disabled="asyncLoading">
        <el-icon v-if="asyncLoading">
          <Loading />
        </el-icon>
        {{ syncButtonText }}
      </el-button>
    </template>
    <el-table v-loading="listLoading" :data="listData?.list">
      <el-table-column prop="name" label="库存地点" />
      <el-table-column prop="locationId" label="库存地点ID" />
      <el-table-column prop="userAccount" label="店铺账号" />
      <el-table-column prop="warehouseName" label="仓库">
        <template #default="{ row }">
          <el-popover trigger="click">
            <div style="padding: 8px 12px">
              <el-table :data="row.relationItemList" :show-header="false" max-height="200" border>
                <el-table-column min-width="220">
                  <template #default="{ row }">
                    <span>{{ row.warehouseName }} / {{ row.warehouseCode }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <template #reference>
              <span
                style="
                  cursor: pointer;
                  color: var(--el-color-primary);
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                "
              >
                {{
                  row.relationItemList?.[0]?.warehouseName ||
                  row.relationItemList?.[0]?.warehouseCode ||
                  '-'
                }}
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </span>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="mappingStatusDesc" label="映射状态" />
      <el-table-column prop="activeDesc" label="状态" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑映射</el-button>
        </template>
      </el-table-column>
    </el-table>
  </KeenList>
  <KeenPagination
    :current="current"
    :page-size="pageSize"
    :page-size-option="pageSizeOption"
    :total="total"
    @size-change="handlePageSizeChange"
    @current-change="handleCurrentChange"
  />
  <EditStockMappingDialog ref="editStockMappingDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="shopifyStockLocation">
  import { ref, computed, watch } from 'vue';
  import { CisApi, cisApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';
  import { useBaseOptions } from '../hooks/useBaseOptions';
  import EditStockMappingDialog from '../components/editStockMappingDialog.vue';

  const { warehouseOptions, mappingStatusOptions, statusOptions } = useBaseOptions();
  const editStockMappingDialogRef = ref<InstanceType<typeof EditStockMappingDialog>>();
  const shopifyLocationEnumList = ref<any[]>([]);

  const warehouseKeywordArray = computed({
    get: () => {
      if (!search.warehouseKeyword) return [];
      return typeof search.warehouseKeyword === 'string'
        ? search.warehouseKeyword.split(',').filter((v) => v)
        : search.warehouseKeyword;
    },
    set: (value) => {
      search.warehouseKeyword =
        Array.isArray(value) && value.length > 0 ? value.join(',') : undefined;
    },
  });
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '更新库存地点',
    confirmButtonText: '更新库存地点',
    confirmText: '确认要更新库存地点吗',
    confirmTitle: '确认',
    successMessage: '更新库存地点成功',
    loadingMessage: '库存地点更新中',
    errorMessage: '库存地点更新失败',
    services: cisApi.cisInventoryShopifyLocationLocationSync,
    onSuccess: () => {
      refreshList();
    },
  });

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
    CisApi.CisInventoryShopifyLocationQueryList.RequestBody & {
      pageSize: number;
      pageNum: number;
    },
    CisApi.CisInventoryShopifyLocationQueryList.ResponseBody
  >({
    searchDefaults: {
      active: undefined,
      country: undefined,
      mappingStatus: undefined,
      warehouseKeyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisInventoryShopifyLocationQueryList,
  });

  /**
   * 重置搜索
   */
  const resetAll = () => {
    resetSearch();
  };

  /**
   * 编辑映射关系
   */
  const handleEdit = (row: any) => {
    if (!editStockMappingDialogRef.value) return;
    if (!row) return;
    editStockMappingDialogRef.value?.open(row, row.userAccount || row.shopAccount || '');
  };

  watch(
    listData,
    (newVal) => {
      if (newVal?.shopifyLocationEnumList) {
        shopifyLocationEnumList.value = newVal.shopifyLocationEnumList.map((e) => {
          return {
            label: e,
            value: e,
          };
        });
      }
    },
    { deep: true }
  );
</script>

<style scoped lang="scss"></style>
