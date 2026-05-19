<template>
  <el-drawer
    class="detail-drawer"
    v-model="showDetail"
    direction="rtl"
    :size="drawerWid"
    :show-close="false"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    @opened="handleDrawerOpened"
    @closed="handleDrawerClosed"
    @close="handleDrawerBeforeClosed"
  >
    <template #header>
      <div class="detail-title">
        <div class="t1">订单详情</div>
        <div class="table-item-header">
          <div class="item pl16">
            <span class="header-label">订单号：</span>
            {{ form.baseInfo.erpCode || '-' }}
            <Copy :content="form.baseInfo.erpCode" style="color: #999999" />
          </div>
          <div class="item ml20">
            <span class="header-label">参考单号：</span>
            {{ form.baseInfo.refNo || '-' }}
            <Copy :content="form.baseInfo.refNo" style="color: #999999" />
          </div>
          <!-- <Tag :color="statusColorMap[form.baseInfo.orderStatus]" class="ml20"> -->
          <Tag :color="tagColor(form.baseInfo.orderStatus)" class="ml20">
            {{ form.baseInfo?.orderStatusDesc }}
          </Tag>
        </div>
        <div class="tool">
          <el-tooltip content="上一条" placement="top">
            <i @click="queryPrev" class="iconfont icon-jiantouxiangshang cursor-pointer"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip content="下一条" placement="top">
            <i @click="queryNext" class="iconfont icon-jiantouxiangxia cursor-pointer"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip v-if="!isFull" content="全屏查看" placement="top">
            <i @click="fullScreen" class="iconfont icon-quanping cursor-pointer"></i>
          </el-tooltip>
          <el-tooltip v-else content="退出全屏" placement="top">
            <i @click="fullScreen" class="iconfont icon-shouqiquanping cursor-pointer item"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip content="刷新" placement="top">
            <i @click="refresh" class="iconfont icon-shuaxinjiazai cursor-pointer"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip content="关闭" placement="top">
            <i @click="quit" class="iconfont icon-guanbi cursor-pointer"></i>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div>
      <div v-if="form.baseInfo.orderStatus !== 101">
        <AuditHeader
          :flowName="form.baseInfo.flowName"
          :baseInfo="form.baseInfo"
          :authNodeList="form.authNodeList"
        />
      </div>
      <div class="detail-title2">详细信息</div>
      <el-form :model="form" ref="formRef" label-width="150px">
        <el-tabs v-model="activated" class="sticky" tab-position="top" @tab-click="tabClick">
          <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label" :name="item.id" />
        </el-tabs>
        <div class="tabwrap">
          <div class="wrap1" id="base">
            <div class="detail-title3" id="b1ase">基础信息</div>
            <el-row>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">卖家账号：</div>
              <div class="right">{{ form.baseInfo.shopAccount || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="卖家账号" :value="form.baseInfo.shopAccount" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">订单来源：</div>
              <div class="right">{{ form.baseInfo.sourceDesc || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="订单来源" :value="form.baseInfo.sourceDesc" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">订单渠道：</div>
              <div class="right">{{ form.baseInfo.orderSaleTypeDesc || '-' }}</div> -->
                <ItemLabel
                  :fontSize="13"
                  label="订单渠道"
                  :value="form.baseInfo.orderSaleTypeDesc"
                />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">三方系统订单号:</div>
              <div class="right">{{ form.baseInfo.orderCode || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="三方系统订单号" :value="form.baseInfo.orderCode" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">原订单：</div>
              <div class="right">{{ form.baseInfo.pcode || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="原订单" :value="form.baseInfo.pcode" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">创建时间：</div>
              <div class="right">{{ form.baseInfo.createTime || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="创建时间" :value="form.baseInfo.createTime" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">付款时间：</div>
              <div class="right">{{ form.baseInfo.payTime || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="付款时间" :value="form.baseInfo.payTime" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">审核时间：</div>
              <div class="right">{{ form.baseInfo.authTime || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="审核时间" :value="form.baseInfo.authTime" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">是否为COD订单：</div>
              <div class="right">{{ form.baseInfo.cod === 1 ? '是' : '否' }}</div> -->
                <ItemLabel
                  :fontSize="13"
                  label="是否为COD订单"
                  :value="form.baseInfo.cod === 1 ? '是' : '否'"
                />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">发货时间：</div>
              <div class="right">{{ form.baseInfo.sendTime || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="发货时间" :value="form.baseInfo.sendTime" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">预计到货：</div>
              <div class="right">{{ form.baseInfo.expectedArrivalTime || '-' }}</div> -->
                <ItemLabel
                  :fontSize="13"
                  label="预计到货"
                  :value="form.baseInfo.expectedArrivalTime"
                />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">交货方式：</div>
              <div class="right">{{ form.baseInfo.deliverTypeDesc || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="交货方式" :value="form.baseInfo.deliverTypeDesc" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">期望发货：</div>
              <div class="right">{{ form.baseInfo.platformExpectedSendTime || '-' }}</div> -->
                <ItemLabel
                  :fontSize="13"
                  label="期望发货"
                  :value="form.baseInfo.platformExpectedSendTime"
                />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">平台送达：</div>
              <div class="right">
                {{ form.baseInfo.operationExpectedArrivalTime || '暂无' }} -
                {{ form.baseInfo.operationExpectedArrivalTimeEnd || '暂无' }}
              </div> -->
                <ItemLabel
                  :fontSize="13"
                  label="平台送达"
                  :value="
                    form.baseInfo.operationExpectedArrivalTime
                      ? `${form.baseInfo.operationExpectedArrivalTime} -
                ${form.baseInfo.operationExpectedArrivalTimeEnd}`
                      : '-'
                  "
                />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">签收时间：</div>
              <div class="right">{{ form.baseInfo.signTime || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="签收时间" :value="form.baseInfo.signTime" />
              </el-col>
            </el-row>
          </div>
          <div class="wrap1" id="reciever">
            <div class="detail-title3">收件人信息</div>
            <el-row>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">客户名称：</div>
              <div class="right">{{ form.receiveInfo.customerDesc || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="客户名称" :value="form.receiveInfo.customerDesc" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">收件人：</div>
              <div class="right">{{ form.receiveInfo.name || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="收件人" :value="form.receiveInfo.name" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">国家/地区：</div>
              <div class="right">{{ form.receiveInfo.countryDesc || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="国家/地区" :value="form.receiveInfo.countryDesc" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">所在省/州：</div>
              <div class="right">{{ form.receiveInfo.province || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="所在省/州" :value="form.receiveInfo.province" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">所在城市：</div>
              <div class="right">{{ form.receiveInfo.city || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="所在城市" :value="form.receiveInfo.city" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">区/县：</div>
              <div class="right">{{ form.receiveInfo.area || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="区/县" :value="form.receiveInfo.area" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">详细地址1：</div>
              <div class="right">{{ form.receiveInfo.address || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="详细地址1" :value="form.receiveInfo.address" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">详细地址2：</div>
              <div class="right">{{ form.receiveInfo.address2 || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="详细地址2" :value="form.receiveInfo.address2" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">门牌号：</div>
              <div class="right">{{ form.receiveInfo.houseNumber || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="门牌号" :value="form.receiveInfo.houseNumber" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">邮箱：</div>
              <div class="right">{{ form.baseInfo.deliverTypeDesc || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="邮箱" :value="form.receiveInfo.email" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">电话：</div>
              <div class="right">{{ form.receiveInfo.phone || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="电话" :value="form.receiveInfo.phone" />
              </el-col>
              <el-col :span="6" class="flexbox">
                <!-- <div class="left">邮编：</div>
              <div class="right">{{ form.receiveInfo.zipcode || '-' }}</div> -->
                <ItemLabel :fontSize="13" label="邮编" :value="form.receiveInfo.zipcode" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="flexbox">
                <ItemLabel
                  :fontSize="13"
                  label="部门"
                  :value="form.receiveInfo.organizationDeptName"
                />
              </el-col>
            </el-row>
          </div>
          <div class="wrap1 nobd" id="product" ref="productWrapperRef">
            <div :class="isSticky ? 'detail-title3 product-sticky' : 'detail-title3'">
              <div class="text">产品信息</div>
              <div class="action" @click="handleCustomCol">
                <i class="iconfont icon-zidingyilieheziduan"></i>
                <span class="info custom-col2">自定义列</span>
              </div>
            </div>
            <div :class="isSticky ? 'tablewrap tablewrap-sticky' : 'tablewrap'">
              <el-table
                :class="isSticky ? 'product-table-header-sticky' : 'product-table-header-normal'"
                :data="form.itemInfoList"
                class="pdtable"
                class-name="vtop"
                size="small"
                :border="true"
                row-class-name="rowcell"
                header-cell-class-name="hdcell"
              >
                <el-table-column label="序号" fixed>
                  <template #default="{ $index }">{{ $index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="productName" fixed min-width="269" label="产品名称">
                  <template #default="{ row }">
                    <div class="product-item">
                      <div
                        class="left"
                        v-if="customFieldList[0].showArr?.includes('productImageUrl')"
                      >
                        <img
                          v-if="row?.productImageUrl"
                          class="product-img"
                          :src="row?.productImageUrl"
                          alt=""
                        />
                        <img
                          v-else
                          class="product-img"
                          src="@/assets/images/system/empty.png"
                          alt=""
                        />
                        <!-- {{ row }} -->
                        <img
                          v-if="row?.isOutStock"
                          class="outStock"
                          :src="getImg('outStock')"
                          alt=""
                        />
                      </div>
                      <div class="product-title">
                        <OverflowTooltip :content="row?.productName" :line="2" :font-size="12" />
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="skuCode"
                  min-width="137"
                  label="产品SKU"
                  v-if="customFieldList[0].showArr?.includes('skuCode')"
                />
                <el-table-column
                  prop="suggestPrice"
                  min-width="88"
                  label="建议售价"
                  v-if="customFieldList[0].showArr?.includes('suggestPrice')"
                />
                <el-table-column
                  prop="postalPrice"
                  min-width="88"
                  label="报价"
                  v-if="customFieldList[0].showArr?.includes('postalPrice')"
                />
                <el-table-column
                  prop="price"
                  min-width="200"
                  label="销售单价"
                  v-if="customFieldList[0].showArr?.includes('price')"
                >
                  <template #default="{ row }">
                    <span>{{ `含税${row.taxPrice}/不含税${row.price}` }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="taxRateDesc"
                  min-width="94"
                  label="税率"
                  v-if="customFieldList[0].showArr?.includes('taxRateDesc')"
                />
                <el-table-column
                  prop="priceTaxAmount"
                  min-width="94"
                  label="税额"
                  v-if="customFieldList[0].showArr?.includes('priceTaxAmount')"
                />

                <el-table-column
                  prop="commission"
                  min-width="94"
                  label="佣金"
                  v-if="customFieldList[0].showArr?.includes('priceTaxAmount')"
                />
                <el-table-column
                  prop="deliveryDesc"
                  width="94"
                  label="发货方式"
                  v-if="customFieldList[0].showArr?.includes('deliveryDesc')"
                />
                <el-table-column
                  prop="warehouseDesc"
                  width="180"
                  label="发货仓库"
                  v-if="customFieldList[0].showArr?.includes('warehouseDesc')"
                />
                <!-- width="130" 供应链SKU -->
                <el-table-column
                  prop="supplySku"
                  width="140"
                  label="供应链SKU"
                  v-if="customFieldList[0].showArr?.includes('supplySku')"
                />
                <!-- <el-table-column prop="num??" label="库存??" width="62" /> -->
                <!-- <el-table-column prop="taxPrice" min-width="150" label="销售单价（含税）" /> -->
                <el-table-column
                  prop="num"
                  label="数量(件)"
                  width="76"
                  v-if="customFieldList[0].showArr?.includes('num')"
                />
                <!-- <el-table-column label="单位">
                <template #default="{ row }">
                  <span>{{ row?.unitDesc || '件' }}</span>
                </template>
              </el-table-column> -->
                <el-table-column
                  prop="spName"
                  min-width="180"
                  label="物流承运商"
                  v-if="customFieldList[0].showArr?.includes('spName')"
                />
                <el-table-column
                  prop="shippingDesc"
                  min-width="180"
                  label="物流渠道"
                  v-if="customFieldList[0].showArr?.includes('shippingDesc')"
                >
                  <template #default="{ row }">
                    <div>{{ row?.shippingDesc }}</div>
                    <div class="text-warning fontcolor d-flex flex-align">
                      <i class="iconfont icon-shijian"></i>
                      预估时效：{{ row?.timeliness }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="upcCode"
                  label="UPC码"
                  width="115"
                  v-if="customFieldList[0].showArr?.includes('upcCode')"
                />
                <el-table-column
                  prop="eanCode"
                  label="EAN码"
                  width="115"
                  v-if="customFieldList[0].showArr?.includes('eanCode')"
                />
              </el-table>
            </div>
          </div>
          <div class="wrap1 nobd" id="originProduct">
            <div class="detail-title3">
              <div class="text">原平台产品信息</div>
            </div>
            <div class="tablewrap">
              <el-table
                :data="form?.platformItemInfoList"
                class="pdtable"
                class-name="vtop"
                size="small"
                :border="true"
                row-class-name="rowcell"
                header-cell-class-name="hdcell"
              >
                <el-table-column prop="upcCode" label="upc" />
                <el-table-column prop="msku" label="平台MSKU" />
                <el-table-column prop="num" label="数量" />
                <el-table-column prop="unit" label="单位" />
                <el-table-column prop="purchasePrice" label="采购单价" />
              </el-table>
            </div>
          </div>
          <div class="wrap1" id="deliver">
            <div class="detail-title3">物流信息</div>
            <el-row>
              <el-col :span="12" class="flexbox">
                <div class="left">发货仓库：</div>
                <div class="right">{{ form.baseInfo?.warehouseDesc || '-' }}</div>
              </el-col>
              <el-col :span="12" class="flexbox">
                <div class="left">物流承运商：</div>
                <div class="right">{{ form.baseInfo?.spName || '-' }}</div>
              </el-col>
              <el-col :span="12" class="flexbox">
                <div class="left">物流渠道：</div>
                <div class="right">{{ form.baseInfo?.shippingDesc || '-' }}</div>
                <!-- shippingDesc -->
              </el-col>
              <!-- </el-row>
            <el-row> -->
              <el-col :span="12" class="flexbox">
                <div class="left">跟踪号：</div>
                <div class="right">{{ form.baseInfo.trackOrderCode || '-' }}</div>
              </el-col>
              <el-col :span="12" class="flexbox">
                <div class="left">唛头：</div>
                <div class="right">{{ form.baseInfo.shippingMark || '-' }}</div>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="6" class="flexbox">
              <div class="left">三方订单号：</div>
              <div class="right">{{ form.baseInfo.orderCode || '-' }}</div>
            </el-col> -->
              <el-col :span="12" class="flexbox">
                <div class="left">销售出库单号：</div>
                <div class="right">{{ form.baseInfo.warehouseDeliveryCode || '-' }}</div>
              </el-col>
              <el-col :span="12" class="flexbox">
                <ItemLabel
                  :fontSize="13"
                  label="客户快递付款账号"
                  :value="form.baseInfo.expressDeliveryPaymentAccount"
                />
              </el-col>
              <el-col :span="12" class="flexbox">
                <ItemLabel :fontSize="13" label="付款方式" :value="form.baseInfo.paymentMethod" />
              </el-col>
            </el-row>
          </div>
          <div class="wrap1" id="caculate">
            <div class="detail-title3">结算信息</div>
            <el-row>
              <el-col :span="6" class="flexbox">
                <div class="left">收款条件：</div>
                <div class="right">{{ form.paymentTermsInfo?.paymentTermsDesc || '-' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">结算方式：</div>
                <div class="right">{{ form.paymentTermsInfo?.settlementMethodDesc || '-' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">结算周期：</div>
                <div class="right">{{ form.paymentTermsInfo?.settlementPeriod || '-' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">签约主体：</div>
                <div class="right">{{ form.paymentTermsInfo?.contractSubject || '-' }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="wrap1" id="money">
            <div class="detail-title3">金额信息</div>
            <el-row>
              <el-col :span="6" class="flexbox">
                <div class="left">货币类型：</div>
                <div class="right">{{ form.baseInfo.currencyDesc || '-' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">总金额：</div>
                <div class="right">
                  {{
                    `含税${form.baseInfo.taxAmount || '0'} / 不含税${form.baseInfo.amount || '0'}`
                  }}
                </div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">总税额：</div>
                <div class="right">{{ form.baseInfo.productTaxAmount || '0' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">运费：</div>
                <div class="right">{{ form.baseInfo.freightAmount || '0' }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="flexbox">
                <div class="left">销售运费：</div>
                <div class="right">{{ form.baseInfo.salesFreightAmount || '0' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">折扣金额：</div>
                <div class="right">{{ form.baseInfo.discountAmount || '0' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">总佣金：</div>
                <div class="right">{{ form.baseInfo.commission || '0' }}</div>
              </el-col>
              <el-col :span="6" class="flexbox">
                <div class="left">交易额：</div>
                <div class="right">
                  {{
                    `含税${form.baseInfo.taxTransactionAmount || '0'} / 不含税${
                      form.baseInfo.transactionAmount || '0'
                    }`
                  }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="flexbox">
                <div class="left">实际交易额：</div>
                <div class="right">
                  {{
                    `含税${form.baseInfo.taxRealTransactionAmount || '0'} / 不含税${
                      form.baseInfo.realTransactionAmount || '0'
                    }`
                  }}
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="wrap1" id="log">
            <div class="detail-title3">
              <div class="text">操作日志</div>
              <div class="d-flex operate">
                <el-select
                  v-model="searchType"
                  style="width: 110px; margin-right: 10px"
                  placeholder="选择类型"
                  @change="handleSelectLogChange"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="item in searchTypeMap"
                    :value="item.key"
                    :label="item.label"
                    :key="item.key"
                  />
                </el-select>
                <el-date-picker
                  size="small"
                  v-model="time"
                  type="daterange"
                  style="width: 238px"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  @change="handleTimeChange"
                  :shortcuts="shortcuts"
                  clearable
                  :popper-options="{
                    modifiers: [
                      {
                        name: 'flip',
                        options: {
                          fallbackPlacements: ['top', 'bottom'],
                          allowedAutoPlacements: ['top', 'bottom'],
                        },
                      },
                    ],
                  }"
                />
              </div>
            </div>
            <LogItem
              :log-type-arr="logTypeArr"
              @download-file="handleDownload"
              @handle-delete="handleDelete"
              :fileProgress="fileProgress"
            />
            <SelectProperty
              ref="propertyRef"
              :width="480"
              title="自定义列"
              :propertyListProp="customFieldList"
              bindClass="custom-col2"
              @success="handleSaveCustomFields"
              moduleType="detail"
              :conditionCode="conditionCode"
            />
          </div>
        </div>
        <!-- </div> -->
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts" name="B2BOrderNewDetail">
  import { ElMessage, FormInstance, ElLoading } from 'element-plus';
  import { erpApi, platformApi, omsApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import * as swal from '@/utils/swal';
  import axios from 'axios';
  import customDetailFields from '@/views/supplyChainManage/B2BOrder/orderManageNew/customDetailFields';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import dayjs from 'dayjs';
  import LogItem from './components/LogItem.vue';
  import SelectProperty from './components/SelectProperty2.vue';
  import { useTableHeaderSticky } from './useOffsetWatcher';

  const propertyRef = ref(null);
  const detailLoading = ref();
  const route = useRoute();
  const productWrapperRef = ref<HTMLElement | null>(null);
  const scrollContainerRef = ref<HTMLElement | null>(null);
  const { isSticky, init } = useTableHeaderSticky({
    scrollContainer: scrollContainerRef,
    tableWrapper: productWrapperRef,
    stickyTop: 0,
    offset: 0,
    fixedHeaderHeight: 40,
  });
  // 获取自定义字段
  const conditionCode = ref<any>(null);
  const customFieldList = ref<any>(customDetailFields);
  const queryCustomFieldList = async () => {
    const res = await platformApi.platformSearchQueryConditionList({
      platform: 'lute_erp',
      moduleType: 'detail',
      itemType: route?.name as any,
      pageSize: 1,
      pageNum: 1,
    });
    // console.log('获取自定义字段 ', res);
    // if (res?.recordList?.length) {
    //   const cond: any = res?.recordList[0]?.searchCondition;
    //   customFieldList.value = JSON.parse(cond);
    //   conditionCode.value = res?.recordList[0]?.conditionCode;
    // } else {
    //   customFieldList.value = customDetailFields;
    // }
    // if (customFieldList.value[0].checkedArr) {
    //   customFieldList.value[0].showArr = JSON.parse(
    //     JSON.stringify(customFieldList.value[0]?.checkedArr)
    //   );
    // } else {
    //   const pArr = customFieldList.value[0]?.propertyArr
    //     .filter((pitem) => pitem.checked)
    //     .map((citem) => citem.key);
    //   customFieldList.value[0].showArr = pArr;
    // }

    if (res?.recordList?.length) {
      const hideList = JSON.parse(res?.recordList[0]?.searchCondition);
      customFieldList.value = customFieldList.value?.map((item) => {
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
      customFieldList.value = customFieldList.value?.map((item) => {
        return {
          ...item,
          checkedArr: item.propertyArr?.filter((item) => item.checked)?.map((k) => k.key),
        };
      });
    }
    if (customFieldList.value[0].checkedArr) {
      customFieldList.value[0].showArr = JSON.parse(
        JSON.stringify(customFieldList.value[0]?.checkedArr)
      );
    } else {
      const pArr = customFieldList.value[0]?.propertyArr
        .filter((pitem) => pitem.checked)
        .map((citem) => citem.key);
      customFieldList.value[0].showArr = pArr;
    }
  };
  // 保存自定义字段
  const handleSaveCustomFields = async (fields: any[]) => {
    // await platformApi.platformSearchSaveCondition({
    //   platform: 'lute_erp',
    //   moduleType: 'detail',
    //   itemType: 'B2BOrderDetail',
    //   conditionCode: conditionCode.value || undefined,
    //   searchCondition: JSON.stringify(fields),
    // });
    // ElMessage.success('保存成功');
    // emits('refreshCustomFields');
    // 重新查询
    queryCustomFieldList();
  };

  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };
  // 获取缺货状态
  const getStockStatus = async (orderList) => {
    if (!orderList?.length) return;
    const orderCodes = orderList.map((item) => item.erpCode);
    try {
      const res = await omsApi.omsOrderQueryStockList(orderCodes);
      // console.log('getStockStatus', res);
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
        // console.log('stockMap', stockMap);
        const skulistData = form.value.itemInfoList;
        const updatedList = skulistData.map((item: any) => {
          const stockInfo = stockMap.get(erpCode.value);
          // console.log('stockInfo', stockInfo);
          // 拿到该订单对应的 sku 库存数据
          const skuStockMap = new Map(
            (stockInfo?.skuStockInfoList || []).map((sku) => [sku.productSku, sku])
          );
          // console.log(skuStockMap, 'skuStockMap');
          // console.log('item', item);
          // 更新 itemBeanList 中每个 SKU 的缺货状态
          const skuStockInfo = skuStockMap?.get(item.supplySku);
          return {
            ...item,
            isOutStock: skuStockInfo ? skuStockInfo.inventory < skuStockInfo.qty : false, // 根据库存和数量判断是否缺货
          };
        });
        // console.log('updatedList', updatedList);
        if (updatedList) {
          form.value.itemInfoList = updatedList;
        }
      }
    } catch (error) {
      console.error('获取缺货状态失败:', error);
    }
  };

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

  const activated = ref('base');
  const showDetail = ref(false);
  const isFull = ref(false);
  const drawerWid: any = ref(1200);
  const erpCode = ref('');

  const searchType = ref();
  // 1:客服备注 ,2:上传附件,3:订单备注
  const searchTypeMap = [
    {
      key: 2,
      label: '上传附件',
    },
    {
      key: 3,
      label: '订单备注',
    },
    {
      key: 1,
      label: '客服备注',
    },
    {
      key: 4,
      label: '操作记录',
    },
  ];
  const shortcuts = [
    {
      text: '今天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: '昨天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        // 设置时间范围
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: '最近7天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      },
    },
    {
      text: '最近30天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
    },
    {
      text: '最近60天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
        return [start, end];
      },
    },
    {
      text: '最近90天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      },
    },
    {
      text: '本月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(1); // 本月第一天
        start.setHours(0, 0, 0, 0);
        end.setMonth(end.getMonth() + 1); // 下个月
        end.setDate(0); // 当月最后一天
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: '上月',
      value: () => {
        return [
          dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
          dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        ];
      },
    },
    {
      text: '最近半年',
      value: () => {
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const start = new Date();
        start.setMonth(start.getMonth() - 6); // 半年前
        start.setHours(0, 0, 0, 0);
        return [start, end];
      },
    },
    {
      text: '今年',
      value: () => {
        const start = new Date(new Date().getFullYear(), 0, 1); // 元旦
        start.setHours(0, 0, 0, 0);
        const end = new Date(new Date().getFullYear(), 11, 31); // 年末
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
  ];

  const logTypeArr = ref<any>([]);
  const tabs = [
    { label: '基础信息', id: 'base' },
    { label: '收件人信息', id: 'reciever' },
    { label: '产品信息', id: 'product' },
    { label: '原平台产品信息', id: 'originProduct' },
    { label: '物流信息', id: 'deliver' },
    { label: '结算信息', id: 'caculate' },
    { label: '金额信息', id: 'money' },
    { label: '操作日志', id: 'log' },
  ];
  const sections = ref<any>([]); // 每个分区 顶部偏移

  const time = ref<any>([]);
  // 查看 附件
  const open = async (code: any, active?: any) => {
    // console.log(code, active);
    showDetail.value = true;
    erpCode.value = code;
    // 测试用--
    // erpCode.value = 'CO250618551903';
    // erpCode.value = 'CO250520460189';
    // erpCode.value = 'CO250429709004';
    // erpCode.value = 'CO250625048329113';
    // erpCode.value = 'CO250624205017';
    nextTick(() => {
      if (active) {
        const section = document.getElementById('log');
        if (section) {
          // 计算Sticky头部高度
          const top = section.offsetTop - headerHeight;
          // console.log('scrollTo', top);
          contentSection?.scrollTo({ top });
        }
        setTimeout(() => {
          activated.value = 'log';
        }, 850);
      }
    });
    queryCustomFieldList();
    await getDetailData();
    if (active) {
      nextTick(() => {
        searchType.value = 2;
        handleSelectLogChange(2);
      });
    }
    initSections();
    if (active) {
      // goAttach.value = true;
      nextTick(() => {
        const section = document.getElementById('log');
        if (section) {
          // 计算Sticky头部高度
          const top = section.offsetTop - headerHeight;
          contentSection?.scrollTo({ top });
        }
        activated.value = 'log';
      });
    }
  };
  const handleDownload = (item?: any) => {
    downloadFile(item.fileUrl, item.fileName, item);
  };
  let contentSection;
  // 初始化获取所有内容区域
  const initSections = () => {
    sections.value = [];
    for (let i = 0; i < tabs.length; i += 1) {
      const section = document.getElementById(tabs[i].id);
      if (section) {
        sections.value.push({
          id: tabs[i].id,
          offsetTop: section.offsetTop,
        });
      }
    }
    // console.log('initSections ', JSON.stringify(sections.value));
  };
  const startLoading = () => {
    const draw: any = document.querySelector('.detail-drawer');
    detailLoading.value = ElLoading.service({ target: draw }); // 全屏加载效果
    setTimeout(() => {
      detailLoading.value?.close();
    }, 10000);
  };
  const handleDrawerOpened = () => {
    contentSection = document.querySelector('.detail-drawer .el-drawer__body');
    scrollContainerRef.value = contentSection;
    if (contentSection) {
      contentSection.addEventListener('scroll', handleScroll);
    }
    init();
    nextTick(() => {
      initSections();
    });
    // setTimeout(() => {
    //   initSections();
    // }, 1500);
    window.addEventListener('resize', initSections);
    // console.log(contentSection);
  };

  const handleDrawerClosed = () => {
    contentSection?.scrollTo({ top: 0 });
    activated.value = 'base';
    if (contentSection) {
      contentSection.removeEventListener('scroll', handleScroll);
    }
    // contentSection.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', initSections);
    detailLoading.value?.close();
  };
  const handleDrawerBeforeClosed = () => {
    contentSection?.scrollTo({ top: 0 });
    activated.value = 'base';
    searchType.value = '';
    time.value = [];
  };
  onMounted(() => {
    // 查询自定义表 字段
    // queryCustomFieldList();
  });
  // onUnmounted(() => {});
  const headerHeight = 98;
  let clickIndex;
  let isClick = false;
  const endScroll = () => {
    // console.log('滚动自然结束', '是否点击 ', isClick, clickIndex);
    if (isClick) {
      isClick = false;
      // activated.value = clickIndex;
      setTimeout(() => {
        activated.value = clickIndex;
      }, 20);
    }
  };
  const tabClick = (tab: any) => {
    // activated.value = tab.paneName;
    clickIndex = tab.paneName;
    isClick = true;
    const section = document.getElementById(tab.paneName);
    if (section) {
      // section.scrollIntoView({ behavior: 'smooth' });
      // 计算Sticky头部高度
      const top = section.offsetTop - headerHeight;
      contentSection?.scrollTo({ top, behavior: 'smooth' });
      // contentSection.removeEventListener('scrollend', endScroll);
      contentSection.addEventListener('scrollend', endScroll);
    }
  };
  let scrollTimeout;
  // 处理滚动事件
  const handleScroll = (event) => {
    if (scrollTimeout) {
      // clearTimeout
      return;
    }
    scrollTimeout = setTimeout(() => {
      //  更新当前活动Tab
      if (sections.value.length > 0) {
        const scrollPosition = event.target.scrollTop + headerHeight;
        // console.log(scrollPosition);
        // 找到当前可见区域
        for (let i = sections.value.length - 1; i >= 0; i -= 1) {
          const section = sections.value[i];
          if (scrollPosition >= section.offsetTop) {
            activated.value = sections.value[i].id;
            break;
          }
        }
      }
      // clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }, 20);
  };

  const handleCustomCol = () => {
    if (propertyRef.value) {
      (propertyRef.value as any).open();
    }
  };
  // 上一条
  const queryPrev = () => {
    // console.log(props.listData);
    const codeArr = props.listData.map((item) => item.erpCode);
    let index = 0;
    // console.log(codeArr);
    for (let i = 0; i < codeArr.length; i += 1) {
      if (erpCode.value === codeArr[i]) {
        index = i;
        break;
      }
    }
    if (index > 0) {
      index -= 1;
      erpCode.value = codeArr[index];
      getDetailData();
    } else {
      ElMessage.warning('已经到第一条了!');
    }
  };
  const queryNext = () => {
    const codeArr = props.listData.map((item) => item.erpCode);
    let index = codeArr.length - 1;
    for (let i = 0; i < codeArr.length; i += 1) {
      if (erpCode.value === codeArr[i]) {
        index = i;
        break;
      }
    }
    if (index < codeArr.length - 1) {
      index += 1;
      erpCode.value = codeArr[index];
      getDetailData();
    } else {
      ElMessage.warning('已经到最后一条了!');
    }
  };
  // 全屏操作
  const fullScreen = () => {
    if (isFull.value) {
      drawerWid.value = 1200;
    } else {
      drawerWid.value = '100%';
    }
    isFull.value = !isFull.value;
  };
  const refresh = () => {
    getDetailData();
  };
  const quit = () => {
    showDetail.value = false;
  };

  const props = defineProps<{
    listData: any;
  }>();
  defineExpose({
    open,
  });

  // const route = useRoute();
  // if (route.query.activated) {
  //   activated.value = Number(route.query?.activated);
  // }

  const formRef = ref<FormInstance>();
  const form = ref({
    baseInfo: {
      cod: 0,
      currencyCode: 'USD',
      currencyDesc: '',
      customRemark: '',
      remark: '',
      freightAmount: 0,
      erpCode: '',
      shopAccount: '',
      transactionAmount: 0,
      dingRemark: '',
      type: 1,
      autoSubOrder: 1,
      refNo: '',
      operationExpectedArrivalTime: '',
      operationExpectedArrivalTimeEnd: '',
      platformExpectedSendTime: '',
      orderStatus: 0,
      flowName: '',
      orderSaleType: '',
      deliverType: '',
      sourceDesc: '',
      orderSaleTypeDesc: '',
      orderCode: '',
      pcode: '',
      createTime: '',
      payTime: '',
      authTime: '',
      sendTime: '',

      expectedArrivalTime: '',
      deliverTypeDesc: '',
      signTime: '',
    },
    authNodeList: [],
    itemInfoList: [
      // {
      //   deliveryCode: '',
      //   num: 0,
      //   shippingCode: '',
      //   skuCode: '',
      //   supplySku: '',
      //   warehouseCode: '',
      // },
    ],
    platformItemInfoList: [],
    receiveInfo: {
      address: '',
      address2: '',
      area: '',
      city: '',
      countryCode: '',
      email: '',
      houseNumber: '',
      name: '',
      phone: '',
      province: '',
      customerCode: '',
      zipcode: '',
      customerDesc: '',
      countryDesc: '',
      organizationDeptName: '',
    },
    paymentTermsInfo: {
      contractSubject: '', // 合同签约主体
      paymentTermsCode: '', // 付款条件编码
      paymentTermsDesc: '', // 付款条件描述
      settlementMethod: '', // 结算方式
      settlementMethodDesc: '', // 结算方式描述
      settlementPeriod: '', // 结算周期
    },
    pass: undefined,
    remark: undefined,
  });

  let threeArr: any[];
  // 1:客服备注 ,2:上传附件,3:订单备注 4:操作记录
  const handleSelectLogChange = (val) => {
    // console.log('handleSelectLogChange todo~~', val, typeof val);
    // threeArr.sort((a, b) => b.updateTime - a.updateTime);
    let tmp;
    if (val) {
      tmp = threeArr.filter((item) => item.type === val);
      if (time.value && time.value.length > 0) {
        tmp = tmp.filter(
          (item) =>
            new Date(item.updateTime).getTime() >= new Date(time.value[0]).getTime() &&
            new Date(item.updateTime).getTime() <= new Date(time.value[1]).getTime()
        );
      }
      logTypeArr.value = tmp;
    } else {
      tmp = threeArr;
      if (time.value && time.value.length > 0) {
        tmp = tmp.filter(
          (item) =>
            new Date(item.updateTime).getTime() >= new Date(time.value[0]).getTime() &&
            new Date(item.updateTime).getTime() <= new Date(time.value[1]).getTime()
        );
      }
      logTypeArr.value = tmp;
    }
  };
  const handleTimeChange = (val) => {
    if (time.value?.length === 2) {
      const end = new Date(time.value[1]);
      end.setHours(23, 59, 59); // 设置结束时间为当天的23:59:59
      time.value[1] = dayjs(end).format('YYYY-MM-DD HH:mm:ss');
    }
    // console.log('TimeChange ~~', time.value);
    let tmp;
    if (val) {
      tmp = threeArr.filter(
        (item) =>
          new Date(item.updateTime).getTime() >= new Date(time.value[0]).getTime() &&
          new Date(item.updateTime).getTime() <= new Date(time.value[1]).getTime()
      );
      if (searchType.value) {
        tmp = tmp.filter((item) => item.type === searchType.value);
      }
      logTypeArr.value = tmp;
    } else {
      tmp = threeArr;
      if (searchType.value) {
        tmp = threeArr.filter((item) => item.type === searchType.value);
      }
      logTypeArr.value = tmp;
    }
  };
  const getDetailData = async () => {
    // console.log('getDetailData=============', erpCode.value);
    if (erpCode.value) {
      startLoading();
      const res: any = await omsApi.omsOrderQueryDetail({
        erpCode: erpCode.value as string,
        searchEdit: false,
      });
      if (!res.orderCustomsRemarkList) {
        res.orderCustomsRemarkList = [];
      }
      if (!res.receiveInfo.organizationDeptName) {
        res.receiveInfo.organizationDeptName = '';
      }
      form.value = res;
      // console.log('详情信息 ', res);
      // 1:客服备注 ,2:上传附件,3:订单备注 4:操作记录
      // console.log('客服备注 ', res.orderCustomsRemarkList);
      // console.log('上传附件 ', res.orderAttachmentList);
      // console.log('订单备注 ', res.orderRemarkList);
      // console.log('操作信息 过滤前', res.authLogList);
      // 操作日志大类 分类   1:客服备注,2:附件,3:订单备注 4:操作记录
      res.orderCustomsRemarkList.forEach((item) => {
        item.type = 1;
      });
      res.orderAttachmentList.forEach((item) => {
        item.type = 2;
        // 获取最后的 . 文件后缀
        const tmp = item.fileName.split('.');
        if (tmp.length >= 2) {
          item.suffix = tmp[tmp.length - 1];
        } else {
          item.suffix = 'unknown';
        }
      });
      res.orderRemarkList.forEach((item) => {
        item.type = 3;
      });
      // const filterArr = res.authLogList;
      const filterArr = res.authLogList.filter((item) => {
        // 先过滤审核节点 todo
        return (
          item.operationType !== null &&
          item.operationType !== 'auth' &&
          item.operationType !== 'to_auth'
        );
      });
      filterArr.forEach((item) => {
        item.type = 4;
      });
      // console.log('操作信息 过滤后', filterArr);
      // const twoArr = res.authLogList.concat(res.orderCustomsRemarkList, res.orderAttachmentList,res.orderRemarkList);
      threeArr = [];
      // todo 合并 客服备注列表
      threeArr = filterArr.concat(
        res.orderCustomsRemarkList,
        res.orderAttachmentList,
        res.orderRemarkList
      );
      threeArr.forEach((item, index) => {
        item.index = index;
      });
      // console.log(JSON.parse(JSON.stringify(threeArr)));
      threeArr.sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime());
      // console.log(threeArr);
      logTypeArr.value = threeArr;

      // erp_order_customs_remark 客服备注 => type:1
      // erp_order_attch          订单附件 => type:2
      // erp_order_remark         订单备注 => type:3
      // console.log('日志信息 ', res.uiLogList);
      // for (let i = 0; i < res.uiLogList.length; i += 1) {
      //   const logItem = res.uiLogList[i];
      //   logItem.index = logItem.id ?? i;
      //   if (logItem.logType === 'erp_order_customs_remark') {
      //     logItem.type = 1;
      //   } else if (logItem.logType === 'erp_order_attch') {
      //     logItem.type = 2;
      //     logItem.attachmentList.forEach((item) => {
      //       const tmp = item.fileName.split('.');
      //       if (tmp.length >= 2) {
      //         item.suffix = tmp[tmp.length - 1];
      //       } else {
      //         item.suffix = 'unknown';
      //       }
      //     });
      //   } else if (logItem.logType === 'erp_order_remark') {
      //     logItem.type = 3;
      //   }
      // }
      // threeArr = res.uiLogList;
      // logTypeArr.value = res.uiLogList;
      detailLoading.value?.close();
      getStockStatus([{ erpCode: erpCode.value }]);
    }
  };

  // getDetailData();

  const handleDelete = async (row) => {
    // todo 删除附件
    const isConfirm = await swal.confirm('确定删除该附件？');
    if (isConfirm) {
      await omsApi.omsOrderDeleteAtt({
        // id: row.attachId,
        id: row.id,
      });
      ElMessage.success('删除成功');
      getDetailData();
    }
  };

  // const progressMap: any = ref({});
  const fileProgress: any = ref({});
  // 下载附件
  const downloadFile = async (fileUrl, fileName, file?: any) => {
    const res = await axios.get(fileUrl, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent: any) => {
        if (progressEvent.total) {
          fileProgress.value = Object.assign(fileProgress.value, {
            [file.ossKey]: Math.round((progressEvent.loaded * 100) / progressEvent.total),
          });
          // console.log(fileProgress.value);
        }
      },
    });
    const blob = new Blob([res.data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    fileProgress.value = Object.assign(fileProgress.value, {
      [file.ossKey]: 100,
    });
    // console.log(fileProgress.value);
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  };
</script>

<style scoped lang="scss">
  icon-Root,
  .Root-tyicon {
    cursor: pointer;
  }

  .product-item {
    display: flex;
    // align-items: center;
    gap: 11px;

    .left {
      position: relative;
      .product-img {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        margin-top: 2px;
      }
      .outStock {
        width: 16px;
        position: absolute;
        top: -2px;
        right: -2px;
      }
    }
    .product-title {
      flex: 1 0;
      min-width: 200px;
      // margin-bottom: 2px;
    }
  }
  .tablewrap {
    border-radius: 10px 10px 0px 0px !important;
    overflow: hidden;
  }
  :deep(.el-select) {
    height: 26px !important;
    .el-select__wrapper {
      min-height: 24px !important;
    }
  }
  :deep(.el-date-editor) {
    height: 26px !important;
  }
  :deep(.pdtable.el-table) {
    // border-bottom: solid 1px #f5f5f5;
    .vtop {
      vertical-align: top;
    }
    .el-table__cell > .cell {
      line-height: 20px !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
      padding-top: 12px !important;
      padding: 12px 12px 12px 12px !important;
      min-height: 62px;
    }

    .el-table__cell.hdcell > .cell {
      padding: 0 12px !important;
      // padding-top:10 0 !important;
      color: #1f1f1f;
      // font-size: 13px;
      line-height: 40px !important;
      min-height: 40px !important;
      height: 40px !important;
      background-color: #f5f5f5 !important;
      vertical-align: middle;
    }
    .el-table--border::after,
    .el-table--border::before,
    .el-table--border .el-table__inner-wrapper::after,
    .el-table__inner-wrapper::before {
      background-color: #f5f5f5;
    }
    .rowcell {
      height: 50px;
      // &.hover-row > td.el-table__cell {
      //   background-color: transparent !important;
      // }
    }
    th {
      padding: 0 !important;
      // text-indent: 12px;
      // padding-right: 4px !important;
      font-family: 'PingFang SC Medium';
      font-weight: normal !important;
      font-size: 13px !important;
    }
    td {
      padding: 0 !important;
      // margin-left: 12px !important;
      vertical-align: top !important;
    }
  }

  .detail-drawer {
    :global(.el-picker-panel.el-date-range-picker.has-sidebar) {
      color: #1f1f1f;
      font-size: 13px;
      width: 639px !important;
    }
    :global(.el-picker-panel__shortcut) {
      text-align: center !important;
      padding: 0;
      color: #1f1f1f;
      font-size: 13px;
      line-height: 32px;
    }
    :global(.el-picker-panel__sidebar) {
      width: 87px !important;
    }
    :global(.el-picker-panel__shortcut:hover) {
      background-color: #e8fff1;
    }
    :global(.el-picker-panel__sidebar + .el-picker-panel__body) {
      margin-left: 87px !important;
    }
    :global(.el-date-table-cell__text) {
      font-size: 13px;
    }
  }

  .pl16 {
    padding-left: 16px;
  }
  .pl20 {
    padding-left: 20px;
  }
  .ml16 {
    margin-left: 16px;
  }
  .audit-wrap {
    padding-bottom: 10px;
    height: 210px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .detail-title {
    height: 56px;
    background-color: #fff;
    line-height: 56px;
    padding: 0 20px;
    display: flex;
    color: #1f1f1f;
    .t1 {
      color: #1f1f1f;
      font-size: 16px;
      font-family: 'PingFang SC Medium';
    }
    .table-item-header {
      flex: 1;
      display: flex;
      align-items: center;
      // line-height: 20px;
      font-size: 12px;
      .header-label {
        color: #999999;
      }
      .item {
        display: flex;
        align-items: center;

        .el-tag {
          margin-left: 11px;
        }
      }
    }
    .tool {
      line-height: 54px;
      color: #999999;
      .nouse {
        cursor: not-allowed;
      }
      i {
        font-size: 16px;
        &:hover {
          color: #02b96b !important;
        }
      }
      .linebd {
        display: inline-block;
        width: 1px;
        height: 10px;
        background: #dedede;
        margin: 0 10px;
      }
    }
  }
  .detail-title2 {
    color: #1f1f1f;
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    line-height: 24px;
    padding: 26px 20px 7px;
    background-color: white;
  }
  .wrap1 {
    padding-bottom: 14px;
    border-bottom: solid 1px #f5f5f5;
  }
  .nobd {
    border: none;
  }
  .container {
    height: 600px;
    overflow: auto;
  }
  .tabwrap {
    padding: 0 20px;
    // overflow: auto;
  }
  :deep(.el-tabs) {
    padding: 0 20px !important;
    .el-tabs__active-bar {
      color: #02b96b;
      height: 2px;
    }
    .el-tabs__header {
      background-color: white;
      padding-left: 0 !important;
    }
    .el-tabs__item {
      padding: 9px 15px;
      line-height: 40px;
      height: 42px;
      font-size: 13px;
      color: #666666;
      &:hover {
        color: #02b96b;
      }
      &.is-active {
        font-family: 'PingFang SC Medium';
        color: #02b96b;
      }
    }
    .el-tabs__nav-wrap {
      &::after {
        background-color: #f5f5f5 !important;
        height: 1px !important;
      }
    }
  }
  .detail-title3 {
    color: #1f1f1f;
    font-size: 14px;
    font-family: 'PingFang SC Medium';
    line-height: 22px;
    padding: 20px 0 12px;
    display: flex;
    .text {
      flex: 1;
    }
    .operate {
      height: 24px;
      position: relative;
      top: -1px;
    }
    .action {
      font-weight: normal;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      vertical-align: top;
      overflow: hidden;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #666666 !important;
      .info {
        margin-left: 6px;
        font-size: 12px;
        color: #666666 !important;
      }
    }
  }
  .fontcolor {
    font-size: 12px;
    color: #ff9f22 !important;
    .icon-shijian {
      margin-right: 4px;
      font-size: 12px !important;
    }
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
  .flexbox {
    display: flex;
    font-size: 13px;
    line-height: 22px;
    padding-bottom: 6px;
    color: #1f1f1f;
    .left {
      flex-shrink: 0;
      color: #999999;
    }
    .right {
      flex: 1;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1f1f1f;
    }
  }
  .sticky {
    position: sticky;
    top: 0px;
    z-index: 1000;
    padding-left: 5px;
  }
  .product-sticky {
    position: sticky !important;
    top: 40px !important;
    background: white;
    line-height: 22px;
    z-index: 999;
  }
  .tablewrap-sticky {
    padding-top: 28px;
  }
  :deep(.product-table-header-sticky) {
    .el-table__header-wrapper {
      position: fixed !important;
      top: var(--table-header-top, 141px) !important;
      width: var(--table-header-width, 60%) !important;
      z-index: 999;
      background: white;
      height: 40px !important;
    }
    .el-table__body-wrapper {
      margin-top: 20px !important;
    }
  }
</style>

<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      padding: 0 !important;
      margin: 0 !important;
    }
    .el-drawer__body {
      padding: 0 !important;
      // margin: 0 !important;
    }
    :global(.el-picker-panel) {
      color: #1f1f1f;
      font-size: 13px;
    }
    :global(.el-picker-panel__shortcut) {
      text-align: center !important;
      padding: 0;
      color: #1f1f1f;
      font-size: 13px;
      line-height: 32px;
    }
    :global(.el-picker-panel__sidebar) {
      width: 87px !important;
    }
    :global(.el-picker-panel__shortcut:hover) {
      background-color: #e8fff1;
    }
    .el-picker-panel__sidebar + .el-picker-panel__body {
      margin-left: 87px;
    }
  }
</style>
