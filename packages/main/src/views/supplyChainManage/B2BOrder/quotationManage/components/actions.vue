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
          <el-form-item label="客户名称" prop="customerInfo.customerCode">
            <el-select
              style="width: 100%"
              v-model="form.customerInfo.customerCode"
              placeholder="客户名称"
              filterable
              clearable
              @change="selectCustomer"
            >
              <el-option
                v-for="person of customerList"
                :key="person.code"
                :label="person.name"
                :value="person.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="客户等级" prop="levelCode">
            <el-select
              disabled
              style="width: 100%"
              v-model="form.customerInfo.levelCode"
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
          <el-form-item label="客户类型">
            <el-select
              disabled
              style="width: 100%"
              v-model="form.customerInfo.type"
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
          <el-form-item label="开发人员">
            <el-select
              disabled
              style="width: 100%"
              v-model="form.customerInfo.developer"
              filterable
            >
              <!-- <el-option
                v-for="person of memberList"
                :key="person.memberCode"
                :label="person.name"
                :value="person.memberCode"
              /> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="结算方式">
            <el-select
              disabled
              style="width: 100%"
              v-model="form.customerInfo.settlementTypeDesc"
              filterable
            >
              <!-- <el-option
                v-for="person of memberList"
                :key="person.memberCode"
                :label="person.name"
                :value="person.memberCode"
              /> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="结算周期" prop="settlementIntervalDesc">
            <el-select
              style="width: 100%"
              disabled
              v-model="form.customerInfo.settlementIntervalDesc"
              maxlength="255"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="结算账号" prop="settlementAccount">
            <el-input disabled v-model="form.customerInfo.settlementAccount" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="合同签约主体" prop="contractSubject">
            <el-input disabled v-model="form.customerInfo.contractSubject" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="主体收款账号" prop="subjectAccount">
            <el-input
              placeholder="请选择合同签约主体"
              disabled
              v-model="form.customerInfo.subjectAccount"
              maxlength="255"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>

    <KeenCard title="产品明细">
      <p>
        <el-button type="primary" size="default" @click="addProduct">添加产品</el-button>
      </p>
      <vxe-table empty-text="暂未添加产品" :data="form.itemList" min-height="80px">
        <vxe-table-column field="productName" title="产品名称" min-width="200px" />
        <vxe-table-column field="skuCode" title="产品SKU" min-width="180px" />
        <vxe-table-column field="currencyName" title="币种" min-width="220px">
          <template #default="{ row, $rowIndex }">
            <el-form-item
              style="margin: 0"
              :prop="`itemList[${$rowIndex}.currencyCode]`"
              :rules="[
                {
                  required: true,
                  message: '',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                style="width: 100%"
                v-model="row.currencyCode"
                filterable
                @change="
                  () => {
                    handleCurrencyChange(row);
                  }
                "
              >
                <el-option
                  v-for="item in currencyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="suggestPrice"
          title="建议售价"
          align="right"
          :formatter="
            ({ cellValue }) => {
              return cellValue.toFixed(3);
            }
          "
          min-width="100px"
        />
        <!-- <vxe-table-column field="minPrice" title="最低价" min-width="100px" /> -->
        <vxe-table-column field="postalPrice" title="报价" min-width="100px">
          <template #default="{ row, $rowIndex }">
            <el-form-item
              style="margin: 0"
              :prop="`itemList[${$rowIndex}.postalPriceMin]`"
              :rules="[
                {
                  required: true,
                  message: '',
                },
              ]"
            >
              <NumberInput v-model="row.postalPriceMin" :min="0" :precision="3" />
              <!-- <span style="line-height: 44px; margin: 0 10px">~</span>
              <NumberInput v-model="row.postalPriceMax" :min="row.postalPriceMin" :precision="3" /> -->
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column field="discount" title="折扣" min-width="100px">
          <template #default="{ row }">
            <template v-if="row.postalPriceMin">
              {{ ((row.postalPriceMin * 100) / row.suggestPrice).toFixed(3) }}%
              <!-- ~
              {{ ((row.postalPriceMax * 100) / row.suggestPrice).toFixed(3) }}% -->
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="" title="操作" fixed="right" width="80px">
          <template #default="{ $rowIndex }">
            <el-button type="danger" link @click="form.itemList.splice($rowIndex, 1)">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
  <AddProductDialog
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    :selectedRows="form.itemList"
    @close="handleBindGoodsClose"
  />
</template>

<script setup lang="ts">
  import { dataApi, erpApi, memberApi, platformApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';
  import AddProductDialog from './addProductDialog.vue';

  const { closeTabAndRefresh } = useTabs();
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const route = useRoute();
  const router = useRouter();
  const formRef = ref();
  const form: any = ref({
    itemList: [],
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
  });
  const formRules = ref({
    'customerInfo.customerCode': [{ required: true, message: '该项必填', trigger: 'blur' }],
  });
  const currencyList = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyList.value = (res.currencyList as []).map((currency: any) => {
      return {
        value: currency.currencyCode,
        label: `${currency.currencyCode}【${currency.currencyName}】`,
      };
    });
  };
  getCurrencyOptions();
  const customerList = ref<any[]>([]);
  const getCustomerList = async () => {
    const res: any = await erpApi.luteosErpBaseB2BClientQueryList({
      pageSize: 1000,
      pageNum: 1,
      status: 0,
    });
    customerList.value = res.recordList;
  };
  getCustomerList();
  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await erpApi.luteosErpQuotationQueryDetail({
        code: route.query.code as string,
      });
      if (props.mode === 'add') {
        res.code = '';
      }
      form.value = res;
    }
  };
  getDetailData();
  const dickbook: any = ref({
    b2b_client_type: [],
    b2b_client_level: [],
    b2b_client_settlement_interval: [],
  });
  const initDickbook = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['b2b_client_type', 'b2b_client_level', 'b2b_client_settlement_interval'],
    });
    dickbook.value.b2b_client_type = res.dictMap.b2b_client_type;
    dickbook.value.b2b_client_level = res.dictMap.b2b_client_level;
    dickbook.value.b2b_client_settlement_interval = res.dictMap.b2b_client_settlement_interval;
  };
  initDickbook();
  const memberList = ref<any>([]);
  const getMemberList = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    memberList.value = res.all_dept;
  };
  getMemberList();
  const selectCustomer = (value) => {
    if (value) {
      const result = customerList.value.find((item) => item.code === value);
      if (result) {
        form.value.customerInfo = {
          ...result,
          customerCode: result.code,
        };
      }
    }
  };
  const cancel = () => {
    router.push({
      name: 'quotationManage',
    });
  };
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (form.value.itemList.length) {
        await erpApi.luteosErpQuotationSaveOrUpdate({
          code: form.value.code,
          customerCode: form.value.customerInfo.customerCode,
          itemList: form.value.itemList,
        });
        ElMessage.success('操作成功');
        closeTabAndRefresh('quotationManage');
        cancel();
      } else {
        ElMessage.warning('请添加产品');
      }
    }
  };
  const bindGoodsVisible = ref(false);
  const addProduct = async () => {
    bindGoodsVisible.value = true;
  };
  const handleCurrencyChange = async (row) => {
    const res = await erpApi.luteosErpQuotationPriceGetSuggestPrice({
      currencyCode: row.currencyCode,
      skuCode: row.skuCode,
    });
    // row.minPrice = res.minPrice;
    row.suggestPrice = res.suggestPrice;
    row.postalPriceMin = undefined;
    // row.postalPriceMax = undefined;
  };
  const handleBindGoodsClose = async (reload, val) => {
    if (reload) {
      const oldList = form.value.itemList;
      val.forEach((item) => {
        const same = oldList.find((old) => {
          return old.skuCode === item.skuCode;
        });
        item.currencyCode = same && same.currencyCode ? same.currencyCode : item.currency;
        item.currencyName = same && same.currencyName ? same.currencyName : item.currency;
        item.discount = same && same.discount ? same.discount : 0;
        item.postalPrice = same && same.postalPrice ? same.postalPrice : 0;
        // item.postalPriceMax = same && same.postalPriceMax ? same.postalPriceMax : undefined;
        item.postalPriceMin = same && same.postalPriceMin ? same.postalPriceMin : undefined;
        item.productName = same && same.productName ? same.productName : item.productTitle;
        item.skuCode = same && same.skuCode ? same.skuCode : item.skuCode;
        item.suggestPrice = same && same.suggestPrice ? same.suggestPrice : item.price;
        // item.minPrice = same && same.minPrice ? same.minPrice : item.minPrice;
      });
      form.value.itemList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };
</script>

<style scoped lang="scss">
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
