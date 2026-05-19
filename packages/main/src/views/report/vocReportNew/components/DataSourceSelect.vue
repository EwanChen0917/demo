<template>
  <el-cascader
    v-model="dataSource"
    placeholder="VOC数据来源"
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="1"
    :show-all-levels="false"
    :options="options"
    :props="props"
    :style="{ width: '212px' }"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { type BiContracts } from '@/api/';
  import { resetRouter } from '@/router';

  const emit = defineEmits<{
    change: [value: Array<string[]>];
  }>();

  const dict = inject<Ref<BiContracts.VocAnalysisEnumsResp>>('dict');
  const search = inject<Ref<BiContracts.VocAnalysisReq>>('search');
  const defaultData = [
    ['Zendesk', 'Instagram', 'instagram_dm'],
    ['Zendesk', 'Zendesk', 'any_channel'],
    ['Zendesk', 'Zendesk', 'api'],
    ['Zendesk', 'Zendesk', 'email'],
    ['Zendesk', 'Zendesk', 'native_messaging'],
    ['Zendesk', 'Zendesk', 'sms'],
    ['Zendesk', 'Zendesk', 'voice'],
    ['Zendesk', 'Zendesk', 'web'],
    ['Zendesk', 'X/Twitter', 'sunshine_conversations_twitter_dm'],
    ['Zendesk', 'X/Twitter', 'twitter'],
    ['Zendesk', 'Facebook', 'facebook'],
    ['Zendesk', 'Facebook', 'sunshine_conversations_facebook_messenger'],
    ['销售订单', '销售订单', '销售订单'],
  ];
  const dataSource = ref<Array<string[]>>(defaultData);
  // 重置，删除所选项
  watch(
    () => search!.value,
    (newVal) => {
      if (!newVal.dataSourceList || newVal.dataSourceList.length === 0) {
        dataSource.value = [];
      }
    },
    {
      deep: 1,
    }
  );
  const options = computed(() => {
    const dataSourceList = dict?.value?.dataSourceList || [];
    // 深度递归，将数据源列表转换为适合el-cascader的格式
    const valueKey = ['dataSource', 'dataSourcePlatform'];
    const childrenKey = ['dataSourcePlatformList', 'dataTypeList'];
    const dfs = (list: any[], depth: number) => {
      return list.map((item) => {
        if (typeof item === 'string') {
          return { value: item };
        }
        if (item[childrenKey[depth]]?.length > 0) {
          return {
            value: item[valueKey[depth]],
            children: dfs(item[childrenKey[depth]], depth + 1),
          };
        }
        return {
          value: item[valueKey[depth]],
        };
      });
    };
    return dfs(dataSourceList, 0);
  });
  const props = {
    value: 'value',
    label: 'value',
    children: 'children',
    multiple: true,
    checkStrictly: false,
  };
  const resetSearch = () => {
    dataSource.value = defaultData;
  };
  const handleChange = (value: Array<string[]>) => {
    // 可以在这里处理选中的数据源
    emit('change', value);
  };
  defineExpose({
    resetSearch,
  });
</script>
