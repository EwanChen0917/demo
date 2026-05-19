<template>
  <el-dialog title="新增标签" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :rules="rules" :model="form" label-position="top">
      <el-form-item label="标签名称" prop="tagName">
        <el-input v-model="form.tagName" placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="标签描述" />
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    tagName: '',
  });
  const rules = ref({
    tagName: [
      {
        required: true,
        message: '请输入标签名称',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const saveLoading = ref(false);
  const save = async () => {};

  const open = () => {
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
