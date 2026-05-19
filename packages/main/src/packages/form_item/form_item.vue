<script setup name="Form" lang="ts">
  import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue';
  import { ElFormItem } from 'element-plus';

  const props = defineProps({
    // 按钮风格
    label: {
      type: String,
      default: () => '',
    },
    // 按钮类型
    prop: {
      type: String,
      default: () => '',
    },
    rules: {
      type: [Object, Array],
      default: () => [],
    },
  });

  const state = reactive<{}>({});
  const {} = toRefs(state);
  const isShowRuleItem = computed(() => {
    return Object.keys(props.rules).length > 0;
  });
</script>

<template>
  <el-form-item
    v-if="isShowRuleItem"
    :label="props.label || ''"
    :prop="props.prop"
    class="lute-form-item"
    :rules="props.rules"
  >
    <slot></slot>
  </el-form-item>
  <el-form-item v-else :label="props.label || ''" :prop="props.prop" class="lute-form-item">
    <slot></slot>
  </el-form-item>
</template>

<style scoped>
  .lute-form-item {
    margin-bottom: 22px;
  }
  .lute-form-item :deep(.el-form-item__error) {
    margin-top: 0px;
  }
</style>
