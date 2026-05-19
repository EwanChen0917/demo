<template>
  <div class="tabs-container" :class="{ isMenuCollapse: menuCollapse }">
    <div class="left" ref="contentRef">
      <div :class="contentClass">
        <div
          v-for="(tab, i) in tabsView"
          :key="tab.key"
          ref="tabRef"
          :class="[
            {
              'is-active': tab.key === active,
              draggable: !tab.affixTab,
              'affix-tab': tab.affixTab,
            },
          ]"
          :data-active-tab="active"
          :data-index="i"
          class="tab-item group"
          data-tab-item="true"
          @click="handleTabClick(tab)"
        >
          <el-popover
            :ref="setRef"
            :popper-style="{
              width: 'auto',
              minWidth: 'unset',
              borderRadius: '10px',
              padding: '4px 0',
            }"
            trigger="contextmenu"
            placement="right-end"
            :offset="0"
            :show-arrow="false"
          >
            <template #default>
              <div
                class="content-menu-item"
                :class="{ disabled: item?.disabled }"
                v-for="item in contextMenus?.(tab)?.filter((k) => !k?.disabled)"
                :key="item?.key"
                @click="handleClick(item, tab)"
              >
                {{ item?.text }}
              </div>
            </template>
            <template #reference>
              <div>
                <div class="tab-item-title">{{ tab.title }}</div>
                <div class="close" v-if="!tab.affixTab" @click.stop="() => emit('close', tab.key)">
                  <i class="iconfont icon-guanbi"></i>
                </div>
                <i
                  v-else-if="!['personalCenter'].includes(tab?.name)"
                  class="iconfont icon-dading"
                  @click.stop="() => emit('unpin', tab)"
                ></i>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
      <el-popover
        ref="collectRef"
        :popper-style="{
          border: 'none',
          borderRadius: '10px',
          padding: '20px 10px',
        }"
        :offset="5"
        trigger="click"
        placement="bottom"
        :show-arrow="false"
      >
        <template #default>
          <div style="width: 220px">
            <div class="collect-header">
              <span class="title">我的收藏</span>
              <span class="count">已添加 {{ collectList?.length || 0 }}/10</span>
            </div>
            <div class="collect-list" v-if="collectList?.length">
              <div
                class="collect-item"
                v-for="item in collectList"
                :key="item?.itemCode"
                @click="toPage(item)"
              >
                <div class="collect-item-title">
                  <OverflowTooltip :content="item?.itemName" :line="1" />
                </div>
                <el-tooltip content="取消收藏" placement="top">
                  <i class="iconfont icon-yishoucang" @click.stop="handleCollect(item)"></i>
                </el-tooltip>
              </div>
            </div>
            <div v-else class="collect-empty">
              <EmptyAnimation name="emptyInfo" :width="128" :height="128" :loop="false" />
              暂未收藏常用功能菜单
            </div>
          </div>
        </template>
        <template #reference>
          <div class="icon">
            <i class="iconfont icon-tianjia"></i>
          </div>
        </template>
      </el-popover>
      <!--      <div class="tabs-more">-->
      <el-popover
        v-if="moreTabs?.length"
        :popper-style="{ borderRadius: '10px', padding: '4px 10px' }"
        :offset="5"
        trigger="click"
        :show-arrow="false"
      >
        <template #default>
          <div class="more-list">
            <div
              class="more-item"
              v-for="(tab, i) in moreTabs"
              :key="tab.key"
              @click="handleTabClick(tab)"
            >
              <div>{{ tab.title }}</div>
              <div class="close" v-if="!tab.affixTab" @click.stop="() => emit('close', tab.key)">
                <i class="iconfont icon-guanbi"></i>
              </div>
            </div>
          </div>
        </template>
        <template #reference>
          <div class="icon">
            <i class="iconfont icon-sanjiaojiantouxiangxia"></i>
          </div>
        </template>
      </el-popover>
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { RouteLocationNormalized } from 'vue-router';

  import { computed, ref } from 'vue';

  import { useTabbarStore } from '@/store/modules/useTabbar';
  import { useTabsDrag } from '@/hooks/tabs/use-tabs-drag';
  import { useStore } from '@/store/modules/useStore';
  import { memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';

  type TabDefinition = RouteLocationNormalized;

  const props = withDefaults(
    defineProps<{
      contentClass: string;
      contextMenus?: any[];
      tabs: TabDefinition[];
    }>(),
    {
      contextMenus: () => [],
      tabs: () => [],
    }
  );

  const emit = defineEmits<{
    close: [string];
    sortTabs: [number, number];
    unpin: [TabDefinition];
  }>();
  const active = defineModel<string>('active');

  const router = useRouter();
  const store = useStore();
  const collectList = computed(() => store.collectList);
  const menuCollapse = computed(() => store.menuCollapse);

  const contentRef = ref();
  const tabRef = ref();

  const tabbarStore = useTabbarStore();

  // 计算可容纳最大tab数量
  const maxIndex = ref();
  const getMaxIndex = () => {
    const tabs = document.createElement('div');
    tabs.setAttribute('style', 'display: flex;width: max-content');
    tabs.setAttribute('class', 'getWidth');
    for (let i = 0; i < props.tabs.length; i++) {
      const tab = document.createElement('div');
      tab.setAttribute(
        'style',
        'width: max-content;min-width: 120px;padding-left: 16px;padding-right: 32px; '
      );
      const title = document.createElement('div');
      title.setAttribute('style', 'font-size: 13px;');
      title.innerText = props.tabs[i].meta.title;
      tab.appendChild(title);
      tabs.appendChild(tab);
      document.querySelector('body').appendChild(tabs);
      const currentWidth = document.querySelector('.getWidth')?.offsetWidth;
      document.querySelector('.getWidth').remove();

      if (currentWidth > contentRef.value?.offsetWidth - 80) {
        maxIndex.value = i - 1;
        tabbarStore.setMaxIndex(i - 1);
        tabbarStore.updateCurrentTabPosition(active.value);
        break;
      } else {
        maxIndex.value = i;
        tabbarStore.setMaxIndex(i);
      }
    }
  };

  watch(
    () => [props.tabs, store.menuCollapse],
    async () => {
      await nextTick();
      getMaxIndex();
    }
  );

  const tabsView = computed(() => {
    return props.tabs
      ?.filter((_, index) => index <= maxIndex.value)
      ?.map((tab) => {
        const { fullPath, meta, name, path } = tab || {};
        const { affixTab, icon, newTabTitle, tabClosable, title } = meta || {};
        return {
          affixTab: !!affixTab,
          closable: Reflect.has(meta, 'tabClosable') ? !!tabClosable : true,
          fullPath,
          icon: icon as string,
          key: fullPath || path,
          meta,
          name,
          path,
          title: (newTabTitle || title || name) as string,
        };
      });
  });

  const moreTabs = computed(() => {
    return props.tabs
      ?.filter((_, index) => index > maxIndex.value)
      ?.map((tab) => {
        const { fullPath, meta, name, path } = tab || {};
        const { affixTab, icon, newTabTitle, tabClosable, title } = meta || {};
        return {
          affixTab: !!affixTab,
          closable: Reflect.has(meta, 'tabClosable') ? !!tabClosable : true,
          fullPath,
          icon: icon as string,
          key: fullPath || path,
          meta,
          name,
          path,
          title: (newTabTitle || title || name) as string,
        };
      });
  });

  const popoverRefs = ref([]);
  const setRef = (el: any) => {
    if (el) {
      popoverRefs.value.push(el);
    }
  };

  const hideAllPopovers = () => {
    popoverRefs.value.forEach((popover: any) => {
      popover?.hide(); // 关闭菜单
    });
  };

  const handleClick = (menu, tab) => {
    if (menu.disabled) {
      return;
    }
    menu?.handler?.(tab);
  };

  // tab点击处理
  const handleTabClick = (tab) => {
    // 切换当前活动tab
    active.value = tab.key;
    // 上报菜单访问
    reportMenuVisit(tab);
  };

  // 上报菜单访问
  const reportMenuVisit = (tab) => {
    let menuCode = '';

    if (tab?.name === 'frame') {
      // iframe菜单，从路径中解析menuCode
      // 路径格式：/frame/menuCode/frameUrl
      const [, , menuCodeFromPath] = tab.key.split('/');
      if (menuCodeFromPath) {
        menuCode = menuCodeFromPath;
      }
    } else if (store.menuCodeMap?.[tab?.name]) {
      // 普通菜单，从映射表获取menuCode
      menuCode = store.menuCodeMap[tab.name];
    }

    if (menuCode) {
      memberApi.luteosMemberSaveMenuVisit({
        menuCode,
      });
    }
  };

  // 收藏、取消收藏
  const handleCollect = async (item) => {
    const res = await memberApi.luteosMemberSaveOrUpdateMemberCollect({
      collectFlag: 0,
      itemCode: item?.itemCode,
      menuType: item?.menuType,
      path: item?.path,
      collectScene: 'menu',
      source: 'lute_erp',
    });
    ElMessage.success(`已取消收藏【${item?.itemName}】`);
    store.getMenus();
    store.getCollectList();
  };

  const collectRef = ref();

  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.itemCode,
    });
  };

  const toPage = (item) => {
    report(item);
    if (item.menuType === 'iframe') {
      router.push(item?.path);
    } else if (item.menuType === 'url') {
      openWindow(item?.path);
    } else {
      router.push({ name: item?.componentName });
    }
    collectRef.value?.hide();
  };

  onMounted(() => {
    document.addEventListener('click', hideAllPopovers);
    document.addEventListener('contextmenu', hideAllPopovers);
    window.addEventListener('resize', getMaxIndex);
    getMaxIndex();
  });

  useTabsDrag(props, emit);
</script>

<style scoped lang="scss">
  .tabs-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #e9ecf0;

    .left {
      width: 100%;
      padding-top: 4px;
      display: flex;
      align-items: center;

      .iconfont,
      .Root-tyicon {
        cursor: pointer;
      }

      .icon {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        margin-left: 16px;
        padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background: #ffffff;
        }

        .icon-tianjia {
          color: #666666;
        }
      }
    }

    .tabs-content {
      //height: 36px;
      display: flex;
      align-items: end;

      .tab-item {
        width: max-content;
        min-width: 120px;
        height: 32px;
        padding-left: 16px;
        padding-right: 32px;
        position: relative;
        cursor: pointer;
        border-top: transparent 1px solid;

        &:first-child {
          text-align: center;
          padding: 0;
        }

        &-title {
          color: #666666;
          font-family: 'PingFang SC';
          font-size: 12px;
          line-height: 32px;
        }

        &:not(.is-active) + .tab-item:not(.is-active)::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 1px;
          height: 14px;
          background: #dedede;
        }

        &:not(.is-active):last-child::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 1px;
          height: 14px;
          background: #dedede;
        }

        &:hover {
          .close {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .close {
          display: none;
          position: absolute;
          width: 16px;
          height: 16px;
          padding: 3px;
          right: 10px;
          bottom: 7px;
          color: #666666;
          border-radius: 4px;

          .icon-guanbi {
            font-size: 12px;
          }

          &:hover {
            //background: #f5f5f5;
            background: #f5f5f5;
          }
        }

        .icon-dading {
          position: absolute;
          font-size: 12px;
          color: #666666;
          height: 12px;
          right: 12px;
          bottom: 12px;

          &:hover {
            color: #02b96b;
          }
        }
      }

      .is-active {
        border: #ededed 1px solid;
        border-bottom: 0;
        border-radius: 6px 6px 0 0;
        background: #ffffff;

        .tab-item-title {
          font-family: 'PingFang SC Medium';
          //font-weight: 600;
          color: #02b96b;
        }

        .close {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .iconfont,
    .Root-tyicon {
      cursor: pointer;
    }
  }

  .isMenuCollapse {
    background: unset;

    .left {
      padding-top: 6px;

      .icon {
        &:hover {
          background: #ffffff1a;
        }

        .icon-tianjia {
          color: #ffffff;
        }
      }
    }

    .tabs-content {
      //height: 38px;
      align-items: end;
      border-bottom: unset;

      .tab-item {
        &-title {
          color: #c5c5c5;
        }

        &:not(.is-active) + .tab-item:not(.is-active)::before {
          background: #666666;
        }

        &:last-child:not(.is-active)::after {
          background: #666666;
        }

        .close {
          color: #c5c5c5;
        }

        &:hover {
          .close {
            color: #c5c5c5;
          }
        }

        .icon-dading {
          color: #c5c5c5;
        }
      }

      .is-active {
        .tab-item-title,
        .icon-dading {
          color: #1f1f1f;
        }

        &:hover {
          .close {
            color: #666666;
          }
        }
      }
    }

    .icon-sanjiaojiantouxiangxia {
      color: #c5c5c5;
    }
  }

  .content-menu-item {
    padding: 0 12px;
    line-height: 32px;
    font-size: 13px;
    color: #1f1f1f;
    font-family: 'PingFang SC';
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }

  .more-list {
    width: 240px;
    max-height: 328px;
    overflow-y: auto;

    .more-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      padding: 0 10px;
      line-height: 32px;
      border-radius: 6px;
      font-size: 13px;
      color: #1f1f1f;
      font-family: 'PingFang SC';
      cursor: pointer;

      .close {
        display: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;

        &:hover {
          background: #dedede;
        }

        .icon-guanbi {
          font-size: 13px;
          color: #666666;
        }
      }

      &:hover {
        background: #f5f5f5;

        .close {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .disabled {
    color: #999999;
    cursor: default;
  }

  .collect-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 10px;

    .title {
      font-family: 'PingFang SC Medium';
      font-weight: 500;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 22px;
    }

    .count {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #999999;
    }
  }

  .collect-list {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 4px;

    .collect-item {
      width: 105px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 8px 5px 10px;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }

      &-title {
        width: 65px;
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 13px;
        color: #1f1f1f;
      }

      .icon-yishoucang {
        color: #ff9f22;
      }
    }
  }

  .collect-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 16px;
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #999999;
  }
</style>
