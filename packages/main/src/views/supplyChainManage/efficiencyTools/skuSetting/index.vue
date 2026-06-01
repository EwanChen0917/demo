<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="产品SKU/供应链SKU/产品名称"
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 160px"
        v-model="search.logisticMethod"
        placeholder="默认头程配送方式"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of logisticMethodList"
          :key="person.code"
          :label="person.name"
          :value="person.code"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.plannerCode"
        placeholder="计划"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of creatorList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <!-- <el-button type="primary" @click="detailDialogRef?.open()">新增</el-button> -->
      <el-button type="primary" @click="importDialogRef?.open()">批量编辑</el-button>
      <el-button type="primary" @click="downloadTemplate" :loading="exportLoading">导出</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="skuCode" width="160px" label="产品SKU" />
      <el-table-column prop="productName" label="产品名称" width="240px" />
      <el-table-column prop="supplySkuList" width="200px" label="供应链SKU">
        <template #default="{ row }">
          <template v-if="row.supplySkuList && row.supplySkuList.length === 1">
            {{ row.supplySkuList[0] }}
          </template>
          <template v-if="row.supplySkuList && row.supplySkuList.length > 1">
            <el-popover placement="bottom" trigger="hover">
              <div v-for="item of row.supplySkuList" :key="item">{{ item }}</div>
              <template #reference>
                <el-button link type="primary">
                  {{ row.supplySkuList[0] }}
                  <el-icon style="margin-left: 4px">
                    <Arrow-down />
                  </el-icon>
                </el-button>
              </template>
            </el-popover>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="logisticMethodDesc" width="140px" label="默认头程配送方式" />
      <el-table-column prop="categoryName" width="160px" label="五级分类" />
      <el-table-column prop="qtyBox" label="整箱数量" />
      <el-table-column prop="planner" label="计划" />
      <el-table-column prop="updateTime" width="180px" label="更新时间" />
      <el-table-column align="right" label="操作" width="60px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
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
    <DetailDialog
      ref="detailDialogRef"
      :logisticMethodList="logisticMethodList"
      :plannerList="creatorList"
      @success="runQuery"
    />
    <ImportDialog :searchParams="search" ref="importDialogRef" @success="runQuery" />
  </KeenList>
</template>

<script lang="ts" setup name="skuSetting">
  import { erpApi, ErpApi, memberApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { urlDownload } from '@/utils/download';
  import DetailDialog from './components/detailDialog.vue';
  import ImportDialog from './components/importDialog.vue';

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
    ErpApi.LuteosErpSpSkuConfigQueryList.RequestBody,
    ErpApi.LuteosErpSpSkuConfigQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      plannerCode: '',
      logisticMethod: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSpSkuConfigQueryList,
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
  const logisticMethodList = ref<any>([]);
  const getLogisticMethodList = async () => {
    const res = await erpApi.luteosErpPlanTurnoverLogisticsQueryListForSku();
    logisticMethodList.value = res.planTurnOverLogisticsList;
  };
  const detailDialogRef = ref();
  const importDialogRef = ref();
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      detailDialogRef.value?.open(row);
    }
  };
  const exportLoading = ref(false);
  const downloadTemplate = async () => {
    exportLoading.value = true;
    const res = await erpApi.luteosErpSpSkuConfigDownTemplate({ ...search }).finally(() => {
      exportLoading.value = false;
    });
    urlDownload(res);
  };
  onMounted(async () => {
    getLogisticMethodList();
    getCreatorList();
  });
</script>

<style scoped lang="scss"></style>
