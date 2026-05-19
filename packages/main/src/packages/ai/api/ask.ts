import type { ServerSentEvent } from 'fetch-sse';
import { fetchEventData } from 'fetch-sse';
// 请求提问
export const ask = (
  url: string,
  signal: AbortSignal,
  data: any,
  conversationId: string,
  lastMessageId: string,
  onMessage: (event: ServerSentEvent | null, done?: boolean | undefined) => void,
  onOpen: (res?: Response | undefined) => void,
  onClose: () => void,
  onError: (event: ServerSentEvent | null, done?: boolean | undefined) => void,
  token
) => {
  fetchEventData(url, {
    method: 'POST',
    data: {
      ...data,
      conversation_id: conversationId,
      response_mode: 'streaming',
      auto_generate_name: true,
      parent_message_id: lastMessageId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    signal,
    onMessage,
    onOpen,
    onClose,
    onError,
  });
};

export default {};
