<template>
  <el-form ref="formRef" :model="form" label-width="150" scroll-to-error>
    <KeenCard title="注册信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司注册名称:">
            {{ form.basicInfo.companyName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营模式:">
            {{ form.basicInfo.businessModel || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册地址:">
            {{ form.basicInfo.registeredAddress || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商网址:">
            {{ form.basicInfo.website || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业性质:">
            {{ form.basicInfo.enterpriseNature || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总部地址:">
            {{ form.basicInfo.headquartersAddress || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成立时间:">
            <div v-if="form.basicInfo.establishmentDate">
              {{ form.basicInfo.establishmentDate.replace(' 00:00:00', '') }}
            </div>
            <div v-else>-</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册资本（万）:">
            {{ form.basicInfo.registeredCapital || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实缴资本（万）:">
            {{ form.basicInfo.contributedCapital || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否上市:">
            {{
              form.basicInfo.isListed == true ? '是' : form.basicInfo.isListed == false ? '否' : '-'
            }}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂家自评:">
            {{ form.basicInfo.selfEvaluation || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="基本信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="管理员工人数:">
            {{ form.basicInfo.managementStaffCount || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一线员工人数:">
            {{ form.basicInfo.staffCount || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="营业执照号码:">
            {{ form.basicInfo.businessLicenseNumber || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一般纳税人企业:">
            {{
              form.basicInfo.generalTaxpayer == true
                ? '是'
                : form.basicInfo.generalTaxpayer == false
                ? '否'
                : '-'
            }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="总经理:">
            {{ form.basicInfo.generalManager || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="总经理邮箱:">
            {{ form.basicInfo.managerEmail || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="总经理手机:">
            {{ form.basicInfo.managerPhone || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="总经理座机:">
            {{ form.basicInfo.managerTelephone || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属行业:">
            {{ form.basicInfo.industry || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务代表:">
            {{ form.basicInfo.businessRepresentative || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务代表邮箱:">
            {{ form.basicInfo.representativeEmail || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务代表手机:">
            {{ form.basicInfo.representativePhone || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务代表座机:">
            {{ form.basicInfo.representativeTelephone || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="股权架构">
      <el-table class="mt-4" :data="form?.equityStructures">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="名字" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            名字
          </template>
          <template #default="{ row, $index }">
            {{ row.shareholderName }}
          </template>
        </el-table-column>
        <el-table-column label="出资额" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            出资额（万元）
          </template>
          <template #default="{ row, $index }">
            {{ row.investmentAmount }}
          </template>
        </el-table-column>
        <el-table-column label="占总股本比例（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            占总股本比例（%）
          </template>
          <template #default="{ row, $index }">
            {{ row.shareRatio }}
          </template>
        </el-table-column>
        <el-table-column label="表决比例（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            表决比例（%）
          </template>
          <template #default="{ row, $index }">
            {{ row.votingRatio }}
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="体系认证情况">
      <el-table class="mt-4" :data="form?.certifications">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="认证证书" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            认证证书
          </template>
          <template #default="{ row, $index }">
            {{ row.certificateName }}
          </template>
        </el-table-column>
        <el-table-column label="认证情况" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            认证情况
          </template>
          <template #default="{ row, $index }">
            {{ row.isCertified ? '是' : row.isCertified == false ? '否' : '' }}
          </template>
        </el-table-column>
        <el-table-column label="认证编号" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            认证编号
          </template>
          <template #default="{ row, $index }">
            {{ row.certificateNumber }}
          </template>
        </el-table-column>
        <el-table-column label="有效期" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            有效期
          </template>
          <template #default="{ row, $index }">
            <div v-if="row.expDateStart">
              {{ row.expDateStart.replace(' 00:00:00', '') }}至{{
                row.expDateEnd.replace(' 00:00:00', '')
              }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="主要生产线">
      <el-table class="mt-4" :data="form?.productionLines">
        <el-table-column label="序号" width="100">
          <template #default="{ row, $index }">
            <div>产品线-{{ $index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column label="产品线" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            产品线
          </template>
          <template #default="{ row, $index }">
            {{ row.productLine }}
          </template>
        </el-table-column>
        <el-table-column label="月产能/单位" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            月产能/单位
          </template>
          <template #default="{ row, $index }">
            {{ row.monthlyCapacity }}
          </template>
        </el-table-column>
        <el-table-column label="月出货量/单位" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            月出货量/单位
          </template>
          <template #default="{ row, $index }">
            {{ row.monthlyShipment }}
          </template>
        </el-table-column>
        <el-table-column label="主要客户" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            主要客户
          </template>
          <template #default="{ row, $index }">
            {{ row.majorCustomers }}
          </template>
        </el-table-column>
        <el-table-column label="拟合作产品线" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            拟合作产品线
          </template>
          <template #default="{ row, $index }">
            {{
              row.cooperationProductLine ? '是' : row.cooperationProductLine == false ? '否' : ''
            }}
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="近三年营业额">
      <el-table class="mt-4" :data="form?.turnovers">
        <el-table-column label="年份" width="100">
          <template #default="{ row }">
            <el-input v-model.trim="row.year" placeholder="年份" disabled />
          </template>
        </el-table-column>
        <el-table-column label="营业额" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            营业额
          </template>
          <template #default="{ row, $index }">
            {{ row.turnover }}
          </template>
        </el-table-column>
        <el-table-column label="币种" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            币种
          </template>
          <template #default="{ row, $index }">
            <div v-if="row.currency">{{ `${row.currency}【${row.currencyName}】` }}</div>
          </template>
        </el-table-column>
        <el-table-column label="内销占比（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            内销占比（%）
          </template>
          <template #default="{ row, $index }">
            {{ row.domesticSalesRatio }}
          </template>
        </el-table-column>
        <el-table-column label="外销占比（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            外销占比（%）
          </template>
          <template #default="{ row, $index }">
            {{ row.exportSalesRatio }}
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="近三年主要客户">
      <el-table class="mt-4" :data="form?.majorCustomers">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="客户名" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            客户名
          </template>
          <template #default="{ row, $index }">
            {{ row.customerName }}
          </template>
        </el-table-column>
        <el-table-column label="交易产品" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            交易产品
          </template>
          <template #default="{ row, $index }">
            {{ row.transactionProduct }}
          </template>
        </el-table-column>
        <el-table-column label="年出货量" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            年出货量
          </template>
          <template #default="{ row, $index }">
            {{ row.yearShipment }}
          </template>
        </el-table-column>
        <el-table-column label="销售金额(万)" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            销售金额(万)
          </template>
          <template #default="{ row, $index }">
            {{ row.salesAmount }}
          </template>
        </el-table-column>
        <el-table-column label="币种" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            币种
          </template>
          <template #default="{ row, $index }">
            <div v-if="row.currency">{{ `${row.currency}【${row.currencyName}】` }}</div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="竞争对手">
      <el-table class="mt-4" :data="form?.competitors">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="公司名（全称）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            公司名（全称）
          </template>
          <template #default="{ row, $index }">
            {{ row.companyName }}
          </template>
        </el-table-column>
        <el-table-column label="所属国家或地区" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            所属国家或地区
          </template>
          <template #default="{ row, $index }">
            {{ row.countryRegion }}
          </template>
        </el-table-column>
        <el-table-column label="市场占有率（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            市场占有率（%）
          </template>
          <template #default="{ row, $index }">
            {{ row.marketShare }}
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>

    <KeenCard title="其他信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="生产方式:">
            {{ productionMethodList[form.basicInfo.productionMethod] || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推荐状态:">
            {{ auditStatusMap[auditRecords?.auditStatus] || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核备注:">
            {{ auditRecords?.auditorRemark || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in form?.auditRecords">
        <el-col :span="8">
          <el-form-item label="推荐供应商:">
            {{ form.basicInfo.companyName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推荐时间:">
            {{ item.auditTime || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推荐状态:">
            {{ auditStatusMap[item?.auditStatus] || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="supplyRecommendDetail">
  import { erpApi } from '@/api';
  import { nextTick } from 'vue';
  import { useTabs } from '@/hooks/tabs';
  import dayjs from 'dayjs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const productionMethodList = ['自制', '代工', '不生产'];
  const auditStatusMap = {
    INVITED: '待注册',
    REGISTERED: '待审核',
    APPROVED: '审核成功',
    REJECTED: '审核拒绝',
  };

  const formRef = ref();
  const form = ref({
    basicInfo: {
      businessLicenseNumber: '',
      businessModel: '',
      businessRepresentative: '',
      companyName: '',
      enterpriseNature: '',
      establishmentDate: '',
      generalManager: '',
      generalTaxpayer: undefined,
      headquartersAddress: '',
      industry: '',
      inviteCode: '',
      isListed: undefined,
      managementStaffCount: undefined,
      managerEmail: '',
      managerPhone: '',
      managerTelephone: '',
      productionMethod: null,
      registeredAddress: '',
      registeredCapital: undefined,
      representativeEmail: '',
      representativePhone: undefined,
      representativeTelephone: '',
      selfEvaluation: '',
      staffCount: undefined,
      website: '',
    },
    certifications: [
      {
        certificateName: '',
        certificateNumber: '',

        isCertified: undefined,
        supplierCode: '',
      },
    ],
    competitors: [
      {
        companyName: '',
        countryRegion: '',
        marketShare: undefined,
        supplierCode: '',
      },
      {
        companyName: '',
        countryRegion: '',
        marketShare: undefined,
        supplierCode: '',
      },
      {
        companyName: '',
        countryRegion: '',
        marketShare: undefined,
        supplierCode: '',
      },
    ],
    equityStructures: [
      {
        investmentAmount: undefined,
        shareRatio: undefined,
        shareholderName: '',
        supplierCode: '',
        votingRatio: undefined,
      },
    ],
    majorCustomers: [
      {
        currency: '',
        monthlyShipment: undefined,
        salesAmount: undefined,
        supplierCode: '',
        transactionProduct: '',
      },
      {
        currency: '',
        monthlyShipment: undefined,
        salesAmount: undefined,
        supplierCode: '',
        transactionProduct: '',
      },
      {
        currency: '',
        monthlyShipment: undefined,
        salesAmount: undefined,
        supplierCode: '',
        transactionProduct: '',
      },
    ],
    productionLines: [
      {
        cooperationProductLine: undefined,
        majorCustomers: '',
        monthlyCapacity: undefined,
        monthlyShipment: undefined,
        productLine: '',
        supplierCode: '',
      },
    ],
    turnovers: [
      {
        currency: '',
        domesticSalesRatio: undefined,
        exportSalesRatio: undefined,
        supplierCode: '',
        turnover: undefined,
        year: dayjs().format('YYYY') - 1,
      },
      {
        currency: '',
        domesticSalesRatio: undefined,
        exportSalesRatio: undefined,

        supplierCode: '',
        turnover: undefined,
        year: dayjs().format('YYYY') - 2,
      },
      {
        currency: '',
        domesticSalesRatio: undefined,
        exportSalesRatio: undefined,

        supplierCode: '',
        turnover: undefined,
        year: dayjs().format('YYYY') - 3,
      },
    ],
  });
  const pageType = ref('0');
  const auditRecords = ref({
    auditStatus: '',
    auditorRemark: '',
  });
  const initData = () => {
    if (route.name === 'supplierRegister') {
      pageType.value = '1';
    }
    if (route.name === 'supplyRecommendEdit') {
      pageType.value = '0';
    }
  };
  initData();
  const queryDetail = async () => {
    if (!route.query?.code) return;
    const res = await erpApi.luteosErpInviteSupplierQueryDetail({
      code: route.query?.code as string,
    });
    form.value = res;
    if (res.auditRecords?.length) {
      auditRecords.value = res.auditRecords[res.auditRecords?.length - 1];
    }
  };

  nextTick(() => {
    queryDetail();
  });

  onMounted(() => {});
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
      font-size: 12px;
    }
  }

  .el-form-item {
    :deep(.el-select .el-select__wrapper) {
      min-width: 120px;
    }
  }
</style>
