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
        <el-input
          v-model="search.keyword"
          placeholder="请输入spu/skuCode/productSku"
          clearable
          style="width: 275px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <DeptMember
        placeholder="运营"
        v-model="search.operatorIdList"
        clearable
        multiple
        deptId="65717209"
      />
      <OnlineGoodsLabel v-model="search.tagList" clearable multiple platform="offline" />
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
      <el-button type="primary" :loading="importLoading" class="import-btn" @click="uploadFile">
        导入
      </el-button>
      <!--      <el-button class="button" type="primary" @click="handleExport" :loading="exportLoading">
        导出
      </el-button>-->
      <ExportBtn :ignore-app-code="true" :service="channelProductApi.luteosChannelProductExportProduct" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="productSku"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.imageUrl"
            :title="scope.row.productTitle"
            :subtitle="scope.row.productSku"
            :url="scope.row.productLink"
            copySubtitle
            openUrl
          />
        </template>
      </el-table-column>
      <el-table-column label="店铺" min-width="140">
        <template #default="scope">
          <GoodsInfo :title="scope.row.shop" :subtitle="scope.row.site" hideImage />
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU信息" min-width="270">
        <template #default="{ row }">
          <div class="fs-7">
            productSpu： {{ row?.spuCode }}
            <Copy :content="row.spuCode" />
          </div>
          <div class="fs-7">
            skuCode： {{ row?.skuCode }}
            <Copy :content="row.skuCode" />
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
          <div class="fs-7">采购价格：{{ row?.purchasePrice }}</div>
          <div class="fs-7">建议零售价：{{ row?.suggestPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100">
        <template #default="{ row }">
          <div class="fs-7">
            <Tag :color="statusColorMap[row.status]" size="small">{{ row.statusDesc }}</Tag>
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
      <el-table-column label="记录日期" prop="recordTime" min-width="110">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.recordTime }}</span>
        </template>
      </el-table-column>
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
    platform="offline"
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
    channel="offline"
    keyword="productSku"
    @close="editOperatorVisible = false"
    @save="handleOperatorSave"
  />
  <EditLinkDialog
    title="添加/修改链接"
    v-if="editLinkVisible"
    :visible="editLinkVisible"
    :child-info="childInfo"
    :row="curRow"
    channel="offline"
    keyword="productSku"
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
  <UploadFileModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    @close="
      () => {
        uploadVisible = false;
      }
    "
    @save="handleUploadSuccess"
  />
  <BatchOperate
    v-if="batchOperateVisible"
    :visible="batchOperateVisible"
    platform="offline"
    :asin-list="asinList"
    @close="batchOperateVisible = false"
    @save="handleBatchSave"
  />
</template>

<script setup lang="ts" name="offlineGoods">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { channelProductApi, productApi, ProductApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import EditLinkDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editLinkDialog.vue';
  import EditOperatorDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editOperatorDialog.vue';
  import AddSkuModal from '@/views/lute-os/goodscenter/goodsmanage/skulist/components/addSkuModal.vue';
  import BatchOperate from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/batchOperate.vue';
  import * as swal from '@/utils/swal';
  import UploadFileModal from '@/views/supplyChainManage/channelProduct/Modal/UploadFileModal.vue';
  import { useRequest } from 'vue-request';
  import EditTagDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editTagDialog.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const PAGE_SIZE = 10;
  const tabStatusList = [
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: '正常售卖', code: 'normalCount', statusName: '正常', count: '' },
    { status: '新品', code: 'newProductCount', statusName: '新品', count: '' },
    { status: '清货', code: 'clearProductCount', statusName: '清货', count: '' },
    { status: '完成清货', code: 'finishedClearCount', statusName: '完成清货', count: '' },
    { status: '未知', code: 'unKnownCount', statusName: '未知', count: '' },
  ];

  const statusColorMap = {
    1: 'green',
    2: 'red',
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
    ProductApi.LuteosProductOfflineListingQueryProductListingPage.RequestBody,
    ProductApi.LuteosProductOfflineListingQueryProductListingPage.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopList: undefined,
      siteList: undefined,
      tagList: undefined,
      operatorIdList: undefined,
      status: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductOfflineListingQueryProductListingPage,
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
          keyword: row.productSku,
          shop: row.shop,
        },
      ];
      actionType.value = 1;
      editTagVisible.value = true;
      editTagTitle.value = '添加/修改标签';
    }
    if (key === 'editOperator') {
      childInfo.value = `productSku：${row.productSku}`;
      curRow.value = row;
      editOperatorVisible.value = true;
    }
    if (key === 'editLink') {
      childInfo.value = `productSku：${row.productSku}`;
      curRow.value = row;
      editLinkVisible.value = true;
    }
    if (key === 'editMap') {
      // detailInfo.value = row;
      detailInfo.value = {
        channel: 'offline',
        channelName: row.channelName,
        saleSkuCode: row.msku,
        userAccount: row.shop,
        site: row.site,
        siteName: row.siteName,
        productSku: row.productSku,
      };
      visible.value = true;
    }
  };

  const batchEditTag = () => {
    asinList.value = selectedRows.value?.map((item) => {
      return {
        keyword: item.productSku,
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

  // 文件上传
  const uploadVisible = ref<boolean>(false);
  const uploadFile = () => {
    uploadVisible.value = true;
  };
  const importLoading = ref(false);

  const handleUploadSuccess = (files) => {
    uploadVisible.value = false;
    // 获取文件信息
    const file = files[files.length - 1];
    importLoading.value = true;
    // 导入
    channelProductApi
      .luteosChannelProductImportData({
        fileName: file.name,
        importScene: 'channel_product',
        key: file.ossKey,
      })
      .then(async (res: any) => {
        // 导入成功处理
        importLoading.value = false;
        runQuery();
        if (+res.failedCount > 0) {
          const isConfirmed = await swal.confirm({
            text: '有线下渠道产品导入失败，具体请前往上传日志查看',
            icon: 'error',
            confirmButtonText: '去查看',
            cancelButtonText: '知道了',
          });
          if (!isConfirmed) return;
          openWindow('/salesForecastingLog');
        } else {
          ElMessage.success('导入成功');
        }
      })
      .finally(() => {
        importLoading.value = false;
        uploadVisible.value = false;
      });
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
