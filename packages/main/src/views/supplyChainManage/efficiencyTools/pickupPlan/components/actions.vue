<template>
  <el-form :model="form" ref="formRef" :rules="rules" v-loading="loading" scroll-to-error>
    <KeenCard title="基本信息" :marginBottom="0">
      <el-space :size="32">
        <el-form-item prop="supplierPickupCode" label="供应商提货批号" v-if="props.mode !== 'add'">
          <span>{{ form.supplierPickupCode }}</span>
        </el-form-item>
        <el-form-item prop="supplierCode" label="供应商" style="min-width: 350px">
          <SupplierSelect
            v-model="form.supplierCode"
            @change="handleChangeSupplier"
            :disabled="props.mode === 'edit'"
          />
        </el-form-item>
        <!-- <el-form-item prop="supplierName" label="供应商名称">
          <el-input v-model="form.supplierName" disabled />
        </el-form-item> -->
        <el-form-item />
      </el-space>
    </KeenCard>
    <KeenCard :marginBottom="0">
      <div class="d-flex align-items-center mb-2">
        <h5 style="margin-bottom: 0">提货计划</h5>
        <el-button
          type="primary"
          size="small"
          :disabled="!form.supplierCode"
          class="ms-2"
          @click="handlePlansAdd"
        >
          添加
        </el-button>
      </div>
      <el-table
        :data="form.pickupFormatList"
        default-expand-all
        row-key="materialNumber"
        class="parent-table-box"
      >
        <el-table-column type="expand" fixed>
          <template #default="{ row, $index }">
            <el-table
              :data="row?.pickupItemList"
              v-loading="row.loading"
              row-key="orderNumber"
              border
              class="child-table-box"
            >
              <el-table-column label="PO单号" prop="orderNumber" min-width="150" fixed="left" />
              <el-table-column label="订单行号" prop="itemNumber" min-width="80" />
              <el-table-column label="物料编码" prop="materialNumber" min-width="140" />
              <el-table-column label="供应链SKU" prop="supplySku" min-width="140" />
              <el-table-column label="物料名称" prop="materialName" min-width="150">
                <template #default="{ row }">
                  <OverflowTooltip :content="row.materialName" :line="1" />
                </template>
              </el-table-column>
              <el-table-column label="物料分类名称" prop="cateName" min-width="120" />
              <el-table-column label="采购周期" prop="purchaseCycle" min-width="100" />
              <el-table-column label="采购类型" prop="purchaseType" min-width="100" />
              <el-table-column label="采购单位" prop="purchaseUnit" min-width="80" />
              <el-table-column label="供应商确认状态" prop="statusDesc" min-width="120" />
              <el-table-column label="SRM行状态" prop="itemStatusDesc" min-width="100" />
              <el-table-column label="要求交期" prop="requireDate" min-width="150">
                <template #default="{ row }">
                  <el-date-picker
                    v-model="row.requireDate"
                    type="date"
                    placeholder="要求交期"
                    value-format="YYYY-MM-DD"
                    format="YYYY-MM-DD"
                    style="width: 100%"
                  />
                </template>
              </el-table-column>
              <el-table-column label="原始要求交期" prop="originalRequireDate" min-width="120" />
              <el-table-column prop="requireQuantity" min-width="150">
                <template #header>
                  <div class="d-flex align-items-center">
                    <span class="text-danger">*</span>
                    <span>本次需求数量</span>
                    <el-tooltip
                      popper-class="action_tool_tip text-gray-600"
                      placement="top"
                      effect="light"
                      content="PO单需求数量汇总必须等于所属sku提货总数量"
                    >
                      <QuestionFilled class="question-icon" />
                    </el-tooltip>
                  </div>
                </template>
                <template #default="prop">
                  <el-form-item
                    class="table-form-item"
                    :prop="`pickupFormatList.${$index}.pickupItemList.${prop.$index}.requireQuantity`"
                    :rules="validPoQty(row)"
                    style="margin-bottom: 12px; padding-top: 12px"
                  >
                    <NumberInput
                      v-model="prop.row.requireQuantity"
                      placeholder="本次需求数量"
                      :precision="0"
                      :min="0"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="回复日期" prop="replyDate" min-width="120" />
              <el-table-column label="回复数量" prop="replyQuantity" min-width="100" />
              <el-table-column label="回复已发数量" prop="replySentQuantity" min-width="100" />
              <el-table-column label="回复未发数量" prop="replyNotSentQuantity" min-width="100" />
              <el-table-column label="需方备注" prop="purchaseRemark" min-width="120">
                <template #default="{ row }">
                  <el-input v-model="row.purchaseRemark" />
                </template>
              </el-table-column>
              <el-table-column label="供方备注" prop="supplierRemark" min-width="120" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50">
          <template #default="{ $index }">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column>
          <template #header>
            <span class="text-danger">*</span>
            提货SKU
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`pickupFormatList.${$index}.materialNumber`"
              :rules="[{ required: true, message: '请输入提货SKU', trigger: ['blur', 'change'] }]"
            >
              <el-input v-model="row.materialNumber" disabled />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <span class="text-danger">*</span>
            <span>提货总数量</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`pickupFormatList.${$index}.pickupQuantity`"
              :rules="validQty(row)"
            >
              <NumberInput
                v-model="row.pickupQuantity"
                placeholder="请输入提货总数量"
                :precision="0"
                :min="0"
                @change="(val) => handleChangeQty(val, row)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="回复总数量">
          <template #default="{ row, $index }">
            <el-form-item :prop="`pickupFormatList.${$index}.replyQuantity`">
              <span>{{ row.replyQuantity || '-' }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <span class="text-danger">*</span>
            要求交期
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`pickupFormatList.${$index}.deliveryDate`"
              :rules="[{ required: true, message: '请输入需求交期', trigger: ['blur', 'change'] }]"
            >
              <el-date-picker
                v-model="row.deliveryDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                @change="(val) => handleChangeDeliveryDate(val, row)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ $index }">
            <el-form-item>
              <el-button
                v-if="$index !== 0"
                type="danger"
                link
                @click="form.pickupFormatList.splice($index, 1)"
              >
                删除
              </el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
  </el-form>
  <SkuMapPoOrderDialog ref="skuMapPoOrderRef" v-model="form.pickupFormatList" />
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
      <!-- <el-button type="primary" @click="handlePush" :loading="saveLoading">推送</el-button> -->
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { FormRules, ElMessage } from 'element-plus';
  import { erpApi } from '@/api';
  import { useTabs } from '@/hooks/tabs';
  import SkuMapPoOrderDialog from './skuMapPoOrderDialog.vue';
  import SupplierSelect from './supplierSelect.vue';
  import { getPickupItemList, validQty, validPoQty } from '../util';

  const router = useRouter();
  const route = useRoute();
  const { closeTabAndRefresh } = useTabs();
  const itemId = route.query.itemId as string;

  const props = defineProps<{
    mode: 'add' | 'edit';
  }>();

  const loading = ref(false);
  const saveLoading = ref(false);
  const formRef = ref();
  const form = ref<any>({
    supplierCode: undefined, // 供应商编码
    supplierName: undefined, // 供应商名称
    code: undefined, // 计划提货批号
    supplierPickupCode: undefined, // 供应商提货批号
    pickupFormatList: [], // 提货计划
  });
  const skuMapPoOrderRef = ref();
  const selectedSkuList = ref<any[]>([]); // 列表展示数据
  const rules = reactive<FormRules>({
    supplierCode: [
      {
        required: true,
        message: '请选择供应商',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const handleChangeSupplier = (val) => {
    // 获取该供应商可选的采购单数据
    form.value.supplierName = val.name || '';
    form.value.pickupFormatList = [];
  };

  watchEffect(() => {
    if (selectedSkuList.value.length) {
      form.value.pickupFormatList = selectedSkuList.value;
    }
  });

  onMounted(() => {
    if (itemId) {
      getDetailData();
    }
  });

  const getDetailData = async () => {
    loading.value = true;
    try {
      const res = await erpApi.luteosErpPlanPickupQueryDetail({ itemId });
      form.value = { ...res };
      // form.value = res;
      selectedSkuList.value = res.pickupFormatList || [];
    } finally {
      loading.value = false;
    }
  };
  // 修改提货数量
  const handleChangeQty = async (v, row) => {
    if (!v || v > row.notDeliveryQuantity) {
      return;
    }
    row.loading = true;
    const { materialNumber, deliveryDate } = row;
    const requireQuantity = v;
    const { supplierCode } = form.value;
    const res = await getPickupItemList({
      materialNumber,
      requireQuantity,
      supplierCode,
      deliveryDate,
    }).finally(() => {
      row.loading = false;
    });
    row.pickupItemList = res.recordList || [];
  };
  // 修改提货日期
  const handleChangeDeliveryDate = (val, row) => {
    if (!val) return;
    if (row.pickupItemList.length) {
      row.pickupItemList.forEach((item) => {
        item.requireDate = val;
      });
    }
  };
  const handlePlansAdd = () => {
    skuMapPoOrderRef.value.open(form.value.supplierCode);
  };
  const save = () => {
    formRef.value
      .validate(async (valid) => {
        if (valid) {
          saveLoading.value = true;
          try {
            const url =
              props.mode === 'add'
                ? erpApi.luteosErpPlanPickupSave
                : erpApi.luteosErpPlanPickupEdit;
            await url(form.value);
            ElMessage.success('保存成功');
            close();
          } finally {
            saveLoading.value = false;
          }
        }
      })
      .catch(() => false);
  };
  const close = () => {
    closeTabAndRefresh('pickupPlan');
    router.push({
      name: 'pickupPlan',
    });
  };
</script>

<style scoped lang="scss">
  :deep(.el-input-number) {
    width: 100%;
    .el-input__inner {
      text-align: left;
    }
  }
  :deep(.el-form-item__error) {
    padding-top: 0.1rem;
  }
  .question-icon {
    width: 15px;
    height: 15px;
    margin-left: 2px;
    color: var(--bs-success);
  }
  :deep(td.el-table__cell) {
    padding: 12px 12px 0 12px;
    border-bottom: none;
  }
  .parent-table-box {
    :deep(.el-table__expanded-cell) {
      padding-top: 0;
    }
  }

  .child-table-box {
    border-bottom: none;
    :deep(td.el-table__cell) {
      border-bottom-color: #f5f5f5 !important;
      border-right-color: transparent !important;
      padding: 0 12px 4px 12px;
    }
  }
</style>
