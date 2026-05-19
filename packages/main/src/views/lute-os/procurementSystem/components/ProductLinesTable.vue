<template>
  <el-card v-if="useCard" shadow="never" class="product-lines-card">
    <template v-if="showHeader" #header>
      <div class="card-header">
        <div>
          <span class="title">采购产品信息</span>
          <span class="subtitle">单个需求最多添加 {{ maxLine }} 个产品</span>
        </div>
        <el-button v-if="addable" type="primary" @click="handleAddLine">添加一行</el-button>
      </div>
    </template>

    <div class="product-lines-table-wrapper">
      <el-table ref="tableRef" :data="products" v-bind="tableAttrs" class="product-lines-table">
        <slot name="prefix-columns" />

      <el-table-column
        v-if="showColumn('productType')"
        label-class-name="required-label"
        label="采购产品类型"
        min-width="210"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'productType') }"
            :ref="(el) => setFieldRef($index, 'productType', el)"
          >
            <template v-if="productFieldsEditable">
              <PurchaseCategorySelect
                v-model="row.productTypeCode"
                placeholder="请选择采购产品类型"
                @change="(code, node) => handleCategoryChange(row, $index, code, node)"
                :teleported="true"
              />
            </template>
            <template v-else>
              <span>{{ displayProductType(row) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('productInfo')"
        label-class-name="required-label"
        label="采购产品信息"
        min-width="220"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'productInfo') }"
            :ref="(el) => setFieldRef($index, 'productInfo', el)"
          >
            <div class="source-container">
              <div class="source-input">
                <template v-if="productFieldsEditable && row.productTypeCode === '0'">
                  <el-input
                    v-model="row.productInfo"
                    maxlength="50"
                    show-word-limit
                    placeholder="请输入采购产品信息"
                    clearable
                    @input="() => handleFieldChange(row, $index, 'productInfo')"
                    @change="() => handleFieldChange(row, $index, 'productInfo')"
                  />
                </template>
                <template v-else-if="productFieldsEditable && row.infoSourceType !== 'custom'">
                  <PurchaseMaterialSelect
                    v-model="row.productInfoCode"
                    :category-code="row.productTypeCode || row.productType"
                    :disabled-material-codes="getDisabledMaterialCodes($index)"
                    placeholder="请选择采购产品"
                    @change="(val, material) => handleMaterialChange(row, $index, val, material)"
                    :teleported="true"
                  />
                </template>
                <template v-else-if="productFieldsEditable">
                  <el-input
                    v-model="row.productInfo"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入自定义产品信息"
                    clearable
                    @input="() => handleFieldChange(row, $index, 'productInfo')"
                    @change="() => handleFieldChange(row, $index, 'productInfo')"
                  />
                </template>
                <template v-else>
                  <span>{{ displayProductInfo(row) }}</span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('unitPrice')"
        label-class-name="required-label"
        label="采购单价"
        width="160"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'unitPrice') }"
            :ref="(el) => setFieldRef($index, 'unitPrice', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row._unitPriceStr"
                placeholder="请输入采购单价"
                @input="(value) => handleUnitPriceInput(value, row)"
                @blur="() => handleUnitPriceBlur(row, $index)"
              />
            </template>
            <template v-else>
              <span>{{ formatAmount(row.unitPrice) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('currency')"
        label-class-name="required-label"
        label="币种"
        width="200"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'currency') }"
            :ref="(el) => setFieldRef($index, 'currency', el)"
          >
            <template v-if="editable">
              <CurrencySelect
                v-model="row.currency"
                @change="() => handleFieldChange(row, $index, 'currency')"
                isPurchase
              />
            </template>
            <template v-else>
              <span>{{ formatCurrencyDisplay(row.currency) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('quantity')"
        label-class-name="required-label"
        label="采购数量"
        width="160"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'quantity') }"
            :ref="(el) => setFieldRef($index, 'quantity', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row._quantityStr"
                placeholder="请输入采购数量"
                @input="(value) => handleQuantityInput(value, row)"
                @blur="() => handleQuantityBlur(row, $index)"
              />
            </template>
            <template v-else>
              <span>{{ formatQuantity(row.quantity) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="showColumn('totalPrice')" label="采购总价" width="200">
        <template #default="{ row }">
          <span>{{ formatTotal(row) }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="showColumn('supplier')" label="指定供应商" min-width="200">
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'supplier') }"
            :ref="(el) => setFieldRef($index, 'supplier', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row.supplier"
                maxlength="50"
                show-word-limit
                placeholder="若有指定供应商请填写"
                @change="() => handleFieldChange(row, $index, 'supplier')"
              />
            </template>
            <template v-else>
              <OverflowTooltip :content="row.supplier || placeholder" :line="2" />
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('supplierReason')"
        label="指定供应商原因"
        min-width="240"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'supplierReason') }"
            :ref="(el) => setFieldRef($index, 'supplierReason', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row.supplierReason"
                maxlength="50"
                show-word-limit
                placeholder="此处输入指定供应商的原因说明"
                @change="() => handleFieldChange(row, $index, 'supplierReason')"
              />
            </template>
            <template v-else>
              <OverflowTooltip :content="row.supplierReason || placeholder" :line="2" />
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="showColumn('remark')" label="备注" min-width="220">
        <template #default="{ row, $index }">
          <template v-if="editable">
            <el-input
              v-model="row.remark"
              maxlength="500"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4 }"
              show-word-limit
              placeholder="请输入备注"
              @change="() => handleFieldChange(row, $index, 'remark')"
            />
          </template>
          <template v-else>
            <OverflowTooltip :content="row.remark || placeholder" :line="2" />
          </template>
        </template>
      </el-table-column>

        <slot name="suffix-columns" />

        <el-table-column v-if="addable" label="操作" width="100" fixed="right">
          <template #default="{ $index }">
            <el-button
              type="danger"
              link
              :disabled="products.length <= 1"
              @click="removeLine($index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>

  <div v-else class="product-lines-card">
    <div v-if="showHeader" class="card-header">
      <div>
        <span class="title">采购产品信息</span>
        <span class="subtitle">单个需求最多添加 {{ maxLine }} 个产品</span>
      </div>
      <el-button v-if="addable" type="primary" @click="handleAddLine">添加一行</el-button>
    </div>

    <div class="product-lines-table-wrapper">
      <el-table ref="tableRef" :data="products" v-bind="tableAttrs" class="product-lines-table">
        <slot name="prefix-columns" />

      <el-table-column
        v-if="showColumn('productType')"
        label-class-name="required-label"
        label="采购产品类型"
        min-width="210"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'productType') }"
            :ref="(el) => setFieldRef($index, 'productType', el)"
          >
            <template v-if="productFieldsEditable">
              <PurchaseCategorySelect
                v-model="row.productTypeCode"
                class="product-line-category-select"
                placeholder="请选择采购类型"
                @change="(code, node) => handleCategoryChange(row, $index, code, node)"
                teleported
              />
            </template>
            <template v-else>
              <span>{{ displayProductType(row) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('productInfo')"
        label-class-name="required-label"
        label="采购产品信息"
        min-width="220"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'productInfo') }"
            :ref="(el) => setFieldRef($index, 'productInfo', el)"
          >
            <div class="source-container">
              <div class="source-input">
                <template v-if="productFieldsEditable && row.infoSourceType !== 'custom'">
                  <PurchaseMaterialSelect
                    v-model="row.productInfoCode"
                    :category-code="row.productTypeCode || row.productType"
                    :disabled-material-codes="getDisabledMaterialCodes($index)"
                    placeholder="请选择采购产品"
                    @change="(val, material) => handleMaterialChange(row, $index, val, material)"
                    teleported
                  />
                </template>
                <template v-else-if="productFieldsEditable">
                  <el-input
                    v-model="row.productInfo"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入自定义产品信息"
                    clearable
                    @input="() => handleFieldChange(row, $index, 'productInfo')"
                    @change="() => handleFieldChange(row, $index, 'productInfo')"
                  />
                </template>
                <template v-else>
                  <span>{{ displayProductInfo(row) }}</span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('unitPrice')"
        label-class-name="required-label"
        label="采购单价"
        width="160"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'unitPrice') }"
            :ref="(el) => setFieldRef($index, 'unitPrice', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row._unitPriceStr"
                placeholder="请输入采购单价"
                @input="(value) => handleUnitPriceInput(value, row)"
                @blur="() => handleUnitPriceBlur(row, $index)"
              />
            </template>
            <template v-else>
              <span>{{ formatCurrency(row.unitPrice, row.currency) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('currency')"
        label-class-name="required-label"
        label="币种"
        width="200"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'currency') }"
            :ref="(el) => setFieldRef($index, 'currency', el)"
          >
            <template v-if="editable">
              <CurrencySelect
                v-model="row.currency"
                isPurchase
                @change="() => handleFieldChange(row, $index, 'currency')"
              />
            </template>
            <template v-else>
              <span>{{ currencyLabelMap[row.currency] || row.currency || placeholder }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('quantity')"
        label-class-name="required-label"
        label="采购数量"
        width="160"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'quantity') }"
            :ref="(el) => setFieldRef($index, 'quantity', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row._quantityStr"
                placeholder="请输入采购数量"
                @input="(value) => handleQuantityInput(value, row)"
                @blur="() => handleQuantityBlur(row, $index)"
              />
            </template>
            <template v-else>
              <span>{{ formatQuantity(row.quantity) }}</span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="showColumn('totalPrice')" label="采购总价" width="200">
        <template #default="{ row }">
          <span>{{ formatTotal(row) }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="showColumn('supplier')" label="指定供应商" min-width="200">
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'supplier') }"
            :ref="(el) => setFieldRef($index, 'supplier', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row.supplier"
                maxlength="50"
                show-word-limit
                placeholder="若有指定供应商请填写"
                @change="() => handleFieldChange(row, $index, 'supplier')"
              />
            </template>
            <template v-else>
              <OverflowTooltip :content="row.supplier || placeholder" :line="2" />
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showColumn('supplierReason')"
        label="指定供应商原因"
        min-width="240"
      >
        <template #default="{ row, $index }">
          <div
            class="field-cell"
            :class="{ 'has-error': isError($index, 'supplierReason') }"
            :ref="(el) => setFieldRef($index, 'supplierReason', el)"
          >
            <template v-if="editable">
              <el-input
                v-model="row.supplierReason"
                maxlength="50"
                show-word-limit
                placeholder="此处输入指定供应商的原因说明"
                @change="() => handleFieldChange(row, $index, 'supplierReason')"
              />
            </template>
            <template v-else>
              <OverflowTooltip :content="row.supplierReason || placeholder" :line="2" />
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="showColumn('remark')" label="备注" min-width="220">
        <template #default="{ row, $index }">
          <template v-if="editable">
            <el-input
              v-model="row.remark"
              maxlength="500"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4 }"
              show-word-limit
              placeholder="请输入备注"
              @change="() => handleFieldChange(row, $index, 'remark')"
            />
          </template>
          <template v-else>
            <OverflowTooltip :content="row.remark || placeholder" :line="2" />
          </template>
        </template>
      </el-table-column>

        <slot name="suffix-columns" />

        <el-table-column v-if="addable" label="操作" width="100" fixed="right">
          <template #default="{ $index }">
            <el-button
              type="danger"
              link
              :disabled="products.length <= 1"
              @click="removeLine($index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Decimal from 'decimal.js';
  import { ElMessage } from 'element-plus';
  import type { ProductLineModel } from '../constant';
  import { DEFAULT_PRODUCT_LINE, MAX_PRODUCT_LINES } from '../constant';
  import PurchaseCategorySelect from './PurchaseCategorySelect.vue';
  import PurchaseMaterialSelect from './PurchaseMaterialSelect.vue';
  import type {
    CategoryNodeBean,
    DemandPurchaseMaterialBean,
    PurchaserBean,
  } from '@/api/platform/data-contracts';
  import { useCurrencyLabel } from '../hooks/useCurrencyLabel';

  const props = withDefaults(
    defineProps<{
      useCard?: boolean;
      showHeader?: boolean;
      addable?: boolean;
      editable?: boolean;
      forceProductFieldsEditable?: boolean;
      readOnlyProductInfo?: boolean;
      tableProps?: Record<string, any>;
      visibleColumns?: string[];
    }>(),
    {
      useCard: true,
      showHeader: true,
      addable: true,
      editable: true,
      forceProductFieldsEditable: false,
      readOnlyProductInfo: false,
      tableProps: () => ({}),
      visibleColumns: undefined,
    }
  );

  type EditableProductLine = ProductLineModel & {
    purchaserList?: PurchaserBean[];
    executor?: string;
    _unitPriceStr?: string;
    _quantityStr?: string;
  };

  const lines = defineModel<EditableProductLine[]>({
    default: [{ ...DEFAULT_PRODUCT_LINE }] as EditableProductLine[],
  });

  const maxLine = MAX_PRODUCT_LINES;
  const editable = computed(() => props.editable);
  const productFieldsEditable = computed(
    () => (props.editable || props.forceProductFieldsEditable) && !props.readOnlyProductInfo
  );
  const placeholder = '--';
  const visibleSet = computed<Set<string> | null>(() => {
    if (!props.visibleColumns || props.visibleColumns.length === 0) return null;
    return new Set(props.visibleColumns);
  });
  const showColumn = (key: string) => !visibleSet.value || visibleSet.value.has(key);
  const tableAttrs = computed(() => {
    const attrs = { border: true, ...props.tableProps } as Record<string, any>;
    const defaultMax = '450px';
    if (!('maxHeight' in attrs)) {
      attrs.maxHeight = defaultMax;
    }
    attrs.style = { ...(attrs.style || {}), width: '100%' };
    return attrs;
  });
  const products = computed(() => lines.value);
  const materialCodes = computed(() =>
    products.value.map((line) =>
      line.infoSourceType === 'custom' ? '' : line.productInfoCode || line.productInfo || ''
    )
  );
  const disabledMaterialCodesByIndex = computed(() =>
    materialCodes.value.map((_, currentIndex) => {
      const codes = new Set<string>();
      materialCodes.value.forEach((code, index) => {
        if (!code || index === currentIndex) return;
        codes.add(code);
      });
      return Array.from(codes);
    })
  );
  const getDisabledMaterialCodes = (currentIndex: number) =>
    disabledMaterialCodesByIndex.value[currentIndex] || [];
  const currencyOptions = [
    { label: '人民币（CNY）', value: 'CNY' },
    { label: '美元（USD）', value: 'USD' },
  ];
  const MAX_UNIT_PRICE = 1_000_000_000;
  const MAX_QUANTITY = 999_999_999;
  const UNIT_PRICE_DIGITS = 9;
  const QUANTITY_DIGITS = 9;
  const UNIT_PRICE_PATTERN = /^\d+(\.\d{0,2})?$/;
  const QUANTITY_PATTERN = /^\d+$/;

  const currencyLabelMap = currencyOptions.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  }, {});
  const { extendCurrencyMapFromStorage, buildLabelGetter } = useCurrencyLabel();
  extendCurrencyMapFromStorage(currencyLabelMap);
  const getCurrencyLabel = buildLabelGetter(currencyLabelMap);

  const formatCurrency = (value?: number | string | null, currency = 'CNY') => {
    if (value === null || value === undefined || value === '') return placeholder;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return placeholder;
    return new Decimal(numeric).toFixed(2);
  };

  const formatAmount = (value?: number | string | null) => {
    if (value === null || value === undefined || value === '') return placeholder;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return placeholder;
    return numeric.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatQuantity = (value?: number | string | null) => {
    if (value === null || value === undefined || value === '') return placeholder;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return placeholder;
    return Math.trunc(numeric).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatCurrencyDisplay = (code?: string) => {
    if (!code) return placeholder;
    const label = currencyLabelMap[code];
    if (label) return label;
    return `${code}（${code}）`;
  };

  const formatUnitPriceInput = (value: number | null) => {
    if (value === null || value === undefined) return '';
    const decimal = new Decimal(value);
    const fixed = decimal.toFixed(2);
    if (fixed.endsWith('.00')) {
      return fixed.slice(0, -3);
    }
    if (fixed.endsWith('0')) {
      return fixed.slice(0, -1);
    }
    return fixed;
  };

  const formatQuantityInput = (value: number | null) => {
    if (value === null || value === undefined) return '';
    return String(Math.trunc(value));
  };

  const sanitizeUnitPriceInput = (value: string | number | null): string => {
    if (value === null || value === undefined) return '';
    const raw = String(value);
    if (!raw) return '';
    let cleaned = '';
    let dotSeen = false;
    for (const char of raw) {
      if (/\d/.test(char)) {
        cleaned += char;
      } else if (char === '.' && !dotSeen) {
        cleaned += '.';
        dotSeen = true;
      }
    }
    if (!cleaned) return '';
    const [integerRaw = '', decimalRaw = ''] = cleaned.split('.');
    const integerPart = integerRaw.slice(0, UNIT_PRICE_DIGITS);
    const decimalPart = dotSeen ? decimalRaw.slice(0, 2) : '';
    let result = integerPart;
    if (dotSeen) {
      result = result || '0';
      result += decimalPart ? `.${decimalPart}` : '.';
    }
    if (result === '.' || !result) return '';
    return result;
  };

  const sanitizeQuantityInput = (value: string | number | null): string => {
    if (value === null || value === undefined) return '';
    const digits = String(value).replace(/\D/g, '').slice(0, QUANTITY_DIGITS);
    if (!digits) return '';
    return digits;
  };

  const formatCategoryLabel = (node?: CategoryNodeBean) =>
    node?.fullCategoryName || node?.categoryName || '';
  const isLeafCategory = (node?: CategoryNodeBean) => !node?.children || node.children.length === 0;

  const formatMaterialLabel = (material?: DemandPurchaseMaterialBean | null) => {
    if (!material) return '';
    return material.materialName || material.materialNumber || '';
  };

  const hasTextValue = (value?: string | null) => {
    return typeof value === 'string' && value.trim().length > 0;
  };

  const patchPurchaseGroupFields = (
    row: EditableProductLine,
    source?: { purchaseGroup?: string | null; purchaseGroupName?: string | null } | null
  ) => {
    if (hasTextValue(source?.purchaseGroup)) {
      row.purchaseGroup = source!.purchaseGroup!.trim();
    }
    if (hasTextValue(source?.purchaseGroupName)) {
      row.purchaseGroupName = source!.purchaseGroupName!.trim();
    }
  };

  const parseDecimal = (value: unknown): Decimal | null => {
    if (value === null || value === undefined || value === '') return null;
    try {
      const decimal = new Decimal(value);
      if (!decimal.isFinite()) return null;
      return decimal;
    } catch {
      return null;
    }
  };

  type RequiredField =
    | 'productType'
    | 'productInfo'
    | 'unitPrice'
    | 'currency'
    | 'quantity'
    | 'supplier'
    | 'supplierReason';
  type OptionalField = 'remark';

  const errorState = reactive<{ index: number; field: RequiredField | null }>({
    index: -1,
    field: null,
  });

  const fieldRefs = new Map<string, HTMLElement>();

  const makeKey = (index: number, field: RequiredField) => `${index}-${field}`;

  const setFieldRef = (index: number, field: RequiredField, el: Element | null) => {
    const key = makeKey(index, field);
    if (el) fieldRefs.set(key, el as HTMLElement);
    else fieldRefs.delete(key);
  };

  const isError = (index: number, field: RequiredField) =>
    errorState.index === index && errorState.field === field;

  const clearError = (index: number, field: RequiredField) => {
    if (isError(index, field)) {
      errorState.index = -1;
      errorState.field = null;
    }
  };

  const focusField = (index: number, field: RequiredField) => {
    const key = makeKey(index, field);
    const target = fieldRefs.get(key);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusable =
      (target.querySelector('input, textarea') as HTMLElement | null) ??
      (target.querySelector('.el-select') as HTMLElement | null);
    requestAnimationFrame(() => focusable?.focus?.());
  };

  const showError = (index: number, field: RequiredField) => {
    errorState.index = index;
    errorState.field = field;
    nextTick(() => {
      focusField(index, field);
    });
  };

  const ensureNumberLimit = (
    row: EditableProductLine,
    index: number,
    field: 'unitPrice' | 'quantity'
  ) => {
    if (field === 'unitPrice') {
      const price = Number(row.unitPrice ?? 0);
      if (price >= MAX_UNIT_PRICE) {
        ElMessage.error('采购单价最多8位数字，请输入小于 10000000 的金额');
        showError(index, 'unitPrice');
        return false;
      }
    }
    if (field === 'quantity') {
      const quantity = Number(row.quantity ?? 0);
      if (quantity > MAX_QUANTITY) {
        ElMessage.error('采购数量最多5位数字，请输入不超过 10000 的数量');
        showError(index, 'quantity');
        return false;
      }
    }
    return true;
  };

  const emitModel = () => {
    lines.value = [...products.value];
  };

  const handleUnitPriceInput = (value: string, row: EditableProductLine) => {
    const sanitized = sanitizeUnitPriceInput(value);
    row._unitPriceStr = sanitized;
    const isCompleteNumber = UNIT_PRICE_PATTERN.test(sanitized) && !sanitized.endsWith('.');
    if (!isCompleteNumber) return;
    row.unitPrice = Number(sanitized);
    updateTotal(row);
    emitModel();
  };

  const handleUnitPriceBlur = (row: EditableProductLine, index: number) => {
    const text = row._unitPriceStr ?? '';
    const normalized = text.endsWith('.') ? text.slice(0, -1) : text;
    if (!normalized) {
      row.unitPrice = null;
      row._unitPriceStr = '';
      updateTotal(row);
      emitModel();
      clearError(index, 'unitPrice');
      return;
    }
    const decimal = new Decimal(normalized);
    row.unitPrice = decimal.toNumber();
    row._unitPriceStr = decimal.toFixed(2);
    updateTotal(row);
    emitModel();
    clearError(index, 'unitPrice');
  };

  const handleQuantityInput = (value: string, row: EditableProductLine) => {
    const sanitized = sanitizeQuantityInput(value);
    row._quantityStr = sanitized;
    if (!QUANTITY_PATTERN.test(sanitized)) return;
    row.quantity = Number(sanitized);
    updateTotal(row);
    emitModel();
  };

  const handleQuantityBlur = (row: EditableProductLine, index: number) => {
    const text = row._quantityStr ?? '';
    if (!text) {
      row.quantity = null;
      row._quantityStr = '';
      updateTotal(row);
      emitModel();
      clearError(index, 'quantity');
      return;
    }
    const numeric = Number(text);
    const finalValue = Number.isFinite(numeric) ? Math.trunc(numeric) : null;
    row.quantity = finalValue;
    row._quantityStr = finalValue === null ? '' : String(finalValue);
    updateTotal(row);
    emitModel();
    clearError(index, 'quantity');
  };

  defineExpose({
    showError,
  });

  const handleAddLine = () => {
    if (products.value.length >= maxLine) {
      ElMessage.warning(`单个需求内最多${maxLine}个产品，超出的请再次提交采购需求申请`);
      return;
    }
    const newIndex = products.value.length;
    lines.value = [...products.value, { ...DEFAULT_PRODUCT_LINE }] as EditableProductLine[];
    nextTick(() => focusField(newIndex, 'productType'));
  };

  const removeLine = (index: number) => {
    if (products.value.length <= 1) return;
    const next = [...products.value];
    next.splice(index, 1);
    lines.value = next;
    if (errorState.index === index) {
      errorState.index = -1;
      errorState.field = null;
    } else if (errorState.index > index) {
      errorState.index -= 1;
    }
  };

  const updateTotal = (row: EditableProductLine) => {
    const priceDecimal = parseDecimal(row.unitPrice);
    const quantityDecimal = parseDecimal(row.quantity);
    if (!priceDecimal || priceDecimal.isZero() || !quantityDecimal || quantityDecimal.isZero()) {
      if (row.totalPrice !== null) row.totalPrice = null;
      return;
    }
    const totalDecimal = priceDecimal
      .mul(quantityDecimal)
      .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
    const nextValue = totalDecimal.toNumber();
    if (row.totalPrice !== nextValue) {
      row.totalPrice = nextValue;
    }
  };

  const formatTotal = (row: EditableProductLine) => {
    if (!row.totalPrice || row.totalPrice <= 0) return '--';
    const code = row.currency || 'CNY';
    const formatted = new Decimal(row.totalPrice).toFixed(2);
    const label = getCurrencyLabel(code) || code;
    let chineseName = '';
    if (label.includes('（')) {
      chineseName = label.split('（')[0];
    } else if (label.includes('[')) {
      chineseName = label.split('[')[0];
    } else {
      chineseName = label;
    }
    chineseName = chineseName.trim();
    return `${formatted} 【${code}】${chineseName || code}`;
  };

  const displayProductType = (row: EditableProductLine) =>
    row.productType || row.productTypeCode || placeholder;

  const displayProductInfo = (row: EditableProductLine) =>
    row.productInfo || row.productInfoCode || placeholder;

  const handleFieldChange = (
    row: EditableProductLine,
    index: number,
    field: RequiredField | OptionalField
  ) => {
    if (field === 'productInfo' && row.infoSourceType === 'custom') {
      row.productInfoCode = (row.productInfo ?? '').trim();
    }
    if (field === 'unitPrice' || field === 'quantity') {
      if (!ensureNumberLimit(row, index, field)) {
        emitModel();
        return;
      }
      updateTotal(row);
    }
    emitModel();
    if (
      field === 'productType' ||
      field === 'productInfo' ||
      field === 'unitPrice' ||
      field === 'currency' ||
      field === 'quantity' ||
      field === 'supplier' ||
      field === 'supplierReason'
    ) {
      clearError(index, field);
    }
  };

  const handleCategoryChange = (
    row: EditableProductLine,
    index: number,
    code?: string,
    node?: CategoryNodeBean
  ) => {
    if (node && !isLeafCategory(node)) {
      ElMessage.warning('请选择最末级采购类别');
      row.productTypeCode = '';
      row.productType = '';
      row.categoryMemberCode = '';
      row.purchaserList = [];
      row.executor = '';
      row.productInfo = '';
      row.productInfoCode = '';
      row.infoSourceType = 'srm';
      emitModel();
      return;
    }
    row.productTypeCode = code || '';
    const label = formatCategoryLabel(node);
    row.productType = label || code || '';
    row.categoryMemberCode = node?.memberCode || '';
    patchPurchaseGroupFields(row, {
      purchaseGroup: (node as any)?.purchaseGroup,
      purchaseGroupName: (node as any)?.purchaseGroupName,
    });
    const purchaserMemberCode = node?.memberCode || '';
    if (purchaserMemberCode) {
      const purchaserName =
        (node as any)?.memberName || purchaserMemberCode;
      row.purchaserList = [{ memberCode: purchaserMemberCode, name: purchaserName }];
      row.executor = row.purchaserList.map((p) => p.name || p.memberCode).filter(Boolean).join('、');
    } else {
      row.purchaserList = [];
      row.executor = '';
    }
    console.log('选中采购品类', {
      index,
      categoryCode: row.productTypeCode,
      categoryName: row.productType,
      categoryMemberCode: row.categoryMemberCode,
      purchaseGroup: row.purchaseGroup,
      purchaseGroupName: row.purchaseGroupName,
    });
    row.productInfo = '';
    row.productInfoCode = '';
    row.infoSourceType = code === '0' ? 'custom' : 'srm';
    emitModel();
    handleFieldChange(row, index, 'productType');
  };

  const handleMaterialChange = (
    row: EditableProductLine,
    index: number,
    value?: string,
    material?: DemandPurchaseMaterialBean | null
  ) => {
    row.productInfoCode = value || '';
    const label = formatMaterialLabel(material);
    row.productInfo = label || value || '';
    patchPurchaseGroupFields(row, {
      purchaseGroup: material?.purchaseGroup,
      purchaseGroupName: material?.purchaseGroupName,
    });
    emitModel();
    handleFieldChange(row, index, 'productInfo');
  };

  const ensureRowState = (item: EditableProductLine) => {
    if (!item.infoSourceType) {
      item.infoSourceType = 'srm';
    }
    updateTotal(item);
    if (typeof item._unitPriceStr !== 'string') {
      item._unitPriceStr = formatUnitPriceInput(item.unitPrice);
    }
    if (typeof item._quantityStr !== 'string') {
      item._quantityStr = formatQuantityInput(item.quantity);
    }
    if (item.productTypeCode === undefined) {
      item.productTypeCode = item.productType;
    }
    if (item.productInfoCode === undefined) {
      item.productInfoCode = item.productInfo;
    }
    if (item.purchaseGroup === undefined) {
      item.purchaseGroup = '';
    }
    if (item.purchaseGroupName === undefined) {
      item.purchaseGroupName = '';
    }
  };

  const ensureLinesState = (list: EditableProductLine[]) => {
    list.forEach(ensureRowState);
  };

  onMounted(() => {
    ensureLinesState(lines.value);
  });

  watch(
    () => lines.value,
    (list) => {
      ensureLinesState(list);
      if (errorState.index >= list.length) {
        errorState.index = -1;
        errorState.field = null;
      }
    }
  );
</script>

<style lang="scss" scoped>
  .product-lines-card {
    width: 100%;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .product-lines-table-wrapper {
    flex: 1;
    min-height: 0;
    display: flex;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  :deep(.product-lines-table) {
    flex: 1;
    width: 100%;
    min-height: 0;
    height: 100% !important;
  }

  :deep(.product-lines-card > .el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  .subtitle {
    display: inline-block;
    margin-left: 8px;
    color: #909399;
    font-size: 12px;
  }

  :deep(.required-label .cell::before) {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }

  :deep(.field-cell) {
    display: flex;
    width: 100%;
  }

  .source-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .source-toggle {
    margin-bottom: 6px;
    display: flex;
    justify-content: center;
  }

  .source-input {
    width: 100%;
  }

  :deep(.field-cell.has-error .el-input__wrapper),
  :deep(.field-cell.has-error .el-select .el-select__wrapper) {
    border-color: #f56c6c;
    box-shadow: 0 0 0 1px #f56c6c inset;
  }

  :global(.product-line-category-select .el-tree-select__popper .el-select-dropdown__item) {
    height: fit-content;
  }
</style>
