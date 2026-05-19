<template>
  <el-dialog title="添加/编辑标签" :model-value="visible" @close="emit('close')">
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
  import { metaApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    receiverEmail: string;
  }>();

  const tagList = ref([]);
  const tagOptionList = ref([]);
  const queryTag = async () => {
    const res = await metaApi.luteosMetaEmailQueryTag({
      tagType: 2,
      receiverEmail: props.receiverEmail,
    });
    tagOptionList.value = res?.tagList;
    tagList.value = res?.tagList?.filter((item) => item.hasChoose)?.map((item) => item.tagDesc);
  };
  queryTag();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  const saveLoading = ref(false);
  const handleSave = async () => {
    try {
      saveLoading.value = true;
      await metaApi.luteosMetaEmailUpdateTag({
        tagType: 2,
        receiverEmail: props.receiverEmail,
        tagBeanList: tagList.value?.map((item) => {
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
  };
</script>

<style scoped lang="scss"></style>
