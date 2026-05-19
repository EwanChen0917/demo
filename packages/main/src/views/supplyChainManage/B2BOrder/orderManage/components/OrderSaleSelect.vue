/** * 订单渠道 */
<template>
  <!--  {{orderSaleSelectRef?.selectedLabel}}-->
  <el-select
    ref="orderSaleSelectRef"
    v-model="orderChannelCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    :max-collapse-tags="maxCollapseTags"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option v-for="item in dickbook" :key="item.value" :label="item.desc" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      scene?: any;
      maxCollapseTags?: number;
    }>(),
    {
      placeholder: '订单渠道',
      clearable: false,
      multiple: false,
      maxCollapseTags: 1,
    }
  );

  const orderSaleSelectRef = ref();
  const orderChannelCode = ref<string>('');
  const dickbook = ref<any[]>([]);

  const initDickbook = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['b2b_client_order_sale_type'],
    });

    dickbook.value = res.dictMap.b2b_client_order_sale_type;
  };

  initDickbook();

  defineExpose({
    getSelectedLabel: () => orderSaleSelectRef.value?.selectedLabel,
  });
</script>

<style scoped lang="scss"></style>
