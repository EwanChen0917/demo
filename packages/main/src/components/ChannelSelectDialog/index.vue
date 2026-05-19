<template>
  <el-dialog :model-value="visible" @close="handleCancel" :title="title" align-center width="800px">
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.channelCode" v-for="item in channelList" :key="item.channelCode">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      selectedChannels?: Array<string>;
      title?: string;
      require?: boolean;
      requireTips?: string;
    }>(),
    { title: '选择合作平台', requireTips: '请选择至少一个合作平台', require: true }
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const checkList = ref([]);
  const channelList = ref([]);
  const selectChannels = props.selectedChannels || [];
  checkList.value = selectChannels.map((item) => item.channelCode) || [];

  const queryChannelList = async () => {
    const res = await metaApi.luteosMetaQueryChannelList({
      pageNum: 1,
      pageSize: 100,
    });
    channelList.value = res.channelList || [];
  };
  queryChannelList();

  const handleCancel = () => {
    checkList.value = [];
    emit('close', false);
  };

  const handleSave = () => {
    if (props.require && checkList.value.length === 0) {
      ElMessage.warning(props.requireTips);
      return;
    }
    const list: any = [];
    checkList.value.map((check) => {
      const selectInfo: any = channelList.value.find((item) => item.channelCode === check) || {};
      if (selectInfo.name) {
        list.push(selectInfo);
      }
    });
    emit('close', true, list);
  };
</script>

<style scoped lang="scss"></style>
