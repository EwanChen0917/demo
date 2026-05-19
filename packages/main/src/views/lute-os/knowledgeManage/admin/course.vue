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
      />
      <el-select
        placeholder="标签类型"
        v-model="search.labelType"
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
      <el-select
        placeholder="任务类型"
        v-model="search.taskType"
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
      <el-select
        placeholder="学习方式"
        v-model="search.studyMethod"
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
      <el-select
        placeholder="核验方式"
        v-model="search.courseType"
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
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <el-button type="primary" @click="editCourse({ type: 'add' })">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.courseBeanList"
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
      <el-table-column label="任务类型" prop="taskTypeDesc" />
      <el-table-column label="课程获取方式" prop="contentTypeDesc" />
      <el-table-column label="课程名称" prop="courseName" min-width="120" />
      <el-table-column label="课程内容" prop="contentType" min-width="120">
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
      <el-table-column label="学习方式" prop="studyMethodDesc" />
      <el-table-column label="核验方式" prop="courseTypeDesc" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" fixed="right" width="100">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'danger',
                row,
              },
              {
                label: '查看详情',
                key: 'view',
                type: 'primary',
                row,
              },
            ]"
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
  <EditCourseDialog ref="editCourseRef" @success="runQuery" />
</template>

<script setup lang="ts" name="knowledgeManageAdminCourse">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { knowledgeApi, KnowledgeApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { download } from '@/utils/download';
  import { labelTypeList, studyMethodList, taskTypeList, courseTypeList } from '../config';
  import EditCourseDialog from './Modal/editCourseDialog.vue';

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
    KnowledgeApi.LuteosKnowledgeQueryCourseLibraryList.RequestQuery,
    KnowledgeApi.LuteosKnowledgeQueryCourseLibraryList.ResponseBody
  >({
    searchDefaults: {
      deptId: undefined,
      courseType: undefined,
      labelType: undefined,
      studyMethod: undefined,
      taskType: undefined,
    },
    pageSize: PAGE_SIZE,
    service: knowledgeApi.luteosKnowledgeQueryCourseLibraryList,
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

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit' || key === 'view') {
      editCourse({
        type: key,
        courseCode: row.courseCode,
      });
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await knowledgeApi.luteosKnowledgeDeleteCourse({
        courseCode: row.courseCode,
      });
      ElMessage.success('删除成功');
      runQuery();
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

  const editCourseRef = ref();
  const editCourse = (row) => {
    editCourseRef.value.open(row);
  };
</script>

<style scoped lang="scss">
  .select-type {
    width: 200px;
    margin-right: 10px;
  }
  .text-hover-primary {
    cursor: pointer;
    color: #3e97ff;
  }
</style>
