<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="产品名称/产品SKU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ThirdCategory
        v-model="search.thirdLevelCategory"
        style="width: 260px"
        multiple
        filterable
        placeholder="请选择三级分类"
      />
      <!-- 需求筛选数量select，选项默认正数 -->
      <el-select v-model="search.plus" placeholder="需求筛选数量" clearable>
        <el-option label="正数" :value="1" />
        <el-option label="负数" :value="0" />
        <el-option label="0" :value="-1" />
      </el-select>
      <!-- 设置select多选 -->
      <DeptMember
        v-model="search.planerList"
        multiple
        placeholder="计划"
        deptCode="supply_planer_dept"
      />
    </template>
    <template #buttons>
      <!-- <el-button class="button" type="primary" @click="handleExport">库存快照</el-button> -->
      <el-button class="button" type="primary" @click="handleUpdateDemand">更新需求</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
      max-height="65vh"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column
        v-for="column of listData?.colNameList"
        :key="column"
        :prop="column"
        :label="column"
        min-width="140"
      >
        <template v-if="column === '建议需求数量'" #default="{ row }">
          <el-popover placement="bottom" width="400" trigger="hover">
            <template #reference>
              <el-text type="primary">{{ row[column] }}</el-text>
            </template>
            <div v-for="(value, key) in row.sugguestTips" :key="key" class="numberTip">
              <span class="label">{{ key }}：</span>
              <span class="value">{{ value }}</span>
            </div>
          </el-popover>
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

<script lang="ts" setup name="requirementsPlan">
  import { erpApi, ErpApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import ThirdCategory from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/thirdCategory.vue';

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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpRequirementSugguestQueryCurrentList.RequestQuery,
    ErpApi.LuteosErpRequirementSugguestQueryCurrentList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      operator: '',
      plus: 1,
      planerList: [],
      thirdLevelCategory: [],
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpRequirementSugguestQueryCurrentList,
  });

  const selections = ref([]);
  const handleSelectionChange = (list) => {
    selections.value = list;
  };
  const handleUpdateDemand = async () => {
    // if (!selections.value.length) {
    //   ElMessage.warning('请勾选需要更新的需求');
    //   return;
    // }
    const isConfirmed = await swal.confirm('确认更新需求？');
    if (!isConfirmed) return;
    await erpApi
      .luteosErpRequirementSugguestAutoSaveNew()
      .then(() => {
        ElMessage.success('更新需求成功');
        refreshList();
      })
      .catch((error) => {
        ElMessage.error(`更新需求失败: ${error.message}`);
      });
  };

  const detailDialogRef = ref();
</script>

<style scoped lang="scss"></style>
