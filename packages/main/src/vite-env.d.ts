import Swal2 from 'sweetalert2';
import ApexChartsClass from 'apexcharts';

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/**
 * declare告诉编译器知道Window是啥类型，并且和全局的Window类型自动合并
 */
export declare global {
  interface Window {
    DTFrameLogin: any; // 全局变量名
    KTUtil: any;
    ApexCharts: typeof ApexChartsClass;
    Chart: any;
    KTComponents: any;
    KTMenu: any;
    Swal: typeof Swal2;
  }
}
