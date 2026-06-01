<template>
  <!-- 已完成审核的编辑只能编辑地址信息，在详情页面编辑 -->
  <Detail v-if="edit"/>
  <Add v-else/>
</template>

<script setup lang="ts" name="removeOrderEdit">
import Add from '@/views/supplyChainManage/efficiencyTools/removeOrder/add.vue';
import Detail from '@/views/supplyChainManage/efficiencyTools/removeOrder/detail.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const edit = ref(false);
if (route.query.edit == '1') {
  edit.value = true;
}else{
  edit.value = false;
}
</script>

<style scoped lang="scss"></style>