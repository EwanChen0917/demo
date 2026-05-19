import type { SweetAlertOptions } from 'sweetalert2';

// const resolveOptions = (options?: string | SweetAlertOptions) =>
//   typeof options === 'string'
//     ? {
//         text: options,
//       }
//     : options;
const resolveOptions = (options?: string | SweetAlertOptions) =>
  typeof options === 'string'
    ? {
        title: options,
      }
    : options;

const getIconHtml = (options?: any, defaultIcon?: any) => {
  let str = '';
  // console.log(options, options.icon);
  if (!options.icon) {
    options.icon = defaultIcon;
  }
  if (options.icon === 'warning') {
    str = '<i class="iconfont icon-zhuyizhuangtai" style="color:#ff9f22;font-size:24px"></i>';
  } else if (options.icon === 'success') {
    str = '<i class="iconfont icon-chenggongzhuangtai" style="color:#02b96b;font-size:24px"></i>';
  } else if (options.icon === 'error') {
    str = '<i class="iconfont icon-cuowuzhuangtai" style="color:#f53f3f;font-size:24px"></i>';
  }
  return str;
};
export const confirm = async (options?: string | SweetAlertOptions) => {
  const r = await window.Swal.fire({
    // text: '确定导出吗？',
    icon: 'warning',
    iconHtml: getIconHtml(resolveOptions(options), 'warning'),
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-active-light',
    },
    ...resolveOptions(options),
  });
  return r?.isConfirmed;
};
export const confirmHtml = async (html?: string | SweetAlertOptions) => {
  const r = await window.Swal.fire({
    // title: '提示',
    iconHtml: '<i class="iconfont icon-zhuyizhuangtai" style="color:#ff9f22;font-size:24px"></i>',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-active-light',
    },
    html: html,
  });
  return r?.isConfirmed;
};

export const success = (options?: string | SweetAlertOptions) => {
  return window.Swal.fire({
    icon: 'success',
    iconHtml:
      '<i class="iconfont icon-chenggongzhuangtai" style="color:#02b96b;font-size:24px"></i>',
    buttonsStyling: false,
    confirmButtonText: '好的',
    customClass: {
      confirmButton: 'btn btn-success',
    },
    ...resolveOptions(options),
  });
};

export const error = (options?: string | SweetAlertOptions) => {
  return window.Swal.fire({
    icon: 'error',
    iconHtml: getIconHtml(resolveOptions(options), 'error'),
    buttonsStyling: false,
    confirmButtonText: '知道了',
    customClass: {
      confirmButton: 'btn btn-danger',
    },
    ...resolveOptions(options),
  });
};

export const exportConfirm = () =>
  confirm({
    title: '导出成功，请前往下载任务中心查看。',
    icon: 'success',
    iconHtml:
      '<i class="iconfont icon-chenggongzhuangtai" style="color:#02b96b;font-size:24px"></i>',
    confirmButtonText: '去查看',
    cancelButtonText: '知道了',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-active-light',
    },
  });

/** 异步导入/上传成功后的引导（上传任务中心） */
export const importUploadConfirm = () =>
  confirm({
    title: '异步上传中，请前往上传任务中心查看。',
    icon: 'success',
    iconHtml:
      '<i class="iconfont icon-chenggongzhuangtai" style="color:#02b96b;font-size:24px"></i>',
    confirmButtonText: '去查看',
    cancelButtonText: '知道了',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-active-light',
    },
  });

export const delConfirm = () =>
  confirm({
    title: '确定要删除吗？',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-active-light',
    },
  });
  
export const taskConfirm = (title='异步处理中，请前往任务列表查看。') =>
  confirm({
    title: title,
    icon: 'success',
    iconHtml:
      '<i class="iconfont icon-chenggongzhuangtai" style="color:#02b96b;font-size:24px"></i>',
    confirmButtonText: '去查看',
    cancelButtonText: '知道了',
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-active-light',
    },
  });
export const unbindConfirm = () => confirm('确定取消关联吗');

export const cancelConfirm = () => confirm('确定要取消吗？所有数据将会丢失～');

export const resolveConfirm = async (options?: string | SweetAlertOptions) => {
  const r = await window.Swal.fire({
    title: '请确认是否通过审核',
    iconHtml: '<i class="iconfont icon-zhuyizhuangtai" style="color:#ff9f22;font-size:24px"></i>',
    width: '36em',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '通过',
    cancelButtonText: '取消',
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-active-light',
    },
    html:
      "<div class='el-input__wrapper mt-2'><input id='resolve_remark' class='el-input__inner' type=\"text\" placeholder='请输入备注(可不填)'></div>" +
      "<div style='color: var(--el-color-danger); display: none' id='error_info'><span>请输入不超过100个字符</span></div>" +
      "<div style='margin-top: 25px;'>通过后，将发放对应的商品优惠券</div>",
    preConfirm: () => {
      const isVisible = document.getElementById('resolve_remark').value.length < 100;
      if (!isVisible) {
        document.getElementById('error_info').style.display = 'block';
      }
      return isVisible;
    },
    ...resolveOptions(options),
  });
  return r?.isConfirmed;
};

export const rejectConfirm = async (options?: string | SweetAlertOptions) => {
  const r = await window.Swal.fire({
    title: '请确认是否驳回审核',
    iconHtml: '<i class="iconfont icon-zhuyizhuangtai" style="color:#ff9f22;font-size:24px"></i>',
    width: '36em',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '驳回',
    cancelButtonText: '取消',
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-active-light',
    },
    html:
      "<div class='el-input__wrapper mt-2'><input id='reject_reason' class='el-input__inner' type=\"text\" placeholder='请输入驳回原因(可不填)'></div>" +
      "<div style='color: var(--el-color-danger); display: none' id='error_info'><span>请输入不超过100个字符</span></div>",
    preConfirm: () => {
      const isVisible = document.getElementById('reject_reason').value.length < 100;
      if (!isVisible) {
        document.getElementById('error_info').style.display = 'block';
      }
      return isVisible;
    },
    ...resolveOptions(options),
  });
  return r?.isConfirmed;
};
export const reportConfirm = async (options?: string | SweetAlertOptions) => {
  const r = await window.Swal.fire({
    title: '上报提醒',
    iconHtml: '<i class="iconfont icon-zhuyizhuangtai" style="color:#ff9f22;font-size:24px"></i>',
    width: '36em',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '确认上报',
    cancelButtonText: '取消上报',
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-active-light',
    },
    html:
      "备注：<div class='el-input__wrapper mt-2'><input id='report_reason' row='3' class='el-input__inner' type=\"textarea\" placeholder='请输入备注'></div>" +
      "<div style='color: var(--el-color-danger); display: none' id='error_info'><span>请输入不超过200个字符</span></div>",
    preConfirm: () => {
      const isVisible = document.getElementById('report_reason').value.length < 200;
      if (!isVisible) {
        document.getElementById('error_info').style.display = 'block';
      }
      return isVisible;
    },
    ...resolveOptions(options),
  });
  return r?.isConfirmed;
};
export const callBackConfirm = async (options?: string | SweetAlertOptions) => {
  const r = await window.Swal.fire({
    title: '确定打回吗？',
    iconHtml: '<i class="iconfont icon-zhuyizhuangtai" style="color:#ff9f22;font-size:24px"></i>',
    width: '36em',
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-active-light',
    },
    html:
      "打回原因：<div class='el-input__wrapper mt-2'><input id='callBack_reason' row='3' class='el-input__inner' type=\"textarea\" placeholder='请输入打回原因'></div>" +
      "<div style='color: var(--el-color-danger); display: none' id='error_info'><span>请输入不超过200个字符</span></div>",
    preConfirm: () => {
      const isVisible = document.getElementById('callBack_reason').value.length < 200;
      if (!isVisible) {
        document.getElementById('error_info').style.display = 'block';
      }
      return isVisible;
    },
    ...resolveOptions(options),
  });
  return r?.isConfirmed;
};
