<template>
  <el-dialog title="上传跟踪号" v-model="visible" @close="visible = false">
    <div v-for="(item, index) in trackNumList" :key="index" class="d-flex gap-3 mb-3">
      <el-input v-model="trackNumList[index]" />
      <el-button type="primary" link @click="trackNumList.push('')">添加</el-button>
      <el-button
        type="danger"
        link
        @click="trackNumList.splice(index, 1)"
        :disabled="trackNumList?.length <= 1"
      >
        删除
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits<{
    (e: 'success', val): void;
  }>();

  const visible = ref(false);
  const erpCode = ref();
  const trackNumList = ref([]);
  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpOdoUploadTrackNum({
        trackNumList: trackNumList.value?.filter((item) => item),
        erpCode: erpCode.value,
      });
      ElMessage.success('保存成功');
      emits('success', trackNumList.value);
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (code, list) => {
    erpCode.value = code;
    trackNumList.value = list ?? [''];
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
