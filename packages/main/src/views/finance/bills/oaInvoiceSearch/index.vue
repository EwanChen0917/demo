<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model.trim="search.keyword"
          placeholder="审批编号/数电发票号码/销方识别号/销方名称"
          class="w-350px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <div class="date-picker-prepend" ref="areaCountryContainerRef">
          <el-select v-model="search.queryMemberType" style="width: 130px">
            <el-option :value="0" label="流程申请人" />
            <el-option :value="1" label="更新人" />
          </el-select>
          <el-select
            class="creator-oa-invoice"
            v-model="search.memberCodeList"
            placeholder="请选择"
            filterable
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :options="creatorList"
            :filter-method="getCreatorList"
          >
            <el-option
              v-for="item in creatorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-select
          v-model="search.processCodeList"
          :options="processList"
          clearable
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="流程表单类型"
        >
          <el-option
            v-for="item in processList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>

        <div class="date-picker-prepend" ref="areaCountryContainerRef">
          <el-select v-model="search.queryDateType" style="width: 130px">
            <el-option :value="0" label="流程申请时间" />
            <el-option :value="1" label="开票日期" />
            <el-option :value="2" label="更新时间" />
          </el-select>
          <el-date-picker
            :style="{ width: `${pickerWidth}px` }"
            v-model="search.queryDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            class="b2bdate w-300px"
          />
        </div>
      </template>
      <template #buttons>
        <el-button type="primary" class="import-btn" :loading="updateLoading" @click="updateDate">
          更新
        </el-button>
        <BatchOperatePophover name="导出" :options="exportActions" />
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
      >
        <el-table-column type="selection" width="55" fixed="left" />
        <el-table-column label="审批编号" prop="flowDesc" width="180px" />
        <el-table-column label="流程表单类型" prop="processName" min-width="150px" />
        <el-table-column label="流程申请人" prop="processApplyName" min-width="110px" />
        <el-table-column label="流程申请时间" prop="processApplyTime" min-width="150px" />
        <el-table-column label="发票文件名" prop="fileName" min-width="200px">
          <template #default="{ row }">
            <div class="fs-7">
              <el-link type="primary" @click="toPath(row.fileUrl)">{{ row.fileName }}</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发票文件链接" prop="fileUrl" min-width="200px">
          <template #default="{ row }">
            <div class="fs-7">
              <OverflowTooltip :content="row.fileUrl" :line="1" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数电发票号码" prop="digitalInvoiceNumber" min-width="120px" />
        <el-table-column label="销方识别号" prop="sellerTaxNo" min-width="120px" />
        <el-table-column label="销方名称" prop="sellerName" min-width="120px" />
        <el-table-column label="开票日期" prop="invoiceDate" min-width="100px" />
        <el-table-column label="价税合计" prop="totalAmount" />
        <el-table-column label="更新人" prop="updaterName" />
        <el-table-column label="更新时间" prop="updateTime" min-width="150px" />
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
  </div>
</template>

<script setup lang="ts" name="financeOAInvoiceSearch">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import { openWindow } from '@/utils';
  import dayjs from 'dayjs';

  const PAGE_SIZE = 10;
  const tableRef = ref(null);
  const pickerWidth = ref<number>(186);
  const buildQueryParams = (params) => {
    const [start, end] = params.queryDate || [];
    return {
      ...omit(params, 'queryDate'),
      startTime: start ? `${start} 00:00:00` : undefined,
      endTime: end ? `${end} 23:59:59` : undefined,
    };
  };
  0;
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
    refreshList,
  } = useList({
    searchDefaults: {
      keyword: undefined,
      queryMemberType: 0,
      memberCodeList: undefined,
      processCodeList: undefined,
      pushStatus: undefined,
      queryDateType: 0,
      queryDate: [
        dayjs().subtract(29, 'day').startOf('day').format('YYYY-MM-DD'),
        dayjs().add(0, 'day').endOf('day').format('YYYY-MM-DD'),
      ],
      startTime: undefined,
      endTime: undefined,
    },
    pageSize: PAGE_SIZE,
    service: (params) => {
      const newParams = buildQueryParams(params);
      tableRef.value?.clearSelection?.();
      return financeSystemApi.financeOaInvoiceQueryList(newParams);
    },
  });
  const creatorList: any = ref([]);
  const processList: any = ref([]);
  const getCreatorList = async (keyword) => {
    const res = await financeSystemApi.financeBasicQueryMemberList({
      hasDeleted: 1, //是否删除: 0-未删除 1-包含已删除的员工
      pageNum: 1,
      pageSize: 100,
      keyword: keyword,
    });
    creatorList.value = res.memberList?.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getCreatorList('');
  const getProcessList = async () => {
    const res = await financeSystemApi.financeOaInvoiceQueryProcessList();
    processList.value = res;
  };
  getProcessList();
  const getCheckedData = () => {
    const checkedList = tableRef.value?.getSelectionRows?.() || [];
    return checkedList;
  };

  const exportActions = [
    {
      title: '按所选导出',
      fn: async () => {
        const dataList = getCheckedData();
        if (!dataList?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        await handlerExport({
          idList: dataList.map((item) => item.id),
        });
        tableRef.value?.clearSelection?.();
      },
    },
    {
      title: '按筛选条件导出',
      fn: async () => {
        handlerExport(buildQueryParams(search));
      },
    },
  ];
  const router = useRouter();

  const handlerExport = async (params) => {
    const res = await financeSystemApi.financeOaInvoiceExportList(params);
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
    openWindow(path.href);
  };
  const toPath = (url) => {
    if (url.includes('http')) {
      openWindow(url);
    } else {
      ElMessage.warning('该链接无法跳转');
    }
  };
  const updateLoading = ref();
  const updateDate = async () => {
    const dataList = getCheckedData();
    if (!dataList?.length) {
      ElMessage.warning('请先勾选数据');
      return;
    }
    updateLoading.value = true;
    const res = await financeSystemApi.financeOaInvoiceBatchRecognizeInvoice(
      dataList.map((item) => item.id)
    );
    ElMessage.success('更新成功');
    updateLoading.value = false;
    refreshList();
  };
</script>

<style lang="scss">
  .date-picker-prepend {
    .creator-oa-invoice {
      .el-select__wrapper {
        border-radius: 0 6px 6px 0 !important;
        border-right: 1px solid var(--el-border-color);
      }
    }
  }
</style>
