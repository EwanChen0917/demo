<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" v-loading="workflowLoading">
    <!--begin::Card header-->
    <div class="card-header">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">
          {{ `工单名称：${workflowData?.workflowSubject}` }}
        </h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div
        v-for="[key, value] in Object.entries(workflowData?.bizDetailInfo ?? {})"
        :key="key"
        class="row mb-7"
      >
        <!--begin::Label-->
        <label class="col-lg-4 fw-semibold text-muted">{{ key }}</label>
        <!--end::Label-->
        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-800">{{ value }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script setup lang="ts">
  import { useRequest } from 'vue-request';
  import { platformApi, PlatformApi, PlatformContracts } from '@/api/index';

  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };

  const { loading: workflowLoading, data: workflowData } = useRequest(
    platformApi.platformWorkflowQueryWorkflowRecordDetail,
    {
      defaultParams: [
        {
          workflowCode: code!,
          workflowType: 2,
        },
      ],
    }
  );
</script>
