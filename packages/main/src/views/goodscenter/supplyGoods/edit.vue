<template>
  <el-form
    class="min-w-900px custom-form"
    ref="formRef"
    label-width="180px"
    label-position="left"
    :model="form"
    :rules="rules"
    scroll-to-error
  >
    <KeenCard title="基础信息">
      <el-form-item label="产品图" v-if="!isMaterial">
        <KeenImageUpload
          v-model="form.productImageList[0]"
          directory="product/supplyGoods"
          tooltip="更改产品图片"
          disabled
          @upload-success="formRef?.validateField('productImageList')"
        />
      </el-form-item>
      <el-form-item v-else label="产品图" prop="productImageList">
        <KeenImageUpload
          v-model="form.productImageList[0]"
          directory="product/supplyGoods"
          tooltip="更改产品图片"
          @upload-success="formRef?.validateField('productImageList')"
        />
      </el-form-item>
      <div class="item-grid">
        <template v-if="!isMaterial">
          <el-form-item label="产品中文名称：">
            <span>{{ form?.productTitle }}</span>
          </el-form-item>
          <el-form-item label="产品英文名称：">
            <span>{{ form?.productTitleEn }}</span>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="产品中文名称：" prop="productTitle">
            <el-input v-model="form.productTitle" placeholder="请输入供应链产品中文名" clearable />
          </el-form-item>
          <el-form-item label="产品英文名称：" prop="productTitleEn">
            <el-input
              v-model="form.productTitleEn"
              placeholder="请输入供应链产品中文名"
              clearable
            />
          </el-form-item>
        </template>

        <el-form-item label="产品类型：" prop="productType">
          <el-select v-model="form.productType" v-if="isAdd" @change="handleProductTypeChange">
            <el-option label="产品" :value="1" />
            <el-option label="物料" :value="2" />
            <el-option label="配件" :value="12" />
            <el-option label="用研产品" :value="3" />
            <el-option label="虚拟产品" :value="14" />
            <el-option label="组合产品" :value="13" />
          </el-select>
          <span v-else>{{ productTypeMap[form.productType] }}</span>
        </el-form-item>
        <el-form-item label="供应链SKU：" prop="productSku" v-if="!isAdd">
          <span>{{ form?.productSku }}</span>
        </el-form-item>
        <el-form-item label="供应链SKU" prop="productSku" v-else-if="isMaterial">
          <el-input v-model="form.productSku" placeholder="请输入供应链SKU" clearable />
        </el-form-item>
        <el-form-item label="产品状态" prop="productStatus" v-if="isMaterial">
          <el-select v-model="form.productStatus">
            <el-option label="不可用" :value="0" />
            <el-option label="可用" :value="1" />
            <el-option label="开发产品" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售状态" prop="saleStatus" v-if="isMaterial">
          <el-select v-model="form.saleStatus">
            <el-option label="待上架" :value="18" />
            <el-option label="已退市" :value="6" />
            <el-option label="在销售" :value="2" />
            <el-option label="清仓中" :value="1" />
          </el-select>
        </el-form-item>
        <template v-if="!isMaterial && !isAdd">
          <el-form-item label="线上产品全称：">
            <span>{{ form?.productInfo?.onlineProductFullName || '-' }}</span>
          </el-form-item>
          <el-form-item label="品牌：">
            <span>{{ form?.brandName || '-' }}</span>
          </el-form-item>
          <el-form-item label="型号：">
            <span>{{ form?.productInfo?.modelName || '-' }}</span>
          </el-form-item>
          <el-form-item label="EAN 13码：">
            <span>{{ form?.productInfo?.ean13 || '-' }}</span>
          </el-form-item>
          <el-form-item label="EAN 14码：">
            <span>{{ form?.productInfo?.ean14 || '-' }}</span>
          </el-form-item>
          <el-form-item label="适用周期:">
            <span>{{ form?.productInfo?.applicablePeriod || '-' }}</span>
          </el-form-item>
        </template>
      </div>
      <div v-if="!isMaterial && !isAdd">
        <el-form-item label="彩盒内的所有产品及配件：">
          <div class="textarea">{{ form?.productInfo?.colorBoxContents }}</div>
        </el-form-item>
        <el-form-item label="卖点：">
          <div class="textarea">
            {{ form?.productInfo?.sellingPoint }}
          </div>
        </el-form-item>
        <el-form-item label="在线完整产品规格（要点）：">
          <div class="textarea">{{ form?.productInfo?.onlineFullProductSpecs }}</div>
        </el-form-item>
      </div>
    </KeenCard>
    <KeenCard title="关联产品SKU" style="text-align: center" v-if="!isMaterial">
      <el-table :data="skuList">
        <el-table-column label="产品信息" min-width="250">
          <template #default="{ row }">
            <GoodsInfo
              :src="row.productImageUrl"
              :title="row.productTitle"
              :subtitle="row.skuCode"
            />
          </template>
        </el-table-column>
        <el-table-column label="建议零售价" min-width="150">
          <template #default="{ row }">
            <span v-if="row?.price">{{ row?.price }}{{ row?.currency }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品SKU状态" prop="stateDesc" min-width="150" />
        <el-table-column v-if="skuList.length" label="操作" min-width="100">
          <template #default>
            <el-link type="primary" :underline="false" @click="bindSkuVisible = true">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="!skuList.length" type="primary" @click="bindSkuVisible = true" class="mt-3">
        关联
      </el-button>
    </KeenCard>
    <!--    <KeenCard title="报关/清关信息" v-if="form.productType !== 2">
      <div class="w-50" style="padding-right: calc(30px + 0.625rem)">
        <el-form-item label="出口申报价值：" required>
          <div class="d-flex w-100 gap-2">
            <el-form-item class="w-50" prop="declareInfo.declarePrice">
              <NumberInput v-model="form.declareInfo.declarePrice" placeholder="请输入" />
            </el-form-item>
            <el-form-item class="w-50" prop="declareInfo.declareCurrency">
              <CurrencySelect v-model="form.declareInfo.declareCurrency" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="境内货源地">
          <el-input v-model="form.declareInfo.territoryGoods" />
        </el-form-item>
      </div>
      <div class="d-flex align-items-end justify-content-end text-gray-500">
        其他信息请到
        <el-link type="primary" @click="toSku">关联产品SKU</el-link>
        中修改
      </div>
    </KeenCard>-->
    <!--    <div class="d-flex gap-5" v-if="form.productType === 2">
      <KeenCard title="" class="tab-card">
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="报关信息" :name="0">
            <KeenCard title="">
              <div class="d-flex">
                <el-form-item label="中文申报品名：" prop="declareInfo.declareName" class="w-30">
                  <el-input v-model="form.declareInfo.declareName" placeholder="请输入" />
                </el-form-item>
                <el-form-item
                  label="英文申报品名："
                  prop="declareInfo.declareNameEn"
                  class="w-30 ml-20"
                >
                  <el-input v-model="form.declareInfo.declareNameEn" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="出口申报价值：" required class="w-30">
                  <div class="d-flex gap-2">
                    <el-form-item prop="declareInfo.declarePrice">
                      <NumberInput v-model="form.declareInfo.declarePrice" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item prop="declareInfo.declareCurrency">
                      <CurrencySelect v-model="form.declareInfo.declareCurrency" />
                    </el-form-item>
                  </div>
                </el-form-item>
              </div>
              <div class="d-flex">
                <el-form-item label="出口海关编码：" class="w-30">
                  <el-input v-model="form.declareInfo.hsCode" placeholder="请输入出口海关编码" />
                </el-form-item>
                <el-form-item label="成交单位：" class="w-30 ml-20">
                  <el-input
                    v-model="form.declareInfo.transactionUnit"
                    placeholder="请输入成交单位"
                  />
                </el-form-item>
                <el-form-item label="申报要素：" class="w-30">
                  <el-input
                    v-model="form.declareInfo.declareElement"
                    placeholder="请输入申报要素"
                  />
                </el-form-item>
              </div>
              <div class="d-flex">
                <el-form-item label="境内货源地：" class="w-30">
                  <el-input
                    v-model="form.declareInfo.territoryGoods"
                    placeholder="请输入境内货源地"
                  />
                </el-form-item>
                <el-form-item label="征免：" class="w-30 ml-20">
                  <el-select v-model="form.declareInfo.taxExemption" clearable>
                    <el-option label="照章征收" value="free_regulation" />
                    <el-option label="全免" value="free" />
                  </el-select>
                </el-form-item>
                <el-form-item label="申报说明：" class="w-30">
                  <el-input
                    v-model="form.declareInfo.declareExplain"
                    placeholder="请输入申报说明"
                  />
                </el-form-item>
              </div>
              <div class="d-flex">
                <el-form-item label="海关属性：" class="w-30">
                  <el-select
                    v-model="form.declareInfo.hsAttr"
                    class="w-100"
                    placeholder="请选择海关属性"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in hsAttrMap"
                      :label="item.desc"
                      :value="parseInt(item.value)"
                      :key="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="中文材质：" class="w-30 ml-20">
                  <el-input
                    v-model="form.declareInfo.productIngredient"
                    placeholder="请输入中文材质"
                  />
                </el-form-item>
                <el-form-item label="英文材质：" class="w-30">
                  <el-input
                    v-model="form.declareInfo.productIngredientEn"
                    placeholder="请输入英文材质"
                  />
                </el-form-item>
              </div>
              <div class="d-flex">
                <el-form-item label="中文用途：" class="w-30">
                  <el-input v-model="form.declareInfo.useCn" placeholder="请输入中文用途" />
                </el-form-item>
                <el-form-item label="英文用途：" class="w-30 ml-20">
                  <el-input v-model="form.declareInfo.useEn" placeholder="请输入英文用途" />
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="清关信息" :name="1">
            <KeenCard title="">
              <div style="width: 100%" v-for="(item, index) in form.clearanceInfoList" :key="index">
                <el-form label-width="120px" label-position="top" :model="form" :rules="rules">
                  <div class="d-flex">
                    <el-form-item
                      label="清关编码："
                      class="mr-15"
                      :prop="`clearanceInfoList[${index}].hsImportCode`"
                      :rules="[
                        {
                          required: false,
                          pattern: /^\d{0,255}$/,
                          message: '0~255个字符，数字格式',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                    >
                      <el-input
                        v-model="item.hsImportCode"
                        placeholder="请输入清关编码"
                        :maxlength="255"
                        show-word-limit
                      />
                    </el-form-item>
                    <el-form-item
                      label="清关税率："
                      class="mr-15"
                      :prop="`clearanceInfoList[${index}].hsTariffRate`"
                      :rules="[
                        {
                          required: false,
                          pattern: /^(?:100(?:\.00)?|[0-9]?[0-9](?:\.[0-9]{2})?)$/,
                          message: '0~100，支持两位小数',
                          trigger: ['blur', 'change'],
                        },
                      ]"
                    >
                      <el-input v-model="item.hsTariffRate" placeholder="请输入清关税率">
                        <template #append>%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item
                      label="申报单价："
                      class="mr-15"
                      :prop="`clearanceInfoList[${index}].hsImportPrice`"
                    >
                      <div class="d-flex w-100 gap-2">
                        <el-form-item class="w-50">
                          <CurrencySelect v-model="item.hsImportCurrency" />
                        </el-form-item>
                        <el-form-item class="w-50">
                          <NumberInput
                            v-model="item.hsImportPrice"
                            placeholder="请输入"
                            :max="1000000"
                          />
                        </el-form-item>
                      </div>
                    </el-form-item>
                    <el-form-item label="适用国家" prop="baseInfo.country" class="mr-15">
                      <el-select
                        v-model="item.countryCodeList"
                        filterable
                        :teleported="false"
                        multiple
                        @change="handleCountryChange"
                        :disabled="index === 0"
                        style="width: 200px"
                      >
                        <el-option
                          v-for="country in countryMap"
                          :key="country.countryCode"
                          :label="country.desc"
                          :value="country.countryCode"
                          :disabled="countrySelectCodes.includes(country.countryCode)"
                        />
                      </el-select>
                    </el-form-item>
                    <el-button size="small" type="primary" @click="addItem">+</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="delItem(index)"
                      :disabled="index === 0"
                    >
                      -
                    </el-button>
                  </div>
                </el-form>
              </div>
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </KeenCard>
    </div>-->
    <KeenCard title="" class="tab-card">
      <el-tabs v-model="tabCurrent">
        <!--        <el-tab-pane label="报关信息" :name="0">
          <KeenCard>
            <div class="item-grid">
              <el-form-item label="中文报关品名：" prop="productDeclare.declareName">
                <OverflowTooltip :content="form?.productDeclare?.declareName" :line="1" />
              </el-form-item>
              <el-form-item label="英文报关品名：" prop="productDeclare.declareNameEn">
                <OverflowTooltip :content="form?.productDeclare?.declareNameEn" :line="1" />
              </el-form-item>
              <el-form-item label="出口申报价值：" prop="productDeclare.declarePrice">
                <span>{{ form?.productDeclare?.declarePrice }}</span>
                <span class="ms-3 text-gray-600">
                  {{ form?.productDeclare?.declareCurrency }}
                </span>
              </el-form-item>
              <el-form-item label="出口海关编码：">
                <OverflowTooltip :content="form?.productDeclare?.hsCode" :line="1" />
              </el-form-item>
              <el-form-item label="成交单位：">
                <OverflowTooltip :content="form?.productDeclare?.transactionUnit" :line="1" />
              </el-form-item>
              <el-form-item label="申报要素：">
                <OverflowTooltip :content="form?.productDeclare?.declareElement" :line="1" />
              </el-form-item>
              <el-form-item label="境内货源地：">
                <OverflowTooltip :content="form?.productDeclare?.territoryGoods" :line="1" />
              </el-form-item>
              <el-form-item label="征免：">
                <OverflowTooltip :content="form?.productDeclare?.taxExemptionDesc" :line="1" />
              </el-form-item>
              <el-form-item label="申报说明：">
                <OverflowTooltip :content="form?.productDeclare?.declareExplain" :line="1" />
              </el-form-item>
              <el-form-item label="海关属性：">
                <OverflowTooltip :content="form?.productDeclare?.hsAttrDesc" :line="1" />
              </el-form-item>
              <el-form-item label="中文材质：">
                <OverflowTooltip
                  :content="form?.productDeclare?.productMaterialIngredient"
                  :line="1"
                />
              </el-form-item>
              <el-form-item label="英文材质：">
                <OverflowTooltip
                  :content="form?.productDeclare?.productMaterialIngredientEn"
                  :line="1"
                />
              </el-form-item>

              <el-form-item label="中文用途：">
                <OverflowTooltip :content="form?.productDeclare?.useCn" :line="1" />
              </el-form-item>
              <el-form-item label="英文用途：">
                <span>{{ form?.productDeclare?.useEn }}</span>
                <OverflowTooltip :content="form?.productDeclare?.useEn" :line="1" />
              </el-form-item>
            </div>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="清关信息" :name="1">
          <KeenCard title="">
            <el-table :data="form.productClearanceList" class-name="table-row-dashed">
              <el-table-column prop="hsImportCode" label="清关编码" />
              <el-table-column prop="hsTariffRate" label="清关税率">
                <template #default="{ row }">
                  <span v-if="row.hsTariffRate">{{ row.hsTariffRate }}%</span>
                  <span v-else>&#45;&#45;</span>
                </template>
              </el-table-column>
              <el-table-column prop="hsImportPrice" label="申报单价" min-width="150">
                <template #default="{ row }">
                  <span v-if="row.hsImportPrice">
                    {{ parseFloat(row.hsImportPrice).toFixed(2) }} {{ row.hsImportCurrencyDesc }}
                  </span>
                  <span v-else>&#45;&#45;</span>
                </template>
              </el-table-column>
              <el-table-column prop="countryNames" label="适用国家" />
            </el-table>
          </KeenCard>
        </el-tab-pane>-->
        <el-tab-pane label="报关/清关信息" :name="0" v-if="!isMaterial">
          <KeenCard>
            <div class="w-50" style="padding-right: calc(30px + 0.625rem)">
              <el-form-item label="出口申报价值：" required>
                <div class="d-flex w-100 gap-2">
                  <el-form-item class="w-50" prop="declareInfo.declarePrice">
                    <NumberInput v-model="form.declareInfo.declarePrice" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item class="w-50" prop="declareInfo.declareCurrency">
                    <CurrencySelect v-model="form.declareInfo.declareCurrency" />
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item label="境内货源地">
                <el-input v-model="form.declareInfo.territoryGoods" placeholder="请输入" />
              </el-form-item>
              <el-form-item
                label="报关申报要素"
                v-if="form.productType === 1 && !isAdd"
                prop="declareInfo.declareElement"
                :rules="[
                  {
                    required: false,
                    trigger: ['blur', 'change'],
                    message: '请输入报关申报要素',
                  },
                ]"
              >
                <el-input
                  v-model.trim="form.declareInfo.declareElement"
                  placeholder="请输入"
                  maxlength="255"
                  show-word-limit
                />
              </el-form-item>
            </div>
            <div class="d-flex align-items-end justify-content-end text-gray-500">
              其他信息请到
              <el-link type="primary" @click="toSku">关联产品SKU</el-link>
              中修改
            </div>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane v-if="isMaterial" label="报关信息" :name="0">
          <KeenCard>
            <div class="item-grid">
              <el-form-item label="中文申报品名：" prop="declareInfo.declareName">
                <el-input v-model="form.declareInfo.declareName" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="英文申报品名：" prop="declareInfo.declareNameEn">
                <el-input v-model="form.declareInfo.declareNameEn" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="出口申报价值：">
                <div class="d-flex gap-2">
                  <el-form-item prop="declareInfo.declarePrice">
                    <NumberInput v-model="form.declareInfo.declarePrice" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item prop="declareInfo.declareCurrency">
                    <CurrencySelect v-model="form.declareInfo.declareCurrency" />
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item label="出口海关编码：">
                <el-input v-model="form.declareInfo.hsCode" placeholder="请输入出口海关编码" />
              </el-form-item>
              <el-form-item label="成交单位：">
                <el-input v-model="form.declareInfo.transactionUnit" placeholder="请输入成交单位" />
              </el-form-item>
              <el-form-item label="申报要素：">
                <el-input v-model="form.declareInfo.declareElement" placeholder="请输入申报要素" />
              </el-form-item>
              <el-form-item label="境内货源地：">
                <el-input
                  v-model="form.declareInfo.territoryGoods"
                  placeholder="请输入境内货源地"
                />
              </el-form-item>
              <el-form-item label="征免：">
                <el-select v-model="form.declareInfo.taxExemption" clearable>
                  <el-option label="照章征收" value="free_regulation" />
                  <el-option label="全免" value="free" />
                </el-select>
              </el-form-item>
              <el-form-item label="申报说明：">
                <el-input v-model="form.declareInfo.declareExplain" placeholder="请输入申报说明" />
              </el-form-item>
              <el-form-item label="海关属性：">
                <el-select
                  v-model="form.declareInfo.hsAttr"
                  class="w-100"
                  placeholder="请选择海关属性"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in hsAttrMap"
                    :label="item.desc"
                    :value="parseInt(item.value)"
                    :key="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="中文材质：">
                <el-input
                  v-model="form.declareInfo.productIngredient"
                  placeholder="请输入中文材质"
                />
              </el-form-item>
              <el-form-item label="英文材质：">
                <el-input
                  v-model="form.declareInfo.productIngredientEn"
                  placeholder="请输入英文材质"
                />
              </el-form-item>
              <el-form-item label="中文用途：">
                <el-input v-model="form.declareInfo.useCn" placeholder="请输入中文用途" />
              </el-form-item>
              <el-form-item label="英文用途：">
                <el-input v-model="form.declareInfo.useEn" placeholder="请输入英文用途" />
              </el-form-item>
            </div>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane v-if="isMaterial" label="清关信息" :name="1">
          <KeenCard title="">
            <div style="width: 100%" v-for="(item, index) in form.clearanceInfoList" :key="index">
              <el-form label-width="120px" label-position="top" :model="form" :rules="rules">
                <div class="d-flex">
                  <el-form-item
                    label="清关编码："
                    class="mr-15"
                    :prop="`clearanceInfoList[${index}].hsImportCode`"
                    :rules="[
                      {
                        required: false,
                        pattern: /^\d{0,255}$/,
                        message: '0~255个字符，数字格式',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                  >
                    <el-input
                      v-model="item.hsImportCode"
                      placeholder="请输入清关编码"
                      :maxlength="255"
                      show-word-limit
                    />
                  </el-form-item>
                  <el-form-item
                    label="清关税率："
                    class="mr-15"
                    :prop="`clearanceInfoList[${index}].hsTariffRate`"
                    :rules="[
                      {
                        required: false,
                        pattern: /^(?:100(?:\.00)?|[0-9]?[0-9](?:\.[0-9]{2})?)$/,
                        message: '0~100，支持两位小数',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                  >
                    <el-input v-model="item.hsTariffRate" placeholder="请输入清关税率">
                      <template #append>%</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    label="申报单价："
                    class="mr-15"
                    :prop="`clearanceInfoList[${index}].hsImportPrice`"
                  >
                    <div class="d-flex w-100 gap-2">
                      <el-form-item class="w-50">
                        <CurrencySelect v-model="item.hsImportCurrency" />
                      </el-form-item>
                      <el-form-item class="w-50">
                        <NumberInput
                          v-model="item.hsImportPrice"
                          placeholder="请输入"
                          :max="1000000"
                        />
                      </el-form-item>
                    </div>
                  </el-form-item>
                  <el-form-item label="适用国家" prop="baseInfo.country" class="mr-15">
                    <el-select
                      v-model="item.countryCodeList"
                      filterable
                      :teleported="false"
                      multiple
                      @change="handleCountryChange"
                      :disabled="index === 0"
                      style="width: 200px"
                    >
                      <el-option
                        v-for="country in countryMap"
                        :key="country.countryCode"
                        :label="country.desc"
                        :value="country.countryCode"
                        :disabled="countrySelectCodes.includes(country.countryCode)"
                      />
                    </el-select>
                  </el-form-item>
                  <el-button size="small" type="primary" @click="addItem">+</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delItem(index)"
                    :disabled="index === 0"
                  >
                    -
                  </el-button>
                </div>
              </el-form>
            </div>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane v-if="isMaterial || !isAdd" label="产品包装信息" :name="3">
          <KeenCard v-if="isMaterial">
            <div class="item-grid" v-if="checkPermission('supplyProductSpec')">
              <el-form-item label="毛重：" prop="specInfo.productWeight">
                <el-input v-model="form.specInfo.productWeight" placeholder="请输入毛重">
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="净重：" prop="specInfo.productNetWeight">
                <el-input v-model="form.specInfo.productNetWeight" placeholder="请输入净重">
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="包装尺寸：" required>
                <el-space>
                  <el-form-item prop="specInfo.productLength">
                    <el-input v-model="form.specInfo.productLength" placeholder="长">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item prop="specInfo.productWidth">
                    <el-input v-model="form.specInfo.productWidth" placeholder="宽">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item prop="specInfo.productHeight">
                    <el-input v-model="form.specInfo.productHeight" placeholder="高">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                </el-space>
              </el-form-item>
              <el-form-item label="净尺寸：" prop="productNetWeight">
                <el-space>
                  <el-form-item prop="specInfo.productNetLength" :rules="rules.fixed4">
                    <el-input v-model="form.specInfo.productNetLength" placeholder="长">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item prop="specInfo.productNetWidth" :rules="rules.fixed4">
                    <el-input v-model="form.specInfo.productNetWidth" placeholder="宽">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item prop="specInfo.productNetHeight" :rules="rules.fixed4">
                    <el-input v-model="form.specInfo.productNetHeight" placeholder="高">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                </el-space>
              </el-form-item>
              <el-form-item label="箱规：">
                <el-space>
                  <el-form-item prop="specInfo.cartonLength">
                    <el-input v-model="form.specInfo.cartonLength" placeholder="长">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item prop="specInfo.cartonWidth">
                    <el-input v-model="form.specInfo.cartonWidth" placeholder="宽">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item prop="specInfo.cartonHeight">
                    <el-input v-model="form.specInfo.cartonHeight" placeholder="高">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                </el-space>
              </el-form-item>
              <el-form-item prop="specInfo.cartonWeight" label="单箱重量：">
                <el-input v-model="form.specInfo.cartonWeight" placeholder="请输入单箱重量">
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="specInfo.cartonNum" label="单箱数量：" :rules="rules.integerRule">
                <el-input v-model="form.specInfo.cartonNum" placeholder="请输入单箱数量">
                  <template #append>套</template>
                </el-input>
              </el-form-item>
              <div class="merged-cell">
                <el-form-item label="物流属性：" prop="specInfo.sensitiveTypeCodeList">
                  <el-checkbox-group v-model="form.specInfo.sensitiveTypeCodeList">
                    <el-checkbox
                      v-for="item in sensitiveTypeList"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.desc }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
            <div class="item-grid" v-else>
              <el-form-item label="毛重：" prop="specInfo.productWeight">
                <span>{{ form.specInfo.productWeight || '-' }}</span>
              </el-form-item>
              <el-form-item label="净重：" prop="specInfo.productNetWeight">
                <span>{{ form.specInfo.productNetWeight || '-' }}kg</span>
              </el-form-item>
              <el-form-item label="包装尺寸：">
                <el-space>
                  <span>{{ form.specInfo.productLength || '-' }}cm</span>
                  *
                  <span>{{ form.specInfo.productWidth || '-' }}cm</span>
                  *
                  <span>{{ form.specInfo.productHeight || '-' }}cm</span>
                </el-space>
              </el-form-item>
              <el-form-item label="净尺寸：" prop="productNetWeight">
                <el-space>
                  <span>{{ form.specInfo.productNetLength || '-' }}cm</span>
                  *
                  <span>{{ form.specInfo.productNetWidth || '-' }}cm</span>
                  *
                  <span>{{ form.specInfo.productNetHeight || '-' }}cm</span>
                </el-space>
              </el-form-item>
              <el-form-item label="箱规：">
                <el-space>
                  <span>{{ form.specInfo.cartonLength || '-' }}cm</span>
                  *
                  <span>{{ form.specInfo.cartonWidth || '-' }}cm</span>
                  *
                  <span>{{ form.specInfo.cartonHeight || '-' }}cm</span>
                </el-space>
              </el-form-item>
              <el-form-item prop="specInfo.cartonWeight" label="单箱重量：">
                <span>{{ form.specInfo.cartonWeight || '-' }}kg</span>
              </el-form-item>
              <el-form-item prop="specInfo.cartonNum" label="单箱数量：">
                <span>{{ form.specInfo.cartonNum || '-' }}套</span>
              </el-form-item>
              <div class="merged-cell">
                <el-form-item label="物流属性：" prop="specInfo.sensitiveTypeCodeList">
                  <span
                    v-for="(sensitive, index) in form?.specInfo?.sensitiveTypeCodeList"
                    :key="sensitive"
                  >
                    <span>
                      {{ sensitiveTypeList?.find((x) => x.value === sensitive)?.desc }}
                    </span>
                    <span
                      class="me-3"
                      v-if="index !== form?.specInfo?.sensitiveTypeCodeList?.length - 1"
                    >
                      ,
                    </span>
                  </span>
                </el-form-item>
              </div>
            </div>
          </KeenCard>
          <KeenCard v-else>
            <div class="item-grid">
              <el-form-item label="材质：">
                <span>{{ form?.specInfo?.material || '-' }}</span>
              </el-form-item>
              <el-form-item label="产品净重：">
                <span>{{ form?.specInfo?.productNetWeight || '-' }}kg</span>
              </el-form-item>
              <el-form-item label="产品毛重：">
                <span>{{ form?.specInfo?.productWeight || '-' }}kg</span>
              </el-form-item>
              <el-form-item label="外箱毛重：" v-if="form.productType !== 1">
                <span>{{ form?.specInfo?.cartonWeight || '-' }}kg</span>
              </el-form-item>
              <el-form-item
                v-else
                label="外箱毛重："
                prop="specInfo.cartonWeight"
                :rules="[
                  { required: true, trigger: ['blur', 'change'], message: '请输入外箱毛重' },
                  rules.fixed4,
                  rules.maxFloat,
                ]"
              >
                <el-input
                  maxlength="11"
                  v-model="form.specInfo.cartonWeight"
                  placeholder="请输入外箱毛重"
                  clearable
                >
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="外箱净重：">
                <span>{{ form?.specInfo?.cartonNetWeight || '-' }}kg</span>
              </el-form-item>
              <el-form-item label="单箱数量：" v-if="form.productType !== 1">
                <span>{{ form?.specInfo?.cartonNum || '-' }}</span>
              </el-form-item>
              <el-form-item
                v-else
                prop="specInfo.cartonNum"
                label="单箱数量："
                :rules="[
                  { required: true, trigger: ['blur', 'change'], message: '请输入单箱数量' },
                  rules.positiveIntegerRule,
                  rules.maxInt,
                ]"
              >
                <el-input
                  v-model="form.specInfo.cartonNum"
                  placeholder="请输入单箱数量"
                  maxlength="9"
                >
                  <!-- <template #append>套</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="产品净尺寸：">
                <el-space>
                  <span>{{ form?.specInfo?.productNetLength || '-' }}cm</span>
                  *
                  <span>{{ form?.specInfo?.productNetWidth || '-' }}cm</span>
                  *
                  <span>{{ form?.specInfo?.productNetHeight || '-' }}cm</span>
                </el-space>
              </el-form-item>

              <el-form-item label="包装尺寸：">
                <el-space>
                  <span>{{ form?.specInfo?.productLength || '-' }}cm</span>
                  *
                  <span>{{ form?.specInfo?.productWidth || '-' }}cm</span>
                  *
                  <span>{{ form?.specInfo?.productHeight || '-' }}cm</span>
                </el-space>
              </el-form-item>

              <el-form-item label="外箱尺寸：" v-if="form.productType !== 1">
                <el-space>
                  <span>{{ form?.specInfo?.cartonLength || '-' }}cm</span>
                  *
                  <span>{{ form?.specInfo?.cartonWidth || '-' }}cm</span>
                  *
                  <span>{{ form?.specInfo?.cartonHeight || '-' }}cm</span>
                </el-space>
              </el-form-item>
              <!-- 产品 才有编辑 todo -->
              <el-form-item
                label="外箱尺寸："
                :rules="[{ required: true, trigger: ['blur', 'change'], message: '请输入长度' }]"
                v-else
              >
                <el-space>
                  <el-form-item
                    prop="specInfo.cartonLength"
                    :rules="[
                      { required: true, trigger: ['blur', 'change'], message: '请输入长度' },
                      specRule,
                      rules.maxFloat,
                    ]"
                  >
                    <el-input maxlength="11" v-model="form.specInfo.cartonLength" placeholder="长">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item
                    prop="specInfo.cartonWidth"
                    :rules="[
                      { required: true, trigger: ['blur', 'change'], message: '请输入宽度' },
                      specRule,
                      rules.maxFloat,
                    ]"
                  >
                    <el-input maxlength="11" v-model="form.specInfo.cartonWidth" placeholder="宽">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item
                    prop="specInfo.cartonHeight"
                    :rules="[
                      { required: true, trigger: ['blur', 'change'], message: '请输入高度' },
                      specRule,
                      rules.maxFloat,
                    ]"
                  >
                    <el-input maxlength="11" v-model="form.specInfo.cartonHeight" placeholder="高">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                </el-space>
              </el-form-item>
            </div>
            <el-form-item label="物流属性：" prop="sensitiveTypeCodeList">
              <span
                v-for="(sensitive, index) in form?.specInfo?.sensitiveTypeCodeList"
                :key="sensitive"
              >
                <span>
                  {{ sensitiveTypeList?.find((x) => x.value === sensitive)?.desc }}
                </span>
                <span
                  class="me-3"
                  v-if="index !== form?.specInfo?.sensitiveTypeCodeList.length - 1"
                >
                  ,
                </span>
              </span>
            </el-form-item>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane v-if="form.productType === 1 && isAdd" label="产品包装信息" :name="3">
          <KeenCard>
            <div class="item-grid">
              <el-form-item
                prop="specInfo.cartonWeight"
                label="外箱毛重："
                :rules="[
                  { required: true, trigger: ['blur', 'change'], message: '请输入外箱毛重' },
                  rules.fixed4,
                  rules.maxFloat,
                ]"
              >
                <el-input
                  v-model="form.specInfo.cartonWeight"
                  placeholder="请输入外箱毛重"
                  maxlength="11"
                >
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
              <el-form-item
                prop="specInfo.cartonNum"
                label="单箱数量："
                :rules="[
                  { required: true, trigger: ['blur', 'change'], message: '请输入单箱数量' },
                  rules.integerRule,
                  rules.maxInt,
                ]"
              >
                <el-input
                  v-model="form.specInfo.cartonNum"
                  placeholder="请输入单箱数量"
                  :maxlength="9"
                />
              </el-form-item>
              <el-form-item
                label="外箱尺寸："
                :rules="[{ required: true, trigger: ['blur', 'change'], message: '请输入长度' }]"
              >
                <el-space>
                  <el-form-item
                    prop="specInfo.cartonLength"
                    :rules="[
                      { required: true, trigger: ['blur', 'change'], message: '请输入长度' },
                      specRule,
                      rules.maxFloat,
                    ]"
                  >
                    <el-input v-model="form.specInfo.cartonLength" placeholder="长" maxlength="11">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item
                    prop="specInfo.cartonWidth"
                    :rules="[
                      { required: true, trigger: ['blur', 'change'], message: '请输入宽度' },
                      specRule,
                      rules.maxFloat,
                    ]"
                  >
                    <el-input v-model="form.specInfo.cartonWidth" placeholder="宽" maxlength="11">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                  *
                  <el-form-item
                    prop="specInfo.cartonHeight"
                    :rules="[
                      { required: true, trigger: ['blur', 'change'], message: '请输入高度' },
                      specRule,
                      rules.maxFloat,
                    ]"
                  >
                    <el-input v-model="form.specInfo.cartonHeight" placeholder="高" maxlength="11">
                      <template #append>cm</template>
                    </el-input>
                  </el-form-item>
                </el-space>
              </el-form-item>
            </div>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="采购信息" :name="10">
          <KeenCard>
            <div class="item-grid">
              <el-form-item label="是否默认采购：" v-if="!isAdd">
                {{ form?.purchaseInfo?.defaultPurchase ? '是' : '否' }}
              </el-form-item>
              <el-form-item label="供应商：" prop="purchaseInfo.supplierCode">
                <el-select
                  v-model="form.purchaseInfo.supplierCode"
                  placeholder="请选择供应商"
                  clearable
                  filterable
                  :teleported="false"
                  class="w-100"
                >
                  <el-option
                    v-for="item in supplierOptionsList"
                    :key="item.supplierCode"
                    :label="`${item.supplierCode}-${item.supplierName}` || ''"
                    :value="item.supplierCode!"
                  />
                </el-select>
                <!--            {{ form?.purchaseInfo?.supplierName }}-->
              </el-form-item>
              <el-form-item label="执行采购：" prop="purchaseInfo.purchaser">
                <DeptMember
                  v-model="form.purchaseInfo.purchaser"
                  placeholder="请选择执行采购"
                  clearable
                  filterable
                  :teleported="true"
                />
              </el-form-item>
              <el-form-item label="战略采购：" prop="purchaseInfo.strategicPurchaser">
                <DeptMember
                  v-model="form.purchaseInfo.strategicPurchaser"
                  placeholder="请选择战略采购"
                  clearable
                  filterable
                  :teleported="true"
                />
              </el-form-item>
              <el-form-item label="采购单价：">
                <div class="w-100 d-flex gap-2">
                  <el-form-item class="w-50 flex-grow-1">
                    <el-input
                      v-model="form.purchaseInfo.purchasePrice"
                      placeholder="请输入采购单价"
                    />
                  </el-form-item>
                  <el-form-item
                    prop="purchaseInfo.currencyCode"
                    :rules="[
                      {
                        required: form.purchaseInfo.purchasePrice,
                        trigger: 'change',
                        message: '请选择币种',
                      },
                    ]"
                  >
                    <CurrencySelect class="w-100" v-model="form.purchaseInfo.currencyCode" />
                  </el-form-item>
                </div>
              </el-form-item>
              <template v-if="!isAdd">
                <el-form-item label="标准LT：">
                  {{ form?.purchaseInfo?.standardLT || '-' }}
                </el-form-item>
                <el-form-item label="最小订单数量：">
                  {{ form?.purchaseInfo?.minQuantity || '-' }}
                </el-form-item>
                <el-form-item label="计划专员：" v-if="form.productType === 1">
                  {{ form?.purchaseInfo?.plannerName || '-' }}
                </el-form-item>
              </template>
            </div>
          </KeenCard>
        </el-tab-pane>
        <template v-if="isMaterial">
          <el-tab-pane label="财务信息" :name="15" style="height: 240px">
            <KeenCard>
              <el-form-item label="费用归属SPU：" prop="financeInfo.costProductSpu">
                <el-select
                  v-model="form.financeInfo.costProductSpu"
                  placeholder="请输入SPU关键字"
                  clearable
                  filterable
                  remote
                  :remote-method="remoteSPU"
                  :loading="loading"
                  class="w-100"
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in spuOptions"
                    :key="item.productSpu"
                    :label="`${item.aliasName} ${item.productSpu}  ` || ''"
                    :value="item.productSpu"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="费用归属GTM：">
                <span>{{ form?.financeInfo?.costMemberName || '-' }}</span>
              </el-form-item>
              <el-form-item label="费用归属品线：">
                <span>{{ form?.financeInfo?.productLineName || '-' }}</span>
              </el-form-item>
              <el-form-item label="费用归属分类：" v-if="form?.financeInfo?.categoryLevel">
                <span>{{ form?.financeInfo?.categoryLevel || '-' }}</span>
              </el-form-item>
              <el-form-item label="费用归属分类：" v-else>
                <span>{{ categoryName.length ? categoryName.join(' / ') : '-' }}</span>
              </el-form-item>
              <!-- <el-form-item label="费用归属GTM：" prop="financeInfo.costMemberCode">
                <el-select
                  v-model="form.financeInfo.costMemberCode"
                  placeholder="请选择费用归属GTM"
                  clearable
                  filterable
                  class="w-100"
                  disabled
                >
                  <el-option
                    v-for="item in gtmMemberList"
                    :key="item.memberCode"
                    :label="`${item.name}` || ''"
                    :value="item.memberCode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="费用归属品线：" prop="financeInfo.costProductLine">
                <el-select
                  v-model="form.financeInfo.costProductLine"
                  placeholder="请选择费用归属品线"
                  clearable
                  filterable
                  class="w-100"
                  disabled
                >
                  <el-option
                    v-for="item in gtmLineList"
                    :key="item.code"
                    :label="`${item.productLine}` || ''"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="费用归属分类：" prop="financeInfo.costMemberCode">
                <el-select
                  v-model="form.financeInfo.costMemberCode"
                  placeholder="请选择费用归属分类"
                  clearable
                  filterable
                  class="w-100"
                  disabled
                >
                  <el-option
                    v-for="item in gtmMemberList"
                    :key="item.memberCode"
                    :label="`${item.name}` || ''"
                    :value="item.memberCode"
                  />
                </el-select>
              </el-form-item> -->
            </KeenCard>
          </el-tab-pane>
        </template>
        <template v-if="!isMaterial">
          <el-tab-pane v-if="!isAdd" label="硬件参数信息" :name="2">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="输入：">
                  <span>{{ form?.hardwareParamInfo?.input || '-' }}</span>
                </el-form-item>
                <el-form-item label="输出：">
                  <span>{{ form?.hardwareParamInfo?.output || '-' }}</span>
                </el-form-item>
                <el-form-item label="最大负载功率：">
                  <span>{{ form?.hardwareParamInfo?.maxiLoadPower || '-' }}W</span>
                </el-form-item>
                <el-form-item label="最大负载电流：">
                  <span>{{ form?.hardwareParamInfo?.maxLoadCurrent || '-' }}A</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane v-if="!isAdd" label="产品回收信息" :name="4">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="回收总包装（产品包装+外包装）重量（克）：">
                  <span>{{ form?.recycleInfo?.recyclePackagingWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位（产品）：塑料重量（克）：">
                  <span>{{ form?.recycleInfo?.recyclePlasticWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位：外包装纸板重量（克）：">
                  <span>{{ form?.recycleInfo?.recycleOuterCardboardWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位：外包装塑料重量（克）：">
                  <span>{{ form?.recycleInfo?.recycleOuterPlasticWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位（产品）：纸板重量（克）：">
                  <span>{{ form?.recycleInfo?.recycleCardboardWeight || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane v-if="!isAdd" label="装运信息" :name="5">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="托盘类型：">
                  <span>{{ form?.shipmentInfo?.palletType || '-' }}</span>
                </el-form-item>
                <el-form-item label="托盘高度：">
                  <span>{{ form?.shipmentInfo?.palletHeight || '-' }}m</span>
                </el-form-item>
                <el-form-item label="托盘重量：">
                  <span>{{ form?.shipmentInfo?.palletWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="托盘单层箱数：">
                  <span>{{ form?.shipmentInfo?.palletSingleLayerBoxNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="托盘总层数：">
                  <span>{{ form?.shipmentInfo?.palletLayerNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="托盘单层尺寸（长*宽*高）：">
                  <el-space>
                    <span>{{ form?.shipmentInfo?.palletSingleLayerLength || '-' }}m</span>
                    *
                    <span>{{ form?.shipmentInfo?.palletSingleLayerWidth || '-' }}m</span>
                    *
                    <span>{{ form?.shipmentInfo?.palletSingleLayerHeight || '-' }}m</span>
                  </el-space>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane v-if="!isAdd" label="电池信息" :name="6">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="产品是否含有电池：">
                  <span>{{ form?.batteryInfo?.containsBatteryDesc ?? '-' }}</span>
                </el-form-item>
                <el-form-item label="电池是否内置：">
                  <span>{{ form?.batteryInfo?.batteryContainedDesc ?? '-' }}</span>
                </el-form-item>
                <el-form-item label="电池尺寸：">
                  <span>{{ form?.batteryInfo?.batterySize || '-' }}</span>
                </el-form-item>
                <el-form-item label="电池类型：">
                  <span>{{ form?.batteryInfo?.batteryType || '-' }}</span>
                </el-form-item>
                <el-form-item label="电压：">
                  <span>{{ form?.batteryInfo?.voltage || '-' }}V</span>
                </el-form-item>
                <el-form-item label="电池数量：">
                  <span>{{ form?.batteryInfo?.batteryNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="单电池重量（克）：">
                  <span>{{ form?.batteryInfo?.singleBatteryWeight || '-' }}g</span>
                </el-form-item>
                <el-form-item label="续航（年）：">
                  <span>{{ form?.batteryInfo?.endurance || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane v-if="!isAdd" label="认证信息" :name="7">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="认证产品名称（英文）：">
                  <span>{{ form?.certificationInfo?.certificationProductNameEn || '-' }}</span>
                </el-form-item>
                <el-form-item label="认证类型：">
                  <span>{{ form?.certificationInfo?.certificationName || '-' }}</span>
                </el-form-item>
                <el-form-item label="认证地址：">
                  <span>{{ form?.certificationInfo?.certificationAddress || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane v-if="!isAdd" label="质保信息" :name="8">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="英国制造商保修（以月为单位）：">
                  <span>{{ form?.warrantyInfo?.ukManufacturerWarranty || '-' }}</span>
                </el-form-item>
                <el-form-item label="英国消费者保修（以月为单位）：">
                  <span>{{ form?.warrantyInfo?.ukConsumerWarranty || '-' }}</span>
                </el-form-item>
                <el-form-item label="求助热线联系方式（电话和电子邮件）：">
                  <span>{{ form?.warrantyInfo?.helplineContact || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane v-if="!isAdd" label="渠道资料信息" :name="9">
            <KeenCard>
              <el-form-item label="线下渠道资料信息链接：">
                <el-link
                  v-if="form?.channelInfo?.offlineChannelInfoLink"
                  size="default"
                  type="primary"
                  target="_blank"
                  :href="form?.channelInfo?.offlineChannelInfoLink"
                  :underline="false"
                >
                  {{ form?.channelInfo?.offlineChannelInfoLink }}
                </el-link>
                <span v-else>-</span>
              </el-form-item>
            </KeenCard>
          </el-tab-pane>
        </template>
      </el-tabs>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
  <BindSku
    select-one
    v-if="bindSkuVisible"
    :visible="bindSkuVisible"
    :selected-rows="skuList"
    statuses="1,2"
    :productType="form.productType"
    @close="handleSkuGoodsClose"
  />
</template>

<script setup lang="ts" name="supplyGoodsEdit">
  import { dataApi, platformApi, productApi } from '@/api';
  import SpecificationsInfo from '@/views/goodscenter/components/specificationsInfo.vue';
  import NumberInput from '@/components/NumberInput/index.vue';
  import { ElMessage, FormRules } from 'element-plus';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { integerRule, priceRuleFixed4, positiveIntegerRule } from '@/utils/rulesRegExp';
  import * as swal from '@/utils/swal';
  import { checkPermission } from '@/utils/permission';

  const props = defineProps<{
    mode?: string;
  }>();

  const productTypeMap = {
    1: '产品',
    2: '物料',
    3: '用研产品',
    12: '配件',
    14: '虚拟产品',
    13: '组合产品',
  };

  const isAdd = computed(() => props.mode === 'add');

  const isMaterial = computed(() => {
    return form.value.productType === 2;
  });

  const route = useRoute();
  const router = useRouter();
  const defaultItem = {
    hsImportCode: '',
    countryCodeList: [],
    hsImportCurrency: '',
    hsImportPrice: '',
    hsTariffRate: '',
  };
  const formRef = ref();
  const form = ref({
    financeInfo: { costMemberCode: '', costProductLine: '' },
    productType: 1,
    productStatus: '',
    productTitle: null,
    productTitleEn: null,
    saleStatus: '',
    productImageList: [],
    specInfo: {
      productLevel: 1,
      qualityCheck: 1,
      sensitiveTypeCodeList: [],
    },
    purchaseInfo: {},
    declareInfo: {
      declareCurrency: 'USD',
      // sensitiveTypeCodeList: [],
    },
    clearanceInfo: {
      hsImportCurrency: 'USD',
    },
    clearanceInfoList: [],
  });

  const skuList = ref([]);

  const specRule = {
    pattern: priceRuleFixed4,
    message: '请输入整数或最多4位小数',
  };
  const rules = reactive<FormRules>({
    productImageList: [
      { required: true, type: 'array', message: '请上传图片', trigger: ['change', 'blur'] },
    ],
    suggestPrice: [{ required: true, message: '请输入建议销售价' }],
    suggestPriceCurrencyCode: [{ required: true, message: '请选择币种' }],
    productTitle: [{ required: true, message: '请输入产品中文名称' }],
    productSku: [{ required: true, message: '请输入供应链SKU' }],
    productTitleEn: [{ required: true, message: '请输入产品英文名称' }],
    productStatus: [{ required: true, trigger: 'change', message: '请选择产品状态' }],
    productType: [{ required: true, trigger: 'change', message: '请选择产品类型' }],
    saleStatus: [{ required: true, trigger: 'change', message: '请选择销售状态' }],
    financeInfo: {
      costProductSpu: [{ required: true, message: '请选择费用归属SPU' }],
      costMemberCode: [{ required: true, message: '请选择费用归属GTM' }],
      costProductLine: [{ required: true, message: '请选择费用归属品线' }],
    },
    declareInfo: {
      declarePrice: [{ required: true, message: '请输入出口申报价值' }],
      declareCurrency: [{ required: true, message: '请选择币种' }],
      declareElement: [
        { required: false, trigger: ['blur', 'change'], message: '请输入报关申报要素' },
      ],
      // 中英文申报名只在isMaterial为true时显示，所以直接去掉校验
      // declareName: [{ required: true, message: '请输入中文申报品名' }],
      // declareNameEn: [{ required: true, message: '请输入英文申报品名' }],
      /* sensitiveTypeCodeList: [
        { required: true, type: 'array', trigger: 'change', message: '请选择敏感类型' },
      ], */
    },
    clearanceInfo: {
      hsImportPrice: [{ required: true, message: '请输入进口申报价值' }],
      hsImportCurrency: [{ required: true, message: '请选择币种' }],
      hsTariffRate: [
        {
          pattern: priceRuleFixed4,
          message: '请输入整数或小数',
          trigger: ['blur', 'change'],
        },
      ],
    },
    purchaseInfo: {
      supplierCode: [{ required: true, trigger: 'change', message: '请选择供应商' }],
      purchaser: [{ required: true, trigger: 'change', message: '请选择执行采购' }],
      strategicPurchaser: [{ required: true, trigger: 'change', message: '请选择战略采购' }],
      purchasePrice: [{ required: true, trigger: ['blur', 'change'], message: '请输入采购价' }],
      // currencyCode: [{ required: true, trigger: 'change', message: '请选择币种' }],
    },
    specInfo: {
      productWeight: [
        {
          required: true,
          message: '请输入毛重',
          trigger: ['blur', 'change'],
        },
        specRule,
      ],
      productLength: [
        {
          required: true,
          message: '请输入长度',
          trigger: ['blur', 'change'],
        },
        specRule,
      ],
      productWidth: [
        {
          required: true,
          message: '请输入宽度',
          trigger: ['blur', 'change'],
        },
        specRule,
      ],
      productHeight: [
        {
          required: true,
          message: '请输入高度',
          trigger: ['blur', 'change'],
        },
        specRule,
      ],
      productNetWeight: [specRule],
      productNetLength: [specRule],
      productNetWidth: [specRule],
      productNetHeight: [specRule],
      cartonLength: [specRule],
      cartonWidth: [specRule],
      cartonHeight: [specRule],
      cartonWeight: [specRule],
      productLevel: [
        {
          required: true,
          message: '请选择产品等级',
          trigger: ['blur', 'change'],
        },
      ],
      qualityCheck: [
        {
          required: true,
          message: '请选择是否质检',
          trigger: ['blur', 'change'],
        },
      ],
      sensitiveTypeCodeList: [
        { required: true, type: 'array', trigger: 'change', message: '请选择物流属性' },
      ],
    },
    fixed4: {
      pattern: priceRuleFixed4,
      message: '请输入整数或最多4位小数',
    },
    maxFloat: { pattern: /^(\d{1,6})(\.\d{1,4})?$/, message: '不能超过999999.9999' },
    maxInt: { pattern: /^(0|[1-9]\d{0,8})$/, message: '不能超过999999999' },
    integerRule: {
      pattern: integerRule,
      message: '请输入整数',
    },
    positiveIntegerRule: {
      pattern: positiveIntegerRule,
      message: '请输入正整数',
    },
  });

  const tabCurrent = ref(0);

  const deepClone = (source) => {
    // 拷贝函数
    function clone(source) {
      if (!source) {
        return {};
      }

      const target = Array.isArray(source) ? [] : {};
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          //  循环遍历出所有属性，并复制给新的目标对象

          // 正则表达式
          if (source[key] instanceof RegExp) {
            target[key] = source[key];
            continue;
          }

          if (typeof source[key] === 'object') {
            // 递归调用深拷贝
            target[key] = clone(source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
      return target;
    }

    return clone(source);
  };

  const addItem = () => {
    form.value.clearanceInfoList.push(deepClone(defaultItem));
  };

  const delItem = (index) => {
    form.value.clearanceInfoList.splice(index, 1);
    handleCountryChange();
  };

  const countryMap = ref<any[]>([]);
  const countrySelectCodes = ref([]);

  const spuOptions = ref<any[]>([]);
  const loading = ref(false);
  const remoteSPU = async (query: string) => {
    if (query === '') {
      query = '  ';
    }
    // if (query.length) {
    loading.value = true;
    const key = query.length < 2 ? `${query}  ` : query;
    // const key = query.length > 2 ? query : '  ';
    const res = await productApi.luteosProductQueryProductList({
      keyWord: key,
      pageNum: 1,
      pageSize: 10,
      // status:2,
    });
    loading.value = false;
    spuOptions.value = res?.productBeanList;
    // console.log(spuOptions.value);
    // } else {
    //   spuOptions.value = [];
    // }
  };
  const handleChange = async (val: any) => {
    // console.log('Change', val);
    const spu = spuOptions.value.find((item) => item.productSpu === val);
    // form.value.financeInfo.costProductSpu = spu.val;
    form.value.financeInfo.costMemberCode = spu.gtm;
    form.value.financeInfo.costMemberName = spu.gtmName;
    form.value.financeInfo.costProductLine = spu.productLine;
    form.value.financeInfo.productLineName = spu.productLineName;
    form.value.financeInfo.categoryCode = spu.categoryCode;
    form.value.financeInfo.categoryLevel = spu.categoryLevel;
    console.log('spu', spu);
    console.log('form.value', form.value);
  };
  const getSiteOptions = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });

    countryMap.value = res?.countryList.map((item) => {
      return {
        desc: item.countryName,
        countryCode: item.countryCode,
      };
    });

    countryMap.value.unshift({
      countryCode: 'ALL',
      desc: '全球',
    });

    countrySelectCodes.value.push('ALL');
  };
  getSiteOptions();
  // 设置选项禁用逻辑
  const handleCountryChange = () => {
    countrySelectCodes.value = [];
    form.value.clearanceInfoList.forEach((item) => {
      const code = item.countryCodeList || [];
      countrySelectCodes.value = countrySelectCodes.value.concat(...code);
    });
  };
  // 产品类型为物料时非必填，去掉出口申报价值和declareCurrency的校验
  watch(isMaterial, (val) => {
    if (val) {
      rules.declareInfo.declarePrice = [{ required: false, message: '请输入出口申报价值' }];
      rules.declareInfo.declareCurrency = [{ required: false, message: '请选择币种' }];
      formRef.value?.clearValidate(['declareInfo.declarePrice', 'declareInfo.declareCurrency']);
    } else {
      rules.declareInfo.declarePrice = [{ required: true, message: '请输入出口申报价值' }];
      rules.declareInfo.declareCurrency = [{ required: true, message: '请选择币种' }];
    }
  });
  // 币种选择 产品类型为物料时非必填，去掉校验
  const onCurrencyChange = (val) => {
    if (isMaterial.value && !val) {
      // 清除校验错误
      formRef.value?.clearValidate(['declareInfo.declareCurrency']);
    }
  };

  const bindSkuVisible = ref(false);

  const handleSkuGoodsClose = async (reload = false, val) => {
    if (reload) {
      skuList.value = [val];
      form.value.productSpu = val.productSpu;
      form.value.productTitle = val.productTitle;
      form.value.productTitleEn = val.productTitleEn;
      form.value.productImageList = val.productImageUrl ? [val.productImageUrl] : [];
      if (isAdd.value) {
        form.value.declareInfo.declarePrice = val.declarePrice;
        form.value.declareInfo.declareCurrency = val.declareCurrency;
      }
      formRef.value?.validateField('productImageList');
    }
    bindSkuVisible.value = false;
  };

  const sensitiveTypeList = ref([]);
  const querySensitiveTypeList = async () => {
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageSize: 100,
    });
    sensitiveTypeList.value = res.sensitiveTypeBeanList.map((item) => {
      return {
        desc: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };

  const hsAttrMap = ref();
  const getHsAttrMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['hs_attr'],
    });
    hsAttrMap.value = res?.dictMap?.hs_attr;
  };
  const categoryName = ref([]);
  const getDetailInfo = async (code) => {
    if (!code) return;
    const res = await productApi.luteosProductSupplySkuQuerySupplySkuDetail({
      productSku: code,
    });
    spuOptions.value.push({
      aliasName: res?.financeInfo?.costProductName,
      productSpu: res?.financeInfo?.costProductSpu,
    });
    form.value = res;
    form.value.clearanceInfo = res?.clearanceInfo || {};
    form.value.specInfo.sensitiveTypeCodeList = res.specInfo?.sensitiveTypeCodeList || [];
    skuList.value = [
      {
        ...res?.productInfo,
        price: res?.productInfo?.suggestPrice,
        currency: res?.productInfo?.suggestPriceCurrencyCode,
      },
    ];

    if (!res?.clearanceInfoList?.length) {
      form.value.clearanceInfoList = [deepClone(defaultItem)];
      // 第一条默认全球
      form.value.clearanceInfoList[0]?.countryCodeList.push('ALL');
    } else {
      handleCountryChange();
    }
    let parent = res?.financeInfo?.productCategory;
    if (parent) {
      for (let i = 1; i <= 5; i += 1) {
        // form.categoryCode?.push(parent?.categoryCode);
        categoryName.value?.push(parent?.categoryName);
        parent = parent?.productCategory;
      }
    }
  };

  const saveLoading = ref<boolean>(false);

  const save = async () => {
    if (form.value?.declareInfo?.hsImportPrice) {
      rules.declareInfo.hsImportCurrency = [
        {
          required: true,
          message: '请选择币种',
        },
      ];
    } else {
      rules.declareInfo.hsImportCurrency = [
        {
          required: false,
          message: '请选择币种',
        },
      ];
    }
    try {
      const isValid = await formRef.value?.validate().catch(() => {
        return false; // 校验失败返回 false，不继续执行
      });
      if (!isValid) return;
    } catch (e) {
      const errorList = Object.keys(e);
      if (errorList?.length) {
        const info = errorList[0]?.split('.')[0];
        if (info === 'declareInfo') {
          tabCurrent.value = 0;
        }
        if (info === 'specInfo') {
          tabCurrent.value = 3;
        }
        if (info === 'purchaseInfo') {
          tabCurrent.value = 10;
        }
      }
      return;
    }

    if (form.value.productType === 1 && !skuList.value?.length) {
      ElMessage.warning('请关联产品SKU');
      return;
    }
    // 产品包装信息
    if (isMaterial.value && checkPermission('supplyProductSpec')) {
      if (
        form.value?.specInfo.productNetWeight &&
        form.value?.specInfo?.productWeight &&
        form.value?.specInfo?.productNetWeight / 1 >= form.value?.specInfo?.productWeight / 1
      ) {
        ElMessage.warning('产品毛重必须大于产品净重');
        return;
      }
    }
    try {
      saveLoading.value = true;
      const params = {
        ...form.value,
      };
      if (form.value.productType !== 2) {
        params.skuCode = skuList.value[0]?.skuCode;
        params.suggestPrice = skuList.value[0]?.price;
      }
      const res = await productApi.luteosProductSupplySkuSaveSupplySku(params);
      ElMessage.success(isAdd.value ? '新增成功' : '修改成功');
      if (isAdd.value) {
        router.push({
          path: '/supplyGoods/detail',
          query: {
            code: res?.productSku,
          },
        });
      }
    } finally {
      saveLoading.value = false;
    }
  };

  const supplierOptionsList = ref<any[]>([]);
  const getSupplierOptions = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierOptionsList.value = res?.supplierList;
  };
  const gtmMemberList = ref<any>([]);
  const queryGtmMemberList = async () => {
    const res = await productApi.luteosProductSupplySkuQueryGtmMemberList();
    gtmMemberList.value = res?.memberList;
  };
  const gtmLineList = ref<any>([]);
  const queryLineList = async () => {
    const res = await productApi.luteosProductSupplySkuQueryProductLineList();
    // console.log(res);
    gtmLineList.value = res?.recordList;
  };

  const toSku = () => {
    if (!skuList.value?.length) {
      ElMessage.warning('请先关联产品SKU');
      return;
    }
    if (!checkPermission('skuEdit')) {
      ElMessage.warning('您没有权限');
    } else {
      router.push({
        path: '/skulist/edit',
        query: {
          code: skuList.value[0]?.skuCode,
        },
      });
    }
  };

  const handleProductTypeChange = (val) => {
    skuList.value = [];
    form.value = {
      productType: val,
      productTitle: null,
      productTitleEn: null,
      productImageList: [],
      clearanceInfoList: [],
      specInfo: {
        productLevel: 1,
        qualityCheck: 1,
        sensitiveTypeCodeList: [],
      },
      purchaseInfo: {},
      financeInfo: { costMemberCode: '', costProductLine: '' },
      declareInfo: {
        declareCurrency: 'USD',
        // sensitiveTypeCodeList: [],
      },
      clearanceInfo: {
        hsImportCurrency: 'USD',
      },
    };

    if (+val === 2) {
      form.value.clearanceInfoList = [deepClone(defaultItem)];
      // 第一条默认全球
      form.value.clearanceInfoList[0]?.countryCodeList.push('ALL');
    }
    tabCurrent.value = 0;
  };

  onMounted(() => {
    getDetailInfo(route.query.code);
    querySensitiveTypeList();
    getHsAttrMap();
    getSupplierOptions();
    queryGtmMemberList();
    queryLineList();
  });

  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    router.push({
      name: 'supplyGoods',
    });
  };
</script>

<style scoped lang="scss">
  .arrows-icon {
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--bs-gray-100);
    }
  }
  .w-30 {
    width: 32%;
  }
  .ml-20 {
    margin-left: 20px;
    margin-right: 20px;
  }
  .mr-15 {
    margin-right: 15px;
  }

  .keen-ui .el-button--small {
    height: 30px !important;
    width: 20px;
    margin-top: 34px;
    font-size: 16px;
  }
  .custom-form {
    .tab-card {
      background: #fff;
      width: 100%;
    }
    :deep(.el-tabs__content) {
      margin-left: -30px;
    }
  }

  .item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 500px);
    gap: 16px;
  }

  .merged-cell {
    grid-column: span 2; /* 合并两列 */
  }

  .textarea {
    width: 100%;
    height: 115px;
    overflow: scroll;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    padding: 12px;
    line-height: 1.5;
  }

  :deep(.el-input-group__append) {
    padding: 0 8px;
  }
</style>
