<!--  -->
<template>
  <div class="inp-number">
    <slot name="prepend"></slot>
    <span v-if="prependText" class="inp-number-prepend">{{ prependText }}</span>
    <div ref="num" class="number-box">
      <el-input-number
        v-model="value"
        :disabled="disabled"
        :min="min"
        :max="max"
        :autofocus="autofocus"
        :class="{
          prepend: prependText,
          append: appendText,
          suffixIcon: suffixIcon,
          prefixIcon: prefixIcon,
        }"
        :precision="precision"
        :controls="controls"
        :placeholder="placeholder"
        controls-position="right"
        :size="size"
        @blur="blurHandler"
        @change="change"
        @focus="focus"
      />
      <span v-if="prefixIcon" class="prefix-icon">
        <slot name="prefix"></slot>
      </span>
      <span v-if="suffixIcon" class="suffix-icon">
        <slot name="suffix"></slot>
      </span>
    </div>
    <span
      v-if="appendText"
      class="inp-number-append"
      :style="{ background: disabled ? '#f5f7fa' : '', color: disabled ? '#999' : '' }"
    >
      {{ appendText }}
    </span>
    <slot name="append"></slot>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    prefixIcon: {
      default: false,
      type: Boolean,
    },
    suffixIcon: {
      default: false,
      type: Boolean,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      default: undefined,
      type: Number,
    },
    size: {
      default: 'small',
      type: String,
    },
    min: {
      default: -Infinity,
      type: Number,
    },
    max: {
      default: Infinity, // Infinity
      type: Number,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    precision: {
      default: 2,
      type: Number,
    },
    prependText: {
      default: '',
      type: String,
    },
    appendText: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  });
  const emits = defineEmits(['update:modelValue', 'change', 'input', 'blurHandler', 'focus']);
  const value = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      return emits('update:modelValue', (val || props.min) ?? '');
    },
  });
  const change = (val: any) => {
    emits('change', (val || props.min) ?? '');
    emits('input', (val || props.min) ?? '');
  };
  const blurHandler = (ev) => {
    emits('blurHandler', ev);
  };
  const focus = (ev) => {
    emits('focus', ev);
  };
</script>

<style lang="scss">
  .inp-number {
    font-size: 14px;
    line-height: normal;
    width: 100%;
    display: flex;
    column-gap: 20px;
    .inp-number-prepend,
    .inp-number-append {
      background: var(--el-input-bg-color, var(--bs-gray-100));
      line-height: 1;
      padding: 0 2px;
      box-sizing: border-box;
      white-space: nowrap;
      min-width: 50px;
      text-align: center;
      width: max-content;
    }
    .inp-number-prepend {
      border-top-left-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      border-bottom-left-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      border-right: none;
      // margin-right: 20px;
    }
    .inp-number-append {
      border-top-left-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      border-bottom-left-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      border-top-right-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      border-bottom-right-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      border-left: none;
      // margin-left: 20px;
    }
    .number-box {
      // flex: 1;
      position: relative;
      display: flex;
      width: 100%;
      .prefix-icon,
      .suffix-icon {
        color: #888c94;
        position: absolute;
        top: 0;
        text-align: center;
        height: 100%;
        line-height: 1;
        padding-right: 12px;
      }
      .prefix-icon {
        left: 0;
        padding-left: 12px;
      }
      .suffix-icon {
        right: 0;
      }
      .el-input-number {
        width: 100%;
        // min-width: 80px;
        min-width: 65px;
        .el-input__inner {
          text-align: left;
          line-height: 1;
          // display: table-cell;
          padding: 0;
          font-size: 14px;
        }
      }

      .el-input-number.is-without-controls .el-input__wrapper {
        padding: 0px;
      }
      .el-input-number.is-without-controls .el-input__inner {
        padding: 0 11px;
      }
    }
    // .number-box .prepend {
    //   .el-input__inner {
    //     border-top-left-radius: 0;
    //     border-bottom-left-radius: 0;
    //   }
    // }
    // .number-box .append {
    //   .el-input__inner {
    //     border-top-right-radius: 0;
    //     border-bottom-right-radius: 0;
    //   }
    // }
    .number-box .suffixIcon {
      .el-input__inner {
        padding-right: 44px;
      }
    }
    .number-box .prefixIcon {
      .el-input__inner {
        padding-left: 18px;
      }
    }
    // 下拉模式
    &.inp-number_append {
      .number-box .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .number-box + .el-select .el-input__inner {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
        &:hover,
        &:focus {
          border-color: #dadce0;
        }
      }
      .el-select .el-input.is-focus .el-input__inner {
        border-color: #dadce0;
      }
    }
    &.inp-number_prepend {
      .number-box .el-input__inner {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .el-select:first-child .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
        &:hover,
        &:focus {
          border-color: #dadce0;
        }
      }
      .el-select .el-input.is-focus .el-input__inner {
        border-color: #dadce0;
      }
    }
  }
</style>
