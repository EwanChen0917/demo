<template>
  <el-tabs v-model="activeTab" @tab-click="handleTabClick">
    <el-tab-pane
      v-for="tab in tabDisplayList"
      :key="tab.key"
      :label="`${tab.label}（${tabCountMap[tab.key] || 0}）`"
      :name="tab.key"
    />
  </el-tabs>

  <KeenList :selected-num="0" :selected-list="[]" @resetSearch="reset" @refresh="runQuery">
    <template #search>
      <el-input
        v-model="search.brandReq!.keyWord"
        placeholder="需求标题/需求内容"
        clearable
        style="width: 180px"
      />
    </template>
    <template #filters>
      <DeptMember
        style="width: 180px"
        v-model="search.brandReq!.creator"
        placeholder="需求提出人"
      />
      <!-- 推广产品 -->
      <el-select
        v-model="search.brandReq!.productName"
        placeholder="推广产品"
        filterable
        style="width: 180px"
        clearable
      >
        <el-option
          v-for="item in productList"
          :key="item.productCode"
          :label="item.productTitle"
          :value="item.productTitle"
        />
      </el-select>
      <!-- 品牌 -->
      <el-select
        v-model="search.brandReq!.brandCode"
        placeholder="品牌"
        style="width: 180px"
        filterable
        clearable
      >
        <el-option
          v-for="item in brandList"
          :key="item.brandCode"
          :label="item.brandName"
          :value="item.brandCode"
        />
      </el-select>
      <!-- 需求类型 -->
      <el-select
        v-model="search.brandReq!.demandTypeList"
        placeholder="需求类型"
        multiple
        style="width: 180px"
        clearable
      >
        <el-option v-for="(value, key) in DemandTypeMap" :key="key" :label="value" :value="key" />
      </el-select>
      <!-- 合作类型 -->
      <CooperationSelect
        v-model="search.brandReq!.cooperationTypeList"
        placeholder="合作类型"
        style="width: 180px"
        multiple
        clearable
      />
      <!-- 投放国家 -->
      <CountrySelect
        v-model="search.brandReq!.countryCode"
        placeholder="投放国家"
        clearable
        style="width: 180px"
      />
      <!-- 需求创建时间 -->
      <el-date-picker
        v-model="search.brandReq!.createTime"
        value-format="YYYY-MM-DD"
        placeholder="需求创建时间"
        clearable
        style="width: 180px"
      />
      <!-- 期望完成时间 -->
      <el-date-picker
        v-model="search.brandReq!.expectFinishTime"
        value-format="YYYY-MM-DD"
        placeholder="期望完成时间"
        clearable
        style="width: 180px"
      />
      <!-- 预计开始时间 -->
      <el-date-picker
        v-model="search.brandReq!.planStartDate"
        value-format="YYYY-MM-DD"
        placeholder="预计开始时间"
        clearable
        style="width: 180px"
      />
      <!-- 预计结束时间 -->
      <el-date-picker
        v-model="search.brandReq!.planFinishDate"
        value-format="YYYY-MM-DD"
        placeholder="预计结束时间"
        clearable
        style="width: 180px"
      />
      <!-- 实际完成时间 -->
      <el-date-picker
        v-model="search.brandReq!.actualFinishTime"
        value-format="YYYY-MM-DD"
        placeholder="实际完成时间"
        clearable
        style="width: 180px"
      />
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.demandBRList"
      :key="activeTab"
      class-name="table-row-dashed"
      @sort-change="onSortChange"
    >
      <el-table-column label="需求标题" prop="demandTitle" fixed="left" width="200">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.demandTitle" placement="top-start">
            <a @click="goToDetail(row)" type="primary" class="text-ellipsis">
              {{ row.demandTitle }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="需求创建人" prop="creatorName" width="120" />
      <el-table-column label="需求创建时间" prop="createTime" width="150" sortable="custom" />
      <el-table-column label="期望完成时间" prop="expectFinishTime" width="150" sortable="custom">
        <template #default="{ row }">
          {{ row.expectFinishTime || '--' }}
        </template>
      </el-table-column>
      <!-- 推广产品 -->
      <el-table-column
        label="推广产品"
        prop="productNameList"
        width="150"
        class="d-flex flex-wrap gap-2"
      >
        <template #default="{ row }">
          <div
            v-if="row.productNameList && row.productNameList.length"
            class="d-flex flex-wrap gap-2"
          >
            <el-tag v-for="item in row.productNameList" :key="item" type="primary" size="small">
              {{ item }}
            </el-tag>
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <!-- 产品品牌 -->
      <el-table-column
        label="产品品牌"
        prop="brandCodeList"
        width="150"
        class="d-flex flex-wrap gap-2"
      >
        <template #default="{ row }">
          <div v-if="row.brandCodeList && row.brandCodeList.length" class="d-flex flex-wrap gap-2">
            <el-tag v-for="item in row.brandCodeList" :key="item" type="primary" size="small">
              {{ item }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" prop="demandTypeDesc" width="140">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-2 w-100">
            <template v-if="row.demandTypeList && row.demandTypeList.length">
              <el-tag
                v-for="(item, index) in row.demandTypeList"
                :key="item"
                type="primary"
                size="small"
              >
                {{ item.demandTypeDesc || '--' }}
              </el-tag>
            </template>
            <span v-else-if="row.demandTypeDesc">{{ row.demandTypeDesc }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <!-- 合作类型 -->
      <el-table-column label="合作类型" prop="cooperationTypeDesc" width="140">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-2 w-100">
            <template v-if="row.cooperationTypeList && row.cooperationTypeList.length">
              <el-tag
                v-for="(item, index) in row.cooperationTypeList"
                :key="item"
                type="primary"
                size="small"
              >
                {{ item.cooperationTypeDesc || '--' }}
              </el-tag>
            </template>
            <span v-else-if="row.cooperationTypeDesc">{{ row.cooperationTypeDesc }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <!-- 投放国家 -->
      <el-table-column label="投放国家" prop="countryCodeDesc" width="140" />
      <!-- 预估预算 -->
      <el-table-column label="预估预算" prop="estimatedBudget" width="140">
        <template #default="{ row }">
          <OverflowTooltip
            :content="`${row?.estimatedBudget + (' ' + (row.currencyCode || 'USD'))}`"
            :line="1"
          />
        </template>
      </el-table-column>
      <el-table-column label="需求状态" prop="status" width="100">
        <template #default="{ row }">
          <el-tag type="primary">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <!-- 需求附件 -->
      <el-table-column label="需求附件" prop="demandFileList" width="220">
        <template #default="{ row }">
          <div v-if="Array.isArray(row.demandFileList) && row.demandFileList.length">
            <div v-for="file in row.demandFileList" :key="file.fileCode" class="attachment-item">
              <el-tooltip effect="dark" :content="file.fileName" placement="top-start">
                <a
                  href="javascript:void(0);"
                  @click="handleFileClick(file)"
                  class="attachment-link"
                >
                  <el-icon style="vertical-align: middle; margin-right: 4px">
                    <document />
                  </el-icon>
                  <span class="attachment-filename">{{ file.fileName }}</span>
                </a>
              </el-tooltip>
            </div>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <!-- 执行人、执行附件、预计开始时间、预计结束时间、验收通过时间、上线链接 -->
      <el-table-column label="执行人" prop="handlerName" width="120" />
      <el-table-column
        label="执行附件"
        prop="handleFileList"
        width="220"
        v-if="activeTab !== 'executing'"
      >
        <template #default="{ row }">
          <div v-if="Array.isArray(row.handleFileList) && row.handleFileList.length">
            <div v-for="file in row.handleFileList" :key="file.fileCode" class="attachment-item">
              <el-tooltip effect="dark" :content="file.fileName" placement="top-start">
                <a
                  href="javascript:void(0);"
                  @click="handleFileClick(file)"
                  class="attachment-link"
                >
                  <el-icon style="vertical-align: middle; margin-right: 4px">
                    <document />
                  </el-icon>
                  <span class="attachment-filename">{{ file.fileName }}</span>
                </a>
              </el-tooltip>
            </div>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column label="预计开始时间" prop="planStartDate" width="150" />
      <el-table-column label="预计结束时间" prop="planFinishDate" width="150" />
      <el-table-column
        label="验收通过时间"
        prop="acceptancePassTime"
        width="150"
        v-if="activeTab === 'completed'"
      />
      <el-table-column
        label="上线链接"
        prop="onlineLink"
        width="150"
        fixed="right"
        v-if="activeTab !== 'executing'"
      >
        <template #default="{ row }">
          <a :href="row?.onlineLink" target="_blank">
            <OverflowTooltip :content="row?.onlineLink" :line="2" />
          </a>
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

<script lang="ts" setup name="brandDemandMyExecute">
  import { platformApi, productApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { useActiveTab } from '@/views/lute-os/brandDemandMange/composables/useActiveTab';
  import SurveyFeedback from '@/views/lute-os/demandManage/components/SurveyFeedback.vue';
  import CooperationSelect from '@/views/lute-os/brandDemandMange/components/CooperationSelect.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const fullTabDisplayList = [
    { key: 'completed', label: '已完结', countField: 'finishedNum' },
    { key: 'toReceive', label: '待查收', countField: 'waitForReceiptNum' },
    { key: 'executing', label: '执行中', countField: 'executingNum' },
  ];
  const fullTabActivePriority = ['toReceive', 'executing', 'completed'];
  const { activeTab, tabCountMap, tabDisplayList, initActiveTabWithData, fetchTabCounts } =
    useActiveTab(fullTabDisplayList, fullTabActivePriority);

  const router = useRouter();
  // 状态映射关系
  const statusMap = {
    completed: 28, // 已完结
    toReceive: 26, // 待查收
    executing: 23, // 执行中
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
      submitManageFlag: 0,
      demandModule: 'brand_research',
      menuTag: 'execute_mine',
      status: statusMap[activeTab.value],
      orderField: '',
      orderType: '',
      brandReq: {
        categoryCode: '',
        cooperationTypeList: [],
        createEndDate: '',
        createStartDate: '',
        creator: '',
        demandTypeList: [],
        expectFinishEndDate: '',
        expectFinishStartDate: '',
        finishEndDate: '',
        finishStartDate: '',
        keyWord: '',
        countryCode: '',
        planFinishDate: '',
        planStartDate: '',
      },
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformDemandV2List,
  });

  function goToDetail(row: any) {
    router.push({
      path: `/brand/demand/detail/${row.demandCode}`,
      // path: `/brand/demand/dingTalkDetail/${row.demandCode}`,
      query: { from: 'executeMyDemandList', tab: activeTab.value, scene: row.resourceType },
    });
  }
  const requiredFields = [
    { key: 'planStartDate', label: '预计开始时间' },
    { key: 'planFinishDate', label: '预计完成时间' },
    { key: 'reportConclusion', label: '报告结论' },
    { key: 'userResearchFile', label: '用研附件' },
  ];

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
    fetchTabCounts('execute_mine');
    refreshList();
  };
  const handleOnlineLinkClick = (url: string) => {
    window.open(url, '_blank');
  };
  const orderFields = [
    { field: 'demand.create_time', label: 'createTime' },
    { field: 'demand.expect_finish_time', label: 'expectFinishTime' },
    { field: 'ur.planStartDate', label: 'planStartDate' },
    { field: 'ur.plan_finish_date', label: 'planFinishDate' },
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
  const brandList = ref([]);
  const fetchBrandList = async () => {
    const res = await productApi.luteosProductBrandQueryBrandList({
      pageNum: 1,
      pageSize: 1000,
    });
    brandList.value = res.brandBeanList;
  };
  fetchBrandList();
  const reset = () => {
    resetSearch();
    search.status = statusMap[activeTab.value];
  };
  onBeforeRouteLeave((to, from, next) => {
    sessionStorage.setItem(`lastActiveTab_executeMyDemandList`, activeTab.value);
    next();
  });
  onActivated(() => {
    fetchTabCounts('execute_mine');
    const pageKey = 'executeMyDemandList';
    if (sessionStorage.getItem(`backFromDetail_${pageKey}`) === '1') {
      sessionStorage.removeItem(`backFromDetail_${pageKey}`);
      activeTab.value = sessionStorage.getItem(`lastActiveTab_${pageKey}`) || 'completed';
      return;
    } else {
      // activeTab.value = 'completed';
      initActiveTabWithData('execute_mine');
    }
    search.orderField = '';
    search.orderType = '';
  });
  const productList = ref([]);
  const fetchProductList = async () => {
    const res = await platformApi.platformDemandQueryProductCnName();
    productList.value = res.productList;
    console.log(productList.value, 'productList');
  };

  fetchProductList();

  watch(activeTab, (val) => {
    search.status = statusMap[val];
    search.orderField = '';
    search.orderType = '';
    fetchTabCounts('execute_mine');
  });
</script>

<style lang="scss" scoped>
  @use '@/views/lute-os/brandDemandMange/base.scss';
  .attachment-link {
    display: inline-flex;
    align-items: center;
    color: #3e97ff;
    text-decoration: none;
    .attachment-filename {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px; /* 限制文件名宽度 */
    }
  }
</style>
