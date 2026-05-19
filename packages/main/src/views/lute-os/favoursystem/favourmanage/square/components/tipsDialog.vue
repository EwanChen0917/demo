<template>
  <el-dialog
    title="创建合作之前，请先完善该红人的以下信息"
    :model-value="visible"
    @close="emit('close')"
    align-center
  >
    <p v-if="!data.country">国家</p>
    <p v-if="!data.email">邮箱地址</p>
    <p v-if="!data.contact">联系方式</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="Replenish">去补充</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { encryptByBase64 } from '@/utils/aesTils';

  const props = defineProps<{
    visible: boolean;
    data: string[];
  }>();

  const emit = defineEmits<{
    (event: 'close');
  }>();

  const router = useRouter();
  const Replenish = () => {
    const routeUrl = router.resolve({
      path: '/square/detail',
      query: { code: encryptByBase64(props.data.userCode), status: props.data.status, edit: true },
    });
    router.push(routeUrl.href);
    emit('close');
  };
</script>

<style scoped lang="scss"></style>
