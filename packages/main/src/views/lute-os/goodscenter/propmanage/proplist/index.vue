<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.attrName" placeholder="属性名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input v-model="search.attrValueName" placeholder="属性值">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="refreshList">查询</el-button>
      <el-button class="button" type="primary" @click="handleAdd" v-permission="'propAdd'">
        新增属性
      </el-button>
      <el-button
        v-permission="'propExport'"
        class="button"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="listData?.attrDataBeanList"
      row-key="attrCode"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <!-- <el-table-column label="属性ID" min-width="150">
        <template #default="scope">
          <span
            class="cursor-pointer text-gray-800 text-hover-primary fs-5 fw-bold"
            @click="handleActions({ key: 'view', code: scope.row.attrCode })"
          >
            {{ scope.row.attrCode }}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column prop="attrName" label="属性名称" />
      <el-table-column prop="attrValueNames" label="属性值" min-width="150" />
      <el-table-column prop="categoryNums" label="关联分类数量" />
      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                code: scope.row.attrCode,
                permissionCode: 'propdetail',
              },
              {
                label: '删除',
                key: 'del',
                text: true,
                type: 'danger',
                code: scope.row.attrCode,
                permissionCode: 'propRemove',
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
  <AddModal :visible="addModalVisible" @close="handleAddModalClose" @window-close="refreshList" />
</template>

<script lang="ts" setup name="proplist">
    import { useRequest } from 'vue-request';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  import AddModal from './Modal/addProp.vue';

  const router = useRouter();
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      pageSizeOption,
      handleCurrentChange,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    // runQuery,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductAttrQueryAttrList.RequestQuery,
    ProductApi.LuteosProductAttrQueryAttrList.ResponseBody
  >({
    searchDefaults: {
      attrCode: undefined,
      attrName: undefined,
      attrValueName: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: 10,
    service: productApi.luteosProductAttrQueryAttrList,
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
    codeList.value = list.map((item) => item.attrCode);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductAttrExportAttr,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

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
      attrCode: search.attrCode,
      attrName: search.attrName,
      attrValueName: search.attrValueName,
    });
  };

  // 表格操作
  const { loading: delLoading, run: delRun } = useRequest(productApi.luteosProductAttrOperateAttr, {
    manual: true,
    onSuccess() {
      refreshList();

      swal.success('删除成功');
    },
  });
  const handleActions = async (item) => {
    const { key, code: attrCode } = item;

    if (key === 'view') {
      sessionStorage.setItem('propSearchInfo', JSON.stringify(search));
      router.push(`/proplist/detail?code=${attrCode}`);
      return;
    }

    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;

      delRun({
        operateType: 1,
        attrCode,
      });
    }
  };
</script>
