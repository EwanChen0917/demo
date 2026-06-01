<template>
  <el-tabs v-model="search.status" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ (listData as any)?.statusStatistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 325px"
        v-model="search.keyword"
        placeholder="提货单号/商品名称/供应链SKU"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-if="store.userInfo.source !== 1"
        style="width: 120px"
        v-model="search.supplierCode"
        placeholder="供应商"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="item of supplierList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <el-table v-loading="listLoading" :data="listData?.recordList">
      <el-table-column prop="code" label="送货单号" />
      <el-table-column prop="supplierName" label="供应商名称" />
      <el-table-column prop="sendQty" label="预计送货数量" />
      <el-table-column prop="sendTime" label="预计到货时间" />
      <el-table-column prop="sendBoxQty" label="预计箱数" />
      <el-table-column prop="prebookCode" label="预约入库单号">
        <template #default="{ row }">
          <router-link
            target="_blank"
            :to="{
              name: 'reservationInboundDetail',
              query: { code: row.prebookCode },
            }"
          >
            {{ row.prebookCode }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template #default="{ row }">
          <div class="d-flex align-items-center">
            <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
            <el-tooltip
              v-if="row?.status === 2"
              :content="row?.errorRemark"
              placement="top"
              effect="dark"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
                permissionCode: 'deliveryManageDetail',
              },
              {
                label: '收货',
                key: 'receive',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.status) || row.sendStatus === 1,
                row: row,
                permissionCode: 'deliveryManageReceive',
              },
              {
                label: '管理员收货',
                key: 'adminReceive',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.status),
                row: row,
                permissionCode: 'deliveryManageAdminReceive',
              },
              {
                label: '重推',
                key: 'retry',
                type: 'primary',
                text: true,
                hide: ![2].includes(+row.status),
                row: row,
                permissionCode: 'deliveryManageRetry',
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

<script lang="ts" setup name="deliveryManage">
  import { erpApi, ErpApi, platformApi, dataApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';
  import { QuestionFilled } from '@element-plus/icons-vue';

  const store = useStore();
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: 'waitReceive', statusName: '待收货', count: '' },
    { status: '1', code: 'receive', statusName: '已收货', count: '' },
    { status: '2', code: 'error', statusName: '异常', count: '' },
  ];
  const colorMap = {
    0: 'blue',
    1: 'green',
    2: 'red',
    3: 'gray',
  };
  const router = useRouter();
  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };

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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpPlanDeliveryBillQueryList.RequestBody,
    ErpApi.LuteosErpPlanDeliveryBillQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: code,
      supplierCode: '',
      status: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanDeliveryBillQueryList,
  });
  const handleTabChange = () => {
    nextTick(() => {
      runQuery();
    });
  };
  const supplierList = ref<any>([]);
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierList.value = res.supplierList!.map((item) => {
      return {
        label: item.supplierName,
        value: item.supplierCode,
      };
    });
  };

  const initDickbook = async () => {
    getSupplierList();
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'deliveryManageDetail',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'receive' || key === 'adminReceive') {
      const path = router.resolve({
        name: 'deliveryManageReceive',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'retry') {
      const res = await swal.confirm({
        title: `异常单据确定重推吗？`,
      });
      if (res) {
        await erpApi.luteosErpPlanDeliveryBillRetryEc({
          code: row.code,
        });
        ElMessage.success('操作成功');
        runQuery();
      }
    }
  };
  onMounted(() => {
    initDickbook();
  });
  const deliverDialogRef = ref();
  const importUpdateDialogRef = ref();
  const importDeliverDialogRef = ref();
</script>

<style scoped lang="scss"></style>
