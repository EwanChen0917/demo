<template>
  <el-form ref="formRef" :model="tableData" :label-width="0" hide-required-asterisk>
    <vxe-table
      ref="refTable"
      :data="tableData"
      style="min-width: 1000px"
      show-overflow
      show-header-overflow
      show-footer-overflow
      v-loading="loading"
      height="600"
      :column-config="{ resizable: true }"
      :scroll-y="{ enabled: true, gt: 0 }"
      :scroll-x="{ enabled: true, gt: 0 }"
    >
      <vxe-column
        v-for="v in tableColumnList"
        :key="v.prop"
        :title="v.label"
        :width="v.width || '80px'"
        :fixed="v.fixed ? 'left' : ''"
      >
        <template v-if="v.prop === 'index'" #default="{ $rowIndex, row }">
          <span v-if="!row.isExtraData">{{ $rowIndex + 1 }}</span>
        </template>
        <template v-else-if="v.prop!.startsWith('boxNumber')" #default="{ row, $rowIndex }">
          <el-form-item
            v-if="row.canEdit && status === 'edit'"
            :prop="`${$rowIndex}.${v.prop}`"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <el-input-number
              v-model="row[v.prop!]"
              @input="changePalletNumber(v.prop, $event)"
              :min="1"
              :precision="0"
              :controls="false"
              placeholder="请输入"
              :max="9999"
            />
          </el-form-item>
          <span v-else>{{ row[v.prop] }}</span>
        </template>
        <template v-else #default="{ row }">{{ row[v.prop] }}</template>
      </vxe-column>
    </vxe-table>

    <!--    <el-table ref="refTable" class-name="table-row-dashed" :data="tableData">
      <el-table-column
        v-for="v in tableColumnList"
        :key="v.prop"
        :label="v.label"
        :width="v.width || 'auto'"
        :fixed="v.fixed ? true : false"
      >
        <template v-if="v.prop === 'index'" #default="{ $index, row }">
          <span v-if="!row.isExtraData">{{ $index + 1 }}</span>
        </template>
        <template v-else-if="v.prop!.startsWith('boxNumber')" #default="{ row, $index }">
          <el-form-item
            v-if="row.canEdit && status === 'edit'"
            :prop="`${$index}.${v.prop}`"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <el-input-number
              v-model="row[v.prop!]"
              @input="changePalletNumber(v.prop, $event)"
              :min="1"
              :precision="0"
              :controls="false"
              placeholder="请输入"
              :max="9999"
            />
          </el-form-item>
          <span v-else>{{ row[v.prop!] }}</span>
        </template>
        <template v-else #default="{ row }">{{ row[v.prop!] }}</template>
      </el-table-column>
    </el-table>-->
  </el-form>
</template>

<script lang="ts" setup>
  import type { BoxDescItem, PackageOrderInfo } from '@/api/erp/data-contracts';
  import { ElTable, FormInstance, type TableInstance } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      order: PackageOrderInfo;
      totalBox: number;
      packageType?: 1 | 2; //  1-单独装箱 2-合并装箱
      status: 'view' | 'edit';
      loading?: boolean;
    }>(),
    {
      packageType: 2,
      status: 'edit',
    }
  );
  // 单独装箱
  const separatePackColumns = [
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
  // 合并装箱
  const combinePackColumns = [
    {
      prop: 'index',
      label: '序号',
      slotName: 'index',
      width: 50,
      fixed: true,
    },
    {
      prop: 'referenceCode',
      label: '参考号(po号)',
      width: 145,
      fixed: true,
    },
    {
      prop: 'orderCode',
      label: '订单号（参考号）',
      width: 147,
      fixed: true,
    },
    {
      prop: 'customerName',
      label: '客户名称',
      width: 133,
      fixed: true,
    },
    {
      prop: 'productName',
      label: '产品名称',
      width: 166,
      fixed: true,
    },
    {
      prop: 'sku',
      label: 'sku',
      width: 146,
      fixed: true,
    },
    {
      prop: 'qty',
      label: '数量',
      width: 102,
      fixed: true,
    },
  ];
  const initTableColumnList = props.packageType === 2 ? combinePackColumns : separatePackColumns;
  interface TableColumn {
    prop?: string;
    label?: string;
    slotName?: string;
    canEdit?: boolean;
    width?: number;
    fixed?: boolean;
    [key: string]: any;
  }
  const tableColumnList = ref<TableColumn[]>(initTableColumnList);
  const refTable = ref<TableInstance>();
  (function init() {
    // 初始化箱号列
    const boxColumns = generateBoxColumns(props.totalBox);
    tableColumnList.value = [...initTableColumnList, ...boxColumns];
  })();

  function generateBoxColumns(totalBox: number): TableColumn[] {
    return new Array(totalBox).fill(0).map((_, i) => ({
      prop: `boxNumber${i + 1}`,
      label: `箱号${i + 1}`,
      canEdit: false,
      width: 80,
      fixed: false,
    }));
  }

  // 数据映射
  const tableData = ref<TableColumn[]>([]);
  watchEffect(() => {
    tableData.value = normalizeOrderList(props.order);
  });
  function normalizeOrderList(order: PackageOrderInfo): TableColumn[] {
    // sku数据
    const skuData = order.itemList?.map((item) => {
      const boxItemList = item.boxItemList || [];
      const boxColumns2Data = boxItemList.reduce(
        (acc: Record<string, any>, boxItem: BoxDescItem, i: number) => {
          acc[`boxNumber${i + 1}`] = boxItem.boxPackageQty;
          return acc;
        },
        {} as Record<string, any>
      );
      return {
        ...item,
        ...boxColumns2Data,
      };
    });
    // 箱子额外信息
    const weightColumns = order.boxWeightList?.reduce(
      (acc: Record<string, any>, item) => ({
        ...acc,
        [`boxNumber${item.boxNumber}`]: item.grossWeight,
      }),
      {
        qty: '毛重(Kg)',
        isExtraData: true,
      }
    );
    const longColumns = order.boxLengthList?.reduce(
      (acc: Record<string, any>, item) => ({
        ...acc,
        [`boxNumber${item.boxNumber}`]: item.length,
      }),
      {
        qty: '长(cm)',
        isExtraData: true,
      }
    );
    const widthColumns = order.boxWidthList?.reduce(
      (acc: Record<string, any>, item) => ({
        ...acc,
        [`boxNumber${item.boxNumber}`]: item.width,
      }),
      {
        qty: '宽(cm)',
        isExtraData: true,
      }
    );
    const heightColumns = order.boxHeightList?.reduce(
      (acc: Record<string, any>, item) => ({
        ...acc,
        [`boxNumber${item.boxNumber}`]: item.height,
      }),
      {
        qty: '高(cm)',
        isExtraData: true,
      }
    );
    if (!order.palletNumberList?.length) {
      order.palletNumberList = [{}];
    }
    const palletColumns = order.palletNumberList.reduce(
      (acc: Record<string, any>, item, index) => ({
        ...acc,
        [`boxNumber${item.boxNumber || index + 1}`]: item.palletNumber,
      }),
      {
        qty: '托盘',
        isExtraData: true,
        canEdit: true,
      }
    );
    // 合并数据
    return [
      ...(skuData || []),
      weightColumns || {},
      longColumns || {},
      widthColumns || {},
      heightColumns || {},
      palletColumns,
    ];
  }
  const getTableData = () => ({
    totalBoxNumber: props.totalBox,
    orderData: tableData.value,
  });
  /**
   * 表单校验
   */
  const formRef = ref<FormInstance>();
  const validate = async () => {
    return (await formRef.value?.validate()) ?? false;
  };
  /**
   * @description: 修改托盘号
   */
  const changePalletNumber = (key: string, value: number) => {
    if (!key.startsWith('boxNumber')) {
      return;
    }
    // 1. 获取箱号
    const boxNumber = Number(key.replace('boxNumber', ''));
    if (!boxNumber) {
      return;
    }
    props.order.palletNumberList![boxNumber - 1] = {
      boxNumber,
      palletNumber: value,
    };
  };
  defineExpose({
    getTableData,
    validate,
  });
</script>

<style scoped lang="scss">
  .table-row-dashed {
    :deep(.el-input) {
      width: 80px;
    }
  }
</style>
