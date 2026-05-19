<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchCustom"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.zendeskIdList"
        placeholder="多个工单号用英文逗号或空格隔开"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.channel" placeholder="渠道" clearable>
        <el-option label="shopify" value="shopify" />
        <el-option label="amazon" value="amazon" />
      </el-select>
      <el-input
        style="width: 230px"
        v-model="search.orderCodeList"
        placeholder="多个订单号用英文逗号或空格隔开"
        clearable
      />
      <el-input
        style="width: 220px"
        v-model="search.mskuList"
        placeholder="多个SKU用英文逗号或空格隔开"
        clearable
      />
      <el-input
        style="width: 120px"
        v-model="search.customerEmail"
        placeholder="客户邮箱"
        clearable
      />
      <div class="date-picker-prepend" ref="areaCountryContainerRef">
        <el-select v-model="search.timeType" style="width: 135px">
          <el-option :value="1" label="提交时间" />
          <el-option :value="2" label="原订单订购时间" />
        </el-select>
        <el-date-picker
          style="width: 240px"
          v-model="search.refundDate"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          class="b2bdate"
        />
        <!-- HH:mm:ss -->
      </div>
      <!-- <el-date-picker
        style="width: 320px"
        v-model="search.refundDate"
        type="daterange"
        range-separator="-"
        start-placeholder="提交退款开始日期"
        end-placeholder="提交退款结束日期"
        value-format="YYYY-MM-DD"
      /> -->
    </template>
    <template #buttons>
      <el-button type="primary" @click="batchPass">批量通过</el-button>
      <el-button type="primary" @click="batchReject">批量拒绝</el-button>
      <el-popover
        popper-class="rt_el_pop h-400px"
        :offset="10"
        :hide-after="0"
        placement="bottom"
        :width="263"
        trigger="click"
      >
        <div class="h-xl-100">
          <div class="px-7 py-5">
            <div class="fs-4 text-dark fw-bold">筛选条件</div>
          </div>
          <div class="separator border-gray-200"></div>
          <div class="py-5 h-xl-100">
            <div
              style="
                height: calc(100% - 82px);
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
              "
            >
              <el-select
                v-model="search.refundTypeCodeList"
                placeholder="退款类型"
                multiple
                clearable
                filterable
                :teleported="false"
              >
                <el-option
                  v-for="item in refundTypeList"
                  :value="item?.value"
                  :label="item?.label"
                  :key="item?.value"
                />
              </el-select>
              <el-select
                v-model="search.approvalStatusCode"
                placeholder="审核状态"
                clearable
                :teleported="false"
              >
                <el-option
                  v-for="item in approvalStatusList"
                  :value="item?.value"
                  :label="item?.label"
                  :key="item?.value"
                />
              </el-select>
              <!--              <el-select
                v-model="search.jjRefundStatusCode"
                placeholder="退款单状态"
                clearable
                filterable
                :teleported="false"
              >
                <el-option
                  v-for="item in afterSaleJjRefundStatusList"
                  :value="item?.value"
                  :label="item?.label"
                  :key="item?.value"
                />
              </el-select>-->
              <el-select
                v-model="search.shopifyRefundStatusCode"
                placeholder="后台退款状态"
                clearable
                filterable
                :teleported="false"
              >
                <el-option
                  v-for="item in afterSaleRefundStatusList"
                  :value="item?.value"
                  :label="item?.label"
                  :key="item?.value"
                />
              </el-select>
              <el-select
                v-model="search.pushStatusList"
                placeholder="推送状态"
                clearable
                filterable
                :teleported="false"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in pushStatusList"
                  :value="item?.value"
                  :label="item?.label"
                  :key="item?.value"
                />
              </el-select>
              <el-select
                v-model="search.rePush"
                placeholder="是否重推"
                clearable
                filterable
                :teleported="false"
              >
                <el-option :value="1" label="是" />
                <el-option :value="0" label="否" />
              </el-select>
              <el-select
                v-model="search.refundMethod"
                placeholder="退款方式"
                clearable
                filterable
                :teleported="false"
              >
                <el-option value="Refund via Original Payment" label="原路退款" />
                <el-option value="Refund via PayPal" label="Paypal退款" />
              </el-select>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem"
            >
              <el-button type="primary" @click="resetSearch">重置</el-button>
              <el-button type="primary" @click="runQuery">查询</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <!-- <el-button type="primary">筛选</el-button> -->
          <el-button style="padding: 9px">
            <i class="iconfont icon-shaixuan"></i>
          </el-button>
        </template>
      </el-popover>

      <ExportBtn
        :service="afterSaleApi.luteosAfterSaleRefundExport"
        :params="
          search?.timeType === 1
            ? {
                ...omit(search, 'refundDate'),
                zendeskIdList: search.zendeskIdList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                orderCodeList: search.orderCodeList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                mskuList: search.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
                refundDateStart: search?.refundDate ? search?.refundDate[0] : undefined,
                refundDateEnd: search?.refundDate ? search?.refundDate[1] : undefined,
              }
            : {
                ...omit(search, 'refundDate'),
                zendeskIdList: search.zendeskIdList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                orderCodeList: search.orderCodeList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                mskuList: search.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
                srcDateStart: search?.refundDate ? `${search?.refundDate[0]} 00:00:00` : undefined,
                srcDateEnd: search?.refundDate ? `${search?.refundDate[1]} 23:59:59` : undefined,
              }
        "
      >
        导出
      </ExportBtn>
      <el-button type="danger" v-permission="'deleteAfterSaleRefund'" plain @click="batchDelete">
        删除
      </el-button>
      <el-button type="primary" @click="batchRePush">重推</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection fixed="left" />
      <el-table-column prop="channel" label="渠道" fixed="left" />
      <el-table-column prop="zendeskId" label="工单号" fixed="left" />
      <el-table-column prop="shopName" label="店铺/站点" min-width="140">
        <template #default="{ row }">
          {{ row.shopName ?? '' }}{{ row.shopName && row.site ? ':' : '' }}{{ row.site ?? '' }}
        </template>
      </el-table-column>
      <el-table-column prop="classification" label="classification" min-width="130" />
      <el-table-column prop="firstLevel" label="一级分类" min-width="120" />
      <el-table-column prop="secondLevel" label="二级分类" min-width="120" />
      <el-table-column prop="receiverAddressCountry" label="订单国家" min-width="120" />
      <el-table-column prop="receiverAddressState" label="订单省州" min-width="120" />
      <el-table-column prop="pumpPart" label="pump part" min-width="120" />
      <el-table-column prop="orderCode" label="订单号" />
      <el-table-column prop="customerEmail" label="客户邮箱" min-width="130" />
      <el-table-column prop="refundType" label="退款类型" />
      <el-table-column prop="refundMethodDesc" label="退款方式" width="85" />
      <el-table-column prop="refundAmount" label="退款金额" />
      <el-table-column prop="refundCurrency" label="退款币种" />
      <el-table-column prop="refundReason" label="退款原因" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row.refundReason" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="refundDetails" label="退款详情" />
      <el-table-column prop="msku" label="Product Sku" min-width="140" />
      <el-table-column prop="mskuRefundAmountStr" label="SKU退款金额" min-width="140" />
      <el-table-column prop="vocModel" label="产品型号" />
      <el-table-column prop="customerServiceStaff" label="客服人员" />
      <el-table-column prop="refundDate" label="提交退款日期" min-width="120" />
      <el-table-column prop="purchaseTimeBeijing" label="原订单订购时间" min-width="120" />
      <el-table-column prop="approvalStatus" label="审核状态">
        <template #default="{ row }">
          <Tag
            v-if="row?.approvalStatusCode"
            :color="approvalStatusColorMap[row.approvalStatusCode]"
          >
            {{ row?.approvalStatus }}
          </Tag>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="jjRefundStatus" label="退款单状态" />-->
      <el-table-column prop="shopifyRefundStatus" label="后台退款状态" min-width="120">
        <template #default="{ row }">
          <Tag
            v-if="row?.shopifyRefundStatusCode"
            :color="shopifyRefundStatusColorMap[row.shopifyRefundStatusCode]"
          >
            {{ row?.shopifyRefundStatus }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="pushStatusDesc" label="推送状态" min-width="100">
        <template #default="{ row }">
          <Tag v-if="row?.pushStatus !== null" :color="pushStatusColorMap[row.pushStatus]">
            {{ row?.pushStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="pushErrorMsg" label="失败原因" min-width="140">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.pushErrorMsg" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="refundReason" label="是否重推" min-width="80">
        <template #default="{ row }">
          {{ row.rePush === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="{ row }">
          <div class="d-flex align-items-center gap-2">
            <OverflowTooltip :content="row?.remark" :line="3" />
            <el-icon class="edit-icon" @click="editRemark(row)">
              <Edit style="color: #02b96b" />
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '通过',
                key: 'pass',
                type: 'success',
                hide: row?.approvalStatusCode !== 'to_audit',
                permissionCode: '',
                row,
              },
              {
                label: '拒绝',
                key: 'reject',
                type: 'danger',
                hide: row?.approvalStatusCode !== 'to_audit',
                permissionCode: '',
                row,
              },
            ]"
            @click="handleActions"
          />
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
  <LogDialog ref="logDialogRef" />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { Edit } from '@element-plus/icons-vue';
  import { AfterSaleApi, afterSaleApi, commonApi } from '@/api';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import LogDialog from '@/views/afterSale/order/components/logDialog.vue';
  import { ElMessage, ElMessageBox, ElSelect } from 'element-plus';

  const approvalStatusColorMap = {
    to_audit: 'blue',
    audit_fail: 'red',
    audited: 'green',
  };

  const shopifyRefundStatusColorMap = {
    success: 'green',
    fail: 'red',
  };

  const pushStatusColorMap = {
    0: 'blue',
    10: 'green',
    20: 'red',
    30: 'red',
    40: 'purple',
  };

  const PAGE_SIZE = 10;

  const curRemark = ref('');
  const tableRef = ref(null);
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
    AfterSaleApi.LuteosAfterSaleRefundQueryList.RequestBody,
    AfterSaleApi.LuteosAfterSaleRefundQueryList.ResponseBody
  >({
    searchDefaults: {
      channel: undefined,
      zendeskIdList: undefined,
      orderCodeList: undefined,
      mskuList: undefined,
      customerEmail: undefined,
      refundDate: undefined,
      refundTypeCodeList: undefined,
      approvalStatusCode: undefined,
      jjRefundStatusCode: undefined,
      shopifyRefundStatusCode: undefined,
      pushStatusList: undefined,
      rePush: undefined,
      refundMethod: undefined,
      srcDateStart: undefined,
      srcDateEnd: undefined,
      timeType: 1,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { refundDate } = searchData;
      if (searchData.timeType === 1) {
        return {
          ...omit(searchData, 'refundDate'),
          zendeskIdList: searchData.zendeskIdList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
          orderCodeList: searchData.orderCodeList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
          mskuList: searchData.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
          refundDateStart: refundDate ? refundDate[0] : undefined,
          refundDateEnd: refundDate ? refundDate[1] : undefined,
        };
      }
      return {
        ...omit(searchData, 'refundDate'),
        zendeskIdList: searchData.zendeskIdList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        orderCodeList: searchData.orderCodeList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        mskuList: searchData.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        srcDateStart: refundDate ? `${refundDate[0]} 00:00:00` : undefined,
        srcDateEnd: refundDate ? `${refundDate[1]} 23:59:59` : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: afterSaleApi.luteosAfterSaleRefundQueryList,
  });
  const resetSearchCustom = () => {
    resetSearch();
    tableRef.value?.clearSelection();
  };

  // 勾选
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 批量通过
  const batchPass = async () => {
    if (!totalList.value.length) return ElMessage.warning('请先勾选数据');
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item?.approvalStatusCode !== 'to_audit')
      ?.map((item) => item.orderCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非待审核状态，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('确认批量通过吗？');
    if (!isConfirmed) return;
    const res = await afterSaleApi.luteosAfterSaleRefundBatchAudit({
      idList: totalList.value.map((item) => item?.id),
      approvalStatusCode: 'audited',
    });
    ElMessage.success('批量通过成功');
    refreshList();
    tableRef.value?.clearSelection();
  };

  const batchRePush = async () => {
    if (!totalList.value.length) return ElMessage.warning('请先勾选数据');
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item?.approvalStatusCode !== 'audited')
      ?.map((item) => item.orderCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}审核状态非已审核状态，请重新选择`);
      return;
    }
    const illegalList2 = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item?.shopifyRefundStatusCode)
      ?.map((item) => item.orderCode);
    if (illegalList2.length > 0) {
      ElMessage.warning(`订单号：${illegalList2?.join(',')}后台退款状态非空，请重新选择`);
      return;
    }
    const illegalList3 = tableRef.value
      ?.getSelectionRows()
      ?.filter(
        (item) => item?.pushStatus !== 0 && item?.pushStatus !== 20 && item?.pushStatus !== 30
      )
      ?.map((item) => item.orderCode);
    if (illegalList3.length > 0) {
      ElMessage.warning(`订单号：${illegalList3?.join(',')}推送状态非未推送或推送失败，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('请确认是否重推？');
    if (!isConfirmed) return;
    const res = await afterSaleApi.luteosAfterSaleRefundBatchRePush({
      idList: totalList.value.map((item) => item?.id),
    });
    ElMessage.success('重推成功');
    refreshList();
    tableRef.value?.clearSelection();
  };

  // 批量拒绝
  const batchReject = async () => {
    if (!totalList.value.length) return ElMessage.warning('请先勾选数据');
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item?.approvalStatusCode !== 'to_audit')
      ?.map((item) => item.orderCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非待审核状态，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('确认批量拒绝吗？');
    if (!isConfirmed) return;
    const res = await afterSaleApi.luteosAfterSaleRefundBatchAudit({
      idList: totalList.value.map((item) => item?.id),
      approvalStatusCode: 'audit_fail',
    });
    ElMessage.success('批量拒绝成功');
    refreshList();
    tableRef.value?.clearSelection();
  };

  // 批量删除
  const batchDelete = async () => {
    if (!totalList.value.length) return ElMessage.warning('请勾选数据');
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item?.approvalStatusCode !== 'to_audit');
    if (illegalList.length > 0) {
      ElMessage.warning(`只能删除未审核的数据，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('请确认是否删除数据？');
    if (!isConfirmed) return;
    await afterSaleApi.luteosAfterSaleRefundBatchDeleted({
      idList: totalList.value.map((item) => item?.id),
    });
    ElMessage.success('删除成功');
    refreshList();
    tableRef.value?.clearSelection();
  };

  const logDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      // 日志
      case 'log':
        logDialogRef.value.open(row.refundCode, 'after_sale_refund');
        break;
      // 审核
      case 'pass':
        {
          const isComfirmed = await swal.confirm('确认通过吗？');
          if (!isComfirmed) return;
          const res = await afterSaleApi.luteosAfterSaleRefundBatchAudit({
            idList: [row.id],
            approvalStatusCode: 'audited',
          });
          ElMessage.success('审核通过成功');
          refreshList();
        }
        break;
      case 'reject':
        {
          const isComfirmed = await swal.confirm('确认拒绝吗？');
          if (!isComfirmed) return;
          const res = await afterSaleApi.luteosAfterSaleRefundBatchAudit({
            idList: [row.id],
            approvalStatusCode: 'audit_fail',
          });
          ElMessage.success('审核拒绝成功');
          refreshList();
        }
        break;
      default:
        break;
    }
  };

  // 编辑备注
  const editRemark = async (row) => {
    ElMessageBox.prompt('编辑备注', {
      inputValue: row?.remark,
      buttonSize: 'small',
    }).then(async ({ value }) => {
      if (value.length >= 255) {
        ElMessage.warning('备注长度太长!');
        return;
      }
      await afterSaleApi.luteosAfterSaleRefundEditRemark({
        id: row?.id,
        remark: value,
      });
      ElMessage.success('编辑成功');
      row.remark = value;
    });
  };

  const getEnumDict = async (enumDictCode) => {
    const res = await commonApi.luteosCommonBizEnumsGetEnumDict({
      enumDictCode,
    });
    return res || [];
  };

  const approvalStatusList = ref([]);
  const afterSaleJjRefundStatusList = ref([]);
  const afterSaleRefundStatusList = ref([]);
  const refundTypeList = ref([]);
  const pushStatusList = ref([]);
  onMounted(async () => {
    approvalStatusList.value = await getEnumDict('afterSaleRefundApprovalStatus');
    afterSaleJjRefundStatusList.value = await getEnumDict('afterSaleJjRefundStatus');
    afterSaleRefundStatusList.value = await getEnumDict('afterSaleRefundStatus');
    refundTypeList.value = await getEnumDict('afterSaleRefundType');
    pushStatusList.value = await getEnumDict('afterSaleTsPushStatus');
  });
</script>

<style scoped lang="scss">
  .edit-icon {
    cursor: pointer;
  }
  :deep(.keen-ui .el-popover.el-popper.rt_el_pop) {
    max-width: 260px;
    // width: 200px;
  }
</style>
