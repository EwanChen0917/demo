<template>
  <el-dialog :title="appealDialog.title" :model-value="visible" @close="emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item :label="appealDialog.label" prop="reason">
        <el-input
          v-model="form.reason"
          type="textarea"
          :rows="5"
          :maxlength="100"
          show-word-limit
          placeholder="请输入原因"
          :disabled="isAppealing"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space>
        <template v-if="isAppeal">
          <el-button @click="emit('close')">取消</el-button>
          <el-button type="primary" @click="handleSave" :loading="saveLoading">提交</el-button>
        </template>
        <template v-else-if="isAppealing">
          <el-button @click="handleSave" :loading="saveLoading">撤销申诉</el-button>
          <el-button type="primary" @click="emit('close')">确定</el-button>
        </template>
      </el-space>
    </template>
  </el-dialog>
  <EditEmailDialog
    v-if="editEmailVisible"
    :visible="editEmailVisible"
    :emailInfo="curEmailInfo"
    :isHideSaveTips="true"
    @close="handleClose"
    title="关联使用人"
    tips="该邮箱未关联使用人，为方便通知审核结果请添加使用人"
  />
</template>

<script setup lang="ts">
  import { metaApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import EditEmailDialog from '@/views/lute-os/emailHistory/components/editEmailDialog.vue';

  const props = defineProps<{
    visible: boolean;
    status: number;
    appealData: object;
  }>();

  const emit = defineEmits<{
    (event: 'close', val: Boolean): void;
  }>();

  const formRef = ref();
  const form = ref({
    reason: '',
  });
  form.value.reason = props.appealData.reason || '';

  const rules = ref({
    reason: [{ required: true, message: '请输入原因', trigger: ['blur', 'change'] }],
  });

  const isAppeal = ref([0, 3, 4].includes(props.status));
  const isAppealing = ref(props.status === 1);

  const appealDialog = computed(() => {
    if (isAppeal.value) {
      return {
        title: '申诉',
        label: '该邮件重复触达，如需申诉请填写原因，审核通过后将取消重复触达标签',
      };
    }
    if (props.status === 1) {
      return {
        title: '申诉审核中',
        label: '该邮件重复触达申诉审核中',
      };
    }
  });

  const editEmailVisible = ref(false);
  const curEmailInfo = ref({
    email: props.appealData.email,
  });

  const handleClose = (reload) => {
    editEmailVisible.value = false;
    if (reload) {
      operateAppeal();
    }
  };

  const saveLoading = ref(false);
  const handleSave = async () => {
    const valid = await formRef.value.validate();
    if (valid) {
      if (isAppeal.value) {
        if (props.appealData.hasUser) {
          operateAppeal();
        } else {
          editEmailVisible.value = true;
        }
      } else {
        const isConfirmed = await swal.confirm({
          text: '请确认是否撤回申诉（撤回后可重新提交申诉）',
          confirmButtonText: '撤回申诉',
          cancelButtonText: '取消',
        });
        if (!isConfirmed) return;
        operateAppeal();
      }
    }
  };

  const operateAppeal = async () => {
    saveLoading.value = true;
    await metaApi
      .luteosMetaEmailOperateEmailAppeal({
        operateType: isAppeal.value ? 'appeal' : 'cancel_appeal',
        reason: form.value.reason,
        messageId: props.appealData.messageId,
        receiverEmail: props.appealData.receiverEmail,
      })
      .finally(() => {
        saveLoading.value = false;
      });
    ElMessage.success(
      isAppeal.value ? '申诉提交成功，请等待审核结果，结果将发送钉钉通知' : '申诉撤回成功'
    );
    emit('close', true);
  };
</script>

<style scoped lang="scss"></style>
