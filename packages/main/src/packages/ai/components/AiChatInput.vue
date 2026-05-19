<template>
  <AiText
    v-model="question"
    :controller="controller"
    v-model:thinking-flag="thinkingFlag"
    @enter="(event, question) => emit('onEnter', event, question)"
    @send="(question) => emit('send', question)"
    @stop-conversation="() => emit('stopConversation')"
  />
</template>

<script lang="ts" setup>
  import AiText from './AiText.vue';

  const props = withDefaults(
    defineProps<{
      controller?: any; // Controller for managing conversation state
      networkEnable?: number; // Flag to indicate if network search is enabled
      thinkingEnable?: number; // Flag to indicate if deep thinking is enabled
      size?: string; // Flag to indicate if deep thinking is enabled
      style?: string; // Flag to indicate if deep thinking is enabled
      model_select?: string; // Flag to indicate if deep thinking is enabled
      disabled?: boolean; // Flag to indicate if the input is disabled
    }>(),
    {
      networkEnable: 0, // Default to 0 (disabled) if not provided
      thinkingEnable: 1, // Default to 1 (enabled) if not provided
    }
  );

  const question = ref('');
  const thinkingFlag = ref<number>(1); // Default to enabled
  const inputType = ref<'text' | 'speech'>('text');

  const emit = defineEmits<{
    send: [question: string];
    stopConversation: [];
    onEnter: [e: KeyboardEvent, question: string]; // Event for handling Enter key press
  }>();
</script>

<style lang="scss" scoped></style>
