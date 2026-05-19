<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.saleSkuCode" placeholder="渠道唯一标识" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ProductChannelSelect v-model="search.channel" placeholder="渠道" clearable class="w-125px" />
      <CountrySelect v-model="search.site" placeholder="站点" clearable class="w-125px" />
      <ProductShopSelect
        v-model="search.userAccount"
        placeholder="店铺"
        clearable
        :platform="search.channel"
        :site="search.site"
        class="w-125px"
      />
      <DeptMember
        v-model="search.operator"
        placeholder="运营"
        deptId="65717209"
        clearable
        class="w-125px"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button
        v-permission="'skurelationImport'"
        class="button"
        type="primary"
        @click="batchUpdateVisible = true"
      >
        导入
      </el-button>
      <ExportBtn :ignore-app-code="true"
        :service="productApi.luteosProductSaleSkuRelationMissExport"
        :params="{
          ...search,
          uniqueCodeList: codeList,
        }"
        @success="tableRef?.clearSelection()"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.missList"
      row-key="uniqueCode"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="渠道唯一标识" prop="saleSkuCode" min-width="150">
        <template #default="{ row }">
          <el-space>
            <span>{{ row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode }}</span>
            <i
              v-if="row.saleSkuCode"
              class="fas fa-copy text-hover-primary cursor-pointer"
              @click.stop="copyFn(row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode, '')"
            ></i>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU" prop="msku" min-width="120">
        <template #default="{ row }">
          <span>{{ row.msku || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道" prop="channelName" />
      <el-table-column label="店铺账号" prop="userAccount" min-width="150" />
      <el-table-column label="站点" prop="siteName" />
      <el-table-column label="运营" prop="operatorName" />
      <el-table-column label="操作" fixed="right" width="100">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
                permissionCode: 'skurelationEdit',
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
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="sale_sku"
    title="导入(新增店铺SKU)"
    @close="batchUpdate"
  />
  <AddSkuModal
    :dickbook="dickbook"
    title="编辑"
    :detail-info="detailInfo"
    :visible="visible"
    v-if="visible"
    type="lose"
    ref="addSkuModalRef"
    @close="visible = false"
    @save="handleAddSkuRelation"
  />
</template>

<script setup lang="ts" name="loselist">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { platformApi, PlatformApi, productApi, ProductApi } from '@/api';
  import { copyFn } from '@/utils/copyFn';
  import BatchUpdateModal from '@/views/lute-os/goodscenter/components/BatchUpdateModal.vue';
  import AddSkuModal from '@/views/lute-os/goodscenter/goodsmanage/skulist/components/addSkuModal.vue';
  import { IDickbook } from '@/views/lute-os/goodscenter/goodsmanage/skulist/data';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const tableRef = ref(null);
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
    ProductApi.LuteosProductSaleSkuRelationMissQueryList.RequestQuery,
    ProductApi.LuteosProductSaleSkuRelationMissQueryList.ResponseBody
  >({
    searchDefaults: {
      saleSkuCode: undefined,
      channel: undefined,
      userAccount: undefined,
      site: undefined,
      operator: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuRelationMissQueryList,
  });

  const route = useRoute();
  if (route.query?.operator) {
    search.operator = route.query?.operator as string;
  }

  // 导入
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  const detailInfo = ref();
  const visible = ref(false);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      detailInfo.value = row;
      visible.value = true;
    }
  };

  const dickbook = ref<IDickbook>({});
  const getDickBook = async () => {
    const res: PlatformApi.PlatformDict.ResponseBody = await platformApi.platformDict({
      dictCodes: [
        'product_shop',
        'shop_platform',
        'product_channel',
        'product_site',
        'product_saletype',
        'product_activity',
      ],
    });
    dickbook.value = {
      ...(res.dictMap as IDickbook),
    };
  };
  getDickBook();

  // 勾选产品
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.uniqueCode);
  };

  const handleAddSkuRelation = () => {
    visible.value = false;
    refreshList();
  };
</script>

<style scoped lang="scss"></style>
