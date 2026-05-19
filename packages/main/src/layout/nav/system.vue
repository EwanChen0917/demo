<template>
  <el-popover
    popper-class="nav-system-popover"
    placement="bottom"
    :offset="15"
    :show-arrow="false"
    trigger="click"
    ref="sysPopRef"
    @show="handlePopoverShow"
  >
    <div class="system-container">
      <div class="nav-model-list" @click.stop v-if="anchorList.length">
        <ul class="bean-list">
          <li
            v-for="anchor in anchorList"
            :key="anchor.key"
            :class="{ active: activeAnchor === anchor.key }"
            class="anchor-item"
            @click="scrollToAnchor(anchor.key)"
          >
            {{ anchor.name }}
          </li>
        </ul>
      </div>
      <div
        class="system-content"
        ref="subToolRef"
        @scroll="handleSubMenuScroll"
        @scrollend="handleScrollEnd"
      >
        <div class="userinfo">
          <div class="avatar">
            <img :src="urlSource" />
          </div>
          <div class="text">
            <div class="name">Hello，{{ userInfo?.name }}！</div>
            <span class="tip-text">欢迎来到路特数字化中心!</span>
            <div class="tip">
              <div class="tip-description">
                <span>若需要开通某些权限，需要点击</span>
                <span class="tip-link" @click="handleApplyPermission">
                  申请权限
                  <span class="iconfont icon-jiantouxiangyou" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="tool-list">
          <el-input
            placeholder="搜索"
            v-model="searchToolValue"
            :suffix-icon="Search"
            @input="handleInputChange"
            @change="handleInputChange"
          />
          <div class="tool-commercial" v-for="item in commercialList" :key="item.model">
            <span class="tool-title">{{ item.name }}</span>
            <div class="red-bg" v-for="tool in item.systemNavList" :key="tool.materialName">
              <a :href="tool.jumpUrl" target="_blank" rel="noopener noreferrer">
                <div class="system-icon" v-if="tool.materialImage">
                  <img :src="tool.materialImage" alt="" />
                </div>
                <div class="system-name" :class="tool.class">
                  <span class="material-name">{{ tool.materialName }}</span>
                  <span class="material-desc">{{ tool.materialDesc }}</span>
                  <span class="material-desc1">
                    {{ tool.materialDesc1 }}
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div
            class="tool-item"
            :id="`anchor-${item.model}`"
            v-for="item in filterSystemList"
            :key="item.model"
          >
            <span class="tool-title">{{ item.name }}</span>
            <template v-for="tool in item.systemNavList" :key="tool.materialName">
              <div v-if="!hideMaterialNameList.includes(tool.materialName)" class="tool-box">
                <a :href="tool.jumpUrl" target="_blank" rel="noopener noreferrer">
                  <div class="system-icon" v-if="tool.materialImage">
                    <img :src="tool.materialImage" alt="" />
                  </div>
                  <div class="system-name" :class="tool.class">
                    <span class="material-name">{{ tool.materialName }}</span>
                    <span class="material-desc">{{ tool.materialDesc }}</span>
                  </div>
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <template #reference>
      <div @click="btnReport">
        <el-tooltip
          popper-class="nav-tooltip"
          effect="light"
          content="系统切换"
          placement="bottom"
          :offset="22"
        >
          <i ref="iconRef" class="system-tag Root-tyicon icon-Root-tyxitongguanli"></i>
        </el-tooltip>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { debounce } from 'lodash-es';
  import { useStore } from '@/store/modules/useStore';
  import momcozyApp from '@/layout/images/momcozy-app.png';
  import { Search } from '@element-plus/icons-vue';
  import { memberApi, personalCenterApi } from '@/api';
  import { isEmpty } from 'lodash-es';
  const { getInfo } = useStore();
  const userInfo = getInfo;
  import router from '@/router';

  const store = useStore();
  const route = useRoute();
  const searchToolValue = ref('');

  const urlSource = computed(() => {
    if (isEmpty(userInfo?.avatar)) {
      return 'https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/C00000001/temp/Group%201896.png';
    }
    return userInfo?.avatar;
  });

  const hideMaterialNameList = ['营销工具', 'Questel'];

  // 路特商业化
  const commercialList = [
    {
      name: '路特商业化',
      model: 'commercial',
      systemNavList: [
        {
          materialName: 'momcozy',
          materialDesc: '全球最值得信赖的母婴科技生态品牌',
          materialDesc1: '为妈妈与家庭创造长期信任、温暖的产品与体验',
          jumpUrl: 'https://momcozy.com/',
          class: 'commercial-momcozy',
        },
        {
          materialName: 'Momcozy APP',
          materialDesc: '全球最值得信赖的母婴科技生态品牌',
          materialDesc1: '为妈妈与家庭创造长期信任、温暖的产品与体验',
          jumpUrl: 'https://apps.apple.com/cn/app/momcozy/id6473000053',
          materialImage: momcozyApp,
          class: 'commercial-momcozy-app',
        },
      ],
    },
  ];

  // 系统设置
  const sysPopRef = ref();
  const systemList = ref<any[]>([]);
  const filterSystemList = ref<any[]>([]);
  const init = async () => {
    const param: any = {};
    param.scene = 'common_sysnav';
    const systemRes = await personalCenterApi.luteosMemberQueryAllSysTemList(param);
    if (systemRes) {
      if (systemRes.navModelBeanList && systemRes.navModelBeanList.length > 0) {
        const list = systemRes.navModelBeanList
          .map((item) => {
            const filteredNavList = (item.systemNavList || []).filter(
              (tool) => !hideMaterialNameList.includes(tool.materialName)
            );
            return {
              ...item,
              systemNavList: filteredNavList,
            };
          })
          .filter((item) => item.systemNavList.length > 0);
        systemList.value = list;
        filterSystemList.value = list;
      } else {
        systemList.value = [];
        filterSystemList.value = [];
      }
    }
  };
  init();

  const subToolRef = ref<HTMLDivElement | null>(null);

  const subMenuScrollTop = ref(0);
  const activeAnchor = ref('all');
  const anchorList = computed(() => {
    const anchors = [{ key: 'all', name: '全部工具' }];
    filterSystemList.value?.forEach((menu) => {
      anchors.push({
        key: menu.model,
        name: menu.name,
      });
    });
    return anchors;
  });

  const handlePopoverShow = () => {
    // 每次打开菜单都重新计算锚点位置，适配内容变化和窗口大小变化的情况
    initMenuTopList.value = [];
    searchToolValue.value = '';
    filterSystemList.value = systemList.value;
    nextTick(() => {
      initMenuTop();
      subToolRef.value?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  };

  let initMenuTopList = ref<Array<{ id: string; offsetTop: number }>>([]);
  const initMenuTop = () => {
    const tools = subToolRef.value?.querySelectorAll('.tool-item');
    // 遍历所有菜单，判断当前滚动位置对应的锚点
    tools?.forEach((menu: HTMLElement) => {
      console.log('menu.offsetTop', menu.offsetTop);
      initMenuTopList.value.push({
        id: menu.id,
        offsetTop: menu.offsetTop - 10,
      });
    });
  };

  let clickIndex;
  let isClick = false;
  const handleScrollEnd = () => {
    if (isClick) {
      isClick = false;
      activeAnchor.value = clickIndex;
    }
  };

  // 监听菜单滚动事件
  const handleSubMenuScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    subMenuScrollTop.value = target.scrollTop;
    calculateActiveAnchor();
  };

  // 活跃瞄点动态更新
  const calculateActiveAnchor = () => {
    if (!subToolRef.value || subMenuScrollTop.value === 0) {
      activeAnchor.value = 'all';
      return;
    }
    let currentAnchorKey = activeAnchor.value;
    initMenuTopList.value.forEach((menu: any) => {
      if (subMenuScrollTop.value >= menu.offsetTop) {
        const menuCode = menu.id.replace('anchor-', '');
        currentAnchorKey = menuCode;
      }
    });
    !isClick && (activeAnchor.value = currentAnchorKey);
  };

  // 点击锚点滚动到对应位置
  const scrollToAnchor = (anchorKey: string) => {
    clickIndex = anchorKey;
    isClick = true;
    if (!subToolRef.value) return;
    if (anchorKey === 'all') {
      subToolRef.value.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      activeAnchor.value = 'all';
      return;
    }

    //  滚动到对应位置
    const targetElement = subToolRef.value.querySelector(`#anchor-${anchorKey}`);
    if (targetElement) {
      console.log('targetElement.offsetTop', targetElement.offsetTop - 10);
      subToolRef.value.scrollTo({
        top: targetElement.offsetTop - 10, // 偏移10px避免贴边
        behavior: 'smooth',
      });
      activeAnchor.value = anchorKey;
    }
  };

  const btnReport = () => {
    const menuCode = store.menuCodeMap?.[route?.name];
    memberApi.luteosMemberSysReport({
      platform: 'ERP',
      menuCode,
      eventName: '系统导航',
      memberCode: store?.userInfo?.memberCode || '',
      type: 'button',
      pageUrl: route?.path,
    });
  };

  // 申请权限
  const PERMISSION_APPLY_URL =
    'dingtalk://dingtalkclient/action/openapp?app_id=-4&container_type=work_platform&corpid=ding1a1c6d46f33cfeb735c2f4657eb6378f&ddtab=true&redirect_type=jump&redirect_url=https%3A%2F%2Faflow.dingtalk.com%2Fdingtalk%2Fmobile%2Fhomepage.htm%3Fbackcontrol%3Dfalse%26corpid%3Dding1a1c6d46f33cfeb735c2f4657eb6378f%26dd_progress%3Dfalse%26dd_share%3Dfalse%26ddtab%3Dtrue%26showmenu%3Dfalse%23%2Fcustom%3Fpcredirect%3Dself%26processCode%3DPROC-1829E639-43D1-4976-9714-64549784924E';
  const handleApplyPermission = () => {
    window.location.href = PERMISSION_APPLY_URL;
  };

  // 输入框筛选
  const handleInputChange = debounce(() => {
    if (searchToolValue.value) {
      filterSystemList.value = systemList.value
        .map((item) => {
          const filterSystemNavList = item.systemNavList.filter(
            (tool) =>
              tool.materialName.toLowerCase().includes(searchToolValue.value.toLowerCase()) &&
              !hideMaterialNameList.includes(tool.materialName)
          );
          return {
            ...item,
            systemNavList: filterSystemNavList,
          };
        })
        .filter((item) => item.systemNavList.length > 0);
    } else {
      filterSystemList.value = systemList.value;
    }
  }, 300);
</script>

<style scoped lang="scss">
  .system-tag {
    cursor: pointer;
  }
  .nav-model-list {
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    .bean-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .anchor-item {
        display: flex;
        padding: 6px 12px;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        color: var(---N9, var(---N9, #1f1f1f));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        border-radius: 10px;
        &:hover {
          background: var(---P1, #f0fff6);
          color: var(---P6, var(---P6, #02b96b));
          cursor: pointer;
        }

        &.active {
          background: var(---P1, #f0fff6);
          color: var(---P6, var(---P6, #02b96b));
        }
      }
    }
  }
  .system-container {
    display: flex;
    max-height: calc(100vh - 80px);
    border-radius: 8px;
    .system-content {
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: none;
      width: 300px;
    }
    .userinfo {
      padding: 20px 20px 4px;
      position: relative;
      // background-color: #f0f2f5;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(to bottom, transparent 0%, #f0f2f5 90%),
          url('../images/header-bg.png') 50% / cover no-repeat;
        opacity: 0.7;
        z-index: -1;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid var(--Grey-grey-1, #fff);
        box-shadow: 0 0 20px 0 #fff;
        margin-bottom: 8px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .text {
        color: var(--Grey-grey-10, #000);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        .tip-text {
          margin-bottom: 4px;
          display: inline-block;
          line-height: 24px;
        }
        .tip-description {
          color: var(--Grey-grey-7, #8a9099);
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          .tip-link {
            display: inline-flex;
            margin-left: 8px;
            color: var(--Green-green-6, #00c261);
          }
        }
      }
    }
    .tool-list {
      padding: 8px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background: var(--Grey-grey-3, #f0f2f5);
      .tool-item,
      .tool-commercial {
        display: flex;
        flex-direction: column;
        gap: 12px;
        .tool-title {
          color: var(---N9, var(---N9, #1f1f1f));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .tool-box,
        .red-bg {
          padding: 12px;
          border-radius: 8px;
          background: var(---N0, #fff);
          max-width: 260px;
          border: 1px solid #f0f2f5;
          > a {
            display: flex;
            align-items: center;
          }
          .system-icon {
            width: 32px;
            height: 32px;
            margin-right: 12px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .system-name {
            display: flex;
            flex-direction: column;
            .material-name {
              color: var(---N9, var(---N9, #1f1f1f));
              font-size: 12px;
              font-style: normal;
              font-weight: 600;
              line-height: 20px;
            }
            .material-desc {
              color: var(---N6, var(---N6, #999));
              font-size: 11px;
              font-style: normal;
              font-weight: 400;
              line-height: 18px;
            }
            &.commercial-momcozy {
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              .material-name {
                color: #6b2d3b;
                margin-bottom: 8px;
              }
              .material-desc {
                color: #6b2d3b;
                font-size: 12px;
              }
              .material-desc1 {
                color: #6b2d3b;
                font-size: 9px;
              }
            }
            &.commercial-momcozy-app {
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              .material-name {
                color: #6a2c39;
                font-size: 14px;
                font-weight: 600;
                line-height: 22px;
              }
              .material-desc {
                color: #6b2d3b;
                font-size: 10px;
              }
              .material-desc1 {
                color: #6b2d3b;
                font-size: 9px;
              }
            }
          }
          &:hover {
            border-color: var(--el-color-primary);
          }
        }
        .red-bg {
          background: linear-gradient(112deg, #fff -8.34%, #ffdfd6 56.86%);
          .system-icon {
            margin-right: 8px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .el-popper.is-light.el-popover.nav-system-popover {
    border-width: 0px !important;
  }
  .nav-system-popover.el-popover.el-popper {
    padding: 0px;
    max-height: calc(100vh - 80px);
    border-radius: 8px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #1f1f1f;
      margin-bottom: 16px;
      padding: 0 4px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        margin-left: 4px;
      }
      .middle {
        color: #999999;
        font-size: 12px;
        line-height: 24px;
        position: relative;
        padding-right: 9px;
        cursor: pointer;
        font-weight: normal !important;
        &::before {
          content: '';
          width: 1px;
          height: 8px;
          background-color: #dedede;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .right {
        font-weight: normal !important;
        cursor: pointer;
        color: #999999;
        font-size: 12px;
        line-height: 24px;
        margin-left: 8px;
        margin-right: 4px;
      }
    }
    .system-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(4, 80px);
      row-gap: 10px;
      .system-item {
        padding: 8px 0;
        border-radius: 6px;
        a {
          display: block;
          text-align: center;
          .system-icon {
            margin-bottom: 4px;
            font-size: 0;
            img {
              width: 40px;
              height: 40px;
              display: block;
              margin: 0 auto;
            }
          }
          .system-name {
            color: #1f1f1f;
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;
            width: 72px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
          }
        }
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
</style>
