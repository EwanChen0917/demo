<template>
  <el-tabs v-model="search.status" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item?.statusName }}
        <span class="tab-count">({{ listData?.prListStatusStatistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>

  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="申购单/企企通采购单">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="search.operateTime"
        type="daterange"
        value-format="YYYY-MM-DD"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
      <DeptMember v-model="search.creator" placeholder="申购人" />
    </template>
    <template #buttons>
      <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
      <el-button
        type="primary"
        @click="$router.push('/subscription/add')"
        v-permission="'subscriptionAdd'"
      >
        新增申购单
      </el-button>
      <ExportBtn
        :service="erpApi.luteosErpPrDownloadList"
        :params="{
          ...omit(search, ['operateTime']),
          submitTimeStart: search.operateTime?.[0]
            ? dayjs(search.operateTime?.[0]).startOf('date').format('YYYY-MM-DD HH:mm:ss')
            : undefined,
          submitTimeEnd: search.operateTime?.[1]
            ? dayjs(search.operateTime?.[1]).endOf('date').format('YYYY-MM-DD HH:mm:ss')
            : undefined,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table v-loading="listLoading" :data="listData?.recordList">
      <el-table-column label="申购单" prop="code" />
      <el-table-column label="企企通采购单" prop="srmPoCode" />
      <el-table-column label="第三方采购单" prop="ecPoCode" />
      <el-table-column label="申购人" prop="creatorDesc" />
      <el-table-column label="申购时间" prop="submitTime" />
      <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc2 || row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '审核',
                key: 'audit',
                type: 'primary',
                text: true,
                hide: row.status !== 0 || !row.button?.showAuthButton,
                row: row,
                permissionCode: 'subscriptionAudit',
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: row.status !== 2,
                row: row,
                permissionCode: 'subscriptionEdit',
              },
              {
                label: '更改',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: row.status !== 1 && row.statusDesc2 !== '部分转订单',
                row: row,
                permissionCode: 'subscriptionEdit',
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'subscriptionDetail',
              },
              {
                label: '作废',
                key: 'discard',
                type: 'primary',
                text: true,
                hide:
                  row.status === 3 ||
                  row.statusDesc2 === '部分转订单' ||
                  row.statusDesc2 === '全部转订单',
                row: row,
                permissionCode: 'subscriptionDiscard',
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

<script setup lang="ts" name="subscription">
  import dayjs from 'dayjs';
  import { omit } from 'lodash-es';
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 0, code: 'waitAuth', statusName: '待审核', count: '' },
    { status: 1, code: 'passAuth', statusName: '待处理', count: '' },
    { status: 4, code: 'processed', statusName: '已处理', count: '' },
    { status: 2, code: 'noPassAuth', statusName: '审核不通过', count: '' },
    { status: 3, code: 'abandon', statusName: '废弃', count: '' },
  ];

  const statusColorMap = {
    0: 'yellow',
    1: 'purple',
    2: 'red',
    3: 'black',
    4: 'green',
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
    ErpApi.LuteosErpPrQueryList.RequestBody & {
      operateTime?: [string, string];
    },
    ErpApi.LuteosErpPrQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      creator: '',
      status: '',
      operateTime: undefined,
    },
    interceptSearchData: (searchData) => {
      const { operateTime } = searchData;
      return {
        ...omit(searchData, ['operateTime']),
        submitTimeStart: operateTime?.[0]
          ? dayjs(operateTime?.[0]).startOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        submitTimeEnd: operateTime?.[1]
          ? dayjs(operateTime?.[1]).endOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPrQueryList,
  });

  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'audit':
        router.push(`/subscription/audit?code=${row.code}`);
        break;
      case 'edit':
        router.push(`/subscription/edit?code=${row.code}`);
        break;
      case 'detail':
        router.push(`/subscription/detail?code=${row.code}`);
        break;
      case 'discard':
        cancelOrder(row.code);
        break;
      default:
        break;
    }
  };

  const cancelOrder = async (code) => {
    const res = await swal.confirm({
      title: `确认作废吗？`,
    });
    if (res) {
      await erpApi.luteosErpPrAbandon({
        code,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
</script>

<style scoped lang="scss"></style>
