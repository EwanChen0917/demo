<template>
  <div class="tag-classic">
    <ChartCard class="voc-source" title="VOC来源">
      <template #chart="{ isDialog }">
        <PieChart
          :data="localData.vocTypeSummaryList"
          :isDialog="isDialog"
          :clickMaxLevel="clickMaxLevel"
          :tagLevel="0"
          @click-pie="
            handleVocSource($event, {
              vocTypeSummaryList: localData.vocTypeSummaryList,
            })
          "
        />
      </template>
      <template #table>
        <vxe-table
          round
          :data="localData.vocTypeSummaryList"
          size="small"
          :sort-config="{ defaultSort: { field: 'count', order: 'desc' } }"
        >
          <vxe-column field="vocType" title="VOC来源" align="left" />
          <vxe-column
            field="count"
            title="数量"
            align="right"
            sortable
            sort-by="count"
            :formatter="({ cellValue }) => formatNumberObj(cellValue).toString()"
          />
          <vxe-column
            field="proportion"
            title="占比"
            align="right"
            sortable
            :formatter="
              ({ cellValue }) => formatRate(cellValue, { maximumFractionDigits: 2 }).toString()
            "
          />
        </vxe-table>
      </template>
    </ChartCard>
    <div class="tag-rest">
      <ChartCard :allow-transpose="true" title="标签二级分类 Top5">
        <template #title>
          <div class="chart-card-title">
            <span>标签二级分类 Top5</span>
            <span @click="handleViewMore(2)" class="chart-card-title-extra">
              更多
              <i class="iconfont icon-jiantouxiangyou"></i>
            </span>
          </div>
        </template>
        <template #chart="{ isDialog, transpose }">
          <TagChart
            :data="localData.level2TagTop5"
            :clickMaxLevel="clickMaxLevel"
            :tagLevel="2"
            :isDialog="isDialog"
            :transpose="transpose"
            @click-tag="
              handleTag($event, 2, {
                vocTypeSummaryList: localData.vocTypeSummaryList,
                level2TagTop5: localData.level2TagTop5,
              })
            "
          />
        </template>
        <template #table>
          <vxe-table
            round
            :data="localData.level2TagTop5"
            size="small"
            :sort-config="{ defaultSort: { field: 'count', order: 'desc' } }"
          >
            <vxe-column field="tagName" title="二级标签" />
            <vxe-column
              align="right"
              sortable
              field="count"
              title="指标数据"
              sort-by="count"
              :formatter="({ cellValue }) => formatNumberObj(cellValue).toString()"
            />
          </vxe-table>
        </template>
      </ChartCard>
      <ChartCard :allow-transpose="true" title="标签三级分类 Top5">
        <template #title>
          <div class="chart-card-title">
            <span>标签三级分类 Top5</span>
            <span @click="handleViewMore(3)" class="chart-card-title-extra">
              更多
              <i class="iconfont icon-jiantouxiangyou"></i>
            </span>
          </div>
        </template>
        <template #chart="{ isDialog, transpose }">
          <TagChart
            :data="localData.vocTagTop5"
            :clickMaxLevel="clickMaxLevel"
            :tagLevel="3"
            :isDialog="isDialog"
            :transpose="transpose"
            @click-tag="
              handleTag($event, 3, {
                vocTypeSummaryList: localData.vocTypeSummaryList,
                level2TagTop5: localData.level2TagTop5,
                vocTagTop5: localData.vocTagTop5,
              })
            "
          />
        </template>
        <template #table>
          <vxe-table
            round
            :data="localData.vocTagTop5"
            size="small"
            :sort-config="{ defaultSort: { field: 'count', order: 'desc' } }"
          >
            <vxe-column field="tagName" title="三级标签" />
            <vxe-column
              align="right"
              sortable
              field="count"
              title="指标数据"
              sort-by="count"
              :formatter="({ cellValue }) => formatNumberObj(cellValue).toString()"
            />
          </vxe-table>
        </template>
      </ChartCard>
      <ChartCard :allow-transpose="true" title="VOC标签 Top10">
        <template #title>
          <div class="chart-card-title">
            <span>VOC标签 Top10</span>
            <span @click="handleViewMore(4)" class="chart-card-title-extra">
              更多
              <i class="iconfont icon-jiantouxiangyou"></i>
            </span>
          </div>
        </template>
        <template #chart="{ isDialog, transpose }">
          <TagChart
            :data="localData.level4TagTop5"
            :clickMaxLevel="clickMaxLevel"
            :tagLevel="4"
            :isDialog="isDialog"
            :transpose="transpose"
            @click-tag="
              handleTag($event, 4, {
                vocTypeSummaryList: localData.vocTypeSummaryList,
                level2TagTop5: localData.level2TagTop5,
                vocTagTop5: localData.vocTagTop5,
                level4TagTop5: localData.level4TagTop5,
              })
            "
          />
        </template>
        <template #table>
          <vxe-table
            round
            :data="localData.level4TagTop5"
            :sort-config="{ defaultSort: { field: 'count', order: 'desc' } }"
          >
            <vxe-column field="tagName" title="四级标签" />
            <vxe-column
              align="right"
              sortable
              field="count"
              title="指标数据"
              sort-by="count"
              :formatter="({ cellValue }) => formatNumberObj(cellValue).toString()"
            />
          </vxe-table>
        </template>
      </ChartCard>
    </div>
  </div>
  <el-dialog
    class="bi-tag-trend-dialog"
    :width="transpose ? '75%' : '50%'"
    v-model="visible"
    destroy-on-close
    :showClose="false"
  >
    <template #header>
      <div class="dialog-header">
        <div class="dialog-title">{{ dialogTitle }}</div>
        <div class="dialog-actions">
          <IconTooltip
            :content="transpose ? '切换成横向帕累托图' : '切换成纵向帕累托图'"
            icon-class="transpose-icon Root-tyicon icon-Root-tyshichangfenxi"
            :class="{ portrait: transpose }"
            @click="transpose = !transpose"
          />
          <div class="gap"></div>
          <i
            class="iconfont Root-tyicon"
            :class="currentMode.icon"
            @click="mode = mode === 'chart' ? 'table' : 'chart'"
          ></i>
          <div class="gap"></div>
          <i class="iconfont icon-guanbi" @click="visible = false"></i>
        </div>
      </div>
    </template>
    <template v-if="mode === 'chart'">
      <TagChart
        :style="{ height: '560px' }"
        :isDialog="true"
        :transpose="transpose"
        :data="moreData"
      />
    </template>
    <template v-else>
      <vxe-table :data="moreData">
        <vxe-column field="tagName" title="标签" />
        <vxe-column
          field="count"
          title="指标数据"
          align="right"
          sortable
          :formatter="({ cellValue }) => formatNumberObj(cellValue).toString()"
        />
      </vxe-table>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { biApi, BiContracts } from '@/api';
  import PieChart from './PieChart.vue';
  import ChartCard from '../../components/ChartCard.vue';
  import TagChart from './TagChart.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';
  import IconTooltip from '../../components/IconTooltip.vue';

  const props = defineProps<{
    state: BiContracts.VocTagDistributionResp;
  }>();
  const localData = reactive({ ...props.state });
  const clickMaxLevel = ref<number[]>([]);
  watchEffect(() => {
    Object.assign(localData, props.state);
  });

  const emit = defineEmits<{
    (
      e: 'update:selectedVocType',
      payload: { vocType: string },
      originData: Record<string, any>
    ): void;
    (
      e: 'update:selectedTag',
      payload: { tagName: string },
      level: number,
      originData: Record<string, any>
    ): void;
  }>();
  const transpose = ref(false);
  const searchParams = inject<BiContracts.BaseVocQueryReq>('searchParams')!;
  watch(searchParams, () => {
    clickMaxLevel.value = [];
  });
  const handleVocSource = (payload: { vocType: string }, originData: Record<string, any>) => {
    emit('update:selectedVocType', payload, originData);
  };

  const handleTag = async (
    payload: { tagName: string },
    level: number,
    originData: Record<string, any>
  ) => {
    if (payload.tagName === undefined) {
      clickMaxLevel.value = clickMaxLevel.value.filter((item) => item !== level);
    } else {
      clickMaxLevel.value.push(level);
    }
    emit('update:selectedTag', payload, level, originData);
  };
  const moreData = ref<BiContracts.TagLevelDetailItem[]>([]);
  const dialogTitle = ref('一级标签');
  const visible = ref(false);
  const mode = ref('chart');
  const modeList = [
    { label: '图表', value: 'chart', icon: 'icon-Root-tyshichangfenxi' },
    { label: '表格', value: 'table', icon: 'icon-Root-tydingdao' },
  ];
  const currentMode = computed(() => {
    return modeList.find((item) => item.value === mode.value)!;
  });
  const handleViewMore = async (level) => {
    const res = await biApi.biVocTagLevelDetail({
      ...searchParams,
      vocLevel: level,
    });
    mode.value = 'chart';
    moreData.value = res.tagList?.length > 15 ? res.tagList!.slice(-15) : res.tagList!;
    dialogTitle.value = level === 2 ? '二级标签' : level === 3 ? '三级标签' : 'VOC标签';
    visible.value = true;
  };
</script>

<style lang="scss" scoped>
  .tag-classic {
    display: flex;
    gap: 16px;
    flex: 1;
    .voc-source {
      flex: none;
      width: 332px;
      :deep(.body) {
        padding: 0 12px;
      }
    }
    .pie-chart {
      width: 100%;
      height: 226px;
    }
    .tag-rest {
      display: flex;
      flex: 1;
      flex-wrap: nowrap;
      gap: 16px;
      > .chart-card {
        width: 0;
        flex: 1;
      }
    }
  }
  .chart-card-title {
    color: var(---N9, #1f1f1f);

    /* 常规/Medium 14 */
    font-family: 'PingFang SC Medium', 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    display: flex;
    column-gap: 10px;
    .chart-card-title-extra {
      color: var(---N6, #999);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 166.667% */
      cursor: pointer;
      &:hover {
        color: var(---P6, #02b96b);
      }
      .iconfont,
      .Root-tyicon {
        font-size: 12px;
        vertical-align: middle;
      }
    }
  }
  .bi-tag-trend-dialog {
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dialog-title {
      color: var(---N9, #1f1f1f);

      /* 重要/Medium 16 */
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 150% */
    }
    .dialog-actions {
      display: flex;
      column-gap: 12px;
      align-items: center;
      :deep(.transpose-icon) {
        transform: scaleX(-1);
        &.portrait {
          transform: scaleX(-1) rotate(-90deg);
        }
      }
      .iconfont,
      .Root-tyicon {
        font-size: 16px;
        color: var(---N6, #999);
        cursor: pointer;
      }
    }
    .gap {
      height: 12px;
      width: 1px;
      background: var(---N4, #dedede);
    }
    .el-dialog__body {
      max-width: unset;
    }
  }
</style>
