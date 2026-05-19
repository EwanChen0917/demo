<template>
  <section class="chart-card">
    <div class="header">
      <slot name="title">
        <div class="title">{{ title }}</div>
      </slot>
      <div class="actions">
        <template v-if="false">
          <IconTooltip
            :content="transpose ? '切换成横向帕累托图' : '切换成纵向帕累托图'"
            icon-class="transpose-icon Root-tyicon icon-Root-tyshichangfenxi"
            :class="{ portrait: transpose }"
            @click="transpose = !transpose"
          />
          <div class="gap"></div>
        </template>
        <IconTooltip
          :content="currentMode.label"
          :icon-class="currentMode.icon"
          @click="triggerMode"
        />
        <div class="gap"></div>
        <IconTooltip
          v-if="isFullscreen"
          :icon-class="visible ? 'icon-shouqiquanping' : 'icon-quanping'"
          :content="visible ? '退出全屏' : '全屏'"
          @click="handleView"
        />
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="body">
      <slot :name="currentMode.value" :isDialog="false" :transpose="transpose"></slot>
    </div>
    <el-dialog
      class="bi-tag-trend-dialog"
      v-model="visible"
      destroy-on-close
      :showClose="false"
      align-center
    >
      <template #header>
        <div class="dialog-header">
          <div class="dialog-title">{{ title }}</div>
          <div class="dialog-actions">
            <template v-if="allowTranspose">
              <IconTooltip
                :content="transpose ? '切换成横向帕累托图' : '切换成纵向帕累托图'"
                icon-class="transpose-icon Root-tyicon icon-Root-tyshichangfenxi"
                :class="{ portrait: transpose }"
                @click="transpose = !transpose"
              />
              <div class="gap"></div>
            </template>
            <i
              class="iconfont"
              :class="currentDialogMode.icon"
              @click="dialogMode = dialogMode === 'chart' ? 'table' : 'chart'"
            ></i>
            <div class="gap"></div>
            <i class="iconfont icon-guanbi" @click="visible = false"></i>
          </div>
        </div>
      </template>
      <component :is="$slots[dialogMode]" :isDialog="true" :transpose="transpose" />
    </el-dialog>
  </section>
</template>

<script lang="ts" setup>
  import IconTooltip from './IconTooltip.vue';

  withDefaults(
    defineProps<{
      allowTranspose?: boolean;
      title: string;
      isFullscreen?: boolean;
    }>(),
    {
      allowTranspose: false,
      isFullscreen: true,
    }
  );
  const emit = defineEmits<{
    (e: 'modeChange', mode: 'chart' | 'table'): void;
  }>();
  const mode = ref<'chart' | 'table'>('chart');
  const modeList = [
    { label: '切换成表格', value: 'chart', icon: 'Root-tyicon icon-Root-tyshichangfenxi' },
    { label: '切换成图表', value: 'table', icon: 'Root-tyicon icon-Root-tydingdao' },
  ];
  const currentMode = computed(() => {
    return modeList.find((item) => item.value === mode.value)!;
  });
  const transpose = ref(false); // 是否转置,false:默认横向，true:纵向
  const triggerMode = () => {
    mode.value = mode.value === 'chart' ? 'table' : 'chart';
    emit('modeChange', mode.value);
  };

  const dialogMode = ref<'chart' | 'table'>('chart');
  const currentDialogMode = computed(() => {
    return modeList.find((item) => item.value === dialogMode.value)!;
  });
  const visible = ref(false);
  const handleView = () => {
    visible.value = !visible.value;
    dialogMode.value = mode.value;
  };
</script>

<style lang="scss" scoped>
  .chart-card {
    border: 1px solid var(---N2, #f5f5f5);
    border-radius: 10px;
    padding-bottom: 18px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;

      .title {
        color: var(---N9, #1f1f1f);

        /* 常规/Medium 14 */
        font-family: 'PingFang SC Medium', 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }
      .actions {
        display: flex;
        align-items: center;

        .gap {
          width: 24px;
          height: 1px;
        }
      }
    }
    .body {
      padding: 0 16px;
    }
  }
  :deep(.transpose-icon) {
    transform: scaleX(-1);
    &.portrait {
      transform: scaleX(-1) rotate(-90deg);
    }
  }
  .bi-tag-trend-dialog {
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dialog-title {
      color: var(---N9, #1f1f1f);

      /* 重要/Medium 16 */
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 150% */
    }
    .dialog-actions {
      display: flex;
      column-gap: 12px;
      align-items: center;
      .iconfont,
      .Root-tyicon {
        font-size: 16px;
        color: var(---N6, #999);
        cursor: pointer;
      }
    }
    .gap {
      height: 12px;
      width: 1px;
      background: var(---N4, #dedede);
    }
    .el-dialog__body {
      max-width: unset;
    }
  }
</style>
