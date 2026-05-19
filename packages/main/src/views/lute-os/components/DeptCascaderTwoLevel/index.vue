<template>
  <el-cascader
    ref="cascaderRef"
    v-model="cascaderValue"
    :options="options"
    :props="cascaderProps"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :show-all-levels="showAllLevels"
    :teleported="true"
    popper-class="dept-cascader-popper"
    style="width: 100%"
    @change="handleChange"
  >
    <template #default="{ data }">
      <span>{{ data.label }}</span>
    </template>
  </el-cascader>
</template>

<script lang="ts" setup name="DeptCascaderTwoLevel">
  import { computed, onMounted, ref, watch } from 'vue';
  import { memberApi } from '@/api';

  interface DeptNode {
    deptId: number;
    deptName: string;
    parentId?: number;
    children?: DeptNode[];
  }

  interface CascaderOption {
    value: number;
    label: string;
    children?: CascaderOption[];
  }

  const props = withDefaults(
    defineProps<{
      modelValue?: string | number | null;
      placeholder?: string;
      disabled?: boolean;
      clearable?: boolean;
      filterable?: boolean;
      showAllLevels?: boolean;
      checkStrictly?: boolean;
    }>(),
    {
      modelValue: null,
      placeholder: '请选择一级 / 二级部门',
      disabled: false,
      clearable: true,
      filterable: true,
      showAllLevels: true,
      checkStrictly: false,
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
    (e: 'change', value: string | null, path: number[]): void;
  }>();

  const options = ref<CascaderOption[]>([]);
  const cascaderValue = ref<number[]>([]);
  const cascaderRef = ref();

  const cascaderProps = computed(() => ({
    value: 'value',
    label: 'label',
    children: 'children',
    expandTrigger: 'hover' as const,
    emitPath: true,
    checkStrictly: props.checkStrictly,
  }));

  function truncateToTwoLevels(nodes: DeptNode[] = []): CascaderOption[] {
    return nodes.map((node) => {
      const opt: CascaderOption = { value: node.deptId, label: node.deptName };
      if (node.children && node.children.length > 0) {
        opt.children = node.children.map((child) => ({ value: child.deptId, label: child.deptName }));
      }
      return opt;
    });
  }

  function findPath(nodes: CascaderOption[], targetId: number, trail: number[] = []): number[] | null {
    for (const n of nodes) {
      const next = [...trail, n.value];
      if (n.value === targetId) return next;
      if (n.children) {
        const found = findPath(n.children, targetId, next);
        if (found) return found;
      }
    }
    return null;
  }

  async function loadDeptTree() {
    try {
      const res: any = await memberApi.luteosMemberQueryDeptTree();
      const tree: DeptNode[] = res?.deptInfoList || [];
      options.value = truncateToTwoLevels(tree);
      syncFromModel();
    } catch (err) {
      console.warn('[DeptCascaderTwoLevel] load dept tree failed', err);
    }
  }

  function syncFromModel() {
    const raw = props.modelValue;
    if (raw === null || raw === undefined || raw === '') {
      cascaderValue.value = [];
      return;
    }
    const id = Number(raw);
    if (Number.isNaN(id)) {
      cascaderValue.value = [];
      return;
    }
    const path = findPath(options.value, id);
    if (path) {
      cascaderValue.value = path;
    } else {
      cascaderValue.value = [];
    }
  }

  function handleChange(value: number[] | null) {
    if (!value || value.length === 0) {
      emit('update:modelValue', null);
      emit('change', null, []);
      return;
    }
    const leafId = String(value[value.length - 1]);
    emit('update:modelValue', leafId);
    emit('change', leafId, value);
  }

  watch(() => props.modelValue, syncFromModel);

  onMounted(loadDeptTree);
</script>

<style>
  .dept-cascader-popper {
    z-index: 3000 !important;
  }
</style>
