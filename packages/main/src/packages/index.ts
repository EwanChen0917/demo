import LuteButton from './button';
import LuteBadge from './badge';
import LuteForm from './form';
import LuteFormItem from './form_item';
import LuteTable from './table';
import LuteInput from './input';
import LuteTab from './tab';
import LuteModal from './modal';
import LuteSelect from './select';
import LuteDatePicker from './datepicker';
import LuteMenus from './menus';

// 按需引入
export {
  LuteButton,
  LuteBadge,
  LuteForm,
  LuteFormItem,
  LuteTable,
  LuteInput,
  LuteTab,
  LuteModal,
  LuteSelect,
  LuteDatePicker,
  LuteMenus,
};

const components = [
  LuteButton,
  LuteBadge,
  LuteForm,
  LuteFormItem,
  LuteTable,
  LuteInput,
  LuteTab,
  LuteSelect,
  LuteDatePicker,
  LuteMenus,
];

const install = (App) => {
  components.forEach((item) => {
    // eslint-disable-next-line no-underscore-dangle
    App.component(item.__name, item);
  });
};

// 引入google字体
// import './assets/globalStyles/interFont/google.fonts.scss';
// 引入全局样式、字体图标
// import './assets/globalStyles/global.scss';
// import './assets/styles/bundle.scss';
// import './assets/styles/duotone.scss';
// import './assets/styles/index.scss';
// import './assets/styles/base.scss';
// import './assets/styles/variables.scss';

export default { install };
