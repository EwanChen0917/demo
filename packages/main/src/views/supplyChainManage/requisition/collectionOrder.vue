<template>
  <div>
    <!-- 领用订单页面组件 -->
    <div class="tabs-section">
      <el-radio-group v-model="search.status" size="small" fill="#fff">
        <template v-for="item in tabStatusList" :key="item.status">
          <el-radio-button :value="item.status">
            <span>{{ item.statusName }}</span>
            <span class="tab-count">({{ listData?.statistics?.[item.code] }})</span>
          </el-radio-button>
          <div class="gap"></div>
        </template>
      </el-radio-group>
    </div>
    <KeenList
      :resetBtnOptions="{ size: 'small' }"
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          size="small"
          v-model="search.keyword"
          clearable
          placeholder="领用单号/OA申请单号/仓配单号/自发货订单号/跟踪单号"
          class="w-450px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <DeptMember
          size="small"
          v-model="search.creator"
          placeholder="创建人"
          filterable
          clearable
        />
        <DeptMember
          size="small"
          v-model="search.requisitioner"
          placeholder="领用人"
          filterable
          clearable
        />
        <el-tree-select
          size="small"
          ref="catTreeSelectRef"
          placeholder="领用部门"
          v-model="search.requisitionDept"
          :data="deptTree"
          filterable
          clearable
          check-strictly
          popper-class="picker-cat-tree-select"
          highlight-current
        />
        <el-select
          size="small"
          style="width: 160px"
          v-model="search.warehouseCode"
          placeholder="发货仓库"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="warehouse of warehouseMap"
            :key="warehouse.value"
            :label="warehouse.desc"
            :value="warehouse.value"
          />
        </el-select>
        <el-select size="small" v-model="search.deliveryCode" placeholder="发货方式" clearable>
          <el-option :value="1" label="FBA" />
          <el-option :value="2" label="中仓直发" />
          <el-option :value="3" label="海外仓直发" />
        </el-select>
        <el-date-picker
          size="small"
          v-model="search.time"
          type="daterange"
          range-separator="-"
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
          value-format="YYYY-MM-DD"
        />
      </template>
      <template #buttons>
        <el-button type="primary" @click="add" v-permission="'requisitionAdd'">
          新增领用订单
        </el-button>
        <el-button @click="handleImport">导入</el-button>
        <ExportBtn
          v-if="!(search.status === '0')"
          :service="erpApi.luteosErpOdoExportList"
          :params="{
            ...search,
            startDate: search.time ? search.time[0] : undefined,
            endDate: search.time ? search.time[1] : undefined,
          }"
        >
          导出
        </ExportBtn>
        <ExportBtn
          v-if="['', '300', '400'].includes(search.status)"
          ref="pickingExportRef"
          :service="erpApi.luteosErpOdoExportPickingList"
          :params="{ orderCodeList: codeList }"
          manual
          @before-export="beforeExport"
        >
          导出拣货单
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="code"
        :expand-row-keys="[listData?.recordList?.[0]?.code]"
        class="table-coll"
        class-name="table-row-dashed"
        :preserve-expanded-content="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" reserve-selection />
        <el-table-column type="expand" width="20">
          <template #expand="{ expanded }">
            <i class="iconfont icon-xiangxia icon-expand" :class="expanded ? 'row-open' : ''"></i>
          </template>
          <template #default="{ row }">
            <div class="expand-container">
              <div v-if="row?.systemRemark || row?.errorRemark" class="expend-error">
                <div class="fs-7 text-danger expand-error-row" v-if="row?.systemRemark">
                  <i class="iconfont icon-zhuyizhuangtai"></i>
                  系统备注：{{ row?.systemRemark || '系统备注系统备注' }}
                </div>
                <div class="fs-7 text-danger expand-error-row" v-if="row?.errorRemark">
                  <i class="iconfont icon-zhuyizhuangtai"></i>
                  异常信息：{{ row?.errorRemark }}
                </div>
              </div>
              <el-table :data="row?.commonOrderItemBeanList" :border="true">
                <template v-if="row?.requisitionType === '无SKU领用'">
                  <el-table-column label="物品名称" prop="name">
                    <template #default="{ row: subRow }">
                      <div>{{ subRow?.itemName || '-' }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="物料属性" prop="state">
                    <template #default="{ row: subRow }">
                      <div>{{ subRow?.itemProperties || '-' }}</div>
                    </template>
                  </el-table-column>
                </template>
                <template v-else>
                  <el-table-column label="产品名称" prop="name">
                    <template #default="{ row: subRow }">
                      <div>{{ subRow?.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="供应链SKU" prop="state">
                    <template #default="{ row: subRow }">
                      <div :class="subRow?.isOutStock ? 'red' : ''">
                        {{ subRow?.productSku }}
                        <Tag v-if="subRow?.isOutStock" color="red" class="ml20">缺货</Tag>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column label="数量" prop="qty" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单号信息" min-width="330">
          <template #default="{ row }">
            <div class="d-flex gap-2 fs-7">
              <div style="word-break: break-all">领用单号：{{ row?.code }}</div>
            </div>
            <div class="fs-7">OA申请单号：{{ row?.erpCode }}</div>
            <div class="fs-7">销售出库单号：{{ row?.systemCode || '-' }}</div>
            <div class="fs-7">仓配系统销售单号：{{ row?.systemSaleCode || '-' }}</div>
            <div class="fs-7">仓配系统销售出库单号：{{ row?.refCode || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="领用状态" min-width="120">
          <template #default="{ row }">
            <Tag v-if="row.isOutStock" color="red">缺货</Tag>
            <Tag v-if="row?.status || row.status === 0" :color="getStatusColor(row?.status)">
              {{ row?.statusDesc }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="领用(类型/场景/用途)" min-width="200">
          <template #default="{ row }">
            <div class="fs-7">领用类型：{{ row?.requisitionType || '-' }}</div>
            <div class="fs-7">领用场景：{{ row?.requisitionScene || '-' }}</div>
            <div class="fs-7">领用用途：{{ row?.requisitionUse || '-' }}</div>
            <div class="fs-7">市场大区：{{ row?.marketRegion || '-' }}</div>
            <div class="fs-7">客户名称：{{ row?.customerName || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="领用人信息" min-width="250">
          <template #default="{ row }">
            <div class="fs-7">{{ row?.requisitioner }}</div>
            <div class="fs-7">{{ row?.requisitionDept || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="审批信息" min-width="160">
          <template #default="{ row }">
            <div class="fs-7">渠道审批人: {{ row?.channelApproveName || '-' }}</div>
            <div class="fs-7">计划审批人: {{ row?.planner || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="收货人信息" min-width="180">
          <template #default="{ row }">
            <div class="fs-7">收件人：{{ row?.buyerName || '-' }}</div>
            <div class="fs-7">收件人电话：{{ row?.buyerPhone || '-' }}</div>
            <div class="fs-7">国家或地区：{{ row?.countryDesc || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="发货信息" min-width="360">
          <template #default="{ row }">
            <div class="fs-7">发货仓库：{{ row?.warehouseDesc || '-' }}</div>
            <div class="fs-7">物流承运商：{{ row?.spName || '-' }}</div>
            <div class="fs-7">配送方式：{{ row?.shippingDesc || '-' }}</div>
            <div class="fs-7">
              跟踪单号：
              <span v-if="row?.trackingNumList?.length > 0">
                <span v-for="(item, index) in row?.trackingNumList" :key="item">
                  <span class="link" @click="openExternalLink(item, row)">{{ item }}</span>
                  <span v-if="index !== row?.trackingNumList?.length - 1">{{ ' , ' }}</span>
                </span>
              </span>
              <span v-else>-</span>
            </div>
            <div class="fs-7">运单号：{{ row?.waybillNo || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150">
          <template #default="{ row }">{{ row?.createTime || '-' }}</template>
        </el-table-column>
        <el-table-column label="申请备注" fixed="right" min-width="180">
          <template #default="{ row }">
            <div class="fs-7">{{ row?.remark || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <div class="col-op">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    permissionCode: 'requisitionDetail',
                    row,
                  },
                  {
                    label: '编辑',
                    key: 'edit',
                    type: 'primary',
                    permissionCode: 'requisitionEdit',
                    hide:
                      (row?.status !== 200 &&
                        row?.status !== 0 &&
                        (row?.status < 500 || row.status >= 600)) ||
                      row.source === 'CRM_SAMPLE'  ||
                      row.shipmentOrderCode,
                    row,
                  },
                  // {
                  //   label: '验收确认',
                  //   key: 'confirm',
                  //   type: 'primary',
                  //   hide: row?.status !== 400,
                  //   permissionCode: '',
                  //   row,
                  // },
                  {
                    label: '上传跟踪号',
                    key: 'addTrackNum',
                    type: 'primary',
                    permissionCode: '',
                    hide: ![300, 400, 503].includes(row?.status),
                    row,
                  },
                  {
                    label: '复制',
                    key: 'copy',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: row.source === 'CRM_SAMPLE',
                    permissionCode: 'requisitionAdd',
                  },
                  {
                    label: '备注',
                    key: 'remark',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    hide: ![250].includes(row?.status),
                  },
                  {
                    label: '作废',
                    key: 'abandon',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    hide: [400, 600, 700].includes(row?.status),
                  },
                  {
                    label: '重试',
                    key: 'reTry',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    hide: ![501, 502].includes(row?.status),
                  },
                  {
                    label: '上传拣货单',
                    key: 'uploadPickupOrder',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    hide: ![300, 400].includes(row?.status) || row?.requisitionType !== '无SKU领用',
                  },
                ]"
                @click="handleActions"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <ViewDrawer ref="viewDrawerRef" />
    <EditDrawer ref="editorDrawerRef" @success="refreshList" />
    <AddDrawer ref="addDrawerRef" @success="refreshList" />
    <RemarkDialog ref="remarkRef" @success="refreshList" />
    <AddTrackNumDialog ref="addTrackNumDialogRef" @success="refreshList" />
    <OdoImport title="导入" importScene="ly_order" ref="odoImportModalRef" @success="refreshList" />
    <ImportDialog ref="importDialogRef" @success="refreshList" />
  </div>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import RemarkDialog from '@/views/supplyChainManage/requisition/components/RemarkDialog.vue';
  import AddTrackNumDialog from '@/views/supplyChainManage/requisition/components/addTrackNumDialog.vue';
  import { DictBean } from '@/api/erp/data-contracts';
  import OdoImport from './components/odoImport.vue';
  import AddDrawer from './components/addDrawer.vue';
  import ViewDrawer from './components/ViewDrawer.vue';
  import EditDrawer from './components/editDrawer.vue';

  const router = useRouter();
  const route = useRoute();
  const statusColorMap: Record<number, string> = {
    0: 'gray', // 草稿
    200: 'blue',
    250: 'yellow',
    300: 'purple',
    400: 'green',
    600: 'gray',
    700: 'green',
  };

  const getStatusColor = (status?: number | string | null) => {
    const s = Number(status);
    if (Number.isNaN(s)) return 'gray';
    // 5 开头的均是异常
    if (s >= 500 && s < 600) return 'red';
    return statusColorMap[s] ?? 'gray';
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: 'draft', statusName: '草稿', count: '' },
    { status: '200', code: 'waitHandle', statusName: '待确认', count: '' },
    { status: '250', code: 'waitAuth', statusName: '审核中', count: '' },
    { status: '300', code: 'waitOut', statusName: '待出库', count: '' },
    { status: '400', code: 'out', statusName: '已出库', count: '' },
    // { status: '700', code: 'finish', statusName: '已完成', count: '' },
    { status: '500', code: 'error', statusName: '异常', count: '' }, // 5开头的均是异常
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];

  // 打开物流跟踪地址
  async function openExternalLink(val?: any, row?: any) {
    const url = row.trackMainUrl + val;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const PAGE_SIZE = 10;

  const {
    search,
    // searchData,
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
    resetSearch,
    // selectedKeys,
  } = useList<ErpApi.LuteosErpOdoQueryList.RequestBody, ErpApi.LuteosErpOdoQueryList.ResponseBody>({
    searchDefaults: {
      keyword: undefined,
      trackingNum: undefined,
      requisitioner: undefined,
      status: '',
      creator: undefined,
      warehouseCode: undefined,
      deliveryCode: undefined,
      time: undefined,
      requisitionDept: undefined,
      type: 1,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { time } = searchData;
      return {
        ...omit(searchData, 'time'),
        createTimeStart: time ? time[0] : undefined,
        createTimeEnd: time ? time[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOdoQueryList,
  });

  const addDrawerRef = ref<InstanceType<typeof AddDrawer>>();
  const add = () => {
    addDrawerRef.value?.open();
  };

  const codeList = ref([]);
  const selectedList = ref([]);
  const handleSelectionChange = (selectedRows) => {
    codeList.value = selectedRows.map((item) => item?.code);
    selectedList.value = selectedRows;
  };

  const pickingExportRef = ref(null);
  const beforeExport = async () => {
    if (!codeList.value?.length) {
      ElMessage.warning('请选择要导出的订单');
      return;
    }
    const invalidCodeList = selectedList.value?.filter(
      (item) => item.requisitionType !== '无SKU领用' || ![300, 400].includes(item.status)
    );
    if (invalidCodeList.length > 0) {
      ElMessage.warning('只可待出库、已出库的无SKU领用订单导出拣货单');
    } else {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      pickingExportRef.value?.confirmExport();
    }
  };

  const remarkRef = ref<InstanceType<typeof RemarkDialog>>();
  const addTrackNumDialogRef = ref(null);
  const importDialogRef = ref(null);
  const viewDrawerRef = ref<InstanceType<typeof ViewDrawer>>();
  const editorDrawerRef = ref<InstanceType<typeof EditDrawer>>();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      viewDrawerRef.value?.open(row?.code);
    } else if (key === 'edit') {
      editorDrawerRef.value?.open(row?.code);
    } else if (key === 'remark') {
      remarkRef.value?.open(row?.code, row?.remark);
    } else if (key === 'confirm') {
      const isConfirmed = await swal.confirm({
        title: '领用验收确认',
        text: `请验收领用申请（OA申请单号：${row?.code}）的货物是否有误？`,
        confirmButtonText: '验收',
      });
      if (!isConfirmed) return;
      await erpApi.luteosErpOdoReceiveConfirm({
        code: row?.code,
        type: 1,
      });
      ElMessage.success('验收成功');
      refreshList();
    } else if (key === 'addTrackNum') {
      const trackingNumList = row?.trackNum?.split(',');
      const freightForwardingChannelCodeList = row?.freightForwardingChannelCode?.split(',');
      const list = trackingNumList.map((item, index) => ({
        trackingNum: item,
        freightForwardingChannelCode: freightForwardingChannelCodeList[index],
      }));
      addTrackNumDialogRef.value?.open(row?.code, list, row?.waybillNo);
    } else if (key === 'reTry') {
      const res = await swal.confirm({
        title: `确认重试`,
      });
      if (res) {
        await erpApi.luteosErpOdoReConfirm({
          code: row.code,
          type: 1,
        });
        ElMessage.success('重试成功');
        refreshList();
      }
    } else if (key === 'abandon') {
      const res = await swal.confirm({
        title: `确认作废`,
      });
      if (res) {
        await erpApi.luteosErpOdoCommonAbandon({
          code: row.code,
          type: 1,
        });
        ElMessage.success('作废成功');
        refreshList();
      }
    } else if (key === 'copy') {
      addDrawerRef.value?.open({ code: row.code });
      // const path = router.resolve({
      //   name: 'requisitionAdd',
      //   query: { code: row.code },
      // });
      // router.push(path.href);
    } else if (key === 'uploadPickupOrder') {
      importDialogRef.value?.open({
        title: '上传拣货单',
        uploadService: erpApi.luteosErpOdoUploadPicking,
        limit: 1,
        code: row?.code,
      });
    }
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  // 发货仓库
  const warehouseMap = ref<DictBean[]>([]);
  const queryAllWarehouse = async () => {
    const res = await erpApi.luteosErpOrderQueryAllWarehouse({
      type: -1,
    });
    warehouseMap.value = res || [];
  };
  queryAllWarehouse();
  const odoImportModalRef = ref<InstanceType<typeof OdoImport>>();
  const handleImport = () => {
    odoImportModalRef.value?.open();
  };

  // 获取缺货状态
  const getStockStatus = async (orderList) => {
    if (!orderList?.length) return;

    const orderCodes = orderList.map((item) => item.code);
    try {
      const res = await erpApi.luteosErpOdoQueryStockList(orderCodes);
      if (res?.length) {
        const stockMap = new Map(
          res.map((stock) => [
            stock.erpCode,
            {
              isOutStock: stock.isOutStock,
              skuStockInfoList: stock.skuStockInfoList || [],
            },
          ])
        );

        const updatedList = listData.value?.recordList.map((item) => {
          const stockInfo = stockMap.get(item.code);

          // 拿到该订单对应的 sku 库存数据
          const skuStockMap = new Map(
            (stockInfo?.skuStockInfoList || []).map((sku) => [sku.productSku, sku])
          );

          // 更新 commonOrderItemBeanList 中每个 SKU 的缺货状态
          const updatedCommonOrderItemBeanList = (item.commonOrderItemBeanList || []).map(
            (skuItem) => {
              const stockInfo = skuStockMap?.get(skuItem.productSku);

              return {
                ...skuItem,
                isOutStock: stockInfo ? stockInfo.inventory < stockInfo.qty : false, // 根据库存和数量判断是否缺货
              };
            }
          );

          return {
            ...item,
            isOutStock: stockInfo?.isOutStock || false,
            commonOrderItemBeanList: updatedCommonOrderItemBeanList,
          };
        });

        if (updatedList) {
          listData.value.recordList = updatedList;
        }
      }
    } catch (error) {
      console.error('获取缺货状态失败:', error);
    }
  };
  watch(
    () => listData.value,
    (val) => {
      if (val?.recordList?.length) {
        if (!val.recordList.some((item) => 'isOutStock' in item)) {
          getStockStatus(val.recordList);
        }
      }
    },
    { immediate: true }
  );

  const tableRef = ref();
  // 监听 query 变化,新增，编辑自动刷新列表
  watch(
    () => route.query,
    (newQuery) => {
      if (newQuery && newQuery?.refresh === '1') {
        runQuery();
        router.replace({ path: route.path, query: {} });
        setTimeout(() => {
          const scrollElem = document.querySelector('.el-main');
          if (scrollElem) {
            scrollElem.scrollTo({ top: 0, behavior: 'smooth' });
          }
          // 获取表格滚动容器
          const scrollWrapper = tableRef.value?.$el?.querySelector(
            '.table-coll .el-scrollbar__wrap'
          );
          if (scrollWrapper) {
            // 滚动到表格顶部
            scrollWrapper.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        }, 500);
      }
    }
  );
</script>

<style scoped lang="scss">
  .tabs-section {
    padding-top: 8px;
    background-color: #fff;
    .gap {
      height: 10px;
      width: 1px;
      background-color: #dfe2e6;
    }
    .tab-count {
      color: #b6babf;
      margin-left: 4px;
    }
    .el-radio-button.is-active {
      .tab-count {
        color: var(--el-radio-button-checked-text-color, #02b96b);
      }
    }
    .el-radio-button__inner:hover {
      .tab-count {
        color: var(--el-radio-button-checked-text-color, #02b96b);
      }
    }
  }
  .link {
    cursor: pointer;
    color: #02b96b;
  }

  .red {
    color: #f1416c;
  }

  .ml20 {
    margin-left: 20px;
  }

  .col-op {
    :deep(.action-btns) {
      display: block;
      .el-link {
        display: block;
      }
    }
  }

  .table-coll {
    :deep(.el-table__cell) {
      vertical-align: top;
    }
  }

  :deep(.el-table__expand-column) {
    .cell {
      padding: 0;
    }
  }

  :deep(.el-table__expanded-cell) {
    background-color: #f5f7fa !important;
    padding: 8px !important;
  }

  .icon-expand {
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #1e2226;
    transform: rotate(-90deg);

    &.row-open {
      transform: rotate(0deg);
    }
  }

  .expand-container {
    padding-left: 73px;

    .expend-error {
      border-radius: 6px;
      background-color: #ffffff;
      padding: 9px 16px;
      margin-bottom: 8px;
      .expand-error-row {
        display: flex;
        align-items: center;
      }
    }
    :deep(table) {
      border-radius: 8px 0 0 0;
      --el-table-border: 1px solid #dfe2e6;
      th {
        background: #f5f7fa;
      }
      td {
        background-color: #f5f7fa;
      }
      th,
      td {
        border-right-color: transparent !important;
      }
    }
  }
  :deep(.el-table) {
    --el-table-bg-color: transparent;
  }
</style>
