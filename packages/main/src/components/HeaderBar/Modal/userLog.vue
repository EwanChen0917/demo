<template>
  <div class="drawer-overlay log_overlay" :class="{ lay_opa: showVisible }">
    <div class="log_left" @click="handClose"></div>
    <transition name="fade" appear>
      <div class="bg-body user_log_wrap" v-if="showVisible">
        <div class="card shadow-none border-0 rounded-0 user_log">
          <div class="card-header">
            <h3 class="card-title fw-bold text-dark">Activity Logs</h3>
            <div class="card-toolbar">
              <button
                type="button"
                class="btn btn-sm btn-icon btn-active-light-primary me-n5"
                @click="handClose"
              >
                <span class="svg-icon svg-icon-1">
                  <SvgIcon icon="close" />
                </span>
              </button>
            </div>
          </div>
          <div class="card-body position-relative user_log_body">
            <div class="position-relative scroll-y me-n5 pe-5 user_log_content">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-line w-40px"></div>
                  <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
                    <div class="symbol-label bg-light">
                      <span class="svg-icon svg-icon-2 svg-icon-gray-500">
                        <SvgIcon icon="info" />
                      </span>
                    </div>
                  </div>
                  <div class="timeline-content mb-10 mt-n1">
                    <div class="pe-3 mb-5">
                      <div class="fs-5 fw-semibold mb-2">
                        There are 2 new tasks for you in “AirPlus Mobile App” project:
                      </div>
                      <div class="d-flex align-items-center mt-1 fs-6">
                        <div class="text-muted me-2 fs-7">Added at 4:23 PM by</div>
                        <div
                          class="symbol symbol-circle symbol-25px"
                          data-bs-toggle="tooltip"
                          data-bs-boundary="window"
                          data-bs-placement="top"
                          title="Nina Nilson"
                        >
                          <img :src="getImg('home/300-12.jpg')" alt="img" />
                        </div>
                      </div>
                    </div>
                    <div class="overflow-auto pb-5">
                      <div
                        class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5"
                      >
                        <div
                          class="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px"
                        >
                          Meeting with customer
                        </div>
                        <div class="min-w-175px pe-2">
                          <span class="badge badge-light text-muted">Application Design</span>
                        </div>
                        <div
                          class="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2"
                        >
                          <div class="symbol symbol-circle symbol-25px">
                            <img :src="getImg('home/300-12.jpg')" alt="img" />
                          </div>
                          <div class="symbol symbol-circle symbol-25px">
                            <img :src="getImg('home/300-12.jpg')" alt="img" />
                          </div>
                          <div class="symbol symbol-circle symbol-25px">
                            <div
                              class="symbol-label fs-8 fw-semibold bg-primary text-inverse-primary"
                            >
                              A
                            </div>
                          </div>
                        </div>
                        <div class="min-w-125px pe-2">
                          <span class="badge badge-light-primary">In Progress</span>
                        </div>
                        <div class="btn btn-sm btn-light btn-active-light-primary">View</div>
                      </div>
                      <div
                        class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-0"
                      >
                        <div
                          class="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px"
                        >
                          Project Delivery Preparation
                        </div>
                        <div class="min-w-175px">
                          <span class="badge badge-light text-muted">CRM System Development</span>
                        </div>
                        <div class="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px">
                          <div class="symbol symbol-circle symbol-25px">
                            <img :src="getImg('home/300-12.jpg')" alt="img" />
                          </div>
                          <div class="symbol symbol-circle symbol-25px">
                            <div
                              class="symbol-label fs-8 fw-semibold bg-success text-inverse-primary"
                            >
                              B
                            </div>
                          </div>
                        </div>
                        <div class="min-w-125px">
                          <span class="badge badge-light-success">Completed</span>
                        </div>
                        <div class="btn btn-sm btn-light btn-active-light-primary">View</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-line w-40px"></div>
                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label bg-light">
                      <span class="svg-icon svg-icon-2 svg-icon-gray-500">
                        <SvgIcon icon="nail" />
                      </span>
                    </div>
                  </div>
                  <div class="timeline-content mb-10 mt-n2">
                    <div class="overflow-auto pe-3">
                      <div class="fs-5 fw-semibold mb-2">
                        Invitation for crafting engaging designs that speak human workshop
                      </div>
                      <div class="d-flex align-items-center mt-1 fs-6">
                        <div class="text-muted me-2 fs-7">Sent at 4:23 PM by</div>
                        <div
                          class="symbol symbol-circle symbol-25px"
                          data-bs-toggle="tooltip"
                          data-bs-boundary="window"
                          data-bs-placement="top"
                          title="Alan Nilson"
                        >
                          <img :src="getImg('home/300-12.jpg')" alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-line w-40px"></div>
                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label bg-light">
                      <span class="svg-icon svg-icon-2 svg-icon-gray-500">
                        <SvgIcon icon="pin" />
                      </span>
                    </div>
                  </div>
                  <div class="timeline-content mb-10 mt-n1">
                    <div class="mb-5 pe-3">
                      <div class="fs-5 fw-semibold text-gray-800 text-hover-primary mb-2">
                        3 New Incoming Project Files:
                      </div>
                      <div class="d-flex align-items-center mt-1 fs-6">
                        <div class="text-muted me-2 fs-7">Sent at 10:30 PM by</div>
                        <div
                          class="symbol symbol-circle symbol-25px"
                          data-bs-toggle="tooltip"
                          data-bs-boundary="window"
                          data-bs-placement="top"
                          title="Jan Hummer"
                        >
                          <img :src="getImg('home/300-12.jpg')" alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-line w-40px"></div>
                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label bg-light">
                      <span class="svg-icon svg-icon-2 svg-icon-gray-500">
                        <SvgIcon icon="document" />
                      </span>
                    </div>
                  </div>
                  <div class="timeline-content mb-10 mt-n1">
                    <div class="pe-3 mb-5">
                      <div class="fs-5 fw-semibold mb-2">
                        Task
                        <span class="text-primary fw-bold me-1">#45890</span>
                        merged with
                        <span class="text-primary fw-bold me-1">#45890</span>
                        in “Ads Pro Admin Dashboard project:
                      </div>
                      <div class="d-flex align-items-center mt-1 fs-6">
                        <div class="text-muted me-2 fs-7">Initiated at 4:23 PM by</div>
                        <div
                          class="symbol symbol-circle symbol-25px"
                          data-bs-toggle="tooltip"
                          data-bs-boundary="window"
                          data-bs-placement="top"
                          title="Nina Nilson"
                        >
                          <img :src="getImg('home/300-12.jpg')" alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-line w-40px"></div>
                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label bg-light">
                      <span class="svg-icon svg-icon-2 svg-icon-gray-500">
                        <SvgIcon icon="pencil" />
                      </span>
                    </div>
                  </div>
                  <div class="timeline-content mb-10 mt-n1">
                    <div class="pe-3 mb-5">
                      <div class="fs-5 fw-semibold mb-2">
                        3 new application design concepts added:
                      </div>
                      <div class="d-flex align-items-center mt-1 fs-6">
                        <div class="text-muted me-2 fs-7">Created at 4:23 PM by</div>
                        <div
                          class="symbol symbol-circle symbol-25px"
                          data-bs-toggle="tooltip"
                          data-bs-boundary="window"
                          data-bs-placement="top"
                          title="Marcus Dotson"
                        >
                          <img :src="getImg('home/300-12.jpg')" alt="img" />
                        </div>
                      </div>
                    </div>
                    <div class="overflow-auto pb-5">
                      <div
                        class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7"
                      >
                        <div class="overlay me-10">
                          <div class="overlay-wrapper">
                            <img
                              alt="img"
                              class="rounded w-150px"
                              :src="getImg('home/img-29.jpg')"
                            />
                          </div>
                          <div class="overlay-layer bg-dark bg-opacity-10 rounded">
                            <span class="btn btn-sm btn-primary btn-shadow">Explore</span>
                          </div>
                        </div>
                        <div class="overlay me-10">
                          <div class="overlay-wrapper">
                            <img
                              alt="img"
                              class="rounded w-150px"
                              :src="getImg('home/img-31.jpg')"
                            />
                          </div>
                          <div class="overlay-layer bg-dark bg-opacity-10 rounded">
                            <span class="btn btn-sm btn-primary btn-shadow">Explore</span>
                          </div>
                        </div>
                        <div class="overlay">
                          <div class="overlay-wrapper">
                            <img
                              alt="img"
                              class="rounded w-150px"
                              :src="getImg('home/img-40.jpg')"
                            />
                          </div>
                          <div class="overlay-layer bg-dark bg-opacity-10 rounded">
                            <span class="btn btn-sm btn-primary btn-shadow">Explore</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-line w-40px"></div>
                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label bg-light">
                      <span class="svg-icon svg-icon-2 svg-icon-gray-500">
                        <SvgIcon icon="basket" />
                      </span>
                    </div>
                  </div>
                  <div class="timeline-content mt-n1">
                    <div class="pe-3 mb-5">
                      <div class="fs-5 fw-semibold mb-2">
                        New order
                        <span class="text-primary fw-bold me-1">#67890</span>
                        is placed for Workshow Planning & Budget Estimation
                      </div>
                      <div class="d-flex align-items-center mt-1 fs-6">
                        <div class="text-muted me-2 fs-7">Placed at 4:23 PM by</div>
                        <span class="text-primary fw-bold me-1">Jimmy Bold</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer py-5 text-center">
            <a
              href="../../demo1/dist/pages/user-profile/activity.html"
              class="btn btn-bg-body text-primary"
            >
              View All Activities
              <span class="svg-icon svg-icon-3 svg-icon-primary">
                <SvgIcon class-name="svg-icon-primary" icon="arrowRight" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    visible: boolean;
  }>();

  const getImg = (name: string) => {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href;
  };

  let showVisible = ref(false);
  showVisible.value = props.visible as any;

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload'): void;
  }>();

  const handClose = () => {
    showVisible.value = false;
    setTimeout(() => {
      emit('closeModal');
    }, 300);
  };
</script>
<style lang="scss" scoped>
  .log_overlay {
    display: flex;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    .log_left {
      flex: 1;
    }
  }
  .log_overlay.lay_opa {
    opacity: 1;
  }
  .user_log_wrap {
    box-shadow: var(--bs-drawer-box-shadow);
    width: 900px;
    .user_log {
      height: 100%;
      overflow: hidden;
    }
    .user_log_body {
      height: calc(100% - 150px);
      .user_log_content {
        height: 100%;
      }
    }
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .fade-enter-to,
  .fade-leave-from {
    transform: translate3d(0, 0, 0);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-in-out;
  }
</style>
