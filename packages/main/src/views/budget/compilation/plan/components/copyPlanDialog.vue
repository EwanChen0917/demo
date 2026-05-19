<template>
  <el-dialog
    :title="title"
    width="1000px"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
  >
    <el-form :model="form" ref="formRef" label-width="180px" label-position="right">
      <KeenCard title="源方案信息">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="预算方案编码：">
              <el-input v-model.trim="oldData.code" disabled placeholder="预算方案编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="预算方案：">
              <el-input v-model.trim="oldData.name" disabled placeholder="预算方案" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="预算模板：">
              <el-input v-model.trim="oldData.templateName" disabled placeholder="预算模板" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="预算稿件：">
              <el-select v-model="form.stepLevel" placeholder="请选择预算模板">
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
      </KeenCard>
      <KeenCard title="新方案信息">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="name"
              label="预算方案："
              required
              :rules="[{ required: true, message: '请输入预算方案', trigger: ['blur'] }]"
            >
              <el-input v-model.trim="form.name" :disabled="edit" placeholder="请输入预算方案" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="executorReportTimeList[0].draftReportDays"
              :rules="[
              { required: true, message: '请输入执行人一稿上报天数', trigger: ['blur'] },
              {
                validator:(rule: any, value: any, callback: any) => {
                  if (value > Number(form.departmentReportTimeList[0].draftReportDays)&&Number(form.departmentReportTimeList[0].draftReportDays)) {
                    callback(new Error('执行人一稿上报天数不能大于部门一稿上报天数'))
                  } else {
                    callback()
                  }
                },
                trigger: 'blur',
              },
            ]"
              label="执行人一稿上报天数："
              required
            >
              <NumberInput
                v-model="form.executorReportTimeList[0].draftReportDays"
                :precision="0"
                :min="1"
                :max="9999999999"
                :disabled="edit"
                @blurHandler="changeDays(3)"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="templateCode"
              label="预算模板："
              :rules="[{ required: true, message: '请选择预算模板', trigger: ['change'] }]"
            >
              <el-select
                v-model="form.templateCode"
                disabled
                clearable
                placeholder="请选择预算模板"
              >
                <el-option
                  v-for="item in templateList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="executorReportTimeList[0].draftDeadline"
              :rules="[
                { required: true, message: '执行人上报截止时间不能为空', trigger: ['blur'] },
              ]"
              label="执行人上报截止时间："
            >
              <el-input
                v-model="form.executorReportTimeList[0].draftDeadline"
                disabled
                placeholder="执行人上报截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="budgetCycle"
              :rules="[{ required: true, message: '请输入预算周期', trigger: ['blur'] }]"
              label="预算周期："
            >
              <el-input v-model="form.budgetCycle" disabled placeholder="预算周期" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="departmentReportTimeList[0].draftReportDays"
              :rules="[{ required: true, message: '请输入部门一稿上报天数', trigger: ['blur'] },
            {
                validator:(rule: any, value: any, callback: any) => {
                  if (!(value < Number(form.departmentReportTimeList[1].draftReportDays))&&Number(form.departmentReportTimeList[1].draftReportDays)) {
                    callback(new Error('部门一稿上报天数必须小于一稿修订版上报天数'))
                  } else {
                    callback()
                  }
                },
                trigger: 'blur',
              }]"
              label="部门一稿上报天数："
              required
            >
              <NumberInput
                v-model="form.departmentReportTimeList[0].draftReportDays"
                :precision="0"
                :min="1"
                :max="9999999999"
                :disabled="edit"
                @blurHandler="changeDays(0)"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              label="预算年度："
              prop="budgetYear"
              :rules="[{ required: true, message: '请选择预算年度', trigger: ['blur'] }]"
            >
              <el-select
                v-model="form.budgetYear"
                :clearable="false"
                disabled
                placeholder="请选择预算年度"
                @change="changeYear"
              >
                <el-option
                  v-for="item in budgetYearList"
                  :key="item.id"
                  :label="item.budgetYear"
                  :value="item.budgetYear"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="departmentReportTimeList[0].draftDeadline"
              :rules="[
                { required: true, message: '部门一稿上报截止时间不能为空', trigger: ['blur'] },
              ]"
              label="部门一稿上报截止时间："
            >
              <el-input
                v-model="form.departmentReportTimeList[0].draftDeadline"
                disabled
                placeholder="部门一稿上报截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="budgetPeriod"
              label="预算期间："
              :rules="[{ required: true, message: '请输入预算期间', trigger: ['blur'] }]"
            >
              <el-input v-model="form.budgetPeriod" disabled placeholder="预算期间" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="departmentReportTimeList[1].draftReportDays"
              :rules="[{ required: true, message: '请输入一稿修订版上报天数', trigger: ['blur'] },
             {
                validator:(rule: any, value: any, callback: any) => {
                  if (value <Number(form.departmentReportTimeList[0].draftReportDays)&&Number(form.departmentReportTimeList[0].draftReportDays)) {
                    callback(new Error('一稿修订版上报天数必须大于部门一稿上报天数'))
                  } else {
                    callback()
                  }
                },
                trigger: 'blur',
              },
              {
                validator:(rule: any, value: any, callback: any) => {
                  if (!(value < Number(form.departmentReportTimeList[2].draftReportDays))&&Number(form.departmentReportTimeList[2].draftReportDays)) {
                    callback(new Error('一稿修订版上报天数必须小于部门终稿上报天数'))
                  } else {
                    callback()
                  }
                },
                trigger: 'blur',
              }]"
              label="一稿修订版上报天数："
            >
              <NumberInput
                v-model="form.departmentReportTimeList[1].draftReportDays"
                :precision="0"
                :min="1"
                :max="9999999999"
                :disabled="edit"
                @blurHandler="changeDays(1)"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="创建时间：">
              <el-input v-model="createTime" disabled placeholder="创建时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              label="一稿修订版上报截止时间："
              prop="departmentReportTimeList[1].draftDeadline"
              :rules="[
                { required: true, message: '一稿修订版上报截止时间不能为空', trigger: ['blur'] },
              ]"
            >
              <el-input
                v-model="form.departmentReportTimeList[1].draftDeadline"
                disabled
                placeholder="一稿修订版上报截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="dispatchTime"
              :rules="[{ required: true, message: '请选择分发时间', trigger: ['change'] }]"
              label="分发时间："
            >
              <el-date-picker
                style="width: 300px"
                v-model="form.dispatchTime"
                type="date"
                :clearable="false"
                :disabled="edit"
                placeholder="请选择分发时间"
                value-format="YYYY-MM-DD"
                @change="changeDispatchTime"
                :disabled-date="(date) => dayjs(date).isBefore(dayjs(), 'date')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              prop="departmentReportTimeList[2].draftReportDays"
              :rules="[{ required: true, message: '请输入部门终稿上报天数', trigger: ['blur'] },
             {
                validator:(rule: any, value: any, callback: any) => {
                  if (value <Number(form.departmentReportTimeList[1].draftReportDays)&&Number(form.departmentReportTimeList[1].draftReportDays)) {
                    callback(new Error('部门终稿上报天数必须大于一稿修订版上报天数'))
                  } else {
                    callback()
                  }
                },
                trigger: 'blur',
              }]"
              label="部门终稿上报天数："
              required
            >
              <NumberInput
                v-model="form.departmentReportTimeList[2].draftReportDays"
                :precision="0"
                :min="1"
                :max="9999999999"
                :disabled="edit"
                @blurHandler="changeDays(2)"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="推迟天数：">
              <el-input v-model="form.delayDays" disabled placeholder="推迟天数" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item
              label="部门终稿上报截止时间："
              prop="departmentReportTimeList[2].draftDeadline"
              :rules="[
                { required: true, message: '部门终稿上报截止时间不能为空', trigger: ['blur'] },
              ]"
            >
              <el-input
                v-model="form.departmentReportTimeList[2].draftDeadline"
                disabled
                placeholder="部门终稿上报截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="分发至部门/执行人：">
              <el-input value="与原方案相同的部门和执行人" disabled placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          确认复制
        </el-button>
      </span>
    </template>
    <SetModel ref="setModelRef" @success="visible = false" />
  </el-dialog>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { budgetApi, BudgetApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import SetModel from '../../components/setModel.vue';
  import * as swal from '@/utils/swal';

  const visible = ref(false);
  const templateList = ref([]);
  const draftList = ref([
    { name: '一稿', code: 1 },
    { name: '一稿修订版', code: 2 },
    { name: '终稿', code: 3 },
  ]);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    budgetCycle: '', //1 年度  2季度  3 月度
    budgetCycleCode: '',
    budgetPeriod: '',
    budgetYear: '',
    // code: '',
    // createTime: '',
    delayDays: 0,
    dispatchTime: dayjs().startOf('day').format('YYYY-MM-DD'),
    executorReportTimeList: [
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 1,
      },
    ],
    departmentReportTimeList: [
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 1,
      },
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 2,
      },
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 3,
      },
    ],
    name: '',
    templateCode: '',
  });
  const loading = ref(false);
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const edit = ref(false);
  const setModelRef = ref();
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      let param = JSON.parse(JSON.stringify(form.value));
      // 执行人的二稿，终稿截止时间跟部门截止时间一致
      param.executorReportTimeList[1] = form.value.departmentReportTimeList[1];
      param.executorReportTimeList[2] = form.value.departmentReportTimeList[2];
      param.schemeCode = oldData.value.code;
      delete param.budgetCycle;

      const isConfirmed = await swal.confirm(
        `是否确认复制《${oldData.value.templateName}》为新方案？`
      );
      if (!isConfirmed) return;
      saveLoading.value = true;
      const res = await budgetApi.financeBudgetSchemeCopy(param).catch(() => {
        saveLoading.value = false;
      });
      if (res) {
        edit.value = true;
        ElMessage.success('预算方案复制成功');
        form.value.code = res.code;
        emit('success');
        handleFormCancel();
        saveLoading.value = false;
      }
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    visible.value = false;
    emit('close');
  };
  const title = ref('预算方案-复制');
  const budgetYearList = ref([]);
  const budgetYearData = ref({});
  // 预算配置
  const getBudgetYearSettings = async () => {
    const res = await budgetApi.financeBudgetYearSettingsList();
    if (res) {
      budgetYearList.value = res || [];
      if (budgetYearList.value.length) {
        budgetYearData.value = budgetYearList.value[0];
        form.value.budgetCycle = budgetYearList.value[0].budgetCycle;
        form.value.budgetPeriod = budgetYearList.value[0].budgetPeriod;
        form.value.budgetYear = budgetYearList.value[0].budgetYear;
        form.value.budgetCycleCode = budgetYearList.value[0].budgetCycleCode;
      }
    }
  };
  // 选择预算年度带出对应年度的周期和预算期间值
  const changeYear = () => {
    const res = budgetYearList.value.find((item) => {
      return item.budgetYear === form.value.budgetYear;
    });
    if (res) {
      budgetYearData.value = res;
      form.value.budgetPeriod = res.budgetPeriod;
      form.value.budgetCycle = res.budgetCycle;
      form.value.budgetCycleCode = res.budgetCycleCode;
    }
  };
  // 修改预算年度启用状态
  const changeBudgetYearStatus = async () => {
    let param = {
      budgetCurrency: budgetYearData.value.budgetCurrency,
      budgetCycle: budgetYearData.value.budgetCycle,
      budgetPeriod: budgetYearData.value.budgetPeriod,
      budgetYear: budgetYearData.value.budgetYear,
      id: budgetYearData.value.id,
    };
    const res = await budgetApi.financeBudgetYearSettingsSave(param);
  };
  // 模版列表
  const getTemplateList = async () => {
    const res = await budgetApi.financeBudgetSchemeTemplateQueryList({});
    templateList.value = res.recordList;
  };
  // 计算截止时间
  const getSchemeCalcFinishDate = async (days, dispatchDay) => {
    if (days) {
      const res = await budgetApi.financeBudgetSchemeCalcFinishDate({
        days: days,
        dispatchDay: dispatchDay,
      });
      if (res.finishDate) {
        return res.finishDate;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  const changeDays = async (type) => {
    if (type == 3) {
      //执行人
      form.value.executorReportTimeList[0].draftDeadline = await getSchemeCalcFinishDate(
        form.value.executorReportTimeList[0].draftReportDays,
        form.value.dispatchTime
      );
    } else {
      //部门
      form.value.departmentReportTimeList[type].draftDeadline = await getSchemeCalcFinishDate(
        form.value.departmentReportTimeList[type].draftReportDays,
        form.value.dispatchTime
      );
    }
  };

  const changeDispatchTime = () => {
    form.value.executorReportTimeList = [
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 1,
      },
    ];
    form.value.departmentReportTimeList = [
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 1,
      },
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 2,
      },
      {
        draftDeadline: '',
        draftReportDays: null,
        level: 3,
      },
    ];
  };

  const createTime = ref('');
  const oldData = ref({});
  const open = async (row) => {
    oldData.value = row;
    form.value.templateCode = row.templateCode;
    form.value.budgetYear = row.budgetYear;
    edit.value = false;
    form.value = {
      budgetCycle: row.budgetCycleDesc, //1 年度  2季度  3 月度
      budgetCycleCode: row.budgetCycle,
      budgetPeriod: row.budgetPeriod,
      budgetYear: row.budgetYear,
      stepLevel: row.nowStepCode,
      delayDays: 0,
      dispatchTime: dayjs().startOf('day').format('YYYY-MM-DD'),
      executorReportTimeList: [
        {
          draftDeadline: '',
          draftReportDays: null,
          level: 1,
        },
      ],
      departmentReportTimeList: [
        {
          draftDeadline: '',
          draftReportDays: null,
          level: 1,
        },
        {
          draftDeadline: '',
          draftReportDays: null,
          level: 2,
        },
        {
          draftDeadline: '',
          draftReportDays: null,
          level: 3,
        },
      ],
      name: '',
      templateCode: row.templateCode,
    };
    if (formRef.value) {
      formRef.value.resetFields();
    }
    createTime.value = dayjs().startOf('day').format('YYYY-MM-DD');
    getTemplateList();
    // getBudgetYearSettings();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
