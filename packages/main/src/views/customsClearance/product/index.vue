<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model.trim="search.keyword" placeholder="产品SKU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="importDialogRef?.open()"
        v-permission="'customsClearanceProductImport'"
      >
        导入
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="handleExport"
        :loading="exportLoading"
        v-permission="'customsClearanceProductExport'"
      >
        导出
      </el-button>
      <el-button
        type="primary"
        @click="editRef?.open()"
        v-permission="'customsClearanceProductImport'"
      >
        新增
      </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="listData?.resultList"
      ref="xTable"
      max-height="65vh"
      row-key="id"
    >
      <el-table-column label="产品SKU" prop="productSku" min-width="140px" fixed="left" />
      <el-table-column label="产品名称" prop="productName" min-width="130px" fixed="left">
        <template #default="{ row }">
          <OverflowTooltip :content="row.productName" :line="2" />
        </template>
      </el-table-column>
      <el-table-column label="成交单位" prop="transactionUnit" min-width="100px" />
      <el-table-column label="申报价值" prop="declaredValue" min-width="100px" />
      <el-table-column label="产品毛重" prop="grossWeight" min-width="100px" />
      <el-table-column label="海关品名" prop="declarationName" min-width="130px" />
      <el-table-column label="海关编码" prop="declarationCode" min-width="130px" />
      <el-table-column label="申报要素" prop="declarationElement" min-width="130px" />
      <el-table-column label="备案币种" prop="recordCurrency" min-width="100px" />
      <el-table-column label="境内资源地" prop="domesticSource" min-width="100px" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="创建时间" prop="createTime" min-width="130px" />
      <el-table-column label="修改人" prop="updatorName" />
      <el-table-column label="修改时间" prop="updateTime" min-width="130px" />
      <el-table-column label="监管方式" prop="supervisionMethod" min-width="130px">
        <template #default="{ row }">
          <span v-if="row.supervisionMethod === 'GENERAL_TRADE'">一般贸易</span>
          <span v-if="row.supervisionMethod === 'OTHER_IMPORT_EXPORT'">其他进出口</span>
        </template>
      </el-table-column>
      <el-table-column label="是否商检" prop="isNeedInspection" min-width="100px">
        <template #default="{ row }">
          <Tag :color="row.isNeedInspection ? 'green' : 'yellow'">
            {{ row.isNeedInspection ? '是' : '否' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="supplier" min-width="130px" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="操作" min-width="130px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'error',
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
  <!-- 导入 -->
  <ImportDialog ref="importDialogRef" @success="refreshListData" />
  <!-- 新增 -->
  <Edit ref="editRef" @success="refreshList" />
</template>

<script setup lang="ts" name="customsClearanceProduct">
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { type ErpApi, erpApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { useRequest } from 'vue-request';
  import { ElMessage } from 'element-plus';
  import ImportDialog from './components/importDialog.vue';
  import Edit from './components/edit.vue';

  const router = useRouter();
  const importDialogRef = ref();
  const editRef = ref();
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
    refreshList,
    resetSearch,
  } = useList<
    ErpApi.LuteosErpCustomsQueryProductList.RequestQuery,
    ErpApi.LuteosErpCustomsQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: 10,
    service: erpApi.luteosErpCustomsQueryProductList,
  });
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    exportRun({
      ...search,
      pageNum: current.value,
      pageSize: pageSize.value,
    });
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    // 导出没接口文档
    erpApi.luteosErpCustomsExportProductList,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            app_code: d?.appCode,
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
  // 解决导入数据列表更新慢的问题
  const refreshListData = () => {
    setTimeout(() => {
      refreshList();
    }, 1000);
  };
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editRef.value?.open(row);
    } else if (key === 'delete') {
      const isConfirmed = await swal.confirm('确定要删除该产品吗？');
      if (!isConfirmed) return;
      try {
        await erpApi.luteosErpCustomsDeleteProduct({ id: row.id });
        ElMessage.success('删除成功');
        refreshList();
      } catch (error) {}
    }
  };
</script>

<style lang="scss" scoped>
  .import-btn {
    background: #3e97ff !important;
  }
</style>
