<template>
  <div class="point-configurable-panel">
    <div class="header">
      <div class="title">{{ title }}</div>
      <i @click="handleCancel" class="iconfont icon-guanbi"></i>
    </div>
    <div class="main-content">
      <el-alert type="primary" show-icon :closable="false">
        <template #title>
          <div>请勾选当前模块您想展示的指标，最少可勾选1个</div>
        </template>
      </el-alert>
      <div class="configurable-wrapper">
        <el-checkbox-group class="configurable-group" v-model="configList">
          <el-checkbox
            v-for="(item, index) in configurablePointList"
            :key="item.key"
            :value="item.key"
            :label="item.label"
            :disabled="max !== 0 && configList.length >= max && !configList.includes(item.key)"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <el-button @click="handleRecover">恢复默认</el-button>
      </div>
      <div class="right">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">保存并应用</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
    max: number;
    configurablePointList: {
      label: string;
      key: string;
    }[];
    defaultConfigList: string[];
  }>();

  const emit = defineEmits<{
    validateFailed: [configList: string[]];
    close: [];
    confirm: [configList: string[]];
  }>();
  const configList = ref<string[]>([]);
  const preConfigList = ref<string[]>([]);

  watch(
    () => props.defaultConfigList.length,
    () => {
      preConfigList.value = props.defaultConfigList;
      configList.value = props.defaultConfigList;
    }
  );

  const handleRecover = () => {
    configList.value = props.defaultConfigList;
  };
  const handleCancel = () => {
    configList.value = [...preConfigList.value];
    emit('close');
  };
  const handleConfirm = () => {
    if (props.max !== 0 && (configList.value.length > props.max || configList.value.length < 1)) {
      emit('validateFailed', configList.value);
      return;
    }
    preConfigList.value = [...configList.value];
    emit('close');
    emit('confirm', configList.value);
  };
</script>

<style lang="scss" scoped>
  .point-configurable-panel {
    width: 748px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 20px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid var(---N3, #ededed);
      .title {
        color: var(---N9, var(---N9, #1f1f1f));

        /* 重要/Medium 16 */
        font-family: 'PingFang SC Medium';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */
      }
      .iconfont,
      .Root-tyicon {
        font-size: 20px;
        line-height: 1;
        color: #999;
        cursor: pointer;
      }
    }
    .main-content {
      padding: 16px 0;
      .configurable-wrapper {
        margin-top: 20px;
        margin-bottom: 20px;
        max-height: 300px;
        overflow-y: auto;
      }
      .configurable-group {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 12px;
        --el-checkbox-height: unset;
        .el-checkbox.is-disabled {
          :deep(.el-checkbox__label) {
            color: var(---N5, #c5c5c5);
          }
        }
        :deep(.el-checkbox__label) {
          width: 106px;
          line-height: 22px;
          color: var(---N9, #1f1f1f);
          font-size: 13px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-top: 1px solid var(---N3, #f0f0f0);
      .left {
        el-button {
          color: var(---N6, #8c8c8c);
          border-color: var(---N4, #d9d9d9);
        }
      }
      .right {
        el-button {
          &.el-button--primary {
            background-color: var(---P6, #02b96b);
            border-color: var(---P6, #02b96b);
          }
        }
      }
    }
  }
</style>
