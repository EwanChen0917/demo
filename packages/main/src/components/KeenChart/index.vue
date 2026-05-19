<template>
  <div ref="chartRef" :id="id" :style="{ height }"></div>
</template>

<script setup lang="ts">
  import ApexCharts from 'apexcharts';
  import type { ApexOptions } from 'apexcharts';

  const props = withDefaults(
    defineProps<{
      id: string;
      options: ApexOptions;
      height?: number;
    }>(),
    {
      height: 300,
    }
  );

  const chart = ref<ApexCharts>();
  const chartRef = ref<HTMLDivElement>();

  const init = async () => {
    await nextTick();
    chart.value = new window.ApexCharts(chartRef.value, {
      ...props.options,
      chart: {
        height: props.height,
        ...props.options.chart,
      },
    });
    chart.value?.render();
  };

  const destroy = () => {
    chart.value?.destroy();
  };

  watch(
    () => props.options.series,
    () => {
      destroy();
      init();
    }
  );

  watch(props.options.series, () => {
    destroy();
    init();
  });

  onMounted(() => {
    init();
  });

  onBeforeUnmount(() => {
    destroy();
  });

  defineExpose({ init });
</script>
