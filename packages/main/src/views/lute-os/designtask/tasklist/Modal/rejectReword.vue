<template>
  <el-drawer
    title="驳回记录"
    v-model="props.visible"
    direction="rtl"
    size="500px"
    :destroy-on-close="true"
    :show-close="true"
    :wrapperClosable="true"
    @close="emits('close')"
  >
    <el-timeline>
      <el-timeline-item
        placement="top"
        v-for="(reject, index) in list"
        :key="index"
        :timestamp="reject.createTime + `&nbsp;&nbsp;&nbsp;&nbsp;驳回人：${reject.operatorName}`"
      >
        <el-card style="line-height: 30px">
          <div>被驳回前状态：{{ reject.statusDesc || '--' }}</div>
          <div>被驳回设计师：{{ reject.designers || '--' }}</div>
          <div>驳回原因：{{ reject.reasonTypeDesc || '--' }}</div>
          <div>驳回意见：{{ reject.reason || '--' }}</div>
          <div v-if="reject.fileList && reject.fileList.length" class="file-list">
            <div>附件：</div>
            <div class="file-wrap">
              <div v-for="item in reject.fileList" :key="item.ossKey" class="file-item">
                <div class="file-item-name">
                  <OverflowTooltip :content="item.name" :line="1" />
                </div>
                <el-button
                  v-if="auth"
                  type="text"
                  class="preview fs-12"
                  @click="handlePreviewFile(item)"
                >
                  预览
                </el-button>
                <el-button v-if="auth" type="text" @click="handleDownFile(item)" class="fs-12">
                  下载
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-drawer>
</template>

<script setup lang="ts">
  const props = defineProps<{
    list: Array<object>;
    visible: boolean;
    auth: boolean;
  }>();
  const emits = defineEmits<{
    (e: 'close'): void;
    (e: 'preview', val: object): void;
    (e: 'download', val: object): void;
  }>();

  const handlePreviewFile = async (item) => {
    emits('preview', item);
  };
  const handleDownFile = async (item) => {
    emits('download', item);
  };
</script>

<style scoped lang="scss">
  :deep(.el-timeline-item__timestamp) {
    color: var(--bs-text-primary) !important;
  }
  .file-list {
    display: flex;
  }
  .file-wrap {
    margin-top: 2px;
  }
  .file-item-name {
    width: 220px;
    cursor: pointer;
    line-height: 25px;
    color: #3e97ff;
  }
  .file-item {
    display: flex;
    height: 35px;
    line-height: 35px;
  }
  .fs-12 {
    margin-top: -9px;
    font-size: 12px;
    margin-left: 5px;
  }
</style>
