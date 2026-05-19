<template>
  <el-dialog :model-value="visible" @close="$emit('close')" title="移动文件" align-center>
    <el-table
      :data="folderList"
      row-key="fileName"
      :default-expand-all="true"
      max-height="600"
      :show-header="false"
      v-loading="loading"
      :cell-style="{ borderBottom: '1px dashed #e8e8e8' }"
    >
      <el-table-column label="名称">
        <template #default="{ row }">
          <div class="d-flex align-items-center gap-2">
            <SvgIcon icon="folder" class="svg-icon svg-icon-1 svg-icon-primary" />
            <span>{{ row.fileName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="55">
        <template #default="scope">
          <el-radio v-model="currentRow" :label="scope.row">{{}}</el-radio>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave" :disabled="currentRow.length === 0">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { fccApi } from '@/api';

  const props = defineProps<{
    visible: boolean;
    fileCode: string;
    sceneInfo: Object;
  }>();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val?: any): void;
  }>();
  const currentRow = ref<any[]>([]);

  const folderList = ref([]);
  const loading = ref(false);

  const handleSave = () => {
    emit('save', currentRow.value);
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };

  const removeFileType2 = (arr) => {
    // 过滤掉fileType等于2的项
    arr = arr.filter((item) => item.fileType !== 2 && item.fileCode !== props.fileCode);

    // 递归处理children数组
    arr.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        item.children = removeFileType2(item.children);
      }
    });

    return arr;
  };

  const queryAllFolder = () => {
    loading.value = true;
    fccApi
      .luteosFccCenterFindAllFolder({ fileCode: '', scene: +props.sceneInfo.scene })
      .then((res) => {
        const list = removeFileType2(res.fccFolderDetails || []);
        const data: any = {
          fileName: props.sceneInfo.title,
          fileCode: '',
          fileType: 1,
          children: list,
        };
        folderList.value = [data];
      })
      .finally(() => {
        loading.value = false;
      });
  };
  onMounted(() => {
    queryAllFolder();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__row) {
    .cell {
      display: flex;
      align-items: center;
    }
  }

  .el-radio {
    height: unset;
  }
</style>
