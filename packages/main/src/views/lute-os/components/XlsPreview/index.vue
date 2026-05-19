<template>
  <el-dialog
    :model-value="visible"
    :title="fileName"
    width="90%"
    top="5vh"
    append-to-body
    destroy-on-close
    @close="handleClose"
    class="custom-dialog"
  >
    <div v-loading="loading" class="xlsx-viewer">
      <div class="xlsx-content">
        <!-- 表格展示 -->
        <div class="table-container">
          <el-table
            :data="tableData"
            stripe
            border
            table-layout="auto"
            v-if="tableData.length > 0"
            height="70vh"
            style="border-radius: 10px"
          >
            <el-table-column
              v-for="(col, index) in columns"
              :key="index"
              :prop="col.prop"
              :label="col.label"
              min-width="200"
            >
              <template #default="{ row }">
                <span>{{ row[col.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-else-if="!loading" description="暂无内容" />
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" v-if="!hideDownload" @click="handleDownload">下载</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  import { ElMessage } from 'element-plus';
  import { download } from '@/utils/download';

  interface Column {
    prop: string;
    label: string;
  }

  const props = defineProps<{
    visible: boolean;
    url: string;
    fileName: string;
    hideDownload?: boolean;
  }>();

  const emit = defineEmits(['close']);

  const loading = ref(false);
  const columns = ref<Column[]>([]);
  const tableData = ref<Record<string, any>[]>([]);

  const loadExcelData = async () => {
    if (!props.url) return;
    try {
      loading.value = true;
      const res = await axios.get(props.url, { responseType: 'arraybuffer' });

      const data = new Uint8Array(res.data);
      const wb = XLSX.read(data, { type: 'array' });
      const firstSheetName = wb.SheetNames[0];
      const worksheet = wb.Sheets[firstSheetName];

      if (!worksheet) {
        ElMessage.warning('无法读取工作表数据');
        return;
      }

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: '',
      }) as any[][];

      if (jsonData.length === 0) {
        tableData.value = [];
        return;
      }

      const headerRow = jsonData[0];
      const dataRows = jsonData.slice(1);

      const isColumnEmpty = (colIndex: number): boolean => {
        return dataRows.every((row) => {
          const cellValue = row[colIndex];
          return cellValue === undefined || cellValue === null || cellValue === '';
        });
      };

      const lastColumnIndex = headerRow.length - 1;
      const validColumnCount = isColumnEmpty(lastColumnIndex) ? lastColumnIndex : headerRow.length;

      const cols: Column[] = [];
      for (let i = 0; i < validColumnCount; i++) {
        cols.push({
          prop: `col_${i}`,
          label: String(headerRow[i] || `列${i + 1}`),
        });
      }
      columns.value = cols;

      tableData.value = dataRows.map((row) => {
        const rowData: Record<string, any> = {};
        for (let i = 0; i < validColumnCount; i++) {
          rowData[`col_${i}`] = row[i] ?? '';
        }
        return rowData;
      });
    } catch (err: any) {
      console.error('加载 Excel 失败:', err);
      ElMessage.error('加载失败，请稍后重试');
    } finally {
      loading.value = false;
    }
  };

  const handleClose = () => emit('close');
  const handleDownload = () => download(props.url, props.fileName);

  watch(
    () => props.visible,
    (val) => {
      if (val) loadExcelData();
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .xlsx-viewer {
    width: 100%;
    display: flex;
    flex-direction: column;

    .xlsx-content {
      display: flex;
      flex-direction: column;
      flex: 1;

      .table-container {
        flex: 1;
        overflow: auto;

        :deep(.el-table) {
          font-size: 12px;

          .el-table__header th {
            font-weight: 600;
            background-color: var(--el-fill-color-light);
          }

          .el-table__body td {
            padding: 9px 12px;
          }
        }
      }
    }
  }
  :deep(.el-table thead th) {
    border-left: 1px solid var(--el-table-border-color);
  }
</style>
