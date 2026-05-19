import { MediaCategoryMap, MediaTypeColorMap } from '../constants';

const getMediaCategoryColor = (mediaCategoryDesc) => {
  const mediaTypeKey = Object.keys(MediaCategoryMap).find(
    (key) => MediaCategoryMap[key] === mediaCategoryDesc
  );
  return mediaTypeKey ? MediaTypeColorMap[mediaTypeKey] : '#e7f9fd';
};

const mediaResourceColumns = [
  {
    prop: 'mediaName',
    label: '媒体名称',
    align: 'center',
    width: 220,
    fixed: 'left',
    slotName: 'mediaName',
  },
  {
    prop: 'level',
    label: '媒体评级',
    width: 80,
    align: 'center',
  },
  {
    prop: 'description',
    label: '媒体简介',
    align: 'center',
    width: 500,
  },
  {
    prop: 'webSite',
    label: 'Website',
    width: 180,
    align: 'center',
    slotName: 'website',
  },
  {
    prop: 'mediaArea',
    label: '媒体所属地区',
    width: 120,
    align: 'center',
    slotName: 'mediaArea',
  },
  {
    prop: 'mediaCategoryDesc',
    label: '媒体分类',
    align: 'center',
    width: 180,
    slotName: 'mediaCategory',
  },
  {
    prop: 'mediaTypeDesc',
    label: '媒体类型',
    width: 180,
    align: 'center',
    slotName: 'mediaType',
  },
  {
    prop: 'mediaVoice',
    label: '媒体声量',
    width: 180,
    align: 'center',
    slotName: 'mediaVoice',
  },
  {
    prop: 'mediaWeight',
    label: '媒体权重',
    width: 180,
    align: 'center',
    slotName: 'mediaWeight',
  },
];

// 专家资源场景的列配置
const expertResourceColumns = [
  {
    prop: 'expertName',
    label: '专家名称',
    align: 'center',
    width: 220,
    fixed: 'left',
  },
  {
    prop: 'website',
    label: 'website',
    align: 'center',
    width: 180,
    slotName: 'website',
  },
  {
    prop: 'socialMediaAccount',
    label: '专家社媒账号',
    align: 'center',
    width: 240,
    slotName: 'socialMedia',
  },
  {
    prop: 'expertType',
    label: '临床/非临床',
    align: 'center',
    width: 150,
  },
  {
    prop: 'clinicalCategory', // 临床分类
    label: '临床分类',
    align: 'center',
    width: 180,
  },
  {
    prop: 'childSupportCategory',
    label: '育儿与儿童支持人员分类',
    align: 'center',
    width: 220,
  },
  {
    prop: 'maternalChildcareCategory',
    label: '母婴护理专家分类',
    align: 'center',
    width: 220,
  },
  {
    prop: 'applicationScenario',
    label: '应用场景',
    align: 'center',
    width: 180,
  },
  {
    prop: 'marketScenarioSuggestion',
    label: '产品侧场景建议',
    align: 'center',
    width: 220,
  },
];

// 机构资源场景的列配置
const institutionResourceColumns = [
  { prop: 'orgName', label: '机构名称', align: 'center',   },
  { prop: 'cooperationStatus', label: '机构当前合作状态', align: 'center',  },
  { prop: 'website', label: 'Website', align: 'center',  slotName: 'website',width:200 },
  { prop: 'region', label: '机构所属地区', align: 'center',  },
  { prop: 'regionExtra', label: '机构所属地区-其他补充内容', align: 'center', },
  { prop: 'orgCategory', label: '机构分类', align: 'center', },
  { prop: 'clinicalMedicalOrg', label: '临床与医疗机构', align: 'center', },
  { prop: 'professionalAssociation', label: '专业协会', align: 'center',  },
  { prop: 'researchOrg', label: '研究机构', align: 'center',  },
  { prop: 'governmentPublicHealthOrg', label: '政府及卫生机构', align: 'center', },
  { prop: 'nonprofitOrg', label: '非营利与倡导组织（面向企业社会责任）', align: 'center', },
  { prop: 'maternalChildHealthBrand', label: '母婴健康与生活方式品牌', align: 'center',  },
  { prop: 'techInnovationPartner', label: '科技/创新与行业合作伙伴的关系', align: 'center', },
  { prop: 'influence', label: '影响力', align: 'center',  },
  { prop: 'orgSize', label: '机构规模', align: 'center',  },
  { prop: 'professionalCapability', label: '专业能力', align: 'center',  },
  { prop: 'brandInfluence', label: '品牌专业影响力', align: 'center',  },
  { prop: 'strategicFit', label: '战略契合度', align: 'center',  },
  { prop: 'targetAudience', label: '受众群体', align: 'center',  },
  { prop: 'applicableProductLines', label: '机构适用品线', align: 'center',},
  { prop: 'orgIntro', label: '机构简介', align: 'center', },
  { prop: 'orgLogo', label: '机构logo', align: 'center',  slotName: 'orgLogo'},
  { prop: 'cooperateWithCompetitor', label: '是否与竞品合作', align: 'center',  },
  { prop: 'competingBrands', label: '合作竞品品牌', align: 'center', },
  { prop: 'contactPerson', label: '机构对接人&职务', align: 'center',},
  { prop: 'contactInfo', label: '对接人联系方式', align: 'center',  },
  { prop: 'mailingCountryRegion', label: '机构邮寄国家/地区', align: 'center', },
  { prop: 'provinceState', label: '省/州', align: 'center', },
  { prop: 'city', label: '城市', align: 'center', },
  { prop: 'detailedAddress', label: '详细地址', align: 'center', },
  { prop: 'creator', label: '创建人', align: 'center', },
  { prop: 'resourceCreateTime', label: '创建时间', align: 'center', },
  { prop: 'updater', label: '更新人', align: 'center', },
  { prop: 'resourceUpdateTime', label: '最后更新时间', align: 'center', },
];

export const columnConfigurations = {
  media_resource: mediaResourceColumns,
  expert_resource: expertResourceColumns,
  institution_resource: institutionResourceColumns,
};

export const helpers = {
    getMediaCategoryColor,
}