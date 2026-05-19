interface optionTft {
  label?: string;
  value?: any;
}
interface pageInfoItf {
  currentPage: number;
  size: number;
  total: number;
  pageSizeOption?: number[];
}

interface tableColumnItf {
  type?: string;
  width?: number | string;
  label?: string;
  prop?: string;
  showOverflowTooltip?: boolean;
  renderHeader?: any;
  render?: any;
  fixed?: any;
  minWidth?: number | string;
  align?: string;
  headerAlign?: string;
  rules?: any;
  overShowTips?: boolean;
}
