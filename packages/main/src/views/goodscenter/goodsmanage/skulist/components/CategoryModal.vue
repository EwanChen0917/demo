<template>
  <el-dialog title="选择归属SPU" v-model="visibility" width="800px">
    <div class="search-wrapper">
      <el-space>
        <el-input v-model="searchParams.productName" placeholder="产品名称/产品SKU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-input v-model="searchParams.productSpu" placeholder="产品SPU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
      <div class="category">
        <CategoryCascader v-model="searchParams.level" />
        <el-button type="primary" size="default" @click="search">查询</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table :data="dataList">
        <el-table-column prop="productImage" label="产品">
          <template #default="{ row }">
            <div class="d-flex align-items-center pe-5">
              <el-avatar shape="square" :size="50" fit="cover" :src="row.productImage" />
              <div class="ms-5">
                <span class="text-gray-800 fs-5 fw-bold">
                  {{ row.name }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productSpu" label="SPU" />
        <el-table-column prop="categoryLevel" label="分类" />
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        v-model:currentPage="pagination.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
      >
        :pager-count="7">
      </el-pagination>
    </div>
    <template #footer>
      <span>
        <el-button>Cancel</el-button>
        <el-button type="primary">OK</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { productApi } from '@/api/index.ts';

  const visibility = ref(true);

  const searchParams = ref({
    productName: '',
    productSpu: '',
    level: [],
  });
  const pagination = ref({
    total: 0,
    pageSize: 10,
    pageNum: 1,
  });
  const dataList = ref([]);

  const search = async () => {
    const params = getQueryParam();
    const res = await productApi.luteosProductQueryProductList(params);
    pagination.value.total = res.total;
    dataList.value = res.productBeanList;
    console.log(66666666, res);
  };
  const getQueryParam = () => {
    return {
      productName: searchParams.value.productName,
      productSpu: searchParams.value.productSpu,
      level: searchParams.value.level.length
        ? searchParams.value.level[searchParams.value.level.length - 1]
        : '',
      pageSize: pagination.value.pageSize,
      pageNum: pagination.value.pageNum,
    };
  };
  const sizeChange = () => {};
  const currentChange = () => {};
</script>

<style scoped lang="scss">
  .category {
    margin-top: 20px;
  }
</style>
