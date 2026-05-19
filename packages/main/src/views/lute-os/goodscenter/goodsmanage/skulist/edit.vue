<template>
  <el-form
    ref="formRef"
    label-width="180px"
    label-position="left"
    class="custom-form"
    :model="form"
    :rules="rules"
    scroll-to-error
  >
    <KeenCard title="基础信息">
      <el-form-item label="产品图">
        <KeenImageUpload
          v-model="form.productImageList[0]"
          directory="product/goods"
          tooltip="更改产品图片"
        />
      </el-form-item>
      <div class="item-grid">
        <el-form-item label="产品分类：" prop="categoryNames">
          <span>{{ form?.categoryNames }}</span>
        </el-form-item>
        <el-form-item label="产品SPU：" prop="productSpu">
          <span>{{ form?.productSpu }}</span>
          <router-link
            class="ms-5"
            target="_blank"
            v-if="form.productSpu"
            :to="`/goodslist/detail?code=${form.productSpu}`"
          >
            产品详情
          </router-link>
        </el-form-item>
        <el-form-item label="产品SKU：" prop="skuCode">
          <span>{{ form?.skuCode }}</span>
        </el-form-item>
        <el-form-item label="产品SKU状态：" prop="state">
          <Tag :color="colorMap[form?.state]">{{ form?.stateDesc }}</Tag>
        </el-form-item>
        <el-form-item label="产品SKU属性：" prop="attrValueNames">
          <el-tag v-if="form.attrValueNames">{{ form?.attrValueNames }}</el-tag>
        </el-form-item>
        <el-form-item label="产品类型：" prop="productTypeDesc">
          <span>{{ form?.productTypeDesc }}</span>
        </el-form-item>
        <el-form-item class="group-form-item" label="产品SKU建议销售价：" required>
          <div class="w-100 d-flex gap-5">
            <el-form-item prop="suggestPrice">
              <NumberInput v-model="form.suggestPrice" placeholder="请输入" />
            </el-form-item>
            <el-form-item prop="suggestPriceCurrencyCode">
              <CurrencySelect v-model="form.suggestPriceCurrencyCode" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="产品中文名：" prop="productTitle">
          <el-input v-model="form.productTitle" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="产品英文名：" prop="productTitleEn">
          <el-input v-model="form.productTitleEn" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="线上产品全称：">
          <el-input v-model="form.onlineProductFullName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="产品经理：" prop="createBy">
          <OperatorSelect v-model="form.createBy" />
        </el-form-item>
        <el-form-item label="品牌：" prop="brandCode">
          <el-select
            v-model="form.brandCode"
            placeholder="请选择品牌"
            clearable
            filterable
            class="w-100"
          >
            <el-option
              v-for="item in brandOptions"
              :key="item.brandCode"
              :label="item.brandDesc || ''"
              :value="item.brandCode!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号：" prop="modelCode">
          <el-select
            v-model="form.modelCode"
            placeholder="请选择型号"
            clearable
            filterable
            class="w-100"
          >
            <el-option
              v-for="item in modelOptions"
              :key="item.modelCode"
              :label="item.modelName || ''"
              :value="item.modelCode!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="EAN 13码：">
          <el-input v-model="form.ean13" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="EAN 14码：">
          <el-input v-model="form.ean14" clearable placeholder="请输入" />
        </el-form-item>
      </div>
      <el-form-item label="彩盒内的所有产品及配件：">
        <el-input type="textarea" v-model="form.colorBoxContents" clearable :rows="5" />
      </el-form-item>
      <el-form-item label="卖点：">
        <el-input type="textarea" v-model="form.sellingPoint" clearable :rows="5" />
      </el-form-item>
      <el-form-item label="在线完整产品规格（要点）：">
        <el-input type="textarea" v-model="form.onlineFullProductSpecs" clearable :rows="5" />
      </el-form-item>
    </KeenCard>
    <KeenCard title="组合信息" v-if="isProductGroup">
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
            <div class="w-100 d-flex gap-2">
              <span>{{ row?.suggestPrice }}</span>
              <span class="text-gray-500">{{ row?.suggestPriceCurrencyCode }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" min-width="60">
          <template #default="{ row, $index }">
            <el-input v-model="row.qty" v-if="editIndex === $index" />
            <span v-else>{{ row?.qty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用占比" min-width="80">
          <template #default="{ row }">
            <span v-if="row.suggestPrice && row.qty">
              {{ (((row.formatPrice * row.qty) / totalPrice) * 100).toFixed(2) + '%' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="typeDesc" min-width="60" />
        <el-table-column label="产品经理" prop="developLuteName" min-width="80" />
        <el-table-column label="操作" min-width="60">
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
      <el-button plain type="primary" size="small" @click="addSkuVisible = true">添加SKU</el-button>
    </KeenCard>
    <div class="d-flex gap-5">
      <KeenCard title="" class="tab-card">
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="报关信息" :name="0">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="中文申报品名：" prop="productDeclare.declareName">
                  <el-input
                    v-model="form.productDeclare.declareName"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="英文申报品名：" prop="productDeclare.declareNameEn">
                  <el-input
                    v-model="form.productDeclare.declareNameEn"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="出口申报价值：">
                  <div class="d-flex gap-2">
                    <el-form-item>
                      <NumberInput
                        v-model="form.productDeclare.declarePrice"
                        @change="handlePriceChange"
                        placeholder="请输入"
                      />
                    </el-form-item>
                    <el-form-item>
                      <CurrencySelect v-model="form.productDeclare.declareCurrency" />
                    </el-form-item>
                  </div>
                </el-form-item>
                <el-form-item label="出口海关编码：">
                  <el-input
                    v-model="form.productDeclare.hsCode"
                    placeholder="请输入出口海关编码"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="成交单位：">
                  <el-input
                    v-model="form.productDeclare.transactionUnit"
                    placeholder="请输入成交单位"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="申报要素：">
                  <el-input
                    v-model="form.productDeclare.declareElement"
                    placeholder="请输入申报要素"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="境内货源地：">
                  <el-input
                    v-model="form.productDeclare.territoryGoods"
                    placeholder="请输入境内货源地"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="征免：">
                  <el-select v-model="form.productDeclare.taxExemption" clearable>
                    <el-option label="照章征收" value="free_regulation" />
                    <el-option label="全免" value="free" />
                  </el-select>
                </el-form-item>
                <el-form-item label="申报说明：">
                  <el-input
                    v-model="form.productDeclare.declareExplain"
                    placeholder="请输入申报说明"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="海关属性：">
                  <el-select
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
                <el-form-item label="中文材质：">
                  <el-input
                    v-model="form.productDeclare.productMaterialIngredient"
                    placeholder="请输入中文材质"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="英文材质：">
                  <el-input
                    v-model="form.productDeclare.productMaterialIngredientEn"
                    placeholder="请输入英文材质"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="中文用途：">
                  <el-input
                    v-model="form.productDeclare.useCn"
                    placeholder="请输入中文用途"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="英文用途：">
                  <el-input
                    v-model="form.productDeclare.useEn"
                    placeholder="请输入英文用途"
                    clearable
                  />
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="清关信息" :name="1">
            <KeenCard title="">
              <div
                style="width: 100%"
                v-for="(item, index) in form.productClearanceList"
                :key="index"
              >
                <el-form label-width="120px" label-position="top" :model="form" :rules="rules">
                  <div class="d-flex">
                    <el-form-item
                      label="清关编码："
                      class="mr-15"
                      :prop="`productClearanceList[${index}].hsImportCode`"
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
                      :prop="`productClearanceList[${index}].hsTariffRate`"
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
                      :prop="`productClearanceList[${index}].hsImportPrice`"
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
          <el-tab-pane label="产品包装信息" :name="3">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuProductSpec')">
                <el-form-item label="材质：">
                  <el-input v-model="form.productSpec.material" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item
                  label="产品净重："
                  prop="productSpec.productNetWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.productSpec.productNetWeight"
                    placeholder="请输入"
                    clearable
                  >
                    <template #append>kg</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="产品毛重：" prop="productSpec.productWeight">
                  <el-input v-model="form.productSpec.productWeight" placeholder="请输入" clearable>
                    <template #append>kg</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="外箱毛重："
                  prop="productSpec.cartonWeight"
                  :rules="rules.fixed4"
                >
                  <el-input v-model="form.productSpec.cartonWeight" placeholder="请输入" clearable>
                    <template #append>kg</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="外箱净重："
                  prop="productSpec.cartonNetWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.productSpec.cartonNetWeight"
                    placeholder="请输入"
                    clearable
                  >
                    <template #append>kg</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="单箱数量：">
                  <el-input v-model="form.productSpec.cartonNum" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="产品净尺寸：">
                  <el-space>
                    <el-form-item prop="productSpec.productNetLength" :rules="rules.fixed4">
                      <el-input v-model="form.productSpec.productNetLength" placeholder="长">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="productSpec.productNetWidth" :rules="rules.fixed4">
                      <el-input v-model="form.productSpec.productNetWidth" placeholder="宽">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="productSpec.productNetHeight" :rules="rules.fixed4">
                      <el-input v-model="form.productSpec.productNetHeight" placeholder="高">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                  </el-space>
                </el-form-item>

                <el-form-item label="包装尺寸：" required>
                  <el-space>
                    <el-form-item prop="productSpec.productLength">
                      <el-input v-model="form.productSpec.productLength" placeholder="长">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="productSpec.productWidth">
                      <el-input v-model="form.productSpec.productWidth" placeholder="宽">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="productSpec.productHeight">
                      <el-input v-model="form.productSpec.productHeight" placeholder="高">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                  </el-space>
                </el-form-item>

                <el-form-item label="外箱尺寸：">
                  <el-space>
                    <el-form-item prop="productSpec.cartonLength" :rules="rules.fixed4">
                      <el-input v-model="form.productSpec.cartonLength" placeholder="长">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="productSpec.cartonWidth" :rules="rules.fixed4">
                      <el-input v-model="form.productSpec.cartonWidth" placeholder="宽">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="productSpec.cartonHeight" :rules="rules.fixed4">
                      <el-input v-model="form.productSpec.cartonHeight" placeholder="高">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                  </el-space>
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
                <el-form-item label="材质：">
                  <span>{{ form?.productSpec?.material || '-' }}</span>
                </el-form-item>
                <el-form-item label="产品净重：">
                  <span>{{ form?.productSpec?.productNetWeight || '-' }}g</span>
                </el-form-item>
                <el-form-item label="产品毛重：">
                  <span>{{ form?.productSpec?.productWeight || '-' }}g</span>
                </el-form-item>
                <el-form-item label="外箱毛重：">
                  <span>{{ form?.productSpec?.cartonWeight || '-' }}g</span>
                </el-form-item>
                <el-form-item label="外箱净重：">
                  <span>{{ form?.productSpec?.cartonNetWeight || '-' }}g</span>
                </el-form-item>
                <el-form-item label="单箱数量：">
                  <span>{{ form?.productSpec?.cartonNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="产品净尺寸：">
                  <el-space>
                    <span>{{ form?.productSpec?.productNetLength || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productNetWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productNetHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>

                <el-form-item label="包装尺寸：">
                  <el-space>
                    <span>{{ form?.productSpec?.productLength || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>

                <el-form-item label="外箱尺寸：">
                  <el-space>
                    <span>{{ form?.productSpec?.cartonLength || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.cartonWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.cartonHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>
              </div>
              <el-form-item label="物流属性：" prop="productSpec.sensitiveTypeCodeList">
                <el-checkbox-group
                  v-if="checkPermission('skuProductSpec')"
                  v-model="form.productSpec.sensitiveTypeCodeList"
                >
                  <el-checkbox
                    v-for="item in sensitiveTypeList"
                    :key="item.value"
                    :label="item.value"
                  >
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
                  <span
                    class="me-3"
                    v-if="index !== form?.productSpec?.sensitiveTypeCodeList.length - 1"
                  >
                    ,
                  </span>
                </span>
              </el-form-item>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="硬件参数信息" :name="2">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuHardwareParamInfo')">
                <el-form-item label="输入：">
                  <el-input v-model="form.hardwareParamInfo.input" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="输出：">
                  <el-input
                    v-model="form.hardwareParamInfo.output"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="最大负载功率："
                  prop="hardwareParamInfo.maxiLoadPower"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.hardwareParamInfo.maxiLoadPower"
                    placeholder="请输入"
                    clearable
                  >
                    <template #append>W</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="最大负载电流："
                  prop="hardwareParamInfo.maxLoadCurrent"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.hardwareParamInfo.maxLoadCurrent"
                    placeholder="请输入"
                    clearable
                  >
                    <template #append>A</template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
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
          <el-tab-pane label="产品回收信息" :name="4">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuRecycleInfo')">
                <el-form-item
                  label="回收总包装（产品包装+外包装）重量（克）："
                  prop="recycleInfo.recyclePackagingWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.recycleInfo.recyclePackagingWeight"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="回收单位（产品）：塑料重量（克）："
                  prop="recycleInfo.recyclePlasticWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.recycleInfo.recyclePlasticWeight"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="回收单位：外包装纸板重量（克）："
                  prop="recycleInfo.recycleOuterCardboardWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.recycleInfo.recycleOuterCardboardWeight"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="回收单位：外包装塑料重量（克）："
                  prop="recycleInfo.recycleOuterPlasticWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.recycleInfo.recycleOuterPlasticWeight"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="回收单位（产品）：纸板重量（克）："
                  prop="recycleInfo.recycleCardboardWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.recycleInfo.recycleCardboardWeight"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
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
          <el-tab-pane label="装运信息" :name="5">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuShipmentInfo')">
                <el-form-item label="托盘类型：">
                  <el-input v-model="form.shipmentInfo.palletType" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item
                  label="托盘高度："
                  prop="shipmentInfo.palletHeight"
                  :rules="rules.fixed4"
                >
                  <el-input v-model="form.shipmentInfo.palletHeight" placeholder="请输入" clearable>
                    <template #append>m</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="托盘重量："
                  prop="shipmentInfo.palletWeight"
                  :rules="rules.fixed4"
                >
                  <el-input v-model="form.shipmentInfo.palletWeight" placeholder="请输入" clearable>
                    <template #append>kg</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="托盘单层箱数："
                  prop="shipmentInfo.palletSingleLayerBoxNum"
                  :rules="rules.integerRule"
                >
                  <el-input
                    v-model="form.shipmentInfo.palletSingleLayerBoxNum"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="托盘总层数："
                  prop="shipmentInfo.palletLayerNum"
                  :rules="rules.integerRule"
                >
                  <el-input
                    v-model="form.shipmentInfo.palletLayerNum"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="托盘单层尺寸（长*宽*高）：">
                  <el-space>
                    <el-form-item prop="shipmentInfo.palletSingleLayerLength" :rules="rules.fixed4">
                      <el-input
                        v-model="form.shipmentInfo.palletSingleLayerLength"
                        placeholder="请输入"
                        clearable
                      >
                        <template #append>m</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="shipmentInfo.palletSingleLayerWidth" :rules="rules.fixed4">
                      <el-input
                        v-model="form.shipmentInfo.palletSingleLayerWidth"
                        placeholder="请输入"
                        clearable
                      >
                        <template #append>m</template>
                      </el-input>
                    </el-form-item>
                    *
                    <el-form-item prop="shipmentInfo.palletSingleLayerHeight" :rules="rules.fixed4">
                      <el-input
                        v-model="form.shipmentInfo.palletSingleLayerHeight"
                        placeholder="请输入"
                        clearable
                      >
                        <template #append>m</template>
                      </el-input>
                    </el-form-item>
                  </el-space>
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
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
          <el-tab-pane label="电池信息" :name="6">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuBatteryInfo')">
                <el-form-item label="产品是否含有电池：">
                  <el-select v-model="form.batteryInfo.containsBattery">
                    <el-option :value="1" label="是" />
                    <el-option :value="0" label="否" />
                  </el-select>
                </el-form-item>
                <el-form-item label="电池是否内置：">
                  <el-select v-model="form.batteryInfo.batteryContained">
                    <el-option :value="1" label="是" />
                    <el-option :value="0" label="否" />
                  </el-select>
                </el-form-item>
                <el-form-item label="电池尺寸：">
                  <el-input v-model="form.batteryInfo.batterySize" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="电池类型：">
                  <el-input v-model="form.batteryInfo.batteryType" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="电压：" prop="batteryInfo.voltage" :rules="rules.fixed4">
                  <el-input v-model="form.batteryInfo.voltage" placeholder="请输入" clearable>
                    <template #append>V</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="电池数量："
                  prop="batteryInfo.batteryNum"
                  :rules="rules.integerRule"
                >
                  <el-input v-model="form.batteryInfo.batteryNum" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item
                  label="单电池重量（克）："
                  prop="batteryInfo.singleBatteryWeight"
                  :rules="rules.fixed4"
                >
                  <el-input
                    v-model="form.batteryInfo.singleBatteryWeight"
                    placeholder="请输入"
                    clearable
                  >
                    <template #append>kg</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="续航（年）：">
                  <el-input v-model="form.batteryInfo.endurance" placeholder="请输入" clearable />
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
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
          <el-tab-pane label="认证信息" :name="7">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuCertificationInfo')">
                <el-form-item label="认证产品名称（英文）：">
                  <el-input
                    v-model="form.certificationInfo.certificationProductNameEn"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="认证类型：">
                  <el-input
                    v-model="form.certificationInfo.certificationName"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="认证地址：">
                  <el-input
                    v-model="form.certificationInfo.certificationAddress"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
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
          <el-tab-pane label="质保信息" :name="8">
            <KeenCard>
              <div class="item-grid" v-if="checkPermission('skuWarrantyInfo')">
                <el-form-item
                  label="英国制造商保修（以月为单位）："
                  prop="warrantyInfo.ukManufacturerWarranty"
                  :rules="rules.integerRule"
                >
                  <el-input
                    v-model="form.warrantyInfo.ukManufacturerWarranty"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="英国消费者保修（以月为单位）："
                  prop="warrantyInfo.ukConsumerWarranty"
                  :rules="rules.integerRule"
                >
                  <el-input
                    v-model="form.warrantyInfo.ukConsumerWarranty"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label="求助热线联系方式（电话和电子邮件）："
                  prop="warrantyInfo.helplineContact"
                >
                  <el-input
                    v-model="form.warrantyInfo.helplineContact"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </div>
              <div class="item-grid" v-else>
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
          <el-tab-pane label="渠道资料信息" :name="9">
            <KeenCard>
              <el-form-item label="线下渠道资料信息链接：">
                <el-input
                  v-if="checkPermission('skuChannelInfo')"
                  v-model="form.channelInfo.offlineChannelInfoLink"
                  placeholder="请输入"
                  clearable
                />
                <span v-else>{{ form?.channelInfo?.offlineChannelInfoLink || '-' }}</span>
              </el-form-item>
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </KeenCard>
    </div>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!formDisabled">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>

  <BindSku
    :visible="addSkuVisible"
    v-if="addSkuVisible"
    confirm-text="确定"
    @close="handleClose"
    :selected-rows="form.skuItemBeanList"
  />
</template>

<script setup lang="ts" name="skuEdit">
  import { dataApi, platformApi, productApi, metaApi } from '@/api';
  import SpecificationsInfo from '@/views/lute-os/goodscenter/components/specificationsInfo.vue';
  import { ElMessage, FormRules } from 'element-plus';
  import NumberInput from '@/components/NumberInput/index.vue';
  import * as swal from '@/utils/swal';
  import { priceRuleFixed4, integerRule } from '@/utils/rulesRegExp';
  import { ProductGroupSkuItemBean } from '@/api/product/data-contracts';
  import BindSku from '@/views/lute-os/goodscenter/bindGoods/Modal/bindSku.vue';
  import { cloneDeep } from 'lodash-es';
  import { checkPermission } from '@/utils/permission';

  const colorMap = {
    1: 'yellow',
    2: 'green',
    3: 'blue',
    4: 'purple',
  };

  const props = defineProps<{
    mode?: string;
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
  const form = ref({
    productImageList: [],
    productSpec: {},
    productClearance: {},
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

  const countryMap = ref<any[]>([]);
  const countrySelectCodes = ref([]);

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

  const getDetailInfo = async (code) => {
    if (!code) return;
    const res = await productApi.luteosProductSkuQueryProductSkuDetail({
      skuCode: code,
      operationType: 'update',
    });
    if (!res.productImageList || res.productImageList.length === 0) {
      res.productImageList = [''];
    }

    form.value = res;
    form.value.productClearance = res?.productClearance || {};
    if (!res?.productClearanceList?.length) {
      form.value.productClearanceList = [deepClone(defaultItem)];
      // 第一条默认全球
      form.value.productClearanceList[0]?.countryCodeList.push('ALL');
    } else {
      handleCountryChange();
    }
    form.value.skuItemBeanList = res.skuItemBeanList || [];
  };

  const specificationsInfoFormRef = ref();
  const saveLoading = ref<boolean>(false);

  const save = async () => {
    try {
      const isValid = [4, 5].includes(form.value?.state)
        ? await formRef.value?.validateField([
            'productTitle',
            'productTitleEn',
            'suggestPrice',
            'suggestPriceCurrencyCode',
          ])
        : await Promise.all([
            formRef.value?.validate(),
            specificationsInfoFormRef.value?.formRef.validate(),
          ]);
      if (!isValid) return;
    } catch (e) {
      // 跳转到第一个错误的tab
      const errorList = Object.keys(e);
      if (errorList?.length) {
        tabCurrent.value = tabList.value.findIndex((item) => item === errorList[0]?.split('.')[0]);
      }
      return;
    }

    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductSkuSaveSku({
        ...form.value,
      });
      ElMessage.success('保存成功');
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
    getDetailInfo(route.query.code);
    getSupplierOptions();
    getProductRelationList();
    querySkuDefaultSpec();
    getHsAttrMap();
    querySensitiveTypeList();
  });

  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    router.push({
      name: 'skulist',
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

  :deep(.el-input-group__append) {
    padding: 0 8px;
  }
</style>
