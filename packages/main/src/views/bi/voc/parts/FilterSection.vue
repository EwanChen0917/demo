<template>
  <div class="search-bar">
    <!-- 10日(包含10日)展示上一个月份数据，10日之后展示当月数据 -->
    <TimeSearch
      :update-date="defaultMonth"
      :default-time="
        searchParams[state.periodType === 'week' ? 'weekList' : 'monthList'] || defaultMonth
      "
      :weekOptions="dict.weekStrList"
      :defaultType="`${state.periodType as 'week' | 'month'}range`"
      :timeOptions="[
        { label: '周', value: 'weekrange' },
        { label: '月', value: 'monthrange' },
      ]"
      ref="timeSearchRef"
      @change="handleChangeTime"
    />
    <el-select
      v-model="state.platformList"
      :options="(dict.platformList || []).map((x) => ({ label: x, value: x }))"
      placeholder="平台"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-cascader
      v-model="state.countryList"
      placeholder="区域/国家"
      clearable
      multiple
      collapse-tags
      collapse-tags-tooltip
      :show-all-levels="false"
      :max-collapse-tags="1"
      :options="dict.countryOptions"
      :props="{ ...tagProps, checkStrictly: false, emitPath: false }"
      :teleported="false"
    />
    <el-select
      v-model="state.productLineMarketGroupList"
      :options="(dict.productLineMarketGroupList || []).map((x) => ({ label: x, value: x }))"
      placeholder="GTM组"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="state.productLineList"
      :options="(dict.productLineList || []).map((x) => ({ label: x, value: x }))"
      placeholder="品线"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="state.categoryNameLevel3List"
      :options="(dict.categoryNameLevel3List || []).map((x) => ({ label: x, value: x }))"
      placeholder="三级品类"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />

    <el-cascader
      v-model="vocTagList"
      placeholder="标签分类"
      clearable
      multiple
      collapse-tags
      collapse-tags-tooltip
      :show-all-levels="false"
      :max-collapse-tags="1"
      :options="options"
      :props="{ ...tagProps, checkStrictly: true, emitPath: true }"
      :teleported="false"
      @update:model-value="updateVocTagList"
    />
    <el-select
      v-model="state.spuNameList"
      placeholder="SPU"
      :options="(dict.spuNameList || []).map((x) => ({ label: x.name, value: x.name }))"
      multiple
      :clearable="true"
      :teleported="false"
      filterable
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select v-model="caliber" placeholder="数据口径" :teleported="false">
      <el-option v-for="item in dict.dataCaliber" :key="item" :label="item" :value="item" />
    </el-select>
    <el-cascader
      v-model="dataSourceList"
      placeholder="数据来源"
      clearable
      multiple
      collapse-tags
      collapse-tags-tooltip
      :show-all-levels="false"
      :max-collapse-tags="1"
      :options="dataSourceOptions"
      :props="{ ...tagProps, checkStrictly: true, emitPath: true }"
      :teleported="false"
      @change="updateDataSourceList"
    />
    <el-button text @click="handleReset">重置</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { biApi, BiContracts } from '@/api';
  import TimeSearch from '@/views/bi/components/TimeSearch.vue';
  import { useVModel } from '@vueuse/core';
  import dayjs from 'dayjs';
  import { CascaderProps } from 'element-plus';

  const props = defineProps<{
    searchParams: any;
    updateDate: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:searchParams', value: any): void;
    (e: 'reset'): void;
  }>();

  const defaultMonth =
    Number(dayjs().format('DD')) > 10
      ? dayjs().format('YYYY-MM')
      : dayjs().subtract(1, 'month').format('YYYY-MM');

  const state = useVModel(props, 'searchParams', emit);

  const caliber = computed({
    get() {
      return Array.isArray(props.searchParams.dataCaliber)
        ? props.searchParams.dataCaliber[0]
        : props.searchParams.dataCaliber;
    },
    set(value: string) {
      state.value.dataCaliber = [value];
    },
  });

  const dict = reactive({
    weekStrList: [''],
    productLineList: [] as string[],
    productLineMarketGroupList: [] as string[],
    categoryNameLevel3List: [] as string[],
    platformList: [] as string[],
    countryOptions: [] as { value: string; children: { value: string }[] }[],
    vocTagTree: {
      vocTagLevel1List: [] as any[],
    },
    spuNameList: [] as BiContracts.SpuBean[],
    dataCaliber: [] as string[],
    dataSourceTree: [] as BiContracts.DataSourceBean[],
  });
  const queryEnums = async () => {
    const res = await biApi.biVocCondition(props.searchParams);
    dict.weekStrList = res.weekList || [];
    dict.productLineList = res.productLineList || [];
    dict.productLineMarketGroupList = res.productLineMarketGroupList || [];
    dict.categoryNameLevel3List = res.categoryNameLevel3List || [];
    dict.platformList = res.platformList || [];
    dict.countryOptions =
      Object.keys(res.areaCountryMap).map((key) => ({
        value: key,
        children: res.areaCountryMap[key].map((country: string) => ({
          value: country,
        })),
      })) || [];
    dict.vocTagTree = res.vocTagTree || {};
    dict.spuNameList = res.spuBeanList || [];
    dict.dataCaliber = res.dataCaliber || [];
    dict.dataSourceTree = res.dataSourceList || [];
  };
  watch(
    () => props.searchParams,
    () => {
      queryEnums();
    },
    { deep: 1 }
  );

  const handleChangeTime = (timeRange: string[], type: string) => {
    switch (type) {
      case 'weekrange':
        state.value.periodType = 'week';
        state.value.weekList = timeRange;
        state.value.monthList = undefined;
        break;
      case 'monthrange':
        state.value.periodType = 'month';
        state.value.monthList = timeRange;
        state.value.weekList = undefined;
        break;
      default:
        break;
    }
    if (resetFlag) {
      emit('reset');
      resetFlag = false;
    }
  };
  const timeSearchRef = useTemplateRef<typeof TimeSearch>('timeSearchRef');
  let resetFlag = false;
  const handleReset = () => {
    resetFlag = true;
    timeSearchRef.value?.reset();
  };
  const vocTagList = defineModel<Array<string | string[]>>('vocTagList');

  const options = computed(() => {
    const list = dict?.vocTagTree.vocTagLevel1List || [];
    // 深度递归，将数据源列表转换为适合el-cascader的格式
    const childrenKey = ['vocTagLevel2List', 'vocTagLevel3List', 'vocTagLevel4List'];
    const dfs = (arr: any[], depth: number) => {
      return arr.map((item) => {
        if (typeof item === 'string') {
          return { value: item };
        }
        if (item[childrenKey[depth]] && item[childrenKey[depth]].length > 0) {
          return {
            value: item.vocName,
            children: dfs(item[childrenKey[depth]], depth + 1),
          };
        }
        return {
          value: item.vocName,
        };
      });
    };
    const tree = dfs(list, 0);
    // 根据默认值展开节点
    // vocTagList.value = vocTagList.value || getValueByPath(tree, '产品问题');
    return tree;
  });
  const tagProps: CascaderProps = {
    value: 'value',
    label: 'value',
    children: 'children',
    multiple: true,
    expandTrigger: 'hover',
    checkStrictly: true,
  };
  const updateVocTagList = (value: string[]) => {
    const result = new Array(4).fill(null).map(() => new Set<string>());
    const treeMap = (data) => {
      data.forEach((val) => {
        val.forEach((item, index) => {
          result[index].add(item);
        });
      });
    };
    treeMap(value);
    const hashMap = {
      0: 'vocLevel1List',
      1: 'vocLevel2List',
      2: 'vocLevel3List',
      3: 'vocLevel4List',
    };
    result.forEach((set, index) => {
      props.searchParams[hashMap[index]] = Array.from(set);
    });
  };
  const dataSourceOptions = computed(() => {
    const list = dict.dataSourceTree || [];
    // 深度递归，将数据源列表转换为适合el-cascader的格式
    const childrenKey = ['dataSourceList'];
    const dfs = (arr: any[], depth: number) => {
      return arr.map((item) => {
        if (typeof item === 'string') {
          return { value: item };
        }
        if (item[childrenKey[depth]] && item[childrenKey[depth]].length > 0) {
          return {
            value: item.vocType,
            children: dfs(item[childrenKey[depth]], depth + 1),
          };
        }
        return {
          value: item.vocType,
        };
      });
    };
    return dfs(list, 0);
  });
  const dataSourceList = defineModel<Array<string | string[]>>('dataSourceList');
  const updateDataSourceList = (value: string[]) => {
    const result = new Array(2).fill(null).map(() => new Set<string>());
    const treeMap = (data) => {
      data.forEach((val) => {
        val.forEach((item, index) => {
          result[index].add(item);
        });
      });
    };
    treeMap(value);
    const hashMap = {
      0: 'vocTypeList',
      1: 'dataSourceList',
    };
    result.forEach((set, index) => {
      state.value[hashMap[index]] = Array.from(set);
    });
  };
  const getValueByPath = (data: any[], targetValue: string) => {
    const targetTree = data.find((node) => node.value === targetValue);
    if (!targetTree) {
      return null;
    }
    const travelTree = (tree: { value: string; children?: any[] }, pathList: string[]) => {
      const result = [...pathList, tree.value];
      if (!tree.children) {
        return result;
      }
      return tree.children.map((node, index) => {
        return travelTree(node, result);
      });
    };
    const result = travelTree(targetTree, []).flat();
    return result;
  };
</script>

<style lang="scss" scoped>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    :deep(.el-cascader) {
      min-width: 103px;
      .el-input {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      .el-cascader__tags {
        position: relative;
        z-index: auto;
        margin-right: 30px;
        transform: none;
      }
    }
    .el-select {
      min-width: 72px;
      width: unset;
      :deep(.el-select__placeholder) {
        width: unset;
        position: initial;
        transform: initial;
      }
      :deep(.el-tag) {
        max-width: unset !important;
      }
    }
    .el-button {
      margin-left: 0;
    }
    .btn-more-filter {
      color: var(---N9, #1f1f1f);
      border-color: var(---N4, #dedede);
      :deep(.iconfont) {
        color: unset;
      }
      &.is-active {
        color: var(---P6, var(---P6, #02b96b));
        border-color: var(---P6, var(---P6, #02b96b));
      }
    }
  }
  .more-filter-content {
    width: 464px;
    .more-filter-form {
      padding: 14px 20px 20px 20px;
      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
    .more-filter-footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px;
    }
  }
</style>
