<template>
  <el-select
    v-model="selectList"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    :max-collapse-tags="maxCollapseTags"
    :loading="loading"
  >
    <template v-if="groups.length">
      <el-option-group
        v-for="group in groups"
        :key="group.value"
        :label="group.label"
      >
        <el-option
          v-for="opt in group.options"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
          :disabled="opt.disabled"
        />
      </el-option-group>
    </template>

    <template v-else>
      <el-option
        v-for="opt in flatOptions"
        :key="opt.value"
        :label="opt.label"
        :value="opt.value"
        :disabled="opt.disabled"
      />
    </template>
  </el-select>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { platformApi } from '@/api'

const props = defineProps({
  resourceType: { type: String, default: undefined },
  placeholder: { type: String, default: '请选择' },
  clearable: { type: Boolean, default: true },
  multiple: { type: Boolean, default: true },
  maxCollapseTags: { type: Number, default: 1 },
})

const selectList = defineModel('selectList', { type: Array, default: () => [] })

const raw = ref([])
const loading = ref(false)

function mapCooperList(list = []) {
  return (list || []).map(i => ({
    label: i.cooperTypeName ?? i.name ?? i.label ?? '',
    value: i.cooperTypeCode ?? i.id ?? i.value,
    disabled: !!i.disabled,
    __raw: i,
  }))
}

const groups = computed(() => {
  const items = Array.isArray(raw.value) ? raw.value : (raw.value?.resourceCooperList ?? [])
  if (!Array.isArray(items) || items.length === 0) return []

  const filtered = props.resourceType
    ? items.filter(it => it.resourceTypeCode === props.resourceType)
    : items

  return filtered.map(it => ({
    label: it.resourceTypeName ?? it.resourceTypeCode ?? '未命名分组',
    value: it.resourceTypeCode ?? it.resourceTypeName,
    options: mapCooperList(it.cooperTypeList || []),
  })).filter(g => Array.isArray(g.options) && g.options.length > 0)
})

const flatOptions = computed(() => {
  const arr = []
  const seen = new Set()
  for (const g of groups.value) {
    for (const o of g.options) {
      if (!seen.has(o.value)) {
        arr.push(o)
        seen.add(o.value)
      }
    }
  }
  return arr
})

async function fetchList() {
  loading.value = true
  try {
    const res = await platformApi.platformDemandSelectCooperList({
      resourceType: props.resourceType ?? undefined,
    })
    if (Array.isArray(res)) raw.value = res
    else raw.value = res ?? []
  } catch (err) {
    console.error('fetchCooperList error', err)
    raw.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchList)
watch(() => props.resourceType, () => fetchList())
</script>
