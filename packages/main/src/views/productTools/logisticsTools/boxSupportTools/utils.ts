import { erpApi } from '@/api';
import { PackageMarkListQueryResp } from '@/api/erp/data-contracts';

export const queryPackageMark = async (code: string, tableRef, canEdit?: boolean) => {
  const res = (await erpApi.luteosErpPackageQueryPackageMark({
    recordCode: code,
  })) as PackageMarkListQueryResp;
  const list: any = [];
  const { palletPackageDetailList = [] } = res;
  const extraData = [
    {
      sku: '',
      skuShowDesc: '',
      qty: '毛重(Kg)',
      isExtraData: true,
    },
    {
      sku: '',
      skuShowDesc: '',
      qty: '长(cm)',
      isExtraData: true,
    },
    {
      sku: '',
      skuShowDesc: '',
      qty: '宽(cm)',
      isExtraData: true,
    },
    {
      sku: '',
      skuShowDesc: '',
      qty: '高(cm)',
      isExtraData: true,
    },
  ];
  palletPackageDetailList.map((i, index) => {
    const item: any = {};
    const extraDataList = [
      {
        data: i.boxWeightList,
        key: 'grossWeight',
      },
      {
        data: i.boxLengthList,
        key: 'length',
      },
      {
        data: i.boxWidthList,
        key: 'width',
      },
      {
        data: i.boxHeightList,
        key: 'height',
      },
    ];
    item.customerName = i.titleProperty?.customerName;
    item.orderCode = i.titleProperty?.orderCode;
    item.referenceCode = i.titleProperty?.referenceCode;
    item.totalBox = i.titleProperty?.totalBox;
    item.billCode = i.billCode ?? '';
    item.skuDescList = [];
    extraDataList.map((v, idx) => {
      v.data?.map((box) => {
        extraData[idx][`boxNumber${box.boxNumber}-${index}`] = box[v.key];
        return box;
      });
      return v;
    });

    i.itemList?.map((v: any) => {
      const skuItem: any = {};
      const totalBox = v.boxItemList?.length;
      skuItem.sku = v.sku;
      skuItem.skuShowDesc = v.productName;
      skuItem.qty = v.qty;
      skuItem.productName = v.productName;
      item.skuDescList.push(skuItem);
      tableRef?.sureBoxNumber(totalBox, canEdit, index);
      v.boxItemList?.map((c) => {
        skuItem[`boxNumber${c.boxNumber}-${index}`] = c.boxPackageQty;
        return c;
      });
      return v;
    });
    item.skuDescList = [...(item.skuDescList || []), ...extraData];
    list.push(item);
    return i;
  });
  return list;
};

export const queryCombinePackPackageMark = async (code: string, tableRef, canEdit?: boolean) => {
  const res = (await erpApi.luteosErpPackageQueryPackageMark({
    recordCode: code,
  })) as PackageMarkListQueryResp;
  const list: any = [];
  const { palletPackageDetailList = [] } = res;
  list.totalBox = palletPackageDetailList[0]?.titleProperty?.totalBox;
  tableRef?.sureBoxNumber(palletPackageDetailList[0].titleProperty?.totalBox, canEdit);
  const extraData = [
    {
      sku: '',
      skuShowDesc: '',
      qty: '毛重(Kg)',
      isExtraData: true,
    },
    {
      sku: '',
      skuShowDesc: '',
      qty: '长(cm)',
      isExtraData: true,
    },
    {
      sku: '',
      skuShowDesc: '',
      qty: '宽(cm)',
      isExtraData: true,
    },
    {
      sku: '',
      skuShowDesc: '',
      qty: '高(cm)',
      isExtraData: true,
    },
  ];
  palletPackageDetailList.forEach((i, index) => {
    const extraDataList = [
      {
        data: i.boxWeightList,
        key: 'grossWeight',
      },
      {
        data: i.boxLengthList,
        key: 'length',
      },
      {
        data: i.boxWidthList,
        key: 'width',
      },
      {
        data: i.boxHeightList,
        key: 'height',
      },
    ];
    extraDataList.map((v, idx) => {
      v.data?.map((box) => {
        extraData[idx][`boxNumber${box.boxNumber}`] = box[v.key];
        return box;
      });
      return v;
    });
    i.itemList?.map((v: any) => {
      const skuItem: any = {};
      skuItem.sku = v.sku;
      skuItem.productName = v.productName;
      skuItem.qty = v.qty;
      skuItem.customerName = v.customerName;
      skuItem.orderCode = v.orderCode;
      skuItem.referenceCode = v.referenceCode;
      skuItem.billCode = v.billCode ?? '';
      v.boxItemList?.map((c) => {
        skuItem[`boxNumber${c.boxNumber}`] = c.boxPackageQty;
        return c;
      });
      list.push(skuItem);
      return v;
    });
    return i;
  });
  list.push(...extraData);
  return list;
};
