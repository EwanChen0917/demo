<template>
  <div class="card card-flush">
    <div class="card-body pt-0">
      <h4 class="table-title">订单列表</h4>
      <p class="text-gray-400" v-if="total > 0">订单总数：{{ total }}</p>
      <el-table ref="tableRef" v-loading="listLoading" :data="listData?.luteOrders">
        <el-table-column prop="orderId" label="平台订单编号" min-width="150" />
        <el-table-column prop="ecOrderId" label="易仓订单编号" min-width="150">
          <template #default="scope">
            {{ scope.row.ecOrderId || '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="skus" label="商品ID（SKU）" min-width="120">
          <template #default="scope">
            <template v-if="scope.row.skus.length">
              <span v-for="sku in scope.row.skus" :key="sku">
                {{ sku }}
                <br />
              </span>
            </template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column prop="goodsNum" label="商品总数" />
        <el-table-column prop="goodsUnitPrice" label="商品金额" min-width="120">
          <template #default="scope">
            <span v-for="price in scope.row.goodsUnitPrice" :key="price">
              {{ price + ' ' + scope.row.currency }}
              <br />
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="订单金额" min-width="100">
          <template #default="scope">
            {{ scope.row.totalPrice + ' ' + scope.row.currency }}
          </template>
        </el-table-column>
        <el-table-column prop="purchaseTime" label="下单时间" min-width="160" />
        <el-table-column prop="paymentTime" label="付款时间">
          <template #default="scope">
            {{ scope.row.paymentTime || '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="platform" label="平台">
          <template #default="scope">
            {{ scope.row.platform || '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="financialStatusDesc" label="付款状态" />
        <el-table-column prop="fulfillmentStatusDesc" label="发货状态" />
        <el-table-column prop="shippingTitle" label="物流">
          <template #default="scope">
            {{ scope.row.shippingTitle || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <KeenActions
              :actions="[
                {
                  label: '查看详情',
                  key: 'view',
                  type: 'primary',
                  text: true,
                  orderId: scope.row.orderId,
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { userApi, UserApi } from '@/api/index';

  const router = useRouter();

  const route = useRoute();
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
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
  } = useList<
    UserApi.LuteosUserQueryUserOrders.RequestQuery,
    UserApi.LuteosUserQueryUserOrders.ResponseBody
  >({
    searchDefaults: {
      uid: route.query.uid || '',
    },
    pageSize: 10,
    service: userApi.luteosUserQueryUserOrders,
  });

  // 表格操作
  const handleActions = (item) => {
    const { key, orderId } = item;

    if (key === 'view') {
      router.push(`/userlist/userorderdetail?orderId=${orderId}`);
    }
  };
</script>

<style scoped lang="scss">
  .table-title {
    margin-top: 20px;
  }

  .text-gray-400 {
    font-weight: 600;
    margin-top: 20px;
  }
</style>
