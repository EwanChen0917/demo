<template>
  <KeenList
    :selected-num="codeList?.length"
    :condition-code="conditionCode"
    :custom-fields="customFieldList"
    @refresh="refreshList"
    @reset-search="reset"
    @refresh-custom-fields="queryCustomFieldList"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input class="w-275px" v-model="search.keyword" placeholder="预测编码、产品名称" clearable>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </template>

    <template #filters>
      <el-select
        v-model="(search as any).skuCodeList"
        clearable
        filterable
        remote
        reserve-keyword
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="产品SKU"
        :remote-method="(query) => querySkuList(query)"
      >
        <el-option
          v-for="item in skuList"
          :key="item.skuCode"
          :label="item.skuCode"
          :value="item.skuCode"
        />
      </el-select>
      <ProductChannelSelect
        style="width: 120px"
        v-model="search.channel"
        placeholder="渠道"
        filterable
        clearable
      />
      <ErpSiteSelect
        style="width: 120px"
        v-model="search.country"
        placeholder="站点"
        :channel="search.channel || ''"
        filterable
        clearable
      />
      <!-- <DeptMember v-model="search.planer" placeholder="计划" deptCode="supply_planer_dept" /> -->
      <el-select
        style="width: 140px"
        v-model="search.planerList"
        placeholder="计划"
        filterable
        clearable
        :teleported="false"
        multiple
        :options="planerOptions"
        :props="{
          label: 'name',
          value: 'memberCode',
        }"
        collapse-tags
        collapse-tags-tooltip
      />
      <third-category
        v-model="search.thirdLevelCategoryCodeList"
        placeholder="商品类目"
        collapse-tags
        clearable
        :multiple="true"
        style="width: 140px"
      />
      <el-select
        v-model="(search as any).supplierCodeList"
        clearable
        filterable
        reserve-keyword
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="供应商"
      >
        <el-option
          v-for="item in supplierList"
          :key="item.supplierCode"
          :label="item.supplierName"
          :value="item.supplierCode"
        />
      </el-select>
      <el-select
        v-model="(search as any).confirmStatus"
        placeholder="备货状态"
        clearable
        style="width: 100px"
      >
        <el-option label="已完成" :value="1" />
        <el-option label="待完成" :value="0" />
      </el-select>
    </template>
    <template #custom-slot>
      <el-dropdown split-button trigger="click" @click="onTextClick" @command="handleCommand">
        <span class="d-flex align-items-center gap-1">
          <i
            class="Root-tyicon icon-Root-tyxianshimima"
            style="font-size: 14px; padding-top: 2px"
          ></i>
          保存视图
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-if="adjustSearchViewList.length">
              <el-dropdown-item
                v-for="item in adjustSearchViewList"
                :key="item.id"
                :command="item.id"
                class="dropdown-item"
              >
                <div class="dropdown-content">
                  <div class="item-name">
                    <el-icon v-if="item.isDefault"><View /></el-icon>
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="item-actions">
                    <el-button
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="editView(item)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      link
                      v-if="!item.isDefault"
                      @click.stop.prevent="setDefaultView(item)"
                    >
                      设置为默认
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="onDelete(item)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>
              </el-dropdown-item>
            </template>
            <el-dropdown-item class="text-center" v-else>
              <span>暂无数据</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template #buttons>
      <BatchOperatePophover name="更新备货数据" type="primary" :options="batchOptions" />
      <BatchOperatePophover
        name="批量操作"
        :options="batchConfirmOptions"
        :intercept="batchIntercept"
      />
      <ExportBtn
        :service="erpApi.luteosErpPlanTurnoverStockListExport"
        :params="{
          ...search,
        }"
        type="default"
      >
        导出
      </ExportBtn>
      <div>
        <KeenFileUpload
          v-model="fileList"
          :showFileList="false"
          :limit="1"
          accept=".xlsx,.xls"
          :showOperate="false"
          @success="hanldeUploadSuccess"
          directory="erp/turnoverAdjust"
          ref="uploadRef"
        >
          <el-button :loading="importLoading">导入</el-button>
        </KeenFileUpload>
      </div>
    </template>
    <template #default="{ tableHeight }">
      <vxe-table
        ref="tableRef"
        :height="tableHeight || 614"
        v-loading="listLoading"
        :data="listData?.recordList"
        :row-config="{ keyField: 'code' }"
        :show-overflow="false"
        :virtual-y-config="{ enabled: true, gt: 25, oSize: 5 }"
        :scroll-x="{ enabled: true }"
        :cell-config="{ verticalAlign: 'top', padding: false }"
        :checkbox-config="{ reserve: true, checkRowKeys: codeList }"
      >
        <template #empty>
          <div class="list-empty">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" />
            <div class="list-empty-text">暂未搜到相关数据</div>
          </div>
        </template>
        <vxe-column type="checkbox" :resizable="false" width="28" fixed="left">
          <template #header="{ checked, indeterminate }">
            <label
              class="header-checkbox"
              @click.stop="
                () => {
                  tableRef?.toggleAllCheckboxRow();
                  let list = getCheckedList();
                  handleSelectionChange(list);
                }
              "
            >
              <el-checkbox :model-value="checked" :indeterminate="indeterminate" />
            </label>
          </template>
          <template #checkbox="{ row, checked }">
            <label
              class="row-checkbox"
              @click.stop="
                () => {
                  tableRef?.toggleCheckboxRow(row);
                  let list = getCheckedList();
                  handleSelectionChange(list);
                }
              "
            >
              <el-checkbox :model-value="checked" />
            </label>
          </template>
        </vxe-column>
        <vxe-column field="orderInfo" width="279px" :fixed="isFixedColumn(1)">
          <template #header>
            <span>产品信息</span>
          </template>
          <template #default="{ row }">
            <div class="table-item-header" style="position: relative">
              <div class="header-actions">
                <div class="item">
                  <ItemLabel
                    label="预测编码"
                    :value="row.salesforecastCode"
                    style="max-width: 200px"
                  />
                  <Copy :content="row.salesforecastCode" />
                </div>
                <div class="item">
                  <span class="item-label">备货状态：</span>
                  <span class="d-flex align-items-center gap-1">
                    <span
                      class="cycle"
                      :style="{
                        background: +row.confirmStatus ? `var(--el-color-success)` : '#FF9F22',
                      }"
                    ></span>
                    <div class="status-content">
                      {{ +row.confirmStatus ? '已完成' : '待完成' }}
                      <el-dropdown
                        ref="dropdownStatusRef"
                        trigger="click"
                        @command="
                          (command) => {
                            handleBatchStatus(command, row);
                          }
                        "
                      >
                        <i class="iconfont icon-bianji cursor-pointer fn_12" />
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item
                              v-for="item in [
                                {
                                  key: '待完成',
                                  val: 0,
                                  background: '#FF9F22',
                                },
                                {
                                  key: '已完成',
                                  val: 1,
                                  background: '#02B96B',
                                },
                              ]"
                              :command="item.val"
                            >
                              <span
                                :style="{
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  display: 'inline-block',
                                  background: item.background,
                                }"
                              />
                              <span style="margin: 0 4px">{{ item.key }}</span>
                              <i
                                v-show="row.confirmStatus === item.val"
                                class="Root-tyicon icon-Root-tyxuanze cursor-pointer"
                                style="color: var(--el-color-success)"
                              />
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div class="detail-info">
              <!-- <div style="display: flex; gap: 10px"> -->
              <div>
                <OverflowTooltip
                  :content="row?.skuName"
                  :line="1"
                  v-if="productInfoFields.includes('skuName')"
                />
                <ItemLabel
                  label="类目"
                  :value="row?.thirdCategoryDesc"
                  v-if="productInfoFields.includes('thirdCategoryDesc')"
                />
                <ItemLabel
                  label="产品SKU"
                  :value="row?.skuCode"
                  v-if="productInfoFields.includes('skuCode')"
                />
                <ItemLabel
                  label="默认发货SKU"
                  :value="row?.defaultProductSku"
                  v-if="productInfoFields.includes('defaultProductSku')"
                />
                <ItemLabel
                  label="渠道"
                  :value="row?.channel"
                  v-if="productInfoFields.includes('channel')"
                  :color="search?.channel === row?.channel ? 'var(--el-color-primary)' : ''"
                />
                <ItemLabel
                  label="站点"
                  :value="row?.country"
                  v-if="productInfoFields.includes('country')"
                  :color="search?.country === row?.country ? 'var(--el-color-primary)' : ''"
                />
                <ItemLabel
                  label="渠道唯一标识"
                  :value="row?.originalPlatformMark"
                  v-if="productInfoFields.includes('originalPlatformMark')"
                />
              </div>
              <!-- </div> -->
            </div>
          </template>
        </vxe-column>
        <vxe-column width="120px" :fixed="isFixedColumn(2)">
          <template #header>
            <span>备货计划</span>
          </template>
          <template #default="{ row, $rowIndex }">
            <div class="table-item-header"></div>
            <div class="table-item-content2">
              <div
                v-for="(item, index) in [
                  '发货计划数量',
                  '预测销量',
                  '在制库存',
                  '货件在途库存',
                  '库存结余',
                  '周转天数',
                ]"
                :key="item"
                class="content-item d-flex align-items-center gap-1"
                :class="{
                  'row-clicked': clickedRow?.rowIndex === $rowIndex && clickedRow?.idx === index,
                }"
                @click="handleRowClick($rowIndex, index)"
              >
                <span>{{ item }}</span>
                <el-tooltip placement="top" v-if="item === '库存结余'">
                  <template #content>平台期末库存</template>
                  <i
                    class="Root-tyicon icon-Root-tyxunwen-1 cursor-pointer fs-14"
                    style="color: #c5c5c5"
                  ></i>
                </el-tooltip>
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="inventoryInfo " width="204px" :fixed="isFixedColumn(3)">
          <template #header>
            <span>库存&供应</span>
          </template>
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="table-item-content">
              <ItemLabel
                label="中仓库存"
                :value="row?.qty"
                v-if="stockInfoFields.includes('qty')"
              />
              <ItemLabel
                label="采购在途"
                :value="row?.onWayQty"
                v-if="stockInfoFields.includes('onWayQty')"
              />
              <ItemLabel
                label="平台期初库存"
                :value="row?.platformInitialInventory"
                v-if="stockInfoFields.includes('platformInitialInventory')"
              />
              <ItemLabel
                label="供应商"
                :value="row?.supplier"
                v-if="stockInfoFields.includes('supplier')"
              />
              <ItemLabel
                label="安全周转最小天数"
                :value="row?.softDay"
                v-if="stockInfoFields.includes('softDay')"
              />
              <el-tooltip>
                <template #content>
                  <div>供应商交期：{{ row?.planCycle.supplierHandleOverDay || '--' }}</div>
                  <div>订单处理时间：{{ row?.planCycle.orderHandleOverDay || '--' }}</div>
                  <div>国内运输时间：{{ row?.planCycle.domesticShipDay || '--' }}</div>
                  <div>验货+入库时间：{{ row?.planCycle.qcHandleDay || '--' }}</div>
                  <div>海外物流时间：{{ row?.planCycle.seaOverDay || '--' }}</div>
                  <div>接收上架时间：{{ row?.planCycle.receiveListingDay || '--' }}</div>
                  <div>周转+安全库存：{{ row?.planCycle.trunOverDay || '--' }}</div>
                </template>
                <ItemLabel
                  label="总供应周期"
                  :value="row?.planCycle?.totalCycle || '--'"
                  v-if="stockInfoFields.includes('supplyCycle')"
                />
              </el-tooltip>
              <ItemLabel
                label="物流渠道"
                :value="row?.logisticMethod"
                v-if="stockInfoFields.includes('logisticMethod')"
              />
              <ItemLabel
                label="计划专员"
                :value="row?.planer"
                v-if="stockInfoFields.includes('planer')"
              />
            </div>
          </template>
        </vxe-column>
        <vxe-column field="historySalesInfo " width="204" :fixed="isFixedColumn(4)">
          <template #header>
            <span style="display: flex; align-items: center; gap: 4px">
              历史销量
              <el-tooltip placement="top">
                <template #content>
                  <div>历史销量默认展示最新5周</div>
                </template>
                <i
                  class="Root-tyicon icon-Root-tyxunwen-1 cursor-pointer fs-14"
                  style="color: #c5c5c5"
                ></i>
              </el-tooltip>
            </span>
          </template>
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="table-item-content">
              <div v-for="key in getSalesKeys(row)" :key="key">
                <ItemLabel :label="String(key)" :value="row.recentWeeklySales[key]" />
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="defaultProductSkuInfo" min-width="160" :fixed="isFixedColumn(5)">
          <template #header>
            <span>默认发货SKU</span>
          </template>
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="table-item-content">
              <el-select
                v-if="row?.planTurnOverCacuBean && row.hasOpPermission"
                class="borderless"
                style="width: 100%"
                v-model="row.planTurnOverCacuBean.defaultProductSku"
                @change="changeDetail(row)"
              >
                <el-option
                  v-for="item in row?.planTurnOverCacuBean?.productSkuList"
                  :key="item"
                  :value="item"
                />
              </el-select>
              <span v-else>{{ row.planTurnOverCacuBean?.defaultProductSku || '-' }}</span>
            </div>
          </template>
        </vxe-column>
        <template v-if="listData?.recordList?.length">
          <!-- 第一个数据不渲染 -->
          <vxe-column
            v-for="(column, index) of extHeadList"
            :class-name="column.value ? '' : 'hidden-column'"
            :width="column.value ? 160 : 0"
            :field="`planInfoDetail.${column.value}`"
            :key="column.value"
            :fixed="isFixedColumn(index + 6)"
            :visible="column.value ? true : false"
          >
            <template #header>
              <span>
                {{ column.value }}
              </span>
            </template>
            <template #default="{ row, $rowIndex }">
              <div class="table-item-header"></div>
              <div class="table-item-content2">
                <div
                  v-for="(item, idx) in row?.planTurnOverCacuBean?.detailList"
                  :key="item.value"
                  class="content-item"
                  :class="{
                    'row-clicked': clickedRow?.rowIndex === $rowIndex && clickedRow?.idx === idx,
                  }"
                  @click="handleRowClick($rowIndex, idx)"
                  :style="column.value ? undefined : { display: 'none', padding: 0 }"
                >
                  <el-tooltip v-if="item?.items[index]?.edit">
                    <template #content v-if="item?.items[0]?.value === '发货计划数量'">
                      <div
                        v-for="i in [
                          {
                            code: 'estimateShipDate',
                            label: '预计发货时间',
                          },
                          {
                            code: 'estimateArriveDate',
                            label: '预计到货时间',
                          },
                          {
                            code: 'logisticMethod',
                            label: '物流方式',
                          },
                          {
                            code: 'dataSourceDesc',
                            label: '数据来源',
                          },
                        ]"
                        :key="i.code"
                      >
                        <div>{{ i.label }}：{{ item?.items[index]?.extMap?.[i.code] || '--' }}</div>
                      </div>
                    </template>
                    <template #content v-if="item?.items[0]?.value === '预测销量'">
                      <div>
                        数据来源：{{ item?.items[index]?.extMap?.['dataSourceDesc'] || '--' }}
                      </div>
                    </template>
                    <NumberInput
                      v-if="row.hasOpPermission"
                      style="width: 100%"
                      :class="[
                        'borderless',
                        item?.items[index]?.value || item?.items[0]?.value !== '预测销量'
                          ? ''
                          : 'value-transparent',
                      ]"
                      v-model="item.items[index].value"
                      :precision="0"
                      :min="0"
                      @blur-handler="
                        calcuTurnDayList(
                          row?.planTurnOverCacuBean,
                          $rowIndex,
                          item?.items[0]?.value
                        )
                      "
                      @keydown.enter="
                        calcuTurnDayList(
                          row?.planTurnOverCacuBean,
                          $rowIndex,
                          item?.items[0]?.value
                        )
                      "
                    />
                    <span v-else>{{ item?.items[index]?.value || '' }}</span>
                  </el-tooltip>
                  <el-popover
                    width="400"
                    trigger="hover"
                    v-else-if="
                      ['在制库存', '货件在途库存'].includes(item?.items[0]?.value) &&
                      item?.items[index].value > 0
                    "
                  >
                    <template #reference>
                      <div>{{ item?.items[index]?.value }}</div>
                    </template>
                    <el-table
                      :data="item?.items?.[index]?.extMap.order || []"
                      row-key="index"
                      max-height="30vh"
                      :header-cell-style="{ padding: '4px 0', height: '24px' }"
                      :cell-style="{ padding: '4px 2px', height: '24px' }"
                      style="--el-table-row-height: 24px"
                    >
                      <el-table-column prop="shippingOrderCode" label="发货单号" width="120" />
                      <el-table-column prop="transferOrderCode" label="调拨单号" min-width="120" />
                      <el-table-column prop="quantity" label="数量" min-width="90" />
                    </el-table>
                  </el-popover>
                  <span v-else :class="[index > 0 ? colorMap[item?.items[index]?.color] : '']">
                    {{ item?.items[index]?.value }}
                  </span>
                </div>
              </div>
            </template>
          </vxe-column>
        </template>
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
  <!-- 列调整器 -->
  <div
    ref="columnResizerRef"
    class="column-resizer"
    :style="{
      left: `${resizerPosition.left}px`,
      top: `${resizerPosition.top}px`,
      height: `${resizerPosition.height}px`,
      zIndex: extHeadList.length ? 100 : -1,
    }"
    @mouseenter="showResizerHandle = true"
    @mouseleave="handleResizerMouseLeave"
    @mousemove="handleResizerMouseMove"
  >
    <div
      v-show="showResizerHandle"
      class="resizer-handle"
      :style="{
        top: `${handlePosition.y}px`,
      }"
      @mousedown="handleMouseDown"
    ></div>
    <div
      v-if="showResizerHandle && !isDragging"
      class="drag-info-tooltip"
      :style="{ top: `${handlePosition.y - 10}px` }"
    >
      可拖拽调整冻结区域
    </div>
    <!-- 拖拽时显示列信息提示 -->
    <!-- <div v-if="isDragging && currentSnappedColumn" class="column-info-tooltip">
      {{ currentSnappedColumn.field }}
    </div> -->
  </div>
  <!-- 视图弹窗 -->
  <SearchViewModal ref="searchViewModalRef" :searchValue="search" @save-view-success="saveView" />
</template>

<script setup lang="ts" name="turnoverAdjust">
  import { useStore } from '@/store/modules/useStore';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, platformApi, dataApi, productApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useCache } from '@/hooks/web/useCache';
  import * as swal from '@/utils/swal';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import ThirdCategory from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/thirdCategory.vue';
  import { debounce } from 'lodash-es';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import { getCurCheckedArr } from '@/utils/customFields';
  import { openWindow } from '@/utils';
  import customFields from './customFields';
  import SearchViewModal from './components/searchViewModal.vue';

  const store = useStore();
  // 订单处理
  const batchOptions = computed(() => {
    return [
      {
        title: '更新发货计划',
        fn: () => update(),
      },
      {
        title: '更新预测',
        fn: () => update2('predict'),
      },
      {
        title: '更新在途在制',
        fn: () => update2('transit'),
      },
    ];
  });

  const batchConfirmOptions = computed(() => {
    return [
      {
        title: '批量已完成',
        fn: () => handleBatchStatus(1),
      },
      {
        title: '批量待完成',
        fn: () => handleBatchStatus(0),
      },
    ];
  });

  const productInfoFields = computed(() => {
    return getCurCheckedArr(customFieldList.value, '产品信息');
  });

  const stockInfoFields = computed(() => {
    return getCurCheckedArr(customFieldList.value, '库存&供应');
  });

  const route = useRoute();
  // vxe-table实例
  const showEditStatusList = ref({
    show: false,
    code: -1,
  });
  const tableRef = ref();
  const dropdownStatusRef = ref();
  const clickedRow = ref<{ rowIndex: number; idx: number } | null>(null);
  const changeList = ref<any[]>([]);
  /** 与列表数据同步更新，避免 computed 每次对 recordList 做 O(n) find */
  const extHeadList = ref<any[]>([]);
  const PAGE_SIZE = 10;
  const ADJUST_SEARCH_VIEW_CACHE_KEY = 'adjustSearchViewList';

  const BASE_SEARCH_DEFAULTS = {
    keyword: '',
    channel: '',
    planerList: undefined,
    country: '',
    thirdLevelCategoryCodeList: [],
    supplierCodeList: [],
    skuCodeList: [],
    confirmStatus: '',
  } as const;

  /** 与 setDefaultSearch 一致：首屏即用本地默认视图初始化，避免 mount 后再改 search 触发第二次列表请求 */
  const buildSearchDefaultsFromCache = (cacheGet: (k: string) => any) => {
    const list = cacheGet(ADJUST_SEARCH_VIEW_CACHE_KEY) || [];
    const defaultSearchView = list.find((item: any) => item.isDefault)?.searchValue;
    const searchKeys = { ...BASE_SEARCH_DEFAULTS } as Record<string, any>;
    Object.keys(searchKeys).forEach((key) => {
      if (defaultSearchView?.[key]) {
        searchKeys[key] = defaultSearchView[key];
      }
    });
    return searchKeys;
  };

  const { wsCache } = useCache('localStorage');
  const adjustSearchViewList = ref(wsCache.get(ADJUST_SEARCH_VIEW_CACHE_KEY) || []);
  const loadingMap = ref({
    predict: false,
    transit: false,
  });

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
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpPlanTurnoverQueryList.RequestBody,
    ErpApi.LuteosErpPlanTurnoverQueryList.ResponseBody
  >({
    searchDefaults: buildSearchDefaultsFromCache((k) => wsCache.get(k)) as any,
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanTurnoverQueryList,
    serviceManual: true,
    onSuccess: (data) => {
      const rawList = data?.recordList;
      let recordList = rawList;
      if (rawList?.length) {
        const recordList = rawList.map((item) => ({
          ...item,
          planTurnOverCacuBean: item.planTurnOverCacuBean ?? {},
        }));
        const firstWithHead = recordList.find(
          (item) => item?.planTurnOverCacuBean?.extHeadList?.items
        );
        extHeadList.value = firstWithHead?.planTurnOverCacuBean?.extHeadList?.items ?? [];
      }
      recordList?.forEach((item) => {
        const curInfo = changeList.value?.find((change) => change.code === item.code);
        if (curInfo) {
          item.planTurnOverCacuBean = curInfo;
        } else {
          item.planTurnOverCacuBean = item?.planTurnOverCacuBean ?? {};
        }
        if (item.planTurnOverCacuBean) {
          item.planTurnOverCacuBean.defaultProductSku =
            item?.planTurnOverCacuBean?.defaultProductSku ?? '';
        }
      });
      listData.value = { ...data, recordList: recordList ?? [] } as typeof data;
    },
  });
  const salesKeyCache = new Map();

  const getSalesKeys = (row) => {
    if (!salesKeyCache.has(row.code)) {
      salesKeyCache.set(row.code, Object.keys(row.recentWeeklySales || {}).sort());
    }
    return salesKeyCache.get(row.code);
  };
  /** 重置为空白条件（searchDefaults 来自默认视图，useList 自带 reset 会还原视图；此处改为真正清空） */
  const reset = () => {
    Object.keys(BASE_SEARCH_DEFAULTS).forEach((key) => {
      (search as any)[key] = (BASE_SEARCH_DEFAULTS as any)[key];
    });
    (search as any).searchValue = undefined;
    (search as any).searchType = undefined;
  };

  // 获取列表自定义字段
  const conditionCode = ref<any>(null);
  const customFieldList = ref<any>([]);
  const queryCustomFieldList = async () => {
    const res = await platformApi.platformSearchQueryConditionList({
      platform: 'lute_erp',
      moduleType: 'list',
      itemType: route?.name as string,
      pageSize: 1,
      pageNum: 1,
    });

    if (res?.recordList?.length) {
      const hideList = JSON.parse(res?.recordList[0]?.searchCondition || '[]');
      customFieldList.value = customFields?.map((item) => {
        return {
          ...item,
          propertyArr: item.propertyArr?.map((k) => {
            return {
              ...k,
              checked: !hideList?.includes(k?.key),
            };
          }),
          checkedArr: item.propertyArr
            ?.filter((item) => !hideList?.includes(item?.key))
            ?.map((k) => k.key),
        };
      });
      conditionCode.value = res?.recordList[0]?.conditionCode;
    } else {
      customFieldList.value = customFields?.map((item) => {
        return {
          ...item,
          checkedArr: item.propertyArr?.filter((item) => item.checked)?.map((k) => k.key),
        };
      });
    }
  };

  // 表格选择
  const codeList = ref<any[]>([]);
  const handleSelectionChange = (list) => {
    if (!list?.length) {
      codeList.value = [];
      return;
    }
    codeList.value = list?.map((item) => item.code);
  };

  // 批量操作前置校验
  const batchIntercept = () => {
    if (codeList.value.length === 0) {
      ElMessage.warning('请选择数据');
      return false;
    }
    return true;
  };
  // 批量操作状态
  const handleBatchStatus = async (type: 1 | 0, row?: any) => {
    let falg = false;
    let params: any[] = [];
    if (row) {
      falg = type !== row.confirmStatus;
      params = [
        {
          code: row.code,
          confirmStatus: type,
        },
      ];
    } else {
      falg = batchIntercept();
      params = codeList.value.map((item) => {
        return {
          code: item,
          confirmStatus: type,
        };
      });
    }
    if (falg) {
      await erpApi.luteosErpPlanTurnoverBatchUpdateStatus(params);
      showEditStatusList.value = {
        show: false,
        code: -1,
      };
      ElMessage.success('操作成功');
      tableRef.value?.clearCheckboxRow();
      tableRef.value?.clearCheckboxReserve();
      handleSelectionChange([]);
      refreshList();
    }
  };

  const getCheckedList = () => {
    const list = tableRef.value?.getCheckboxRecords(true) || [];
    const reserveList = tableRef.value?.getCheckboxReserveRecords(true) || [];
    return [...list, ...reserveList];
  };

  // 按照视图列表的默认视图进行查询
  const setDefaultSearch = () => {
    const defaultSearchView = adjustSearchViewList.value.find(
      (item) => item.isDefault
    )?.searchValue;
    if (adjustSearchViewList.value.length) {
      adjustSearchViewList.value.forEach((item) => {
        item.searchValue = { ...item.searchValue };
      });
    }

    Object.keys(search).forEach((key) => {
      if (defaultSearchView?.[key]) {
        search[key] = defaultSearchView?.[key];
      }
    });
  };

  // 导入
  const fileList = ref();
  const uploadRef = ref();
  const importLoading = ref(false);
  const hanldeUploadSuccess = async (key) => {
    if (key && fileList.value.length) {
      const file = fileList.value[0];
      importLoading.value = true;
      try {
        await erpApi.luteosErpPlanTurnoverStockListImport({
          ossKey: file.ossKey,
          fileName: file.name,
        });
      } finally {
        uploadRef.value?.uploadRef.clearFiles();
        fileList.value = [];
        importLoading.value = false;
        refreshList();
        const isConfirmed = await swal.confirm({
          title: '上传成功，是否去查看上传日志?',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (isConfirmed) {
          openWindow('/salesForecastingLog');
        }
      }
    }
  };
  /** 推迟到浏览器空闲，减少与首屏列表请求、表格渲染争抢主线程 */
  const runWhenIdle = (fn: () => void) => {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => fn(), { timeout: 2500 });
    } else {
      setTimeout(fn, 0);
    }
  };

  onMounted(() => {
    if (adjustSearchViewList.value.length) {
      adjustSearchViewList.value.forEach((item) => {
        item.searchValue = { ...item.searchValue };
      });
    }
    queryCustomFieldList();
    runWhenIdle(() => {
      getSupplierList();
      initDickbook();
    });
    getPlanerList();
  });

  const colorMap = {
    0: 'black',
    1: 'text-danger',
    2: 'text-warning',
    3: 'text-success',
  };

  const dickbook: any = ref({
    sales_forecast_channel: [],
  });

  const initDickbook = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['sales_forecast_channel'],
    });
    dickbook.value = res?.dictMap;
  };
  const searchViewModalRef = ref();

  // 添加或编辑视图
  const saveView = (view, isEdit?: Boolean) => {
    if (view.isDefault) {
      adjustSearchViewList.value.forEach((item: any) => {
        item.isDefault = false; // 取消其他视图的默认状态
      });
    }

    if (isEdit) {
      const newList = adjustSearchViewList.value.map((item: any) => {
        return {
          id: item.id,
          name: item.id === view.id ? view.name : item.name, // 更新视图名称
          isDefault: item.id === view.id ? view.isDefault : item.isDefault, // 更新是否默认状态
          searchValue: { ...search }, // 保持其他视图的搜索条件不变
        };
      });
      adjustSearchViewList.value = newList; // 更新视图列表
    } else {
      adjustSearchViewList.value.unshift({ ...view, searchValue: { ...search } });
    }
    wsCache.set(ADJUST_SEARCH_VIEW_CACHE_KEY, adjustSearchViewList.value); // 更新缓存
    ElMessage.success('视图保存成功');
  };

  // 编辑视图
  const editView = (item: { id: number; name: string }) => {
    searchViewModalRef.value.open(item);
  };
  // 设置为默认操作
  const setDefaultView = (item: { id: number; name: string }) => {
    adjustSearchViewList.value.forEach((i) => {
      i.isDefault = i.id === item.id; // 将当前项设置为默认
    });
    setDefaultSearch(); // 设置默认搜索条件
    wsCache.set(ADJUST_SEARCH_VIEW_CACHE_KEY, adjustSearchViewList.value); // 更新缓存
  };

  // 删除操作
  const onDelete = (item: { id: number; name: string }) => {
    adjustSearchViewList.value = adjustSearchViewList.value.filter((i) => i.id !== item.id); // 删除选项
    nextTick(() => {
      wsCache.set(ADJUST_SEARCH_VIEW_CACHE_KEY, adjustSearchViewList.value); // 更新缓存
      ElMessage.success('视图删除成功');
    });
  };

  // 点击视图文字
  const onTextClick = () => {
    if (adjustSearchViewList.value.length === 10) {
      ElMessage.warning('视图列表最多存10条，请先删除视图后重试');
      return;
    }
    searchViewModalRef.value.open();
  };

  // 选中下拉项
  const handleCommand = (command) => {
    const res = adjustSearchViewList.value.find((item) => item.id === command)?.searchValue;

    if (res) {
      Object.keys(search).forEach((key) => {
        if (!res[key]) {
          search[key] = undefined;
        } else {
          search[key] = res[key];
        }
      });
    }
  };

  const changeDetail = (row) => {
    const curInfo = changeList.value?.find((item) => item.code === row.code);
    if (curInfo) {
      curInfo.defaultProductSku = row.planTurnOverCacuBean?.defaultProductSku;
      curInfo.detailList = row.planTurnOverCacuBean?.detailList;
      curInfo.softDay = row.planTurnOverCacuBean?.softDay;
    } else {
      changeList.value.push(row.planTurnOverCacuBean);
    }
  };

  // 修改发货计划数量后，计算库存结余、周转天数
  const calculating = ref(false);
  const calcuTurnDayList = async (row, index, itemValue?) => {
    const params = {
      ...row,
      detailList: row?.detailList?.filter((item) => {
        return ['预测销量', 'minDay'].includes(itemValue)
          ? item?.items[0]?.value !== '发货计划数量'
          : item;
      }),
    };
    try {
      calculating.value = true;
      const res = await erpApi.luteosErpPlanTurnoverCalcuTurnDayList(params);
      if (listData.value?.recordList?.[index]) {
        listData.value.recordList[index].planTurnOverCacuBean = res;
        changeDetail(listData.value.recordList[index]);
      }
    } finally {
      calculating.value = false;
    }
  };

  // 更新发货计划
  const updateLoading = ref(false);
  const update = async () => {
    if (calculating.value) {
      setTimeout(() => {
        update();
      }, 300);
    } else {
      if (!changeList.value?.length) return ElMessage.warning('请先修改数据');
      try {
        updateLoading.value = true;
        const res = await erpApi.luteosErpPlanTurnoverSaveCalcuTurnDayList(changeList.value);
        ElMessage.success('更新成功');
        changeList.value = [];
        refreshList();
      } finally {
        updateLoading.value = false;
      }
    }
  };

  // 更新预测或在途在制数量
  // type: predict - 销售预测, transit - 在途在制数量
  const update2 = async (type: string) => {
    const str = type === 'predict' ? '销售预测' : '在途在制数量';
    const currentCodes = listData.value?.recordList
      ?.filter((item) => item.hasOpPermission) // 过滤当前账号有权限操作的数据
      ?.map((item) => ({
        code: item.code,
      }));
    if (!currentCodes?.length) return ElMessage.warning('请先修改数据');
    const isConfirmed = await swal.confirm({
      title: `确定要更新${str}？`,
      icon: undefined,
    });
    if (!isConfirmed) return;
    loadingMap.value = {
      ...loadingMap.value,
      [type]: true,
    };
    const api =
      type === 'predict'
        ? erpApi.luteosErpPlanTurnoverManualSyncForecast
        : erpApi.luteosErpPlanTurnoverManualSnapOnWay;
    await api(currentCodes);
    ElMessage.success(`${str}更新成功`);
    loadingMap.value = {
      ...loadingMap.value,
      [type]: false,
    };
    setTimeout(() => {
      refreshList();
    }, 300);
  };

  const skuList = ref<any>([]);
  const supplierList = ref<any>([]);
  const planerOptions = ref<any>([]);
  const getPlanerList = async () => {
    try {
      const res = await memberApi.luteosMemberQueryDeptMemberList({
        operatorDepartmentCode: 'supply_planer_dept',
      });
      planerOptions.value = [{ name: '-', memberCode: '' }, ...(res.memberList || [])];
      if (res?.memberList?.some((item) => item?.memberCode === store.userInfo.memberCode)) {
        search.planerList = [String(store.userInfo.memberCode)]; // 设置当前用户为计划员
      } else {
        search.planerList = [];
      }
    } catch (error) {
      planerOptions.value = [];
      search.planerList = [];
    }
  };
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierList.value = res.supplierList || [];
  };
  const querySkuList = async (query: string) => {
    const res = await productApi.luteosProductSkuQueryProductSkuList({
      keyWord: query,
      pageNum: 1,
      pageSize: 100,
    });
    skuList.value = res?.productSkuBeanList || [];
  };
  // 点击行处理
  const handleRowClick = (rowIndex: number, idx: number) => {
    // 如果点击的是同一个子行，则取消高亮；否则高亮当前子行
    if (clickedRow.value?.rowIndex === rowIndex && clickedRow.value?.idx === idx) {
      clickedRow.value = null;
    } else {
      clickedRow.value = { rowIndex, idx };
    }
  };

  // 列调整器相关
  const fixedColumnIndex = ref(2); // 默认固定第2列,
  const columnResizerRef = ref<HTMLElement | null>(null);
  const showResizerHandle = ref(false);
  const isDragging = ref(false);
  const resizerPosition = ref({
    left: 0,
    top: 0,
    height: 0,
  });
  const handlePosition = ref({
    y: 0,
  });

  // MutationObserver 实例
  let observer: MutationObserver | null = null;

  // 等待固定列容器渲染完成
  const waitForFixedColumn = () => {
    return new Promise<void>((resolve) => {
      if (!tableRef.value || !tableRef.value.$el) {
        resolve();
        return;
      }

      const tableEl = tableRef.value.$el;
      if (!tableEl) {
        resolve();
        return;
      }

      // 先检查是否已经存在
      const existingWrapper = tableEl.querySelector('.vxe-table--fixed-left-wrapper');
      if (existingWrapper) {
        resolve();
        return;
      }

      // 使用 MutationObserver 监听 DOM 变化
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            const fixedWrapper = tableEl.querySelector('.vxe-table--fixed-left-wrapper');
            if (fixedWrapper) {
              observer?.disconnect();
              observer = null;
              resolve();
              return;
            }
          }
        }
      });

      // 开始观察
      observer.observe(tableEl, {
        childList: true,
        subtree: true,
      });

      // 超时保护：2秒后强制resolve
      setTimeout(() => {
        if (observer) {
          observer.disconnect();
          observer = null;
          resolve();
        }
      }, 2000);
    });
  };

  // 计算最后一个固定列的位置
  const calculateResizerPosition = async () => {
    if (!tableRef.value || !tableRef.value.$el) {
      return;
    }

    await waitForFixedColumn();

    nextTick(() => {
      if (!tableRef.value || !tableRef.value.$el) {
        return;
      }

      const tableEl = tableRef.value.$el;
      if (!tableEl) return;

      const renderWrapper = tableEl.querySelector('.vxe-table--render-wrapper');
      if (!renderWrapper) return;
      const renderRect = renderWrapper.getBoundingClientRect();

      const fixedLeftWrapper = tableEl.querySelector('.vxe-table--fixed-left-wrapper');

      let fixedWidth = 0;
      if (fixedLeftWrapper) {
        fixedWidth = (fixedLeftWrapper as HTMLElement).offsetWidth;
      }

      resizerPosition.value = {
        left: renderRect.left + fixedWidth,
        top: renderRect.top,
        height: renderRect.height,
      };
    });
  };

  /** 在下一帧布局之后再读 DOM，降低强制同步布局与长任务风险 */
  const afterNextPaint = (fn: () => void) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(fn);
    });
  };

  const scheduleCalculateResizerPosition = debounce(() => {
    afterNextPaint(() => {
      calculateResizerPosition();
    });
  }, 80);

  watch(
    listData,
    (newVal) => {
      if (!newVal?.recordList?.length || !extHeadList.value?.length) return;
      scheduleCalculateResizerPosition();
    },
    { flush: 'post' }
  );

  // 获取所有列的边界位置和字段信息
  interface ColumnBoundaryInfo {
    position: number; // 边界位置（视口坐标）
    field: string; // 字段名
    isRightBoundary: boolean; // 是否为右边界
    columnElement: Element; // 列元素
  }

  const getColumnBoundaries = (): ColumnBoundaryInfo[] => {
    if (!tableRef.value || !tableRef.value.$el) {
      return [];
    }

    const tableEl = tableRef.value.$el;
    if (!tableEl) return [];

    const boundaries: ColumnBoundaryInfo[] = [];
    const renderWrapper = tableEl.querySelector('.vxe-table--render-wrapper');
    if (!renderWrapper) return [];

    const tableRect = renderWrapper.getBoundingClientRect();

    // 获取固定列的边界（视口坐标）
    const fixedLeftWrapper = tableEl.querySelector('.vxe-table--fixed-left-wrapper');
    if (fixedLeftWrapper) {
      const fixedColumns = fixedLeftWrapper.querySelectorAll('.vxe-header--column');
      fixedColumns.forEach((col: Element) => {
        const rect = col.getBoundingClientRect();
        const field =
          col.getAttribute('data-field') ||
          col.querySelector('.vxe-cell--title')?.textContent ||
          '';

        boundaries.push({
          position: rect.right,
          field,
          isRightBoundary: true,
          columnElement: col,
        });
      });
    }

    // 获取可见的滚动列边界（视口坐标）
    const bodyWrapper = tableEl.querySelector('.vxe-table--body-wrapper');
    if (bodyWrapper) {
      const scrollColumns = bodyWrapper.querySelectorAll('.vxe-header--column');
      scrollColumns.forEach((col: Element) => {
        const rect = col.getBoundingClientRect();
        // 只添加在表格可见范围内的列
        if (rect.right > tableRect.left && rect.left < tableRect.right) {
          const field =
            col.getAttribute('data-field') ||
            col.querySelector('.vxe-cell--title')?.textContent ||
            '';

          boundaries.push({
            position: rect.right,
            field,
            isRightBoundary: true,
            columnElement: col,
          });
        }
      });
    }
    return boundaries;
  };

  // 当前吸附的列信息
  const currentSnappedColumn = ref<ColumnBoundaryInfo | null>(null);

  // 找到最近的吸附位置
  const findClosestBoundary = (
    currentX: number
  ): { position: number; columnInfo: ColumnBoundaryInfo | null } => {
    const boundaries = getColumnBoundaries();
    if (!boundaries.length) return { position: currentX, columnInfo: null };

    let closestBoundary = boundaries[0];
    let minDistance = Math.abs(currentX - boundaries[0].position);

    boundaries.forEach((boundary) => {
      const distance = Math.abs(currentX - boundary.position);
      if (distance < minDistance) {
        minDistance = distance;
        closestBoundary = boundary;
      }
    });
    // 吸附阈值 100px（放宽阈值，使拖拽更容易吸附）
    if (minDistance < 50) {
      return { position: closestBoundary.position, columnInfo: closestBoundary };
    }
    return { position: currentX, columnInfo: null };
  };

  // 处理调整器内的鼠标移动
  const handleResizerMouseMove = (e: MouseEvent) => {
    if (isDragging.value) return; // 拖拽时不更新位置

    const resizerEl = columnResizerRef.value;
    if (!resizerEl) return;

    const rect = resizerEl.getBoundingClientRect();
    const y = e.clientY - rect.top;

    // 更新手柄位置
    handlePosition.value.y = Math.max(20, Math.min(y, rect.height - 20));
  };

  // 处理调整器鼠标离开
  const handleResizerMouseLeave = () => {
    if (!isDragging.value) {
      showResizerHandle.value = false;
    }
  };
  const isFixedColumn = (index: number) => {
    return fixedColumnIndex.value >= index ? 'left' : undefined;
  };
  // 拖拽开始
  const handleMouseDown = (e: MouseEvent) => {
    tableRef.value?.clearScroll();
    e.preventDefault();
    isDragging.value = true;

    // 记录初始位置，用于恢复
    const initialPosition = resizerPosition.value.left;
    const initialColumn = currentSnappedColumn.value;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // 使用视口坐标直接更新位置（带吸附效果）
      const result = findClosestBoundary(moveEvent.clientX);
      resizerPosition.value.left = result.position;

      // 更新当前吸附的列信息（但不立即应用，等拖拽结束）
      if (result.columnInfo) {
        currentSnappedColumn.value = result.columnInfo;
      }
    };

    const handleMouseUp = () => {
      isDragging.value = false;
      showResizerHandle.value = false;
      // 检查最终位置是否有效
      if (currentSnappedColumn.value) {
        const finalPosition = resizerPosition.value.left;
        const screenWidth = window.innerWidth;

        // 获取表格容器的位置信息，用于更精确的边界检测
        const tableEl = tableRef.value?.$el;
        const renderWrapper = tableEl?.querySelector('.vxe-table--render-wrapper');
        const tableRect = renderWrapper?.getBoundingClientRect();

        // 检查是否超出屏幕右边界或表格可见区域
        // 至少要保留200px的可视空间用于显示右侧的滚动列
        const minVisibleSpace = 100;
        const maxAllowedPosition = Math.min(
          screenWidth - minVisibleSpace,
          tableRect ? tableRect.right - minVisibleSpace : screenWidth - minVisibleSpace
        );

        if (
          finalPosition > maxAllowedPosition ||
          ['产品信息'].includes(currentSnappedColumn.value?.field) ||
          finalPosition < 60
        ) {
          // 超出允许范围，显示提示并恢复到初始位置
          ElMessage.warning({
            message: '无法冻结至此区域，当前窗口尺寸不足',
            duration: 2000,
            offset: 100,
          });
          // 恢复到初始位置
          resizerPosition.value.left = initialPosition;
          currentSnappedColumn.value = initialColumn;
        } else {
          // 位置有效，固定到列边界（单次取边界，避免连续 DOM 全表扫描）
          const boundaries = getColumnBoundaries();
          const columnIndex = boundaries.findIndex(
            (boundary) => boundary.columnElement === currentSnappedColumn.value?.columnElement
          );
          if (columnIndex >= 0) {
            fixedColumnIndex.value = columnIndex > 5 ? columnIndex + 1 : columnIndex || 2;
            resizerPosition.value.left = boundaries[columnIndex].position;
          }
        }
      } else {
        // 没有吸附到任何列边界，恢复到初始位置
        resizerPosition.value.left = initialPosition;
        currentSnappedColumn.value = initialColumn;
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  onUnmounted(() => {
    // 清理 MutationObserver
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
</script>

<style scoped lang="scss">
  :global(.keen-ui .creator.lt-multi-select) {
    width: auto !important;
    min-width: 85px !important;
  }
  :global(.keen-ui .creator.lt-multi-select .el-tag) {
    max-width: 180px !important;
  }

  .borderless,
  .value-transparent {
    :deep(.el-select__wrapper),
    :deep(.el-input__wrapper) {
      box-shadow: none !important;
      border: none !important;
      background-color: transparent !important;
      padding: 0 !important;
      .el-input__inner {
        height: 34px !important;
        line-height: 34px !important;
        margin: 0 -10px !important;

        &:focus {
          background-color: #ffffff !important;
          border: 0.1px solid #02b96b !important;
        }
      }
    }
  }
  .value-transparent {
    :deep(.el-input__inner) {
      color: transparent !important;
    }
  }
  .list-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999999;

    &-test {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }

  .header-checkbox {
    :deep(.el-checkbox) {
      height: 20px;
    }
  }

  .row-checkbox {
    padding: 0 12px;
    background-color: #f7f7f7;

    :deep(.el-checkbox) {
      height: 34px;
    }
  }

  :deep(.vxe-table--render-wrapper) {
    border: 1px solid #f4f4f4;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    font-family: 'PingFang SC';
  }

  :deep(.vxe-header--row) {
    th {
      padding: 9px 12px;
      background-color: #fff;

      .vxe-cell--col-resizable {
        &:before,
        &:after {
          background-color: unset;
        }
      }

      .vxe-cell {
        padding: 0 !important;
        min-height: unset !important;
        color: var(--el-table-text-color);
        font-weight: 500;
        font-family: PingFang SC Medium;
      }

      .vxe-cell--title {
        font-size: 13px;
        color: #1f1f1f;
      }
    }
  }

  :deep(.vxe-table--scroll-y-top-corner) {
    background-color: unset !important;
  }

  :deep(.vxe-body--row) {
    td {
      border-bottom: 1px solid #f5f5f5;
      border-right: 1px solid #f5f5f5;
      overflow: visible !important;

      &.col--vertical-top {
        // table td vertical-top 样式
        vertical-align: top;
      }
    }

    .vxe-cell {
      padding: 0 !important;
      min-height: unset !important;
      overflow: visible !important;
      align-items: flex-start;
    }

    .col--checkbox {
      border-right: none;
    }

    .vxe-cell--checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 34px;
      width: 38px;
      background: #f7f7f7;
    }
  }

  :deep(.vxe-checkbox--icon) {
    font-weight: 500 !important;
    font-size: 16px !important;
    background-color: #fff;
  }

  :deep(.vxe-table--render-wrapper) {
    color: #1f1f1f !important;
    font-size: 12px;
    // 滚动条处理
    .vxe-table--scroll-y-virtual {
      position: relative;
      right: -1px;
      width: 0 !important;
      background-color: transparent;

      .vxe-table--scroll-y-top-corner {
        background-color: transparent !important;
      }
    }

    .vxe-table--scroll-x-virtual {
      position: relative;
      bottom: -1px;
      height: 0 !important;
      background-color: transparent;

      .vxe-table--scroll-x-left-corner {
        background-color: transparent !important;
      }
    }

    $scrollbar-color: #909399;
    // 鼠标在表格外的样式
    .vxe-table--scroll-y-handle,
    .vxe-table--scroll-x-handle {
      scrollbar-color: rgba($scrollbar-color, 0) transparent;
    }

    // 鼠标在表格内的样式
    &:hover {
      .vxe-table--scroll-y-handle,
      .vxe-table--scroll-x-handle {
        scrollbar-color: rgba($scrollbar-color, 0.3) transparent;
      }
    }
  }

  :deep(.vxe-table--column) {
    line-height: 20px !important;
  }

  :deep(.header-checkbox .el-checkbox__input) {
    top: 2px;
  }
  :deep(.el-checkbox__inner) {
    border-color: #dedede !important;
  }

  .detail-info {
    min-height: 0;
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .other-info {
      padding: 10px 12px;
      border-left: var(--el-table-border);
      width: 26%;
    }

    .icon-bianji {
      margin-left: 4px;
      font-size: 12px;
      cursor: pointer;
      color: #999999;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .item-label {
    flex-shrink: 0;
    color: #999999;
  }

  .item-value:hover {
    color: #02b96b;
    cursor: pointer;
  }

  .table-item-header {
    display: flex;
    align-items: center;
    height: 34px;
    line-height: 20px;
    padding: 7px 12px;
    background: #f7f7f7;
    .header-actions {
      position: absolute;
      top: 20%;
      left: 12px;
      width: 800px;
      display: flex;
      align-items: center;
      z-index: 1000;
      color: #1f1f1f;
    }
    .item {
      display: flex;
      align-items: center;

      &:before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 12px;
        line-height: 20px;
        margin: 0 12px;
        background-color: #dedede;
      }

      &:first-child {
        margin-left: 0;

        &:before {
          display: none;
        }
      }

      .el-tag {
        margin-left: 11px;
      }
      .cycle {
        display: inline-block;
        border-radius: 50%;
        width: 5px;
        height: 5px;
      }
      .status-content {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
  .table-item-content {
    height: 204px;
    padding: 10px 12px;
  }
  .table-item-content2 {
    height: 204px;
    :deep(.el-input__inner) {
      font-size: 12px !important;
    }
    .content-item {
      height: 34px;
      line-height: 34px;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 10px;
      transition: background-color 0.2s ease;
      cursor: pointer;

      &.row-highlight {
        background-color: #f5f5f5;
      }

      &.row-clicked {
        background-color: #e1ffed !important;
      }
    }
    .content-item:last-child {
      border-bottom: none;
    }
  }
  :deep(.el-button > span) {
    display: unset;
  }

  .icon-sousuo {
    font-size: 14px;
  }

  :deep(.el-input-group__append) {
    cursor: pointer;
  }

  // 列调整器样式
  .column-resizer {
    position: fixed;
    width: 1px;
    z-index: 100;
    background-color: #dedede;
    width: 1px;

    &:hover {
      background-color: #02b96b;
    }

    // 吸附到列边界时的样式
    &.is-snapped {
      width: 1px;
    }

    .resizer-handle {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 4px;
      height: 30px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: none;
      background-color: #02b96b;
    }
    .drag-info-tooltip {
      position: absolute;
      width: 134px;
      left: 10px;
      padding: 4px 8px;
      background: rgba(0, 0, 0, 0.75);
      color: #ffffff;
      border-radius: 4px;
      &::after {
        content: '';
        position: absolute;
        left: -2px;
        top: 38%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: 4px solid rgba(0, 0, 0, 0.75);
      }
    }
    // 列信息提示框
    .column-info-tooltip {
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 8px;
      background: rgba(0, 0, 0, 0.75);
      color: #ffffff;
      font-size: 12px;
      white-space: nowrap;
      border-radius: 4px;
      pointer-events: none;
      z-index: 1001;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid rgba(0, 0, 0, 0.75);
      }
    }
  }
  .text-success {
    color: #02b96b !important;
  }
  .text-warning {
    color: #ff9f22 !important;
  }
  .text-danger {
    color: #f53f3f !important;
  }
</style>
