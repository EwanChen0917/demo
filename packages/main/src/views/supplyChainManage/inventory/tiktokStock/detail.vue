<template>
  <!-- 基础信息表单 -->
  <el-form ref="formRef" :model="formData" class="mb-4">
    <KeenCard>
      <el-row gutter="20" style="margin-left: -12px">
        <el-col :span="4">
          <el-form-item label="单据编号:">
            <b style="margin-right: 10px">{{ formData.adjustmentCode }}</b>
            <el-tag :type="tagStatusColorMap[formData.syncStatus]">
              {{ formData.syncStatusDesc }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="创建日期:">
            <span>{{ formData.createTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="海外三方仓:" prop="warehouseName">
            <span>{{ formData.warehouseName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="创建人:">
            <span>{{ formData.creatorName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注:">
            <span>{{ formData.remark || '-' }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 调整商品明细 -->
      <el-table :data="formData?.wrapperDetailList" max-height="62vh">
        <el-table-column>
          <template #header>
            <h4>调整商品明细</h4>
          </template>
          <template #default="{ row, $index }">
            <el-row :gutter="10" style="padding-top: 10px">
              <el-col :span="6">
                <b>供应商sku:</b>
                <b>{{ row.supplySku }}</b>
              </el-col>
              <el-col :span="7">
                <b>seller sku:</b>
                <b>{{ row.sellerSku }}</b>
              </el-col>
              <el-col :span="2">
                <b>库存数量:</b>
                <b>{{ row.totalStock }}</b>
              </el-col>
              <el-col :span="6">
                <b>店铺:</b>
                <b>{{ row.shopNameList.join(',') }}</b>
              </el-col>
            </el-row>
            <el-table
              v-loading="row?.skuIdLoading"
              :data="row?.detailList || []"
              style="width: 100%"
            >
              <el-table-column label="SKU ID" prop="skuId" />
              <el-table-column label="店铺名称" prop="shopName" />
              <el-table-column label="Seller SKU" prop="sellerSku" />
              <el-table-column label="商品名称" prop="productName">
                <template #default="{ row }">
                  <OverflowTooltip :content="row.productName" :line="2" />
                </template>
              </el-table-column>
              <el-table-column label="当前库存" prop="availableStock" />
              <el-table-column label="预占库存" prop="committedStock" />
              <el-table-column label="可调整数量" prop="adjustmentQty" />
              <el-table-column label="调整后库存" prop="afterAdjustmentStock">
                <template #header>
                  <el-tooltip
                    content="调整后库存>=预占库存，否则无法同步TikTok后台"
                    placement="top"
                  >
                    <span>
                      调整后库存
                      <el-icon><warning /></el-icon>
                    </span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="同步状态" prop="syncStatus" width="100">
                <template #default="{ row }">
                  <el-tag :type="detailTagStatustMap[row.syncStatus]">
                    {{ row.syncStatusDesc }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="告警信息"
                prop="sysErrorMsg"
                width="140"
                v-if="row.syncStatus === 30"
              >
                <template #default="{ row }">
                  <OverflowTooltip :content="row.sysErrorMsg" :line="2" />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="tiktokStockDetail">
  import { FormInstance } from 'element-plus';
  import dayjs from 'dayjs';
  import { erpApi } from '@/api';
  import { useRoute } from 'vue-router';
  import { tagStatusColorMap, detailTagStatustMap } from './components/tagStatusMap';

  const route = useRoute();
  const { query } = route;

  const formData = ref({
    adjustmentCode: '',
    createTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), // 默认当天
    warehouseCode: '',
    creatorName: '',
    remark: '',
    wrapperDetailList: [],
  });

  const formRef = ref<FormInstance>();
  onMounted(() => {
    // 获取url参数
    if (query.id) {
      queryDetail(query.id);
    }
  });
  // 查询详情
  const queryDetail = async (id) => {
    const res = await erpApi.luteosErpTiktokStockAdjustmentDetail(id);
    const { adjustmentBean, wrapperDetailList } = res;
    formData.value = { ...adjustmentBean, wrapperDetailList };
  };
</script>

<style scoped>
  /* 添加一些样式 */
  ::v-deep(.el-form-item__content) {
    line-height: 32px !important;
  }
</style>
