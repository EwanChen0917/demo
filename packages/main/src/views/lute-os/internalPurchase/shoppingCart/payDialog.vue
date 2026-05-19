<template>
  <el-dialog v-model="visible" @close="close" align-center>
    <div class="d-flex flex-column align-items-center gap-6">
      <div class="pay-title fw-bold">
        <div class="d-flex flex-column align-items-center">
          请使用支付宝扫码支付
          <PurchaseTips class="mt-2" />
        </div>
        <span v-if="countdown">剩余:{{ countdown }}</span>
      </div>
      <div class="pay-price text-gray-500">需要支付金额 ¥{{ price }}</div>
      <qrcode-vue :value="qrCode" :size="175" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import QrcodeVue from 'qrcode.vue';
  import { productApi } from '@/api';
  import dayjs from 'dayjs';
  import PurchaseTips from '@/views/lute-os/internalPurchase/components/purchaseTips.vue';
  const emits = defineEmits<{
    (event: 'success'): void;
    (event: 'close'): void;
  }>();

  const visible = ref(false);

  const qrCode = ref('');
  const price = ref('');
  const timer = ref(null);
  const countdown = ref('');
  const outOfTimer = ref(null);
  const open = (code, totalPrice, orderCode, qrCodeOutOfTime) => {
    if (timer.value) clearInterval(timer.value);
    if (outOfTimer.value) clearInterval(outOfTimer.value);
    countdown.value = getCountDown(dayjs(qrCodeOutOfTime).diff(dayjs(), 'seconds'));
    // countdown.value = '';
    qrCode.value = code;
    price.value = totalPrice;
    timer.value = setInterval(() => {
      const duration = dayjs(qrCodeOutOfTime).diff(dayjs(), 'seconds');
      if (duration > 0) {
        queryOrderStatus(orderCode);
      } else {
        // 倒计时结束
        clearInterval(timer.value);
        emits('success');
        visible.value = false;
      }
    }, 3000);

    const diff = dayjs(qrCodeOutOfTime).diff(dayjs(), 'seconds');
    if (diff > 0) {
      outOfTimer.value = setInterval(() => {
        const duration = dayjs(qrCodeOutOfTime).diff(dayjs(), 'seconds');
        if (duration > 0) {
          countdown.value = getCountDown(duration);
          /* const minutes = Math.floor(((duration % 86400) % 3600) / 60);
          const remainingSeconds = duration % 60;
          countdown.value = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`; */
        } else {
          // 倒计时结束
          clearInterval(outOfTimer.value);
        }
      }, 1000);
    }
    visible.value = true;
  };

  const getCountDown = (duration) => {
    const minutes = Math.floor(((duration % 86400) % 3600) / 60);
    const remainingSeconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 查询订单支付状态
  const queryOrderStatus = async (orderCode) => {
    if (!orderCode) return;
    try {
      const res = await productApi.luteosProductMallQueryOrderStatus({
        orderCode,
      });
      if (res?.payStatus === 'success') {
        clearInterval(timer.value);
        emits('success');
        visible.value = false;
      }
    } catch (e) {
      clearInterval(timer.value);
      visible.value = false;
    }
  };

  const close = () => {
    console.log('close');
    clearInterval(timer.value);
    visible.value = false;
    emits('close');
  };

  onDeactivated(() => {
    clearInterval(timer.value);
  });

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .pay-title {
    color: #648ce2;
  }
</style>
