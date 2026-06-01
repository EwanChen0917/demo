<template>
  <KeenCard title="第三方系统">
    <div class="d-flex gap-10 px-7 flex-wrap">
      <div
        v-for="item in systemList"
        :key="item.materialCode"
        class="d-flex flex-column align-items-center gap-3 cursor-pointer item w-80px"
        @click="navigateTo(item.linkUrl)"
      >
        <div class="position-relative shadow" style="border-radius: 5px">
          <img :src="item.url" alt="" class="item-img" />
          <!--          <div
            class="svg-icon svg-icon-4 favour-icon isFavour"
            @click.stop="memberCollect(item.materialCode, 1 - item.collectFlag)"
          >
            <SvgIcon icon="general-gen029" />
          </div>-->
        </div>
        <div class="text-center w-80px">{{ item?.title }}</div>
      </div>
    </div>
  </KeenCard>
</template>

<script setup lang="ts" name="thirdPartyNavigation">
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import { commonApi } from '@/api';

  const env = import.meta.env.MODE;

  const systemList = ref([]);

  const getSystemNavList = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      model: env === 'prod' ? 'MM2025020717294559290472' : 'MM2025012010025631644164',
      scene: 'sysnav',
      pageNum: 1,
      pageSize: 100,
    });
    systemList.value = res?.materialList || [];
  };
  getSystemNavList();

  const navigateTo = (url) => {
    if (url) openWindow(url);
    else ElMessage.error('跳转链接错误');
  };
</script>

<style scoped lang="scss">
  $favour-color: #f7ba2a;
  .item {
    backface-visibility: hidden;
    transition: transform 0.3s ease;
  }

  .item:hover {
    transform: scale(calc(14 / 13));

    .unFavour .svg-icon {
      stroke: $favour-color;
      color: transparent;
      display: block !important;
    }
  }

  .item-img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }

  .favour-icon {
    position: absolute;
    right: 2px;
    bottom: 2px;
    //transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.05);

      .svg-icon {
        color: $favour-color !important;
      }
    }

    &:active {
      transform: scale(0.9);
    }
  }

  .isFavour {
    .svg-icon {
      stroke: $favour-color;
      color: $favour-color;
      display: revert;
    }
  }

  .unFavour {
    .svg-icon {
      stroke: $favour-color;
      color: transparent;
      display: none;
    }
  }

  /*@keyframes animation {

}*/
</style>
