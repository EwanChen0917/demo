<template>
  <KeenList
    hideResetButton
    :selected-num="selectedCount"
    @refresh="refreshList"
    @reset-search="handleResetSearch"
    @reset-search-by-key="handleResetFilterKey"
    @clear-all="handleClearAllFilters"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="内购产品名称/供应链SKU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.productType" placeholder="产品分类" clearable>
        <el-option :value="1" label="在售品" />
        <el-option :value="2" label="清仓品" />
      </el-select>
      <el-select v-model="search.status" placeholder="产品状态" clearable>
        <el-option :value="0" label="待上架" />
        <el-option :value="1" label="销售中" />
        <el-option :value="2" label="无库存" />
        <el-option :value="3" label="已下架" />
      </el-select>
      <!--      <el-select v-model="search.labelCodeList" placeholder="产品标签" clearable multiple>
        <el-option
          v-for="item in labelCodeList"
          :key="item?.labelCode"
          :label="item?.name"
          :value="item?.labelCode"
        />
      </el-select>-->
    </template>
    <template #buttons>
      <!--      <el-button type="primary" @click="editLabelDialogRef?.open('新增产品标签')">
        新增标签
      </el-button>-->
      <el-button type="primary" @click="router.push('/internalPurchase/add')">
        新增内购产品
      </el-button>
      <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
      <!-- <el-button type="primary" @click="resetSearch">重置</el-button> -->
      <ExportBtn :ignore-app-code="true" :service="exportService" :params="exportParams">
        {{ selectedRows?.length ? '导出选中' : '导出' }}
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.mallProductList"
      row-key="productSku"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="内购产品信息" min-width="200px">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.imageUrl"
            :title="row.productTitle"
            :subtitle="row.productSku"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="产品状态">
        <template #default="{ row }">
          <Tag v-if="row?.statusDesc" :color="statusColorMap[row?.status]">
            {{ row?.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="售价" prop="price">
        <template #default="{ row }">¥{{ row.price }}</template>
      </el-table-column>
      <el-table-column label="销售库存" prop="remainingStock" />
      <!--      <el-table-column label="产品标签" min-width="120">
        <template #default="{ row }">
          <div class="d-flex gap-3 flex-wrap">
            <Tag v-for="item in row?.labelNameList" :key="item">
              {{ item }}
            </Tag>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="产品分类" min-width="90">
        <template #default="{ row }">
          <Tag v-if="row?.productType" :color="productTypeColorMap[Number(row.productType)]">
            {{ productTypeLabelMap[Number(row.productType)] || row.productType }}
          </Tag>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="产品详情链接" min-width="200px">
        <template #default="{ row }">
          <a :href="row?.productUrl" target="_blank">{{ row?.productUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '上架',
                key: 'launch',
                type: 'primary',
                hide: ![0, 3].includes(row.status),
                permissionCode: '',
                row,
              },
              {
                label: '下架',
                key: 'quit',
                type: 'primary',
                hide: ![1, 2].includes(row.status),
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
  <!--  <EditLabelDialog
    ref="editLabelDialogRef"
    @success="getLabelCodeList"
    module="mall_product"
    :labelType="2"
    hide-parent
    hide-sort
    hide-status
  />-->
</template>

<script setup lang="ts" name="internalGoodsManage">
  import useList from '@/views/lute-os/hooks/list/useList';
  // import { platformApi } from '@/api';
  import { ProductApi, productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  // import EditLabelDialog from '@/views/lute-os/labelManage/components/editLabelDialog.vue';

  const statusColorMap = {
    1: 'green',
    2: 'purple',
    3: 'red',
  };

  // const editLabelDialogRef = ref();
  const router = useRouter();

  const PAGE_SIZE = 10;
  const productTypeLabelMap: Record<number, string> = {
    1: '在售品',
    2: '清仓品',
  };
  const productTypeColorMap: Record<number, string> = {
    1: 'green',
    2: 'purple',
  };
  const statusLabelMap: Record<number, string> = {
    0: '待上架',
    1: '销售中',
    2: '无库存',
    3: '已下架',
  };

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
    ProductApi.LuteosProductMallQueryProductList.RequestBody,
    ProductApi.LuteosProductMallQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: undefined,
      // labelCodeList: undefined,
      productType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMallQueryProductList,
  });

  const tableRef = ref();
  const selectedRows = ref([]);
  const selectedCount = computed(() => selectedRows.value.length);
  const selectedFilters = computed(() => {
    const filters = [
      {
        key: 'productType',
        label: '产品分类',
        value: productTypeLabelMap[Number(search.productType)],
      },
      {
        key: 'status',
        label: '产品状态',
        value: statusLabelMap[Number(search.status)],
      },
      {
        key: 'keyword',
        label: '关键词',
        value: search.keyword,
      },
    ];
    return filters.filter((item) => (Array.isArray(item.value) ? item.value.length : item.value));
  });
  const handleSelectionChange = (rows) => {
    selectedRows.value = rows;
  };

  watch([() => search.keyword, () => search.status, () => search.productType], () => {
    selectedRows.value = [];
    tableRef.value?.clearSelection();
  });
  const handleResetSearch = () => {
    resetSearch();
  };
  const handleResetFilterKey = (key: string) => {
    if (key === 'productType') {
      search.productType = undefined;
    } else if (key === 'status') {
      search.status = undefined;
    } else if (key === 'keyword') {
      search.keyword = undefined;
    }
  };
  const handleClearAllFilters = () => {
    resetSearch();
  };

  const exportService = productApi.luteosProductMallExportProductList;
  const exportParams = computed(() => {
    const base = {
      keyword: search.keyword,
      status: search.status,
      productType: search.productType,
    };
    // 下载中心会展示 queryParam，提前转为中文文案，避免只看到枚举数字
    const queryParam = Object.entries({
      产品分类: productTypeLabelMap[Number(search.productType)] || '',
      产品状态: statusLabelMap[Number(search.status)] || '',
      关键词: search.keyword || '',
    }).reduce<Record<string, string>>((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    const productSkuList = selectedRows.value?.map((item) => item.productSku).filter(Boolean);
    return {
      ...base,
      pageNum: 1,
      pageSize: productSkuList?.length || pageSize.value || PAGE_SIZE,
      productSkuList,
      queryParam,
    };
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      router.push(`/internalPurchase/detail?code=${row.productSku}`);
    }
    if (key === 'edit') {
      router.push(`/internalPurchase/edit?code=${row.productSku}`);
    } else if (key === 'launch') {
      const isConfirmed = await swal.confirm('确定上架吗？');
      if (isConfirmed) {
        await productApi.luteosProductMallOperateProduct({
          productSku: row.productSku,
          operateType: 'on_shelf',
        });
        ElMessage.success('上架成功');
        refreshList();
      }
    } else if (key === 'quit') {
      const isConfirmed = await swal.confirm('确定下架吗？');
      if (isConfirmed) {
        await productApi.luteosProductMallOperateProduct({
          productSku: row.productSku,
          operateType: 'off_shelf',
        });
        ElMessage.success('下架成功');
        refreshList();
      }
    }
  };

  // const labelCodeList = ref([]);
  // const getLabelCodeList = async () => {
  //   const res = await platformApi.platformLabelQueryLabelList({
  //     module: 'mall_product',
  //     pageNum: 1,
  //     pageSize: 500,
  //     status: 1,
  //   });
  //   labelCodeList.value = res?.labelInfoList || [];
  // };

  // onMounted(() => {
  //   getLabelCodeList();
  // });
</script>

<style scoped lang="scss"></style>
