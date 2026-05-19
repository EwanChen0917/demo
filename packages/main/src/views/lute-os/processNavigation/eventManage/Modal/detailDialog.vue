<template>
  <el-dialog
    :title="`${form.code ? '事项详情' : '新增事项'}`"
    :model-value="visible"
    width="600px"
    :before-close="close"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-form-item label="上级事项" prop="code">
        <!-- 一级事项修改名字，展示无，不能修改 -->
        <el-select v-if="isEdit" placeholder="无" disabled class="input-width" />

        <el-select v-model="form.parentCode" class="input-width" v-else>
          <el-option
            v-for="(item, index) in recordList"
            :label="item.name"
            :value="item.code"
            :key="index"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="事项名称" prop="name">
        <el-input v-model="form.name" class="input-width" maxlength="20" show-word-limit />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';
  import { processApi } from '@/api/index';

  const props = defineProps<{
    visible: boolean;
    formData: object;
    recordList: Array<object>;
  }>();

  const isEdit = computed(() => {
    // 一级事项编辑
    return form.value.level === 1;
  });

  const formRef = ref();
  const form = ref({ ...props.formData });
  const rules = ref({
    name: [{ required: true, message: '请输入事项名称', trigger: 'blur' }],
  });

  const close = () => {
    form.value.code = '';
    form.value.name = '';
    form.value.level = '';
    nextTick(() => {
      formRef.value.resetFields();
      emits('close');
    });
  };
  const save = async () => {
    const data: any = {
      code: isEdit.value ? form.value.code : '',
      name: form.value.name,
      operateType: 1,
      parentCode: form.value.parentCode,
    };

    const validate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (validate) {
      await processApi.luteosProcessNavigationMatterSave(data);
      ElMessage.success('提交成功');
      emits('save');
      close();
    }
  };
  const emits = defineEmits<{
    (event: 'save'): void;
    (event: 'close'): void;
  }>();
</script>

<style scoped lang="scss">
  .input-width {
    width: 400px;
  }
</style>
