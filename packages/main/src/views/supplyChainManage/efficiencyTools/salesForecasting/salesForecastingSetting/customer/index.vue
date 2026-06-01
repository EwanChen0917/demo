<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="keywordValue" style="width: 300px" clearable @blur="handleSearch">
        <template #prepend>
          <el-select v-model="keywordType" style="width: 124px">
            <el-option label="客户汇总名称" value="customerCollectName" />
            <el-option label="客户汇总编码" value="customerCollectCode" />
          </el-select>
        </template>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <CustomerSelect v-model="search.customerCode" placeholder="客户" clearable />
      <el-select v-model="search.status" placeholder="状态" filterable clearable>
        <el-option label="启用" :value="0" />
        <el-option label="禁用" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="editDialogRef.open('add', '新增')">新增</el-button>
      <ExportBtn :service="erpApi.luteosErpPlanPsfccExportFile" :params="{ ...search }">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column label="客户汇总名称" prop="name" min-width="150" />
      <el-table-column label="客户名称" prop="customerCollectList" min-width="150">
        <template #default="{ row }">
          {{ row.customerCollectList?.map((item) => item.desc).join('，') }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creatorDesc" min-width="100" />
      <el-table-column label="创建时间" prop="createTime" min-width="160" />
      <el-table-column label="更新时间" prop="updateTime" min-width="160" />
      <el-table-column label="状态" prop="status" min-width="80">
        <template #default="{ row }">
          <Tag :color="row?.status === 0 ? 'green' : 'red'">
            {{ row?.status === 0 ? '启用' : '禁用' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'primary',
                hide: row?.status === 1,
                permissionCode: '',
                row,
              },
              {
                label: '启用',
                key: 'able',
                type: 'primary',
                hide: row?.status === 0,
                permissionCode: '',
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
  <EditDialog ref="editDialogRef" @success="refreshList" mode="retail" />
  <LogDialog ref="logDialogRef" />
</template>

<script setup lang="ts" name="customer">
  import * as swal from '@/utils/swal';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import CustomerSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/customerSelect.vue';
  import LogDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/salesSummary/components/logDialog.vue';
  import EditDialog from './components/editDialog.vue';

  const PAGE_SIZE = 10;
  const keywordType = ref('customerCollectName');
  const keywordValue = ref('');
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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpPlanPsfccQueryList.RequestQuery,
    ErpApi.LuteosErpPlanPsfccQueryList.ResponseBody
  >({
    searchDefaults: {
      customerCollectCode: undefined,
      customerCollectName: undefined,
      customerCode: undefined,
      status: 0,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPsfccQueryList,
  });

  const editDialogRef = ref();
  const logDialogRef = ref();

  const handleSearch = () => {
    // 只传 customerCollectName 或 customerCollectCode，二选一
    if (keywordType.value === 'customerCollectName') {
      search.customerCollectName = keywordValue.value;
      search.customerCollectCode = undefined;
    } else if (keywordType.value === 'customerCollectCode') {
      search.customerCollectCode = keywordValue.value;
      search.customerCollectName = undefined;
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
        editDialogRef.value?.open('edit', '编辑', row);
        break;
      case 'log':
        logDialogRef.value?.open(row?.operationLogBeanList);
        break;
      case 'disable':
        changeStatus(row?.id, 1, '禁用');
        break;
      case 'able':
        changeStatus(row?.id, 0, '启用');
        break;
      default:
        break;
    }
  };

  const changeStatus = async (id, status, desc) => {
    const isConfirmed = await swal.confirm({
      html: `<div>确认要${desc}客户汇总信息吗？</div><div>${desc}后预测列表将可以导入客户信息预测。`,
    });
    if (!isConfirmed) return;
    await erpApi.luteosErpPlanPsfccChangeStatus({
      id,
      status,
    });
    ElMessage.success(`${desc}成功`);
    refreshList();
  };
</script>

<style scoped lang="scss"></style>
