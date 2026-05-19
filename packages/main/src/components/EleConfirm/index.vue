<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="416px"
    draggable
    :before-close="handleClose"
    append-to-body
    class="rt_confirm_modal"
  >
    <div>
      <div
        v-if="iconType == 'success'"
        class="swal2-icon swal2-success swal2-icon-show icon_con_wrap"
      >
        <div
          class="swal2-success-circular-line-left"
          style="background-color: rgb(255, 255, 255)"
        ></div>
        <span class="swal2-success-line-tip"></span>
        <span class="swal2-success-line-long"></span>
        <div class="swal2-success-ring"></div>
        <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255)"></div>
        <div
          class="swal2-success-circular-line-right"
          style="background-color: rgb(255, 255, 255)"
        ></div>
      </div>
      <div
        v-if="iconType == 'warning'"
        class="warning swal2-icon swal2-warning swal2-icon-show icon_con_wrap"
      >
        <div class="swal2-icon-content">!</div>
      </div>
      <div v-if="iconType == 'error'" class="swal2-icon swal2-error swal2-icon-show icon_con_wrap">
        <span class="swal2-x-mark">
          <span class="swal2-x-mark-line-left"></span>
          <span class="swal2-x-mark-line-right"></span>
        </span>
      </div>
      <div class="content_text">{{ confirmTxt }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          :class="[
            'swal2-confirm',
            'btn',
            'fw-bold',
            `btn-${leftBntType}`,
            'confirm_footer_btn',
            'ele_btn_danger',
          ]"
          @click="confirmFn"
        >
          {{ leftBtnTxt }}
        </el-button>
        <el-button
          @click="handleClose"
          class="swal2-cancel btn fw-bold btn-active-light-primary confirm_footer_btn hover_gray"
        >
          {{ rightBtnTxt }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElDialog, ElButton } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      confirmTxt?: string;
      iconType?: string;
      leftBtnTxt?: string;
      leftBntType?: string;
      rightBtnTxt?: string;
    }>(),
    {
      visible: false,
      title: '提示',
      confirmTxt: '确定要删除选中的数据吗?',
      iconType: 'warning',
      leftBtnTxt: '确定',
      rightBtnTxt: '取消',
      leftBntType: 'danger',
    }
  );

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();
  const handleClose = () => {
    emit('closeModal');
  };

  const confirmFn = () => {
    emit('closeModal', 'reload');
  };
</script>

<style lang="scss" scoped>
  .icon_con_wrap {
    display: flex;
  }
  .content_text {
    max-height: 200px;
    overflow: auto !important;
    color: var(--bs-gray-800) !important;
    margin: 1.2em 1.6em 0.3em;
    margin-top: 1.5rem;
    padding: 0;
    padding-top: 5px;
    overflow: auto;
    color: inherit;
    font-weight: normal;
    font-size: 1.1rem;
    line-height: normal;
    text-align: center;
    word-wrap: break-word;
    word-break: break-word;
  }
  .confirm_footer_btn {
    margin: 15px 5px 0;
    color: var(--bs-body-color);
    outline: none !important;
    font-weight: 600 !important;
    border-radius: var(--bs-btn-border-radius);
    --bs-btn-padding-x: 1.5rem;
    --bs-btn-padding-y: 0.775rem;
    --bs-btn-font-family: ;
    --bs-btn-font-size: 1.1rem;
    --bs-btn-font-weight: 500;
    --bs-btn-line-height: 1.5;
    --bs-btn-color: #181c32;
    --bs-btn-bg: transparent;
    --bs-btn-border-width: 1px;
    --bs-btn-border-color: transparent;
    --bs-btn-border-radius: 0.475rem;
    --bs-btn-hover-border-color: transparent;
    --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
    --bs-btn-disabled-opacity: 0.65;
    --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), 0.5);
    display: inline-block;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: var(--bs-btn-bg);
    box-shadow: var(--bs-btn-box-shadow);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    height: auto;
    letter-spacing: 4px;
  }
  .hover_gray:hover {
    color: #7e8299 !important;
  }

  .ele_btn_danger {
    color: var(--bs-danger-inverse);
    border-color: var(--bs-danger);
    background-color: var(--bs-danger);
  }
</style>
