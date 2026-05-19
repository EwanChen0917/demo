<template>
  <el-cascader
    v-model="categoryList"
    placeholder="品类"
    filterable
    clearable
    multiple
    collapse-tags
    collapse-tags-tooltip
    :show-all-levels="false"
    :max-collapse-tags="1"
    :options="options"
    :props="props"
    :teleported="false"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { type BiContracts } from '@/api/';
  import { type CascaderProps } from 'element-plus';

  const emit = defineEmits<{
    change: [value: string[]];
  }>();

  const dict = inject<Ref<BiContracts.VocAnalysisEnumsResp>>('dict');
  const search = inject<Ref<BiContracts.VocAnalysisReq>>('search');
  const categoryList = ref<string[]>([]);

  // 重置，删除所选项
  watch(
    () => search!.value,
    (newVal) => {
      if (!newVal.categoryNameLevel3List || newVal.categoryNameLevel3List.length === 0) {
        categoryList.value = [];
      }
    },
    {
      deep: 1,
    }
  );
  const options = computed(() => {
    const list = dict?.value.categoryList || [];
    // 深度递归，将数据源列表转换为适合el-cascader的格式
    const valueKey = ['categoryNameLevel3', 'categoryNameLevel4'];
    const childrenKey = ['categoryNameLevel4List', 'categoryNameLevel5List'];
    const dfs = (arr: any[], depth: number) => {
      return arr.map((item) => {
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
    return dfs(list, 0);
  });
  const props: CascaderProps = {
    value: 'value',
    label: 'value',
    children: 'children',
    multiple: true,
    expandTrigger: 'hover',
    checkStrictly: false,
  };
  const handleChange = (value: string[]) => {
    emit('change', value);
  };
  const getSelectedLabel = () => {
    return categoryList.value;
  };
  defineExpose({
    getSelectedLabel,
  });
</script>
