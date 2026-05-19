<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.sensitiveTypeName" placeholder="敏感类型名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input v-model="search.sensitiveTypeSimpleCode" style="width: 250px" placeholder="简码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd" v-permission="'sensitivetypeAdd'">
        新增敏感类型
      </el-button>
      <el-button
        class="button"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
        v-permission="'sensitivetypeExport'"
      >
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.sensitiveTypeBeanList"
      row-key="sensitiveTypeCode"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="sensitiveTypeName" label="敏感类型名称" min-width="150" />
      <el-table-column prop="sensitiveTypeSimpleCode" label="简码" min-width="150" />
      <el-table-column prop="productCount" label="关联产品数量">
        <template #default="scope">
          <el-button type="text" @click="toGoodsList(scope.row.sensitiveTypeCode)">
            {{ scope.row.productCount }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sensitiveTypeRemark" label="描述" min-width="150" />
      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                sensitiveTypeCode: scope.row.sensitiveTypeCode,
                sensitiveTypeName: scope.row.sensitiveTypeName,
                permissionCode: 'sensitivetypedetail',
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                text: true,
                sensitiveTypeCode: scope.row.sensitiveTypeCode,
                permissionCode: 'sensitivetypeRemove',
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

  <AddModal :visible="addModalVisible" @close="handleAddModalClose" />
</template>

<script lang="ts" setup name="sensitivetypelist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  import * as swal from '@/utils/swal';
  import AddModal from './Modal/addSensitiveType.vue';

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
    resetSearch,
    runQuery,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductSensitiveTypeQuerySensitiveTypeList.RequestQuery,
    ProductApi.LuteosProductSensitiveTypeQuerySensitiveTypeList.ResponseBody
  >({
    searchDefaults: {
      sensitiveTypeName: undefined,
      sensitiveTypeCode: undefined,
      sensitiveTypeSimpleCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSensitiveTypeQuerySensitiveTypeList,
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
    codeList.value = list.map((item) => item.sensitiveTypeCode);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductSensitiveTypeExportSensitiveType,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            app_code: d?.appCode,
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
      sensitiveTypeName: search.sensitiveTypeName,
      sensitiveTypeCode: search.sensitiveTypeCode,
      sensitiveTypeSimpleCode: search.sensitiveTypeSimpleCode,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, sensitiveTypeCode, sensitiveTypeName } = item;

    if (key === 'view') {
      sessionStorage.setItem('sensitiveTypeSearchInfo', JSON.stringify(search));
      router.push(
        `/sensitivetypelist/detail?code=${encryptByBase64(
          sensitiveTypeCode
        )}&sensitiveTypeName=${sensitiveTypeName}`
      );
    } else if (key === 'delete') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      deleteSensitiveType({
        sensitiveTypeCode,
        operateType: 1, // 操作类型 1:删除敏感类型 2：删除敏感类型与产品的关联
      });
    }
  };

  // 删除操作
  const { run: deleteSensitiveType } = useRequest(
    productApi.luteosProductSensitiveTypeOperateSensitiveType,
    {
      manual: true,
      onSuccess() {
        ElMessage.success({
          message: '删除成功',
          duration: 5 * 1000,
        });
        runQuery();
      },
    }
  );
  const toGoodsList = (itemCode) => {
    router.push(`/goodslist?itemCode=${itemCode}&itemType=4`);
  };

  const getQueryParam = () => {
    const data: any = {
      敏感类型名称: search.sensitiveTypeName || '',
      简码: search.sensitiveTypeSimpleCode || '',
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
