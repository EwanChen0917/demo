<template>
  <el-popover
    popper-class="nav-search-popover"
    placement="bottom"
    :offset="17"
    width="360px"
    :show-arrow="false"
    trigger="click"
    virtual-triggering
    :virtual-ref="iconRef"
    @show="show()"
    @hide="isShow = false"
  >
    <div class="nav-search">
      <h5 class="nav-search-title">搜索</h5>
      <div>
        <el-autocomplete
          :teleported="false"
          v-model="searchMenu"
          :fetch-suggestions="querySearch"
          clearable
          @select="handleSelect"
          placeholder="请输入菜单名称"
          ref="searchInputRef"
          class="auto-input"
        >
          <template #suffix>
            <i class="iconfont icon-sousuo1" style="font-weight: 400"></i>
          </template>
        </el-autocomplete>
      </div>
    </div>
  </el-popover>

  <el-tooltip ref="etpRef" :offset="22" content="菜单搜索" placement="bottom" effect="dark">
    <i
      ref="iconRef"
      class="iconfont icon-sousuo1 nav-search-icon"
      :class="{ 'is-show': isShow }"
      style="font-weight: 400"
    ></i>
  </el-tooltip>
</template>

<script setup lang="ts">
  import { arrayToTree, getAllNodes } from '@/utils/menuTree';
  import { useStore } from '@/store/modules/useStore';
  import { routeMap } from '@/router';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { openWindow } from '@/utils';

  const etpRef = ref();
  const iconRef = ref();
  const store = useStore();
  const router = useRouter();
  const searchMenu = ref('');
  const searchInputRef = ref();
  const isShow = ref(false);
  const show = () => {
    isShow.value = true;
    // console.log(searchInputRef.value);
    searchInputRef.value.focus();

    etpRef.value.hide();
  };

  const menuList = computed(() => {
    const filterPathMenus = (menus: any[]) => {
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
            children: [],
          };
        });
    };
    return filterPathMenus(store.getTotalThirdFiveMenus);
  });

  const totalNodes = computed(() => {
    return getAllNodes(arrayToTree(menuList.value), (node) => {
      return node?.menuType !== 'button' && node?.path;
    });
  });

  const querySearch = (queryString, cb) => {
    let results = queryString ? totalNodes.value.filter(createFilter(queryString)) : [];
    // 对相同path进行去重
    results = uniqueObjArrayByKey(results, 'path');
    // call callback function to return suggestions
    cb(results);
  };

  const createFilter = (queryString: string) => {
    return (restaurant) => {
      return restaurant.value.toLowerCase().includes(queryString.toLowerCase());
    };
  };

  const uniqueObjArrayByKey = (nodes, key) => {
    if (!nodes.length) return [];
    const nodeMap = new Map();
    // 遍历数组，只保留首次出现的对象
    return nodes.filter((item) => {
      // 四级不展示
      if (item.children?.length && !item.children[0].children?.length) return false;
      // 重复path且name不展示
      const uniquePath = item[key];
      if (!nodeMap.has(uniquePath)) {
        nodeMap.set(uniquePath, item.value);
        return true;
      }
      if (nodeMap.has(uniquePath) && nodeMap.get(uniquePath) != item.value) return true;
      return false;
    });
  };

  const handleSelect = (node) => {
    if (node.menuType === 'iframe') {
      node.path && router.push(node.path);
    } else if (node.menuType === 'url') {
      openWindow(node.path);
    } else {
      router.push({ name: node?.componentName });
    }
  };
</script>

<style scoped lang="scss">
  .nav-search {
    width: 320px;
  }
  .nav-search-icon {
    cursor: pointer;
  }
</style>

<style lang="scss">
  .nav-search-popover.el-popover.el-popper {
    padding: 20px;
    border-radius: 10px;
    border: none;
    .el-autocomplete {
      border: none;
    }
    .nav-search-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #1f1f1f;
      margin-bottom: 16px;
    }
    .auto-input {
      .el-input {
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
      }
      .el-input__inner {
        // color: #c5c5c5;
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
