<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="商品SPU" clearable style="width: 300px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="addGoods">新增商品</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.productList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="商品信息" min-width="200">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.productImage"
            :title="row.name"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column prop="productSpu" label="SPU" />
      <el-table-column prop="categoryLevel" label="分类" min-width="160" />
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
  <BindGoods
    v-if="bindGoodsVisible"
    ref="bindGoodsRef"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="productBeanList"
  />
</template>

<script setup lang="ts" name="cooperategoods">
    import { productApi, ProductApi, platformApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';

  const tagCode = ref('T000042');
  const queryDict = async () => {
    const res: any = await platformApi.platformDictQueryDictDetail({
      moduleCode: 'code_config',
      dictCode: 'meta_product_label',
    });
    tagCode.value = res.dictName;
    search.tagCode = tagCode.value;
  };
  queryDict();

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
    runQuery,
    resetSearch,
  } = useList<
    ProductApi.LuteosProductTagQueryTagProduct.RequestQuery,
    ProductApi.LuteosProductTagQueryTagProduct.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      tagCode: tagCode.value,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTagQueryTagProduct,
  });
  const productBeanList = ref([]);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      productBeanList.value = [row.productSpu];
      bindGoodsVisible.value = true;
    }
  };
  // 选择产品
  const bindGoodsVisible = ref(false);
  const bindGoodsRef = ref();
  const addGoods = () => {
    bindGoodsVisible.value = true;
    nextTick(() => {
      bindGoodsRef.value.open();
    });
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      await productApi.luteosProductTagConnectProduct({
        tagCode: tagCode.value,
        productSpuList: val.map((item) => item.productSpu),
      });
      runQuery();
    } else {
      productBeanList.value = [];
    }
    bindGoodsVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
