<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="请输入产品SKU/产品名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ProductLineSelect v-model="search.productLine" placeholder="品线" clearable />
    </template>
    <template #buttons>
      <el-button type="primary" @click="batchVisible = true" :disabled="!rpaCodeList.length">
        批量设置
      </el-button>
      <el-button type="primary" @click="addMonitor">新增监控商品</el-button>
      <el-button type="primary" @click="uploadVisible = true">导入</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.sellerSkuList"
      row-key="rpaCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="250">
        <template #default="{ row }">
          <div>
            {{ row?.itemCode }}
            <Copy :content="row.itemCode" />
          </div>
          <div>
            {{ row?.itemName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="品线" prop="productLineDesc" min-width="180" />
      <el-table-column label="状态" prop="productStatusDesc">
        <template #default="{ row }">
          <Tag :color="+row.productStatus === 2 ? 'green' : 'purple'" size="small">
            {{ row?.productStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="MSRP" prop="msrp" min-width="180">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>MSRP</span>
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
              :content="`仅供参考，取自US的MSRP`"
            >
              <QuestionFilled class="question-icon" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="监控配置" prop="firstOrderTime" min-width="180">
        <template #default="{ row }">
          <div v-if="row?.monitorStatusDesc">
            <Tag :color="monitorStatusColorMap[row.monitorStatus]" size="small">
              {{ row?.monitorStatusDesc }}
            </Tag>
          </div>
          <div v-for="(item, index) in row.monitorList" :key="index" style="margin-top: 5px">
            {{ item?.description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更新信息" min-width="150">
        <template #default="{ row }">
          <div class="fs-7">更新人：{{ row?.operatorName || '--' }}</div>
          <div class="fs-7">更新时间：{{ row?.updateTime || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '设置',
                key: 'config',
                type: 'primary',
                row: row,
              },
              {
                label: '关闭',
                key: 'updateStatus',
                type: 'danger',
                row: row,
                hide: row.monitorStatus === 0,
              },
              {
                label: '开启',
                key: 'updateStatus',
                type: 'primary',
                row: row,
                hide: row.monitorStatus === 1,
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
  <BatchConfig
    v-if="batchVisible"
    :visible="batchVisible"
    :rpaCodeList="rpaCodeList"
    @close="handleConfigClose"
  />
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="product_seller_sku"
    title="导入"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { priceApi, PriceApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import BatchConfig from '../Modal/batchSkuConfig.vue';

  const PAGE_SIZE = 10;
  const monitorStatusColorMap = {
    0: 'purple',
    1: 'blue',
  };

  const router = useRouter();
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
    resetSearch,
    runQuery,
    // handleSelectionChange,
    // selectedKeys,
  } = useList<
    PriceApi.LuteosPriceQuerySellerSkuMonitorList.RequestBody,
    PriceApi.LuteosPriceQuerySellerSkuMonitorList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      productLine: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: priceApi.luteosPriceQuerySellerSkuMonitorList,
  });

  const tableRef = ref();
  const addMonitor = () => {
    router.push('/adjustpriceMonitor/skuConfig/edit');
  };

  const rpaCodeList = ref([]);
  const handleSelectionChange = (list) => {
    rpaCodeList.value = list.map((item) => item.rpaCode);
  };

  // 表格操作
  const batchVisible = ref(false);
  const curRpaCode = ref('');
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'config') {
      curRpaCode.value = row.rpaCode;
      router.push(`/adjustpriceMonitor/skuConfig/edit?code=${row.rpaCode}`);
    }
    if (key === 'updateStatus') {
      await priceApi.luteosPriceOperateSellerMonitor({
        rpaCode: row.rpaCode,
        operateType: row.monitorStatus === 0 ? 'enable' : 'disable',
      });
      ElMessage.success(row.monitorStatus === 0 ? '开启成功' : '关闭成功');
      runQuery();
    }
  };

  const handleConfigClose = (reload) => {
    if (reload) {
      runQuery();
    }
    batchVisible.value = false;
    tableRef.value?.clearSelection();
  };

  const uploadVisible = ref(false);
  const batchUpdate = (reload) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }
  .product-title {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line {
    border: 1px dashed #eee;
    margin: 10px 0;
    opacity: 0.5;
  }
</style>
