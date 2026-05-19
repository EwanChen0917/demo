<template>
  <Teleport to="#kt_app_toolbar_actions">
    <slot></slot>
    <el-button
      v-if="useRouterBack"
      type="primary"
      size="small"
      style="height: unset !important"
      @click="handleRouterBack"
    >
      返回列表
    </el-button>
  </Teleport>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  // const ktLayoutMounted = inject('ktLayoutMounted');

  defineProps<{
    useBackToList?: boolean;
    useRouterBack?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'back'): void;
  }>();

  const handleRouterBack = () => {
    const backUrl = router.options.history.state.back;
    if (backUrl?.includes('/edit') || backUrl?.includes('/audit')) {
      router.push(`/${backUrl?.split('/')[1]}`);
    } else router.go(-1);
  };

  const showBack = computed(() => {
    return (
      route.fullPath.includes('/add') ||
      route.fullPath.includes('/edit') ||
      route.fullPath.includes('/detail') ||
      route.fullPath.includes('/audit')
    );
  });

  watch(
    () => router.currentRoute.value.path,
    () => {
      if (!showBack.value) document.getElementById('kt_app_toolbar_actions').innerHTML = '';
    },
    { immediate: true, deep: true }
  );
</script>

<style scoped lang="scss"></style>
