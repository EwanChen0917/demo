<template>
  <div class="my-dialog">
    <el-dialog
      title="调查问卷"
      :model-value="visible"
      @close="handleClose"
      :modal="false"
      :show-close="false"
      width="450px"
    >
      <div class="close-icon" @click="handleCloseFeedback">
        <el-icon><Close /></el-icon>
      </div>
      <el-form
        :model="form"
        ref="formRef"
        class="form-data"
        label-width="120px"
        label-position="top"
        scroll-to-error
      >
        <el-form-item
          :label="formConfig.scoreTitle"
          prop="score"
          :rules="[
            { required: true, message: '请选择评分', trigger: ['blur', 'change'] },
            { pattern: /^[1-9]\d*$/, message: '请选择评分', trigger: ['blur', 'change'] },
          ]"
        >
          <el-rate
            v-model="form.score"
            :max="10"
            show-text
            :texts="texts"
            @change="handleScoreChange"
          />
        </el-form-item>

        <el-form-item :label="formConfig.contentTitle" prop="content">
          <el-input
            v-model="form.content"
            placeholder="您的意见对我们非常重要"
            type="textarea"
            :rows="6"
            :maxlength="100"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-space>
          <el-button type="primary" @click="handleSave" :loading="saveLoading">提交</el-button>
        </el-space>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { Close } from '@element-plus/icons-vue';

  const visible = ref(false);

  const texts = ref([
    '非常不满意',
    '不满意',
    '3分',
    '4分',
    '5分',
    '6分',
    '7分',
    '8分',
    '满意',
    '非常满意',
  ]);
  const form = ref({
    score: '',
    content: '',
    feedbackCode: '',
  });

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  const saveLoading = ref(false);
  const formRef = ref();
  const handleSave = () => {
    formRef.value
      ?.validate(async (isValid) => {
        if (isValid) {
          saveLoading.value = true;
          await platformApi
            .platformFeedbackSave({
              ...form.value,
              type: 1,
            })
            .finally(() => {
              saveLoading.value = false;
            });
          ElMessage.success('感谢您的反馈');
          emit('save');
          formRef.value.resetFields();
          visible.value = false;
        }
      })
      .catch(() => false);
  };

  const handleScoreChange = () => {
    formRef.value?.validate('score').catch(() => false);
  };

  const formConfig = ref({
    scoreTitle: '',
    contentTitle: '',
  });
  const queryRoute = async () => {
    const curPath = location.pathname;
    if (['/', '/login', '/supplierRegister'].includes(curPath)) {
      return;
    }
    const res = await platformApi.platformFeedbackQueryTemplate({
      route: curPath,
    });

    visible.value = !!res.feedbackFlag;
    formConfig.value = res;
    form.value.feedbackCode = res.feedbackCode;
  };

  const handleClose = () => {
    formRef.value.resetFields();
    emit('close');
    visible.value = false;
  };

  const handleCloseFeedback = () => {
    handleClose();
    platformApi.platformFeedbackSave({ feedbackCode: form.value.feedbackCode, type: 0 });
  };

  const router = useRouter();
  const flag = ref(false);
  watch(
    () => router.currentRoute.value.path,
    () => {
      //  登录页和根路径排除
      if (['/', '/login'].includes(location.pathname)) {
        return;
      }
      if (flag.value) {
        return;
      }
      flag.value = true;
      setTimeout(() => {
        queryRoute();
        flag.value = false;
      }, 2000);
    },
    { immediate: true, deep: true }
  );
</script>

<style scoped lang="scss">
  .my-dialog {
    :deep(.el-dialog) {
      /* 使用固定定位，使其相对于视口定位 */
      position: fixed !important;
      /* 将对话框放在距离底部20px，右边20px的位置 */
      bottom: 36px !important;
      right: 30px !important;
    }
    .close-icon {
      position: absolute;
      top: 13px;
      right: 17px;
      cursor: pointer;
    }
  }
</style>
