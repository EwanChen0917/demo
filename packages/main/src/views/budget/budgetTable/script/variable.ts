export const isDevOrTestRole = localStorage.getItem('isDevOrTestRole');
export const isWebDev = localStorage.getItem('isWebDev');

export const isShowHelperExtendColumn =
  isWebDev && localStorage.getItem('isShowHelperExtendColumn');
export const isLocalhost = location.hostname === 'localhost';

export const isRenderUpdator = true;
export const isRenderCodeColumn = isDevOrTestRole && !!+localStorage.getItem('isShowCodeColumn');

export const RENDER_OFFSET_X = (isRenderUpdator ? 1 : 0) + (isRenderCodeColumn ? 1 : 0);
export const COLUMN_FIXED_LEFT = (isRenderUpdator ? 1 : 0) + (isRenderCodeColumn ? 1 : 0);

export const isShowHeaderFormula = localStorage.getItem('isShowHeaderFormula');
export const isEditAllColumns = localStorage.getItem('isEditAllColumns');

