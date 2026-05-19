<template>
  <div class="ai-image-member-cell">
    <el-avatar :src="member.avatar || defaultAvatar" :size="16" />
    <span class="ai-image-member-cell__name">{{ member.name }}</span>
  </div>
</template>

<script setup lang="ts">
  import type { AiGenImageMemberOption } from '../hooks/useDeptMemberOptions';

  const props = defineProps<{
    memberCode?: string;
    memberName?: string;
    options: AiGenImageMemberOption[];
  }>();

  const defaultAvatar = new URL('@/assets/images/icon/defaultAvatar.png', import.meta.url).href;

  const member = computed(() => {
    const option = props.options.find((item) => item.memberCode === props.memberCode);
    return {
      name: option?.name || props.memberName || props.memberCode || '-',
      avatar: option?.avatar || '',
    };
  });
</script>

<style scoped lang="scss">
  .ai-image-member-cell {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: var(--el-text-color-primary);
    font-size: 12px;
    line-height: 20px;

    &__name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
