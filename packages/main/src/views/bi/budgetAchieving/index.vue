<template>
  <div class="budget-achieving-container">
    <div class="header">
      <i class="hidden iconfont icon-shezhi-mianxing" @click="drawer = true"></i>
      <el-select v-model="selectedTab">
        <el-option v-for="tab in tabList" :key="tab.label" :label="tab.label" :value="tab.value" />
      </el-select>
    </div>
    <iframe
      class="iframe"
      crossorigin="anonymous"
      ref="frame"
      :src="authUrl"
      frameborder="0"
    ></iframe>
    <SettingPanel v-model:visible="drawer" :default-value="tabList" @confirm="handleConfirm" />
  </div>
</template>

<script lang="ts" setup name="budgetAchieving">
  import SettingPanel from './components/SettingPanel.vue';

  const tabList = ref([
    {
      label: '周',
      value:
        'https://finebi.luteos.com/webroot/decision/v5/design/report/78af1b41deae41419693b4edeba72ba8/view',
      isDefault: 1,
    },
    {
      label: '月',
      value:
        'https://finebi.luteos.com/webroot/decision/v5/design/report/079d1c63e1794fc0a01a15a363171bf6/view',
      isDefault: 0,
    },
  ]);
  const selectedTab = ref(tabList.value[0].value);
  const currentOption = computed(() => {
    return tabList.value.find((tab) => tab.value === selectedTab.value);
  });
  const authUrl = computed(() => {
    return currentOption.value ? currentOption.value.value : '';
  });

  const drawer = ref(false);
  const handleConfirm = (value: any[]) => {
    tabList.value = value;
    const defaultOption = tabList.value.find((tab) => tab.isDefault === 1);
    if (defaultOption) {
      selectedTab.value = defaultOption.value;
    } else {
      selectedTab.value = tabList.value?.[0]?.value || '';
    }
  };
</script>

<style scoped lang="scss">
  .budget-achieving-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding-bottom: 10px;
  }
  .header {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    margin-top: 50px;
    margin-left: 22px;
    .el-select {
      width: 30px;
      height: 22px;
      :deep(.el-select__wrapper) {
        padding: 0;
        min-height: 22px;
        box-shadow: unset;
        --el-select-input-font-size: 12px;
        .el-select__placeholder {
          font-size: 12px;
        }
      }
    }
    .header-left,
    .header-right {
      display: flex;
      align-items: center;
    }
  }
  .iframe {
    width: 100%;
    display: block;
    overflow: auto;
    background-color: #fff;
  }
  .hidden {
    display: none;
  }
</style>
