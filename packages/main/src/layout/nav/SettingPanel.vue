<template>
  <div class="setting-menu" ref="navMenuRef">
    <template v-for="(menu, menuIdx) in menuList" :key="menu.menuCode">
      <template v-if="menu.children?.length">
        <el-popover
          :offset="17"
          :show-arrow="false"
          placement="bottom-end"
          trigger="hover"
          popper-class="nav-sub-menu"
        >
          <div class="sub-menu" :style="getMenuHeight(menu)">
            <div
              class="level-2-menu"
              :class="{
                'no-child': !submenu.children.length,
                'seven-columns': getMenuHeight(menu).sevenColumns,
              }"
              v-for="(submenu, subIdx) in menu.children"
              :key="submenu.menuCode"
            >
              <template v-if="submenu.children.length">
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
              </template>
              <template v-else>
                <div class="level-2-item" @click="handleToPage(submenu.componentName, submenu)">
                  <!-- <i class="iconfont" :class="submenu.icon"></i> -->
                  {{ submenu.name }}
                </div>
              </template>
            </div>
          </div>
          <template #reference>
            <div :class="{ 'is-show': getActiveTopMenu(menu.children) }" class="nav-menu__item">
              <i class="iconfont icon-ERPxitongshezhi"></i>
            </div>
          </template>
        </el-popover>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { routeMap } from '@/router';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';

  const store = useStore();
  const { changeCollectFlag } = store;
  const router = useRouter();
  const route = useRoute();
  const settingMenuCode = import.meta.env.VITE_SettingMenuCode;
  const menuList = computed(() => {
    const filterMenus = (menus: any[]) => {
      return menus
        ?.filter(
          (item) => ['menu', 'url', 'iframe'].includes(item.menuType) && item.name !== '默认'
        )
        ?.map((item) => {
          let path = '';
          if (item.menuType === 'url') {
            path = item.redirect;
          } else if (item.menuType === 'iframe') {
            path =
              item.componentName && item.componentName !== 'frame'
                ? routeMap[item.componentName]?.path.replace(
                    /:frameUrl$/,
                    encryptByBase64(item.redirect)
                  )
                : `/frame/${item.menuCode}/${encryptByBase64(item.redirect)}`;
          } else {
            path = item.componentName ? routeMap[item.componentName]?.path : '';
          }
          return {
            icon: item.icon,
            name: item.name,
            menuCode: item.menuCode,
            menuType: item.menuType,
            externalLink: item.menuType === 'url',
            path,
            componentName: item.componentName,
            collectFlag: item.collectFlag,
            iconName: item.collectFlag ? 'icon-yishoucang' : 'icon-shoucang',
            activeMenu: item.componentName ? routeMap[item.componentName]?.activeMenu : '',
            children: filterMenus(item?.children),
          };
        });
    };
    return filterMenus([store.getTotalMenus.find((item) => item.menuCode === settingMenuCode)]);
  });
  const collectList = computed(() => store.collectList);

  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };

  const handleToPage = (name: string, menu) => {
    report(menu);
    if (menu.menuType === 'iframe') {
      router.push(menu.path);
    } else if (menu.menuType === 'url') {
      openWindow(menu.path);
    } else if (
      menu.children?.length &&
      menu.children[0]?.children?.length &&
      !menu.componentName?.includes('app:')
    ) {
      const childrenPath = menu.children[0]?.children[0]?.path;
      childrenPath && router.push(childrenPath);
    } else {
      router.push({ name });
    }
  };
  const getActiveTopMenu = (m: any) => {
    const findMenu = (menus, key: string, target: string) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const menu of menus) {
        if (menu[key] === target) {
          return menu;
        }
        if (menu.children) {
          const found = findMenu(menu.children, key, target);
          if (found) {
            return menu;
          }
        }
      }
      return null;
    };
    const menuCode = route.params.menuCode as string;
    const activeMenu = findMenu(
      m,
      ...(menuCode
        ? (['menuCode', menuCode] as [string, string])
        : (['componentName', route.name] as [string, string]))
    );
    return activeMenu;
  };

  // 计算menu高度
  interface MenuItem {
    children?: MenuItem[];
  }

  const ITEM_PARENT_HEIGHT = 56; // 32 + 24
  const ITEM_CHILD_HEIGHT = 32;
  const MAX_MENU_HEIGHT = 376;

  const getMenuHeight = (menu: MenuItem) => {
    let totalHeight = 0;
    let maxChildGroupHeight = 0;
    const childGroupHeights: number[] = [];

    const parentHeight = (menu.children?.length ?? 0) * ITEM_PARENT_HEIGHT;
    totalHeight += parentHeight;

    menu.children?.forEach((item) => {
      if (Array.isArray(item.children)) {
        const childCount = item.children.length;
        const groupHeight = childCount * ITEM_CHILD_HEIGHT + ITEM_PARENT_HEIGHT;

        totalHeight += childCount * ITEM_CHILD_HEIGHT;
        childGroupHeights.push(groupHeight);
        maxChildGroupHeight = Math.max(maxChildGroupHeight, groupHeight);
      }
    });

    let accumulatedHeight = 0; // 从上往下布局，尽可能的铺满376px的高度,计算首列的高度
    // eslint-disable-next-line no-restricted-syntax
    for (const height of childGroupHeights) {
      if (accumulatedHeight + height > MAX_MENU_HEIGHT) {
        break;
      }
      accumulatedHeight += height;
    }
    let actualHeight = maxChildGroupHeight;
    // 总高度不超过376px，则返回总高度
    if (totalHeight < MAX_MENU_HEIGHT) {
      actualHeight = totalHeight;
    } else if (accumulatedHeight > maxChildGroupHeight) {
      // 首列超过最高列, 则返回首列的高度
      actualHeight = accumulatedHeight;
    }
    // 计算实际列数, 超过7列则固定7列
    let actualColumns = 1;
    childGroupHeights.reduce((acc, height) => {
      if (acc + height > actualHeight) {
        actualColumns += 1;
        return height;
      }
      return acc + height;
    });
    if (actualColumns > 7) {
      return {
        display: 'block',
        columnCount: 7,
        columnGap: '4px',
        writingMode: 'unset',
        sevenColumns: true,
      };
    }
    return {
      // 去掉列的最后一个24
      height: `${actualHeight - 24}px`,
      sevenColumns: false,
    };
  };

  // 收藏、取消收藏
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
</script>

<style scoped lang="scss">
  .setting-menu {
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
