<template>
  <el-tabs v-model="activatedTab" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <!-- <span class="tab-count">({{ listData?.statusStatistics[item.code] }})</span> -->
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.crowdName" placeholder="人群名称" class="w-375px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>

    <el-table
      class="border-table"
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.crowds"
      row-key="productSku"
      class-name="table-row-dashed"
      max-height="900px"
    >
      <el-table-column prop="crowdName" label="人群名称" />
      <el-table-column prop="crowdDesc" label="人群描述" />
      <el-table-column prop="frequencyDesc" label="更新频率" />
      <el-table-column prop="userNum" label="人数" />
      <el-table-column label="操作" width="80px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
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

<script lang="ts" setup name="systemPopulation">
  import { userApi, UserApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';

  const tabStatusList = [{ status: '', code: 'all', statusName: '生命周期', count: '' }];
  const activatedTab = ref('');
  const router = useRouter();
  const PAGE_SIZE = 10;
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
    resetSearch,
    runQuery,
  } = useList<UserApi.LuteosUserCrowdQuery.RequestQuery, UserApi.LuteosUserCrowdQuery.ResponseBody>(
    {
      searchDefaults: {
        crowdName: '',
      },
      pageSize: PAGE_SIZE,
      service: userApi.luteosUserCrowdQuery,
    }
  );
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'systemPopulationDetail',
        query: { code: row.crowdCode },
      });
      router.push(path.href);
    }
  };
</script>

<style scoped lang="scss"></style>
