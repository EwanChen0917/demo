<template>
  <el-drawer v-model="visible" title="设置" direction="ltr">
    <el-form ref="formRef" :model="formData">
      <el-table :data="formData">
        <el-table-column type="index" width="40" />
        <el-table-column prop="name" label="名称" min-width="80">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="[$index, 'label']"
              :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
            >
              <el-input v-model="row.label" placeholder="请输入名称" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="值" min-width="180">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="[$index, 'value']"
              :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
            >
              <el-input type="textarea" v-model="row.value" placeholder="请输入名称" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="默认" width="48">
          <template #default="{ row, $index }">
            <el-form-item :prop="[$index, 'value']">
              <el-radio
                name="isDefault"
                :trueValue="1"
                :falseValue="0"
                :value="row.label"
                v-model="defaultRow"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="操作" align="right" width="60">
          <template #default="{ $index }">
            <div>
              <el-button type="danger" text size="small" @click="formData.splice($index, 1)">
                删除
              </el-button>
            </div>
            <div>
              <el-button
                type="primary"
                size="small"
                text
                @click="formData.splice($index + 1, 0, { label: '', value: '', isDefault: 0 })"
              >
                新增
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <div style="text-align: right; padding: 10px 0">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { FormInstance } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  defineOptions({ name: 'SettingPanel' });
  const props = defineProps<{
    defaultValue: any[];
  }>();
  const emit = defineEmits<{
    confirm: [value: any[]];
  }>();
  const visible = defineModel<boolean>('visible');
  const formData = ref(cloneDeep(props.defaultValue));
  const defaultRow = ref(
    formData.value.find((item) => item.isDefault === 1)?.label || formData.value[0].label
  );

  const formRef = useTemplateRef<FormInstance>('formRef');
  const handleConfirm = async () => {
    const result = await formRef.value?.validate();
    if (result === false) return;
    formData.value = formData.value.map((item) => ({
      ...item,
      isDefault: item.label === defaultRow.value ? 1 : 0,
    }));
    emit('confirm', cloneDeep(formData.value));
    visible.value = false;
  };
</script>
