<!-- src/components/CodeEditor.vue -->
<template>
  <div class="code-editor-wrapper">
    <v-ace-editor
      ref="editorRef"
      :readonly="props.readOnly"
      v-model:value="localValue"
      :lang="editorLanguage"
      :options="aceEditorOptions"
      class="code-editor"
      :style="{ width: '100%' }"
    />
  </div>
</template>

<script setup lang="ts">
  import { VAceEditor } from 'vue3-ace-editor';
  import 'ace-builds/src-noconflict/mode-json';
  import 'ace-builds/src-noconflict/mode-xml';

  const props = withDefaults(
    defineProps<{
      content: string;
      height?: string;
      readOnly?: boolean;
    }>(),
    {
      content: '',
      height: '50px',
      readOnly: false,
    }
  );

  const editorRef = ref();
  const localValue = ref('');

  const emit = defineEmits<{
    /** 编辑模式下内容变化（可选：父组件可用 v-model:content 接收） */
    (e: 'update:content', value: string): void;
    /** 内容变化后：是否为合法 JSON（对象/数组） */
    (e: 'json-valid-change', payload: { valid: boolean; error?: string; content: string }): void;
    /** 编辑器失焦 */
    (e: 'blur'): void;
  }>();

  const aceInstance = ref<any>();
  const isFocused = ref(false);
  const onAceBlur = (e?: FocusEvent) => {
    // 若失焦是因为点击了编辑器内部元素（如 gutter 的折叠图标），则不格式化
    const container = editorRef.value?.$el;
    if (e?.relatedTarget && container?.contains?.(e.relatedTarget)) {
      isFocused.value = false;
      return;
    }
    // 失焦时：如果是合法 JSON，则自动美化格式（不影响编辑时输入体验）
    if (!props.readOnly) {
      const trimmed = (localValue.value || '').trim();
      if (trimmed) {
        const type = detectContentType(trimmed);
        if (type === 'json') {
          const formatted = formatContent(trimmed);
          if (formatted && formatted !== localValue.value) {
            localValue.value = formatted;
          }
        }
      }
    }
    isFocused.value = false;
    emit('blur');
  };
  const onAceFocus = () => {
    isFocused.value = true;
  };
  const bindAceEvents = () => {
    const editor = editorRef.value?.getAceInstance?.();
    if (!editor) return;
    if (aceInstance.value && aceInstance.value !== editor) {
      aceInstance.value.off?.('blur', onAceBlur);
      aceInstance.value.off?.('focus', onAceFocus);
    }
    aceInstance.value = editor;
    editor.off?.('blur', onAceBlur);
    editor.on?.('blur', onAceBlur);
    editor.off?.('focus', onAceFocus);
    editor.on?.('focus', onAceFocus);
  };

  onMounted(() => {
    nextTick(() => bindAceEvents());
  });
  watch(editorRef, () => {
    nextTick(() => bindAceEvents());
  });
  onBeforeUnmount(() => {
    aceInstance.value?.off?.('blur', onAceBlur);
    aceInstance.value?.off?.('focus', onAceFocus);
  });

  // Ace Editor 配置选项
  const aceEditorOptions = {
    readOnly: props.readOnly || false,
    maxLines: 10,
    fontSize: 16,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    tabSize: 2,
  };

  // 检测内容类型
  const detectContentType = (content: string): string => {
    const trimmed = content.trim();

    // JSON 检测
    if (
      (trimmed.startsWith('{') || trimmed.startsWith('[')) &&
      (trimmed.endsWith('}') || trimmed.endsWith(']'))
    ) {
      try {
        JSON.parse(trimmed);
        return 'json';
      } catch (e) {
        // 不是有效的 JSON
      }
    }

    // XML 检测
    if (trimmed.startsWith('<')) {
      if (trimmed.includes('<?xml')) {
        return 'xml';
      } else if (trimmed.startsWith('<!DOCTYPE html') || trimmed.startsWith('<html')) {
        return 'html';
      } else {
        // 简单判断是否为 XML
        return 'xml';
      }
    }

    return 'text';
  };

  // 获取编辑器语言模式
  const editorLanguage = computed(() => {
    if (!localValue.value) return 'text';

    const contentType = detectContentType(localValue.value);

    switch (contentType) {
      case 'json':
        return 'json';
      case 'xml':
        return 'xml';
      case 'html':
        return 'html';
      default:
        return 'text';
    }
  });

  // 格式化内容
  const formatContent = (content: string): string => {
    if (!content) return content;

    try {
      const contentType = detectContentType(content);

      switch (contentType) {
        case 'json':
          // JSON 格式化
          const parsedJson = JSON.parse(content.trim());
          return JSON.stringify(parsedJson, null, 2);

        case 'xml':
        case 'html':
          // 简单的 XML/HTML 格式化
          return content
            .replace(/></g, '>\n<')
            .replace(/\n\s*\n/g, '\n')
            .trim();

        default:
          return content;
      }
    } catch (e) {
      // 格式化失败时返回原始内容
      console.warn('内容格式化失败:', e);
      return content;
    }
  };

  // 格式化后的内容
  const formattedContent = computed(() => {
    return localValue.value ? formatContent(localValue.value) : '';
  });

  const formatIfJson = (content: string) => {
    const trimmed = (content || '').trim();
    if (!trimmed) return content || '';
    return detectContentType(trimmed) === 'json' ? formatContent(trimmed) : content || '';
  };

  const jsonValid = ref(false);
  const jsonError = ref<string | undefined>(undefined);
  const validateJson = (content: string) => {
    const trimmed = (content || '').trim();
    jsonValid.value = false;
    jsonError.value = undefined;
    if (!trimmed) return;
    const looksLikeJson =
      (trimmed.startsWith('{') || trimmed.startsWith('[')) &&
      (trimmed.endsWith('}') || trimmed.endsWith(']'));
    if (!looksLikeJson) return;
    try {
      JSON.parse(trimmed);
      jsonValid.value = true;
    } catch {
      jsonValid.value = false;
      jsonError.value = 'JSON 格式不正确';
    }
  };

  // 外部 content / readOnly 变化时，同步到编辑器（避免 :value 受控导致无法输入）
  watch(
    [() => props.content, () => props.readOnly],
    ([val, ro]) => {
      // 外部赋值时（如进入编辑态、切换记录）：默认展示格式化后的 JSON
      // 但在编辑器聚焦输入时不做自动格式化，避免打字过程中被重排
      if (ro) {
        localValue.value = formatContent(val || '');
      } else if (isFocused.value) {
        localValue.value = val || '';
      } else {
        localValue.value = formatIfJson(val || '');
      }
      validateJson(localValue.value);
      emit('json-valid-change', {
        valid: jsonValid.value,
        error: jsonError.value,
        content: localValue.value,
      });
    },
    { immediate: true }
  );

  // 编辑时：实时校验，并可选回传给父组件
  watch(localValue, (val) => {
    if (props.readOnly) return;
    validateJson(val);
    emit('json-valid-change', { valid: jsonValid.value, error: jsonError.value, content: val });
    emit('update:content', val);
  });

  // 暴露编辑器实例
  defineExpose({
    editorRef,
    getFormattedContent: () => formattedContent.value,
    getLanguage: () => editorLanguage.value,
    getValue: () => localValue.value,
    isJsonValid: () => jsonValid.value,
    getJsonError: () => jsonError.value,
  });
</script>

<style scoped lang="scss">
  .code-editor-wrapper {
    .code-editor {
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #ddd;
      min-height: 200px !important;
    }

    :deep(.ace_fold-widget) {
      transform: scale(1.5);

      &:hover {
        outline: none;
        box-shadow: unset;
        border: none;
      }
    }
  }
</style>
