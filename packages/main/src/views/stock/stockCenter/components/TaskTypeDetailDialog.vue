<template>
  <el-dialog title="任务类型设置详情" v-model="visibility" width="650px" :before-close="close">
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">任务类型设置详情</span>
      </div>
    </template>

    <el-form :model="form" ref="formRef" :rules="rules" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="任务类型编码" prop="taskTypeCode">
            <el-input v-model="form.taskTypeCode" placeholder="请输入任务类型编码" />
          </el-form-item>
        </el-col>

        <el-col :span="24" :offset="0">
          <el-form-item label="上一级" prop="parentLevel">
            <el-select
              v-model="form.parentLevel"
              placeholder="请选择上一级"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in parentLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" :offset="0">
          <el-form-item label="任务类型名称" prop="taskTypeName">
            <el-input v-model="form.taskTypeName" placeholder="请输入任务类型名称" />
          </el-form-item>
        </el-col>

        <el-col :span="24" :offset="0">
          <el-form-item label="优先级" prop="priority">
            <NumberInput
              v-model="form.priority"
              :min="1"
              :max="10"
              :precision="0"
              placeholder="请输入优先级(1-10)"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24" :offset="0">
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="form.status"
              :active-value="true"
              :inactive-value="false"
              active-text="启用"
              inactive-text="禁用"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';

  interface TaskTypeForm {
    taskTypeCode: string;
    parentLevel: string;
    taskTypeName: string;
    priority: number;
    status: boolean;
  }

  const visibility = ref(false);
  const formRef = ref();

  const form = ref<TaskTypeForm>({
    taskTypeCode: '',
    parentLevel: '',
    taskTypeName: '',
    priority: 1,
    status: true,
  });

  // 上一级选项数据（待定，这里先提供示例数据）
  const parentLevelOptions = ref([
    { label: '系统任务', value: 'SYSTEM_TASK' },
    { label: '报表任务', value: 'REPORT_TASK' },
    { label: '备份任务', value: 'BACKUP_TASK' },
    { label: '同步任务', value: 'SYNC_TASK' },
  ]);

  const rules = ref({
    taskTypeCode: [{ required: true, message: '请输入任务类型编码', trigger: 'blur' }],
    taskTypeName: [{ required: true, message: '请输入任务类型名称', trigger: 'blur' }],
    priority: [
      { required: true, message: '请输入优先级', trigger: 'blur' },
      { type: 'number', min: 1, max: 10, message: '优先级范围为1-10', trigger: 'blur' },
    ],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  });

  async function open(mode: 'add' | 'edit', data?: any): Promise<void> {
    if (mode === 'add') {
      // 新增模式，重置表单
      form.value = {
        taskTypeCode: '',
        parentLevel: '',
        taskTypeName: '',
        priority: 1,
        status: true,
      };
    } else {
      // 编辑模式，填充数据
      form.value = {
        taskTypeCode: data?.taskTypeCode || '',
        parentLevel: data?.parentLevel || '',
        taskTypeName: data?.taskTypeName || '',
        priority: data?.priority || 1,
        status: data?.status !== false,
      };
    }
    visibility.value = true;
  }

  const close = () => {
    visibility.value = false;
    // 重置表单
    form.value = {
      taskTypeCode: '',
      parentLevel: '',
      taskTypeName: '',
      priority: 1,
      status: true,
    };
    nextTick(() => {
      formRef.value?.resetFields();
    });
  };

  const save = async () => {
    const validate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });

    if (validate) {
      try {
        // 这里应该调用实际的API保存数据
        // await saveTaskType(form.value);

        ElMessage.success('保存成功');
        emits('success');
        close();
      } catch (error) {
        ElMessage.error('保存失败');
      }
    }
  };

  const emits = defineEmits<{
    (event: 'success'): void;
  }>();

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    gap: 12px;

    .back-button {
      padding: 0;
      color: var(--el-color-primary);

      &:hover {
        background-color: transparent;
      }

      i {
        margin-right: 4px;
      }
    }

    .dialog-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }
</style>
