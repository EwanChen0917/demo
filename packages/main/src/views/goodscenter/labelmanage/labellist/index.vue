<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.tagName" placeholder="标签名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.tagType" placeholder="标签类型" clearable>
        <el-option
          v-for="type in labelTypeList"
          :value="type.value"
          :label="type.desc"
          :key="type.value"
        />
      </el-select>
      <TagCascader
        v-model="search.categoryCode"
        placeholder="标签分组"
        :emitPath="false"
        style="min-width: 300px"
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd">新增标签</el-button>
      <el-button
        class="button"
        v-permission="'labelUpdate'"
        type="primary"
        @click="
          () => {
            batchType = 'import';
            batchTitle = '批量操作';
            batchUpdateVisible = true;
          }
        "
      >
        批量操作
      </el-button>
      <el-button class="button" @click="handleExport" :loading="exportLoading" type="primary" plain>
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.tagBeanList"
      row-key="tagCode"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="标签信息" min-width="150">
        <template #default="scope">
          <GoodsInfo :title="scope.row.tagName" :subtitle="scope.row.tagCode" hideImage />
        </template>
      </el-table-column>
      <el-table-column prop="tagTypeDesc" label="标签类型" />
      <el-table-column prop="productCount" label="标记数量">
        <template #default="scope">
          <el-button type="text" @click="toGoodsList(scope.row.tagCode, scope.row.tagType)">
            {{ scope.row.productCount }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="tagRemark" label="描述" min-width="150" />
      <el-table-column prop="groupPathString" label="标签组" min-width="160" />
      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                tagCode: scope.row.tagCode,
                tagName: scope.row.tagName,
              },
              /*  {
                label: '跳转',
                key: 'toGoods',
                type: 'primary',
                tagCode: scope.row.tagCode,
                tagType: scope.row.tagType,
              },*/
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                text: true,
                tagCode: scope.row.tagCode,
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
  <AddModal v-if="addModalVisible" :visible="addModalVisible" @close="handleAddModalClose" />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :title="batchTitle"
    @close="batchUpdate"
    @export="handleExport"
    :type="batchType"
  />
</template>

<script lang="ts" setup name="labellist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  import * as swal from '@/utils/swal';
  import BatchUpdateModal from '@/views/goodscenter/labelmanage/labellist/Modal/BatchUpdateModal.vue';
  import AddModal from './Modal/addLabel.vue';
  import { labelTypeList } from '../config/index';
  import TagCascader from './TagCascader/index.vue';

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
    ProductApi.LuteosProductTagQueryTagList.RequestQuery,
    ProductApi.LuteosProductTagQueryTagList.ResponseBody
  >({
    searchDefaults: {
      tagName: undefined,
      tagCode: undefined,
      tagType: undefined,
      categoryCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTagQueryTagList,
  });

  const route = useRoute();
  const { params, query } = route;

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });
  Object.keys(query).forEach((key) => {
    if (query[key]) search[key] = query[key];
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
    codeList.value = list.map((item) => item.tagCode);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductTagExportTag,
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

  const batchType = ref<string>('');
  const batchTitle = ref<string>('');
  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;

    exportRun({
      pageNum: current.value,
      pageSize: pageSize.value,
      queryParam: getQueryParam(),
      codeList: codeList.value,
      ...search,
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, tagCode, tagName, tagType } = item;

    if (key === 'view') {
      router.push(`/labellist/detail?code=${encryptByBase64(tagCode)}&tagName=${tagName}`);
    } else if (key === 'delete') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      deleteTag({
        tagCode,
        operateType: 1, // 操作类型 1:删除标签 2：删除标签与产品的关联
      });
    } else if (key === 'toGoods') {
      if (tagType === 'sku') {
        router.push(`/skulist?tagCode=${tagCode}`);
      } else {
        router.push(`/goodslist?tagCode=${tagCode}`);
      }
    }
  };

  // 删除操作
  const { run: deleteTag } = useRequest(productApi.luteosProductTagOperateTag, {
    manual: true,
    onSuccess() {
      ElMessage.success({
        message: '删除成功',
        duration: 5 * 1000,
      });
      runQuery();
    },
  });
  const toGoodsList = (itemCode, type) => {
    if (type === 'sku') {
      router.push(`/skulist?tagCode=${itemCode}`);
    } else if (type === 'category') {
      router.push(`/categorylist?tagCode=${itemCode}`);
    } else if (type === 'gtm') {
      router.push(`/productline?tagCode=${itemCode}`);
    } else {
      router.push(`/goodslist?tagCode=${itemCode}`);
    }
  };
  const getQueryParam = () => {
    const data: any = {
      标签名称: search.tagName || '',
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
