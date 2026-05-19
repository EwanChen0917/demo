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
        未推送金蝶：
        <span class="text-red text-num">
          {{ listData?.relateSystemStatics?.totalNotRelateNumKingdee }}
        </span>
      </span>
      <span>
        已推送分贝通：
        <span class="text-green text-num">
          {{ listData?.relateSystemStatics?.totalRelateNumFbt }}
        </span>
      </span>
      <span>
        未推送分贝通：
        <span class="text-red text-num">
          {{ listData?.relateSystemStatics?.totalNotRelateNumFbt }}
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
        <el-select v-model="search.systemCode" clearable placeholder="来源系统" class="w-100px">
          <el-option
            v-for="item in sourceList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.billStatus" clearable placeholder="单据状态" class="w-100px">
          <el-option
            v-for="item in billsStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.invoiceStatus" clearable placeholder="发票状态" class="w-100px">
          <el-option
            v-for="item in invoiceStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="search.reconciliationStatus"
          clearable
          placeholder="核销状态"
          class="w-100px"
        >
          <el-option
            v-for="item in checkList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>

        <el-select
          v-model="search.fbtPushStatus"
          clearable
          placeholder="推送分贝通状态"
          class="w-150px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.pushStatus" clearable placeholder="推送金蝶状态" class="w-150px">
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.payApplyOrderList"
        row-key="payApplyBillNo"
        class-name="table-row-dashed"
      >
        <el-table-column label="单据类型" prop="billTypeDesc" />
        <el-table-column label="单据编号" prop="payApplyBillNo" min-width="210" />
        <el-table-column label="来源系统" prop="systemCodeDesc" />
        <el-table-column label="来源单号" prop="sourceBillNo" min-width="200" />
        <el-table-column label="申请支付金额" prop="totalPayApplyAmount" min-width="110" />
        <el-table-column label="申请人" prop="applyMemberName" width="70" />
        <el-table-column label="审核时间" prop="auditTime" min-width="150" />
        <el-table-column label="支付对象" prop="payObject" min-width="180" />
        <el-table-column label="单据状态" prop="billStatusDesc" />
        <el-table-column label="发票状态" prop="invoiceStatusDesc" />
        <el-table-column label="核销状态" prop="reconciliationStatusDesc" />
        <el-table-column label="推送金蝶" prop="kingdeePushInfo" width="110">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row?.kingdeePushInfo?.pushStatus == 2"
                >
                  {{ `推送失败：${row?.kingdeePushInfo?.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.kingdeePushInfo?.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row?.kingdeePushInfo?.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.kingdeePushInfo?.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row?.kingdeePushInfo?.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row?.kingdeePushInfo?.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                style="color: #b6b6b6"
                :size="20"
                v-if="row?.kingdeePushInfo?.pushStatus == 0"
              >
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="推送分贝通" prop="fbtPushInfo" width="110">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row?.fbtPushInfo?.pushStatus == 2"
                >
                  {{ `推送失败：${row?.fbtPushInfo?.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.fbtPushInfo?.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row?.fbtPushInfo?.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.fbtPushInfo?.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row?.fbtPushInfo?.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row?.fbtPushInfo?.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row?.fbtPushInfo?.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
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
                  label: '推送分贝通',
                  key: 'pushFBT',
                  type: 'primary',
                  row: row,
                  disabled: row.systemCode == 'fbt',
                },
                {
                  label: '推送金蝶',
                  key: 'pushJD',
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
    </KeenList>

    <!-- 其他,对公付款单据详情 -->
    <otherDetail
      v-if="detailVisible && (billType.includes('其他') || billType.includes('对公付款'))"
      :visible="detailVisible"
      :code="payApplyBillNo"
      @close="detailVisible = false"
    />
    <!-- 供应商单据详情 -->
    <supplierDetai
      v-else-if="detailVisible && billType.includes('供应商付款')"
      :visible="detailVisible"
      :code="payApplyBillNo"
      @close="detailVisible = false"
    />
    <!-- 售后退款单据详情 -->
    <afterSalesDetail
      v-else-if="detailVisible && billType.includes('售后退款')"
      :visible="detailVisible"
      :code="payApplyBillNo"
      @close="detailVisible = false"
    />
    <!-- 资产采购申请 -->
    <assetPurchase
      v-else-if="
        detailVisible &&
        (billType.includes('资产采购申请') || billType.includes('资产采购付款申请'))
      "
      :visible="detailVisible"
      :code="payApplyBillNo"
      @close="detailVisible = false"
    />
    <!-- 营销单据详情 -->
    <!-- detailVisible&&billType.includes('营销费用') -->
    <marketingDetail
      v-else
      :visible="detailVisible"
      :code="payApplyBillNo"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="payApplyBills">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import marketingDetail from './components/marketingDetail.vue';
  import otherDetail from './components/otherDetail.vue';
  import supplierDetai from './components/supplierDetai.vue';
  import afterSalesDetail from './components/afterSalesDetail.vue';
  import assetPurchase from './components/assetPurchase.vue';

  const PAGE_SIZE = 10;
  const billType = ref('营销费用');
  // 来源系统：分贝通-fbt 红人-hongren
  const sourceList = [
    { name: '红人系统', code: 'hongren' },
    { name: '分贝通', code: 'fbt' },
  ];
  // 单据状态：0-暂存 1-已提交 2-已审核 3-已取消 4-已拒绝 5-付款中 6-已付款
  const billsStatusList = [
    { name: '暂存', code: 0 },
    { name: '已提交', code: 1 },
    { name: '已审核', code: 2 },
    { name: '已撤销', code: 3 },
    { name: '已拒绝', code: 4 },
    { name: '付款中', code: 5 },
    { name: '已付款', code: 6 },
  ];
  // 发票状态：0-无发票 1-待开发票 2-已开发票
  const invoiceStatusList = [
    { name: '无发票', code: 0 },
    { name: '待开发票', code: 1 },
    { name: '已开发票', code: 2 },
  ];
  // 核销状态： 0-无需核销 1-待核销 2-已核销
  const checkList = [
    { name: '无需核销', code: 0 },
    { name: '待核销', code: 1 },
    { name: '已核销', code: 2 },
  ];
  const statusList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const detailVisible = ref(false);
  const payApplyBillNo = ref('');
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
    FinanceSystemApi.FinancePayQueryApplyOrderList.RequestQuery,
    FinanceSystemApi.FinancePayQueryApplyOrderList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      billStatus: undefined,
      invoiceStatus: undefined,
      reconciliationStatus: undefined,
      fbtPushStatus: undefined,
      pushStatus: undefined,
      systemCode: undefined,
      auditStartTime: undefined,
      auditEndTime: undefined,
      auditDate: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      console.log(searchData);
      const { auditDate } = searchData;
      return {
        ...omit(searchData, 'auditDate'),
        auditStartTime: auditDate ? auditDate[0] : undefined,
        auditEndTime: auditDate ? auditDate[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financePayQueryApplyOrderList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'pushJD' || key == 'pushFBT') {
      // 第三方系统类型 kingdee->金蝶 fbt->分贝通
      const systemCode = key === 'pushJD' ? 'kingdee' : 'fbt';
      const pushStatus =
        key === 'pushJD' ? row?.fbtPushInfo?.pushStatus : row?.kingdeePushInfo?.pushStatus;
      const text = pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financeBasicSyncThirdSystemBill({
          billNo: row?.payApplyBillNo,
          billTypes: [17],
          systemCode,
        })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      billType.value = row?.billTypeDesc || '营销费用';
      payApplyBillNo.value = row.payApplyBillNo;
      detailVisible.value = false;
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
