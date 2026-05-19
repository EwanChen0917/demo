<template>
  <div class="batch-set-popover">
    <el-popover
      :hide-on-click-away="false"
      trigger="click"
      placement="top"
      v-model:visible="visible"
      popper-class="batch-set"
      @show="handlePopoverShow"
      :disabled="disabled"
    >
      <el-form :rules="rules" ref="ruleFormRef" :model="localFormData">
        <template v-for="item in formsList" :key="item.prop">
          <el-form-item v-if="item.prop == props.columnKey" :prop="item.prop" class="batch-set-item">
            <template v-if="item.type === 'input'">
              <el-input v-model="localFormData[item.prop]" :placeholder="item.placeholder" />
            </template>
            <template v-else-if="item.type == 'number'">
              <Num v-model="localFormData[item.prop]" :precision="0" :min="1" :max="99999" />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :teleported="false"
                v-model="localFormData[item.prop]"
                filterable
                :placeholder="getItemPlaceholder(item)"
              >
                <el-option
                  v-for="option in getOptions(item.prop)"
                  :key="option.value || option.deliveryCode || option.warehouseCode"
                  :label="option.desc || option.deliveryName || option.warehouseName"
                  :value="option.value || option.deliveryCode || option.warehouseCode"
                />
              </el-select>
            </template>
            <template v-else-if="item.type === 'select-group'">
              <el-select
                :teleported="false"
                v-model="localFormData[item.prop]"
                filterable
                placement="bottom"
                :placeholder="getItemPlaceholder(item)"
              >
                <el-option-group
                  v-for="option in getOptions(item.prop)"
                  :label="option?.spName"
                  :key="option?.spCode"
                >
                  <el-option
                    v-for="shipping of option.shippingList"
                    :key="option.spCode + ',' + shipping.value"
                    :label="shipping.desc"
                    :value="option.spCode + ',' + shipping.value"
                  />
                </el-option-group>
              </el-select>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <div class="popover-footer">
        <span class="clear-btn" @click="handleClear">清空此列</span>
        <div class="btn-footer">
          <el-button size="small" @click="visible = false">取消</el-button>
          <el-button size="small" type="primary" @click="handleSubmit">确定</el-button>
        </div>
      </div>
      <template #reference>
        <span class="table-batch" :class="{ 'disabled-text': disabled }">批量</span>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import Num from '@/components/NumberInput/index.vue';

  interface selectOptionsType {
    value?: string;
    desc?: string;
    deliveryCode?: string;
    deliveryName?: string;
    warehouseCode?: string;
    warehouseName?: string;
    spName?: string;
    spCode?: string;
    shippingList?: Array<selectOptionsType>
  }

  const props = withDefaults(
    defineProps<{
      columnKey: string;
      formData?: Record<string, any>;
    }>(),
    {
      columnKey: '',
      formData: () => ({}),
    }
  );

  const emit = defineEmits<{
    (event: 'success', key: string, value: any): void;
    (event: 'clear', key: string): void;
  }>();

  const disabledColumns = ['commission', 'cartonQty', 'num', 'price'];
  const visible = ref(false);

  const deliveryList = ref<Array<selectOptionsType>>([]);
  const warehouseList = ref<Array<selectOptionsType>>([]);
  const shippingList = ref<Array<selectOptionsType>>([]);
  const spList = ref<Array<selectOptionsType>>([]);
  const tableRow = ref<Record<string, any>>({});
  const disabled = computed(() => {
    return !props.formData?.itemInfoList?.length;
  }); 

  const handlePopoverShow = () => {
    if (props.formData && props.formData.itemInfoList && props.formData.itemInfoList.length > 0) {
      const row = props.formData?.itemInfoList[0];
      deliveryList.value = row.deliveryList || [];
      warehouseList.value = row.warehouseList || [];
      spList.value = row.spList || [];
      shippingList.value = row.shippingList || [];
      tableRow.value = cloneDeep(row) || {};
    }
    localFormData.value[props.columnKey] = '';
    ruleFormRef.value && ruleFormRef.value.clearValidate();
  };

  // 销售单价、佣金、发货方式、发货仓库、购买数量、物流渠道
  const localFormData = ref({
    price: '',
    commission: 0,
    deliveryCode: '',
    warehouseCode: '',
    cartonQty: '',
    num: '',
  });

  const getOptions = (key) => {
    if (key === 'deliveryCode') {
      return deliveryList.value;
    } else if (key === 'warehouseCode') {
      return warehouseList.value;
    } else if (key === 'shippingCode') {
      return spList.value;
    }
    return [];
  };

  const getItemPlaceholder = (item) => {
    if (item.placeholder1 && item.items) {
      const relatedValues = item.items.map((relatedKey) => tableRow.value[relatedKey]);
      if (relatedValues.some((val) => !val)) {
        return item.placeholder1;
      }
    }
    return item.placeholder;
  };

  const formsList = [
    { prop: 'price', label: '销售单价', type: 'input', placeholder: '请输入销售单价' },
    { prop: 'commission', label: '佣金', type: 'input', placeholder: '请输入佣金' },
    {
      prop: 'deliveryCode',
      label: '发货方式',
      type: 'select',
      placeholder: '请选择发货方式',
    },
    {
      prop: 'warehouseCode',
      label: '仓库',
      type: 'select',
      placeholder: '请选择仓库',
      placeholder1: '请先选择发货方式',
      items: ['deliveryCode'],
    },
    { prop: 'cartonQty', label: '购买数量', type: 'number', placeholder: '请输入数量' },
    { prop: 'num', label: '购买件数', type: 'number', placeholder: '请输入数量' },
    {
      prop: 'shippingCode',
      label: '物流渠道',
      type: 'select-group',
      placeholder: '请选择物流渠道',
      placeholder1: '请先选择仓库',
      items: ['warehouseCode'],
    },
  ];

  const rules = {
    price: [
      { required: true, message: '请输入销售单价', trigger: ['blur', 'change'] },
      { pattern: priceRuleFixed4, message: '请输入正确的销售单价', trigger: ['blur', 'change'] },
    ],
    commission: [
      { pattern: priceRuleFixed4, message: '请输入正确的佣金', trigger: ['blur', 'change'] },
    ],
    deliveryCode: [{ required: true, message: '请选择发货方式', trigger: 'change' }],
    warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
    cartonQty: [{ required: true, type: 'number', min: 1, message: '请输入数量' }],
    num: [{ required: true, type: 'number', min: 1, message: '请输入数量' }],
  };

  const handleClear = () => {
    emit('clear', props.columnKey);
    visible.value = false;
  };

  const ruleFormRef = ref();
  const handleSubmit = () => {
    ruleFormRef.value.validate((valid) => {
      if (valid) {
        emit('success', props.columnKey, localFormData.value[props.columnKey]);
        visible.value = false;
        setTimeout(() => {
          localFormData.value[props.columnKey] = '';
        }, 500);
      }
    });
  };
</script>

<style lang="scss" scoped>
  .batch-set-popover {
    display: inline-block;
    :global(.batch-set.el-popper) {
      padding: 12px !important;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
      border-radius: 4px !important;
    }
    :global(.batch-set-item .el-form-item__content) {
        width: 210px;
      }
  }
  .table-batch {
    font-size: 12px;
    color: var(--el-color-primary);
    padding: 0 4px;
    &:hover {
      background-color: var(--el-color-primary-light-9);
      cursor: pointer;
    }
  }
  .popover-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 48px;
  }
  .clear-btn {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  .disabled-text {
    cursor: not-allowed;
    opacity: 0.4;
    &:hover {
      cursor: not-allowed;
      user-select: none;
    }
  }
</style>
