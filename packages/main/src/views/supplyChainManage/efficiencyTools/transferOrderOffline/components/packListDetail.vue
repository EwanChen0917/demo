<template>
  <div>
    <vxe-table
      ref="productTable"
      :data="displayData"
      border
      max-height="600"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
    >
      <!-- 商品基础信息列 -->
      <vxe-column type="seq" width="60" fixed="left" title="序号" align="center">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row._index + 1 }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column field="productImageUrl" title="图片" width="80" fixed="left">
        <template #default="{ row }">
          <el-image
            v-if="row.productImageUrl && row._rowType !== 'fake'"
            :src="row.productImageUrl"
            style="width: 50px; height: 50px"
            fit="cover"
          />
          <span v-else></span>
        </template>
      </vxe-column>

      <!-- 其他基础列 -->
      <vxe-column field="productName" title="产品名称/产品SKU" min-width="150">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row.productName }} / {{ row.skuCode }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column field="supplySku" title="供应链SKU" min-width="150">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row.supplySku }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column field="productTypeDesc" title="产品类型" min-width="150">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row.productTypeDesc }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column field="declareNameEn" title="英文报关名" min-width="120">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row.declareNameEn }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column field="quantity" title="调拨数量" min-width="100">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row.quantity }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column title="总体积m³" min-width="120">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">
            {{ getRowVolume(row) }}
          </span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column title="总体积重kg" min-width="120">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">
            {{ getRowVolumeWeight(row) }}
          </span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column title="总实物重kg" min-width="120">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">
            {{ ((row.productWeight || 0) * (row.quantity || 0)).toFixed(2) }}
          </span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column field="cartonWeight" title="单箱重量kg" min-width="120">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ row.cartonWeight || 0 }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column title="外箱尺寸cm" min-width="150">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">
            {{ row.cartonLength || '-' }} ×{{ row.cartonWidth || '-' }} ×{{
              row.cartonHeight || '-'
            }}
          </span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column title="箱数" min-width="100">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">{{ getTotalBoxCount(row) }}</span>
          <span v-else></span>
        </template>
      </vxe-column>

      <vxe-column title="已装箱数量" min-width="120">
        <template #default="{ row }">
          <span v-if="row._rowType !== 'fake'">
            {{ getPackedQuantity(row) }}
          </span>
          <template v-if="row._rowType === 'fake'">
            <span v-if="row._rowIndex === 'weight'">重量 (kg) ：</span>
            <span v-else-if="row._rowIndex === 'size'">尺寸 (cm) ：</span>
          </template>
        </template>
      </vxe-column>

      <!-- 动态箱子列 - 支持虚拟滚动 -->
      <vxe-column
        v-for="column in boxColumns"
        :key="column.boxNo"
        :title="column.label"
        align="center"
        width="120"
      >
        <template #default="{ row }">
          <!-- 虚假行：显示箱子的重量或尺寸 -->
          <template v-if="row._rowType === 'fake'">
            <span v-if="row._rowIndex === 'weight'">{{ column.weight }}</span>
            <span v-else-if="row._rowIndex === 'size'">
              {{ column.length }}×{{ column.width }}×{{ column.height }}
            </span>
          </template>

          <!-- 正常数据行：显示商品数量 -->
          <template v-else>
            <div v-if="column.products[row.supplySku]">
              {{ column.products[row.supplySku] }}
            </div>
            <span v-else>0</span>
          </template>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
  import { BoxColumnConfig, boxOptions, unBoxProduct } from '../type';

  const props = defineProps<{
    data: unBoxProduct[];
    type: 'single' | 'mix' | 'all';
    volumeWeightCoefficient: number;
    showData: boxOptions[];
    isDetail: boolean;
  }>();

  /**
   * 显示用的数据（包含虚假行）- 优化版本，不展开对象
   */
  const displayData = computed(() => {
    if (!props.data?.length) return [];

    // 为原始数据添加索引和标记（不展开对象，避免性能问题）
    const dataRows = props.data.map((row, index) => ({
      ...row,
      _rowType: 'data',
      _index: index,
    }));

    // 添加两个虚假行
    const fakeRows = [
      { _rowType: 'fake', _rowIndex: 'weight', ...props.data[0] },
      { _rowType: 'fake', _rowIndex: 'size', ...props.data[0] },
    ];

    return [...dataRows, ...fakeRows];
  });

  /**
   * 生成箱子列配置（根据不同模式）- 移除 cloneDeep 优化性能
   */
  const boxColumns = computed<BoxColumnConfig[]>(() => {
    if (!props.showData?.length) return [];
    const result = generateBoxColumnWithoutType(props.showData);
    return result;
  });

  /**
   * 预计算每行的统计数据 - 优化性能，避免在模板中重复计算
   */

  /**
   * 计算单行体积 - 提取到方法中，避免模板中重复计算
   */
  const getRowVolume = (row: any): string => {
    const volume =
      (row.productLength * row.productWidth * row.productHeight * row.quantity) / 1000000;
    return volume.toFixed(4);
  };
  const getTotalBoxCount = (row: any): number => {
    if (row._rowType === 'fake') return 0;
    return (
      row.cartonList?.reduce((sum: number, carton: any) => {
        return sum + (carton.perProductBoxCount || 1);
      }, 0) || 0
    );
  };

  /**
   * 计算已装箱数量
   */
  const getPackedQuantity = (row: any): number => {
    if (row._rowType === 'fake') return 0;
    return (
      row.cartonList?.reduce((sum: number, carton: any) => {
        return sum + (carton.boxNum || 0) * (carton.perProductBoxCount || 1);
      }, 0) || 0
    );
  };
  /**
   * 计算单行体积重 - 提取到方法中
   */
  const getRowVolumeWeight = (row: any): string => {
    const volume =
      (row.productLength * row.productWidth * row.productHeight * row.quantity) / 1000000;
    const volumeWeight = volume / props.volumeWeightCoefficient;
    return volumeWeight.toFixed(4);
  };
  /**
   * 新增，不依赖传入的装箱模式来自动去重和归类
   * 直接使用拼装好的submitdata作回显。方便简单快捷。节约性能
   */
  const generateBoxColumnWithoutType = (data: boxOptions[]): BoxColumnConfig[] => {
    if (!data.length) return [];
    const isBoxNoFormed = data.some((e) => isNaN(Number(e.boxNo)));
    const boxMap = new Map<
      string,
      {
        length: number;
        weight: number;
        height: number;
        width: number;
        perProductBoxCount: number;
        products: Record<string, number>;
      }
    >();
    data.forEach((e) => {
      const supplySku = e.supplySku || '';
      const boxNo = String(e.boxNo || 0);
      if (!boxMap.has(boxNo)) {
        boxMap.set(boxNo, {
          weight: e.roughWeight || 0,
          length: e.length || 0,
          width: e.wide || 0,
          height: e.high || e.high || 0,
          perProductBoxCount: e.perProductBoxCount || 1,
          products: {},
        });
      }
      const box = boxMap.get(boxNo);
      if (!box) return;
      box.products[supplySku] =
        (toNumber(box.products[supplySku]) ?? 0) + (toNumber(e.boxNum) ?? 0);
    });
    return Array.from(boxMap.entries())
      .sort((a, b) => {
        if (isBoxNoFormed || props.isDetail) {
          // 已成型箱号或详情态：按字符串排序
          return String(a[0]).localeCompare(String(b[0]));
        }
        const numA = Number(a[0]);
        const numB = Number(b[0]);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
      })
      .map(([boxNo, config]) => {
        return {
          boxNo: isBoxNoFormed || props.isDetail ? boxNo : +boxNo,
          label: `箱子${boxNo}`,
          ...config,
        };
      });
  };
  /**
   * 安全转换值为数字，包含infinty和NaN
   * @param val
   */
  const toNumber = (val: any): number => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  };
</script>

<style scoped lang="scss"></style>
