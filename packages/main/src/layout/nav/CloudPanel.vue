<template>
  <div class="cloud-menu">
    <template v-for="(menu, menuIdx) in menuList" :key="menu.menuCode">
      <el-popover
        :offset="17"
        :show-arrow="false"
        placement="bottom-end"
        trigger="hover"
        popper-class="nav-sub-menu"
      >
        <div class="sub-menu">
          <div
            class="level-2-menu"
            v-for="(submenu, subIdx) in menu.children"
            :key="submenu.menuCode"
          >
            <div class="level-2-item">
              <!-- <i class="iconfont" :class="submenu.icon"></i> -->
              {{ submenu.name }}
            </div>
            <ul class="level-3-menu">
              <li
                class="level-3-item"
                v-for="(level3, level3Idx) in submenu.children"
                :key="level3.menuCode"
                @click="handleToPage(level3.componentName, level3)"
              >
                <div class="collect" v-if="level3?.collectFlag">
                  <el-tooltip content="取消收藏" placement="top">
                    <i
                      class="iconfont"
                      :class="level3?.iconName"
                      @click.stop="handleCollect(level3)"
                    ></i>
                  </el-tooltip>
                </div>
                <div v-else class="uncollected">
                  <el-tooltip content="添加收藏" placement="top">
                    <i
                      class="iconfont"
                      :class="level3?.iconName"
                      @mouseenter="(e) => changeClass(e, 'icon-yishoucang')"
                      @mouseleave="(e) => changeClass(e, 'icon-shoucang')"
                      @click.stop="handleCollect(level3)"
                    ></i>
                  </el-tooltip>
                </div>
                <span class="level-3-name">{{ level3.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <template #reference>
          <div :class="{ 'is-show': isShow }" class="nav-menu__item">
            <svg class="icon-svg" aria-hidden="true">
              <use xlink:href="#icon-CloudIcon" />
            </svg>
          </div>
        </template>
      </el-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from 'element-plus';
  import { memberApi } from '@/api';

  const router = useRouter();
  const isShow = ref(false);
  const handlePopoverShow = () => {
    isShow.value = true;
  };
  const cloudPanelRef = ref();
  // 点击外部关闭popover
  const skip = (path: string) => {
    router.push(path);
    cloudPanelRef.value.hide();
  };
  const store = useStore();
  const generatorMenu = (menuCode: any) => {
    const item = store.getTotalMenus.find((menu) => menu.menuCode === menuCode);
    return {
      icon: item.icon,
      name: item.name,
      menuCode: item.menuCode,
      menuType: item.menuType,
      externalLink: item.menuType === 'url',
      componentName: item.componentName,
      collectFlag: item.collectFlag,
      iconName: item.collectFlag ? 'icon-yishoucang' : 'icon-shoucang',
    };
  };

  const uploadMenuCode = import.meta.env.VITE_UploadMenuCode;
  const downloadMenuCode = import.meta.env.VITE_DownloadMenuCode;
  const menuList = computed(() => [
    {
      menuCode: 'cloudTools',
      name: '云工具',
      icon: 'icon-CloudIcon',
      children: [
        {
          name: '上传下载中心',
          children: [generatorMenu(uploadMenuCode), generatorMenu(downloadMenuCode)],
        },
      ],
    },
  ]);
  const { changeCollectFlag } = store;
  const collectList = computed(() => store.collectList);
  const handleCollect = async (level3) => {
    if (!level3?.collectFlag && collectList.value?.length === 10) {
      ElMessage.warning('最多可收藏10个菜单');
      return;
    }
    const res = await memberApi.luteosMemberSaveOrUpdateMemberCollect({
      collectFlag: level3.collectFlag ^ 1,
      itemCode: level3?.menuCode,
      menuType: level3?.menuType,
      path: level3?.path,
      collectScene: 'menu',
      source: 'lute_erp',
    });
    ElMessage.success(`${level3.collectFlag ? '已取消收藏' : '已收藏'}【${level3?.name}】`);
    // level3.collectFlag ^= 1;
    changeCollectFlag(level3.menuCode);
  };
  const changeClass = (e, className) => {
    e.target.setAttribute('class', `iconfont ${className}`);
  };
  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };
  const handleToPage = (name: string, menu) => {
    report(menu);
    router.push({ name });
  };
</script>

<style scoped lang="scss">
  .cloud-menu {
    .nav-menu__item {
      height: 100%;
      color: #f0f2f5;
      font-weight: 400;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &.active,
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        color: #fff;
        font-weight: 600;
        background: var(---P10, #004d36);
      }
    }
  }
</style>
