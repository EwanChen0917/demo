import type { ServerSentEvent } from 'fetch-sse';
import { ElMessage, type UploadFile } from 'element-plus';
import { useStore } from '@/store/modules/useStore';
import { ask } from '../api/ask';
import { generateConversationId, stopConversationTask } from '../api/chat';

export default function useQuestion(templateRef: string) {
  const apikey = inject('apikey', import.meta.env.VITE_APP_CHAT_API_KEY);
  // const chatStore = useChat();
  const networkFlag = ref(0); // 网络标识，是否联网搜索
  const thinkingFlag = ref(1); // 深度思考标识，是否深度思考
  const chatLoading = ref(false); // 是否正在生成会话
  const chatHost = ref(import.meta.env.VITE_APP_AI_HOST); // AI主机地址

  const conversationId = ref<string>(''); // 当前会话id
  const isNewId = ref<boolean>(false); // 是否是新会话
  const controller = ref<AbortController | null>(null); // 是否正在生成中

  let conversationWinRef = useTemplateRef(templateRef); // 会话窗口ref

  const fileList = ref<(UploadFile & { id: string; ext: string })[]>([]);

  const onEnter = (e: any, question: string) => {
    e.preventDefault();
    // shift + enter 换行
    if (e.keyCode === 13 && e.shiftKey) {
      question += '\n';
    } else {
      // enter 提交
      send(question);
    }
  };

  const autoSend = (question: string) => {
    send(question);
  };

  const send = (question: string) => {
    submitQuestion(question);
  };

  const submitQuestion = async (question: string, token: string = apikey) => {
    // 如果没有问题，直接返回
    if (!question) return;
    const inputs = {
      network_flag: networkFlag.value,
      thinking_flag: thinkingFlag.value,
    };
    const newTask = shallowReactive({
      query: question,
      conversation_id: conversationId.value,
      inputs,
      message_files: [],
      answer: '',
      status: 'waiting',
      typingQueue: [],
    });
    // 新对话
    const data = constructQuestion(question, fileList.value, inputs, conversationId.value);
    fileList.value = []; // 清空文件
    question = ''; // 清空问题
    if (!conversationId.value) {
      conversationId.value = await generateId(data);
      isNewId.value = true;
      newTask.conversation_id = conversationId.value;
      // 等待组件渲染完成
      await nextTick();
    }
    if (!conversationWinRef?.value) {
      conversationWinRef = useTemplateRef(templateRef); // 会话窗口ref
    }
    const lastMessageId = conversationWinRef.value?.getLastMessage()?.id;
    conversationWinRef.value?.addMessage(newTask);
    await nextTick();
    controller.value = new AbortController();
    const { signal } = controller.value;
    ask(
      `${chatHost.value}/v1/chat-messages`,
      signal,
      data,
      conversationId.value,
      lastMessageId,
      onMessage.bind(conversationWinRef.value),
      onOpen.bind(conversationWinRef.value),
      onClose.bind(conversationWinRef.value),
      onError.bind(conversationWinRef.value),
      token
    );
    // 刷新会话列表
    // chatStore.getLatestChat();
  };
  function onMessage(this, event: any) {
    if (event.data) {
      const data = JSON.parse(event.data);
      // const task = currentConversationDetail.value.find((item: any) => item.id === data.message_id);
      const task = this?.getLastMessage();
      if (task && data.event === 'workflow_started') {
        task.id = data.message_id;
        task.conversation_id = data.conversation_id;
        task.task_id = data.task_id;
        task.typingQueue = []; // 清空typingQueue
      } else if (task && data.event === 'message') {
        if (task.id === data.message_id) {
          // task.answer += data.answer || "";
          task.status = 'normal';
          // eslint-disable-next-line no-unused-expressions
          task && task.typingQueue && task.typingQueue.push(...(data.answer || []));
          // eslint-disable-next-line no-unused-expressions
          // 使用数据通信不采用ref，防止ref改变，导致打印出错
        }
      } else if (data.event === 'message_end' || data.event === 'workflow_finished') {
        if (task.id === data.message_id) {
          task.retriever_resources = data?.metadata?.retriever_resources || [];
          task.status = 'normal';
          nextTick(() => {
            this?.connectEnd();
          });
          // loading.value = false;
          // getsuggestedList(data.message_id);
        }
      }
    }
  }
  function onOpen(this, res?: Response) {
    chatLoading.value = true;
    const task = this?.getLastMessage();
    console.log('onOpen', task);
    this?.typeChar(task);
  }
  function onClose(this) {
    chatLoading.value = false;
    // 刷新会话列表
    // chatStore.getLatestChat();
    this?.connectEnd();
  }
  function onError(this, error: ServerSentEvent | null) {
    console.log('error', error);
    if (
      !['signal is aborted without reason', 'BodyStreamBuffer was aborted'].includes(error?.message)
    ) {
      ElMessage.error(error?.message);
      const task = this?.getLastMessage();
      task && (task.status = 'error');
    }
    chatLoading.value = false;
    controller.value = null;
    this?.connectEnd();
  }

  const stopConversation = async () => {
    chatLoading.value = false;
    if (controller.value) {
      controller.value && controller.value.abort();
      ElMessage.warning('对话已结束');
      stopConversationTask(conversationId.value);
      controller.value = null;
      conversationWinRef?.value?.connectEnd();
    }
  };

  return {
    conversationId,
    isNewId,
    networkFlag,
    thinkingFlag,
    controller,
    onEnter,
    autoSend,
    stopConversation,
    send,
  };
}

const constructQuestion = (question: string, fileList: any[], inputs: any, conversationId) => {
  const store = useStore();
  const userCode = store.userInfo.memberCode;
  const data = {
    inputs,
    query: question,
    user: userCode,
  };
  return data;
};

const generateId = async (body) => {
  const res = await generateConversationId({
    inputs: body.inputs,
    message_files: body.files,
    query: body.query,
    user: body.user,
    auto_generate_name: false,
  });
  return res.conversation_id;
};
