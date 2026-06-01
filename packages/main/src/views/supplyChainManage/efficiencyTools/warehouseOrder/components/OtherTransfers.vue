<template>
  <div class="text-center py-3" style="background: var(--el-fill-color-light)">
    <span class="fs-3 text-gray-600">货物从谷仓海外仓转仓至其他平台/门店仓库</span>
  </div>
  <el-steps class="mb-4" simple>
    <el-step status="finish" title="配货">
      <template #icon>
        <SvgIcon class-name="el-input__icon svg-icon-1" icon="allocation" />
      </template>
    </el-step>
    <el-step status="finish" title="换标">
      <template #icon>
        <SvgIcon class-name="el-input__icon svg-icon-3" icon="relabeling" />
      </template>
    </el-step>
    <el-step status="finish" title="出库">
      <template #icon>
        <SvgIcon class-name="el-input__icon svg-icon-3" icon="outbound" />
      </template>
    </el-step>
    <el-step status="finish" title="配送">
      <template #icon>
        <SvgIcon class-name="el-input__icon svg-icon-1" icon="delivery" />
      </template>
    </el-step>
    <el-step status="finish" title="其他平台/门店">
      <template #icon>
        <SvgIcon class-name="el-input__icon svg-icon-2" icon="store" />
      </template>
    </el-step>
  </el-steps>
  <el-form
    :model="form"
    ref="formRef"
    label-width="110px"
    :rules="rules"
    scroll-to-error
    :disabled="isDetail"
  >
    <KeenCard title="基础信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="发货仓库" prop="warehouseCode">
            <el-select
              v-model="form.warehouseCode"
              @change="
                form.wpCode = '';
                form.deliveryService.smCode = '';
              "
              filterable
              clearable
            >
              <el-option
                v-for="item in maps['发货仓库']"
                :value="item.value"
                :label="item.desc"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发货物理仓">
            <template #label>
              <el-tooltip placement="top">
                <template #content>
                  <div class="mw-600px">
                    <p>
                      选择物理仓后，系统会根据您指定的物理仓完成出库，当指定物理仓库存不足时，则创建订单失败。
                    </p>
                  </div>
                </template>
                发货物理仓
              </el-tooltip>
            </template>
            <el-select v-model="form.wpCode" filterable clearable>
              <el-option
                v-for="item in maps['发货仓库']?.find(
                  (warehouse) => warehouse.value === form.warehouseCode
                )?.childrenList"
                :value="item.value"
                :label="item.desc"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参考单号" required>
            <el-input v-model="form.referenceNo" maxlength="50" show-word-limit disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="收件人信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="收件人名" prop="recipientInfo.name">
            <el-input v-model="form.recipientInfo.name" maxlength="48" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收件人姓" prop="">
            <el-input v-model="form.recipientInfo.lastName" maxlength="48" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="国家/地区" prop="recipientInfo.countryCode">
            <el-select
              v-model="form.recipientInfo.countryCode"
              filterable
              clearable
              @change="handleCountryChange"
            >
              <el-option
                v-for="item in maps['国家']"
                :label="item.desc"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="省/州"
            prop="recipientInfo.province"
            :required="['US', 'AU'].includes(form.recipientInfo.countryCode)"
          >
            <el-input v-model="form.recipientInfo.province" maxlength="20" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市" prop="recipientInfo.city">
            <el-input v-model="form.recipientInfo.city" maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮编" prop="recipientInfo.zipcode">
            <el-input v-model="form.recipientInfo.zipcode" maxlength="20" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址1" prop="recipientInfo.address1">
            <template #label>
              <el-tooltip placement="top">
                <template #content>
                  <div class="mw-600px">
                    <p>
                      市面上绝大部分物流服务商，不支持地址1超过50字符，超过的部分，要拆解到地址2。（地址1、地址2必填一个)
                    </p>
                  </div>
                </template>
                地址1
              </el-tooltip>
            </template>
            <el-input v-model="form.recipientInfo.address1" maxlength="50" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="门牌号" prop="">
            <el-input v-model="form.recipientInfo.doorplate" maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址2" prop="">
            <el-input v-model="form.recipientInfo.address2" maxlength="50" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="">
            <div class="d-flex gap-2">
              <el-input class="w-25" v-model="form.recipientInfo.areaCode" />
              <el-input
                class="w-75"
                v-model="form.recipientInfo.phone"
                maxlength="20"
                show-word-limit
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分机号" prop="">
            <el-input v-model="form.recipientInfo.ext" maxlength="8" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司名称" prop="">
            <el-input v-model="form.recipientInfo.company" maxlength="50" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" prop="">
            <el-input v-model="form.recipientInfo.email" maxlength="64" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货平台" prop="">
            <el-input v-model="form.recipientInfo.receivingPlatform" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="配送服务">
      <el-row>
        <el-col :span="8">
          <el-form-item label="配送方式" prop="deliveryService.isTruck">
            <el-select
              v-model="form.deliveryService.isTruck"
              filterable
              clearable
              @change="
                form.deliveryService.distributionType = '';
                form.deliveryService.smCode = '';
              "
            >
              <el-option
                v-for="item in maps['配送方式']"
                :value="parseInt(item.value)"
                :key="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配送商" prop="deliveryService.distributionType">
            <el-select
              v-model="form.deliveryService.distributionType"
              filterable
              clearable
              @change="form.deliveryService.smCode = ''"
            >
              <template #empty>
                <span v-if="!form.deliveryService.isTruck">请先选择配送方式</span>
              </template>
              <el-option
                v-for="item in maps['配送方式']?.find(
                  (delivery) => delivery.value == form.deliveryService.isTruck
                )?.childrenList"
                :value="parseInt(item.value)"
                :label="item.desc"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物流产品" prop="deliveryService.smCode">
            <el-select
              v-model="form.deliveryService.smCode"
              filterable
              clearable
              @change="handleSmCodeChange"
            >
              <template #empty>
                <span v-if="!form.warehouseCode">请先选择发货仓库</span>
                <span v-else-if="!form.deliveryService.distributionType">请先选择配送商</span>
              </template>
              <el-option
                v-for="item in maps['配送方式']
                  ?.find((delivery) => delivery.value == form.deliveryService.isTruck)
                  ?.childrenList?.find(
                    (distribution) => distribution.value == form.deliveryService.distributionType
                  )
                  ?.childrenList?.filter((k) => k.filter1List?.includes(form.warehouseCode))"
                :value="item.value"
                :label="item.desc"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="optionParams?.isOptionalBoard == 1">
          <el-form-item label="是否打板" prop="deliveryService.isOptionalBoard">
            <el-select v-model="form.deliveryService.isOptionalBoard">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="optionParams?.isSignature == 1">
          <el-form-item label="签名服务" prop="">
            <el-select v-model="form.deliveryService.isSignature">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="form.deliveryService.isTruck != 0 || form.deliveryService.distributionType != 2"
        >
          <el-form-item label="保险服务" prop="">
            <el-select v-model="form.deliveryService.isInsurance">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="库内服务">
      <el-row>
        <el-col :span="8">
          <el-form-item label="包材归属" prop="">
            <el-select
              v-model="form.warehouseService.customerPackageType"
              clearable
              @change="handleChange"
            >
              <el-option label="公有包材" value="PUBLIC" />
              <el-option label="私有包材" value="PRIVATE" disabled />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="包材要求"
            :prop="
              form.warehouseService.customerPackageType
                ? 'warehouseService.customerPackageRequirement'
                : ''
            "
          >
            <el-select
              v-model="form.warehouseService.customerPackageRequirement"
              :disabled="!form.warehouseService.customerPackageType"
            >
              <el-option
                v-for="item in maps['包材要求']"
                :label="item.desc"
                :value="parseInt(item.value)"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="每箱张贴货件签数" prop="warehouseService.boxMarkNum">
            <el-select v-model="form.warehouseService.boxMarkNum">
              <el-option label="0" :value="0" />
              <el-option label="1" :value="1" />
              <el-option label="2" :value="2" />
              <el-option label="3" :value="3" />
              <el-option label="4" :value="4" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="装箱信息" prop="">
            <el-space>
              <span v-if="cutLoading" class="text-primary">裁剪中...</span>
              <KeenFileUpload
                v-else
                ref="cutGuPdfRef"
                v-model="cutFile"
                directory="erp/transfers"
                @success="handleCut"
                :showFileList="false"
                accept=".pdf"
                :overflowHidden="false"
              >
                <el-link type="primary" :disabled="isDetail" :underline="false">裁剪箱唛</el-link>
              </KeenFileUpload>
              <el-link
                type="primary"
                :disabled="isDetail"
                :underline="false"
                @click="handleAutoFill"
              >
                自动填写（覆盖）
              </el-link>
              <el-link
                type="primary"
                :disabled="isDetail"
                :underline="false"
                @click="handleAutoCreate"
              >
                自动生成箱唛
              </el-link>
              <el-link
                type="primary"
                :disabled="
                  isDetail ||
                  !form.warehouseService.boxMarkNum ||
                  !form.warehouseService.packingList.length
                "
                :underline="false"
                @click="handleBatchImport"
              >
                批量导入箱唛
              </el-link>
            </el-space>
            <el-table :data="form.warehouseService?.packingList" v-loading="autoWriteLoading">
              <el-table-column label="序号" type="index" width="55px" />
              <el-table-column label="箱唛号">
                <template #default="{ row }">
                  <el-input v-model="row.boxMark" clearable />
                </template>
              </el-table-column>
              <el-table-column v-if="form.warehouseService.boxMarkNum > 0">
                <template #header>
                  <span class="text-danger">*</span>
                  货件标签
                </template>
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`warehouseService.packingList.${$index}.shipmentFile`"
                    :rules="rules.shipmentFile"
                  >
                    <KeenFileUpload
                      v-model="row.shipmentFile"
                      directory="erp/transfers"
                      accept=".pdf"
                      overflowHidden
                      manual
                      @file-delete="
                        (index) => {
                          row.shipmentFile.length ?? row.shipmentFile.splice(index, 1);
                        }
                      "
                      @change="
                        formRef
                          .validateField(`warehouseService.packingList.${$index}.shipmentFile`)
                          .catch(() => false)
                      "
                      @success="
                        (val, file) => {
                          handleUpload(val, file, row, 'shipmentFile', 'SHIPMENT_LABEL_ATTACHMENT');
                          formRef
                            .validateField(`warehouseService.packingList.${$index}.shipmentFile`)
                            .catch(() => false);
                        }
                      "
                    >
                      <el-button
                        link
                        type="primary"
                        :disabled="isDetail"
                        :underline="false"
                        :loading="shipFileLoading"
                      >
                        上传文件
                      </el-button>
                    </KeenFileUpload>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                v-if="
                  form.deliveryService.isTruck == 0 && form.deliveryService.distributionType != 0
                "
              >
                <template #header>
                  <span class="text-danger">*</span>
                  物流面单
                </template>
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`warehouseService.packingList.${$index}.logisticsFile`"
                    :rules="rules.logisticsFile"
                  >
                    <KeenFileUpload
                      class="packing-upload"
                      v-model="row.logisticsFile"
                      directory="erp/transfers"
                      accept=".pdf"
                      :overflowHidden="false"
                      @change="
                        formRef
                          .validateField(`warehouseService.packingList.${$index}.logisticsFile`)
                          .catch(() => false)
                      "
                      @success="
                        (val, file) => {
                          handleUpload(
                            val,
                            file,
                            row,
                            'logisticsFile',
                            'BOX_LOGISTIC_LABEL_ATTACHMENT'
                          );
                          formRef
                            .validateField(`warehouseService.packingList.${$index}.logisticsFile`)
                            .catch(() => false);
                        }
                      "
                    >
                      <el-link type="primary" :disabled="isDetail" :underline="false">
                        上传文件
                      </el-link>
                    </KeenFileUpload>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="报关面单"
                v-if="
                  form.deliveryService.isTruck == 0 && form.deliveryService.distributionType != 0
                "
              >
                <template #default="{ row }">
                  <el-form-item>
                    <KeenFileUpload
                      class="packing-upload"
                      v-model="row.customsFile"
                      directory="erp/transfers"
                      accept=".xlsx,.pdf,.docx,.jpg,.jpeg,.png"
                      :overflowHidden="false"
                      @success="
                        (val, file) => {
                          handleUpload(
                            val,
                            file,
                            row,
                            'customsFile',
                            'CUSTOMS_CLEARANCE_ATTACHMENT'
                          );
                        }
                      "
                    >
                      <el-link type="primary" :disabled="isDetail" :underline="false">
                        上传文件
                      </el-link>
                    </KeenFileUpload>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column>
                <template #header>
                  <span class="text-danger">*</span>
                  商品编码
                </template>
                <template #default="{ row, $index }">
                  <el-button type="primary" link @click="selectSku(row, $index)">
                    选择商品
                  </el-button>
                  <span
                    class="tip"
                    v-if="
                      row?.packingLineList?.length === 1 &&
                      row?.packingLineList[0]?.qtyBox === 0 &&
                      row?.packingLineList[0]?.productSku
                    "
                  >
                    该商品暂未拆箱
                  </span>
                  <el-form-item
                    v-for="(item, index) in row?.packingLineList"
                    :key="index"
                    :prop="`warehouseService.packingList.${$index}.packingLineList.${index}.productSku`"
                    :rules="rules.productSku"
                  >
                    <el-select-v2
                      v-model="item.productSku"
                      :options="selectOptions"
                      filterable
                      clearable
                      @change="
                        (val) => {
                          handleSelect(val, item);
                        }
                      "
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="120px">
                <template #header>
                  <span class="text-danger">*</span>
                  数量
                </template>
                <template #default="{ row, $index }">
                  <el-button type="primary" link />
                  <el-form-item
                    v-for="(item, index) in row?.packingLineList"
                    :key="index"
                    :prop="`warehouseService.packingList.${$index}.packingLineList.${index}.quantity`"
                    :rules="rules.quantity"
                  >
                    <NumberInput v-model="item.quantity" :precision="0" clearable />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120px" v-if="!isDetail">
                <template #default="{ row, $index }">
                  <el-button type="primary" link />
                  <el-form-item v-for="(item, index) in row?.packingLineList" :key="index">
                    <el-button
                      style="height: 32px"
                      type="danger"
                      link
                      @click="removePacking(row, $index, index)"
                    >
                      删除
                    </el-button>
                  </el-form-item>
                </template>
              </el-table-column>
              <template #append>
                <div class="d-flex justify-content-between">
                  <el-space>
                    <el-link
                      type="primary"
                      :disabled="isDetail"
                      :underline="false"
                      :icon="Plus"
                      @click="addPacking"
                    >
                      新增
                    </el-link>
                    <KeenFileUpload
                      class="packing-upload"
                      v-model="batchAddFile"
                      directory="erp/transfers"
                      @success="handleBatchAdd"
                      :showFileList="false"
                      :overflowHidden="false"
                    >
                      <el-link type="primary" :disabled="isDetail" :underline="false">
                        批量新增（覆盖）
                      </el-link>
                    </KeenFileUpload>
                    <el-link
                      type="primary"
                      :disabled="isDetail"
                      :underline="false"
                      @click="downloadTemp"
                    >
                      下载批量新增模板
                    </el-link>
                    <!--                    <ExportBtn
                      :service="erpApi.luteosErpWarehouseOrderExportGcWarehouseService"
                      :params="form.warehouseService"
                      link
                    >
                      下载模板
                    </ExportBtn>-->
                  </el-space>
                  <el-link
                    v-if="form.warehouseService.packingList?.length > 0 && !isDetail"
                    class="me-5"
                    type="primary"
                    :underline="false"
                    @click="clearAll"
                  >
                    全部清空
                  </el-link>
                </div>
              </template>
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="SKU换标服务" prop="">
            <div class="d-flex gap-2 w-100">
              <el-select
                style="width: 80px; min-width: 80px"
                v-model="form.warehouseService.isChangeLabel"
              >
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
              <el-select
                v-if="form.warehouseService.isChangeLabel === 1"
                class="w-100"
                v-model="form.warehouseService.changeLabelQtyPiece"
                placeholder="请选择每单件换标数"
                clearable
              >
                <el-option label="1" :value="1" />
                <el-option label="2" :value="2" />
              </el-select>
            </div>
          </el-form-item>
          <div class="tip">注：当选择是时，仓库会以您上传的标签覆盖原有SKU标签</div>
        </el-col>
        <el-col :span="8" v-if="form.warehouseService.isChangeLabel === 1">
          <el-form-item label="SKU换标要求" prop="">
            <el-select v-model="form.warehouseService.labelReplacementOption" filterable clearable>
              <el-option
                v-for="item in maps['SKU换标要求']"
                :label="item.desc"
                :value="parseInt(item.value)"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品信息">
            <el-table :data="skuList">
              <el-table-column label="商品编码" prop="productSku">
                <template #header>
                  <span class="text-danger">*</span>
                  商品编码
                </template>
              </el-table-column>
              <el-table-column label="商品中文名称" prop="productName" />
              <el-table-column label="商品总数量" prop="quantity" />
              <el-table-column v-if="form.warehouseService.isChangeLabel === 1">
                <template #header>SKU换标编码</template>
                <template #default="{ row, $index }">
                  <el-form-item :prop="`warehouseService.itemList.${$index}.productCode`">
                    <el-input v-model="row.productCode" clearable />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column v-if="form.warehouseService.isChangeLabel === 1">
                <template #header>
                  <span class="text-danger">*</span>
                  SKU换标标签
                </template>
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`warehouseService.itemList.${$index}.rebrandSkuFile`"
                    :rules="rules.rebrandSkuFile"
                  >
                    <KeenFileUpload
                      class="packing-upload"
                      v-model="row.rebrandSkuFile"
                      directory="erp/transfers"
                      accept=".pdf"
                      :overflowHidden="false"
                      @change="
                        formRef
                          .validateField(`warehouseService.itemList.${$index}.rebrandSkuFile`)
                          .catch(() => false)
                      "
                      @success="
                        (val, file) => {
                          handleUpload(val, file, row, 'rebrandSkuFile', 'REBRAND_SKU_ATTACHMENT');
                          formRef
                            .validateField(`warehouseService.itemList.${$index}.rebrandSkuFile`)
                            .catch(() => false);
                        }
                      "
                    >
                      <el-link type="primary" :disabled="isDetail" :underline="false">
                        上传文件
                      </el-link>
                    </KeenFileUpload>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                v-if="
                  form.warehouseService.isChangeLabel === 1 &&
                  form.warehouseService.labelReplacementOption == 2
                "
              >
                <template #header>
                  <span class="text-danger">*</span>
                  内件货物总数量
                </template>
                <template #default="{ row, $index }">
                  <el-form-item
                    :prop="`warehouseService.itemList.${$index}.labelReplacementQty`"
                    :rules="rules.labelReplacementQty"
                  >
                    <el-input v-model="row.labelReplacementQty" clearable />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="申报价值（USD）" prop="productDeclaredValue">
                <template #default="{ row }">
                  <NumberInput v-model="row.productDeclaredValue" :precision="2" />
                </template>
              </el-table-column>
              <!--              <el-table-column label="海关编码" />-->
              <template #append>
                <div class="fs-7">数量总和：{{ totalQuantity || 0 }}</div>
              </template>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard>
      <el-collapse accordion>
        <el-collapse-item title="国际件信息" name="国际件信息">
          <template #title>
            <h5>国际件信息</h5>
          </template>
          <el-row v-if="form.vatChangeInfo">
            <el-col :span="8">
              <el-form-item prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>
                          1.
                          所有从欧盟境外进入欧盟境内且销售价格≤150EUR的B2C包裹，在平台代扣代缴后，卖家将会获得IOSS号码。
                        </p>
                        <p>
                          2.
                          DPD国际件非必填，但是若未填则仍需使用DDU的付税模式且只能发以下7个国家：Germany,
                          France, Netherlands, Ireland, Spain, Austria & Italy。
                        </p>
                        <p>
                          3. Hermes国际非必填，但是若未填则仍需使用DDU的付税模式且只能发Ireland and
                          the Netherlands。
                        </p>
                        <p>4. 发往北爱尔兰的包裹暂时不需要IOSS。</p>
                      </div>
                    </template>
                    IOSS号码
                  </el-tooltip>
                </template>
                <el-input v-model="form.vatChangeInfo.iossNumber" maxlength="100" show-word-limit />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>1. DPD国际件暂时非必填。</p>
                        <p>2. hermes国际件暂时非必填。</p>
                        <p>3. 发往欧盟国家非欧盟地区，需填写德国的发件人VAT。</p>
                      </div>
                    </template>
                    发件人VAT
                  </el-tooltip>
                </template>
                <el-input v-model="form.vatChangeInfo.shipperVat" maxlength="100" show-word-limit />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人EORI" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>1. DPD国际件暂时非必填。</p>
                        <p>2. hermes国际件暂时非必填。</p>
                        <p>3. 发往欧盟国家非欧盟地区，需填写德国的发件人VAT。</p>
                      </div>
                    </template>
                    发件人EORI
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperEori"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>法国GLS非欧盟件必填。</p>
                      </div>
                    </template>
                    发件人公司名称
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperCompanyName"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT注册公司名称" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>英国DPD国际件必填。</p>
                      </div>
                    </template>
                    发件人VAT注册公司名称
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperVatCompanyName"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT注册国/地区" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>英国DPD国际件必填。</p>
                      </div>
                    </template>
                    发件人VAT注册国/地区
                  </el-tooltip>
                </template>
                <el-select v-model="form.vatChangeInfo.shipperVatCountry" filterable clearable>
                  <el-option
                    v-for="item in maps['国家']"
                    :label="item.desc"
                    :value="item.value"
                    :key="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT注册城市" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>英国DPD国际件必填。</p>
                      </div>
                    </template>
                    发件人VAT注册城市
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperVatCity"
                  maxlength="50"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT注册地邮编" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>英国DPD国际件必填。</p>
                      </div>
                    </template>
                    发件人VAT注册地邮编
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperVatZipCode"
                  maxlength="20"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT注册地址1" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>英国DPD国际件必填。</p>
                      </div>
                    </template>
                    发件人VAT注册地址1
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperVatStreetAddress1"
                  maxlength="50"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发件人VAT注册地址2" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>英国DPD国际件必填。</p>
                      </div>
                    </template>
                    发件人VAT注册地址2
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.shipperVatStreetAddress2"
                  maxlength="50"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人VAT" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>
                          1.
                          DPD国际发B2C包裹，则收件人的VAT暂时非必填；DPD国际发B2B包裹，则收件人的VAT必填。
                        </p>
                        <p>2. hermes国际暂时非必填。</p>
                      </div>
                    </template>
                    收件人VAT
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.recipientVat"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人EORI" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>1. DPD国际件暂时非必填。</p>
                        <p>2. hermes国际暂时非必填。</p>
                      </div>
                    </template>
                    收件人EORI
                  </el-tooltip>
                </template>
                <el-input
                  v-model="form.vatChangeInfo.recipientEori"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人VAT注册国/地区" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>
                          所填写收件人VAT号的注册国家，使用法国DHL EXPRESS渠道发B2B必填，B2C非必填。
                        </p>
                      </div>
                    </template>
                    收件人VAT注册国/地区
                  </el-tooltip>
                </template>
                <el-select v-model="form.vatChangeInfo.recipientVatCountry" filterable clearable>
                  <el-option
                    v-for="item in maps['国家']"
                    :label="item.desc"
                    :value="item.value"
                    :key="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人EORI注册国/地区" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>
                          所填写收件人EORI号的注册国家，使用法国DHL
                          EXPRESS渠道发B2B必填，B2C非必填。
                        </p>
                      </div>
                    </template>
                    收件人EORI注册国/地区
                  </el-tooltip>
                </template>
                <el-select v-model="form.vatChangeInfo.recipientEoriCountry" filterable clearable>
                  <el-option
                    v-for="item in maps['国家']"
                    :label="item.desc"
                    :value="item.value"
                    :key="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="PID号码" prop="">
                <template #label>
                  <el-tooltip placement="top">
                    <template #content>
                      <div class="mw-600px">
                        <p>1. 该号码为收件人的身份证号码。</p>
                        <p>
                          2. 发往西班牙（150€以上）意大利的DPD国际件需必填，其他国家暂时非必填。
                        </p>
                      </div>
                    </template>
                    PID号码
                  </el-tooltip>
                </template>
                <el-input v-model="form.vatChangeInfo.pidNumber" maxlength="100" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </KeenCard>
    <KeenCard title="其他信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="装箱清单">
            <KeenFileUpload
              v-if="baseWarehouseCode"
              ref="packingFileUpload"
              class="packing-upload"
              v-model="form.otherInfo.packingFile"
              directory="erp/transfers"
              accept=".pdf,.png,.zpl,.zpl2"
              :overflowHidden="false"
              @success="
                (val, file) => {
                  handleUpload(
                    val,
                    file,
                    form.otherInfo,
                    'packingFile',
                    'ORDER_PACKING_ATTACHMENT'
                  );
                }
              "
            >
              <el-link type="primary" :disabled="isDetail" :underline="false">上传文件</el-link>
            </KeenFileUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="">
            <el-input
              v-model="form.otherInfo.orderDesc"
              type="textarea"
              :rows="5"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!isDetail">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading || fileLoading">
        {{ fileLoading ? '文件上传中...' : '保存草稿' }}
      </el-button>
      <el-button type="primary" @click="submit" :loading="submitLoading || fileLoading">
        {{ fileLoading ? '文件上传中...' : '提交' }}
      </el-button>
    </el-space>
  </div>
  <GcSkuDialog ref="gcSkuDialogRef" @success="handleSelectSku" />
  <AutoCreateMarkDialog ref="autoCreateMarkRef" @confirm-upload="handleAutoCreateOk" />
  <BatchImportMark ref="batchImportMarkRef" @success="handleBatchImportMarkOk" />
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';
  import { ElLoading, ElMessage } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import GcSkuDialog from '@/views/supplyChainManage/efficiencyTools/warehouseOrder/components/GcSkuDialog.vue';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';
  import AutoCreateMarkDialog from './AutoCreateMarkDialog.vue';
  import BatchImportMark from './BatchImportMark.vue';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const props = defineProps<{
    code: string;
    mode?: string;
  }>();
  const isDetail = computed(() => props.mode === 'detail');

  const router = useRouter();
  const autoCreateMarkRef = ref();
  const saleCode = ref(''); // 销售订单号
  const batchImportMarkRef = ref();
  const form = ref({
    warehouseCode: '',
    wpCode: '',
    referenceNo: props.code,
    recipientInfo: {},
    vatChangeInfo: {},
    deliveryService: {
      isOptionalBoard: 0,
      isSignature: 0,
      isInsurance: 0,
      distributionType: null,
      smCode: '',
      isTruck: null,
    },
    warehouseService: {
      isChangeLabel: 0,
      customerPackageRequirement: null,
      customerPackageType: 'PUBLIC',
      packingList: [],
      itemList: [],
    },
    otherInfo: {},
  });
  const formRef = ref();
  const rules = reactive({
    warehouseCode: [{ required: true, message: '请选择发货仓库', trigger: 'change' }],
    recipientInfo: {
      name: [
        { required: true, message: '请输入收件人名', trigger: ['blur', 'change'] },
        {
          max: 48,
          message: '请输入48个字符以内',
          trigger: ['blur', 'change'],
        },
      ],
      countryCode: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
      address1: [{ required: true, message: '请输入地址1', trigger: ['blur', 'change'] }],
      zipcode: [{ required: true, message: '请输入邮编', trigger: ['blur', 'change'] }],
      city: [{ required: true, message: '请输入城市', trigger: ['blur', 'change'] }],
      province: [
        {
          validator: (rule: any, value: any, callback: any) => {
            if (['US', 'AU'].includes(form.value.recipientInfo.countryCode) && !value) {
              callback(new Error('请输入省/州'));
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change'],
        },
      ],
    },
    deliveryService: {
      isTruck: [{ required: true, message: '请选择配送方式', trigger: 'change' }],
      distributionType: [{ required: true, message: '请选择配送商', trigger: 'change' }],
      smCode: [{ required: true, message: '请选择物流产品', trigger: 'change' }],
      isOptionalBoard: [{ required: true, message: '请选择是否打板', trigger: 'change' }],
    },
    warehouseService: {
      customerPackageRequirement: [
        { required: true, message: '请选择包材要求', trigger: 'change' },
      ],
      boxMarkNum: [{ required: true, message: '请选择每箱张贴货件标签数', trigger: 'change' }],
    },
    shipmentFile: [
      {
        required: true,
        type: 'array',
        message: '请上传货件标签',
        trigger: ['change', 'blur'],
      },
    ],
    logisticsFile: [
      {
        required: true,
        type: 'array',
        message: '请上传物流面单',
        trigger: ['change', 'blur'],
      },
    ],
    rebrandSkuFile: [
      {
        required: true,
        type: 'array',
        message: '请上传SKU换标标签',
        trigger: ['change', 'blur'],
      },
    ],
    productSku: [{ required: true, message: '请选择商品', trigger: ['blur', 'change'] }],
    quantity: [{ required: true, message: '请输入数量', trigger: ['blur', 'change'] }],
    labelReplacementQty: [
      { required: true, message: '请输入内件货物总数量', trigger: ['blur', 'change'] },
    ],
  });

  const maps = ref({});
  const selectOptions = ref([]);

  const queryPushGcTransferSlipOrderEnums = async () => {
    const res = await erpApi.luteosErpWarehouseOrderQueryPushGcTransferSlipOrderEnums({
      code: props.code,
    });
    maps.value = res?.dictMap;
    selectOptions.value = maps.value['商品']?.map((sku) => ({
      label: sku.value,
      value: sku.value,
    }));
  };

  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      // form.value.warehouseService.itemList = skuList.value;
      filesFormat();
      form.value.warehouseService.packingList?.forEach((item, index) => {
        item.boxNo = index + 1;
      });
      await erpApi.luteosErpWarehouseOrderPushGcTransferSlipOrder({
        code: props.code,
        ...form.value,
        draft: true,
      });
      ElMessage.success('保存成功');
      getDetailData();
    } finally {
      saveLoading.value = false;
    }
  };

  const submitLoading = ref(false);
  const submit = async () => {
    console.log('draft: false');
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      submitLoading.value = true;
      // form.value.warehouseService.itemList = skuList.value;
      filesFormat();
      form.value.warehouseService.packingList?.forEach((item, index) => {
        item.boxNo = index + 1;
      });
      await erpApi.luteosErpWarehouseOrderPushGcTransferSlipOrder({
        code: props.code,
        ...form.value,
        draft: false,
      });
      ElMessage.success('推送成功');
      closeTabAndRefresh('warehouseOrder');
      router.push('/warehouseOrder');
    } finally {
      submitLoading.value = false;
    }
  };

  const optionParams = ref({
    isOptionalBoard: 0,
    isSignature: 0,
  });
  const handleSmCodeChange = (val) => {
    optionParams.value = maps.value['配送方式']
      ?.find((delivery) => delivery.value == form.value.deliveryService.isTruck)
      ?.childrenList?.find(
        (distribution) => distribution.value == form.value.deliveryService.distributionType
      )
      ?.childrenList?.filter((k) => k.filter1List?.includes(form.value.warehouseCode))
      ?.find((sm) => sm.value == val)?.params;
  };

  const gcSkuDialogRef = ref();
  const addPacking = () => {
    form.value.warehouseService.packingList?.push({
      packingLineList: [{}],
      shipmentFile: [],
      logisticsFile: [],
      customsFile: [],
      rebrandSkuFile: [],
    });
    console.log(form.value.warehouseService.packingList);
  };

  const removePacking = (row, index, rowIndex) => {
    if (row?.packingLineList?.length > 1) {
      row?.packingLineList?.splice(rowIndex, 1);
      return;
    }
    form.value.warehouseService.packingList?.splice(index, 1);
  };

  const clearAll = async () => {
    const isConfirmed = await swal.confirm('请确认是否清空所有装箱信息？');
    if (!isConfirmed) return;
    form.value.warehouseService.packingList = [];
  };

  const curIndex = ref(null);
  const selectSku = (row, index) => {
    if (!form.value.warehouseCode) {
      ElMessage.warning('请先选择发货仓库');
      return;
    }
    gcSkuDialogRef.value?.open(
      form.value.warehouseCode,
      maps.value['商品']?.map((item) => {
        return {
          ...item,
          quantity: row?.packingLineList?.find((k) => k.productSku === item.value)?.quantity || 0,
        };
      }),
      row?.packingLineList
        ?.filter((item) => item.productSku)
        ?.map((item) => {
          return {
            value: item?.productSku,
            quantity: item?.quantity,
            params: {
              declaredValue: item?.productDeclaredValue,
            },
          };
        })
    );
    curIndex.value = index;
  };

  const handleSelectSku = (list) => {
    console.log('list', list);
    form.value.warehouseService.packingList[curIndex.value].packingLineList = list?.map((item) => {
      return {
        productSku: item?.value,
        productName: item?.desc,
        quantity: item?.quantity || 0,
        productDeclaredValue: item.params?.declaredValue || 0,
      };
    });
    form.value.warehouseService.packingList?.forEach((item) => {
      item.packingLineList?.forEach((sku) => {
        if (sku.productSku) form.value.warehouseService.itemList.push(sku);
      });
    });
  };

  const handleSelect = (val, item) => {
    const skuInfo = maps.value['商品']?.find((sku) => sku.value === val);
    if (skuInfo) {
      item.productName = skuInfo.desc;
      item.productDeclaredValue = skuInfo.params.declaredValue;
    }
  };

  const skuList = computed(() => {
    const list = [];
    form.value.warehouseService.packingList?.forEach((item) => {
      item.packingLineList?.forEach((sku) => {
        if (sku.productSku) {
          if (list.find((k) => k.productSku === sku.productSku)) {
            list.find((k) => k.productSku === sku.productSku).quantity += sku.quantity ?? 0;
          } else {
            list.push(
              cloneDeep({
                ...sku,
                rebrandSkuFile: sku?.rebrandSkuFile
                  ? sku.rebrandSkuFile?.map((file) => {
                      return {
                        name: file?.name || file?.fileName,
                        ossKey: file?.ossKey,
                      };
                    })
                  : [],
              })
            );
          }
        }
      });
    });
    list?.forEach((item) => {
      const oldInfo = form.value.warehouseService.itemList?.find(
        (k) => k.productSku === item.productSku
      );
      console.log('oldInfo', oldInfo);
      if (oldInfo) {
        item.productCode = oldInfo.productCode;
        item.labelReplacementQty = oldInfo.labelReplacementQty;
        item.rebrandSkuFile = oldInfo.rebrandSkuFile
          ? oldInfo.rebrandSkuFile?.map((file) => {
              return {
                name: file?.name || file?.fileName,
                ossKey: file?.ossKey,
              };
            })
          : [];
        item.rebrandSkuFileId = oldInfo.rebrandSkuFileId;
        item.productDeclaredValue = oldInfo.productDeclaredValue;
      }
    });

    form.value.warehouseService.itemList = list;
    return list;
  });

  const totalQuantity = computed(() => {
    return form.value.warehouseService.itemList?.reduce((pre, cur) => {
      return pre + cur?.quantity;
    }, 0);
  });

  const baseWarehouseCode = ref('');
  const fileLoading = ref(false);
  const handleUpload = async (val, file, row, type, gcFileType) => {
    if (!form.value.warehouseCode) {
      ElMessage.warning('请先选择发货仓库');
      // row[type] = [];
      return;
    }
    try {
      fileLoading.value = true;
      // 上传谷仓附件
      const res = await erpApi.luteosErpWarehouseOrderUploadGuCangFile({
        fileName: file?.name,
        ossKey: file?.ossKey,
        gcFileType,
        warehouseCode: baseWarehouseCode.value,
      });
      row[type] = [
        {
          name: file?.name,
          ossKey: file?.ossKey,
          fileUrl: res?.fileUrl,
          // isEdit: true,
        },
      ];
      row[`${type}Id`] = res?.fileId;
      console.log(row);
      return res?.fileId;
    } finally {
      fileLoading.value = false;
    }
  };

  // 批量新增
  const batchAddFile = ref();
  const batchUploadRef = ref();
  const handleBatchAdd = async () => {
    form.value.warehouseService.packingList = [];
    form.value.warehouseService.itemList = [];
    const res = await erpApi.luteosErpWarehouseOrderImportGcWarehouseService({
      fileName: batchAddFile.value[0]?.name,
      ossKey: batchAddFile.value[0]?.ossKey,
    });
    form.value.warehouseService.packingList = res?.packingList?.map((item) => {
      item?.packingLineList?.forEach((sku) => {
        const skuInfo = maps.value['商品']?.find((k) => k.value === sku.productSku);
        if (skuInfo) {
          sku.productName = skuInfo?.desc;
        }
        const sameSku = res?.itemList?.find((k) => k.productSku === sku.productSku);
        if (sameSku) {
          sku.productDeclaredValue = sameSku?.productDeclaredValue || 0;
        } else {
          sku.productDeclaredValue = skuInfo?.params.declaredValue;
        }
      });
      return {
        ...item,
        shipmentFile: [],
        customsFile: [],
        logisticsFile: [],
      };
    });
    form.value.warehouseService.itemList = res?.itemList?.map((item) => {
      return {
        ...item,
        rebrandSkuFile: [],
      };
    });
    batchUploadRef.value?.clearFile();
    console.log(res);
  };

  // 裁剪PDF
  const cutGuPdfRef = ref();
  const cutFile = ref([]);
  const cutLoading = ref(false);
  const handleCut = async () => {
    try {
      cutLoading.value = true;
      const res = await erpApi.luteosErpWarehouseOrderCutGuPdf({
        fileName: cutFile.value[0]?.name,
        ossKey: cutFile.value[0]?.ossKey,
      });
      openWindow(res?.fileUrl);
      cutGuPdfRef.value?.clearFile();
    } finally {
      cutLoading.value = false;
    }
  };

  const autoWriteLoading = ref(false);
  const handleAutoFill = async () => {
    // 自动填写,调接口将数据填入表单
    autoWriteLoading.value = true;
    try {
      form.value.warehouseService.packingList = [];
      form.value.warehouseService.itemList = [];
      const res = await erpApi.luteosErpWarehouseOrderAssemblePackageList({
        code: props.code,
      });
      form.value.warehouseService.packingList = res?.packageLineList?.map((item) => {
        return {
          packingLineList: [item],
          shipmentFile: [],
          customsFile: [],
          logisticsFile: [],
        };
      });
      autoWriteLoading.value = false;
    } catch (error) {}
  };

  // 自动生成箱唛
  const handleAutoCreate = async () => {
    autoCreateMarkRef.value?.open(saleCode.value);
  };
  // 批量导入箱唛文件
  const handleBatchImport = () => {
    if (!form.value.warehouseCode) {
      ElMessage.warning('请先选择发货仓库');
      // row[type] = [];
      return;
    }
    const files =
      form.value.warehouseService?.packingList?.flatMap((item) =>
        item.shipmentFile?.map((file) => file.name)
      ) || [];
    batchImportMarkRef.value?.open(files);
  };

  const handleAutoCreateOk = async (data) => {
    const packingList = [];
    form.value.warehouseService.packingList = [];
    for (const item of data) {
      const newItem = {
        boxMark: item.ssc,
        packingLineList: [{ productSku: item.productSku, quantity: item.quantity }],
        shipmentFile: [],
      };
      if (item.file) {
        newItem.shipmentFile = [{ ...item.file, name: item.file?.fileName }];
        let uploadResult = null;
        try {
          autoWriteLoading.value = true;
          uploadResult = await handleUpload(
            undefined,
            {
              name: item.file?.fileName,
              ossKey: item.file?.ossKey,
            },
            item,
            'shipmentFile',
            'SHIPMENT_LABEL_ATTACHMENT'
          );
          autoWriteLoading.value = false;

          if (uploadResult) {
            newItem.shipmentFileId = uploadResult;
          }
        } catch (err) {
          // console.error('上传失败', err);
        }
      }
      packingList.push(newItem);
    }
    form.value.warehouseService = {
      ...form.value.warehouseService,
      packingList,
    };
  };
  const shipFileLoading = ref(false);
  const handleBatchImportMarkOk = async (data) => {
    console.log(data, '导入成功文件');
    const skuMap = new Map();
    data.forEach((d) => {
      if (!d.productSku) return;
      if (!skuMap.has(d.productSku)) {
        skuMap.set(d.productSku, []);
      }
      skuMap.get(d.productSku).push(d);
    });
    const { packingList } = form.value.warehouseService;
    for (const item of packingList ?? []) {
      if (item.packingLineList?.length === 1) {
        const sku = item.packingLineList[0].productSku;
        const skuArr = skuMap.get(sku);
        if (skuArr && skuArr.length > 0) {
          const dataHasItem = skuArr.shift();
          item.boxMark = dataHasItem.ssc;

          let shipmentFileArr: any[] = [];
          if (dataHasItem.file) {
            shipFileLoading.value = true;
            item.shipmentFile = [];
            const uploadResult = await handleUpload(
              undefined,
              {
                name: dataHasItem.file?.fileName,
                ossKey: dataHasItem.file?.ossKey,
              },
              item,
              'shipmentFile',
              'SHIPMENT_LABEL_ATTACHMENT'
            ).finally(() => {
              shipFileLoading.value = false;
            });

            if (uploadResult) {
              shipmentFileArr = [
                {
                  ...dataHasItem.file,
                  name: dataHasItem.file?.name || dataHasItem.file?.fileName,
                },
              ];
              item.shipmentFileId = uploadResult;
            }
          }
          item.shipmentFile = shipmentFileArr;
        }
      }
    }
    form.value.warehouseService = {
      ...form.value.warehouseService,
      packingList,
    };
  };

  // 下载模板
  const downloadTemp = async () => {
    // form.value.warehouseService.itemList = skuList.value;
    filesFormat();
    const res = await erpApi.luteosErpWarehouseOrderExportGcWarehouseService({
      ...form.value.warehouseService,
    });
    openWindow(res?.downloadUrl);
  };

  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/warehouseOrder');
  };

  const getDetailData = async () => {
    if (props.code) {
      const res: any = await erpApi.luteosErpWarehouseOrderQueryDetail({
        code: props.code,
        push: true,
      });
      saleCode.value = res?.baseInfo?.saleCode;
      baseWarehouseCode.value =
        res?.orderDetailResp?.baseInfo?.warehouseCode ||
        res?.odoDetailResp?.baseInfo?.warehouseCode;
      if (res?.guCangTransferSlipOrderBean && res?.guCangTransferSlipOrderBean?.type === 2) {
        // 合并服务端返回并做兜底，避免 vatChangeInfo 等对象为 null 触发 v-model 读空
        const bean = cloneDeep(res?.guCangTransferSlipOrderBean) || {};
        const defaultDeliveryService = {
          isOptionalBoard: 0,
          isSignature: 0,
          isInsurance: 0,
          distributionType: null,
          smCode: '',
          isTruck: null,
        };
        const defaultWarehouseService = {
          isChangeLabel: 0,
          customerPackageRequirement: null,
          customerPackageType: 'PUBLIC',
          boxMarkNum: undefined,
          packingList: [],
          itemList: [],
          labelReplacementOption: undefined,
          changeLabelQtyPiece: undefined,
        };

        form.value = {
          ...form.value,
          ...bean,
          recipientInfo: { ...(bean?.recipientInfo || {}) },
          vatChangeInfo: { ...(bean?.vatChangeInfo || {}) },
          deliveryService: { ...defaultDeliveryService, ...(bean?.deliveryService || {}) },
          warehouseService: { ...defaultWarehouseService, ...(bean?.warehouseService || {}) },
          otherInfo: { ...(bean?.otherInfo || {}) },
        };
        form.value.otherInfo.packingFile = res?.guCangTransferSlipOrderBean?.otherInfo?.packingFile
          ?.filter((file) => file?.fileName)
          ?.map((file) => {
            return {
              name: file?.name || file?.fileName,
              ossKey: file?.ossKey,
            };
          });
        form.value.warehouseService.packingList =
          res?.guCangTransferSlipOrderBean?.warehouseService?.packingList?.map((item) => {
            item.packingLineList = item?.packingLineList?.map((row) => {
              const sameSku = res?.guCangTransferSlipOrderBean?.warehouseService?.itemList?.find(
                (sku) => sku.productSku === row.productSku
              );
              if (sameSku) sameSku.quantity = row?.quantity;
              return {
                ...row,
                ...sameSku,
                rebrandSkuFile: sameSku?.rebrandSkuFile
                  ?.filter((file) => file?.fileName)
                  ?.map((file) => {
                    return {
                      name: file?.name || file?.fileName,
                      ossKey: file?.ossKey,
                    };
                  }),
              };
            });
            return {
              ...item,
              shipmentFile: item?.shipmentFile
                ?.filter((file) => file?.fileName)
                ?.map((file) => {
                  return {
                    name: file?.name || file?.fileName,
                    ossKey: file?.ossKey,
                  };
                }),
              customsFile: item?.customsFile
                ?.filter((file) => file?.fileName)
                ?.map((file) => {
                  return {
                    name: file?.name || file?.fileName,
                    ossKey: file?.ossKey,
                  };
                }),
              logisticsFile: item?.logisticsFile
                ?.filter((file) => file?.fileName)
                ?.map((file) => {
                  return {
                    name: file?.name || file?.fileName,
                    ossKey: file?.ossKey,
                  };
                }),
            };
          });
      } else {
        const detailInfo = res?.orderDetailResp || res?.odoDetailResp;
        // 兜底，确保对象存在
        form.value.recipientInfo = form.value.recipientInfo || {};
        form.value.vatChangeInfo = form.value.vatChangeInfo || {};
        form.value.deliveryService = form.value.deliveryService || {
          isOptionalBoard: 0,
          isSignature: 0,
          isInsurance: 0,
          distributionType: null,
          smCode: '',
          isTruck: null,
        };
        form.value.warehouseService = form.value.warehouseService || {
          isChangeLabel: 0,
          customerPackageRequirement: null,
          customerPackageType: 'PUBLIC',
          packingList: [],
          itemList: [],
        };
        form.value.otherInfo = form.value.otherInfo || {};
        form.value.recipientInfo.name = detailInfo?.receiveInfo?.name;
        form.value.recipientInfo.address1 = detailInfo?.receiveInfo?.address;
        form.value.recipientInfo.address2 = detailInfo?.receiveInfo?.address2;
        form.value.recipientInfo.city = detailInfo?.receiveInfo?.city;
        form.value.recipientInfo.countryCode = detailInfo?.receiveInfo?.countryCode;
        form.value.recipientInfo.province = detailInfo?.receiveInfo?.province;
        form.value.recipientInfo.zipcode = detailInfo?.receiveInfo?.zipcode;
        form.value.recipientInfo.phone = detailInfo?.receiveInfo?.phone;
        form.value.recipientInfo.email = detailInfo?.receiveInfo?.email;
        form.value.recipientInfo.doorplate = detailInfo?.receiveInfo?.houseNumber;
        filesFormat();
      }
    }
  };

  const filesFormat = () => {
    form.value.warehouseService.packingList = form.value.warehouseService?.packingList?.map(
      (item) => {
        return {
          ...item,
          shipmentFile:
            form.value.warehouseService.boxMarkNum > 0
              ? item?.shipmentFile?.map((file) => {
                  return {
                    fileName: file?.name || file?.fileName,
                    ossKey: file?.ossKey,
                  };
                }) || []
              : [],
          shipmentFileId:
            form.value.warehouseService.boxMarkNum > 0 && item?.shipmentFile?.length > 0
              ? item.shipmentFileId
              : null,
          customsFile:
            item?.customsFile?.map((file) => {
              return {
                fileName: file?.name || file?.fileName,
                ossKey: file?.ossKey,
              };
            }) || [],
          customsFileId: item?.customsFile?.length > 0 ? item.customsFileId : null,
          logisticsFile:
            item?.logisticsFile?.map((file) => {
              return {
                fileName: file?.name || file?.fileName,
                ossKey: file?.ossKey,
              };
            }) || [],
          logisticsFileId: item?.logisticsFile?.length > 0 ? item.logisticsFileId : null,
        };
      }
    );
    form.value.warehouseService.itemList = form.value.warehouseService?.itemList?.map((item) => {
      return {
        ...item,
        rebrandSkuFile:
          form.value.warehouseService.isChangeLabel === 1
            ? item?.rebrandSkuFile?.map((file) => {
                return {
                  fileName: file?.name || file?.fileName,
                  ossKey: file?.ossKey,
                };
              }) || []
            : [],
        rebrandSkuFileId:
          form.value.warehouseService.isChangeLabel === 1 && item?.rebrandSkuFile?.length > 0
            ? item.rebrandSkuFileId
            : null,
        productCode: form.value.warehouseService.isChangeLabel === 1 ? item.productCode : null,
      };
    });
    form.value.otherInfo.packingFile =
      form.value.otherInfo.packingFile?.map((file) => {
        return {
          fileName: file?.name || file?.fileName,
          ossKey: file?.ossKey,
        };
      }) || [];
    form.value.otherInfo.packingFileId =
      form.value.otherInfo.packingFile?.length > 0 ? form.value.otherInfo.packingFileId : null;

    // 校验
    form.value.warehouseService.labelReplacementOption =
      form.value.warehouseService.isChangeLabel === 1
        ? form.value.warehouseService.labelReplacementOption
        : null;
    form.value.warehouseService.changeLabelQtyPiece =
      form.value.warehouseService.isChangeLabel === 1
        ? form.value.warehouseService.changeLabelQtyPiece
        : null;
  };

  const handleCountryChange = () => {
    if (['US', 'AU'].includes(form.value.recipientInfo.countryCode)) {
      formRef.value?.validateField('recipientInfo.province').catch(() => false);
    } else {
      formRef.value?.clearValidate(['recipientInfo.province']);
    }
  };

  const handleChange = () => {
    form.value.warehouseService.customerPackageRequirement = '';
    formRef.value?.clearValidate(['warehouseService.customerPackageRequirement']);
  };

  onMounted(async () => {
    await Promise.all([getDetailData(), queryPushGcTransferSlipOrderEnums()]);
    handleSmCodeChange(form.value.deliveryService.smCode);
  });

  onActivated(async () => {
    await Promise.all([getDetailData(), queryPushGcTransferSlipOrderEnums()]);
    handleSmCodeChange(form.value.deliveryService.smCode);
  });

  onDeactivated(() => {
    formRef.value?.resetFields();
  });
</script>

<style scoped lang="scss">
  :deep(.el-collapse) {
    border: 0;
  }

  :deep(.el-collapse-item__header) {
    border: 0;
  }

  :deep(.el-collapse-item__wrap) {
    border: 0;
  }

  :deep(.el-collapse-item__arrow) {
    margin: 0 auto 8px 8px;
  }

  :deep(.el-form-item__label) {
    align-items: center;
    line-height: unset;
    text-align: right;
  }

  .tip {
    margin-left: 14px;
    color: #ff8d3d;
    font-size: 12px;
  }

  :deep(.el-table td) {
    //padding: 4px 0 4px 0;
  }

  :deep(.el-table th) {
    padding: 8px 0 8px 0;
  }

  :deep(.el-form-item .el-form-item) {
    margin-bottom: 1.75rem;
  }

  :deep(.el-form-item__content) {
    line-height: unset;
  }

  .packing-upload {
    width: 90%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    :deep(.el-upload--text) {
      justify-content: start;
      text-align: left;
      width: 100%;
    }
  }
  :deep(.el-table .el-table__cell) {
    z-index: unset;
  }

  :deep(.preview-file) {
    right: -25px !important;
  }
  :deep(.download-file) {
    display: none;
  }
</style>
