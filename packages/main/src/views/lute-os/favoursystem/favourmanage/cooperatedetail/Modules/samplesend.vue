<template>
  <KeenList>
    <div class="apply-btn">
      <el-button
        class="apply-btn"
        type="primary"
        @click="applySampleSend"
        v-permission="'influencerSend'"
      >
        新增红人发样
      </el-button>
    </div>
    <el-table
      class="border-table"
      border
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
      max-height="900px"
    >
      <el-table-column min-width="340px" label="订单详情">
        <template #default="{ row }">
          <p>
            订单号：{{ row.sampleCode }}
            <Tag :color="statusColorMap[row.orderStatus]">{{ row.orderStatusDesc }}</Tag>
          </p>
          <p>易仓订单号：{{ row.orderCode || '-' }}</p>
          <p>红人账号：{{ row.metaAccount || '-' }}</p>
          <p>卖家账号：{{ row.shopAccount || '-' }}</p>
          <p>创建人：{{ row.creator || '-' }}</p>
          <p>原订单：{{ row.psampleCode || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="660px" label="订单明细">
        <template #default="{ row }">
          <el-row
            :gutter="20"
            style="margin-bottom: 8px"
            v-for="product of row.itemBeanList"
            :key="product.skuCode"
          >
            <el-col :span="24">产品名称：{{ product.productName }}</el-col>
            <el-col :span="12">供应链SKU：{{ product.supplySku }}</el-col>
            <el-col :span="6">数量：{{ product.num }}</el-col>
            <el-col :span="6">单价：{{ product.price }}</el-col>
          </el-row>
          <p class="red" v-if="row.systemRemark">系统备注：{{ row.systemRemark }}</p>
          <p class="red" v-if="row.dingRemark">钉钉审核备注：{{ row.dingRemark }}</p>
          <p class="red" v-if="row.errorRemark">异常信息：{{ row.errorRemark }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" min-width="140px" label="订单金额">
        <template #default="{ row }">
          <p>总金额：{{ row.amount }}</p>
          <p>运费：{{ row.freightAmount }}</p>
          <p>交易额：{{ row.transactionAmount }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="productBarcode" min-width="260px" label="发货信息">
        <template #default="{ row }">
          <p>收件人：{{ row.buyerName }}</p>
          <p>收件人电话：{{ row.buyerPhone }}</p>
          <p>国家或地区：{{ row.buyerCountryDesc }}</p>
          <p>发货仓库：{{ row.warehouseDesc }}</p>
          <p>仓库配送：{{ row.shippingDesc }}</p>
          <p>
            跟踪号：
            <a v-if="row.trackOrderCode" target="_blank" :href="row.trackOrderCodeUrl">
              {{ row.trackOrderCode }}
            </a>
            <template v-else>-</template>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="estimateShipDate" min-width="240px" label="日期">
        <template #default="{ row }">
          <p>创建：{{ row.createTime }}</p>
          <p>审核：{{ row.dingAuthTime }}</p>
          <p>发货：{{ row.sendTime }}</p>
          <p>预计到货：{{ row.expectedArrivalTime }}</p>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" min-width="170px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: [400, 600].includes(+row.orderStatus),
                row: row,
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
</template>

<script lang="ts" setup>
  import { metaApi, MetaApi, erpApi, platformApi, dataApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useTask from '@/store/modules/task';
  import { sampleorderRefresh, stopSampleorderRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';

  const props = defineProps<{
    projectDetail: Object;
  }>();
  const route = useRoute();
  const { projectCode } = route.query;
  const statusColorMap = {
    200: 'purple',
    201: 'purple',
    300: 'yellow',
    400: 'green',
    500: 'red',
    504: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    600: 'gray',
  };
  const router = useRouter();
  const PAGE_SIZE = 10;
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
    runQuery,
  } = useList<
    MetaApi.LuteosMetaV3SampleorderQueryList.RequestQuery,
    MetaApi.LuteosMetaV3SampleorderQueryList.ResponseBody
  >({
    searchDefaults: {
      projectCode,
    },
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaV3SampleorderQueryList,
  });

  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'samplesendDetail',
        query: { code: row.sampleCode },
      });
      router.push(path.href);
    } else if (key === 'copy') {
      const path = router.resolve({
        name: 'influencerSend',
        query: { code: row.sampleCode, projectCode: row.projectCode },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancelOrder(row);
    }
  };
  const cancelOrder = async (row) => {
    const res = await swal.confirm({
      title: `确认作废`,
    });
    if (res) {
      await metaApi.luteosMetaV3SampleorderAbandon({
        orderCode: row.sampleCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  const applySampleSend = () => {
    const path = router.resolve({
      name: 'influencerSend',
      query: {
        projectCode,
        userCode: props.projectDetail.userCode,
        account: props.projectDetail.userName,
        brandCode: props.projectDetail.brandCode,
      },
    });
    router.push(path.href);
  };
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

  .apply-btn {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }
</style>
