<template>
  <div class="config-list">
    <KeenList
      @refresh="refreshList"
      @reset-search="handleResetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.appName" placeholder="应用名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.platformCode" placeholder="平台" clearable>
          <el-option
            v-for="item in platFormList"
            :label="item.platformName"
            :value="item.platformCode"
            :key="item.platformCode"
          />
        </el-select>
        <el-select
          v-model="localAuthType"
          placeholder="鉴权类型"
          clearable
          @change="(value) => handleSelectChange(value, 'authType')"
        >
          <el-option
            v-for="(value, key) in authTypeMap"
            :label="value"
            :value="Number(key)"
            :key="key"
          />
        </el-select>
        <el-select
          v-model="localStatus"
          placeholder="状态"
          clearable
          @change="(value) => handleSelectChange(value, 'status')"
        >
          <el-option
            v-for="item in statusMap"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-button type="primary" @click="addOrEditRef?.open('add')">新增配置</el-button>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
      >
        <el-table-column label="平台" prop="platformName" />
        <el-table-column label="应用名称" prop="appName">
          <template #default="{ row }">
            <div>{{ row.appName }}</div>
            <span class="app-code">{{ row.appCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="鉴权类型" prop="authType">
          <template #default="{ row }">
            <Tag v-if="row.authType" :color="row.authType === 1 ? 'gray' : 'blue'">
              {{ authTypeMap[row?.authType] }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="API基础URL" prop="apiBaseUrl" />
        <el-table-column label="授权账号数" prop="accountCount">
          <template #default="{ row }">
            <span @click="handleClickAccountList(row)" class="account-click" :class="{'account-zero': row.accountCount == 0}">
              {{ row.accountCount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" width="120">
          <template #default="{ row }">
            <Tag :color="row.status === 1 ? 'green' : 'red'">
              {{ statusMap.find(status => status.value == row?.status)?.label }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'detail',
                  type: 'primary',
                  // permissionCode: 'viewPermission',
                  row,
                },
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  // permissionCode: 'setPermission',
                  row,
                },
                {
                  label: '删除',
                  key: 'delete',
                  type: 'primary',
                  // permissionCode: 'deletePermission',
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
    <AddOrEditDialog ref="addOrEditRef" @success="refreshList" />
  </div>
</template>

<script setup lang="ts" name="authConfiguration">
  import useList from '@/hooks/list/useList';
  import { PlatformApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import AddOrEditDialog from './components/AddOrEditDialog.vue';
  import router from '@/router';

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
    PlatformApi.PlatformChannelConfigQueryList.RequestQuery,
    PlatformApi.PlatformChannelConfigQueryList.ResponseBody
  >({
    searchDefaults: {
      appName: undefined,
      platformCode: undefined,
      authType: undefined,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformChannelConfigQueryList,
  });

  const addOrEditRef = ref();
  const localStatus = ref<number>(2);
  const localAuthType = ref<number>(0);
  const authTypeMap = {
    0: '全部',
    1: '固定秘钥',
    2: 'OAuth动态Token',
  };

  const statusMap = computed(() => {
    let statusList = [{label: '全部', value: 2}, {label: '启用', value: 1}, {label: '禁用', value: 0}]
    return statusList.sort((a, b) => b.value - a.value)
  })

  const platFormList = ref<Array<{ platformCode: string; platformName: string }>>([]);
  const getPlatFormList = async () => {
    let result: any = await platformApi.platformChannelConfigPlatformList();
    platFormList.value = result?.recordList || [];
  };
  getPlatFormList();

  const handleSelectChange = (value, type) => {
    switch (type) {
      case 'status':
        if(value == undefined) localStatus.value = 2;
        if (value == 2) search[type] = undefined;
        else search[type] = value;
        break;

      default:
        if (!value) search[type] = undefined;
        if(value == undefined) localAuthType.value = 0;
        else search[type] = value;
        break;
    }
  };

  const handleResetSearch = () => {
    localAuthType.value = 0;
    localStatus.value = 2;
    resetSearch();
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      addOrEditRef.value?.open('edit', row.id);
    } else if (key === 'detail') {
      addOrEditRef.value?.open('detail', row.id);
    } else if (key === 'delete') {
      const isConfirmed = await swal.confirm('确认删除吗？');
      if (!isConfirmed) return;
      try {
        await platformApi.platformChannelConfigDelete({ id: row.id });
        ElMessage.success('删除成功');
        refreshList();
      } finally {
      }
    }
  };

  const handleClickAccountList = (row) => {
    console.log(row, 'row');
    router.push({
      path: '/authAccountList',
      query: {
        appCode: row.appCode,
        platformCode: row.platformCode,
        appName: row.appName,
      },
    });
  };
</script>

<style scoped lang="scss">
  .account-click {
    color: #258dff;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      opacity: 0.9;
    }
  }
  .account-zero {
    // color: #9ca3af;
  }

  .app-code {
    font-size: 12px;
    color: #9ca3af;
  }

  .config-list {
    :deep(.el-dialog) {
      margin-top: 10vh;
      // margin-bottom: 10vh;
      max-width: 650px;
      padding: 0;
      border-radius: 10px;
      .el-dialog__header {
        margin: 0 20px;
        padding: 16px 0;
        border-bottom: 1px solid #ededed;
      }
      .el-dialog__body {
        min-height: 200px;
        max-height: calc(100vh - 320px);
        padding: 20px;
        overflow: auto;
      }
      .el-dialog__footer {
        border-top: 1px solid #ededed;
        padding: 16px 20px;
      }
    }
  }
</style>
