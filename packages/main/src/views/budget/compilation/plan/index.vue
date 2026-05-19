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
      <el-select v-model="search.templateCode" clearable placeholder="预算模板">
        <el-option
          v-for="item in templateList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="addPlanDialogRef.open('')">新增</el-button>
      <el-button class="button" type="primary" @click="deleteData">删除</el-button>
      <el-button class="button" type="primary" :loading="saveLoading" @click="reportData">
        上报
      </el-button>
      <el-button class="button" type="primary" @click="changeTime">变更上报时间</el-button>
      <el-button class="button" type="primary" @click="schemePressNoticeData">催办</el-button>
    </template>
    <template #tools-prepend>
      <div v-if="processDataShow" class="text-color">
        《{{ processData.templateName }}》复制方案进度：
        <span>{{ processData.processBar }}%</span>
      </div>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.schemeList"
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
      <el-table-column min-width="175px" prop="code" label="预算方案编码" />
      <el-table-column min-width="160px" prop="name" label="预算方案名称" />
      <el-table-column min-width="140px" prop="budgetPeriod" label="预算期间" />
      <el-table-column min-width="150px" prop="templateName" label="预算模板" />
      <el-table-column min-width="120px" label="权限状态">
        <template #default="{ row }">
          <Tag color="gray" v-if="row.isShare">仅查看</Tag>
          <Tag color="green" v-else>可管理</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" min-width="110px" label="创建时间" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="dispatchTime" label="分发时间" min-width="110px" />
      <el-table-column prop="budgetCycleDesc" label="预算周期" />
      <el-table-column prop="budgetYear" label="预算年度" />
      <el-table-column prop="draftList" label="一稿上报截止时间" min-width="130px">
        <template #default="{ row }">
          <div v-if="row?.draftList">{{ row?.draftList[0].draftDeadline }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="draftList" label="一稿修订版上报截止时间" min-width="170px">
        <template #default="{ row }">
          <div v-if="row?.draftList">{{ row?.draftList[1].draftDeadline }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="draftList" label="终稿上报截止时间" min-width="130px">
        <template #default="{ row }">
          <div v-if="row?.draftList">{{ row?.draftList[2].draftDeadline }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="draftList" label="一稿状态" fixed="right">
        <template #default="{ row }">
          <div v-if="row?.draftList[0].draftStatusNo === -1">
            {{ row?.draftList[0].draftStatus }}
          </div>
          <!--isDispatch 是否已分发(1.已分发 0.未分发) nowStepCode当前阶段-->
          <Tag
            :class="{ cursor: row?.draftList[0].isDispatch == 1 }"
            :color="
              row.nowStepCode == 1 &&
              row?.draftList[0].draftStatusNo === 0 &&
              row?.draftList[0].isDispatch == 1
                ? 'green'
                : statusColorMap[row?.draftList[0].draftStatusNo]
            "
            v-else
            @click="openBudgetCompilationPlatform(row, 0)"
          >
            {{ row?.draftList[0].draftStatus }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="draftList" label="一稿修订版状态" width="115px" fixed="right">
        <template #default="{ row }">
          <div v-if="row?.draftList[1].draftStatusNo === -1">
            {{ row?.draftList[1].draftStatus }}
          </div>
          <Tag
            :class="{ cursor: row.nowStepCode == 2 }"
            :color="
              row.nowStepCode == 2 && row?.draftList[1].draftStatusNo === 0
                ? 'green'
                : statusColorMap[row?.draftList[1].draftStatusNo]
            "
            @click="openBudgetCompilationPlatform(row, 1)"
            v-else
          >
            {{ row?.draftList[1].draftStatus }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="draftList" label="终稿状态" fixed="right">
        <template #default="{ row }">
          <div v-if="row?.draftList[2].draftStatusNo === -1">
            {{ row?.draftList[2].draftStatus }}
          </div>
          <Tag
            :class="{ cursor: row.nowStepCode == 3 }"
            :color="
              row.nowStepCode == 3 && row?.draftList[2].draftStatusNo === 0
                ? 'green'
                : statusColorMap[row?.draftList[2].draftStatusNo]
            "
            @click="openBudgetCompilationPlatform(row, 2)"
            v-else
          >
            {{ row?.draftList[2].draftStatus }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="submitFailReasons" label="校验结果" min-width="110px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '查看校验结果',
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
                label: '刷新公式',
                key: 'reCalcFormula',
                type: 'primary',
                text: true,
                row,
                permissionCode: 'budgetRefreshFormula',
              },
              {
                label: '变更上报时间',
                key: 'changeTime',
                type: 'primary',
                text: true,
                disabled: row.isShare,
                row,
              },
              {
                label: '分发部门',
                key: 'setDepartment',
                type: 'primary',
                text: true,
                disabled: row.isShare,
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
              {
                label: '复制方案',
                key: 'copy',
                type: 'primary',
                disabled: row.isShare || processDataShow,
                text: true,
                row,
              },
            ]"
            @click="handleActions"
          >
            <template #more>
              <el-dropdown placement="left">
                <el-link type="primary" class="link-label">导出</el-link>
                <template #dropdown>
                  <el-dropdown-item @click="onExport(row, 0)">导出 一稿</el-dropdown-item>
                  <el-dropdown-item @click="onExport(row, 1)">导出 一稿修订版</el-dropdown-item>
                  <el-dropdown-item @click="onExport(row, 2)">导出 终稿</el-dropdown-item>
                </template>
              </el-dropdown>
            </template>
          </KeenActions>
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
    <AddPlanDialog ref="addPlanDialogRef" @success="refreshData" />
    <CopyPlanDialog ref="copyPlanDialogRef" @success="queryCopyProcessListData" />
    <EditTimeDialog ref="editTimeDialogRef" @success="refreshData" />
    <SetModel ref="setModelRef" />
    <FileModel ref="fileModelRef" />
    <FailReasonDialog ref="failReasonDialogRef" />
    <failReasonListDialog ref="failReasonListDialogRef" @success="refreshData" />
    <ReCalcFormula ref="reCalcFormulaRef" />
  </KeenList>
</template>

<script lang="ts" setup name="budgetPlan">
  import { budgetApi, BudgetApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import {
    BudgetGroup,
    BudgetSource,
    DraftStatusNo,
    NowStepCode,
  } from '@/views/budget/enums/enums';
  import ReCalcFormula from '@/views/budget/compilation/plan/components/ReCalcFormula.vue';
  import ProgressDialog from '../components/progressDialog.vue';
  import AddPlanDialog from './components/addPlanDialog.vue';
  import CopyPlanDialog from './components/copyPlanDialog.vue';
  import EditTimeDialog from './components/editTimeDialog.vue';
  import SetModel from '../components/setModel.vue';
  import FileModel from '../components/fileModel.vue';
  import FailReasonDialog from '../components/failReasonDialog.vue';
  import failReasonListDialog from '../components/failReasonListDialog.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
  // 无需操作-1 未开始0、在制1、已上报3、已驳回4,上报失败5 待上报6
  const statusColorMap = ref({
    0: 'gray',
    1: 'green',
    3: 'green',
    4: 'red',
    5: 'red',
    6: 'green',
  });
  const templateList = ref([]);
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
    BudgetApi.FinanceBudgetSchemeQueryList.RequestQuery,
    BudgetApi.FinanceBudgetSchemeQueryList.ResponseBody
  >({
    searchDefaults: {
      budgetYear: undefined,
      templateCode: undefined,
      // codes: ['BS2025091519202049195'],
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetSchemeQueryList,
  });
  watch(listData, () => {
    listData.value?.schemeList?.forEach((item) => {
      Reflect.set(item, 'copy', false);
    });
  });
  const progressDialogRef = ref();
  const addPlanDialogRef = ref();
  const copyPlanDialogRef = ref();
  const editTimeDialogRef = ref();
  const fileModelRef = ref();
  const setModelRef = ref();
  const failReasonDialogRef = ref();
  const failReasonListDialogRef = ref();
  const reCalcFormulaRef = ref();
  const copyRow = ref();
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'view') {
      progressDialogRef.value.open(row.nowStepCode, row.code, 0, '', '', '', row.templateName);
    } else if (key === 'changeTime') {
      editTimeDialogRef.value.open([row.code]);
    } else if (key === 'setDepartment') {
      setModelRef.value.open('分发部门', row.code, 0, '', '', '', row.templateName);
    } else if (key === 'share') {
      setModelRef.value.open('数据共享', row.code, 0, '', '', '', row.templateName);
    } else if (key === 'file') {
      fileModelRef.value.open('list', row.code, row.isShare);
    } else if (key === 'submitFailReason') {
      failReasonDialogRef.value.open(row.submitFailReasons);
    } else if (key === 'reCalcFormula') {
      reCalcFormulaRef.value.open(row);
    } else if (key === 'copy') {
      copyRow.value = row;
      copyPlanDialogRef.value.open(row);
    }
  };
  const selectedCodeList = ref([]);
  const selectedIdList = ref([]);
  const tableRef = ref();
  const handleSelectionChange = async (list) => {
    selectedCodeList.value = [];
    selectedIdList.value = [];
    if (list) {
      list.forEach((item) => {
        if (!item.isShare) {
          selectedCodeList.value.push(item.code);
          selectedIdList.value.push(item.id);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
  };

  // 查询复制进度
  const timer = ref(null);
  const processDataShow = ref(false);
  const processData = ref({
    failReason: '',
    finishTime: '',
    newSchemeCode: '',
    oldSchemeCode: '',
    oldSchemeName: '',
    templateName: '',
    processBar: 100,
    startTime: '',
    status: 0,
  });

  const queryCopyProcessList = async () => {
    const res = await budgetApi.financeBudgetSchemeQueryCopyProcessList({});
    if (res.length) {
      processData.value = res[0];
      processDataShow.value = true;
    } else {
      clearInterval(timer.value);
      setTimeout(() => {
        search.pageNum = 1;
        current.value = 1;
        refreshList();
        processDataShow.value = false;
      }, 1000);
    }
  };
  const queryCopyProcessListData = () => {
    queryCopyProcessList();
    timer.value = setInterval(() => {
      queryCopyProcessList();
    }, 10000);
  };
  queryCopyProcessListData();
  // 模版列表
  const getTemplateList = async () => {
    const res = await budgetApi.financeBudgetSchemeTemplateQueryList({});
    templateList.value = res.recordList;
  };
  getTemplateList();
  const refreshData = () => {
    refreshList();
    tableRef.value?.clearSelection();
  };
  const deleteData = async () => {
    if (selectedIdList.value.length) {
      const isConfirmed = await swal.confirm('确认删除吗？');
      if (!isConfirmed) return;
      const res = await budgetApi.financeBudgetSchemeDelete({ schemeIdList: selectedIdList.value });
      if (res) {
        ElMessage.success('删除成功');
        refreshList();
      }
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };
  const changeTime = () => {
    if (selectedCodeList.value.length) {
      editTimeDialogRef.value.open(selectedCodeList.value);
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };
  const saveLoading = ref(false);
  const reportData = async () => {
    if (selectedCodeList.value.length) {
      saveLoading.value = true;
      const res = await budgetApi
        .financeBudgetPresentationSubmit({
          codeList: selectedCodeList.value,
          requestEntrance: 0, // 请求入口 0-预算方案 1-预算编制 2-预算编制台
        })
        .catch(() => {
          saveLoading.value = false;
        });
      if (res) {
        if (res.length == 0) {
          ElMessage.success('上报成功');
        } else {
          failReasonListDialogRef.value.open(selectedCodeList.value, res, 0);
        }
        refreshData();
      }
      saveLoading.value = false;
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };
  // 催办
  const schemePressNoticeData = async () => {
    if (selectedCodeList.value.length) {
      const isConfirmed = await swal.confirm('是否确认催办？');
      if (!isConfirmed) return;
      const res = await budgetApi.financeBudgetSchemePressNotice(selectedCodeList.value);
      if (res) {
        ElMessage.success('催办成功');
        tableRef.value?.clearSelection();
      }
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };
  const openBudgetCompilationPlatform = async (row, type) => {
    if (row?.draftList[type].isDispatch == 0 || row.nowStepCode < type + 1) {
      // 未开始状态不可点击
      return;
    }
    // 跳转预算制表页面
    router.push({
      name: 'budgetTable',
      query: {
        code: '', // 预算表编码
        schemeCode: row.code, // 预算方案编码
        nowStepCode: row.nowStepCode, // 当前阶段编码，第几稿
        planYear: undefined,
        fromStepCode: [NowStepCode.一稿, NowStepCode.二稿, NowStepCode.三稿][type],
        status: row?.draftList[type].draftStatusNo as DraftStatusNo,
        source: BudgetSource.预算方案,
        budgetGroup: BudgetGroup.预算组,
        budgetRole: undefined,
      },
    });
  };
  const onExport = async (row, type) => {
    // console.log("row=", row)
    try {
      const { code } = row;
      if (code) {
        const res = await budgetApi.financeBudgetPresentationTableDetailExportFileAsync({
          code,
          budgetGroup: BudgetGroup.预算组,
          nowStepCode: type + 1,
          schemeCode: row.code,
          pageNum: 1,
          pageSize: 1e6,
        });
        const isConfirmedSwitch = await swal.confirm({
          title: '导出成功，具体请前往下载中心查看',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        });
        if (isConfirmedSwitch) {
          router.push({
            path: '/downloadmanage',
            query: {
              app_code: res?.appCode,
              module_code: res?.moduleCode,
              record_type: 2,
            },
          });
        }
      } else {
        ElMessage.error('导出失败');
      }
    } catch (e) {
      ElMessage.error('导出失败');
    }
  };
</script>

<style scoped lang="scss">
  .cursor {
    cursor: pointer;
  }
  .text-color {
    color: var(--el-color-primary);
    span {
      font-weight: bold;
    }
  }
</style>
