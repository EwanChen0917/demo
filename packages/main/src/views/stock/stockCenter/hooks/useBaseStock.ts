import { cisApi, erpApi } from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const useBaseStock = () => {
  const poolMap = ref<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const activePoolMap = ref<any>([]);
  const getActivePoolMap = async (level: string, filter = false) => {
    const res = await cisApi.cisPoolValidList(level);
    if (filter) {
      // console.log(`开始过滤掉不为instock的`);
      activePoolMap.value = res
        .filter((e) => {
          return e.type === 'IN_STOCK';
        })
        .map((e) => {
          return {
            label: `${e.poolName}_${e.poolCode}`,
            value: e.poolCode,
            level: e.level,
          };
        });
    } else {
      activePoolMap.value = res.map((e) => {
        return {
          label: `${e.poolName}_${e.poolCode}`,
          value: e.poolCode,
          level: e.level,
        };
      });
    }
  };
  const warehouseMap = ref<any>([]);
  const getWarehouseMap = async () => {
    const res = await erpApi.luteosErpWarehouseQueryList({
      pageNum: 1,
      pageSize: 1000,
    });
    warehouseMap.value = res?.warehouseList?.map((e) => {
      return {
        label: `${e.warehouseDesc}_${e.warehouseCode}`,
        value: e.warehouseCode,
      };
    });
  };
  const warehouseTreeData = ref<any>([]);
  const getWarehouseTreeData = async () => {
    const res = await erpApi.luteosErpWarehouseQueryCascadeTree({});
    const treeList = Array.isArray(res) ? res : [];
    const formatLevel3Label = (node: any) => {
      const baseLabel = node?.label ?? '';
      const warehouseCode = node?.warehouseCode ?? '';
      if (!warehouseCode) {
        return String(baseLabel);
      }
      if (!baseLabel) {
        return String(warehouseCode);
      }
      return `${baseLabel}_${warehouseCode}`;
    };
    warehouseTreeData.value = treeList
      .map((level1) => {
        const level2List = (level1?.children || [])
          .map((level2) => {
            const level3List = (level2?.children || []).map((level3) => {
              return {
                ...level3,
                label: formatLevel3Label(level3),
              };
            });
            return {
              ...level2,
              children: level3List,
            };
          })
          .filter((level2) => {
            return Array.isArray(level2?.children) && level2.children.length > 0;
          });
        return {
          ...level1,
          children: level2List,
        };
      })
      .filter((level1) => {
        return Array.isArray(level1?.children) && level1.children.length > 0;
      });
  };
  onMounted(() => {});
  return {
    activePoolMap,
    getActivePoolMap,
    warehouseMap,
    getWarehouseMap,
    warehouseTreeData,
    getWarehouseTreeData,
  };
};
