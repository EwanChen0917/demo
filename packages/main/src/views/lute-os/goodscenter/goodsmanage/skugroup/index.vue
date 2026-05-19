<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyWord" placeholder="产品名称/产品SKU/产品SPU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <CategoryCascader
        v-model="categoryCodeList"
        placeholder="选择分类"
        @change="
          (val) => {
            search.categoryCode = val.categoryCode;
            search.level = val.level;
          }
        "
      />
      <OperatorSelect v-model="search.developLuteId" />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button
        v-permission="'skugroupExport'"
        class="button"
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.productGroupSkuBeanList"
      row-key="groupSkuCode"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品SKU信息" min-width="200">
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImageUrl"
            :title="scope.row.name"
            :subtitle="scope.row.groupSkuCode"
            :url="`/skugroup/detail?code=${scope.row.groupSkuCode}`"
            permission="skugroupDetail"
          />
        </template>
      </el-table-column>
      <el-table-column prop="groupProductSpu" label="产品SPU" min-width="140" />
      <el-table-column prop="categoryName" label="分类" min-width="200">
        <template #default="{ row }">
          <div class="me-5">{{ row.categoryName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="developLuteName" min-width="100" label="产品经理" />
      <el-table-column min-width="100" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                groupSkuCode: row.groupSkuCode,
                permissionCode: 'skugroupEdit',
              },
              /* {
                label: '详情',
                key: 'view',
                type: 'primary',
                groupSkuCode: row.groupSkuCode,
                permissionCode: 'skugroupDetail',
              },*/
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

<script setup lang="ts" name="skugroup">
    import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';

  const PAGE_SIZE = 10;
  const categoryCodeList = ref<string[]>([]);
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
    ProductApi.LuteosProductGroupSkuQueryProductGroupSkuList.RequestQuery,
    ProductApi.LuteosProductGroupSkuQueryProductGroupSkuList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      categoryCode: undefined,
      developLuteId: undefined,
      level: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductGroupSkuQueryProductGroupSkuList,
  });

  const route = useRoute();
  const router = useRouter();
  const { code } = route.query;
  if (code) search.keyWord = code;
  const handleActions = (item) => {
    const { groupSkuCode, key } = item;
    switch (key) {
      case 'edit':
        router.push(`/skugroup/edit?code=${groupSkuCode}`);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    categoryCodeList.value = [];
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
