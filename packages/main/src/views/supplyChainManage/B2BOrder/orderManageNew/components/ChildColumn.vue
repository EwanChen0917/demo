<template>
  <div class="child-column">
    <template v-for="item in list" :key="item?.key">
      <ItemLabel
        :label="item?.label"
        :value="item?.content ? renderTemplate(item?.content, row) : row?.[item?.key]"
        :tips="item?.tips"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import { getCurCustomFields } from '@/utils/customFields';

  const props = defineProps<{
    customFieldList: any;
    title: string;
    row: any;
  }>();

  const list = computed(() => {
    return getCurCustomFields(props.customFieldList, props.title);
  });

  const renderTemplate = (template, data) => {
    return template.replace(/{([^{}]+)}/g, (_, path) => {
      return data?.[path] || '-';
    });
  };
</script>

<style scoped lang="scss">
  .child-column {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
