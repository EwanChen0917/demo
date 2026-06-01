<template>
  <el-dialog
    title="关联发货指令"
    :model-value="visible"
    @close="$emit('close')"
    width="75%"
    align-center
  >
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          placeholder="发货指令单号/商品名称/产品SKU"
          v-model="search.keyword"
          class="w-275px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          style="width: 120px"
          placeholder="计划"
          v-model="search.plannerCode"
          filterable
          clearable
        >
          <el-option
            v-for="item in planerList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
        <el-select
          style="width: 120px"
          placeholder="发货方式"
          v-model="search.shipMethod"
          :disabled="shipMethodDisabled"
        >
          <el-option label="中仓发货" value="1" />
          <el-option label="工厂直发" value="2" />
        </el-select>
        <el-date-picker
          class="w-100"
          v-model="time"
          type="daterange"
          range-separator="-"
          start-placeholder="预计发货开始时间"
          end-placeholder="预计发货结束时间"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleTimeChange"
        />
      </template>
      <!-- <template #buttons>
        <el-button type="primary" @click="runQuery">查询</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </template> -->
      <vxe-table
        v-loading="listLoading"
        max-height="400px"
        ref="tableRef"
        border="inner"
        :data="listData?.recordList"
        row-id="commandCode"
        :checkbox-config="{ reserve: true }"
        @checkbox-change="handleSelectionChange"
        @checkbox-all="handleSelectionChange"
      >
        <vxe-column type="checkbox" width="60" />
        <vxe-column field="commandCode" title="发货指令单号" />
        <vxe-column field="skuCode" title="产品SKU" />
        <vxe-column field="productName" title="商品名称" />
        <vxe-column field="estimateQty" title="预计发货数量" />
        <vxe-column field="estimateShipDate" title="预计发货时间" />
        <vxe-column field="shipMethodDesc" title="发货方式" />
        <vxe-column field="planer" title="计划" />
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
    <template #footer>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi, memberApi } from '@/api';
  import { PlanShipCommandItem } from '@/api/erp/data-contracts';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    /** 是否可见 */
    visible: boolean;
    selectedRows?: PlanShipCommandItem[];
  }>();
  const tableRef = ref();

  const selectedCommand = ref([]);
  watch(
    () => props.visible,
    () => {
      if (props.visible) {
        tableRef.value?.clearCheckboxRow();
        tableRef.value?.clearCheckboxReserve();
        props.selectedRows?.forEach((item) => {
          tableRef.value.setCheckboxRow(item, true);
        });
        selectedCommand.value = tableRef.value
          ?.getCheckboxRecords()
          ?.concat(tableRef.value.getCheckboxReserveRecords());
      }
    }
  );
  const shipMethodDisabled = computed(
    () => props.selectedRows?.length > 0 && selectedCommand.value?.length > 0
  );

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

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
    ErpApi.LuteosErpPlanShipCommandV2QueryList.RequestQuery,
    ErpApi.LuteosErpPlanShipCommandV2QueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      plannerCode: '',
      shipMethod: props.selectedRows?.length > 0 ? props.selectedRows[0]?.shipMethod : '1',
      waitPick: true,
      estimateShipTimeStart: undefined,
      estimateShipTimeEnd: undefined,
    },

    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanShipCommandV2QueryList,
  });

  const time = ref();
  const handleTimeChange = (val) => {
    if (val) {
      search.estimateShipTimeStart = val[0] || '';
      search.estimateShipTimeEnd = val[1] || '';
    } else {
      search.estimateShipTimeStart = undefined;
      search.estimateShipTimeEnd = undefined;
    }
  };
  const handleSelectionChange = () => {
    selectedCommand.value = tableRef.value
      .getCheckboxRecords()
      .concat(tableRef.value.getCheckboxReserveRecords());
  };

  const planerList = ref([]);
  const getPlanerList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_planer_dept'],
    });
    planerList.value = res.supply_planer_dept!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getPlanerList();
  const confirm = () => {
    if (selectedCommand.value?.length > 0) emit('close', true, selectedCommand.value);
    else ElMessage.warning('至少选择一条数据');
  };
</script>

<style scoped lang="scss"></style>
