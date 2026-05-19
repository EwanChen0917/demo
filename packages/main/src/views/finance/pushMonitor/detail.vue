<template>
  <el-dialog
    :title="`单据详情 - ${rowData?.code}`"
    v-model="visible"
    @close="close"
    width="80%"
    modal-class="monitor-detail-dialog"
    :close-on-click-modal="true"
  >
    <el-tabs v-model="activeTab" v-loading="loading">
      <el-tab-pane label="基本信息" name="base">
        <base-info :detail="detailData" />
      </el-tab-pane>

      <el-tab-pane label="数据对比" name="compare">
        <compare-info :list="detailData.compareResultList || []" />
      </el-tab-pane>

      <el-tab-pane label="源数据" name="source">
        <source-data :detail="detailData" />
      </el-tab-pane>

      <el-tab-pane label="目标数据" name="target">
        <target-data :detail="detailData" />
      </el-tab-pane>

      <el-tab-pane label="操作日志" name="logs" lazy>
        <log-list :logs="detailData.operationLogList || []" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import BaseInfo from './components/baseInfo.vue';
  import CompareInfo from './components/compareInfo.vue';
  import SourceData from './components/sourceData.vue';
  import TargetData from './components/targetData.vue';
  import LogList from './components/logList.vue';
  import { reconciliationApi } from '@/api';

  const visible = ref(false);
  const loading = ref(false);
  const activeTab = ref('base');
  const rowData = ref({});
  const detailData = ref({});

  // 打开弹窗方法
  const open = (data: any) => {
    console.log(data);
    rowData.value = data;
    visible.value = true;

    loading.value = true;
    reconciliationApi
      .reconciliationMonitorQueryDetail({
        code: data.code,
      })
      .then((res) => {
        res = res || [];
        if (res.operationLogList?.length) {
          res.operationLogList.forEach((log) => {
            try {
              log.itemContentObj = JSON.parse(log.itemContent);
            } catch (e) {}
          });
        }

        detailData.value = res;
      }).finally(() => {
        loading.value = false;
      });
  };

  // 关闭弹窗
  const close = () => {
    activeTab.value = 'base';
    rowData.value = {};
    detailData.value = {};
  };

  // 暴露方法
  defineExpose({
    open,
  });
</script>

<style lang="scss">
  .monitor-detail-dialog {
    .el-dialog__body {
      min-height: 650px !important;
    }
  }
</style>