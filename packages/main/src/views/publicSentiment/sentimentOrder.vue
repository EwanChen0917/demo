<template>
  <el-tabs v-model="localClassification" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane v-for="item in tabList" :key="item.classification" :name="item.classification">
      <template #label>
        {{ item.label }}
        <span class="tab-count">({{ item.classificationCount }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="handleResetSearch"
    @reset-search-by-key="resetSearchByKey"
  >
    <template #filters>
      <template v-if="isCustomerTab">
        <el-date-picker
          v-model="customerTimeRange"
          type="daterange"
          range-separator="-"
          start-placeholder="创建时间"
          end-placeholder="创建时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          style="width: 220px"
        />
        <el-select
          v-model="search.customerStatusList"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="请选择任务状态"
        >
          <el-option
            v-for="item in customerStatusList"
            :key="`${item.label}-${item.value}`"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-select-v2
          v-model="search.customerDataSourceList"
          :options="sourceTypeList"
          filterable
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="请选择来源"
        />
        <el-select
          v-model="search.customerExecutorList"
          clearable
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="请选择执行者"
          v-permission="'sentimentExecutorPermission'"
        >
          <el-option
            v-for="item in executorList"
            :key="item.memberCode"
            :label="item.name"
            :value="item.memberCode"
          >
            <div class="d-flex align-items-center custom-labels">
              <img
                :src="item.avatar || '/src/assets/images/icon/defaultAvatar.png'"
                class="avatar mr-2"
                style="width: 20px; height: 20px; border-radius: 50%"
              />
              <span>{{ item.name }}</span>
            </div>
          </el-option>
        </el-select>
        <el-input v-model="search.search" placeholder="搜索帖子内容" style="width: 200px" clearable>
          <template #suffix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </el-input>
      </template>
      <template v-else>
        <el-input
          v-model="search.search"
          placeholder="工单ID"
          clearable
          style="width: 136px"
          @keyup.enter="refreshList"
        >
          <template #suffix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </el-input>
        <div class="time-range-filter">
          <el-select v-model="timeType" class="time-range-select">
            <el-option
              v-for="option in timeTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            class="time-range-picker"
          />
        </div>
        <el-select
          v-model="search.orderLevel"
          :options="orderLevelList"
          :props="{ label: 'name', value: 'code' }"
          multiple
          collapse-tags
          :max-collapse-tags="1"
          placeholder="舆情等级"
          clearable
          class="adaptive-multiple-select"
          style="min-width: 120px"
        />
        <el-select
          v-model="search.status"
          :options="statusList"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="处理状态"
          clearable
          class="adaptive-multiple-select"
          style="min-width: 120px"
        />
        <el-select
          v-model="search.executor"
          clearable
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="请选择执行者"
          style="width: 120px"
          v-permission="'sentimentExecutorPermission'"
        >
          <el-option
            v-for="item in executorList"
            :key="item.memberCode"
            :label="item.name"
            :value="item.memberCode"
          >
            <div class="d-flex align-items-center custom-labels">
              <img
                :src="item.avatar || '/src/assets/images/icon/defaultAvatar.png'"
                class="avatar mr-2"
                style="width: 20px; height: 20px; border-radius: 50%"
              />
              <span>{{ item.name }}</span>
            </div>
          </el-option>
        </el-select>
        <LevelSelector
          v-model="search.problemCategory"
          :options="categoryOptions"
          :multiple="true"
          placeholder="问题类别"
          style="width: 120px"
        />
        <CategoryCascader
          v-model="search.productTag"
          placeholder="产品类别"
          :multiple="true"
          :emit-path="true"
          value-key="categoryName"
          style="width: 120px"
        />
      </template>
    </template>
    <template #tools-prepend>
      <div class="filter-tools">
        <!-- <el-tooltip content="刷新" placement="top">
          <i class="iconfont icon-Root-tyshuaxin" @click="refreshList"></i>
        </el-tooltip>
        <div class="filter-tools__divider"></div> -->
        <el-tooltip content="导出" placement="top">
          <i v-if="!isCustomerTab" class="iconfont icon-xiazai" @click="handleExport"></i>
        </el-tooltip>
      </div>
    </template>
    <el-table
      class="sentiment-table border-table"
      ref="tableRef"
      v-loading="tableLoading"
      :data="displayListData?.opinionDataList || []"
      class-name="table-row-dashed"
      max-height="900px"
      :cell-style="{ verticalAlign: 'top' }"
    >
      <template #empty>
        <div v-if="!tableLoading" class="sentiment-empty">
          <EmptyAnimation name="listEmpty" :width="128" :height="128" />
          <div class="sentiment-empty__text">恭喜！没有舆情报警工单需要处理。</div>
        </div>
      </template>
      <template v-if="isCustomerTab">
        <el-table-column min-width="1000px" label="帖子信息">
          <template #default="{ row }">
            <p class="row-title row-title--with-translation">
              <el-tooltip popper-style="max-width: 480px;" placement="top" raw-content>
                <template #content>
                  <div class="tooltip-scroll-content">{{ row.title }}</div>
                </template>
                <span class="row-title__text">
                  {{ row.title }}
                </span>
              </el-tooltip>
              <span
                class="translation-link"
                role="button"
                tabindex="0"
                @click.stop="handleTranslate(row)"
                v-if="!!row.title"
              >
                翻译
              </span>
            </p>
            <p class="row-content row-content--with-translation">
              <el-tooltip popper-style="max-width: 480px;" placement="top" raw-content>
                <template #content>
                  <div class="tooltip-scroll-content">
                    {{ row.content }}
                  </div>
                </template>
                <div
                  class="row-content__text row-link"
                  role="button"
                  tabindex="0"
                  @click="handleOpenZendesk(row)"
                  @keydown.enter.prevent="handleOpenZendesk(row)"
                  @keydown.space.prevent="handleOpenZendesk(row)"
                >
                  {{ row.content }}
                </div>
              </el-tooltip>
              <span
                v-if="!!row.content"
                class="translation-link"
                role="button"
                tabindex="0"
                @click.stop="handleTranslate(row, row.content)"
              >
                翻译
              </span>
            </p>
            <p class="row-keywords">
              <span class="row-keywords-title">
                {{ row.classification }}
              </span>
              <span class="row-keywords-item">{{ row.tag }}</span>
            </p>
            <p class="row-bottom">
              <span>来源：{{ row.dataSource }}</span>
              <span class="divider"></span>
              <span>
                <i class="iconfont icon-time"></i>
                {{ row.publishTime }} 创建
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" label="执行者">
          <template #default="{ row }">
            <div class="column-executor" v-for="item in row.executorBeans" :key="item.jobNumber">
              <img
                :src="item.avatar || '/src/assets/images/icon/defaultAvatar.png'"
                class="avatar"
              />
              <span class="user-name">{{ item.deptName }} - {{ item.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150px" label="处理状态">
          <template #default="{ row }">
            <StatusSelect
              v-model="row.status"
              :options="customerStatusList"
              :disabled="!isProcessingStatus(row.status)"
              style="width: 120px"
              @change="handleStatusChange($event, row)"
            />
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column label="工单ID" width="130">
          <template #default="{ row }">
            <div class="ticket-id">
              <el-tooltip :content="row.workOrderCode || row.uniqueCode" placement="top">
                <span class="cell-text cell-text--ellipsis">
                  {{ row.workOrderCode || row.uniqueCode }}
                </span>
              </el-tooltip>
              <Copy class="ticket-copy" :content="row.workOrderCode || row.uniqueCode" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="520"
          label="工单信息"
          class-name="sentiment-info-cell"
          label-class-name="sentiment-info-cell"
        >
          <template #default="{ row }">
            <div class="ticket-info">
              <template v-if="localClassification === TabType.News">
                <div class="row-title row-title--with-translation">
                  <span class="row-title__text row-link" @click="handleOpenUrl(row.url)">
                    {{ row.title }}
                  </span>
                  <span
                    class="translation-link"
                    role="button"
                    tabindex="0"
                    @click.stop="handleTranslate(row)"
                    v-if="!!row.title"
                  >
                    翻译
                  </span>
                </div>
                <div class="row-summary">概要：{{ row.contentSummary }}</div>
              </template>
              <template v-else>
                <div class="row-content row-content--with-translation">
                  <span class="row-content__text row-link" @click="handleOpenUrl(row.url)">
                    {{ row.title }}
                  </span>
                  <span
                    v-if="!!row.title"
                    class="translation-link"
                    role="button"
                    tabindex="0"
                    @click.stop="handleTranslate(row)"
                  >
                    翻译
                  </span>
                </div>
              </template>
              <div v-if="hasRowTags(row)" class="row-tags">
                <span v-if="row.productTag" class="tag-item">#{{ row.productTag }}</span>
                <span v-for="tag in parsePrTagList(row.prTagStr)" :key="tag" class="tag-item">
                  #{{ tag }}
                </span>
                <span v-if="row.extraTagsCount" class="tag-item">+{{ row.extraTagsCount }}</span>
              </div>
              <div class="row-bottom">
                <span>来源：{{ row.dataSource }}</span>
                <span class="divider"></span>
                <span>国家：{{ row.region }}</span>
                <span class="divider"></span>
                <span>作者：{{ row.author }}</span>
                <img
                  v-if="row.author && row.verified === 1"
                  class="author-verified"
                  :src="authorVerifiedIcon"
                  alt=""
                />
                <span class="divider light"></span>
                <span>粉丝量：{{ formatNumber(row.followers) }}</span>
                <span class="divider light"></span>
                <span>{{ formatPublishTime(row.publishTime) }} 发布</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="互动数据" width="168">
          <template #default="{ row }">
            <div class="interaction-data">
              <div class="data-row">
                <span class="label">浏览：</span>
                <span class="value">{{ formatNumber(row.coveredNum) }}</span>
                <span v-if="shouldShowCoveredPercent(row)" class="delta">
                  <i class="delta-icon up"></i>
                  {{ row.coveredNumPercent }}%
                </span>
              </div>
              <div class="data-row">
                <span class="label">转评赞：</span>
                <span class="value">{{ formatNumber(row.likeCommentReposts) }}</span>
                <span v-if="shouldShowLcrPercent(row)" class="delta">
                  <i class="delta-icon up"></i>
                  {{ row.lcrPercent }}%
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="情感" width="100">
          <template #default="{ row }">
            <span :class="['sentiment-pill', getSentimentClass(row)]">
              {{ getSentimentLabel(row) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="100">
          <template #default="{ row }">
            <span v-if="getOrderLevelText(row)" class="priority-pill">
              {{ getOrderLevelText(row) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="处理建议" width="96">
          <template #default="{ row }">
            <div class="suggestion-list">
              <span
                v-for="item in getSuggestionMetaForRow(row).list"
                :key="item"
                class="tag-item suggestion-pill"
              >
                {{ item }}
              </span>
              <el-tooltip
                v-if="getSuggestionMetaForRow(row).extraCount"
                placement="top"
                :content="getSuggestionTooltip(row)"
              >
                <span class="tag-item suggestion-extra">
                  +{{ getSuggestionMetaForRow(row).extraCount }}
                </span>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100" label="处理状态">
          <template #default="{ row }">
            <span
              v-if="row.status === 0 || row.status === 1 || row.status === 4 || row.status === null"
              :class="['status-pill', getStatusClass(row)]"
            >
              {{ getWorkOrderStatusDesc(row) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="执行人 & 处理时限" width="224">
          <template #default="{ row }">
            <div class="executor-info">
              <div class="executor-row">
                <span class="label">执行人：</span>
                <span class="executor-user">
                  <img
                    v-if="getWorkOrderExecutorAvatar(row)"
                    :src="getWorkOrderExecutorAvatar(row)"
                    class="avatar"
                    alt=""
                  />
                  <span v-else class="avatar">
                    {{ getWorkOrderExecutorName(row)?.[0] }}
                  </span>
                  <span class="name">{{ getWorkOrderExecutorName(row) }}</span>
                </span>
              </div>
              <div class="executor-row">
                <span class="label">时限：</span>
                <span class="value">{{ formatDeadline(getWorkOrderDeadline(row)) }}</span>
                <el-tooltip v-if="isOverdueRow(row)" content="已超时" placement="top">
                  <el-icon class="overdue-icon">
                    <WarningFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="72" fixed="right">
          <template #default="{ row }">
            <div class="action-cell">
              <span
                v-if="isProcessingStatus(row.status) && isSelfExecutor(row)"
                class="action-btn"
                role="button"
                tabindex="0"
                @click="openHandleDialog(row)"
                @keydown.enter.prevent="openHandleDialog(row)"
                @keydown.space.prevent="openHandleDialog(row)"
              >
                处理
              </span>
              <!-- <el-button
              v-if="isProcessingStatus(row.status)"
              type="primary"
              link
              style="margin-bottom: 4px"
              @click="openHandleDialog(row)"
            >
              处理
            </el-button> -->
              <span
                class="action-btn"
                role="button"
                tabindex="0"
                @click="openLogDialog(row)"
                @keydown.enter.prevent="openLogDialog(row)"
                @keydown.space.prevent="openLogDialog(row)"
              >
                日志
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="displayListTotal"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>

  <HandleTicketDialog
    v-model="handleVisible"
    :ticket-id="currentTicketId"
    :executor-code="currentExecutorCode"
    @submit="handleTicketSubmit"
  />

  <TicketLogDialog
    v-model="logVisible"
    :ticket-id="currentTicketId"
    :logs="ticketLogs"
    :loading="logLoading"
    :current-member-code="currentMemberCode"
    :executor-code="currentExecutorCode"
    :manage-role-flag="currentManageRoleFlag"
    :time-limit-flag="currentTimeLimitFlag"
    @view-ticket="handleViewTicketLog"
    @handle-ticket="handleLogHandleTicket"
  />
  <TranslationDialog
    v-model="translationDialogVisible"
    :loading="translationLoading"
    :source-text="translationResult.sourceText"
    :source-lang="translationResult.sourceLang"
    :translated-text="translationResult.translatedText"
    :error-message="translationResult.errorMessage"
  />
</template>

<script lang="ts" setup name="alarmOrder">
  import dayjs from 'dayjs';
  import { isEmpty, uniq } from 'lodash-es';
  import { Search, WarningFilled } from '@element-plus/icons-vue';
  import { platformApi, statisticalApi, StatisticalApi, StatisticalContracts } from '@/api';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import {
    handleTicketAction,
    queryTicketLogs,
    getCategoryDict,
    queryWorkOrderList,
    exportWorkOrder,
    translateSubmit,
  } from './api';
  import HandleTicketDialog from './components/HandleTicketDialog/index.vue';
  import TicketLogDialog from './components/TicketLogDialog/index.vue';
  import TranslationDialog from './components/TranslationDialog/index.vue';
  import LevelSelector from './components/LevelSelector/index.vue';
  import CategoryCascader from './components/CategoryCascader/index.vue';
  import StatusSelect from './components/StatusSelect/index.vue';
  import {
    SOLUTION_LABEL_MAP,
    SOLUTION_OPTIONS,
    SENTIMENT_LEVEL_LABELS,
    SENTIMENT_TYPE_LABELS,
    CUSTOMER_WORK_ORDER_STATUS_OPTIONS,
  } from './constants/index';
  import { formatDeadline, formatNumber } from './utils';
  import { useFullScreen } from './hooks';
  import './styles/common.scss';

  const authorVerifiedIcon = new URL('./assets/svgs/author-verified.svg', import.meta.url).href;

  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const currentMemberCode = computed(() => store.userInfo?.memberCode);
  const initialWorkOrderCode = route.query.workOrderCode as string | undefined;
  const { toggleFullscreen, isFullscreen } = useFullScreen();
  enum TabType {
    News = 'news',
    SocialMedia = 'sns',
    CustomerService = 'customerService',
  }
  const tabLabels = {
    [TabType.News]: '新闻',
    [TabType.SocialMedia]: '社媒',
    [TabType.CustomerService]: '客服',
  };
  const routeClassification = decodeURIComponent((route.query.classification as string) || '');
  const resolveInitialClassification = (value: string) => {
    if (Object.values(TabType).includes(value as TabType)) return value as TabType;
    if (value === tabLabels[TabType.News] || value === '新闻/社媒') return TabType.News;
    if (value === tabLabels[TabType.SocialMedia]) return TabType.SocialMedia;
    if (value === tabLabels[TabType.CustomerService]) return TabType.CustomerService;
    return TabType.SocialMedia;
  };
  const parseStatusQuery = (value: any) => {
    if (value === undefined || value === null || value === '') return [];
    const list = Array.isArray(value) ? value : String(value).split(',');
    return list.map((item) => Number(item)).filter((num) => Number.isFinite(num));
  };
  const initialStatus = parseStatusQuery(route.query.status);
  const initialClassification = resolveInitialClassification(routeClassification);
  const initialCustomerStatus =
    initialClassification === TabType.CustomerService ? initialStatus : [];
  const localClassification = ref<TabType>(initialClassification);
  const isJournalismTab = computed(() =>
    [TabType.News, TabType.SocialMedia].includes(localClassification.value)
  );
  const isCustomerTab = computed(() => localClassification.value === TabType.CustomerService);
  const orderLevelList = ref<{ code: number; name: string }[]>([
    { code: 0, name: 'P0' },
    { code: 1, name: 'P1' },
    { code: 2, name: 'P2' },
    { code: 3, name: 'P3' },
  ]);
  const timeTypeOptions = [
    { label: '创建时间', value: 'create' },
    { label: '处理时限', value: 'deadline' },
  ];
  const categoryOptions = ref([]);
  const translationDialogVisible = ref(false);
  const translationLoading = ref(false);
  const translationRequestId = ref(0);
  const translationResult = reactive({
    sourceText: '',
    sourceLang: '',
    translatedText: '',
    errorMessage: '',
  });

  const statusClassMap = {
    0: 'processing', // 0: 待处理/处理中
    1: 'resolved', // 1: 已解决
    4: 'no-need', // 4: 无需解决
  };

  const isProcessingStatus = (status: number | string) => status === 0 || status === 'processing';
  const isSelfExecutor = (row) => row.executor === currentMemberCode.value;

  const mapStatusLabel = (label) => {
    if (label === '进行中') return '处理中';
    if (label === '已处理') return '已解决';
    if (label === '无需处理') return '无需解决';
    if (label === '舆情升级') return '舆情升级';
    if (label === '钓鱼/垃圾内容') return '钓鱼内容';
    if (label === '钓鱼内容') return '钓鱼内容';
    return label || '';
  };

  const sentimentClassMap = {
    正向: 'positive',
    负向: 'negative',
    中立: 'neutral',
    positive: 'positive',
    negative: 'negative',
    neutral: 'neutral',
  };
  const SENTIMENT_TYPE_EN_LABELS = {
    negative: '负向',
    positive: '正向',
    neutral: '中立',
  };
  const DEFAULT_MOCK_SOLUTION_LABELS = SOLUTION_OPTIONS.slice(0, 2).map((option) => option.label);

  const PAGE_SIZE = 10;
  const tableRef = ref();
  const normalizeMultiSelect = (value: any) => {
    if (!value) return undefined;
    if (typeof value === 'string') return [value];
    const last = value[value.length - 1];
    return last ? [last] : undefined;
  };
  const getLeafValues = (value) => {
    if (Array.isArray(value) && Array.isArray(value[0])) {
      return value.map((item) => item?.[item.length - 1]).filter(Boolean);
    }
    if (Array.isArray(value)) {
      const leaf = value[value.length - 1];
      return leaf ? [leaf] : [];
    }
    return [];
  };

  const getWorkOrderCode = (value: string) => {
    return value || undefined;
  };
  const parsePrTagList = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => (item || '').trim()).filter(Boolean);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  const hasRowTags = (row) => {
    const productTag = String(row?.productTag || '').trim();
    const prTags = parsePrTagList(row?.prTagStr);
    return Boolean(productTag) || prTags.length > 0 || Number(row?.extraTagsCount) > 0;
  };

  const hasRowSummary = (row) => Boolean(String(row?.contentSummary || '').trim());

  const buildProductLevelPayload = (value) => {
    const paths = Array.isArray(value)
      ? Array.isArray(value[0])
        ? value
        : value.length
        ? [value]
        : []
      : [];
    const levels = [[], [], [], [], []];
    paths.forEach((path) => {
      for (let index = 0; index < levels.length; index += 1) {
        if (path?.[index]) {
          levels[index].push(path[index]);
        }
      }
    });
    return levels.map((list) => uniq(list));
  };

  type OpinionListResponse = StatisticalApi.LuteosAiAnalyzeOpinionQueryList.ResponseBody & {
    opinionDataList?: any[];
    requestId?: number;
    classificationKey?: TabType;
  };

  const createEmptyDisplayListData = (): OpinionListResponse => ({
    opinionDataList: [],
    total: 0,
  });
  const displayListData = ref<OpinionListResponse>(createEmptyDisplayListData());
  const displayListTotal = computed(() => displayListData.value?.total ?? 0);
  const latestListRequestId = ref(0);
  const tabSwitchLoading = ref(false);
  const tabSwitchRequestStarted = ref(false);
  const clearDisplayList = () => {
    displayListData.value = createEmptyDisplayListData();
  };

  const {
    search,
    pagination: { current, pageSize, handleCurrentChange, pageSizeOption, handlePageSizeChange },
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    StatisticalApi.LuteosAiAnalyzeOpinionQueryList.RequestBody & {
      problemCategory?: string[];
      productTag?: string[];
      timeType?: string;
      customerStatusList?: Array<number | string>;
      customerExecutorList?: string[];
      customerDataSourceList?: string[];
    },
    OpinionListResponse
  >({
    searchDefaults: {
      search: initialWorkOrderCode || '',
      publishTimeEnd: route.query.publishTimeEnd as string | undefined,
      publishTimeStart: route.query.publishTimeStart as string | undefined,
      deadLineDateStart: undefined,
      deadLineDateEnd: undefined,
      status: initialStatus,
      executor: undefined,
      customerStatusList: initialCustomerStatus,
      customerExecutorList: [],
      customerDataSourceList: [],
      orderLevel: [],
      problemCategory: [],
      productTag: [],
      timeType: timeTypeOptions[0].value,
      classification: tabLabels[initialClassification],
    },
    watchSearchKeys: [
      'search',
      'publishTimeEnd',
      'publishTimeStart',
      'deadLineDateStart',
      'deadLineDateEnd',
      'status',
      'executor',
      'customerStatusList',
      'customerExecutorList',
      'customerDataSourceList',
      'orderLevel',
      'problemCategory',
      'productTag',
      'classification',
    ],
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      const [productLevel1, productLevel2, productLevel3, productLevel4, productLevel5] =
        buildProductLevelPayload(data.productTag);
      return {
        ...data,
        productLevel1,
        productLevel2,
        productLevel3,
        productLevel4,
        productLevel5,
      };
    },
    onSuccess: (data) => {
      if (
        data.requestId !== latestListRequestId.value ||
        data.classificationKey !== localClassification.value
      ) {
        return;
      }
      displayListData.value = data;
    },

    service: async (params) => {
      const requestId = latestListRequestId.value + 1;
      latestListRequestId.value = requestId;
      const classificationKey = localClassification.value;
      if (isJournalismTab.value) {
        const classificationLabel = tabLabels[classificationKey];
        const query = {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          workOrderCode: getWorkOrderCode(params.search),
          status: params.status?.length ? params.status : undefined,
          executorList: params.executor,
          levelList: params.orderLevel?.length
            ? params.orderLevel.map((level) => Number(level))
            : undefined,
          prTagList: getLeafValues(params.problemCategory),
          productLevel1: params.productLevel1,
          productLevel2: params.productLevel2,
          productLevel3: params.productLevel3,
          productLevel4: params.productLevel4,
          productLevel5: params.productLevel5,
          createDateStart: params.timeType === 'create' ? params.publishTimeStart : undefined,
          createDateEnd: params.timeType === 'create' ? params.publishTimeEnd : undefined,
          deadLineDateStart: params.timeType === 'deadline' ? params.deadLineDateStart : undefined,
          deadLineDateEnd: params.timeType === 'deadline' ? params.deadLineDateEnd : undefined,
          classification: classificationLabel,
        };
        const result = await statisticalApi.luteosAiAnalyzeOpinionWorkOrderList(query);
        return {
          ...result,
          opinionDataList: result.workOrderList,
          requestId,
          classificationKey,
        };
      }
      const customerQuery = {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        publishTimeStart: params.publishTimeStart,
        publishTimeEnd: params.publishTimeEnd,
        status: params.customerStatusList?.length ? params.customerStatusList : undefined,
        dataSource: params.customerDataSourceList,
        executor: params.customerExecutorList,
        search: params.search,
      };
      const result = await queryWorkOrderList(customerQuery);
      return {
        ...result,
        opinionDataList: result.opinionDataList,
        requestId,
        classificationKey,
      };
    },
  });

  const tableLoading = computed(() => listLoading.value || tabSwitchLoading.value);

  const handleTabChange = (val) => {
    localClassification.value = val;
    tabSwitchLoading.value = true;
    tabSwitchRequestStarted.value = false;
    clearDisplayList();
    tableRef.value?.clearSelection();
    Promise.all([queryOpinionParamList(val), getSourceTypeOptions()]).catch((error) => {
      console.error('切换 tab 加载参数失败', error);
    });
    resetSearch();
    search.classification = tabLabels[val];
    // 重置常用筛选
    search.publishTimeStart = undefined;
    search.publishTimeEnd = undefined;
    search.deadLineDateStart = undefined;
    search.deadLineDateEnd = undefined;
    search.status = initialStatus;
    search.customerStatusList =
      val === TabType.CustomerService ? parseStatusQuery(route.query.status) : [];
    search.executor = undefined;
    search.orderLevel = [];
    search.problemCategory = [];
    search.productTag = [];
    search.timeType = timeTypeOptions[0].value;
    search.search = '';
  };

  watch(
    () => listLoading.value,
    (loading) => {
      if (!tabSwitchLoading.value) return;
      if (loading) {
        tabSwitchRequestStarted.value = true;
        return;
      }
      if (tabSwitchRequestStarted.value) {
        tabSwitchLoading.value = false;
        tabSwitchRequestStarted.value = false;
      }
    }
  );

  watch(
    () => route.query.status,
    (val) => {
      const routeStatusList = parseStatusQuery(val);
      if (isCustomerTab.value) {
        search.customerStatusList = routeStatusList;
        return;
      }
      search.status = routeStatusList;
    }
  );

  watch(
    () => translationDialogVisible.value,
    (visible) => {
      if (!visible) {
        invalidateTranslationRequest();
      }
    }
  );

  const handleResetSearch = () => {
    if (!isEmpty(route.query)) {
      void router.replace({
        path: route.path,
        query: {},
      });
    }
    resetSearch();
    search.search = '';
    search.publishTimeStart = undefined;
    search.publishTimeEnd = undefined;
    search.deadLineDateStart = undefined;
    search.deadLineDateEnd = undefined;
    search.status = initialStatus;
    search.customerStatusList = [];
    search.executor = undefined;
    search.orderLevel = [];
    search.problemCategory = [];
    search.productTag = [];
    search.timeType = timeTypeOptions[0].value;
  };

  const handleOpenUrl = (url) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  const buildZendeskTicketUrl = (ticketId: string) =>
    `https://rootglobal.zendesk.com/agent/tickets/${ticketId}`;

  const handleOpenZendesk = (row) => {
    const ticketId = row?.ticketId;
    if (!ticketId) {
      ElMessage.warning('缺少 ticketId，无法打开 Zendesk 工单');
      return;
    }
    window.open(buildZendeskTicketUrl(ticketId), '_blank');
  };

  const resetTranslationResult = (sourceText = '') => {
    translationResult.sourceText = sourceText;
    translationResult.sourceLang = '';
    translationResult.translatedText = '';
    translationResult.errorMessage = '';
  };

  const invalidateTranslationRequest = () => {
    translationRequestId.value += 1;
    translationLoading.value = false;
  };

  const handleTranslate = async (row: any, sourceText = row?.title || '') => {
    const opinionUniqueCode = row?.uniqueCode;
    if (!opinionUniqueCode) {
      ElMessage.warning('缺少舆情唯一标识，无法翻译');
      return;
    }
    if (!sourceText) {
      ElMessage.warning('缺少翻译内容，无法翻译');
      return;
    }

    const requestId = translationRequestId.value + 1;
    translationRequestId.value = requestId;
    resetTranslationResult(sourceText);
    translationDialogVisible.value = true;
    translationLoading.value = true;
    try {
      const result = await translateSubmit({
        opinionUniqueCode,
        content: sourceText,
      });
      if (requestId !== translationRequestId.value) return;
      translationResult.sourceLang = result?.sourceLang || '';
      translationResult.translatedText = result?.translatedText || '';
    } catch {
      if (requestId !== translationRequestId.value) return;
      translationResult.errorMessage = '翻译失败，请稍后重试。';
    } finally {
      if (requestId === translationRequestId.value) {
        translationLoading.value = false;
      }
    }
  };

  const resetSearchByKey = (key) => {
    if (key in search) {
      search[key] = Array.isArray(search[key]) ? [] : '';
    }
  };

  onActivated(() => {
    tableRef.value.clearSelection();
  });

  // 执行者列表
  const executorList = ref<StatisticalContracts.MemberBean[]>([]);
  const getExecutorList = async () => {
    const res = await statisticalApi.luteosAiAnalyzeOpinionQueryExecutorList();
    executorList.value = res.executorBeanList || [];
    // 移除自动选中自己的逻辑
  };
  getExecutorList();

  const tabList = ref<{ classification: TabType; label: string; classificationCount: number }[]>([
    {
      classification: TabType.SocialMedia,
      label: tabLabels[TabType.SocialMedia],
      classificationCount: 0,
    },
    { classification: TabType.News, label: tabLabels[TabType.News], classificationCount: 0 },
    {
      classification: TabType.CustomerService,
      label: tabLabels[TabType.CustomerService],
      classificationCount: 0,
    },
  ]);

  const statusList = ref<{ label: string; value: number }[]>([]);
  const customerStatusList = ref<
    { label: string; value: number | string | null; disabled?: boolean }[]
  >(CUSTOMER_WORK_ORDER_STATUS_OPTIONS);
  const sourceTypeList = ref<{ label: string; value: string }[]>([]);
  const buildDictOptions = (list: any[] = []) =>
    list
      .map((item) => ({
        label: item?.desc || item?.name || item?.label || item?.value || '',
        value: item?.value || item?.label || item?.desc || item?.name || '',
      }))
      .filter((item) => item.label && item.value);

  const getSourceTypeOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['opinion_source_type'],
    });
    sourceTypeList.value = buildDictOptions(res?.dictMap?.opinion_source_type);
  };

  const queryOpinionParamList = async (classification = localClassification.value) => {
    const res = await statisticalApi.luteosAiAnalyzeOpinionQueryOpinionParamList({
      classification: tabLabels[classification],
    });
    const classificationCountMap = new Map(
      (res.classificationList || []).map((item) => [item.classification, item.classificationCount])
    );
    tabList.value = tabList.value.map((tab) => ({
      ...tab,
      classificationCount: classificationCountMap.get(tab.label) ?? 0,
    }));

    statusList.value = [
      { label: '已解决', value: 1 },
      { label: '处理中', value: 0 },
      { label: '无需解决', value: 4 },
    ];
    customerStatusList.value = CUSTOMER_WORK_ORDER_STATUS_OPTIONS;
  };

  void Promise.all([queryOpinionParamList(), getSourceTypeOptions()]);

  const timeType = computed({
    get: () => search.timeType,
    set: (val) => {
      search.timeType = val;
    },
  });
  const timeRange = computed<string[]>({
    get: () => {
      const start =
        search.timeType === 'deadline' ? search.deadLineDateStart : search.publishTimeStart;
      const end = search.timeType === 'deadline' ? search.deadLineDateEnd : search.publishTimeEnd;
      if (!start && !end) return [];
      return [start || '', end || ''];
    },
    set: (val) => {
      if (val?.length) {
        if (search.timeType === 'deadline') {
          search.deadLineDateStart = val[0] || '';
          search.deadLineDateEnd = val[1] || '';
          search.publishTimeStart = undefined;
          search.publishTimeEnd = undefined;
        } else {
          search.publishTimeStart = val[0] || '';
          search.publishTimeEnd = val[1] || '';
          search.deadLineDateStart = undefined;
          search.deadLineDateEnd = undefined;
        }
      } else if (search.timeType === 'deadline') {
        search.deadLineDateStart = undefined;
        search.deadLineDateEnd = undefined;
      } else {
        search.publishTimeStart = undefined;
        search.publishTimeEnd = undefined;
      }
    },
  });
  const customerTimeRange = computed<string[]>({
    get: () => {
      const start = search.publishTimeStart;
      const end = search.publishTimeEnd;
      if (!start && !end) return [];
      return [start || '', end || ''];
    },
    set: (val) => {
      if (val?.length) {
        search.publishTimeStart = val[0] || '';
        search.publishTimeEnd = val[1] || '';
      } else {
        search.publishTimeStart = undefined;
        search.publishTimeEnd = undefined;
      }
    },
  });

  const loadDicts = async () => {
    try {
      const [categories] = await Promise.all([getCategoryDict()]);
      categoryOptions.value = categories?.tagTreeList || [];
    } catch (e) {
      console.error('加载字典失败', e);
    }
  };

  const getLevelList = () => {
    if (Array.isArray(search.orderLevel) && search.orderLevel.length) {
      return search.orderLevel.map((level) => Number(level));
    }
    return undefined;
  };

  const buildQueryParam = (classificationLabel) => ({
    keyword: search.search,
    classification: classificationLabel,
  });

  const buildWorkOrderExportPayload = (classificationLabel) => {
    const [productLevel1, productLevel2, productLevel3, productLevel4, productLevel5] =
      buildProductLevelPayload(search.productTag);
    return {
      productLevel1,
      productLevel2,
      productLevel3,
      productLevel4,
      productLevel5,
      classification: classificationLabel,
      levelList: getLevelList(),
      pageNum: current.value,
      pageSize: pageSize.value,
      prTagList: getLeafValues(search.problemCategory),
      deadLineDateStart: search.timeType === 'deadline' ? search.deadLineDateStart : undefined,
      deadLineDateEnd: search.timeType === 'deadline' ? search.deadLineDateEnd : undefined,
      createDateStart: search.timeType === 'create' ? search.publishTimeStart : undefined,
      createDateEnd: search.timeType === 'create' ? search.publishTimeEnd : undefined,
      status: search.status?.length ? search.status : undefined,
      executorList: search.executor,
      workOrderCode: getWorkOrderCode(search.search),
    };
  };

  const handleExport = async () => {
    const classificationLabel = tabLabels[localClassification.value];
    const payload = buildWorkOrderExportPayload(classificationLabel);
    try {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      const result = await exportWorkOrder(payload);
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;
      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: result?.appCode,
          module_code: result?.moduleCode,
          record_type: 2,
        },
      });
      openWindow(path.href);
    } catch (error) {
      ElMessage.error((error as Error).message || '导出失败');
    }
  };

  onMounted(() => {
    loadDicts();
    if (initialWorkOrderCode) {
      runQuery(true);
    }
  });

  // --- 弹窗逻辑 ---
  const handleVisible = ref(false);
  const logVisible = ref(false);
  const currentTicketId = ref('');
  const currentExecutorCode = ref('');
  const currentManageRoleFlag = ref(0);
  const currentTimeLimitFlag = ref(0);
  const ticketLogs = ref([]);
  const logLoading = ref(false);

  const handleTicketSubmit = async (data) => {
    await handleTicketAction(data);
    ElMessage.success('操作成功');
    handleVisible.value = false;
    refreshList();
  };

  const handleStatusChange = async (event, row) => {
    if (event === null || event === undefined) {
      ElMessage.warning('状态码未配置，暂不可操作');
      return;
    }
    const res = await statisticalApi.luteosAiAnalyzeOpinionUpdateStatus({
      opinionUniqueCode: row.uniqueCode,
      status: event,
    });
    if (res) {
      ElMessage({ message: '状态变更成功', type: 'success', grouping: true, duration: 1000 });
      refreshList();
    }
  };

  const openLogDialog = async (row) => {
    currentTicketId.value = row.workOrderCode || row.uniqueCode;
    currentExecutorCode.value = row.executor;
    currentManageRoleFlag.value = row?.manageRoleFlag ?? 0;
    currentTimeLimitFlag.value = row?.timeLimitFlag ?? 0;
    logVisible.value = true;
    logLoading.value = true;
    try {
      ticketLogs.value = await queryTicketLogs(row.workOrderCode || row.uniqueCode);
    } finally {
      logLoading.value = false;
    }
  };

  const openHandleDialog = (row) => {
    currentTicketId.value = row.workOrderCode || row.uniqueCode;
    currentExecutorCode.value = row.executor;
    handleVisible.value = true;
  };

  const handleViewTicketLog = (ticketId) => {
    search.search = ticketId;
    logVisible.value = false;
    runQuery(true);
  };

  const handleLogHandleTicket = () => {
    handleVisible.value = true;
  };

  const getStatusKey = (row) => row.workOrderCode || row.uniqueCode;

  const getWorkOrderStatusDesc = (row) => {
    const statusDesc = mapStatusLabel(row.statusDesc ?? '');
    if (row.status === null && statusDesc === '') {
      return '无需解决';
    }
    if (row.status === 4 && !statusDesc) {
      return '无需解决';
    }
    return statusDesc;
  };

  const getStatusClass = (row) => {
    if (row.status === null && row.statusDesc === '') {
      return statusClassMap[4];
    }
    return statusClassMap[row.status];
  };

  const getOrderLevelText = (row) => {
    return row.levelDesc;
  };

  const getWorkOrderSolutions = (row) => {
    const solutionsArray = ([] as any[]).concat(row.solutionList ?? row.solution ?? []);
    const normalizedSolutions = solutionsArray
      .map((item) => {
        if (!item) return '';
        if (typeof item === 'string') {
          return SOLUTION_LABEL_MAP[item] || item;
        }
        if (typeof item === 'object') {
          return item.solutionDesc || '';
        }
        return '';
      })
      .filter(Boolean);
    if (normalizedSolutions.length > 0) {
      return normalizedSolutions;
    }
    return DEFAULT_MOCK_SOLUTION_LABELS;
  };

  const getSuggestionMetaForRow = (row) => {
    const solutions = getWorkOrderSolutions(row);
    return {
      list: solutions.slice(0, 3),
      extraCount: Math.max(solutions.length - 3, 0),
    };
  };

  const getSuggestionTooltip = (row) => getWorkOrderSolutions(row).join('、');

  const getWorkOrderExecutorName = (row) => {
    return row.executorName;
  };

  const getWorkOrderExecutorAvatar = (row) => {
    return row.executorAvatar;
  };

  const getWorkOrderDeadline = (row) => {
    return row.deadlineTime;
  };

  // const isOverdueRow = (row) => {
  //   return row?.timeLimitFlag === 1;
  // };
  const isClosedStatus = (status) =>
    status === 1 || status === 4 || status === 'resolved' || status === 'no_need';
  const isOverdueRow = (row) => {
    if (!row) return false;
    if (row.isOverdue) return true;
    const deadline = getWorkOrderDeadline(row);
    if (!deadline) return false;
    if (isClosedStatus(row.status)) return false;
    return dayjs(deadline).isBefore(dayjs());
  };

  const getSentimentLabel = (row) => {
    const sentiment = row.sentiment ?? row.sentimentDesc ?? '';
    if (SENTIMENT_TYPE_LABELS[sentiment]) return SENTIMENT_TYPE_LABELS[sentiment];
    const key = (sentiment as string)?.toLowerCase?.();
    return SENTIMENT_TYPE_EN_LABELS[key] || sentiment;
  };

  const getSentimentClass = (row) => sentimentClassMap[getSentimentLabel(row)] ?? 'neutral';

  const formatPublishTime = (time) => (time ? dayjs(time).format('YYYY-MM-DD HH:mm') : '');

  const isNegativeRow = (row) => getSentimentLabel(row) === '负向';
  const shouldShowCoveredPercent = (row) =>
    isNegativeRow(row) && row.coveredNum > 50 && row.coveredNumPercent > 100;
  const shouldShowLcrPercent = (row) =>
    isNegativeRow(row) && row.likeCommentReposts > 50 && row.lcrPercent > 100;
</script>

<style scoped lang="scss">
  @use './styles/table.scss';
  .whitebg {
    background-color: white;
  }

  .time-range-filter {
    display: inline-flex;
    align-items: center;
    height: 32px;
    width: fit-content;
    min-width: 260px;
    max-width: 360px;
    border-radius: 6px;
    border: 1px solid #e7e9e8;
    overflow: hidden;
    background: #ffffff;
  }

  .time-range-select {
    width: 120px;
    flex: 0 0 120px;
  }

  .time-range-picker {
    flex: 1 1 auto;
    min-width: 160px;
  }

  .time-range-filter :deep(.el-select__wrapper),
  .time-range-filter :deep(.el-input__wrapper) {
    box-shadow: none;
    border: none;
  }

  .time-range-filter :deep(.el-select__wrapper) {
    padding: 5px 12px;
    border-right: 1px solid #e7e9e8;
    border-radius: 0;
  }

  .time-range-filter :deep(.el-input__wrapper) {
    padding: 6px 12px;
  }

  .time-range-filter :deep(.el-input__prefix) {
    display: none;
  }

  .time-range-filter :deep(.el-range__icon) {
    display: none;
  }

  .time-range-filter :deep(.el-input__inner) {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }

  .filter-tools {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #585a5a;
  }

  .filter-tools__divider {
    width: 1px;
    height: 12px;
    background: #e7e9e8;
  }

  .filter-tools .iconfont {
    font-size: 16px;
    cursor: pointer;
  }

  .ticket-id {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  :deep(.ticket-id .copy) {
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  :deep(.el-table__row:hover) .ticket-id .copy {
    opacity: 1;
    pointer-events: auto;
  }

  :deep(.head-tools > .el-tooltip),
  :deep(.head-tools > .split-line),
  :deep(.head-tools > i.icon-shuaxinjiazai) {
    display: none !important;
  }

  .custom-labels {
    gap: 6px;
  }

  .cell-text {
    font-size: 12px;
    line-height: 20px;
    color: #262626;
  }
  .cell-text--ellipsis {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }

  .row-title {
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    color: #262626;
    margin-bottom: 2px;
  }

  .row-summary {
    font-size: 12px;
    line-height: 20px;
    color: #585a5a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .row-content {
    font-size: 12px;
    line-height: 20px;
    color: #262626;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .row-link {
    cursor: pointer;
  }

  .row-link:hover {
    color: #02b96b;
  }

  .row-title--with-translation {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .row-title__text {
    display: inline-block;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  .row-content--with-translation {
    display: flex;
    align-items: flex-start;
    gap: 6px;
  }

  .row-content__text {
    min-width: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .translation-link {
    display: inline-flex;
    flex: 0 0 auto;
    color: #02b96b;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;
  }

  .translation-link:hover {
    opacity: 0.85;
  }

  .translation-link:focus-visible {
    outline: 2px solid rgba(2, 185, 107, 0.35);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .row-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding-top: 6px;
    margin-bottom: 10px;
  }

  .tag-item {
    background: #f5f5f5;
    border-radius: 4px;
    color: #585a5a;
    display: inline-flex;
    align-items: center;
    height: 20px;
    line-height: 20px;
    padding: 0 6px;
    font-size: 12px;
  }
  .suggestion-pill {
    width: 60px;
  }
  .suggestion-extra {
    width: 27px;
    justify-content: center;
    padding: 0;
  }
  .row-bottom {
    font-size: 12px;
    line-height: 20px;
    color: #8a8f8d;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .row-bottom .divider {
    width: 1px;
    height: 10px;
    background: #e7e9e8;
  }

  .row-bottom .divider.light {
    background: #f4f5f5;
  }

  .author-verified {
    width: 13px;
    height: 13px;
    display: inline-block;
  }

  .priority-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 6px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 20px;
    background: #f4f5f5;
    color: #1f1f1f;
  }

  .sentiment-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 6px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 20px;
  }

  .sentiment-pill.negative {
    background: #ffeeeb;
    color: #f53f3f;
  }

  .sentiment-pill.positive {
    background: #f4f5f5;
    color: #02b96b;
  }

  .sentiment-pill.neutral {
    background: #f4f5f5;
    color: #262626;
  }

  .interaction-data {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .interaction-data .data-row {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    line-height: 20px;
  }

  .interaction-data .label {
    color: #8a8f8d;
  }

  .interaction-data .value {
    color: #262626;
  }

  .delta {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: #f53f3f;
  }

  .delta-icon.up {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid #f53f3f;
  }

  .suggestion-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 6px;
    border-radius: 4px;
    border: 1px solid transparent;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
  }

  .status-pill.processing {
    border-color: #258dff;
    color: #258dff;
  }

  .status-pill.resolved {
    border-color: #02b96b;
    color: #02b96b;
  }

  .status-pill.no-need {
    border-color: #c5c5c5;
    color: #8a8f8d;
  }

  .executor-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    line-height: 20px;
  }

  .executor-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .executor-row .label {
    color: #8a8f8d;
  }

  .executor-user {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .executor-user .avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f4f5f5;
    color: #8a8f8d;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .overdue-icon {
    margin-top: -2px;
    margin-left: 4px;
    font-size: 14px;
    color: #f53f3f;
    align-self: center;
  }

  .action-cell {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    padding-top: 2px;
    color: var(--el-color-primary);
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    user-select: none;
  }

  .action-btn:hover {
    opacity: 0.85;
  }

  .action-btn:active {
    opacity: 0.75;
  }

  .action-btn:focus-visible {
    outline: 2px solid rgba(64, 158, 255, 0.35);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .sentiment-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  .sentiment-empty__text {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
  }
</style>

<style lang="scss">
  .sentiment-table {
    .el-table__cell {
      vertical-align: top !important;
    }
    .row-title {
      font-family: 'PingFang SC Medium';
    }
  }
  .sentiment-table.el-table thead th {
    font-weight: 500;
    font-size: 12px;
  }
  .sentiment-table.el-table th {
    padding: 10px 12px;
  }
  .sentiment-table.el-table td {
    padding: 12px;
  }
  .sentiment-table td.sentiment-info-cell,
  .sentiment-table th.sentiment-info-cell {
    padding-right: 32px !important;
  }
</style>
