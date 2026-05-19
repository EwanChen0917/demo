<template>
  <div class="order-tabs">
    <el-tabs
      v-model="value"
      tab-position="top"
      @tab-change="(val) => emit('tabChange', val)"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item in tabStatusList"
        :key="item.status"
        :label="item.statusName"
        :name="item.status"
      >
        <template #label>
          <span>{{ item.statusName }}</span>
          <span v-if="item.status" class="tab-count">
            {{ countMap?.[item.code] ? `(${countMap?.[item.code]})` : '' }}
          </span>
          <el-popover
            v-if="item?.children"
            ref="childPopoverRef"
            trigger="click"
            :show-arrow="false"
            :popper-style="{
              padding: '14px 12px',
              boxShadow: '0px 2px 12px 0px rgba(6, 8, 27, 0.12)',
            }"
            :popper-class="childPopoverClass || ''"
            @after-enter="iconClass = 'arrows-icon-up'"
            @after-leave="iconClass = 'arrows-icon-down'"
          >
            <template #default>
              <div class="children-tabs">
                <div class="child-group" v-for="group in item?.children" :key="group?.groupName">
                  <div class="group-name">{{ group?.groupName }}</div>
                  <div
                    class="children-tabs-item"
                    v-for="child in group?.list"
                    :key="child?.code"
                    @click="handleChildTabChange(child?.status)"
                  >
                    {{ child?.statusName }}
                    <span v-if="childCountMap?.[child.status]" class="error-count">
                      ({{ childCountMap?.[child.status] }})
                    </span>
                  </div>
                </div>
              </div>
            </template>
            <template #reference>
              <i class="iconfont icon-jiantouxiangxia" :class="iconClass" @click.stop></i>
            </template>
          </el-popover>
        </template>
      </el-tab-pane>
    </el-tabs>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: string;
    tabStatusList: any[];
    countMap: any;
    childCountMap?: any;
    childPopoverClass?: string;
  }>();

  const emit = defineEmits<{
    (event: 'tabChange', val: string): void;
    (event: 'childTabChange', val: string): void;
    (event: 'update:modelValue', val: string): void;
  }>();

  const iconClass = ref();

  const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });

  const handleTabClick = (pane) => {
    emit('tabChange', pane?.props?.name);
  };

  const childPopoverRef = ref(null);

  const handleChildTabChange = (status) => {
    childPopoverRef.value?.[0]?.hide();
    emit('childTabChange', status);
  };
</script>

<style scoped lang="scss">
  .order-tabs {
    /*display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    position: relative;*/
    //margin: 0 16px;
    //border-bottom: 1px solid #f4f4f4;
  }

  .children-tabs {
    width: 340px;
    max-height: 466px;
    display: flex;
    flex-direction: column;
    gap: 28px 24px;
    flex-wrap: wrap;

    &-item {
      width: 146px;
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
      }
    }

    .child-group {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .group-name {
        color: var(---N6, #999);
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  :deep(.el-tabs__item) {
    gap: 4px;
  }

  .el-tabs__item:not(.is-active) .tab-count {
    color: #999999;
  }

  .el-tabs__item:hover {
    .tab-count {
      color: var(--el-color-primary);
    }
  }

  .error-count {
    color: var(---C7, #f53f3f) !important;
  }

  .arrows-icon-down {
    animation: moveDown 0.1s linear forwards;

    @keyframes moveDown {
      0% {
        transform: rotate(-180deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  }

  .arrows-icon-up {
    animation: moveUp 0.1s linear forwards;

    @keyframes moveUp {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(-180deg);
      }
    }
  }
</style>
