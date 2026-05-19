<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="65%" top="1vh">
    <template #header><h2>选择商品</h2></template>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-input v-model="search.keyWord" placeholder="商品名称/SKU">
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>
          </el-space>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-select
              v-model="search.deliveryCode"
              placeholder="发货方式"
              clearable
              @change="tableRef?.clearSelection()"
            >
              <el-option :value="1" label="FBA" />
              <el-option :value="2" label="中仓直发" />
              <el-option :value="3" label="海外仓直发" />
            </el-select>
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
          :data="listData?.productSkuBeanList"
          row-key="skuCode"
          @select="handleSelect"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="单选" width="55" align="center" v-if="selectOne">
            <template #default="scope">
              <el-radio
                v-model="currentRow"
                :label="scope.row"
                :disabled="scope.row.skuCode && selectedRow?.skuCode === scope.row.skuCode"
              >
                {{}}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            type="selection"
            :selectable="
              (row) => {
                return selectedRow?.skuCode !== row.skuCode;
              }
            "
            width="55"
            reserve-selection
          />
          <el-table-column label="产品信息" min-width="200">
            <template #default="scope">
              <GoodsInfo
                :title="scope.row.productTitle"
                :subtitle="scope.row.productSku"
                :src="scope.row.productImageUrl || ''"
              />
            </template>
          </el-table-column>
          <template v-if="customerCode || isRequisition">
            <el-table-column prop="inventory" label="可用库存" />
            <el-table-column v-if="isRequisition" label="FBA库存">
              <template #default="{ row }">
                {{ row?.inventory - row?.centerInventory - row?.overseasInventory }}
              </template>
            </el-table-column>
            <el-table-column prop="centerInventory" label="中仓库存" />
            <el-table-column prop="overseasInventory" label="海外仓库存" />
          </template>
          <!-- <el-table-column prop="productTitle" label="产品名称" min-width="120" />
          <el-table-column prop="productSku" label="产品SKU" min-width="120" /> -->
          <el-table-column v-else prop="inventory" label="库存" width="100" />
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
  import { metaApi, productApi, ProductApi, ProductContracts } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      countryCode?: string;
      customerCode?: string;
      currencyCode?: string;
      userCode?: string;
      brandCode?: string;
      searchErpQuotation?: boolean;
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      isRequisition?: boolean;
    }>(),
    {
      selectOne: false,
      confirmText: '关联商品',
    }
  );

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any, deliveryCode?: number): void;
  }>();
  console.log('props', '产品弹窗');
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
    ProductApi.LuteosProductSkuQueryProductSkuList.RequestQuery,
    ProductApi.LuteosProductSkuQueryProductSkuList.ResponseBody
  >({
    searchDefaults: {
      countryCode: props.countryCode,
      customerCode: props.customerCode,
      currencyCode: props.currencyCode,
      brandCode: props.brandCode,
      searchInventory: true,
      searchErpQuotation: props.searchErpQuotation,
      keyWord: undefined,
      deliveryCode: undefined,
      orderType: props.customerCode ? 1 : 0,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => {
    //   console.log(searchData, props.countryCode);
    //   return {
    //     ...searchData,
    //     countryCode: props.countryCode,
    //   };
    // },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQueryProductSkuList,
  });
  const currentRow = ref<any[]>([]);
  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows
        ?.filter((item) => {
          return (
            props.selectedRows.indexOf(item) ===
            props.selectedRows.findIndex((other) => other.skuCode === item.skuCode)
          );
        })
        ?.forEach((row) => {
          tableRef.value!.toggleRowSelection(row);
        });
      /* props.selectedRows.forEach((row) => {
   tableRef.value!.toggleRowSelection(row);
 }); */
    }
  };
  setSelectedRows();

  // 勾选商品
  const totalList = ref([]);

  // 寄样选择商品校验
  const handleSelect = async (selection, row) => {
    if (props.userCode && selection.some((item) => item.skuCode === row.skuCode)) {
      await metaApi.luteosMetaV3SampleorderCheckSampleSpu({
        spuCodeList: row.productSpu,
        userCode: props.userCode,
      });
    }
  };

  const handleSelectionChange = (list) => {
    // console.log('selectedlist', list)
    totalList.value = list;
  };

  // 选择商品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个商品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit(
        'close',
        true,
        props.selectOne ? totalList.value[0] : totalList.value,
        search.deliveryCode
      );
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
