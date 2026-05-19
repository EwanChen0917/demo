<template>
  <div class="w-100 d-flex flex-column justify-content-between" style="height: calc(100vh - 170px)">
    <div>
      <KeenCard title="订单信息">
        <template #statusTag>
          <Tag v-if="form?.status" :color="statusColorMap[form?.status]">
            {{ form?.statusDesc }}
          </Tag>
        </template>
        <template #operation>
          <div v-if="isSelf && form?.status === 'PENDING' && countdown" class="countdown fw-bold">
            剩余：{{ countdown }}
          </div>
        </template>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号:">{{ form?.orderCode || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人:">{{ form?.creatorName || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="取货方式:">{{ form?.receiveGoodsTypeStr || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单总价:">¥{{ form?.totalAmount || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实付款:">¥{{ form?.subtotalAmount || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间:">{{ form?.createTime || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款时间:">{{ form?.paymentTime || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货时间:">{{ form?.deliveryTime || '-' }}</el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item v-if="form?.status === 'CLOSED'" label="关闭原因:">
              {{ form?.closeReason || '-' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form?.receiveGoodsType === 2">
          <el-col :span="8">
            <el-form-item label="收件人名字:">{{ form?.receiverName || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人电话:">{{ form?.receiverPhone || '-' }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="快递单号:">{{ form?.trackingNum || '-' }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收件人地址:">
              {{ form?.receiverProvinceName }}{{ form?.receiverCityName }}{{ form?.receiverAreaName
              }}{{ form?.receiverAddress }}
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <KeenCard title="产品信息">
        <el-table :data="form?.orderItemList">
          <el-table-column label="产品信息" min-width="200">
            <template #default="{ row }">
              <GoodsInfo
                :src="row.imageUrl"
                :title="row.productName"
                :subtitle="row.productSku"
                copy-title
                copy-subtitle
              />
            </template>
          </el-table-column>
          <!--      <el-table-column label="供应链SKU" prop="productSku" />-->
          <el-table-column label="数量" prop="quantity" />
          <el-table-column label="单价" prop="price">
            <template #default="{ row }">¥{{ row.price }}</template>
          </el-table-column>
        </el-table>
      </KeenCard>
    </div>
    <div class="cart-total">
      <el-space>
        <el-button v-if="form.status === 'PAID' && !isSelf" type="primary" @click="ship">
          手动发货
        </el-button>
        <el-button
          v-if="form.status === 'PENDING' && !isSelf"
          type="danger"
          @click="closeOrderDialogRef?.open(form.orderCode)"
        >
          关闭订单
        </el-button>
        <el-button v-if="showClaimButton" type="primary" @click="claim">确认收货</el-button>
      </el-space>
      <div v-if="isSelf && form.status === 'PENDING'">
        已选
        <span class="number">{{ totalNum }}</span>
        件产品合计：
        <span class="number">¥{{ totalPrice }}</span>
      </div>
      <el-button
        v-if="isSelf && form.status === 'PENDING'"
        type="primary"
        @click="
          payDialogRef?.open(form?.qrCode, totalPrice, form?.orderCode, form?.qrCodeOutOfTime)
        "
      >
        付款
      </el-button>
    </div>
  </div>
  <CloseOrderDialog ref="closeOrderDialogRef" @success="queryDetail()" />
  <PayDialog ref="payDialogRef" @success="queryDetail" />
</template>

<script setup lang="ts" name="internalOrderManageDetail">
  import { productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import CloseOrderDialog from '@/views/lute-os/internalPurchase/components/closeOrderDialog.vue';
  import dayjs from 'dayjs';
  import PayDialog from '@/views/lute-os/internalPurchase/shoppingCart/payDialog.vue';

  const props = defineProps<{
    mode?: string;
  }>();

  const isSelf = computed(() => {
    return props.mode === 'self';
  });

  const form = ref({});

  const route = useRoute();

  const statusColorMap = {
    PENDING: 'blue',
    PAID: 'purple',
    SHIPPED: 'green',
    CLOSED: 'red',
  };

  const closeOrderDialogRef = ref();

  const countdown = ref('');
  const timer = ref(null);
  const queryDetail = async () => {
    if (!route.query?.code) return;
    const res = await productApi.luteosProductMallQueryOrderDetail({
      orderCode: route.query?.code as string,
      operateType: isSelf.value ? 1 : 0,
    });
    form.value = res || {};
    const diff = dayjs(form.value?.qrCodeOutOfTime).diff(dayjs(), 'seconds');

    if (diff > 0) {
      timer.value = setInterval(() => {
        const duration = dayjs(form.value?.qrCodeOutOfTime).diff(dayjs(), 'seconds');
        if (duration > 0) {
          const minutes = Math.floor(((duration % 86400) % 3600) / 60);
          const remainingSeconds = duration % 60;
          countdown.value = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
        } else {
          // 倒计时结束
          clearInterval(timer.value);
          queryDetail();
        }
      }, 1000);
    }
  };

  if (route.query?.code) queryDetail();

  const totalNum = computed(() => {
    return form.value?.orderItemList?.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  });

  const totalPrice = computed(() => {
    return form.value?.orderItemList
      ?.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0)
      ?.toFixed(2);
  });

  const ship = async () => {
    const isConfirmed = await swal.confirm('发货后订单不可撤销，是否确认发货？');
    if (isConfirmed) {
      await productApi.luteosProductMallOperateOrder({
        orderCode: form.value?.orderCode,
        operateType: 'manual_delivery',
      });
      ElMessage.success('发货成功');
      queryDetail();
    }
  };

  const isSelfPickupOrder = (row) => {
    return row?.receiveGoodsType === 1;
  };

  const isPendingClaimOrder = (row) => {
    return row?.status === 'SHIPPED' && row?.isConfirmed !== 1;
  };

  const showClaimButton = computed(
    () => isSelf.value && isSelfPickupOrder(form.value) && isPendingClaimOrder(form.value)
  );

  const claim = async () => {
    const isConfirmed = await swal.confirm('是否确认收货？');
    if (!isConfirmed) return;
    await productApi.luteosProductMallConfirmReceive({
      orderCode: form.value?.orderCode,
    });
    ElMessage.success('确认收货成功');
    queryDetail();
  };

  const payDialogRef = ref();
</script>

<style scoped lang="scss">
  .countdown {
    color: #ff4d4f;
    text-align: right;
    font-family: 'DIN';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }

  .cart-total {
    width: 100%;
    bottom: 80px;
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

  :deep(.el-form-item__content) {
    line-height: 22px;
  }
</style>
