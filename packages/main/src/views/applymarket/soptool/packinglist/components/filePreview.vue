<template>
  <div
    v-if="visible"
    class="el-image-viewer__wrapper"
    style="z-index: 2023"
    @wheel.prevent="scaleWheel"
  >
    <div class="el-image-viewer__mask"></div>
    <span class="el-image-viewer__btn el-image-viewer__close" @click="$emit('close')">
      <el-icon><Close /></el-icon>
    </span>
    <span class="el-image-viewer__btn el-image-viewer__prev">
      <el-icon :disabled="pdfParams.pageNumber == 1" @click="prevPage"><ArrowLeft /></el-icon>
    </span>
    <span class="el-image-viewer__btn el-image-viewer__next">
      <el-icon :disabled="pdfParams.pageNumber == pdfParams.total" @click="nextPage">
        <ArrowRight />
      </el-icon>
    </span>
    <div class="el-image-viewer__btn el-image-viewer__actions" style="z-index: 1">
      <div class="el-image-viewer__actions__inner">
        <el-icon @click="changeSmall">
          <ZoomOut />
        </el-icon>
        <el-icon @click="changeLarge">
          <ZoomIn />
        </el-icon>
        <el-icon @click="download">
          <Download />
        </el-icon>
        <el-icon @click="clockwise">
          <RefreshLeft />
        </el-icon>
        <el-icon @click="anticlockwise">
          <RefreshRight />
        </el-icon>
      </div>
    </div>
    <div :ref="refs.box" class="el-image-viewer__canvas pdf-container" @mousedown="dragstart">
      <canvas id="pdf-render"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { debounce } from 'lodash-es';
  import {
    Close,
    ArrowLeft,
    ArrowRight,
    ZoomOut,
    ZoomIn,
    RefreshLeft,
    RefreshRight,
    Download,
  } from '@element-plus/icons-vue';
  import * as pdfjs from 'pdfjs-dist';
  import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      url: string;
    }>(),
    {}
  );

  const refs = {
    wrapper: ref<HTMLElement | null>(null), // pdf外层容器
    box: ref<HTMLElement | null>(null), // pdf容器，用于拖拽
  };

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const pdfParams = reactive({
    pageNumber: 1, // 当前页
    total: 0, // 总页数
  });

  // 不要定义为ref或reactive格式，就定义为普通的变量
  let pdfDoc = null;
  onMounted(async () => {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    // 此文件位于public/test2.pdf
    pdfjs.getDocument(props.url).promise.then((doc) => {
      pdfDoc = doc;
      pdfParams.total = doc.numPages;
      getPdfPage(1);
    });
  });

  const dragData = reactive({
    x: 0, // 拖拽初始化时的x坐标
    y: 0, // 拖拽初始化时的y坐标
    left: 0, // 拖拽结束时的x偏移量
    top: 0, // 拖拽结束时的y偏移量
    firstX: 0, // 初始x坐标
    firstY: 0, // 初始y坐标
  });
  const scaleData = reactive({
    scale: 1, // 缩放比例
    scaleNum: 0.1, // 滚轮缩放比例
    scaleMax: 10, // 最大缩放比例
    scaleMin: 0.5, // 最小缩放比例
    scaleBtn: 0.25, // 缩放按钮缩放比例
    rotate: 0, // 旋转角度
  });

  const pixelRatio = ref(1);
  const transform = ref(null);
  // 加载pdf的某一页
  const getPdfPage = debounce(async (number) => {
    const page = await pdfDoc.getPage(number);
    const canvas = document.getElementById('pdf-render');
    const context = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    // console.log('window.devicePixelRatio', window.devicePixelRatio);
    const backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    pixelRatio.value = devicePixelRatio / backingStoreRatio;
    /* console.log(
'devicePixelRatio:',
devicePixelRatio,
',backingStoreRatio:',
backingStoreRatio,
',pixelRatio:',
pixelRatio.value
); */
    if (pixelRatio.value !== 1) transform.value = [pixelRatio.value, 0, 0, pixelRatio.value, 0, 0];
    const viewport = page.getViewport({ scale: scaleData.scale });
    canvas.width = viewport.width * pixelRatio.value;
    canvas.height = viewport.height * pixelRatio.value;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const renderContext = {
      canvasContext: context,
      viewport,
      transform: transform.value,
    };
    // 进行渲染
    await page.render(renderContext);
  }, 30);
  // 下一页功能
  const prevPage = () => {
    if (pdfParams.pageNumber > 1) {
      pdfParams.pageNumber -= 1;
    } else {
      pdfParams.pageNumber = 1;
    }
    getPdfPage(pdfParams.pageNumber);
  };
  // 上一页功能
  const nextPage = () => {
    if (pdfParams.pageNumber < pdfParams.total) {
      pdfParams.pageNumber += 1;
    } else {
      pdfParams.pageNumber = pdfParams.total;
    }
    getPdfPage(pdfParams.pageNumber);
  };

  const changeLarge = () => {
    if (scaleData.scale === scaleData.scaleMax) return;
    scaleData.scale += scaleData.scaleBtn;
    getPdfPage(pdfParams.pageNumber);
  };

  const changeSmall = () => {
    if (scaleData.scale === scaleData.scaleMin) return;
    scaleData.scale -= scaleData.scaleBtn;
    getPdfPage(pdfParams.pageNumber);
  };

  const download = () => {
    router.push(props.url);
  };

  // 拖拽（box容器拖拽）
  const dragstart = (e: MouseEvent) => {
    refs.box.value.style.transition = 'none';
    e.preventDefault(); // 阻止默认事件
    const box = refs.box.value as HTMLElement;
    // const wrapper = refs.wrapper.value as HTMLElement;
    dragData.x = e.pageX - box.offsetLeft;
    dragData.y = e.pageY - box.offsetTop;

    // 添加鼠标移动事件
    document.addEventListener('mousemove', move);

    function move(event: any) {
      // 计算元素的位置
      dragData.left = event.pageX - dragData.x;
      dragData.top = event.pageY - dragData.y;
      // 边界判断可以在这里添加 ↓

      // 设置元素的位置
      box.style.left = `${dragData.left}px`;
      box.style.top = `${dragData.top}px`;
    }

    // 添加鼠标抬起事件，鼠标抬起，将事件移除
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', move);
    });
    // 鼠标离开父级元素，把事件移除
    document.addEventListener('mouseout', function () {
      document.removeEventListener('mousemove', move);
    });
  };

  // 旋转
  const clockwise = () => {
    scaleData.rotate += 90;
    boxTransform();
  };
  const anticlockwise = () => {
    scaleData.rotate -= 90;
    boxTransform();
  };

  // box 容器也要跟着变化
  const boxTransform = () => {
    refs.box.value.style.transform = `translate(-50%, -50%) rotate(${scaleData.rotate}deg)`;
  };

  // 鼠标滚轮缩放
  const scaleWheel = (e: any) => {
    const dy = -e.deltaY || e.wheelDeltaY;
    if (dy < 0) {
      scaleData.scale -= scaleData.scaleNum;
    } else {
      // console.log('放大');
      scaleData.scale += scaleData.scaleNum;
    }
    // 边界判断
    if (scaleData.scale >= scaleData.scaleMax) {
      scaleData.scale = scaleData.scaleMax;
      return;
    }
    if (scaleData.scale <= scaleData.scaleMin) {
      scaleData.scale = scaleData.scaleMin;
      return;
    }
    getPdfPage(pdfParams.pageNumber);
    // boxTransform();
  };
</script>

<style scoped lang="scss">
  .wrapper {
    height: 80vh;
    background-color: #262626;
    position: relative;
    overflow: hidden;
  }

  .pdf-container {
    width: 80%;
    height: 100%;
    object-fit: contain;
    user-select: none; /* 不可选中,为了拖拽时不让文字高亮 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
