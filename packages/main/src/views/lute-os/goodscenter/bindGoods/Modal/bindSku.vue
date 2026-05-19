<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="65%" top="1vh">
    <template #header><h2>选择产品</h2></template>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-input
              clearable
              v-model="search.keyWord"
              :placeholder="isShopify ? '产品名称/店铺SKU' : '产品名称/产品SKU'"
              style="width: 300px"
            >
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>
            <el-select
              v-model="search.tagCode"
              style="width: 200px"
              placeholder="SKU标签"
              clearable
              filterable
            >
              <el-option
                v-for="item in labelOptions"
                :label="item.tagName"
                :value="item.tagCode"
                :key="item.tagCode"
              />
            </el-select>

            <CategoryCascader
              v-if="type === 'supplierSku'"
              v-model="search.categoryCode"
              placeholder="选择分类"
              @change="
                (val) => {
                  search.level = val.level;
                }
              "
            />
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
          :data="
            type === 'supplierSku'
              ? listData?.supplierSkuList
              : isShopify
              ? listData?.productList
              : listData?.productSkuBeanList
          "
          :row-key="serviceMap[type].key"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="单选" width="55" align="center" v-if="selectOne">
            <template #default="scope">
              <el-radio v-model="currentRow" :label="scope.row">{{}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column v-else type="selection" width="55" reserve-selection />
          <el-table-column label="产品信息" min-width="200" v-if="isShopify">
            <template #default="scope">
              <GoodsInfo
                :title="scope.row.title"
                :subtitle="scope.row.sku"
                :src="scope.row.image"
              />
            </template>
          </el-table-column>
          <el-table-column label="产品SKU信息" min-width="200" v-else>
            <template #default="scope">
              <GoodsInfo
                :src="scope.row.productImageUrl"
                :title="scope.row.productTitle"
                :subtitle="scope.row.skuCode"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="type === 'supplierSku'"
            prop="productSku"
            label="供应链SKU"
            min-width="120"
          />
          <el-table-column
            v-if="type === 'supplierSku'"
            prop="categoryNames"
            label="分类"
            min-width="200"
          />
          <el-table-column v-if="isShopify" prop="price" label="渠道售价" min-width="120">
            <template #default="scope">
              <span v-if="scope.row.price">{{ scope.row.price }} USD</span>
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
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { dataApi, productApi, ProductApi, ProductContracts } from '@/api/index';
  import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      type?: string;
      statuses?: string;
      selectedKey?: string;
      productType?: number;
      productSpu?: string;
    }>(),
    {
      selectOne: false,
      confirmText: '关联产品',
      type: 'sku',
    }
  );

  const serviceMap = {
    sku: {
      service: productApi.luteosProductSkuQueryProductSkuList,
      key: 'skuCode',
    },
    supplierSku: {
      service: productApi.luteosProductSkuQuerySupplierSkuList,
      key: 'productSku',
    },
    shopify: {
      service: dataApi.luteosDataQueryOnlineProductList,
      key: 'sku',
    },
  };

  const isShopify = computed(() => {
    return props.type === 'shopify';
  });

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
    ProductApi.LuteosProductSkuQueryProductSkuList.RequestQuery,
    ProductApi.LuteosProductSkuQueryProductSkuList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      categoryCode: undefined,
      level: undefined,
      tagCode: undefined,
      statuses: props.statuses,
      productType: props.productType,
      productSpu: props.productSpu,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: serviceMap[props.type].service,
  });
  const currentRow = ref();
  const selectedKey = ref();

  const handleRowChange = (_, row) => {
    currentRow.value = row;
  };
  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
    if (props.selectedRow) {
      currentRow.value = props.selectedRow;
      selectedKey.value = props.selectedKey;
    }
  };
  setSelectedRows();
  runQuery();
  // 勾选产品
  const totalList = reactive([]);
  const handleSelectionChange = (list) => {
    // console.log('selectedlist', list)
    totalList.value = list;
  };

  // 选择产品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个产品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit('close', true, props.selectOne ? totalList.value[0] : totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择产品',
        duration: 5 * 1000,
      });
    }
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };

  const labelOptions = ref<any[]>([]);
  const queryLabelOptions = async () => {
    const res = await productApi.luteosProductTagQueryTagList({
      tagType: 'sku',
      pageNum: 1,
      pageSize: 500,
    });
    labelOptions.value = res?.tagBeanList;
  };
  queryLabelOptions();
</script>

<style scoped lang="scss"></style>
