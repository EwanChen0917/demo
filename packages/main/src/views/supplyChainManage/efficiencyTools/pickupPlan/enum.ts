export enum PickupStatus {
  /** 新建 */
  new = 'new',
  /** 待供应商确认 */
  pending_supplier_confirm = 'pending_supplier_confirm',
  /** 供应商拒绝 */
  supplier_rejected = 'supplier_rejected',
  /** 待计划确认 */
  // pending_plan_confirm = 'pending_plan_confirm',
  /** 计划拒绝 */
  // plan_rejected = 'plan_rejected',
  /** 部分确认 */
  // partially_confirmed = 'partially_confirmed',
  /** 全部确认 */
  fully_confirmed = 'fully_confirmed',
  /** 已完成 */
  completed = 'completed',
  /** 已关闭 */
  closed = 'closed',
  
}
export enum PoOrderStatus {
  /**
   * 新建
   */
  NEW = "0",
  /**
   * 待供应商答复
   */
  WAIT_SUPPLIER_REPLY = "1",
  /**
   * 待采购确认
   */
  WAIT_PURCHASE_CONFIRM = "2",
  /**
   * 采购已确认
   */
  PURCHASE_CONFIRMED = "3",
  /**
   * 已关闭
   */
  CLOSED = "4",
}

export const PickupStatusMap: Record<PickupStatus, string> = {
  [PickupStatus.new]: '新建',
  [PickupStatus.pending_supplier_confirm]: '待供应商确认',
  [PickupStatus.supplier_rejected]: '供应商拒绝',
  // [PickupStatus.pending_plan_confirm]: '待计划确认',
  // [PickupStatus.plan_rejected]: '计划拒绝',
  [PickupStatus.fully_confirmed]: '已确认',
  [PickupStatus.completed]: '已完成',
  [PickupStatus.closed]: '已关闭',
};


export const PoOrderStatusMap: Record<PoOrderStatus, string> = {
  [PoOrderStatus.NEW]: '新建',
  [PoOrderStatus.WAIT_SUPPLIER_REPLY]: '待供应商答复',
  [PoOrderStatus.WAIT_PURCHASE_CONFIRM]: '供应商已拒绝',
  [PoOrderStatus.PURCHASE_CONFIRMED]: '已确认',
  [PoOrderStatus.CLOSED]: '已关闭',
};