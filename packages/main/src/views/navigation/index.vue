<template>
  <KeenCard title="我的收藏">
    <div class="d-flex gap-10 px-7 flex-wrap">
      <div
        v-for="item in myFavour"
        :key="item.materialCode"
        class="d-flex flex-column align-items-center gap-3 cursor-pointer item w-80px"
        @click="navigateTo(item.jumpUrl)"
      >
        <div class="position-relative shadow" style="border-radius: 5px">
          <img :src="item.materialImage" alt="" class="item-img" />
          <div
            class="svg-icon svg-icon-4 favour-icon isFavour"
            @click.stop="memberCollect(item.materialCode, 1 - item.collectFlag)"
          >
            <SvgIcon icon="general-gen029" />
          </div>
        </div>
        <div class="text-center w-80px">{{ item?.materialName }}</div>
      </div>
    </div>
  </KeenCard>
  <div v-for="model in systemNavModelList" :key="model.model">
    <KeenCard v-if="model.systemNavList.length" :title="model.name">
      <div class="d-flex gap-10 px-7 flex-wrap">
        <div
          v-for="(item, index) in model.systemNavList"
          :key="index"
          class="d-flex flex-column align-items-center gap-3 cursor-pointer item w-80px"
          @click="navigateTo(item.jumpUrl)"
        >
          <div class="position-relative shadow" style="border-radius: 5px">
            <img :src="item.materialImage" alt="" class="item-img" />
            <div
              class="svg-icon svg-icon-4 favour-icon"
              :class="item.collectFlag ? 'isFavour' : 'unFavour'"
              @click.stop="memberCollect(item.materialCode, 1 - item.collectFlag)"
            >
              <SvgIcon icon="general-gen029" />
            </div>
          </div>
          <div class="text-center w-80px" style="transform: perspective(1px)">
            {{ item?.materialName }}
          </div>
        </div>
      </div>
    </KeenCard>
  </div>
</template>

<script setup lang="ts" name="navigation">
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import { memberApi } from '@/api';
  import { SystemNavBean, SystemNavModelBean } from '@/api/member/data-contracts';

  const myFavour = ref<SystemNavBean[]>([]);
  const systemNavModelList = ref<SystemNavModelBean[]>([]);

  const getSystemNavList = async () => {
    const res = await memberApi.luteosMemberQuerySystemNavList();
    myFavour.value = res?.memberCollectNavList || [];
    systemNavModelList.value = res?.systemNavModelList || [];
  };
  getSystemNavList();

  const navigateTo = (url) => {
    if (url) openWindow(url);
    else ElMessage.error('跳转链接错误');
  };

  const memberCollect = async (itemCode, collectFlag) => {
    await memberApi.luteosMemberSaveMemberCollect({
      itemList: [{ itemCode, collectFlag }],
      collectScene: 'sysnav',
    });
    ElMessage.success(collectFlag === 1 ? '收藏成功' : '取消收藏');
    getSystemNavList();
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
