declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'virtual:svg-icons-register';
declare module 'virtual:svg-icons-names' {
  const iconsNames: string[];
  export default iconsNames;
}
