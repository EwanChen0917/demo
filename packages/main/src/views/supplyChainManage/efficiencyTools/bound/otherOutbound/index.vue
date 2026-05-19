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
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="handleReset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input style="width: 280px" v-model="search.code" placeholder="出库单号">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <BoundSelect
        v-model="search.warehouseCode"
        placeholder="仓库"
        :multiple="true"
        :options="warehouseMap"
        option-key="warehouseCode"
        option-label="warehouseName"
        option-value="warehouseCode"
      />
      <el-select
        style="width: 120px"
        v-model="search.operationType"
        placeholder="操作类型"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickBook.oms_other_out_bound_operation_type"
          :key="person.value"
          :label="person.desc"
          :value="person.value"
        />
      </el-select>
      <BoundSelect
        style="width: 180px"
        v-model="search.createBy"
        placeholder="创建人"
        :multiple="true"
        :options="memberList"
        option-key="memberCode"
        option-label="name"
        option-value="memberCode"
      />
      <el-date-picker
        class="w-180"
        v-model="createTime"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        :default-time="[new Date(0, 0, 0), new Date(0, 0, 0)]"
        @change="handleTimeChange"
      />
      <el-date-picker
        class="w-180"
        v-model="outTime"
        type="daterange"
        range-separator="-"
        start-placeholder="出库开始时间"
        end-placeholder="出库结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        :default-time="[new Date(0, 0, 0), new Date(0, 0, 0)]"
        @change="handleTimeInChange"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增出库单</el-button>
    </template>
    <template #default="{ tableHeight }">
      <vxe-table
        border="inner"
        :height="tableHeight || 600"
        v-loading="listLoading"
        :data="listData?.recordList"
      >
        <vxe-column field="code" title="出库单号" min-width="150px" />
        <vxe-column field="warehouseName" title="仓库" min-width="250px" />
        <vxe-column field="operationTypeName" title="操作类型" width="200px" />
        <vxe-column field="outboundMethodName" title="出库方式" min-width="100px" />
        <vxe-column field="inventoryTypeName" title="库存类型" min-width="120px" />
        <vxe-column field="createName" title="创建人" min-width="100px" />
        <vxe-column field="createTime" title="创建时间" min-width="190px" />
        <vxe-column field="outboundOperatorName" title="出库人" min-width="100px" />
        <vxe-column field="outboundTime" title="出库时间" min-width="190px" />
        <vxe-column field="shipper" title="状态" min-width="100px">
          <template #default="{ row }">
            <Tag :color="colorMap[row.status]">{{ row.statusName }}</Tag>
          </template>
        </vxe-column>
        <vxe-column field="jjPushStatusDesc" title="推送积加状态" min-width="100px">
          <template #default="{ row }">
            <Tag :color="colorMap[row.jjPushStatusDesc]">{{ row.jjPushStatusDesc }}</Tag>
          </template>
        </vxe-column>
        <vxe-column field="jjPushFailureReason" title="推送积加失败原因" min-width="140px">
          <template #default="{ row }">
            <OverflowTooltip :content="row.jjPushFailureReason" :line="2">
              {{ row.jjPushFailureReason }}
            </OverflowTooltip>
          </template>
        </vxe-column>
        <vxe-column field="pushStatusDesc" title="推送状态" min-width="100px">
          <template #default="{ row }">
            <Tag :color="colorMap[row.pushStatusDesc]">{{ row.pushStatusDesc }}</Tag>
          </template>
        </vxe-column>
        <vxe-column field="pushFailureReason" title="推送失败原因" min-width="140px">
          <template #default="{ row }">
            <OverflowTooltip :content="row.pushFailureReason" :line="2">
              {{ row.pushFailureReason }}
            </OverflowTooltip>
          </template>
        </vxe-column>
        <vxe-column title="操作" min-width="100px" fixed="right">
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
                  label: '作废',
                  key: 'cancel',
                  type: 'danger',
                  text: true,
                  hide: ['1', '3'].includes(row.status),
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
    </template>
  </KeenList>
</template>

<script lang="ts" setup name="otherOutbound">
  import { erpApi, memberApi, omsApi, OmsApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';
  import { useOmsBase } from '../hooks/useOmsBase';
  import BoundSelect from '../components/boundSelect.vue';
  const { warehouseMap, dickBook, memberList, initMember, getWarehouseMap } = useOmsBase();
  const createTime = ref([]);
  const outTime = ref([]);

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: 'waitAuth', statusName: '待出库', count: '' },
    { status: '1', code: 'authPass', statusName: '已完成', count: '' },
    { status: '2', code: 'error', statusName: '异常', count: '' },
    { status: '3', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const colorMap = {
    0: 'green',
    1: 'blue',
    2: 'yellow',
    3: 'gray',
    4: 'red',
    未推送: 'gray',
    推送失败: 'yellow',
    推送成功: 'green',
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
    OmsApi.OmsOutboundOrderQueryList.RequestBody,
    OmsApi.OmsOutboundOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      code: undefined,
      createBy: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      operationType: undefined,
      warehouseCode: undefined,
      outboundTimeStart: undefined,
      outboundTimeEnd: undefined,
      status: '',
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsOutboundOrderQueryList,
  });
  const handleReset = () => {
    createTime.value = [];
    outTime.value = [];
    resetSearch();
  };

  const handleTimeChange = (val) => {
    if (val) {
      search.createTimeStart = val[0] || '';
      search.createTimeEnd = val[1] || '';
    } else {
      search.createTimeStart = undefined;
      search.createTimeEnd = undefined;
    }
  };
  const handleTimeInChange = (val) => {
    if (val) {
      search.outboundTimeStart = val[0] || '';
      search.outboundTimeEnd = val[1] || '';
    } else {
      search.outboundTimeStart = undefined;
      search.outboundTimeEnd = undefined;
    }
  };

  const add = () => {
    const path = router.resolve({
      name: 'otherOutboundAdd',
    });
    router.push(path.href);
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'otherOutboundDetail',
        query: { code: row.id },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancel(row, '作废');
    }
  };
  const cancel = async (row, title: string) => {
    const res = await swal.confirm({
      title: `确认${title}？`,
    });
    if (res) {
      await omsApi.omsOutboundOrderCancel({
        id: row.id,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  const handleTabChange = () => {};
  onMounted(() => {
    initMember();
    getWarehouseMap();
  });
  onActivated(() => {
    refreshList();
  });
</script>

<style scoped lang="scss">
  :deep(.vxe-table--scroll-y-top-corner) {
    width: 0px;
  }
</style>
