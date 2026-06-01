<template>
  <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
    <div class="container-xxl h-100 bg_f9f9f9">
      <!-- 用户信息 -->
      <div class="d-flex flex-column flex-xl-row">
        <!-- 左边用户信息 -->
        <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10 bg_fff">
          <div class="card mb-5 mb-xl-8">
            <div class="card-body pt-15">
              <div class="d-flex flex-center flex-column mb-5">
                <div class="symbol symbol-100px symbol-circle mb-7">
                  <EleAvator
                    :url="userInfo.avatar"
                    isHandleError="true"
                    :name="userInfo.firstName"
                    :styleObj="{ width: '100px', height: '100px' }"
                  />
                </div>
                <div class="fs-3 text-gray-800 fw-bold mb-1 name_txt">
                  {{ userInfo.firstName + ' ' + userInfo.lastName }}
                </div>
              </div>
              <div class="separator separator-dashed my-3"></div>
              <div class="collapse show">
                <div class="py-5 fs-6">
                  <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                    <span class="line_normal">用户邮箱</span>
                    <span class="text-gray-600">{{ userInfo.email }}</span>
                  </div>

                  <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                    <span class="line_normal">国家</span>
                    <span class="text-gray-600">{{ userInfo.countryName }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                    <span class="line_normal">城市</span>
                    <span class="text-gray-600">{{ userInfo.city }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                    <span class="line_normal">手机号码</span>
                    <span class="text-gray-600">{{ userInfo.phone }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右边结构 -->
        <div
          class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10 bg_fff flex-lg-row-fluid ms-lg-15"
        >
          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card card-flush h-md-100">
              <div class="card-header pt-5">
                <h3 class="card-title text-gray-800">设备信息</h3>
              </div>
              <div class="card-body pt-5">
                <div class="d-flex flex-stack">
                  <div class="text-gray-700 fw-semibold fs-6 me-2">设备编号</div>
                  <div class="d-flex align-items-senter">
                    <span class="text-gray-800 fw-semibold fs-6 me-2">
                      {{ serviceDetail.deviceCode }}
                    </span>
                  </div>
                </div>
                <div class="separator separator-dashed my-3"></div>
                <div class="d-flex flex-stack">
                  <div class="text-gray-700 fw-semibold fs-6 me-2">设备类型</div>
                  <div class="d-flex align-items-senter">
                    <span class="text-gray-800 fw-semibold fs-6 me-2">
                      {{ serviceDetail.type }}
                    </span>
                  </div>
                </div>
                <div class="separator separator-dashed my-3"></div>
                <div class="d-flex flex-stack">
                  <div class="text-gray-700 fw-semibold fs-6 me-2">设备型号</div>
                  <div class="d-flex align-items-senter">
                    <span class="text-gray-800 fw-semibold fs-6 me-2">
                      {{ serviceDetail.model }}
                    </span>
                  </div>
                </div>
                <div class="separator separator-dashed my-3"></div>
                <div class="d-flex flex-stack">
                  <div class="text-gray-700 fw-semibold fs-6 me-2">激活时间</div>
                  <div class="d-flex align-items-senter">
                    <span class="text-gray-800 fw-semibold fs-6 me-2">
                      {{ serviceDetail.activeTime }}
                    </span>
                  </div>
                </div>
                <div class="separator separator-dashed my-3"></div>
                <div class="d-flex flex-stack">
                  <div class="text-gray-700 fw-semibold fs-6 me-2">绑定时间</div>
                  <div class="d-flex align-items-senter">
                    <span class="text-gray-800 fw-semibold fs-6 me-2">
                      {{ serviceDetail.relateTime }}
                    </span>
                  </div>
                </div>
                <div class="separator separator-dashed my-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单列表 -->
      <RecordTable />
    </div>
  </div>
</template>

<script setup lang="ts" name="servicedetail">
import { userApi, deviceApi } from '@/api/index';
  import RecordTable from './table/recordTable/index.vue';

  const route = useRoute();
  const userInfo = ref({});
  const serviceDetail = ref({});

  onMounted(() => {
    queryUserDetail();
    queryServiceDetail();
  });

  const queryUserDetail = async () => {
    const res = await userApi.luteosUserQueryUserInfo({ uid: route.query.uid || '' });
    userInfo.value = res;
  };
  const queryServiceDetail = async () => {
    const res = await deviceApi.luteosDeviceQueryDeviceDetail({
      deviceCode: route.query.deviceCode || '',
    });
    serviceDetail.value = res;
  };
</script>

<style scoped lang="scss">
  .bg_f9f9f9 {
    background-color: #f9f9f9;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .bg_fff {
    background-color: #fff;
  }
  .name_txt {
    width: 60%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nav-item {
    cursor: pointer;
  }
  .my-flex {
    display: flex;
    justify-content: space-between;
  }
  .text-hover-primary {
    cursor: pointer;
  }
  .flex-stack {
    height: 38px;
  }
  .mb-xl-8 {
    margin-bottom: 1.8rem;
  }
</style>
