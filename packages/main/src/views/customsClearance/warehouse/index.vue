<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model.trim="search.contractNo" placeholder="合同协议号" clearable>
        <template #suffix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-input
        v-model.trim="search.shipmentId"
        placeholder="货件号(多个可用逗号分隔)"
        class="ml15"
        clearable
      >
        <template #suffix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="公司主体" v-model="search.declarationEntity" clearable>
        <el-option
          v-for="(item, key) in declarationEntityList"
          :key="item.code"
          :label="item.companyName"
          :value="item.code"
        />
      </el-select>
      <DeptMember v-model="search.creator" placeholder="创建人" filterable clearable />
      <el-date-picker
        v-model="search.createDate"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        start-placeholder="创建开始日期"
        end-placeholder="创建结束日期"
        class="w-310px"
      />
      <el-input
        v-model="search.skuCode"
        placeholder="供应链SKU"
        clearable
        class="w-150px"
        maxlength="100"
      >
        <template #suffix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button type="primary" @click="importDialogRef?.open()">导入</el-button>
      <el-button class="button" type="primary" @click="recordListRef?.open()">
        装箱单发票合同下载记录
      </el-button>
      <BatchOperatePophover
        name="导出"
        :loading="operationExportList"
        :options="batchImportOptions"
        :intercept="batchImportIntercept"
      />
    </template>
    <el-table
      v-loading="listLoading"
      :data="listData?.resultList"
      @selection-change="handleSelectionChange"
      ref="tableRef"
      max-height="65vh"
      row-key="id"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="供应链SKU" prop="productSku" min-width="100px" />
      <el-table-column label="报关单品名" prop="productName" min-width="130px" />
      <el-table-column label="申报数量" prop="declaredQuantity" min-width="80px" />
      <el-table-column label="件数" prop="packageCount" />
      <el-table-column label="合同协议号" prop="contractNo" min-width="110px" />
      <el-table-column label="货件号" prop="shipmentId" min-width="120px" />
      <el-table-column label="目的地" prop="destination" />
      <el-table-column label="物流商" prop="logisticsProvider" />
      <el-table-column label="物流渠道" prop="logisticsChannel" />
      <el-table-column label="创建时间" prop="createTime" min-width="130px" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="下载文件" prop="isDownLoadDesc" />
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '下载',
                key: 'download',
                type: 'primary',
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
    <!-- 装箱单发票合同下载记录 -->
    <recordList ref="recordListRef" @success="refreshListData" />
  </KeenList>
  <!-- 导入 -->
  <ImportDialog
    ref="importDialogRef"
    :declaration-entity-list="declarationEntityList"
    @success="refreshListData"
  />
  <ExportDataDialog ref="exportDataDialogRef" :declaration-entity-list="declarationEntityList" />
</template>

<script setup lang="ts" name="customsClearanceWarehouse">
  import { type ErpApi, erpApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { omit } from 'lodash-es';
  import { useRequest } from 'vue-request';
  import { urlDownload } from '@/utils/download';
  import ImportDialog from './components/importDialog.vue';
  import recordList from './components/recordList.vue';
  import ExportDataDialog from './components/exportDataDialog.vue';

  const router = useRouter();
  const importDialogRef = ref();
  const recordListRef = ref();
  const exportDataDialogRef = ref();
  const operationExportList = ref(false);
  const importType = ref(1); // 1历史2未下载
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
    ErpApi.LuteosErpCustomsQueryCustomsList.RequestQuery,
    ErpApi.LuteosErpCustomsQueryCustomsList.ResponseBody
  >({
    searchDefaults: {
      contractNo: undefined,
      shipmentId: undefined,
      declarationEntity: undefined,
      createDate: undefined,
      creator: undefined,
      skuCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { createDate } = searchData;
      return {
        ...omit(searchData, 'createDate'),
        createDateStart: createDate ? createDate[0] : undefined,
        createDateEnd: createDate ? createDate[1] : undefined,
      };
    },
    pageSize: 10,
    service: erpApi.luteosErpCustomsQueryCustomsList,
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'download') {
      const res = await erpApi.luteosErpCustomsExportSingleCustomsFile({
        contractNo: row.contractNo,
      });
      if (res) {
        urlDownload(res as string);
      } else {
        ElMessage.error(`生成文件异常，无法下载`);
      }
    }
  };
  const rpaCodeList = ref([]);
  const handleSelectionChange = (list) => {
    rpaCodeList.value = list.map((item) => item.id);
    console.log(rpaCodeList.value);
  };
  // 公司主体
  const declarationEntityList = ref();
  const querydeclarationEntityList = async () => {
    const res = await erpApi.luteosErpCustomsQueryDeclarationEntitySelectList();
    declarationEntityList.value = res.selectList || [];
  };
  querydeclarationEntityList();
  const tableRef = ref(null);
  // 批量导出历史数据
  const handleExport = async () => {
    if (rpaCodeList.value.length) {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      const createDate = search.createDate;
      importType.value = 1;
      exportRun({
        ...search,
        createDateStart: createDate ? createDate[0] : undefined,
        createDateEnd: createDate ? createDate[1] : undefined,
        idList: rpaCodeList.value.length ? rpaCodeList.value : undefined,
        type: 1,
      });
    } else {
      ElMessage.error(`请勾选导出的数据`);
    }
  };
  // 批量导出未下载数据
  const handleExportNot = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    const createDate = search.createDate;
    importType.value = 2;
    exportRunNot({
      ...search,
      createDateStart: createDate ? createDate[0] : undefined,
      createDateEnd: createDate ? createDate[1] : undefined,
      idList: rpaCodeList.value.length ? rpaCodeList.value : undefined,
      type: 1,
    });
  };
  // 批量操作前置校验
  const batchImportIntercept = (item) => {
    if (item?.title === '导出历史数据' && rpaCodeList.value.length === 0) {
      ElMessage.warning('请勾选导出的数据');
      return false;
    }
    return true;
  };
  const batchImportOptions = computed(() => {
    return [
      {
        title: '导出历史数据',
        // hide: !checkPermission('orderAddUpload'),
        fn: () => {
          handleExport();
        },
      },
      {
        title: '导出未下载数据',
        // hide: !checkPermission('updateAddressUpload'),
        fn: () => {
          handleExportNot();
        },
      },
      {
        title: '导出装箱数据',
        // hide: !checkPermission('updateAddressUpload'),
        fn: () => {
          exportDataDialogRef.value?.open();
        },
      },
      {
        title: '导出报关清单',
        // hide: !checkPermission('updateAddressUpload'),
        fn: () => {
          handleExportList();
        },
      },
    ];
  });
  // 导出历史数据
  const { run: exportRun } = useRequest(
    //导出没接口文档
    erpApi.luteosErpCustomsExportBatchCustomsFile,
    {
      manual: true,
      async onSuccess(d) {
        tableRef.value?.clearSelection();
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
  // 导出未下载数据
  const { run: exportRunNot } = useRequest(
    //导出没接口文档
    erpApi.luteosErpCustomsExportNewCustomsData,
    {
      manual: true,
      async onSuccess(d) {
        tableRef.value?.clearSelection();
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
  // 导出报关清单数据
  const handleExportList = async () => {
    if (!search.createDate) {
      ElMessage.warning('请选择创建日期');
      return;
    }
    let params = {
      ...search,
      createDateStart: search.createDate ? search.createDate[0] : undefined,
      createDateEnd: search.createDate ? search.createDate[1] : undefined,
    };
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    operationExportList.value = true;
    const res = await erpApi.luteosErpCustomsExportCustomsList(params);
    if (res.downloadUrl) {
      urlDownload(res.downloadUrl as string);
      ElMessage.success(`导出报关清单成功`);
    } else {
      ElMessage.error(`导出报关清单失败`);
    }
    operationExportList.value = false;
  };
  //解决导入数据列表更新慢的问题
  const refreshListData = () => {
    setTimeout(() => {
      refreshList();
    }, 1000);
  };
</script>

<style lang="scss" scoped>
  .import-btn {
    background: #3e97ff !important;
  }

  .ml15 {
    margin-left: 15px;
  }
</style>
