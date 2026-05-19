<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.name" placeholder="标签名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.module" placeholder="标签模块" clearable filterable>
        <el-option
          v-for="item in labelModelList"
          :key="item.module"
          :label="item.desc"
          :value="item.module"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addModuleDialogRef?.open()">新增模块</el-button>
      <el-button type="primary" @click="editLabelDialogRef?.open('新增')">新增标签</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.labelInfoList"
      row-key="labelCode"
      class-name="table-row-dashed"
    >
      <!--      <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column label="标签名称" prop="name" />
      <el-table-column label="标签类型" prop="labelTypeDesc" />
      <el-table-column label="标签层级" prop="levelDesc" />
      <el-table-column label="父级标签" prop="parentName">
        <template #default="{ row }">
          {{ row?.parentName || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="模块" prop="moduleDesc" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="排序" prop="sort" />
      <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag :color="row.status === 1 ? 'green' : 'red'">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            v-if="userInfo.memberCode === row.creator"
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'danger',
                permissionCode: '',
                row,
              },
            ]"
            @click="handleActions"
          />
          <span v-else>--</span>
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
  <AddModuleDialog ref="addModuleDialogRef" @success="queryLabelModel" />
  <EditLabelDialog ref="editLabelDialogRef" @success="runQuery" />
</template>

<script setup lang="ts" name="label">
  import useList from '@/hooks/list/useList';
  import { PlatformApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import AddModuleDialog from '@/views/labelManage/components/addModuleDialog.vue';
  import EditLabelDialog from '@/views/labelManage/components/editLabelDialog.vue';
  import { useStore } from '@/store/modules/useStore';

  const store = useStore();
  const { userInfo } = store;

  const PAGE_SIZE = 10;

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
    resetSearch,
    // selectedKeys,
  } = useList<
    PlatformApi.PlatformLabelQueryLabelList.RequestQuery,
    PlatformApi.PlatformLabelQueryLabelList.ResponseBody
  >({
    searchDefaults: {
      name: undefined,
      module: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformLabelQueryLabelList,
  });

  const editLabelDialogRef = ref(null);
  const addModuleDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editLabelDialogRef.value?.open('编辑', row);
    }
    if (key === 'del') {
      const isConfirmed = await swal.confirm('确定删除该标签？');
      if (!isConfirmed) return;
      await platformApi.platformLabelDeleteLabelInfo({
        labelCode: row?.labelCode,
      });
      ElMessage.success('删除成功');
      refreshList();
    }
  };

  const labelModelList = ref([]);
  const queryLabelModel = async () => {
    const res = await platformApi.platformQueryLabelModelList();
    labelModelList.value = res?.labelModelList;
  };
  queryLabelModel();
</script>

<style scoped lang="scss"></style>
