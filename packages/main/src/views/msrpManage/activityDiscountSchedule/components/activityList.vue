<template>
  <div v-if="row?.skuCode && weekInfo?.activityName" class="content-box">
    <div
      class="activity-box"
      :class="{
        'yellow-bg': weekInfo?.discountRate <= 10,
        'red-bg': weekInfo?.discountRate > 20,
        'green-bg': weekInfo?.discountRate > 10 && weekInfo?.discountRate <= 20,
      }"
    >
      <OverflowTooltip
        :content="`${weekInfo?.activityName}-${weekInfo?.activityDays}天`"
        :line="1"
      />
      <el-dropdown
        placement="top"
        trigger="click"
        class="dropdown"
        @command="
          (val) => {
            handleCommand(val, { ...row, ...weekInfo });
          }
        "
      >
        <el-icon style="color: var(--bs-success)" :size="20" class="icon">
          <Edit />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="delete">
              <span class="delete-red">删除</span>
            </el-dropdown-item>
            <el-dropdown-item command="detail">详情</el-dropdown-item>
            <el-dropdown-item command="edit">修改</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="status-box">
      <div
        class="discount-time"
        :class="{
          'yellow-bg': weekInfo?.discountRate <= 10,
          'red-bg': weekInfo?.discountRate > 20,
          'green-bg': weekInfo?.discountRate > 10 && weekInfo?.discountRate <= 20,
        }"
      >
        {{ weekInfo?.discountRate }}%
      </div>
      <div class="discount-time grey-green">{{ weekInfo?.activityPrice }} {{ row.currency }}</div>
      <Tag :color="statusColorMap[weekInfo?.approveStatus]" size="small">
        {{ weekInfo?.approveStatusDesc }}
      </Tag>
    </div>
  </div>
</template>

<script setup>
  import { statusColorMap, statusList } from '../enum';
  const emit = defineEmits(['handleCommand']);
  const props = defineProps({
    row: {
      type: Object,
      required: true,
    },
    weekInfo: {},
  });
  const handleCommand = (val, row) => {
    emit('handleCommand', val, row);
  };
</script>

<style lang="scss" scoped>
  .content-box {
    width: 100%;
    text-align: left;
  }
  .activity-box {
    height: 28px;
    margin-bottom: 5px;
    text-align: left;
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 3px;
    position: relative;
    .dropdown {
      position: absolute;
      right: 5px;
      top: 5px;
    }
    .icon {
      cursor: pointer;
    }
  }
  .delete-red {
    color: var(---C7, #f53f3f);
  }
  .discount-time {
    padding: 2px 3px;
    min-width: 55px;
    border-radius: 3px;
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 6px;
    font-size: 12px;
    text-align: center;
  }
  .ml-6 {
    margin-left: 6px;
  }
  .grey-green {
    color: var(--el-color-primary);
    background-color: #ededed;
  }
  .yellow-bg {
    background-color: var(---l5, #fffaeb);
  }
  .red-bg {
    background-color: var(---l7, #ffeeeb);
  }
  .green-bg {
    background-color: rgb(78, 206, 151, 0.2);
  }
  .activity-box :deep(.content) {
    padding-right: 15px !important;
  }
</style>
