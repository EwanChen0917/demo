<template>
  <div class="tag-input-container">
    <div
      class="tag-input-wrapper is-focused"
      :class="{ 'has-prepend': prepend }"
      @click="focusInput"
    >
      <!-- 已选标签显示区 -->
      <el-tag
        v-for="(item, index) in modelValue"
        :key="index"
        :closable="!disabled"
        type="info"
        size="default"
        @close="removeTag(index)"
        class="tag-item"
      >
        {{ item }}
      </el-tag>

      <!-- 原生输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="tag-input"
        :placeholder="modelValue?.length ? '' : placeholder"
        :disabled="disabled"
        @keyup.enter="addTag"
        @paste="handlePaste"
        @blur="handleBlur"
        @focus="isFocused = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useFormItem } from 'element-plus';

  const { formItem } = useFormItem();

  interface Props {
    modelValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    prepend?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    placeholder: '输入后按回车添加',
    disabled: false,
    prepend: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string[]];
  }>();

  const inputValue = ref('');
  const inputRef = ref<HTMLInputElement>();
  const isFocused = ref(false);

  // 添加单个或批量标签
  const addTags = (values: string | string[]) => {
    console.log(`addTags`, values);
    const tagsToAdd = Array.isArray(values) ? values : [values];
    const newTags: string[] = [];

    tagsToAdd.forEach((tag) => {
      const trimmed = tag.trim();
      // 过滤空值和已存在的值
      if (trimmed && !props.modelValue.includes(trimmed) && !newTags.includes(trimmed)) {
        newTags.push(trimmed);
      }
    });

    if (newTags.length > 0) {
      emit('update:modelValue', [...props.modelValue, ...newTags]);
      formItem?.validate('change');
    }
  };

  const addTag = () => {
    const value = inputValue.value.trim();
    if (value) {
      addTags(value);
      inputValue.value = '';
    }
  };

  const removeTag = (index: number) => {
    const newValue = [...props.modelValue];
    newValue.splice(index, 1);
    emit('update:modelValue', newValue);
    formItem?.validate('change');
  };

  // 处理粘贴事件
  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault(); // 阻止默认粘贴行为

    const pastedText = event.clipboardData?.getData('text') || '';
    if (!pastedText) return;

    // 按逗号分割（支持中英文逗号）
    const tags = pastedText
      .split(/[,，]/) // 支持中文逗号和英文逗号
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (tags.length > 0) {
      // 批量添加标签
      addTags(tags);
      // 清空输入框
      inputValue.value = '';
    }
  };

  const handleBlur = () => {
    isFocused.value = false;
    addTag();
    formItem?.validate('blur');
  };

  const focusInput = () => {
    if (!props.disabled) {
      inputRef.value?.focus();
    }
  };
</script>

<style scoped>
  .tag-input-container {
    display: flex;
    align-items: flex-start;
    width: 100%;
    min-width: 0;
  }

  .tag-input-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 4px;
    min-height: 32px;
    height: auto;
    flex: 1;
    padding: 4px 8px;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: text;
  }

  .tag-input-wrapper.has-prepend {
    border-radius: 0 4px 4px 0;
  }

  .tag-input-wrapper.is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    cursor: not-allowed;
  }

  .tag-item {
    margin: 0;
    flex-shrink: 0;
    max-width: 100%;
    white-space: normal;
    word-break: break-all;
  }

  .tag-input {
    flex: 1;
    min-width: 100px;
    height: 22px;
    line-height: 22px;
    border: none;
    outline: none;
    background: transparent;
    color: #606266;
    font-size: 13px;
    padding: 0;
  }

  .tag-input:disabled {
    cursor: not-allowed;
    color: #c0c4cc;
  }

  .tag-input::placeholder {
    color: #c0c4cc;
  }

  .tips {
    white-space: nowrap;
  }

  .padl15 {
    padding-left: 15px;
  }

  .noshrink {
    flex-shrink: 0;
  }
</style>
