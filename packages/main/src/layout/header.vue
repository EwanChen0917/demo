<template>
  <el-header class="nav-header" :class="menuCollapse ? 'is-collapse' : ''">
    <Toolbar />
    <div class="ip-info text-gray-600">
      <!--      <Tag v-if="env === 'prod'">生产环境</Tag>
      <Tag v-else color="blue">测试环境</Tag>-->
      <div>{{ userInfo?.provinceName }}{{ userInfo?.cityName }}</div>
    </div>
    <div class="nav-operation">
      <!--      <div class="operation-item">
        <el-tooltip
          popper-class="action_tool_tip text-gray-600 h-40px"
          effect="light"
          content="智能助手"
          placement="bottom"
        >
          <div
            class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px pt-1"
            id="kt_activities_toggle"
            @click="toAiassistant"
          >
            <SvgIcon class-name="svg-icon-1" icon="gpt" />
          </div>
        </el-tooltip>
      </div>-->
      <template v-if="store.menuCollapse">
        <div class="operation-item">
          <System />
        </div>
        <div class="operation-item" v-permission="'salesForecastingLog'">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600 h-40px"
            effect="light"
            content="上传中心"
            placement="bottom"
          >
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
              id="kt_activities_toggle"
              @click="toUploadManage"
            >
              <SvgIcon class-name="svg-icon-1" icon="files-fil022" />
            </div>
          </el-tooltip>
        </div>
        <div class="operation-item" v-permission="'downloadmanage'">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600 h-40px"
            effect="light"
            content="下载中心"
            placement="bottom"
          >
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
              id="kt_activities_toggle"
              @click="toDownloadManage"
            >
              <SvgIcon class-name="svg-icon-1" icon="files-fil021" />
            </div>
          </el-tooltip>
        </div>
        <UserMenu />
      </template>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
  import { useStore } from '@/store/modules/useStore';
  import UserMenu from './user-menu.vue';
  import Toolbar from './toolbar.vue';
  import System from './nav/system.vue';

  const env = import.meta.env.MODE;
  const route = useRoute();
  const store = useStore();
  const menuCollapse = computed(() => store.menuCollapse);
  const userInfo = computed(() => store.userInfo);
  const router = useRouter();
  const toAiassistant = () => {
    router.push('/aiassistant');
  };
  const toUploadManage = () => {
    router.push('/salesForecastingLog');
  };
  const toDownloadManage = () => {
    router.push('/downloadmanage');
  };
  const toNavigation = () => {
    router.push('/navigation');
  };
  const toProcessManage = () => {
    router.push('/processManage');
  };
</script>

<style lang="scss" scoped>
  .nav-header {
    display: flex;
    background: #fff;
    align-items: center;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.06) inset;
    .nav-operation {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      z-index: 1;
    }
    .ip-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-right: 12px;
      div {
        width: max-content;
      }
    }
  }
  .gpt {
    border-radius: 50px;
    background: linear-gradient(left, #2ebfdd 0%, #2fa9e9 50%, #2c94f3 100%);
    background: -webkit-linear-gradient(left, #2ebfdd 0%, #2fa9e9 50%, #2c94f3 100%);
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }
</style>
