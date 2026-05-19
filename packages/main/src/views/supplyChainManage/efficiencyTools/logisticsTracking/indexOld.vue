<template>
  <div class="status-card d-flex flex-wrap gap-2">
    <div class="d-flex gap-2 card-row">
      <template v-for="(item, index) in statusMap" :key="item.key">
        <div class="card-item" v-if="index < 4" @click="search.shipStatus = item.key">
          <div class="card-item-title">
            <div class="d-flex align-items-center gap-1">
              <span>{{ item.label }}</span>
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
        <div
          class="card-item"
          :style="{ cursor: item.key !== '未知' ? 'pointer' : 'default' }"
          v-if="index > 3"
          @click="
            () => {
              item.key !== '未知' ? (search.shipStatus = item.key) : '';
            }
          "
        >
          <div class="card-item-title">
            <div class="d-flex align-items-center gap-1">
              <span>{{ item.label }}</span>
              <!--              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon size="16" color="var(--el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>-->
            </div>
          </div>
          <div class="card-item-qty" :class="item.color">
            {{ listData?.statisticsInfo[item.count] }}
          </div>
          <div class="card-item-rate">占比 {{ listData?.statisticsInfo[item.rate] }}%</div>
        </div>
      </template>
      <!--      <div class="card-item" @click="search.status = undefined">
        <div class="card-item-title">全部</div>
        <div class="card-item-qty text-warning">{{ listData?.statisticsInfo?.allCount }}</div>
        <div class="card-item-rate">占比 {{ listData?.statisticsInfo?.allCountRatio }}%</div>
      </div>-->
    </div>
  </div>
  <KeenList>
    <template #search>
      <el-input
        style="width: 300px"
        v-model="search.keyword"
        placeholder="平台单号/头程计划单号/海外仓入库单号"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!--      <el-select v-model="timeType" style="width: 80px" @change="handleTimeChange(time)">
        <el-option :value="1" label="发货" />
        <el-option :value="2" label="签收" />
      </el-select>
      <el-date-picker
        style="width: 300px"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
      />-->
      <el-select v-model="search.shipStatus" placeholder="物流状态" filterable clearable>
        <el-option
          v-for="item in listData?.shippingWayList"
          :value="item"
          :key="item"
          :label="item"
        />
      </el-select>
      <el-select v-model="search.shipMethod" placeholder="运输方式" filterable clearable>
        <el-option
          v-for="item in listData?.shippingTypeList"
          :value="item"
          :key="item"
          :label="item"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <!--      <ExportBtn :service="erpApi.luteosErpFirstLogisticsExportList" :params="search">
        导出
      </ExportBtn>-->
    </template>
    <div class="mt-5">全部：{{ listData?.statisticsInfo?.allCount }}</div>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="fbaId"
      class-name="table-row-dashed"
    >
      <el-table-column min-width="320" fixed>
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>平台单号/头程计划单号/海外仓入库单号</span>
            <el-tooltip
              content="Amazon为货件单号、TikTok/Walmart等有平台仓的渠道为平台计划单号、线下/shopify为海外仓头程单号"
              placement="top"
            >
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <div>
            平台单号：{{ row?.platformCode || '--' }}
            <Copy :content="row?.platformCode" />
          </div>
          <div>
            头程计划单号：{{ row?.planCode || '--' }}
            <Copy :content="row?.planCode" />
          </div>
          <div>
            海外仓入库单号：{{ row?.overSeaCode || '--' }}
            <Copy :content="row?.overSeaCode" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="渠道" prop="channelDesc" />
      <el-table-column label="物流状态" prop="logisticsStatusDesc" min-width="120">
        <template #default="{ row }">
          <Tag :color="colorMap[row.logisticsStatusDesc]">{{ row.logisticsStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="仓库" prop="warehouseDesc" min-width="180" />
      <el-table-column label="目的地国家" prop="goalCountryDesc" min-width="80" />
      <el-table-column label="发货日期" prop="shipTime" min-width="120" />
      <el-table-column label="签收日期" prop="reciveTime" min-width="120" />
      <el-table-column min-width="120" label="参考时效" prop="referenceTime" />
      <el-table-column min-width="120" label="实际时效" prop="actualTime" />
      <el-table-column label="是否查验">
        <template #default="{ row }">
          {{ row?.isCheck || '否' }}
        </template>
      </el-table-column>
      <el-table-column label="延误">
        <template #default="{ row }">
          {{ row?.isDelay || '未延误' }}
        </template>
      </el-table-column>
      <el-table-column label="物流商" prop="logisticsCompany" />
      <el-table-column label="运输方式" prop="transportMode" />
      <el-table-column label="物流渠道" prop="logisticsChannel" min-width="120" />
      <el-table-column label="箱数" prop="boxCount" />
      <el-table-column label="操作" fixed="right" width="120px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: 'sku明细',
                key: 'skuDetail',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '转运信息',
                key: 'transport',
                type: 'primary',
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
  <SkuDialog ref="skuDialogRef" />
  <TransportDialog ref="transportRef" />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import * as swal from '@/utils/swal';
  import SkuDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/skuDialog.vue';
  import TransportDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/transportDialog.vue';
  import { ElSelect } from 'element-plus';

  const statusMap = [
    {
      key: '已签收',
      label: '已签收',
      count: 'reciveCount',
      rate: 'reciveRatio',
      color: 'text-success',
    },
    {
      key: '正常在途',
      label: '正常在途',
      count: 'inWayCount',
      rate: 'inWayRatio',
      color: 'text-warning',
    },
    {
      key: '延误风险',
      label: '延误风险',
      count: 'delayRiskCount',
      rate: 'delayRiskRatio',
      color: 'text-danger',
    },
    {
      key: '进口查验-未放行',
      label: '进口查验-未放行',
      count: 'unPassCount',
      rate: 'unPassRatio',
      color: 'text-danger',
    },
    {
      key: '已拦截',
      label: '已拦截',
      count: 'interceptCount',
      rate: 'interceptRatio',
      color: 'text-danger',
    },
    {
      key: '异常',
      label: '异常',
      count: 'exceptionCount',
      rate: 'exceptionRatio',
      color: 'text-danger',
    },
    {
      key: '完结',
      label: '完结',
      count: 'completeCount',
      rate: 'completeRatio',
      color: 'text-success',
    },
    {
      key: '未知',
      label: '未知',
      count: 'unknownCount',
      rate: 'unknownRatio',
      color: 'text-success',
    },
  ];

  const colorMap = {
    已签收: 'green',
    正常在途: 'yellow',
    延误风险: 'red',
    '进口查验-未放行': 'red',
    已拦截: 'red',
    异常: 'red',
    完结: 'green',
    未知: 'green',
  };

  const time: any = ref([]);
  const timeType = ref<number>(1);
  const handleTimeChange = (val) => {
    search.signInTimeStart = undefined;
    search.signInTimeEnd = undefined;
    search.sendTimeStart = undefined;
    search.sendTimeEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.shipTimeStart = val[0] || '';
        search.shipTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.signInTimeStart = val[0] || '';
        search.signInTimeEnd = val[1] || '';
      }
    }
  };

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
    ErpApi.LuteosErpFirstLogisticsQueryList.RequestBody,
    ErpApi.LuteosErpFirstLogisticsQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shipStatus: undefined,
      shipMethod: undefined,
      // shipTimeStart: undefined,
      // shipTimeEnd: undefined,
      // signTimeStart: undefined,
      // signTimeEnd: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpFirstLogisticsQueryList,
  });

  const skuDialogRef = ref(null);
  const transportRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'skuDetail') {
      skuDialogRef.value.open(row);
    }
    if (key === 'transport') {
      transportRef.value.open(row);
    }
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
