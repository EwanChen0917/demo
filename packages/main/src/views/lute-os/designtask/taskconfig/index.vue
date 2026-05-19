<template>
  <div class="task-config-wrapper">
    <div class="config-top-area">
      <div class="tab-header pt-2 pb-2">
        <el-radio-group v-model="selectType" @change="handleTabChange" class="premium-tabs">
          <el-radio-button v-for="item in selectTypeList" :key="item.type" :label="item.type">
            {{ item.text }}
          </el-radio-button>
          <el-radio-button :label="3">审批流配置</el-radio-button>
        </el-radio-group>
      </div>
      <div class="designer-nav mt-3" v-if="currentItem.isShowItem && !showApprovalFlowList">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold mb-0"
        >
          <li
            class="nav-item"
            v-for="(nav, index) in projectList"
            :key="index"
            @click="handleNavClick(nav.type)"
          >
            <span
              :class="[
                'nav-link',
                'custom-nav-link',
                'py-4',
                'me-6',
                currentItem.itemType === nav.type ? 'active' : '',
              ]"
            >
              {{ nav.text }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <KeenList @refresh="handleKeenRefresh" @reset-search="handleKeenResetSearch">
      <template #search v-if="!showApprovalFlowList">
        <el-input
          v-model="currentItem.name"
          :placeholder="currentItem.placeholder"
          @keyup.enter="runQuery"
          clearable
          style="width: 240px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>

      <template #search-actions v-if="!showApprovalFlowList">
        <el-button type="primary" @click="runQuery">查询</el-button>
      </template>

      <template #buttons>
        <el-space>
          <template v-if="showApprovalFlowList">
            <el-button class="button" type="primary" @click="openApprovalFlowDrawerForAdd">
              新增
            </el-button>
          </template>
          <template v-else>
            <el-button class="button" type="primary" @click="addConfig">新增</el-button>
          </template>
        </el-space>
      </template>
      <template #default="{ tableHeight }">
        <div class="my-table">
          <el-table
            v-if="showApprovalFlowList"
            v-loading="approvalFlowListLoading"
            :data="approvalFlowList"
            :height="tableHeight"
          >
            <el-table-column prop="itemTypeDesc" label="任务类型" min-width="120" />
            <el-table-column label="部门" min-width="160">
              <template #default="{ row }">
                <overflowTooltip :content="row.deptDesc" :line="2" />
              </template>
            </el-table-column>
            <el-table-column label="审批人" min-width="160">
              <template #default="{ row }">
                <overflowTooltip :content="row.approverDesc" :line="2" />
              </template>
            </el-table-column>
            <el-table-column label="状态" min-width="100">
              <template #default="{ row }">
                <Tag size="large" :color="row.status === 1 ? 'green' : 'red'">
                  {{ row.statusDesc || (row.status === 1 ? '启用' : '禁止') }}
                </Tag>
              </template>
            </el-table-column>
            <el-table-column prop="creatorDesc" label="创建人" min-width="120" />
            <el-table-column prop="updateTime" label="更新时间" min-width="180" />
            <el-table-column label="操作" min-width="100">
              <template #default="{ row }">
                <KeenActions
                  :actions="[
                    {
                      label: '编辑',
                      key: 'edit',
                      type: 'primary',
                      text: true,
                      row,
                    },
                  ]"
                  @click="handleApprovalActions"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-else
            ref="tableRef"
            v-loading="listLoading"
            :data="currentItem.list"
            :height="tableHeight"
          >
            <template v-if="selectType === 1">
              <template v-if="+currentItem.itemType < 6">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="serialCode" label="编号" />
                <el-table-column prop="score" label="分数" />
              </template>
              <template v-else>
                <el-table-column prop="name" label="设计任务名称" />
                <el-table-column prop="typeName" label="任务类别" />
                <el-table-column prop="projectLevelName" label="项目等级" />
                <el-table-column prop="score" label="分数" />
                <el-table-column prop="designPeriod" label="设计周期" />
              </template>
            </template>
            <template v-if="selectType === 2">
              <el-table-column prop="name" label="分组" />
              <el-table-column prop="designers" label="设计师" v-if="+currentItem.itemType < 6" />
            </template>
            <el-table-column label="状态">
              <template #default="scope">
                <Tag size="large" color="blue" class="mb-10">
                  {{ scope.row.status === 0 ? '禁用' : '启用' }}
                </Tag>
              </template>
            </el-table-column>
            <el-table-column label="时间">
              <template #default="scope">
                <div>创建 {{ scope.row.createTime || '--' }}</div>
                <div>更新 {{ scope.row.updateTime || '--' }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <KeenActions
                  :actions="[
                    {
                      label: '编辑',
                      key: 'edit',
                      type: 'primary',
                      text: true,
                      row: scope.row,
                    },
                  ]"
                  @click="handleActions"
                />
              </template>
            </el-table-column>
          </el-table>
          <KeenPagination
            v-if="showApprovalFlowList"
            :current="approvalFlowCurrent"
            :page-size="approvalFlowPageSize"
            :page-size-option="pageSizeOption"
            :total="approvalFlowTotal"
            @size-change="handleApprovalPageSizeChange"
            @current-change="handleApprovalCurrentChange"
          />
          <KeenPagination
            v-else
            :current="currentItem.current"
            :page-size="currentItem.pageSize"
            :page-size-option="pageSizeOption"
            :total="currentItem.total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </KeenList>
    <ApprovalFlowDrawer
      ref="approvalFlowDrawerRef"
      :item-type-options="approvalFlowItemTypeOptions"
      @saved="handleApprovalSaved"
    />
  </div>
</template>

<script lang="ts" setup name="designtaskconfig">
  import { designApi } from '@/api/index';
  import { keyBy } from 'lodash-es';
  import ApprovalFlowDrawer from './components/ApprovalFlowDrawer.vue';
  import { itemTypeList } from '../config/index';

  interface ItemTypeOption {
    text: string;
    type: number;
  }

  const router = useRouter();

  // 当前配置项
  const selectType = ref(1);
  const listLoading = ref(false);
  // 配置列表
  const selectTypeList = ref([
    {
      id: 'designScoreCode',
      text: '设计分数配置',
      type: 1,
      placeholder: '任务名称',
      name: '',
      isShowItem: 1,
      itemType: 12,
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      api: 'luteosDesignScoreQueryDesignScoreList',
      resKey: 'designScoreList',
      editPath: '/designtaskconfig/score/edit',
    },
    {
      id: 'operatorGroupCode',
      text: '类型配置及通知',
      type: 2,
      placeholder: '分组名称',
      name: '',
      isShowItem: 1,
      itemType: 12,
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      api: 'luteosDesignOperationQueryDesignOperationGroupList',
      resKey: 'designOperationGroupList',
      editPath: '/designtaskconfig/notice/edit',
    },
  ]);
  // 当前配置
  const currentItem = computed(() => {
    const data: any = {};
    return (
      selectTypeList.value.find((item) => {
        return item.type === selectType.value;
      }) || data
    );
  });
  // 项目类型
  const baseItemTypeList = itemTypeList.map((item) => ({ ...item }));
  const projectList = ref([...baseItemTypeList]);
  const itemTypeTextMap = ref<Record<number, string>>({});
  const approvalFlowItemTypeOptionsRaw = ref<ItemTypeOption[]>(
    itemTypeList
      .filter((item) => item.type !== 99)
      .map((item) => ({ text: item.text, type: item.type }))
  );
  const hasSecondStageItemTypeAuth = ref(true);
  const approvalFlowItemTypeOptions = computed(() => {
    if (hasSecondStageItemTypeAuth.value) {
      return approvalFlowItemTypeOptionsRaw.value;
    }
    const firstStageItemTypeList = itemTypeList.slice(1, 5).map((item) => item.type);
    return approvalFlowItemTypeOptionsRaw.value.filter((item) =>
      firstStageItemTypeList.includes(item.type)
    );
  });
  const approvalFlowItemTypeMap = computed(() => {
    return approvalFlowItemTypeOptions.value.reduce((prev, item) => {
      prev[item.type] = item.text;
      return prev;
    }, {} as Record<number, string>);
  });
  const approvalFlowDrawerRef = ref<any>();
  const tableRef = ref();
  const designTaskApi = designApi as any;
  const showApprovalFlowList = ref(false);
  const approvalFlowListLoading = ref(false);
  const approvalFlowList = ref<any[]>([]);
  const approvalFlowTotal = ref(0);
  const approvalFlowCurrent = ref(1);
  const approvalFlowPageSize = ref(10);
  const callDesignTaskApi = (methodName: string, payload?: any) =>
    designTaskApi[methodName](payload);

  const rebuildProjectList = () => {
    let nextList = baseItemTypeList.map((item) => ({
      ...item,
      text: itemTypeTextMap.value[item.type] || item.text,
    }));
    if (!hasSecondStageItemTypeAuth.value) {
      nextList = nextList.slice(0, 5);
    }
    projectList.value = nextList;
  };

  const queryDesignItemTypeAuth = async () => {
    const res: any = await designApi.luteosDesignQueryDesignItemTypeAuth({});
    hasSecondStageItemTypeAuth.value = +res.secondStageItemTypeAuth !== 0;
    rebuildProjectList();
  };
  const queryApprovalFlowItemTypeOptions = async () => {
    try {
      const res: any = await designApi.luteosDesignQueryDesignTaskItemType02List({});
      const itemTypeOptions = (res.itemTypeList || []).map((item: any) => ({
        text: item.itemTypeName,
        type: item.itemType,
      }));
      const itemTypeMap = keyBy(res.itemTypeList || [], 'itemType');
      itemTypeTextMap.value = Object.keys(itemTypeMap).reduce(
        (prev, key) => ({
          ...prev,
          [Number(key)]: itemTypeMap[key].itemTypeName,
        }),
        {} as Record<number, string>
      );
      if (itemTypeOptions.length) {
        approvalFlowItemTypeOptionsRaw.value = itemTypeOptions;
      }
    } catch {}
    rebuildProjectList();
  };
  queryDesignItemTypeAuth();
  queryApprovalFlowItemTypeOptions();

  const pageSizeOption = ref([10, 20, 50, 100]);
  const handleKeenRefresh = () => {
    if (showApprovalFlowList.value) {
      queryApprovalFlowList();
      return;
    }
    runQuery();
  };
  const handleKeenResetSearch = () => {
    if (showApprovalFlowList.value) {
      approvalFlowCurrent.value = 1;
      queryApprovalFlowList();
      return;
    }
    reset();
  };

  // 配置切换
  const handleTabChange = (type) => {
    selectType.value = type;
    if (type === 3) {
      showApprovalFlowListPanel();
      return;
    }
    showApprovalFlowList.value = false;
    nextTick(() => {
      runQuery();
    });
  };

  // tab切换
  const handleNavClick = (type) => {
    currentItem.value.itemType = type;
    nextTick(() => {
      runQuery();
    });
  };

  // 页数切换
  const handlePageSizeChange = (val) => {
    currentItem.value.pageSize = val;
    runQuery();
  };

  // 页码切换
  const handleCurrentChange = (val) => {
    currentItem.value.current = val;
    runQuery();
  };

  // 按钮操作
  const handleActions = (data) => {
    const { key, row } = data;
    // 编辑
    if (key === 'edit') {
      setSearchSessionStorage();
      const id = row[currentItem.value.id];
      router.push(`${currentItem.value.editPath}?id=${id}&itemType=${currentItem.value.itemType}`);
    }
  };
  // 新增
  const addConfig = () => {
    setSearchSessionStorage();
    router.push(`${currentItem.value.editPath}?itemType=${currentItem.value.itemType}`);
  };
  const openApprovalFlowDrawerForAdd = () => {
    approvalFlowDrawerRef.value?.openDrawer({ itemType: currentItem.value.itemType });
  };
  const handleApprovalActions = ({ key, row }) => {
    if (key !== 'edit') {
      return;
    }
    approvalFlowDrawerRef.value?.openDrawer({ itemType: row.itemType, id: row.id });
  };
  const handleApprovalSaved = () => {
    if (showApprovalFlowList.value) {
      queryApprovalFlowList();
      return;
    }
    runQuery();
  };
  const showApprovalFlowListPanel = () => {
    showApprovalFlowList.value = true;
    approvalFlowCurrent.value = 1;
    queryApprovalFlowList();
  };
  const handleApprovalPageSizeChange = (val) => {
    approvalFlowPageSize.value = val;
    approvalFlowCurrent.value = 1;
    queryApprovalFlowList();
  };
  const handleApprovalCurrentChange = (val) => {
    approvalFlowCurrent.value = val;
    queryApprovalFlowList();
  };
  const queryApprovalFlowList = async () => {
    approvalFlowListLoading.value = true;
    try {
      const res: any = await callDesignTaskApi(
        'luteosDesignOperationQueryDesignApprovalConfigList',
        {
          pageNum: approvalFlowCurrent.value,
          pageSize: approvalFlowPageSize.value,
        }
      );
      approvalFlowList.value = (res.list || []).map((item: any) => ({
        id: item.id,
        itemType: item.itemType,
        itemTypeDesc: item.itemTypeName || approvalFlowItemTypeMap.value[item.itemType] || '--',
        deptDesc: item.deptNamesDisplay || '--',
        approverDesc: item.approverDisplay || '--',
        status: item.status,
        statusDesc: item.statusDesc,
        creatorDesc: item.creatorName || '--',
        updateTime: item.updateTime || '--',
      }));
      approvalFlowTotal.value = res.total || 0;
    } catch {
      approvalFlowList.value = [];
      approvalFlowTotal.value = 0;
    } finally {
      approvalFlowListLoading.value = false;
    }
  };

  const setSearchSessionStorage = () => {
    sessionStorage.setItem(
      'taskConfigSearchInfo',
      JSON.stringify({
        selectType: selectType.value,
        name: currentItem.value.name,
      })
    );
  };

  const reset = () => {
    currentItem.value.name = '';
    currentItem.value.current = 1;
    currentItem.value.pageSize = 10;

    runQuery();
  };

  // 查询
  function runQuery() {
    if (!currentItem.value.api) {
      return;
    }
    listLoading.value = true;
    designApi[currentItem.value.api]({
      name: currentItem.value?.name,
      pageNum: currentItem.value?.current,
      pageSize: currentItem.value?.pageSize,
      itemType: currentItem.value?.itemType,
    })
      .then((res: any) => {
        if (+res.code === 200) {
          currentItem.value.list = res[currentItem.value.resKey] || [];
          currentItem.value.total = res.total || 0;
        }
      })
      .finally(() => {
        listLoading.value = false;
      });
  }

  const route = useRoute();

  watch(
    () => router.currentRoute.value.path,
    () => {
      const { params } = route;
      selectType.value = params.selectType ? +params.selectType : 1;
      currentItem.value.itemType = params.itemType ? +params.itemType : 12;
      currentItem.value.name = params.name || '';
      showApprovalFlowList.value = false;
      runQuery();
    },
    { immediate: true, deep: true }
  );
</script>

<style scoped lang="scss">
  .custom-nav-link {
    transition: all 0.3s ease;
    &.active {
      color: var(--el-color-primary) !important;
      border-bottom-color: var(--el-color-primary) !important;
    }
    &:hover {
      color: var(--el-color-primary) !important;
      border-bottom-color: var(--el-color-primary) !important;
    }
  }

  .task-config-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    :deep(.list-container) {
      flex: 1;
      height: 0;
    }
  }

  .config-top-area {
    background: #fff;
    padding: 16px 20px 0 20px;
    border-bottom: 1px dashed #f0f2f5;
  }
  .tab-header {
    margin: 0;
    display: flex;
    align-items: center;

    .premium-tabs {
      background: #f5f7fa;
      padding: 4px;
      border-radius: 8px;
      border: 1px solid #e4e7ed;

      :deep(.el-radio-button__inner) {
        border: none !important;
        border-radius: 6px !important;
        background: transparent !important;
        color: #606266;
        font-weight: 500;
        padding: 8px 24px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        box-shadow: none !important;

        &:hover {
          color: var(--el-color-primary);
        }
      }

      :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
        background-color: #fff !important;
        color: var(--el-color-primary);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
      }
    }
  }

  .tab-content {
    margin: 20px 20px 0 30px;
  }

  .card-pane {
    background: #f4f6fa;
  }

  .mb-10 {
    margin-bottom: 5px !important;
  }

  .my-table {
    padding: 0;
  }

  .nav-item {
    cursor: pointer;
  }
</style>
