<template>
  <el-form>
    <KeenCard>
      <div class="d-flex justify-content-between">
        <el-row class="me-10 flex-grow-1">
          <el-col :md="12" :lg="8" style="min-width: max-content">
            <el-form-item label="RPE仓配单号：">
              <span>{{ baseInfo?.woCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" style="min-width: max-content">
            <el-form-item label="仓配系统销售单号：">
              <span>{{ baseInfo?.systemSaleCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" style="min-width: max-content">
            <el-form-item label="仓配系统订单号：">
              <span>{{ baseInfo?.systemCode }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          v-if="baseInfo?.status === 300"
          type="primary"
          size="small"
          @click="downloadDetail"
        >
          下载拣货单文件
        </el-button>
      </div>

      <el-steps :active="curStep" finish-status="success">
        <el-step title="创建" :description="baseInfo?.createTime" />
        <el-step title="待处理" :description="baseInfo?.handleTime" />
        <el-step title="待出库" :description="baseInfo?.outTime" />
        <el-step title="已出库" :description="baseInfo?.finishTime" />
      </el-steps>
    </KeenCard>
    <KeenCard title="客户信息">
      <el-row>
        <el-col :md="12" :lg="8">
          <el-form-item label="收件人：">
            <span>{{ customerInfo?.receiveName }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="收件人号码：">
            <span>{{ customerInfo?.receivePhone }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="邮编：">
            <span>{{ customerInfo?.receiveZipCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="24">
          <el-form-item label="收件人地址：">
            <span>{{ customerInfo?.receiveAddress }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="订单信息">
      <el-row>
        <el-col :md="12" :lg="8">
          <el-form-item label="创建时间：">
            <span>{{ baseInfo?.saleOrderCreateTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="货代：">
            <el-input
              v-if="baseInfo.status === 200"
              v-model="baseInfo.freightForwarding"
              show-word-limit
              maxlength="50"
              clearable
            />
            <span v-else>{{ baseInfo?.freightForwarding || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="渠道：">
            <el-select
              v-if="baseInfo.status === 200"
              v-model="baseInfo.freightForwardingChannelCode"
              placeholder="渠道"
              clearable
              filterable
            >
              <el-option
                v-for="item in channelMap"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
              <template #footer>
                <div class="d-flex gap-2">
                  <el-input v-model="newChannel" size="small" clearable placeholder="请输入" />
                  <el-button
                    type="primary"
                    size="small"
                    @click="addChannel"
                    :disabled="!newChannel"
                  >
                    新增
                  </el-button>
                </div>
              </template>
            </el-select>
            <span v-else>{{ baseInfo?.freightForwardingChannelDesc || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="物流跟踪号：">
            <span>{{ baseInfo?.trackingNum || (baseInfo?.status === 300 ? '' : '-') }}</span>
            <el-link
              class="ms-3"
              v-if="baseInfo?.status === 300"
              :underline="false"
              type="primary"
              size="small"
              @click="
                addTrackNumDialogRef?.open(baseInfo?.preSaleCode, baseInfo?.trackingNum?.split(','))
              "
            >
              +添加跟踪号
            </el-link>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="产品品数项：">
            <span>{{ baseInfo?.itemCount || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="产品总数量：">
            <span>{{ baseInfo?.skuCount || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="16">
          <el-form-item label="发货需求：">
            <el-input v-if="baseInfo?.status === 200" v-model="baseInfo.sendDemand" clearable />
            <span v-else>{{ baseInfo?.sendDemand || '-' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="产品信息">
      <el-table :data="itemInfoList">
        <el-table-column type="index" label="序号" width="70px" />
        <el-table-column label="产品名称" prop="productName" min-width="180" />
        <el-table-column label="产品SKU" prop="skuCode" min-width="120" />
        <el-table-column label="供应链SKU" prop="productSku" min-width="130" />
        <el-table-column label="数量" prop="qty" />
        <el-table-column label="UPC码" prop="upc" min-width="120" />
        <el-table-column label="UPC码文件" min-width="140">
          <template #default="{ row }">
            <KeenFileUpload
              v-if="baseInfo.status === 200 || baseInfo.status === 0"
              v-model="row.upcAttachment"
              directory="erp"
            >
              <el-link :underline="false" type="primary" size="small">上传文件</el-link>
            </KeenFileUpload>
            <el-link
              v-else
              style="word-break: break-all"
              type="primary"
              :underline="false"
              :href="row?.upcAttachment[0]?.fileUrl"
              target="_blank"
            >
              {{ row?.upcAttachment[0]?.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="EAN码" prop="ean" min-width="120" />
        <el-table-column label="EAN码文件" min-width="140">
          <template #default="{ row }">
            <KeenFileUpload
              v-if="baseInfo.status === 200 || baseInfo.status === 0"
              v-model="row.eanAttachment"
              directory="erp"
            >
              <el-link :underline="false" type="primary" size="small">上传文件</el-link>
            </KeenFileUpload>
            <el-link
              v-else
              style="word-break: break-all"
              type="primary"
              :underline="false"
              :href="row?.eanAttachment[0]?.fileUrl"
              target="_blank"
            >
              {{ row?.eanAttachment[0]?.name }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="附件信息">
      <el-row>
        <el-col :md="12" :lg="8">
          <el-form-item label="物流文件：">
            <KeenFileUpload
              v-if="baseInfo.status === 200 || baseInfo.status === 0"
              v-model="baseInfo.logisticsAtt"
              :limit="3"
              directory="erp"
            >
              <el-button type="primary" size="small">选择文件</el-button>
            </KeenFileUpload>
            <div class="w-100" v-else v-for="item in baseInfo?.logisticsAtt" :key="item?.ossKey">
              <el-link type="primary" :underline="false" :href="item?.fileUrl" target="_blank">
                {{ item?.name }}
              </el-link>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8" v-if="baseInfo.status === 300 || baseInfo.status === 0">
          <el-form-item label="装箱单文件：">
            <KeenFileUpload v-model="baseInfo.packingAtt" :limit="3" directory="erp">
              <el-button type="primary" size="small">选择文件</el-button>
            </KeenFileUpload>
            <!--            <div class="w-100" v-else v-for="item in baseInfo?.packingAtt" :key="item?.ossKey">
              <el-link type="primary" :underline="false" :href="item?.fileUrl" target="_blank">
                {{ item?.fileName }}
              </el-link>
            </div>-->
            <el-button type="primary" size="small" @click="downloadTemplate">下载模板</el-button>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              maxlength="500"
              :rows="6"
              v-model="baseInfo.remark"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="save(true)" :loading="saveLoading">保存草稿</el-button>
      <el-button type="primary" @click="save(false)" :loading="saveLoading">
        提交{{ baseInfo?.status === 200 ? '处理' : '出库' }}
      </el-button>
    </el-space>
  </div>
  <AddTrackNumDialog ref="addTrackNumDialogRef" @success="handleSuccess" />
</template>

<script setup lang="ts" name="selfFulfilledOrderEdit">
  import { erpApi, platformApi } from '@/api';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import AddTrackNumDialog from '@/views/supplyChainManage/efficiencyTools/selfFulfilledOrder/components/addTrackNumDialog.vue';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const addTrackNumDialogRef = ref(null);
  const route = useRoute();
  const baseInfo = ref({
    logisticsAtt: [],
    packingAtt: [],
  });
  const customerInfo = ref({});
  const itemInfoList = ref([]);
  const curStep = ref(1);
  const stepMap = {
    200: 1,
    300: 2,
    400: 4,
  };

  const queryDetail = async () => {
    const res = await erpApi.luteosErpOdoQueryDetail({
      code: route.query?.code as string,
    });
    const detailInfo = res?.draftDetailResp ?? res?.detailResp;
    baseInfo.value = {
      ...detailInfo?.baseInfo,
      logisticsAtt: detailInfo?.baseInfo?.logisticsAtt?.map((item) => {
        return {
          ossKey: item?.ossKey,
          name: item?.fileName,
          fileUrl: item?.fileUrl,
        };
      }),
      packingAtt: detailInfo?.baseInfo?.packingAtt?.map((item) => {
        return {
          ossKey: item?.ossKey,
          name: item?.fileName,
          fileUrl: item?.fileUrl,
        };
      }),
    };
    customerInfo.value = detailInfo?.customerInfo;
    itemInfoList.value = detailInfo?.itemInfoList?.map((item) => {
      return {
        ...item,
        upcAttachment: item?.upcAttachment
          ? [
              {
                ossKey: item?.upcAttachment?.ossKey,
                name: item?.upcAttachment?.fileName,
                fileUrl: item?.upcAttachment?.fileUrl,
              },
            ]
          : [],
        eanAttachment: item?.eanAttachment
          ? [
              {
                ossKey: item?.eanAttachment?.ossKey,
                name: item?.eanAttachment?.fileName,
                fileUrl: item?.eanAttachment?.fileUrl,
              },
            ]
          : [],
      };
    });
    curStep.value = stepMap[baseInfo.value?.status];
  };

  queryDetail();

  const channelMap = ref();
  const getChannelMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['owner_send_order_chanel'],
    });
    channelMap.value = res?.dictMap?.owner_send_order_chanel;
  };
  getChannelMap();

  const newChannel = ref();
  const addChannel = async () => {
    const res = await platformApi.platformDictSaveBatch({
      code: 'owner_send_order_chanel',
      name: '自发货单渠道',
      dictItemList: channelMap.value
        ?.map((item) => {
          return {
            desc: item?.desc,
            type: 2,
          };
        })
        ?.concat([{ desc: newChannel.value, type: 2 }]),
    });
    channelMap.value = res?.dictMap?.owner_send_order_chanel;
    newChannel.value = '';
    ElMessage.success('新增成功');
  };

  const downloadDetail = async () => {
    const res = await erpApi.luteosErpOdoDownDetail({
      code: route.query?.code as string,
    });
    if (res) {
      openWindow(res);
    } else {
      ElMessage.error('下载失败');
    }
  };

  const downloadTemplate = async () => {
    const res = await erpApi.luteosErpOdoDownPackTemplate({
      code: route.query?.code as string,
    });
    if (res) {
      openWindow(res);
    } else {
      ElMessage.error('下载失败');
    }
  };

  const saveLoading = ref(false);
  const save = async (draft?: boolean) => {
    try {
      saveLoading.value = true;
      await erpApi.luteosErpOdoStatusReverse({
        baseInfo: {
          ...baseInfo.value,
          logisticsAtt: baseInfo.value?.logisticsAtt?.map((item) => {
            return {
              ossKey: item.ossKey,
              fileName: item.name || item.fileName,
            };
          }),
          packingAtt: baseInfo.value?.packingAtt?.map((item) => {
            return {
              ossKey: item.ossKey,
              fileName: item.name || item.fileName,
            };
          }),
        },
        itemInfoList: itemInfoList.value?.map((item) => {
          return {
            ...item,
            upcAttachment: item?.upcAttachment?.length
              ? {
                  ossKey: item?.upcAttachment?.[0].ossKey,
                  fileName: item?.upcAttachment?.[0].name,
                }
              : null,
            eanAttachment: item?.eanAttachment?.length
              ? {
                  ossKey: item?.eanAttachment?.[0].ossKey,
                  fileName: item?.eanAttachment?.[0].name,
                }
              : null,
          };
        }),
        draft,
      });
      ElMessage.success(`${draft ? '保存' : '提交'}成功`);
      closeTabAndRefresh('selfFulfilledOrder');
      router.push('/selfFulfilledOrder');
    } finally {
      saveLoading.value = false;
    }
  };

  const handleSuccess = (val) => {
    baseInfo.value.trackingNum = val?.join(',');
  };

  const router = useRouter();
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/selfFulfilledOrder');
  };
</script>

<style scoped lang="scss">
  :deep(.el-step__icon-inner.is-status) {
    transform: translateY(0);
  }
</style>
