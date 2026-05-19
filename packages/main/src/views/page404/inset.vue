<template>
  <div style="height: 30px; background: #f9f9f9"></div>
  <div class="d-flex flex-column flex-root bg-12" id="kt_app_root">
    <div class="d-flex flex-column flex-center flex-column-fluid">
      <div class="d-flex flex-column flex-center p-10">
        <div class="card card-flush w-lg-650px py-5">
          <div class="card-body py-15 py-lg-20 d-flex flex-column flex-center">
            <div class="mb-13 name_wrap">
              <span class="txt_wrap">
                <span>R</span>
              </span>
            </div>
            <h1 class="fw-bolder text-gray-900 mb-7" style="text-indent: 1rem">敬请期待！</h1>
            <div class="fw-semibold fs-6 text-gray-500 mb-7">功能即将上映</div>
            <div class="mb-n5">
              <img
                src="@/assets/images/home/coming-soon.png"
                class="mw-100 mh-300px theme-light-show"
                alt=""
                style="padding-left: 24px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
  .bg-12 {
    background-image: url('../../assets/images/home/bg12.jpg');
  }
  .name_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .txt_wrap {
    width: 50px;
    height: 50px;
    background-color: #126dd4;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    font-weight: 700;
    color: #fff;
  }
</style>
