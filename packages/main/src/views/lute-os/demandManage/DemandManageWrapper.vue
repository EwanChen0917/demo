<template>
  <div class="demand-manage-wrapper">
    <slot />
    <teleport v-if="isActive" to="body">
      <SurveyFeedback v-if="ui.surveyVisible" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import SurveyFeedback from './components/SurveyFeedback.vue';
  import { useDemandUiLayer } from './composables/useDemandUiLayer';

  const ui = useDemandUiLayer();
  const isActive = ref(false);

  const activate = () => {
    isActive.value = true;
  };
  const deactivate = () => {
    isActive.value = false;
  };
  onMounted(activate);
  onActivated(activate);
  onDeactivated(deactivate);
  onUnmounted(deactivate);

  onBeforeRouteLeave(() => {
    if (!ui.surveyVisible.value) {
      ui.toggleSurvey(true);
    }
  });
</script>

<style scoped>
  .demand-manage-wrapper {
    position: relative;
    overflow: visible;
    min-height: 100%;
    display: block;
  }
</style>
