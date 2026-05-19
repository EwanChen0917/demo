<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" width="1200">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="120px">
      <div class="d-flex">
        <el-form-item label="所属部门" prop="deptId">
          <el-tree-select
            ref="catTreeSelectRef"
            v-model="form.deptId"
            :data="deptTree"
            filterable
            clearable
            check-strictly
            placeholder="所属部门"
            popper-class="picker-cat-tree-select"
            highlight-current
            class="select-type"
            disabled
          />
        </el-form-item>
        <el-form-item label="标签类型" prop="labelType">
          <el-select
            placeholder="标签类型"
            v-model="form.labelType"
            clearable
            filterable
            class="select-type"
            disabled
          >
            <el-option
              v-for="(item, index) in labelTypeList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职责标签" prop="labelCodeList">
          <el-select
            v-model="form.labelCodeList"
            placeholder="职责标签"
            clearable
            filterable
            collapse-tags
            max-collapse-tags="1"
            multiple
            class="select-type"
            disabled
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
        <el-form-item label="学员名称" prop="traineeCode">
          <DeptMember v-model="form.traineeCode" :disabled="!isReApproval" />
        </el-form-item>
        <el-form-item label="学员标签" prop="employeeType">
          <el-select
            v-model="form.employeeType"
            placeholder="学员标签"
            clearable
            filterable
            class="select-type"
            :disabled="!isReApproval"
          >
            <el-option
              v-for="(item, index) in employeeTypeList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学习截止日期" prop="usageTime">
          <el-date-picker
            v-model="form.usageTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :popper-options="{ placement: 'bottom-start' }"
            :disabled="!isReApproval"
          />
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item label="学员导师" prop="mentorCode">
          <DeptMember v-model="form.mentorCode" :disabled="!isReApproval" />
        </el-form-item>
        <el-form-item label="学员上级" prop="leaderCode">
          <DeptMember v-model="form.leaderCode" :disabled="!isReApproval" />
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item label="任务清单状态" prop="taskStatus">
          <el-select
            v-model="form.taskStatus"
            placeholder="任务清单状态"
            clearable
            filterable
            class="select-type"
            disabled
          >
            <el-option
              v-for="(item, index) in taskStatusList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学习状态" prop="learningStatus">
          <el-select
            v-model="form.learningStatus"
            placeholder="学习状态"
            clearable
            filterable
            class="select-type"
            disabled
          >
            <el-option
              v-for="(item, index) in learningStatusList"
              :key="index"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="d-flex" v-if="isView">
        <el-form-item label="导师评价" prop="mentorEvaluation">
          <el-input
            v-model="form.mentorEvaluation"
            placeholder="导师评价"
            type="textarea"
            :rows="5"
            disabled
          />
        </el-form-item>
        <el-form-item label="HR评价" prop="hrEvaluation">
          <el-input
            v-model="form.hrEvaluation"
            placeholder="HR评价"
            type="textarea"
            :rows="5"
            disabled
          />
        </el-form-item>
      </div>
    </el-form>
    <KeenList>
      <template #buttons>
        <el-button
          type="primary"
          @click="handleAddContent"
          v-if="isConfirmed || isApproval || isReApproval"
        >
          新增学习内容
        </el-button>
      </template>
      <el-table ref="tableRef" :data="taskList">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="任务类型" prop="taskType">
          <template #default="{ row }">
            {{ getColumnDesc(taskTypeList, row.taskType) }}
          </template>
        </el-table-column>
        <el-table-column label="课程内容" prop="content" min-width="120">
          <template #default="{ row }">
            <div
              v-if="[1, 3, 4].includes(+row.contentType)"
              @click="handleContent(row.contentList[0]?.content)"
              :class="[row.contentList[0]?.content?.startsWith('http') ? 'text-hover-primary' : '']"
            >
              <OverflowTooltip :content="row.contentList[0]?.content" :line="1" />
            </div>
            <div v-else>
              <div v-for="(item, index) in row.contentList" :key="index">
                <div class="text-hover-primary" @click="handleDownloadUrl(item)">
                  <OverflowTooltip :content="item?.fileName" :line="1" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程获取方式" prop="contentType">
          <template #default="{ row }">
            {{ getColumnDesc(contentTypeList, row.contentType) }}
          </template>
        </el-table-column>
        <el-table-column label="课程名称" prop="courseName" min-width="120">
          <template #default="{ row }">
            <OverflowTooltip :content="row.courseName" :line="1" />
          </template>
        </el-table-column>
        <el-table-column label="学习方式" prop="studyMethod">
          <template #default="{ row }">
            {{ getColumnDesc(studyMethodList, row.studyMethod) }}
          </template>
        </el-table-column>
        <el-table-column label="核验方式" prop="courseType">
          <template #default="{ row }">
            {{ getColumnDesc(courseTypeList, row.courseType) }}
          </template>
        </el-table-column>
        <el-table-column label="完成凭证" prop="completionCertificate" min-width="120">
          <template #default="{ row }">
            <div v-if="+row.courseType === 2">
              <div v-for="(item, index) in row.uploadFileList" :key="index">
                <div class="text-hover-primary" @click="handleDownloadUrl(item)">
                  <OverflowTooltip :content="item?.fileName" :line="1" />
                </div>
              </div>
            </div>
            <div
              v-else
              @click="handleContent(row.completionCertificate)"
              :class="[row.completionCertificate?.startsWith('http') ? 'text-hover-primary' : '']"
            >
              <OverflowTooltip :content="row.completionCertificate" :line="1" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  row,
                  index: $index,
                  hide: isHideEdit(row),
                },
                {
                  label: '删除',
                  key: 'del',
                  type: 'danger',
                  row,
                  hide: isView || isEdit,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </KeenList>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading" v-if="!isView">
          {{ isApproval ? '发起学习任务' : isEdit ? '提交' : isReApproval ? '再次发起' : '确认' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <EditTaskContentDialog
    ref="editRef"
    :isEnableInterface="!isReApproval"
    @success="handleEditSuc"
  />
</template>

<script setup lang="ts">
    import { knowledgeApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { download } from '@/utils/download';
  import { openWindow } from '@/utils';
  import { computed } from 'vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import {
    studyMethodList,
    courseTypeList,
    taskTypeList,
    contentTypeList,
    taskStatusList,
    learningStatusList,
    labelTypeList,
    employeeTypeList,
  } from '../../config';
  import EditTaskContentDialog from './editTaskContentDialog.vue';
  import dayjs from 'dayjs';
  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const form = ref({});
  const formRef = ref(null);
  const taskList = ref<any[]>([]);

  const rules = reactive({
    deptId: [{ required: true, message: '请选择所属部门', trigger: ['blur', 'change'] }],
    labelType: [{ required: true, message: '请选择标签类型', trigger: ['blur', 'change'] }],
    labelCodeList: [{ required: true, message: '请选择职责标签', trigger: ['blur', 'change'] }],
    lastEndTime: [{ required: true, message: '请选择截止时间', trigger: ['blur', 'change'] }],
    leaderCode: [{ required: true, message: '请选择新人上级', trigger: ['blur', 'change'] }],
    mentorCode: [{ required: true, message: '请选择新人导师', trigger: ['blur', 'change'] }],
    traineeCode: [{ required: true, message: '请选择新人学员', trigger: ['blur', 'change'] }],
    usageTime: [{ required: true, message: '请选择学习截止日期', trigger: ['blur', 'change'] }],
  });

  const isHideEdit = (row) => {
    if (isView.value) return true;
    if (isApproval.value || isConfirmed.value || isReApproval.value) return false;
    return !(
      isEdit.value &&
      form.value.taskStatus === 5 &&
      form.value.learningStatus === 1 &&
      row.courseType === 3
    );
  };

  const getColumnDesc = (list, value) => {
    const data = list.find((item: any) => item.value === value);
    return data?.desc || '';
  };

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList?.map((item) => {
      return {
        value: item.memberCode,
        desc: item.name,
      };
    });
  };
  getOperatorOptions();

  const courseLabelList = ref<any[]>([]);
  const queryCourseLabelList = async () => {
    const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
      labelTypeList: form.value?.labelType,
      deptId: form.value.deptId,
    });
    courseLabelList.value = res.courseLabelList || [];
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

  const save = async () => {
    try {
      saveLoading.value = true;
      if (isApproval.value || isEdit.value) {
        const isValid = await formRef.value?.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        });
        if (!isValid) return;
        form.value.startTime = form.value.usageTime[0] ? form.value.usageTime[0] : undefined;
        form.value.endTime = form.value.usageTime[1] ? form.value.usageTime[1] : undefined;
        await knowledgeApi.luteosKnowledgeApprovalCourseTaskDetail({
          ...form.value,
          taskCode: taskCode.value,
        });
        ElMessage.success(isApproval.value ? '发起任务成功' : '提交成功');
        emit('success');
        visible.value = false;
      } else if (isConfirmed.value) {
        await knowledgeApi.luteosKnowledgeConfirmCourseTask({
          taskCode: taskCode.value,
        });
        ElMessage.success('已确认');
        emit('success');
        visible.value = false;
      } else if (isReApproval.value) {
        const isValid = await formRef.value?.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        });
        if (!isValid) return;
        form.value.startTime = form.value.usageTime[0]
          ? dayjs(form.value.usageTime[0]).format('YYYY-MM-DD')
          : undefined;
        form.value.endTime = form.value.usageTime[1]
          ? dayjs(form.value.usageTime[1]).format('YYYY-MM-DD')
          : undefined;
        await knowledgeApi.luteosKnowledgeApproveCourseTask({
          ...form.value,
          taskDetailList: taskList.value,
        });
        ElMessage.success('再次发起成功');
        emit('success');
        visible.value = false;
      }
    } finally {
      saveLoading.value = false;
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row, index } = item;
    if (key === 'edit') {
      editTaskContent(
        {
          ...row,
          index,
          learningStatus: form.value.learningStatus,
          taskStatus: form.value.taskStatus,
          taskCode: row.taskCode,
          isEdit: isEdit.value,
        },
        row.taskCode
      );
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      if (!isReApproval.value) {
        await knowledgeApi.luteosKnowledgeDeleteCourseTaskDetail({
          courseCode: row.courseCode,
          taskCode: row.taskCode,
        });
        queryTaskInfo();
      } else {
        const i = taskList.value.findIndex((item) => item === row);
        if (i !== -1) taskList.value.splice(i, 1);
      }
    }
  };

  const editRef = ref();
  const editTaskContent = (row) => {
    editRef.value.open(row, form.value.taskCode);
  };

  const handleAddContent = () => {
    editRef.value.open(null, form.value.taskCode);
  };

  const handleEditSuc = async (row) => {
    if (!isReApproval.value) {
      queryTaskInfo();
    } else {
      if (typeof row.index === 'number' && taskList.value[row.index]) {
        taskList.value.splice(row.index, 1, { ...row });
      } else {
        taskList.value.push({ ...row });
      }
    }
  };

  const handleDownloadUrl = (item) => {
    if (item.url) {
      download(item.url, item.fileName);
    }
  };

  const handleContent = (content) => {
    if (content.startsWith('http')) {
      openWindow(content);
    }
  };

  const queryTaskInfo = async () => {
    const apiFunc = isReApproval.value
      ? knowledgeApi.luteosKnowledgeQueryCopyTaskInfo
      : knowledgeApi.luteosKnowledgeQueryCourseTaskInfo;
    const res = await apiFunc({ taskCode: taskCode.value });
    form.value = res.detailInfo || {};
    taskList.value = res.taskDetailList || [];
    form.value.usageTime = [form.value.startTime, form.value.endTime];
    form.value.labelCodeList = form.value.labelBeanList?.map((item) => item.code);
    await queryCourseLabelList();
    formRef.value.clearValidate();
  };
  const operateType = ref('');
  const isApproval = computed(() => {
    return operateType.value === 'approval';
  });
  const isConfirmed = computed(() => {
    return operateType.value === 'confirm';
  });
  const isView = computed(() => {
    return operateType.value === 'view';
  });
  const isEdit = computed(() => {
    return operateType.value === 'edit';
  });
  const isReApproval = computed(() => {
    return operateType.value === 'hr_reapproval';
  });
  const title = computed(() => {
    if (isApproval.value) {
      return '发起';
    }
    if (isReApproval.value) {
      return '再次发起';
    }
    if (isConfirmed.value) {
      return '导师/上级确认';
    }
    if (isView.value) {
      return '查看详情';
    }
    if (isEdit.value) {
      return '编辑';
    }
  });
  const tableRef = ref();
  // 重置表格高度，因为表格高度会被撑开，所以需要重新计算以适应内容
  const resetTableHeight = () => {
    nextTick(() => {
      const el = tableRef.value?.$el || document.querySelector('.el-table');
      if (el?.style?.height) {
        el.style.removeProperty('height');
        tableRef.value?.doLayout?.();
      }
    });
  };
  const taskCode = ref();
  const open = async (row) => {
    visible.value = true;
    operateType.value = row.key;
    taskCode.value = row.taskCode;
    enableWatch.value = false;
    await queryTaskInfo();
    if (isReApproval.value) {
      form.value.traineeCode = '';
      form.value.employeeType = '';
      form.value.mentorCode = '';
      form.value.leaderCode = '';
      form.value.usageTime = [];
      // form.value.deptId = ''
      // form.value.labelType = ''
      // form.value.labelCodeList = []
      setTimeout(() => {
        formRef.value?.clearValidate(['traineeCode', 'mentorCode', 'leaderCode', 'usageTime']);
      }, 0);
    }
    resetTableHeight();
    setTimeout(() => {
      enableWatch.value = true;
    }, 0);
  };
  // 初次监听时需要取消副作用，否则会重复监听
  const enableWatch = ref(false);
  watchEffect(async () => {
    if (!isReApproval.value || !enableWatch.value) return;

    const deptId = form.value.deptId;
    const labelType = form.value.labelType;

    if (deptId && labelType) {
      const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
        deptId,
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
  :deep(.el-table) {
    height: auto !important;
  }
  :deep(.el-select__wrapper) {
    width: 200px;
  }
  .text-hover-primary {
    cursor: pointer;
    color: #3e97ff;
  }
</style>
