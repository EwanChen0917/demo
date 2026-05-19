<template>
  <el-dialog :title="`详情：${row?.code}`" v-model="visible" width="1300px">
    <div class="tab-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="base">
          <KeenCard title="基础信息">
            <el-descriptions :column="3">
              <el-descriptions-item label="单据类型：">
                {{ detail?.baseInfo?.billTypeDesc || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="调拨类型：">
                {{ detail?.baseInfo?.operationTypeDesc || detail?.baseInfo?.operationType || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="金蝶单据编号：">
                {{ detail?.kingdeePushInfo?.number || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="实际入库日期：" v-if="isStandard">
                {{ detail?.baseInfo?.inboundDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="实际出库日期：" v-else>
                {{ detail?.baseInfo?.actualDeliveryDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="调出组织编码：">
                {{ detail?.baseInfo?.transferOutOrgCode || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="调出组织名称：">
                {{ detail?.baseInfo?.transferOutOrgName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="调入组织编码：">
                {{ detail?.baseInfo?.transferInOrgCode || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="调入组织名称：">
                {{ detail?.baseInfo?.transferInOrgName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="关联货件单：">
                {{ detail?.baseInfo?.shipmentId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="积加调拨单号：">
                {{ detail?.baseInfo?.tfCode || '-' }}
                <!--  {{ detail?.baseInfo?.jjTransferId || '-' }} -->
              </el-descriptions-item>
              <el-descriptions-item label="运输方式（物流方式）：">
                {{ detail?.baseInfo?.transport || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="站点名称：">
                {{ detail?.baseInfo?.arrivalMarketName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="调拨单号：">
                {{ detail?.baseInfo?.code || '-' }}
              </el-descriptions-item>

              <el-descriptions-item label="调出仓库出库单号：">
                {{ detail?.baseInfo?.outboundNo || '-' }}
              </el-descriptions-item>
              <el-descriptions-item v-if="!isStandard" label="调出仓出库单状态：">
                <el-tag v-if="detail?.baseInfo?.outboundStatus === 'PENDING'" type="info">
                  出库中
                </el-tag>
                <el-tag v-else-if="detail?.baseInfo?.outboundStatus === 'SUCCESS'" type="success">
                  出库成功
                </el-tag>
                <el-tag v-else-if="detail?.baseInfo?.outboundStatus === 'FAILED'" type="danger">
                  出库失败
                </el-tag>
                <el-tag v-else type="warning">
                  {{ detail?.baseInfo?.outboundStatus || '-' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item v-if="isStandard" label="调入仓入库单状态：">
                <el-tag v-if="detail?.baseInfo?.inboundStatus === 'PENDING'" type="info">
                  入库中
                </el-tag>
                <el-tag v-else-if="detail?.baseInfo?.inboundStatus === 'SUCCESS'" type="success">
                  入库成功
                </el-tag>
                <el-tag v-else-if="detail?.baseInfo?.inboundStatus === 'FAILED'" type="danger">
                  入库失败
                </el-tag>
                <el-tag v-else type="warning">
                  {{ detail?.baseInfo?.inboundStatus || '-' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item v-if="isStandard" label="调入仓入库单号：">
                {{ detail?.baseInfo?.inboundNo || '-' }}
              </el-descriptions-item>

              <el-descriptions-item label="备注：">
                {{ detail?.baseInfo?.memo || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </KeenCard>
          <KeenCard title="详情信息">
            <el-table :data="detail?.itemInfoList || []">
              <el-table-column label="调出仓库编号" prop="warehouseCode" />
              <el-table-column label="调出仓库名称" prop="warehouseName" />
              <el-table-column label="在途仓编码" prop="inTransitWarehouseCode" />
              <el-table-column label="在途仓名称" prop="inTransitWarehouseName" />
              <el-table-column label="调入仓库编号" prop="arrivalWarehouseCode" />
              <el-table-column label="调入仓库名称" prop="arrivalWarehouseName" />
              <el-table-column label="产品sku" prop="product" />
              <el-table-column label="产品名称" prop="skuName" />
              <el-table-column label="供应链SKU" prop="supplySku" />
              <!-- <el-table-column label="msku" prop="msku" />-->
              <el-table-column label="msku" prop="sellerSku" />
              <el-table-column label="调拨量" prop="quantity" />
            </el-table>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <KeenCard title="">
            <el-descriptions :column="3">
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
            <el-descriptions :column="3">
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
  import { financeSystemApi } from '@/api';
  import { billTypes } from './enum';

  const activeName = ref('base');

  const visible = ref(false);
  const row = ref<Response>({});

  const isStandard = computed(() => {
    return row.value.billType === billTypes.调拨入库单;
  });

  const open = (data: Response) => {
    visible.value = true;
    row.value = data;
    getDetail();
  };

  defineExpose({ open });

  const detail = ref({});
  const getDetail = () => {
    detail.value = {};
    financeSystemApi
      .financeOfflineTransferOrderQueryDetail({
        billType: row.value.billType,
        code: row.value.code,
      })
      .then((res) => {
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
