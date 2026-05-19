<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="transportType" placeholder="物流方式">
        <el-option label="物流方式" value="transportName" />
        <el-option label="物流方式简称" value="transportCode" />
      </el-select>
      <el-input
        v-model="search[transportType]"
        placeholder="批量搜索请用空格或','隔开"
        clearable
        class="w-350px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <CountrySelect
        v-model="search.shipperCountry"
        placeholder="发货国家"
        multiple
        clearable
        filterable
        style="width: 200px"
      />
    </template>

    <template #buttons>
      <el-button type="primary" @click="addNewTransport">新增物流方式</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column prop="transportName" label="物流方式" min-width="150" />
      <el-table-column prop="transportCode" label="物流方式简称" min-width="150" />
      <el-table-column prop="shipperCountry" label="发货国家" min-width="120">
        <template #default="{ row }">
          <span>{{ `${row?.shipperCountry}-${row?.shipperCountryDesc}` }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="chargeTypeDesc" label="计费方式" min-width="120" />
      <el-table-column prop="volumeWeightCoefficient" label="体积重系数" min-width="120" />
      <el-table-column prop="creator" label="创建人" min-width="120" />
      <el-table-column prop="createTime" label="创建时间" min-width="150" />
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <Tag :color="row.status === 1 ? 'green' : 'red'">
            {{ row?.status == 1 ? '启用' : '禁用' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="editTransport(row)">编辑</el-button>
          <el-button type="text" size="small" @click="toggleStatus(row)">
            {{ row.status === 0 ? '启用' : '禁用' }}
          </el-button>
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
    <EditDialog ref="editDialogRef" @success="runQuery" />
  </KeenList>
</template>

<script setup lang="ts" name="logisticsTransport">
  import { ref } from 'vue';
  import { ElMessage, ElTable as ElTableType, ElMessageBox } from 'element-plus';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import EditDialog from './components/editDialog.vue';
  // Define the LogisticsTransportBean interface based on the data structure
  interface LogisticsTransportBean {
    id?: number;
    transportCode: string;
    transportName: string;
    chargeType: string;
    chargeTypeDesc?: string;
    shipperCountry: string;
    shipperCountryDesc?: string;
    volumeWeightCoefficient: number;
    status: number;
    creator?: string;
    createTime?: string;
    updator?: string;
    updateTime?: string;
    prescriptionList?: any[];
  }

  const transportType = ref('transportName');

  const editDialogRef = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();

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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpLogisticsTransportQueryList.RequestQuery,
    ErpApi.LuteosErpLogisticsTransportQueryList.ResponseBody
  >({
    searchDefaults: {
      transportName: undefined,
      transportCode: undefined,
      status: 1,
      shipperCountry: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsTransportQueryList,
  });

  const addNewTransport = () => {
    editDialogRef.value.open();
  };

  const editTransport = (row: LogisticsTransportBean) => {
    // Copy row data to form
    editDialogRef.value.open(row);
  };

  const toggleStatus = async (row: LogisticsTransportBean) => {
    const action = row.status === 1 ? '禁用' : '启用';
    const confirmRes = await ElMessageBox.confirm(`确认${action}该物流方式吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    if (confirmRes) {
      await erpApi.luteosErpLogisticsTransportChangeStatus({ id: row.id, status: 1 - row.status });
      ElMessage.success(`${action}成功`);
      refreshList();
    }
  };
</script>

<style scoped></style>
