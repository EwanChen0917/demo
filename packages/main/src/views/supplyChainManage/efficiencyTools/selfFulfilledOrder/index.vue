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
        <span class="tab-count">({{ listData?.statistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="出库单号/销售订单号/仓配单号" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input class="w-175px" v-model="search.freightForwarding" placeholder="货代" clearable />
      <el-select v-model="search.freightForwardingChannelCode" placeholder="渠道" clearable>
        <el-option
          v-for="item in channelMap"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <div>
        <el-select style="width: 120px" v-model="searchTime" @change="handleSearchTimeChange">
          <el-option label="创建时间" value="createTime" />
          <el-option label="出库时间" value="outTime" />
        </el-select>
        <el-date-picker
          v-if="searchTime === 'createTime'"
          v-model="search.createTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
          clearable
        />
        <el-date-picker
          v-if="searchTime === 'outTime'"
          v-model="search.outTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
          clearable
        />
      </div>
    </template>
    <!-- <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      row-key="code"
    >
      <el-table-column label="出库单号" prop="code" min-width="140" fixed />
      <el-table-column label="RPE销售订单号" prop="preSaleCode" min-width="140" />
      <el-table-column label="RPE仓配单号" prop="woCode" min-width="140" />
      <el-table-column label="仓配系统销售单号/仓配系统仓配单号" min-width="140">
        <template #default="{ row }">
          <span>{{ row?.systemSaleCode }}</span>
          /
          <span>{{ row?.systemCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收件人" prop="receiveName" />
      <el-table-column label="国家" prop="countryDesc" />
      <el-table-column label="供应链SKU * 数量" width="170px">
        <template #default="{ row }">
          <div v-for="item in row?.skuDescList" :key="item.sku">
            <span>{{ item?.sku }}</span>
            *
            <span>{{ item?.count }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品总数" prop="skuCount" />
      <el-table-column label="发货需求" prop="sendDemand" min-width="140">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.sendDemand" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" min-width="140">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.remark" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="colorMap[row?.status]">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="物流跟踪号" prop="trackNum" min-width="140" />
      <el-table-column label="货代" prop="freightForwarding" min-width="140" />
      <el-table-column label="渠道" prop="channelDesc" min-width="120" />
      <el-table-column label="创建时间" prop="createTime" min-width="120" />
      <el-table-column label="出库时间" prop="outTime" min-width="120" />
      <el-table-column label="操作" fixed="right" min-width="140">
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
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                hide: ![200, 300].includes(row?.status),
                row,
              },
              {
                label: '下载拣货单',
                key: 'download',
                type: 'primary',
                permissionCode: '',
                hide: ![300, 400].includes(row?.status),
                row,
              },
              {
                label: '上传跟踪号',
                key: 'addTrackNum',
                type: 'primary',
                permissionCode: '',
                hide: ![300, 400].includes(row?.status),
                row,
              },
              {
                label: '提交处理',
                key: 'submit',
                type: 'primary',
                permissionCode: '',
                hide: row?.status !== 200,
                disabled: saveLoading,
                row,
              },
              {
                label: '提交出库',
                key: 'submit',
                type: 'primary',
                permissionCode: '',
                hide: row?.status !== 300,
                disabled: saveLoading,
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
  <AddTrackNumDialog ref="addTrackNumDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="selfFulfilledOrder">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi, platformApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import AddTrackNumDialog from '@/views/supplyChainManage/efficiencyTools/selfFulfilledOrder/components/addTrackNumDialog.vue';
  import * as swal from '@/utils/swal';

  const router = useRouter();

  const tabStatusList = [
    { status: '200', code: 'waitHandle', statusName: '待处理', count: '' },
    { status: '300', code: 'waitOut', statusName: '待出库', count: '' },
    { status: '400', code: 'out', statusName: '已出库', count: '' },
    { status: '600', code: 'abondon', statusName: '已废弃', count: '' },
    { status: '', code: 'all', statusName: '全部', count: '' },
  ];

  const colorMap = {
    200: 'blue',
    300: 'purple',
    400: 'green',
    600: 'red',
  };

  const searchTime = ref('createTime');

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
  } = useList<ErpApi.LuteosErpOdoQueryList.RequestQuery, ErpApi.LuteosErpOdoQueryList.ResponseBody>(
    {
      searchDefaults: {
        keyword: undefined,
        status: '200',
        createTime: undefined,
        outTime: undefined,
        freightForwarding: undefined,
        freightForwardingChannelCode: undefined,
      },
      // eslint-disable-next-line no-shadow
      interceptSearchData: (searchData) => {
        const { createTime, outTime } = searchData;
        return {
          ...searchData,
          createTimeStart: createTime ? createTime[0] : undefined,
          createTimeEnd: createTime ? createTime[1] : undefined,
          outTimeStart: outTime ? outTime[0] : undefined,
          outTimeEnd: outTime ? outTime[1] : undefined,
        };
      },
      pageSize: PAGE_SIZE,
      service: erpApi.luteosErpOdoQueryList,
    }
  );

  const handleSearchTimeChange = () => {
    search.createTime = undefined;
    search.outTime = undefined;
  };

  const channelMap = ref();
  const getChannelMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['owner_send_order_chanel'],
    });
    channelMap.value = res?.dictMap?.owner_send_order_chanel;
  };
  getChannelMap();

  const addTrackNumDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      router.push(`/selfFulfilledOrder/detail?code=${row?.code}`);
    } else if (key === 'edit') {
      router.push(`/selfFulfilledOrder/edit?code=${row?.code}`);
    } else if (key === 'download') {
      downloadDetail(row?.code);
    } else if (key === 'addTrackNum') {
      addTrackNumDialogRef.value?.open(row?.preSaleCode, row?.trackNum?.split(','));
    } else if (key === 'submit') {
      submit(row?.code);
    }
  };

  const saveLoading = ref(false);
  const submit = async (code) => {
    const isConfirmed = await swal.confirm('确定提交吗？');
    if (!isConfirmed) return;
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpOdoQueryDetail({
        code,
      });
      const detailInfo = res?.draftDetailResp ?? res?.detailResp;
      await erpApi.luteosErpOdoStatusReverse({
        ...detailInfo,
        draft: false,
      });
      ElMessage.success('提交成功');
      refreshList();
    } finally {
      saveLoading.value = false;
    }
  };

  const downloadDetail = async (code) => {
    const res = await erpApi.luteosErpOdoDownDetail({
      code,
    });
    if (res) {
      openWindow(res);
    } else {
      ElMessage.error('下载失败');
    }
  };
</script>

<style scoped lang="scss"></style>
