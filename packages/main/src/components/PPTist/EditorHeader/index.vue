<template>
  <div class="editor-header">
    <div class="left">
      <div class="title">
        {{ title }}
      </div>
    </div>

    <div class="right">
      <div v-if="!isShare" class="menu-item" @click="() => canUndo && undo()">
        <el-tooltip content="撤销 Ctrl + Z" placement="top">
          <i class="iconfont icon-chexiao" :class="{ disabled: !canUndo }"></i>
        </el-tooltip>
      </div>
      <div v-if="!isShare" class="menu-item" @click="() => canRedo && redo()">
        <el-tooltip content="重做 Ctrl + Y" placement="top">
          <i class="iconfont icon-zhongzuo" :class="{ disabled: !canRedo }"></i>
        </el-tooltip>
      </div>
      <!--      {{ exporting }}-->
      <div class="menu-item" @click="handleExportPPTX(slides)">
        <el-tooltip content="下载" placement="top">
          <i class="iconfont icon-xiazai"></i>
        </el-tooltip>
      </div>
      <div class="menu-item" @click="sharePPT">
        <el-tooltip content="分享" placement="top">
          <i class="Root-tyicon icon-Root-tyfenxiang"></i>
        </el-tooltip>
      </div>
      <Divider type="vertical" style="height: 16px" />
      <el-tooltip content="演示" placement="top">
        <div class="menu-item-play" @click="enterScreeningFromStart()">
          <i class="Root-tyicon icon-Root-tyyanshi"></i>
          <span class="play">演示</span>
        </div>
      </el-tooltip>
    </div>

    <!--    <Drawer :width="320" v-model:visible="hotkeyDrawerVisible" placement="right">
      <HotkeyDoc />
      <template #title>快捷操作</template>
    </Drawer>-->

    <!--    <FullscreenSpin :loading="exporting" tip="正在导入..." />-->
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref, useTemplateRef } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '@/store/modules/main';
  import { useSlidesStore } from '@/store/modules/slides';
  import useScreening from '@/components/PPTist/hooks/useScreening';
  import useImport from '@/components/PPTist/hooks/useImport';
  import useSlideHandler from '@/components/PPTist/hooks/useSlideHandler';
  import FullscreenSpin from '@/components/PPTist/components/FullscreenSpin.vue';
  import Input from '@/components/PPTist/components/Input.vue';
  import type { DialogForExportTypes } from '@/components/PPTist/types/export';

  import FileInput from '@/components/PPTist/components/FileInput.vue';
  import Drawer from '@/components/PPTist/components/Drawer.vue';
  import Popover from '@/components/PPTist/components/Popover.vue';
  import PopoverMenuItem from '@/components/PPTist/components/PopoverMenuItem.vue';
  import Divider from '@/components/PPTist/components/Divider.vue';
  import useHistorySnapshot from '@/components/PPTist/hooks/useHistorySnapshot';
  import { useSnapshotStore } from '@/store/modules';
  import useExport from '@/components/PPTist/hooks/useExport';
  import { copyFn } from '@/utils/copyFn';
  import { useReport } from '@/views/newProductAnalysis/hooks/useReport';
  import HotkeyDoc from './HotkeyDoc.vue';

  const { report } = useReport();

  const { canUndo, canRedo } = storeToRefs(useSnapshotStore());
  const { redo, undo } = useHistorySnapshot();
  const mainStore = useMainStore();
  const slidesStore = useSlidesStore();
  const { title, slides, projectId } = storeToRefs(slidesStore);
  const { enterScreening, enterScreeningFromStart } = useScreening();
  // const { importSpecificFile, importPPTXFile, importJSON, exporting } = useImport();
  const { exportPPTX, exporting } = useExport();
  const { resetSlides } = useSlideHandler();

  const isShare = inject('isShare');
  const mainMenuVisible = ref(false);
  const hotkeyDrawerVisible = ref(false);
  const editingTitle = ref(false);
  const titleValue = ref('');
  const titleInputRef = useTemplateRef<InstanceType<typeof Input>>('titleInputRef');

  const startEditTitle = () => {
    titleValue.value = title.value;
    editingTitle.value = true;
    nextTick(() => titleInputRef.value?.focus());
  };

  const handleUpdateTitle = () => {
    slidesStore.setTitle(titleValue.value);
    editingTitle.value = false;
  };

  const setDialogForExport = (type: DialogForExportTypes) => {
    mainStore.setDialogForExport(type);
    mainMenuVisible.value = false;
  };

  const router = useRouter();
  const sharePPT = () => {
    const path = router.resolve({
      name: 'newProductAnalysisPPT',
      query: { shareId: projectId.value },
    });
    copyFn(`${window.location.origin}${path.href}`, '链接');

    report('click_share_result', {
      task_id: projectId.value,
      file_name: title.value,
    });
  };

  const handleExportPPTX = (slides) => {
    exportPPTX(slides, false, false);

    report('click_download_report', {
      task_id: projectId.value,
      file_name: title.value,
    });
  };
</script>

<style lang="scss" scoped>
  .editor-header {
    height: 53px;
    background-color: #fff;
    user-select: none;
    border-bottom: 1px solid $N3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
  .menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 16px;
    border-radius: 5.25px;
    cursor: pointer;

    icon-Root,
    .Root-tyicon {
      color: #666;
    }
    .disabled {
      color: $N4;
      cursor: not-allowed;
    }

    .text {
      width: 18px;
      text-align: center;
      font-size: 17px;
    }
    .ai {
      background: linear-gradient(270deg, #d897fd, #33bcfc);
      background-clip: text;
      color: transparent;
      font-weight: 700;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }

  .menu-item-play {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    border-radius: 20px;
    background-color: $N2;
    cursor: pointer;
    line-height: 22px; /* 169.231% */

    .play {
      color: $N9;
      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
    }
  }
  .popover-menu-item {
    display: flex;
    padding: 8px 10px;

    .icon {
      font-size: 18px;
      margin-right: 12px;
    }
  }
  .statement {
    font-size: 12px;
    color: #999;
    padding: 8px 10px;
    font-style: italic;
  }
  .main-menu {
    width: 300px;
  }
  .ai-menu {
    background: linear-gradient(270deg, #f8edff, #d4f1ff);
    color: $themeColor;
    border-radius: $borderRadius;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      font-size: 22px;
      margin-right: 16px;
    }
    .aippt-content {
      display: flex;
      flex-direction: column;
    }
    .aippt {
      font-weight: 700;
      font-size: 16px;

      span {
        background: linear-gradient(270deg, #d897fd, #33bcfc);
        background-clip: text;
        color: transparent;
      }
    }
    .aippt-subtitle {
      font-size: 12px;
      color: #777;
      margin-top: 5px;
    }
  }

  .import-section {
    padding: 5px 0;

    .import-label {
      font-size: 12px;
      color: #999;
      margin-bottom: 6px;
    }
    .import-grid {
      display: flex;
      gap: 8px;
      justify-content: space-between;
    }
    .import-block {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px 8px;
      border-radius: $borderRadius;
      border: 1px solid $borderColor;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background-color: #f1f1f1;
      }
      .icon {
        font-size: 24px;
        margin-bottom: 2px;
      }
      .label {
        font-size: 12px;
        text-align: center;
      }
      .sub-label {
        font-size: 10px;
        color: #999;
      }
    }
  }

  .group-menu-item {
    height: 30px;
    display: flex;
    margin: 0 8px;
    padding: 0 2px;
    border-radius: $borderRadius;

    &:hover {
      background-color: #f1f1f1;
    }

    .menu-item {
      padding: 0 3px;
    }
    .arrow-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .title {
    height: 22px;
    line-height: 22px;
    font-size: 13px;
    color: $N9;
    font-family: 'PingFang SC Medium';
    /*.title-text {
      min-width: 20px;
      max-width: 400px;
      line-height: 22px;
      border-radius: $borderRadius;
      cursor: pointer;

      @include ellipsis-oneline();

      &:hover {
        background-color: #f1f1f1;
      }
    }*/
  }
  .github-link {
    display: inline-block;
    height: 30px;
  }
</style>
