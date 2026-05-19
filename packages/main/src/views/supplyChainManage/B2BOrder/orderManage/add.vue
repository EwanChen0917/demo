<template>
  <div class="bg-wrap">
    <!-- <div class="bdr"> -->
    <div class="aewrap" ref="aewrapRef">
      <div
        class="header-wrap"
        v-show="form.baseInfo.orderStatus"
        v-if="form.baseInfo.orderStatus !== 101 && !isAdd"
      >
        <AuditHeader
          :flowName="form?.baseInfo?.flowName"
          :authNodeList="form?.authNodeList"
          :baseInfo="form.baseInfo"
        />
      </div>
      <div class="add-title1 sticky">
        <div class="inner-white">{{ pageTitle }}</div>
      </div>
      <el-form :model="form" ref="formRef" :rules="rules" label-width="140px" label-position="top">
        <el-tabs v-model="activated" class="sticky2" tab-position="top" @tab-click="tabClick">
          <el-tab-pane
            v-for="item in tabs?.filter((tab) => (isAdd ? tab.id !== 'originProduct' : true))"
            :key="item.id"
            :label="item.label"
            :name="item.id"
          />
        </el-tabs>
        <div class="tabwrap">
          <div class="wrap1 pb6" id="reciever">
            <div class="add-title2">收件人信息</div>
            <el-form
              label-position="top"
              label-width="140px"
              :disabled="isAudit"
              ref="receiveFormRef"
              :model="form"
              :rules="rules"
              v-loading="loading"
            >
              <el-row :gutter="20">
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="客户名称" prop="receiveInfo.customerCode">
                    <el-select
                      style="width: 100%"
                      v-model="form.receiveInfo.customerCode"
                      filterable
                      :disabled="isEdit"
                      @change="handleChange"
                      clearable
                    >
                      <el-option
                        v-for="item in customerList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="收件人" prop="receiveInfo.name">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.name"
                      :maxlength="128"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="国家/地区" prop="receiveInfo.countryCode">
                    <CountrySelect
                      placeholder="请选择"
                      v-model="form.receiveInfo.countryCode"
                      style="width: 100%"
                      @change="handleCountryChange"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="省/州" prop="receiveInfo.province">
                    <el-input
                      v-model="form.receiveInfo.province"
                      :maxlength="200"
                      @change="queryTaxRate"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="城市" prop="receiveInfo.city">
                    <el-input
                      v-model="form.receiveInfo.city"
                      :maxlength="200"
                      @change="queryTaxRate"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="区/县" prop="receiveInfo.area">
                    <el-input
                      v-model="form.receiveInfo.area"
                      :maxlength="200"
                      @change="queryTaxRate"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="详细地址1" prop="receiveInfo.address">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.address"
                      :maxlength="300"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="详细地址2" prop="receiveInfo.address2">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.address2"
                      :maxlength="300"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="门牌号" prop="receiveInfo.houseNumber">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.houseNumber"
                      :maxlength="50"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="邮编" prop="receiveInfo.zipcode">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.zipcode"
                      :maxlength="32"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="电话" prop="receiveInfo.phone">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.phone"
                      :maxlength="64"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="邮箱" prop="receiveInfo.email">
                    <el-input
                      placeholder="请输入"
                      v-model="form.receiveInfo.email"
                      :maxlength="60"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="linebg"></div>
          <div class="wrap1" id="product">
            <div class="add-title3">
              <div class="text">产品信息</div>
              <div class="action flex-center">
                <el-button
                  :disabled="!form.receiveInfo.customerCode || !form.receiveInfo.countryCode"
                  type="primary"
                  @click="productDialogVisible = true"
                  size="small"
                >
                  {{
                    !form?.receiveInfo.customerCode
                      ? '请先选择客户'
                      : !form?.receiveInfo.countryCode
                      ? '请先选择国家或地区'
                      : '添加产品'
                  }}
                </el-button>
                <el-button
                  type="primary"
                  :disabled="form.itemInfoList?.length === 0"
                  @click="handleAutoWarehouse"
                  size="small"
                >
                  自动分仓
                </el-button>
                <el-select
                  v-model="unitCode"
                  style="width: 88px; height: 24px; margin-left: 8px"
                  @change="handleUnitCodeChange"
                  size="small"
                  class="unitSelect"
                >
                  <el-option label="按件发货" :value="0" />
                  <el-option label="按箱发货" :value="1" />
                </el-select>
              </div>
            </div>
            <div class="tablewrap">
              <el-table
                :data="form.itemInfoList"
                :row-style="tableRowStyle"
                :show-summary="false"
                :summary-method="getSummaries"
                v-loading="listLoading || loading"
                row-class-name="rowcell"
                header-cell-class-name="hdcell"
                :border="true"
                :height="form?.itemInfoList?.length ? 'auto' : 430"
                ref="productFormRef"
              >
                <el-table-column
                  prop="productName"
                  class-name="vtop"
                  min-width="240px"
                  width="268px"
                  label="产品名称"
                >
                  <template #default="{ row }">
                    <div class="product-item">
                      <div class="left">
                        <div class="leftimg">
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
                          <img
                            v-if="row?.isOutStock"
                            class="outStock"
                            :src="getImg('outStock')"
                            alt=""
                          />
                        </div>
                        <div>
                          <div class="product-title">
                            <OverflowTooltip
                              :content="row?.productName"
                              :line="2"
                              :font-size="12"
                            />
                          </div>
                          <div class="product-sku">
                            <span class="item-label">产品SKU：</span>
                            {{ row?.skuCode }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="suggestPrice" min-width="94" label="建议售价">
                  <template #default="{ row }">{{ row?.suggestPrice }}</template>
                </el-table-column>
                <el-table-column prop="postalPrice" min-width="94" label="报价" />
                <el-table-column label="销售单价" min-width="152">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].price`"
                      :rules="[
                        {
                          required: true,
                          message: '请输入销售单价',
                          trigger: ['blur', 'change'],
                        },
                        {
                          pattern: priceRuleFixed4,
                          message: '请输入正确的销售单价',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                    >
                      <el-input placeholder="请输入" v-model="row.price" />
                      <div class="price">
                        <div class="price-info">
                          <span class="item-label">税率:</span>
                          {{ rateInfo?.taxRate?.toFixed(4) }}%
                        </div>
                        <div class="price-info">
                          <span class="item-label">税额:</span>
                          <span v-if="row?.price">
                            {{ ((row?.price * rateInfo?.taxRate) / 100)?.toFixed(4) }}
                          </span>
                          <span v-else>0</span>
                        </div>
                        <div class="price-info">
                          <span class="item-label">含税单价:</span>
                          <span v-if="row?.price">
                            {{ (row?.price * (1 + rateInfo?.taxRate / 100))?.toFixed(4) }}
                          </span>
                          <span v-else>0</span>
                        </div>
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="佣金" min-width="152">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].commission`"
                      :rules="[
                        {
                          pattern: priceRuleFixed4,
                          message: '请输入正确的佣金',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                    >
                      <el-input placeholder="请输入" v-model="row.commission" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="发货方式" width="152">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].deliveryCode`"
                      :rules="[{ required: true, message: '请选择发货方式', trigger: 'change' }]"
                    >
                      <el-select
                        :placeholder="
                          !row.deliveryCode && !form.receiveInfo.countryCode
                            ? '请先选择收件人国家或地址'
                            : '请选择'
                        "
                        v-model="row.deliveryCode"
                        filterable
                        @change="handleDeliveryCodeChange($event, row, row.deliveryList)"
                      >
                        <el-option
                          v-for="item in row.deliveryList"
                          :key="item.deliveryCode"
                          :label="item.deliveryName"
                          :value="item.deliveryCode"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="warehouseCode" label="仓库" width="166">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].warehouseCode`"
                      :rules="[{ required: true, message: '请选择仓库', trigger: 'change' }]"
                    >
                      <el-select
                        style="width: 100%"
                        v-model="row.warehouseCode"
                        filterable
                        :placeholder="
                          !row.deliveryCode && !row.warehouseCode ? '请先选择发货方式' : '请选择'
                        "
                        @change="handleWarehouseCodeChange($event, row, row.warehouseList)"
                      >
                        <el-option
                          v-for="item in row.warehouseList"
                          :key="item.warehouseCode"
                          :label="item.warehouseName"
                          :value="item.warehouseCode"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="supplySku" label="供应链SKU" width="170">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].supplySku`"
                      :rules="[{ required: true, message: '请选择供应链SKU', trigger: 'change' }]"
                    >
                      <el-select
                        style="width: 100%"
                        v-model="row.supplySku"
                        filterable
                        :placeholder="
                          !row.supplySku && !row.warehouseCode ? '请先选择发货方式和仓库' : '请选择'
                        "
                        @change="handleSupplySkuChange($event, row, row.supplySkuItemList)"
                      >
                        <el-option
                          v-for="item in row.supplySkuItemList"
                          :key="item.supplySku"
                          :label="item.supplySku"
                          :value="item.supplySku"
                        />
                      </el-select>
                      <div
                        class="textStyle"
                        v-if="
                          statistics[`${row.warehouseCode}-${row.supplySku}`]?.sameWith?.filter(
                            (item) => item !== $index + 1
                          )?.length
                        "
                      >
                        与第{{
                          statistics[`${row.warehouseCode}-${row.supplySku}`]?.sameWith
                            ?.filter((item) => item !== $index + 1)
                            ?.join(',')
                        }}行仓库、供应链SKU相同
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="inventory"
                  label="库存"
                  width="74"
                  :rules="[{ required: true, message: '库存不足,请修改库存', trigger: 'change' }]"
                />

                <el-table-column
                  prop="cartonQty"
                  label="数量 (箱)"
                  width="89"
                  v-if="unitCode === 1"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].cartonQty`"
                      :rules="[{ required: true, type: 'number', min: 1, message: '请输入数量' }]"
                    >
                      <Num
                        v-model="row.cartonQty"
                        :precision="0"
                        :min="1"
                        :max="99999"
                        @change="
                          (val) => {
                            handleQtyChange(row);
                          }
                        "
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column v-else prop="num" label="数量 (件)" width="89">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].num`"
                      :rules="[{ required: true, type: 'number', min: 1, message: '请输入数量' }]"
                    >
                      <Num
                        v-model="row.num"
                        :precision="0"
                        :min="1"
                        :max="99999"
                        @change="resetStatistics()"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="单位">
                <template #default="{ row }">
                  <span>{{ row.unitCode === 1 ? '箱' : '件' }}</span>
                </template>
              </el-table-column> -->
                <el-table-column
                  label="箱规（cm）"
                  prop="sizeDesc"
                  v-if="unitCode === 1"
                  min-width="120"
                />
                <el-table-column label="发货数量" prop="num" v-if="unitCode === 1" />
                <el-table-column prop="shippingCode" min-width="100px" width="166" label="物流渠道">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="table-form-item"
                      :prop="`itemInfoList[${$index}].shippingCode`"
                      :rules="[{ required: true, message: '请选择物流渠道', trigger: 'change' }]"
                    >
                      <el-select
                        v-model="row.shippingCode"
                        filterable
                        :placeholder="
                          !row.warehouseCode && !row.shippingCode ? '请先选择仓库' : '请选择'
                        "
                      >
                        <el-option
                          v-for="item in row.shippingList"
                          :key="item.value"
                          :label="item.desc"
                          :value="item.value"
                        />
                      </el-select>
                      <!-- <div class="text-success fs-7 timeicon">
                      预估时效：{{
                        row?.shippingList?.find((v) => v.value === row.shippingCode)?.params
                          ?.timeliness
                      }}
                    </div> -->
                      <div class="text-warning fontcolor d-flex flex-align timeicon">
                        <i class="iconfont icon-shijian" style="font-size: 12px"></i>
                        预估时效：{{
                          row?.shippingList?.find((v) => v.value === row.shippingCode)?.params
                            ?.timeliness
                        }}
                      </div>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="60px">
                  <template #default="{ row, $index }">
                    <div>
                      <el-link
                        type="primary"
                        style="font-size: 12px"
                        @click="copyRow(row, $index)"
                        :underline="false"
                      >
                        复制
                      </el-link>
                      <el-link
                        type="danger"
                        style="font-size: 12px; margin-top: 8px"
                        @click="remove($index)"
                        :underline="false"
                      >
                        删除
                      </el-link>
                    </div>
                  </template>
                </el-table-column>
                <template #empty>
                  <div class="flex-align flex-center">
                    <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
                  </div>
                  <div class="text">请选择产品</div>
                </template>
              </el-table>
            </div>
          </div>
          <div class="total">{{ totalText }}</div>
          <div class="linebg"></div>
          <div v-if="!isAdd" class="wrap1 mb-10" id="originProduct">
            <div class="add-title3">
              <div class="text">原平台产品信息</div>
            </div>
            <div class="tablewrap">
              <el-table
                :data="form?.platformItemInfoList"
                class="pdtable"
                class-name="vtop"
                size="small"
                :border="true"
                row-class-name="platform-rowcell"
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
          <div class="linebg"></div>
          <div class="wrap1" id="order">
            <div class="add-title3">订单信息</div>
            <el-form
              label-position="top"
              label-width="140px"
              :disabled="isAudit"
              ref="infoFormRef"
              :model="form"
              :rules="rules"
              v-loading="loading"
            >
              <el-row :gutter="20">
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="卖家账号">
                    <el-select
                      disabled
                      style="width: 100%"
                      v-model="form.baseInfo.shopAccount"
                      clearable
                      filterable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="订单号">
                    <el-input
                      placeholder="请输入"
                      disabled
                      v-model="form.baseInfo.erpCode"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="参考单号" prop="baseInfo.refNo">
                    <el-input
                      clearable
                      placeholder="请输入"
                      v-model.trim="form.baseInfo.refNo"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item
                    label="订单渠道"
                    prop="baseInfo.orderSaleType"
                    :rules="[{ required: orderSaleTypeMap?.length, message: '请选择订单渠道' }]"
                  >
                    <!--订单渠道 改成 不可 clearable -->
                    <el-select
                      v-model="form.baseInfo.orderSaleType"
                      filterable
                      clearable
                      @change="queryTaxRate"
                    >
                      <el-option
                        v-for="item in orderSaleTypeMap"
                        :key="item?.value"
                        :label="item?.label"
                        :value="item?.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="交货方式" prop="baseInfo.deliverType">
                    <el-select
                      v-model="form.baseInfo.deliverType"
                      style="width: 100%"
                      @change="queryTaxRate"
                      clearable
                    >
                      <el-option value="0" label="FOB" />
                      <el-option value="1" label="DDP" />
                      <el-option value="2" label="EXW" />
                      <el-option value="3" label="DAP" />
                      <el-option value="4" label="FCA" />
                      <el-option value="5" label="CPT" />
                      <el-option value="6" label="CIP" />
                      <el-option value="7" label="DPU" />
                      <el-option value="8" label="FAS" />
                      <el-option value="9" label="CFR" />
                      <el-option value="10" label="CIF" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="付款时间">
                    <el-input
                      v-if="isAdd"
                      placeholder="请输入"
                      disabled
                      value="默认为新增订单时间"
                    />
                    <el-date-picker
                      v-else
                      style="width: 100%"
                      v-model="form.baseInfo.payTime"
                      placeholder="请选择期望发货时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="期望发货">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.baseInfo.platformExpectedSendTime"
                      placeholder="请选择期望发货时间"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="平台送达时间">
                    <el-date-picker
                      v-model="expectedArrivalTime"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="YYYY-MM-DD"
                      :teleported="false"
                      @change="
                        (val) => {
                          form.baseInfo.operationExpectedArrivalTime = val[0];
                          form.baseInfo.operationExpectedArrivalTimeEnd = val[1];
                        }
                      "
                    />
                    <!--              <el-date-picker
                style="width: 100%"
                v-model="form.baseInfo.operationExpectedArrivalTime"
                placeholder="平台送达时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />-->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="是否为COD订单">
                    <el-radio-group v-model="form.baseInfo.cod">
                      <el-radio :value="1">是</el-radio>
                      <el-radio :value="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="linebg"></div>
          <div class="wrap1 pb6" id="caculate">
            <div class="add-title3">结算信息</div>
            <el-form
              scroll-to-error
              label-position="top"
              label-width="140px"
              :disabled="isAudit"
              ref="paymentTermsInfoFormRef"
              :model="form"
            >
              <el-row :gutter="20">
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="收款条件" prop="paymentTermsInfo.paymentTermsCode">
                    <!-- {{ form.paymentTermsInfo.paymentTermsDesc || '-' }} -->
                    <el-input
                      placeholder=""
                      disabled
                      v-model="paymentTermsDescFormat"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="结算方式" prop="paymentTermsInfo.settlementMethod">
                    <!-- {{ form.paymentTermsInfo.settlementMethodDesc || '-' }} -->
                    <el-input
                      placeholder=""
                      disabled
                      v-model="settlementMethodDescFormat"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item
                    label="结算周期"
                    :prop="form.paymentTermsInfo.settlementMethod === 0 ? 'settlementInterval' : ''"
                    disabled
                  >
                    <!-- {{ form.paymentTermsInfo.settlementPeriod || '-' }} -->
                    <el-input
                      placeholder=""
                      disabled
                      v-model="settlementPeriodFormat"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="合同签约主体" prop="paymentTermsInfo.contractSubject">
                    <!-- {{ form?.paymentTermsInfo?.contractSubject || '-' }} -->
                    <el-input
                      placeholder=""
                      disabled
                      v-model="contractSubjectFormat"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="linebg"></div>
          <div class="wrap1 pb6" id="money">
            <div class="add-title3">金额信息</div>
            <el-form
              scroll-to-error
              label-position="top"
              label-width="140px"
              :disabled="isAudit"
              ref="moneyInfoFormRef"
              :model="form"
              :rules="rules"
            >
              <el-row :gutter="20">
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="货币类型" prop="baseInfo.currencyCode">
                    <CurrencySelect
                      v-model="form.baseInfo.currencyCode"
                      style="width: 100%"
                      @change="handleCurrencyChange"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="总金额">
                    <el-input placeholder="请输入" v-model="totalAmountText" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="总税额">
                    <el-input placeholder="请输入" v-model="totalTax" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="运费">
                    <el-input
                      placeholder="请输入"
                      v-model="form.baseInfo.freightAmount"
                      :maxlength="100"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="销售运费">
                    <el-input
                      placeholder="请输入"
                      v-model="form.baseInfo.salesFreightAmount"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="折扣金额">
                    <el-input
                      placeholder="请输入"
                      v-model="form.baseInfo.discountAmount"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="总佣金">
                    <el-input placeholder="请输入" v-model="totalCommission" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="交易额">
                    <el-input
                      placeholder="请输入"
                      disabled
                      v-model="transactionAmountText"
                      :maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="实际交易额">
                    <el-input placeholder="请输入" disabled v-model="realAmountText" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="linebg"></div>
          <div class="wrap1" id="deliver">
            <div class="add-title3">物流信息</div>
            <!-- <el-form
              scroll-to-error
              label-position="top"
              label-width="140px"
              :disabled="isAudit"
              ref="deliverInfoFormRef"
              :model="form"
              :rules="rules"
            > -->
            <el-row>
              <el-col :md="6" :sm="8" :offset="0">
                <el-form-item label="唛头">
                  <el-input placeholder="请输入" v-model="form.baseInfo.shippingMark" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="是否指定装箱">
              <el-radio-group v-model="form.packingAttachmentStatus">
                <el-radio :value="1">是</el-radio>
                <el-radio :value="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="18" :md="18" :sm="18" class="h116">
                <!-- accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg" -->
                <el-form-item label="附件" v-if="showAttachFile">
                  <KeenFileUpload
                    :showOperate="false"
                    class="packing-upload"
                    directory="erp/order/attachment"
                    ref="uploadRef"
                    v-model="fileList"
                    :limit="null"
                    style="width: 440px"
                  >
                    <el-button size="default">
                      <template #icon>
                        <i class="iconfont icon-shangchuan1"></i>
                      </template>
                      <template #default>上传附件</template>
                    </el-button>
                    <template #file="{ file }">
                      <div class="custom-file-item">
                        <img :src="file.url" class="el-upload-list__item-thumbnail" />
                        <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-delete">
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                  </KeenFileUpload>
                  <div v-if="fileList.length === 0" class="uploadtip">
                    <span>
                      请上传.doc .docx .pdf .jpg .excel .word等格式文件，建议大小不超过5MB
                    </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="18"
                :md="18"
                :sm="18"
                v-if="form.packingAttachmentStatus === 1"
                class="h116"
              >
                <el-form-item label="指定装箱附件" prop="cartonFileList">
                  <KeenFileUpload
                    :showOperate="false"
                    accept=".pdf"
                    class="packing-upload"
                    directory="erp/order/attachment"
                    ref="uploadRef1"
                    v-model="form.cartonFileList"
                    :limit="1"
                    @success="
                      () => {
                        formRef.validateField('cartonFileList');
                      }
                    "
                  >
                    <el-button size="default">
                      <template #icon>
                        <i class="iconfont icon-shangchuan1"></i>
                      </template>
                      <template #default>上传附件</template>
                    </el-button>
                  </KeenFileUpload>
                  <div v-if="form.cartonFileList?.length === 0" class="uploadtip">
                    <span>请上传PDF文件，建议大小不超过5MB</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="18" :sm="18" v-if="form.packingAttachmentStatus === 1" class="h116">
                <el-form-item label="订单详情附件" prop="orderFileList">
                  <KeenFileUpload
                    :showOperate="false"
                    accept=".xlsx,.xls"
                    class="packing-upload"
                    directory="erp/order/attachment"
                    ref="uploadRef2"
                    v-model="form.orderFileList"
                    :limit="1"
                    @success="
                      () => {
                        formRef?.validateField('orderFileList');
                      }
                    "
                    sizeLimit="5242880"
                  >
                    <el-button size="default">
                      <template #icon>
                        <i class="iconfont icon-shangchuan1"></i>
                      </template>
                      <template #default>上传附件</template>
                    </el-button>
                  </KeenFileUpload>
                  <div v-if="form.orderFileList?.length === 0" class="uploadtip">
                    <span>请上传EXCEL文件，建议大小不超过5MB</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="linebg"></div>
          <div class="wrap1 pb6" id="remark">
            <div class="add-title3">备注信息</div>
            <!-- <el-form
              scroll-to-error
              label-position="top"
              label-width="140px"
              :disabled="isAudit"
              ref="remarkInfoFormRef"
              :model="form"
            > -->
            <el-row>
              <el-col :md="12" :sm="12" :offset="0">
                <el-form-item label="客服备注">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="form.baseInfo.customRemark"
                    :maxlength="100"
                    placeholder="请输入"
                    input-style="max-width: 554px; height: 100px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="12" :sm="12" :offset="0">
                <el-form-item label="订单备注">
                  <el-input
                    type="textarea"
                    :rows="3"
                    v-model="form.baseInfo.remark"
                    :maxlength="100"
                    placeholder="请输入"
                    input-style="max-width: 554px; height: 100px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="linebg" v-if="isAudit"></div>
          <div class="wrap1" v-if="isAudit" id="audit">
            <div class="add-title3">审核操作</div>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item
                  label="审核结果"
                  prop="pass"
                  :rules="[{ required: true, message: '请选择审核结果' }]"
                >
                  <el-radio-group v-model="form.pass">
                    <el-radio :value="true">通过</el-radio>
                    <el-radio :value="false">不通过</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item label="备注">
                  <el-input
                    placeholder="请输入"
                    v-model="form.remark"
                    type="textarea"
                    :rows="6"
                    input-style="max-width: 554px; height: 100px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="linebg" v-if="isAudit"></div>
          <div class="wrap1" v-if="isAudit" id="split">
            <div class="add-title3">拆单操作</div>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item
                  label="拆单"
                  prop="baseInfo.autoSubOrder"
                  :rules="[{ required: true, message: '请选择拆单方式' }]"
                >
                  <el-radio-group v-model="form.baseInfo.autoSubOrder">
                    <el-radio :value="1">自动拆单</el-radio>
                    <el-radio :value="0">手动拆单</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0" class="h116">
                <el-form-item label="附件">
                  <KeenFileUpload
                    :showOperate="false"
                    accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
                    class="packing-upload"
                    directory="erp/order/attachment"
                    ref="uploadRef"
                    v-model="fileList"
                    :limit="null"
                  >
                    <el-button size="default">
                      <template #icon>
                        <i class="iconfont icon-shangchuan1"></i>
                      </template>
                      <template #default>上传附件</template>
                    </el-button>
                  </KeenFileUpload>
                  <div v-if="fileList.length === 0" class="uploadtip">
                    <span>请上传图片/PDF/EXCEL/WORD文件，建议大小不超过5MB</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="split-footer"></div>
            <div class="split-footer"></div>
          </div>
        </div>
      </el-form>
      <div class="footer"></div>
      <div class="d-flex justify-content-center footer fixed">
        <template v-if="!isAudit">
          <template v-if="errerNumer !== 0">
            <div class="d-flex">
              <div class="tip">错误提示</div>
              <div class="number">{{ errerNumer }}</div>
              <el-popover placement="top" trigger="hover">
                <div class="error-popover">
                  <div class="title">请完成必填项后再提交订单</div>
                  <div class="type" v-show="recieverNum > 0">
                    <div class="left">收件人信息</div>
                    <div class="right">
                      剩余
                      <span class="red">{{ recieverNum }}</span>
                      个必填项
                    </div>
                  </div>
                  <div class="type" v-show="!checkItemnfoList()">
                    <div class="left">产品信息</div>
                    <div class="right" v-if="form.itemInfoList.length === 0">未添加产品</div>
                    <div class="right" v-else-if="!checkItemnfoList()">请填写所有产品信息</div>
                    <div class="right" v-else>已填写所有产品信息</div>
                    <!-- <div class="right">
                      剩余
                      <span class="red">{{ productNum }}</span>
                      个必填项
                    </div> -->
                  </div>
                  <div class="type" v-show="orderNum > 0">
                    <div class="left">订单信息</div>
                    <div class="right">
                      剩余
                      <span class="red">{{ orderNum }}</span>
                      个必填项
                    </div>
                  </div>
                  <div class="type" v-show="moneyNum > 0">
                    <div class="left">金额信息</div>
                    <div class="right">
                      剩余
                      <span class="red">{{ moneyNum }}</span>
                      个必填项
                    </div>
                  </div>
                  <div class="type" v-show="form.packingAttachmentStatus === 1 && deliverNum > 0">
                    <div class="left">物流信息</div>
                    <div class="right">
                      剩余
                      <span class="red">{{ deliverNum }}</span>
                      个必填项
                    </div>
                  </div>
                </div>
                <template #reference>
                  <div class="look" @click="showError">点击查看</div>
                </template>
              </el-popover>
            </div>
          </template>
          <div v-else class="noerror tip">
            <i class="iconfont icon-chenggongzhuangtai"></i>
            字段填写已完成
          </div>
        </template>
        <el-button type="primary" :loading="saveLoading" @click="save(true)">
          {{ isEdit ? '确定并转待审核' : isAdd ? '提交订单' : '确定' }}
        </el-button>
        <el-button
          :disabled="saveLoading"
          @click="save(false)"
          v-if="isAdd || (form.baseInfo.orderStatus === 101 && isEdit)"
        >
          存草稿
        </el-button>
        <!-- <el-button
          v-if="form.baseInfo.orderStatus === 101 && isEdit"
          type="primary"
          :loading="saveLoading"
          @click="save(false)"
        >
          保存
        </el-button> -->
        <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      </div>
      <ProductDialog
        :countryCode="form.receiveInfo.countryCode"
        :customerCode="form.receiveInfo.customerCode"
        :currencyCode="form.baseInfo.currencyCode"
        :searchErpQuotation="true"
        v-if="productDialogVisible"
        :visible="productDialogVisible"
        @close="handleProductDialogClose"
        :selected-rows="form.itemInfoList"
        confirm-text="确认"
        title="添加产品"
        type="supplierSku"
      />
      <!-- :content="退出后之前填写的信息将清空" -->
      <CancelDialog
        ref="cancellRef"
        @success="cancelSave"
        type="warning"
        title="是否退出?"
        content="退出后之前填写的信息将清空"
        align-center
      >
        <template #button>
          <el-button
            :disabled="saveLoading"
            @click="saveDraft"
            v-if="isAdd || (form.baseInfo.orderStatus === 101 && isEdit)"
          >
            存草稿
          </el-button>
        </template>
      </CancelDialog>
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts" name="B2BOrderAdd">
  import Num from '@/components/NumberInput/index.vue';
  import { erpApi, financeSystemApi, productApi } from '@/api';
  import type { ReceiptConditionBean } from '@/api/financeSystem/data-contracts';
  import { useRoute, useRouter } from 'vue-router';
  import ProductDialog from '@/views/favoursystem/perfortrack/samplesend/components/productDialog.vue';
  // import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { useTabs } from '@/hooks/tabs';
  import CancelDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/CancelDialog.vue';

  const { closeTabAndRefresh } = useTabs();
  // import { CustomMessage } from '@/hooks/message/useMessage';

  const cancellRef: any = ref();

  const activated = ref('reciever');
  const tabs = reactive([
    { label: '收件人信息', id: 'reciever' },
    { label: '产品信息', id: 'product' },
    { label: '原平台产品信息', id: 'originProduct' },
    { label: '订单信息', id: 'order' },
    { label: '结算信息', id: 'caculate' },
    { label: '金额信息', id: 'money' },
    { label: '物流信息', id: 'deliver' },
    { label: '备注信息', id: 'remark' },
  ]);

  const aewrapRef = ref<any>(null);
  let contentSection1;

  const sections = ref<any>([]); // 每个分区 顶部偏移
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
    // console.log('initSections', JSON.stringify(sections.value));
  };
  const headerHeight = 99;
  const tabClick = (tab: any) => {
    // console.log('tab ', tab, tab.paneName);
    // activated.value = tab.paneName;
    setTimeout(() => {
      activated.value = tab.paneName;
    }, 300);
    const section = document.getElementById(tab.paneName);
    if (section) {
      // section.scrollIntoView({ behavior: 'smooth' });
      // 计算Sticky头部高度
      const top = section.offsetTop - headerHeight;
      contentSection1?.scrollTo({ top, behavior: 'smooth' });
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
  let formInital;
  const initScroll = () => {
    contentSection1 = document.querySelector('.layout-right-main');
    if (contentSection1) {
      contentSection1.addEventListener('scroll', handleScroll);
    }
    setTimeout(() => {
      initSections();
    }, 100);
    setTimeout(() => {
      initSections();
    }, 1500);
    window.addEventListener('resize', initSections);

    form.value.packingAttachmentStatus = 0;
    formInital = JSON.stringify(form.value);
  };
  const paymentTermsDescFormat = computed(() => {
    return form.value.paymentTermsInfo?.paymentTermsDesc || '-';
  });
  const settlementMethodDescFormat = computed(() => {
    return form.value.paymentTermsInfo?.settlementMethodDesc || '-';
  });
  const settlementPeriodFormat = computed(() => {
    return form.value.paymentTermsInfo?.settlementPeriod || '-';
  });
  const contractSubjectFormat = computed(() => {
    return form.value.paymentTermsInfo?.contractSubject || '-';
  });
  const resetFormData = () => {
    // clearScroll
    // console.log('clearScroll ', contentSection1);
    if (contentSection1) {
      contentSection1.removeEventListener('scroll', handleScroll);
    }
    window.removeEventListener('resize', initSections);

    form.value.packingAttachmentStatus = 0;
    // 文件列表清空
    fileList.value = [];
    receiveFormRef.value?.clearValidate();
    receiveFormRef.value?.resetFields();
    infoFormRef.value?.resetFields();
    infoFormRef.value?.clearValidate();
    form.value = {
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
        platformExpectedSendTime: '',
        orderStatus: 0,
        flowName: '',
        orderSaleType: '',
        deliverType: '',
      },
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
      authNodeList: [],
      // 测试
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
      },
      paymentTermsInfo: {
        paymentTermsCode: '',
        paymentTermsDesc: '',
        settlementMethod: 0,
        settlementMethodDesc: '',
        settlementPeriod: '',
        contractSubject: '',
      },
      pass: undefined,
      remark: undefined,
      packingAttachmentStatus: 0,
      cartonFileList: [] as any[],
      orderFileList: [] as any[],
    };
  };
  onMounted(() => {
    // console.log('onMounted 111');
    initScroll();
    // resetFormData();
  });
  onUnmounted(() => {
    // console.log('onUnmounted 222');
    resetFormData();
  });

  onActivated(() => {
    // console.log('tab 打开,onActivated');
    initScroll();
    // resetFormData();
    // 每次进来 ,如果是复制, 请求数据
    if (route.query.code) {
      initData();
    }
  });

  onDeactivated(() => {
    // 更新内容
    // console.log('onDeactivated', 'removeEventListener');
    resetFormData();
  });

  const route = useRoute();
  const router = useRouter();

  const expectedArrivalTime = ref<any>([]);
  const pageTitle = ref('新增订单');
  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });
  // 是否显示附件  , 暂时解决 附件不显示bug
  const showAttachFile = ref(false);
  if (isAdd.value) {
    showAttachFile.value = true;
    pageTitle.value = '新增订单';
  }
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  if (isEdit.value) {
    pageTitle.value = '编辑订单';
  }
  const isAudit = computed(() => {
    return route.fullPath.includes('/audit');
  });
  if (isAudit.value) {
    pageTitle.value = '审核订单';
    tabs.push({ label: '审核操作', id: 'audit' });
    tabs.push({ label: '拆单操作', id: 'split' });
    // initSections();
    // nextTick(() => {
    //   console.log('getElementById');
    //   const section = document.getElementById('audit');
    //   console.log(section);
    //   if (section) {
    //     // 计算Sticky头部高度
    //     const top = section.offsetTop - headerHeight;
    //     contentSection1?.scrollTo({ top, behevior: 'instant‌' });
    //   }
    //   activated.value = 'audit';
    // });
  }

  const unitCode = ref(0);

  const formRef = ref<FormInstance>();
  const receiveFormRef = ref<FormInstance>();
  const productFormRef = ref<FormInstance>();
  const infoFormRef = ref<FormInstance>();
  // const fileList = ref([] as any[]);
  const fileList = ref([] as any);
  const cartonFileList = ref([]);
  const orderFileList = ref([]);
  const paymentTermsInfoFormRef = ref<FormInstance>(); // 结算信息表单
  const moneyInfoFormRef = ref<FormInstance>(); // 金额信息表单
  // const deliverInfoFormRef = ref<FormInstance>(); // 物流信息表单
  // const remarkInfoFormRef = ref<FormInstance>(); // 备注信息表单

  const receiptConditionList = ref<ReceiptConditionBean[]>([]); // 收款条件
  const statistics = ref({});
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
      platformExpectedSendTime: '',
      orderStatus: 0,
      flowName: '',
      orderSaleType: '',
      deliverType: '',
    },
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
    authNodeList: [],
    // 测试
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
    },
    paymentTermsInfo: {
      paymentTermsCode: '',
      paymentTermsDesc: '',
      settlementMethod: 0,
      settlementMethodDesc: '',
      settlementPeriod: '',
      contractSubject: '',
    },
    pass: undefined,
    remark: undefined,
    packingAttachmentStatus: 1,
    cartonFileList: [] as any[],
    orderFileList: [] as any[],
  });
  const rules = reactive<FormRules>({
    'receiveInfo.customerCode': [{ required: true, message: '请选择客户名称' }],
    'receiveInfo.name': [{ required: true, message: '请输入收件人名称' }],
    'receiveInfo.countryCode': [{ required: true, message: '请选择国家或地区' }],
    'receiveInfo.email': [{ required: false, type: 'email', message: '请输入正确的Email地址' }],
    'receiveInfo.province': [{ required: true, message: '请输入收件人省/州' }],
    'receiveInfo.city': [{ required: true, message: '请输入城市' }],
    'receiveInfo.address': [{ required: true, message: '请输入地址' }],
    'receiveInfo.phone': [{ required: true, message: '请输入收件人号码' }],
    'receiveInfo.zipcode': [{ required: true, message: '请输入邮编' }],
    'baseInfo.currencyCode': [{ required: true, message: '请选择货币类型' }],
    'baseInfo.deliverType': [{ required: true, message: '请选择交货方式' }],
    'baseInfo.refNo': [{ required: true, message: '请输入参考单号' }],
    cartonFileList: [{ required: true, message: '请上传指定装箱附件' }],
    orderFileList: [{ required: true, message: '请上传订单详情附件' }],
  });
  const transactionAmount = computed(() => {
    return form.value?.itemInfoList
      ?.reduce((sum, item) => sum + item.price * item.num, 0)
      ?.toFixed(3);
  });
  const transactionAmountAndTax = computed(() => {
    return (transactionAmount.value * 1 + totalTax.value * 1)?.toFixed(3);
  });
  const transactionAmountText = computed(() => {
    return `含税${transactionAmountAndTax.value} / 不含税${transactionAmount.value}`;
  });
  // 修改 计算逻辑  , 要减去 总佣金
  const realAmount = computed(() => {
    // console.log(
    //   transactionAmount.value,
    //   form.value?.baseInfo?.freightAmount,
    //   totalCommission.value,
    //   form.value?.baseInfo?.discountAmount,
    //   form.value?.baseInfo?.salesFreightAmount
    // );
    return (
      transactionAmount.value -
      (form.value?.baseInfo?.freightAmount * 1 || 0) -
      (totalCommission.value * 1 || 0) -
      (form.value?.baseInfo?.discountAmount * 1 || 0) +
      (form.value?.baseInfo?.salesFreightAmount * 1 || 0)
    ).toFixed(3);
  });
  const realAmountAndTax = computed(() => {
    return (realAmount.value * 1 + totalTax.value * 1)?.toFixed(3);
  });
  const realAmountText = computed(() => {
    return `含税${realAmountAndTax.value} / 不含税${realAmount.value}`;
  });

  // 总佣金
  const totalCommission = computed(() => {
    let sums = 0;
    sums = form.value?.itemInfoList?.reduce((sum, item: any) => sum + item.commission * 1, 0);
    return sums.toFixed(3);
  });
  // 商品总金额
  const totalPrice = computed(() => {
    // return form.value?.itemInfoList?.reduce((sum, item: any) => sum + item.price * 1, 0);
    // return form.value?.itemInfoList
    //   ?.reduce((sum, item: any) => sum + item.price * item.num * 1, 0)
    //   .toFixed(4);
    let sums = 0;
    sums = form.value?.itemInfoList?.reduce(
      (sum, item: any) => sum * 1 + item.price * item.num * 1,
      0
    );
    return sums.toFixed(4);
  });
  // 总金额 不含税
  const amount = computed(() => {
    return (
      totalPrice.value * 1 +
      (form.value?.baseInfo?.freightAmount * 1 || 0) +
      (form.value?.baseInfo?.salesFreightAmount * 1 || 0)
    ).toFixed(3);
  });
  // 总金额 含税
  const amountAndTax = computed(() => {
    return (
      totalPrice.value * 1 +
      totalTax.value * 1 +
      (form.value?.baseInfo?.freightAmount * 1 || 0) +
      (form.value?.baseInfo?.salesFreightAmount * 1 || 0)
    ).toFixed(3);
  });
  const totalAmountText = computed(() => {
    return `含税${amountAndTax.value} / 不含税${amount.value}`;
  });
  // 总税额
  const totalTax = computed(() => {
    let sums = 0;
    for (let i = 0; i < form.value?.itemInfoList.length; i += 1) {
      const item: any = form.value?.itemInfoList[i];
      // console.log(item);
      // 乘以 数量 ?? 箱子
      sums += (item.price * item.num * rateInfo.value.taxRate) / 100;
      if (i === form.value.itemInfoList.length - 1) {
        sums = Number(sums.toFixed(4));
      }
    }
    return sums;
  });
  // 含税金额
  const totalPriceAndTax = computed(() => {
    return Number(totalPrice.value * 1 + totalTax.value * 1).toFixed(4);
  });
  const totalText = computed(() => {
    return `总计金额：含税${totalPriceAndTax.value} / 不含税${totalPrice.value}`;
  });

  const customerList = ref<any[]>([]);
  const queryCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerList.value = res?.recordList || [];
  };
  queryCustomerList();

  // 查询收款条件
  const queryReceiptConditionList = async () => {
    const res = await financeSystemApi.financeReceiptConditionQueryList({
      pageNum: 1,
      pageSize: 100,
      status: 1, // 状态：1-启用，2-禁用
    });
    receiptConditionList.value = res?.receiptConditionList || [];
  };
  queryReceiptConditionList();

  const orderSaleTypeMap = ref<any[]>([]);
  const loading = ref(false);
  const listLoading = ref(false);
  const errerNumer = ref(11);

  // 退出 存草稿
  const saveDraft = () => {
    // console.log('saveDraft', errerNumer.value);
    cancellRef.value.close();
    save(false);
  };
  const cancelSave = () => {
    goBackOrder();
  };

  const checkItemnfoList = () => {
    let allInput = false;
    for (let i = 0; i < form.value.itemInfoList.length; i += 1) {
      const item: any = form.value.itemInfoList[i];
      if (
        item.price === '' ||
        item.deliveryCode === '' ||
        item.warehouseCode === '' ||
        item.supplySku === '' ||
        item.shippingCode === ''
      ) {
        break;
      }
      if (unitCode.value === 0) {
        if (item.num === '') {
          break;
        }
      } else if (item.cartonQty === '') {
        break;
      }
      if (i === form.value.itemInfoList.length - 1) {
        allInput = true;
      }
    }
    return allInput;
  };

  const recieverNum = ref(8);
  const productNum = ref<any>(1);
  const orderNum = ref(2);
  const moneyNum = ref(1);
  const deliverNum = ref(0);
  watchEffect(() => {
    let number = 12;
    recieverNum.value = 8;
    // recieverNum.value = 8;
    orderNum.value = 2;
    moneyNum.value = 1;
    deliverNum.value = 0;
    // 是否指定装箱
    if (form.value.packingAttachmentStatus === 1) {
      deliverNum.value = 2;
      number += 2;
      if (form.value.cartonFileList?.length > 0) {
        deliverNum.value -= 1;
        number -= 1;
      }
      if (form.value.orderFileList?.length > 0) {
        deliverNum.value -= 1;
        number -= 1;
      }
    }
    // 审核页 增加 审核结果校验
    if (isAudit.value) {
      number += 1;
      if (form.value.pass !== undefined) {
        number -= 1;
      }
    }
    // 增加 必须 订单渠道
    if (orderSaleTypeMap.value?.length > 0) {
      orderNum.value += 1;
      number += 1;
      if (form.value.baseInfo?.orderSaleType) {
        orderNum.value -= 1;
        number -= 1;
      }
    }
    if (form.value.receiveInfo.customerCode) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value.receiveInfo.name) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value.receiveInfo.countryCode) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value.receiveInfo.province) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value.receiveInfo.city) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value.receiveInfo.address) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value.receiveInfo.phone) {
      recieverNum.value -= 1;
      number -= 1;
    }
    // 增加 校验邮箱
    if (form.value.receiveInfo.email) {
      recieverNum.value += 1;
      number += 1;
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regex.test(form.value.receiveInfo.email)) {
        recieverNum.value -= 1;
        number -= 1;
      }
    }
    if (form.value.receiveInfo.zipcode) {
      recieverNum.value -= 1;
      number -= 1;
    }
    if (form.value?.itemInfoList.length > 0) {
      // number -= 1;
      if (checkItemnfoList()) {
        productNum.value -= 1;
        number -= 1;
      } else {
        productNum.value = false;
      }
    }

    if (form.value.baseInfo.currencyCode) {
      moneyNum.value -= 1;
      number -= 1;
    }
    if (form.value.baseInfo.deliverType) {
      orderNum.value -= 1;
      number -= 1;
    }
    if (form.value.baseInfo.refNo) {
      orderNum.value -= 1;
      number -= 1;
    }
    // console.log('错误数目 ', number, form.value);
    errerNumer.value = number;
  });

  const initData = async () => {
    showAttachFile.value = false;
    loading.value = true;
    const res: any = await erpApi.luteosErpOrderQueryDetail({
      erpCode: route.query.code as string,
      searchEdit: false,
    });
    // console.log('initData detail ', res);
    // 订单备注
    if (res.orderRemarkList?.length > 0) {
      res.baseInfo.remark = res.orderRemarkList[0].remark;
    } else {
      res.baseInfo.remark = '';
    }
    if (
      (res.baseInfo.orderStatus !== 202 && isAudit.value) ||
      ((res.baseInfo.orderStatus >= 600 || res.baseInfo.orderStatus < 500) &&
        res.baseInfo.orderStatus !== 101 &&
        isEdit.value)
    ) {
      // 去掉 新增页面 跳转到详情
      // router.push({
      //   path: '/B2BOrder/detail',
      //   query: { code: route.query.code as string },
      // });
    }
    // nextTick(() => {
    //   initSections();
    // });
    setTimeout(() => {
      initSections();
    }, 500);

    if (res?.receiveInfo?.countryCode) await initCountrySelection(res?.receiveInfo?.countryCode);
    form.value = res;
    formInital = JSON.stringify(res);
    if (res.receiveInfo.customerCode && !res.paymentTermsInfo.paymentTermsCode) {
      paymentSetData(res.receiveInfo.customerCode);
    }

    loading.value = false;

    // 查询发货方式、仓库、配送方式备选项
    try {
      listLoading.value = true;
      const params: any = await erpApi.luteosErpOrderReferenceParamsBySkuCode({
        countryCode: form.value.receiveInfo.countryCode,
        skuCodeList: res?.itemInfoList?.map((item) => item.skuCode),
        type: 1,
      });

      for (const item of form.value.itemInfoList) {
        item.deliveryList = params?.paramMap[item.skuCode];
        item.warehouseList = params?.paramMap[item.skuCode]?.find(
          (k) => k.deliveryCode === item.deliveryCode
        )?.warehouseList;
        item.shippingList = params?.paramMap[item.skuCode]
          ?.find((k) => k.deliveryCode === item.deliveryCode)
          ?.warehouseList?.find((k) => k.warehouseCode === item.warehouseCode)?.shippingList;
      }
      if (route.fullPath.includes('/audit')) {
        initSections();
        setTimeout(() => {
          const section = document.getElementById('audit');
          if (section) {
            // 计算Sticky头部高度
            const top = section.offsetTop - headerHeight;
            contentSection1?.scrollTo({ top, behevior: 'instant‌' });
          }
          activated.value = 'audit';
        }, 10);
      }
    } finally {
      // listLoading.value = false;
      setTimeout(() => {
        listLoading.value = false;
      }, 200);
    }
    // 查询供应链SKU备选项及库存
    Promise.all(
      form.value.itemInfoList?.map((item) =>
        productApi.luteosProductSkuQuerySupplySkuList({
          deliverType: item?.deliveryCode,
          skuCode: item?.skuCode,
          warehouseCode: item?.warehouseCode,
        })
      )
    ).then((skuList) => {
      skuList?.forEach((item, index) => {
        form.value.itemInfoList[index].supplySkuItemList = item?.supplySkuItemList;
        form.value.itemInfoList[index].inventory =
          item.supplySkuItemList?.find(
            (k) => k?.supplySku === form.value.itemInfoList[index]?.supplySku
          )?.inventory || 0;
      });
    });

    form.value.cartonFileList = [];
    form.value.orderFileList = [];
    resetStatistics();
    // fileList.value = [];
    // const typeArr: any[] = [];
    const typeArr1: any[] = [];
    const typeArr2: any[] = [];
    res.orderAttachmentList?.forEach((item) => {
      if (item?.attachmentType === 1) {
        typeArr1.push({
          percentage: 100,
          name: item?.fileName,
          ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
          status: 'success',
        });
        // form.value?.cartonFileList?.push({
        //   percentage: 100,
        //   name: item?.fileName,
        //   ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
        //   status: 'success',
        // });
      } else if (item?.attachmentType === 2) {
        typeArr2.push({
          percentage: 100,
          name: item?.fileName,
          ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
          status: 'success',
        });
        // form.value?.orderFileList?.push({
        //   percentage: 100,
        //   name: item?.fileName,
        //   ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
        //   status: 'success',
        // });
      } else {
        // typeArr.push({
        //   percentage: 100,
        //   name: item?.fileName,
        //   ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
        //   status: 'success',
        // });
        fileList.value?.push({
          percentage: 100,
          name: item?.fileName,
          ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
          status: 'success',
        });
      }
    });
    form.value.cartonFileList = typeArr1;
    form.value.orderFileList = typeArr2;
    // console.log('fileList', fileList.value);
    // console.log('cartonFileList', form.value?.cartonFileList);
    // console.log('orderFileList', form.value?.orderFileList);
    form.value.packingAttachmentStatus = 0;
    setTimeout(() => {
      showAttachFile.value = true;
      if (form.value?.cartonFileList?.length > 0 || form.value?.orderFileList?.length) {
        form.value.packingAttachmentStatus = 1;
      } else {
        form.value.packingAttachmentStatus = 0;
      }
    }, 100);

    if (isAdd.value) form.value.baseInfo.erpCode = referenceNo.value;
    if (isAudit.value && form.value.baseInfo.autoSubOrder === null)
      form.value.baseInfo.autoSubOrder = 1;
    form.value.baseInfo.source = isAdd.value ? 0 : form.value.baseInfo.source || 0;
    expectedArrivalTime.value = [
      form.value?.baseInfo?.operationExpectedArrivalTime,
      form.value?.baseInfo?.operationExpectedArrivalTimeEnd,
    ];
    const customerInfo = customerList.value?.find(
      (item) => item.code === res?.receiveInfo?.customerCode
    );
    form.value.paymentTermsInfo.contractSubject = customerInfo?.contractSubject;
    orderSaleTypeMap.value = customerInfo?.orderSaleType
      ? customerInfo?.orderSaleType?.map((item, index) => {
          return {
            value: item,
            label: customerInfo?.orderSaleTypeDesc[index],
          };
        })
      : [];
    if (orderSaleTypeMap.value?.length === 1) {
      form.value.baseInfo.orderSaleType = orderSaleTypeMap.value[0]?.value;
    }
    queryTaxRate();
  };
  const resetStatistics = () => {
    statistics.value = {};
    form.value.itemInfoList.forEach((item, index) => {
      if (item.warehouseCode && item.supplySku) {
        if (!statistics.value[`${item.warehouseCode}-${item.supplySku}`]) {
          statistics.value[`${item.warehouseCode}-${item.supplySku}`] = {
            num: item.num || 0,
            sameWith: [index + 1],
          };
        } else {
          statistics.value[`${item.warehouseCode}-${item.supplySku}`].num =
            statistics.value[`${item.warehouseCode}-${item.supplySku}`].num + item.num || 0;
          statistics.value[`${item.warehouseCode}-${item.supplySku}`].sameWith?.push(index + 1);
        }
      }
    });
  };
  // if (route.query.code) {
  //   initData();
  // }

  const countryList = ref([]);
  const referenceNo = ref('');
  const initCountrySelection = async (val) => {
    try {
      // loading.value = true;
      const res = await erpApi.luteosErpOrderReferenceParams({ type: 1, countryCode: val });
      if (isAdd.value) {
        form.value.baseInfo.currencyCode = res.currencyCode || 'USD';
        form.value.baseInfo.currencyDesc = res.currencyDesc;
        form.value.baseInfo.shopAccount = res.shopAccount as string;
        form.value.baseInfo.erpCode = res.referenceNo as string;
        referenceNo.value = res.referenceNo;
        form.value.baseInfo.freightAmount = res.freightAmount as number;
        form.value.baseInfo.transactionAmount = res.transactionAmount as number;
      }
      countryList.value = res.navigationParamList as [];
      /* if (route.query.code) {
      await initData();
    } */
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  // initCountrySelection();

  const productDialogVisible = ref(false);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    if (selected) {
      const oldList = form.value.itemInfoList?.filter((item) =>
        list.find((i) => i.skuCode === item.skuCode)
      );
      const diffList = list
        .filter((item: any) => {
          return !oldList.find((old: any) => {
            return old.skuCode === item.skuCode;
          });
        })
        ?.map((item: any) => {
          return {
            productName: item.productTitle || item.productName,
            productSku: item.productSku,
            inventory: 0,
            skuCode: item.skuCode,
            suggestPrice: item.price,
            price: '',
            currency: item.currency,
            postalPrice: item.postalPrice,
            warehouseList: [],
            supplySkuItemList: [],
            shippingList: [],
            deliveryList: [],
            deliveryCode: '',
            num: 0,
            commission: 0,
            shippingCode: '',
            supplySku: '',
            warehouseCode: '',
            unitCode: unitCode.value,
          };
        });
      const newList = oldList.concat(diffList);

      const res: any = await erpApi.luteosErpOrderReferenceParamsBySkuCode({
        countryCode: form.value.receiveInfo.countryCode,
        skuCodeList: newList.map((item) => item.skuCode),
        type: 1,
      });
      form.value.itemInfoList = newList.map((item) => {
        if (item.deliveryList.length === 0) {
          Reflect.set(item, 'deliveryList', res.paramMap[item.skuCode]);
        }
        return item;
      });
      form.value.itemInfoList = newList as [];
      if (unitCode.value === 1)
        await checkCartonInfo(
          newList.map((item) => item.skuCode),
          false
        );
      productDialogVisible.value = false;
      nextTick(() => {
        initSections();
      });
    } else {
      productDialogVisible.value = false;
    }
  };
  // let isToast = false;
  // 判断是否高亮
  const tableRowStyle = ({ row }: { row: any; rowIndex: number }) => {
    if (statistics.value[`${row.warehouseCode}-${row.supplySku}`]?.num > row?.inventory) {
      // if (!isToast) {
      //   ElMessage.warning('订单数量大于库存');
      //   // row.isOutStock = true;
      //   isToast = true;
      //   setTimeout(() => {
      //     isToast = false;
      //   }, 1000);
      // }
      row.isOutStock = true;
      return {};
      // return 'background-color: #ffb6c1';
    }
    row.isOutStock = false;
    return {};
  };
  const errList = ref([]);
  const checkCartonInfo = async (skuCodeList, clearType) => {
    const cartonSize = await erpApi.luteosErpCartonSizeQueryList({
      customerCode: form.value.receiveInfo.customerCode,
      skuCodeList,
      pageNum: 1,
      pageSize: 500,
    });
    errList.value = [];
    form.value.itemInfoList?.forEach((item) => {
      const cartonSizeInfo = cartonSize.recordList.find(
        (carton) => carton.skuCode === item.skuCode
      );
      if (cartonSizeInfo) {
        item.sizeDesc = cartonSizeInfo?.sizeDesc;
        item.qty = cartonSizeInfo?.qty;
        item.num = clearType || !item.num ? cartonSizeInfo?.qty : item.num;
        item.cartonQty = clearType || !item.cartonQty ? 1 : item.cartonQty;
      } else {
        errList.value.push(item.productName);
      }
    });
    if (errList.value?.length > 0) {
      ElMessage.error(`以下商品没有设置箱规，请前往设置箱规！${errList.value.join(',')}`);
    }
  };

  // 收款条件
  const paymentSetData = (code) => {
    const customerInfo = customerList.value?.find((item) => item.code === code);

    const paymentItem = receiptConditionList.value?.find(
      (item) => item.code === customerInfo?.paymentTermsCode
    );

    form.value.paymentTermsInfo.paymentTermsCode = customerInfo?.paymentTermsCode ?? '';
    form.value.paymentTermsInfo.paymentTermsDesc = customerInfo?.paymentTermsDesc;
    form.value.paymentTermsInfo.settlementMethod = paymentItem?.settlementMethod;
    form.value.paymentTermsInfo.settlementMethodDesc = paymentItem?.settlementMethodDesc;
    form.value.paymentTermsInfo.settlementPeriod = paymentItem?.settlementPeriod;
  };
  // 选择客户名称，自动填入其他信息
  const handleChange = (code) => {
    const customerInfo = customerList.value?.find((item) => item.code === code);
    Object.keys(customerInfo).forEach((key) => {
      if (!customerInfo[key]) {
        customerInfo[key] = '';
      }
    });
    form.value.receiveInfo.name = customerInfo?.name;
    form.value.receiveInfo.email = customerInfo?.recevicerEmail;
    form.value.receiveInfo.city = customerInfo?.recevicerCity;
    form.value.receiveInfo.province = customerInfo?.recevicerProvince;
    form.value.receiveInfo.address = customerInfo?.recevicerAddress;
    form.value.receiveInfo.phone = customerInfo?.recevicerPhone;
    form.value.receiveInfo.zipcode = customerInfo?.recevicerZipCode;
    form.value.receiveInfo.area = customerInfo?.recevicerArea;
    form.value.paymentTermsInfo.contractSubject = customerInfo?.contractSubject;
    form.value.receiveInfo.houseNumber = customerInfo?.recevicerDoorplate;
    form.value.receiveInfo.countryCode = customerInfo?.recevicerCountry;
    form.value.receiveInfo.customerSettlementInterval = customerInfo?.settlementInterval;
    form.value.receiveInfo.customerSettlementType = customerInfo?.settlementType;
    form.value.receiveInfo.customerType = customerInfo?.type;
    form.value.baseInfo.deliverType = customerInfo?.deliverType;
    form.value.baseInfo.orderSaleType = '';
    orderSaleTypeMap.value = customerInfo?.orderSaleType
      ? customerInfo?.orderSaleType?.map((item, index) => {
          return {
            value: item,
            label: customerInfo?.orderSaleTypeDesc[index],
          };
        })
      : [];
    if (orderSaleTypeMap.value?.length === 1) {
      form.value.baseInfo.orderSaleType = orderSaleTypeMap.value[0]?.value;
    }
    handleCountryChange(form.value.receiveInfo.countryCode);
    queryTaxRate();
    paymentSetData(code);
  };

  // 国家发生改变
  const handleCountryChange = (val) => {
    // form.value.itemInfoList.forEach((item: any) => {
    //   item.deliveryCode = '';
    //   item.warehouseCode = '';
    //   item.shippingCode = '';
    //   item.supplySku = '';
    //   item.num = 1;
    //   item.deliveryList = [];
    //   item.supplySkuList = [];
    //   item.warehouseList = [];
    //   item.shippingList = [];
    // });
    initCountrySelection(val);
    queryTaxRate();
    form.value.itemInfoList = [];
  };
  // 发货方式改变
  const handleDeliveryCodeChange = (val: string, currentRow: any, currentDeliveryList) => {
    const result = currentDeliveryList.find((item) => item.deliveryCode === val);
    currentRow.warehouseList = result ? cloneDeep(result.warehouseList) : [];
    // 清空
    currentRow.warehouseCode = '';
    currentRow.shippingCode = '';
    currentRow.shippingList = [];
    currentRow.supplySku = '';
    currentRow.supplySkuItemList = [];
    currentRow.inventory = 0;
  };
  // 仓库发生改变
  const handleWarehouseCodeChange = async (val: string, currentRow: any, currentWarehouseList) => {
    // console.log(val, currentRow, currentWarehouseList);
    const result = currentWarehouseList.find((item) => item.warehouseCode === val);
    currentRow.shippingList = result ? cloneDeep(result.shippingList) : [];
    currentRow.shippingCode =
      currentRow.shippingList.length > 0 ? currentRow.shippingList[0].value : '';
    // currentRow.shippingCode = '';
    currentRow.supplySku = '';
    const res: any = await productApi.luteosProductSkuQuerySupplySkuList({
      deliverType: currentRow.deliveryCode,
      skuCode: currentRow.skuCode,
      warehouseCode: val,
    });
    if (res) {
      currentRow.supplySkuItemList = res.supplySkuItemList;
      currentRow.supplySku = currentRow.supplySkuItemList[0]
        ? currentRow.supplySkuItemList[0].supplySku
        : '';
      currentRow.inventory = currentRow.supplySkuItemList[0]
        ? currentRow.supplySkuItemList[0].inventory
        : 0;
    }
    resetStatistics();
  };
  // 供应链SKU改变
  const handleSupplySkuChange = async (val: string, currentRow: any, currentSupplySkuList) => {
    const result = currentSupplySkuList.find((item) => item.supplySku === val);
    currentRow.inventory = result ? result.inventory : 0;
    resetStatistics();
  };
  // 移除产品信息
  const remove = (index: number) => {
    form.value.itemInfoList.splice(index, 1);
    resetStatistics();
  };

  // 复制产品信息
  const copyRow = (row, index) => {
    form.value.itemInfoList.splice(index + 1, 0, cloneDeep(row));
    resetStatistics();
    // form.value.itemInfoList.push(cloneDeep(row));
  };

  const handleAutoWarehouse = async () => {
    const ruleHit = await erpApi.luteosErpOrderWarehouseRuleHit({
      country: form.value.receiveInfo.countryCode,
      customerCode: form.value.receiveInfo.customerCode,
      deliveryCode: form.value.baseInfo.deliverType,
      customerSettlementInterval: form.value.receiveInfo.customerSettlementInterval,
      customerSettlementType: form.value.receiveInfo.customerSettlementType,
      customerType: form.value.receiveInfo.customerType,
      city: form.value.receiveInfo.city,
      address1: form.value.receiveInfo.address,
      address2: form.value.receiveInfo.address2,
      stockout: form.value.baseInfo.orderStatus === 506 ? 1 : 0,
      type: 1,
      source: form.value.baseInfo.source || 0,
    });
    if (ruleHit && ruleHit?.length > 0) {
      form.value.itemInfoList?.forEach((item) => {
        if (!item.deliveryCode && !item.warehouseCode && !item.shippingCode) {
          item.deliveryCode = ruleHit[0]?.deliveryCode;
          handleDeliveryCodeChange(item.deliveryCode, item, item.deliveryList);
          item.warehouseCode = ruleHit[0]?.warehouseCode;
          handleWarehouseCodeChange(item.warehouseCode, item, item.warehouseList);
          item.shippingCode = ruleHit[0]?.shippingCode;
        }
      });
    }
  };

  // 获取税率
  const rateInfo = ref<any>({ taxRate: 0 });
  const queryTaxRate = async () => {
    const res = await erpApi.luteosErpRateCfgChooseRateCfg({
      countryCode: form.value.receiveInfo.countryCode,
      customerCode: form.value.receiveInfo.customerCode,
      province: form.value.receiveInfo.province,
      city: form.value.receiveInfo.city,
      area: form.value.receiveInfo.area,
      deliverType: form.value.baseInfo.deliverType,
      orderSaleType: form.value.baseInfo.orderSaleType,
    });
    rateInfo.value = res;
  };

  const saveLoading = ref(false);
  const showError = async () => {
    if (errList.value.length > 0) {
      ElMessage.error(`以下商品没有设置箱规，请前往设置箱规！${errList.value.join(',')}`);
      return;
    }
    const receiveFormOk = await receiveFormRef.value
      ?.validate((valid) => {
        if (!valid) {
          infoFormRef.value?.validate().catch(() => false);
          tabClick({ paneName: 'reciever' });
        }
      })
      .catch(() => false);
    if (receiveFormOk) {
      if (form.value.itemInfoList.length === 0) {
        ElMessage.warning('请选择产品');
        tabClick({ paneName: 'product' });
      } else if (!checkItemnfoList()) {
        tabClick({ paneName: 'product' });
        formRef.value?.validate().catch(() => false);
        infoFormRef.value?.validate().catch(() => false);
      } else {
        formRef.value?.validate().catch(() => false);
        infoFormRef.value
          ?.validate((valid) => {
            if (!valid) {
              tabClick({ paneName: 'order' });
            }
          })
          .catch(() => false);
      }
    }
  };
  const save = async (isSubmit) => {
    // 新增存草稿
    if (isAdd.value && formInital === JSON.stringify(form.value)) {
      ElMessage.warning('未填写任何内容，无法存为草稿哦');
      return;
    }
    if (errList.value.length > 0) {
      ElMessage.error(`以下商品没有设置箱规，请前往设置箱规！${errList.value.join(',')}`);
      return;
    }
    const receiveFormOk = await receiveFormRef.value
      ?.validate((valid) => {
        if (!valid) {
          tabClick({ paneName: 'reciever' });
          infoFormRef.value?.validate().catch(() => false);
        }
      })
      .catch(() => false);
    if (receiveFormOk) {
      if (form.value.itemInfoList.length === 0) {
        ElMessage.warning('请选择产品');
        tabClick({ paneName: 'product' });
      } else if (!checkItemnfoList()) {
        tabClick({ paneName: 'product' });
        formRef.value?.validate().catch(() => false);
        infoFormRef.value?.validate().catch(() => false);
      } else {
        formRef.value?.validate().catch(() => false);
        infoFormRef.value
          ?.validate((valid) => {
            if (!valid) {
              tabClick({ paneName: 'order' });
            }
          })
          .catch(() => false);
      }
    } else {
      return;
    }
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      receiveFormRef.value?.validate().catch(() => false),
      infoFormRef.value?.validate().catch(() => false),
    ]);
    // return;
    if (valid) {
      if (!form.value.itemInfoList.length) {
        ElMessage.warning('请选择产品');
        tabClick({ paneName: 'product' });
      } else {
        const { projectCode } = route.query;
        if (projectCode) {
          form.value.baseInfo.projectCode = projectCode;
        }
        if (form.value.packingAttachmentStatus) {
          form.value.orderAttachmentList = fileList.value
            ?.map((item) => {
              return {
                fileUrl: item.ossKey,
                fileName: item.name,
              };
            })
            ?.concat(
              form.value.cartonFileList?.map((item) => {
                return {
                  attachmentType: 1, // 装箱附件
                  fileUrl: item.ossKey,
                  fileName: item.name,
                };
              }),
              form.value.orderFileList?.map((item) => {
                return {
                  attachmentType: 2, // 订单附件
                  fileUrl: item.ossKey,
                  fileName: item.name,
                };
              })
            );
        } else {
          form.value.orderAttachmentList = fileList.value?.map((item) => {
            return {
              fileUrl: item.ossKey,
              fileName: item.name,
            };
          });
        }
        saveLoading.value = true;
        if (isAudit.value) {
          await erpApi.luteosErpOrderAuthAndUpdate(form.value).finally(() => {
            saveLoading.value = false;
          });
        } else if (isEdit.value) {
          await erpApi
            .luteosErpOrderUpdate({
              ...form.value,
              submit: isSubmit,
            } as any)
            .finally(() => {
              saveLoading.value = false;
            });
        } else if (isAdd.value) {
          if (isSubmit) {
            await erpApi.luteosErpOrderSave(form.value as any).finally(() => {
              saveLoading.value = false;
            });
          } else {
            // console.log('新增 存草稿');
            await erpApi.luteosErpOrderSaveDraft(form.value as any).finally(() => {
              saveLoading.value = false;
            });
          }
        }
        // await (isAudit.value
        //   ? erpApi.luteosErpOrderAuthAndUpdate(form.value)
        //   : isEdit.value
        //   ? erpApi.luteosErpOrderUpdate({
        //       ...form.value,
        //       submit: isSubmit,
        //     })
        //   : erpApi.luteosErpOrderSave(form.value)
        // ).finally(() => {
        //   saveLoading.value = false;
        // });
        if (isAdd.value) {
          ElMessage.success('新增订单成功');
          // const code = 'CO250428443182';
          // const msg = `新增订单成功，订单号【${code}】`;
          // CustomMessage.success(msg, () => {
          //   console.log('去详情');
          // });
        } else {
          ElMessage.success('操作成功');
        }
        closeTabAndRefresh('B2BOrder');
        goBackOrder();
      }
    }
  };
  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };
  const goBackOrder = () => {
    router.push({
      name: 'B2BOrder',
    });
  };

  const handleCurrencyChange = async () => {
    const res = await erpApi.luteosErpQuotationPriceGetSuggestPrice2({
      currencyCode: form.value.baseInfo.currencyCode,
      customerCode: form.value.receiveInfo.customerCode,
      skuCodeList: form.value.itemInfoList.map((item) => item.skuCode),
    });
    if (res) {
      form.value.itemInfoList.forEach((item) => {
        item.suggestPrice = res[item.skuCode].suggestPrice;
        item.postalPrice = res[item.skuCode].postalPrice;
      });
    }
  };

  const handleUnitCodeChange = () => {
    if (unitCode.value === 1)
      checkCartonInfo(
        form.value.itemInfoList?.map((item) => item.skuCode),
        true
      );
    else errList.value = [];
    form.value.itemInfoList.forEach((item) => {
      item.unitCode = unitCode.value;
    });
  };

  const handleQtyChange = (row) => {
    console.log(row);
    row.num = row.qty ? row.cartonQty * row.qty : '';
  };

  // 合计 统计
  const getSummaries = (param) => {
    const { columns, data } = param;
    const sums: string[] = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      if (column.label === '单位') {
        sums[index] = unitCode.value === 0 ? '件' : '箱';
        return;
      }
      const values = data.map((item) => Number(item[column.property]));
      if (
        ['num', 'cartonQty'].includes(column.property) &&
        !values.every((value) => Number.isNaN(value))
      ) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          }
          return prev;
        }, 0)}`;
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };

  const cancel = async () => {
    // const confirm = await swal.confirm({ text: '确定取消吗？', title: '退出确认' });
    // const confirm = await swal.confirm('确定取消吗？');
    // if (confirm) {
    //   goBackOrder();
    // }
    if (formInital === JSON.stringify(form.value)) {
      goBackOrder();
    } else {
      cancellRef.value?.open();
    }
  };
</script>

<style scoped lang="scss">
  :global(.el-form-item__content) {
    line-height: 232px !important;
  }
  :global(.addmsg) {
    color: #1f1f1f !important;
    font-size: 14px;
    line-height: 22px;
  }
  :global(.link) {
    color: #02b96b !important;
    font-size: 14px;
    line-height: 22px;
  }
  .bg-wrap {
    padding: 0 16px;
    background: #f7f7f7;
    // background: red;
    .header-wrap {
      padding: 0 0 16px 0;
      background: #f7f7f7;

      :deep(.audit-wrap) {
        background-color: transparent;
        padding: 0;

        .audit-card {
          background-color: white !important;
        }
      }
    }
    .bdr {
      border-radius: 10px !important;
      overflow: hidden;
      height: 100%;
    }
    .aewrap {
      padding: 0 4px;
      background: #f7f7f7;

      .wrap1 {
        .el-button:hover {
          .icon-shangchuan1 {
            color: #02b96b;
          }
        }

        .el-button.is-disabled {
          .icon-shangchuan1 {
            color: inherit;
          }

          &:hover {
            .icon-shangchuan1 {
              color: inherit;
            }
          }
        }

        .icon-shangchuan1 {
          color: #1f1f1f;

          &:hover {
            color: #02b96b;
          }
        }

        .uploadtip {
          // margin-top: 6px;
          color: #999999;
          font-size: 12px;
          line-height: 20px;
          // margin-bottom: 6px;
        }

        :deep(.upload-container) {
          margin-bottom: 2px;
        }
      }

      .mb2 {
        margin-bottom: 2px;
      }

      .pb6 {
        padding-bottom: 6px !important;
      }

      .mb6 {
        margin-bottom: 6px !important;
      }

      .h116 {
        min-height: 116px;
      }

      .linebg {
        height: 6px;
        background: #f5f5f5;
      }

      .total {
        text-align: right;
        color: #000000;
        font-size: 13px;
        line-height: 22px;
        padding: 16px 0 26px;
      }

      .tablewrap {
        border-radius: 10px 10px 0px 0px !important;
        // overflow: hidden;
        .price {
          .price-info {
            font-size: 12px;
            line-height: 20px;
            width: 100%;
            margin-top: 2px;

            &:first-child {
              margin-top: 4px;
            }

            .item-label {
              flex-shrink: 0;
              color: #999999;
            }
          }
        }
        .textStyle {
          font-size: 12px !important;
          line-height: 20px;
          width: 100%;
          margin-top: 4px;
        }
        .timeicon {
          height: 20px;
          line-height: 20px;
          margin-top: 2px;
        }

        .product-item {
          display: flex;
          // padding-top: 12px;
          gap: 10px;

          .left {
            display: flex;
            gap: 10px;
            // position: relative;
            .leftimg {
              position: relative;
              margin-top: 2px;
            }
            .product-img {
              width: 36px;
              height: 36px;
              border-radius: 8px;
              position: relative;
            }
            .outStock {
              width: 16px;
              height: 36px;
              position: absolute;
              top: -12px;
              right: -2px;
            }

            .product-title {
              flex: 1 0;
            }

            .product-sku {
              margin-top: 6px;

              .item-label {
                flex-shrink: 0;
                color: #999999;
              }
            }
          }
        }
      }

      .split-footer {
        height: 54px;
      }
    }
  }
  .fixed {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 2000;
  }
  .footer {
    padding: 12px 0;
    background: #fff;
    box-shadow: 0px -3px 16px 0px rgba(0, 0, 0, 0.04);
    font-size: 13px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    // line-height: 32px;
    align-items: center;
    height: 56px;

    .tip {
      color: #666666;
    }

    .number {
      color: #f53f3f;
      padding: 0 5px;
    }

    .look {
      color: #02b96b;
      margin-right: 20px;
      cursor: pointer;
    }
    .noerror {
      margin-right: 20px;
      display: flex;
      align-items: center;
      .icon-chenggongzhuangtai {
        color: #02b96b;
        font-size: 20px;
        margin-right: 4px;
      }
    }

    :deep(.el-button) {
      span {
        font-size: 13px !important;
      }
    }
  }

  :deep(.el-table) {
    // border-bottom: solid 1px #f5f5f5;
    .el-input {
      height: 24px;
      .el-input__wrapper {
        height: 24px;
        line-height: 24px;
      }
      .el-input__inner {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
      }
    }
    .inp-number .number-box .el-input-number.is-without-controls .el-input__inner {
      padding: 0 8px;
    }
    .el-select {
      min-height: 24px;
      height: 24px;
      width: 100%;
      .el-select__wrapper {
        min-height: 24px;
        height: 24px;
        line-height: 24px;
        padding: 5px 8px;
      }
      .el-select__placeholder {
        font-size: 12px;
      }
    }

    .el-form-item {
      margin: 0 !important;

      .el-form-item__content {
        // column-gap: 0;
        .el-select {
          width: 100%;
        }
      }
    }

    .vtop {
      vertical-align: top;
    }

    .el-table__cell > .cell {
      line-height: 20px !important;
      padding-left: 12px !important;

      .el-select {
        width: 100%;
      }
    }

    .hdcell {
      padding: 0 !important;
      color: #1f1f1f;
      font-size: 13px;
      font-family: 'PingFang SC Medium';
      line-height: 22px;
      height: 40px !important;
      background-color: #f5f5f5 !important;
      vertical-align: middle;
    }

    .rowcell {
      height: 112px !important;
      // &.hover-row > td.el-table__cell {
      //   background-color: transparent !important;
      // }
    }

    .platform-rowcell {
      height: 42px;
    }

    th {
      // padding: 0 !important;
      // padding-right: 4px !important;
    }

    td {
      padding: 0 !important;
      margin-left: 12px !important;
      padding-top: 10px !important;
      vertical-align: top !important;
    }
  }

  :deep(.unitSelect .el-select__wrapper) {
    min-height: 24px !important;
    padding: 1px 8px;
  }
  .add-title1 {
    color: #1f1f1f;
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    line-height: 24px;
    // padding: 16px 20px 16px;
    background-color: #f7f7f7;
    // border-top-left-radius: 10px;
    // border-top-right-radius: 10px;
    .inner-white {
      background-color: white;
      padding: 16px 20px 16px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      height: 100%;
      overflow: hidden;
    }
  }
  .sticky,
  .sticky2 {
    position: sticky;
    top: 0px;
    z-index: 1000;
  }
  .sticky2 {
    top: 56px;
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

  .tabwrap {
    padding: 0 20px;
    overflow: auto;
    background-color: white;
  }

  .fontcolor {
    font-size: 12px;
    color: #ff9f22 !important;

    i {
      margin-right: 4px;
    }
  }
  .add-title2,
  .add-title3 {
    color: #1f1f1f;
    font-size: 14px;
    font-family: 'PingFang SC Medium';
    line-height: 22px;
    padding: 26px 0 18px 9px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 31px;
      left: 0;
      width: 3px;
      height: 12px;
      background: #02b96b;
      border-radius: 15px;
    }
    display: flex;
    .text {
      flex: 1;
    }
    .el-button + .el-button {
      margin-left: 8px !important;
    }
    .action {
      font-weight: normal;
      font-size: 12px;
      line-height: 22px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .info {
        margin-left: 6px;
        font-size: 12px;
      }

      span {
        font-size: 12px !important;
      }
    }
  }
  .add-title2 {
    padding-top: 23px;
    &::before {
      top: 28px;
    }
  }
  :deep(.el-radio-group) {
    padding: 4px 0 !important;
    height: 30px !important;
    margin-bottom: 2px;

    .el-radio {
      height: 22px !important;
      line-height: 22px;
      margin-right: 19px;
    }
  }

  :deep(.el-button) {
    span {
      font-size: 12px !important;
    }
  }

  :deep(.el-tabs) {
    padding: 0 20px 3px;
    padding-left: 20px !important;
    .el-tabs__active-bar {
      color: #02b96b !important;
      height: 2px;
    }

    .el-tabs__header {
      background-color: white;
      padding-left: 0 !important;
    }

    .el-tabs__item {
      padding: 9px 15px;
      line-height: 40px;
      height: 41px;
      font-size: 14px;
      color: #666666 !important;
      &:hover {
        color: #02b96b !important;
      }

      &.is-active {
        font-family: 'PingFang SC Medium';
        color: #02b96b !important;
      }
    }

    .el-tabs__nav-wrap {
      &::after {
        background-color: #f5f5f5 !important;
        height: 1px !important;
      }
    }
  }

  :deep(.el-form) {
    .el-form-item--label-top .el-form-item__label {
      margin-bottom: 6px !important;
      line-height: 22px;
    }

    .el-form-item {
      margin-bottom: 26px !important;
      .el-form-item__content {
        height: auto !important;
      }
    }

    .el-form-item.asterisk-left:not(.is-required) .el-form-item__label::before {
      content: '' !important;
      margin-left: 0;
    }
  }

  .table-form-item {
    // margin-top: 1.75rem;
    :deep(.el-form-item__content) {
      margin: 0 !important;
      // display: flex;
      // column-gap: 10px;
    }
  }
  :deep(.el-textarea__inner) {
    resize: none !important;
  }
  :deep(.packing-upload) {
    display: flex;
    align-items: start;

    .el-upload {
      margin-top: 5px;
    }

    .el-upload-list {
      margin-top: 0;
    }
  }
</style>

<style lang="scss">
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 24px white inset !important;
    -webkit-text-fill-color: #1f1f1f !important;
    // border: 1px solid #dcdfe6 !important;
    height: 30px !important;
    border: none !important;
  }
  .error-popover {
    border-radius: 10px;
    background: #fff;
    // height: 208px;
    width: 230px;
    // background-color: lightblue;
    padding: 16px;
    .title {
      font-family: 'PingFang SC Medium';
      font-size: 13px;
      font-weight: normal;
      line-height: 22px;
      padding-bottom: 16px;
    }
    .type {
      display: flex;
      padding-bottom: 10px;
      .left {
        color: #1f1f1f;
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
      .right {
        flex: 1 0;
        color: #999999;
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        text-align: right;
        .red {
          color: #f53f3f;
        }
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
</style>
