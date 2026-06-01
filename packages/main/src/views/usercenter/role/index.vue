<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="
      (key) => {
        search[key] = undefined;
        runQuery(true);
      }
    "
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="角色名称"
        @input="triggerSearch"
        @keyup.enter="runQuery(true)"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-select
        style="margin-left: 12px"
        v-model="search.platform"
        clearable
        filterable
        @change="triggerSearch"
        placeholder="平台"
      >
        <el-option
          v-for="item in sysList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="goAdd" v-permission="'addRole'">
        添加角色
      </el-button>
    </template>
    <template #default="{ tableHeight }">
      <vxe-table
        v-loading="listLoading"
        border
        show-overflow
        :data="listData?.roleList || []"
        :height="tableHeight || 700"
      >
        <vxe-column field="roleCode" title="角色Code" min-width="160px" />
        <vxe-column field="roleName" title="角色名称" min-width="200px" />
        <vxe-column field="desc" title="角色说明" min-width="260px" />
        <vxe-column
          title="角色所覆盖平台"
          min-width="260px"
          field="platformList"
          :show-overflow="'tooltip'"
          :formatter="platformTooltipFormatter"
        >
          <template #default="{ row }">
            <vxe-tooltip :content="platformTooltip(row)" placement="top" theme="dark">
              <div class="platform-cell">
                <span
                  v-for="item in getPlatformList(row)"
                  :key="`${row.roleCode}-${item.platform || item.value || item.platformDesc}`"
                  class="platform-tag"
                >
                  {{ item.platformDesc || item.desc || item.platform || item.value }}
                </span>
              </div>
            </vxe-tooltip>
            <span v-if="isEmpty(getPlatformList(row))">--</span>
          </template>
        </vxe-column>
        <vxe-column field="creatorName" title="创建人" min-width="120px" />
        <vxe-column field="createTime" title="创建时间" min-width="180px" />
        <vxe-column title="角色状态" min-width="60px" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              inline-prompt
              @change="(val) => handleStatusChange(row, val)"
            />
          </template>
        </vxe-column>
        <vxe-column title="操作" width="220" fixed="right">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑角色',
                  key: 'editRole',
                  row,
                  type: 'primary',
                  permissionCode: 'editRole',
                  disabled: row.roleCode === 'R00000000' || row.roleCode === 'R00000001',
                },
                {
                  label: '用户列表',
                  key: 'user',
                  row,
                  type: 'primary',
                  permissionCode: 'userList',
                },
                {
                  label: '复制角色',
                  key: 'copy',
                  row,
                  type: 'primary',
                  permissionCode: 'copyRole',
                },
              ]"
              @click="handleActions"
            />
          </template>
        </vxe-column>
      </vxe-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </KeenList>
  <DetailDialog ref="detailDialogRef" @success="refreshList" />
</template>

<script lang="ts" setup name="role">
  import { platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { isEmpty } from 'lodash-es';
  import { useDebounceFn } from '@vueuse/core';
  import useList from '@/hooks/list/useList';
  import DetailDialog from './components/detailDialog.vue';
  import { fetchRoleList, fetchPlatformList, operateRoleStatus } from './api';

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
  } = useList({
    searchDefaults: {
      platform: undefined,
      keyword: undefined,
    },
    watchSearchKeys: [],
    service: fetchRoleList,
  });
  const reset = () => {
    resetSearch();
    runQuery(true);
  };
  const triggerSearch = useDebounceFn(() => {
    runQuery(true);
  }, 300);
  const sysList = ref([]);
  const router = useRouter();
  const detailDialogRef = ref();

  const querySysMap = async () => {
    const res = await fetchPlatformList();
    sysList.value = res || [];
  };

  const goAdd = () => {
    router.push('/role/add');
  };

  const handleActions = async (command) => {
    const { key, row } = command;
    if (key === 'editRole') {
      router.push({
        path: '/role/edit',
        query: { roleCode: row.roleCode },
      });
      return;
    }
    if (key === 'user') {
      router.push({
        path: '/role/user',
        query: {
          roleCode: row.roleCode,
        },
      });
      return;
    }
    if (key === 'copy') {
      router.push({
        path: '/role/copy',
        query: { roleCode: row?.roleCode },
      });
      return;
    }
    if (key === 'delete') {
      const isConfirmed = await swal.confirm('确定要删除该角色吗？');
      if (!isConfirmed) return;
      try {
        await platformApi.platformRoleRemoveRole({
          roleCode: row.roleCode,
        });
        ElMessage.success('删除成功');
      } catch (err) {
        ElMessage.error('删除失败，请稍后重试');
      } finally {
        refreshList();
      }
    }
  };

  const handleStatusChange = useDebounceFn(
    async (row, value) => {
      try {
        row.status = value;
        await operateRoleStatus({
          roleCode: row.roleCode,
          operateType: value === 1 ? 'enable' : 'disable',
        });
        ElMessage.success(value === 1 ? '已启用' : '已停用');
      } catch (err) {
        row.status = value === 1 ? 0 : 1;
        ElMessage.error('状态更新失败，请稍后重试');
      }
    },
    300,
    { maxWait: 800 }
  );

  const getPlatformList = (row) =>
    (row?.platformList ?? []).filter(
      (item) => item?.platform || item?.platformDesc || item?.value || item?.desc
    );
  const platformTooltip = (row) => {
    const list = getPlatformList(row);
    if (!list?.length) return '';
    return list
      .map((item) => item.platformDesc || item.desc || item.platform || item.value)
      .filter(Boolean)
      .join('、');
  };
  const platformTooltipFormatter = ({ row }) => platformTooltip(row);

  onMounted(() => {
    querySysMap();
    runQuery();
  });

  onActivated(() => {
    runQuery();
  });
</script>

<style scoped lang="scss">
  :deep(.tree-icon.svg-icon svg) {
    width: 32px;
    height: 32px;
  }
  .platform-tag {
    display: inline-flex;
    align-items: center;
    height: 24px;
    line-height: 22px;
    padding: 0 9px;
    font-size: 12px;
    color: #02b96b;
    border: 1px solid #02b96b;
    border-radius: 4px;
    box-sizing: border-box;
    margin-right: 4px;
  }
  .platform-cell {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
