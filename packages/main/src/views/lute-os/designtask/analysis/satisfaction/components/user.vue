<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="设计师">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
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
        :service="designApi.luteosDesignStatisticAnalysisExportUserSatisfaction"
        :params="search"
      >
        导出
      </ExportBtn>
    </template>
    <vxe-table border="inner" :data="listData?.userSatisfactionList" v-loading="listLoading">
      <vxe-column title="设计师" field="designer" />
      <vxe-column title="准时率" field="punctualityRate">
        <template #default="scope">
          <div>{{ scope.row.punctualityRate }}%</div>
        </template>
      </vxe-column>

      <vxe-column title="用户满意度平均得分" field="acceptAvgScore" />
      <vxe-column title="用户满意度等级" field="acceptLevel" />
      <vxe-column title="评分次数" field="scoreNum" />
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
    DesignApi.LuteosDesignStatisticAnalysisQueryUserSatisfactionList.RequestBody,
    DesignApi.LuteosDesignStatisticAnalysisQueryUserSatisfactionList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      selectDate: '',
    },
    pageSize: PAGE_SIZE,
    service: designApi.luteosDesignStatisticAnalysisQueryUserSatisfactionList,
  });
</script>

<style scoped lang="scss"></style>
