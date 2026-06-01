<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="团队名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>

    <template #buttons>
      <el-button type="primary" @click="teamRef?.open(null, '新增')">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.operationTeamList"
      class-name="table-row-dashed"
    >
      <el-table-column label="团队名称" prop="teamName" />
      <el-table-column label="负责人" prop="leader">
        <template #default="{ row }">
          <div>{{ row?.leaderList?.map((item) => item.name)?.join('、') || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="关联成员" prop="teamMember" min-width="200">
        <template #default="{ row }">
          <el-tooltip v-if="row?.memberList?.length > 15" placement="top">
            <template #content>
              <div style="max-width: 700px">
                {{ row?.memberList?.map((item) => item.name)?.join('、') }}
              </div>
            </template>
            <div class="line-clamp">
              {{ row?.memberList?.map((item) => item.name)?.join('、') || '--' }}
            </div>
          </el-tooltip>
          <div v-else class="line-clamp">
            {{ row?.memberList?.map((item) => item.name)?.join('、') || '--' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="关联产品标签" prop="teamLabel">
        <template #default="{ row }">
          <div>{{ row?.labelList?.map((item) => item.tagName)?.join('、') || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新信息" min-width="150">
        <template #default="{ row }">
          <div class="fs-7">更新人：{{ row?.operatorName || '--' }}</div>
          <div class="fs-7">更新时间：{{ row?.updateTime || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                hide: row?.status === 0,
                row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'primary',
                permissionCode: '',
                hide: row?.status === 1,
                row,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'danger',
                permissionCode: '',
                hide: row?.status === 0,
                row,
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
  <TeamDialog ref="teamRef" @success="refreshList" :operator-options="operatorOptions" />
  <TeamDetailDialog ref="teamDetailRef" />
</template>

<script setup lang="ts" name="team">
  import useList from '@/hooks/list/useList';
  import TeamDialog from '@/views/teammanage/components/teamDialog.vue';
  import * as swal from '@/utils/swal';
  import { memberApi, productOperationApi, ProductOperationApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import TeamDetailDialog from '@/views/teammanage/components/teamDetailDialog.vue';

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
    ProductOperationApi.LuteosOperationTeamQueryTeamList.RequestQuery,
    ProductOperationApi.LuteosOperationTeamQueryTeamList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      scene: 'operation',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productOperationApi.luteosOperationTeamQueryTeamList,
  });

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList;
  };
  getOperatorOptions();

  const teamRef = ref(null);
  const teamDetailRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      teamRef.value?.open(row, '编辑');
    }
    if (key === 'view') {
      teamDetailRef.value?.open(row);
    }
    if (key === 'enable') {
      const isConfirmed = await swal.confirm('确定要启用吗？');
      if (!isConfirmed) return;
      await productOperationApi.luteosOperationTeamHandleTeam({
        teamCode: row?.teamCode,
        type: 'enable',
      });
      ElMessage.success('启用成功');
      refreshList();
    }
    if (key === 'disable') {
      const isConfirmed = await swal.confirm('确定要禁用吗？');
      if (!isConfirmed) return;
      await productOperationApi.luteosOperationTeamHandleTeam({
        teamCode: row?.teamCode,
        type: 'disable',
      });
      ElMessage.success('禁用成功');
      refreshList();
    }
  };
</script>

<style scoped lang="scss">
  .line-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>
