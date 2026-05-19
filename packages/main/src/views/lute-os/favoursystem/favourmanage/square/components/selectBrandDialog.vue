<template>
  <el-dialog title="请选择品牌" :model-value="visible" @close="emit('close')">
    <el-radio-group v-model="brandCode" style="display: block">
      <div v-for="item in brandList" :key="item.brandCode">
        <el-radio :label="item.brandCode" :disabled="!item.activeFlag">
          {{ item.brandName }}
        </el-radio>
      </div>
    </el-radio-group>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { MetaUserBrandBean } from '@/api/meta/data-contracts';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    brandList: MetaUserBrandBean[];
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val: string[]): void;
  }>();

  const brandCode = ref<string>('');
  const handleSave = () => {
    if (!brandCode.value) {
      ElMessage.warning('请选择品牌');
      return;
    }
    emit('save', brandCode.value);
  };
</script>

<style scoped lang="scss"></style>
