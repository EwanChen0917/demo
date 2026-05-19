<template>
  <div class="card card-flush" :class="[`mb-${marginBottom}`, `py-${paddingY}`]">
    <div
      class="card-header align-items-center min-h-50px"
      :class="`justify-content-${position}`"
      v-if="title"
    >
      <div class="card-title">
        <div class="text-dark fw-bold fs-5">
          {{ title }}
          <slot name="statusTag"></slot>
        </div>
      </div>
      <div v-if="$slots.status" class="card-toolbar">
        <div
          class="rounded-circle w-15px h-15px"
          :class="[status ? 'bg-success' : 'bg-light']"
        ></div>
      </div>
      <div class="ms-5" :class="[grow ? 'flex-grow-1' : '']">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="card-body pt-0">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      title?: string;
      status?: number;
      position?: string;
      grow?: boolean;
      marginBottom?: number;
      paddingY?: number;
    }>(),
    {
      title: '',
      status: 0,
      position: '',
      marginBottom: 5,
      paddingY: 4,
    }
  );
</script>
