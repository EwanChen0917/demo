<template>
  <el-dialog :model-value="visible" @close="close" width="1650px" top="1vh">
    <template #header><h2>选择订单</h2></template>
    <el-space alignment="normal">
      <div>
        <el-form :inline="true" :model="search">
          <el-form-item label="客户名称" prop="customerName">
            <el-select v-model="search.customerName" clearable filterable>
              <el-option
                v-for="item in customerList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="参考单号" prop="referenceCode">
            <el-input v-model="search.referenceCode" clearable />
          </el-form-item>
          <el-form-item label="发货仓库" prop="warehouseCode">
            <el-select
              style="width: 120px"
              v-model="search.warehouseCode"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="item in warehouseList"
                :key="item.warehouseCode"
                :label="item.warehouseDesc"
                :value="item.warehouseCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              v-model="(search as any).createTime"
              value-format="YYYY-MM-DD"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="物流审核时间" prop="logisticsAuditTime">
            <el-date-picker
              v-model="(search as any).logisticsAuditTime"
              value-format="YYYY-MM-DD"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="创建人" prop="creator">
            <el-select
              style="width: 120px"
              v-model="search.creator"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="person of creatorList"
                :key="person.value"
                :label="person.label"
                :value="person.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="runQuery">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-table
            max-height="400px"
            ref="tableRef"
            class-name="table-row-dashed"
            v-loading="listLoading"
            :data="listData?.orderList"
            row-key="id"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" reserve-selection />
            <el-table-column label="序号">
              <template #default="{ $index }">
                {{ pageSize * (current - 1) + $index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="referenceCode" label="参考号" width="160" />
            <el-table-column prop="orderCode" label="订单号" />
            <el-table-column prop="customerName" label="客户名称" />
            <el-table-column prop="skuDescList" width="160" label="sku*数量">
              <template #default="{ row }">
                <template v-if="row?.skuDescList?.length">
                  <div v-for="item in row.skuDescList" :key="item.sku">
                    {{ item.sku }}*{{ item.qty }}
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="warehouseDesc" label="发货仓库" />
            <el-table-column prop="skuDescList" label="仓库配送" width="160">
              <template #default="{ row }">
                <template v-if="row?.skuDescList?.length">
                  <div v-for="item in row.skuDescList" :key="item.sku">
                    {{ `${item.shippingCode}[${item.shippingDesc}]` }}
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="logisticsAuditTime" label="物流审核时间" />
            <el-table-column prop="creatorName" label="创建人" />
          </el-table>
          <KeenPagination
            :current="current"
            :page-size="pageSize"
            :page-size-option="pageSizeOption"
            :total="total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <el-card class="select-list">
        <template #header>
          <div class="card-header">
            <div>已选订单</div>
            <el-button @click="clearAll" :bg="false" text type="primary">一键清除</el-button>
          </div>
        </template>
        <div class="select-list-body">
          <div v-for="item in selectList" :key="item.id" class="select-list-item">
            <div>{{ item.referenceCode }}-{{ item.orderCode }}</div>
            <el-icon @click="delOneOrder(item)" size="16" class="select-list-close-icon">
              <Close />
            </el-icon>
          </div>
        </div>

        <template #footer>
          <div class="card-footer-btn">
            <el-button @click="packingInspection(1)" type="primary">单独装箱</el-button>
            <el-button @click="packingInspection(2)" type="primary">合并装箱</el-button>
          </div>
        </template>
      </el-card>
    </el-space>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, type TableInstance } from 'element-plus';
  import { dataApi, ErpApi, erpApi, memberApi } from '@/api';
  import { WarehouseBean } from '@/api/data/data-contracts';
  import { ClientListItem, PackageChooseSourceOrderListResp } from '@/api/erp/data-contracts';
  import useList from '@/hooks/list/useList';
  import { onMounted } from 'vue';
  import { useCache } from '@/hooks/web/useCache';

  const PAGE_SIZE = 10;
  const { wsCache } = useCache('localStorage');
  const tableRef = ref<TableInstance>();
  const customerList = ref<ClientListItem[]>([]);
  const warehouseList = ref<WarehouseBean[] | undefined>([]);
  const creatorList = ref<{ label: string | undefined; value: string | undefined }[]>([]);
  const selectList = ref<any[]>([]);
  const router = useRouter();
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    runQuery,
  } = useList<
    ErpApi.LuteosErpPackageQuerySourceOrderList.RequestBody,
    PackageChooseSourceOrderListResp
  >({
    searchDefaults: {
      customerName: '',
      creator: '',
      referenceCode: '',
      warehouseCode: '',
      createTime: undefined,
      logisticsAuditTime: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPackageQuerySourceOrderList,
    interceptSearchData: (searchData) => {
      const newDate: {
        createTime?: string[];
        logisticsAuditTime?: string[];
      } & typeof searchData = {
        ...searchData,
      };
      if (newDate.createTime?.length) {
        newDate.createTimeStart = newDate?.createTime[0];
        newDate.createTimeEnd = newDate?.createTime[1];
      } else {
        delete newDate.createTimeStart;
        delete newDate.createTimeEnd;
      }
      if (newDate.logisticsAuditTime?.length) {
        newDate.logisticsAuditTimeStart = newDate?.logisticsAuditTime[0];
        newDate.logisticsAuditTimeEnd = newDate?.logisticsAuditTime[1];
      } else {
        delete newDate.logisticsAuditTimeStart;
        delete newDate.logisticsAuditTimeEnd;
      }
      return newDate;
    },
  });
  const props = withDefaults(
    defineProps<{
      visible: boolean;
    }>(),
    {
      visible: false,
    }
  );
  onMounted(() => {
    init();
  });
  const emit = defineEmits<{
    (e: 'close', route: any): void;
  }>();
  const init = () => {
    queryCustomerList();
    getWarehouseList();
    getCreatorList();
  };
  const queryCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerList.value = res?.recordList || [];
  };
  const getWarehouseList = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      pageNum: 1,
      pageSize: 1000,
      filterFBA: true,
    });
    warehouseList.value = res?.warehouseList;
  };
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const handleSelectionChange = (list) => {
    selectList.value = [...list];
  };
  const delOneOrder = (item) => {
    if (listData?.value?.orderList) {
      tableRef.value?.toggleRowSelection(item, false);
    }
  };
  const close = (payload: any = false) => {
    tableRef.value?.clearSelection();
    emit('close', payload);
  };
  const clearAll = () => {
    tableRef.value?.clearSelection();
  };
  /**
   * 装箱
   * @param packageType 1-单独装箱 2-合并装箱
   */
  const packingInspection = async (packageType: 1 | 2) => {
    if (selectList.value.length === 0) {
      return ElMessage.error('请选择订单');
    }
    wsCache.delete('recordCode');
    wsCache.set('packageType', packageType);
    // 单独装箱
    if (packageType === 1) {
      const route = {
        path: '/boxSupportTools/selectOrderPacking',
        query: { id: selectList.value.map((item) => item.id).join(',') },
      };
      close(route);
      return null;
    }
    // 合并装箱校验
    const res = await erpApi.luteosErpPackageCheckOrderList({
      orderIdList: selectList.value.map((item) => item.id),
    });
    if (res) {
      const route = {
        path: '/boxSupportTools/combinePack',
        query: { id: selectList.value.map((item) => item.id).join(',') },
      };
      close(route);
      return null;
    }
    return ElMessage.error('装箱操作失败');
  };
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        runQuery();
      }
    }
  );
</script>

<style scoped lang="scss">
  .select-list {
    width: 340px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 10px;
      border: 1px solid #f4f4f4;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    &-close-icon {
      cursor: pointer;
    }
  }
  .select-list-body {
    height: 460px;
    overflow-y: auto;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .card-footer-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  :deep(.el-card__body) {
    padding: 10px !important;
  }
</style>
