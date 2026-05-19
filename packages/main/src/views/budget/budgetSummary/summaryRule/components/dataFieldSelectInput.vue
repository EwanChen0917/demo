<template>
  <el-autocomplete
    v-model.trim="modelValueData"
    :fetch-suggestions="querySearch"
    clearable
    :disabled="disabled"
    :placeholder="placeholder"
    @blur="blurData"
    @clear="$emit('update:modelValue', modelValueData)"
    @change="$emit('update:modelValue', modelValueData)"
    @select="$emit('update:modelValue', modelValueData)"
  />
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      code?: string; //数据源
      clearable?: boolean;
      disabled?: boolean;
    }>(),
    {
      placeholder: '列名',
      clearable: true,
      disabled: false,
    }
  );
  const emit = defineEmits<{
    (e: 'update:modelValue', val);
    (e: 'change', val);
    (e: 'blur');
  }>();

  const modelValueData = ref(props.modelValue);
  const modelNameData = ref('');
  const fieldsLists = ref<any[]>([]);
  const getSummaryRuleOptions = () => {
    if (props.code) {
      let list = localStorage.getItem('budgetSummaryRuleFieldsList');
      list = JSON.parse(list);
      if (list && list.length) {
        let find = list.find((item) => {
          return item.code == props.code;
        });
        if (find) {
          // 支持模糊搜索需要按名称的key搜
          fieldsLists.value = find.data;
        }
      }
    } else {
      fieldsLists.value = [];
    }
  };
  getSummaryRuleOptions();
  const createFilter = (queryString: string) => {
    return (restaurant) => {
      return restaurant.value.toLowerCase().includes(queryString.toLowerCase());
    };
  };
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? fieldsLists.value.filter(createFilter(queryString))
      : fieldsLists.value;
    cb(results);
  };
  const changeValue = () => {
    const obj = fieldsLists.value.find((res) => {
      return res.value == modelValueData.value;
    });
    if (obj) {
      emit('change', obj.key);
    } else {
      emit('change', '');
    }
  };
  const blurData = async () => {
    if (modelValueData.value) {
      const res = await financeSystemApi.financeBudgetRuleFieldNameToCode({
        fieldName: modelValueData.value,
      });
      emit('change', res);
      emit('blur');
      emit('update:modelValue', modelValueData.value);
    }
  };

  watch(
    () => modelValueData.value,
    () => {
      changeValue();
    }
  );
  watch(
    () => [props.code],
    () => {
      getSummaryRuleOptions();
    },
    {
      immediate: true,
      deep: true,
    }
  );
</script>

<style scoped lang="scss"></style>
