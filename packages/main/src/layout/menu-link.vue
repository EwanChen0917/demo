<template>
  <a class="menu-link" v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot></slot>
  </a>
  <RouterLink v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :class="['menu-link', isActive ? activeClass : inactiveClass]"
      :href="href"
      @click.prevent="
        () => {
          navigate();
          reportNavigation();
        }
      "
    >
      <slot></slot>
    </a>
  </RouterLink>
</template>

<script lang="ts">
  import { memberApi } from '@/api';
  import { RouterLink } from 'vue-router';

  export default {
    name: 'MenuLink',
    inheritAttrs: false,

    props: {
      menuCode: String,
      // @ts-ignore
      ...RouterLink.props,
      inactiveClass: String,
    },

    computed: {
      isExternalLink() {
        return typeof this.to === 'string' && this.to.startsWith('http');
      },
    },
    methods: {
      reportNavigation() {
        memberApi.luteosMemberSaveMenuVisit({
          menuCode: this.menuCode,
        },{
          customCatch:true
        } as any);
      },
    },
  };
</script>
