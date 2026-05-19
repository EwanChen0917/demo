<template>
  <span ref="countUpRef"></span>
</template>

<script setup lang="ts">
  import { CountUp } from 'countup.js';
  const props = withDefaults(
    defineProps<{
      endVal: number;
      options?: any;
    }>(),
    { endVal: 0, options: {}, prefix: '' }
  );
  const defineOption = {
    startVal: 0, // number to start at (0)
    decimalPlaces: 0, // number of decimal places (0)
    duration: 1, // animation duration in seconds (2)
    useGrouping: true, // example: 1,000 vs 1000 (true)
    useEasing: true, // ease animation (true)
    smartEasingThreshold: 999, // smooth easing for large numbers above this if useEasing (999)
    smartEasingAmount: 333, // amount to be eased for numbers above threshold (333)
    separator: ',', // grouping separator (',')
    decimal: '.', // decimal ('.')
    // easingFn: easing function for animation (easeOutExpo)
    //easingFn: (t: number, b: number, c: number, d: number) => number,
    //formattingFn: (n: number) => string, // this function formats result
    prefix: '' // text prepended to result
    //suffix: string, // text appended to result
    //numerals: string[], // numeral glyph substitution
  };
  let countUpRef = ref();
  const countUpFn = () => {
    const countUpOptions = Object.assign({}, defineOption, props.options);
    const countUp = new CountUp(countUpRef.value, props.endVal, countUpOptions);
    countUp.start();
  };

  onMounted(() => {
    countUpFn();
  });
</script>

<style lang="scss" scoped></style>
