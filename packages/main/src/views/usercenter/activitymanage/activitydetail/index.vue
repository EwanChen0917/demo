<template>
  <el-form
    ref="formRef"
    :rules="rules"
    require-asterisk-position="right"
    :model="form"
    label-position="left"
    label-width="120px"
  >
    <KeenFlex v-loading="activityLoading">
      <ActivityInfo />
      <ActivityPrizeTable v-if="form.activityCode" />
      <ActivityPrize v-else />
      <ActivityConfig />
      <UserDetails v-if="form.activityCode" />
      <PrizeResult v-if="form.activityCode" />
      <div class="d-flex flex-row justify-content-end">
        <el-button @click="handleCancel" text>取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
      </div>
    </KeenFlex>
  </el-form>

  <!-- <div v-html="JSON.stringify(form, null, '  ')"></div> -->
</template>

<script lang="ts" setup name="activitydetail">
  import dayjs from 'dayjs';
  import { useRequest } from 'vue-request';
  import { omit, pick, groupBy } from 'lodash-es';
  import type { FormInstance, FormRules } from 'element-plus';

  import * as swal from '@/utils/swal';
  import { activityApi, ActivityApi, ActivityContracts } from '@/api/index';
  import {
    ActivityStatus,
    ActivityType,
    ActivityPrizeType,
    ActivityPrizeLevel,
    ActivityPrizeBean,
    ActivityPrizeConfigLevel,
  } from '@/types/api';

  import ActivityInfo from './components/activityInfo.vue';
  import ActivityPrize from './components/activityPrize.vue';
  import ActivityPrizeTable from './components/activityPrizeTable.vue';
  import ActivityConfig from './components/activityConfig.vue';
  import UserDetails from './components/userDetails.vue';
  import PrizeResult from './components/prizeResult.vue';

  const router = useRouter();
  const route = useRoute();
  const code = route.query.code as string;

  const formRef = ref<FormInstance>();

  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        message: '请填写活动名称',
      },
      {
        max: 255,
        message: '活动名称长度不能超过255',
      },
    ],
    startTime: [
      {
        required: true,
        message: '请选择活动开始时间',
      },
    ],
    endTime: [
      {
        required: true,
        message: '请选择活动结束时间',
      },
    ],
  });
  const form = reactive<
    ActivityApi.LuteosActivitySaveActivity.RequestBody & {
      originActivityUserPrizeList: ActivityContracts.ActivityUserPrizeBean[];
      activityStarted: boolean;
    }
  >({
    activityType: ActivityType.抽奖,
    name: '',
    startTime: '',
    endTime: '',
    status: ActivityStatus.关闭,
    activityPrizeList: [
      ActivityPrizeLevel.一等奖,
      ActivityPrizeLevel.二等奖,
      ActivityPrizeLevel.三等奖,
      ActivityPrizeLevel.四等奖,
      ActivityPrizeLevel.五等奖,
    ].map((prizeLevel) => ({
      prizeLevel,
      prizeLevelName: ActivityPrizeLevel[prizeLevel],
      prizeType: ActivityPrizeType.商品,
      displayCount: 1,
      totalCount: 0,
      productImageNew: '',
    })),
    activityPrizeConfigList: [
      ActivityPrizeConfigLevel.梯队1,
      ActivityPrizeConfigLevel.梯队2,
      ActivityPrizeConfigLevel.梯队3,
    ].map((configLevel) => ({
      configLevel,
      configLevelName: ActivityPrizeConfigLevel[configLevel],
      startRange: undefined,
      endRange: undefined,
      prizeCount: undefined,
    })),
    activityUserPrizeList: [],
    originActivityUserPrizeList: [],
    activityStarted: false,
  });
  provide('form', form);

  const {
    loading: activityLoading,
    data: activityData,
    refresh: refreshActivity,
  } = useRequest(activityApi.luteosActivityQueryActivityDetail, {
    defaultParams: [
      {
        activityType: ActivityType.抽奖,
        activityCode: code,
      },
    ],
    manual: !code,
  });
  watchEffect(() => {
    const activity = activityData.value;
    if (activity?.activityCode) {
      Object.assign(form, activity, {
        // activityPrizeList: Object.values(groupBy(activity.activityPrizeList, 'prizeLevel'))
        //   .map(([item, ...restItems]) => {
        //     if (item.prizeType === ActivityPrizeType.积分) {
        //       return {
        //         ...item,
        //         pointPrizes: [item, ...restItems],
        //       };
        //     }
        //     return item;
        //   })
        //   .sort((a, b) => a.prizeLevel - b.prizeLevel),
        activityPrizeConfigList: form.activityPrizeConfigList.map((originItem) => {
          const newItem = activity.activityPrizeConfigList?.find(
            (item) => originItem.configLevel === item.configLevel
          );
          return {
            ...originItem,
            ...newItem,
          };
        }),
        originActivityUserPrizeList: activity.activityUserPrizeList,
        activityUserPrizeList: activity.activityUserPrizeList?.map(() => null) ?? [], // 默认填充null
        activityStarted: !dayjs().isBefore(dayjs(activity?.startTime)),
      });
    }
  });

  // 返回
  const goBack = () => {
    router.push('/activitylist');
  };

  // 提交
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;

    try {
      saveLoading.value = true;

      let d = {
        ...omit(form, ['originActivityUserPrizeList', 'activityStarted']),
        activityPrizeConfigList: form.activityPrizeConfigList.filter(
          (item) => item.endRange && item.prizeCount && item.startRange
        ),
      };
      if (!form.activityCode) {
        const { activityPrizeList: activityPrizeListOrigin } = form;
        const activityPrizeList = activityPrizeListOrigin?.reduce(
          (list, curr: ActivityPrizeBean) => {
            if (curr.prizeType === ActivityPrizeType.商品) {
              list.push({
                prizeLevelName: ActivityPrizeLevel[curr.prizeLevel],
                ...curr,
              });
            } else if (curr.prizeType === ActivityPrizeType.积分) {
              list.push(
                ...(curr.pointPrizes?.map(
                  ({ displayCount, totalCount, prizeCode, prizeName, point }) => ({
                    prizeLevelName: ActivityPrizeLevel[curr.prizeLevel],
                    ...omit(curr, ['pointPrizes']),
                    displayCount,
                    prizeCode,
                    prizeName,
                    totalCount,
                    point,
                  })
                ) ?? [])
              );
            }
            return list;
          },
          [] as typeof activityPrizeListOrigin
        );

        d.activityPrizeList = activityPrizeList;
        d = omit(d, ['activityUserPrizeList']);
      } else {
        d.activityUserPrizeList = d.activityUserPrizeList?.filter((item) => !!item?.id);
      }
      const { activityCode } = await activityApi.luteosActivitySaveActivity(d);
      swal.success('保存成功');

      if (!form.activityCode) {
        router.replace(`/activitylist/detail?code=${activityCode}`);
      } else {
        resetForm();
      }
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    resetForm();
  };

  const resetForm = () => {
    formRef.value?.resetFields();

    if (form.activityCode) {
      refreshActivity();
    }
  };
</script>
