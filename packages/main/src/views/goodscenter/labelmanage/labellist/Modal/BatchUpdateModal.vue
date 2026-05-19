<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" align-center>
    <div v-if="isImport">请按照模板上传文件</div>
    <el-radio-group v-model="sceneIndex">
      <div
        class="mt-3 d-flex gap-5 align-items-center w-100"
        v-for="(item, index) in sceneList"
        :key="item.importScene"
        :style="sceneIndex !== index ? 'margin-bottom: 10px' : ''"
      >
        <KeenFileUpload
          ref="upload"
          v-model="item.fileList"
          directory="product"
          v-if="isImport && index === sceneIndex"
        >
          <el-radio :label="index" class="w-350px">{{ index + 1 }}.{{ item.desc }}</el-radio>
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-button
          style="margin-bottom: 10px"
          type="text"
          @click="getTemplate(item.importScene)"
          v-if="isImport && index === sceneIndex"
        >
          下载模板
        </el-button>
        <el-radio v-else :label="index" class="w-50">{{ index + 1 }}.{{ item.desc }}</el-radio>
      </div>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
          v-if="isImport"
        >
          确认
        </el-button>
        <el-button v-else type="primary" @click="emit('export', sceneIndex + 1)">导出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';

  const props = defineProps<{
    visible: boolean;
    title: string;
    type: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'export', exportType: number);
  }>();

  const isImport = computed(() => {
    return props.type === 'import';
  });

  const sceneIndex = ref<number>(0);

  const sceneList = ref([]);

  if (isImport.value) {
    if (checkPermission('batchTag')) {
      sceneList.value.push({
        desc: `SPU`,
        importScene: 'tag_relevance_insert',
        fileList: [],
      });
      sceneList.value.push({
        desc: `SKU`,
        importScene: 'tag_relevance_insert',
        fileList: [],
      });
      sceneList.value.push({
        desc: `标签分组`,
        importScene: 'tag_category_connect_import',
        fileList: [],
      });
      sceneList.value.push({
        desc: `产品品线`,
        importScene: 'tag_product_line_import',
        fileList: [],
      });
    }
  } else {
    if (checkPermission('exportSkuAll')) {
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
    }
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    fileList.value = sceneList.value[sceneIndex.value].fileList;
    console.log(fileList.value);
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene: sceneList.value[sceneIndex.value].importScene,
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount}条${
          res.failedCount > 0 ? '，请到上传日志查看' : ''
        }`
      );
      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async (scene) => {
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: scene,
    });
    urlDownload(res.templateUrl as string);
  };
</script>

<style scoped lang="scss"></style>
