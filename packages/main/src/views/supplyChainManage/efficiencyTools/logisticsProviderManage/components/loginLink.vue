<template>
  <el-dialog title="登录链接" v-model="visible" @close="visible = false" :destroy-on-close="true">
    <el-form label-position="top">
      <el-link
        :href="accessToken"
        target="_blank"
        :underline="false"
        type="primary"
        class="mb-5 fs-6"
      >
        <div class="ellipsis-multi">
          {{ accessToken }}
        </div>
      </el-link>

      <el-form-item label="过期自动发送链接邮箱:">
        <el-input
          v-model="content"
          type="textarea"
          placeholder="请输入收件邮箱"
          :rows="3"
          clearable
        />
      </el-form-item>
      <el-form-item label="有效期:" label-position="left">
        <span>{{ validTime.createAt }} - {{ validTime.expiresIn }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" @click="copyLoginInfo">复制链接</el-button>
      <el-button type="primary" @click="updateLoginInfo" :disabled="!content">更新链接</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api';
  import { copyFn } from '@/utils/copyFn';

  const visible = ref(false);

  const content = ref();
  const accessToken = ref('');
  const validTime = ref({
    createAt: '',
    expiresIn: '',
  });
  const supplierCode = ref('');

  const open = async (val) => {
    visible.value = true;
    supplierCode.value = val.supplierCode;
    accessToken.value = val?.accessToken;
    validTime.value = {
      createAt: dayjs(val?.createAt).format('YYYY-MM-DD HH:mm:ss'),
      expiresIn: dayjs(val?.expiresIn).format('YYYY-MM-DD HH:mm:ss'),
    };
    content.value = val?.relNoticeEmail;
  };

  const copyLoginInfo = () => {
    copyFn(`${accessToken.value}`, '登录链接');
  };

  const updateLoginInfo = async () => {
    if (content.value) {
      content.value = content.value
        ?.split('\n')
        .filter((item) => item.trim())
        .join('\n');
      const illegalEmails = content.value?.split('\n')?.filter((item) => {
        return !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}/.test(item);
      });
      if (illegalEmails?.length) {
        ElMessage.warning(`${illegalEmails?.join(',')}不是有效的邮箱地址，请重新输入`);
        return;
      }
      try {
        await erpApi.luteosErpLogisticsSupplierUpdateAccountToken({
          supplierCode: supplierCode.value as string,
          relNoticeEmail: content.value,
        });
        ElMessage.success('更新成功');
        visible.value = false;
      } catch (error) {
        ElMessage.error('更新失败,请重试');
      }
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .ellipsis-multi {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 552px;
  }
</style>
