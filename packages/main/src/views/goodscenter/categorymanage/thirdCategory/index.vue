<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.categoryName" placeholder="品类名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option :value="1" label="已生效" />
        <el-option :value="0" label="未生效" />
        <el-option :value="2" label="已驳回" />
        <el-option :value="3" label="失效" />
      </el-select>
    </template>
    <template #buttons>
      <!--      <ExportBtn :service="exportService" :params="search">导出</ExportBtn>-->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.categoryBeanList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column prop="categoryName" min-width="150">
        <template #header>
          品类名称
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="right"
            effect="light"
            content="数据来源产品分类的三级分类"
          >
            <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
          </el-tooltip>
        </template>
        <!--        <template #default="{ row }">
          <span class="cursor-pointer" @click="handleExpandChange(row)">
            {{ row.categoryName }}
          </span>
        </template>-->
      </el-table-column>
      <el-table-column prop="labelName" label="分类标签" min-width="100" />
      <el-table-column label="分类等级">
        <template #default="scope">
          <span>三级</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span v-if="scope.row.status === 0" class="badge badge-light-danger">未生效</span>
          <span v-if="scope.row.status === 1" class="badge badge-light-success">已生效</span>
          <span v-if="scope.row.status === 2" class="badge badge-light-danger">已驳回</span>
          <span v-if="scope.row.status === 3" class="badge badge-light-danger">失效</span>
          <!-- <span>{{ scope.row.status ? "已生效" : "未生效" }}</span> -->
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

<script setup lang="ts" name="thirdCategory">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import { QuestionFilled } from '@element-plus/icons-vue';

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
    ProductApi.LuteosProductCategoryQueryCategoryListByParam.RequestQuery,
    ProductApi.LuteosProductCategoryQueryCategoryListByParam.ResponseBody
  >({
    searchDefaults: {
      categoryCode: undefined,
      categoryName: undefined,
      status: 1,
      level: 3,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductCategoryQueryCategoryListByParam,
  });
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
  }
</style>
