<template>
  <KeenList>
    <!--    <template #search>
      <el-input v-model="search.keyword" placeholder="" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters></template>-->
    <template #buttons>
      <el-button type="primary" @click="router.push('/internalPurchase/freightRule/add')">
        新增模板
      </el-button>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <!--      <el-button type="primary" @click="resetSearch">重置</el-button>-->
    </template>
    <vxe-table
      border="inner"
      max-height="900px"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="name" title="模板名称" />
      <vxe-column field="priority" title="优先级" />
      <!--      <vxe-column field="creatorDesc" title="创建人" />-->
      <vxe-column field="updateTime" title="更新时间" />
      <vxe-column field="status" title="状态">
        <template #default="{ row }">
          <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              /*{
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },*/
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
              },
              /*{
                label: '复制',
                key: 'copy',
                type: 'primary',
                text: true,
                hide: search.type !== 4,
                row: row,
              },*/
              {
                label: '禁用',
                key: 'close',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.status),
                row: row,
              },
              {
                label: '启用',
                key: 'open',
                type: 'primary',
                text: true,
                hide: ![1].includes(+row.status),
                row: row,
              },
              /*{
                label: '日志',
                key: 'log',
                type: 'primary',
                text: true,
                hide: search.type !== 4,
                row: row,
              },*/
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

<script setup lang="ts" name="internalFreightRule">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { useRouter } from 'vue-router';

  const colorMap = {
    0: 'green',
    1: 'red',
  };

  const router = useRouter();
  const route = useRoute();

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
  } = useList<
    ErpApi.LuteosErpBaseFlowQueryList.RequestBody,
    ErpApi.LuteosErpBaseFlowQueryList.ResponseBody
  >({
    searchDefaults: {
      type: 5,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpBaseFlowQueryList,
  });

  // 表格操作
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      router.push({
        path: search.type === 1 ? '/orderRule/detail' : '/orderRule/detailRule',
        query: { code: row.code },
      });
    } else if (key === 'edit') {
      router.push({
        path: '/internalPurchase/freightRule/edit',
        query: { code: row.code },
      });
    } else if (key === 'close' || key === 'open') {
      changeStatus(row);
    } else if (key === 'log') {
      if (row.logList) logRef.value.open(row.logList);
      else ElMessage.warning('暂无日志');
    } else if (key === 'copy') {
      router.push({
        name: 'orderRuleAddRule',
        params: { type: 'copy', code: row.code },
      });
    }
  };
  const changeStatus = async (row) => {
    const res = await swal.confirm({
      title: `确认${row.status === 0 ? '关闭' : '开启'}？`,
    });
    if (res) {
      await erpApi.luteosErpBaseFlowChangeStatus({
        code: row.code,
        status: row.status === 0 ? 1 : 0,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
</script>

<style scoped lang="scss"></style>
