<template>
  <el-dialog title="导出内容选择" v-model="visible" @close="visible = false">
    <el-radio-group v-model="exportType">
      <el-radio :label="1">导出界面信息</el-radio>
      <el-radio :label="2">导出销售映射全表</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const exportType = ref(1);
  const params = ref();
  const router = useRouter();

  const save = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    try {
      const res = await productApi.luteosProductSaleSkuExportSaleSku({
        ...params.value,
        exportType: exportType.value,
      });
      emit('success');
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
      openWindow(path.href);
    } catch (e) {
      swal.error(`导出失败: ${e.message}`);
    }
  };

  const open = (exportParams) => {
    params.value = exportParams;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
