<template>
  <el-tabs v-model="search.bookStatus" tab-position="top" @tab-change="handleTabChange">
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
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 350px"
        v-model="search.keyword"
        placeholder="预约入库单号/商品名称/供应链SKU"
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
        v-model="search.checkerCode"
        placeholder="审核人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.memberList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
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
          :label="item.label"
          :value="item.value"
          v-for="item of dickbook.supplierList"
          :key="item.value"
        />
      </el-select>
    </template>
    <vxe-table
      border="inner"
      max-height="900px"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="prebookCode" title="预约入库单号" />
      <vxe-column field="supplierName" title="供应商名称" />
      <vxe-column field="estimateShipQty" title="预计送货数量" />
      <vxe-column field="estimateArriveDate" title="预计到货时间" />
      <vxe-column field="estimateBoxCount" title="预计箱数" />
      <vxe-column field="submitOrderCode" title="提货单号" />
      <vxe-column field="sendOrderCode" title="送货单号" />
      <vxe-column field="checkerName" title="审核人" />
      <vxe-column field="shipper" title="状态">
        <template #default="{ row }">
          <Tag :color="colorMap[row.bookStatus]">{{ row.bookStatusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作">
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
                permissionCode: 'reservationInboundDetail',
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: ![1, 2].includes(+row.bookStatus),
                row: row,
                permissionCode: 'reservationInboundEdit',
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: ![1].includes(+row.bookStatus),
                row: row,
                permissionCode: 'reservationInboundCancel',
              },
              {
                label: '送货',
                key: 'pickup',
                type: 'primary',
                text: true,
                row: row,
                hide: ![3].includes(+row.bookStatus),
                permissionCode: 'reservationInboundSend',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </vxe-column>
    </vxe-table>
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

<script lang="ts" setup name="reservationInbound">
  import { erpApi, ErpApi, platformApi, dataApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';

  const store = useStore();
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '1', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '2', code: 'authNoPass', statusName: '审核不通过', count: '' },
    { status: '3', code: 'waitSend', statusName: '待送货', count: '' },
    { status: '4', code: 'send', statusName: '已送货', count: '' },
    { status: '5', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const colorMap = {
    1: 'blue',
    2: 'red',
    3: 'yellow',
    4: 'green',
    5: 'black',
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
    ErpApi.LuteosErpPlanPrebookInboundQueryInboundOrder.RequestBody,
    ErpApi.LuteosErpPlanPrebookInboundQueryInboundOrder.ResponseBody
  >({
    searchDefaults: {
      keyword: code,
      checkerCode: '',
      supplierCode: '',
      bookStatus: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPrebookInboundQueryInboundOrder,
  });
  const handleTabChange = () => {
    nextTick(() => {
      runQuery();
    });
  };
  // const creatorList: any = ref([]);
  // const getCreatorList = async () => {
  //   const res = await memberApi.luteosMemberQueryDeptMemberList({
  //     operatorDepartmentCode: 'all_dept',
  //   });
  //   creatorList.value =
  // };
  const getCreatorList = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    return {
      memberList: res.all_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
    };
  };
  // 供应商下拉列表
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    return res.supplierList!.map((item) => {
      return {
        label: item.supplierName,
        value: item.supplierCode,
      };
    });
  };
  const dickbook: any = ref({
    memberList: [],
    supplierList: [],
  });
  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    const supplierList = await getSupplierList();
    dickbook.value = { ...memeberList, supplierList };
  };

  const addVisible = ref<boolean>(false);
  const curCommandCode = ref<string>('');
  const add = () => {
    const path = router.resolve({
      name: 'reservationInboundAdd',
    });
    router.push(path.href);
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'reservationInboundDetail',
        query: { code: row.prebookCode },
      });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'reservationInboundEdit',
        query: { code: row.prebookCode },
      });
      router.push(path.href);
    } else if (key === 'deliver') {
      addVisible.value = true;
      curCommandCode.value = row.commandCode;
      // deliverDialogRef.value.open(row);
    } else if (key === 'cancel') {
      cancelOrder(row, '作废');
    } else if (key === 'pickup') {
      send(row, '送货');
    }
  };
  const cancelOrder = async (row, title: string) => {
    const res = await swal.confirm({
      title: `确认${title}？`,
    });
    if (res) {
      await erpApi.luteosErpPlanPrebookInboundDelete({
        prebookCode: row.prebookCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  const send = async (row, title: string) => {
    const res = await swal.confirm({
      title: `确认${title}？`,
    });
    if (res) {
      await erpApi.luteosErpPlanPrebookInboundShip({
        prebookCode: row.prebookCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss"></style>
