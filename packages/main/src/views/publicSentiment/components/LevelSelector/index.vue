<template>
  <el-cascader
    v-model="localValue"
    :options="options"
    :props="cascaderProps"
    :placeholder="placeholder"
    clearable
    filterable
    collapse-tags
    collapse-tags-tooltip
    @change="handleChange"
    :teleported="false"
    class="adaptive-cascader"
  />
</template>

<script setup>
  import { ref, watch, onMounted, nextTick } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    checkStrictly: {
      type: Boolean,
      default: true,
    },
  });

  const emit = defineEmits(['update:modelValue', 'change']);

  const localValue = ref(props.modelValue || []);

  const cascaderProps = {
    multiple: props.multiple,
    checkStrictly: props.checkStrictly,
    value: 'value',
    label: 'label',
    children: 'children',
    emitPath: true, // 默认返回完整路径数组，如 [['L1', 'L2']] if multiple
  };

  // 修复级联选择器的内联样式
  const fixCascaderStyles = () => {
    const cascaders = document.querySelectorAll('.adaptive-cascader');
    cascaders.forEach((cascader) => {
      const cascaderTags = cascader.querySelector('.el-cascader__tags');
      const hasTags = cascader.querySelector('.el-tag');

      // 修复 flex-wrap
      if (cascaderTags) {
        cascaderTags.style.setProperty('flex-wrap', 'nowrap', 'important');
      }

      // 根据是否有选中值设置宽度
      if (hasTags) {
        // 有选中值：自适应宽度
        cascader.style.setProperty('width', 'auto', 'important');
        cascader.style.setProperty('min-width', '120px', 'important');
        cascader.style.setProperty('max-width', '320px', 'important');
      } else {
        // 无选中值：固定 120px
        cascader.style.setProperty('width', '120px', 'important');
        cascader.style.removeProperty('min-width');
        cascader.style.removeProperty('max-width');
      }
    });
  };

  const handleChange = (value) => {
    emit('update:modelValue', value);
    emit('change', value);
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

  watch(
    () => props.modelValue,
    (newVal) => {
      localValue.value = newVal || [];
      nextTick(() => {
        fixCascaderStyles();
      });
    },
    { deep: true }
  );
</script>
