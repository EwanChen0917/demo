<template>
  <div class="status-card d-flex flex-wrap gap-2">
    <div class="d-flex gap-2 card-row">
      <template v-for="(item, index) in statusMap" :key="item.key">
        <div class="card-item" v-if="index < 4" @click="search.status = item.key">
          <div class="card-item-title">
            <div class="d-flex align-items-center gap-1">
              <span>{{ item.label }}</span>
              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon size="16" color="var(--el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
          <div class="card-item-qty" :class="item.color">
            {{ listData?.statisticsInfo[item.count] }}
          </div>
          <div class="card-item-rate">占比 {{ listData?.statisticsInfo[item.rate] }}%</div>
        </div>
      </template>
    </div>
    <div class="d-flex gap-2 card-row">
      <template v-for="(item, index) in statusMap" :key="index">
        <div class="card-item" v-if="index > 3" @click="search.status = item.key">
          <div class="card-item-title">
            <div class="d-flex align-items-center gap-1">
              <span>{{ item.label }}</span>
              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon size="16" color="var(--el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
          <div class="card-item-qty" :class="item.color">
            {{ listData?.statisticsInfo[item.count] }}
          </div>
          <div class="card-item-rate">占比 {{ listData?.statisticsInfo[item.rate] }}%</div>
        </div>
      </template>
      <div class="card-item" @click="search.status = undefined">
        <div class="card-item-title">全部</div>
        <div class="card-item-qty text-warning">{{ listData?.statisticsInfo?.allCount }}</div>
        <div class="card-item-rate">占比 {{ listData?.statisticsInfo?.allCountRatio }}%</div>
      </div>
    </div>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="货件单号/海外仓头程计划单号" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        style="width: 300px"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        value-format="YYYY-MM-DD"
        @change="
          (dateArr) => {
            search.createTimeStart = dateArr ? dateArr[0] : '';
            search.createTimeEnd = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-select
        style="width: 140px"
        v-model="search.shpiingTimeliness"
        placeholder="配送出库时效"
        clearable
      >
        <el-option value="24h" label="24h" />
        <el-option value="48h" label="48h" />
        <el-option value="72h" label="72h" />
        <el-option value="-1" label="其他" />
      </el-select>
      <el-select style="width: 140px" v-model="search.status" placeholder="时效状态" clearable>
        <el-option
          v-for="item in statusMap"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.overTimeType"
        placeholder="超时天数"
        clearable
      >
        <el-option :value="0" label="≤0" />
        <el-option :value="1" label="1-3" />
        <el-option :value="2" label="4-7" />
        <el-option :value="3" label=">7" />
        <el-option :value="4" label="其他" />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        @click="batchRemind"
        :disabled="selectList?.length === 0"
      >
        批量提醒
      </el-button>
      <ExportBtn :service="erpApi.luteosErpFirstVesselTimelinessExportList" :params="search">
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
      <el-table-column min-width="200" fixed>
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>货件单号/海外仓头程计划单号</span>
            <el-tooltip content="FBA头程单号为货件单号；海外仓头程为计划单号" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.code }}
        </template>
      </el-table-column>
      <el-table-column label="时效状态" prop="statusDesc" fixed min-width="120" />
      <el-table-column label="原单状态" prop="codeStatusDesc" min-width="120" />
      <el-table-column min-width="120">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>创建时间</span>
            <el-tooltip
              content="FBA头程时间取发货单的创建时间（易仓接口仅能返回该时间）；海外仓头程为计划单创建时间"
              placement="top"
            >
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.codeCreateTime }}
        </template>
      </el-table-column>
      <el-table-column label="配送方式" prop="shippingCode" />
      <el-table-column label="配送方式描述" prop="shippingDesc" min-width="120" />
      <el-table-column min-width="120">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>配送出库时效</span>
            <el-tooltip
              content="快船72h、快递24h、空派48h、普船72h、铁派72h、卡航72h、线下24h"
              placement="top"
            >
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.shpiingTimeliness }}
        </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>更新时间</span>
            <el-tooltip content="系统更新数据时间" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.date }}
        </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>最新出库时间</span>
            <el-tooltip content="发货单中的最新出库时间" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.codeOutTime }}
        </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>预计出库时间</span>
            <el-tooltip content="创建时间+配送出库时效" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          {{ row.expectedOutTime }}
        </template>
      </el-table-column>
      <el-table-column label="超时天数" prop="overTime" />
      <el-table-column label="计划数量" prop="planQty" />
      <el-table-column label="发货数量" prop="sendQty" />
      <el-table-column label="操作" fixed="right" width="120px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '发货日志',
                key: 'log',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '发货提醒',
                key: 'remind',
                type: 'primary',
                hide: [4, 5].includes(row.status),
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

  <LogDialog ref="logRef" />
  <RemindDialog ref="remindRef" />
  <BatchRemindDialog ref="batchRemindRef" @refresh="tableRef.clearSelection()" />
</template>

<script setup lang="ts" name="firstVessel">
import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import LogDialog from '@/views/supplyChainManage/efficiencyTools/firstVessel/components/logDialog.vue';
  import RemindDialog from '@/views/supplyChainManage/efficiencyTools/firstVessel/components/remindDialog.vue';
  import BatchRemindDialog from '@/views/supplyChainManage/efficiencyTools/firstVessel/components/batchRemindDialog.vue';
  import * as swal from '@/utils/swal';

  const statusMap = [
    {
      key: 1,
      label: '正常未发',
      tooltip: '无出库时间，发货数量=0；且，预计出库时间≥更新时间',
      count: 'unSendCount',
      rate: 'unSendCountRatio',
      color: 'text-success',
    },
    {
      key: 6,
      label: '部分已发',
      tooltip:
        '有出库时间，0＜发货数＜计划数；且，【预计出库时间≥最新出库时间；预计出库时间≥更新时间】',
      count: 'partSendCount',
      rate: 'partSendCountRatio',
      color: 'text-warning',
    },
    {
      key: 3,
      label: '部分超时未发',
      tooltip:
        '有出库时间，0＜发货数＜计划数；且，【预计出库时间＜最新出库时间，或，预计出库时＜更新时间】',
      count: 'partTimeoutUnSendCount',
      rate: 'partTimeoutUnSendCountRatio',
      color: 'text-danger',
    },
    {
      key: 2,
      label: '全部超时未发',
      tooltip: '无出库时间，发货数量=0；且，预计出库时间＜更新时间',
      count: 'allTimeoutUnSendCount',
      rate: 'allTimeoutUnSendCountRatio',
      color: 'text-danger',
    },
    {
      key: 5,
      label: '全部超时已发',
      tooltip: '有出库时间，发货数≥计划数；且，【预计出库时间＜最新出库时间】',
      count: 'allTimeoutSendCount',
      rate: 'allTimeoutSendCountRatio',
      color: 'text-danger',
    },
    {
      key: 4,
      label: '全部正常已发',
      tooltip: '有出库时间，发货数≥计划数；且，【预计出库时间≥最新出库时间】',
      count: 'allNormalSendCount',
      rate: 'allNormalSendCountRatio',
      color: 'text-success',
    },
    {
      key: 7,
      label: '其他',
      tooltip: '无创建时间/配送方式/配送出库时效等单号',
      count: 'otherCount',
      rate: 'otherCountRatio',
      color: 'text-warning',
    },
  ];

  const time: any = ref([]);
  const PAGE_SIZE = 10;
  const tableRef = ref(null);

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
    ErpApi.LuteosErpFirstVesselTimelinessQueryList.RequestQuery,
    ErpApi.LuteosErpFirstVesselTimelinessQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      shpiingTimeliness: undefined,
      status: undefined,
      overTimeType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpFirstVesselTimelinessQueryList,
  });

  const logRef = ref(null);
  const remindRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'log') {
      logRef.value.open(row);
    }
    if (key === 'remind') {
      remindRef.value.open(row.code);
    }
  };

  const selectList = ref([]);
  const handleSelectionChange = (list) => {
    selectList.value = list?.filter((item) => ![4, 5].includes(item.status));
  };

  const batchRemindRef = ref(null);
  const batchRemind = async () => {
    const isConfirmed = await swal.confirm(
      '若勾选了【全部正常已发】或【全部超时已发】的单号，将被过滤，是否继续？'
    );
    if (!isConfirmed) return;
    batchRemindRef.value.open(selectList.value);
  };
</script>

<style scoped lang="scss">
  .list-page-container {
    :deep(.list-search-wrapper) {
      margin-bottom: 0;
    }
  }
  .status-card {
    margin: 10px 0;
    .card-row {
      min-width: 825px;
      flex-grow: 1;
    }
    .card-item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 25%;
      height: 6vw;
      min-height: 90px;
      background: #ffffff;
      padding: 0.75vw;
      border-radius: 5px;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      position: relative;
      cursor: pointer;
      &-title {
        font-size: 14px;
        font-weight: 400;
      }
      &-qty {
        font-size: 16px;
        text-align: center;
      }
      &-rate {
        font-size: 12px;
        color: var(--el-color-info);
      }
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
        //box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
