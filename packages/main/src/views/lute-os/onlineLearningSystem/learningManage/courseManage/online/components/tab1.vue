<template>
  <el-form :model="form" ref="formRef" style="max-width: 800px" :rules="rules" label-width="140px">
    <el-form-item
      label="标题"
      prop="title"
      :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]"
    >
      <el-input :disabled="mode === 'detail'" v-model="form.title" maxlength="120" />
    </el-form-item>
    <el-form-item
      label="分类"
      prop="categoryCode"
      :rules="[{ required: true, message: '请选择分类', trigger: 'change' }]"
    >
      <el-tree-select
        :disabled="mode === 'detail'"
        clearable
        node-key="categoryCode"
        style="width: 100%"
        v-model="form.categoryCode"
        :data="treeData"
        check-strictly
        :render-after-expand="false"
        placeholder="所属分类"
      />
    </el-form-item>
    <el-form-item label="是否关联讲师" prop="relTeacherFlag">
      <el-switch
        :disabled="mode === 'detail'"
        v-model="form.relTeacherFlag"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>
    <el-form-item
      v-if="form.relTeacherFlag === 1"
      label="关联讲师"
      prop="memberCodeList"
      :rules="[{ required: true, type: 'array', message: '请选择关联讲师', trigger: 'change' }]"
    >
      <DeptMember
        :disabled="mode === 'detail'"
        deptCode="all_dept"
        v-model="form.memberCodeList"
        multiple
        placeholder="选择讲师"
      />
    </el-form-item>
    <el-form-item label="封面图">
      <KeenImageUpload
        :disabled="mode === 'detail'"
        v-model="form.coverUrl"
        directory="learning/course"
        tooltip="上传封面图"
      />
    </el-form-item>
    <el-form-item label="简介">
      <el-input
        :disabled="mode === 'detail'"
        v-model="form.description"
        maxlength="100"
        show-word-limit
        type="textarea"
        :rows="4"
      />
    </el-form-item>
    <el-form-item v-if="mode !== 'detail'">
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { fccApi, studyApi } from '@/api';
  import { ElMessage } from 'element-plus';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const treeData = ref();
  const queryCategoryList = async () => {
    const res = await fccApi.luteosFccCategoryQueryFccCategoryList({ pageNum: 1, pageSize: 1000 });
    const data = res.fileCategoryList;
    deepTree(res.fileCategoryList);
    treeData.value = data;
  };
  const deepTree = (data) => {
    data.forEach((item) => {
      item.children = item.categoryBeanList;
      item.label = item.categoryName;
      item.value = item.categoryCode;
      if (item.categoryBeanList && item.categoryBeanList.length > 0) {
        deepTree(item.categoryBeanList);
      }
    });
  };
  queryCategoryList();
  const form = reactive({
    title: '',
    relTeacherFlag: 0,
    memberCodeList: [],
    coverUrl: '',
    description: '',
    categoryCode: '',
  });
  const origionForm = ref(
    JSON.stringify({
      title: '',
      relTeacherFlag: 0,
      memberCodeList: [],
      coverUrl: '',
      description: '',
      categoryCode: '',
    })
  );
  const rules = reactive({ a: [{ required: true, message: '请输入', trigger: 'blur' }] });
  const formRef = ref();
  const route = useRoute();
  const router = useRouter();
  const submit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params: any = {
        ...form,
      };
      if (route.query.courseCode) {
        params.courseCode = route.query.courseCode;
      }
      const res = await studyApi.luteosStudySaveStudyCourse({ ...params, scene: 'online' });
      if (res) {
        ElMessage.success('保存成功');
        if (props.mode === 'add') {
          router.push({
            name: 'onlineCourse',
          });
        } else {
          initDetailData();
        }
        // if (!route.query.courseCode) {
        //   router.push({
        //     name: 'onlineCourse',
        //   });
        // }
        return true;
      }
      return false;
    }
    return false;
  };
  const initDetailData = async () => {
    const res: any = await studyApi.luteosStudyQueryStudyCourseDetail({
      courseCode: route.query.courseCode as string,
    });
    form.title = res.title;
    form.relTeacherFlag = res.relTeacherFlag;
    form.memberCodeList = res.teacherList.map((item) => item.memberCode);
    form.coverUrl = res.coverUrl;
    form.description = res.description;
    form.categoryCode = res.categoryCode;
    origionForm.value = JSON.stringify(form);
  };
  if (route.query.courseCode) {
    initDetailData();
  }
  const hasChange = () => {
    return origionForm.value !== JSON.stringify(form);
  };
  defineExpose({ hasChange, submit });
</script>

<style scoped lang="scss"></style>
