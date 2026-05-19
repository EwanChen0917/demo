<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    @change="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in incomeRuleQueryTableFields"
      :key="item.key"
      :label="item.key"
      :value="item.key"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      fileData?: Object; //行信息
      fileType?: string; //结算数据，信息数据一，信息数据二
      clearable?: boolean;
    }>(),
    {
      placeholder: '列名',
      clearable: true,
    }
  );
  const emit = defineEmits(['update:modelValue']);
  const incomeRuleQueryTableFields = ref<any[]>([]);
  const getIncomeRuleTableOptions = (fileData) => {
    let filePath = '';
    if (props.fileType == '1') {
      //结算数据
      filePath = fileData?.settleFile.filePath;
    }
    if (props.fileType == '2') {
      //信息数据一
      filePath = fileData?.infoFile1.filePath;
    }
    if (props.fileType == '3') {
      //信息数据二
      filePath = fileData?.infoFile2.filePath;
    }
    if (filePath) {
      let list = localStorage.getItem('incomeRuleQueryTableFieldsList');
      list = JSON.parse(list);
      if (list && list.length) {
        let find = list.find((item) => {
          return item.filePath == filePath;
        });
        if (find) {
          incomeRuleQueryTableFields.value = find.data;
        }
      }
    } else {
      incomeRuleQueryTableFields.value = [];
    }
  };

  getIncomeRuleTableOptions(props.fileData);

  watch(
    () => [props.fileType],
    () => {
      getIncomeRuleTableOptions(props.fileData);
    }
  );
</script>

<style scoped lang="scss"></style>
