<template>
  <div
    class="canvas"
    ref="canvasRef"
    @wheel="($event) => handleMousewheelCanvas($event)"
    @scroll="handleCanvasScroll"
    @mousedown="($event) => handleClickBlankArea($event)"
    @dblclick="($event) => handleDblClick($event)"
    v-contextmenu="contextmenus"
    v-click-outside="removeEditorAreaFocus"
  >
    <!--    {{ slideIndex }}-->
    <div
      class="slide-item"
      v-for="(slide, idx) in slides"
      :key="slide.id || idx"
      @click="slidesStore.updateSlideIndex(idx)"
      :ref="(el) => setSlideItemRef(el, idx)"
    >
      <ElementCreateSelection
        v-if="creatingElement"
        @created="(data) => insertElementFromCreateSelection(data)"
      />
      <ShapeCreateCanvas v-if="creatingCustomShape" @created="(data) => insertCustomShape(data)" />
      <!--      <div
        class="viewport-wrapper"
        :style="{
          width: viewportStyles.width * canvasScale + 'px',
          height: viewportStyles.height * canvasScale + 'px',
          left: viewportStyles.left + 'px',
          top: viewportStyles.top + (viewportStyles.height * canvasScale + 12) * idx + 'px',
        }"
      >-->
      <div class="slide-index">{{ idx + 1 }} / {{ slides?.length }}</div>
      <div
        class="viewport-wrapper"
        :style="{
          width: viewportStyles.width * canvasScale + 'px',
          height: viewportStyles.height * canvasScale + 'px',
        }"
      >
        <div class="operates" v-if="!isShare && idx === slideIndex">
          <AlignmentLine
            v-for="(line, index) in alignmentLines"
            :key="index"
            :type="line.type"
            :axis="line.axis"
            :length="line.length"
            :canvasScale="canvasScale"
          />
          <MultiSelectOperate
            v-if="activeElementIdList.length > 1"
            :elementList="elementList"
            :scaleMultiElement="scaleMultiElement"
          />
          <Operate
            v-for="element in elementList"
            :key="element.id"
            :elementInfo="element"
            :isSelected="activeElementIdList.includes(element.id)"
            :isActive="handleElementId === element.id"
            :isActiveGroupElement="activeGroupElementId === element.id"
            :isMultiSelect="activeElementIdList.length > 1"
            :rotateElement="rotateElement"
            :scaleElement="scaleElement"
            :openLinkDialog="openLinkDialog"
            :dragLineElement="dragLineElement"
            :moveShapeKeypoint="moveShapeKeypoint"
            v-show="!hiddenElementIdList.includes(element.id)"
          />
          <ViewportBackground :background="slide?.background" />
        </div>
        <div class="operates" v-else-if="!isShare">
          <ViewportBackground :background="slide?.background" />
        </div>

        <div
          class="viewport"
          :ref="(el) => setRef(el, idx)"
          :style="{ transform: `scale(${canvasScale})` }"
        >
          <!--          <MouseSelection
            v-if="mouseSelectionVisible"
            :top="mouseSelection.top"
            :left="mouseSelection.left"
            :width="mouseSelection.width"
            :height="mouseSelection.height"
            :quadrant="mouseSelectionQuadrant"
          />-->
          <!--          {{ elementList }}-->
          <!--          {{ slide?.elements }}-->
          <template v-if="isShare">
            <ThumbnailSlide class="slide-item" :slide="slide" />
          </template>
          <template v-else>
            <template v-if="idx === slideIndex">
              <EditableElement
                v-for="(element, index) in elementList"
                :key="element.id"
                :elementInfo="element"
                :elementIndex="index + 1"
                :isMultiSelect="activeElementIdList.length > 1"
                :selectElement="selectElement"
                :openLinkDialog="openLinkDialog"
                v-show="!hiddenElementIdList.includes(element.id)"
              />
            </template>
            <template v-else>
              <ThumbnailSlide class="slide-item" :slide="slide" />
            </template>
          </template>
        </div>
      </div>

      <div class="drag-mask" v-if="!isShare && spaceKeyState && idx === slideIndex"></div>

      <Ruler
        :viewportStyles="viewportStyles"
        :elementList="idx === slideIndex ? elementList : slide?.elements"
        v-if="!isShare && showRuler && idx === slideIndex"
      />

      <Modal v-model:visible="linkDialogVisible" :width="540">
        <LinkDialog @close="linkDialogVisible = false" />
      </Modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    nextTick,
    onMounted,
    onUnmounted,
    provide,
    computed,
    ref,
    watch,
    watchEffect,
    useTemplateRef,
  } from 'vue';
  import { throttle, debounce } from 'lodash-es';
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '@/store/modules/main';
  import { useSlidesStore } from '@/store/modules/slides';
  import { useKeyboardStore } from '@/store/modules/keyboard';
  import type { AlignmentLineProps, CreateCustomShapeData } from '@/components/PPTist/types/edit';
  import { KEYS } from '@/components/PPTist/configs/hotkey';
  import useDeleteElement from '@/components/PPTist/hooks/useDeleteElement';
  import useCopyAndPasteElement from '@/components/PPTist/hooks/useCopyAndPasteElement';
  import useSelectElement from '@/components/PPTist/hooks/useSelectElement';
  import useScaleCanvas from '@/components/PPTist/hooks/useScaleCanvas';
  import useScreening from '@/components/PPTist/hooks/useScreening';
  import useSlideHandler from '@/components/PPTist/hooks/useSlideHandler';
  import useCreateElement from '@/components/PPTist/hooks/useCreateElement';
  import type { PPTElement, PPTShapeElement } from '@/components/PPTist/types/slides';
  import { injectKeySlideScale } from '@/components/PPTist/types/injectKey';
  import { removeAllRanges } from '@/components/PPTist/utils/selection';
  import Modal from '@/components/PPTist/components/Modal.vue';
  import type { ContextmenuItem } from '@/components/PPTist/components/Contextmenu/types';

  import { newProductApi } from '@/api';
  import { ElMessage } from 'element-plus/es';
  import dayjs from 'dayjs';
  import useViewportSize from './hooks/useViewportSize';
  import useMouseSelection from './hooks/useMouseSelection';
  import useDropImageOrText from './hooks/useDropImageOrText';
  import useRotateElement from './hooks/useRotateElement';
  import useScaleElement from './hooks/useScaleElement';
  import useSelectAndMoveElement from './hooks/useSelectElement';
  import useDragElement from './hooks/useDragElement';
  import useDragLineElement from './hooks/useDragLineElement';
  import useMoveShapeKeypoint from './hooks/useMoveShapeKeypoint';
  import useInsertFromCreateSelection from './hooks/useInsertFromCreateSelection';

  import EditableElement from './EditableElement.vue';
  import MouseSelection from './MouseSelection.vue';
  import ViewportBackground from './ViewportBackground.vue';
  import AlignmentLine from './AlignmentLine.vue';
  import Ruler from './Ruler.vue';
  import ElementCreateSelection from './ElementCreateSelection.vue';
  import ShapeCreateCanvas from './ShapeCreateCanvas.vue';
  import MultiSelectOperate from './Operate/MultiSelectOperate.vue';
  import Operate from './Operate/index.vue';
  import LinkDialog from './LinkDialog.vue';

  const mainStore = useMainStore();
  const {
    activeElementIdList,
    activeGroupElementId,
    handleElementId,
    hiddenElementIdList,
    editorAreaFocus,
    gridLineSize,
    showRuler,
    creatingElement,
    creatingCustomShape,
    canvasScale,
    textFormatPainter,
  } = storeToRefs(mainStore);
  const slidesStore = useSlidesStore();
  const { currentSlide, slides, slideIndex, projectId, title } = storeToRefs(slidesStore);
  const { ctrlKeyState, spaceKeyState } = storeToRefs(useKeyboardStore());
  const isShare = inject('isShare');
  // const viewportRef = useTemplateRef<HTMLElement>('viewportRef');
  const viewportRefs = ref([]);
  const setRef = (el: HTMLElement, idx: number) => {
    if (el) {
      viewportRefs.value[idx] = el;
    }
  };
  const slideItemRefs = ref<HTMLElement[]>([]);
  const setSlideItemRef = (el: HTMLElement, idx: number) => {
    if (el) {
      slideItemRefs.value[idx] = el;
    }
  };
  const isAutoScrolling = ref(false);
  const isScrollDrivenIndexChange = ref(false);
  const viewportRef = computed(() => viewportRefs.value[slideIndex.value]);
  const alignmentLines = ref<AlignmentLineProps[]>([]);

  const linkDialogVisible = ref(false);
  const openLinkDialog = () => (linkDialogVisible.value = true);

  watch(handleElementId, () => {
    mainStore.setActiveGroupElementId('');
  });

  const elementList = ref<PPTElement[]>([]);
  const setLocalElementList = () => {
    elementList.value = currentSlide.value
      ? JSON.parse(JSON.stringify(currentSlide.value.elements))
      : [];
  };
  watchEffect(setLocalElementList);
  /* const elementList = computed(
    () => JSON.parse(JSON.stringify(slides.value[slideIndex.value]?.elements)) || []
  ); */

  const canvasRef = useTemplateRef<HTMLElement>('canvasRef');
  const { dragViewport, viewportStyles } = useViewportSize(canvasRef);

  useDropImageOrText(canvasRef);

  const { mouseSelection, mouseSelectionVisible, mouseSelectionQuadrant, updateMouseSelection } =
    useMouseSelection(elementList, viewportRef);

  const { dragElement } = useDragElement(elementList, alignmentLines, canvasScale);
  const { dragLineElement } = useDragLineElement(elementList);
  const { selectElement } = useSelectAndMoveElement(elementList, dragElement);
  const { scaleElement, scaleMultiElement } = useScaleElement(
    elementList,
    alignmentLines,
    canvasScale
  );
  const { rotateElement } = useRotateElement(elementList, viewportRef, canvasScale);
  const { moveShapeKeypoint } = useMoveShapeKeypoint(elementList, canvasScale);

  const { selectAllElements } = useSelectElement();
  const { deleteAllElements } = useDeleteElement();
  const { pasteElement } = useCopyAndPasteElement();
  const { enterScreeningFromStart } = useScreening();
  // const { updateSlideIndex } = useSlideHandler();
  const { createTextElement, createShapeElement } = useCreateElement();

  // 组件渲染时，如果存在元素焦点，需要清除
  // 这种情况存在于：有焦点元素的情况下进入了放映模式，再退出时，需要清除原先的焦点（因为可能已经切换了页面）
  onMounted(() => {
    if (activeElementIdList.value.length) {
      nextTick(() => mainStore.setActiveElementIdList([]));
    }
    nextTick(() => {
      getMostVisibleSlideIndex();
    });
  });

  watch(
    () => slideIndex.value,
    (idx) => {
      if (isScrollDrivenIndexChange.value) {
        isScrollDrivenIndexChange.value = false;
        return;
      }
      const container = canvasRef.value;
      const el = slideItemRefs.value[idx];
      if (!container || !el) return;
      isAutoScrolling.value = true;
      const paddingTop = parseFloat(getComputedStyle(container).paddingTop || '0');
      const itemTop = el.offsetTop - paddingTop;
      const itemBottom = itemTop + el.offsetHeight;
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;
      let targetTop = viewTop;
      if (itemTop < viewTop) {
        targetTop = itemTop;
      } else if (itemBottom > viewBottom) {
        targetTop = itemBottom - container.clientHeight;
      } else {
        // 已经可见，无需滚动
        isAutoScrolling.value = false;
        return;
      }
      const maxTop = container.scrollHeight - container.clientHeight;
      targetTop = Math.max(0, Math.min(targetTop, maxTop));
      container.scrollTo({ top: targetTop, behavior: 'smooth' });
      let lastTop = -1;
      const waitForScrollEnd = () => {
        if (!canvasRef.value) {
          isAutoScrolling.value = false;
          return;
        }
        const curr = canvasRef.value.scrollTop;
        if (Math.abs(curr - targetTop) <= 1 || curr === lastTop) {
          setTimeout(() => (isAutoScrolling.value = false), 50);
          return;
        }
        lastTop = curr;
        requestAnimationFrame(waitForScrollEnd);
      };
      requestAnimationFrame(waitForScrollEnd);
    }
  );

  const debouncedSlidesUpdate = debounce(async (newSlides) => {
    console.log('更新slides', newSlides);
    console.log('projectId', projectId.value);
    try {
      const res = await newProductApi.luteosAiNpoProjectUpdatePpt({
        projectId: projectId.value,
        data: {
          title: title.value,
          slides: newSlides,
        },
      });
      slidesStore.setUpdateTime(dayjs()?.format('HH:mm:ss'));
    } catch (e) {
      ElMessage.warning('保存失败');
    }
  }, 300);

  // 修改 watch 监听器
  watch(
    () => slides.value,
    (newSlides) => {
      debouncedSlidesUpdate(newSlides);
    },
    {
      deep: true,
    }
  );

  // 点击画布的空白区域：清空焦点元素、设置画布焦点、清除文字选区、清空格式刷状态
  const handleClickBlankArea = (e: MouseEvent) => {
    if (activeElementIdList.value.length) mainStore.setActiveElementIdList([]);

    if (!spaceKeyState.value) updateMouseSelection(e);
    else dragViewport(e);

    if (!editorAreaFocus.value) mainStore.setEditorareaFocus(true);
    if (textFormatPainter.value) mainStore.setTextFormatPainter(null);
    removeAllRanges();
  };

  // 双击空白处插入文本
  const handleDblClick = (e: MouseEvent) => {
    if (activeElementIdList.value.length || creatingElement.value || creatingCustomShape.value)
      return;
    if (!viewportRef.value) return;

    const viewportRect = viewportRef.value.getBoundingClientRect();
    const left = (e.pageX - viewportRect.x) / canvasScale.value;
    const top = (e.pageY - viewportRect.y) / canvasScale.value;

    createTextElement({
      left,
      top,
      width: 200 / canvasScale.value, // 除以 canvasScale 是为了与点击选区创建的形式保持相同的宽度
      height: 0,
    });
  };

  // 画布注销时清空格式刷状态
  onUnmounted(() => {
    if (textFormatPainter.value) mainStore.setTextFormatPainter(null);
  });

  // 移除画布编辑区域焦点
  const removeEditorAreaFocus = () => {
    if (editorAreaFocus.value) mainStore.setEditorareaFocus(false);
  };

  // 滚动鼠标
  const { scaleCanvas } = useScaleCanvas();
  /* const throttleScaleCanvas = throttle(scaleCanvas, 100, { leading: true, trailing: false });
  const throttleUpdateSlideIndex = throttle(updateSlideIndex, 300, {
    leading: true,
    trailing: false,
  }); */

  const handleMousewheelCanvas = (e: WheelEvent) => {
    /* e.preventDefault();

    // 按住Ctrl键时：缩放画布
    if (ctrlKeyState.value) {
      if (e.deltaY > 0) throttleScaleCanvas('-');
      else if (e.deltaY < 0) throttleScaleCanvas('+');
    }
    // 上下翻页
    else if (e.deltaY > 0) throttleUpdateSlideIndex(KEYS.DOWN);
    else if (e.deltaY < 0) throttleUpdateSlideIndex(KEYS.UP); */
  };

  const getMostVisibleSlideIndex = () => {
    if (!canvasRef.value) return;
    const containerRect = canvasRef.value.getBoundingClientRect();
    let maxArea = -1;
    let maxIdx = slideIndex.value;
    for (let i = 0; i < slideItemRefs.value.length; i++) {
      const el = slideItemRefs.value[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const width =
        Math.min(containerRect.right, rect.right) - Math.max(containerRect.left, rect.left);
      const height =
        Math.min(containerRect.bottom, rect.bottom) - Math.max(containerRect.top, rect.top);
      const w = width > 0 ? width : 0;
      const h = height > 0 ? height : 0;
      const area = w * h;
      if (area > maxArea) {
        maxArea = area;
        maxIdx = i;
      }
    }
    if (maxIdx !== slideIndex.value) {
      isScrollDrivenIndexChange.value = true;
      slidesStore.updateSlideIndex(maxIdx);
    }
  };
  const handleCanvasScroll = debounce(() => {
    if (isAutoScrolling.value) return;
    getMostVisibleSlideIndex();
  }, 120);

  // 开关标尺
  const toggleRuler = () => {
    mainStore.setRulerState(!showRuler.value);
  };

  // 在鼠标绘制的范围插入元素
  const { insertElementFromCreateSelection, formatCreateSelection } =
    useInsertFromCreateSelection(viewportRef);

  // 插入自定义任意多边形
  const insertCustomShape = (data: CreateCustomShapeData) => {
    const { start, end, path, viewBox } = data;
    const position = formatCreateSelection({ start, end });
    if (position) {
      const supplement: Partial<PPTShapeElement> = {};
      if (data.fill) supplement.fill = data.fill;
      if (data.outline) supplement.outline = data.outline;
      createShapeElement(position, { path, viewBox }, supplement);
    }

    mainStore.setCreatingCustomShapeState(false);
  };

  const contextmenus = (): ContextmenuItem[] => {
    return isShare
      ? []
      : [
          {
            text: '粘贴',
            subText: 'Ctrl + V',
            handler: pasteElement,
          },
          {
            text: '全选',
            subText: 'Ctrl + A',
            handler: selectAllElements,
          },
          /* {
        text: '标尺',
        subText: showRuler.value ? '√' : '',
        handler: toggleRuler,
      }, */
          {
            text: '网格线',
            handler: () => mainStore.setGridLineSize(gridLineSize.value ? 0 : 50),
            children: [
              {
                text: '无',
                subText: gridLineSize.value === 0 ? '√' : '',
                handler: () => mainStore.setGridLineSize(0),
              },
              {
                text: '小',
                subText: gridLineSize.value === 25 ? '√' : '',
                handler: () => mainStore.setGridLineSize(25),
              },
              {
                text: '中',
                subText: gridLineSize.value === 50 ? '√' : '',
                handler: () => mainStore.setGridLineSize(50),
              },
              {
                text: '大',
                subText: gridLineSize.value === 100 ? '√' : '',
                handler: () => mainStore.setGridLineSize(100),
              },
            ],
          },
          {
            text: '重置当前页',
            handler: deleteAllElements,
          },
          { divider: true },
          {
            text: '幻灯片放映',
            subText: 'F5',
            handler: enterScreeningFromStart,
          },
        ];
  };

  provide(injectKeySlideScale, canvasScale);
</script>

<style lang="scss" scoped>
  .canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    height: 100%;
    padding: 16px 0;
    user-select: none;
    overflow: scroll;
    background-color: $lightGray;
    position: relative;
  }
  .drag-mask {
    cursor: grab;
    @include absolute-0();
  }

  .slide-item {
    padding: 16px 20px 20px 20px;
    background-color: #ffffff;
    border-radius: 10px;
    .slide-index {
      color: $N8;
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      margin-bottom: 16px;
    }
  }

  .viewport-wrapper {
    flex-shrink: 0;
    //position: absolute;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: content-box;
    //box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.01), 0 0 12px 0 rgba(0, 0, 0, 0.1);
  }
  .viewport {
    //position: absolute;
    //top: 0;
    //left: 0;
    transform-origin: 0 0;
  }
</style>
