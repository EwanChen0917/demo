<template>
  <KeenList>
    <template #search>
      <el-tree-select
        ref="catTreeSelectRef"
        v-model="search.deptId"
        :data="deptTree"
        filterable
        clearable
        check-strictly
        placeholder="所属部门"
        popper-class="picker-cat-tree-select"
        highlight-current
        class="select-type"
        @change="queryCourseLabelList"
      />
      <el-select
        placeholder="标签类型"
        v-model="search.labelType"
        clearable
        filterable
        @change="queryCourseLabelList"
        class="select-type"
      >
        <el-option
          v-for="(item, index) in labelTypeList"
          :key="index"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="search.labelCode"
        placeholder="职责标签"
        clearable
        filterable
        class="select-type"
      >
        <el-option
          v-for="(item, index) in courseLabelList"
          :key="index"
          :label="item.labelName"
          :value="item.code"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="addTask">发起任务</el-button>
      <el-button type="primary" @click="importTask">一键导入</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="所属部门" prop="deptName" />
      <el-table-column label="标签类型" prop="labelTypeDesc" />
      <el-table-column label="职责标签" prop="labelBeanList" min-width="120">
        <template #default="{ row }">
          <div>
            {{
              row.labelBeanList?.length
                ? row.labelBeanList.map((item) => item.labelName).join('、')
                : '--'
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学员名称" prop="traineeName" />
      <el-table-column label="学员标签" prop="employeeTypeDesc" />
      <el-table-column label="学习截止日期" prop="startTime" min-width="180">
        <template #default="{ row }">
          <div>{{ row.startTime }}~{{ row.endTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="学员导师" prop="mentorName" />
      <el-table-column label="学员上级" prop="leaderName" />
      <el-table-column label="任务清单状态" prop="taskStatusDesc" />
      <el-table-column label="学习状态" prop="learningStatusDesc" />
      <el-table-column label="操作" fixed="right" width="100">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="getBtnActions(row)"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <AddTaskDialog ref="addTaskRef" @success="runQuery" />
  <ConfirmTaskDialog ref="confirmTaskRef" @success="runQuery" />
  <RemarkDialog ref="remarkDialogRef" @success="runQuery" />
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="knowledge_course_progress_import"
    title="一键导入"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="knowledgeManageAdminTaskList">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { knowledgeApi, KnowledgeApi, memberApi } from '@/api';
  import { labelTypeList } from '../config';
  import AddTaskDialog from './Modal/addTaskDialog.vue';
  import ConfirmTaskDialog from './Modal/confirmTaskDialog.vue';
  import RemarkDialog from './Modal/remarkDialog.vue';

  const PAGE_SIZE = 10;

  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    KnowledgeApi.LuteosKnowledgeQueryCourseTaskList.RequestQuery,
    KnowledgeApi.LuteosKnowledgeQueryCourseTaskList.ResponseBody
  >({
    searchDefaults: {
      deptId: undefined,
      labelType: undefined,
      labelCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: knowledgeApi.luteosKnowledgeQueryCourseTaskList,
  });

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

  const uploadVisible = ref(false);

  const courseLabelList = ref<any[]>([]);
  const queryCourseLabelList = async () => {
    search.labelCode = undefined;
    const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
      deptId: search.deptId,
      labelTypeList: search.labelType,
    });
    courseLabelList.value = res.courseLabelList || [];
  };
  queryCourseLabelList();

  const getBtnActions = (row) => {
    return row.btnList.map((item) => {
      return {
        label: item.value,
        key: item.key,
        type: 'primary',
        row,
      };
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'hr_remark') {
      row.remark = row.hrEvaluation || '';
      remarkInput(row);
    } else if (key === 'mentor_remark') {
      row.remark = row.mentorEvaluation || '';
      remarkInput(row);
    } else {
      confirmTask({
        key,
        ...row,
      });
    }
  };
  const addTaskRef = ref();
  const addTask = () => {
    addTaskRef.value.open();
  };

  const confirmTaskRef = ref();
  const confirmTask = (row) => {
    confirmTaskRef.value.open(row);
  };

  const remarkDialogRef = ref();
  const remarkInput = (row) => {
    remarkDialogRef.value.open(row);
  };
  const importTask = () => {
    uploadVisible.value = true;
  };
  const batchUpdate = (reload) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };
  const reset = () => {
    resetSearch();
    queryCourseLabelList();
  };
</script>

<style scoped lang="scss">
  .select-type {
    width: 200px;
    margin-right: 10px;
  }
</style>
