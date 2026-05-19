<template>
  <div
    class="editable-element"
    ref="elementRef"
    :id="`editable-element-${elementInfo.id}`"
    :style="{
      zIndex: elementIndex,
    }"
  >
    <component
      :is="currentElementComponent"
      :elementInfo="elementInfo"
      :selectElement="selectElement"
      :contextmenus="contextmenus"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  import useLockElement from '@/components/PPTist/hooks/useLockElement';
  import useDeleteElement from '@/components/PPTist/hooks/useDeleteElement';
  import useCombineElement from '@/components/PPTist/hooks/useCombineElement';
  import useOrderElement from '@/components/PPTist/hooks/useOrderElement';
  import useAlignElementToCanvas from '@/components/PPTist/hooks/useAlignElementToCanvas';
  import useCopyAndPasteElement from '@/components/PPTist/hooks/useCopyAndPasteElement';
  import useSelectElement from '@/components/PPTist/hooks/useSelectElement';

  import { ElementOrderCommands, ElementAlignCommands } from '@/components/PPTist/types/edit';
  import { ElementTypes, type PPTElement } from '@/components/PPTist/types/slides';
  import type { ContextmenuItem } from '@/components/PPTist/components/Contextmenu/types';

  import ImageElement from '@/components/PPTist/components/element/ImageElement/index.vue';
  import TextElement from '@/components/PPTist/components/element/TextElement/index.vue';
  import ShapeElement from '@/components/PPTist/components/element/ShapeElement/index.vue';
  import LineElement from '@/components/PPTist/components/element/LineElement/index.vue';
  import ChartElement from '@/components/PPTist/components/element/ChartElement/index.vue';
  import TableElement from '@/components/PPTist/components/element/TableElement/index.vue';
  import LatexElement from '@/components/PPTist/components/element/LatexElement/index.vue';
  import VideoElement from '@/components/PPTist/components/element/VideoElement/index.vue';
  import AudioElement from '@/components/PPTist/components/element/AudioElement/index.vue';

  const props = defineProps<{
    elementInfo: PPTElement;
    elementIndex: number;
    isMultiSelect: boolean;
    selectElement: (e: MouseEvent | TouchEvent, element: PPTElement, canMove?: boolean) => void;
    openLinkDialog: () => void;
  }>();

  const currentElementComponent = computed<unknown>(() => {
    const elementTypeMap = {
      [ElementTypes.IMAGE]: ImageElement,
      [ElementTypes.TEXT]: TextElement,
      [ElementTypes.SHAPE]: ShapeElement,
      [ElementTypes.LINE]: LineElement,
      [ElementTypes.CHART]: ChartElement,
      [ElementTypes.TABLE]: TableElement,
      [ElementTypes.LATEX]: LatexElement,
      [ElementTypes.VIDEO]: VideoElement,
      [ElementTypes.AUDIO]: AudioElement,
    };
    return elementTypeMap[props.elementInfo.type] || null;
  });

  const { orderElement } = useOrderElement();
  const { alignElementToCanvas } = useAlignElementToCanvas();
  const { combineElements, uncombineElements } = useCombineElement();
  const { deleteElement } = useDeleteElement();
  const { lockElement, unlockElement } = useLockElement();
  const { copyElement, pasteElement, cutElement } = useCopyAndPasteElement();
  const { selectAllElements } = useSelectElement();

  const contextmenus = (): ContextmenuItem[] => {
    if (props.elementInfo.lock) {
      return [
        {
          text: '解锁',
          handler: () => unlockElement(props.elementInfo),
        },
      ];
    }

    return [
      {
        text: '剪切',
        subText: 'Ctrl + X',
        handler: cutElement,
      },
      {
        text: '复制',
        subText: 'Ctrl + C',
        handler: copyElement,
      },
      {
        text: '粘贴',
        subText: 'Ctrl + V',
        handler: pasteElement,
      },
      { divider: true },
      {
        text: '水平居中',
        handler: () => alignElementToCanvas(ElementAlignCommands.HORIZONTAL),
        children: [
          {
            text: '水平垂直居中',
            handler: () => alignElementToCanvas(ElementAlignCommands.CENTER),
          },
          {
            text: '水平居中',
            handler: () => alignElementToCanvas(ElementAlignCommands.HORIZONTAL),
          },
          { text: '左对齐', handler: () => alignElementToCanvas(ElementAlignCommands.LEFT) },
          { text: '右对齐', handler: () => alignElementToCanvas(ElementAlignCommands.RIGHT) },
        ],
      },
      {
        text: '垂直居中',
        handler: () => alignElementToCanvas(ElementAlignCommands.VERTICAL),
        children: [
          {
            text: '水平垂直居中',
            handler: () => alignElementToCanvas(ElementAlignCommands.CENTER),
          },
          { text: '垂直居中', handler: () => alignElementToCanvas(ElementAlignCommands.VERTICAL) },
          { text: '顶部对齐', handler: () => alignElementToCanvas(ElementAlignCommands.TOP) },
          { text: '底部对齐', handler: () => alignElementToCanvas(ElementAlignCommands.BOTTOM) },
        ],
      },
      { divider: true },
      {
        text: '置于顶层',
        disable: props.isMultiSelect && !props.elementInfo.groupId,
        handler: () => orderElement(props.elementInfo, ElementOrderCommands.TOP),
        children: [
          {
            text: '置于顶层',
            handler: () => orderElement(props.elementInfo, ElementOrderCommands.TOP),
          },
          {
            text: '上移一层',
            handler: () => orderElement(props.elementInfo, ElementOrderCommands.UP),
          },
        ],
      },
      {
        text: '置于底层',
        disable: props.isMultiSelect && !props.elementInfo.groupId,
        handler: () => orderElement(props.elementInfo, ElementOrderCommands.BOTTOM),
        children: [
          {
            text: '置于底层',
            handler: () => orderElement(props.elementInfo, ElementOrderCommands.BOTTOM),
          },
          {
            text: '下移一层',
            handler: () => orderElement(props.elementInfo, ElementOrderCommands.DOWN),
          },
        ],
      },
      { divider: true },
      {
        text: '设置链接',
        handler: props.openLinkDialog,
      },
      {
        text: props.elementInfo.groupId ? '取消组合' : '组合',
        subText: 'Ctrl + G',
        handler: props.elementInfo.groupId ? uncombineElements : combineElements,
        hide: !props.isMultiSelect,
      },
      {
        text: '全选',
        subText: 'Ctrl + A',
        handler: selectAllElements,
      },
      {
        text: '锁定',
        subText: 'Ctrl + L',
        handler: lockElement,
      },
      {
        text: '删除',
        subText: 'Delete',
        handler: deleteElement,
      },
    ];
  };
</script>
