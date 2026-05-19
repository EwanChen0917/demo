import { computed, ref } from 'vue';
import { aiGenerateImageApi } from '@/api';
import type { AiGenerateImageContracts } from '@/api';
import type { BasicSelectOption } from '../types';

type FormOptionsResp = AiGenerateImageContracts.QueryFormOptionsResp;

const normalizeNumberOptions = (
  list?: AiGenerateImageContracts.OptionBean[]
): BasicSelectOption<number>[] => {
  return (list || [])
    .filter((item) => typeof item.value === 'number')
    .map((item) => ({
      label: item.label || String(item.value),
      value: item.value as number,
    }));
};

const normalizeStringOptions = (
  list?: AiGenerateImageContracts.StringOptionBean[]
): BasicSelectOption<string>[] => {
  return (list || [])
    .filter((item) => !!item.value)
    .map((item) => ({
      label: item.label || String(item.value),
      value: item.value as string,
    }));
};

const normalizeStringOptionsWithRemark = (
  list?: AiGenerateImageContracts.StringOptionBean[]
): BasicSelectOption<string>[] => {
  return (list || [])
    .filter((item) => !!item.value)
    .map((item) => {
      const label = item.label || String(item.value);
      const remark = (item.remark || '').trim();
      return {
        label: remark ? `${label}${remark}` : label,
        value: item.value as string,
      };
    });
};

export default function useTaskFormOptions() {
  const loading = ref(false);
  const formOptions = ref<FormOptionsResp>({});

  const sceneTypeOptions = computed(() =>
    normalizeNumberOptions(formOptions.value.sceneTypeOptionList)
  );
  const stageOptions = computed(() => normalizeNumberOptions(formOptions.value.stageList));
  const materialTypeOptions = computed(() =>
    normalizeNumberOptions(formOptions.value.materialTypeOptionList)
  );
  const languageOptions = computed(() =>
    normalizeStringOptions(formOptions.value.languageOptionList)
  );
  const periodOptions = computed(() => normalizeStringOptions(formOptions.value.periodList));
  const productImageSourceOptions = computed(() =>
    normalizeStringOptionsWithRemark(formOptions.value.productImageSrcList)
  );
  const channelOptions = computed(() => {
    return (formOptions.value.channelOptionList || []).map((item) => ({
      label: item,
      value: item,
    }));
  });

  const queryOptions = async () => {
    loading.value = true;
    try {
      formOptions.value = await aiGenerateImageApi.luteosAiAdTaskQueryFormOptions();
    } finally {
      loading.value = false;
    }
  };

  const ensureOptions = async () => {
    if (sceneTypeOptions.value.length) return;
    await queryOptions();
  };

  queryOptions();

  return {
    loading,
    formOptions,
    sceneTypeOptions,
    stageOptions,
    materialTypeOptions,
    languageOptions,
    periodOptions,
    productImageSourceOptions,
    channelOptions,
    queryOptions,
    ensureOptions,
  };
}
