<template>
  <el-form :model="form" style="max-width: 800px" ref="formRef" :rules="rules" label-width="140px">
    <el-form-item label="学习截止时间" prop="courseEndTime" v-loading="loading">
      <el-date-picker
        :disabled="mode === 'detail'"
        v-model="form.courseEndTime"
        type="datetime"
        placeholder="请选择学习截止时间"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </el-form-item>
    <el-form-item label="未学提醒" prop="remindFlag">
      <el-switch
        :disabled="mode === 'detail'"
        v-model="form.remindFlag"
        :active-value="1"
        :inactive-value="0"
        @change="handleRemindFlagChange"
      />
    </el-form-item>
    <template v-if="form.remindFlag">
      <el-form-item label="推送周期">
        <NumberInput
          :disabled="mode === 'detail'"
          style="width: 120px"
          v-model="form.remindPeriod"
          :min="0"
          :precision="0"
          suffixIcon
        >
          <template #suffix>天</template>
        </NumberInput>
      </el-form-item>
      <el-form-item label="推送时间">
        <el-date-picker
          :disabled="mode === 'detail'"
          v-model="form.remindTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetime"
          placeholder="请选择推送时间"
        />
      </el-form-item>
      <el-form-item label="推送内容">
        <el-input
          :disabled="mode === 'detail'"
          v-model="form.remindContent"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
    </template>
    <el-form-item label="学习模式">
      <el-select
        :disabled="mode === 'detail'"
        v-model="form.learningWay"
        placeholder="请选择课程学习模式"
      >
        <el-option label="自由式学习" :value="0" />
        <el-option label="解锁式学习" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="课程评价">
      <el-select
        :disabled="mode === 'detail'"
        v-model="form.courseEvaluate"
        placeholder="请选择课评价方式"
      >
        <el-option label="不评价" :value="0" />
        <el-option label="打星评价" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" v-if="mode !== 'detail'">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { studyApi } from '@/api';

  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const route = useRoute();
  const form = reactive({
    learningWay: 0,
    courseEndTime: '',
    remindTime: '',
    remindPeriod: 0,
    configCode: '',
    courseCode: route.query.courseCode as string,
    remindFlag: 0,
    courseEvaluate: 0,
    remindContent: '',
  });
  const origionForm = ref(
    JSON.stringify({
      learningWay: 0,
      courseEndTime: '',
      remindTime: '',
      remindPeriod: 0,
      configCode: '',
      courseCode: route.query.courseCode as string,
      remindFlag: 0,
      courseEvaluate: 0,
      remindContent: '',
    })
  );
  const rules = reactive({ a: [{ required: true, message: '请输入', trigger: 'blur' }] });
  const formRef = ref();

  const submit = async () => {
    const res = await studyApi.luteosStudySaveStudyCourseConfig(form);
    if (res) {
      ElMessage.success('保存成功');
      initDetailData();
      return true;
    }
    return false;
  };
  const loading = ref(false);
  const initDetailData = async () => {
    loading.value = true;
    const res: any = await studyApi
      .luteosStudyQueryStudyConfig({
        courseCode: route.query.courseCode as string,
      })
      .finally(() => {
        loading.value = false;
      });
    form.learningWay = res.learningWay || 0;
    form.courseEndTime = res.courseEndTime || '';
    form.remindTime = res.remindTime || '';
    form.remindPeriod = res.remindPeriod || 0;
    form.configCode = res.configCode || '';
    form.remindFlag = res.remindFlag || 0;
    form.courseEvaluate = res.courseEvaluate || 0;
    form.remindContent = res.remindContent || '';
    origionForm.value = JSON.stringify(form);
  };
  if (route.query.courseCode) {
    initDetailData();
  }
  const handleRemindFlagChange = () => {
    form.remindPeriod = undefined;
    form.remindTime = '';
    form.remindContent = '';
  };
  const hasChange = () => {
    return origionForm.value !== JSON.stringify(form);
  };
  defineExpose({ hasChange, submit });
</script>

<style scoped lang="scss"></style>
