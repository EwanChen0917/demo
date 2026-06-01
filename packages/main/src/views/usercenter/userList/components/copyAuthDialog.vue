<template>
  <el-dialog
    v-model="visible"
    width="430px"
    title="选择授权链接地址"
    align-center
    @close="handleClose"
    class="copy-auth-dialog"
  >
    <div class="auth-dialog">
      <el-radio-group v-model="selectedOption" class="auth-dialog__radios">
        <el-radio label="erp">ERP</el-radio>
        <el-radio label="design">设计中心</el-radio>
        <el-radio label="kms">KMS-财经中心</el-radio>
      </el-radio-group>
      <div class="auth-dialog__actions">
        <el-button type="primary" :loading="loading" @click="copyLink">复制授权链接</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { copyFn } from '@/utils/copyFn';
  import { encryptByBase64 } from '@/utils/aesTils';

  const visible = ref(false);
  const loading = ref(false);
  const token = ref('');
  const selectedOption = ref<'erp' | 'design' | 'kms'>('erp');
  const isProd = import.meta.env.VITE_ENV === 'PROD';
  const baseUrl = isProd ? 'https://erp.luteos.com' : 'https://erp.luteos.site';
  const designTaskPath = '/designtasklist';
  const kmsDomain = isProd ? 'https://kms.luteos.com' : 'https://kms.luteos.site';
  const kmsFinanceBase = `${kmsDomain}/financeCenter`;
  const kmsMenuCode = isProd ? 'M2025111417274358012224' : 'M2025112418363650032294';

  const fetchToken = async (accountCode?: string) => {
    if (!accountCode) return false;
    loading.value = true;
    try {
      const res = await memberApi.luteosMemberQueryAccountToken({
        accountCode,
      });
      token.value = res?.token || '';
      if (!token.value) {
        ElMessage.error('未获取到授权 token');
        return false;
      }
      return true;
    } catch (err) {
      return false;
    } finally {
      loading.value = false;
    }
  };

  const buildErpLink = () => {
    return `${baseUrl}/fastAuth?token=${encodeURIComponent(token.value)}`;
  };

  const buildDesignLink = () => {
    const target = `${baseUrl}${designTaskPath}`;
    return `${baseUrl}/fastAuth?token=${encodeURIComponent(
      token.value
    )}&redirect=${encodeURIComponent(target)}`;
  };
  const buildKmsLink = () => {
    const encodedFinance = encryptByBase64(kmsFinanceBase);
    const frameUrl = `${baseUrl}/frame/${kmsMenuCode}/${encodedFinance}`;
    return `${baseUrl}/fastAuth?token=${encodeURIComponent(
      token.value
    )}&redirect=${encodeURIComponent(frameUrl)}`;
  };

  const copyLink = async () => {
    if (loading.value) return;
    if (!token.value) {
      ElMessage.warning('正在获取授权信息，请稍后重试');
      return;
    }
    let link = '';
    if (selectedOption.value === 'erp') {
      link = buildErpLink();
    } else if (selectedOption.value === 'design') {
      link = buildDesignLink();
    } else {
      link = buildKmsLink();
    }
    if (!link) {
      ElMessage.error('未配置跳转路径，请稍后重试');
      return;
    }
    copyFn(link, '授权链接');
    handleClose();
  };

  const open = async (accountCode?: string) => {
    selectedOption.value = 'erp';
    token.value = '';
    const ok = await fetchToken(accountCode);
    visible.value = !!ok;
  };

  const handleClose = () => {
    visible.value = false;
    token.value = '';
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.copy-auth-dialog .el-dialog__headerbtn .el-dialog__close) {
    color: #0db14b;
  }

  .auth-dialog {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 8px 4px 0;

    &__radios {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding-left: 12px;
    }

    &__actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 6px;

      :deep(.el-button) {
        min-width: 138px;
      }
    }
  }
</style>
