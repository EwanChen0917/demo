<template>
  <div class="table-container">
    <vxe-table
      :row-class-name="rowClassName"
      ref="tableRef"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
      :data="spuSalesAnalysisList || []"
      :loading="loading"
      :round="true"
      size="small"
    >
      <!-- 排名 -->
      <vxe-column field="categoryRankNew" title="排名" width="70" align="center" fixed="left">
        <template #default="{ row, rowIndex }">
          <Rank :rank="rowIndex + 1" />
        </template>
      </vxe-column>

      <!-- 商品信息 -->
      <vxe-column field="productInfo" title="商品信息" width="30%">
        <template #default="{ row }">
          <div class="product-info">
            <div class="product-image">
              <img
                v-if="row?.spuImg"
                :src="row?.spuImg"
                alt=""
                @error="row.spuImg && (row.spuImg = '')"
              />
              <img v-else src="@/assets/images/system/empty.png" alt="" />
            </div>
            <span class="product-name">{{ row.spuName }}</span>
          </div>
        </template>
      </vxe-column>

      <!-- 销售额 -->
      <vxe-column field="salesAmount" title="销售额" width="20%" sortable>
        <template #default="{ row }">¥{{ formatNumberObj(row.salesAmount).toString() }}</template>
      </vxe-column>

      <!-- 销量 -->
      <vxe-column field="saleQty" title="销量" width="15%" sortable>
        <template #default="{ row }">
          {{ toThousands(row.saleQty) }}
        </template>
      </vxe-column>

      <!-- 占比 -->
      <vxe-column field="salesAmountProp" title="占比" align="right" :resizable="false">
        <template #default="{ row }">
          <progress-bar :percent="row.salesAmountProp" />
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
  import Rank from '@/views/personalCenter/components/rank.vue';
  import ProgressBar from '@/views/personalCenter/components/progressBar.vue';
  import { toThousands } from '@/utils/toThousands';
  import { SpuSalesAnalysisBean } from '@/api/bi/data-contracts';
  import { formatNumberObj } from '@/views/bi/utils/utils';

  const props = withDefaults(
    defineProps<{
      spuSalesAnalysisList: SpuSalesAnalysisBean;
      loading: boolean;
    }>(),
    {
      spuSalesAnalysisList: () => ({}),
    }
  );
  const rowClassName = (params) => {
    if (params.row.domain === 'momcozy.com') {
      return 'highlight-row';
    }
    return '';
  };
</script>

<style scoped lang="scss">
  :deep(.highlight-row) {
    .vxe-body--column {
      border-top: 1px solid var(---P6, #02b96b);
      border-bottom: 1px solid var(---P6, #02b96b);

      &:first-child {
        border-left: 1px solid var(---P6, #02b96b);
        box-shadow: 1px 0 0 0 var(---P6, #02b96b) inset;
      }

      &:last-child {
        border-right: 1px solid var(---P6, #02b96b);
      }
    }

    background: #f7fffa;
  }

  .product-info {
    display: flex;
    align-items: center;

    .product-image {
      width: 32px;
      height: 32px;
      margin-right: 10px;
      background-color: rgba(246, 246, 246);
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 32px;
        height: 32px;
      }
    }

    .product-name {
      flex: 1;
    }
  }
</style>
