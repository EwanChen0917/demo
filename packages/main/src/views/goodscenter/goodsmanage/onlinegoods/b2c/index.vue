<template>
  <el-tabs v-model="search.status" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statusCountBean[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="请输入产品名称/saleSkuCode/MSKU"
          clearable
          style="width: 325px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.channel" placeholder="平台" clearable filterable>
        <el-option v-for="item in channelList" :key="item" :value="item" :label="item" />
      </el-select>
      <OnlineSiteSelect v-model="search.siteList" clearable multiple placeholder="站点" />
      <ProductShopSelect
        v-model="search.shopList"
        clearable
        multiple
        :platform="search.channel"
        :site-list="search.siteList"
      />
      <DeptMember placeholder="运营" v-model="search.operatorIdList" clearable multiple />
      <OnlineGoodsLabel v-model="search.tagList" clearable multiple platform="b2c" />
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="batchEditTag"
        :disabled="!selectedRows.length"
        v-permission="'childEditTag'"
      >
        批量操作
      </el-button>
      <!--      <ExportBtn
        :service="productApi.luteosProductAmazonListingDownload"
        :params="{
          ...search,
          dimensionType: 1,
        }"
      >
        导出
      </ExportBtn>-->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="msku"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.imageUrl"
            :title="scope.row.productTitle"
            :url="scope.row.productLink"
            openUrl
          />
        </template>
      </el-table-column>
      <el-table-column label="平台" prop="channelName" min-width="100" />
      <el-table-column label="店铺" min-width="170">
        <template #default="scope">
          <div class="text-dark" style="word-break: break-all">
            {{ scope.row.shop }}
            <Copy :content="scope.row.shop" />
          </div>
          <div class="fs-7">{{ scope.row.site }} {{ scope.row.siteName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU信息" min-width="330">
        <template #default="{ row }">
          <div class="fs-7">
            saleSkuCode： {{ row?.saleSkuCode }}
            <Copy :content="row.saleSkuCode" />
          </div>
          <div class="fs-7">
            msku： {{ row?.msku }}
            <Copy :content="row.msku" />
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="运输方式">
              <template #default="{ row }">
                <Tag class="mb-2" :color="row.transportMode === 1 ? 'blue' : 'purple'">
                  {{ row.transportModeDesc }}
                </Tag>
              </template>
            </el-table-column>-->
      <el-table-column label="价格" min-width="150">
        <template #default="{ row }">
          <div class="fs-7">{{ row?.price }}</div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="状态" min-width="100">
        <template #default="{ row }">
          <div class="fs-7">
            产品：
            <Tag :color="statusColorMap[row.status]" size="small">{{ row.statusDesc }}</Tag>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="运营" prop="operatorName">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" min-width="140">
        <template #default="{ row }">
          <div class="d-flex gap-2 flex-wrap">
            <Tag v-for="item in row.tagList" :key="item.tagCode" size="small">
              {{ item.tagDesc }}
            </Tag>
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="上架日期" prop="listingTime" min-width="110">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.listingTime }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="推广首单日期" prop="firstOrderTime" min-width="110">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.firstOrderTime }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="销售映射日期" prop="mappingTime" min-width="110">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.mappingTime }}</span>
        </template>
      </el-table-column>-->

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
                // permissionCode: 'childEditTag',
              },
              {
                label: '添加映射',
                key: 'editMap',
                type: 'primary',
                row: row,
                hide: !row.missingMapping,
              },
              {
                label: '添加/修改运营人员',
                key: 'editOperator',
                type: 'primary',
                row: row,
                // permissionCode: 'childEditOperator',
              },
              {
                label: '添加/修改链接',
                key: 'editLink',
                type: 'primary',
                row: row,
                // permissionCode: 'childEditLink',
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
    platform="b2c"
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
    :row="curRow"
    :channel="curRow.channel"
    keyword="msku"
    @close="editOperatorVisible = false"
    @save="handleOperatorSave"
  />
  <EditLinkDialog
    title="添加/修改链接"
    v-if="editLinkVisible"
    :visible="editLinkVisible"
    :child-info="childInfo"
    :row="curRow"
    :channel="curRow.channel"
    keyword="msku"
    @close="editLinkVisible = false"
    @success="handleLinkSave"
  />
  <AddSkuModal
    title="新增"
    :detail-info="detailInfo"
    :visible="visible"
    v-if="visible"
    type="lose"
    ref="addSkuModalRef"
    @close="visible = false"
    @save="handleAddSkuRelation"
  />
  <BatchOperate
    v-if="batchOperateVisible"
    :visible="batchOperateVisible"
    platform="b2c"
    :asin-list="asinList"
    @close="batchOperateVisible = false"
    @save="handleBatchSave"
  />
</template>

<script setup lang="ts" name="b2cOnline">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import EditLinkDialog from '@/views/goodscenter/goodsmanage/onlinegoods/components/editLinkDialog.vue';
  import EditOperatorDialog from '@/views/goodscenter/goodsmanage/onlinegoods/components/editOperatorDialog.vue';
  import AddSkuModal from '@/views/goodscenter/goodsmanage/skulist/components/addSkuModal.vue';
  import EditTagDialog from '@/views/goodscenter/goodsmanage/onlinegoods/components/editTagDialog.vue';
  import BatchOperate from '@/views/goodscenter/goodsmanage/onlinegoods/components/batchOperate.vue';

  const PAGE_SIZE = 10;
  const tabStatusList = [
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: 0, code: 'normalCount', statusName: '正常', count: '' },
    { status: 1, code: 'errorCount', statusName: '异常', count: '' },
  ];

  const statusColorMap = {
    active: 'green',
    draft: 'blue',
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
    tableRef,
    selectedRows,
    handleSelectionChange,
    resetSearch,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductB2CListingQueryProductListingPage.RequestBody,
    ProductApi.LuteosProductB2CListingQueryProductListingPage.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopList: undefined,
      channel: undefined,
      siteList: undefined,
      tagList: undefined,
      operatorIdList: undefined,
      status: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductB2CListingQueryProductListingPage,
  });

  const editTagVisible = ref(false);
  const editOperatorVisible = ref(false);
  const editLinkVisible = ref(false);
  const editTagTitle = ref('');
  const asinList = ref([]);
  const actionType = ref();
  const childInfo = ref();
  const curRow = ref();
  const detailInfo = ref();
  const visible = ref(false);
  const batchOperateVisible = ref(false);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'editTag') {
      asinList.value = [
        {
          channel: row.channel,
          keyword: row.msku,
          shop: row.shop,
        },
      ];
      actionType.value = 1;
      editTagVisible.value = true;
      curRow.value = row;
      editTagTitle.value = '添加/修改标签';
    }
    if (key === 'editOperator') {
      childInfo.value = `msku：${row.msku}`;
      curRow.value = row;
      editOperatorVisible.value = true;
    }
    if (key === 'editLink') {
      childInfo.value = `msku：${row.msku}`;
      curRow.value = row;
      editLinkVisible.value = true;
    }
    if (key === 'editMap') {
      // detailInfo.value = row;
      detailInfo.value = {
        channel: row.channel,
        channelName: row.channelName,
        saleSkuCode: row.msku,
        userAccount: row.shop,
        site: row.site,
        siteName: row.siteName,
        msku: row.msku,
      };
      visible.value = true;
    }
  };

  const batchEditTag = () => {
    asinList.value = selectedRows.value?.map((item) => {
      return {
        channel: item.channel,
        keyword: item.msku,
        shop: item.shop,
      };
    });
    batchOperateVisible.value = true;
  };

  const handleSave = () => {
    editTagVisible.value = false;
    refreshList();
    tableRef.value.clearSelection();
  };

  const handleOperatorSave = async () => {
    editOperatorVisible.value = false;
    refreshList();
  };
  const handleLinkSave = async () => {
    editLinkVisible.value = false;
    refreshList();
  };

  const handleAddSkuRelation = () => {
    visible.value = false;
    refreshList();
  };

  const handleBatchSave = () => {
    batchOperateVisible.value = false;
    refreshList();
    tableRef.value.clearSelection();
  };

  const channelList = ref([]);
  const queryChannelList = async () => {
    const res = await productApi.luteosProductB2CListingQueryChannelList();
    channelList.value = res?.channelList || [];
  };
  queryChannelList();

  const toPath = (url) => {
    if (url.includes('http')) {
      openWindow(url);
    } else {
      ElMessage.warning('该链接无法跳转');
    }
  };
</script>

<style scoped lang="scss">
  .link {
    cursor: pointer;
    color: #3e97ff !important;

    &:hover {
      color: #78b6ff !important;
    }
  }
</style>
