<template>
  <div class="xlsx-viewer">
    <div class="xlsx-content">
      <!-- 表格展示 -->
      <div class="table-container">
        <el-table
          :data="tableData"
          stripe
          border
          table-layout="auto"
          v-if="tableData.length > 0"
          height="100%"
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
        <Empty v-else description="暂无内容" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getCookieToken } from '@/hooks/web/useCookie';
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  import { ElMessage } from 'element-plus';
  import { Loading, WarningFilled } from '@element-plus/icons-vue';
  import Empty from './Empty.vue';

  interface Column {
    prop: string;
    label: string;
  }

  const props = defineProps<{
    nodeExecutionId: string;
    instanceCode: string;
  }>();

  const loading = ref(true);
  const error = ref('');
  const columns = ref<Column[]>([]);
  const tableData = ref<Record<string, any>[]>([]);

  // 加载并解析 Excel 文件
  const loadExcelData = async () => {
    try {
      loading.value = true;
      error.value = '';

      const token = getCookieToken();
      const res = await axios.get(
        `/api/luteos/ai/npo/project/generateExcel?difyNodeExecutionId=${props.nodeExecutionId}&instanceCode=${props.instanceCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );

      // 处理可能的错误响应
      if (res.data instanceof Blob && res.data.type === 'application/json') {
        const text = await res.data.text();
        const errorData = JSON.parse(text);
        if (errorData?.code) {
          error.value = errorData?.message || '加载失败';
          ElMessage.error(error.value);
          return;
        }
      }

      // 读取 Blob 数据
      const arrayBuffer = await res.data.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      // 使用 xlsx 解析
      const wb = XLSX.read(data, { type: 'array' });
      const firstSheetName = wb.SheetNames[0];
      const worksheet = wb.Sheets[firstSheetName];

      if (!worksheet) {
        error.value = '无法读取工作表数据';
        return;
      }

      // 将 sheet 转换为 JSON，跳过第一行表头
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: '',
      }) as any[][];

      if (jsonData.length === 0) {
        error.value = '表格数据为空';
        return;
      }

      // 第一行作为表头
      const headerRow = jsonData[0];
      const dataRows = jsonData.slice(1);

      // 检查某一列是否在所有数据行中都为空
      const isColumnEmpty = (colIndex: number): boolean => {
        return dataRows.every((row) => {
          const cellValue = row[colIndex];
          return cellValue === undefined || cellValue === null || cellValue === '';
        });
      };

      // 计算有效列数：如果最后一列为空，则去掉最后一列
      const lastColumnIndex = headerRow.length - 1;
      const validColumnCount = isColumnEmpty(lastColumnIndex) ? lastColumnIndex : headerRow.length;

      // 生成列配置
      const cols: Column[] = [];
      for (let i = 0; i < validColumnCount; i++) {
        cols.push({
          prop: `col_${i}`,
          label: headerRow[i] || `列${i + 1}`,
        });
      }

      columns.value = cols;

      // 从第二行开始是数据行
      const processedDataRows = dataRows.map((row) => {
        const rowData: Record<string, any> = {};
        for (let i = 0; i < validColumnCount; i++) {
          rowData[`col_${i}`] = row[i] ?? '';
        }
        return rowData;
      });
      tableData.value = processedDataRows;
    } catch (err: any) {
      console.error('加载 Excel 失败:', err);
      error.value = err?.message || '加载失败，请稍后重试';
      ElMessage.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadExcelData();
  });
</script>

<style scoped lang="scss">
  .xlsx-viewer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .xlsx-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;

      .table-container {
        height: 100%;
        flex: 1;
        overflow: auto;

        :deep(.el-table) {
          font-size: 12px;

          .el-table__header th {
            font-weight: 600;
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
