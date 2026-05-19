<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" width="600">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="120px" :disabled="true">
      <el-form-item label="任务类型" prop="taskType">
        <el-select
          placeholder="任务类型"
          v-model="form.taskType"
          clearable
          filterable
          class="select-type"
        >
          <el-option
            v-for="(item, index) in taskTypeList"
            :key="index"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程获取方式" prop="contentType">
        <el-select
          placeholder="课程获取方式"
          v-model="form.contentType"
          clearable
          filterable
          class="select-type"
        >
          <el-option
            v-for="(item, index) in contentTypeList"
            :key="index"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程内容" :prop="+form.contentType === 2 ? 'contentList' : 'content'">
        <KeenFileUpload
          v-if="form.contentType === 2"
          ref="upload"
          v-model="form.contentList"
          directory="knowledge"
          :limit="10"
          :multiple="true"
          class="file-upload"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-input v-else v-model="form.content" />
      </el-form-item>
      <!-- <el-form-item label="学习截止时间" prop="deadlineTime">
        <el-date-picker
          v-model="form.deadlineTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="学习截止时间"
          style="width: 100%"
        />
      </el-form-item> -->
      <el-form-item label="核验方式" prop="courseType">
        <el-select
          placeholder="核验方式"
          v-model="form.courseType"
          clearable
          filterable
          class="select-type"
        >
          <el-option
            v-for="(item, index) in courseTypeList"
            :key="index"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form ref="uploadFormRef" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="完成凭证" prop="uploadFileList">
          <KeenFileUpload
            ref="upload"
            v-model="form.uploadFileList"
            directory="knowledge"
            :limit="10"
            :multiple="true"
            class="file-upload"
            @success="uploadFormRef.clearValidate('uploadFileList')"
          >
            <el-button type="primary" size="small">选择文件</el-button>
          </KeenFileUpload>
        </el-form-item>
      </el-form>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { knowledgeApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import { taskTypeList, courseTypeList, contentTypeList } from '../../config';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const title = ref('');

  const formRef = ref(null);
  const uploadFormRef = ref(null);
  const form = ref({
    courseCode: undefined,
    deptId: undefined,
    labelType: undefined,
    contentType: undefined,
    courseType: undefined,
    studyMethod: undefined,
    taskType: undefined,
    courseLabelCodeList: undefined,
    contentList: [],
    content: undefined,
  });

  const rules = reactive({
    uploadFileList: [{ required: true, message: '请上传凭证', trigger: ['blur', 'change'] }],
  });

  const save = async () => {
    const isValid = await uploadFormRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;

    const uploadFileList = form.value.uploadFileList.map((item) => {
      return {
        fileKey: item.ossKey,
        fileName: item.name,
      };
    });
    await knowledgeApi
      .luteosKnowledgeUploadCredentials({
        courseCode: form.value.courseCode,
        taskCode: form.value.taskCode,
        traineeCode: form.value.traineeCode,
        uploadFileList,
      })
      .finally(() => {
        saveLoading.value = false;
      });
    ElMessage.success('保存成功');
    emit('success');
    visible.value = false;
  };

  const open = async (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      form.value = cloneDeep(row);
      if (+row.contentType === 2) {
        form.value.contentList = [];
        row.contentList?.forEach((item) => {
          const data = {
            percentage: 100,
            fileName: item.fileName,
            name: item.fileName,
            status: 'success',
            ossKey: item.fileKey,
            url: item.url,
          };
          form.value.contentList.push(data);
        });
      } else {
        form.value.content = row.contentList?.length ? row.contentList[0]?.content : undefined;
      }
      form.value.uploadFileList = [];
      row.uploadFileList?.forEach((item) => {
        const data = {
          percentage: 100,
          fileName: item.fileName,
          name: item.fileName,
          status: 'success',
          ossKey: item.fileKey,
          url: item.url,
        };
        form.value.uploadFileList.push(data);
      });

      title.value = '编辑';
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
