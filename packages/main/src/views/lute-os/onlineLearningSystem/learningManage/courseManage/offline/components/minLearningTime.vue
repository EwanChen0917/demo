<template>
  <el-dialog
    class="minLearningTime-dialog"
    title="编辑课件"
    v-model="visibility"
    width="500px"
    :before-close="close"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="140px">
      <el-form-item label="课件名称：">
        {{ form.name }}
      </el-form-item>
      <el-form-item label="最短学习时长：">
        <el-form-item>
          <div style="display: flex; gap: 8px">
            <NumberInput style="width: 80px" v-model="form.minutes" :precision="0" suffix-icon>
              <template #suffix>分</template>
            </NumberInput>
            <NumberInput style="width: 80px" v-model="form.seconds" :precision="0" suffix-icon>
              <template #suffix>秒</template>
            </NumberInput>
          </div>
        </el-form-item>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { studyApi } from '@/api';
  import { cloneDeep } from 'lodash-es';

  const visibility = ref(false);
  const form = ref({
    index: undefined,
    list: [],
    name: '',
    minutes: undefined,
    seconds: undefined,
  });

  const open = (row, list, index) => {
    form.value = {
      list,
      index,
      name: row.fileName,
      minutes: Math.floor(row.minLearningTime / 60),
      seconds: row.minLearningTime % 60,
    };
    visibility.value = true;
  };
  const close = () => {
    form.value = {
      index: undefined,
      list: [],
      name: '',
      minutes: undefined,
      seconds: undefined,
    };
    visibility.value = false;
  };
  const emits = defineEmits(['success']);
  const route = useRoute();
  const submit = async () => {
    if (form.value.minutes === undefined || form.value.seconds === undefined) {
      ElMessage.warning('最短学习时长不能为空');
    } else {
      const newList = cloneDeep(form.value.list);
      newList[form.value.index].minLearningTime = form.value.minutes * 60 + form.value.seconds;
      const res = await studyApi.luteosStudySaveStudyCourseCatalog({
        courseCode: route.query.courseCode as string,
        catalogSaveList: newList.map((item) => {
          return {
            minLearningTime: item.minLearningTime,
            fileCode: item.fileCode,
          };
        }),
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  defineExpose({ open });
</script>

<style lang="scss">
  .minLearningTime-dialog {
    .el-dialog__body {
      padding: 20px 0;
    }
  }
</style>
