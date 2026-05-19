<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" width="1000">
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="120px"
      :disabled="isDisabledForm"
    >
      <el-form-item label="任务类型" prop="taskType" class="w-50">
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
      <el-form-item label="课程获取方式" prop="contentType" class="w-50">
        <el-select
          placeholder="课程获取方式"
          v-model="form.contentType"
          clearable
          filterable
          class="select-type"
          @change="handleContentTypeChange"
          :disabled="isShoukeCourse"
        >
          <el-option
            v-for="(item, index) in contentTypeList"
            :key="index"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="课程内容"
        :prop="+form.contentType === 2 ? 'contentList' : 'content'"
        class="w-50"
        v-if="isShoukeCourse || form.contentType !== 4"
      >
        <KeenFileUpload
          v-if="form.contentType === 2"
          ref="upload"
          v-model="form.contentList"
          directory="knowledge"
          :limit="10"
          :multiple="true"
          class="file-upload"
          @success="formRef.clearValidate('contentList')"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-input v-else v-model="form.content" :disabled="isShoukeCourse"/>
      </el-form-item>
      <el-form-item label="学习截止时间" prop="endTime" class="w-50">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="学习截止时间"
        />
      </el-form-item>
      <el-form-item label="核验方式" prop="courseType" class="w-50">
        <el-select
          placeholder="核验方式"
          v-model="form.courseType"
          clearable
          filterable
          class="select-type"
          :disabled="form.contentType === 4"
        >
          <el-option
            v-for="(item, index) in courseTypeList"
            :key="index"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="完成凭证" prop="" class="w-50">
        <KeenFileUpload
          ref="upload"
          v-model="form.contentList"
          directory="knowledge"
          :limit="10"
          :multiple="true"
          class="file-upload"
          @success="formRef.clearValidate('contentList')"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="!isDisabledForm">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { studyMethodList, taskTypeList, courseTypeList as originCourseTypeList, contentTypeList } from '../../config';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const title = ref('');
  const courseTypeList = ref([...originCourseTypeList]);


  const formRef = ref(null);
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
    deptId: [{ required: true, message: '请选择所属部门', trigger: ['blur', 'change'] }],
    labelType: [{ required: true, message: '请选择标签类型', trigger: ['blur', 'change'] }],
    courseLabelCodeList: [
      { required: true, message: '请选择职责标签', trigger: ['blur', 'change'] },
    ],
    taskType: [{ required: true, message: '请选择任务类型', trigger: ['blur', 'change'] }],
    contentType: [{ required: true, message: '请选择课程获取方式', trigger: ['blur', 'change'] }],
    contentList: [{ required: true, message: '请选择课程内容', trigger: ['blur', 'change'] }],
    content: [{ required: true, message: '请输入课程内容', trigger: ['blur', 'change'] }],
    studyMethod: [{ required: true, message: '请选择学习方式', trigger: ['blur', 'change'] }],
    courseType: [{ required: true, message: '请选择核验方式', trigger: ['blur', 'change'] }],
    endTime: [{ required: true, message: '请选择截止时间', trigger: ['blur', 'change'] }],
  });

  const handleContentTypeChange = (val) => {
    if ([1, 3, 4].includes(+val) || !val) {
      form.value.content = undefined;
    } else if (+val === 2) {
      form.value.contentList = [];
    }
  };

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      const params = cloneDeep(form.value);
      if (+form.value.contentType === 2) {
        params.contentList = params.contentList.map((item) => {
          return {
            fileKey: item.ossKey,
            fileName: item.name,
          };
        });
      } else {
        params.contentList = [{ content: params.content }];
      }
      delete params.content;
      saveLoading.value = true;
      visible.value = false;
      emit('success', params);
    } finally {
      saveLoading.value = false;
    }
  };

  const isDisabledForm = ref(false);
  const isEditForm = ref(false);
  const initialContentType = ref('');
  const isShoukeCourse = computed(() => {
    return isEditForm.value && form.value.contentType === 4 && initialContentType.value === 4;
  });
  const open = async (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      isEditForm.value = true;
      initialContentType.value = +row.contentType;
      form.value = cloneDeep(row);
      if (+row.contentType === 2) {
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
      title.value = '编辑学习内容';
      isEditForm.value = true;
    } else {
      isEditForm.value = false;
      title.value = '新增学习内容';
    }
  };
  const applyFilter = () => {
    courseTypeList.value = originCourseTypeList.filter((item) => item.value !== 1);
  };
  watch(
    () => form.value.contentType,
    (newVal, oldVal) => {
      if (newVal === 4) {
        form.value.courseType = 1;
        courseTypeList.value = originCourseTypeList;
      } else {
        applyFilter();
        if (oldVal === 4) {
          form.value.courseType = undefined;
        }
      }
    },
  );

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .w-50 {
    width: 50%;
  }
</style>
