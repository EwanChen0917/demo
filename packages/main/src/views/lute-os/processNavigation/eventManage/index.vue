<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="事项名称/事项ID">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item of creatorList"
          :key="item.value"
        />
      </el-select>
      <el-select
        v-model="search.status"
        placeholder="状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="停用" :value="0" />
        <el-option label="启用" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button
        class="button"
        type="primary"
        v-permission="'addEvent'"
        @click="detailVisible = true"
      >
        新增事项
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
      :tree-props="{
        hasChildren: 'hasChildren',
        children: 'materItemList',
      }"
      :expand-row-keys="expandRowKeys"
      @expand-change="handleExpandChange"
    >
      <el-table-column prop="name" label="事项名称" min-width="200px" />
      <el-table-column prop="code" label="事项ID" min-width="200px" />
      <el-table-column prop="level" label="事项等级" min-width="100px">
        <template #default="{ row }">{{ levelDesc[row.level] || '' }}</template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="140px" />
      <el-table-column prop="updater" label="最后更新人" width="140px" />
      <el-table-column prop="statusDesc" label="状态" width="100px">
        <template #default="{ row }">
          <el-tag :type="stateColor[row.status]" effect="dark">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间" width="260px">
        <template #default="{ row }">
          <div style="margin-bottom: 4px">创建时间：{{ row.createTime }}</div>
          <div>更新时间：{{ row.updateTime }}</div>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" width="60px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'editEvent',
                hide: row.level === 3,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
  </KeenList>
  <DetailDialog
    v-if="detailVisible"
    :visible="detailVisible"
    :formData="formData"
    :recordList="listData?.recordList"
    @save="runQuery"
    @close="
      () => {
        detailVisible = false;
        formData = {};
      }
    "
  />
</template>

<script lang="ts" setup name="eventManage">
    import { processApi, ProcessApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import useList from '@/views/lute-os/hooks/list/useList';
  import DetailDialog from './Modal/detailDialog.vue';

  const stateColor = ref({
    0: 'info',
    1: 'success',
  });
  const router = useRouter();
  const PAGE_SIZE = 100;
  const { search, listData, listLoading, resetSearch, runQuery } = useList<
    ProcessApi.LuteosProcessNavigationMatterQueryList.RequestQuery,
    ProcessApi.LuteosProcessNavigationMatterQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: '',
      creator: '',
    },
    pageSize: PAGE_SIZE,
    service: processApi.luteosProcessNavigationMatterQueryList,
  });

  const levelDesc = ref({
    1: '一级',
    2: '二级',
    3: '三级',
  });

  const creatorList = ref<any[]>([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      if (row.level === 1) {
        formData.value = row;
        detailVisible.value = true;
      } else if (row.level === 2) {
        router.push({
          name: 'detailEvent',
          query: {
            code: row.code,
          },
        });
      }
    }
  };
  const detailVisible = ref(false);
  const formData = ref({});
  onMounted(() => {
    getCreatorList();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }
</style>
