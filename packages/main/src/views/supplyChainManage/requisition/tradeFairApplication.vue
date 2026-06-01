<template>
  <div>
    <!-- 展销会申请页面组件 -->
    <div class="tabs-section">
      <el-radio-group v-model="search.status" size="small" fill="#fff">
        <template v-for="item in tabStatusList" :key="item.status">
          <el-radio-button :value="item.status">
            <span>{{ item.statusName }}</span>
            <span class="tab-count">({{ listData?.statusBean?.[item.code] }})</span>
          </el-radio-button>
          <div class="gap"></div>
        </template>
      </el-radio-group>
    </div>
    <KeenList
      :resetBtnOptions="{ size: 'small' }"
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          size="small"
          v-model="search.keyword"
          clearable
          placeholder="展销会单号/OA单号/调拨单号/海外仓出库单号/入库单单号/B2B单号/其他单号"
          class="w-550px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <DeptMember
          size="small"
          v-model="search.applicator"
          placeholder="申请人"
          filterable
          clearable
        />
        <el-tree-select
          size="small"
          ref="catTreeSelectRef"
          placeholder="领用部门"
          v-model="search.applicationDeptId"
          :data="deptTree"
          filterable
          clearable
          check-strictly
          popper-class="picker-cat-tree-select"
          highlight-current
        />
        <el-date-picker
          size="small"
          v-model="search.time"
          type="daterange"
          range-separator="-"
          start-placeholder="创建开始日期"
          end-placeholder="创建结束日期"
          value-format="YYYY-MM-DD"
        />
      </template>
      <template #buttons>
        <el-button type="primary" @click="add" v-permission="'requisitionAddApply'">
          新增申请
        </el-button>
        <ExportBtn
          :service="erpApi.luteosErpExhibitionDownload"
          :params="{
            ...search,
            startTime: search.time ? search.time[0] : undefined,
            endTime: search.time ? search.time[1] : undefined,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.list"
        :expand-row-keys="[listData?.list?.[0]?.exhibitionCode]"
        row-key="exhibitionCode"
        max-height="900px"
        class-name="table-row-dashed"
      >
        <el-table-column type="expand" width="25">
          <template #expand="{ expanded }">
            <i class="iconfont icon-xiangxia icon-expand" :class="expanded ? 'row-open' : ''"></i>
          </template>
          <template #default="{ row }">
            <div class="expand-container">
              <el-table :data="row?.itemList" :border="true">
                <el-table-column label="产品名称" prop="name">
                  <template #default="{ row: subRow }">
                    <div>{{ subRow?.productName }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="供应链SKU" prop="state">
                  <template #default="{ row: subRow }">
                    <div :class="subRow?.isOutStock ? 'red' : ''">
                      {{ subRow?.productSku }}
                      <Tag v-if="subRow?.isOutStock" color="red" class="ml20">缺货</Tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="数量" prop="qty" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单据信息" min-width="330">
          <template #default="{ row }">
            <div class="d-flex gap-2 fs-7">
              <div style="word-break: break-all">
                <span>展销会单号：{{ row?.exhibitionCode }}</span>
                <Copy :content="row?.exhibitionCode || ''" />
              </div>
            </div>
            <div class="fs-7">
              <span>OA申请单号：{{ row?.oaCode || '-' }}</span>
              <Copy v-if="row?.oaCode" :content="row.oaCode" />
            </div>
            <div class="fs-7">调拨单号：{{ row?.transferOrderCode || '-' }}</div>
            <div class="fs-7">海外仓入单号：{{ row?.inboundCode || '-' }}</div>
            <div class="fs-7">海外仓出单号：{{ row?.outboundCode || '-' }}</div>
            <div class="fs-7">B2B单号：{{ row?.b2bOrderCode || '-' }}</div>
            <div class="fs-7">其他单号：{{ row?.otherOrderCode || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="单据状态" min-width="160">
          <template #default="{ row }">
            <Tag v-if="row?.status" :color="statusColorMap[row?.status]">
              {{ row?.statusDesc }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="申请人信息" min-width="250">
          <template #default="{ row }">
            <div class="fs-7">申请人：{{ row?.applicatorName || '-' }}</div>
            <div class="fs-7">部门：{{ row?.applicationDeptName || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="申请说明" min-width="263">
          <template #default="{ row }">
            <div class="mh-140">{{ row?.purpose || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" min-width="160">
          <template #default="{ row }">
            <div>{{ row?.createTime || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="申请备注" min-width="200">
          <template #default="{ row }">
            <div class="fs-7 mh-140" v-if="row?.remark">
              {{ row?.remark }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="{ row }">
            <div class="col-op">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '详情',
                    key: 'view',
                    type: 'primary',
                    permissionCode: 'requisitionDetailApply',
                    row,
                  },
                  {
                    label: '编辑',
                    key: 'edit',
                    type: 'primary',
                    permissionCode: 'requisitionEditApply',
                    hide: row?.status !== 100,
                    row,
                  },
                  {
                    label: '关联单据',
                    key: 'associatedDocuments',
                    type: 'primary',
                    permissionCode: 'editAssociatedDocuments',
                    hide: ![300, 400].includes(row?.status),
                    row,
                  },
                  {
                    label: '重新推送',
                    key: 'againPush',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    hide: ![500].includes(row?.status),
                  },
                  {
                    label: '作废',
                    key: 'abandon',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    hide: [600].includes(row?.status),
                  },
                ]"
                @click="handleActions"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <AddFairDrawer ref="addFairDrawerRef" @success="refreshList" />
  </div>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import AddFairDrawer from './components/addFairDrawer.vue';

  const router = useRouter();

  const statusColorMap = {
    100: 'blue',
    200: 'blue',
    300: 'purple',
    400: 'green',
    500: 'red',
    600: 'red',
  };

  const tabStatusList = [
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: '100', code: 'waitConfirmCount', statusName: '待确认', count: '' },
    { status: '200', code: 'waitAuthCount', statusName: '审核中', count: '' },
    { status: '300', code: 'waitTransferCount', statusName: '待调拨', count: '' },
    { status: '400', code: 'completeCount', statusName: '已完成', count: '' },
    { status: '500', code: 'errorCount', statusName: '异常', count: '' }, // 5开头的均是异常
    { status: '600', code: 'abandonCount', statusName: '作废', count: '' },
  ];

  const PAGE_SIZE = 10;

  const {
    search,
    // searchData,
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.luteosErpExhibitionQueryList.RequestBody,
    ErpApi.luteosErpExhibitionQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: '',
      applicator: undefined,
      time: undefined,
      applicationDeptId: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { time } = searchData;
      return {
        ...omit(searchData, 'time'),
        startTime: time ? time[0] : undefined,
        endTime: time ? time[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpExhibitionQueryList,
  });
  const addFairDrawerRef = ref<InstanceType<typeof AddFairDrawer>>();
  const add = () => {
    addFairDrawerRef.value?.open({
      mode: 'add',
    });
  };
  const addTrackNumDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      addFairDrawerRef.value?.open({
        mode: 'detail',
        code: row.exhibitionCode,
      });
    } else if (key === 'edit') {
      addFairDrawerRef.value?.open({
        mode: 'edit',
        code: row.exhibitionCode,
      });
    } else if (key === 'associatedDocuments') {
      // 关联单据
      addFairDrawerRef.value?.open({
        mode: 'associated',
        code: row.exhibitionCode,
      });
    } else if (key === 'againPush') {
      const res = await swal.confirm({
        title: `确认重新推送`,
      });
      if (res) {
        await erpApi.luteosErpExhibitionRePush({
          exhibitionCode: row.exhibitionCode,
        });
        ElMessage.success('重新推送成功');
        refreshList();
      }
    } else if (key === 'abandon') {
      const res = await swal.confirm({
        title: `确认作废`,
      });
      if (res) {
        await erpApi.luteosErpExhibitionAbandon({
          exhibitionCode: row.exhibitionCode,
        });
        ElMessage.success('作废成功');
        refreshList();
      }
    }
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
</script>

<style scoped lang="scss">
  .tabs-section {
    padding-top: 8px;
    background-color: #fff;
    .gap {
      height: 10px;
      width: 1px;
      background-color: #dfe2e6;
    }
    .tab-count {
      color: #b6babf;
      margin-left: 4px;
    }
    .el-radio-button.is-active {
      .tab-count {
        color: var(--el-radio-button-checked-text-color, #02b96b);
      }
    }
  }
  .table-row-dashed {
    :deep(.el-table__cell) {
      vertical-align: unset;
    }
  }
  .icon-expand {
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #1e2226;
    transform: rotate(-90deg);

    &.row-open {
      transform: rotate(0deg);
    }
  }
  :deep(.el-table__expand-column) {
    .cell {
      padding: 0;
    }
  }
  :deep(.el-table__expanded-cell) {
    background-color: #f5f7fa !important;
    padding: 8px !important;
  }
  .expand-container {
    padding-left: 38px;

    .expend-error {
      border-radius: 6px;
      background-color: #ffffff;
      padding: 9px 16px;
      margin-bottom: 8px;
      .expand-error-row {
        display: flex;
        align-items: center;
      }
    }
    :deep(table) {
      border-radius: 8px 0 0 0;
      --el-table-border: 1px solid #dfe2e6;
      th {
        background: #f5f7fa;
      }
      td {
        background-color: #f5f7fa;
      }
      th,
      td {
        border-right-color: transparent !important;
      }
    }
  }
  :deep(.el-table) {
    --el-table-bg-color: transparent;
  }
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .col-op {
    :deep(.action-btns) {
      display: block;
      .el-link {
        display: block;
      }
    }
  }
  .mh-140 {
    max-height: 140px;
    overflow: auto;
  }
</style>
