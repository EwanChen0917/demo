<template>
  <div class="share-dialog-wrapper">
    <div class="share-dialog">
      <div class="dialog-header">
        <img class="share-dialog__logo" src="./images/image.png" alt="路小特" />
        <span class="share-dialog__title">路小特</span>
        <i class="iconfont icon-guanbi close-tab" @click="handleClose"></i>
      </div>
      <div class="dialog-content">
        <template v-if="loading">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>正在打开路小特客户端，请稍候...</span>
        </template>
        <template v-else-if="status === 'failed'">
          <div>
            <div>若打开链接详情页失败，请在客户端搜索重试</div>
            <div>
              <span>若未安装最新版路小特，请点击 下载路小特</span>
            </div>
          </div>
        </template>
      </div>
      <div class="dialog-footer">
        <el-button type="default" @click="downloadLuteAssistant">下载路小特</el-button>
        <el-button type="primary" :disabled="loading" @click="openLuteAssistant">
          {{ loading ? '正在打开' : '打开路小特' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="LuteAssistantShare">
  import { useStore } from '@/store/modules/useStore';
  import { urlDownload } from '@/utils/download';
  import { openUriWithInputTimeoutHack } from './utils/checkAppInstalled';
  import { useTabs } from '@/hooks/tabs';

  const route = useRoute();
  const { closeCurrentTab } = useTabs();
  const loading = ref(true);
  const status = ref('loading');
  const store = useStore();
  /**
   * uri 打开客户端的uri
   */
  onMounted(() => {
    openLuteAssistant();
  });
  const openLuteAssistant = () => {
    loading.value = true;
    status.value = 'loading';
    openUriWithInputTimeoutHack(
      (route.query.url as string) || 'luteAssistant://check-install/',
      () => {
        loading.value = false;
        status.value = 'failed';
      }
    );
  };

  const downloadLuteAssistant = () => {
    const componentName = navigator.userAgent.includes('Mac')
      ? 'LuteAssistantShareMac'
      : 'LuteAssistantShare';

    const menu = store.nativeMenus.find(
      (item) => item.componentName === componentName && item.menuType === 'button'
    );
    if (menu) {
      urlDownload(menu.redirect);
    }
  };

  const handleClose = () => {
    closeCurrentTab();
  };
</script>

<style lang="scss" scoped>
  .share-dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .share-dialog {
    width: 400px;
    height: 215px;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  .share-dialog__logo {
    flex: none;
    width: 46px;
    height: 46px;
  }
  .share-dialog__title {
    font-size: 18px;
    font-weight: bold;
    margin-left: 12px;
  }
  .dialog-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 24px;
    gap: 10px;
    margin: 20px 0;
    height: 45px;
    .el-icon {
      font-size: 1.2em;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }

  .dialog-header {
    position: relative;
    .close-tab {
      position: absolute;
      top: 0px;
      right: 0px;
      cursor: pointer;
      font-size: 18px;
    }
  }
</style>
