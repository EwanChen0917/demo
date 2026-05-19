<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="请输入子ASIN/父ASIN/MSKU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ShopSelect v-model="search.shopList" clearable multiple platform="amazon" />
      <ProductSiteSelect v-model="search.siteList" clearable multiple />
      <el-select placeholder="状态" v-model="search.statusList" clearable multiple>
        <el-option :value="1" label="在售" />
        <el-option :value="2" label="不在售" />
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
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <el-button
        type="primary"
        @click="batchEditTag"
        :disabled="!selectedRows.length"
        v-permission="'childEditTag'"
      >
        批量添加标签
      </el-button>
      <ExportBtn :ignore-app-code="true"
        :service="productApi.luteosProductAmazonListingListingDownload"
        :params="{
          ...search,
          dimensionType: 2,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="asin"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo :src="scope.row.imageUrl" :title="scope.row.productTitle" />
        </template>
      </el-table-column>
      <el-table-column prop="parentAsin" label="父ASIN" min-width="120" />
      <el-table-column prop="asin" label="子ASIN" min-width="130" />
      <el-table-column prop="msku" label="MSKU" min-width="150" />
      <el-table-column prop="shop" label="店铺" min-width="120" />
      <el-table-column prop="site" label="站点" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row.status === 1 ? 'green' : 'red'">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="newOldProduct" label="新/老品">
        <template #default="{ row }">
          <Tag v-if="row.newOldProduct" :color="row.newOldProduct === '新品' ? 'green' : 'gray'">
            {{ row.newOldProduct }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="运营方式">
        <template #default="{ row }">
          <Tag class="mb-2">
            {{ row.operationMethodDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="productLink" label="产品链接" min-width="150px">
        <template #default="{ row }">
          <a :href="row.productLink" target="_blank">{{ row.productLink }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="operatorName" label="运营" />
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
                permissionCode: 'childEditTag',
              },
              /*{
                label: '添加/修改运营人员',
                key: 'editOperator',
                type: 'primary',
                row: row,
                permissionCode: 'childEditOperator',
              },*/
              {
                label: '添加/修改链接',
                key: 'editLink',
                type: 'primary',
                row: row,
                permissionCode: 'childEditLink',
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
    platform="amazon"
    :asin-list="asinList"
    :action-type="actionType"
    :dimension-type="2"
    @close="editTagVisible = false"
    @save="handleSave"
  />
  <EditOperatorDialog
    v-if="editOperatorVisible"
    :visible="editOperatorVisible"
    :child-info="childInfo"
    :operator="curRow.operator"
    @close="editOperatorVisible = false"
    @save="handleOperatorSave"
  />
  <EditLinkDialog
    title="添加/修改链接"
    v-if="editLinkVisible"
    :visible="editLinkVisible"
    :child-info="childInfo"
    :url="curRow.productLink"
    @close="editLinkVisible = false"
    @save="handleLinkSave"
  />
</template>

<script setup lang="ts">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import EditTagDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editTagDialog.vue';
  import ShopSelect from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/shopSelect.vue';
  import EditLinkDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editLinkDialog.vue';
  import EditOperatorDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editOperatorDialog.vue';
  import { ElMessage } from 'element-plus';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const route = useRoute();

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
    ProductApi.LuteosProductAmazonListingQueryParentAsinPage.RequestBody,
    ProductApi.LuteosProductAmazonListingQueryParentAsinPage.ResponseBody
  >({
    searchDefaults: {
      keyword: route.query.keyword || undefined,
      shopList: undefined,
      siteList: undefined,
      statusList: undefined,
      tagList: undefined,
      operatorList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductAmazonListingQueryParentSonPage,
  });

  const tagList = ref([]);
  const queryTagList = async () => {
    const res = await productApi.luteosProductAmazonListingListingQueryTag({
      dimensionType: 2,
    });
    tagList.value = res?.tagList;
  };

  const editTagVisible = ref(false);
  const editOperatorVisible = ref(false);
  const editLinkVisible = ref(false);
  const editTagTitle = ref('');
  const asinList = ref([]);
  const actionType = ref();
  const childInfo = ref();
  const curRow = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'editTag') {
      asinList.value = [
        {
          keyword: row.asin,
          shop: row.shop,
        },
      ];
      actionType.value = 1;
      editTagVisible.value = true;
      editTagTitle.value = '添加/修改标签';
    }
    if (key === 'editOperator') {
      childInfo.value = `子ASIN：${row.asin}`;
      curRow.value = row;
      editOperatorVisible.value = true;
    }
    if (key === 'editLink') {
      childInfo.value = `子ASIN：${row.asin}`;
      curRow.value = row;
      editLinkVisible.value = true;
    }
  };

  const batchEditTag = () => {
    asinList.value = selectedRows.value?.map((item) => {
      return {
        keyword: item.asin,
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

  const handleOperatorSave = async (operator) => {
    await productApi.luteosProductAmazonListingSaveOperator({
      operator,
      productId: curRow.value.productId,
    });
    ElMessage.success('保存成功');
    editOperatorVisible.value = false;
    refreshList();
  };
  const handleLinkSave = async (url) => {
    await productApi.luteosProductAmazonListingSaveProductLink({
      productLink: url,
      productId: curRow.value.productId,
      channel: 'amazon',
      site: curRow.value.site,
      shop: curRow.value.shop,
    });
    ElMessage.success('保存成功');
    editLinkVisible.value = false;
    refreshList();
  };

  onActivated(() => {
    queryTagList();
  });
</script>

<style scoped lang="scss"></style>
