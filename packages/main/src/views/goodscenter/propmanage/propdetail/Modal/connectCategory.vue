<template>
  <el-dialog title="关联分类" width="75%" :model-value="visible" @close="$emit('close')">
    <div class="card card-flush">
      <div class="card-header align-items-center py-5 gap-2 gap-md-5">
        <div class="card-title gap-5">
          <el-input v-model="search.categoryName" placeholder="分类名称">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-input v-model="search.categoryCode" placeholder="分类ID">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-select
            v-model="search.level"
            placeholder="分类等级"
            clearable
            style="min-width: 100px"
          >
            <el-option
              v-for="(item, idx) in LEVEL_NAMES"
              :key="item"
              :label="`${item}分类`"
              :value="idx + 1"
            />
          </el-select>
        </div>
      </div>
      <div class="card-body pt-0">
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :data="listData?.categoryLevelBeanList"
          row-key="categoryCode"
          class-name="table-row-dashed"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" reserve-selection />
          <el-table-column prop="categoryName" label="分类名称" min-width="200" />
          <el-table-column prop="categoryCode" label="分类ID" min-width="150" />
          <el-table-column label="分类等级">
            <template #default="scope">
              {{ LEVEL_NAMES[scope.row.level! - 1] }}
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

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          关联分类
        </el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-request';

  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { CategoryConnectBean } from '@/api/product/data-contracts';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  // 常量
  const MAX_LEVEL = 5;
  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];

  const props = defineProps<{
    attrCode: string;
    visible: boolean;
    selectedRows: CategoryConnectBean[];
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    // refreshList,
    runQuery,
    selectedKeys,
    resetSearch,
  } = useList<
    ProductApi.LuteosProductAttrQueryCategoryLevelList.RequestQuery & { level?: number },
    ProductApi.LuteosProductAttrQueryCategoryLevelList.ResponseBody
  >({
    searchDefaults: {
      level: undefined,
      categoryCode: undefined,
      categoryName: undefined,
      parentCategoryCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: 10,
    service: productApi.luteosProductAttrQueryCategoryLevelList,
    // serviceManual: true,
  });

  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        console.log(row);
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setSelectedRows();
  // 表格选择
  const totalList = reactive([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (totalList.value && totalList.value.length) {
      emit('close', true, totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择分类',
        duration: 5 * 1000,
      });
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    if (selectedKeys.value?.length) {
      const isConfirmed = await swal.confirm('确认要取消关联分类吗？');
      if (!isConfirmed) return;
    }

    emit('close');
    resetModal();
  };

  // 重置
  const resetModal = () => {};
</script>
