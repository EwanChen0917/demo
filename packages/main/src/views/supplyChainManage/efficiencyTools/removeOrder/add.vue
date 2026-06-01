<template>
  <!-- <AuditHeader :flowName="form?.baseInfo?.flowName" :authNodeList="form?.authNodeList" /> -->
  <el-form scroll-to-error :model="form" ref="formRef" :rules="rules" label-width="220px">
    <KeenCard title="订单信息">
      <el-row :gutter="20">
        <el-col :md="24" :sm="12" :offset="0" v-if="form?.baseInfo?.errorMessage">
          <p class="red">异常信息：{{ form?.baseInfo?.errorMessage }}</p>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0" v-if="isEdit">
          <el-form-item label="移仓单号:" prop="baseInfo.orderId">
            <el-input v-model="form.baseInfo.orderId" disabled placeholder="系统自动生成" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="店铺:"
            prop="baseInfo.shopAccount"
            :rules="[{ required: true, message: '请选择店铺', trigger: ['change'] }]"
          >
            <ProductShopSelect v-model="form.baseInfo.shopAccount" placeholder="店铺" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="发货仓库:"
            prop="baseInfo.shipWarehouseId"
            :rules="[{ required: true, message: '请选择发货仓库', trigger: ['change'] }]"
          >
            <el-select
              placeholder="请选择发货仓库"
              v-model="form.baseInfo.shipWarehouseId"
              clearable
              filterable
              @change="changeShipWarehouseCode"
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
          <el-form-item
            label="国家:"
            prop="baseInfo.country"
            :rules="[{ required: true, message: '请选择国家', trigger: ['change'] }]"
          >
            <CountrySelect v-model="form.baseInfo.country" placeholder="国家" clearable />
          </el-form-item>
          <el-form-item
            label="GSTIN No.:"
            v-if="form.baseInfo.country === 'IN'"
            prop="baseInfo.taxIdentifier"
            :rules="[
              {
                required: form.baseInfo.country === 'IN',
                message: '请输入GSTIN No.',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input
              v-model="form.baseInfo.taxIdentifier"
              placeholder="请输入GSTIN No."
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="16" :offset="0">
          <el-form-item label="备注:" prop="baseInfo.remark">
            <el-input
              type="textarea"
              v-model.trim="form.baseInfo.remark"
              placeholder="请输入备注"
              maxlength="200"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="移仓原因:"
            prop="baseInfo.removalReason"
            :rules="[{ required: true, message: '请选择移仓原因', trigger: ['change'] }]"
          >
            <el-select
              placeholder="请选择移仓原因"
              v-model="form.baseInfo.removalReason"
              clearable
              filterable
            >
              <el-option
                v-for="item of removalReasonList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="海外仓预计存放时长:"
            prop="baseInfo.expectedStorageTime"
            :rules="[{ required: true, message: '请选择海外仓预计存放时长', trigger: ['change'] }]"
          >
            <el-select
              placeholder="请选择海外仓预计存放时长"
              v-model="form.baseInfo.expectedStorageTime"
              clearable
              filterable
            >
              <el-option
                v-for="item of expectedStorageTimeList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="是否需要贴透明或者标签出货:"
            prop="baseInfo.isTransparentOrLabel"
            :rules="[{ required: true, message: '请输入', trigger: ['change'] }]"
          >
            <el-switch
              v-model="form.baseInfo.isTransparentOrLabel"
              active-value="是"
              inactive-value="否"
            />
            <!-- <el-input v-model="form.baseInfo.isTransparentOrLabel" placeholder="" /> -->
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="海外仓操作指令:"
            prop="baseInfo.operationInstruction"
            :rules="[{ required: true, message: '请选择海外仓操作指令', trigger: ['change'] }]"
          >
            <el-select
              placeholder="请选择海外仓操作指令"
              v-model="form.baseInfo.operationInstruction"
              clearable
              filterable
            >
              <el-option
                v-for="item of operationInstructionList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="移回店铺:"
            prop="baseInfo.returnShop"
            :rules="[{ required: true, message: '请输入', trigger: ['change'] }]"
          >
            <el-input v-model="form.baseInfo.returnShop" placeholder="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="edit">
        <el-col :span="8" :offset="0">
          <el-form-item label="创建人:" prop="baseInfo.creator">
            <span>{{ form.baseInfo.creator }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="创建日期:" prop="baseInfo.createTime">
            <span>{{ form.baseInfo.createTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="状态:" prop="baseInfo.statusDesc">
            <span>{{ form.baseInfo.statusDesc }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="地址信息">
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
                v-for="warehouse of receiveWarehouseCode"
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
        <!-- <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="地址2:">
            <el-input v-model.trim="form.baseInfo.address2" placeholder="请输入地址2" />
          </el-form-item>
        </el-col> -->
      </el-row>
    </KeenCard>
    <KeenCard title="产品信息">
      <el-space>
        <el-button
          size="small"
          type="primary"
          :disabled="!form.baseInfo.shipWarehouseId"
          @click="productDialogVisible = true"
        >
          {{ !form.baseInfo.shipWarehouseId ? '请先选择发货仓库' : '添加产品' }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="refreshData"
          v-if="!isAdd && !['Draft', 'Auditing'].some((val) => val === form?.baseInfo?.status)"
        >
          刷新实时数据
        </el-button>
      </el-space>
      <el-table class="mt-4" :data="form?.itemList">
        <el-table-column type="index" label="序号" min-width="70" />
        <el-table-column prop="productName" label="产品名称" min-width="140" />
        <el-table-column label="SKU信息" prop="msku" min-width="230">
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
        <el-table-column label="ASIN" prop="asin" min-width="110" />
        <el-table-column label="可售数量" prop="sellableQuantity" min-width="200">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemList[${$index}].sellableQuantity`"
              :rules="[
                { required: true, message: '请填写可售数量', trigger: 'change' },
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (value > row.sellableQuantityMax) {
                      callback(new Error('可售库存数量不足'));
                    } else if (
                      Number(row.sellableQuantity) + Number(row.unsellableQuantity) ===
                      0
                    ) {
                      callback(new Error('可售数量+不可售数量必须大于0'));
                    } else {
                      callback();
                    }
                  },
                  trigger: 'blur',
                },
              ]"
            >
              <NumberInput
                v-model="row.sellableQuantity"
                :precision="0"
                :min="0"
                :max="row.sellableQuantityMax ? row.sellableQuantityMax : 100000000"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="不可售数量" prop="unsellableQuantity" min-width="200">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemList[${$index}].unsellableQuantity`"
              :rules="[
                { required: true, message: '请填写不可售数量', trigger: 'change' },
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (value > row.unsellableQuantityMax) {
                      callback(new Error('不可售库存数量不足'));
                    } else if (
                      Number(row.sellableQuantity) + Number(row.unsellableQuantity) ===
                      0
                    ) {
                      callback(new Error('可售数量+不可售数量必须大于0'));
                    } else {
                      callback();
                    }
                  },
                  trigger: 'blur',
                },
              ]"
            >
              <NumberInput
                v-model="row.unsellableQuantity"
                :precision="0"
                :min="0"
                :max="row.unsellableQuantityMax ? row.unsellableQuantityMax : 100000000"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="销毁成本估计" min-width="180">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemList[${$index}].destructionCostEstimate`"
              :rules="[
                { required: true, message: '请填写销毁成本估计', trigger: 'change' },
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (value < 1) {
                      callback(new Error('销毁成本估计必须大于0'));
                    } else {
                      callback();
                    }
                  },
                  trigger: 'blur',
                },
              ]"
            >
              <NumberInput
                v-model="row.destructionCostEstimate"
                :precision="0"
                :min="0"
                :max="100000000"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="移仓后毛利预估" min-width="180">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemList[${$index}].postRemovalProfitEstimate`"
              :rules="[
                { required: true, message: '请填写移仓后毛利预估', trigger: 'change' },
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (value < 1) {
                      callback(new Error('移仓后毛利预估必须大于0'));
                    } else {
                      callback();
                    }
                  },
                  trigger: 'blur',
                },
              ]"
            >
              <NumberInput
                v-model="row.postRemovalProfitEstimate"
                :precision="0"
                :min="0"
                :max="100000000"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <!-- <el-table-column label="待处理" min-width="100">
          <template #default="{ row, $index }">
            <div v-if="row.shippedQuantity !== null">
              {{ row.sellableQuantity + row.unsellableQuantity - row.shippedQuantity }}
            </div>
            <div v-else>
              {{ row.sellableQuantity + row.unsellableQuantity }}
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="出库数量" prop="shippedQuantity" min-width="100" />
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
        <el-table-column label="库龄">
          <template #default="{ row, $index }">
            <div>{{ getkuTime(row.firstReceiptTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120px">
          <template #default="{ row, $index }">
            <div>
              <el-link type="danger" @click="remove($index)" :underline="false">删除</el-link>
            </div>
          </template>
        </el-table-column>
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
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <!-- 暂存 -->
      <el-button type="primary" :loading="saveLoading" @click="save(0)">保存</el-button>
      <!-- 提交审核 -->
      <el-button
        type="primary"
        :loading="saveLoading"
        @click="saveApply"
        v-if="form.baseInfo.status !== 'AuditApproved'"
      >
        提交
      </el-button>
    </el-space>
  </div>
  <ProductDialog
    :warehouseCode="warehouseCode"
    :searchErpQuotation="true"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="form.itemList"
    confirm-text="确认"
    type="supplierSku"
    isRequisition
  />
</template>

<script setup lang="ts" name="removeOrderAdd">
  import { erpApi, dataApi, productApi } from '@/api';
  import type { ReceiptConditionBean } from '@/api/financeSystem/data-contracts';
  import { useRoute, useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import ProductDialog from '@/views/supplyChainManage/efficiencyTools/removeOrder/components/productDialog.vue';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });
  const messageText = ref('');
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  const removalReasonList = [
    { name: '退货换标', id: 1 },
    { name: '返修加工', id: 2 },
    { name: '其他加工作业', id: 3 },
  ];
  const operationInstructionList = [
    { name: '退货换标', id: 1 },
    { name: '退回国内', id: 2 },
    { name: '其他', id: 3 },
  ];
  const expectedStorageTimeList = [
    { name: '到仓后需尽快发回', id: 1 },
    { name: '30-90天内', id: 2 },
    { name: '90-120天内', id: 3 },
    { name: '120-180天内', id: 4 },
    { name: '180天以上', id: 5 },
  ];
  const formRef = ref<FormInstance>();
  const form = ref({
    baseInfo: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      countryName: '',
      createTime: '',
      creator: '',
      // orderId: '',
      phone: '',
      postcode: '',
      receiveWarehouseCode: '',
      receiveWarehouseName: '',
      receiverName: '',
      region: '',
      remark: '',
      shipWarehouseId: '',
      shipWarehouseName: '',
      shipmentDate: '',
      shopAccount: '',
      expectedStorageTime: '',
      operationInstruction: '',
      removalReason: '',
      returnShop: '',
      shipWarehouseIdOld: '',
      shopName: '',
      status: '',
      statusDesc: '',
      isTransparentOrLabel: '否',
    },
    itemList: [],
  });
  const orderIdAdd = ref('');

  // 发货仓库
  const warehouseMap = ref();
  const queryAllWarehouse = async () => {
    const res = await erpApi.luteosErpWarehouseQueryPlatformListByType({
      platformCode: 'AMAZON',
      status: 1,
    });
    warehouseMap.value = res?.warehouseList || [];
  };
  // 收货仓库
  const receiveWarehouseCode = ref([]);
  const getReceiveWarehouseCode = async () => {
    const res = await erpApi.luteosErpWarehouseQueryWarehouseListByWarehouseType({
      warehouseTypes: [3],
    });
    receiveWarehouseCode.value = res?.warehouseList || [];
    receiveWarehouseCodeChange();
  };

  const receiveWarehouseCodeChange = () => {
    const id = form.value.baseInfo.receiveWarehouseId;
    if (id && receiveWarehouseCode.value.length) {
      const find = receiveWarehouseCode.value.find((res) => {
        return res.warehouseId === id;
      });
      if (find) {
        form.value.baseInfo.receiveWarehouseCode = find.warehouseCode;
      }
    } else {
      form.value.baseInfo.receiveWarehouseCode = '';
    }
  };

  // 粘贴收件人\n地址\n门牌号\n城市\n省州\n邮编信息\n按换行顺序自动识别
  const handleInput = (value) => {
    // 使用换行符分割字符串
    const lines = value.split('\n');
    if (lines.length) {
      const arr = ['receiverName', 'address1', 'address2', 'city', 'region', 'postcode'];
      for (let i = 0; i < lines.length; i++) {
        if (arr[i] == 'address2') {
          form.value.baseInfo.address1 = form.value.baseInfo.address1 + lines[i];
        } else {
          form.value.baseInfo[arr[i]] = lines[i] ? lines[i] : '';
        }
      }
    }
  };
  queryAllWarehouse();
  getReceiveWarehouseCode();
  const loading = ref(false);
  const edit = ref(false);
  const initData = async () => {
    if (route.query.orderId) {
      edit.value = true;
      orderIdAdd.value = route.query.orderId;
    }
    loading.value = true;
    const res: any = await erpApi.luteosErpRemovalDetail({
      orderId: route.query.orderId as string,
    });
    form.value = res;
    form.value.baseInfo.shipWarehouseIdOld = form.value.baseInfo.shipWarehouseId;
    warehouseCode.value = res.baseInfo.shipWarehouseName;
    loading.value = false;
    receiveWarehouseCodeChange();
  };

  if (route.query.orderId) {
    initData();
  }

  const productDialogVisible = ref(false);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    if (selected) {
      const oldList = form.value.itemList?.filter((item) =>
        list.find((i) => i.productId === item.productId)
      );
      const diffList = list
        .filter((item: any) => {
          return !oldList.find((old: any) => {
            return old.productId === item.productId;
          });
        })
        ?.map((item: any) => {
          return {
            asin: item.asin, // ASIN
            firstReceiptTime: '', // 首次收货时间
            fnsku: item.fnsku, // FNSKU
            id: item.warehouseId,
            productId: item.productId,
            // inTransitQuantity: 0, //在途数量
            cancelledQuantity: 0, // 已取消数量
            inProcessQuantity: 0, // 等待中数量
            msku: item.msku, // SKU
            // orderId: item.orderId,//移仓单ID
            platform: '', // 平台
            productName: item.productName,
            productSku: item.msku,
            // receivedQuantity: 0, //已入库数量
            sellableQuantityMax: item.availableQuantity > 0 ? item.availableQuantity : 0, // 可售数量
            sellableQuantity: null, // 可售数量
            unsellableQuantityMax: item.unsellableQuantity, // 不可售数量
            unsellableQuantity: null, // 不可售数量
            shippedQuantity: 0, // 出库数量
            destructionCostEstimate: null, // 销毁成本估计
            postRemovalProfitEstimate: null, // 移仓后毛利预估
          };
        });
      const newList = oldList.concat(diffList);

      // const res: any = await erpApi.luteosErpOrderReferenceParamsBySkuCode({
      //   countryCode: form.value.baseInfo.countryCode,
      //   skuCodeList: newList.map((item) => item.skuCode),
      //   type: 1,
      // });
      // form.value.itemList = newList.map((item) => {
      //   if (item.deliveryList.length === 0) {
      //     Reflect.set(item, 'deliveryList', res.paramMap[item.skuCode]);
      //   }
      //   return item;
      // });
      form.value.itemList = newList as [];

      productDialogVisible.value = false;
    } else {
      productDialogVisible.value = false;
    }
  };

  const errList = ref([]);
  // 移除产品信息
  const remove = (index: number) => {
    form.value.itemList.splice(index, 1);
  };
  const saveLoading = ref(false);
  const save = async (isSubmit) => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    if (form.value.itemList.length == 0) {
      ElMessage.error(`请添加产品`);
      return;
    }
    const orderId = await erpApi.luteosErpRemovalSaveOrUpdate(form.value);
    if (isSubmit == 0) {
      ElMessage.success('保存成功');
      closeTabAndRefresh('removeOrder');
      router.push({
        name: 'removeOrder',
        query: { refresh: 1 },
      });
    } else {
      orderIdAdd.value = orderId;
    }
  };
  const submitRepeat = ref(false);

  const saveApply = async () => {
    if (submitRepeat.value) {
      return;
    }
    submitRepeat.value = true;
    setTimeout(() => {
      submitRepeat.value = false;
    }, 2000);
    await save(1);
    if (orderIdAdd.value == '') {
      return;
    }
    await erpApi.luteosErpRemovalApply({ orderIdList: [orderIdAdd.value] });
    ElMessage.success('提交成功');
    closeTabAndRefresh('removeOrder');
    router.push({
      name: 'removeOrder',
      query: { refresh: 1 },
    });
  };

  // 计算库龄 现在的时间 - 首次收货时间 天数
  const getkuTime = (firstReceiptTime) => {
    if (firstReceiptTime) {
      const timestamp1 = new Date(firstReceiptTime).getTime();
      const timestamp2 = new Date().getTime();
      console.log(timestamp1, timestamp2);
      // 计算两个时间戳之间的天数
      const days = Math.ceil(Math.abs(timestamp2 - timestamp1) / (1000 * 3600 * 24));
      return days;
    }
    return '';
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
  const refreshData = async () => {
    await erpApi.luteosErpRemovalManualSync({ orderIdList: [form.value?.baseInfo?.orderId] });
    initData();
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
  const warehouseCode = ref(''); // 仓库关联 添加产品的下拉参数
  // 选择发货仓库，赋值仓库所在国家
  const changeShipWarehouseCode = async () => {
    if (edit.value && form.value.itemList.length) {
      const isConfirmed = await swal.confirm('修改发货仓库会清空产品信息，请确认是否继续？');
      if (!isConfirmed) {
        ElMessage.info('已取消修改');
        form.value.baseInfo.shipWarehouseId = form.value.baseInfo.shipWarehouseIdOld;
      } else {
        changeShipWarehouseCodeValue();
        form.value.itemList = [];
      }
    } else {
      changeShipWarehouseCodeValue();
    }
  };
  const changeShipWarehouseCodeValue = () => {
    const { shipWarehouseId } = form.value.baseInfo;
    if (shipWarehouseId) {
      const item = warehouseMap.value.find((res) => {
        return res.warehouseId == shipWarehouseId;
      });
      form.value.baseInfo.country = item.country;
      warehouseCode.value = item.warehouseDesc;
    } else {
      form.value.baseInfo.country = '';
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

  :deep(.packing-upload) {
    display: flex;
    align-items: start;

    .el-upload {
      margin-top: 5px;
    }

    .el-upload-list {
      margin-top: 0;
    }
  }

  .red {
    color: #f1416c;
    margin-left: 72px;
  }

  .mr10 {
    margin-right: 10px;
  }
  :deep(.el-form-item__content) {
    line-height: 32px;
  }
</style>
