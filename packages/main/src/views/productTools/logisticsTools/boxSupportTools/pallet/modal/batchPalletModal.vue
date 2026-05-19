<template>
  <el-dialog title="批量设置托盘" v-model="visible" width="880px" hide-required-asterisk>
    <el-form ref="formRef" :model="tableData" :label-width="0">
      <el-table :data="tableData">
        <el-table-column label="开始箱号">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`${$index}.startBoxNumber`"
              :rules="[
                {
                  required: true,
                  message: '请输入开始箱号',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input-number
                v-model="row.startBoxNumber"
                :min="1"
                :precision="0"
                :controls="false"
                placeholder="请输入"
                :max="totalNumber"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="结束箱号">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`${$index}.endBoxNumber`"
              :rules="[
                {
                  required: true,
                  message: '请输入结束箱号',
                  trigger: 'blur',
                },
                {
                  validator: validators.endBoxNumber.bind(row),
                  trrigger: 'blur',
                },
              ]"
            >
              <el-input-number
                v-model="row.endBoxNumber"
                :min="0"
                :precision="0"
                :controls="false"
                placeholder="请输入"
                :max="totalNumber"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="托盘号">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`${$index}.palletNumber`"
              :rules="[
                {
                  required: true,
                  message: '请输入托盘号',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input-number
                v-model="row.palletNumber"
                :min="1"
                :precision="0"
                :controls="false"
                placeholder="请输入"
                :max="999"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '添加',
                  key: 'add',
                  type: 'primary',
                  text: true,
                  row,
                  index: $index,
                },
                {
                  label: '删除',
                  key: 'del',
                  type: 'danger',
                  text: true,
                  hide: $index === 0,
                  row,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage, FormInstance } from 'element-plus';

  const emit = defineEmits<{
    (event: 'confirm', data: TableData[]): void;
  }>();

  const visible = ref(false);

  type TableData = {
    startBoxNumber?: number;
    endBoxNumber?: number;
    palletNumber?: number;
  };
  const tableData = ref<TableData[]>([{}]);
  /**
   * 列表操作栏
   */
  const handleActions = ({ key, index }) => {
    switch (key) {
      case 'add':
        add();
        break;
      case 'del':
        tableData.value.splice(index, 1);
        break;
      default:
        break;
    }
  };
  /**
   * 添加
   */
  const add = async () => {
    const result = await validateTableData();
    if (result) {
      tableData.value.push({});
    }
  };
  const validators = {
    endBoxNumber(rule, value, callback) {
      if (value && value < this.startBoxNumber) {
        callback(new Error('结束箱号必须大于开始箱号'));
      }
      callback();
    },
  };
  /**
   * 验证表格数据
   */
  const formRef = ref<FormInstance>();
  const validateTableData = async (): Promise<boolean> => {
    // 验证表格数据全部填充
    const validateResult = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!validateResult) {
      ElMessage.error('请检查表格数据');
      return false;
    }
    // 验真表格数据是否存在交集
    const isIntersect = tableData.value.some((item, index) => {
      return tableData.value.slice(index + 1).some((nextItem) => {
        return (
          (item.startBoxNumber! <= nextItem.startBoxNumber! &&
            item.endBoxNumber! >= nextItem.startBoxNumber!) ||
          (item.startBoxNumber! <= nextItem.endBoxNumber! &&
            item.endBoxNumber! >= nextItem.endBoxNumber!)
        );
      });
    });
    if (isIntersect) {
      ElMessage.error('箱号区间存在交集');
      return false;
    }
    return true;
  };
  /**
   * 打开弹窗
   */
  const totalNumber = ref(1); // 总箱数, 控制输入箱数的最大值
  const open = (totalBoxNumber: number) => {
    totalNumber.value = totalBoxNumber;
    tableData.value = [{}];
    visible.value = true;
  };
  /**
   * 关闭弹窗
   */
  const handleClose = () => {
    visible.value = false;
  };
  /**
   * 确认
   */
  const confirm = async () => {
    const result = await validateTableData();
    if (result) {
      emit('confirm', tableData.value);
      handleClose();
    }
  };
  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
