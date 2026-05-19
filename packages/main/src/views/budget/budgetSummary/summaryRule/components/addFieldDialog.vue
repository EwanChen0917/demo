<template>
  <el-dialog title="新增指标" :model-value="visibility" @close="close">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100">
      <el-form-item label="指标名称：" prop="fieldNameList">
        <el-input
          v-model.trim="form.fieldNameList"
          placeholder="请输入指标，一行一项，按回车键换行，最多支持100行"
          type="textarea"
          :rows="10"
          clearable
        />
      </el-form-item>
    </el-form>
    <div class="tip">请确认汇总表指标名称，后续不允许修改！！！</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { financeSystemApi } from '@/api';
  import DataFieldSelectInput from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelectInput.vue';

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    fieldNameList: null,
  });
  const fieldNameList = ref([]);
  const rules = ref({
    fieldNameList: [
      { required: true, message: '请输入指标名称', trigger: ['change', 'blur'] },
      // {
      //   validator: (rule: any, value: any, callback: any) => {
      //     let arr = mainDatalist.value.filter((item) => item.value === value);
      //     console.log(arr);
      //     if (arr.length == 1) {
      //       callback(new Error('指标已存在'));
      //     } else {
      //       callback();
      //     }
      //   },
      //   trigger: 'blur',
      // },
    ],
  });
  const budgetTemplateCode = ref();
  const mainDatalist = ref([]);
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success', val): void;
  }>();
  const handleBatchSearch = () => {
    search.shopList = fieldNameList.value
      ?.replace(/\n/g, ',')
      .split(',')
      .filter((res) => res);
    shopList.value = [];
  };
  const findDuplicates = (arr) => {
    const countMap = new Map();
    const dupItems = new Set(); // 用Set避免重复记录同一元素
    for (const item of arr) {
      if (countMap.has(item)) {
        dupItems.add(item);
      } else {
        countMap.set(item, 1);
      }
    }
    return {
      hasDup: dupItems.size > 0,
      dupItems: Array.from(dupItems), // 转为数组返回
    };
  };
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const name = form.value.fieldNameList
        ?.replace(/\n/g, ',')
        .split(',')
        .filter((res) => res);
      const result = findDuplicates(name);
      if (result.hasDup) {
        ElMessage.error(`存在重复数据：${result.dupItems.join('，')}`);
        return;
      }
      const findLen = name.find((item) => item.length > 50);
      if (findLen) {
        ElMessage.error(`单个指标名称已超过50个字限制，请适当删减`);
        return;
      }
      const datalist = mainDatalist.value.map((item) => item.value);
      const result2 = findDuplicates([...name, ...datalist]);
      if (result2.hasDup) {
        ElMessage.error(`${result2.dupItems.join('，')}指标已存在`);
        return;
      }
      const nameArr = name.map((item) => {
        return { fieldName: item };
      });
      const res = await financeSystemApi.financeBudgetRuleFieldNameToCodes(nameArr);
      ElMessage.success('新增指标成功');
      emit('success', res);
      close();
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    form.value = {
      fieldNameList: null,
    };
    close();
  };
  const close = () => {
    visibility.value = false;
    emit('close');
  };
  const visibility = ref(false);
  const open = async (code, list) => {
    budgetTemplateCode.value = code;
    mainDatalist.value = list;
    form.value = {
      fieldNameList: null,
    };
    visibility.value = true;
    if (formRef.value) {
      formRef.value.resetFields();
    }
  };
  defineExpose({ open });
</script>
<style scoped lang="scss">
  .tip {
    font-size: 12px;
    color: var(--el-color-danger);
    margin-left: 23px;
  }
</style>
