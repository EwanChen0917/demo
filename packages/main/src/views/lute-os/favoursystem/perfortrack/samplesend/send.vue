<template>
  <KeenToolbarActions v-if="showTeleport">
    <el-button
      type="primary"
      size="small"
      style="height: unset !important"
      @click="router.push({ name: 'samplesend' })"
    >
      返回列表
    </el-button>
  </KeenToolbarActions>
  <el-form
    scroll-to-error
    :model="form"
    ref="formRef"
    :rules="rules"
    label-width="140px"
    v-loading="loading"
  >
    <KeenCard title="收件信息">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="红人账号" prop="receiveInfo.userCode">
            <el-select
              style="width: 100%"
              v-model="form.receiveInfo.userCode"
              filterable
              remote
              :remote-method="searchInfluencerList"
              :loading="influencerloading"
              :disabled="disabledAccount"
              @change="validateUser"
            >
              <el-option
                v-for="item in influencerList"
                :key="item.userCode"
                :label="item.channelAccount"
                :value="(item.userCode as string)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人" prop="receiveInfo.name">
            <el-input v-model="form.receiveInfo.name" :maxlength="128" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="Email" prop="receiveInfo.email">
            <el-input v-model="form.receiveInfo.email" :maxlength="60" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人国家或地区" prop="receiveInfo.countryCode">
            <el-select
              style="width: 100%"
              v-model="form.receiveInfo.countryCode"
              clearable
              filterable
              @change="handleCountryChange"
              autoComplete="off"
            >
              <el-option
                v-for="item in countryList"
                :key="item.countryCode"
                :label="item.countryName"
                :value="item.countryCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人省/州" prop="receiveInfo.province">
            <el-input v-model="form.receiveInfo.province" :maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="城市" prop="receiveInfo.city">
            <el-input v-model="form.receiveInfo.city" :maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="区/县" prop="receiveInfo.area">
            <el-input v-model="form.receiveInfo.area" :maxlength="200" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="地址" prop="receiveInfo.address">
            <el-input v-model="form.receiveInfo.address" :maxlength="300" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="门牌号" prop="receiveInfo.houseNumber">
            <el-input v-model="form.receiveInfo.houseNumber" :maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人号码" prop="receiveInfo.phone">
            <el-input v-model="form.receiveInfo.phone" :maxlength="64" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="邮编" prop="receiveInfo.zipcode">
            <el-input v-model="form.receiveInfo.zipcode" :maxlength="32" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="产品信息">
      <p>
        <el-button
          :disabled="!form.receiveInfo.countryCode"
          size="small"
          type="primary"
          @click="productDialogVisible = true"
        >
          {{ !form.receiveInfo.countryCode ? '请先选择国家或地区' : '选择商品' }}
        </el-button>
      </p>
      <el-table :data="form.itemInfoList" empty-text="请选择产品">
        <el-table-column prop="productTitle" min-width="240px" label="产品名称" />
        <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
        <el-table-column label="发货方式" width="180px">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].deliveryCode`"
              :rules="[{ required: true, message: '请选择发货方式', trigger: 'change' }]"
            >
              <el-select
                :placeholder="
                  !row.deliveryCode && !form.receiveInfo.countryCode
                    ? '请先选择收件人国家或地址'
                    : '请选择'
                "
                v-model="row.deliveryCode"
                filterable
                @change="handleDeliveryCodeChange($event, row, row.deliveryList)"
              >
                <el-option
                  v-for="item in row.deliveryList"
                  :key="item.deliveryCode"
                  :label="item.deliveryName"
                  :value="item.deliveryCode"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="warehouseCode" width="220px" label="仓库">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].warehouseCode`"
              :rules="[{ required: true, message: '请选择仓库', trigger: 'change' }]"
            >
              <el-select
                v-model="row.warehouseCode"
                filterable
                :placeholder="
                  !row.deliveryCode && !row.warehouseCode ? '请先选择发货方式' : '请选择'
                "
                @change="handleWarehouseCodeChange($event, row, row.warehouseList)"
              >
                <el-option
                  v-for="item in row.warehouseList"
                  :key="item.warehouseCode"
                  :label="item.warehouseName"
                  :value="item.warehouseCode"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="supplySku" label="供应链SKU" width="220px">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].supplySku`"
              :rules="[{ required: true, message: '请选择供应链SKU', trigger: 'change' }]"
            >
              <el-select
                v-model="row.supplySku"
                filterable
                :placeholder="
                  !row.supplySku && !row.warehouseCode ? '请先选择发货方式和发货方式' : '请选择'
                "
                @change="handleSupplySkuChange($event, row, row.supplySkuList)"
              >
                <el-option
                  v-for="item in row.supplySkuList"
                  :key="item.supplySku"
                  :label="item.supplySku"
                  :value="item.supplySku"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存" />
        <el-table-column prop="num" label="数量" width="100px">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].num`"
              :rules="[{ required: true, type: 'number', min: 1, message: '请输入数量' }]"
            >
              <Num v-model="row.num" :precision="0" :min="1" :max="99999" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="shippingCode" min-width="100px" width="220px" label="配送方式">
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`itemInfoList[${$index}].shippingCode`"
              :rules="[{ required: true, message: '请选择配送方式', trigger: 'change' }]"
            >
              <el-select
                v-model="row.shippingCode"
                filterable
                :placeholder="!row.warehouseCode && !row.shippingCode ? '请先选择仓库' : '请选择'"
              >
                <el-option
                  v-for="item in row.shippingList"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="60px">
          <template #default="{ $index }">
            <div>
              <el-button type="text" @click="remove($index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="订单信息">
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="卖家账号">
            <el-select
              disabled
              style="width: 100%"
              v-model="form.baseInfo.shopAccount"
              clearable
              filterable
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="Reference No">
            <el-input disabled v-model="form.baseInfo.sampleCode" :maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="运费">
            <el-input disabled v-model="form.baseInfo.freightAmount" :maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="货币类型">
            <el-select
              disabled
              style="width: 100%"
              v-model="form.baseInfo.currencyDesc"
              clearable
              filterable
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="交易额">
            <el-input disabled v-model="form.baseInfo.transactionAmount" :maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="付款时间">
            <el-input disabled value="默认为新增订单时间" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="是否为COD订单">
            <el-radio v-model="form.baseInfo.cod" :label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18" :offset="0">
          <el-form-item label="客服备注">
            <el-input
              type="textarea"
              :rows="5"
              v-model="form.baseInfo.customRemark"
              :maxlength="100"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div
    class="card-footer d-flex justify-content-end py-6 px-9"
    style="position: fixed; bottom: 20px; right: 20px; z-index: 9999"
  >
    <el-space>
      <el-button type="info" :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
  <ProductDialog
    :brandCode="route.query.brandCode"
    :countryCode="form.receiveInfo.countryCode"
    :userCode="form.receiveInfo.userCode"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="form.itemInfoList"
    confirm-text="确认"
    type="supplierSku"
  />
  <el-dialog title="提交钉钉审核" v-model="examineDialog" width="500px">
    <el-form label-width="100px">
      <el-form-item label="审核原因：" style="align-items: baseline">
        <div style="line-height: 20px">
          <p v-for="item of reasonList" :key="item">{{ item }}</p>
        </div>
      </el-form-item>
      <el-form-item label="审核备注：" required>
        <el-input
          :rows="3"
          type="textarea"
          v-model="form.baseInfo.dingRemark"
          placeholder=""
          clearable
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button
          :disabled="confirmLoading"
          @click="
            form.baseInfo.dingRemark = '';
            examineDialog = false;
          "
        >
          取消
        </el-button>
        <el-button :loading="confirmLoading" type="primary" @click="confirmSave">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <FirstCooperateDialog
    v-if="firstCooperateVisible"
    :visible="firstCooperateVisible"
    @close="firstCooperateVisible = false"
    @save="handleSave"
  />

  <ChannelSelectDialog
    v-if="channelSelectVisible"
    :visible="channelSelectVisible"
    @close="handleChannelClose"
    :selected-channels="channelList"
  />

  <!-- :selected-row="form.itemInfoList[0]" -->
</template>

<script setup lang="ts" name="influencerSend">
  import { useRouter, useRoute } from 'vue-router';
  import { metaApi, productApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import Num from '@/components/NumberInput/index.vue';
  import { MetaUserBean } from '@/api/meta/data-contracts';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import FirstCooperateDialog from '@/views/lute-os/favoursystem/favourmanage/square/components/firstCooperateDialog.vue';
  import ProductDialog from './components/productDialog.vue';

  const route = useRoute();
  const router = useRouter();
  const formRef = ref();
  const form = ref<any>({
    baseInfo: {
      brandCode: '',
      cod: 0,
      currencyCode: '',
      currencyDesc: '',
      customRemark: '',
      freightAmount: 0,
      sampleCode: '',
      shopAccount: '',
      transactionAmount: 0,
      dingRemark: '',
    },
    itemInfoList: [
      // {
      //   deliveryCode: '',
      //   num: 0,
      //   shippingCode: '',
      //   skuCode: '',
      //   supplySku: '',
      //   warehouseCode: '',
      // },
    ],
    receiveInfo: {
      address: '',
      area: '',
      city: '',
      countryCode: '',
      email: '',
      houseNumber: '',
      name: '',
      phone: '',
      province: '',
      userCode: '',
      zipcode: '',
    },
  });
  const rules = ref({
    'receiveInfo.userCode': [{ required: true, message: '请选择红人账号' }],
    'receiveInfo.name': [{ required: true, message: '请输入收件人名称' }],
    'receiveInfo.countryCode': [{ required: true, message: '请选择国家或地区' }],
    'receiveInfo.email': [{ required: false, type: 'email', message: '请输入正确的Email地址' }],
    'receiveInfo.province': [{ required: true, message: '请输入收件人省/州' }],
    'receiveInfo.city': [{ required: true, message: '请输入城市' }],
    'receiveInfo.address': [{ required: true, message: '请输入地址' }],
    'receiveInfo.phone': [{ required: true, message: '请输入收件人号码' }],
    'receiveInfo.zipcode': [{ required: true, message: '请输入邮编' }],
  });
  watchEffect(() => {
    const { projectCode } = route.query;
    if (projectCode) {
      form.value.baseInfo.projectCode = projectCode;
    }
  });
  const validateUser = async (userCode: string) => {
    const res: any = await metaApi.luteosMetaQueryUserInfo({ userCode });
    if (
      res &&
      res.labelList.length &&
      res.labelList.some((item) => {
        return item.name === '黑名单' || item.childInfoList.some((i) => i.name === '黑名单');
      })
    ) {
      await swal.error('该红人带黑名单标签，不允许对该红人进行发样');
      form.value.receiveInfo.userCode = '';
    }
  };
  const initData = async () => {
    const res: any = await metaApi.luteosMetaV3SampleorderQueryDetail({
      orderCode: route.query.code as string,
    });
    // 订单信息
    form.value.baseInfo.projectCode = res.baseInfo.projectCode;
    form.value.baseInfo.cod = res.baseInfo.cod;
    form.value.baseInfo.currencyCode = res.baseInfo.currencyCode;
    form.value.baseInfo.currencyDesc = res.baseInfo.currencyDesc;
    form.value.baseInfo.customRemark = res.baseInfo.customRemark;
    form.value.baseInfo.freightAmount = res.baseInfo.freightAmount;
    // form.value.baseInfo.sampleCode = res.baseInfo.sampleCode;
    form.value.baseInfo.shopAccount = res.baseInfo.shopAccount;
    form.value.baseInfo.transactionAmount = res.baseInfo.transactionAmount;
    form.value.baseInfo.dingRemark = res.baseInfo.dingRemark;
    // 收件信息
    form.value.receiveInfo.address = res.receiveInfo.address;
    form.value.receiveInfo.area = res.receiveInfo.area;
    form.value.receiveInfo.city = res.receiveInfo.city;
    form.value.receiveInfo.countryCode = res.receiveInfo.countryCode;
    form.value.receiveInfo.email = res.receiveInfo.email;
    form.value.receiveInfo.houseNumber = res.receiveInfo.houseNumber;
    form.value.receiveInfo.name = res.receiveInfo.name;
    form.value.receiveInfo.phone = res.receiveInfo.phone;
    form.value.receiveInfo.province = res.receiveInfo.province;
    form.value.receiveInfo.userCode = res.receiveInfo.userCode;
    form.value.receiveInfo.zipcode = res.receiveInfo.zipcode;
    // 初始化红人账号下拉选择项
    influencerList.value = [
      {
        channelAccount: res.receiveInfo.userChannel as string,
        userCode: res.receiveInfo.userCode as string,
      },
    ];
    form.value.itemInfoList = res.itemInfoList.map((item: any) => {
      const obj: any = {
        productTitle: item.productName,
        deliveryCode: item.deliveryCode,
        num: item.num,
        shippingCode: item.shippingCode,
        skuCode: item.skuCode,
        supplySku: item.supplySku,
        warehouseCode: item.warehouseCode,
        supplySkuList: item.supplySkuItemList || [],
        deliveryList: item.deliveryList || [],
        warehouseList: item.warehouseList || [],
        shippingList: item.shippingList || [],
        inventory: item.inventory,
      };
      return obj;
    });
  };

  const channelList = ref([]);
  const queryProjectPlatform = async () => {
    const res: any = await metaApi.luteosMetaQueryProjectPlatform({
      projectCode: route.query.projectCode,
    });
    channelList.value = res.platformList || [];
  };
  if (route.query.projectCode) {
    queryProjectPlatform();
  }

  const influencerloading = ref(false);
  const influencerList = ref<MetaUserBean[]>([]);

  const searchInfluencerList = async (query: string) => {
    if (query) {
      influencerloading.value = true;
      const res: any = await metaApi
        .luteosMetaQueryUserListSelect({
          keyword: query,
          pageNum: 1,
          pageSize: 200,
        })
        .finally(() => {
          influencerloading.value = false;
        });
      if (res) {
        influencerList.value = res.userList as [];
      }
    } else {
      influencerList.value = [];
    }
  };
  const disabledAccount = ref(false);
  if (route.query.userCode && route.query.account) {
    form.value.receiveInfo.userCode = route.query.userCode as string;
    influencerList.value = [
      { channelAccount: route.query.account as string, userCode: route.query.userCode as string },
    ];
    // url上有带则直接禁用
    disabledAccount.value = true;
    route.query.userName && searchInfluencerList(route.query.userName);
  }
  const countryList = ref([]);
  const loading = ref(true);
  const initCountrySelection = async () => {
    try {
      const res = await metaApi.luteosMetaV3SampleorderReferenceParams();
      form.value.baseInfo.currencyCode = res.currencyCode;
      form.value.baseInfo.currencyDesc = res.currencyDesc;
      form.value.baseInfo.shopAccount = res.shopAccount as string;
      form.value.baseInfo.sampleCode = res.referenceNo as string;
      form.value.baseInfo.freightAmount = res.freightAmount as number;
      form.value.baseInfo.transactionAmount = res.transactionAmount as number;
      countryList.value = res.navigationParamList as [];
      if (route.query.code) {
        await initData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  // const deliveryList = computed(() => {
  //   const result: any = countryList.value.find(
  //     (item: any) => item.countryCode === form.value.receiveInfo.countryCode
  //   );
  //   return result ? result.deliveryList : [];
  // });
  initCountrySelection();
  const productDialogVisible = ref(false);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[], deliveryCode: number) => {
    if (selected) {
      const oldList = form.value.itemInfoList;
      const newList = list.map((item: any) => {
        const same: any = oldList.find((old: any) => {
          return old.skuCode === item.skuCode;
        });
        const obj = {
          productTitle: item.productTitle,
          productSku: item.productSku,
          inventory: same ? same.inventory : '-',
          skuCode: item.skuCode,
          warehouseList: same ? same.warehouseList : [],
          supplySkuList: same ? same.supplySkuList : [],
          shippingList: same ? same.shippingList : [],
          deliveryList: same ? same.deliveryList : [],
          // deliveryCode: same ? same.deliveryCode : '',
          deliveryCode: deliveryCode?.toString() || '',
          num: same ? same.num : 1,
          shippingCode: same ? same.shippingCode : '',
          supplySku: same ? same.supplySku : '',
          warehouseCode: same ? same.warehouseCode : '',
        };
        return obj;
      });
      const res: any = await metaApi.luteosMetaV3SampleorderReferenceParamsBySkuCode({
        countryCode: form.value.receiveInfo.countryCode,
        skuCodeList: newList.map((item) => item.skuCode),
      });
      form.value.itemInfoList = newList.map((item) => {
        if (item.deliveryList.length === 0) {
          Reflect.set(item, 'deliveryList', res.paramMap[item.skuCode]);
          if (deliveryCode) handleDeliveryCodeChange(item.deliveryCode, item, item.deliveryList);
        }
        return item;
      });
      form.value.itemInfoList = newList as [];
      productDialogVisible.value = false;
    } else {
      productDialogVisible.value = false;
    }
  };
  // 国家发生改变
  const handleCountryChange = () => {
    // form.value.itemInfoList.forEach((item: any) => {
    //   item.deliveryCode = '';
    //   item.warehouseCode = '';
    //   item.shippingCode = '';
    //   item.supplySku = '';
    //   item.num = 1;
    //   item.deliveryList = [];
    //   item.supplySkuList = [];
    //   item.warehouseList = [];
    //   item.shippingList = [];
    // });
    form.value.itemInfoList = [];
  };
  // 发货方式改变
  const handleDeliveryCodeChange = (val: string, currentRow: any, currentDeliveryList) => {
    const result = currentDeliveryList.find((item) => item.deliveryCode === val);
    currentRow.warehouseList = result ? cloneDeep(result.warehouseList) : [];
    // 清空
    currentRow.warehouseCode = '';
    currentRow.shippingCode = '';
    currentRow.supplySku = '';
    currentRow.num = 1;
    currentRow.inventory = 0;
  };
  // 仓库发生改变
  const handleWarehouseCodeChange = async (val: string, currentRow: any, currentWarehouseList) => {
    const result = currentWarehouseList.find((item) => item.warehouseCode === val);
    currentRow.shippingList = result ? cloneDeep(result.shippingList) : [];
    currentRow.shippingCode = '';
    currentRow.supplySku = '';
    currentRow.num = 1;
    currentRow.inventory = 0;
    const res: any = await productApi.luteosProductSkuQuerySupplySkuList({
      deliverType: currentRow.deliveryCode,
      skuCode: currentRow.skuCode,
      warehouseCode: val,
    });
    if (res) {
      currentRow.supplySkuList = res.supplySkuItemList?.filter((item) => item?.inventory > 0);
      currentRow.supplySku = currentRow.supplySkuList[0]
        ? currentRow.supplySkuList[0].supplySku
        : '';
      currentRow.inventory = currentRow.supplySkuList[0]
        ? currentRow.supplySkuList[0].inventory
        : 0;
    }
  };
  // 供应链SKU改变
  const handleSupplySkuChange = async (val: string, currentRow: any, currentSupplySkuList) => {
    const result = currentSupplySkuList.find((item) => item.supplySku === val);
    currentRow.num = 1;
    currentRow.inventory = result ? result.inventory : '-';
  };
  // 移除产品信息
  const remove = (index: number) => {
    form.value.itemInfoList.splice(index, 1);
  };

  const channelSelectVisible = ref(false);
  const handleChannelClose = async (reload, list) => {
    if (reload) {
      form.value.channelList = list.map((item) => item.channelCode);
      handleSave();
    }
    channelSelectVisible.value = false;
  };

  const firstCooperateVisible = ref(false);
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (!form.value.itemInfoList.length) {
        ElMessage.warning('请选择商品');
      } else {
        const dingdingResult: any = await dingdingExamine();
        if (dingdingResult.needDingAuth) {
          reasonList.value = dingdingResult?.reasonList;
          examineDialog.value = true;
        } else {
          channelSelectVisible.value = true;
          // firstCooperateVisible.value = true;
        }
      }
    }
  };

  const confirmSave = async () => {
    // firstCooperateVisible.value = true;
    channelSelectVisible.value = true;
  };
  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      if (route.query.projectCode) {
        router.push({
          name: 'cooperatedetail',
          query: {
            projectCode: route.query.projectCode,
          },
        });
        return;
      }
      router.push({
        name: 'samplesend',
      });
    }
  };

  const handleSave = async () => {
    try {
      saveLoading.value = true;
      if (route?.query?.brandCode) form.value.baseInfo.brandCode = route.query.brandCode;
      // form.value.baseInfo.cooperationFirstFlag = cooperationFirstFlag;
      const res: any = await metaApi.luteosMetaV3SampleorderSave(form.value).finally(() => {
        saveLoading.value = false;
      });
      ElMessage.success('操作成功');
      const confirm = await swal.confirm({
        title: '是否跳转至对应合作事项页面？',
        html: `点击“是”，则跳转至对应合作事项页面<br/>点击“否”，则跳转至发样订单页表页面`,
      });
      if (confirm) {
        router.push({
          name: 'cooperatedetail',
          query: {
            projectCode: res.projectCode,
          },
        });
      } else {
        router.push({
          name: 'samplesend',
        });
      }
    } finally {
      //   firstCooperateVisible.value = false;
      channelSelectVisible.value = false;
    }
  };
  const examineDialog = ref(false);
  const confirmLoading = ref(false);
  const reasonList = ref([]);
  const dingdingExamine = async () => {
    const res = await metaApi.luteosMetaV3SampleorderSaveCheckDing(form.value);
    return res;
  };
  const showTeleport = ref(true);
  onActivated(() => {
    showTeleport.value = true;
    formRef.value.resetFields();
    // document.documentElement.style.overflow = 'auto';
  });
  onDeactivated(() => {
    // document.documentElement.style.overflow = 'hidden';
    showTeleport.value = false;
  });
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
