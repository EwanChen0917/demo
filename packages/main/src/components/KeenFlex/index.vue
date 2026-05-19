<template>
  <!--begin::上下布局（默认）-->
  <div v-if="$slots['default']" class="d-flex flex-column gap-7 gap-lg-10">
    <slot></slot>
  </div>
  <!--end::上下布局（默认）-->

  <!--begin::左右布局-->
  <div
    v-if="$slots['auto'] && $slots['fluid']"
    class="d-flex gap-7 gap-lg-10"
    :class="
      reverse ? ['flex-column-revers', 'flex-lg-row-reverse'] : ['flex-column', 'flex-lg-row']
    "
  >
    <div
      class="w-100 d-flex flex-column flex-lg-row-auto gap-7 gap-lg-10"
      :class="[`w-lg-${autoWidth}`]"
    >
      <slot name="auto"></slot>
    </div>
    <div class="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
      <slot name="fluid"></slot>
    </div>
  </div>
  <!--end::左右布局-->

  <!--begin::等宽布局-->
  <div v-if="$slots['fluid-item'] && fluids" class="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
    <div v-for="(_, idx) in Array(fluids).fill(null)" :key="idx" class="flex-row-fluid">
      <slot name="fluid-item" :idx="idx"></slot>
    </div>
  </div>
  <!--end::等宽布局-->
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      direction?: 'horizontal' | 'vertical';
      reverse?: boolean; // 默认第一个为固定值，其余占用剩余空间，reverse 为 true 时则相反
      autoWidth?: string; // 固定值的宽度，默认 300px
      fluids?: number;
    }>(),
    {
      direction: 'horizontal',
      reverse: false,
      autoWidth: '300px',
    }
  );
</script>
