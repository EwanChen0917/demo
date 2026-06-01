<template>
  <div class="column base-form">
    <div class="section-title">角色信息</div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="form.roleName"
          maxlength="50"
          show-word-limit
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="角色说明" prop="desc">
        <el-input
          v-model="form.desc"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 20 }"
          maxlength="200"
          show-word-limit
          placeholder="请输入角色说明"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    form: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  });

  const formRef = ref();

  defineExpose({
    formRef,
  });
</script>

<style scoped lang="scss">
  .column {
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 12px 12px 16px;
    min-height: 600px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  }

  .section-title {
    font-weight: 600;
    margin-bottom: 12px;
  }
</style>
