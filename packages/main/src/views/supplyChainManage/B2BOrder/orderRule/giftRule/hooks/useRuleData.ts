import { markRaw } from 'vue';
import renderSelect from '../../renderCom/renderSelect.vue';
import renderSingleSelect from '../../renderCom/renderSingleSelect.vue';
import renderDoubleInput from '../../renderCom/renderDoubleInput.vue';
import renderTagInput from '../../renderCom/renderTagInput.vue';
// import renderCascader from '../../renderCom/renderCascader.vue';
// import renderRadio from '../../renderCom/renderRadio.vue';
import renderProduct from '../../renderCom/renderProduct.vue';
import { useOrderCommonRule } from '../../hooks/useOrderCommonRule';
// import RenderCheckbox from '../../renderCom/renderCheckbox.vue';
// import RenderSingleRadio from '../../renderCom/renderSingleRadio.vue';
import renderDateRange from '../../renderCom/renderDateRange.vue';

const {
  channelOptions,
  shopOptions,
  countryOptions,
  // shipmentArr,
  // warehouseArr,
  // productBrand,
  // categoryList,
  // specialPropertyOptions,
} = useOrderCommonRule();

/* eslint-disable import/prefer-default-export */
export const useRuleData = () => {
  const schema = reactive([
    {
      name: '基础信息',
      key: 'baseInfo',
      model: [
        {
          key: 'orderPlatform',
          label: '订单平台',
          type: markRaw(renderSingleSelect),
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
      ],
    },
    {
      name: '订单',
      key: 'order',
      model: [
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
            // endPlaceHolder: 'g',
          },
          serializeType: 'none',
          show: false,
          rules: [
            {
              required: true,
              // validator: (_rule: any, value: any, callback: Function) => {
              //   if (!value || !Array.isArray(value) || value.length !== 2) {
              //     callback(new Error('请输入订单总重量'));
              //     return;
              //   }
              //   const hasValue = value.some((item: any) => item.value);
              //   if (!hasValue) {
              //     callback(new Error('请至少输入一项订单总重量'));
              //     return;
              //   }
              //   const minValue = value.find((item) => item.subOp == '>=').value;
              //   const maxValue = value.find((item) => item.subOp == '<=').value;
              //   if (maxValue && minValue && Number(maxValue) < Number(minValue)) {
              //     callback(new Error('最大值不能小于最小值'));
              //     return;
              //   }

              //   const rules = /^\d+(\.\d+)?$/;

              //   if (
              //     (minValue && !maxValue && rules.test(minValue)) ||
              //     (maxValue && !minValue && rules.test(maxValue)) ||
              //     (maxValue && rules.test(maxValue) && minValue && rules.test(minValue))
              //   ) {
              //     callback();
              //   } else {
              //     callback(new Error('请输入正数'));
              //   }
              // },
              validator: (_rule: any, value: any, callback: Function) => {
                console.log(`value`, value);
                if (!value || !Array.isArray(value) || value.length === 0) {
                  callback(new Error('请输入订单数量'));
                  return;
                }
                if (value.length > 2) {
                  callback(new Error('订单数量格式错误'));
                  return;
                }
                const isPositiveInt = (n: number) => Number.isInteger(n) && n > 0;
                const filledValues = value.filter(
                  (item: any) =>
                    item && item.value !== undefined && item.value !== null && item.value !== ''
                );
                if (filledValues.length === 0) {
                  callback(new Error('请输入订单数量'));
                  return;
                }
                if (filledValues.length === 1) {
                  const num = Number(filledValues[0].value);
                  if (!isPositiveInt(num)) {
                    callback(new Error('订单数量必须为正整数'));
                    return;
                  }
                  callback();
                  return;
                }
                if (filledValues.length === 2) {
                  const [startRaw, endRaw] = filledValues;
                  const start = Number(startRaw.value);
                  const end = Number(endRaw.value);
                  if (!isPositiveInt(start) || !isPositiveInt(end)) {
                    callback(new Error('订单数量必须为正整数'));
                    return;
                  }
                  if (start > end) {
                    callback(new Error('最小值订单数量必须小于或等于最大值'));
                    return;
                  }
                  callback();
                  return;
                }
                callback();
              },
              trigger: ['blur', 'change'],
            },
          ],
        },
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
          key: 'orderTimeMarket',
          label: '订购时间(市场)',
          type: markRaw(renderDateRange),
          options: {
            startPlaceHolder: '开始时间',
            endPlaceHolder: '结束时间',
          },
          serializeType: 'none',
          show: false,
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value || !Array.isArray(value) || value.length < 2) {
                  callback(new Error('请完善订购时间(市场)'));
                  return;
                }
                const start = value[0]?.value;
                const end = value[1]?.value;
                // const rank = value[2]?.value;
                if (!start || !end) {
                  callback(new Error('请选择订购起止时间'));
                  return;
                }
                if (start > end) {
                  callback(new Error('结束时间不能早于开始时间'));
                  return;
                }
                // if (rank === undefined || rank === null || String(rank).trim() === '') {
                //   callback(new Error('请填写前N名'));
                //   return;
                // }
                // const n = Number(rank);
                // if (!Number.isInteger(n) || n < 1) {
                //   callback(new Error('前N名须为大于等于1的整数'));
                //   return;
                // }
                callback();
              },
              trigger: ['blur', 'change'],
            },
          ],
        },
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
      ],
    },
  ]);
  const formModel = reactive({
    id: undefined,
    ruleNo: '',
    name: '',
    status: 1,
    sceneCode: 'gift',
    effectiveTimeBegin: null,
    priority: 0,
    description: null,
    conditions: [],
    actionParams: {
      giftType: 'ONCE',
      calcMode: 'FULL',
      maxNum: 0,
      ladderType: 0,
      differentFlag: false,
      conditionGiftList: [{ value: '', calcField: 'TOTAL_VALID_QUANTITY', giftPools: [[]] }],
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
    // orderCountry: {
    //   operator: 'in',
    //   leftSide: {
    //     name: '订单国家/地区',
    //     innerType: 'string',
    //     ref: 'order.orderCountryCodeList',
    //   },
    //   rightSides: [],
    // },
    orderTotalNum: {
      operator: 'range',
      leftSide: {
        innerType: 'integer',
        name: '订单总数量',
        ref: 'order.orderTotalQty',
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
    orderTimeMarket: {
      operator: 'rangeDate',
      leftSide: {
        innerType: 'string',
        name: '订购时间(市场)',
        ref: 'order.orderTimeMarket',
      },
      rightSides: [],
    },
    receiveCountryCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货国家/地区',
        innerType: 'string',
        ref: 'order.receiveCountryCodeList',
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
