<template>
  <div class="file-list" v-if="fileList.length">
    <el-collapse expand-icon-position="left" :model-value="['原始数据', '中间产物']">
      <!-- 单独显示 -->
      <div
        v-for="item in mainFile"
        :key="item.nodeExecutionId"
        class="file-item"
        @mouseenter="hoveredFileId = item.nodeExecutionId"
        @mouseleave="hoveredFileId = null"
        @click="handleFileClick(item)"
      >
        <div class="file-icon-wrap">
          <span v-if="item.name.includes('数据获取')" class="file-icon file-icon-excel"></span>
          <span v-else-if="item.ext === '.md'" class="file-icon file-icon-md"></span>
          <span v-else class="file-icon file-icon-ppt"></span>
        </div>

        <div class="file-name">{{ item.name }}{{ item.ext }}</div>

        <!-- 时间显示（非hover状态） -->
        <div
          v-show="item?.ext === '.html' || hoveredFileId !== item.nodeExecutionId"
          class="file-time"
        >
          {{ item.datetime }}
        </div>

        <!-- 下载图标和菜单（hover状态） -->
        <div
          v-show="hoveredFileId && hoveredFileId === item.nodeExecutionId"
          class="download-wrapper"
        >
          <DownloadPopup
            :file-item="item"
            @download-start="handleDownloadStart"
            @download-end="handleDownloadEnd"
          />
        </div>
      </div>
      <!-- 文件夹式显示 -->
      <div v-for="(files, key) in fileTypeList" :key="key">
        <el-collapse-item :name="key" v-if="(files as Array<any>).length">
          <template #title>
            <img src="../assets/images/file-icon.svg" />
            {{ key }}
          </template>
          <div
            v-for="item in files"
            :key="item.nodeExecutionId"
            class="file-item"
            @mouseenter="hoveredFileId = item.nodeExecutionId"
            @mouseleave="hoveredFileId = null"
            @click="handleFileClick(item)"
          >
            <div class="file-icon-wrap">
              <span v-if="item.name.includes('数据获取')" class="file-icon file-icon-excel"></span>
              <span v-else-if="item.ext === '.md'" class="file-icon file-icon-md"></span>
              <span v-else class="file-icon file-icon-ppt"></span>
            </div>

            <div class="file-name">{{ item.name }}{{ item.ext }}</div>

            <!-- 时间显示（非hover状态） -->
            <div
              v-show="item?.ext === '.html' || hoveredFileId !== item.nodeExecutionId"
              class="file-time"
            >
              {{ item.datetime }}
            </div>

            <!-- 下载图标和菜单（hover状态） -->
            <div
              v-show="hoveredFileId && hoveredFileId === item.nodeExecutionId"
              class="download-wrapper"
            >
              <DownloadPopup
                :file-item="item"
                @download-start="handleDownloadStart"
                @download-end="handleDownloadEnd"
              />
            </div>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>

    <!-- <div
      v-for="item in fileList"
      :key="item.nodeExecutionId"
      class="file-item"
      @mouseenter="hoveredFileId = item.nodeExecutionId"
      @mouseleave="hoveredFileId = null"
      @click="handleFileClick(item)"
    >
      <div class="file-icon-wrap">
        <span v-if="item.name.includes('数据获取')" class="file-icon file-icon-excel"></span>
        <span v-else-if="item.ext === '.md'" class="file-icon file-icon-md"></span>
        <span v-else class="file-icon file-icon-ppt"></span>
      </div>

      <div class="file-name">{{ item.name }}{{ item.ext }}</div> -->

    <!-- 时间显示（非hover状态） -->
    <!-- <div
        v-show="item?.ext === '.html' || hoveredFileId !== item.nodeExecutionId"
        class="file-time"
      >
        {{ item.datetime }}
      </div> -->

    <!-- 下载图标和菜单（hover状态） -->
    <!-- <div
        v-show="hoveredFileId && hoveredFileId === item.nodeExecutionId"
        class="download-wrapper"
      >
        <DownloadPopup
          :file-item="item"
          @download-start="handleDownloadStart"
          @download-end="handleDownloadEnd"
        />
      </div>
    </div> -->
  </div>

  <Empty v-else description="当前暂无文件" />
  <DownloadLoading :file-type="fileType" :loading="loading" />
</template>

<script setup lang="ts" name="FileList">
  import { ref } from 'vue';
  import DownloadLoading from '@/views/newProductAnalysis/components/DownloadLoading.vue';
  import DownloadPopup, { type DownloadFormat } from './DownloadPopup.vue';
  import Empty from './Empty.vue';
  import { useReport } from '../hooks/useReport';

  const { report } = useReport();

  interface FileItem {
    nodeExecutionId: number;
    name: string;
    ext: string;
    datetime: string;
    previewUrl: string;
  }

  interface Props {
    fileList?: FileItem[];
    instanceCode: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    fileList: () => [],
  });

  // 筛选出各类文件数据
  const fileTypeList = ref({});
  const mainFile = ref<Array<any>>([])
  watch(
    () => props.fileList,
    (newval) => {
      if (newval.length) {
        fileTypeList.value['原始数据'] = newval.filter((file) => file.name?.includes('数据获取')) || [];
        fileTypeList.value['中间产物'] = newval.filter(
          (file) => !file.name?.includes('数据获取') && file.ext !== '.html'
        ) || [];
        mainFile.value = newval.filter((file) => file.ext === '.html') || [];
      }
    },
    {
      deep: true,
      immediate: true,
    }
  );

  const emit = defineEmits<{
    (e: 'fileClick', file: FileItem): void;
  }>();

  const hoveredFileId = ref<number | null>(null);

  const handleFileClick = (file: FileItem) => {
    emit('fileClick', file);

    report('page_view_file', {
      task_id: props.instanceCode,
      file_name: file.name,
      file_type: file.ext,
    });
  };

  const fileType = ref('');
  const loading = ref(false);

  const handleDownloadStart = (format: DownloadFormat) => {
    fileType.value = format?.toUpperCase();
    loading.value = true;
  };

  const handleDownloadEnd = () => {
    loading.value = false;
  };
</script>

<style scoped lang="scss">
  .file-list {
    padding: 8px 8px 20px;
    height: 100%;
    border: 1px solid #ededed;
    border-radius: 10px;
    overflow-y: auto;
    :deep(.el-collapse) {
      border-top: none;
      border-bottom: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .el-collapse-item__wrap {
        border-bottom: none;
      }
      .el-collapse-item__header {
        border: none;
        padding: 10px 12px;
        line-height: 20px;
        min-height: auto;
        .el-collapse-item__title {
          height: 20px;
        }
      }
      .el-collapse-item__content {
        padding-bottom: 0;
        font-size: 13px;
        color: inherit;
        line-height: normal;
        .file-item {
          padding-left: 36px;
        }
      }
    }
  }
  .file-icon {
    display: inline-flex;
    width: 20px;
    height: 20px;
    background-size: cover;
    &-site {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-site.png');
    }
    &-md {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-md.png');
    }
    &-pdf {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-pdf.png');
    }
    &-docx {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-docx.png');
    }
    &-ppt {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-ppt.png');
    }
    &-excel {
      background-image: url('@/views/newProductAnalysis/assets/images/icon-excel.png');
    }
  }

  .file-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    font-size: 12px;
    background: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    &:hover {
      background: var(---N1);
    }

    .file-icon-wrap {
      width: 16px;
      height: 18px;
    }

    .file-name {
      flex: 1;
      font-size: 13px;
      color: var(---N9);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      line-height: 20px;
    }

    .file-time {
      color: var(---N8, #666);
      white-space: nowrap;
    }

    .download-wrapper {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      // 让下载区域占据剩余空间
      flex: 1;
      justify-content: flex-end;
    }
  }

  .empty-content {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
  }
</style>
