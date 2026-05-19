<template>
  <!-- <OrderTabs
    v-model="search.orderBigStatus"
    :tab-status-list="tabStatusList"
    :count-map="listData?.statusStatistics"
    :child-count-map="listData?.errorStatusCountMap"
    @tab-change="handleTabChange"
    @child-tab-change="handleChildTabChange"
  /> -->
  <!-- :custom-fields="customFieldList" -->
  <KeenList
    :selected-num="codeList?.length"
    :condition-code="conditionCode"
    :export-condition-code="exportConditionCode"
    :params="search"
    :export-service="erpApi.luteosErpOrderOrderDownload"
    :selected-list="selectedList"
    @refresh="refreshList"
    @reset-search="reset"
    @refresh-custom-fields="queryCustomFieldList"
    @refresh-export-custom-fields="queryExportCustomFieldList"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    @clear-all="clearAll"
  >
    <template #filters>
      <ProductChannelSelect
        style="width: 160px"
        v-model="search.channelList"
        placeholder="平台"
        clearable
        multiple
        @change="
          () => {
            search.shopCodeList = [];
            queryShop();
          }
        "
      />
      <ProductSiteSelect style="width: 160px" v-model="search.siteList" clearable multiple />
      <el-select
        style="width: 160px"
        v-model="search.shopCodeList"
        placeholder="店铺"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="item in shopMap"
          :value="item.shopCode"
          :label="item.shopAccount"
          :key="item.shopCode"
        />
      </el-select>
      <!--      <ProductShopSelect style="width: 160px" clearable multiple />-->
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
      <el-input
        :style="{ width: `${inputWidth}px` }"
        v-model="search.itemSingleSearchKey"
        placeholder="请输入"
        clearable
        @input="handleInputChange"
        @change="handleItemBlur"
        @blur="handleItemBlur"
      >
        <template #prepend>
          <el-select v-model="search.itemSearchType" style="width: 110px">
            <el-option
              v-for="(val, key) in itemSearchTypeMap"
              :value="parseInt(key)"
              :label="val"
              :key="key"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append v-if="search.itemSearchType !== 4">
          <BatchSearchPopover
            ref="batchItemSearchRef"
            @search="handleBatchItemSearch"
            @clear="handleBatchItemClear"
          />
        </template>
      </el-input>
      <OmsWarehouseSelect v-model="search.warehouseCodeList" multiple clearable />
      <OmsShippingSelect
        v-model="search.shippingCodeList"
        multiple
        clearable
        :filter-warehouse="false"
      />
      <el-select
        style="width: 160px"
        v-model="search.outboundStatus"
        placeholder="预占状态"
        filterable
        clearable
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="(value, key) in MarkShipedStatus"
          :key="value"
          :label="key"
          :value="value"
        />
      </el-select>
      <CountrySelect
        class="countrySelect"
        ref="countryCodeListSelectRef"
        v-model="search.countryCodeList"
        placeholder="收件人国家/区域"
        filterable
        clearable
        multiple
        collapse-tags-tooltip
        :teleported="true"
      />
      <div class="date-picker-prepend" ref="areaCountryContainerRef">
        <el-select v-model="timeType" style="width: 150px" @change="handleTimeChange(time)">
          <el-option :value="3" label="付款时间（北京）" />
          <!-- <el-option :value="1" label="创建时间（北京）" />
          <el-option :value="2" label="发货时间（北京）" /> -->
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
      <!-- <el-select
        style="width: 160px"
        v-model="search.sortParam"
        placeholder="时间排序"
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option v-for="item in timeMap" :value="item.key" :label="item.desc" :key="item.desc" />
      </el-select> -->
      <!-- <el-select
        v-model="search.meReview"
        style="width: 130px"
        v-if="search.orderBigStatus === '200'"
      >
        <el-option label="我的审核节点" :value="true" />
        <el-option label="全部审核节点" :value="false" />
      </el-select> -->
    </template>
    <!-- <template #more-filter>
      <el-form-item label="订单渠道">
        <OrderSaleSelect
          ref="orderSaleTypeListSelectRef"
          v-model="search.orderSaleTypeList"
          placeholder="请选择"
          multiple
          clearable
        />
      </el-form-item>
     
      <el-form-item label="客服备注">
        <el-select
          ref="customerRemarkNotNullSelectRef"
          v-model="search.customerRemarkNotNull"
          placeholder="请选择"
          filterable
          clearable
          :teleported="false"
        >
          <el-option label="有" :value="1" />
          <el-option label="无" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="买家备注">
        <el-select
          ref="buyerRemarkNotNullSelectRef"
          v-model="search.buyerRemarkNotNull"
          placeholder="请选择"
          filterable
          clearable
          :teleported="false"
        >
          <el-option label="有" :value="1" />
          <el-option label="无" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="异常信息">
        <el-input v-model="search.errorRemark" placeholder="请输入" clearable />
      </el-form-item>
    </template> -->
    <template #buttons1>
      <!--      MSKU未配对-->
      <template v-if="search.statusList?.includes(ErrorStatus.MSKU未配对)">
        <ExportBtn :params="search" :service="omsApi.omsFulfillmentOrderExportErrSaleSku">
          导出MSKU未配对数据
        </ExportBtn>
        <el-button @click="orderPush('更新MSKU配对信息')">更新MSKU配对信息</el-button>
      </template>
      <!--      未匹配仓库/物流-->
      <el-button
        v-if="
          search.statusList?.includes(ErrorStatus.未匹配仓库物流) ||
          search.statusList?.includes(ErrorStatus.物流下单失败)
        "
        @click="batchShipping(codeList)"
      >
        批量设置仓库物流
      </el-button>
      <el-button
        v-if="search.statusList?.includes(ErrorStatus.未匹配仓库物流)"
        @click="orderPush('重新执行订单规则', '按订单规则执行，是否提交?')"
      >
        重新执行订单规则
      </el-button>
      <!--      三方仓SKU未配对-->
      <template v-if="search.statusList?.includes(ErrorStatus.三方仓SKU未配对)">
        <ExportBtn :params="search" :service="omsApi.omsFulfillmentOrderExportErrThirdSku">
          导出三方仓SKU未配对数据
        </ExportBtn>
        <el-button @click="orderPush('更新三方仓SKU配对信息')">更新三方仓SKU配对信息</el-button>
      </template>
      <el-button
        v-if="
          search.statusList?.includes(ErrorStatus.转FBA创建失败) ||
          search.statusList?.includes(ErrorStatus.转FBA配送异常)
        "
        @click="batchTransferSelf()"
      >
        转自配送
      </el-button>
      <!--      <el-button v-if="search.statusList?.includes(ErrorStatus.转FBA创建失败)">转FBA发货</el-button>-->
      <!--      仓库出库失败-->
      <el-button
        v-if="
          search.statusList?.includes(ErrorStatus.提交出库失败) ||
          search.statusList?.includes(ErrorStatus.仓库出库失败)
        "
        @click="cancelOutbound()"
      >
        截单
      </el-button>
      <!--异常订单-预占失败、提交出库失败-->
      <el-button
        v-if="
          search.statusList?.includes(ErrorStatus.预占失败) ||
          search.statusList?.includes(ErrorStatus.提交出库失败)
        "
        @click="submitOutbound()"
      >
        提交发货
      </el-button>
      <BatchOperatePophover name="订单处理" :options="batchOptions" :intercept="batchIntercept" />
      <BatchOperatePophover
        name="导出订单"
        :options="batchExportOptions"
        :intercept="batchExportIntercept"
      />
    </template>
    <!-- <template #tools-prepend>
      <el-select
        style="width: 160px"
        v-model="search.sortParam"
        placeholder="时间排序"
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option v-for="item in timeMap" :value="item.key" :label="item.desc" :key="item.desc" />
      </el-select>
    </template> -->
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
        <vxe-column field="orderInfo" min-width="460" class-name="order-info-column">
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
            <div class="table-item-header first-header">
              <div class="item">
                <img :src="getImg(row?.channel)" class="platform-icon" />
                <span class="item-label">店铺：</span>
                <div>{{ row.shop || '-' }}</div>
              </div>
              <div class="item">
                <span class="item-label">平台单号：</span>
                <!-- <span class="item-value" @click="gotoDetail(row)">{{ row.platformOrderNo || '-' }}</span> -->

                <span class="item-value">{{ row.platformOrderNo || '-' }}</span>
                <Copy :content="row.platformOrderNo" />
                <!-- <Tag :color="tagColor(row.outboundStatus)" size="small">
                  {{ row.outboundStatusName }}
                </Tag> -->
              </div>
              <div class="item">
                <span class="item-label">订单号：</span>
                {{ row.orderCode || '-' }}
                <Copy :content="row.orderCode" />
              </div>
              <div class="item" v-if="row.outboundStatusName">
                <Tag :color="tagColor(row.outboundStatusName)" size="small">
                  {{ row.outboundStatusName }}
                </Tag>
              </div>
              <div class="item" v-if="row.orderStatus === ErrorStatus.禁止处理">
                <div class="freeze">禁</div>
              </div>
              <!-- <div class="item">
                <span class="item-label">
                  标签：
                  <ShopifyLabelList :labelList="[...disPlayLabelist(row), ...row.orderLabelList]" />
                </span>
                <i class="iconfont icon-bianji" @click="handleClickLabelMake(row)"></i>
              </div> -->
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
                      v-for="product in row?.detailList?.slice(
                        0,
                        row.isCollapse ? 1 : row?.itemBeanList?.length
                      )"
                      :key="product?.id"
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
                            v-if="product?.gift === 1"
                            class="giftStock"
                            :src="getImg('giftStock')"
                            alt=""
                          />
                          <!-- <img
                            v-if="product?.outOfStockFlag === 'Y'"
                            class="giftStock"
                            :src="getImg('outStock')"
                            alt=""
                          /> -->
                          <img
                            v-if="product?.isOutStock"
                            class="giftStock"
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
                            <span class="item-label">SKU：</span>
                            <span
                              :class="
                                search.skuKey && product.skuCode?.includes(search.skuKey)
                                  ? 'red'
                                  : ''
                              "
                            >
                              {{ product?.sku || '-' }}
                            </span>
                          </div>
                          <div class="product-sku">
                            <span class="item-label">MSKU：</span>
                            <span
                              :class="
                                search.skuKey && product.sellerSku?.includes(search.skuKey)
                                  ? 'red'
                                  : ''
                              "
                            >
                              {{ product?.msku || '-' }}
                            </span>
                          </div>
                          <!-- <div class="product-sku">
                            <span class="item-label">供应链SKU：</span>
                            <span
                              :class="
                                search.skuKey && product.supplySku?.includes(search.skuKey)
                                  ? 'red'
                                  : ''
                              "
                            >
                              {{ product?.sku || '-' }}
                            </span>
                          </div> -->
                          <div class="product-sku">
                            <span class="item-label">ASIN：</span>
                            <span
                              :class="
                                search.skuKey && product.supplySku?.includes(search.skuKey)
                                  ? 'red'
                                  : ''
                              "
                            >
                              {{ product?.asin || '-' }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="split"></div>
                      <div class="right">
                        <ItemLabel label="ItemID" :value="product?.itemId" />
                        <!-- <ItemLabel label="预估重量" :value="product?.weight" />
                        <ItemLabel label="预估体积" :value="product?.volume" />
                        <ItemLabel label="客选物流" :value="row?.buyerChooseLogistics" /> -->
                      </div>
                      <div class="num">
                        <ItemLabel label="数量" :value="product?.quantity" />
                      </div>
                      <!-- <div class="price">
                        <ItemLabel label="商品单价(不含税)" :value="product?.price" />
                        <ItemLabel label="商品售价(不含税)" :value="product?.totalPrice" />
                        <ItemLabel label="商品折扣" :value="product?.discountAmount" />
                        <ItemLabel label="商品税金" :value="product?.taxes" />
                        <ItemLabel label="商品买家支付运费" :value="product?.freightAmount" />
                        <ItemLabel label="商品其他费用" :value="product?.tipAmount" />
                      </div> -->
                    </div>
                    <div :class="{ 'order-remark': detailFields?.includes('productImageUrl') }">
                      <span class="item-label">客服备注：</span>
                      <OverflowTooltip :content="row?.remarkList?.[0]?.customerRemark" :line="2" />
                      <!-- <i
                        class="iconfont icon-bianji"
                        @click="
                          (e) => {
                            handleRemark(e, row);
                          }
                        "
                      ></i> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="left-bottom">
                  <div class="remark" v-if="row.errorRemark">
                    <span class="error-remark">
                      <i class="iconfont icon-xianxingtubiaoxinxizhuangtai"></i>
                      异常信息：
                    </span>
                    <OverflowTooltip :content="row?.errorRemark" :line="3" />
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
                </div> -->
              </div>
              <!--              <div class="child-column total" v-if="detailFields?.includes('total')">
                <ItemLabel label="数量" :value="row?.num" />
              </div>-->
            </div>
          </template>
        </vxe-column>
        <!-- <vxe-column v-if="showColumn('订单金额')" title="订单金额" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <ChildColumn title="订单金额" :custom-field-list="customFieldList" :row="row" />
          </template>
        </vxe-column> -->
        <vxe-column v-if="showColumn('发货信息')" title="发货信息" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <ChildColumn title="发货信息" :custom-field-list="customFieldList" :row="row">
              <template #buyerCountryDesc>
                <div class="d-flex">
                  <ItemLabel label="国家" :value="row?.receiverCountryDesc" />
                  <!-- <el-popover placement="left">
                    <AddressDetail :row="row" />
                    <template #reference>
                      <el-link class="address-detail-btn" type="primary" underline="never">
                        详细地址
                      </el-link>
                    </template>
                  </el-popover> -->
                </div>
              </template>
              <!-- <template #updateMarkShipped>
                <ItemLabel
                  label="标发更新状态"
                  :value="row?.updateMarkShipped ? '已更新' : '未更新'"
                />
              </template> -->
            </ChildColumn>
          </template>
        </vxe-column>
        <vxe-column title="异常信息" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="child-column">
              <OverflowTooltip :content="row?.exceptionInfo" :line="4" />
            </div>
          </template>
        </vxe-column>
        <vxe-column v-if="showColumn('时间')" title="时间" min-width="234px">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <ChildColumn title="时间" :custom-field-list="customFieldList" :row="row" />
          </template>
        </vxe-column>
        <!-- <vxe-column title="操作" width="100px" fixed="right">
          <template #default="{ row }">
            <div class="table-item-header"></div>
            <div class="child-column">
              <KeenActions
                class="actions"
                display-style="buttons"
                :actions="[
                  {
                    label: '提交发货',
                    key: 'submit',
                    type: 'primary',
                    text: true,
                    hide: ![
                      OrderStatus.待系统内审核,
                      ErrorStatus.预占失败,
                      ErrorStatus.提交出库失败,
                    ].includes(row.orderStatus),
                    row: row,
                  },
                  {
                    label: '解除禁止',
                    key: 'unFreezze',
                    type: 'primary',
                    text: true,
                    hide: row.orderStatus !== ErrorStatus.禁止处理,
                    row: row,
                  },
                  {
                    label: '转自配送',
                    key: 'transferSelf',
                    type: 'primary',
                    text: true,
                    hide: ![ErrorStatus.转FBA配送异常, ErrorStatus.转FBA创建失败].includes(
                      row.orderStatus
                    ),
                    row: row,
                  },
                  {
                    label: '编辑',
                    key: 'edit',
                    type: 'primary',
                    text: true,
                    hide: ![
                      OrderStatus.待系统内审核,
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.缺货,
                      ErrorStatus.三方仓SKU未配对,
                      ErrorStatus.预占失败,
                      ErrorStatus.提交出库失败,
                    ].includes(+row.orderStatus),
                    isMore: true,
                    row: row,
                    // permissionCode: 'B2BOrderEdit',
                  },
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    text: true,
                    isMore: true,
                    row: row,
                    // permissionCode: 'B2BOrderDetail',
                  },
                  {
                    label: '作废',
                    key: 'abandon',
                    type: 'danger',
                    text: true,
                    hide: [OrderStatus.已发货, OrderStatus.废弃].includes(+row.orderStatus),
                    isMore: ![ErrorStatus.MSKU未配对, ErrorStatus.禁止处理]?.includes(
                      row.orderStatus
                    ),
                    row: row,
                    // permissionCode: 'B2BOrderCancel',
                  },
                  {
                    label: '拆单',
                    key: 'subOrder',
                    type: 'primary',
                    text: true,
                    hide: ![
                      OrderStatus.待系统内审核,
                      ErrorStatus.缺货,
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.三方仓SKU未配对,
                      ErrorStatus.预占失败,
                    ].includes(row?.orderStatus),
                    isMore: [
                      OrderStatus.待系统内审核,
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.三方仓SKU未配对,
                      ErrorStatus.预占失败,
                    ].includes(row?.orderStatus),
                    row: row,
                    // permissionCode: 'B2BOrderSubOrder',
                  },
                  {
                    label: '转FBA发货',
                    key: 'fbaSend',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: ![
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.缺货,
                      ErrorStatus.转FBA创建失败,
                      ErrorStatus.物流下单失败,
                      ErrorStatus.三方仓SKU未配对,
                      ErrorStatus.预占失败,
                      ErrorStatus.提交出库失败,
                      OrderStatus.待系统内审核,
                      OrderStatus.待审核,
                    ].includes(row.orderStatus),
                    isMore: row?.orderStatus !== ErrorStatus.转FBA创建失败,
                    // permissionCode: 'B2BOrderDetail',
                  },
                  {
                    label: '标记发货',
                    key: 'markShipped',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: ![MarkShipedStatus.标发失败].includes(row.markShippedStatus),
                    // permissionCode: 'B2BOrderDetail',
                  },
                  {
                    label: '更新标发',
                    key: 'updateMarkShipped',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: ![MarkShipedStatus.标发成功].includes(row.markShippedStatus),
                  },
                  {
                    label: '重新物流下单',
                    key: 'orderAgain',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: ![ErrorStatus.物流下单失败].includes(row.orderStatus),
                    // permissionCode: 'B2BOrderDetail',
                  },
                  {
                    label: '上传跟踪号',
                    key: 'uploadTrackingNumber',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: ![OrderStatus.已发货].includes(row.orderStatus),
                    // permissionCode: 'B2BOrderDetail',
                  },
                  {
                    label: '禁止处理',
                    key: 'forbidden',
                    type: 'danger',
                    text: true,
                    row: row,
                    hide: ![
                      OrderStatus.待系统内审核,
                      ErrorStatus.MSKU未配对,
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.缺货,
                      ErrorStatus.三方仓SKU未配对,
                      ErrorStatus.预占失败,
                      ErrorStatus.提交出库失败,
                      ErrorStatus.取消预占失败,
                    ].includes(row.orderStatus),
                    isMore: row.orderStatus !== ErrorStatus.MSKU未配对,
                  },
                  {
                    label: '换货',
                    key: 'replacement',
                    type: 'primary',
                    text: true,
                    hide: ![
                      OrderStatus.待系统内审核,
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.缺货,
                      ErrorStatus.三方仓SKU未配对,
                      ErrorStatus.预占失败,
                    ].includes(row.orderStatus),
                    isMore: true,
                    row: row,
                  },
                  {
                    label: '设置仓库物流',
                    key: 'setShipping',
                    type: 'primary',
                    text: true,
                    hide: ![
                      OrderStatus.待系统内审核,
                      ErrorStatus.未匹配仓库物流,
                      ErrorStatus.缺货,
                      ErrorStatus.物流下单失败,
                      ErrorStatus.预占失败,
                    ].includes(row?.orderStatus),
                    isMore: row?.orderStatus !== ErrorStatus.未匹配仓库物流,
                    row: row,
                  },
                  {
                    label: '截单',
                    key: 'cancelOutbound',
                    type: 'primary',
                    text: true,
                    hide:
                      row?.orderStatus !== OrderStatus.待发货 &&
                      ![
                        ErrorStatus.物流下单失败,
                        ErrorStatus.提交出库失败,
                        ErrorStatus.仓库出库失败,
                      ].includes(row?.orderStatus),
                    isMore: [ErrorStatus.提交出库失败, ErrorStatus.物流下单失败].includes(
                      row?.orderStatus
                    ),
                    row: row,
                  },
                  {
                    label: '操作日志',
                    key: 'log',
                    type: 'primary',
                    text: true,
                    row: row,
                  },
                  {
                    label: '导入附件',
                    key: 'uploadFile',
                    type: 'primary',
                    text: true,
                    isMore: true,
                    row: row,
                  },
                  {
                    label: '重新执行订单规则',
                    key: 'reExecuteOrderRule',
                    type: 'primary',
                    text: true,
                    hide:
                      row?.orderStatus !== ErrorStatus.缺货 ||
                      row?.orderStatus !== ErrorStatus.未匹配仓库物流,
                    isMore: true,
                    row: row,
                  },
                  {
                    label: '添加赠品',
                    key: 'addGift',
                    type: 'primary',
                    text: true,
                    hide:
                      row?.orderStatus !== OrderStatus.待审核 &&
                      row?.orderStatus !== OrderStatus.待系统内审核 &&
                      ![
                        ErrorStatus.未匹配仓库物流,
                        ErrorStatus.缺货,
                        ErrorStatus.三方仓SKU未配对,
                        ErrorStatus.预占失败,
                      ].includes(row?.orderStatus),
                    isMore: true,
                    row: row,
                  },
                ]"
                @click="handleActions"
              />
            </div>
          </template>
        </vxe-column> -->
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
  <RemarkDialog ref="remarkRef" @success="refreshList" />
  <ImportDialog ref="importDialogRef" :params="search" @success="handleImportSuccess" />
  <Detail ref="detailRef" :listData="listData?.recordList" />
  <SubOrderDialog ref="subOrderDialogRef" @success="refreshList" />
  <BatchReplacementDialog
    ref="batchReplacementDialogRef"
    @close="handleClose"
    :title="replaceTitle"
  />
  <FbaOrderPushDialog
    ref="fbaOrderRef"
    @success="
      () => {
        refreshList();
        clearCheckBoxSelection();
      }
    "
  />
  <OrderLabelDialog
    ref="selfFulTagDialogRef"
    @confirm="handleLabelConfirm"
    @confirm-multi="handleLabelConfirmMulti"
    @remove-tag="handleLabelRemoveTag"
  />
  <MultipleSelectDialog ref="multipleSelectDialogRef" />
  <FobidenDialog
    ref="forbidDialogRef"
    @success="
      () => {
        refreshList();
        clearCheckBoxSelection();
      }
    "
  />
  <UploadTrackingNumberDialog
    ref="uploadTrackingNumberDialogRef"
    @confirm="handleTrackingNumberConfirm"
  />
  <BatchSubOrderDialog ref="batchSubOrderDialogRef" @success="handleClose" />
  <TransferSelfDialog ref="transferSelfDialogRef" @success="handleClose" />
  <LogisticsOrderDialog ref="logisticsOrderRef" @submit="refreshList" />
  <BatchShippingDialog title="设置仓库物流" ref="batchShippingDialogRef" @success="handleClose" />
  <LogDialog ref="logDialogRef" />
  <CustomImportDialog ref="customImportDialogRef" @success="refreshList" />
  <ResultDialog ref="resultDialogRef" />
  <AddGiftDialog ref="addGiftDialogRef" @success="giftAddSuccess" :onSubmit="giftAddSuccess" />
  <div class="remark-popover">
    <header class="header">订单备注</header>
    <el-input v-model="remark" type="textarea" :rows="6" />
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
  <div class="customer-remark-popover">
    <header class="header">客服备注</header>
    <el-input v-model="customerRemark" type="textarea" :rows="6" />
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
</template>

<script lang="ts" setup name="jijiaSelfShippedOrder">
  import { erpApi, platformApi, omsApi, OmsApi, shopApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect, ElMessageBox } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useTask from '@/store/modules/task';
  import { useStore } from '@/store/modules/useStore';
  import RemarkDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/RemarkDialog.vue';
  import { ref } from 'vue';
  import { checkPermission } from '@/utils/permission';
  import ImportDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/importDialog.vue'; // 订单渠道
  import Detail from '@/views/supplyChainManage/B2BOrder/shopifyOrder/detail.vue';
  import customFields from '@/views/supplyChainManage/B2BOrder/jijiaSelfShippedOrder/customFields';
  import customExportFields from '@/views/supplyChainManage/B2BOrder/orderManage/customExportFields';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import ChildColumn from '@/views/supplyChainManage/B2BOrder/orderManage/components/ChildColumn.vue';
  import { getCurCheckedArr } from '@/utils/customFields';
  import SubOrderDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/SubOrderDialog.vue';
  import BatchReplacementDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/BatchReplacementDialog.vue';
  import FbaOrderPushDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/fbaOrderPushDialog.vue';
  import MultipleSelectDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/multipleFbaDialog.vue';
  import FobidenDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/fobidenDialog.vue';
  import UploadTrackingNumberDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/uploadTrackingNumberDialog.vue';
  import BatchSubOrderDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/batchSubOrderDialog.vue';
  import TransferSelfDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/transferSelfDialog.vue';
  import LogisticsOrderDialog from '@/views/supplyChainManage/efficiencyTools/selfLogisticsOrder/components/LogisticsOrderDialog.vue';
  import LogDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/logDialog.vue';
  import CustomImportDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/customImportDialog.vue';
  import OrderLabelDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/orderLabelDialog.vue';
  import ShopifyLabelList from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/shopifyLabelList.vue';
  import BatchShippingDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/batchShippingDialog.vue';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';
  import AddressDetail from '@/views/supplyChainManage/B2BOrder/jijiaSelfShippedOrder/components/addressDetail.vue';
  import AddGiftDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/addGiftDialogByOrder.vue';
  import dayjs from 'dayjs';
  import {
    OrderStatus,
    ErrorStatus,
    MarkShipedStatus,
  } from '@/views/supplyChainManage/B2BOrder/jijiaSelfShippedOrder/enum';

  const searchTypeMap = {
    2: '平台单号',
    1: '订单号',
    // 3: '运单号',
    // 4: '跟踪单号',
    // 5: '出库单号',
  };

  const itemSearchTypeMap = {
    1: '供应链SKU',
    2: 'MSKU',
    // 3: 'ASIN/ItemID',
    // 4: '产品名称',
  };

  const tabStatusList = [
    { status: OrderStatus.全部, code: 'all', statusName: '全部', count: '' },
    { status: OrderStatus.待审核, code: 'waitAuth', statusName: '待审核', count: '' },
    { status: OrderStatus.待发货, code: 'waitSend', statusName: '待发货', count: '' },
    { status: OrderStatus.已发货, code: 'send', statusName: '已发货', count: '' },
    {
      status: OrderStatus.异常订单,
      code: 'error',
      statusName: '异常订单',
      count: '',
      children: [
        {
          groupName: '',
          list: [
            {
              status: ErrorStatus.禁止处理,
              code: 'FREEZE_ERROR',
              statusName: '禁止处理',
              count: '',
            },
          ],
        },
        {
          groupName: '待审核',
          list: [
            {
              status: ErrorStatus.MSKU未配对,
              code: 'MSKU_NOT_MAPPING_ERROR',
              statusName: 'MSKU未配对',
              count: '',
            },
            {
              status: ErrorStatus.未匹配仓库物流,
              code: 'WAREHOUSE_LOGISTIC_NOT_MAPPING_ERROR',
              statusName: '未匹配仓库/物流',
              count: '',
            },
            {
              status: ErrorStatus.缺货,
              code: 'OUT_OF_STOCK_ERROR_OS',
              statusName: '缺货',
              count: '',
            },
            {
              status: ErrorStatus.三方仓SKU未配对,
              code: 'THIRD_SKU_NOT_MAPPING_ERROR',
              statusName: '三方仓SKU未配对',
              count: '',
            },
          ],
        },
        {
          groupName: '待发货',
          list: [
            {
              status: ErrorStatus.转FBA创建失败,
              code: 'CREATE_FBA_ERROR',
              statusName: '转FBA创建失败',
              count: '',
            },
            {
              status: ErrorStatus.转FBA配送异常,
              code: 'SHIPPING_FBA_ERROR',
              statusName: '转FBA配送异常',
              count: '',
            },
            {
              status: ErrorStatus.物流下单失败,
              code: 'LOGISTICS_ORDER_ERROR',
              statusName: '物流下单失败',
              count: '',
            },
            {
              status: ErrorStatus.预占失败,
              code: 'REVERSE_ERROR',
              statusName: '预占失败',
              count: '',
            },
            {
              status: ErrorStatus.取消预占失败,
              code: 'CANCEL_REVERSE_ERROR',
              statusName: '取消预占失败',
              count: '',
            },
            {
              status: ErrorStatus.提交出库失败,
              code: 'COMMIT_OUT_ERROR',
              statusName: '提交出库失败',
              count: '',
            },
            {
              status: ErrorStatus.仓库出库失败,
              code: 'OUTBOUND_FAILED_ERROR',
              statusName: '仓库出库失败',
              count: '',
            },
          ],
        },
      ],
    },
    { status: OrderStatus.订单标发, code: 'markShipped', statusName: '订单标发', count: '' },
    { status: OrderStatus.废弃, code: 'abandon', statusName: '废弃', count: '' },
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
    // PENDING: 'yellow',
    未预占: 'yellow',
    预占成功: 'green',
    预占失败: 'red',
    NO_RESERVE: 'yellow',
    RESERVE_SUCCESS: 'green',
    RESERVE_FAILEDS: 'red',
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
    console.log(status);
    if (statusColorMap[status]) {
      return statusColorMap[status];
    }
    if (status > 500 && status < 600) {
      return 'red';
    }
    return '';
  };

  const countryCodeListSelectRef = ref(null);
  const customerRemarkNotNullSelectRef = ref(null);
  const customImportDialogRef = ref(null);
  const buyerRemarkNotNullSelectRef = ref(null);
  const resultDialogRef = ref(null);

  const time = ref<any>([]);
  const route = useRoute();
  const router = useRouter();
  const timeType = ref<number>(3);
  const pickerWidth = ref<number>(186);
  const handleTimeChange = (val) => {
    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    search.sendTimeStart = undefined;
    search.sendTimeEnd = undefined;
    search.payTimeStart = undefined;
    search.payTimeEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.createTimeStart = val[0] || '';
        search.createTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.sendTimeStart = val[0] || '';
        search.sendTimeEnd = val[1] || '';
      } else if (timeType.value === 3) {
        search.payTimeStart = val[0] || '';
        search.payTimeEnd = val[1] || '';
      }
      pickerWidth.value = 245;
    } else {
      pickerWidth.value = 186;
    }
  };
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const batchSearchRef = ref();
  const batchItemSearchRef = ref();
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
  } = useList<OmsApi.OmsOrderQueryList.RequestBody, OmsApi.OmsOrderQueryList.ResponseBody>({
    searchDefaults: {
      searchType: 2,
      sortParam: 'payTime_asc',
      itemSearchType: 1,
      searchKey: undefined,
      outboundStatus: undefined,
      itemSingleSearchKey: undefined,
      itemSearchKey: undefined,
      orderCode: undefined,
      customerName: undefined,
      productName: undefined,
      skuCode: undefined,
      skuKey: undefined,
      channelList: [],
      siteList: undefined,
      shopCodeList: undefined,
      creator: '',
      creatorList: [],
      orderSaleTypeList: [], // 订单渠道
      skuKeys: [], // sku数组
      orderBigStatus: '',
      // createTimeEnd: undefined,
      // createTimeStart: undefined,
      createTimeStart: dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      createTimeEnd: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      sendTimeStart: undefined,
      sendEndStart: undefined,
      payTimeStart: undefined,
      payTimeEnd: undefined,
      type: 4 /* 类型：0-红人发样单 1-线下订单 */,
      meReview: undefined,
      shippingCode: undefined,
      warehouseCodeList: undefined,
      shippingCodeList: undefined,
      amountMin: undefined,
      amountMax: undefined,
      auditCode: undefined,
      countryCodeList: undefined,
      customerTypeList: undefined,
      statusList: undefined,
      customerRemarkNotNull: undefined,
      buyerRemarkNotNull: undefined,
      errorRemark: undefined,
      markShippedStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    // service: omsApi.omsOrderQueryList,
    service: omsApi.omsFoOrderQueryList,
    interceptSearchData: (searchData) => {
      const { orderBigStatus, statusList } = searchData;
      // console.log(searchData.sortParam);
      let arr = searchData.sortParam?.split('_');
      let sort = { name: 'payTime', sort: 'asc' };
      if (arr?.length === 2) {
        sort.name = arr[0];
        sort.sort = arr[1];
      }
      return {
        ...searchData,
        orderBigStatus: statusList?.length ? undefined : orderBigStatus,
        sortParam: sort,
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
      {
        label: itemSearchTypeMap[search?.itemSearchType],
        key: 'itemSearchKey',
        value: search?.itemSearchKey,
      },
      {
        label: '客服备注',
        key: 'customerRemarkNotNull',
        value: customerRemarkNotNullSelectRef.value?.selectedLabel,
      },
      {
        label: '买家备注',
        key: 'buyerRemarkNotNull',
        value: buyerRemarkNotNullSelectRef.value?.selectedLabel,
      },
      {
        label: '异常信息',
        key: 'errorRemark',
        value: search?.errorRemark,
      },
    ];
  });

  const clearAll = () => {
    selectedList.value?.forEach((item) => {
      search[item?.key] = undefined;
    });
    batchSearchRef.value?.clear();
    batchItemSearchRef.value?.clear();
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

  const handleItemBlur = (e) => {
    if (e.target?.value) {
      search.itemSearchKey = '';
      batchItemSearchRef.value?.clear();
    }
  };

  const handleBatchClear = (val) => {
    search.searchKey = '';
  };
  const handleBatchSearch = (val) => {
    search.orderCode = undefined;
    search.searchKey = val?.replace(/\n/g, ',');
  };

  const handleBatchItemClear = (val) => {
    search.itemSearchKey = '';
  };
  const handleBatchItemSearch = (val) => {
    search.itemSingleSearchKey = undefined;
    search.itemSearchKey = val?.replace(/\n/g, ',');
  };

  // 表格选择
  const codeList = ref([]);
  const rowList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.erpCode);
    rowList.value = list;
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
        // console.log('getStockStatus', res);
        // return;
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
        // if (!val.recordList.some((item) => 'isOutStock' in item)) {
        //   getStockStatus(val.recordList);
        // }
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

  const timeMap: any = ref([
    {
      key: 'payTime_asc',
      value: "{ name: 'payTime', sort: 'asc' }",
      desc: '付款时间(早->晚)',
    },
    { key: 'payTime_desc', value: "{ name: 'payTime', sort: 'desc' }", desc: '付款时间(晚->早)' },
    // { key: 'sendTime_asc', value: "{ name: 'sendTime', sort: 'asc' }", desc: '发货时间(早->晚)' },
    // { key: 'sendTime_desc', value: "{ name: 'sendTime', sort: 'desc' }", desc: '发货时间(晚->早)' },
  ]);
  // 获取店铺
  const shopMap: any = ref([]);
  const queryShop = async () => {
    const res = await shopApi.luteosShopQueryShopCommonList({
      errorStatus: '1',
      platformCodes: search.channelList,
      pageNum: 1,
      pageSize: 100000,
    });
    // console.log('获取店铺', res);
    shopMap.value = res.shopListDetailResps || [];
  };
  queryShop();

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
  const logDialogRef = ref();
  const fbaOrderRef = ref();
  const logisticsOrderRef = ref(null);
  const batchReplacementDialogRef = ref(null);
  const replaceTitle = ref('批量换货');
  const handleActions = async (operation) => {
    const { key, row } = operation;
    switch (key) {
      case 'view': {
        detailRef.value?.open(row.erpCode);
        break;
      }
      case 'submit': {
        submitOutbound(row?.erpCode);
        break;
      }
      case 'abandon': {
        await abandonOrder(row?.erpCode);
        break;
      }
      case 'edit': {
        const path = router.resolve({
          name: 'shopifyOrderEdit',
          query: { code: row.erpCode },
        });
        router.push(path.href);
        break;
      }
      case 'subOrder': {
        subOrderDialogRef.value?.open(row.erpCode, true);
        break;
      }
      case 'remark': {
        remarkRef.value.open([row.erpCode]);
        break;
      }
      case 'unFreezze': {
        await unFreeze(row.erpCode);
        break;
      }
      case 'transferSelf': {
        await transferSelf(
          [row?.erpCode],
          row?.itemBeanList?.map((item) => item.supplySku)
        );
        break;
      }
      case 'replacement': {
        replaceTitle.value = '换货';
        batchReplacementDialogRef.value?.open([row.erpCode], true);
        break;
      }
      case 'uploadTrackingNumber': {
        await uploadTrackingNumber(row);
        break;
      }
      case 'markShipped': {
        await markShipped(row);
        break;
      }
      case 'updateMarkShipped': {
        await updateMarkShipped([row]);
        break;
      }
      case 'forbidden': {
        if (!forbidDialogRef.value) return;
        if (!row.erpCode) return;
        forbidDialogRef.value.open([row.erpCode]);
        break;
      }
      case 'fbaSend': {
        if (!fbaOrderRef.value) return;
        fbaOrderRef.value.open(row);
        break;
      }
      case 'orderAgain': {
        // 重新下单
        if (!logisticsOrderRef.value) return;
        logisticsOrderRef.value?.open({ orderCode: row.erpCode, type: 'shopify' });
        break;
      }
      case 'setShipping': {
        batchShippingDialogRef.value?.open([row?.erpCode], row);
        break;
      }
      case 'cancelOutbound': {
        cancelOutbound(row.erpCode);
        break;
      }
      case 'log': {
        logDialogRef.value?.open(row?.erpCode);
        break;
      }
      case 'uploadFile': {
        customImportDialogRef.value?.open(row?.erpCode);
        break;
      }
      case 'reExecuteOrderRule': {
        orderPush('重新执行订单规则', '按订单规则执行，是否提交?', row?.erpCode);
        break;
      }
      case 'addGift': {
        handleSingleAddGift(row);
        break;
      }
      default:
        break;
    }
  };
  const handleBatchMarkShipped = async () => {
    const rows = getCheckedList();
    const validRows = rows.filter((item) => item && item.erpCode);
    if (!validRows.length) {
      ElMessage.warning('未找到可标记发货的订单');
      return;
    }
    markShipped(validRows);
  };
  const markShipped = async (rowsOrRow) => {
    const rows = Array.isArray(rowsOrRow) ? rowsOrRow : rowsOrRow ? [rowsOrRow] : [];
    const validRows = rows.filter((item) => item && item.erpCode);
    if (!validRows.length) {
      ElMessage.warning('未找到可标记发货的订单');
      return;
    }
    const isConfirmed = await swal.confirm({
      title: '标记发货确认',
      text:
        validRows.length === 1
          ? '确认标记发货？'
          : `已选中${validRows.length}个订单，\n 确认标记发货？`,
    });
    if (!isConfirmed) return;
    const codes = rows.map((item) => item.erpCode);
    if (!codes.length) return;
    const res = (await omsApi.omsFulfillmentOrderMarkShipped({ codes })) as any;
    if (res?.failList?.length) {
      resultDialogRef.value?.open(res?.failList, '标记发货');
    } else {
      ElMessage.success(`标记发货成功`);
    }
    refreshList();
    clearCheckBoxSelection();
  };
  const handleBatchUpdateMarkShipped = async () => {
    const rows = getCheckedList();
    const validRows = rows.filter((item) => item && item.erpCode);
    if (!validRows.length) {
      ElMessage.warning('未找到可标记发货的订单');
      return;
    }
    updateMarkShipped(validRows);
  };
  const updateMarkShipped = async (rows) => {
    const labels = rows.map((e) => {
      return e.erpCode;
    });
    const isConfirmed = await swal.confirm({
      title: '更新标发确认',
      html: `<div>[${labels.join(
        ', '
      )}]共计<span style="color: #f56c6c !important; font-weight: 500;">${
        labels.length
      }</span>个订单，<br/>跟踪号未更新，无法更新标发</div>`,
    });

    if (!isConfirmed) return;
    const res = (await omsApi.omsFulfillmentOrderUpdateMarkShipped({
      codes: labels,
    })) as any;
    if (res?.failList?.length) {
      resultDialogRef.value?.open(res?.failList, '更新标发');
    } else {
      ElMessage.success('更新标发成功');
    }
    refreshList();
    if (labels.length > 1) {
      clearCheckBoxSelection();
    }
  };
  const uploadTrackingNumberDialogRef = ref<InstanceType<typeof UploadTrackingNumberDialog>>();
  const currentUploadRow = ref<any>(null);

  const uploadTrackingNumber = (row: any) => {
    currentUploadRow.value = row;
    console.log(`row`, row);
    uploadTrackingNumberDialogRef.value?.open(undefined, row.erpCode);
  };

  const handleTrackingNumberConfirm = async ({
    trackingNumber,
    markShipped,
    code,
  }: {
    trackingNumber: string;
    markShipped: boolean;
    code: string;
  }) => {
    console.log(trackingNumber, markShipped, code);
    if (!currentUploadRow.value) return;
    if (!trackingNumber) {
      ElMessage.warning('跟踪号不能为空');
      return;
    }
    if (!code) {
      ElMessage.warning('订单号不能为空');
      return;
    }
    try {
      const trimmedTrackingNumber = trackingNumber.trim();

      await omsApi.omsFulfillmentOrderUploadTrackingNo({
        code,
        trackingNo: trimmedTrackingNumber,
        operationType: markShipped ? 2 : 1,
      });
      ElMessage.success(markShipped ? '上传跟踪号并标记发货成功' : '上传跟踪号成功');

      refreshList();
      currentUploadRow.value = null;
    } catch (error) {
      console.error('上传跟踪号失败:', error);
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
      await erpApi.luteosErpOrderSaveRemark({
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
      const res = await omsApi.omsFulfillmentOrderUpdateCustomRemark({
        erpCode: row?.erpCode,
        customRemark: customerRemark.value,
        isShopify: true,
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
  const selfFulTagDialogRef = ref(null);
  const disPlayLabelist = (row) => {
    if (!row?.orderRisk === '中风险') {
      return [{ labelCode: '1', labelName: 'Shopify-中风险订单', warn: true }];
    }
    if (!row?.orderRisk === '高风险') {
      return [{ labelCode: '1', labelName: 'Shopify-高风险订单', warn: true }];
    }
    if (!row?.deliveryCode) return [];
    return row.deliveryCode === '1' ? [{ labelCode: '1', labelName: 'FBA' }] : [];
  };
  const handleClickLabelMake = (row) => {
    if (!selfFulTagDialogRef.value) return;
    selfFulTagDialogRef.value.open({
      erpcode: row.erpCode,
      labellist: row.orderLabelList,
    });
  };
  // 批量修改标签
  const handleBatchLabel = () => {
    if (!selfFulTagDialogRef.value) return;
    selfFulTagDialogRef.value.open({}, 'batch');
  };

  const handleLabelConfirm = async (value) => {
    if (!value.erpcode) return;
    try {
      const res = await omsApi.omsFulfillmentOrderUpdateLabel({
        module: 'oms_order',
        erpCode: value.erpcode,
        tabelList: (value.labelList || []).map((item) => {
          return {
            labelCode: item.labelCode,
            labelName: item.name,
          };
        }),
      });
      ElMessage.success(value.labelList?.length ? '更新标签成功' : '取消标签成功');
      refreshList();
    } catch (e) {
      /* empty */
    } finally {
      /* empty */
    }
  };
  const handleLabelConfirmMulti = async (value) => {
    if (!batchIntercept()) return;
    if (!value.labelList || !value.labelList.length) return;
    const confirmedList =
      // tableRef.value
      //   .getCheckboxRecords()
      getCheckedList()
        ?.filter((item) => item && item.erpCode)
        .map((item) => item.erpCode) || [];
    if (!confirmedList.length) {
      ElMessage.warning('未找到可修改标签的订单');
      return;
    }
    const isConfirmed = await swal.confirm({
      title: '批量追加标签确认',
      text: `已选中${confirmedList.length}个订单，\n 确认追加标签？`,
    });
    if (!isConfirmed) return;
    try {
      await omsApi.omsFulfillmentOrderAddLabel({
        erpCodes: confirmedList,
        tabelList: (value.labelList || []).map((item) => {
          return {
            labelCode: item.labelCode,
            labelName: item.name,
          };
        }),
      });
      ElMessage.success('批量追加标签成功');
      refreshList();
      clearCheckBoxSelection();
    } catch (e) {}
  };
  const handleLabelRemoveTag = async (value) => {
    if (!batchIntercept()) return;
    if (!value.labelList || !value.labelList.length) return;
    const confirmedList =
      getCheckedList()
        ?.filter((item) => item && item.erpCode)
        .map((item) => item.erpCode) || [];
    if (!confirmedList.length) {
      ElMessage.warning('未找到可修改标签的订单');
      return;
    }
    const isConfirmed = await swal.confirm({
      title: '批量删除标签确认',
      text: `已选中${confirmedList.length}个订单，\n 确认删除标签？`,
    });
    if (!isConfirmed) return;
    try {
      const res = await omsApi.omsFulfillmentOrderDelLabel({
        erpCodes: confirmedList,
        tabelList: (value.labelList || []).map((item) => {
          return {
            labelCode: item.labelCode,
            labelName: item.name,
          };
        }),
      });
      ElMessage.success('批量删除标签成功');
      refreshList();
      clearCheckBoxSelection();
    } catch (e) {}
  };

  const abandonOrder = async (erpCode = null) => {
    if (!erpCode && !batchIntercept()) {
      return;
    }
    const isConfirmed = await swal.confirm({
      title: `确定作废订单吗`,
      text: '作废订单后该订单将无法恢复',
    });
    if (!isConfirmed) return;
    const res = await omsApi.omsFulfillmentOrderBatchAbandon({
      orderCodeList: erpCode ? [erpCode] : codeList.value,
    });
    if (res?.failList.length > 0) {
      resultDialogRef.value?.open(res?.failList, '作废');
    } else {
      ElMessage.success('作废成功');
    }
    if (!erpCode) {
      clearCheckBoxSelection();
    }
    refreshList();
  };

  const batchReplacement = () => {
    const illegalList = getCheckedList()?.filter(
      (item) =>
        ![
          OrderStatus.待系统内审核,
          ErrorStatus.未匹配仓库物流,
          ErrorStatus.缺货,
          ErrorStatus.三方仓SKU未配对,
          ErrorStatus.预占失败,
        ].includes(item?.orderStatus)
    );
    if (illegalList.length > 0) {
      ElMessage.warning(
        '只有待审核、未匹配仓库物流、缺货、三方仓SKU未配对、预占失败的订单支持【批量换货】操作'
      );
      return;
    }
    replaceTitle.value = '批量换货';
    batchReplacementDialogRef.value?.open(codeList.value, true);
  };
  // 批量处理fba
  const multipleSelectDialogRef = ref();
  const handleMultipleSelect = (row) => {
    if (!multipleSelectDialogRef.value) return;
    multipleSelectDialogRef.value?.open(codeList.value);
  };

  // 批量拆单
  const batchSubOrderDialogRef = ref();
  const batchSubOrder = async () => {
    const illegalList = getCheckedList()?.filter(
      (item) =>
        ![
          OrderStatus.待系统内审核,
          ErrorStatus.未匹配仓库物流,
          ErrorStatus.缺货,
          ErrorStatus.预占失败,
          ErrorStatus.三方仓SKU未配对,
        ].includes(item?.orderStatus)
    );
    if (illegalList.length > 0) {
      ElMessage.warning(
        '只有待审核、未匹配仓库物流、缺货、预占失败、三方仓SKU未配对的订单支持【批量拆单】操作'
      );
      return;
    }
    batchSubOrderDialogRef.value?.open(codeList.value);
  };

  const handleClose = () => {
    clearCheckBoxSelection();
    refreshList();
  };

  // 取消预占
  const orderCancelReverse = async (title, text = '', erpCode = null) => {
    if (!erpCode && !batchIntercept()) {
      return;
    }
    const isConfirmed = await swal.confirm({
      title: `确定${title}吗？`,
      text,
    });
    if (!isConfirmed) return;
    const res = await omsApi.omsFulfillmentOrderCancelReverse({
      codes: erpCode ? [erpCode] : codeList.value,
    });
    if (res?.failList.length > 0) {
      resultDialogRef.value?.open(res?.failList, title);
    } else {
      ElMessage.success(`${title}成功`);
    }
    refreshList();
    clearCheckBoxSelection();
  };
  // 重新执行订单规则、更新MSKU配对信息、更新三方仓SKU配对信息 均调此接口
  const orderPush = async (title, text = '', erpCode = null) => {
    if (!erpCode && !batchIntercept()) {
      return;
    }
    const isConfirmed = await swal.confirm({
      title: `确定${title}吗？`,
      text,
    });
    if (!isConfirmed) return;
    const res = await omsApi.omsFulfillmentOrderPush({
      codes: erpCode ? [erpCode] : codeList.value,
    });
    if (res?.failList.length > 0) {
      resultDialogRef.value?.open(res?.failList, title);
    } else {
      ElMessage.success(`${title}成功`);
    }
    refreshList();
    clearCheckBoxSelection();
  };

  const isErrorTab = computed(() => {
    return search.orderBigStatus === OrderStatus.异常订单 && !search.statusList?.length;
  });
  // 订单处理
  const batchOptions = computed(() => {
    return [
      {
        title: '批量修改标签',
        fn: handleBatchLabel,
      },
      {
        title: '更新MSKU配对信息',
        hide: !isErrorTab.value,
        fn: () => {
          const illegalList = getCheckedList()?.filter(
            (item) => item?.orderStatus !== ErrorStatus.MSKU未配对
          );
          if (illegalList.length > 0) {
            ElMessage.warning('只有MSKU未配对的订单支持【更新MSKU配对信息】操作');
            return;
          }
          orderPush('更新MSKU配对信息');
        },
      },
      {
        title: '重新执行订单规则',
        hide:
          !isErrorTab.value &&
          search.orderBigStatus !== OrderStatus.待审核 &&
          !search.statusList?.includes(ErrorStatus.缺货),
        fn: () => {
          const illegalList = getCheckedList()?.filter(
            (item) =>
              ![OrderStatus.待系统内审核, ErrorStatus.缺货, ErrorStatus.未匹配仓库物流].includes(
                item?.orderStatus
              )
          );
          if (illegalList.length > 0) {
            ElMessage.warning('只有待审核、缺货、未匹配仓库物流的订单支持【重新执行订单规则】操作');
            return;
          }
          orderPush('重新执行订单规则', '按订单规则执行，是否提交?');
        },
      },
      {
        title: '批量设置仓库物流',
        hide:
          search.orderBigStatus !== OrderStatus.待审核 &&
          !isErrorTab.value &&
          !search.statusList?.includes(ErrorStatus.缺货) &&
          !search.statusList?.includes(ErrorStatus.预占失败),
        fn: () => batchShipping(codeList.value),
      },
      {
        title: '提交发货',
        hide: search.orderBigStatus !== OrderStatus.待审核 && !isErrorTab.value,
        fn: submitOutbound,
      },
      {
        title: '取消预占',
        hide: !isErrorTab.value && !search.statusList?.includes(ErrorStatus.取消预占失败),
        fn: () => {
          const illegalList = getCheckedList()?.filter(
            (item) => item?.orderStatus !== ErrorStatus.取消预占失败
          );
          if (illegalList.length > 0) {
            ElMessage.warning('只有取消预占失败的订单支持【取消预占】操作');
            return;
          }
          orderCancelReverse('取消预占');
        },
      },
      {
        title: '截单',
        hide: !(
          [OrderStatus.待发货].includes(search?.orderBigStatus) ||
          isErrorTab.value ||
          search.statusList?.includes(ErrorStatus.物流下单失败)
        ),
        fn: cancelOutbound,
      },
      // {
      //   title: '转FBA发货',
      //   fn: handleMultipleSelect,
      // },
      {
        title: '转自配送',
        hide: !isErrorTab.value,
        fn: batchTransferSelf,
      },
      {
        title: '禁止处理',
        fn: handleBatchForbid,
        hide:
          // !checkPermission('B2BOrderEdit') ||
          !isErrorTab.value &&
          ![OrderStatus.全部, OrderStatus.待审核].includes(search.orderBigStatus) &&
          !search.statusList?.some((item) =>
            [
              ErrorStatus.MSKU未配对,
              ErrorStatus.未匹配仓库物流,
              ErrorStatus.缺货,
              ErrorStatus.三方仓SKU未配对,
              ErrorStatus.预占失败,
              ErrorStatus.提交出库失败,
              ErrorStatus.取消预占失败,
            ].includes(item)
          ),
        color: '#F53F3F',
      },
      {
        title: '批量添加赠品',
        fn: handleBatchAddGift,
        hide:
          ![OrderStatus.待审核].includes(search.orderBigStatus) &&
          !isErrorTab.value &&
          !search.statusList?.some((item) =>
            [
              ErrorStatus.未匹配仓库物流,
              ErrorStatus.缺货,
              ErrorStatus.三方仓SKU未配对,
              ErrorStatus.预占失败,
            ].includes(item)
          ),
      },
      {
        title: '解除禁止',
        hide:
          ![OrderStatus.全部].includes(search.orderBigStatus) &&
          !isErrorTab.value &&
          !search.statusList?.some((item) =>
            [
              ErrorStatus.未匹配仓库物流,
              ErrorStatus.三方仓SKU未配对,
              ErrorStatus.预占失败,
            ].includes(item)
          ),
        fn: unFreeze,
      },
      {
        title: '作废',
        hide: [OrderStatus.已发货, OrderStatus.废弃].includes(search.orderBigStatus),
        fn: () => {
          const illegalList = getCheckedList()?.filter((item) =>
            [OrderStatus.已发货, OrderStatus.废弃].includes(item?.orderStatus)
          );
          if (illegalList.length > 0) {
            ElMessage.warning('已发货、废弃的订单不支持【作废】操作');
            return;
          }
          abandonOrder();
        },
        color: '#F53F3F',
      },
      // {
      //   title: '添加赠品',
      // },
      {
        title: '批量标记发货',
        fn: handleBatchMarkShipped,
        hide: ![OrderStatus.订单标发].includes(search.orderBigStatus as any),
        // TODO 等待列表页条件加上后再进行隐藏
      },
      {
        title: '批量更新标发',
        fn: handleBatchUpdateMarkShipped,
        hide: ![OrderStatus.订单标发].includes(search.orderBigStatus as any),
      },
      {
        title: '批量拆单',
        hide:
          search.orderBigStatus !== OrderStatus.待审核 &&
          !search.statusList?.includes(ErrorStatus.未匹配仓库物流) &&
          !search.statusList?.includes(ErrorStatus.缺货) &&
          !search.statusList?.includes(ErrorStatus.预占失败) &&
          !search.statusList?.includes(ErrorStatus.三方仓SKU未配对),
        fn: batchSubOrder,
      },
      {
        title: '批量换货',
        hide:
          // !checkPermission('B2BOrderEdit') ||
          search.orderBigStatus !== OrderStatus.待审核 &&
          !isErrorTab.value &&
          !search.statusList?.includes(ErrorStatus.未匹配仓库物流) &&
          !search.statusList?.includes(ErrorStatus.缺货) &&
          !search.statusList?.includes(ErrorStatus.预占失败),
        fn: batchReplacement,
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
  const forbidDialogRef = ref();
  // 批量禁止处理
  const handleBatchForbid = () => {
    const illegalList = getCheckedList()?.filter(
      (item) =>
        search.orderBigStatus !== OrderStatus.待审核 &&
        ![
          OrderStatus.待系统内审核,
          ErrorStatus.MSKU未配对,
          ErrorStatus.未匹配仓库物流,
          ErrorStatus.缺货,
          ErrorStatus.三方仓SKU未配对,
          ErrorStatus.预占失败,
          ErrorStatus.提交出库失败,
          ErrorStatus.取消预占失败,
        ].includes(item?.orderStatus)
    );
    if (illegalList.length > 0) {
      ElMessage.warning(
        '只有待审核、MSKU未配对、未匹配仓库物流、缺货、三方仓SKU未配对、预占失败、提交出库失败、取消预占失败的订单支持【禁止处理】操作'
      );
      return;
    }
    if (!forbidDialogRef.value) return;
    forbidDialogRef.value.open(codeList.value);
  };
  const addGiftDialogRef = ref();
  const selectedGiftList = ref<any>();
  const selectedOrderList = ref<any[]>([]);
  // 批量添加赠品
  const handleBatchAddGift = () => {
    if (!batchIntercept()) return;
    const filteredOrders = getCheckedList()?.filter(
      (item) =>
        search.orderBigStatus === OrderStatus.待审核 ||
        item?.orderStatus === OrderStatus.待系统内审核 ||
        [
          ErrorStatus.未匹配仓库物流,
          ErrorStatus.缺货,
          ErrorStatus.三方仓SKU未配对,
          ErrorStatus.预占失败,
        ].includes(item?.orderStatus)
    );
    if (!filteredOrders || filteredOrders.length === 0) {
      ElMessage.warning(
        '只有待审核、未匹配仓库物流、缺货、三方仓SKU未配对、预占失败的订单支持【添加赠品】操作'
      );
      return;
    }
    selectedOrderList.value = filteredOrders;
    selectedGiftList.value = filteredOrders.map((item: any) => item.erpCode);
    addGiftDialogRef.value?.open(selectedOrderList.value);
  };
  // 单独添加赠品
  const handleSingleAddGift = (row: any) => {
    if (!row) return;
    selectedOrderList.value = [row];
    selectedGiftList.value = [row.erpCode as any];
    addGiftDialogRef.value?.open([row]);
  };
  const giftAddSuccess = async (row) => {
    if (!row) return;
    // if(!selectedGiftList.value) return;
    // const itemInfoList = row.filter((item:any)=>item).map((item:any)=>{
    //   return {
    //     skuCode:item.skuCode,
    //     supplySku:item.supplySku,
    //     num:item.num,
    //     // warehouseCode:item.warehouseCode,
    //     price:0,
    //   }
    // });

    // const res = await omsApi.omsOrderSaveItemGift({
    //   erpCodes: selectedGiftList.value,
    //   itemInfoList: itemInfoList,
    // });
    // if (res?.failList?.length > 0) {

    // } else {
    //   ElMessage.success('添加赠品成功');
    // }
    const params = row;
    const res = await omsApi.omsOrderSaveItemGift({
      giftOrderList: params,
    });
    if (res?.failList?.length > 0) {
      resultDialogRef.value?.open(res?.failList, '添加赠品');
      throw new Error('添加赠品失败');
    } else {
      ElMessage.success('添加赠品成功');
      addGiftDialogRef?.value?.close();
      refreshList();
      clearCheckBoxSelection();
    }
  };
  // 提交发货
  const submitOutbound = async (erpCode = null) => {
    if (!erpCode && !batchIntercept()) {
      return;
    }
    if (!erpCode) {
      const illegalList = getCheckedList()?.filter(
        (item) =>
          search.orderBigStatus !== OrderStatus.待审核 &&
          item?.orderStatus !== OrderStatus.待系统内审核 &&
          item?.orderStatus !== ErrorStatus.预占失败 &&
          item?.orderStatus !== ErrorStatus.提交出库失败
      );
      if (illegalList.length > 0) {
        ElMessage.warning('只有待审核、预占失败、提交出库失败的订单支持【提交发货】操作');
        return;
      }
    }
    ElMessageBox.confirm('确认提交发货吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      showClose: false,
      closeOnClickModal: false,
      beforeClose: async (action, instance, done) => {
        // 只有点击确定按钮才执行异步操作
        if (action === 'confirm') {
          // 1. 确定按钮进入加载状态（显示 loading 图标，按钮禁用）
          instance.confirmButtonLoading = true;
          // 可选：修改按钮文字
          instance.confirmButtonText = '提交中...';
          try {
            const res = await omsApi.omsFulfillmentOrderSubmitOutbound({
              codes: erpCode ? [erpCode] : codeList.value,
            });
            if (res?.failList.length > 0) {
              resultDialogRef.value?.open(res?.failList, '提交发货');
            } else {
              ElMessage.success('提交发货成功');
            }
            if (!erpCode) clearCheckBoxSelection();
            refreshList();
            // 3. 接口成功，关闭弹窗
            done();
          } catch (error) {
            ElMessage.error(error.message || '操作失败');
            // 4. 接口失败，恢复按钮状态，弹窗保持打开
            instance.confirmButtonLoading = false;
            instance.confirmButtonText = '确定';
            // 注意：不调用 done()，弹窗不会关闭
          }
        } else {
          // 点击取消或关闭按钮，直接关闭弹窗
          done();
        }
      },
    }).catch(() => {});
    // const isConfirmed = await swal.confirm('确认提交发货吗？');
    // if (!isConfirmed) return;
    // const res = await omsApi.omsFulfillmentOrderSubmitOutbound({
    //   codes: erpCode ? [erpCode] : codeList.value,
    // });
    // if (res?.failList.length > 0) {
    //   resultDialogRef.value?.open(res?.failList, '提交发货');
    // } else {
    //   ElMessage.success('提交发货成功');
    // }
    // if (!erpCode) clearCheckBoxSelection();
    // refreshList();
  };

  // 批量设置仓库物流
  const batchShippingDialogRef = ref(null);
  const batchShipping = (erpCodeList) => {
    if (!batchIntercept()) return;
    const illegalList = getCheckedList()?.filter(
      (item) =>
        search.orderBigStatus !== OrderStatus.待审核 &&
        item?.orderStatus !== OrderStatus.待系统内审核 &&
        item?.orderStatus !== ErrorStatus.未匹配仓库物流 &&
        item?.orderStatus !== ErrorStatus.缺货 &&
        item?.orderStatus !== ErrorStatus.物流下单失败 &&
        item?.orderStatus !== ErrorStatus.预占失败
    );
    if (illegalList.length > 0) {
      ElMessage.warning(
        '只有待发货、未匹配仓库物流、缺货、物流下单失败、预占失败的订单支持【设置仓库物流】操作'
      );
      return;
    }
    batchShippingDialogRef.value?.open(erpCodeList);
  };

  // 截单
  const cancelOutbound = async (erpCode = null) => {
    if (!erpCode && !batchIntercept()) {
      return;
    }
    if (!erpCode) {
      const illegalList = getCheckedList()?.filter(
        (item) =>
          search.orderBigStatus !== OrderStatus.待发货 &&
          ![ErrorStatus.物流下单失败, ErrorStatus.提交出库失败, ErrorStatus.仓库出库失败].includes(
            item?.orderStatus
          )
      );
      if (illegalList.length > 0) {
        ElMessage.warning(
          '只有待发货、物流下单失败、提交出库失败、仓库出库失败的订单支持【截单】操作'
        );
        return;
      }
    }
    ElMessageBox.confirm('确认截单吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      showClose: false,
      closeOnClickModal: false,
      beforeClose: async (action, instance, done) => {
        // 只有点击确定按钮才执行异步操作
        if (action === 'confirm') {
          // 1. 确定按钮进入加载状态（显示 loading 图标，按钮禁用）
          instance.confirmButtonLoading = true;
          // 可选：修改按钮文字
          instance.confirmButtonText = '提交中...';
          try {
            const res = await omsApi.omsFulfillmentOrderCancelOutbound({
              codes: erpCode ? [erpCode] : codeList.value,
            });
            if (res?.failList.length > 0) {
              resultDialogRef.value?.open(res?.failList, '截单');
            } else {
              ElMessage.success('截单成功');
            }
            if (!erpCode) clearCheckBoxSelection();
            refreshList();
            // 3. 接口成功，关闭弹窗
            done();
          } catch (error) {
            ElMessage.error(error.message || '操作失败');
            // 4. 接口失败，恢复按钮状态，弹窗保持打开
            instance.confirmButtonLoading = false;
            instance.confirmButtonText = '确定';
            // 注意：不调用 done()，弹窗不会关闭
          }
        } else {
          // 点击取消或关闭按钮，直接关闭弹窗
          done();
        }
      },
    }).catch(() => {});
    // const isConfirmed = await swal.confirm('确认截单吗？');
    // if (!isConfirmed) return;
    // const res = await omsApi.omsFulfillmentOrderCancelOutbound({
    //   codes: erpCode ? [erpCode] : codeList.value,
    // });
    // if (res?.failList.length > 0) {
    //   resultDialogRef.value?.open(res?.failList, '截单');
    // } else {
    //   ElMessage.success('截单成功');
    // }
    // if (!erpCode) clearCheckBoxSelection();
    // refreshList();
  };

  // 解除禁止
  const unFreeze = async (erpCode = null) => {
    if (!erpCode && !batchIntercept()) {
      return;
    }
    if (!erpCode) {
      const illegalList = getCheckedList()?.filter(
        (item) => item?.orderStatus !== ErrorStatus.禁止处理
      );
      if (illegalList.length > 0) {
        ElMessage.warning('只有禁止处理的订单支持【解除禁止】操作');
        return;
      }
    }
    const isConfirmed = await swal.confirm({
      title: '确认解除禁止吗？',
      text: '解除禁止后，订单将继续按规则执行',
    });
    if (!isConfirmed) return;
    const res = await omsApi.omsFulfillmentOrderBatchUnFreeze({
      erpCodeList: erpCode ? [erpCode] : codeList.value,
    });
    if (res?.failList.length > 0) {
      resultDialogRef.value?.open(res?.failList, '解除禁止');
    } else {
      ElMessage.success('解除禁止成功');
    }
    if (!erpCode) clearCheckBoxSelection();
    refreshList();
  };

  // 转自配送
  const transferSelfDialogRef = ref(null);
  const transferSelf = (erpCodeList, skuList) => {
    if (!erpCodeList?.length && !batchIntercept()) {
      return;
    }
    const illegalList = getCheckedList()?.filter(
      (item) =>
        item?.orderStatus !== ErrorStatus.转FBA创建失败 &&
        item?.orderStatus !== ErrorStatus.转FBA配送异常
    );
    if (illegalList.length > 0) {
      ElMessage.warning('只有转平台仓发货的订单支持【转自配送】操作');
      return;
    }
    transferSelfDialogRef.value?.open(erpCodeList, skuList);
  };

  const batchTransferSelf = () => {
    transferSelf(
      codeList.value,
      rowList.value?.flatMap((row) => row.itemBeanList?.map((item) => item.supplySku))
    );
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
            uploadService: erpApi.luteosErpOrderAddUpload,
            templateService: erpApi.luteosErpOrderAddDownTemplate,
          });
        },
      },
      {
        title: '批量更改地址',
        hide: !checkPermission('updateAddressUpload'),
        fn: () => {
          importDialogRef.value?.open({
            title: '批量更改地址',
            uploadService: erpApi.luteosErpOrderUpdateAddressUpload,
            templateService: erpApi.luteosErpOrderDownUpdateAddressTemplate,
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
            uploadService: erpApi.luteosErpOrderOrderAttachUpload,
            limit: 10,
            multiple: true,
          });
        },
      },
      // {
      //   title: '导入附件',
      //   fn: () => {
      //     customImportDialogRef.value?.open({
      //       codeList: codeList.value,
      //     });
      //   },
      // },
    ];
  });
  // 查看附件
  const handleClickCheckFile = () => {
    console.log(`check file`);
  };
  const batchExportOptions = computed(() => {
    return [
      {
        title: '导出自发货订单（商品维度）',
        fn: () => {
          exportFunc();
        },
      },
    ];
  });
  const exportFunc = async () => {
    try {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      // 导出 sortParam参数改造
      let arr = search?.sortParam.split('_');
      let sort = { name: 'payTime', sort: 'asc' };
      if (arr?.length === 2) {
        sort.name = arr[0];
        sort.sort = arr[1];
      }
      const res = await omsApi.omsOrderOrderDownload({
        //  ...search,
        ...search,
        sortParam: sort,
        type: 4,
        pageNum: current.value,
        pageSize: pageSize.value,
      });
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
      router.push(path);
    } finally {
    }
  };
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
  const batchExportIntercept = (item) => {
    return true;
  };

  const handleTabChange = (val) => {
    clearCheckBoxSelection();
    search.statusList = undefined;
    search.orderBigStatus = val;
    search.meReview = val === '200' ? true : undefined;
  };

  const handleChildTabChange = (val) => {
    clearCheckBoxSelection();
    search.orderBigStatus = OrderStatus.异常订单;
    search.statusList = [val];
    search.meReview = val === '200' ? true : undefined;
  };

  const reset = () => {
    batchSearchRef.value?.clear();
    batchItemSearchRef.value?.clear();
    const start = dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    time.value = [start, end]; // 设置默认的日期范围
    // time.value = [];
    resetSearch();
  };

  watch(
    () => listData.value,
    (val) => {
      if (val?.recordList?.length) {
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
    // const res = await platformApi.platformSearchQueryConditionList({
    //   platform: 'lute_erp',
    //   moduleType: 'list',
    //   itemType: route?.name,
    //   pageSize: 1,
    //   pageNum: 1,
    // });

    // if (res?.recordList1?.length) {
    //   const hideList = JSON.parse(res?.recordList[0]?.searchCondition);
    //   customFieldList.value = customFields?.map((item) => {
    //     return {
    //       ...item,
    //       propertyArr: item.propertyArr?.map((k) => {
    //         return {
    //           ...k,
    //           checked: !hideList?.includes(k?.key),
    //         };
    //       }),
    //       checkedArr: item.propertyArr
    //         ?.filter((item) => !hideList?.includes(item?.key))
    //         ?.map((k) => k.key),
    //     };
    //   });
    //   conditionCode.value = res?.recordList[0]?.conditionCode;
    // } else {
    customFieldList.value = customFields?.map((item) => {
      return {
        ...item,
        checkedArr: item.propertyArr?.filter((item) => item.checked)?.map((k) => k.key),
      };
    });
    console.log(customFieldList.value, 222);
    // }
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

  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };

  onMounted(() => {
    queryCustomFieldList();
    queryExportCustomFieldList();
    document.addEventListener('click', handleClickOutside);
    const start = dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    time.value = [start, end]; // 设置默认的日期范围
    handleTimeChange(time.value);
  });

  // 编辑成功后 返回列表 刷新表格数据
  onActivated(() => {
    if (route.params) {
      route.params.edit == 'true' && refreshList();
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
    margin-left: -28px;

    .detail-left {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      padding: 10px 12px;
      //border-right: 1px solid #f5f5f5;

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
            justify-content: space-between;
            gap: 12px;

            .left {
              display: flex;
              gap: 10px;
              width: 34.77%;

              .product-img {
                position: relative;

                img {
                  width: 36px;
                  height: 36px;
                  margin-top: 3px;
                  border-radius: 8px;
                }

                /*.icon-quehuobiaoqian {

      }*/
                .giftStock {
                  width: 20px;
                  position: absolute;
                  top: -15px;
                  right: -5px;
                }
              }

              .product-title {
                min-width: 200px;
                margin-bottom: 2px;
              }
            }

            .right {
              width: 21.16%;
            }

            .num {
              width: 11.7%;
            }

            .price {
              width: 26.95%;
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
      width: 87px;
      flex-shrink: 0;
      min-height: 198px;
      :deep(.content) {
        font-family: 'PingFang SC Medium' !important;
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

      .icon-bianji {
        font-size: 14px;
      }
    }
  }

  .first-header {
    flex-wrap: nowrap;
    white-space: nowrap;
    position: relative;
    z-index: 2;
    .platform-icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }

  .table-item-check {
    padding: 0px 10px 10px 10px;
    color: #0045f0;
    cursor: pointer;
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

  .freeze {
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 6px;
    background: #f53f3f;
    color: #ffffff;
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

  .address-detail-btn {
    margin-left: 4px;
    font-size: 12px;
    cursor: pointer;
  }
</style>
