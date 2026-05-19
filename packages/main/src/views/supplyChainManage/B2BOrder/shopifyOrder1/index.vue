<template>
  <div class="d-flex justify-content-between align-items-center">
    <el-tabs v-model="search.orderBigStatus" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="item in tabStatusList"
        :key="item.status"
        :label="item.statusName"
        :name="item.status"
      >
        <template #label>
          {{ item.statusName }}
          <span class="tab-count">({{ listData?.statusStatistics[item.code] }})</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <!--    <div class="text-gray-500" v-if="!store.taskMap.B2BOrderSync">
      <span>上次更新：{{ store.taskMap?.lastRefreshTime }}</span>
    </div>-->
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="searchType" style="width: 100px" @change="handleSearchTypeChange">
        <el-option
          v-for="(item, key) in searchTypeMap"
          :value="key"
          :label="item.label"
          :key="key"
        />
      </el-select>
      <el-input
        v-if="searchType > 0"
        v-model="search[searchTypeMap[searchType].key]"
        :placeholder="searchTypeMap[searchType]?.placeholder"
        style="width: 275px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        v-else
        v-model="search.orderCode"
        :placeholder="searchTypeMap[searchType]?.placeholder"
        style="width: 275px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="timeType" style="width: 80px" @change="handleTimeChange(time)">
        <el-option :value="1" label="创建" />
        <el-option :value="2" label="签收" />
        <el-option :value="3" label="发货" />
        <el-option :value="4" label="送达" />
      </el-select>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="handleTimeChange"
      />
      <el-select
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
      <!--      <el-form-item label="收件人国家">-->
      <CountrySelect
        v-model="search.countryCodeList"
        placeholder="收件人国家"
        filterable
        clearable
        multiple
      />
      <!--      </el-form-item>-->
      <!--      <el-select
        style="width: 180px"
        v-model="search.creatorList"
        placeholder="创建人"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :teleported="false"
      >
        <el-option
          v-for="person of creatorList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>-->
    </template>
    <template #buttons>
      <el-button
        type="primary"
        :disabled="!codeList.length > 0"
        v-permission="'B2BOrderCancel'"
        @click="batchAbandon"
      >
        批量作废
      </el-button>
      <el-button type="primary" :disabled="!codeList.length > 0" @click="remarkRef.open(codeList)">
        批量备注
      </el-button>
      <!--      <el-button
        v-permission="'shopifyOrderRefresh'"
        :loading="!!store.taskMap.shopifyOrderSync"
        @click="handleRefresh"
        type="primary"
      >
        <div>{{ !!store.taskMap.shopifyOrderSync ? '刷新中' : '手动刷新' }}</div>
      </el-button>-->
      <!--      <el-button type="primary" @click="batchUpdateVisible = true">批量操作</el-button>-->
      <el-button type="primary" @click="batchSend" :disabled="!codeList.length > 0">
        批量发货
      </el-button>
      <!--      <el-popover
        popper-class="rt_el_pop h-600px"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="550"
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
                height: calc(100% - 100px);
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
                overflow-y: auto;
              "
            >
              <el-form label-width="100" label-position="top">
                <el-form-item label="金额区间">
                  <el-space class="w-100">
                    <NumberInput
                      v-model="search.amountMin"
                      placeholder="总金额"
                      type="number"
                      :precision="0"
                    />
                    <span>-</span>
                    <NumberInput
                      v-model="search.amountMax"
                      placeholder="总金额"
                      type="number"
                      :precision="0"
                    />
                  </el-space>
                </el-form-item>
                <el-form-item label="配送方式">
                  <el-select
                    v-model="search.shippingCode"
                    placeholder="配送方式"
                    filterable
                    clearable
                    :teleported="false"
                  >
                    <el-option
                      v-for="shipping of shippingMap"
                      :key="shipping.value"
                      :label="shipping.desc"
                      :value="shipping.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="审核人">
                  <DeptMember v-model="search.auditCode" placeholder="审核人" />
                </el-form-item>
                <el-form-item label="期望发货时间">
                  <el-date-picker
                    v-model="expectedSendTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="YYYY-MM-DD"
                    :teleported="false"
                    @change="
                      (val) => {
                        search.platformExpectedSendTimeStart = val ? val[0] : '';
                        search.platformExpectedSendTimeEnd = val ? val[1] : '';
                      }
                    "
                  />
                </el-form-item>
                <el-form-item label="平台送达时间">
                  <el-date-picker
                    v-model="expectedArrivalTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="YYYY-MM-DD"
                    :teleported="false"
                    @change="
                      (val) => {
                        search.operationExpectedArrivalTimeStart = val ? val[0] : '';
                        search.operationExpectedArrivalTimeEnd = val ? val[1] : '';
                      }
                    "
                  />
                </el-form-item>
                <el-form-item label="客户类型">
                  <el-select
                    v-model="search.customerTypeList"
                    placeholder="客户类型"
                    filterable
                    clearable
                    multiple
                    :teleported="false"
                  >
                    <el-option
                      v-for="person of b2bClientType"
                      :key="person.value"
                      :label="person.desc"
                      :value="person.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="收件人国家">
                  <CountrySelect
                    v-model="search.countryCodeList"
                    placeholder="收件人国家"
                    filterable
                    clearable
                    multiple
                  />
                </el-form-item>
              </el-form>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem"
            >
              <el-button type="primary" @click="reset">重置</el-button>
              <el-button type="primary" @click="runQuery">查询</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <el-button type="primary">筛选</el-button>
        </template>
      </el-popover>-->
      <ExportBtn :service="erpApi.luteosErpOrderOrderDownload" :params="search" :plain="false">
        导出
      </ExportBtn>
    </template>
    <el-table
      class="border-table"
      border
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="erpCode"
      class-name="table-row-dashed"
      max-height="900px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <!--      <el-table-column min-width="340px" label="订单详情">
        <template #default="{ row }">
          <p>
            订单号：{{ row.erpCode }}
            <Tag :color="statusColorMap[row.orderStatus]">{{ row.orderStatusDesc }}</Tag>
          </p>
          <p>易仓订单号：{{ row.orderCode || '-' }}</p>
          <p>参考单号：{{ row.refNo || '-' }}</p>
          <p>客户名称：{{ row.customerDesc || '-' }}</p>
          <p>卖家账号：{{ row.shopAccount || '-' }}</p>
          <p>创建人：{{ row.creator || '-' }}</p>
          <p>原订单：{{ row.pcode || '-' }}</p>
          <p v-if="row?.waitAuditOperatorList?.length > 0">
            当前待审核人：{{ row?.waitAuditOperatorList?.join(',') }}
          </p>
          <p>订单来源：{{ row.sourceDesc }}</p>
        </template>
      </el-table-column>-->
      <el-table-column label="订单信息" min-width="250px">
        <template #default="{ row }">
          <p>
            订单号：{{ row?.erpCode }}
            <Tag :color="statusColorMap[row?.orderStatus]">{{ row?.orderStatusDesc }}</Tag>
          </p>
          <p>积加订单号：{{ row?.orderCode }}</p>
          <p>参考单号：{{ row?.refNo }}</p>
          <p>店铺：{{ row?.shopAccount }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="750px" label="订单明细">
        <template #default="{ row }">
          <!--          <el-row
            :gutter="20"
            style="margin-bottom: 8px"
            v-for="product of row.itemBeanList"
            :key="product.skuCode"
          >
            <el-col :span="24">产品名称：{{ product.productName }}</el-col>
            <el-col :span="12">供应链SKU：{{ product.supplySku }}</el-col>
            <el-col :span="6">数量：{{ product.num }}</el-col>
            <el-col :span="6">单价：{{ product.price }}</el-col>
          </el-row>-->
          <div class="d-flex gap-10" v-for="product of row.itemBeanList" :key="product.skuCode">
            <div style="width: 250px">
              <p>{{ product?.productName }}</p>
              <p>SKU：{{ product?.skuCode }}</p>
              <p>三方仓SKU：{{ product?.supplySku }}</p>
            </div>
            <div class="w-325px d-flex justify-content-between gap-5">
              <div class="flex-grow-1">
                <p>MSKU：{{ product?.sellerSku }}</p>
                <p>itemId：{{ product?.itemId }}</p>
                <p>预估重量：{{ product?.weight || '-' }}g</p>
                <p>预估体积：{{ product?.volume || '-' }}cm³</p>
              </div>
              <p class="flex-shrink-0">应发：{{ product?.num }}</p>
            </div>
            <div class="w-150px">
              <p>商品单价(不含税)：{{ product?.price }}</p>
              <p>商品售价(不含税)：{{ product?.totalPrice }}</p>
              <p>商品折扣：{{ product?.discountAmount }}</p>
              <p>商品税金：{{ product?.taxes }}</p>
              <p>商品买家支付运费：{{ product?.freightAmount }}</p>
              <p>小费：{{ product?.tipAmount }}</p>
            </div>
          </div>

          <p class="red" v-if="row.systemRemark">系统备注：{{ row.systemRemark }}</p>
          <p class="red" v-if="row.dingRemark">钉钉审核备注：{{ row.dingRemark }}</p>
          <p class="red" v-if="row.remark">订单备注：{{ row.remark }}</p>
          <p class="red" v-if="row.errorRemark">异常信息：{{ row.errorRemark }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" min-width="160px" label="订单金额">
        <template #default="{ row }">
          <p>订单售价(不含税)：{{ row?.realTransactionAmount }}</p>
          <p>订单折扣：{{ row.discountAmount }}</p>
          <p>订单税金：{{ row.taxes }}</p>
          <p>订单买家支付运费：{{ row.freightAmount }}</p>
          <p>小费：{{ row?.tipAmount }}</p>
          <!--          <p>销售运费：{{ row.salesFreightAmount }}</p>
          <p>佣金：{{ row.commission }}</p>
          <p>交易额：{{ row.transactionAmount }}</p>
          <p>实际交易额：{{ row.realTransactionAmount }}</p>-->
        </template>
      </el-table-column>
      <el-table-column prop="productBarcode" min-width="260px" label="发货信息">
        <template #default="{ row }">
          <p>国家或地区：{{ row.buyerCountryDesc }}</p>
          <p>发货时间：{{ row.sendTime || '-' }}</p>
          <p>发货仓：{{ row.warehouseDesc }}</p>
          <p>
            跟踪号：
            <a v-if="row.trackOrderCode" target="_blank" :href="row.trackOrderCodeUrl">
              {{ row.trackOrderCode }}
            </a>
            <template v-else>-</template>
          </p>
          <p>收件人：{{ row.buyerName }}</p>
          <p>收件人电话：{{ row.buyerPhone }}</p>
          <p>仓库配送：{{ row.shippingDesc }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="estimateShipDate" min-width="240px" label="日期">
        <template #default="{ row }">
          <p>付款：{{ row?.payTime }}</p>
          <!--          <p>创建：{{ row.createTime }}</p>
          <p>审核：{{ row.osAuthTime }}</p>
          <p>发货：{{ row.sendTime }}</p>
          <p>预计到货：{{ row.expectedArrivalTime }}</p>
          <p>签收：{{ row.signTime }}</p>
          <p>期望发货：{{ row?.platformExpectedSendTime }}</p>
          <p>
            平台送达：{{ row?.operationExpectedArrivalTime || '暂无' }} -
            {{ row?.operationExpectedArrivalTimeEnd || '暂无' }}
          </p>-->
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="240px">
        <template #default="{ row }">
          <div class="fs-7">{{ row?.customerRemark }}</div>
          <div
            class="fs-7"
            v-for="item in row?.remarkList?.filter((_, index) =>
              row.showFlag ? index >= 0 : index < 2
            )"
            :key="item?.id"
          >
            <OverflowTooltip :content="item?.remark" :line="1" />
          </div>
          <div
            v-show="row?.remarkList?.length > 2 && !row.showFlag"
            @click="row.showFlag = !row.showFlag"
            class="text-center cursor-pointer arrows-icon-down"
          >
            <svgIcon icon="arrows-arr072" class="svg-icon svg-icon-1 text-primary" />
          </div>
          <div
            v-show="row?.remarkList?.length > 2 && row.showFlag"
            @click="row.showFlag = !row.showFlag"
            class="text-center cursor-pointer arrows-icon-up"
          >
            <svgIcon icon="arrows-arr073" class="svg-icon svg-icon-1 text-primary" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="170px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide:
                  !(row.orderStatus >= 500 && row.orderStatus < 600 && row.orderStatus !== 503) &&
                  row.orderStatus !== 101,
                row: row,
                permissionCode: 'shopifyOrderEdit',
              },
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'shopifyOrderDetail',
              },
              /*{
                label: '审核',
                key: 'audit',
                type: 'primary',
                text: true,
                row: row,
                hide: ![202].includes(row.orderStatus) || !row.button?.showAuthButton,
                permissionCode: 'shopifyOrderAudit',
              },*/
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: [400, 600].includes(+row.orderStatus),
                row: row,
                permissionCode: 'shopifyOrderCancel',
              },
              {
                label: '拆单',
                key: 'subOrder',
                type: 'primary',
                text: true,
                hide: ![102, 503].includes(+row.orderStatus),
                row: row,
                permissionCode: 'shopifyOrderSubOrder',
              },
              {
                label: '附件',
                key: 'attachment',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'shopifyOrderDetail',
              },
              {
                label: '备注',
                key: 'remark',
                type: 'primary',
                text: true,
                row: row,
                // permissionCode: 'shopifyOrderRemark',
              },
              {
                label: '换货',
                key: 'exchange',
                type: 'primary',
                text: true,
                hide: [300, 400, 600].includes(+row.orderStatus),
                row: row,
                // permissionCode: 'internalOrderExchange',
              },
              {
                label: '确认发货',
                key: 'send',
                type: 'primary',
                text: true,
                hide: row.orderStatus !== 200,
                row,
              },
              {
                label: '重新生成单据',
                key: 'reGenerate',
                type: 'primary',
                text: true,
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
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :params="search"
    @close="batchUpdate"
    :order-code-list="codeList"
  />
  <BatchAuditModal
    v-if="batchAuditVisible"
    :visible="batchAuditVisible"
    :params="search"
    @close="batchAudit"
    @time-out="handleTimeout"
    :order-code-list="codeList"
    :batch-audit-type="batchAuditType"
  />
  <RemarkDialog ref="remarkRef" @success="refreshList" />
  <ExchangeDialog ref="exchangeDialogRef" @success="refreshList" />
</template>

<script lang="ts" setup name="shopifyOrder">
  import { metaApi, erpApi, memberApi, ErpApi, platformApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useTask from '@/store/modules/task';
  import { B2BOrderRefresh, stopB2BOrderRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import BatchUpdateModal from '@/views/supplyChainManage/B2BOrder/orderManage/components/BatchUpdateModal.vue';
  import { DictBean } from '@/api/erp/data-contracts';
  import BatchAuditModal from '@/views/supplyChainManage/B2BOrder/orderManage/components/BatchAuditModal.vue';
  import RemarkDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/RemarkDialog.vue';
  import ExchangeDialog from '@/views/supplyChainManage/B2BOrder/internalOrder/components/exchangeDialog.vue';

  const searchType = ref('0');

  const searchTypeMap = {
    0: {
      key: 'orderCode',
      label: '订单号',
      placeholder: '订单号(多个可用空格或逗号分隔)',
    },
    1: {
      key: 'productName',
      label: '产品名称',
      placeholder: '产品名称',
    },
    2: {
      key: 'customerName',
      label: '客户名称',
      placeholder: '客户名称',
    },
    3: {
      key: 'skuCode',
      label: '产品SKU',
      placeholder: '产品SKU',
    },
    4: {
      key: 'supplySku',
      label: '供应链SKU',
      placeholder: '供应链SKU',
    },
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    // { status: '100', code: 'waitConfirm', statusName: '待确认', count: '' },
    { status: '200', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '300', code: 'waitSend', statusName: '待发货', count: '' },
    { status: '400', code: 'send', statusName: '已发货', count: '' },
    { status: '500', code: 'error', statusName: '异常', count: '' },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const store = useTask();
  const user = useStore();
  const statusColorMap = {
    100: 'blue',
    101: 'blue',
    102: 'blue',
    200: 'purple',
    201: 'purple',
    300: 'yellow',
    400: 'green',
    500: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    504: 'red',
    505: 'red',
    506: 'red',
    507: 'red',
    600: 'gray',
  };
  const time = ref<any>([]);
  const expectedSendTime = ref<any>([]);
  const expectedArrivalTime = ref<any>([]);
  const router = useRouter();
  const timeType = ref<number>(1);
  const handleTimeChange = (val) => {
    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    search.signInTimeStart = undefined;
    search.signInTimeEnd = undefined;
    search.sendTimeStart = undefined;
    search.sendTimeEnd = undefined;
    search.operationExpectedArrivalTimeStart = undefined;
    search.operationExpectedArrivalTimeEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.createTimeStart = val[0] || '';
        search.createTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.signInTimeStart = val[0] || '';
        search.signInTimeEnd = val[1] || '';
      } else if (timeType.value === 3) {
        search.sendTimeStart = val[0] || '';
        search.sendTimeEnd = val[1] || '';
      } else if (timeType.value === 4) {
        search.operationExpectedArrivalTimeStart = val[0] || '';
        search.operationExpectedArrivalTimeEnd = val[1] || '';
      }
    }
  };

  const PAGE_SIZE = 10;
  const tableRef = ref();
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
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpOrderQueryList.RequestBody,
    ErpApi.LuteosErpOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      orderCode: undefined,
      customerName: undefined,
      productName: undefined,
      skuCode: undefined,
      supplySku: undefined,
      creator: '',
      creatorList: [],
      orderBigStatus: '',
      createTimeEnd: undefined,
      createTimeStart: undefined,
      signInTimeStart: undefined,
      signInTimeEnd: undefined,
      sendTimeStart: undefined,
      sendEndStart: undefined,
      type: 4 /* 类型：0-红人发样单 1-线下订单 */,
      meReview: undefined,
      shippingCode: undefined,
      warehouseCode: undefined,
      amountMin: undefined,
      amountMax: undefined,
      auditCode: undefined,
      platformExpectedSendTimeStart: undefined,
      platformExpectedSendTimeEnd: undefined,
      operationExpectedArrivalTimeStart: undefined,
      operationExpectedArrivalTimeEnd: undefined,
      countryCodeList: undefined,
      customerTypeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOrderQueryList,
  });

  const handleSearchTypeChange = () => {
    for (const index in searchTypeMap) {
      if (index !== searchType.value) {
        search[searchTypeMap[index].key] = undefined;
      }
    }
  };

  const creatorList: any = ref([]);
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
  const initDickBook = async () => {
    await getCreatorList();
  };

  const remarkRef = ref();
  const exchangeDialogRef = ref();
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'shopifyOrderDetail',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'attachment') {
      const path = router.resolve({
        name: 'shopifyOrderDetail',
        query: { code: row.erpCode, activated: 3 },
      });
      router.push(path.href);
    } else if (key === 'copy') {
      const path = router.resolve({
        name: 'shopifyOrderAdd',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancelOrder(row);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'shopifyOrderEdit',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'audit') {
      const path = router.resolve({
        name: 'shopifyOrderAudit',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'subOrder') {
      const path = router.resolve({
        name: 'shopifyOrderSubOrder',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'remark') {
      remarkRef.value.open([row.erpCode]);
    } else if (key === 'exchange') {
      exchangeDialogRef.value?.open(row?.itemBeanList, row.erpCode);
    } else if (key === 'send') {
      const isConfirmed = await swal.confirm('订单确定要确认发货吗？');
      if (isConfirmed) {
        await erpApi.luteosErpOrderBatchConfirmSend({
          erpCodeList: [row.erpCode],
          type: 4,
        });
        ElMessage.success('操作成功');
        refreshList();
      }
    } else if (key === 'reGenerate') {
      const isConfirmed = await swal.confirm('订单确定要重新生成吗？');
      if (isConfirmed) {
        const res = await erpApi.luteosErpOrderShopifyMockSave({
          erpCode: row.erpCode,
        });
        ElMessage.success('已重新生成');
        search.orderCode = res;
      }
    }
  };
  const cancelOrder = async (row) => {
    const res = await swal.confirm({
      title: `确认作废`,
    });
    if (res) {
      await erpApi.luteosErpOrderAbandon({
        erpCode: row.erpCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  /* const handleRefresh = async () => {
    await erpApi.luteosErpPlatformRefresh({
      modelCode: 'ERP_ORDER',
      forceRefresh: true,
      param: {
        type: 1,
      },
    });
    store.taskMap.shopifyOrderSync = true;
    shopifyOrderRefresh(user.token as string);
  }; */

  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      tableRef.value.clearSelection();
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 超时处理
  const handleTimeout = () => {
    tableRef.value.clearSelection();
    refreshList();
    batchUpdateVisible.value = false;
  };

  // 批量审核
  const batchAuditVisible = ref<boolean>(false);
  const batchAuditType = ref<string>('');

  const batchAudit = (reload) => {
    if (reload) {
      tableRef.value.clearSelection();
      refreshList();
    }
    batchAuditVisible.value = false;
  };

  const batchAbandon = async () => {
    const isConfirmed = await swal.confirm('订单确定要全部作废吗？');
    if (!isConfirmed) return;
    const res = await erpApi.luteosErpOrderBatchAbandon({
      orderCodeList: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res?.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('作废成功');
    }
    tableRef.value.clearSelection();
    refreshList();
  };

  // 批量转待审核
  const batchToAudit = async () => {
    const isConfirmed = await swal.confirm('订单确定要全部转待审核状态吗？');
    if (!isConfirmed) return;
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item.orderStatus !== 101 && item.orderStatus !== 506)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非草稿或ec缺货(os)状态，请重新选择`);
      return;
    }
    const res = await erpApi.luteosErpOrderBatchToAudit({
      orderCodeList: codeList.value,
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('转待审核成功');
    }
    tableRef.value.clearSelection();
    refreshList();
  };

  // 表格选择
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.erpCode);
  };

  // 批量发货
  const batchSend = async () => {
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item.orderStatus !== 200)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}不能发货，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('确定批量发货吗？');
    if (isConfirmed) {
      await erpApi.luteosErpOrderBatchConfirmSend({
        erpCodeList: codeList.value,
        type: 4,
      });
      ElMessage.success('操作成功');
      tableRef.value.clearSelection();
      refreshList();
    }
  };

  // 配送方式
  const shippingMap = ref<DictBean[]>([]);
  const queryAllShipping = async () => {
    const res = await erpApi.luteosErpOrderQueryAllShipping({
      type: 1,
    });
    shippingMap.value = res || [];
  };

  // 发货仓库
  const warehouseMap = ref<DictBean[]>([]);
  const queryAllWarehouse = async () => {
    const res = await erpApi.luteosErpOrderQueryAllWarehouse({
      type: 1,
    });
    warehouseMap.value = res || [];
  };

  const handleTabChange = (val) => {
    tableRef.value?.clearSelection();
  };

  const b2bClientType = ref([]);
  const queryB2bClientType = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['b2b_client_type'],
    });
    b2bClientType.value = res?.dictMap?.b2b_client_type;
  };

  const reset = () => {
    time.value = [];
    expectedSendTime.value = [];
    expectedArrivalTime.value = [];
    resetSearch();
  };

  onMounted(() => {
    initDickBook();
    queryB2bClientType();
    queryAllShipping();
    queryAllWarehouse();
    // shopifyOrderRefresh(user.token as string);
  });

  onBeforeUnmount(() => {
    // stopshopifyOrderRefresh();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }

  :deep(.border-table.el-table .el-table__cell > .cell) {
    padding-left: 12px;
  }

  :deep(.border-table.el-table .el-table__cell.is-right > .cell) {
    padding-right: 12px;
  }

  :deep(.el-table th.el-table__cell.is-leaf, .el-table td.el-table__cell) {
    border-bottom-style: solid !important;
  }

  :deep(.el-table.table-row-dashed th),
  :deep(.el-table.table-row-dashed td) {
    border-bottom-style: solid !important;
  }

  :deep(.el-table tbody tr:last-child) {
    td {
      border-bottom-color: #f4f4f4;
    }
  }

  :deep(.el-table .el-table__cell) {
    vertical-align: top;
    p {
      margin-bottom: 4px;
    }
  }
  :deep(.el-table__cell) {
    vertical-align: top;
  }

  // :deep(.border-table.el-table th.el-table__cell) {
  //   color: #000;
  // }
  .multi-supplySku {
    background-color: orange;
    color: #fff;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 2px;
    vertical-align: middle;
    margin-right: 4px;

    & + span {
      vertical-align: middle;
    }
  }

  .red {
    color: #f1416c;
    margin-top: 4px;
  }

  :deep(.el-button > span) {
    display: unset;
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
