<template>
  <div v-for="(item, index) in orderList" :key="item.id" class="order-table">
    <div class="online-packing-header">
      <el-space :size="50">
        <div class="fs-5 fw-bolder">订单{{ index + 1 }}</div>
        <div class="fs-5">参考号：{{ item.referenceCode }}</div>
        <div class="fs-5">订单号：{{ item.orderCode }}</div>
        <div class="fs-5">客户名称：{{ item.customerName }}</div>
        <div class="boxNumber" v-if="needBoxNumber">
          <span class="boxNumberTip">总箱数：</span>
          <template v-if="canChangeBoxNumber">
            <el-input-number
              :controls="false"
              v-model="item.totalBox"
              :min="1"
              :precision="0"
              placeholder="请输入"
            />
            <el-button type="primary" @click="sureBoxNumber(item.totalBox ?? 0, true, index)" text>
              确定
            </el-button>
          </template>
          <span v-else>{{ item.totalBox }}</span>
        </div>
      </el-space>
      <div v-if="canChangeBoxNumber && needBoxNumber" class="auto-fill-btn">
        <el-button
          :disabled="!item.totalBox"
          type="primary"
          plain
          :loading="autoFillLoading"
          @click="autoFill(item, index)"
        >
          自动填充
        </el-button>
      </div>
    </div>
    <vxe-table
      :data="item.skuDescList"
      v-loading="loading"
      show-overflow
      show-header-overflow
      show-footer-overflow
      height="600"
      :column-config="{ resizable: true }"
      :scroll-y="{ enabled: true, gt: 0 }"
      :scroll-x="{ enabled: true, gt: 0 }"
    >
      <vxe-column
        v-for="v in tableColumnListArray[index]"
        :key="v.prop"
        :title="v.label"
        :width="v.width || '80px'"
        :fixed="v.fixed ? 'left' : ''"
      >
        <template v-if="v.prop === 'index'" #default="{ row, $rowIndex }">
          <span v-if="!row.isExtraData">{{ $rowIndex + 1 }}</span>
        </template>
        <template v-else-if="v.prop?.includes('boxNumber')" #default="{ row }">
          <el-input-number
            style="width: 100%"
            v-model="row[v.prop]"
            v-if="v.canEdit"
            :min="0"
            :precision="row.isExtraData ? 2 : 0"
            :controls="false"
            placeholder="请输入"
            :max="9999.99"
          />
          <span v-else>{{ row[v.prop] }}</span>
        </template>
        <template v-else #default="{ row }">{{ row[v.prop] }}</template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import type { ProductConfigPropertyResp, SourceOrderBean } from '@/api/erp/data-contracts';
  import { ElMessage } from 'element-plus';

  export type NewSourceOrderBeanType = SourceOrderBean & { totalBox?: number };
  const initTableColumnList = [
    {
      prop: 'index',
      label: '序号',
      slotName: 'index',
      width: 50,
      fixed: true,
    },
    {
      prop: 'productName',
      label: '产品名称',
      width: 345,
      fixed: true,
    },
    {
      prop: 'sku',
      label: 'sku',
      width: 245,
      fixed: true,
    },
    {
      prop: 'qty',
      label: '数量',
      width: 125,
      fixed: true,
    },
  ];
  const tableColumnList = ref<
    {
      prop: string;
      label: string;
      slotName?: string;
      canEdit?: boolean;
      width?: number;
      fixed?: boolean;
    }[]
  >(initTableColumnList);
  const tableColumnListArray = ref<(typeof tableColumnList.value)[]>([]);

  const props = withDefaults(
    defineProps<{
      orderList: NewSourceOrderBeanType[] | null | undefined;
      needBoxNumber?: boolean;
      canChangeBoxNumber?: boolean;
      loading?: boolean;
    }>(),
    {
      needBoxNumber: false,
      canChangeBoxNumber: true,
    }
  );
  const changeTableColumnList = (
    list: { prop: string; label: string; slotName?: string; canEdit?: boolean }[]
  ) => {
    tableColumnList.value = list;
  };
  const sureBoxNumber = (totalBox: number, canEdit: boolean, index: number) => {
    const arr: { prop: string; label: string; slotName?: string; canEdit?: boolean }[] = [];
    if (!totalBox) {
      ElMessage.error('请输入总箱数');
    } else {
      for (let i = 0; i < totalBox; i += 1) {
        arr.push({
          prop: `boxNumber${i + 1}-${index}`,
          label: `箱号${i + 1}`,
          slotName: `boxNumber${i + 1}`,
          canEdit,
        });
      }
      tableColumnListArray.value[index] = [...initTableColumnList, ...arr] as any;
    }
  };
  const autoFillLoading = ref(false);
  const autoFill = async (item: any, index: number) => {
    autoFillLoading.value = true;
    // index表示第几张箱。value表示第几张箱的装的sku
    const cache: string[][] = new Array(item.totalBox).fill(0).map(() => []);
    // 毛重列
    let weightColumn;
    // 长
    let longColumn;
    // 宽
    let widthColumn;
    // 高
    let heightColumn;
    item.skuDescList.forEach((r) => {
      if (r.isExtraData) {
        switch (true) {
          case r.qty.includes('毛重'):
            weightColumn = r;
            break;
          case r.qty.includes('长'):
            longColumn = r;
            break;
          case r.qty.includes('宽'):
            widthColumn = r;
            break;
          case r.qty.includes('高'):
            heightColumn = r;
            break;
          default:
            break;
        }
        return;
      }
      // 获取当前Sku的箱号
      const { sku } = r;
      cache.forEach((c, idx) => {
        const count = r[`boxNumber${idx + 1}-${index}`] || 0;
        if (count) {
          c.push(sku);
        }
      });
    });
    const skuList = cache.reduce((prev, current) => {
      if (current.length === 1) {
        return [...prev, current[0]];
      }
      return prev;
    }, []);
    if (skuList.length) {
      const res = await (
        erpApi.luteosErpPackageQueryProductProperties({
          productList: skuList,
        }) as unknown as Promise<ProductConfigPropertyResp>
      ).finally(() => {
        autoFillLoading.value = false;
      });
      const { logisticsConfigMap = {} } = res;
      cache.forEach((c, idx) => {
        if (c.length === 1) {
          // 自动填充数据
          const sku = c[0];
          const data = logisticsConfigMap[sku] || {};
          const boxKey = `boxNumber${idx + 1}-${index}`;
          // 毛重
          weightColumn[boxKey] = data.unitContainerWeight ?? 0;
          // 长
          longColumn[boxKey] = data.unitContainerLong ?? 0;
          // 宽
          widthColumn[boxKey] = data.unitContainerWidth ?? 0;
          // 高
          heightColumn[boxKey] = data.unitContainerHeight ?? 0;
        }
      });
    } else {
      autoFillLoading.value = false;
      ElMessage.error('不存在单独装箱的sku，无法自动填充');
    }
  };
  defineExpose({
    changeTableColumnList,
    tableColumnList,
    sureBoxNumber,
    tableColumnListArray,
    initTableColumnList,
  });
</script>

<style scoped lang="scss">
  .online-packing-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .order-table {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .table-row-dashed {
    :deep(.el-input) {
      width: 80px;
    }
  }
  .boxNumber {
    color: red;
    .boxNumberTip {
      position: relative;
      &::before {
        position: absolute;
        content: '*';
        color: red;
        font-size: 12px;
        top: -2px;
        left: -6px;
      }
    }
  }
</style>
