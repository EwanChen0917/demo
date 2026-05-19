<template>
  <div class="editor-wrap" ref="editorWrapRef">
    <Toolbar
      style="position: sticky; top: -18px; z-index: 10"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
      @click="onClickToolbar"
    />
    <Editor
      ref="editorComponentRef"
      style="min-height: 100px"
      v-model="contentData"
      :defaultConfig="editorConfig"
      mode="simple"
      @on-created="handleCreated"
      @on-change="onChange"
      @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css';
  import { platformApi, PlatformContracts } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      content: string;
    }>(),
    {
      content: '',
    }
  );

  const contentData = ref<string>(props.content);

  watch(
    () => props.content,
    (newValue) => {
      contentData.value = newValue;
      // editorRef.value?.setHtml?.(newValue || '');
    }
  );

  const emit = defineEmits<(e: 'update:content', content: string) => void>();

  const editorRef = shallowRef<any | null>(null);
  const editorWrapRef = shallowRef<any | null>(null);

  const toolbarConfig = {
    excludeKeys: [
      'group-video',
      'insertLink',
      'insertImage',
      'fontSize',
      'fontFamily',
      'bgColor',
      'group-more-style',
      'group-indent',
      'todo',
      'undo',
      'redo',
      'emotion',
      'lineHeight',
      'header2',
      'header4',
      'header5',
      'header6',
      'divider',
      'group-justify',
      'insertTable',
    ],
  };
  const uploadImageToOSS = async (file) => {
    try {
      // 调用后端接口获取OSS签名
      const res = (await platformApi.platformOssQueryOssPublicPolicy({
        directory: 'weeklyReport',
        filename: file.name || Date.now().toString(),
      })) as Required<PlatformContracts.AliyunTempPolicyResp>;

      // 构造上传到OSS的表单数据
      const formData = new FormData();
      formData.append('key', res.key);
      formData.append('policy', res.policy);
      formData.append('OSSAccessKeyId', res.ossAccessKeyId);
      formData.append('signature', res.signature);
      formData.append('file', file);

      // 上传到OSS
      await fetch(res.host!, {
        method: 'POST',
        body: formData,
      });

      // 返回图片URL
      return `${res.host}/${res.key}`;
    } catch (err) {
      console.error('图片上传失败:', err);
      throw err;
    }
  };

  const handleCreated = (editor) => {
    editorRef.value = editor;
  };
  const onChange = (editor) => {
    emit('update:content', contentData.value);
  };
  const onClickToolbar = async (ev) => {
    editorRef.value.focus();
    // if (ev.target.classList.contains('color-block')) {
    //   // await nextTick();
    //   // hideColorPanel();
    // }
  };
  const onClick = () => {
    editorRef.value.focus();
    clickOutside();
  };

  const editorConfig = {
    placeholder: '',
    MENU_CONF: {
      uploadImage: {
        async customUpload(file, insertFn) {
          try {
            const imageUrl = await uploadImageToOSS(file);
            insertFn(imageUrl);
          } catch (err) {
            ElMessage.error('图片上传失败');
          }
        },
      },
    },
    pasteImage: {
      enable: true,
      async customUpload(file, insertFn) {
        try {
          const imageUrl = await uploadImageToOSS(file);
          insertFn(imageUrl);
        } catch (err) {
          ElMessage.error('粘贴图片上传失败');
        }
      },
    },
  };

  const clickOutside = () => {
    // hideFontPanel();
    // hideColorPanel();
  };
  const hideFontPanel = () => {
    if (editorWrapRef.value) {
      const fontPanel = editorWrapRef.value.querySelector(
        '[data-menu-key="headerSelect"] + .w-e-select-list'
      );
      if (fontPanel) {
        fontPanel.style.display = 'none';
      }
    }
  };
  const hideColorPanel = () => {
    if (editorWrapRef.value) {
      const colorPanel = editorWrapRef.value.querySelector(
        '[data-menu-key="color"] + .w-e-drop-panel'
      );
      if (colorPanel) {
        // colorPanel.style.display = 'none';
      }
    }
  };

  onMounted(() => {
    // document.addEventListener('click', clickOutside);
  });
  onBeforeUnmount(() => {
    // document.removeEventListener('click', clickOutside);
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
</script>

<style scoped lang="scss">
  .editor-wrap {
    width: 100%;
    position: relative;
    text-align: left;
    border-radius: 10px;
    border: 1px solid #dedede;
    background: #fff;

    &:focus-within {
      border-color: var(--el-color-primary-light-3);
    }
  }

  :deep(.w-e-toolbar) {
    background: var(---N1, #f7f7f7);
    border-radius: 11px 11px 0 0;
  }

  :deep(.w-e-bar-item) {
    padding: 0 2px;

    svg {
      fill: #595959 !important;
    }

    button {
      padding: 0 3px;
      color: #595959 !important;
    }
  }

  :deep(.w-e-hover-bar) {
    // display: none;
  }

  :deep(.w-e-text-container) {
    border-radius: 0 0 10px 10px;
  }

  // 根据需求隐藏掉一些字体大小设置项
  :deep(.w-e-select-list ul) {
    [data-value='header1'],
  [data-value='header2'],
    //[data-value='header3'],
  [data-value='header4'],
  [data-value='header5'],
  [data-value='header6'] {
      display: none;
    }
  }
</style>
