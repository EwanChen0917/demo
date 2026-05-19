<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" width="1000">
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="120px"
      :disabled="isDisabledForm"
    >
      <div class="d-flex">
        <el-form-item label="部门标签" prop="deptId" class="w-50">
          <el-tree-select
            ref="catTreeSelectRef"
            v-model="form.deptId"
            :data="deptTree"
            filterable
            clearable
            check-strictly
            placeholder="部门标签"
            popper-class="picker-cat-tree-select"
            highlight-current
            class="select-type"
            @change="handleQueryCourseLabelList"
          />
        </el-form-item>
        <el-form-item label="标签类型" prop="labelType" class="w-50">
          <el-select
            placeholder="标签类型"
            v-model="form.labelType"
            clearable
            filterable
            class="select-type"
            @change="handleQueryCourseLabelList"
          >
            <el-option
              v-for="(item, index) in labelTypeList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item label="职责标签" prop="courseLabelCodeList" class="w-50">
          <el-select
            v-model="form.courseLabelCodeList"
            placeholder="职责标签"
            clearable
            filterable
            collapse-tags
            max-collapse-tags="1"
            multiple
            class="select-type"
          >
            <el-option
              v-for="(item, index) in courseLabelList"
              :key="index"
              :label="item.labelName"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
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
      </div>
      <div class="d-flex">
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
        <el-form-item label="学习方式" prop="studyMethod" class="w-50">
          <el-select
            placeholder="学习方式"
            v-model="form.studyMethod"
            clearable
            filterable
            class="select-type"
          >
            <el-option
              v-for="(item, index) in studyMethodList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="d-flex flex-wrap">
        <el-form-item
          label="课程内容"
          :prop="+form.contentType === 2 ? 'contentList' : 'content'"
          :rules="contentRules"
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
          <el-input v-else v-model="form.content" :disabled="isShoukeCourse" />
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName" class="w-50 course-type" v-if="form.contentType === 4">
          <el-input v-model="form.courseName" :disabled="isShoukeCourse" />
        </el-form-item>
        <el-form-item label="核验方式" prop="courseType" class="w-50 course-type">
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
      </div>
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
  import { memberApi, knowledgeApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import {
    labelTypeList,
    studyMethodList,
    taskTypeList,
    courseTypeList as originCourseTypeList,
    contentTypeList,
  } from '../../config';

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
    courseName: undefined,
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
    studyMethod: [{ required: true, message: '请选择学习方式', trigger: ['blur', 'change'] }],
    courseType: [{ required: true, message: '请选择核验方式', trigger: ['blur', 'change'] }],
    courseName: [{ required: true, message: '请输入课程名称', trigger: ['blur', 'change'] }],
  });

  const handleContentTypeChange = (val) => {
    if ([1, 3, 4].includes(+val) || !val) {
      form.value.content = undefined;
    } else if (+val === 2) {
      form.value.contentList = [];
    }
    nextTick(() => {
      formRef.value.clearValidate(['contentType', 'contentList', 'content', 'courseName']);
    });
  };

  const contentRules = computed(() => {
    if (isEditForm.value && +form.value.contentType === 4) {
      return [];
    }
    if (+form.value.contentType === 1) {
      return [
        { required: true, message: '请输入课程内容', trigger: ['blur', 'change'] },
        {
          pattern: /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,6})(\/[^\s]*)?$/,
          message: '链接不正确',
          trigger: ['blur', 'change'],
        },
      ];
    }
    return [{ required: true, message: '请选择课程内容', trigger: ['blur', 'change'] }];
  });

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
      await knowledgeApi.luteosKnowledgeUpdateCourse(params);
      ElMessage.success(`${title.value}成功`);
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };
  const titleMap = {
    add: '新增',
    edit: '编辑',
    view: '查看',
  };

  const isDisabledForm = ref(false);
  const isEditForm = ref(false);
  const initialContentType = ref('');
  const isShoukeCourse = computed(() => {
    return isEditForm.value && form.value.contentType === 4 && initialContentType.value === 4;
  });
  const open = async (row) => {
    visible.value = true;
    title.value = titleMap[row.type];
    isDisabledForm.value = row.type === 'view';
    isEditForm.value = row.type === 'edit';
    formRef.value?.resetFields();
    if (row.courseCode) {
      await queryDetail(row.courseCode);
      initialContentType.value = form.value.contentType;
    } else {
      form.value.courseCode = undefined;
      form.value.courseName = undefined;
      initialContentType.value = undefined;
    }
  };

  const queryDetail = async (courseCode) => {
    const res: any = await knowledgeApi.luteosKnowledgeQueryCourseDetail({
      courseCode,
    });

    form.value.contentList = [];
    form.value.courseCode = res.courseCode;
    form.value.deptId = res.deptId;
    form.value.contentType = res.contentType;
    form.value.courseType = res.courseType;
    form.value.labelType = res.labelType;
    form.value.studyMethod = res.studyMethod;
    form.value.taskType = res.taskType;
    form.value.courseLabelCodeList = res.labelBeanList.map((item) => item.code);
    form.value.taskType = res.taskType;
    form.value.courseName = res.courseName;
    if (+res.contentType === 2) {
      res.contentList?.forEach((item) => {
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
      form.value.content = res.contentList?.length ? res.contentList[0]?.content : undefined;
    }
    queryCourseLabelList();
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();
  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  const handleQueryCourseLabelList = () => {
    form.value.courseLabelCodeList = [];
    queryCourseLabelList();
  };

  const courseLabelList = ref<any[]>([]);
  const queryCourseLabelList = async () => {
    if (!form.value.deptId || !form.value?.labelType) {
      return;
    }
    const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
      deptId: form.value.deptId,
      labelTypeList: form.value.labelType,
    });
    courseLabelList.value = res.courseLabelList || [];
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
  .course-type {
    :deep(.el-form-item__content) {
      align-items: flex-start;
    }
  }
</style>
