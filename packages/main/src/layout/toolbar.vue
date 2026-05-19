<template>
  <!--begin::Toolbar container-->
  <div id="kt_app_toolbar_container" class="container-fluid d-flex flex-stack">
    <!--begin::Page title-->
    <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
      <!--begin::Title-->
      <h1
        class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
      >
        {{ h1 }}
      </h1>
      <!--end::Title-->
      <!--begin::Breadcrumb-->
      <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
        <template v-for="(li, idx) in ul" :key="li">
          <template v-if="idx !== ul.length - 1">
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">
              <span class="text-muted text-hover-primary">{{ li }}</span>
            </li>
            <!--end::Item-->
            <!--begin::Item-->
            <li class="breadcrumb-item">
              <span class="bullet bg-gray-400 w-5px h-2px"></span>
            </li>
            <!--end::Item-->
          </template>
          <!--begin::Item-->
          <li v-else class="breadcrumb-item text-muted">{{ li }}</li>
          <!--end::Item-->
        </template>
      </ul>
      <!--end::Breadcrumb-->
    </div>
    <!--end::Page title-->
    <!--begin::Actions-->
    <!--    <div id="kt_app_toolbar_actions" class="d-flex align-items-center gap-2 gap-lg-3"></div>-->
    <!--end::Actions-->
  </div>
  <!--end::Toolbar container-->
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';
  import {
    arrayToTree,
    findPathsFromRootToTarget,
    findPathsFromRootToTargetByCode,
    TreeNode,
  } from '@/utils/menuTree';

  const route = useRoute();
  const store = useStore();

  const h1 = computed(() => {
    if (route.name === 'frame') {
      return store.menuNameMap[route.params.menuCode as string] || route.params.menuCode;
    }
    return route.meta?.title;
  });
  const ul = computed(() => {
    if (route.name === 'frame') {
      return findPathsFromRootToTargetByCode(root, route.params.menuCode) || [];
    }
    return findPathsFromRootToTarget(root, route?.name) || [];
  });

  const tree = arrayToTree(store.getTotalMenus);
  const root = new TreeNode({
    menuCode: 'M00000',
    componentName: '',
    name: '',
    children: tree,
  });
</script>
