import type { App } from 'vue';
import { nextTick } from 'vue';
import * as BizComponents from 'element-plus/es/biz-components';
// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
import {
  ElLoading,
  ElScrollbar,
  ElCheckbox,
  ElCheckboxGroup,
  ElDropdown,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElInput,
  ElButton,
  ElPopover,
  ElUpload,
  ElDialog,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTag,
  ElTreeSelect,
  ElRow,
  ElCol,
  ElTooltip,
  ElInfiniteScroll,
  ElInputNumber,
  ElRadioGroup,
  ElRadio,
} from 'element-plus';
// 处理一些默认配置

ElSelect.props.defaultFirstOption = {
  type: Boolean,
  default: true,
};
const plugins = [
  ElLoading,
  ElCheckbox,
  ElCheckboxGroup,
  ElDropdown,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElInput,
  ElButton,
  ElPopover,
  ElUpload,
  ElDialog,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTag,
  ElTreeSelect,
  ElRow,
  ElCol,
  ElTooltip,
  ElInfiniteScroll,
  ElInputNumber,
  ElRadioGroup,
  ElRadio,
];

const components = [ElScrollbar];

// eslint-disable-next-line import/prefer-default-export
export const setupElementPlus = (app: App) => {
  // 设置全局的模态框点击空白不消失
  nextTick(() => {
    (app._context.components.ElDialog as any).props.closeOnClickModal.default = false;
  });

  plugins.forEach((plugin) => {
    app.use(plugin);
  });

  components.forEach((component) => {
    app.component(component.name, component);
  });

  // 注册业务组件
  /* BizComponents?.forEach((component) => {
    app.component(component.name, component);
  }); */
  console.log(BizComponents);
};
