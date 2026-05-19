import { biApi, type BiContracts } from '@/api';
import dayjs from 'dayjs';

export function useState() {
  const loading = ref(false);
  const dict = ref<BiContracts.VocAnalysisEnumsResp>({});
  const search = ref<BiContracts.VocAnalysisReq>({
    dataSourceList: [],
  });
  const dataDetail = ref<BiContracts.VocAnalysisResp>({});
  const dealTime = ref('');
  const getDict = async () => {
    const res = await biApi.biVocQueryEnums(search.value);
    if (res) {
      dict.value = res;
    }
  };
  const initData = async () => {
    loading.value = true;
    const time = await queryDealTime();
    resetSearch();
  };
  const queryDealTime = async (): Promise<string> => {
    const res = await biApi.biVocQueryLastDay({});
    dealTime.value = res ? dayjs(res).format('YYYY-MM-DD') : '';
    return dealTime.value;
  };
  watch(
    search,
    (newSearch) => {
      queryDataDetail(newSearch);
    },
    { deep: 2 }
  );
  const queryDataDetail = async (params: BiContracts.VocAnalysisReq) => {
    loading.value = true;
    getDict();
    const res = await biApi.biVocQueryVocAnalysis(params).finally(() => {
      loading.value = false;
    });
    if (res) {
      dataDetail.value = res;
    }
    return res;
  };
  const resetSearch = () => {
    search.value = {};
    search.value = {
      startDate: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
      dataSourceList: ['Zendesk', '销售订单'],
      dataSourcePlatformList: ['Instagram', 'Zendesk', 'X/Twitter', 'Facebook', '销售订单'],
      dataTypeList: [
        'instagram_dm',
        'any_channel',
        'api',
        'email',
        'native_messaging',
        'sms',
        'voice',
        'web',
        'sunshine_conversations_twitter_dm',
        'twitter',
        'facebook',
        'sunshine_conversations_facebook_messenger',
        '销售订单',
      ],
    };
  };
  return {
    loading,
    search,
    dict,
    dataDetail,
    dealTime,
    initData,
    queryDataDetail,
    resetSearch,
  };
}

export default {};
