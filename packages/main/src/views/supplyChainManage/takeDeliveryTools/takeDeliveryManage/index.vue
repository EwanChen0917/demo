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
        <span class="tab-count">({{ listData?.statisticsInfo[item.code] }})</span>
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
        v-model="search.keyword"
        placeholder="提货单号/商品名称/供应链SKU"
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of creatorList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button v-permission="'takeDeliveryManageAdd'" class="button" type="primary" @click="add">
        新增提货单
      </el-button>
    </template>
    <vxe-table
      max-height="900px"
      v-loading="listLoading"
      border="inner"
      :data="listData?.recordList"
    >
      <vxe-column field="code" title="提货单号" />
      <vxe-column field="supplierDesc" title="供应商名称" />
      <vxe-column field="skuTypeCount" title="SKU种类" width="100" />
      <vxe-column field="pickQtySum" title="总提货数量" />
      <vxe-column title="预约入库单号">
        <template #default="{ row }">
          <span
            class="cursor-pointer text-primary"
            @click="toReservationInbound(row.reserveStorageCode)"
          >
            {{ row.reserveStorageCode }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="creatorDesc" title="创建人" />
      <vxe-column field="pickTime" title="提货时间" />
      <vxe-column title="状态" width="100">
        <template #default="{ row }">
          <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                permissionCode: 'takeDeliveryManageDetail',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: ![0, 1].includes(+row.status),
                row: row,
                permissionCode: 'takeDeliveryManageEdit',
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: ![0, 1].includes(+row.status),
                row: row,
                permissionCode: 'takeDeliveryManageCancel',
              },
              {
                label: '审核',
                permissionCode: 'takeDeliveryAudit',
                key: 'audit',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.status),
                row: row,
              },
              {
                label: '预约入库',
                key: 'reserve',
                type: 'primary',
                text: true,
                permissionCode: 'reservationInboundAdd',
                hide: ![2].includes(+row.status),
                row: row,
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

<script lang="ts" setup name="takeDeliveryManage">
  import { ErpApi, erpApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 0, code: 'waitAuth', statusName: '待审核', count: '' },
    { status: 1, code: 'authNoPass', statusName: '审核不通过', count: '' },
    { status: 2, code: 'waitPick', statusName: '待提货', count: '' },
    { status: 3, code: 'reserved', statusName: '已预约', count: '' },
    { status: 4, code: 'abandon', statusName: '废弃', count: '' },
  ];
  const colorMap = {
    0: 'purple',
    1: 'red',
    2: 'green',
    3: 'yellow',
    4: 'gray',
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpPlanBillLadingQueryList.RequestQuery,
    ErpApi.LuteosErpPlanBillLadingQueryList.ResponseBody
  >({
    searchDefaults: {
      creator: '',
      keyword: '',
      followerCode: '',
      status: '',
      supplierCode: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanBillLadingQueryList,
  });
  const handleTabChange = () => {
    nextTick(() => {
      runQuery();
    });
  };

  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'plan_operator_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const initDickbook = async () => {
    await getCreatorList();
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      router.push(`/takeDeliveryManage/detail?code=${row.code}`);
    }
    if (key === 'cancel') cancelOrder(row);
    if (key === 'audit') {
      router.push(`/takeDeliveryManage/audit?code=${row.code}`);
    }
    if (key === 'edit') {
      router.push(`/takeDeliveryManage/edit?code=${row.code}`);
    }
    if (key === 'reserve') {
      router.push(`/reservationInbound/add?code=${row.code}`);
    }
  };
  const cancelOrder = async (row) => {
    const res = await swal.confirm({
      title: `确认作废`,
    });
    if (res) {
      await erpApi.luteosErpPlanBillLadingAbandon({
        code: row.code,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  const add = () => {
    router.push('/takeDeliveryManage/add');
  };

  const toReservationInbound = (code) => {
    router.push(`/reservationInbound?code=${code}`);
  };
  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss"></style>
