<!-- TaskStatusDropdown.vue -->
<template>
  <el-dropdown
    trigger="click"
    class="status-dropdown"
    @command="onSelect"
  >
    <span class="status-tag" :style="getStatusStyle(model)">
      {{ statusDescMap[model] }}
      <el-icon><ArrowDown /></el-icon>
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="opt in statusOptions"
          :key="opt.value"
          :command="opt.value"
          class="status-item"
        >
          <span class="status-tag" :style="getStatusStyle(opt.value)">
            {{ opt.label }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps<{ modelValue: string | number }>()
const emit  = defineEmits<{
  (e: 'update:modelValue', v: string | number): void
  (e: 'change', v: string | number): void
}>()

const model = ref<number>(Number(props.modelValue))
watch(() => props.modelValue, v => model.value = Number(v))

const statusOptions = [
  { value: 1, label: '进行中未延期' },
  { value: 2, label: '预计延期' },
]
const statusDescMap = Object.fromEntries(
  statusOptions.map(o => [o.value, o.label])
) as Record<number, string>

const onSelect = (val: number) => {
  model.value = val
  emit('update:modelValue', val)
  emit('change', val)
}

const getStatusStyle = (v: number) => {
  if (v === 2) return { color: '#FF4C34', background: '#FF4C340F' }
  return { color: '#50cd89', background: '#e8fff3' }
}
</script>

<style scoped lang="scss">
.status-dropdown {
  cursor: pointer;
}
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  height: 24px;
  font-size: 12px;
  border-radius: 4px;
}
.status-item .status-tag {
  padding: 0 12px;
}
</style>
