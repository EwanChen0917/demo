<template>
  <KeenList :selected-num="0" :selected-list="[]" @resetSearch="reset" @refresh="runQuery">
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="需求标题/需求内容"
        clearable
        style="width: 180px"
      />
    </template>
    <template #filters>
      <DeptMember v-model="search.creator" placeholder="需求提出人" />
      <ProductLineSelect v-model="search.productLine" placeholder="产品品线" clearable filterable />
      <el-select
        id="categorySelectRef"
        ref="categorySelectRef"
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
      <el-select v-model="search.demandType" placeholder="需求类型" clearable>
        <el-option
          v-for="(value, key) in DemandTypeMap"
          :key="key"
          :label="value"
          :value="Number(key)"
        />
      </el-select>
      <el-select v-model="search.demandProperty" placeholder="需求属性" clearable>
        <el-option
          v-for="(value, key) in DemandPropertyMap"
          :key="key"
          :label="value"
          :value="Number(key)"
        />
      </el-select>
      <DeptMember
        v-model="search.demandHandlerList"
        placeholder="需求执行人"
        multiple
        collapse-tags
        max-collapse-tags="1"
        teleported
      />
      <el-select v-model="search.delayFlag" placeholder="是否延期" clearable>
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.demandList"
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

      <el-table-column label="需求执行人" prop="handlerName" width="140" show-overflow-tooltip>
        <template #default="{ row }">
          <div
            style="
              padding-right: 36px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            <template
              v-if="Array.isArray(row.demandHandlerList) && row.demandHandlerList.length > 0"
            >
              <span v-for="(item, index) in row.demandHandlerList" :key="index">
                {{ item.handlerName }}
                <span v-if="index < row.demandHandlerList.length - 1">、</span>
              </span>
            </template>

            <span v-else-if="row.handlerName">{{ row.handlerName }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预计完成时间" prop="planFinishDate" width="150" sortable="custom" />
      <el-table-column
        label="实际完成时间"
        prop="executionFinishTime"
        width="150"
        sortable="custom"
      />
      <el-table-column label="需求状态" prop="status" width="120">
        <template #default="{ row }">
          <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间偏移量" width="120">
        <template #default="{ row }">
          <span v-if="row.timeOffSet > 0" style="color: red">延期{{ row.timeOffSet }}天</span>
          <span v-else-if="row.timeOffSet < 0" style="color: green">
            提前{{ Math.abs(row.timeOffSet) }}天
          </span>
          <span v-else>无偏移0天</span>
        </template>
      </el-table-column>
      <el-table-column label="需求累计耗时" width="120">
        <template #default="{ row }">
          {{ formatDuration(row.totalTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="报告结论"
        prop="reportConclusion"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="用研报告" prop="userResearchFile.name" width="180" fixed="right">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.userResearchFile?.fileName" placement="top-start">
            <a type="primary" :href="row.userResearchFile?.fileUrl" target="_blank">
              {{ row.userResearchFile?.fileName }}
            </a>
          </el-tooltip>
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
  <SurveyFeedback />
</template>

<script lang="ts" setup name="demandSubmitDone">
  import { platformApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { download } from '@/utils/download';
  import {
    AuditStatusColorMap,
    DemandTypeMap,
    DemandPropertyMap,
  } from '@/views/lute-os/demandManage/constant';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { formatDuration } from '@/views/lute-os/demandManage/utils/timeParams';
  import SurveyFeedback from '../components/SurveyFeedback.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const router = useRouter();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);

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
      demandModule: 'user_research',
      menuTag: 'submit_end',
      status: 8,
      keyword: '',
      creator: '',
      skuCode: '',
      productLine: '',
      categoryCode: '',
      demandType: '',
      demandHandlerList: [],
      delayFlag: '',
      demandProperty: '',
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
      query: { from },
    });
  }
  function handleDownloadUrl(row: any) {
    if (row.userResearchFile.url) {
      download(row.userResearchFile.url, row.userResearchFile.fileName);
    }
  }
  const orderFields = [
    { field: 'demand.expect_finish_time', label: 'expectFinishTime' },
    { field: 'demand.create_time', label: 'createTime' },
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
    search.status = 8;
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
  onActivated(() => {
    search.status = 8;
    runQuery();
  });
</script>

<style lang="scss" scoped>
  @import url('@/views/lute-os/demandManage/style.css');
</style>
