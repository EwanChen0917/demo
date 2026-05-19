<template>
  <el-dialog
    width="800px"
    title="推单监控平台-重新获取"
    v-model="visible"
    :close-on-click-modal="true"
    @close="visible = false"
    align-center
  >
    <el-alert title="请选择重新获取的数据范围" type="warning" :closable="false" class="mb-8" />
    <el-form ref="formRef" :model="form" :rules="rules" label-width="92px">
      <el-row>
        <!-- 系统来源 -->
        <el-col :span="12">
          <el-form-item label="系统来源" prop="sourceSystemCodes">
            <el-select
              v-model="form.sourceSystemCodes"
              clearable
              style="width: 100%"
              @change="handleSourceCodeChange(false)"
            >
              <el-option label="积加ERP" value="jijia" />
              <el-option label="企企通" value="srm" />
              <el-option label="路特ERP" value="erp" />
              <el-option label="分贝通" value="fbt" />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 来源单据 -->
        <el-col :span="12">
          <el-form-item label="来源单据" prop="sourceSystemTypes">
            <el-select
              v-model="form.sourceSystemTypes"
              clearable
              style="width: 100%"
              @change="handleSourceTypeChange(false)"
            >
              <el-option
                v-for="item in allSourceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 目标系统 -->
        <el-col :span="12">
          <el-form-item label="目标系统" prop="targetSystemCodes">
            <el-select
              v-model="form.targetSystemCodes"
              clearable
              style="width: 100%"
              @change="handleTargetCodeChange(false)"
            >
              <el-option
                v-for="item in allTargetCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 目标单据 -->
        <el-col :span="12">
          <el-form-item label="目标单据" prop="targetSystemTypes">
            <el-select v-model="form.targetSystemTypes" clearable style="width: 100%">
              <el-option
                v-for="item in allTargetTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 单据编号 -->
        <el-col :span="12">
          <el-form-item label="单据编号" prop="keyword">
            <el-input
              v-model="form.keyword"
              placeholder="请输入单据编号"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <!-- 推送时间 -->
        <el-col :span="12">
          <el-form-item label="推送时间" prop="pushTime">
            <el-date-picker
              v-model="form.pushTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :disabled-date="disabledDate"
              @calendar-change="handlerCalendarChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="loading">立即获取数据</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  import { reconciliationApi } from '@/api';
  import { useSourceSystemTypes } from '@/views/finance/pushMonitor/monitor';
  import { uniqBy } from 'lodash-es';

  const emits = defineEmits(['success', 'submit']);

  const visible = ref(false);
  const formRef = ref();
  const loading = ref(false);

  const initForm = () => {
    form.pushTime = [
      dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
    ];

    form.sourceSystemCodes = '';
    form.sourceSystemTypes = '';
    form.targetSystemCodes = '';
    form.targetSystemTypes = '';

    form.keyword = '';

    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };
  // 表单数据（字段与后端一致）
  const form = reactive<{
    sourceSystemCodes: string;
    sourceSystemTypes: string;
    targetSystemCodes: string;
    targetSystemTypes: string;
    keyword: string;
    pushTime: Date[];
  }>({});

  // 表单校验规则
  const rules =computed(() => {
    return {
      sourceSystemCodes: [{ required: true, message: '请选择系统来源', trigger: 'change' }],
      sourceSystemTypes: [{ required: true, message: '请选择来源单据', trigger: 'change' }],
      targetSystemCodes: [{ required: true, message: '请选择目标系统', trigger: 'change' }],
      targetSystemTypes: [{ required: true, message: '请选择目标单据', trigger: 'change' }],
      pushTime: [{ required: !form.keyword, message: '请选择推送时间范围', trigger: 'change' }],
    }
  });

  const currentSelectedStartDate = ref(null);
  const handlerCalendarChange = (val: Date[]) => {
    if (!val) {
      val = [];
    }
    if (val[0] && !val[1]) {
      currentSelectedStartDate.value = (val?.[0] && dayjs(val[0])) || null;
    } else {
      currentSelectedStartDate.value = null;
    }
  };
  const disabledDate = (time: Date) => {
    if (!currentSelectedStartDate.value) {
      return false;
    }
    const start = currentSelectedStartDate.value;
    const current = dayjs(time);

    // 计算6个月的时间差
    const maxDate = start.add(6, 'month');
    const minDate = start.subtract(6, 'month');

    // 如果已经选择了开始日期，则限制结束日期在6个月内
    return current.isAfter(maxDate) || current.isBefore(minDate);
  };

  const {
    sourceTypeOptions,
    targetCodeOptions,
    targetTypeOptions,
    handleSourceTypeChange,
    handleSourceCodeChange,
    handleTargetCodeChange,
  } = useSourceSystemTypes({
    formReactive: form,
    sourceCodeProp: 'sourceSystemCodes',
    sourceTypeProp: 'sourceSystemTypes',
    targetCodeProp: 'targetSystemCodes',
    targetTypeProp: 'targetSystemTypes',
  });

  const allSourceTypeOptions = computed(() => {
    return uniqBy(sourceTypeOptions.value.options || [], 'value');
  });
  const allTargetCodeOptions = computed(() => {
    return uniqBy(targetCodeOptions.value.options || [], 'value');
  });
  const allTargetTypeOptions = computed(() => {
    return uniqBy(targetTypeOptions.value.options || [], 'value');
  });

  // 打开弹窗
  const open = () => {
    visible.value = true;
    initForm();
  };

  // 提交表单
  const submitForm = async () => {
    try {
      const valid = await formRef.value.validate();
      if (valid) {
        loading.value = true;

        // 构造最终参数
        const params = {
          sourceSystemCodes: (form.sourceSystemCodes && [form.sourceSystemCodes]) || undefined,
          sourceSystemTypes: (form.sourceSystemTypes && [form.sourceSystemTypes]) || undefined,
          targetSystemCodes: (form.targetSystemCodes && [form.targetSystemCodes]) || undefined,
          targetSystemTypes: (form.targetSystemTypes && [form.targetSystemTypes]) || undefined,
          keyword: form.keyword,
          pushTimeStart: form.pushTime?.[0] || undefined,
          pushTimeEnd: form.pushTime?.[1] || undefined,
        };

        await reconciliationApi.reconciliationMonitorReLoad(params);
        ElMessage.success('重新获取成功');
        // 如果接口未返回数据但是关闭了弹窗，则不触发列表的刷新
        if (visible.value) {
          emits('success', params);
        }
        visible.value = false;
        initForm();
      }
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  // 暴露 open 方法
  defineExpose({
    open,
  });
</script>
