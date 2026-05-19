<template>
  <el-radio-group v-model="mode" size="small" class="view-mode-toggle" @change="handleModeChange">
    <el-radio-button v-for="item in options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { VIEW_MODES } from '../constant';

const STORAGE_KEY_PREFIX = 'procurement_view_mode_';

const props = withDefaults(
  defineProps<{
    storageKey?: string;
    options?: { label: string; value: string }[];
  }>(),
  {
    storageKey: 'default',
    options: () => VIEW_MODES,
  }
);

const emit = defineEmits<{
  (event: 'change', value: string): void;
}>();

const model = defineModel<string>({
  default: VIEW_MODES[0]?.value ?? 'demand',
});

const storageKey = computed(() => `${STORAGE_KEY_PREFIX}${props.storageKey || 'default'}`);

onMounted(() => {
  const stored = localStorage.getItem(storageKey.value);
  if (stored && props.options.some((item) => item.value === stored)) {
    model.value = stored;
  }
});

function handleModeChange(value: string) {
  if (!value) return;
  localStorage.setItem(storageKey.value, value);
  mode.value = value;
  emit('change', value);
}

const mode = computed({
  get: () => model.value,
  set: (val: string) => {
    model.value = val;
  },
});

const options = computed(() => props.options);
</script>

<style scoped>
.view-mode-toggle {
  display: inline-flex;
  align-items: center;
}

.view-mode-toggle :deep(.el-radio-button__inner) {
  outline: none !important;
  box-shadow: none !important;
}

.view-mode-toggle :deep(.el-radio-button.is-focus .el-radio-button__inner) {
  outline: none !important;
  box-shadow: none !important;
}
</style>
