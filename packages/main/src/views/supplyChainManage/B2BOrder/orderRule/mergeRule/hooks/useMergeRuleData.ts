import { markRaw } from 'vue';
import renderSelect from '../../renderCom/renderSelect.vue';
import renderDoubleInput from '../../renderCom/renderDoubleInput.vue';
import renderTagInput from '../../renderCom/renderTagInput.vue';
import renderCascader from '../../renderCom/renderCascader.vue';
import renderRadio from '../../renderCom/renderRadio.vue';
import renderProduct from '../../renderCom/renderProduct.vue';
import { useOrderCommonRule } from '../../hooks/useOrderCommonRule';
import RenderCheckbox from '../../renderCom/renderCheckbox.vue';
import RenderSingleRadio from '../../renderCom/renderSingleRadio.vue';

const {
  channelOptions,
  shopOptions,
  // countryOptions,
  // shipmentArr,
  // warehouseArr,
  productBrand,
  categoryList,
  specialPropertyOptions,
} = useOrderCommonRule();

/* eslint-disable import/prefer-default-export */
export const useMergeRuleData = () => {
  const schema = reactive([
    {
      name: '基础信息',
      key: 'baseInfo',
      model: [
        {
          key: 'orderPlatform',
          label: '订单平台',
          type: markRaw(renderSelect),
          options: channelOptions,
          operatorOptions: [
            {
              label: '属于',
              value: 'in',
            },
            {
              label: '不属于',
              value: '!intersection',
            },
          ],
          prepend: true,
          placeholder: '请选择',
          serializeType: 'none',
          show: false,
          rules: [{ required: true, message: '请选择订单平台', trigger: 'blur' }],
        },

        {
          key: 'orderStore',
          label: '订单店铺',
          type: markRaw(renderSelect),
          options: shopOptions,
          operatorOptions: [
            {
              label: '属于',
              value: 'in',
            },
            {
              label: '不属于',
              value: '!intersection',
            },
          ],
          prepend: true,
          placeholder: '请选择',
          serializeType: 'none',
          show: false,
          rules: [{ required: true, message: '请选择订单店铺', trigger: 'blur' }],
        },
        // {
        //   key: 'orderCountry',
        //   label: '订单国家/地区',
        //   type: markRaw(renderSelect),
        //   options: countryOptions,
        //   operatorOptions: [
        //     {
        //       label: '属于',
        //       value: 'in',
        //     },
        //     {
        //       label: '不属于',
        //       value: '!intersection',
        //     },
        //   ],
        //   prepend: true,
        //   placeholder: '请选择',
        //   serializeType: 'none',
        //   show: false,
        //   rules: [{ required: true, message: '请选择订单国家/地区', trigger: 'blur' }],
        // },
        {
          key: 'orderTotalWeight',
          label: '订单总重量',
          type: markRaw(renderDoubleInput),
          options: {
            minPlaceHolder: '(含)最小值',
            maxPlaceHolder: '(含)最大值',
            endPlaceHolder: 'g',
          },
          serializeType: 'none',
          show: false,
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value || !Array.isArray(value) || value.length !== 2) {
                  callback(new Error('请输入订单总重量'));
                  return;
                }
                const hasValue = value.some((item: any) => item.value);
                if (!hasValue) {
                  callback(new Error('请至少输入一项订单总重量'));
                  return;
                }
                const minValue = value.find((item) => item.subOp == '>=').value;
                const maxValue = value.find((item) => item.subOp == '<=').value;
                if (maxValue && minValue && Number(maxValue) < Number(minValue)) {
                  callback(new Error('最大值不能小于最小值'));
                  return;
                }

                const rules = /^\d+(\.\d+)?$/;

                if (
                  (minValue && !maxValue && rules.test(minValue)) ||
                  (maxValue && !minValue && rules.test(maxValue)) ||
                  (maxValue && rules.test(maxValue) && minValue && rules.test(minValue))
                ) {
                  callback();
                } else {
                  callback(new Error('请输入正数'));
                }
              },
              trigger: ['blur', 'change'],
            },
          ],
        },
      ],
    },
    {
      name: '订单',
      key: 'order',
      model: [
        {
          key: 'mskuList',
          label: '订单MSKU',
          type: markRaw(renderTagInput),
          prepend: true,
          headerTips: true,
          operatorOptions: [
            {
              label: '属于',
              value: 'in',
            },
            {
              label: '不属于',
              value: '!intersection',
            },
          ],
          options: [],
          placeholder: '按回车键(enter)或点击鼠标完成输入',
          serializeType: 'tagSub',
          show: false,
          rules: [{ required: true, message: '请输入订单MSKU', trigger: 'blur' }],
        },
        {
          key: 'supplySku',
          label: '订单产品',
          type: markRaw(renderProduct),
          prepend: true,
          operatorOptions: [
            {
              label: '属于',
              value: 'in',
            },
            {
              label: '不属于',
              value: '!intersection',
            },
          ],
          serializeType: 'none',
          show: false,
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value || !Array.isArray(value) || !value.length) {
                  callback(new Error('请选择订单产品'));
                  return;
                }
                callback();
              },
              trigger: ['blur', 'change'],
            },
          ],
        },
        {
          key: 'categoryCodeList',
          label: '产品品类',
          type: markRaw(renderCascader),
          prepend: true,
          maxCollapseTags: 1,
          operatorOptions: [
            {
              label: '属于',
              value: 'in',
            },
            {
              label: '不属于',
              value: '!intersection',
            },
          ],
          options: categoryList,
          serializeType: 'cascader',
          placeholder: '请选择',
          show: false,
          rules: [{ required: true, message: '请选择产品品类', trigger: 'blur' }],
        },
        {
          key: 'productBrandList',
          label: '产品品牌',
          type: markRaw(renderSelect),
          prepend: true,
          operatorOptions: [
            {
              label: '属于',
              value: 'in',
            },
            {
              label: '不属于',
              value: '!intersection',
            },
          ],
          options: productBrand,
          placeholder: '请选择',
          serializeType: 'none',
          show: false,
          rules: [{ required: true, message: '请选择产品品牌', trigger: 'blur' }],
        },
        {
          key: 'specialPropertyList',
          label: '特殊属性',
          type: markRaw(RenderCheckbox),
          options: specialPropertyOptions,
          serializeType: 'none',
          rules: [{ required: true, message: '请选择特殊属性', trigger: 'blur' }],
        },
      ],
    },
  ]);
  const formModel = reactive({
    id: undefined,
    ruleNo: '',
    name: '',
    status: 1,
    sceneCode: 'warehouse',
    effectiveTimeBegin: null,
    priority: 0,
    description: null,
    conditions: [],
    actionParams: {
      checked: [1, 2, 3, 4, 5, 6, 7],
      canCheck: [],
      actionType: 'SPECIFIED_WAREHOUSE_LOGISTICS',
      warehouseList: [],
    },
  });
  const conditionList = reactive<any>({
    orderPlatform: {
      operator: 'in',
      leftSide: {
        name: '订单平台',
        innerType: 'string',
        ref: 'order.channelList',
      },
      rightSides: [],
    },
    orderStore: {
      operator: 'in',
      leftSide: {
        name: '订单店铺',
        innerType: 'string',
        ref: 'order.shopCodeList',
      },
      rightSides: [],
    },
    orderCountry: {
      operator: 'in',
      leftSide: {
        name: '订单国家/地区',
        innerType: 'string',
        ref: 'order.orderCountryCodeList',
      },
      rightSides: [],
    },
    orderTotalWeight: {
      operator: 'range',
      leftSide: {
        innerType: 'decimal',
        name: '订单总重量',
        ref: 'order.orderTotalWeight',
      },
      rightSides: [
        {
          subOp: '>=',
          desc: '',
          value: '',
        },
      ],
    },
    mskuList: {
      operator: 'in',
      leftSide: {
        innerType: 'string',
        name: '订单MSKU',
        ref: 'order.mskuList',
      },
      rightSides: [],
    },
    supplySku: {
      operator: 'in',
      leftSide: {
        innerType: 'string',
        name: '订单产品',
        ref: 'order.supplySkuList',
      },
      rightSides: [],
    },
    categoryCodeList: {
      operator: 'in',
      leftSide: {
        innerType: 'string',
        name: '产品品类',
        ref: 'order.categoryList',
      },
      rightSides: [],
    },
    productBrandList: {
      operator: 'in',
      leftSide: {
        innerType: 'string',
        name: '产品品牌',
        ref: 'order.productBrandList',
      },
      rightSides: [],
    },
    specialPropertyList: {
      operator: 'in',
      leftSide: {
        innerType: 'string',
        name: '特殊属性',
        ref: 'order.specialPropertyList',
      },
      rightSides: [],
    },
  });
  return {
    schema,
    formModel,
    conditionList,
  };
};
