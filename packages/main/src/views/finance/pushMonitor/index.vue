<template>
  <div class="push-monitor-index">
    <KeenList :params="search" @refresh="refreshList" @reset-search="handlerResetSearch">
      <template #filters>
        <!-- 来源系统 -->
        <el-select
          v-model="search.sourceSystemCodes"
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable
          placeholder="来源系统"
          @change="handleSourceCodeChange(true)"
        >
          <el-option label="积加ERP" value="jijia" />
          <el-option label="企企通" value="srm" />
          <el-option label="路特ERP" value="erp" />
          <el-option label="分贝通" value="fbt" />
        </el-select>

        <!-- 来源系统单据 -->
        <el-select
          v-model="search.sourceSystemTypes"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          placeholder="来源单据"
          @change="handleSourceTypeChange(false)"
        >
          <el-option
            v-for="item in allSourceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 目标系统 -->
        <el-select
          v-model="search.targetSystemCodes"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          placeholder="目标系统"
          @change="handleTargetCodeChange(false)"
        >
          <el-option
            v-for="item in allTargetCodeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 目标系统单据 -->
        <el-select
          v-model="search.targetSystemTypes"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          placeholder="目标单据"
        >
          <el-option
            v-for="item in allTargetTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 推送状态 -->
        <el-select v-model="search.pushStatus" placeholder="推送状态" clearable>
          <el-option label="推送成功" :value="1" />
          <el-option label="推送失败" :value="2" />
        </el-select>

        <!-- 源单创建时间 -->
        <el-date-picker
          v-model="search.sourceCreateTime"
          type="daterange"
          clearable
          range-separator="至"
          value-format="YYYY-MM-DD"
          start-placeholder="源单创建开始日期"
          end-placeholder="源单创建结束日期"
          :default-value="[
            dayjs().add(-7, 'day').format('YYYY-MM-DD'),
            dayjs().format('YYYY-MM-DD'),
          ]"
          :disabled-date="getDisabledDateCb('sourceCreateTime')"
          @calendar-change="(date) => onCalendarChange('sourceCreateTime', date)"
        />

        <!-- 推送时间 -->
        <el-date-picker
          v-model="search.pushTime"
          type="daterange"
          clearable
          range-separator="至"
          value-format="YYYY-MM-DD"
          start-placeholder="推送开始日期"
          end-placeholder="推送结束日期"
          :default-value="[
            dayjs().add(-7, 'day').format('YYYY-MM-DD'),
            dayjs().format('YYYY-MM-DD'),
          ]"
          :disabled-date="getDisabledDateCb('pushTime')"
          @calendar-change="(date) => onCalendarChange('pushTime', date)"
        />

        <!-- 单据编号 -->
        <el-input v-model="search.keyword" placeholder="单据编号" style="width: 300px" clearable/>

        <!-- 异常类型 -->
        <el-select
          v-model="search.errorTypes"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          placeholder="异常类型"
        >
          <el-option label="金额不符" value="2"/>
          <el-option label="数量不符" value="3"/>
          <el-option label="信息不符" value="1"/>
          <el-option label="数据不存在" value="4"/>
          <el-option label="-" value="5"/>
        </el-select>
      </template>
      <template #buttons>
        <el-button type="primary" @click="handleReFetch">重新获取</el-button>
        <!-- <el-button type="primary" @click="handleExportList">导出列表</el-button>-->
        <!-- <el-button type="primary" @click="handleExportDetail">导出详情</el-button>-->
      </template>
      <template #export-list>
        <div class="batch-list-item" @click="handleExportList">导出列表</div>
        <div class="batch-list-item" @click="handleExportDetail">导出详情</div>
      </template>
      <template #default="{ tableHeight }">
        <section class="data-overview-card" v-loading="overviewLoading && !overviewIsCollapsed">
          <!-- 卡片标题 -->
          <div class="card-header">
            <div class="header-left">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                  <path fill="#ff0000" d="M160 896V128h120v768z"/>
                  <path fill="#1fa7fc" d="M440 896V448h120v448z"/>
                  <path fill="#ffaf00" d="M720 896V320h120v576z"/>
                </svg>
              </span>
              <span class="title">数据概览</span>
            </div>
            <div class="header-center">
              <span>更新时间：{{ overviewData.recentUpdateTime }}</span>
            </div>
            <div class="header-right">
              <el-icon @click="overviewIsCollapsed = !overviewIsCollapsed">
                <span>{{ overviewIsCollapsed ? '展开' : '收起' }}</span>
                <i
                  class="expend-icon vxe-table--expand-btn vxe-table-icon-arrow-right ms-1"
                  :class="!overviewIsCollapsed ? 'rotate90' : ''"
                ></i>
              </el-icon>
            </div>
          </div>

          <!-- 卡片内容 -->
          <div class="overview-container" :class="{ collapsed: overviewIsCollapsed }">
            <div class="overview-row">
              <!-- 推送总量 -->
              <div class="overview-item blue-item">
                <div class="label">推送总量</div>
                <div class="value black-text">{{ overviewData.totalPushNum }}</div>
              </div>

              <!-- 推送失败 -->
              <div class="overview-item red-item">
                <div class="label">推送失败</div>
                <div class="value red-text">
                  {{ overviewData.totalPushFailedNum }}
                </div>
                <div class="rate">
                  失败率：
                  <span class="red-text" v-if="overviewData.totalPushFailedRate">
                    {{ overviewData.totalPushFailedRate }}
                  </span>
                  <span v-else>-</span>
                </div>
              </div>

              <!-- 数据异常 -->
              <div class="overview-item orange-item">
                <div class="label">数据异常</div>
                <div class="value orange-text">
                  {{ overviewData.totalPushExceptionNum }}
                </div>
                <div class="rate">
                  异常率：
                  <span class="orange-text" v-if="overviewData.totalPushExceptionRate">
                    {{ overviewData.totalPushExceptionRate }}
                  </span>
                  <span v-else>-</span>
                </div>
              </div>

              <!-- 金额差异总额 -->
              <div
                class="overview-item orange-item"
                :class="{ 'green-item': !+overviewData.totalAmountDifference }"
              >
                <div class="label">金额差异总额</div>
                <div
                  class="value orange-text"
                  :class="{ 'green-text': !+overviewData.totalAmountDifference }"
                >
                  {{ overviewData.totalAmountDifference || '0' }}
                </div>
              </div>

              <!-- 数量差异总额 -->
              <div
                class="overview-item orange-item"
                :class="{ 'green-item': !+overviewData.totalQuantityDifference }"
              >
                <div class="label">数量差异总额</div>
                <div
                  class="value orange-text"
                  :class="{ 'green-text': !+overviewData.totalQuantityDifference }"
                >
                  {{ overviewData.totalQuantityDifference || '0' }}
                </div>
              </div>
            </div>
          </div>
        </section>
        <vxe-table
          ref="tableRef"
          :data="listData?.recordList"
          v-loading="listLoading"
          :row-config="{ height: '100%', keyField: 'tick', isHover: true }"
          :expand-config="{ expandAll: true, trigger: 'cell' }"
          border
          align="left"
          class="border-line-table"
          :row-class-name="getRowClass"
          :height="tableHeight - (overviewIsCollapsed ? 47 : 148)"
        >
          <!-- 展开列 -->
          <vxe-column type="expand" width="40">
            <template #header>
              <i
                class="expend-icon vxe-table--expand-btn vxe-table-icon-arrow-right"
                :class="tableIsCollapsed ? 'rotate90' : ''"
                @click="onCollapsedAll"
              ></i>
            </template>
            <template #content="{ row }">
              <div
                class="sub-table-wrap"
                :class="isPushError(row) ? 'error-row' : ''"
                v-if="row.monitorItemList?.length"
              >
                <vxe-table
                  :data="row.monitorItemList"
                  size="mini"
                  border
                  align="left"
                  :row-config="{ isHover: true }"
                  min-height="0"
                >
                  <vxe-column field="monitorCode" title="物料编码/费用项目" width="300">
                    <template #default="{ row }">
                      {{ row.rowUnique || '-' }}
                    </template>
                  </vxe-column>
                  <vxe-column field="sourceSystemAmount" title="来源系统金额">
                    <template #header="{ column }">
                      <el-tooltip
                        :content="row.monitorItemList[0]?.extJson?.sourceSystemAmountRemark || ''"
                        placement="top"
                      >
                        <span class="title">{{ column.title }}</span>
                      </el-tooltip>
                    </template>
                    <template #default="{ row: subRow }">
                      {{
                        subRow.extJson?.sourceSystemAmount ||
                        (['直接调拨单', '其他出库单', '其他入库单'].includes(row.monitorCfg?.targetSystemType) ? '-' : '0')
                      }}
                    </template>
                  </vxe-column>

                  <vxe-column field="targetSystemAmount" title="目标系统金额">
                    <template #header="{ column }">
                      <el-tooltip
                        :content="row.monitorItemList[0]?.extJson?.targetSystemAmountRemark || ''"
                        placement="top"
                      >
                        <span class="title">{{ column.title }}</span>
                      </el-tooltip>
                    </template>
                    <template #default="{ row: subRow }">
                      {{
                        subRow.extJson?.targetSystemAmount ||
                        (['直接调拨单', '其他出库单', '其他入库单'].includes(row.monitorCfg?.targetSystemType) ? '-' : '0')
                      }}
                    </template>
                  </vxe-column>
                  <vxe-column field="diffAmount" title="金额差异">
                    <template #default="{ row }">
                      {{ +row.extJson?.diffAmount ? row.extJson?.diffAmount : '-' }}
                    </template>
                  </vxe-column>
                  <vxe-column field="sourceSystemQty" title="来源系统数量">
                    <template #header="{ column }">
                      <el-tooltip
                        :content="row.monitorItemList[0]?.extJson?.sourceSystemQtyRemark || ''"
                        placement="top"
                      >
                        <span class="title">{{ column.title }}</span>
                      </el-tooltip>
                    </template>
                    <template #default="{ row: subRow }">
                      {{ subRow.extJson?.sourceSystemQty || (['付款申请单'].includes(row.monitorCfg?.targetSystemType) ? '-' : '0' )}}
                    </template>
                  </vxe-column>
                  <vxe-column field="targetSystemQty" title="目标系统数量">
                    <template #header="{ column }">
                      <el-tooltip
                        :content="row.monitorItemList[0]?.extJson?.targetSystemQtyRemark || ''"
                        placement="top"
                      >
                        <span class="title">{{ column.title }}</span>
                      </el-tooltip>
                    </template>
                    <template #default="{ row: subRow }">
                      {{ subRow.extJson?.targetSystemQty || (['付款申请单'].includes(row.monitorCfg?.targetSystemType) ? '-' : '0' )}}
                    </template>
                  </vxe-column>
                  <vxe-column field="diffQty" title="数量差异">
                    <template #default="{ row }">
                      {{ +row.extJson?.diffQty ? row.extJson?.diffQty : '-' }}
                    </template>
                  </vxe-column>
                </vxe-table>
              </div>
              <div class="list-empty" v-else>
                <EmptyAnimation name="listEmpty" width="128" height="128"/>
                <div class="empty-tip">暂无数据</div>
              </div>
            </template>
          </vxe-column>

          <!-- 主表列 -->
          <vxe-column field="sourceCode" title="单据编号" resizable>
            <template #default="{ row }">
              {{ row.sourceCode || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="sourceSystemDesc" title="系统来源" resizable>
            <template #default="{ row }">
              {{ row.monitorCfg?.sourceSystemDesc || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="sourceSystemType" title="来源单据" resizable>
            <template #default="{ row }">
              {{ row.monitorCfg?.sourceSystemType || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="sourceCreateTime" title="源单创建时间" resizable>
            <template #default="{ row }">
              {{ row.sourceCreateTime || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="pushInfo.pushTime" title="推送时间" resizable>
            <template #default="{ row }">
              {{ row.pushInfo?.pushTime || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="createTime" title="创建时间" resizable>
            <template #default="{ row }">
              {{ row.createTime || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="targetSystemType" title="目标单据" resizable>
            <template #default="{ row }">
              {{ row.monitorCfg?.targetSystemType || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="targetCode" title="目标单据编号" resizable>
            <template #default="{ row }">
              {{ row.targetCode || '-' }}
            </template>
          </vxe-column>
          <vxe-column field="pushInfo.pushStatus" title="推送状态" resizable>
            <template #default="{ row }">
              <PushStatus :push-info="row.pushInfo" :error-type="row.errorType" />
            </template>
          </vxe-column>
          <vxe-column field="errorTypeDesc" title="异常类型" resizable>
            <template #default="{ row }">
              {{ row.errorTypeDesc || '-' }}
            </template>
          </vxe-column>
          <vxe-column title="操作" resizable>
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '查看详情',
                    key: 'detail',
                    type: 'primary',
                    row,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </vxe-column>
        </vxe-table>
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
  <Detail ref="detailRef" />
  <ReFetchDialog ref="reFetchDialogRef" @success="handlerRefetchSuccess" />
</template>

<script setup lang="ts" name="financePushMonitor">
  import { ElMessage, ElSelect } from 'element-plus';
  import { reconciliationApi, ReconciliationApi } from '@/api';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import * as swal from '@/utils/swal';
  import useList from '@/hooks/list/useList';
  import dayjs from 'dayjs';
  import { useSourceSystemTypes } from '@/views/finance/pushMonitor/monitor';
  import PushStatus from '@/views/finance/pushMonitor/components/pushStatus.vue';
  import { uniqBy } from 'lodash-es';
  import ReFetchDialog from './components/reFetchDialog.vue';
  import Detail from './detail.vue';

  const router = useRouter();

  const tableRef = ref<any>(null);
  const tableIsCollapsed = ref(true);
  const overviewLoading = ref(false);
  const overviewIsCollapsed = ref(false);
  const overviewData = ref({
    recentUpdateTime: '', // 最近更新时间
    totalPushNum: 0, // 总推送总量
    totalPushFailedNum: 0, // 推送失败数量
    totalPushExceptionNum: 0, // 异常数量
    totalPushFailedRate: '', // 推送失败率
    totalPushExceptionRate: '', // 异常率
    totalAmountDifference: 0, // 金额差异总量
    totalQuantityDifference: 0, // 数量差异总量
  });

  const buildQueryParams = (params, isPager) => {
    let keyword = params.keyword?.trim?.();
    if (!params.pushTime?.length && !params.sourceCreateTime?.length && !keyword) {
      ElMessage.error('源单创建时间、推送时间、单据编号不能同时为空');
      return Promise.reject();
    }

    let result = {
      errorTypes: (params.errorTypes.length && params.errorTypes) || undefined,
      keyword: params.keyword || undefined,
      pushStatus: params.pushStatus || undefined,
      pushTimeStart: params.pushTime?.[0] || undefined,
      pushTimeEnd: params.pushTime?.[1] || undefined,
      sourceCreateTimeStart: params.sourceCreateTime?.[0] || undefined,
      sourceCreateTimeEnd: params.sourceCreateTime?.[1] || undefined,
      sourceSystemCodes: (params.sourceSystemCodes.length && params.sourceSystemCodes) || undefined,
      sourceSystemTypes: (params.sourceSystemTypes.length && params.sourceSystemTypes) || undefined,
      targetSystemCodes: (params.targetSystemCodes.length && params.targetSystemCodes) || undefined,
      targetSystemTypes: (params.targetSystemTypes.length && params.targetSystemTypes) || undefined,
    };
    if (isPager) {
      result = {
        ...result,
        pageNum: params.pageNum || undefined,
        pageSize: params.pageSize || undefined,
      };
    }
    return result;
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
    refreshList,
  } = useList<
    ReconciliationApi.ReconciliationMonitorQueryList.RequestBody,
    ReconciliationApi.ReconciliationMonitorQueryList.ResponseBody
  >({
    searchDefaults: {
      sourceSystemCodes: [] as string[], // 来源系统
      sourceSystemTypes: [] as string[], // 来源系统单据
      targetSystemCodes: [] as string[], // 目标系统
      targetSystemTypes: [] as string[], // 目标系统单据
      pushStatus: null as number | null, // 推送状态
      errorTypes: [] as string[], // 异常类型
      pushTime: [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 推送时间，默认一周内
      sourceCreateTime: null,
      keyword: '', // 关键字
    },
    pageSize: 10,
    service: async (params) => {
      // 加载概览数据
      const paramsOverview = await buildQueryParams(params, false);
      const paramsList = await buildQueryParams(params, true);

      overviewLoading.value = true;
      reconciliationApi
        .reconciliationMonitorQueryDataSummary(paramsOverview)
        .then((res) => {
          overviewData.value = res;
        })
        .finally(() => {
          overviewLoading.value = false;
        });
      // 加载并且返回列表
      const res = await reconciliationApi.reconciliationMonitorQueryList(paramsList);
      setTimeout(() => {
        setCollapsedAll(tableIsCollapsed.value, true);
      }, 500);
      res.recordList?.forEach((x) => {
        x.tick = Math.random() * 100;
      });
      return res;
    },
    interceptSearchData: (searchData) => {
      return {
        ...searchData,
        afu: 'test',
      };
    },
  });

  const getRowClass = ({ row }) => {
    const arr = [];
    if (isPushError(row)) {
      arr.push('error-row');
    }
    if (row.monitorItemList?.length) {
      arr.push('has-monitor');
    }
    return arr.join(' ');
  };

  // 重新获取之后，列表要显示获取的内容
  const handlerRefetchSuccess = (params) => {
    // 设置搜索条件
    handlerResetSearch();
    search.sourceSystemCodes =
      (Array.isArray(params.sourceSystemCodes) && params.sourceSystemCodes) || [];
    search.sourceSystemTypes =
      (Array.isArray(params.sourceSystemTypes) && params.sourceSystemTypes) || [];
    search.targetSystemCodes =
      (Array.isArray(params.targetSystemCodes) && params.targetSystemCodes) || [];
    search.targetSystemTypes =
      (Array.isArray(params.targetSystemTypes) && params.targetSystemTypes) || [];
    search.keyword = params.keyword || '';
    search.pushTime = [params.pushTimeStart, params.pushTimeEnd].filter(Boolean);
    // refreshList();
  };

  const handlerResetSearch = () => {
    search.sourceSystemCodes = [];
    search.sourceSystemTypes = [];
    search.targetSystemCodes = [];
    search.targetSystemTypes = [];
    search.pushStatus = null;
    search.errorTypes = [];
    search.pushTime = [
      dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
    ];
    search.sourceCreateTime = null;
    search.keyword = '';
  };

  const {
    sourceTypeOptions,
    targetCodeOptions,
    targetTypeOptions,
    handleSourceTypeChange,
    handleSourceCodeChange,
    handleTargetCodeChange,
  } = useSourceSystemTypes({
    formReactive: search,
    sourceCodeProp: 'sourceSystemCodes',
    sourceTypeProp: 'sourceSystemTypes',
    targetCodeProp: 'targetSystemCodes',
    targetTypeProp: 'targetSystemTypes',
  });

  const allSourceTypeOptions = computed(() => {
    return uniqBy(sourceTypeOptions.value.options || [], 'value');
  });
  const allTargetCodeOptions = computed(() => {
    return uniqBy(targetCodeOptions.value.options || [], 'value');
  });
  const allTargetTypeOptions = computed(() => {
    return uniqBy(targetTypeOptions.value.options || [], 'value');
  });

  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      handleDetail(row);
    }
  };

  const detailRef = ref();
  // 查看详情
  const handleDetail = (row: any) => {
    detailRef.value?.open(row);
  };

  // 重置
  const reFetchDialogRef = ref();
  // 重新获取
  const handleReFetch = () => {
    reFetchDialogRef.value?.open();
  };

  // 导出列表
  const handleExportList = async () => {
    const isConfirmed = await swal.confirm('确认导出列表吗？');
    if (!isConfirmed) return;
    const params = await buildQueryParams(search, true);
    const res = await reconciliationApi.reconciliationMonitorDownloadList(params);
    const isConfirmedSwitch = await swal.confirm({
      title: '导出成功，具体请前往下载中心查看',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
    });
    if (isConfirmedSwitch) {
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    }
  };

  // 导出详情
  const handleExportDetail = async () => {
    const isConfirmed = await swal.confirm('确认导出详情吗？');
    if (!isConfirmed) return;
    const params = await buildQueryParams(search, true);
    const res = await reconciliationApi.reconciliationMonitorDownloadDetail(params);
    const isConfirmedSwitch = await swal.confirm({
      title: '导出成功，具体请前往下载中心查看',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
    });
    if (isConfirmedSwitch) {
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    }
  };

  const onCollapsedAll = () => {
    tableIsCollapsed.value = !tableIsCollapsed.value;
    tableRef.value.setAllRowExpand(tableIsCollapsed.value);
  };

  const setCollapsedAll = (isCollapsed, onlyHaveData) => {
    tableIsCollapsed.value = isCollapsed;
    if (isCollapsed && onlyHaveData) {
      const list = listData.value?.recordList || [];

      const haveDataRows = [];
      const dontHaveDataRows = [];

      for (const item of list) {
        if (item.monitorItemList?.length) {
          haveDataRows.push(item);
        } else {
          dontHaveDataRows.push(item);
        }
      }
      tableRef.value.setRowExpand(haveDataRows, true);
      tableRef.value.setRowExpand(dontHaveDataRows, false);
    } else {
      tableRef.value.setAllRowExpand(tableIsCollapsed.value);
      if (tableRef.value) {
        tableRef.value.scrollTo?.(0, 0);
      }
    }
  };

  const isPushError = (row) => {
    const errs = String(row.errorType)
      .split(',')
      .map((x) => +x);
    return errs.some((x) => x === 1 || x === 2 || x === 3 || x === 4 || x === 6);
  };

  const currentSelectValueMap = {};
  const onCalendarChange = (prop, date) => {
    currentSelectValueMap[prop] = date;
  };

  // 限制日期选择范围不超过31天
  const getDisabledDateCb = (prop) => (time) => {
    if (!currentSelectValueMap[prop]?.length) {
      return false;
    }
    const selectedDate = dayjs(time);
    const [start, end] = currentSelectValueMap[prop];

    const startDate = start ? dayjs(start) : null;
    const endDate = end ? dayjs(end) : null;

    // 如果已经选择了开始日期，限制结束日期不能超过开始日期后31天
    if (startDate && !endDate) {
      const maxEndDate = startDate.add(31, 'day');
      const minEndDate = startDate.subtract(31, 'day');
      return selectedDate.isAfter(maxEndDate) || selectedDate.isBefore(minEndDate);
    }

    // 如果已经选择了结束日期，限制开始日期不能早于结束日期前31天
    if (endDate && !startDate) {
      const minStartDate = endDate.subtract(31, 'day');
      const maxStartDate = endDate.add(31, 'day');
      return selectedDate.isBefore(minStartDate) || selectedDate.isAfter(maxStartDate);
    }

    return false;
  };
</script>

<style scoped lang="scss">
  .push-monitor-index {
    :deep(.search-content) {
      position: absolute;
      display: none;
    }
  }

  section.data-overview-card {
    background-color: #ffffff;
    padding: 12px;
    border-radius: 6px;

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-left {
      display: flex;
      align-items: center;
      color: #666;

      .icon {
        font-size: 16px;
        width: 24px;
        height: 24px;
        //background-color: #00fff733;
        border-radius: 6px;
      }

      .title {
        margin-left: 8px;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .header-center {
      flex: 1;
      text-align: center;
      color: #000;
    }

    .overview-container {
      overflow: hidden;
      height: 100px;

      &.collapsed {
        height: 0;
      }
    }

    .overview-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 10px;
    }

    .overview-item {
      min-width: 0;
      flex: 1;
      padding: 12px;
      border: 1px solid #eee;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      text-align: left;

      &.blue-item {
        background: #d8f0fb;
        border-color: #d8f0fb;
        box-shadow: 0 2px 8px #d8f0fb0f;
      }

      &.red-item {
        background: #fbefef;
        border-color: #fbefef;
        box-shadow: 0 2px 8px #fbefef0f;
      }

      &.orange-item {
        background: #f9f0df;
        border-color: #f9f0df;
        box-shadow: 0 2px 8px #f9f0df0f;
      }

      &.green-item {
        background: #eaf9e9;
        border-color: #eaf9e9;
        box-shadow: 0 2px 8px #eaf9e90f;
      }

      .label {
        font-size: 12px;
        color: #000;
        margin-bottom: 5px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
      }

      .rate {
        font-size: 12px;
        color: #666;
      }
    }

    .black-text {
      color: #000;
    }

    .red-text {
      color: #ff4d4f;
    }

    .orange-text {
      color: #f8a500;
    }

    .green-text {
      color: #52c41a;
    }

    :deep(.el-loading-spinner) {
      margin-top: 0;
      top: 1em;
    }
  }

  :deep(.vxe-header--row) {
    color: #000;

    .vxe-cell--title span {
      font-weight: 400 !important;
    }
  }

  :deep(.vxe-body--row) {
    background: #f9f9f9;

    .vxe-table--expanded {
      i {
        color: #e0e0e0 !important;
      }
    }

    &.has-monitor {
      .vxe-table--expanded {
        i {
          color: #000 !important;
        }
      }
    }

    .vxe-cell {
      color: #000;
    }

    &.error-row {
      background: #fffef1;

      .vxe-cell {
        color: #f8a500;
      }
    }
  }

  .sub-table-wrap {
    padding: 12px 12px 20px 50px;
    background: #fff;

    :deep(.vxe-table) {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }

    &.error-row {
      :deep(.vxe-body--row) {
        background: #fffef1 !important;
      }
    }

    :deep(.vxe-header--row) {
      font-size: 12px;
    }

    :deep(.vxe-body--row) {
      background: #fff;

      .vxe-cell {
        color: #000;
      }
    }
  }

  .expend-icon {
    display: inline-block;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
    cursor: pointer;

    &.rotate90 {
      transform: rotate(90deg);
    }
  }

  :deep(.el-icon) {
    width: auto;
    user-select: none;
    cursor: pointer;
    font-style: unset;
    color: #999;
  }

  .list-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;

    .empty-tip {
      margin-top: -20px;
      color: rgb(153, 153, 153);
      font-size: 12px;
    }
  }
</style>

<style lang="scss">
  .border-line-table {
    th {
      background-size: 100% var(--vxe-ui-table-border-width) !important;
      background-position: 100% 100% !important;
    }

    td {
      background-size: 100% var(--vxe-ui-table-border-width) !important;
      background-position: 100% 100% !important;
    }
  }
</style>
