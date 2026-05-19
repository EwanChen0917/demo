<template>
  <el-form label-position="top">
    <el-tabs v-model="activated" tab-position="top">
      <el-tab-pane label="基础信息" :name="1">
        <KeenCard title="客户信息">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="客户编码" prop="code">
                {{ form.code || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="CRM客户编码" prop="crmCustomerCode">
                {{ form?.crmCustomerCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户名称" prop="name">
                {{ form.name || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户等级" prop="levelCode">
                {{ form.levelDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户类型" prop="type">
                {{ form.typeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="开发人员" prop="developCode">
                {{ form.developer || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="维护人员" prop="maintainCode">
                {{ form.maintainter || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="联系人" prop="contacts">
                {{ form.contacts || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="联系方式" prop="contactWay">
                {{ form.contactWay || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="邮箱" prop="email">
                {{ form.email || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="注册国家" prop="email">
                {{ form.registeredCountryDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="销售国家" prop="email">
                {{ form.countryDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="状态" prop="status">
                <div style="line-height: 44px">
                  <Tag :color="colorMap[form.status]">
                    {{ form.statusDesc }}
                  </Tag>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="交货方式" prop="deliverType">
                {{ form.deliverTypeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户归属部门" prop="organizationDeptName">
                {{ form.organizationDeptName || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户渠道" prop="orderSaleTypeDesc">
                <div class="text-break">{{ form.orderSaleTypeDesc?.join('、') || '-' }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否反向征税" prop="isReverseTax">
                {{ form?.isReverseTaxDesc || '-' }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="CRM客户编码" prop="crmCustomerCode">
                {{ form?.crmCustomerCode || '-' }}
              </el-form-item>
            </el-col> -->
            <!--            <el-col :span="6" :offset="0">
              <el-form-item label="销售地区" prop="saleCountry">
                {{ form.saleCountryDesc || '-' }}
              </el-form-item>
            </el-col>-->
          </el-row>
        </KeenCard>
        <KeenCard title="结算信息">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="收款条件" prop="paymentTermsDesc">
                {{ form.paymentTermsDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="结算方式" prop="settlementType">
                {{ form.settlementMethodDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="结算周期" prop="settlementPeriod">
                {{ form.settlementPeriod ? `${form.settlementPeriod}（天）` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="结算账号" prop="settlementAccount">
                {{ form.settlementAccount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="合同签约主体" prop="contractSubject">
                {{ form.contractSubject || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="主体收款账号" prop="subjectAccount">
                {{ form.subjectAccount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="是否信用额度管理" prop="subjectAccount">
                {{ form.creditFlagDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="是否现金额度管理" prop="subjectAccount">
                {{ form.cashCreditFlagDesc || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="收件信息">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="收件人" prop="recevicer">
                {{ form.recevicer || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="收件人号码" prop="recevicerPhone">
                {{ form.recevicerPhone || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="Email" prop="recevicerEmail">
                {{ form.recevicerEmail || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="邮编" prop="recevicerZipCode">
                {{ form.recevicerZipCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" prop="recevicerCountry">
              <el-form-item label="收件人国家或地区">
                {{ form.recevicerCountry || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="收件人省/州" prop="recevicerProvince">
                {{ form.recevicerProvince || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="城市" prop="recevicerCity">
                {{ form.recevicerCity || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="区/县" prop="recevicerArea">
                {{ form.recevicerArea || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="门牌号" prop="recevicerDoorplate">
                {{ form.recevicerDoorplate || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="0">
              <el-form-item label="地址" prop="recevicerAddress">
                {{ form.recevicerAddress || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="快递付款账号">
          <el-row :gutter="20">
            <!-- <el-button type="primary" size="small" @click="handleAdd">添加快递付款账号</el-button> -->
            <el-table :data="form.paymentAccountBeanList">
              <el-table-column label="序号">
                <template #default="{ $index }">{{ $index + 1 }}</template>
              </el-table-column>
              <!-- <el-table-column prop="productName" min-width="150" label="客户快递付款账号">
                <template #default="{ row, $index }">
                  <el-form-item
                    class="table-form-item"
                    :prop="`paymentAccountBeanList[${$index}].expressDeliveryPaymentAccount`"
                    :rules="[{ required: true, message: '请输入', trigger: 'change' }]"
                  >
                    <el-input
                      placeholder="请输入"
                      v-model="row.expressDeliveryPaymentAccount"
                      :maxlength="200"
                      show-word-limit
                    />
                  </el-form-item>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="expressDeliveryPaymentAccount"
                min-width="150"
                label="客户快递付款账号"
              />
              <el-table-column prop="logisticsChannel" min-width="150" label="物流渠道" />
              <el-table-column prop="paymentMethod" label="支付方式" min-width="180px" />
              <el-table-column prop="billingAddressCountry" label="国家/地区" min-width="150" />
              <el-table-column prop="billingAddressPostCode" label="邮编" min-width="150" />
              <!-- <el-table-column label="操作" fixed="right" width="60px">
                <template #default="{ row, $index }">
                  <div>
                    <el-link
                      type="danger"
                      style="font-size: 12px"
                      @click="remove($index)"
                      :underline="false"
                    >
                      删除
                    </el-link>
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
          </el-row>
        </KeenCard>
      </el-tab-pane>
      <el-tab-pane label="定价信息" :name="2">
        <vxe-table
          auto-resize
          style="background-color: #fff"
          :data="form.quotationPriceInfoBeanList"
        >
          <vxe-table-column field="productName" title="产品名称" />
          <vxe-table-column field="skuCode" title="产品SKU" />
          <vxe-table-column field="currencyName" title="币种" />
          <vxe-table-column field="suggestPrice" title="建议售价" />
          <vxe-table-column field="postalPrice" title="报价" />
          <vxe-table-column field="discount" title="折扣" />
          <vxe-table-column field="code" title="报价单" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="产品标签" :name="3">
        <div class="tag-head">
          <div class="company-info-tag">公司产品信息</div>
          <div class="client-info-tag">客户产品信息</div>
        </div>
        <vxe-table auto-resize style="background-color: #fff" :data="form.customSkuLabelBeanList">
          <vxe-table-column field="productName" title="产品名称" />
          <vxe-table-column field="skuCode" title="产品SKU" />
          <vxe-table-column field="categoryDesc" title="五级分类" />
          <vxe-table-column field="upcCode" title="UPC码" />
          <vxe-table-column field="eanCode" title="EAN码" />
          <vxe-table-column field="customerSkuCode" title="客户SKU编码" />
          <vxe-table-column field="productNameEn" title="客户产品名称（英文）" />
          <vxe-table-column field="productDesc" title="客户产品描述" />
          <vxe-table-column field="uniqueCode" title="客户唯一码" />
          <vxe-table-column field="gtin" title="GTIN" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="日志信息" :name="4">
        <vxe-table auto-resize style="background-color: #fff" :data="form.operationLogBeanList">
          <vxe-table-column field="itemContent" title="日志信息" min-width="250" />
          <vxe-table-column field="updateTime" title="更新时间" />
          <vxe-table-column field="operator" title="操作人" />
        </vxe-table>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup lang="ts" name="B2BCustomerDetail">
  import { erpApi } from '@/api';

  const activated = ref(1);
  const route = useRoute();
  const router = useRouter();
  const colorMap = {
    0: 'green',
    1: 'red',
  };
  const form: any = ref({
    code: '',
    contactWay: '',
    contacts: '',
    contractSubject: '',
    developCode: '',
    email: '',
    levelCode: '',
    maintainCode: '',
    name: '',
    recevicer: '',
    recevicerAddress: '',
    recevicerArea: '',
    recevicerCity: '',
    recevicerCountry: '',
    recevicerDoorplate: '',
    recevicerEmail: '',
    recevicerPhone: '',
    recevicerProvince: '',
    recevicerZipCode: '',
    settlementAccount: '',
    settlementInterval: '',
    settlementType: 0,
    status: 0,
    subjectAccount: '',
    type: '',
    countryDesc: '',
  });
  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await erpApi.luteosErpBaseB2BClientQueryDetail({
        code: route.query.code as string,
      });
      form.value = res;
    }
  };
  getDetailData();
</script>

<style scoped lang="scss">
  .tag-head {
    display: flex;
    .company-info-tag,
    .client-info-tag {
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cccccc;
      border-radius: 10px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom: none;
    }
    .company-info-tag {
      width: 37.5%;
    }
    .client-info-tag {
      width: 62.5%;
    }
  }
</style>
