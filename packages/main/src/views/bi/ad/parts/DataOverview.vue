<template>
  <BiCard title="数据概览">
    <template #actions>
      <div class="operation">
        <ConfigColumns
          ref="selectPropertyRef"
          title="自定义列"
          :width="748"
          bindClass="custom-col"
          moduleType="list"
          :property-list-prop="[propertyList]"
          @success="configColumns"
        />
        <el-radio-group v-model="type" @change="changeType">
          <el-radio-button value="country">国家</el-radio-button>
          <el-radio-button value="category">品类</el-radio-button>
          <el-radio-button value="adCampaign">广告活动</el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <div class="table-container" v-loading="loading">
      <vxe-grid
        ref="gridRef"
        v-bind="gridOptions"
        :columns="columns"
        :data="dataList"
        :round="true"
      >
        <template #number="{ row, column }">
          <span>{{ formatNumberObj(row[column.field]) }}</span>
        </template>
        <template #percent="{ row, column }">
          <span>{{ formatRate(row[column.field]) }}</span>
        </template>
      </vxe-grid>
    </div>
    <el-pagination
      class="pagination"
      simple
      :current-page="curPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, prev, jumper, slot, next, sizes"
      :total="data.total"
      @update:current-page="handleCurrentChange"
      @update:page-size="handleSizeChange"
    >
      /{{ data.pages }}
    </el-pagination>
  </BiCard>
</template>

<script setup lang="ts">
  import BiCard from '@/views/bi/components/BiCard.vue';
  import { biApi, type BiContracts } from '@/api';
  import type { VxeColumnProps } from 'vxe-table';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  // 标签自动布局、全局过渡动画等特性

  const props = defineProps<{
    countryDetailList?: BiContracts.AdDetailDO[];
    searchParams: BiContracts.CommonAnalysisReq;
  }>();
  const type = ref('country');
  const drillDownPath = computed(() => {
    if (type.value === 'country') {
      // 国家维度
      return ['countryName'];
    }
    if (type.value === 'adCampaign') {
      // 广告活动维度
      return ['campaignName'];
    }
    // 品类维度
    return ['category', 'category4', 'spuName'];
  });
  // 原始数据
  const data = ref<any>({
    data: null,
    pages: 1,
    total: 0,
  });
  // tableData
  const dataList = computed(() => {
    return (
      data.value.data?.map((item, index) => {
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
          id: index,
          // level: 1,
          parentId: null,
          hasChild: type.value === 'category',
          children: [],
        };
      }) || []
    );
  });

  const fetchCountryData = async () => {
    const res = await biApi.biAdQueryAdCountryPage({
      ...props.searchParams,
      pageNum: curPage.value,
      pageSize: pageSize.value,
    });
    data.value = {
      data: res.adCountryDetailList,
      pages: res.pages,
      total: res.total,
    };
  };
  const fetchCategoryData = async () => {
    const res = await biApi.biAdQueryAdCategoryPage({
      ...props.searchParams,
      pageNum: curPage.value,
      pageSize: pageSize.value,
    });
    data.value = {
      data: res.adCategoryDetailList,
      pages: res.pages,
      total: res.total,
    };
  };
  const fetchAdData = async () => {
    const res = await biApi.biAdQueryAdNamePage({
      ...props.searchParams,
      pageNum: curPage.value,
      pageSize: pageSize.value,
    });
    data.value = {
      data: res.adNameDetailList,
      pages: res.pages,
      total: res.total,
    };
  };
  const loading = ref(false);
  const curPage = ref(1);
  const pageSize = ref(10);

  const getDimensionAnalysis = async (row) => {
    const fetchList = [biApi.biAdQueryAdCategory4ByCategory, biApi.biAdQueryAdSpuByCategory4];
    const res: any = await fetchList[row.dimensionList.length - 1]({
      ...props.searchParams,
      [row.dimension]: row.dimensionValue,
    });
    if (res) {
      return (
        res.adCategoryDetailList.map((item, idx) => {
          const id = `${row.id}-${idx}`;
          let hasChild = true;
          const dimensionList = [
            ...(row.dimensionList || []),
            {
              dimension: drillDownPath.value[row.dimensionList.length],
              dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
            },
          ];
          if (dimensionList.length === drillDownPath.value.length) {
            hasChild = false;
          }
          return {
            ...item,
            id,
            dimension: drillDownPath.value[row.dimensionList.length],
            dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
            name: item[drillDownPath.value[row.dimensionList.length]],
            dimensionList,
            parentId: row.id,
            hasChild,
            children: [],
          };
        }) || []
      );
    }
    return [];
  };
  const propertyList = reactive<{
    title: string;
    propertyArr: Array<
      {
        key: string;
        label: string;
        checked: boolean;
        readonly?: boolean;
      } & VxeColumnProps & {
          slots?: {
            default: string;
          };
        }
    >;
  }>({
    title: '可选',
    propertyArr: [
      {
        key: 'name',
        label: '国家',
        fixed: 'left',
        minWidth: 130,
        sortable: true,
        treeNode: true,
        checked: true,
        readonly: true,
      },
      {
        key: 'cost',
        label: '广告花费',
        align: 'right',
        minWidth: 94,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'adSalesAmount',
        label: '广告销售额',
        align: 'right',
        minWidth: 102,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'impressions',
        label: '曝光量',
        align: 'right',
        minWidth: 107,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'clicks',
        label: '点击量',
        align: 'right',
        minWidth: 107,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'ctr',
        label: 'CTR',
        align: 'right',
        minWidth: 75,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'cpc',
        label: 'CPC',
        align: 'right',
        minWidth: 75,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'totalSalesAmount',
        label: '总销售额',
        align: 'right',
        minWidth: 107,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'cvr',
        label: 'CVR',
        align: 'right',
        minWidth: 75,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'cpa',
        label: 'CPA',
        align: 'right',
        minWidth: 75,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'acos',
        label: 'ACOS',
        align: 'right',
        minWidth: 75,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
    ],
  });
  const columns = computed(() => {
    return propertyList.propertyArr
      .filter((item) => item.checked)
      .map((item) => {
        const { key: field, label: title, ...rest } = item;
        return {
          field,
          title,
          minWidth: rest.minWidth || 1,
          className: type.value !== 'category' ? 'cell-white-space' : '',
          ...rest,
        };
      });
  });
  const gridOptions = {
    border: false,
    showOverflow: true,
    minHeight: 96,
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'parentId',
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
  const configColumns = (config) => {
    propertyList.propertyArr.forEach((item) => {
      const col = config.find((c) => c === item.key);
      if (col) {
        item.checked = false;
      } else {
        item.checked = true;
      }
    });
  };
  const handleCurrentChange = (page: number) => {
    curPage.value = page;
    if (type.value === 'country') {
      fetchCountryData();
    } else if (type.value === 'category') {
      fetchCategoryData();
    } else if (type.value === 'adCampaign') {
      fetchAdData();
    }
  };
  const handleSizeChange = async (size: number) => {
    pageSize.value = size;
    curPage.value = 1;
    loading.value = true;
    try {
      if (type.value === 'country') {
        await fetchCountryData();
      } else if (type.value === 'category') {
        await fetchCategoryData();
      } else if (type.value === 'adCampaign') {
        await fetchAdData();
      }
    } finally {
      loading.value = false;
    }
  };
  const changeType = async () => {
    const firstColumn = propertyList.propertyArr[0];
    curPage.value = 1;
    loading.value = true;
    try {
      // 根据选择的维度类型过滤数据
      if (type.value === 'country') {
        firstColumn.label = '国家';
        await fetchCountryData();
      } else if (type.value === 'category') {
        firstColumn.label = '三级/四级/SPU';
        await fetchCategoryData();
      } else if (type.value === 'adCampaign') {
        firstColumn.label = '广告活动';
        await fetchAdData();
      }
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => props.searchParams,
    () => {
      changeType();
    },
    {
      deep: 1,
      immediate: true,
    }
  );
</script>

<style scoped lang="scss">
  .operation {
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 16px;
    font-size: 14px;
    color: #1f1f1f;
  }
  .table-container {
    --vxe-ui-font-size-default: 12px;
  }
  :deep(.table--tree-node-leaf) {
    border-bottom: 1px solid var(---N2, #f5f5f5);
    background: var(---N1, #f7f7f7);
  }
  :deep(.cell-white-space .vxe-tree-cell) {
    padding-left: 0 !important;
  }
  .pagination {
    margin-top: 16px;
    justify-content: end;
  }
</style>
