<template>
  <KeenCard title="基础信息">
    <template #operation>
      <div>最后一次更新时间：{{ detailData.updateTime }}</div>
    </template>
    <el-descriptions :column="2" size="large">
      <el-descriptions-item label="人群名称">
        {{ detailData.crowdName }}
      </el-descriptions-item>
      <el-descriptions-item label="人群描述">
        {{ detailData.crowdDesc }}
      </el-descriptions-item>
    </el-descriptions>
  </KeenCard>
  <KeenCard title="用户信息">
    <div class="table-filter">
      <el-input v-model="search.email" placeholder="邮箱" class="w-375px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-select
        style="margin-left: 16px"
        v-model="registerSource"
        placeholder="全部平台"
        clearable
        multiple
        @change="
          (value) => {
            search.registerSource = value ? value.join(',') : '';
          }
        "
      >
        <el-option
          v-for="item in platforms"
          :key="item.registerSource"
          :value="item.registerSource"
          :label="item.registerSourceDesc"
        />
      </el-select>
      <el-button
        class="export-button"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button>
    </div>
    <vxe-table v-loading="listLoading" :data="listData?.users" min-height="100px" border="inner">
      <vxe-column field="uid" title="用户ID" />
      <vxe-column field="email" title="邮箱" />
      <vxe-column field="registerTime" title="注册时间" />
      <vxe-column field="registerChannel" title="注册平台" />
      <vxe-column field="availablePoint" title="积分" />
      <vxe-column field="memberLevel" title="会员等级" />
      <vxe-column title="操作" width="80px" fixed="right">
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
      </vxe-column>
    </vxe-table>
    <div>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </KeenCard>
</template>

<script setup lang="ts" name="systemPopulationDetail">
import { useRouter, useRoute } from 'vue-router';
  import { UserApi, userApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { useRequest } from 'vue-request';
  import * as swal from '@/utils/swal';

  const platforms = ref<any[]>([]);
  const registerSource = ref('');
  const getOptions = async () => {
    // const res = await userApi.luteosUserQueryPlatforms();
    const res = await userApi.luteosUserQueryRegisterSourceList();
    platforms.value = res.list || [];
  };
  getOptions();
  const router = useRouter();
  const route = useRoute();
  const detailData = ref<any>({
    crowdDesc: '',
    crowdName: '',
    crowdType: 0,
    id: 0,
    mappingId: 0,
    updateTime: '',
  });
  const loading = ref(false);
  const getDetailData = async () => {
    loading.value = true;
    const res = await userApi
      .luteosUserCrowdQueryDetail({
        crowdCode: route.query.code as string,
      })
      .finally(() => {
        loading.value = false;
      });
    detailData.value = res as any;
    search.lactation = detailData.value.mappingId;
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
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
    runQuery,
    refreshList,
  } = useList<UserApi.LuteosUserQueryUsers.RequestQuery, UserApi.LuteosUserQueryUsers.ResponseBody>(
    {
      searchDefaults: {
        lactation: detailData.value.mappingId,
        email: undefined,
        registerSource: undefined,
      },
      serviceManual: false,
      pageSize: PAGE_SIZE,
      service: userApi.luteosUserQueryUsers,
    }
  );
  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    userApi.luteosUserExportUsersByLactation,
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
      ...search,
    });
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'userdetail',
        query: { uid: row.uid },
      });
      router.push(path.href);
    }
  };
</script>

<style scoped lang="scss">
  .table-filter {
    margin: 12px 0;

    &::after {
      clear: both;
    }

    .export-button {
      float: right;
    }
  }
</style>
