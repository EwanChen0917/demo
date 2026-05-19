<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-position="top" scroll-to-error>
    <KeenCard title="店铺信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺名称" prop="shopCommonInfo.name">
            <el-input v-model="form.shopCommonInfo.name" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0" v-if="false">
          <el-form-item label="店铺账号" prop="shopCommonInfo.shopAccount">
            <el-input disabled v-model="form.shopCommonInfo.shopAccount" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="渠道" prop="shopCommonInfo.platform">
            <ProductChannelSelect
              style="width: 100%"
              :disabled="route.query.code"
              v-model="form.shopCommonInfo.platform"
              clearable
              filterable
              placeholder="渠道"
            />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="站点" prop="shopCommonInfo.site">
            <CountrySelect
              style="width: 100%"
              v-model="form.shopCommonInfo.site"
              clearable
              filterable
              placeholder="站点"
            />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺属性" prop="shopCommonInfo.shopProperty">
            <el-select
              style="width: 100%"
              v-model="form.shopCommonInfo.shopProperty"
              placeholder="店铺属性"
              clearable
            >
              <el-option label="主号" :value="0" />
              <el-option label="小号" :value="1" />
              <el-option label="备用号" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="店铺状态" prop="shopCommonInfo.errorStatus">
            <el-radio-group v-model="form.shopCommonInfo.errorStatus">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">异常</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="授权状态" prop="shopCommonInfo.authStatus">
            <el-select
              style="width: 100%"
              v-model="form.shopCommonInfo.authStatus"
              placeholder="授权状态"
              clearable
            >
              <el-option label="未授权" :value="0" />
              <el-option label="已授权" :value="1" />
              <el-option label="异常" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="易仓店铺账号" prop="shopCommonInfo.ecShopAccount">
            <el-input v-model="form.shopCommonInfo.ecShopAccount" :disabled="route.query.code" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0" v-if="form.shopCommonInfo.platform === 'amazon'">
          <el-form-item label="船长店铺账号" prop="shopCommonInfo.captainShopAccount">
            <el-input
              v-model="form.shopCommonInfo.captainShopAccount"
              :disabled="route.query.code"
            />
          </el-form-item>
        </el-col>
        <el-col :md="18" :sm="24" :offset="0">
          <el-form-item label="备注" prop="shopCommonInfo.remark">
            <el-input v-model="form.shopCommonInfo.remark" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="账号信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册手机">
            <el-input v-model="form.shopAccountInfo.registerPhoneNumber" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册邮箱">
            <el-input v-model="form.shopAccountInfo.registerEmail" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="卖家ID">
            <el-input v-model="form.shopAccountInfo.sellerId" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册公司名称">
            <el-input v-model="form.shopAccountInfo.registerCompanyName" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :offset="0">
          <el-form-item label="注册公司地址">
            <el-input v-model="form.shopAccountInfo.registerCompanyAddress" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="经营信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="企业名称" prop="businessCode">
            <el-select
              v-model="form.businessCode"
              @change="handleCompanyChange"
              filterable
              style="width: 100%"
            >
              <el-option
                v-for="item in companyList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="统一社会信用代码">
            <el-input disabled v-model="form.shopBusinessInfo.unifiedSocialCreditCode" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="经营状态">
            <el-input disabled v-model="form.shopBusinessInfo.statusDesc" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人">
            <el-input disabled v-model="form.shopBusinessInfo.companyLegalPerson" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :offset="0">
          <el-form-item label="经营地址">
            <el-input disabled v-model="form.shopBusinessInfo.address" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="收付款信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="收款账号">
            <el-input v-model="form.shopFinanceInfo.receivingAccount" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="收款账号银行识别码">
            <el-input v-model="form.shopFinanceInfo.receivingAccountBankIdentificationCode" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="信用卡">
            <el-input v-model="form.shopFinanceInfo.creditCardNumber" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="信用卡持卡人姓名">
            <el-input v-model="form.shopFinanceInfo.creditCardHolder" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { shopApi, platformApi, dataApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
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

  const router = useRouter();
  const route = useRoute();
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
      errorStatus: 1,
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
  const formRef = ref();
  const rules = reactive({
    'shopCommonInfo.name': [
      {
        required: true,
        message: '请输入店铺名称',
        trigger: 'blur',
      },
    ],
    'shopCommonInfo.shopAccount': [
      {
        required: true,
        message: '请输入店铺账号',
        trigger: 'blur',
      },
    ],
    'shopCommonInfo.platform': [{ required: true, message: '请选择渠道', trigger: 'change' }],
    'shopCommonInfo.shopProperty': [
      { required: true, message: '请选择店铺属性', trigger: 'change' },
    ],
    'shopCommonInfo.site': [{ required: true, message: '请输选择站点', trigger: 'change' }],
    'shopCommonInfo.ecShopAccount': [
      { required: true, message: '请输入易仓店铺账号', trigger: 'blur' },
    ],
    'shopCommonInfo.captainShopAccount': [
      { required: true, message: '请输入船长店铺账号', trigger: 'blur' },
    ],
    businessCode: [
      {
        required: true,
        message: '请选择公司',
        trigger: 'change',
      },
    ],
  });
  const getDetailData = async () => {
    const res = await shopApi.luteosShopQueryShopDetail({
      shopCode: route.query.code,
    });
    form.value = res;
  };
  const platformOptions = ref<any[]>([]);
  const getPlatformOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['shop_platform'],
    });
    platformOptions.value = res.dictMap?.shop_platform as [];
  };
  getPlatformOptions();
  const siteList = ref<any[]>([]);
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    siteList.value = res.countryList!.map((item) => {
      return {
        label: item.countryName,
        value: item.countryCode,
      };
    });
  };
  getCountryList();
  const companyList = ref<any[]>([]);
  const getCompanyList = async () => {
    const res = await shopApi.luteosShopBusinessQueryList({
      pageSize: 200,
      pageNum: 1,
    });
    companyList.value = res.recordList as [];
  };
  getCompanyList();
  if (route.query.code) {
    getDetailData();
  }
  const handleCompanyChange = () => {
    const result = companyList.value.find((item) => item.code === form.value.businessCode);
    if (result) {
      form.value.shopBusinessInfo.address = result.address;
      form.value.shopBusinessInfo.character = result.character;
      form.value.shopBusinessInfo.status = result.status;
      form.value.shopBusinessInfo.statusDesc = result.statusDesc;
      form.value.shopBusinessInfo.companyLegalPerson = result.companyLegalPerson;
      form.value.shopBusinessInfo.unifiedSocialCreditCode = result.unifiedSocialCreditCode;
    }
  };
  const saveLoading = ref(false);
  const cancel = () => {
    router.push({
      name: 'shoplist',
    });
  };
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => false);
    if (valid) {
      await shopApi.luteosShopSaveOrUpdate({
        ...form.value,
      });
      ElMessage.success('操作成功');
      closeTabAndRefresh('shoplist');

      cancel();
    }
  };
</script>

<style scoped lang="scss"></style>
