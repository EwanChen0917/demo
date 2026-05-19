<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" align-center>
    <div>{{ isImport ? '请按照模板上传文件' : '请选择导出信息' }}</div>
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
          :accept="sceneIndex === 9 ? '.zip' : ''"
        >
          <el-radio :label="index" class="w-350px">{{ index + 1 }}.{{ item.desc }}</el-radio>
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-button
          style="margin-bottom: 10px"
          type="text"
          @click="getTemplate(item.importScene)"
          v-if="isImport && index === sceneIndex"
          v-show="sceneIndex !== 9"
        >
          下载模板
        </el-button>
        <el-radio v-else :label="index" class="w-50">{{ index + 1 }}.{{ item.desc }}</el-radio>
      </div>
      <div
        v-if="isImport && sceneIndex === 9"
        style="width: 100%; height: 32px; font-size: 12px; color: #f53f3f; padding-left: 30px"
      >
        请上传.zip压缩包文件，包含的图片文件命名只能为产品SKU
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
        <el-button v-else type="primary" @click="emit('export', sceneList[sceneIndex]?.exportType)">
          导出
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi, productApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';
  import * as swal from '@/utils/swal';
  import { useRouter } from 'vue-router';

  const router = useRouter();
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

  const sceneList = ref([
    /* {
     desc: `${isImport.value ? '更新' : '导出'}SKU所有信息`,
     importScene: 'product_sku_all',
     fileList: [],
   },
   {
     desc: `${isImport.value ? '更新' : '导出'}SKU采购信息`,
     importScene: 'product_sku_purchase',
     fileList: [],
   },
   {
     desc: `${isImport.value ? '更新' : '导出'}SKU报关/清关信息`,
     importScene: 'product_sku_declare',
     fileList: [],
   },
   {
     desc: isImport.value ? '新增/更新供应链SKU' : '导出SKU的供应链SKU信息',
     importScene: 'product_sku',
     fileList: [],
   }, */
  ]);

  if (isImport.value) {
    if (checkPermission('importSkuInsert')) {
      sceneList.value.push({
        desc: '创建SKU',
        importScene: 'product_sku_insert',
        fileList: [],
      });
    }
    if (checkPermission('importSkuAll')) {
      sceneList.value.push({
        desc: `更新SKU所有信息`,
        importScene: 'product_sku_all',
        fileList: [],
      });
    }
    /* if (checkPermission('importSkuPurchase')) {
      sceneList.value.push({
        desc: `更新SKU采购信息`,
        importScene: 'product_sku_purchase',
        fileList: [],
      });
    } */
    if (checkPermission('importSkuSpecification')) {
      sceneList.value.push({
        desc: `更新SKU规格信息`,
        importScene: 'product_sku_spec_update',
        fileList: [],
      });
    }
    if (checkPermission('importSkuDeclare')) {
      sceneList.value.push({
        desc: `更新SKU报关/清关信息`,
        importScene: 'product_sku_declare_v2',
        fileList: [],
      });
    }
    /* if (checkPermission('importSupplySku')) {
      sceneList.value.push({
        desc: `新增/更新供应链SKU`,
        importScene: 'product_sku',
        fileList: [],
      });
    } */
    if (checkPermission('batchTag')) {
      sceneList.value.push({
        desc: `关联SKU标签`,
        importScene: 'tag_relevance_insert',
        fileList: [],
      });
    }
    if (checkPermission('importSkuPm')) {
      sceneList.value.push({
        desc: `更新SKU信息（产品经理）`,
        importScene: 'product_sku_pm_import',
        fileList: [],
      });
    }
    if (checkPermission('importSkuSupplyDept')) {
      sceneList.value.push({
        desc: `更新SKU信息（供应链）`,
        importScene: 'product_sku_supply_dept_import',
        fileList: [],
      });
    }
    if (checkPermission('importSkuCertification')) {
      sceneList.value.push({
        desc: `更新SKU认证信息`,
        importScene: 'product_sku_certification_import',
        fileList: [],
      });
    }
    if (checkPermission('importSkuWarranty')) {
      sceneList.value.push({
        desc: `更新SKU质保信息`,
        importScene: 'product_sku_warranty_import',
        fileList: [],
      });
    }
    if (checkPermission('importSkuAll')) {
      sceneList.value.push({
        desc: `导入SKU图片`,
        importScene: 'product_sku_img_import',
        fileList: [],
      });
    }
  } else {
    if (checkPermission('exportSkuAll')) {
      sceneList.value.push({
        desc: `SKU所有信息`,
        importScene: 'product_sku_all',
        exportType: 1,
        fileList: [],
      });
    }
    /* if (checkPermission('exportSkuPurchase')) {
      sceneList.value.push({
        desc: `导出SKU采购信息`,
        exportType: 2,
        importScene: 'product_sku_purchase',
        fileList: [],
      });
    } */
    if (checkPermission('exportSkuSpecification')) {
      sceneList.value.push({
        desc: `产品包装信息`,
        exportType: 5,
        fileList: [],
      });
    }
    if (checkPermission('exportSkuDeclare')) {
      sceneList.value.push({
        desc: `SKU报关/清关信息`,
        exportType: 3,
        fileList: [],
      });
    }
    if (checkPermission('exportSkuOffline')) {
      sceneList.value.push({
        desc: `线下渠道SKU信息`,
        exportType: 6,
        fileList: [],
      });
    }
    /* if (checkPermission('exportSupplySku')) {
      sceneList.value.push({
        desc: `导出SKU的供应链SKU信息`,
        exportType: 4,
        importScene: 'product_sku',
        fileList: [],
      });
    } */
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    fileList.value = sceneList.value[sceneIndex.value].fileList;
    console.log(fileList.value);
    loading.value = true;
    if (fileList.value.length && fileList.value[0].status === 'success') {
      if (sceneIndex.value === 9) {
        if (fileList.value[0].size > 500 * 1024 * 1024) {
          ElMessage.warning('文件大小不能超过500M');
          return;
        }
        const res = await productApi
          .luteosProductSkuUploadSkuImg({
            // importScene: sceneList.value[sceneIndex.value].importScene,
            fileName: fileList.value[0].name,
            // key: fileList.value[0].ossKey,
            fileUrl: fileList.value[0].ossKey,
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
        return;
      }
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene: sceneList.value[sceneIndex.value].importScene,
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
          async: true,
        })
        .finally(() => {
          loading.value = false;
        });
      // ElMessage.info(
      //   `成功${res.succeededCount}条，失败${res.failedCount}条${
      //     res.failedCount > 0 ? '，请到上传日志查看' : ''
      //   }`
      // );
      const go = await swal.importUploadConfirm();
      if (go) {
        router.push({ path: '/salesForecastingLog' });
      }
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
