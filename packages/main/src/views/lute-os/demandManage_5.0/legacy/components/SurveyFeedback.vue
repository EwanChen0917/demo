<template>
  <div v-if="isPrimaryInstance">
    <div
      v-if="showIcon && !showPopup"
      ref="iconRef"
      class="survey-icon"
      :style="{
        background: iconBgColor,
        top: y + 'px',
        left: x + 'px',
        cursor: isDragging ? 'grabbing' : 'pointer',
        transition: isDragging ? 'none' : 'top 0.2s, left 0.2s',
      }"
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
  import { useDraggable, useWindowSize } from '@vueuse/core';
  import dayjs from 'dayjs';
  import {
    ref,
    computed,
    watch,
    onMounted,
    onUnmounted,
    onActivated,
    onDeactivated,
    nextTick,
  } from 'vue';
  import { allowPathsBrand } from '@/views/lute-os/brandDemandMange/constants';
  import { useDemandUiLayer } from '@/views/lute-os/demandManage/composables/useDemandUiLayer';

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
  const minEdge = 8;
  const iconSize = 54;
  const popupWidth = 320;
  const popupOffset = 16;

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

  const popupRef = ref(null);
  const popupTop = ref(100);

  const ui = useDemandUiLayer();
  const iconRef = ref(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const calculateInitialX = () => {
    const pos = ui.surveyPosition.value;
    if (pos.left !== null) {
      return pos.left;
    }
    if (pos.right !== null) {
      return windowWidth.value - pos.right - iconSize;
    }
    // 默认值
    return windowWidth.value - iconSize - minEdge;
  };

  const dragThreshold = 3;
  let startClientX = 0;
  let startClientY = 0;
  let isRealDragging = false;

  const { x, y, isDragging } = useDraggable(iconRef, {
    initialValue: {
      x: calculateInitialX(),
      y: ui.surveyPosition.value.top ?? 100,
    },
    preventDefault: true,
    onStart: (_, event) => {
      startClientX = event.clientX;
      startClientY = event.clientY;
      isRealDragging = false;
    },
    onMove: (position, event) => {
      const deltaX = Math.abs(event.clientX - startClientX);
      const deltaY = Math.abs(event.clientY - startClientY);

      if (!isRealDragging && (deltaX > dragThreshold || deltaY > dragThreshold)) {
        isRealDragging = true;
      }

      position.x = Math.min(Math.max(minEdge, position.x), windowWidth.value - iconSize - minEdge);
      position.y = Math.min(Math.max(minEdge, position.y), windowHeight.value - iconSize - minEdge);
    },
  });

  watch(isDragging, (dragging) => {
    if (!dragging && isRealDragging) {
      const stickToLeft = x.value < windowWidth.value / 2;
      const finalTop = Math.min(
        Math.max(minEdge, y.value),
        windowHeight.value - iconSize - minEdge
      );

      // 调用全局方法更新位置以实现持久化
      ui.setSurveyPosition({
        left: stickToLeft ? minEdge : null,
        right: stickToLeft ? null : minEdge,
        top: finalTop,
      });
    }
  });

  watch(ui.surveyPosition, (newPos) => {
    if (isDragging.value) return; // 正在拖动时，以本地为准，防止冲突

    if (newPos.left !== null) {
      x.value = newPos.left;
    } else if (newPos.right !== null) {
      x.value = windowWidth.value - newPos.right - iconSize;
    }
    y.value = newPos.top ?? 100;
  });

  watch([windowWidth, windowHeight], () => {
    x.value = Math.min(Math.max(minEdge, x.value), windowWidth.value - iconSize - minEdge);
    y.value = Math.min(Math.max(minEdge, y.value), windowHeight.value - iconSize - minEdge);
  });

  const isLeftSide = computed(() => x.value < windowWidth.value / 2);

  const getPopupStyle = computed(() => {
    const base = {
      position: 'fixed',
      top: `${popupTop.value}px`,
      width: `${popupWidth}px`,
      zIndex: 10000,
    };
    return {
      ...base,
      left: isLeftSide.value ? `${minEdge + iconSize + popupOffset}px` : undefined,
      right: isLeftSide.value ? undefined : `${minEdge + iconSize + popupOffset}px`,
    };
  });

  watch(showPopup, async (v) => {
    if (v) {
      await nextTick();
      const popupEl = popupRef.value;
      if (popupEl) {
        const popupHeight = popupEl.offsetHeight;
        let top = y.value;
        if (top + popupHeight > windowHeight.value - minEdge) {
          top = windowHeight.value - popupHeight - minEdge;
        }
        if (top < minEdge) {
          top = minEdge;
        }
        popupTop.value = top;
      }
    } else {
      popupTop.value = y.value;
    }
  });

  const route = useRoute();
  const surveySingletonKey = '__DM5_SURVEY_FEEDBACK_INSTANCE__';
  const isPrimaryInstance = ref(false);
  const singletonStore = window;
  const canUseSurvey = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    const current = singletonStore[surveySingletonKey];
    if (current) {
      return false;
    }
    singletonStore[surveySingletonKey] = true;
    return true;
  };
  const releaseSurvey = () => {
    if (typeof window === 'undefined' || !isPrimaryInstance.value) {
      return;
    }
    singletonStore[surveySingletonKey] = false;
    isPrimaryInstance.value = false;
  };
  function isWednesday() {
    return new Date().getDay() === 3;
  }
  let popupChecked = false;
  function checkShowIconAndPopup(path) {
    if (popupChecked) return;
    popupChecked = true;

    if (!matchAllowPath(path)) {
      showIcon.value = false;
      showPopup.value = false;
      return;
    }
    showIcon.value = true;

    if (isWednesday() && !hasPopupThisWeek()) {
      showPopup.value = true;
      setPopupThisWeek();
    } else {
      showPopup.value = false;
    }
  }
  onMounted(() => {
    isPrimaryInstance.value = canUseSurvey();
    if (!isPrimaryInstance.value) {
      return;
    }
    popupChecked = false;
    checkShowIconAndPopup(route.path);
  });

  onActivated(() => {
    if (isPrimaryInstance.value) {
      return;
    }
    isPrimaryInstance.value = canUseSurvey();
    if (!isPrimaryInstance.value) {
      return;
    }
    popupChecked = false;
    checkShowIconAndPopup(route.path);
  });

  onDeactivated(() => {
    releaseSurvey();
  });

  onUnmounted(() => {
    releaseSurvey();
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

  function handleIconClick() {
    if (isRealDragging) {
      return; // 是拖拽操作，不是点击
    }
    showPopup.value = true;
  }

  const isTestEnv = computed(() => {
    return import.meta.env.VITE_ENV === 'DEV';
  });

  const surveyIconTextStyle = computed(() => {
    const top = y.value + iconSize + 6;
    let left = 'auto';
    let right = 'auto';

    if (isLeftSide.value) {
      left = x.value + iconSize / 2 - 28 + 'px';
    } else {
      // 当在右侧时，right 的位置应相对于屏幕边缘，而不是动态的x
      right = minEdge + iconSize / 2 - 28 + 'px';
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
</script>

<style scoped>
  .survey-icon {
    position: fixed;
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
    color: #02100f;
    font-size: 14px;
  }
  .tip-text {
    color: red;
    font-size: 14px;
    font-weight: bold;
  }
</style>
