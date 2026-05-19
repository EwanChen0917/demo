<template>
  <div class="compare-info-container">
    <!-- 筛选区域 -->
    <div class="filter-area">
      <el-form :model="filterForm" label-width="76px" inline>
        <el-form-item label="快速筛选">
          <el-input v-model="filterForm.keyword" placeholder="请输入字段名、值或状态" clearable />
        </el-form-item>
        <el-form-item label="状态筛选">
          <el-space wrap>
            <el-badge
              :value="statusCounter[item.label] || undefined"
              v-for="item in [
                { label: '不一致', type: 'warning' },
                { label: '一致', type: 'success' },
                { label: '无需对比', type: 'info' },
              ]"
              :type="item.type"
              :key="item.label"
              :max="9999"
            >
              <el-tag
                :type="filterForm.status.includes(item.label) ? item.type : 'gray'"
                size="large"
                @click="handlerToggleStatus(item.label)"
              >
                {{ item.label }}
              </el-tag>
            </el-badge>
          </el-space>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="filter-result">
      <el-alert type="success" :closable="false">
        显示
        <template v-if="filterForm.status?.length === 1 || filterForm.status?.length === 2">
          <template v-for="(item, index) in filterForm.status">
            <span class="result-highlight">
              {{ item }}
            </span>
            <template v-if="index !== filterForm.status.length - 1">、</template>
          </template>
        </template>
        <span v-else>全部</span>
        字段
        <template v-if="filterForm.keyword">
          ，包含“
          <span class="result-highlight">{{ filterForm.keyword }}</span>
          ”
        </template>

        (共
        <span class="result-highlight">{{ filteredList.length }}</span>
        个)
      </el-alert>
    </div>
    <!-- 数据对比表格 -->
    <div class="table-area">
      <vxe-table
        :data="filteredList"
        :sort-config="{ defaultSort: { field: 'sortOrder', order: 'asc' } }"
        border
        highlight-hover-row
        height="460"
        class="border-line-table"
        :row-class-name="
          ({ row }) => {
            return row.status === '不一致' ? 'different-row' : '';
          }
        "
      >
        <vxe-column field="filedName" title="字段" />
        <vxe-column field="value" title="源系统值" />
        <vxe-column field="targetValue" title="目标系统值" />
        <vxe-column field="status" title="是否一致" sortable>
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row)">
              {{ row.status }}
            </el-tag>
          </template>
        </vxe-column>
        <vxe-column field="secondUniqueCode" title="行标识" sortable/>
      </vxe-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';

  const props = defineProps({
    list: {
      type: Array,
      required: true,
    },
  });

  // 筛选条件
  const filterForm = reactive({
    keyword: '',
    status: ['不一致', '一致', '无需对比'],
  });

  // 状态筛选切换
  const toggleStatus = (status: string) => {
    if (filterForm.status.includes(status)) {
      filterForm.status = filterForm.status.filter((s) => s !== status);
    } else {
      filterForm.status.push(status);
    }
    handleFilter();
  };

  // 重置筛选
  const resetFilter = () => {
    filterForm.keyword = '';
    filterForm.status = ['不一致', '一致', '无需对比'];
    handleFilter();
  };

  const handlerToggleStatus = (name: string) => {
    const index = filterForm.status.indexOf(name);
    if (index > -1) {
      filterForm.status.splice(index, 1);
    } else {
      filterForm.status.push(name);
    }
  };

  // 处理筛选
  const handleFilter = () => {
    // 触发 computed 重新计算
  };

  // 处理数据并添加状态字段
  const processedData = computed(() => {
    return props.list.map((item: any) => {
      let status = '无需对比';
      let sortOrder = 2; // 无需对比

      // 根据 compareResultType 判断状态
      if (item.compareResultType === 'different') {
        status = '不一致';
        sortOrder = 0;
      } else if (item.compareResultType === 'same') {
        status = '一致';
        sortOrder = 1;
      } else if (item.compareResultType === 'inexistence') {
        status = '无需对比';
        sortOrder = 2;
      }

      return {
        ...item,
        status,
        sortOrder,
      };
    });
  });

  const statusCounter = computed(() => {
    const counter: { [key: string]: number } = {};
    processedData.value.forEach((item) => {
      if (!counter[item.status]) {
        counter[item.status] = 1;
      } else {
        counter[item.status]++;
      }
    });
    return counter;
  });
  // 筛选后的列表
  const filteredList = computed(() => {
    return processedData.value.filter((item: any) => {
      // 状态筛选
      if (filterForm.status.length) {
        if (!filterForm.status.includes(item.status)) {
          return false;
        }
      }

      // 关键词筛选
      if (filterForm.keyword) {
        const keyword = filterForm.keyword.toLowerCase();
        const searchKeys = ['filedName', 'value', 'targetValue', 'status'];
        return searchKeys.some((key) => {
          return item[key] && item[key].toLowerCase().includes(keyword);
        });
      }

      return true;
    });
  });

  // 获取状态标签类型
  const getStatusTagType = (row: any) => {
    switch (row.status) {
      case '不一致':
        return 'warning';
      case '一致':
        return 'success';
      case '无需对比':
        return 'info';
      default:
        return '';
    }
  };
</script>

<style scoped lang="scss">
  .compare-info-container {
    .filter-area {
      padding: 16px 12px 6px 3px;
      border-radius: 4px;

      :deep(.el-form-item) {
        margin-bottom: 0;
        margin-right: 10px;
      }

      :deep(.el-tag) {
        cursor: pointer;
        user-select: none;
      }
    }

    .filter-result {
      padding: 8px 16px;

      .result-highlight {
        font-weight: bolder;
        color: #10945c;
      }
    }

    .table-area {
      padding: 0 16px;

      :deep(.different-row) {
        background-color: var(--el-color-warning-light-9);
        color: var(--el-color-warning);
        font-weight: bolder;
      }
    }

    :deep(.el-badge__content) {
      top: 8px !important;
      right: 15px !important;
      font-family: initial;
    }

    :deep(.el-tag--gray) {
      border-color: #ededed;
      background-color: #fff;
      color: #999;
    }

    :deep(.el-tag--info) {
      border-color: #ccc;
      background-color: #ededed;
      color: #666;
    }

    :deep(.el-tag--success) {
      border-color: var(--el-color-primary);
    }

    :deep(.el-tag--warning) {
      border-color: var(--el-color-warning);
    }
  }
</style>