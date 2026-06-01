<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.adjustmentCode"
        placeholder="调整单据编号"
        clearable
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        style="width: 260px; flex-grow: 0"
        v-model="createtime"
        type="daterange"
        start-placeholder="创建时间开始"
        end-placeholder="创建时间结束"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (dateArr) => {
            search.createTimeStart = dateArr ? dateArr[0] : '';
            search.createTimeEnd = dateArr
              ? dayjs(dateArr[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
              : '';
          }
        "
      />
      <WarehouseSelect v-model="search.warehouseCode" clearable />
      <el-select style="width: 160px" placeholder="同步状态" v-model="search.syncStatus" clearable>
        <el-option
          v-for="item in syncStatusMap"
          :key="item.status"
          :label="item.statusDesc"
          :value="item.status"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="router.push(`/tiktokStock/add`)">
        新增
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column label="单据编号" prop="adjustmentCode" min-width="120" fixed />
      <el-table-column label="仓库" prop="warehouseName" min-width="200" />
      <el-table-column label="同步状态" prop="syncStatusDesc" min-width="80">
        <template #default="{ row }">
          <el-tag :type="tagStatusColorMap[row.syncStatus]">
            {{ row.syncStatusDesc }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creatorName" min-width="100" />
      <el-table-column label="创建时间" prop="createTime" min-width="120" />
      <el-table-column label="操作" min-width="80" fixed="right">
        <template #default="{ row, $index }">
          <KeenActions
            :actions="[
              // 同步状态(0-草稿；10-同步中；20-已同步；30-同步失败；40-部分同步成功)
              {
                label: '查看',
                key: 'view',
                id: row.id,
              },
              {
                label: '编辑',
                key: 'edit',
                id: row.id,
                //10-同步中；20-已同步 隐藏
                hide: [10, 20].includes(row.syncStatus),
              },
              {
                label: '删除',
                key: 'delete',
                id: row.id,
                // 0草稿、30同步失败时，显示删除按钮
                hide: [10, 20, 40].includes(row.syncStatus),
              },
              {
                label: '推送TikTok',
                key: 'push',
                id: row.id,
                // 0草稿、40部分同步成功，显示推送
                hide: [10, 20, 30].includes(row.syncStatus),
              },
              {
                label: '重新推送',
                key: 'rePush',
                id: row.id,
                // 30同步失败，显示
                hide: row.syncStatus !== 30,
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
</template>

<script setup lang="ts" name="tiktokStock">
  import { ElMessage } from 'element-plus';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import dayjs from 'dayjs';
  import * as swal from '@/utils/swal';
  import WarehouseSelect from './components/warehouseSelect.vue';
  import { tagStatusColorMap } from './components/tagStatusMap';

  const createtime = ref([
    dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  ]);

  const router = useRouter();
  const PAGE_SIZE = 10;
  const syncStatusMap = ref<any[]>([]);
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
    ErpApi.LuteosErpTiktokStockAdjustmentQueryList.RequestQuery,
    ErpApi.LuteosErpTiktokStockAdjustmentQueryList.ResponseBody
  >({
    searchDefaults: {
      adjustmentCode: undefined,
      warehouseCode: undefined,
      syncStatus: undefined,
      createTimeStart: createtime.value[0],
      createTimeEnd: createtime.value[1],
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpTiktokStockAdjustmentQueryList,
  });

  const getSyncStatus = async () => {
    const res = await erpApi.luteosErpTiktokStockAdjustmentQuerySyncStatus();
    syncStatusMap.value = res.recordList;
  };
  getSyncStatus();
  // 表格操作
  const handleActions = async (item) => {
    const { key, id } = item;
    switch (key) {
      case 'view':
        // 跳转到查看页面
        router.push(`/tiktokStock/detail?id=${id}`);
        break;
      case 'edit':
        // 跳转到编辑页面
        router.push(`/tiktokStock/edit?id=${id}`);
        break;
      case 'delete':
        // 删除
        const isConfirmed = await swal.confirm({
          title: '确定删除该调整单据吗？',
          icon: 'warning',
        });
        if (!isConfirmed) return;
        await erpApi.luteosErpTiktokStockAdjustmentDeleted(id);
        ElMessage.success('删除成功');
        refreshList();
        break;
      case 'push':
      case 'rePush':
        // 推送或重新推送
        await erpApi.luteosErpTiktokStockAdjustmentPush(id);
        ElMessage.success(key === 'push' ? '推送成功' : '重新推送成功');
        refreshList();
        break;
      default:
        break;
    }
  };
</script>

<style scoped lang="scss"></style>
