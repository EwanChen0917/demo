<template>
  <AuditHeader :flowName="form?.flowName" :authNodeList="form.authNodeList" />

  <el-form label-position="top" :model="auditForm" ref="auditFormRef">
    <el-tabs v-model="activated" tab-position="top">
      <el-tab-pane label="报价信息" :name="1">
        <KeenCard title="客户信息">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="客户名称" prop="customerInfo.customerCode">
                {{ form.customerInfo.customerName || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户等级" prop="levelCode">
                {{ form.customerInfo.levelCode || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="客户类型">
                {{ form.customerInfo.typeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="开发人员">
                {{ form.customerInfo.developer || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="结算方式">
                {{ form.customerInfo.settlementTypeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="结算周期">
                {{ form.customerInfo.settlementIntervalDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="结算账号" prop="settlementAccount">
                {{ form.customerInfo.settlementAccount || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="合同签约主体" prop="contractSubject">
                {{ form.customerInfo.contractSubject || '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="主体收款账号" prop="subjectAccount">
                {{ form.customerInfo.subjectAccount || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="产品明细">
          <vxe-table empty-text="暂未添加产品" :data="form.itemList" min-height="80px">
            <vxe-table-column field="productName" title="产品名称" min-width="200px" />
            <vxe-table-column field="skuCode" title="产品SKU" min-width="180px" />
            <vxe-table-column field="currencyName" title="币种" min-width="220px" />
            <vxe-table-column field="suggestPrice" title="建议售价" min-width="100px" />
            <!-- <vxe-table-column field="minPrice" title="最低价" min-width="100px" /> -->
            <vxe-table-column field="postalPrice" title="报价" min-width="200px" />
            <vxe-table-column field="discount" title="折扣" min-width="200px" />
          </vxe-table>
        </KeenCard>
        <KeenCard title="审核内容">
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item
                label="审核结果"
                prop="pass"
                :rules="[{ required: true, message: '请选择审核结果' }]"
              >
                <el-radio-group v-model="auditForm.pass">
                  <el-radio :label="true">通过</el-radio>
                  <el-radio :label="false">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item
                label="备注"
                prop="remark"
                :rules="[{ required: true, message: '请输入备注信息' }]"
              >
                <el-input v-model="auditForm.remark" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
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
    </el-tabs>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="quotationManageAudit">
  import { erpApi } from '@/api';
  import { SuccessFilled, QuestionFilled, InfoFilled } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const activated = ref(1);
  const route = useRoute();
  const router = useRouter();
  const colorMap = {
    0: 'green',
    1: 'red',
  };
  const processStatus = {
    0: SuccessFilled,
    1: SuccessFilled,
    2: QuestionFilled,
    3: InfoFilled,
    4: InfoFilled,
  };
  const processClass = {
    0: 'green',
    1: 'green',
    2: 'yellow',
    3: 'gray',
    4: 'gray',
  };
  const form: any = ref({
    authLogList: [
      {
        authStatus: 0,
        authTag: '',
        name: '',
        nodeCode: '',
        operator: '',
        operatorName: '',
        remark: '',
        updateTime: '',
      },
    ],
    authNodeList: [
      {
        code: '',
        name: '',
        operatorNames: [],
        operators: [],
        sort: 0,
        status: 0,
        statusDesc: '',
        type: 0,
        waitAuthOperators: [],
      },
    ],
    code: '',
    customerCode: '',
    customerInfo: {
      contactWay: '',
      contacts: '',
      contractSubject: '',
      customerCode: '',
      customerName: '',
      developCode: '',
      developer: '',
      email: '',
      levelCode: '',
      levelDesc: '',
      maintainCode: '',
      maintainter: '',
      settlementAccount: '',
      settlementInterval: '',
      settlementIntervalDesc: '',
      settlementType: 0,
      settlementTypeDesc: '',
      status: 0,
      statusDesc: '',
      subjectAccount: '',
      type: '',
      typeDesc: '',
    },
    flowCode: '',
    itemList: [
      {
        currencyCode: '',
        currencyName: '',
        discount: '',
        minPrice: 0,
        postalPrice: '',
        postalPriceMax: 0,
        postalPriceMin: 0,
        productName: '',
        skuCode: '',
        suggestPrice: 0,
      },
    ],
    nextAuthNode: {
      code: '',
      name: '',
      operatorNames: [],
      operators: [],
      sort: 0,
      status: 0,
      statusDesc: '',
      type: 0,
      waitAuthOperators: [],
    },
    showAuthButton: true,
    status: 0,
    statusDesc: '',
  });
  const auditFormRef = ref();
  const auditForm = reactive({
    pass: undefined,
    remark: '',
  });
  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await erpApi.luteosErpQuotationQueryDetail({
        code: route.query.code as string,
      });
      if (res.status !== 1) {
        router.push({
          path: '/quotationManage/detail',
          query: {
            code: route.query.code,
          },
        });
      }
      form.value = res;
    }
  };
  getDetailData();
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await auditFormRef.value?.validate().catch(() => false);
    if (valid) {
      await erpApi.luteosErpQuotationAuth({
        code: form.value.code,
        pass: auditForm.pass,
        remark: auditForm.remark,
      });
      ElMessage.success('操作成功');
      closeTabAndRefresh('quotationManage');
      cancel();
    }
  };
  const cancel = () => {
    router.push({
      name: 'quotationManage',
    });
  };
</script>

<style scoped lang="scss"></style>
