import { markRaw } from 'vue';
import renderSelect from '../../renderCom/renderSelect.vue';
import renderDoubleInput from '../../renderCom/renderDoubleInput.vue';
import renderTagInput from '../../renderCom/renderTagInput.vue';
import renderCascader from '../../renderCom/renderCascader.vue';
import { useOrderCommonRule } from '../../hooks/useOrderCommonRule';

const { channelOptions, shopOptions, countryOptions, shipmentArr, warehouseArr } =
  useOrderCommonRule();
type SerializeType = 'tag' | 'double' | 'cascader' | 'postcode';

/* eslint-disable import/prefer-default-export */
export const useTrenderRuleData = () => {
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
          serializeType: 'none' as const,
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
          serializeType: 'none' as const,
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
        //   serializeType:'none',
        //   show:false,
        //   rules: [{ required: true, message: '请选择订单国家/地区', trigger: 'blur' }],
        // },
        {
          key: 'orderTotalNum',
          label: '订单总数量',
          type: markRaw(renderDoubleInput),
          options: {
            minPlaceHolder: '(含)最小值',
            maxPlaceHolder: '(含)最大值',
          },
          placeholder: '',
          show: false,
          serializeType: 'double',
          rules: [
            {
              required: true,
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
      ],
    },
    {
      name: '仓库物流',
      key: 'storage',
      model: [
        {
          key: 'shippingCodeList',
          label: '物流渠道',
          type: markRaw(renderCascader),
          options: shipmentArr,
          placeholder: '请选择',
          serializeType: 'cascader',
          show: false,
          rules: [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
        },
        {
          key: 'receiveWarehouseCodeList',
          label: '发货仓库',
          type: markRaw(renderSelect),
          options: warehouseArr,
          placeholder: '请选择',
          serializeType: 'cascader' as const,
          show: false,
          rules: [{ required: true, message: '请选择发货仓库', trigger: 'blur' }],
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
        {
          key: 'receiveProvinceCodeList',
          label: '收货省/州',
          type: markRaw(renderTagInput),
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
          headerTips: true,
          options: [],
          placeholder: '输入后按回车添加',
          serializeType: 'tagSub',
          show: false,
          rules: [{ required: true, message: '请添加收货省/州', trigger: 'blur' }],
          appendOptions: [{ label: '不区分大小写', value: 'IN_CASE_SENSITIVE' }],
        },
        {
          key: 'receiveCityCodeList',
          label: '收货城市',
          type: markRaw(renderTagInput),
          headerTips: true,
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
          options: [],
          placeholder: '输入后按回车添加',
          show: false,
          serializeType: 'tagSub',
          rules: [{ required: true, message: '请添加收货城市', trigger: 'blur' }],
          appendOptions: [{ label: '不区分大小写', value: 'IN_CASE_SENSITIVE' }],
        },
        {
          key: 'receiveCode',
          label: '收货邮编',
          serializeType: 'postcode',
          isCustom: true,
          show: false,
          rules: [
            {
              required: true,
              validator: (_rule: any, value: any, callback: Function) => {
                if (!value) {
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
  ]);
  const formModel = reactive<any>({
    id: undefined,
    ruleNo: '',
    name: '',
    status: 1,
    sceneCode: 'mark_shipped',
    effectiveTimeBegin: null,
    priority: 0,
    description: null,
    conditions: [],
    actionParams: {
      confirmShipmentType: 'AUTO',
      sendMarkShipped: 0,
    },
  });
  const conditionList = reactive<any>({
    orderPlatform: {
      operator: 'in',
      leftSide: {
        name: '订单平台',
        innerType: 'array',
        ref: 'order.channelList',
      },
      rightSides: [],
    },
    orderStore: {
      operator: 'in',
      leftSide: {
        name: '订单店铺',
        innerType: 'array',
        ref: 'order.shopCodeList',
      },
      rightSides: [],
    },
    // orderCountry: {
    //   operator: 'in',
    //   leftSide: {
    //     name: '订单国家/地区',
    //     innerType: 'string',
    //     ref: 'orderCountryCodeList',
    //   },
    //   rightSides: [],
    // },
    orderTotalNum: {
      operator: 'range',
      leftSide: {
        name: '订单总数量',
        innerType: 'integer',
        ref: 'order.orderTotalQty',
      },
      rightSides: [
        {
          subOp: '>=',
          value: '',
        },
        {
          subOp: '<=',
          value: '',
        },
      ],
    },
    shippingCodeList: {
      operator: 'in',
      leftSide: {
        name: '物流渠道',
        innerType: 'array',
        ref: 'order.shippingCodeList',
      },
      rightSides: [],
    },
    receiveWarehouseCodeList: {
      operator: 'in',
      leftSide: {
        name: '发货仓库',
        innerType: 'array',
        ref: 'order.warehouseCodeList',
      },
      rightSides: [],
    },
    receiveCountryCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货国家/地区',
        innerType: 'array',
        ref: 'order.receiveCountryCodeList',
      },
      rightSides: [],
    },
    receiveProvinceCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货省/州',
        innerType: 'array',
        ref: 'order.receiveProvinceCodeList',
      },
      rightSides: [],
      configs: [],
    },
    receiveCityCodeList: {
      operator: 'in',
      leftSide: {
        name: '收货城市',
        innerType: 'array',
        ref: 'order.receiveCityCodeList',
      },
      rightSides: [],
      configs: [],
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
  });
  return {
    schema,
    formModel,
    conditionList,
  };
};
