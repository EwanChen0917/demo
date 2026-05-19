<template>
  <el-dialog title="新增红人标签" v-model="visibility">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="一级标签名称：" prop="parentLabelName">
        <el-select
          ref="firstLabelRef"
          v-model="form.parentLabelName"
          filterable
          placeholder="请选择或创建一级标签"
          style="width: 100%"
        >
          <el-option
            v-for="item in labelList"
            :key="item.labelCode"
            :label="item.name"
            :value="item.name"
          />
          <template #footer>
            <div class="d-flex gap-2">
              <el-input v-model="firstLabel" size="small" placeholder="创建一级标签" />
              <el-button
                type="primary"
                size="small"
                @click="createFirstLabel"
                :disabled="!firstLabel"
              >
                创建
              </el-button>
            </div>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="二级标签名称：" prop="labelName">
        <el-input v-model="form.labelName" placeholder="请输入二级标签名称" />
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
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits<{
    (success: string);
  }>();

  const visibility = ref(false);
  const formRef = ref(null);
  const labelList = ref([]);

  const form = ref({
    parentLabelName: '',
    labelName: '',
  });

  const rules = reactive({
    parentLabelName: [{ required: true, message: '请选择或创建一级标签', trigger: 'change' }],
    labelName: [{ required: true, message: '请输入二级标签', trigger: 'blur' }],
  });

  const queryLabelList = async () => {
    const res = await platformApi.platformLabelQueryLabelList({
      pageNum: 1,
      pageSize: 500,
      module: 'meta',
      status: 1,
    });
    labelList.value = res?.labelInfoList;
  };
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    await platformApi.platformLabelSaveLabelInfoMulti({
      ...form.value,
      parentLabelCode: labelList.value.find((item) => item.name === form.value.parentLabelName)
        ?.labelCode,
      module: 'meta',
      labelType: 2,
    });
    ElMessage.success('新增成功');
    emits('success');
    close();
  };

  const firstLabel = ref();
  const firstLabelRef = ref();
  const createFirstLabel = async () => {
    await platformApi.platformLabelSaveLabelInfo({
      name: firstLabel.value,
      module: 'meta',
      labelType: 2,
    });
    ElMessage.success('创建成功');
    await queryLabelList();
    form.value.parentLabelName = firstLabel.value;
    firstLabel.value = '';
    firstLabelRef.value.blur();
  };

  const close = () => {
    formRef.value?.resetFields();
    visibility.value = false;
  };

  const open = () => {
    visibility.value = true;
    queryLabelList();
  };
  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
