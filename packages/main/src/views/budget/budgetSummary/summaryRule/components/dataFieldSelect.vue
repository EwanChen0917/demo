<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    @change="$emit('update:modelValue', $event)"
    @focus="getIncomeRuleTableOptions"
  >
    <el-option v-for="item in fieldsLists" :key="item.key" :label="item.value" :value="item.key" />
  </el-select>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      fileData?: Object; //行信息
      code?: string;
      clearable?: boolean;
    }>(),
    {
      placeholder: '列名',
      clearable: true,
    }
  );
  const emit = defineEmits<{
    (e: 'update:modelValue', val);
    (e: 'change', val);
  }>();
  const fieldsLists = ref<any[]>([]);
  const getIncomeRuleTableOptions = () => {
    if (props.code) {
      let list = localStorage.getItem('budgetSummaryRuleFieldsList');
      list = JSON.parse(list);
      if (list && list.length) {
        let find = list.find((item) => {
          return item.code == props.code;
        });
        if (find) {
          fieldsLists.value = find.data;
        }
      }
    } else {
      fieldsLists.value = [];
    }
  };

  getIncomeRuleTableOptions();
  const changeValue = () => {
    const obj = fieldsLists.value.find((res) => {
      return res.key == props.modelValue;
    });
    if (obj) {
      emit('change', obj.value);
    } else {
      // emit('change', '');
    }
  };
  watch(
    () => props.modelValue,
    () => {
      changeValue();
    },
    {
      immediate: true,
      deep: true,
    }
  );
  watch(
    () => [props.code],
    () => {
      getIncomeRuleTableOptions();
    },
    {
      immediate: true,
      deep: true,
    }
  );
</script>

<style scoped lang="scss"></style>
