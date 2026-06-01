<template>
  <el-dialog title="关联易仓" v-model="visible" @close="visible = false">
    <el-table
      :data="listData?.warehouseList"
      v-loading="listLoading"
      @selection-change="handleSelectionChange"
      row-key="warehouseId"
      ref="tableRef"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="warehouse ID" prop="warehouseId" />
      <el-table-column label="Code" prop="warehouseCode" />
      <el-table-column label="仓库名称" prop="warehouseDesc" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save()">确认</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const mappingWarehouseId = ref();
  const saveLoading = ref(false);

  const { listData, listLoading, runQuery } = useList<
    ErpApi.LuteosErpWarehouseQueryEcWarehouseList.RequestQuery,
    ErpApi.LuteosErpWarehouseQueryEcWarehouseList.ResponseBody
  >({
    service: erpApi.luteosErpWarehouseQueryEcWarehouseList,
  });

  const open = async (id, mappingList) => {
    mappingWarehouseId.value = id;
    visible.value = true;
    await runQuery();
    setSelectedRows(mappingList);
  };
  const materialList = ref<any[]>([]);
  const handleSelectionChange = (list) => {
    materialList.value = list;
  };
  const save = async () => {
    try {
      if (!materialList.value?.length) {
        ElMessage.warning({
          message: '未选择数据',
          duration: 5 * 100,
        });
        return;
      }
      saveLoading.value = true;
      let warehouseIdArr;
      warehouseIdArr = materialList.value.map((item) => item.warehouseId);
      await erpApi.luteosErpWarehouseMappingOtherWarehouse({
        warehouseId: mappingWarehouseId.value,
        mappingWarehouseId: warehouseIdArr,
      });
      emit('success', mappingWarehouseId.value);
      saveLoading.value = false;
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const setSelectedRows = async (mappingList) => {
    await nextTick();
    let warehouseIdArr;
    warehouseIdArr = mappingList.map((item) => item.ecWarehouseMapping);
    listData.value?.warehouseList?.forEach((row) => {
      if (warehouseIdArr.includes(row.warehouseId)) {
        tableRef.value!.toggleRowSelection(row, true);
      } else {
        tableRef.value!.toggleRowSelection(row, false);
      }
    });
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
