<template>
  <LuteModal
    v-model:visible="props.visible"
    :title="title"
    width="30%"
    @close="handleClose"
    @save="confirmFn"
  >
    <template #body>
      <LuteForm
        :model="form"
        :rules="rules"
        ref="eleFormRef"
        inline
        label-position="top"
        label-width="0px"
      >
        <LuteFormItem label="">
          <LuteSelect
            :isValidate="false"
            :options="optionList"
            placeholder="请选择标签"
            v-model="form.selectVal"
            select-style="solid"
            remote
            clearable
            filterable
            multiple
            :loading="selectValLoading"
            :collapse-tags="false"
            :remote-method="redRemoteMethod"
            @change="selectChange"
            value-key="value"
          />
        </LuteFormItem>
      </LuteForm>
      <div class="total_tags" v-if="tagList.length > 0">
        <el-checkbox
          v-model="checkAll"
          class="ele_checkbox"
          size="large"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
          <el-checkbox
            v-for="tag in tagList"
            :key="tag.labelCode"
            :label="tag.labelCode"
            class="ele_checkbox"
            size="large"
          >
            <el-tooltip
              placement="top"
              effect="light"
              popper-class="action_tool_tip"
              :content="tag.name"
              :disabled="tag.name?.length <= 4"
            >
              <span>{{ tag.name }}</span>
            </el-tooltip>
          </el-checkbox>
          <div class="ele_checkbox"></div>
          <div class="ele_checkbox"></div>
          <div class="ele_checkbox"></div>
        </el-checkbox-group>
      </div>
    </template>
  </LuteModal>
</template>

<script setup lang="ts">
  import { ElDialog, ElButton, ElForm, ElCheckboxGroup, ElCheckbox, ElTooltip } from 'element-plus';
  import { queryLabelList, saveLabelInfo } from '@/apis/favourProject';
  import { LuteForm, LuteFormItem } from 'lute_quark';
  import LuteSelect from '@/packages/select';
  import LuteModal from '@/packages/modal';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      tagList: any;
    }>(),
    {
      visible: false,
      title: '提示'
    }
  );
  const state = reactive<{
    form: any;
    enterFlag: boolean;
    leaveFlag: boolean;
    rules: any;
    optionList: optionItf[];
    addSelectList: optionItf[];
    checkAll: boolean;
    isIndeterminate: boolean;
    checkedList: any[];
    allowCreate: any;
    selectValLoading: any;
  }>({
    form: {
      selectVal: []
    },
    enterFlag: false,
    leaveFlag: false,
    rules: {},
    optionList: [],
    addSelectList: [],
    checkAll: true,
    isIndeterminate: false,
    checkedList: [],
    allowCreate: false,
    selectValLoading: false
  });

  const {
    form,
    enterFlag,
    leaveFlag,
    rules,
    optionList,
    addSelectList,
    checkAll,
    isIndeterminate,
    checkedList,
    allowCreate,
    selectValLoading
  } = toRefs(state);

  const addClass = () => {
    setTimeout(() => {
      enterFlag.value = true;
    }, 0);
  };
  addClass();

  rules.value = {
    selectVal: { required: true, message: '请选择红人标签', trigger: ['blur', 'change'] }
  };

  let totalList: any = [];
  const getList = () => {
    checkedList.value = [];
    props.tagList.map((item: any) => {
      totalList.push(item.labelCode);
      checkedList.value.push(item.labelCode);
    });
  };
  getList();

  const handleCheckAllChange = (val: boolean) => {
    checkedList.value = val ? totalList : [];
    isIndeterminate.value = false;
  };
  const handleCheckedChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === totalList.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < totalList.length;
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

  const getOptionList = (name: string) => {
    // 等接口回来才支持自动创建
    allowCreate.value = false;
    // 远程加载loading
    selectValLoading.value = true;
    queryLabelList({ pageNum: 1, pageSize: 50, name: name, module: 'meta' })
      .then((res) => {
        if (res.code == 200) {
          let list = res.result?.labelInfoList || [];
          optionList.value = list.map((item: any) => ({
            value: `${item.labelCode}`,
            label: `${item.name}`
          }));
        }
        setTimeout(() => {
          allowCreate.value = true;
          selectValLoading.value = false;
        }, 100);
      })
      .catch(() => {
        allowCreate.value = true;
        selectValLoading.value = false;
      });
  };
  getOptionList('');

  const redRemoteMethod = (val: string) => {
    getOptionList(val);
  };

  const selectChange = (val: any) => {
    // 获取最后一条数据进行处理
    const lastItem = val[val.length - 1];
    const last = optionList.value.find((item) => {
      return item.value === lastItem;
    });
    if (last) {
      addSelectList.value.push({
        value: lastItem,
        label: last['label']
      });
    } else if (typeof lastItem === 'string' && !last) {
      saveLabelInfo({ labelType: 1, name: lastItem, module: 'meta' }).then((res) => {
        if (res.code == 200) {
          addSelectList.value.push({
            value: `${res.result.labelCode}`,
            label: `${lastItem}`
          });
        }
      });
    }
  };

  let eleFormRef = ref();
  const confirmFn = () => {
    eleFormRef.value.validate().then((flag) => {
      if (!flag) {
        return;
      }
      // 数据处理
      let result: any = [];
      form.value.selectVal.map((item: any) => {
        if (typeof item === 'string') {
          addSelectList.value.map((tem) => {
            if (item == tem.value || item == tem.label) {
              result.push(tem.value);
            }
          });
        } else {
          result.push(item.value);
        }
      });
      result = result.concat(checkedList.value);
      result = [...new Set(result)];
      emit('closeModal', 'reload', result);
    });
  };
</script>

<style lang="scss" scoped>
  ::v-deep(.el-form-item) {
    width: 100%;
  }
  ::v-deep(.el-form-item__content) {
    width: 100%;
  }
  ::v-deep(.el-form-item__label) {
    display: none !important;
  }
  ::v-deep(.el-select__tags) {
    max-width: unset !important;
  }
  .icon_con_wrap {
    display: flex;
  }
  ::v-deep(.el-checkbox-group) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .ele_checkbox {
    width: 100px;
    flex: 0 0 100px;
    margin-right: 0;
    ::v-deep(.el-checkbox__label) {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    ::v-deep(.el-checkbox__input) {
      border-radius: 0.45em;
      width: 1.75rem;
      height: 1.75rem;
    }
    ::v-deep(.el-checkbox__inner) {
      border-radius: 0.45em;
      width: 1.75rem;
      height: 1.75rem;
      background-color: #f4f4f4;
    }
    ::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
      border-color: transparent;
      background-color: #3e97ff;
    }
    ::v-deep(.el-checkbox__inner::after) {
      width: 4px;
      transform: rotate(45deg) scale(1.2, 1.4);
      border-color: transparent;
    }
    ::v-deep(.el-checkbox__inner) {
      border-color: transparent;
    }
    ::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
      transform: rotate(45deg) scale(1.2, 1.4);
      transition: none;
      border-color: #fff;
    }
  }
</style>
