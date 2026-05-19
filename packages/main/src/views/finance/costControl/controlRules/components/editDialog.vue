<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑规则' : '新增规则'"
    width="75%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="formData" label-width="90px" :rules="rules">
      <KeenCard title="基本信息">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="规则编码">
              <el-input v-model="formData.ruleCode" disabled placeholder="系统自动生成" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级" prop="priority" required>
              <NumberInput
                v-model="formData.priority"
                :precision="0"
                :min="1"
                :max="9999999999"
                :disabled="formData?.isSystemDefault"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规则名称" prop="ruleName" required>
              <el-input
                v-model="formData.ruleName"
                :disabled="formData?.isSystemDefault"
                placeholder="请输入规则名称"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="来源系统" v-if="formData?.isSystemDefault">
              <el-input v-model="formData.sourceSystems[0].value" disabled placeholder="全部系统" />
            </el-form-item>
            <el-form-item label="来源系统" prop="sourceSystems" v-else>
              <el-select
                v-model="formData.sourceSystems"
                clearable
                filterable
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="1"
                placeholder="来源系统"
              >
                <el-option :label="item.desc" :value="item" v-for="item in sourceSystemList" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单据名称" v-if="formData?.isSystemDefault">
              <el-input v-model="formData.processCodes[0].value" disabled placeholder="全部单据" />
            </el-form-item>
            <el-form-item label="单据名称" prop="processCodes" v-else>
              <el-select
                v-model="formData.processCodes"
                clearable
                filterable
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="1"
                placeholder="全部单据"
              >
                <el-option :label="item.desc" :value="item" v-for="item in processesList" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <KeenCard title="适用维度设置">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="适用维度" prop="dimensionalityCodes">
              <el-select
                v-model="formData.dimensionalityCodes"
                clearable
                filterable
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="1"
                placeholder="适用维度"
              >
                <el-option :label="item.desc" :value="item" v-for="item in dimensionality" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="控制费用" v-if="formData?.isSystemDefault">
              <el-input v-model="formData.feeSubjects[0].value" disabled placeholder="全部费用" />
            </el-form-item>
            <el-form-item label="控制费用" prop="feeSubjects" v-else>
              <el-select
                v-model="formData.feeSubjects"
                clearable
                filterable
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="1"
                placeholder="控制费用"
              >
                <el-option :label="item.desc" :value="item" v-for="item in expenseAccountList" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选维度">
              <div v-for="(item, index) in formData.dimensionalityCodes">
                {{ item.desc }}
                <span v-if="index < formData.dimensionalityCodes.length - 1">，</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <KeenCard title="控制强度设置">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="radio-box">
              <el-radio value="strong" v-model="formData.type" @change="changeType">
                强控制
              </el-radio>
              <span>超预算则单据无法提交，适用于关键费用控制场景，确保预算严格执行</span>
            </div>
            <div class="radio-box">
              <el-radio value="weak" v-model="formData.type" @change="changeType">弱控制</el-radio>
              <span>超预算仅给出警告提示，但仍可提交。适用于需要灵活性的费用场景</span>
            </div>
            <div class="radio-box">
              <el-radio value="no" v-model="formData.type" @change="changeType">不控制</el-radio>
              <span>仅记录，不控制</span>
            </div>
            <div>
              预算使用率 ≤
              <el-form-item
                label=""
                label-width="0"
                prop="passLeUsageRate"
                style="display: inline-block"
                :rules="[
                  { required: formData.type !== 'no', message: '请输入' },
                  {
                    pattern: priceRule,
                    message: '请输入整数或最多2位小数',
                  },
                ]"
              >
                <el-input
                  v-model="formData.passLeUsageRate"
                  :disabled="formData.type == 'no'"
                  placeholder="请输入"
                />
              </el-form-item>
              % 时：正常通过
              <span v-if="formData.passLeUsageRate !== null">
                ， 预算使用率 > {{ formData.passLeUsageRate }} % 时：{{
                  formData.type == 'strong' ? '禁止提交' : '警告提示'
                }}
              </span>
            </div>
            <div>
              <!-- 预算使用率 >
              <el-form-item
                label=""
                label-width="0"
                prop="warnGtUsageRate"
                style="display: inline-block"
                :rules="[{ required: formData.type !== 'no', message: '请输入' }]"
              >
                <NumberInput
                  v-model="formData.warnGtUsageRate"
                  :precision="2"
                  :min="0"
                  :max="9999999999"
                  :disabled="formData.type == 'no'"
                  class="w-100px"
                  style="display: inline-block"
                  controls-position="right"
                />
              </el-form-item>
              % 时：{{ formData.type == 'strong' ? '禁止提交' : '警告提示' }} -->
            </div>
          </el-col>
        </el-row>
      </KeenCard>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { budgetApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import { priceRule } from '@/utils/rulesRegExp';

  const emit = defineEmits(['success']);

  const formRef = ref();
  const classInputShow = ref(true);
  const initFormData = {
    dimensionalityCodes: [],
    feeSubjects: [],
    passLeUsageRate: undefined,
    priority: undefined,
    processCodes: undefined,
    // processType: '',
    ruleCode: null,
    ruleName: '',
    sourceSystems: undefined,
    type: 'strong',
    warnGtUsageRate: undefined,
  };
  const formData = ref({ ...initFormData });
  const visible = ref(false);
  const isEdit = computed(() => formData.value?.ruleCode);
  const rules = ref({
    priority: [{ required: true, message: '请输入优先级' }],
    ruleName: [{ required: true, message: '请输入规则名称' }],
    sourceSystems: [{ required: true, message: '请选择来源系统' }],
    processCodes: [{ required: true, message: '请选择单据名称' }],
    dimensionalityCodes: [{ required: true, message: '请选择适用维度' }],
    feeSubjects: [{ required: true, message: '请选择控制费用' }],
  });
  const dimensionality = ref();
  const queryAllDimensionality = async () => {
    const res = await budgetApi.financeBudgetRuleControlCfgQueryAllDimensionality();
    dimensionality.value = res || [];
  };
  // OA流程
  const processesList = ref();
  const queryAllProcesses = async () => {
    const res = await budgetApi.financeBudgetRuleControlCfgQueryAllProcesses();
    processesList.value = res || [];
  };
  // 费用科目
  const expenseAccountList = ref<any[]>([]);
  const getExpenseAccountList = async () => {
    const res = await budgetApi.financeBudgetPoolQueryExpenseAccountSelect({
      keyword: '',
    });
    expenseAccountList.value = res.map((item) => {
      return {
        desc: item.name,
        value: item.code,
      };
    });
  };
  // 获取来源系统字典
  const sourceSystemList = ref([]);
  const queryDictMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['financeBudget.sourceSystemMapping'],
    });
    sourceSystemList.value = res.dictMap['financeBudget.sourceSystemMapping'].map((item) => {
      return {
        desc: item.desc,
        value: item.value,
      };
    });
  };

  const open = (data) => {
    formData.value = data || { ...initFormData };
    queryAllDimensionality();
    queryAllProcesses();
    getExpenseAccountList();
    queryDictMap();
    visible.value = true;
    formRef.value.resetFields();
  };
  const handleClose = () => {
    visible.value = false;
    formData.value = { ...initFormData };
  };
  const handleSubmit = () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          try {
            let param = JSON.parse(JSON.stringify(formData.value));
            // if (param.isSystemDefault) {
            //   param = { ...omit(formData.value, 'processCodes') };
            // }
            if (formData.value.ruleCode == null) {
              param = { ...omit(formData.value, 'ruleCode') };
            }
            const res = await budgetApi.financeBudgetRuleControlCfgSaveOrUpdate(param);
            if (res) {
              ElMessage.success('操作成功');
              emit('success');
              visible.value = false;
            }
          } catch (error) {
            console.error('Error saving form:', error);
          }
        }
      })
      .catch(() => false);
  };
  const changeType = () => {
    if (formData.value.type == 'no') {
      formData.value.passLeUsageRate = null;
      formData.value.warnGtUsageRate = null;
      formRef.value.clearValidate('passLeUsageRate');
      formRef.value.clearValidate('warnGtUsageRate');
    }
  };
  defineExpose({
    open,
  });
</script>

<style scoped>
  .el-dialog__footer {
    text-align: right;
  }
  .radio-box {
    margin-bottom: 10px;
    span {
      font-size: 14px;
      color: var(---N6, #999);
      vertical-align: text-top;
    }
  }
</style>
