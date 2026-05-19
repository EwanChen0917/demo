<template>
  <el-dialog :title="title" :model-value="visibility" @close="close">
    <h5>存在部分信息校验失败，{{ showType === 1 ? '上报失败！' : '是否确认上报！' }}</h5>
    <div class="text">展示失败原因：</div>
    <div v-for="(item, index) in failReasonData" class="text" :key="index">
      预算表编码【{{ item.code }}】
      <div v-for="(value, i) in item.submitFailReasons" class="text" :key="i">{{ value }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibility = false">
          {{ showType === 1 ? '关闭' : '取消上报' }}
        </el-button>
        <el-button type="primary" @click="save" v-if="showType === 0">确认上报</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { budgetApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const title = ref('上报校验失败');
  const failReasonData = ref([]);
  const selectedCodeList = ref([]);
  const showType = ref(1);
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();
  const close = () => {
    visibility.value = false;
    emit('close');
  };
  const visibility = ref(false);
  const save = async () => {
    const res = await budgetApi.financeBudgetPresentationSubmit({
      codeList: selectedCodeList.value,
      requestEntrance: 0, // 请求入口 0-预算方案 1-预算编制 2-预算编制台
      continueSubmit: true,
    });
    if (res) {
      ElMessage.success('上报成功');
      close();
      emit('success');
    }
  };
  const open = (codeList, data, type) => {
    if (codeList) {
      selectedCodeList.value = codeList;
      failReasonData.value = data;
      showType.value = type;
      visibility.value = true;
    } else {
      failReasonData.value = [];
    }
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .text {
    color: var(---N9, #1f1f1f);
    line-height: 26px;
  }
</style>
