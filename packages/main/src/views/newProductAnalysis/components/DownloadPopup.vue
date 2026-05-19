<template>
  <el-tooltip
    content="下载"
    placement="top"
    :show-after="300"
    :popper-options="{ modifiers: [{ name: 'eventListeners', enabled: false }] }"
  >
    <div class="download-icon-container" @click.stop>
      <el-popover placement="bottom" :width="200" trigger="hover">
        <template #reference>
          <div class="download-trigger">
            <i class="Root-tyicon icon-Root-tyxiazai download-icon-btn"></i>
          </div>
        </template>
        <div class="download-menu">
          <div
            v-if="fileItem.name?.startsWith('数据获取')"
            class="download-item"
            @click="handleDownloadClick('xlsx')"
          >
            <span class="file-icon file-icon-excel"></span>
            <span>下载为 Excel</span>
          </div>
          <template v-else>
            <div class="download-item" @click="handleDownloadClick('markdown')">
              <span class="file-icon file-icon-md"></span>
              <span>下载为 Mark Down</span>
            </div>
            <div class="download-item" @click="handleDownloadClick('pdf')">
              <span class="file-icon file-icon-pdf"></span>
              <span>下载为 PDF</span>
            </div>
            <div class="download-item" @click="handleDownloadClick('doc')">
              <span class="file-icon file-icon-docx"></span>
              <span>下载为 Doc</span>
            </div>
          </template>
        </div>
      </el-popover>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts" name="DownloadPopup">
  import { ref } from 'vue';
  import { newProductApi } from '@/api';
  import { getCookieToken } from '@/hooks/web/useCookie';
  import axios from 'axios';
  import { exportMarkdownToPDF, exportMarkdownToDOC } from '@/utils/markdownExport';
  import { ElMessage } from 'element-plus/es';
  import { useReport } from '../hooks/useReport';

  const { report } = useReport();
  const route = useRoute();

  export interface FileItem {
    nodeExecutionId: string | number;
    name: string;
    ext: string;
    datetime?: string;
    previewUrl?: string;
  }

  export type DownloadFormat = 'markdown' | 'pdf' | 'doc' | 'xlsx';

  interface Props {
    fileItem: FileItem;
  }

  interface Emits {
    (e: 'downloadStart', format: DownloadFormat): void;
    (e: 'downloadEnd'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const token = getCookieToken();

  const handleDownloadClick = async (format: DownloadFormat) => {
    const instanceCode = route.query?.instanceCode as string;
    emit('downloadStart', format);
    try {
      switch (format) {
        case 'markdown': {
          const difyNodeExecutionId = String(props.fileItem?.nodeExecutionId);
          const res = await newProductApi.luteosAiNpoProjectPhasedResultDetail({
            difyNodeExecutionId,
          });
          const markdown = (res as any)?.data?.text || (res as any)?.text || '';
          const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${props.fileItem.name}.md`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }, 0);
          break;
        }
        case 'pdf': {
          const difyNodeExecutionId = String(props.fileItem?.nodeExecutionId);
          const res = await newProductApi.luteosAiNpoProjectPhasedResultDetail({
            difyNodeExecutionId,
          });
          await exportMarkdownToPDF(
            (res as any)?.data?.text || (res as any)?.text || '',
            props.fileItem.name
          );
          break;
        }
        case 'doc': {
          const difyNodeExecutionId = String(props.fileItem?.nodeExecutionId);
          const res = await newProductApi.luteosAiNpoProjectPhasedResultDetail({
            difyNodeExecutionId,
          });
          exportMarkdownToDOC(
            (res as any)?.data?.text || (res as any)?.text || '',
            props.fileItem.name
          );
          break;
        }
        case 'xlsx': {
          const res = await axios.get(
            `/api/luteos/ai/npo/project/generateExcel?difyNodeExecutionId=${props.fileItem?.nodeExecutionId}&instanceCode=${instanceCode}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              responseType: 'blob', // 关键：指定响应类型为 blob，正确处理二进制数据
            }
          );
          if (res?.data?.code) {
            ElMessage.error(res?.data?.message);
            break;
          }
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${props.fileItem.name}.xlsx`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }, 0);
          break;
        }
        default:
          break;
      }
    } finally {
      emit('downloadEnd');
      report('click_download_report', {
        file_name: props.fileItem.name,
        task_id: instanceCode,
      });
    }
  };
</script>

<style scoped lang="scss">
  .download-icon-btn {
    font-size: 16px;
    color: var(---N8);
    flex-shrink: 0;
    cursor: pointer;
  }

  .download-icon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // 扩大可点击区域
    padding: 10px 12px;
    margin: -10px -12px;
    cursor: pointer;
  }

  .download-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .file-icon {
    display: inline-flex;
    width: 20px;
    height: 20px;
    background-size: cover;
    &-md {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-md.png');
    }
    &-pdf {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-pdf.png');
    }
    &-docx {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-docx.png');
    }
    &-excel {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-excel.png');
    }
  }

  .download-menu {
    padding: 4px;

    .download-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 8px;
      font-size: 13px;
      color: var(---N9);
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: var(---N1);
      }

      .download-type-icon {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
    }
  }

  :deep(.el-popover) {
    padding: 0;
    min-width: auto !important;
  }
</style>
