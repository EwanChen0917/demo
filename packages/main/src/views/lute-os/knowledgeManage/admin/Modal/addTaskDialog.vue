<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" width="1000">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="120px">
      <div class="d-flex">
        <el-form-item
          label="新人学员"
          prop="traineeCode"
          class="w-50"
          @input="queryCourseLabelList"
        >
          <DeptMember v-model="form.traineeCode" />
        </el-form-item>
        <el-form-item label="新人上级" prop="leaderCode" class="w-50">
          <DeptMember v-model="form.leaderCode" />
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item label="带教导师" prop="mentorCode" class="w-50">
          <DeptMember v-model="form.mentorCode" />
        </el-form-item>
        <el-form-item label="学员标签" prop="employeeType" class="w-50">
          <el-select
            v-model="form.employeeType"
            placeholder="学员标签"
            clearable
            filterable
            class="select-type"
          >
            <el-option
              v-for="(item, index) in employeeTypeList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="d-flex">
        <el-form-item label="标签类型" prop="labelType" class="w-50">
          <el-select
            placeholder="标签类型"
            v-model="form.labelType"
            clearable
            filterable
            class="select-type"
          >
            <el-option
              v-for="(item, index) in labelTypeList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职责标签" prop="labelCodeList" class="w-50">
          <el-select
            v-model="form.labelCodeList"
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
      </div>
      <div class="d-flex">
        <el-form-item label="学习截止日期" prop="usageTime" class="w-50">
          <el-date-picker
            class="w-50"
            v-model="form.usageTime"
            @change="handleDateChange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :popper-options="{ placement: 'bottom-start' }"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <ConfirmTaskListDialog ref="editRef" @success="handleEditSuc" />
</template>

<script setup lang="ts">
  import { knowledgeApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { labelTypeList, employeeTypeList } from '../../config';
  import ConfirmTaskListDialog from './confirmTaskListDialog.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const title = ref('');

  const formRef = ref(null);
  const form = ref({
    employeeType: undefined,
    endTime: undefined,
    labelCodeList: [],
    labelType: undefined,
    leaderCode: undefined,
    mentorCode: undefined,
    startTime: undefined,
    traineeCode: undefined,
  });

  const rules = reactive({
    employeeType: [{ required: true, message: '请选择学员标签', trigger: ['blur', 'change'] }],
    labelType: [{ required: true, message: '请选择标签类型', trigger: ['blur', 'change'] }],
    leaderCode: [{ required: true, message: '请选择新人上级', trigger: ['blur', 'change'] }],
    mentorCode: [{ required: true, message: '请选择新人导师', trigger: ['blur', 'change'] }],
    traineeCode: [{ required: true, message: '请选择新人学员', trigger: ['blur', 'change'] }],
    usageTime: [{ required: true, message: '请选择学习截止日期', trigger: ['blur', 'change'] }],
    labelCodeList: [{ required: true, message: '请选择职责标签', trigger: ['blur', 'change'] }],
  });

  const handleDateChange = (val) => {
    if (val && val.length) {
      form.value.startTime = val[0];
      form.value.endTime = val[1];
    } else {
      form.value.startTime = undefined;
      form.value.endTime = undefined;
    }
  };
  const editRef = ref();

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      editRef.value.open({
        traineeCode: form.value.traineeCode,
        labelCodeList: form.value.labelCodeList,
        taskList: taskList.value,
      });
    } finally {
      saveLoading.value = false;
    }
  };
  const taskList = ref([]);
  const handleEditSuc = async (list) => {
    if (list.length === 0) {
      ElMessage.warning('没有匹配到数据，请新增学习内容');
      return;
    }
    taskList.value = list;
    await knowledgeApi.luteosKnowledgeApproveCourseTask({
      ...form.value,
      taskDetailList: list,
    });
    ElMessage.success('任务发起成功');
    emit('success');
    visible.value = false;
  };

  const open = async () => {
    visible.value = true;
    title.value = '新人任务发起';
    formRef.value?.resetFields();
  };
  const courseLabelList = ref<any[]>([]);
  const queryCourseLabelList = async () => {
    if (!form.value?.labelType || !form.value?.traineeCode) return;
    form.value.labelCodeList = [];
    const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
      labelTypeList: form.value?.labelType,
      traineeCode: form.value?.traineeCode,
    });
    courseLabelList.value = res.courseLabelList || [];
  };
  queryCourseLabelList();
  
  watch([() => form.value.traineeCode, () => form.value.labelType], async ([traineeCode, labelType]) => {
    if (traineeCode && labelType) {
      const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
        traineeCode,
        labelTypeList: labelType,
      });
      courseLabelList.value = res.courseLabelList || [];
    } else {
      form.value.labelCodeList = [];
      courseLabelList.value = [];
    }
  });
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .w-50 {
    width: 50%;
  }
</style>
