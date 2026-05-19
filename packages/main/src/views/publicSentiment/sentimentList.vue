<template>
  <el-tabs v-model="classificationTab" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane v-for="item in classificationOptions" :key="item.value" :name="item.value">
      <template #label>
        {{ item.label }}
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    :selected-list="selectedList"
    @refresh="refreshList"
    @reset-search="handleResetSearch"
    @reset-search-by-key="resetSearchByKey"
    @clear-all="handleResetSearch"
  >
    <template #tools-prepend>
      <div class="filter-tools">
        <el-tooltip content="导出" placement="top">
          <i class="iconfont icon-xiazai" @click="handleExport"></i>
        </el-tooltip>
      </div>
    </template>
    <template #filters>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建时间"
        end-placeholder="创建时间"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :clearable="false"
        @change="handleTimeChange"
        style="width: 226px"
      />
      <el-input
        v-model="search.uniqueCode"
        placeholder="舆情ID"
        clearable
        style="width: 136px"
        @keyup.enter="refreshList"
      >
        <template #suffix>
          <Search style="width: 1em; height: 1em; margin-right: 8px" />
        </template>
      </el-input>
      <el-select
        v-model="search.sentimentList"
        :options="sentimentOptions"
        placeholder="情感"
        clearable
        multiple
        collapse-tags
        :max-collapse-tags="1"
        class="adaptive-multiple-select"
        style="min-width: 110px"
      />
      <el-select
        v-model="search.orderLevelList"
        :options="levelOptions"
        multiple
        collapse-tags
        :max-collapse-tags="1"
        placeholder="问题等级"
        clearable
        class="adaptive-multiple-select"
        style="min-width: 120px"
      />
      <el-select v-model="search.coveredNum" placeholder="浏览量" clearable style="width: 120px">
        <el-option
          v-for="option in viewThresholdOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-select v-model="search.status" placeholder="处理状态" clearable style="width: 120px">
        <el-option
          v-for="option in ticketStatusOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <LevelSelector
        v-model="search.problemCategory"
        :options="categoryOptions"
        :multiple="true"
        placeholder="问题类别"
      />
      <CategoryCascader
        v-model="search.productTag"
        placeholder="产品类别"
        :multiple="true"
        :emit-path="true"
        value-key="categoryName"
      />
      <el-select
        v-model="search.contentTypeList"
        :options="contentTypeOptions"
        multiple
        collapse-tags
        :max-collapse-tags="1"
        placeholder="内容类型"
        clearable
        class="adaptive-multiple-select"
        style="width: 226px !important"
        filterable
        :teleported="false"
      />
    </template>

    <template #more-filter>
      <el-form-item label="内容标题" class="sentiment-more-filter-item">
        <el-input v-model="search.title" placeholder="请输入" clearable @keyup.enter="refreshList">
          <template #suffix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!isSocialTab" label="相关性" class="sentiment-more-filter-item">
        <el-select
          v-model="search.relevanceList"
          :options="relevanceOptionsRef"
          multiple
          collapse-tags
          :max-collapse-tags="1"
          placeholder="全部"
          clearable
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="平台" class="sentiment-more-filter-item">
        <el-select-v2
          v-model="search.dataSourceList"
          :options="sourceTypeList"
          filterable
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="全部"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="国家地区" class="sentiment-more-filter-item">
        <el-select
          v-model="search.regionList"
          :options="countryOptions"
          multiple
          collapse-tags
          :max-collapse-tags="1"
          placeholder="全部"
          clearable
          filterable
          :teleported="false"
        />
      </el-form-item>
    </template>

    <el-table
      class="sentiment-table border-table"
      :data="listData?.list || []"
      v-loading="listLoading"
      :height="tableHeight"
      style="width: 100%"
    >
      <template #empty>
        <div class="sentiment-empty">
          <EmptyAnimation name="listEmpty" :width="128" :height="128" />
          <div class="sentiment-empty__text">目前没有舆情，品牌形象良好！</div>
        </div>
      </template>
      <el-table-column label="舆情ID" width="130">
        <template #default="{ row }">
          <div class="ticket-id">
            <el-tooltip :content="row.sourceCode" placement="top">
              <span class="ticket-id__text">{{ row.sourceCode }}</span>
            </el-tooltip>
            <Copy class="ticket-copy" :content="row.sourceCode" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="舆情信息"
        min-width="520"
        class-name="sentiment-info-cell"
        label-class-name="sentiment-info-cell"
      >
        <template #default="{ row }">
          <div class="ticket-info">
            <template v-if="!isSocialTab">
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
              <div v-if="hasRowSummary(row)" class="row-summary">
                概要：{{ row.contentSummary }}
              </div>
            </template>
            <template v-else>
              <div class="row-content row-content--with-translation">
                <span class="row-content__text row-link" @click="handleOpenUrl(row.url)">
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
              <span>国家：{{ COUNTRY_LABELS[row.region] || row.region }}</span>
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
      <el-table-column label="内容类型" width="128">
        <template #default="{ row }">
          <span class="cell-text">{{ row.contentType }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!isSocialTab" label="相关性" width="108">
        <template #default="{ row }">
          <OverflowTooltip
            :content="RELEVANCE_TYPE_LABELS_CONST[row.relevance] || row.relevance"
            :line="2"
            :font-size="12"
          />
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
              <span class="value">
                {{ formatNumber(row.likeCommentReposts) }}
              </span>
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
          <span :class="['sentiment-pill', row.sentiment]">
            {{ row.sentimentDesc }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="优先级" width="100">
        <template #default="{ row }">
          <span v-if="row.levelDesc" class="priority-pill">{{ row.levelDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" width="140">
        <template #default="{ row }">
          <TicketStatusPopover
            v-if="hasWorkOrders(row)"
            :tickets="row.workOrderList"
            :fallback-ticket="{
              workOrderCode: row.uniqueCode,
              status: getWorkOrderStatus(row),
              statusDesc: getWorkOrderStatusDesc(row),
              executorName: row.executorName,
              solutionList: row.workOrderList?.[0]?.solutionList,
              deadlineTime: row.workOrderList?.[0]?.deadlineTime,
              remark: row.remark,
              creatorName: row.creatorName,
              creatorAvatar: row.creatorAvatar,
              isOverdue: row.isOverdue,
            }"
            :status-class-map="statusClassMap"
            :visible="!!ticketStatusPopoverVisibleMap[getWorkOrderCode(row)]"
            @update:visible="
              (value) => handleTicketStatusPopoverVisibleChange(getWorkOrderCode(row), value)
            "
            trigger="click"
            @view-log="
              (ticket) =>
                openLogDialog(ticket.workOrderCode, { ...row, ...ticket }, getWorkOrderCode(row))
            "
          >
            <span :class="['status-text', getStatusClass(row)]" style="cursor: pointer">
              {{ getTicketStatusText(row) }}
              <el-tooltip v-if="hasOverdueWorkOrder(row)" content="已超时" placement="top">
                <el-icon class="overdue-icon">
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </span>
          </TicketStatusPopover>
          <span v-else class="status-text no-need">未创建工单</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="执行人 & 处理时限" width="184">
          <template #default="{ row }">
            <div class="executor-info">
              <div class="executor-row">
                <span class="label">执行人：</span>
                <span class="executor-user">
                  <span class="avatar">{{ row.workOrderList?.[0]?.executorName?.[0] }}</span>
                  <span class="name">{{ row.workOrderList?.[0]?.executorName }}</span>
                </span>
              </div>
              <div class="executor-row">
                <span class="label">时限：</span>
                <span class="value">
                  {{ formatDeadline(row.workOrderList?.[0]?.deadlineTime) }}
                </span>
                <el-tooltip content="已超时" placement="top">
                  <el-icon v-if="row.isOverdue" class="overdue-icon">
                    <WarningFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column> -->
      <el-table-column label="操作" width="108">
        <template #default="{ row }">
          <div class="action-cell">
            <span
              class="create-action"
              role="button"
              tabindex="0"
              @click="handleOpenCreate(row)"
              @keydown.enter.prevent="handleOpenCreate(row)"
              @keydown.space.prevent="handleOpenCreate(row)"
            >
              创建工单
            </span>
          </div>
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

  <TicketLogDialog
    v-model="logDialogVisible"
    :ticket-id="logDialogTicketId"
    :logs="logDialogLogs"
    :loading="logDialogLoading"
    :manage-role-flag="logDialogRow?.manageRoleFlag ?? 0"
    :time-limit-flag="logDialogRow?.timeLimitFlag ?? 0"
    @view-ticket="handleViewTicketLog"
    @handle-ticket="handleLogHandleTicket"
  />
  <HandleTicketDialog
    v-model="handleDialogVisible"
    :ticket-id="handleDialogTicketId"
    @submit="handleSubmitProcess"
  />
  <CreateTicketDialog
    v-model="createDialogVisible"
    :sentiment-data="createDialogRow"
    :executor-options="executorOptions"
    @success="handleCreateTicketSuccess"
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

<script setup name="sentimentList">
  import dayjs from 'dayjs';
  import { Search, WarningFilled } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { platformApi } from '@/api';
  import { openWindow } from '@/utils';
  import { find, isEmpty, uniq } from 'lodash-es';
  import useList from '@/hooks/list/useList';
  import Copy from '@/components/Copy/index.vue';
  import OverflowTooltip from '@/components/overflowTooltip/index.vue';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import LevelSelector from './components/LevelSelector/index.vue';
  import CategoryCascader from './components/CategoryCascader/index.vue';
  import TicketLogDialog from './components/TicketLogDialog/index.vue';
  import HandleTicketDialog from './components/HandleTicketDialog/index.vue';
  import CreateTicketDialog from './components/CreateTicketDialog/index.vue';
  import TicketStatusPopover from './components/TicketStatusPopover/index.vue';
  import TranslationDialog from './components/TranslationDialog/index.vue';
  import {
    SENTIMENT_LEVEL_LABELS,
    SENTIMENT_TYPE,
    SENTIMENT_TYPE_LABELS,
    CLASSIFICATION_LABELS,
    CLASSIFICATION_TYPE,
    RELEVANCE_TYPE_LABELS,
    TICKET_CREATED_OPTIONS,
    TICKET_STATUS_LABELS,
  } from './constants/index';
  import {
    querySentimentList,
    getCategoryDict,
    getEmployeeList,
    queryTicketLogs,
    handleTicketAction,
    queryOpinionParamList,
    exportOpinionData,
    translateSubmit,
  } from './api';
  import { formatNumber, formatDeadline } from './utils';

  import './styles/common.scss';

  const SENTIMENT_LEVEL_LABELS_CONST = SENTIMENT_LEVEL_LABELS;
  const RELEVANCE_TYPE_LABELS_CONST = RELEVANCE_TYPE_LABELS;

  const route = useRoute();
  const router = useRouter();

  const defaultRange = () => [
    dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ];

  const defaultTimeRange = defaultRange();
  const time = ref(defaultTimeRange);
  const categoryOptions = ref([]);
  const logDialogVisible = ref(false);
  const logDialogTicketId = ref('');
  const logDialogLogs = ref([]);
  const logDialogLoading = ref(false);
  const logDialogRow = ref(null);
  const ticketStatusPopoverVisibleMap = reactive({});
  const activeTicketStatusPopoverKey = ref('');
  const suppressTicketStatusPopoverAutoHide = ref(false);
  const handleDialogVisible = ref(false);
  const handleDialogTicketId = ref('');
  const handleDialogRow = ref(null);
  const createDialogVisible = ref(false);
  const createDialogRow = ref({});
  const translationDialogVisible = ref(false);
  const translationLoading = ref(false);
  const translationRequestId = ref(0);
  const translationResult = reactive({
    sourceText: '',
    sourceLang: '',
    translatedText: '',
    errorMessage: '',
  });

  const levelOptions = Object.keys(SENTIMENT_LEVEL_LABELS).map((key) => ({
    label: SENTIMENT_LEVEL_LABELS[key],
    value: key,
  }));
  const classificationOptions = Object.keys(CLASSIFICATION_LABELS).map((key) => ({
    label: CLASSIFICATION_LABELS[key],
    value: key,
  }));
  const relevanceOptionsRef = ref(
    Object.keys(RELEVANCE_TYPE_LABELS).map((key) => ({
      label: RELEVANCE_TYPE_LABELS[key],
      value: key,
    }))
  );
  const ticketStatusOptions = ref([]);
  const sentimentOptions = Object.keys(SENTIMENT_TYPE).map((key) => ({
    label: SENTIMENT_TYPE_LABELS[SENTIMENT_TYPE[key]] || SENTIMENT_TYPE[key],
    value: key.toLowerCase(),
  }));
  const contentTypeOptions = ref([]);
  const platformOptions = ref([]);
  const sourceTypeList = ref([]);
  const countryOptions = ref([]);
  const executorOptions = ref([]);
  const viewThresholdOptions = [
    { label: '< 5', value: 'lt5' },
    { label: '5 - 50', value: 'lt50' },
    { label: '> 50', value: 'gt50' },
  ];
  const ticketCreatedOptions = TICKET_CREATED_OPTIONS.filter((item) => item.value !== 'all');
  const statusMapRef = ref(TICKET_STATUS_LABELS);
  const COUNTRY_LABELS = computed(() =>
    countryOptions.value.reduce((acc, item) => {
      acc[item.value] = item.label;
      return acc;
    }, {})
  );
  const buildOptions = (list, labelMap = {}) =>
    (list || []).map((value) => ({
      label: labelMap[value] || value,
      value,
    }));
  const buildDictOptions = (list) =>
    (list || []).map((item) => ({
      label: item?.desc || item?.name || item?.label || item?.value || '',
      value: item?.value || item?.label || item?.desc || item?.name || '',
    }));
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

  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      pageSizeOption,
      handlePageSizeChange,
      handleCurrentChange,
    },
    listData,
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList({
    searchDefaults: {
      uniqueCode: '',
      title: '',
      sentimentList: ['negative'],
      orderLevelList: [],
      problemCategory: [],
      productTag: [],
      classification: [CLASSIFICATION_TYPE.SNS],
      contentTypeList: [],
      relevanceList: [],
      dataSourceList: [],
      regionList: [],
      coveredNum: '',
      isWorkOrder: '',
      status: '',
      publishTimeStart: defaultTimeRange[0],
      publishTimeEnd: defaultTimeRange[1],
    },
    pageSize: 10,
    service: querySentimentList,
    interceptSearchData: (data) => {
      const [productLevel1, productLevel2, productLevel3, productLevel4, productLevel5] =
        buildProductLevelPayload(data.productTag);
      const classificationValue = Array.isArray(data.classification)
        ? data.classification[data.classification.length - 1]
        : data.classification;
      const classificationLabel = CLASSIFICATION_LABELS[classificationValue] || classificationValue;
      return {
        ...data,
        productLevel1,
        productLevel2,
        productLevel3,
        productLevel4,
        productLevel5,
        classification: classificationLabel,
      };
    },
    watchSearchKeys: [
      'uniqueCode',
      'title',
      'sentimentList',
      'orderLevelList',
      'problemCategory',
      'productTag',
      'classification',
      'contentTypeList',
      'relevanceList',
      'dataSourceList',
      'regionList',
      'coveredNum',
      'isWorkOrder',
      'status',
      'publishTimeStart',
      'publishTimeEnd',
    ],
  });

  const classificationTab = computed({
    get: () => search.classification[0] || CLASSIFICATION_TYPE.SNS,
    set: (val) => {
      search.classification = [val];
      if (val === CLASSIFICATION_TYPE.SNS) {
        search.relevanceList = [];
      }
    },
  });

  const isSocialTab = computed(() => classificationTab.value === CLASSIFICATION_TYPE.SNS);

  // 处理标签显示
  const selectedList = computed(() => {
    const list = [];
    // 仅展示“更多筛选（more-filter）”中的筛选项
    const mapping = {
      title: { label: '内容标题' },
      relevanceList: { label: '相关性', options: relevanceOptionsRef.value },
      dataSourceList: { label: '平台', options: platformOptions.value },
      regionList: { label: '国家地区', options: countryOptions.value },
    };

    Object.keys(mapping).forEach((key) => {
      const val = search[key];
      if (!val || (Array.isArray(val) && val.length === 0)) return;
      if (isSocialTab.value && key === 'relevanceList') return;

      const conf = mapping[key];
      let displayValue = val;
      if (conf.options) {
        if (Array.isArray(val)) {
          displayValue = val
            .map((v) => conf.options.find((o) => o.value === v)?.label || v)
            .join(', ');
        } else {
          displayValue = conf.options.find((o) => o.value === val)?.label || val;
        }
      }
      list.push({ label: conf.label, key, value: displayValue });
    });

    return list;
  });

  const statusClassMap = {
    0: 'processing',
    1: 'resolved',
    4: 'no-need',
    processing: 'processing',
    resolved: 'resolved',
    no_need: 'no-need',
  };
  const mapStatusLabel = (label) => {
    if (label === '进行中') return '处理中';
    if (label === '已解决' || label === '无需处理' || label === '无需解决') return '已处理';
    return label || '';
  };
  const isHandledStatus = (status) => status === 1 || status === 4;
  const getWorkOrderStatus = (row) => {
    const list = row.workOrderList || [];
    if (list.some((ticket) => ticket.status === 0)) return 0;
    if (list.every((ticket) => isHandledStatus(ticket.status))) return 1;
    return 4;
  };

  const getWorkOrderStatusDesc = (row) => {
    const status = getWorkOrderStatus(row);
    const list = row.workOrderList || [];
    let target = find(list, (ticket) => ticket.status === status);
    if (!target && status === 1) {
      target = find(list, (ticket) => ticket.status === 4);
    }
    const mapped = mapStatusLabel(target?.statusDesc);
    if (mapped) return mapped;
    if (status === 0) return '处理中';
    if (status === 1) return '已处理';
    if (status === 4) return '未创建工单';
    return '';
  };

  const getTicketStatusText = (row) => {
    const statusLabel = getWorkOrderStatusDesc(row);
    const handledCount = (row.workOrderList || []).filter((ticket) => ticket.status !== 0).length;
    const totalCount = (row.workOrderList || []).length;
    if (totalCount > 0) {
      return `${statusLabel} (${handledCount}/${totalCount})`;
    }
    return statusLabel;
  };

  const hasWorkOrders = (row) => !isEmpty(row.workOrderList);

  const isTicketOverdue = (ticket) => ticket?.timeLimitFlag === 1;

  const hasOverdueWorkOrder = (row) => (row.workOrderList || []).some(isTicketOverdue);

  const getStatusClass = (row) => {
    const status = getWorkOrderStatus(row);
    if (status === 0) return 'processing';
    if (status === 1) return 'resolved';
    if (status === 4) return 'no-need';
    return '';
  };

  const formatPublishTime = (time) => dayjs(time).format('YYYY-MM-DD HH:mm');
  const isNegativeRow = (row) => row.sentimentDesc === '负向';
  const shouldShowCoveredPercent = (row) =>
    isNegativeRow(row) && row.coveredNum > 50 && row.coveredNumPercent > 100;
  const shouldShowLcrPercent = (row) =>
    isNegativeRow(row) && row.likeCommentReposts > 50 && row.lcrPercent > 100;

  const authorVerifiedIcon = new URL('./assets/svgs/author-verified.svg', import.meta.url).href;

  const handleTimeChange = (val) => {
    search.publishTimeStart = val?.[0] || '';
    search.publishTimeEnd = val?.[1] || '';
  };

  const handleResetSearch = () => {
    if (!isEmpty(route.query)) {
      void router.replace({
        path: route.path,
        query: {},
      });
    }
    resetSearch();
    search.sentimentList = ['negative'];
    time.value = defaultRange();
    handleTimeChange(time.value);
  };

  const getSourceTypeDictCode = (classification = classificationTab.value) => {
    if (classification === CLASSIFICATION_TYPE.SNS) return 'opinion_media_platform';
    if (classification === CLASSIFICATION_TYPE.NEWS) return 'opinion_new_platform';
    return 'opinion_media_platform';
  };

  const loadFilterDictOptions = async (classification = classificationTab.value) => {
    const platformDictCode = getSourceTypeDictCode(classification);
    const res = await platformApi.platformDict({
      dictCodes: [platformDictCode, 'opinion_content_type', 'opinion_country', 'opinion_relevance'],
    });
    sourceTypeList.value = buildDictOptions(res?.dictMap?.[platformDictCode]).filter(
      (item) => item.label && item.value
    );
    contentTypeOptions.value = buildDictOptions(res?.dictMap?.opinion_content_type).filter(
      (item) => item.label && item.value
    );
    countryOptions.value = buildDictOptions(res?.dictMap?.opinion_country).filter(
      (item) => item.label && item.value
    );
    relevanceOptionsRef.value = buildDictOptions(res?.dictMap?.opinion_relevance).filter(
      (item) => item.label && item.value
    );
    platformOptions.value = sourceTypeList.value;
  };

  const loadTabParams = async (name) => {
    try {
      const [params] = await Promise.all([
        queryOpinionParamList({
          classification: CLASSIFICATION_LABELS[name],
        }),
        loadFilterDictOptions(name),
      ]);
      if (classificationTab.value !== name) return;
      statusMapRef.value = params?.statusMap || statusMapRef.value;
      ticketStatusOptions.value = [
        { label: '已处理', value: 1 },
        { label: '处理中', value: 0 },
        { label: '未创建工单', value: -1 },
      ];
    } catch (error) {
      console.error('切换 tab 加载参数失败:', error);
    }
  };

  const handleTabChange = (name) => {
    loadTabParams(name);
    resetSearch();
    search.classification = [name];
    search.sentimentList = ['negative'];
    time.value = defaultRange();
    handleTimeChange(time.value);
    classificationTab.value = name;
  };

  const resetSearchByKey = (key) => {
    if (key === 'time') {
      time.value = defaultRange();
      handleTimeChange(time.value);
      return;
    }
    if (key in search) {
      search[key] = Array.isArray(search[key]) ? [] : '';
    }
  };

  const handleShowDetail = (row) => {
    openLogDialog(getWorkOrderCode(row), row);
  };

  const handleOpenProcess = (row) => {
    handleDialogTicketId.value = row.uniqueCode;
    handleDialogRow.value = row;
    handleDialogVisible.value = true;
  };

  const handleOpenCreate = (row) => {
    createDialogRow.value = row;
    createDialogVisible.value = true;
  };

  const handleOpenUrl = (url) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  const resetTranslationResult = (row) => {
    translationResult.sourceText = row?.title || '';
    translationResult.sourceLang = '';
    translationResult.translatedText = '';
    translationResult.errorMessage = '';
  };

  const invalidateTranslationRequest = () => {
    translationRequestId.value += 1;
    translationLoading.value = false;
  };

  const handleTranslate = async (row) => {
    const opinionUniqueCode = row?.uniqueCode;
    if (!opinionUniqueCode) {
      ElMessage.warning('缺少舆情唯一标识，无法翻译');
      return;
    }

    const requestId = translationRequestId.value + 1;
    translationRequestId.value = requestId;
    resetTranslationResult(row);
    translationDialogVisible.value = true;
    translationLoading.value = true;
    try {
      const result = await translateSubmit({
        opinionUniqueCode,
        content: translationResult.sourceText,
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

  const handleSubmitProcess = async (payload) => {
    const result = await handleTicketAction(payload);
    if (result && handleDialogRow.value) {
      Object.assign(handleDialogRow.value, result);
    }
    handleDialogVisible.value = false;
    ElMessage.success('操作成功');
    refreshList();
  };

  const handleCreateTicketSuccess = (payload) => {
    if (createDialogRow.value) {
      createDialogRow.value.status = 0;
      createDialogRow.value.statusDesc = '处理中';
      createDialogRow.value.executorName = payload.executorName;
      createDialogRow.value.executorCode = payload.executorCode;
      createDialogRow.value.solutionList = payload.solutions;
      createDialogRow.value.deadlineTime = payload.deadline;
      createDialogRow.value.deadlineTimeDesc = formatDeadline(payload.deadline);
      createDialogRow.value.remark = payload.remark;
    }
    createDialogVisible.value = false;
    refreshList();
  };

  const handleViewTicketLog = (ticketId) => {
    suppressTicketStatusPopoverAutoHide.value = false;
    activeTicketStatusPopoverKey.value = '';
    Object.keys(ticketStatusPopoverVisibleMap).forEach((key) => {
      ticketStatusPopoverVisibleMap[key] = false;
    });
    logDialogVisible.value = false;
    router.push({
      name: 'alarmOrder',
      query: { workOrderCode: ticketId, classification: classificationTab.value },
    });
  };

  const handleTicketStatusPopoverVisibleChange = (popoverKey, visible) => {
    if (!popoverKey) return;

    if (!visible && suppressTicketStatusPopoverAutoHide.value) {
      return;
    }

    if (!visible && activeTicketStatusPopoverKey.value === popoverKey && logDialogVisible.value) {
      return;
    }

    if (visible) {
      Object.keys(ticketStatusPopoverVisibleMap).forEach((key) => {
        ticketStatusPopoverVisibleMap[key] = false;
      });
      ticketStatusPopoverVisibleMap[popoverKey] = true;
      return;
    }

    ticketStatusPopoverVisibleMap[popoverKey] = false;
  };

  watch(
    () => translationDialogVisible.value,
    (visible) => {
      if (!visible) {
        invalidateTranslationRequest();
      }
    }
  );

  watch(
    () => logDialogVisible.value,
    async (visible, prevVisible) => {
      if (prevVisible && !visible) {
        const popoverKey = activeTicketStatusPopoverKey.value;
        activeTicketStatusPopoverKey.value = '';
        if (!popoverKey) return;
        await nextTick();
        setTimeout(() => {
          ticketStatusPopoverVisibleMap[popoverKey] = true;
        }, 0);
        setTimeout(() => {
          suppressTicketStatusPopoverAutoHide.value = false;
        }, 350);
      }
    }
  );

  const openLogDialog = async (ticketId, row = null, popoverKey = '') => {
    if (!ticketId) return;
    logDialogTicketId.value = ticketId;
    logDialogRow.value = row;
    activeTicketStatusPopoverKey.value = popoverKey || '';
    if (popoverKey) {
      suppressTicketStatusPopoverAutoHide.value = true;
      ticketStatusPopoverVisibleMap[popoverKey] = true;
    }
    logDialogVisible.value = true;
    logDialogLoading.value = true;
    try {
      logDialogLogs.value = await queryTicketLogs(ticketId);
    } finally {
      logDialogLoading.value = false;
    }
  };

  const getWorkOrderCode = (row) => row.workOrderCode || row.workOrderList?.[0]?.workOrderCode;
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

  const hasRowSummary = (row) => Boolean(String(row?.contentSummary || '').trim());

  const hasRowTags = (row) => {
    const productTag = String(row?.productTag || '').trim();
    const prTags = parsePrTagList(row?.prTagStr);
    return Boolean(productTag) || prTags.length > 0 || Number(row?.extraTagsCount) > 0;
  };

  const handleLogHandleTicket = () => {
    handleDialogTicketId.value = logDialogTicketId.value;
    handleDialogRow.value = logDialogRow.value;
    handleDialogVisible.value = true;
  };

  // 初始化加载字典
  onMounted(async () => {
    try {
      const [params, categories, employees] = await Promise.all([
        queryOpinionParamList({ classification: CLASSIFICATION_LABELS[classificationTab.value] }),
        getCategoryDict(),
        getEmployeeList(),
        loadFilterDictOptions(classificationTab.value),
      ]);
      statusMapRef.value = params?.statusMap || statusMapRef.value;
      ticketStatusOptions.value = [
        { label: '已处理', value: 1 },
        { label: '处理中', value: 0 },
        { label: '未创建工单', value: -1 },
      ];
      categoryOptions.value = categories?.tagTreeList || [];
      executorOptions.value = employees?.executorBeanList || [];
      if (route.query.status !== undefined) {
        search.status = Number(route.query.status);
      }
    } catch (error) {
      console.error('加载字典失败:', error);
    }
  });

  const buildExportPayload = () => {
    const interactionRangeMap = {
      lt5: '0-4',
      lt50: '5-50',
      gt50: '51',
    };
    const interactionRange = interactionRangeMap[search.coveredNum];
    const workOrderFlag =
      search.isWorkOrder === 'yes' ? 1 : search.isWorkOrder === 'no' ? 0 : undefined;
    const dataSourceList = isEmpty(search.dataSourceList) ? undefined : search.dataSourceList;
    const classificationValue = Array.isArray(search.classification)
      ? search.classification[search.classification.length - 1]
      : search.classification;
    const classificationLabel = CLASSIFICATION_LABELS[classificationValue] || classificationValue;
    const [productLevel1, productLevel2, productLevel3, productLevel4, productLevel5] =
      buildProductLevelPayload(search.productTag);
    return {
      pageNum: current.value,
      pageSize: pageSize.value,
      uniqueCode: search.uniqueCode,
      title: search.title,
      sentimentList: search.sentimentList,
      levelList: search.orderLevelList,
      prTagList: getLeafValues(search.problemCategory),
      productLevel1,
      productLevel2,
      productLevel3,
      productLevel4,
      productLevel5,
      contentTypeList: search.contentTypeList,
      relevanceList: search.relevanceList,
      countryList: search.regionList,
      interactionRange,
      dataSourceList,
      publishStartDate: search.publishTimeStart,
      publishEndDate: search.publishTimeEnd,
      status: search.status,
      workOrderFlag,
      classification: classificationLabel,
    };
  };

  const handleExport = async () => {
    try {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      const result = await exportOpinionData(buildExportPayload());
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
      ElMessage.error(error.message || '导出失败');
    }
  };

  // handleTimeChange(time.value);
</script>

<style scoped lang="scss">
  @use './styles/table.scss';

  .ticket-id {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .ticket-id__text {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ticket-id span {
    word-break: break-all;
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

  .row-title {
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    color: #262626;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

  .cell-text {
    font-size: 12px;
    line-height: 20px;
    color: #262626;
    white-space: nowrap;
  }

  .sentiment-pill,
  .priority-pill {
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
    background: #f0fff6;
    color: #02b96b;
  }

  .sentiment-pill.neutral {
    background: #e8f4ff;
    color: #258dff;
  }

  .priority-pill {
    background: #f4f5f5;
    color: #1f1f1f;
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

  .log-action {
    padding: 0;
  }

  .action-cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }

  .handle-action {
    padding: 0;
  }

  .create-action {
    display: inline-flex;
    align-items: center;
    padding-top: 4px;
    color: #02b96b;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    user-select: none;
  }

  .create-action:hover {
    opacity: 0.85;
  }

  .create-action:active {
    opacity: 0.75;
  }

  .create-action:focus-visible {
    outline: 2px solid rgba(2, 185, 107, 0.35);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .whitebg {
    background-color: white;
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

  :deep(.head-tools > .el-tooltip),
  :deep(.head-tools > .split-line),
  :deep(.head-tools > i.icon-shuaxinjiazai) {
    display: none !important;
  }

  .overdue-icon {
    margin-left: 4px;
    font-size: 14px;
    color: #f53f3f;
    margin-top: -2px;
    vertical-align: middle;
  }

  .status-text {
    font-size: 12px;
    line-height: 20px;
    display: inline-flex;
    align-items: center;
  }

  .status-text.processing {
    color: #258dff;
  }

  .status-text.resolved {
    color: #02b96b;
  }

  .status-text.no-need {
    color: #262626;
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

  .sentiment-more-filter-item {
    .el-form-item__content {
      width: 226px !important;
    }
    .el-select,
    .el-select-v2,
    .el-input {
      width: 100% !important;
    }
  }

  .el-popover .more-filter-content:has(.sentiment-more-filter-item) {
    width: 750px !important;
    max-width: 750px !important;
  }
</style>
