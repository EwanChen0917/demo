<template>
  <DeedbackIcon v-if="showDeedBack" @close="showDeedBack = false" />
  <PptEditor v-loading="loading" />
</template>

<script setup lang="ts" name="newProductAnalysisPPT">
  import { newProductApi } from '@/api';
  import DeedbackIcon from '@/views/newProductAnalysis/components/deedbackIcon.vue';
  import PptEditor from '@/views/pptEditor/index.vue';
  import { useSlidesStore, useSnapshotStore } from '@/store/modules';
  import { storeToRefs } from 'pinia';
  import { deleteDiscardedDB } from '@/components/PPTist/utils/database';

  const slidesStore = useSlidesStore();
  const snapshotStore = useSnapshotStore();

  const route = useRoute();
  const showDeedBack = ref(true);
  const pptId = route.query?.projectId || route.query?.shareId;

  const loading = ref(false);
  const slides = ref([]);
  const queryPPT = async () => {
    // if (!pptId || pptId === projectId.value) return;
    try {
      loading.value = true;
      slidesStore.setProjectId(parseInt(pptId, 10));
      const pptInfo = await newProductApi.luteosAiNpoProjectGetPptInfo({
        projectId: pptId,
      });
      const pptData = pptInfo?.data;

      slides.value = pptData?.slides || [];
      slidesStore.setProjectId(pptId);
      slidesStore.setSlides(slides.value);
      slidesStore.setTitle(pptData?.title);
      await deleteDiscardedDB();
      await snapshotStore.initSnapshotDatabase();
    } finally {
      loading.value = false;
    }
  };
  onMounted(async () => {
    await queryPPT();
  });

  onActivated(async () => {
    await queryPPT();
  });

  provide('isShare', !!route.query?.shareId);
  // provide('slides', slides);
</script>

<style scoped lang="scss">
  .result-container {
    padding: 16px;
    background-color: #ffffff;

    .result-title {
      font-size: 16px;
      font-weight: bold;
      color: #1f1f1f;
    }
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .result-card {
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #e6e6e6;
    & + & {
      margin-top: 16px;
    }
  }

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #1f1f1f;
    margin-bottom: 5px;
  }

  .result-progress {
    display: flex;
    align-items: center;
    gap: 4px;
    .num {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .node-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 24px;
    margin-top: 16px;
    .node-item {
      width: 200px;
      height: 46px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      border-radius: 8px;
      color: #1f1f1f;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
      .statusDesc {
        font-size: 10px;
        color: #999;
      }
      &:not(.disabled) {
        cursor: pointer;
      }
      &:not(.disabled):hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.9);
        border-color: rgba(64, 158, 255, 0.3);

        &::before {
          transform: translateX(100%);
        }

        /*icon-Root, .Root-tyicon {
        transform: scale(1.15);
        text-shadow: 0 0 8px currentColor;
      }*/
      }
    }
  }

  .result-info {
    width: 100%;
    background-color: #ffffff;
  }

  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #fff;
  }

  .icon-chenggongzhuangtai {
    color: var(--el-color-primary);
  }

  .icon-cuowuzhuangtai {
    color: var(--el-color-danger);
  }

  .icon-zhuyizhuangtai {
    color: var(--el-color-warning);
  }

  .icon-shujutongbu1 {
    color: #258dff;
  }
</style>
