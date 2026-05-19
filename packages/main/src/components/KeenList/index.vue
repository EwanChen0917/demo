<template>
  <div class="list-container">
    <div v-if="$slots.search || $slots.filters" class="list-search-wrapper">
      <div v-if="$slots.search" class="search-content">
        <slot name="search"></slot>
      </div>
      <!--        其他搜索条件-->
      <slot v-if="$slots.filters" name="filters"></slot>
      <!--        更多筛选-->
      <el-popover
        v-if="$slots['more-filter']"
        ref="filterPopoverRef"
        :offset="4"
        :hide-after="0"
        placement="bottom"
        trigger="click"
        :show-arrow="false"
        :popper-style="{ borderRadius: '10px', padding: 0 }"
      >
        <template #default>
          <el-form label-width="100" label-position="top">
            <div class="more-filter-content">
              <slot name="more-filter"></slot>
            </div>
          </el-form>
          <!--            一期注释掉-->
          <!--            <div class="more-filter-footer">
                          <el-button @click="filterPopoverRef?.hide()">取消</el-button>
                          <el-button type="primary">确定</el-button>
                        </div>-->
        </template>
        <template #reference>
          <el-button style="padding: 9px">
            <i class="iconfont icon-shaixuan"></i>
            更多筛选
          </el-button>
        </template>
      </el-popover>
      <slot name="custom-slot"></slot>
      <el-button
        @click="emits('resetSearch')"
        v-bind="resetBtnOptions"
        type="info"
        class="new-custom"
      >
        重置
      </el-button>
      <slot name="search-actions"></slot>
    </div>
    <!--      展示查询条件-->
    <div v-if="searchList?.length" class="selected-list">
      <div v-for="item in searchList" :key="item?.key" class="item">
        <OverflowTooltip
          :content="`${item?.label}：${
            Array.isArray(item?.value) ? item?.value?.join(',') : item?.value
          }`"
          :line="1"
          :font-size="12"
          color="#02B96B"
        />
        <i class="iconfont icon-guanbi" @click="emits('resetSearchByKey', item?.key)"></i>
      </div>
      <div class="clear" @click="emits('clearAll')">清除全部</div>
    </div>
    <!--        操作按钮-->
    <div class="actions">
      <div class="buttons">
        <slot name="buttons"></slot>
        <div v-if="selectedNum" class="select-num">
          已选
          <span class="num">{{ selectedNum }}</span>
          条
        </div>
      </div>
      <div class="head-tools">
        <slot name="tools-prepend"></slot>
        <span v-if="$slots['tools-prepend']" class="split-line"></span>
        <el-tooltip content="刷新" placement="top">
          <i class="iconfont Root-tyicon icon-Root-tyshuaxin-1" @click="emits('refresh')"></i>
        </el-tooltip>
        <el-tooltip trigger="hover" content="导出" placement="top">
          <el-popover
            v-if="$slots['export-list']"
            trigger="click"
            placement="left-start"
            :show-arrow="false"
            :offset="6"
            :popper-style="{ borderRadius: '4px' }"
          >
            <template #default>
              <div class="batch-list">
                <div
                  v-if="exportCustomFieldsToUse"
                  class="batch-list-item"
                  @click="customExportDialogRef?.open('导出列表订单')"
                >
                  导出列表订单
                </div>
                <slot name="export-list"></slot>
              </div>
            </template>
            <template #reference>
              <i class="iconfont icon-xiazai"></i>
            </template>
          </el-popover>
          <i
            v-else-if="exportCustomFieldsToUse"
            class="iconfont icon-xiazai"
            @click="customExportDialogRef?.open"
          ></i>
        </el-tooltip>
        <el-tooltip v-if="customFieldsToUse" content="自定义字段" placement="top">
          <i
            class="iconfont icon-zidingyilieheziduan custom-col"
            @click="selectPropertyRef.open()"
          ></i>
        </el-tooltip>
        <el-tooltip v-if="fullscreen" content="退出全屏" placement="top">
          <i
            class="iconfont icon-shouqiquanping"
            @click="
              toggleFullscreen();
              setTableHeight();
            "
          ></i>
        </el-tooltip>
        <el-tooltip v-else content="全屏查看" placement="top">
          <i
            class="iconfont icon-quanping"
            @click="
              toggleFullscreen();
              setTableHeight();
            "
          ></i>
        </el-tooltip>
        <slot name="tools-append"></slot>
      </div>
    </div>
    <!--    表格-->
    <div class="list-table" ref="tableWrap">
      <slot :tableHeight="tableHeight"></slot>
      <slot name="columnResizer"></slot>
    </div>
  </div>
  <SelectProperty
    ref="selectPropertyRef"
    title="自定义表格设置"
    :width="748"
    bindClass="custom-col"
    moduleType="list"
    :conditionCode="conditionCodeToUse"
    :property-list-prop="cloneDeep(customFieldsToUse)"
    :itemType="itemTypeToUse"
    @success="handleCustomFieldsSaved"
  />
  <CustomExportDialog
    ref="customExportDialogRef"
    :custom-export-fields="exportCustomFieldsToUse"
    :conditionCode="exportConditionCodeToUse"
    :params="params"
    :export-service="exportService"
    @refresh-custom-fields="handleExportCustomFieldsSaved"
  />
</template>

<script setup lang="ts">
  import SelectProperty from '@/views/supplyChainManage/B2BOrder/orderManage/components/SelectProperty.vue';
  import { cloneDeep } from 'lodash-es';
  import { useStore } from '@/store/modules/useStore';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePlatformCustomFields } from '@/hooks/customFields/usePlatformCustomFields';

  const emits = defineEmits<{
    (event: 'resetSearch'): void;
    (event: 'refresh'): void;
    (event: 'export'): void;
    (event: 'refreshCustomFields'): void;
    (event: 'refreshExportCustomFields'): void;
    (event: 'update:conditionCode', value?: string): void;
    (event: 'update:customFields', value?: any[]): void;
    (event: 'update:exportConditionCode', value?: string): void;
    (event: 'update:customExportFields', value?: any[]): void;
    (event: 'update:hideList', value?: string[]): void;
    (event: 'clearAll'): void;
    (event: 'resetSearchByKey', key: string): void;
  }>();

  const props = defineProps<{
    selectedNum?: number;
    conditionCode?: string;
    exportConditionCode?: string;
    customFields?: any[]; // 自定义列表字段
    customExportFields?: any[]; // 自定义导出字段
    customFieldsBase?: any[]; // 自定义列表字段（默认定义，用于自动获取）
    customExportFieldsBase?: any[]; // 自定义导出字段（默认定义，用于自动获取）
    customFieldsItemType?: any; // 默认 route.name（支持传入覆盖）
    customFieldsPlatform?: string; // 默认 lute_erp
    autoCustomFields?: boolean; // 开启后 KeenList 内部自动获取 list/export 自定义字段
    params?: any; // 列表查询参数
    exportService?: any; // 导出接口
    selectedList?: any; // 查询条件
    customHeight?: boolean; // 自定义高度
    resetBtnOptions?: Record<string, any>; // 重置按钮配置项
  }>();

  const store = useStore();
  const route = useRoute();
  const { toggleFullscreen } = store;
  const fullscreen = computed(() => store.fullscreen);

  const MIN_HEIGHT = 350;
  // 表格高度
  const tableHeight = ref();

  // 更多筛选弹窗
  const filterPopoverRef = ref();
  // 自定义字段弹窗
  const selectPropertyRef = ref();
  // 自定义导出弹窗
  const customExportDialogRef = ref();
  // 表格容器
  const tableWrap = ref();

  // 筛选弹窗条件
  const searchList = computed(() => {
    return props.selectedList?.filter((k) =>
      Array.isArray(k.value) ? k.value?.length > 0 : k.value
    );
  });

  const shouldAutoCustomFields = computed(() => {
    if (!props.autoCustomFields) return false;
    return !!props.customFieldsBase;
  });
  const shouldAutoExportCustomFields = computed(() => {
    if (!props.autoCustomFields) return false;
    return !!props.customExportFieldsBase;
  });

  const itemTypeToUse = computed(() => props.customFieldsItemType ?? route?.name);
  const platformToUse = computed(() => props.customFieldsPlatform ?? 'lute_erp');

  const listCustom = usePlatformCustomFields({
    platform: platformToUse.value,
    moduleType: 'list',
    itemType: itemTypeToUse,
    baseFields: computed(() => props.customFieldsBase || []),
    pageSize: 1,
    pageNum: 1,
  });
  const exportCustom = usePlatformCustomFields({
    platform: platformToUse.value,
    moduleType: 'export',
    itemType: itemTypeToUse,
    baseFields: computed(() => props.customExportFieldsBase || []),
    pageSize: 1,
    pageNum: 1,
  });

  const conditionCodeToUse = computed(() => {
    return shouldAutoCustomFields.value ? listCustom.conditionCode.value : props.conditionCode;
  });
  const customFieldsToUse = computed(() => {
    return shouldAutoCustomFields.value ? listCustom.fieldList.value : props.customFields;
  });
  const exportConditionCodeToUse = computed(() => {
    return shouldAutoExportCustomFields.value
      ? exportCustom.conditionCode.value
      : props.exportConditionCode;
  });
  const exportCustomFieldsToUse = computed(() => {
    return shouldAutoExportCustomFields.value
      ? exportCustom.fieldList.value
      : props.customExportFields;
  });

  const handleCustomFieldsSaved = async () => {
    if (shouldAutoCustomFields.value) {
      await listCustom.refresh();
      emits('update:conditionCode', listCustom.conditionCode.value ?? undefined);
      emits('update:customFields', listCustom.fieldList.value ?? undefined);
      emits('update:hideList', listCustom.hideList.value ?? undefined);
    }
    emits('refreshCustomFields');
  };
  const handleExportCustomFieldsSaved = async () => {
    if (shouldAutoExportCustomFields.value) {
      await exportCustom.refresh();
      emits('update:exportConditionCode', exportCustom.conditionCode.value ?? undefined);
      emits('update:customExportFields', exportCustom.fieldList.value ?? undefined);
      emits('update:hideList', exportCustom.hideList.value ?? undefined);
    }
    emits('refreshExportCustomFields');
  };

  const setTableHeight = () => {
    const dialog = document.querySelector('.el-dialog');
    if (dialog?.querySelector('.el-table')) return;
    requestAnimationFrame(() => {
      const tableTop = tableWrap.value?.getBoundingClientRect?.()?.top;
      const height = Math.max(window.innerHeight - tableTop - 72, MIN_HEIGHT);
      tableHeight.value = height;
      const table = tableWrap.value?.getElementsByClassName('el-table')[0];
      if (table?.offsetHeight < height && props.customHeight) return;
      if (table) {
        table.setAttribute('style', `height: ${height}px`);
      }
    });
  };

  onMounted(() => {
    setTableHeight();
    if (shouldAutoCustomFields.value) {
      listCustom.refresh().then(() => {
        emits('update:conditionCode', listCustom.conditionCode.value ?? undefined);
        emits('update:customFields', listCustom.fieldList.value ?? undefined);
        emits('update:hideList', listCustom.hideList.value ?? undefined);
      });
    }
    if (shouldAutoExportCustomFields.value) {
      exportCustom.refresh().then(() => {
        emits('update:exportConditionCode', exportCustom.conditionCode.value ?? undefined);
        emits('update:customExportFields', exportCustom.fieldList.value ?? undefined);
        emits('update:hideList', listCustom.hideList.value ?? undefined);
      });
    }

    const container = document.querySelector('.el-main') as HTMLElement;
    const listContainer = document.querySelector('.list-container') as HTMLElement;
    if (!container && !listContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container || entry.target === listContainer) {
          setTableHeight();
        }
      }
    });

    resizeObserver.observe(container);
    resizeObserver.observe(listContainer);

    onUnmounted(() => {
      resizeObserver.unobserve(container);
      resizeObserver.unobserve(listContainer);
      resizeObserver.disconnect();
    });
  });
</script>

<style lang="scss" scoped>
  .list-container {
    :deep(.el-button + .el-button) {
      margin-left: 0;
    }
    :deep(.new-custom) {
      border-radius: 4px;
      background: var(---N3, #eff0f0);
      color: var(--Grey-grey-9, #1e2226);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      border: 1px solid var(---N3, #eff0f0);
      &:hover {
        background-color: var(---N4);
      }
    }
  }

  .list-search-wrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 12px 16px;

    :deep(.el-select) {
      width: 160px;
    }

    .search-content {
      :deep(.el-input) {
        width: 250px;
      }
    }

    .icon-shaixuan {
      color: inherit;
    }
  }

  .selected-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 0 16px 10px 16px;

    .item {
      max-width: 250px;
      display: inline-flex;
      padding: 0 4px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      color: var(--el-color-primary);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      border-radius: 4px;
      background: var(---P1, #e8fff1);

      .icon-guanbi {
        font-size: 12px;
        color: #999999;
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .clear {
      padding: 0 6px;
      color: #999999;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    gap: 8px;
    flex-wrap: wrap;

    .buttons {
      display: flex;
      align-items: center;
      gap: 8px;

      .select-num {
        margin-left: 12px;
        color: var(---N8, #666);
        /* 较弱/Regular 12 */
        font-size: 12px;
        line-height: 20px; /* 166.667% */
        .num {
          color: var(--el-color-primary);
        }
      }
    }

    .head-tools {
      display: flex;
      align-items: center;
      gap: 16px;

      .iconfont,
      .Root-tyicon {
        color: #666666;
        cursor: pointer;
      }

      .split-line {
        width: 1px;
        height: 16px;
        background-color: #dedede;
      }
    }
  }

  .more-filter-content {
    max-width: 684px;
    display: flex;
    gap: 18px 16px;
    flex-wrap: wrap;
    padding: 16px 20px 20px 20px;

    :deep(.el-form-item__label) {
      font-size: 13px;
      margin-bottom: 6px;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
    }

    :deep(.el-form-item__content) {
      width: 204px;
      line-height: unset;
    }
  }

  .more-filter-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 10px 20px;
    border-top: 1px solid #f5f5f5;
  }

  .list-table {
    position: relative;
    margin: 0 16px;
    background-color: #fff;
    border-radius: 10px;
  }

  :deep(.el-input-group__append) {
    padding: 0;
  }

  /*:deep(.el-date-editor) {
    flex-grow: unset;
  }*/
</style>

<style lang="scss">
  .batch-list {
    padding: 4px 0;

    &-item {
      padding: 5px 12px;
      font-size: 13px;
      line-height: 22px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
      }
    }
  }
</style>
