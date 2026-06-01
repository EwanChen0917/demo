<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>已兑换用户</h2>
      </div>
    </div>
    <div class="card-body p-0">
      <KeenList
        @refresh="refreshList"
        @reset-search="resetSearch"
        @reset-search-by-key="(key) => (search[key] = undefined)"
      >
        <template #search>
          <el-input v-model="search.email" placeholder="用户邮箱">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-input v-model="search.uid" placeholder="用户ID">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </template>
        <!-- <template #buttons>
          <el-button class="button" type="primary" @click="refreshList">查询</el-button>
        </template> -->

        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :data="listData?.userPointProductList"
          row-key="uid"
        >
          <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
          <el-table-column prop="uid" label="用户ID" />
          <el-table-column prop="email" label="用户邮箱" />
          <el-table-column prop="registerChannel" label="注册平台" />
          <el-table-column prop="registerTime" label="注册时间" />
          <el-table-column prop="countryName" label="国家" />
          <el-table-column prop="points" label="积分" />
          <el-table-column prop="orderCount" label="订单数" />
          <el-table-column
            v-if="productType === PointProductType.亚马逊商品券"
            prop="ticketCodes"
            label="亚马逊商品券码"
          />
          <el-table-column label="操作" align="right">
            <template #default="scope">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    text: true,
                    payload: { uid: scope.row.uid },
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useList from '@/hooks/list/useList';
  import { pointApi, PointApi } from '@/api/index';
  import { PointProductType } from '@/types/api';

  const router = useRouter();

  const props = defineProps<{
    productCode: string;
    productType: PointProductType;
  }>();

  const emit = defineEmits<{
    (event: 'totalChanged', val: number): void;
  }>();

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
    resetSearch,
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    PointApi.LuteosPointUserProductQueryUserPointProductList.RequestQuery,
    PointApi.LuteosPointUserProductQueryUserPointProductList.ResponseBody
  >({
    searchDefaults: {
      productCode: props.productCode,
      email: undefined,
      uid: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: pointApi.luteosPointUserProductQueryUserPointProductList,
  });
  watchEffect(() => {
    emit('totalChanged', total.value);
  });

  // 表格操作
  const handleActions = (item) => {
    const {
      key,
      payload: { uid },
    } = item;

    if (key === 'view') {
      router.push(`/userlist/detail?uid=${uid}`);
    }
  };
</script>
