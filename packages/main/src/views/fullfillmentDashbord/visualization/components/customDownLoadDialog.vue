<template>
  <el-dialog
    :title="title"
    v-model="visible"
    @close="handleClose"
    align-center
    :close-on-click-modal="false"
  >
    <div class="download">
      <el-scrollbar max-height="300px" style="padding: 0px 20px">
        <div class="file-list">
          <div
            class="file-item"
            v-for="(item, index) in downloadList"
            :key="`${item?.fileName}-${index}`"
          >
            <div class="file-item-content">
              <div class="left">
                <SvgIcon class="el-icon el-icon--document unknown" :class="item.suffix" />
                <el-tooltip :content="item?.fileName" placement="top">
                  <span class="file-name">{{ item?.fileName }}</span>
                </el-tooltip>
              </div>
              <i class="iconfont icon-xiazai" @click="handleDownload(item)"></i>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { urlDownload } from '@/utils/download';

  const visible = ref(false);
  const title = ref('');
  const downloadList = ref<DownloadItem[]>([]);
  type DownloadItem = {
    fileName: string;
    fileUrl: string;
    suffix?: string;
    updateTime?: string;
    operator?: string;
  };
  const handleClose = () => {
    visible.value = false;
    downloadList.value = [];
  };
  const open = (options: { title?: string; downloadList?: DownloadItem[] }) => {
    title.value = options.title || '下载';
    downloadList.value = (options.downloadList || []).map((item: DownloadItem) => {
      const fileName = item?.fileName || '';
      const fileUrl = item?.fileUrl || '';
      return {
        ...item,
        fileName,
        fileUrl,
        suffix: getSuffix(fileName),
      };
    });
    visible.value = true;
  };
  const getSuffix = (name: string) => {
    if (!name) return 'unknown';
    const suffix = name.split('.').pop();
    return suffix || 'unknown';
  };
  const handleDownload = (item: DownloadItem) => {
    if (!item) return;
    if (!item.fileUrl) return;
    if (!item.fileName) return;
    urlDownload(item.fileUrl);
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .download {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 20px;
    flex: 1;
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .file-item {
      display: flex;
      width: 100%;
      padding: 8px 12px;
      border-radius: 8px;
      background: var(---N2, #f5f5f5);
      color: var(---N9, #1f1f1f);
      font-size: 12px;
      line-height: 20px;

      &-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        .left {
          display: flex;
          align-items: center;
          gap: 4px;

          .file-name {
            max-width: 420px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: default;
          }

          .unknown {
            background-size: 14px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url('@/assets/images/icon_unknown.svg');
          }
          .xls,
          .xlsx {
            background-image: url('@/assets/images/icon_xlsx.svg');
          }
          .pptx,
          .ppt {
            background-image: url('@/assets/images/icon_pptx.svg');
          }
          .pdf {
            background-image: url('@/assets/images/icon_pdf.svg');
          }
          .txt {
            background-image: url('@/assets/images/icon_txt.svg');
          }
          .docx,
          .doc {
            background-image: url('@/assets/images/icon_docx.svg');
          }
          .jpg,
          .jpeg,
          .png,
          .svg {
            background-image: url('@/assets/images/icon_img.svg');
          }
          .zip,
          .gzip,
          .rar,
          .gz,
          .bz,
          .tar {
            background-image: url('@/assets/images/icon_yasuo.svg');
          }
        }
        .icon-xiazai {
          cursor: pointer;
          font-size: 16px;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
</style>
