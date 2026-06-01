<template>
  <el-form scroll-to-error :model="form" ref="formRef" label-width="220px">
    <KeenCard title="订单信息">
      <el-row :gutter="20">
        <el-col :md="24" :sm="12" :offset="0" v-if="form?.baseInfo?.errorMessage">
          <p class="red">异常信息：{{ form?.baseInfo?.errorMessage }}</p>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="移仓单号:">
            {{ form?.baseInfo?.orderId || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="店铺:">
            {{ form?.baseInfo?.shopAccount || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="发货仓库:">
            {{ form?.baseInfo?.shipWarehouseName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="国家:">
            {{ form?.baseInfo?.countryName || '-' }}
          </el-form-item>
          <el-form-item label="GSTIN No.:">
            {{ form?.baseInfo?.taxIdentifier || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="备注:">
            {{ form?.baseInfo?.remark || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="移仓原因:" prop="baseInfo.removalReason">
            {{ form?.baseInfo?.removalReason || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="海外仓预计存放时长:" prop="baseInfo.expectedStorageTime">
            {{ form?.baseInfo?.expectedStorageTime || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="是否需要贴透明或者标签出货:" prop="baseInfo.isTransparentOrLabel">
            {{ form?.baseInfo?.isTransparentOrLabel || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="海外仓操作指令:" prop="baseInfo.operationInstruction">
            {{ form?.baseInfo?.operationInstruction || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="移回店铺:" prop="baseInfo.returnShop">
            {{ form?.baseInfo?.returnShop || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="创建人:" prop="baseInfo.creator">
            <span>{{ form?.baseInfo?.creator || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="创建日期:" prop="baseInfo.createTime">
            <span>{{ form?.baseInfo?.createTime || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="状态:" prop="baseInfo.statusDesc">
            <span>{{ form?.baseInfo?.statusDesc || '-' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="地址信息" v-if="edit">
      <el-row :gutter="20">
        <el-col :md="24" :sm="12" :offset="0">
          <el-form-item label="收货信息识别:">
            <el-input
              type="textarea"
              v-model="messageText"
              @input="handleInput"
              :placeholder="`粘贴收件人\n地址\n门牌号\n城市\n省州\n邮编信息\n按换行顺序自动识别`"
              maxlength="200"
              show-word-limit
              :rows="8"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收货仓库:">
            <el-select
              placeholder="请选择收货仓库"
              v-model="form.baseInfo.receiveWarehouseId"
              @change="receiveWarehouseCodeChange"
              clearable
              filterable
            >
              <el-option
                v-for="warehouse of warehouseMap"
                :key="warehouse.warehouseId"
                :label="`${warehouse.warehouseDesc} - ${warehouse.warehouseCode}`"
                :value="warehouse.warehouseId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人:">
            <el-input v-model.trim="form.baseInfo.receiverName" placeholder="请输入收件人" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="电话号码:">
            <el-input v-model.trim="form.baseInfo.phone" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收货地址:">
            <el-input v-model.trim="form.baseInfo.address1" placeholder="请输入收货地址" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="城市:">
            <el-input v-model.trim="form.baseInfo.city" placeholder="请输入城市" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="区域:">
            <el-input v-model.trim="form.baseInfo.region" placeholder="请输入区域" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="邮政编码:">
            <el-input v-model.trim="form.baseInfo.postcode" placeholder="请输入邮政编码" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="地址信息" v-else>
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收货仓库:">
            {{ form?.baseInfo?.receiveWarehouseName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人:">
            {{ form?.baseInfo?.receiverName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="电话号码:">
            {{ form?.baseInfo?.phone || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收货地址:">
            {{ form?.baseInfo?.address1 || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="城市:">
            {{ form?.baseInfo?.city || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="区域:">
            {{ form?.baseInfo?.region || '-' }}
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="邮政编码:">
            {{ form?.baseInfo?.postcode || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="产品信息">
      <el-space>
        <el-button
          size="small"
          type="primary"
          class="mb-md-4"
          @click="refreshData"
          v-if="!['Draft', 'Auditing'].some((val) => val === form?.baseInfo?.status)"
        >
          刷新实时数据
        </el-button>
      </el-space>
      <el-table :data="form?.itemList">
        <el-table-column type="index" label="序号" min-width="70" />
        <el-table-column prop="productName" label="产品名称" min-width="140" />
        <el-table-column label="SKU信息" prop="msku" min-width="200">
          <template #default="{ row }">
            <div class="fs-7">
              MSKU： {{ row?.msku }}
              <Copy :content="row.msku" />
            </div>
            <div class="fs-7">
              FNSKU： {{ row?.fnsku }}
              <Copy :content="row.fnsku" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="ASIN" prop="asin" min-width="100" />
        <el-table-column label="可售数量" prop="sellableQuantity" min-width="100" />
        <el-table-column label="不可售数量" prop="unsellableQuantity" min-width="100" />
        <el-table-column label="销毁成本估计" prop="destructionCostEstimate" min-width="120" />
        <el-table-column label="移仓后毛利预估" prop="postRemovalProfitEstimate" min-width="130" />
        <!-- <el-table-column label="待处理" min-width="100">
          <template #default="{ row, $index }">
            <div v-if="row.shippedQuantity !== null">
              {{ row.sellableQuantity + row.unsellableQuantity - row.shippedQuantity }}
            </div>
            <div v-else>
              {{ row.sellableQuantity + row.unsellableQuantity }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出库数量" prop="shippedQuantity" min-width="100" />
        <el-table-column label="在途数量" prop="inTransitQuantity" min-width="100" />
        <el-table-column label="已入库数量" prop="receivedQuantity" min-width="100" /> -->
        <el-table-column label="已发货" prop="shippedQuantity" min-width="100" />
        <el-table-column label="已取消" prop="cancelledQuantity" min-width="100" />
        <el-table-column label="等待中" prop="inProcessQuantity" min-width="100" />
        <el-table-column label="海外仓数量" prop="skuCode" min-width="100">
          <template #default="{ row, $index }">
            <el-link
              type="primary"
              @click="goInventory(row.productName)"
              :underline="false"
              v-if="row.productName && form?.baseInfo?.receiveWarehouseCode"
            >
              查看库存
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="平台" prop="platform" />
        <el-table-column label="库龄" prop="skuCode" />
      </el-table>
    </KeenCard>
    <KeenCard title="包裹信息">
      <el-table :data="form?.shipmentLogList">
        <el-table-column label="产品信息" prop="productName" min-width="200" />
        <el-table-column label="SKU信息" prop="sku" min-width="100" />
        <el-table-column label="数量" prop="quantity" min-width="100" />
        <el-table-column label="承运商" prop="carrier" min-width="100" />
        <el-table-column label="亚马逊包裹移除跟踪号" prop="trackingNumber" min-width="140" />
        <el-table-column label="发货日期" prop="shipmentDate" min-width="100" />
        <el-table-column label="收货日期" prop="receiptDate" min-width="100" />
        <el-table-column label="物流状态" prop="logisticsStatus" min-width="100" />
      </el-table>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!look">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <!-- 暂存 -->
      <el-button type="primary" :loading="saveLoading" @click="save" v-if="edit">保存</el-button>

      <!-- 提交审核 -->
      <el-button
        type="primary"
        :loading="saveLoading"
        @click="saveApply"
        v-if="['Draft', 'PendingAudit'].some((val) => val === form?.baseInfo?.status)"
      >
        提交
      </el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="removeOrderDetail">
  import { erpApi, dataApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const form = ref({
    baseInfo: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      countryName: '',
      createTime: '',
      creator: '',
      orderId: '',
      phone: '',
      postcode: '',
      receiveWarehouseCode: '',
      receiveWarehouseId: '',
      receiveWarehouseName: '',
      receiverName: '',
      region: '',
      remark: '',
      shipWarehouseCode: '',
      shipWarehouseName: '',
      shipmentDate: '',
      shopAccount: '',
      shopName: '',
      status: '',
      statusDesc: '',
    },
    itemList: [],
  });
  const loading = ref(false);
  const edit = ref(false);
  const look = ref(true);
  // 发货仓库
  const warehouseMap = ref([]);
  const queryAllWarehouse = async () => {
    const res = await erpApi.luteosErpWarehouseQueryWarehouseListByWarehouseType({
      warehouseTypes: [3],
    });
    warehouseMap.value = res?.warehouseList || [];
    receiveWarehouseCodeChange();
  };
  const receiveWarehouseCodeChange = () => {
    const id = form.value.baseInfo.receiveWarehouseId;
    if (id && warehouseMap.value.length) {
      const find = warehouseMap.value.find((res) => {
        return res.warehouseId === id;
      });
      if (find) {
        form.value.baseInfo.receiveWarehouseCode = find.warehouseCode;
      }
    } else {
      form.value.baseInfo.receiveWarehouseCode = '';
    }
  };
  const initData = async () => {
    queryAllWarehouse();
    if (route.query.edit == '1') {
      edit.value = true;
    } else {
      edit.value = false;
    }
    if (route.query.orderId) {
      loading.value = true;
      const res: any = await erpApi.luteosErpRemovalDetail({
        orderId: route.query.orderId as string,
      });
      form.value = res;
      loading.value = false;
    }
    look.value = route.query.look === '1';
    receiveWarehouseCodeChange();
  };

  const visible = ref(false);
  if (route.query.orderId) {
    initData();
  }
  const open = () => {
    visible.value = true;
    initData();
  };
  const saveLoading = ref(false);
  const submitRepeat = ref(false);
  // 完成审核状态编辑地址
  const save = async () => {
    await erpApi.luteosErpRemovalSaveOrUpdate(form.value);
    ElMessage.success('保存成功');
    closeTabAndRefresh('removeOrder');
    router.push({
      name: 'removeOrder',
      query: { refresh: 1 },
    });
  };
  const saveApply = async () => {
    if (submitRepeat.value) {
      return;
    }
    submitRepeat.value = true;
    setTimeout(() => {
      submitRepeat.value = false;
    }, 2000);
    await erpApi.luteosErpRemovalApply({ orderIdList: [form.value?.baseInfo?.orderId] });
    ElMessage.success('提交成功');
    closeTabAndRefresh('removeOrder');
    router.push({
      name: 'removeOrder',
      query: { refresh: 1 },
    });
  };

  const refreshData = async () => {
    await erpApi.luteosErpRemovalManualSync({ orderIdList: [form.value?.baseInfo?.orderId] });
    initData();
  };
  // 跳转仓库库存页面查看海外仓库存
  const goInventory = (productName) => {
    if (productName) {
      router.push({
        name: 'tripartiteStock',
        query: {
          productName: encodeURIComponent(productName),
          receiveWarehouseCode: form.value?.baseInfo?.receiveWarehouseCode,
        },
      });
    }
  };
  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      closeTabAndRefresh('removeOrder');
      router.push({
        name: 'removeOrder',
      });
    }
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .red {
    color: #f1416c;
    margin-left: 72px;
  }

  :deep(.el-form-item__content) {
    line-height: 32px;
  }
</style>
