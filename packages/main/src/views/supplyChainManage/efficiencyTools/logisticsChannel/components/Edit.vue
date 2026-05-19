<template>
  <div v-if="props.currentChannel || mode === 'add'" class="edit-wrapper">
    <el-form
      v-loading="loading"
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="left"
      class="form-container"
    >
      <div class="header-items-box">
        <el-form-item label="操作人" prop="updator">
          <OverflowTooltip :content="formData.updator" :line="1" />
        </el-form-item>
        <!-- <el-form-item label="基础信息更新时间" prop="basicInfoUpdateTime">
          <OverflowTooltip :content="formData.basicInfoUpdateTime" :line="1" />
        </el-form-item>
        <el-form-item label="报价更新时间" prop="priceUpdateTime">
          <OverflowTooltip :content="formData.priceUpdateTime" :line="1" />
        </el-form-item> -->
        <el-form-item>
          <el-button v-if="mode === 'detail'" type="primary" @click="handleEdit">编辑</el-button>
        </el-form-item>
      </div>
      <div class="form-items-box">
        <el-form-item label="物流商" prop="supplierCode">
          <OverflowTooltip :content="formData?.supplierName" :line="1" />
        </el-form-item>
        <el-form-item label="物流渠道名称" prop="channelName" required>
          <OverflowTooltip :content="formData?.channelName" :line="1" v-if="mode === 'detail'" />
          <el-input v-else v-model="formData.channelName" placeholder="请输入" :maxlength="100" />
        </el-form-item>

        <el-form-item
          label="物流商对应渠道名称"
          prop="aliasChannelName"
          :rules="[
            {
              required: checkPermission('businessAuth'),
              message: '请输入物流商对应渠道名称',
              trigger: ['blur'],
            },
          ]"
          label-width="130px"
        >
          <OverflowTooltip
            :content="formData?.aliasChannelName"
            :line="1"
            v-if="mode === 'detail'"
          />
          <el-input
            v-else
            v-model="formData.aliasChannelName"
            placeholder="请输入"
            :maxlength="100"
            :disabled="!checkPermission('businessAuth')"
          />
        </el-form-item>
      </div>

      <!-- <div class="form-items-box"> -->
      <el-row :gutter="20">
        <el-col
          :span="8"
          v-for="field in formFields.filter((item) => !item.hidden)"
          :key="field.prop"
        >
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            :required="field.required"
            label-width="114px"
          >
            <!-- 详情模式 -->
            <template v-if="mode === 'detail'">
              <span v-if="field?.label.includes('预估时效')">
                {{ formData.estimatedDaysMin || '-' }} ~
                {{ formData.estimatedDaysMax || '-' }}
              </span>
              <span v-else>
                {{
                  field.detailFormatter
                    ? field.detailFormatter(formData[field.prop || ''])
                    : formData[field.prop || '']
                }}
              </span>
            </template>

            <!-- 编辑模式 -->
            <template v-else>
              <div class="d-flex w-100" v-if="field.label.includes('预估时效')">
                <el-form-item prop="estimatedDaysMin">
                  <el-input type="number" :min="1" v-model.number="formData.estimatedDaysMin" />
                </el-form-item>
                <span class="mx-2">~</span>
                <el-form-item prop="estimatedDaysMax">
                  <el-input type="number" :min="2" v-model.number="formData.estimatedDaysMax" />
                </el-form-item>
              </div>
              <component
                :is="field.component"
                v-model="formData[field.prop || '']"
                v-bind="field.props"
                :disabled="field.disabled"
                v-else
              >
                <el-option
                  v-for="option in field.options || []"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </component>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- </div> -->

      <h5>附加费用（元/kg）</h5>
      <div class="form-items-box other-prices-box">
        <div v-for="item in productTypes" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="mode === 'detail'">
              <span>{{ formData[item.prop] || 0 }}</span>
            </template>
            <template v-else>
              <el-input
                v-model.number="formData[item.prop]"
                type="number"
                :min="0"
                placeholder="0"
              />
            </template>
          </el-form-item>
        </div>
      </div>

      <template v-if="mode !== 'add' && formData.chargeType">
        <PriceInfo
          :channelId="props.currentChannel?.id"
          :priceHeader="formData.priceHeader"
          :priceList="formData.prices"
          :priceUpdateTime="formData.priceUpdateTime"
          :pricesHistory="formData.pricesHistory"
        />
      </template>
    </el-form>

    <div class="dialog-footer" v-if="mode !== 'detail'">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </div>

  <div class="empty-container" v-else>
    <EmptyAnimation name="listEmpty" :width="128" :height="128" />
    <div class="list-empty-text">暂未搜到相关数据</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import type { FormInstance } from 'element-plus';
  import { defineProps, defineEmits } from 'vue';
  import { erpApi } from '@/api';
  import TransportSelect from './TransportSelect.vue';
  import PriceInfo from './PriceInfo.vue';
  import { productTypes, logisticsChannelEnum } from './enum';
  import {
    integerRule,
    includeZero1,
    priceRule,
    priceRuleFixed3,
    priceRuleFixed6,
  } from '@/utils/rulesRegExp';
  import CountrySelect from '@/components/CountrySelect/index.vue';
  import { checkPermission } from '@/utils/permission';

  const props = defineProps({
    currentSupplier: {
      type: Object,
      required: true,
    },
    currentChannel: {
      type: Object,
      required: true,
    },

    dataStatus: {
      type: String,
      default: 'detail', // detail|add|edit 详情|新增|编辑
    },
  });

  const emit = defineEmits(['success', 'cancel', 'update:dataStatus']);

  // 表单初始数据
  const initFormData = () => ({
    supplierCode: props.currentSupplier?.supplierCode, // 物流商
    supplierName: props.currentSupplier?.supplierName, // 物流商
    channelName: '',
    channelCode: '',
    volumeWeightCoefficient: '', // 体积重系数
    status: 1, // 状态
    firstLogTransportId: '', // 头程物流方式
    destinationCountry: '', // 目的国家
    priceList: [], // 原报价字段--重量
    volumePriceList: [], // 原报价字段--体积
    prices: [], // 新增报价字段---目前用这个数据展示
    pricesHistory: [], // 历史报价字段
    priceUpdateTime: '', // 报价更新时间
    estimatedDaysMin: undefined,
    estimatedDaysMax: undefined,
    minChargeWeight: undefined, // 最低计费重
    minVolumeThreshold: undefined, // 最低计费体积
    chargeType: 'max_weight', // 计费类型
    // minVolumeThreshold: undefined, // 最低计费体积
    // isLabeled: 'label', // 是否贴标
    // deferredType: 'non_defers', // 递延类型
  });
  // 动态表单字段配置
  const formFields = computed(() => [
    {
      label: '物流渠道编码',
      prop: 'channelCode',
      component: 'el-input',
      props: { placeholder: '请输入', maxlength: 50, disabled: false },
      required: true,
      hidden: false,
    },
    {
      label: '物流渠道',
      prop: 'transportChannel',
      component: 'el-select',
      props: { placeholder: '请选择' },
      required: true,
      options: logisticsChannelEnum,
    },
    {
      label: '目的国家',
      prop: mode.value === 'detail' ? 'destinationCountryDesc' : 'destinationCountry',
      component: CountrySelect,
      props: { placeholder: '请选择', filterable: true, clearable: true },
      required: true,
    },
    {
      label: '物流方式',
      prop: 'firstLogTransport',
      component: TransportSelect,
      props: { clearable: true },
      required: true,
    },
    {
      label: '是否包税',
      prop: 'isTaxIncluded',
      component: 'el-select',
      props: { placeholder: '请选择' },
      required: true,
      options: [
        { label: '包税', value: 1 },
        { label: '不包税', value: 0 },
      ],
      detailFormatter: (value) => (value === 1 ? '包税' : '不包税'),
    },
    // {
    //   label: '递延类型',
    //   prop: mode.value === 'detail' ? 'deferredTypeDesc' : 'deferredType',
    //   component: 'el-select',
    //   props: { placeholder: '请选择递延类型' },
    //   required: true,
    //   options: [
    //     { label: '不递延', value: 'non_defers' },
    //     { label: '自主VAT-递延', value: 'vat_defers' },
    //   ],
    // },
    // {
    //   label: '发货地',
    //   prop: 'shipFrom',
    //   component: 'el-input',
    //   props: { placeholder: '请输入发货地', maxlength: 100 },
    // },

    {
      label: '收货地区',
      prop: 'receivingArea',
      component: 'el-input',
      props: { placeholder: '请输入', maxlength: 100 },
      required: true,
    },
    {
      label: '邮编',
      prop: 'postalCode',
      component: 'el-input',
      props: { placeholder: '请输入', maxlength: 50 },
    },
    {
      label: '体积系数',
      prop: 'volumeWeightCoefficient',
      component: 'el-select',
      props: { placeholder: '请选择' },
      required: true,
      options: [
        { label: '5000', value: 5000 },
        { label: '6000', value: 6000 },
      ],
    },
    {
      label: '是否加急',
      prop: 'isExpress',
      component: 'el-select',
      props: { placeholder: '请选择' },
      required: true,
      options: [
        { label: '加急', value: 1 },
        { label: '正常', value: 0 },
      ],
      detailFormatter: (value) => (value === 1 ? '加急' : '正常'),
    },
    // {
    //   label: '是否贴标',
    //   prop: mode.value === 'detail' ? 'isLabeledDesc' : 'isLabeled',
    //   component: 'el-select',
    //   props: { placeholder: '请选择是否贴标' },
    //   required: true,
    //   options: [
    //     { label: '贴标', value: 'label' },
    //     { label: '不贴标', value: 'no_label' },
    //     { label: '报关件（不贴标）', value: 'customs_label' },
    //     { label: '不贴标产品标（产品）', value: 'no_product_label' },
    //   ],
    // },
    {
      label: '产品类型',
      prop: mode.value === 'detail' ? 'productTypeDesc' : 'productType',
      component: 'el-select',
      props: { placeholder: '请选择' },
      options: [
        { label: '电商杂货', value: 'ecommerce_general' },
        { label: '单一品类', value: 'single_category' },
        { label: '母婴类', value: 'baby_category' },
        { label: '化妆品类', value: 'cosmetics_category' },
      ],
    },
    {
      label: '产品属性',
      prop: mode.value === 'detail' ? 'productAttributesDesc' : 'productAttributes',
      component: 'el-select',
      props: { placeholder: '请选择' },
      options: [
        { label: '普货', value: 'general_goods' },
        { label: '带电', value: 'electric' },
        { label: '不带电', value: 'non_electric' },
        { label: '带磁/带电', value: 'magnetic_or_electric' },
        { label: '纺织品', value: 'textile' },
        { label: '食品', value: 'food' },
      ],
    },
    {
      label: '计费类型',
      prop: mode.value === 'detail' ? 'chargeTypeDesc' : 'chargeType',
      component: 'el-select',
      props: { placeholder: '请选择计费类型' },
      required: true,
      disabled: mode.value === 'add' ? false : true,
      options: [
        { label: '计费重', value: 'max_weight' },
        { label: '实重', value: 'weight' },
        { label: '体积', value: 'volume' },
      ],
    },
    {
      label: '最低计费重(kg)',
      prop: 'minChargeWeight',
      component: 'el-input',
      props: { type: 'number', min: 0, placeholder: '请输入' },
      required: formData.value.chargeType !== 'volume',
      hidden: formData.value.chargeType === 'volume',
    },
    {
      label: '最低计费体积(cbm+)',
      prop: 'minVolumeThreshold',
      component: 'el-input',
      props: { type: 'number', min: 0.001, placeholder: '请输入' },
      required: formData.value.chargeType === 'volume',
      hidden: formData.value.chargeType !== 'volume',
    },
    {
      label: '报关费(元/票)',
      prop: 'customsDeclarationFee',
      component: 'el-input',
      props: { type: 'number', min: 0, placeholder: '请输入' },
      required: true,
    },
    {
      label: '清关费(元/票)',
      prop: 'customsClearanceFee',
      component: 'el-input',
      props: { type: 'number', min: 0, placeholder: '请输入' },
      required: true,
    },
    {
      label: '预估时效(天)',
      required: true,
    },
  ]);

  const formRef = ref<FormInstance>();
  const formData = ref(Object.assign(initFormData()));
  const mode = computed(() => props.dataStatus);
  const loading = ref(false);

  // 获取对应channelid detail
  const getChannelDetail = async (channelId: number) => {
    try {
      loading.value = true;
      const res = await erpApi.luteosErpLogisticsChannelDetail({ channelId });
      if (res) {
        formData.value = {
          ...res,
        };
      }
    } finally {
      loading.value = false;
    }
  };
  watch(
    () => props.currentChannel,
    (newVal) => {
      if (newVal) {
        getChannelDetail(newVal.id);
      }
    }
  );

  // 提交表单---更新基础信息
  const handleSubmit = async () => {
    if (!formRef.value) return;
    await formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          const params = {
            ...formData.value,
          };
          // 删除所有 xxxDesc 字段
          Object.keys(params).forEach((key) => {
            if (key.endsWith('Desc')) {
              delete params[key];
            }
          });
          try {
            const res =
              mode.value === 'add'
                ? await erpApi.luteosErpLogisticsChannelAdd(params)
                : await erpApi.luteosErpLogisticsChannelUpdate(params);
            ElMessage.success('操作成功');
            if (props.currentChannel?.id) {
              emit('update:dataStatus', 'detail');
              getChannelDetail(props.currentChannel.id);
            }
            if (res && mode.value === 'add') {
              emit('success');
            }
          } catch (error) {
            console.error(error);
          }
        }
      })
      .catch(() => false);
  };

  // 更新价格成功
  const handleUpdatePrice = () => {
    getChannelDetail(props.currentChannel?.id);
  };

  const handleEdit = () => {
    emit('update:dataStatus', 'edit');
  };

  const onCancel = () => {
    // 清除表单校验
    formRef.value?.clearValidate();
    if (mode.value === 'add') {
      formData.value = Object.assign(initFormData());
      return;
    } else {
      getChannelDetail(props.currentChannel?.id);
    }
    emit('update:dataStatus', 'detail');
  };

  // 清空数据
  const clearData = () => {
    formData.value = Object.assign(initFormData());
  };

  const rules = {
    channelCode: [{ required: true, message: '请输入物流渠道编码', trigger: 'blur' }],
    channelName: [{ required: true, message: '请输入物流渠道名称', trigger: 'blur' }],
    transportChannel: [{ required: true, message: '请输入物流渠道', trigger: 'blur' }],
    destinationCountry: [{ required: true, message: '请选择目的国家', trigger: 'change' }],
    firstLogTransport: [{ required: true, message: '请选择物流方式', trigger: 'change' }],
    isTaxIncluded: [{ required: true, message: '请选择是否包税', trigger: 'change' }],
    // deferredType: [{ required: true, message: '请选择递延类型', trigger: 'change' }],
    receivingArea: [{ required: true, message: '请输入收货地区', trigger: 'blur' }],
    volumeWeightCoefficient: [{ required: true, message: '请选择体积系数', trigger: 'blur' }],
    isExpress: [{ required: true, message: '请选择是否加急', trigger: 'change' }],
    // isLabeled: [{ required: true, message: '请选择是否贴标', trigger: 'change' }],
    minVolumeThreshold: [
      {
        required: true,
        message: '非法输入',
        trigger: ['blur', 'change'],
        pattern: priceRuleFixed3,
      },
    ],
    minChargeWeight: [
      {
        required: true,
        message: '非法输入',
        trigger: ['blur', 'change'],
        pattern: priceRuleFixed6,
      },
    ],
    customsDeclarationFee: [
      { required: true, message: '非法输入', trigger: 'blur', pattern: includeZero1 },
    ],
    customsClearanceFee: [
      { required: true, message: '非法输入', trigger: 'blur', pattern: includeZero1 },
    ],
    estimatedDaysMin: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule, value, callback) => {
          const isInteger = integerRule.test(value);
          if (!value) {
            callback(new Error('请输入'));
            return;
          }
          if (!isInteger) {
            callback(new Error('非法输入'));
            return;
          }
          if (value > formData.value.estimatedDaysMax) {
            callback(new Error('非法输入'));
            return;
          }
          callback();
        },
      },
    ],

    estimatedDaysMax: [
      {
        required: true,
        trigger: 'blur',
        // pattern: integerRule,
        validator: (rule, value, callback) => {
          const isInteger = integerRule.test(value);
          if (!value) {
            callback(new Error('请输入'));
            return;
          }
          if (!isInteger) {
            callback(new Error('非法输入'));
            return;
          }
          if (value < formData.value.estimatedDaysMin) {
            callback(new Error('非法输入'));
            return;
          }
          callback();
        },
      },
    ],

    ...productTypes.reduce((acc, item) => {
      acc[item.prop] = [{ pattern: priceRule, message: '非法输入', trigger: 'blur' }];
      return acc;
    }, {}),
  };

  defineExpose({
    clearData,
    formRef,
  });
</script>

<style scoped lang="scss">
  .edit-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 8px 0 8px 8px;
    background-color: #fff;
    border-radius: 10px;
  }

  .form-container {
    .header-items-box {
      display: grid;
      grid-template-columns: 1fr 0fr;
    }
    .form-items-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 10px;
    }

    .form-items-box {
      :deep(.el-form-item__label) {
        width: 114px;
        padding: 0 0 0 0;
      }
    }
    .other-prices-box {
      padding-top: 16px;

      :deep(.el-form-item__content) {
        line-height: 22px;
      }
    }
  }
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: #999;
    background: #fff;
    border-radius: 10px;
  }
  .dialog-footer {
    display: flex;
    justify-content: end;
    padding: 10px 0;
  }
</style>
