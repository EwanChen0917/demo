<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="请输入批次号/MAC地址/产品名称/供应链SKU"
          clearable
          style="width: 350px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.supplierCode" clearable filterable placeholder="供应商">
        <el-option
          v-for="item in supplierOptionsList"
          :key="item.supplierCode"
          :label="`${item.supplierCode}-${item.supplierName}` || ''"
          :value="item.supplierCode"
        />
      </el-select>
      <el-input
        v-model="poCodeStr"
        placeholder="多个PO号用英文逗号或空格隔开"
        clearable
        style="width: 250px"
        @input="handlePoChange"
      />
      <el-select
        v-model="search.developStateList"
        :options="developStateList"
        :props="{label: 'developStateDesc', value: 'developState'}"
        clearable
        filterable
        multiple
        placeholder="开发阶段"
        collapse-tags
      />
      <el-select v-model="search.factoryCode" clearable filterable placeholder="工厂名称">
        <el-option
          v-for="item in factoryList"
          :key="item.factoryCode"
          :label="`${item.factoryCode}-${item.factoryName}`"
          :value="item.factoryCode"
        />
      </el-select>
      <el-select
        v-model="search.productCodeList"
        :options="productCodeList"
        :props="{label: 'productCode', value: 'productCode'}"
        clearable
        filterable
        multiple
        placeholder="产品代码"
        collapse-tags
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="editLibraryVisible = true">生成MAC</el-button>
      <ExportBtn
        :service="productApi.luteosProductMacExportMacAddr"
        :params="search"
        :plain="false"
      >
        导出
      </ExportBtn>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.macAddressList || []">
      <el-table-column type="selection" min-width="40" />
      <el-table-column label="批次号" prop="batchNumber" min-width="105" />
      <el-table-column label="MAC地址" prop="macAddr" min-width="139" />
      <el-table-column label="供应链产品" min-width="250">
        <template #default="{ row }">
          <GoodsInfo
            :hideImage="true"
            :title="row.productName"
            :subtitle="row.productSku"
            :url="`/supplyGoods/detail?code=${row.productSku}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="贴片工厂" prop="factoryName" min-width="97">
        <template #default="{ row }">{{ row.factoryCode }}-{{ row.factoryName }}</template>
      </el-table-column>
      <el-table-column label="产品代码" prop="productCode" min-width="96" />
      <el-table-column label="系列" prop="seriesDesc" min-width="98" />
      <el-table-column label="衍生/迭代" prop="deriveDesc" min-width="90" />
      <el-table-column label="状态" prop="statusDesc" min-width="85">
        <template #default="{ row }">
          <Tag :color="row.status === 1 ? 'green' : 'red'">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="开发阶段" prop="developState" min-width="92" />
      <el-table-column label="来源PO" prop="poCode" min-width="159" />
      <el-table-column label="订单行" prop="orderLine" min-width="89" />
      <el-table-column label="供应商" prop="supplierName" min-width="217" />
      <el-table-column label="操作人" min-width="123px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">创建人：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.creatorName }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新人：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.operatorName }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="200px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">创建时间：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.createTime }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新时间：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.updateTime }}</span>
            </div>
          </div>
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
  <EditLibrary
    v-if="editLibraryVisible"
    :visible="editLibraryVisible"
    @close-modal="closeModalRedact"
  />
</template>

<script lang="ts" setup name="macAddressLibrary">
  import { ElTable as ElTableType, ElMessage } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, dataApi } from '@/api/index';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import EditLibrary from './components/Modal/editLibrary.vue';

  const poCodeStr = ref('');
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
    runQuery,
    resetSearch,
    listData,
    listLoading,
  } = useList<
    ProductApi.LuteosProductMacQueryMacAddressList.RequestQuery,
    ProductApi.LuteosProductMacQueryMacAddressList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      developStateList: undefined,
      productCodeList: undefined,
      factoryCode: undefined,
      supplierCode: undefined,
      poCodeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMacQueryMacAddressList,
  });

  const developStateList = ref([
    {
      developState: 'EVT',
      developStateDesc: 'EVT',
    },
    {
      developState: 'DVT',
      developStateDesc: 'DVT',
    },
    {
      developState: 'PVT',
      developStateDesc: 'PVT',
    },
    {
      developState: 'MP',
      developStateDesc: 'MP',
    },
  ]);

  const factoryList = ref([]);
  const queryMacFactory = async () => {
    const res: any = await productApi.luteosProductMacQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    factoryList.value = res.macFactoryList || [];
  };
  queryMacFactory();

  const productCodeList = ref([]);
  const queryProductCode = async () => {
    const res: any = await productApi.luteosProductMacQueryProductCodeList({
      pageNum: 1,
      pageSize: 100,
    });
    productCodeList.value = res.productCodeList || [];
  };
  queryProductCode();

  const supplierOptionsList = ref<any[]>([]);
  const getSupplierOptions = async () => {
    const res: any = await productApi.luteosProductMacQuerySupplierList();
    supplierOptionsList.value = res?.supplierList.filter((item) => item.supplierCode);
  };

  getSupplierOptions();

  const handlePoChange = (val) => {
    search.poCodeList = val
      .split(/[,\s]+/) // 按逗号或空格分割
      .map((item) => item.trim()) // 清理空格
      .filter((item) => item !== ''); // 移除空值
  };

  const editLibraryVisible = ref(false);
  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
    editLibraryVisible.value = false;
  };
  const reset = () => {
    resetSearch();
    poCodeStr.value = '';
  };
</script>

<style scoped lang="scss"></style>
