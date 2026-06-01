<template>
  <el-dialog title="积分发放" :model-value="visible" @close="$emit('close')">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      require-asterisk-position="right"
    >
      <el-form-item label="积分" prop="point" required>
        <el-input-number
          class="w-250px text-start-input-number"
          v-model="form.point"
          :precision="0"
          :controls="false"
          :max="999999"
          :min="-999999"
          placeholder="请输入整数值"
        />
        <p style="line-height: 21px; font-size: 12px; margin: 8px 0 2px 0; color: #f1416c">
          正数代表增加，负数代表减少，只能输入整数
          <br />
          若客户当前扣减积分不足，则会扣减至0，不会出现负积分
        </p>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import type { FormInstance, FormRules } from 'element-plus';

  import { userApi, UserApi, UserContracts } from '@/api/index';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    visible: boolean;
    uid: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'windowClose'): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    point: [
      {
        required: true,
        message: '请输入积分值',
      },
      // {
      //   type: 'integer',
      //   min: 0,
      //   message: '积分值不能小于0',
      // },
      {
        type: 'integer',
        max: 9999999,
        message: '积分值不能大于9999999',
      },
    ],
    remark: [
      {
        max: 500,
        message: '备注长度不能超过500',
      },
    ],
  });
  const form = reactive<
    Omit<UserApi.LuteosUserDistributePointToUser.RequestBody, 'point'> & {
      point?: number;
    }
  >({
    uid: props.uid,
    point: undefined,
    remark: '',
  });

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;

    try {
      saveLoading.value = true;

      await userApi.luteosUserDistributePointToUser({
        ...form,
        point: form.point!,
      });
      await swal.success('积分发放成功');

      emit('close', true);
      resetForm();
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    emit('close');
    resetForm();
  };

  // 重置
  const resetForm = () => {
    formRef.value!.resetFields();
  };
</script>

<style lang="scss" scoped>
  .text-start-input-number {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
</style>
