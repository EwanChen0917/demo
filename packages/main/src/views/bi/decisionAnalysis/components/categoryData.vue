<template>
  <div class="sales-data" v-loading="loading">
    <div class="sales-data__title">
      品类 Top10 分析
      <span class="operation">
        <el-radio-group v-model="type" @change="init">
          <el-radio-button value="categoryProportionOrderBySales">销售额品类</el-radio-button>
          <el-radio-button value="categoryProportionOrderByGrossProfits">
            毛利额品类
          </el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="chart-container">
      <div class="chart-area" id="top10-chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { BarChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { formatMoneyObj } from '../../utils/utils';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const loading = inject('loading', ref(false));
  const type = ref('categoryProportionOrderBySales');
  const detailData = inject('detailData', ref<any>({}));
  const data = computed(() => {
    return detailData.value.proportionAnalysis[type.value] || [];
  });
  let chart: any = null;
  watch(data, (newData) => {
    if (newData) {
      init();
    }
  });
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
    const dataset = data.value.map((item) =>
      type.value === 'categoryProportionOrderBySales' ? item.salesAmount : item.grossProfitAmount
    );
    const total = dataset.reduce((acc: number, cur) => acc + Number(cur), 0);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: '10px',
        left: '24px',
        right: '66px',
        height: `${44 * data.value.length}px`, // 根据数据长度动态设置高度
        containLabel: true,
      },
      color: ['#02B96B'],
      xAxis: {
        type: 'value',
        show: false, // 隐藏x轴刻度线
      },
      yAxis: {
        type: 'category',
        data: data.value.map((item) => item.category),
        inverse: true,
        axisLabel: {
          // interval: 0,
          // rotate: 30,
          fontSize: 12,
          color: '#1F1F1F',
          height: 40,
          formatter(value, index) {
            // console.log(value, index);
            if (index === 0) {
              return `{img1|${index + 1}} {category|${value}}`;
              // return `{rank1|${index + 1}} {category|${value}}`;
            }
            if (index === 1) {
              return `{img2|${index + 1}} {category|${value}}`;
            }
            if (index === 2) {
              return `{img3|${index + 1}} {category|${value}}`;
            }
            return `{rank|${index + 1}} {category|${value}}`;
          },
          rich: {
            img1: {
              height: 24, // 图片高度
              width: 19, // 图片宽度
              color: 'transparent', // 设置透明色
              backgroundColor: {
                image:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAwCAYAAAB9sggoAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKpSURBVHgBzZm/b9NAFMe/z3aCogZBEBEKYgAkECMSE1s6M7QjY/kLEAsj0H8A8Qcg0Wywhb8AZ0fIEUslBtKFIjrUoimN8qPHnSPXjmM3ybsmvs9gv3t3sb569+7yziYkEIODurxtQNCmbN3GcvAA8kCDBhVqbtoAOhMkDq9iMHojredYKbSDkb1NpUpnwhuJGn6R5kPkgaAOTu31uDgruAaRykmUgmTK2MMPk66TQ+X8CSOgLSpebyjLgj16DWMQW6FlyZjlN4XT1IN8hxImYJIwxRV1sWAoxgkjquypu2HChBdapkXMVGGWe2bBJPq9dmiS6B8ImIFPxWolbDjQpX8E7H4EjvfH7UcvgOJlMPDiDb6wUNDuJ1kEHEX+x6/AgnSFZQlSVO6DDZELLWGtl8Cfb+l9xTLY9Hp78SYvYoEImUcPnqoqE/j+fuxbq4GJT+VbmlM57I7z6O6Tcfvr26iPL8xLOhYXttGcbIerUVFmCiO4SZf+BtuNCVu7CRZEUxHTF/bvd2RzI2bbraRLT5haCP3YlsHJMSE6stTxcaHCJqaRm/jT06jQE3b8K7LZiS/cNLemsFh+cSNGy4hYNxYxrjDHaae5NSOmu4cJLy3xFZqrshvZnD1MvbPIQE+Y/yOyOTVYRuIr+MKSe1jlHhYmI/EVfGEXsIdRodrK6tMrrUNB11gFonteJ1+YErPZBBuCd153fsc3QYYKi50h08jrXDlxhkwjr4h5swbkI4zmEpb9t7A0EmfINNQ7WI01z2QwaM8aYmGIz1gpYodKtc6sURaVqq6c83dYDT5Go+15Bo6T33HU4JkJqY04fTZPtBSBsKBYKzjrS4ucPAnJZ9fp0o2585mmnnGyLz/h2PJrCan3/zrfAFRlKmfBaqLwt0F0x1/kx/8Bbk/LZHcngGgAAAAASUVORK5CYII=', // 图片URL（支持base64）
              },
            },
            img2: {
              height: 24, // 图片高度
              width: 19, // 图片宽度
              color: 'transparent', // 设置透明色
              backgroundColor: {
                image:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAwCAYAAAB9sggoAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMqSURBVHgBzZmxb9NAFMa/cwJtBSUtVUEolShiqNi6lTEdmEEwsqQjDLCxMEBHmFD/gSYSKwhmkEjHbunQILHUkRpaUIuSplFDmsS8Z+WCMXZ8jt3YPyn1ne/sfnrv3bs7n4CNPcPICOAuFe/Rbx5nQ5H+R7EL5K8JUXDqIGRhxzCmJoCXVHyKEUICciRwlQTqtvt9UV+ouIho0A1g2SpO4z89S0UlipknC61bbwiKKb65gxhAVspeESJvlqnyAjGBYi0ry+zKKF1oJ8PxzgXNiJcwkKoUXzXElNgJmxaizNdYCePZQJbjZrF4CiOLFWQ5VsJawJYsi33DMBADSESV5sppWU9iCN7vN1DrdFFvd3HU+11KakiPJ3E7NYZbF8/DL9bAH1rYs2+/BrbfmZnA85tTmBv39fp/hPmOsdJxy7PPp8MTPN4+hB+SlsDv1f3BLltJT5K7zpn19HjCvB61DXw+OMG7Hw2zXmq0kKvUkaW+KjSBciBh7B52kxPsQsYqTgUO/DkhgrnSiyUKfkml2VF6xh74TOjCeLRK5sbUHCJs8cWELoxTiWRpakzpmYSDxYZKF05wLlvTa/jaODXrHIv3r15QerYObCBsYSwot1vH+vc6Jdy/k8irhcuqr9BvCFFFmMLYQnZBbCkWZR0EHhSdbg4lbLfZxqPtg77bGM5vnLM4x00mhZ/XFRCGMBb1cOsnKr87QQWZJMKwmF0Ui3lyPTWUIMmxZakztLC1cq0v6gGNOLcZQBVOrE6Bz/jKYzw5S9hSQaEho7u1KQvbrDb7o48Tp5y8A1Jwa1B2ZckyAnnpk9ncG9j/7eKs55TkFvi+hFUo8CVsuXq7PbB/KuFt0VkhNhBUGGd41RUppxCFkVoY1Kgs7PXCDEKmOKgxsu2bFldhLZfEKolkX2nfQzoRicWEhxuZqFypJEzHiEl6pAqGPw5/wIg59Qh8RqO1wkeMED4JsZ+COKHxWQ5Z7Q1GAImq8vGMSl8z+Gmzv6oyUoJCs+uKirUYUxh9kK3Sh6PlM7ScTlN6Ji2Ecjz/N9PyEU7vtGQxyBkAu42eL/Lgoi1w3m2l6sYfCLsFbbw4YygAAAAASUVORK5CYII=', // 图片URL（支持base64）'
              },
            },
            img3: {
              height: 24, // 图片高度
              width: 19, // 图片宽度
              color: 'transparent', // 设置透明色
              backgroundColor: {
                image:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAwCAYAAAB9sggoAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMwSURBVHgBzZm/TxRBFMe/bw6NaBSWBBLExFM6sbCQkngUWmgiFgZLsYXCP0GwsLbS0qNVC43RQgsPpUKKI/HskKXwRyDhMHJKlNtx3i3n/mD3bvbYu9tPcndv3k4u333vzY/dIfiQxW8ZpGgMEtdUM43mkAdRHmVrloz+XFAHcgStdEN0TivzNloJUVYJnFECTY/bJeqtMs+hPZiw5KhbnLC/K5FqlygmrcrnkdtBqqbSELSCJEBigo71zbIpkBJ3kBisiaol1OhrZwq9SGQq9Y5KjcnkCGMOdXfxj0BCSZww6jRW+TdhwtRqsEvSIpZQYUS5qpksYeU/S1UzQcLkJhkn/qeyA1H5kAOK68B2CfhdcvxGH3A8rT4ngZ4+REY6hd+YsBdZJehX7T6XrgMXxxEJgkdY9FTWE8W8fgq8f4VIUEfO3YwWMU7d+JRtdx5WnyOOv7gGzCsxG+u2780TYOQytClvr7qbJH98l4gLrr17U077bta+gbqowu/qN9yeeEel0YuG8BU+E6+wjTXH5jRrRQueibVKvMIWc47NU4culNoTsejTBfNxwTs6ubaWC8DnT3abI3VjEtqUf84hFmGPH4RPGwNpNXIno9SbScapTb+zgXmsVHsu+2IChQVoI5EPcjcWsfEpb3t7S6V3UaWyYLd5gj09BAwO1f8vQg6xCOPRNnxhr3/kCvBw2qmzwqKeMJEKjFi8o9ItxL3A12JnaynI3bxtT3W5qgnlgwqfiVfYcsGxdUallGbYJf0a41mdX8EYAXstXsDfvXTqizk7jLqEFH40YbyNmXdtZaoRKa7v7csDQSdiIYUfTdhX09sOEsSczwBXb0IHOto7F3ZNX1hl7aPdLbVvgu3pta8PqfQNnoEWMjyN0YSNTSBWCPlal9v3lEQiocJcz5BBtEmY9xkyiPYIC9hK+2mPsDqFz7AwE63G9wwZhBImnqHVlP8u1esiYJWfo6VQ1n8KEoSwz3LEfbQE2oRlzej0tIvfOjDjfs3YNKydWzrRYirCyDDUnRwcbWLkTLWTyJAxoF3P5HfYRzjqtIQPJmg/ZwAqbVKq4z81uKzSbNhONYx/rgbqzKc6tTwAAAAASUVORK5CYII=', // 图片URL（支持base64）
              },
            },
            rank1: {
              // color: '#FF9F22',
              // fontSize: 13,
              // width: 20,
              // height: 24,
              // backgroundColor: '#FFFAEB',
              // borderRadius: 4, // 设置圆角
              // align: 'center',
              color: '#FF9F22',
              backgroundColor: '#FFFAEB',
              fontSize: 13,
              width: 20,
              // height: 24,
              align: 'center',
            },
            rank2: {
              color: '#0CC1E2',
              fontSize: 13,
              width: 20,
              // height: 24,
              backgroundColor: '#E8FFFF', // 设置内边距
              borderRadius: 4,
              align: 'center',
            },
            rank3: {
              color: '#FF663E',
              fontSize: 13,
              width: 20,
              // height: 24,
              backgroundColor: '#FFF1E8',
              borderRadius: 4, // 设置圆角
              align: 'center',
            },
            rank: {
              color: '#999999',
              fontSize: 13,
              width: 20,
              height: 24,
              align: 'center',
            },
            category: {
              color: '#1F1F1F',
              fontSize: 12,
              lineHeight: 40,
              fontFamily: 'DIN Blod', // 设置宽度以适应文本
              align: 'right', // 左对齐
              width: 90,
            },
          },
        },
        axisLine: {
          show: false, // 隐藏y轴刻度线
        },
        axisTick: {
          show: false, // 隐藏y轴刻度线
        },
      },
      series: [
        {
          name: type.value === 'categoryProportionOrderBySales' ? '销售额' : '毛利额',
          type: 'bar',
          data: dataset,
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
          },
          barMaxWidth: 22,
          label: {
            show: true,
            position: 'right',
            fontSize: 12,
            fontFamily: 'DIN Blod',
            color: '#1F1F1F',
            formatter: ({ data: d }) => {
              const { value, unit } = formatMoneyObj(d);
              const percent = total !== 0 ? ((d / total) * 100).toFixed(1) : 0;
              return `{a|${value} ${unit}}\n{p|${percent}%}`;
            },
            rich: {
              a: {
                color: '#1F1F1F',
                fontSize: 12,
                lineHeight: 18,
                fontWeight: 700,
                fontFamily: 'DIN Blod',
              },
              p: {
                color: '#999999',
                fontSize: 11,
                lineHeight: 18,
                fontWeight: 400,
              },
            },
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const init = () => {
    initEcharts(document.getElementById('top10-chart') as HTMLElement);
  };
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: min(16px, 1vw);
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 24px;
      padding-left: 8px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #02b96b;
        margin-right: min(8px, 0.5vw);
        border-radius: 15px;
      }
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: min(14px, 0.8vw);
        color: #1f1f1f;
        :deep(.el-radio-group) {
          flex-wrap: nowrap;
        }
        :deep(.el-radio-button__inner) {
          padding: min(8px, 0.5vw) min(16px, 0.9vw);
        }
      }
    }
    .chart-container {
      width: 100%;
      .chart-area {
        width: 100%;
        height: 440px;
      }
    }
  }
</style>
