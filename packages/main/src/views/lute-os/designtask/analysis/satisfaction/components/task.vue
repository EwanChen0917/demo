<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.name" placeholder="任务名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.designerCode"
        clearable
        filterable
        placeholder="请选择设计师"
        remote-show-suffix
        @change="runQuery"
      >
        <el-option
          v-for="item in designerMemberList"
          :key="item.designer"
          :label="item.designerDesc"
          :value="item.designer"
        />
      </el-select>
      <el-date-picker
        v-model="search.selectDate"
        type="month"
        value-format="YYYY-MM"
        placeholder="月份"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <ExportBtn :ignore-app-code="true"
        :service="designApi.luteosDesignStatisticAnalysisExportDesignTaskStatistic"
        :params="search"
      >
        导出
      </ExportBtn>
    </template>
    <vxe-table border="inner" :data="listData?.scoreStatisticList" v-loading="listLoading">
      <vxe-column field="name" title="任务名称" min-width="100" />
      <vxe-column field="itemTypeDesc" title="类型" min-width="120" />
      <!--      <vxe-column field="brandName" title="品牌" min-width="100" />-->
      <vxe-column field="taskInfo" title="任务内容" min-width="120" />
      <vxe-column field="initiator" title="创建人" min-width="80" />
      <vxe-column field="designer" title="设计师" min-width="80" />
      <vxe-column title="时间" min-width="150">
        <template #default="scope">
          <div>创建 {{ scope.row.createDate || '--' }}</div>
          <div>截止 {{ scope.row.endDate || '--' }}</div>
          <div>完成 {{ scope.row.finishDate || '--' }}</div>
        </template>
      </vxe-column>
      <vxe-column field="efficient" title="" min-width="100">
        <template #header>
          <span>能效</span>
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            content="超前(-)|延期(+)|准时"
          >
            <QuestionFilled style="height: 15px; width: 15px" />
          </el-tooltip>
        </template>
        <template #default="scope">
          <div>
            {{
              scope.row.finishDate > scope.row.endDate
                ? `+${scope.row.efficient}`
                : scope.row.efficient
            }}天
          </div>
        </template>
      </vxe-column>
      <vxe-column field="statusDesc" title="任务进度" min-width="80" />
      <vxe-column field="urgentDesc" title="加急状态" min-width="80" />
      <vxe-column field="score" title="得分" min-width="120" />
      <vxe-column field="designerScore" title="用户满意度得分" min-width="120" />
    </vxe-table>
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

<script setup lang="ts">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { designApi, DesignApi } from '@/api';

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
    resetSearch,
    runQuery,
  } = useList<
    DesignApi.LuteosDesignStatisticAnalysisQueryDesignScoreStatisticList.RequestBody,
    DesignApi.LuteosDesignStatisticAnalysisQueryDesignScoreStatisticList.ResponseBody
  >({
    searchDefaults: {
      name: '',
      designerCode: '',
      selectDate: '',
      designType: 'old_design',
      // itemType: 1,
    },
    pageSize: PAGE_SIZE,
    service: designApi.luteosDesignStatisticAnalysisQueryDesignScoreStatisticList,
  });
  // 查询设计师
  const designerMemberList = ref([]);
  const queryDesignerList = () => {
    designApi.luteosDesignQueryDesignerList({}).then((res) => {
      designerMemberList.value = res.designerList || [];
    });
  };

  queryDesignerList();
</script>

<style scoped lang="scss"></style>
