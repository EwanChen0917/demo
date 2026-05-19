<template>
  <el-popover
    v-model:visible="dropdownVisible"
    trigger="click"
    placement="bottom-start"
    :disabled="disabled"
    popper-class="warehouse-cascader-popper"
  >
    <template #reference>
      <el-input :model-value="displayText" :placeholder="placeholder" readonly style="width: 200px">
        <template #suffix>
          <el-icon v-if="clearable && hasValue" class="clear-icon" @click.stop="handleClear">
            <CircleClose />
          </el-icon>
        </template>
      </el-input>
    </template>
    <div class="cascader-dropdown">
      <div class="cascader-dropdown__header">
        <el-input v-model="keyword" placeholder="请输入仓库名称/编码" clearable />
        <el-button
          text
          type="primary"
          :disabled="disabled || !currentSelectableLeafValues.length"
          @click="handleToggleSelectAll"
        >
          {{ isAllCurrentChecked ? '取消全选' : '全选' }}
        </el-button>
      </div>
      <div class="cascader-dropdown__body">
        <el-cascader-panel
          ref="cascaderPanelRef"
          v-model="tempCascaderValue"
          :options="panelOptions"
          :props="cascaderProps"
          @change="handlePanelChange"
        >
          <template #default="{ data }">
            <OverflowTooltip :content="parseLabel(data)" :line="1">
              <span class="cascader-option-label">{{ parseLabel(data) }}</span>
            </OverflowTooltip>
          </template>
        </el-cascader-panel>
      </div>
      <div class="cascader-dropdown__footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
  import { CircleClose } from '@element-plus/icons-vue';

  type CascaderLeafValue = string | number;

  interface CascaderNode {
    disabled?: boolean;
    [key: string]: any;
  }

  interface CascaderCustomProps {
    value?: string;
    label?: string;
    children?: string;
    multiple?: boolean;
    emitPath?: boolean;
    checkStrictly?: boolean;
  }

  const props = withDefaults(
    defineProps<{
      modelValue?: CascaderLeafValue[];
      options?: CascaderNode[];
      props?: CascaderCustomProps;
      defaultFirstLevelValue?: CascaderLeafValue | null;
      defaultFirstLevelField?: string;
      placeholder?: string;
      disabled?: boolean;
      clearable?: boolean;
    }>(),
    {
      modelValue: () => [],
      options: () => [],
      props: () => ({
        value: 'value',
        label: 'label',
        children: 'children',
        multiple: true,
        emitPath: false,
        checkStrictly: false,
      }),
      defaultFirstLevelValue: null,
      defaultFirstLevelField: '',
      placeholder: '请选择仓库',
      disabled: false,
      clearable: true,
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: CascaderLeafValue[]): void;
    (e: 'change', value: CascaderLeafValue[]): void;
  }>();

  const cascaderValue = ref<CascaderLeafValue[]>([]);
  const tempCascaderValue = ref<CascaderLeafValue[]>([]);
  const cascaderPanelRef = ref<any>();
  const dropdownVisible = ref(false);
  const keyword = ref('');
  const debouncedKeyword = ref('');
  const syncingPanelValue = ref(false);
  const lastPanelValue = ref<CascaderLeafValue[]>([]);
  let keywordDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  const cascaderProps = computed(() => {
    return {
      ...(props.props ?? {}),
      multiple: true,
      emitPath: false,
      checkStrictly: false,
      disabled: 'disabled',
    };
  });

  const keyMap = computed(() => {
    return {
      label: cascaderProps.value?.label ?? 'label',
      value: cascaderProps.value?.value ?? 'value',
      children: cascaderProps.value?.children ?? 'children',
    };
  });

  const displayText = computed(() => {
    if (!cascaderValue.value.length) {
      return '';
    }
    return `已选 ${cascaderValue.value.length} 项`;
  });

  const hasValue = computed(() => {
    return cascaderValue.value.length > 0;
  });

  const normalizeValueKey = (value: unknown) => String(value ?? '');

  const isValidWarehouseCode = (value: unknown) => {
    return value !== null && value !== undefined && String(value).trim() !== '';
  };

  const normalizeLeafValues = (value: unknown) => {
    if (!Array.isArray(value)) {
      return [] as CascaderLeafValue[];
    }
    const uniqueMap = new Map<string, CascaderLeafValue>();
    value.forEach((item) => {
      if (!isValidWarehouseCode(item)) {
        return;
      }
      const key = normalizeValueKey(item);
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item as CascaderLeafValue);
      }
    });
    return Array.from(uniqueMap.values());
  };

  const parseLabel = (node: CascaderNode) => {
    const labelKey = keyMap.value.label;
    const valueKey = keyMap.value.value;
    const text = node?.[labelKey] ?? node?.[valueKey];
    return String(text ?? '');
  };

  const filterTree = (list: CascaderNode[], searchKey: string): CascaderNode[] => {
    if (!searchKey.trim()) {
      return list;
    }
    const lowerKey = searchKey.trim().toLowerCase();
    const valueKey = keyMap.value.value;
    const childrenKey = keyMap.value.children;
    return list
      .map((node) => {
        const children = Array.isArray(node?.[childrenKey]) ? node[childrenKey] : [];
        const nextChildren = filterTree(children, searchKey);
        const selfMatched = parseLabel(node).toLowerCase().includes(lowerKey);
        if (!selfMatched && !nextChildren.length) {
          return null;
        }
        const nextNode: CascaderNode = {
          ...node,
          [childrenKey]: nextChildren,
        };
        const isLeafNode = nextChildren.length === 0;
        const shouldDisable = isLeafNode && !isValidWarehouseCode(node?.[valueKey]);
        if (Boolean(node?.disabled) || shouldDisable) {
          nextNode.disabled = true;
        }
        return nextNode;
      })
      .filter((item): item is CascaderNode => Boolean(item));
  };

  const panelOptions = computed(() => {
    return filterTree(props.options ?? [], debouncedKeyword.value);
  });

  const getLeafValuesByTree = (tree: CascaderNode[]) => {
    const result: CascaderLeafValue[] = [];
    const valueKey = keyMap.value.value;
    const childrenKey = keyMap.value.children;
    const walk = (list: CascaderNode[]) => {
      list.forEach((node) => {
        if (node?.disabled) {
          return;
        }
        const children = Array.isArray(node?.[childrenKey]) ? node[childrenKey] : [];
        if (!children.length) {
          const currentValue = node?.[valueKey];
          if (isValidWarehouseCode(currentValue)) {
            result.push(currentValue as CascaderLeafValue);
          }
          return;
        }
        walk(children);
      });
    };
    walk(tree);
    return result;
  };

  const currentSelectableLeafValues = computed(() => {
    return normalizeLeafValues(getLeafValuesByTree(panelOptions.value));
  });

  const tempSelectedKeySet = computed(() => {
    return new Set(tempCascaderValue.value.map((value) => normalizeValueKey(value)));
  });

  const isAllCurrentChecked = computed(() => {
    if (!currentSelectableLeafValues.value.length) {
      return false;
    }
    return currentSelectableLeafValues.value.every((value) =>
      tempSelectedKeySet.value.has(normalizeValueKey(value))
    );
  });

  const getLeafPathsByTree = (tree: CascaderNode[]) => {
    const result: CascaderLeafValue[][] = [];
    const valueKey = keyMap.value.value;
    const childrenKey = keyMap.value.children;
    const walk = (list: CascaderNode[], parentPath: CascaderLeafValue[] = []) => {
      list.forEach((node) => {
        const currentValue = node?.[valueKey];
        const currentPath = [...parentPath, currentValue];
        const children = Array.isArray(node?.[childrenKey]) ? node[childrenKey] : [];
        if (!children.length) {
          if (isValidWarehouseCode(currentValue)) {
            result.push(currentPath as CascaderLeafValue[]);
          }
          return;
        }
        walk(children, currentPath as CascaderLeafValue[]);
      });
    };
    walk(tree);
    return result;
  };

  const expandToPath = (targetPath: CascaderLeafValue[]) => {
    if (!Array.isArray(targetPath) || !targetPath.length) {
      return;
    }
    const panel = cascaderPanelRef.value;
    const allNodes = panel?.getFlattedNodes?.(false) ?? [];
    const targetNode = allNodes.find((node: any) => {
      const nodePath = Array.isArray(node?.pathValues) ? node.pathValues : [];
      if (nodePath.length !== targetPath.length) {
        return false;
      }
      return nodePath.every(
        (value: CascaderLeafValue, index: number) => value === targetPath[index]
      );
    });
    if (!targetNode || !Array.isArray(panel?.menus) || !panel.menus.length) {
      return;
    }
    const rootMenu = panel.menus[0];
    const nextMenus = [rootMenu];
    let latestExpandingNode: any;
    targetNode.pathNodes.forEach((pathNode: any) => {
      if (!pathNode?.isLeaf && Array.isArray(pathNode?.children)) {
        nextMenus.push(pathNode.children);
        latestExpandingNode = pathNode;
      }
    });
    panel.menus = nextMenus;
    if ('expandingNode' in panel) {
      panel.expandingNode = latestExpandingNode;
    }
  };

  const expandToSearchResult = () => {
    if (!dropdownVisible.value || !debouncedKeyword.value.trim()) {
      return;
    }
    const firstMatchedPath = getLeafPathsByTree(panelOptions.value)[0];
    if (!firstMatchedPath?.length) {
      return;
    }
    const expandPath = firstMatchedPath.slice(0, 3);
    expandToPath(expandPath);
  };

  const handleChange = (value: CascaderLeafValue[]) => {
    emit('update:modelValue', value);
    emit('change', value);
  };

  const handlePanelChange = (value: unknown) => {
    if (syncingPanelValue.value) {
      return;
    }
    const normalizedValue = normalizeLeafValues(value);
    const isSearching = Boolean(debouncedKeyword.value.trim());
    if (!isSearching) {
      tempCascaderValue.value = normalizedValue;
      lastPanelValue.value = [...normalizedValue];
      return;
    }

    // 搜索态下只替换“当前命中范围”的选择，范围外已选项保持，保证结果可累加
    const currentSearchKeySet = new Set(
      currentSelectableLeafValues.value.map((item) => normalizeValueKey(item))
    );
    const remainedOutOfSearch = lastPanelValue.value.filter(
      (item) => !currentSearchKeySet.has(normalizeValueKey(item))
    );
    const selectedInSearch = normalizedValue.filter((item) =>
      currentSearchKeySet.has(normalizeValueKey(item))
    );
    const mergedValue = normalizeLeafValues([...remainedOutOfSearch, ...selectedInSearch]);

    syncingPanelValue.value = true;
    tempCascaderValue.value = mergedValue;
    lastPanelValue.value = [...mergedValue];
    nextTick(() => {
      syncingPanelValue.value = false;
    });
  };

  const handleConfirm = () => {
    const nextValue = normalizeLeafValues(tempCascaderValue.value);
    cascaderValue.value = nextValue;
    tempCascaderValue.value = [...nextValue];
    lastPanelValue.value = [...nextValue];
    handleChange(nextValue);
    dropdownVisible.value = false;
  };

  const handleCancel = () => {
    keyword.value = '';
    debouncedKeyword.value = '';
    tempCascaderValue.value = [...cascaderValue.value];
    lastPanelValue.value = [...cascaderValue.value];
    dropdownVisible.value = false;
  };

  const handleClear = () => {
    keyword.value = '';
    debouncedKeyword.value = '';
    cascaderValue.value = [];
    tempCascaderValue.value = [];
    lastPanelValue.value = [];
    handleChange([]);
  };

  const handleToggleSelectAll = () => {
    const currentValues = currentSelectableLeafValues.value;
    if (!currentValues.length) {
      return;
    }
    const currentValueKeySet = new Set(currentValues.map((value) => normalizeValueKey(value)));
    if (isAllCurrentChecked.value) {
      tempCascaderValue.value = tempCascaderValue.value.filter(
        (value) => !currentValueKeySet.has(normalizeValueKey(value))
      );
      lastPanelValue.value = normalizeLeafValues(tempCascaderValue.value);
      return;
    }
    tempCascaderValue.value = normalizeLeafValues([...tempCascaderValue.value, ...currentValues]);
    lastPanelValue.value = normalizeLeafValues(tempCascaderValue.value);
  };

  watch(
    () => props.modelValue,
    (value) => {
      const normalized = normalizeLeafValues(value);
      cascaderValue.value = normalized;
      if (!dropdownVisible.value) {
        tempCascaderValue.value = [...normalized];
      }
      lastPanelValue.value = [...normalized];
    },
    {
      immediate: true,
      deep: true,
    }
  );

  watch(dropdownVisible, (visible) => {
    if (!visible) {
      return;
    }
    keyword.value = '';
    debouncedKeyword.value = '';
    tempCascaderValue.value = [...cascaderValue.value];
    lastPanelValue.value = [...cascaderValue.value];
  });

  watch(
    keyword,
    (value) => {
      if (keywordDebounceTimer) {
        clearTimeout(keywordDebounceTimer);
      }
      keywordDebounceTimer = setTimeout(() => {
        debouncedKeyword.value = value;
      }, 300);
    },
    {
      immediate: true,
    }
  );

  watch(
    [debouncedKeyword, panelOptions, dropdownVisible],
    ([nextKeyword, , visible]) => {
      if (!visible || !nextKeyword.trim()) {
        return;
      }
      nextTick(() => {
        expandToSearchResult();
      });
    },
    {
      deep: true,
    }
  );

  onBeforeUnmount(() => {
    if (keywordDebounceTimer) {
      clearTimeout(keywordDebounceTimer);
    }
  });
</script>

<style scoped lang="scss">
  .clear-icon {
    color: var(--el-text-color-placeholder);
    cursor: pointer;
    font-size: 14px;
  }

  .clear-icon:hover {
    color: var(--el-color-primary);
  }

  :deep(.warehouse-cascader-popper) {
    width: max-content !important;
    max-width: 1000px;
  }

  .cascader-dropdown {
    width: fit-content;
    max-width: 1000px;
  }

  .cascader-dropdown__header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cascader-dropdown__header :deep(.el-input) {
    flex: 1;
  }

  .cascader-dropdown__body {
    max-height: 280px;
    max-width: 100%;
    overflow: auto;
  }

  .cascader-option-label {
    display: inline-block;
    max-width: 420px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .cascader-dropdown__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--el-border-color-light);
  }
</style>
