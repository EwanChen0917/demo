export const sceneList = [
  {
    title: '文控中心', // 场景标题
    scene: 1, // 场景值
    labelType: 'fc_center', // 标签类型
    componentName: 'filemanage', // 管理端路由
    tagComponentName: 'filemanagetag', // 标签管理路由
    userComponentName: '', // 用户端路由
  },
  {
    title: '知识库',
    scene: 2,
    labelType: 'fc_knowledge',
    componentName: 'knowledgemanage',
    tagComponentName: 'knowledgemanagetag',
    userComponentName: '',
  },
  {
    title: '素材中心',
    scene: 3,
    labelType: 'fc_material',
    componentName: 'materialcenterbackend',
    tagComponentName: 'materialcentertag',
    userComponentName: 'materialcenteruserend',
  },
  {
    title: '用研资料中心',
    scene: 4,
    labelType: 'fc_research',
    componentName: 'userprofile',
    tagComponentName: 'userprofiletag',
    userComponentName: 'userprofileuserend',
  },
  {
    title: '素材中心', // 我的素材
    scene: 5,
    labelType: 'fc_material',
    componentName: 'materialcentermine',
    tagComponentName: '',
    userComponentName: '',
  },
  {
    title: 'CDX设计中心',
    scene: 10,
    labelType: 'fc_cdxDesign',
    componentName: 'cdxDesignCenter',
    tagComponentName: 'cdxDesignCenterTag',
    userComponentName: '',
  },
  {
    title: '总经办',
    scene: 11,
    labelType: 'fc_managerOffice',
    componentName: 'managerOffice',
    tagComponentName: 'managerOfficeTag',
    userComponentName: '',
  },
];
