import type { App } from 'vue';
// 全局页面组件
import SvgIcon from '@/components/SvgIcon/index.vue';
import RtSelect from '@/components/RtSelect/index.vue';
import RtTable from '@/components/RtTable/index.vue';
import EleTableActions from '@/components/EleTableActions/index.vue';
import EleInput from '@/components/EleInput/index.vue';

export const setupGlobCom = (app: App<Element>): void => {
  app.component('SvgIcon', SvgIcon);
  app.component('RtSelect', RtSelect);
  app.component('RtTable', RtTable);
  app.component('EleTableActions', EleTableActions);
  app.component('EleInput', EleInput);
};
