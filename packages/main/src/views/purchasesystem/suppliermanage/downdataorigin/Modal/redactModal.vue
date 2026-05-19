<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    draggable
    :before-close="handleClose"
    class="ele_add_modal modal-dialog w-650px"
    style="height: 24.2rem"
    :class="{ trans: enterFlag, leave_trans: leaveFlag }"
  >
    <div class="modal-body py-10 px-lg-17 pb-0">
      <div class="scroll-y me-n7 pe-7">
        <el-form
          label-position="top"
          label-width="100px"
          :model="form"
          require-asterisk-position="right"
          :rules="rules"
          ref="eleFormRef"
          scroll-to-error
        >
          <el-form-item label="日期" prop="effectiveTime">
            <el-date-picker
              class="ele-date-editor bg_f9 mb-2"
              popper-class="ele_formpop_date-editor"
              v-model="form.effectiveTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="到期时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <template #header>
      <div class="modal-header">
        <h2 class="fw-bold">{{ title }}</h2>
        <div @click="handleClose" class="btn btn-icon btn-sm btn-active-icon-primary">
          <span class="svg-icon svg-icon-1">
            <SvgIcon icon="close" />
          </span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="modal-footer flex-center">
        <el-button @click="handleClose" class="sbtn btn-light me-3 add_footer_btn">关闭</el-button>
        <el-button class="btn btn-primary add_footer_btn" @click="submitFn">下载</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElDialog, ElButton, ElForm, ElFormItem } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      info: any;
    }>(),
    {
      visible: false,
      title: '提示',
    }
  );

  const state = reactive<{
    form: any;
    enterFlag: boolean;
    leaveFlag: boolean;
    rules: any;
    countryOptions: optionItf[];
    labelCodeOptions: optionItf[];
  }>({
    form: {
      effectiveTime: [],
    },
    enterFlag: false,
    leaveFlag: false,
    rules: {},
    countryOptions: [],
    labelCodeOptions: [],
  });

  const { form, enterFlag, leaveFlag, rules } = toRefs(state);

  form.value = { ...props.info };

  form.value.effectiveTime = [props.info.markCodeStartTime || '', props.info.markCodeEndTime || ''];

  const addClass = () => {
    setTimeout(() => {
      enterFlag.value = true;
    }, 0);
  };
  addClass();

  rules.value = {
    // effectiveTime: { required: true, message: '请选择时间', trigger: ['blur', 'change'] }
  };

  const eleFormRef = ref();
  const submitFn = () => {
    eleFormRef.value
      ?.validate()
      .then(() => {
        emit('closeModal', 'reload', form);
      })
      .catch(() => false);
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    leaveFlag.value = true;
    setTimeout(() => {
      emit('closeModal');
    }, 100);
  };
</script>

<style lang="scss" scoped></style>
