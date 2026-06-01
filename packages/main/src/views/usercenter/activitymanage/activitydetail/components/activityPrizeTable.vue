<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>抽奖商品</h2>
      </div>
    </div>
    <div class="card-body p-0">
      <KeenList>
        <el-form ref="formRef" :rules="rules" label-position="left" :model="editItem ?? {}">
          <el-table
            ref="tableRef"
            :data="listWithEditState"
            row-key="id"
            :row-class-name="({ row }) => (row.isEdit ? 'has-form-item' : '')"
          >
            <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
            <el-table-column label="奖品等级">
              <template #default="scope">
                <el-form-item
                  :prop="'listWithEditState.' + scope.$index + '.productImageNew'"
                  class="mb-0"
                >
                  <!--                  <el-input v-model="editItem.skuCode" placeholder="请输入" />-->
                  <KeenImageUpload
                    v-model="scope.row.productImageNew"
                    directory="station/activity"
                    tooltip="选择活动图片"
                    size="50"
                    :disabled="!scope.row.isEdit"
                    :class="[scope.row.isEdit ? '' : 'mt-3']"
                  />
                  <span class="ms-5">{{ scope.row.prizeLevelName }}</span>
                </el-form-item>
                <!--                <div v-else class="d-flex align-items-center">
                                  <KeenImagePreview :src="row.productImageNew" />
                                  <span class="ms-5">
                                    {{ row.prizeLevelName }}
                                  </span>
                                </div>-->
                <!--                <GoodsInfo v-else :name="row.prizeLevelName" :src="row.productImageNew" />-->
              </template>
            </el-table-column>
            <el-table-column label="商品/积分" min-width="200">
              <template #default="scope">
                <div
                  v-if="scope.row.prizeType === ActivityPrizeType.商品"
                  class="d-flex align-items-center"
                >
                  <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.prizeImg" />
                  <div class="ms-5">
                    <span class="text-gray-800 fs-5 fw-bold">{{ scope.row.prizeName }}</span>
                  </div>
                </div>
                <span v-else-if="scope.row.prizeType === ActivityPrizeType.积分">
                  {{ scope.row.prizeName }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="店铺SKU">
              <template #default="scope">
                <template v-if="scope.row.prizeType === ActivityPrizeType.商品">
                  <!--                  <el-form-item v-if="scope.row.isEdit && editItem" prop="skuCode">
                                      <el-input v-model="editItem.skuCode" placeholder="请输入" />
                                    </el-form-item>
                                    <span v-else>{{ scope.row.skuCode }}</span>-->
                  <span>{{ scope.row.skuCode }}</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="抽奖数量">
              <template #default="scope">
                <el-form-item v-if="scope.row.isEdit && editItem" prop="totalCount">
                  <el-input-number
                    v-model="editItem.totalCount"
                    placeholder="请输入"
                    :min="1"
                    :max="editItem.displayCount"
                    :precision="0"
                  />
                </el-form-item>
                <span v-else>{{ scope.row.totalCount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="展示数量">
              <template #default="scope">
                <el-form-item v-if="scope.row.isEdit && editItem" prop="displayCount">
                  <el-input-number
                    v-model="editItem.displayCount"
                    placeholder="请输入"
                    :min="editItem.totalCount"
                    :precision="0"
                    :max="9999999"
                  />
                </el-form-item>
                <span v-else>{{ scope.row.displayCount }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="!form!.activityStarted" label="操作" align="right">
              <template #default="scope">
                <KeenActions
                  display-style="buttons"
                  :actions="
                    scope.row.isEdit
                      ? [
                          {
                            label: '保存',
                            key: 'save',
                            type: 'primary',
                            text: true,
                            payload: scope,
                          },
                          {
                            label: '取消',
                            key: 'cancel',
                            text: true,
                            payload: scope,
                          },
                        ]
                      : [
                          {
                            label: '编辑',
                            key: 'change',
                            type: 'primary',
                            text: true,
                            payload: scope,
                            disabled:
                              editItem?.prizeCode && editItem.prizeCode !== scope.row.prizeCode,
                          },
                        ]
                  "
                  @click="handleActions"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </KeenList>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { FormInstance, FormRules } from 'element-plus';
  import { ActivityContracts, productApi } from '@/api/index';
  import { ActivityPrizeType } from '@/types/api';
  import * as swal from '@/utils/swal';

  const form = inject<ActivityContracts.ActivitySaveReq & { activityStarted: boolean }>('form');

  const editItem = ref<ActivityContracts.ActivityPrizeBean | null>(null);
  const listWithEditState = computed(() =>
    form?.activityPrizeList?.map((item, idx) => ({
      ...item,
      skuCode: form.activityPrizeList?.[idx]?.skuCode,
      totalCount: form.activityPrizeList?.[idx]?.totalCount,
      displayCount: form.activityPrizeList?.[idx]?.displayCount,
      productImageNew: form.activityPrizeList?.[idx]?.productImageNew,
      isEdit: item.prizeCode && editItem.value?.prizeCode === item.prizeCode,
    }))
  );

  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    skuCode: [
      {
        required: true,
        message: '请输入产品SKU',
      },
    ],
    totalCount: [
      {
        required: true,
        type: 'integer',
        message: '请输入抽奖数量',
      },
    ],
    displayCount: [
      {
        required: true,
        type: 'integer',
        message: '请输入展示数量',
      },
    ],
    productImageNew: [
      {
        required: true,
        message: '请上传活动图片',
      },
    ],
  });

  // 表格操作
  const handleActions = async (item) => {
    const {
      key,
      payload: { $index: idx, row },
    } = item;

    if (key === 'change') {
      editItem.value = row;
    }

    if (key === 'save') {
      if (!formRef.value || !editItem.value) return;
      const valid = await formRef.value?.validate().catch(() => {
        return false; // 校验失败返回 false，不继续执行
      });
      if (!valid) return;

      const { skuCode, prizeType } = editItem.value;
      if (prizeType === ActivityPrizeType.商品) {
        if (row.skuCode !== skuCode) {
          const product = await productApi.luteosProductSkuQuerySkuInfo({ skuCode });
          // const res = await productApi.luteosProductQueryProductList({
          //   pageSize: 1,
          //   pageNum: 1,
          //   productSpu,
          // });
          // const product = res?.productBeanList?.[0];
          if (!product) {
            swal.error(`商品${skuCode}不存在`);
            return;
          }
          editItem.value.skuCode = product.skuCode;
          editItem.value.prizeName = product.name;
          editItem.value.prizeImg = product.productImage;
        }
      }

      form!.activityPrizeList![idx] = {
        ...editItem.value,
      };
      editItem.value = null;
    }

    if (key === 'cancel') {
      editItem.value = null;
    }
  };
</script>
