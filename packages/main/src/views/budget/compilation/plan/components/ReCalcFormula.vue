<template>
  <el-dialog
    :title="`刷新公式：${row?.templateName}`"
    fullscreen
    :model-value="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    class="re-calc-formula-dialog"
    @close="close"
  >
    <div class="mb-3">
      <el-space>
        <el-button type="primary" :disabled="doingCalc" @click="onReCalc">
          {{ doingCalc ? '刷新中' : '刷新公式' }}
        </el-button>
        <el-button type="primary" text @click="isShowProcess = !isShowProcess">
          进度：
          {{
            currentCalcTaskList.filter(
              (x) => x.status === CalcStatus.成功 || x.status === CalcStatus.失败
            ).length
          }}/{{ currentCalcTaskList.length }}
          <template v-if="currentCalcTaskList.some((x) => x.status === CalcStatus.成功)">
            ，成功：{{ currentCalcTaskList.filter((x) => x.status === CalcStatus.成功).length }}
          </template>
          <template v-if="currentCalcTaskList.some((x) => x.status === CalcStatus.失败)">
            ，失败：
            <span style="color: red">
              {{ currentCalcTaskList.filter((x) => x.status === CalcStatus.失败).length }}
            </span>
          </template>
          <i class="iconfont icon-jiantouxiangxia"></i>
        </el-button>
      </el-space>
    </div>
    <div class="mb-3" v-if="isShowProcess">
      <h3>当前刷新任务：</h3>
      <vxe-table :data="allCalcTasks || []" border ref="taskTableRef">
        <vxe-column type="checkbox" width="40" />
        <vxe-column field="templateName" title="表单名称">
          <template #default="{ row }">
            {{ row.row.name }}
          </template>
        </vxe-column>
        <vxe-column field="creator" title="执行人">
          <template #default="{ row }">
            {{ row.row.executorName }}
          </template>
        </vxe-column>
        <vxe-column field="code" title="code">
          <template #default="{ row }">
            {{ row.row.code }}
          </template>
        </vxe-column>
        <vxe-column field="状态" title="状态">
          <template #default="{ row }">
            {{ row.row?.presentationDrafts?.[row.row?.nowStepCode - 1]?.draftStatusDesc }}
          </template>
        </vxe-column>
        <vxe-column field="status" title="刷新结果">
          <template #default="{ row }">
            <el-tag v-if="row.status === CalcStatus.未开始" type="info">未开始</el-tag>
            <el-tag v-if="row.status === CalcStatus.成功" type="success">
              刷新成功({{ row.totalCount }}行)
            </el-tag>
            <el-tag v-if="row.status === CalcStatus.失败" type="danger">刷新失败</el-tag>
            <el-tag v-if="row.status === CalcStatus.进行中" type="warning">
              进行中（{{ row.currentRowIndex }}/{{ row.totalCount }}）
            </el-tag>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <div class="mb-3">
      <h3 v-if="isShowProcess">刷新记录</h3>
      <vxe-table :data="recordList" border :expand-config="{ trigger: 'cell' }">
        <vxe-column type="expand" width="40">
          <template #content="{ row }">
            <div style="margin: 10px 20px 10px 30px; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1)">
              <vxe-table :data="row.children" border>
                <vxe-column field="templateName" title="表单名称">
                  <template #default="{ row }">
                    {{ row.row.name }}
                  </template>
                </vxe-column>
                <vxe-column field="creator" title="执行人">
                  <template #default="{ row }">
                    {{ row.row.executorName }}
                  </template>
                </vxe-column>
                <vxe-column field="code" title="code">
                  <template #default="{ row }">
                    {{ row.row.code }}
                  </template>
                </vxe-column>
                <vxe-column field="状态" title="状态">
                  <template #default="{ row }">
                    {{ row.row?.presentationDrafts?.[row.row?.nowStepCode - 1]?.draftStatusDesc }}
                  </template>
                </vxe-column>
                <vxe-column field="status" title="刷新结果">
                  <template #default="{ row }">
                    <el-tag v-if="row.status === CalcStatus.未开始" type="info">未开始</el-tag>
                    <el-tag v-if="row.status === CalcStatus.成功" type="success">刷新成功</el-tag>
                    <el-tag v-if="row.status === CalcStatus.失败" type="danger">刷新失败</el-tag>
                    <el-tag v-if="row.status === CalcStatus.进行中" type="warning">进行中</el-tag>
                  </template>
                </vxe-column>
              </vxe-table>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="templateName" title="表单名称" />
        <vxe-column field="creator" title="刷新人" />
        <vxe-column field="createTime" title="刷新时间" />
        <vxe-column field="status" title="刷新结果">
          <template #default="{ row }">
            <el-tag v-if="row.status === 0" type="danger">刷新失败</el-tag>
            <el-tag v-if="row.status === 1" type="success">刷新成功</el-tag>
            <el-tag v-if="row.status === 2" type="warning">刷新中</el-tag>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { budgetApi } from '@/api';
  import {
    BudgetGroup,
    BudgetSource,
    DraftStatusNo,
    NowStepCode,
  } from '@/views/budget/enums/enums';
  import { updateFormulaSilence } from '@/views/budget/budgetTable/script';
  import { ElMessage } from 'element-plus';
  import { isLocalhost } from '@/views/budget/budgetTable/script/variable';
  import { sleep } from '@/views/budget/budgetTable/util/util';

  enum CalcStatus {
    未开始 = 0,
    进行中 = 1,
    成功 = 2,
    失败 = 3,
  }

  const taskTableRef = ref(null);

  const row = ref(null);

  const recordList = ref([]);
  const allCalcTasks = ref([]);
  const currentCalcTaskList = ref([]);
  const doingCalc = ref(false);
  const isShowProcess = ref(false);

  const getRecordList = async () => {
    const recordResult = await budgetApi.financeBudgetSchemeRefreshLogQueryList({
      schemeCode: row.value.code,
      pageNum: 1,
      pageSize: 100,
    });
    const { records } = await getAllProgresses();

    recordResult.recordList?.forEach((x) => {
      x.successCodes = (x.successCodes && JSON.parse(x.successCodes)) || [];
      x.failCodes = (x.failCodes && JSON.parse(x.failCodes)) || [];
      x.totalCodes = (x.totalCodes && JSON.parse(x.totalCodes)) || [];
      x.children = x.totalCodes.map((e) => {
        const row = records.find((t) => t.code === e) || {};
        let status = CalcStatus.未开始;
        if (x.successCodes.includes(e)) {
          status = CalcStatus.成功;
        } else if (x.failCodes.includes(e)) {
          status = CalcStatus.失败;
        }
        return {
          status,
          code: e,
          row,
        };
      });
    });

    recordList.value = recordResult.recordList;
  };

  const setStartRecord = async () => {
    const recordId = await budgetApi.financeBudgetSchemeRefreshLogStart({
      schemeCode: row.value.code,
      templateCode: row.value.templateCode,
      totalCodes: currentCalcTaskList.value.map((x) => x.query.code),
      totalNum: currentCalcTaskList.value.length,
    });
    await getRecordList();
    return recordId;
  };

  const setEndRecord = async (recordId, isSuccess, subCode) => {
    await budgetApi.financeBudgetSchemeRefreshLogRefresh({
      id: recordId,
      failCode: isSuccess ? '' : subCode,
      successCode: isSuccess ? subCode : '',
    });
    await getRecordList();
  };

  const getAllProgresses = async () => {
    const res = await budgetApi.financeBudgetPresentationQueryProgressList({
      code: row.value.code,
      requestEntrance: 0,
    });

    const records = [];

    const list = res.recordList;
    const setParent = (item) => {
      records.push(item);
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

    return { list, records };
  };

  const getTaskList = async () => {
    const { records } = await getAllProgresses();

    const needUpdateRecords = records.filter((item) => item.executorName);

    const tasks = needUpdateRecords
      .map((row) => {
        return {
          row,
          currentRowIndex: 0,
          totalCount: 0,
          status: CalcStatus.未开始,
          query: {
            code: row.code, // 预算表编码
            schemeCode: undefined, // 预算方案编码
            planYear: row.planYear,
            nowStepCode: row.nowStepCode, // 当前阶段编码，第几稿
            fromStepCode: NowStepCode.三稿, // 从哪个按钮进入
            status: row?.presentationDrafts[row.nowStepCode - 1]?.draftStatusNo as DraftStatusNo,
            parentStatus: undefined,
            rootStatus: undefined,
            source: BudgetSource.预算方案进度详情,
            budgetGroup: BudgetGroup.非预算组,
            budgetRole: undefined,
          },
        };
      })
      .filter((x) =>
        isLocalhost
          ? true
          : x.query.status === DraftStatusNo.在制 ||
            x.query.status === DraftStatusNo.已上报 ||
            x.query.status === DraftStatusNo.已驳回 ||
            x.query.status === DraftStatusNo.未开始
      );

    if (row.value.canAddLine === 0 && tasks.length) {
      // 对于不可新增行的模板，所有人的数据是共性同一份数据，只需刷新一份即可
      tasks.length = 1;
    }

    // console.log('tasks=', tasks);

    allCalcTasks.value = tasks;
  };

  const onReCalc = async () => {
    const checkedTasks = taskTableRef.value.getCheckboxRecords();
    console.log('checkedTasks=', checkedTasks);
    if (!checkedTasks.length) {
      ElMessage.error('没有勾选表单');
      return;
    }
    if (doingCalc.value) {
      ElMessage.warning('正在刷新中...');
      return;
    }
    currentCalcTaskList.value = checkedTasks;

    checkedTasks.forEach((task) => {
      task.status = CalcStatus.未开始;
    });

    doingCalc.value = true;
    try {
      // 强制刷新后端的枚举缓存，后端的枚举缓存 30min
      ElMessage.success('刷新公式初始化...');
      await budgetApi.financeBudgetPresentationTableRefreshFillEnums();

      const recordId = await setStartRecord();

      for (let i = 0; i < checkedTasks.length; i++) {
        const task = checkedTasks[i];
        try {
          task.status = CalcStatus.进行中;
          await updateFormulaSilence(task.query, async (rowIndex, data, totalCount) => {
            task.currentRowIndex = rowIndex;
            task.totalCount = totalCount;
            if (rowIndex % 50 === 0) {
              await sleep(100);
            }
          });
          task.status = CalcStatus.成功;
          await setEndRecord(recordId, true, task.query.code);
          ElMessage.success(`已处理 (${i + 1}/${checkedTasks.length})`);
        } catch (error) {
          task.status = CalcStatus.失败;
          await setEndRecord(recordId, false, task.query.code);
          ElMessage.error(`已处理 (${i + 1}/${checkedTasks.length})`);
        }
      }
    } catch (error) {}
    doingCalc.value = false;
  };

  const close = () => {
    visible.value = false;
    recordList.value = [];
    allCalcTasks.value = [];
    currentCalcTaskList.value = [];
    row.value = {};
  };
  const visible = ref(false);
  const open = async (_row) => {
    visible.value = true;
    if (doingCalc.value) {
      ElMessage.warning('已显示上一个未完成的任务...');
      return;
    }
    recordList.value = [];
    allCalcTasks.value = [];
    currentCalcTaskList.value = [];

    isShowProcess.value = true;
    // console.log('_row=', _row);
    row.value = _row;
    getRecordList();
    getTaskList();
  };
  defineExpose({ open });
</script>

<style lang="scss">
  .re-calc-formula-dialog {
    display: flex;
    flex-direction: column;
    > .el-dialog__body {
      min-height: 0 !important;
      max-height: calc(100vh - 100px) !important;
      flex: 1;
    }
  }
</style>
