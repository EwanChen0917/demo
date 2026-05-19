<template>
  <button :class="getBtnClass" :disabled="props.disabled" :id="btnId" type="button">
    <!-- 插槽，给icon使用 -->
    <slot></slot>
    <!-- 按钮/loading文案 -->
    {{ btnText }}
    <span v-if="props.loading" class="spinner-border spinner-border-sm align-middle ms-2"></span>
  </button>
</template>

<script setup name="Button" lang="ts">
  import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue';
  // 按钮风格
  const base_config = {
    light: 'light',
    bg: 'bg',
    outline: 'outline',
    link: 'link',
  };

  const props = defineProps({
    // 按钮风格
    btnStyle: {
      type: String,
      default: () => '',
    },
    // 按钮类型
    type: {
      type: String,
      default: () => '',
    },
    // 按钮文案
    text: {
      type: String,
      default: () => '',
    },
    // loading文案
    waitText: {
      type: String,
      default: () => 'Please wait...',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => false,
    },
    // 是否loading
    loading: {
      type: Boolean,
      default: () => false,
    },
    // 尺寸默认是中尺寸，sm-小尺寸 lg-大尺寸
    size: {
      type: String,
      default: () => '',
    },
  });

  const state = reactive<{
    btnId: any; // 按钮id，用来设置loading
  }>({
    btnId: Math.random().toString(16).slice(2),
  });
  const { btnId } = toRefs(state);

  watch(
    // 监听loading
    () => props.loading,
    (val) => {
      // 关闭loading
      if (!val) {
        const button: any = document.getElementById(btnId.value);
        if (button) {
          button.style.opacity = '1';
          button.disabled = false;
        }
      }
    },
    {
      immediate: true,
    }
  );

  const btnText = computed(() => {
    return props.loading ? props.waitText : props.text;
  });

  // 设置按钮class
  const getBtnClass = computed(() => {
    const btn_class_arr = ['btn', 'me-2'];
    const btn_class = getBtnClassByType();
    btn_class_arr.push(btn_class);

    if (props.btnStyle === base_config.outline) {
      btn_class_arr.push('btn-outline', 'btn-outline-dashed', `btn-active-${props.type}-dark`);
    } else if (props.btnStyle === base_config.link) {
      btn_class_arr.push('btn-link', `btn-active-color-primary`, `btn-color-${props.type}`);
    }

    if (props.size) {
      btn_class_arr.push(`btn-${props.size}`);
    } else {
      btn_class_arr.push(`btn-normal`);
    }

    return btn_class_arr;
  });

  //  根据style和type设置按钮样式
  const getBtnClassByType = () => {
    if (!props.btnStyle) {
      return `btn-${props.type}`;
    }
    return `btn-${props.btnStyle}-${props.type}`;
  };

  onMounted(() => {
    // 按钮点击监听
    const button: any = document.getElementById(btnId.value);
    button.addEventListener('click', function () {
      // 展示loading
      if (props.loading) {
        button.disabled = true;
        button.style.opacity = '0.8';
      }
    });
  });
</script>

<style scoped lang="scss">
  .btn {
    white-space: nowrap;
  }
  .btn-normal {
    height: 43px;
  }
</style>
