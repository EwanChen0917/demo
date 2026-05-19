import type { App } from 'vue';
import permission from './permission';
import numberFormat from './numberFormat';

import Contextmenu from './contextmenu';
import ClickOutside from './clickOutside';

export default (app: App<Element>) => {
  app.directive('permission', permission);
  app.directive('contextmenu', Contextmenu);
  app.directive('click-outside', ClickOutside);
  app.directive('permission', permission);
  app.directive('number-format',numberFormat)
};
