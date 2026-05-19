<template>
  <el-dialog
    :title="title"
    width="1000px"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
  >
    <el-form :model="form" ref="formRef" label-width="180px" label-position="right">
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="ruleName"
            label="汇总表模板:"
            :rules="[{ required: true, message: '请选择汇总表模板', trigger: 'change' }]"
            v-if="operateShow"
          >
            <el-input v-model="form.ruleName" disabled placeholder="请选择汇总表模板" />
          </el-form-item>
          <el-form-item
            prop="ruleCode"
            label="汇总表模板:"
            :rules="[{ required: true, message: '请选择汇总表模板', trigger: 'change' }]"
            v-else
          >
            <el-select
              v-model="form.ruleName"
              filterable
              :clearable="false"
              remote
              :remote-method="getruleNameList"
              @change="
                form.ruleCode = ruleNameList.find((val) => val.ruleName == form.ruleName)?.ruleCode
              "
              placeholder="请选择汇总表模板"
            >
              <el-option
                v-for="item in ruleNameList"
                :key="item.ruleCode"
                :label="item.ruleName"
                :value="item.ruleName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="budgetSchemeYear"
            label="预算年度:"
            :rules="[{ required: true, message: '请选择预算年度', trigger: 'change' }]"
          >
            <el-date-picker
              v-model="form.budgetSchemeYear"
              type="year"
              placeholder="预算年度"
              value-format="YYYY"
              format="YYYY"
              class="w-300px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="budgetSchemeName"
            label="预算方案名称："
            :rules="[{ required: true, message: '请选择预算方案名称', trigger: 'blur' }]"
          >
            <el-input
              v-model="form.budgetSchemeName"
              disabled
              placeholder="请选择预算方案名称"
              v-if="operateShow"
            />
            <el-select
              v-model="form.budgetSchemeName"
              :clearable="false"
              filterable
              placeholder="请选择预算方案名称"
              v-else
            >
              <el-option
                v-for="(item, index) in schemeList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="budgetSchemeLevel"
            label="稿件："
            :rules="[{ required: true, message: '请选择稿件', trigger: 'change' }]"
          >
            <el-select
              v-model="form.budgetSchemeLevel"
              :disabled="operateShow"
              placeholder="请选择预算模板"
            >
              <el-option
                v-for="item in draftList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel" class="me-2">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">更新</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi, budgetApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import { priceRule } from '@/utils/rulesRegExp';
  import dayjs from 'dayjs';

  const visible = ref(false);
  const operateShow = ref(false);
  const draftList = ref([
    { name: '一稿', code: 1 },
    { name: '一稿修订版', code: 2 },
    { name: '终稿', code: 3 },
  ]);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    budgetSchemeYear: '',
    budgetSchemeName: '',
    budgetSchemeLevel: '',
    ruleCode: '',
  });
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();
  const ruleNameList = ref([]);
  const budgetYearList = ref([]);
  const schemeList = ref();
  const nowStepCode = ref(1);
  // 汇总表模板
  const getruleNameList = async (ruleName) => {
    const res = await financeSystemApi.financeBudgetRuleQueryList({
      pageNum: 1,
      pageSize: 100,
      ruleName: ruleName,
      statusList: [1],
    });
    ruleNameList.value = res.recordList || [];
  };
  // 预算配置年度
  const getBudgetYearSettings = async () => {
    const res = await budgetApi.financeBudgetYearSettingsList();
    if (res) {
      budgetYearList.value = res || [];
    }
  };
  // 预算方案名称列表
  const budgetSchemeQueryList = async () => {
    const res: any = await budgetApi.financeBudgetSchemeQueryNameList();
    schemeList.value = res || [];
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (form.value.draft > nowStepCode.value) {
        ElMessage.error(
          `当前预算方案${draftList.value[form.value.draft - 1].name}未开启，无法更新`
        );
        return;
      }
      saveLoading.value = true;
      const res = await financeSystemApi
        .financeBudgetRuleSummaryResultExeSignle({
          budgetSchemeLevel: form.value.budgetSchemeLevel,
          budgetSchemeName: form.value.budgetSchemeName,
          budgetSchemeYear: form.value.budgetSchemeYear,
          ruleCode: form.value.ruleCode,
        })
        .catch(() => {
          saveLoading.value = false;
        });
      if (res) {
        saveLoading.value = false;
        ElMessage.success(`保存成功`);
        emit('success');
        handleFormCancel();
      }
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    visible.value = false;
  };
  const title = ref('汇总表更新');
  const open = (row) => {
    if (row) {
      form.value = row;

      operateShow.value = true;
    } else {
      form.value = {
        budgetSchemeYear: '',
        budgetSchemeName: '',
        budgetSchemeLevel: '',
        ruleCode: '',
      };
      operateShow.value = false;
    }
    if (formRef.value) {
      formRef.value.resetFields();
    }
    getBudgetYearSettings();
    getruleNameList('');
    budgetSchemeQueryList();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .el-textarea.is-disabled :deep(.el-textarea__inner) {
    color: var(--el-text-color-regular);
  }
</style>
