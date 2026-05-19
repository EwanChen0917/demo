<template>
  <el-dialog
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
    align-center
  >
    <CustomFieldsGroup
      ref="customFieldsGroupRef"
      :property-list-prop="cloneDeep(customExportFields)"
    />
    <template #footer>
      <el-button class="left" @click="customFieldsGroupRef?.reset()">恢复默认</el-button>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">导出</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { platformApi } from '@/api';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    customExportFields?: any[];
    conditionCode?: string;
    params?: any;
    exportService: any;
  }>();

  const emits = defineEmits<{
    (event: 'refreshCustomFields'): void;
  }>();

  const route = useRoute();
  const router = useRouter();

  const visible = ref(false);
  const title = ref('导出');

  const customFieldsGroupRef = ref(null);

  const saveLoading = ref(false);
  const save = async () => {
    try {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      saveLoading.value = true;
      saveCustomFields();
      const res = await props.exportService({
        ...props.params,
        exportConditionCode: props?.conditionCode,
      });
      visible.value = false;
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;

      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      router.push(path);
    } finally {
      saveLoading.value = false;
    }
  };

  // 保存自定义字段
  const saveCustomFields = async () => {
    const res = await platformApi.platformSearchSaveCondition({
      platform: 'lute_erp',
      moduleType: 'export',
      itemType: route?.name,
      conditionCode: props.conditionCode || undefined,
      searchCondition: JSON.stringify(customFieldsGroupRef.value?.getResult()),
    });
    emits('refreshCustomFields');
  };

  const open = (exportTitle) => {
    title.value = exportTitle || '导出';
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .type-select {
    margin-top: -6px;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 6px solid var(---N1, #f7f7f7);
  }
</style>
