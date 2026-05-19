<template>
  <div ref="textInputContainer" class="question-textarea-container">
    <div class="question-textarea">
      <div class="ai-textarea-wrapper">
        <el-input
          class="ai-textarea"
          type="textarea"
          v-model="question"
          autofocus
          placeholder="请输入你的问题，向我提问吧～"
          @keydown.enter.exact.prevent="handleEnterKey($event)"
          @keydown.shift.enter
          :rows="1"
          :autosize="{ minRows: 1, maxRows: 6 }"
          resize="none"
        />
      </div>
      <div class="ai-textarea-footer">
        <div class="function-line">
          <el-tooltip class="box-item" effect="dark" content="切换模型回答" placement="top">
            <CustomSelect
              v-model="modelSelect"
              type="model"
              placeholder="模型"
              :options="modelSelectList"
              prefix="/images/deepseek.png"
              prefixType="image"
              autoWidth
            />
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="边想边搜，擅长深度搜索和调研写作"
            placement="top"
          >
            <el-checkbox-button v-model="thinkingFlag" :true-value="1" :false-value="0">
              <SvgIcon icon="deep" class="operation-icon" />
              <span>深度思考</span>
            </el-checkbox-button>
          </el-tooltip>
        </div>
        <div class="text-operation">
          <div v-if="!!controller" class="stop-btn" @click="$emit('stopConversation')"></div>
          <div v-else :class="['send-btn', { disabled: !question }]" @click="handleSend">
            <SvgIcon width="28" height="28" icon="send" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CustomSelect from './CustomSelect.vue';

  const props = defineProps<{
    controller: any;
  }>();
  const emit = defineEmits<{
    send: [question: string];
    stopConversation: [];
    enter: [e: KeyboardEvent, question: string];
  }>();
  const question = ref(''); // The current question text

  const textInputContainer = ref<HTMLElement | null>(null);
  const focus = () => {
    nextTick(() => {
      document.querySelector('.question-textarea')?.querySelector('textarea')?.focus();
    });
  };
  const handleEnterKey = (event: KeyboardEvent) => {
    emit('enter', event, question.value);
    question.value = '';
  };
  const handleSend = () => {
    emit('send', question.value);
    question.value = '';
  };

  const modelSelect = ref('deepSeek');
  const modelSelectList = [
    {
      label: 'DeepSeek',
      value: 'deepSeek',
      desc: '擅长深度搜索和调研写作',
      imgUrl: '/images/deepseek.png',
    },
  ];
  const thinkingFlag = defineModel<number>('thinkingFlag');
</script>

<style lang="scss" scoped>
  .question-textarea-container {
    position: relative;
    padding: 10px 12px 12px 14px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid var(---N3, #ededed);
    box-shadow: 0 6px 16px 0 rgba(6, 8, 27, 0.04);
  }
  .question-textarea {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .ai-textarea-wrapper {
    width: 100%;
    border: none;
    line-height: 22px;
    outline: none;
    resize: none;
    font-size: 14px;
    display: block;
    padding: 0;
    --td-font-size-m: 14px;
    :deep(.t-textarea__wrapper-inner) {
      line-height: 22px;
    }
    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
  }
  .ai-textarea {
    width: 100%;
    border: none;
    line-height: 21px;
    outline: none;
    resize: none;
    font-size: 14px;
    display: block;
    min-height: 36px;
    flex: 1;
    overflow: hidden;

    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    :deep(.el-textarea__inner) {
      padding: 0;
      background-color: #fff;
      border: none;
      box-shadow: none;
      color: var(---N9, #3c3d40);
      scrollbar-width: thin;
      caret-color: var(---P6);
      &::placeholder {
        font-size: 14px;
        color: #c5c5c5;
        font-weight: 400;
      }
    }
  }
  .el-checkbox-button {
    --el-checkbox-button-checked-bg-color: #fff;
    border-radius: 9px;
    width: 92px;
    overflow: hidden;

    &.is-checked {
      :deep(.el-checkbox-button__inner) {
        border: 1px solid #02b96b;
        color: #02b96b;
        background-color: #fff;
      }
    }

    &.is-disabled {
      :deep(.el-checkbox-button__inner) {
        color: var(---N5, #c5c5c5);
        border: 1px solid var(---N3, #ededed);
        background: #fff;
      }
    }

    :deep(.el-checkbox-button__inner) {
      height: 28px;
      width: 92px;
      padding: 0;
      border-radius: 9px;
      border: 1px solid #ededed;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #1f1f1f;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;

      /* 166.667% */
      &:hover {
        border: 1px solid #ededed;
        background-color: #ededed;
      }
    }
  }
  .operation-icon {
    margin-right: 6px;
    color: #02b96b;
    :deep(svg) {
      width: 18px;
      height: 18px;
    }
  }
  .text-operation {
    flex: none;
    display: flex;
    column-gap: 16px;
    align-items: end;
    .operation-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .operation-icon {
      font-size: 18px;
      height: 18px;
      margin-right: 6px;
    }
    .send-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1f1f1f;
      cursor: pointer;

      &:not(.disabled):hover {
        opacity: 0.8;
      }

      &.disabled {
        background-color: #ededed;
      }

      :deep(svg) {
        color: #fff;
        height: 18px;
        width: 18px;
      }
    }

    .stop-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: #1f1f1f;
      color: #d9d9d9;
      font-size: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &::after {
        content: '';
        background-color: #fff;
        /* 鼠标悬停时的背景色 */
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        /* 圆形背景 */
        opacity: 0;
        /* 初始透明度 */
      }

      &:not(.disabled):hover {
        &::after {
          opacity: 0.08;
          /* 鼠标悬停时显示背景色 */
        }
      }

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 2px;
        display: block;
      }
    }
  }
  .ai-textarea-footer {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .function-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
