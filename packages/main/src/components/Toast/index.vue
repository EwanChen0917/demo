<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { rafTimeout, cancelRaf } from './index';
  interface Props {
    title?: string; // 消息的标题
    duration?: number; // 自动关闭的延时时长,单位ms，默认4500ms；设置0时，不自动关闭
    top?: number; // 消息从顶部弹出时，距离顶部的位置，单位px
    bottom?: number; // 消息从底部弹出时，距离底部的位置，单位px
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'; // 消息弹出位置
  }
  const props = withDefaults(defineProps<Props>(), {
    title: '通知',
    duration: 4500,
    top: 70,
    bottom: 24,
    placement: 'topRight'
  });
  interface Notification {
    title: string;
    notification: string;
    mode: string;
  }
  const resetTimer = ref();
  const hideIndex = ref<number[]>([]);
  const hideTimers = ref<any[]>([]);
  const notificationData = ref<Notification[]>([]);

  const clear = computed(() => {
    // 所有提示是否已经全部变为false
    return hideIndex.value.length === notificationData.value.length;
  });
  watch(clear, (to, from) => {
    // 所有提示都消失后重置
    if (!from && to) {
      resetTimer.value = rafTimeout(() => {
        hideIndex.value.splice(0);
        notificationData.value.splice(0);
      }, 300);
    }
  });
  function onEnter(index: number) {
    cancelRaf(hideTimers.value[index]);
    hideTimers.value[index] = null;
  }
  function onLeave(index: number) {
    if (props.duration) {
      hideTimers.value[index] = rafTimeout(() => {
        onClose(index);
      }, props.duration);
    }
  }
  function show() {
    cancelRaf(resetTimer.value);
    hideTimers.value.push(null);
    const index = notificationData.value.length - 1;
    if (props.duration) {
      hideTimers.value[index] = rafTimeout(() => {
        onClose(index);
      }, props.duration);
    }
  }
  function open(obj) {
    notificationData.value.push({
      title: obj.title || props.title,
      notification: obj.notification,
      mode: 'open'
    });
    show();
  }
  function info(obj) {
    notificationData.value.push({
      title: obj.title || props.title,
      notification: obj.notification,
      mode: 'info'
    });
    show();
  }
  function success(obj) {
    notificationData.value.push({
      title: obj.title || props.title,
      notification: obj.notification,
      mode: 'success'
    });
    console.log(notificationData.value);
    show();
  }
  function error(obj) {
    notificationData.value.push({
      title: obj.title || props.title,
      notification: obj.notification,
      mode: 'error'
    });
    show();
  }
  function warn(obj) {
    notificationData.value.push({
      title: obj.title || props.title,
      notification: obj.notification,
      mode: 'warn'
    });
    show();
  }
  defineExpose({
    open,
    info,
    success,
    error,
    warn
  });
  const emit = defineEmits(['close']);
  function onClose(index: number) {
    hideIndex.value.push(index);
    emit('close');
  }
</script>
<template>
  <div
    id="kt_docs_toast_stack_container"
    class="toast-container position-fixed end-0 p-3"
    style="z-index: 1000; top: 70px"
  >
    <div
      class="toast fade show"
      @mouseenter="onEnter(index)"
      @mouseleave="onLeave(index)"
      v-show="!hideIndex.includes(index)"
      v-for="(data, index) in notificationData"
      :key="index"
    >
      <div class="toast-header">
        <i v-if="data.mode === 'warn'" class="ki-duotone ki-abstract-18 fs-2 text-warning me-3">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        <i v-if="data.mode === 'error'" class="ki-duotone ki-abstract-19 fs-2 text-danger me-3">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        <i v-if="data.mode === 'success'" class="ki-duotone ki-abstract-39 fs-2 text-success me-3">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        <i v-if="data.mode === 'info'" class="ki-duotone ki-abstract-27 fs-2 text-primary me-3">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        <i v-if="data.mode === 'open'" class="ki-duotone ki-abstract-28 fs-2 text-primary me-3">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        <strong class="me-auto">{{ data.title }}</strong>
        <!-- <small class="fs-8">11 mins ago</small> -->
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="onClose(index)"
        ></button>
      </div>
      <div class="toast-body">{{ data.notification || '' }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
