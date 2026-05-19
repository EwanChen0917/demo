<template>
  <div class="chat-message-window">
    <div class="chat-content" ref="conversationRef">
      <div class="chat-win" v-loading="loading">
        <Chat
          ref="chatRef"
          v-for="(item, index) in messageList"
          :key="index"
          :data="item"
          @feedback="handleFeedback"
          @regenerate="emit('regenerate', item)"
        />
        <ul class="suggest-list">
          <li class="suggest-item" v-for="s in suggestedList" :key="s" @click="handleSuggest(s)">
            <div>{{ s }}</div>
            <SvgIcon icon="arrow-right" />
          </li>
        </ul>
      </div>
      <div class="bottom-line" ref="bottomLineRef"></div>
    </div>
    <div class="arrow-down" v-if="!isScrolledToBottom" @click="scrollToBottom">
      <SvgIcon width="24" height="24" icon="arrow-down-outline" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getHistoryDetail, getsuggestedList, feedback } from '../api/chat';
  import Chat from './AiChat.vue';
  import useBottomSafeLine from '../hooks/useBottomSafeLine';

  const props = defineProps<{
    id: any;
    isNewId?: boolean;
    controller?: any;
  }>();
  const emit = defineEmits<{
    regenerate: [item: any];
    suggest: [suggest: string];
    stopMessage: [];
    typeEnd: [];
  }>();

  const messageList = ref<any[]>([]);
  const loading = ref(false);
  const getCoversationDetail = async (item: any) => {
    loading.value = true; // 设置加载状态
    try {
      const { data } = await getHistoryDetail(item.id);
      if (data.length !== 0 && !isTyping.value) {
        messageList.value = data.map((item: any) => {
          // if (Route.name === 'new-image-chat') {
          const answer = item.answer || item.error || defaultText.value; // 如果没有回答，赋值默认值
          const arr = answer.split('&&&');
          if (arr[1]) {
            const image = arr[1]
              ?.split(';')
              .map((url) => `!['默认图片'](${url})`)
              .join('\n');
            item.answer = `${arr[0]}\n${image}`;
          } else {
            item.answer = item.answer || item.error || defaultText.value; // 如果没有回答，赋值默认值
          }
          item.typedStatus = 'end'; // 设置打印状态
          return item;
        });
        scrollToBottom(); // 滚动到底部
      }
    } finally {
      loading.value = false; // 重置加载状态
    }
  };
  watch(
    () => props.id,
    () => {
      if (props.isNewId) {
        return;
      }
      getCoversationDetail({ id: props.id });
    },
    {
      immediate: true,
    }
  );
  // 边打印边滚动
  const scroll = () => {
    if (isScrolledToBottom.value && conversationRef.value) {
      requestAnimationFrame(() => {
        conversationRef.value.scrollTop = conversationRef.value.scrollHeight;
      });
    }
  };
  /**
   * 对对话内容发表喜爱
   * @param id messageId
   * @param value
   */
  const handleFeedback = (id: string, value: string | null = 'dislike') => {
    feedback(id, value ?? 'dislike');
  };

  const chatRef = ref<InstanceType<typeof Chat>[]>();
  const isTyping = ref(false); // 是否链接是否进行中
  // 打字机, 开始打印
  const typeChar = (data: any) => {
    isTyping.value = true;
    data.typedStatus = 'start'; // 设置打印状态
    typeNextChar(data);
  };

  const connectEnd = () => {
    // 通信完成
    isTyping.value = false;
  };
  // 打字机打印完成
  const typedEnd = () => {
    querySuggestedList(getLastMessage()?.id); // 获取建议列表
    emit('typeEnd');
  };
  let typedSetTimeoutId: NodeJS.Timeout | undefined; // 打字机定时器id
  const defaultText = ref(
    '非常抱歉，小助手暂时无法处理您的请求。请稍候再试，我们正在努力解决问题。'
  );

  let defalutAnswer = '';
  function typeNextChar(data: any) {
    scroll(); // 滚动到底部
    const char = data.typingQueue.shift();
    if (char) {
      data.answer += char?.toString() ?? ''; // 拼接字符
      defalutAnswer += char?.toString() ?? '';
    }
    const result = isTypedEnd(data); // 判断是否结束
    if (result) {
      !data.answer && (data.answer = defaultText.value); // 如果没有回答，赋值默认值
      typedEnd();
    } else {
      const speed = 37 * Math.max(Math.exp(-0.25 * data.typingQueue.length), 0.36);
      typedSetTimeoutId = setTimeout(typeNextChar, speed, data);
    }
  }
  const isTypedEnd = (data: any) => {
    if (!isTyping.value && data.typingQueue.length === 0) {
      data.typedStatus = 'end';
      typedSetTimeoutId && clearTimeout(typedSetTimeoutId); // 清除定时器
      return true;
    }
    return false;
  };

  /**
   * 建议列表
   */
  const suggestedList = ref<any>([]);
  const querySuggestedList = async (messageId: any) => {
    const ret = await getsuggestedList(messageId);
    suggestedList.value = ret.data;
    scrollToBottom(); // 滚动到底部
  };
  const handleSuggest = (suggest: string) => {
    emit('suggest', suggest);
    suggestedList.value = [];
  };
  const initSuggest = async () => {
    scrollToBottom(); // 滚动到底部
    suggestedList.value = [];
  };

  /**
   * 滚动到底部
   */
  const conversationRef = ref<HTMLDivElement>(); // 会话ref
  const { isScrolledToBottom, bottomLineRef } = useBottomSafeLine(conversationRef); // 自定义hook，判断是否滚动到底部
  const scrollToBottom = () => {
    nextTick(() => {
      if (conversationRef.value) {
        conversationRef.value.scrollTop = conversationRef.value.scrollHeight;
      }
    });
  };

  onActivated(() => {
    scrollToBottom();
  });
  onDeactivated(() => {});
  onBeforeUnmount(() => {
    typedSetTimeoutId && clearTimeout(typedSetTimeoutId); // 清除定时器
  });

  const clearConversationDetail = () => {
    messageList.value = [];
  };

  const getLastMessage = () => {
    return messageList.value[messageList.value.length - 1];
  };
  const addMessage = (message: any) => {
    initSuggest();
    messageList.value.push(message);
    scrollToBottom();
  };
  defineExpose({
    isTyping,
    typeChar,
    connectEnd,
    clearConversationDetail,
    getLastMessage,
    addMessage,
  });
</script>

<style lang="scss" scoped>
  .chat-message-window {
    font-family: sans-serif;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .chat-content {
    width: 100%;
    height: 100%;
    padding: 0 16px 30px;
    box-sizing: border-box;
    scrollbar-gutter: stable;
    overflow: hidden auto;
    /* 预留滚动条空间 */
    .chat-win {
      width: 100%;
      margin: 0 auto;
    }
  }

  .suggest-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: start;
    padding: 0;
    margin: 0;
  }

  .suggest-item {
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #ededed;
    padding: 8px 10px;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;

    &:hover {
      background-color: #ededed;
    }

    .svg-icon {
      color: #1f1f1f;
      font-size: 16px;
    }
  }

  .bottom-line {
    width: 100%;
    height: 1px;
    background-color: transparent;
  }

  .arrow-down {
    cursor: pointer;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid #ededed;
    background-color: #fff;
    position: absolute;
    bottom: 30px;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, 0);
    filter: drop-shadow(0px 6px 16px rgba(6, 8, 27, 0.08));
    font-size: 24px;
    color: #02b96b;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(svg) {
      width: 24px;
      height: 24px;
    }
  }
  // markdown 样式透传
  :deep(.answer) {
    min-height: 40px;
    color: #1f1f1f;
    font-family: 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;

    h6,
    .h6,
    h5,
    .h5,
    h4,
    .h4,
    h3,
    .h3,
    h2,
    .h2,
    h1,
    .h1 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-weight: 400;
      line-height: 1.71;
      color: #1f1f1f;
    }

    h1,
    .h1 {
      font-size: calc(1.3rem + 0.6vw);
    }

    blockquote {
      color: #999;
      border-left: 1px solid #ededed;
      padding-left: 14px;
      padding-bottom: 3px;
      margin: 0;

      &:last-of-type {
        padding-bottom: 0;
        margin-bottom: 24px;
      }
      p {
        color: #999;
        margin: 0;
      }
      ul,
      ol {
        margin: 0;
        margin-left: 1em;
      }
    }

    @media (min-width: 1200px) {
      h1,
      .h1 {
        font-size: 1.75rem;
      }
    }

    h2,
    .h2 {
      font-size: calc(1.275rem + 0.3vw);
    }

    @media (min-width: 1200px) {
      h2,
      .h2 {
        font-size: 1.5rem;
      }
    }

    h3,
    .h3 {
      font-size: 16px;
    }

    @media (min-width: 1200px) {
      h3,
      .h3 {
        font-size: 16px;
      }
    }

    h4,
    .h4 {
      font-size: 15px;
      font-weight: 500;
    }

    h5,
    .h5 {
      font-size: 14px;
      font-weight: 500;
    }

    h6,
    .h6 {
      font-size: 14px;
      font-weight: 500;
    }

    b strong {
      color: #63666a;
    }
    p {
      color: var(---N9, #1f1f1f);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.57;
      /* 171.429% */
      margin-bottom: 12px;
    }
    // 列表
    ol,
    ul {
      list-style-type: initial;
      margin: 0;
      margin-bottom: 12px;
      margin-left: 1em;
    }
    ol p,
    ul p,
    dl p {
      margin-bottom: 0;
    }
    ol ol,
    ul ul,
    ol ul,
    ul ol {
      margin-bottom: 0;
    }
    li {
      font-size: 14px;
      line-height: 1.57;
    }
    table {
      min-width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      th,
      td {
        border: 1px solid #ededed;
        padding: 8px 12px;
        text-align: left;

        &:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }
  :deep(.answer-fold) {
    max-width: 700px;
  }
</style>
