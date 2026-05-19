<template>
  <div class="card card-flush">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title gap-5">
        <el-input v-model="search.brandName" placeholder="品牌名称">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </div>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
        <el-button class="button" type="primary" @click="runQuery">查询</el-button>
        <el-button class="button" type="primary" @click="handleAdd" v-permission="'brandAdd'">
          新增品牌
        </el-button>
        <el-button
          class="button"
          @click="handleExport"
          :loading="exportLoading"
          type="primary"
          plain
          v-permission="'brandExport'"
        >
          导出
        </el-button>
      </div>
    </div>
    <div class="card-body pt-0">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.brandBeanList"
        row-key="brandCode"
        class-name="table-row-dashed"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column label="品牌logo" min-width="100">
          <template #default="scope">
            <div class="d-flex align-items-center">
              <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.brandLogo" />
              <div class="ms-5">
                <span class="text-gray-800 fs-5 fw-bold">
                  {{ scope.row.brandName }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="brandNameEn" label="英文名称" />
        <el-table-column prop="brandDesc" label="描述" />
        <el-table-column prop="brandProductCount" label="关联产品数量">
          <template #default="scope">
            <el-button type="text" @click="toGoodsList(scope.row.brandCode)">
              {{ scope.row.brandProductCount }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  brandCode: scope.row.brandCode,
                  brandName: scope.row.brandName,
                  permissionCode: 'branddetail',
                },
                {
                  label: '删除',
                  key: 'delete',
                  text: true,
                  type: 'danger',
                  brandCode: scope.row.brandCode,
                  permissionCode: 'brandRemove',
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
  <AddModal :visible="addModalVisible" @close="handleAddModalClose" />
</template>

<script lang="ts" setup name="brandlist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  import * as swal from '@/utils/swal';
  import AddModal from './Modal/addBrand.vue';

  const PAGE_SIZE = 10;
  const router = useRouter();
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
    runQuery,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductBrandQueryBrandList.RequestQuery,
    ProductApi.LuteosProductBrandQueryBrandList.ResponseBody
  >({
    searchDefaults: {
      brandName: undefined,
      brandCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductBrandQueryBrandList,
  });

  const route = useRoute();
  const { params } = route;

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  // 新增操作
  const addModalVisible = ref(false);
  const handleAdd = () => {
    addModalVisible.value = true;
  };
  const handleAddModalClose = (reload = false) => {
    addModalVisible.value = false;
    if (reload) {
      refreshList();
    }
  };

  // 表格选择
  const codeList = reactive([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.brandCode);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductBrandExportBrand,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;

    exportRun({
      pageNum: current.value,
      pageSize: pageSize.value,
      brandName: search.brandName,
      brandCode: search.brandCode,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, brandCode, brandName } = item;

    if (key === 'view') {
      sessionStorage.setItem('brandSearchInfo', JSON.stringify(search));
      router.push(`/brandlist/detail?code=${encryptByBase64(brandCode)}&brandName=${brandName}`);
    } else if (key === 'delete') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;

      deleteBrand({
        brandCode,
        operateType: 1, // 操作类型 1:删除品牌 2：删除品牌与产品的关联
      });
    }
  };

  // 删除操作
  const { run: deleteBrand } = useRequest(productApi.luteosProductBrandOperateBrand, {
    manual: true,
    onSuccess() {
      ElMessage.success({
        message: '删除成功',
        duration: 5 * 1000,
      });
      runQuery();
    },
  });

  const toGoodsList = (itemCode) => {
    router.push(`/goodslist?itemCode=${itemCode}&itemType=1`);
  };
  const getQueryParam = () => {
    const data: any = {
      品牌名称: search.brandName || '',
    };

    for (const key in data) {
      if (data[key] == '') {
        delete data[key];
      }
    }

    return data;
  };
</script>

<style scoped lang="scss"></style>
