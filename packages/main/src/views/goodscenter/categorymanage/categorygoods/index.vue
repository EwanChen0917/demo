<template>
  <div class="card card-flush">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title">
        <el-space>
          <el-input v-model="search.productName" placeholder="产品名称">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-input v-model="search.productSpu" placeholder="产品SPU">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </el-space>
      </div>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
        <el-button class="button" type="primary" @click="refreshList">查询</el-button>
      </div>
    </div>
    <div class="card-body pt-0">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.productBeanList"
        row-key="productSpu"
      >
        <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
        <el-table-column prop="name" label="产品" min-width="250">
          <template #default="scope">
            <div class="d-flex align-items-center">
              <!--begin::Thumbnail-->
              <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.productImage" />
              <!-- <a
                class="symbol symbol-50px"
              >
                <span
                  class="symbol-label"
                  :style="background-image: url()"
                ></span>
              </a> -->
              <!--end::Thumbnail-->
              <div class="ms-5">
                <!--begin::Title-->
                <span class="text-gray-800 fs-5 fw-bold">{{ scope.row.name }}</span>
                <!--end::Title-->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productSpu" label="SPU" />
        <el-table-column prop="productSkuCount" label="SKU数量" />
        <el-table-column label="操作">
          <template #default="scope">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  text: true,
                  code: scope.row.productSpu,
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  // import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';

  const router = useRouter();
  const route = useRoute();
  const { code, level } = route.query as {
    code?: string;
    level?: number;
  };

  if (!(code && level)) {
    router.replace('/goodslist');
  }

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    // runQuery,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductQueryProductList.RequestQuery,
    ProductApi.LuteosProductQueryProductList.ResponseBody
  >({
    searchDefaults: {
      productName: undefined,
      productSpu: undefined,
      categoryCode: code,
      level,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: productApi.luteosProductQueryProductList,
  });

  // 表格操作
  const handleActions = (item) => {
    const { key, code: productSpu } = item;

    if (key === 'view') {
      ElMessage.info('功能开发中，敬请期待');
      // router.push(`/categorymanage/categorydetail?code=${categoryCode}`, () => {
      //   refreshList();
      // });
    }
  };
</script>
