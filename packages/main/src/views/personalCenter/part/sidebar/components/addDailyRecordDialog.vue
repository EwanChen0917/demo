<template>
  <el-dialog
    v-model="dialogVisible"
    title="创建日志"
    width="850"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 表单 -->
    <el-form :model="formData" ref="formRef" label-position="top" :rules="rules">
      <!-- 分析对象 -->
      <el-form-item label="日志标题" prop="title" required>
        <el-input
          v-model="formData.title"
          placeholder="请输入日志标题"
          class="create-report-dialog-form-item"
        />
      </el-form-item>

      <!-- 分析周期 -->
      <el-form-item label="日志时间" prop="createTime" required>
        <el-date-picker
          v-model="formData.createTime"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
          class="create-report-dialog-form-item"
        />
      </el-form-item>

      <!-- 内容 -->
      <div class="editor-wrap">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="formData.content"
          :defaultConfig="editorConfig"
          mode="default"
          @on-created="handleCreated"
        />
      </div>
    </el-form>
    <!-- 操作按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css';
  import { platformApi, PlatformContracts } from '@/api';
  import { ElMessage, FooterInstance } from 'element-plus';

  const emit = defineEmits<{
    (e: 'reload'): void;
  }>();
  // 弹窗显示状态
  const dialogVisible = ref<boolean>(false);
  const formRef = ref<FooterInstance | null>(null);
  const editorRef = ref<any | null>(null);

  const rowData = ref<any | null>(null);
  // 表单数据
  const formData = reactive<{
    title: string;
    createTime: string[];
    content: string;
  }>({
    title: '',
    createTime: [],
    content: '',
  });
  const rules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    createTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
  };

  // 打开弹窗的方法
  const open = (row) => {
    editorRef.value?.clear();
    rowData.value = row;
    formData.title = row?.detailList?.[0]?.target || '';
    formData.createTime = null;
    formData.content = row?.detailContents || '';
    editorRef.value?.setHtml?.(formData.content || '');
    dialogVisible.value = true;
  };

  // 确认按钮点击事件处理
  const handleConfirm = async () => {
    const validateResult = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!validateResult) {
      return;
    }
    emit('reload');
    dialogVisible.value = false;
  };

  // 暴露 openDialog 方法，以便外部调用
  defineExpose({ open });

  // editor
  const toolbarConfig = {
    excludeKeys: [
      'group-video',
      'insertLink',
      'insertImage',
      'fullScreen',
      'fontSize',
      'fontFamily',
      'header2',
      'header4',
      'header5',
      'header6',
    ],
  };

  // 封装图片上传公共函数
  // 封装图片上传公共函数
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

  // 在 handleCreated 中添加内容处理逻辑
  const handleCreated = (editor) => {
    editorRef.value = editor;

    // 监听编辑器内容变化
    editor.on('change', async () => {
      // 可以在这里处理内容变化
    });
  };

  const editorConfig = {
    placeholder: '请输入日志内容',
    MENU_CONF: {
      uploadImage: {
        // 使用自定义上传函数
        async customUpload(file, insertFn) {
          try {
            // ElMessage.info('图片上传中...');
            const imageUrl = await uploadImageToOSS(file);
            insertFn(imageUrl);
            // ElMessage.success('图片上传成功');
          } catch (err) {
            ElMessage.error('图片上传失败');
          }
        },
      },
    },
    // 配置粘贴图片处理
    pasteImage: {
      // 启用粘贴图片功能
      enable: true,
      // 自定义粘贴图片处理函数
      async customUpload(file, insertFn) {
        try {
          // ElMessage.info('图片上传中...');
          const imageUrl = await uploadImageToOSS(file);
          insertFn(imageUrl);
        } catch (err) {
          ElMessage.error('粘贴图片上传失败');
        }
      },
    },
  };
</script>

<style lang="scss">
  .create-report-dialog-form-item {
    width: 325px !important;
  }
</style>

<style scoped lang="scss">
  .editor-wrap {
    margin-top: 40px;
    position: relative;
    text-align: left;

    &:before {
      content: '';
      position: absolute;
      top: -15px;
      left: -20px;
      right: -20px;
      height: 6px;
      background: #f5f5f5;
    }
  }

  :deep(.el-form-item--label-top) {
    text-align: left;
  }

  :deep(.w-e-bar-item) {
    padding: 0 2px;

    button {
      padding: 0 3px;
    }
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
