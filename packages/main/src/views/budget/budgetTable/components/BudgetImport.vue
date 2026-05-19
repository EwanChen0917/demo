<template>
  <el-dialog
    title="预算表单导入"
    :destroy-on-close="true"
    :model-value="visible"
    width="800"
    @close="onClose"
    align-center
  >
    <div class="requirement-title">上传说明</div>
    <div class="requirement-list">
      <div class="requirement-item">1. 请按照模板导入文件；</div>
      <div class="requirement-item">2. 【覆盖导入】会清除已有数据再导入数据；</div>
      <div class="requirement-item">3. 【追加导入】会保留已有数据并追加导入数据；</div>
      <div class="requirement-item">
        4.【更新导入】会根据 code 列匹配 修改已有的行为对应的导入数据，未匹配的行将被忽略。
      </div>
      <div class="requirement-item">5. 导入成功后，需点击“保存”按钮。</div>
    </div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <input type="file" class="file-input" ref="fileInput" @change="onFileChange" />
      <el-button type="primary" @click="onSelectFile">选择文件</el-button>
      <el-button
        type="primary"
        text
        size="default"
        style="color: var(--el-color-primary) !important"
        :disabled="!canAddLine"
        @click="getTemplate(false)"
      >
        <i class="iconfont icon-xiazai"></i>
        下载模板
      </el-button>
      <el-popover trigger="click" placement="top">
        <div class="column-selector">
          <el-checkbox-group v-model="checkedColumns">
            <el-checkbox
              v-for="col in canExportAllColumns"
              :key="col.cellFieldName"
              :value="col.cellFieldName"
            >
              <span v-if="!col.canImport">❌</span>
              <span v-if="col.canImport"></span>

              {{ col.cellCnName }}
            </el-checkbox>
          </el-checkbox-group>
          <div class="column-selector-action">
            <el-space>
              <span style="margin-right: 10px">❌列的数据不会被导入</span>
              <el-button type="default" @click="onSelectAll(1)">全选</el-button>
              <el-button type="default" @click="onSelectAll(2)">全选可导入</el-button>
              <el-button type="default" @click="onSelectAll(0)">全不选</el-button>
              已选{{ checkedColumns.length }}列
            </el-space>
            <el-button type="primary" size="default" @click="getTemplate(true)">下载模板</el-button>
          </div>
        </div>
        <template #reference>
          <el-button
            type="primary"
            text
            size="default"
            style="color: var(--el-color-primary) !important"
          >
            <i class="iconfont icon-xiazai"></i>
            下载带有行标识的模板
          </el-button>
        </template>
      </el-popover>
    </div>
    <div v-if="fileName" class="mt-5">已选择：{{ fileName }}</div>
    <el-tag
      v-if="msg"
      size="large"
      type="primary"
      style="margin-top: 16px; font-size: 1.2em"
      effect="plain"
    >
      {{ msg }}
    </el-tag>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" :disabled="!canAddLine" @click="onCover">覆盖导入</el-button>
        <el-button type="primary" :disabled="!canAddLine" @click="onAppend">追加导入</el-button>
        <el-button type="primary" @click="onUpdate">更新导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import ExcelJS from 'exceljs';
  import { CellType, ImportType } from '@/views/budget/budgetTable/types/type';
  import { budgetApi } from '@/api';
  import { uuid } from '@/utils/aesTils';
  import * as swal from '@/utils/swal';
  import { exportTableTemplate } from '@/views/budget/budgetTable/script/budgetExport';
  import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
  import { matchValueFromDropdownList } from '@/views/budget/budgetTable/script/budgetTable';
  import { useStore } from '@/store/modules/useStore';
  import dayjs from 'dayjs';
  import { sleep, uploadFileToOss } from '@/views/budget/budgetTable/util/util';
  import { isLocalhost } from '@/views/budget/budgetTable/script/variable';

  const store = useStore();

  const visible = ref(false);
  let tableData = null;
  const code = ref('');

  const checkedColumns = ref([]);
  let buildExportParams = null;

  const canAddLine = computed(() => {
    return tableData.canAddLine;
  });

  const canExportAllColumns = computed(() => {
    return tableData.columns.map((x) => {
      return {
        ...x,
        canImport:
          +x.canView &&
          // +x.canEdit
          x.canEdit !== '0' &&
          x.canEdit !== 0 &&
          x.canEdit !== false &&
          !x.cellFieldName?.startsWith?.('_') &&
          !x.isExtendColumn &&
          x.cellFieldName !== '__updator',
      };
    });
  });

  const showModal = (_code, _tableData, _buildExportParams) => {
    visible.value = true;
    msg.value = '';
    clearFile();
    code.value = _code;
    tableData = _tableData;
    buildExportParams = _buildExportParams;
    checkedColumns.value = [];
  };

  const msg = ref('');

  defineExpose({
    showModal,
  });

  const emit = defineEmits(['success']);

  const onClose = () => {
    visible.value = false;
  };

  const fileInput = ref();
  const fileName = ref('');

  const onSelectFile = () => {
    clearFile();
    msg.value = '';
    (fileInput.value as HTMLInputElement).click();
  };
  const onFileChange = (e: any) => {
    msg.value = '';
    fileName.value = e.target.files?.[0]?.name || '';
  };
  const clearFile = () => {
    fileName.value = '';
    msg.value = '';
    if (fileInput.value) {
      (fileInput.value as HTMLInputElement).value = '';
      (fileInput.value as HTMLInputElement).files = null;
    }
  };

  const showMessage = async (_msg, wait = 100) => {
    msg.value = _msg;
    if (wait) {
      // 如果wait是0，那就不 sleep
      await sleep(wait || 100);
    }
  };

  const onSelectAll = (checkType) => {
    switch (checkType) {
      case 1:
        checkedColumns.value = canExportAllColumns.value.map((x) => x.cellFieldName);
        break;
      case 2:
        checkedColumns.value = canExportAllColumns.value
          .filter((x) => x.canImport)
          .map((x) => x.cellFieldName);
        break;
      default:
        checkedColumns.value = [];
        break;
    }
  };

  const getTemplate = async (isHaveRowCode) => {
    if (isHaveRowCode) {
      if (!checkedColumns.value.length) {
        ElMessage.error('请选择需要导出的列');
        return;
      }
    }
    const params = buildExportParams();
    const budgetStore = useBudgetStore(code.value);
    const list = budgetStore
      .getHotInstance?.()
      ?.getDataMap?.()
      .filter((x) => x.__isOriginRow);
    exportTableTemplate(
      tableData,
      params,
      isHaveRowCode,
      isHaveRowCode
        ? checkedColumns.value.map((x) => {
            return canExportAllColumns.value.find((y) => y.cellFieldName === x);
          })
        : [],
      isHaveRowCode ? list : []
    );
  };

  const onCover = async () => {
    doImport(
      ImportType.Cover,
      `导入的列有 #otherFieldsLength# 列非表头列【#fieldErrorTip#】，请检查表格模板，或者忽略并继续导入，是否继续导入？`,
      `即将覆盖导入 #rowCount# 行数据，覆盖导入将会覆盖已有数据，导入成功后需点击“保存”按钮保存数据，是否继续导入？`
    );
  };
  const onAppend = async () => {
    doImport(
      ImportType.Append,
      `导入的列有 #otherFieldsLength# 列非表头列【#fieldErrorTip#】，请检查表格模板，或者忽略并继续导入，是否继续导入？`,
      `即将追加导入 #rowCount# 行数据，追加导入将会在已有数据后添加新数据，导入成功后需点击“保存”按钮保存数据，是否继续导入？`
    );
  };

  const onUpdate = async () => {
    doImport(
      ImportType.Update,
      `导入的列有 #otherFieldsLength# 列非表头列【#fieldErrorTip#】，请检查表格模板，或者忽略并继续导入，是否继续导入？`,
      `即将更新导入 #rowCount# 行数据，更新导入将会修改已有数据，导入成功后需点击“保存”按钮保存数据，是否继续导入？`
    );
  };

  const doImport = async (type: ImportType, fieldErrorTip: string, confirmTip: string) => {
    // console.log("tableData=", tableData)
    const importFile = (fileInput.value as HTMLInputElement).files?.[0];
    if (!importFile) {
      ElMessage.error('请选择文件');
      return;
    }
    await showMessage('正在读取表格...');
    const { rows, otherFields, validFields, fileName, file } = await readExcel(type);

    if (!rows?.length) {
      await showMessage('没有读取到数据');
      ElMessage.error('没有读取到数据');
      return;
    }
    if (otherFields?.length) {
      const isConfirmed = await swal.confirm(
        fieldErrorTip
          .replace('#otherFieldsLength#', otherFields.length)
          .replace('#fieldErrorTip#', otherFields.map((x) => x.field).join(', '))
      );
      if (!isConfirmed) {
        await showMessage('');
        return;
      }
    }

    const isConfirmed = await swal.confirm(confirmTip.replace('#rowCount#', rows.length));
    if (!isConfirmed) {
      await showMessage('');
      return;
    }

    // 数据匹配
    const budgetStore = useBudgetStore(code.value);

    await showMessage('开始匹配数据...');

    for (let i = 0; i < validFields.length; i++) {
      await showMessage(`数据匹配(第${i + 1}/${validFields.length}列)...`, 10);
      const { field } = validFields[i];

      const column = budgetStore.getColumn(field);
      if (!column) {
        return;
      }
      if (
        column.cellType === CellType.Select ||
        column.cellType === CellType.SelectCascade ||
        column.cellType === CellType.AutoComplete ||
        column.cellType === CellType.AutoCompleteCascade
      ) {
        const cellDropDownList = column.cellDropDownList || [];
        if (!cellDropDownList.length) {
          return;
        }
        rows.forEach((row) => {
          let value = row.rowJson[field];

          value = value && value.toString().replace(/\s+/g, ' ');

          const result = matchValueFromDropdownList(value, cellDropDownList);
          if (result) {
            row.rowJson[field] = result;
          }
        });
      }
    }

    await showMessage('文件上传中...');

    // 解析完成后，将文件上传到 oss。
    const { ossKey } = await uploadFileToOss({
      isSaveBudget: false,
      fileName,
      file,
      directory: '财务-预算编制表-导入',
    });

    const recordCode = await budgetApi.financeBudgetPresentationTableCreateImportRecord({
      fileName,
      key: ossKey,
    });

    await showMessage('导入成功，3秒 后刷新页面...', 3000);

    emit('success', rows, type, {
      importTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      importUser: store.userInfo.name,
      fileName,
      recordCount: rows.length,
      importType: type,
      ossKey,
      recordCode,
    });
  };

  const readExcel = async (type: ImportType) => {
    try {
      const file = (fileInput.value as HTMLInputElement).files?.[0];
      if (!file) {
        ElMessage.error('请选择文件');
        return;
      }
      // 必须是xlsx格式
      if (file.name.split('.').pop() !== 'xlsx') {
        ElMessage.error('请选择xlsx格式的文件');
        return;
      }
      const workbook = new ExcelJS.Workbook();
      const res = await workbook.xlsx.load(file);
      if (!res?._worksheets?.length) {
        ElMessage.error('表格文件读取失败');
        return;
      }
      const worksheet = workbook._worksheets?.[1];
      if (!worksheet) {
        ElMessage.error('工作表读取失败');
        return;
      }

      const tableFields = worksheet
        .getRow(1)
        .values.map((field, index) => {
          return {
            index,
            field,
          };
        })
        .filter((x) => x.field);

      if (type === ImportType.Update) {
        // 必须有 __code 列
        if (!tableFields.some((x) => x.field === '__code')) {
          ElMessage.error('更新导入缺失 code 列，请确认模板是否正确');
          return;
        }
      }

      const { headerRowCount } = tableData;

      const otherFields = [];
      const validFields = [];
      tableFields.forEach((x) => {
        const isHave =
          tableData.originalColumns.some((y) => y.cellFieldName === x.field) ||
          (type === ImportType.Update && x.field === '__code') ||
          x.field;

        if (!isHave) {
          otherFields.push(x);
        } else {
          validFields.push(x);
        }
      });

      // console.log('tableFields=', otherFields, validFields);

      const fieldIndexMap = {};
      validFields.forEach((x) => {
        fieldIndexMap[x.index] = x.field;
      });

      const rows = [];

      worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
        if (rowIndex <= headerRowCount + 1) {
          // +1 是因为，前端在最开始添加了辅助行
          return;
        }
        const rowData = {};
        let isEmpty = true;

        row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
          const field = fieldIndexMap[colIndex];
          if (!field) {
            return;
          }

          let { value } = cell;
          if (value !== null && value !== undefined && value !== '' && !value?.startsWith?.('=')) {
            // value 有可能是富文本 对象
            if (value.richText) {
              if (Array.isArray(value.richText)) {
                value = value.richText
                  .map((item) => {
                    return item.text;
                  })
                  .join('');
              } else {
                // not reachable
                value = value.richText.toString();
              }
            }
            rowData[field] = value;
            isEmpty = false;
          }
        });
        if (!isEmpty) {
          rows.push({
            code: rowData.__code || uuid(),
            rowJson: rowData,
          });
        }
      });

      // if (isLocalhost) {
      //   rows = rows.slice(0, 500);
      // }

      return {
        rows,
        otherFields,
        validFields,
        fileName: file.name,
        file,
      };
    } catch (error) {
      ElMessage.error('表格文件读取失败');
      return [];
    }
  };
</script>

<style scoped lang="scss">
  .file-input {
    display: none;
  }
  .requirement-title {
    margin-bottom: 6px;
    color: var(---N9, #1f1f1f);
    /* 常规/Medium 13 */
    font-family: 'PingFang SC';
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 169.231% */
    &:before {
      content: '*';
      color: var(---C7, #f53f3f);
      /* 常规/Regular 13 */
      margin-right: 4px;
      font-size: 13px;
      line-height: 22px; /* 169.231% */
    }
  }

  .requirement-list {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .requirement-item {
      color: var(---N8, #666);
      /* 较弱/Regular 12 */
      font-size: 14px;
      line-height: 20px; /* 166.667% */
    }
  }
  .column-selector {
    width: 1000px;
    max-height: 350px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    :deep(.el-checkbox-group) {
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
    }
    .column-selector-action {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
