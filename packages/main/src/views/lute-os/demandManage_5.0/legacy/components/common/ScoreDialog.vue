<template>
  <el-dialog v-model="visible" title="报告评分" width="500px" align-center @close="handleCancel">
    <el-form :model="form" :rules="rules" label-width="100px" ref="formRef" label-position="left">
      <el-form-item label="请输入评分" prop="score">
        <el-input-number
          v-model="form.score"
          controls-position="right"
          @change="handleScoreChange"
        />
      </el-form-item>
      <div class="score-tip">
        评分区间为0-100，评分精度为1。若评分小于85分，则评分原因为必填项；若评分大于等于85分则无需填写。
      </div>
      <el-form-item v-if="isScoreNeedReason" label="评分原因" prop="scoreReason">
        <!-- <template #label>
          <span>评分原因</span>
          <el-tooltip
            effect="dark"
            placement="top"
            content="评分为整数百分制，若评分小于85分，则评分原因为必填；大于等于85分则不用"
          >
            <el-icon style="margin-left: 4px; color: #909399; cursor: pointer; margin-top: 10px">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </template> -->
        <el-input
          type="textarea"
          v-model="form.scoreReason"
          maxlength="200"
          show-word-limit
          placeholder="请输入评分原因"
          :autosize="true"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleSubmit" :loading="props.loading">提交评分</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ElMessage } from 'element-plus';

  const visible = ref(false);
  const formRef = ref();

  const form = reactive({
    score: '',
    scoreReason: '',
  });

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  });
  const isScoreNeedReason = computed(
    () => form.score !== '' && form.score !== null && form.score < 85
  );

  function open(initData = {}) {
    Object.assign(form, {
      score: '',
      scoreReason: '',
      ...initData,
    });
    console.log(form, 'form');
    visible.value = true;
  }
  const rules = {
    score: [
      { required: true, message: '请输入评分', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value === '' || value === null || value === undefined) {
            callback();
            return;
          }
          if (!/^\d+$/.test(String(value))) {
            callback(new Error('只能输入0~100的整数'));
            return;
          }
          if (+value < 0 || +value > 100) {
            callback(new Error('只能输入0~100的整数'));
            return;
          }
          callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    scoreReason: [{ required: true, message: '请输入评分原因', trigger: 'blur' }],
  };

  const emit = defineEmits(['submit']);

  function close() {
    visible.value = false;
  }

  function handleSubmit() {
    formRef.value.validate((valid) => {
      if (!valid) return;
      emit('submit', { ...form });
      ElMessage.success('评分已提交');
      close();
    });
  }

  function handleCancel() {
    close();
  }

  function handleScoreChange() {
    if (form.score >= 85) {
      form.scoreReason = '';
    }
  }

  defineExpose({ open, close });
</script>

<style scoped>
  .score-tip {
    color: #909399;
    font-size: 12px;
    padding-left: 12px;
    margin-top: -4px;
    margin-bottom: 16px;
  }
</style>
