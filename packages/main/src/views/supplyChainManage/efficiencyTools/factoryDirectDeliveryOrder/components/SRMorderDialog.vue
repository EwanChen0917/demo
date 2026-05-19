<template>
  <el-dialog
    title="选择送货单"
    destroy-on-close
    v-model="visible"
    width="1400px"
    open="open"
    @close="closeDialog"
  >
    <keenList
      @refresh="refreshList"
      @reset-search="resetData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input :model-value="supplierName" disabled placeholder="供应商名称" />
      </template>
      <template #filters>
        <el-input disabled placeholder="待计划确认" style="width: 150px" />
        <el-input
          v-model="search.deliveryBillCode"
          placeholder="请输入送货单号"
          clearable
          style="width: 200px"
        />
        <el-input
          v-model="search.projectLeader"
          placeholder="请输入计划负责人"
          clearable
          style="width: 200px"
        />
        <!-- <DeptMember ref="auditCodeSelectRef" v-model="search.projectLeader" placeholder="请选择计划负责人" /> -->
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="b2bdate"
          clearable
          style="width: 300px"
        />
      </template>
      <el-table
        :data="listData?.recordList"
        :row-key="(row) => row.deliveryBillCode"
        ref="srmOrderTableRef"
        @selection-change="handleSelectionChange"
        max-height="300px"
      >
        <el-table-column
          type="selection"
          width="50"
          :reserve-selection="true"
          :selectable="isRowSelectable"
        />
        <el-table-column prop="deliveryBillCode" label="送货单号" min-width="150" />
        <el-table-column prop="storageLocationName" label="库存地点" min-width="150">
          <template #default="{ row }">
            <span v-if="row.storageLocationName === '供应链公司出口退税仓'">
              供应链公司供应商虚拟仓
            </span>
            <span v-else-if="row.storageLocationName === '海南路特出口退税仓'">
              海南路特供应商虚拟仓
            </span>
            <span v-else>{{ row.storageLocationName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商名称" min-width="150" />
        <el-table-column prop="deliveryTime" label="发货时间" min-width="100" />
        <el-table-column prop="estimatedArrivalTime" label="计划到货日期" min-width="150" />
        <el-table-column label="单据状态" prop="statusName" min-width="100" />
        <el-table-column prop="projectLeader" label="计划负责人" min-width="100" />
        <el-table-column prop="supplierRemark" label="供方备注" min-width="150">
          <template #default="{ row }">
            <OverflowTooltip :content="row.supplierRemark || '-'" :line="2" />
          </template>
        </el-table-column>
        <el-table-column prop="factoryWorkCode" label="关联工厂直发工单" min-width="200">
          <template #default="{ row }">
            <OverflowTooltip :content="row.factoryWorkCode || '-'" :line="2" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="100" />
      </el-table>
    </keenList>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { nextTick, watch } from 'vue';
  import useList from '@/hooks/list/useList';
  import { ElMessage, ElTable } from 'element-plus';
  import { omsApi, OmsApi } from '@/api';
  import { DirectFactoryWorkOrderDelivery } from '..';

  defineOptions({
    inheritAttrs: false,
  });
  interface Props {
    confirmData?: DirectFactoryWorkOrderDelivery[];
    supplierCode?: string;
    code?: string; // 工厂直发单号
    mode?: 'detail' | 'edit' | 'add'; // 页面模式
    supplierName?: string;
    modelValue?: boolean;
  }
  interface Emits {
    (e: 'success', data: any[]): void;
    (e: 'close'): void;
    (e: 'update:modelValue', value: boolean): void;
  }
  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const visible = computed({
    get: () => props.modelValue || false,
    set: (val) => emit('update:modelValue', val),
  });
  const srmOrderTableRef = ref<InstanceType<typeof ElTable>>();
  // 本地选中列表（跨页保存）
  const selectedRows = ref<any[]>([]);

  // 日期格式化函数：将 Date 对象转换为 yyyy-mm-dd 格式
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 日期解析函数：将 yyyy-mm-dd 格式转换为 Date 对象
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr || !dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // 使用 computed 实现日期范围的双向绑定
  const time = computed<[Date, Date] | null>({
    get() {
      // 从 search 中读取日期，转换为 Date 数组
      if (search.createTimeStart && search.createTimeEnd) {
        const startDate = parseDate(search.createTimeStart);
        const endDate = parseDate(search.createTimeEnd);
        if (startDate && endDate) {
          return [startDate, endDate];
        }
      }
      return null;
    },
    set(value) {
      // 将日期范围转换为 yyyy-mm-dd 格式，赋值给 search
      if (value && Array.isArray(value) && value.length === 2) {
        search.createTimeStart = formatDate(value[0]);
        search.createTimeEnd = formatDate(value[1]);
      } else {
        // 清空时
        search.createTimeStart = undefined;
        search.createTimeEnd = undefined;
      }
    },
  });
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
    // listLoading,
    refreshList,
    resetSearch,
    // runQuery,
  } = useList<
    OmsApi.OmsDirectFactoryWorkOrderQueryDeliveryList.RequestBody,
    OmsApi.OmsDirectFactoryWorkOrderQueryDeliveryList.ResponseBody
  >({
    searchDefaults: {
      deliveryBillCode: undefined,
      supplierCode: props.supplierCode,
      createTimeEnd: undefined,
      createTimeStart: undefined,
      projectLeader: undefined,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsDirectFactoryWorkOrderQueryDeliveryList,
  });
  const open = () => {
    visible.value = true;
  };
  const resetData = () => {
    resetSearch();
    search.supplierCode = props.supplierCode;
  };
  watch(
    () => listData,
    (newV) => {
      if (newV && newV?.value?.recordList && newV?.value?.recordList?.length) {
        selectedRowsReview();
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  /**
   * 处理表格选中变化（支持跨页选择）
   * @param selection 当前页选中的行
   */
  const handleSelectionChange = (_selection: any) => {
    if (!srmOrderTableRef.value) return;
    selectedRows.value = _selection;
  };

  /**
   * 行是否可选：有关联的工厂直发工单则禁止选中
   */
  const isRowSelectable = (row: any) => {
    if (props.code === row?.factoryWorkCode && props.mode === 'edit') {
      return true;
    }

    return !(row?.factoryWorkCode && String(row.factoryWorkCode).trim());

    // 有关联工厂直发工单（factoryWorkCode 有值）则不可选
  };
  /**
   * 控制回显（根据本地选中列表回显当前页）
   */
  const selectedRowsReview = async () => {
    await nextTick();
    if (!srmOrderTableRef.value) return;
    // 清空当前页的选中状态
    // srmOrderTableRef.value.clearSelection();
    if (!selectedRows.value) return;
    selectedRows.value?.forEach((rowItem: any) => {
      if (!srmOrderTableRef.value) return;
      srmOrderTableRef.value.toggleRowSelection(rowItem, true);
    });
  };
  /**
   * 提交行为（使用本地选中列表）
   */
  const confirm = () => {
    if (!selectedRows.value?.length) return ElMessage.warning('请选择送货单');
    // 校验库存地点是否一致：过滤出有库存地点的行
    const rowsWithLocation = selectedRows.value.filter(
      (row) => row.storageLocationName && row.storageLocationName.trim() !== ''
    );

    // 如果有库存地点的行数量大于1，需要校验是否一致
    if (rowsWithLocation.length > 1) {
      // 获取第一个有库存地点的值作为基准
      const firstLocation = rowsWithLocation[0].storageLocationName;
      // 检查是否所有有库存地点的行都一致
      const isAllSame = rowsWithLocation.every((row) => row.storageLocationName === firstLocation);

      if (!isAllSame) {
        ElMessage.warning('所选送货单的库存地点不一致，请重新选择');
        return;
      }
    }
    emit('success', selectedRows.value);
    visible.value = false;
  };

  watch(
    visible,
    (newV) => {
      if (newV) {
        // 打开弹窗时，初始化本地选中列表
        if (props.confirmData?.length) {
          selectedRows.value = [...props.confirmData];
        } else {
          selectedRows.value = [];
        }
      }
    },
    {
      immediate: true,
    }
  );
  const closeDialog = () => {
    resetData();
    selectedRows.value = []; // 清空本地选中列表
    visible.value = false;
    emit('close');
  };
  defineExpose({
    open,
    confirm,
  });
</script>

<style lang="scss"></style>
