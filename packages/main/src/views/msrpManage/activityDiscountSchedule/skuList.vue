<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.spuCode" clearable placeholder="SPU" class="me-2">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.skuCode" clearable placeholder="SKU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductChannelSelect v-model="search.channel" clearable />
      <CountrySelect v-model="search.countryCode" clearable />
      <el-select
        v-model="search.gtm"
        :options="productlineList"
        :props="{ label: 'name', value: 'gtmPlCode' }"
        placeholder="GTM品线"
        clearable
        filterable
      />
      <el-select
        v-model="search.approveStatus"
        :options="statusList"
        :props="{ label: 'label', value: 'value' }"
        placeholder="活动状态"
        clearable
        filterable
      />
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="请选择月份"
        format="YYYY-MM"
        value-format="YYYY-MM"
        :clearable="false"
        :editable="false"
        @change="changeMonth"
        :disabled-date="disabledDate"
      />
    </template>
    <template #buttons>
      <el-button
        type="primary"
        v-permission="'activityDiscountScheduleAdd'"
        @click="addDialogRef?.open('新增SKU')"
      >
        新增SKU
      </el-button>
      <el-button
        type="primary"
        v-permission="'activityDiscountScheduleImport'"
        @click="batchUpdateVisible = true"
      >
        导入活动
      </el-button>
      <el-button
        type="primary"
        v-permission="'activityDiscountScheduleAuditMore'"
        @click="batchUpdateVisibleReview = true"
      >
        批量审批
      </el-button>
      <ExportBtn
        v-permission="'activityDiscountScheduleExport'"
        :service="productApi.luteosProductPromotionPlanExportPromotionPlan"
        :params="{
          ...search,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-form
      v-loading="loading"
      ref="formRef"
      :model="listData"
      label-width="80px"
      label-position="left"
      scroll-to-error
    >
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        :span-method="handleSpanMethod"
        row-key="code"
        border
        class-name="table-row-dashed"
        :tree-props="{ children: 'skuPlanItemList' }"
      >
        <el-table-column label="SKU/产品名称" min-width="260" fixed="left">
          <template #default="{ row }">
            <GoodsInfo
              v-if="row?.skuCode"
              :title="row.skuCode"
              :subtitle="row.skuName"
              hide-image
            />
          </template>
        </el-table-column>
        <el-table-column label="SPU/产品名称" min-width="220" fixed="left">
          <template #default="{ row }">
            <GoodsInfo
              v-if="row?.spuName"
              :title="row.spuCode"
              :subtitle="row.spuName"
              hide-image
            />
          </template>
        </el-table-column>
        <el-table-column label="国家" prop="countryCode" width="90" />
        <el-table-column label="渠道" prop="channel" width="90" />
        <el-table-column label="GTM品线" prop="gtmName" min-width="120" />
        <el-table-column label="MSRP" prop="msrp" width="120">
          <template #default="{ row }">{{ row.msrp }} {{ row.currency }}</template>
        </el-table-column>
        <!--动态列-->
        <el-table-column
          :label="week.weekTag"
          v-for="(week, weekIdx) in weekActivityInfoList"
          :key="`week-${weekIdx}`"
          :colspan="week?.activityDaysInWeek"
          min-width="200"
        >
          <el-table-column
            :label="`${i}`"
            v-for="i in week?.activityDaysInWeek"
            :key="`week-${weekIdx}-${i}`"
            :width="week?.activityDaysInWeek === 1 ? 150 : 50"
            prop="weekActivityInfo"
          >
            <template #default="{ row }">
              <activityList
                :row="row"
                :weekInfo="getWeekInfo(row?.weekActivityInfoList, week.week, i)"
                @handleCommand="handleCommand"
                v-if="
                  getFirstWeek(
                    row?.weekActivityInfoList,
                    getWeekInfo(row?.weekActivityInfoList, week.week, i)
                  ) &&
                  (getStartDay(getWeekInfo(row?.weekActivityInfoList, week.week, i)?.startDate) ==
                    7 - week?.activityDaysInWeek + i ||
                    getStartDay(getWeekInfo(row?.weekActivityInfoList, week.week, i)?.startDate) ==
                      i) &&
                  getWeekInfo(row?.weekActivityInfoList, week.week, i)?.week == week.week
                "
              />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '审核',
                  key: 'approval',
                  type: 'primary',
                  row,
                  permissionCode: 'activityDiscountScheduleAudit',
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
    </el-form>
  </KeenList>
  <AddDialog ref="addDialogRef" @success="refreshList" />
  <ApprovalDialog ref="approvalDialogRef" @success="refreshList" />
  <BatchImportModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="promotion_plan_import"
    title="导入"
    importDesc="活动折扣计划"
    :isAsync="true"
    @close="batchUpdate"
  />
  <BatchImportModal
    v-if="batchUpdateVisibleReview"
    :visible="batchUpdateVisibleReview"
    importScene="promotion_plan_review_import"
    title="批量审核"
    importDesc="批量审核导入"
    :isAsync="true"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="activityDiscountSchedule">
  import useList from '@/hooks/list/useList';
  import { checkPermission } from '@/utils/permission';
  import { gtmApi, productApi, ProductApi } from '@/api';
  import AddDialog from '@/views/msrpManage/activityDiscountSchedule/components/addDialog.vue';
  import ApprovalDialog from '@/views/msrpManage/activityDiscountSchedule/components/approvalDialog.vue';
  import ActivityList from '@/views/msrpManage/activityDiscountSchedule/components/activityList.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import dayjs from 'dayjs';
  import { getFirstWeek, getStartDay, getWeekInfo } from './util';
  import { statusColorMap, statusList } from './enum';

  const disabledDate = (time: Date) => {
    const today = dayjs(new Date()).add(1, 'month').valueOf();
    // 禁用T+1之后月份
    if (time.getTime() > today) return true;

    return false;
  };
  const tableRef = ref();
  const PAGE_SIZE = 10;
  const loading = ref(false);
  const month = ref(dayjs(new Date()).add(1, 'month').format('YYYY-MM'));
  const weekActivityInfoList = ref();
  const getEndDate = (value) => {
    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    return value + '-' + new Date(year, month, 0).getDate();
  };
  const mergeRules = ref([]);
  const planCode = ref([]);
  const rowIndex = ref(0);
  const colspan = ref(6);
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
    ProductApi.LuteosProductPromotionPlanListBySku.RequestBody,
    ProductApi.LuteosProductPromotionPlanListBySku.ResponseBody
  >({
    searchDefaults: {
      approveStatus: undefined,
      channel: undefined,
      countryCode: undefined,
      endDate: getEndDate(dayjs(new Date()).add(1, 'month').format('YYYY-MM')),
      gtm: undefined,
      skuCode: undefined,
      spuCode: undefined,
      startDate: dayjs(new Date()).add(1, 'month').format('YYYY-MM') + '-01',
    },
    // eslint-disable-next-line no-shadow
    pageSize: PAGE_SIZE,
    service: async (params) => {
      const res = await productApi.luteosProductPromotionPlanListBySku(params);
      rowIndex.value = 0;
      mergeRules.value = [];
      planCode.value = [];
      res.recordList.forEach((row, index) => {
        rowIndex.value = index;
        if (index == 0) {
          weekActivityInfoList.value = row.weekActivityInfoList.filter(
            (item, index, self) => self.findIndex((i) => i.week === item.week) === index
          );
        }
        if (row.weekActivityInfoList) {
          colspan.value = 6;
          row.weekActivityInfoList.forEach((sku, s) => {
            if (sku.planCode && !planCode.value.includes(sku.planCode)) {
              let startDay = getStartDay(sku.startDate) - 1;
              if (sku.activityDaysInWeek < 7 && sku.week === 1) {
                startDay = startDay - (7 - sku.activityDaysInWeek);
              }
              const activityDays = sku.activityDays === 1 ? 2 : sku.activityDays; //一天的活动合并2天，解决一天的一个格子显示不全
              mergeRules.value.push({
                planCode: sku.planCode,
                activityName: sku.activityName,
                rowIndex: rowIndex.value, // 行
                startCol: colspan.value + startDay, // 合并起始列
                endCol: colspan.value + startDay + activityDays, // 合并结束列
                colspan: activityDays, // 合并结束列
              });
              planCode.value.push(sku.planCode);
            }
            if (sku.week !== row.weekActivityInfoList[s + 1]?.week) {
              colspan.value = colspan.value + sku.activityDaysInWeek;
            }
          });
        }
      });
      return res;
    },
  });

  const handleSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    // 获取当前行的合并规则
    const rule = mergeRules.value.find(
      (res) => rowIndex == res.rowIndex && columnIndex >= res.startCol && columnIndex < res.endCol
    );

    if (!rule) return { rowspan: 1, colspan: 1 };

    // 判断当前列是否在合并范围内
    if (columnIndex >= rule.startCol && columnIndex < rule.endCol && columnIndex < colspan.value) {
      // 起始列：合并colspan列，其余列隐藏（colspan=0）
      if (columnIndex === rule.startCol) {
        if (colspan.value < rule.endCol) {
          //活动被截取了，活动天数显示不全
          return { rowspan: 1, colspan: colspan.value - rule.startCol };
        } else {
          return { rowspan: 1, colspan: rule.colspan };
        }
      } else {
        return { rowspan: 1, colspan: 0 };
      }
    }
    // 不在合并范围的列：正常显示
    return { rowspan: 1, colspan: 1 };
  };
  const changeMonth = () => {
    search.startDate = month.value + '-01';
    search.endDate = getEndDate(month.value);
  };
  const resetSearchData = () => {
    month.value = dayjs(new Date()).add(1, 'month').format('YYYY-MM');
    resetSearch();
  };
  const addDialogRef = ref();
  const approvalDialogRef = ref();
  // 批量操作
  const handleCommand = async (command, row) => {
    if (command === 'delete') {
      const isConfirmed = await swal.confirm('确认删除当前活动吗？');
      if (isConfirmed) {
        const res = await productApi.luteosProductPromotionPlanDelete({
          confirm: false,
          planCode: row?.planCode,
        });
        if (res && res.constructor === Object) {
          if (res.confirm) {
            ElMessage.success('删除成功');
            refreshList();
          } else {
            const isConfirmed2 = await swal.confirm(res.message);
            if (isConfirmed2) {
              await productApi.luteosProductPromotionPlanDelete({
                confirm: true,
                planCode: row?.planCode,
              });
              ElMessage.success('删除成功');
              refreshList();
            }
          }
        }
      }
    } else if (command === 'detail') {
      addDialogRef.value.open('详情', row?.planCode);
    } else if (command === 'edit') {
      addDialogRef.value.open('修改活动', row);
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'approval') {
      approvalDialogRef.value.open({
        ...row,
        month: month.value,
        endDate: search.endDate,
        startDate: search.startDate,
      });
    }
  };

  // 导入
  const batchUpdateVisibleReview = ref<boolean>(false);
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisibleReview.value = false;
    batchUpdateVisible.value = false;
  };

  const productlineList = ref<any[]>([]);
  const queryProductlineList = async () => {
    const res = await gtmApi.luteosGtmPlQueryList({ pageNum: 1, pageSize: 100 });
    productlineList.value = res?.gtmPlList || [];
  };
  queryProductlineList();

  onActivated(() => {
    // tableRef.value?.clearSelection();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .el-input-group--append .el-input-group__append .el-select :deep(.el-select__wrapper) {
    box-shadow: none;
    min-height: 28px;
    padding: 2px 16px;
  }

  :deep(.el-table .custom-activity-cell .cell) {
    padding: 0 !important;
  }
  :deep(.el-table thead.is-group th.el-table__cell) {
    background: #fff;
  }
  :deep(.el-table thead.is-group tr:nth-child(2)) {
    display: none;
  }
</style>
