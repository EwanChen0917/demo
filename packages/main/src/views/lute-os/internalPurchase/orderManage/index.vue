<template>
  <el-tabs v-model="search.status" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.orderStatus[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList hideResetButton>
    <template #search>
      <el-select v-model="searchType" style="width: 150px" @change="handleSearchTypeChange">
        <el-option
          v-for="(item, key) in searchTypeMap"
          :value="key"
          :label="item.label"
          :key="key"
        />
      </el-select>
      <el-input
        v-model="search[searchTypeMap[searchType].key]"
        :placeholder="searchTypeMap[searchType]?.placeholder"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="search.time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始日期"
        end-placeholder="创建结束日期"
        value-format="YYYY-MM-DD"
      />
      <DeptMember
        v-if="!isSelf"
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <ExportBtn
        :ignore-app-code="true"
        v-if="!isSelf"
        :service="productApi.luteosProductMallExportOrder"
        :params="{
          ...search,
          startDate: search.time ? search.time[0] : undefined,
          endDate: search.time ? search.time[1] : undefined,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.orderList"
      row-key="orderCode"
      class-name="internal-order-table"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="订单详情" min-width="220">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            <div style="word-break: break-all">
              订单号：{{ row?.orderCode }}
              <Copy :content="row?.orderCode" />
            </div>

            <Tag v-if="row?.status" :color="statusColorMap[row?.status]">{{ row?.statusDesc }}</Tag>
          </div>
          <div v-if="!isSelf">创建人：{{ row?.creatorName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="订单明细" min-width="280">
        <template #default="{ row }">
          <div class="d-flex flex-column" style="row-gap: 12px">
            <GoodsInfo
              v-for="item in row?.orderItemList?.filter((_, index) =>
                row.showFlag ? index >= 0 : index < 2
              )"
              :key="item.productSku"
              :src="item.imageUrl"
              :title="item.productName"
              :subtitle="item.productSku"
              copy-title
              copy-subtitle
            >
              <template #description>
                <div class="d-flex gap-10">
                  <span>单价：¥{{ item.price }}</span>
                  <span>数量：{{ item.quantity }}</span>
                </div>
              </template>
            </GoodsInfo>
          </div>
          <div
            v-show="row?.orderItemList?.length > 2 && !row.showFlag"
            @click="row.showFlag = !row.showFlag"
            class="text-center cursor-pointer arrows-icon-down"
          >
            <svgIcon icon="arrows-arr072" class="svg-icon svg-icon-1 text-primary" />
          </div>
          <div
            v-show="row?.orderItemList?.length > 2 && row.showFlag"
            @click="row.showFlag = !row.showFlag"
            class="text-center cursor-pointer arrows-icon-up"
          >
            <svgIcon icon="arrows-arr073" class="svg-icon svg-icon-1 text-primary" />
          </div>
          <div class="text-danger fs-7" v-if="row?.status === 'EXCEPTION'">
            异常：{{ row?.errorMsg || '' }}
          </div>
          <div class="text-info fs-7" v-if="row?.status === 'PAID' && row?.errorMsg">
            异常：{{ row?.errorMsg || '' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" min-width="120">
        <template #default="{ row }">
          <div class="fs-7">订单总价：¥{{ row?.totalAmount }}</div>
          <div class="fs-7">实付款：¥{{ row?.subtotalAmount || '-' }}</div>
          <div class="fs-7">运费：¥{{ row?.freightAmount || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="时间" min-width="160">
        <template #default="{ row }">
          <div class="fs-7">创建：{{ row?.createTime }}</div>
          <div class="fs-7">付款：{{ row?.paymentTime || '-' }}</div>
          <div class="fs-7">发货：{{ row?.deliveryTime || '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="收货信息" min-width="170">
        <template #default="{ row }">
          <div class="fs-7">收件人：{{ row?.receiverName || '-' }}</div>
          <div class="fs-7">收件人电话：{{ row?.receiverPhone || '-' }}</div>
          <div class="fs-7">
            收件人地址：{{ row?.provinceName }}{{ row?.cityName }}{{ row?.areaName
            }}{{ row?.address }}
          </div>
          <div class="fs-7 d-flex">
            <div class="flex-shrink-0">快递单号：</div>
            <div v-if="row?.trackingNum">
              <div v-for="(item, index) in row?.trackingNum?.split(',')" :key="index">
                <span
                  class="cursor-pointer text-primary"
                  style="word-break: break-word"
                  @click="toKuaiDi100(item)"
                >
                  {{ item }}
                </span>
                <Copy :content="item" />
              </div>
            </div>
            <span v-else>-</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '付款',
                key: 'pay',
                type: 'primary',
                hide: row?.status !== 'PENDING' || !isSelf,
                permissionCode: '',
                row,
              },
              {
                label: '进群',
                key: 'group',
                type: 'primary',
                hide: row?.status !== 'PAID' || row?.totalAmount > 0 || !isSelf,
                permissionCode: '',
                row,
              },
              {
                label: isSelf ? '取消订单' : '关闭订单',
                key: 'close',
                type: 'danger',
                hide:
                  (row?.status !== 'PENDING' && row?.status !== 'PAID') ||
                  (row?.status === 'PAID' && row?.totalAmount !== 0),
                permissionCode: '',
                row,
              },
              {
                label: '手动发货',
                key: 'ship',
                type: 'primary',
                hide: row?.status !== 'PAID' || isSelf,
                permissionCode: '',
                row,
              },
              {
                label: '修改地址',
                key: 'editAddress',
                type: 'primary',
                hide: row?.errorStatus !== 510,
                row,
              },
              {
                label: '确认收货',
                key: 'claim',
                type: 'primary',
                hide: !showClaimAction(row),
                row,
              },
              /*{
                label: row?.trackingNum ? '修改快递单号' : '上传快递单号',
                key: 'uploadExpress',
                type: 'primary',
                hide: (row?.status !== 'SHIPPED' && row?.status !== 'PAID') || isSelf,
                permissionCode: '',
                row,
              },*/
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
  <CloseOrderDialog ref="closeOrderDialogRef" @success="refreshList" />
  <PayDialog ref="payDialogRef" @success="refreshList" />
  <GroupDialog ref="groupDialogRef" />
  <UploadExpressDialog ref="uploadExpressDialogRef" @success="refreshList" />
  <EditAddressDialog ref="editAddressDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="internalOrderManage">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { ProductApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import { omit } from 'lodash-es';
  import CloseOrderDialog from '@/views/lute-os/internalPurchase/components/closeOrderDialog.vue';
  import * as swal from '@/utils/swal';
  import { useStore } from '@/store/modules/useStore';
  import PayDialog from '@/views/lute-os/internalPurchase/shoppingCart/payDialog.vue';
  import GroupDialog from '@/views/lute-os/internalPurchase/shoppingCart/components/groupDialog.vue';
  import UploadExpressDialog from '@/views/lute-os/internalPurchase/components/uploadExpressDialog.vue';
  import { openWindow } from '@/utils';
  import { copyFn } from '@/utils/copyFn';
  import EditAddressDialog from '@/views/lute-os/internalPurchase/components/editAddressDialog.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import { maskAddress, maskName, maskPhone } from '@/utils/mask';

  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const props = defineProps<{
    mode?: string;
  }>();

  const isSelf = computed(() => {
    return props.mode === 'self';
  });

  const router = useRouter();

  const searchType = ref('0');

  const searchTypeMap = {
    0: {
      key: 'orderCode',
      label: '订单号',
      placeholder: '订单号',
    },
    1: {
      key: 'productTitle',
      label: '产品名称',
      placeholder: '产品名称',
    },
    4: {
      key: 'productSku',
      label: '供应链SKU',
      placeholder: '供应链SKU',
    },
  };

  const statusColorMap = {
    PENDING: 'blue',
    PAID: 'purple',
    SHIPPED: 'green',
    CLOSED: 'red',
    EXCEPTION: 'red',
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 'PENDING', code: 'pendingCount', statusName: '待付款', count: '' },
    { status: 'PAID', code: 'paidCount', statusName: '待发货', count: '' },
    { status: 'SHIPPED', code: 'shippedCount', statusName: '已发货', count: '' },
    { status: 'EXCEPTION', code: 'exceptionCount', statusName: '异常', count: '' },
    { status: 'CLOSED', code: 'closedCount', statusName: '关闭', count: '' },
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
    ProductApi.LuteosProductMallQueryOrderList.RequestQuery,
    ProductApi.LuteosProductMallQueryOrderList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      orderCode: undefined,
      productSku: undefined,
      productTitle: undefined,
      creator: isSelf.value ? userInfo.memberCode : undefined,
      operateType: isSelf.value ? 1 : 0,
      status: '',
      time: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { time } = searchData;
      return {
        ...omit(searchData, 'time'),
        startDate: time ? time[0] : undefined,
        endDate: time ? time[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: (query, params) =>
      productApi.luteosProductMallQueryOrderList(
        {
          ...query,
          operateType: isSelf.value ? 1 : 0,
        },
        params
      ),
  });

  const closeOrderDialogRef = ref();
  const payDialogRef = ref();
  const groupDialogRef = ref();
  const uploadExpressDialogRef = ref();
  const editAddressDialogRef = ref();

  const isSelfPickupOrder = (row) => {
    // console.log(row.receiveGoodsType);
    // return true;
    return row?.receiveGoodsType === 1;
  };

  const isPendingClaimOrder = (row) => {
    return row?.status === 'SHIPPED' && row?.isConfirmed !== 1;
  };

  const showClaimAction = (row) => {
    return isSelf.value && isSelfPickupOrder(row) && isPendingClaimOrder(row);
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row, label } = item;
    if (key === 'view') {
      router.push({
        path: `/internalPurchase/${isSelf.value ? 'orderCenter' : 'orderManage'}/detail`,
        query: {
          code: row.orderCode,
        },
      });
    } else if (key === 'close') {
      if (isSelf.value) {
        const isConfirmed = await swal.confirm('确认取消该订单？');
        if (!isConfirmed) return;
        await productApi.luteosProductMallOperateOrder({
          orderCode: row?.orderCode,
          operateType: 'cancel_order',
        });
        ElMessage.success('取消成功');
        refreshList();
      } else {
        closeOrderDialogRef.value?.open(row?.orderCode);
      }
    } else if (key === 'ship') {
      const isConfirmed = await swal.confirm('发货后订单不可撤销，是否确认发货？');
      if (isConfirmed) {
        await productApi.luteosProductMallOperateOrder({
          orderCode: row?.orderCode,
          operateType: 'manual_delivery',
        });
        ElMessage.success('发货成功');
        refreshList();
      }
    } else if (key === 'pay') {
      payDialogRef.value?.open(row?.qrCode, row?.totalAmount, row?.orderCode, row?.qrCodeOutOfTime);
    } else if (key === 'group') {
      groupDialogRef.value?.open();
    } else if (key === 'uploadExpress') {
      uploadExpressDialogRef.value?.open(row?.orderCode, row?.trackingNum, label);
    } else if (key === 'editAddress') {
      editAddressDialogRef.value?.open(row);
    } else if (key === 'claim') {
      const isConfirmed = await swal.confirm('是否确认收货？');
      if (!isConfirmed) return;
      await productApi.luteosProductMallConfirmReceive({
        orderCode: row?.orderCode,
      });
      refreshList();
      ElMessage.success('确认收货成功');
    }
  };

  const handleSearchTypeChange = () => {
    for (const index in searchTypeMap) {
      if (index !== searchType.value) {
        search[searchTypeMap[index].key] = undefined;
      }
    }
  };

  const toKuaiDi100 = (trackingNum: string) => {
    if (!trackingNum) return;
    copyFn(trackingNum, '单号');
    openWindow('https://www.kuaidi100.com');
  };
</script>

<style scoped lang="scss">
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

  :global(.internal-order-table .el-table__body tr td) {
    border-bottom: 1px solid #888 !important;
  }
</style>
