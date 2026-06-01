<template>
  <el-form :model="form" ref="formRef" v-loading="loading" :rules="rules">
    <KeenCard title="基本信息" :marginBottom="0">
      <el-space :size="32">
        <el-form-item prop="code" label="计划提货批号">
          <span>{{ form.code }}</span>
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间">
          <span>{{ form.createTime || '-' }}</span>
        </el-form-item>
        <el-form-item prop="creatorName" label="创建人">
          <span>{{ form.creatorName || '-' }}</span>
        </el-form-item>
      </el-space>
    </KeenCard>
    <KeenCard :marginBottom="0">
      <h5>
        提货计划
        <el-button v-if="mode === 'edit'" type="primary" size="small" @click="handlePlansAdd">
          添加
        </el-button>
      </h5>
      <el-form-item prop="planPickupList">
        <el-tabs
          v-if="form.planPickupList && form.planPickupList.length"
          v-model="form.supplierCode"
          style="width: 100%"
          @tab-click="handleTabClick"
        >
          <el-tab-pane
            v-for="(item, planIdx) in form.planPickupList"
            :label="item.supplierName"
            :name="item.supplierCode"
            :key="item.supplierCode"
          >
            <el-table :data="item.pickupFormatList" default-expand-all row-key="materialNumber">
              <el-table-column type="expand" fixed>
                <template #default="{ row, $index }">
                  <el-table
                    :data="row?.pickupItemList"
                    v-loading="row.loading"
                    row-key="orderNumber"
                    class="child-table-box"
                  >
                    <el-table-column label="PO单号" prop="orderNumber" min-width="140" />
                    <el-table-column label="订单行号" prop="itemNumber" min-width="80" />
                    <el-table-column label="物料编码" prop="materialNumber" min-width="120" />
                    <el-table-column label="物料名称" prop="materialName" min-width="150">
                      <template #default="prop">
                        <OverflowTooltip :content="prop.row.materialName" :line="1" />
                      </template>
                    </el-table-column>
                    <el-table-column label="供应链SKU" prop="supplySku" min-width="140" />
                    <el-table-column label="物料分类名称" prop="cateName" min-width="120" />
                    <el-table-column label="采购周期" prop="purchaseCycle" min-width="80" />
                    <el-table-column label="采购类型" prop="purchaseType" min-width="80" />
                    <el-table-column label="采购单位" prop="purchaseUnit" min-width="80" />
                    <el-table-column label="SRM行状态" prop="itemStatusDesc" min-width="100" />
                    <el-table-column label="要求交期" prop="requireDate" min-width="150">
                      <template #default="prop">
                        <el-date-picker
                          v-if="mode === 'edit'"
                          v-model="prop.row.requireDate"
                          type="date"
                          placeholder="选择日期"
                          value-format="YYYY-MM-DD"
                          style="width: 100%"
                        />
                        <span v-else>{{ prop.row.requireDate }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="原始要求交期"
                      prop="originalRequireDate"
                      min-width="120"
                    />
                    <el-table-column label="本次需求数量" prop="requireQuantity" min-width="150">
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
                          v-if="mode === 'edit'"
                          class="table-form-item"
                          :prop="`planPickupList.${planIdx}.pickupFormatList.${$index}.pickupItemList.${prop.$index}.requireQuantity`"
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
                        <span v-else>{{ prop.row.requireQuantity }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="回复日期" prop="replyDate" min-width="120" />
                    <el-table-column label="回复数量" prop="replyQuantity" min-width="100" />
                    <el-table-column
                      label="回复已发数量"
                      prop="replySentQuantity"
                      min-width="100"
                    />
                    <el-table-column
                      label="回复未发数量"
                      prop="replyNotSentQuantity"
                      min-width="100"
                    />
                    <el-table-column label="需方备注" prop="purchaseRemark" min-width="150">
                      <template #default="{ row }">
                        <el-input v-if="mode === 'edit'" v-model="row.purchaseRemark" />
                        <span v-else>{{ row.purchaseRemark }}</span>
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
              <el-table-column label="提货SKU" prop="materialNumber" />
              <el-table-column>
                <template #header>
                  <span class="text-danger">*</span>
                  提货总数量
                </template>
                <template #default="{ row, $index }">
                  <el-form-item
                    v-if="mode === 'edit'"
                    :prop="`planPickupList.${planIdx}.pickupFormatList.${$index}.pickupQuantity`"
                    :rules="validQty(row)"
                    style="margin-bottom: 12px"
                  >
                    <NumberInput
                      v-model="row.pickupQuantity"
                      placeholder="请输入提货总数量"
                      :precision="0"
                      :min="0"
                      @change="(val) => handleChangeQty(val, row)"
                    />
                  </el-form-item>
                  <span v-else>{{ row.pickupQuantity }}</span>
                </template>
              </el-table-column>
              <el-table-column label="回复总数量" prop="replyQuantity" />
              <el-table-column>
                <template #header>
                  <span class="text-danger">*</span>
                  要求交期
                </template>
                <template #default="{ row, $index }">
                  <el-form-item
                    v-if="mode === 'edit'"
                    :prop="`planPickupList.${planIdx}.pickupFormatList.${$index}.deliveryDate`"
                    :rules="[
                      { required: true, message: '请输入需求交期', trigger: ['blur', 'change'] },
                    ]"
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
                  <span v-else>{{ row.deliveryDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" v-if="mode === 'edit'">
                <el-form-item label="" prop="">
                  <template #default="{ $index }">
                    <el-button type="text" @click="item.pickupFormatList.splice($index, 1)">
                      删除
                    </el-button>
                  </template>
                </el-form-item>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </KeenCard>
  </el-form>
  <SkuMapPoOrderDialog
    ref="skuMapPoOrderRef"
    :model-value="currentPickupList"
    @update:model-value="updateCurrentPickupList"
  />
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-button @click="handleCancel">返回</el-button>
    <el-button v-if="form.display" type="danger" @click="handleDelete" :loading="deleteLoading">
      整单删除
    </el-button>
    <el-button v-if="form.display" type="primary" @click="handlePushSupplier">推送供应商</el-button>
    <el-button v-if="form.display" type="primary" @click="handleEdit" :disabled="mode === 'edit'">
      编辑
    </el-button>
    <el-button
      v-if="form.display"
      type="primary"
      :disabled="mode === 'view'"
      @click="handleSave"
      :loading="saveLoading"
    >
      保存
    </el-button>
  </div>
</template>

<script setup lang="ts" name="allPickupPlanDetail">
  import { ref, computed, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api';
  import { useTabs } from '@/hooks/tabs';
  import * as swal from '@/utils/swal';
  import SkuMapPoOrderDialog from './components/skuMapPoOrderDialog.vue';
  import { getPickupItemList, validQty, validPoQty } from './util';

  const router = useRouter();
  const route = useRoute();
  const { closeTabAndRefresh } = useTabs();
  const code = route.query.planCode as string;

  const mode = ref<'view' | 'edit'>('view');
  const loading = ref(false);
  const formRef = ref();
  const skuMapPoOrderRef = ref();
  const form = ref<any>({
    supplierCode: undefined, // 供应商编码
    supplierName: undefined, // 供应商名称
    code: route.query.planCode, // 计划提货批号
    planPickupList: [], // 所有数据
    display: false, // 底部操作按钮显示标志
  });
  const rules = reactive({});

  const currentPickupList = computed(() => {
    if (!form.value.supplierCode || !form.value.planPickupList) {
      return [];
    }
    const currentPlan = form.value.planPickupList.find(
      (p: any) => p.supplierCode === form.value.supplierCode
    );
    return currentPlan ? currentPlan.pickupFormatList : [];
  });

  const getDetailData = async () => {
    try {
      const res = await erpApi.luteosErpPlanPickupQueryDetailByCode({ code });
      form.value = {
        ...res,
        supplierCode: route.query.supplierCode,
      };
    } catch (error) {}
  };
  getDetailData();

  const handleTabClick = (tab: any) => {
    form.value.supplierCode = tab.paneName;
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
  // 修改要求交期
  const handleChangeDeliveryDate = (val, row) => {
    if (!val) return;
    if (row.pickupItemList.length) {
      row.pickupItemList.forEach((item) => {
        item.requireDate = val;
      });
    }
  };
  const updateCurrentPickupList = (newValue: any[]) => {
    if (!form.value.supplierCode || !form.value.planPickupList) {
      return;
    }
    const currentPlan = form.value.planPickupList.find(
      (p: any) => p.supplierCode === form.value.supplierCode
    );
    if (currentPlan) {
      currentPlan.pickupFormatList = newValue;
    }
  };

  const handlePlansAdd = () => {
    if (!form.value.supplierCode) {
      ElMessage.warning('请先选择一个供应商标签页');
      return;
    }
    skuMapPoOrderRef.value.open(form.value.supplierCode);
  };

  const handleCancel = async () => {
    if (mode.value === 'view') {
      closeTabAndRefresh('pickupPlan');
      router.push({
        name: 'pickupPlan',
      });
    } else {
      mode.value = 'view';
      getDetailData();
    }
  };
  const handleEdit = () => {
    if (mode.value === 'edit') {
      mode.value = 'view';
      getDetailData();
    } else {
      mode.value = 'edit';
    }
  };
  const handlePushSupplier = async () => {
    try {
      const confirmed = await swal.confirm('确认推送该计划提货单吗？');
      if (!confirmed) return;
      const supplierPickupCodeList = form.value.planPickupList.map(
        (item: any) => item.supplierPickupCode
      );
      await erpApi.luteosErpPlanPickupPushSupplier({ supplierPickupCodeList });
      ElMessage.success('推送成功');
      getDetailData();
    } catch (error) {}
  };
  // 整单删除
  const deleteLoading = ref(false);
  const handleDelete = async () => {
    try {
      const confirmed = await swal.confirm('确认删除该计划提货单吗？');
      if (!confirmed) return;
      const uniqueIdList = form.value.planPickupList.map((item: any) => item.uniqueId);
      deleteLoading.value = true;
      await erpApi.luteosErpPlanPickupDelete({ uniqueIdList });
      ElMessage.success('删除成功');
      closeTabAndRefresh('pickupPlan');
      router.push({
        name: 'pickupPlan',
      });
    } finally {
      deleteLoading.value = false;
    }
  };
  const saveLoading = ref(false);
  const handleSave = async () => {
    // 保存逻辑
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      try {
        await erpApi.luteosErpPlanPickupBatchSave({
          ...form.value,
        });
      } catch (error) {
      } finally {
        saveLoading.value = false;
        mode.value = 'view';
        getDetailData();
      }
    }
  };
</script>

<style scoped lang="scss">
  :deep(.el-table.is-scrolling-none th.el-table-fixed-column--left) {
    background: none;
  }
  :deep(.el-tabs__header) {
    padding-left: 10px;
  }
  :deep(.el-tabs__content) {
    padding-top: 8px;
    padding-left: 8px;
  }
  :deep(.py-4) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .quantity-error {
    position: absolute;
    left: 12px;
    bottom: -10px;
    font-size: 12px;
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
  .child-table-box {
    border-bottom: none;
    :deep(td.el-table__cell) {
      border-bottom-color: #f5f5f5 !important;
      border-right-color: transparent !important;
      padding: 0 12px 4px 12px;
    }
  }
  :deep(.el-form-item__error) {
    padding-top: 0.1rem;
    font-size: 10px;
  }
</style>
