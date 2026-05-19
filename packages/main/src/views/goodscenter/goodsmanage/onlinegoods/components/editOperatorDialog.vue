<template>
  <el-dialog title="添加/修改运营人员" :model-value="visible" @close="emit('close')">
    <div class="mb-5">{{ childInfo }}</div>
    <el-form ref="formRef" :model="form" label-position="top">
      <el-form-item label="运营人员">
        <DeptMember v-model="form.operator" />
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
    operator?: string;
    childInfo?: string;
    keyword?: string;
    channel?: string;
    row: any;
  }>();

  const formRef = ref();
  const form = ref({
    operator: '',
  });
  if (props.row.operatorCode) form.value.operator = props.row.operatorCode || '';

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', url: string): void;
  }>();

  const saveLoading = ref(false);
  const handleSave = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await productApi.luteosProductAmazonListingSaveOperatorV2({
        operator: form.value.operator,
        keywords: props.row[props.keyword],
        channel: props.channel,
        site: props.row.site,
        shop: props.row.shop,
        // keywords: curRow.value.productId,
      });
      ElMessage.success('保存成功');
      emit('save', form.value.operator);
    }
  };
</script>

<style scoped lang="scss"></style>
