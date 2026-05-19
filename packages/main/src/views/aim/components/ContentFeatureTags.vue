<template>
  <div ref="containerRef" class="content-feature-tags">
    <!-- 隐藏的测量容器，用于获取每个标签的实际宽度 -->
    <div ref="measureRef" class="measure-container">
      <el-tag
        v-for="(value, index) in features"
        :key="`measure-${index}`"
        :ref="(el) => setMeasureTagRef(el, index)"
        type="info"
        color="#f5f5f5"
      >
        <span v-html="getHighlightedFeature(value)"></span>
      </el-tag>
    </div>

    <!-- 实际显示的标签 -->
    <div class="visible-tags">
      <el-tag v-for="value in visibleFeatures" :key="value" type="info" color="#f5f5f5">
        <span v-html="getHighlightedFeature(value)"></span>
      </el-tag>

      <!-- 显示更多标签的 tooltip -->
      <el-tooltip
        v-if="hiddenFeatures.length > 0"
        placement="top"
        :popper-options="{ modifiers: [{ name: 'offset', options: { offset: [0, 8] } }] }"
      >
        <template #content>
          <div class="tooltip-tags">
            <!-- <el-tag v-for="value in hiddenFeatures" :key="value" type="info" color="#f5f5f5">
              <span v-html="getHighlightedFeature(value)"></span>
            </el-tag> -->
            <div v-for="value in hiddenFeatures" :key="value">
              <span v-html="getHighlightedFeature(value)"></span>
            </div>
          </div>
        </template>
        <el-tag type="info" color="#f5f5f5" class="more-tag">+{{ hiddenFeatures.length }}</el-tag>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
  import { highlightText } from '@/utils/highlight';

  const props = defineProps<{
    features: string[];
    highlightKeywords?: string[];
    maxRows?: number;
  }>();

  const MAX_ROWS = computed(() => props.maxRows ?? 3);
  const TAG_GAP = 6; // 标签之间的间距
  const ROW_HEIGHT = 24; // 单行高度（包含间距）

  const containerRef = ref<HTMLElement | null>(null);
  const measureRef = ref<HTMLElement | null>(null);
  const measureTagRefs = ref<Map<number, HTMLElement>>(new Map());

  // 容器宽度
  const containerWidth = ref(0);
  // 每个标签的宽度
  const tagWidths = ref<number[]>([]);
  // 可见的标签数量
  const visibleCount = ref(0);

  /** 设置测量标签的 ref */
  function setMeasureTagRef(el: any, index: number) {
    if (el) {
      measureTagRefs.value.set(index, el.$el || el);
    }
  }

  /** 高亮内容特征 */
  function getHighlightedFeature(feature: string): string {
    if (!props.highlightKeywords?.length) return feature;
    return highlightText(feature, props.highlightKeywords);
  }

  /** 计算可见标签数量 */
  function calculateVisibleCount() {
    if (!containerWidth.value || tagWidths.value.length === 0) {
      visibleCount.value = props.features.length;
      return;
    }

    const availableWidth = containerWidth.value;
    let currentRowWidth = 0;
    let rowCount = 1;
    let count = 0;

    // 预估 "+x" 标签的宽度（大约 40px）
    const moreTagWidth = 40;

    for (let i = 0; i < tagWidths.value.length; i++) {
      const tagWidth = tagWidths.value[i];
      const widthWithGap = i === 0 || currentRowWidth === 0 ? tagWidth : tagWidth + TAG_GAP;

      // 检查是否需要换行
      if (currentRowWidth + widthWithGap > availableWidth) {
        rowCount++;
        currentRowWidth = tagWidth;
      } else {
        currentRowWidth += widthWithGap;
      }

      // 如果已经到达最大行数，检查是否还有更多标签
      if (rowCount > MAX_ROWS.value) {
        break;
      }

      // 如果当前是最后一行，需要预留 "+x" 标签的空间
      if (rowCount === MAX_ROWS.value && i < tagWidths.value.length - 1) {
        // 检查后面的标签是否还能放下
        let remainingWidth = availableWidth - currentRowWidth;
        let canFitMore = true;

        for (let j = i + 1; j < tagWidths.value.length; j++) {
          const nextWidth = tagWidths.value[j] + TAG_GAP;
          if (remainingWidth >= nextWidth) {
            remainingWidth -= nextWidth;
          } else {
            canFitMore = false;
            break;
          }
        }

        // 如果不能全部放下，需要为 "+x" 预留空间
        if (!canFitMore) {
          // 检查当前标签加上 "+x" 是否超出
          if (currentRowWidth + TAG_GAP + moreTagWidth > availableWidth) {
            // 需要回退一个标签
            break;
          }
        }
      }

      count = i + 1;
    }

    visibleCount.value = count;
  }

  /** 测量所有标签的宽度 */
  function measureTagWidths() {
    nextTick(() => {
      const widths: number[] = [];
      measureTagRefs.value.forEach((el, index) => {
        if (el) {
          widths[index] = el.offsetWidth;
        }
      });
      tagWidths.value = widths;
      calculateVisibleCount();
    });
  }

  /** 更新容器宽度 */
  function updateContainerWidth() {
    if (containerRef.value) {
      containerWidth.value = containerRef.value.offsetWidth;
    }
  }

  // 可见的特征
  const visibleFeatures = computed(() => {
    return props.features.slice(0, visibleCount.value);
  });

  // 隐藏的特征
  const hiddenFeatures = computed(() => {
    return props.features.slice(visibleCount.value);
  });

  // ResizeObserver 监听容器宽度变化
  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    updateContainerWidth();
    measureTagWidths();

    // 监听容器宽度变化
    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateContainerWidth();
        calculateVisibleCount();
      });
      resizeObserver.observe(containerRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

  // 监听 features 变化
  watch(
    () => props.features,
    () => {
      measureTagRefs.value.clear();
      nextTick(() => {
        measureTagWidths();
      });
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped>
  .content-feature-tags {
    width: 100%;
    position: relative;
  }

  .measure-container {
    position: absolute;
    visibility: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    pointer-events: none;
  }

  .visible-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    :deep(.el-tag) {
      color: #606266;
    }
  }

  .more-tag {
    cursor: pointer;
  }

  .tooltip-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 300px;
  }
</style>
