<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #buttons>
      <el-button class="button" type="primary" @click="addProduct">新增产品项目</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.operationProductList">
      <el-table-column label="项目名称" prop="projectName" />
      <el-table-column label="产品名称" prop="productName" />
      <el-table-column label="开售日期" prop="saleStartDate" />
      <el-table-column label="目标销量">
        <template #default="scope">
          <div>推广第一个月：{{ scope.row.targetSaleOneMonth }}</div>
          <div>推广第二个月：{{ scope.row.targetSaleTwoMonth }}</div>
          <div>推广第三个月：{{ scope.row.targetSaleThreeMonth }}</div>
        </template>
      </el-table-column>
      <el-table-column label="产品定位" prop="productPositioning">
        <template #default="scope">
          <div class="format-txt">{{ scope.row.productPositioning }}</div>
        </template>
      </el-table-column>
      <el-table-column label="核心卖点" prop="coreSellingPoint">
        <template #default="scope">
          <div class="format-txt">{{ scope.row.coreSellingPoint }}</div>
        </template>
      </el-table-column>
      <el-table-column label="次要卖点" prop="minorSellingPoint">
        <template #default="scope">
          <div class="format-txt">{{ scope.row.minorSellingPoint }}</div>
        </template>
      </el-table-column>
      <el-table-column label="定价策略" prop="pricingStrategy">
        <template #default="scope">
          <div class="format-txt">{{ scope.row.minorSellingPoint }}</div>
        </template>
      </el-table-column>
      <el-table-column label="营销策略" prop="marketingPolicy">
        <template #default="scope">
          <div class="format-txt">{{ scope.row.marketingPolicy }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" fixed="right">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '销量预测',
                key: 'preview',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '操作日志',
                key: 'log',
                type: 'primary',
                text: true,
                row: scope.row,
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
  <EditProductProject
    v-if="editVisible"
    :type="editType"
    :visible="editVisible"
    :info="projectInfo"
    @close="handleProjectClose"
    @save="runQuery"
  />
  <OperationLogs
    v-if="logVisible"
    :visible="logVisible"
    :projectCode="projectInfo.projectCode"
    @close="logVisible = false"
  />
</template>

<script lang="ts" setup name="productOperation">
  import { ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { productOperationApi, ProductOperationApi } from '@/api/index';
  import EditProductProject from './components/editProductProject.vue';
  import OperationLogs from './components/operationLogs.vue';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
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
    refreshList,
    resetSearch,
  } = useList<
    ProductOperationApi.LuteosOpetationQueryOperationProjectList.RequestQuery,
    ProductOperationApi.LuteosOpetationQueryOperationProjectList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productOperationApi.luteosOpetationQueryOperationProjectList,
  });

  const projectInfo = ref({});
  const editType = ref();
  const editVisible = ref(false);
  const addProduct = () => {
    editType.value = 'add';
    editVisible.value = true;
  };

  const handleProjectClose = () => {
    editVisible.value = false;
    projectInfo.value = {};
  };

  const logVisible = ref(false);

  const router = useRouter();

  // 表格操作
  const handleActions = (item) => {
    const { key, row } = item;
    projectInfo.value = row;
    if (key === 'edit') {
      editType.value = 'edit';
      editVisible.value = true;
    } else if (key === 'log') {
      logVisible.value = true;
    } else if (key === 'detail') {
      const routeUrl = router.resolve({
        name: 'operationDetail',
        query: { code: row.projectCode },
      });
      window.open(routeUrl.href, '_blank');
    } else if (key === 'preview') {
      const routeUrl = router.resolve({
        name: 'salesForecasting',
      });
      window.open(routeUrl.href, '_blank');
    }
  };
</script>

<style scoped lang="scss">
  .format-txt {
    white-space: pre-line;
  }
</style>
