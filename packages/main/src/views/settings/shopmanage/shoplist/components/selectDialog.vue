<template>
  <el-dialog title="新增店铺申请" v-model="visible" @close="visible = false">
    <el-radio-group v-model="type">
      <el-radio :label="2">店铺公司申请流程</el-radio>
      <el-radio :label="1">新增渠道店铺绑定</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">发起申请</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);
  const type = ref(2);
  const router = useRouter();
  const save = async () => {
    visible.value = false;
    // 跳转到申请页面
    router.push({
      path: '/shoplist/apply',
      query: {
        type: type.value,
      },
    });
  };

  const open = () => {
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
