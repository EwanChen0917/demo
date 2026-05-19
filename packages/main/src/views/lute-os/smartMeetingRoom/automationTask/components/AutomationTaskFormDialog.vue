<template>
  <el-dialog
    v-model="visible"
    :title="mode === 'add' ? '新增任务' : '编辑任务'"
    width="550px"
    :close-on-click-modal="false"
    @open="handleOpen"
    @closed="resetErrorFocus"
    append-to-body
  >
    <el-form ref="formRef" :model="form">
      <el-form-item label="任务编码">
        <el-input v-model="form.taskCode" disabled />
      </el-form-item>

      <div ref="taskNameFieldRef">
        <el-form-item
          label="任务名称"
          required
          :class="{ 'error-focus-item': activeErrorField === 'taskName' }"
        >
          <el-input
            ref="taskNameInputRef"
            v-model="taskNameModel"
            placeholder="请输入任务名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
      </div>

      <div class="step">
        <div class="step-index">1</div>
        <div class="step-body">
          <div class="step-title">触发条件：</div>
          <div
            ref="triggerBlockRef"
            class="block"
            :class="{ 'block--error': activeErrorField === 'trigger' }"
          >
            <div v-for="(c, idx) in form.triggerConditionList" :key="idx" class="row row--trigger">
              <el-select
                v-model="c.key"
                class="w-160 row-item"
                :loading="configLoading"
                @change="syncTriggerName(c)"
                clearable
              >
                <el-option
                  v-for="opt in triggerConditionOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
              <el-input-number
                v-model="c.minutes"
                class="row-item row-item--number"
                :min="1"
                :max="1440"
                :step="1"
                :step-strictly="true"
                :precision="0"
                :controls="false"
                @keydown="blockDecimalInput"
                @update:model-value="(value) => syncIntegerMinutes(c, value)"
              />
              <span class="unit">分钟</span>
              <el-button type="primary" link class="remove-btn" @click="removeTrigger(idx)">
                移除
              </el-button>
            </div>
            <el-tooltip
              content="暂不支持添加条件组合"
              :disabled="form.triggerConditionList.length < 1"
            >
              <span class="add-btn-tooltip-wrap">
                <el-button
                  type="primary"
                  plain
                  class="add-btn"
                  @click="addTrigger"
                  :disabled="form.triggerConditionList.length >= 1"
                >
                  + 添加条件
                </el-button>
              </span>
            </el-tooltip>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-index">2</div>
        <div class="step-body">
          <div class="step-title">
            <span class="required-star">*</span>
            执行动作：
          </div>
          <div
            ref="actionBlockRef"
            class="block"
            :class="{ 'block--error': activeErrorField === 'action' }"
          >
            <div v-for="(a, idx) in form.executeActionList" :key="idx" class="row row--action">
              <el-select
                v-model="a.deviceType"
                class="w-160 row-item"
                :loading="configLoading"
                @change="syncActionValue(a)"
              >
                <el-option
                  v-for="opt in actionDeviceTypeOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
              <el-select
                v-if="hasActionValueOptions(a.deviceType)"
                v-model="a.actionValue"
                class="w-160 row-item"
                :loading="configLoading"
              >
                <el-option
                  v-for="opt in actionValueOptionsByDeviceType.get(a.deviceType)"
                  :key="opt.value"
                  :label="opt.desc"
                  :value="opt.value"
                />
              </el-select>
              <el-button
                v-if="form.executeActionList.length > 1"
                type="primary"
                link
                class="remove-btn"
                @click="removeAction(idx)"
              >
                移除
              </el-button>
            </div>
            <el-button type="primary" plain class="add-btn" @click="addAction">
              + 添加动作 AND
            </el-button>
          </div>
        </div>
      </div>

      <div ref="taskStartTimeFieldRef">
        <el-form-item
          label="任务开始执行时间"
          required
          :class="{ 'error-focus-item': activeErrorField === 'taskStartTime' }"
        >
          <el-date-picker
            v-model="form.taskStartTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择开始时间"
            class="w-full"
            :disabled-date="disabledStartDate"
            :disabled-time="disabledStartTime"
            @change="clearErrorFocus('taskStartTime')"
          />
        </el-form-item>
      </div>

      <el-form-item v-if="!isOnlyReleaseMeetingActionSelected" label="任务是否需常定态" required>
        <template #label>
          <div style="display: inline-flex; align-items: center">
            <span>任务是否需常定态</span>
            <el-tooltip
              content="设备开启/关闭的一段时间内，可以拦截其他关闭/开启指令，保持常亮/常闭"
              placement="top"
            >
              <el-icon class="tip-icon" style="margin-left: 4px">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <el-radio-group v-model="form.keepLightFlag">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div ref="keepMinutesFieldRef">
        <el-form-item
          v-if="shouldShowSteadyMinutes && !isOnlyReleaseMeetingActionSelected"
          label="任务常定时间"
          required
          :class="{ 'error-focus-item': activeErrorField === 'keepMinutes' }"
        >
          <div class="lock-row">
            <el-input-number
              v-model="form.keepMinutes"
              :min="1"
              :max="1440"
              :step="1"
              :step-strictly="true"
              :precision="0"
              :controls="false"
              @keydown="blockDecimalInput"
              @update:model-value="syncKeepMinutesInteger"
            />
            <span class="unit">分钟</span>
          </div>
        </el-form-item>
      </div>
    </el-form>

    <div v-if="detailLoading" class="detail-loading-overlay" v-loading="true"></div>

    <template #footer>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ mode === 'add' ? '新增任务' : '保存修改' }}
      </el-button>
      <el-button :disabled="submitting" @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="AutomationTaskFormDialog">
  import { cloneDeep, isEmpty, isEqual, isNil } from 'lodash-es';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import * as swal from '@/utils/swal';
  import { getAutomationTaskApi } from '../api';
  import { useSubmitErrorFocus } from '../composables/useSubmitErrorFocus';
  import type {
    AutoTaskConfig,
    AutoTaskExecuteActionSelectValue,
    AutomationTaskListItem,
    ExecuteAction,
    SaveAutomationTaskParams,
    SelectOption,
    TriggerCondition,
  } from '../types';
  import {
    isMutualExclusiveActions,
    isSameExecuteActions,
    isSameTriggerConditions,
    normalizeExecuteActions,
    normalizeTriggerConditions,
  } from '../utils';

  const props = defineProps<{
    visible: boolean;
    mode: 'add' | 'edit';
    editingRow: AutomationTaskListItem | null;
  }>();

  const emit = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
    (event: 'submitted'): void;
  }>();

  const api = getAutomationTaskApi();
  const sensorTriggerKey = 'sensor';
  // 旧版互斥对规则（先保留，后续可能恢复）
  // const mutuallyExclusiveTriggerKeyPairs: Array<[string, string]> = [
  //   ['BEFORE_MEETING_START', 'AFTER_MEETING_END'],
  // ];
  const temporaryMutuallyExclusiveTriggerKeys = new Set([
    'BEFORE_MEETING_START',
    'AFTER_MEETING_END',
    'sensor',
  ]);

  const configLoading = ref(false);
  const detailLoading = ref(false);
  const taskConfig = ref<AutoTaskConfig>({ triggerConditionList: [], executeActionList: [] });

  const triggerConditionOptions = computed<SelectOption[]>(() => {
    return taskConfig.value.triggerConditionList.map((x) => ({ label: x.name, value: x.key }));
  });

  const triggerNameByKey = computed(() => {
    return new Map(triggerConditionOptions.value.map((x) => [x.value, x.label]));
  });

  const buildDefaultTrigger = (): TriggerCondition => {
    const first = taskConfig.value.triggerConditionList[0];
    return { key: first.key, name: first.name, minutes: undefined };
  };

  const sortedExecuteActionConfigList = computed(() => {
    return [...taskConfig.value.executeActionList].sort((a, b) => a.sort - b.sort);
  });

  const deviceTypeOptions = computed<SelectOption[]>(() => {
    return sortedExecuteActionConfigList.value.map((x) => ({
      label: x.name.length ? x.name : x.deviceType,
      value: x.deviceType,
    }));
  });

  const sensorLinkedActionConfig = computed(() => {
    return sortedExecuteActionConfigList.value.find((x) => x.type === -1);
  });

  const actionDeviceTypeOptions = computed<SelectOption[]>(() => {
    return deviceTypeOptions.value;
  });

  const actionValueOptionsByDeviceType = computed(() => {
    return new Map<string, AutoTaskExecuteActionSelectValue[]>(
      sortedExecuteActionConfigList.value.map((x) => [x.deviceType, x.selectValueList])
    );
  });

  const actionConfigByDeviceType = computed(() => {
    return new Map(sortedExecuteActionConfigList.value.map((x) => [x.deviceType, x]));
  });

  const hasActionValueOptions = (deviceType: string) => {
    return !!actionValueOptionsByDeviceType.value.get(deviceType)?.length;
  };

  const getDefaultActionValue = (deviceType: string): string | null => {
    const actionConfig = actionConfigByDeviceType.value.get(deviceType);
    return actionConfig?.actionValue ?? actionConfig?.selectValueList?.[0]?.value ?? null;
  };

  const buildDefaultAction = (): ExecuteAction => {
    const first =
      sortedExecuteActionConfigList.value.find(
        (x) => x.deviceType !== 'unknown' && x.selectValueList.length
      ) || sortedExecuteActionConfigList.value.find((x) => x.deviceType !== 'unknown');
    if (!first) return { deviceType: '', actionValue: null };
    return { deviceType: first.deviceType, actionValue: getDefaultActionValue(first.deviceType) };
  };

  const visible = computed({
    get: () => props.visible,
    set: (v) => emit('update:visible', v),
  });

  const formRef = ref();
  const {
    taskNameInputRef,
    taskNameFieldRef,
    triggerBlockRef,
    actionBlockRef,
    taskStartTimeFieldRef,
    keepMinutesFieldRef,
    activeErrorField,
    clearErrorFocus,
    focusErrorByMessage,
    resetErrorFocus,
  } = useSubmitErrorFocus();
  const submitting = ref(false);

  const allTasks = ref<AutomationTaskListItem[]>([]);

  const form = reactive<{
    taskCode: string;
    taskName: string;
    triggerConditionList: TriggerCondition[];
    executeActionList: ExecuteAction[];
    taskStartTime: string;
    keepLightFlag: boolean;
    keepMinutes?: number;
  }>({
    taskCode: '',
    taskName: '',
    triggerConditionList: [],
    executeActionList: [],
    taskStartTime: '',
    keepLightFlag: false,
    keepMinutes: undefined,
  });

  const isSensorTriggerSelected = computed(() => {
    return form.triggerConditionList.some((x) => x.key === sensorTriggerKey);
  });

  const isOnlyReleaseMeetingActionSelected = computed(() => {
    const linkedDeviceType = sensorLinkedActionConfig.value?.deviceType;
    if (!linkedDeviceType || form.executeActionList.length !== 1) return false;
    return form.executeActionList[0].deviceType === linkedDeviceType;
  });
  watch(isOnlyReleaseMeetingActionSelected, (val) => {
    if (val) {
      form.keepLightFlag = false;
      form.keepMinutes = undefined;
    }
  });

  const taskNameModel = computed({
    get: () => form.taskName,
    set: (v: string) => {
      form.taskName = v.replace(/\s+/g, '');
      clearErrorFocus('taskName');
    },
  });

  const shouldShowSteadyMinutes = computed(() => form.keepLightFlag);

  const blockDecimalInput = (event: KeyboardEvent) => {
    if (['.', ',', 'e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const toIntegerMinutes = (value?: number) => {
    if (isNil(value)) return value;
    return Math.trunc(value);
  };

  const syncIntegerMinutes = (condition: TriggerCondition, value?: number) => {
    condition.minutes = toIntegerMinutes(value) as number;
    clearErrorFocus('trigger');
  };

  const syncKeepMinutesInteger = (value?: number) => {
    form.keepMinutes = toIntegerMinutes(value);
    clearErrorFocus('keepMinutes');
  };

  // 旧版互斥对规则（先保留，后续可能恢复）
  // const findMutuallyExclusiveTriggerPair = (conditions: TriggerCondition[]) => {
  //   const keySet = new Set(normalizeTriggerConditions(conditions).map((x) => x.key));
  //   return mutuallyExclusiveTriggerKeyPairs.find(
  //     ([left, right]) => keySet.has(left) && keySet.has(right)
  //   );
  // };

  const actionDirection = (actionValue: string | null) => {
    if (!actionValue) return '';
    const normalized = actionValue.toLowerCase();
    if (
      normalized.includes('turn_on') ||
      normalized.includes('open') ||
      actionValue.includes('打开')
    )
      return 'on';
    if (
      normalized.includes('turn_off') ||
      normalized.includes('close') ||
      actionValue.includes('关闭')
    )
      return 'off';
    return '';
  };

  const getMinStartAt = () => dayjs().add(5, 'minute');

  const disabledStartDate = (date: Date) => {
    return dayjs(date).endOf('day').isBefore(getMinStartAt());
  };

  const disabledStartTime = (date: Date) => {
    const min = getMinStartAt();
    const current = dayjs(date);
    if (!current.isSame(min, 'day')) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }

    const minHour = min.hour();
    const minMinute = min.minute();
    const minSecond = min.second();

    return {
      disabledHours: () => Array.from({ length: minHour }, (_, i) => i),
      disabledMinutes: (hour: number) =>
        hour === minHour ? Array.from({ length: minMinute }, (_, i) => i) : [],
      disabledSeconds: (hour: number, minute: number) =>
        hour === minHour && minute === minMinute
          ? Array.from({ length: minSecond }, (_, i) => i)
          : [],
    };
  };

  const genTaskCodeFromList = (list: AutomationTaskListItem[]) => {
    const prefix = `TASK-${dayjs().format('YYYYMMDD')}`;
    const suffixList = list
      .filter((x) => x.taskCode.startsWith(prefix))
      .map((x) => Number(x.taskCode.slice(prefix.length)))
      .filter((n) => Number.isFinite(n));
    const max = suffixList.length ? Math.max(...suffixList) : 0;
    return `${prefix}${(max + 1).toString().padStart(3, '0')}`;
  };

  const resetFormForAdd = () => {
    form.taskCode = form.taskCode || genTaskCodeFromList(allTasks.value);
    form.taskName = '';
    form.triggerConditionList = [buildDefaultTrigger()];
    form.executeActionList = [buildDefaultAction()];
    form.taskStartTime = '';
    form.keepLightFlag = false;
    form.keepMinutes = undefined;
  };

  const resetFormForEdit = (row: AutomationTaskListItem) => {
    form.taskCode = row.taskCode;
    form.taskName = row.taskName;
    form.triggerConditionList = cloneDeep(row.triggerConditionList);
    form.executeActionList = cloneDeep(row.executeActionList);
    form.taskStartTime = row.taskStartTime;
    form.keepLightFlag = row.keepLightFlag;
    form.keepMinutes = row.keepMinutes;
  };

  const addTrigger = () => {
    form.triggerConditionList.push(buildDefaultTrigger());
    syncExecuteActionsByTrigger();
    clearErrorFocus('trigger');
  };

  const removeTrigger = (idx: number) => {
    form.triggerConditionList.splice(idx, 1);
    syncExecuteActionsByTrigger();
    clearErrorFocus('trigger');
  };

  const addAction = () => {
    form.executeActionList.push(buildDefaultAction());
    clearErrorFocus('action');
  };

  const removeAction = (idx: number) => {
    form.executeActionList.splice(idx, 1);
    clearErrorFocus('action');
  };

  const syncTriggerName = (condition: TriggerCondition) => {
    condition.name = triggerNameByKey.value.get(condition.key) as string;
    syncExecuteActionsByTrigger();
    clearErrorFocus('trigger');
  };

  const syncActionValue = (action: ExecuteAction) => {
    action.actionValue = getDefaultActionValue(action.deviceType);
    clearErrorFocus('action');
  };

  const buildReleaseMeetingAction = (): ExecuteAction => {
    const linkedDeviceType = sensorLinkedActionConfig.value?.deviceType || null;
    if (!linkedDeviceType) return buildDefaultAction();
    return {
      deviceType: linkedDeviceType,
      actionValue: '',
    };
  };

  const syncExecuteActionsByTrigger = () => {
    if (isSensorTriggerSelected.value) {
      const linkedAction = buildReleaseMeetingAction();
      // 检查当前列表中是否已存在该标准关联动作
      const hasLinkedAction = form.executeActionList.some(
        (a) =>
          a.deviceType === linkedAction.deviceType && a.actionValue === linkedAction.actionValue
      );

      if (!hasLinkedAction) {
        form.executeActionList = [linkedAction];
      }
      return;
    }
    if (
      form.executeActionList.length === 1 &&
      form.executeActionList[0].deviceType === (sensorLinkedActionConfig.value?.deviceType || '') &&
      form.executeActionList[0].actionValue === ''
    ) {
      form.executeActionList = [buildDefaultAction()];
    }
  };

  const validateBase = () => {
    // 基础校验：名称唯一、必填项、参数合法性
    if (isEmpty(form.taskName)) return '请输入任务名称';

    const name = form.taskName;
    const selfTaskCode = form.taskCode;
    const nameDuplicated = allTasks.value.some(
      (x) => x.taskName === name && (selfTaskCode ? x.taskCode !== selfTaskCode : true)
    );
    if (nameDuplicated) return '任务名称不允许重复';

    if (!form.executeActionList.length) return '请至少选择执行动作';
    if (
      form.executeActionList.some(
        (x) => hasActionValueOptions(x.deviceType) && isEmpty(x.actionValue)
      )
    )
      return '执行动作缺少动作值';

    const invalidTriggerMinutes = form.triggerConditionList.some(
      (x) => isNil(x.minutes) || x.minutes < 1 || x.minutes > 1440
    );
    if (invalidTriggerMinutes) return '触发条件分钟数需在 1-1440 分钟内';

    const normalizedTriggers = normalizeTriggerConditions(form.triggerConditionList);
    const triggerKeySet = new Set(normalizedTriggers.map((x) => x.key));
    if (triggerKeySet.size !== normalizedTriggers.length) return '触发条件不允许选择相同条件';
    for (let i = 1; i < normalizedTriggers.length; i += 1) {
      if (isEqual(normalizedTriggers[i], normalizedTriggers[i - 1])) return '触发条件不允许重复';
    }
    // 旧版互斥对规则（先保留，后续可能恢复）
    // const exclusivePair = findMutuallyExclusiveTriggerPair(form.triggerConditionList);
    // if (exclusivePair) {
    //   const leftName = triggerNameByKey.value.get(exclusivePair[0]) || exclusivePair[0];
    //   const rightName = triggerNameByKey.value.get(exclusivePair[1]) || exclusivePair[1];
    //   return `触发条件“${leftName}”与“${rightName}”不允许同时配置`;
    // }
    const selectedMutuallyExclusiveTriggerKeys = new Set(
      normalizedTriggers
        .map((x) => x.key)
        .filter((key) => temporaryMutuallyExclusiveTriggerKeys.has(key))
    );
    if (selectedMutuallyExclusiveTriggerKeys.size > 1) {
      return '当前触发条件暂不支持组合，请仅保留一项';
    }

    const normalizedActions = normalizeExecuteActions(form.executeActionList);
    for (let i = 1; i < normalizedActions.length; i += 1) {
      if (isEqual(normalizedActions[i], normalizedActions[i - 1])) return '执行动作不允许重复';
    }
    const actionDirectionsByDeviceType = new Map<string, Set<string>>();
    for (const action of normalizedActions) {
      const direction = actionDirection(action.actionValue);
      if (!direction) continue;
      const directionSet = actionDirectionsByDeviceType.get(action.deviceType) ?? new Set<string>();
      directionSet.add(direction);
      actionDirectionsByDeviceType.set(action.deviceType, directionSet);
      if (directionSet.has('on') && directionSet.has('off')) {
        return '不能在执行动作中执行打开和关闭';
      }
    }

    const deviceTypeSet = new Set(normalizedActions.map((x) => x.deviceType));
    if (deviceTypeSet.size !== normalizedActions.length) return '执行动作设备不允许重复';

    if (isEmpty(form.taskStartTime)) return '请选择任务开始执行时间';
    const minStartAt = dayjs().add(5, 'minute');
    if (dayjs(form.taskStartTime).isBefore(minStartAt))
      return '任务开始执行时间需选择未来5分钟后的时间';

    if (shouldShowSteadyMinutes.value) {
      if (form.keepMinutes == null) return '请输入任务常定时间';
      if (form.keepMinutes < 1 || form.keepMinutes > 1440) return '任务常定时间需在 1-1440 分钟内';
    }

    return '';
  };

  const validateConflictWithOtherTasks = () => {
    // 与其他任务比对触发条件/执行动作是否完全相同或相互冲突
    const selfTaskCode = form.taskCode;
    const others = allTasks.value.filter((x) =>
      selfTaskCode ? x.taskCode !== selfTaskCode : true
    );

    const sameTrigger = (x: AutomationTaskListItem) =>
      isSameTriggerConditions(form.triggerConditionList, x.triggerConditionList);

    const sameAction = (x: AutomationTaskListItem) =>
      isSameExecuteActions(form.executeActionList, x.executeActionList);

    const conflictSame = others.find((x) => sameTrigger(x) && sameAction(x));
    if (conflictSame) {
      return `设置的任务与“${conflictSame.taskName}”执行动作相同，请调整触发条件或执行动作`;
    }

    const conflictExclusive = others.find(
      (x) => sameTrigger(x) && isMutualExclusiveActions(form.executeActionList, x.executeActionList)
    );
    if (conflictExclusive) {
      return `设置的任务与“${conflictExclusive.taskName}”执行动作相斥，请调整触发条件或执行动作`;
    }

    return '';
  };

  const fetchAllTasks = async () => {
    // 拉取列表用于生成编码与校验重复/冲突
    const res = await api.queryAutomationTaskList({
      keyword: undefined,
      statusList: [],
      pageNum: 1,
      pageSize: 100,
    });
    allTasks.value = res.taskList;
  };

  const handleOpen = async () => {
    resetErrorFocus();
    // 弹窗打开时同步配置信息
    configLoading.value = true;
    try {
      taskConfig.value = await api.queryAutoTaskConfig();
    } catch (e) {
      ElMessage.error('获取配置信息失败');
    } finally {
      configLoading.value = false;
    }

    if (props.mode === 'edit' && props.editingRow) {
      // 编辑模式下优先从详情接口获取最新且完整的数据
      detailLoading.value = true;
      try {
        const detail = await api.queryAutomationTaskDetail(props.editingRow.taskCode);
        resetFormForEdit(detail);
        form.triggerConditionList.forEach(syncTriggerName);
        syncExecuteActionsByTrigger();
      } catch (e) {
        resetFormForEdit(props.editingRow);
        form.triggerConditionList.forEach(syncTriggerName);
        syncExecuteActionsByTrigger();
        ElMessage.warning('获取任务详情失败，已使用基础数据回显');
      } finally {
        detailLoading.value = false;
      }
    } else {
      // 新增模式
      try {
        const res = await api.generateTaskCode();
        form.taskCode = res.taskCode;
      } catch {
        form.taskCode = genTaskCodeFromList(allTasks.value);
      }
      resetFormForAdd();
      syncExecuteActionsByTrigger();
      // 这里确保基础任务列表拉取完成用于本地生成/校验
      fetchAllTasks();
    }
  };

  const handleSubmit = async () => {
    // 提交前依次做基础校验与冲突校验
    const baseError = validateBase();
    if (baseError) {
      ElMessage.error(baseError);
      focusErrorByMessage(baseError);
      return;
    }

    const conflictError = validateConflictWithOtherTasks();
    if (conflictError) {
      ElMessage.error(conflictError);
      focusErrorByMessage(conflictError);
      return;
    }

    submitting.value = true;
    // 组装提交数据：触发条件/执行动作使用深拷贝避免表单状态被接口修改
    const payload: SaveAutomationTaskParams = {
      taskCode: form.taskCode,
      taskName: form.taskName,
      triggerConditionList: cloneDeep(form.triggerConditionList),
      executeActionList: cloneDeep(form.executeActionList),
      taskStartTime: form.taskStartTime,
      keepLightFlag: form.keepLightFlag,
      keepMinutes: shouldShowSteadyMinutes.value ? form.keepMinutes : undefined,
    };

    try {
      const res = await api.saveAutomationTask(payload);
      if (res.success === false) {
        throw new Error(res.message || (props.mode === 'edit' ? '修改任务失败' : '新增任务失败'));
      }
      const title = props.mode === 'edit' ? '修改成功' : '新增成功';
      await swal.confirm({
        title,
        text: res.message || `${res.taskCode}+${res.taskName}`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: '确认',
      });
      resetErrorFocus();
      visible.value = false;
      emit('submitted');
    } catch (error: unknown) {
      const title = props.mode === 'edit' ? '修改失败' : '新增失败';
      const message = error instanceof Error ? error.message : String(error);

      const ok = await swal.confirm({
        title,
        text:
          message ||
          (props.mode === 'edit'
            ? `修改任务过程中发生了未知错误，请重试`
            : `新增任务过程中发生了未知错误，请重试`),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      });
      if (!ok) {
        visible.value = false;
      }
    } finally {
      submitting.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .w-full {
    width: 100%;
  }

  .step {
    display: flex;
    gap: 12px;
    margin: 14px 0;
    align-items: flex-start;
  }

  .step-index {
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: #02b96b;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .step-body {
    flex: 1;
  }

  .step-title {
    font-weight: 600;
    margin-bottom: 8px;
  }

  .block {
    padding: 12px;
    border-radius: 10px;
    background: rgba(2, 185, 107, 0.12);
    border: 1px solid rgba(2, 185, 107, 0.18);
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .block--error {
    border-color: var(--el-color-danger);
    box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.12);
  }

  .row {
    width: 100%;
    box-sizing: border-box;
    display: grid;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .row--trigger {
    grid-template-columns: 160px 120px auto 1fr auto;
  }

  .row--action {
    grid-template-columns: 160px 160px 1fr auto;
  }

  .row-item {
    min-width: 0;
  }

  .row-item--number {
    width: 120px;
  }

  .unit {
    color: #666;
    font-size: 12px;
    white-space: nowrap;
  }

  .add-btn {
    width: 100%;
  }

  .add-btn-tooltip-wrap {
    display: block;
    width: 100%;
  }

  .remove-btn {
    justify-self: end;
  }

  .row--trigger .remove-btn {
    grid-column: 5;
  }

  .row--action .remove-btn {
    grid-column: 4;
  }

  .w-160 {
    width: 160px;
  }

  .lock-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .tip-icon {
    color: #909399;
    cursor: pointer;
  }

  .required-star {
    color: var(--el-color-danger);
    margin-right: 4px;
  }

  .detail-loading-overlay {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 60px;
    background: rgba(255, 255, 255, 0.7);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-focus-item :deep(.el-input__wrapper),
  .error-focus-item :deep(.el-textarea__inner),
  .error-focus-item :deep(.el-select__wrapper) {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset !important;
    border-radius: 4px;
  }
</style>
