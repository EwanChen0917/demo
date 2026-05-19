<template>
  <el-popover
    popper-class="rt_el_pop action_pop"
    :offset="0"
    :hide-after="0"
    placement="bottom-end"
    :width="126"
    trigger="click"
  >
    <div
      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4 show"
    >
      <div class="menu-item px-3">
        <!-- slot传值 -->
        <slot></slot>
      </div>
    </div>
    <template #reference>
      <div class="btn btn-sm btn-light btn-active-light-primary mr_6">
        <span class="fn_12 mr_4 txt">操作</span>
        <span class="svg-icon svg-icon-5 m-0"><SvgIcon icon="arrowDown" class="mr_0" /></span>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { ElPopover } from 'element-plus';

  defineProps<{
    row?: any;
  }>();
</script>

<style lang="scss" scoped></style>
