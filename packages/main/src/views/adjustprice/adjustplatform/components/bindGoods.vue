<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="75%" top="1vh">
    <template #title><h2>选择</h2></template>
    <slot></slot>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-input
              v-model="search.keyWord"
              :placeholder="multiple ? 'ItemId/SKU/商品名称' : keyWord + '/ 商品名称'"
            >
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>
          </el-space>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-button class="button" type="primary" @click="runQuery">查询</el-button>
          </el-space>
        </div>
      </div>
      <div class="card-body pt-0">
        <el-table
          max-height="400px"
          ref="tableRef"
          class-name="table-row-dashed"
          v-loading="listLoading"
          :data="listData?.asinSpuQueryList"
          :row-key="multiple ? 'code' : 'skuCode'"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="multiple" type="selection" width="55" reserve-selection />
          <el-table-column v-else width="55" align="center">
            <template #default="scope">
              <el-radio
                v-model="currentRow"
                :label="scope.row"
                :disabled="scope.row.code && selectedRow?.code === scope.row.code"
              >
                {{}}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column v-if="!multiple" :label="keyWord" prop="code" />
          <el-table-column v-if="multiple" label="ItemId" prop="code" />
          <!--          <el-table-column v-if="multiple" label="SKU" prop="skuCode" />-->
          <el-table-column v-if="multiple" label="MSKU" prop="msku" />
          <el-table-column label="商品名称" prop="spuName" min-width="250">
            <template #default="{ row }">
              <div class="pe-10">{{ row.spuName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="商品售价" prop="price">
            <template #default="{ row }">
              <span>{{ row.price }}</span>
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
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { priceApi, PriceApi, ProductContracts } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      keyWord: string;
      platform: number;
      shopList: string[];
      siteId?: number;
      multiple?: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
    }>(),
    {}
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const PAGE_SIZE = 10;
  console.log('selectedRows', props.selectedRows);
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
    PriceApi.LuteosPriceAsinQueryAsinSpuList.RequestBody,
    PriceApi.LuteosPriceAsinQueryAsinSpuList.ResponseBody
  >({
    searchDefaults: {
      platform: props.platform,
      shopList: props.shopList,
      siteId: props.platform === 1 ? props.siteId : undefined,
      keyWord: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: priceApi.luteosPriceAsinQueryAsinSpuList,
  });

  const currentRow = ref<any[]>([]);

  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setSelectedRows();

  // 勾选商品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 选择商品
  const handleSave = () => {
    // 单选
    if (!props.multiple) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个商品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      console.log('totalList.value', totalList.value);
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
