<template>
  <el-dialog
    width="80%"
    :model-value="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <template #header>
      <el-space>
        <span class="el-dialog__title" style="font-size: 14px">调拨单复制</span>
        <ItemLabel label="初始调拨数量" :value="initialQuantity" />
      </el-space>
    </template>

    <el-table
      ref="tableRef"
      :data="transferOrderData"
      :row-class-name="rowClassName"
      max-height="500"
    >
      <el-table-column type="index" label="序号" min-width="80" fixed>
        <template #default="{ $index }">
          <span v-if="$index === 0" class="text">-</span>
          <span v-else class="text">复制行:{{ $index }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="planner" label="计划" />
      <el-table-column prop="operator" label="运营" />
      <el-table-column prop="channel" label="渠道" />
      <el-table-column prop="country" label="国家" />
      <el-table-column prop="supplySku" label="供应链SKU" min-width="100" />
      <el-table-column prop="outWarehouseId" label="调出仓" />
      <el-table-column prop="toWarehouseId" label="调入仓" min-width="110">
        <template #default="{ row, $index }">
          <WarehouseSelect
            v-if="row?.isEditing"
            placeholder="调入仓"
            v-model="row.toWarehouseId"
            filterable
            teleported
            style="width: 100%"
            :disabled="$index === 0"
          />
          <span v-else>{{ row?.toWarehouseId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" min-width="100">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>调拨数量</span>
            <el-tooltip content="调拨数量总和不可超过初始调拨数量" placement="top">
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row, $index }">
          <el-input-number
            v-if="row?.isEditing"
            v-model="row.quantity"
            :controls="false"
            :min="0"
            :precision="0"
            style="width: 100%"
          />
          <span v-else>{{ row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transportName" label="物流方式" min-width="110">
        <template #default="{ row }">
          <TransportSelect
            v-if="row?.isEditing"
            v-model="row.transportId"
            :query-source="true"
            clearable
            teleported
            style="width: 100%"
            @change-with-label="
              ({ value, label }) => {
                row.transportName = label;
                row.transportId = value;
              }
            "
          />
          <span v-else>{{ row.transportName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expectDeliveryDate" label="预计出库日期" min-width="100" />
      <el-table-column prop="expectShipmentDate" label="预计出运日期" min-width="100" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row, $index }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                row,
                index: $index,
                hide: $index > 0, // 如果是编辑状态则不显示复制按钮
              },
              {
                label: '删除',
                key: 'delete',
                type: 'error',
                row,
                index: $index,
                hide: $index === 0, // 如果是第一行则不显示删除按钮
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import TransportSelect from '@/views/supplyChainManage/efficiencyTools/logisticsChannel/components/TransportSelect.vue';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import { ElMessage } from 'element-plus';
  import WarehouseSelect from './warehouseSelect.vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const tableRef = ref(null); // 用于获取表格实例
  const transferOrderData = ref<any[]>([]); // 用于存储调拨单数据
  const initialQuantity = ref(); // 调拨初始数量
  const copyedQuantity = ref();

  // const otherRowsMaxList = computed(() => {
  //   const list = [] as any[];
  //   const data = transferOrderData.value;
  //   if (!data.length) return list;
  //   // 第一行
  //   list[0] = initialQuantity.value - copyedQuantity.value;
  //   // 其他行
  //   for (let i = 1; i < data.length; i++) {
  //     const firstRowQuantity = Number(data[0]?.quantity) || 0;
  //     // 除当前行外的其他复制行已填和
  //     const otherRowsTotal = data
  //       .slice(1)
  //       .reduce((sum, item, idx) => sum + (idx + 1 === i ? 0 : Number(item.quantity) || 0), 0);
  //     list[i] = Math.max(initialQuantity.value - otherRowsTotal - firstRowQuantity, 0);
  //   }
  //   return list;
  // });

  const rowClassName = ({ rowIndex }) => {
    return rowIndex === 0 ? 'first-row-bg' : '';
  };
  const getDetail = async (transferId) => {
    const res = await erpApi.luteosErpOrderTransferQueryDetail({ transferId });
    // 初始调拨数量
    if (res) {
      initialQuantity.value = res.initialQuantity;
      const copyedCount =
        res.childrenList?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
      copyedQuantity.value = copyedCount;

      transferOrderData.value = [res].map((item) => ({
        ...item,
        isEditing: true, // 控制是否可编辑
      }));
    }
  };

  const open = (row) => {
    visible.value = true;
    getDetail(row.transferId);
  };

  const handleActions = (item) => {
    const { key, row, index } = item;
    if (key === 'delete') {
      transferOrderData.value.splice(index, 1);
    } else if (key === 'copy') {
      const newRow = { ...row, quantity: 0, isEditing: true };
      transferOrderData.value.splice(index + 1, 0, newRow);
    }
  };
  const handleConfirm = async () => {
    // 处理确认逻辑
    const params = transferOrderData.value.map((item, index) => ({
      parentTransferId: index === 0 ? undefined : transferOrderData.value[0].transferId,
      transferId: index === 0 ? item.transferId : undefined,
      quantity: item.quantity || 0,
      toWarehouseId: item.toWarehouseId,
      transportName: item.transportName,
      transportId: item.transportId,
    }));
    await erpApi.luteosErpOrderTransferCopySave(params);
    ElMessage.success('调拨单复制成功！');
    visible.value = false;
    emit('success');
  };

  defineExpose({ open });
</script>

<style scoped lang="scss">
  :deep(.first-row-bg) {
    position: sticky;
    top: 0;
    z-index: 3;
  }
  .text {
    color: #999;
  }
</style>
