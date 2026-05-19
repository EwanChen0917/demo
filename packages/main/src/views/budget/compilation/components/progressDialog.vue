<template>
  <el-dialog title="进度详情" width="1200px" v-model="visible" @close="close">
    <el-select
      v-model="dispatchStatus"
      clearable
      @change="getDataList"
      placeholder="分发状态"
      class="mb-4 ms-4"
    >
      <el-option
        v-for="item in statusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <div class="actions">
      <el-button class="button me-4 mb-4" type="primary" @click="repulseData">打回</el-button>
      <el-button
        class="button mb-4 me-4"
        type="primary"
        :disabled="nowStepCode !== 1"
        @click="
          setModelRef.open(
            '分发部门',
            schemeCode,
            requestEntrance,
            compilationCode,
            budgetDeptId,
            budgetDeptName,
            templateName
          )
        "
      >
        分发部门
      </el-button>
      <!-- <el-button
        class="button mb-4"
        type="primary"
        v-if="requestEntrance == 1"
        @click="
          setModelRef.open(
            '分发执行人',
            schemeCode,
            requestEntrance,
            compilationCode,
            budgetDeptId,
            budgetDeptName,
            templateName
          )
        "
      >
        分发执行人
      </el-button> -->
      <ExportBtn
        class="button me-4 mb-4"
        :service="budgetApi.financeBudgetPresentationExportProgressList"
        :params="{
          code: requestEntrance == 1 ? compilationCode : schemeCode,
          requestEntrance: requestEntrance,
          distributionStatus: dispatchStatus,
        }"
      >
        导出进度列表
      </ExportBtn>
    </div>
    <el-table
      ref="tableRef"
      :data="listData"
      row-key="code"
      class-name="table-row-dashed"
      :tree-props="{ children: 'childNodes' }"
      @selection-change="handleSelectionChange"
      max-height="65vh"
    >
      <el-table-column
        type="selection"
        width="40"
        :selectable="(row) => row?.dispatchStatusDesc === '分发成功'"
      />
      <el-table-column label="预算表编码" prop="code" min-width="210px" />
      <el-table-column label="预算表名称" prop="name" min-width="150px" />
      <el-table-column label="预算节点" prop="budgetNode" min-width="110px" />
      <el-table-column label="负责人" prop="managerName">
        <template #default="{ row }">
          <div v-for="name in row.managerName.split(',')" v-if="row.managerName">{{ name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分发人" prop="distributorName" />
      <el-table-column label="分发状态" prop="dispatchStatusDesc" />
      <el-table-column label="分发时间" prop="dispatchTime" min-width="150px" />
      <el-table-column prop="presentationDrafts" label="一稿状态">
        <template #default="{ row }">
          <div
            v-if="
              row?.presentationDrafts[0].draftStatusNo === -1 ||
              row?.presentationDrafts[0].draftStatusNo === 6 ||
              row?.presentationDrafts[1].draftStatusNo === 6 ||
              row?.presentationDrafts[2].draftStatusNo === 6
            "
          >
            {{ row?.presentationDrafts[0].draftStatusDesc }}
          </div>
          <Tag
            class="cursor"
            :color="
              row.nowStepCode == 1 && row?.presentationDrafts[0].draftStatusNo === 0
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
      <el-table-column prop="statusDesc" label="一稿修订版状态" min-width="120px">
        <template #default="{ row }">
          <div
            v-if="
              row?.presentationDrafts[1].draftStatusNo === -1 ||
              row?.presentationDrafts[0].draftStatusNo === 6 ||
              row?.presentationDrafts[1].draftStatusNo === 6 ||
              row?.presentationDrafts[2].draftStatusNo === 6
            "
          >
            {{ row?.presentationDrafts[1].draftStatusDesc }}
          </div>
          <Tag
            :class="{ cursor: row.nowStepCode == 2 }"
            :color="
              row.nowStepCode == 2 && row?.presentationDrafts[1].draftStatusNo === 0
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
      <el-table-column prop="statusDesc" label="终稿状态">
        <template #default="{ row }">
          <div
            v-if="
              row?.presentationDrafts[2].draftStatusNo === -1 ||
              row?.presentationDrafts[0].draftStatusNo === 6 ||
              row?.presentationDrafts[1].draftStatusNo === 6 ||
              row?.presentationDrafts[2].draftStatusNo === 6
            "
          >
            {{ row?.presentationDrafts[2].draftStatusDesc }}
          </div>
          <Tag
            :class="{ cursor: row.nowStepCode == 3 }"
            :color="
              row.nowStepCode == 3 && row?.presentationDrafts[2].draftStatusNo === 0
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
      <el-table-column label="附件" fixed="right" width="55px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '附件',
                key: 'file',
                type: 'primary',
                text: true,
                disabled:
                  row?.presentationDrafts[0].draftStatusNo == 6 ||
                  row?.presentationDrafts[1].draftStatusNo == 6 ||
                  row?.presentationDrafts[2].draftStatusNo == 6,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="150px">
        <template #default="{ row }">
          <!-- row.executorName为空是部门，draftStatusNo=-1无需操作，draftStatusNo=6 已移交 -->
          <!-- 委托负责人 部门数据操作 -->
          <!-- 移交执行人 执行人数据操作 -->
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '移交执行人',
                key: 'move',
                type: 'primary',
                hide: !row.executorName || requestEntrance == 0,
                disabled:
                  row?.presentationDrafts[0].draftStatusNo == -1 ||
                  row?.presentationDrafts[1].draftStatusNo == -1 ||
                  row?.presentationDrafts[2].draftStatusNo == -1 ||
                  row?.presentationDrafts[0].draftStatusNo == 6 ||
                  row?.presentationDrafts[1].draftStatusNo == 6 ||
                  row?.presentationDrafts[2].draftStatusNo == 6,
                text: true,
                row,
              },
              {
                label: '委托负责人',
                key: 'entrust',
                type: 'primary',
                hide: row.executorName,
                disabled:
                  row?.presentationDrafts[0].draftStatusNo == -1 ||
                  row?.presentationDrafts[1].draftStatusNo == -1 ||
                  row?.presentationDrafts[2].draftStatusNo == -1,
                text: true,
                row,
              },
              {
                label: '上报日志',
                key: 'report',
                type: 'primary',
                text: true,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <SetModel ref="setModelRef" @success="getDataList" />
    <FileModel ref="fileModelRef" />
    <ReportLog ref="reportLogRef" />
  </el-dialog>
</template>

<script setup lang="ts">
  import { budgetApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import {
    BudgetGroup,
    BudgetRole,
    BudgetSource,
    DraftStatusNo,
    NowStepCode,
  } from '@/views/budget/enums/enums';
  import FileModel from './fileModel.vue';
  import SetModel from './setModel.vue';
  import ReportLog from './reportLog.vue';

  const visible = ref(false);
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
  const statusList = ref([
    { name: '分发成功', value: 0 },
    { name: '取消分发', value: 1 },
  ]);
  const dispatchStatus = ref(''); // 分发状态
  const schemeCode = ref(''); // 预算方案编码
  const compilationCode = ref(''); // 预算表编码
  const requestEntrance = ref('');
  const listData = ref([]);
  const listDataTotal = ref([]);
  const budgetDeptId = ref(''); // 预算分发部门
  const budgetDeptName = ref(''); // 预算分发部门名称
  const nowStepCode = ref(1);
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();
  // 列表
  const getDataList = async () => {
    const res = await budgetApi.financeBudgetPresentationQueryProgressList({
      code: requestEntrance.value == 1 ? compilationCode.value : schemeCode.value, // 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码
      requestEntrance: requestEntrance.value, // 请求入口 0-预算方案 1-预算编制
      distributionStatus: dispatchStatus.value, // 分发状态 0-分发成功 1-取消分发
    });
    const list = res.recordList;
    const setParent = (item) => {
      item.childNodes?.forEach?.((child) => {
        child.parentNode = item;
        child.rootNode = item.rootNode || item;
        setParent(child);
      });
    };
    list.forEach((item) => {
      item.rootNode = item;
      setParent(item);
    });
    listDataTotal.value = list;
    listData.value = list;
  };
  const fileModelRef = ref();
  const reportLogRef = ref();
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'report') {
      reportLogRef.value.open(row);
    }
    if (key === 'file') {
      fileModelRef.value.open('detail', row.code);
    }
    if (key === 'move') {
      setModelRef.value.open(
        '移交执行人',
        schemeCode.value,
        requestEntrance.value,
        row.code,
        row.budgetNodeId,
        budgetDeptName.value,
        row.name
      );
    }
    if (key === 'entrust') {
      setModelRef.value.open(
        '委托负责人',
        schemeCode.value,
        requestEntrance.value,
        row.code,
        row.budgetNodeId,
        row.budgetNode,
        row.name
      );
    }
  };
  const selectedList = ref([]);
  const tableRef = ref();
  // 批量打回
  const repulseData = async () => {
    if (selectedList.value.length) {
      const isConfirmed = await swal.callBackConfirm();
      if (!isConfirmed) return;
      const res = await budgetApi.financeBudgetPresentationRepulse({
        codeList: selectedList.value,
        repulseReason: document.getElementById('callBack_reason').value,
        requestEntrance: requestEntrance.value, // 请求入口 0-预算方案 1-预算编制
      });
      if (res) {
        ElMessage.success('打回成功');
        getDataList();
      }
    } else {
      ElMessage.warning('请先勾选数据');
    }
  };
  const handleSelectionChange = (list) => {
    if (list) {
      selectedList.value = list.map((res) => {
        return res.code;
      });
    } else {
      selectedList.value = [];
    }
  };
  const close = () => {
    visible.value = false;
  };
  const openBudgetCompilationPlatform = async (row, type) => {
    if (row.nowStepCode < type + 1) {
      // 未开始状态不可点击
      return;
    }

    console.log('row=', row);

    router.push({
      name: 'budgetTable',
      query: {
        code: row.code, // 预算表编码
        schemeCode: schemeCode.value, // 预算方案编码
        planYear: row.planYear,
        nowStepCode: row.nowStepCode, // 当前阶段编码，第几稿
        fromStepCode: [NowStepCode.一稿, NowStepCode.二稿, NowStepCode.三稿][type], // 从哪个按钮进入
        status: row?.presentationDrafts[type].draftStatusNo as DraftStatusNo,
        parentStatus:
          requestEntrance.value == 1
            ? (row.parentNode?.presentationDrafts?.[row.parentNode?.nowStepCode - 1]
                ?.draftStatusNo as DraftStatusNo)
            : undefined,
        rootStatus:
          requestEntrance.value == 1
            ? (row.rootNode?.presentationDrafts?.[row.rootNode?.nowStepCode - 1]
                ?.draftStatusNo as DraftStatusNo)
            : undefined,
        source:
          requestEntrance.value == 1
            ? BudgetSource.预算编制管理进度详情
            : BudgetSource.预算方案进度详情,
        budgetGroup: BudgetGroup.非预算组,
        budgetRole:
          requestEntrance.value == 1
            ? row.executorName
              ? BudgetRole.个人
              : BudgetRole.部门
            : undefined,
      },
    });
  };
  const setModelRef = ref();
  const templateName = ref();

  const open = async (nowStepCodeVal, code, type, compilation, deptId, deptName, name) => {
    nowStepCode.value = nowStepCodeVal; // 当前阶段
    schemeCode.value = code;
    requestEntrance.value = type;
    if (compilation) {
      compilationCode.value = compilation;
    }
    if (deptId) {
      budgetDeptId.value = deptId;
    }
    if (deptName) {
      budgetDeptName.value = deptName;
    }
    if (name) {
      templateName.value = name;
    }
    dispatchStatus.value = '';
    getDataList();
    visible.value = true;
  };

  defineExpose({
    open,
  });

  onActivated(() => {
    tableRef.value?.clearSelection();
  });
</script>

<style scoped lang="scss">
  .cursor {
    cursor: pointer;
  }
  .actions {
    padding-left: 1rem;
    padding-top: 1rem;
    background-color: #f5f5f5;
  }
</style>
