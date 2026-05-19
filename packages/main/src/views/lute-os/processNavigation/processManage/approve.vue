<template>
  <el-form label-width="180px">
    <!-- {{ fileList }}
    <Uploader v-model="fileList" /> -->
    <KeenCard>
      <div class="detail-wrapper">
        <div class="label">审批流程名称</div>
        <div class="conten">{{ form.name }}</div>
      </div>
      <div class="detail-wrapper">
        <div class="label">审批编号</div>
        <div class="conten">{{ form.processCode }}</div>
      </div>
      <el-divider />
      <el-steps direction="vertical" :active="1">
        <el-step v-for="(item, index) of form.approverList" :key="index">
          <template #title>
            <div>王璐瑶 发起申请</div>
          </template>
          <template #description>
            <div>2023-08-23 15:30:39</div>
          </template>
        </el-step>
      </el-steps>
    </KeenCard>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button type="primary">催办</el-button>
      </el-space>
    </div>
  </el-form>
</template>

<script setup lang="ts" name="addApprove">
  import { useRouter, useRoute } from 'vue-router';
  import { workflowApi } from '@/api';
  import Uploader from '@/components/Uploader/index.vue';

  const route = useRoute();
  const fileList = ref([
    'https://lute-public-dev.oss-cn-shenzhen.aliyuncs.com/C00000001/product/goods/64e8498214e87602f737b053.jpg',
    'https://lute-public-dev.oss-cn-shenzhen.aliyuncs.com/C00000001/product/goods/64e84c8614e87602f737b058.jpg',
    'https://lute-public-dev.oss-cn-shenzhen.aliyuncs.com/C00000001/product/goods/64e819e014e87602f737b04d.jpg',
    'https://lute-public-dev.oss-cn-shenzhen.aliyuncs.com/C00000001/product/goods/64e0ee5c01e8bd6d423c30da.jpg',
  ]);
  const form = ref({
    approveFormComponentList: [],
    approverList: [],
    desc: '',
    iconName: '',
    iconUrl: '',
    name: '',
    processCode: '',
  });
  const getDetailData = async () => {
    const res = await workflowApi.luteosWorkflowApproveQueryDetail({
      processCode: route.query.code as string,
    });
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
</script>

<style scoped lang="scss">
  .detail-wrapper {
    display: flex;
    font-size: 14px;
    margin-bottom: 12px;
    .label {
      flex-basis: 140px;
    }
  }
</style>
