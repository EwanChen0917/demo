<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search></template>
    <template #filters>
      <el-select v-model="search.brandCodeList" placeholder="品牌" filterable clearable multiple>
        <el-option
          v-for="item in brandList"
          :key="item.brandCode"
          :label="item.brandName"
          :value="item.brandCode"
        />
      </el-select>
      <ProductChannelSelect v-model="search.channel" clearable placeholder="渠道" />
      <!--      <CountrySelect v-model="search.site" clearable placeholder="站点" />-->
      <ErpSiteSelect
        v-model="search.site"
        clearable
        style="width: 120px"
        :channel="search.channel"
      />
      <el-select
        v-model="search.stockSite"
        placeholder="备货站点"
        filterable
        clearable
      >
        <el-option
          v-for="item in STOCKSITELIST"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="editSiteDialogRef?.open()">新增站点</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      row-key="id"
    >
      <el-table-column label="渠道" prop="channelDesc" />
      <el-table-column label="品牌" prop="brandName" />
      <el-table-column label="站点" prop="site" />
      <el-table-column label="备货站点" prop="stockSite"></el-table-column>
      <el-table-column label="国家" prop="countryDesc" />
      <el-table-column label="操作" fixed="right" width="120px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
                permissionCode: '',
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
  <EditSiteDialog ref="editSiteDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="siteRelation">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, productApi } from '@/api';
  import EditSiteDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/siteRelation/components/editSiteDialog.vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import { STOCKSITELIST } from './config';

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
    ErpApi.LuteosErpBaseSiteQueryList.RequestBody,
    ErpApi.LuteosErpBaseSiteQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: undefined,
      site: undefined,
      brandCodeList: undefined,
      stockSite:undefined
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpBaseSiteQueryListV1,
  });

  const editSiteDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editSiteDialogRef.value?.open(row);
    }
  };
  // 查询品牌
  const brandList = ref([]);
  const queryBrandList = () => {
    productApi
      .luteosProductBrandQueryBrandList({
        pageNum: 1,
        pageSize: 100,
      })
      .then((res: any) => {
        if (+res.code === 200) {
          brandList.value = res.brandBeanList || [];
        }
      });
  };
  onActivated(()=>{
    refreshList()
  })
  queryBrandList();
</script>

<style scoped lang="scss"></style>
