<template>
  <KeenToolbarActions>
    <el-button type="primary" size="small" @click="router.push({ name: 'productOperation' })">
      返回列表
    </el-button>
  </KeenToolbarActions>
  <el-form label-position="top">
    <KeenCard :title="`${projectInfo.projectName}的运营项目`">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="产品名称" prop="name">
            {{ projectInfo.productName }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="项目编码">
            {{ projectInfo.productCode }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="开售日期" prop="saleStartDate">
            {{ projectInfo.saleStartDate }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="产品定位" prop="productPositioning">
            <p class="format-txt">
              {{ projectInfo.productPositioning }}
            </p>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="核心卖点" prop="coreSellingPoint">
            <p class="format-txt">
              {{ projectInfo.coreSellingPoint }}
            </p>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="次要卖点" prop="minorSellingPoint">
            <p class="format-txt">
              {{ projectInfo.minorSellingPoint }}
            </p>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="定价策略" prop="pricingStrategy">
            <p class="format-txt">
              {{ projectInfo.pricingStrategy }}
            </p>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="营销策略" prop="marketingPolicy">
            <p class="format-txt">
              {{ projectInfo.marketingPolicy }}
            </p>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="运营目标">
      <KeenList @refresh="queryDetail">
        <template #buttons>
          <el-button class="btn-margin" type="primary" :loading="importLoading" @click="uploadFile">
            导入
          </el-button>
          <ExportBtn
            class="btn-margin"
            :params="filterForm"
            :service="productOperationApi.luteosOpetationExportOperationProjectDetail"
          >
            导出
          </ExportBtn>
        </template>
      </KeenList>

      <vxe-table
        border
        show-overflow
        ref="xTable"
        :column-config="{ resizable: true }"
        height="600"
        :merge-cells="mergeCells"
        v-loading="loading"
        align="center"
        :data="tableData"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        @edit-closed="editClosedEvent"
        class="table-margin"
      >
        <vxe-column
          title="周期"
          field="weekDateStr"
          :formatter="formatterDate"
          :edit-render="{}"
          width="200"
        >
          <template #edit="{ row, $rowIndex }">
            <vxe-input
              @change="handleChange($event, $rowIndex)"
              v-model="row.weekDateStr"
              type="week"
              :start-day="1"
            />
          </template>
        </vxe-column>
        <vxe-column title="售价" field="price" :edit-render="{}" width="100">
          <template #edit="{ row }">
            <vxe-input v-model="row.price" type="text" />
          </template>
        </vxe-column>
        <vxe-column
          title="推广前毛利率"
          field="promotionProfitRate"
          :formatter="formatterRate"
          :edit-render="{}"
          width="150"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.promotionProfitRate" type="text">
              <template #suffix>%</template>
            </vxe-input>
          </template>
        </vxe-column>
        <vxe-column title="目的" field="purpose" :edit-render="{}" width="200">
          <template #edit="{ row }">
            <vxe-input v-model="row.purpose" type="text" />
          </template>
        </vxe-column>
        <vxe-column title="目标日销" field="targetDailySale" :edit-render="{}" width="100">
          <template #edit="{ row }">
            <vxe-input v-model="row.targetDailySale" type="text" />
          </template>
        </vxe-column>

        <vxe-colgroup title="衡量指标">
          <vxe-column title="流量指标/日" field="flowTarget" :edit-render="{}" width="120">
            <template #edit="{ row }">
              <vxe-input v-model="row.flowTarget" type="text" />
            </template>
          </vxe-column>
          <vxe-column
            title="转化率指标/日"
            field="conversionRateTarget"
            :formatter="formatterRate"
            :edit-render="{}"
            width="130"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.conversionRateTarget" type="text">
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            title="广告订单占比/日"
            field="advertisingOrderRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="150"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.advertisingOrderRate" type="text">
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column title="Click/天" field="click" :edit-render="{}" width="100">
            <template #edit="{ row }">
              <vxe-input v-model="row.click" type="text" />
            </template>
          </vxe-column>
          <vxe-column title="CPC/天" field="cpc" :edit-render="{}" width="100">
            <template #edit="{ row }">
              <vxe-input v-model="row.cpc" type="text" />
            </template>
          </vxe-column>
          <vxe-column title="广告CVR" field="advertisingCvr" :edit-render="{}" width="100">
            <template #edit="{ row }">
              <vxe-input v-model="row.advertisingCvr" type="text" />
            </template>
          </vxe-column>
          <vxe-column title="广告花费/天" field="advertisingCost" :edit-render="{}" width="120">
            <template #edit="{ row }">
              <vxe-input v-model="row.advertisingCost" type="text" />
            </template>
          </vxe-column>
          <vxe-column
            title="广告费比/周"
            field="advertisingCostRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="120"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.advertisingCostRate" type="text">
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            title="毛利率/周"
            field="profitRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="120"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.profitRate" type="text">
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column title="大类排名" field="categoryRank" :edit-render="{}" width="100">
            <template #edit="{ row }">
              <vxe-input v-model="row.categoryRank" type="text" />
            </template>
          </vxe-column>
          <vxe-column title="小类排名" field="subCategoryRank" :edit-render="{}" width="100">
            <template #edit="{ row }">
              <vxe-input v-model="row.subCategoryRank" type="text" />
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="销售数据">
          <vxe-column title="日期" field="weekDate" width="120" />
          <vxe-column title="实际日销" field="actualDaySale" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.actualDaySale"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="销量差额" field="salesMargin" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.salesMargin"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="销售额" field="sales" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.sales"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="RV数量" field="rvNum" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.rvNum"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="RV星级" field="rvLeve" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.rvLeve"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="总流量" field="allFlowNum" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.allFlowNum"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column
            title="总转换率"
            field="allConversionRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="100"
          >
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.allConversionRate"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              >
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="广告数据">
          <vxe-column title="日期" field="weekDate" width="120" />
          <vxe-column title="曝光量" field="exposureNum" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.exposureNum"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="点击量" field="clickNum" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.clickNum"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column
            title="点击率"
            field="clickRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="100"
          >
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.clickRate"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              >
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column title="cpc单次点击费用" field="cpcClickCost" :edit-render="{}" width="150">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.cpcClickCost"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="cpa/单个订单花费" field="cpaOrderCost" :edit-render="{}" width="160">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.cpaOrderCost"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="广告花费" field="advertisingCostActual" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.advertisingCostActual"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column
            title="Acos"
            field="acos"
            :formatter="formatterRate"
            :edit-render="{}"
            width="100"
          >
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.acos"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              >
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column title="广告订单" field="advertisingOrderNum" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.advertisingOrderNum"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="广告销售额" field="advertisingSales" :edit-render="{}" width="120">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.advertisingSales"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column
            title="广告转化率"
            field="advertisingConversionRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="120"
          >
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.advertisingConversionRate"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              >
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            title="广告花费占比"
            field="advertisingCostActualRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="130"
          >
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.advertisingCostActualRate"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              >
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column
            title="广告订单占比"
            field="advertisingOrderActualRate"
            :formatter="formatterRate"
            :edit-render="{}"
            width="130"
          >
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.advertisingOrderActualRate"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              >
                <template #suffix>%</template>
              </vxe-input>
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="排名数据">
          <vxe-column title="日期" field="weekDate" width="120" />
          <vxe-column title="大类排名" field="categoryRankActual" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input
                v-model="row.categoryRankActual"
                type="text"
                :readonly="$rowIndex > 0 && ($rowIndex + 1) % 8 === 0"
              />
            </template>
          </vxe-column>
          <vxe-column title="小类排名" field="subCategoryRankActual" :edit-render="{}" width="100">
            <template #edit="{ row, $rowIndex }">
              <vxe-input v-model="row.subCategoryRankActual" type="text" />
            </template>
          </vxe-column>
        </vxe-colgroup>

        <vxe-column title="周复盘" field="weekReview" :edit-render="{}" width="400">
          <template #edit="{ row }">
            <vxe-textarea
              v-model="row.weekReview"
              :maxlength="2000"
              :rows="5"
              :showWordCount="true"
            />
          </template>
        </vxe-column>

        <vxe-column title="操作" fixed="right" width="60">
          <template #default="{ row, $rowIndex }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '保存',
                  key: 'save',
                  type: 'primary',
                  index: $rowIndex,
                  text: true,
                  row: row,
                },
              ]"
              @click="saveColumn"
            />
          </template>
        </vxe-column>
      </vxe-table>
      <el-button type="primary" size="small" @click="addTableColumn" class="add-column">
        添加一列
      </el-button>
    </KeenCard>
    <UploadFileModal
      v-if="uploadVisible"
      :visible="uploadVisible"
      @close="
        () => {
          uploadVisible = false;
        }
      "
      @save="handleUploadSuccess"
    />
  </el-form>
</template>

<script setup lang="ts" name="operationDetail">
  import { productOperationApi, commonApi } from '@/api';
  import { ElNotification, ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import UploadFileModal from './components/UploadFileModal.vue';

  const router = useRouter();
  const route = useRoute();
  const projectCode = route.query.code;
  const filterForm = { projectCode };
  const projectInfo = ref({});
  const listData = ref([]);
  const queryDetail = async () => {
    const res = await productOperationApi.luteosOpetationQueryOperationProjectDetail({
      projectCode,
    });
    // 数据回显
    // 项目信息
    projectInfo.value = res.operationProject || {};
    // 运营目标
    const list = res.operationWeekTargetList || [];
    listData.value = [];
    list.forEach((item) => {
      // 每一行公共数据
      const data = {
        advertisingCost: item.advertisingCost,
        advertisingCostRate: item.advertisingCostRate,
        advertisingCvr: item.advertisingCvr,
        advertisingOrderRate: item.advertisingOrderRate,
        categoryRank: item.categoryRank,
        click: item.click,
        conversionRateTarget: item.conversionRateTarget,
        cpc: item.cpc,
        flowTarget: item.flowTarget,
        price: item.price,
        profitRate: item.profitRate,
        promotionProfitRate: item.promotionProfitRate,
        purpose: item.purpose,
        subCategoryRank: item.subCategoryRank,
        targetDailySale: item.targetDailySale,
        weekReview: item.weekReview,
        weekDateStr: item.weekStartDate, // 设置成初始日期自动回显
        weekStartDate: item.weekStartDate,
        weekEndDate: item.weekEndDate,
        weekTargetCode: item.weekTargetCode,
      };
      // 从周期日数据取出来当做一行
      item.operationWeekDailyActualList?.forEach((weelDailyItem) => {
        const weelDailyData: any = {
          acos: weelDailyItem.acos,
          actualDaySale: weelDailyItem.actualDaySale,
          advertisingConversionRate: weelDailyItem.advertisingConversionRate,
          advertisingOrderActualRate: weelDailyItem.advertisingOrderActualRate,
          advertisingCostActual: weelDailyItem.advertisingCostActual,
          advertisingCostActualRate: weelDailyItem.advertisingCostActualRate,
          advertisingOrderNum: weelDailyItem.advertisingOrderNum,
          advertisingSales: weelDailyItem.advertisingSales,
          allConversionRate: weelDailyItem.allConversionRate,
          allFlowNum: weelDailyItem.allFlowNum,
          categoryRankActual: weelDailyItem.categoryRankActual,
          clickNum: weelDailyItem.clickNum,
          clickRate: weelDailyItem.clickRate,
          cpaOrderCost: weelDailyItem.cpaOrderCost,
          cpcClickCost: weelDailyItem.cpcClickCost,
          exposureNum: weelDailyItem.exposureNum,
          rvLeve: weelDailyItem.rvLeve,
          rvNum: weelDailyItem.rvNum,
          sales: weelDailyItem.sales,
          salesMargin: weelDailyItem.salesMargin,
          subCategoryRankActual: weelDailyItem.subCategoryRankActual,
          weekDailyCode: weelDailyItem.weekDailyCode,
          weekDate: weelDailyItem.weekDate,
        };
        listData.value.push({ ...data, ...weelDailyData });
      });

      // 汇总数据作为第8行
      const dataCollect = item.dataCollect || {};
      const dataCollectData = {
        acos: dataCollect.acosRate,
        actualDaySale: dataCollect.actualDaySaleAvg,
        advertisingConversionRate: dataCollect.advertisingConversionRate,
        advertisingOrderActualRate: dataCollect.advertisingOrderActualRate,
        advertisingCostActual: dataCollect.advertisingCostAvg,
        advertisingCostActualRate: dataCollect.advertisingCostRate,
        advertisingOrderNum: dataCollect.advertisingOrderNumAvg,
        advertisingSales: dataCollect.advertisingSalesAvg,
        allConversionRate: dataCollect.allConversionRate,
        allFlowNum: dataCollect.allFlowNumAvg,
        categoryRankActual: dataCollect.categoryRankLast,
        clickNum: dataCollect.clickNumAvg,
        clickRate: dataCollect.clickRate,
        cpaOrderCost: dataCollect.cpaOrderCostRate,
        cpcClickCost: dataCollect.cpcClickCostAvg,
        exposureNum: dataCollect.exposureNumAvg,
        rvLeve: dataCollect.rvLeveLast,
        rvNum: dataCollect.rvNumLast,
        sales: dataCollect.salesAvg,
        salesMargin: dataCollect.salesMarginSum,
        subCategoryRankActual: dataCollect.subCategoryRankLast,
        weekDate: '汇总',
      };

      listData.value.push({ ...data, ...dataCollectData });
    });
    tableData.value = listData.value;
  };
  if (projectCode) {
    queryDetail();
  }

  // 格式化日期的辅助函数
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatterDate = ({ cellValue }) => {
    if (cellValue) {
      const currentDate = new Date(cellValue);
      const startDate = formatDate(currentDate);
      currentDate.setDate(currentDate.getDate() + 6);
      const endDate = formatDate(currentDate);

      return `${startDate}~${endDate}`;
    }
  };

  const formatterRate = ({ cellValue }) => {
    if (cellValue !== null && cellValue !== undefined && cellValue !== '') {
      return `${(+cellValue).toFixed(2)}%`;
    }
  };
  // 文件上传
  const uploadVisible = ref<boolean>(false);
  const uploadFile = () => {
    uploadVisible.value = true;
  };
  const importLoading = ref(false);
  const handleUploadSuccess = (files) => {
    uploadVisible.value = false;
    // 获取文件信息
    const file = files[files.length - 1];
    importLoading.value = true;
    // 导入
    commonApi
      .luteosCommonFileImportData({
        fileName: file.name,
        importScene: 'operation_project_week_target',
        key: file.ossKey,
        projectCode,
      })
      .then(async (res: any) => {
        // 导入成功处理
        importLoading.value = false;
        queryDetail();
        if (+res.failedCount > 0) {
          const isConfirmed = await swal.confirm({
            title: '有部分数据导入失败，具体请前往上传日志查看',
            icon: 'error',
            confirmButtonText: '去查看',
            cancelButtonText: '知道了',
          });
          if (!isConfirmed) return;
          openWindow('/salesForecastingLog');
        } else {
          ElMessage.success('导入成功');
        }
      })
      .finally(() => {
        importLoading.value = false;
        uploadVisible.value = false;
      });
  };

  const fixedRows = 8;
  const xTable = ref();
  // 保存
  const saveColumn = (item) => {
    const { key, row, index } = item;
    if (key === 'save') {
      const curRow: any = tableData.value[index];
      const params = {
        projectCode,
        advertisingCost: curRow.advertisingCost,
        advertisingCostRate: curRow.advertisingCostRate,
        advertisingCvr: curRow.advertisingCvr,
        advertisingOrderRate: curRow.advertisingOrderRate,
        categoryRank: curRow.categoryRank,
        click: curRow.click,
        conversionRateTarget: curRow.conversionRateTarget,
        cpc: curRow.cpc,
        flowTarget: curRow.flowTarget,
        price: curRow.price,
        profitRate: curRow.profitRate,
        promotionProfitRate: curRow.promotionProfitRate,
        purpose: curRow.purpose,
        subCategoryRank: curRow.subCategoryRank,
        targetDailySale: curRow.targetDailySale,
        weekReview: curRow.weekReview,
        weekStartDate: curRow.weekDateStr,
        weekEndDate: tableData.value[index + 6]?.weekDate, // 该条数据的第七条的weekDate为结束日期
        weekTargetCode: curRow.weekTargetCode,
        operationWeekDailyActualList: [],
      };

      // 前7行，组装数据
      for (let i = index; i < index + fixedRows - 1; i++) {
        const subRow: any = tableData.value[i];
        const data: any = {
          acos: subRow.acos,
          actualDaySale: subRow.actualDaySale,
          advertisingConversionRate: subRow.advertisingConversionRate,
          advertisingOrderActualRate: subRow.advertisingOrderActualRate,
          advertisingCostActual: subRow.advertisingCostActual,
          advertisingCostActualRate: subRow.advertisingCostActualRate,
          advertisingOrderNum: subRow.advertisingOrderNum,
          advertisingSales: subRow.advertisingSales,
          allConversionRate: subRow.allConversionRate,
          allFlowNum: subRow.allFlowNum,
          categoryRankActual: subRow.categoryRankActual,
          clickNum: subRow.clickNum,
          clickRate: subRow.clickRate,
          cpaOrderCost: subRow.cpaOrderCost,
          cpcClickCost: subRow.cpcClickCost,
          exposureNum: subRow.exposureNum,
          rvLeve: subRow.rvLeve,
          rvNum: subRow.rvNum,
          sales: subRow.sales,
          salesMargin: subRow.salesMargin,
          subCategoryRankActual: subRow.subCategoryRankActual,
          weekDailyCode: subRow.weekDailyCode,
          weekDate: subRow.weekDate,
        };
        params.operationWeekDailyActualList.push(data);
      }
      productOperationApi.luteosOpetationSaveOperationProjectDetail(params).then((res) => {
        if (res.weekTargetCode) {
          ElMessage.success('保存成功');
          queryDetail();
        }
      });
    }
  };
  // 周期选择之后触发
  const handleChange = (date, index) => {
    setColumnDate(date.value, index);
  };
  const setColumnDate = (weekDateStr, index) => {
    // 将字符串转换为Date对象
    const currentDate = new Date(weekDateStr);

    // 输出结果，包括输入日期到输入日期后的连续7天
    for (let i = index; i < index + fixedRows - 1; i++) {
      tableData.value[i].weekDate = formatDate(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  };
  const mergeCells = computed(() => {
    const len = tableData.value.length / fixedRows;
    const list = [];
    for (let index = 0; index < len; index++) {
      const rowIndex = index * fixedRows;
      // 前16列第一行占8行
      for (let i = 0; i < 16; i++) {
        list.push({ row: rowIndex, col: i, rowspan: fixedRows, colspan: 1 });
      }
      // 周复盘合并
      list.push({ row: rowIndex, col: 40, rowspan: fixedRows, colspan: 1 });
      // 操作按钮合并
      list.push({ row: rowIndex, col: 41, rowspan: fixedRows, colspan: 1 });
    }
    return list;
  });
  const tableData = ref([]);

  // 每一行默认数据
  const column = ref({
    weekDateStr: '',
    price: '',
    promotionProfitRate: '',
    purpose: '',
    targetDailySale: '',
    flowTarget: '',
    conversionRateTarget: '',
    advertisingOrderRate: '',
    click: '',
    cpc: '',
    advertisingCvr: '',
    advertisingCost: '',
    advertisingCostRate: '',
    profitRate: '',
    categoryRank: '',
    subCategoryRank: '',
    actualDaySale: '',
    salesMargin: '',
    sales: '',
    rvNum: '',
    rvLeve: '',
    allFlowNum: '',
    allConversionRate: '',
    weekDate: '',
    exposureNum: '',
    clickNum: '',
    clickRate: '',
    cpcClickCost: '',
    cpaOrderCost: '',
    acos: '',
    advertisingCostActual: '',
    advertisingOrderNum: '',
    advertisingSales: '',
    advertisingConversionRate: '',
    advertisingOrderActualRate: '',
    advertisingCostActualRate: '',
    subCategoryRankActual: '',
    categoryRankActual: '',
    weekReview: '',
  });
  const isNotification = ref(true);
  const editClosedEvent = () => {
    // 提示限制
    if (isNotification.value) {
      isNotification.value = false;
      ElNotification({
        title: '保存提示',
        message: '数据需点击保存后才能被记录，不要忘记保存哦',
        position: 'bottom-right',
        duration: 5000,
      });
      setTimeout(() => {
        isNotification.value = true;
      }, 5000);
    }
  };

  // 新增行
  const addTableColumn = () => {
    // 前7行
    for (let i = 0; i < fixedRows; i++) {
      tableData.value.push({ ...column.value });
    }
    // 第8行汇总字段文案设置
    tableData.value[tableData.value.length - 1].weekDate = '汇总';
  };
</script>

<style scoped lang="scss">
  :deep(.el-form-item__label) {
    font-weight: bold;
  }
  .add-column {
    margin-top: 20px;
  }
  :deep(.vxe-table--main-wrapper) {
    ::-webkit-scrollbar {
      width: 15px;
      height: 15px;
      background-color: transparent;
    }
  }
  .btn-margin {
    margin-top: -60px;
  }
  .table-margin {
    margin-top: -40px;
  }
  .format-txt {
    white-space: pre-line;
    line-height: 20px;
    margin-top: 15px;
  }
</style>
