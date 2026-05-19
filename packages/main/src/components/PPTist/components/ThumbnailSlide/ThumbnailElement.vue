<template>
  <div
    class="base-element"
    :class="`base-element-${elementInfo.id}`"
    :style="{
      zIndex: elementIndex,
    }"
  >
    <component :is="currentElementComponent" :elementInfo="elementInfo" target="thumbnail" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElementTypes, type PPTElement } from '@/components/PPTist/types/slides';

  import BaseImageElement from '@/components/PPTist/components/element/ImageElement/BaseImageElement.vue';
  import BaseTextElement from '@/components/PPTist/components/element/TextElement/BaseTextElement.vue';
  import BaseShapeElement from '@/components/PPTist/components/element/ShapeElement/BaseShapeElement.vue';
  import BaseLineElement from '@/components/PPTist/components/element/LineElement/BaseLineElement.vue';
  import BaseChartElement from '@/components/PPTist/components/element/ChartElement/BaseChartElement.vue';
  import BaseTableElement from '@/components/PPTist/components/element/TableElement/BaseTableElement.vue';
  import BaseLatexElement from '@/components/PPTist/components/element/LatexElement/BaseLatexElement.vue';
  import BaseVideoElement from '@/components/PPTist/components/element/VideoElement/BaseVideoElement.vue';
  import BaseAudioElement from '@/components/PPTist/components/element/AudioElement/BaseAudioElement.vue';

  const props = defineProps<{
    elementInfo: PPTElement;
    elementIndex: number;
  }>();

  const currentElementComponent = computed<unknown>(() => {
    const elementTypeMap = {
      [ElementTypes.IMAGE]: BaseImageElement,
      [ElementTypes.TEXT]: BaseTextElement,
      [ElementTypes.SHAPE]: BaseShapeElement,
      [ElementTypes.LINE]: BaseLineElement,
      [ElementTypes.CHART]: BaseChartElement,
      [ElementTypes.TABLE]: BaseTableElement,
      [ElementTypes.LATEX]: BaseLatexElement,
      [ElementTypes.VIDEO]: BaseVideoElement,
      [ElementTypes.AUDIO]: BaseAudioElement,
    };
    return elementTypeMap[props.elementInfo.type] || null;
  });
</script>
