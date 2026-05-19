<!-- src/components/CodeEditor.vue -->
<template>
  <div class="code-editor-wrapper">
    <v-ace-editor
      ref="editorRef"
      readonly
      :value="formattedContent"
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
    }>(),
    {
      content: '',
      height: '600px',
    }
  );

  const editorRef = ref();

  // Ace Editor 配置选项
  const aceEditorOptions = {
    readOnly: true,
    maxLines: 30,
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
    if (!props.content) return 'text';

    const contentType = detectContentType(props.content);

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
          const parsedJson = JSON.parse(content);
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
    return props.content ? formatContent(props.content) : '';
  });

  // 暴露编辑器实例
  defineExpose({
    editorRef,
    getFormattedContent: () => formattedContent.value,
    getLanguage: () => editorLanguage.value,
  });
</script>

<style scoped lang="scss">
  .code-editor-wrapper {
    .code-editor {
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #ddd;
      min-height: 500px !important;
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