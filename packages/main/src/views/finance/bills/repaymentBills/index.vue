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
        <el-input v-model.trim="search.keyword" placeholder="单据编号/还款人" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-date-picker
          v-model="search.refundDate"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="还款开始日期"
          end-placeholder="还款结束日期"
          class="w-310px"
        />
        <el-select v-model="search.pushStatus" clearable placeholder="推送金蝶状态">
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
        :data="listData?.recordList"
        row-key="refundCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="单据编号" prop="refundCode" min-width="220" />
        <el-table-column label="借款单号" prop="code" min-width="220" />
        <el-table-column label="还款金额" prop="refundAmount" />
        <el-table-column label="还款时间" prop="refundTime" min-width="120" />
        <el-table-column label="还款人" prop="refundMemberDesc" />
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
                  row: row,
                  disabled: row.refundType == 2,
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
    <detailDialog
      v-if="detailVisible"
      :visible="detailVisible"
      :code="code"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="repaymentBills">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import detailDialog from './components/detailDialog.vue';

  const PAGE_SIZE = 10;
  const statusList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const detailVisible = ref(false);
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
    FinanceSystemApi.FinanceBorrowOrderQueryRefundList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      pushStatus: undefined,
      refundDate: undefined,
      refundDateBegin: undefined,
      refundDateEnd: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { refundDate } = searchData;
      return {
        ...omit(searchData, 'refundDate'),
        refundDateBegin: refundDate ? refundDate[0] : undefined,
        refundDateEnd: refundDate ? refundDate[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBorrowOrderQueryRefundList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text =
        row.kingdeePushInfo.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const param = {
        billTypes: [22], // 还款单（退款单） 22
        billNo: row.refundCode,
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
      code.value = row.refundCode;
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
