<template>
  <!--begin::Footer-->
  <div id="kt_app_footer" class="app-footer">
    <!--begin::Footer container-->
    <div
      class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3"
    >
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-semibold me-1">2023©</span>
        <span class="text-gray-800 text-hover-primary">深圳市路特创新科技有限公司</span>
        <span class="text-gray-800 text-hover-primary ms-8 cursor-pointer" @click="toPath">
          粤ICP备2023047099号
        </span>
      </div>
      <!--end::Copyright-->
      <!--begin::Menu-->
      <!-- <ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
        <li class="menu-item">
          <a href="https://keenthemes.com" target="_blank" class="menu-link px-2">About</a>
        </li>
        <li class="menu-item">
          <a href="https://devs.keenthemes.com" target="_blank" class="menu-link px-2">Support</a>
        </li>
        <li class="menu-item">
          <a
            href="https://themes.getbootstrap.com/product/keen-the-ultimate-bootstrap-admin-theme/"
            target="_blank"
            class="menu-link px-2"
          >
            Purchase
          </a>
        </li>
      </ul> -->
      <!--end::Menu-->
    </div>
    <!--end::Footer container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts" setup>
  const toPath = () => {
    window.open('https://beian.miit.gov.cn');
  };
</script>
