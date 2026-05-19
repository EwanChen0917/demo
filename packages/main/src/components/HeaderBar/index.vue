<template>
  <div class="app-header" :style="{ left: props.menuWidth + 'px !important' }">
    <div class="app-container container-fluid d-flex align-items-stretch justify-content-between">
      <!-- 收起菜单时，头部唤起菜单的icon&图标 -->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-1">
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-1 d-lg-none">
          <div
            class="btn btn-icon btn-active-color-primary w-35px h-35px ms-n2 me-2"
            id="kt_app_sidebar_mobile_toggle"
            @click="contractMenu"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
            <span class="svg-icon svg-icon-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                  fill="currentColor"
                />
                <path
                  opacity="0.3"
                  d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <!--end::Svg Icon-->
          </div>
          <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <a href="" class="d-lg-none">
              <img
                alt="Logo"
                :src="getImg('logos/default-small.svg')"
                class="theme-light-show h-30px"
              />
              <img
                alt="Logo"
                :src="getImg('logos/default-small-dark.svg')"
                class="theme-dark-show h-30px"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-2 d-flex-right">
        <div class="app-navbar flex-shrink-0">
          <div class="app-navbar-item ms-1 ms-lg-3" @click="showLogFn">
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
            >
              <span class="svg-icon svg-icon-1">
                <SvgIcon class="svg-icon" icon="chart" />
              </span>
            </div>
          </div>
          <div class="app-navbar-item ms-1 ms-lg-3">
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
            >
              <span class="svg-icon svg-icon-1">
                <SvgIcon class="svg-icon" icon="gen022" />
              </span>
            </div>
          </div>
          <div class="app-navbar-item ms-1 ms-lg-3">
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
            >
              <span class="svg-icon svg-icon-1">
                <SvgIcon class="svg-icon" icon="message" />
              </span>
              <span
                class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"
              ></span>
            </div>
          </div>
          <div class="app-navbar-item ms-1 ms-lg-3">
            <!--begin::Menu wrapper-->
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
            >
              <span class="symbol symbol-20px">
                <img class="rounded" :src="getImg('country/china.svg')" alt="" />
              </span>
            </div>
          </div>
          <div class="app-navbar-item ms-1 ms-lg-3">
            <div
              class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
            >
              <span class="svg-icon theme-light-show svg-icon-2">
                <SvgIcon class="svg-icon" icon="light" />
              </span>
            </div>
          </div>
          <!-- 用户信息 -->
          <UserInfoVue />
          <!-- 用户日志 -->
          <UserLogVue v-if="showLog" :visible="showLog" @close-modal="closeLog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import UserInfoVue from '../HeaderBar/Modal/userInfo.vue';
  import UserLogVue from '../HeaderBar/Modal/userLog.vue';
  let showLog = ref(false);

  const props = withDefaults(
    defineProps<{
      menuWidth: any;
    }>(),
    {
      menuWidth: 220
    }
  );

  // 事件声明
  const emit = defineEmits<{
    (event: 'retractMenuClick'): void;
  }>();

  const contractMenu = () => {
    console.log('rererere');
    // 菜单宽度
    // menuWidth.value = menuWidth;

    // 延迟设置菜单文案可见，优化交互体验
    // setTimeout(() => {
    // 标志展开
    emit('retractMenuClick');
    // }, 300);
  };

  const showLogFn = () => {
    //showLog.value = true;
  };

  const closeLog = () => {
    showLog.value = false;
  };

  const getImg = (name: string) => {
    return new URL(`../../assets/images/${name}`, import.meta.url).href;
  };
</script>

<style lang="scss" scoped>
  .d-flex-right {
    padding-right: 20px;
  }
  @media (min-width: 992px) {
    .d-lg-none {
      display: none !important;
    }
  }
  // @media (min-width: 992px) {
  //   .app-container {
  //     padding-left: 30px !important;
  //     padding-right: 30px !important;
  //   }
  // }
  // @media (max-width: 991.98px) {
  //   .app-container {
  //     max-width: none;
  //     padding-left: 20px !important;
  //     padding-right: 20px !important;
  //   }
  // }
</style>
