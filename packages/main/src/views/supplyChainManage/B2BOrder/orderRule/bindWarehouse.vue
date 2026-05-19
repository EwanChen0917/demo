<template>
  <KeenList @refresh="refreshList">
    <!--    <template #search>
      <el-input v-model="search.keyword" placeholder="" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters></template>-->
    <template #buttons>
      <!-- <el-button class="button" type="primary" @click="runQuery">查询</el-button> -->
      <!--      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>-->
      <!--      <ExportBtn :service="exportService" :params="search">导出</ExportBtn>-->
      <!-- :service="" -->
      <ExportBtn :service="erpApi.luteosErpOrderExportWarehouseParamList" :params="{ ...search }"> 导出</ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="订单类型" prop="orderTypeDesc" />
      <el-table-column label="发货方式" prop="deliveryTypeDesc" />
      <el-table-column label="发货仓库" prop="warehouseDesc" min-width="200">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.warehouseDesc" :line="3" />
        </template>
      </el-table-column>
      <!--      <el-table-column label="配送方式" min-width="200">
        <template #default="{ row }">
          <OverflowTooltip
            :content="row?.shippingCodeNameList?.join(',')"
            :line="3"
            placement="bottom"
          />
        </template>
      </el-table-column>-->
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag v-if="[0, 1].includes(row?.status)" :color="row?.status === 0 ? 'green' : 'red'">
            {{ row?.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="修改人" prop="creator" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <div v-if="row?.refreshing" class="d-flex align-items-center gap-2 text-primary">
            <span>相关配置生成中</span>
            <el-icon><Loading /></el-icon>
          </div>
          <KeenActions
            v-else-if="row?.button.canEdit"
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
                label: '详情',
                key: 'detail',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'success',
                permissionCode: '',
                row,
                hide: row.status === 0,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'danger',
                permissionCode: '',
                row,
                hide: row.status === 1,
              },
            ]"
            @click="handleActions"
          />
          <span v-else>--</span>
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
  <EditDialog ref="editRef" @success="refreshList" />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { Loading, Plus } from '@element-plus/icons-vue';
  import EditDialog from '@/views/supplyChainManage/B2BOrder/orderRule/components/editDialog.vue';

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
    ErpApi.LuteosErpOrderQueryWarehouseParamList.RequestQuery,
    ErpApi.LuteosErpOrderQueryWarehouseParamList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOrderQueryWarehouseParamList,
  });

  const editRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      const warehouseEnumList =
        row?.deliveryType === 2
          ? listData.value?.centerWarehouseEnumList
          : listData.value?.overSeaWarehouseEnumList;
      editRef.value?.open(row, warehouseEnumList, true);
    } else if (key === 'detail') {
      editRef.value?.open(row, [], false);
    } else if (key === 'enable' || key === 'disable') {
      const isConfirmed = await swal.confirm(
        `确定${row.status === 'enable' ? '启用' : '禁用'}吗？`
      );
      if (!isConfirmed) return;
      await erpApi.luteosErpOrderChangeWarehouseParamStaus({
        orderType: row?.orderType,
        deliveryType: row?.deliveryType,
        status: 1 - row?.status,
      });
      ElMessage.success('操作成功');
      refreshList();
    }
  };

  onMounted(() => {
    runQuery();
  });
</script>

<style scoped lang="scss"></style>
