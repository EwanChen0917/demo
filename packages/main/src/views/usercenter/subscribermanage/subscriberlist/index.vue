<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.email" placeholder="用户邮箱">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.registerStatus" placeholder="是否已注册" clearable>
        <el-option
          v-for="item in STATUS_LIST"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <el-select v-model="search.subscribeChannel" placeholder="平台" clearable>
        <el-option
          v-for="item in platforms"
          :key="item.registerChannel"
          :value="item.registerChannel"
          :label="item.registerChannelDesc"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" @click="handleExport" :loading="exportLoading" type="primary" plain>
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.subscribers"
      row-key="uid"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="email" label="订阅邮箱" min-width="200" />
      <el-table-column prop="subscribeChannelDesc" label="平台" min-width="200">
        <template #default="scope">
          <span>{{ scope.row.subscribeChannelDesc || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subscribeTime" label="订阅时间" min-width="150" />
      <el-table-column prop="registerStatus" label="是否注册" min-width="150">
        <template #default="scope">
          <span>{{ +scope.row.registerStatus === 0 ? '未注册' : '已注册' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerTime" label="注册时间" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.registerTime || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderCount" label="订单数" min-width="150" />
      <el-table-column label="操作" align="right">
        <template #default="scope">
          <template v-if="+scope.row.registerStatus === 0">
            <KeenActions
              :actions="[
                {
                  label: '激活邀请',
                  key: 'sendEmail',
                  type: 'primary',
                  text: true,
                  uid: scope.row.uid,
                },
              ]"
              @click="handleActions"
            />
          </template>
          <template v-else>
            <KeenActions
              :actions="[
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  text: true,
                  uid: scope.row.uid,
                },
              ]"
              @click="handleActions"
            />
          </template>
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

<script lang="ts" setup name="subscriberlist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { userApi, UserApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  const router = useRouter();
  const PAGE_SIZE = 10;

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
    runQuery,
    refreshList,
    resetSearch,
    // selectedKeys,
  } = useList<
    UserApi.LuteosUserQuerySubscribers.RequestQuery,
    UserApi.LuteosUserQuerySubscribers.ResponseBody
  >({
    searchDefaults: {
      email: undefined,
      registerStatus: undefined,
      subscribeChannel: undefined,
    },
    pageSize: PAGE_SIZE,
    service: userApi.luteosUserQuerySubscribers,
  });
  const platforms = ref([]);
  const STATUS_LIST = [
    {
      label: '未注册',
      value: 0,
    },
    {
      label: '已注册',
      value: 1,
    },
  ];

  const route = useRoute();
  const { params } = route;
  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  const getOptions = async () => {
    const res = await userApi.luteosUserQueryPlatforms();
    platforms.value = res.platforms || [];
  };
  getOptions();

  const uids = reactive([]);
  const handleSelectionChange = (list) => {
    uids.value = list.map((item) => item.uid);
  };
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    userApi.luteosUserExportSubscribers,
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
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;

    exportRun({
      pageNum: current.value,
      pageSize: pageSize.value,
      uids: uids.value,
      ...search,
    });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, uid } = item;

    if (key === 'sendEmail') {
      await userApi.luteosUserSendActiveEmail({ uid });
      // FIXME 修改交互
      ElMessage.success({
        message: '激活邀请发送成功',
        duration: 5 * 1000,
      });
    } else {
      sessionStorage.setItem('userSearchInfo', JSON.stringify(search));
      router.push(`/userlist/detail?uid=${uid}&isSub=1`);
    }
  };
</script>

<style scoped lang="scss"></style>
