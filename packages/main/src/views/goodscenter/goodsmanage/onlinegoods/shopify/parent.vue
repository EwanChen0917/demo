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
          placeholder="请输入Product ID/Variant ID/MSKU"
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ShopSelect v-model="search.shopList" clearable multiple platform="shopify" />
      <ProductSiteSelect v-model="search.siteList" clearable multiple />
      <el-select placeholder="状态" v-model="search.statusList" clearable multiple>
        <el-option value="active" label="在售" />
        <el-option value="draft" label="草稿" />
      </el-select>
      <el-select placeholder="标签" v-model="search.tagList" clearable multiple>
        <el-option
          v-for="item in tagList"
          :value="item.tagCode"
          :label="item.tagDesc"
          :key="item.tagCode"
        />
      </el-select>
      <DeptMember
        placeholder="运营"
        v-model="search.operatorList"
        clearable
        multiple
        deptId="65717209"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="batchEditTag" :disabled="!selectedRows.length">
        批量添加标签
      </el-button>
      <ExportBtn
        :service="productApi.luteosProductShopifyListingListingDownload"
        :params="{
          ...search,
          dimensionType: 1,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="productId"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo :src="scope.row.imageUrl" :title="scope.row.productTitle" />
        </template>
      </el-table-column>
      <el-table-column prop="productId" label="Product ID" min-width="120" />
      <el-table-column label="Variant ID" min-width="130">
        <template #default="{ row }">
          <span v-if="row?.variantList?.length === 1">{{ row?.variantList[0] }}</span>
          <el-dropdown trigger="click" v-else-if="row?.variantList?.length > 1">
            <span class="el-dropdown-link">
              {{ row?.variantList[0] }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in row.variantList" :key="item">
                  <span v-if="index > 0">{{ item }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="MSKU" min-width="150">
        <template #default="{ row }">
          <span v-if="row?.mskuList?.length === 1">{{ row?.mskuList[0] }}</span>
          <el-dropdown trigger="click" v-else-if="row?.mskuList?.length > 1">
            <span class="el-dropdown-link">
              {{ row?.mskuList[0] }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in row.mskuList" :key="item">
                  <span v-if="index > 0">{{ item }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column prop="shop" label="店铺" min-width="120" />
      <el-table-column prop="site" label="站点" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row.status === 'active' ? 'green' : 'blue'">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="新/老品">
        <template #default="{ row }">
          <Tag
            class="mb-2"
            v-for="item in row.newOldProductList"
            :key="item"
            :color="item === '新品' ? 'green' : 'gray'"
          >
            {{ item }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="运营">
        <template #default="{ row }">
          <span v-if="row?.operatorList?.length === 1">
            {{ row?.operatorList[0]?.operatorName }}
          </span>
          <el-dropdown trigger="click" v-else-if="row?.operatorList?.length > 1">
            <span class="el-dropdown-link">
              {{ row?.operatorList[0]?.operatorName }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in row.operatorList" :key="item">
                  <span v-if="index > 0">{{ item?.operatorName }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="标签" min-width="120">
        <template #default="{ row }">
          <div class="d-flex gap-2 flex-wrap">
            <Tag v-for="item in row.tagList" :key="item.tagCode">
              {{ item.tagDesc }}
            </Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '添加/修改标签',
                key: 'editTag',
                type: 'primary',
                row: row,
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
  <EditTagDialog
    :title="editTagTitle"
    v-if="editTagVisible"
    :visible="editTagVisible"
    platform="shopify"
    :asin-list="asinList"
    :action-type="actionType"
    :dimension-type="1"
    @close="editTagVisible = false"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import EditTagDialog from '@/views/goodscenter/goodsmanage/onlinegoods/components/editTagDialog.vue';
  import ShopSelect from '@/views/goodscenter/goodsmanage/onlinegoods/components/shopSelect.vue';

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
    selectedRows,
    handleSelectionChange,
    tableRef,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductShopifyListingQueryParentProductIdPage.RequestBody,
    ProductApi.LuteosProductShopifyListingQueryParentProductIdPage.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopList: undefined,
      siteList: undefined,
      statusList: undefined,
      tagList: undefined,
      operatorList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductShopifyListingQueryParentProductIdPage,
  });

  const tagList = ref([]);
  const queryTagList = async () => {
    const res = await productApi.luteosProductShopifyListingListingQueryTag({
      dimensionType: 1,
    });
    tagList.value = res?.tagList;
  };

  const editTagVisible = ref(false);
  const editTagTitle = ref('');
  const asinList = ref([]);
  const actionType = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'editTag') {
      asinList.value = [
        {
          keyword: row.productId,
          shop: row.shop,
        },
      ];
      actionType.value = 1;
      editTagVisible.value = true;
      editTagTitle.value = '添加/修改标签';
    }
  };

  const batchEditTag = () => {
    asinList.value = selectedRows.value?.map((item) => {
      return {
        keyword: item.productId,
        shop: item.shop,
      };
    });
    actionType.value = 2;
    editTagVisible.value = true;
    editTagTitle.value = '批量添加标签';
  };

  const handleSave = () => {
    editTagVisible.value = false;
    refreshList();
    queryTagList();
    tableRef.value.clearSelection();
  };

  onActivated(() => {
    queryTagList();
  });
</script>

<style scoped lang="scss">
  .el-dropdown-link {
    color: var(--el-table-text-color);
  }
</style>
