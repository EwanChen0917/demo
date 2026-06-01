<template>
  <div class="left-menu" v-if="!menuCollapse">
    <div class="btn-collapse" @click="menuCollapse = !menuCollapse">
      <span class="btn-icon"><i class="Root-tyicon icon-Root-tyshouqi"></i></span>
    </div>
    <div class="menu-list">
      <template v-for="(menu, menuIndex) in menuList" :key="menuIndex">
        <div
          class="level-4-menu"
          v-for="submenu in getChildren(menu)"
          :key="submenu.menuCode"
          :class="{ 'no-child': !getChildren(submenu)?.length }"
        >
          <template v-if="getChildren(submenu)?.length">
            <div class="level-4-item">
              <i class="iconfont" :class="submenu.icon"></i>
              {{ submenu.name }}
            </div>
            <ul class="level-5-menu">
              <li
                class="level-5-item"
                v-for="level5 in getChildren(submenu)"
                :key="level5.menuCode"
                :class="{
                  'item-active':
                    level5.componentName == activeMenu?.name &&
                    (activeMenu?.name === 'frame' ? level5.redirect === activeMenu.frameUrl : true),
                }"
                @click="handleToPage(level5.componentName, level5)"
              >
                <span class="level-name">{{ level5.name }}</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="level-4-item" @click="handleToPage(submenu.componentName, submenu)">
              {{ submenu.name }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
  <div v-if="menuCollapse" class="fixed-menu" @click="menuCollapse = !menuCollapse">
    <span><i class="Root-tyicon icon-Root-tyzhankai-1"></i></span>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { memberApi } from '@/api';

  const props = withDefaults(defineProps<{ activeMenu: any, getMenus: () => Promise<any> }>(), {
    getMenus: () => {
      return []
    },
    activeMenu: () => ({}),
  });

  const emit = defineEmits<{
    (e: 'change', value: any): void;
  }>();

  const route = useRoute();
  const store = useStore();

  const nativeMenus = ref([]);
  const erpNativeMenus = store.nativeMenus;

  // console.log("erpNativeMenus=", erpNativeMenus)

  let menuPromise = props.getMenus().then((tree) => {
    nativeMenus.value = tree;
  })

  const menuCollapse = ref(false);

  const getChildren = (node) => {
    if (node.originChildren?.length) {
      return node.originChildren;
    }
    return node.children || [];
  };

  const currentErpMenu = computed(() => {
    const match = route.matched?.at(-1);
    const name = match?.name;
    // console.log("name=", name, erpNativeMenus)
    if (!name) {
      return null;
    }
    const walkChildren = (children) => {
      if (!children?.length) {
        return null;
      }
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        if (name === item.componentName) {
          return item;
        }
        const children2 = getChildren(item);
        if (children2?.length) {
          const result = walkChildren(children2);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };
    return walkChildren(erpNativeMenus);
  })

  const currentMenuRoot = computed(() => {
    // console.log("route=", route)
    const match = route.matched?.at(-1);
    // console.log("match=", match)
    if (!match?.meta?.targets?.length) {
      return null;
    }

    const walkChildren = (children) => {
      if (!children?.length) {
        return null;
      }
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        // console.log("match?.meta?.title=", match?.meta?.title, item.name)
        if (match.meta.targets.includes(item.name) || currentErpMenu.value?.shortName && item.name === currentErpMenu.value?.shortName) {
          return item;
        }
        const children2 = getChildren(item);
        if (children2?.length) {
          const result = walkChildren(children2);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };
    return walkChildren(nativeMenus.value);
  });
  const menuList = computed(() => {
    return [currentMenuRoot.value].filter(x=>x);
  });

  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };

  const handleToPage = (name: string, menu: any) => {
    report(menu);
    emit('change', menu);
  };

  const getFirstMenu = async () => {
    await menuPromise;
    const walkChildren = (node) => {
      if (node.componentName) {
        return node;
      }
      const children = getChildren(node);
      if (children?.length) {
        for (let i = 0; i < children.length; i++) {
          const value = walkChildren(children[i]);
          if (value) {
            return value;
          }
        }
      } else {
        return node;
      }
    };
    for (let i = 0; i < menuList.value.length; i++) {
      const value = walkChildren(menuList.value[i]);
      if (value) {
        return value;
      }
    }
  };

  defineExpose({
    getFirstMenu,
  });
</script>

<style scoped lang="scss">
  .left-menu {
    width: 180px;
    min-width: 180px;
    height: 100%;
    // padding: 8px 8px 0;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    flex-wrap: wrap;
    align-content: flex-start;
    border-right: 1px solid var(---N3, #ededed);
    position: relative;

    .menu-list {
      padding: 8px;
      padding-top: 0;
      width: 180px;
      height: calc(100% - 44px);
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #fff;
    }

    .level-4-menu {
      break-inside: avoid;
      writing-mode: horizontal-tb;
      // padding-top: 14px;
      margin-bottom: 8px;

      .level-4-item {
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        height: 28px;
        display: flex;
        align-items: center;
        padding: 4px 8px;
        color: #8A9099;
        display: flex;
        align-items: center;
      }

      &.no-child {
        // padding-bottom: 0;
        // .level-4-item {
        //   padding-left: 40px;
        //   padding-right: 12px;
        //   display: flex;
        //   align-items: center;
        //   cursor: pointer;
        //   min-height: 32px;
        //   justify-content: space-between;
        //   color: #1f1f1f;
        //   font-weight: 400;
        //   font-size: 13px;
        //   line-height: 22px;
        //   &:hover {
        //     // background-color: #edfaf4;
        //   }
        //   .collect {
        //     display: none;
        //     opacity: 0;
        //     color: #999;
        //   }
        // }
      }

      .level-5-menu {
        margin: 0;
        color: #1e2226;
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        padding: 0;

        .level-5-item {
          padding: 4px 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
          // min-height: 32px;
          justify-content: space-between;
          border-radius: 4px;

          .level-name {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 20px;
          }

          .icon-yishoucang {
            color: #ff9f22;
          }

          &:hover {
            background-color: #f5f7fa;
          }

          &:active,
          &.item-active {
            background-color: #edfaf4;
            color: var(--el-color-primary);
          }
        }
      }
    }

    .btn-collapse {
      width: 180px;
      height: 44px;
      padding: 8px;
      background-color: #fff;
      padding-left: 15px;

      .btn-icon {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        color: #262626;
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }

  .fixed-menu {
    width: 44px;
    padding: 8px;
    padding-top: 9px;
    background-color: #fff;
    border-right: 1px solid #dfe2e6;
    display: flex;

    > span {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #262626;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
</style>
