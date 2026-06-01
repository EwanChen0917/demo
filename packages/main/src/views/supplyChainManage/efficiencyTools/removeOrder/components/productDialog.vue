<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="80%" top="1vh">
    <template #header>
      <h2>添加产品</h2>
    </template>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-input
            v-model="search[searchType]"
            clearable
            placeholder="请输入"
            style="width: 350px"
          >
            <template #prepend>
              <el-select v-model="searchType" style="width: 120px">
                <el-option
                  v-for="item in fbaSearchTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template #suffix>
              <i class="iconfont icon-sousuo"></i>
            </template>
            <template #append v-if="searchType !== 'productName'">
              <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
            </template>
          </el-input>
        </div>
      </div>
      <div class="card-body pt-0">
        <el-table
          max-height="400px"
          ref="tableRef"
          class-name="table-row-dashed"
          v-loading="listLoading"
          :data="listData?.recordList"
          row-key="productId"
          @select="handleSelect"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            :selectable="
              (row) => {
                return selectedRow?.productId !== row.productId;
              }
            "
            width="55"
            reserve-selection
          />
          <el-table-column prop="productName" label="产品名称" min-width="140" />
          <el-table-column label="MSKU/FNSKU" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                MSKU： {{ row?.msku }}
                <Copy :content="row.msku" />
              </div>
              <div class="fs-7">
                FNSKU： {{ row?.fnsku }}
                <Copy :content="row.fnsku" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ASIN" label="ASIN" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                {{ row?.asin }}
                <Copy :content="row.asin" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="availableQuantity" label="可售" min-width="100" />
          <el-table-column prop="unsellableQuantity" label="不可售" min-width="100" />
        </el-table>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { metaApi, erpApi, ErpApi, ProductContracts } from '@/api/index';
  import { openWindow } from '@/utils';

  const props = withDefaults(
    defineProps<{
      warehouseCode?: string;
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      confirmText?: string;
    }>(),
    {
      confirmText: '关联商品',
    }
  );
  const searchType = ref('msku');

  const fbaSearchTypes = [
    { label: 'ASIN', value: 'asin' },
    { label: 'MSKU', value: 'msku' },
    { label: 'FNSKU', value: 'fnsku' },
    { label: '产品名称', value: 'productName' },
  ];

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpLogisticsTransportQueryList.RequestQuery,
    ErpApi.LuteosErpLogisticsTransportQueryList.ResponseBody
  >({
    searchDefaults: {
      asin: undefined,
      msku: undefined,
      fnsku: undefined,
      supplySku: undefined,
      productName: undefined,
      warehouseCodeList: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      console.log(searchData, props.warehouseCode);
      return {
        ...searchData,
        warehouseCodeList: [props.warehouseCode],
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanInventoryAmazonQueryList,
  });
  watch(listData, () => {
    listData.value?.recordList?.forEach((item) => {
      Reflect.set(item, 'productId', `${item.warehouseId}_${item.msku}_${item.fnsku}`);
    });
  });

  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows?.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setTimeout(() => {
    setSelectedRows();
    runQuery();
  }, 100);

  // 勾选商品
  const totalList = ref([]);

  // 寄样选择商品校验
  const handleSelect = async (selection, row) => {
    if (props.userCode && selection.some((item) => item.id === row.id)) {
      await metaApi.luteosMetaV3SampleorderCheckSampleSpu({
        spuCodeList: row.productSpu,
        userCode: props.userCode,
      });
    }
  };

  const handleSelectionChange = (list) => {
    totalList.value = list;
  };
  const handleBatchSearch = (val) => {
    search[searchType.value] = val?.replace(/\n/g, ',');
  };

  // 选择商品
  const handleSave = () => {
    if (totalList.value && totalList.value.length) {
      emit('close', true, totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择商品',
        duration: 5 * 1000,
      });
    }
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };
</script>

<style scoped lang="scss"></style>
