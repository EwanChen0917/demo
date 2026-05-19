<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="请输入产品代码/系列/关联项目"
          clearable
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addProductCode">新增</el-button>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.productCodeList || []">
      <el-table-column type="selection" width="40" />
      <el-table-column label="产品代码" prop="productCode" min-width="100">
        <template #default="{ row }">
          <div class="text-hover" @click="viewDetail(row)">
            {{ row.productCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="系列" prop="seriesDesc" min-width="100" />
      <el-table-column label="关联项目" prop="pdtNewProductList" min-width="150">
        <template #default="{ row }">
          <div
            class="d-flex align-items-center pe-5"
            v-for="item in row.pdtNewProductList"
            :key="item.productCode"
          >
            {{ item.productName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="衍生/迭代" prop="deriveDesc" min-width="100" />
      <el-table-column label="贴片工厂" prop="pdtNewProductList" min-width="150">
        <template #default="{ row }">
          <div
            class="d-flex align-items-center pe-5"
            v-for="item in row.factoryList"
            :key="item.factoryCode"
          >
            {{ item.factoryCode }}-{{ item.factoryName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="关联供应链产品" prop="productSkuNum" min-width="100" />
      <el-table-column label="操作人" min-width="150px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">创建人&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.creatorName }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新人&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.operatorName }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="190px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">创建时间&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.createTime }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新时间&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.updateTime }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: scope.row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'danger',
                row: scope.row,
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
  <EditProductCode
    v-if="productCodeVisible"
    :visible="productCodeVisible"
    :info="formData"
    @close-modal="closeModalRedact"
    :type="operateType"
  />
</template>

<script lang="ts" setup>
    import { ElTable as ElTableType, ElMessage } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import * as swal from '@/utils/swal';
  import EditProductCode from './Modal/editProductCode.vue';

  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    runQuery,
    resetSearch,
    listData,
    listLoading,
  } = useList<
    ProductApi.LuteosProductMacQueryProductCodeList.RequestQuery,
    ProductApi.LuteosProductMacQueryProductCodeList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMacQueryProductCodeList,
  });

  const operateType = ref('add');
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      productCodeVisible.value = true;
      formData.value = row;
      operateType.value = 'edit';
    }

    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;

      await productApi.luteosProductMacOperateProductCode({
        productCode: row.productCode,
        operateType: 'delete',
      });
      ElMessage.success('删除成功');
      runQuery();
    }
  };

  const addProductCode = () => {
    productCodeVisible.value = true;
    operateType.value = 'add';
  };

  const viewDetail = (row) => {
    productCodeVisible.value = true;
    formData.value = row;
    operateType.value = 'detail';
  };

  const formData = ref({});

  const productCodeVisible = ref(false);
  const closeModalRedact = (reload) => {
    formData.value = {};
    if (reload) {
      runQuery();
    }
    productCodeVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .text-hover {
    cursor: pointer;
    color: #3e97ff;
  }
</style>
