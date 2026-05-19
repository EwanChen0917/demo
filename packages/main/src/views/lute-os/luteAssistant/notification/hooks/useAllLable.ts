import { platformApi, type PlatformContracts } from '@/api';

export default function useAllLable() {
  const allLabel = ref<PlatformContracts.LabelInfoBean[]>([]);
  const loading = ref(true);
  const queryAllLabel = () => {
    platformApi
      .platformLabelQueryLabelList({
        module: 'lute_agent',
        pageSize: 100,
        pageNum: 1,
      })
      .then((res) => {
        allLabel.value = res.labelInfoList || [];
      })
      .finally(() => {
        loading.value = false;
      });
  };
  queryAllLabel();
  const updateAllLabel = () => {
    queryAllLabel();
  };

  return { allLabel, loading, updateAllLabel };
}
