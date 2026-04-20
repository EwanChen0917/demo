import { baseStore } from '@/store/modules/baseStore';

export const breadSet = (to: any, menus: any) => {
  const baseInfo = baseStore();
  const { setBreadInfo } = baseInfo;
  const data: any = {};
  const first_menu: any = (to.matched && to.matched[0]) || {};
  data['firstMenu'] = first_menu.meta.title;
  data['thirdMenu'] = to.meta.title;
  const component_name = first_menu.name;
  for (let i = 0; i < menus.length; i++) {
    const children = (menus[i] && menus[i].children) || [];
    for (let j = 0; j < children.length; j++) {
      const menu_info = children[j];
      if (menu_info.componentName === component_name) {
        data['secondMenu'] = menu_info.name || '';
        break;
      }
    }
  }
  console.log(data);
  setBreadInfo(data);
};
