<template>
  <el-dialog :title="title" v-model="visible" @close="close()" align-center>
    <div>
      <div class="title">请按照模板上传文件</div>
      <el-radio-group v-model="sceneIndex">
        <div class="template-wrap" v-for="(item, index) in sceneList" :key="index">
          <el-radio :label="index" @click.stop>
            {{ item.desc }}
          </el-radio>
          <div class="operation-wrapper" v-if="index === sceneIndex">
            <div class="template-alert">
              <el-icon class="Root-tyicon icon-Root-tyzhuyi-mianxing"></el-icon>
              <span>再次导入失败的文件时，请不要包含已经成功的导入数据</span>
            </div>
            <div class="file-upload-section">
              <KeenFileUpload :ref="setRef" v-model="item.fileList" directory="product">
                <el-button plain type="primary" size="small">
                  <el-icon class="Root-tyicon icon-Root-tyjia"></el-icon>
                  <span>上传文件</span>
                </el-button>
                <el-button
                  :style="{ marginLeft: '12px' }"
                  type="primary"
                  link
                  @click.stop="getTemplate()"
                >
                  下载模板
                </el-button>
              </KeenFileUpload>
            </div>
          </div>
          <!-- <el-radio v-else :label="index" class="w-50">{{ index + 1 }}.{{ item.desc }}</el-radio> -->
        </div>
      </el-radio-group>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
        >
          导入
        </el-button>
        <el-button @click="close()">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const props = defineProps<{
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'success', reload?: boolean): void;
  }>();

  const sceneIndex = ref<number>(0);

  const sceneList = ref([
    {
      desc: '批量导入订单',
      fileList: [],
      exportService: erpApi.luteosErpOdoImportLyOrder,
      tmpService: erpApi.luteosErpOdoDownLyOrderTemplate,
    },
    {
      desc: '批量上传跟踪号',
      fileList: [],
      exportService: erpApi.luteosErpOdoImportTrackNum,
      tmpService: erpApi.luteosErpOdoDownLyTrackNumTemplate,
    },
  ]);

  const uploadRefs = ref([]);
  const setRef = (el) => {
    if (el) {
      uploadRefs.value.push(el);
    }
  };
  const visible = ref(false);
  const open = async () => {
    visible.value = true;
    await nextTick();
    uploadRefs.value?.forEach((item) => {
      item?.clearFile();
    });
  };

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    fileList.value = sceneList.value[sceneIndex.value].fileList;
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await sceneList.value[sceneIndex.value]
        .exportService({
          fileUrl: fileList.value[0].fileUrl,
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      const isConfirmed = await swal.confirm({
        title: '文件已上传，是否去查看最终处理结果?',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (isConfirmed) {
        openWindow('/salesForecastingLog');
      }
      visible.value = false;
      emit('success', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  // https://dev.luteos.com/api/luteos/erp/warehouse/order/downMarkDeliveryTemplate
  const getTemplate = async () => {
    const res = await sceneList.value[sceneIndex.value].tmpService();
    urlDownload(res as string);
  };
  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .title {
    color: #000;

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
  .operation-wrapper {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .file-upload-section {
    display: flex;
    align-items: start;
    column-gap: 20px;
    .el-button.is-link {
      line-height: 22px;
    }
  }
  .template-wrap {
    width: 100%;
    min-height: 40px;
    margin-top: 10px;
  }
  .template-alert {
    margin-top: 10px;
    color: #ff9f22;
    font-size: 12px;
    display: flex;
    column-gap: 4px;
    .Root-tyicon {
      font-size: 14px;
    }
  }
</style>
