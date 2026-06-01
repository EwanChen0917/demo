<template>
  <KeenList
    class="role-bind-panel"
    @refresh="runQuery"
    @reset-search="reset"
    @reset-search-by-key="
      (key) => {
        search[key] = undefined;
        runQuery(true);
      }
    "
  >
    <template #search>
      <div class="search-bar">
        <el-input
          v-model="search.keyword"
          placeholder="角色名称"
          clearable
          class="w-250"
          @input="triggerSearch"
          @keyup.enter="runQuery(true)"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-select
          v-model="search.platform"
          clearable
          filterable
          placeholder="选择所属平台"
          class="w-200"
          @change="triggerSearch"
        >
          <el-option
            v-for="item in platformOptions"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </div>
    </template>
    <template #buttons>
      <el-button type="primary" plain @click="openPermissionPreview">已勾选权限预览</el-button>
      <el-button type="primary" plain @click="openPreview">
        已勾选角色清单 ({{ selectedRoleCodes.length }})
      </el-button>
    </template>

    <template #default="{ tableHeight }">
      <div class="role-table" :style="{ height: tableHeight ? `${tableHeight - 12}px` : 'auto' }">
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :data="listData?.recordList || []"
          row-key="roleCode"
          class="table-row-dashed"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="44" reserve-selection />
          <el-table-column prop="roleName" label="角色名称" min-width="140" />
          <el-table-column prop="desc" label="角色说明" min-width="180" />
          <el-table-column label="角色所属平台" min-width="160">
            <template #default="{ row }">
              <el-tag
                v-for="item in row.platformList || []"
                :key="`${row.roleCode}-${item}`"
                size="small"
                class="mr-1"
              >
                {{ item.platformDesc }}
              </el-tag>
              <span v-if="!row.platformList || !row.platformList.length">--</span>
            </template>
          </el-table-column>
          <el-table-column prop="roleCode" label="角色Code" min-width="140" />
          <el-table-column label="创建人" min-width="120">
            <template #default="{ row }">
              {{ row.creatorName || '--' }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="150">
            <template #default="{ row }">
              {{ row.createTime || '--' }}
            </template>
          </el-table-column>
          <el-table-column label="角色状态" min-width="120">
            <template #default="{ row }">
              {{ row.statusDesc || '--' }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="toggleSelect(row)">
              {{ selectedRoleCodes.includes(row.roleCode) ? '取消选择' : '选择' }}
            </el-button>
          </template>
        </el-table-column> -->
        </el-table>
        <div class="role-pagination">
          <KeenPagination
            :current="current"
            :page-size="pageSize"
            :page-size-option="pageSizeOption"
            :total="total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </template>
  </KeenList>
  <el-dialog v-model="previewVisible" title="已勾选角色清单" width="520px">
    <div v-if="!selectedRoleCodes.length" class="preview-empty">暂无已勾选角色</div>
    <div v-else class="preview-tags">
      <span
        v-for="item in selectedRolePreviewList"
        :key="item.code"
        class="lite-tag"
        :title="item.name"
      >
        {{ item.name }}
      </span>
    </div>
    <template #footer>
      <el-button type="primary" @click="previewVisible = false">关闭</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="permissionPreviewVisible" title="已勾选权限预览" width="720px">
    <div v-if="!selectedRoleCodes.length" class="preview-empty">暂无已勾选角色</div>
    <div v-else-if="!permissionPlatformOptions.length" class="preview-empty">暂无可预览权限</div>
    <div v-else>
      <el-tabs
        v-model="permissionPreviewPlatform"
        tab-position="top"
        @tab-change="handlePermissionPlatformChange"
      >
        <el-tab-pane
          v-for="item in permissionPlatformOptions"
          :key="item.value"
          :label="item.desc"
          :name="item.value"
        >
          <template #label>
            {{ item.desc || item.value }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="preview-tree" v-loading="permissionPreviewLoading">
        <div v-if="!filteredPermissionTree.length" class="preview-empty">暂无已勾选权限</div>
        <el-tree
          v-else
          class="tree-border"
          :data="filteredPermissionTree"
          :default-expand-all="false"
          node-key="menuCode"
          :check-strictly="false"
          empty-text="暂无数据"
          :default-expanded-keys="permissionCheckedKeys"
          :props="{
            label: 'name',
            children: 'children',
          }"
        />
      </div>
    </div>
    <template #footer>
      <el-button type="primary" @click="permissionPreviewVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { useDebounceFn } from '@vueuse/core';
  import { isNil } from 'lodash-es';
  import { platformApi } from '@/api';
  import { fetchMenuModuleDict, fetchRolePage } from '../api';

  const emit = defineEmits(['update:selectedRoleCodes', 'preview']);

  const props = defineProps({
    selectedRoleCodes: {
      type: Array,
      default: () => [],
    },
    selectedRoleList: {
      type: Array,
      default: () => [],
    },
    selectedRoleNameMap: {
      type: Object,
      default: () => ({}),
    },
  });

  const platformOptions = ref([]);
  const getPlatformOptions = async () => {
    const res = await fetchMenuModuleDict();
    platformOptions.value = res?.dictMap?.menu_module || [];
  };
  getPlatformOptions();

  const tableRef = ref();

  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
  } = useList({
    searchDefaults: {
      keyword: undefined,
      platform: undefined,
    },
    interceptSearchData: (data) => ({
      ...data,
      platform: isNil(data.platform)
        ? undefined
        : typeof data.platform === 'object'
        ? data.platform.value
        : data.platform,
    }),
    pageSize: 10,
    service: fetchRolePage,
  });

  const syncing = ref(false);
  const previewVisible = ref(false);
  const permissionPreviewVisible = ref(false);
  const permissionPreviewLoading = ref(false);
  const permissionMenuTree = ref<any[]>([]);
  const permissionPreviewPlatform = ref('');
  const permissionPlatformOptions = ref<any[]>([]);
  const permissionCheckedKeys = ref<string[]>([]);
  const permissionCheckedSet = computed(() => new Set(permissionCheckedKeys.value));
  const filteredPermissionTree = computed(() =>
    filterMenuTree(permissionMenuTree.value || [], permissionCheckedSet.value)
  );
  const selectedRolePreviewList = computed(() => {
    const list = listData.value?.recordList || [];
    const map = new Map(list.map((item) => [item.roleCode, item.roleName]));
    props.selectedRoleList.forEach((item) => {
      if (item?.value && item?.desc) {
        map.set(item.value, item.desc);
      }
    });
    Object.entries(props.selectedRoleNameMap || {}).forEach(([code, name]) => {
      if (code && name) map.set(code, name);
    });
    return props.selectedRoleCodes.map((code) => ({
      code,
      name: map.get(code) || code,
    }));
  });

  const handleSelectionChange = (rows) => {
    if (syncing.value) return;
    const pageCodes = (listData.value?.recordList || []).map((item) => item.roleCode);
    const currentSelected = rows.map((item) => item.roleCode);
    const prevSelected = props.selectedRoleCodes || [];
    const merged = [
      ...prevSelected.filter((code) => !pageCodes.includes(code)),
      ...currentSelected,
    ];
    const nextNameMap = { ...(props.selectedRoleNameMap || {}) };
    rows.forEach((row) => {
      if (row?.roleCode && row?.roleName) {
        nextNameMap[row.roleCode] = row.roleName;
      }
    });
    emit('update:selectedRoleCodes', merged);
    emit('update:selectedRoleNameMap', nextNameMap);
  };

  watch(
    () => props.selectedRoleCodes,
    (val) => {
      syncing.value = true;
      nextTick(() => {
        const data = listData.value?.recordList || [];
        if (!tableRef.value) {
          syncing.value = false;
          return;
        }
        tableRef.value.clearSelection();
        data.forEach((row) => {
          if (val.includes(row.roleCode)) {
            tableRef.value.toggleRowSelection(row, true);
          }
        });
        nextTick(() => {
          syncing.value = false;
        });
      });
    },
    { immediate: true }
  );

  const reset = () => {
    resetSearch();
    runQuery(true);
  };

  const triggerSearch = useDebounceFn(() => {
    runQuery(true);
  }, 300);

  const openPreview = () => {
    previewVisible.value = true;
    emit('preview', props.selectedRoleCodes);
  };

  const rolePlatformMap = reactive<Record<string, any[]>>({});
  const normalizePlatformItem = (item) => {
    const value = item?.platform ?? item?.value ?? '';
    const desc = item?.platformDesc ?? item?.desc ?? value;
    if (!value) return null;
    return { value, desc };
  };
  const cacheRolePlatforms = (rows = []) => {
    rows.forEach((row) => {
      if (!row?.roleCode || !row?.platformList?.length) return;
      rolePlatformMap[row.roleCode] = row.platformList
        .map((item) => normalizePlatformItem(item))
        .filter(Boolean);
    });
  };
  const resolveRolePlatforms = async (roleCode) => {
    if (!roleCode) return [];
    if (rolePlatformMap[roleCode]) return rolePlatformMap[roleCode];
    try {
      // 兜底查询角色详情以获取平台列表
      const detail = await platformApi.platformRoleQueryDetail({ roleCode });
      const list = (detail?.selectedPlatformList || [])
        .map((item) => normalizePlatformItem(item))
        .filter(Boolean);
      rolePlatformMap[roleCode] = list;
      return list;
    } catch (error) {
      return [];
    }
  };
  const buildPermissionPlatforms = async () => {
    if (!props.selectedRoleCodes?.length) {
      permissionPlatformOptions.value = [];
      permissionPreviewPlatform.value = '';
      return;
    }
    // 按角色合并去重平台列表，作为权限预览的 Tab
    const map = new Map();
    for (const code of props.selectedRoleCodes) {
      const list = await resolveRolePlatforms(code);
      list.forEach((item) => {
        if (item?.value && !map.has(item.value)) {
          map.set(item.value, item.desc);
        }
      });
    }
    permissionPlatformOptions.value = Array.from(map.entries()).map(([value, desc]) => ({
      value,
      desc,
    }));
    if (
      permissionPlatformOptions.value.length &&
      !permissionPlatformOptions.value.some(
        (item) => item.value === permissionPreviewPlatform.value
      )
    ) {
      permissionPreviewPlatform.value = permissionPlatformOptions.value[0].value;
    }
    if (!permissionPlatformOptions.value.length) {
      permissionPreviewPlatform.value = '';
    }
  };
  const fetchRoleCheckedMenus = async (platform) => {
    const codes = props.selectedRoleCodes || [];
    if (!codes.length) return [];
    // 并行拉取各角色的已选菜单，再合并去重
    const tasks = codes.map(async (code) => {
      try {
        const res = await platformApi.platformRoleQueryMenu({
          platform,
          roleCode: code,
        });
        return res?.checkedMenuList || [];
      } catch (error) {
        return [];
      }
    });
    const results = await Promise.all(tasks);
    const merged = new Set<string>();
    results.forEach((list) => {
      list.forEach((item) => merged.add(item));
    });
    return Array.from(merged);
  };
  const loadPermissionPreview = async (platform) => {
    if (!platform) {
      permissionMenuTree.value = [];
      permissionCheckedKeys.value = [];
      return;
    }
    // 当前平台：菜单树 + 合并后的选中菜单
    permissionPreviewLoading.value = true;
    try {
      const [treeRes, checkedKeys] = await Promise.all([
        platformApi.platformMenuQueryMenuTree({
          platform,
          filterStatus: 1,
        }),
        fetchRoleCheckedMenus(platform),
      ]);
      permissionMenuTree.value = treeRes?.menuList || [];
      permissionCheckedKeys.value = checkedKeys;
    } finally {
      permissionPreviewLoading.value = false;
    }
  };
  const openPermissionPreview = async () => {
    permissionPreviewVisible.value = true;
    await buildPermissionPlatforms();
    if (permissionPreviewPlatform.value) {
      loadPermissionPreview(permissionPreviewPlatform.value);
    }
  };
  const handlePermissionPlatformChange = (platform) => {
    permissionPreviewPlatform.value = platform;
    loadPermissionPreview(platform);
  };

  watch(permissionPreviewVisible, (visible) => {
    if (!visible) {
      permissionCheckedKeys.value = [];
    }
  });

  const syncSelection = () => {
    syncing.value = true;
    console.log('[roleBindPanel] syncSelection start', {
      selectedRoleCodes: props.selectedRoleCodes,
      current,
      pageSize,
    });
    nextTick(() => {
      const data = listData.value?.recordList || [];
      const appliedCodes = data
        .filter((row) => props.selectedRoleCodes.includes(row.roleCode))
        .map((row) => row.roleCode);
      console.log('[roleBindPanel] syncSelection data', {
        recordListLength: data.length,
        recordListCodes: data.map((row) => row.roleCode),
      });
      if (!tableRef.value) {
        console.log('[roleBindPanel] syncSelection skipped: tableRef not ready');
        syncing.value = false;
        return;
      }
      tableRef.value.clearSelection();
      data.forEach((row) => {
        if (props.selectedRoleCodes.includes(row.roleCode)) {
          tableRef.value.toggleRowSelection(row, true);
        }
      });
      nextTick(() => {
        console.log('[roleBindPanel] syncSelection applied', {
          appliedCodes,
        });
        syncing.value = false;
      });
    });
  };

  onMounted(() => {
    runQuery();
  });

  watch(
    () => props.selectedRoleCodes,
    () => {
      if (permissionPreviewVisible.value) {
        buildPermissionPlatforms().then(() => {
          if (permissionPreviewPlatform.value) {
            loadPermissionPreview(permissionPreviewPlatform.value);
          }
        });
      }
    }
  );

  watch(
    () => listData.value?.recordList,
    (rows) => {
      cacheRolePlatforms(rows || []);
      syncSelection();
    }
  );

  function filterMenuTree(nodes = [], checkedSet: Set<string>) {
    return nodes.reduce((acc, node) => {
      const children = filterMenuTree(node.children || [], checkedSet);
      const isChecked = checkedSet.has(node.menuCode);
      if (isChecked || children.length) {
        acc.push({
          ...node,
          children,
        });
      }
      return acc;
    }, []);
  }

  defineExpose({
    syncSelection,
  });
</script>

<style scoped lang="scss">
  .role-bind-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
  }
  .role-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 360px;
  }
  :deep(.role-table .el-table) {
    flex: 1;
    height: auto !important;
    min-height: 0;
  }
  .role-pagination {
    padding: 12px 0;
    flex-shrink: 0;
    background: #fff;
    border-top: 1px solid #f5f7fa;
  }
  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .w-250 {
    width: 250px;
  }
  .w-200 {
    width: 200px;
  }
  .preview-link {
    text-align: right;
  }
  .mr-1 {
    margin-right: 4px;
  }
  .preview-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .preview-tree {
    max-height: 480px;
    min-height: 480px;
    overflow: auto;
    padding-top: 8px;
  }
  .preview-empty {
    color: #909399;
    font-size: 12px;
  }
  .lite-tag {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 8px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    border: 1px solid var(--el-color-success-light-7);
    background-color: var(--el-color-success-light-9);
    color: var(--el-color-success);
  }
</style>
