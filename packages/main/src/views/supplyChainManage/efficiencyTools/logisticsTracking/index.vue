<template>
  <div class="status-card d-flex flex-wrap gap-2">
    <div class="d-flex gap-2 card-row">
      <template v-for="(item, index) in statusMap" :key="item.key">
        <div class="card-item" v-if="index < 3" @click="search.shipStatus = item.key">
          <div class="card-item-title">
            <div class="d-flex align-items-center gap-1">
              <span>{{ item.label }}</span>
              <!--              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon size="16" color="var(&#45;&#45;el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>-->
            </div>
          </div>
          <div class="card-item-qty" :class="item.color">
            {{ listData?.statisticsInfo[item.count] }}
          </div>
          <div class="card-item-rate">占比 {{ listData?.statisticsInfo[item.rate] }}%</div>
        </div>
      </template>
    </div>
    <div class="d-flex gap-2 card-row">
      <template v-for="(item, index) in statusMap" :key="index">
        <div class="card-item" v-if="index > 2" @click="search.shipStatus = item.key">
          <div class="card-item-title">
            <div class="d-flex align-items-center gap-1">
              <span>{{ item.label }}</span>
              <!--              <el-tooltip :content="item.tooltip" placement="top">
                <el-icon size="16" color="var(&#45;&#45;el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>-->
            </div>
          </div>
          <div class="card-item-qty" :class="item.color">
            {{ listData?.statisticsInfo[item.count] }}
          </div>
          <div class="card-item-rate">占比 {{ listData?.statisticsInfo[item.rate] }}%</div>
        </div>
      </template>
      <!--      <div class="card-item" @click="search.status = undefined">
        <div class="card-item-title">全部</div>
        <div class="card-item-qty text-warning">{{ listData?.statisticsInfo?.allCount }}</div>
        <div class="card-item-rate">占比 {{ listData?.statisticsInfo?.allCountRatio }}%</div>
      </div>-->
    </div>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        style="width: 475px"
        placeholder="FBAID号/调拨单号/发货单号/跟踪单号/合同编号"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 120px"
        v-model="search.transportType"
        placeholder="物流方式"
        clearable
      >
        <el-option
          v-for="item in listData?.shippingTypeBeanList"
          :key="item.transportType"
          :label="item.transportTypeDesc"
          :value="item.transportType"
        />
      </el-select>
      <!-- <el-input style="width: 120px" v-model="search.shopName" placeholder="店铺" clearable /> -->
      <el-input
        style="width: 120px"
        v-model="search.arrivalWarehouse"
        placeholder="目的仓"
        clearable
      />
      <el-input
        style="width: 120px"
        v-model="search.logisticsProvider"
        placeholder="物流商"
        clearable
        v-if="!['物流货代'].includes(userInfo?.title)"
      />
      <el-input
        style="width: 120px"
        v-model="search.logisticsChannel"
        placeholder="物流渠道"
        clearable
      />
      <ProductChannelSelect style="width: 120px" v-model="search.channel" clearable />
      <ProductLineSelect
        style="width: 120px"
        v-model="search.productLine"
        placeholder="品线"
        clearable
      />
      <CountrySelect style="width: 120px" v-model="search.countryCode" clearable />
      <!--      <ProductChannelSelect v-model="search.channel" clearable />-->
      <el-date-picker
        style="width: 240px"
        v-model="search.shipTime"
        type="daterange"
        range-separator="-"
        start-placeholder="发货开始时间"
        end-placeholder="发货结束时间"
        value-format="YYYY-MM-DD"
      />
      <el-date-picker
        style="width: 240px"
        v-model="search.signTime"
        type="daterange"
        range-separator="-"
        start-placeholder="签收开始时间"
        end-placeholder="签收结束时间"
        value-format="YYYY-MM-DD"
      />
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        @click="addDialogRef?.open"
        v-permission="'logisticsTrackingAdd'"
      >
        新增
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="batchUpdateDialogRef.open()"
        v-permission="'logisticsTrackingAddBatch'"
      >
        批量新增
      </el-button>
      <!-- 批量删除 -->
      <el-button
        class="button"
        type="primary"
        @click="handleBatch('删除')"
        v-permission="'logisticsTrackingDel'"
      >
        批量删除
      </el-button>
      <el-button class="button" type="primary" @click="handleBatch('下载')">批量下载附件</el-button>
      <KeenFileUpload
        v-model="fileList"
        accept=".xlsx,.xls"
        :showOperate="false"
        :showFileList="false"
        @success="onUploadLogisticsDataSuccess"
        directory="erp/logisticsTracking"
        ref="uploadRef"
        class="upload-btn"
      >
        <el-button type="primary">上传物流数据</el-button>
      </KeenFileUpload>
      <el-button type="primary" @click="diffDialogRef?.open" v-permission="'logisticsTrackingDiff'">
        差异看板
      </el-button>

      <ExportBtn
        :service="erpApi.luteosErpV2FirstLogisticsExportList"
        :params="{
          ...omit(search, ['shipTime', 'signTime']),
          shipTimeStart: search.shipTime ? search.shipTime[0] : undefined,
          shipTimeEnd: search.shipTime ? search.shipTime[1] : undefined,
          signTimeStart: search.signTime ? search.signTime[0] : undefined,
          signTimeEnd: search.signTime ? search.signTime[1] : undefined,
        }"
        v-permission="'logisticsTrackingExport'"
      >
        导出
      </ExportBtn>
      <ExportBtn
        :service="erpApi.luteosErpV2FirstLogisticsExportMaintainData"
        :params="exportParams"
        v-permission="'logisticsTrackingExport'"
      >
        导出待维护数据
      </ExportBtn>
      <ExportBtn
        :service="erpApi.luteosErpV2FirstLogisticsExportActualDelay"
        :params="{
          ...omit(search, ['shipTime', 'signTime']),
          shipTimeStart: search.shipTime ? search.shipTime[0] : undefined,
          shipTimeEnd: search.shipTime ? search.shipTime[1] : undefined,
          signTimeStart: search.signTime ? search.signTime[0] : undefined,
          signTimeEnd: search.signTime ? search.signTime[1] : undefined,
        }"
        v-permission="'logisticsTrackingExport'"
      >
        导出日期延误数据
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column type="index" label="序号" fixed width="60" />
      <el-table-column prop="fbaId" label="FBAID号" width="120" fixed />
      <el-table-column prop="transferOrderNo" label="调拨单号" width="120" />
      <el-table-column prop="shippingOrderNo" label="发货单号" width="120" />
      <!-- <el-table-column prop="logisticsPlanNo" label="兴运计划单号" width="130" />
      <el-table-column prop="logisticsOrderNo" label="兴运物流单号" width="130" /> -->
      <el-table-column prop="channel" label="渠道" width="120" />
      <!--      <el-table-column prop="shopName" label="店铺" width="120" />-->
      <el-table-column prop="arrivalWarehouseName" label="目的仓" width="120" />
      <el-table-column prop="destinationCountry" label="目的地国家" width="100" />
      <el-table-column prop="shippingWeek" label="发货周" />
      <el-table-column prop="shippingDate" label="发货日期" width="120" />
      <el-table-column prop="receiptWeek" label="签收周" />
      <el-table-column prop="receiptDate" label="签收日期" width="120" />
      <el-table-column prop="referenceDuration" label="参考时效（天）" width="120" />
      <el-table-column prop="actualDuration" label="时效" />
      <el-table-column prop="isInspectedDesc" label="是否查验" />
      <el-table-column prop="isDelayDesc" label="是否延误" />
      <el-table-column prop="isDeliveryDelayDesc" label="是否递延" />
      <el-table-column prop="delayReason" label="查验类型、延误原因" width="160">
        <template #default="{ row }">
          <OverflowTooltip :content="row.delayReason" :line="1" />
        </template>
      </el-table-column>
      <el-table-column prop="vatNo" label="VAT号" width="120" />
      <el-table-column prop="ienNo" label="IEN" width="120" />
      <el-table-column prop="customsDuty" label="关税" width="120" />
      <el-table-column prop="valueAddedTax" label="增值税" width="120" />
      <el-table-column prop="logisticsProvider" label="物流商" width="120" />
      <el-table-column prop="transportTypeDesc" label="物流方式" width="120" />
      <el-table-column prop="transportChannel" label="物流渠道" width="120" />
      <el-table-column prop="fbaCreator" label="货件创建人" width="120" />
      <el-table-column prop="trackingNo" label="物流跟踪单号" width="140">
        <template #default="{ row }">
          <OverflowTooltip :content="row.trackingNo" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="transferInfo" label="转运详情">
        <template #default="{ row }">
          <OverflowTooltip :content="row.transferInfo" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="shipStatusDesc" label="物流状态" />
      <el-table-column prop="contractNo" label="合同编号" width="120" />
      <el-table-column prop="shippingFee" label="运费" />
      <el-table-column prop="unitPrice" label="单价" />
      <el-table-column prop="billingWeight" label="计费重量" />
      <el-table-column prop="latestReceiptDate" label="平台签收日期" width="120" />
      <el-table-column prop="latestReceiptQuantity" label="运营最新收货量" width="120" />
      <!-- 附件 -->
      <el-table-column prop="attachmentName" label="附件" width="140">
        <template #default="{ row }">
          <el-link
            class="file-link"
            type="primary"
            :underline="false"
            @click="download(row.attachmentUrl, row.attachmentName)"
          >
            <OverflowTooltip :content="row.attachmentName" :line="2" color="#02B96B" />
            <el-icon v-if="row.attachmentName" class="delete-icon" @click.stop="removeFile(row)">
              <Delete />
            </el-icon>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="160px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: 'logisticsTrackingEdit',
                row,
              },
              {
                label: 'sku明细',
                key: 'skuDetail',
                type: 'primary',
                permissionCode: 'logisticsTrackingSkuDetail',
                row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'primary',
                row,
                permissionCode: 'logisticsTrackingDel',
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                row,
              },
              {
                label: '上传',
                key: 'upload',
                type: 'primary',
                text: true,
                row: row,
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

  <LogDialog ref="logRef" />
  <RemindDialog ref="remindRef" />
  <AddDialog
    ref="addDialogRef"
    @success="refreshList"
    :shipping-type-bean-list="listData?.shippingTypeBeanList"
  />
  <EditDialog
    ref="editDialogRef"
    @success="refreshList"
    :shipping-type-bean-list="listData?.shippingTypeBeanList"
  />
  <SkuDialog ref="skuDialogRef" />
  <ImportUpdateDialog
    title="批量添加产品"
    type="batchUpdate"
    ref="batchUpdateDialogRef"
    @success="refreshList"
  />
  <DiffDialog
    ref="diffDialogRef"
    @success="refreshList"
    :shipping-type-bean-list="listData?.shippingTypeBeanList"
  />
  <KeenFileUpload
    v-model="fileList"
    accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
    :showOperate="false"
    :showFileList="false"
    @success="onUploadSuccess"
    directory="erp/logisticsTracking"
    ref="attachmentUploadRef"
  >
    <el-link type="primary" :underline="false" class="row-btn" />
  </KeenFileUpload>
</template>

<script setup lang="ts" name="logisticsTracking">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  // import LogDialog from '@/views/supplyChainManage/efficiencyTools/firstVessel/components/logDialog.vue';
  import RemindDialog from '@/views/supplyChainManage/efficiencyTools/firstVessel/components/remindDialog.vue';
  import AddDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/addDialog.vue';
  import EditDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/editDialog.vue';
  import { omit, pick } from 'lodash-es';
  import SkuDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/skuDialog.vue';
  import ImportUpdateDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/importUpdateDialog.vue';
  import DiffDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/diffDialog.vue';
  import dayjs from 'dayjs';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { download, urlDownload } from '@/utils/download';
  import { Delete } from '@element-plus/icons-vue';
  import LogDialog from './components/logDialog.vue';
  import { useStore } from '@/store/modules/useStore';

  const { userInfo } = useStore();
  const statusMap = [
    {
      key: 1,
      label: '正常在途',
      tooltip: '无出库时间，发货数量=0；且，预计出库时间≥更新时间',
      count: 'inWayCount',
      rate: 'inWayRatio',
      color: 'text-success',
    },
    {
      key: 2,
      label: '出口查验-未放行',
      tooltip:
        '有出库时间，0＜发货数＜计划数；且，【预计出库时间≥最新出库时间；预计出库时间≥更新时间】',
      count: 'unOutPassCount',
      rate: 'unOutPassRatio',
      color: 'text-warning',
    },
    {
      key: 3,
      label: '进口查验-未放行',
      tooltip:
        '有出库时间，0＜发货数＜计划数；且，【预计出库时间＜最新出库时间，或，预计出库时＜更新时间】',
      count: 'unInPassCount',
      rate: 'unInPassRatio',
      color: 'text-warning',
    },
    {
      key: 4,
      label: '已签收',
      tooltip: '无出库时间，发货数量=0；且，预计出库时间＜更新时间',
      count: 'receiveCount',
      rate: 'receiveRatio',
      color: 'text-success',
    },
    {
      key: 5,
      label: '延误风险',
      tooltip: '有出库时间，发货数≥计划数；且，【预计出库时间＜最新出库时间】',
      count: 'delayRiskCount',
      rate: 'delayRiskRatio',
      color: 'text-warning',
    },
    {
      key: 6,
      label: '丢件',
      tooltip: '有出库时间，发货数≥计划数；且，【预计出库时间≥最新出库时间】',
      count: 'loseCount',
      rate: 'loseRatio',
      color: 'text-danger',
    },
    /* {
    key: 7,
    label: '其他',
    tooltip: '无创建时间/配送方式/配送出库时效等单号',
    count: 'otherCount',
    rate: 'otherCountRatio',
    color: 'text-warning',
  }, */
  ];

  const PAGE_SIZE = 10;
  const tableRef = ref(null);
  const uploadRef = ref(null);
  const attachmentUploadRef = ref(null);
  const uploadRowFbaId = ref('');
  const fileList = ref<any[]>([]);
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
    ErpApi.LuteosErpFirstVesselTimelinessQueryList.RequestBody,
    ErpApi.LuteosErpFirstVesselTimelinessQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      // shopName: undefined,
      arrivalWarehouse: undefined,
      countryCode: undefined,
      logisticsProvider: undefined,
      channel: undefined,
      shipTime: [dayjs().startOf('year').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      shipTimeStart: undefined,
      shipTimeEnd: undefined,
      signTime: undefined,
      signTimeStart: undefined,
      signTimeEnd: undefined,
      shipStatus: undefined,
      shipMethod: undefined,
      logisticsChannel: undefined,
      productLine: undefined,
      transportType: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { shipTime, signTime } = searchData;
      return {
        ...omit(searchData, ['shipTime', 'signTime']),
        shipTimeStart: shipTime ? shipTime[0] : undefined,
        shipTimeEnd: shipTime ? shipTime[1] : undefined,
        signTimeStart: signTime ? signTime[0] : undefined,
        signTimeEnd: signTime ? signTime[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpV2FirstLogisticsQueryList,
  });

  const exportParams = computed(() => {
    return {
      ...omit(search, ['shipTime', 'signTime']),
      shipTimeStart: search.shipTime ? search.shipTime[0] : undefined,
      shipTimeEnd: search.shipTime ? search.shipTime[1] : undefined,
      signTimeStart: search.signTime ? search.signTime[0] : undefined,
      signTimeEnd: search.signTime ? search.signTime[1] : undefined,
    };
  });

  const addDialogRef = ref(null);
  const editDialogRef = ref(null);
  const skuDialogRef = ref(null);
  const batchUpdateDialogRef = ref(null);
  const diffDialogRef = ref(null);

  const logRef = ref(null);
  const remindRef = ref(null);
  // 勾选
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  const onUploadLogisticsDataSuccess = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      try {
        await erpApi.luteosErpV2FirstLogisticsAddUploadOther({
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
        });
        ElMessage.success('上传成功');
        refreshList();
      } catch (error) {
        ElMessage.error('上传失败，请重试');
        return;
      } finally {
        fileList.value = [];
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };

  const onUploadSuccess = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      try {
        await erpApi.luteosErpV2FirstLogisticsUploadAttachment({
          fbaId: uploadRowFbaId.value,
          attachmentName: fileList.value[0].name,
          attachmentUrl: fileList.value[0].ossKey,
        });
        ElMessage.success('上传成功');
        refreshList();
      } catch (error) {
        ElMessage.error('上传失败，请重试');
        return;
      } finally {
        fileList.value = [];
        uploadRowFbaId.value = '';
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const removeFile = async (row) => {
    try {
      const confirmed = await swal.confirm('确认删除附件吗？');
      if (!confirmed) return;
      await erpApi.luteosErpV2FirstLogisticsDeleteAttachment({
        fbaId: [row.fbaId],
      });
      swal.success('删除成功');
      refreshList();
    } catch (error) {}
  };
  // 批量删除/下载数据
  const handleBatch = async (type: '删除' | '下载') => {
    if (totalList.value.length === 0) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const confirmed = await swal.confirm(`确认${type}选中数据吗？`);
    if (!confirmed) return;
    const fbaIds = totalList.value.map((item) => item?.fbaId);
    const api =
      type === '删除'
        ? erpApi.luteosErpV2FirstLogisticsDelete
        : erpApi.luteosErpV2FirstLogisticsDownloadAttachment;
    const res = await api({
      fbaId: fbaIds,
    });
    if (type === '下载') {
      if (res) {
        urlDownload(res as string);
      }
      return;
    }
    swal.success('删除成功');
    refreshList();
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value.open(row);
    }
    if (key === 'skuDetail') {
      skuDialogRef.value.open(row?.fbaId);
    }
    if (key === 'log') {
      logRef.value.open(row.fbaId);
    }
    if (key === 'delete') {
      const confirmed = await swal.confirm('确认删除吗？');
      if (!confirmed) return;
      await erpApi.luteosErpV2FirstLogisticsDelete({
        fbaId: [row.fbaId],
      });
      swal.success('删除成功');
      refreshList();
    }
    if (key === 'upload') {
      uploadRowFbaId.value = row.fbaId;
      document.querySelector('.row-btn')?.click();
    }
  };
</script>

<style scoped lang="scss">
  .file-link .delete-icon {
    display: none;
    margin-left: 4px;
    color: #f56c6c;
    cursor: pointer;
  }

  .file-link:hover .delete-icon {
    display: inline-flex;
  }

  .list-page-container {
    :deep(.list-search-wrapper) {
      margin-bottom: 0;
    }
  }

  .status-card {
    margin: 10px 0;

    .card-row {
      min-width: 825px;
      flex-grow: 1;
    }

    .card-item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 25%;
      height: 6vw;
      min-height: 90px;
      background: #ffffff;
      padding: 0.75vw;
      border-radius: 5px;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      position: relative;
      cursor: pointer;

      &-title {
        font-size: 14px;
        font-weight: 400;
      }

      &-qty {
        font-size: 16px;
        text-align: center;
      }

      &-rate {
        font-size: 12px;
        color: var(--el-color-info);
      }

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
        //box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
