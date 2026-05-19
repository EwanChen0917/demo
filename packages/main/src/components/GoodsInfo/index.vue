<template>
  <div class="goods-info-wrapper">
    <div v-if="!hideImage" class="position-relative">
      <KeenImagePreview :src="(src as string)" v-bind="imgOptions" />
      <div v-if="disabled" class="overlay">
        <div class="empty">{{ disabledTitle }}</div>
      </div>
    </div>
    <div class="goods-info-text">
      <!--     标题-->
      <div v-if="openUrl" class="text-dark" :class="{ 'open-link': url }" @click="toPath()">
        {{ title || '' }}
      </div>
      <div class="info-title" v-else-if="title">
        <span
          class="text-dark"
          :class="{ link: url || noUrlClick, 'is-disabled': disabled }"
          @click="toPath()"
        >
          <OverflowTooltip :content="title || ''" :line="1" />
        </span>
        <Copy v-if="copyTitle" :content="title" />
        <Tag class="ms-2" v-if="tag" :color="tagColor">{{ tag }}</Tag>
        <span class="ms-2" v-if="$slots.tag">
          <slot name="tag"></slot>
        </span>
      </div>
      <!-- 副标题 -->
      <div class="info-subtitle" v-if="subtitle" :class="{ 'is-disabled': disabled }">
        {{ subtitle || '' }}
        <Copy v-if="copySubtitle" :content="subtitle" />
      </div>
      <div class="en-title" v-if="titleEn">
        <IconOverflowTooltip
          :content="titleEn"
          color="var(---N6, #8a9099)"
          :line="1"
          placement="top"
        />
      </div>
      <!-- 自定义描述 -->
      <div class="info-subtitle description" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { checkPermission } from '@/utils/permission';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import IconOverflowTooltip from '@/components/IconOverflowTooltip/index.vue';

  const props = defineProps<{
    src?: string;
    title?: string;
    titleEn?: string;
    subtitle?: string;
    copyTitle?: boolean;
    copySubtitle?: boolean;
    url?: string;
    permission?: string;
    hideImage?: boolean;
    openUrl?: boolean;
    alwayShowCopy?: boolean;
    disabled?: boolean;
    disabledTitle?: string;
    tag?: string;
    tagColor?: string;
    imgOptions?: Record<string, any>;
    noUrlClick?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'click'): void;
  }>();

  const router = useRouter();
  const toPath = () => {
    if (props.permission && !checkPermission(props.permission)) {
      ElMessage.warning('无查看详情权限');
      return;
    }
    if (!props.url) {
      emit('click');
      return;
    }
    if (props.openUrl) openWindow(props.url);
    else router.push(`${props.url}`);
  };
</script>

<style scoped lang="scss">
  .goods-info-wrapper {
    display: flex;
    align-items: center;
    padding-right: 20px;
    gap: 12px;

    .fa-copy {
      margin-top: -4px;
      margin-left: 10px;
      display: none;
      &.alway-show {
        display: inline-block;
      }
    }

    &:hover {
      .fa-copy {
        display: inline-block;
      }
    }
  }

  .info-title {
    display: flex;
    align-items: center;
    color: var(---N9, #1e2226);

    /* 常规/Medium 14 */
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
  }
  .info-subtitle {
    color: var(---N9, #1e2226);
    word-break: break-all;

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
  .en-title {
    :deep(.content) {
      color: var(---N6, #8a9099);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
  }
  .link {
    cursor: pointer;

    &:hover {
      color: $P4 !important;
    }
  }

  .open-link {
    cursor: pointer;
    &:hover {
      color: $P4 !important;
    }
  }

  .is-disabled {
    color: #00000040 !important;
    font-family: 'DIN';
    font-style: normal;
    font-weight: 500;
  }

  .overlay {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    opacity: 0.8;
    z-index: 999;
    border-radius: 8px;
    left: 0;
    top: 0;
    .empty {
      background-color: rgba(0, 0, 0, 0.75);
      width: 35px;
      height: 35px;
      margin: 7.5px auto;
      fill: #00000099;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: #ffffff;
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
  }
</style>
