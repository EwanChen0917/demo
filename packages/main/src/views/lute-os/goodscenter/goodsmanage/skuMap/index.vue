<template>
  <el-tabs v-model="search.isMapping" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statisticsInfo[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="请输入店铺SKU/仓库SKU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductSiteSelect v-model="search.site" clearable />
      <ProductShopSelect v-model="search.userAccount" clearable :site="search.site" />
      <WarehouseSelect v-model="search.warehouseCode" clearable />
      <el-select placeholder="是否单品" v-model="search.isSingle" clearable>
        <el-option :value="1" label="是" />
        <el-option :value="0" label="否" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="clear">清除映射</el-button>
      <el-button
        v-permission="'skuMapImport'"
        class="button"
        type="primary"
        @click="batchUpdateVisible = true"
      >
        导入
      </el-button>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <ExportBtn :ignore-app-code="true" :service="productApi.luteosProductSkuMappingExportList" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="260">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.imageUrl"
            :title="row.productTitle"
            :subtitle="row.skuCode"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU(MSKU)" prop="sellerSku" min-width="160">
        <template #default="{ row }">
          <span>{{ row?.sellerSku }}</span>
          <Copy :content="row?.sellerSku" />
        </template>
      </el-table-column>
      <el-table-column label="供应链SKU*数量" min-width="160">
        <template #default="{ row }">
          <div v-if="row?.productSku">{{ row?.productSku }} * {{ row?.productSkuQty }}</div>
        </template>
      </el-table-column>
      <el-table-column label="店铺信息" prop="userAccountSiteDesc" min-width="140" />
      <el-table-column label="仓库名称" prop="warehouseName" min-width="140" />
      <el-table-column label="是否单品" prop="isSingleDesc" />
      <el-table-column label="操作时间" min-width="140">
        <template #default="{ row }">
          <div class="fs-7">创建：{{ row?.createTime }}</div>
          <div class="fs-7">更新：{{ row?.updateTime }}</div>
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
  <EditDialog ref="editDialogRef" @save="refreshList()" />
  <Log ref="logRef" />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="product_sku_mapping_import_template"
    title="导入(SKU关系)"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="skumap">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { ProductApi, productApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import EditDialog from '@/views/lute-os/goodscenter/goodsmanage/skuMap/components/editDialog.vue';
  import Log from '@/views/lute-os/goodscenter/goodsmanage/skuMap/components/log.vue';
  import BatchUpdateModal from '@/views/lute-os/goodscenter/components/BatchUpdateModal.vue';

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
    tableRef,
    selectedKeys,
    handleSelectionChange,
  } = useList<
    ProductApi.LuteosProductSkuMappingQueryList.RequestBody,
    ProductApi.LuteosProductSkuMappingQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      site: undefined,
      userAccount: undefined,
      warehouseCode: undefined,
      isSingle: undefined,
      isMapping: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuMappingQueryList,
  });

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 0, code: 'notMapping', statusName: '未映射', count: '' },
    { status: 1, code: 'mapping', statusName: '已映射', count: '' },
  ];

  const editDialogRef = ref();
  const logRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    } else if (key === 'log') {
      logRef.value?.open(row?.operationLogList);
    }
  };

  //   消除映射
  const clear = async () => {
    console.log('selectedKeys', selectedKeys);
    if (selectedKeys.value.length === 0) {
      ElMessage.warning('请选择要清除的映射');
      return;
    }
    const isConfirmed = await swal.confirm('确定要清除映射吗？');
    if (!isConfirmed) return;
    const res = await productApi.luteosProductSkuMappingClear({
      ids: selectedKeys.value,
    });

    ElMessage.success('清除成功');
    refreshList();
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

<style scoped lang="scss"></style>
