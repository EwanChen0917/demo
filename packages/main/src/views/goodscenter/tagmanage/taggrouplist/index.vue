<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.categoryName" placeholder="标签组名称">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <!-- 已生效、未生效的select，默认选中已生效 -->
      <!-- <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option :value="1" label="已生效" />
        <el-option :value="0" label="未生效" />
      </el-select>
      <el-select v-model="search.tagCode" placeholder="分类标签" clearable>
        <el-option
          v-for="item in labelTypeList"
          :value="item.tagCode"
          :label="item.tagName"
          :key="item.tagCode"
        />
      </el-select> -->
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd" v-permission="'taggroupAdd'">
        新增标签组
      </el-button>
      <el-button
        class="button"
        type="primary"
        plain
        @click="handleExport"
        :loading="exportLoading"
        v-permission="'taggroupExport'"
      >
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.treeList || []"
      row-key="categoryCode"
      :tree-props="{
        hasChildren: 'hasChildren',
        children: 'children',
      }"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
      :expand-row-keys="expandRowKeys"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="categoryName" label="标签组名称" min-width="150">
        <template #default="{ row }">
          <span class="cursor-pointer" @click="handleExpandChange(row)">
            {{ row.categoryName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="分组等级">
        <template #default="scope">
          <span>{{ LEVEL_NAMES[scope.row.level - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tagCount" label="标签数量" min-width="100">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="handleSearch(row)">
            {{ row.tagCount }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="categoryDescription" label="备注" min-width="150" />
      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: scope.row,
                permissionCode: 'taggroupEdit',
              },
              // ...(scope.row.level === 5
              //   ? [
              //       {
              //         label: '分类产品',
              //         key: 'viewProduct',
              //         type: 'primary',
              //         categoryCode: scope.row.categoryCode,
              //         level: scope.row.level,
              //         permissionCode: 'goodslist',
              //       },
              //     ]
              //   : []),
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
  </KeenList>
  <AddModal
    :visible="addModalVisible"
    @close="handleAddModalClose"
    @window-close="refreshList"
    :isEdit="isEdit"
    :rowData="rowData"
  />
</template>

<script lang="ts" setup name="taggroup">
  import { ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import AddModal from './Modal/addCategory.vue';

  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];
  const PAGE_SIZE = 5000;

  const router = useRouter();
  const route = useRoute();
  const { params } = route;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    // pagination: {
    //   total,
    //   current,
    //   pageSize,
    //   handleCurrentChange,
    //   pageSizeOption,
    //   handlePageSizeChange,
    // },
    listData,
    listLoading,
    refreshList,
    resetSearch,
    // runQuery,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductTagCategoryQueyCategoryList.RequestQuery,
    ProductApi.LuteosProductTagCategoryQueyCategoryList.ResponseBody
  >({
    searchDefaults: {
      categoryName: undefined,
      tagCode: route.query.tagCode,
      // status: 1,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTagCategoryQueryTree,
  });

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  const labelTypeList = ref([]);
  const queryTagList = async () => {
    const res = await productApi.luteosProductTagQueryTagList({
      pageNum: 1,
      pageSize: 500,
      tagType: 'category',
    });

    labelTypeList.value = res.tagBeanList || [];
  };

  queryTagList();

  // 新增操作
  const addModalVisible = ref(false);
  const isEdit = ref(false);
  const rowData = ref();
  const handleAdd = () => {
    isEdit.value = false;
    rowData.value = {};
    nextTick(() => {
      addModalVisible.value = true;
    });
    // addModalVisible.value = true;
  };
  const handleAddModalClose = (reload = false) => {
    addModalVisible.value = false;
    if (reload) {
      refreshList();
    }
  };

  const { type } = route.query;
  if (type === 'add') addModalVisible.value = true;

  // 表格选择
  const codeList = ref<string[]>([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.categoryCode);
  };

  const handleSearch = (row) => {
    const { categoryCode } = row;
    // console.log(row, categoryCode);
    router.push(`/labellist?categoryCode=${categoryCode}`);
  };
  const expandRowKeys = ref<string[]>([]);
  const handleExpandChange = (row) => {
    if (expandRowKeys.value.includes(row.categoryCode)) {
      expandRowKeys.value = expandRowKeys.value.slice(
        0,
        expandRowKeys.value.indexOf(row.categoryCode)
      );
    } else {
      expandRowKeys.value.push(row.categoryCode);
    }
    console.log(expandRowKeys.value);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductTagCategoryExport,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

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
    // console.log(codeList.value);
    exportRun({
      ...search,
      pageNum: 1,
      pageSize: 50, // FIXME 最大50
      // categoryCode: search.categoryCode,
      // categoryName: search.categoryName,
      // tagCode: search.tagCode,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };

  // 表格操作
  const handleActions = (item) => {
    const { key, categoryCode, level, row } = item;
    if (key === 'edit') {
      // sessionStorage.setItem('categorySearchInfo', JSON.stringify(search));
      // router.push(`/taggroup/detail?code=${categoryCode}`);
      isEdit.value = true;
      addModalVisible.value = true;
      // console.log('row ', row);
      rowData.value = row;
    } else if (key === 'viewProduct') {
      router.push(`/goodslist?code=${categoryCode}&level=${level}`);
    }
  };

  watch(listData, () => {
    expandRowKeys.value = [];
    if (search.categoryName) {
      getExpandRowKeys(listData.value);
    }
  });

  const getExpandRowKeys = (arr) => {
    if (arr.categoryBeanList && arr.categoryBeanList.length > 0) {
      arr.categoryBeanList.forEach((item) => {
        expandRowKeys.value.push(item.categoryCode);
        getExpandRowKeys(item);
      });
    }
  };

  const getQueryParam = () => {
    const data: any = {
      分类名称: search.categoryName || '',
      分类标签: search.tagCode || '',
    };

    for (const key in data) {
      if (data[key] == '') {
        delete data[key];
      }
    }

    return data;
  };
</script>
