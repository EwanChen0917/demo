<template>
  <el-dialog :title="title" :model-value="visibility" @close="close">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="预算年度：" prop="budgetYear">
            <el-date-picker
              v-model="form.budgetYear"
              @change="changeYear"
              type="year"
              placeholder="预算年度"
              value-format="YYYY"
              format="YYYY"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预算期间：" required>
            <el-input v-model="form.budgetPeriod" disabled placeholder="预算期间" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in initConfigList" v-if="initConfigList.length">
        <el-col :span="12">
          <el-form-item
            label="预算方案："
            :prop="`schemeCode${index}`"
            :rules="[{ required: true, message: '请选择预算方案', trigger: ['change'] }]"
          >
            <el-select v-model="form[`schemeCode${index}`]" placeholder="请选择预算方案">
              <el-option
                v-for="item in item.schemeList"
                :key="item.schemeCode"
                :label="item.schemeName"
                :value="item.schemeCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预算表：">
            <el-input v-model="item.templateName" disabled placeholder="预算表" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-else>
        <div class="no-data">{{ form.budgetYear }}年暂无预算数据</div>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { budgetApi } from '@/api';
  import * as swal from '@/utils/swal';

  const title = ref('获取预算');
  const schemeCode = ref('');
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    budgetYear: null,
    budgetPeriod: null,
  });
  const rules = ref({
    budgetYear: [{ required: true, message: '请选择预算年度', trigger: ['change'] }],
    paymentDate: [{ required: true, message: '请选择预算期间', trigger: ['change'] }],
  });
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();

  const budgetYearList = ref([]);
  const budgetYearData = ref({});
  const initConfigList = ref([]);
  // 预算配置
  const getBudgetYearSettings = async () => {
    const res = await budgetApi.financeBudgetYearSettingsList();
    if (res) {
      budgetYearList.value = res || [];
      if (budgetYearList.value.length) {
        budgetYearData.value = budgetYearList.value[0];
        form.value.budgetPeriod = budgetYearList.value[0].budgetPeriod;
        form.value.budgetYear = budgetYearList.value[0].budgetYear;
        getPoolQueryInitConfig();
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
      form.value = {
        budgetPeriod: res.budgetPeriod,
        budgetYear: res.budgetYear,
      };
      getPoolQueryInitConfig();
    } else {
      const oldData = JSON.parse(JSON.stringify(form.value));
      form.value = {
        budgetPeriod: oldData.budgetPeriod,
        budgetYear: oldData.budgetYear,
      };
      initConfigList.value = [];
    }
  };
  // 查询预算初始化配置
  const getPoolQueryInitConfig = async () => {
    const res = await budgetApi.financeBudgetPoolQueryInitConfig({
      budgetYear: form.value.budgetYear,
      budgetPeriod: form.value.budgetPeriod,
    });
    initConfigList.value = res;
    initConfigList.value.forEach((item, index) => {
      let schemeCode = '';
      if (item.schemeList) {
        let find = item.schemeList.find((i) => i.historySelect);
        if (find) {
          schemeCode = find.schemeCode;
        }
      }
      Reflect.set(form.value, `schemeCode${index}`, schemeCode);
    });
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      let schemeCodeList = [];
      initConfigList.value.forEach((item, index) => {
        schemeCodeList.push(form.value[`schemeCode${index}`]);
      });
      const batchCode = await budgetApi.financeBudgetPoolInitBudgetPool({
        budgetYear: form.value.budgetYear,
        schemeCodeList: schemeCodeList,
      });
      sessionStorage.removeItem('financeBudgetBatchCode');
      sessionStorage.setItem('financeBudgetBatchCode', JSON.stringify(batchCode));
      ElMessage.success('操作成功');
      emit('success', JSON.stringify(batchCode), 0);
      close();
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    close();
  };
  const close = () => {
    visibility.value = false;
    emit('close');
  };
  const visibility = ref(false);
  const open = async (ids) => {
    getBudgetYearSettings();
    if (ids) {
      schemeCode.value = ids;
      visibility.value = true;
    }
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };
  defineExpose({ open });
</script>
<style scoped lang="scss">
  .no-data {
    width: 100%;
    text-align: center;
    color: #999;
    padding-top: 40px;
  }
</style>
