<template>
  <el-dialog title="导出装箱数据" v-model="visible" @close="visible = false">
    <el-form-item label-position="top" label="输入调拨单号">
      <el-input
        type="textarea"
        v-model="codeKeyWord"
        :rows="4"
        placeholder="一行一项，按回车换行，最多500行，重复数据判断为一行，不输入则全量导出"
      />
    </el-form-item>
    <el-link type="primary" :underline="false" @click="downloadTemplate">下载模板</el-link>
    <div class="fs-7 text-gray-500">支持导出格式为xls/xlsx的文件</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';

  const router = useRouter();

  const visible = ref(false);
  const codeKeyWord = ref();

  const saveLoading = ref(false);
  const save = async () => {
    const length = codeKeyWord.value?.split('\n')?.length;
    if (length > 500) {
      ElMessage.warning(`最多500行,当前${length}行`);
      return;
    }
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpShipmentExportJjList({
        codeKeyWord: codeKeyWord.value,
      });
      visible.value = false;
      const isExportConfirm = await swal.exportConfirm();
      if (isExportConfirm) {
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
      }
    } finally {
      saveLoading.value = false;
    }
  };

  const downloadTemplate = async () => {
    const res = await erpApi.luteosErpShipmentExportJjList({
      codeKeyWord: -1,
    });
    const isExportConfirm = await swal.exportConfirm();
    if (isExportConfirm) {
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
    }
  };

  const open = () => {
    codeKeyWord.value = '';
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
