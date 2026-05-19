<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="请输入产品SPU/产品名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!--      <ErpSiteSelect v-model="search.site" clearable channel="amazon" multiple />-->
      <el-select v-model="search.gtmList" clearable placeholder="GTM小组" multiple>
        <el-option v-for="item in GTMOptions" :key="item" :value="item" :label="item">
          {{ item }}
        </el-option>
      </el-select>
      <DeptMember
        placeholder="运营"
        v-model="search.operatorList"
        clearable
        multiple
        deptId="65717209"
      />
      <ProductSiteSelect v-model="search.site" filterable multiple />
      <el-select v-model="search.checkType" clearable placeholder="类型">
        <el-option value="missing" label="缺失运营人员" />
        <el-option value="notUnique" label="运营人员不唯一" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <ExportBtn :ignore-app-code="true" :service="productApi.luteosProductAmazonOperatorCheckDownload" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column label="产品SPU" prop="spuCode" />
      <el-table-column label="产品名称" prop="spuName" />
      <el-table-column label="三级分类名称" prop="categoryNameLevel3" />
      <el-table-column label="四级分类名称" prop="categoryNameLevel4" />
      <el-table-column label="产品状态" prop="spuState" />
      <el-table-column label="站点" prop="site" />
      <el-table-column label="运营人员" prop="operator" />
      <el-table-column label="gtm小组" prop="gtm" />
      <el-table-column label="类型">
        <template #default="{ row }">
          <div v-if="row?.operatorCount === 0">缺失运营人员</div>
          <div v-if="row?.operatorCount > 1">运营人员不唯一</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '明细',
                key: 'detail',
                type: 'primary',
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

  <DetailDialog ref="detailDialogRef" />
</template>

<script setup lang="ts" name="amazonOperator">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import DetailDialog from '@/views/lute-os/goodscenter/goodsmanage/skurelation/components/detailDialog.vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const PAGE_SIZE = 10;
  const GTMOptions = ref([]);
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
    ProductApi.LuteosProductAmazonOperatorCheckQueryList.RequestQuery,
    ProductApi.LuteosProductAmazonOperatorCheckQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      site: undefined,
      checkType: undefined,
      operatorList: undefined,
      gtmList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductAmazonOperatorCheckQueryList,
  });

  const detailDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      // eslint-disable-next-line no-console
      detailDialogRef.value.open(row);
    }
  };
  const getGTMOptions = async () => {
    // 获取gtm小组
    const response = await productApi.luteosProductAmazonOperatorCheckQuerySpuGtmList({});
    console.log('response', response);
    GTMOptions.value = response;
  };
  getGTMOptions();
</script>

<style scoped lang="scss"></style>
