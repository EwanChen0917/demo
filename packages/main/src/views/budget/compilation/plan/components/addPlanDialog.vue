<template>
  <el-dialog
    :title="title"
    width="1000px"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
  >
    <el-form :model="form" ref="formRef" label-width="180px" label-position="right">
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
              @blur-handler="changeDays(3)"
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
              :disabled="edit"
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
            :rules="[{ required: true, message: '执行人上报截止时间不能为空', trigger: ['blur'] }]"
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
              @blur-handler="changeDays(0)"
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
              @blur-handler="changeDays(1)"
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
              @blur-handler="changeDays(2)"
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
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          下一步
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

  const visible = ref(false);
  const templateList = ref([]);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    budgetCycle: '', // 1 年度  2季度  3 月度
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
      const param = JSON.parse(JSON.stringify(form.value));
      // 执行人的二稿，终稿截止时间跟部门截止时间一致
      param.executorReportTimeList[1] = form.value.departmentReportTimeList[1];
      param.executorReportTimeList[2] = form.value.departmentReportTimeList[2];
      delete param.budgetCycle;
      if (form.value.code) {
        // 不重复新增
        setModelRef.value.open('分发部门', form.value.code, 0);
        return;
      }
      saveLoading.value = true;
      const res = await budgetApi.financeBudgetSchemeSave(param).catch(() => {
        saveLoading.value = false;
      });
      if (res) {
        edit.value = true;
        ElMessage.success('预算方案新增成功');
        form.value.code = res.code;
        emit('success');
        if (budgetYearData.value.id !== budgetYearList.value[0].id) {
          // 新增的和之前的启用的预算年度不一样，启用最新的
          changeBudgetYearStatus();
        }
        saveLoading.value = false;
        setModelRef.value.open('分发部门', res.code, 0);
      }
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    visible.value = false;
    emit('close');
  };
  const title = ref('预算方案-新增');
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
    const param = {
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
        days,
        dispatchDay,
      });
      if (res.finishDate) {
        return res.finishDate;
      }
      return null;
    }
    return null;
  };
  const changeDays = async (type) => {
    if (type == 3) {
      // 执行人
      form.value.executorReportTimeList[0].draftDeadline = await getSchemeCalcFinishDate(
        form.value.executorReportTimeList[0].draftReportDays,
        form.value.dispatchTime
      );
    } else {
      // 部门
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
  const open = async () => {
    edit.value = false;
    form.value = {
      budgetCycle: '', // 1 年度  2季度  3 月度
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
    };
    if (formRef.value) {
      formRef.value.resetFields();
    }
    createTime.value = dayjs().startOf('day').format('YYYY-MM-DD');
    getTemplateList();
    getBudgetYearSettings();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
