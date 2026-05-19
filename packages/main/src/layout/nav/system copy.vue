<template>
  <el-popover
    popper-class="nav-system-popover"
    placement="bottom"
    :offset="15"
    width="360px"
    :show-arrow="false"
    trigger="hover"
    ref="sysPopRef"
  >
    <div class="system-container">
      <h3 class="title">
        <div class="left">切换系统</div>
        <div class="middle" @click="handleAllSystem">全部系统</div>
        <div class="right" @click="handleSetSystem">设置</div>
      </h3>
      <ul class="system-list">
        <li class="system-item" v-for="item in systemList" :key="item.materialCode">
          <a
            :href="item.jumpUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="sysPopRef.hide()"
          >
            <div class="system-icon">
              <img :src="item.materialImage" alt="" />
            </div>
            <div class="system-name">{{ item.materialName }}</div>
          </a>
        </li>
      </ul>
    </div>
    <SetSystemDialog ref="setSystemRef" :systemListProp="systemList" @success="setSystemApi" />
    <template #reference>
      <span class="system-tag" @click="btnReport">切换系统</span>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { memberApi, personalCenterApi } from '@/api';
  import SetSystemDialog from '@/layout/nav/SetSystemDialog.vue';
  import router from "@/router";

  const store = useStore();
  const route = useRoute();
  // const router = useRouter();
  // 系统设置
  const setSystemRef = ref(null);
  const sysPopRef = ref();
  const systemList = ref<any[]>([]);
  const init = async () => {
    const res = await personalCenterApi.luteosMemberQueryMemberCollectSysList({
      platform: 'lute_erp',
    });
    // console.log(res);
    if (res) {
      systemList.value = res.collectSysList as [];
    }
  };
  init();
  const setSystemApi = async () => {
    // console.log('setSystemApi');
    init();
  };
  const handleAllSystem = () => {
    // console.log('handleAllSystem');
    // window.open(`${window.location.origin}/allSystem`, '_blank');
    // const domain = import.meta.env.VITE_ENV === 'DEV' ? '.luteos.site' : '.luteos.com';
    // const authUrl = `https://auth${domain}/dashboard`;
    // window.open(authUrl, '_blank');
    // sysPopRef.value.hide();
    router.push({ name: 'personalCenter' });
  };
  const handleSetSystem = () => {
    sysPopRef.value.hide();
    if (setSystemRef.value) {
      (setSystemRef.value as any).open();
    }
  };
  const btnReport = () => {
    const menuCode = store.menuCodeMap?.[route?.name];
    memberApi.luteosMemberSysReport({
      platform: 'ERP',
      menuCode,
      eventName: '系统导航',
      memberCode: store?.userInfo?.memberCode || '',
      type: 'button',
      pageUrl: route?.path,
    });
  };
</script>

<style scoped lang="scss">
  .system-tag {
    background-color: #02b96b;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    padding: 1px 6px;
    cursor: pointer;
    display: inline-block;
    border-radius: 3px;
    margin-right: 8px;
    white-space: nowrap;
  }
</style>

<style lang="scss">
  .el-popper.is-light.el-popover.nav-system-popover {
    border-width: 0px !important;
  }
  .nav-system-popover.el-popover.el-popper {
    padding: 20px;
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #1f1f1f;
      margin-bottom: 16px;
      padding: 0 4px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        margin-left: 4px;
      }
      .middle {
        color: #999999;
        font-size: 12px;
        line-height: 24px;
        position: relative;
        padding-right: 9px;
        cursor: pointer;
        font-weight: normal !important;
        &::before {
          content: '';
          width: 1px;
          height: 8px;
          background-color: #dedede;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .right {
        font-weight: normal !important;
        cursor: pointer;
        color: #999999;
        font-size: 12px;
        line-height: 24px;
        margin-left: 8px;
        margin-right: 4px;
      }
    }
    .system-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(4, 80px);
      row-gap: 10px;
      .system-item {
        padding: 8px 0;
        border-radius: 6px;
        a {
          display: block;
          text-align: center;
          .system-icon {
            margin-bottom: 4px;
            font-size: 0;
            img {
              width: 40px;
              height: 40px;
              display: block;
              margin: 0 auto;
            }
          }
          .system-name {
            color: #1f1f1f;
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;
            width: 72px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
          }
        }
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
</style>
