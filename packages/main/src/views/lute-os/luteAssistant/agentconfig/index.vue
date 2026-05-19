<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="搜索路特智能体">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.status" clearable filterable placeholder="状态">
        <el-option :value="1" label="开启">开启</el-option>
        <el-option :value="0" label="关闭">关闭</el-option>
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="refreshList">查询</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.agentList"
      row-key="agentCode"
    >
      <el-table-column prop="agentName" label="智能体岗位" width="230" />
      <el-table-column label="智能体名称" prop="nickname" width="200" />
      <el-table-column label="智能体简介" min-width="200">
        <template #default="scope">
          <OverflowTooltip :line="2" :content="scope.row.description">
            {{ scope.row.description }}
          </OverflowTooltip>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="95">
        <template #default="scope">
          <span class="badge" :class="[scope.row.status ? 'badge-light-success' : 'badge-light']">
            {{ AgentStatus[scope.row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="最新启动时间" width="155">
        <template #default="scope">
          {{ scope.row.lastEnableTime ? dayjs(scope.row.lastEnableTime).format('YYYY-MM-DD') : '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="55">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                payload: scope.row,
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

<script lang="ts" setup name="LuteAssistantAgentConfig">
    import { aiApi, AiApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import dayjs from 'dayjs';

  const router = useRouter();
  enum AgentStatus {
    开启 = 1,
    关闭 = 0,
  }
  const {
    resetSearch,
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
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<AiApi.LuteosAiAgentAdminList.RequestQuery, AiApi.LuteosAiAgentAdminList.ResponseBody>(
    {
      searchDefaults: {
        keyword: undefined,
        status: undefined,
      },
      service: aiApi.luteosAiAgentAdminList,
    }
  );

  // 表格操作
  const handleActions = (item) => {
    const {
      key,
      payload: { agentCode },
    } = item;
    if (key === 'edit') {
      router.push({ name: 'LuteAssistantAgentConfigDetail', query: { agentCode } });
    }
  };
</script>
