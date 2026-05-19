<template>
  <KeenCard style="margin: 0 !important" :title="`审批流程名称#${form.processName}`">
    <template #operation>
      <Tag size="large" :color="stateColor[form.status]">{{ form.statusDesc }}</Tag>
    </template>
    <!-- <div class="detail-wrapper">
        <div class="label">审批流程名称</div>
        <div class="content">{{ form.processName }}</div>
      </div> -->
    <div class="detail-wrapper">
      <div class="label">审批编号</div>
      <div class="content">{{ form.approveCode }}</div>
    </div>
    <div
      class="detail-wrapper"
      v-for="(item, index) of form.approveFormComponentValueBeanList"
      :key="index"
    >
      <div class="label">
        <template v-if="item.componentType === 'DDDateRangeField'">
          {{ getDataRangeLabel(item.componentName) }}
        </template>
        <template v-else>
          {{ item.componentName }}
        </template>
      </div>
      <div class="content">
        <FormItem :item="item" />
      </div>
    </div>
    <el-divider />
    <el-steps direction="vertical" :active="0">
      <template v-for="(item, index) of form.approveExeMemberBeanList" :key="index">
        <el-step>
          <template #icon>
            <el-image
              style="width: 50px; height: 50px"
              :src="item.avatar"
              fit="fill"
              :lazy="true"
            />
          </template>
          <template #title>
            <div style="display: flex; align-items: center">
              <div class="process-title">
                <p class="process-title__username">{{ item.username }}</p>
                <p class="process-title__status">
                  <Tag :color="stateColor[item.status]">{{ item.statusDesc || item.remark }}</Tag>
                </p>
              </div>
              <div></div>
            </div>
          </template>
          <template #description>
            <div>{{ item.operationTime }}</div>
          </template>
        </el-step>
      </template>
    </el-steps>
  </KeenCard>
  <!-- <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button type="primary">催办</el-button>
      </el-space>
    </div> -->
</template>

<script setup lang="ts" name="externalReceptionRecordDetail">
  import { useRouter, useRoute } from 'vue-router';
  import { processApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';

  import FormItem from './components/formItem.vue';

  const route = useRoute();
  const form = ref({
    approveFormComponentValueBeanList: [],
    approveNodeExeMemberBeanList: [],
    matterCode: '',
    matterName: '',
    approveCode: '',
    processDesc: '',
    processIconName: '',
    processIconUrl: '',
    processName: '',
    status: 0,
    statusDesc: '',
    workflowCode: '',
    workflowSubject: '',
  });
  const stateColor = ref({
    10: 'blue',
    11: 'green',
    12: 'red',
    13: 'yellow',
    20: 'blue',
    21: 'green',
    22: 'gray',
  });
  const getDetailData = async () => {
    const res = await processApi.luteosProcessNavigationApproveQueryDetail({
      workflowCode: route.query.code as string,
      itemType: Number(route.query.itemType as string) || 8,
    });
    form.value = res as any;
  };
  const getDataRangeLabel = (label: string) => {
    const arr = JSON.parse(label);
    return `${arr[0]} ~ ${arr[1]}`;
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
</script>

<style scoped lang="scss">
  .detail-wrapper {
    width: 800px;
    display: flex;
    font-size: 14px;
    margin-top: 14px;
    .content {
      flex: 1;
      color: #7e8299;
      font-weight: 500;
    }
    .label {
      flex-basis: 200px;
      flex-shrink: 0;
      flex-grow: 0;
      color: #b5b5c3;
      font-weight: bold;
      font-size: 0.95rem;
    }
  }
  .el-step {
    margin-bottom: 20px;
  }
  :deep(.el-step.is-vertical .el-step__head) {
    width: 60px;
    .el-step__line {
      top: 52px;
      bottom: -14px;
      left: 24px;
    }
    .el-step__icon.is-icon {
      width: 50px;
    }
  }
</style>
