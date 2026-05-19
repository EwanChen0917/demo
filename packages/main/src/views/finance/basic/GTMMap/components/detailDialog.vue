<template>
  <el-dialog title="GTM品线详情" :model-value="visible" @close="emit('close')" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="SPU编码：">{{ form?.productSpu || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="SPU名称：">{{ form?.productSpuName || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="产品分类编码：">
                    {{ form?.thirdCategoryCode || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="产品分类名称：">
                    {{ form?.thirdCategoryName || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="GTM品线编码：">{{ form?.gtmPlCode || '-' }}</el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="GTM品线名称：">{{ form?.gtmPlName || '-' }}</el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通-SPU&GTM：">
                    {{ form?.spuGtmPlPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.spuGtmPlPushInfo?.pushStatus == 2">
                      {{ `：${form?.spuGtmPlPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.spuGtmPlPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.spuGtmPlPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通-三级分类&GTM：">
                    {{ form?.categoryGtmPlPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.categoryGtmPlPushInfo?.pushStatus == 2">
                      {{ `：${form?.categoryGtmPlPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.categoryGtmPlPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.categoryGtmPlPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送分贝通-SPU&三级分类：">
                    {{ form?.spuCategoryPushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.spuCategoryPushInfo?.pushStatus == 2">
                      {{ `：${form?.spuCategoryPushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.spuCategoryPushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="分贝通编码：">
                    {{ form?.spuCategoryPushInfo?.number || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import type { TabsPaneContext } from 'element-plus';

  const activeName = ref('base');

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };

  const props = defineProps<{
    visible: boolean;
    code: string;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref();

  watchEffect(async () => {
    if (props.code) {
      const res = await financeSystemApi.financeBasicQueryGtmGroupMappingDetail({
        productSpu: props.code,
      });
      if (res) {
        form.value = res;
      }
    }
  });
</script>

<style scoped lang="scss">
  :deep(.el-form-item__content) {
    line-height: 30px;
  }
</style>
