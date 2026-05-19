<template>
  <el-popover
    placement="bottom-start"
    :trigger="trigger"
    :offset="4"
    :show-arrow="false"
    :popper-style="{ padding: 0, width: 'auto', minWidth: 'unset' }"
  >
    <template #default>
      <div class="batch-list">
        <div v-for="item in options" :key="item?.title">
          <div
            v-if="!item?.hide"
            class="batch-list-item"
            :style="{ color: item?.color }"
            @click="handleClick(item)"
          >
            {{ item?.title }}
          </div>
        </div>
      </div>
    </template>
    <template #reference>
      <el-button :loading="loading" :type="type || 'plain'">
        {{ name }}
        <i
          class="iconfont icon-jiantouxiangxia"
          :class="type === 'primary' ? 'text-white' : ''"
        ></i>
      </el-button>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'click', key: string): void;
  }>();

  const props = withDefaults(
    defineProps<{
      name: string; // 按钮名称
      options: any; // 操作列表
      intercept?: Function; // 拦截器，返回 false 则不执行 fn
      type?: 'primary' | 'plain'; // 按钮类型
      trigger?: 'hover' | 'focus' | 'click' | 'contextmenu';
    }>(),
    {
      trigger: 'hover',
    }
  );

  const loading = ref(false);
  const handleClick = async (item: any) => {
    // 拦截器，返回 false 则不执行 fn
    if (props.intercept && !props.intercept(item)) return;
    try {
      loading.value = true;
      await item?.fn();
    } finally {
      loading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .batch-list {
    padding: 4px 0;

    &-item {
      padding: 5px 12px;
      font-size: 13px;
      line-height: 22px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
      }
    }
  }
</style>
