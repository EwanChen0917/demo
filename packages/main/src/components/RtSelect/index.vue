<template>
  <el-select
    class="rt_select_wrap"
    v-model="val"
    :teleported="teleported"
    :placeholder="placeholder"
    :size="size"
    @change="change"
    :filterable="filterable"
    :clearable="clearable"
    popper-class="rt_el_select"
  >
    <el-option
      v-for="item in optionList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      selectVal: string | number;
      optionList: optionItf[];
      filterable?: boolean;
      clearable?: boolean;
      teleported?: boolean;
      size?: any;
      placeholder?: string;
    }>(),
    {
      filterable: true,
      clearable: true,
      teleported: true,
      size: 'large',
      placeholder: '请选择'
    }
  );

  const state = reactive<{
    val: any;
  }>({
    val: ''
  });
  const { val } = toRefs(state);

  watch(
    () => props.selectVal,
    (value: string) => {
      val.value = value;
    },
    { immediate: true }
  );

  // 监听
  watch(
    () => val.value,
    (val: string) => {
      emit('update:selectVal', val);
    }
  );

  const change = (val: any) => {
    emit('selectChange', val);
  };

  const emit = defineEmits<{
    (event: 'selectChange', val: any): void;
    (event: 'update:selectVal', val: string);
  }>();
</script>

<style lang="scss" scoped>
  .rt_select_wrap {
    width: 100%;
    :deep(.el-input__wrapper) {
      background-color: var(--bs-gray-100);
      border-color: var(--bs-gray-100);
      color: var(--bs-input-solid-color);
      transition: color 0.2s ease;
      border: 1px solid var(--bs-gray-300);
      box-shadow: none !important;
      height: auto;
      outline: none !important;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.5;
      border: 1px solid var(--bs-gray-300);
      border-radius: 0.475rem;
    }
    :deep(.el-input__inner) {
      font-size: 1.1rem;
      font-weight: 500;
      color: #5e6278;
    }
    :deep(.el-input__inner::placeholder) {
      color: var(--bs-input-solid-color);
    }
    :deep(.el-input.is-focus .el-input__wrapper) {
      box-shadow: none !important;
    }
  }
</style>
