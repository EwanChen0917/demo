<template>
  <el-dialog
    :title="title"
    width="1000px"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
  >
    <el-form :model="form" ref="formRef" label-width="180px" label-position="right">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item prop="code" label="单据编号：">
            <el-input v-model.trim="form.code" disabled placeholder="系统自动生成" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="collectionDate"
            :rules="[{ required: true, message: '请选择收款日期', trigger: ['change'] }]"
            label="收款日期："
          >
            <el-date-picker
              style="width: 300px"
              v-model="form.collectionDate"
              type="date"
              :clearable="false"
              placeholder="请选择收款日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="customerAccountName"
            label="对方账户名："
            required
            :rules="[{ required: true, message: '请输入对方账户名', trigger: ['blur'] }]"
          >
            <el-input v-model.trim="form.customerAccountName" placeholder="请输入对方账户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="currency"
            label="币别："
            required
            :rules="[{ required: true, message: '请选择币别', trigger: ['blur'] }]"
          >
            <CurrencySelect v-model="form.currency" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="金额：">
            <el-input v-model.trim="form.amount" disabled placeholder="金额" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="receivedAmount"
            :rules="[{ required: true, message: '请输入金额', trigger: ['blur'] }]"
            label="到账金额："
            required
          >
            <NumberInput
              v-model="form.receivedAmount"
              :precision="2"
              :min="1"
              :max="9999999999"
              @change="form.amount = form.receivedAmount"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="手续费：">
            <el-input v-model.trim="form.serviceCharge" disabled placeholder="手续费" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="ourBankAccount"
            label="我方银行账号："
            required
            :rules="[{ required: true, message: '请选择我方银行账号', trigger: ['blur'] }]"
          >
            <el-select
              v-model="form.ourBankAccount"
              clearable
              filterable
              @change="changeAccout"
              placeholder="请选择我方银行账号"
            >
              <el-option
                v-for="item in accountList"
                :key="item.bankAccount"
                :label="item.bankAccount"
                :value="item.bankAccount"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="ourBank" label="收款组织：">
            <!-- <el-select
              v-model="form.collectionOrg"
              disabled
              placeholder="请选择我方银行账号带出收款组织"
            >
              <el-option
                v-for="item in accountList"
                :key="item.bankAccount"
                :label="item.openOrgDesc"
                :value="item.openOrg"
              />
            </el-select> -->
            <el-input
              v-model.trim="openOrgDesc"
              disabled
              placeholder="请选择我方银行账号带出收款组织"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="ourBank" label="我方银行：">
            <el-input
              v-model.trim="form.ourBank"
              disabled
              placeholder="请选择我方银行账号带出我方银行"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="customerBankAccount" label="对方银行账号：">
            <el-input v-model.trim="form.customerBankAccount" placeholder="请输入对方银行账号" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="customerBank" label="对方银行：">
            <el-input v-model.trim="form.customerBank" placeholder="请输入对方银行" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="customerName" label="客户：">
            <el-input
              v-model.trim="form.customerName"
              disabled
              placeholder="客户/发票关联后自动生成"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="发票号：" prop="invoiceNo">
            <el-input disabled v-model.trim="form.invoiceNo" placeholder="发票关联后自动生成" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { financeSystemApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import { omit } from 'lodash-es';

  const visible = ref(false);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({});
  const accountList = ref([]);
  const openOrgDesc = ref('');

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const edit = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const res = await financeSystemApi.financePaymentCollectionSaveOrUpdate(form.value);
      ElMessage.success(edit.value ? '编辑成功' : '登记成功');
      visible.value = false;
      emit('success');
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    visible.value = false;
    emit('close');
  };
  const title = ref('新增收款登记');
  const code = ref('');

  // 详情
  const getDetail = async () => {
    const res = await financeSystemApi.financePaymentCollectionQueryDetail({ code: code.value });
    if (res && res.constructor === Object) {
      openOrgDesc.value = res.collectionOrgDesc || '';
      //编辑不需要收款组织字段
      form.value = { ...omit(res, 'collectionOrgDesc') };
    }
  };
  // 我方银行账号下拉
  const getQueryBankAccountList = async () => {
    const res = await financeSystemApi.financeBasicQueryBankAccountList({
      pageNum: 1,
      pageSize: 1000,
    });
    accountList.value = res.recordList;
  };
  const changeAccout = () => {
    if (form.value.ourBankAccount) {
      const obj = accountList.value.find((res) => form.value.ourBankAccount == res.bankAccount);
      console.log(obj);
      form.value.ourBank = obj.bankTypeName;
      form.value.collectionOrg = obj.openOrg;
      openOrgDesc.value = obj.openOrgDesc;
    } else {
      form.value.ourBank = '';
      form.value.collectionOrg = '';
      openOrgDesc.value = '';
    }
  };

  const open = async (id) => {
    getQueryBankAccountList();
    edit.value = false;
    form.value = {
      collectionDate: '',
      collectionOrg: '',
      currency: '',
      customerAccountName: '',
      customerBank: '',
      customerBankAccount: '',
      ourBank: '',
      ourBankAccount: '',
      amount: '',
      serviceCharge: 0,
      receivedAmount: undefined,
    };
    openOrgDesc.value = '';
    if (formRef.value) {
      formRef.value.resetFields();
    }
    if (id) {
      code.value = id;
      edit.value = true;
      title.value = '编辑收款登记';
      getDetail();
    } else {
      title.value = '新增收款登记';
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
