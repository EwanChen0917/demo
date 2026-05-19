import { nextTick, onBeforeUnmount, type Ref } from 'vue';
import { ElLoading } from 'element-plus';
import type { LoadingInstance } from 'element-plus';

export interface RenderLoadingOptions {
  /**
   * 目标元素的 ref（通常是 el-table 的 ref）
   * 如果不传，则默认使用 document.body
   */
  targetRef?: Ref<{ $el: HTMLElement } | HTMLElement | null | undefined>;
}

/**
 * 渲染 Loading 管理 Hook
 *
 * 用于解决大数据量渲染时页面卡顿问题
 * 在数据加载或分页切换时显示 Loading，DOM 渲染完成后隐藏
 */
export function useRenderLoading(options: RenderLoadingOptions = {}) {
  const { targetRef } = options;

  let renderLoadingInstance: LoadingInstance | null = null;

  /**
   * 显示渲染 Loading
   */
  function showRenderLoading() {
    if (renderLoadingInstance) return;

    // 获取目标元素
    let target: HTMLElement | undefined;
    if (targetRef?.value) {
      const refValue = targetRef.value;
      target = '$el' in refValue ? refValue.$el : refValue;
    }

    renderLoadingInstance = ElLoading.service({
      target: target || document.body,
    });
  }

  /**
   * 隐藏渲染 Loading（等待 DOM 渲染完成后）
   *
   * 使用 nextTick + 双 requestAnimationFrame 确保:
   * 1. nextTick: Vue DOM 更新完成
   * 2. 第一个 rAF: 浏览器完成布局计算
   * 3. 第二个 rAF: 浏览器完成绘制，页面可交互
   */
  function hideRenderLoading() {
    nextTick(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          renderLoadingInstance?.close();
          renderLoadingInstance = null;
        });
      });
    });
  }

  /**
   * 强制关闭 Loading（不等待渲染完成）
   */
  function closeRenderLoading() {
    renderLoadingInstance?.close();
    renderLoadingInstance = null;
  }

  // 组件卸载时清理 loading
  onBeforeUnmount(() => {
    closeRenderLoading();
  });

  return {
    showRenderLoading,
    hideRenderLoading,
    closeRenderLoading,
  };
}
