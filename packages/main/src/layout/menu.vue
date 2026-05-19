<template>
  <template v-for="item of menuList" :key="item.menuCode">
    <!-- 单路由 -->
    <template v-if="!item.children || (item.children && item.children.length === 0)">
      <template v-if="item.externalLink">
        <a :href="item.path" target="_blank" rel="noopener noreferrer">
          <el-menu-item>
            <el-icon>
              <SvgIcon v-if="level1" :icon="item.icon" className="svg-icon-2" />
              <span v-else class="menu-bullet">
                <span class="bullet bullet-dot"></span>
              </span>
            </el-icon>
            <template #title>
              <span>{{ item?.name }}</span>
            </template>
          </el-menu-item>
        </a>
      </template>
      <template v-else>
        <el-menu-item :index="item.path || ''" @click="report(item)">
          <el-icon>
            <SvgIcon v-if="level1" :icon="item.icon" className="svg-icon-2" />
            <span v-else class="menu-bullet">
              <span class="bullet bullet-dot"></span>
            </span>
          </el-icon>
          <template #title>
            <span>{{ item?.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
    <!-- 多路由且子路由为一个 -->
    <!-- <template v-else-if="item.children && item.children.length === 1">
      <el-menu-item v-if="!item.children[0].meta?.hidden" :index="item.children[0].path">
        <SvgIcon :icon="item.children[0]?.icon" className="svg-icon-2" />
        <template #title>
          <span>{{ item.children[0]?.name }}</span>
        </template>
      </el-menu-item>
    </template> -->
    <!-- 多路由有多个子路由 -->
    <el-sub-menu
      :index="item.menuCode"
      v-else-if="item.children && item.children.length > 0 && item.delStatus !== 1"
    >
      <template #title>
        <el-icon>
          <SvgIcon v-if="!levelChildren" :icon="item.icon" className="svg-icon-2" />
          <span v-else class="menu-bullet">
            <span class="bullet bullet-dot"></span>
          </span>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <LayoutMenu :level1="false" :menuList="item.children" :levelChildren="true" />
    </el-sub-menu>
    <LayoutMenu :level1="false" v-else :menuList="item.children" :levelChildren="true" />
  </template>
</template>

<script setup lang="ts">
  // import type { RouteRecordRaw } from 'vue-router'
  import { memberApi } from '@/api';

  defineProps(['menuList', 'levelChildren', 'level1']);
  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };
</script>

<script lang="ts">
  export default {
    name: 'LayoutMenu',
  };
</script>

<style scoped lang="scss"></style>
