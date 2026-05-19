<template>
  <div class="system-item">
    <div class="avatar">
      <img :src="item.materialImage" />
    </div>
    <div class="text">
      <!-- <div class="name">路特ERP</div> -->
      <div class="name">
        {{ item.materialName }}
      </div>
      <div class="tip">
        {{ item.materialDesc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    // materialName: string,
    // materialDesc: string,
    // materialImage: string,
    // jumpUrl: string,
    item: any;
  }>();
</script>

<style lang="scss" scoped>
  // .system {
  //   width: 100%;
  //   height: 100%;
  //   background-color: #FAFAFA;
  //   overflow: auto;
  //   display: flex;
  //   flex-wrap: wrap;
  //   align-content: flex-start;

  // 系统组件
  .system-item {
    padding: 13px 15px;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    // margin: 18px;

    &:hover {
      border: 1px solid $P6;
      /* Shadow3 - 高层级阴影 */
      box-shadow: 0px 6px 36px 0px rgba(6, 8, 27, 0.08);
    }

    .avatar {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 30%;
      // background: url('../images/login-main-1.png') no-repeat center;
      // background-color: lightblue;
      background-size: cover;
      // margin-left: 16px;
      img {
        height: 100%;
        display: block;
      }
    }

    .text {
      // flex: 1;
      width: 180px;
      margin-left: 14px;
      height: 46px;

      // margin-top: 14px;
      .name {
        font-size: 14px;
        font-style: normal;
        font-family: "PingFang SC Medium";
        line-height: 22px;
        color: $N9;
      }

      .tip {
        font-size: 12px;
        color: $N6;
        line-height: 20px;
        padding-top: 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 180px;
      }
    }
  }

  // }
</style>
