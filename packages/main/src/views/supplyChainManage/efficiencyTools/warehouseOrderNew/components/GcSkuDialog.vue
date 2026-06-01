<template>
  <el-dialog width="950px" title="选择商品" v-model="visible" @close="close" align-center>
    <el-form inline>
      <el-form-item label="商品编码">
        <el-input style="width: 180px" v-model="code" clearable />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input style="width: 180px" v-model="name" clearable />
      </el-form-item>
      <el-form-item label-width="0">
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="tableRef"
      row-key="value"
      :data="currentList"
      max-height="60vh"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" reserve-selection />
      <el-table-column label="商品编码" prop="value" />
      <el-table-column label="中文名称" prop="desc" min-width="180px" />
      <el-table-column label="申报价值（USD）" prop="params.declaredValue" />
      <el-table-column label="可售数量" prop="qty">
        <template #default="{ row }">
          <span>{{ row.params[warehouseCode + '_SELLABLE'] || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template #default="{ row }">
          <!--          {{ row }}-->
          <NumberInput
            v-model="row.quantity"
            :precision="0"
            :min="0"
            :max="row.params[warehouseCode + '_SELLABLE'] || 0"
            clearable
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      v-if="tableData.length"
      :current="current"
      :page-size="pageSize"
      :page-size-option="[10, 20]"
      :pager-count="5"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (event: 'success', val?: any): void;
  }>();

  const visible = ref(false);

  const code = ref('');
  const name = ref('');

  const tableRef = ref();

  const pageSize = ref(10);
  const current = ref(1);

  const tableData = computed(() => {
    return skuList.value.filter((item) => {
      return item.value.includes(code.value) && item.desc.includes(name.value);
    });
  });

  const handleSizeChange = (val) => {
    current.value = 1;
    pageSize.value = val;
  };

  const handleCurrentChange = (val) => {
    current.value = val;
  };

  // 勾选产品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    console.log('totalList', list);
    selectedList.value = [];
    totalList.value = list;
  };

  const save = async () => {
    if (totalList.value.length) {
      emit('success', tableRef.value?.getSelectionRows());
      visible.value = false;
    } else {
      ElMessage.warning('请选择商品');
    }
  };

  const skuList = ref([]);
  const selectedList = ref([]);
  const warehouseCode = ref();
  const open = async (warehouseId, list, selectList) => {
    visible.value = true;
    skuList.value = list;
    warehouseCode.value = warehouseId;
    console.log('list', list);
    selectedList.value = selectList;
  };

  const currentList = computed(() => {
    if (selectedList.value?.length) {
      selectedList.value.forEach((row) => {
        console.log('row', row);
        // if (!totalList.value?.find((item) => item.value === row.value))
        tableRef.value?.toggleRowSelection(row);
      });
    }
    const startIndex = (current.value - 1) * pageSize.value;
    return tableData.value.slice(startIndex, startIndex + pageSize.value);
  });

  const close = () => {
    tableRef.value?.clearSelection();
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
