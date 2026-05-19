<template>
  <el-dialog title="编辑红人状态" :model-value="visible" @close="emit('close')">
    <el-radio-group v-model="status" style="display: block">
      <div>
        <el-radio :label="1">已建联</el-radio>
      </div>
      <div>
        <el-radio :label="2">未合作</el-radio>
      </div>
      <div>
        <el-radio :label="3">创建合作</el-radio>
      </div>
      <div>
        <el-radio :label="4">取消合作</el-radio>
      </div>
    </el-radio-group>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val: string[]): void;
  }>();

  const status = ref<number>();

  const handleSave = () => {
    if (!status.value) {
      ElMessage.warning('请选择状态');
      return;
    }
    emit('save', status.value);
  };
</script>

<style scoped lang="scss"></style>
