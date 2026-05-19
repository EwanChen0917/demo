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
      <template #search>
        <el-input v-model.trim="search.keyword" placeholder="单据编号/申请人/支付对象" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-date-picker
          v-model="search.auditDate"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="审核开始时间"
          end-placeholder="审核结束时间"
          class="w-310px"
        />
        <el-select v-model="search.payStatus" clearable placeholder="单据状态">
          <el-option
            v-for="item in billsStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.pushStatus" clearable placeholder="推送金蝶状态">
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <!-- <template #buttons>
                <el-button class="button" type="primary" @click="runQuery">查询</el-button>
                <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
            </template> -->
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="code"
        class-name="table-row-dashed"
      >
        <el-table-column label="单据类型" prop="sourceTypeDesc" min-width="250" />
        <el-table-column label="单据编号" prop="code" min-width="250" />
        <el-table-column label="来源单号" prop="sourceCode" min-width="220" />
        <el-table-column label="申请支付金额" prop="applyAmount" min-width="110" />
        <el-table-column label="申请人" prop="applyMemberDesc" />
        <el-table-column label="审核时间" prop="auditTime" min-width="110" />
        <el-table-column label="支付对象" prop="payMemberDesc" />
        <el-table-column label="单据状态" prop="payStatusDesc" />
        <el-table-column label="推送金蝶" prop="kingdeePushInfo" width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row.kingdeePushInfo.pushStatus == 2"
                >
                  {{ `推送失败：${row.kingdeePushInfo.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.kingdeePushInfo.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row.kingdeePushInfo.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.kingdeePushInfo.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row.kingdeePushInfo.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row.kingdeePushInfo.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row.kingdeePushInfo.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'detail',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '推送金蝶',
                  key: 'push',
                  type: 'primary',
                  disabled: row.payStatus === 0 || row.payStatus === 1,
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
    <!-- 单据详情 -->
    <detailDailyLife
      v-if="detailVisible && sourceType == 1"
      :visible="detailVisible"
      :code="code"
      @close="detailVisible = false"
    />
    <detailTeamFunds
      v-if="detailVisible && sourceType == 2"
      :visible="detailVisible"
      :code="code"
      @close="detailVisible = false"
    />
    <detailMarketing
      v-if="detailVisible && sourceType == 3"
      :visible="detailVisible"
      :code="code"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="reimbursementBills">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import detailDailyLife from './components/detailDailyLife.vue';
  import detailTeamFunds from './components/detailTeamFunds.vue';
  import detailMarketing from './components/detailMarketing.vue';

  const PAGE_SIZE = 10;
  const billsStatusList = [
    { name: '待付款', code: 0 },
    { name: '已付款', code: 1 },
    { name: '付款中', code: 2 },
    { name: '无需付款', code: 3 },
  ];
  const statusList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const detailVisible = ref(false);
  const sourceType = ref(1);
  const code = ref('');
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
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemApi.FinanceExpenseReportQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      payStatus: undefined,
      pushStatus: undefined,
      fbtPushStatus: undefined,
      auditDate: undefined,
      auditDateBegin: undefined,
      auditDateEnd: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { auditDate } = searchData;
      return {
        ...omit(searchData, 'auditDate'),
        auditDateBegin: auditDate ? auditDate[0] : undefined,
        auditDateEnd: auditDate ? auditDate[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeExpenseReportQueryList,
  });
  const sourceTypeDesc = ref('');
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text =
        row?.kingdeePushInfo?.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const param = {
        billTypes: [31],
        billNo: row.code,
        systemCode: 'kingdee', // 系统编码, kingdee ->金蝶 fbt->分贝通
      };
      const res = await financeSystemApi.financeBasicSyncThirdSystemBill(param).catch(() => {
        runQuery();
      });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      code.value = row.code;
      sourceTypeDesc.value = row.sourceTypeDesc;
      // 内部员工报销	6858d29e6a2b5c02a10730b9
      // 内部员工下午茶及团队经费报销	682acaa4e255e619c3f27419
      // 内部员工报销营销端费用	6858c4c4fed7576608cbf02d
      if (
        row.sourceType == '6858d29e6a2b5c02a10730b9' ||
        row.sourceTypeDesc.includes('日常费用报销') ||
        row.sourceTypeDesc == '内部员工报销'
      ) {
        sourceType.value = 1;
      }
      if (
        row.sourceType == '682acaa4e255e619c3f27419' ||
        row.sourceTypeDesc.includes('下午茶&季度团队经费') ||
        row.sourceTypeDesc.includes('团队经费') ||
        row.sourceTypeDesc == '内部员工下午茶及团队经费报销'
      ) {
        sourceType.value = 2;
      }
      if (
        row.sourceType == '6858c4c4fed7576608cbf02d' ||
        row.sourceTypeDesc.includes('营销费用') ||
        row.sourceTypeDesc.includes('营销端费用') ||
        row.sourceTypeDesc == '内部员工报销营销端费用'
      ) {
        sourceType.value = 3;
      }
      detailVisible.value = true;
    }
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
  }

  .icon {
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
  }

  .ml60 {
    margin-left: 49px;
  }

  .ml156 {
    margin-left: 156px;
  }

  @media screen and (max-width: 1700px) {
    .ml60 {
      margin-left: 60px;
    }
  }
</style>
