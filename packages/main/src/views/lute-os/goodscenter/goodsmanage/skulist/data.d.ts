export type dickBean = {
  desc: string;
  value: string;
};
export interface IDickbook {
  product_shop?: dickBean[];
  shop_platform?: dickBean[];
  product_channel?: dickBean[];
  product_site?: dickBean[];
  product_saletype?: dickBean[];
  product_activity?: dickBean[];
  supplier_list?: dickBean[];
  currency_list?: dickBean[];
  deptMember_list: dickBean[];
  sensitiveTypeBeanList: dickBean[];
}
