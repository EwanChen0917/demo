<template>
  <div class="card card-flush">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title gap-5">
        <el-input v-model="search.modelName" placeholder="型号名称">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </div>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
        <el-button class="button" type="primary" @click="runQuery">查询</el-button>
        <el-button class="button" type="primary" @click="handleAdd">新增型号</el-button>
        <el-button
          class="button"
          @click="handleExport"
          :loading="exportLoading"
          type="primary"
          plain
        >
          导出
        </el-button>
      </div>
    </div>
    <div class="card-body pt-0">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.modelBeanList"
        row-key="modelCode"
        class-name="table-row-dashed"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column prop="modelName" label="型号名称" min-width="150" />
        <el-table-column prop="productCount" label="关联产品数量">
          <template #default="scope">
            <el-button type="text" @click="toGoodsList(scope.row.modelCode)">
              {{ scope.row.productCount }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="modelRemark" label="描述" min-width="150" />
        <el-table-column label="操作">
          <template #default="scope">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  modelCode: scope.row.modelCode,
                  modelName: scope.row.modelName,
                  permissionCode: 'modeldetail',
                },
                {
                  label: '删除',
                  key: 'delete',
                  type: 'danger',
                  text: true,
                  modelCode: scope.row.modelCode,
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

<script lang="ts" setup name="modellist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  import * as swal from '@/utils/swal';
  import AddModal from './Modal/addModel.vue';

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
    ProductApi.LuteosProductModelQueryModelList.RequestQuery,
    ProductApi.LuteosProductModelQueryModelList.ResponseBody
  >({
    searchDefaults: {
      modelName: undefined,
      modelCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductModelQueryModelList,
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
    codeList.value = list.map((item) => item.modelCode);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductModelExportModel,
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
      modelName: search.modelName,
      modelCode: search.modelCode,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, modelCode, modelName } = item;

    if (key === 'view') {
      sessionStorage.setItem('modelSearchInfo', JSON.stringify(search));
      router.push(`/modellist/detail?code=${encryptByBase64(modelCode)}&modelName=${modelName}`);
    } else if (key === 'delete') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      deleteModel({
        modelCode,
        operateType: 1, // 操作类型 1:删除型号 2：删除型号与产品的关联
      });
    }
  };

  // 删除操作
  const { run: deleteModel } = useRequest(productApi.luteosProductModelOperateModel, {
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
    router.push(`/goodslist?itemCode=${itemCode}&itemType=2`);
  };
  const getQueryParam = () => {
    const data: any = {
      型号名称: search.modelName || '',
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
