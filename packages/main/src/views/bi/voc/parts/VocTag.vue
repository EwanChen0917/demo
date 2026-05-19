<template>
  <BiCard title="VOC品类分析" v-loading="loading">
    <div class="secondary-tag-analysis">
      <div class="table-container">
        <vxe-grid
          ref="gridRef"
          v-bind="gridOptions"
          :columns="columns"
          :sort-config="{
            remote: true,
          }"
          :data="dataList"
          :round="true"
          @sort-change="handleChangeSort"
        >
          <template #name="{ row, column }">
            <span>
              {{ row[column.field] }}
            </span>
          </template>
          <template #trend="{ row, column }">
            <div class="trend-chart-wrapper">
              <TrendChart color="#02B96B" :data="row.trend" label="voc率" isRate />
            </div>
          </template>
          <template #number="{ row, column }">
            {{ formatNumberObj(row[column.field]) }}
          </template>
          <template #rate="{ row, column }">
            {{ formatRate(row[column.field], { maximumFractionDigits: 2 }) }}
          </template>
          <template #operations="{ row, column }">
            <span class="btn-skip" @click="handleSkipDetail(row)">下钻详情</span>
          </template>
        </vxe-grid>
        <el-pagination
          class="pagination"
          simple
          :current-page="curPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, prev, jumper, slot, next, sizes"
          :total="paginationData.total"
          @update:current-page="handleCurrentChange"
          @update:page-size="handleSizeChange"
        >
          /{{ paginationData.pages }}
        </el-pagination>
      </div>
    </div>
  </BiCard>
</template>

<script setup lang="ts">
  import { VxeColumnProps } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';
  import TrendChart from '@/views/bi/components/trendEcharts.vue';

  import BiCard from '../../components/BiCard.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const emit = defineEmits<{
    skipParticulars: [
      payload: {
        categoryNameLevel3List: string[];
        level: number;
        vocLevel1List?: string[];
        vocLevel2List?: string[];
      }
    ];
  }>();
  const searchParams = inject<BiContracts.BaseVocQueryReq>('searchParams')!;
  const dataList = ref<any>([]);

  const curPage = ref(1);
  const pageSize = ref(10);
  const paginationData = reactive({
    total: 0,
    pages: 0,
  });
  const sortState = {
    orderByColumn: '',
    orderDirection: '',
  };
  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    const res = await biApi
      .biVocTagList({
        ...searchParams,
        pageNum: curPage.value,
        pageSize: pageSize.value,
        ...sortState,
      })
      .finally(() => {
        loading.value = false;
      });
    const rows =
      res?.tagList?.map((item, index) => {
        return {
          name: item[drillDownPath.value[0]],
          categoryLevel3Name: item.categoryLevel3Name,
          salesQty: item.salesQty,
          vocCount: item.vocCount,
          vocRate: item.vocRate,
          vocRateWeekOverWeekDiff: item.vocRateWeekOverWeekDiff,
          vocCountGroupProportion: item.vocCountGroupProportion,
          dimension: drillDownPath.value[0],
          trend:
            item.vocRateTrendTimeList?.map((value: number, idx: number) => ({
              month: value,
              value: item.vocRateTrendData?.[idx],
            })) || [],
          id: String(index),
          level: 0,
          parentId: null,
          hasChild: true,
          children: [],
        };
      }) || [];
    paginationData.total = res?.total || 0;
    paginationData.pages = Math.ceil(res.total / pageSize.value);
    dataList.value = rows;
  };
  defineExpose({ initData });
  watch(searchParams, () => {
    initData();
  });
  const handleCurrentChange = (page: number) => {
    curPage.value = page;
    initData();
  };
  const handleSizeChange = (size: number) => {
    pageSize.value = size;
    curPage.value = 1;
    initData();
  };
  const drillDownPath = computed(() => {
    // 品类维度
    return ['categoryLevel3Name', 'vocLevel1', 'vocLevel2'];
  });
  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biVocTagList({
      ...searchParams,
      level: row.level + 2,
      categoryLevel3Name: row.categoryLevel3Name,
      vocLevel1: row.vocLevel1,
      pageNum: 1,
      pageSize: 100,
      ...sortState,
    });
    if (res) {
      return (
        res.tagList.map((item, idx) => {
          const id = `${row.id}-${idx}`;
          return {
            id,
            level: row.level + 1,
            trend:
              item.vocRateTrendTimeList?.map((value: number, index: number) => ({
                month: value,
                value: item.vocRateTrendData?.[index],
              })) || [],
            dimension: drillDownPath.value[row.level + 1],
            name: item[drillDownPath.value[row.level + 1]],
            categoryLevel3Name: item.categoryLevel3Name,
            vocLevel1: item.vocLevel1,
            vocLevel2: item.vocLevel2,
            salesQty: item.salesQty,
            vocCount: item.vocCount,
            vocRate: item.vocRate,
            vocRateWeekOverWeekDiff: item.vocRateWeekOverWeekDiff,
            vocCountGroupProportion: item.vocCountGroupProportion,
            parentId: row.id,
            hasChild: row.level + 2 < drillDownPath.value.length,
            children: [],
          };
        }) || []
      );
    }
    return [];
  };
  const gridOptions = {
    border: false,
    showOverflow: true,
    size: 'small' as const,
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
      title: '三级类目 / 标签一级分类 / 标签二级分类',
      minWidth: 225,
      fixed: 'left' as const,
      treeNode: true,
      slots: {
        default: 'name',
      },
    },
    {
      field: 'voc',
      title: `近6${searchParams.periodType === 'week' ? '周' : '月'}VOC率趋势`,
      minWidth: 100,
      align: 'right' as const,
      slots: {
        default: 'trend',
      },
    },
    {
      field: 'salesQty',
      title: '销量',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'number',
      },
    },
    {
      field: 'vocCount',
      title: 'VOC量',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'number',
      },
    },
    {
      field: 'vocRate',
      title: 'VOC率',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'rate',
      },
    },
    {
      field: 'vocRateWeekOverWeekDiff',
      title: `VOC率${searchParams.periodType === 'week' ? '周' : '月'}环比差值`,
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'rate',
      },
    },
    {
      field: 'vocCountGroupProportion',
      title: 'VOC量组内占比',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'rate',
      },
    },
    {
      field: 'operations',
      title: '操作',
      minWidth: 86,
      align: 'right' as const,
      slots: {
        default: 'operations',
      },
    },
  ]);

  const handleChangeSort = (params) => {
    const { field, order } = params;
    if (order === null) {
      sortState.orderByColumn = '';
      sortState.orderDirection = '';
    } else {
      sortState.orderByColumn = field;
      sortState.orderDirection = order;
    }
    initData();
  };
  const handleSkipDetail = async (row) => {
    const { level } = row;
    if (level === 0) {
      emit('skipParticulars', {
        categoryNameLevel3List: [row.categoryLevel3Name],
        level,
      });
    } else {
      emit('skipParticulars', {
        level: level - 1,
        categoryNameLevel3List: [row.categoryLevel3Name],
        vocLevel1List: [row.vocLevel1],
        vocLevel2List: level === 2 ? [row.vocLevel2] : undefined,
      });
    }
  };
</script>

<style lang="scss" scoped>
  .secondary-tag-analysis {
    display: flex;
    column-gap: 30px;
    .table-container {
      width: 0;
      flex: 2.2;
      :deep(.total-row),
      :deep(.leaf-row) {
        background-color: var(---N1, #f7f7f7);
      }
    }
  }
  .hover-underline {
    margin-left: 12px;
    &:hover {
      border-bottom: 1px dashed var(---N5, #c5c5c5);
      line-height: 20px;
      cursor: pointer;
    }
  }
  .trend-chart-wrapper {
    width: 100%;
    height: 40px;
  }
  .btn-skip {
    color: var(---P6, #02b96b);
    text-align: right;

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .pagination {
    margin-top: 16px;
    justify-content: end;
  }
</style>
