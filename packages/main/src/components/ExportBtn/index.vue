<template>
  <el-button :size="size" @click="handleExport" :loading="exportLoading">
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const props = withDefaults(
    defineProps<{
      service: any;
      params?: any;
      size?: 'small' | 'default' | 'large';
      sync?: boolean;
      manual?: boolean;
      disabled?: boolean;
      ignoreAppCode?: boolean;
      openType?: 'window' | 'route' | 'handle';
      type?: string;
    }>(),
    {
      params: {},
      disabled: false,
      sync: false,
      manual: false,
      ignoreAppCode: false,
      openType: 'window',
      type: 'primary',
    }
  );

  const emit = defineEmits<{
    (event: 'success'): void;
    (event: 'beforeExport'): void;
    (event: 'exportSuccess', res: any): void;
  }>();

  const router = useRouter();
  const exportLoading = ref<boolean>(false);
  const handleExport = async () => {
    if (props.manual) {
      emit('beforeExport');
      return;
    }
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    confirmExport();
  };
  const confirmExport = async () => {
    try {
      if (exportLoading.value) return;
      exportLoading.value = true;
      const res = await props.service(props.params);
      if (props.sync) {
        openWindow(res);
      } else if (props.openType === 'handle') {
        emit('exportSuccess', res as any);
      } else {
        emit('success');
        const isExportConfirm = await swal.exportConfirm();
        if (!isExportConfirm) return;
        await nextTick();
        const query: Record<string, any> = {
          module_code: res?.moduleCode,
          record_type: 2,
        };
        if (!props.ignoreAppCode) {
          query.app_code = res?.appCode;
        }
        if (props.openType === 'route') {
          router.push({
            path: '/downloadmanage',
            query,
          });
        } else {
          const path = router.resolve({
            path: '/downloadmanage',
            query,
          });
          openWindow(path.href);
        }
      }
    } catch (e: any) {
      swal.error(`导出失败: ${e.message}`);
    } finally {
      exportLoading.value = false;
    }
  };
  defineExpose({
    confirmExport,
  });
</script>

<style scoped lang="scss"></style>
