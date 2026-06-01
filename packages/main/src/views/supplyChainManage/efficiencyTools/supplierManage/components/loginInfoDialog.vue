<template>
  <el-dialog title="登录信息" :model-value="visible" @close="$emit('close')">
    <el-form label-width="120" label-position="left">
      <el-form-item label="供应商名称">
        <span>{{ loginInfo?.name }}</span>
      </el-form-item>
      <el-form-item label="登录链接">
        <span>{{ loginInfo?.loginUrl }}</span>
      </el-form-item>
      <el-form-item label="登录账号">
        <span>{{ loginInfo?.loginAccount }}</span>
      </el-form-item>
      <el-form-item label="登录密码">
        <span>{{ loginInfo?.loginPwd }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('close')">关闭</el-button>
      <el-button type="primary" @click="copyLoginInfo">复制</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { copyFn } from '@/utils/copyFn.js';
  import { SupplierListItem } from '@/api/supplier/data-contracts';

  const props = defineProps<{
    visible: boolean;
    loginInfo: SupplierListItem;
  }>();

  const copyLoginInfo = () => {
    copyFn(
      `登录链接：${props.loginInfo?.loginUrl}\n登录账号：${props.loginInfo?.loginAccount}\n登录密码：${props.loginInfo?.loginPwd}`,
      '登录信息'
    );
  };
</script>

<style scoped lang="scss"></style>
