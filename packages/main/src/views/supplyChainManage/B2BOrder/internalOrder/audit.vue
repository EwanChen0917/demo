<template>
  <KeenCard v-if="!isAdd && form.baseInfo.orderStatus !== 101">
    <AuditHeader :flowName="form.baseInfo?.flowName" :authNodeList="form.authNodeList" />
  </KeenCard>
  <el-form
    scroll-to-error
    :model="form"
    ref="formRef"
    :rules="rules"
    label-width="140px"
    v-loading="loading"
  >
    <KeenCard title="收件信息">
      <el-form
        scroll-to-error
        label-width="140px"
        :disabled="isAudit"
        ref="receiveFormRef"
        :model="form"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="客户名称" prop="receiveInfo.customerCode">
              <el-select
                style="width: 100%"
                v-model="form.receiveInfo.customerCode"
                filterable
                :disabled="isEdit"
                @change="handleChange"
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
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="收件人" prop="receiveInfo.name">
              <el-input v-model="form.receiveInfo.name" :maxlength="128" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="Email" prop="receiveInfo.email">
              <el-input v-model="form.receiveInfo.email" :maxlength="60" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="收件人国家或地区" prop="receiveInfo.countryCode">
              <CountrySelect
                placeholder="请选择"
                v-model="form.receiveInfo.countryCode"
                style="width: 100%"
                @change="handleCountryChange"
              />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="收件人省/州" prop="receiveInfo.province">
              <el-input v-model="form.receiveInfo.province" :maxlength="200" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="城市" prop="receiveInfo.city">
              <el-input v-model="form.receiveInfo.city" :maxlength="200" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="区/县" prop="receiveInfo.area">
              <el-input v-model="form.receiveInfo.area" :maxlength="200" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="地址" prop="receiveInfo.address">
              <el-input v-model="form.receiveInfo.address" :maxlength="300" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="地址2" prop="receiveInfo.address2">
              <el-input v-model="form.receiveInfo.address2" :maxlength="300" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="门牌号" prop="receiveInfo.houseNumber">
              <el-input v-model="form.receiveInfo.houseNumber" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="收件人号码" prop="receiveInfo.phone">
              <el-input v-model="form.receiveInfo.phone" :maxlength="64" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="邮编" prop="receiveInfo.zipcode">
              <el-input v-model="form.receiveInfo.zipcode" :maxlength="32" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </KeenCard>
    <KeenCard title="产品信息">
      <el-table
        :data="form.itemInfoList"
        empty-text="请选择产品"
        show-summary
        :summary-method="getSummaries"
        class="py-4"
      >
        <el-table-column label="序号">
          <template #default="{ $index }">{{ $index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="productName" min-width="240px" label="产品名称" />
        <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
        <el-table-column prop="suggestPrice" min-width="200px" label="建议售价">
          <template #default="{ row }">{{ row?.suggestPrice }}</template>
        </el-table-column>
        <el-table-column prop="postalPrice" min-width="150" label="报价" />
        <el-table-column label="销售单价" min-width="150px">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].price`"
              :rules="[
                { required: true, message: '请输入销售单价', trigger: ['blur', 'change'] },
                {
                  pattern: priceRuleFixed4,
                  message: '请输入正确的销售单价',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input v-model="row.price" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="佣金" min-width="150px">
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
              <el-input v-model="row.commission" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="发货方式" width="180px">
          <template #header="{ $index }">
            <div>
              发货方式
              <!-- <el-link class="batch" type="primary" @click="handleBatch(scope)" :underline="false">
                批量
              </el-link> -->
              <el-popover placement="top" :visible="visible" :width="400" trigger="click">
                <template #reference>
                  <el-link class="batch" type="primary" :underline="false" @click="visible = true">
                    批量
                  </el-link>
                </template>
                <div class="selectWrap">
                  <el-select placeholder="请选择发货方式" v-model="deliveryCodeSelect" filterable>
                    <el-option
                      v-for="item in form.itemInfoList[0]?.deliveryList"
                      :key="item.deliveryCode"
                      :label="item.deliveryName"
                      :value="item.deliveryCode"
                    />
                  </el-select>
                  <div class="popover-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="handleBatch($index)" v-loading="saveLoading">
                      确认
                    </el-button>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
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
        <el-table-column prop="warehouseCode" width="220px" label="仓库">
          <template #header="{ $index }">
            <div>
              仓库
              <!-- <el-link
                class="batch"
                type="primary"
                @click="handleBatch(row, $index)"
                :underline="false"
              >
                批量
              </el-link> -->
              <el-popover placement="top" :visible="visible2" :width="400" trigger="click">
                <template #reference>
                  <el-link class="batch" type="primary" :underline="false" @click="visible2 = true">
                    批量
                  </el-link>
                </template>
                <div class="selectWrap2">
                  <el-select placeholder="请选择仓库" v-model="warehouseCodeSelect" filterable>
                    <el-option
                      v-for="item in form.itemInfoList[0]?.warehouseList"
                      :key="item.warehouseCode"
                      :label="item.warehouseName"
                      :value="item.warehouseCode"
                    />
                  </el-select>
                  <div class="popover-footer">
                    <el-button @click="visible2 = false">取消</el-button>
                    <el-button type="primary" @click="handleBatch($index)" v-loading="saveLoading">
                      确认
                    </el-button>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].warehouseCode`"
              :rules="[{ required: true, message: '请选择仓库', trigger: 'change' }]"
            >
              <el-select
                style="width: 90%"
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
        <el-table-column prop="supplySku" label="供应链SKU" width="220px">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].supplySku`"
              :rules="[{ required: true, message: '请选择供应链SKU', trigger: 'change' }]"
            >
              <el-select
                style="width: 90%"
                v-model="row.supplySku"
                filterable
                :placeholder="
                  !row.supplySku && !row.warehouseCode ? '请先选择发货方式和发货方式' : '请选择'
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
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存" />

        <el-table-column prop="cartonQty" label="数量" width="100px" v-if="unitCode === 1">
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
        <el-table-column prop="num" label="数量" width="100px" v-else>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].num`"
              :rules="[{ required: true, type: 'number', min: 1, message: '请输入数量' }]"
            >
              <Num v-model="row.num" :precision="0" :min="1" :max="99999" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template #default="{ row }">
            <span>{{ row.unitCode === 1 ? '箱' : '件' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="箱规（cm）" prop="sizeDesc" v-if="unitCode === 1" min-width="120" />
        <el-table-column label="发货数量" prop="num" v-if="unitCode === 1" />
        <el-table-column prop="shippingCode" min-width="100px" width="220px" label="配送方式">
          <template #header="{ $index }">
            <div>
              配送方式
              <!-- <el-link
                class="batch"
                type="primary"
                @click="handleBatch(row, $index)"
                :underline="false"
              >
                批量
              </el-link> -->
              <el-popover placement="top" :visible="visible3" :width="400" trigger="click">
                <template #reference>
                  <el-link class="batch" type="primary" :underline="false" @click="visible3 = true">
                    批量
                  </el-link>
                </template>
                <div class="selectWrap2">
                  <el-select placeholder="请选择配送方式" v-model="shippingCodeSelect" filterable>
                    <el-option
                      v-for="item in form.itemInfoList[0]?.shippingList"
                      :key="item.value"
                      :label="item.desc"
                      :value="item.value"
                    />
                  </el-select>
                  <div class="popover-footer">
                    <el-button @click="visible3 = false">取消</el-button>
                    <el-button type="primary" @click="handleBatch($index)" v-loading="saveLoading">
                      确认
                    </el-button>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].shippingCode`"
              :rules="[{ required: true, message: '请选择配送方式', trigger: 'change' }]"
            >
              <el-select
                v-model="row.shippingCode"
                filterable
                :placeholder="!row.warehouseCode && !row.shippingCode ? '请先选择仓库' : '请选择'"
              >
                <el-option
                  v-for="item in row.shippingList"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
              <div class="text-warning fs-7">
                预估时效：{{
                  row?.shippingList?.find((v) => v.value === row.shippingCode)?.params?.timeliness
                }}
              </div>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="订单信息">
      <el-form
        scroll-to-error
        label-width="140px"
        :disabled="isAudit"
        ref="infoFormRef"
        :model="form"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :md="8" :sm="12" :offset="0">
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
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="Reference No">
              <el-input disabled v-model="form.baseInfo.erpCode" :maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="参考单号" prop="baseInfo.refNo">
              <el-input v-model="form.baseInfo.refNo" :maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="运费">
              <el-input v-model="form.baseInfo.freightAmount" :maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="货币类型" prop="baseInfo.currencyCode">
              <!--            <el-select
                            disabled
                            style="width: 100%"
                            v-model="form.baseInfo.currencyDesc"
                            clearable
                            filterable
                          />-->
              <CurrencySelect
                v-model="form.baseInfo.currencyCode"
                style="width: 100%"
                @change="handleCurrencyChange"
              />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="交易额">
              <el-input disabled v-model="transactionAmount" :maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="销售运费">
              <el-input v-model="form.baseInfo.salesFreightAmount" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="付款时间">
              <el-input disabled value="默认为新增订单时间" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="是否为COD订单">
              <el-radio v-model="form.baseInfo.cod" :label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="折扣金额">
              <el-input v-model="form.baseInfo.discountAmount" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="唛头">
              <el-input v-model="form.baseInfo.shippingMark" />
            </el-form-item>
          </el-col>
          <!--          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="交货方式" prop="baseInfo.deliverType">
              <el-select v-model="form.baseInfo.deliverType" style="width: 100%">
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
          </el-col>-->
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="总佣金">
              <el-input v-model="totalCommission" disabled />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="实际交易额">
              <el-input disabled v-model="realAmount" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="客服备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="form.baseInfo.customRemark"
                :maxlength="100"
              />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="订单备注">
              <el-input type="textarea" :rows="3" v-model="form.baseInfo.remark" :maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="期望发货时间">
              <el-date-picker
                style="width: 100%"
                v-model="form.baseInfo.platformExpectedSendTime"
                placeholder="期望发货时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
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

        <el-row :gutter="20">
          <el-col :md="16" :sm="12" :offset="0" v-if="!isAudit">
            <el-form-item label="附件">
              <KeenFileUpload
                accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
                class="packing-upload"
                directory="erp/order/attachment"
                ref="uploadRef"
                v-model="fileList"
                :limit="null"
              >
                <el-button icon="plus" type="primary" size="small" />
              </KeenFileUpload>
              <div v-if="fileList.length === 0" class="ms-5 text-gray-500 fs-7">
                <span>支持上传图片/PDF/EXCEL/WORD文件</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </KeenCard>
    <KeenCard title="审核内容" v-if="isAudit">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item
            label="审核结果"
            prop="pass"
            :rules="[{ required: true, message: '请选择审核结果' }]"
          >
            <el-radio-group v-model="form.pass">
              <el-radio :label="true">通过</el-radio>
              <el-radio :label="false">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="拆单"
            prop="baseInfo.autoSubOrder"
            :rules="[{ required: true, message: '请选择拆单方式' }]"
          >
            <el-radio-group v-model="form.baseInfo.autoSubOrder">
              <el-radio :label="1">自动拆单</el-radio>
              <el-radio :label="0">手动拆单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="6" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="附件">
            <KeenFileUpload
              accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
              class="packing-upload"
              directory="erp/order/attachment"
              ref="uploadRef"
              v-model="fileList"
              :limit="null"
            >
              <el-button icon="plus" type="primary" size="small" />
            </KeenFileUpload>
            <div v-if="fileList.length === 0" class="ms-5 text-gray-500 fs-7">
              <span>支持上传图片/PDF/EXCEL/WORD文件</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">
        {{ isEdit ? '确定并转待审核' : '确定' }}
      </el-button>
    </el-space>
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
    type="supplierSku"
  />
</template>

<script setup lang="ts" name="internalOrderAudit">
  import Num from '@/components/NumberInput/index.vue';
  import { erpApi, productApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import ProductDialog from '@/views/favoursystem/perfortrack/samplesend/components/productDialog.vue';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const expectedArrivalTime = ref<any>([]);
  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });

  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });

  const isAudit = computed(() => {
    return route.fullPath.includes('/audit');
  });

  const unitCode = ref(0);

  const formRef = ref<FormInstance>();
  const receiveFormRef = ref<FormInstance>();
  const infoFormRef = ref<FormInstance>();
  const fileList = ref([]);
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
      customerSettlementInterval: '',
      customerSettlementType: '',
      customerType: '',
    },
    pass: undefined,
    remark: undefined,
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
  });

  const transactionAmount = computed(() => {
    return form.value?.itemInfoList
      ?.reduce((sum, item) => sum + item.price * item.num, 0)
      ?.toFixed(3);
  });

  const realAmount = computed(() => {
    return (
      transactionAmount.value -
      (form.value?.baseInfo?.freightAmount * 1 || 0) -
      (form.value?.baseInfo?.commission * 1 || 0) -
      (form.value?.baseInfo?.discountAmount * 1 || 0) +
      (form.value?.baseInfo?.salesFreightAmount * 1 || 0)
    ).toFixed(3);
  });

  const totalCommission = computed(() => {
    return form.value?.itemInfoList?.reduce((sum, item) => sum + item.commission * 1, 0);
  });

  const customerList = ref<string[]>([]);
  const queryCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerList.value = res?.recordList || [];
  };
  queryCustomerList();

  const initData = async () => {
    const res: any = await erpApi.luteosErpOrderQueryDetail({
      erpCode: route.query.code as string,
    });
    if (res?.receiveInfo?.countryCode) await initCountrySelection(res?.receiveInfo?.countryCode);
    form.value = res;
    if (
      (res.baseInfo.orderStatus !== 202 && isAudit.value) ||
      ((res.baseInfo.orderStatus >= 600 || res.baseInfo.orderStatus < 500) &&
        res.baseInfo.orderStatus !== 101 &&
        isEdit.value)
    ) {
      router.push({
        path: '/internalOrder/detail',
        query: { code: route.query.code as string },
      });
    }
    res.orderAttachmentList?.forEach((item) => {
      fileList.value.push({
        percentage: 100,
        name: item?.fileName,
        ossKey: item.fileUrl?.split('?')[0].split('aliyuncs.com/')[1],
        status: 'success',
      });
    });
    if (isAdd.value) form.value.baseInfo.erpCode = referenceNo.value;
    if (isAudit.value && form.value.baseInfo.autoSubOrder === null)
      form.value.baseInfo.autoSubOrder = 1;
    form.value.baseInfo.source = form.value.baseInfo.source || 0;
    expectedArrivalTime.value = [
      form.value?.baseInfo?.operationExpectedArrivalTime,
      form.value?.baseInfo?.operationExpectedArrivalTimeEnd,
    ];
  };

  if (route.query.code) {
    initData();
  }

  const loading = ref(false);
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
        type: 3,
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
    } else {
      productDialogVisible.value = false;
    }
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

  // 选择客户名称，自动填入其他信息
  const handleChange = (code) => {
    const customerInfo = customerList.value?.find((item) => item.code === code);
    form.value.receiveInfo.name = customerInfo?.name;
    form.value.receiveInfo.email = customerInfo?.recevicerEmail;
    form.value.receiveInfo.city = customerInfo?.recevicerCity;
    form.value.receiveInfo.province = customerInfo?.recevicerProvince;
    form.value.receiveInfo.address = customerInfo?.recevicerAddress;
    form.value.receiveInfo.phone = customerInfo?.recevicerPhone;
    form.value.receiveInfo.zipcode = customerInfo?.recevicerZipCode;
    form.value.receiveInfo.area = customerInfo?.recevicerArea;
    form.value.receiveInfo.houseNumber = customerInfo?.recevicerDoorplate;
    form.value.receiveInfo.countryCode = customerInfo?.recevicerCountry;
    form.value.receiveInfo.customerSettlementInterval = customerInfo?.settlementInterval;
    form.value.receiveInfo.customerSettlementType = customerInfo?.settlementType;
    form.value.receiveInfo.customerType = customerInfo?.type;
    form.value.baseInfo.deliverType = customerInfo?.deliverType;
    handleCountryChange(form.value.receiveInfo.countryCode);
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
    form.value.itemInfoList = [];
  };
  // 发货方式改变
  const handleDeliveryCodeChange = (val: string, currentRow: any, currentDeliveryList) => {
    // console.log(1111);
    const result = currentDeliveryList.find((item) => item.deliveryCode === val);
    currentRow.warehouseList = result ? cloneDeep(result.warehouseList) : [];
    // 清空
    currentRow.warehouseCode = '';
    currentRow.shippingCode = '';
    currentRow.supplySku = '';
    currentRow.inventory = 0;
  };
  // 仓库发生改变
  const handleWarehouseCodeChange = async (val: string, currentRow: any, currentWarehouseList) => {
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
  };
  // 供应链SKU改变
  const handleSupplySkuChange = async (val: string, currentRow: any, currentSupplySkuList) => {
    const result = currentSupplySkuList.find((item) => item.supplySku === val);
    currentRow.inventory = result ? result.inventory : 0;
  };
  // 移除产品信息
  const remove = (index: number) => {
    form.value.itemInfoList.splice(index, 1);
  };
  const deliveryCodeSelect = ref('');
  const deliveryIndex = ref(0);
  const warehouseCodeSelect = ref('');
  const shippingCodeSelect = ref('');
  // 批量操作
  const handleBatch = async (index, selectIndex?) => {
    // console.log(index, form.value.itemInfoList);
    // console.log(deliveryCodeSelect.value);
    // 	发货方式
    if (index === 7) {
      if (!deliveryCodeSelect.value) {
        ElMessage.warning('请选择发货方式');
        return;
      }
      for (let i = 0; i < form.value.itemInfoList.length; i += 1) {
        const item = form.value.itemInfoList[i];
        if (item.deliveryCode !== deliveryCodeSelect.value) {
          handleDeliveryCodeChange(deliveryCodeSelect.value, item, item.deliveryList);
        }
        visible.value = false;
        // handleDeliveryCodeChange(deliveryCodeSelect.value, item, item.deliveryList);
      }
      // form.value.itemInfoList.forEach((item) => (item.deliveryCode = deliveryCodeSelect.value));
    } else if (index === 8) {
      if (!warehouseCodeSelect.value) {
        ElMessage.warning('请选择仓库');
        return;
      }
      // 	仓库
      for (let i = 0; i < form.value.itemInfoList.length; i += 1) {
        const item = form.value.itemInfoList[i];
        console.log(item.warehouseCode, warehouseCodeSelect.value, item);
        item.warehouseCode = warehouseCodeSelect.value;
        handleWarehouseCodeChange(warehouseCodeSelect.value, item, item.warehouseList);
      }
      visible2.value = false;
      // form.value.itemInfoList.forEach((item) => (item.warehouseCode = warehouseCodeSelect.value));
    } else if (index === 13) {
      if (!shippingCodeSelect.value) {
        ElMessage.warning('请选择配送方式');
        return;
      }
      // 	配送方式
      form.value.itemInfoList.forEach((item) => (item.shippingCode = shippingCodeSelect.value));
      visible3.value = false;
    }
  };
  // 复制产品信息
  const copyRow = (row, index) => {
    form.value.itemInfoList.splice(index + 1, 0, cloneDeep(row));
    // form.value.itemInfoList.push(cloneDeep(row));
  };

  const visible = ref(false);
  const visible2 = ref(false);
  const visible3 = ref(false);
  const handleAutoWarehouse = async () => {
    // 发货方式、仓库、配送方式均未选时，匹配分仓规则进行补全
    const emptyItem = form.value.itemInfoList?.filter((item) => {
      return !item.deliveryCode && !item.warehouseCode && !item.shippingCode;
    });
    if (emptyItem?.length > 0) {
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
    }
  };

  const saveLoading = ref(false);
  const save = async () => {
    if (errList.value.length > 0) {
      ElMessage.error(`以下商品没有设置箱规，请前往设置箱规！${errList.value.join(',')}`);
      return;
    }
    const valid = await Promise.all([
      formRef.value?.validate(),
      receiveFormRef.value?.validate(),
      infoFormRef.value?.validate(),
    ]);
    if (valid) {
      if (!form.value.itemInfoList.length) {
        ElMessage.warning('请选择产品');
      } else {
        const { projectCode } = route.query;
        if (projectCode) {
          form.value.baseInfo.projectCode = projectCode;
        }
        if (fileList.value.length > 0) {
          form.value.orderAttachmentList = fileList.value.map((item) => {
            return {
              fileUrl: item.ossKey,
              fileName: item.name,
            };
          });
        } else form.value.orderAttachmentList = [];
        saveLoading.value = true;
        await (isAudit.value
          ? erpApi.luteosErpOrderAuthAndUpdate(form.value)
          : isEdit.value
          ? erpApi.luteosErpOrderUpdate(form.value)
          : erpApi.luteosErpOrderSave(form.value)
        ).finally(() => {
          saveLoading.value = false;
        });
        ElMessage.success('操作成功');
        closeTabAndRefresh('internalOrder');

        router.push({
          name: 'internalOrder',
        });
      }
    }
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
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      router.push({
        name: 'internalOrder',
      });
    }
  };
</script>

<style scoped lang="scss">
  .batch {
    font-family: 'PingFang SC ';
    font-size: 12px;
    margin-left: 5px;
  }
  .selectWrap,
  .selectWrap2 {
    width: 232px;
    padding: 16px;
    height: 120px;
    .popover-footer {
      margin-top: 24px;
      text-align: right;
    }
  }
  .selectWrap2 {
    height: 240px;
    .popover-footer {
      margin-top: 144px;
      text-align: right;
    }
  }

  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
    }
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
