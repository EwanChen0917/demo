<template>
  <el-form label-position="top">
    <KeenCard title="企业信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="企业名称" prop="name">
            {{ form.name }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
            {{ form.unifiedSocialCreditCode }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="成立时间" prop="establishedTime">
            {{ form.establishedTime }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="注册资本" prop="registeredCapital">
            {{ form.registeredCapital }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="账号属性" prop="propertyDesc">
            {{ form.propertyDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="经营状态" prop="status">
            <Tag style="margin: 10px 0" :color="statusColorMap[form.status]">
              {{ form.statusDesc }}
            </Tag>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="企业性质" prop="character">
            {{ form.characterDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :offset="0">
          <el-form-item label="注册地址" prop="registeredAddress">
            {{ form.registeredAddress }}
          </el-form-item>
        </el-col>
        <el-col :md="18" :sm="24" :offset="0">
          <el-form-item label="经营范围" prop="businessScope">
            {{ form.businessScope }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="法人信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人" prop="companyLegalPerson">
            {{ form.companyLegalPerson }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人身份证" prop="companyLegalPersonCard">
            {{ form.companyLegalPersonCard }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="公司章">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="章数" prop="commonSealNum">
            {{ form.commonSealNum }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="营业执照" prop="hasBusinessLicense">
            {{ form.hasBusinessLicenseDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="公章" prop="hasCommonSeal">
            {{ form.hasCommonSealDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="财务章" prop="hasFinanceSeal">
            {{ form.hasFinanceSealDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="发票章" prop="hasInvoiceSeal">
            {{ form.hasInvoiceSealDesc }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人章" prop="hasLegalPersonSeal">
            {{ form.hasLegalPersonSealDesc }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="operatingManagementDetail">
import { shopApi } from '@/api';
  import { cloneDeep } from 'lodash-es';

  const statusColorMap = {
    1: 'green',
    2: 'red',
  };
  const router = useRouter();
  const route = useRoute();
  const initDetail = async () => {
    const res = await shopApi.luteosShopBusinessQueryDetail({
      code: route.query.code,
    });
    form.value = res;
  };
  if (route.query.code) {
    initDetail();
  }
  const formOrigin = {
    bigStatus: 0,
    businessScope: '',
    character: 0,
    characterDesc: '',
    code: '',
    commonSealNum: 0,
    companyLegalPerson: '',
    companyLegalPersonCard: '',
    establishedTime: '',
    hasBusinessLicense: 0,
    hasBusinessLicenseDesc: '',
    hasCommonSeal: 0,
    hasCommonSealDesc: '',
    hasFinanceSeal: 0,
    hasFinanceSealDesc: '',
    hasInvoiceSeal: 0,
    hasInvoiceSealDesc: '',
    hasLegalPersonSeal: 0,
    hasLegalPersonSealDesc: '',
    name: '',
    registeredAddress: '',
    registeredCapital: '',
    status: 1,
    statusDesc: '',
    unifiedSocialCreditCode: '',
    propertyDesc: '',
  };
  const form = ref({ ...cloneDeep(formOrigin) });
</script>

<style scoped lang="scss"></style>
