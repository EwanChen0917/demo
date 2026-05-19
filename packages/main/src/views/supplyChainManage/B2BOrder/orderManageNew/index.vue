<template>
  <OrderTabs2
    v-model="search.orderBigStatus"
    :tab-status-list="tabStatusList"
    :count-map="countListData?.statusStatistics"
    :child-count-map="countListData?.errorStatusCountMap"
    @tab-change="handleTabChange"
    @child-tab-change="handleChildTabChange"
  />
  <KeenList
    :selected-num="codeList?.length"
    auto-custom-fields
    v-model:condition-code="conditionCode"
    v-model:custom-fields="customFieldList"
    v-model:export-condition-code="exportConditionCode"
    v-model:custom-export-fields="exportCustomFieldList"
    :custom-fields-base="customFields"
    :custom-export-fields-base="customExportFields"
    :params="codeList?.length ? { ...search, codeList } : search"
    :export-service="omsApi.omsOrderOrderDownload"
    :selected-list="selectedList"
    @refresh="listRefresh"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    @clear-all="clearAll"
  >
    <template #search>
      <el-input
        :style="{ width: `${inputWidth}px` }"
        v-model="search.orderCode"
        placeholder="请输入"
        clearable
        @input="handleInputChange"
        @change="handleBlur"
        @blur="handleBlur"
      >
        <template #prepend>
          <el-select v-model="search.searchType" style="width: 96px">
            <el-option
              v-for="(val, key) in searchTypeMap"
              :value="parseInt(key)"
              :label="val"
              :key="key"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        class="creator"
        v-model="search.creatorList"
        placeholder="创建人"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :options="creatorList"
      />
      <el-input v-model="search.customerName" placeholder="客户名称" style="width: 116px" clearable>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
      <el-input v-model="search.productName" placeholder="产品名称" style="width: 116px" clearable>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
      <el-input
        v-model="search.skuKey"
        placeholder="供应链SKU、产品SKU"
        style="width: 207px"
        clearable
        @change="handleBlur2"
        @blur="handleBlur2"
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef2"
            @search="handleBatchSearch2"
            @clear="handleBatchClear2"
          />
        </template>
      </el-input>
      <div class="date-picker-prepend" ref="areaCountryContainerRef">
        <el-select v-model="timeType" style="width: 100px" @change="handleTimeChange(time)">
          <el-option :value="1" label="创建时间" />
          <el-option :value="2" label="签收时间" />
          <el-option :value="3" label="发货时间" />
          <el-option :value="4" label="送达时间" />
          <el-option :value="5" label="期望发货时间" />
          <el-option :value="6" label="物流审核时间" />
        </el-select>
        <el-date-picker
          :style="{ width: `${pickerWidth}px` }"
          v-model="time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleTimeChange"
          class="b2bdate"
        />
      </div>
      <OrderSaleSelect
        class="orderSaleSelect"
        ref="orderSaleTypeListSelectRef"
        v-model="search.orderSaleTypeList"
        placeholder="订单渠道"
        multiple
        clearable
        collapse-tags-tooltip
        :teleported="true"
      />
      <CountrySelect
        class="countrySelect"
        ref="countryCodeListSelectRef"
        v-model="search.countryCodeList"
        placeholder="收件人国家/地区"
        filterable
        clearable
        multiple
        collapse-tags-tooltip
        :teleported="true"
      />
      <el-select
        v-model="search.meReview"
        style="width: 130px"
        v-if="search.orderBigStatus === '200'"
      >
        <el-option label="我的审核节点" :value="true" />
        <el-option label="全部审核节点" :value="false" />
      </el-select>
    </template>
    <template #more-filter>
      <!-- <el-form-item label="订单渠道">
        <OrderSaleSelect
          ref="orderSaleTypeListSelectRef"
          v-model="search.orderSaleTypeList"
          placeholder="请选择"
          multiple
          clearable
        />
      </el-form-item>
      <el-form-item label="收件人国家/地区">
        <CountrySelect
          ref="countryCodeListSelectRef"
          v-model="search.countryCodeList"
          placeholder="请选择"
          filterable
          clearable
          multiple
        />
      </el-form-item> -->
      <el-form-item label="发货仓库">
        <el-select
          ref="warehouseCodeSelectRef"
          v-model="search.warehouseCode"
          placeholder="请选择"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="warehouse of warehouseMap"
            :key="warehouse.value"
            :label="warehouse.desc"
            :value="warehouse.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="物流渠道">
        <el-select
          ref="shippingSelectRef"
          v-model="search.shippingCode"
          placeholder="请选择"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="shipping of shippingMap"
            :key="shipping.value"
            :label="shipping.desc"
            :value="shipping.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-select
          ref="customerTypeListSelectRef"
          v-model="search.customerTypeList"
          placeholder="请选择"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :teleported="false"
          :options="b2bClientType"
          :props="{
            label: 'desc',
            value: 'value',
          }"
        />
      </el-form-item>
      <el-form-item label="审核人">
        <DeptMember ref="auditCodeSelectRef" v-model="search.auditCode" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="金额区间">
        <el-space class="w-100">
          <NumberInput
            v-model="search.amountMin"
            placeholder="最小值"
            type="number"
            :precision="0"
          />
          <span>-</span>
          <NumberInput
            v-model="search.amountMax"
            placeholder="最大值"
            type="number"
            :precision="0"
          />
        </el-space>
      </el-form-item>
    </template>
    <template #buttons>
      <el-button
        type="success"
        @click="router.push('/B2BOrderNew/add')"
        v-permission="'B2BOrderNewAdd'"
      >
        新增订单
      </el-button>
      <!-- <ErpStockPopover
        name="查询ERP库存可用量"
        :options="batchOptions"
        :intercept="batchIntercept"
      ></ErpStockPopover> -->
      <!-- <ErpStockPopover
        name="查询ERP库存可用量"
        :options="batchOptions"
        :warehouseMap="warehouseMap"
        :queryStockRef="queryStockRef"
        ref="stockPopoverRef"
      >
        <template #reference>
          <el-button type="plain" @click="stockPopoverRef.open()">ERP库存可用量</el-button>
        </template>
      </ErpStockPopover> -->
      <!-- <el-button type="plain" @click="handleQueryStock">查询ERP库存可用量</el-button> -->
      <BatchOperatePophover name="订单处理" :options="batchOptions" :intercept="batchIntercept" />
      <BatchOperatePophover
        name="导入订单"
        :options="batchImportOptions"
        :intercept="batchImportIntercept"
      />
      <!--      <ExportBtn :service="omsApi.omsOrderOrderDownload" :params="search" :plain="false">
              导出
            </ExportBtn>-->
      <BatchOperatePophover
        name="发货处理"
        :options="batchOptions2"
        :intercept="batchIntercept"
        :loading="batchOptionsLoading2"
        v-if="
          !(
            search.orderBigStatus !== '300' &&
            search.orderBigStatus !== '500' &&
            search.orderBigStatus !== ''
          )
        "
      />
    </template>
    <!-- <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div>{{ store.taskMap.B2BOrderSync ? '同步中…' : '同步积加数据' }}</div>
          <div v-if="!store.taskMap.B2BOrderSync">
            上次更新时间：{{ store.taskMap?.lastRefreshTime }}
          </div>
        </template>
        <i
          v-permission="'B2BOrderRefresh'"
          class="iconfont icon-shujutongbu1"
          :class="{ 'icon-loading': store.taskMap.B2BOrderSync }"
          @click="handleRefresh"
        ></i>
      </el-tooltip>
    </template> -->
    <template #export-list>
      <div class="batch-list-item" @click="exportOriginDialogRef?.open">导出原平台订单</div>
      <div class="batch-list-item" @click="batchExportFile">一键下载附件</div>
    </template>
    <template #default="{ tableHeight }">
      <vxe-table
        ref="tableRef"
        :height="tableHeight || 600"
        :data="listData?.recordList"
        v-loading="listLoading"
        border="none"
        :row-config="{ keyField: 'erpCode' }"
        :show-overflow="false"
        :column-config="{ resizable: true }"
        :virtual-y-config="{ enabled: true, gt: 25, oSize: 5 }"
        :cell-config="{ verticalAlign: 'top', padding: false }"
        :checkbox-config="{ reserve: true, checkRowKeys: codeList }"
      >
        <template #empty>
          <div class="list-empty">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" />
            <div v-if="search.meReview" class="list-empty-text">当前暂无审核订单</div>
            <div v-else class="list-empty-text">暂未搜到相关数据</div>
          </div>
        </template>
        <vxe-column type="checkbox" :resizable="false" width="28">
          <template #header="{ checked, indeterminate }">
            <label
              class="header-checkbox"
              @click.stop="
                () => {
                  tableRef.toggleAllCheckboxRow();
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
                  tableRef.toggleCheckboxRow(row);
                  let list = getCheckedList();
                  handleSelectionChange(list);
                }
              "
            >
              <el-checkbox :model-value="checked" />
            </label>
          </template>
        </vxe-column>
        <vxe-column
          field="orderInfo"
          :min-width="detailFields.includes('total') ? '707px' : '654px'"
          class-name="order-info-column"
        >
          <template #header>
            <span style="margin-right: 10px">订单明细</span>
            <el-tooltip :content="allCollapse ? '全部展开' : '全部收起'" placement="top">
              <div class="collapse-control inline">
                <div class="list-collapse" @click="handleAllCollapse">
                  <div
                    class="horizontal-line"
                    :class="[allCollapse ? 'horizontal-collapse' : 'horizontal-expand']"
                  ></div>
                  <div
                    class="vertical-line"
                    :class="[allCollapse ? 'vertical-collapse' : 'vertical-expand']"
                  ></div>
                </div>
              </div>
            </el-tooltip>
          </template>
          <template #default="{ row }">
            <div class="table-item-header">
              <div class="item">
                <span class="item-label">订单号：</span>
                <span class="item-value" @click="gotoDetail(row)">{{ row.erpCode || '-' }}</span>
                <Copy :content="row.erpCode" />
                <Tag :color="tagColor(row.orderStatus)" size="small">
                  {{ row.orderStatusDesc }}
                </Tag>
              </div>
              <div class="item">
                <span class="item-label">参考单号：</span>
                {{ row.refNo || '-' }}
                <Copy :content="row.refNo" />
              </div>
              <!--            <div class="item"><span class="item-label">标签：</span></div>-->
              <div class="item" v-if="row.source === 8">
                <span class="item-label">
                  标签：
                  <ShopifyLabelList :labelList="repArr" />
                </span>
              </div>
            </div>
            <div class="detail-info">
              <div class="detail-left">
                <div class="left-top">
                  <div class="collapse-control">
                    <div
                      class="list-collapse"
                      v-if="row?.itemBeanList?.length > 1"
                      @click="handleCollapse(row)"
                    >
                      <div
                        class="horizontal-line"
                        :class="[row.isCollapse ? 'horizontal-collapse' : 'horizontal-expand']"
                      ></div>
                      <div
                        class="vertical-line"
                        :class="[row.isCollapse ? 'vertical-collapse' : 'vertical-expand']"
                      ></div>
                    </div>
                  </div>
                  <div class="product-list">
                    <div
                      class="product-item"
                      v-for="product in row?.itemBeanList?.slice(
                        0,
                        row.isCollapse ? 1 : row?.itemBeanList?.length
                      )"
                      :key="product?.supplySku"
                    >
                      <div class="left">
                        <div v-if="detailFields?.includes('productImageUrl')" class="product-img">
                          <img
                            v-if="product?.productImageUrl"
                            :src="product?.productImageUrl"
                            alt=""
                          />
                          <img v-else src="@/assets/images/system/empty.png" alt="" />
                          <img
                            v-if="product?.isOutStock"
                            class="outStock"
                            :src="getImg('outStock')"
                            alt=""
                          />
                        </div>
                        <div>
                          <div class="product-title">
                            <OverflowTooltip
                              :content="product?.productName"
                              :line="1"
                              :font-size="12"
                              :color="
                                search.productName &&
                                product.productName?.includes(search.productName)
                                  ? '#F53F3F'
                                  : ''
                              "
                            />
                          </div>
                          <div class="product-sku">
                            <span class="item-label">供应链SKU：</span>
                            <span
                              :class="
                                search.skuKey && product.supplySku?.includes(search.skuKey)
                                  ? 'red'
                                  : ''
                              "
                            >
                              {{ product?.supplySku }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="split"></div>
                      <div class="right">
                        <div v-if="row?.source === 6 && !product?.numInt">
                          <span class="item-label">数量 ：</span>
                          <Tag color="red">数量缺失</Tag>
                        </div>
                        <ItemLabel v-else label="数量" :value="product?.numInt" />
                        <div v-if="row?.source === 6 && !product?.taxPrice">
                          <span class="item-label">销售单价 ：</span>
                          <Tag color="red">价格缺失</Tag>
                        </div>
                        <ItemLabel
                          v-else
                          label="销售单价"
                          :value="`含税${product?.taxPrice} / 不含税${product?.price}`"
                        />
                      </div>
                    </div>
                    <div :class="{ 'order-remark': detailFields?.includes('productImageUrl') }">
                      <span class="item-label">备注：</span>
                      <OverflowTooltip :content="row?.remarkList?.[0]?.remark" :line="2" />
                      <i
                        class="iconfont icon-bianji"
                        @click="
                          (e) => {
                            handleRemark(e, row);
                          }
                        "
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="left-bottom">
                  <div class="remark" v-if="row.errorRemark">
                    <span class="error-remark">
                      <i class="iconfont icon-xianxingtubiaoxinxizhuangtai"></i>
                      异常信息：
                    </span>
                    <span class="text-break">{{ row.errorRemark }}</span>
                  </div>
                  <div class="remark">
                    <span
                      class="customer-remark"
                      v-if="
                        row?.customerRemark ||
                        !(row?.orderStatus === 600 || row?.orderStatus === 400)
                      "
                    >
                      客服备注：
                    </span>
                    <OverflowTooltip :content="row?.customerRemark" :line="2" />
                    <i
                      v-if="!(row?.orderStatus === 600 || row?.orderStatus === 400)"
                      class="iconfont icon-bianji"
                      @click="
                        (e) => {
                          handleCustomerRemark(e, row);
                        }
                      "
                    ></i>
                  </div>
                </div>
              </div>
              <div class="child-column other-info total" v-if="detailFields?.includes('total')">
                <ItemLabel label="总数量" :value="row?.total" :color="'#FF663E'" />
              </div>
              <div class="child-column other-info">
                <ItemLabel
                  label="客户名称"
                  :value="row?.customerDesc"
                  :color="
                    search.customerName && row?.customerDesc?.includes(search.customerName)
                      ? '#F53F3F'
                      : ''
                  "
                />
                <ItemLabel
                  v-if="detailFields?.includes('shopAccount')"
                  label="卖家账号"
                  :value="row?.shopAccount"
                />
                <ItemLabel
                  v-if="detailFields?.includes('creator')"
                  label="创建人"
                  :value="row?.creator"
                />
                <ItemLabel
                  v-if="
                    detailFields?.includes('waitAuditOperatorList') &&
                    row?.waitAuditOperatorList?.length > 0
                  "
                  label="当前待审核人"
                  :value="row?.waitAuditOperatorList?.join(',')"
                />
                <ItemLabel
                  v-if="detailFields?.includes('sourceDesc')"
                  label="订单来源"
                  :value="row?.sourceDesc"
                />
                <ItemLabel
                  v-if="detailFields?.includes('orderSaleTypeDesc')"
                  label="订单渠道"
                  :value="row?.orderSaleTypeDesc"
                />
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column v-if="showColumn('订单金额')" title="订单金额" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <ChildColumn title="订单金额" :custom-field-list="customFieldList" :row="row" />
          </template>
        </vxe-column>
        <vxe-column v-if="showColumn('发货信息')" title="发货信息" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <ChildColumn title="发货信息" :custom-field-list="customFieldList" :row="row" />
          </template>
        </vxe-column>
        <vxe-column v-if="showColumn('时间')" title="时间" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <ChildColumn title="时间" :custom-field-list="customFieldList" :row="row" />
          </template>
        </vxe-column>
        <!-- width="52px" -->
        <vxe-column title="操作" width="100px" fixed="right">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="child-column">
              <KeenActions
                class="actions"
                display-style="buttons"
                :actions="[
                  {
                    label: '重新物流下单',
                    key: 'orderAgain',
                    type: 'primary',
                    text: true,
                    hide: ![537].includes(+row.orderStatus),
                    // hide: !(
                    //   [102, 503, 506].includes(+row.orderStatus) || search.orderBigStatus === '200'
                    // ),
                    row: row,
                  },
                  {
                    label: '编辑',
                    key: 'edit',
                    type: 'primary',
                    text: true,
                    hide:
                      (!(
                        row.orderStatus >= 500 &&
                        row.orderStatus < 600 &&
                        row.orderStatus !== 503 &&
                        row.orderStatus !== 518 &&
                        row.orderStatus !== 519 &&
                        row.orderStatus !== 507 &&
                        row.orderStatus !== 520 &&
                        row.orderStatus !== 530
                      ) &&
                        row.orderStatus !== 101) ||
                      row.sourceDesc === 'CRM',
                    row: row,
                    permissionCode: 'B2BOrderNewEdit',
                  },
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    text: true,
                    row: row,
                    permissionCode: 'B2BOrderNewDetail',
                  },
                  {
                    label: '审核',
                    key: 'audit',
                    type: 'warning',
                    text: true,
                    row: row,
                    hide: ![202].includes(row.orderStatus) || !row.button?.showAuthButton,
                    permissionCode: 'B2BOrderNewAudit',
                  },
                  {
                    label: '复制',
                    key: 'copy',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: row.sourceDesc === 'CRM',
                    permissionCode: 'B2BOrderCopy',
                  },
                  {
                    label: '作废',
                    key: 'cancel',
                    type: 'danger',
                    text: true,
                    hide: [400, 600].includes(+row.orderStatus),
                    row: row,
                    permissionCode: 'B2BOrderCancel',
                  },
                  {
                    label: '拆单',
                    key: 'subOrder',
                    type: 'primary',
                    text: true,
                    hide: ![102, 503, 506, 516, 517, 521].includes(+row.orderStatus),
                    // hide: !(
                    //   [102, 503, 506].includes(+row.orderStatus) || search.orderBigStatus === '200'
                    // ),
                    row: row,
                    permissionCode: 'B2BOrderNewSubOrder',
                  },
                  {
                    label: '重推',
                    key: 'rePush',
                    type: 'primary',
                    hide: row.orderStatus !== 512,
                    row,
                  },
                  {
                    label: '附件',
                    key: 'attachment',
                    type: 'primary',
                    text: true,
                    row: row,
                    permissionCode: 'B2BOrderNewDetail',
                  },
                ]"
                @click="handleActions"
              />
            </div>
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
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :params="search"
    @close="batchUpdate"
    :order-code-list="codeList"
  />
  <BatchAuditModal
    v-if="batchAuditVisible"
    :visible="batchAuditVisible"
    :params="search"
    @close="batchAudit"
    @time-out="handleTimeout"
    :order-code-list="codeList"
    :batch-audit-type="batchAuditType"
  />
  <RemarkDialog ref="remarkRef" @success="refreshList" />
  <ImportDialog ref="importDialogRef" :params="search" @success="handleImportSuccess" />
  <Detail ref="detailRef" :listData="listData?.recordList" />
  <ExportOriginDialog ref="exportOriginDialogRef" />
  <ExportOriginDialog2 ref="exportOriginDialogRef2" @close="clearCheckBoxSelection()" />
  <SubOrderDialog ref="subOrderDialogRef" @success="refreshList" />
  <InventoryPreCheckDialog ref="inventoryPreCheckDialogRef" />
  <BatchReplacementDialog ref="batchReplacementDialogRef" @close="handleClose" />
  <BatchToDeliveryDialog ref="BatchToDeliveryRef" @close="handleClose" />
  <EditNoticeModal ref="editNoticeRef" @close="handleClose" />
  <QueryStockDialog ref="queryStockRef" @close="handleClose" />
  <div class="remark-popover">
    <header class="header">订单备注</header>
    <el-input v-model="remark" type="textarea" :rows="6" maxlength="200" show-word-limit />
    <footer class="footer">
      <el-button size="small" v-if="remark" class="left" @click.stop="remark = ''">清空</el-button>
      <el-space :size="8">
        <el-button size="small" @click="hidePopovers">取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSaveRemark(remarkRow)"
          :loading="saveRemarkLoading"
        >
          确定
        </el-button>
      </el-space>
    </footer>
  </div>
  <BatchSetStockModal title="设定仓库物流" ref="batchSetStockRef" @close="handleClose" />
  <div class="customer-remark-popover">
    <header class="header">客服备注</header>
    <el-input v-model="customerRemark" type="textarea" :rows="6" maxlength="200" show-word-limit />
    <footer class="footer">
      <el-button v-if="customerRemark" size="small" class="left" @click.stop="customerRemark = ''">
        清空
      </el-button>
      <el-space :size="8">
        <el-button size="small" @click="hideCustomerPopovers">取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSaveCustomerRemark(remarkRow)"
          :loading="saveCustomerRemarkLoading"
        >
          确定
        </el-button>
      </el-space>
    </footer>
  </div>
  <LogisticsOrderDialog ref="logisticsOrderRef" @submit="refreshList" />
</template>

<script lang="ts" setup name="B2BOrderNew">
  import { erpApi, memberApi, ErpApi, platformApi, omsApi, OmsApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useTask from '@/store/modules/task';
  import { B2BOrderRefresh, stopB2BOrderRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import BatchUpdateModal from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/BatchUpdateModal.vue';
  import { DictBean } from '@/api/erp/data-contracts';
  import BatchAuditModal from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/BatchAuditModal.vue';
  import RemarkDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/RemarkDialog.vue';
  import { ref } from 'vue';
  import dayjs from 'dayjs';
  import { checkPermission } from '@/utils/permission';
  import ImportDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/importDialog.vue'; // 订单渠道
  import Detail from '@/views/supplyChainManage/B2BOrder/orderManageNew/detail.vue';
  import customFields from '@/views/supplyChainManage/B2BOrder/orderManageNew/customFields';
  import customExportFields from '@/views/supplyChainManage/B2BOrder/orderManageNew/customExportFields';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ItemLabel.vue';
  import ChildColumn from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ChildColumn.vue';
  import { getCurCheckedArr } from '@/utils/customFields';
  import ExportOriginDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ExportOriginDialog.vue';
  import ExportOriginDialog2 from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ExportOriginDialog2.vue';
  import SubOrderDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/SubOrderDialog.vue';
  import InventoryPreCheckDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/InventoryPreCheckDialog.vue';
  import BatchReplacementDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/BatchReplacementDialog.vue';
  import BatchToDeliveryDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components//BatchToDelivery.vue';
  import QueryStockDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/QueryStock.vue';
  import EditNoticeModal from '@/views/supplyChainManage/B2BOrder/orderManage/components/EditNoticeModal.vue';
  import OrderSaleSelect from './components/OrderSaleSelect.vue';
  import ErpStockPopover from './components/ErpStockPopover.vue';
  import BatchSetStockModal from './components/BatchSetStockModal.vue';
  import LogisticsOrderDialog from '@/views/supplyChainManage/efficiencyTools/selfLogisticsOrder/components/LogisticsOrderDialog.vue';
  import ShopifyLabelList from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/shopifyLabelList.vue';

  const repArr: any = [
    {
      // erpCode: 'CO251229007205_2',
      labelCode: 'L2025122616221539624107',
      labelName: 'replacement',
    },
  ];
  const searchTypeMap = {
    1: '订单号',
    2: '参考单号',
    3: '运单号',
    4: '跟踪单号',
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '100', code: 'waitConfirm', statusName: '待确认', count: '' },
    { status: '200', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '300', code: 'waitSend', statusName: '待发货', count: '' },
    { status: '400', code: 'send', statusName: '已发货', count: '' },
    {
      status: '500',
      code: 'error',
      statusName: '异常',
      count: '',
      children: [
        // {
        //   groupName: '待确认',
        //   list: [
        //     { status: '501', code: 'DING_ERROR', statusName: '钉钉审核失败异常', count: '' },
        //     { status: '502', code: 'FROZEN_ERROR', statusName: 'ec冻结', count: '' },
        //   ],
        // },
        {
          groupName: '待审核',
          list: [
            { status: '505', code: 'OS_AUTH_ERROR', statusName: '系统内部审核失败', count: '' },
            { status: '510', code: 'NO_FLOW_ERROR', statusName: '无法获取审核流', count: '' },
          ],
        },
        {
          groupName: '待发货',
          list: [
            // { status: '500', code: 'EC_ERROR', statusName: 'ec推送异常', count: '' },
            { status: '506', code: 'OUT_OF_STOCK_ERROR_OS', statusName: '缺货(OS)', count: '' },
            // {
            //   status: '503',
            //   code: 'OUT_OF_STOCK_ERROR',
            //   statusName: '第三方系统内缺货',
            //   count: '',
            // },
            // {
            //   status: '515',
            //   code: 'WAIT_SEND_CONFIRM_ERROR',
            //   statusName: '转待发货订单确认',
            //   count: '',
            // },
            { status: '537', code: 'LOGISTICS_ERROR', statusName: '物流下单失败', count: '' },
            { status: '516', code: 'RESERVE_ERROR', statusName: '预占失败', count: '' },
            { status: '517', code: 'COMMIT_OUT_ERROR', statusName: '提交出库失败', count: '' },
            { status: '521', code: 'CANCEL_OUTBOUND', statusName: '截单失败', count: '' },
            {
              status: '518',
              code: 'OUT_BOUND_FAILED_ERROR',
              statusName: '仓库出库失败',
              count: '',
            },
            {
              status: '519',
              code: 'GET_JJ_OUTBOUND_ERROR',
              statusName: '未获取到积加出库单',
              count: '',
            },
            {
              status: '520',
              code: 'CREDIT_LIMIT_ERROR',
              statusName: '信用额度预占失败',
              count: '',
            },
            // { status: '504', code: 'PROBLEM_ERROR', statusName: '问题件', count: '' },
            { status: '507', code: 'JJ_PUSH_ERROR', statusName: '积加推送异常', count: '' },
            { status: '530', code: 'CANCEL_REVERSE_ERROR', statusName: '取消预占失败', count: '' },
            // { status: '508', code: 'JJ_ERROR', statusName: '积加内部异常', count: '' },
            // { status: '509', code: 'JJ_CANCEL_ERROR', statusName: '积加取消异常', count: '' },
            // { status: '511', code: 'CANCLE_ERROR', statusName: '订单取消失败', count: '' },
            // { status: '512', code: 'PUSH_WMS_ERROR', statusName: '推送第三方WMS异常', count: '' },
            // {
            //   status: '513',
            //   code: 'OUT_OF_AMOUNT_ERROR_WMS',
            //   statusName: '第三方系统欠费',
            //   count: '',
            // },
            // { status: '514', code: 'WMS_ERROR', statusName: '第三方WMS异常', count: '' },
          ],
        },
      ],
    },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const store = useTask();
  const user = useStore();
  const statusColorMap = {
    100: 'blue',
    101: 'gray',
    102: 'blue',
    200: 'orange',
    201: 'purple',
    202: 'yellow',
    300: 'blue',
    400: 'green',
    500: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    504: 'red',
    505: 'red',
    506: 'red',
    507: 'red',
    508: 'red',
    600: 'gray',
  };
  const tagColor = (status: any) => {
    if (statusColorMap[status]) {
      return statusColorMap[status];
    }
    if (status > 500 && status < 600) {
      return 'red';
    }
    return '';
  };

  const orderSaleTypeListSelectRef = ref(null);
  const countryCodeListSelectRef = ref(null);
  const warehouseCodeSelectRef = ref(null);
  const shippingSelectRef = ref(null);
  const customerTypeListSelectRef = ref(null);
  const auditCodeSelectRef = ref(null);
  const batchSetStockRef = ref(null);

  const time = ref<any>([]);
  const expectedSendTime = ref<any>([]);
  const expectedArrivalTime = ref<any>([]);
  const route = useRoute();
  const router = useRouter();
  const timeType = ref<number>(1);
  const pickerWidth = ref<number>(186);
  const handleTimeChange = (val) => {
    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    search.signInTimeStart = undefined;
    search.signInTimeEnd = undefined;
    search.sendTimeStart = undefined;
    search.sendTimeEnd = undefined;
    search.operationExpectedArrivalTimeStart = undefined;
    search.operationExpectedArrivalTimeEnd = undefined;
    search.platformExpectedSendTimeStart = undefined;
    search.platformExpectedSendTimeEnd = undefined;
    search.logisticsAuditTimeStart = undefined;
    search.logisticsAuditTimeEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.createTimeStart = val[0] || '';
        search.createTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.signInTimeStart = val[0] || '';
        search.signInTimeEnd = val[1] || '';
      } else if (timeType.value === 3) {
        search.sendTimeStart = val[0] || '';
        search.sendTimeEnd = val[1] || '';
      } else if (timeType.value === 4) {
        search.operationExpectedArrivalTimeStart = val[0] || '';
        search.operationExpectedArrivalTimeEnd = val[1] || '';
      } else if (timeType.value === 5) {
        search.platformExpectedSendTimeStart = val[0] || '';
        search.platformExpectedSendTimeEnd = val[1] || '';
      } else if (timeType.value === 6) {
        search.logisticsAuditTimeStart = val[0] || '';
        search.logisticsAuditTimeEnd = val[1] || '';
      }
      pickerWidth.value = 245;
    } else {
      pickerWidth.value = 186;
    }
  };

  let sendParam = {};
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const batchSearchRef = ref();
  const batchSearchRef2 = ref();
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
    resetSearch,
    runQuery,
  } = useList<
    // ErpApi.LuteosErpOrderQueryList.RequestBody,
    // ErpApi.LuteosErpOrderQueryList.ResponseBody
    OmsApi.OmsOrderQueryList.RequestBody,
    OmsApi.OmsOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      searchType: 1,
      searchKey: undefined,
      orderCode: undefined,
      customerName: undefined,
      productName: undefined,
      skuCode: undefined,
      skuKey: undefined,
      creator: '',
      creatorList: [],
      orderSaleTypeList: [], // 订单渠道
      skuKeys: [], // sku数组
      orderBigStatus: '',
      // createTimeEnd: undefined,
      // createTimeStart: undefined,
      createTimeStart: dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      createTimeEnd: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      signInTimeStart: undefined,
      signInTimeEnd: undefined,
      sendTimeStart: undefined,
      sendTimeEnd: undefined,
      type: 1 /* 类型：0-红人发样单 1-线下订单 */,
      meReview: undefined,
      shippingCode: undefined,
      warehouseCode: undefined,
      amountMin: undefined,
      amountMax: undefined,
      auditCode: undefined,
      platformExpectedSendTimeStart: undefined,
      platformExpectedSendTimeEnd: undefined,
      logisticsAuditTimeStart: undefined,
      logisticsAuditTimeEnd: undefined,
      operationExpectedArrivalTimeStart: undefined,
      operationExpectedArrivalTimeEnd: undefined,
      countryCodeList: undefined,
      customerTypeList: undefined,
      statusList: undefined,
    },
    pageSize: PAGE_SIZE,
    // service: erpApi.luteosErpOrderQueryList,
    service: omsApi.omsOrderQueryList,
    interceptSearchData: (searchData) => {
      const { orderBigStatus, statusList } = searchData;
      sendParam = {
        ...searchData,
        orderBigStatus: statusList?.length ? undefined : orderBigStatus,
      };
      return {
        ...searchData,
        orderBigStatus: statusList?.length ? undefined : orderBigStatus,
      };
    },
  });

  const selectedList = computed(() => {
    return [
      {
        label: searchTypeMap[search?.searchType],
        key: 'searchKey',
        value: search?.searchKey,
      },
      // {
      //   label: '订单渠道',
      //   key: 'orderSaleTypeList',
      //   value: orderSaleTypeListSelectRef.value?.getSelectedLabel(),
      // },
      // {
      //   label: '收件人国家/地区',
      //   key: 'countryCodeList',
      //   value: countryCodeListSelectRef.value?.getSelectedLabel(),
      // },
      {
        label: '发货仓库',
        key: 'warehouseCode',
        value: warehouseCodeSelectRef.value?.selectedLabel,
      },
      {
        label: '物流渠道',
        key: 'shippingCode',
        value: shippingSelectRef.value?.selectedLabel,
      },
      {
        label: '客户类型',
        key: 'customerTypeList',
        value: customerTypeListSelectRef.value?.selectedLabel,
      },
      {
        label: '审核人',
        key: 'auditCode',
        value: auditCodeSelectRef.value?.getSelectedLabel(),
      },
      {
        label: '金额区间最小值',
        key: 'amountMin',
        value: search.amountMin,
      },
      {
        label: '金额区间最大值',
        key: 'amountMax',
        value: search.amountMax,
      },
      {
        label: '供应链SKU',
        key: 'skuKeys',
        value: search?.skuKeys,
      },
    ];
  });
  // 获取统计数据
  const countListData: any = ref([]);
  const queryTabCount = async () => {
    // console.log('sendParam', sendParam);
    const res = await omsApi.omsOrderQueryListCount(sendParam);
    countListData.value = res || [];
  };
  const clearAll = () => {
    selectedList.value?.forEach((item) => {
      search[item?.key] = undefined;
    });
    batchSearchRef.value?.clear();
    batchSearchRef2.value?.clear();
  };
  const inputWidth = ref<number>(258);
  const handleInputChange = (e) => {
    if (e) {
      inputWidth.value = 310;
    } else {
      inputWidth.value = 258;
    }
  };
  const handleBlur = (e) => {
    if (e.target?.value) {
      search.searchKey = '';
      batchSearchRef.value?.clear();
    }
  };
  const handleBlur2 = (e) => {
    if (e.target?.value) {
      search.skuKeys = [];
      batchSearchRef2.value?.clear();
    }
  };

  const handleBatchClear = (val) => {
    search.searchKey = '';
  };
  const handleBatchSearch = (val) => {
    search.orderCode = undefined;
    search.searchKey = val?.replace(/\n/g, ',');
  };
  const handleBatchClear2 = (val) => {
    search.skuKeys = [];
  };
  const handleBatchSearch2 = (val) => {
    search.skuKey = undefined;
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    // console.log(arr);
    if (arr.length === 0) {
      ElMessage.warning('请输入供应链SKU');
      return;
    }
    search.skuKeys = arr;
    // if (!search.warehouseCode) {
    //   ElMessage.warning('请选择发货仓');
    //   return;
    // }
    // const param = { supplySkuList: arr, warehouseCode: search.warehouseCode };
    // queryStockRef.value?.open(param);
  };

  // 表格选择
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.erpCode);
  };
  const clearCheckBoxSelection = () => {
    tableRef.value.clearCheckboxRow();
    tableRef.value?.clearCheckboxReserve?.();
    codeList.value = [];
  };

  const getCheckedList = () => {
    const list = tableRef.value.getCheckboxRecords(true) || [];
    const reserveList = tableRef.value.getCheckboxReserveRecords(true) || [];
    return [...list, ...reserveList];
  };

  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const initDickBook = async () => {
    await getCreatorList();
  };

  const remarkRef = ref();
  const detailRef = ref();
  const gotoDetail = async (row) => {
    detailRef.value?.open(row.erpCode);
  };

  const handleCollapse = (row) => {
    row.isCollapse = !row.isCollapse;
    nextTick(() => {
      // 虚拟滚动开启，当收起展开时，需要手动设置行高
      const minHeight = 240;
      if (row.isCollapse) {
        tableRef.value.setRowHeight(row, minHeight);
      } else {
        const table = tableRef.value;
        const orderInfoCell = table.getCellElement(row, 'orderInfo');
        if (orderInfoCell) {
          const cellInnerWrap = orderInfoCell.querySelector('.vxe-cell--wrapper');
          if (cellInnerWrap) {
            let height = cellInnerWrap.clientHeight;
            if (height < minHeight) {
              height = minHeight;
            }
            table.setRowHeight(row, height);
          }
        }
      }
    });
  };
  const allCollapse = ref(false);
  const handleAllCollapse = (row) => {
    for (let i = 0; i < listData.value.recordList.length; i += 1) {
      const item: any = listData.value.recordList[i];
      item.isCollapse = allCollapse.value;
      handleCollapse(item);
    }
    allCollapse.value = !allCollapse.value;
  };

  const subOrderDialogRef = ref();
  const logisticsOrderRef = ref(null);
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      // const path = router.resolve({
      //   name: 'B2BOrderNewDetail',
      //   query: { code: row.erpCode },
      // });
      // router.push(path.href);
      detailRef.value?.open(row.erpCode);
      // const path = router.resolve({
      //   name: 'B2BOrderNewAudit',
      //   query: { code: row.erpCode },
      // });
      // router.push(path.href);
    } else if (key === 'attachment') {
      // const path = router.resolve({
      //   name: 'B2BOrderNewDetail',
      //   query: { code: row.erpCode, activated: 3 },
      // });
      // router.push(path.href);
      detailRef.value?.open(row.erpCode, 3);
    } else if (key === 'copy') {
      const path = router.resolve({
        name: 'B2BOrderNewAdd',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancelOrder(row);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'B2BOrderNewEdit',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'audit') {
      const path = router.resolve({
        name: 'B2BOrderNewAudit',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'subOrder') {
      subOrderDialogRef.value?.open(row.erpCode);
    } else if (key === 'remark') {
      remarkRef.value.open([row.erpCode]);
    } else if (key === 'rePush') {
      rePush([row?.erpCode]);
    } else if (key === 'orderAgain') {
      // 重新下单
      logisticsOrderRef.value?.open({ orderCode: row.erpCode, type: 'shopify' });
    }
  };
  const cancelOrder = async (row) => {
    const res = await swal.confirm({
      title: `确定作废订单吗`,
      text: '作废订单后该订单将无法恢复',
    });
    if (res) {
      await omsApi.omsOrderAbandon({
        erpCode: row.erpCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  // 订单备注
  const remark = ref();
  const remarkRow = ref();
  const hidePopovers = () => {
    const remarkPopover = document.querySelector('.remark-popover');
    if (!remarkPopover) return;
    remarkPopover.style.display = 'none';
  };

  const handleRemark = (e, row) => {
    remarkRow.value = row;
    remark.value = row?.remarkList?.[0]?.remark;
    const remarkPopover = document.querySelector('.remark-popover');
    if (!remarkPopover) return;

    // 设置基本样式
    remarkPopover.style.position = 'absolute';
    remarkPopover.style.zIndex = '9999';
    remarkPopover.style.display = 'block';

    // 获取点击元素的位置
    const targetRect = e.target.getBoundingClientRect();

    // 设置 popover 显示在点击元素右侧
    const left = targetRect.right + 9; // 右边距 10px
    const top = targetRect.top - 200; // 对齐顶部

    remarkPopover.style.left = `${left}px`;
    remarkPopover.style.top = `${top}px`;
  };

  const saveRemarkLoading = ref(false);
  const handleSaveRemark = async (row) => {
    if (!remark.value) {
      ElMessage.warning('请输入备注');
      return;
    }
    try {
      saveRemarkLoading.value = true;
      await omsApi.omsOrderSaveRemark({
        erpCodes: [row?.erpCode],
        remark: remark.value,
      });
      ElMessage.success('备注成功');
      if (!row.remarkList) {
        row.remarkList = [];
      }
      row.remarkList?.unshift({ remark: remark.value });
      hidePopovers();
    } finally {
      saveRemarkLoading.value = false;
    }
  };

  // 客服备注
  const customerRemark = ref();
  const hideCustomerPopovers = () => {
    const remarkPopover = document.querySelector('.customer-remark-popover');
    if (!remarkPopover) return;
    remarkPopover.style.display = 'none';
  };

  const handleCustomerRemark = (e, row) => {
    remarkRow.value = row;
    customerRemark.value = row?.customerRemark;
    const remarkPopover = document.querySelector('.customer-remark-popover');
    if (!remarkPopover) return;

    // 设置基本样式
    remarkPopover.style.position = 'absolute';
    remarkPopover.style.zIndex = '9999';
    remarkPopover.style.display = 'block';

    // 获取点击元素的位置
    const targetRect = e.target.getBoundingClientRect();

    // 设置 popover 显示在点击元素右侧
    const left = targetRect.right + 9; // 右边距 10px
    const top = targetRect.top - 200; // 对齐顶部

    remarkPopover.style.left = `${left}px`;
    remarkPopover.style.top = `${top}px`;
  };

  const saveCustomerRemarkLoading = ref(false);
  const handleSaveCustomerRemark = async (row) => {
    try {
      saveCustomerRemarkLoading.value = true;
      const res = await omsApi.omsOrderUpdateCustomRemark({
        erpCode: row?.erpCode,
        customRemark: customerRemark.value,
      });
      ElMessage.success('备注成功');
      row.customerRemark = customerRemark.value;
      hideCustomerPopovers();
    } finally {
      saveCustomerRemarkLoading.value = false;
    }
  };

  // 页面点击隐藏弹出层
  const handleClickOutside = (e) => {
    const remarkPopover = document.querySelector('.remark-popover');
    const customerRemarkPopover = document.querySelector('.customer-remark-popover');

    const isClickInsideRemark = remarkPopover?.contains(e.target);
    const isClickInsideCustomer = customerRemarkPopover?.contains(e.target);

    // 如果点击的是 popover 外部，则隐藏
    if (!isClickInsideRemark && !e.target.closest('.icon-bianji')) {
      hidePopovers();
    }

    if (!isClickInsideCustomer && !e.target.closest('.icon-bianji')) {
      hideCustomerPopovers();
    }
  };

  const handleRefresh = async () => {
    // if (store.taskMap.B2BOrderSync) {
    //   return;
    // }
    // await omsApi.omsPlatformRefresh({
    //   modelCode: 'ERP_ORDER',
    //   forceRefresh: true,
    //   param: {
    //     type: 1,
    //   },
    // });
    // store.taskMap.B2BOrderSync = true;
    // B2BOrderRefresh(user.token as string);
  };

  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      clearCheckBoxSelection();
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 超时处理
  const handleTimeout = () => {
    clearCheckBoxSelection();
    refreshList();
    batchUpdateVisible.value = false;
  };

  // 批量审核
  const batchAuditVisible = ref<boolean>(false);
  const batchAuditType = ref<string>('');

  const batchAudit = (reload) => {
    if (reload) {
      clearCheckBoxSelection();
      refreshList();
    }
    batchAuditVisible.value = false;
  };

  const handleBatchAudit = (type = null) => {
    const illegalList = getCheckedList()
      ?.filter((item) => !item.button?.showAuthButton)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非当前账号审核节点，请重新选择`);
      return;
    }
    batchAuditVisible.value = true;
    batchAuditType.value = type;
  };

  const batchAbandon = async () => {
    const isConfirmed = await swal.confirm('订单确定要全部作废吗？');
    if (!isConfirmed) return;
    const res = await omsApi.omsOrderBatchAbandon({
      orderCodeList: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res?.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('作废成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };

  const exportOriginDialogRef2 = ref();
  const batchExportFile = async () => {
    const isSelect = batchIntercept();
    if (!isSelect) {
      return;
    }
    exportOriginDialogRef2.value?.open(codeList.value);
    // clearCheckBoxSelection();
    // refreshList();
  };
  // 取消预占
  const cancelReverse = async () => {
    const illegalList = tableRef.value
      ?.getCheckboxRecords()
      ?.filter((item) => item?.orderStatus !== 530);
    if (illegalList.length > 0) {
      // ElMessage.warning('存在非取消预占失败订单，请重新选择');
      ElMessage.warning('只有取消预占失败的订单支持【取消预占】操作');
      return;
    }
    const res = await omsApi.omsOrderCancelReverse({
      codes: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('取消预占成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };
  // 取消出库
  const batchOptionsLoading2 = ref(false);
  const cancelOutbound = async () => {
    // const illegalList = getCheckedList();
    // if (illegalList.length > 1) {
    //   ElMessage.warning(`请选择一个订单`);
    //   return;
    // }
    const isConfirmed = await swal.confirm('确定要全部取消出库吗？');
    if (!isConfirmed) return;
    try {
      const res = await omsApi.omsOrderCancelOutbound({
        codes: codeList.value,
      });
      if (res?.failList.length > 0) {
        const content = res.failList
          .map((item) => {
            return `订单号：${item.orderCode}，失败原因：${item.message}`;
          })
          ?.join('\n');
        ElMessage.error(content);
      } else {
        ElMessage.success('取消出库成功');
      }
      clearCheckBoxSelection();
      refreshList();
      batchOptionsLoading2.value = true;
    } finally {
      batchOptionsLoading2.value = false;
    }
  };
  // 提交预占
  const submitReverse = async () => {
    // const illegalList = getCheckedList();
    // if (illegalList.length > 1) {
    //   ElMessage.warning(`请选择一个订单`);
    //   return;
    // }
    const res = await omsApi.omsOrderSubmitReverse({
      codes: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('提交预占成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };
  // 提交出库
  const submitOutbound = async () => {
    // const illegalList = getCheckedList();
    // if (illegalList.length > 1) {
    //   ElMessage.warning(`请选择一个订单`);
    //   return;
    // }
    const isConfirmed = await swal.confirm('确定要全部提交出库吗？');
    if (!isConfirmed) return;
    try {
      batchOptionsLoading2.value = true;
      const res = await omsApi.omsOrderSubmitOutbound({
        codes: codeList.value,
      });
      if (res?.failList.length > 0) {
        const content = res.failList
          .map((item) => {
            return `订单号：${item.orderCode}，失败原因：${item.message}`;
          })
          ?.join('\n');
        ElMessage.error(content);
      } else {
        ElMessage.success('提交出库成功');
      }
      clearCheckBoxSelection();
      refreshList();
    } finally {
      batchOptionsLoading2.value = false;
    }
  };
  // 批量转待审核
  const batchToAudit = async () => {
    const isConfirmed = await swal.confirm('订单确定要全部转待审核状态吗？');
    if (!isConfirmed) return;
    const illegalList = getCheckedList()
      ?.filter((item) => item.orderStatus !== 101 && item.orderStatus !== 506)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非草稿或ec缺货(os)状态，请重新选择`);
      return;
    }
    const res = await omsApi.omsOrderBatchToAudit({
      orderCodeList: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('转待审核成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };

  // 预校验库存
  const inventoryPreCheckDialogRef = ref();
  const inventoryPreCheck = () => {
    const illegalList = getCheckedList()?.filter((item) => item?.orderStatus >= 200);
    if (illegalList.length > 0) {
      ElMessage.warning('存在非待确认订单，请重新选择');
      return;
    }
    inventoryPreCheckDialogRef.value?.open(codeList.value);
  };

  const batchReplacementDialogRef = ref();
  const batchReplacement = () => {
    const illegalList = getCheckedList()?.filter(
      (item) =>
        search.orderBigStatus !== '100' &&
        item?.orderStatus !== 506 &&
        item?.orderStatus !== 516 &&
        item?.orderStatus !== 517 &&
        item?.orderStatus !== 518 &&
        item?.orderStatus !== 521 &&
        item?.orderStatus !== 537
    );
    if (illegalList.length > 0) {
      ElMessage.warning(
        '存在非待确认/缺货(OS)/预占失败/提交出库失败/截单失败/仓库出库失败/物流下单失败订单，请重新选择'
      );
      return;
    }
    batchReplacementDialogRef.value?.open(codeList.value);
  };
  const BatchToDeliveryRef = ref();
  // 批量下单到物流
  const handleBatchToDelivery = (type = null) => {
    // 校验审核节点  ,暂时去掉
    const illegalList = getCheckedList()
      ?.filter((item) => !item.button?.showAuthButton)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非当前账号审核节点，请重新选择`);
      return;
    }
    // ??? 不需要检验其他
    // const illegalList = tableRef.value
    //   ?.getCheckboxRecords()
    //   ?.filter((item) => item?.orderStatus !== 506);
    // if (illegalList.length > 0) {
    //   ElMessage.warning('存在非缺货(OS)订单，请重新选择');
    //   return;
    // }
    // console.log(codeList.value);
    BatchToDeliveryRef.value?.open(codeList.value);
  };
  // 批量设置仓库物流
  const handleBatchSetStock = () => {
    const illegalList = getCheckedList()?.filter(
      (item) =>
        search.orderBigStatus !== '100' &&
        item?.orderStatus !== 506 &&
        item?.orderStatus !== 516 &&
        item?.orderStatus !== 517 &&
        item?.orderStatus !== 521 &&
        item?.orderStatus !== 537
    );
    if (illegalList.length > 0) {
      ElMessage.warning(
        '存在非待确认/缺货(OS)/预占失败/提交出库失败/截单失败/物流下单失败订单，请重新选择'
      );
      return;
    }
    batchSetStockRef.value?.open(codeList.value);
  };

  const editNoticeRef = ref();
  // 发货通知
  const handleDeliveryNotice = (type = null) => {
    // let arr = tableRef.value?.getCheckboxRecords();
    // arr[0].spsSendNoticeCustomer = true;
    // arr[0].spsShipCodeExpress = true;
    // arr[1].spsSendNoticeCustomer = true;
    // arr[1].spsShipCodeExpress = true;
    // console.log(arr);
    //  需要检验  , 是否能通知 , 以及 发货方式
    const illegalList = tableRef.value
      ?.getCheckboxRecords()
      ?.filter((item) => item?.spsSendNoticeCustomer === false);
    if (illegalList.length > 0) {
      ElMessage.warning('存在非沃尔玛订单，请重新选择');
      return;
    }
    // console.log('illegalList', illegalList);
    // 配送方式是否 全部卡车
    const isAllCar = tableRef.value
      ?.getCheckboxRecords()
      ?.filter((item: any) => item.spsShipCodeExpress === false);
    // console.log('isAllCar', isAllCar);
    if (
      tableRef.value?.getCheckboxRecords().length > 1 &&
      isAllCar.length === tableRef.value?.getCheckboxRecords().length
    ) {
      ElMessage.warning('订单的物流方式为卡车，请逐单填写');
      return;
    }
    // 配送方式是否 全部快递
    const isAllExpress = tableRef.value
      ?.getCheckboxRecords()
      ?.filter((item: any) => item.spsShipCodeExpress === true);
    // console.log('isAllExpress', isAllExpress);
    if (isAllExpress.length > 0 && isAllCar.length > 0) {
      ElMessage.warning('订单存在多个物流方式，请重新勾选！');
      return;
    }
    editNoticeRef.value?.open(codeList.value);
  };
  const handleCreditLimitLockRetry = async (type = null) => {
    // const illegalList = tableRef.value
    //   ?.getCheckboxRecords()
    //   ?.filter((item) => item?.spsSendNoticeCustomer === false);
    // if (illegalList.length > 0) {
    //   ElMessage.warning('存在非沃尔玛订单，请重新选择');
    //   return;
    // }
    const res = await omsApi.omsOrderCreditLimitLockRetry({
      erpCodeList: codeList.value,
    });
    // console.log(res);
    if (res?.failList?.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('操作成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };

  const queryStockRef = ref();
  const stockPopoverRef = ref();
  const handleQueryStock = (param) => {
    console.log('handleQueryStock', param);
    // if (!search.skuKey && search.skuKeys?.length === 0) {
    //   ElMessage.warning('请输入供应链SKU');
    //   return;
    // }
    // if (!search.warehouseCode) {
    //   ElMessage.warning('请选择发货仓');
    //   return;
    // }
    // let arr: any;
    // if (search.skuKey) {
    //   arr = [search.skuKey];
    // } else {
    //   arr = search.skuKeys;
    // }
    // const param = { supplySkuList: arr, warehouseCode: search.warehouseCode };
    queryStockRef.value?.open(param);
  };

  // const batchReplacementDialogRef = ref();
  const batchTransferToPendingShipment = async () => {
    const illegalList = getCheckedList()?.filter((item) => item?.orderStatus !== 515);
    if (illegalList.length > 0) {
      ElMessage.warning('存在非转待发货订单确认的订单，请重新选择');
      return;
    }
    const isConfirmed = await swal.confirm('请确认订单是否转待发货？');
    if (!isConfirmed) return;
    const res = await omsApi.omsOrderBatchToWaitSend({
      orderCodeList: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('转待发货成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };

  const handleClose = () => {
    clearCheckBoxSelection();
    refreshList();
  };

  // 合并单元格
  const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
    // 合并第 3 列到第 7 列（index 从 0 开始）
    if (columnIndex === 2) {
      return {
        rowspan: 1,
        colspan: 5,
      };
    }

    // 隐藏被合并的列（第 3~6 列）
    if (columnIndex >= 3 && columnIndex <= 6) {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }

    // 其他列正常显示
    return {
      rowspan: 1,
      colspan: 1,
    };
  };

  // 重推
  const rePush = async (codeList) => {
    const isConfirmed = await swal.confirm('确定重推订单吗？');
    if (!isConfirmed) return;
    const illegalList = getCheckedList()
      ?.filter((item) => item.orderStatus !== 512)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非推送第三方WMS异常状态，请重新选择`);
      return;
    }
    const res = await omsApi.omsOrderRePush(codeList);
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('重推成功');
    }
    clearCheckBoxSelection();
    refreshList();
  };

  // 订单处理
  const batchOptions = computed(() => {
    return [
      {
        title: '批量转待审核',
        fn: batchToAudit,
      },
      {
        title: '批量编辑审核',
        hide: search.orderBigStatus !== '200',
        fn: () => handleBatchAudit('edit'),
      },
      {
        title: '批量审核',
        hide: search.orderBigStatus !== '200',
        fn: handleBatchAudit,
      },
      {
        title: '批量作废',
        fn: batchAbandon,
      },
      {
        title: '批量备注',
        fn: () => remarkRef.value?.open(codeList.value),
      },
      // {
      //   title: '批量重推',
      //   fn: () => {
      //     rePush(codeList.value);
      //   },
      // },
      {
        title: '预校验库存',
        hide: search.orderBigStatus !== '100',
        fn: inventoryPreCheck,
      },
      {
        title: '批量换货',
        hide:
          !checkPermission('B2BOrderNewEdit') ||
          (search.orderBigStatus !== '100' && search.orderBigStatus !== '500'),
        fn: batchReplacement,
      },
      // {
      //   title: '批量转待发货',
      //   hide:
      //     !checkPermission('transferToPendingShipment') ||
      //     (search.orderBigStatus !== '500' && !search.statusList?.length),
      //   fn: batchTransferToPendingShipment,
      // },
      // {
      //   title: '批量下单到物流',
      //   hide: search.orderBigStatus !== '200',
      //   fn: handleBatchToDelivery,
      // },
      {
        title: '批量设置仓库物流',
        // hide: !(
        //   search.orderBigStatus === '100' ||
        //   (search.statusList?.length &&
        //     (search.statusList[0] == '506' ||
        //       search.statusList[0] == '516' ||
        //       search.statusList[0] == '517'))
        // ),
        hide:
          !checkPermission('batchSetStock') ||
          (search.orderBigStatus !== '100' && search.orderBigStatus !== '500'),
        fn: handleBatchSetStock,
      },
      {
        title: '发货通知',
        hide: !(search.orderBigStatus == '300' || search.orderBigStatus == '400'),
        fn: handleDeliveryNotice,
      },
      {
        title: '信用额度预占重试',
        hide: !(search.orderBigStatus == '500'),
        fn: handleCreditLimitLockRetry,
      },
    ];
  });
  // 发货处理
  const batchOptions2 = computed(() => {
    return [
      // {
      //   title: '取消预占',
      //   hide: search.orderBigStatus !== '300' && search.orderBigStatus !== '',
      //   fn: cancelReverse,
      // },
      {
        title: '取消出库',
        hide:
          search.orderBigStatus !== '300' &&
          search.orderBigStatus !== '500' &&
          search.orderBigStatus !== '',
        fn: cancelOutbound,
      },
      // {
      //   title: '提交预占',
      //   hide: search.orderBigStatus !== '500' && search.orderBigStatus !== '',
      //   fn: submitReverse,
      // },
      {
        title: '提交出库',
        hide: search.orderBigStatus !== '500' && search.orderBigStatus !== '',
        fn: submitOutbound,
      },
    ];
  });
  // 批量操作前置校验
  const batchIntercept = () => {
    if (codeList.value.length === 0) {
      ElMessage.warning('请选择订单');
      return false;
    }
    return true;
  };

  // 导入订单
  const importDialogRef = ref(null);
  const batchImportOptions = computed(() => {
    return [
      {
        title: '批量导入订单',
        hide: !checkPermission('orderAddUpload'),
        fn: () => {
          importDialogRef.value?.open({
            title: '批量导入订单',
            uploadService: omsApi.omsOrderAddUpload,
            templateService: omsApi.omsOrderAddDownTemplate,
          });
        },
      },
      {
        title: '批量更改地址',
        hide: !checkPermission('updateAddressUpload'),
        fn: () => {
          importDialogRef.value?.open({
            title: '批量更改地址',
            uploadService: omsApi.omsOrderUpdateAddressUpload,
            templateService: omsApi.omsOrderDownUpdateAddressTemplate,
          });
        },
      },
      {
        title: '批量上传订单附件',
        hide: !checkPermission('orderAttachUpload'),
        fn: () => {
          importDialogRef.value?.open({
            title: '批量上传订单附件',
            codeList: codeList.value,
            uploadService: omsApi.omsOrderOrderAttachUpload,
            limit: 10,
            multiple: true,
          });
        },
      },
    ];
  });

  // 导入成功
  const handleImportSuccess = () => {
    refreshList();
    clearCheckBoxSelection();
  };

  // 批量操作前置校验
  const batchImportIntercept = (item) => {
    if (item?.title === '批量上传订单附件' && codeList.value.length === 0) {
      ElMessage.warning('请选择订单');
      return false;
    }
    return true;
  };

  // 物流渠道
  const shippingMap = ref<DictBean[]>([]);
  const queryAllShipping = async () => {
    const res = await omsApi.omsOrderQueryAllShipping({
      type: 1,
    });
    shippingMap.value = res || [];
  };

  // 发货仓库
  const warehouseMap = ref<DictBean[]>([]);
  const queryAllWarehouse = async () => {
    const res = await omsApi.omsOrderQueryAllWarehouse({
      type: 1,
    });
    warehouseMap.value = res || [];
  };

  const handleTabChange = (val) => {
    clearCheckBoxSelection();
    search.statusList = undefined;
    search.orderBigStatus = val;
    search.meReview = val === '200' ? true : undefined;
  };

  const handleChildTabChange = (val) => {
    clearCheckBoxSelection();
    search.orderBigStatus = '500';
    search.statusList = [val];
    search.meReview = val === '200' ? true : undefined;
  };

  const b2bClientType = ref([]);
  const queryB2bClientType = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['b2b_client_type'],
    });
    b2bClientType.value = res?.dictMap?.b2b_client_type;
  };

  const reset = () => {
    batchSearchRef.value?.clear();
    batchSearchRef2.value?.clear();
    const start = dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    time.value = [start, end]; // 设置默认的日期范围
    handleTimeChange(time.value);
    // time.value = [];
    expectedSendTime.value = [];
    expectedArrivalTime.value = [];
    resetSearch();
  };
  const listRefresh = () => {
    refreshList();
    queryTabCount();
  };

  // 获取缺货状态

  const getStockStatus = async (orderList) => {
    if (!orderList?.length) return;

    const orderCodes = orderList.map((item) => item.erpCode);

    try {
      const res = await omsApi.omsOrderQueryStockList(orderCodes);
      if (res?.length) {
        const stockMap = new Map(
          res.map((stock) => [
            stock.erpCode,
            {
              isOutStock: stock.isOutStock,
              skuStockInfoList: stock.skuStockInfoList || [],
            },
          ])
        );

        const updatedList = listData.value?.recordList.map((item) => {
          const stockInfo = stockMap.get(item.erpCode);

          // 拿到该订单对应的 sku 库存数据
          const skuStockMap = new Map(
            (stockInfo?.skuStockInfoList || []).map((sku) => [sku.productSku, sku])
          );

          // 更新 itemBeanList 中每个 SKU 的缺货状态
          const updatedItemBeanList = (item.itemBeanList || []).map((skuItem) => {
            const stockInfo = skuStockMap?.get(skuItem.supplySku);

            return {
              ...skuItem,
              isOutStock: stockInfo ? stockInfo.inventory < stockInfo.qty : false, // 根据库存和数量判断是否缺货
            };
          });

          return {
            ...item,
            isOutStock: stockInfo?.isOutStock || false,
            itemBeanList: updatedItemBeanList,
          };
        });

        if (updatedList) {
          listData.value.recordList = updatedList;
        }
      }
    } catch (error) {
      console.error('获取缺货状态失败:', error);
    }
  };

  watch(
    () => listData.value,
    (val) => {
      if (val?.recordList?.length) {
        if (!val.recordList.some((item) => 'isOutStock' in item)) {
          getStockStatus(val.recordList);
        }
        // 重置 全部收起
        allCollapse.value = false;
        listData.value?.recordList.map((item) => {
          item.total = 0;
          item.itemBeanList?.forEach((sku) => (item.total += sku.numInt));
        });
      }
    },
    { immediate: true }
  );

  // 获取列表自定义字段
  const conditionCode = ref(null);
  const customFieldList = ref([]);
  const queryCustomFieldList = async () => {
    const res = await platformApi.platformSearchQueryConditionList({
      platform: 'lute_erp',
      moduleType: 'list',
      itemType: route?.name,
      pageSize: 1,
      pageNum: 1,
    });

    if (res?.recordList?.length) {
      const hideList = JSON.parse(res?.recordList[0]?.searchCondition);
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
    /* conditionCode.value = res?.recordList[0]?.conditionCode;
  customFieldList.value = customFields?.map(item => {
  return {
  ...item,
  checkedArr: item.propertyArr?.filter(item => item.checked)?.map(k => k.key),
  }
  }); */
  };

  // 获取导出自定义字段
  const exportConditionCode = ref(null);
  const exportCustomFieldList = ref([]);
  const queryExportCustomFieldList = async () => {
    const res = await platformApi.platformSearchQueryConditionList({
      platform: 'lute_erp',
      moduleType: 'export',
      itemType: route?.name,
      pageSize: 1,
      pageNum: 1,
    });

    if (res?.recordList?.length) {
      const hideList = JSON.parse(res?.recordList[0]?.searchCondition);
      exportCustomFieldList.value = customExportFields?.map((item) => {
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
      exportConditionCode.value = res?.recordList[0]?.conditionCode;
    } else {
      exportCustomFieldList.value = customExportFields?.map((item) => {
        return {
          ...item,
          checkedArr: item.propertyArr?.filter((item) => item.checked)?.map((k) => k.key),
        };
      });
    }
  };

  const detailFields = computed(() => {
    return getCurCheckedArr(customFieldList.value, '订单明细');
  });

  const showColumn = (title) => {
    return customFieldList.value?.find((item) => item?.title === title)?.checkedArr?.length > 0;
  };

  const exportOriginDialogRef = ref(null);

  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };

  onMounted(() => {
    initDickBook();
    queryB2bClientType();
    queryAllShipping();
    queryAllWarehouse();
    queryCustomFieldList();
    queryExportCustomFieldList();
    B2BOrderRefresh(user.token as string);
    document.addEventListener('click', handleClickOutside);
    const start = dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    time.value = [start, end]; // 设置默认的日期范围
    handleTimeChange(time.value);
    queryTabCount();
  });

  onBeforeUnmount(() => {
    stopB2BOrderRefresh();
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
  :deep(.b2bdate .el-range-input) {
    margin-left: 3px;
  }
  .orderSaleSelect {
    width: auto !important;
    min-width: 100px;
  }
  .countrySelect {
    width: auto !important;
    min-width: 145px;
  }

  //:deep(.el-table__row) {
  //  background-color: unset;
  //
  //  .el-table-column--selection {
  //    .cell {
  //      padding: 10px 12px !important;
  //      height: 34px;
  //      background: #f7f7f7 !important;
  //    }
  //  }
  //
  //  .el-table__cell {
  //    vertical-align: top;
  //    padding: 0;
  //
  //    .cell {
  //      //height: 100% !important;
  //      line-height: 20px;
  //      overflow: unset;
  //      align-items: start;
  //    }
  //
  //    &:has(.detail-info) {
  //      padding: 0;
  //    }
  //  }
  //}
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
      height: 32px;
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
    &:hover {
      background-color: #f7f7f7 !important;
    }
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

  :deep(.order-info-column) {
    .vxe-body-cell--wrapper {
      display: flex;
      flex-direction: column;
    }
  }
  .collapse-control {
    width: 14px;

    .list-collapse {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      margin: 13px 0;
      position: relative;
      border: 1px solid #dedede;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        .horizontal-line,
        .vertical-line {
          background-color: var(--el-color-primary);
        }
      }

      .horizontal-line,
      .vertical-line {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #999999;
      }

      .horizontal-line {
        width: 7px;
        height: 1px;
        transform: translate(-50%, -50%) rotate(180deg);
      }

      .horizontal-expand {
        animation: horizontal-line-expand 0.2s ease-in-out forwards;
        @keyframes horizontal-line-expand {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(180deg);
          }
        }
      }

      .horizontal-collapse {
        animation: horizontal-line-collapse 0.2s ease-in-out forwards;
        @keyframes horizontal-line-collapse {
          0% {
            transform: translate(-50%, -50%) rotate(180deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
      }

      .vertical-expand {
        animation: vertical-line-expand 0.2s ease-in-out forwards;
        @keyframes vertical-line-expand {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(90deg);
          }
        }
      }

      .vertical-collapse {
        animation: vertical-line-collapse 0.2s ease-in-out forwards;
        @keyframes vertical-line-collapse {
          0% {
            transform: translate(-50%, -50%) rotate(90deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
      }

      .vertical-line {
        width: 1px;
        height: 7px;
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
  }
  .inline {
    display: inline-block;
    .list-collapse {
      display: inline-block;
      margin: 0px !important;
      top: 3px;
      background-color: #f7f7f7;
    }
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
    margin-left: -28px;

    .detail-left {
      width: 74%;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      padding: 10px 12px;
      border-right: 1px solid #f5f5f5;

      .left-top {
        width: 100%;
        display: flex;
        gap: 12px;

        .product-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          //gap: 18px;
          .product-item + .product-item {
            margin-top: 18px;
          }

          .product-item {
            display: flex;
            align-items: center;
            gap: 12px;

            .left {
              display: flex;
              align-items: center;
              gap: 10px;
              width: 58.1%;

              .product-img {
                position: relative;

                img {
                  width: 36px;
                  height: 36px;
                  border-radius: 8px;
                }

                /*.icon-quehuobiaoqian {

        }*/
                .outStock {
                  width: 16px;
                  position: absolute;
                  top: -12px;
                  right: -2px;
                }
              }

              .product-title {
                min-width: 200px;
                margin-bottom: 2px;
              }
            }

            .right {
              width: 36.5%;
            }

            .split {
              width: 1px;
              height: 12px;
              background-color: #dedede;
            }
          }

          .order-remark {
            display: flex;
            margin-left: 46px;
          }
        }
      }

      .left-bottom {
        margin-top: 25px;

        .remark {
          display: flex;
        }

        .remark + .remark {
          margin-top: 7px;
        }

        .customer-remark {
          flex-shrink: 0;
          margin-left: 28px;
          color: var(--el-color-primary);
        }

        .error-remark {
          flex-shrink: 0;
          margin-left: 6px;
          color: var(--el-color-danger);

          .icon-xianxingtubiaoxinxizhuangtai {
            margin-left: 4px;
            margin-right: 2px;
            font-size: 12px;
          }
        }
      }
    }

    .other-info {
      padding: 10px 12px;
      border-left: var(--el-table-border);
      width: 26%;
    }
    .total {
      width: 104px;
      flex-shrink: 0;
      border-right: 1px solid #f5f5f5;
      min-height: 198px;
      :deep(.content) {
        font-family: 'PingFang SC Medium' !important;
      }
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

  .child-column {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 12px;
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

    .item {
      display: flex;
      align-items: center;
      flex-shrink: 0;

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
    }
  }

  .multi-supplySku {
    background-color: orange;
    color: #fff;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 2px;
    vertical-align: middle;
    margin-right: 4px;

    & + span {
      vertical-align: middle;
    }
  }

  .remark-red {
    color: #f1416c;
    margin-top: 4px;
  }

  :deep(.el-button > span) {
    display: unset;
  }

  .arrows-icon-down {
    &:hover {
      animation: moveDown 2s linear infinite;
      @keyframes moveDown {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .arrows-icon-up {
    &:hover {
      animation: moveUp 2s linear infinite;
      @keyframes moveUp {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(-3px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .remark-popover,
  .customer-remark-popover {
    width: 282px;
    padding: 12px 16px 10px 16px;
    background: #ffffff;
    display: none;
    border-radius: 6px;
    border: none;
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);

    .header {
      font-family: 'PingFang SC Medium';
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #1f1f1f;
      margin-bottom: 10px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;

      .left {
        margin-right: auto;
      }
    }
  }

  .icon-sousuo {
    font-size: 14px;
  }

  .icon-shujutongbu1 {
    color: #666666;
    cursor: pointer;
  }

  .icon-loading {
    color: #666666;
    cursor: pointer;
    animation: rotate 1s linear infinite;
  }

  .red {
    color: var(--el-color-danger);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :deep(.el-input-group__append) {
    cursor: pointer;
  }
</style>
