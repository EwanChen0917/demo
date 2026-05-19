export const itemTypeList = [
  {
    text: '全部',
    type: 99, // 这里别动，页面有用到type做判断
    tips: '',
  },
  {
    text: '电商设计',
    type: 12,
    tips: '包含亚马逊电商设计、国内电商设计',
  },
  {
    text: '视频/MG动画',
    type: 13,
    tips: '',
  },
  {
    text: '摄影',
    type: 14,
    tips: '包含拍摄、执行摄影方案',
  },
  {
    text: '三维渲染',
    type: 15,
    permissionCode: 'newRendering3d',
    tips: '',
  },
  {
    text: '包装设计',
    type: 6,
    tips: '包装结构设计、包装平面设计',
  },
  {
    text: 'ID设计',
    type: 7,
    tips: '产品外观与结构设计',
  },
  {
    text: 'CMF设计',
    type: 8,
    tips: '包含产品色彩、材质、表面处理方面的设计',
  },
  {
    text: '品牌传播物料设计',
    type: 11,
    tips: '品牌社媒、宣传、用户运营、活动物料、和VI相关的设计',
  },
  {
    text: '家纺织物设计',
    type: 16,
    tips: '包含图案花稿设计、纺织品类设计、牙胶玩具玩偶类设计',
  },
  {
    text: '体验设计',
    type: 10,
    tips: '包含AIOT、后台、硬件图标、UI/UE设计',
  },
  {
    text: '独立站设计',
    type: 9,
    tips: '包含网页设计、渲染设计、动画渲染设计',
  },
  {
    text: '空间陈列设计',
    type: 19,
    tips: '',
  },
  // {
  //   text: '纺织品图案',
  //   type: 20,
  //   tips: '',
  // },
];

export const dictCodeMap = {
  6: 'package_design',
  7: 'id_design',
  8: 'cmf_design',
  9: 'web_design',
  10: 'ui_design',
  11: 'new_graphic_material_design',
  12: 'new_e_commerce_web_design',
  13: 'new_video',
  14: 'new_photography',
  15: 'new_rendering_3d',
  16: 'home_fabric',
  17: 'experience',
  18: 'shopify',
  19: 'space_display',
  20: 'textile_pattern_design',
};
