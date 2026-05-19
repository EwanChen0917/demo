<template>
  <el-dialog :title="title" :model-value="visible" @close="emit('close')">
    <div class="mb-5">请输入或选择标签</div>
    <el-select
      style="width: 100%"
      v-model="tagList"
      placeholder="标签"
      clearable
      allow-create
      filterable
      :teleported="false"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="4"
      @keydown="handleKeyDown"
    >
      <el-option
        v-for="item in tagOptionList"
        :key="item.tagCode"
        :label="item.tagDesc"
        :value="item.tagDesc"
      />
    </el-select>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    title: string;
    platform: string;
    asinList?: any;
    uniqueCode?: string;
    actionType?: 1 | 2; // 批量动作 1-单个操作 2-批量操作
    dimensionType?: 1 | 2; // 数据维度 1-父维度 2-子维度
  }>();

  const tagList = ref([]);
  const tagOptionList = ref([]);
  /* const queryTagList = async () => {
    const params = {
      dimensionType: props.dimensionType,
      asinList: props.asinList,
      actionType: props.actionType,
    };
    if (props.platform === 'newplatform' && props.actionType === 1)
      params.uniqueCode = props.uniqueCode;
    const res = await serviceMap[props.platform]?.query(params);
    tagOptionList.value = res?.tagList || [];
    tagList.value = res?.tagList?.filter((item) => !!item.hasChoose)?.map((item) => item.tagDesc);
  }; */
  // queryTagList();

  const getLabelOptions = async () => {
    const res = await productApi.luteosProductAmazonListingQueryTagV2({
      platform: props.platform,
      keywordList: props?.asinList,
    });
    tagOptionList.value = res?.tagList || [];
    tagList.value = res?.tagList?.filter((item) => !!item.hasChoose)?.map((item) => item.tagDesc);
  };
  getLabelOptions();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  const saveLoading = ref(false);
  const handleSave = async () => {
    if (!tagList.value?.length && props.actionType === 2) {
      ElMessage.warning('请先选择或创建标签');
    } else {
      try {
        saveLoading.value = true;
        await productApi.luteosProductAmazonListingListingUpdateTagV2({
          channel: props.platform,
          actionType: props.actionType,
          listingBeanList: props.asinList,
          tagList: tagList.value?.map((item) => {
            return {
              tagCode: tagOptionList.value?.find((tag) => tag.tagDesc === item)?.tagCode,
              tagDesc: item,
            };
          }),
        });
        ElMessage.success('修改标签成功');
        emit('save');
      } finally {
        saveLoading.value = false;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };
</script>

<style scoped lang="scss"></style>
