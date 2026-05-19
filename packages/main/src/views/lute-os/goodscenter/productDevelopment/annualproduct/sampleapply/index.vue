<template>
  <div class="card-toolbar d-flex justify-content-end bg-body py-5 pe-5 mb-1">
    <YearSelect v-model="year" @change="getData" />
  </div>
  <div class="row g-5 g-xl-10 mb-xl-10">
    <!--begin::Col-->
    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
      <!--begin::Card widget 16-->
      <div
        class="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-center border-0 h-md-50 mb-5 mb-xl-10"
        style="background-color: #080655"
      >
        <!--begin::Header-->
        <div class="card-header pt-5">
          <!--begin::Title-->
          <div class="card-title d-flex flex-column">
            <!--begin::Amount-->
            <span class="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{{ newPdtCount }}</span>
            <!--end::Amount-->

            <!--begin::Subtitle-->
            <span class="text-white opacity-50 pt-1 fw-semibold fs-6">当月应交付新品</span>
            <!--end::Subtitle-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Header-->

        <!--begin::Card body-->
        <div class="card-body d-flex align-items-end pt-0">
          <!--begin::Progress-->
          <div class="d-flex align-items-center flex-column mt-3 w-100">
            <div
              class="d-flex justify-content-between fw-bold fs-6 text-white opacity-50 w-100 mt-auto mb-2"
            >
              <span>当月实际交付率</span>
              <span>{{ monthHandleRate }}%</span>
            </div>

            <div class="h-8px mx-3 w-100 bg-light-danger rounded">
              <div
                class="bg-danger rounded h-8px"
                role="progressbar"
                :style="{ width: monthHandleRate + '%' }"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <!--end::Progress-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card widget 16-->

      <!--begin::Card widget 7-->
      <div class="card card-flush h-md-50 mb-5 mb-xl-10">
        <!--begin::Header-->
        <div class="card-header pt-5">
          <!--begin::Title-->
          <div class="card-title d-flex flex-column">
            <!--begin::Amount-->
            <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
              {{ yearProductManagerData.totalProductCount }}
            </span>
            <!--end::Amount-->

            <!--begin::Subtitle-->
            <span class="text-gray-400 pt-1 fw-semibold fs-6">全年核心新品上线总数</span>
            <!--end::Subtitle-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Header-->

        <!--begin::Card body-->
        <div class="card-body d-flex flex-column justify-content-end pe-0">
          <!--begin::Title-->
          <span class="fs-6 fw-bolder text-gray-800 d-block mb-2">负责新品的产品经理</span>
          <!--end::Title-->

          <!--begin::Users group-->
          <div class="symbol-group symbol-hover flex-nowrap">
            <div
              class="symbol symbol-35px symbol-circle"
              data-bs-toggle="tooltip"
              aria-label="Barry Walter"
              data-bs-original-title="Barry Walter"
              data-kt-initialized="1"
              v-for="(item, index) in yearProductManagerData.productManagerList?.slice(0, 6)"
              :key="index"
            >
              <img v-if="item.managerImage" alt="Pic" :src="item.managerImage" />
              <EleLetter
                v-else
                :name="item.managerName"
                class="avator"
                style="width: 35px; height: 35px"
              />
            </div>
            <a
              v-show="yearProductManagerData.productManagerList.length > 6"
              href="#"
              class="symbol symbol-35px symbol-circle"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_view_users"
            >
              <span class="symbol-label bg-dark text-gray-300 fs-8 fw-bold">
                +{{ yearProductManagerData.productManagerList.length }}
              </span>
            </a>
          </div>
          <!--end::Users group-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card widget 7-->
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
      <!--begin::Card widget 17-->
      <div class="card card-flush h-md-50 mb-5 mb-xl-10">
        <!--begin::Header-->
        <div class="card-header pt-5">
          <!--begin::Title-->
          <div class="card-title d-flex flex-column">
            <!--begin::Info-->
            <div class="d-flex align-items-center">
              <!--begin::Currency-->
              <!-- <span class="fs-4 fw-semibold text-gray-400 me-1 align-self-start">$</span> -->
              <!--end::Currency-->

              <!--begin::Amount-->
              <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
                {{ yearProductLineData.totalLineCount }}
              </span>
              <!--end::Amount-->

              <!--begin::Badge-->
              <!-- <span class="badge badge-light-success fs-base">
                    <i class="ki-duotone ki-arrow-up fs-5 text-success ms-n1">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    2.2%
                  </span> -->
              <!--end::Badge-->
            </div>
            <!--end::Info-->

            <!--begin::Subtitle-->
            <span class="text-gray-400 pt-1 fw-semibold fs-6">全年新品品线分类</span>
            <!--end::Subtitle-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Header-->

        <!--begin::Card body-->
        <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
          <!--begin::Chart-->
          <div class="d-flex flex-center me-5 pt-2">
            <div
              id="kt_card_widget_17_chart"
              style="min-width: 70px; min-height: 70px"
              data-kt-size="70"
              data-kt-line="11"
            >
              <span></span>
            </div>
          </div>
          <!--end::Chart-->

          <!--begin::Labels-->
          <div
            class="d-flex flex-column content-justify-center flex-row-fluid"
            style="height: 12rem; overflow: auto"
          >
            <!--begin::Label-->
            <div
              class="d-flex fw-semibold align-items-center my-1"
              v-for="item in yearProductLineData.pdtProductLineAnalysisList"
              :key="item.productLineCode"
            >
              <!--begin::Bullet-->
              <div
                class="bullet w-8px h-3px rounded-2 me-3"
                :style="{ backgroundColor: item.color }"
              ></div>
              <!--end::Bullet-->

              <!--begin::Label-->
              <ElTooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top"
                effect="light"
                trigger="hover"
                :content="item.productLineName"
                :disabled="item.productLineName?.length < 12"
              >
                <div class="text-gray-500 flex-grow-1 me-4 over_elli" style="width: 100px">
                  {{ item.productLineName || '' }}
                </div>
              </ElTooltip>
              <!--end::Label-->

              <!--begin::Stats-->
              <div class="fw-bolder text-gray-700 text-xxl-end">
                {{ item.productCount || 0 }}
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Label-->
          </div>
          <!--end::Labels-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card widget 17-->

      <!--begin::List widget 25-->
      <div class="card card-flush h-lg-50">
        <!--begin::Header-->
        <div class="card-header pt-5">
          <!--begin::Title-->
          <h3 class="card-title text-gray-800">年度分值</h3>
          <!--end::Title-->
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="card-body pt-5">
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <!--begin::Section-->
            <div class="text-gray-700 fw-semibold fs-6 me-2">年度新品评分平均值</div>
            <!--end::Section-->

            <!--begin::Statistics-->
            <div class="d-flex align-items-senter">
              <i class="ki-duotone ki-arrow-up-right fs-2 text-success me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>

              <!--begin::Number-->
              <span class="text-gray-900 fw-bolder fs-6">
                {{ pdtProductAvgStartAndDealyCount.avgStar }}
              </span>
              <!--end::Number-->

              <span class="text-gray-400 fw-bold fs-6">/5</span>
            </div>
            <!--end::Statistics-->
          </div>
          <!--end::Item-->

          <!--begin::Separator-->
          <div class="separator separator-dashed my-3"></div>
          <!--end::Separator-->

          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <!--begin::Section-->
            <div class="text-gray-700 fw-semibold fs-6 me-2">年度延期差值统计</div>
            <!--end::Section-->

            <!--begin::Statistics-->
            <div class="d-flex align-items-senter">
              <i class="ki-duotone ki-arrow-down-right fs-2 text-danger me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>

              <!--begin::Number-->
              <span class="text-gray-900 fw-bolder fs-6">
                {{ pdtProductAvgStartAndDealyCount.delayCount }}
              </span>
              <!--end::Number-->
            </div>
            <!--end::Statistics-->
          </div>
          <!--end::Item-->

          <!--begin::Separator-->
          <div class="separator separator-dashed my-3"></div>
          <!--end::Separator-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::LIst widget 25-->
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0">
      <!--begin::Timeline widget 3-->
      <div class="card h-md-100">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold text-dark">月度达成率分析</span>
            <span class="text-muted mt-1 fw-semibold fs-7">每月实际达成率</span>
          </h3>
        </div>
        <InstageChat
          v-if="instageData.xaxisData.length > 0"
          :seriesData="instageData.seriesData"
          :xaxisData="instageData.xaxisData"
        />
      </div>
      <!--end::Timeline widget 3-->
    </div>
    <!--end::Col-->
  </div>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <!--begin::Col-->
    <div class="col-xxl-6">
      <!--begin::Card widget 18-->
      <div class="card card-flush h-md-100">
        <!--begin::Body-->
        <div class="card-body py-9">
          <!--begin::Row-->
          <div class="row gx-9 h-100">
            <!--begin::Col-->
            <div class="col-sm-6 mb-10 mb-sm-0">
              <!--begin::Image-->
              <div
                class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-400px min-h-sm-100 h-100 img-33"
                style="background-size: 100% 100%"
              ></div>
              <!--end::Image-->
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col-sm-6">
              <!--begin::Wrapper-->
              <div class="d-flex flex-column h-100">
                <!--begin::Header-->
                <div class="mb-7">
                  <!--begin::Headin-->
                  <div class="d-flex flex-stack mb-6">
                    <!--begin::Title-->
                    <div class="flex-shrink-0 me-5">
                      <span class="text-gray-400 fs-7 fw-bold me-2 d-block lh-1 pb-1">
                        Featured
                      </span>

                      <span class="text-gray-800 fs-1 fw-bold">9 Degree</span>
                    </div>
                    <!--end::Title-->

                    <span
                      class="badge badge-light-primary flex-shrink-0 align-self-center py-3 px-4 fs-7"
                    >
                      In Process
                    </span>
                  </div>
                  <!--end::Heading-->

                  <!--begin::Items-->
                  <div class="d-flex align-items-center flex-wrap d-grid gap-2">
                    <!--begin::Item-->
                    <div class="d-flex align-items-center me-5 me-xl-13">
                      <!--begin::Symbol-->
                      <div class="symbol symbol-30px symbol-circle me-3">
                        <img src="/src/assets/images/home/300-29.jpg" class="" alt="" />
                      </div>
                      <!--end::Symbol-->

                      <!--begin::Info-->
                      <div class="m-0">
                        <span class="fw-semibold text-gray-400 d-block fs-8">Manager</span>
                        <a
                          href="/keen/demo1/../demo1/pages/user-profile/overview.html"
                          class="fw-bold text-gray-800 text-hover-primary fs-7"
                        >
                          Robert Fox
                        </a>
                      </div>
                      <!--end::Info-->
                    </div>
                    <!--end::Item-->

                    <!--begin::Item-->
                    <div class="d-flex align-items-center">
                      <!--begin::Symbol-->
                      <div class="symbol symbol-30px symbol-circle me-3">
                        <span class="symbol-label bg-success">
                          <i class="ki-duotone ki-abstract-41 fs-5 text-white">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                        </span>
                      </div>
                      <!--end::Symbol-->

                      <!--begin::Info-->
                      <div class="m-0">
                        <span class="fw-semibold text-gray-400 d-block fs-8">Budget</span>
                        <span class="fw-bold text-gray-800 fs-7">$64.800</span>
                      </div>
                      <!--end::Info-->
                    </div>
                    <!--end::Item-->
                  </div>
                  <!--end::Items-->
                </div>
                <!--end::Header-->

                <!--begin::Body-->
                <div class="mb-6">
                  <!--begin::Text-->
                  <span class="fw-semibold text-gray-600 fs-6 mb-8 d-block">
                    Flat cartoony illustrations with vivid unblended colors and asymmetrical
                    beautiful purple hair lady
                  </span>
                  <!--end::Text-->

                  <!--begin::Stats-->
                  <div class="d-flex">
                    <!--begin::Stat-->
                    <div
                      class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6 mb-3"
                    >
                      <!--begin::Date-->
                      <span class="fs-6 text-gray-700 fw-bold">Feb 6, 2021</span>
                      <!--end::Date-->

                      <!--begin::Label-->
                      <div class="fw-semibold text-gray-400">Due Date</div>
                      <!--end::Label-->
                    </div>
                    <!--end::Stat-->

                    <!--begin::Stat-->
                    <div
                      class="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 mb-3"
                    >
                      <!--begin::Number-->
                      <span class="fs-6 text-gray-700 fw-bold">
                        $
                        <span
                          class="ms-n1 counted"
                          data-kt-countup="true"
                          data-kt-countup-value="284,900.00"
                          data-kt-initialized="1"
                        >
                          284,900
                        </span>
                      </span>
                      <!--end::Number-->

                      <!--begin::Label-->
                      <div class="fw-semibold text-gray-400">Budget</div>
                      <!--end::Label-->
                    </div>
                    <!--end::Stat-->
                  </div>
                  <!--end::Stats-->
                </div>
                <!--end::Body-->

                <!--begin::Footer-->
                <div class="d-flex flex-stack mt-auto bd-highlight">
                  <!--begin::Users group-->
                  <div class="symbol-group symbol-hover flex-nowrap">
                    <div
                      class="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      aria-label="Melody Macy"
                      data-bs-original-title="Melody Macy"
                      data-kt-initialized="1"
                    >
                      <img alt="Pic" src="/src/assets/images/home/300-12.jpg" />
                    </div>
                    <div
                      class="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      aria-label="Michael Eberon"
                      data-bs-original-title="Michael Eberon"
                      data-kt-initialized="1"
                    >
                      <img alt="Pic" src="/src/assets/images/home/300-29.jpg" />
                    </div>
                    <div
                      class="symbol symbol-35px symbol-circle"
                      data-bs-toggle="tooltip"
                      data-bs-original-title="Susan Redwood"
                      data-kt-initialized="1"
                    >
                      <span class="symbol-label bg-primary text-inverse-primary fw-bold">S</span>
                    </div>
                  </div>
                  <!--end::Users group-->

                  <!--begin::Actions-->
                  <a
                    href="/keen/demo1/../demo1/apps/projects/project.html"
                    class="d-flex align-items-center text-primary opacity-75-hover fs-6 fw-semibold"
                  >
                    View Project

                    <i class="ki-duotone ki-exit-right-corner fs-4 ms-1">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </a>
                  <!--end::Actions-->
                </div>
                <!--end::Footer-->
              </div>
              <!--end::Wrapper-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Card widget 18-->
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xxl-6">
      <!--begin::Engage widget 8-->
      <div
        class="card border-0 h-md-100"
        data-bs-theme="light"
        style="background: linear-gradient(112.14deg, #00d2ff 0%, #3a7bd5 100%)"
      >
        <!--begin::Body-->
        <div class="card-body">
          <!--begin::Row-->
          <div class="row align-items-center h-100">
            <!--begin::Col-->
            <div class="col-7 ps-xl-13">
              <!--begin::Title-->
              <div class="text-white mb-6 pt-6">
                <span class="fs-4 fw-semibold me-2 d-block lh-1 pb-2 opacity-75">
                  Get best offer
                </span>

                <span class="fs-2qx fw-bold">Upgrade Your Plan</span>
              </div>
              <!--end::Title-->

              <!--begin::Text-->
              <span class="fw-semibold text-white fs-6 mb-8 d-block opacity-75">
                Flat cartoony and illustrations with vivid unblended purple hair lady
              </span>
              <!--end::Text-->

              <!--begin::Items-->
              <div class="d-flex align-items-center flex-wrap d-grid gap-2 mb-10 mb-xl-20">
                <!--begin::Item-->
                <div class="d-flex align-items-center me-5 me-xl-13">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-30px symbol-circle me-3">
                    <span class="symbol-label" style="background: #35c7ff">
                      <i class="ki-duotone ki-abstract-41 fs-5 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </span>
                  </div>
                  <!--end::Symbol-->

                  <!--begin::Info-->
                  <div class="text-white">
                    <span class="fw-semibold d-block fs-8 opacity-75">Projects</span>
                    <span class="fw-bold fs-7">Up to 500</span>
                  </div>
                  <!--end::Info-->
                </div>
                <!--end::Item-->

                <!--begin::Item-->
                <div class="d-flex align-items-center">
                  <!--begin::Symbol-->
                  <div class="symbol symbol-30px symbol-circle me-3">
                    <span class="symbol-label" style="background: #35c7ff">
                      <i class="ki-duotone ki-abstract-26 fs-5 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </span>
                  </div>
                  <!--end::Symbol-->

                  <!--begin::Info-->
                  <div class="text-white">
                    <span class="fw-semibold opacity-75 d-block fs-8">Tasks</span>
                    <span class="fw-bold fs-7">Unlimited</span>
                  </div>
                  <!--end::Info-->
                </div>
                <!--end::Item-->
              </div>
              <!--end::Items-->

              <!--begin::Action-->
              <div class="d-flex flex-column flex-sm-row d-grid gap-2">
                <a
                  href="#"
                  class="btn btn-success flex-shrink-0 me-lg-2"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_upgrade_plan"
                >
                  Upgrade Plan
                </a>
                <a
                  href="#"
                  class="btn btn-primary flex-shrink-0"
                  style="background: rgba(255, 255, 255, 0.2)"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_create_app"
                >
                  Read Guides
                </a>
              </div>
              <!--end::Action-->
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col-5 pt-10">
              <!--begin::Illustration-->
              <div class="bgi-no-repeat bgi-size-contain bgi-position-x-end h-225px svg-5"></div>
              <!--end::Illustration-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Engage widget 8-->
    </div>
    <!--end::Col-->
  </div>
</template>

<script setup lang="ts">
  import EleLetter from '@/components/EleAvator/letter.vue';
  import { ElTooltip } from 'element-plus';

  import {
    getMonthHandleAnalysis,
    getYearProductLineAnalysis,
    getYearProductManagerAnalysis,
    getPdtProductAvgStartAndDealyCount,
    getComplianceTrendency,
  } from '@/apis/newProduct';
  import { baseStore } from '@/store/modules/baseStore';
  import InstageChat from './parts/instageChat.vue';

  const year = ref<string>('2023');

  const baseStoreFn = baseStore();
  const { setTableLoading } = baseStoreFn;
  const router = useRouter();
  const state = reactive<{
    instageData: any;
    newPdtCount: number;
    monthHandleRate: number;
    yearProductLineData: any;
    yearProductManagerData: any;
    pdtProductAvgStartAndDealyCount: any;
    colorlist: any;
  }>({
    instageData: {
      xaxisData: [],
      seriesData: [],
    },
    newPdtCount: 0,
    monthHandleRate: 0,
    yearProductLineData: {
      pdtProductLineAnalysisList: [],
      totalLineCount: 0,
    },
    yearProductManagerData: {
      productManagerList: [],
      totalProductCount: 0,
    },
    pdtProductAvgStartAndDealyCount: {
      avgStar: 0,
      delayCount: 0,
    },
    colorlist: ['#50CD89', '#7239EA', '#FFC700', '#b93993', '#F1416C', '#3E97FF'],
  });
  const {
    instageData,
    newPdtCount,
    monthHandleRate,
    yearProductLineData,
    yearProductManagerData,
    pdtProductAvgStartAndDealyCount,
    colorlist,
  } = toRefs(state);
  // const goto404 = () => {
  //   router.push('/baseset/inset?rds=' + Math.random() * 10);
  // };
  // goto404();
  const getMonthHandle = () => {
    const data = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };
    setTableLoading(true);
    getMonthHandleAnalysis(data)
      .then((res) => {
        if (res.code == 200) {
          const obj = res.result || [];
          newPdtCount.value = obj.newPdtCount;
          monthHandleRate.value = obj.monthHandleRate * 100 || 0;
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  getMonthHandle();

  const getYearProductLine = () => {
    const data = {
      year: year.value,
    };
    setTableLoading(true);
    getYearProductLineAnalysis(data)
      .then((res) => {
        if (res.code == '200') {
          const obj = res.result || [];
          yearProductLineData.value.pdtProductLineAnalysisList = obj.pdtProductLineAnalysisList;
          yearProductLineData.value.totalLineCount = obj.totalLineCount;
          yearProductLineData.value.pdtProductLineAnalysisList.map((item: any, i) => {
            item.color = colorlist.value[i % 6];
          });
          KTCardsWidget17();
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const getYearProductManager = () => {
    const data = {
      year: year.value,
    };
    setTableLoading(true);
    getYearProductManagerAnalysis(data)
      .then((res) => {
        if (res.code == '200') {
          const obj = res.result || [];
          yearProductManagerData.value.productManagerList = obj.productManagerList;
          yearProductManagerData.value.totalProductCount = obj.totalProductCount;
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  getYearProductManager();

  const getPdtProductAvgStart = () => {
    const data = {
      year: year.value,
    };
    setTableLoading(true);
    getPdtProductAvgStartAndDealyCount(data)
      .then((res) => {
        if (res.code == '200') {
          const obj = res.result || [];
          pdtProductAvgStartAndDealyCount.value.avgStar = obj.avgStar?.toFixed(2);
          pdtProductAvgStartAndDealyCount.value.delayCount = obj.delayCount;
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  getPdtProductAvgStart();

  const getCompliance = () => {
    const data = {
      year: year.value,
    };
    setTableLoading(true);
    getComplianceTrendency(data)
      .then((res) => {
        if (res.code == '200') {
          const list = res.result.trendencyList || [];
          const sdata = [];
          list.map((item: any) => {
            instageData.value.xaxisData.push(item?.monthName);
            sdata.push((item?.rate * 100).toFixed(2));
          });
          instageData.value.seriesData = [
            {
              name: '实际达成率',
              data: sdata,
            },
          ];
          console.log('instageData', instageData.value);
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const bubbleSort = (array: any) => {
    const len = array.length;
    if (len < 2) return array;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < i; j++) {
        if (array[j].lineProductRate > array[i].lineProductRate) {
          const temp = array[j];
          array[j] = array[i];
          array[i] = temp;
        }
      }
    }
    return array;
  };

  var KTCardsWidget17 = function () {
    // Private methods
    const initChart = function () {
      const el = document.getElementById('kt_card_widget_17_chart');

      if (!el) {
        return;
      }
      el.innerHTML = '';
      const options = {
        size: el.getAttribute('data-kt-size') ? parseInt(el.getAttribute('data-kt-size')) : 70,
        lineWidth: el.getAttribute('data-kt-line') ? parseInt(el.getAttribute('data-kt-line')) : 11,
        rotate: el.getAttribute('data-kt-rotate')
          ? parseInt(el.getAttribute('data-kt-rotate'))
          : 145,
        // percent:  el.getAttribute('data-kt-percent') ,
      };

      const canvas = document.createElement('canvas');
      const span = document.createElement('span');

      if (typeof G_vmlCanvasManager !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
      }

      const ctx = canvas.getContext('2d');
      canvas.width = canvas.height = options.size;

      el.appendChild(span);
      el.appendChild(canvas);

      ctx.translate(options.size / 2, options.size / 2); // change center
      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

      // imd = ctx.getImageData(0, 0, 240, 240);
      const radius = (options.size - options.lineWidth) / 2;
      let start = (60 * Math.PI) / 180;
      const rad = Math.PI * 2;
      const init = Math.PI / 2;
      let sum = 0;
      const drawCircle = function (color, lineWidth, percent) {
        sum += percent;
        ctx.beginPath();
        const end = sum == 0 ? start : init + sum * rad;
        ctx.arc(0, 0, radius, start, end, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
        start = end;
      };

      // Init
      const list = yearProductLineData.value.pdtProductLineAnalysisList;
      const listSort = bubbleSort(list).reverse();
      // drawCircle('#E4E6EF', options.lineWidth, 100 / 100);
      // drawCircle('#50CD89', options.lineWidth, 100 / 150); //0.66
      // drawCircle('#7239EA', options.lineWidth, 100 / 250);
      for (let i = 0; i < listSort.length; i++) {
        drawCircle(listSort[i].color, options.lineWidth, listSort[i].lineProductRate * 1);
      }
    };
    return initChart();
  };

  const getData = () => {
    getYearProductLine();
    getCompliance();
    getYearProductManager();
    getPdtProductAvgStart();
  };

  onMounted(() => {
    getYearProductLine();
    getCompliance();
  });
</script>

<style scoped lang="scss">
  .card .card-header {
    padding: 0 2.25rem;
  }

  .img-33 {
    background-image: url('@/assets/images/home/img-33.jpg');
  }

  .svg-5 {
    background-image: url('@/assets/images/home/5.svg');
  }
</style>
