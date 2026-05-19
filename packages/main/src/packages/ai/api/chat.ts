import { useStore } from '@/store/modules/useStore';
import { type AxiosInstance } from 'axios';
import createRequest from '../utils/request-ai';

let request: AxiosInstance | null = null;

export const initRequestApiKey = (apiKey: string) => {
  request = createRequest(apiKey);
};
/**
 * 获取历史会话列表
 * @param lastId
 * @returns
 */
export const getHistoryList = async (limit = 5, lastId = '') => {
  const store = useStore();
  return await request.get('/conversations', {
    params: {
      user: store.userInfo.memberCode,
      last_id: lastId,
      limit,
    },
  });
};
/**
 * 获取历史会话详情
 * @param conversationId 会话ID
 * @returns
 */
export const getHistoryDetail = async (conversationId: string) => {
  const store = useStore();
  return await request.get('/messages', {
    params: {
      user: store.userInfo.memberCode,
      conversation_id: conversationId,
    },
  });
};
/**
 * 重命名会话
 * @param conversationId 会话id
 * @param name 新的会话名
 * @returns
 */
export const renameConversationTitle = async (conversationId: string, name: string) => {
  const store = useStore();
  return await request.post(`/conversations/${conversationId}/name`, {
    name,
    user: store.userInfo.memberCode,
  });
};

/**
 * 删除会话
 * @param conversationId 会话id
 * @returns
 */
export const removeHistoryConversation = async (conversationId: string) => {
  const store = useStore();
  return await request.delete(`/conversations/${conversationId}`, {
    data: {
      user: store.userInfo.memberCode,
    },
  });
};

/**
 * 反馈
 * @param messageId 会话ID
 * @param rating 星级
 * @returns
 */
export const feedback = async (messageId: string, rating: string) => {
  const store = useStore();
  return await request.post(`/messages/${messageId}/feedbacks`, {
    rating,
    user: store.userInfo.memberCode,
  });
};

/**
 * 获取下一轮建议问题列表
 * @param messageId 会话ID
 * @returns
 */
export const getsuggestedList = async (messageId: string) => {
  const store = useStore();
  return await request.get(`/messages/${messageId}/suggested`, {
    params: {
      user: store.userInfo.memberCode,
    },
  });
};

/**
 * 生成会话ID
 * @param params
 * @returns
 */
export const generateConversationId = async (params) => {
  return await request.post(`/generate-conversation`, params);
};

export const stopConversationTask = async (taskId: string) => {
  const store = useStore();
  return await request.post(`/chat-messages/${taskId}/stop`, {
    user: store.userInfo.memberCode,
  });
};

/**
 * 生成图片
 * @param params
 * @returns
 */
export const imagesGenerations = async (params) => {
  return await request.post(`/v3/images/generations`, params);
};
