<template>
  <el-form :model="form" label-position="top">
    <KeenCard title="店铺信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺名称" prop="shopCommonInfo.name">
            {{ form.shopCommonInfo.name }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺账号" prop="shopCommonInfo.shopAccount">
            {{ form.shopCommonInfo.shopAccount }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="渠道" prop="shopCommonInfo.platform">
            {{ form.shopCommonInfo.platform }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="站点" prop="shopCommonInfo.site">
            {{ form.shopCommonInfo.site }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺属性" prop="shopCommonInfo.shopProperty">
            {{ form.shopCommonInfo.shopPropertyDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺状态" prop="">
            <Tag style="margin: 10px 0" :color="statusColorMap[form.shopCommonInfo.errorStatus]">
              {{ form.shopCommonInfo.errorStatusDesc }}
            </Tag>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="授权状态" prop="shopCommonInfo.authStatus">
            <Tag style="margin: 10px 0" :color="statusColorMap[form.shopCommonInfo.authStatus]">
              {{ form.shopCommonInfo.authStatusDesc }}
            </Tag>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="易仓店铺账号" prop="shopCommonInfo.ecShopAccount">
            {{ form.shopCommonInfo.ecShopAccount }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="易仓店铺状态" prop="shopCommonInfo.ecStatusDesc">
            <Tag
              v-if="form.shopCommonInfo.ecStatusDesc"
              :color="ecColorMap[form.shopCommonInfo.ecStatusDesc]"
            >
              {{ form.shopCommonInfo.ecStatusDesc }}
            </Tag>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0" v-if="form.shopCommonInfo.platform === 'amazon'">
          <el-form-item label="船长店铺账号" prop="shopCommonInfo.captainShopAccount">
            {{ form.shopCommonInfo.captainShopAccount }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0" v-if="form.shopCommonInfo.platform === 'amazon'">
          <el-form-item label="船长店铺状态" prop="shopCommonInfo.ecShopAccount">
            <Tag
              v-if="form.shopCommonInfo.captainStatusDesc"
              :color="capColorMap[form.shopCommonInfo.captainStatusDesc]"
            >
              {{ form.shopCommonInfo.captainStatusDesc }}
            </Tag>
            <span v-else>--</span>
          </el-form-item>
        </el-col>
        <el-col :md="18" :sm="24" :offset="0">
          <el-form-item label="备注" prop="shopCommonInfo.remark">
            {{ form.shopCommonInfo.remark }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="账号信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册手机">
            {{ form.shopAccountInfo.registerPhoneNumber }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册邮箱">
            {{ form.shopAccountInfo.registerEmail }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="卖家ID">
            {{ form.shopAccountInfo.sellerId }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册公司名称">
            {{ form.shopAccountInfo.registerCompanyName }}
          </el-form-item>
        </el-col>
        <el-col :md="24" :offset="0">
          <el-form-item label="注册公司地址">
            {{ form.shopAccountInfo.registerCompanyAddress }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="经营信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="企业名称" prop="businessCode">
            {{ form.shopBusinessInfo.companyName }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="统一社会信用代码">
            {{ form.shopBusinessInfo.unifiedSocialCreditCode }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="经营状态">
            {{ form.shopBusinessInfo.statusDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人">
            {{ form.shopBusinessInfo.companyLegalPerson }}
          </el-form-item>
        </el-col>
        <el-col :md="24" :offset="0">
          <el-form-item label="经营地址">
            {{ form.shopBusinessInfo.address }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="收付款信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="收款账号">
            {{ form.shopFinanceInfo.receivingAccount }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="收款账号银行识别码">
            {{ form.shopFinanceInfo.receivingAccountBankIdentificationCode }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="信用卡">
            {{ form.shopFinanceInfo.creditCardNumber }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="信用卡持卡人姓名">
            {{ form.shopFinanceInfo.creditCardHolder }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="shopdetail">
import { shopApi } from '@/api';
  import { cloneDeep } from 'lodash-es';

  const statusColorMap = reactive({
    0: 'blue',
    1: 'green',
    2: 'red',
  });

  const ecColorMap = reactive({
    启用: 'green',
    停用: 'red',
    授权中: 'purple',
    关店: 'gray',
  });
  const capColorMap = reactive({
    可用: 'green',
    不可用: 'red',
  });

  const route = useRoute();
  const router = useRouter();
  const formOrigin = {
    businessCode: '',
    shopAccountInfo: {
      registerCompanyAddress: '',
      registerCompanyName: '',
      registerEmail: '',
      registerPhoneNumber: '',
      sellerId: '',
    },
    shopCommonInfo: {
      authStatus: 0,
      captainShopAccount: '',
      ecShopAccount: '',
      errorStatus: 0,
      name: '',
      platform: '',
      remark: '',
      shopAccount: '',
      shopCode: '',
      shopProperty: 0,
      site: '',
    },
    shopFinanceInfo: {
      creditCardHolder: '',
      creditCardNumber: '',
      receivingAccount: '',
      receivingAccountBankIdentificationCode: '',
    },
    shopBusinessInfo: {
      address: '',
      companyLegalPerson: '',
      companyName: '',
      registerCompanyName: '',
      status: 0,
      statusDesc: '',
      unifiedSocialCreditCode: '',
    },
  };
  const form = ref({ ...cloneDeep(formOrigin) });
  const getDetailData = async () => {
    const res = await shopApi.luteosShopQueryShopDetail({
      shopCode: route.query.code,
    });
    form.value = res;
  };
  getDetailData();
</script>

<style scoped lang="scss"></style>
