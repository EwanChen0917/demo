<template>
  <div class="settlement-page w-100 d-flex flex-column">
    <div class="settlement-main">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex flex-column px-8 pt-4">
          <span class="text-danger purchase-tip">
            {{ '温馨提示：' + purchaseTips['温馨提示'] }}
          </span>
          <span class="text-danger">请确认订单信息</span>
        </div>
        <el-button size="small" @click="back" class="mx-5">
          <template #icon>
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </template>
          返回购物车
        </el-button>
      </div>
      <!--      <div class="mt-3">
        &lt;!&ndash;        <h6>请选择取货方式</h6>&ndash;&gt;
        <div class="d-flex gap-5">
          <div
            class="pickup"
            v-if="pickType === 1"
            :class="{ active: pickType === 1 }"
            @click="pickType = 1"
          >
            公司自提
          </div>
          <div
            class="pickup"
            v-if="pickType === 2"
            :class="{ active: pickType === 2 }"
            @click="pickType = 2"
          >
            快递邮寄
          </div>
        </div>
      </div>-->
      <KeenCard marginBottom="0" paddingY="0" title="发货方式">
        <el-radio-group v-model="pickType" :disabled="disbaled" @change="getFreight">
          <el-radio :label="1">公司自提</el-radio>
          <el-radio :label="2">快递邮寄</el-radio>
        </el-radio-group>
      </KeenCard>

      <KeenCard title="收件信息" v-if="pickType === 2" :marginBottom="0">
        <template #operation>
          <el-link type="primary" @click="addrDrawer = true" :underline="false">地址管理</el-link>
        </template>
        <div v-if="!defaultAddr?.addressCode">
          暂无收件地址~
          <span class="text-primary cursor-pointer" @click="addrDrawer = true">去添加</span>
        </div>
        <div v-else>
          <el-form ref="formRef" :model="form" label-width="110" label-position="left">
            <el-form-item label="收件地址：">
              <span>
                {{ defaultAddr?.provinceName }} {{ defaultAddr?.cityName }}
                {{ defaultAddr?.areaName }}{{ defaultAddr?.address }}
              </span>
            </el-form-item>
            <el-form-item label="收件人信息：">
              <span>{{ defaultAddr?.receiverName }} {{ defaultAddr?.receiverPhone }}</span>
            </el-form-item>
            <el-form-item
              label="购买场景："
              prop="buyScene"
              :rules="[
                {
                  required: true,
                  message: '请选择购买场景',
                  trigger: 'blur',
                },
              ]"
            >
              <el-radio-group v-model="form.buyScene">
                <el-radio :label="1">自购</el-radio>
                <el-radio :label="2">代亲友下单</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!--          <el-row>
            <el-col :span="8">
              <el-form-item label="收件人名：">
                {{ defaultAddr?.receiverName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人电话：">
                {{ defaultAddr?.receiverPhone }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="收货地址：">
                {{ defaultAddr?.provinceName }} {{ defaultAddr?.cityName }}
                {{ defaultAddr?.areaName }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址：">
                {{ defaultAddr?.address }}
              </el-form-item>
            </el-col>
          </el-row>-->
        </div>
      </KeenCard>
      <div class="settlement-table">
        <el-table
          ref="tableRef"
          :data="listData"
          row-key="cartCode"
          class-name="table-row-dashed"
          height="100%"
        >
          <el-table-column label="内购产品信息" min-width="200">
            <template #default="{ row }">
              <GoodsInfo
                :src="row.imageUrl"
                :title="row.productName"
                :subtitle="row.productSku"
                :tag="row?.productType === 1 ? '在售品' : '清仓品'"
                :tag-color="row?.productType === 1 ? 'green' : 'purple'"
              />
            </template>
          </el-table-column>
          <!--        <el-table-column label="产品标签" min-width="150">
          <template #default="{ row }">
            <div class="d-flex gap-3 flex-wrap">
              <Tag v-for="item in row?.labelNameList" :key="item">
                {{ item }}
              </Tag>
            </div>
          </template>
        </el-table-column>-->
          <el-table-column label="价格" prop="price">
            <template #default="{ row }">¥{{ row?.price }}</template>
          </el-table-column>
          <el-table-column label="数量" prop="quantity" />
        </el-table>
      </div>
    </div>
    <div class="cart-total pt-2">
      <div>
        运费：
        <span class="number">¥{{ freightAmount }}</span>
      </div>
      <div>
        已选
        <span class="number">{{ totalNum }}</span>
        件产品合计：
        <span class="number">¥{{ totalPrice }}</span>
      </div>
      <div>
        合计：
        <span class="number">¥{{ Decimal.add(freightAmount, totalPrice).toNumber() }}</span>
      </div>
      <el-button type="primary" @click="submit" v-loading="loading">提交订单</el-button>
    </div>
  </div>
  <PayDialog
    v-if="payDialogVisible"
    ref="payDialogRef"
    @success="$router.push('/internalPurchase/orderCenter')"
    @close="handleClose"
  />
  <AddrDrawer
    v-if="addrDrawer"
    :visible="addrDrawer"
    @select="handleSelectAddr"
    @close="addrDrawer = false"
    @save="handleSave"
  />
  <GroupDialog v-if="groupDialogVisible" ref="groupDialogRef" @close="handleClose" />
</template>

<script setup lang="ts" name="shoppingCartSettlement">
  import { decryptByBase64 } from '@/utils/aesTils';
  import { erpApi, productApi } from '@/api';
  import PayDialog from '@/views/lute-os/internalPurchase/shoppingCart/payDialog.vue';
  import AddrDrawer from '@/views/lute-os/internalPurchase/shoppingCart/components/addrDrawer.vue';
  import { ElMessage } from 'element-plus';
  import { ArrowLeft } from '@element-plus/icons-vue';
  import GroupDialog from '@/views/lute-os/internalPurchase/shoppingCart/components/groupDialog.vue';
  import Decimal from 'decimal.js';
  import { purchaseTips } from '@/views/lute-os/internalPurchase/constant';
  const route = useRoute();
  const router = useRouter();
  const listData = ref([]);
  const addrDrawer = ref(false);

  listData.value = JSON.parse(decryptByBase64(route.query.list));
  // console.log()
  const pickType = ref(listData.value[0]?.productType === 1 ? 2 : 1);

  const disbaled = computed(() => {
    return listData.value[0]?.productType === 2;
  });
  const totalNum = computed(() => {
    return listData.value.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  });

  const totalPrice = computed(() => {
    return listData.value
      .reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0)
      ?.toFixed(2);
  });

  const payDialogRef = ref();
  const payDialogVisible = ref(false);
  const groupDialogVisible = ref(false);
  const groupDialogRef = ref();
  const loading = ref(false);
  const lock = ref(false);
  const timer = ref(null);
  const form = ref({
    buyScene: null,
  });
  const formRef = ref();

  const submit = async () => {
    if (pickType.value === 2 && formRef.value) {
      const isValid = await formRef.value?.validate().catch(() => {
        return false; // 校验失败返回 false，不继续执行
      });
      if (!isValid) return;
    }
    if (lock.value) {
      ElMessage.error('请勿频繁操作');
      return;
    }
    if (pickType.value === 2 && !defaultAddr.value?.addressCode) {
      ElMessage.warning('请选择收件地址');
      return;
    }
    try {
      lock.value = true;
      loading.value = true;
      const res = await productApi.luteosProductMallUserSubmitOrder({
        cartCodeList: listData.value.map((item) => item.cartCode),
        buyScene: pickType.value === 1 ? 1 : form.value?.buyScene,
        addressCode: pickType.value === 2 ? defaultAddr.value?.addressCode : null,
        freightAmount: freightAmount.value,
      });
      /* payDialogVisible.value = true;
  await nextTick(); */
      if (totalPrice.value === '0.00') {
        groupDialogVisible.value = true;
        await nextTick();
        groupDialogRef.value?.open();
      } else {
        payDialogVisible.value = true;
        await nextTick();
        payDialogRef.value?.open(
          res?.qrCode,
          res?.totalAmount,
          res?.orderCode,
          res?.qrCodeOutOfTime
        );
      }
    } finally {
      loading.value = false;
      timer.value = setTimeout(() => {
        lock.value = false;
        clearTimeout(timer.value);
      }, 1000);
    }
  };

  const defaultAddr = ref({});
  const queryDefaultAddr = async () => {
    const res = await productApi.luteosProductMallAddrQueryDefaultAddr();
    defaultAddr.value = res;
    getFreight();
  };
  queryDefaultAddr();

  const handleClose = () => {
    payDialogVisible.value = false;
    groupDialogVisible.value = false;
    router.push('/internalPurchase/orderCenter');
  };

  const handleSelectAddr = (val) => {
    defaultAddr.value = val;
    addrDrawer.value = false;
    getFreight();
  };

  const handleSave = (val) => {
    if (val?.addressCode === defaultAddr.value?.addressCode) {
      defaultAddr.value = val;
    }
  };

  const back = () => {
    router.push('/shoppingCart/index');
  };

  const freightAmount = ref(0);
  const getFreight = async () => {
    const resultMap = {};
    listData.value?.forEach((item) => {
      const key = `${pickType.value}-${item.productType}-${item.brandCode}`;
      if (!resultMap[key]) {
        resultMap[key] = {
          skuCount: item.quantity,
          amount: item.price * item.quantity,
        };
      } else {
        resultMap[key].amount += item.price * item.quantity;
        resultMap[key].skuCount += item.quantity;
      }
    });

    const params = [];
    for (const key in resultMap) {
      params.push({
        deliveryType: key?.split('-')[0],
        productType: key?.split('-')[1],
        brandCode: key?.split('-')[2],
        amount: resultMap[key].amount,
        skuCount: resultMap[key].skuCount,
        province: defaultAddr.value?.provinceCode,
        provinceIn: defaultAddr.value?.provinceCode === '44' ? 1 : 0,
      });
    }
    const res = await erpApi.luteosErpOrderFreightRuleHit(params);
    freightAmount.value = res?.baseInfo?.outInfo;
  };

  onMounted(() => {
    if (totalPrice.value === '0.00' && !disbaled.value) pickType.value = 2;
  });
</script>

<style scoped lang="scss">
  .settlement-page {
    height: 100%;
    min-height: 0;
  }

  .settlement-main {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .settlement-table {
    flex: 1;
    min-height: 0;
    position: relative;
    background-color: #fff;
    border-radius: 10px;
  }

  .settlement-table :deep(.el-table) {
    height: 100% !important;
  }

  .cart-total {
    width: 100%;
    position: sticky;
    bottom: 0;
    height: 72px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    column-gap: 24px;
    padding-right: 24px;
    color: #000000;
    text-align: right;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    .number {
      color: #000000;
      text-align: right;
      font-family: 'DIN';
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
  }

  .pickup {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 50px;
    border: 1px solid var(--bs-gray);
    border-radius: 5px;
    cursor: pointer;

    &:not(.active):hover {
      color: var(--bs-primary);
      border: 1px solid var(--bs-primary);
    }
  }

  .active {
    border: 1px solid var(--bs-primary);
    background-color: var(--bs-primary);
    color: #ffffff;
  }

  :deep(.el-form-item--default) {
    margin-bottom: 0;
  }

  .purchase-tip {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 4px;
  }
</style>
