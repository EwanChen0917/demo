<template>
  <el-alert
    class="page-upgrade-tip"
    type="info"
    show-icon
    title="舆情3.0工单页面即将升级，当前展示为2.0版本"
  />
  <div class="d-flex justify-content-between align-items-center whitebg">
    <el-tabs v-model="localClassification" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane v-for="item in tabList" :key="item.classification" :name="item.classification">
        <template #label>
          {{ item.classification }}
          <span class="tab-count">({{ item.classificationCount }})</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建时间"
        end-placeholder="创建时间"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
        style="width: 220px"
      />
      <el-select
        v-model="search.status"
        :options="statusList"
        multiple
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="请选择任务状态"
      />
      <el-select
        v-model="search.dataSource"
        :options="sorceTypeList"
        :props ="{label: 'name', value: 'code'}"
        multiple
        filterable
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="请选择来源"
      />
      <el-select
        v-model="search.executor"
        :options="executorList"
        :props="{label: 'name', value: 'memberCode'}"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="请选择执行者"
      >
        <template #option="{ item }">
          <div class="d-flex align-items-center custom-labels">
            <img
              :src="item.avatar || '/src/assets/images/icon/defaultAvatar.png'"
              class="avatar mr-2"
              style="width: 20px; height: 20px; border-radius: 50%"
            />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </el-select>
      <el-select
        v-if="localClassification === TabType['News&SocialMedia']"
        v-model="search.orderLevel"
        :options="orderLevelList"
        multiple
        :props="{ label: 'name', value: 'code' }"
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="问题等级"
      />
      <el-input v-model="search.search" placeholder="搜索帖子内容" style="width: 200px" clearable>
        <template #suffix>
          <Search style="width: 1em; height: 1em; margin-right: 8px" />
        </template>
      </el-input>
    </template>
    <!-- <template #search></template> -->
    <el-table
      class="border-table"
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.opinionDataList || []"
      class-name="table-row-dashed"
      max-height="900px"
      :cell-style="{ verticalAlign: 'top' }"
    >
      <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
      <el-table-column min-width="1000px" label="帖子信息">
        <template #default="{ row }">
          <p class="row-title">
            <el-tooltip popper-style="max-width: 480px;" placement="top" raw-content>
              <template #content>
                <div class="tooltip-scroll-content">{{ row.title }}</div>
              </template>
              <div>{{ row.title }}</div>
            </el-tooltip>
          </p>
          <p class="row-content" @click="handleOpenUrl(row.url)">
            <el-tooltip popper-style="max-width: 480px;" placement="top" raw-content>
              <template #content>
                <div class="tooltip-scroll-content">
                  {{ row.content }}
                </div>
              </template>
              <div>{{ row.content }}</div>
            </el-tooltip>
          </p>
          <p class="row-keywords">
            <span class="row-keywords-title">
              {{ row.classification }}
            </span>
            <span class="row-keywords-item">{{ row.tag }}</span>
          </p>
          <p class="row-bottom">
            <template v-if="localClassification === TabType['News&SocialMedia']">
              <span
                v-if="getDataSourceIconUrl(row.dataSource)"
                class="original-icon ns"
                :style="{
                  backgroundImage: `url(${getDataSourceIconUrl(row.dataSource)})`,
                  backgroundSize: '100% 100%',
                }"
              ></span>
              <i v-else class="Root-tyicon icon-Root-tywangluo ns"></i>
            </template>
            <span>来源：{{ row.dataSource }}</span>
            <template v-if="localClassification === TabType['CustomerService']">
              <span class="divider"></span>
              <span>工单ID：{{ row.ticketId }}</span>
            </template>
            <span class="divider"></span>
            <span>
              <i class="iconfont icon-time"></i>
              {{ row.dataCreateTime }} 创建
            </span>
            <template v-if="localClassification === TabType['News&SocialMedia']">
              <span class="divider"></span>
              <i class="ns Root-tyicon icon-Root-tyxianshimima"></i>
              <span>{{ row.coveredNum }}</span>
              <span class="divider"></span>
              <i class="ns Root-tyicon icon-Root-typinglunduihua"></i>
              <span>{{ row.interactionNum }}</span>
            </template>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        label="问题等级"
        v-if="localClassification === TabType['News&SocialMedia']"
      >
        <template #default="{ row }">
          <el-tag
            :type="row.orderLevel === 0 ? 'danger' : row.orderLevel === 1 ? 'warning' : 'success'"
            size="small"
            effect="plain"
          >
            P{{ row.orderLevel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" label="执行者">
        <template #default="{ row }">
          <div class="column-executor" v-for="item in row.executorBeans" :key="item.jobNumber">
            <img :src="item.avatar || '/src/assets/images/icon/defaultAvatar.png'" class="avatar" />
            <span class="user-name">{{ item.deptName }} - {{ item.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="处理状态">
        <template #default="{ row }">
          <StatusSelect
            v-model="row.status"
            :options="statusList"
            style="width: 120px"
            @change="handleStatusChange($event, row)"
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
</template>

<script lang="ts" setup name="alarmOrder">
  import { Search } from '@element-plus/icons-vue';
  import { useStore } from '@/store/modules/useStore';
  // import { useRouter } from 'vue-router';
  import { statisticalApi, StatisticalApi, StatisticalContracts } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElLoading, ElMessage } from 'element-plus';
  import StatusSelect from './components/StatusSelect/index.vue';

  const store = useStore();
  // const time = ref<any>([]);
  // const router = useRouter();
  const timeType = ref<number>();
  const handleTimeChange = (val) => {
    console.log('handleDateChange', val);
    if (val) {
      search.publishTimeStart = val[0] || '';
      search.publishTimeEnd = val[1] || '';
    } else {
      search.publishTimeStart = undefined;
      search.publishTimeEnd = undefined;
    }
  };

  const route = useRoute();
  const time = ref<string[]>([
    route.query.publishTimeStart as string | undefined,
    route.query.publishTimeEnd as string | undefined,
  ]);
  enum TabType {
    'News&SocialMedia' = '新闻/社媒',
    'CustomerService' = '客服',
  }
  const localClassification = ref<string>(
    (route.query.classification as string) || TabType['News&SocialMedia']
  );
  const orderLevelList = ref<{ code: number; name: string }[]>([
    { code: 0, name: 'P0' },
    { code: 1, name: 'P1' },
    { code: 2, name: 'P2' },
  ]);
  const upStatusColorMap = {
    0: 'orange',
    1: 'yellow',
    2: 'green',
  };

  const PAGE_SIZE = 10;
  const tableRef = ref();
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
    StatisticalApi.LuteosAiAnalyzeOpinionQueryList.RequestBody,
    StatisticalApi.LuteosAiAnalyzeOpinionQueryList.ResponseBody
  >({
    searchDefaults: {
      publishTimeEnd: route.query.publishTimeEnd as string | undefined,
      publishTimeStart: route.query.publishTimeStart as string | undefined,
      status: undefined,
      dataSource: undefined,
      executor: undefined,
      search: undefined,
      orderLevel: undefined,
      classification: '',
    },
    pageSize: PAGE_SIZE,
    serviceManual: true,
    service: async (params) => {
      if (localClassification.value === TabType['News&SocialMedia']) {
        return statisticalApi.luteosAiAnalyzeOpinionQueryJournalismList(params);
      }
      return statisticalApi.luteosAiAnalyzeOpinionQueryList(params);
    },
  });

  const handleTabChange = (val) => {
    tableRef.value?.clearSelection();
    console.log('handleTabChange===> ', val);
    localClassification.value = val;

    search.classification = '';

    // tab 切换时重置到第一页并重新查询
    runQuery(true);
  };

  const getDataSourceIcon = (dataSource: string) => {
    if (!dataSource) return '';

    const lowerDataSource = dataSource.toLowerCase();
    const keywords = ['facebook', 'instagram', 'tiktok', 'twitter', 'youtube'];

    for (const keyword of keywords) {
      if (lowerDataSource.includes(keyword)) {
        return keyword;
      }
    }

    return '';
  };

  // 获取数据源图标 URL
  const getDataSourceIconUrl = (dataSource: string) => {
    const icon = getDataSourceIcon(dataSource);
    if (!icon) return '';

    try {
      return new URL(`./assets/images/icon-${icon}.png`, import.meta.url).href;
    } catch (error) {
      console.error('图标路径错误:', error);
      return '';
    }
  };

  onActivated(() => {
    tableRef.value.clearSelection();
  });

  // 执行者列表
  const executorList = ref<StatisticalContracts.MemberBean[]>([]);
  const getExecutorList = async () => {
    const res = await statisticalApi.luteosAiAnalyzeOpinionQueryExecutorList();
    console.log('执行者列表=>', res);
    executorList.value = res.executorBeanList || [];

    const myselfMemberCode = store?.userInfo?.memberCode;
    if (myselfMemberCode) {
      const found = executorList.value.find((item) => item.memberCode === myselfMemberCode);
      if (found) {
        search.executor = [String(myselfMemberCode)];
      }
      // 初始化时触发查询
      runQuery();
    }
  };
  getExecutorList();

  // 顶部 el-tab-panel 列表
  const tabList = ref<{ classification: string; classificationCount: number }[]>([
    { classification: TabType['News&SocialMedia'], classificationCount: 0 },
    { classification: TabType.CustomerService, classificationCount: 0 },
  ]);

  // const tabList = ref<StatisticalContracts.ClassificationBean[]>(
  //   [] as StatisticalContracts.ClassificationBean[]
  // );

  // 数据来源列表
  const sorceTypeList = ref<{ code: string; name: string }[]>([]);
  // 状态列表
  const statusList = ref<{ label: string; value: number }[]>([]);

  const queryOpinionParamList = async () => {
    // 获取查询条件参数列表
    const res = await statisticalApi.luteosAiAnalyzeOpinionQueryOpinionParamList();

    // tabList.value = res.classificationList || [];

    sorceTypeList.value =
      res.dataSourceList?.map((item, index) => {
        return {
          code: item,
          name: item,
        };
      }) || [];

    // 更新 tabList 中的 classificationCount
    res.classificationList?.forEach((item) => {
      const foundTab = tabList.value.find((tab) => tab.classification === item.classification);
      if (foundTab) {
        foundTab.classificationCount = item.classificationCount ?? 0;
      }
    });

    statusList.value = Object.entries(res.statusMap || {}).map(([key, label]) => ({
      value: Number(key),
      label: label as string,
    }));

    // console.log('statusList=>', statusList.value);
    // console.log('查询条件参数列表=>', res);
  };

  queryOpinionParamList();

  const handleStatusChange = async (event, row) => {
    const res = await statisticalApi.luteosAiAnalyzeOpinionUpdateStatus({
      opinionUniqueCode: row.uniqueCode,
      status: event,
    });
    // console.log('状态变更res:', res);
    if (res) {
      ElMessage({ message: '状态变更成功', type: 'success', grouping: true, duration: 1000 });
      runQuery();
    }
  };

  const handleOpenUrl = (url: string) => {
    if (!url) {
      ElMessage({ message: '暂无链接', type: 'warning', grouping: true });
      return;
    }
    window.open(url, '_blank');
  };

  // 监听 publishTimeStart 和 publishTimeEnd，当两者都为 undefined 时清空 time
  watch(
    () => [search.publishTimeStart, search.publishTimeEnd],
    ([start, end]) => {
      if (start === undefined && end === undefined) {
        time.value = [];
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  @use './styles/table.scss';

  .page-upgrade-tip {
    margin-bottom: 12px;
  }
  .whitebg {
    background-color: white;
  }

  .custom-labels {
    gap: 6px;
  }
</style>
