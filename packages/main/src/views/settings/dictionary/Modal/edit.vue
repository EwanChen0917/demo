<template>
  <el-dialog title="字典配置" :model-value="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="字典模块"
        prop="moduleCode"
        :rules="[{ required: true, message: '请选择字典模块', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.moduleCode" clearable filterable placeholder="字典模块">
          <el-option
            v-for="item in moduleList"
            :key="item.moduleCode"
            :label="item.moduleName"
            :value="item.moduleCode"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="字典编码"
        prop="dictCode"
        :rules="[{ required: true, message: '字典编码不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.dictCode" placeholder="字典编码" />
      </el-form-item>
      <el-form-item
        label="字典值"
        prop="dictName"
        :rules="[{ required: true, message: '字典值不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.dictName" placeholder="字典值" />
      </el-form-item>

      <el-form-item
        label="状态"
        prop="status"
        :rules="[{ required: true, message: '状态不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { platformApi, PlatformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      info: any;
    }>(),
    {
      visible: false,
    }
  );

  const formRef = ref();
  const form: any = ref({
    moduleCode: '',
    dictCode: '',
    dictName: '',
    remark: '',
    status: 1,
  });

  form.value = { ...props.info };

  const statusOptions = ref([
    {
      name: '未启用',
      code: 0,
    },
    {
      name: '启用',
      code: 1,
    },
  ]);

  const moduleList = ref([]);
  const queryModuleList = () => {
    platformApi.platformDictQueryDictModuleList().then((res: any) => {
      moduleList.value = res.moduleList || [];
    });
  };
  queryModuleList();

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value
      ?.validate((isValid) => {
        if (isValid) {
          saveLoading.value = true;
          platformApi
            .platformDictSave({
              ...form.value,
            })
            .then(() => {
              ElMessage.success('保存成功');
              formRef.value.resetFields();
              emit('closeModal', 'reload');
            })
            .finally(() => {
              saveLoading.value = false;
            });
        }
      })
      .catch(() => false);
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped></style>
