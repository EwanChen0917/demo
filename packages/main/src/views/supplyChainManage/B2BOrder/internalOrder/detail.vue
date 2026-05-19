<template>
  <KeenCard v-if="form.baseInfo.orderStatus !== 101">
    <AuditHeader :flowName="form.baseInfo?.flowName" :authNodeList="form.authNodeList" />
  </KeenCard>
  <el-form :model="form" ref="formRef" label-width="150px">
    <el-tabs v-model="activated" tab-position="top">
      <el-tab-pane label="订单信息" :name="1">
        <KeenCard title="订单信息" position="start">
          <template #operation>
            <span>{{ form.baseInfo.erpCode }}</span>
            <Tag
              style="margin-left: 12px"
              size="large"
              :color="statusColorMap[form.baseInfo.orderStatus]"
            >
              {{ form.baseInfo.orderStatusDesc || '-' }}
            </Tag>
          </template>
          <el-row :gutter="20">
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="卖家账号：" prop="baseInfo.shopAccount">
                {{ form.baseInfo.shopAccount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="Reference No：">
                {{ form.baseInfo.erpCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="参考单号：">
                {{ form.baseInfo.refNo || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="运费：">
                {{ form.baseInfo.freightAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="货币类型：">
                {{ form.baseInfo.currencyDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="交易额：">
                {{ form.baseInfo.transactionAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="销售运费：">
                {{ form.baseInfo.salesFreightAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="付款时间：">{{ form.baseInfo.payTime || '-' }}</el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="实际交易额：">
                {{ form.baseInfo.realTransactionAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="折扣金额：">
                {{ form.baseInfo.discountAmount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="创建时间：">
                {{ form.baseInfo.createTime || '-' }}
              </el-form-item>
            </el-col>

            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="是否为COD订单：">否</el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="审核时间：">
                {{ form.baseInfo.authTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="原订单：">
                {{ form.baseInfo.pcode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="总金额：">
                {{ form.baseInfo.amount }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="发货时间：">
                {{ form.baseInfo.sendTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="跟踪号：">
                {{ form.baseInfo.trackOrderCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="易仓订单号：">
                {{ form.baseInfo.orderCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="预计到货时间：">
                {{ form.baseInfo.expectedArrivalTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="唛头：">
                {{ form.baseInfo.shippingMark || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="交货方式：">
                {{ form.baseInfo.deliverTypeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="总佣金：">
                {{ form.baseInfo.commission || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="客服备注：">
                {{ form.baseInfo.customRemark || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="期望发货时间：">
                {{ form.baseInfo.platformExpectedSendTime || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="平台送达时间：">
                {{ form.baseInfo.operationExpectedArrivalTime || '暂无' }} -
                {{ form.baseInfo.operationExpectedArrivalTimeEnd || '暂无' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="收件信息">
          <el-row :gutter="20">
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="客户名称：" prop="receiveInfo.customerDesc">
                {{ form.receiveInfo.customerDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人：" prop="receiveInfo.name">
                {{ form.receiveInfo.name || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="Email：" prop="receiveInfo.email">
                {{ form.receiveInfo.email || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人国家或地址：" prop="receiveInfo.countryCode">
                {{ form.receiveInfo.countryDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人省/州：" prop="receiveInfo.province">
                {{ form.receiveInfo.province || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="城市：" prop="receiveInfo.city">
                {{ form.receiveInfo.city || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="区/县：" prop="receiveInfo.area">
                {{ form.receiveInfo.area || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="地址：" prop="receiveInfo.address">
                {{ form.receiveInfo.address || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="地址2：" prop="receiveInfo.address2">
                {{ form.receiveInfo.address2 || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="门牌号：" prop="receiveInfo.houseNumber">
                {{ form.receiveInfo.houseNumber || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="收件人号码：" prop="receiveInfo.phone">
                {{ form.receiveInfo.phone || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="邮编：" prop="receiveInfo.zipcode">
                {{ form.receiveInfo.zipcode || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="产品信息">
          <el-table :data="form.itemInfoList">
            <el-table-column label="序号">
              <template #default="{ $index }">{{ $index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="productName" min-width="240px" label="产品名称" />
            <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
            <el-table-column prop="suggestPrice" min-width="200px" label="建议售价" />
            <el-table-column prop="postalPrice" min-width="150" label="报价" />
            <el-table-column prop="price" label="销售单价" />
            <el-table-column prop="commission" label="佣金" />
            <el-table-column prop="deliveryDesc" label="发货方式" width="180px" />
            <el-table-column prop="warehouseDesc" width="220px" label="发货仓库" />
            <el-table-column prop="supplySku" label="供应链SKU" width="220px" />
            <el-table-column prop="num" label="数量" width="100px" />
            <el-table-column label="单位">
              <template #default="{ row }">
                <span>{{ row?.unitDesc || '件' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shippingDesc" min-width="100px" width="220px" label="配送方式">
              <template #default="{ row }">
                <div>{{ row?.shippingDesc }}</div>
                <div class="text-warning fs-7">预估时效：{{ row?.timeliness }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="upcCode" label="UPC码" width="100px" />
            <el-table-column prop="eanCode" label="EAN码" width="100px" />
          </el-table>
        </KeenCard>
      </el-tab-pane>
      <el-tab-pane label="日志信息" :name="2">
        <vxe-table auto-resize style="background-color: #fff" :data="form.authLogList">
          <vxe-table-column field="name" title="日志名称" />
          <vxe-table-column field="updateTime" title="更新时间" />
          <vxe-table-column field="operatorName" title="操作人" />
          <vxe-table-column field="remark" title="备注" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="附件" :name="3">
        <vxe-table auto-resize style="background-color: #fff" :data="form.orderAttachmentList">
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
                <el-link type="danger" :underline="false" @click="handleDelete(row)">删除</el-link>
              </el-space>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="订单备注" :name="4">
        <vxe-table auto-resize style="background-color: #fff" :data="form.orderRemarkList">
          <vxe-table-column field="remark" title="备注信息" />
          <vxe-table-column field="updateTime" title="更新时间" />
          <vxe-table-column field="operator" title="操作人" />
        </vxe-table>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup lang="ts" name="internalOrderDetail">
  import { FormInstance } from 'element-plus';
  import { erpApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import * as swal from '@/utils/swal';
  import axios from 'axios';

  const statusColorMap = {
    200: 'purple',
    201: 'purple',
    300: 'yellow',
    400: 'green',
    500: 'red',
    504: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    600: 'gray',
  };
  const activated = ref(1);
  const route = useRoute();
  if (route.query.activated) activated.value = parseInt(route.query?.activated, 10);

  const router = useRouter();
  const formRef = ref<FormInstance>();
  const form = ref({
    baseInfo: {
      cod: 0,
      currencyCode: '',
      currencyDesc: '',
      customRemark: '',
      freightAmount: 0,
      erpCode: '',
      shopAccount: '',
      transactionAmount: 0,
      dingRemark: '',
      type: 1,
    },
    itemInfoList: [
      // {
      //   deliveryCode: '',
      //   num: 0,
      //   shippingCode: '',
      //   skuCode: '',
      //   supplySku: '',
      //   warehouseCode: '',
      // },
    ],
    receiveInfo: {
      address: '',
      area: '',
      city: '',
      countryCode: '',
      email: '',
      houseNumber: '',
      name: '',
      phone: '',
      province: '',
      customerCode: '',
      zipcode: '',
    },
    pass: undefined,
    remark: undefined,
  });

  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await erpApi.luteosErpOrderQueryDetail({
        erpCode: route.query.code as string,
        searchEdit: false,
      });
      form.value = res;
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

<style scoped lang="scss">
  :deep(.el-tabs__content) {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
</style>
