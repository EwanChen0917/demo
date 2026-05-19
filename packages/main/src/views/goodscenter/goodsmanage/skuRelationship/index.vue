<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyWord" placeholder="新/旧产品SKU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 120px"
        v-model="search.state"
        placeholder="产品SKU状态"
        clearable
        :teleported="false"
      >
        <el-option
          v-for="(val, key) in skuStatusMap"
          :key="key"
          :label="val || ''"
          :value="+key!"
        />
      </el-select>
      <ProductLineSelect v-model="search.productLine" placeholder="产品品线" clearable filterable />
      <GtmSelect v-model="search.gtmDeptId" placeholder="GTM组" clearable filterable />
    </template>
    <template #buttons>
      <el-button type="primary" @click="actionRef?.open('add')">新增</el-button>
      <el-button class="button" type="primary" @click="batchUpdateVisible = true">导入</el-button>
      <el-button
        @click="
          handleExport({
            ...search,
          })
        "
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="skuCode"
      class-name="table-row-dashed"
      max-height="68vh"
    >
      <el-table-column label="产品SKU信息" min-width="150">
        <template #default="{ row }">
          <el-button type="text" @click="toSkuDetail(row.skuCode)">
            {{ row?.skuCode }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="新产品SKU信息" min-width="150">
        <template #default="{ row }">
          {{ row?.newSkuCode }}
        </template>
      </el-table-column>
      <el-table-column label="产品中文名称" min-width="150">
        <template #default="{ row }">
          {{ row?.productTitle }}
        </template>
      </el-table-column>
      <el-table-column label="产品SKU状态">
        <template #default="{ row }">
          <Tag :color="skuColorMap[row?.state]">{{ row?.stateDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="产品经理">
        <template #default="{ row }">
          {{ row?.productManageName }}
        </template>
      </el-table-column>
      <el-table-column label="GTM经理">
        <template #default="{ row }">
          {{ row?.gtmManageName }}
        </template>
      </el-table-column>
      <el-table-column label="型号">
        <template #default="{ row }">
          {{ row?.modelName }}
        </template>
      </el-table-column>
      <el-table-column label="产品品线">
        <template #default="{ row }">
          {{ row?.productLineName }}
        </template>
      </el-table-column>
      <el-table-column label="GTM组">
        <template #default="{ row }">
          {{ row?.gtmName }}
        </template>
      </el-table-column>

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
                label: '日志',
                key: 'log',
                type: 'primary',
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
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="product_sku_old_new_import"
    title="导入"
    @close="batchUpdate"
  />
  <Log ref="logRef" />
  <Action ref="actionRef" @success="refreshList" />
</template>

<script setup lang="ts" name="skuRelationship">
import useList from '@/hooks/list/useList';
  import { ProductApi, productApi } from '@/api';
  import BatchUpdateModal from '@/views/goodscenter/components/BatchUpdateModal.vue';
  import useExport from '@/hooks/list/useExport';
  import GtmSelect from '@/views/goodscenter/components/gtmSelect.vue';
  import { skuStatusMap, skuColorMap } from '@/views/goodscenter/goodsmanage/enum';
  import Log from './components/Log.vue';
  import Action from './components/Action.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
  const logRef = ref();
  const actionRef = ref();
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
  } = useList<
    ProductApi.LuteosProductOldNewMappingQueryList.RequestQuery,
    ProductApi.LuteosProductOldNewMappingQueryList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      state: 2,
      productLine: undefined,
      gtmDeptId: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductOldNewMappingQueryList,
  });

  const { handleExport, exportLoading } = useExport(productApi.luteosProductOldNewMappingExport);

  const toSkuDetail = (code) => {
    router.push(`/skulist/detail?code=${code}`);
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      actionRef.value?.open('edit', row);
    } else if (key === 'log') {
      logRef.value?.open(row.skuCode);
    }
  };

  // 导入
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };
</script>

<style scoped></style>
