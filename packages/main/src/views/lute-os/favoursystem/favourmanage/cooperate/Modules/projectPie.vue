<template>
  <canvas ref="projectPieRef" id="projectPieRef"></canvas>
</template>

<script setup lang="ts">
  const props = defineProps<{
    seriesData: any;
  }>();

  const projectPieRef = ref();
  let KTProjectList = function () {
    // init chart
    let element = document.getElementById('projectPieRef') as any;

    if (!element) {
      return;
    }

    let config = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: props.seriesData,
            backgroundColor: ['#00A3FF', '#50CD89', '#E4E6EF']
          }
        ],
        labels: ['Active', 'Completed', 'Yet to start']
      },
      options: {
        chart: {
          fontFamily: 'inherit'
        },
        borderWidth: 0,
        cutout: '75%',
        cutoutPercentage: 65,
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        stroke: {
          width: 0
        },
        tooltips: {
          enabled: true,
          intersect: false,
          mode: 'nearest',
          bodySpacing: 5,
          yPadding: 10,
          xPadding: 10,
          caretPadding: 0,
          displayColors: false,
          backgroundColor: '#20D489',
          titleFontColor: '#ffffff',
          cornerRadius: 4,
          footerSpacing: 0,
          titleSpacing: 0
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };
    let ctx = element.getContext('2d');
    new window.Chart(ctx, config);
  };

  if (props.seriesData.length > 0) {
    nextTick(() => {
      KTProjectList();
    });
  }
</script>
<style scoped lang="scss"></style>
