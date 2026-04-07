/// <reference path="./auto-imports.d.ts" />
/// <reference path="./components.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
