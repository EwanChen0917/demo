<template>
  <div :class="getWrapClass" :style="{ width: width }">
    <template v-if="props.isShowSearchIcon">
      <div
        class="position-relative d-flex"
        @mouseenter="showClear = true"
        @mouseleave="showClear = false"
      >
        <span class="svg-icon svg-icon-2 position-absolute top-50 translate-middle-y ms-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.5"
              x="17.0365"
              y="15.1223"
              width="8.15546"
              height="2"
              rx="1"
              transform="rotate(45 17.0365 15.1223)"
              fill="currentColor"
            />
            <path
              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <input
          v-if="props.type === 'text'"
          type="text"
          :class="getInputClass"
          id="lute-form-input"
          :placeholder="props.placeholder"
          @focus="focus"
          @blur="blur"
          :disabled="props.disabled"
          :value="props.modelValue"
          @input="input"
          autocomplete="off"
        />
        <span
          v-if="props.modelValue"
          v-show="inputFocus || showClear"
          class="svg-icon svg-icon-2 position-absolute top-50 translate-middle-y"
          style="right: 10px; cursor: pointer; margin-top: 3px"
          @click="clearValue"
        >
          <el-icon size="14"><CircleClose /></el-icon>
        </span>
      </div>
    </template>
    <template v-else>
      <template v-if="!props.isFloating">
        <slot name="prepend" v-if="!props.prependText"></slot>
        <span class="input-group-text" v-else-if="props.prependText">{{ props.prependText }}</span>
      </template>
      <input
        v-if="props.type === 'text'"
        type="text"
        :class="getInputClass"
        id="lute-form-input"
        :placeholder="props.placeholder"
        @focus="focus"
        @blur="blur"
        :disabled="props.disabled"
        :value="props.modelValue"
        @input="input"
        autocomplete="off"
      />
      <textarea
        v-else
        :class="getInputClass"
        id="lute-form-input"
        :placeholder="props.placeholder"
        :style="{ height: props.rows * 10 + 'px' }"
        @focus="focus"
        @blur="blur"
        :value="props.modelValue"
        @input="input"
        :disabled="props.disabled"
        autocomplete="off"
      ></textarea>
      <label for="floatingPassword" class="lute-form-lable" v-if="props.isFloating">
        {{ props.placeholder }}
      </label>
      <template v-else>
        <slot name="append" v-if="!props.appendText"></slot>
        <span class="input-group-text" v-else-if="props.appendText">{{ props.appendText }}</span>
      </template>
    </template>
  </div>
</template>

<script setup name="Input" lang="ts">
  import { ElIcon } from 'element-plus';
  import {
    ref,
    computed,
    watch,
    onMounted,
    reactive,
    toRefs,
    getCurrentInstance,
    nextTick,
  } from 'vue';
  import { CircleClose } from '@element-plus/icons-vue';

  const instance: any = getCurrentInstance();

  const { proxy } = instance;

  const props = defineProps({
    inputStyle: {
      type: String,
      default: () => 'normal',
    },
    isFloating: {
      type: Boolean,
      default: () => false,
    },
    // 类型
    type: {
      type: String,
      default: () => 'text',
    },
    rows: {
      type: [String, Number],
      default: () => 8,
    },
    prependText: {
      type: String,
      default: () => '',
    },
    appendText: {
      type: String,
      default: () => '',
    },
    // 大小
    size: {
      type: String,
      default: () => '',
    },
    // 值
    modelValue: {
      type: String,
      default: () => '',
    },
    width: {
      type: String,
      default: () => '400px',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    // 长度限制
    maxlength: {
      type: String,
      default: () => '',
    },
    // 是否展示限制
    showWord: {
      type: Boolean,
      default: () => false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => false,
    },
    // 是否清空
    clearable: {
      type: Boolean,
      default: () => false,
    },
    isValidate: {
      type: Boolean,
      default: () => true,
    },
    isShowSearchIcon: {
      type: Boolean,
      default: () => false,
    },
    isShowValidStyle: {
      type: Boolean,
      default: () => false,
    },
  });

  const state = reactive<{
    isInvalid: any; // 标记表单校验是否通过
    inputFocus: boolean;
    showClear: boolean;
  }>({
    isInvalid: false,
    inputFocus: false,
    showClear: false,
  });
  const { isInvalid, showClear, inputFocus } = toRefs(state);

  const blur = () => {
    inputFocus.value = false;
    emit('blur');
    formValidate();
  };
  const focus = () => {
    inputFocus.value = true;
    emit('focus');
  };

  const input = ($event) => {
    emit('update:modelValue', $event.target.value);
  };

  watch(
    () => props.modelValue,
    () => {
      formValidate();
    }
  );

  const clearValue = () => {
    emit('update:modelValue', '');
  };

  function formValidate() {
    props.isValidate &&
      nextTick(() => {
        // 表单校验
        if (proxy.$parent && typeof proxy.$parent.validate === 'function') {
          proxy.$parent
            .validate()
            .then(() => {
              isInvalid.value = false;
            })
            .catch(() => {
              isInvalid.value = true;
            });
        }
      });
  }

  const emit = defineEmits<{
    (event: 'update:modelValue', val: string);
    (event: 'blur');
    (event: 'focus');
  }>();

  // 设置input class
  const getWrapClass = computed(() => {
    const input_type = props.isFloating ? 'form-floating' : 'input-group';
    const input_class_arr = ['my-input', 'input-wrap', input_type];
    if (props.size) {
      input_class_arr.push(`input-group-${props.size}`);
    }

    return input_class_arr;
  });

  // 设置input class
  const getInputClass = computed(() => {
    let input_type = '';
    if (props.isShowValidStyle) {
      input_type = isInvalid.value ? 'is-invalid' : props.modelValue ? 'is-valid' : '';
    }

    const solid_class = props.inputStyle === 'solid' ? 'form-control-solid' : '';
    const input_class_arr: any[] = ['form-control', solid_class, input_type];

    if (props.disabled) {
      input_class_arr.push('input-disabled');
    }

    if (props.isShowSearchIcon) {
      input_class_arr.push('input-pd-l-35');
    }

    return input_class_arr;
  });
</script>

<style scoped lang="scss">
  .lute-form-lable {
    color: #5e6278 !important;
    font-size: 12px !important;
    line-height: 16px;
  }
  .form-control-solid {
    height: 43px;
  }
  .input-disabled {
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .form-control.is-valid {
    background-position: right 40px center;
  }
  .form-control.is-invalid {
    background-position: right 40px center;
  }

  .my-input {
    align-items: center;
    margin-right: 10px;
  }

  .input-pd-l-35 {
    padding-left: 35px;
  }

  .position-relative {
    width: 100%;
  }

  .input-wrap {
    margin-top: -5px;
  }
</style>
