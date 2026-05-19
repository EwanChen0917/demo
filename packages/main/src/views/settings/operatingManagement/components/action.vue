<template>
  <el-form
    :model="form"
    :disabled="mode === 'detail'"
    ref="formRef"
    :rules="rules"
    label-position="top"
  >
    <KeenCard title="企业信息">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
            <el-input v-model="form.unifiedSocialCreditCode" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="成立时间" prop="establishedTime">
            <el-date-picker
              style="width: 100%"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              v-model="form.establishedTime"
              type="date"
              placeholder="选择成立时间"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="注册资本" prop="registeredCapital">
            <el-input v-model="form.registeredCapital" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="账号属性" prop="property">
            <el-select v-model="form.property" clearable style="width: 100%">
              <el-option label="主号" :value="0" />
              <el-option label="小号" :value="1" />
              <el-option label="备用号" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="经营状态" prop="status">
            <el-select v-model="form.status" clearable style="width: 100%">
              <el-option label="开业" :value="1" />
              <el-option label="停业" :value="2" />
              <el-option label="清算" :value="3" />
              <el-option label="存续" :value="4" />
              <el-option label="在业" :value="5" />
              <el-option label="吊销" :value="6" />
              <el-option label="注销" :value="7" />
              <el-option label="迁出" :value="8" />
              <el-option label="迁入" :value="9" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="企业性质" prop="character">
            <el-radio-group v-model="form.character">
              <el-radio :label="0">自有</el-radio>
              <el-radio :label="1">购买</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="16" :sm="24" :offset="0">
          <el-form-item label="注册地址" prop="registeredAddress">
            <el-input v-model="form.registeredAddress" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :offset="0">
          <el-form-item label="经营范围" prop="businessScope">
            <el-input v-model="form.businessScope" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="法人信息">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人" prop="companyLegalPerson">
            <el-input v-model="form.companyLegalPerson" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人身份证" prop="companyLegalPersonCard">
            <el-input v-model="form.companyLegalPersonCard" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="公司章">
      <el-row :gutter="20">
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="章数" prop="commonSealNum">
            <NumberInput v-model="form.commonSealNum" :precision="0" :min="0" :max="99999" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="营业执照" prop="hasBusinessLicense">
            <el-radio-group v-model="form.hasBusinessLicense">
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="公章" prop="hasCommonSeal">
            <el-radio-group v-model="form.hasCommonSeal">
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="财务章" prop="hasFinanceSeal">
            <el-radio-group v-model="form.hasFinanceSeal">
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="发票章" prop="hasInvoiceSeal">
            <el-radio-group v-model="form.hasInvoiceSeal">
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :offset="0">
          <el-form-item label="法人章" prop="hasLegalPersonSeal">
            <el-radio-group v-model="form.hasLegalPersonSeal">
              <el-radio :label="0">有</el-radio>
              <el-radio :label="1">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { shopApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
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
    property: null,
  };
  const form = ref({ ...cloneDeep(formOrigin) });
  const formRef = ref();
  const rules = reactive({
    name: [
      {
        required: true,
        message: '请输入公司名称',
        trigger: 'blur',
      },
    ],
    unifiedSocialCreditCode: [
      {
        required: true,
        message: '请输入统一社会信用代码',
        trigger: 'blur',
      },
    ],
    property: [
      {
        required: true,
        message: '请选择账号属性',
        trigger: 'change',
      },
    ],
    status: [
      {
        required: true,
        message: '请选择经营状态',
        trigger: 'change',
      },
    ],
    character: [
      {
        required: true,
        message: '请选择企业性质',
        trigger: 'change',
      },
    ],
    companyLegalPerson: [
      {
        required: true,
        message: '请输入法人姓名',
        trigger: 'blur',
      },
    ],
  });

  const saveLoading = ref(false);
  const cancel = () => {
    router.push({
      name: 'operatingManagement',
    });
  };
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => false);
    if (valid) {
      saveLoading.value = true;
      await shopApi
        .luteosShopBusinessSaveOrUpdate({
          ...form.value,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('操作成功');
      closeTabAndRefresh('operatingManagement');
      cancel();
    }
  };
</script>

<style scoped lang="scss"></style>
