<template>
  <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
      {{ breadInfo.firstMenu }}
    </h1>
    <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
      <li class="breadcrumb-item link-primary">
        <div class="text-muted text-hover-primary cursor-pointer" @click="toPath">
          {{ breadInfo.secondMenu }}
        </div>
      </li>
      <li class="breadcrumb-item" v-if="breadInfo.secondMenu">
        <span class="bullet bg-gray-400 w-5px h-2px"></span>
      </li>
      <li class="breadcrumb-item text-muted">{{ breadInfo.thirdMenu }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { baseStore } from '@/store/modules/baseStore';
  const baseInfo = baseStore();

  let { breadInfo } = storeToRefs(baseInfo);

  const router = useRouter();
  const toPath = () => {
    router.push('/');
  };
</script>
<style lang="scss" scoped>
  .second_menu_txt {
    background: linear-gradient(to right, #3e97ff, #50cd89); /*设置线性渐变*/
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .third_txt {
    background: linear-gradient(to right, #50cd89, #b13870); /*设置线性渐变*/
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .my-toolbar {
    padding-left: 0 !important;
    width: 98%;
    margin: 0 auto;
  }
</style>
