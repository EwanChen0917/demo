<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyWord" placeholder="物料名称/物料编码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.skuType" filterable clearable placeholder="物料类型">
        <el-option
          v-for="item in materielTypeMap"
          :key="item.value"
          :label="item.desc"
          :value="parseInt(item.value)"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" @click="add" type="primary" v-permission="'addmaterial'">
        新增物料
      </el-button>
      <el-button
        class="button"
        @click="batchUpdateVisible = true"
        :loading="exportLoading"
        type="primary"
        v-permission="'materialImport'"
      >
        导入
      </el-button>
      <el-button
        class="button"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
        v-permission="'materialExport'"
      >
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.materielList"
      row-key="materielCode"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="物料信息" min-width="300" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.materielImage"
            :title="scope.row.materielName"
            :subtitle="scope.row.materielCode"
            copy-subtitle
            :url="`/materiallist/detail?code=${scope.row.materielCode}`"
          />
          <!-- <div
            class="d-flex align-items-center pe-5 cursor-pointer"
            @click="toDetail(scope.row.materielCode)"
          >
            <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.materielImage" />
            <div class="ms-5">
              <span class="text-gray-800 fs-5 fw-bold">
                {{ scope.row.materielName }}
              </span>
            </div>
          </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="materielTypeDesc" label="物料类型" min-width="120" />
      <!--        <el-table-column prop="skuCount" label="关联产品SKU">
                <template #default="scope">
                  <el-button type="text" @click="toSkuList(scope.row.materielCode)">
                    {{ scope.row.skuCount }}
                  </el-button>
                </template>
              </el-table-column>-->
      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                materialCode: scope.row.materielCode,
                permissionCode: 'materialedit',
              },
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                materialCode: scope.row.materielCode,
                permissionCode: 'materialdetail',
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
    importScene="product_materiel"
    title="导入"
    @close="batchUpdate"
  />
</template>

<script lang="ts" setup name="materiallist">
    import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { platformApi, productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import BatchUpdateModal from '@/views/lute-os/goodscenter/components/BatchUpdateModal.vue';

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
    ProductApi.LuteosProductMaterielQueryMaterielList.RequestQuery,
    ProductApi.LuteosProductMaterielQueryMaterielList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      skuType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMaterielQueryMaterielList,
  });

  const route = useRoute();
  const { params } = route;

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  // 表格选择
  const codeList = reactive([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.materielCode);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductMaterielExportMaterielList,
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
      keyWord: search.keyWord,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };
  const add = () => {
    const path = router.resolve({ name: 'addmaterial' });
    router.push(path.href);
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, materialCode } = item;

    if (key === 'view') {
      toDetail(materialCode);
    } else if (key === 'edit') {
      const path = router.resolve({ name: 'editmaterial', query: { code: materialCode } });
      router.push(path.href);
    }
  };

  const toDetail = (materialCode) => {
    sessionStorage.setItem('materialSearchInfo', JSON.stringify(search));
    router.push(`/materiallist/detail?code=${materialCode}`);
  };

  const toSkuList = (itemCode) => {
    router.push(`/skulist?productSpu=${itemCode}`);
  };

  // 导入
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  const materielTypeMap = ref();
  const queryMaterielType = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['materiel_type'],
    });
    materielTypeMap.value = res?.dictMap?.materiel_type || [];
  };
  queryMaterielType();

  const getQueryParam = () => {
    const data: any = {
      '物料名称/物料编码': search.keyWord || '',
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
