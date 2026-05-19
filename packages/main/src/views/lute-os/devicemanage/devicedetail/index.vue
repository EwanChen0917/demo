<template>
  <KeenFlex>
    <KeenFlex>
      <template #auto>
        <div class="card card-flush py-4" v-loading="deviceLoading">
          <div class="card-body py-10">
            <div class="text-center">
              <el-avatar :src="deviceData?.avatar" :size="100" />
              <div class="text-gray-800 fw-bold mt-2">{{ deviceData?.username }}</div>
            </div>
            <div class="pt-12 fs-6">
              <div
                v-for="item in [
                  {
                    label: '用户邮箱',
                    field: 'email',
                  },
                  {
                    label: '国家',
                    field: 'country',
                  },
                  {
                    label: '城市',
                    field: 'city',
                  },
                  {
                    label: '手机号码',
                    field: 'phone',
                  },
                ]"
                :key="item.field"
                class="d-flex mb-4"
              >
                <span class="fw-bold w-80px">{{ item.label }}</span>
                <span class="flex-1 text-gray-600">{{ deviceData?.[item.field] }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #fluid>
        <div class="card card-flush py-4" v-loading="deviceLoading">
          <div class="card-body p-20">
            <div
              v-for="item in [
                {
                  label: '设备编号',
                  field: 'deviceCode',
                },
                {
                  label: '设备类型',
                  field: 'type',
                },
                {
                  label: '设备型号',
                  field: 'model',
                },
                {
                  label: '激活时间',
                  field: 'activeTime',
                },
                {
                  label: '绑定时间',
                  field: 'relateTime',
                },
              ]"
              :key="item.field"
              class="d-flex mb-6 fs-6"
            >
              <span class="fw-bold w-80px">{{ item.label }}</span>
              <span class="flex-1 text-gray-600">{{ deviceData?.[item.field] }}</span>
            </div>
          </div>
        </div>
      </template>
    </KeenFlex>
    <UsageRecords :device-code="code" :uid="uid" />
    <Chart :device-code="code" :uid="uid" />
  </KeenFlex>
</template>

<script lang="ts" setup name="devicedetail">
  import { useRequest } from 'vue-request';

  import { deviceApi } from '@/api/index';

  import UsageRecords from './components/usageRecords.vue';
  import Chart from './components/chart.vue';

  const router = useRouter();
  const route = useRoute();
  const code = route.query.code as string;
  const uid = route.query.uid as string;

  const { loading: deviceLoading, data: deviceData } = useRequest(
    deviceApi.luteosDeviceQueryDeviceDetail,
    {
      defaultParams: [
        {
          deviceCode: code,
          userId: uid,
        },
      ],
    }
  );

  // 返回
  const goBack = () => {
    router.push('/devicelist');
  };
</script>
