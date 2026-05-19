<template>
  <div class="checkbox-wrapper">
    <el-checkbox-group v-model="localValue" class="checkbox-group" :disabled="disabled">
      <el-checkbox 
        v-for="item in options" 
        :key="item.value" 
        :value="item.value"
        :label="item.label"
      >
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">

 type checkboxValue = {
    desc: string | undefined;
    value: string | undefined;
  };

  interface Option {
    label: string;
    value: any;
  }

  interface Props {
    modelValue?: checkboxValue[];
    options?: Option[];
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const localValue = ref(props.modelValue?.map(item => item.value) || []);

  const emit = defineEmits<{
    'update:modelValue': [value: checkboxValue[]];
  }>();

  watch(localValue, (newVal) => {
    const handleData: any[] =  newVal.map(item => {
      const optObj = props.options?.find(opt => opt.value == item);
      return { desc: optObj?.label, value: item }
    })
    emit('update:modelValue', handleData);
  }, {
    deep: true
  });

</script>

<style scoped lang="scss">
  .checkbox-wrapper {
    display: flex;
    flex: 1;
    align-items: center;

    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      :deep(.el-checkbox) {
        margin-right: 0;
        
        .el-checkbox {
          font-size: 12px;
          color: #1f1f1f;
        }
      }

      :deep(.el-checkbox.is-checked) {
        .el-checkbox {
          color: var(--el-color-primary);
        }
      }
    }
  }
</style>

