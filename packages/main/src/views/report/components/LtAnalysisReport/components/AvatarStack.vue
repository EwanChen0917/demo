<template>
  <div class="avatar-wrapper">
    <template v-for="collection in sliceAvatars" :key="collection.id">
      <div
        class="avatar"
        :style="{
          backgroundImage: `url(${
            collection.avatar ||
            'https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/C00000001/temp/Group%201896.png'
          })`,
        }"
      ></div>
    </template>
    <div class="avatar ellipsis" v-if="avatars.length > props.max">
      <el-popover placement="top" width="220" trigger="hover" effect="dark">
        <template #reference>
          <span>...</span>
        </template>
        <div class="avatar-name">
          {{ avatars.map((item) => item.creatorName).join(', ') }}
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type MpcWeeklyReportContracts } from '@/api';

  const props = withDefaults(
    defineProps<{
      avatars: MpcWeeklyReportContracts.MarketWeeklyReportBean[];
      max?: number;
    }>(),
    {
      max: 5,
    }
  );

  const sliceAvatars = computed(() => {
    if (props.avatars.length <= (props.max ?? 5)) {
      return props.avatars;
    }
    return props.avatars.slice(0, props.max ?? 5);
  });
</script>

<style scoped lang="scss">
  .avatar-wrapper {
    flex: none;
    display: flex;
    margin-right: 6px;
  }
  .avatar {
    border: 1px solid #fff;
    width: 18px;
    height: 18px;
    margin-right: -9px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    &.ellipsis {
      display: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      margin-left: -9px;
      color: #fff;
      font-size: 12px;
      line-height: 1;
      text-align: center;
    }
  }
  .avatar-name {
    max-width: 200px;
    word-break: break-all;
    padding: 4px 8px 6px 8px;
    color: #fff;

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
</style>
