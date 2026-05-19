<template>
  <el-dialog
    :title="title"
    width="1000px"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
  >
    <el-form :model="form" ref="formRef" label-width="180px" label-position="right">
      <KeenCard title="基本信息">
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <el-form-item
              prop="templateCode"
              label="校验表单："
              :rules="[{ required: true, message: '请选择校验表单', trigger: ['change'] }]"
            >
              <el-select
                v-model="form.templateCode"
                @change="changTemplateCode"
                placeholder="请选择校验表单"
                :disabled="typeEdit == 1"
              >
                <el-option
                  v-for="item in templateList"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="checkName"
              label="校验维度："
              :rules="[{ required: true, message: '请选择校验维度', trigger: ['change'] }]"
            >
              <el-select
                v-model="form.checkName"
                clearable
                :disabled="typeEdit == 1"
                @change="getDataList(1)"
                placeholder="请选择校验维度"
              >
                <el-option
                  v-for="item in checkKeyDataList"
                  :key="item.desc"
                  :label="item.desc"
                  :value="item.desc"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="checkValueKey"
              label="数据："
              :rules="[{ required: true, message: '请选择数据', trigger: ['change'] }]"
            >
              <el-select
                v-model="form.checkValueKey"
                clearable
                :disabled="typeEdit == 1"
                @change="changeMessage"
                placeholder="请选择数据"
              >
                <el-option
                  v-for="item in dataList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="指标：" required>
              <el-select
                v-model="form.sumKey"
                :disabled="typeEdit == 1"
                @change="changeMessage"
                placeholder="请选择指标"
              >
                <el-option
                  v-for="item in targetList"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" :offset="0">
            <el-form-item
              prop="compareType"
              :rules="[{ required: true, message: '请选择规则', trigger: ['blur'] }]"
              label="规则："
            >
              <el-select
                v-model="form.compareType"
                clearable
                @change="changeMessage"
                placeholder="请选择规则"
              >
                <el-option
                  v-for="item in ruleList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="targetValueType"
              :rules="[{ required: true, message: '请选择指标类型', trigger: ['blur'] }]"
              label="指标类型："
            >
              <!-- 指标类型 0-金额 1-百分比 -->
              <el-select
                v-model="form.targetValueType"
                @change="changeMessage"
                :disabled="typeEdit == 1"
                placeholder="请选择指标类型"
              >
                <el-option key="0" label="金额" value="0" />
                <el-option key="1" label="费率" value="1" v-if="typeEdit" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="targetValue"
              :rules="
                [{ required: true, message: '请输入目标值', trigger: ['blur'] }].concat(
                  form.targetValueType == '1'
                    ? [
                        {
                          pattern: /(^[-]{0,1}[0-9]+$)|(^[-]{0,1}[0-9]+\.[0-9]{1,2}$)/,
                          message: '请输入正、负数字，最多2位小数',
                          trigger: ['blur', 'change'],
                        },
                      ]
                    : []
                )
              "
              label="目标值："
              required
            >
              <NumberInput
                v-model="form.targetValue"
                :precision="2"
                :min="1"
                :max="9999999999"
                @change="changeMessage"
                controls-position="right"
                v-if="form.targetValueType == '0'"
              />
              <el-input
                v-else
                maxlength="10"
                v-model="form.targetValue"
                @change="changeMessage"
                placeholder="请输入目标值"
              >
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <KeenCard title="适用范围" v-if="!typeEdit">
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="budgetYear"
              label="所属年度:"
              :rules="[{ required: true, message: '请选择所属年度', trigger: 'change' }]"
            >
              <el-date-picker
                v-model="form.budgetYear"
                type="year"
                placeholder="请选择"
                value-format="YYYY"
                format="YYYY"
                :clearable="false"
                style="width: 288px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="deptId"
              label="适用部门："
              :rules="[{ required: true, message: '请选择适用部门', trigger: 'change' }]"
            >
              <el-select v-model="form.deptId" placeholder="适用部门">
                <el-option
                  v-for="item in deptList"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <KeenCard title="校验设置">
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop="status" label="规则状态：">
              <el-switch
                v-model="form.status"
                :active-value="1"
                :inactive-value="0"
                active-text="启用"
                inactive-text="禁用"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item
              prop="validationMessage"
              :rules="[{ required: true, message: '请输入错误提示', trigger: ['blur'] }]"
              label="错误提示："
            >
              <el-checkbox
                v-model="form.isDefaultMessage"
                :true-value="0"
                :false-value="1"
                @change="changeMessage"
                label="使用默认"
                size="large"
              />
              <el-input
                v-model="form.validationMessage"
                :rows="2"
                :disabled="!form.isDefaultMessage"
                type="textarea"
                placeholder="例如：喂养电器GTM组销售额GMV（人民币）汇总应≥60000"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { budgetApi, platformApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import { priceRule } from '@/utils/rulesRegExp';
  import dayjs from 'dayjs';

  const visible = ref(false);
  // 比较类型 0-小于等于 1-大于等于 2-大于 3-小于 4-等于
  const ruleList = ref([
    { name: '≥', code: '1' },
    { name: '≤', code: '0' },
    { name: '>', code: '2' },
    { name: '<', code: '3' },
    { name: '=', code: '4' },
  ]);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    budgetYear: '',
    checkKey: '',
    checkName: '',
    checkValueKey: '',
    checkValueName: '',
    code: '',
    compareType: '',
    deptId: '',
    isDefaultMessage: 0,
    ruleType: 0,
    status: 1,
    sumKey: '',
    sumName: '',
    targetValue: undefined,
    targetValueType: '0',
    templateCode: '',
    validationMessage: '',
  });
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();
  const checkKeyDataList = ref<any[]>([]);
  const dataList = ref<any[]>([]);
  // 根据校验表单 查 校验维度
  const changTemplateCode = async () => {
    if (form.value.templateCode) {
      const res: any = await platformApi.platformDict({
        dictCodes: [form.value.templateCode],
      });
      checkKeyDataList.value = res.dictMap && res.dictMap[form.value.templateCode];
    }
  };
  // 查询数据下拉
  const getDataList = async (type) => {
    if (type == 1) {
      form.value.checkValueKey = '';
      form.value.checkValueName = '';
      dataList.value = [];
      if (form.value.checkName) {
        form.value.checkKey = checkKeyDataList.value.find(
          (res) => res.desc == form.value.checkName
        ).value;
      } else {
        form.value.checkKey = '';
      }
    }
    if (form.value.checkKey && form.value.checkName && form.value.templateCode) {
      const res = await budgetApi.financeBudgetValidationRuleQueryCheckValueDataList({
        checkKey: form.value.checkKey,
        checkName: form.value.checkName,
        templateCode: form.value.templateCode,
      });
      dataList.value = res;
    }
  };
  const deptList = ref<any[]>([]);
  const templateList = ref<any[]>([]);
  const targetList = ref<any[]>([]);
  // 查询校验表单,适用部门下拉
  const getDeptList = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: [
        'budget_validation_rule_dept',
        'budget_validation_rule_template',
        'budget_validation_rule_sum',
      ],
    });
    templateList.value = (res.dictMap && res.dictMap.budget_validation_rule_template) || [];
    deptList.value = (res.dictMap && res.dictMap.budget_validation_rule_dept) || [];
    targetList.value = (res.dictMap && res.dictMap.budget_validation_rule_sum) || [];
  };

  // 提交操作
  const saveLoading = ref(false);
  const edit = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const param = JSON.parse(JSON.stringify([form.value]));
      const res = await budgetApi.financeBudgetValidationRuleSaveOrUpdate(param);
      if (res) {
        ElMessage.success(`${form.value.code ? '编辑' : '新增'}成功`);
        emit('success');
        handleFormCancel();
      }
    }
  };

  // 错误提示
  const changeMessage = async () => {
    let compareTypeText = '';
    if (form.value.compareType) {
      compareTypeText = ruleList.value.find((res) => res.code == form.value.compareType).name;
    } else {
      compareTypeText = '';
    }
    if (typeEdit.value == 1 && form.value.isDefaultMessage == 0) {
      form.value.validationMessage = `${form.value.checkValueName}${
        form.value.sumName
      }汇总应${compareTypeText}${form.value.targetValue}${
        form.value.targetValueType == '1' ? '%' : ''
      }`;
      return;
    }

    if (form.value.checkValueKey) {
      form.value.checkValueName = dataList.value.find(
        (res) => res.code == form.value.checkValueKey
      ).name;
    } else {
      form.value.checkValueName = '';
    }
    if (form.value.sumKey) {
      form.value.sumName = targetList.value.find((res) => res.value == form.value.sumKey).desc;
    } else {
      form.value.sumName = '';
    }

    if (form.value.isDefaultMessage == 0) {
      if (
        form.value.checkValueName &&
        form.value.sumName &&
        compareTypeText &&
        form.value.targetValue
      ) {
        form.value.validationMessage = `${form.value.checkValueName}${form.value.sumName}汇总应${compareTypeText}${form.value.targetValue}`;
      } else {
        form.value.validationMessage = '';
      }
    }
  };
  // 详情
  const getDetailData = async (code) => {
    const res = await budgetApi.financeBudgetValidationRuleQueryDetail({
      code,
    });
    form.value = res;
    form.value.targetValueType = `${form.value.targetValueType}`;
    form.value.budgetYear = `${form.value.budgetYear}`;
    form.value.compareType = `${form.value.compareType}`;
    form.value.deptId = `${form.value.deptId}`;
    if (!typeEdit.value) {
      changTemplateCode();
      getDataList(0);
    } else {
      templateList.value = [{ value: form.value.templateCode, desc: form.value.templateName }];
    }
  };
  // 取消操作
  const handleFormCancel = () => {
    visible.value = false;
  };
  const title = ref('校验规则-新增');
  const typeEdit = ref(0);
  const open = (code, type) => {
    getDeptList();
    edit.value = false;
    form.value = {
      budgetYear: '',
      checkKey: '',
      checkName: '',
      checkValueKey: '',
      checkValueName: '',
      code: '',
      compareType: '',
      deptId: '',
      isDefaultMessage: 0,
      ruleType: 0,
      status: 1,
      sumKey: '',
      sumName: '',
      targetValue: undefined,
      targetValueType: '0',
      templateCode: '',
      validationMessage: '',
    };
    const year = dayjs().format('YYYY');
    form.value.budgetYear = `${Number(year) + 1}`;
    if (code) {
      title.value = '校验规则-编辑';
      typeEdit.value = type;
      getDetailData(code);
    }
    if (formRef.value) {
      formRef.value.resetFields();
    }
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
