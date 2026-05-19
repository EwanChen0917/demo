<template>
  <div
    class="chat-window"
    :class="{ 'sticky-top': isStickyTop }"
    :style="{ '--ai-widget-width': `${width}px` }"
  >
    <div class="window-header">
      <span>路特 ERP小助手</span>
      <div class="header-actions">
        <el-tooltip content="开启新对话" effect="dark" placement="top">
          <i
            class="header-icon iconfont icon-tianjia"
            :class="{ disabled: !conversationId }"
            @click="handleAdd"
          ></i>
        </el-tooltip>
        <el-tooltip content="历史对话" effect="dark" placement="top">
          <SvgIcon icon="history" class="header-icon" @click="viewHistory" />
        </el-tooltip>
        <el-tooltip :content="isStickyTop ? '窗口浮动' : '窗口吸附'" effect="dark" placement="top">
          <SvgIcon :icon="isStickyTop ? 'fold' : 'unfold'" class="header-icon" @click="stickyTop" />
        </el-tooltip>
        <el-tooltip content="关闭窗口" effect="dark" placement="top">
          <SvgIcon icon="close" class="header-icon close-icon" @click="close" />
        </el-tooltip>
      </div>
    </div>
    <div class="win">
      <EmptyWin v-if="!conversationId" @auto-send="autoSend" />
      <ChatWin
        v-else
        ref="conversationWin"
        :id="conversationId"
        :isNewId="isNewId"
        @suggest="send"
        @type-end="controller = null"
      />
    </div>
    <div class="input" id="ai-chat-bottom">
      <AiText
        v-model:thinking-flag="thinkingFlag"
        :controller="controller"
        @enter="onEnter"
        @send="send"
        @stop-conversation="stopConversation()"
      />
    </div>
    <div class="drag-handle" ref="dragHandleRef"></div>
    <el-drawer
      v-model="drawer"
      size="auto"
      :with-header="false"
      title="历史对话"
      :direction="direction"
      class="ai-chat-history-drawer"
      destroy-on-close
    >
      <AiHistory @close-history="drawer = false" @view-history="viewHistoryDetail" />
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
  import ChatWin from './AiChatWin.vue';
  import EmptyWin from './AiEmptyWin.vue';
  import AiText from './AiText.vue';
  import useQuestion from '../hooks/useQuestion';
  import AiHistory from './AiHistory.vue';
  import { useDragger } from '../hooks/useDragger';

  const emit = defineEmits<{
    close: [];
  }>();

  const {
    conversationId,
    isNewId,
    controller,
    networkFlag,
    thinkingFlag,
    onEnter,
    autoSend,
    send,
    stopConversation,
  } = useQuestion('conversationWin');

  const handleAdd = () => {
    conversationId.value = '';
    isNewId.value = true;
  };
  const viewHistory = () => {
    drawer.value = true;
  };
  const viewHistoryDetail = (id: string) => {
    conversationId.value = id;
    isNewId.value = false;
    drawer.value = false;
  };

  const isStickyTop = ref(false);
  const dragHandleRef = ref<HTMLElement | null>(null);
  const { width } = useDragger(dragHandleRef, 460);
  const stickyTop = () => {
    isStickyTop.value = !isStickyTop.value;
  };
  const close = () => {
    emit('close');
  };

  const drawer = ref(false);
  const direction = 'ttb';
</script>

<style lang="scss" scoped>
  .chat-window {
    background: url('@/assets/images/decisionAnalysis/ai-header-bg.png') no-repeat top;
    background-size: contain;
    background-color: #ffffff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 12px;
    right: 12px;
    width: var(--ai-widget-width, 460px);
    height: 650px;
    overflow: hidden;
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
    z-index: 1150;
    // 形成单独一个层级，避免被外部样式影响
    transform: scale(1);
    &.sticky-top {
      top: 0;
      right: 0;
      height: 100vh;
      border-radius: 0;
      .drag-handle {
        width: 2px;
        padding: 0 3px 0 0;
      }
    }
    .drag-handle {
      box-sizing: content-box;
      width: 0px;
      cursor: ew-resize;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1001;
      background-clip: content-box;
      &:hover {
        background-color: var(---P6, #02b96b);
      }
    }
    .win {
      flex: 1;
      overflow-y: auto;
    }
    .input {
      flex: none;
      padding: 16px 20px 20px;
    }
  }
  .window-header {
    flex: none;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(---N9, #1f1f1f);

    /* 常规/Medium 14 */
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    .header-actions {
      display: flex;
      column-gap: 20px;
      .header-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 18px;
        color: var(--N6, #999);
        &:hover {
          color: var(--N9, #1f1f1f);
        }
        &.disabled {
          cursor: not-allowed;
          color: var(--N4, #c5c5c5);
        }
      }
      .icon-tianjia {
        color: #02b96b;
      }
    }
  }
  :deep(.ai-chat-history-drawer) {
    --el-drawer-padding-primary: 0;
  }
</style>
