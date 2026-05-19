<template>
  <div class="tour-com">
    <!-- 虚拟容器（隐藏，用于定位） -->
    <div
      ref="virtualTarget"
      class="virtual-target"
      style="position: fixed; pointer-events: none; z-index: -1"
    ></div>

    <el-tour
      v-model="visible"
      :class="`el-tour-${ItemPlacement} erp-tour-com`"
      :append-to="newTourConfig.appendTo"
      :show-arrow="newTourConfig.showArrow"
      v-model:current="newTourConfig.current"
      :show-close="newTourConfig.showClose"
      :mask="newTourConfig.mask"
      :placement="newTourConfig.placement"
      :type="newTourConfig.type"
      :content-style="newTourConfig.contentStyle"
      :gap="newTourConfig.gap"
      :scroll-into-view-options="newTourConfig.scrollIntoViewOptions"
      :z-index="newTourConfig.zIndex"
      :close-icon="newTourConfig.CloseIcon"
      :close-on-press-escape="newTourConfig.closeOnPressEscape"
      :target-area-clickable="newTourConfig.targetAreaClickable"
      @change="handleTourChange"
      @finish="handleTourFinish"
      @close="close"
    >
      <el-tour-step
        v-for="(item, index) in newTourStepsList"
        :key="index"
        :target="item.target"
        :show-arrow="item.showArrow"
        :placement="item.placement"
        :title="item.title"
        :mask="item.mask"
        :type="item.type"
        :description="item.description"
        :prev-button-props="item.prevButtonProps"
        :next-button-props="item.nextButtonProps"
        :scroll-into-view-options="item.scrollIntoViewOptions"
        :show-close="item.showClose"
        :close-icon="item.CloseIcon"
      >
        <template #header>
          <slot name="header">
            <div
              class="header-num"
              :style="{ color: newTourConfig.type == 'primary' ? '#fff' : '#303133' }"
            >
              {{ index + 1 }}/{{ newTourStepsList.length }}
            </div>
          </slot>
        </template>
        <slot :name="`step${index}`"></slot>
      </el-tour-step>

      <!-- 自定义指示器 -->
      <template #indicators="{ current, total }">
        <slot name="indicators" :current :total>
          <div
            class="jump-click"
            v-if="current !== newTourStepsList.length - 1"
            @click="close"
            :style="{ color: newTourConfig.type == 'primary' ? '#fff' : '#303133' }"
          >
            跳过
          </div>
        </slot>
      </template>
    </el-tour>
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { memberApi } from '@/api';

  interface areaType {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  }

  interface tourConfigType {
    appendTo?: HTMLElement;
    showArrow?: boolean;
    placement?: string;
    contentStyle?: object;
    mask?: boolean | object;
    gap?: object;
    type?: string;
    current?: number;
    scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
    zIndex?: number;
    showClose?: boolean;
    CloseIcon?: string | Component;
    closeOnPressEscape?: boolean;
    targetAreaClickable?: boolean;
  }

  interface tourStepType {
    target?: string | Function;
    targetsList?: Array<HTMLElement>; // 某step需要对几个相邻的元素进行target
    showArrow?: boolean;
    title?: string;
    description?: string;
    placement?: string;
    mask?: boolean | object;
    type?: string;
    nextButtonProps?: object;
    prevButtonProps?: Object;
    scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
    showClose?: boolean;
    CloseIcon?: string | Component;
    ProportionArea?: areaType; // 想要的宽度比例 全部比例 -想要宽度比例
    minWidth?: number;
    minHeight?: number;
  }

  const virtualTarget = ref();
  const currentNum = ref(0);

  const emits = defineEmits<{
    (event: 'finish'): void;
    (event: 'change', current: number): void;
  }>();

  const props = withDefaults(
    defineProps<{
      tourConfig?: tourConfigType;
      tourStepsList?: Array<tourStepType>;
    }>(),
    {
      tourConfig: () => {
        return {};
      },
      tourStepsList: () => [],
    }
  );

  const ItemPlacement = computed(() => {
    if (!newTourStepsList.value[currentNum.value]) return;
    let placementList: string[] = newTourStepsList.value[currentNum.value]?.placement?.split('-');
    return placementList.length == 2
      ? `${placementList[0]}-${placementList[1]}`
      : `${placementList[0]}`;
  });

  // 默认值
  const defaultConfig = {
    current: 0,
    showClose: false,
    mask: true,
    placement: 'bottom',
    type: 'primary',
    contentStyle: { width: '296px', letterSpacing: '1px', lineHeight: '24px' },
    gap: { offset: 8, radius: 10 },
    targetAreaClickable: false,
  };

  // 可选：窗口滚动/resize 时更新虚拟容器位置（适配响应式）
  const handleResize = () => {
    if (
      newTourStepsList.value[currentNum.value]?.targetsList?.length &&
      newTourStepsList.value[currentNum.value]?.target
    ) {
      const mergedRect = getMergedRect(newTourStepsList.value[currentNum.value]);
      if (mergedRect && virtualTarget.value) {
        Object.assign(virtualTarget.value.style, {
          left: `${mergedRect.left}px`,
          top: `${mergedRect.top}px`,
          width: `${mergedRect.width}px`,
          height: `${mergedRect.height}px`,
        });
      }
      newTourStepsList.value[currentNum.value].target = () => virtualTarget.value;
    }
  };
  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  // 监听tour配置 更新配置数据
  let newTourConfig = ref<tourConfigType>({});
  watch(
    () => props.tourConfig,
    (newobj: tourConfigType) => {
      newTourConfig.value = Object.assign(
        {
          ...defaultConfig,
        },
        newobj
      );
    },
    {
      immediate: true,
      deep: true,
    }
  );

  // 监听tour step配置，将target为数组的step进行 聚合区域
  let newTourStepsList = ref<Array<tourStepType>>(props.tourStepsList);
  watch(
    () => props.tourStepsList,
    (newlist: Array<tourStepType>) => {
      if (newlist.length) {
        newTourStepsList.value = cloneDeep(newlist);
        newTourStepsList.value.map((item) => {
          if (Array.isArray(item.targetsList) && !item.target) {
            const mergedRect = getMergedRect(item);
            if (mergedRect) {
              // 设置虚拟容器的位置和大小（与合并包围盒一致）
              Object.assign(virtualTarget.value.style, {
                left: `${mergedRect.left}px`,
                top: `${mergedRect.top}px`,
                width: `${mergedRect.width}px`,
                height: `${mergedRect.height}px`,
              });
            }
            nextTick(() => {
              item.target = () => virtualTarget.value;
            });
          }
        });
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  // 缓存上一次合并结果（避免无效更新）
  const lastMergedRect: any = shallowRef(null);
  // 合并多个dom的包围盒
  const getMergedRect = (doms) => {
    const targetDom = cloneDeep(doms.targetsList);
    if (!targetDom.length) return null;

    // 获取第一个 DOM 的初始包围盒
    const firstRect = targetDom[0].getBoundingClientRect();
    let mergedRect = {
      left: firstRect.left,
      top: firstRect.top,
      right: firstRect.right,
      bottom: firstRect.bottom,
      width: firstRect.width,
      height: firstRect.height,
    };

    // 遍历剩余 DOM，扩展包围盒范围
    targetDom.slice(1).forEach((dom) => {
      const rect = dom.getBoundingClientRect();
      mergedRect.left = Math.min(mergedRect.left, rect.left); // 最左侧
      mergedRect.top = Math.min(mergedRect.top, rect.top); // 最顶部
      mergedRect.right = Math.max(mergedRect.right, rect.right); // 最右侧
      mergedRect.bottom = Math.max(mergedRect.bottom, rect.bottom); // 最底部
    });

    // 在现有区域 进行处理 30
    mergedRect.left =
      getProportionArea(
        mergedRect.left,
        mergedRect.right,
        doms.ProportionArea?.left,
        doms.minWidth
      ) - 10;
    mergedRect.top =
      getProportionArea(
        mergedRect.top,
        mergedRect.bottom,
        doms.ProportionArea?.top,
        doms.minHeight
      ) - 30;
    mergedRect.right =
      getProportionArea(
        mergedRect.right,
        mergedRect.left,
        doms.ProportionArea?.right,
        doms.minWidth
      ) + 30;
    mergedRect.bottom =
      getProportionArea(
        mergedRect.bottom,
        mergedRect.top,
        doms.ProportionArea?.bottom,
        doms.minHeight
      ) + 30;

    mergedRect.width = mergedRect.right - mergedRect.left;
    mergedRect.height = mergedRect.bottom - mergedRect.top;

    // 对比上一次结果，变化小于 1px 视为无变化
    const isSame =
      lastMergedRect.value &&
      Math.abs(mergedRect.left - lastMergedRect.value.left) < 2 &&
      Math.abs(mergedRect.top - lastMergedRect.value.top) < 2 &&
      Math.abs(mergedRect.width - lastMergedRect.value.width) < 2 &&
      Math.abs(mergedRect.height - lastMergedRect.value.height) < 2;

    if (isSame) return null;

    lastMergedRect.value = mergedRect;

    return mergedRect;
  };

  /***
   * 按情况计算虚拟区域
   * targetValue 当前方向的坐标
   * otherValue 相反方向的坐标
   * palcementValu 当前方向想要的宽度
   * minNum 最小宽度
   * handleValue - otherValue 当前想要方向的宽度
   * targetValue-otherValue 当前方向的元素和宽度
   */
  const getProportionArea = (targetValue, otherValue, placementvalue, minNum) => {
    if (placementvalue) {
      const palcementvalueList = placementvalue.split('-');
      let handleValue =
        (targetValue / Number(palcementvalueList[0])) * Number(palcementvalueList[1]);
      return Math.abs(handleValue - otherValue) < minNum &&
        Math.abs(targetValue - otherValue) > minNum
        ? minNum
        : Math.abs(targetValue - otherValue) < minNum
        ? Math.abs(targetValue - otherValue)
        : handleValue;
    }
    return targetValue;
  };

  const visible = ref(false);
  const tourType = ref();
  // 取一个与其他指引不同的key值
  const open = async (type: number) => {
    // 1-新品机会列表新手指引  2-新品机会参数配置 新手指引 3-新品机会运行与结果详情新手指引
    const result = await memberApi.luteosMemberQueryLastVersionSync({
      platform: 'lute_erp',
      refreshType: type,
    });
    tourType.value = type;
    visible.value = !result.isSync;
    return visible.value;
  };

  const close = async () => {
    visible.value = false;
    emits('finish');
    // 标记是否更新
    await memberApi.luteosMemberSyncLastVersion({
      platform: 'lute_erp',
      refreshType: tourType.value,
    });
  };

  const handleTourChange = (current: number): void => {
    currentNum.value = current;
    emits('change', current);
  };

  const handleTourFinish = (): void => emits('finish');

  defineExpose({
    open,
    close,
  });

  // 确保离开页面 引导关闭
  onDeactivated(() => {
    visible.value = false;
  });
  
</script>

<style lang="scss" scoped>
  .jump-click {
    font-size: 12px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    cursor: pointer;
  }
  .header-num {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    height: 22px;
  }
</style>
<style lang="scss">
  .erp-tour-com.el-tour {
    .el-tour__footer {
      height: 36px;
      align-items: center;
      padding-top: 10px;
    }
    .el-tour__header {
      padding-bottom: 10px;
    }
    .el-tour-buttons {
      .el-button--primary {
        border-color: transparent;
        &:hover {
          // background-color: var(--el-color-primary);
        }
      }
      .el-button--default {
        margin-left: 8px;
      }
      .el-button {
        height: 26px;
        span {
          font-size: 12px;
          height: 20px;
        }
      }
    }
    .el-tour__content {
      border-radius: 10px;
      padding: 14px 20px 20px 20px;
      font-family: 'PingFang SC';
    }
  }

  /***微调箭头位置 */
  .erp-tour-com.el-tour-right-end .el-tour__arrow,
  .erp-tour-com.el-tour-left-end .el-tour__arrow {
    top: 90% !important;
  }

  .erp-tour-com.el-tour-right-start .el-tour__arrow,
  .erp-tour-com.el-tour-left-start .el-tour__arrow {
    top: 12% !important;
  }

  .erp-tour-com.el-tour-bottom-start .el-tour__arrow {
    left: 18px !important;
    top: -4px !important;
  }
  .erp-tour-com.el-tour-top-start .el-tour__arrow {
    left: 12% !important;
  }

  .erp-tour-com.el-tour-bottom-end .el-tour__arrow,
  .erp-tour-com.el-tour-top-end .el-tour__arrow {
    left: 90% !important;
  }
</style>
