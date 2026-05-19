<template>
  <div class="w-100 d-flex justify-content-center">
    <div class="cockpitList">
      <div v-for="item in cockpitList" :key="item.materialCode" class="cockpit">
        <img
          class="cockpitImg card-rounded mb-5 cursor-pointer"
          :src="item.url"
          alt=""
          @click="toPath(item.linkUrl)"
        />
        <div
          class="fs-4 text-gray-900 fw-bold text-hover-primary lh-base cursor-pointer"
          @click="toPath(item.linkUrl)"
        >
          {{ item.title }}
        </div>
        <div class="fw-semibold fs-5 text-gray-600 my-4">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="cockpit">
import { commonApi } from '@/api';
  import { openWindow } from '@/utils';

  const env = import.meta.env.MODE;
  const cockpitList = ref([]);
  const queryCockpit = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      model: env === 'dev' ? 'MM2023083113191929720614' : 'MM2023100815173686371463',
      scene: 'sysnav',
      pageNum: 1,
      pageSize: 100,
    });
    cockpitList.value = res?.materialList;
  };

  queryCockpit();

  const toPath = (url) => {
    if (url) openWindow(url);
  };
</script>

<style scoped lang="scss">
  .cockpitList {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0 3vw;

    .cockpit {
      width: 24vw;
      min-width: 400px;
      background: #ffffff;
      padding: 25px;
      border-radius: 10px;
    }
  }

  .cockpitImg {
    width: 100%;
    height: 205px;
    margin-bottom: 10px;
  }
</style>
