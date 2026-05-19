<template>
  <el-dialog
    v-model="visible"
    title="批量修改执行人"
    width="560px"
    destroy-on-close
    @closed="handleClosed"
  >
    <div class="dialog-body">
      <div class="dialog-section">
        <div class="section-title">已选择采购行（{{ products.length }}）</div>
        <el-scrollbar v-if="products.length" height="180px" class="product-scroll">
          <div v-for="item in products" :key="item.id || item.productInfo" class="product-row">
            <div class="product-title">{{ item.productType || '--' }}</div>
            <div class="product-desc">{{ item.productInfo || '--' }}</div>
            <div class="product-meta">当前执行人：{{ item.executor || '--' }}</div>
          </div>
        </el-scrollbar>
        <el-empty v-else description="请勾选需要调整的采购行后再进行批量修改" :image-size="80" />
      </div>
      <div class="dialog-section">
        <div class="section-title required">新执行人</div>
        <MemberSelect
          v-model="executorCode"
          placeholder="请选择执行人"
          source="custom"
          teleported
          :fetcher="loadPurchasers"
        />
      </div>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button
        type="primary"
        :disabled="!executorCode"
        :loading="confirmLoading"
        @click="handleConfirm"
      >
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { platformApi } from '@/api';
  import MemberSelect from './MemberSelect.vue';

  interface DialogProduct {
    id?: string | number;
    productType?: string;
    productInfo?: string;
    executor?: string;
  }

  const props = withDefaults(
    defineProps<{
      products: DialogProduct[];
      initialExecutors?: string[];
      confirmLoading?: boolean;
    }>(),
    {
      products: () => [],
      initialExecutors: () => [],
      confirmLoading: false,
    }
  );

  const emit = defineEmits<{
    (e: 'confirm', executors: string[]): void;
    (e: 'cancel'): void;
  }>();

  const visible = defineModel<boolean>('visible', { default: false });
  const executorCode = ref<string>('');
  const loadPurchasers = async () => {
    const res = await platformApi.platformDemandQueryPurchaserList();
    return res?.memberList ?? [];
  };

  watch(
    () => props.initialExecutors,
    (codes) => {
      executorCode.value = Array.isArray(codes) ? codes[0] ?? '' : '';
    },
    { immediate: true }
  );

  const handleConfirm = () => {
    if (!executorCode.value) {
      ElMessage.warning('请选择执行人');
      return;
    }
    emit('confirm', [executorCode.value]);
  };

  const handleCancel = () => {
    visible.value = false;
    emit('cancel');
  };

  const handleClosed = () => {
    executorCode.value = '';
    emit('cancel');
  };
</script>

<style scoped lang="scss">
  .dialog-body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .dialog-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-title.required::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .section-title.required::after {
    display: none;
  }
  .section-hint {
    font-size: 12px;
    color: #909399;
    font-weight: 400;
  }

  .product-scroll {
    border: 1px solid #ebeef5;
    border-radius: 6px;
    padding: 8px 0;
  }

  .product-row {
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .product-row + .product-row {
    border-top: 1px solid #f2f6fc;
  }

  .product-title {
    font-weight: 600;
    color: #606266;
  }

  .product-desc {
    font-size: 13px;
    color: #303133;
  }

  .product-meta {
    font-size: 12px;
    color: #909399;
  }
</style>
