// 获取图标
export const getSvgIcon = (row) => {
  let { extType } = row;
  if (row.fileType === 1) {
    extType = 'folder';
  }
  const svgIconMap = {
    folder: 'folder',
    pic: 'pic',
    pdf: 'pdf',
    word: 'word',
    excel: 'excel',
    txt: 'txt',
    ppt: 'ppt',
    video: 'video',
    default: 'defaultFile',
  };
  if (['jpg', 'jpeg', 'png', 'svg'].includes(extType)) {
    return svgIconMap.pic;
  }
  if (extType === 'pdf') {
    return svgIconMap.pdf;
  }
  if (['xls', 'xlsx'].includes(extType)) {
    return svgIconMap.excel;
  }
  if (['doc', 'docx'].includes(extType)) {
    return svgIconMap.word;
  }
  if (['ppt', 'pptx'].includes(extType)) {
    return svgIconMap.ppt;
  }
  if (['txt'].includes(extType)) {
    return svgIconMap.txt;
  }
  if (['folder'].includes(extType)) {
    return svgIconMap.folder;
  }
  if (
    ['mp4', 'mpeg', 'avi', 'asf', 'mov', 'wmv', '3gp', 'rm', 'rmvb', 'flv', 'f4v'].includes(extType)
  ) {
    return svgIconMap.video;
  }

  return svgIconMap.default;
};
export const a = 1;
