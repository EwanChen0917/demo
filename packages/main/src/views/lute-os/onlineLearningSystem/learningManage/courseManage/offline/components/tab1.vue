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
      label="培训时间"
      prop="startTime"
      :rules="[{ required: true, message: '请选择培训时间', trigger: 'change' }]"
    >
      <el-date-picker
        :disabled="mode === 'detail'"
        v-model="time"
        type="datetimerange"
        range-separator="-"
        start-placeholder="培训开始时间"
        end-placeholder="培训结束时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="
          (t) => {
            form.startTime = t ? t[0] : '';
            form.endTime = t ? t[1] : '';
          }
        "
      />
    </el-form-item>
    <el-form-item
      label="培训地点"
      prop="address"
      :rules="[{ required: true, message: '请输入培训地点', trigger: 'blur' }]"
    >
      <el-input :disabled="mode === 'detail'" v-model="form.address" />
    </el-form-item>
    <el-form-item
      label="授课人"
      prop="memberType"
      :rules="[{ required: true, message: '请选择授课人类型', trigger: 'change' }]"
    >
      <el-radio-group v-model="form.memberType" :disabled="mode === 'detail'">
        <el-radio :label="1">内部讲师</el-radio>
        <el-radio :label="2">外部讲师</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="form.memberType === 1"
      label="内部讲师"
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
    <el-form-item
      v-else
      label="外部讲师"
      prop="lecturer"
      :rules="[{ required: true, message: '请输入外部讲师', trigger: 'change' }]"
    >
      <el-input
        :disabled="mode === 'detail'"
        v-model="form.lecturer"
        placeholder="请输入外部讲师姓名"
        maxlength="30"
      />
    </el-form-item>
    <el-form-item
      label="报名时间"
      prop="signStartTime"
      :rules="[{ required: true, message: '请选择报名时间', trigger: 'change' }]"
    >
      <el-date-picker
        :disabled="mode === 'detail'"
        v-model="time2"
        type="datetimerange"
        range-separator="-"
        start-placeholder="报名开始时间"
        end-placeholder="报名结束时间"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="
          (t) => {
            form.signStartTime = t ? t[0] : '';
            form.signEndTime = t ? t[1] : '';
          }
        "
      />
    </el-form-item>
    <el-form-item
      label="分类"
      prop="categoryCode"
      :rules="[{ required: false, message: '请选择分类', trigger: 'change' }]"
    >
      <el-tree-select
        clearable
        :disabled="mode === 'detail'"
        node-key="categoryCode"
        style="width: 100%"
        v-model="form.categoryCode"
        :data="treeData"
        check-strictly
        :render-after-expand="false"
        placeholder="所属分类"
      />
    </el-form-item>
    <!-- <el-form-item
      label="公开报名"
      prop="sign"
      :rules="[{ required: true, message: '请选择分类', trigger: 'change' }]"
    >
      <el-switch v-model="form.sign" :active-value="true" :inactive-value="false" />
    </el-form-item> -->

    <!-- <el-form-item
      label="公开报名人数"
      prop="signLimit"
      :rules="[{ required: true, message: '请选择分类', trigger: 'change' }]"
    >
      <NumberInput v-model="form.signLimit" :precision="0" :min="1" :max="9999" />
    </el-form-item> -->
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
  const time = ref<any[]>([]);
  const time2 = ref<any[]>([]);
  const form = reactive({
    title: '',
    address: '',
    startTime: '',
    endTime: '',
    memberType: 1,
    lecturer: '',
    memberCodeList: [],
    coverUrl: '',
    description: '',
    categoryCode: '',
    signStartTime: '',
    signEndTime: '',
  });
  const origionForm = ref(
    JSON.stringify({
      title: '',
      address: '',
      startTime: '',
      endTime: '',
      memberType: 1,
      lecturer: '',
      memberCodeList: [],
      coverUrl: '',
      description: '',
      categoryCode: '',
      signStartTime: '',
      signEndTime: '',
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
      const res = await studyApi.luteosStudySaveStudyCourse({ ...params, scene: 'offline' });
      if (res) {
        ElMessage.success('保存成功');
        if (props.mode === 'add') {
          router.push({
            name: 'offlineCourse',
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
    form.memberCodeList = res.teacherList.map((item) => item.memberCode);
    form.coverUrl = res.coverUrl;
    form.description = res.description;
    form.categoryCode = res.categoryCode;
    form.address = res.address;
    form.startTime = res.startTime;
    form.endTime = res.endTime;
    time.value = [res.startTime, res.endTime];
    form.memberType = res.memberType;
    form.lecturer = res.lecturer;
    form.signStartTime = res.signStartTime;
    form.signEndTime = res.signEndTime;
    time2.value = [res.signStartTime, res.signEndTime];
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
