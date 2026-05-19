// 上传状态
export enum uploadStatus {
  未开始 = '0',
  上传中 = '1',
  上传成功 = '2',
  上传失败 = '3',
  异常确认 = '4',
}

export const uploadStatusMap = {
  [uploadStatus.未开始]: '未开始',
  [uploadStatus.上传中]: '上传中',  
  [uploadStatus.上传成功]: '上传成功',
  [uploadStatus.上传失败]: '上传失败',
  [uploadStatus.异常确认]: '异常确认',
};

// 生成状态
export enum generateFinalStatementStatus {
  未开始 = '0',
  生成中 = '1',
  生成成功 = '2',
  生成失败 = '3',
}

export const generateFinalStatementStatusMap = {
  [generateFinalStatementStatus.未开始]: '未开始',
  [generateFinalStatementStatus.生成中]: '生成中',
  [generateFinalStatementStatus.生成成功]: '生成成功',
  [generateFinalStatementStatus.生成失败]: '生成失败',
};

export const progressStatusMap = {
  '0': undefined,
  '1': undefined,
  '2': 'success',
  '3': 'exception',
  '4': 'warning',
};

export const uploadStatusList = [
  {
    status: uploadStatus.未开始,
    code: 'waitUpload',
    label: '待上传',
    color: '#818692',
    bgColor: '#fbfbfb',
  },
  {
    status: uploadStatus.上传中,
    code: 'uploading',
    label: '上传中',
    color: '#75a3f4',
    bgColor: '#eff6ff',
  },
  {
    status: uploadStatus.上传失败,
    code: 'uploadFail',
    label: '上传失败',
    color: '#ef6868',
    bgColor: '#fef2f2',
  },
  {
    status: uploadStatus.异常确认,
    code: 'abnormalConfirm',
    label: '异常确认',
    color: '#f68641',
    bgColor: '#fff9dd',
  },
];

export const generateFinalStatementStatusList = [
  {
    status: generateFinalStatementStatus.生成中,
    code: 'generaling',
    label: '生成中',
    color: '#8989f0',
    bgColor: '#eef2fe',
  },
  {
    status: generateFinalStatementStatus.生成失败,
    code: 'generalFail',
    label: '生成失败',
    color: '#f68641',
    bgColor: '#fff7ee',
  },
  {
    status: generateFinalStatementStatus.生成成功,
    code: 'generateSuccess',
    label: '生成完成',
    color: '#50cf7e',
    bgColor: '#f1fdf4',
  },
];
