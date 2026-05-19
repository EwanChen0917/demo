<template>
  <el-dialog title="生成MAC地址" :model-value="visible" @close="handleClose" width="1200px">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="130px"
      label-position="left"
      scroll-to-error
    >
      <div class="d-flex">
        <el-form-item
          label="产品代码："
          prop="productCode"
          :rules="[{ required: true, message: '请选择产品代码', trigger: ['blur', 'change'] }]"
          class="mr-20"
        >
          <el-select
            v-model="form.productCode"
            clearable
            filterable
            placeholder="请选择"
            class="w-200"
            @change="handleProductCodeChange"
          >
            <el-option
              v-for="item in productCodeList"
              :key="item.productCode"
              :label="item.productCode"
              :value="item.productCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="贴片工厂："
          prop="factoryCode"
          :rules="[{ required: true, message: '请选择贴片工厂', trigger: ['blur', 'change'] }]"
          class="mr-20"
        >
          <el-select
            v-model="form.factoryCode"
            clearable
            filterable
            placeholder="请选择"
            class="w-200"
          >
            <el-option
              v-for="item in factoryList"
              :key="item.factoryCode"
              :label="item.factoryName"
              :value="item.factoryCode"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item label="衍生/迭代：" prop="factoryCodeList" class="mr-20 factory-item">
          <div class="w-200">{{ deriveDesc }}</div>
        </el-form-item>
        <el-form-item label="系列名称：" prop="pdtNewProductCodeList">
          <div class="w-200">{{ seriesDesc }}</div>
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item
          label="开发阶段："
          prop="developState"
          :rules="[{ required: true, message: '请选择开发阶段', trigger: ['blur', 'change'] }]"
          class="mr-20"
        >
          <el-select
            v-model="form.developState"
            clearable
            filterable
            placeholder="请选择"
            collapse-tags
            class="w-200"
            @change="handleDevelopStateChange"
          >
            <el-option
              v-for="item in developStateList"
              :key="item.developState"
              :label="item.developStateDesc"
              :value="item.developState"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="组装厂供应商："
          prop="supplierCode"
          v-if="!isShowSimpleMac"
          :rules="[
            {
              required: true,
              message: '请选择组装厂供应商',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-select
            v-model="form.supplierCode"
            clearable
            filterable
            placeholder="请选择"
            class="w-200"
          >
            <el-option
              v-for="item in supplierOptionsList"
              :key="item.supplierCode"
              :label="`${item.supplierCode}-${item.supplierName}` || ''"
              :value="item.supplierCode"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="table-title" v-if="form.developState">生成MAC明细</div>
      <div v-if="isShowSimpleMac">
        <el-form-item
          label=""
          label-width="0"
          prop="macNum"
          :rules="[
            { required: true, message: '请输入本次生成MAC数量', trigger: ['blur', 'change'] },
            {
              pattern: /^(10000|[1-9]\d{0,3})$/,
              message: '正整数且小于等于10000',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="form.macNum" placeholder="请输入本次生成MAC数量" class="w-200 mt-10" />
        </el-form-item>
      </div>
      <KeenList v-else-if="form.developState">
        <template #buttons>
          <el-button type="primary" size="small" @click="addPoOrder">添加</el-button>
          <el-button type="danger" size="small" @click="batchDel">删除</el-button>
        </template>
        <el-table ref="tableRef" :data="form.poInfoList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column label="PO采购订单" prop="poCode" min-width="160" />
          <el-table-column label="订单行" prop="orderLine" min-width="100" />
          <el-table-column label="供应链产品" min-width="280">
            <template #default="{ row }">
              <GoodsInfo
                :hideImage="true"
                :title="row.productName"
                :subtitle="row.productSku"
                :url="`/supplyGoods/detail?code=${row.productSku}`"
              />
            </template>
          </el-table-column>
          <el-table-column label="订单数量" prop="qty" min-width="100" />
          <el-table-column label="本次生成MAC数量" prop="macNum" min-width="150">
            <template #default="{ row, $index }">
              <el-form-item
                label=""
                label-width="0"
                :prop="`poInfoList[${$index}].macNum`"
                :rules="[
                  { required: true, message: '请输入本次生成MAC数量', trigger: ['blur', 'change'] },
                  {
                    pattern: /^(10000|[1-9]\d{0,3})$/,
                    message: '正整数且小于等于10000',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input v-model="row.macNum" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="已生成MAC数量" prop="macQty" min-width="150" align="center" />
          <el-table-column label="操作" fixed="right" min-width="80">
            <template #default="{ row, $index }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '删除',
                    key: 'del',
                    type: 'danger',
                    row: row,
                    index: $index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </KeenList>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
  <PurchaseOrderSelect
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.poInfoList"
    :supplierCode="form.supplierCode"
  />
</template>

<script setup lang="ts">
    import { ref } from 'vue';
  import { productApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import PurchaseOrderSelect from './purchaseOrderSelect.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
    }>(),
    {
      visible: false,
    }
  );
  const formRef = ref();
  const form: any = ref({
    deriveCode: '',
    seriesCode: '',
    factoryCode: '',
    productCode: '',
    supplierCode: '',
    developState: '',
    poInfoList: [],
    macNum: '',
  });

  const developStateList = ref([
    {
      developState: 'EVT',
      developStateDesc: 'EVT',
    },
    {
      developState: 'DVT',
      developStateDesc: 'DVT',
    },
    {
      developState: 'PVT',
      developStateDesc: 'PVT',
    },
    {
      developState: 'MP',
      developStateDesc: 'MP',
    },
  ]);

  const seriesDesc = ref('');
  const deriveDesc = ref('');
  const factoryList = ref([]);
  const handleProductCodeChange = (val) => {
    form.value.developState = '';
    form.value.macNum = '';
    form.value.poInfoList = [];
    form.value.factoryCode = '';
    productCodeList.value.forEach((item: any) => {
      if (item.productCode === val) {
        seriesDesc.value = item.seriesDesc;
        deriveDesc.value = item.deriveDesc;
        form.value.seriesCode = item.seriesCode;
        form.value.deriveCode = item.deriveCode;
        factoryList.value = item.factoryList || [];
      }
    });
  };

  const handleDevelopStateChange = () => {
    if (isShowSimpleMac.value) {
      form.value.poInfoList = [];
    } else {
      form.value.macNum = '';
    }
  };

  const productCodeList = ref([]);
  const queryProductCode = async () => {
    const res: any = await productApi.luteosProductMacQueryProductCodeList({
      pageNum: 1,
      pageSize: 100,
    });
    productCodeList.value = res.productCodeList || [];
  };
  queryProductCode();

  const supplierOptionsList = ref<any[]>([]);
  const getSupplierOptions = async () => {
    const res: any = await productApi.luteosProductMacQuerySupplierList();
    supplierOptionsList.value = res?.supplierList.filter((item) => item.supplierCode);
  };

  getSupplierOptions();

  const addPoOrder = () => {
    if (!form.value.supplierCode) {
      ElMessage.warning('请选择组装厂供应商');
      return;
    }
    bindGoodsVisible.value = true;
  };

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      const poInfoList = form.value.poInfoList.map((order: any) => order.poCode) || [];
      val.forEach((order: any) => {
        if (!poInfoList.includes(order.poCode)) {
          if (!order.macNum) {
            order.macNum = parseInt(order.qty) - parseInt(order.macQty);
            if (order.macNum < 0) {
              order.macNum = 0;
            }
          }
          form.value.poInfoList.push(order);
        }
      });
    }
    bindGoodsVisible.value = false;
  };
  const handleActions = async (item) => {
    const { key, index, row } = item;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      form.value.poInfoList.splice(index, 1);
    }
  };

  // 勾选产品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  const batchDel = async () => {
    if (totalList.value.length === 0) {
      ElMessage.warning('请选择要删除的采购订单');
      return;
    }

    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;

    totalList.value.forEach((item: any) => {
      const index = form.value.poInfoList.findIndex((order: any) => order.poCode === item.poCode);
      form.value.poInfoList.splice(index, 1);
    });
  };

  // 是否展示单个生成MAC数量
  const isShowSimpleMac = computed(() => {
    return ['EVT', 'DVT'].includes(form.value.developState);
  });

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value.validate((isValid) => {
      if (isValid) {
        // PVT/MP阶段校验
        if (!isShowSimpleMac.value) {
          if (!form.value.poInfoList.length) {
            ElMessage.warning('请添加明细');
            return;
          }
        }
        saveLoading.value = true;
        productApi
          .luteosProductMacSaveMacAddress({
            ...form.value,
          })
          .then(() => {
            ElMessage.success('保存成功');
            formRef.value.resetFields();
            emit('closeModal', 'reload');
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped>
  .w-200 {
    width: 200px !important;
    line-height: 25px !important;
  }
  .factory-item {
    :deep(.el-form-item__content) {
      align-items: flex-start;
    }
    .w-200 {
      margin-top: 10px /*  */;
    }
  }
  .mr-20 {
    margin-right: 20px;
  }
  .table-title {
    border-top: 1px solid #ebeef5;
    padding-top: 15px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .mt-10 {
    margin-top: 10px;
  }
</style>
