<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-date-picker
        v-model="search.budgetYear"
        type="year"
        placeholder="预算年度"
        value-format="YYYY"
        format="YYYY"
      />
      <el-select
        v-model="search.templateCodes"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        multiple
        clearable
        placeholder="预算表名称"
      >
        <el-option
          v-for="item in templateList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <el-tree-select
        multiple
        ref="catTreeSelectRef"
        placeholder="所属部门"
        v-model="search.budgetDeptIds"
        :data="deptTree"
        filterable
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        check-strictly
        popper-class="picker-cat-tree-select"
        highlight-current
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" :loading="saveLoading" @click="reportData">
        上报
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
      row-key="code"
      max-height="75vh"
    >
      <el-table-column
        type="selection"
        width="40"
        reserve-selection
        :selectable="(row) => !row.isShare"
      />
      <el-table-column min-width="175px" prop="code" label="预算表编码" />
      <el-table-column min-width="150px" prop="schemeName" label="方案名称" />
      <el-table-column min-width="150px" prop="name" label="预算表名称" />
      <el-table-column min-width="140px" prop="budgetPeriod" label="预算期间" />
      <el-table-column min-width="120px" label="权限状态">
        <template #default="{ row }">
          <Tag color="gray" v-if="row.isShare">仅查看</Tag>
          <Tag color="green" v-else>可管理</Tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" prop="createTime" label="创建时间" />
      <el-table-column min-width="110px" prop="budgetDeptName" label="所属部门" />
      <el-table-column min-width="70px" label="负责人" prop="managerName">
        <template #default="{ row }">
          <div v-for="name in row.managerName.split(',')" v-if="row.managerName">{{ name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="budgetCycleDesc" label="预算周期" />
      <el-table-column prop="budgetYear" label="预算年度" />
      <el-table-column prop="presentationDrafts" label="一稿上报截止时间" min-width="130px">
        <template #default="{ row }">
          <div v-if="row?.presentationDrafts">{{ row?.presentationDrafts[0].draftDeadline }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="presentationDrafts" label="一稿修订版上报截止时间" min-width="170px">
        <template #default="{ row }">
          <div v-if="row?.presentationDrafts">{{ row?.presentationDrafts[1].draftDeadline }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="presentationDrafts" label="终稿上报截止时间" min-width="130px">
        <template #default="{ row }">
          <div v-if="row?.presentationDrafts">{{ row?.presentationDrafts[2].draftDeadline }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="presentationDrafts" label="一稿状态" fixed="right">
        <template #default="{ row }">
          <div v-if="row?.presentationDrafts[0].draftStatusNo === -1">
            {{ row?.presentationDrafts[0].draftStatusDesc }}
          </div>
          <Tag
            class="cursor"
            :color="
              row.nowStepCode === 1 && row?.presentationDrafts[0].draftStatusNo === 0
                ? 'green'
                : statusColorMap[row?.presentationDrafts[0].draftStatusNo]
            "
            v-else
            @click="openBudgetCompilationPlatform(row, 0)"
          >
            {{ row?.presentationDrafts[0].draftStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="presentationDrafts"
        label="一稿修订版状态"
        min-width="115px"
        fixed="right"
      >
        <template #default="{ row }">
          <div v-if="row?.presentationDrafts[1].draftStatusNo === -1">
            {{ row?.presentationDrafts[1].draftStatusDesc }}
          </div>
          <Tag
            :class="{ cursor: row.nowStepCode == 2 }"
            :color="
              row.nowStepCode === 2 && row?.presentationDrafts[1].draftStatusNo === 0
                ? 'green'
                : statusColorMap[row?.presentationDrafts[1].draftStatusNo]
            "
            @click="openBudgetCompilationPlatform(row, 1)"
            v-else
          >
            {{ row?.presentationDrafts[1].draftStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="presentationDrafts" label="终稿状态" fixed="right">
        <template #default="{ row }">
          <div v-if="row?.presentationDrafts[2].draftStatusNo === -1">
            {{ row?.presentationDrafts[2].draftStatusDesc }}
          </div>
          <Tag
            :class="{ cursor: row.nowStepCode == 3 }"
            :color="
              row.nowStepCode === 3 && row?.presentationDrafts[2].draftStatusNo === 0
                ? 'green'
                : statusColorMap[row?.presentationDrafts[2].draftStatusNo]
            "
            @click="openBudgetCompilationPlatform(row, 2)"
            v-else
          >
            {{ row?.presentationDrafts[2].draftStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="submitFailReasons"
        label="上报失败原因"
        min-width="130px"
        fixed="right"
      >
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '查看上报失败原因',
                key: 'submitFailReason',
                type: 'primary',
                text: true,
                hide: !row?.submitFailReasons || row?.submitFailReasons.length === 0,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
      <el-table-column label="附件" width="60px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '附件',
                key: 'file',
                type: 'primary',
                text: true,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '分发部门',
                key: 'setDepartment',
                type: 'primary',
                text: true,
                disabled: row.isShare,
                row,
              },
              {
                label: '分发执行人',
                key: 'setOperator',
                type: 'primary',
                disabled: row.isShare,
                text: true,
                row,
              },
              {
                label: '进度详情',
                key: 'view',
                type: 'primary',
                disabled: row.isShare,
                text: true,
                row,
              },
              {
                label: '数据共享',
                key: 'share',
                type: 'primary',
                disabled: row.isShare,
                text: true,
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
    <ProgressDialog ref="progressDialogRef" />
    <SetModel ref="setModelRef" />
    <FileModel ref="fileModelRef" />
    <FailReasonDialog ref="failReasonDialogRef" />
    <failReasonListDialog ref="failReasonListDialogRef" />
  </KeenList>
</template>

<script lang="ts" setup name="budgetCompilationManage">
  import { budgetApi, BudgetApi, memberApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import { ElMessage, ElNotification } from 'element-plus';
  import * as swal from '@/utils/swal';
  import {
    BudgetGroup,
    BudgetSource,
    DraftStatusNo,
    NowStepCode,
  } from '@/views/budget/enums/enums';
  import ProgressDialog from '../components/progressDialog.vue';
  import SetModel from '../components/setModel.vue';
  import FileModel from '../components/fileModel.vue';
  import FailReasonDialog from '../components/failReasonDialog.vue';
  import failReasonListDialog from '../components/failReasonListDialog.vue';

  const PAGE_SIZE = 10;
  const router = useRouter();
  // 无需操作-1 未开始0、在制1、已上报3、已驳回4,上报失败5 待上报6
  const statusColorMap = ref({
    0: 'gray',
    1: 'green',
    3: 'green',
    4: 'red',
    5: 'red',
    6: 'green',
  });
  const {
    search,
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    BudgetApi.FinanceBudgetPresentationQueryPresentationList.RequestQuery,
    BudgetApi.FinanceBudgetPresentationQueryPresentationList.ResponseBody
  >({
    searchDefaults: {
      requestEntrance: 1, // 请求入口 1-预算编制 2-预算编制台
      budgetYear: undefined,
      budgetDeptIds: undefined,
      templateCodes: undefined,
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetPresentationQueryPresentationList,
  });
  const progressDialogRef = ref();
  const fileModelRef = ref();
  const setModelRef = ref();
  const failReasonDialogRef = ref();
  const failReasonListDialogRef = ref();
  const templateList = ref([]);
  // 模版列表
  const getTemplateList = async () => {
    const res = await budgetApi.financeBudgetSchemeTemplateQueryList({});
    templateList.value = res.recordList;
  };
  getTemplateList();
  const deptTreeData = ref<any[]>([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: `${item.deptId}`,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'view') {
      // 预算方案编码schemeCode 预算表编码code
      progressDialogRef.value.open(
        row.nowStepCode,
        row.schemeCode,
        1,
        row.code,
        row.budgetDeptId,
        row.budgetDeptName,
        row.name
      );
    } else if (key === 'setDepartment') {
      setModelRef.value.open(
        '分发部门',
        row.schemeCode,
        1,
        row.code,
        row.budgetDeptId,
        row.budgetDeptName,
        row.name
      );
    } else if (key === 'share') {
      setModelRef.value.open('数据共享', row.schemeCode, 1, row.code, '', '', row.name);
    } else if (key === 'setOperator') {
      setModelRef.value.open(
        '分发执行人',
        row.schemeCode,
        1,
        row.code,
        row.budgetDeptId,
        row.budgetDeptName,
        row.name
      );
    } else if (key === 'file') {
      fileModelRef.value.open('list', row.code, row.isShare);
    } else if (key === 'submitFailReason') {
      failReasonDialogRef.value.open(row.submitFailReasons);
    }
  };
  const selectedCodeList = ref([]);
  const tableRef = ref();
  const handleSelectionChange = async (list) => {
    selectedCodeList.value = [];
    if (list) {
      list.forEach((item) => {
        if (!item.isShare) {
          selectedCodeList.value.push(item.code);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
  };
  const saveLoading = ref(false);
  const reportData = async () => {
    if (selectedCodeList.value.length) {
      const isConfirmed = await swal.reportConfirm(
        '预算表单上报后，不可撤销修改。若需修改，仅可由分发人打回。是否确认上报？'
      );
      if (!isConfirmed) return;
      saveLoading.value = true;
      const res = await budgetApi
        .financeBudgetPresentationSubmit({
          codeList: selectedCodeList.value,
          remark: document.getElementById('report_reason').value,
          requestEntrance: 1, // 请求入口 0-预算方案 1-预算编制 2-预算编制台
        })
        .catch(() => {
          saveLoading.value = false;
        });
      console.log('res', res);
      if (res) {
        if (res.length == 0) {
          ElMessage.success('上报成功');
        } else {
          failReasonListDialogRef.value.open(selectedCodeList.value, res, 1);
        }
        refreshList();
        tableRef.value?.clearSelection();
      }
      saveLoading.value = false;
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };
  const openBudgetCompilationPlatform = async (row, type) => {
    if (row.nowStepCode < type + 1) {
      // 未开始状态不可点击
      return;
    }
    openPage(row, type);
  };
  // 跳转预算制表页面
  const openPage = (row, type) => {
    router.push({
      name: 'budgetTable',
      query: {
        code: row.code, // 预算表编码
        schemeCode: row.schemeCode, // 预算方案编码
        nowStepCode: row.nowStepCode, // 当前阶段编码，第几稿
        planYear: undefined,
        fromStepCode: [NowStepCode.一稿, NowStepCode.二稿, NowStepCode.三稿][type],
        status: row?.presentationDrafts[type].draftStatusNo as DraftStatusNo,
        source: BudgetSource.预算编制管理,
        budgetGroup: BudgetGroup.非预算组,
        budgetRole: undefined,
      },
    });
  };
</script>

<style scoped lang="scss">
  .cursor {
    cursor: pointer;
  }
</style>
