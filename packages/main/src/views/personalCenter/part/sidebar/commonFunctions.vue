<template>
  <div class="index-common-functions">
    <block-title>
      <div class="index-common-functions-title">
        <span>常用功能</span>
        <el-button text size="small" @click="handlerSetting">设置</el-button>
      </div>
    </block-title>
    <div class="funcs">
      <a v-for="item in list" :key="item.materialName" :href="item.jumpUrl" target="_blank">
        <div class="func">
          <div class="icon" :style="{ backgroundImage: `url(${item.materialImage})` }"></div>
          <div class="name">{{ item.materialName }}</div>
        </div>
      </a>
    </div>
  </div>
  <SetSystemDialog ref="setSystemDialogRef" :systemListProp="list" @success="queryAllSysTemList" />
</template>

<script setup lang="ts">
  import { personalCenterApi } from '@/api';
  import SetSystemDialog from '@/layout/nav/SetSystemDialog.vue';
  import BlockTitle from './components/blockTitle.vue';

  const list = ref([]);

  const queryAllSysTemList = async () => {
    const res = await personalCenterApi.luteosMemberQueryMemberCollectSysList({
      platform: 'lute_erp',
    });
    list.value = res.collectSysList || [];
  };

  onMounted(queryAllSysTemList);

  const setSystemDialogRef = ref();
  const handlerSetting = () => {
    // console.log('handlerSetting');
    setSystemDialogRef.value?.open();
  };
</script>

<style scoped lang="scss">
  .index-common-functions {
    background-color: white;
    padding: 20px;
    border-radius: 10px;

    .index-common-functions-title {
      flex: 1;
      display: flex;
      justify-content: space-between;

      :deep(.el-button) {
        color: var(---N6);
        font-weight: 400;
        padding: 0;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .funcs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: 100%;
      padding-top: 12px;
      justify-items: center;

      .func {
        width: 60px;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        min-width: 0;
        cursor: pointer;

        &:hover {
          background-color: #f5f5f5;
        }

        .icon {
          width: 32px;
          height: 32px;
          border-radius: 7%;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        .name {
          color: var(---N9, #1f1f1f);
          font-size: 12px;
          margin-top: 6px;
          font-weight: 400;
          word-break: keep-all;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
        }
      }
    }
  }
</style>
