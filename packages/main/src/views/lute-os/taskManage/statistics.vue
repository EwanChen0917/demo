<template>
  <KeenList>
    <!--    <template #search></template>-->
    <template #search>
      <div class="d-flex gap-2 align-items-center flex-wrap">
        <el-date-picker
          style="max-width: 400px"
          v-model="search.time"
          type="daterange"
          range-separator="-"
          start-placeholder="创建开始时间"
          end-placeholder="创建结束时间"
          value-format="YYYY-MM-DD"
          clearable
        />
        <el-date-picker
          style="max-width: 400px"
          v-model="search.closeTime"
          type="daterange"
          range-separator="-"
          start-placeholder="关闭开始时间"
          end-placeholder="关闭结束时间"
          value-format="YYYY-MM-DD"
          clearable
        />
        <el-checkbox
          v-model="search.createFlag"
          label="本部门创建"
          :true-value="1"
          :false-value="0"
        />
        <el-checkbox
          v-model="search.handleFlag"
          label="本部门接收"
          :true-value="1"
          :false-value="0"
        />
        <el-checkbox v-model="search.status" label="未关闭" :true-value="1" :false-value="0" />
      </div>
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </template>
    <div class="cards">
      <div class="card-item bg1">
        <div class="card-item-title">任务事项总数</div>
        <div class="card-item-num">{{ listData?.sum }}</div>
      </div>
      <div class="card-item bg2">
        <div class="card-item-title">延期数</div>
        <div class="card-item-num delay">{{ listData?.delayNum }}</div>
      </div>
      <div class="card-item bg3">
        <div class="card-item-title">延期率</div>
        <div class="card-item-num delay">{{ listData?.delayPercent }}%</div>
      </div>
    </div>
    <!--    <div class="d-flex gap-20 align-items-center">-->
    <div ref="statisticsChart" class="statisticsChart"></div>
    <!--    </div>-->
  </KeenList>
</template>

<script setup lang="ts">
    import { PlatformApi, platformApi } from '@/api';
  import * as echarts from 'echarts';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { omit } from 'lodash-es';

  const emit = defineEmits(['search']);

  const PAGE_SIZE = 10;

  const {
    search,
    // searchData,
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    PlatformApi.PlatformTaskStatistics.RequestQuery,
    PlatformApi.PlatformTaskStatistics.ResponseBody
  >({
    searchDefaults: {
      time: undefined,
      closeTime: undefined,
      createFlag: 0,
      handleFlag: 0,
      status: 0,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformTaskStatistics,
    interceptSearchData: (searchData) => {
      const { time, closeTime } = searchData;
      return {
        ...omit(searchData, ['time', 'closeTime']),
        startTime: time?.[0],
        endTime: time?.[1],
        closeStartTime: closeTime?.[0],
        closeEndTime: closeTime?.[1],
      };
    },
    onSuccess: () => {
      init();
    },
  });

  const statisticsChart = ref();
  let myChart: echarts.ECharts | null = null;

  const init = async () => {
    console.log(1111);
    // const myChart = echarts.init(statisticsChart.value);
    if (!statisticsChart.value) return;

    // Destroy the old chart instance if it exists
    if (myChart) {
      myChart.dispose();
    }

    await nextTick(); // Ensure DOM is updated before initializing chart

    myChart = echarts.init(statisticsChart.value);
    const option = {
      tooltip: {
        trigger: 'item',
        borderWidth: 0,
        padding: [8, 16],
        backgroundColor: '#000000bf',
        formatter(params) {
          const data = params?.data;
          return (
            '<div style="border-radius: 8px;color: #ffffff;font-size: 14px;line-height: 32px;font-family: \'PingFang SC\'">' +
            `<div>${
              data.name
            }</div><div style="display: flex;align-items: center;gap: 8px; font-family: 'PingFang SC Regular'">${
              data?.value
            }% <div style="width: 1px; height: 10px; background: #ffffff"></div> ${data?.num?.toLocaleString()}任务</div>` +
            '</div>'
          );
        },
      },
      /* legend: {
        left: 130,
      }, */
      /* legend: {
        right: 0,
        bottom: 50,
        orient: 'vertical',
        itemWidth: 20,
      }, */
      color: ['#4372FF', '#40A9FF', '#36CFC9', '#73D13D', '#FAD337', '#FFA940'],
      series: [
        {
          type: 'pie',
          // radius: ['40%', '80%'],
          // avoidLabelOverlap: false,
          label: {
            minMargin: 5,
            distanceToLabelLine: 5,
            formatter(params) {
              const data = params?.data;
              /* return `<div>${
                data.name
              }</div><div style="display: flex;align-items: center;gap: 8px; font-family: 'PingFang SC Regular'">${
                data?.value
              }% <div style="width: 1px; height: 10px; background: #ffffff"></div> ${data?.num?.toLocaleString()}任务</div>`; */
              return `{name|${data?.name}}{value|${
                data?.value
              }%}{num|${data?.num?.toLocaleString()}任务}`;
            },
            rich: {
              name: {
                color: '#000000D9',
                fontSize: 14,
                fontFamily: 'PingFang SC',
                padding: [0, 24, 0, 0],
                lineHeight: 22,
              },
              value: {
                color: '#262626',
                fontSize: 14,
                padding: [0, 24, 0, 0],
                lineHeight: 22,
              },
              num: {
                color: '#262626',
                fontSize: 14,
                lineHeight: 22,
              },
            },
          },
          labelLine: {
            minTurnAngle: 135,
            length: 20,
            length2: 20,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: '#ffffff',
          },
          /* labelLayout(params) {
            const isLeft = params.labelRect.x < myChart.getWidth() / 2;
            const points = params.labelLinePoints;
            // Update the end point.
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
              verticalAlign: 'bottom',
            };
          }, */
          data: listData.value?.statisticsItemList?.map((item) => {
            return { value: item?.value, name: item?.desc, num: item?.num, status: item?.status };
          }),
        },
      ],
    };
    myChart.setOption(option);
    myChart.on('click', (params) => {
      emit('search', params?.data?.status);
    });
  };

  const reset = () => {
    resetSearch();
    search.createFlag = 0;
    search.handleFlag = 0;
    search.status = 0;
  };

  defineExpose({
    runQuery,
  });
</script>

<style scoped lang="scss">
  .cards {
    display: flex;
    width: 100%;
    height: 144px;
    gap: 16px;
    padding: 16px;
    border: 1px solid #4372ff33;
    .card-item {
      flex: 1;
      padding: 20px 0 21px 24px;
      border-radius: 8px;
      &-title {
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        line-height: 23px;
        margin-bottom: 8px;
      }
      &-num {
        font-family: 'PingFang SC Regular';
        font-size: 30px;
        font-weight: 600;
        line-height: 40px;
        color: #000000d9;
      }
      .delay {
        color: #f5222d;
      }
    }
    .bg1 {
      background-image: url('@/assets/images/task/card-bg1.svg');
      background-size: cover;
      background-position-y: bottom;
    }
    .bg2 {
      background-image: url('@/assets/images/task/card-bg2.svg');
      background-size: cover;
      background-position-y: bottom;
    }
    .bg3 {
      background-image: url('@/assets/images/task/card-bg3.svg');
      background-size: cover;
      background-position-y: bottom;
    }
  }

  .statisticsChart {
    width: 900px;
    height: 350px;
  }

  /*.tooltip {
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #000000bf;
    color: #ffffff;
    font-size: 14px;
    line-height: 32px;
    font-family: 'PingFang SC';
    .name {
      font-family: 'PingFang SC Regular';
    }
  }*/
</style>
