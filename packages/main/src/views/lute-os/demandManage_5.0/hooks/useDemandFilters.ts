import type { MaybeRef } from 'vue';
import { productApi } from '@/api';
import { queryDemandCategoryTree } from '../services/demandApi';
import type { DemandFilterForm } from '../types/workbench';
import { AuditStatusMap } from '../legacy/constant';

export type DemandFilterComponent = 'input' | 'select' | 'member';

export interface DemandFilterSchema {
  key: keyof DemandFilterForm;
  label: string;
  component: DemandFilterComponent;
  placeholder: string;
  clearable?: boolean;
  multiple?: boolean;
  options?: Array<{ label: string; value: string | number }>;
}

export const getDefaultDemandFilterForm = (): DemandFilterForm => ({
  keyword: '',
  creator: '',
  productLine: '',
  categoryCode: '',
  demandType: undefined,
  demandProperty: undefined,
  demandHandlerList: [],
  statusList: [],
});

export const useDemandFilters = (_bizTab: MaybeRef<string>) => {
  const filterForm = ref<DemandFilterForm>(getDefaultDemandFilterForm());
  const productLineOptions = ref<Array<{ label: string; value: string | number }>>([]);
  const categoryOptions = ref<Array<{ label: string; value: string | number }>>([]);

  const loadProductLineOptions = async () => {
    const res = await productApi.luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    productLineOptions.value = (res?.recordList || []).map((item) => ({
      label: item.productLine,
      value: item.code,
    }));
  };

  const loadCategoryOptions = async () => {
    const res = await queryDemandCategoryTree();
    categoryOptions.value = [
      { label: '新品调研', value: '0' },
      ...((res.categoryDataList || []).map((item) => ({
        label: item.categoryName,
        value: item.categoryCode,
      })) as Array<{ label: string; value: string | number }>),
    ];
  };

  const baseSchemas = computed<DemandFilterSchema[]>(() => [
    {
      key: 'keyword',
      label: '需求标题/需求描述',
      component: 'input',
      placeholder: '请输入需求标题/需求描述',
      clearable: true,
    },
    {
      key: 'creator',
      label: '需求创建人',
      component: 'member',
      placeholder: '请选择需求创建人',
      clearable: true,
    },
    {
      key: 'productLine',
      label: '产品品线',
      component: 'select',
      placeholder: '产品品线',
      clearable: true,
      options: productLineOptions.value,
    },
    {
      key: 'categoryCode',
      label: '产品分类',
      component: 'select',
      placeholder: '请选产品分类',
      clearable: true,
      options: categoryOptions.value,
    },
    {
      key: 'demandType',
      label: '需求类型',
      component: 'select',
      placeholder: '请选择需求类型',
      clearable: true,
      options: [
        { label: '调研类（无样品）', value: 1 },
        { label: '体验类（有样品）', value: 2 },
        { label: '测图测款', value: 3 },
        { label: '市场调研类', value: 4 },
        { label: '其他', value: 5 },
      ],
    },
    {
      key: 'demandProperty',
      label: '需求属性',
      component: 'select',
      placeholder: '请选择需求属性',
      clearable: true,
      options: [
        { label: '十大重点品类', value: 1 },
        { label: '九大新兴品类', value: 2 },
        { label: '重点孵化品类', value: 3 },
        { label: '其他', value: 4 },
      ],
    },
    {
      key: 'demandHandlerList',
      label: '需求执行人',
      component: 'member',
      placeholder: '请选择需求执行人',
      clearable: true,
      multiple: true,
    },
    {
      key: 'statusList',
      label: '需求状态',
      component: 'select',
      placeholder: '请选择需求状态',
      clearable: true,
      multiple: true,
      options: Object.entries(AuditStatusMap)
        .filter(([value]) => Number(value) >= 1 && Number(value) <= 8)
        .map(([value, label]) => ({
          label,
          value: Number(value),
        })),
    },
  ]);

  const schemas = computed(() => baseSchemas.value);

  onMounted(() => {
    void Promise.allSettled([loadProductLineOptions(), loadCategoryOptions()]);
  });

  const resetFilters = () => {
    filterForm.value = getDefaultDemandFilterForm();
  };

  return {
    filterForm,
    schemas,
    resetFilters,
  };
};
