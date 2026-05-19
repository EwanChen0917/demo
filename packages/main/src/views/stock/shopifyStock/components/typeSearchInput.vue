<template>
  <el-input
    v-model="localKeyWord"
    :style="{ width: width }"
    :placeholder="dynamicPlaceholder"
    clearable
  >
    <template #prepend>
      <el-select v-model="localKeyWordType" :style="{ width: selectWidth }">
        <el-option v-for="opt in options" :key="opt.value" :label="opt.label" :value="opt.value" />
      </el-select>
    </template>
    <template #suffix><i class="iconfont icon-sousuo"></i></template>
    <template #append v-if="currentOptions?.multiple !== false">
      <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" @clear="handleClear" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import BatchSearchPopover from '@/components/BatchSearchPopover/index.vue';

  interface SearchOption {
    label: string;
    value: string | number;
    multiple: boolean;
    separator?: string;
    placeholder: string;
  }

  interface Props {
    keyWord?: string;
    keyWordType?: string | number;
    options: SearchOption[];
    width?: string;
    selectWidth?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: '450px',
    selectWidth: '136px',
    keyWord: '',
    keyWordType: '',
  });

  const emit = defineEmits<{
    'update:keyWord': [value: string];
    'update:keyWordType': [value: string | number];
    change: [keyWord: string, keyWordType: string | number];
  }>();

  const localKeyWord = computed({
    get: () => props.keyWord,
    set: (val) => {
      emit('update:keyWord', val);
      emit('change', val, props.keyWordType ?? '');
    },
  });
  const localKeyWordType = computed({
    get: () => props.keyWordType || props.options[0]?.value || '',
    set: (val) => {
      emit('update:keyWord', '');
      emit('update:keyWordType', val);
      emit('change', '', val);
    },
  });

  const currentOptions = computed(() => {
    return props.options.find((opt) => opt.value === localKeyWordType.value);
  });
  // 动态占位符
  const dynamicPlaceholder = computed(() => {
    return currentOptions.value?.placeholder || '请输入' || '';
  });
  const batchSearchRef = ref();

  const handleBatchSearch = (val: string) => {
    const options = currentOptions.value;
    if (!options || !val) {
      localKeyWord.value = '';
      return;
    }
    const separator = options.separator || ',';
    const processedValue = val
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .join(separator);

    localKeyWord.value = processedValue;
  };

  // 清空批量搜索
  const handleClear = () => {
    localKeyWord.value = '';
  };

  // 暴露清空方法供外部调用
  const clear = () => {
    if (batchSearchRef.value) {
      batchSearchRef.value.clear();
    }
    handleClear();
  };

  defineExpose({
    clear,
  });
</script>

<style scoped lang="scss"></style>
