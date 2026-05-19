<template>
  <el-dialog :title="`详情：${row?.code}`" v-model="visible" width="1000px">
    <div class="tab-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="base">
          <KeenCard title="基础信息">
            <el-descriptions :column="3">
              <el-descriptions-item label="单据类型：">
                {{ detail?.baseInfo?.billTypeDesc || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="`其他${tagName}操作类型：`">
                {{ detail?.baseInfo?.operationTypeDesc || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="金蝶单据编号：">
                {{ detail?.kingdeePushInfo?.number || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="`${tagName}时间：`">
                {{
                  (isOut ? detail?.baseInfo?.outboundTime : detail?.baseInfo?.inboundTime) || '-'
                }}
              </el-descriptions-item>
              <el-descriptions-item label="公司编码：">
                {{ detail?.baseInfo?.orgNumberCode || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="公司名称：">
                {{ detail?.baseInfo?.orgNumberName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="`积加${tagName}单号：`">
                {{ detail?.baseInfo?.jjCode || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="`${tagName}单号：`">
                {{ detail?.baseInfo?.code || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="状态：">
                {{ detail?.baseInfo?.statusDesc || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="备注：">
                {{ detail?.baseInfo?.remark || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </KeenCard>
          <KeenCard title="订单信息">
            <el-table :data="detail?.itemInfoList || []">
              <el-table-column label="金蝶仓库编码" prop="kingdeeWarehouseNumber" />
              <el-table-column label="仓库编码" prop="warehouseCode" />
              <el-table-column label="仓库名称" prop="warehouseDesc" />
              <el-table-column label="产品SKU" prop="skuCode" />
              <el-table-column label="产品名称" prop="productName" />
              <el-table-column label="供应链SKU" prop="supplySku" />
              <el-table-column
                :label="`${tagName}数量`"
                :prop="isOut ? 'outboundQuantity' : 'inboundQuantity'"
              />
              <el-table-column
                :label="`${tagName}良品量`"
                :prop="isOut ? 'outboundGoodQuantity' : 'inboundGoodQuantity'"
              />
              <el-table-column
                :label="`${tagName}次品量`"
                :prop="isOut ? 'outboundDefectiveQuantity' : 'inboundDefectiveQuantity'"
              />
            </el-table>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <KeenCard title="">
            <el-descriptions :column="1">
              <el-descriptions-item label="推送金蝶状态：">
                {{ detail?.kingdeePushInfo?.pushStatusDesc || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="推送时间：">
                {{ detail?.kingdeePushInfo?.pushTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="推送失败原因：">
                {{ detail?.kingdeePushInfo?.failReason || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="制单信息" name="create">
          <KeenCard title="">
            <el-descriptions :column="1">
              <el-descriptions-item label="创建人：">
                {{ detail?.baseInfo?.createDesc || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="单据创建时间：">
                {{ detail?.baseInfo?.createTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </KeenCard>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { billTypes } from '@/views/finance/wms/otherBill/enum';
  import { financeSystemApi } from '@/api';

  const activeName = ref('base');

  const visible = ref(false);
  const row = ref<Response>({});

  const isOut = computed(() => {
    return row.value.billType === billTypes.其他出库单;
  });
  const tagName = computed(() => {
    return row.value.billType === billTypes.其他入库单 ? '入库' : '出库';
  });

  const open = (data: Response) => {
    visible.value = true;
    detail.value = {};
    row.value = data;
    getDetail();
  };

  defineExpose({ open });

  const detail = ref({});
  const getDetail = () => {
    detail.value = {};
    let api;
    if (row.value.billType === billTypes.其他入库单) {
      api = financeSystemApi.financeOtherInoutStockOrderQueryInStockDetail;
    } else {
      api = financeSystemApi.financeOtherInoutStockOrderQueryOutStockDetail;
    }
    api({
      code: row.value.code,
    }).then((res) => {
      detail.value = res;
    });
  };
</script>

<style scoped lang="scss">
  :deep(.el-descriptions__label) {
    color: #333 !important;
    font-weight: normal;
    font-size: 12px;
  }
</style>
