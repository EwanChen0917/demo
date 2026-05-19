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
        placeholder="部门标签"
        popper-class="picker-cat-tree-select"
        highlight-current
        class="select-type"
        @change="queryCourseLabelList"
      />
      <el-select
        placeholder="标签类型"
        v-model="search.labelTypeList"
        clearable
        filterable
        multiple
        collapse-tags
        max-collapse-tags="1"
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
        v-model="search.labelCodeList"
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
          :value="item.labelCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="editLabel({})">新增</el-button>
      <el-button type="primary" @click="importTemplate">导入</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.courseLabelList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="部门标签" prop="deptName" />
      <el-table-column label="标签类型" prop="labelTpeDesc" />
      <el-table-column label="职责标签" prop="labelName" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="更新时间" prop="createTime" />
      <el-table-column label="操作" fixed="right" width="150">
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
                label: '查看日志',
                key: 'viewLog',
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
  <EditLabelDialog ref="editLabelRef" @success="handleEditLabelSuc" />
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="knowledge_course_label_import"
    title="导入"
    @close="batchUpdate"
  />
  <ImportLogModal
    v-if="logVisible"
    :visible="logVisible"
    title="查看日志"
    :logList="logList"
    @close="closeLog"
    :code="code"
  />
</template>

<script setup lang="ts" name="knowledgeManageAdminCourseLabel">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { knowledgeApi, KnowledgeApi, memberApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { labelTypeList } from '../config';
  import EditLabelDialog from './Modal/editLabelDialog.vue';
  import ImportLogModal from './Modal/importLogModal.vue';
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
    KnowledgeApi.LuteosKnowledgeQueryCourseLabelList.RequestQuery,
    KnowledgeApi.LuteosKnowledgeQueryCourseLabelList.ResponseBody
  >({
    searchDefaults: {
      deptId: undefined,
      labelTypeList: undefined,
      labelCodeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: knowledgeApi.luteosKnowledgeQueryCourseLabelList,
  });

  const deptTreeData = ref([]);
  const logList = ref([]);
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

  const courseLabelList = ref<any[]>([]);
  const queryCourseLabelList = async () => {
    search.labelCodeList = [];
    const res = await knowledgeApi.luteosKnowledgeQuerySelectLabelList({
      deptId: search.deptId,
      labelTypeList: search.labelTypeList?.length ? search.labelTypeList.join(',') : undefined,
    });
    courseLabelList.value = res.courseLabelList || [];
  };
  queryCourseLabelList();
  const code = ref('');
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editLabel(row);
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await knowledgeApi.luteosKnowledgeDeleteLabel({
        code: row.code,
      });
      ElMessage.success('删除成功');
      runQuery();
    } else if (key === 'viewLog') {
      await queryLog(1, 20, row.code);
      code.value = row.code;
      logVisible.value = true;
    }
  };
  const editLabelRef = ref();
  const editLabel = (row) => {
    editLabelRef.value.open(row);
  };

  const handleEditLabelSuc = () => {
    runQuery();
    queryCourseLabelList();
  };

  const reset = () => {
    resetSearch();
    queryCourseLabelList();
  };

  const importTemplate = () => {
    uploadVisible.value = true;
  };

  const uploadVisible = ref(false);
  const logVisible = ref(false);
  const queryLog = async (page, size, code) => {
    const res = await knowledgeApi.luteosKnowledgeQueryLog({
      pageNum: page,
      pageSize: size,
      code: code,
    });
    logList.value = res.logList;
  };
  const batchUpdate = async (reload) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };

  const closeLog = () => {
    logVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .select-type {
    width: 200px;
    margin-right: 10px;
  }
</style>
