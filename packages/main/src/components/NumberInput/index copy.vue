<!--  -->
<template>
  <div class="inp-number" :class="otherClass">
    <slot name="prepend"></slot>
    <span v-if="prependText" class="inp-number-prepend">{{ prependText }}</span>
    <div ref="num" class="number-box">
      <el-input-number
        v-model="_value"
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
    <slot name="append" class="append-container"></slot>
  </div>
</template>

<script>
  export default {
    props: {
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
      value: {
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
    },
    data() {
      return {};
    },
    computed: {
      _value: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
      otherClass() {
        const classArr = [];
        if (this.$slots.append) {
          classArr.push('inp-number_append');
        }
        if (this.$slots.prepend) {
          classArr.push('inp-number_prepend');
        }
        return classArr;
      },
    },
    mounted() {},
    methods: {
      change(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
      blurHandler(ev) {
        this.$emit('blurHandler', ev);
      },
    },
  };
</script>

<style lang="scss">
  .inp-number {
    font-size: 14px;
    line-height: normal;
    width: 100%;
    display: flex;
    .inp-number-prepend,
    .inp-number-append {
      border: 1px solid #d9dbde;
      padding: 0 2px;
      color: yellow;
      font-size: 14px;
      line-height: 34px;
      display: table-cell;
      box-sizing: border-box;
      width: 1px;
      white-space: nowrap;
      background: red;
      min-width: 50px;
      text-align: center;
    }
    .inp-number-prepend {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right: none;
      margin-right: 20px;
    }
    .inp-number-append {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: none;
      margin-left: 20px;
    }
    .number-box {
      position: relative;
      display: flex;
      .prefix-icon,
      .suffix-icon {
        color: #888c94;
        position: absolute;
        top: 0;
        text-align: center;
        height: 100%;
        line-height: 32px;
        padding-right: 12px;
      }
      .prefix-icon {
        left: 0;
        padding-left: 12px;
      }
      .suffix-icon {
        right: 0;
      }
      .el-input-number .el-input__inner {
        text-align: left;
      }
      .el-input__inner {
        height: 36px;
        line-height: 36px;
        display: table-cell;
        padding: 0;
      }
      .el-input--mini .el-input__inner {
        height: 32px;
      }
      .el-input-number.is-without-controls .el-input__inner {
        padding: 0 12px;
      }
    }
    .number-box,
    .el-input-number {
      width: 100%;
    }
    .number-box .prepend {
      .el-input__inner {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .number-box .append {
      .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .number-box .suffixIcon {
      .el-input__inner {
        padding-right: 44px;
      }
    }
    .number-box .append-container {
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
