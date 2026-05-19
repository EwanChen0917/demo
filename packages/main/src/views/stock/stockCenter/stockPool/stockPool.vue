<template>
  <OrderTabs
    v-model="currentStatus"
    :tab-status-list="tabStatusList"
    @tab-change="handleTabChange"
  />
  <keenList @refresh="refreshList" @reset-search="resetSearch" @clear-all="resetSearch">
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="分配池名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>

        <el-select placeholder="选择分配池状态" v-model="search.status" clearable>
          <el-option
            v-for="item in poolStatusMap"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select placeholder="是否支持锁库" v-model="search.supportLock" clearable>
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
        <el-select placeholder="是否支持共享" v-model="search.shared" clearable>
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-space>
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleClickAdd" v-if="currentStatus !== '0'">
        新建
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="handleClickOwner"
        :disabled="!selectedRowCode"
        v-if="currentStatus == '2'"
      >
        设置分配池的货权范围
      </el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.list">
      <el-table-column width="32" fixed="left">
        <template #default="scope">
          <el-radio v-model="selectedRowCode" :label="scope.row.poolCode" />
        </template>
      </el-table-column>
      <el-table-column label="分配池编码" min-width="150" prop="poolCode" />
      <el-table-column label="分配池名称" min-width="250">
        <template #default="scope">
          <el-tooltip :content="scope.row.poolName" placement="top">
            <span>{{ scope.row.poolName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="上一级" min-width="100" prop="parentCode" />
      <el-table-column label="层级" min-width="100" prop="levelDesc" />
      <el-table-column label="优先级别" min-width="100" prop="priority" />
      <el-table-column label="是否共享" min-width="100" prop="isSharedDesc" />
      <el-table-column label="是否支持锁库" min-width="100" prop="supportLockDesc" />
      <el-table-column label="状态" min-width="100" prop="statusDesc" />
      <el-table-column label="操作" width="" fixed="right" min-width="150">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            @click="handleClickAction"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                code: scope.row.poolCode,
              },
              {
                label: '编辑',
                type: 'primary',
                key: 'edit',
                // hide: scope.row.level === 1,
                code: scope.row.poolCode,
              },
              // {
              //   label: '删除',
              //   type: 'danger',
              //   key: 'delete',
              //   hide: scope.row.level === 0,
              //   code: scope.row.poolCode,
              // },
            ]"
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
    <template #tools-prepend></template>
  </keenList>
  <StockPoolDialog ref="stockDialogRef" :level="search.level" />
</template>

<script setup lang="ts" name="stockPoolManagement">
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { cisApi, CisApi } from '@/api';
  // import router from '@/router';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import StockPoolDialog from './stockPoolDialog.vue';
  import { poolStatusMap } from '../config/pool';

  const router = useRouter();
  // const tableData = ref<any[]>([]);
  const stockDialogRef = ref<any>(null);
  // const loading = ref(false);
  const selectedRowCode = ref<string>('');
  const currentStatus = ref('0');
  const PAGE_SIZE = 50;
  const tabStatusList = [
    { code: '0', statusName: '顶层' },
    { code: '1', statusName: '基础层' },
    { code: '2', statusName: '逻辑层' },
  ];
  const {
    search,
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
  } = useList<CisApi.CisPoolQueryList.RequestBody, CisApi.CisPoolQueryList.ResponseBody>({
    searchDefaults: {
      keyword: undefined,
      status: undefined,
      level: '0',
      supportLock: undefined,
      shared: undefined,
    },
    pageSize: PAGE_SIZE,
    pageNum: 1,
    service: cisApi.cisPoolQueryList,
  });
  const handleClickAdd = () => {
    if (!stockDialogRef.value) return;
    stockDialogRef.value.open();
  };
  const handleClickAction = (action: any) => {
    const { key, code } = action;
    switch (key) {
      case 'edit':
        if (!stockDialogRef.value) return;
        stockDialogRef.value.open(code, 'edit');
        break;
      case 'detail':
        if (!stockDialogRef.value) return;
        stockDialogRef.value.open(code, 'detail');
        break;
      case 'delete':
        handleDelete(code);
        break;
      default:
        break;
    }
  };
  const handleDelete = async (poolCode: string) => {
    const isConfirmed = await swal.confirm('确定要删除吗？');
    if (!isConfirmed) return;
    const res = await cisApi.cisPoolDelete(poolCode);
    if (res) {
      ElMessage.success('删除成功');
      refreshList();
    } else {
      ElMessage.error('删除失败，请稍后再试');
    }
  };
  // 标签页切换
  const handleTabChange = (val: string) => {
    currentStatus.value = val;
    search.level = parseInt(val, 10);
    selectedRowCode.value = ''; // 清空选中的列表项
    // runQuery();
  };
  const handleClickOwner = () => {
    if (!selectedRowCode.value) return;
    const currentRows = listData.value?.list.filter(
      (item: any) => item.poolCode === selectedRowCode.value
    );
    if (currentRows[0].isShared === 1) {
      ElMessage.warning('共享分配池无需设置货权范围');
      return;
    }
    router.push({
      name: 'stockPoolOwnerManagement',
      query: {
        poolCode: selectedRowCode.value,
      },
    });
  };
  onActivated(() => {
    runQuery();
  });
  // 如果需要获取选中的完整行数据，可以使用 computed
  // const selectedRow = computed(() => {
  //   return listData.value?.list?.find((item: any) => item.poolCode === selectedRowCode.value);
  // });
</script>

<style scoped lang="scss"></style>
