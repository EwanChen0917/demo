<template>
  <el-form
    :model="form"
    :disabled="mode === 'detail'"
    :rules="formRules"
    ref="formRef"
    label-position="top"
  >
    <KeenCard title="客户信息">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <el-form-item label="客户编码" prop="code">
            <el-input disabled v-model="form.code" placeholder="系统生成" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="form.name" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="客户等级" prop="levelCode">
            <template #label>
              <span>客户等级</span>
              <span style="float: right">
                <el-button type="primary" link @click="addLevel">添加</el-button>
              </span>
            </template>
            <el-select
              style="width: 100%"
              v-model="form.levelCode"
              placeholder="客户等级"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="person of dickbook.b2b_client_level"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="客户类型" prop="type">
            <template #label>
              <span>客户类型</span>
              <span style="float: right">
                <el-button type="primary" link @click="addType">添加</el-button>
              </span>
            </template>
            <el-select
              style="width: 100%"
              v-model="form.type"
              placeholder="客户类型"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="person of dickbook.b2b_client_type"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="开发人员" prop="developCode">
            <el-select style="width: 100%" v-model="form.developCode" filterable>
              <el-option
                v-for="person of memberList"
                :key="person.memberCode"
                :label="person.name"
                :value="person.memberCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="维护人员" prop="maintainCode">
            <el-select style="width: 100%" v-model="form.maintainCode" filterable>
              <el-option
                v-for="person of memberList"
                :key="person.memberCode"
                :label="person.name"
                :value="person.memberCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="联系人" prop="contacts">
            <el-input v-model="form.contacts" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="联系方式" prop="contactWay">
            <el-input v-model="form.contactWay" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="销售国家" prop="countryCode">
            <CountrySelect v-model="form.countryCode" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status" disabled>
              <el-radio :label="0">合作</el-radio>
              <el-radio :label="1">中止</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="交货方式" prop="deliverType">
            <el-select v-model="form.deliverType" style="width: 100%">
              <el-option value="0" label="FOB" />
              <el-option value="1" label="DDP" />
              <el-option value="2" label="EXW" />
              <el-option value="3" label="DAP" />
              <el-option value="4" label="FCA" />
              <el-option value="5" label="CPT" />
              <el-option value="6" label="CIP" />
              <el-option value="7" label="DPU" />
              <el-option value="8" label="FAS" />
              <el-option value="9" label="CFR" />
              <el-option value="10" label="CIF" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户归属组织" prop="organizationDeptId">
            <el-tree-select
              ref="catTreeSelectRef"
              placeholder="请选择部门"
              v-model="form.organizationDeptId"
              :data="deptTree"
              filterable
              clearable
              popper-class="picker-cat-tree-select"
              highlight-current
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户渠道" prop="orderSaleType">
            <template #label>
              <span>客户渠道</span>
              <!-- <span style="float: right">
                <el-button type="primary" link @click="addSaleType">添加</el-button>
              </span> -->
            </template>
            <el-select
              style="width: 100%"
              v-model="form.orderSaleType"
              placeholder="客户渠道"
              filterable
              clearable
              multiple
              :teleported="false"
              :options="dickbook.b2b_client_order_sale_type"
              :props="{
                label: 'desc',
                value: 'value',
              }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否反向征税" prop="isReverseTax">
            <el-select v-model="form.isReverseTax" clearable>
              <el-option :value="0" label="否" />
              <el-option :value="1" label="是" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="CRM客户编码" prop="crmCustomerCode">
            <el-input v-model="form.crmCustomerCode" />
          </el-form-item>
        </el-col> -->
        <!--        <el-col :span="6" :offset="0">
          <el-form-item label="销售地区" prop="saleCountry">
            <CountrySelect v-model="form.saleCountry" />
          </el-form-item>
        </el-col>-->
      </el-row>
    </KeenCard>
    <KeenCard title="结算信息">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <el-form-item label="收款条件" prop="paymentTermsCode">
            <el-select
              style="width: 100%"
              v-model="form.paymentTermsCode"
              placeholder="收款条件"
              filterable
              clearable
              remote
              :remote-method="queryReceiptCondition"
              @change="changeReceipt"
            >
              <el-option
                v-for="item of receiptCondition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="结算方式" prop="settlementType">
            <el-select
              style="width: 100%"
              v-model="form.settlementType"
              placeholder="结算方式"
              filterable
              disabled
              @change="
                () => {
                  form.settlementInterval = '';
                }
              "
            >
              <el-option label="账期" :value="0" />
              <el-option label="款到发货" :value="1" />
              <el-option label="货到付款" :value="2" />
              <el-option label="阿里结算" :value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="" :prop="form.settlementType === 0 ? 'settlementInterval' : ''">
            <template #label>
              <span>结算周期</span>
              <!-- <span style="float: right">
                <el-button type="primary" link @click="addCycle">添加</el-button>
              </span> -->
            </template>
            <!-- <el-select
              :disabled="form.settlementType !== 0||form.paymentTermsCode"
              style="width: 100%"
              v-model="form.settlementInterval"
              placeholder="结算周期"
              filterable
              clearable
            >
              <el-option
                v-for="person of dickbook.b2b_client_settlement_interval"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select> -->
            <el-input v-model="settlementPeriodText" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="结算账号" prop="settlementAccount">
            <el-input v-model="form.settlementAccount" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="合同签约主体" prop="contractSubject">
            <el-select
              style="width: 100%"
              v-model="form.contractSubject"
              filterable
              @change="handleChange"
            >
              <el-option
                v-for="item in dickbook.b2b_client_sign_contract"
                :key="item.desc"
                :label="item.desc"
                :value="item.desc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="主体收款账号" prop="subjectAccount">
            <el-input
              disabled
              placeholder="请选择签约主体"
              v-model="form.subjectAccount"
              maxlength="500"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item prop="creditFlag">
            <template #label>
              <span>是否信用额度管理</span>
              <el-tooltip
                placement="top"
                :raw-content="true"
                :content="`1. “是否信用额度管理=是”时，此客户所有来源(界面创建、界面导入、EDI 集成、CRM 来源)的 B2B 订单，会对客户信用额度进行预占、扣减<br>
                           2. “是否信用额度管理=否”时，此客户所有来源(界面创建、界面导入、EDI 集成、CRM 来源)的 B2B 订单，不会对客户信用额度进行预占、扣减`"
                `
              >
                <QuestionFilled
                  class="question-icon"
                  style="margin-top: 0px; margin-left: 10px; width: 18px"
                />
              </el-tooltip>
            </template>
            <el-select
              v-model="form.creditFlag"
              placeholder=""
              clearable
              :disabled="!(form.settlementType === 0)"
            >
              <el-option :value="0" label="否" />
              <el-option :value="1" label="是" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="是否现金额度管理" prop="cashCreditFlag">
            <template #label>
              <span>是否现金额度管理</span>
              <el-tooltip
                placement="top"
                :raw-content="true"
                :content="`1. “是否现金额度管理=是”时，此客户所有来源(界面创建、界面导入、EDI 集成、CRM 来源)的 B2B 订单，会对客户现金额度进行预占、扣减<br>
                           2. “是否现金额度管理=否”时，此客户所有来源(界面创建、界面导入、EDI 集成、CRM 来源)的 B2B 订单，不会对客户现金额度进行预占、扣减`"
                `
              >
                <QuestionFilled
                  class="question-icon"
                  style="margin-top: 0px; margin-left: 10px; width: 18px"
                />
              </el-tooltip>
            </template>
            <el-select
              v-model="form.cashCreditFlag"
              placeholder=""
              clearable
              :disabled="!(form.settlementType === 1)"
            >
              <el-option :value="0" label="否" />
              <el-option :value="1" label="是" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="收件信息">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <el-form-item label="收件人" prop="recevicer">
            <el-input v-model="form.recevicer" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="收件人号码" prop="recevicerPhone">
            <el-input v-model="form.recevicerPhone" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="Email" prop="recevicerEmail">
            <el-input v-model="form.recevicerEmail" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="邮编" prop="recevicerZipCode">
            <el-input v-model="form.recevicerZipCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0" prop="recevicerCountry">
          <el-form-item label="收件人国家或地区">
            <el-select v-model="form.recevicerCountry" filterable>
              <el-option
                v-for="item in countryList"
                :key="item.countryCode"
                :label="`${item.countryName}(${item.countryNameEn})`"
                :value="item.countryCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="收件人省/州" prop="recevicerProvince">
            <el-input v-model="form.recevicerProvince" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="城市" prop="recevicerCity">
            <el-input v-model="form.recevicerCity" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="区/县" prop="recevicerArea">
            <el-input v-model="form.recevicerArea" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="门牌号" prop="recevicerDoorplate">
            <el-input v-model="form.recevicerDoorplate" />
          </el-form-item>
        </el-col>
        <el-col :span="18" :offset="0">
          <el-form-item label="地址" prop="recevicerAddress">
            <el-input v-model="form.recevicerAddress" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="快递付款账号">
      <el-row :gutter="20">
        <el-button type="primary" size="small" @click="handleAdd">添加快递付款账号</el-button>
        <el-table :data="form.paymentAccountBeanList">
          <el-table-column label="序号">
            <template #default="{ $index }">{{ $index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="expressDeliveryPaymentAccount"
            min-width="150"
            label="客户快递付款账号"
          >
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`paymentAccountBeanList[${$index}].expressDeliveryPaymentAccount`"
                :rules="[
                  // {
                  //   pattern: /ab/g,
                  //   message: '请输入',
                  //   trigger: ['blur', 'change'],
                  // },
                  { required: true, message: '请输入', trigger: 'change' },
                ]"
              >
                <el-input
                  placeholder="请输入"
                  v-model="row.expressDeliveryPaymentAccount"
                  :maxlength="200"
                  show-word-limit
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="logisticsChannel" min-width="150" label="物流渠道">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`paymentAccountBeanList[${$index}].logisticsChannel`"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <el-select v-model="row.logisticsChannel" filterable placeholder="请选择">
                  <el-option
                    v-for="item in shippingList"
                    :key="item.value"
                    :label="item.desc"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="paymentMethod" label="支付方式" min-width="180px">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`paymentAccountBeanList[${$index}].paymentMethod`"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <el-select v-model="row.paymentMethod" filterable placeholder="请选择">
                  <el-option
                    v-for="item in payList"
                    :key="item.value"
                    :label="item.desc"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="billingAddressCountry" label="国家/地区" min-width="150">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`paymentAccountBeanList[${$index}].billingAddressCountry`"
                :rules="[
                  { required: false, message: '请输入', trigger: 'change' },
                  {
                    pattern: /^[^\u4e00-\u9fa5]+$/,
                    message: '不允许输入中文字符',
                    trigger: ['change', 'blur'],
                  },
                ]"
              >
                <el-input
                  placeholder="请输入"
                  v-model="row.billingAddressCountry"
                  :maxlength="300"
                  show-word-limit
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="billingAddressPostCode" label="邮编" min-width="150">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`paymentAccountBeanList[${$index}].billingAddressPostCode`"
                :rules="[
                  { required: false, message: '请输入', trigger: 'change' },
                  {
                    pattern: /^[^\u4e00-\u9fa5]+$/,
                    message: '不允许输入中文字符',
                    trigger: ['change', 'blur'],
                  },
                ]"
              >
                <el-input
                  placeholder="请输入"
                  v-model="row.billingAddressPostCode"
                  :maxlength="300"
                  show-word-limit
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="60px">
            <template #default="{ row, $index }">
              <div>
                <!-- <el-link
                  type="primary"
                  style="font-size: 12px"
                  @click="copyRow(row, $index)"
                  :underline="false"
                >
                  复制
                </el-link> -->
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
          </el-table-column>
        </el-table>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
  <DictDialog
    :valueType="valueType"
    ref="dialogRef"
    :fieldName="fieldName"
    :code="dictCode"
    :name="dictName"
    @success="initDickbook"
  />
</template>

<script setup lang="ts">
  import {
    dataApi,
    erpApi,
    memberApi,
    platformApi,
    FinanceSystemApi,
    financeSystemApi,
  } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';
  import DictDialog from './dictDialog.vue';

  const isType0 = computed(() => {
    console.log('isType0', form.value.settlementType === 0);
    // return form.value.settlementType === 0 ? 0 : '';
    return form.value.settlementType;
  });
  const isType1 = computed(() => {
    return form.value.settlementType === 1 ? 0 : '';
  });

  const shippingList = ref([
    { value: 'FedEx_G_Third_Party', desc: 'FedEx_G_Third_Party' },
    { value: 'UPS_G_THIRD_PARTY', desc: 'UPS_G_THIRD_PARTY' },
  ]);
  const payList = ref([
    { value: 'THIRD_PARTY', desc: 'THIRD_PARTY' },
    { value: 'BillThirdParty', desc: 'BillThirdParty' },
  ]);

  const { closeTabAndRefresh } = useTabs();
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const route = useRoute();
  const router = useRouter();
  const formRef = ref();
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
    countryCode: '',
    deliverType: '',
    orderSaleType: [],
    paymentAccountBeanList: [],
    organizationDeptId: '',
    isReverseTax: '',
    creditFlag: 0, // 是否信用额度管理
    cashCreditFlag: 0, // 是否现金额度管理
  });
  const setSelectOption = () => {
    if (form.value.settlementType === 0) {
      form.value.creditFlag = 0;
      form.value.cashCreditFlag = '';
    } else if (form.value.settlementType === 0) {
      form.value.creditFlag = '';
      form.value.cashCreditFlag = 0;
    }
    console.log(form.value);
  };
  const formRules = ref({
    name: [{ required: true, message: '该项必填', trigger: 'blur' }],
    // levelCode: [{ required: true, message: '该项必填', trigger: 'blur' }],
    type: [{ required: true, message: '该项必填', trigger: 'change' }],
    developCode: [{ required: true, message: '该项必填', trigger: 'change' }],
    maintainCode: [{ required: true, message: '该项必填', trigger: 'change' }],
    settlementType: [{ required: true, message: '该项必填', trigger: 'blur' }],
    paymentTermsCode: [{ required: true, message: '该项必填', trigger: 'change' }],
    contractSubject: [{ required: true, message: '该项必填', trigger: 'change' }],
    countryCode: [{ required: true, message: '该项必填', trigger: 'change' }],
    email: [{ required: true, message: '该项必填', trigger: 'blur' }],
    settlementInterval: [{ required: true, message: '该项必填', trigger: 'change' }],
    deliverType: [{ required: true, message: '该项必填', trigger: 'change' }],
    saleCountry: [{ required: true, message: '该项必填', trigger: 'change' }],
    organizationDeptId: [{ required: true, message: '该项必填', trigger: 'change' }],
    creditFlag: [{ required: true, message: '该项必填', trigger: 'change' }],
    cashCreditFlag: [{ required: true, message: '该项必填', trigger: 'change' }],
    orderSaleType: [{ required: true, message: '该项必填', trigger: 'change' }],
  });
  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await erpApi.luteosErpBaseB2BClientQueryDetail({
        code: route.query.code as string,
      });
      // console.log(res);
      // if (res.settlementType === 0) {
      //   formRules.value.creditFlag[0].required = true;
      //   formRules.value.cashCreditFlag[0].required = false;
      // } else if (res.settlementType === 1) {
      //   formRules.value.creditFlag[0].required = false;
      //   formRules.value.cashCreditFlag[0].required = true;
      // }
      form.value = res;
      // ?? 不用就去掉
      // setSelectOption();
    }
  };
  getDetailData();
  const countryList = ref<any[]>([]);
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({ pageSize: 500, pageNum: 1 });
    countryList.value = res.countryList as [];
  };
  const dickbook: any = ref({
    b2b_client_type: [],
    b2b_client_level: [],
    b2b_client_settlement_interval: [],
    b2b_client_sign_contract: [],
    b2b_client_order_sale_type: [],
  });
  const initDickbook = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: [
        'b2b_client_type',
        'b2b_client_level',
        'b2b_client_settlement_interval',
        'b2b_client_sign_contract',
        'b2b_client_order_sale_type',
      ],
    });
    console.log('dickbook.b2b_client_settlement_interval', res);
    dickbook.value.b2b_client_type = res.dictMap.b2b_client_type;
    dickbook.value.b2b_client_level = res.dictMap.b2b_client_level;
    dickbook.value.b2b_client_settlement_interval = res.dictMap.b2b_client_settlement_interval;
    dickbook.value.b2b_client_sign_contract = res.dictMap.b2b_client_sign_contract;
    dickbook.value.b2b_client_order_sale_type = res.dictMap.b2b_client_order_sale_type;
  };
  initDickbook();
  getCountryList();
  const memberList = ref<any>([]);
  const getMemberList = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    memberList.value = res.all_dept;
  };
  getMemberList();
  const dictCode = ref('b2b_client_level');
  const dictName = ref('B2B客户-客户等级');
  const fieldName = ref('客户等级');
  const valueType = ref(2);
  const cancel = () => {
    router.push({
      name: 'B2BCustomer',
    });
  };
  // 新增快递付款账号
  const handleAdd = (val) => {
    console.log(form.value, form.value.paymentAccountBeanList);
    if (!form.value.paymentAccountBeanList) {
      form.value.paymentAccountBeanList = [
        {
          billingAddressCountry: '',
          billingAddressPostCode: '',
          expressDeliveryPaymentAccount: '',
          logisticsChannel: '',
          paymentMethod: '',
        },
      ];
    } else {
      form.value.paymentAccountBeanList?.push({
        billingAddressCountry: '',
        billingAddressPostCode: '',
        expressDeliveryPaymentAccount: '',
        logisticsChannel: '',
        paymentMethod: '',
      });
    }
  };
  // 移除产品信息
  const remove = (index: number) => {
    form.value.paymentAccountBeanList.splice(index, 1);
    // resetStatistics();
  };
  const handleChange = (val) => {
    form.value.subjectAccount = '';
    const result = dickbook.value.b2b_client_sign_contract.find((item) => item.desc === val);
    if (result) {
      form.value.subjectAccount = result.value;
    }
  };
  const dialogRef = ref();
  const addLevel = () => {
    dictCode.value = 'b2b_client_level';
    dictName.value = 'B2B客户-客户等级';
    fieldName.value = '客户等级';
    valueType.value = 2;
    nextTick(async () => {
      await dialogRef.value.open();
    });
  };
  const addType = () => {
    dictCode.value = 'b2b_client_type';
    dictName.value = 'B2B客户-客户类型';
    fieldName.value = '客户类型';
    valueType.value = 2;
    nextTick(async () => {
      await dialogRef.value.open();
    });
  };
  const addSaleType = () => {
    dictCode.value = 'b2b_client_order_sale_type';
    dictName.value = 'B2B客户-客户渠道';
    fieldName.value = '客户渠道';
    valueType.value = 2;
    nextTick(async () => {
      await dialogRef.value.open();
    });
  };
  const addCycle = () => {
    dictCode.value = 'b2b_client_settlement_interval';
    dictName.value = 'B2B客户-结算周期';
    fieldName.value = '结算周期';
    valueType.value = 1;
    nextTick(async () => {
      await dialogRef.value.open();
    });
  };
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    console.log('form.value', form.value);
    // return;
    if (valid) {
      await erpApi.luteosErpBaseB2BClientSaveOrUpdate(form.value);
      ElMessage.success('操作成功');
      closeTabAndRefresh('B2BCustomer');
      cancel();
    }
  };

  const deptTreeData = ref([]);
  // 零售子部门
  const saleSubDeptArr: any = [];
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
    let saleDept = res.deptInfoList?.find((item) => {
      return item.deptId === 971474265;
    });
    if (saleDept) {
      saleDept.children?.forEach((item) => {
        saleSubDeptArr.push(item.deptId);
      });
    }
    // console.log(saleSubDeptArr);
  };
  queryDeptTree();
  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });
  // 客户归属组织 改变
  // const isInSale = ref(false);
  watchEffect(() => {
    // isInSale.value = saleSubDeptArr.includes(form.value.organizationDeptId);
    if (isAdd.value) {
      if (!(form.value.settlementType === 0)) {
        form.value.creditFlag = 0;
      } else {
        form.value.creditFlag = '';
      }
      if (!(form.value.settlementType === 1)) {
        form.value.cashCreditFlag = 0;
      } else {
        form.value.cashCreditFlag = '';
      }
    }
  });

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: level < 2 ? item.children?.map((subItem) => mapNode(subItem, level + 1)) : [],
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  // 收款条件选择下拉数据
  const receiptConditionData = ref([]);
  const queryReceiptCondition = async (query: string) => {
    const res = await financeSystemApi.financeReceiptConditionQueryList({
      keyword: query,
      status: 1,
      pageNum: 1,
      pageSize: 100,
    });
    receiptConditionData.value = res?.receiptConditionList;
  };
  queryReceiptCondition();

  const receiptCondition = computed(() => {
    const mapNode = (item) => ({
      value: item.code,
      label: item.name,
      status: item.status,
      settlementMethod: item.settlementMethod, // 结算方式
      settlementPeriod: item.settlementPeriod, // 结算周期
    });
    return receiptConditionData.value?.map((item) => mapNode(item));
  });
  // 修改收款条件，结算方式，结算周期联动显示
  const changeReceipt = () => {
    if (form.value.paymentTermsCode) {
      const item = receiptCondition.value.find((res) => {
        return res.value == form.value.paymentTermsCode;
      });
      form.value.settlementType = item.settlementMethod;
      form.value.settlementInterval = item.settlementPeriod || '';
    } else {
      form.value.settlementType = '';
      form.value.settlementInterval = '';
    }
  };
  const settlementPeriodText = computed(() => {
    if (form.value.settlementInterval) {
      return `${form.value.settlementInterval}（天）`;
    }
    return '';
  });
</script>

<style scoped lang="scss">
  :deep(.el-form) {
    .el-form-item--label-top .el-form-item__label {
      margin-bottom: 6px !important;
      line-height: 22px;
    }

    .el-form-item {
      margin-bottom: 26px !important;

      .el-form-item__content {
        height: auto !important;
      }
    }

    .el-form-item.asterisk-left:not(.is-required) .el-form-item__label::before {
      content: '' !important;
      margin-left: 0;
    }
  }

  .table-form-item {
    // margin-top: 1.75rem;
    :deep(.el-form-item__content) {
      margin: 0 !important;
      // display: flex;
      // column-gap: 10px;
    }
  }
  // :deep(.el-form-item__label:after) {
  //   content: '：';
  // }
  .form-table-item {
    &.el-form-item {
      margin: 0 0 6px 0;
    }

    :deep(.el-form-item__error) {
      display: none;
    }

    // margin: 0;
    :deep(.el-form-item__content) {
      margin: 0 !important;
    }
  }

  :deep(.vxe-table .vxe-table--body-wrapper .multi) {
    vertical-align: top;
    line-height: 44px;

    .el-form-item__error {
      display: none;
    }
  }

  .cell-container {
    min-height: 44px;
    line-height: 44px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
