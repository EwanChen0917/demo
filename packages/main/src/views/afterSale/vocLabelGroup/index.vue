<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.categoryName" placeholder="分类名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <!--      <el-button class="button" type="primary" @click="handleAdd" v-permission="'categoryAdd'">
        新增分类
      </el-button>
      <el-button
        class="button"
        type="primary"
        plain
        @click="handleExport"
        :loading="exportLoading"
        v-permission="'categoryExport'"
      >
        导出
      </el-button>-->
      <!--      <el-button type="primary" @click="batchUpdateDialogRef?.open">批量新增五级分类</el-button>-->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.treeList || []"
      row-key="categoryCode"
      @selection-change="handleSelectionChange"
      :expand-row-keys="expandRowKeys"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="categoryName" label="分类名称" min-width="150">
        <template #default="{ row }">
          <span class="cursor-pointer" @click="handleExpandChange(row)">
            {{ row.categoryName }}
          </span>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="labelName" label="分类标签" min-width="100" />-->
      <el-table-column label="分类等级">
        <template #default="scope">
          <span>{{ LEVEL_NAMES[scope.row.level - 1] }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="状态">-->
      <!--        <template #default="scope">-->
      <!--          <span v-if="scope.row.status === 0" class="badge badge-light-danger">未生效</span>-->
      <!--          <span v-if="scope.row.status === 1" class="badge badge-light-success">已生效</span>-->
      <!--          <span v-if="scope.row.status === 2" class="badge badge-light-danger">已驳回</span>-->
      <!--          <span v-if="scope.row.status === 3" class="badge badge-light-danger">失效</span>-->
      <!--          &lt;!&ndash; <span>{{ scope.row.status ? "已生效" : "未生效" }}</span> &ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                categoryCode: scope.row.categoryCode,
                permissionCode: 'categoryDetail',
              },
              ...(scope.row.level === 5
                ? [
                    {
                      label: '分类产品',
                      key: 'viewProduct',
                      type: 'primary',
                      categoryCode: scope.row.categoryCode,
                      level: scope.row.level,
                      permissionCode: 'goodslist',
                    },
                    // 未生效 已生效 且无任何关联SPU，支持失效
                    {
                      label: '失效',
                      key: 'invalid',
                      type: 'primary',
                      categoryCode: scope.row.categoryCode,
                      level: scope.row.level,
                      permissionCode: 'goodslist',
                      // hide: !(scope.row.status === 0 || scope.row.status === 1),
                      hide: !(
                        scope.row.hasCorrelationSpu === 0 &&
                        (scope.row.status === 0 || scope.row.status === 1)
                      ),
                    },
                    // 失效 支持生效
                    {
                      label: '生效',
                      key: 'effect',
                      type: 'primary',
                      categoryCode: scope.row.categoryCode,
                      level: scope.row.level,
                      permissionCode: 'goodslist',
                      hide: !(scope.row.status === 3),
                    },
                  ]
                : []),
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>-->
    </el-table>
  </KeenList>
</template>

<script lang="ts" setup name="vocLabelGroup">
  import { ElTable as ElTableType, ElMessage } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import { PlatformApi, platformApi, productApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];
  const PAGE_SIZE = 5000;

  const batchUpdateDialogRef = ref();
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
    PlatformApi.platformLabelCategoryQueryTree.RequestQuery,
    PlatformApi.platformLabelCategoryQueryTree.ResponseBody
  >({
    searchDefaults: {
      module: 'service_label',
      categoryName: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformLabelCategoryQueryTree,
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
  const handleAdd = () => {
    addModalVisible.value = true;
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
    productApi.luteosProductCategoryExportCategory,
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
    exportRun({
      ...search,
      pageNum: 1,
      pageSize: 50, // FIXME 最大50
      // categoryCode: search.categoryCode,
      // categoryName: search.categoryName,
      // tagCode: search.tagCode,
      codeList: codeList.value,
      queryParam: getQueryParam(),
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, categoryCode, level } = item;

    if (key === 'view') {
      sessionStorage.setItem('categorySearchInfo', JSON.stringify(search));
      router.push(`/categorylist/detail?code=${categoryCode}`);
    } else if (key === 'viewProduct') {
      router.push(`/goodslist?code=${categoryCode}&level=${level}`);
    } else if (key === 'invalid') {
      const isConfirmed = await swal.confirm({
        title: '确认失效类目',
        html: '类目失效后将不能挂载产品',
      });
      if (!isConfirmed) return;
      // console.log('失效');
      //  操作类型 1：取消分类与属性的关联 2: 取消分类与属性值的关联  3 生效VALID_OPERATE 4 失效UN_VALID_OPERATE
      const res = await productApi.luteosProductCategoryOperateCategory({
        attrCode: '',
        operateType: 4,
        categoryCode,
      });
      ElMessage.success('失效操作成功');
      refreshList();
    } else if (key === 'effect') {
      const isConfirmed = await swal.confirm('提交后,将创建OA审批流程,请关注审批进度');
      if (!isConfirmed) return;
      const res = await productApi.luteosProductCategoryOperateCategory({
        attrCode: '',
        operateType: 3,
        categoryCode,
      });
      ElMessage.success('生效操作成功');
      refreshList();
      // openWindow('/salesForecastingLog');
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
