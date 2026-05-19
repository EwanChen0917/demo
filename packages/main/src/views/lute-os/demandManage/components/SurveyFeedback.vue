<template>
  <div>
    <div
      v-if="showIcon && !showPopup"
      class="survey-icon"
      :style="{
        background: iconBgColor,
        top: iconPos.top + 'px',
        left: iconPos.left !== null ? iconPos.left + 'px' : 'auto',
        right: iconPos.right !== null ? iconPos.right + 'px' : 'auto',
        cursor: isDragging ? 'grabbing' : 'pointer',
        transition: isDragging ? 'none' : 'top 0.2s, left 0.2s, right 0.2s',
      }"
      @mousedown.prevent="onMouseDown"
      @click="handleIconClick"
      title="调查问卷"
    >
      <img src="@/assets/lute-os/svgs/edit2.svg" class="svg-icon" />
    </div>

    <div
      v-if="showIcon && showPopup"
      class="survey-popup-card"
      :style="getPopupStyle"
      ref="popupRef"
    >
      <div class="survey-popup-header">
        <span class="popup-icon-bg">
          <img src="@/assets/lute-os/svgs/edit2.svg" class="svg-icon" />
        </span>
        <span class="popup-title">调查问卷</span>
      </div>
      <div class="popup-desc">系统满意度调查问卷，期待您的反馈！</div>
      <div class="popup-actions">
        <el-button class="popup-ignore" @click="handleIgnore" type="text">暂时忽略</el-button>
        <el-button class="popup-go" @click="handleGo" type="text">前往反馈</el-button>
      </div>
    </div>
  </div>
  <p class="survey-icon-text" :style="surveyIconTextStyle">调查问卷</p>
  <p v-if="isTestEnv" class="survey-icon-text mt-10 tip-text" :style="surveyIconTextStyle">
    当前在测试环境
  </p>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';
  import { ref, computed, watch, onMounted, nextTick } from 'vue';
  import { allowPathsBrand } from '@/views/lute-os/brandDemandMange/constants';
  const allowPaths = [
    '/demand/submit/create',
    '/demand/submit/list',
    '/demand/submit/approve',
    '/demand/submit/my',
    '/demand/submit/done',
    '/demand/execute/list',
    '/demand/execute/approve',
    '/demand/execute/process',
    '/demand/execute/my',
    '/demand/detail/:id',
    '/demand/statistics',
    '/demand/statistics/personal',
    '/procurement/submit/create',
    '/procurement/submit/manage',
    '/procurement/execute/detail/:id',
    '/procurement/execute/manage',
    '/procurement/execute/mine',
    ...allowPathsBrand,
  ];

  function matchAllowPath(currentPath) {
    return allowPaths.some((pattern) => {
      if (pattern.includes('/:')) {
        const base = pattern.split('/:')[0];
        return currentPath.startsWith(base + '/');
      }
      return pattern === currentPath;
    });
  }

  const iconBgColor = '#00C087';

  const showIcon = ref(false);
  const showPopup = ref(false);
  const surveyUrl =
    'https://alidocs.dingtalk.com/notable/share/form/v01ZWGl05MRYz3mQn34_dv19yqvsgs3oebp3pcjys_1qX0QQ0';

  const popupFlagKey = 'survey-popup-week';
  function isSameWeek(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return false;
    const d1 = dayjs(dateStr1).startOf('week');
    const d2 = dayjs(dateStr2).startOf('week');
    return d1.isSame(d2);
  }
  function hasPopupThisWeek() {
    const last = localStorage.getItem(popupFlagKey);
    return isSameWeek(last, dayjs().toISOString());
  }
  function setPopupThisWeek() {
    localStorage.setItem(popupFlagKey, dayjs().toISOString());
  }
  const popupWidth = 320;
  const popupOffset = 16;

  const popupRef = ref(null);
  const popupTop = ref(100);

  const getPopupStyle = computed(() => {
    const base = {
      position: 'fixed',
      top: `${popupTop.value}px`,
      width: `${popupWidth}px`,
      zIndex: 10000,
    };
    return {
      ...base,
      left:
        iconPos.value.left !== null
          ? `${iconPos.value.left + iconSize + popupOffset}px`
          : undefined,
      right:
        iconPos.value.right !== null
          ? `${iconPos.value.right + iconSize + popupOffset}px`
          : undefined,
    };
  });

  // 弹窗显示时动态调整 top，确保底部不越界
  watch(showPopup, async (v) => {
    if (v) {
      await nextTick();
      const popupEl = popupRef.value;
      if (popupEl) {
        const popupHeight = popupEl.offsetHeight;
        const windowHeight = window.innerHeight;
        let top = iconPos.value.top ?? 100;
        if (top + popupHeight > windowHeight - minEdge) {
          top = windowHeight - popupHeight - minEdge;
        }
        if (top < minEdge) {
          top = minEdge;
        }
        popupTop.value = top;
      }
    } else {
      popupTop.value = iconPos.value.top ?? 100;
    }
  });

  const route = useRoute();
  function isWednesday() {
    return new Date().getDay() === 3;
  }
  let popupChecked = false;
  function checkShowIconAndPopup(path) {
    if (popupChecked) return;
    popupChecked = true;
    console.log('==checkShowIconAndPopup==');
    console.log('path:', path);
    console.log('isWednesday():', isWednesday());
    console.log('hasPopupThisWeek():', hasPopupThisWeek());

    if (!matchAllowPath(path)) {
      showIcon.value = false;
      showPopup.value = false;
      console.log('不在允许路由');
      return;
    }
    showIcon.value = true;

    if (isWednesday() && !hasPopupThisWeek()) {
      showPopup.value = true;
      setPopupThisWeek();
      console.log('浮窗弹出');
    } else {
      showPopup.value = false;
      console.log('不弹窗');
    }
  }
  onMounted(() => {
    popupChecked = false;
    checkShowIconAndPopup(route.path);
  });

  watch(
    () => route.path,
    (newPath) => {
      checkShowIconAndPopup(newPath);
    }
  );

  function handleIgnore() {
    showPopup.value = false;
  }
  function handleGo() {
    window.open(surveyUrl, '_blank');
    showPopup.value = false;
  }

  // 拖拽相关
  const iconPos = ref({ top: 100, left: null, right: minEdge });
  const isDragging = ref(false);
  const hasDragged = ref(false);

  const minEdge = 8;
  const iconSize = 54;
  const dragThreshold = 4;

  let startX = 0,
    startY = 0;
  let offsetX = 0,
    offsetY = 0;
  let draggingStarted = false;

  function onMouseDown(e) {
    if (showPopup.value || e.button !== 0) return;

    // 记录起始点，不立刻进入拖拽
    startX = e.clientX;
    startY = e.clientY;
    draggingStarted = false;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // 如果还没到拖拽阈值，就只做“是否触发真正拖拽”的检测
    if (!draggingStarted) {
      if (Math.hypot(dx, dy) < dragThreshold) return;
      // 超过阈值，正式进入拖拽
      draggingStarted = true;
      isDragging.value = true;
      hasDragged.value = true;

      if (iconPos.value.left !== null) {
        offsetX = startX - iconPos.value.left;
      } else {
        const cw = document.documentElement.clientWidth;
        const iconLeft = cw - iconPos.value.right - iconSize;
        offsetX = startX - iconLeft;
      }
      offsetY = startY - iconPos.value.top;
    }

    // 真正拖拽中，更新位置
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const cw = document.documentElement.clientWidth;
    const ch = document.documentElement.clientHeight;

    newX = Math.min(Math.max(minEdge, newX), cw - iconSize - minEdge);
    newY = Math.min(Math.max(minEdge, newY), ch - iconSize - minEdge);

    iconPos.value.left = newX;
    iconPos.value.right = null;
    iconPos.value.top = newY;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!draggingStarted) {
      return;
    }

    const cw = document.documentElement.clientWidth;
    if (iconPos.value.left < cw / 2) {
      iconPos.value.left = minEdge;
      iconPos.value.right = null;
    } else {
      iconPos.value.left = null;
      iconPos.value.right = minEdge;
    }

    const ch = document.documentElement.clientHeight;
    iconPos.value.top = Math.min(Math.max(minEdge, iconPos.value.top), ch - iconSize - minEdge);

    isDragging.value = false;
  }

  const surveyIconTextStyle = computed(() => {
    const top = (iconPos.value.top ?? 100) + iconSize + 6;
    let left = 'auto';
    let right = 'auto';

    if (iconPos.value.left !== null) {
      left = iconPos.value.left + iconSize / 2 - 28 + 'px';
    } else if (iconPos.value.right !== null) {
      right = iconPos.value.right + iconSize / 2 - 28 + 'px';
    }

    return {
      top: top + 'px',
      left,
      right,
      position: 'fixed',
      zIndex: 9999,
      transition: isDragging.value ? 'none' : 'top 0.2s, left 0.2s, right 0.2s',
    };
  });

  // 新增 handleIconClick 方法
  function handleIconClick() {
    if (hasDragged.value) {
      hasDragged.value = false;
      return;
    }
    nextTick(() => {
      showPopup.value = true;
    });
  }

  const isTestEnv = computed(() => {
    return import.meta.env.VITE_ENV === 'DEV';
  });

  // 窗口大小变化时的处理
  window.addEventListener('resize', () => {
    maxW = window.innerWidth;
    maxH = window.innerHeight;
    // 防止图标越界
    if (iconPos.value.top > maxH - iconSize - minEdge)
      iconPos.value.top = maxH - iconSize - minEdge;
    if (iconPos.value.top < minEdge) iconPos.value.top = minEdge;
  });
</script>

<style scoped>
  .survey-icon {
    position: fixed;
    top: 100px;
    right: 8px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    color: #fff;
    background: #00c087;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.16);
    z-index: 2147483680;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;
  }
  .survey-icon:hover {
    opacity: 0.85;
  }
  .svg-icon {
    width: 25px;
    height: 25px;
    display: block;
  }

  .survey-popup-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .popup-icon-bg {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #00c087;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .popup-icon-bg .svg-icon {
    width: 15px;
    height: 15px;
  }
  .popup-title {
    font-size: 20px;
    font-weight: 700;
    color: #222;
    letter-spacing: 1px;
  }
  .survey-popup-card {
    /* position: fixed;
    top: 120px;
    right: 20px; */
    width: 320px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 2147483680;
    padding: 24px 28px 14px 28px;
    animation: survey-fade-in 0.2s;
  }
  @keyframes survey-fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .popup-desc {
    color: #333;
    margin-bottom: 28px;
    margin-left: 2px;
    font-size: 15px;
    line-height: 1.8;
  }
  .popup-actions {
    display: flex;
    justify-content: space-between;
  }
  .popup-ignore {
    font-size: 15px;
    color: #bdbdbd !important;
  }
  .popup-go {
    font-size: 15px;
    color: #00c087 !important;
  }
  .svg-icon {
    fill: #fff !important;
  }
  .survey-icon-text {
    position: fixed;
    top: 160px;
    right: 8px;
    color: #02100f;
    font-size: 14px;
    /* text-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
    /* mix-blend-mode: difference; */
  }
  .tip-text {
    color: red;
    font-size: 14px;
    font-weight: bold;
  }
</style>
