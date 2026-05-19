<template>
  <el-config-provider :locale="locale">
    <div class="my_date-editor">
      <el-date-picker
        v-model="valueRef"
        :type="props.type"
        :value-format="myValueFormat"
        :format="myFormat"
        :clearable="props.clearable"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :rangeSeparator="props.rangeSeparator"
        :defaultValue="props.defaultValue"
        :placeholder="placeholder"
        :startPlaceholder="startPlaceholder"
        :endPlaceholder="endPlaceholder"
        @change="handleChange"
        align="center"
        :class="[
          'ele-date-editor',
          'mb-2',
          props.dateStyle === 'transparent'
            ? 'form-select-transparent'
            : props.dateStyle === 'solid'
            ? 'form-select-solid'
            : 'form-select-normal',
          isInvalid ? 'is-invalid' : props.isShowValidStyle && valueRef ? 'is-valid' : '',
        ]"
        :style="dateStyle"
      />
    </div>
  </el-config-provider>
</template>

<script setup name="Button" lang="ts">
  import {
    ref,
    computed,
    watch,
    onMounted,
    reactive,
    toRefs,
    getCurrentInstance,
    nextTick,
  } from 'vue';
  import { ElDatePicker, ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import en from 'element-plus/dist/locale/en.mjs';

  const G_DATA_CONFIG = {
    format: {
      year: 'YYYY',
      years: 'YYYY',
      month: 'YYYY-MM',
      months: 'YYYY-MM',
      week: 'YYYY 第 WW 周',
      date: 'YYYY-MM-DD',
      daterange: 'YYYY-MM-DD',
      dates: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm',
      datetimerange: 'YYYY-MM-DD HH:mm',
    },
    valueFormat: {
      year: 'YYYY',
      years: 'YYYY',
      month: 'YYYY-MM',
      months: 'YYYY-MM',
      week: 'YYYY 第 WW 周',
      date: 'YYYY-MM-DD',
      daterange: 'YYYY-MM-DD',
      dates: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm',
      datetimerange: 'YYYY-MM-DD HH:mm',
    },
    placeholder: {
      year: '选择年',
      years: '选择一个或者多个年',
      month: '选择月',
      months: '选择一个或者多个月份',
      date: '选择日期',
      dates: '选择一个或者多个日期',
      week: '选择周',
      datetime: '选择时间',
      datetimes: '选择一个或者多个时间',
    },
    startPlaceholder: {
      yearrange: '开始年份',
      monthrange: '开始月份',
      daterange: '开始日期',
      datetimerange: '开始时间',
    },
    endPlaceholder: {
      yearrange: '结束年份',
      monthrange: '结束月份',
      daterange: '结束日期',
      datetimerange: '结束时间',
    },
  };

  const instance: any = getCurrentInstance();

  const { proxy } = instance;
  const props = defineProps({
    // 时间选择类型
    type: {
      type: String,
      default: () => 'date',
    },
    // 值
    value: {
      type: [String, Array],
      default: '',
    },
    // 语言
    lang: {
      type: String,
      default: 'zh',
    },
    // 风格
    dateStyle: {
      type: String,
      default: 'normal',
    },
    // 宽度
    width: {
      type: String,
      default: '',
    },
    // datetimerange时底部按钮文案
    cancelText: {
      type: String,
      default: '取消',
    },
    // datetimerange时底部按钮文案
    confirmText: {
      type: String,
      default: '确认',
    },
    clearable: {
      type: Boolean,
      default: () => true,
    },
    // 完全只读
    readonly: {
      type: Boolean,
      default: () => false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: () => false,
    },
    // 非范围选择时的占位内容
    placeholder: {
      type: String,
      default: () => '',
    },
    // 范围选择时开始日期的占位内容
    startPlaceholder: {
      type: String,
      default: () => '',
    },
    // 范围选择时结束日期的占位内容
    endPlaceholder: {
      type: String,
      default: () => '',
    },
    // 显示在输入框中的格式
    format: {
      type: String,
      default: () => '',
    },
    valueFormat: {
      type: String,
      default: () => '',
    },
    // 选择范围时的分隔符
    rangeSeparator: {
      type: String,
      default: () => '-',
    },
    // 默认显示的时间
    defaultValue: {
      type: String,
      default: () => '',
    },
    // 默认显示的时间
    defaultTime: {
      type: String,
      default: () => '',
    },
    isValidate: {
      type: Boolean,
      default: () => true,
    },
    isShowValidStyle: {
      type: Boolean,
      default: () => false,
    },
  });

  const state = reactive<{
    width: any;
    myFormat: any;
    myValueFormat: any;
    placeholder: any;
    startPlaceholder: any;
    endPlaceholder: any;
    isInvalid: any;
    valueRef: any;
  }>({
    width: '400px',
    myFormat: '',
    myValueFormat: '',
    placeholder: '',
    startPlaceholder: '',
    endPlaceholder: '',
    isInvalid: false,
    valueRef: '',
  });
  const {
    width,
    myFormat,
    myValueFormat,
    placeholder,
    startPlaceholder,
    endPlaceholder,
    isInvalid,
    valueRef,
  } = toRefs(state);

  // 日期的值

  valueRef.value = props.value as any;

  const locale = computed(() => {
    return props.lang === 'en' ? en : zhCn;
  });

  const dateStyle = computed(() => {
    return {
      width: props.width,
      marginRight: '10px',
      borderColor: '#f9f9f9',
    };
  });

  // 事件声明
  const emit = defineEmits<{
    (event: 'update:value', val: any);
    (event: 'change', val: any);
    (event: 'blur');
  }>();

  // 值变化值触发
  const handleChange = (val: any) => {
    // 先更新
    const new_val = formatDateVal(val);
    emit('change', new_val);
    validate();
  };

  watch(
    () => valueRef.value,
    (val: string) => {
      const new_val = formatDateVal(val);
      emit('update:value', new_val);
    }
  );
  // 针对datetime类型格式化时间
  const formatDateVal = (val) => {
    let new_val = val;
    if (val && val.length > 1 && ['datetimerange'].includes(props.type)) {
      new_val[0] = formattedDateStr(new_val[0]);
      new_val[1] = formattedDateStr(new_val[1]);
    }

    if (val && ['datetime'].includes(props.type)) {
      new_val = formattedDateStr(new_val);
    }

    return new_val;
  };

  // 格式化时间字符串
  const formattedDateStr = (str) => {
    str.replace(' ', ' 00:');
    str += ':00';
    return str;
  };
  // 表单校验
  const validate = () => {
    // nextTick 再进行表单校验
    props.isValidate &&
      nextTick(() => {
        // 表单校验
        if (proxy.$parent && typeof proxy.$parent.validate === 'function') {
          proxy.$parent
            .validate()
            .then(() => {
              isInvalid.value = false;
            })
            .catch(() => {
              isInvalid.value = true;
            });
        }
      });
  };

  const initProps = () => {
    myFormat.value = props.format || G_DATA_CONFIG.format[props.type];
    myValueFormat.value = props.valueFormat || G_DATA_CONFIG.valueFormat[props.type];
    placeholder.value = props.placeholder || G_DATA_CONFIG.placeholder[props.type];
    startPlaceholder.value = props.startPlaceholder || G_DATA_CONFIG.startPlaceholder[props.type];
    endPlaceholder.value = props.endPlaceholder || G_DATA_CONFIG.endPlaceholder[props.type];

    // 设置底部按钮文案
    if (['datetime', 'datetimerange'].includes(props.type)) {
      const footer_btn_el = document.getElementsByClassName('el-picker-panel__link-btn');
      footer_btn_el[0] && (footer_btn_el[0].innerHTML = props.cancelText);
      footer_btn_el[1] && (footer_btn_el[1].innerHTML = props.confirmText);
    }

    if (['daterange', 'datetimerange'].includes(props.type)) {
      width.value = props.width ? props.width : '500px';
    }
  };

  initProps();
</script>

<style lang="scss" scoped>
  .my_date-editor {
    height: 43px;
  }
  .my_date-editor :deep(.el-date-editor) {
    display: flex;
  }

  .my_date-editor :deep(.el-input__wrapper) {
    padding: 0 11px;
    width: 100%;
  }

  .my_date-editor :deep(.el-input__suffix-inner) {
    position: absolute;
    right: -30px;
    bottom: -8px;
  }

  .my_date-editor :deep(.el-range__close-icon) {
    position: absolute;
    right: 10px;
  }

  .form-select-normal {
    border: 1px solid #e1e3ea !important;
    background-color: #ffffff !important;
  }

  .form-select-transparent {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
  }

  .form-select-solid .el-input__wrapper {
    background-color: #f9f9f9 !important;
    border-color: #f9f9f9 !important;
    width: 100% !important;
  }

  .form-select-normal .el-input__wrapper {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
    width: 100% !important;
  }

  .form-select-transparent .el-input__wrapper {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
    width: 100% !important;
  }
  .ele-date-editor v::deep(.el-input__wrapper) {
    width: 100% !important;
    flex-grow: 0 !important;
    padding: 0px 11px !important;
    box-shadow: none !important;
  }

  .ele_picker.el-date-editor--date.el-date-editor.el-date-editor--date {
    flex: none !important;
  }

  .indicator-progress {
    display: none !important;
  }

  .el-picker-panel__footer > button {
    height: 36px;
    line-height: 10px;
    margin-right: 16px;
    font-size: 14px;
    font-weight: 400;
    padding: 0;
    text-align: center;
    border-radius: 8px;
    margin-top: 8px;
    background-color: #f9f9f9 !important;
    color: #7e8299 !important;
  }

  .el-picker-panel__footer > button:nth-child(2) {
    height: 36px;
    line-height: 10px;
    margin-right: 16px;
    font-size: 14px;
    font-weight: 400;
    padding: 0;
    text-align: center;
    border-radius: 8px;
    margin-top: 8px;
    background-color: #009ef7 !important;
    color: #ffffff !important;
  }

  .el-picker-panel__shortcut:hover {
    color: #fff;
    border: 1px solid #fff;
  }

  .el-date-editor {
    display: flex !important;
  }

  .el-date-editor .el-range__close-icon {
    right: 0 !important;
  }
  .el-picker-panel__link-btn {
    padding: 0 15px !important;
    margin-bottom: 5px;
  }
  .form-select {
    height: 43px !important;
    align-items: center;
    margin-right: 10px !important;
    .el-input__wrapper {
      width: 100% !important;
      padding: 0px 11px !important;
    }
  }
</style>
