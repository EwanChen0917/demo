<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose" width="1200px">
    <el-form ref="formRef" :model="form" label-width="80px" label-position="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="国家">
            <span>{{ form?.countryCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="SPU">
            <span>{{ form?.spuCode }} {{ form?.spuName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="SKU">
            <div class="text-break">{{ form?.skuCode }} {{ form?.skuName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="GTM品线">
            <span>{{ form?.gtmName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核月份">
            <span>{{ mounthText }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        border
        ref="tableRef"
        v-loading="loading"
        :data="dataList"
        row-key="planCode"
        default-expand-all
        @selection-change="handleSelectionChange"
        max-height="55vh"
      >
        <el-table-column
          type="selection"
          width="40"
          :selectable="
            (row) => {
              return row.approveStatus !== 1;
            }
          "
          reserve-selection
        />
        <el-table-column label="渠道" prop="channel" />
        <el-table-column label="币种" prop="currency" />
        <el-table-column label="活动时间" prop="channelDesc" min-width="200">
          <template #default="{ row }">
            <div>{{ row.startDate }} - {{ row.endDate }}</div>
          </template>
        </el-table-column>
        <el-table-column label="MSRP全渠道" min-width="100">
          <template #default="{ row }">{{ row.msrp }} {{ row.currency }}</template>
        </el-table-column>
        <el-table-column label="活动价" prop="activityPrice" min-width="100">
          <template #default="{ row }">{{ row.activityPrice }} {{ row.currency }}</template>
        </el-table-column>
        <el-table-column label="折扣率" prop="discountRate">
          <template #default="{ row }">{{ row.discountRate }}%</template>
        </el-table-column>
        <el-table-column label="目标销量" prop="targetSales" />
        <el-table-column label="毛利率" min-width="160">
          <template #default="{ row }">
            <div>
              原毛利率：{{ row.originalProfitRate == null ? '--' : row.originalProfitRate }}%
            </div>
            <div>
              活动毛利率：{{ row.activityProfitRate == null ? '--' : row.activityProfitRate }}%
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="approveStatusDesc" min-width="100">
          <template #default="{ row }">
            <Tag :color="statusColorMap[row?.approveStatus]" size="small">
              {{ row?.approveStatusDesc }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="提交人" prop="auditUser" />
      </el-table>
      <KeenPagination
        :current="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-size-option="[10, 20, 50, 100]"
        :total="pagination.total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
        v-if="pagination.total"
      />
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="danger" @click="submitFn(2)" :loading="refuseLoading">驳回</el-button>
        <el-button type="primary" @click="submitFn(1)" :loading="saveLoading">审核通过</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { statusColorMap } from '@/views/msrpManage/activityDiscountSchedule/enum';

  const visible = ref(false);
  const title = ref('审核确认');
  const mounthText = ref('');
  const form = ref();
  const tableRef = ref();
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const loading = ref(false);
  const searchData = ref({});
  const dataList = ref<any[]>([]);

  const runQuery = async () => {
    try {
      loading.value = true;
      const params = {
        pageSize: pagination.value.pageSize,
        pageNum: pagination.value.pageNum,
        countryCode: form.value.countryCode,
        endDate: form.value.endDate,
        gtm: form.value.gtm,
        skuCode: form.value.skuCode,
        spuCode: form.value.spuCode,
        startDate: form.value.startDate,
      };
      // executorName为空是部门
      if (searchData.value.executorName) {
        params.executorName = searchData.value.budgetNode;
      } else {
        params.budgetNode = searchData.value.budgetNode;
      }
      const res = await productApi.luteosProductPromotionPlanReviewList(params).catch(() => {
        dataList.value = [];
        pagination.value.total = 0;
      });
      if (res) {
        dataList.value = res?.recordList || [];
        pagination.value.total = res.total as number;
        if (tableRef.value) {
          tableRef.value?.clearSelection();
        }
      } else {
        dataList.value = [];
        pagination.value.total = 0;
      }
    } finally {
      loading.value = false;
    }
  };
  const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.pageNum = 1;
    runQuery();
  };
  const handleCurrentChange = (page) => {
    pagination.value.pageNum = page;
    runQuery();
  };
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    console.log(list);
    codeList.value = [];
    if (list) {
      list.forEach((item) => {
        if (item.approveStatus !== 1) {
          codeList.value.push(item.planCode);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
  };
  const refuseLoading = ref(false);
  const saveLoading = ref(false);
  const submitFn = async (approveStatus) => {
    console.log(codeList.value.length);
    if (codeList.value.length === 0) {
      ElMessage.error('请勾选操作数据');
      return;
    }
    if (approveStatus == 1) {
      saveLoading.value = true;
    } else {
      refuseLoading.value = true;
    }
    await productApi
      .luteosProductPromotionPlanReview({
        planCodes: codeList.value,
        approveStatus: approveStatus,
      })
      .finally(() => {
        saveLoading.value = false;
        refuseLoading.value = false;
      });
    ElMessage.success('保存成功');
    emit('success');
    handleClose();
  };

  const emit = defineEmits<{
    (event: 'close', r?: boolean): void;
    (event: 'success', r?: boolean): void;
  }>();

  const handleClose = () => {
    emit('close');
    visible.value = false;
  };

  const open = (row) => {
    console.log(row);
    form.value = row;
    const year = row.month.slice(0, 4);
    const month = row.month.slice(5, 7);
    mounthText.value = `${year}年${month}月`;
    pagination.value.pageSize = 10;
    pagination.value.pageNum = 1;
    runQuery();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
