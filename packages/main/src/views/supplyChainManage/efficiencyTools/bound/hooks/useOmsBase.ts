import { memberApi, omsApi } from '@/api';

export const enum poolStatus {
  enable = 1,
  disable = 0,
}
export const useOmsBase = () => {
  const warehouseMap = ref();
  const dickBook: any = ref({
    oms_other_out_bound_outbound_method: [],
    oms_other_out_bound_inventory_type: [],
    oms_other_out_bound_operation_type: [],
    oms_other_in_bound_operation_type: [],
  });
  const poolMap = ref();
  const poolMapByWareHouse = ref();
  const memberList = ref();
  /**
   * 获取字典的接口
   */
  const getDicMap = async () => {
    try {
      // const res = await platformApi.platformDict({
      //   dictCodes: ['oms_other_out_bound_outbound_method','oms_other_out_bound_operation_type','oms_other_out_bound_inventory_type','logistics_channel'],
      // });
      dickBook.value.oms_other_out_bound_outbound_method = [
        {
          value: 'FIFO',
          desc: '先进先出',
        },
      ];
      dickBook.value.oms_other_out_bound_operation_type = [
        {
          value: '备品',
          desc: '备品',
        },
        {
          value: '透明标',
          desc: '透明标等物料类（无成本）',
        },
        {
          value: '聚水潭',
          desc: '聚水潭',
        },
        {
          value: '盘点出库',
          desc: '盘点出库',
        },
        {
          value: '报废出库',
          desc: '报废出库',
        },
      ];
      dickBook.value.oms_other_in_bound_operation_type = [
        {
          value: '备品',
          desc: '备品',
        },
        {
          value: '透明标',
          desc: '透明标等物料类（无成本）',
        },
        {
          value: '出库加工',
          desc: '出库加工',
        },
        {
          value: '销售出库单退货入库',
          desc: '销售出库单退货入库',
        },
        {
          value: '聚水潭',
          desc: '聚水潭',
        },
        {
          value: '盘点入库',
          desc: '盘点入库',
        },
        {
          value: '截单失败',
          desc: '截单失败',
        },
      ];
      dickBook.value.oms_other_out_bound_inventory_type = [
        {
          value: 'bad',
          desc: '次品出库',
        },
        {
          value: 'normal',
          desc: '良品出库',
        },
      ];
      dickBook.value.oms_other_in_bound_inventory_type = [
        {
          value: 'bad',
          desc: '次品入库',
        },
        {
          value: 'normal',
          desc: '良品入库',
        },
        {},
      ];
    } catch (e) {
      console.log(e);
    }
  };
  /**
   * 获取所有自营仓
   */
  type WarehouseType = 'SELF' | 'PLATFORM' | 'THIRD' | 'ALL' | undefined;
  const getWarehouseMap = async (
    type: WarehouseType = 'SELF',
    options: {
      status?: number;
      centerWarehouse?: number;
    }
  ) => {
    let warehouseType = type;
    if (type === 'ALL') {
      warehouseType = undefined;
    }
    const res = await omsApi.omsCommonWarehouseList({
      warehouseType,
      status: options?.status ? options?.status : undefined,
      centerWarehouse: options?.centerWarehouse ? options?.centerWarehouse : undefined,
    });
    warehouseMap.value = res;
  };
  /**
   * 获取的所有分配池
   */

  const getPoolMap = async (status?: poolStatus) => {
    const res = await omsApi.omsCommonStockQueryPool({
      ...(status !== undefined && { status }),
    });
    poolMap.value = res;
  };

  const getPoolMapByWareHouse = async ({ status = undefined as any, warehouseCode }) => {
    const res = await omsApi.omsCommonStockQueryPool({
      ...(status !== undefined && { status }),
      ...(warehouseCode !== undefined && { warehouseCode }),
    });
    poolMapByWareHouse.value = res;
  };
  /**
   * 获取所有的用户
   */
  const initMember = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    memberList.value = res.all_dept;
  };
  onMounted(async () => {
    getDicMap();
  });
  return {
    warehouseMap,
    getWarehouseMap,
    dickBook,
    poolMap,
    getPoolMap,
    getDicMap,
    memberList,
    initMember,
    poolMapByWareHouse,
    getPoolMapByWareHouse,
  };
};
