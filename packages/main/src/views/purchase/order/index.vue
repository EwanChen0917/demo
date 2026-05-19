<template>
  <div>
    <el-tabs v-model="search.orderStatus" tab-position="top">
      <el-tab-pane
        v-for="item in tabStatusList"
        :key="item.code"
        :label="item.label"
        :name="item.value"
      >
        <template #label>
          {{ item.label }}
          <span class="tab-count">({{ listData?.statistics[item.code] }})</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model.trim="search.keyword" placeholder="PO号/供应商名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-select
        style="width: 120px"
        v-model="search.timeType"
        placeholder=""
        :teleported="false"
        class="ms-3"
      >
        <el-option label="订单日期" value="1" />
        <el-option label="创建时间" value="2" />
      </el-select>
      <el-date-picker
        v-model="search.time"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        :start-placeholder="`${search.timeType == '1' ? '订单' : '创建'}开始时间`"
        :end-placeholder="`${search.timeType == '1' ? '订单' : '创建'}结束时间`"
        class="w-310px"
      />
    </template>
    <template #more-filter>
      <el-form-item label="供应商ELS账号">
        <el-input v-model.trim="search.toElsAccount" placeholder="供应商ELS账号" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="易仓订单号">
        <el-input v-model.trim="search.fbk1" placeholder="易仓订单号" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-select
          v-model="search.createBy"
          placeholder="创建人"
          filterable
          :teleported="false"
          clearable
        >
          <el-option
            v-for="item in createByList"
            :key="item.subAccount"
            :label="item.realname"
            :value="item.subAccount"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="search.sendStatus" placeholder="发布状态" :teleported="false" clearable>
          <el-option
            v-for="item in publishList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="交货状态">
        <el-select
          v-model="search.deliveryStatus"
          placeholder="交货状态"
          :teleported="false"
          clearable
        >
          <el-option
            v-for="item in deliveryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审批状态">
        <el-select
          v-model="search.auditStatus"
          placeholder="审批状态"
          :teleported="false"
          clearable
        >
          <el-option
            v-for="item in approvalList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="签署发起状态">
        <el-select
          v-model="search.esignStartStatus"
          placeholder="签署发起状态"
          :teleported="false"
          clearable
        >
          <el-option
            v-for="item in signList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="签署完成状态">
        <el-select
          v-model="search.esignFinalStatus"
          placeholder="签署完成状态"
          :teleported="false"
          clearable
        >
          <el-option
            v-for="item in signCompletedList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </template>
    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpSrmPurchaseExportList"
        :params="{
          ...omit(search, ['time', 'timeType']),
          ...(search.timeType === '1'
            ? {
                orderTimeStart: search.time?.[0],
                orderTimeEnd: search.time?.[1]
                  ? dayjs(search.time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                  : undefined,
              }
            : {
                createTimeStart: search.time?.[0],
                createTimeEnd: search.time?.[1]
                  ? dayjs(search.time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                  : undefined,
              }),
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="orderNumber"
    >
      <el-table-column type="expand" fixed>
        <template #default="{ row }">
          <div style="padding: 0 75px">
            <el-table :data="row?.purchaseOrderItemList">
              <el-table-column label="序号" width="50">
                <template #default="{ $index }">
                  {{ $index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="物料名称" prop="materialName" min-width="150" />
              <el-table-column label="物料编码" prop="materialNumber" min-width="120" />
              <el-table-column label="供应链SKU" prop="fbk1" min-width="140" />
              <el-table-column label="要求交期" prop="requireDate" min-width="100" />
              <el-table-column label="数量" prop="quantity" />
              <el-table-column label="收货数量" prop="receiveQuantity" />
              <el-table-column label="在途数量" prop="onWayQuantity" />
              <el-table-column label="未交货数量" prop="notDeliveryQuantity" min-width="100" />
              <el-table-column label="交货数量" prop="deliveryQuantity" />
              <el-table-column label="采购单位" prop="purchaseUnit" />
              <el-table-column label="采购类型" prop="purchaseType" />
              <el-table-column label="物料描述" prop="materialDesc" />
              <el-table-column label="物料分类编码" prop="cateCode" min-width="140" />
              <el-table-column label="物料分类名称" prop="cateName" min-width="110" />
              <el-table-column label="物料规格" prop="materialSpec" min-width="150" />
              <el-table-column label="物料组" prop="materialGroup" />
              <el-table-column label="物料组名称" prop="materialGroupName" min-width="110" />
              <el-table-column label="库存地点代码" prop="storageLocation" min-width="110" />
              <el-table-column label="采购周期" prop="purchaseCycle" />
              <el-table-column label="是否质检" prop="isCheckQuality" />
              <el-table-column label="工厂代码" prop="factory" min-width="100" />
              <el-table-column label="来源类型" prop="sourceType" min-width="100" />
              <el-table-column label="来源单号" prop="sourceNumber" min-width="150" />
              <el-table-column label="需方备注" prop="purchaseRemark" />
              <el-table-column label="供方备注" prop="supplierRemark" />
              <el-table-column label="拒绝原因" prop="rejectReason" />
              <el-table-column label="责任方" prop="responsibleParty" />
              <el-table-column label="责任方原因" prop="responsibleReason" min-width="100" />
              <el-table-column label="是否首单" prop="purchaseIsFirst" />
              <el-table-column label="对方ELS账号" prop="toElsAccount" min-width="110" />
              <el-table-column label="行状态" prop="itemStatus" />
              <el-table-column label="发布状态" prop="sendStatus" />
              <el-table-column label="送货安排" prop="isJit" />
              <el-table-column label="是否赠品" prop="isFree" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="70" fixed>
        <template #default="{ $index }">
          {{ pageSize * (current - 1) + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="PO号" prop="orderNumber" min-width="145" />
      <el-table-column label="供应商ELS账号" prop="toElsAccount" min-width="120" />
      <el-table-column label="供应商名称" prop="supplierName" min-width="150" />
      <el-table-column label="易仓订单号" prop="fbk1" min-width="120" />
      <el-table-column label="订单日期" prop="orderDate" min-width="110" />
      <el-table-column label="订单类型" prop="orderType" />
      <el-table-column label="采购仓库" prop="warehouseCode" />
      <el-table-column label="中转或直发" prop="deliveryType" min-width="100" />
      <el-table-column label="补货方式" prop="poType" />
      <el-table-column label="供应商运输方式" prop="shippingMethodIdHead" min-width="120" />
      <el-table-column label="跟单员" prop="ptsOprater" min-width="120" />
      <el-table-column label="订单状态" prop="orderStatus" min-width="110" />
      <el-table-column label="发布状态" prop="sendStatus" />
      <el-table-column label="交货状态" prop="deliveryStatus" />
      <el-table-column label="签署完成状态" prop="esignFinalStatus" min-width="110" />
      <el-table-column label="签署发起状态" prop="esignStartStatus" min-width="110" />
      <el-table-column label="是否启用" prop="isEsign" />
      <el-table-column label="审批状态" prop="auditStatus" />
      <el-table-column label="审批人" prop="fbk8" />
      <el-table-column label="审批备注" prop="fbk9" />
      <el-table-column label="来源类型" prop="sourceType" min-width="110" />
      <el-table-column label="公司名称" prop="companyName" min-width="130" />
      <el-table-column label="采购组织名称" prop="purchaseOrgName" min-width="110" />
      <el-table-column label="需方负责人" prop="purchasePrincipal" min-width="100" />
      <el-table-column label="供方负责人" prop="supplierPrincipal" min-width="130" />
      <el-table-column label="创建人" prop="createBy" />
      <el-table-column label="创建时间" prop="createTime" min-width="110" />
      <el-table-column label="修改人" prop="updateBy" />
      <el-table-column label="修改时间" prop="updateTime" min-width="110" />
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
</template>

<script setup lang="ts" name="purchaseOrderManagement">
  import useList from '@/hooks/list/useList';
  import { useRouter } from 'vue-router';
  import { type ErpApi, erpApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import { omit } from 'lodash-es';
  import { useRequest } from 'vue-request';
  import dayjs from 'dayjs';

  const tableRef = ref(null);
  // 订单状态：0：新建、8:已关闭、7：变更中、100：易仓处理中、1：待供应商确认、3：供应商已拒绝、5：已确认、6：部分确认
  const tabStatusList = [
    { code: 'all', label: '全部', value: '' },
    { code: 'create', label: '新建', value: 0 },
    { code: 'closed', label: '已关闭', value: 8 },
    { code: 'modifying', label: '变更中', value: 7 },
    { code: 'ecangProcessing', label: '易仓处理中', value: 100 },
    { code: 'supplierConfirming', label: '待供应商确认', value: 1 },
    { code: 'supplierRejected', label: '供应商已拒绝', value: 3 },
    { code: 'confirmed', label: '已确认', value: 5 },
    { code: 'partiallyConfirmed', label: '部分确认', value: 6 },
  ];
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
  } = useList<
    ErpApi.LuteosErpSrmPurchaseQueryList.RequestBody,
    ErpApi.LuteosErpSrmPurchaseQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      timeType: '1',
      time: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      orderTimeStart: undefined,
      orderTimeEnd: undefined,
      toElsAccount: undefined,
      fbk1: undefined,
      orderStatus: '',
      deliveryStatus: undefined,
      esignStartStatus: undefined,
      esignFinalStatus: undefined,
      auditStatus: undefined,
      createBy: undefined,
      sendStatus: undefined,
    },
    interceptSearchData: (searchData) => {
      const { time, timeType } = searchData;
      return {
        ...omit(searchData, ['time', 'timeType']),
        ...(timeType === '1'
          ? {
              // 订单时间
              orderTimeStart: time?.[0],
              orderTimeEnd: time?.[1]
                ? dayjs(time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : undefined,
            }
          : {
              // 创建时间
              createTimeStart: time?.[0],
              createTimeEnd: time?.[1]
                ? dayjs(time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : undefined,
            }),
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSrmPurchaseQueryList,
  });
  const publishList = ref<any[]>([]);
  const deliveryList = ref<any[]>([]);
  const signList = ref<any[]>([]);
  const approvalList = ref<any[]>([]);
  const signCompletedList = ref<any[]>([]);
  const createByList = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await erpApi.luteosErpSrmPurchaseQuerySrmDictMap({
      dictCodes: [
        'srmOrderStatus',
        'srmOrderSendStatus',
        'srmOrderDeliveryStatus',
        'orderEsignStatus',
        'esignFinalStatus',
        'srmAuditStatus',
      ],
    });
    publishList.value = getListData(res?.srmOrderSendStatus); // 发布状态
    deliveryList.value = getListData(res?.srmOrderDeliveryStatus); // 交货状态
    signList.value = getListData(res?.orderEsignStatus); // 签署发起状态
    signCompletedList.value = getListData(res?.esignFinalStatus); // 签署完成状态
    approvalList.value = getListData(res?.srmAuditStatus); // 审批状态
  };
  const getListData = (obj) => {
    const arr = Object.keys(obj).map((key) => {
      return {
        label: obj[key],
        value: key,
      };
    });
    return arr || [];
  };
  const getCreateByList = async () => {
    const res = await erpApi.luteosErpSrmPurchaseQuerySrmMemberList();
    createByList.value = res; // 创建人
  };
  getSiteOptions();
  getCreateByList();
</script>

<style scoped lang="scss">
  .box {
    height: calc(100% - 100px);
    padding-left: 1.75rem;
    padding-right: 1rem;
    margin-right: 0.75rem;
  }

  .task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    min-height: 200px;

    .task-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
      width: 30%;
      padding: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 12px;

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          gap: 5px;
        }
      }
    }
  }

  .statistics {
    display: flex;
    gap: 15px;

    &-item {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }

  .cycle {
    display: inline-block;
    border-radius: 50%;
    width: 5px;
    height: 5px;
  }

  .refresh {
    display: flex;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    font-size: 12px;
    color: var(--el-color-primary);

    .icon-shujutongbu1 {
      font-size: 12px;
    }
  }

  .arrows-icon-down {
    &:hover {
      animation: moveDown 2s linear infinite;

      @keyframes moveDown {
        0% {
          transform: translateY(0);
        }

        25% {
          transform: translateY(3px);
        }

        50% {
          transform: translateY(0);
        }

        75% {
          transform: translateY(-3px);
        }

        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .arrows-icon-up {
    &:hover {
      animation: moveUp 2s linear infinite;

      @keyframes moveUp {
        0% {
          transform: translateY(0);
        }

        25% {
          transform: translateY(-3px);
        }

        50% {
          transform: translateY(0);
        }

        75% {
          transform: translateY(3px);
        }

        100% {
          transform: translateY(0);
        }
      }
    }
  }
</style>
