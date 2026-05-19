export const useBaseSelfFulFillmentConfig = () => {
  const baseFields = [
    {
      key: 'orderPlatform',
      label: '订单平台',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'orderStore',
      label: '订单店铺',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    // {
    //   key: 'orderCountry',
    //   label: '订单国家/地区',
    //   type: 'select',
    //   options: [],
    //   placeholder: '请选择',
    // },
  ];
  const warehouseFields = [
    {
      key: 'receiverCountry',
      label: '收货国家/地区',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverProvince',
      label: '收货省/州',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverCity',
      label: '收货城市',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverCode',
      label: '收货邮编',
      type: 'input',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverPhone',
      label: '电话号/手机号',
      type: 'input',
      options: [],
      placeholder: '请选择',
    },
  ];
  const orderFields = [
    {
      key: 'orderMSKU',
      label: '订单MSKU',
      type: 'text',
      placeholder: '请输入MSKU',
    },
    {
      key: 'blacklistFlag',
      label: '订单是否存在黑名单',
      type: 'select',
      placeholder: '',
    },
    // {
    //   key: 'orderIOSS',
    //   label: '订单是否有IOSS',
    //   type: 'radio',
    // },
    // {
    //   key: 'orderDeliveryTime',
    //   label: '距发货截止时间（北京）',
    //   type: 'number',
    // },
  ];
  const shopifyFields = [
    {
      key: 'orderRiskMark',
      label: '订单风险标识',
      type: 'select',
      placeholder: '',
    },
    {
      key: 'CODOrder',
      label: 'cod订单',
      type: 'select',
      placeholder: '',
    },
    {
      key:'tagList',
      label:'平台标签',
      type:'select',
      placeholder:'请选择'
    }
  ];
  // 控制字段是否被选中
  const selectedFields = reactive({
    orderPlatform: false,
    orderStore: false,
    // orderCountry: false,
    shippingWarehouse: false,
    receiverCountry: false,
    receiverProvince: false,
    receiverCity: false,
    logisticsChannel: false,
    receiverCode: false,
    receiverPhone: false,
    orderMSKU: false,
    blacklistFlag: false,
    // orderIOSS: false,
    // orderDeliveryTime: false,
    orderRiskMark: false,
    CODOrder: false,
    tagList:false
  });
  // 表单模型
  const formModel = reactive({
    ruleNo:'',
    name: '',
    status: 1,
    sceneCode: 'self_shipped',
    effectiveTimeBegin: null,
    priority: '',
    description: null,
    conditions: [],
    actionParams: {
      autoAccept: 0, // 0-自动生成自发货，1-不生成自发货
      lableList: [], // 关联订单标签ID数组
    },
    orderPlatform: {
      operator: '!intersection',
      leftSide: {
        name: '订单平台',
        innerType: 'string',
        ref: 'order.channelList',
      },
      rightSides: [
      ],
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
    receiverCountry: {
      operator: 'in',
      leftSide: {
        name: '收货国家/地区',
        innerType: 'string',
        ref: 'order.receiveCountryCodeList',
      },
      rightSides: [],
    },
    receiverProvince: {
      operator: 'in',
      leftSide: {
        name: '收货省/州',
        innerType: 'string',
        ref: 'order.receiveProvinceCodeList',
      },
      rightSides: [],
      configs: [],
    },
    receiverCity: {
      operator: '!intersection',
      leftSide: {
        name: '收货城市',
        innerType: 'string',
        ref: 'order.receiveCityCodeList',
      },
      rightSides: [],
      configs: [],
    },
    receiverPhone: {
      operator: 'in',
      leftSide: {
        name: '电话号/手机号',
        innerType: 'string',
        ref: 'order.receivePhone',
      },
      rightSides: '0',
    },
    receiverCode: {
      operator: 'notExist',
      leftSide: {
        name: '收货邮编',
        innerType: 'string',
        ref: 'order.receivePostalCode',
      },
      rightSides: [
        {
          leftSide: {name: "收货邮编", ref: "order.receivePostalCode"},
          operator: 'and',
          subOp: 'prefix',
          rightSides: [{value: "", subOp: "headRegex"}, {value: "", subOp: "regex"}]
        },
        {
          leftSide: {name: "指定邮编", innerType: "string", ref: "order.receivePostalCode"},
          operator: 'in',
          rightSides: [{value: ""}]
        },
        {
          leftSide: {name: "排除邮编", innerType: "string", ref: "order.receivePostalCode"},
          operator: '!in',
          rightSides: [{value: ""}]
        }
      ]
    },
    orderMSKU: {
      operator: 'contains',
      leftSide: {
        name: '订单MSKU',
        innerType: 'string',
        ref: 'order.mskuList',
      },
      rightSides: [
        
      ],
    },
    blacklistFlag: {
      operator: 'in',
      leftSide: {
        name: '订单是否存在黑名单',
        innerType: 'string',
        ref: 'order.blacklistFlag',
      },
      rightSides: [
        {
          "desc": "否",
          "value": '0'
        }
      ],
    },
    // orderIOSS: {
    //   operator: 'exist',
    //   leftSide: {
    //     name: '订单是否有IOSS',
    //     innerType: '',
    //     ref: 'sorderDetailIossList',
    //   },
    //   rightSides: "1",
    // },
    // orderDeliveryTime: {
    //   operator: 'range',
    //   leftSide: {
    //     name: '距发货截止时间（北京）',
    //     innerType: 'long',
    //     ref: 'sorderSellerShipmentRemainTime',
    //   },
    //   rightSides: [
    //      {
    //       "subOp": ">=",
    //       "value": ""
    //     },
    //     {
    //       "subOp": "<=",
    //       "value": ""
    //     }
    //   ],
    // },
    orderRiskMark: {
      operator: 'in',
      leftSide: {
        name: '订单风险标识',
        innerType: 'string',
        ref: 'order.riskLevelList',
      },
      rightSides: [],
    },
    CODOrder: {
      operator: 'in',
      leftSide: {
        name: 'COD订单',
        innerType: 'string',
        ref: 'order.isCod',
      },
      rightSides: [
        {
          "desc": "Shopify",
          "value": false
        }
      ],
    },
    tagList:{
      operator: 'in',
      leftSide: {
        name: '平台标签',
        innerType: 'string',
        ref: 'order.tagList',
      },
      rightSides: [
        
      ],
    }
  });
  // 校验规则
  const rules = {
    name:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    status:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    priority:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    effectiveTimeBegin:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    description:[{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    orderPlatform: [{ required: true, message: '请选择订单平台', trigger: 'blur' }],
    orderStore: [{ required: true, message: '请选择订单店铺', trigger: 'blur' }],
    // orderCountry: [{ required: true, message: '请选择订单国家/地区', trigger: 'blur' }],
    receiverCountry: [{ required: true, message: '请选择收货国家', trigger: 'blur' }],
    receiverProvince: [{ required: true, message: '请选择收货省份', trigger: 'blur' }],
    receiverCity: [{ required: true, message: '请选择收货城市', trigger: 'blur' }],
    receiverCode: [{ required: true, message: '请选择收货邮编', trigger: 'blur' }],
    receiverPhone: [{ required: true, message: '请选择电话号/手机号', trigger: 'blur' }],
    orderMSKU: [{ required: true, message: '请输入订单MSKU', trigger: 'blur' }],
    blacklistFlag: [{ required: true, message: '请选择订单是否存在黑名单', trigger: 'blur' }],
    orderIOSS: [{ required: true, message: '请选择订单是否有IOSS', trigger: 'blur' }],
    orderDeliveryTime: [
      { required: true, message: '请输入距发货截止时间（北京）', trigger: 'blur' },
    ],
    orderRiskMark: [{ required: true, message: '请选择订单风险标识', trigger: 'blur' }],
    CODOrder: [{ required: true, message: '请选择COD订单', trigger: 'blur' }],
    tagList: [{ required: true, message: '请选择平台标签', trigger: 'blur' }],
  };
  const baseRules = {
    orderPlatform: [{ required: true, message: '请选择订单平台', trigger: 'blur' }],
    orderStore: [{ required: true, message: '请选择订单店铺', trigger: 'blur' }],
    // orderCountry: [{ required: true, message: '请选择订单国家/地区', trigger: 'blur' }],
    receiverCountry: [{ required: true, message: '请选择收货国家', trigger: 'blur' }],
    receiverProvince: [{ required: true, message: '请选择收货省份', trigger: 'blur' }],
    receiverCity: [{ required: true, message: '请选择收货城市', trigger: 'blur' }],
    receiverCode: [{ required: true, message: '请选择收货邮编', trigger: 'blur' }],
    receiverPhone: [{ required: true, message: '请选择电话号/手机号', trigger: 'blur' }],
    orderMSKU: [{ required: true, message: '请输入订单MSKU', trigger: 'blur' }],
    blacklistFlag: [{ required: true, message: '请选择订单是否存在黑名单', trigger: 'blur' }],
    // orderIOSS: [{ required: true, message: '请选择订单是否有IOSS', trigger: 'blur' }],
    // orderDeliveryTime: [{
    //   required: true,
    //   validator: (_rule: any, value: any, callback: Function) => {
    //     if (!value || !Array.isArray(value) || value.length !== 2) {
    //       callback(new Error('请输入距发货截止时间（北京）'));
    //       return;
    //     }
    //     const hasEmptyValue = value.some((item: any) => {
    //       return !item || item.value === undefined || item.value === null || item.value === '';
    //     });
    //     if (hasEmptyValue) {
    //       callback(new Error('请输入距发货截止时间（北京）'));
    //     } else {
    //       callback();
    //     }
    //   },
    //   trigger: ['blur', 'change']
    // }],
    orderRiskMark: [{ required: true, message: '请选择订单风险标识', trigger: 'blur' }],
    CODOrder: [{ required: true, message: '请选择COD订单', trigger: 'blur' }],
    tagList: [{ required: true, message: '请选择平台标签', trigger: 'blur' }],
  };
  const dynamicRules = computed(() => {
    const result: Record<string, any[]> = {};
    Object.keys(selectedFields).forEach(key => {
      if (selectedFields[key] && baseRules[key]) {
        // 使用嵌套路径
        result[`${key}.rightSides`] = baseRules[key];
      }
    });
    result['actionParams.autoAccept'] = [{ required: true, message: '请选择自动生成自发货', trigger: 'blur' }];
    return result;
  });
  // 获取当前可见字段
  const visibleFields = computed(() => {
    const allFields = [...baseFields, ...warehouseFields, ...orderFields, ...shopifyFields];
    const visibleArr = allFields.filter((field) => selectedFields[field.key]);
    return visibleArr;
  });
  const baseFieldsMap = computed(() => {
    return baseFields.filter((item) => selectedFields[item.key]);
  });
  const warehouseFieldsMap = computed(() => {
    return warehouseFields.filter((item) => selectedFields[item.key]);
  });
  const orderFieldsMap = computed(() => {
    return orderFields.filter((item) => selectedFields[item.key]);
  });
  const shopifyFieldsMap = computed(() => {
    return shopifyFields.filter((item) => selectedFields[item.key]);
  });
  return {
    baseFields,
    warehouseFields,
    orderFields,
    shopifyFields,
    formModel,
    rules,
    selectedFields,
    visibleFields,
    baseFieldsMap,
    warehouseFieldsMap,
    orderFieldsMap,
    shopifyFieldsMap,
    dynamicRules
  };
};
