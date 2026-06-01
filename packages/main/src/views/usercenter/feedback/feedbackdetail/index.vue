<template>
  <KeenFlex>
    <div class="card card-flush" v-loading="loading">
      <div class="card-body py-10">
        <div class="fs-6">
          <div
            v-for="item in [
              {
                label: '用户邮箱：',
                field: 'email',
              },
              {
                label: '用户名称：',
                field: 'username',
              },
              {
                label: '反馈来源：',
                field: 'source',
              },
              {
                label: '反馈时间：',
                field: 'createTime',
              },
            ]"
            :key="item.field"
            class="d-flex mb-4"
          >
            <span class="fw-bold w-100px">{{ item.label }}</span>
            <span class="flex-1 text-gray-600">{{ feedbackData?.[item.field] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-flush" v-loading="loading">
      <div class="card-body py-10">
        <div class="d-flex">
          <span class="fw-bold w-100px">反馈内容：</span>
          <div class="flex-1">
            <div v-if="feedbackData?.imageList?.length" class="image-grid mb-8">
              <el-image
                v-for="item in feedbackData?.imageList ?? []"
                :key="item"
                class="rounded w-100"
                :src="item"
                fit="contain"
              />
            </div>
            <div class="fs-6 fw-normal text-gray-700">
              {{ feedbackData?.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </KeenFlex>
</template>

<script lang="ts" setup name="feedbackdetail">
import { useRequest } from 'vue-request';

  import { userApi } from '@/api/index';

  const router = useRouter();
  const route = useRoute();
  const code = route.query.code as string;

  const { loading, data: feedbackData } = useRequest(
    userApi.luteosUserFeedbackAdviceFeedbackDetail,
    {
      defaultParams: [
        {
          feedbackId: code,
        },
      ],
    }
  );

  // 返回
  const goBack = () => {
    router.push('/feedbacklist');
  };
</script>

<style lang="scss" scoped>
  .image-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    width: 960px;
  }
</style>
