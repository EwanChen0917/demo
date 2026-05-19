<template>
  <el-cascader
    v-model="gtm"
    placeholder="GTM"
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="1"
    :show-all-levels="false"
    :teleported="false"
    :options="options"
    :props="props"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { type BiContracts } from '@/api/';

  const emit = defineEmits<{
    change: [value: Array<string[]>];
  }>();

  const dict = inject<Ref<BiContracts.VocAnalysisEnumsResp>>('dict');
  const search = inject<Ref<BiContracts.VocAnalysisReq>>('search');

  const gtm = shallowRef<Array<string[]>>([]);
  // 重置，删除所选项
  watch(
    () => search!.value,
    (newVal) => {
      if (!newVal.productLineMarketGroupList || newVal.productLineMarketGroupList.length === 0) {
        gtm.value = [];
      }
    },
    {
      deep: 1,
    }
  );
  const options = computed(() => {
    const dataSourceList = dict?.value?.productLineMarketList || [];
    // 深度递归，将数据源列表转换为适合el-cascader的格式
    const valueKey = ['productLineMarketGroup'];
    const childrenKey = ['productLineMarketNameList'];
    const dfs = (list: any[], depth: number) => {
      return list.map((item) => {
        if (typeof item === 'string') {
          return { value: item };
        }
        if (item[childrenKey[depth]] && item[childrenKey[depth]].length > 0) {
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
  const handleChange = (value: Array<string[]>) => {
    // 可以在这里处理选中的数据源
    emit('change', value);
  };
  const getSelectedLabel = () => {
    return Array.from(new Set(gtm.value?.flat(1)));
  };
  defineExpose({
    getSelectedLabel,
  });
</script>
