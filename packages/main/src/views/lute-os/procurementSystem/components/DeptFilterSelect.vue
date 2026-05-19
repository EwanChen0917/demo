<template>
  <el-tree-select
    v-model="modelValue"
    placeholder="需求所在部门"
    :data="deptTree"
    multiple
    clearable
    filterable
    check-strictly
    style="width: 240px"
    popper-class="picker-cat-tree-select"
    highlight-current
  />
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';
  import type { MemberContracts } from '@/api/platform/data-contracts';

  const modelValue = defineModel<string[]>({ default: [] });
  const deptTreeData = ref<MemberContracts.DeptInfoBean[]>([]);

  const mapNode = (item: MemberContracts.DeptInfoBean) => ({
    value: item.deptId,
    label: item.deptName,
    leaf: !item.children?.length,
    children: item.children?.map((child) => mapNode(child)),
  });

  const deptTree = computed(() => deptTreeData.value?.map((item) => mapNode(item)) ?? []);

  const fetchDeptTree = async () => {
    try {
      const res = await memberApi.luteosMemberQueryDeptTree();
      deptTreeData.value = res.deptInfoList || [];
    } catch (error) {
      console.error('Failed to fetch dept tree', error);
    }
  };

  onMounted(() => {
    fetchDeptTree();
  });
</script>
