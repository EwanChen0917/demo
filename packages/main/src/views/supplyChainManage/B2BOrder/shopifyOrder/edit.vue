<template>
  <div class="bg-wrap" v-loading="detailLoading">
    <div class="aewrap" ref="aewrapRef">
      <div class="add-title1">
        <div class="inner-white">编辑订单</div>
      </div>
      <!-- <div class="step-list" v-if="form.baseInfo?.statusInfoList?.length">
        <el-steps :space="200" :active="1" finish-status="finish" align-center>
          <el-step
            v-for="item in form.baseInfo.statusInfoList"
            :key="item.sort"
            :status="item.nodeStatus"
            :icon="item.nodeStatus == 'finish' ? 'Check' : ''"
            :title="item.statusDesc"
            :description="item.handleTime"
          />
        </el-steps>
      </div> -->
      <el-tabs v-model="activated" class="sticky" tab-position="top" @tab-click="tabClick">
        <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label" :name="item.id" />
      </el-tabs>
      <div class="tabwrap">
        <el-form :model="formInital" ref="formRef" :rules="rules" label-width="83px">
          <div
            v-for="(list, title) in allInfoMap"
            :key="title"
            class="wrap1"
            :class="{ nobd: title == '产品信息' }"
            :id="titleIdMap[title]"
          >
            <template v-if="!['产品信息', '收件人信息'].includes(title)">
              <div class="detail-title3" id="b1ase">
                {{ title }}
                <!-- <el-button
                  size="small"
                  type="primary"
                  style="margin-left: 18px; position: relative; top: -5px"
                  v-if="canEdit && title == '物流信息'"
                  @click="hangdelSetShipping"
                >
                  设置仓库物流
                </el-button> -->
              </div>
              <el-row v-if="!canEdit || title == '金额信息'">
                <el-col
                  :span="item.label == '买家留言' || title == '物流信息' ? 12 : 6"
                  class="flexbox"
                  v-for="item in list"
                  :key="item.prop"
                >
                  <ItemLabel
                    v-if="typeof item.prop == 'string'"
                    :fontSize="13"
                    :label="item.label"
                    :value="unitValue(form[item.prevParent]?.[item.prop], item.showUnit)"
                  />
                  <ItemLabel
                    v-else
                    :fontSize="13"
                    :label="item.label"
                    :value="
                      groupValue(
                        form[item.prevParent]?.[item.prop[0]],
                        form[item.prevParent]?.[item.prop[1]],
                        item.connector
                      )
                    "
                  />
                </el-col>
              </el-row>
              <el-row :gutter="20" v-else-if="title == '基础信息'">
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="平台单号" prop="refNo">
                    <el-input v-model="form.baseInfo.refNo" :maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="平台" prop="channel">
                    <ProductChannelSelect
                      v-model="form.baseInfo.channel"
                      placeholder="请选择"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="店铺" prop="shopAccount">
                    <el-select
                      v-model="form.baseInfo.shopAccount"
                      placeholder="请选择"
                      filterable
                      disabled
                    >
                      <el-option
                        v-for="item in shopMap"
                        :value="item.shopCode"
                        :label="item.shopAccount"
                        :key="item.shopCode"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="站点" prop="site">
                    <ProductSiteSelect v-model="form.baseInfo.site" filterable disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="订购时间" prop="site">
                    <el-date-picker
                      type="datetime"
                      placeholder="请选择"
                      v-model="form.baseInfo.orderingTime"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="付款时间" prop="site">
                    <el-date-picker
                      type="datetime"
                      placeholder="请选择"
                      v-model="form.baseInfo.payTime"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-else-if="title == '物流信息'">
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="发货仓库" prop="warehouseCode">
                    <!-- <el-input v-model="form.baseInfo.warehouseCode" :maxlength="50" /> -->
                    <OmsWarehouseSelect
                      v-model="form.baseInfo.warehouseCode"
                      @change="form.baseInfo.shippingCode = ''"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="物流渠道" prop="shippingDesc">
                    <OmsShippingSelect
                      v-model="form.baseInfo.shippingCode"
                      placeholder="请先选择仓库"
                      :warehouse-code="form.baseInfo.warehouseCode"
                      teleported
                      :disabled="!form.baseInfo.warehouseCode"
                      @sp-change="
                        (val, spName) => {
                          // console.log(111111, val, val2);
                          form.baseInfo.spName = spName;
                          form.baseInfo.spCode = val;
                        }
                      "
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="物流商" prop="">
                    {{ form.baseInfo.spName }}
                  </el-form-item>
                </el-col>
                <!-- <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="运单号" prop="site">
                    <el-input v-model="form.baseInfo.waybillNo" :maxlength="50" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="跟踪号" prop="site">
                    <el-input v-model="form.baseInfo.trackOrderCode" :maxlength="50" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="6" :sm="8" :offset="0">
                  <el-form-item label="出库单号" prop="site">
                    <el-input v-model="form.baseInfo.outboundCode" :maxlength="50" disabled />
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row :gutter="20" v-else>
                <el-col
                  :md="item.prop == 'address' || item.prop == 'address2' ? 12 : 6"
                  :sm="8"
                  :offset="0"
                  v-for="item in list"
                  :key="item.prop"
                >
                  <el-form-item :label="item.label" :prop="item.prop">
                    <el-date-picker
                      v-if="item.type == 'datetime'"
                      type="datetime"
                      placeholder="请选择"
                      v-model="form[item.prevParent][item.prop]"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                    ></el-date-picker>
                    <el-input
                      v-else
                      v-model="form[item.prevParent][item.prop]"
                      :maxlength="item.limit"
                      :show-word-limit="!!item.limit"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-if="title == '产品信息'">
              <div class="detail-title3" id="b1ase">
                <template v-if="!canEdit">
                  {{ title }}
                  <span
                    v-if="form.itemInfoList.length"
                    style="color: var(--el-color-primary); margin-left: 5px"
                  >
                    {{ form.itemInfoList.length }}
                  </span>
                </template>
                <template v-else>
                  <div class="text skuLineheight">
                    {{ title }}
                    <span
                      v-if="form.itemInfoList.length"
                      style="color: var(--el-color-primary); margin-left: 5px"
                    >
                      {{ form.itemInfoList.length }}
                    </span>
                  </div>
                  <span class="action skuLineheight">
                    <el-button type="primary" @click="handleBindGoods" size="small">
                      添加产品
                    </el-button>
                  </span>
                </template>
              </div>

              <template v-if="!canEdit">
                <div class="tablewrap" v-if="form.itemInfoList.length">
                  <div
                    v-for="(item, index) in form.itemInfoList"
                    :key="item.id"
                    class="product-item"
                  >
                    <div class="item-base">
                      <div class="product-img">
                        <KeenImagePreview
                          v-if="item?.productImageUrl"
                          :src="item?.productImageUrl"
                          :srcList="[item?.productImageUrl]"
                          :size="56"
                        />
                        <img v-else src="@/assets/images/system/empty.png" alt="" />
                        <img
                          v-if="item?.gift === 1"
                          class="giftStock"
                          :src="getImg('giftStock')"
                          alt=""
                        />
                      </div>
                      <div class="item-area">
                        <OverflowTooltip :content="item?.productName" :line="2" :font-size="12" />
                        <div class="item-area">
                          <ItemLabel :fontSize="13" label="SKU" :value="item.skuCode ?? ''" />
                          <ItemLabel :fontSize="13" label="MSKU" :value="item.sellerSku ?? ''" />
                          <ItemLabel
                            :fontSize="13"
                            label="三方仓SKU"
                            :value="item.supplySku ?? ''"
                          />
                        </div>
                        <div class="item-remark" v-if="index == form.itemInfoList.length - 1">
                          <span class="item-label">备注：</span>
                          <OverflowTooltip :content="form.orderRemarkList?.[0]?.remark" :line="2" />
                          <i
                            class="iconfont icon-bianji"
                            @click="
                              (e) => {
                                handleRemark(e, form.orderRemarkList?.[0], '订单备注');
                              }
                            "
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div class="item-area item-detail">
                      <ItemLabel :fontSize="13" label="itemID" :value="item.itemId ?? ''" />
                      <ItemLabel :fontSize="13" label="预估重量" :value="item.weight ?? ''" />
                      <ItemLabel :fontSize="13" label="预估体积" :value="item.volume ?? ''" />
                      <ItemLabel
                        :fontSize="13"
                        label="客选物流"
                        :value="item.buyerChooseLogistics ?? ''"
                      />
                    </div>
                    <div class="item-area item-detail">
                      <ItemLabel :fontSize="13" label="数量" :value="item.num ?? ''" />
                    </div>
                    <div class="item-area item-detail">
                      <ItemLabel
                        :fontSize="13"
                        label="商品单价（不含税）"
                        :value="unitValue(item.price, true)"
                      />
                      <ItemLabel
                        :fontSize="13"
                        label="商品售价（不含税）"
                        :value="unitValue(item.totalPrice, true)"
                      />
                      <ItemLabel
                        :fontSize="13"
                        label="商品折扣"
                        :value="unitValue(item.discountAmount, true)"
                      />
                      <ItemLabel :fontSize="13" label="商品积分" :value="item.integral ?? ''" />
                      <ItemLabel
                        :fontSize="13"
                        label="商品税金"
                        :value="unitValue(item.taxes, true)"
                      />
                      <ItemLabel
                        :fontSize="13"
                        label="商品买家支付运费"
                        :value="unitValue(item.salesFreightAmount, true)"
                      />
                      <ItemLabel
                        :fontSize="13"
                        label="商品其他费用"
                        :value="unitValue(item.otherAmount, true)"
                      />
                    </div>
                  </div>
                  <!-- 标签 -->
                  <div class="product-tag">
                    <div class="tag">
                      <div class="tag-content">
                        标签（{{ form.baseInfo.orderLabelList?.length ?? 0 }}）：
                        <span>
                          <ShopifyLabelList :labelList="form.baseInfo.orderLabelList" />
                          <i class="iconfont icon-bianji" @click="handleClickLabelMake"></i>
                        </span>
                      </div>
                    </div>
                    <div class="remark">
                      客服备注：
                      <div class="tag-info customer-remark">
                        <OverflowTooltip :content="form.baseInfo.customRemark" :line="2" />
                        <i
                          class="iconfont icon-bianji"
                          @click="
                            (e) => {
                              handleRemark(e, form.baseInfo, '客服备注');
                            }
                          "
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="empty">
                  <div class="flex-align flex-center">
                    <EmptyAnimation name="emptyInfo" :width="128" :height="128" :loop="true" />
                  </div>
                  <div class="text">暂无数据</div>
                </div>
              </template>
              <template v-else>
                <el-form :model="form" ref="formRef2" :rules="rules" label-width="83px">
                  <div class="tablewrap1">
                    <!-- :row-style="tableRowStyle" -->
                    <el-table
                      :class="'product-table-header-normal'"
                      :data="form.itemInfoList"
                      :show-summary="false"
                      :summary-method="getSummaries"
                      row-class-name="rowcell"
                      header-cell-class-name="hdcell"
                      :border="true"
                      :height="form?.itemInfoList?.length ? 'auto' : 430"
                      ref="productFormRef"
                    >
                      <!-- <el-table-column
                      type="index"
                      label="序号"
                      width="60"
                      align="center"
                      :index="(index) => index + 1"
                    /> -->
                      <el-table-column
                        prop="productName"
                        class-name="vtop"
                        min-width="240px"
                        width="308px"
                        label="产品名称"
                      >
                        <template #default="{ row, $index }">
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
                                <div class="product-sku2">
                                  <span class="item-label">供应链SKU：</span>
                                  {{ row?.supplySku }}
                                </div>
                                <div class="product-sku2">
                                  <span class="item-label">重量：</span>
                                  {{ row?.weight ? row.weight * 1000 + 'g' : '-' }}
                                </div>
                                <div class="product-sku2">
                                  <span class="item-label">体积：</span>
                                  {{ row?.volume ? row.volume + 'cm³' : '-' }}
                                </div>
                                <div class="product-sku2" style="margin-bottom: 8px">
                                  <span class="item-label">MSKU：</span>
                                  {{ row?.sellerSku ?? '-' }}
                                  <el-button
                                    link
                                    type="primary"
                                    @click="handleMskuChange(row, row?.sellerSku)"
                                    style="margin-left: auto; margin-right: 8px"
                                  >
                                    选择
                                  </el-button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品单价(不含税)" min-width="152">
                        <template #header>
                          <span>商品单价(不含税)</span>
                          <!-- <BatchSetPopover
                          :form-data="form"
                          column-key="price"
                          key="price"
                          @success="handleColumnChange"
                          @clear="handleColumnChange"
                        /> -->
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].price`"
                            :rules="[
                              {
                                required: true,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              // {
                              //   pattern: priceRuleFixed4,
                              //   message: '请输入',
                              //   trigger: ['blur', 'change'],
                              // },
                            ]"
                          >
                            <el-input
                              placeholder="请输入"
                              v-model="row.price"
                              @change="resetStatistics(row)"
                            />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="数量" min-width="190">
                        <template #header>
                          <span>数量</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].num`"
                            :rules="[
                              { required: true, type: 'number', min: 1, message: '请输入数量' },
                            ]"
                          >
                            <Num
                              v-model="row.num"
                              :precision="0"
                              :min="1"
                              :max="99999"
                              @change="resetStatistics(row)"
                            />
                            <div class="price">
                              <div class="price-info">
                                <span class="item-label">预估总重量:</span>
                                {{
                                  row?.totalWeight ? (row?.totalWeight * 1000).toFixed(2) + 'g' : ''
                                }}
                              </div>
                              <div class="price-info">
                                <span class="item-label">预估总体积:</span>
                                {{ row?.totalVolume ? row.totalVolume?.toFixed(2) + 'cm³' : '' }}
                              </div>
                            </div>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品售价(不含税)" min-width="152">
                        <template #header>
                          <span>商品售价(不含税)</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].totalPrice`"
                            :rules="[
                              {
                                required: true,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              {
                                pattern: priceRuleFixed4,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                            ]"
                          >
                            <!-- <el-input placeholder="请输入" v-model="row.totalPrice" /> -->
                            {{ row.totalPrice }}
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品折扣" min-width="152">
                        <template #header>
                          <span>商品折扣</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].discountAmount`"
                            :rules="[
                              {
                                required: false,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              {
                                pattern: priceRuleFixed4,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                            ]"
                          >
                            <el-input placeholder="请输入" v-model="row.discountAmount" />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品积分" min-width="152">
                        <template #header>
                          <span>商品积分</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].integral`"
                            :rules="[
                              {
                                required: false,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              {
                                pattern: priceRuleFixed4,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                            ]"
                          >
                            <el-input placeholder="请输入" v-model="row.integral" />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品税金" min-width="152">
                        <template #header>
                          <span>商品税金</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].taxes`"
                            :rules="[
                              {
                                required: false,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              {
                                pattern: priceRuleFixed4,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                            ]"
                          >
                            <el-input placeholder="请输入" v-model="row.taxes" />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品买家支付运费" min-width="152">
                        <template #header>
                          <span>商品买家支付运费</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].salesFreightAmount`"
                            :rules="[
                              {
                                required: false,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              {
                                pattern: priceRuleFixed4,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                            ]"
                          >
                            <el-input placeholder="请输入" v-model="row.salesFreightAmount" />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品买家支付运费" min-width="152">
                        <template #header>
                          <span>商品其他费用</span>
                        </template>
                        <template #default="{ row, $index }">
                          <el-form-item
                            class="table-form-item"
                            :prop="`itemInfoList[${$index}].otherAmount`"
                            :rules="[
                              {
                                required: false,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                              {
                                pattern: priceRuleFixed4,
                                message: '请输入',
                                trigger: ['blur', 'change'],
                              },
                            ]"
                          >
                            <el-input placeholder="请输入" v-model="row.otherAmount" />
                          </el-form-item>
                        </template>
                      </el-table-column>

                      <el-table-column label="操作" fixed="right" width="60px">
                        <template #default="{ row, $index }">
                          <div>
                            <!-- <el-link
                        type="primary"
                        style="font-size: 12px"
                        @click="copyRow(row, $index)"
                        :underline="false"
                        v-if="!isSpsedi"
                      >
                        复制
                      </el-link> -->
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
                          <EmptyAnimation
                            name="listEmpty"
                            :width="128"
                            :height="128"
                            :loop="true"
                          />
                        </div>
                        <div class="text">请选择产品</div>
                      </template>
                    </el-table>
                  </div>
                </el-form>
              </template>
            </template>
            <template v-if="title == '收件人信息'">
              <div class="detail-title3" id="b1ase">{{ title }}</div>
              <el-row :gutter="20">
                <el-col
                  :md="item.prop == 'address' || item.prop == 'address2' ? 12 : 6"
                  :sm="8"
                  :offset="0"
                  v-for="item in list"
                  :key="item.prop"
                >
                  <el-form-item :label="item.label" :prop="item.prop">
                    <template #label>
                      <span class="tips-label">
                        {{ item.label }}
                        <el-tooltip
                          :content="item.tips"
                          placement="top"
                          v-if="item.type === 'tips'"
                        >
                          <i class="iconfont icon-xianxingtubiaoxunwen"></i>
                        </el-tooltip>
                      </span>
                    </template>
                    <el-select
                      v-if="item.type == 'select'"
                      placeholder="请选择"
                      v-model="formInital[item.prop]"
                      filterable
                      @change="getProductInfo"
                    >
                      <el-option
                        v-for="opt in countryOptions"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                      />
                    </el-select>

                    <el-input
                      v-else
                      v-model="formInital[item.prop]"
                      :maxlength="item.limit"
                      :show-word-limit="!!item.limit"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </div>
        </el-form>
      </div>
      <div class="footer"></div>
      <div class="d-flex justify-content-center footer fixed">
        <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
        <el-button :disabled="saveLoading" @click="goBackOrder(false)">取消</el-button>
      </div>
    </div>
    <OrderLabelDialog ref="selfFulTagDialogRef" @confirm="handleLabelConfirm" />
    <BindSku
      v-if="bindGoodsVisible"
      :visible="bindGoodsVisible"
      @close="handleBindGoodsClose"
      :selected-rows="form.itemInfoList"
      :selected-row="form.itemInfoList[0]"
      confirm-text="确认"
      :hidesearch="true"
      type="sku"
    />
    <MskuProductDialog
      :searchErpQuotation="true"
      v-if="productDialogVisible"
      :visible="productDialogVisible"
      @close="handleProductDialogClose"
      :selected-rows="selectArr"
      confirm-text="确认"
      :msku="msku"
      :row="baseInfo"
      :warehousecode="form.warehouseCode"
      title="选择MSKU"
      type="supplierSku"
    />
    <div class="remark-popover-edit">
      <header class="header">{{ remarkName }}</header>
      <el-input v-model="customRemark" type="textarea" :rows="6" />
      <footer class="footer">
        <el-button v-if="customRemark" size="small" class="left" @click.stop="customRemark = ''">
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
  </div>
</template>

<script setup lang="ts" name="shopifyOrderEdit">
  import Num from '@/components/NumberInput/index.vue';
  import { ElMessage, FormInstance, ElLoading } from 'element-plus';
  import { dataApi, omsApi, erpApim, shopApi } from '@/api';
  import { useRouter, useRoute } from 'vue-router';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import ShopifyLabelList from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/shopifyLabelList.vue';
  import OrderLabelDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/orderLabelDialog.vue';
  import OmsShippingSelect from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/omsShippingSelectUnique2.vue';
  // import BindSku from '@/views/goodscenter/goodsmanage/skurelation/components/bindSku.vue';
  import BindSku from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/bindSku.vue';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import MskuProductDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/mskuProductDialog.vue';

  import { useTabs } from '@/hooks/tabs';

  const { closeCurrentTab } = useTabs();
  const router = useRouter();
  const route = useRoute();

  const detailLoading = ref(false);
  const saveLoading = ref(false);

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

  const remarkName = ref('');

  const groupValue = computed(() => (value1, value2, connector) => {
    if (value1 && value2 && connector != '()') return `${value1}${connector}${value2}`;
    if (value1 && value2 && connector == '()') return `${value1}（${value2}）`;
    if (value1 && !value2) return value1;
    if (!value1 && value2) return value2;
    return '';
  });

  const unitValue = computed(() => (value, showUnit) => {
    if (value == 0) return `${value}`;
    if (value && showUnit) return `${value}${form.value.baseInfo.currencyCode}`;
    if (value && !showUnit) return value;
    return '';
  });

  const activated = ref('base');
  const showDetail = ref(false);
  const erpCode = ref('');
  const canEdit = computed(() => {
    return route.query?.replace;
  });
  // console.log(canEdit.value);
  // 获取店铺
  const shopMap: any = ref([]);
  const queryShop = async () => {
    const res = await shopApi.luteosShopQueryShopCommonList({
      errorStatus: '1',
      pageNum: 1,
      pageSize: 100000,
    });
    // console.log('获取店铺', res);
    shopMap.value = res.shopListDetailResps || [];
  };
  queryShop();

  const resetStatistics = (row?) => {
    // console.log('resetStatistics --------', row);
    if (row?.price && row?.num) {
      row.totalPrice = row.price * row.num;
    }
    if (row?.weight && row?.num) {
      row.totalWeight = row.weight * row.num;
    }
    if (row?.volume && row?.num) {
      row.totalVolume = row.volume * row.num;
    }
    // statistics.value = {};
    // form.value.itemInfoList.forEach((item, index) => {
    //   if (item.warehouseCode && item.supplySku) {
    //     if (!statistics.value[`${item.warehouseCode}-${item.supplySku}`]) {
    //       statistics.value[`${item.warehouseCode}-${item.supplySku}`] = {
    //         num: item.num || 0,
    //         sameWith: [index + 1],
    //       };
    //     } else {
    //       statistics.value[`${item.warehouseCode}-${item.supplySku}`].num =
    //         statistics.value[`${item.warehouseCode}-${item.supplySku}`].num + item.num || 0;
    //       statistics.value[`${item.warehouseCode}-${item.supplySku}`].sameWith?.push(index + 1);
    //     }
    //   }
    // });
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
  // 移除产品信息
  const remove = (index: number) => {
    form.value.itemInfoList.splice(index, 1);
    resetStatistics();
  };

  // 添加产品
  const productDialogVisible = ref(false);
  const msku = ref();
  const mskuItem = ref();
  const baseInfo = ref();
  const handleMskuChange = async (item?, mskuVal?) => {
    console.log(item, 'item', form.value);
    mskuItem.value = item;
    baseInfo.value = form.value?.baseInfo;
    if (msku) {
      msku.value = item.supplySku;
    }
    productDialogVisible.value = true;
  };
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    // console.log(list);
    if (selected) {
      productDialogVisible.value = false;
      // mskuItem.value.productImageUrl = list[0]?.productImageUrl;
      // mskuItem.value.productName = list[0]?.productName;
      console.log('更换msku 换值', list[0]);

      mskuItem.value.sellerSku = list[0]?.saleSkuCode;
      // mskuItem.value.asin = list[0]?.asin;
      // mskuItem.value.msku = list[0]?.sellerSku;
      // mskuItem.value.quantity = list[0]?.stockQuantity;
      // selectArr.value = [mskuItem.value];
    } else {
      productDialogVisible.value = false;
    }
  };
  // const handleAddProduct = () => {
  //   productDialogVisible.value = true;
  // };

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  }; // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, list) => {
    console.log('🚀 ~ 选择商品后:', list);
    if (reload) {
      const oldList1 = JSON.parse(JSON.stringify(form.value.itemInfoList));
      // console.log(oldList1, 'oldList1');
      // val.forEach((item) => {
      //   const same = oldList.find((old) => {
      //     if (
      //       route.fullPath?.includes('/skurelationnew') ||
      //       route.fullPath?.includes('/loselist')
      //     ) {
      //       return old.skuCode === item.skuCode;
      //     }
      //     return old.productSku === item.productSku;
      //   });
      //   if (same) {
      //     item.skuQty = same.skuQty ? same.skuQty : 1;
      //     item.price = same.price ? same.price : 0;
      //     item.currency = same.currency ? same.currency : '';
      //   } else item.skuQty = 1;
      // });
      // form.value.itemInfoList = val;

      const oldList = form.value.itemInfoList?.filter((item) =>
        list.find((i) => i.supplySku === item.supplySku)
      );
      // console.log(oldList, 'oldList');
      // console.log(
      //   list.filter((item: any) => {
      //     return !oldList.find((old: any) => {
      //       return old.skuCode === item.skuCode;
      //     });
      //   }),
      //   'diffList'
      // );
      const diffList = list
        .filter((item: any) => {
          return !oldList.find((old: any) => {
            return old.skuCode === item.skuCode;
          });
        })
        ?.map((item: any) => {
          // console.log('diffList item', item);
          return {
            ...item,
            productImageUrl: item.productImage || item.productImageUrl,
            productName: item.productTitle || item.productName,
            supplySku: item.productSku || item.supplySku,
            price: '',
            num: 1,
          };
        });
      const newList = oldList.concat(diffList);
      //omsOrderReferenceParamsBySkuCode
      const params: any = await omsApi.omsFulfillmentOrderReplenishProductInfo({
        // countryCode: form.value.receiveInfo.countryCode,
        channel: form.value.baseInfo.channel,
        shop: form.value.baseInfo.shopAccount,
        site: form.value.baseInfo.site,
        supplySkus: newList.map((item) => item.supplySku),
        countryCode: form.value.receiveInfo.countryCode,
        // type: 1,
        // salesmanCode: salesmanCode.value,
      });

      form.value.itemInfoList = newList.map((item) => {
        const matchItem = params.find((infoItem) => infoItem.supplySku === item.supplySku);
        // console.log('matchItem', matchItem);
        if (matchItem) {
          item.weight = matchItem.weight;
          item.volume = matchItem.volume;
          if (matchItem.mskus?.length == 1) {
            item.sellerSku = matchItem.mskus[0];
          }
          if (matchItem.mskus?.length == 0) {
            item.sellerSku = '';
          }
        }
        // if (item.deliveryList?.length === 0) {
        //   Reflect.set(item, 'deliveryList', res.paramMap[item.skuCode]);
        // }
        resetStatistics(item);
        return item;
      });
      form.value.itemInfoList = newList as [];
      // nextTick(() => {
      //   form.value.itemInfoList.forEach((item) => resetStatistics(item));
      // });
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
    console.log(form.value.itemInfoList);
  };

  const tabs = [
    { label: '基础信息', id: 'base' },
    { label: '买家信息', id: 'sender' },
    { label: '收件人信息', id: 'reciever' },
    { label: '产品信息', id: 'product' },
    { label: '物流信息', id: 'deliver' },
    { label: '金额信息', id: 'money' },
  ];

  const titleIdMap = {
    基础信息: 'base',
    买家信息: 'sender',
    收件人信息: 'reciever',
    产品信息: 'product',
    物流信息: 'deliver',
    金额信息: 'money',
  };

  const goBackOrder = (isEdit) => {
    closeCurrentTab();
    router.push({
      name: 'shopifyOrder',
      params: {
        edit: isEdit,
      },
    });
  };

  interface infoMapType {
    label: string;
    prop: string;
    prevParent: string;
    type?: string;
    connector?: string;
    showUnit?: boolean;
    tips?: string;
  }

  // 信息map
  const allInfoMap = {
    基础信息: [
      { label: '平台', prop: 'channel', prevParent: 'baseInfo', type: 'select' },
      {
        label: '店铺/站点',
        prop: ['shopAccount', 'site'],
        prevParent: 'baseInfo',
        connector: ':',
        type: 'select',
      },
      { label: '订购时间', prop: 'orderingTime', prevParent: 'baseInfo', type: 'datetime' },
      { label: '付款时间', prop: 'payTime', prevParent: 'baseInfo', type: 'datetime' },
    ] as infoMapType[],
    买家信息: [
      { label: '姓名', prop: 'userChannel', prevParent: 'receiveInfo' },
      { label: '邮箱', prop: 'userChannelEmail', prevParent: 'receiveInfo' },
      { label: '买家留言', prop: 'buyerRemark', prevParent: 'receiveInfo' },
    ] as infoMapType[],
    收件人信息: [
      { label: '姓名', prop: 'name', prevParent: 'receiveInfo' },
      { label: '邮箱', prop: 'email', prevParent: 'receiveInfo' },
      { label: '电话', prop: 'phone', prevParent: 'receiveInfo' },
      { label: '手机号', prop: 'mobilePhone', prevParent: 'receiveInfo' },
      { label: '税号', prop: 'taxId', prevParent: 'receiveInfo' },
      { label: '国家/地区', prop: 'countryCode', prevParent: 'receiveInfo', type: 'select' },
      { label: '省/州', prop: 'province', prevParent: 'receiveInfo' },
      { label: '邮编', prop: 'zipcode', prevParent: 'receiveInfo' },
      { label: '城市', prop: 'city', prevParent: 'receiveInfo' },
      { label: '区/县', prop: 'area', prevParent: 'receiveInfo' },
      { label: '街道', prop: 'street', prevParent: 'receiveInfo' },
      { label: '门牌号', prop: 'houseNumber', prevParent: 'receiveInfo' },
      { label: '详细地址1', prop: 'address', prevParent: 'receiveInfo' },
      { label: '详细地址2', prop: 'address2', prevParent: 'receiveInfo' },
      {
        label: '短地址',
        prop: 'shortAddress',
        prevParent: 'receiveInfo',
        type: 'tips',
        tips: '当收件人国家为沙特阿拉伯时，短地址必填',
        limit: 50,
      },
    ] as infoMapType[],
    产品信息: [],
    物流信息: [
      { label: '发货仓库', prop: 'warehouseDesc', prevParent: 'baseInfo' },
      { label: '物流商', prop: 'spName', prevParent: 'baseInfo' },
      { label: '物流渠道', prop: 'shippingDesc', prevParent: 'baseInfo' },
      { label: '运单号', prop: 'waybillNo', prevParent: 'baseInfo' },
      { label: '跟踪号', prop: 'trackOrderCode', prevParent: 'baseInfo' },
      { label: '出库单号', prop: 'outboundCode', prevParent: 'baseInfo' },
    ] as infoMapType[],
    金额信息: [
      {
        label: '订单售价(不含税)',
        prop: 'realTransactionAmount',
        prevParent: 'baseInfo',
        showUnit: true,
      },
      { label: '订单折扣', prop: 'discountAmount', prevParent: 'baseInfo', showUnit: true },
      { label: '订单积分', prop: 'integral', prevParent: 'baseInfo' },
      { label: '订单税金', prop: 'taxes', prevParent: 'baseInfo', showUnit: true },
      {
        label: '订单买家支付运费',
        prop: 'salesFreightAmount',
        prevParent: 'baseInfo',
        showUnit: true,
      },
      { label: '订单其他费用', prop: 'otherAmount', prevParent: 'baseInfo', showUnit: true },
    ] as infoMapType[],
  };

  const remarkRow = ref();
  const customRemark = ref();
  const handleRemark = (e, row, name) => {
    const currRow = row ?? {};
    remarkName.value = name;
    remarkRow.value = currRow;
    customRemark.value = currRow?.remark || currRow?.customRemark;
    const remarkPopover = document.querySelector('.remark-popover-edit');
    if (!remarkPopover) return;

    // 设置基本样式
    remarkPopover.style.position = 'fixed';
    remarkPopover.style.zIndex = '9999';
    remarkPopover.style.display = 'block';

    // 获取点击元素的位置
    const targetRect = e.target.getBoundingClientRect();

    // 设置 popover 显示在点击元素右侧
    const left = targetRect.right + 9; // 右边距 10px
    const top = targetRect.top - remarkPopover.scrollHeight / 2; // 对齐顶部

    remarkPopover.style.left = `${left}px`;
    remarkPopover.style.top = `${top}px`;
  };

  const saveCustomerRemarkLoading = ref(false);
  const handleSaveCustomerRemark = async (row) => {
    if (!customRemark.value && remarkName.value == '订单备注') {
      ElMessage.warning('请输入订单备注');
      return;
    }
    try {
      saveCustomerRemarkLoading.value = true;
      if (remarkName.value == '订单备注') {
        await erpApi.luteosErpOrderSaveRemark({
          erpCodes: [erpCode.value],
          remark: customRemark.value,
        });
        form.value.orderRemarkList = [{ remark: customRemark.value }];
      } else if (remarkName.value == '客服备注') {
        await omsApi.omsFulfillmentOrderUpdateCustomRemark({
          erpCode: erpCode.value,
          customRemark: customRemark.value,
          isShopify: true,
        });
        row.customRemark = customRemark.value;
      }
      ElMessage.success('备注成功');
      hideCustomerPopovers();
    } finally {
      saveCustomerRemarkLoading.value = false;
    }
  };

  const hideCustomerPopovers = () => {
    const remarkPopover = document.querySelector('.remark-popover-edit');
    if (!remarkPopover) return;
    remarkPopover.style.display = 'none';
  };

  const sections = ref<any>([]); // 每个分区 顶部偏移

  onMounted(() => {
    route.query.code && handleOpen(route.query.code);
    handleDrawerOpened();
    document.addEventListener('click', handleClickOutside);
  });

  // 页面点击隐藏弹出层
  const handleClickOutside = (e) => {
    const customerRemarkPopover = document.querySelector('.remark-popover-edit');
    const isClickInsideCustomer = customerRemarkPopover?.contains(e.target);
    if (!isClickInsideCustomer && !e.target.closest('.icon-bianji')) {
      hideCustomerPopovers();
    }
  };

  // 查看
  const handleOpen = async (code: any) => {
    showDetail.value = true;
    erpCode.value = code;
    await getDetailData();
    nextTick(() => {
      initSections();
    });
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
  };

  const handleDrawerOpened = () => {
    contentSection = document.querySelector('.layout-right-main');
    if (contentSection) {
      contentSection.addEventListener('scroll', handleScroll);
    }
    nextTick(() => {
      initSections();
    });
    window.addEventListener('resize', initSections);
  };

  const headerHeight = 98;
  let clickIndex;
  let isClick = false;
  const endScroll = () => {
    if (isClick) {
      isClick = false;
      // activated.value = clickIndex;
      setTimeout(() => {
        activated.value = clickIndex;
      }, 20);
    }
  };
  const tabClick = (tab: any) => {
    clickIndex = tab.paneName;
    isClick = true;
    const section = document.getElementById(tab.paneName);
    if (section) {
      // 计算Sticky头部高度
      const top = section.offsetTop - headerHeight;
      contentSection?.scrollTo({ top, behavior: 'smooth' });
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
        // 找到当前可见区域
        for (let i = sections.value.length - 1; i >= 0; i -= 1) {
          const section = sections.value[i];
          if (scrollPosition >= section.offsetTop) {
            activated.value = sections.value[i].id;
            break;
          }
        }
      }
      scrollTimeout = null;
    }, 20);
  };

  const formInital = ref({
    userChannel: '',
    userChannelEmail: '',
    buyerRemark: '',
    name: '',
    email: '',
    phone: '',
    mobilePhone: '',
    taxId: '',
    countryCode: '',
    province: '',
    zipcode: '',
    city: '',
    area: '',
    street: '',
    houseNumber: '',
    address: '',
    shortAddress: '',
  });

  const rules = ref({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
    // province: [{ required: true, message: '请输入省/州', trigger: 'blur' }],
    city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    address: [{ required: true, message: '请输入详细地址1', trigger: 'blur' }],
    address2: [{ required: false, message: '请输入详细地址2', trigger: 'blur' }],
    zipcode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
    email: [{ required: false, type: 'email', message: '请输入正确的Email地址' }],

    'baseInfo.channel': [{ required: true, message: '请选择', trigger: 'blur' }],
    'baseInfo.shopAccount': [{ required: true, message: '请选择', trigger: 'blur' }],
    'baseInfo.refNo': [{ required: true, message: '请输入', trigger: 'blur' }],
    // countryCode: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
    // // province: [{ required: true, message: '请输入省/州', trigger: 'blur' }],
    // city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    // address: [{ required: true, message: '请输入详细地址1', trigger: 'blur' }],
    // address2: [{ required: false, message: '请输入详细地址2', trigger: 'blur' }],
    // zipcode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
    // phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
    // email: [{ required: false, type: 'email', message: '请输入正确的Email地址' }],
  });

  const countryOptions: any = ref([]);
  const queryCountry = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    countryOptions.value = res?.countryList?.map((item) => {
      return {
        label: `${item.countryCode} - ${item.countryName}`,
        value: item.countryCode,
      };
    });
  };

  const formRef = ref();

  const save = async () => {
    const validate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    // console.log(validate, formRef.value);
    if (validate) {
      try {
        saveLoading.value = true;
        const params = { ...formInital.value, erpCode: erpCode.value };
        // console.log(params);
        console.log('form', form.value);
        let priceValid = true;
        let numValid = true;
        form.value.itemInfoList.forEach((item) => {
          if (item.price === null || item.price === undefined || item.price === '') {
            priceValid = false;
          }
          if (item.num === null || item.num === undefined || item.num === '') {
            numValid = false;
          }
        });
        console.log(priceValid);
        if (!priceValid) {
          ElMessage.warning('请输入商品单价');
          return;
        }
        if (!numValid) {
          ElMessage.warning('请输入产品数量');
          return;
        }
        // return;
        if (!canEdit.value) {
          await omsApi.omsOrderUpdateReceiveInfo(params);
          ElMessage.success('操作成功');
        } else {
          const newParam = JSON.parse(JSON.stringify(form.value));
          let arr = newParam.baseInfo.shippingCode.split(',');
          if (arr?.length == 2) {
            // item.spCode = arr[0];
            newParam.baseInfo.shippingCode = arr[1];
          }
          // delete newParam.authLogList;
          // delete newParam.paymentTermsInfo;
          // delete newParam.orderAttachmentList;
          // delete newParam.orderCustomsRemarkList;
          // delete newParam.flowBaseInfo;
          // delete newParam.platformItemInfoList;
          // delete newParam.authNodeList;
          // delete newParam.customerInfoBean;
          await omsApi.omsFulfillmentOrderReplenishSave(newParam);
          ElMessage.success('补单发货成功');
        }
        goBackOrder(true);
      } finally {
        saveLoading.value = false;
      }
    }
  };

  interface productItemType {
    productName?: string;
    itemId?: string;
    num?: number;
    price?: number;
    skuCode?: string;
    weight?: number;
    totalPrice?: number;
    sellerSku?: string;
    volume?: number;
    discountAmount?: string;
    supplySku?: string;
    remark?: string;
    taxes?: number;
    salesFreightAmount?: number;
    salesFreightAmount?: number;
    otherAmount?: number;
    productImageUrl?: string;
    buyerChooseLogistics?: string;
    integral?: string | number;
    id?: number;
  }

  interface baseInfoType {
    channel?: string;
    site?: string;
    shopAccount?: string;
    createTime?: string;
    orderLabelList?: Array<{ labelCode: string; labelName: string }>;
    orderStatus?: number;
    orderStatusDesc?: string;
    refNo?: string;
    erpCode?: string;
    flowName?: string;
    shippingCode?: string | number;
    warehouseCode?: string;
    warehouseDesc?: string;
    waybillNo?: string;
    spCode?: string;
    spDesc?: string;
    trackOrderCode?: string;
    sendTime?: string;
    customerName?: string;
    email?: string;
    currencyCode?: string;
    customRemark?: string;
    statusInfoList?: Array<{
      handleTime: string;
      sort: number;
      status: number;
      statusDesc: string;
      nodeStatus: string;
    }>;
  }

  const form = ref({
    baseInfo: { orderLabelList: [], statusInfoList: [] } as baseInfoType,
    authNodeList: [],
    itemInfoList: [] as productItemType[],
    // itemInfoList: [],
    orderRemarkList: [] as Array<{ remark: string }>,
    receiveInfo: {
      userChannel: '',
      userChannelEmail: '',
      buyerRemark: '',
      name: '',
      email: '',
      phone: '',
      mobilePhone: '',
      taxId: '',
      countryCode: '',
      province: '',
      zipcode: '',
      city: '',
      area: '',
      street: '',
      houseNumber: '',
      address: '',
      shortAddress: '',
    },
    customerInfoBean: {} as baseInfoType,
    pass: undefined,
  });
  const listLoading = ref(false);

  const getDetailData = async () => {
    if (erpCode.value) {
      detailLoading.value = true;
      queryCountry();
      const res: any = await omsApi.omsOrderQueryDetail({
        erpCode: erpCode.value as string,
        searchEdit: true,
      });
      form.value = res;
      formInital.value = res.receiveInfo;
      form.value.baseInfo.statusInfoList?.map((item, index) => {
        if (index !== (form.value.baseInfo.statusInfoList?.length as number) - 1)
          item.nodeStatus = 'finish';
        else item.nodeStatus = 'process';
        return item;
      });
      detailLoading.value = false;
      if (canEdit.value) {
        form.value.baseInfo.warehouseDesc = '';
        form.value.baseInfo.warehouseCode = '';
        form.value.baseInfo.spName = '';
        form.value.baseInfo.spCode = '';
        form.value.baseInfo.shippingDesc = '';
        form.value.baseInfo.shippingCode = '';

        form.value.baseInfo.waybillNo = '';
        form.value.baseInfo.trackOrderCode = '';
        form.value.baseInfo.outboundCode = '';
      }

      // 查询发货方式、仓库、配送方式备选项
      getProductInfo();
    }
  };
  const getProductInfo = async () => {
    try {
      listLoading.value = true;
      // omsOrderReferenceParamsBySkuCode
      const params: any = await omsApi.omsFulfillmentOrderReplenishProductInfo({
        channel: form.value.baseInfo.channel,
        shop: form.value.baseInfo.shopAccount,
        site: form.value.baseInfo.site,
        supplySkus: form.value?.itemInfoList?.map((item) => item.supplySku),
        countryCode: form.value.receiveInfo.countryCode,
      });

      for (const item of form.value.itemInfoList) {
        // console.log('item', item);
        const matchItem = params.find((infoItem) => infoItem.supplySku === item.supplySku);
        // console.log('matchItem', matchItem);
        if (matchItem) {
          item.weight = matchItem.weight;
          item.volume = matchItem.volume;
          if (matchItem.mskus?.length == 1) {
            item.sellerSku = matchItem.mskus[0];
          }
          if (matchItem.mskus?.length == 0) {
            item.sellerSku = '';
          }
        }
        // 计算总重量
        resetStatistics(item);
        // form.value.itemInfoList.forEach((item, index) => {
        //   resetStatistics(item);
        // });
      }
    } finally {
      // listLoading.value = false;
      setTimeout(() => {
        listLoading.value = false;
      }, 200);
    }
  };

  const selfFulTagDialogRef = ref(null);
  const handleClickLabelMake = () => {
    if (!selfFulTagDialogRef.value) return;
    selfFulTagDialogRef.value.open({
      erpcode: erpCode.value,
      labellist: form.value.baseInfo.orderLabelList,
    });
  };
  const handleLabelConfirm = async (value) => {
    if (!value.erpcode) return;
    try {
      await omsApi.omsFulfillmentOrderUpdateLabel({
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
      form.value.baseInfo.orderLabelList = value.labelList.map((item) => {
        return { labelName: item.name, labelCode: item.labelCode };
      });
    } catch (e) {
    } finally {
    }
  };
  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };
</script>

<style scoped lang="scss">
  .bg-wrap {
    padding: 0 16px;
    background: #f7f7f7;
    min-height: 100%;
    // height: 100%;
    // overflow: auto;

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
      // padding: 0 4px;
      // background: #f7f7f7;

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

      .total {
        text-align: right;
        color: #000000;
        font-size: 13px;
        line-height: 22px;
        padding: 16px 0 26px;
      }

      .tablewrap-sticky {
        padding-top: 112px;
      }

      .tablewrap1 {
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

            .product-sku,
            .product-sku2 {
              margin-top: 6px;

              .item-label {
                flex-shrink: 0;
                color: #999999;
              }
            }
            .product-sku2 {
              margin-top: 0px;
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
    position: relative;
    background-color: white;
  }

  .fontcolor {
    font-size: 12px;
    color: #ff9f22 !important;

    i {
      margin-right: 4px;
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
</style>
<style scoped lang="scss">
  .bg-wrap {
    padding: 0 16px;
    background: #f7f7f7;
  }
  .aewrap {
    background-color: #fff;
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
  .iconfont {
    cursor: pointer;
  }

  .remark-popover-edit {
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

  .fixed {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 2000;
  }

  .product-tag {
    display: flex;
    align-items: center;
    line-height: 22px;
    font-size: 13px;
    border-top: 1px solid #f8f8f8;
    box-sizing: border-box;
    height: 46px;
    .tag {
      display: flex;
      align-items: center;
      color: #999;
      padding: 13px 20px;
      border-right: 1px solid #f4f5f5;
      height: 46px;
      .tag-content {
        line-height: 22px;
      }
    }
    .tag-info {
      color: #1f1f1f;
    }
    .customer-remark {
      display: flex;
    }
    .remark {
      padding: 13px 20px;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }
  }

  .empty {
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 14px;
    .text {
      font-size: 14px;
      color: #999999;
      line-height: 22px;
    }
  }

  .icon-bianji {
    color: #999;
    &:hover {
      color: var(--el-color-primary);
    }
  }

  .footer {
    padding: 12px 0;
    background: #fff;
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

  .tablewrap {
    border: 1px solid #f4f5f5;
    border-radius: 10px;
    overflow: hidden;
    .product-item {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      margin-bottom: 10px;
      .item-area {
        display: flex;
        flex-direction: column;
        .item-remark {
          display: flex;
          align-items: center;
          .item-label {
            color: #999;
          }
        }
        > div {
          line-height: 22px;
        }
      }
      .item-base {
        display: flex;
        align-items: flex-start;
        padding: 14px 12px;
        .product-img {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          margin: 3px 10px 0 8px;
          position: relative;
          .giftStock {
            width: 20px;
            position: absolute;
            top: -15px;
            right: -5px;
          }
          :deep(.el-image) {
            border-radius: 8px !important;
            min-width: 36px !important;
            width: 36px !important;
            min-height: 36px !important;
            height: 36px !important;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }
      }
      .item-detail {
        padding: 14px 12px;
      }
    }
  }

  .step-list {
    margin: 0 20px 26px;
    background-color: #f8f8f8;
    border-radius: 16px;
    padding: 18px 32px;
    :deep(.el-steps) {
      display: flex;
      width: 100%;
      .el-step {
        flex: 1;
        .el-step__title {
          color: #1f1f1f;
          line-height: 22px;
          font-size: 14px;
          margin: 12px 0 4px;
        }
        .el-step__description {
          color: #999;
        }
        .el-step__icon {
          width: 28px;
          height: 28px;
          border-width: 1px;
        }
        .el-step__line {
          top: 13px;
          height: 1px;
          left: 56%;
          right: -44%;
        }
      }
      .is-finish {
        .el-step__line {
          background-color: var(--el-color-primary);
        }
        .el-step__icon {
          border-radius: 50%;
          border: 1px solid var(--el-color-primary);
          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
      .is-process {
        .el-step__icon {
          border-color: var(--el-color-primary);
          background-color: var(--el-color-primary);
          color: #fff;
        }
      }
    }
  }
  :deep(.el-select) {
    height: 26px !important;
    .el-select__wrapper {
      min-height: 24px !important;
    }
  }
  :deep(.el-form-item__error) {
    padding-top: 4px;
  }
  :deep(.el-date-editor) {
    // height: 26px !important;
    width: 100%;
  }

  :deep(.el-form) {
    margin-top: 26px;
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
  .flex-center {
    display: flex;
    align-items: center;
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
  .wrap1:last-child {
    padding-bottom: 40px;
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
    overflow: auto;
    background-color: #fff;
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
    .skuLineheight {
      height: 28px !important;
      line-height: 28px !important;
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
