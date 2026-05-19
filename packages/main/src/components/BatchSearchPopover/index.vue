<template>
  <el-popover
    ref="batchSearchPopoverRef"
    trigger="click"
    placement="bottom-end"
    :offset="4"
    :show-arrow="false"
    :popper-style="{ padding: 0 }"
  >
    <template #default>
      <div class="batch-search">
        <el-input
          v-model="batchSearch"
          :placeholder="props.placeholder"
          type="textarea"
          :rows="10"
        />
      </div>
      <div class="batch-search-footer">
        <div class="clear" @click="handleClear"><span v-if="batchSearch">清空</span></div>
        <el-space :size="6">
          <el-button size="small" @click="batchSearchPopoverRef?.hide()">取消</el-button>
          <el-button size="small" type="primary" @click="handleSearch">搜索</el-button>
        </el-space>
      </div>
    </template>
    <template #reference>
      <i class="iconfont icon-piliangsousuo"></i>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { ElPopover } from 'element-plus';

  interface Props {
    placeholder?: string;
    /**
     * 严格限制的最大行数（为空或未传时不做限制）
     */
    maxLines?: number | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: '一行一项，按回车键换行，最多支持100行',
    maxLines: null,
  });

  const emit = defineEmits<{
    (event: 'search', val: string): void;
    (event: 'clear', val?: string): void;
  }>();

  const batchSearchPopoverRef = ref<InstanceType<typeof ElPopover> | null>(null);
  const batchSearch = ref<string>('');

  // 严格限制输入行数：当设置了 maxLines 时，实时裁剪多余行
  watch(batchSearch, (val) => {
    if (props.maxLines == null || props.maxLines <= 0) return;
    const lines = val.split(/\r?\n/);
    if (lines.length > props.maxLines) {
      batchSearch.value = lines.slice(0, props.maxLines).join('\n');
    }
  });

  const clear = () => {
    batchSearch.value = '';
  };
  const handleSearch = () => {
    if (batchSearch.value.trim()?.length === 0) {
      emit('search', batchSearch.value.trim());
    } else {
      emit('search', batchSearch.value.trim());
      batchSearchPopoverRef.value?.hide();
    }
  };

  const handleClear = () => {
    batchSearch.value = '';
    emit('clear');
  };

  defineExpose({
    clear,
  });
</script>

<style scoped lang="scss">
  .batch-search {
    width: 282px;
    padding: 10px 12px;
  }

  .batch-search-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border-top: 1px solid #f5f5f5;

    .clear {
      color: #999999;
      font-size: 12px;
      cursor: pointer;
    }
  }

  :deep(.el-textarea) {
    font-size: 12px;

    .el-textarea__inner {
      padding: 0;
      box-shadow: none;
    }
  }

  .icon-piliangsousuo {
    padding: 0 9px;
  }
</style>
