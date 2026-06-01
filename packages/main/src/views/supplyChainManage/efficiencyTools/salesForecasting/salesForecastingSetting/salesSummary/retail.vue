<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="search.chooseKeywordType" style="width: 110px">
        <el-option label="汇总SKU" :value="1" />
        <el-option label="子SKU" :value="2" />
        <el-option label="产品名称" :value="3" />
      </el-select>
      <el-input v-model="search.chooseKeyword" placeholder="请输入" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <CustomerSelect v-model="search.customerCode" placeholder="客户" clearable />
      <WarehouseSelect v-model="search.warehouseCode" placeholder="目的仓" clearable />
      <!-- 状态: 0-启用 1-禁用 -->
      <el-select v-model="search.status" placeholder="状态" filterable clearable>
        <el-option label="启用" :value="0" />
        <el-option label="禁用" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="editDialogRef.open('add', '新增')">新增</el-button>
      <ExportBtn
        :service="erpApi.luteosErpPlanPrsfssExportFile"
        :params="{
          ...search,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.records"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column label="汇总SKU" prop="skuCode" min-width="120" />
      <el-table-column label="产品名称" prop="skuName" min-width="180" />
      <el-table-column label="客户名称" prop="customerDesc" />
      <el-table-column label="目的仓" prop="warehouseDesc" />
      <el-table-column label="子SKU" prop="childSkuCode" min-width="120" />
      <el-table-column label="子产品名称" prop="childSkuName" min-width="180" />
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <Tag :color="row?.status === 0 ? 'green' : 'red'">
            {{ row?.status === 0 ? '启用' : '禁用' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creatorName" min-width="100" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="更新时间" prop="updateTime" />
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
  <LogDialog ref="logDialogRef" />
  <EditDialog ref="editDialogRef" @success="refreshList" mode="retail" />
  <!-- <ImporUpdateDialog :downloadParams="search" ref="importUpdateDialogRef" /> -->
</template>

<script setup lang="ts" name="retail">
  import * as swal from '@/utils/swal';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import LogDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/salesSummary/components/logDialog.vue';
  import EditDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/salesSummary/components/editDialog.vue';
  import CustomerSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/customerSelect.vue';
  import WarehouseSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/warehouseSelect.vue';

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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpPlanPrsfssQueryList.RequestQuery,
    ErpApi.LuteosErpPlanPrsfssQueryList.ResponseBody
  >({
    searchDefaults: {
      chooseKeyword: undefined,
      chooseKeywordType: 1,
      customerCode: undefined,
      warehouseCode: undefined,
      status: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPrsfssQueryList,
  });

  const logDialogRef = ref();
  const editDialogRef = ref();

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
      html: `<div>确认要${desc}当前设置吗？</div><div>${desc}后汇总SKU将${
        status === 1 ? '不再' : ''
      }汇总统计子SKU销量</div>`,
    });
    if (!isConfirmed) return;
    await erpApi.luteosErpPlanPrsfssChangeStatus({
      id,
      status,
    });
    ElMessage.success(`${desc}成功`);
    refreshList();
  };
</script>

<style scoped lang="scss"></style>
