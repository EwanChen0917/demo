<template>
  <KeenFlex :auto-width="'350px'">
    <template #auto>
      <div class="card mb-5 mb-xl-10 flex-root">
        <div class="card-body p-9">
          <div class="card-title d-flex flex-column">
            <div class="d-flex align-items-center">
              <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
                {{ sourceStatsData?.total.toLocaleString() }}
              </span>
            </div>

            <span class="text-gray-400 pt-1 fw-semibold fs-6">获知品牌来源</span>
          </div>
          <div class="d-flex flex-center pt-2">
            <div
              id="source_stat_chart"
              style="min-width: 150px; min-height: 150px; padding-bottom: 25px"
              data-kt-size="150"
              data-kt-line="17"
            >
              <span></span>
            </div>
          </div>
          <div
            class="d-flex fw-semibold align-items-center my-2"
            v-for="item in sourceStatsData?.sourceStats"
            :key="item.source"
          >
            <div
              class="bullet w-8px h-3px rounded-2 me-3"
              :style="{ backgroundColor: colorMap[item.source] }"
            ></div>
            <div class="text-gray-500 flex-grow-1 me-4 over_elli" style="width: 100px">
              {{ descMap[item.source] || '' }}
            </div>
            <div class="fw-bolder text-gray-700 text-xxl-end">
              {{ item.proportion.toFixed(2) || 0 }}%
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #fluid>
      <div class="card mb-5 mb-xl-10">
        <div class="card-header">
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">获知来源统计</h3>
          </div>
        </div>
        <div class="card-body p-9">
          <div class="text-muted">共收集：{{ sourceStatsData?.total.toLocaleString() }}</div>
          <div class="p-9">
            <div
              class="row mb-7 justify-content-between"
              :key="item.source"
              v-for="item in sourceStatsData?.sourceStats"
            >
              <label class="col-6 fw-semibold text-muted">{{ item.sourceDesc }}</label>
              <div class="col-4 fv-row">
                <span class="fw-semibold text-gray-700 fs-6 me-12">
                  {{ item?.count }}
                </span>
                <span class="fw-semibold text-gray-700 fs-6">
                  {{ item?.proportion.toFixed(2) }}%
                </span>
              </div>
            </div>
            <div style="text-indent: 3em">
              <span
                class="me-2 text-muted"
                :key="index"
                v-for="(other, index) in sourceStatsData?.otherSources"
              >
                {{ other }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </KeenFlex>
</template>

<script setup lang="ts" name="sourcestat">
  import { useRequest } from 'vue-request';
  import { activityApi } from '@/api';
  import { ElTooltip } from 'element-plus';

  const colorMap = {
    1: '#3E97FF',
    2: '#50CD89',
    3: '#7239EA',
    4: '#F1416C',
    5: '#FFC700',
    6: '#43ced7',
  };

  const descMap = {
    1: '社交媒体',
    2: '亲友推荐',
    3: '广告',
    4: '新闻报道、专业评价文章',
    5: '产品体验项目',
    6: '其他',
  };

  const { data: sourceStatsData } = useRequest(activityApi.luteosActivityParcelQuerySourceStat, {
    onSuccess: async () => {
      await nextTick();
      drawChart();
    },
  });

  const drawChart = () => {
    const initChart = () => {
      const el = document.getElementById('source_stat_chart');

      if (!el) {
        return;
      }

      const options = {
        size: el.getAttribute('data-kt-size') ? parseInt(el.getAttribute('data-kt-size')) : 150,
        lineWidth: el.getAttribute('data-kt-line') ? parseInt(el.getAttribute('data-kt-line')) : 11,
        rotate: el.getAttribute('data-kt-rotate')
          ? parseInt(el.getAttribute('data-kt-rotate'))
          : 145,
        // percent:  el.getAttribute('data-kt-percent') ,
      };

      const canvas = document.createElement('canvas');
      const span = document.createElement('span');

      if (typeof G_vmlCanvasManager !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
      }

      const ctx = canvas.getContext('2d');
      canvas.width = canvas.height = options.size;

      el.appendChild(span);
      el.appendChild(canvas);

      ctx.translate(options.size / 2, options.size / 2); // change center
      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

      // imd = ctx.getImageData(0, 0, 240, 240);
      const radius = (options.size - options.lineWidth) / 2;
      let start = (60 * Math.PI) / 180;
      const rad = Math.PI * 2;
      const init = Math.PI / 2;
      let sum = 0;
      const drawCircle = function (color, lineWidth, percent) {
        sum += percent;
        ctx.beginPath();
        const end = sum == 0 ? start : init + sum * rad;
        ctx.arc(0, 0, radius, start, end, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
        start = end;
      };

      // Init
      const list = sourceStatsData.value.sourceStats;
      // drawCircle('#E4E6EF', options.lineWidth, 100 / 100);
      // drawCircle('#50CD89', options.lineWidth, 100 / 150); //0.66
      // drawCircle('#7239EA', options.lineWidth, 100 / 250);
      for (let i = 0; i < list.length; i++) {
        drawCircle(colorMap[i + 1], options.lineWidth, list[i].proportion / 100);
      }
    };
    return initChart();
  };
</script>

<style scoped lang="scss"></style>
