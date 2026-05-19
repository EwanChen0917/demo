<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <span>
        已推送金蝶：
        <span class="text-green text-num">
          {{ listData?.relateSystemStatics?.totalRelateNumKingdee }}
        </span>
      </span>
      <span>
        推送金蝶失败：
        <span class="text-red text-num">
          {{ listData?.relateSystemStatics?.totalFailRelatedNumKingdee }}
        </span>
      </span>
      <span>
        推送中：
        <span class="text-grey text-num">
          {{ listData?.relateSystemStatics?.totalPushingNumKingdee }}
        </span>
      </span>
      <span>
        未推送金蝶：
        <span class="text-grey text-num">
          {{ listData?.relateSystemStatics?.totalNotRelateNumKingdee }}
        </span>
      </span>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-select
          v-model="search.billTypes"
          placeholder="单据类型"
          filterable
          clearable
          multiple
          style="width: 200px"
          :teleported="false"
          :collapse-tags="true"
        >
          <el-option v-for="(value, key) in billTypes" :key="key" :label="key" :value="value" />
        </el-select>

        <el-select
          v-model="search.operationTypes"
          placeholder="调拨类型"
          filterable
          clearable
          multiple
          style="width: 200px"
          :teleported="false"
          :collapse-tags="true"
        >
          <el-option
            v-for="(value, key) in operationTypes"
            :key="key"
            :label="key"
            :value="value"
          />
        </el-select>
        <el-input v-model="search.wmsTfCodeKeyword" placeholder="调拨单号" style="width: 200px" />
        <el-input v-model="search.codeKeyword" placeholder="单据编号" style="width: 200px" />
        <el-input
          v-model="search.kingdeeOrderCode"
          placeholder="金蝶单据编号"
          style="width: 200px"
        />
        <el-select
          v-model="search.transferOutOrgNames"
          :options="organizationList"
          :props="{
            label: 'name',
            value: 'name',
          }"
          placeholder="调出组织"
          multiple
          clearable
          filterable
          :collapse-tags="true"
        />
        <el-select
          v-model="search.transferInOrgNames"
          :options="organizationList"
          :props="{
            label: 'name',
            value: 'name',
          }"
          placeholder="调入组织"
          multiple
          clearable
          filterable
          :collapse-tags="true"
        />

        <DeptMember placeholder="单据创建人" v-model="search.creators" clearable multiple />
        <el-date-picker
          v-model="search.createTimeRange"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="创建开始时间"
          end-placeholder="创建结束时间"
          class="w-250px"
        />

        <el-select
          v-model="search.kingdeePushStatus"
          placeholder="金蝶推送状态"
          filterable
          clearable
          multiple
          style="width: 180px"
          :teleported="false"
          :collapse-tags="true"
        >
          <el-option v-for="(value, key) in pushStatus" :key="key" :label="key" :value="value" />
        </el-select>
      </template>
      <template #buttons>
        <el-button type="primary" :loading="markLoading" @click="handlePushCommand('push')">
          推送金蝶
        </el-button>
        <el-button type="primary" :loading="markLoading" @click="handlePushCommand('markPush')">
          标记推送成功
        </el-button>
        <el-button
          type="primary"
          :loading="cancelMarkLoading"
          @click="handlePushCommand('cancelMarkPush')"
        >
          取消标记推送成功
        </el-button>
        <BatchOperatePophover name="导出" :options="exportActions" />
      </template>
      <template #default>
        <el-table ref="tableRef" v-loading="listLoading" :data="listData?.recordList">
          <el-table-column type="selection" width="55" fixed="left" />
          <el-table-column prop="billTypeDesc" label="单据类型" min-width="120">
            <template #default="{ row }">{{ row.billTypeDesc || '-' }}</template>
          </el-table-column>
          <el-table-column prop="operationTypeDesc" label="调拨类型" min-width="120">
            <template #default="{ row }">{{ row.operationTypeDesc || '-' }}</template>
          </el-table-column>
          <el-table-column prop="wmsTfCode" label="调拨单号" min-width="150">
            <template #default="{ row }">{{ row.wmsTfCode || '-' }}</template>
          </el-table-column>
          <el-table-column prop="code" label="单据编号" min-width="150">
            <template #default="{ row }">{{ row.code || '-' }}</template>
          </el-table-column>
          <el-table-column prop="transferOutOrgName" label="调出组织" min-width="150">
            <template #default="{ row }">{{ row.transferOutOrgName || '-' }}</template>
          </el-table-column>
          <el-table-column prop="transferInOrgName" label="调入组织" min-width="150">
            <template #default="{ row }">{{ row.transferInOrgName || '-' }}</template>
          </el-table-column>
          <el-table-column prop="creatorName" label="单据创建人" min-width="100">
            <template #default="{ row }">{{ row.creatorName || '-' }}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="单据创建时间" min-width="160">
            <template #default="{ row }">{{ row.createTime || '-' }}</template>
          </el-table-column>
          <el-table-column prop="kingdeeOrderCode" label="金蝶单据编号" min-width="150">
            <template #default="{ row }">
              {{ row?.kingdeePushBean?.number || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="金蝶推送状态" min-width="150">
            <template #default="{ row }">
              <div v-if="row.kingdeePushBean">
                <el-tag
                  :type="
                    {
                      [pushStatus.推送成功]: 'success',
                      [pushStatus.推送失败]: 'danger',
                      [pushStatus.推送中]: 'warning',
                      [pushStatus.未推送]: 'info',
                    }[row.kingdeePushBean.pushStatus]
                  "
                >
                  {{ row.kingdeePushBean.pushStatusDesc }}
                </el-tag>
                <div
                  v-if="
                    row.kingdeePushBean.pushStatus === pushStatus.推送失败 &&
                    row.kingdeePushBean.failReason
                  "
                  class="text-error"
                >
                  {{ row.kingdeePushBean.failReason }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120" fixed="right">
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    text: true,
                    row: row,
                  },
                  {
                    label: '推送金蝶',
                    key: 'push',
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
      </template>
    </KeenList>
  </div>
  <FailDialog ref="failDialogRef" />
  <DetailDialog ref="detailDialogRef" />
</template>

<script setup lang="ts" name="wmsTransferBill">
  import useList from '@/hooks/list/useList';
  import { financeApi, financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  import DeptMember from '@/views/goodscenter/goodsmanage/operationStaff/components/DeptMember.vue';
  import FailDialog from '@/views/finance/income/incomeAnalysis/components/failDialog.vue';
  import { openWindow } from '@/utils';
  import { billTypes, markStatus, operationTypes, pushStatus } from './enum';
  import DetailDialog from './detailDialog.vue';

  const PAGE_SIZE = 10;
  const tableRef = ref(null);

  const organizationList = ref([]);
  const queryOrganizationList = async () => {
    const res = await financeApi.luteosFinanceSettlementOrganizationList({
      pageNum: 1,
      pageSize: 100,
    });
    organizationList.value = res?.list || [];
  };

  queryOrganizationList();

  const buildQueryParams = (params) => {
    const [start, end] = params.createTimeRange || [];
    return {
      ...params,
      createTimeRange: undefined,
      createTimeEnd: end || undefined,
      createTimeStart: start || undefined,
    };
  };

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
  } = useList({
    searchDefaults: {
      billTypes: [],
      operationTypes: [],
      orgNames: [],
      codeKeyword: '',
      wmsTfCodeKeyword: '',
      kingdeeOrderCode: '',
      creators: [],
      createTimeRange: [
        dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      ],
      kingdeePushStatus: [],
      transferOutOrgNames: [],
      transferInOrgNames: [],
    },
    pageSize: PAGE_SIZE,
    service: (params) => {
      const newParams = buildQueryParams(params);
      tableRef.value?.clearSelection?.();
      return financeSystemApi.financeOfflineTransferOrderQueryList(newParams);
    },
  });
  const detailDialogRef = ref(null);
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      detailDialogRef.value?.open?.(row);
    } else if (key === 'push') {
      doPush([row]);
    }
  };

  const getCheckedData = () => {
    const checkedList = tableRef.value?.getSelectionRows?.() || [];
    return checkedList;
  };

  const failDialogRef = ref(null);
  const cancelMarkLoading = ref(false);
  const markLoading = ref(false);
  const handlePushCommand = async (command) => {
    switch (command) {
      case 'markPush': {
        markPushStatus('标记推送成功', markStatus.标记);
        break;
      }
      case 'cancelMarkPush': {
        markPushStatus('取消标记推送成功', markStatus.取消标记);
        break;
      }
      case 'push': {
        doPush(getCheckedData());
        break;
      }
      default:
        break;
    }
  };

  const doPush = async (rows) => {
    if (!rows.length) {
      ElMessage.warning('请先勾选数据');
      return;
    }
    const isConfirmed = await swal.confirm('确认推送金蝶吗？');
    if (!isConfirmed) return;
    const param = rows.map((row) => {
      return {
        billTypes: [row.billType],
        billNo: row.code,
        systemCode: 'kingdee',
      };
    });

    const res = await financeSystemApi.financeBasicBatchSyncThirdSystemBill(param).catch(() => {
      runQuery();
    });
    if (res) {
      ElMessage.success('推送成功');
      runQuery();
      tableRef.value?.clearSelection();
    }
  };
  const markPushStatus = async (tip, status) => {
    const dataList = getCheckedData();
    if (!dataList?.length) {
      ElMessage.warning('请先勾选数据');
      return;
    }

    const isConfirmed = await swal.confirm(
      `确认${status === markStatus.标记 ? '标记' : '取消标记'}推送数据吗？`
    );
    if (!isConfirmed) return;

    try {
      if (status == markStatus.标记) {
        markLoading.value = true;
      } else {
        cancelMarkLoading.value = true;
      }
      const res = await financeSystemApi.financeOfflineTransferOrderMarkPushStatus({
        billTypeUniqueBeans: dataList.map((item) => {
          return {
            code: item.code,
            type: item.billType,
          };
        }),
        markPushSuccess: status == markStatus.标记,
      });
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      if (status == markStatus.标记) {
        markLoading.value = false;
      } else {
        cancelMarkLoading.value = false;
      }
    }
  };

  const exportActions = [
    {
      title: '导出所选',
      fn: async () => {
        const dataList = getCheckedData();
        if (!dataList?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        await handlerExport({
          codeList: dataList.map((item) => item.code),
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
    const res = await financeSystemApi.financeOfflineTransferOrderExportDetailList(params);
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
</script>

<style scoped lang="scss">
  .page-top-box {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    .text-num {
      font-weight: 500;
      margin-right: 30px;
    }

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
    }

    .text-grey {
      color: #b6b6b6;
    }

    .text-error {
      color: #ef6868;
    }
  }

  .icon {
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
  }
</style>
