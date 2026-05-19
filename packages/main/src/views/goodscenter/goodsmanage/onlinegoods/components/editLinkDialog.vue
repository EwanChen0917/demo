<template>
  <el-dialog :title="title" :model-value="visible" @close="emit('close')">
    <div class="mb-5">{{ childInfo }}</div>
    <el-form ref="formRef" :model="form" label-position="top">
      <el-form-item label="产品链接">
        <el-input placeholder="请输入" v-model="form.productLink" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    title: string;
    childInfo?: string;
    keyword?: string;
    channel?: string;
    row: any;
  }>();

  const formRef = ref();
  const form = ref({
    productLink: '',
  });
  form.value.productLink = props.row?.productLink || props.row?.asinUrl || '';

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success', url: string): void;
  }>();

  const saveLoading = ref(false);
  const handleSave = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await productApi.luteosProductAmazonListingSaveProductLinkV2({
        productLink: form.value.productLink,
        keywords: props.row[props.keyword],
        channel: props.channel,
        site: props.row.site,
        shop: props.row.shop,
      });
      ElMessage.success('保存成功');
      emit('success');
    }
  };
</script>

<style scoped lang="scss"></style>
