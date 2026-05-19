<template>
  <el-form scroll-to-error :model="form" ref="formRef" label-width="150px">
    <KeenCard title="订单信息">
      <template #statusTag>
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
          <el-form-item label="卖家账号：">
            {{ form.baseInfo.shopAccount || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="Reference No：">
            {{ form.baseInfo.sampleCode || '-' }}
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
          <el-form-item label="创建时间：">
            {{ form.baseInfo.createTime || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="付款时间：">{{ form.baseInfo.payTime || '-' }}</el-form-item>
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
            {{ form.baseInfo.psampleCode }}
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
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18" :offset="0">
          <el-form-item label="客服备注：">
            {{ form.baseInfo.customRemark || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="收件信息">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="红人账号：" prop="receiveInfo.userChannel">
            {{ form.receiveInfo.userChannel || '-' }}
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
        <el-table-column prop="productName" min-width="240px" label="产品名称" />
        <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
        <el-table-column prop="deliveryDesc" label="发货方式" width="180px" />
        <el-table-column prop="warehouseDesc" width="220px" label="发货仓库" />
        <el-table-column prop="supplySku" label="供应链SKU" width="220px" />
        <el-table-column prop="num" label="数量" width="100px" />
        <el-table-column prop="shippingDesc" min-width="100px" width="220px" label="配送方式" />
      </el-table>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="samplesendDetail">
  import { useRouter, useRoute } from 'vue-router';
  import { metaApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';

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
  const route = useRoute();
  const router = useRouter();
  const formRef = ref();
  const form = ref<any>({
    baseInfo: {
      cod: 0,
      currencyCode: '',
      customRemark: '',
      freightAmount: 0,
      sampleCode: '',
      shopAccount: '',
      transactionAmount: 0,
      dingRemark: '',
      payTime: '',
      currencyDesc: '',
    },
    itemInfoList: [],
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
      userCode: '',
      userChannel: '',
      zipcode: '',
      countryDesc: '',
    },
  });
  const getDetailData = async () => {
    const res: any = await metaApi.luteosMetaV3SampleorderQueryDetail({
      orderCode: route.query.code as string,
    });
    form.value = res;
  };
  getDetailData();
</script>

<style scoped lang="scss"></style>
