<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="请输入红人/折扣码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <DeptMember v-model="search.operator" placeholder="运营人员" />
      <el-date-picker
        style="width: 280px"
        v-model="effectiveTime"
        start-placeholder="折扣开始时间"
        end-placeholder="折扣结束时间"
        type="daterange"
        value-format="YYYY-MM-DD"
        @change="
          (dateArr) => {
            search.startTime = dateArr ? dateArr[0] : '';
            search.endTime = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-cascader
        :options="labelOptions"
        v-model="search.markTag"
        clearable
        filterable
        :show-all-levels="true"
        placeholder="折扣标识"
        :props="{
          emitPath: false,
          expandTrigger: 'hover',
          multiple: false,
          checkStrictly: true,
          label: 'name',
          value: 'labelCode',
          children: 'childInfoList',
        }"
      />
      <el-select
        style="width: 120px"
        v-model="search.markStatus"
        clearable
        filterable
        placeholder="折扣码状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.channelCode"
        clearable
        filterable
        placeholder="渠道"
      >
        <el-option
          v-for="item in channelList"
          :key="item.channelCode"
          :label="item.name"
          :value="item.channelCode"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.lineCode"
        clearable
        filterable
        placeholder="品线"
      >
        <el-option
          v-for="item in lineCodeList"
          :key="item.lineCode"
          :label="item.lineName"
          :value="item.lineCode"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.creatorCode"
        clearable
        filterable
        placeholder="推广人"
      >
        <el-option
          v-for="item in creatorList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button v-if="codeList.length" class="button" type="primary" @click="joinVisible = true">
        参与大促
      </el-button>
      <el-tooltip content="勾选折扣码，可参与大促" placement="top" v-else>
        <el-button class="button" type="primary" :disabled="!codeList.length">参与大促</el-button>
      </el-tooltip>
      <el-button :loading="exportLoading" class="button" type="primary" @click="exportFn">
        导出
      </el-button>
    </template>

    <Table
      :listData="listData?.metaMarkList"
      :listLoading="listLoading"
      @refresh="runQuery"
      @selection-change="handleSelectionChange"
    />

    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <JoinPromotionDialog
    v-if="joinVisible"
    :visible="joinVisible"
    :task-code-list="codeList"
    @close="joinVisible = false"
    @save="handleSave"
  />
</template>

<script setup lang="ts" name="shopifycollectcode">
    import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { metaApi, MetaApi, memberApi, platformApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import JoinPromotionDialog from './components/joinPromotionDialog.vue';
  import useExport from '@/hooks/list/useExport';
  import Table from './components/table.vue';

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
    runQuery,
    refreshList,
    resetSearch,
  } = useList<
    MetaApi.LuteosMetaQueryMetaMarkList.RequestQuery,
    MetaApi.LuteosMetaQueryMetaMarkList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channelCode: undefined,
      lineCode: undefined,
      markStatus: undefined,
      markTag: undefined,
      creatorCode: undefined,
      startTime: undefined,
      endTime: undefined,
      platformCode: 'station',
      operator: undefined,
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryMetaMarkList,
  });

  const effectiveTime = ref([]);
  const statusList = ref([
    { label: '待生效', value: 1 },
    { label: '生效中', value: 2 },
    { label: '已到期', value: 3 },
    { label: '关停中', value: 5 },
    { label: '已作废', value: 6 },
    { label: '已取消', value: 4 },
  ]);

  // 参与大促
  const joinVisible = ref(false);
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.taskCode) || [];
  };

  const handleSave = () => {
    joinVisible.value = false;
    refreshList();
  };

  const channelList = ref([]);
  const queryChannelList = () => {
    metaApi.luteosMetaQueryChannelList({ pageNum: 1, pageSize: 500 }).then((res: any) => {
      channelList.value = res.channelList || [];
    });
  };
  queryChannelList();

  const lineCodeList = ref([]);
  const queryProductLineList = () => {
    metaApi.luteosMetaQueryProductLineList({ pageNum: 1, pageSize: 500 }).then((res: any) => {
      lineCodeList.value = res.productLineList || [];
    });
  };

  queryProductLineList();

  const creatorList = ref([]);

  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'red_promoter' })
      .then((res: any) => {
        creatorList.value = res.memberList || [];
      });
  };
  queryDeptMemberOption();

  const labelOptions = ref([]);
  const queryLabelOptions = async () => {
    const res = await platformApi.platformLabelQueryLabelAllList({
      module: 'mark_tag',
    });
    labelOptions.value = res?.labelInfoList || [];
  };
  queryLabelOptions();

  // Export
  const { handleExport, exportLoading } = useExport(
    metaApi.luteosMetaExportShopifyMetaMarkList,
    {}
  );

  function exportFn() {
    console.log('🚀 ~ search:', search);
    handleExport(search);
  }
</script>

<style lang="scss" scoped>
  .wid_240 {
    width: 240px;
    flex: 0 0 240px;
  }

  :deep(.el-cascader) {
    width: 160px;
    min-width: 160px;
  }
</style>
