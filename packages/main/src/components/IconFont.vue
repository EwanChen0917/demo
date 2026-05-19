<template>
  <i 
    :class="['iconfont', `icon-${name}`]" 
    :style="iconStyle"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
interface Props {
  name: string;
  size?: string | number;
  color?: string;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: '14px',
  color: 'inherit',
  clickable: false
});

const emit = defineEmits<{
  click: [event: MouseEvent]
}>();

const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
  cursor: props.clickable ? 'pointer' : 'inherit'
}));

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event);
  }
};
</script>
