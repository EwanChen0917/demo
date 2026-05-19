<template>
  <div class="report-detail-card cursor-pointer" @click.stop="view(form)">
    <header class="cursor-pointer">
      <div class="card-title">
        <div class="card-title-text">
          <span>{{ reportType === 2 ? '报告' : '计划' }}周期</span>
          <div class="card-operator-line">
            <!-- 复制 -->
            <el-icon title="复制" v-if="isEditPermission" :size="18" @click.stop="copy(form)">
              <CopyDocument />
            </el-icon>
            <!-- 查看 -->
            <el-icon title="查看" :size="18" @click.stop="view(form)"><ZoomIn /></el-icon>
            <!-- 删除 -->
            <el-icon
              title="删除"
              v-if="isEditPermission"
              :size="18"
              @click.stop="del(form)"
              color="var(--el-color-danger)"
            >
              <Delete />
            </el-icon>
          </div>
        </div>
        <div class="card-content-text" @click.stop="editTarget">
          <span>{{ form.startDate }} 至 {{ form.endDate }}</span>
          <el-icon title="编辑" v-if="isEditPermission" :style="{ opacity: 0.6 }"><Edit /></el-icon>
        </div>
      </div>
    </header>
    <ul class="card-content">
      <li class="card-content-item">
        <label class="card-title-text">创建人</label>
        <div class="card-content-text">{{ form.creator }}</div>
      </li>
      <li class="card-content-item">
        <label class="card-title-text">时间</label>
        <div class="card-content-text">创建时间：{{ form.createTime }}</div>
        <div class="card-content-text">更新时间：{{ form.updateTime }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { WeekReportBean } from '@/api/marketing/data-contracts';
  import type { ReportType } from '../type';

  const emit = defineEmits<{
    copy: [data: WeekReportBean];
    view: [data: WeekReportBean];
    del: [data: WeekReportBean];
    editTarget: [data: WeekReportBean];
  }>();
  withDefaults(
    defineProps<{
      isEditPermission: boolean;
      reportType: ReportType; // 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填, 3 - 亚马逊运营周报)
    }>(),
    {
      isEditPermission: false,
    }
  );
  const form = defineModel<WeekReportBean>();
  const copy = (data: WeekReportBean) => {
    emit('copy', data);
  };
  const view = (data: WeekReportBean) => {
    emit('view', data);
  };
  const del = (data: WeekReportBean) => {
    emit('del', data);
  };
  const editTarget = () => {
    emit('editTarget', form.value!);
  };
</script>

<style lang="scss" scoped>
  .report-detail-card {
    background: rgba(255, 255, 255, 0.68);
    margin: 4px 10px;
    padding: 8px 12px;
    border-radius: 6px;
    &:hover {
      box-shadow: -2px 3px 6px rgba(0, 0, 0, 0.15);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .card-title-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.45;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    .card-operator-line {
      display: flex;
      gap: 8px;
      cursor: pointer;
    }
    .card-footer {
      height: 20px;
      padding-top: 8px;
      justify-content: end;
      align-items: center;
    }
    .card-content {
      overflow: hidden;
      transition: height 0.3s ease-in-out;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .card-content-item {
      margin-top: 10px;
    }
    .card-content-text {
      text-indent: 2em;
      min-height: 1.5em;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
</style>
