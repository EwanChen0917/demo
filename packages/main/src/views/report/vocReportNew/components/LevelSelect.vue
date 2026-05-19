<template>
  <el-cascader
    v-model="level"
    placeholder="VOC标签"
    filterable
    clearable
    multiple
    collapse-tags
    collapse-tags-tooltip
    :show-all-levels="false"
    :max-collapse-tags="1"
    :options="options"
    :props="props"
    :style="{ width: '212px' }"
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
  const level = ref<string[]>([]);
  // 重置，删除所选项
  watch(
    () => search!.value,
    (newVal) => {
      if (!newVal.level1List || newVal.level1List.length === 0) {
        level.value = [];
      }
    },
    {
      deep: 1,
    }
  );
  const options = computed(() => {
    const levelList = dict?.value?.levelList || [];
    const valueKey = ['level1'];
    const childrenKey = ['level2List'];
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
    return dfs(levelList, 0);
  });
  const props = {
    value: 'value',
    label: 'value',
    children: 'children',
    multiple: true,
    checkStrictly: false,
  };
  const handleChange = (value: Array<string[]>) => {
    emit('change', value);
  };
</script>
