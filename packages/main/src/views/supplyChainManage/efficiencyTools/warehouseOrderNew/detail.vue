<template>
  <el-form :model="form" ref="formRef" label-width="150px">
    <el-tabs v-model="activated" tab-position="top">
      <el-tab-pane label="订单信息" :name="1">
        <KeenCard title="销售出库单号" position="start">
          <template #operation>
            <span>{{ form.baseInfo?.code }}</span>
            <Tag style="margin-left: 12px" size="large" :color="tagColor(form.baseInfo?.status)">
              {{ form.baseInfo?.statusDesc || '-' }}
            </Tag>
          </template>
          <el-row :gutter="20">
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="销售订单：" v-if="type === 1">
                {{ form.baseInfo?.saleCode || '-' }}
              </el-form-item>
              <el-form-item label="OA申请订单：" v-if="type === 2">
                {{ form.baseInfo?.erpCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="参考单号：">
                {{ form.baseInfo?.saleCodeRefNum || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="跟踪号：">
                {{ form.baseInfo?.saleCodeTrackNum || '-' }}
                <span
                  v-if="form.baseInfo?.moreSaleCodeTrackNum && form.baseInfo?.saleCodeTrackNum"
                  class="text-danger"
                >
                  （多）
                </span>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="运单号：">
                {{ form.baseInfo?.waybillNo || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="仓配系统：">
                {{ form.baseInfo?.systemTypeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="第三方销售订单号：">
                {{ form.baseInfo?.systemSaleCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="第三方出库单号：">
                {{ form.baseInfo?.systemCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="重量：">
                {{ form.baseInfo?.weight || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="创建时间：">{{ form.baseInfo?.createTime || '-' }}</el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="出库时间：">
                {{ form.baseInfo?.outTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="备注：">
                {{ form.baseInfo?.remark || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="销售订单" position="start" v-if="type === 1">
          <template #operation>
            <span>{{ form.baseInfo?.saleCode }}</span>
          </template>
          <el-row :gutter="20">
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="卖家账号：">
                {{ form.orderDetailResp.baseInfo?.shopAccount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="参考单号：">
                {{ form.orderDetailResp.baseInfo?.refNo || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="运费：">
                {{ form.orderDetailResp.baseInfo?.freightAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="货币类型：">
                {{ form.orderDetailResp.baseInfo?.currencyDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="交易额：">
                {{ form.orderDetailResp.baseInfo?.transactionAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="销售运费：">
                {{ form.orderDetailResp.baseInfo?.salesFreightAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="付款时间：">
                {{ form.orderDetailResp.baseInfo?.payTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="实际交易额：">
                {{ form.orderDetailResp.baseInfo?.realTransactionAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="折扣金额：">
                {{ form.orderDetailResp.baseInfo?.discountAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="原订单：">
                {{ form.orderDetailResp.baseInfo?.pcode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="总金额：">
                {{ form.orderDetailResp.baseInfo?.amount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="创建时间：">
                {{ form.orderDetailResp.baseInfo?.createTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="跟踪号：">
                {{ form.orderDetailResp.baseInfo?.trackOrderCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="是否为COD订单：">
                {{ form.orderDetailResp.baseInfo?.codDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="审核时间：">
                {{ form.orderDetailResp.baseInfo?.authTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="唛头：">
                {{ form.orderDetailResp.baseInfo?.shippingMark || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="积加订单号：">
                <span v-if="form.baseInfo?.systemType === 1">
                  {{ form.orderDetailResp.baseInfo?.orderCode || '-' }}
                </span>
                <span v-else>-</span>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="客服备注：">
                {{ form.orderDetailResp.baseInfo?.customRemark || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="发货时间：">
                {{ form.orderDetailResp.baseInfo?.sendTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="交货方式：">
                {{ form.orderDetailResp.baseInfo?.deliverTypeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="预计到货时间：">
                {{ form.orderDetailResp.baseInfo?.expectedArrivalTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :sm="24" :offset="0">
              <el-form-item label="备注：">
                <!-- <div
                  class="w-100"
                  v-for="item in form?.orderDetailResp?.orderRemarkList"
                  :key="item?.id"
                >
                  {{ item?.remark }}
                </div> -->
                <div class="w-100">
                  {{
                    form?.orderDetailResp?.orderRemarkList?.length &&
                    form?.orderDetailResp?.orderRemarkList[0].remark
                  }}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="收件信息">
          <el-row :gutter="20">
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="客户名称：">
                {{
                  form.orderDetailResp.receiveInfo?.customerDesc ||
                  form.orderDetailResp.receiveInfo?.customerName ||
                  '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人：" prop="receiveInfo.name">
                {{ form.orderDetailResp.receiveInfo?.name || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="Email：" prop="receiveInfo.email">
                {{ form.orderDetailResp.receiveInfo?.email || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人国家或地址：" prop="receiveInfo.countryCode">
                {{ form.orderDetailResp.receiveInfo?.countryDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人省/州：" prop="receiveInfo.province">
                {{ form.orderDetailResp.receiveInfo?.province || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="城市：" prop="receiveInfo.city">
                {{ form.orderDetailResp.receiveInfo?.city || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="区/县：" prop="receiveInfo.area">
                {{ form.orderDetailResp.receiveInfo?.area || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="地址：" prop="receiveInfo.address">
                {{ form.orderDetailResp.receiveInfo?.address || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="地址2：" prop="receiveInfo.address2">
                {{ form.orderDetailResp.receiveInfo?.address2 || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="门牌号：" prop="receiveInfo.houseNumber">
                {{ form.orderDetailResp.receiveInfo?.houseNumber || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人号码：" prop="receiveInfo.phone">
                {{ form.orderDetailResp.receiveInfo?.phone || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="邮编：" prop="receiveInfo.zipcode">
                {{ form.orderDetailResp.receiveInfo?.zipcode || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="产品信息">
          <el-table :data="form.orderDetailResp.itemInfoList">
            <el-table-column label="序号">
              <template #default="{ $index }">{{ $index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="productName" min-width="240px" label="产品名称" />
            <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
            <el-table-column prop="suggestPrice" min-width="200px" label="建议售价" />
            <el-table-column prop="postalPrice" min-width="150" label="报价" />
            <el-table-column prop="price" label="销售单价" />
            <el-table-column prop="deliveryDesc" label="发货方式" width="180px" />
            <el-table-column prop="warehouseDesc" width="220px" label="发货仓库" />
            <el-table-column
              :prop="route.query.type === '2' ? 'productSku' : 'supplySku'"
              label="供应链SKU"
              width="220px"
            />
            <el-table-column
              :prop="route.query.type === '2' ? 'qty' : 'num'"
              label="数量"
              width="100px"
            />
            <el-table-column label="单位">
              <template #default="{ row }">
                <span>{{ row?.unitDesc || '件' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shippingDesc" min-width="100px" width="220px" label="配送方式" />
            <el-table-column prop="upc" label="UPC码" />
            <el-table-column prop="ean" label="EAN码" />
          </el-table>
        </KeenCard>
      </el-tab-pane>
      <el-tab-pane label="费用信息" :name="2">
        <KeenCard title="库内费用">
          <vxe-table
            auto-resize
            style="background-color: #fff"
            :data="form.feeDetail?.warehouseExpensesList"
          >
            <vxe-table-column field="feeType" title="费用类型" />
            <vxe-table-column field="fee" title="金额" />
            <vxe-table-column field="unit" title="计费单位" />
            <vxe-table-column field="time" title="计费时间" />
          </vxe-table>
        </KeenCard>
        <KeenCard title="尾程费用">
          <vxe-table
            auto-resize
            style="background-color: #fff"
            :data="form.feeDetail?.finalChargeList"
          >
            <vxe-table-column field="feeType" title="费用类型" />
            <vxe-table-column field="fee" title="金额" />
            <vxe-table-column field="unit" title="计费单位" />
            <vxe-table-column field="time" title="计费时间" />
          </vxe-table>
        </KeenCard>
        <KeenCard title="其他费用">
          <vxe-table
            auto-resize
            style="background-color: #fff"
            :data="form.feeDetail?.otherChargeList"
          >
            <vxe-table-column field="feeType" title="费用类型" />
            <vxe-table-column field="fee" title="金额" />
            <vxe-table-column field="unit" title="计费单位" />
            <vxe-table-column field="time" title="计费时间" />
          </vxe-table>
        </KeenCard>
        <KeenCard title="多箱费用明细">
          <vxe-table
            auto-resize
            style="background-color: #fff"
            :data="form.feeDetail?.woPackCharge"
          >
            <vxe-table-column field="number" title="箱号" />
            <vxe-table-column field="trackingNum" title="跟踪号" />
            <vxe-table-column field="packageSpec" title="箱规（cm）" />
            <vxe-table-column field="weight" title="重量" />
            <vxe-table-column field="logisticsForgetSurcharge" title="物流忘记附加费" />
            <vxe-table-column field="packageMaiCharge" title="箱唛费" />
          </vxe-table>
        </KeenCard>
      </el-tab-pane>
      <el-tab-pane label="装箱信息" :name="3">
        <vxe-table auto-resize style="background-color: #fff" :data="form.packInfoList">
          <vxe-column type="seq" title="序号" width="60" />
          <vxe-table-column field="number" title="箱号" />
          <vxe-table-column field="packageMaiNum" title="箱唛号" />
          <vxe-table-column field="fbaPackageMaiNum" title="FBA箱唛号" />
          <vxe-table-column field="trackingNum" title="跟踪号" />
          <vxe-table-column field="productSku" title="商品编码" />
          <vxe-table-column field="qty" title="数量" />
          <vxe-table-column field="packageSpec" title="箱规（cm）" />
          <vxe-table-column field="weight" title="重量" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="日志信息" :name="4">
        <vxe-table auto-resize style="background-color: #fff" :data="form.logBeanList">
          <vxe-table-column field="operationTypeDesc" title="日志名称" />
          <vxe-table-column field="updateTime" title="更新时间" />
          <vxe-table-column field="operator" title="操作人" />
          <vxe-table-column field="itemContent" title="备注" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="附件" :name="5">
        <KeenCard title="销售附件">
          <vxe-table
            auto-resize
            style="background-color: #fff"
            :data="form.orderDetailResp.orderAttachmentList"
          >
            <vxe-table-column field="fileName" title="附件名称" min-width="200px">
              <template #default="{ row }">
                <div>{{ row.fileName }}</div>
                <Tag v-if="row?.attachmentType === 1" color="yellow">指定装箱附件</Tag>
                <Tag v-if="row?.attachmentType === 2" color="blue">订单详情附件</Tag>
              </template>
            </vxe-table-column>
            <vxe-table-column field="updateTime" title="更新时间" />
            <vxe-table-column field="operator" title="操作人" />
            <vxe-table-column title="操作">
              <template #default="{ row }">
                <el-space>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="downloadFile(row.fileUrl, row.fileName)"
                  >
                    下载
                  </el-link>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="handleCutAtt(row)"
                    v-if="row.canCut"
                  >
                    裁剪
                  </el-link>
                </el-space>
              </template>
            </vxe-table-column>
          </vxe-table>
        </KeenCard>
        <KeenCard title="物流附件">
          <vxe-table auto-resize style="background-color: #fff" :data="form.attachmentList">
            <vxe-table-column field="fileName" title="附件名称" />
            <vxe-table-column field="updateTime" title="更新时间" />
            <vxe-table-column field="operator" title="操作人" />
            <vxe-table-column title="操作">
              <template #default="{ row }">
                <el-space>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="downloadFile(row.fileUrl, row.fileName)"
                  >
                    下载
                  </el-link>
                  <el-link type="danger" :underline="false" @click="handleDelete(row)">
                    删除
                  </el-link>
                </el-space>
              </template>
            </vxe-table-column>
          </vxe-table>
        </KeenCard>
      </el-tab-pane>
      <el-tab-pane
        v-if="form?.guCangTransferSlipOrderBean"
        :label="form.baseInfo?.systemTypeDesc ? form.baseInfo?.systemTypeDesc + '信息' : '交运信息'"
        :name="6"
      >
        <FBAPush
          v-if="form?.guCangTransferSlipOrderBean?.type === 1"
          :code="form.baseInfo?.code"
          mode="detail"
        />
        <OtherTransfers
          v-if="form?.guCangTransferSlipOrderBean?.type === 2"
          :code="form.baseInfo?.code"
          mode="detail"
        />
      </el-tab-pane>
      <el-tab-pane label="装板信息" :name="7">
        <BumperInfo
          :orderCode="form.baseInfo.systemCode"
          ref="bumperInfoRef"
          @refresh="refreshGcInfo"
        />
      </el-tab-pane>
      <el-tab-pane label="物流轨迹" :name="8">
        <LogisticsTrajectory
          :orderCode="form.baseInfo.systemCode"
          ref="logisticsTrajectoryRef"
          @refresh="refreshGcInfo"
        />
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup lang="ts" name="warehouseOrderNewDetail">
  import { erpApi, omsApi } from '@/api';
  import * as swal from '@/utils/swal';
  import axios from 'axios';
  import FBAPush from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/FBAPush.vue';
  import OtherTransfers from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/OtherTransfers.vue';
  import BumperInfo from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/BumperInfo.vue';
  import LogisticsTrajectory from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/LogisticsTrajectory.vue';

  const statusColorMap = {
    100: 'blue',
    200: 'purple',
    300: 'yellow',
    500: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    504: 'red',
    505: 'red',
    515: 'red',
    516: 'red',
    517: 'red',
    518: 'red',
    519: 'red',
    600: 'gray',
  };
  const tagColor = (status: any) => {
    if (statusColorMap[status]) {
      return statusColorMap[status];
    }
    if (status > 500 && status < 600) {
      return 'red';
    }
    return '';
  };
  const activated = ref(1);
  const route = useRoute();
  const type = computed(() => parseInt(route.query?.type, 10));

  if (route.query.activated) activated.value = parseInt(route.query?.activated, 10);

  const form = ref({
    baseInfo: {},
    attachmentList: [],
    feeDetail: {
      warehouseExpensesList: [],
      finalChargeList: [],
      woPackCharge: [],
    },
    logBeanList: [],
    packInfoList: [],
    orderDetailResp: {
      baseInfo: {},
      receiveInfo: {},
      itemInfoList: [],
      orderAttachmentList: [],
    },
  });

  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await omsApi.omsWarehouseOrderQueryDetail({
        code: route.query.code as string,
      });
      form.value = res;
      if (route.query?.type == 2) {
        form.value.orderDetailResp = res?.odoDetailResp || {};
      }
      console.log(form.value);
    }
  };
  getDetailData();

  const handleDelete = async (row) => {
    // todo 删除附件
    const isConfirm = await swal.confirm('确定删除该附件？');
    if (isConfirm) {
      await erpApi.luteosErpOrderDeleteAtt({
        id: row.id,
      });
      getDetailData();
    }
  };

  // 裁剪附件
  const handleCutAtt = async (row) => {
    const isConfirm = await swal.confirm('确定裁剪该附件？');
    if (isConfirm) {
      await omsApi.omsWarehouseOrderCutAtt({
        code: form.value.baseInfo?.code,
        attachmentInfoList: [
          {
            fileName: row.fileName,
            fileUrl: row.ossKey,
          },
        ],
      });
      getDetailData();
    }
  };

  // 下载附件
  const downloadFile = async (fileUrl, fileName) => {
    const res = await axios.get(fileUrl, { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  };
</script>

<style scoped lang="scss"></style>
