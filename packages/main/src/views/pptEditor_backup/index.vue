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
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <div class="toolbar-section">
        <div class="toolbar-group">
          <div class="toolbar-label">幻灯片</div>
          <div class="toolbar-buttons">
            <el-button class="toolbar-btn" size="small" @click="addSlide">
              <el-icon><Plus /></el-icon>
              新建页
            </el-button>
            <el-button
              class="toolbar-btn"
              size="small"
              @click="duplicateSlide"
              :disabled="!currentSlide"
            >
              <el-icon><CopyDocument /></el-icon>
              复制页
            </el-button>
            <el-button
              class="toolbar-btn"
              size="small"
              @click="deleteSlide"
              :disabled="slides.length === 0"
            >
              <el-icon><Delete /></el-icon>
              删除页
            </el-button>
          </div>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <div class="toolbar-label">插入</div>
          <div class="toolbar-buttons">
            <el-button class="toolbar-btn" size="small" @click="addText">
              <el-icon><EditPen /></el-icon>
              文本框
            </el-button>
            <el-button class="toolbar-btn" size="small" @click="addRect">
              <el-icon><Grid /></el-icon>
              矩形
            </el-button>
            <el-button class="toolbar-btn" size="small" @click="addCircle">
              <el-icon><Operation /></el-icon>
              圆形
            </el-button>
            <el-button class="toolbar-btn" size="small" @click="triggerImage">
              <el-icon><Picture /></el-icon>
              图片
            </el-button>
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onPickImage"
            />
          </div>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <div class="toolbar-label">导出</div>
          <div class="toolbar-buttons">
            <el-button
              class="toolbar-btn"
              size="small"
              @click="exportPNG"
              :disabled="!currentSlide"
            >
              <el-icon><Picture /></el-icon>
              PNG
            </el-button>
            <el-button
              class="toolbar-btn primary"
              size="small"
              @click="exportPPTX"
              :disabled="!currentSlide"
            >
              <el-icon><Download /></el-icon>
              PPTX
            </el-button>
            <el-button class="toolbar-btn success" size="small" @click="isPreviewMode = true">
              <el-icon><View /></el-icon>
              预览
            </el-button>
          </div>
        </div>
      </div>

      <div class="toolbar-actions">
        <el-button class="action-btn" size="small" @click="undo" :disabled="!canUndo">
          <el-icon><RefreshLeft /></el-icon>
        </el-button>
        <el-button class="action-btn" size="small" @click="redo" :disabled="!canRedo">
          <el-icon><RefreshRight /></el-icon>
        </el-button>
      </div>
    </div>
    <!-- 主编辑区域 -->
    <div class="editor-body">
      <!-- 左侧幻灯片面板 -->
      <div class="slides-panel">
        <div class="panel-header">
          <div class="panel-title">幻灯片</div>
          <div class="panel-count">{{ slides.length }} 页</div>
        </div>
        <div class="slides-list">
          <div
            class="slide-item"
            v-for="(s, i) in slides"
            :key="s.id"
            :class="{ active: i === currentIndex }"
            @click="switchSlide(i)"
          >
            <div class="slide-preview">
              <canvas :ref="setThumbRef(i)" class="slide-canvas"></canvas>
              <div class="slide-overlay">
                <div class="slide-number">{{ i + 1 }}</div>
              </div>
            </div>
            <div class="slide-actions" v-if="i === currentIndex">
              <el-button size="small" text @click.stop="duplicateSlide">
                <el-icon><CopyDocument /></el-icon>
              </el-button>
              <el-button
                size="small"
                text
                @click.stop="deleteSlide"
                :disabled="slides.length === 1"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 中央编辑区域 -->
      <div class="main-editor">
        <div class="editor-header">
          <div class="zoom-controls">
            <el-button-group size="small">
              <el-button>
                <el-icon><ZoomOut /></el-icon>
              </el-button>
              <el-button>50%</el-button>
              <el-button>
                <el-icon><ZoomIn /></el-icon>
              </el-button>
            </el-button-group>
          </div>
          <div class="view-controls">
            <el-button-group size="small">
              <el-button type="primary">编辑</el-button>
              <el-button>大纲</el-button>
              <el-button>备注</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="canvas-container">
          <div class="canvas-wrapper">
            <canvas ref="canvasRef" class="main-canvas"></canvas>
          </div>
        </div>
      </div>

      <!-- 右侧属性面板 -->
      <div class="properties-panel" v-if="activeObject">
        <div class="panel-header">
          <div class="panel-title">属性设置</div>
        </div>
        <div class="panel-content">
          <el-tabs model-value="style" class="property-tabs">
            <el-tab-pane label="样式" name="style">
              <div class="property-section">
                <div class="section-title">位置与大小</div>
                <div class="property-grid">
                  <div class="property-item">
                    <label>X</label>
                    <el-input-number v-model="form.x" size="small" :step="1" @change="applyForm" />
                  </div>
                  <div class="property-item">
                    <label>Y</label>
                    <el-input-number v-model="form.y" size="small" :step="1" @change="applyForm" />
                  </div>
                  <div class="property-item">
                    <label>宽度</label>
                    <el-input-number v-model="form.w" size="small" :step="1" @change="applyForm" />
                  </div>
                  <div class="property-item">
                    <label>高度</label>
                    <el-input-number v-model="form.h" size="small" :step="1" @change="applyForm" />
                  </div>
                </div>
              </div>

              <div class="property-section" v-if="form.fill !== undefined">
                <div class="section-title">外观</div>
                <div class="property-item">
                  <label>填充颜色</label>
                  <el-color-picker v-model="form.fill" size="small" @change="applyForm" />
                </div>
              </div>

              <div class="property-section" v-if="form.fontSize">
                <div class="section-title">文字</div>
                <div class="property-item">
                  <label>字号</label>
                  <el-input-number
                    v-model="form.fontSize"
                    size="small"
                    :min="8"
                    :max="200"
                    @change="applyForm"
                  />
                </div>
                <div class="property-item" v-if="form.fill === undefined">
                  <label>颜色</label>
                  <el-color-picker v-model="form.color" size="small" @change="applyForm" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
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
    Plus,
    CopyDocument,
    Delete,
    EditPen,
    Operation,
    Picture,
    View,
    RefreshLeft,
    RefreshRight,
    ZoomOut,
    ZoomIn,
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
          text: '点击添加更多内容',
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
    // 延迟渲染新的缩略图
    nextTick(() => {
      setTimeout(() => {
        renderThumb(slides.value.length - 1);
      }, 50);
    });
  }

  function duplicateSlide() {
    if (!currentSlide.value) return;
    const clone = JSON.parse(JSON.stringify(currentSlide.value));
    clone.id = `${Date.now()}`;
    slides.value.splice(currentIndex.value + 1, 0, clone);
    switchSlide(currentIndex.value + 1);
    // 延迟渲染新的缩略图
    nextTick(() => {
      setTimeout(() => {
        renderThumb(currentIndex.value);
      }, 50);
    });
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
      // 设置与CSS匹配的实际尺寸
      el.width = 248;
      el.height = 140;
      // 立即渲染缩略图
      nextTick(() => {
        renderThumb(i);
      });
    };
  }

  function renderThumb(i: number) {
    const el = thumbRefs.value[i];
    if (!el || !canvas || !slides.value[i]) return;

    const ctx = el.getContext('2d');
    if (!ctx) return;

    // 如果是当前页，直接从canvas获取
    if (i === currentIndex.value) {
      const dataUrl = canvas.toDataURL({ format: 'png' });
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, el.width, el.height);
        ctx.drawImage(img, 0, 0, el.width, el.height);
      };
      img.src = dataUrl;
    } else {
      // 非当前页，需要临时创建canvas来渲染
      const tempCanvas = new fabric.Canvas(document.createElement('canvas'), {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#ffffff',
      });

      tempCanvas.loadFromJSON(slides.value[i].json, () => {
        const dataUrl = tempCanvas.toDataURL({ format: 'png' });
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, el.width, el.height);
          ctx.drawImage(img, 0, 0, el.width, el.height);
          // 清理临时canvas
          tempCanvas.dispose();
        };
        img.src = dataUrl;
      });
    }
  }

  // 渲染所有缩略图
  function renderAllThumbs() {
    for (let i = 0; i < slides.value.length; i++) {
      if (thumbRefs.value[i]) {
        renderThumb(i);
      }
    }
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

          console.log('添加矩形:', fillColor);

          const shapeOptions: any = {
            x: left,
            y: top,
            w: width,
            h: height,
            fill: { color: fillColor },
          };

          // 只有当存在描边且宽度大于0时才添加边框
          if (obj.stroke && obj.strokeWidth && obj.strokeWidth > 0) {
            const strokeColor = obj.stroke.replace('#', '');
            shapeOptions.line = {
              color: strokeColor,
              width: obj.strokeWidth,
            };
          }

          slide.addShape(pres.shapes.RECTANGLE, shapeOptions);
        } else if (obj.type === 'circle') {
          // 圆形对象
          const fillColor = (obj.fill || '#CCCCCC').replace('#', '');

          console.log('添加圆形:', fillColor);

          const shapeOptions: any = {
            x: left,
            y: top,
            w: width,
            h: height,
            fill: { color: fillColor },
          };

          // 只有当存在描边且宽度大于0时才添加边框
          if (obj.stroke && obj.strokeWidth && obj.strokeWidth > 0) {
            const strokeColor = obj.stroke.replace('#', '');
            shapeOptions.line = {
              color: strokeColor,
              width: obj.strokeWidth,
            };
          }

          slide.addShape(pres.shapes.OVAL, shapeOptions);
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
    // 延迟渲染所有缩略图，确保DOM已创建
    nextTick(() => {
      setTimeout(() => {
        renderAllThumbs();
      }, 100);
    });
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: $background-gray;
    font-family: 'PingFang SC', sans-serif;
  }

  // 专业编辑器工具栏
  .editor-toolbar {
    height: 64px;
    background: $white;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

    .toolbar-section {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .toolbar-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;

      .toolbar-label {
        font-size: 11px;
        color: $text-gray;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 2px;
      }

      .toolbar-buttons {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .toolbar-divider {
      width: 1px;
      height: 40px;
      background: $border-color;
      margin: 0 16px;
    }

    .toolbar-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      height: 40px;
      padding: 4px 8px;
      border: 1px solid transparent;
      border-radius: 4px;
      background: transparent;
      color: $text-dark;
      font-size: 11px;
      transition: all 0.2s ease;

      .el-icon {
        font-size: 16px;
        margin-bottom: 2px;
      }

      &:hover {
        background: $background-light;
        border-color: $border-color;
      }

      &.primary {
        background: $primary-light;
        color: $primary-color;
        border-color: $primary-color;

        &:hover {
          background: $primary-color;
          color: $white;
        }
      }

      &.success {
        background: #f0f9ff;
        color: #0284c7;
        border-color: #0284c7;

        &:hover {
          background: #0284c7;
          color: $white;
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
          background: transparent;
          border-color: transparent;
        }
      }
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 4px;

      .action-btn {
        width: 32px;
        height: 32px;
        padding: 0;
        border: 1px solid $border-color;
        border-radius: 4px;
        background: $white;
        color: $text-gray;
        transition: all 0.2s ease;

        .el-icon {
          font-size: 16px;
        }

        &:hover {
          background: $background-light;
          color: $text-dark;
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;

          &:hover {
            background: $white;
            color: $text-gray;
          }
        }
      }
    }
  }

  .hidden {
    display: none;
  }

  // 主编辑区域布局
  .editor-body {
    display: flex;
    height: calc(100vh - 64px);
    background: $background-gray;
  }

  // 左侧幻灯片面板
  .slides-panel {
    width: 280px;
    background: $white;
    border-right: 1px solid $border-color;
    display: flex;
    flex-direction: column;

    .panel-header {
      height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;

      .panel-title {
        font-size: 14px;
        font-weight: 500;
        color: $text-dark;
      }

      .panel-count {
        font-size: 12px;
        color: $text-gray;
        background: $background-light;
        padding: 2px 8px;
        border-radius: 12px;
      }
    }

    .slides-list {
      flex: 1;
      padding: 16px;
      overflow-y: auto;

      .slide-item {
        position: relative;
        margin-bottom: 16px;
        border-radius: 8px;
        transition: all 0.2s ease;

        &:hover {
          background: $background-light;
        }

        &.active {
          background: $primary-light;

          .slide-preview {
            border-color: $primary-color;
          }
        }

        .slide-preview {
          position: relative;
          border: 2px solid transparent;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;

          .slide-canvas {
            width: 248px;
            height: 140px;
            display: block;
            background: $white;
            border-radius: 4px;
          }

          .slide-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .slide-number {
              position: absolute;
              top: 8px;
              right: 8px;
              width: 24px;
              height: 24px;
              background: rgba(0, 0, 0, 0.7);
              color: $white;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: 500;
            }
          }
        }

        &.active .slide-overlay .slide-number {
          background: $primary-color;
        }

        .slide-actions {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 4px;
          padding: 4px;
          display: flex;
          gap: 4px;
          backdrop-filter: blur(4px);
        }
      }
    }
  }

  // 中央编辑区域
  .main-editor {
    flex: 1;
    display: flex;
    flex-direction: column;

    .editor-header {
      height: 48px;
      background: $white;
      border-bottom: 1px solid $border-color;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .zoom-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .view-controls {
        display: flex;
        align-items: center;
      }
    }

    .canvas-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: auto;

      .canvas-wrapper {
        position: relative;

        .main-canvas {
          width: 960px;
          height: 540px;
          background: $white;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border: 1px solid $border-color;
        }
      }
    }
  }

  // 右侧属性面板
  .properties-panel {
    width: 320px;
    background: $white;
    border-left: 1px solid $border-color;
    display: flex;
    flex-direction: column;

    .panel-header {
      height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $border-color;

      .panel-title {
        font-size: 14px;
        font-weight: 500;
        color: $text-dark;
      }
    }

    .panel-content {
      flex: 1;
      overflow-y: auto;

      .property-tabs {
        height: 100%;

        :deep(.el-tabs__content) {
          padding: 16px;
          height: calc(100% - 40px);
          overflow-y: auto;
        }
      }

      .property-section {
        margin-bottom: 24px;

        .section-title {
          font-size: 13px;
          font-weight: 500;
          color: $text-dark;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid $background-light;
        }

        .property-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .property-item {
          display: flex;
          flex-direction: column;
          gap: 6px;

          label {
            font-size: 12px;
            color: $text-gray;
            font-weight: 400;
          }

          .el-input-number {
            width: 100%;
          }

          .el-color-picker {
            width: 100%;
          }
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
