<template>
  <KeenList @reset-search="reset" @clear-all="reset" @refresh="refreshList">
    <template #search>
      <el-input v-model="search.keyword" placeholder="标题" clearable style="width: 160px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <DeptMember
        style="width: 120px"
        id="handlerSelectRef"
        ref="handlerSelectRef"
        v-model="search.creator"
        placeholder="创建人"
        v-if="!props.creator"
      />
      <DeptMember
        style="width: 120px"
        id="executorSelectRef"
        ref="executorSelectRef"
        v-model="search.handler"
        placeholder="执行者"
        v-if="!props.handler"
      />
      <DeptMember
        style="width: 180px"
        id="confirmationSelectRef"
        ref="confirmationSelectRef"
        v-model="search.acceptor"
        placeholder="任务完成确认人"
      />
      <el-select
        v-if="isLeader"
        placeholder="任务归属"
        style="width: 130px"
        v-model="search.teamFlag"
        clearable
      >
        <el-option :value="0" label="个人任务" />
        <el-option :value="1" label="部门任务" />
      </el-select>
      <el-select
        v-if="isLeader"
        placeholder="任务范围"
        style="width: 130px"
        v-model="taskScope"
        clearable
        @change="
          (val) => {
            search.createFlag = val === 1 ? 1 : 0;
            search.handleFlag = val === 2 ? 1 : 0;
          }
        "
      >
        <el-option :value="1" label="本部门创建" />
        <el-option :value="2" label="本部门执行" />
      </el-select>
      <el-select style="width: 130px" v-model="search.status" placeholder="任务状态" clearable>
        <el-option v-for="(val, key) in statusMap" :key="key" :label="val" :value="parseInt(key)" />
      </el-select>
      <el-select
        style="width: 130px"
        v-model="search.taskCategoryCode"
        placeholder="任务类别"
        clearable
      >
        <el-option
          v-for="item in categoryOptions"
          :value="item.taskCategoryCode"
          :label="item.taskCategoryName"
          :key="item.taskCategoryCode"
        />
      </el-select>
      <el-select style="width: 120px" v-model="search.source" placeholder="任务来源" clearable>
        <el-option :value="1" label="日常反馈" />
        <el-option :value="2" label="重点会议" />
        <el-option :value="3" label="CEO指示" />
      </el-select>
      <el-date-picker
        style="width: 250px"
        v-model="search.createTime"
        type="daterange"
        range-separator="-"
        start-placeholder="创建时间"
        end-placeholder="创建时间"
        value-format="YYYY-MM-DD"
      />
      <el-date-picker
        style="width: 250px"
        v-model="search.closeTime"
        type="daterange"
        range-separator="-"
        start-placeholder="关闭时间"
        end-placeholder="关闭时间"
        value-format="YYYY-MM-DD"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="open" style="margin-right: 10px">创建任务</el-button>
      <el-tooltip
        content="点击下载图标即可下载所选任务；点击导出任务可按照筛选条件导出任务"
        placement="bottom"
      >
        <div class="d-flex" style="margin: 0; padding-right: 12px">
          <!-- 左侧按钮 -->
          <el-button
            color="#002f66"
            @click="handleDownload"
            style="
              border-radius: 5px 0 0 5px;
              border-right: none;
              padding: 0 14px;
              width: 40px;
              display: flex;
              align-items: center;
              margin-right: -1px;
            "
          >
            <el-icon>
              <Download />
            </el-icon>
          </el-button>
          <!-- 右侧主按钮 -->
          <el-button
            type="primary"
            @click="exportDialogRef?.open()"
            style="border-radius: 0 5px 5px 0; border-left: none; margin: 0"
          >
            导出任务
          </el-button>
        </div>
      </el-tooltip>
    </template>
    <template #default>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.taskList"
        row-key="taskCode"
        class-name="table-row-dashed"
        :tree-props="{
          children: 'childTaskList',
        }"
        :expand-row-keys="expandRowKeys"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" min-width="50" header-align="center" align="center" />
        <!--      <el-table-column type="expand" />-->
        <el-table-column label="任务状态" prop="statusDesc" min-width="160">
          <template #default="{ row }">
            <StatusSelectTag
              v-if="['1', '2'].includes(row?.status)"
              v-model="row.status"
              @change="(val) => handleChangeStatus(val, row)"
            >
              {{ row?.statusDesc }}
            </StatusSelectTag>
            <StatusTag :status="row?.status" v-else>
              {{ row?.statusDesc }}
            </StatusTag>
          </template>
        </el-table-column>
        <el-table-column label="任务标题" prop="name" min-width="180" fixed="left">
          <template #default="{ row }">
            <a
              href="javascript:void(0);"
              @click="handleTaskTitleClick(row)"
              style="color: #3e97ff; text-decoration: none; cursor: pointer"
            >
              <OverflowTooltip :content="row?.name" :line="2" />
            </a>
          </template>
        </el-table-column>
        <el-table-column label="任务详情" prop="detail" min-width="160">
          <template #default="{ row }">
            <OverflowTooltip :content="row?.detail" :line="2" />
          </template>
        </el-table-column>
        <el-table-column label="截止时间" prop="endTime" min-width="120" />
        <el-table-column label="创建人" prop="creatorName" min-width="120">
          <template #default="{ row }">
            <el-space>
              <el-avatar :size="22" :src="row?.creatorAvatar" />
              <span>{{ row?.creatorName }}</span>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="执行者" prop="handlerName" min-width="120">
          <template #default="{ row }">
            <el-space>
              <el-avatar :size="22" :src="row?.handlerAvatar" />
              <span>{{ row?.handlerName }}</span>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="任务完成确认人" prop="acceptorName" min-width="120">
          <template #default="{ row }">
            <el-space>
              <el-avatar :size="22" :src="row?.acceptorAvatar" />
              <span>{{ row?.acceptorName }}</span>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="任务类别" prop="taskCategoryName" min-width="120" />
        <el-table-column label="任务来源" prop="sourceDesc" />
        <el-table-column label="里程碑" prop="milestoneList" min-width="280">
          <template #default="{ row }">
            <OverflowTooltip
              :content="formatTooltip(row.milestoneList)"
              placement="top-start"
              popper-class="milestone-tooltip"
            >
              <div class="milestone-cell">
                <template v-for="(item, i) in row.milestoneList" :key="i">
                  <div class="milestone-line">
                    <span class="time">{{ item.nodeTime }}</span>
                    <span class="text" :title="item.content">{{ item.content }}</span>
                  </div>
                </template>
              </div>
            </OverflowTooltip>
          </template>
        </el-table-column>

        <el-table-column label="进展简述" prop="currWeekReviewDesc" min-width="250">
          <template #default="{ row }">
            <div class="d-flex gap-3 w-100 align-items-center">
              <div class="flex-shrink-0" style="min-width: 84px">
                <div>{{ row?.reviewStartDate }}</div>
                <div>{{ row?.reviewEndDate }}</div>
              </div>
              <OverflowTooltip className="w-100" :content="row.currWeekReviewDesc" :line="2" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="本周进展" prop="latestReview" min-width="250">
          <template #default="{ row }">
            <!--          <OverflowTooltip :content="row?.latestReview" :line="2" />-->
            <div class="d-flex gap-3 w-100 align-items-center">
              <div class="flex-shrink-0" style="min-width: 84px">
                <div>{{ row?.reviewStartDate }}</div>
                <div>{{ row?.reviewEndDate }}</div>
              </div>
              <OverflowTooltip className="w-100" :content="row.latestReview" :line="2" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="下周计划" prop="planReview" min-width="250">
          <template #default="{ row }">
            <!--          <OverflowTooltip :content="row?.planReview" :line="2" />-->
            <div class="d-flex gap-3 w-100 align-items-center">
              <div class="flex-shrink-0" style="min-width: 84px">
                <div>{{ row?.reviewStartDate }}</div>
                <div>{{ row?.reviewEndDate }}</div>
              </div>
              <OverflowTooltip className="w-100" :content="row.planReview" :line="2" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="交付物" prop="deliverable" min-width="120">
          <template #default="{ row }">
            <!-- <EllipsisExpandable :text="row?.deliverable" :line-clamp="2" /> -->
            <OverflowTooltip :content="row?.deliverable" :line="2" />
          </template>
        </el-table-column>
        <el-table-column label="交付物链接" prop="deliverableUrl" min-width="160">
          <template #default="{ row }">
            <div style="max-width: 150px">
              <a
                :href="row?.deliverableUrl"
                target="_blank"
                style="color: #3e97ff; text-decoration: none; cursor: pointer"
              >
                <OverflowTooltip :content="row?.deliverableUrl" :line="1" />
              </a>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="120" />
        <el-table-column label="关闭时间" prop="closeTime" min-width="120" />
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '关注',
                  key: 'follow',
                  type: 'primary',
                  permissionCode: '',
                  hide: row?.followFlag,
                  row,
                },
                {
                  label: '完成',
                  key: 'complete',
                  type: 'primary',
                  permissionCode: '',
                  hide: row?.status == 6,
                  row,
                },
                {
                  label: '取关',
                  key: 'unfollow',
                  type: 'primary',
                  permissionCode: '',
                  hide: !row?.followFlag,
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
    </template>
  </KeenList>

  <CreateDialog
    ref="createDialogRef"
    @success="refreshList"
    @update-category="getCategoryOptions"
  />
  <ExportDialog ref="exportDialogRef" />
</template>

<script setup lang="ts">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { memberApi, PlatformApi, platformApi } from '@/api';
  import CreateDialog from '@/views/lute-os/taskManage/components/createDialog.vue';
  import { useStore } from '@/store/modules/useStore';
  import ExportDialog from '@/views/lute-os/taskManage/components/exportDialog.vue';
  import StatusTag from '@/views/lute-os/taskManage/components/statusTag.vue';
  import StatusSelectTag from '@/views/lute-os/taskManage/components/statusSelectTag.vue';
  import { omit } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';

  const props = defineProps<{
    status?: number;
    creator?: boolean;
    handler?: boolean;
    all?: boolean;
    isLeader?: boolean;
    followFlag?: boolean;
    joinHandlerFlag?: boolean;
  }>();

  const statusMap = {
    0: '未开始',
    1: '进行中未延期',
    2: '预计延期',
    3: '延期一周',
    4: '延期1~2周',
    5: '延期两周以上',
    6: '已关闭',
  };

  const colorMap = {
    0: 'blue',
    1: 'green',
    2: 'yellow',
    3: 'red',
    4: 'red',
    5: 'red',
    6: 'gray',
  };

  const router = useRouter();
  const createDialogRef = ref();
  const exportDialogRef = ref();
  const { userInfo } = useStore();

  const taskScope = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref();
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
    refreshList,
    runQuery,
    resetSearch,
  } = useList<PlatformApi.PlatformTaskList.RequestQuery, PlatformApi.PlatformTaskList.ResponseBody>(
    {
      searchDefaults: {
        keyword: undefined,
        creator: props.creator ? userInfo.memberCode : undefined,
        handler: props.handler ? userInfo.memberCode : undefined,
        handlerName: props.executor ? userInfo.memberCode : undefined,
        acceptor: props.acceptor ? userInfo.memberCode : undefined,
        joinHandlerFlag: props.joinHandlerFlag ? 1 : 0,
        followFlag: props.followFlag ? 1 : 0,
        status: props.status ?? undefined,
        source: undefined,
        createTime: undefined,
        closeTime: undefined,
        createFlag: undefined,
        handleFlag: undefined,
        teamFlag: undefined,
        taskCategoryCode: undefined,
      },
      // eslint-disable-next-line no-shadow
      interceptSearchData: (searchData) => {
        const { createTime, closeTime } = searchData;
        return {
          ...omit(searchData, 'createTime', 'closeTime'),
          startDate: createTime ? createTime[0] : undefined,
          endDate: createTime ? createTime[1] : undefined,
          closeStartDate: closeTime ? closeTime[0] : undefined,
          closeEndDate: closeTime ? closeTime[1] : undefined,
        };
      },
      pageSize: PAGE_SIZE,
      service: platformApi.platformTaskList,
    }
  );
  const categoryOptions = ref<any[]>([]);
  const getCategoryOptions = async () => {
    const res = await platformApi.platformTaskGetTaskCategoryList();
    categoryOptions.value = res.taskCategoryList || [];
  };
  getCategoryOptions();
  const editingRowKey = ref('');
  const handleChangeStatus = async (val, row) => {
    await platformApi.platformTaskOperate({
      taskCode: row.taskCode,
      operateType: 'update_status',
      status: val,
    });
    runQuery();
    ElMessage.success('修改成功');
  };

  const formatTooltip = (list) =>
    list.map((i) => `${i.nodeTime || ''}  ${i.content || ''}`).join('\n');
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'follow') {
      const res = await platformApi.platformTaskOperate({
        taskCode: row.taskCode,
        operateType: 'follow',
        type: 1,
      });
      ElMessage.success('已关注');
      refreshList();
    } else if (key === 'unfollow') {
      const res = await platformApi.platformTaskOperate({
        taskCode: row.taskCode,
        operateType: 'follow',
        type: 0,
      });
      ElMessage.success('已取关');
      refreshList();
    } else if (key === 'complete') {
      const isConfirmed = await swal.confirm('确认完成任务吗？');
      if (!isConfirmed) return;
      await platformApi.platformTaskOperate({
        taskCode: row.taskCode,
        operateType: 'approve_finish',
        type: null,
      });
      ElMessage.success('完成任务成功');
      refreshList();
    }
  };
  const handleTaskTitleClick = (row) => {
    router.push({
      path: '/taskManage/detail',
      query: {
        taskCode: row.taskCode,
      },
    });
  };
  watch(
    () => props.status,
    (val) => {
      search.status = val;
    }
  );
  onMounted(() => {
    runQuery();
  });

  const open = () => {
    // createDialogRef.value?.open();
    router.push({
      path: '/taskManage/create',
    });
  };
  const handleDownload = async () => {
    if (allSelectedTaskCodes.value.size === 0) {
      ElMessage.warning('请勾选任务后再进行下载');
      return;
    }
    // 进行批量下载
    const res = await platformApi.platformTaskExport({
      taskCodeList: Array.from(allSelectedTaskCodes.value),
    });
    await nextTick();
    const path = router.resolve({
      path: '/downloadmanage',
      query: {
        module_code: res?.moduleCode,
        record_type: 2,
      },
    });
    openWindow(path.href);
  };
  const expandRowKeys = ref([]);
  watch(listData, () => {
    expandRowKeys.value = [];
    if (
      (props.handler || props.all) &&
      listData.value?.taskList &&
      listData.value?.taskList.length > 0
    ) {
      getExpandRowKeys(listData.value?.taskList);
    }
  });

  const getExpandRowKeys = (listData) => {
    expandRowKeys.value = [];
    listData.forEach((item) => {
      if (item.handler === userInfo.memberCode) {
        return;
      }
      if (
        item.childTaskList &&
        item.childTaskList.some((child) => child.handler === userInfo.memberCode)
      ) {
        expandRowKeys.value.push(item.taskCode);
      }
    });
    console.log(expandRowKeys.value, 'expandRowKeys');
  };
  const allSelectedTaskCodes = ref(new Set<string>());

  // 单个勾选/取消
  function handleSelect(_selection, row) {
    const wasSelected = allSelectedTaskCodes.value.has(row.taskCode);
    updateSelection(row, !wasSelected);
  }

  // 全选/取消全选（仅处理当前页所有行）
  function handleSelectAll(selection) {
    (listData.value?.taskList || []).forEach((row) => {
      updateSelection(row, selection.length > 0);
    });
  }
  const reset = () => {
    taskScope.value = undefined;
    resetSearch();
  };
  function updateSelection(row, isSelected) {
    if (isSelected) {
      allSelectedTaskCodes.value.add(row.taskCode);
      if (row.childTaskList) {
        row.childTaskList.forEach((child) => updateSelection(child, true));
      }
    } else {
      allSelectedTaskCodes.value.delete(row.taskCode);
      if (row.childTaskList) {
        row.childTaskList.forEach((child) => updateSelection(child, false));
      }
    }
  }
  // 为何要使用这种方式进行toggleRowSelection
  // 已经确定官方的el-table reserve-selection存在bug，有开发者已经提了pull request，但是没有合并，或许会在未来的某个版本合入
  // 存在的bug就是翻页后，勾选过的子任务状态会无法取消
  // 所以临时使用这种方式进行toggleRowSelection
  watch(
    () => listData.value?.taskList,
    async (rows) => {
      await nextTick();
      const table = tableRef.value;
      if (!table || !rows) return;

      table.clearSelection();

      const selectRows = (list: any[]) => {
        list.forEach((r) => {
          if (allSelectedTaskCodes.value.has(r.taskCode)) {
            table.toggleRowSelection(r, true); // 选中
          }
          r.childTaskList && selectRows(r.childTaskList);
        });
      };
      selectRows(rows);

      const unSelectLeafRows = (list: any[]) => {
        list.forEach((r) => {
          if (r.childTaskList?.length) {
            unSelectLeafRows(r.childTaskList);
          } else if (!allSelectedTaskCodes.value.has(r.taskCode)) {
            table.toggleRowSelection(r, false);
          }
        });
      };
      unSelectLeafRows(rows);
    },
    { deep: true }
  );
</script>

<style scoped lang="scss">
  @use './base.scss';
  .milestone-cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: calc(2 * 22px);
    overflow: hidden;
  }

  .milestone-line {
    display: flex;
    gap: 8px;
  }

  .time {
    flex: 0 0 84px;
  }

  .text {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .more-dot {
    align-self: flex-end;
    color: #999;
  }
  :deep(.content.el-tooltip__trigger.el-tooltip__trigger) {
    // max-width: 480px;
    // max-height: 300px;
    // overflow: auto;
    white-space: pre-line !important;
    // word-break: break-all;
  }
</style>
