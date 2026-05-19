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
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="请输入子ASIN/父ASIN/MSKU" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <OnlineSiteSelect v-model="search.siteList" clearable multiple placeholder="站点" />
      <ProductShopSelect
        v-model="search.shopList"
        clearable
        multiple
        platform="amazon"
        :site-list="search.siteList"
      />
      <DeptMember
        placeholder="运营"
        v-model="search.operatorIdList"
        clearable
        multiple
        deptId="65717209"
      />
      <OnlineGoodsLabel v-model="search.tagList" clearable multiple platform="amazon" />
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
      :row-key="
        (row) => {
          return row.id + row.site;
        }
      "
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.imageUrl"
            :title="scope.row.productTitle"
            :url="scope.row.asinUrl"
            openUrl
          />
        </template>
      </el-table-column>
      <el-table-column label="店铺" min-width="180">
        <template #default="scope">
          <div class="text-dark" style="word-break: break-all">
            {{ scope.row.shop }}
            <Copy :content="scope.row.shop" />
          </div>
          <div class="fs-7">{{ scope.row.site }} {{ scope.row.siteName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="ASIN信息" min-width="170">
        <template #default="{ row }">
          <div class="fs-7">
            父：
            <a class="link" @click="toPath(row.parentAsinUrl)">
              {{ row?.parentAsin }}
              <Copy :content="row.parentAsin" />
            </a>
          </div>
          <div class="fs-7">
            子：
            <a class="link" @click="toPath(row.asinUrl)">
              {{ row?.asin }}
              <Copy :content="row.asin" />
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU信息" min-width="230">
        <template #default="{ row }">
          <div class="fs-7">
            MSKU： {{ row?.msku }}
            <Copy :content="row.msku" />
          </div>
          <div class="fs-7">
            FNSKU： {{ row?.fnsku }}
            <Copy :content="row.fnsku" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="运输方式">
        <template #default="{ row }">
          <Tag class="mb-2" :color="row.transportMode === 1 ? 'blue' : 'purple'">
            {{ row.transportModeDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="价格" min-width="150">
        <template #default="{ row }">
          <div class="fs-7">产品价格：{{ row?.regularPrice }}</div>
          <div class="fs-7">促销价格：{{ row?.salePrice }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120">
        <template #default="{ row }">
          <div class="fs-7">
            产品：
            <Tag :color="statusColorMap[row.status]" size="small">{{ row.statusDesc }}</Tag>
          </div>
          <div class="fs-7">
            上架：
            <Tag :color="upStatusColorMap[row.upStatus]" size="small">{{ row.upStatusDesc }}</Tag>
          </div>
          <div class="fs-7">
            删除：
            <Tag :color="isDeleteColorMap[row.isDelete]" size="small">{{ row.isDeleteDesc }}</Tag>
          </div>
        </template>
      </el-table-column>
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
      <el-table-column label="推广首单日期" prop="firstOrderTime" min-width="110">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.firstOrderTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="亚马逊上架日期" prop="listingTime" min-width="110">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.listingTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推广标记状态" prop="firstOrderTime" min-width="110">
        <template #default="{ row }">
          <Tag :color="dspStatusColorMap[row.dspStatus]" size="small">{{ row?.dspStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              /*{
                label: '添加/修改标签',
                key: 'editTag',
                type: 'primary',
                row: row,
                permissionCode: 'parentEditTag',
              },*/
              {
                label: '大小类',
                key: 'toPerformance',
                type: 'primary',
                row: row,
              },
              {
                label: '评分',
                key: 'toPerformance',
                type: 'primary',
                row: row,
              },
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
              /*{
                label: '添加/修改运营人员',
                key: 'editOperator',
                type: 'primary',
                row: row,
                // permissionCode: 'childEditOperator',
              },*/
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
    :row="curRow"
    channel="amazon"
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
    channel="amazon"
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
</template>

<script setup lang="ts" name="amazonOnline">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import ShopSelect from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/shopSelect.vue';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import EditTagDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editTagDialog.vue';
  import EditLinkDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editLinkDialog.vue';
  import EditOperatorDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editOperatorDialog.vue';
  import AddSkuModal from '@/views/lute-os/goodscenter/goodsmanage/skulist/components/addSkuModal.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const PAGE_SIZE = 10;
  const tabStatusList = [
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: 1, code: 'listingCount', statusName: '上架', count: '' },
    { status: 2, code: 'delListing', statusName: '下架', count: '' },
  ];

  const statusColorMap = {
    1: 'green',
    2: 'blue',
    3: 'yellow',
    4: 'red',
  };

  const upStatusColorMap = {
    1: 'green',
    2: 'red',
  };

  const isDeleteColorMap = {
    0: 'green',
    1: 'red',
  };

  const dspStatusColorMap = {
    0: 'green',
    2: 'blue',
    3: 'red',
  };

  const router = useRouter();
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
    ProductApi.LuteosProductAmazonListingQueryAsinPage.RequestBody,
    ProductApi.LuteosProductAmazonListingQueryAsinPage.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopList: undefined,
      tagList: undefined,
      siteList: undefined,
      operatorIdList: undefined,
      status: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductAmazonListingQueryAsinPage,
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
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'toPerformance') {
      toPerformance(row);
    }
    if (key === 'editTag') {
      asinList.value = [
        {
          keyword: row.msku,
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
    if (key === 'editMap') {
      // detailInfo.value = row;
      detailInfo.value = {
        channel: 'amazon',
        channelName: '亚马逊',
        saleSkuCode: row.asin,
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
        keyword: item.msku,
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
    tableRef.value.clearSelection();
  };

  const handleOperatorSave = async (operator) => {
    /* await productApi.luteosProductAmazonListingSaveOperatorV2({
      operator,
      productId: curRow.value.productId,
    });
    ElMessage.success('保存成功'); */
    editOperatorVisible.value = false;
    refreshList();
  };
  const handleLinkSave = async () => {
    /* await productApi.luteosProductAmazonListingSaveProductLinkV2({
      productLink: url,
      productId: curRow.value.productId,
      channel: 'amazon',
      site: curRow.value.site,
      shop: curRow.value.shop,
    });
    ElMessage.success('保存成功'); */
    editLinkVisible.value = false;
    refreshList();
  };

  const handleAddSkuRelation = () => {
    visible.value = false;
    refreshList();
  };

  const toPerformance = (row) => {
    console.log(row);
    if (row) {
      // site, channel, shop, asin, sellerSku, skuCode
      const path = router.resolve({
        path: '/onlineGoodsPerformance/detail',
        query: {
          site: row.site,
          channel: row.channel,
          shop: row.shop,
          asin: row.asin,
          sellerSku: row.msku,
        },
      });
      openWindow(path.href);
    }
  };

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
