const defaultDiscount = ['10%', '15%', '20%', '25%', '30%'];
export function queryDiscountSearch(qs: string, cb: any) {
  const result = defaultDiscount
    .filter((item) => String(item).startsWith(qs))
    .map((item) => ({
      value: item,
      label: item,
    }));
  cb(result);
}

export default {};
