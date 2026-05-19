<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    width="800px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      :disabled="isDetailMode"
    >
      <el-form-item label="模板标题" prop="templateName">
        <el-input
          v-model="formData.templateName"
          placeholder="请输入模板标题"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="模板类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择模板类型" style="width: 100%">
          <el-option
            v-for="item in templateTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="模板内容" prop="template">
        <!-- 模板变量选择器 -->
        <div class="template-variables" v-if="mode !== 'detail'">
          <el-select
            v-model="selectedVariable"
            placeholder="选择模板变量"
            style="width: 200px; margin-bottom: 8px"
            clearable
          >
            <el-option
              v-for="item in templateVariables"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="primary"
            size="small"
            autosize
            :disabled="!selectedVariable"
            @click="insertVariable"
            style="margin-left: 8px; height: 32px; margin-bottom: 8px"
          >
            插入变量
          </el-button>
        </div>
        <el-input
          ref="templateInputRef"
          v-model="formData.template"
          type="textarea"
          :rows="8"
          placeholder="请输入模板内容，支持变量占位符，如：{name}、{code}等"
          maxlength="2000"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="状态" prop="status" v-if="!isAddMode">
        <el-switch
          v-model="formData.status"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="禁用"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          v-if="!isDetailMode"
          type="primary"
          :loading="submitLoading"
          @click="handleSubmit"
        >
          {{ isAddMode ? '新增' : '保存' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, nextTick } from 'vue';
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
  import { platformApi, PlatformApi } from '@/api';
  // Props
  interface Props {
    modelValue: boolean;
    mode: 'add' | 'edit' | 'detail';
    templateData?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    mode: 'add',
    templateData: null,
  });

  // Emits
  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    success: [];
  }>();

  // 响应式数据
  const visible = ref(false);
  const submitLoading = ref(false);
  const formRef = ref<FormInstance>();
  const templateInputRef = ref();
  const selectedVariable = ref('');

  // 模板类型选项
  const templateTypeOptions = ref([
    { label: '消息通知', value: 'notice' },
    { label: '日志', value: 'log' },
  ]);
  interface templateObj {
    label: string;
    value: string;
  }
  // 模板变量选项
  const templateVariables = ref<templateObj[]>([]);

  // 表单数据
  const formData = reactive({
    id: '',
    templateName: '',
    templateCode: '',
    type: '',
    template: '',
    remark: '',
    status: 1,
  });

  // 表单验证规则
  const formRules: FormRules = {
    templateName: [
      { required: true, message: '请输入模板标题', trigger: 'blur' },
      { min: 2, max: 100, message: '标题长度在 2 到 100 个字符', trigger: 'blur' },
    ],
    type: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
    template: [
      { required: true, message: '请输入模板内容', trigger: 'blur' },
      { min: 10, max: 2000, message: '内容长度在 10 到 2000 个字符', trigger: 'blur' },
    ],
  };

  // 计算属性
  const dialogTitle = computed(() => {
    switch (props.mode) {
      case 'add':
        return '新增模板';
      case 'edit':
        return '编辑模板';
      case 'detail':
        return '模板详情';
      default:
        return '模板';
    }
  });

  const isAddMode = computed(() => props.mode === 'add');
  const isEditMode = computed(() => props.mode === 'edit');
  const isDetailMode = computed(() => props.mode === 'detail');

  const initTemplate = async () => {
    try {
      const res = await platformApi.platformDict({
        dictCodes: ['sys_template'],
      });
      if (res.dictMap && res.dictMap.sys_template) {
        templateVariables.value = res.dictMap.sys_template.map((e: any) => {
          return {
            label: `${e.desc}-${e.value}`,
            value: e.value,
          };
        });
      }
    } catch (e) {
    } finally {
    }
  };

  // 监听弹窗显示状态
  watch(
    () => props.modelValue,
    (newVal) => {
      visible.value = newVal;
      if (newVal) {
        initFormData();
        initTemplate();
      }
    },
    { immediate: true }
  );

  watch(visible, (newVal) => {
    emit('update:modelValue', newVal);
  });

  // 初始化表单数据
  const initFormData = () => {
    if (props.mode === 'add') {
      // 新增模式：重置表单
      Object.assign(formData, {
        id: '',
        templateName: '',
        templateCode: '',
        type: '',
        template: '',
        remark: '',
        status: 1,
      });
    } else if (props.templateData) {
      // 编辑/详情模式：回显数据（模板编码需要设置但不显示）
      Object.assign(formData, {
        id: props.templateData.id || '',
        templateName: props.templateData.templateName || '',
        templateCode: props.templateData.templateCode || '', // 设置模板编码用于提交
        type: props.templateData.type || '',
        template: props.templateData.template || '',
        remark: props.templateData.remark || '',
        status: props.templateData.status ?? 1,
      });
    }

    // 清除验证状态
    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return;
    try {
      const valid = await formRef.value.validate();
      if (!valid) return;
      submitLoading.value = true;
      await saveTemplate();
      ElMessage.success(isAddMode.value ? '新增成功' : '保存成功');
      emit('success');
      handleClose();
    } catch (error) {
      console.error('提交失败:', error);
      ElMessage.error('操作失败，请重试');
    } finally {
      submitLoading.value = false;
    }
  };

  // 插入模板变量
  const insertVariable = () => {
    if (!selectedVariable.value || !templateInputRef.value) return;

    const textarea = templateInputRef.value.$el.querySelector('textarea');
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentValue = formData.template;

    // 在光标位置插入变量
    const newValue =
      currentValue.substring(0, startPos) + selectedVariable.value + currentValue.substring(endPos);
    formData.template = newValue;

    // 设置光标位置到插入内容之后
    nextTick(() => {
      const newCursorPos = startPos + selectedVariable.value.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    });

    // 清空选择
    selectedVariable.value = '';
  };

  // 关闭弹窗
  const handleClose = () => {
    visible.value = false;
  };
  // 保存模板（新增和更新共用）
  const saveTemplate = async () => {
    const requestData: any = {
      status: formData.status,
      template: formData.template,
      templateName: formData.templateName,
      type: formData.type,
    };

    // 如果是编辑模式，需要传递模板编码
    if (isEditMode.value && formData.templateCode) {
      requestData.templateCode = formData.templateCode;
    }

    const res = await platformApi.platformTemplateSave(requestData);
    return res;
  };
</script>

<style scoped lang="scss">
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  :deep(.el-form-item__label) {
    font-weight: 500;
  }

  :deep(.el-textarea__inner) {
    resize: vertical;
  }

  .template-variables {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .el-select {
      flex-shrink: 0;
    }

    .el-button {
      flex-shrink: 0;
    }
  }
</style>
