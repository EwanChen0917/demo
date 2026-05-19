<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="上级标签"
        prop="parentLabelCode"
        :rules="[{ required: true, message: '请选择上级标签', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.parentLabelCode"
          clearable
          filterable
          placeholder="请选择"
          @change="handleLabelChange"
        >
          <el-option
            v-for="item in fccLabelLevelList"
            :key="item.labelCode"
            :label="item.name"
            :value="item.labelCode"
            :disabled="item.labelCode === form.labelCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签等级" prop="labelName">
        <div>{{ level }}级</div>
      </el-form-item>

      <el-form-item
        label="标签名称"
        prop="labelName"
        :rules="[{ required: true, message: '标签名称不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.labelName" placeholder="请输入标签名称" maxlength="50" />
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
  import { ref } from 'vue';
  import { fccApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      info: any;
      labelTypeInfo: object;
    }>(),
    {
      visible: false,
    }
  );
  const formRef = ref();
  const form: any = ref({
    labelCode: '',
    labelName: '',
    parentLabelCode: '',
  });

  form.value = { ...props.info };

  if (!form.value.parentLabelCode) {
    form.value.parentLabelCode = '-1';
  }

  const title = computed(() => {
    if (props.info.labelCode) {
      return '编辑标签';
    }
    return '新增标签';
  });

  const level = ref(form.value.level || 1);
  const fccLabelLevelList = ref([]);
  const queryLabelList = async () => {
    const res = await platformApi.platformLabelQueryLabelList({
      pageNum: 1,
      pageSize: 500,
      level: 1,
      module: 'fc_material',
      status: 1,
    });
    const list = res.labelInfoList || [];
    list.unshift({
      labelCode: '-1',
      name: '新建一级标签',
      level: 1,
      parentLabelCode: '',
      childInfoList: [],
    });
    fccLabelLevelList.value = list;
  };
  queryLabelList();

  const handleLabelChange = (val) => {
    const res = fccLabelLevelList.value.find((item) => item.labelCode === val);
    level.value = res.level + 1;
  };

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value.validate((isValid) => {
      if (isValid) {
        saveLoading.value = true;
        fccApi
          .luteosFccTagSaveFccLabel({
            labelName: form.value.labelName,
            labelCode: form.value.labelCode || '',
            parentLabelCode: form.value.parentLabelCode === '-1' ? '' : form.value.parentLabelCode,
            status: 1,
            labelModel: 'fc_material',
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
    });
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
