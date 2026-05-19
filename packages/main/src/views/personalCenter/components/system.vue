<template>
  <div class="system">
    <!-- {{ system?.length }} -->
    <SystemItem
      v-for="item in system"
      :key="item.materialCode"
      :item="item"
      @click="itemClick(item.jumpUrl)"
    />
    <!-- <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem>
    <SystemItem  v-for="item in system" :item="item" :key="item.materialCode"></SystemItem> -->
  </div>
</template>

<script setup lang="ts">
  import SystemItem from './systemItem.vue';
  // const props = defineProps({system:Array});
  defineProps<{ system: any[] }>();
  const emit = defineEmits(['jump']);

  // console.log(props);
  function itemClick(url: string) {
    emit('jump', url);
  }
</script>

<style lang="scss" scoped>
  .system {
    padding: 25px 25px 25px 25px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    // background-color: #fafafa;
    background-color: #f7f7f7;
    overflow: auto;
    // display: flex;
    // flex-wrap: wrap;
    // align-content: flex-start;
    display: grid;
    align-content: flex-start;
    grid-template-columns: repeat(auto-fill, minmax(260px, 3fr));
    gap: 18px;
  }
</style>
