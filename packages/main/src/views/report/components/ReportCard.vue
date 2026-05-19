<template>
  <div class="report-detail-card">
    <header>
      <div class="card-title">
        <div
          class="card-title-text"
          :style="{
            cursor: form?.visible && !form?.edit ? 'zoom-out' : !form?.edit ? 'zoom-in' : 'auto',
          }"
          @click.stop="handleVisible"
        >
          <span>分析对象</span>
          <div class="card-operator-line">
            <template v-if="form?.edit">
              <!-- 保存 -->
              <el-icon title="保存" :size="18" @click.stop="save()" color="var(--el-color-primary)">
                <Select />
              </el-icon>
              <!-- 取消 -->
              <el-icon
                title="取消"
                :size="18"
                @click.stop="cancel()"
                color="var(--el-color-danger)"
              >
                <CloseBold />
              </el-icon>
            </template>
            <template v-else>
              <!-- 折叠 -->
              <el-icon title="折叠" :size="18" v-if="form?.visible"><ZoomOut /></el-icon>
              <!-- 展开 -->
              <el-icon title="展开" :size="18" v-else><ZoomIn /></el-icon>
              <!-- 编辑 -->
              <el-icon title="编辑" v-if="isEditPermission" :size="18" @click.stop="edit()">
                <Edit />
              </el-icon>
              <!-- 删除 -->
              <el-icon
                title="删除"
                v-if="isEditPermission"
                :size="18"
                @click.stop="del()"
                color="var(--el-color-danger)"
              >
                <Delete />
              </el-icon>
            </template>
          </div>
        </div>
        <div v-if="form?.edit"><el-input v-model="form.target" placeholder="请输入分析对象" /></div>
        <div
          class="card-content-text"
          :style="{
            cursor: form?.visible ? 'auto' : 'zoom-in',
          }"
          @click.stop="handleContentVisible"
          v-else
        >
          {{ form?.target }}
        </div>
      </div>
    </header>
    <ul class="card-content" :style="{ height: contentHeight }">
      <li class="card-content-item" v-for="(item, i) in config" :key="i">
        <div class="card-title-text">{{ item }}</div>
        <div v-if="form?.edit">
          <ReportEditor v-model="form[i]!" />
        </div>
        <div class="card-content-text" v-else v-html="form?.[i]" @click="view"></div>
      </li>
    </ul>
    <div v-if="form?.edit" class="card-operator-line card-footer">
      <div>
        <div v-if="form?.loading">
          保存
          <el-icon class="is-loading"><Loading /></el-icon>
        </div>
        <div v-else-if="form?.status === 0">
          <span>{{ dayjs().format('HH:mm') }}</span>
          <span>已保存草稿</span>
        </div>
      </div>
      <div class="card-operator-line">
        <!-- 保存 -->
        <el-icon title="保存" :size="18" @click.stop="save()" color="var(--el-color-primary)">
          <Select />
        </el-icon>
        <!-- 取消 -->
        <el-icon title="取消" :size="18" @click.stop="cancel()" color="var(--el-color-danger)">
          <CloseBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { WeekReportDetailBean } from '@/api/marketing/data-contracts';
  import xss from 'xss';
  import dayjs from 'dayjs';
  import ReportEditor from './ReportEditor.vue';

  const emit = defineEmits<{
    save: [
      data: WeekReportDetailBean & { visible?: boolean; edit?: boolean },
      isAutoSave?: boolean
    ];
    del: [data: WeekReportDetailBean & { visible?: boolean; edit?: boolean }];
    autoSave: [errorCb?: () => void, successCb?: () => void];
    cancel: [];
    imgView: [src: string];
  }>();
  withDefaults(
    defineProps<{
      isEditPermission: boolean;
      config: { [key: string]: string };
    }>(),
    {
      isEditPermission: false,
    }
  );
  const form = defineModel<WeekReportDetailBean & { visible?: boolean; edit?: boolean }>();
  watch(form, (newVal, oldVal) => {
    Object.assign(form.value || {}, { edit: oldVal?.edit, visible: oldVal?.visible });
  });
  let timeId: ReturnType<typeof setTimeout> | null = null;
  watch(
    () => form.value?.edit,
    (newVal) => {
      if (newVal) {
        // 清除定时器
        timeId && clearInterval(timeId);
        // 启动定时器，自动保存
        timeId = setInterval(() => {
          emit('save', form.value!, true);
        }, 1000 * 30 * 1);
      } else {
        // 清除定时器
        timeId && clearInterval(timeId);
      }
    },
    { immediate: true }
  );
  onBeforeUnmount(() => {
    timeId && clearInterval(timeId);
  });
  const contentHeight = computed(() => {
    return form.value?.visible ? 'auto' : '0';
  });
  const handleVisible = () => {
    if (form.value?.edit) {
      return;
    }
    form.value!.visible = !form.value!.visible;
  };
  const handleContentVisible = () => {
    form.value!.visible = true;
  };
  const save = () => {
    emit('save', form.value!);
  };
  const del = () => {
    emit('del', form.value!);
  };

  const cancel = () => {
    form.value!.edit = false;
    emit('cancel');
  };

  const edit = () => {
    emit(
      'autoSave',
      () => {
        form.value!.edit = false;
      },
      () => {
        form.value!.edit = true;
        form.value!.visible = true;
      }
    );
  };
  const tramsformHtml = (text?: string) => {
    if (!text) {
      return '';
    }
    return `<p>${xss(text)?.replace(/\n/g, '</p><p>')}</p>`;
  };
  const view = (event) => {
    const { target } = event;
    const nodeName = target?.nodeName;
    if (nodeName === 'IMG') {
      emit('imgView', target?.currentSrc);
    }
  };
</script>

<style lang="scss" scoped>
  .report-detail-card {
    background: rgba(255, 255, 255, 0.88);
    margin: 4px 10px;
    padding: 8px 12px;
    border-radius: 6px;
    .card-title-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.45;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
    }
    .card-operator-line {
      display: flex;
      gap: 8px;
      cursor: pointer;
    }
    .card-footer {
      height: 20px;
      padding-top: 8px;
      justify-content: space-between;
    }
    .card-content {
      // margin-top: 6px;
      overflow: hidden;
      transition: height 0.3s ease-in-out;
      padding: 0;
    }
    .card-content-item {
      margin-top: 10px;
      overflow: hidden;
      :deep(em) {
        font-style: italic;
      }
      :deep(strong) {
        font-weight: 600;
      }
      :deep(ol) {
        list-style-type: decimal;
        list-style-position: outside;
        padding-left: 3em;
      }
      :deep(ol ol) {
        list-style-type: decimal;
        list-style-position: outside;
        padding-left: 1.1em;
      }
      :deep(ul) {
        list-style-type: disc;
        list-style-position: outside;
        padding-left: 3em;
      }
      :deep(ul ul) {
        list-style-type: circle;
        list-style-position: outside;
        padding-left: 1.1em;
      }
      :deep(ul ul ul) {
        list-style-type: square;
        list-style-position: outside;
      }
      :deep(li) {
        text-indent: 0;
      }
    }
    .card-content-text {
      min-height: 1.5em;
      text-indent: 2em;
      word-wrap: break-word;
      :deep(p:empty) {
        height: 1em;
      }
      :deep(img) {
        cursor: pointer;
      }
    }
  }
</style>
