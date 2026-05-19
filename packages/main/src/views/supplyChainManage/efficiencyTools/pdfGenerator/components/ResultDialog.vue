<template>
  <el-dialog :title="title" width="750" v-model="visible" @close="visible = false" align-center>
    <el-table :data="failList" max-height="60vh">
      <el-table-column prop="fileName" label="文件名" min-width="100" />
      <el-table-column prop="errorMsg" label="失败原因" min-width="200" />
      <!-- <el-table-column prop="message" label="失败原因" min-width="200">
        <template #default="{ row }">
          <div v-for="(item, index) in row?.message?.split('\n')" :key="index">{{ item }}</div>
        </template>
      </el-table-column> -->
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const failList = ref([]);
  const title = ref('上传失败文件');
  const open = (list, titleParam?: any) => {
    failList.value = list;
    if (titleParam) {
      title.value = titleParam;
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
