<template>
  <VueFlow ref="vueFlowRef" :nodes="showNodes" :edges="showEdges" fit-view-on-init>
    <!--    <template #edge-custom="edgeProps">
      <CustomEdge v-bind="edgeProps" />
    </template>-->

    <!--    <Background />-->
  </VueFlow>
</template>

<script setup lang="ts">
  import { MarkerType, VueFlow, useVueFlow } from '@vue-flow/core';
  import { Background } from '@vue-flow/background';
  import CustomEdge from './customEdge.vue';

  const props = defineProps<{
    data: any;
    async?: boolean;
  }>();

  const { setViewport } = useVueFlow();
  const vueFlowRef = ref();

  const nodes = ref([]);
  const showNodes = ref([]);
  const showEdges = ref([]);
  let index = 0;
  let timer = null;

  const getEdges = (id, source, target, type = 'step') => {
    return {
      id,
      source,
      target,
      type,
      animated: true,
      style: { stroke: '#faba6b' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#faba6b',
      },
    };
  };

  const edges = ref([]);

  watch(
    () => props.data,
    (val) => {
      index = 0;
      showNodes.value = [];
      showEdges.value = [];
      if (timer) clearInterval(timer);
      setViewport({ x: 0, y: 0, zoom: 0.8 });
      if (val?.nodes) {
        edges.value =
          val?.edges?.map((item) => {
            return getEdges(item.id, item.source, item.target, item.type);
          }) || [];
        nodes.value = val?.nodes || [];
        if (props?.async) {
          timer = setInterval(() => {
            if (index > nodes.value.length) clearInterval(timer);
            showNodes.value.push(nodes.value[index]);
            showEdges.value.push(edges.value[index]);
            index++;
            setViewport({ x: 0, y: 0, zoom: 0.8 });
          }, 1000);
        } else {
          showNodes.value = nodes.value;
          showEdges.value = edges.value;
        }
      } else {
        showNodes.value = [
          {
            id: '1',
            position: { x: 250, y: 250 },
            data: { label: '暂无思考过程' },
            style: { backgroundColor: '#eeeeee', borderColor: 'transparent' },
          },
        ];
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
</script>

<style scoped lang="scss">
  /* .vue-flow__minimap {
    transform: scale(25%);
    transform-origin: bottom right;
  }*/

  :deep(.vue-flow__handle) {
    opacity: 0;
    height: 0 !important;
    width: 0 !important;
    min-width: 0 !important;
    min-height: 0 !important;
  }

  :deep(.vue-flow__edges) {
    z-index: 9999 !important;
  }
</style>
