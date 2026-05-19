<template>
  <div class="chat-box">
    <div class="user">
      <div class="question">
        {{ data.query }}
      </div>
    </div>
    <!-- 问答 -->
    <div class="robot">
      <div class="avatar">
        <div class="ai-thumbnail">
          <AiAnimation ref="aiAnimation" />
        </div>
        <span class="thinking-text">
          {{ data.typedStatus === 'end' ? '已完成分析' : 'ERP小助手正在思考中...' }}
        </span>
      </div>
      <div>
        <div class="answer">
          <!-- 处理正常状态，但是没有返回数据 -->
          <template v-if="data.status === 'normal'">
            <!-- <vue-markdown :breaks="true" :html="true" :source="data.answer" /> -->
            <vue-markdown
              ref="container"
              :source="data.answer"
              :plugins="mdPlugins"
              :breaks="true"
              :html="true"
              @rendered="handleRendered"
            />
          </template>
          <template v-if="data.status === 'waiting' || data.typedStatus === 'start'">
            <div class="await-icon" ref="loading-container"></div>
          </template>
          <div v-if="data.status === 'normal' && !data.answer">{{ defaultText }}</div>
        </div>
        <div class="operate" v-if="data.typedStatus === 'end' && data.status === 'normal'">
          <SvgIcon
            width="18"
            height="18"
            tooltip="重新生成"
            title="重新生成"
            icon="re-generate"
            @click="$emit('regenerate', data)"
          />
          <SvgIcon
            width="18"
            height="18"
            tooltip="复制"
            title="复制"
            icon="copy"
            @click="copyFileSync()"
          />
          <SvgIcon
            width="18"
            height="18"
            tooltip="喜欢"
            title="喜欢"
            icon="like"
            :class="['like', { 'is-active': rating === 'like' }]"
            @click="review('like')"
          />
          <SvgIcon
            width="18"
            height="18"
            tooltip="不喜欢"
            title="不喜欢"
            icon="dislike"
            :class="['dislike', { 'is-active': rating === 'dislike' }]"
            @click="review('dislike')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue';
  import VueMarkdown from 'vue3-markdown-it';
  import { ElMessage } from 'element-plus';
  import ImageDownloadPlugin from '../utils/markdownItImageDownload';
  import { useLottie } from '../hooks/useLottie';
  import AiAnimation from './AiAnimation.vue';

  const props = withDefaults(
    defineProps<{
      data: {
        id: string;
        conversation_id: string;
        inputs: any;
        query: string;
        answer: string;
        message_files: any[];
        message_images?: any[];
        feedback: any;
        retriever_resources: any[];
        created_at: number;
        agent_thoughts: any[];
        status: string;
        error: any;
        typingQueue: string[];
        typedStatus: 'start' | 'end' | '';
      };
    }>(),
    {}
  );

  const emit = defineEmits<{
    regenerate: [data: any];
    feedback: [id: string, rating: string | null];
  }>();

  const container = ref(null);

  // 插件配置
  const mdPlugins = [
    {
      plugin: ImageDownloadPlugin,
      options: {
        lazyLoad: true,
      },
    },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy-load');
            img.onload = () => {
              // emit('image-loaded', img.src)
            };
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '200px',
      threshold: 0.01,
    }
  );
  onBeforeUnmount(() => {
    observer.disconnect();
  });
  // 懒加载设置
  const setupLazyLoad = () => {
    const lazyImages = container.value?.$el.querySelectorAll('img.lazy-load');
    lazyImages?.forEach((img) => observer.observe(img));
  };

  // 下载按钮设置
  const setupDownloadButtons = () => {
    const buttons = container.value?.$el.querySelectorAll('.img-dl-btn');
    buttons?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapper = e.currentTarget.closest('.img-wrapper');
        const img = wrapper?.querySelector('img');
        if (img?.src) {
          downloadImage(img.src, img.alt || 'image');
        }
      });
    });
  };

  // 图片下载功能
  const downloadImage = (url, name) => {
    try {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;

      // 处理文件名
      const urlObj = new URL(url);
      let filename = name || urlObj.pathname.split('/').pop() || 'image';

      // 确保有文件扩展名
      if (!filename.includes('.')) {
        const extension = url.split('.').pop()?.split('?')[0] || 'jpg';
        filename = `${filename}.${extension}`;
      }
      console.log(filename, 'filename');
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('下载失败:', error);
      window.open(url, '_blank'); // 备用方案
    }
  };
  const handleRendered = () => {};
  const loadingContainer = useTemplateRef('loading-container');
  onMounted(() => {
    const { initLottie } = useLottie();
    initLottie(loadingContainer, {
      path: new URL(`@/assets/animations/loading.json`, import.meta.url).href,
    });
  });

  const aiAnimation = ref<InstanceType<typeof AiAnimation>>();
  watch(
    () => props.data.typedStatus,
    (newStatus) => {
      nextTick(() => {
        if (newStatus === 'end') {
          setupLazyLoad();
          setupDownloadButtons();
          aiAnimation.value?.onStop();
        }
      });
    },
    { immediate: true }
  );

  const copyFileSync = () => {
    const text = props.data.answer || props.data.typingQueue.join('');
    window.navigator.clipboard.writeText(text);
    // navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('复制成功！');
    // });
  };
  const getIcon = (name) => {
    return new URL(`./images/${name}`, import.meta.url).href;
  };

  const defaultText = ref(
    '非常抱歉，小助手暂时无法处理您的请求。请稍候再试，我们正在努力解决问题。'
  );

  // 点赞
  const rating = ref(props.data?.feedback?.rating);
  const review = (review: string) => {
    rating.value = rating.value === review ? null : review;
    emit('feedback', props.data.id, rating.value);
  };
</script>

<style scoped lang="scss">
  .chat-box {
    word-break: break-word;
    line-height: 22px;
    margin-bottom: 16px;
    font-size: 14px;

    .el-avatar {
      width: 48px;
      height: 48px;
    }

    .user {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      margin-bottom: 28px;

      .question {
        padding: 10px 16px;
        color: #1f1f1f;
        border-radius: 12px;
        white-space: pre-line;
        border-radius: 8px;
        background: var(---N1, #f7f7f7);
      }
    }

    .robot {
      .avatar {
        border-radius: 50%;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: start;
        column-gap: 12px;
        margin-bottom: 20px;
        .avatar-class {
          background-color: #d8f7ec;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: contain;
          object-position: center bottom;
        }
        .thinking-text {
          color: var(---N6, #999);

          /* 常规/Regular 14 */
          font-family: 'PingFang SC';
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
        }
      }

      .el-avatar {
        background: #fff;
      }
    }

    .operate {
      display: flex;
      justify-content: start;
      column-gap: 20px;
      font-size: 24px;
      margin-top: 8px;
      color: #666;
      :deep(.dislike),
      :deep(.like) {
        outline: none;
        &.is-active {
          color: #02b96b;
        }
      }
    }
  }
  .await-icon {
    width: 36px;
    height: 36px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ai-thumbnail {
    width: 36px;
    height: 36px;
  }
</style>

<style lang="css">
  /* 图片包装器样式 */
  .img-wrapper {
    position: relative;
    display: inline-block;
    max-width: 320px;
    margin: 16px 0;
    overflow: hidden;
    border-radius: 4px;
  }

  /* 懒加载图片占位样式 */
  .img-wrapper img.lazy-load {
    background-color: #f5f5f5;
    min-height: 150px;
    width: 100%;
    object-fit: contain;
  }

  /* 下载按钮基础样式 */
  .img-dl-btn {
    position: absolute;
    bottom: 12px;
    right: 12px;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 文本按钮样式 */
  .img-dl-btn.text-btn {
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 13px;
    min-width: 60px;
  }

  /* 图标按钮样式 */
  .img-dl-btn.icon-btn {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }

  .img-wrapper:hover .img-dl-btn {
    opacity: 1;
  }

  .img-dl-btn:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  /* 图标样式 */
  .download-icon {
    display: block;
    margin: auto;
  }
</style>
