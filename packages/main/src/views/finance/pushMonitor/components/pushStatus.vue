<template>
  <el-tag
    v-if="pushInfo?.pushStatus === 1"
    :type="isPushError ? 'warning' : 'success'"
    disable-transitions
  >
    {{ pushInfo?.pushStatusDesc }}
  </el-tag>
  <el-tag v-else-if="pushInfo?.pushStatus === 2" type="danger" disable-transitions>
    {{ pushInfo?.pushStatusDesc }}
  </el-tag>
  <el-tag v-else type="info" disable-transitions>
    {{ pushInfo?.pushStatusDesc }}
  </el-tag>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      pushInfo: any;
      errorType: string;
    }>(),
    {
      pushInfo: {},
      errorType: '',
    }
  );

  const isPushError = computed(() => {
    const errs = String(props.errorType)
      .split(',')
      .map((x) => +x);
    return errs.some((x) => x === 1 || x === 2 || x === 3 || x === 4 || x === 6);
  });
</script>
