<template>
  <div class="upload-to-update-product">
    <div class="upload-wrapper">
      <div class="upload-title">
        <el-select
          v-model="importScene"
          placeholder="请选择导入模板类型"
          @change="handleImportSceneChange"
        >
          <el-option label="SPU" value="product_spu" />
          <el-option label="SKU" value="product_sku" />
        </el-select>
        <span style="margin-left: 8px">
          <el-button link type="primary" @click="getTemplate">
            {{ importScene === 'product_spu' ? '下载SPU模板' : '下载SKU模板' }}
          </el-button>
        </span>
      </div>
      <p class="confirm-update">
        <KeenFileUpload ref="upload" v-model="fileList" directory="product">
          <el-button plain>上传文件</el-button>
        </KeenFileUpload>
      </p>
      <p v-if="fileList.length">
        <el-button
          :loading="loading"
          style="width: 200px"
          type="primary"
          size="default"
          @click="confirmUpload"
        >
          确认上传
        </el-button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts" name="batchupdategoods">
  import { ElMessage } from 'element-plus';
  import { commonApi } from '@/api';
  import { urlDownload } from '@/utils/download';

  const importScene = ref('product_spu');
  const fileList = ref<any[]>([]);
  const upload = ref();
  const loading = ref(false);
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene: importScene.value,
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
      handleImportSceneChange();
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async () => {
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: importScene.value,
    });
    urlDownload(res.templateUrl as string);
  };
  const handleImportSceneChange = () => {
    fileList.value = [];
    upload.value.uploadRef.clearFiles();
  };
</script>

<style scoped lang="scss">
  .upload-to-update-product {
    border-radius: 8px;
    overflow: hidden;

    .upload-title {
      display: flex;
      align-items: center;
    }

    .upload-wrapper {
      padding: 16px 30px;
      background-color: #fff;
    }

    .confirm-update {
      margin-top: 12px;
      display: inline-block;
      min-width: 400px;
    }
  }
</style>
