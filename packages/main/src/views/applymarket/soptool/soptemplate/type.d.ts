export interface FormData {
  createTime?: string;
  creator?: string;
  templateCode?: '';
  templateDesc: '';
  templateName: '';
  stepList: StepData[];
  updateTime?: string;
  creatorName: null | string;
  remark: string;
}
export interface StepData {
  createTime?: string;
  desc: string;
  image: string;
  remark?: string;
  sort: number;
  stepCode?: string;
  templateCode?: string;
  title: string;
  updateTime?: string;
}
