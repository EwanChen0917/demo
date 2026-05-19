<template>
  <span :class="getBadgeClass">
    {{ text }}
  </span>
</template>

<script setup name="Badge" lang="ts">
  import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue';
  // 按钮风格
  const base_config = {
    light: 'light',
    square: 'square',
    circle: 'circle',
    outline: 'outline'
  };

  const props = defineProps({
    // 风格
    badgeStyle: {
      type: String,
      default: () => ''
    },
    // 类型
    type: {
      type: String,
      default: () => ''
    },
    // 文案
    text: {
      type: String,
      default: () => ''
    },
    // 尺寸默认是中尺寸，sm-小尺寸 lg-大尺寸
    size: {
      type: String,
      default: () => ''
    }
  });

  // 设置徽章class
  let getBadgeClass = computed(() => {
    let badge_class_arr = ['badge', 'me-2', 'mb-2'];
    switch (props.badgeStyle) {
      case base_config.light:
        badge_class_arr.push(`badge-light-${props.type}`);
        break;
      case base_config.square:
        badge_class_arr.push('badge-square', `badge-${props.type}`);
        break;
      case base_config.circle:
        badge_class_arr.push('badge-circle', `badge-${props.type}`);
        break;
      case base_config.outline:
        badge_class_arr.push('badge-circle', 'badge-outline', `badge-${props.type}`);
        break;
      default:
        badge_class_arr.push(`badge-${props.type}`);
        break;
    }

    if (props.size) {
      badge_class_arr.push(`badge-${props.size}`);
    }

    return badge_class_arr;
  });
</script>

<style scoped></style>
