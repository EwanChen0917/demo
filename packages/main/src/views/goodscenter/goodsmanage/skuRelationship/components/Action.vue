<template>
  <el-dialog
    :title="modalMode === 'add' ? '新增新旧sku映射关系' : '编辑新旧sku映射关系'"
    v-model="visible"
    width="400px"
    @close="visible = false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="产品sku" prop="skuCode" required>
        <el-select
          v-model="form.skuCode"
          placeholder="请选择产品sku"
          filterable
          :remote="true"
          :remote-method="getSkuList"
          :loading="loading"
          clearable
        >
          <el-option
            v-for="item in skuList"
            :key="item.skuCode"
            :label="item.skuCode"
            :value="item.skuCode"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="新产品sku" prop="newSkuCode" required>
        <el-input v-model="form.newSkuCode" placeholder="请输入新产品sku" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  interface SkuForm {
    skuCode: string;
    newSkuCode: string;
  }

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();
  const formRef = ref();
  const form = ref<SkuForm>({
    skuCode: '',
    newSkuCode: '',
  });

  const rules = ref({
    skuCode: [{ required: true, message: '请输入产品sku', trigger: 'blur' }],
    newSkuCode: [{ required: true, message: '请输入新产品sku', trigger: 'blur' }],
  });

  const visible = ref(false);
  const modalMode = ref<'add' | 'edit'>('add');
  const skuList = ref<any[]>([]);
  const getSkuList = async (keyWord?: string) => {
    const res = await productApi.luteosProductSkuQueryProductSkuList({
      pageNum: 1,
      pageSize: 100,
      keyWord: keyWord || '',
    });
    skuList.value = res?.productSkuBeanList || [];
  };
  getSkuList();
  const open = (mode: 'add' | 'edit', row?: any) => {
    formRef.value && formRef.value.resetFields();
    visible.value = true;
    modalMode.value = mode;
    if (mode === 'edit' && row) {
      form.value.skuCode = row.skuCode;
      form.value.newSkuCode = row.newSkuCode;
    } else {
      form.value.skuCode = '';
      form.value.newSkuCode = '';
    }
  };
  const onSave = async () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          const res = await productApi.luteosProductOldNewMappingSaveOrUpdate({
            skuCode: form.value.skuCode,
            newSkuCode: form.value.newSkuCode,
          });
          ElMessage.success('操作成功');
          emit('success');
          visible.value = false;
        } else {
          return false;
        }
      })
      .catch(() => false);
  };

  defineExpose({
    open,
  });
</script>
