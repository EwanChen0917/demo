<template>
  <div class="chat-select-main">
    <el-select
      class="chat-select"
      ref="customSelectRef"
      :popper-class="popperClass"
      v-model="modelValue"
      :placeholder="placeholder"
      :style="{ width: computedWidth + 'px' }"
      :suffix-icon="suffixIcon"
    >
      <template v-if="title" #header>
        <div class="chat-select-title">{{ title }}</div>
      </template>
      <template v-if="prefix" #prefix>
        <img v-if="prefixType === 'image'" class="icon icon-img" :src="prefix" />
        <SvgIcon v-else-if="prefixType" class="icon" :icon="prefix" />
      </template>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <div class="chat-select-item" @click="toggle(item)">
          <SvgIcon v-if="item.icon" class="icon" :icon="item.icon" />
          <span v-if="item.imgUrl" class="img-span"><img class="img" :src="item.imgUrl" /></span>
          <div v-if="item.desc" class="text">
            <span class="label">{{ item.customLabel || item.label }}</span>
            <span class="desc">{{ item.desc }}</span>
          </div>
          <div v-else class="text">
            <span class="label">{{ item.customLabel || item.label }}</span>
          </div>
          <i v-if="item.value === modelValue" classs="suffix Root-tyicon icon-Root-tyxuanze"></i>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      // modelValue: string,
      title?: string;
      options: any[];
      width?: string;
      popperClass?: string;
      prefix?: string;
      prefixType?: string;
      placeholder?: string;
      type?: string;
      suffixIcon?: any;
      autoWidth?: boolean;
      autoAddWidth?: number;
    }>(),
    {
      // modelValue: '',
      title: '',
      options: () => [],
      width: '',
      popperClass: 'chat-select-down',
      prefix: '',
      prefixType: 'icon',
      placeholder: '',
      type: '',
      autoWidth: false,
      autoAddWidth: 40, // 默认自适应宽度添加值
    }
  );
  const {
    title,
    options,
    width,
    popperClass,
    prefix,
    prefixType,
    placeholder,
    type,
    autoWidth,
    autoAddWidth,
  } = toRefs(props);
  const modelValue = defineModel<string>({ default: '' });

  const toggle = (item) => {
    if (item.value !== modelValue.value) {
      if (type.value === 'model') ElMessage.success('模型切换成功');
    }
    modelValue.value = item.value;
  };
  const customSelectRef = ref<HTMLElement | null>(null);
  const computedWidth = ref(width.value || 102); // 初始宽度
  watch(
    modelValue,
    (val) => {
      autoWidth.value && adjustSelectWidth();
    },
    { deep: true }
  );
  const adjustSelectWidth = () => {
    nextTick(() => {
      if (!customSelectRef.value) return;
      const inputEl = customSelectRef.value?.$el?.querySelector('.el-select__input');
      if (!inputEl) return;
      // 创建测量用的临时元素
      const measureSpan = document.createElement('span');
      measureSpan.style.cssText = `
      position: absolute;
      visibility: hidden;
      white-space: nowrap;
      font: ${getComputedStyle(inputEl).font};
      padding: ${getComputedStyle(inputEl).padding};
    `;
      // 获取当前显示的文本
      const selectedLabel =
        options.value.find((opt) => opt.value === modelValue.value)?.label || '';
      measureSpan.textContent = selectedLabel || inputEl.placeholder || '';
      document.body.appendChild(measureSpan);
      // 计算合适宽度（文本宽度 + 图标空间 + 边距）
      const newWidth = Math.min(
        Math.max(measureSpan.offsetWidth + autoAddWidth.value, Number(width.value)), // 最小80px
        500 // 最大500px
      );
      console.log('newWidth', newWidth);
      computedWidth.value = newWidth;
      document.body.removeChild(measureSpan);
    });
  };
</script>

<style lang="scss" scoped>
  .chat-select-main {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    border-radius: 9px;
    border: 1px solid var(---N3, #ededed);
    background-color: #fff;
    padding: 5px 10px;

    &:hover {
      background-color: #f5f5f5;

      .chat-select {
        :deep(.el-select__wrapper) {
          background-color: #f5f5f5;
        }
      }
    }
    .chat-select {
      height: initial;
      :deep(.el-select__wrapper) {
        line-height: 18px;
        min-height: 18px;
        padding: 0;
        box-shadow: none;

        .el-select__placeholder.is-transparent {
          color: #1f1f1f;
        }

        .el-select__selected-item {
          font-weight: 600;
        }

        .el-select__prefix {
          width: 18px;

          img {
            width: 18px;
            height: 18px;
            object-fit: contain;
          }

          .icon {
            font-size: 18px;
          }
        }

        .el-select__placeholder {
          color: var(---N9, #1f1f1f);
          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px;
          /* 166.667% */
        }

        .svg-icon {
          color: #000;
        }

        .el-icon svg {
          width: 16px;
          height: 16px;
          color: #000;
        }
      }
    }

    .icon-before {
      width: 18px;
      height: 18px;
    }
  }
</style>

<style lang="scss">
  .chat-select-down {
    &.stylize {
      border-radius: 10px;
      box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);

      .el-select-dropdown__item {
        height: 52px;
        line-height: 52px;
      }

      .el-select-dropdown__header {
        padding: 10px 14px 12px 14px;
      }

      .chat-select-item {
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0px 38px 0px 8px;

        .img-span {
          display: inline-flex;
          width: 40px;
          height: 40px;
        }
      }
    }

    &.ai-model {
      border-radius: 10px;
      box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);

      .el-select-dropdown__list {
        padding: 6px;
      }

      .el-select-dropdown__item {
        height: 54px;
        line-height: 54px;
        padding: 4px 0;
        box-sizing: border-box;
        margin-bottom: 8px;

        .chat-select-item {
          padding: 0px 38px 0px 10px;
          height: 46px;

          .img-span {
            display: inline-flex;
            width: 36px;
            height: 36px;
            align-items: center;
            justify-content: center;
            border-radius: 19px;
            border: 1px solid var(---N2, #f5f5f5);
            background: #fff;
            overflow: hidden;
          }

          .img {
            width: 28px;
            height: 28px;
          }

          .text {
            margin-left: 10px;
            height: 100%;
          }

          .label {
            line-height: 22px;
            font-weight: 600;
          }

          .suffix {
            height: 22px;
            align-self: flex-start;
          }
        }
      }
    }

    &.ratio {
      border-radius: 10px;
      box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
    }

    &.duration,
    &.frame-rate,
    &.radio-video,
    &.resolution {
      .chat-select-item {
        padding: 6px 16px 6px 16px;
        .text {
          margin-right: 80px;
        }
      }
    }
    &.duration,
    &.frame-rate,
    &.resolution {
      .chat-select-item {
        .icon {
          width: 16px;
          height: 16px;
        }
        .svg-icon {
          fill: var(---N9, #1f1f1f);
          color: var(---N9, #1f1f1f);
        }
      }
    }

    .el-select-dropdown__header {
      padding: 10px 14px 12px 14px;
      border: none;

      .chat-select-title {
        color: #000;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
    }

    .el-select-dropdown__list {
      padding: 0 8px 8px 8px;
    }

    .el-select-dropdown__item {
      height: 36px;
      line-height: 36px;
      padding: 6px 0;
      border-radius: 6px;
      box-sizing: border-box;

      &.is-hovering {
        background: var(---N1, #f7f7f7);
      }

      &.is-selected {
        background: var(---N1, #f7f7f7);
      }
    }

    .chat-select-item {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 24px;
      cursor: pointer;
      // border-radius: 10px;
      padding: 6px 38px 6px 8px;

      .svg-icon {
        fill: #000;
        color: #000;
      }

      .icon {
        width: 24px;
        height: 24px;
      }

      .img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 6px;
      }

      .text {
        display: inline-flex;
        gap: 4px;
        flex-direction: column;
        justify-content: space-between;
      }

      .label {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: var(---N9, #1f1f1f);
        line-height: 22px;
      }

      .desc {
        color: var(---N6, #999);
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
</style>
