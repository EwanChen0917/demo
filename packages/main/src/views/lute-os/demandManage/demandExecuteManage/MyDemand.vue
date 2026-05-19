<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="tab in myDemandTabList"
      :key="tab.key"
      :label="`${tab.label}（${tabCountMap[tab.key] || 0}）`"
      :name="tab.key"
    />
  </el-tabs>

  <KeenList :selected-num="0" :selected-list="[]" @resetSearch="reset" @refresh="refreshList">
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="需求标题/需求内容"
        clearable
        style="width: 180px"
      />
    </template>
    <template #filters>
      <DeptMember style="width: 180px" v-model="search.creator" placeholder="需求提出人" />
      <ProductLineSelect
        style="width: 180px"
        v-model="search.productLine"
        placeholder="产品品线"
        clearable
        filterable
      />
      <el-select
        id="categorySelectRef"
        ref="categorySelectRef"
        style="width: 180px"
        v-model="search.categoryCode"
        filterable
        clearable
        placeholder="请选产品分类"
      >
        <el-option
          v-for="item in categoryOptions"
          :value="item.categoryCode"
          :label="item.categoryName"
          :key="item.categoryCode"
        />
      </el-select>
      <el-select v-model="search.demandType" placeholder="需求类型" style="width: 180px" clearable>
        <el-option
          v-for="(value, key) in DemandTypeMap"
          :key="key"
          :label="value"
          :value="Number(key)"
        />
      </el-select>
      <el-select
        v-model="search.demandProperty"
        placeholder="需求属性"
        style="width: 180px"
        clearable
      >
        <el-option
          v-for="(value, key) in DemandPropertyMap"
          :key="key"
          :label="value"
          :value="Number(key)"
        />
      </el-select>
      <el-select
        v-model="search.delayFlag"
        placeholder="是否延期"
        style="width: 180px"
        clearable
        v-if="activeTab !== 'executing' && activeTab !== 'approving' && activeTab !== 'notApproved'"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select
        v-model="search.implementFlag"
        placeholder="是否落地"
        style="width: 180px"
        clearable
        v-if="activeTab !== 'executing' && activeTab !== 'approving' && activeTab !== 'notApproved'"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select
        v-model="search.lowScoreFlag"
        placeholder="是否低于85分"
        style="width: 180px"
        clearable
        v-if="activeTab === 'completed'"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.demandList"
      :key="activeTab"
      class-name="table-row-dashed"
      @sort-change="onSortChange"
      :height="tableHeight"
    >
      <!-- 公共列 -->
      <el-table-column label="需求标题" prop="demandTitle" fixed="left" width="200">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.demandTitle" placement="top-start">
            <a @click="goToDetail(row.demandCode)" type="primary" class="text-ellipsis">
              {{ row.demandTitle }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="需求创建人" prop="creatorName" width="120" />
      <el-table-column label="需求创建时间" prop="createTime" width="150" sortable="custom" />
      <el-table-column label="期望完成时间" prop="expectFinishTime" width="150" sortable="custom" />
      <el-table-column
        label="需求附件"
        width="180"
        prop="demandFile"
        v-if="activeTab !== 'completed'"
      >
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.demandFile?.fileName" placement="top-start">
            <a
              type="primary"
              href="javascript:void(0);"
              @click="handleFileClick(row.demandFile)"
              style="cursor: pointer; color: #3e97ff"
            >
              {{ row.demandFile?.fileName }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- <el-table-column label="产品中文名" prop="productTitle" width="180">
              <template #default="{ row }">
                <el-tooltip effect="dark" :content="row.productTitle" placement="top-start">
                  <span class="text-ellipsis">{{ row.productTitle }}</span>
                </el-tooltip>
              </template>
            </el-table-column> -->
      <el-table-column label="产品品线" prop="productLineDesc" width="150">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.productLineDesc" placement="top-start">
            <span class="text-ellipsis">{{ row.productLineDesc }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="产品定级" prop="productLevel" width="150">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.productLevel" placement="top-start">
            <span class="text-ellipsis">{{ row.productLevel }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="产品分类" prop="categoryDesc" width="220">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.categoryDesc" placement="top-start">
            <span class="text-ellipsis">{{ row.categoryDesc }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" prop="demandTypeDesc" width="140" />
      <el-table-column label="需求属性" prop="demandPropertyDesc" width="140" />
      <el-table-column
        label="预计完成时间"
        prop="planFinishDate"
        width="150"
        sortable="custom"
        v-if="activeTab === 'completed'"
      />
      <el-table-column
        label="实际完成时间"
        prop="executionFinishTime"
        width="150"
        sortable="custom"
        v-if="activeTab === 'completed' || activeTab === 'interAudit'"
      />
      <el-table-column
        label="用研附件"
        prop="userResearchFile.name"
        width="180"
        v-if="activeTab === 'interAudit'"
      >
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.userResearchFile?.fileName" placement="top-start">
            <a
              type="primary"
              href="javascript:void(0);"
              @click="handleFileClick(row.userResearchFile)"
              style="cursor: pointer; color: #3e97ff"
            >
              {{ row.userResearchFile?.fileName }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="需求状态"
        prop="status"
        width="120"
        v-if="activeTab === 'completed' || activeTab === 'interAudit'"
      >
        <template #default="{ row }">
          <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间偏移量" width="120" v-if="activeTab === 'completed'">
        <template #default="{ row }">
          <span v-if="row.timeOffSet > 0" style="color: red">延期{{ row.timeOffSet }}天</span>
          <span v-else-if="row.timeOffSet < 0" style="color: green">
            提前{{ Math.abs(row.timeOffSet) }}天
          </span>
          <span v-else style="color: green">无偏移0天</span>
        </template>
      </el-table-column>
      <el-table-column label="需求累计耗时" width="120" v-if="activeTab === 'completed'">
        <template #default="{ row }">
          {{ formatDuration(row.totalTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="需求方评分"
        prop="score"
        width="120"
        v-if="activeTab === 'completed'"
      />
      <el-table-column
        label="是否落地"
        prop="implementFlag"
        width="120"
        v-if="activeTab === 'completed'"
      >
        <template #default="{ row }">
          <span>{{ row.implementFlag === 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报告结论"
        prop="reportConclusion"
        width="200"
        show-overflow-tooltip
        v-if="activeTab === 'completed'"
      ></el-table-column>
      <el-table-column
        label="用研附件"
        prop="userResearchFile.name"
        width="180"
        fixed="right"
        v-if="activeTab === 'completed'"
      >
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.userResearchFile?.fileName" placement="top-start">
            <a
              type="primary"
              href="javascript:void(0);"
              @click="handleFileClick(row.userResearchFile)"
              style="cursor: pointer; color: #3e97ff"
            >
              {{ row.userResearchFile?.fileName }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <template v-if="['executing', 'notApproved'].includes(activeTab)">
        <el-table-column label="预计完成时间" prop="planFinishDate" width="150" sortable="custom" />
        <el-table-column label="用研附件" prop="userResearchFile.name" width="180">
          <template #default="{ row }">
            <el-tooltip
              effect="dark"
              :content="row.userResearchFile?.fileName"
              placement="top-start"
            >
              <a
                type="primary"
                href="javascript:void(0);"
                @click="handleFileClick(row.userResearchFile)"
                style="cursor: pointer; color: #3e97ff"
              >
                {{ row.userResearchFile?.fileName }}
              </a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="需求状态" prop="status" width="120">
          <template #default="{ row }">
            <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="拒绝原因"
          prop="approveRemark"
          width="150"
          show-overflow-tooltip
          v-if="activeTab === 'notApproved'"
        />
      </template>
      <el-table-column label="操作" fixed="right" v-if="activeTab !== 'completed'" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '提交内审',
                key: 'submitInterAudit',
                hide: row?.status !== 3,
                type: 'danger',
                permissionCode: '',
                row,
              },
              {
                label: '重新提交',
                key: 'resubmitInterAudit',
                hide: row?.status !== 5,
                type: 'danger',
                permissionCode: '',
                row,
              },
              {
                label: '撤回',
                key: 'withdraw',
                hide: row?.status !== 4,
                type: 'danger',
                permissionCode: '',
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
  <ResubmitDialog
    ref="resubmitDialogRef"
    @submit="handleResubmit"
    @modify="handleResubmitModify"
    @cancel="handleResubmitCancel"
    :isInterAudit="isInterAudit"
  />
  <WithdrawDialog v-model:visible="withdrawDialogVisible" @confirm="handleWithdraw" />
  <FilesPreview
    v-if="previewVisible"
    ref="filesPreviewRef"
    :fileUrl="fileUrl"
    :key="fileUrl"
    :fileName="fileName"
    :extType="fileName.split('.').pop()"
    @close="previewVisible = false"
  />
  <SurveyFeedback />
</template>

<script lang="ts" setup name="demandExecuteMyDemand">
  import { platformApi, productApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import {
    AuditStatusMap,
    AuditStatusColorMap,
    DemandTypeMap,
    DemandPropertyMap,
  } from '@/views/lute-os/demandManage/constant';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  import ResubmitDialog from '@/views/lute-os/demandManage/components/common/ResubmitDialog.vue';
  import { myDemandTabList } from '@/views/lute-os/demandManage/composables/useActiveTab';
  import { useActiveTab } from '@/views/lute-os/demandManage/composables/useActiveTab';
  import { formatDuration } from '@/views/lute-os/demandManage/utils/timeParams';
  import { ElMessage } from 'element-plus';
  import WithdrawDialog from '@/views/lute-os/demandManage/components/WithdrawDialog.vue';
  import SurveyFeedback from '@/views/lute-os/demandManage/components/SurveyFeedback.vue';
  // const activeTab = ref('completed');
  const { activeTab, fetchMyDemandTabCounts, tabCountMap } = useActiveTab();
  const router = useRouter();
  const isInterAudit = computed(() => {
    return activeTab.value === 'notApproved';
  });
  // 状态映射关系
  const statusMap = {
    completed: 101, // 已完结
    executing: 3, // 执行中
    notApproved: 5, // 内审未通过
    interAudit: 4, // 内审中
  };
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList({
    searchDefaults: {
      submitManageFlag: 1,
      demandModule: 'user_research',
      menuTag: 'execute_mine',
      creator: '',
      keyword: '',
      skuCode: '',
      productLine: '',
      categoryCode: '',
      demandType: '',
      demandProperty: '',
      handler: '',
      delayFlag: '',
      implementFlag: '',
      lowScoreFlag: '',
      status: statusMap[activeTab.value],
      orderField: '',
      orderType: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformDemandV2List,
  });

  function goToDetail(code: string, from: 'submit' | 'execute' = 'submit') {
    router.push({
      path: `/demand/detail/${code}`,
      // path: `/demandMangeExecute/dingTalkDetail/${code}`,
      query: { from: 'executeMyDemandList', executeDetail: '1', tab: activeTab.value },
    });
  }
  const requiredFields = [
    { key: 'planStartDate', label: '预计开始时间' },
    { key: 'planFinishDate', label: '预计完成时间' },
    { key: 'reportConclusion', label: '报告结论' },
    { key: 'userResearchFile', label: '用研附件' },
  ];

  function validateUserResearch(detail) {
    const missingFields = requiredFields
      .filter((item) => {
        if (item.key === 'userResearchFile') {
          return !detail.userResearch?.userResearchFile; // 只判断对象是否存在
        }
        return !detail.userResearch?.[item.key];
      })
      .map((item) => item.label);

    if (missingFields.length) {
      ElMessage.error(`${missingFields.join('、')}未填写，请填写后再提交`);
      return false;
    }
    return true;
  }

  const withdrawDialogVisible = ref(false);
  const handleActions = async (item: any) => {
    const { key, row } = item;
    currentRow.value = row;
    if (key === 'resubmitInterAudit') {
      resubmitDialogRef.value?.open(row);
    } else if (key === 'submitInterAudit') {
      // router.push({
      //   path: `/demand/detail/${row.demandCode}`,
      //   query: { interaudit: 1, from: 'executeMyDemandList' },
      // });
      // 调用详情接口判断是否存在未填项，若存在则提示，若不存在则调用提交内审接口
      const detail = await platformApi.platformDemandDetail({
        demandCode: row.demandCode,
        demandModule: 'user_research',
      });
      console.log('detail', detail);
      // 校验预计开始时间、预计完成时间、报告结论、用研附件
      if (!validateUserResearch(detail)) return;
      const fileObj = detail.userResearch?.userResearchFile;
      await platformApi.platformDemandInterApprove({
        ...row,
        demandCode: row.demandCode,
        editFlag: 1,
        approveFlag: 1,
        planStartDate: detail.userResearch?.planStartDate,
        planFinishDate: detail.userResearch?.planFinishDate,
        reportConclusion: detail.userResearch?.reportConclusion,
        userResearchFile: fileObj ? fileObj : null,
      });
      ElMessage.success('提交内审成功');
      fetchMyDemandTabCounts('execute_mine');
      refreshList();
    } else if (key === 'withdraw') {
      withdrawDialogVisible.value = true;
    }
  };
  const currentRow = ref<any>({});
  const handleWithdraw = async () => {
    // console.log('撤回', currentRow.value);
    try {
      await platformApi.platformDemandOperate({
        memberCodeList: Array.isArray(currentRow.value.demandHandlerList)
          ? currentRow.value.demandHandlerList.map((item: any) => item.handler)
          : [currentRow.value.handler],
        demandCode: currentRow.value.demandCode,
        operateType: 'demand_cancel',
      });
      ElMessage.success('撤回成功');
      fetchMyDemandTabCounts('execute_mine');
      refreshList();
    } catch (error) {
      console.error('撤回失败', error);
    } finally {
      withdrawDialogVisible.value = false;
    }
  };
  const previewVisible = ref(false);
  const fileUrl = ref('');
  const fileName = ref('');
  function handleFileClick(file) {
    if (!file) return;
    if (file.previewWay === 2) {
      // 跳转外链
      window.open(file.fileUrl, '_blank');
    } else {
      // 内部文件，预览
      fileUrl.value = file.fileUrl;
      fileName.value = file.fileName;
      previewVisible.value = true;
    }
  }
  const resubmitDialogRef = ref();
  const handleResubmit = async (row: any) => {
    const fileObj = row.userResearchFile;
    await platformApi.platformDemandInterApprove({
      ...row,
      demandCode: row.demandCode,
      editFlag: 0,
      approveFlag: 1,
      userResearchFile: fileObj ? fileObj : null,
    });
    resubmitDialogRef.value?.close();
    fetchMyDemandTabCounts('execute_mine');
    refreshList();
  };
  const handleResubmitModify = (row: any) => {
    goToDetail(row.demandCode);
  };
  const handleResubmitCancel = (row: any) => {
    resubmitDialogRef.value?.close();
  };
  const orderFields = [
    { field: 'demand.create_time', label: 'createTime' },
    { field: 'demand.expect_finish_time', label: 'expectFinishTime' },
    { field: 'ur.planStartDate', label: 'planStartDate' },
    { field: 'ur.plan_finish_date', label: 'planFinishDate' },
    { field: 'ur.execution_finish_time', label: 'executionFinishTime' },
  ];
  function onSortChange({ prop, order }) {
    const found = orderFields.find((f) => f.label === prop);
    if (found) {
      search.orderField = found.field;
      search.orderType = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : '';
    } else {
      search.orderField = '';
      search.orderType = '';
    }
  }
  const reset = () => {
    resetSearch();
    search.status = statusMap[activeTab.value];
  };
  const categoryOptions = ref<any[]>([]);
  const categorySelectRef = ref();
  const loading = ref(false);
  const getCategoryData = async () => {
    loading.value = true;
    try {
      const res = await platformApi.platformDemandQueryCategoryTree();
      categoryOptions.value = [
        { categoryCode: '0', categoryName: '新品调研' },
        ...(res.categoryDataList ?? []),
      ];
    } finally {
      loading.value = false;
    }
  };
  onMounted(() => {
    getCategoryData();
  });
  onBeforeRouteLeave((to, from, next) => {
    sessionStorage.setItem(`lastActiveTab_executeMyDemandList`, activeTab.value);
    next();
  });
  onActivated(() => {
    fetchMyDemandTabCounts('execute_mine');
    const pageKey = 'executeMyDemandList';
    if (sessionStorage.getItem(`backFromDetail_${pageKey}`) === '1') {
      sessionStorage.removeItem(`backFromDetail_${pageKey}`);
      activeTab.value = sessionStorage.getItem(`lastActiveTab_${pageKey}`) || 'completed';
      return;
    }
    search.orderField = '';
    search.orderType = '';
    if (from === 'demandStatistics') {
      search.delayFlag = delayFlag ? Number(delayFlag) : undefined;
      search.implementFlag = implementFlag ? Number(implementFlag) : undefined;
      search.lowScoreFlag = scoreFlag ? Number(scoreFlag) : undefined;
      switch (status) {
        case '5':
          activeTab.value = 'notApproved';
          break;
        case '101':
          activeTab.value = 'completed';
          break;
        case '3':
          activeTab.value = 'executing';
          break;
        default:
          activeTab.value = 'completed';
          break;
      }
    } else {
      activeTab.value = 'completed';
    }
  });
  const route = useRoute();
  const { from, delayFlag, implementFlag, status, scoreFlag } = route.query;
  onMounted(() => {
    if (from === 'demandStatistics') {
      search.delayFlag = delayFlag ? Number(delayFlag) : undefined;
      search.implementFlag = implementFlag ? Number(implementFlag) : undefined;
      search.lowScoreFlag = scoreFlag ? Number(scoreFlag) : undefined;
      if (status) {
        switch (status) {
          case '5':
            activeTab.value = 'notApproved';
            break;
          case '101':
            activeTab.value = 'completed';
            break;
          case '3':
            activeTab.value = 'executing';
            break;
          default:
            activeTab.value = 'completed';
            break;
        }
      }
    }
  });
  watch(activeTab, (val) => {
    search.status = statusMap[val];
    search.orderField = '';
    search.orderType = '';
    fetchMyDemandTabCounts('execute_mine');
  });
</script>

<style lang="scss" scoped>
  @import url('@/views/lute-os/demandManage/style.css');

  .tabs {
    margin-bottom: 20px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
