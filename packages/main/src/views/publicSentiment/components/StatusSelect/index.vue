<template>
  <div class="custom-table-select">
    <el-select
      ref="selectRef"
      :model-value="modelValue"
      @update:model-value="handleChange"
      v-bind="$attrs"
    >
      <el-option
        v-for="item in options"
        :key="`${item.label}-${item.value}`"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        style="margin-bottom: 10px; background-color: transparent !important"
      >
        <div class="custom-option-item" :class="`status-${item.value}`">
          <div class="left">
            <span class="icon">
              <Select v-if="item.label === '已解决'" class="icon-select" />
              <CloseBold v-if="item.label === '无需处理'" class="icon-close" />
            </span>
            <span class="label">{{ item.label }}</span>
          </div>
          <el-icon v-if="item.value === +modelValue" class="selected" :size="12">
            <Select color="#02B96B" />
          </el-icon>
        </div>
      </el-option>
      <template #label="{ label, value }">
        <div class="custom-option-item" :class="`status-${value}`">
          <div class="left">
            <span class="icon">
              <Select v-if="label === '已解决'" class="icon-select" />
              <CloseBold v-if="label === '无需处理'" class="icon-close" />
            </span>
            <span class="label">{{ label }}</span>
          </div>
        </div>
      </template>
    </el-select>
  </div>
</template>

<script lang="ts" setup name="StatusSelect">
  import { ref } from 'vue';
  import { ElSelect } from 'element-plus';
  import { Select, CloseBold } from '@element-plus/icons-vue';

  export interface StatusOption {
    value: number | string | null;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    modelValue: number | string | null;
    options: StatusOption[];
  }

  interface Emits {
    (e: 'update:modelValue', value: number | string | null): void;
    (e: 'change', value: number | string | null): void;
  }

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const selectRef = ref<InstanceType<typeof ElSelect>>();

  const handleChange = (value: number | string | null) => {
    emit('update:modelValue', value);
    emit('change', value);
  };

  // 暴露 el-select 的所有方法和属性
  defineExpose({
    blur: () => selectRef.value?.blur(),
    focus: () => selectRef.value?.focus(),
  });

  watch(
    () => props.modelValue,
    (value) => {
      console.log('modelValue changed:', value);
    }
  );
</script>

<style scoped lang="scss">
  .custom-table-select {
    :deep(.el-select__suffix) {
      display: none;
    }
    :deep(.el-select__wrapper) {
      box-shadow: none;
      padding-left: 0;
      background-color: transparent;
    }
    :deep(.el-select__wrapper.is-disabled) {
      background-color: transparent;
    }
    :deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
      box-shadow: none;
    }
  }

  .custom-option-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    .left {
      display: flex;
      align-items: center;
      justify-content: left;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: 1px solid #999999;
      border-radius: 4px;
    }
    .selected {
      justify-items: flex-end;
    }

    &.status--1 {
      .left {
        background: #fffaeb;
      }
      .icon {
        border-color: #ff9f22;
      }
      .label {
        color: #ff9f22;
      }
    }
    &.status-0 {
      .left {
        background: #e8f4ff;
      }
      .icon {
        border-color: #258dff;
      }
      .label {
        color: #258dff;
      }
    }
    &.status-1 {
      .left {
        background: #f0fff6;
      }
      .icon {
        border-color: #02b96b;
        .icon-select {
          color: #02b96b;
        }
      }
      .label {
        color: #02b96b;
      }
    }
    &.status-4 {
      .left {
        background: #f5f5f5;
      }
      .icon {
        border-color: #999999;
        .icon-close {
          color: #999999;
        }
      }
      .label {
        color: #999999;
      }
    }
    &.status-5 {
      .left {
        background: #fff4f0;
      }
      .icon {
        border-color: #ff6b3d;
      }
      .label {
        color: #ff6b3d;
      }
    }
    &.status-6 {
      .left {
        background: #f4f0ff;
      }
      .icon {
        border-color: #7a4dff;
      }
      .label {
        color: #7a4dff;
      }
    }
  }
</style>
