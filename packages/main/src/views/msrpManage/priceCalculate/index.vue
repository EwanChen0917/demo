<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="search.keywordType" style="width: 110px">
        <el-option label="产品SPU" :value="1" />
        <el-option label="产品SKU" :value="2" />
        <el-option label="产品名称" :value="3" />
      </el-select>
      <el-input v-model="search.keyword" placeholder="请输入" clearable class="ml-10">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <CategoryCascader
        v-model="search.categoryCode"
        placeholder="产品分类"
        style="margin-left: 10px"
        :emitPath="false"
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      />
      <CountrySelect
        v-model="countryCodeList"
        clearable
        multiple
        class="ml-10 w-200"
        @change="handleCountryChange"
      />
      <productChannelSelect
        v-model="channelCodeList"
        clearable
        multiple
        filterable
        class="ml-10 w-200"
        :collapse-tags-tooltip="false"
        @change="handleChannelChange"
      />
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button type="primary" @click="add" v-permission="'priceCalculateAdd'">新增测算</el-button>
      <!-- <ExportBtn :service="productApi.luteosProductMsrpExportMsrp" :params="search">导出</ExportBtn> -->
      <!-- <el-button
        type="primary"
        :disabled="selectedList?.length === 0"
        @click="batchEditDialogRef?.open(selectedList?.map((item) => item?.code))"
        v-permission="'priceCalculateBatch'"
      >
        批量处理
      </el-button> -->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="id"
      class-name="table-row-dashed"
      :tree-props="{ children: 'skuBeanList' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="40"
        reserve-selection
        :selectable="
          (row) =>
            row?.productType === 1 &&
            (selectedList?.length === 0 ||
              row.countryCode === selectedList?.[0]?.countryCode ||
              row.countryCode === listData?.resultList?.[0]?.countryCode)
        "
      />
      <el-table-column label="产品SPU/产品名称" min-width="180">
        <template #default="{ row }">
          <div v-if="row?.spuName">
            <!-- <el-link
              type="primary"
              :underline="false"
              @click="handleActions({ key: 'view', row: row })"
            > -->
            {{ row?.spuName }}
            <!-- </el-link> -->
            <div>{{ row?.spuCode }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品SKU/产品名称" min-width="180">
        <template #default="{ row }">
          <div v-if="row?.skuCode">
            <el-link
              type="primary"
              :underline="false"
              @click="handleActions({ key: 'detail', row: row })"
            >
              {{ row?.skuName }}
            </el-link>
            <div>{{ row?.skuCode }}</div>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="产品分类" prop="categoryLevel" />
      <el-table-column label="国家" prop="countryCode" />
      <el-table-column label="渠道" prop="channel" min-width="100">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            {{ row?.channel }}
          </div>
          <div
            class="fs-7 text-gray-600"
            v-if="row?.priceType === '线下定价' && row?.channel === 'offline' && row?.sceneType"
          >
            {{ row?.sceneType }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="MSRP" prop="msrp" min-width="150px">
        <template #default="{ row }">
          <div v-if="row?.productType !== 1" class="d-flex gap-2">
            <div>{{ row?.salePrice }}</div>
            <div class="fs-7 text-gray-600" v-if="row?.salePrice !== null && row?.salePrice !== ''">
              {{ row?.currencyCode }}
            </div>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="定价类型" prop="priceType" />
      <el-table-column label="状态" prop="state">
        <template #default="{ row }">
          <div v-if="row?.productType !== 1" class="d-flex gap-2">
            {{ row?.state == 1 ? '已确认' : '待确认' }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="版本号" prop="version" /> -->
      <el-table-column label="版本号" prop="version">
        <template #default="{ row }">
          <div v-if="row?.productType !== 1" class="d-flex gap-2">
            {{ row?.version }}
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                hide: !(row.productType === 2),
                permissionCode: 'priceCalculateEdit',
                row,
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                hide: !(row.productType === 2),
                permissionCode: 'priceCalculateDetail',
                row,
              },
              {
                label: '确认',
                key: 'comfirm',
                type: 'primary',
                hide: !(row.productType === 2 && row.state !== 1),
                permissionCode: 'priceCalculateConfirm',
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
</template>

<script setup lang="ts" name="priceCalculate">
  import useList from '@/hooks/list/useList';
  import { ProductApi, productApi } from '@/api';
  import { ElSelect, ElMessage, ElMessageBox } from 'element-plus';
  import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import productChannelSelect from './components/productChannelSelect.vue';
  // import { omit } from 'lodash-es';
  const countryCodeList = ref([]);
  const channelCodeList = ref([]);
  const tableRef = ref();
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
    ProductApi.LuteosProductMsrpCalculationQueryList.RequestQuery,
    ProductApi.LuteosProductMsrpCalculationQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      keywordType: 1,
      countryCodeList: undefined,
      channelCodeList: undefined,
      categoryCode: undefined,
      level: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMsrpCalculationQueryList,
  });
  const router = useRouter();
  // const route = useRoute();

  const add = () => {
    router.push('/priceCalculate/add');
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      // console.log('/priceCalculate/edit', row, row.id);
      router.push({
        path: '/priceCalculate/edit',
        query: {
          code: row.id,
        },
      });
    }
    if (key === 'detail') {
      router.push({
        path: `/priceCalculate/detail`,
        // name: 'priceCalculateDetail',
        query: {
          code: row.id,
        },
      });
    }
    if (key === 'comfirm') {
      // console.log(row);
      const confirmRes = await ElMessageBox.confirm('点击确认，将同步到MSRP对应的SKU正式定价', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      // console.log(confirmRes);
      if (confirmRes) {
        const res = await productApi.luteosProductMsrpCalculationSubmit({
          id: row.id,
        });
        if (res) {
          ElMessage.success('操作成功');
          refreshList();
        }
        // console.log(res);
      }
    }
  };

  // 批量编辑
  const selectedList = ref([]);
  const handleSelectionChange = async (list) => {
    selectedList.value = [];
    if (list.length) {
      list.forEach((item) => {
        if (item.productType === 1 && item.countryCode === list[0].countryCode) {
          selectedList.value.push(item);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
  };
  const handleCountryChange = (val) => {
    // search.countryCodeList = val.join(',');
    search.countryCodeList = val;
  };
  const handleChannelChange = (val) => {
    search.channelCodeList = val;
  };

  const reset = () => {
    countryCodeList.value = [];
    channelCodeList.value = [];
    resetSearch();
  };

  onActivated(() => {
    tableRef.value?.clearSelection();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .ml-10 {
    margin-left: 10px;
  }
  .w-200 {
    width: 200px;
  }
</style>
