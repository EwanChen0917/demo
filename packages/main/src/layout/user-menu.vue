<template>
  <el-popover
    popper-class="nav-user-popover-wrapper"
    placement="bottom-end"
    width="290px"
    trigger="hover"
    :offset="18"
    :show-arrow="false"
  >
    <div class="nav-user-popover">
      <div class="nav-user-popover-content">
        <div class="user-info">
          <!-- <el-avatar
            icon="el-icon-user-solid"
            shape="circle"
            :src="(store.userInfo.avatar as string)"
            fit="fill"
          /> -->
          <el-avatar
            v-if="store.userInfo.avatar"
            style="cursor: pointer; width: 46px; height: 46px"
            icon="el-icon-user-solid"
            shape="circle"
            :src="(store.userInfo.avatar as string)"
            fit="fill"
          />
          <el-avatar
            v-else
            style="
              color: #fff;
              background-color: #02b96b;
              width: 46px;
              height: 46px;
              font-size: 18px;
            "
            :style="{
              backgroundColor: store.userInfo.superAdminInRoleManagerMenu ? '#1E6FFF' : '#02b96b',
            }"
          >
            {{ store.userInfo.name.slice(0, 1) }}
          </el-avatar>
          <div class="name-email">
            <div class="user-name">
              <span>{{ store.userInfo?.nickname || store.userInfo?.name }}</span>
              <span class="company-tag">{{ store.userInfo?.title }}</span>
            </div>
            <div class="user-email">{{ store.userInfo?.email }}</div>
          </div>
        </div>

        <el-divider class="nav-user-popover-split" />
        <!-- <router-link style="color: inherit" to="/myEvents" v-permission="'myEvents'">
          <div class="user-menu-item">
            <i class="iconfont icon-wodeshixiang"></i>
            我的事项
          </div>
        </router-link>
        <router-link style="color: inherit" to="/usermanage" v-permission="'usermanage'">
          <div class="user-menu-item">
            <i class="iconfont icon-wodezuzhi"></i>
            我的组织
          </div>
        </router-link>
        <router-link style="color: inherit" to="/myworkorder" v-permission="'myworkorder'">
          <div class="user-menu-item">
            <i class="iconfont icon-wodegongdan"></i>
            我的工单
          </div>
        </router-link>
        <router-link style="color: inherit" to="/userInfo" v-permission="'userInfo'">
          <div class="user-menu-item">
            <i class="iconfont icon-zhanghaoxinxi"></i>
            账号信息
          </div>
        </router-link> -->
        <el-divider class="nav-user-popover-split" />
        <div class="user-menu-item logout" @click="handleLogout">
          <i class="iconfont icon-tuichuxitong"></i>
          退出系统
        </div>
      </div>
    </div>
    <template #reference>
      <div class="user-popover-reference">
        <el-avatar
          v-if="store.userInfo.avatar"
          style="cursor: pointer; width: 28px; height: 28px"
          icon="el-icon-user-solid"
          shape="circle"
          :src="(store.userInfo.avatar as string)"
          fit="fill"
        />
        <el-avatar style="color: #aaa; width: 28px; height: 28px" v-else>
          {{ store.userInfo.name.slice(0, 1) }}
        </el-avatar>
        <i class="iconfont icon-sanjiaojiantouxiangxia"></i>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import * as swal from '@/utils/swal';

  const store = useStore();

  const handleLogout = async () => {
    const confirm = await swal.confirm({
      title: '确定退出系统吗？',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (confirm) {
      await store.logOut();
      window.location.reload();
    }
  };
</script>

<style scoped lang="scss">
  .nav-user-popover {
    .nav-user-popover-split {
      margin: 6px 0;
      border-color: #f4f4f4;
    }

    .user-info {
      padding: 20px 0 14px;
      display: flex;
      gap: 16px;
      .name-email {
        .user-name {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 2px;
          .company-tag {
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #02b96b;
            padding: 3px 8px;
            border-radius: 13px;
            margin-left: 8px;
            background-color: #e8fff1;
          }
        }
        .user-email {
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #999;
        }
      }
    }

    .user-menu-item {
      margin: 0 -12px;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      color: #1f1f1f;
      display: flex;
      align-items: center;
      gap: 10px;
      i {
        font-size: 16px;
      }
      &:hover {
        color: #3e97ff;
        background-color: #f4f6fa;
      }
      &.logout {
        color: #999;
      }
    }
  }

  .user-popover-reference {
    display: flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    i {
      font-size: 18px;
      color: #c5c5c5;
    }
  }
</style>

<style>
  .el-popover.el-popper.nav-user-popover-wrapper {
    border-radius: 10px;
    border: 1px solid #ededed;
    padding: 6px 24px;
  }
</style>
