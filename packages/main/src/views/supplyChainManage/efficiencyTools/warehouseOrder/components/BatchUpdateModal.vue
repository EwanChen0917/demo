<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" align-center>
    <el-radio-group v-model="sceneIndex">
      <div
        class="mt-3 d-flex gap-5 align-items-center w-100"
        v-for="(item, index) in sceneList"
        :key="item.importScene"
      >
        <el-radio :label="index" class="w-50">{{ index + 1 }}.{{ item.desc }}</el-radio>
      </div>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <ExportBtn
          :service="sceneList[sceneIndex].service"
          :params="params"
          :plain="false"
          @success="emit('close')"
        >
          导出
        </ExportBtn>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi, erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';

  const props = defineProps<{
    visible: boolean;
    title: string;
    params: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const sceneIndex = ref<number>(0);

  const sceneList = ref([
    {
      desc: '订单基础信息',
      service: erpApi.luteosErpWarehouseOrderExport,
    },
    {
      desc: '费用明细信息',
      service: erpApi.luteosErpWarehouseOrderExportFeeDetail,
    },
    {
      desc: '导出领用单据',
      service: erpApi.luteosErpWarehouseOrderExportReceiveDetail,
    },
  ]);

  /* if (checkPermission('exportSkuAll')) {
    sceneList.value.push({
      desc: `导出SKU所有信息`,
      importScene: 'product_sku_all',
      fileList: [],
    });
  }
  if (checkPermission('exportSkuPurchase')) {
    sceneList.value.push({
      desc: `导出SKU采购信息`,
      importScene: 'product_sku_purchase',
      fileList: [],
    });
  }
  if (checkPermission('exportSkuDeclare')) {
    sceneList.value.push({
      desc: `导出SKU报关/清关信息`,
      importScene: 'product_sku_declare',
      fileList: [],
    });
  }
  if (checkPermission('exportSupplySku')) {
    sceneList.value.push({
      desc: `导出SKU的供应链SKU信息`,
      importScene: 'product_sku',
      fileList: [],
    });
  } */

  const loading = ref(false);
</script>

<style scoped lang="scss"></style>
