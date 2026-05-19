<template>
  <template v-if="item.componentType === 'DDMultiSelectField'">
    {{ item.value.join('，') }}
  </template>
  <template v-else-if="item.componentType === 'DDDateRangeField'">
    {{ item.value[0] }} ~ {{ item.value[1] }}
  </template>
  <template v-else-if="item.componentType === 'DDAttachment'">
    <div class="file-wrapper">
      <div class="file-item" v-for="file of item.value" :key="file.fileId">
        <span>
          <el-icon><Document /></el-icon>
          {{ file.fileName }}
        </span>
        <span class="operate">
          <SvgIcon icon="preview" class="preview-file" @click="preViewFile(file)" />
          <SvgIcon
            icon="download"
            class="download-file"
            @click="download(file.downUrl, file.fileName)"
          />
        </span>
      </div>
      <!-- <Tag
        color="black"
        v-for="file of item.value"
        :key="file.fileId"
        class="fileTag"
        @click="download(file.downUrl, file.fileName)"
      >
        <el-icon><Document /></el-icon>
        {{ file.fileName }}
      </Tag> -->
    </div>
  </template>
  <template v-else-if="item.componentType === 'TableField'">
    <el-table fit :data="item.value">
      <el-table-column type="index" width="50" />
      <el-table-column
        v-for="(col, index) in item.colList"
        :prop="col.componentId"
        :key="col.componentId"
        :label="col.componentName"
        :formatter="format"
      >
        <!-- <template #default="{ row }">
          {{
            Array.isArray(row.rowValue[index].value)
              ? row.rowValue[index].value.join('，')
              : row.rowValue[index].value
          }}
        </template> -->
      </el-table-column>
    </el-table>
  </template>
  <template v-else>
    <div style="white-space: pre">{{ item.value }}</div>
  </template>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    @close="handlePreviewClose"
  />
</template>

<script setup lang="ts">
  import Tag from '@/components/Tag/index.vue';
  import { download } from '@/utils/download';
  import { Document } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { platformApi } from '@/api';

  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  defineProps({
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  });
  const format = (row, column, cellValue) => {
    if (typeof cellValue === 'object') {
      return cellValue.join('，');
    }
    return cellValue || '';
  };
  const previewVisible = ref(false);
  const fileUrl = ref('');
  const fileName = ref('');
  // 预览
  const preViewFile = async (file) => {
    // await setFileUrl(file);
    // if (fileUrl.value) {
    //   fileName.value = file.name;
    //   previewVisible.value = true;
    // } else {
    //   ElMessage.error('获取完整路径失败，请重试');
    // }
    fileName.value = file.name;
    fileUrl.value = file.downUrl.replace(/\n/g, '');
    previewVisible.value = true;
  };

  const setFileUrl = async (file) => {
    const res: any = await platformApi.platformQueryUrl({ ossKey: file.downUrl });
    fileUrl.value = res.url || '';
  };
  const handlePreviewClose = () => {
    previewVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .file-wrapper {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    .fileTag {
      cursor: pointer;
    }
    .file-item {
      display: flex;
      gap: 20px;
      align-items: center;
      width: 100%;
      .operate {
        display: inline-block;
        align-items: center;
        .svg-icon {
          cursor: pointer;
        }
        .svg-icon + .svg-icon {
          margin-left: 12px;
        }
      }
      & + .file-item {
        margin-top: 8px;
      }
    }
  }
</style>
