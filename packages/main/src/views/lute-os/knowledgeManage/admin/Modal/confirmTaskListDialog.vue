<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" width="1200">
    <KeenList>
      <template #buttons>
        <el-button type="primary" @click="editTaskContent(null)">新增学习内容</el-button>
      </template>
      <el-table ref="tableRef" :data="taskList">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="任务类型" prop="taskType" min-width="100">
          <template #default="{ row }">
            {{ getColumnDesc(taskTypeList, row.taskType) }}
          </template>
        </el-table-column>
        <el-table-column label="课程获取方式" prop="contentType" min-width="120">
          <template #default="{ row }">
            {{ getColumnDesc(contentTypeList, row.contentType) }}
          </template>
        </el-table-column>
        <el-table-column label="课程名称" prop="courseName" min-width="120">
          <template #default="{ row }">
            <OverflowTooltip :content="row.courseName" :line="1" />
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
                },
                {
                  label: '删除',
                  key: 'del',
                  type: 'danger',
                  row,
                  index: $index,
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
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <EditTaskContentDialog ref="editRef" @success="handleEditSuc" />
</template>

<script setup lang="ts">
    import { knowledgeApi, memberApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { download } from '@/utils/download';
  import { studyMethodList, courseTypeList, taskTypeList, contentTypeList } from '../../config';
  import EditTaskContentDialog from './editTaskContentDialog.vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const title = ref('');
  const taskList = ref<any[]>([]);

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

  const save = async () => {
    try {
      saveLoading.value = true;
      visible.value = false;
      emit('success', taskList.value);
    } finally {
      saveLoading.value = false;
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row, index } = item;
    if (key === 'edit') {
      editTaskContent({
        ...row,
        index,
        courseCode: row.courseCode || new Date().getTime(),
      });
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      const i = taskList.value.findIndex(item => item === row);
      if (i !== -1) taskList.value.splice(i, 1);
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

  const editRef = ref();
  const editTaskContent = (row = null) => {
    editRef.value.open(row);
  };

  const handleEditSuc = (row) => {
    let updated = false;
    if (typeof row.index === 'number' && taskList.value[row.index]) {
      taskList.value.splice(row.index, 1, { ...row });
      updated = true;
    }
    if (!updated && row.courseCode) {
      const idx = taskList.value.findIndex(item => item.courseCode === row.courseCode);
      if (idx !== -1) {
        taskList.value.splice(idx, 1, { ...row });
        updated = true;
      }
    }
    if (!updated) {
      taskList.value.push({ ...row });
    }
  };

  const queryTaskList = async (data) => {
    const res = await knowledgeApi.luteosKnowledgeQueryLabelCourseList({
      ...data,
    });
    taskList.value = res.taskDetailList || [];
  };

  const open = async (data) => {
    visible.value = true;
    title.value = '学习清单';
    taskList.value = data.taskList || [];
    if (!data.taskList?.length) {
      queryTaskList(data);
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .text-hover-primary {
    cursor: pointer;
    color: #3e97ff;
  }
</style>
