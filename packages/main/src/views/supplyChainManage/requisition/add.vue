<template>
  <el-form
    ref="formRef"
    class="add-form"
    :model="form"
    label-position="top"
    require-asterisk-position="right"
    scroll-to-error
  >
    <CustomCard :loading="loading" title="领用信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item
            prop="requisitionInfo.requisitioner"
            label="领用人"
            :rules="[{ required: true, message: '请选择领用人', trigger: 'change' }]"
          >
            <DeptMember
              v-model="form.requisitionInfo.requisitioner"
              placeholder="领用人"
              @change="changeRequisitioner(true)"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="领用类型"
            prop="requisitionInfo.requisitionType"
            :rules="[{ required: true, message: '请选择领用类型', trigger: 'change' }]"
          >
            <el-select
              v-model="form.requisitionInfo.requisitionType"
              placeholder="请选择任务类别"
              filterable
              clearable
              @change="changeRequisitionType"
            >
              <el-option
                v-for="item in requisitionTypeList"
                :key="item.value"
                :label="item.desc"
                :value="item.desc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="retailApproveRequired">
          <el-form-item
            label="领用场景"
            prop="requisitionInfo.requisitionScene"
            :rules="[{ required: true, message: '请选择市场或渠道', trigger: 'blur' }]"
          >
            <el-select
              v-model="form.requisitionInfo.requisitionScene"
              placeholder="请选择市场或渠道"
              filterable
              clearable
              @change="handleChange"
            >
              <el-option
                v-for="item in requisitioSceneList"
                :key="item.value"
                :label="item.desc"
                :value="item.desc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-if="retailApproveRequired && !showCustomer && form.requisitionInfo.requisitionScene"
        >
          <el-form-item
            label="市场大区"
            prop="requisitionInfo.marketRegion"
            :rules="[{ required: true, message: '请选择大区', trigger: 'change' }]"
          >
            <el-select
              v-model="form.requisitionInfo.marketRegion"
              placeholder="请选择大区"
              filterable
              clearable
            >
              <el-option
                v-for="item in marketRegionMarket"
                :key="item.value"
                :label="item.desc"
                :value="item.desc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-if="retailApproveRequired && showCustomer && form.requisitionInfo.requisitionScene"
        >
          <el-form-item
            label="市场大区"
            prop="requisitionInfo.marketRegion"
            :rules="[{ required: true, message: '请选择大区', trigger: 'change' }]"
          >
            <el-select
              v-model="form.requisitionInfo.marketRegion"
              placeholder="请选择大区"
              filterable
              clearable
            >
              <el-option
                v-for="item in marketRegionChannel"
                :key="item.value"
                :label="item.desc"
                :value="item.desc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          v-show="retailApproveRequired && showCustomer && form.requisitionInfo.requisitionScene"
        >
          <el-form-item
            label="客户名称"
            prop="baseInfo.customer"
            :rules="[{ required: showCustomer, message: '请选择客户名称', trigger: 'change' }]"
          >
            <el-select
              v-model="form.baseInfo.customer"
              placeholder="请选择客户名称"
              filterable
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
        <!-- 无SKU领用 类型 无需计划审批人  -->
        <el-col
          :span="6"
          v-if="
            form.requisitionInfo.isOutSide !== 1 &&
            form.requisitionInfo.requisitionType !== '无SKU领用'
          "
        >
          <el-form-item
            prop="baseInfo.planner"
            label="计划审批人"
            :rules="[{ required: !isWithoutSku, message: '请选择计划审批人', trigger: 'change' }]"
          >
            <template #label>
              <div class="d-inline-flex align-items-center gap-2">
                计划审批人:
                <el-tooltip effect="light">
                  <template #content>
                    <div class="w-900px">
                      <TipTable />
                    </div>
                  </template>
                  <el-icon size="16" color="var(--el-color-primary)">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
            <DeptMember
              v-model="form.baseInfo.planner"
              multiple
              :multipleLimit="20"
              :maxCollapseTags="2"
              placeholder="计划审批人"
              deptCode="supply_planer_dept"
              clearable
              :disabled="isWithoutSku"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.requisitionInfo.isOutSide !== 1 && gtmApproveRequired">
          <el-form-item
            prop="baseInfo.gtmApprove"
            label="GTM审批人"
            :rules="[
              { required: gtmApproveRequired, message: '请选择GTM审批人', trigger: 'change' },
            ]"
          >
            <DeptMember
              v-model="form.baseInfo.gtmApprove"
              placeholder="GTM审批人"
              teleported
              deptCode="gtm"
              title="GTM组负责人"
              :searchChildDept="true"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="retailApproveRequired && form.requisitionInfo.requisitionScene">
          <el-form-item
            prop="baseInfo.channelApprove"
            label="渠道审批人"
            :rules="[
              { required: retailApproveRequired, message: '请选择渠道审批人', trigger: 'change' },
            ]"
          >
            <AuditMember
              v-model="form.baseInfo.channelApprove"
              placeholder="渠道审批人"
              teleported
              deptCode="region_channel_person"
              title="渠道审批人"
              :searchChildDept="true"
              clearable
              v-if="showCustomer"
            />
            <AuditMember
              v-model="form.baseInfo.channelApprove"
              placeholder="渠道审批人"
              teleported
              deptCode="region_market_person"
              title="渠道审批人"
              :searchChildDept="true"
              clearable
              v-if="!showCustomer"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item
            label="是否为品牌周边产品"
            label-width="180"
            prop="requisitionInfo.isOutSide"
            :rules="[{ required: true, message: '请选择是否为品牌周边产品', trigger: 'change' }]"
          >
            <template #label>
              <div class="d-inline-flex align-items-center gap-2">
                是否为品牌周边产品:
                <el-tooltip placement="top">
                  <template #content>
                    <div style="max-width: 600px">
                      品牌周边涉及产品有：2023 Cozy Case、2023 Momcozy Cozy Holiday Box、2024
                      Momcozy Village Supply
                      Box、母乳喂养周礼盒、品牌日礼盒、圆领T恤、行李箱、针织袋、挎包、冰箱贴、品牌手册、疗愈宝典、专家联名的母乳喂养成长指南等
                    </div>
                  </template>
                  <el-icon size="16" color="var(--el-color-primary)">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
            <!-- :disabled="isWithoutSku" -->
            <el-radio-group @change="isOutSideChange" v-model="form.requisitionInfo.isOutSide">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="订单异常是否钉钉通知"
            label-width="180"
            prop="requisitionInfo.noticeFlag"
            :rules="[{ required: true, message: '请选择订单异常是否钉钉通知', trigger: 'change' }]"
          >
            <el-radio-group v-model="form.requisitionInfo.noticeFlag" :disabled="isWithoutSku">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="领用用途">
            <el-input v-model="form.requisitionInfo.requisitionUse" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="收货信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item
            label="收件人"
            prop="receiveInfo.name"
            :rules="[{ required: true, message: '请输入收件人', trigger: 'change' }]"
          >
            <el-input v-model="form.receiveInfo.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="电话"
            prop="receiveInfo.phone"
            :rules="[{ required: true, message: '请输入电话', trigger: 'change' }]"
          >
            <el-input v-model="form.receiveInfo.phone" clearable :maxlength="64" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" prop="receiveInfo.mobile">
            <el-input v-model="form.receiveInfo.mobile" clearable :maxlength="64" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱">
            <el-input v-model="form.receiveInfo.email" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="邮编"
            prop="receiveInfo.zipcode"
            :rules="[{ required: true, message: '请输入邮编', trigger: 'change' }]"
          >
            <el-input v-model="form.receiveInfo.zipcode" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="国家/地区"
            prop="receiveInfo.countryCode"
            :rules="[
              {
                required: true,
                message: '请选择国家/地区',
                trigger: ['change', 'blur'],
              },
            ]"
          >
            <CountrySelect
              placeholder="请选择"
              teleported
              v-model="form.receiveInfo.countryCode"
              @change="handleCountryChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="省/州"
            prop="receiveInfo.province"
            :rules="[
              {
                required:
                  form.receiveInfo.countryCode === 'US' || form.receiveInfo.countryCode === 'CA',
                message: '请输入省/州',
                trigger: 'change',
              },
            ]"
          >
            <el-input v-model="form.receiveInfo.province" clearable :maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="城市"
            prop="receiveInfo.city"
            :rules="[{ required: true, message: '请输入城市', trigger: 'change' }]"
          >
            <el-input v-model="form.receiveInfo.city" clearable :maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="区/县">
            <el-input v-model="form.receiveInfo.area" clearable :maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="街道" prop="receiveInfo.address">
            <el-input v-model="form.receiveInfo.address" clearable :maxlength="300" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门牌">
            <el-input v-model="form.receiveInfo.houseNumber" clearable :maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="详细地址"
            prop="receiveInfo.address2"
            :rules="[{ required: true, message: '请输入详细地址', trigger: 'change' }]"
          >
            <el-input v-model="form.receiveInfo.address2" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="产品信息">
      <div class="info-operation">
        <el-button
          :disabled="!form.receiveInfo.countryCode"
          plain
          size="small"
          type="primary"
          @click="handleAdd"
        >
          <template v-if="!form.receiveInfo.countryCode">请先选择国家/地区</template>
          <template v-else-if="isWithoutSku">添加领用物品</template>
          <template v-else>
            <el-icon class="Root-tyicon icon-Root-tyjia" />
            <span>添加产品</span>
          </template>
        </el-button>
        <!-- <el-button
          size="small"
          type="primary"
          :disabled="form.itemInfoList?.length === 0"
          @click="handleAutoWarehouse"
        >
          自动分仓
        </el-button> -->
        <div class="right">
          <div class="tips">不确定发货仓库，联系计划；不确定配送方式，联系物流&nbsp; |</div>
          <el-button
            type="primary"
            size="small"
            link
            @click="
              openWindow(
                'https://alidocs.dingtalk.com/i/nodes/gwva2dxOW4yO55A7sq1pwyoQVbkz3BRL?corpId=ding1a1c6d46f33cfeb735c2f4657eb6378f&utm_medium=im_card&cid=9675749%3A128632246&iframeQuery=utm_medium%3Dim_card%26utm_source%3Dim&utm_scene=team_space&utm_source=im'
              )
            "
          >
            操作手册
          </el-button>
        </div>
      </div>
      <el-table class="mt-4" border :data="form?.itemInfoList" v-loading="productLoading">
        <el-table-column type="index" label="序号" min-width="50" />
        <template v-if="isWithoutSku">
          <el-table-column label="物品名称" prop="itemName" min-width="250" />
          <el-table-column label="物料属性" prop="itemProperties" min-width="250" />
        </template>
        <template v-else>
          <el-table-column label="产品名称" prop="productName" min-width="250" />
          <el-table-column label="产品SKU" prop="skuCode" min-width="150" />
        </template>

        <el-table-column label="发货方式" prop="deliveryDesc" min-width="150">
          <template #header>
            发货方式
            <span class="text-danger">*</span>
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
                    ? '请先选择国家或地区'
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
        <el-table-column label="发货仓库" prop="warehouseDesc" min-width="300">
          <template #header>
            发货仓库
            <span class="text-danger">*</span>
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
        <el-table-column v-if="!isWithoutSku" label="供应链SKU" prop="productSku" min-width="200">
          <template #header>
            供应链SKU
            <span class="text-danger">*</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].productSku`"
              :rules="[{ required: true, message: '请选择供应链SKU', trigger: 'change' }]"
            >
              <el-select
                style="width: 100%"
                v-model="row.productSku"
                filterable
                :placeholder="
                  !row.deliveryCode && !row.warehouseCode ? '请先选择发货方式和仓库' : '请选择'
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
        <el-table-column v-if="!isWithoutSku" label="可用库存" prop="inventory" width="150" />
        <el-table-column label="发货数量" prop="qty" width="150">
          <template #header>
            发货数量
            <span class="text-danger">*</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemInfoList[${$index}].qty`"
              :rules="[{ required: true, message: '请填写发货数量', trigger: 'change' }]"
            >
              <span v-if="!row.inventory">暂无库存</span>
              <NumberInput
                v-else
                v-model="row.qty"
                :precision="0"
                :min="1"
                :max="row?.inventory"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column v-if="!isWithoutSku" label="销售单价" prop="salePrice" min-width="150">
          <template #header>
            销售单价
            <span class="text-danger">*</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemInfoList[${$index}].salePrice`"
            >
              <el-input
                disabled
                :precision="2"
                :min="0"
                :model-value="0"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column v-if="isWithoutSku" label="配送方式" prop="shippingDesc" min-width="200">
          <template #header>
            配送方式
            <span class="text-danger">*</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemInfoList[${$index}].shippingCode`"
              :rules="[{ required: true, message: '请选择配送方式', trigger: 'change' }]"
            >
              <el-select
                v-model="row.shippingCode"
                filterable
                :placeholder="!row.warehouseCode && !row.shippingCode ? '请先选择仓库' : '请选择'"
                placement="bottom-end"
              >
                <el-option
                  v-for="item in row.shippingList"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
              <!--              <div class="text-warning fs-7">
                预估时效：{{
                  row?.shippingList?.find((v) => v.value === row.shippingCode)?.params?.timeliness
                }}
              </div>-->
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column v-if="!isWithoutSku" label="配送方式" prop="shippingCode" min-width="200">
          <template #header>
            配送方式
            <span class="text-danger">*</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemInfoList[${$index}].shippingCode`"
              :rules="[{ required: true, message: '请选择配送方式', trigger: 'change' }]"
            >
              <el-select
                v-model="row.shippingCode"
                filterable
                :placeholder="!row.warehouseCode && !row.shippingCode ? '请先选择仓库' : '请选择'"
              >
                <el-option-group
                  v-for="item in row.spList"
                  :label="item?.spName"
                  :key="item?.spCode"
                >
                  <el-option
                    v-for="shipping of item.shippingList"
                    :key="item.spCode + ',' + shipping.value"
                    :label="shipping.desc"
                    :value="item.spCode + ',' + shipping.value"
                  />
                </el-option-group>
              </el-select>
              <!--              <div class="text-warning fs-7">
                预估时效：{{
                  row?.shippingList?.find((v) => v.value === row.shippingCode)?.params?.timeliness
                }}
              </div>-->
            </el-form-item>
          </template>
        </el-table-column>
        <!--        <el-table-column label="库存" prop="inventory" min-width="130" />-->
        <el-table-column label="操作" fixed="right" width="84px">
          <template #default="{ row, $index }">
            <el-button link type="primary" @click="copyRow(row, $index)" underline="never">
              复制
            </el-button>
            <span></span>
            <el-button link type="danger" @click="remove($index)" underline="never">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </CustomCard>
    <CustomCard :loading="loading" title="订单信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="卖家账号">
            {{ form?.baseInfo?.shopAccount || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际交易额">0</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运费">
            <NumberInput
              v-model="form.baseInfo.shipAmount"
              :precision="2"
              :min="0"
              :max="100000000"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="货币类型"
            prop="baseInfo.currencyCode"
            :rules="[{ required: true, message: '请选择货币类型', trigger: 'change' }]"
          >
            <CurrencySelect v-model="form.baseInfo.currencyCode" style="width: 100%" />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="唛头">
            <el-input v-model="form.baseInfo.shippingMark" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户CRM来源单号">
            <el-input v-model="form.baseInfo.sourceCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单备注">
            <el-input v-model="form.baseInfo.orderRemark" clearable />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="附件">
            <KeenFileUpload
              accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
              class="packing-upload"
              directory="erp/order/attachment"
              ref="uploadRef"
              v-model="fileList"
              :limit="5"
            >
              <el-button plain type="primary" size="small">
                <el-icon class="Root-tyicon icon-Root-tyshangchuanwenjian" />
                <span>添加附件</span>
              </el-button>
              <template v-if="fileList.length === 0">
                <span class="ms-5 text-gray-500">支持上传图片/PDF/EXCEL/WORD文件</span>
              </template>
            </KeenFileUpload>
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
  </el-form>
  <!-- <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="handleSave('draft')">保存</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave('submit')">
        汇总发起申请
      </el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave('autoSubmit')">
        立即申请
      </el-button>
    </el-space>
  </div> -->
  <ProductDialog
    customerCode="lyorder"
    :countryCode="form.receiveInfo.countryCode"
    :currencyCode="form.baseInfo.currencyCode"
    :searchErpQuotation="true"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="form.itemInfoList"
    confirm-text="确认"
    type="supplierSku"
    title="选择商品"
    isRequisition
  />
  <AddDialog ref="addDialogRef" @success="handleAddSuccess" />
</template>

<script setup lang="ts" name="requisitionAdd">
  import { erpApi, memberApi, platformApi, productApi, omsApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import { ElMessage, FormInstance } from 'element-plus';
  import type { OdoDetailSaveReq } from '@/api/erp/data-contracts';
  import { openWindow } from '@/utils';
  import ProductDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/productDialog.vue';
  import { nextTick } from 'vue';
  import TipTable from '@/views/supplyChainManage/requisition/components/tipTable.vue';
  import { useTabs } from '@/hooks/tabs';
  import AddDialog from '@/views/supplyChainManage/requisition/components/addDialog.vue';
  import CustomCard from '@/components/CustomCard/index.vue';
  import AuditMember from './components/AuditMember.vue';
  import DeptMember from './components/DeptMember.vue';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const fileList = ref([]);

  type LocalForm = Omit<Required<OdoDetailSaveReq>, 'baseInfo'> & {
    baseInfo: Omit<Required<OdoDetailSaveReq>['baseInfo'], 'planner'> & {
      planner: string[];
    };
  };

  const form = ref<LocalForm>({
    isDaft: true,
    baseInfo: {
      shopAccount: 'lingyong',
      actualAmount: 0,
      shipAmount: 0,
      shippingMark: '',
      orderRemark: '',
      currencyCode: 'USD',
      type: 1,
      orderAttachmentList: [],
      planner: [],
      gtmApprove: '',
      customer: '',
      channelApprove: '', // 渠道审批人
    },
    requisitionInfo: {
      requisitioner: '',
      requisitionType: '',
      requisitionUse: '',
      noticeFlag: 0,
      requisitionScene: '', // 渠道
      marketRegion: '', // 市场
    },
    receiveInfo: {
      name: '',
      phone: '',
      mobile: '',
      email: '',
      zipcode: '',
      countryCode: '',
      province: '',
      city: '',
      area: '',
      address: '',
      houseNumber: '',
      address2: '',
    },
    itemInfoList: [],
  });

  const productDialogVisible = ref(false);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    // console.log(`list`, list, selected);
    if (selected) {
      if (list.length) {
        plannerCallBack(list);
      }
      const oldList = form.value.itemInfoList;
      const newList = list.filter(Boolean).map((item: any) => {
        const same: any = oldList?.find((old: any) => {
          return old.skuCode === item.skuCode;
        });
        const obj = {
          productName: item.productTitle || item.productName,
          productTitle: item.productTitle || item.productName,
          productSku: same ? same.productSku : item.productSku,
          supplySkuItemList: same ? same.supplySkuItemList : item.supplySkuItemList,
          inventory: same ? same.inventory : item.inventory,
          skuCode: item.skuCode,
          warehouseList: same ? same.warehouseList : item.warehouseList,
          supplySkuList: same ? same.supplySkuList : item.supplySkuList,
          shippingList: same ? same.shippingList : item.shippingList,
          deliveryList: same ? same.deliveryList : item.deliveryList || [],
          deliveryCode: same ? same.deliveryCode : '',
          // deliveryCode: deliveryCode?.toString() || '',
          qty: same ? same.qty : 1,
          shippingCode: same ? same.shippingCode : item.shippingCode,
          supplySku: same ? same.supplySku : item.supplySku,
          warehouseCode: same ? same.warehouseCode : item.warehouseCode,
          planner: item.planner || same?.planner,
          spList: same ? same.spList : item.spList
        };
        return obj;
      });
      const res: any = await omsApi.omsOrderReferenceParamsBySkuCode({
        countryCode: form.value.receiveInfo.countryCode,
        skuCodeList: newList.map((item) => item.skuCode),
        type: -1,
      });
      form.value.itemInfoList = newList.map((item) => {
        if (item.deliveryList?.length === 0) {
          Reflect.set(item, 'deliveryList', res.paramMap[item.skuCode]);
          // if (deliveryCode) handleDeliveryCodeChange(item.deliveryCode, item, item.deliveryList);
        }
        item.salePrice = 0;
        return item;
      });
      productDialogVisible.value = false;
    } else {
      productDialogVisible.value = false;
    }
  };
  const plannerCallBack = (list: any[]) => {
    if (!list.length || !form.value.baseInfo.planner) return;
    const newPlanner = Array.from(
      new Set(
        list
          .filter((e) => e.planner && !form.value.baseInfo.planner?.includes(e.planner))
          .map((e) => e.planner) // 直接返回e.planner
      )
    );
    form.value.baseInfo.planner.push(...newPlanner);
  };
  const loading = ref(false);
  const productLoading = ref(false);
  const queryDetail = async (code = route.query?.code) => {
    if (!code) return;
    loading.value = true;
    const res = await erpApi
      .luteosErpOdoQueryCommonDetail({
        code: code as string,
      })
      .finally(() => {
        loading.value = false;
      });
    form.value = res;
    form.value.baseInfo.code = null;
    form.value.requisitionInfo = {
      requisitioner: res?.baseInfo?.requisitionerCode,
      requisitionType: res?.baseInfo?.requisitionType,
      requisitionUse: res?.baseInfo?.requisitionUse,
      isOutSide: res?.baseInfo?.isOutSide,
      noticeFlag: res?.baseInfo?.noticeFlag || 0,
    };
    //  requisitionScene: '', // 渠道
    //   marketRegion: '', // 市场
    form.value.requisitionInfo.requisitionScene = res?.baseInfo?.requisitionScene;
    form.value.requisitionInfo.marketRegion = res?.baseInfo?.marketRegion;
    form.value.baseInfo.customer = res?.baseInfo?.customer;
    // 显示 客户名称
    if (res?.baseInfo?.requisitionScene === requisitioSceneList.value[0].desc) {
      showCustomer.value = false;
    } else if (res?.baseInfo?.requisitionScene === requisitioSceneList.value[1].desc) {
      showCustomer.value = true;
    }
    form.value.baseInfo.currencyCode = res?.odoExtraInfo?.currencyCode;
    form.value.baseInfo.shopAccount = res?.odoExtraInfo?.shopCode;
    form.value.baseInfo.shipAmount = res?.odoExtraInfo?.shipAmount;
    form.value.baseInfo.orderRemark = res?.baseInfo?.remark;
    form.value.baseInfo.gtmApprove = res?.baseInfo?.gtmApprove;
    form.value.baseInfo.noticeFlag = res?.baseInfo?.noticeFlag;
    form.value.baseInfo.planner = res?.baseInfo?.planner?.split(',');
    if (isWithoutSku.value) {
      const params = await erpApi.luteosErpOrderReferenceParamsByNoSkuCode();
      form.value.itemInfoList = form.value.itemInfoList.map((item) => {
        item.deliveryList = params?.deliveryList;
        item.warehouseList = params?.deliveryList?.find(
          (k) => k.deliveryCode === item.deliveryCode
        )?.warehouseList;
        item.shippingList = params?.deliveryList
          ?.find((k) => k.deliveryCode === item.deliveryCode)
          ?.warehouseList?.find((k) => k.warehouseCode === item.warehouseCode)?.shippingList;
        return item;
      });
    } else {
      // 回显唯一性 渠道编码+物流承运商
      // form.value.itemInfoList.map((item) => {
      //   if (item.spCode) {
      //     item.shippingCode = item.spCode + ',' + item.shippingCode;
      //   }
      // });
      productLoading.value = true;
      const params: any = await omsApi.omsOrderReferenceParamsBySkuCode({
        countryCode: form.value.receiveInfo.countryCode,
        skuCodeList: form.value?.itemInfoList?.map((item) => item?.skuCode),
        type: -1,
      });
      form.value.itemInfoList.forEach((item: any) => {
        item.deliveryList = params?.paramMap?.[item.skuCode];
        item.warehouseList = params?.paramMap?.[item.skuCode]?.find(
          (k) => k.deliveryCode === item.deliveryCode
        )?.warehouseList;
        // 承运商列表
        item.spList = params?.paramMap[item.skuCode]
          ?.find((k) => k.deliveryCode === item.deliveryCode)
          ?.warehouseList?.find((k) => k.warehouseCode === item.warehouseCode)?.spList;
        item.shippingCode = item.spCode ? item.spCode + ',' + item.shippingCode : item.shippingCode;
        item.shippingList = params?.paramMap?.[item.skuCode]
          ?.find((k) => k.deliveryCode === item.deliveryCode)
          ?.warehouseList?.find((k) => k.warehouseCode === item.warehouseCode)?.shippingList;

        // 只有在必要参数都存在时才调用API
        if (item.deliveryCode && item.skuCode && item.warehouseCode) {
          omsApi.omsCommonStockQuerySupplySkuList({
              deliverType: item.deliveryCode,
              skuCode: item.skuCode,
              warehouseCode: item.warehouseCode,
            })
            .then((r) => {
              item.supplySkuItemList = r.supplySkuItemList || [];
              item.productSku = r.supplySkuItemList?.[0] ? r.supplySkuItemList[0]?.supplySku : '';
              // 设置库存信息：根据当前商品的productSku找到对应的库存
              const matchedSupplySku = r.supplySkuItemList?.find(
                (supplyItem) => supplyItem?.supplySku === item.productSku
              );
              item.inventory = matchedSupplySku?.inventory || 0;
              console.log('item.supplySkuItemList', item.supplySkuItemList);
            })
            .catch((error) => {
              console.error('查询供应SKU列表失败:', error);
              item.supplySkuItemList = [];
              item.inventory = 0; // 查询失败时设置库存为0
            });
        } else {
          item.supplySkuItemList = [];
          item.inventory = 0; // 缺少必要参数时设置库存为0
        }
      });
      productLoading.value = false;
    }
    if (form.value.requisitionInfo.requisitioner) {
      changeRequisitioner();
    }
  };

  // nextTick(() => {
  //   queryDetail();
  // });

  const GTMMemberList = ref([]); // 品线整合营销部全部员工
  const getGTMMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'product_line_integration_sales_dept',
      searchChildDept: true,
    });
    GTMMemberList.value = res.memberList;
    if (form.value.requisitionInfo.requisitioner) {
      changeRequisitioner();
    }
  };
  getGTMMemberList();
  const retailMemberList: any = ref([]); // 品线整合营销部全部员工
  const getRetailMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'retail_channel_center',
      searchChildDept: true,
    });
    retailMemberList.value = res.memberList;
    if (form.value.baseInfo.channelApprove) {
      changeRequisitioner();
    }
  };
  getRetailMemberList();
  const gtmApproveRequired = ref(false); // 是否品线整合营销部
  const retailApproveRequired = ref(false); // 是否 零售与营销渠道中心的员工

  // 当领用人的组织架构为品线整合营销部（数据字典支持配置），GTM审批人展示在页面且为必填
  // 领用人所属一级部门=零售与渠道营销中心时 ,渠道审批人展示在页面且为必填
  const changeRequisitioner = (selectChange: any) => {
    const findIndex = GTMMemberList.value.findIndex((res) => {
      return res.memberCode == form.value.requisitionInfo.requisitioner;
    });
    gtmApproveRequired.value = findIndex > -1;
    // console.log(form.value.requisitionInfo.requisitioner);
    const findIndex2 = retailMemberList.value.findIndex((res) => {
      return res.memberCode === form.value.requisitionInfo.requisitioner;
    });
    retailApproveRequired.value = findIndex2 > -1;
    // 清空 渠道审批人
    if (form.value.baseInfo.channelApprove && selectChange) {
      form.value.baseInfo.channelApprove = '';
    }
  };
  const isOutSideChange = () => {
    // 品牌周边=是，计划审批人和GTM审批人字段不展示,清空值
    if (form.value.requisitionInfo.isOutSide == 1) {
      form.value.baseInfo.gtmApprove = '';
      form.value.baseInfo.planner = [];
    }
  };
  const handleCountryChange = async (val: string) => {
    // const res: any = await erpApi.luteosErpOrderReferenceParamsBySkuCode({
    //   countryCode: val,
    //   skuCodeList: form.value.itemInfoList.map((item) => item.skuCode),
    //   type: -1,
    // });

    // form.value.itemInfoList?.forEach((item) => {
    //   item.deliveryList = res.paramMap[item.skuCode];
    //   item.warehouseList = res.paramMap[item.skuCode]?.find(
    //     (k) => k.deliveryCode === item.deliveryCode
    //   )?.warehouseList;
    //   handleWarehouseCodeChange(item.warehouseCode, item, item.warehouseList);
    // });
    if (val !== 'US') {
      formRef.value.clearValidate('receiveInfo.province');
    }
    form.value.itemInfoList = [];
  };

  // 发货方式改变
  const handleDeliveryCodeChange = (val: string, currentRow: any, currentDeliveryList) => {
    const result = currentDeliveryList.find((item) => item.deliveryCode === val);
    currentRow.warehouseList = result ? cloneDeep(result.warehouseList) : [];
    // 清空
    currentRow.warehouseCode = '';
    currentRow.shippingCode = '';
    currentRow.supplySku = '';
    if (!isWithoutSku.value) {
      currentRow.shippingList = [];
      currentRow.supplySkuItemList = [];
      currentRow.spList = [];
    }
  };
  // 仓库发生改变
  const handleWarehouseCodeChange = async (val: string, currentRow: any, currentWarehouseList) => {
    const result = currentWarehouseList.find((item) => item.warehouseCode === val);
    currentRow.shippingList = result ? cloneDeep(result.shippingList) : [];
    if (isWithoutSku.value) {
      currentRow.inventory = 99999;
      currentRow.shippingCode =
        currentRow.shippingList?.length > 0 ? currentRow.shippingList[0].value : '';
      return;
    }
    currentRow.spList = result ? cloneDeep(result.spList) : [];
    currentRow.shippingList = result ? cloneDeep(result.shippingList) : [];
    currentRow.shippingCode =
      currentRow?.spList[0].shippingList.length > 0
        ? currentRow?.spList[0].spCode + ',' + currentRow?.spList[0].shippingList[0].value
        : '';
    let res = await omsApi.omsCommonStockQuerySupplySkuList({
      deliverType: currentRow.deliveryCode,
      skuCode: currentRow.skuCode,
      warehouseCode: val,
    });
    if (res) {
      currentRow.supplySkuItemList = res.supplySkuItemList;
      currentRow.productSku = currentRow.supplySkuItemList[0]
        ? currentRow.supplySkuItemList[0].supplySku
        : '';
      currentRow.inventory = res.supplySkuItemList?.find(
        (item) => item?.supplySku === currentRow.productSku
      )?.inventory;
    }
  };
  // 供应链SKU改变
  const handleSupplySkuChange = async (val: string, currentRow: any, currentSupplySkuList) => {
    const result = currentSupplySkuList.find((item) => item.supplySku === val);
    currentRow.inventory = result ? result.inventory : 0;
  };
  // 自动分仓
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

  // 添加无SKU领用物品
  const addDialogRef = ref(null);
  const handleAdd = () => {
    if (isWithoutSku.value) {
      addDialogRef.value?.open();
    } else {
      productDialogVisible.value = true;
    }
  };

  const handleAddSuccess = async (list) => {
    form.value.itemInfoList = form.value.itemInfoList?.concat(list);
    const res = await erpApi.luteosErpOrderReferenceParamsByNoSkuCode();
    form.value.itemInfoList = form.value.itemInfoList.map((item) => {
      item.qty = 1;
      Reflect.set(item, 'deliveryList', res?.deliveryList);
      item.salePrice = 0;

      return item;
    });
  };

  const saveLoading = ref(false);
  const formRef = ref<FormInstance>();
  /** 策略模式储存 保存/提交/自动提交的配置项 */
  const ACTION_MAP = {
    draft: { isDaft: true, isAutoSubmit: false, api: erpApi.luteosErpOdoSaveDraft },
    submit: { isDaft: false, isAutoSubmit: false, api: erpApi.luteosErpOdoCommonSave },
    autoSubmit: { isDaft: false, isAutoSubmit: true, api: erpApi.luteosErpOdoCommonSave },
  } as const;
  type submitType = 'draft' | 'submit' | 'autoSubmit';
  /**
   * 根据提交行为进行不同的校验行为
   * @param action 提交行为
   */
  const ensureValid = async (action: submitType) => {
    if (action === 'draft') {
      await formRef.value?.clearValidate();
      return true;
    }
    const res = await formRef.value?.validate().catch(() => false);
    return !!res;
  };
  /**
   * 拼接对象
   */
  const objGenerate = () => {};
  /**
   * 根据不同的提交进行不同的请求
   * @param action 提交行为
   */
  const handleSave = async (action: submitType) => {
    if (saveLoading.value) return false;
    const valid = await ensureValid(action);
    if (!valid) return false;
    const { api, isDaft, isAutoSubmit } = ACTION_MAP[action];
    try {
      saveLoading.value = true;
      if (fileList.value.length > 0) {
        form.value.orderAttachmentList = fileList.value.map((item: any) => {
          return {
            fileUrl: item.ossKey,
            fileName: item.name,
          };
        });
      } else form.value.orderAttachmentList = [];
      const formData = cloneDeep(form.value);
      formData.itemInfoList.forEach((item) => {
        let arr = item.shippingCode?.split(',') || [];
        if (arr?.length == 2) {
          item.spCode = arr[0];
          item.shippingCode = arr[1];
        }
      });
      formData.baseInfo.planner = formData.baseInfo.planner?.join(',');
      await api({
        ...formData,
        isDaft,
        isAutoSubmit,
      });
      ElMessage.success(`${action === 'draft' ? '保存草稿' : '提交'}成功`);
      // closeTabAndRefresh('requisition');
      return true;
      // router.push({ name: 'requisition', query: { refresh: 1 } });
    } catch (e: any) {
      // ElMessage.error(e.message || '提交失败');
      return false;
    } finally {
      saveLoading.value = false;
    }
  };
  defineExpose({
    init: queryDetail,
    handleSave,
  });
  const save = async (isSubmit = false, isAutoSubmit = false) => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      if (fileList.value.length > 0) {
        form.value.orderAttachmentList = fileList.value.map((item) => {
          return {
            fileUrl: item.ossKey,
            fileName: item.name,
          };
        });
      } else form.value.orderAttachmentList = [];
      const formData = cloneDeep(form.value);
      formData.baseInfo.planner = formData.baseInfo.planner?.join(',');
      const res = await erpApi.luteosErpOdoCommonSave({
        ...formData,
        isDaft: !isSubmit,
        isAutoSubmit,
      });
      ElMessage.success('提交成功');
      closeTabAndRefresh('requisition');
      router.push({
        name: 'requisition',
        query: { refresh: 1 },
      });
    } finally {
      saveLoading.value = false;
    }
  };

  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      router.push({
        name: 'requisition',
      });
    }
  };
  // 移除产品信息
  const remove = (index: number) => {
    if (index < 0 || index >= form.value.itemInfoList.length) {
      console.warn('index is out of range', index);
      return;
    }
    const removeItem = form.value.itemInfoList[index] as any;
    const plannerToRemove = removeItem.planner;

    form.value.itemInfoList.splice(index, 1);

    // 检查是否还有其他 item 使用相同的 planner
    if (plannerToRemove && form.value.baseInfo.planner?.length) {
      const isPlannerStillUsed = form.value.itemInfoList.some(
        (item) => item.planner === plannerToRemove
      );

      // 如果没有其他 item 使用这个 planner，才从 baseInfo.planner 中移除
      if (!isPlannerStillUsed) {
        const plannerIndex = form.value.baseInfo.planner.findIndex(
          (planner) => planner === plannerToRemove
        );
        if (plannerIndex > -1) {
          form.value.baseInfo.planner.splice(plannerIndex, 1);
        }
      }
    }
  };

  // 复制产品信息
  const copyRow = (row, index) => {
    form.value.itemInfoList.splice(index + 1, 0, cloneDeep(row));
    // form.value.itemInfoList.push(cloneDeep(row));
  };
  const requisitionTypeList = ref<any[]>([]);
  platformApi
    .platformDict({
      dictCodes: ['lingyong_type'],
    })
    .then((res) => {
      requisitionTypeList.value = res.dictMap?.lingyong_type || [];
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
  const requisitioSceneList = ref<any[]>([]);
  platformApi
    .platformDict({
      dictCodes: ['lingyong_scene'],
    })
    .then((res) => {
      requisitioSceneList.value = res.dictMap?.lingyong_scene || [];
    });
  // 市场 场景的市场大区
  const marketRegionMarket = ref<any[]>([]);
  platformApi
    .platformDict({
      dictCodes: ['market_region_market'],
    })
    .then((res) => {
      marketRegionMarket.value = res.dictMap?.market_region_market || [];
    });
  const marketRegionChannel = ref<any[]>([]);
  platformApi
    .platformDict({
      dictCodes: ['market_region_channel'],
    })
    .then((res) => {
      marketRegionChannel.value = res.dictMap?.market_region_channel || [];
    });
  const showCustomer = ref(false);
  const handleChange = (scene: any) => {
    form.value.requisitionInfo.marketRegion = '';
    form.value.baseInfo.customer = '';
    if (form.value.baseInfo.channelApprove) {
      form.value.baseInfo.channelApprove = '';
    }
    // 市场
    if (scene === requisitioSceneList.value[0].desc) {
      showCustomer.value = false;
    } else if (scene === requisitioSceneList.value[1].desc) {
      showCustomer.value = true;
    }
  };

  const isWithoutSku = computed(() => {
    return form.value.requisitionInfo.requisitionType === '无SKU领用';
    // return false;
  });

  const lastRequisitionType = ref('');
  const changeRequisitionType = (val) => {
    if (val === '无SKU领用') {
      // form.value.requisitionInfo.isOutSide = 1;
      form.value.baseInfo.planner = [];
      form.value.baseInfo.noticeFlag = 0;
      formRef.value?.clearValidate('baseInfo.planner');
      form.value.itemInfoList = [];
    }
    if (lastRequisitionType.value === '无SKU领用') {
      form.value.itemInfoList = [];
    }
    lastRequisitionType.value = val;
  };

  onMounted(() => {
    form.value.requisitionInfo.requisitionType = route.query?.requisitionType || '';
    form.value.receiveInfo.name = route.query?.name || '';
    form.value.receiveInfo.phone = route.query?.phone || '';
    form.value.receiveInfo.countryCode = route.query?.countryCode || '';
    form.value.receiveInfo.province = route.query?.province || '';
    form.value.receiveInfo.city = route.query?.city || '';
    form.value.receiveInfo.address2 = route.query?.address2 || '';
  });
</script>

<style scoped lang="scss">
  .add-form {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
      font-size: 12px;
    }
  }

  .el-form-item {
    :deep(.el-select .el-select__wrapper) {
      min-width: 120px;
    }
  }
  .info-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
  }
  .tips {
    color: #8a9099;
    font-size: 12px;
  }
</style>
