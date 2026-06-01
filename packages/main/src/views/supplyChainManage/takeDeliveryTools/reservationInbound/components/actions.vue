<template>
  <el-form
    :model="form"
    :disabled="mode === 'detail'"
    :rules="formRules"
    ref="formRef"
    label-width="140px"
  >
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <KeenCard :title="`送货信息${mode === 'add' ? '' : '#' + route.query.code}`">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="送货公司名称" prop="shipFromInfo.shipFromCompany">
                <el-input v-model="form.shipFromInfo.shipFromCompany" maxlength="255" />
              </el-form-item>
            </el-col>

            <el-col :span="24" :offset="0">
              <el-form-item label="联系人" prop="shipFromInfo.shipFromCotacter">
                <el-input v-model="form.shipFromInfo.shipFromCotacter" maxlength="255" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系方式" prop="shipFromInfo.shipFromPhone">
                <el-input v-model="form.shipFromInfo.shipFromPhone" maxlength="255" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="送货地址" prop="shipFromInfo.shipFromAddress">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="form.shipFromInfo.shipFromAddress"
                  maxlength="500"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </el-col>
      <el-col :span="12" :offset="0">
        <KeenCard title="收货信息">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="收货公司名称" prop="shipToInfo.shipToCompany">
                <el-input v-model="form.shipToInfo.shipToCompany" maxlength="255" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系人" prop="shipToInfo.shipToCotacter">
                <el-input v-model="form.shipToInfo.shipToCotacter" maxlength="255" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="联系方式" prop="shipToInfo.shipToPhone">
                <el-input v-model="form.shipToInfo.shipToPhone" maxlength="255" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="收货地址" prop="shipToInfo.shipToAddress">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="form.shipToInfo.shipToAddress"
                  maxlength="500"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <KeenCard title="产品信息">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="提货单">
                    <el-input v-model="form.submitOrderCode" disabled />
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="预计到货时间" prop="estimateArriveDate">
                    <el-date-picker
                      style="width: 100%"
                      v-model="form.estimateArriveDate"
                      type="date"
                      placeholder="请选择预计到货时间"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- <el-button size="small" plain type="primary" @click="addProduct">添加产品</el-button> -->
          <vxe-table
            :data="form.purchaseOrder.planPrebookInboundDetailList"
            border="inner"
            empty-text="请先选择提货单"
          >
            <vxe-column field="supplySku" title="供应链SKU" min-width="160px" />
            <vxe-column field="productName" title="产品名称" min-width="280px" />
            <vxe-column field="futureArriveQty" title="采购未交数量" min-width="120px" />
            <vxe-column
              field="estimateShipQty"
              :title="`预计发货数量(${countMap.estimateShipQty})`"
              min-width="160px"
            />
            <vxe-column
              field="estimateBoxCount"
              :title="`预计发货箱数(${countMap.estimateBoxCount})`"
              min-width="160px"
            >
              <template #default="{ row, $rowIndex }">
                <template v-if="mode !== 'detail'">
                  <el-form-item
                    class="form-table-item"
                    :prop="`purchaseOrder.planPrebookInboundDetailList[${$rowIndex}].estimateBoxCount`"
                    required
                  >
                    <NumberInput v-model="row.estimateBoxCount" :min="0" :precision="0" />
                  </el-form-item>
                </template>
                <template v-else>
                  {{ typeof row.estimateBoxCount === 'number' ? row.estimateBoxCount : '-' }}
                </template>
              </template>
            </vxe-column>
            <vxe-column
              class-name="multi"
              field="purchaseOrderCode"
              title="入库单号"
              min-width="180px"
            >
              <template #default="{ row }">
                <div
                  class="cell-container"
                  v-for="item of row.planPurchaseDetailList"
                  :key="item.poCode"
                >
                  {{ item.receivingCode || '-' }}
                </div>
              </template>
            </vxe-column>
            <vxe-column class-name="multi" field="poCode" title="采购单号" min-width="200px">
              <template #default="{ row, $rowIndex }">
                <template v-if="mode !== 'detail'">
                  <el-form-item
                    label-width="0"
                    v-for="(item, index) of row.planPurchaseDetailList"
                    :key="item.poCode"
                    :prop="`purchaseOrder.planPrebookInboundDetailList[${$rowIndex}].planPurchaseDetailList[${index}].poCode`"
                    required
                  >
                    <el-select
                      style="width: 100%"
                      v-model="row.planPurchaseDetailList[index].poCode"
                      filterable
                      clearable
                    >
                      <el-option
                        v-for="p in row.selectList"
                        :key="p.poCode"
                        :label="p.poCode + `(${p.checkQty})`"
                        :value="p.poCode"
                      />
                    </el-select>
                  </el-form-item>
                  <div class="cell-container">
                    <el-button plain type="primary" size="small" @click="add(row)">添加</el-button>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="cell-container"
                    v-for="item of row.planPurchaseDetailList"
                    :key="item.poCode"
                  >
                    {{ item.poCode }}
                  </div>
                </template>
              </template>
            </vxe-column>
            <vxe-column
              class-name="multi"
              field="realShipQty"
              :title="`发货数量(${countMap.realShipQty})`"
              min-width="200px"
            >
              <template #default="{ row, $rowIndex }">
                <template v-if="mode !== 'detail'">
                  <el-form-item
                    v-for="(item, index) of row.planPurchaseDetailList"
                    :key="item.poCode"
                    class="form-table-item"
                    :prop="`purchaseOrder.planPrebookInboundDetailList[${$rowIndex}].planPurchaseDetailList[${index}].realShipQty`"
                    required
                  >
                    <NumberInput
                      v-model="row.planPurchaseDetailList[index].realShipQty"
                      :min="0"
                      :precision="0"
                    />
                  </el-form-item>
                </template>
                <template v-else>
                  <div
                    class="cell-container"
                    v-for="item of row.planPurchaseDetailList"
                    :key="item.poCode"
                  >
                    {{ typeof item.realShipQty === 'number' ? item.realShipQty : '-' }}
                  </div>
                </template>
              </template>
            </vxe-column>
            <vxe-column class-name="multi" field="remark" title="备注" min-width="280px">
              <template #default="{ row, $rowIndex }">
                <template v-if="mode !== 'detail'">
                  <el-form-item
                    v-for="(item, index) of row.planPurchaseDetailList"
                    :key="item.poCode"
                    class="form-table-item"
                    :prop="`purchaseOrder.planPrebookInboundDetailList[${$rowIndex}].planPurchaseDetailList[${index}].remark`"
                  >
                    <el-input
                      v-model="row.planPurchaseDetailList[index].remark"
                      placeholder=""
                      clearable
                    />
                  </el-form-item>
                </template>
                <template v-else>
                  <div
                    class="cell-container"
                    v-for="item of row.planPurchaseDetailList"
                    :key="item.poCode"
                  >
                    {{ item.remark }}
                  </div>
                </template>
              </template>
            </vxe-column>
            <vxe-column class-name="multi" title="操作" width="60px">
              <template #default="{ row }">
                <div
                  class="cell-container"
                  v-for="(item, index) of row.planPurchaseDetailList"
                  :key="item.poCode"
                >
                  <el-button
                    :disabled="row.planPurchaseDetailList.length === 1"
                    link
                    @click="remove(row.planPurchaseDetailList, index)"
                  >
                    删除
                  </el-button>
                </div>
              </template>
            </vxe-column>
          </vxe-table>
        </KeenCard>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="mode === 'detail'">
      <el-col :span="24" :offset="0">
        <KeenCard title="审核信息">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) of form.logList"
              :timestamp="item.processTime"
              placement="top"
              :key="index"
            >
              <el-card>
                <p>{{ item.processUserName }}：{{ item.resultDesc }}</p>
                <p v-if="item.remark">备注：{{ item.remark }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <!-- <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-row :gutter="20">
                <el-col :span="24" :offset="0">
                  <el-form-item label="审核结果">
                    <el-radio-group v-model="form.result">
                      <el-radio :label="1">审核通过</el-radio>
                      <el-radio :label="0">审核不通过</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24" :offset="0">
                  <el-form-item label="备注">
                    <el-input
                      type="textarea"
                      :rows="3"
                      v-model="form.remark"
                      placeholder=""
                      :show-word-limit="false"
                      :autosize="{ minRows: 4, maxRows: 6 }"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24" :offset="0">
                  <el-form-item label="审核时间">
                    {{ 2023 - 11 - 13 }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row> -->
        </KeenCard>
      </el-col>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">
        {{ mode === 'add' ? '确定' : '确定并提交审核' }}
      </el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const route = useRoute();
  const router = useRouter();
  const getDetailData = async () => {
    const params: any = {};
    if (props.mode === 'add') {
      params.submitOrderCode = route.query.code as string;
    } else {
      params.prebookCode = route.query.code as string;
    }
    const res: any = await erpApi.luteosErpPlanPrebookInboundQueryInboundDetail(params);
    form.value = res;
  };
  getDetailData();
  const add = (row) => {
    row.planPurchaseDetailList.push({
      poCode: '',
      realShipQty: undefined,
      remark: '',
    });
  };
  const remove = (row, index) => {
    row.splice(index, 1);
  };
  const formRef = ref();
  const form = ref({
    estimateArriveDate: '',
    logList: [],
    purchaseOrder: {
      planPrebookInboundDetailList: [
        {
          estimateBoxCount: 1,
          estimateShipQty: 2,
          futureArriveQty: 0,
          productSku: '',
          purchaseOrderCode: '',
          title: '',
          planPurchaseDetailList: [],
        },
      ],
    },
    shipFromInfo: {
      shipFromAddress: '',
      shipFromCompany: '',
      shipFromCotacter: '',
      shipFromPhone: '',
    },
    shipToInfo: {
      shipToAddress: '',
      shipToCompany: '',
      shipToCotacter: '',
      shipToPhone: '',
    },
    submitOrderCode: '',
  });
  const formRules = ref({
    'shipFromInfo.shipFromAddress': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipFromInfo.shipFromCompany': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipFromInfo.shipFromCotacter': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipFromInfo.shipFromPhone': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipToInfo.shipToAddress': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipToInfo.shipToCompany': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipToInfo.shipToCotacter': [{ required: true, message: '该项必填', trigger: 'blur' }],
    'shipToInfo.shipToPhone': [{ required: true, message: '该项必填', trigger: 'blur' }],
    estimateArriveDate: [{ required: true, message: '该项必填', trigger: 'change' }],
  });
  const cancel = () => {
    router.push({
      name: 'reservationInbound',
    });
  };
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      let fn: any = null;
      if (props.mode === 'edit') {
        fn = erpApi.luteosErpPlanPrebookInboundUpdatePrebookInbound;
      } else if (props.mode === 'add') {
        fn = erpApi.luteosErpPlanPrebookInboundAddPrebookInbound;
      }
      await fn(form.value);
      ElMessage.success('操作成功');
      closeTabAndRefresh('reservationInbound');
      cancel();
    }
  };
  const countMap = computed(() => {
    return {
      estimateShipQty: form.value.purchaseOrder.planPrebookInboundDetailList.reduce((sum, item) => {
        return sum + +item.estimateShipQty || 0;
      }, 0),
      // receiveQty: form.value.itemInfoList.reduce((sum, item: any) => {
      //   return (
      //     sum +
      //     item.purchaseInfoList.reduce((total, row) => {
      //       return total + +row.receiveQty;
      //     }, 0)
      //   );
      // }, 0),
      estimateBoxCount: form.value.purchaseOrder.planPrebookInboundDetailList.reduce(
        (sum, item) => {
          return sum + +item.estimateBoxCount || 0;
        },
        0
      ),
      realShipQty: form.value.purchaseOrder.planPrebookInboundDetailList.reduce(
        (sum, item: any) => {
          return (
            sum +
            item.planPurchaseDetailList.reduce((total, row) => {
              return total + +row.realShipQty || 0;
            }, 0)
          );
        },
        0
      ),
    };
  });
</script>

<style scoped lang="scss">
  :deep(.el-form-item__label:after) {
    content: '：';
  }
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
