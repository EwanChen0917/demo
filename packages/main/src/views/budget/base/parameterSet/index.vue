<template>
  <el-form ref="formRef" :model="form" label-width="150" scroll-to-error>
    <KeenCard title="参数设置">
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item
            prop="budgetYear"
            label="预算年度:"
            :rules="[{ required: true, message: '请选择预算年度', trigger: 'change' }]"
          >
            <el-date-picker
              v-model="form.budgetYear"
              type="year"
              placeholder="请选择"
              value-format="YYYY"
              format="YYYY"
              :clearable="false"
              @change="changeYear"
              style="width: 288px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="预算周期：" required>
            <el-input v-model="form.budgetCycle" disabled placeholder="预算周期" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="预算期间:" required>
            <el-form-item
              prop="startTime"
              label=""
              :rules="[{ required: true, message: '预算开始月份', trigger: 'change' }]"
            >
              <el-date-picker
                v-model="form.startTime"
                type="month"
                placeholder="预算开始月份"
                value-format="YYYY-MM"
                style="width: 130px"
                :clearable="false"
                :disabled-date="
                  (date) =>
                    form?.endTime ? dayjs(date).isAfter(dayjs(form.endTime), 'date') : false
                "
                :disabled="!submitButtonShow"
              />
            </el-form-item>
            <span class="me-2 ms-2">到</span>
            <el-form-item
              prop="endTime"
              label=""
              :rules="[{ required: true, message: '预算结束月份', trigger: 'change' }]"
            >
              <el-date-picker
                v-model="form.endTime"
                type="month"
                placeholder="预算结束月份"
                value-format="YYYY-MM"
                style="width: 130px"
                :clearable="false"
                :disabled-date="
                  (date) =>
                    form?.startTime ? !dayjs(date).isAfter(dayjs(form?.startTime), 'date') : false
                "
                :disabled="!submitButtonShow"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="预算币种:" required>
            <el-input v-model="form.budgetCurrency" disabled placeholder="预算币种" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="submitButtonShow">
    <el-space>
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </el-space>
  </div>
</template>

<script lang="ts" setup name="parameterSet">
  import dayjs from 'dayjs';
  import { budgetApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    budgetCurrency: 'CNY',
    budgetCycle: '年度',
    budgetPeriod: '',
    budgetYear: '',
    startTime: '',
    endTime: '',
  });
  const yearData = ref(); // 今年预算明年
  const firstAdd = ref(false); // 是否是首次新增参数设置
  const changeYear = async () => {
    form.value.budgetCurrency = '';
    form.value.budgetPeriod = '';
    form.value.budgetCycle = '';
    form.value.startTime = '';
    form.value.endTime = '';
    const res = await budgetApi.financeBudgetYearSettings({ year: form.value.budgetYear });
    if (res) {
      form.value.budgetCurrency = res.budgetCurrency || 'CNY';
      form.value.budgetPeriod = res.budgetPeriod;
      form.value.budgetCycle = res.budgetCycle || '年度';
      getBudgetPeriod();
    }
  };
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) {
      return;
    }
    const param = {
      budgetCurrency: form.value.budgetCurrency,
      budgetCycle: form.value.budgetCycle,
      budgetPeriod: `${form.value.startTime}到${form.value.endTime}`,
      budgetYear: form.value.budgetYear,
    };
    const res = await budgetApi.financeBudgetYearSettingsSave(param);
    if (res) {
      ElMessage.success('参数设置成功');
      getBudgetYearSettings();
    }
  };

  // 预算配置
  const getBudgetYearSettings = async () => {
    const year = dayjs().format('YYYY');
    yearData.value = `${Number(year) + 1}`;
    if (form.value.budgetYear == '') {
      form.value.budgetYear = yearData.value;
    }
    const res = await budgetApi
      .financeBudgetYearSettings({ year: form.value.budgetYear })
      .catch((err) => {
        if (err.message == '预算年度不存在') {
          firstAdd.value = true;
        }
      });
    if (res && res.constructor === Object) {
      form.value = res;
      getBudgetPeriod();
    } else {
      form.value.budgetYear = yearData.value;
    }
  };
  const getBudgetPeriod = () => {
    if (form.value.budgetPeriod) {
      const arr = form.value.budgetPeriod.split('到');
      form.value.startTime = arr[0];
      form.value.endTime = arr[1];
    } else {
      form.value.startTime = '';
      form.value.endTime = '';
    }
  };
  getBudgetYearSettings();
  // 保存按钮是否显示
  const submitButtonShow = computed(() => {
    // 历史，已归档状态只能查看
    if (Number(form.value.budgetYear) >= yearData.value && !form.value.budgetPeriod) {
      return true;
    }
    return false;
  });
</script>

<style scoped lang="scss"></style>
