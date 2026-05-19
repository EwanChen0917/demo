<template>
  <div class="common-element-operate">
    <BorderLine
      class="operate-border-line"
      v-for="line in borderLines"
      :key="line.type"
      :type="line.type"
      :style="line.style"
    />
    <template v-if="handlerVisible">
      <ResizeHandler
        class="operate-resize-handler"
        v-for="point in resizeHandlers"
        :key="point.direction"
        :type="point.direction"
        :rotate="elementInfo.rotate"
        :style="point.style"
        @mousedown.stop="($event) => scaleElement($event, elementInfo, point.direction)"
      />
      <RotateHandler
        class="operate-rotate-handler"
        v-if="!cannotRotate"
        :style="{ left: scaleWidth / 2 + 'px' }"
        @mousedown.stop="($event) => rotateElement($event, elementInfo)"
      />
    </template>
  </div>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '@/store/modules/main';
  import { useSlidesStore } from '@/store/modules/slides';
  import type {
    PPTVideoElement,
    PPTLatexElement,
    PPTAudioElement,
    PPTChartElement,
  } from '@/components/PPTist/types/slides';
  import type { OperateResizeHandlers } from '@/components/PPTist/types/edit';
  import useCommonOperate from '../hooks/useCommonOperate';

  import RotateHandler from './RotateHandler.vue';
  import ResizeHandler from './ResizeHandler.vue';
  import BorderLine from './BorderLine.vue';

  /* export default {
    inheritAttrs: false,
  }; */

  type PPTElement = PPTVideoElement | PPTLatexElement | PPTAudioElement | PPTChartElement;

  const props = defineProps<{
    elementInfo: PPTElement;
    handlerVisible: boolean;
    rotateElement: (e: MouseEvent, element: PPTElement) => void;
    scaleElement: (e: MouseEvent, element: PPTElement, command: OperateResizeHandlers) => void;
  }>();

  const { canvasScale } = storeToRefs(useMainStore());

  const scaleWidth = computed(() => props.elementInfo.width * canvasScale.value);
  const scaleHeight = computed(() => props.elementInfo.height * canvasScale.value);
  const { resizeHandlers, borderLines } = useCommonOperate(scaleWidth, scaleHeight);

  const cannotRotate = computed(() => ['chart', 'video', 'audio'].includes(props.elementInfo.type));
</script>
