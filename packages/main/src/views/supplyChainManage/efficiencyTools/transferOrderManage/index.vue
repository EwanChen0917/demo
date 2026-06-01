<template>
  <el-tabs v-model="tabStatus" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane label="待审核" :name="0" />
    <el-tab-pane label="已审核" :name="1" />
  </el-tabs>

  <KeenList
    @refresh="refreshList"
    @reset-search="
      () => {
        time = [];
        resetSearch();
      }
    "
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.supplySkus"
        placeholder="供应链SKU,批量搜索请用空格或‘,’隔开"
        v-show="tabStatus === 0"
      />
      <el-input
        style="width: 324px"
        v-model="search[searchType]"
        placeholder="批量搜索请用空格或‘,’隔开"
        clearable
        v-show="tabStatus === 1"
      >
        <template #prepend>
          <el-select v-model="searchType" style="width: 122px">
            <el-option
              v-for="option in searchTypeMaps"
              :value="option.value"
              :label="option.label"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </template>
    <template #filters>
      <WarehouseSelect
        style="width: 150px"
        placeholder="调出仓"
        v-model="search.outWarehouseIdList"
        clearable
        multiple
        :teleported="true"
      />
      <WarehouseSelect
        style="width: 150px"
        placeholder="调入仓"
        v-model="search.toWarehouseList"
        clearable
        multiple
        :teleported="true"
      />
      <el-select
        v-if="tabStatus === 1"
        v-model="search.createStatus"
        placeholder="调拨单创建状态"
        style="width: 135px"
        clearable
        :empty-values="[null, undefined]"
        :value-on-clear="null"
      >
        <el-option label="创建成功" :value="1" />
        <el-option label="创建失败" :value="0" />
        <el-option label="空" value="" />
      </el-select>
      <TransportSelect
        v-model="search.transportId"
        :query-source="true"
        :style="{ width: tabStatus === 0 ? '160px' : '100px' }"
        :placeholder="tabStatus === 0 ? '确认物流方式' : '物流方式'"
        clearable
      />
      <el-date-picker
        v-model="time"
        type="datetimerange"
        value-format="YYYY-MM-DD HH:mm:ss"
        range-separator="-"
        start-placeholder="导入开始时间"
        end-placeholder="导入结束时间"
        @change="onTimeChange"
        style="width: 367px"
      />
      <el-select
        class="creator"
        v-model="search.creatorList"
        placeholder="导入人"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :options="creatorList"
      />
      <el-select
        class="creator"
        v-model="search.reviewerList"
        placeholder="审核人"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :options="creatorList"
        v-if="tabStatus === 1"
      />

      <el-input
        v-model="search.remark"
        placeholder="备注"
        style="width: 120px"
        v-if="tabStatus === 1"
      />
      <el-input
        v-model="search.shipmentIds"
        placeholder="货件号"
        style="width: 120px"
        v-if="tabStatus === 0"
      />
    </template>
    <template #more-filter>
      <DeptMember v-model="search.planner" placeholder="计划员" clearable />
      <DeptMember v-model="search.operator" placeholder="运营" clearable />
      <CountrySelect v-model="search.country" clearable placeholder="国家" />
      <el-select v-model="search.directDelivery" placeholder="直发标识" clearable>
        <el-option label="工厂直发" :value="0" />
        <el-option label="中仓" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <ExportBtn :service="erpApi.luteosErpOrderTransferExportFile" :params="exportParams">
        导出
      </ExportBtn>
      <div style="display: flex; gap: 10px">
        <el-button
          type="primary"
          @click="importRef.open()"
          v-permission="'waitAuditOrderImport'"
          v-if="tabStatus === 0"
        >
          导入
        </el-button>

        <el-button
          type="primary"
          @click="handleBatch('changeTransport')"
          v-permission="'waitAuditOrderUpdateTransport'"
          v-if="tabStatus === 0"
          :disabled="!totalList?.length"
        >
          批量修改物流方式
        </el-button>
        <el-button
          type="primary"
          @click="handleBatch('audit')"
          v-permission="'waitAuditOrderToAudit'"
          v-if="tabStatus === 0"
          :disabled="!totalList?.length"
        >
          批量审核
        </el-button>
        <el-button
          type="primary"
          @click="handleBatch('del')"
          v-permission="'waitAuditOrderDelete'"
          v-if="tabStatus === 0"
          :disabled="!totalList?.length"
        >
          批量删除
        </el-button>
      </div>
      <div style="display: flex; gap: 10px" v-if="tabStatus === 1">
        <el-button
          type="primary"
          @click="handleBatchAction('batchWait', '批量转待审核')"
          :disabled="!totalList?.length"
          :loading="loadingMap.batchWait"
          v-permission="'auditOrderToWaitAudit'"
        >
          批量转待审核
        </el-button>
        <el-button
          type="primary"
          @click="handleBatchAction('batchGroup', '批量维护调拨分组号')"
          :disabled="!totalList?.length"
          :loading="loadingMap.batchGroup"
          v-permission="'auditOrderUpdateGroupCode'"
        >
          批量维护调拨分组号
        </el-button>
        <el-button
          type="primary"
          @click="handleBatchAction('batchAutoCreate', '自动创建调拨单')"
          :disabled="!totalList?.length"
          :loading="loadingMap.batchAutoCreate"
          v-permission="'auditOrderAutoCreate'"
        >
          自动创建调拨单
        </el-button>
      </div>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
      max-height="600px"
      :row-key="(row) => row.transferId"
    >
      <el-table-column v-for="item in columns" v-bind="item" :key="item.prop">
        <template #default="{ row }">
          <component :is="item.slot" :row="row" :tabStatus="tabStatus">
            <template
              v-if="row.isEditing && ['transportName', 'transportNameReviewed'].includes(item.slot)"
            >
              <TransportSelect
                v-model="row.transportName"
                querySource
                clearable
                teleported
                style="max-width: 100%"
                @change-with-label="(val) => handleSave(row, val, 'transportName')"
              />
            </template>
            <template
              v-else-if="row.isEditing && ['quantity', 'quantityReviewed'].includes(item.slot)"
            >
              <el-input-number
                v-model="row.quantity"
                :controls="false"
                :min="0"
                :precision="0"
                style="width: 100%"
                @blur="(val) => handleSave(row, val, 'quantity')"
              />
            </template>
            <template
              v-else-if="
                row.isEditing && ['toWarehouseReviewed'].includes(item.slot) && tabStatus === 1
              "
            >
              <WarehouseSelect
                v-model="row.toWarehouseId"
                :disabled="!row.parentTransferId"
                clearable
                teleported
                style="max-width: 100%"
                @change-with-label="(val) => handleSave(row, val, 'toWarehouseId')"
              />
            </template>
            <template v-else-if="['remark'].includes(item.slot)">
              <div class="order-remark">
                <OverflowTooltip :content="row?.remark" :line="2" />
                <i
                  v-if="tabStatus === 0 || (tabStatus === 1 && row.createStatus !== 1)"
                  class="iconfont icon-bianji"
                  @click="
                    (e) => {
                      handleRemark(e, row);
                    }
                  "
                ></i>
              </div>
            </template>
            <template v-else-if="['directDelivery'].includes(item.slot)">
              <span>{{ row[item.prop] ? '中仓' : '工厂直发' }}</span>
            </template>
            <!-- approvalStatus -->
            <template v-else-if="item.slot === 'approvalStatus'">
              <span>{{ row[item.prop] ? '已审核' : '待审核' }}</span>
            </template>
            <!-- createStatus -->
            <template v-else-if="item.slot === 'createStatus'">
              <span>{{ row[item.prop] ? '创建成功' : '创建失败' }}</span>
            </template>
            <template v-else>
              <span>{{ row[item.prop] }}</span>
            </template>
          </component>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: row.isEditing ? '取消' : '编辑',
                key: 'edit',
                type: 'primary',
                row,
                hide: row.createStatus || row.groupCode,
                permissionCode: tabStatus ? 'auditOrderEdit' : 'waitAuditOrderEdit',
              },
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                row,
                hide: !tabStatus || row.createStatus || row.parentTransferId || row.groupCode, // 调拨单创建状态为“空、创建失败”&&非复制数据能复制
                permissionCode: 'auditOrderCopy',
              },
              {
                label: '删除',
                key: 'delete',
                type: 'primary',
                row,
                hide: !tabStatus || row.createStatus || !row.parentTransferId || row.groupCode, // 调拨单创建状态为“空、创建失败”&&非复制数据能编辑
                permissionCode: 'auditOrderDelete',
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
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
  </KeenList>
  <Log ref="logRef" />
  <ImportDialog ref="importRef" @success="runQuery" />
  <ChangeTransport ref="changeTransportRef" @update-transport="runQuery" />
  <CopyDialog ref="copyRef" @success="runQuery" />
  <div class="remark-popover">
    <header class="header">备注</header>
    <el-input v-model="remark" type="textarea" :rows="6" />
    <footer class="footer">
      <el-button size="small" v-if="remark" class="left" @click.stop="remark = ''">清空</el-button>
      <el-space :size="8">
        <el-button size="small" @click="hidePopovers">取消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleSaveRemark(remarkRow)"
          :loading="saveRemarkLoading"
        >
          确定
        </el-button>
      </el-space>
    </footer>
  </div>
</template>

<script lang="ts" setup name="transferOrderManage">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, memberApi } from '@/api';
  import * as swal from '@/utils/swal';
  import TransportSelect from '@/views/supplyChainManage/efficiencyTools/logisticsChannel/components/TransportSelect.vue';
  import { pick } from 'lodash-es';
  import dayjs from 'dayjs';
  import Log from './components/log.vue';
  import WarehouseSelect from './components/warehouseSelect.vue';
  import ImportDialog from './components/importDialog.vue';
  import ChangeTransport from './components/changeTransport.vue';
  import CopyDialog from './components/copyDialog.vue';
  import { useTransferRowSave, useTableSelection } from './hooks/useTransferCommon';
  import { getColumns } from './columns';

  const searchTypeMaps = [
    { value: 'groupCodes', label: '调拨分组号' },
    { value: 'thirdCodes', label: '积加调拨单号' },
    { value: 'supplySkus', label: '供应链SKU' },
    { value: 'shipmentIds', label: '货件号' },
  ];

  const columns = computed(() => getColumns({ tabStatus: tabStatus.value }));
  const exportParams = computed(() => {
    return {
      ...search,
      transferIdList: totalList.value?.map((item) => item.transferId) || [],
    };
  });
  // 备注
  const remark = ref();
  const remarkRow = ref();
  const hidePopovers = () => {
    const remarkPopover = document.querySelector('.remark-popover');
    if (!remarkPopover) return;
    remarkPopover.style.display = 'none';
  };
  const handleRemark = (e, row) => {
    remarkRow.value = row;
    remark.value = row?.remark;
    const remarkPopover = document.querySelector('.remark-popover');
    if (!remarkPopover) return;

    // 设置基本样式
    remarkPopover.style.position = 'absolute';
    remarkPopover.style.zIndex = '9999';
    remarkPopover.style.display = 'block';

    // 获取点击元素的位置
    const targetRect = e.target.getBoundingClientRect();

    // 设置 popover 显示在点击元素右侧
    const left = targetRect.right + 9; // 右边距 10px
    const top = targetRect.top - 200; // 对齐顶部

    remarkPopover.style.left = `${left - 310}px`;
    remarkPopover.style.top = `${top}px`;
  };

  const saveRemarkLoading = ref(false);
  const handleSaveRemark = async (row) => {
    if (!remark.value) {
      ElMessage.warning('请输入备注');
      return;
    }
    try {
      // console.log(row, remark.value);
      row.remark = remark.value;
      saveRemarkLoading.value = true;
      await handleSave(row, remark.value, 'remark');
      // ElMessage.success('备注成功');
      // row.remarkList?.unshift({ remark: remark.value });
      hidePopovers();
    } finally {
      saveRemarkLoading.value = false;
    }
  };

  const tabStatus = ref(0);
  const time = ref([]);
  const searchType = ref('groupCodes');

  const dickbook: any = ref({
    memberList: [],
  });
  const initDickbook = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    dickbook.value.memberList = res.all_dept;
  };
  const creatorList: any = ref([]);
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
  // 页面点击隐藏弹出层
  const handleClickOutside = (e) => {
    const remarkPopover = document.querySelector('.remark-popover');
    const isClickInsideRemark = remarkPopover?.contains(e.target);
    // 如果点击的是 popover 外部，则隐藏
    if (!isClickInsideRemark && !e.target.closest('.icon-bianji')) {
      hidePopovers();
    }
  };
  onMounted(() => {
    getCreatorList();
    initDickbook();
    // document.addEventListener('click', handleClickOutside);
  });
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const copyRef = ref();
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
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpDeliveryOrderQueryList.RequestQuery,
    ErpApi.LuteosErpDeliveryOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      groupCodes: undefined,
      thirdCodes: undefined,
      supplySkus: undefined,
      outWarehouseId: undefined,
      outWarehouseIdList: undefined,
      toWarehouseId: undefined,
      toWarehouseList: undefined,
      approvalStatus: undefined,
      createStatus: undefined,
      planner: undefined,
      operator: undefined,
      country: undefined,
      transportId: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      directDelivery: undefined,
      // shipmentId: undefined,
      remark: undefined,
      creatorList: [],
      reviewerList: [],
      shipmentIds: undefined,
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value] && tabStatus.value) {
        searchTypeMaps.forEach((item) => {
          if (item.value !== searchType.value) {
            data[item.value] = undefined;
          }
        });
      }
      return {
        ...pick(data, [
          tabStatus.value ? [searchType.value] : 'supplySkus',
          'outWarehouseId',
          'toWarehouseId',
          'toWarehouseList',
          'outWarehouseIdList',
          'creatorList',
          'reviewerList',
          'remark',
          'planner',
          'operator',
          'country',
          'transportId',
          'createTimeStart',
          'createTimeEnd',
          'directDelivery',
          'createStatus',
          'shipmentIds',
        ]),
        approvalStatus: tabStatus.value,
      };
    },
    service: erpApi.luteosErpOrderTransferQueryList,
  });

  const { handleSave } = useTransferRowSave({ listData, runQuery, successMessage: '保存成功' });

  const { selectedRows: totalList, onSelectionChange: handleSelectionChange } = useTableSelection();

  const handleTabChange = (newTab: number) => {
    // 重置搜索条件
    tabStatus.value = newTab;
    time.value = [];
    for (const key in search) {
      if (key !== 'approvalStatus') {
        search[key] = undefined;
      }
      if (key === 'approvalStatus') {
        search[key] = newTab;
      }
    }
  };
  const onTimeChange = (dateArr) => {
    search.createTimeStart = dateArr?.[0] ? dateArr[0] : '';
    search.createTimeEnd = dateArr?.[1]
      ? dayjs(dateArr[1]).endOf('date').format('YYYY-MM-DD HH:mm:ss')
      : '';
  };
  const importRef = ref();
  const logRef = ref();
  const changeTransportRef = ref();

  // 批量操作
  const handleBatch = async (type) => {
    if (!totalList.value?.length) {
      ElMessage.warning('请选择数据');
      return;
    }
    switch (type) {
      case 'changeTransport':
        changeTransportRef.value?.open(totalList.value);
        break;
      case 'audit':
        try {
          await erpApi.luteosErpOrderTransferUpdateApprovalStatus(
            totalList.value.map((item) => {
              return {
                approvalStatus: 1,
                transferId: item.transferId,
                channel: item.channel,
              };
            })
          );
          ElMessage.success('操作成功');
          runQuery();
        } catch (error) {}

        break;
      case 'del':
        const isConfirmed = await swal.confirm('确定要删除吗？');
        if (!isConfirmed) return;
        try {
          await erpApi.luteosErpOrderTransferDelete({
            transferIdList: totalList.value.map((item) => item.transferId),
          });
          ElMessage.success('删除成功');
          runQuery();
        } catch (error) {}

        break;
      default:
        break;
    }
  };

  const loadingMap = {
    batchWait: false,
    batchGroup: false,
    batchAutoCreate: false,
  };
  const handleBatchAction = async (type, cn) => {
    if (!totalList.value?.length) {
      ElMessage.warning('请选择数据');
      return;
    }

    switch (cn) {
      case '批量转待审核':
        if (totalList.value.some((item) => item.createStatus || item.groupCode || item.isEdit)) {
          // isEdit 数据是否修改过
          ElMessage.warning('创建成功、调拨单分组号不为空、已修改过的数据不能转待审核');
          return;
        }
        const isConfirmReturn = await swal.confirm(`确定要${cn}吗？`);
        if (!isConfirmReturn) return;
        const auditparams = totalList.value.map((item) => {
          return {
            approvalStatus: 0,
            transferId: item.transferId,
          };
        });
        try {
          loadingMap[type] = true;
          await erpApi.luteosErpOrderTransferUpdateApprovalStatus(auditparams);
          ElMessage.success('操作成功');
          runQuery();
        } finally {
          loadingMap[type] = false;
        }
        break;
      case '批量维护调拨分组号':
        if (totalList.value.some((item) => item.groupCode || [0, 1].includes(item.createStatus))) {
          ElMessage.warning('创建成功、调拨单分组号不为空的数据不可操作');
          return;
        }
        const isConfirmeGroup = await swal.confirm(`确定要${cn}吗？`);
        if (!isConfirmeGroup) return;

        const groupParams = totalList.value.map((item) => {
          return {
            groupCode: item.groupCode,
            transferId: item.transferId,
          };
        });
        try {
          loadingMap[type] = true;
          await erpApi.luteosErpOrderTransferUpdateGroupCode(groupParams);
          ElMessage.success('操作成功');
          runQuery();
        } finally {
          loadingMap[type] = false;
        }
        break;
      case '自动创建调拨单':
        if (totalList.value.some((item) => item.createStatus || !item.groupCode)) {
          ElMessage.warning('创建成功、调拨分组号为空的数据不能自动创建调拨单');
          return;
        }
        const isConfirmeAuto = await swal.confirm(`确定要${cn}吗？`);
        if (!isConfirmeAuto) return;
        try {
          loadingMap[type] = true;
          await erpApi.luteosErpOrderTransferCreateThirdCode(totalList.value);
          ElMessage.success('操作成功');
          runQuery();
        } finally {
          loadingMap[type] = false;
        }
        break;
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    console.log(row, row.createStatus);
    switch (key) {
      case 'copy':
        if (row.createStatus) {
          ElMessage.warning('调拨单创建状态为“创建成功”不能复制');
          return;
        }
        copyRef.value?.open(row);
        break;
      case 'edit':
        // 编辑当前行数据
        if (row.isEditing) {
          runQuery(); // 保存编辑数据
        } else {
          row.isEditing = true; // 进入编辑状态
        }
        break;
      case 'log':
        // 查看日志
        logRef.value?.open(row?.transferId);
        break;
      case 'delete':
        // 删除当前行数据
        const isConfirmed = await swal.confirm('确定要删除吗？');
        if (!isConfirmed) return;
        try {
          await erpApi.luteosErpOrderTransferDelete({
            transferIdList: [row.transferId],
          });
          ElMessage.success('删除成功');
          runQuery();
        } catch (error) {}
        break;
      default:
        break;
    }
  };
</script>

<style lang="scss">
  :global(.keen-ui .creator.lt-multi-select) {
    width: auto !important;
    min-width: 85px !important;
  }
  :global(.keen-ui .creator.lt-multi-select .el-tag) {
    max-width: 180px !important;
  }

  // .select-prepend {
  //   .el-select__wrapper.is-hovering:not(.is-focused) {
  //     box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
  //       -1px -1px 0 0 var(--el-border-color) inset;
  //   }
  //   .left {
  //     .el-select__wrapper {
  //       border-radius: 6px 0 0 6px;
  //       box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
  //         0 -1px 0 0 var(--el-border-color) inset;
  //     }
  //   }
  //   .right {
  //     .el-select__wrapper {
  //       border-radius: 0 6px 6px 0 !important;
  //       box-shadow: 1px 0 0 0 var(--el-border-color) inset,
  //         -1px 1px 0 0 var(--el-border-color) inset, 0 -1px 0 0 var(--el-border-color) inset;
  //     }
  //   }
  // }
</style>

<style scoped lang="scss">
  .order-remark {
    display: flex;
    // margin-left: 46px;
  }
  .item-label {
    flex-shrink: 0;
    color: #999999;
  }
  .icon-bianji {
    margin-left: 4px;
    font-size: 12px;
    cursor: pointer;
    color: #999999;

    &:hover {
      color: var(--el-color-primary);
    }
  }
  .remark-popover {
    width: 282px;
    padding: 12px 16px 10px 16px;
    background: #ffffff;
    display: none;
    border-radius: 6px;
    border: none;
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);

    .header {
      font-family: 'PingFang SC Medium';
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #1f1f1f;
      margin-bottom: 10px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;

      .left {
        margin-right: auto;
      }
    }
  }
</style>
