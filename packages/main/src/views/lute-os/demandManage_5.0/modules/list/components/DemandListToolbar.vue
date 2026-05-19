<template>
  <div class="dm5-toolbar">
    <el-form class="dm5-form">
      <div class="filter-layout">
        <div class="filter-grid">
          <div v-for="item in schemas" :key="item.key" class="filter-item">
            <el-form-item>
              <el-input
                v-if="item.component === 'input'"
                v-model="formModel[item.key]"
                :placeholder="item.placeholder"
                :clearable="item.clearable"
                class="filter-input"
                @clear="handleInputClear(item.key)"
              />
              <el-select
                v-else-if="item.component === 'member'"
                v-model="formModel[item.key]"
                :placeholder="item.placeholder"
                :clearable="item.clearable"
                :multiple="item.multiple"
                filterable
                collapse-tags
                collapse-tags-tooltip
                class="filter-input"
              >
                <el-option
                  v-for="member in deptMemberOptions"
                  :key="member.memberCode"
                  :label="member.name"
                  :value="member.memberCode"
                />
              </el-select>
              <el-select
                v-else
                v-model="formModel[item.key]"
                :placeholder="item.placeholder"
                :clearable="item.clearable"
                :multiple="item.multiple"
                filterable
                collapse-tags
                collapse-tags-tooltip
                class="filter-input"
              >
                <el-option
                  v-for="option in item.options || []"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="filter-actions">
          <el-button @click="emit('reset')">重置</el-button>
          <el-button type="success" icon="Plus" class="create-btn" @click="emit('create')">
            新增需求
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue';
  import { useDemandBaseInfoStore } from '../../../stores/useDemandBaseInfoStore';
  import type { DemandFilterForm } from '../../../types/workbench';
  import type { DemandFilterSchema } from '../../../hooks/useDemandFilters';

  const formModel = defineModel<DemandFilterForm>({ required: true });

  defineProps<{
    schemas: DemandFilterSchema[];
    total?: number;
  }>();

  const emit = defineEmits<{
    reset: [];
    create: [];
    keywordClear: [];
  }>();
  const demandBaseInfoStore = useDemandBaseInfoStore();
  const deptMemberOptions = computed(() => demandBaseInfoStore.deptMemberOptions);

  const handleInputClear = (key: keyof DemandFilterForm) => {
    if (key === 'keyword') {
      emit('keywordClear');
    }
  };

  onMounted(() => {
    demandBaseInfoStore.ensureDeptMemberOptions();
  });
</script>

<style scoped lang="scss">
  .dm5-toolbar {
    background: transparent;
    padding: 12px 0;
    position: relative;
    margin-bottom: 0;
  }

  .filter-layout {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: nowrap;
  }

  .filter-grid {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    min-width: 0;
  }

  .filter-item {
    flex: 1 1 0;
    min-width: 128px;
    max-width: 180px;

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .filter-input {
    width: 100% !important;

    :deep(.el-input__inner),
    :deep(.el-select__wrapper) {
      height: 32px;
      font-size: 13px;
    }
  }

  .filter-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;

    .el-button {
      padding: 6px 14px;
      height: 32px;
      font-size: 13px;
    }
  }

  .total-status {
    position: absolute;
    top: -30px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 400;
  }
</style>
