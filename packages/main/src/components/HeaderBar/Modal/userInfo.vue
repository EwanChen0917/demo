<template>
  <!-- 基础资料  -->
  <div
    class="app-navbar-item px-lg-3"
    style="padding-right: 0 !important"
    ref="dashRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="cursor-pointer symbol symbol-35px symbol-md-40px">
      <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="user" />
      <div class="letter_wrap" v-else>{{ userInfo.name.slice(0, 1) }}</div>
    </div>
    <div
      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
      data-popper-placement="bottom-start"
      :class="{ show: singOutShow }"
      :style="modalStyle"
    >
      <div class="menu-item px-3">
        <div class="menu-content d-flex align-items-center px-3">
          <div class="symbol symbol-50px me-5">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="user" />
            <div class="letter_wrap" v-else>{{ userInfo.name.slice(0, 1) }}</div>
          </div>
          <div class="d-flex flex-column">
            <div class="fw-bold d-flex align-items-center fs-5">
              {{ userInfo.nickname }}
              <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Root</span>
            </div>
            <div class="fw-semibold text-muted text-hover-primary fs-7">个性签名</div>
          </div>
        </div>
      </div>
      <div class="separator my-2"></div>
      <!-- <div class="menu-item px-5">
        <div class="menu-link px-5 cursor-pointer" @click="toPath(1)">我的信息</div>
      </div> -->
      <div class="menu-item px-5">
        <div class="cursor-pointer menu-link px-5" @click="toPath(2)">
          <span class="menu-text">我的红人</span>
          <!-- <span class="menu-badge">
            <span class="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
          </span> -->
        </div>
      </div>
      <div class="menu-item px-5">
        <div class="menu-link px-5 cursor-pointer" @click="toPath(3)">我的组织</div>
      </div>
      <!-- <div class="menu-item px-5">
        <div class="menu-link px-5 cursor-pointer">我的状态</div>
      </div> -->
      <div class="separator my-2"></div>
      <!-- <div class="menu-item px-5 my-1">
        <div class="menu-link cursor-pointer px-5">Account Settings</div>
      </div> -->
      <div class="menu-item px-5">
        <div class="menu-link px-5 cursor-pointer" @click="outVisible = true">退出系统</div>
      </div>
    </div>
    <EleConfirm
      v-if="outVisible"
      :visible="outVisible"
      confirmTxt="确定退出系统吗？"
      leftBtnTxt="确定"
      rightBtnTxt="取消"
      @close-modal="outModalClose"
    />
  </div>
</template>

<script setup lang="ts">
  import EleConfirm from '@/components/EleConfirm/index.vue';
  import { storeToRefs } from 'pinia';
  import { useStore } from '@/store/modules/useStore';

  const state = reactive<{
    singOutShow: boolean;
    modalStyle: any;
    outVisible: boolean;
  }>({
    singOutShow: false,
    modalStyle: {
      zIndex: '107',
      position: 'fixed',
      inset: '0 0 auto auto',
      margin: '0',
      transform: 'translate(0, 0)',
    },
    outVisible: false,
  });
  const { singOutShow, modalStyle, outVisible } = toRefs(state);

  const userInfoStore = useStore();
  const { logOut } = userInfoStore;
  const { userInfo } = storeToRefs(userInfoStore);

  const dashRef: any = ref();
  const handleMouseEnter = () => {
    const divRect = dashRef.value.getBoundingClientRect();
    const top = parseInt(divRect.bottom);
    const right = parseInt(divRect.right);
    const stance = document.body.clientWidth - right;
    modalStyle.value.transform = `translate(-${stance}px, ${top}px)`;
    singOutShow.value = true;
  };
  const handleMouseLeave = () => {
    singOutShow.value = false;
    modalStyle.value.transform = `translate(0, 0)`;
  };
  const router = useRouter();
  const outModalClose = async (r?: 'reload') => {
    if (r === 'reload') {
      await logOut();
      router.push('/login');
    } else {
      outVisible.value = false;
    }
  };

  const toPath = (type: number) => {
    if (type == 1) {
      router.push('/usermanage');
    } else if (type == 2) {
      router.push({ name: 'square', query: { status: 3 } });
    } else if (type == 3) {
      router.push({ name: 'usermanage', query: { status: 3 } });
    }
  };
</script>

<style lang="scss" scoped>
  .letter_wrap {
    width: 40px;
    height: 40px;
    border-radius: 0.475rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.35rem;
    font-weight: 600;
    background-color: #f4f6fa;
    color: #3e97ff;
  }
</style>
