<template>
  <KeenList @refresh="refreshList">
    <div>优惠券/礼品卡</div>
    <!-- <template #buttons>
      <el-radio-group v-model="search.type">
        <el-radio-button :label="CouponType.优惠券">优惠券</el-radio-button>
        <el-radio-button :label="CouponType.礼品卡" disabled>礼品卡</el-radio-button>
      </el-radio-group>
    </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.userCoupons"
      row-key="discountCode"
    >
      <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
      <el-table-column prop="discountCode" label="Code" min-width="100" />
      <el-table-column label="优惠">
        <template #default="scope">
          {{
            scope.row.valueType === CouponValueType.固定金额
              ? `$${Math.abs(scope.row.value)}`
              : scope.row.valueType === CouponValueType.折扣
              ? `${Math.abs(scope.row.value)}%`
              : ''
          }}
        </template>
      </el-table-column>
      <el-table-column label="有效时间" min-width="200">
        <template #default="scope">
          {{ `${scope.row.startTime} - ${scope.row.endTime}` }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          {{ CouponStatus[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column label="使用时间">
        <template #default="scope">
          {{ scope.row.usageTime ?? '/' }}
        </template>
      </el-table-column>
      <el-table-column label="订单编号" min-width="100">
        <template #default="scope">
          {{ scope.row.orderCode ? `#${scope.row.orderCode}` : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" />
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
  import useList from '@/hooks/list/useList';
  import { userApi, UserApi, UserContracts } from '@/api/index';
  import { CouponValueType, CouponStatus, CouponType } from '@/types/api';

  const route = useRoute();
  const uid = route.query.uid as string;

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
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    // UserApi.LuteosUserQueryUserCoupons.RequestQuery & { type: CouponType },
    UserApi.LuteosUserQueryUserCoupons.RequestQuery,
    UserApi.LuteosUserQueryUserCoupons.ResponseBody
  >({
    searchDefaults: {
      uid,
      // type: CouponType.优惠券,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: userApi.luteosUserQueryUserCoupons,
  });
</script>
