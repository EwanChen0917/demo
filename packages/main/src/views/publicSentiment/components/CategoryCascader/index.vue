<template>
  <el-cascader
    v-model="modelValue"
    :options="options"
    :props="optionProps"
    :placeholder="placeholder"
    clearable
    collapse-tags
    collapse-tags-tooltip
    :teleported="false"
    :show-all-levels="!filterFlag"
    @change="handleChange"
    filterable
    class="adaptive-cascader"
  />
</template>

<script setup lang="ts">
  import { productApi } from '@/api/index';
  import { onMounted, nextTick } from 'vue';

  const modelValue = defineModel({
    type: Array,
    default: () => [],
  });

  const props = withDefaults(
    defineProps<{
      filterFlag?: number;
      placeholder?: string;
      emitPath?: boolean;
      multiple?: boolean;
      valueKey?: string;
    }>(),
    {
      placeholder: '请选择产品分类',
      emitPath: true,
      multiple: false,
      valueKey: 'categoryName',
    }
  );

  const emit = defineEmits<{
    (event: 'change', val: any): void;
  }>();

  const options = ref<any[]>([]);

  const optionProps = computed(() => ({
    label: 'categoryName',
    value: props.valueKey,
    checkStrictly: !props?.filterFlag,
    emitPath: props.emitPath,
    multiple: props.multiple,
  }));

  const getCategoryTree = async () => {
    const res = await productApi.luteosProductCategoryQueryCategoryTree({
      filterFlag: props.filterFlag,
    });
    options.value = res.categoryList || [];
  };

  // 修复级联选择器的内联样式
  const fixCascaderStyles = () => {
    const cascaders = document.querySelectorAll('.adaptive-cascader');
    cascaders.forEach((cascader) => {
      const cascaderTags = cascader.querySelector('.el-cascader__tags');
      const hasTags = cascader.querySelector('.el-tag');

      // 修复 flex-wrap
      if (cascaderTags) {
        (cascaderTags as HTMLElement).style.setProperty('flex-wrap', 'nowrap', 'important');
      }

      // 根据是否有选中值设置宽度
      if (hasTags) {
        // 有选中值：自适应宽度
        (cascader as HTMLElement).style.setProperty('width', 'auto', 'important');
        (cascader as HTMLElement).style.setProperty('min-width', '120px', 'important');
        (cascader as HTMLElement).style.setProperty('max-width', '320px', 'important');
      } else {
        // 无选中值：固定 120px
        (cascader as HTMLElement).style.setProperty('width', '120px', 'important');
        (cascader as HTMLElement).style.removeProperty('min-width');
        (cascader as HTMLElement).style.removeProperty('max-width');
      }
    });
  };

  const handleChange = (val: any) => {
    emit('change', val);
    // 每次选择后重新修复样式
    nextTick(() => {
      fixCascaderStyles();
    });
  };

  onMounted(() => {
    nextTick(() => {
      fixCascaderStyles();
    });
  });

  watchEffect(() => {
    getCategoryTree();
  });

  watch(modelValue, () => {
    nextTick(() => {
      fixCascaderStyles();
    });
  });
</script>
