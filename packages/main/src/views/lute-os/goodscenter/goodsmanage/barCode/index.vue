<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.barCode" placeholder="产品69码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        style="width: 220px"
        v-model="search.keyword"
        placeholder="产品名称/产品SKU/产品SPU"
        clearable
      />
      <DeptMember v-model="search.handler" placeholder="创建人/更新人" />
    </template>
    <template #buttons>
      <el-button type="primary" @click="addDialogRef?.open('add')">新增产品69码</el-button>
      <el-button
        v-permission="'barCodeImport'"
        class="button"
        type="primary"
        @click="batchUpdateVisible = true"
      >
        导入
      </el-button>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <ExportBtn :ignore-app-code="true" :service="productApi.luteosProductBarcodeExport" :params="search">导出</ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品69码" min-width="100">
        <template #default="{ row }">
          <span>{{ row?.barCode }}</span>
          <Copy :content="row?.barCode" />
        </template>
      </el-table-column>
      <el-table-column label="产品SKU信息" min-width="150">
        <template #default="{ row }">
          <GoodsInfo
            hide-image
            :title="row?.skuName"
            :subtitle="row?.skuCode"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="产品SPU信息" min-width="150">
        <template #default="{ row }">
          <GoodsInfo
            hide-image
            :title="row?.spuName"
            :subtitle="row?.spuCode"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="创建信息" min-width="100">
        <template #default="{ row }">
          <div>{{ row?.creatorName }}</div>
          <div class="text-gray-500 fs-7">{{ row?.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新信息" min-width="100">
        <template #default="{ row }">
          <div>{{ row?.updatorName }}</div>
          <div class="text-gray-500 fs-7">{{ row?.updateTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="statusMap[row?.status]">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.remark" :line="2" />
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
                label: '作废',
                key: 'cancel',
                hide: row?.status === 1,
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
  <AddDialog ref="addDialogRef" @save="refreshList" />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="product_barcode_import"
    title="导入(产品69码)"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="barCode">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { ProductApi, productApi } from '@/api';
  import AddDialog from '@/views/lute-os/goodscenter/goodsmanage/barCode/components/addDialog.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import BatchUpdateModal from '@/views/lute-os/goodscenter/components/BatchUpdateModal.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const statusMap = {
    0: 'green',
    1: 'red',
  };

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
    ProductApi.LuteosProductBarcodeQueryList.RequestQuery,
    ProductApi.LuteosProductBarcodeQueryList.ResponseBody
  >({
    searchDefaults: {
      barCode: undefined,
      keyword: undefined,
      handler: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductBarcodeQueryList,
  });

  const addDialogRef = ref();

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      addDialogRef.value?.open('edit', row);
    } else if (key === 'cancel') {
      const isConfirm = await swal.confirm(`是否确认作废条形码${row?.barCode}？`);
      if (!isConfirm) return;
      await productApi.luteosProductBarcodeCancel({ id: row?.id });
      ElMessage.success('作废成功');
      refreshList();
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

<style scoped lang="scss"></style>
