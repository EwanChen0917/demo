<template>
  <AiImageDrawerShell
    v-model="visible"
    title="创建任务"
    :loading="optionsLoading"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close-button="false"
    @close="handleRequestClose"
  >
    <template #header-close>
      <el-popover
        v-model:visible="closeConfirmVisible"
        trigger="manual"
        placement="bottom-end"
        :teleported="false"
        popper-class="ai-create-task__close-popover"
      >
        <template #reference>
          <button
            class="ai-create-task__close-trigger"
            type="button"
            aria-label="关闭创建任务"
            @click="handleRequestClose"
          >
            <span></span>
          </button>
        </template>

        <div class="ai-create-task__close-confirm">
          <div class="ai-create-task__close-confirm-main">
            <div class="ai-create-task__close-confirm-icon">
              <el-icon><WarningFilled /></el-icon>
            </div>
            <div class="ai-create-task__close-confirm-text">
              <h4>确定退出创建任务?</h4>
              <p>退出后，填写的内容将被清空</p>
            </div>
          </div>
          <div class="ai-create-task__close-confirm-actions">
            <el-button @click="closeConfirmVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirmClose">确定</el-button>
          </div>
        </div>
      </el-popover>
    </template>

    <div class="ai-create-task">
      <div class="ai-create-task__main">
        <section class="ai-create-task__section">
          <h3>活动信息</h3>
          <FormLabel required>场景选择</FormLabel>
          <el-select v-model="form.sceneType" placeholder="请选择" @change="handleSceneChange">
            <el-option
              v-for="item in sceneTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <template v-if="sceneFlavor === 'promotion'">
            <FormLabel required>活动名称</FormLabel>
            <el-input v-model="form.activityName" placeholder="请输入" maxlength="50" clearable />

            <FormLabel required>活动周期</FormLabel>
            <el-select v-model="form.activityPeriod" placeholder="请选择">
              <el-option
                v-for="item in periodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <FormLabel required>活动折扣</FormLabel>
            <div class="ai-create-task__discount" :class="{ 'is-error': showDiscountError }">
              <el-input
                v-model="form.discountInfo"
                placeholder="请输入"
                inputmode="numeric"
                maxlength="3"
                @input="handleDiscountInput"
                @blur="handleDiscountBlur"
              >
                <template #suffix>%</template>
              </el-input>
              <p v-if="showDiscountError" class="ai-create-task__field-error">
                {{ discountErrorMessage }}
              </p>
            </div>
          </template>

          <template v-else-if="sceneFlavor === 'newProduct'">
            <FormLabel required>内容方向</FormLabel>
            <el-input
              v-model="form.contentDirection"
              placeholder="请输入"
              maxlength="50"
              clearable
            />

            <FormLabel>组别</FormLabel>
            <el-input v-model="form.sceneGroup" placeholder="请输入" maxlength="50" clearable />
          </template>

          <template v-else>
            <FormLabel required>日常推广内容方向</FormLabel>
            <el-input
              v-model="form.contentDirection"
              placeholder="请输入"
              maxlength="50"
              clearable
            />
          </template>

          <FormLabel>活动描述</FormLabel>
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="在任务管理页面展示，便于后续了解任务情况（选填）"
            :rows="3"
            maxlength="100"
            show-word-limit
          />
        </section>

        <section class="ai-create-task__section">
          <h3>广告信息</h3>
          <FormLabel required>投放渠道</FormLabel>
          <el-select
            v-model="form.channelList"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <div v-if="channelSizeGroups.length" class="ai-create-task__sizes">
            <div v-for="group in channelSizeGroups" :key="group.channel">
              <p>{{ group.channel }}</p>
              <span>{{ group.sizes.join(' | ') }}</span>
            </div>
          </div>

          <FormLabel required>产品图来源</FormLabel>
          <el-select v-model="form.imageSource" placeholder="请选择">
            <el-option
              v-for="item in productImageSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <FormLabel required>
            条件组
            <button class="ai-create-task__label-action" type="button" @click="addConditionGroup">
              + 添加组
            </button>
          </FormLabel>
          <div class="ai-create-task__condition-list">
            <div
              v-for="(group, index) in conditionGroups"
              :key="group.id"
              class="ai-create-task__condition"
            >
              <el-select v-model="group.groupType" placeholder="视觉">
                <el-option
                  v-for="item in conditionGroupOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-model="group.groupCount"
                :min="1"
                :max="10"
                :controls="false"
                placeholder="请输入"
              />
              <el-tooltip v-if="conditionGroups.length > 1" content="删除" placement="top">
                <button
                  type="button"
                  class="ai-create-task__remove"
                  aria-label="删除"
                  @click="removeConditionGroup(index)"
                >
                  <i class="Root-tyicon icon-Root-tyshanchu"></i>
                </button>
              </el-tooltip>
            </div>
          </div>

          <FormLabel required>语言</FormLabel>
          <el-select
            v-model="form.languageList"
            multiple
            collapse-tags
            collapse-tags-tooltip
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in languageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <FormLabel required>任务所属阶段</FormLabel>
          <el-select v-model="form.taskStage" placeholder="请选择">
            <el-option
              v-for="item in stageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <FormLabel required>设计师 (仅可输入2位大写英文字母)</FormLabel>
          <el-input
            :model-value="form.designerName"
            placeholder="请输入设计师"
            maxlength="2"
            @input="handleDesignerInput"
            @blur="handleDesignerBlur"
          />
        </section>
      </div>

      <aside class="ai-create-task__side">
        <div class="ai-create-task__side-head">
          <span>新增任务（{{ taskList.length }}）</span>
          <button type="button" class="ai-create-task__side-add" @click="addTask">
            + 新增任务
          </button>
        </div>

        <div class="ai-create-task__task-list">
          <div v-for="(task, taskIndex) in taskList" :key="task.id" class="ai-create-task__task">
            <div class="ai-create-task__task-head">
              <span>任务 {{ taskIndex + 1 }} - 产品信息</span>
              <div v-if="taskList.length > 1" class="ai-create-task__task-actions">
                <el-tooltip content="上移" placement="top">
                  <span class="ai-create-task__task-action-wrap">
                    <button
                      type="button"
                      class="ai-create-task__task-icon"
                      :disabled="taskIndex === 0"
                      @click="moveTask(taskIndex, -1)"
                    >
                      <el-icon><Upload /></el-icon>
                    </button>
                  </span>
                </el-tooltip>
                <span class="ai-create-task__task-divider"></span>
                <el-tooltip content="下移" placement="top">
                  <span class="ai-create-task__task-action-wrap">
                    <button
                      type="button"
                      class="ai-create-task__task-icon"
                      :disabled="taskIndex === taskList.length - 1"
                      @click="moveTask(taskIndex, 1)"
                    >
                      <el-icon><Download /></el-icon>
                    </button>
                  </span>
                </el-tooltip>
                <span class="ai-create-task__task-divider"></span>
                <el-tooltip content="删除" placement="top">
                  <span class="ai-create-task__task-action-wrap">
                    <button
                      type="button"
                      class="ai-create-task__task-icon is-danger"
                      aria-label="删除"
                      @click="removeTask(taskIndex)"
                    >
                      <i class="Root-tyicon icon-Root-tyshanchu"></i>
                    </button>
                  </span>
                </el-tooltip>
              </div>
            </div>
            <div
              v-for="(product, productIndex) in task.products"
              :key="product.id"
              class="ai-create-task__product"
            >
              <div
                class="ai-create-task__product-row"
                :class="{ 'has-remove': task.products.length > 1 }"
              >
                <el-select
                  v-model="product.categoryCode"
                  class="ai-create-task__product-select is-category"
                  remote
                  clearable
                  filterable
                  placeholder="品类"
                  :suffix-icon="ArrowDown"
                  :loading="product.categoryState.loading"
                  :remote-method="(keyword) => handleCategoryRemote(product, keyword)"
                  @visible-change="(opened) => handleCategoryVisible(product, opened)"
                  @change="() => handleCategoryChange(product)"
                >
                  <el-option
                    v-for="item in product.categoryState.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                  <div
                    v-if="hasMore(product.categoryState)"
                    class="ai-create-task__load-more"
                    @mousedown.prevent
                    @click.stop="loadMoreCategory(product)"
                  >
                    加载更多
                  </div>
                  <template #empty>
                    <div
                      v-if="isSelectLoading(product.categoryState)"
                      class="ai-create-task__select-loading"
                    >
                      <!-- <el-icon class="is-loading"><Loading /></el-icon> -->
                      <span>数据加载中</span>
                    </div>
                    <span v-else class="ai-create-task__select-empty">暂无数据</span>
                  </template>
                </el-select>
                <el-select
                  v-model="product.spuCode"
                  class="ai-create-task__product-select is-spu"
                  remote
                  clearable
                  filterable
                  placeholder="产品SPU"
                  :suffix-icon="ArrowDown"
                  :disabled="!product.categoryCode"
                  :loading="product.spuState.loading"
                  :remote-method="(keyword) => handleSpuRemote(product, keyword)"
                  @visible-change="(opened) => handleSpuVisible(product, opened)"
                  @change="() => handleSpuChange(product)"
                >
                  <el-option
                    v-for="item in product.spuState.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                  <div
                    v-if="hasMore(product.spuState)"
                    class="ai-create-task__load-more"
                    @mousedown.prevent
                    @click.stop="loadMoreSpu(product)"
                  >
                    加载更多
                  </div>
                  <template #empty>
                    <div
                      v-if="isSelectLoading(product.spuState)"
                      class="ai-create-task__select-loading"
                    >
                      <!-- <el-icon class="is-loading"><Loading /></el-icon> -->
                      <span>数据加载中</span>
                    </div>
                    <span v-else class="ai-create-task__select-empty">暂无数据</span>
                  </template>
                </el-select>
                <el-tooltip v-if="task.products.length > 1" content="删除" placement="top">
                  <button
                    class="ai-create-task__product-remove"
                    type="button"
                    aria-label="删除"
                    @click="removeProduct(task, productIndex)"
                  >
                    <i class="Root-tyicon icon-Root-tyshanchu"></i>
                  </button>
                </el-tooltip>
              </div>
            </div>
            <button
              class="ai-create-task__add-product"
              type="button"
              :disabled="task.products.length >= MAX_PRODUCT_COUNT"
              @click="addProduct(task)"
            >
              + 添加产品
            </button>
          </div>
        </div>
      </aside>
    </div>

    <template #footer>
      <el-button @click="handleRequestClose">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">确认创建</el-button>
    </template>
  </AiImageDrawerShell>
</template>

<script setup lang="ts">
  import { computed, defineComponent, h, nextTick, reactive, ref, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import { ArrowDown, Upload, Download, WarningFilled } from '@element-plus/icons-vue';
  import { aiGenerateImageApi } from '@/api';
  import type { AiGenerateImageContracts, ProductContracts } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import AiImageDrawerShell from './AiImageDrawerShell.vue';
  import {
    DEFAULT_CHANNEL_SIZE_MAPPING,
    DEFAULT_CONDITION_GROUP_OPTIONS,
    getChannelSizeList,
  } from '../constants';
  import useTaskFormOptions from '../hooks/useTaskFormOptions';
  import {
    createPagedSelectState,
    useProductSelectOptions,
    type PagedSelectState,
  } from '../hooks/useProductSelectOptions';
  import useDesignerOptions from '../hooks/useDesignerOptions';
  import type { AiImageOpenStage } from '../types';

  type SceneFlavor = 'normal' | 'promotion' | 'newProduct';

  interface ConditionGroupForm {
    id: number;
    groupType: string;
    groupCount: number;
  }

  interface ProductFormItem {
    id: number;
    categoryCode?: string;
    categoryName?: string;
    spuCode?: string;
    spuName?: string;
    categoryState: PagedSelectState;
    spuState: PagedSelectState;
  }

  interface TaskFormItem {
    id: number;
    products: ProductFormItem[];
  }

  interface CreateTaskDraft {
    version: 1;
    form: {
      sceneType?: number;
      activityName: string;
      activityPeriod: string;
      discountInfo: string;
      contentDirection: string;
      sceneGroup: string;
      description: string;
      channelList: string[];
      imageSource: string;
      languageList: string[];
      taskStage?: number;
      designerCode: string;
      designerName: string;
      materialType: number;
    };
    conditionGroups: Array<Pick<ConditionGroupForm, 'groupType' | 'groupCount'>>;
  }

  const DRAFT_CACHE_KEY = 'aiGenerateImage:createTaskDraft';
  const MAX_PRODUCT_COUNT = 9;
  const DESIGNER_CODE_REGEXP = /^[A-Z]{2}$/;

  const FormLabel = defineComponent({
    props: {
      required: Boolean,
    },
    setup(props, { slots }) {
      return () =>
        h('div', { class: ['ai-create-task__label', { 'is-required': props.required }] }, [
          slots.default?.(),
        ]);
    },
  });

  const emit = defineEmits<{
    (e: 'success'): void;
    (e: 'createdSingle', taskCode: string, openStage: AiImageOpenStage): void;
  }>();

  const {
    loading: optionsLoading,
    formOptions,
    sceneTypeOptions,
    stageOptions,
    materialTypeOptions,
    languageOptions,
    periodOptions,
    productImageSourceOptions,
    channelOptions,
    ensureOptions,
  } = useTaskFormOptions();
  const { optionMap: designerOptionMap } = useDesignerOptions();
  const {
    hasMore,
    prefetchCategoryFirstPage,
    applyCategoryCache,
    resetCategoryCache,
    queryCategoryOptions,
    querySpuOptions,
  } = useProductSelectOptions();
  const { wsCache } = useCache('localStorage');

  const visible = ref(false);
  const submitting = ref(false);
  const uid = ref(0);
  const isApplyingDraft = ref(false);
  const discountTouched = ref(false);
  const submitAttempted = ref(false);
  const closeConfirmVisible = ref(false);

  const form = reactive({
    sceneType: undefined as number | undefined,
    activityName: '',
    activityPeriod: '',
    discountInfo: '',
    contentDirection: '',
    sceneGroup: '',
    description: '',
    channelList: [] as string[],
    imageSource: '',
    languageList: [] as string[],
    taskStage: undefined as number | undefined,
    designerCode: '',
    designerName: '',
    materialType: 1,
  });

  const conditionGroups = ref<ConditionGroupForm[]>([]);
  const taskList = ref<TaskFormItem[]>([]);
  const conditionGroupOptions = DEFAULT_CONDITION_GROUP_OPTIONS;
  const isSelectLoading = (state: PagedSelectState) => state.loading || state.fetching;

  const createId = () => {
    uid.value += 1;
    return uid.value;
  };

  const createProduct = (): ProductFormItem => ({
    id: createId(),
    categoryCode: undefined,
    categoryName: '',
    spuCode: undefined,
    spuName: '',
    categoryState: createPagedSelectState(),
    spuState: createPagedSelectState(),
  });

  const createTask = (): TaskFormItem => ({
    id: createId(),
    products: [createProduct()],
  });

  const createDefaultConditionGroup = (): ConditionGroupForm => ({
    id: createId(),
    groupType: DEFAULT_CONDITION_GROUP_OPTIONS[0].value,
    groupCount: 1,
  });

  const sceneFlavor = computed<SceneFlavor>(() => {
    const selected = sceneTypeOptions.value.find((item) => item.value === form.sceneType);
    const label = selected?.label || '';
    if (label.includes('促销')) return 'promotion';
    if (label.includes('新品')) return 'newProduct';
    return 'normal';
  });

  const channelSizeGroups = computed(() => {
    const mapping = formOptions.value.channelSizeMapping || DEFAULT_CHANNEL_SIZE_MAPPING;
    return form.channelList
      .map((channel) => ({
        channel,
        sizes: getChannelSizeList(channel, mapping),
      }))
      .filter((item) => item.sizes.length);
  });

  const selectedSizeList = computed(() => {
    const sizes = channelSizeGroups.value.flatMap((group) => group.sizes);
    return Array.from(new Set(sizes.length ? sizes : formOptions.value.allSizeList || []));
  });

  const applyDefaults = () => {
    if (!form.sceneType && sceneTypeOptions.value[0])
      form.sceneType = sceneTypeOptions.value[0].value;
    if (!form.taskStage && stageOptions.value[0]) form.taskStage = stageOptions.value[0].value;
    if (!form.materialType && materialTypeOptions.value[0]) {
      form.materialType = materialTypeOptions.value[0].value;
    }
    if (!form.imageSource && productImageSourceOptions.value[0]) {
      form.imageSource = productImageSourceOptions.value[0].value;
    }
  };

  const buildDraft = (): CreateTaskDraft => ({
    version: 1,
    form: {
      sceneType: form.sceneType,
      activityName: form.activityName,
      activityPeriod: form.activityPeriod,
      discountInfo: form.discountInfo,
      contentDirection: form.contentDirection,
      sceneGroup: form.sceneGroup,
      description: form.description,
      channelList: [...form.channelList],
      imageSource: form.imageSource,
      languageList: [...form.languageList],
      taskStage: form.taskStage,
      designerCode: form.designerCode,
      designerName: form.designerName,
      materialType: form.materialType,
    },
    conditionGroups: conditionGroups.value.map((item) => ({
      groupType: item.groupType,
      groupCount: item.groupCount,
    })),
  });

  const saveDraft = () => {
    if (!visible.value || isApplyingDraft.value) return;
    try {
      wsCache.set(DRAFT_CACHE_KEY, buildDraft());
    } catch (_e) {
      // 本地缓存失败不阻断任务创建流程。
    }
  };

  const clearDraft = () => {
    try {
      wsCache.delete(DRAFT_CACHE_KEY);
    } catch (_e) {
      // 本地缓存失败不阻断任务创建流程。
    }
  };

  const isValidDraft = (draft: unknown): draft is CreateTaskDraft => {
    if (!draft || typeof draft !== 'object') return false;
    const currentDraft = draft as Partial<CreateTaskDraft>;
    return currentDraft.version === 1 && !!currentDraft.form;
  };

  const applyDraft = (draft: CreateTaskDraft) => {
    isApplyingDraft.value = true;
    try {
      const draftConditionGroups = Array.isArray(draft.conditionGroups)
        ? draft.conditionGroups
        : [];
      Object.assign(form, {
        sceneType: draft.form.sceneType,
        activityName: draft.form.activityName || '',
        activityPeriod: draft.form.activityPeriod || '',
        discountInfo: normalizeDiscountInfo(draft.form.discountInfo || ''),
        contentDirection: draft.form.contentDirection || '',
        sceneGroup: draft.form.sceneGroup || '',
        description: draft.form.description || '',
        channelList: Array.isArray(draft.form.channelList) ? [...draft.form.channelList] : [],
        imageSource: draft.form.imageSource || '',
        languageList: Array.isArray(draft.form.languageList) ? [...draft.form.languageList] : [],
        taskStage: draft.form.taskStage,
        designerCode: normalizeDesignerCode(draft.form.designerCode || draft.form.designerName),
        designerName: normalizeDesignerCode(draft.form.designerName || draft.form.designerCode),
        materialType: draft.form.materialType || 1,
      });
      conditionGroups.value = draftConditionGroups.length
        ? draftConditionGroups.map((item) => ({
            id: createId(),
            groupType: item.groupType || DEFAULT_CONDITION_GROUP_OPTIONS[0].value,
            groupCount: Number(item.groupCount) || 1,
          }))
        : [createDefaultConditionGroup()];
    } finally {
      isApplyingDraft.value = false;
    }
  };

  const restoreDraft = () => {
    try {
      const draft = wsCache.get(DRAFT_CACHE_KEY);
      if (!isValidDraft(draft)) return;
      applyDraft(draft);
    } catch (_e) {
      // 本地缓存读取失败时使用默认表单。
    }
  };

  watch(
    () => [
      sceneTypeOptions.value.length,
      stageOptions.value.length,
      materialTypeOptions.value.length,
      productImageSourceOptions.value.length,
    ],
    () => applyDefaults()
  );

  watch([form, conditionGroups], saveDraft, { deep: true });

  const normalizeDiscountInfo = (value: string | number | undefined) => {
    const digits = String(value || '')
      .replace(/\D/g, '')
      .slice(0, 3);
    if (!digits) return '';
    return digits.length > 1 ? String(Number(digits)) : digits;
  };

  const discountErrorMessage = computed(() => {
    if (sceneFlavor.value !== 'promotion') return '';
    const normalizedValue = normalizeDiscountInfo(form.discountInfo);
    if (!normalizedValue) return '请输入活动折扣';
    const discountValue = Number(normalizedValue);
    if (!Number.isInteger(discountValue) || discountValue < 0 || discountValue > 100) {
      return '请输入0-100的整数';
    }
    return '';
  });

  const showDiscountError = computed(() => {
    return (
      sceneFlavor.value === 'promotion' &&
      (discountTouched.value || submitAttempted.value) &&
      Boolean(discountErrorMessage.value)
    );
  });

  const resetForm = () => {
    Object.assign(form, {
      sceneType: undefined,
      activityName: '',
      activityPeriod: '',
      discountInfo: '',
      contentDirection: '',
      sceneGroup: '',
      description: '',
      channelList: [],
      imageSource: '',
      languageList: [],
      taskStage: undefined,
      designerCode: '',
      designerName: '',
      materialType: 1,
    });
    discountTouched.value = false;
    submitAttempted.value = false;
    conditionGroups.value = [createDefaultConditionGroup()];
    taskList.value = [createTask()];
    nextTick(() => applyDefaults());
  };

  const open = async () => {
    resetCategoryCache();
    resetForm();
    restoreDraft();
    closeConfirmVisible.value = false;
    visible.value = true;
    await ensureOptions();
    applyDefaults();
    prefetchCategoryFirstPage();
  };

  const handleRequestClose = () => {
    if (submitting.value) return;
    closeConfirmVisible.value = true;
  };

  const handleConfirmClose = () => {
    closeConfirmVisible.value = false;
    // clearDraft();
    visible.value = false;
  };

  const handleSceneChange = () => {
    form.activityName = '';
    form.activityPeriod = '';
    form.discountInfo = '';
    discountTouched.value = false;
    submitAttempted.value = false;
    form.contentDirection = '';
    form.sceneGroup = '';
  };

  const handleDiscountInput = (value: string | number) => {
    form.discountInfo = normalizeDiscountInfo(value);
  };

  const handleDiscountBlur = () => {
    discountTouched.value = true;
    form.discountInfo = normalizeDiscountInfo(form.discountInfo);
  };

  const normalizeDesignerCode = (value: string | number | undefined) => {
    return String(value || '')
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 2);
  };

  const syncDesignerValue = (value: string | number | undefined) => {
    const normalizedValue = normalizeDesignerCode(value);
    form.designerCode = normalizedValue;
    form.designerName = normalizedValue;
  };

  const handleDesignerInput = (value: string | number) => {
    syncDesignerValue(value);
  };

  const handleDesignerBlur = () => {
    syncDesignerValue(form.designerName);
  };

  const addConditionGroup = () => {
    conditionGroups.value.push({
      id: createId(),
      groupType: DEFAULT_CONDITION_GROUP_OPTIONS[0].value,
      groupCount: 1,
    });
  };

  const removeConditionGroup = (index: number) => {
    conditionGroups.value.splice(index, 1);
  };

  const addTask = () => {
    taskList.value.push(createTask());
  };

  const removeTask = (index: number) => {
    taskList.value.splice(index, 1);
  };

  const moveTask = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= taskList.value.length) return;
    const [task] = taskList.value.splice(index, 1);
    taskList.value.splice(targetIndex, 0, task);
  };

  const addProduct = (task: TaskFormItem) => {
    if (task.products.length >= MAX_PRODUCT_COUNT) {
      ElMessage.warning(`每个任务最多只能添加${MAX_PRODUCT_COUNT}个产品`);
      return;
    }
    task.products.push(createProduct());
  };

  const removeProduct = (task: TaskFormItem, index: number) => {
    task.products.splice(index, 1);
  };

  const handleCategoryVisible = async (product: ProductFormItem, opened: boolean) => {
    if (!opened || product.categoryState.options.length) return;
    // 优先使用缓存
    if (applyCategoryCache(product.categoryState)) return;
    // 缓存未就绪时等待预加载完成
    product.categoryState.loading = true;
    await prefetchCategoryFirstPage();
    product.categoryState.loading = false;
    if (!applyCategoryCache(product.categoryState)) {
      queryCategoryOptions(product.categoryState);
    }
  };

  const handleCategoryRemote = (product: ProductFormItem, keyword: string) => {
    // 清空搜索时复用缓存，避免重复请求第一页
    if (!keyword && applyCategoryCache(product.categoryState)) return;
    queryCategoryOptions(product.categoryState, keyword);
  };

  const loadMoreCategory = (product: ProductFormItem) => {
    queryCategoryOptions(product.categoryState, product.categoryState.keyword, false);
  };

  const handleCategoryChange = (product: ProductFormItem) => {
    const selected = product.categoryState.options.find(
      (item) => item.value === product.categoryCode
    );
    const raw = selected?.raw as ProductContracts.CategoryItem | undefined;
    product.categoryName = raw?.categoryName || selected?.label || '';
    // SPU 已有选中值时才清除
    if (product.spuCode) {
      product.spuCode = undefined;
      product.spuName = '';
    }
    product.spuState = createPagedSelectState();
    if (product.categoryCode) {
      // 联动预加载对应品类的 SPU 列表，静默加载不触发 el-select loading 态
      querySpuOptions(product.spuState, product.categoryCode);
      product.spuState.loading = false;
    }
  };

  const handleSpuVisible = (product: ProductFormItem, opened: boolean) => {
    if (opened && product.categoryCode && !product.spuState.options.length) {
      querySpuOptions(product.spuState, product.categoryCode);
    }
  };

  const handleSpuRemote = (product: ProductFormItem, keyword: string) => {
    // 空关键词且已有预加载首页数据（非搜索结果）→ 直接复用，避免 loading 覆盖已有选项
    if (!keyword && product.spuState.options.length && !product.spuState.keyword) return;
    querySpuOptions(product.spuState, product.categoryCode, keyword);
  };

  const loadMoreSpu = (product: ProductFormItem) => {
    querySpuOptions(product.spuState, product.categoryCode, product.spuState.keyword, false);
  };

  const handleSpuChange = (product: ProductFormItem) => {
    const selected = product.spuState.options.find((item) => item.value === product.spuCode);
    const raw = selected?.raw as ProductContracts.ProductBean | undefined;
    product.spuName = raw?.name || selected?.label || '';
  };

  const validateForm = () => {
    syncDesignerValue(form.designerName || form.designerCode);
    if (!form.sceneType) return '请选择场景';
    if (sceneFlavor.value === 'promotion') {
      if (!form.activityName.trim()) return '请输入活动名称';
      if (!form.activityPeriod) return '请选择活动周期';
      if (discountErrorMessage.value) {
        discountTouched.value = true;
        return discountErrorMessage.value;
      }
    } else {
      if (!form.contentDirection.trim()) return '请输入内容方向';
      // if (sceneFlavor.value === 'newProduct' && !form.sceneGroup.trim()) return '请输入组别';
    }
    if (!form.channelList.length) return '请选择投放渠道';
    if (productImageSourceOptions.value.length && !form.imageSource) return '请选择产品图来源';
    if (!conditionGroups.value.length) return '请至少设置一个条件组';
    if (conditionGroups.value.some((item) => !item.groupType || !item.groupCount)) {
      return '请补全条件组';
    }
    if (!form.languageList.length) return '请选择语言';
    if (!form.taskStage) return '请选择任务所属阶段';
    if (!form.designerName) return '请输入设计师';
    if (!DESIGNER_CODE_REGEXP.test(form.designerName)) {
      return '设计师仅可输入2位大写英文字母';
    }
    if (!taskList.value.length) return '请至少新增一个任务';
    const invalidTask = taskList.value.some((task) => {
      return (
        !task.products.length ||
        task.products.some((product) => !product.categoryCode || !product.spuCode)
      );
    });
    if (invalidTask) return '请补全任务产品信息';
    const overLimitTaskIndex = taskList.value.findIndex(
      (task) => task.products.length > MAX_PRODUCT_COUNT
    );
    if (overLimitTaskIndex > -1) {
      return `任务 ${overLimitTaskIndex + 1} 最多只能添加 ${MAX_PRODUCT_COUNT} 个产品`;
    }
    const duplicateSpuTaskIndex = taskList.value.findIndex((task) => {
      const spuCodeSet = new Set<string>();
      return task.products.some((product) => {
        const { spuCode } = product;
        if (!spuCode) return false;
        if (spuCodeSet.has(spuCode)) return true;
        spuCodeSet.add(spuCode);
        return false;
      });
    });
    if (duplicateSpuTaskIndex > -1) {
      return `任务 ${duplicateSpuTaskIndex + 1} 内存在重复 SPU，请调整后再创建`;
    }
    return '';
  };

  const buildRequest = (): AiGenerateImageContracts.SaveTaskReq => {
    const designer = designerOptionMap.value[form.designerCode];
    return {
      sceneType: form.sceneType as number,
      activityName: sceneFlavor.value === 'promotion' ? form.activityName.trim() : undefined,
      activityPeriod: sceneFlavor.value === 'promotion' ? form.activityPeriod : undefined,
      discountInfo:
        sceneFlavor.value === 'promotion' ? normalizeDiscountInfo(form.discountInfo) : undefined,
      contentDirection:
        sceneFlavor.value === 'promotion' ? undefined : form.contentDirection.trim() || undefined,
      sceneGroup: sceneFlavor.value === 'newProduct' ? form.sceneGroup.trim() : undefined,
      description: form.description.trim() || undefined,
      channelList: form.channelList,
      conditionGroupList: conditionGroups.value.map((item, index) => ({
        groupType: item.groupType,
        groupCount: Number(item.groupCount),
        sortOrder: index + 1,
      })),
      // designerCode: form.designerCode,
      designerName: form.designerName || designer?.name || undefined,
      imageSource: form.imageSource || undefined,
      isAiGenerated: 1,
      languageList: form.languageList,
      materialType: form.materialType || 1,
      sizeList: selectedSizeList.value,
      taskStage: form.taskStage as number,
      taskList: taskList.value.map((task) => ({
        spuList: task.products.map((product) => ({
          categoryCode: product.categoryCode as string,
          categoryName: product.categoryName || '',
          spuCode: product.spuCode as string,
          spuName: product.spuName || '',
        })),
      })),
    };
  };

  const resolveCreatedSingleOpenStage = (): AiImageOpenStage => {
    const selectedStage = stageOptions.value.find((item) => item.value === form.taskStage);
    if (selectedStage?.label.includes('成品图')) return 'finished';
    if (selectedStage?.label.includes('扩图')) return 'expand';
    return 'original';
  };

  const handleSubmit = async () => {
    submitAttempted.value = true;
    const errorMessage = validateForm();
    if (errorMessage) {
      ElMessage.warning(errorMessage);
      return;
    }
    submitting.value = true;
    try {
      const createdSingleOpenStage = resolveCreatedSingleOpenStage();
      const res = await aiGenerateImageApi.luteosAiAdTaskSaveTask(buildRequest());
      ElMessage.success('创建成功');
      emit('success');
      const taskCodes = res.taskCodeList || [];
      clearDraft();
      submitAttempted.value = false;
      visible.value = false;
      if (taskList.value.length === 1 && taskCodes[0]) {
        emit('createdSingle', taskCodes[0], createdSingleOpenStage);
      }
    } finally {
      submitting.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .ai-create-task {
    display: grid;
    grid-template-columns: 410px 384px;
    gap: 26px;
    min-height: 100%;

    &__main {
      min-width: 0;
    }

    &__section {
      & + & {
        margin-top: 28px;
      }

      h3 {
        margin: 0 0 14px;
        color: var(--ai-drawer-text);
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
      }

      :deep(.el-input),
      :deep(.el-select),
      :deep(.el-select-v2),
      :deep(.el-textarea) {
        width: 100%;
      }

      :deep(.el-input__wrapper),
      :deep(.el-select__wrapper),
      :deep(.el-select-v2__wrapper),
      :deep(.el-textarea__inner) {
        border-radius: 4px;
        box-shadow: 0 0 0 1px var(--ai-drawer-input-border) inset;
        font-size: 12px;
      }
    }

    &__label {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      margin: 12px 0 6px;
      color: var(--ai-drawer-text);
      font-size: 12px;
      line-height: 20px;

      &.is-required::before {
        margin-right: 4px;
        color: #f56c6c;
        content: '*';
      }
    }

    &__label-action {
      margin-left: auto;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--ai-drawer-secondary-text);
      font-size: 12px;
      cursor: pointer;

      &:hover {
        color: var(--ai-drawer-primary);
      }
    }

    &__sizes {
      margin-top: 12px;
      color: var(--ai-drawer-secondary-text);

      p {
        margin: 0 0 4px;
      }

      span {
        display: block;
        margin-bottom: 10px;
        color: var(--ai-drawer-text);
      }
    }

    &__condition-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__condition {
      display: grid;
      grid-template-columns: 152px 1fr auto;
      gap: 0;

      :deep(.el-input-number) {
        width: 100%;
      }

      :deep(.el-input__wrapper),
      :deep(.el-select__wrapper) {
        border-radius: 0;
      }

      :deep(.el-select .el-select__wrapper) {
        border-radius: 4px 0 0 4px;
      }

      :deep(.el-input-number .el-input__wrapper) {
        border-radius: 0 4px 4px 0;
      }
    }

    &__remove {
      display: inline-flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(---N6, #8abf8d);
      font-size: 14px;
      cursor: pointer;
    }

    &__discount {
      :deep(.el-input__suffix-inner) {
        color: var(--ai-drawer-text);
        font-size: 12px;
      }

      &.is-error {
        :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px #f53f3f inset;
        }
      }
    }

    &__field-error {
      margin: 4px 0 0;
      color: #f53f3f;
      font-size: 12px;
      line-height: 20px;
    }

    &__side-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 22px;
      margin-bottom: 16px;
      color: var(--ai-drawer-text);
      font-size: 14px;
      font-weight: 600;

      button {
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--ai-drawer-secondary-text);
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;

        &:hover {
          color: var(--ai-drawer-primary);
        }
      }
    }

    &__task-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__task {
      padding: 16px;
      border-radius: 6px;
      background: var(--ai-drawer-fill);
    }

    &__task-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      color: #1e2226;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
    }

    &__task-actions {
      display: inline-flex;
      align-items: center;
      gap: 10px;

      button {
        padding: 0;
        border: 0;
        background: transparent;
      }
    }

    &__task-action-wrap {
      display: inline-flex;
    }

    &__task-icon {
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      color: var(--ai-drawer-secondary-text);
      font-size: 16px;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover:not(:disabled) {
        color: var(--ai-drawer-primary);
      }

      &.is-danger:hover:not(:disabled) {
        color: #f53f3f;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    &__task-divider {
      width: 1px;
      height: 12px;
      background: var(--ai-drawer-input-border);
    }

    &__product + &__product {
      margin-top: 10px;
    }

    &__product-row {
      display: grid;
      grid-template-columns: 134px minmax(0, 1fr);
      gap: 0;

      &.has-remove {
        grid-template-columns: 134px minmax(0, 1fr) 32px;
      }

      :deep(.ai-create-task__product-select.is-category .el-select__wrapper) {
        border-radius: 4px 0 0 4px;
      }

      :deep(.ai-create-task__product-select.is-spu .el-select__wrapper) {
        border-radius: 0 4px 4px 0;
      }

      &.has-remove {
        :deep(.ai-create-task__product-select.is-spu .el-select__wrapper) {
          border-radius: 0;
        }
      }
    }

    &__product-remove {
      display: inline-flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      margin-left: -1px;
      border: 1px solid var(--ai-drawer-input-border);
      border-radius: 0 4px 4px 0;
      background: #fff;
      color: var(--ai-drawer-secondary-text);
      font-size: 14px;
      transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

      &:hover {
        // border-color: #f53f3f;
        // background: rgba(245, 63, 63, 0.04);
        // color: #f53f3f;
      }
    }

    &__add-product {
      width: 100%;
      height: 32px;
      margin-top: 10px;
      border: 0;
      border-radius: 4px;
      background: #fff;
      color: var(--ai-drawer-primary);
      font-size: 12px;
      cursor: pointer;

      &:disabled {
        color: var(--ai-drawer-secondary-text);
        cursor: not-allowed;
        opacity: 0.7;
      }
    }

    &__load-more {
      height: 32px;
      color: var(--ai-drawer-primary);
      font-size: 12px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
    }

    &__select-loading,
    &__select-empty {
      display: flex;
      height: 34px;
      align-items: center;
      justify-content: center;
      color: var(--ai-drawer-secondary-text);
      font-size: 12px;
      line-height: 34px;
    }

    &__select-loading {
      gap: 6px;
    }

    &__close-trigger {
      position: relative;
      width: 20px;
      height: 20px;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;

      &::before,
      &::after {
        position: absolute;
        left: 5px;
        top: 9px;
        width: 10px;
        height: 1px;
        content: '';
        background: #b4bac2;
        transition: background 0.2s ease;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }

      &:hover::before,
      &:hover::after {
        background: var(--ai-drawer-secondary-text);
      }
    }

    &__close-confirm {
      width: 308px;
    }

    &__close-confirm-main {
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }

    &__close-confirm-icon {
      display: inline-flex;
      width: 20px;
      height: 20px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #ff9f22;
      font-size: 18px;
    }

    &__close-confirm-text {
      min-width: 0;
      color: #1e2226;

      h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
      }

      p {
        margin: 6px 0 0;
        font-size: 14px;
        line-height: 22px;
      }
    }

    &__close-confirm-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;

      :deep(.el-button) {
        height: 28px;
        padding: 0 12px;
        border-radius: 4px;
        font-size: 12px;
      }
    }
  }
</style>

<style lang="scss">
  .ai-create-task__close-popover.el-popper {
    padding: 20px;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 6px 36px rgba(6, 8, 27, 0.08);
  }

  .ai-create-task__close-popover.el-popper .el-popper__arrow::before {
    border-color: #fff;
  }
</style>
