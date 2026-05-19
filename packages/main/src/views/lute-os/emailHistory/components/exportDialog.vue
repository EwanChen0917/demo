<template>
  <el-dialog title="导出" v-model="visibility" width="30%" :before-close="close">
    <el-radio-group v-model="exportType" style="display: block">
      <p v-for="item in exportTypeList" :key="item.key">
        <el-radio :label="item.label">
          {{ item.title }}
        </el-radio>
      </p>
    </el-radio-group>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">导出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const visibility = ref(false);
  const close = () => {
    visibility.value = false;
  };
  const exportType = ref('1');
  const exportTypeList = [
    {
      key: '1',
      title: '邮件记录',
      label: '1',
    },
    {
      key: '2',
      title: '重复触达邮件记录',
      label: '2',
    },
  ];
  const open = () => {
    visibility.value = true;
    exportType.value = '1';
  };
  const emits = defineEmits(['select']);
  const confirm = () => {
    emits('select', exportType.value);
    close();
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
