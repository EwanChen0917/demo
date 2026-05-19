// eslint-disable-next-line import/prefer-default-export
export const enum TransferPlanOrderStatus {
  Add = 'add',
  Created = 'created',
  PendingAudit = 'pending_audit',
  Audited = 'audited',
  Void = 'void',
}

export const enum TransferPlanOrderImportScene {
  List = 'transfer_plan_order_list_import',
  Detail = 'transfer_plan_order_detail_audit_import',
}

export const enum TransferPlanPerson {
  system = '系统',
  '系统' = 'transfer_plan_stockout_job',
}
