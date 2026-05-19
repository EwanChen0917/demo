<template>
  <el-dialog
    v-model="visible"
    title="历史报价"
    width="920px"
    @close="close"
    class="history-price-dialog"
  >
    <el-form ref="formRef" :model="editCurrentRow" :rules="rules">
      <el-table ref="tableRef" :data="list" max-height="300">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column
          v-for="item in tableColumns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template #header>
            <span class="item-header">{{ item.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <template v-if="$index === 0 && isEdit">
              <el-form-item :prop="item.prop">
                <el-input v-model="editCurrentRow[item.prop]" :label="row[item.prop]" />
              </el-form-item>
            </template>
            <template v-else>
              {{ row?.[item.prop] }}
            </template>
          </template>
        </el-table-column>

        <el-table-column width="150">
          <template #header>
            <span class="item-header">生效日期</span>
          </template>
          <template #default="{ row, $index }">
            <template v-if="$index === 0 && isEdit">
              <el-form-item prop="effectiveDate">
                <el-date-picker
                  v-model="editCurrentRow.effectiveDate"
                  type="date"
                  placeholder="请选择生效日期"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :disabled-date="(time) => time.getTime() < Date.now() - 8.64e7"
                />
              </el-form-item>
            </template>
            <template v-else>
              {{ row?.effectiveDate }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  text: true,
                  hide: $index !== 0 || isEdit,
                  row: row,
                },
                {
                  label: '保存',
                  key: 'save',
                  type: 'primary',
                  text: true,
                  hide: $index !== 0 || !isEdit,
                  row: row,
                },
                {
                  label: '取消',
                  key: 'cancel',
                  text: true,
                  row: row,
                  hide: $index !== 0 || !isEdit,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">返回</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { includeZero1 } from '@/utils/rulesRegExp';

  const visible = ref(false);
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array as PropType<{ prop: string; label: string }[]>,
      default: () => [],
    },
  });
  const tableRef = ref();
  const editCurrentRow = ref();
  const isEdit = ref(false);
  const list = computed(() => props.data);
  const emit = defineEmits(['save']);

  const formRef = ref();
  const amountFields = [
    'price1kgPlus',
    'price20kgPlus',
    'price50kgPlus',
    'price100kgPlus',
    'price500kgPlus',
    'price1000kgPlus',
    'priceHalfCbmPlus',
    'price1cbmPlus',
    'price5cbmPlus',
    'price10cbmPlus',
    'price15cbmPlus',
  ];
  const rules = amountFields.reduce(
    (acc, field) => {
      acc[field] = [
        {
          required: true,
          message: '非法输入',
          trigger: 'blur',
          pattern: includeZero1,
        },
      ];
      return acc;
    },
    {
      effectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'change' }],
    }
  );
  const saveRow = () => {
    if (formRef.value) {
      formRef.value
        ?.validate((valid: boolean) => {
          if (valid) {
            emit('save', editCurrentRow.value);
          }
        })
        .catch(() => false);
    }
  };

  const handleActions = (action: any) => {
    switch (action.key) {
      case 'edit':
        isEdit.value = true;
        editCurrentRow.value = { ...action.row };
        break;
      case 'save':
        saveRow();
        break;
      case 'cancel':
        isEdit.value = false;
        break;
    }
  };

  const open = () => {
    visible.value = true;
  };

  const close = () => {
    isEdit.value = false;
    visible.value = false;
  };
  defineExpose({
    open,
    close,
  });
</script>

<style scoped>
  .history-price-dialog {
    :deep(.cell) {
      overflow: visible !important;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 12px !important;
  }
  .item-header {
    &::before {
      content: '*';
      color: var(--el-color-danger);
      margin-right: 4px;
    }
  }
</style>
