<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="仓库ID/仓库名称/积加仓库名称/易仓仓库名称"
        clearable
        class="w-350px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="仓库类型" v-model="search.warehouseType" filterable clearable>
        <el-option
          v-for="item in warehouseTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select placeholder="服务商" v-model="search.providerType" filterable clearable>
        <el-option
          v-for="item in providerTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="refreshList()">更新数据</el-button>
      <el-button class="button" type="primary" @click="exportAllBtn" :loading="exportLoading">
        导出
      </el-button>
    </template>
    <!-- <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template> -->

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.warehouseList"
      class-name="table-row-dashed"
      :default-sort="{ prop: 'saleableQuantity', order: 'descending' }"
    >
      <el-table-column label="仓库编码" prop="warehouseCode" min-width="150" fixed />
      <el-table-column label="仓库ID" prop="warehouseId" min-width="150" fixed />
      <el-table-column label="仓库名称" prop="warehouseDesc" min-width="150" fixed>
        <template #default="{ row }">
          <OverflowTooltip :content="row.warehouseDesc" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="仓库类型" prop="warehouseTypeDesc" />
      <el-table-column label="积加仓库ID" prop="jjWarehouseId" min-width="100" />
      <el-table-column label="积加仓库名称" prop="jjWarehouseName" min-width="110">
        <template #default="{ row }">
          <OverflowTooltip :content="row.jjWarehouseName" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="服务商" prop="providerServiceDesc" min-width="100" />
      <el-table-column label="国家/地区" prop="country" min-width="90" />
      <el-table-column label="省份" prop="province" />
      <el-table-column label="成品调拨出库扣减包材" prop="isProductDesc" min-width="200" />
      <el-table-column label="组合产品调拨出库扣减包材" prop="isGroupProductDesc" min-width="220" />
      <el-table-column label="采购方式" prop="purchaseMethodDesc" />
      <el-table-column label="中转仓库" prop="isTransitWarehouseDesc" min-width="150" />
      <el-table-column label="是否中仓" prop="isCenterWarehouseDesc" min-width="150" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row.status === 1 ? 'green' : 'red'">
            {{ row?.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="100" />
      <el-table-column label="更新时间" prop="updateTime" min-width="100" />
      <el-table-column label="易仓仓库名称" prop="ecWarehouseMapping" min-width="150">
        <template #default="{ row }">
          <template v-for="(item, i) of row.mappingList">
            {{ item.ecWarehouseMappingDesc }}{{ i < row.mappingList.length - 1 ? '；' : '' }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '关联易仓',
                key: 'related',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '更新数据',
                key: 'update',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '是否中仓',
                key: 'isCenterWarehouse',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                text: true,
                row: row,
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
  <RelateDialog ref="relatedRef" @success="refreshList" />
  <LogDialog ref="logRef" />
  <CenterWarehouseDialog ref="centerWarehouseRef" @success="refreshList" />
</template>

<script setup lang="ts" name="warehouseInfo">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { useRouter } from 'vue-router';
  import RelateDialog from './components/relateDialog.vue';
  import LogDialog from './components/logDialog.vue';
  import CenterWarehouseDialog from './components/centerWarehouseDialog.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
  // 仓库类型 1-自营仓库 2-供应商仓 3-三方仓 4-平台仓
  const warehouseTypeList = [
    {
      value: 1,
      label: '自营仓库',
    },
    {
      value: 2,
      label: '供应商仓',
    },
    {
      value: 3,
      label: '三方仓',
    },
    {
      value: 4,
      label: '平台仓',
    },
  ];
  const providerTypeList = [
    {
      value: 1,
      label: '谷仓',
    },
    {
      value: 2,
      label: 'amos',
    },
  ];

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
  } = useList<
    ErpApi.LuteosErpWarehouseQueryList.RequestQuery,
    ErpApi.LuteosErpWarehouseQueryList.ResponseBody
  >({
    searchDefaults: {
      warehouseType: undefined,
      keyword: undefined,
      providerType: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpWarehouseQueryList,
  });

  const relatedRef = ref();
  const logRef = ref();
  const centerWarehouseRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'related') {
      relatedRef.value?.open(row.warehouseId, row.mappingList);
    } else if (key === 'log') {
      logRef.value?.open(row.warehouseId);
    } else if (key === 'isCenterWarehouse') {
      centerWarehouseRef.value?.open(row);
    } else {
      refreshList(row.warehouseId);
    }
  };

  const refreshList = (id?) => {
    erpApi
      .luteosErpWarehouseSync({
        warehouseId: id,
      })
      .then((res) => {
        if (id && res.result) {
          const list = listData.value?.warehouseList;
          const index = list?.findIndex((item) => item.warehouseId === id) ?? -1;
          if (list && index > -1) {
            list[index] = res.result;
          }
        } else {
          runQuery();
        }
      });
  };
  const exportLoading = ref(false);
  const exportAllBtn = async () => {
    try {
      const isConfirmed = await swal.confirm('确认导出所有数据吗？');
      if (!isConfirmed) return;
      exportLoading.value = true;
      const res = await erpApi.luteosErpWarehouseExport({
        ...search,
        pageNum: 1,
        pageSize: 100000,
      });
      const isConfirmedExport = await swal.confirm({
        icon: 'success',
        title: '导出成功，具体请前往下载中心查看',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmedExport) return;
      await nextTick();
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    } catch (e) {
      /* empty */
    } finally {
      exportLoading.value = false;
    }
  };
</script>

<style scoped lang="scss"></style>
