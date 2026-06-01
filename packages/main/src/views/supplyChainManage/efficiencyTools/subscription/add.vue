<template>
  <KeenCard v-if="!isAdd">
    <AuditHeader :flowName="form.baseInfo?.flowName" :authNodeList="form.authNodeList" />
  </KeenCard>
  <el-form scroll-to-error :model="form" ref="formRef" :rules="rules" label-width="140px">
    <KeenCard title="基本信息">
      <el-form
        scroll-to-error
        label-width="140px"
        :disabled="isAudit || form.baseInfo.canEditHead === false"
        ref="infoFormRef"
        :model="form"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="申购单号">
              <el-input disabled :value="isAdd ? '系统自动生成' : form.baseInfo.code" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="采购申请类型" prop="baseInfo.type">
              <el-select v-model="form.baseInfo.type" style="width: 100%">
                <el-option :value="1" label="原料采购" />
                <el-option :value="2" label="备品备件采购申请" />
                <el-option :value="3" label="维修服务类采购申请" />
                <el-option :value="4" label="物资材料" />
                <el-option :value="5" label="成品采购" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="采购仓库" prop="baseInfo.warehouseCode">
              <el-select
                v-model="form.baseInfo.warehouseCode"
                style="width: 100%"
                clearable
                filterable
              >
                <el-option
                  v-for="item in warehouseList"
                  :key="item.warehouseCode"
                  :label="item.warehouseDesc"
                  :value="item.warehouseCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="采购负责人" prop="baseInfo.purchaser">
              <DeptMember v-model="form.baseInfo.purchaser" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="币别">
              <CurrencySelect v-model="form.baseInfo.currency" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :offset="0">
            <el-form-item label="申购时间">
              <el-input disabled :value="isAdd ? '系统自动生成' : form.baseInfo.submitTime" />
            </el-form-item>
          </el-col>
          <el-col :md="16" :sm="24" :offset="0">
            <el-form-item label="备注">
              <el-input v-model="form.baseInfo.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </KeenCard>
    <KeenCard title="产品明细">
      <el-button v-if="!isAudit" type="primary" @click="visible = true">添加产品</el-button>
      <el-button v-if="!isAudit" type="primary" class="mx-3" @click="batchUpdateDialogRef?.open">
        批量添加产品
      </el-button>
      <el-form
        scroll-to-error
        label-width="140px"
        :disabled="isAudit"
        ref="productFormRef"
        :model="form"
        :rules="rules"
      >
        <el-table :data="form.itemList" empty-text="请选择产品" class="py-4">
          <el-table-column prop="productSku" min-width="240px" label="供应链SKU" />
          <el-table-column prop="productName" min-width="240px" label="产品名称" />
          <el-table-column prop="skuCode" min-width="240px" label="产品SKU" />
          <el-table-column prop="supplierName" min-width="240px" label="供应商名称" />
          <el-table-column prop="suggestQty" min-width="240px" label="建议需求数量" />
          <el-table-column prop="qty" min-width="240px" label="申购数量">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`itemList[${$index}].qty`"
                :rules="[
                  {
                    required: true,
                    type: 'number',
                    min: 1,
                    message: '请输入申购数量',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <Num
                  :disabled="row.statusDesc2 === '全部转订单'"
                  v-model="row.qty"
                  :precision="0"
                  :min="0"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="purchaseIsFirst" min-width="160px" label="是否首单">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`itemList[${$index}].purchaseIsFirst`"
                :rules="[
                  {
                    required: true,
                    message: '请选择',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-select v-model="row.purchaseIsFirst">
                  <el-option :value="0" label="新单" />
                  <el-option :value="1" label="试产单" />
                  <el-option :value="2" label="翻单" />
                  <el-option :value="3" label="样品订单" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="deliveryTime" min-width="240px" label="交付时间">
            <template #default="{ row, $index }">
              <el-form-item
                class="table-form-item"
                :prop="`itemList[${$index}].deliveryTime`"
                :rules="[{ required: true, message: '请选择日期', trigger: ['blur', 'change'] }]"
              >
                <el-date-picker
                  :disabled="row.statusDesc2 === '全部转订单'"
                  v-model="row.deliveryTime"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" min-width="240px" label="备注">
            <template #default="{ row }">
              <el-input :disabled="row.statusDesc2 === '全部转订单'" v-model="row.remark" />
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="statusDesc" min-width="120px">
            <template #default="{ row }">
              <Tag v-if="row.statusDesc2" :color="statusColorMap[row.statusDesc2]">
                {{ row.statusDesc2 }}
              </Tag>
              <span v-else>{{ '--' }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="240px" label="操作" v-if="!isAudit">
            <template #default="{ row, $index }">
              <el-link
                v-if="form.itemList?.length > 1"
                size="small"
                type="danger"
                @click="handleDelete($index)"
                :underline="false"
                :disabled="row.statusDesc2 === '全部转订单'"
              >
                删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </KeenCard>
    <KeenCard title="审核内容" v-if="isAudit">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item
            label="审核结果"
            prop="pass"
            :rules="[{ required: true, message: '请选择审核结果' }]"
          >
            <el-radio-group v-model="form.pass">
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
            <el-input v-model="form.remark" type="textarea" :rows="6" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">
        {{ isEdit ? '确定并提交审核' : '确定' }}
      </el-button>
    </el-space>
  </div>
  <ProductDialog
    v-if="visible"
    :visible="visible"
    @close="visible = false"
    @save="handleSave"
    :selected-rows="form.itemList"
  />
  <ImportUpdateDialog
    title="批量添加产品"
    notice="请注意标黄必填字段，未填写必填字段将上传失败"
    :downloadParams="form.itemList"
    type="batchUpdate"
    ref="batchUpdateDialogRef"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts" name="subscriptionAdd">
  import * as swal from '@/utils/swal';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { dataApi, erpApi } from '@/api';
  import ProductDialog from '@/views/supplyChainManage/efficiencyTools/subscription/components/productDialog.vue';
  import Num from '@/components/NumberInput/index.vue';
  import { WarehouseBean } from '@/api/data/data-contracts';
  import ImportUpdateDialog from '@/views/supplyChainManage/efficiencyTools/subscription/components/importUpdateDialog.vue';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const statusColorMap = {
    待订单: 'yellow',
    部分转订单: 'purple',
    未知: 'black',
    全部转订单: 'green',
  };

  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });

  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });

  const isAudit = computed(() => {
    return route.fullPath.includes('/audit');
  });

  const batchUpdateDialogRef = ref();
  const formRef = ref<FormInstance>();
  const infoFormRef = ref<FormInstance>();
  const productFormRef = ref<FormInstance>();
  const form = ref({
    baseInfo: {
      code: '',
      type: 5,
      warehouseCode: '',
      purchaser: '',
      currency: 'CNY',
      remark: '',
    },
    itemList: [],
  });
  const rules = reactive<FormRules>({
    'baseInfo.type': [
      {
        required: true,
        message: '请选择采购申请类型',
        trigger: 'change',
      },
    ],
    'baseInfo.warehouseCode': [
      {
        required: true,
        message: '请选择采购仓库',
        trigger: 'change',
      },
    ],
    'baseInfo.purchaser': [
      {
        required: true,
        message: '请选择采购负责人',
        trigger: 'change',
      },
    ],
  });

  const route = useRoute();
  if (route.params?.list && JSON.parse(route.params?.list)?.length > 0) {
    form.value.itemList = JSON.parse(route.params.list)?.map((item: any) => {
      return {
        productName: item.产品SKU名称,
        skuCode: item.产品SKU,
        suggestQty: item.建议需求数量,
        qty: Math.max(item.建议需求数量, 0),
      };
    });
  }

  const getDetailInfo = async () => {
    const res = await erpApi.luteosErpPrQueryDetail({
      code: route.query.code as string,
    });
    form.value = res;
    if (
      (res.baseInfo?.status !== 0 && isAudit.value) ||
      (![1, 2].includes(res.baseInfo?.status) &&
        res.baseInfo?.statusDesc2 !== '部分转订单' &&
        isEdit.value)
    ) {
      router.push({
        path: '/subscription/detail',
        query: { code: route.query.code as string },
      });
    }
  };

  if (route.query?.code) {
    getDetailInfo();
  }

  const visible = ref(false);
  const handleSave = (list) => {
    const oldList = form.value.itemList?.filter((item) =>
      list.find((i) => i.skuCode === item.skuCode)
    );
    const diffList = list
      .filter((item: any) => {
        return !oldList.find((old: any) => {
          return old.skuCode === item.skuCode;
        });
      })
      ?.map((item: any) => {
        return {
          productName: item.skuName || item.productName,
          skuCode: item.skuCode,
          productSku: item.productSku,
          supplierName: item.supplierName,
          suggestQty: item.suggestQty || 0,
          qty: item.qty,
          deliveryTime: item.deliveryTime,
        };
      });
    form.value.itemList = oldList?.concat(diffList);
    visible.value = false;
  };

  const handleDelete = (index) => {
    form.value.itemList.splice(index, 1);
  };

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      infoFormRef.value?.validate().catch(() => false),
      productFormRef.value?.validate().catch(() => false),
    ]);
    if (valid) {
      if (!form.value.itemList.length) {
        ElMessage.warning('请选择产品');
      } else {
        saveLoading.value = true;
        await (isAudit.value
          ? erpApi.luteosErpPrAuth({
              code: route.query.code as string,
              pass: form.value.pass,
              remark: form.value.remark,
            })
          : isEdit.value
          ? erpApi.luteosErpPrUpdate(form.value)
          : erpApi.luteosErpPrSave(form.value)
        ).finally(() => {
          saveLoading.value = false;
        });
        ElMessage.success('操作成功');
        closeTabAndRefresh('subscription');
        router.push({
          name: 'subscription',
        });
      }
    }
  };

  const handleSuccess = (res) => {
    console.log(res);
    const errList = res?.filter((item) => item.errorMessage);
    const errMessage = `部分产品添加失败，以下是错误原因<br>${errList
      .map((item) => `${item.skuCode ? item.skuCode : item.productSku}：${item.errorMessage}`)
      .join('<br>')}`;
    if (errList.length) {
      swal.error({
        title: '添加失败',
        html: errMessage,
      });
    }
    form.value.itemList = res?.filter((item) => !item.errorMessage);
  };

  const warehouseList = ref<WarehouseBean[]>([]);
  const getWarehouseList = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      page: 1,
      pageSize: 1000,
    });
    warehouseList.value = res?.warehouseList;
  };
  getWarehouseList();

  const router = useRouter();
  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      router.push({
        name: 'subscription',
      });
    }
  };
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
    }
  }
</style>
