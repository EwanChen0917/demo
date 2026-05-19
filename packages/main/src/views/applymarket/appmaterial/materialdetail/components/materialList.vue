<template>
  <div class="card card-flush">
    <div class="card-body px-20 py-15">
      <MaterialItem
        v-for="(item, idx) in form!.materialList"
        :key="(item.language ?? '') + idx"
        :idx="idx"
        :lang="form!.languageList?.[idx]?.value"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CommonContracts } from '@/api/index';
  import { MaterialDict } from '@/types/api';

  import MaterialItem from './materialItem.vue';

  const form = inject<
    CommonContracts.LuteMaterialSaveReq & {
      languageList: MaterialDict[];
    }
  >('form');
</script>
