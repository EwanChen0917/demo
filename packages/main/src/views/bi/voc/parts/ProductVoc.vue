<template>
  <BiCard v-bind="$attrs" title="商品评分和评论" v-loading="loading">
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
            <span class="btn-view" v-if="row.dimension === 'spuName'" @click="viewStarLevel(row)">
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
              <span class="link">查看详情 ></span>
            </span>
            <span v-else>
              {{ row[column.field] }}
            </span>
          </template>
          <template #trend="{ row, column }">
            <div class="trend-chart-wrapper">
              <TrendChart color="#02B96B" :data="row.trend" label="评分数" />
            </div>
          </template>
          <template #number="{ row, column }">
            {{ formatNumberObj(row[column.field]) }}
          </template>
          <template #rate="{ row, column }">
            {{ formatRate(row[column.field], { maximumFractionDigits: 2 }) }}
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
  <StarLevel ref="starLevelDialog" />
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { VxeColumnProps } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';
  import TrendChart from '@/views/bi/components/trendEcharts.vue';
  import BiCard from '../../components/BiCard.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';
  import StarLevel from '../components/StarLevel.vue';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const searchParams = inject<BiContracts.CommonAnalysisReq>('searchParams')!;
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
  let startDate = '';
  let endDate = '';
  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    const res = await biApi
      .biVocProductRating({
        ...searchParams,
        pageNum: curPage.value,
        pageSize: pageSize.value,
        ...sortState,
      })
      .finally(() => {
        loading.value = false;
      });
    const rows =
      res?.productList?.map((item, index) => {
        return {
          ...item,
          name: item[drillDownPath.value[0]],
          dimension: drillDownPath.value[0],
          dimensionValue: item[drillDownPath.value[0]] ?? '',
          dimensionList: [
            {
              dimension: drillDownPath.value[0],
              dimensionValue: item[drillDownPath.value[0]] ?? '',
            },
          ],
          trend:
            item.vocRateTrendTimeList?.map((trendItem, idx: number) => ({
              month: trendItem,
              value: item.vocRateTrendData?.[idx],
            })) || [],
          id: index,
          // level: 1,
          parentId: null,
          hasChild: item[drillDownPath.value[0]] !== '合计',
          children: [],
        };
      }) || [];
    dataList.value = rows;
    paginationData.total = res?.total || 0;
    startDate = res?.startDate || '';
    endDate = res?.endDate || '';
    paginationData.pages = Math.ceil(res.total / pageSize.value);
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
    return ['categoryLevel3Name', 'spuName'];
  });
  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biVocProductRating({
      ...searchParams,
      level: row.dimensionList.length + 1,
      categoryLevel3Name: row.categoryLevel3Name,
      pageNum: 1,
      pageSize: 100,
      ...sortState,
    });
    if (res) {
      return (
        res.productList.map((item, idx) => {
          const id = `${row.id}-${idx}`;
          return {
            ...item,
            id,
            dimensionList: [
              ...row.dimensionList,
              {
                dimension: drillDownPath.value[row.dimensionList.length],
                dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
              },
            ],
            trend:
              item.vocRateTrendTimeList?.map((trendItem, index: number) => ({
                month: trendItem,
                value: item.vocRateTrendData?.[index],
              })) || [],
            dimension: drillDownPath.value[row.dimensionList.length],
            dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
            name: item[drillDownPath.value[row.dimensionList.length]],
            parentId: row.id,
            hasChild: false,
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
        return new Promise<any[]>((resolve) => {
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
      title: '三级类目 / SPU名称',
      minWidth: 225,
      fixed: 'left' as const,
      treeNode: true,
      slots: {
        default: 'name',
      },
    },
    {
      field: 'voc',
      title: `近6${searchParams.periodType === 'week' ? '周' : '月'}星级评分趋势`,
      minWidth: 100,
      align: 'right' as const,
      slots: {
        default: 'trend',
      },
    },
    {
      field: 'reviewCount',
      title: '累计评论数',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'number',
      },
    },
    {
      field: 'newReviewCount',
      title: '新增评论数',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'number',
      },
    },
    {
      field: 'starRating',
      title: '星级评分',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'number',
      },
    },
    {
      field: 'starRatingWeekOverWeekDiff',
      title: `星级评分${searchParams.periodType === 'week' ? '周' : '月'}环比`,
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'rate',
      },
    },
    {
      field: 'positiveReviewRate',
      title: '好评率',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'rate',
      },
    },
    {
      field: 'negativeReviewRate',
      title: '中差评率',
      minWidth: 86,
      align: 'right' as const,
      sortable: true,
      slots: {
        default: 'rate',
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

  const starLevelDialog = useTemplateRef<InstanceType<typeof StarLevel>>('starLevelDialog');
  const viewStarLevel = (row) => {
    // TODO 下钻详情
    starLevelDialog.value!.open({
      spuName: row.spuName,
      spuCode: row.spuCode,
      level: 2,
      categoryLevel3Name: row.categoryLevel3Name,
      startDate,
      endDate,
    });
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
  .trend-chart-wrapper {
    width: 100%;
    height: 40px;
  }
  .hover-underline {
    margin-left: 12px;
    &:hover {
      border-bottom: 1px dashed var(---N5, #c5c5c5);
      line-height: 20px;
      cursor: pointer;
    }
  }
  .btn-view {
    display: flex;
    gap: 4px;
    cursor: pointer;
    :deep(.content) {
      width: 145px;
      color: var(---N9, #1f1f1f);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-all;
      -webkit-line-clamp: 1;
    }
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: var(---N9, #1f1f1f);
    }
    .link {
      flex: none;
      color: var(---N9, #1f1f1f);
      &:hover {
        color: var(---P6, #02b96b);
      }
    }
  }
  .pagination {
    margin-top: 16px;
    justify-content: end;
  }
</style>
