<template>
  <div class="price-title">
    <h5 class="mb-0">渠道报价(生效时间: {{ props.priceUpdateTime }})</h5>
    <el-button type="primary" @click="visible = true">历史报价</el-button>
  </div>
  <el-table :data="priceList" max-height="300">
    <el-table-column type="index" label="序号" width="50" />
    <el-table-column prop="matchType" label="类型" min-width="60">
      <template #default="{ row }">
        {{
          row.matchType === 'warehouseCode'
            ? '仓库'
            : row.matchType === 'zipcodePrefix'
            ? '邮编'
            : ''
        }}
      </template>
    </el-table-column>
    <el-table-column prop="matchContent" label="仓库" min-width="100">
      <template #default="{ row }">
        <OverflowTooltip :content="row.matchContent" :line="1" />
      </template>
    </el-table-column>
    <template v-for="item in priceHeader" :key="item?.columnKey">
      <el-table-column :prop="item.columnKey" :label="item.columnName" min-width="80" />
    </template>
    <el-table-column prop="effectiveDate" label="生效日期" min-width="100" />
  </el-table>
  <!-- 历史报价弹窗 -->
  <el-dialog v-model="visible" title="历史报价" width="920px" @close="visible = false">
    <el-table :data="pricesHistory" max-height="300">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="matchType" label="类型" min-width="60">
        <template #default="{ row }">
          {{
            row.matchType === 'warehouseCode'
              ? '仓库'
              : row.matchType === 'zipcodePrefix'
              ? '邮编'
              : ''
          }}
        </template>
      </el-table-column>
      <el-table-column prop="matchContent" label="仓库" min-width="100">
        <template #default="{ row }">
          <OverflowTooltip :content="row.matchContent" :line="1" />
        </template>
      </el-table-column>
      <template v-for="item in priceHeader" :key="item?.columnKey">
        <el-table-column :prop="item.columnKey" :label="item.columnName" />
      </template>
      <el-table-column prop="effectiveDate" label="生效日期" min-width="100" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import HistoryPriceDialog from './HistoryPriceDialog.vue';

  const props = defineProps({
    priceList: {
      type: Array,
      default: () => [],
    },
    pricesHistory: {
      type: Array,
      default: () => [],
    },
    priceHeader: {
      type: Array as PropType<{ columnKey: string; columnName: string }[]>,
      default: () => [],
    },
    priceUpdateTime: {
      type: String,
      default: '',
    },
  });

  const visible = ref(false);

  // const emit = defineEmits(['update:priceList']);

  // const updateHistoryPrice = async (data) => {
  //   try {
  //     const api =
  //       props.chargeType === 'volume'
  //         ? erpApi.luteosErpLogisticsChannelPriceUpdateVolume
  //         : erpApi.luteosErpLogisticsChannelPriceUpdate;
  //     const res = await api({
  //       ...data,
  //       channelId: props.channelId,
  //     });
  //     ElMessage.success('报价更新成功');
  //     if (res) {
  //       historyPriceDialogRef.value.close();
  //       emit('update:priceList');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
</script>

<style scoped lang="scss">
  .price-title {
    display: grid;
    grid-template-columns: 1fr 75px;
    align-items: center;
    padding: 10px 0;
  }
</style>
