<template>
  <!-- 预览模式 -->
  <div v-if="isPreviewMode" class="ppt-preview-container">
    <!-- 顶部导航栏 -->
    <div class="preview-header">
      <div class="header-tabs">
        <div class="tab-item">浏览器</div>
        <div class="tab-item">文件</div>
        <div class="tab-item active">PPT</div>
      </div>
      <div class="header-actions">
        <el-icon class="action-icon" @click="exitFullscreen"><FullScreen /></el-icon>
        <div class="divider"></div>
        <el-icon class="action-icon" @click="isPreviewMode = false"><Close /></el-icon>
      </div>
    </div>

    <!-- 文档信息栏 -->
    <div class="doc-info-bar">
      <div class="doc-title">{{ documentTitle }}</div>
      <div class="doc-actions">
        <el-icon class="doc-action" @click="downloadPPTX"><Download /></el-icon>
        <el-icon class="doc-action"><Share /></el-icon>
        <el-icon class="doc-action" @click="isPreviewMode = false"><Edit /></el-icon>
        <div class="divider"></div>
        <div class="present-btn" @click="startPresentation">
          <el-icon><VideoPlay /></el-icon>
          <span>演示</span>
        </div>
      </div>
    </div>

    <!-- 预览主体 -->
    <div class="preview-body">
      <!-- 左侧缩略图 -->
      <div class="thumbnail-panel" :class="{ collapsed: thumbnailCollapsed }">
        <div class="panel-header">
          <div class="view-toggle">
            <div class="toggle-btn active">
              <el-icon><Grid /></el-icon>
            </div>
            <div class="toggle-btn">
              <el-icon><List /></el-icon>
            </div>
          </div>
          <el-icon class="collapse-btn" @click="thumbnailCollapsed = !thumbnailCollapsed">
            <ArrowLeft v-if="!thumbnailCollapsed" />
            <ArrowRight v-if="thumbnailCollapsed" />
          </el-icon>
        </div>
        <div class="thumbnail-list" v-if="!thumbnailCollapsed">
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="thumbnail-item"
            :class="{ active: index === currentIndex }"
            @click="switchSlide(index)"
          >
            <canvas :ref="setThumbRef(index)" class="thumbnail-canvas"></canvas>
            <div class="slide-number">{{ index + 1 }}</div>
          </div>
        </div>
      </div>

      <!-- 主预览区域 -->
      <div class="main-preview">
        <div class="slide-viewer">
          <div class="slide-header">
            <span class="slide-pagination">{{ currentIndex + 1 }}/{{ slides.length }}</span>
            <el-icon class="more-icon"><MoreFilled /></el-icon>
          </div>
          <div class="slide-content">
            <canvas ref="previewCanvasRef" class="preview-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- 反馈按钮 -->
    <div class="feedback-btn">
      <el-icon><ChatDotRound /></el-icon>
      <span>反馈</span>
    </div>
  </div>

  <!-- 编辑模式 -->
  <div v-else class="pptist-like-editor">
    <div class="toolbar">
      <el-button-group>
        <el-button size="small" @click="addSlide">新建页</el-button>
        <el-button size="small" @click="duplicateSlide" :disabled="!currentSlide">复制页</el-button>
        <el-button size="small" @click="deleteSlide" :disabled="slides.length === 0">
          删除页
        </el-button>
      </el-button-group>
      <el-divider direction="vertical" />
      <el-button-group>
        <el-button size="small" @click="addText">文本</el-button>
        <el-button size="small" @click="addRect">矩形</el-button>
        <el-button size="small" @click="addCircle">圆形</el-button>
        <el-button size="small" @click="triggerImage">图片</el-button>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onPickImage"
        />
      </el-button-group>
      <el-divider direction="vertical" />
      <el-button-group>
        <el-button size="small" @click="exportPNG" :disabled="!currentSlide">导出PNG</el-button>
        <el-button size="small" @click="exportPPTX" :disabled="!currentSlide">导出PPTX</el-button>
        <el-button size="small" @click="isPreviewMode = true">预览</el-button>
      </el-button-group>
      <el-divider direction="vertical" />
      <el-button-group>
        <el-button size="small" @click="undo" :disabled="!canUndo">撤销</el-button>
        <el-button size="small" @click="redo" :disabled="!canRedo">重做</el-button>
      </el-button-group>
    </div>
    <div class="body">
      <div class="slides">
        <div
          class="slide-thumb"
          v-for="(s, i) in slides"
          :key="s.id"
          :class="{ active: i === currentIndex }"
          @click="switchSlide(i)"
        >
          <canvas :ref="setThumbRef(i)" class="thumb-canvas"></canvas>
          <div class="slide-number">{{ i + 1 }}</div>
        </div>
      </div>
      <div class="stage">
        <div class="stage-inner">
          <canvas ref="canvasRef" class="stage-canvas"></canvas>
        </div>
      </div>
      <div class="inspector" v-if="activeObject">
        <div class="panel-title">属性</div>
        <el-form label-width="60px" size="small">
          <el-form-item label="X">
            <el-input-number v-model="form.x" :step="1" @change="applyForm" />
          </el-form-item>
          <el-form-item label="Y">
            <el-input-number v-model="form.y" :step="1" @change="applyForm" />
          </el-form-item>
          <el-form-item label="W">
            <el-input-number v-model="form.w" :step="1" @change="applyForm" />
          </el-form-item>
          <el-form-item label="H">
            <el-input-number v-model="form.h" :step="1" @change="applyForm" />
          </el-form-item>
          <el-form-item label="填充" v-if="form.fill !== undefined">
            <el-color-picker v-model="form.fill" @change="applyForm" />
          </el-form-item>
          <el-form-item label="颜色" v-if="form.fill === undefined">
            <el-color-picker v-model="form.color" @change="applyForm" />
          </el-form-item>
          <el-form-item label="字号" v-if="form.fontSize">
            <el-input-number v-model="form.fontSize" :min="8" :max="200" @change="applyForm" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fabric } from 'fabric';
  import pptxgen from 'pptxgenjs';
  import {
    FullScreen,
    Close,
    Download,
    Share,
    Edit,
    VideoPlay,
    Grid,
    List,
    ArrowLeft,
    ArrowRight,
    MoreFilled,
    ChatDotRound,
  } from '@element-plus/icons-vue';
  import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
  import { ElMessage } from 'element-plus';

  type SlideModel = { id: string; json: any };

  const canvasRef = ref<HTMLCanvasElement>();
  const fileInputRef = ref<HTMLInputElement>();
  const thumbRefs = ref<HTMLCanvasElement[]>([]);
  const previewCanvasRef = ref<HTMLCanvasElement>();

  const slides = ref<SlideModel[]>([]);
  const currentIndex = ref(0);
  const currentSlide = computed(() => slides.value[currentIndex.value]);

  // 新增状态
  const isPreviewMode = ref(false);
  const thumbnailCollapsed = ref(false);
  const documentTitle = ref('2024年婴儿手推车市场分析报告V1.0');
  const isPresentationMode = ref(false);

  let canvas: fabric.Canvas | null = null;
  let previewCanvas: fabric.Canvas | null = null;

  const CANVAS_WIDTH = 1280;
  const CANVAS_HEIGHT = 720;

  // history
  const undoStack: any[] = [];
  const redoStack: any[] = [];
  const canUndo = computed(() => undoStack.length > 0);
  const canRedo = computed(() => redoStack.length > 0);

  function pushHistory() {
    if (!canvas) return;
    const json = canvas.toJSON(['selectable']);
    undoStack.push(json);
    redoStack.length = 0;
    autosave();
    renderThumb(currentIndex.value);
  }

  function undo() {
    if (!canvas || undoStack.length === 0) return;
    const cur = canvas.toJSON(['selectable']);
    const prev = undoStack.pop();
    redoStack.push(cur);
    canvas.loadFromJSON(prev, () => {
      canvas.renderAll();
      syncForm();
      renderThumb(currentIndex.value);
    });
  }

  function redo() {
    if (!canvas || redoStack.length === 0) return;
    const cur = canvas.toJSON(['selectable']);
    const next = redoStack.pop();
    undoStack.push(cur);
    canvas.loadFromJSON(next, () => {
      canvas.renderAll();
      syncForm();
      renderThumb(currentIndex.value);
    });
  }

  function initCanvas() {
    if (!canvasRef.value) return;
    canvas = new fabric.Canvas(canvasRef.value, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    });
    const onChanged = () => pushHistory();
    canvas.on('object:added', onChanged);
    canvas.on('object:modified', onChanged);
    canvas.on('object:removed', onChanged);
    canvas.on('selection:created', syncForm);
    canvas.on('selection:updated', syncForm);
    canvas.on('selection:cleared', () => (activeObject.value = null));
  }

  function initPreviewCanvas() {
    if (!previewCanvasRef.value) return;
    previewCanvas = new fabric.Canvas(previewCanvasRef.value, {
      width: 1144,
      height: 644,
      backgroundColor: '#ffffff',
      selection: false,
      interactive: false,
    });
  }

  // slide ops
  function newSlideJSON() {
    // 创建一个带有欢迎文字的初始幻灯片
    return {
      version: '5',
      objects: [
        {
          type: 'textbox',
          left: CANVAS_WIDTH / 2 - 200,
          top: CANVAS_HEIGHT / 2 - 100,
          width: 400,
          height: 80,
          text: '欢迎使用PPT编辑器',
          fontSize: 36,
          fill: '#1f1f1f',
          fontFamily: 'Microsoft YaHei',
          textAlign: 'center',
          fontWeight: 'bold',
        },
        {
          type: 'textbox',
          left: CANVAS_WIDTH / 2 - 150,
          top: CANVAS_HEIGHT / 2 + 20,
          width: 300,
          height: 40,
          text: '点击添加更多内容',
          fontSize: 18,
          fill: '#666666',
          fontFamily: 'Microsoft YaHei',
          textAlign: 'center',
        },
      ],
      background: '#ffffff',
    };
  }

  function addSlide() {
    slides.value.push({ id: `${Date.now()}`, json: newSlideJSON() });
    switchSlide(slides.value.length - 1);
  }

  function duplicateSlide() {
    if (!currentSlide.value) return;
    const clone = JSON.parse(JSON.stringify(currentSlide.value));
    clone.id = `${Date.now()}`;
    slides.value.splice(currentIndex.value + 1, 0, clone);
    switchSlide(currentIndex.value + 1);
  }

  function deleteSlide() {
    if (slides.value.length === 0) return;
    slides.value.splice(currentIndex.value, 1);
    if (slides.value.length === 0) {
      addSlide();
      return;
    }
    switchSlide(Math.max(0, currentIndex.value - 1));
  }

  function switchSlide(index: number) {
    currentIndex.value = index;
    const s = slides.value[index];
    if (canvas && !isPreviewMode.value) {
      canvas.loadFromJSON(s.json, () => {
        canvas?.renderAll();
        undoStack.length = 0;
        redoStack.length = 0;
        syncForm();
      });
    }
    if (isPreviewMode.value && previewCanvas) {
      updatePreviewCanvas();
    }
  }

  function updatePreviewCanvas() {
    if (!previewCanvas || !currentSlide.value) return;
    previewCanvas.loadFromJSON(currentSlide.value.json, () => {
      previewCanvas?.renderAll();
    });
  }

  function setThumbRef(i: number) {
    return (el: HTMLCanvasElement | null) => {
      if (!el) return;
      thumbRefs.value[i] = el;
      el.width = 256;
      el.height = 144;
    };
  }

  function renderThumb(i: number) {
    const el = thumbRefs.value[i];
    if (!el || !canvas) return;
    const scale = el.width / CANVAS_WIDTH;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    const dataUrl = canvas.toDataURL({ format: 'png' });
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH * scale, CANVAS_HEIGHT * scale);
    };
    img.src = dataUrl;
  }

  // add elements
  function addText() {
    if (!canvas) return;
    const t = new fabric.Textbox('双击编辑文字', {
      left: 100,
      top: 100,
      fill: '#1f1f1f',
      fontSize: 28,
      width: 400,
    });
    canvas.add(t);
    canvas.setActiveObject(t);
    canvas.renderAll();
  }

  function addRect() {
    if (!canvas) return;
    const r = new fabric.Rect({
      left: 120,
      top: 140,
      width: 200,
      height: 120,
      rx: 8,
      ry: 8,
      fill: '#409eff',
    });
    canvas.add(r);
    canvas.setActiveObject(r);
    canvas.renderAll();
  }

  function addCircle() {
    if (!canvas) return;
    const c = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 60,
      fill: '#67c23a',
    });
    canvas.add(c);
    canvas.setActiveObject(c);
    canvas.renderAll();
  }

  function triggerImage() {
    fileInputRef.value?.click();
  }

  function onPickImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file || !canvas) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      fabric.Image.fromURL(dataUrl, (img) => {
        img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
        canvas?.add(img);
        canvas?.setActiveObject(img);
        canvas?.renderAll();
      });
    };
    reader.readAsDataURL(file);
    (e.target as HTMLInputElement).value = '';
  }

  // inspector
  const activeObject = ref<fabric.Object | null>(null);
  const form = reactive<any>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    fill: undefined,
    color: '#000',
    fontSize: 28,
  });

  function syncForm() {
    if (!canvas) return;
    const obj = canvas.getActiveObject() as any;
    activeObject.value = obj || null;
    if (!obj) return;
    form.x = Math.round(obj.left || 0);
    form.y = Math.round(obj.top || 0);
    form.w = Math.round(obj.width ? obj.width * (obj.scaleX || 1) : 0);
    form.h = Math.round(obj.height ? obj.height * (obj.scaleY || 1) : 0);
    if (obj.fill !== undefined) form.fill = obj.fill;
    else form.fill = undefined;
    if (obj.text !== undefined) {
      form.color = obj.fill || '#000';
      form.fontSize = obj.fontSize || 28;
    }
  }

  function applyForm() {
    if (!canvas || !activeObject.value) return;
    const obj: any = activeObject.value;
    obj.set({ left: form.x, top: form.y });
    if (form.w && obj.width) obj.scaleX = form.w / obj.width;
    if (form.h && obj.height) obj.scaleY = form.h / obj.height;
    if (obj.type === 'textbox') {
      obj.set({ fill: form.color, fontSize: form.fontSize });
    } else if (form.fill !== undefined) {
      obj.set({ fill: form.fill });
    }
    obj.setCoords();
    canvas.renderAll();
    pushHistory();
  }

  // 新增预览模式方法
  function startPresentation() {
    isPresentationMode.value = true;
    // 这里可以添加全屏演示逻辑
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function downloadPPTX() {
    exportPPTX();
  }

  // export
  function exportPNG() {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 2 });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `slide-${currentIndex.value + 1}.png`;
    a.click();
  }

  async function exportPPTX() {
    const pres = new pptxgen();

    // 设置PPT页面尺寸（16:9，标准尺寸）
    pres.defineLayout({
      name: 'LAYOUT_16x9',
      width: 10,
      height: 5.625,
    });
    pres.layout = 'LAYOUT_16x9';

    // 显示导出进度
    ElMessage.info('正在导出PPT，请稍候...');

    // 保存当前画布状态，避免导出过程中影响主画布
    const originalJSON = canvas?.toJSON(['selectable']);

    for (let i = 0; i < slides.value.length; i++) {
      const s = slides.value[i];
      const slide = pres.addSlide();

      // 设置白色背景
      slide.background = { color: 'FFFFFF' };

      // 直接从存储的JSON数据中解析对象，不影响主画布
      const slideData = s.json;
      const objects = slideData.objects || [];

      console.log(`幻灯片${i + 1}导出对象数量:`, objects.length);

      // 遍历所有对象，转换为PPT元素
      objects.forEach((obj: any, index: number) => {
        console.log(`对象${index}:`, {
          type: obj.type,
          text: obj.text,
          left: obj.left,
          top: obj.top,
          width: obj.width,
          height: obj.height,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
        });

        // 精确的坐标和尺寸转换（英寸单位）
        const left = (obj.left / CANVAS_WIDTH) * 10; // 转换为英寸
        const top = (obj.top / CANVAS_HEIGHT) * 5.625;
        const width = ((obj.width * (obj.scaleX || 1)) / CANVAS_WIDTH) * 10;
        const height = ((obj.height * (obj.scaleY || 1)) / CANVAS_HEIGHT) * 5.625;

        console.log('PPT坐标:', { left, top, width, height });

        if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
          // 文本对象 - 确保可编辑性
          const textContent = obj.text || obj._text || '文本';
          const fontSize = Math.max(8, Math.round((obj.fontSize || 28) * 0.8)); // 调整字体比例
          const color = (obj.fill || '#000000').replace('#', '');

          console.log('添加文本:', textContent, '字号:', fontSize, '颜色:', color);

          slide.addText(textContent, {
            x: left,
            y: top,
            w: width,
            h: height,
            fontSize,
            color,
            fontFace: obj.fontFamily || 'Microsoft YaHei',
            bold: obj.fontWeight === 'bold' || obj.fontWeight > 400,
            italic: obj.fontStyle === 'italic',
            align: obj.textAlign || 'left',
            valign: 'top',
            margin: 0,
            autoFit: false,
          });
        } else if (obj.type === 'rect') {
          // 矩形对象
          const fillColor = (obj.fill || '#CCCCCC').replace('#', '');
          const strokeColor = (obj.stroke || '#000000').replace('#', '');

          console.log('添加矩形:', fillColor);

          slide.addShape(pres.ShapeType.rect, {
            x: left,
            y: top,
            w: width,
            h: height,
            fill: { color: fillColor },
            line: {
              color: strokeColor,
              width: obj.strokeWidth || 0,
            },
          });
        } else if (obj.type === 'circle') {
          // 圆形对象
          const fillColor = (obj.fill || '#CCCCCC').replace('#', '');
          const strokeColor = (obj.stroke || '#000000').replace('#', '');

          console.log('添加圆形:', fillColor);

          slide.addShape(pres.ShapeType.oval, {
            x: left,
            y: top,
            w: width,
            h: height,
            fill: { color: fillColor },
            line: {
              color: strokeColor,
              width: obj.strokeWidth || 0,
            },
          });
        } else if (obj.type === 'image') {
          // 图片对象
          if (obj.src || obj._element?.src) {
            const imageSrc = obj.src || obj._element?.src;
            console.log('添加图片:', `${imageSrc?.substring(0, 50)}...`);

            slide.addImage({
              data: imageSrc,
              x: left,
              y: top,
              w: width,
              h: height,
            });
          }
        } else {
          console.log('未识别的对象类型:', obj.type);
        }
      });
    }

    try {
      await pres.writeFile({ fileName: `${documentTitle.value}.pptx` });
      ElMessage.success('PPTX文件导出成功！文字和形状可在WPS中二次编辑');
    } catch (error) {
      console.error('导出失败:', error);
      ElMessage.error('导出失败，请重试');
    }
  }

  // storage
  const STORAGE_KEY = 'pptist_like_editor_v1';
  function autosave() {
    if (!canvas) return;
    const s = slides.value[currentIndex.value];
    if (!s) return;
    s.json = canvas.toJSON(['selectable']);
    const payload = { slides: slides.value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }
  function restore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      addSlide();
      return;
    }
    try {
      const data = JSON.parse(raw);
      slides.value = (data.slides || []).map((s: any) => ({ id: s.id, json: s.json }));
      if (slides.value.length === 0) addSlide();
      nextTick(() => switchSlide(0));
    } catch (e) {
      addSlide();
    }
  }

  onMounted(() => {
    initCanvas();
    restore();
    window.addEventListener('resize', () => renderThumb(currentIndex.value));
  });

  // 监听预览模式变化
  watch(isPreviewMode, (newVal) => {
    if (newVal) {
      nextTick(() => {
        initPreviewCanvas();
        updatePreviewCanvas();
      });
    }
  });

  // keyboard
  onMounted(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!canvas) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const obj = canvas.getActiveObject();
        if (obj) {
          canvas.remove(obj);
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    onUnmounted(() => window.removeEventListener('keydown', onKey));
  });
</script>

<style scoped lang="scss">
  // 设计系统变量
  $primary-color: #02b96b;
  $primary-light: #f0fff6;
  $text-dark: #1f1f1f;
  $text-gray: #666666;
  $border-color: #ededed;
  $background-gray: #f7f7f7;
  $background-light: #f5f5f5;
  $white: #ffffff;
  $shadow: 0px 2px 12px 0px rgba(6, 8, 27, 0.12);

  // 预览模式样式
  .ppt-preview-container {
    height: 100vh;
    background: $white;
    display: flex;
    flex-direction: column;
    font-family: 'PingFang SC', sans-serif;
  }

  .preview-header {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid $border-color;

    .header-tabs {
      display: flex;
      gap: 0;

      .tab-item {
        padding: 6px 12px;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 400;
        color: $text-dark;
        cursor: pointer;
        white-space: nowrap;

        &.active {
          background: $primary-light;
          color: $primary-color;
          font-weight: 500;
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 18px;

      .action-icon {
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: $text-gray;

        &:hover {
          color: $text-dark;
        }
      }

      .divider {
        width: 1px;
        height: 16px;
        background: $border-color;
      }
    }
  }

  .doc-info-bar {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;

    .doc-title {
      font-size: 13px;
      font-weight: 500;
      color: $text-dark;
      flex: 1;
    }

    .doc-actions {
      display: flex;
      align-items: center;
      gap: 18px;

      .doc-action {
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: $text-gray;

        &:hover {
          color: $text-dark;
        }
      }

      .divider {
        width: 1px;
        height: 16px;
        background: $border-color;
      }

      .present-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 16px;
        background: $background-light;
        border-radius: 20px;
        cursor: pointer;
        font-size: 13px;
        color: $text-dark;

        &:hover {
          background: $border-color;
        }

        .el-icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .preview-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .thumbnail-panel {
    width: 224px;
    background: $white;
    border-right: 1px solid $border-color;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;

    &.collapsed {
      width: 48px;
    }

    .panel-header {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .view-toggle {
        display: flex;
        background: $background-gray;
        border-radius: 8px;
        padding: 2px;
        gap: 2px;

        .toggle-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          cursor: pointer;

          &.active {
            background: $white;
            box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.06);
          }

          .el-icon {
            width: 16px;
            height: 16px;
            color: $text-gray;
          }
        }
      }

      .collapse-btn {
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: $text-gray;

        &:hover {
          color: $text-dark;
        }
      }
    }

    .thumbnail-list {
      flex: 1;
      padding: 0 16px 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .thumbnail-item {
      position: relative;
      cursor: pointer;
      border-radius: 6px;
      border: 2px solid transparent;

      &.active {
        border-color: $primary-color;
      }

      &:hover:not(.active) {
        border-color: $border-color;
      }

      .thumbnail-canvas {
        width: 192px;
        height: 108px;
        border-radius: 6px;
        background: $white;
        display: block;
      }

      .slide-number {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.3);
        color: $white;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 400;
      }

      &.active .slide-number {
        background: $primary-color;
      }
    }
  }

  .main-preview {
    flex: 1;
    background: $background-gray;
    padding: 16px;
    overflow: auto;

    .slide-viewer {
      background: $white;
      border-radius: 10px;
      height: 718px;
      overflow: hidden;

      .slide-header {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;

        .slide-pagination {
          font-size: 14px;
          color: $text-gray;
        }

        .more-icon {
          width: 16px;
          height: 16px;
          color: $text-gray;
          cursor: pointer;

          &:hover {
            color: $text-dark;
          }
        }
      }

      .slide-content {
        padding: 0 20px 20px;
        height: calc(718px - 54px);
        display: flex;
        align-items: center;
        justify-content: center;

        .preview-canvas {
          border-radius: 10px;
          max-width: 100%;
          max-height: 100%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
      }
    }
  }

  .feedback-btn {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 54px;
    background: $white;
    border-radius: 6px 0 0 6px;
    box-shadow: $shadow;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    cursor: pointer;

    .el-icon {
      width: 16px;
      height: 16px;
      color: $text-gray;
    }

    span {
      font-size: 12px;
      color: $text-gray;
    }

    &:hover {
      .el-icon,
      span {
        color: $text-dark;
      }
    }
  }

  // 编辑模式样式
  .pptist-like-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: $white;
    font-family: 'PingFang SC', sans-serif;
  }

  .toolbar {
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    gap: 8px;
    background: $white;
  }

  .hidden {
    display: none;
  }

  .body {
    display: grid;
    grid-template-columns: 240px 1fr 280px;
    gap: 0;
    height: calc(100vh - 70px);
  }

  .slides {
    padding: 16px;
    border-right: 1px solid $border-color;
    overflow: auto;
    background: $white;

    .slide-thumb {
      position: relative;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid transparent;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(.active) {
        border-color: $border-color;
        background: $background-light;
      }

      &.active {
        border-color: $primary-color;
        background: $primary-light;
      }

      .thumb-canvas {
        width: 100%;
        height: auto;
        display: block;
        background: $white;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }

      .slide-number {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 16px;
        height: 16px;
        background: rgba(0, 0, 0, 0.5);
        color: $white;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 400;
      }

      &.active .slide-number {
        background: $primary-color;
      }
    }
  }

  .stage {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $background-gray;

    .stage-inner {
      padding: 20px;

      .stage-canvas {
        width: 960px;
        height: 540px;
        background: $white;
        border: 1px solid $border-color;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
    }
  }

  .inspector {
    border-left: 1px solid $border-color;
    padding: 16px;
    background: $white;
    overflow-y: auto;

    .panel-title {
      font-weight: 500;
      font-size: 14px;
      color: $text-dark;
      margin-bottom: 12px;
    }

    :deep(.el-form) {
      .el-form-item {
        margin-bottom: 12px;

        .el-form-item__label {
          font-size: 12px;
          color: $text-gray;
        }
      }
    }
  }

  // 响应式设计
  @media (max-width: 1200px) {
    .body {
      grid-template-columns: 200px 1fr 240px;
    }

    .stage-canvas {
      width: 800px !important;
      height: 450px !important;
    }
  }

  @media (max-width: 992px) {
    .body {
      grid-template-columns: 180px 1fr 200px;
    }

    .stage-canvas {
      width: 640px !important;
      height: 360px !important;
    }
  }

  @media (max-width: 768px) {
    .body {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }

    .slides {
      max-height: 200px;
      display: flex;
      flex-direction: row;
      gap: 8px;
      overflow-x: auto;
      overflow-y: hidden;

      .slide-thumb {
        min-width: 120px;
        margin-bottom: 0;
      }
    }

    .inspector {
      display: none;
    }

    .stage-canvas {
      width: 100% !important;
      max-width: 480px !important;
      height: auto !important;
    }
  }
</style>
