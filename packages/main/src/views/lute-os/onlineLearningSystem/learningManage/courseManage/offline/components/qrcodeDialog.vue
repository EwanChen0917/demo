<template>
  <el-dialog :title="title" v-model="visibility" width="500px">
    <div class="qrcode-box">
      <qrcode-vue :value="value" :size="200" />
    </div>
    <p style="text-align: center; margin-top: 10px">
      <span class="text-primary cursor-pointer" @click="copyFn(value, '链接')">
        {{ title === '课程报名' ? '报名链接' : '签到链接' }}
      </span>
    </p>
  </el-dialog>
</template>

<script setup lang="ts">
  import QrcodeVue from 'qrcode.vue';
  import { copyFn } from '@/utils/copyFn';

  const title = ref('');
  const value = ref('');
  const visibility = ref(false);
  const open = (val: string, type: string) => {
    value.value = val;
    title.value = type === '1' ? '课程报名' : '课程签到';
    visibility.value = true;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .qrcode-box {
    text-align: center;
  }
</style>
