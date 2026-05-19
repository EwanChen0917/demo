<template>
  <div class="search-bar">
    <TimeSearch
      v-if="updateDate"
      :update-date="updateDate"
      :weekOptions="dict.weekStrList"
      :timeOptions="[
        { label: '周', value: 'week' },
        { label: '月', value: 'month' },
        { label: '年', value: 'year' },
      ]"
      ref="timeSearchRef"
      @change="handleChangeTime"
    />
    <el-select
      v-model="productLineList"
      :options="(dict.productLineList || []).map((x) => ({ label: x, value: x }))"
      placeholder="品线"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="level1List"
      :options="(dict.level1List || []).map((x) => ({ label: x, value: x }))"
      placeholder="一级标签"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="categoryList"
      :options="(dict.categoryList || []).map((x) => ({ label: x, value: x }))"
      placeholder="三级类目"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="platformList"
      :options="(dict.platformList || []).map((x) => ({ label: x, value: x }))"
      placeholder="平台"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="countryList"
      :options="(dict.countryList || []).map((x) => ({ label: x, value: x }))"
      placeholder="国家"
      clearable
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select v-model="spuNewProductTag" placeholder="产品分类" clearable>
      <el-option v-for="tag in dict.newProductTagList" :key="tag" :label="tag" :value="tag" />
    </el-select>
    <el-select
      v-model="spuNameList"
      placeholder="SPU"
      :options="(dict.spuNameList || []).map((x) => ({ label: x, value: x }))"
      :clearable="true"
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-select
      v-model="spuStatusList"
      placeholder="SPU状态"
      :options="(dict.spuStatusList || []).map((x) => ({ label: x, value: x }))"
      :clearable="true"
      filterable
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
    <el-button text @click="handleReset">重置</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { biApi } from '@/api';
  import TimeSearch from '@/views/bi/components/TimeSearch.vue';
  import dayjs from 'dayjs';

  const props = defineProps<{
    searchParams: any;
    updateDate: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:level2List', value: string[]): void;
  }>();

  const {
    dateType,
    week,
    month,
    year,
    productLineList,
    level1List,
    categoryList,
    platformList,
    countryList,
    spuNewProductTag,
    spuNameList,
    spuStatusList,
  } = toRefs(props.searchParams);

  const dict = reactive({
    weekStrList: [] as string[],
    productLineList: [] as string[],
    level1List: ['产品问题'],
    categoryList: [] as string[],
    platformList: [] as string[],
    countryList: [] as string[],
    spuList: [] as string[],
    newProductTagList: ['新品', '老品'],
    spuNameList: [] as string[],
    spuStatusList: [] as string[],
  });
  const queryEnums = () => {
    biApi
      .biCommonQueryEnums({
        enumType: 'product_manager',
        ...props.searchParams,
      })
      .then((res) => {
        dict.weekStrList = res.weekStrList || [];
        dict.productLineList = res.productLineList || [];
        dict.level1List = res.level1List || [];
        dict.categoryList = res.categoryList || [];
        dict.platformList = res.platformList || [];
        dict.countryList = res.countryList || [];
        dict.newProductTagList = res.newProductTagList || [];
        dict.spuNameList = res.spuNameList || [];
        dict.spuStatusList = res.spuStatusList || [];
        emit('update:level2List', res.level2List || []);
      });
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
      case 'week':
        dateType.value = 'week';
        week.value = timeRange[0];
        month.value = undefined;
        year.value = undefined;
        break;
      case 'month':
        dateType.value = 'month';
        month.value = timeRange[0];
        week.value = undefined;
        year.value = undefined;
        break;
      case 'year':
        dateType.value = 'year';
        month.value = undefined;
        week.value = undefined;
        year.value = dayjs(timeRange[0]).format('YYYY');
        break;
      default:
        break;
    }
  };
  const timeSearchRef = useTemplateRef<typeof TimeSearch>('timeSearchRef');
  const handleReset = () => {
    productLineList.value = ['吸奶器'];
    level1List.value = ['产品问题'];
    categoryList.value = [];
    platformList.value = [];
    countryList.value = [];
    spuNewProductTag.value = '';
    spuNameList.value = [];
    spuStatusList.value = ['可销售'];
    timeSearchRef.value?.reset();
  };
</script>

<style lang="scss" scoped>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
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
  }
</style>
