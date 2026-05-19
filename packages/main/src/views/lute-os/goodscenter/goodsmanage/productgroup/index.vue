<template>
  <KeenList>
    <template #search>
      <el-input placeholder="组合产品名称/组合产品SPU" v-model="search.keyWord">
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
      <OperatorSelect v-model="search.developLuteId" operatorType="1" />
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="router.push('/productgroup/add')">新增</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </template>
    <el-table :data="listData?.productGroupBeanList">
      <el-table-column label="组合产品信息" min-width="180">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.productImageUrl"
            :title="row.name"
            :subtitle="row.groupProductSpu"
            :url="`/productgroup/detail?code=${row.groupProductSpu}`"
            permission="productgroupDetail"
          />
        </template>
      </el-table-column>
      <el-table-column label="组合SKU数量">
        <template #default="{ row }">
          <el-link
            class="fs-6"
            type="primary"
            :underline="false"
            @click="router.push('/skugroup?code=' + row.groupProductSpu)"
            v-if="row.groupSkuCount > 0"
          >
            {{ row.groupSkuCount }}
          </el-link>
          <span v-else>{{ row.groupSkuCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="categoryName" min-width="180" />
      <el-table-column label="产品经理" prop="developLuteName" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                code: row.groupProductSpu,
                permissionCode: 'productgroupEdit',
              },
              /*{
                label: '详情',
                key: 'view',
                type: 'primary',
                code: row.groupProductSpu,
                permissionCode: 'productgroupDetail',
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

<script setup lang="ts" name="productgroup">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';

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
    ProductApi.LuteosProductGroupQueryProductGroupList.RequestQuery,
    ProductApi.LuteosProductGroupQueryProductGroupList.ResponseBody
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
    service: productApi.luteosProductGroupQueryProductGroupList,
  });

  const categoryCodeList = ref<string[]>([]);

  const router = useRouter();
  const handleActions = (item) => {
    const { code, key } = item;
    switch (key) {
      case 'edit':
        router.push(`/productgroup/edit?code=${code}`);
        break;
      case 'view':
        toDetail(code);
        break;
      default:
        break;
    }
  };

  const toDetail = (code) => {
    if (code) router.push(`/productgroup/detail?code=${code}`);
  };

  const reset = () => {
    categoryCodeList.value = [];
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
