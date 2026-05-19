<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="请输入Item ID/MSKU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ProductChannelSelect v-model="search.channelList" clearable multiple />
      <ProductShopSelect v-model="search.shopList" clearable multiple />
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
      <el-button type="primary" @click="batchEditTag" :disabled="!selectedRows.length">
        批量添加标签
      </el-button>
      <ExportBtn :ignore-app-code="true" :service="productApi.luteosProductOnlineExport" :params="search">导出</ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.onlineProductList"
      row-key="uniqueCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo :src="scope.row.productImage" :title="scope.row.productName" />
        </template>
      </el-table-column>
      <el-table-column prop="saleSkuCode" label="Item_id" min-width="150" />
      <el-table-column prop="msku" label="MSKU" min-width="150" />
      <el-table-column prop="channel" label="渠道" />
      <el-table-column prop="shop" label="店铺" min-width="120" />
      <el-table-column prop="site" label="站点" />
      <el-table-column prop="newOldProduct" label="新/老品">
        <template #default="{ row }">
          <Tag v-if="row.newOldProduct" :color="row.newOldProduct === '新品' ? 'green' : 'gray'">
            {{ row.newOldProduct }}
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
                permissionCode: '',
              },
              {
                label: '添加/修改运营人员',
                key: 'editOperator',
                type: 'primary',
                row: row,
                permissionCode: '',
              },
              {
                label: '添加/修改链接',
                key: 'editLink',
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
    platform="newplatform"
    :asin-list="asinList"
    :action-type="actionType"
    :dimension-type="2"
    :uniqueCode="uniqueCode"
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
  import EditOperatorDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editOperatorDialog.vue';
  import EditLinkDialog from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/components/editLinkDialog.vue';
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
    ProductApi.LuteosProductOnlineQueryList.RequestBody,
    ProductApi.LuteosProductOnlineQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: route.query.keyword || undefined,
      channelList: route.query.channel ? [route.query.channel] : undefined,
      shopList: undefined,
      siteList: undefined,
      statusList: undefined,
      tagList: undefined,
      operatorList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductOnlineQueryList,
  });

  const tagList = ref([]);
  const queryTagList = async () => {
    const res = await productApi.luteosProductOnlineListingQueryTag({
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
  const uniqueCode = ref('');
  const curRow = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    uniqueCode.value = row.uniqueCode;
    if (key === 'editTag') {
      asinList.value = [
        {
          channel: row.channel,
          keyword: row.uniqueCode,
          shop: row.shop,
        },
      ];
      actionType.value = 1;
      editTagVisible.value = true;
      editTagTitle.value = '添加/修改标签';
    }
    if (key === 'editOperator') {
      childInfo.value = `itemId：${row.saleSkuCode}`;
      curRow.value = row;
      editOperatorVisible.value = true;
    }
    if (key === 'editLink') {
      childInfo.value = `itemId：${row.saleSkuCode}`;
      curRow.value = row;
      editLinkVisible.value = true;
    }
  };

  const batchEditTag = () => {
    asinList.value = selectedRows.value?.map((item) => {
      return {
        channel: item.channel,
        keyword: item.uniqueCode,
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
    await productApi.luteosProductOnlineSaveOperator({
      operator,
      uniqueCode: uniqueCode.value,
    });
    ElMessage.success('保存成功');
    editOperatorVisible.value = false;
    refreshList();
  };
  const handleLinkSave = async (url) => {
    await productApi.luteosProductOnlineSaveProductLink({
      productLink: url,
      uniqueCode: uniqueCode.value,
      channel: curRow.value.channel,
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
