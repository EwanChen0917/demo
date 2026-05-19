<template>
  <el-popconfirm
    width="342px"
    :icon="InfoFilled"
    icon-color="#FF9F22"
    :title="title"
    :z-index="99999"
    :placement="placement"
    @confirm="handleConfirm"
    popper-class="cancel-candidate-popper"
  >
    <template #reference>
      <slot name="reference">
        <el-button link type="primary" class="cancel-candidate-button">{{ buttonText }}</el-button>
      </slot>
    </template>
    <template #actions="{ confirm, cancel }">
      <div class="cancel-candidate-popover">
        <i class="Root-tyicon icon-Root-tyguanbi close-icon" @click="cancel"></i>
        <div class="tips">{{ tips }}</div>
        <div class="footer">
          <el-button size="mini" @click="cancel">取消</el-button>
          <el-button size="mini" type="danger" @click="confirm">确定</el-button>
        </div>
      </div>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
  import { InfoFilled } from '@element-plus/icons-vue';

  interface Props {
    /** 弹窗标题 */
    title?: string;
    /** 触发按钮文案 */
    buttonText?: string;
    /** 提示文案 */
    tips?: string;
    /** 弹出位置 */
    placement?: string;
  }

  interface Emits {
    /** 确认事件 */
    (e: 'confirm'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '从视频候选列表移除？',
    buttonText: '移除候选',
    tips: '仅在视频候选列表中删除该视频，分镜列表可重新加入候选',
    placement: 'top',
  });

  const emit = defineEmits<Emits>();

  /** 确认操作 */
  function handleConfirm() {
    emit('confirm');
  }
</script>

<style lang="scss" scoped>
  .cancel-candidate-popover {
    padding-left: 20px;

    .close-icon {
      position: absolute;
      right: 20px;
      top: 22px;
      color: var(---N6, #8a8f8d);
      cursor: pointer;
    }

    .tips {
      margin-bottom: 20px;
      font-size: 14px;
      color: var(---N8, var(---N8, #585a5a));
      text-align: left;
      line-height: 22px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }
  }
  .cancel-candidate-button {
    padding: 0;
    font-size: 12px;
    line-height: 20px;
    margin-left: 0 !important;
  }
</style>

<style lang="scss">
  .cancel-candidate-popper {
    padding: 20px !important;
    border-radius: 10px;
    box-shadow: 0 2px 12px #06081b1f;
    width: 342px !important;
    .el-popconfirm__main {
      font-family: pingfang SC Medium;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
  }
</style>
