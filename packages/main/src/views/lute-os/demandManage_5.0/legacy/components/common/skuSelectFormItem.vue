<template>
  <el-select
    v-model="localSkuCode"
    value-key="skuCode"
    placeholder="产品中文名"
    filterable
    remote
    clearable
    reserve-keyword
    :loading="skuLoading"
    style="width: 100%"
    :disabled="disabled"
    @change="handleChange"
  >
    <el-option
      v-for="item in localOptions"
      :key="item.skuCode"
      :label="item.productTitle"
      :value="item.skuCode"
    >
      <template #default>
        <div class="d-flex align-items-center">
          <img
            v-if="item.productImageUrl"
            :src="item.productImageUrl"
            style="width: 30px; height: 30px; object-fit: cover; margin-right: 8px"
          />
          <span>{{ item.productTitle }}</span>
        </div>
      </template>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { productApi } from '@/api';
  const props = defineProps<{
    modelValue: string | null | undefined;
    skuOptions: any[];
    skuLoading: boolean;
    prop?: string;
    label?: string;
    disabled?: boolean;
  }>();
  const emits = defineEmits(['update:modelValue', 'change']);
  const localOptions = ref<any[]>([...props.skuOptions]);
  // v-model 双向绑定 skuCode
  const localSkuCode = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val),
  });

  // 选择变更时，emit当前sku对象
  const handleChange = (skuCode: string) => {
    const sku = props.skuOptions.find((item) => item.skuCode === skuCode);
    emits('change', sku ?? null);
  };

  watch(
    () => props.skuOptions,
    (val) => {
      localOptions.value = [...val];
    }
  );
</script>
