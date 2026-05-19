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
  countryOptions,
  // shipmentArr,
  // warehouseArr,
  productBrand,
  labelsList,
  categoryList,
  specialPropertyOptions,
} = useOrderCommonRule();

/* eslint-disable import/prefer-default-export */
export const useWarehouseRuleData = () => {
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

        {
          key: 'orderPrice',
          label: '订单售价(不含税)',
          type: markRaw(renderDoubleInput),
          options: {
            minPlaceHolder: '(含)最小值',
            maxPlaceHolder: '(含)最大值',
            prependIcon: '￥',
          },
          serializeType: 'none',
          show: false,
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value || !Array.isArray(value) || value.length !== 2) {
                  callback(new Error('请输入订单售价'));
                  return;
                }

                const hasValue = value.some((item: any) => item.value);
                if (!hasValue) {
                  callback(new Error('请至少输入一项订单售价'));
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
        {
          key: 'orderTotalNum',
          label: '订单总数量',
          type: markRaw(renderDoubleInput),
          options: {
            minPlaceHolder: '(含)最小值',
            maxPlaceHolder: '(含)最大值',
          },
          show: false,
          serializeType: 'double',
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value || !Array.isArray(value) || value.length !== 2) {
                  callback(new Error('请输入订单数量'));
                  return;
                }
                const hasValue = value.some((item: any) => item.value);
                if (!hasValue) {
                  callback(new Error('请至少输入一项订单数量'));
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
        {
          key: 'isSellerRemark',
          label: '是否有买家备注',
          type: markRaw(renderRadio),
          options: [
            {
              label: '是',
              value: 'true',
            },
            {
              label: '否',
              value: 'false',
            },
          ],
          serializeType: 'none',
          show: false,
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value || !Array.isArray(value) || value.length !== 1) {
                  callback(new Error('请选择是否有买家备注'));
                  return;
                }
                const hasValue = value.some((item: any) => item.value);
                if (!hasValue) {
                  callback(new Error('请选择是否有买家备注'));
                  return;
                }
                callback();
              },
              trigger: ['blur', 'change'],
            },
          ],
        },
      ],
    },
    {
      name: '仓库物流',
      key: 'storage',
      model: [
        // {
        //   key: 'shippingCodeList',
        //   label: '物流渠道',
        //   type: markRaw(renderCascader),
        //   options: shipmentArr,
        //   placeholder: '请选择',
        //   serializeType: 'cascader',
        //   show: false,
        //   rules: [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
        // },
        // {
        //   key: 'receiveWarehouseCodeList',
        //   label: '发货仓库',
        //   type: markRaw(renderSelect),
        //   options: warehouseArr,
        //   placeholder: '请选择',
        //   serializeType: 'tag',
        //   show: false,
        //   rules: [{ required: true, message: '请选择发货仓库', trigger: 'blur' }],
        // },
        {
          key: 'receiveCountryCodeList',
          label: '收货国家/地区',
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
          options: countryOptions,
          serializeType: 'none',
          placeholder: '请选择',
          show: false,
          rules: [{ required: true, message: '请选择收货国家/地区', trigger: 'blur' }],
        },
        {
          key: 'receiveProvinceCodeList',
          label: '收货省/州',
          type: markRaw(renderTagInput),
          prepend: true,
          headerTips: true,
          placeholder: '按回车键(enter)或点击鼠标完成输入',
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
          serializeType: 'tagSub',
          show: false,
          rules: [{ required: true, message: '请选择收货省/州', trigger: 'blur' }],
        },
        {
          key: 'receiveCityCodeList',
          label: '收货城市',
          type: markRaw(renderTagInput),
          prepend: true,
          headerTips: true,
          placeholder: '按回车键(enter)或点击鼠标完成输入',
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
          show: false,
          serializeType: 'tagSub',
          rules: [{ required: true, message: '请选择收货城市', trigger: 'blur' }],
        },
        {
          key: 'receiveCode',
          label: '收货邮编',
          isCustom: true,
          show: false,
          serializeType: 'postcode',
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!Object.keys(value).length) {
                  callback(new Error('请配置收货邮编'));
                  return;
                }
                // 如果选择的是"为空"，则不需要校验
                if (value.operator === 'exist') {
                  callback();
                  return;
                }
                // 如果选择的是"不为空"，则需要至少配置一种邮编规则
                if (value.operator === 'notExist') {
                  const rightSides = value.rightSides || [];

                  // 检查邮编开头/包含 (rightSides[0])
                  const prefixItem = rightSides[0];
                  const hasPrefixValue = prefixItem?.rightSides?.some((item: any) => {
                    return item?.value && item.value.trim() !== '';
                  });

                  // 检查指定邮编 (rightSides[1])
                  const specifyItem = rightSides[1];
                  const hasSpecifyValue = specifyItem?.rightSides?.some((item: any) => {
                    return item?.value && item.value.trim() !== '';
                  });

                  // 检查排除邮编 (rightSides[2])
                  const excludeItem = rightSides[2];
                  const hasExcludeValue = excludeItem?.rightSides?.some((item: any) => {
                    return item?.value && item.value.trim() !== '';
                  });

                  // 至少需要配置一种邮编规则
                  if (!hasPrefixValue && !hasSpecifyValue && !hasExcludeValue) {
                    callback(new Error('请至少配置一种邮编规则'));
                    return;
                  }
                }
                callback();
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
            {
              label: '部分属于',
              value: 'intersection',
            },
            {
              label: '包含',
              value: 'contains',
            },
            {
              label: '不包含',
              value: '!contains',
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
            {
              label: '部分属于',
              value: 'intersection',
            },
            {
              label: '包含',
              value: 'contains',
            },
            {
              label: '不包含',
              value: '!contains',
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
        {
          key: 'labelCodeList',
          label: '订单标签',
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
            {
              label: '包含',
              value: 'contains',
            },
            {
              label: '不包含',
              value: '!contains',
            },
          ],
          options: labelsList,
          serializeType: 'none',
          placeholder: '请选择',
          show: false,
          rules: [{ required: true, message: '请选择订单标签', trigger: 'blur' }],
        }
      ],
    },
    {
      name: 'Shopify',
      key: 'shopify',
      model: [
        {
          key: 'CODOrder',
          label: 'COD订单',
          type: markRaw(RenderSingleRadio),
          options: [
            {
              label: '是',
              value: {
                subOp: null,
                desc: 'Shopify',
                value: 'true',
              },
            },
            {
              label: '否',
              value: {
                subOp: null,
                desc: 'Shopify',
                value: 'false',
              },
            },
          ],
          placeholder: '请选择',
          serializeType: 'none',
          show: false,
          rules: [{ required: true, message: '请选择是否COD订单', trigger: 'blur' }],
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
      checkInventory: 1,
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
    // orderCountry: {
    //   operator: 'in',
    //   leftSide: {
    //     name: '订单国家/地区',
    //     innerType: 'string',
    //     ref: 'order.orderCountryCodeList',
    //   },
    //   rightSides: [],
    // },
    orderStore: {
      operator: 'in',
      leftSide: {
        name: '订单店铺',
        innerType: 'string',
        ref: 'order.shopCodeList',
      },
      rightSides: [],
    },
    orderPrice: {
      operator: 'range',
      leftSide: {
        innerType: 'decimal',
        name: '订单售价(不含税)',
        ref: 'order.orderPrice',
      },
      rightSides: [
        {
          subOp: '>=',
          desc: '',
          value: '',
        },
      ],
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
    isSellerRemark: {
      operator: 'custom',
      leftSide: {
        innerType: 'boolean',
        name: '是否有买家备注',
        ref: 'order.isSellerRemark',
      },
      rightSides: [
        {
          subOp: '==',
          desc: '是',
          value: '',
        },
      ],
    },
    orderTotalNum: {
      operator: 'range',
      leftSide: {
        name: '订单总数量',
        innerType: 'int',
        ref: 'order.orderTotalQty',
      },
      rightSides: [
        {
          subOp: '>=',
          desc: '个数',
          value: '',
        },
      ],
    },
    // shippingCodeList: {
    //   operator: 'in',
    //   leftSide: {
    //     name: '物流渠道',
    //     innerType: 'string',
    //     ref: 'order.shippingCodeList',
    //   },
    //   rightSides: [],
    // },
    // receiveWarehouseCodeList: {
    //   operator: 'in',
    //   leftSide: {
    //     name: '发货仓库',
    //     innerType: 'string',
    //     ref: 'order.warehouseCodeList',
    //   },
    //   rightSides: [],
    // },
    receiveCountryCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货国家/地区',
        innerType: 'string',
        ref: 'order.receiveCountryCodeList',
      },
      rightSides: [],
    },
    receiveProvinceCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货省/州',
        innerType: 'string',
        ref: 'order.receiveProvinceCodeList',
      },
      rightSides: [],
    },
    receiveCityCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货城市',
        innerType: 'string',
        ref: 'order.receiveCityCodeList',
      },
      rightSides: [],
    },
    receiveCode: {
      operator: 'notExist',
      leftSide: {
        name: '收货邮编',
        innerType: 'string',
        ref: 'order.receivePostalCode',
      },
      rightSides: [
        {
          leftSide: { name: '收货邮编', ref: 'order.receivePostalCode' },
          operator: 'and',
          subOp: 'prefix',
          rightSides: [
            { value: '', subOp: 'headRegex' },
            { value: '', subOp: 'regex' },
          ],
        },
        {
          leftSide: { name: '指定邮编', innerType: 'string', ref: 'order.receivePostalCode' },
          operator: 'in',
          rightSides: [{ value: '' }],
        },
        {
          leftSide: { name: '排除邮编', innerType: 'string', ref: 'order.receivePostalCode' },
          operator: '!in',
          rightSides: [{ value: '' }],
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
    labelCodeList: {
      operator: 'in',
      leftSide: {
        innerType: 'string',
        name: '订单标签',
        ref: 'order.labelCodeList',
      },
      rightSides: [],
    },
    CODOrder: {
      operator: 'in',
      leftSide: {
        name: 'COD订单',
        innerType: 'string',
        ref: 'isCod',
      },
      rightSides: [
        {
          subOp: null,
          desc: 'Shopify',
          value: 'false',
        },
      ],
    },
  });
  return {
    schema,
    formModel,
    conditionList,
  };
};
