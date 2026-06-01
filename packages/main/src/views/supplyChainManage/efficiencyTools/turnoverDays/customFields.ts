const customFields = [
    {
      title: '产品信息',
      propertyArr: [
        // { key: 'productImageUrl', label: '图片', checked: true }, // 接口未返回
        { key: 'skuName', label: '商品名称', checked: true,readonly: true  },
        { key: 'thirdCategoryDesc', label: '类目', checked: true,readonly: true   }, 
        { key: 'skuCode', label: 'SKU', checked: true,readonly: true   }, 
        { key: 'defaultProductSku', label: '默认发货SKU', checked: true,  },
        { key: 'channel', label: '渠道', checked: true,  },
        { key: 'country', label: '站点', checked: true,  },
        { key: 'originalPlatformMark', label: '渠道唯一标识', checked: true,  },
        
      ],
    },
    {
      title: '库存&供应',
      propertyArr: [
        {
          key: 'qty',
          label: '中仓库存',
          checked: true,
          readonly: true,
        },
        {
          key: 'onWayQty',
          label: '采购在途',
          checked: true,
          readonly: true,
        },
        {
          key: 'platformInitialInventory',
          label: '平台期初库存',
          checked: true,
          readonly: true,
        },
        {
          key: 'supplier',
          label: '供应商',
          checked: true,
        },
        {
          key: 'softDay',
          label: '安全周转最小天数',
          checked: true,
        },
        {
          key: 'supplyCycle',
          label: '总供应周期',
          checked: true,
        },
        // {
        //   key: 'logisticChannel',  // 接口未返回
        //   label: '物流渠道',
        //   checked: true,
        // },
        {
          key: 'planer',
          label: '计划专员',
          checked: true,
        },
      ],
    },
    
  ];
  export default customFields;
  