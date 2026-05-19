export const useProductTypeLabel = () => {
  const renderProductType = (productType?: string, productTypeCode?: string | number) => {
    const code = productTypeCode != null ? String(productTypeCode) : '';
    if (code === '0') return '其它';
    return productType || code || '--';
  };

  return { renderProductType };
};
