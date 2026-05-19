<template>
  <el-dialog title="新增标签" :model-value="visible" @close="$emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="标签名称" prop="tagName" required>
        <el-input v-model="form.tagName" placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="标签类型" prop="tagType" required>
        <el-select v-model="form.tagType" placeholder="请选择标签类型">
          <el-option
            v-for="type in labelTypeList"
            :value="type.value"
            :label="type.desc"
            :key="type.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="tagRemark">
        <el-input
          v-model="form.tagRemark"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述(50字以内)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import { labelTypeList } from '../../config/index';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductTagSaveOrUpdateTag.RequestBody>({
    tagName: '',
    tagRemark: '',
  });
  const rules = reactive<FormRules>({
    tagName: [
      {
        required: true,
        message: '请填写标签名称',
        trigger: ['blur', 'change'],
      },
    ],
    tagType: [
      {
        required: true,
        message: '请选择标签类型',
        trigger: ['blur', 'change'],
      },
    ],
  });

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        const { tagName, tagRemark, tagType } = form;

        await productApi.luteosProductTagSaveOrUpdateTag({
          tagName,
          tagRemark,
          tagType,
        });

        // FIXME 修改交互
        ElMessage.success({
          message: '创建成功',
          duration: 5 * 1000,
        });

        // 关闭
        emit('close', true);
      } catch (e) {
        // do nothing
      } finally {
        saveLoading.value = false;
      }
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    emit('close');
  };
</script>
