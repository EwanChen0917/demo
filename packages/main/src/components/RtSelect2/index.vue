<template>
  <el-select
    class="rt_select_wrap2"
    v-model="val"
    :teleported="teleported"
    placeholder="Select option"
    :size="size"
    @change="change"
    :filterable="filterable"
    :clearable="clearable"
    popper-class="rt_el_select2"
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
    }>(),
    {
      filterable: true,
      clearable: true,
      teleported: true,
      size: 'large'
    }
  );

  const state = reactive<{
    val: any;
  }>({
    val: ''
  });
  const { val } = toRefs(state);

  val.value = props.selectVal as any;

  const change = (val: any) => {
    emit('selectChange', val);
  };

  const emit = defineEmits<{
    (event: 'selectChange', val: any): void;
  }>();
</script>

<style lang="scss" scoped>
  .rt_select_wrap2 {
    width: 100%;
    :deep(.el-input__wrapper) {
      background-color: transparent;
      border-color: var(--bs-gray-100);
      color: var(--bs-input-solid-color);
      transition: color 0.2s ease;
      border: 1px solid transparent;
      box-shadow: none !important;
      height: auto;
      outline: none !important;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.5;
      border-radius: 0.475rem;
    }
    :deep(.el-input__inner) {
      font-size: 1.1rem;
      color: #3f4254;
      padding-right: 10px;
      font-weight: 500;
    }
    :deep(.el-input__inner::placeholder) {
      color: var(--bs-input-solid-color);
    }
    :deep(.el-input.is-focus .el-input__wrapper) {
      box-shadow: none !important;
    }
    ::v-deep(.el-select__caret) {
      color: #3f4254;
    }
  }
</style>
