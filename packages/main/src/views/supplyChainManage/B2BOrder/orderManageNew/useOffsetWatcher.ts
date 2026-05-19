import { ref, onMounted, onUnmounted, Ref } from 'vue';

interface UseTableHeaderStickyProps {
  scrollContainer: Ref<HTMLElement | null> | HTMLElement | null;
  tableWrapper: Ref<HTMLElement | null> | HTMLElement | null;
  titleSelector?: string; // 标题元素的选择器，默认 '.add-title3'
  stickyTop?: number; // 吸顶位置，默认 98px（tabs 高度）
  offset?: number; // 额外偏移量，可以微调触发时机
  fixedHeaderHeight?: number; // fixed元素的高度，用于判断表格是否被遮挡，默认 0
}



export const useTableHeaderSticky = (
  props: UseTableHeaderStickyProps
) => {
  const { 
    scrollContainer, 
    tableWrapper, 
    titleSelector = '.add-title3',
    stickyTop = 98, 
    offset = 0,
    fixedHeaderHeight = 0
  } = props;
  const isSticky = ref(false);
  const stickyHeight = ref(0); // 标题高度
  const stickyWidth = ref(0); // 标题宽度
  const rafId = ref<number | null>(null);
  const observer = ref<IntersectionObserver | null>(null);
  const isTableInView = ref(false); // 表格是否在可视区域内

  // 获取实际的 DOM 元素
  const getElement = (el: Ref<HTMLElement | null> | HTMLElement | null): HTMLElement | null => {
    if (!el) return null;
    return 'value' in el ? el.value : el;
  };

  // 计算表格是否应该吸顶
  const calculateSticky = () => {
    const container = getElement(scrollContainer);
    const wrapper = getElement(tableWrapper);
    if (!container || !wrapper) {
      isSticky.value = false;
      return;
    }
    // 获取滚动容器的边界
    const containerRect = container.getBoundingClientRect();
    // 获取表格容器的边界
    const tableRect = wrapper.getBoundingClientRect();
    // 计算实际的吸顶线位置（相对于视口）
    const stickyLine = containerRect.top + stickyTop + offset;
    // console.log(`stickyLine`, stickyLine)
    // console.log(`tableRect`, tableRect.top)
    // console.log(`tableRect`, tableRect.bottom)
    // console.log(`isTableInView`, isTableInView.value)
    // 吸顶条件：
    // 1. 表格顶部到达或超过吸顶线
    // 2. 表格底部还在吸顶线下方（表格还有内容在下面）
    // 3. 表格在可视区域内
    // 4. 考虑fixed元素高度，表格底部要在fixed元素下方才认为可见
    const shouldStick =
      isTableInView &&
      tableRect.top <= stickyLine &&
      tableRect.bottom > stickyLine + fixedHeaderHeight;
    // 表格完全滚出视口的判断
    // 向上滚出时，需要考虑fixed元素的高度
    const isTableOutOfView =
      tableRect.bottom <= containerRect.top + fixedHeaderHeight || // 向上滚出（被fixed元素完全遮挡）
      tableRect.top >= containerRect.bottom; // 向下滚出
    if (isTableOutOfView) {
      isSticky.value = false;
      // console.log(`not sticky`)
    } else {
      isSticky.value = shouldStick;
      // console.log(`shouldStick`)
    }
  };

  // 使用 requestAnimationFrame 节流滚动事件
  const handleScroll = () => {
    
    if (rafId.value !== null) {
      return; // 如果已经有待处理的帧，跳过
    }
    rafId.value = requestAnimationFrame(() => {
      // console.log(`scrolling`)
      calculateSticky();
      rafId.value = null;
    });
  };

  // 使用 IntersectionObserver 优化性能，只在表格进入视口时才计算
  const setupObserver = () => {
    const container = getElement(scrollContainer);
    const wrapper = getElement(tableWrapper);

    if (!container || !wrapper || !('IntersectionObserver' in window)) {
      // 如果不支持 IntersectionObserver，默认认为一直在视口内
      isTableInView.value = true;
      return;
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isTableInView.value = entry.isIntersecting;
          // 进入或离开视口时立即计算一次
          calculateSticky();
        });
      },
      {
        root: container, // 以滚动容器为根
        rootMargin: `-${fixedHeaderHeight}px 0px 0px 0px`, // 顶部减去fixed元素高度
        threshold: [0, 0.1, 1], // 多个阈值，更精确地判断
      }
    );

    observer.value?.observe(wrapper);
  };

  // 初始化
  const init = () => {
    const container = getElement(scrollContainer);
    if (!container) {
      console.warn('[useTableHeaderSticky] scrollContainer 未找到');
      return;
    }
    // 设置 IntersectionObserver
    setupObserver();
    // console.log(2)
    // 监听滚动事件
    container.addEventListener('scroll', handleScroll, { passive: true });
    // console.log(3)
    // 监听窗口 resize（drawer 尺寸变化或全屏切换）
    window.addEventListener('resize', handleScroll, { passive: true });
    // console.log(4)
    // 初始化时计算一次
    calculateSticky();
  };

  // 清理函数
  const cleanup = () => {
    const container = getElement(scrollContainer);

    // 取消 RAF
    if (rafId.value !== null) {
      cancelAnimationFrame(rafId.value);
      rafId.value = null;
    }

    // 移除滚动监听
    if (container) {
      container.removeEventListener('scroll', handleScroll);
    }

    // 移除 resize 监听
    window.removeEventListener('resize', handleScroll);
    
    // 断开 IntersectionObserver
    if (observer.value) {
      observer.value.disconnect();
      observer.value = null;
    }

    // 重置状态
    isSticky.value = false;
    isTableInView.value = false;
  };

  // 组件挂载时初始化
  onMounted(() => {
  });

  // 组件卸载时清理
  onUnmounted(() => {
    cleanup();
  });

  return {
    init,
    isSticky,
    cleanup,
  };
};

export default useTableHeaderSticky;