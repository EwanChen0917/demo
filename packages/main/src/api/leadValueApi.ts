import { commonApi, ContentType } from '@/api';
import type { RequestParams } from '@/api';

export interface LeadAttachmentInput {
  ossKey: string;
  name: string;
}

export interface LeadAttachment {
  ossKey: string;
  name: string;
  url?: string;
}

export interface LeadSubmitReq {
  demandName: string;
  demandType: string;
  bizLine: string;
  urgency: string;
  expectDeliveryTime: string;
  impactPeopleRange: string;
  demandBackground: string;
  demandContent: string;
  demandValue: string;
  attachments?: LeadAttachmentInput[];
}

export interface LeadSubmitResp {
  leadCode: string;
}

export interface LeadListReq {
  keyword?: string;
  demandTypeList?: string[];
  bizLineList?: string[];
  nodeList?: string[];
  subStatusList?: string[];
  onlyMine?: boolean;
  pageNum: number;
  pageSize: number;
}

export interface LeadListItem {
  leadCode: string;
  demandName: string;
  demandType: string;
  bizLine: string;
  deptPath?: string;
  bizLineDeptOwnerName?: string;
  urgency: string;
  node: string;
  nodeName: string;
  subStatus: string;
  subStatusName: string;
  rating?: string;
  bpOwner?: string;
  bpOwnerName?: string;
  productManager?: string;
  productManagerName?: string;
  creatorName: string;
  createTime: string;
  hasAssessment: boolean;
}

export interface LeadListResp {
  total?: number;
  records: LeadListItem[];
}

export interface LeadBasicInfo {
  demandName?: string;
  demandType?: string;
  bizLine?: string;
  deptPath?: string;
  urgency?: string;
  expectDeliveryTime?: string;
  impactPeopleRange?: string;
  demandBackground?: string;
  demandContent?: string;
  demandValue?: string;
  attachments?: LeadAttachment[];
  creatorName?: string;
  deptName?: string;
  createTime?: string;
}

export interface ProcessStep {
  stepCode: string;
  stepName: string;
  stepStatus: 'done' | 'in_progress' | 'pending';
  transferredAt?: string;
}

export interface ReviewInfo {
  rating?: string;
  reviewConclusion?: string;
  reviewOpinion?: string;
  bpOwner?: string;
  bpOwnerName?: string;
  productManager?: string;
  productManagerName?: string;
  bpConfirmRemark?: string;
  reviewedAt?: string;
}

export interface AssessmentInfo {
  assessmentStatus?: number;
  assessmentMarkdown?: string;
  assessmentErrorMsg?: string;
}

export interface LeadDetailByClueCodeItem {
  clueCode?: string;
  createTime?: string;
  currentStatusName?: string;
  devOwner?: string;
  devOwnerName?: string;
  leadCode?: string;
  leadName?: string;
  productManager?: string;
  productManagerName?: string;
  projectName?: string;
  workItemId?: number;
  workItemName?: string;
}

export interface LeadDetailByClueCodeResp {
  records: LeadDetailByClueCodeItem[];
  total?: number;
}

export interface LeadDetailResp {
  leadCode?: string;
  node?: string;
  nodeName?: string;
  subStatus?: string;
  subStatusName?: string;
  canBpAction?: boolean;
  basicInfo?: LeadBasicInfo;
  processSteps?: ProcessStep[];
  reviewInfo?: ReviewInfo;
  assessment?: AssessmentInfo;
}

export interface LeadReviewReq {
  leadCode: string;
  rating: string;
  reviewConclusion: string;
  productLineOwner?: string;
  reviewOpinion: string;
}

export interface LeadReviewResp {
  newNode?: string;
  newSubStatus?: string;
}

export interface LeadBpTransferReq {
  leadCode: string;
  newBpOwner: string;
  reason?: string;
}

export interface LeadBpConfirmReq {
  leadCode: string;
  productManager: string;
  remark?: string;
}

export interface LeadBpActionResp {
  newNode?: string;
  newSubStatus?: string;
  bpOwner?: string;
  productManager?: string;
}

export interface StartAssessmentReq {
  leadCode: string;
  forceRefresh?: boolean;
}

export interface StartAssessmentResp {
  assessmentStatus?: number;
  assessmentMarkdown?: string;
  errorMsg?: string;
}

export interface LeadDeptMappingListReq {
  deptId?: number | null;
  pageNum: number;
  pageSize: number;
}

export interface LeadDeptMappingItem {
  id: number;
  deptId: number;
  deptName?: string;
  deptOwner?: string;
  deptOwnerName?: string;
  bpMember?: string;
  bpMemberName?: string;
  midPlatformMember?: string;
  midPlatformMemberName?: string;
  bpOwner?: string;
  bpOwnerName?: string;
  bizDomains?: string;
  bizDomainList?: string[];
  updateTime?: string;
}

export interface LeadDeptMappingListResp {
  total?: number;
  records: LeadDeptMappingItem[];
}

export interface LeadDeptMappingSaveReq {
  id?: number | null;
  deptId: number;
  bpMember?: string;
  midPlatformMember?: string;
  bpOwner?: string;
  bizDomainList?: string[];
}

export interface LeadDeptMappingSaveResp {
  id: number;
}

export interface LeadOperationLogItem {
  createTime?: string;
  operator?: string;
  operatorName?: string;
  operationType?: string;
  content?: string;
}

export interface LeadOperationLogResp {
  records: LeadOperationLogItem[];
}

export const leadValueApi = {
  submitLead(body: LeadSubmitReq, params?: RequestParams) {
    return commonApi.request<LeadSubmitResp>({
      path: '/api/platform/demand/leadValue/submitLead',
      method: 'POST',
      body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  },

  list(query: LeadListReq, params?: RequestParams) {
    return commonApi.request<LeadListResp>({
      path: '/api/platform/demand/leadValue/list',
      method: 'GET',
      query,
      format: 'json',
      ...params,
    });
  },

  leadDetail(leadCode: string, params?: RequestParams) {
    return commonApi.request<LeadDetailResp>({
      path: '/api/platform/demand/leadValue/leadDetail',
      method: 'GET',
      query: { leadCode },
      format: 'json',
      ...params,
    });
  },

  review(body: LeadReviewReq, params?: RequestParams) {
    return commonApi.request<LeadReviewResp>({
      path: '/api/platform/demand/leadValue/review',
      method: 'POST',
      body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  },

  bpTransfer(body: LeadBpTransferReq, params?: RequestParams) {
    return commonApi.request<LeadBpActionResp>({
      path: '/api/platform/demand/leadValue/bpTransfer',
      method: 'POST',
      body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  },

  bpConfirm(body: LeadBpConfirmReq, params?: RequestParams) {
    return commonApi.request<LeadBpActionResp>({
      path: '/api/platform/demand/leadValue/bpConfirm',
      method: 'POST',
      body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  },

  startAssessment(leadCode: string, forceRefresh?: boolean, params?: RequestParams) {
    return commonApi.request<StartAssessmentResp>({
      path: '/api/platform/demand/leadValue/startAssessment',
      method: 'POST',
      body: { leadCode, forceRefresh: forceRefresh ?? true },
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  },

  deptMappingList(query: LeadDeptMappingListReq, params?: RequestParams) {
    return commonApi.request<LeadDeptMappingListResp>({
      path: '/api/platform/demand/leadValue/deptMapping/list',
      method: 'GET',
      query,
      format: 'json',
      ...params,
    });
  },

  deptMappingSave(body: LeadDeptMappingSaveReq, params?: RequestParams) {
    return commonApi.request<LeadDeptMappingSaveResp>({
      path: '/api/platform/demand/leadValue/deptMapping/save',
      method: 'POST',
      body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  },

  deptMappingDelete(id: number, params?: RequestParams) {
    return commonApi.request<void>({
      path: '/api/platform/demand/leadValue/deptMapping/delete',
      method: 'POST',
      query: { id },
      format: 'json',
      ...params,
    });
  },

  operationLogs(leadCode: string, params?: RequestParams) {
    return commonApi.request<LeadOperationLogResp>({
      path: '/api/platform/demand/leadValue/operationLogs',
      method: 'GET',
      query: { leadCode },
      format: 'json',
      ...params,
    });
  },

  leadDetailByClueCode(clueCode: string, params?: RequestParams) {
    return commonApi.request<LeadDetailByClueCodeResp>({
      path: '/api/platform/demand/leadValue/leadDetailByClueCode',
      method: 'GET',
      query: { clueCode },
      format: 'json',
      ...params,
    });
  },
};
