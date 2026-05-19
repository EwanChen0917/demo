<template>
  <el-form
    ref="formRef"
    label-width="180px"
    label-position="top"
    class="custom-form"
    require-asterisk-position="right"
    :model="form"
    :rules="rules"
    scroll-to-error
  >
    <div class="main-content">
      <CustomCard :loading="loading" title="基础信息" id="baseInfo">
        <div class="item-grid">
          <el-form-item label="产品分类" prop="categoryNames">
            <OverflowTooltip
              :content="form?.categoryNames?.replace(/>/g, ' / ') || '-'"
              :line="1"
            />
          </el-form-item>
          <el-form-item label="产品SKU属性" prop="attrValueNames">
            <el-tag
              :style="{ marginTop: '7px', color: '#262626' }"
              type="info"
              v-if="form?.attrValueNames"
            >
              {{ form.attrValueNames }}
            </el-tag>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="产品类型" prop="productTypeDesc">
            <span>{{ form?.productTypeDesc || '-' }}</span>
          </el-form-item>
          <el-form-item label="VOC型号">
            <span>{{ form?.vocModel || '-' }}</span>
          </el-form-item>
          <el-form-item class="group-form-item" label="产品SKU建议销售价" required>
            <div v-if="isDetail" class="d-flex gap-1">
              <span>{{ form?.suggestPrice || '-' }}</span>
              <span class="ms-3 text-gray-600">{{ form?.suggestPriceCurrencyDesc || '-' }}</span>
            </div>
            <div v-else class="w-100 d-flex">
              <el-form-item prop="suggestPrice">
                <NumberInput
                  class="pre-selector"
                  v-model="form.suggestPrice"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item prop="suggestPriceCurrencyCode">
                <CurrencySelect
                  class="post-selector"
                  size="small"
                  v-model="form.suggestPriceCurrencyCode"
                />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="线上产品全称">
            <span v-if="isDetail">{{ form?.onlineProductFullName || '-' }}</span>
            <el-input
              v-else
              size="small"
              v-model="form.onlineProductFullName"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="产品经理" prop="createBy">
            <span v-if="isDetail">{{ form?.createByName || '-' }}</span>
            <OperatorSelect v-else size="small" teleported v-model="form.createBy" />
          </el-form-item>
          <el-form-item label="计划专员" prop="plannerName">
            <span v-if="isDetail">{{ form?.plannerName || '-' }}</span>
            <el-input v-else size="small" v-model="form.plannerName" clearable disabled />
          </el-form-item>
          <el-form-item label="型号" prop="modelCode">
            <span v-if="isDetail">{{ form?.modelName || '-' }}</span>
            <el-select
              v-else
              v-model="form.modelCode"
              size="small"
              placeholder="请选择型号"
              clearable
              filterable
            >
              <el-option
                v-for="item in modelOptions"
                :key="item.modelCode"
                :label="item.modelName || ''"
                :value="item.modelCode!"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="销售区域" prop="saleRegionList">
            <div v-if="isDetail">
              <span v-html="getSaleRegionList(form?.saleRegionList, 5)"></span>
              <el-tooltip placement="top" effect="light">
                <template #content>
                  <div
                    style="margin-right: 10px"
                    v-html="getSaleRegionList(form?.saleRegionList, 0)"
                  ></div>
                </template>
                <el-link
                  type="primary"
                  class="ms-4"
                  :underline="false"
                  v-if="form?.saleRegionList?.length > 4"
                >
                  查看更多
                </el-link>
              </el-tooltip>
            </div>
            <el-cascader
              v-else
              v-model="form.saleRegionList"
              size="small"
              :options="areaOptions"
              :props="{
                expandTrigger: 'hover',
                multiple: true,
                checkStrictly: false,
              }"
              placeholder="区域/国家"
              filterable
              clearable
              collapse-tags
              collapse-tags-tooltip
              class="w-100"
              popper-class="popper-class-sku-area"
            />
          </el-form-item>
          <el-form-item label="品牌" prop="brandCode">
            <span v-if="isDetail">{{ form?.brandName || '-' }}</span>
            <el-select
              v-else
              v-model="form.brandCode"
              size="small"
              placeholder="请选择品牌"
              clearable
              filterable
            >
              <el-option
                v-for="item in brandOptions"
                :key="item.brandCode"
                :label="item.brandName || ''"
                :value="item.brandCode!"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="适用周期">
            <span v-if="isDetail">{{ form?.applicablePeriod || '-' }}</span>
            <el-input
              v-else
              size="small"
              v-model="form.applicablePeriod"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="EAN 13码">
            <span v-if="isDetail">{{ form?.ean13 || '-' }}</span>
            <el-input v-else size="small" v-model="form.ean13" clearable placeholder="请输入" />
          </el-form-item>
          <el-form-item label="EAN 14码">
            <span v-if="isDetail">{{ form?.ean14 || '-' }}</span>
            <el-input v-else size="small" v-model="form.ean14" clearable placeholder="请输入" />
          </el-form-item>
        </div>
        <el-form-item label="彩盒内的所有产品及配件">
          <div v-if="isDetail" class="textarea">{{ form?.colorBoxContents || '-' }}</div>
          <el-input v-else type="textarea" v-model="form.colorBoxContents" clearable :rows="2" />
        </el-form-item>
        <el-form-item label="卖点">
          <div v-if="isDetail" class="textarea">{{ form?.sellingPoint || '-' }}</div>
          <el-input
            v-else
            type="textarea"
            v-model="form.sellingPoint"
            clearable
            :rows="2"
            disabled
          />
        </el-form-item>
        <el-form-item label="在线完整产品规格（要点）">
          <div v-if="isDetail" class="textarea">{{ form?.onlineFullProductSpecs || '-' }}</div>
          <el-input
            v-else
            type="textarea"
            v-model="form.onlineFullProductSpecs"
            clearable
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="备注">
          <div v-if="isDetail" class="textarea">{{ form?.remark || '-' }}</div>
          <el-input v-else type="textarea" v-model="form.remark" clearable :rows="2" />
        </el-form-item>
      </CustomCard>
      <CustomCard :loading="loading" title="组合信息" id="combinationInfo" v-if="isProductGroup">
        <el-table :data="form.skuItemBeanList">
          <el-table-column label="产品信息" min-width="240">
            <template #default="{ row }">
              <GoodsInfo :src="row.productImageUrl" :title="row.name">
                <template #description>
                  <div class="d-flex">
                    <span style="flex: 1">{{ row.skuCode }}</span>
                    <Tag :color="colorMap[row?.state]">{{ row?.stateDesc }}</Tag>
                  </div>
                </template>
              </GoodsInfo>
            </template>
          </el-table-column>
          <el-table-column label="建议售价（单价）" min-width="100">
            <template #default="{ row }">
              <div class="w-100 d-flex gap-1">
                <span>{{ row?.suggestPrice }}</span>
                <span>{{ row?.suggestPriceCurrencyCode }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" min-width="60">
            <template #default="{ row, $index }">
              <el-input v-model="row.qty" v-if="editIndex === $index" />
              <span v-else>{{ row?.qty || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用占比" min-width="80">
            <template #default="{ row }">
              <span v-if="row.suggestPrice && row.qty">
                {{ (((row.formatPrice * row.qty) / totalPrice) * 100).toFixed(2) + '%' }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="typeDesc" min-width="60" />
          <el-table-column label="产品经理" prop="developLuteName" min-width="80" />
          <el-table-column label="操作" min-width="60" v-if="!isDetail">
            <template #default="{ row, $index }">
              <KeenActions
                :actions="[
                  {
                    label: '编辑',
                    key: 'edit',
                    type: 'primary',
                    hide: editIndex === $index,
                    disabled: editIndex !== -1,
                    index: $index,
                    row: row,
                  },
                  {
                    label: '删除',
                    key: 'delete',
                    type: 'danger',
                    hide: editIndex === $index,
                    disabled: editIndex !== -1,
                    index: $index,
                  },
                  {
                    label: '取消',
                    key: 'cancel',
                    hide: editIndex !== $index,
                    index: $index,
                  },
                  {
                    label: '确认',
                    key: 'confirm',
                    type: 'primary',
                    hide: editIndex !== $index,
                    index: $index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button v-if="!isDetail" plain type="primary" size="small" @click="addSkuVisible = true">
          添加SKU
        </el-button>
      </CustomCard>
      <CustomCard :loading="loading" title="报关信息" id="declareInfo">
        <div class="item-grid">
          <el-form-item label="中文申报品名" prop="productDeclare.declareName">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.declareName || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.declareName"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="英文申报品名" prop="productDeclare.declareNameEn">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.declareNameEn || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.declareNameEn"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="出口申报价值">
            <div v-if="isDetail" class="d-flex">
              <span>{{ form?.productDeclare?.declarePrice || '-' }}</span>
              <span>{{ form?.productDeclare?.declareCurrency || '-' }}</span>
            </div>
            <div v-else class="d-flex">
              <el-form-item>
                <NumberInput
                  class="pre-selector"
                  v-model="form.productDeclare.declarePrice"
                  @change="handlePriceChange"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item>
                <CurrencySelect
                  class="post-selector"
                  size="small"
                  v-model="form.productDeclare.declareCurrency"
                />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="出口海关编码">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.hsCode || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.hsCode"
              placeholder="请输入出口海关编码"
              clearable
            />
          </el-form-item>
          <el-form-item label="成交单位">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.transactionUnit || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.transactionUnit"
              placeholder="请输入成交单位"
              clearable
            />
          </el-form-item>
          <el-form-item label="申报要素">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.declareElement || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.declareElement"
              placeholder="请输入申报要素"
              clearable
            />
          </el-form-item>
          <el-form-item label="境内货源地">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.territoryGoods || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.territoryGoods"
              placeholder="请输入境内货源地"
              clearable
            />
          </el-form-item>
          <el-form-item label="征免">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.taxExemptionDesc || '-'"
              :line="1"
            />
            <el-select v-else size="small" v-model="form.productDeclare.taxExemption" clearable>
              <el-option label="照章征收" value="free_regulation" />
              <el-option label="全免" value="free" />
            </el-select>
          </el-form-item>
          <el-form-item label="海关属性">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.hsAttrDesc || '-'"
              :line="1"
            />
            <el-select
              v-else
              size="small"
              v-model="form.productDeclare.hsAttr"
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
          <el-form-item label="中文材质">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.productMaterialIngredient || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.productMaterialIngredient"
              placeholder="请输入中文材质"
              clearable
            />
          </el-form-item>
          <el-form-item label="英文材质">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.productMaterialIngredientEn || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.productMaterialIngredientEn"
              placeholder="请输入英文材质"
              clearable
            />
          </el-form-item>
          <el-form-item label="中文用途">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.useCn || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.useCn"
              placeholder="请输入中文用途"
              clearable
            />
          </el-form-item>
          <el-form-item label="英文用途">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.useEn || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare.useEn"
              placeholder="请输入英文用途"
              clearable
            />
          </el-form-item>
          <el-form-item label="申报说明">
            <OverflowTooltip
              v-if="isDetail"
              :content="form?.productDeclare?.declareExplain || '-'"
              :line="1"
            />
            <el-input
              v-else
              size="small"
              v-model="form.productDeclare!.declareExplain"
              placeholder="请输入申报说明"
              clearable
            />
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="清关信息" id="clearanceInfo">
        <div v-if="!isDetail" :style="{ marginBottom: '20px' }">
          <el-button size="small" plain type="primary" @click="addItem">
            <el-icon class="Root-tyicon icon-Root-tyjia"></el-icon>
            <span>添加信息</span>
          </el-button>
        </div>
        <el-form label-width="0" :model="form" :rules="rules">
          <el-table :data="form.productClearanceList" border>
            <el-table-column label="清关编码" min-width="267">
              <template #default="{ row, $index }">
                <div v-if="isDetail">{{ row.hsImportCode || '-' }}</div>
                <el-form-item
                  v-else
                  :prop="`productClearanceList[${$index}].hsImportCode`"
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
                    size="small"
                    v-model="row.hsImportCode"
                    placeholder="请输入清关编码"
                    :maxlength="255"
                    show-word-limit
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="清关税率" min-width="267">
              <template #default="{ row, $index }">
                <div v-if="isDetail">
                  <span v-if="row.hsTariffRate">{{ row.hsTariffRate }}%</span>
                  <span v-else>-</span>
                </div>
                <el-form-item
                  v-else
                  :prop="`productClearanceList[${$index}].hsTariffRate`"
                  :rules="[
                    {
                      required: false,
                      pattern: /^(?:100(?:\.00)?|[0-9]?[0-9](?:\.[0-9]{2})?)$/,
                      message: '0~100，支持两位小数',
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input size="small" v-model="row.hsTariffRate" placeholder="请输入清关税率">
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="申报单价" min-width="267">
              <template #default="{ row, $index }">
                <div v-if="isDetail">
                  <span v-if="row.hsImportPrice">
                    {{ parseFloat(row.hsImportPrice).toFixed(2) }} {{ row.hsImportCurrencyDesc }}
                  </span>
                  <span v-else>-</span>
                </div>
                <el-form-item v-else :prop="`productClearanceList[${$index}].hsImportPrice`">
                  <div class="d-flex">
                    <el-form-item>
                      <NumberInput
                        class="pre-selector"
                        size="small"
                        v-model="row.hsImportPrice"
                        placeholder="请输入"
                        :max="1000000"
                      />
                    </el-form-item>
                    <el-form-item>
                      <CurrencySelect
                        class="post-selector"
                        size="small"
                        v-model="row.hsImportCurrency"
                      />
                    </el-form-item>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="适用国家" min-width="267">
              <template #default="{ row, $index }">
                <div v-if="isDetail">{{ row.countryNames || '-' }}</div>
                <el-form-item v-else :prop="`productClearanceList[${$index}].countryCodeList`">
                  <el-select
                    size="small"
                    v-model="row.countryCodeList"
                    filterable
                    multiple
                    @change="handleCountryChange"
                    :disabled="$index === 0"
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
              </template>
            </el-table-column>
            <el-table-column v-if="!isDetail" label="操作" width="60">
              <template #default="{ row, $index }">
                <el-button
                  size="small"
                  type="danger"
                  link
                  @click="delItem($index)"
                  :disabled="$index === 0"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </CustomCard>
      <CustomCard :loading="loading" title="产品包装信息" id="materialInfo">
        <el-form-item label="物流属性" prop="productSpec.sensitiveTypeCodeList">
          <el-checkbox-group
            v-if="checkPermission('skuProductSpec') && !isDetail"
            v-model="form.productSpec.sensitiveTypeCodeList"
          >
            <el-checkbox v-for="item in sensitiveTypeList" :key="item.value" :value="item.value">
              {{ item.desc }}
            </el-checkbox>
          </el-checkbox-group>
          <span
            v-else
            v-for="(sensitive, index) in form?.productSpec?.sensitiveTypeCodeList"
            :key="sensitive"
          >
            <span>
              {{ sensitiveTypeList?.find((x) => x.value === sensitive)?.desc }}
            </span>
            <span class="me-3" v-if="index !== form?.productSpec?.sensitiveTypeCodeList.length - 1">
              ,
            </span>
          </span>
        </el-form-item>
        <div class="item-grid grid-3" v-if="checkPermission('skuProductSpec') && !isDetail">
          <el-form-item label="产品毛重" prop="productSpec.productWeight">
            <el-input
              size="small"
              v-model="form.productSpec.productWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>kg</template>
            </el-input>
          </el-form-item>
          <el-form-item label="材质">
            <el-input
              size="small"
              v-model="form.productSpec.material"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="单箱数量">
            <el-input
              size="small"
              v-model="form.productSpec.cartonNum"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="包装尺寸" required>
            <el-space>
              <el-form-item prop="productSpec.productLength">
                <el-input size="small" v-model="form.productSpec.productLength" placeholder="长">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="productSpec.productWidth">
                <el-input size="small" v-model="form.productSpec.productWidth" placeholder="宽">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="productSpec.productHeight">
                <el-input size="small" v-model="form.productSpec.productHeight" placeholder="高">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
            </el-space>
          </el-form-item>
          <el-form-item label="产品净尺寸">
            <el-space>
              <el-form-item prop="productSpec.productNetLength" :rules="rules.fixed4">
                <el-input size="small" v-model="form.productSpec.productNetLength" placeholder="长">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="productSpec.productNetWidth" :rules="rules.fixed4">
                <el-input size="small" v-model="form.productSpec.productNetWidth" placeholder="宽">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="productSpec.productNetHeight" :rules="rules.fixed4">
                <el-input size="small" v-model="form.productSpec.productNetHeight" placeholder="高">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
            </el-space>
          </el-form-item>
          <el-form-item label="外箱尺寸">
            <el-space>
              <el-form-item prop="productSpec.cartonLength" :rules="rules.fixed4">
                <el-input size="small" v-model="form.productSpec.cartonLength" placeholder="长">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="productSpec.cartonWidth" :rules="rules.fixed4">
                <el-input size="small" v-model="form.productSpec.cartonWidth" placeholder="宽">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="productSpec.cartonHeight" :rules="rules.fixed4">
                <el-input size="small" v-model="form.productSpec.cartonHeight" placeholder="高">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
            </el-space>
          </el-form-item>
          <el-form-item label="产品净重" prop="productSpec.productNetWeight" :rules="rules.fixed4">
            <el-input
              size="small"
              v-model="form.productSpec.productNetWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>kg</template>
            </el-input>
          </el-form-item>
          <el-form-item label="外箱毛重" prop="productSpec.cartonWeight" :rules="rules.fixed4">
            <el-input
              size="small"
              v-model="form.productSpec.cartonWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>kg</template>
            </el-input>
          </el-form-item>
          <el-form-item label="外箱净重" prop="productSpec.cartonNetWeight" :rules="rules.fixed4">
            <el-input
              size="small"
              v-model="form.productSpec.cartonNetWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>kg</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="item-grid grid-3" v-else>
          <el-form-item label="产品毛重">
            <span>
              {{ form?.productSpec?.productWeight ? `${form.productSpec.productWeight}kg` : '-' }}
            </span>
          </el-form-item>
          <el-form-item label="材质">
            <span>{{ form?.productSpec?.material || '-' }}</span>
          </el-form-item>
          <el-form-item label="单箱数量">
            <span>{{ form?.productSpec?.cartonNum || '-' }}</span>
          </el-form-item>
          <el-form-item label="产品净尺寸">
            <el-space>
              <span>
                {{
                  form?.productSpec?.productNetLength
                    ? `${form.productSpec.productNetLength}cm`
                    : '-'
                }}
              </span>
              *
              <span>
                {{
                  form?.productSpec?.productNetWidth ? `${form.productSpec.productNetWidth}cm` : '-'
                }}
              </span>
              *
              <span>
                {{
                  form?.productSpec?.productNetHeight
                    ? `${form.productSpec.productNetHeight}cm`
                    : '-'
                }}
              </span>
            </el-space>
          </el-form-item>
          <el-form-item label="包装尺寸">
            <el-space>
              <span>
                {{ form?.productSpec?.productLength ? `${form.productSpec.productLength}cm` : '-' }}
              </span>
              *
              <span>
                {{ form?.productSpec?.productWidth ? `${form.productSpec.productWidth}cm` : '-' }}
              </span>
              *
              <span>
                {{ form?.productSpec?.productHeight ? `${form.productSpec.productHeight}cm` : '-' }}
              </span>
            </el-space>
          </el-form-item>
          <el-form-item label="外箱尺寸">
            <el-space>
              <span>
                {{ form?.productSpec?.cartonLength ? `${form.productSpec.cartonLength}cm` : '-' }}
              </span>
              *
              <span>
                {{ form?.productSpec?.cartonWidth ? `${form.productSpec.cartonWidth}cm` : '-' }}
              </span>
              *
              <span>
                {{ form?.productSpec?.cartonHeight ? `${form.productSpec.cartonHeight}cm` : '-' }}
              </span>
            </el-space>
          </el-form-item>
          <el-form-item label="产品净重">
            <span>
              {{
                form?.productSpec?.productNetWeight ? `${form.productSpec.productNetWeight}kg` : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="外箱毛重">
            <span>
              {{ form?.productSpec?.cartonWeight ? `${form.productSpec.cartonWeight}kg` : '-' }}
            </span>
          </el-form-item>
          <el-form-item label="外箱净重">
            <span>
              {{
                form?.productSpec?.cartonNetWeight ? `${form.productSpec.cartonNetWeight}kg` : '-'
              }}
            </span>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="硬件参数信息" id="hardwareInfo">
        <div class="item-grid" v-if="checkPermission('skuHardwareParamInfo') && !isDetail">
          <el-form-item label="输入">
            <el-input
              size="small"
              v-model="form.hardwareParamInfo.input"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="输出">
            <el-input
              size="small"
              v-model="form.hardwareParamInfo.output"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="最大负载功率"
            prop="hardwareParamInfo.maxiLoadPower"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.hardwareParamInfo.maxiLoadPower"
              placeholder="请输入"
              clearable
            >
              <template #append>W</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="最大负载电流"
            prop="hardwareParamInfo.maxLoadCurrent"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.hardwareParamInfo.maxLoadCurrent"
              placeholder="请输入"
              clearable
            >
              <template #append>A</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="item-grid" v-else>
          <el-form-item label="输入">
            <span>{{ form?.hardwareParamInfo?.input || '-' }}</span>
          </el-form-item>
          <el-form-item label="输出">
            <span>{{ form?.hardwareParamInfo?.output || '-' }}</span>
          </el-form-item>
          <el-form-item label="最大负载功率">
            <span>
              {{
                form?.hardwareParamInfo?.maxiLoadPower
                  ? `${form.hardwareParamInfo.maxiLoadPower}W`
                  : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="最大负载电流">
            <span>
              {{
                form?.hardwareParamInfo?.maxLoadCurrent
                  ? `${form.hardwareParamInfo.maxLoadCurrent}A`
                  : '-'
              }}
            </span>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="产品回收信息" id="recycleInfo">
        <div class="item-grid" v-if="checkPermission('skuRecycleInfo') && !isDetail">
          <el-form-item
            label="回收总包装重量（产品包装+外包装）"
            prop="recycleInfo.recyclePackagingWeight"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.recycleInfo.recyclePackagingWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>克</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="回收单位（产品）：塑料重量"
            prop="recycleInfo.recyclePlasticWeight"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.recycleInfo.recyclePlasticWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>克</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="回收单位：外包装纸板重量"
            prop="recycleInfo.recycleOuterCardboardWeight"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.recycleInfo.recycleOuterCardboardWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>克</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="回收单位：外包装塑料重量"
            prop="recycleInfo.recycleOuterPlasticWeight"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.recycleInfo.recycleOuterPlasticWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>克</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="回收单位（产品）：纸板重量"
            prop="recycleInfo.recycleCardboardWeight"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.recycleInfo.recycleCardboardWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>克</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="item-grid" v-else>
          <el-form-item label="回收总包装重量（产品包装+外包装）">
            <span>
              {{
                form?.recycleInfo?.recyclePackagingWeight
                  ? `${form.recycleInfo.recyclePackagingWeight}克`
                  : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="回收单位（产品）：塑料重量">
            <span>
              {{
                form?.recycleInfo?.recyclePlasticWeight
                  ? `${form.recycleInfo.recyclePlasticWeight}克`
                  : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="回收单位：外包装纸板重量">
            <span>
              {{
                form?.recycleInfo?.recycleOuterCardboardWeight
                  ? `${form.recycleInfo.recycleOuterCardboardWeight}克`
                  : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="回收单位：外包装塑料重量">
            <span>
              {{
                form?.recycleInfo?.recycleOuterPlasticWeight
                  ? `${form.recycleInfo.recycleOuterPlasticWeight}克`
                  : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="回收单位（产品）：纸板重量">
            <span>
              {{
                form?.recycleInfo?.recycleCardboardWeight
                  ? `${form.recycleInfo.recycleCardboardWeight}克`
                  : '-'
              }}
            </span>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="装运信息" id="shippingInfo">
        <div class="item-grid" v-if="checkPermission('skuShipmentInfo') && !isDetail">
          <el-form-item label="托盘类型">
            <el-input
              size="small"
              v-model="form.shipmentInfo.palletType"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="托盘高度" prop="shipmentInfo.palletHeight" :rules="rules.fixed4">
            <el-input
              size="small"
              v-model="form.shipmentInfo.palletHeight"
              placeholder="请输入"
              clearable
            >
              <template #append>m</template>
            </el-input>
          </el-form-item>
          <el-form-item label="托盘重量" prop="shipmentInfo.palletWeight" :rules="rules.fixed4">
            <el-input
              size="small"
              v-model="form.shipmentInfo.palletWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>kg</template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="托盘单层箱数"
            prop="shipmentInfo.palletSingleLayerBoxNum"
            :rules="rules.integerRule"
          >
            <el-input
              size="small"
              v-model="form.shipmentInfo.palletSingleLayerBoxNum"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="托盘总层数"
            prop="shipmentInfo.palletLayerNum"
            :rules="rules.integerRule"
          >
            <el-input
              size="small"
              v-model="form.shipmentInfo.palletLayerNum"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="托盘单层尺寸（长*宽*高）">
            <el-space>
              <el-form-item prop="shipmentInfo.palletSingleLayerLength" :rules="rules.fixed4">
                <el-input
                  size="small"
                  v-model="form.shipmentInfo.palletSingleLayerLength"
                  placeholder="长"
                  clearable
                >
                  <template #append>m</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="shipmentInfo.palletSingleLayerWidth" :rules="rules.fixed4">
                <el-input
                  size="small"
                  v-model="form.shipmentInfo.palletSingleLayerWidth"
                  placeholder="宽"
                  clearable
                >
                  <template #append>m</template>
                </el-input>
              </el-form-item>
              *
              <el-form-item prop="shipmentInfo.palletSingleLayerHeight" :rules="rules.fixed4">
                <el-input
                  size="small"
                  v-model="form.shipmentInfo.palletSingleLayerHeight"
                  placeholder="高"
                  clearable
                >
                  <template #append>m</template>
                </el-input>
              </el-form-item>
            </el-space>
          </el-form-item>
        </div>
        <div class="item-grid" v-else>
          <el-form-item label="托盘类型">
            <span>{{ form?.shipmentInfo?.palletType || '-' }}</span>
          </el-form-item>
          <el-form-item label="托盘高度">
            <span>
              {{ form?.shipmentInfo?.palletHeight ? `${form.shipmentInfo.palletHeight}m` : '-' }}
            </span>
          </el-form-item>
          <el-form-item label="托盘重量">
            <span>
              {{ form?.shipmentInfo?.palletWeight ? `${form.shipmentInfo.palletWeight}kg` : '-' }}
            </span>
          </el-form-item>
          <el-form-item label="托盘单层箱数">
            <span>{{ form?.shipmentInfo?.palletSingleLayerBoxNum || '-' }}</span>
          </el-form-item>
          <el-form-item label="托盘总层数">
            <span>{{ form?.shipmentInfo?.palletLayerNum || '-' }}</span>
          </el-form-item>
          <el-form-item label="托盘单层尺寸（长*宽*高）">
            <el-space>
              <span>
                {{
                  form?.shipmentInfo?.palletSingleLayerLength
                    ? `${form.shipmentInfo.palletSingleLayerLength}m`
                    : '-'
                }}
              </span>
              *
              <span>
                {{
                  form?.shipmentInfo?.palletSingleLayerWidth
                    ? `${form.shipmentInfo.palletSingleLayerWidth}m`
                    : '-'
                }}
              </span>
              *
              <span>
                {{
                  form?.shipmentInfo?.palletSingleLayerHeight
                    ? `${form.shipmentInfo.palletSingleLayerHeight}m`
                    : '-'
                }}
              </span>
            </el-space>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="电池信息" id="batteryInfo">
        <div class="item-grid" v-if="checkPermission('skuBatteryInfo') && !isDetail">
          <el-form-item label="产品是否含有电池">
            <el-radio-group v-model="form.batteryInfo.containsBattery">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电池是否内置">
            <el-radio-group v-model="form.batteryInfo.batteryContained">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电池尺寸">
            <el-input
              size="small"
              v-model="form.batteryInfo.batterySize"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="电池类型">
            <el-input
              size="small"
              v-model="form.batteryInfo.batteryType"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="电压" prop="batteryInfo.voltage" :rules="rules.fixed4">
            <el-input
              size="small"
              v-model="form.batteryInfo.voltage"
              placeholder="请输入"
              clearable
            >
              <template #append>V</template>
            </el-input>
          </el-form-item>
          <el-form-item label="电池数量" prop="batteryInfo.batteryNum" :rules="rules.integerRule">
            <el-input
              size="small"
              v-model="form.batteryInfo.batteryNum"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="单电池重量"
            prop="batteryInfo.singleBatteryWeight"
            :rules="rules.fixed4"
          >
            <el-input
              size="small"
              v-model="form.batteryInfo.singleBatteryWeight"
              placeholder="请输入"
              clearable
            >
              <template #append>kg</template>
            </el-input>
          </el-form-item>
          <el-form-item label="续航">
            <el-input
              size="small"
              v-model="form.batteryInfo.endurance"
              placeholder="请输入"
              clearable
            >
              <template #append>年</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="item-grid" v-else>
          <el-form-item label="产品是否含有电池">
            <span>{{ form?.batteryInfo?.containsBatteryDesc || '-' }}</span>
          </el-form-item>
          <el-form-item label="电池是否内置">
            <span>{{ form?.batteryInfo?.batteryContainedDesc || '-' }}</span>
          </el-form-item>
          <el-form-item label="电池尺寸">
            <span>{{ form?.batteryInfo?.batterySize || '-' }}</span>
          </el-form-item>
          <el-form-item label="电池类型">
            <span>{{ form?.batteryInfo?.batteryType || '-' }}</span>
          </el-form-item>
          <el-form-item label="电压">
            <span>{{ form?.batteryInfo?.voltage ? `${form.batteryInfo.voltage}V` : '-' }}</span>
          </el-form-item>
          <el-form-item label="电池数量">
            <span>{{ form?.batteryInfo?.batteryNum || '-' }}</span>
          </el-form-item>
          <el-form-item label="单电池重量">
            <span>
              {{
                form?.batteryInfo?.singleBatteryWeight
                  ? `${form.batteryInfo.singleBatteryWeight}kg`
                  : '-'
              }}
            </span>
          </el-form-item>
          <el-form-item label="续航">
            <span>
              {{ form?.batteryInfo?.endurance ? `${form.batteryInfo.endurance}年` : '-' }}
            </span>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="认证信息" id="certificationInfo">
        <div class="item-grid grid-3" v-if="checkPermission('skuCertificationInfo') && !isDetail">
          <el-form-item label="认证产品名称（英文）">
            <el-input
              size="small"
              v-model="form.certificationInfo.certificationProductNameEn"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="认证类型">
            <el-input
              size="small"
              v-model="form.certificationInfo.certificationName"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="认证地址">
            <el-input
              size="small"
              v-model="form.certificationInfo.certificationAddress"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </div>
        <div class="item-grid grid-3" v-else>
          <el-form-item label="认证产品名称（英文）">
            <span>{{ form?.certificationInfo?.certificationProductNameEn || '-' }}</span>
          </el-form-item>
          <el-form-item label="认证类型">
            <span>{{ form?.certificationInfo?.certificationName || '-' }}</span>
          </el-form-item>
          <el-form-item label="认证地址">
            <span>{{ form?.certificationInfo?.certificationAddress || '-' }}</span>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="质保信息" id="warrantyInfo">
        <div class="item-grid grid-3" v-if="checkPermission('skuWarrantyInfo') && !isDetail">
          <el-form-item
            label="英国制造商保修（以月为单位）"
            prop="warrantyInfo.ukManufacturerWarranty"
            :rules="rules.integerRule"
          >
            <el-input
              size="small"
              v-model="form.warrantyInfo.ukManufacturerWarranty"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="英国消费者保修（以月为单位）"
            prop="warrantyInfo.ukConsumerWarranty"
            :rules="rules.integerRule"
          >
            <el-input
              size="small"
              v-model="form.warrantyInfo.ukConsumerWarranty"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="求助热线联系方式（电话和电子邮件）"
            prop="warrantyInfo.helplineContact"
          >
            <el-input
              size="small"
              v-model="form.warrantyInfo.helplineContact"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </div>
        <div class="item-grid" v-else>
          <el-form-item label="英国制造商保修（以月为单位）">
            <span>{{ form?.warrantyInfo?.ukManufacturerWarranty || '-' }}</span>
          </el-form-item>
          <el-form-item label="英国消费者保修（以月为单位）">
            <span>{{ form?.warrantyInfo?.ukConsumerWarranty || '-' }}</span>
          </el-form-item>
          <el-form-item label="求助热线联系方式（电话和电子邮件）">
            <span>{{ form?.warrantyInfo?.helplineContact || '-' }}</span>
          </el-form-item>
        </div>
      </CustomCard>
      <CustomCard :loading="loading" title="渠道资料信息" id="channelInfo">
        <el-form-item label="线下渠道资料信息链接">
          <el-input
            v-if="checkPermission('skuChannelInfo') && !isDetail"
            size="small"
            v-model="form.channelInfo.offlineChannelInfoLink"
            placeholder="请输入"
            clearable
          />
          <template v-else>
            <el-link
              v-if="form?.channelInfo?.offlineChannelInfoLink"
              size="default"
              type="primary"
              target="_blank"
              :href="form?.channelInfo?.offlineChannelInfoLink"
              :underline="false"
            >
              {{ form.channelInfo.offlineChannelInfoLink }}
            </el-link>
            <span v-else>-</span>
          </template>
        </el-form-item>
      </CustomCard>
      <CustomCard v-if="isDetail" title="在售国家信息" id="saleCountryInfo">
        <el-table
          v-if="checkPermission('skurelationnew')"
          ref="tableRef"
          :data="listData?.saleSkuBeanList"
          row-key="uniqueCode"
        >
          <el-table-column label="渠道唯一标识" min-width="160" fixed>
            <template #header>
              渠道唯一标识
              <el-tooltip content="亚马逊为子ASIN、其他渠道为店铺SKU" placement="top" effect="dark">
                <el-icon class="Root-tyicon icon-Root-tyxunwen-1" />
              </el-tooltip>
            </template>
            <template #default="{ row }">
              <span>{{ row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode }}</span>
              <Copy :content="row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode" />
            </template>
          </el-table-column>
          <el-table-column label="店铺SKU" prop="msku" min-width="160">
            <template #default="{ row }">
              <span>{{ row.channel?.startsWith('amazon') ? row.msku : row.saleSkuCode }}</span>
              <Copy :content="row.channel?.startsWith('amazon') ? row.msku : row.saleSkuCode" />
            </template>
          </el-table-column>
          <el-table-column label="产品SKU*数量" min-width="160" v-if="search.status !== 1">
            <template #default="{ row }">
              <div v-if="[2, 3]?.includes(row.status)">-</div>
              <div
                v-else
                class="d-flex gap-1 align-items-center"
                v-for="(item, index) in row.skuRelationList"
                :key="index"
              >
                <span>
                  <span>{{ item.skuCode }}</span>
                  <Copy :content="item.skuCode" />
                </span>
                <span v-if="item.skuCode">*</span>
                <span v-else>-</span>
                <span>{{ item.skuQty }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="供应链SKU*数量" min-width="160">
            <template #default="{ row }">
              <div
                class="d-flex gap-1 align-items-center"
                v-for="(item, index) in row.skuRelationList"
                :key="index"
              >
                <span>
                  <span>{{ item.productSku }}</span>
                  <Copy :content="item.productSku" />
                </span>
                <span v-if="item.productSku">*{{ item.skuQty }}</span>
                <span v-else>-</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="channelName" label="渠道" min-width="100" />
          <el-table-column prop="userAccount" label="店铺账号" min-width="150" />
          <el-table-column prop="siteName" label="站点" min-width="100">
            <template #default="{ row }">
              <el-tag type="info">
                {{ row?.siteName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="typeDesc" label="类型" v-if="search.status !== 1" min-width="100">
            <template #default="{ row }">
              <span
                class="badge"
                :class="row.relType === 1 ? 'badge-light-info' : 'badge-light-primary'"
              >
                {{ row?.typeDesc || '-' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="运营" prop="operatorName" min-width="150">
            <template #default="{ row }">
              <el-tag v-if="row.operatorName" round type="info">
                <SvgIcon icon="fullUser" class="me-1" />
                <span>{{ row.operatorName }}</span>
              </el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="sourceDesc" label="来源" min-width="100" />
          <el-table-column label="备注" prop="remark" min-width="150">
            <template #default="{ row }">
              <OverflowTooltip :content="row?.remark || '-'" :line="1" />
            </template>
          </el-table-column>
          <el-table-column width="120px" label="操作" fixed="right">
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    row,
                    permissionCode: 'skurelationDetail',
                    hide: [1, 2, 3]?.includes(row.status),
                  },
                  {
                    label: '日志',
                    key: 'log',
                    type: 'primary',
                    row,
                  },
                ]"
                @click="handleActions2"
              />
            </template>
          </el-table-column>
        </el-table>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
      </CustomCard>
    </div>
  </el-form>
  <!-- <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!formDisabled">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div> -->

  <BindSku
    :visible="addSkuVisible"
    v-if="addSkuVisible"
    confirm-text="确定"
    @close="handleClose"
    :selected-rows="form.skuItemBeanList"
  />
  <AddSkuModal
    :title="skuModalTitle"
    :uniqueCode="uniqueCode"
    :visible="visible"
    v-if="visible"
    :type="operateType"
    @close="visible = false"
  />
  <LogDialog ref="logDialogRef" />
</template>

<script setup lang="ts" name="skuEdit">
  import { dataApi, platformApi, productApi, metaApi, ProductContracts, ProductApi } from '@/api';
  import SpecificationsInfo from '@/views/goodscenter/components/specificationsInfo.vue';
  import { ElMessage, FormRules } from 'element-plus';
  import NumberInput from '@/components/NumberInput/index.vue';
  import * as swal from '@/utils/swal';
  import { priceRuleFixed4, integerRule } from '@/utils/rulesRegExp';
  import { ProductGroupSkuItemBean } from '@/api/product/data-contracts';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import LogDialog from '@/views/goodscenter/goodsmanage/skurelation/components/logDialog.vue';
  import AddSkuModal from '@/views/goodscenter/goodsmanage/skulist/components/addSkuModal.vue';
  import useList from '@/hooks/list/useList';
  import { cloneDeep } from 'lodash-es';
  import { checkPermission } from '@/utils/permission';

  const colorMap = {
    1: 'yellow',
    2: 'green',
    3: 'blue',
    4: 'purple',
  };

  /** activated里用于判断是否进行过第一次请求 */
  const isMountedEnd = ref(false);

  const props = defineProps<{
    isDetail?: boolean;
  }>();

  const route = useRoute();
  const router = useRouter();
  const formRef = ref();
  const defaultItem = {
    hsImportCode: '',
    countryCodeList: [],
    hsImportCurrency: '',
    hsImportPrice: '',
    hsTariffRate: '',
  };
  const form = ref<Required<RequiredProductContracts.ProductSkuDetailResp>>({
    productImageList: [],
    productSpec: {},
    // productClearance: {},
    productDeclare: {},
    hardwareParamInfo: {},
    recycleInfo: {},
    shipmentInfo: {},
    batteryInfo: {},
    certificationInfo: {},
    warrantyInfo: {},
    channelInfo: {},
    productClearanceList: [],
    skuItemBeanList: [],
  });

  const rules = reactive<FormRules>({
    productImageList: [{ required: true, type: 'array', message: '请上传图片' }],
    suggestPrice: [{ required: true, message: '请输入建议销售价' }],
    suggestPriceCurrencyCode: [{ required: true, message: '请选择币种' }],
    productTitle: [{ required: true, message: '请输入供应链产品中文名' }],
    productTitleEn: [{ required: true, message: '请输入SKU英文名' }],
    modelCode: [{ required: true, message: '请选择型号', trigger: ['blur', 'change'] }],
    productDeclare: {
      declarePrice: [{ required: true, message: '请输入出口申报价值' }],
      declareCurrency: [{ required: true, message: '请选择币种' }],
      declareName: [{ required: true, message: '请输入中文申报品名' }],
      declareNameEn: [{ required: true, message: '请输入英文申报品名' }],
      sensitiveTypeCodeList: [
        { required: true, type: 'array', trigger: 'change', message: '请选择物流属性' },
      ],
    },
    purchaseInfo: {
      supplierCode: [{ required: true, trigger: 'change', message: '请选择供应商' }],
      purchaser: [{ required: true, trigger: 'change', message: '请选择采购员' }],
      purchasePrice: [{ required: true, trigger: ['blur', 'change'], message: '请输入采购价' }],
      currencyCode: [{ required: true, trigger: 'change', message: '请选择币种' }],
    },
    productSpec: {
      productWeight: [
        { required: true, message: '请输入产品毛重' },
        {
          pattern: priceRuleFixed4,
          message: '请输入整数或最多4位小数',
        },
      ],
      productLength: [
        { required: true, message: '请输入长度' },
        {
          pattern: priceRuleFixed4,
          message: '请输入整数或最多4位小数',
        },
      ],
      productWidth: [
        { required: true, message: '请输入宽度' },
        {
          pattern: priceRuleFixed4,
          message: '请输入整数或最多4位小数',
        },
      ],
      productHeight: [
        { required: true, message: '请输入高度' },
        {
          pattern: priceRuleFixed4,
          message: '请输入整数或最多4位小数',
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
    integerRule: {
      pattern: integerRule,
      message: '请输入整数',
    },
  });

  const tabCurrent = ref(0);
  const tabList = ref([
    'productDeclare',
    'productClearanceList',
    'hardwareParamInfo',
    'productSpec',
    'recycleInfo',
    'shipmentInfo',
    'batteryInfo',
    'certificationInfo',
    'warrantyInfo',
    'channelInfo',
  ]);

  // 销售区域
  const areaCountryList = ref([]);
  const getAreaCountryList = async () => {
    const res = await productApi.luteosProductSkuQueryCountry();
    if (res) {
      areaCountryList.value = res;
    }
  };

  getAreaCountryList();
  const areaOptions = computed(() => {
    return (areaCountryList.value || []).map((area) => {
      return {
        label: area.area,
        value: area.area,
        children: (area.countryList || []).map((c) => {
          return {
            label: c,
            value: c,
          };
        }),
      };
    });
  });

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
    form.value.productClearanceList.push(deepClone(defaultItem));
  };

  const delItem = (index) => {
    form.value.productClearanceList.splice(index, 1);
    handleCountryChange();
  };

  const countryMap = ref<
    {
      desc: string;
      countryCode: string;
    }[]
  >([]);
  const countrySelectCodes = ref<string[]>([]);

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
    form.value.productClearanceList.forEach((item) => {
      const code = item.countryCodeList || [];
      countrySelectCodes.value = countrySelectCodes.value.concat(...code);
    });
  };

  const hideFlag = ref<boolean>(true);
  const isDefault = ref(false);
  const loading = ref(false);

  const getDetailInfo = async (code) => {
    if (!code) return;
    loading.value = true;
    const res = await productApi
      .luteosProductSkuQueryProductSkuDetail({
        skuCode: code,
        operationType: 'update',
      })
      .finally(() => {
        loading.value = false;
      });
    if (!res.productImageList || res.productImageList.length === 0) {
      res.productImageList = [''];
    }

    form.value = res;
    // form.value.productClearance = res?.productClearance || {};
    if (!res?.productClearanceList?.length) {
      form.value.productClearanceList = [deepClone(defaultItem)];
      // 第一条默认全球
      form.value.productClearanceList[0]?.countryCodeList.push('ALL');
    } else {
      handleCountryChange();
    }
    form.value.skuItemBeanList = res.skuItemBeanList || [];
    search.saleSkuCode = code;
    isMountedEnd.value = true;
    return form.value;
  };

  // const specificationsInfoFormRef = ref();
  const saveLoading = ref<boolean>(false);

  const save = async () => {
    try {
      const validationResults = [4, 5].includes(form.value?.state)
        ? await formRef.value?.validateField([
            'productTitle',
            'productTitleEn',
            'suggestPrice',
            'suggestPriceCurrencyCode',
          ])
        : await Promise.all([
            formRef.value?.validate().catch(() => false),
            // specificationsInfoFormRef.value?.formRef.validate().catch(() => false),
          ]);
      const isValid = validationResults.every((result) => result === true);
      if (!isValid) return false;
    } catch (e) {
      // 跳转到第一个错误的tab
      const errorList = Object.keys(e);
      if (errorList?.length) {
        tabCurrent.value = tabList.value.findIndex((item) => item === errorList[0]?.split('.')[0]);
      }
      return false;
    }
    // 产品净重
    if (checkPermission('skuProductSpec')) {
      if (
        form.value?.productSpec?.productNetWeight &&
        form.value?.productSpec?.productWeight &&
        form.value?.productSpec?.productNetWeight / 1 >= form.value?.productSpec?.productWeight / 1
      ) {
        ElMessage.warning('产品毛重必须大于产品净重');
        return false;
      }
      if (
        form.value?.productSpec?.cartonNetWeight &&
        form.value?.productSpec?.cartonWeight &&
        form.value?.productSpec?.cartonNetWeight / 1 >= form.value?.productSpec?.cartonWeight / 1
      ) {
        ElMessage.warning('外箱毛重必须大于外箱净重');
        return false;
      }
    }
    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductSkuSaveSku({
        ...form.value,
      });
      ElMessage.success('保存成功');
      return true;
    } finally {
      saveLoading.value = false;
    }
  };

  const supplierOptionsList = ref<any[]>([]);
  const getSupplierOptions = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierOptionsList.value = res?.supplierList;
  };

  const brandOptions = ref([]);
  const modelOptions = ref([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
    modelOptions.value = res.modelBeanList;
  };

  const defaultProductSpec = ref({});
  const querySkuDefaultSpec = async () => {
    const res = await productApi.luteosProductSkuQuerySkuDefaultSpec({
      skuCode: route.query.code,
    });
    defaultProductSpec.value = res;
  };

  const hsAttrMap = ref();
  const getHsAttrMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['hs_attr'],
    });
    hsAttrMap.value = res?.dictMap?.hs_attr;
  };

  const sensitiveTypeList = ref<
    {
      desc: string;
      value: string;
    }[]
  >([]);
  const querySensitiveTypeList = async () => {
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageSize: 100,
    });
    sensitiveTypeList.value = res.sensitiveTypeBeanList!.map((item) => {
      return {
        desc: item.sensitiveTypeName!,
        value: item.sensitiveTypeCode!,
      };
    });
  };

  const handlePriceChange = (val) => {
    if (!val)
      rules.productDeclare.hsImportCurrency = [
        {
          required: false,
          message: '请选择币种',
        },
      ];
  };

  // 是否组合商品
  const isProductGroup = computed(() => {
    return form.value.productType === 13;
  });
  const totalPrice = computed(() => {
    return form.value.skuItemBeanList.reduce((total, item) => {
      return total + item.formatPrice * item.qty;
    }, 0);
  });
  watch(
    () => form.value.skuItemBeanList,
    (list) => {
      if (list.length > 0) {
        list.forEach(async (item) => {
          item.formatPrice =
            item.suggestPriceCurrencyCode === 'USD'
              ? item.suggestPrice
              : await formatPrice(item.suggestPrice, item.suggestPriceCurrencyCode);
        });
      }
    }
  );

  const formatPrice = async (amount, currency) => {
    if (!amount || !currency) return '';
    const res = await metaApi.luteosMetaCurrencyRateConvert({
      amount,
      sourceCurrency: currency,
      targetCurrency: 'USD',
    });
    return res?.amount;
  };

  const editIndex = ref<number>(-1);
  const oldItem = ref<ProductGroupSkuItemBean>({});
  const handleActions = (item) => {
    const { row, index, key } = item;
    switch (key) {
      case 'edit':
        editIndex.value = index;
        oldItem.value = cloneDeep(row);
        break;
      case 'delete':
        form.value.skuItemBeanList.splice(index, 1);
        break;
      case 'cancel':
        editIndex.value = -1;
        form.value.skuItemBeanList[index] = oldItem.value;
        break;
      case 'confirm':
        editIndex.value = -1;
        break;
      default:
        break;
    }
  };

  const addSkuVisible = ref<boolean>(false);
  const oldList = ref<any[]>([]);
  const handleClose = (reload, list) => {
    if (reload) {
      oldList.value = form.value.skuItemBeanList;
      form.value.skuItemBeanList = list.map((item) => {
        const lastItem = oldList.value?.find((old) => old.skuCode === item.skuCode);
        return {
          skuCode: item.skuCode,
          name: lastItem?.name || item.productTitle,
          suggestPrice: lastItem?.suggestPrice || item.price,
          suggestPriceCurrencyCode: lastItem?.suggestPriceCurrencyCode || item.currency,
          type: 1,
          typeDesc: '产品',
          productImageUrl: item.productImageUrl,
          developLuteName: lastItem?.developLuteName || item.createByName,
          state: item.state,
          stateDesc: item.stateDesc,
          qty: lastItem?.qty || 1,
        };
      });
    }
    addSkuVisible.value = false;
  };

  onMounted(() => {
    // getDetailInfo(route.query.code);
    getSupplierOptions();
    getProductRelationList();
    querySkuDefaultSpec();
    getHsAttrMap();
    querySensitiveTypeList();
  });

  onActivated(() => {
    if (!isMountedEnd.value) return;
    // getDetailInfo(route.query.code);
  });
  defineExpose({
    init: getDetailInfo,
    handleSave: save,
  });
  const PAGE_SIZE = 10;
  const {
    search,
    // searchData,
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
    ProductApi.LuteosProductSaleSkuQuerySaleSkuList.RequestQuery,
    ProductApi.LuteosProductSaleSkuQuerySaleSkuList.ResponseBody
  >({
    searchDefaults: {
      saleSkuCode: undefined,
      channel: undefined,
      type: undefined,
      userAccount: undefined,
      site: undefined,
      status: '',
      source: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuQuerySaleSkuList,
    serviceManual: true,
  });
  const toSkuList = (code, productType) => {
    if (productType === 1) {
      router.push(`/skulist/detail?code=${code}`);
    } else {
      router.push(`/supplyGoods/detail?code=${code}`);
    }
  };
  const uniqueCode = ref();
  const skuModalTitle = ref('');
  const operateType = ref();
  const logDialogRef = ref();
  const visible = ref(false);
  const handleActions2 = async (operate) => {
    const { key, row } = operate;
    if (key === 'view') {
      uniqueCode.value = row.uniqueCode;
      skuModalTitle.value = '详情';
      operateType.value = 'detail';
      visible.value = true;
    } else if (key === 'log') {
      logDialogRef.value?.open(row.uniqueCode);
    }
  };
  const getSaleRegionList = (list, num) => {
    if (list) {
      let areaCountryList = JSON.parse(JSON.stringify(list)) || [];
      if (num && areaCountryList.length > num) {
        areaCountryList = areaCountryList.splice(0, num);
      }
      const areaList = [...new Set(areaCountryList.map((x) => x[0]).filter(Boolean))];
      let text = '';
      if (areaList.length) {
        areaList.forEach((res) => {
          const countryList = [
            ...new Set(areaCountryList.map((x) => x[0] === res && x[1]).filter(Boolean)),
          ];
          text =
            text + `<span style='font-weight: bold;'>${res}</span>：${countryList.join('，')}</br>`;
        });
        return text;
      } else {
        return '-';
      }
    }
    return '-';
  };
</script>

<style scoped lang="scss">
  .main-content {
    padding: 6px 0 6px 0;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
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
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
    row-gap: 8px;
    &.grid-3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .pre-selector {
    --el-border-radius-base: 6px 0 0 6px;
    &:focus-within {
      z-index: 1;
    }
    :deep(.el-input) {
      --el-input-border-radius: 6px 0 0 6px;
    }
  }
  .post-selector {
    transform: translateX(-1px);
    --el-border-radius-base: 0 6px 6px 0;
    :deep(.el-input) {
      --el-input-border-radius: 0 6px 6px 0;
    }
  }
  :deep(.el-input-group__append) {
    padding: 0 8px;
  }
  :deep(.el-cascader) {
    .el-cascader__tags {
      top: 0;
      transform: translateY(0);

      .el-tag {
        max-width: 100px;
      }
    }
  }
</style>
