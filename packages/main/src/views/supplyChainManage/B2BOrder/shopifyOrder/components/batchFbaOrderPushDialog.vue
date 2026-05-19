<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    @close="handleClose"
    align-center
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="120px"
      style="width: 100%"
      label-position="top"
      :rules="rules"
    >
      <div class="fba-content">
        <!-- <div class="fba-content-left">
          <el-form-item label="卖家订单编号" prop="erpCode">
            <el-input v-model="form.erpCode" maxlength="40" show-word-limit clearable />
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="收件人姓名" prop="name">
                <el-input v-model="form.name" clearable maxlength="60" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收件人电话" prop="phone">
                <el-input v-model="form.phone" clearable maxlength="60" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="收件人邮箱" prop="email">
            <el-input v-model="form.email" clearable maxlength="60" />
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="国家" prop="countryCode">
                <CountrySelect v-model="form.countryCode" clearable maxlength="60" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省/州" prop="province">
                <el-input v-model="form.province" clearable maxlength="60" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮编" prop="zipCode">
                <el-input v-model="form.zipCode" clearable maxlength="60" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="城市" prop="city">
                <el-input
                  v-model="form.city"
                  clearable
                  placeholder="请用收件国家/地区当地语种输入"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区/县" prop="area">
                <el-input
                  v-model="form.area"
                  placeholder="请用收件国家/地区当地语种输入"
                  clearable
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="详细地址1" prop="address1">
            <el-input v-model="form.address1" clearable maxlength="60" />
          </el-form-item>
          <el-form-item label="详细地址2" prop="address2">
            <el-input v-model="form.address2" clearable maxlength="60" />
          </el-form-item>
        </div> -->
        <div class="fba-content-right">
          <el-form-item label="店铺/站点" prop="shopAccount">
            <el-select
              v-model="form.warehouseCode"
              clearable
              filterable
              :filter-method="handleShopFilter"
              @change="handleShopAccountChange"
            >
              <el-option
                v-for="item in filteredShopOptions"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单产品" prop="items">
            <div class="item-list" :class="{ 'has-scroll': form.items.length > 2 }">
              <div v-for="item in form.items" class="item-box">
                <div class="item-box-left flex">
                  <el-image
                    class="item-box-left-image"
                    :src="item?.productImageUrl || ''"
                    v-if="item?.productImageUrl"
                  />
                  <img
                    v-else
                    class="item-box-left-image"
                    src="@/assets/images/system/empty.png"
                    alt=""
                  />
                </div>
                <div class="item-box-right">
                  <div class="item-box-content">
                    <div class="item-column">
                      <span>产品：</span>
                      <overflow-tooltip
                        :content="item?.productName || ''"
                        :line="1"
                        :font-size="12"
                      />
                    </div>
                    <div class="item-column">
                      <span>SKU：</span>
                      <overflow-tooltip :content="item?.skuCode || ''" :line="1" :font-size="12" />
                    </div>
                    <div class="item-column">
                      <span>未发数量：</span>
                      <overflow-tooltip :content="item?.count" :line="1" :font-size="12" />
                    </div>
                  </div>
                  <div class="item-box-content">
                    <div class="item-column" style="display: flex; align-items: center">
                      <span>MSKU：</span>
                      <overflow-tooltip :content="item?.msku || ''" :line="1" :font-size="12" />
                      <el-button
                        link
                        type="primary"
                        @click="handleMskuChange(item?.msku, item)"
                        style="margin-left: auto; margin-right: 8px"
                        v-if="form.warehouseCode"
                      >
                        选择
                      </el-button>
                    </div>
                    <div class="item-column">
                      <span>ASIN：</span>
                      <overflow-tooltip :content="item?.asin || ''" :line="1" :font-size="12" />
                    </div>
                    <div class="item-column">
                      <span>可用库存：</span>
                      <overflow-tooltip :content="item?.quantity || ''" :line="1" :font-size="12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="配送速度" prop="serviceLevel">
            <el-radio-group v-model="form.serviceLevel">
              <el-radio label="Standard">Standard</el-radio>
              <el-radio label="Expedited">Expedited</el-radio>
              <el-radio label="Priority">Priority</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="confirmLoading">确定</el-button>
    </template>
  </el-dialog>
  <ProductDialog
    :searchErpQuotation="true"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="selectArr"
    confirm-text="确认"
    :msku="msku"
    :warehousecode="form.warehouseCode"
    title="选择MSKU"
    type="supplierSku"
  />
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';
  import { cloneDeep, debounce } from 'lodash-es';
  import ProductDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/productDialog.vue';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  interface Props {
    title?: string;
    width?: string | number;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'FBA订单',
    width: '800px',
    closeOnClickModal: true,
    closeOnPressEscape: true,
  });

  interface ItemBean {
    productImageUrl?: string;
    productName?: string;
    skuCode?: string;
    supplySku?: string;
    msku?: string;
    asin?: string;
    quantity?: number;
    count?: number;
  }

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'confirm'): void;
    (event: 'success'): void;
  }>();
  const form = ref<{
    erpCode: string;
    name: string;
    phone: string;
    email: string;
    countryCode: string;
    province: string;
    zipCode: string;
    city: string;
    area: string;
    address1: string;
    address2: string;
    // address3: string;
    items: ItemBean[];
    erpCodeList: any[];
    serviceLevel: string;
    shopAccount: string;
    warehouseCode: string;
  }>({
    erpCode: '',
    erpCodeList: [],
    name: '',
    phone: '',
    email: '',
    countryCode: '',
    province: '',
    zipCode: '',
    city: '',
    area: '',
    address1: '',
    address2: '',
    // address3: '',
    items: [],
    serviceLevel: 'Standard',
    shopAccount: '',
    warehouseCode: '',
  });
  const visible = ref(false);
  const confirmLoading = ref(false);
  const shouldRefresh = ref(false);
  const formRef = ref<FormInstance>();
  const rules = reactive({
    erpCode: [{ required: true, message: '请输入卖家订单编号', trigger: 'blur' }],
    name: [{ required: true, message: '请输入收件人姓名', trigger: 'blur' }],
    // phone: [{ required: true, message: '请输入收件人电话', trigger: 'blur' }],
    // email: [{ required: true, message: '请输入收件人邮箱', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请输入国家', trigger: 'blur' }],
    // province: [{ required: true, message: '请输入省/州', trigger: 'blur' }],
    city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    shopAccount: [{ required: true, message: '请选择店铺/站点', trigger: 'blur' }],
    items: [{ required: true, message: '请选择订单产品', trigger: 'blur' }],
    serviceLevel: [{ required: true, message: '请选择配送速度', trigger: 'blur' }],
  });
  const shopOptions = ref<Array<{ label: string; value: string | number }>>([]);
  const filteredShopOptions = ref<Array<{ label: string; value: string | number }>>([]);

  const getShopAccountList = async () => {
    const res = await omsApi.omsFulfillmentOrderQueryShopList({
      pageNum: 1,
      pageSize: 10000,
      channel: 'amazon',
    });
    shopOptions.value =
      res?.shopWarehouseList
        ?.filter((item: any) => item.warehouseCode && item.shopAccount.trim())
        ?.map((item) => {
          return {
            label: item.shopAccount,
            value: item.warehouseCode,
          };
        }) || [];
    filteredShopOptions.value = shopOptions.value;
    return res;
  };

  const handleShopFilter = debounce((query: string) => {
    if (!query) {
      filteredShopOptions.value = shopOptions.value;
      return;
    }
    const keyword = query.toLowerCase().trim();
    filteredShopOptions.value = shopOptions.value.filter((item) => {
      return item.label.toLowerCase().includes(keyword);
    });
  }, 300);
  const open = (erpCodeList, skuList?, rowList?) => {
    console.log(erpCodeList, skuList, rowList);
    dataInit(erpCodeList, skuList);
    visible.value = true;
    shouldRefresh.value = false;
  };
  const dataInit = (data, skuList?) => {
    form.value.erpCode = data.erpCode || '';
    form.value.erpCodeList = data;
    form.value.name = data.buyerName || '';
    form.value.phone = data.buyerPhone || '';
    form.value.email = data.buyerEmail || '';
    form.value.countryCode = data.buyerCountryCode || '';
    form.value.province = data.buyerProvince || '';
    form.value.zipCode = data.buyerZipcode || '';
    form.value.city = data.buyerCity || '';
    form.value.area = data.area || '';
    form.value.address1 = data.buyerAddress || '';
    form.value.address2 = data.buyerAddress2 || '';
    // form.value.shopAccount = data.shopAccount || '';
    // form.value.items = data.itemBeanList || [];
    if (skuList?.length > 0) {
      const items = skuList.map((item) => {
        return {
          count: item.numInt || 0,
          erpCode: data.erpCode,
          orderItemId: data.id,
          productImageUrl: item.productImageUrl,
          supplySku: item.supplySku,
          productName: item.productName,
          // skuCode: item.skuCode,
          skuCode: item.supplySku,
          msku: '',
          asin: '',
          quantity: '',
        };
      });
      form.value.items = items || [];
    } else {
      form.value.items = [];
    }
  };
  const handleShopAccountChange = (value) => {
    if (!value) return;
    const option = shopOptions.value.find((item) => item.value === value);
    form.value.shopAccount = option?.label || '';
    getStockBySupplyCode(value);
  };
  const getStockBySupplyCode = async (value) => {
    // if(!value)return
    // console.log(`form.value.items`,form.value.items)
    const supplyCodes = form.value.items.map((item) => item.supplySku).filter(Boolean);

    if (!supplyCodes?.length) return;
    const res = await omsApi.omsCommonStockQueryAmazonSkuStock({
      supplySkuList: supplyCodes,
      luteWarehouseCode: value,
    });
    if (!res?.skuList?.length) return;
    res.skuList.forEach((item: any) => {
      form.value.items.forEach((item2: any) => {
        if (item.supplySku && item2.supplySku && item.supplySku === item2.supplySku) {
          item2.quantity = item.stockQuantity;
          item2.asin = item.asin;
          item2.msku = item.sellerSku;
        }
      });
    });
  };
  const resetForm = () => {
    form.value.erpCode = '';
    form.value.name = '';
    form.value.phone = '';
    form.value.email = '';
    form.value.countryCode = '';
    form.value.province = '';
    form.value.zipCode = '';
    form.value.city = '';
    form.value.area = '';
    form.value.address1 = '';
    form.value.address2 = '';
    // form.value.address3 = '';
    form.value.shopAccount = '';
    form.value.warehouseCode = '';
    form.value.items = [];
    form.value.serviceLevel = 'Standard';
  };
  const close = () => {
    visible.value = false;
    shouldRefresh.value = false;
    formRef.value?.resetFields();
    formRef.value?.clearValidate();
    resetForm();
  };

  const handleClose = () => {
    if (shouldRefresh.value) {
      emit('success');
    }
    close();
    emit('close');
  };

  const productDialogVisible = ref(false);
  const mskuItem: any = ref();
  const selectArr: any = ref([]);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    // console.log(list);
    if (selected) {
      productDialogVisible.value = false;
      // mskuItem.value.productImageUrl = list[0]?.productImageUrl;
      // mskuItem.value.productName = list[0]?.productName;
      mskuItem.value.asin = list[0]?.asin;
      mskuItem.value.msku = list[0]?.sellerSku;
      mskuItem.value.quantity = list[0]?.stockQuantity;
      selectArr.value = [mskuItem.value];
    } else {
      productDialogVisible.value = false;
    }
  };
  const msku = ref();

  const handleMskuChange = async (mskuVal?: any, item?) => {
    // 1111
    mskuItem.value = item;
    if (msku) {
      msku.value = mskuVal;
    }
    if (!form.value.warehouseCode) {
      ElMessage.warning('请先选择店铺/站点');
      return;
    }
    // console.log('msku', msku.value);
    // console.log(item, 'item');
    productDialogVisible.value = true;
  };

  const handleConfirm = async () => {
    if (confirmLoading.value) return;
    setTimeout(() => {
      confirmLoading.value = false;
    }, 10000);
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    const hasError = form.value.items.some((item) => {
      return !item.asin || !item.msku || !item.quantity;
    });
    if (hasError) {
      ElMessage.error('产品信息无ASIN/MSKU/可用库存，无法提交');
      return;
    }
    confirmLoading.value = true;
    const params = cloneDeep(form.value);
    params.items = params.items.map((item: any) => {
      return {
        quantity: item.count || 0,
        asin: item.asin || '',
        msku: item.msku || '',
        orderItemId: item.orderItemId || '',
        supplySku: item.supplySku || '',
        erpCode: form.value.erpCode || '',
      };
    });
    // console.log(params, 'param');
    // return;
    try {
      shouldRefresh.value = true;
      const res = await omsApi.omsFulfillmentOrderBatchTransferFbaV2({
        ...params,
      });
      // ElMessage.success('批量转FBA成功');
      console.log(res);
      const isConfirmed = await swal.confirm({
        title: `任务进行中，具体请前往任务中心查看`,
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
      });
      confirmLoading.value = false;
      if (!isConfirmed) {
        emit('close');
      } else {
        emit('close');
        openWindow('/taskDetail');
      }
      handleClose();
    } catch (error) {
      /* empty */
    } finally {
      confirmLoading.value = false;
    }
  };

  defineExpose({
    open,
    close,
  });
  onMounted(() => {
    getShopAccountList();
  });
</script>

<style lang="scss" scoped>
  .fba-content {
    min-height: 100px;
    display: flex;
    gap: 20px;

    .fba-content-left {
      width: 50%;
    }
    .fba-content-right {
      width: 100%;
    }
  }

  .item-list {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    max-height: 202px;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;

    &.has-scroll {
      overflow-y: auto;
    }
    .item-box {
      display: flex;
      gap: 12px;
      width: 100%;
      padding: 10px;
      height: 100px;
      box-sizing: border-box;
      flex-shrink: 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }
      &-left {
        width: 80px;
        flex-shrink: 0;

        &-image {
          width: 80px;
          height: 80px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          object-fit: cover;
        }
      }

      &-right {
        flex: 1;
        display: flex;
        flex-direction: row;
        gap: 2px;
        font-size: 12px;
        .item-box-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
          justify-content: space-between;
          .item-column {
            width: 100%;
            height: 20px;
            display: flex;
            align-items: center;
            gap: 2px;
            > span:first-child {
              color: #909399;
              font-weight: 500;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
</style>
