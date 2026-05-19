import { dataApi, erpApi } from "@/api"

export const useBaseThirdStockOptions = () => {
    const warehouseOptions = ref<any>([])
    const getWarehouseOptions = async () => {
        const res = await dataApi.luteosDataQueryLuteWarehouse({
            pageSize: 1000,
            pageNum: 1,
            status:1
        })
        warehouseOptions.value = res?.warehouseList?.map((item: any) => ({
            label: item.warehouseDesc,
            value: item.warehouseCode,
        }))
    }
    return {
        warehouseOptions,
        getWarehouseOptions,
    }
}