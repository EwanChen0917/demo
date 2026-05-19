<template>
  <div class="level-downhole-analysis">
    <div class="level-downhole-analysis__title">
      标签多维分析
      <span class="operation">
        <el-select
          v-model="value"
          :style="{ width: '104px' }"
          placeholder="选择指标"
          @change="
            () => {
              $nextTick(() => {
                expendRow(currentLevel1);
              });
            }
          "
        >
          <el-option label="VOC占比" value="vocRate" />
          <el-option label="VOC量" value="vocCnt" />
        </el-select>
        <el-radio-group
          v-model="type"
          @change="
            () => {
              expendRow(currentLevel1);
            }
          "
        >
          <el-radio-button value="levelDrillDownByWeekList">周维度</el-radio-button>
          <el-radio-button value="levelDrillDownByMonthList">月维度</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="table-container">
      <vxe-table
        ref="tableRef"
        :column-config="{ resizable: false }"
        :row-config="{ keyField: 'id' }"
        :tree-config="treeConfig"
        :data="dataList"
        size="small"
        :round="true"
        max-height="521px"
      >
        <vxe-column
          min-width="206"
          field="name"
          title="一级标签/二级标签"
          tree-node
          fixed="left"
          header-row-class-name="table--tree-header"
          :class-name="cellClassName"
          sortable
        >
          <template #default="{ row, level }">
            <template v-if="row.name !== '合计'">
              <a
                class="d-flex align-items-center gap-1 link text-font"
                :href="createUrl(row, level)"
                target="_blank"
              >
                <span>{{ row.name }}</span>
                <i class="iconfont icon-jiantouxiangyou"></i>
              </a>
            </template>
            <span v-else class="text-font">{{ row.name }}</span>
          </template>
        </vxe-column>
        <vxe-column width="109" align="center" title="趋势" :class-name="cellClassName">
          <template #default="{ row }">
            <div
              v-if="row.trendData && row.trendData.length > 0"
              :style="{
                width: '97px',
                height: '20px',
              }"
            >
              <div :style="{ width: '100%', height: '40px', transform: 'translateY(-10px)' }">
                <TrendEcharts :key="value + type" :data="row.trendData" color="#02B96B" />
              </div>
            </div>
          </template>
        </vxe-column>
        <template v-if="type === 'levelDrillDownByWeekList'">
          <!-- diff算法导致列错位， formatter属性导致排序不正确 -->
          <vxe-column
            v-for="item in columns"
            :key="type + item"
            :field="item"
            :title="item"
            :sortable="true"
            :class-name="cellClassName"
            min-width="85"
            align="center"
          >
            <template #default="{ row }">
              <span>{{ row[item] ? formartValue(row[item]) : '-' }}</span>
            </template>
          </vxe-column>
        </template>
        <vxe-column
          v-else
          v-for="item in columns"
          :key="type + item"
          :field="item"
          :title="item"
          :sortable="true"
          :class-name="cellClassName"
          min-width="85"
          align="left"
        >
          <template #default="{ row }">
            {{ row[item] ? formartValue(row[item]) : '-' }}
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { encryptByBase64 } from '@/utils/aesTils';
  import { useTemplateRef } from 'vue';
  import { type VxeTableInstance } from 'vxe-table';
  import * as echarts from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { VxeTablePropTypes } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';

  import { toThousands } from '@/utils/toThousands';
  import TrendEcharts from './TrendEcharts.vue';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const value = ref('vocRate');
  const treeConfig = ref<VxeTablePropTypes.TreeConfig<any>>({
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    lazy: true,
    hasChild: 'hasChild',
    iconOpen: 'vxe-custom--square-plus vxe-custom--square-minus',
    iconClose: 'vxe-custom--square-plus',
    loadMethod({ row }) {
      // 异步加载子节点
      return getDimensionAnalysis(row);
    },
  });
  const type = ref('levelDrillDownByWeekList');
  const drillDownPath = computed(() => {
    // 区域维度
    return ['level1', 'level2'];
  });
  const detailData = inject('dataDetail', ref<any>({}));
  const totalKeyMap = {
    levelDrillDownByWeekList: 'vocCntTotalByWeekList',
    levelDrillDownByMonthList: 'vocCntTotalByMonthList',
  };
  const columns = computed(() => {
    const firstLine = detailData.value[type.value]?.[0];
    if (!firstLine) {
      return [];
    }
    return firstLine.periods;
  });

  const dataList: Ref<any[]> = ref([]);
  watch([detailData, type, value], () => {
    nextTick(() => {
      dataList.value = generateDataList();
    });
  });
  const generateDataList = () => {
    if (!detailData.value[type.value]) {
      return [];
    }
    // 合计
    const totalRow = detailData.value[totalKeyMap[type.value]].reduce(
      (acc, key) => {
        return {
          ...acc,
          [key.period]: key[value.value],
        };
      },
      {
        name: '合计',
        id: 'total',
        hasChild: false,
        children: [],
      }
    );
    const contentRow =
      detailData.value[type.value]?.map((item, idx) => {
        return {
          trendData:
            item.periodVocCnt?.reverse().map((key) => ({
              month: key.period,
              value: key[value.value],
            })) || [],
          ...(item.periodVocCnt?.reduce((acc, key) => {
            return {
              ...acc,
              [key.period]: key[value.value],
            };
          }, {}) || {}),
          name: item[drillDownPath.value[0]],
          dimensionList: [
            {
              dimension: drillDownPath.value[0],
              dimensionValue: item[drillDownPath.value[0]] ?? '',
            },
          ],
          id: item[drillDownPath.value[0]],
          dimensionType: type.value === 'levelDrillDownByWeekList' ? 1 : 2,
          // level: 1,
          parentId: null,
          hasChild: true,
        };
      }) || [];
    return [totalRow, ...contentRow];
  };
  const search = inject<Ref<BiContracts.VocAnalysisReq>>('search');
  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biVocQueryVocLevelDrillDown({
      ...search!.value,
      dimensionList: row.dimensionList || [],
      dimensionType: row.dimensionType,
    });
    if (res) {
      const d = res[type.value];
      if (!d || d.length === 0) {
        return [];
      }
      // 处理数据，生成树形结构
      // 这里假设每个维度的值都是唯一的

      return (
        res[type.value].map((item) => {
          const id = `${item.level1}${item.level2}`;
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
            ...(item.level2PeriodVocCnt?.reduce((acc, key) => {
              return {
                ...acc,
                [key.period]: key[value.value],
              };
            }, {}) || {}),
            trendData:
              item.level2PeriodVocCnt?.map((key) => ({
                month: key.period,
                value: key[value.value],
              })) || [],
            id,
            name: item[drillDownPath.value[row.dimensionList.length]],
            dimensionList,
            parentId: row.id,
            hasChild,
          };
        }) || []
      );
    }
    return [];
  };
  const cellClassName = ({ row }) => {
    return row.hasChild ? '' : 'table--tree-node-leaf';
  };
  const formartValue = (data: number | string) => {
    if (value.value === 'vocCnt') {
      return data ? toThousands(data) : '-';
    }
    if (value.value === 'vocRate') {
      return data
        ? data.toLocaleString('zh-CN', { style: 'percent', minimumFractionDigits: 2 })
        : '-';
    }
    return data;
  };
  const router = useRouter();
  const createUrl = (row, level) => {
    const fields = {
      平台: 'platformList',
      国家: 'countryList',
      客服型号: 'skuModelNameVocList',
      SPU名称: 'spuNameList',
    };
    if (!row.dimensionList) {
      return '';
    }
    const params = new URLSearchParams();
    params.append('VOC一级标签', row.dimensionList[0].dimensionValue);
    if (level === 1) {
      params.append('VOC二级标签', row.dimensionList[1].dimensionValue);
    }
    Object.keys(fields).forEach((item) => {
      const v = search.value[fields[item]];
      if (v?.length) {
        params.append(item, v.join(','));
      }
    });
    // 要对空格转加号做特殊处理
    const biUrl = `https://finebi.luteos.com/webroot/decision/v5/design/report/d04e262881ae4e75b2ff4b0b92da220e/view?${params
      .toString()
      .replace(/\+/g, '%20')}`;
    const { href } = router.resolve({
      name: 'frame',
      params: {
        menuCode: 'M2025073018402714630583',
        frameUrl: encryptByBase64(biUrl),
      },
    });
    return href;
  };

  const vxeTableRef = useTemplateRef<VxeTableInstance>('tableRef');
  const currentLevel1 = ref<string>('');
  const expendRow = (level1: string) => {
    currentLevel1.value = level1;
    const row = vxeTableRef.value?.getRowById(level1);
    dataList.value = [row];
    // 展开行
    if (row?.hasChild) {
      nextTick(() => {
        vxeTableRef.value?.setTreeExpand(row, true);
      });
    }
  };
  const revert = () => {
    currentLevel1.value = '';
    // 重置数据列表
    dataList.value = generateDataList();
  };
  defineExpose({
    expendRow,
    revert,
  });
</script>

<style scoped lang="scss">
  .level-downhole-analysis {
    border-radius: 0;
    padding: 24px;
    .level-downhole-analysis__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 14px;
        background-color: #02b96b;
        margin-right: 8px;
        border-radius: 15px;
      }
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        column-gap: 8px;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    :deep(.table--tree-node-leaf) {
      border-bottom: 1px solid var(---N2, #f5f5f5);
      background: var(---N1, #f7f7f7);
    }
  }
  .link {
    cursor: pointer;
    color: var(---N9, #1f1f1f);

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    &:hover {
      color: var(---C4, #02b96b);
    }
  }
  .text-font {
    padding-left: 10px;
  }
</style>
