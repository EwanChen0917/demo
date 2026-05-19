import { createApp, App as IApp } from 'vue';

import VXETable from 'vxe-table';
import VXETableUI from 'vxe-pc-ui';
import ElementPlus from 'element-plus';
import 'vxe-table/lib/style.css';
import 'vxe-pc-ui/lib/style.css';
import '@/styles/vxeTable.scss';

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

import 'dayjs/locale/zh-cn';
import VueMarkdownIt from 'vue3-markdown-it';
import TableEmpty from '@/plugins/tableEmpty';
import vxeTableEmpty from '@/plugins/vxeTableEmpty';
import '@/styles/index.scss';
// 导入全局的svg图标
import '@/plugins/svgIcon';

import { setupGlobCom } from '@/components/index'; // 全局组件
// import { setupElementPlus } from '@/plugins/elementPlus'; // 引入element-plus
import pinia, { setupStore } from '@/store'; // 引入状态管理
import { setupRouter } from '@/permission'; // 引入路由
//  注册指令
import setupDirective from '@/directives/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import vconsole from 'vconsole';
import axios from 'axios';
import App from './App.vue';
import { GetCode, isDingTalk } from './utils/dd';
import { getCookieToken, setCookieToken } from './hooks/web/useCookie';
import { useStore } from './store/modules/useStore';
import armsRum from './arms';

function setupVxeTable(app: IApp) {
  VXETable.VxeUI.setIcon({
    TABLE_SORT_ASC: 'iconfont icon-xiangshang vxe-custom--sort-asc',
    TABLE_SORT_DESC: 'iconfont icon-xiangxia vxe-custom--sort-desc',
  });
  app.use(VXETable).use(VXETableUI);
}
function initApp() {
  const app = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  setupRouter(app);
  setupStore(app);
  setupGlobCom(app);
  // setupElementPlus(app);
  setupVxeTable(app);
  setupDirective(app);
  app.use(ElementPlus);
  app.use(VueMarkdownIt);
  app.use(TableEmpty);
  app.use(vxeTableEmpty);
  app.use(armsRum);
  app.mount('#app');
}

if (import.meta.env.VITE_ENV !== 'PROD' && isDingTalk()) {
  new vconsole();
}
if (isDingTalk()) {
  initToken();
} else {
  initApp();
}

async function initToken() {
  const token = getCookieToken();
  if (token) {
    try {
      const res = await axios.get('/api/luteos/member/queryCurrentUserInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200 && +res.data.code === 200) {
        initApp();
      } else {
        getToken(initApp);
      }
    } catch (err) {
      getToken(initApp);
    }
  } else {
    getToken(initApp);
  }
  function getToken(callback) {
    GetCode(async (code) => {
      try {
        const res = await axios.get('/api/luteos/member/loginWithDingtalk', {
          params: {
            dingCode: code,
          },
        });
        if (res.status === 200 && +res.data.code === 200) {
          setCookieToken(res.data.result.token);
          useStore(pinia).token = res.data.result.token;
          callback();
        } else {
          setTimeout(() => {
            getToken(callback);
          }, 3000);
        }
      } catch {
        setTimeout(() => {
          getToken(callback);
        }, 3000);
      }
    });
  }
}
