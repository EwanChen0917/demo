<template>
  <el-select
    :class="[
      'ele_picker',
      'select2-selection',
      'select2-selection--single',
      'form-select',
      'ele_form_select',
      'mr_12',
      isInvalid ? 'is-invalid' : props.isShowValidStyle && valueRef ? 'is-valid' : '',
      props.selectStyle === 'transparent'
        ? 'form-select-transparent'
        : props.selectStyle === 'solid'
        ? 'form-select-solid'
        : 'form-select-normal',
      !props.isShowValidStyle ? 'form-select-not-validate-padding' : '',
    ]"
    v-model="valueRef"
    :style="{ width: props.width }"
    :teleported="false"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :filterable="props.filterable"
    :clearable="props.clearable"
    :remote="props.remote"
    :multiple="props.multiple"
    :collapse-tags="props.collapseTags"
    :allow-create="props.allowCreate"
    :loading="props.loading"
    :default-first-option="true"
    :reserve-keyword="false"
    size="large"
    suffix-icon=""
    popper-class="ele_formpop_select"
    @change="handleChange"
    :remote-method="redRemoteMethod"
  >
    <template v-if="props.options.length">
      <el-option
        v-for="item in props.options"
        :key="item[props.optionsValue]"
        :label="
          Array.isArray(props.optionsLabel)
            ? props.optionsLabel
                .map((label) => {
                  return item[label];
                })
                .join(' , ')
            : item[props.optionsLabel]
        "
        :value="item[props.optionsValue]"
      />
    </template>
  </el-select>
</template>

<script setup name="Select" lang="ts">
  import { ElSelect, ElOption } from 'element-plus';

  const instance: any = getCurrentInstance();

  const { proxy } = instance;

  const props = defineProps({
    // 值
    value: {
      type: [String, Number, Array],
      default: () => '',
    },
    // 风格
    selectStyle: {
      type: String,
      default: () => 'normal',
    },
    // 宽度
    width: {
      type: String,
      default: () => '400px',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => false,
    },
    // 是否过滤
    filterable: {
      type: Boolean,
      default: () => true,
    },
    remote: {
      type: Boolean,
      default: () => false,
    },
    // 是否清空
    clearable: {
      type: Boolean,
      default: () => true,
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: () => false,
    },
    allowCreate: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    // 是否收起tags
    collapseTags: {
      type: Boolean,
      default: () => true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionsLabel: {
      type: [String, Array],
      default: 'label',
    },
    optionsValue: {
      type: String,
      default: 'value',
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
    isInvalid: any; // 标记表单校验是否通过
    valueRef: any;
  }>({
    isInvalid: false,
    valueRef: '',
  });
  const { isInvalid, valueRef } = toRefs(state);

  valueRef.value = props.value as any;
  // 输入框的值
  // 事件声明
  const emit = defineEmits<{
    (event: 'change', val: any, selectData: any);
    (event: 'redRemoteMethod', val: any);
  }>();

  const redRemoteMethod = (val: string) => {
    emit('redRemoteMethod', val);
  };

  const getSelectData = (val) => {
    const result_arr: any = props.options.filter((option: any) => {
      return option[props.optionsValue] === val;
    });
    return result_arr[0] || {};
  };

  // 值变化值触发
  const handleChange = (val: any) => {
    // 单选返回具体选择的数据，多选返回map，key为选中的value，值为value对应的选中的数据
    if (props.multiple) {
      const map = {};
      val.forEach((item) => {
        map[item] = getSelectData(item);
      });
      emit('change', val, map);
    } else {
      emit('change', val, getSelectData(val));
    }
    // 再进行表单校验
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
</script>

<style lang="scss" scoped>
  .form-select-normal {
    border: 1px solid #e1e3ea !important;
  }

  .form-select {
    height: 43px !important;
    align-items: center;
    margin-right: 10px;
    display: inherit !important;
    --bs-form-select-bg-img: url('') !important;

    :deep(.select-trigger) {
      width: 100%;

      .el-input__wrapper {
        width: 100% !important;
      }
    }
  }

  .form-select-not-validate-padding {
    padding: 0.775rem 0.75rem 0.775rem 1rem !important;
  }

  .ele_form_select.el-select.el-select--large .el-input__wrapper {
    padding: 0px 10px 0 0 !important;
  }
</style>
