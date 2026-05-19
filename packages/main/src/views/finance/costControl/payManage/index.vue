<template>
  <el-tabs v-model="search.status" tab-position="top" @tab-change="tableRef?.clearSelection()">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span
          class="tab-count"
          v-if="(listData?.statisticsInfo || []).find((x) => +x.status === item.status)?.count"
        >
          ({{ (listData?.statisticsInfo || []).find((x) => +x.status === item.status)?.count }})
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #filters>
      <el-input v-model="search.code" style="width: 150px" placeholder="付款单号" clearable />
      <el-input
        v-model="search.approvalCode"
        style="width: 150px"
        placeholder="OA审批编号"
        clearable
      />

      <el-select
        v-model="search.paymentOrg"
        :options="settlementOrganizationList"
        :props="{
            label: 'name',
            value: 'code',
        }"
        placeholder="付款组织"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
      />
      <el-select v-model="search.isCbs" placeholder="CBS付款" clearable style="width: 100px">
        <el-option
          v-for="item in CBSPayments"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>

      <div class="select-group">
        <el-select
          v-model="search.dateType"
          placeholder="时间范围类型"
          clearable
          style="width: 130px"
          class="select-group-type"
        >
          <el-option
            v-for="item in dateTypes"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <el-date-picker
          v-model="search.dateRange"
          type="daterange"
          range-separator="至"
          class="select-group-value"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          clearable
          style="width: 240px"
        />
      </div>
      <div class="select-group">
        <el-select
          v-model="search.searchType"
          placeholder="搜索类型"
          clearable
          style="width: 130px"
          class="select-group-type"
        >
          <el-option
            v-for="item in searchTypes"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <el-input
          v-model="search.keyWord"
          style="width: 180px"
          class="select-group-value"
          placeholder="搜索内容"
          clearable
        />
      </div>
      <el-select
        v-model="search.pushStatus"
        placeholder="推送金蝶状态"
        clearable
        style="width: 130px"
      >
        <el-option
          v-for="item in pushKingdeeStatuses"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        v-if="search.status === payOrderStatusEnum.付款中"
        @click="onBatchPush"
      >
        推送金蝶
      </el-button>
      <el-button
        type="primary"
        v-if="search.status === payOrderStatusEnum.付款中"
        @click="onImport"
      >
        导入
      </el-button>
      <el-button
        type="primary"
        v-if="search.status === payOrderStatusEnum.付款中"
        @click="onUpload(null)"
      >
        上传截图
      </el-button>
      <el-button
        type="danger"
        v-if="search.status === payOrderStatusEnum.付款中"
        @click="onBatchDelete"
      >
        作废
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection fixed="left" />
      <el-table-column label="付款单号" prop="code" width="160" fixed="left" />
      <el-table-column label="OA审批编号" prop="approvalCode" width="150" />
      <el-table-column label="OA审批单状态" prop="approvalStatusDesc" />
      <el-table-column label="付款状态" prop="status">
        <template #default="{ row }">
          <el-tag v-if="row.status === payOrderStatusEnum.付款中" type="warning">付款中</el-tag>
          <el-tag v-else-if="row.status === payOrderStatusEnum.已付款" type="success">
            已付款
          </el-tag>
          <el-tag v-else-if="row.status === payOrderStatusEnum.已作废" type="danger">已作废</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="付款组织" prop="paymentOrgName" width="200" />
      <el-table-column label="是否CBS付款" prop="isCbsDesc" width="110" />
      <el-table-column label="完成审批日期" prop="approvalDate" width="110" />
      <el-table-column label="完成付款日期" prop="paymentDate" width="110" />
      <el-table-column label="银行流水单号" prop="paymentSlipCode" width="210" />
      <el-table-column label="付款水单截图" prop="paymentSlipUrl" width="120">
        <template #default="{ row }">
          <template v-if="row.status === payOrderStatusEnum.付款中">
            <template v-if="row?.imgUrls?.length">
              <el-image :src="row.imgUrls?.[0]" @click="onUpload(row)" class="row-img" />
            </template>
            <template v-else>
              <el-button type="primary" text @click="onUpload(row)">上传</el-button>
            </template>
          </template>
          <template v-else-if="row?.imgUrls?.length">
            <el-image
              :src="row.imgUrls[0]"
              class="row-img"
              :preview-teleported="true"
              :preview-src-list="row.imgUrls"
            />
          </template>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column label="付款币种" prop="paymentCurrency" />
      <el-table-column label="付款金额" prop="paymentAmount" align="right">
        <template #default="{ row }">
          {{ [row.paymentAmount, row.paymentCurrency].filter((x) => x).join(' ') }}
        </template>
      </el-table-column>
      <el-table-column label="收款账户名称" prop="payeeAccountName" width="150" />
      <el-table-column label="申请人" prop="proposer" width="150" />
      <el-table-column label="推送金蝶状态" prop="isPushDesc" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.isPush === pushKingdeeStatuseEnum.未推送" type="warning">未推送</el-tag>
          <el-tag v-else-if="row.isPush === pushKingdeeStatuseEnum.推送成功" type="success">
            推送成功
          </el-tag>
          <el-tooltip
            v-else-if="row.isPush === pushKingdeeStatuseEnum.推送失败"
            :content="row?.kingdeePushInfo?.failReason || '推送失败'"
          >
            <el-tag type="danger">推送失败</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="单据更新日期" prop="updateTime" width="150" />
      <el-table-column label="操作" fixed="right" width="160">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                row,
                hide: false,
                permissionCode: '',
              },
              {
                label: '推送金蝶',
                key: 'push',
                type: 'primary',
                row,
                hide: !(row.status === payOrderStatusEnum.付款中),
                permissionCode: '',
              },
              {
                label: '作废',
                key: 'delete',
                type: 'danger',
                row,
                hide: !(row.status === payOrderStatusEnum.付款中),
                permissionCode: '',
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
  <Detail ref="detailRef" />
  <Import ref="importRef" @success="refreshList()" />
  <Upload ref="uploadRef" @success="refreshList()" />
</template>

<script setup lang="ts" name="expenseControlPayManage">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, financeApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import useTask from '@/store/modules/task';
  import * as swal from '@/utils/swal';
  import dayjs from 'dayjs';
  import {
    CBSPayments,
    dateTypes,
    payOrderPushBillType,
    payOrderStatusEnum,
    pushKingdeeStatuseEnum,
    pushKingdeeStatuses,
    searchTypes,
  } from './enums';
  import Detail from './detail.vue';
  import Import from './import.vue';
  import Upload from './upload.vue';

  const store = useTask();

  const statusColorMap = {};

  const tabStatusList = [
    { status: payOrderStatusEnum.付款中, statusName: '付款中' },
    { status: payOrderStatusEnum.已付款, statusName: '已付款' },
    { status: payOrderStatusEnum.已作废, statusName: '已作废' },
  ];

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
    runQuery,
    resetSearch,
    tableRef,
    selectedKeys: codeList,
    handleSelectionChange,
  } = useList<
    FinanceSystemApi.FinanceExpensePaymentExport.RequestQuery,
    FinanceSystemApi.FinanceExpensePaymentExport.ResponseBody
  >({
    keywordImediateSearch: true,
    searchDefaults: {
      status: payOrderStatusEnum.付款中,
      code: undefined,
      approvalCode: undefined,
      paymentOrg: undefined,
      isCbs: undefined,
      dateType: 2,
      dateRange: [dayjs().subtract(30, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      searchType: undefined,
      keyWord: undefined,
      pushStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    service: async (params) => {
      const res = await financeSystemApi.financeExpensePaymentList(params);
      (res.recordList || [])?.forEach?.((x) => {
        x.imgUrls = x.paymentSlipUrl?.split?.(',').filter((x) => x);
      });
      return res;
    },
    interceptSearchData(data) {
      const params = { ...data };
      const dataRange = params.dateRange;

      if (dataRange && dataRange.length === 2) {
        params.startTime = dataRange[0];
        params.endTime = dataRange[1];
      }
      params.dateRange = undefined;
      return params;
    },
  });

  const settlementOrganizationList = ref([]);
  financeApi
    .luteosFinanceSettlementOrganizationList({
      pageSize: 100,
      pageNum: 1,
    })
    .then((res) => {
      settlementOrganizationList.value = res.list;
    });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      handleDetail(row, listData.value.recordList || []);
    } else if (key === 'push') {
      onPush([row]);
    } else if (key === 'delete') {
      onDelete([row]);
    }
  };

  const onPush = async (rows) => {
    let codes = rows.map((x) => x.code).filter((x) => x);
    codes = [...new Set(codes)];

    if (codes.length === 0) {
      ElMessage.warning('请选择要推送的付款单');
      return;
    }

    const isConfirmed = await swal.confirm(
      `已通过审批的OA审批单才可继续付款，确认更新OA审批单状态并完成推送金蝶吗?`
    );
    if (!isConfirmed) {
      return;
    }

    const params = codes.map((x) => {
      return {
        billNo: x,
        billTypes: [payOrderPushBillType.付款单],
        systemCode: 'kingdee',
      };
    });

    financeSystemApi
      .financeBasicBatchSyncThirdSystemBill(params)
      .catch(() => {
        ElMessage.error('推送失败');
      })
      .finally(() => {
        refreshList();
      });

    // financeSystemApi
    //   .financeExpensePaymentBatchPush({
    //     billType: payOrderPushBillType.付款单,
    //     codeList: rows.map((x) => x.code),
    //   })
    //   .then((res) => {
    //     if (Array.isArray(res)) {
    //       const errorItem = res.find((x) => x && !x.success);
    //       if (errorItem) {
    //         ElMessage.error(errorItem.errorMsg || '推送失败');
    //         refreshList();
    //         return;
    //       }
    //     }
    //     ElMessage.success('推送成功');
    //     refreshList();
    //   })
    //   .catch(() => {
    //     ElMessage.error('推送失败');
    //   });
  };
  const onBatchPush = () => {
    // console.log('tableRef.value=', tableRef.value);
    const checkedRows = tableRef.value.getSelectionRows();
    // console.log('checkedRows=', checkedRows);
    onPush(checkedRows);
  };
  const onDelete = async (rows) => {
    const codes = rows.map((x) => x.code).filter((x) => x);
    if (codes.length === 0) {
      ElMessage.warning('请选择要作废的付款单');
      return;
    }
    const isConfirmed = await swal.confirm(
      `无需继续付款的单据可以进行作废，确认作废当前所选付款单吗？`
    );
    if (!isConfirmed) {
      return;
    }
    financeSystemApi
      .financeExpensePaymentObsolete({
        codeList: rows.map((x) => x.code),
      })
      .then((res) => {
        ElMessage.success('作废成功');
        refreshList();
      })
      .catch((err) => {
        ElMessage.error('作废失败');
      });
  };
  const onBatchDelete = () => {
    const checkedRows = tableRef.value.getSelectionRows();
    onDelete(checkedRows);
  };

  const detailRef = ref();
  const handleDetail = (row, list) => {
    detailRef.value.open(row, list);
  };

  const importRef = ref();
  const onImport = () => {
    importRef.value.open();
  };

  const uploadRef = ref();
  const onUpload = (row) => {
    let rows = [];
    let initImages = [];
    if (row) {
      rows = [row];
      const keys = row.ossKey?.split?.(',') || [];
      const urls = row.paymentSlipUrl?.split?.(',') || [];
      initImages = urls.map((url, index) => {
        return {
          url,
          ossKey: keys[index],
        };
      });
    } else {
      const checkedRows = tableRef.value.getSelectionRows();
      if (!checkedRows.length) {
        ElMessage.warning('请选择要上传截图的付款单');
        return;
      }
      rows = checkedRows;
    }
    uploadRef.value.open(rows, initImages);
  };
</script>

<style scoped lang="scss">
  .select-group {
    display: inline-flex;
    align-items: center;

    .select-group-type {
      width: 74px;
      border-radius: 6px 0px 0px 6px;
      background: #fff;

      :deep(.el-select__wrapper) {
        border-radius: 6px 0px 0px 6px;
        background: #fff;
      }
    }

    :deep(.select-group-value) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      .el-input__wrapper {
        border-radius: 0 6px 6px 0;
      }

      .el-select__wrapper {
        border-radius: 0 6px 6px 0;
      }
    }
  }

  .row-img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid #efefef;
    cursor: pointer;
  }
</style>
