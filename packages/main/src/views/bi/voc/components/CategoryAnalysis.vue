<template>
  <div class="header-section">
    <span class="title">品线分析</span>
    <el-radio-group v-model="type">
      <el-radio-button v-for="t in typeOptions" :key="t!.id" :value="t!.value">
        {{ t!.label }}
      </el-radio-button>
    </el-radio-group>
  </div>
  <div class="table-container">
    <vxe-grid
      ref="gridRef"
      v-bind="gridOptions"
      :columns="columns"
      :data="dataList"
      @cell-click="handleCellClick"
    >
      <template #name="{ row, column }">
        <div>
          <span class="btn-view" v-if="row.dimension === 'spuName'">
            <el-tooltip
              :disabled="row[column.field].length < 12"
              :content="row[column.field]"
              placement="top"
              popper-class="mw-700px"
            >
              <div class="content">
                {{ row[column.field] }}
              </div>
            </el-tooltip>
          </span>
          <span v-else>
            {{ row[column.field] }}
          </span>
        </div>
      </template>
      <template #trend="{ row, column }">
        <div class="trend-chart-wrapper">
          <TrendThumbnail color="#02B96B" :data="row.trend" :label="currentType.label" />
        </div>
      </template>
      <template #number="{ row, column }">
        {{ formatNumberObj(row[column.field]) }}
      </template>
      <template #rate="{ row, column }">
        {{ formatRate(row[column.field], { maximumFractionDigits: 2 }) }}
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
  import { biApi, type BiContracts } from '@/api';
  import TrendThumbnail from '@/views/bi/components/trendEcharts.vue';
  import { VxeColumnProps, VxeTableComponent } from 'vxe-table';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  defineOptions({
    name: 'CategoryAnalysis',
  });
  const props = defineProps<{
    data: BiContracts.ProductManagerLevelTrendVO;
  }>();
  const emit = defineEmits<{
    (e: 'update:spu', params: { productLineList?: string[]; spuNameList?: string[] }): void;
  }>();
  const type = ref<'vocCount' | 'vocProp' | 'yearCumulativeVocRate'>('vocCount');
  const dataList = ref<any>([]);
  const initData = (
    originData: BiContracts.ProductManagerLevelTrendVO,
    dimension = 'productLine',
    initDimension = {
      parentId: null,
      level: 0,
      hasChild: true,
      children: [],
    }
  ) => {
    return (
      originData.rows?.map((item) => {
        return Object.keys(item).reduce(
          (acc, key) => {
            const v = item[key];
            if (key === dimension) {
              acc.id = v;
              acc.name = v;
              acc.trend = originData.columns?.map((period, index: number) => ({
                month: period,
                value: item[period][type.value],
              }));
            } else if (typeof v === 'object' && v !== null) {
              acc[key] = v[type.value];
            } else {
              acc[key] = v;
            }
            return acc;
          },
          { ...initDimension }
        );
      }) || []
    );
  };
  watch(
    () => type.value,
    () => {
      dataList.value = initData(props.data);
    }
  );
  watch(
    () => props.data,
    () => {
      type.value = type.value !== 'vocCount' ? 'vocCount' : type.value;
      dataList.value = initData(props.data);
    }
  );
  const searchParams = inject<BiContracts.BaseVocQueryReq>('searchParams')!;

  const typeOptions = computed(() =>
    [
      { label: 'VOC量', value: 'vocCount', id: '1' },
      { label: 'VOC率', value: 'vocProp', id: '2' },
      searchParams.periodType === 'month'
        ? { label: '年累计VOC率', value: 'cumulativeVocProp', id: '3' }
        : null,
    ].filter(Boolean)
  );
  const currentType = computed(() => {
    return typeOptions.value.find((t) => t.value === type.value)!;
  });

  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biVocQueryProductLine({
      ...searchParams,
      metricType: currentType.value.id,
      productLine: row.name,
    });
    if (res) {
      const data = initData(res.productLineTrend, 'spuName', {
        parentId: row.id,
        hasChild: false,
        level: row.level + 1,
        children: null,
      });
      return data;
    }
    return [];
  };

  const gridOptions = {
    border: false,
    showOverflow: true,
    round: true,
    size: 'small' as const,
    rowConfig: {
      isCurrent: true,
    },
    rowClassName: ({ row }) => {
      if (row.isTotal) {
        return 'total-row';
      }
      if (row.hasChild === false) {
        return 'leaf-row cursor-pointer';
      }
      return 'cursor-pointer';
    },
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'parentId',
      accordion: true,
      lazy: true,
      hasChild: 'hasChild',
      iconOpen: 'vxe-custom--square-plus vxe-custom--square-minus',
      iconClose: 'vxe-custom--square-plus',
      loadMethod({ row }) {
        // 异步加载子节点
        return new Promise((resolve) => {
          getDimensionAnalysis(row).then((res: any) => {
            resolve(res);
          });
        });
      },
    },
  };
  const columns: Ref<VxeColumnProps[]> = computed(() => [
    {
      field: 'name',
      title: '品线 / SPU',
      minWidth: 200,
      fixed: 'left' as const,
      treeNode: true,
      slots: {
        default: 'name',
      },
    },
    {
      field: 'trend',
      title: '近12期VOC趋势',
      minWidth: 112,
      align: 'right' as const,
      slots: {
        default: 'trend',
      },
    },
    ...(props.data.columns?.map((item) => {
      return {
        field: item,
        title: item,
        minWidth: 120,
        sortable: true,
        align: 'right' as const,
        slots: {
          default: type.value === 'vocCount' ? 'number' : 'rate',
        },
      };
    }) || []),
  ]);
  const currentSelectedName = ref('');
  const gridRef = ref<VxeTableComponent>();
  const handleCellClick = async ({ row, column }) => {
    if (column.field === 'name') {
      const productLine = row.level === 0 ? row.name : row.parentId;
      const spuName = row.level === 1 ? row.name : undefined;
      if (currentSelectedName.value === row.id) {
        currentSelectedName.value = '';
        gridRef.value?.clearCurrentRow();
        emit('update:spu', {
          productLineList: undefined,
          spuNameList: undefined,
        });
        return;
      }
      gridRef.value?.setCurrentRow(row);
      currentSelectedName.value = row.id;
      const params = {
        productLineList: [productLine],
        spuNameList: spuName ? [spuName] : undefined,
      };
      emit('update:spu', params);
    } else {
      gridRef.value?.clearCurrentRow();
    }
  };
</script>

<style lang="scss" scoped>
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    margin-bottom: 20px;
    .el-radio-group {
      :deep(.el-radio-button) {
        &:first-child .el-radio-button__inner {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &:last-child .el-radio-button__inner {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
    :deep(.el-radio-button__inner) {
      border: 1px solid var(---N4, #e7e9e8);
      border-radius: 0;
    }
    .title {
      overflow: hidden;
      color: var(---N9, #262626);
      text-overflow: ellipsis;

      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
  }
  .table-container {
    :deep(.total-row),
    :deep(.leaf-row) {
      background-color: var(---N1, #f7f7f7);
    }
  }
  .trend-chart-wrapper {
    width: 100%;
    height: 40px;
  }
</style>
