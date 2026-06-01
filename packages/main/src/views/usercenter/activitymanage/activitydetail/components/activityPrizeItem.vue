<template>
  <div v-if="form?.activityPrizeList?.[idx]" class="prize-item">
    <h4>{{ prize?.prizeLevelName }}</h4>
    <div class="d-flex gap-10">
      <div class="w-75">
        <el-form-item
          label="奖品类型"
          :prop="['activityPrizeList', `${idx}`]"
          :rules="prizeRules"
          required
        >
          <div class="d-flex gap-7 gap-lg-10">
            <el-select
              v-model="form.activityPrizeList[idx].prizeType"
              placeholder="请选择奖品类型"
              @change="handlePrizeTypeChange"
            >
              <el-option :value="ActivityPrizeType.商品" label="商品" />
              <el-option :value="ActivityPrizeType.积分" label="积分" />
            </el-select>
            <el-button
              v-if="prize?.prizeType === ActivityPrizeType.商品"
              class="ms-5"
              type="primary"
              @click="() => handlePickProduct(idx)"
            >
              选择商品
            </el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <div
            v-if="prize?.prizeType === ActivityPrizeType.商品 && prize.skuCode"
            class="d-flex align-items-start gap-7 gap-lg-10"
          >
            <div class="d-flex align-items-center">
              <KeenImageUpload
                v-model="form.activityPrizeList[idx].prizeImg"
                directory="station/product"
                disabled
              />
              <div class="ms-5">
                <div class="text-gray-800 fs-5 lh-base">{{ prize?.prizeName }}</div>
                <div class="text-gray-800 fs-7 lh-base mt-2">{{ prize?.skuCode }}</div>
                <div class="text-gray-800 fs-7 mt-2">
                  {{ prize?.price }}
                  <span v-if="prize?.price">USD</span>
                </div>
              </div>
            </div>
            <div class="h-150px d-flex flex-column justify-content-center gap-7">
              <el-form-item
                :prop="['activityPrizeList', `${idx}`, 'displayCount']"
                label="展示数量"
              >
                <el-input-number
                  v-model="form.activityPrizeList[idx].displayCount"
                  placeholder="请输入"
                  :min="form.activityPrizeList[idx].totalCount || 1"
                  :precision="0"
                  :max="9999999"
                />
              </el-form-item>
              <el-form-item :prop="['activityPrizeList', `${idx}`, 'totalCount']" label="抽奖数量">
                <el-input-number
                  v-model="form.activityPrizeList[idx].totalCount"
                  placeholder="请输入"
                  :min="0"
                  :max="form.activityPrizeList[idx].displayCount"
                  :precision="0"
                />
              </el-form-item>
            </div>
          </div>
          <KeenFlex v-if="prize?.prizeType === ActivityPrizeType.积分 && prize.pointPrizes?.length">
            <div
              v-for="(pp, ppIdx) in prize.pointPrizes"
              :key="pp.prizeName"
              class="d-flex align-items-start gap-7 gap-lg-10"
            >
              <span class="w-60px">{{ pp.prizeName }}</span>
              <el-form-item
                :prop="['activityPrizeList', `${idx}`, 'pointPrizes', `${ppIdx}`, 'displayCount']"
                label="展示数量"
              >
                <el-input-number
                  v-model="form.activityPrizeList[idx].pointPrizes![ppIdx].displayCount"
                  :min="form.activityPrizeList[idx].pointPrizes![ppIdx].totalCount || 1"
                  placeholder="请输入"
                  :precision="0"
                  :max="9999999"
                />
              </el-form-item>
              <el-form-item
                :prop="['activityPrizeList', `${idx}`, 'pointPrizes', `${ppIdx}`, 'totalCount']"
                label="抽奖数量"
              >
                <el-input-number
                  v-model="form.activityPrizeList[idx].pointPrizes![ppIdx].totalCount"
                  :min="0"
                  :max="form.activityPrizeList[idx].pointPrizes![ppIdx].displayCount"
                  placeholder="请输入"
                  :precision="0"
                />
              </el-form-item>
            </div>
          </KeenFlex>
        </el-form-item>
      </div>
      <div>
        <el-form-item
          label="活动图"
          :prop="'activityPrizeList.' + idx + '.productImageNew'"
          :rules="[
            {
              required: true,
              message: '请上传活动图片',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <KeenImageUpload
            v-model="form.activityPrizeList[idx].productImageNew"
            directory="station/activity"
            tooltip="选择活动图片"
          />
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ActivityContracts } from '@/api/index';
  import { ActivityPrizeType, ActivityPrizeBean, ActivityPrizePointLevel } from '@/types/api';

  import type { FormItemRule } from 'element-plus';

  const props = defineProps<{
    idx: number;
    handlePickProduct: (idx: number) => void;
  }>();

  const form = inject<
    Omit<ActivityContracts.ActivitySaveReq, 'activityPrizeList'> & {
      activityPrizeList: ActivityPrizeBean[];
    }
  >('form');
  const prize = computed(() => form?.activityPrizeList?.[props.idx]);

  const handlePrizeTypeChange = (type: ActivityPrizeType) => {
    const { idx } = props;
    if (type === ActivityPrizeType.商品) {
      const { pointPrizes } = form!.activityPrizeList[idx];
      if (pointPrizes?.length) {
        const [{ displayCount, totalCount }] = pointPrizes;
        form!.activityPrizeList[idx].displayCount = displayCount;
        form!.activityPrizeList[idx].totalCount = totalCount;
        form!.activityPrizeList[idx].pointPrizes = undefined;
      }
    } else if (type === ActivityPrizeType.积分) {
      const { displayCount, totalCount, prizeLevel, prizeType } = form!.activityPrizeList[idx];
      form!.activityPrizeList[idx].pointPrizes = [
        ActivityPrizePointLevel['30积分'],
        ActivityPrizePointLevel['50积分'],
        ActivityPrizePointLevel['100积分'],
      ].map((pointLevel) => ({
        prizeName: `${pointLevel}积分`,
        point: pointLevel,
        displayCount,
        totalCount,
        prizeLevel,
        prizeType,
      }));
    }
  };

  const prizeRules = reactive<FormItemRule[]>([
    {
      validator(_, item: ActivityPrizeBean, callback) {
        if (!item.prizeType) return callback(`请选择奖品类型`);
        if (item.prizeType === ActivityPrizeType.商品) {
          if (!item.skuCode) return callback(`请选择商品`);
        }
        return true;
      },
    },
  ]);
</script>
