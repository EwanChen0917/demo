import { markRaw } from 'vue';
import renderSelect from '../../renderCom/renderSelect.vue';
import renderDoubleInput from '../../renderCom/renderDoubleInput.vue';
import renderTagInput from '../../renderCom/renderTagInput.vue';
import renderCascader from '../../renderCom/renderCascader.vue';
import { useOrderCommonRule } from '../../hooks/useOrderCommonRule';
import renderRadio from '../../renderCom/renderRadio.vue';
import renderSingleSelect from '../../renderCom/renderSingleSelect.vue';

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
      ],
    },
    {
      name: '仓库物流',
      key: 'storage',
      model: [
        {
          key: 'receiverCountry',
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
          serializeType: 'tag',
          placeholder: '请选择',
          show: false,
          rules: [{ required: true, message: '请选择收货国家/地区', trigger: 'blur' }],
        },
        {
          key: 'receiverProvince',
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
          options: [],
          placeholder: '请选择',
          serializeType: 'tagSub',
          show: false,
          rules: [{ required: true, message: '请选择收货省/州', trigger: 'blur' }],
        },
        {
          key: 'receiverCity',
          label: '收货城市',
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
          options: [],
          placeholder: '请选择',
          show: false,
          serializeType: 'tagSub',
          rules: [{ required: true, message: '请选择收货城市', trigger: 'blur' }],
        },
        {
          key: 'receiveCode',
          label: '收货邮编',
          serializeType: 'postcode',
          isCustom: true,
          show: false,
          rules: [{ required: true, message: '请配置收货邮编', trigger: 'blur' }],
        },
        {
          key: 'receiverPhone',
          label: '电话号/手机号',
          type: markRaw(renderSingleSelect),
          prepend: false,
          options: [
            {
              label: '其中一项不为空',
              value: '2',
            },
            {
              label: '全部为空',
              value: '0',
            },
            {
              label: '全部不为空',
              value: '1',
            },
          ],
          placeholder: '请选择',
          show: false,
          serializeType: 'tagSub',
          rules: [{ required: true, message: '请选择电话号/手机号', trigger: 'blur' }],
        },
      ],
    },
    {
      name: '订单',
      key: 'order',
      model: [
        {
          key: 'orderMSKU',
          label: '订单MSKU',
          type: markRaw(renderTagInput),
          prepend: false,
          serializeType: 'tag',
          placeholder: '输入后按回车添加',
          show: false,
          rules: [{ required: true, message: '请输入订单MSKU', trigger: 'blur' }],
        },
      ],
    },
    {
      name: 'Shopify',
      key: 'shiopify',
      model: [
        {
          key: 'orderRiskMark',
          label: '订单风险标识',
          type: markRaw(renderSingleSelect),
          options: [
            {
              label: '高风险',
              value: 'HIGH',
            },
            {
              label: '中风险',
              value: 'MEDIUM',
            },
            {
              label: '无风险',
              value: 'NONE',
            },
          ],
          serializeType: 'tag',
          placeholder: '请选择',
          show: false,
          rules: [{ required: true, message: '请选择订单风险标识', trigger: 'blur' }],
        },
        {
          key: 'CODOrder',
          label: 'cod订单',
          type: markRaw(renderRadio),
          options: [
            {
              label: '是',
              value: '',
            },
            {
              label: '否',
              value: '!intersection',
            },
          ],
          placeholder: '请选择',
          show: false,
          rules: [{ required: true, message: '请选择是否COD订单', trigger: 'blur' }],
        },
      ],
    },
  ]);
  const formModel = reactive<any>({
    id: undefined,
    ruleNo: '',
    name: '',
    status: 0,
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
        innerType: 'string',
        ref: 'channelList',
      },
      rightSides: [],
    },
    orderStore: {
      operator: 'in',
      leftSide: {
        name: '订单店铺',
        innerType: 'string',
        ref: 'shopCodeList',
      },
      rightSides: [],
    },
    receiverCountry: {
      operator: 'in',
      leftSide: {
        name: '收货国家/地区',
        innerType: 'string',
        ref: 'receiveCountryCodeList',
      },
      rightSides: [],
    },
    receiverProvince: {
      operator: 'in',
      leftSide: {
        name: '收货省/州',
        innerType: 'string',
        ref: 'receiveProvinceCodeList',
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
          operator: 'in',
          rightSides: [{ value: '' }],
        },
      ],
    },
    receiverCity: {
      operator: '!intersection',
      leftSide: {
        name: '收货城市',
        innerType: 'string',
        ref: 'receiveCityCodeList',
      },
      rightSides: [],
      configs: [],
    },

    receiverPhone: {
      operator: 'in',
      leftSide: {
        name: '电话号/手机号',
        innerType: 'string',
        ref: 'receivePhone',
      },
      rightSides: '0',
    },
    orderMSKU: {
      operator: 'contains',
      leftSide: {
        name: '订单MSKU',
        innerType: 'string',
        ref: 'mskuList',
      },
      rightSides: [],
    },
    orderRiskMark: {
      operator: 'in',
      leftSide: {
        name: '订单风险标识',
        innerType: 'string',
        ref: 'riskLevelList',
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
          desc: 'Shopify',
          value: false,
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
