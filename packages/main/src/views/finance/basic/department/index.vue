<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <el-divider direction="vertical" class="divider-margin" />
      <span>
        已推送分贝通：
        <span class="text-green text-num mr15">
          {{ listData?.relateSystemStatics?.totalRelateNumFbt }}
        </span>
      </span>
      <span>
        推送分贝通失败：
        <span class="text-red text-num mr15">
          {{ listData?.relateSystemStatics?.totalFailRelatedNumFbt }}
        </span>
      </span>
      <span>
        未推送分贝通：
        <span class="text-grey text-num">
          {{ listData?.relateSystemStatics?.totalNotRelateNumFbt }}
        </span>
      </span>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="行政部门名称/金蝶编码" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.level" clearable placeholder="行政部门层级">
          <el-option
            v-for="item in classList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.fbtPushStatus" clearable placeholder="分贝通推送状态">
          <el-option
            v-for="item in pushList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-dropdown type="primary" @command="handleCommand">
          <el-button type="primary">
            批量操作
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">
                <el-icon style="color: var(--bs-success)"><Select /></el-icon>
                设为预算部门
              </el-dropdown-item>
              <el-dropdown-item command="0" divided>
                <el-icon style="color: var(--bs-danger)">
                  <CloseBold />
                </el-icon>
                取消预算部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="button" type="primary" :loading="saveLoading" @click="batchUpdateData">
          匹配金蝶编码
        </el-button>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportDepartmentList"
          :params="{
            ...search,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.departmentList"
        @selection-change="handleSelectionChange"
        row-key="deptId"
        class-name="table-row-dashed"
      >
        <el-table-column type="selection" width="55" fixed="left" />
        <el-table-column label="部门状态" prop="deptStatus" min-width="110" fixed="left">
          <template #default="{ row }">
            <Tag :color="row.deptStatus === '正常' ? 'green' : 'gray'">
              {{ row.deptStatus }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="行政部门id" prop="deptId" min-width="110" fixed="left" />
        <el-table-column label="行政部门名称" prop="deptName" min-width="120" fixed="left" />
        <el-table-column label="金蝶编码" prop="kingdeeNumber" width="155" fixed="left">
          <!-- 如推送金蝶成功，则把金蝶的编码记录下来；如未推送、或推送失败，则未空值，也只在未推送或推送失败状态下，可编辑金蝶编码 -->
          <template #default="{ row }">
            <el-input
              v-model.trim="kingdeeNumber"
              ref="autoFocus"
              @blur="changeKingdeeNumber(row)"
              clearable
              placeholder="请输入金蝶编码"
              style="width: 110px"
              v-if="row.edit"
            />
            <span v-else>{{ row?.kingdeePushInfo?.number }}</span>
            <el-icon
              style="color: var(--bs-success)"
              :size="20"
              class="icon"
              :class="{
                ml156: !row?.kingdeePushInfo?.number && !row.edit,
                mt0: row?.kingdeePushInfo?.number && !row.edit,
              }"
              @click="changeEditStatus(row)"
            >
              <Edit />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="行政部门层级" prop="levelDesc" min-width="120" />
        <el-table-column label="预算状态" prop="deptName" min-width="120">
          <template #default="{ row }">
            <!-- 预算状态：0-普通部门 1-预算部门 -->
            <Tag :color="row.budgetStatus === 1 ? 'blue' : 'green'">
              <!-- {{ row.budgetStatusDesc }} -->
              {{ row.budgetStatus === 1 ? '预算部门' : '普通部门' }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="预算管理部门" prop="budgetDeptName" width="220">
          <template #default="{ row }">
            <el-select
              v-model="budgetDeptId"
              clearable
              filterable
              placeholder="预算管理部门"
              style="width: 170px"
              @change="changeBudgetDept(row)"
              v-if="row.budgetDeptEdit"
            >
              <el-option
                v-for="item in deptTreeData"
                :key="item.deptId"
                :label="`${item.deptId}【${item.deptName}】`"
                :value="item.deptId"
              />
            </el-select>
            <span v-else>{{ row?.budgetDeptName }}</span>
            <el-icon
              style="color: var(--bs-success)"
              :size="20"
              class="icon"
              :class="{
                ml156: !row?.budgetDeptName && !row.budgetDeptEdit,
                mt0: row?.budgetDeptName && !row.budgetDeptEdit,
              }"
              @click="changeBudgetDeptEditStatus(row)"
            >
              <Edit />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="父部门id" prop="parentId" min-width="120" />
        <el-table-column label="父部门名称" prop="parentName" min-width="150" />
        <el-table-column label="部门主管" prop="deptManagerName" min-width="150" />
        <el-table-column
          :label="item.name"
          :width="index > 2 ? 240 : 180"
          v-for="(item, index) in editFeeList"
          :key="index"
        >
          <template #default="{ row }">
            <el-select
              v-model="row[item.key]"
              placeholder="请选择"
              @change="changeUpdateDeptFee(row, item.key)"
              class="select-edit"
              v-if="row[`${item.key}Edit`]"
            >
              <el-option
                v-for="item in statusFeeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <span v-else>{{ getFeeTypeName(row[item.key]) }}</span>
            <el-icon
              style="color: var(--bs-success)"
              :size="20"
              class="icon2"
              :class="{ mt5: row[`${item.key}Edit`] }"
              @click="changeEditFeeStatus(row, item.key)"
            >
              <Edit />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="推送分贝通" prop="fbtPushInfo" min-width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row?.fbtPushInfo?.pushStatus == 2"
                >
                  {{ `推送失败：${row?.fbtPushInfo?.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.fbtPushInfo?.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row?.fbtPushInfo?.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.fbtPushInfo?.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row?.fbtPushInfo?.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row?.fbtPushInfo?.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row?.fbtPushInfo?.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="180">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'detail',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '推送分贝通',
                  key: 'push',
                  type: 'primary',
                  row: row,
                },
              ]"
              @click="handleActions"
            />
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
    <!-- 详情弹框 -->
    <detailDialog
      v-if="detailVisible"
      :visible="detailVisible"
      :code="code"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="financeDepartment">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, memberApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import detailDialog from './components/detailDialog.vue';

  const PAGE_SIZE = 10;
  const pushList = [
    { name: '已推送', code: 1 },
    { name: '推送失败', code: 2 },
    { name: '未推送', code: 0 },
  ];
  const statusList = [
    { name: '已关联', code: 1 },
    { name: '未关联', code: 0 },
  ];
  const statusFeeList = [
    { name: '是', code: 'Y' },
    { name: '否', code: 'N' },
    { name: '待分配', code: '待分配' },
  ];
  const editFeeList = [
    { name: 'GTM推广费-OA', key: 'gtmPromotionFee' },
    { name: '区域推广费-OA', key: 'regionPromotionFee' },
    { name: '站外推广费-OA', key: 'outsidePromotionFee' },
    { name: 'GTM推广费（其中素材制作费）-OA', key: 'gtmMaterialFee' },
    { name: 'Comfelie不算在渠道的站外推广费-OA', key: 'comfelieOutsideFee' },
  ];
  const classList = [
    { name: '一级', code: 1 },
    { name: '二级', code: 2 },
    { name: '三级', code: 3 },
    { name: '四级', code: 4 },
  ];
  const kingdeeNumber = ref('');
  const budgetDeptId = ref('');
  const code = ref('');
  const detailVisible = ref(false);
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
    refreshList,
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemContracts.DepartmentListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
      level: undefined,
      fbtPushStatus: undefined,
      pushStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryDepartmentList,
  });
  watch(listData, () => {
    listData.value?.departmentList?.forEach((item) => {
      Reflect.set(item, 'edit', false);
      Reflect.set(item, 'gtmPromotionFeeEdit', false);
      Reflect.set(item, 'outsidePromotionFeeEdit', false);
      Reflect.set(item, 'comfelieOutsideFeeEdit', false);
      Reflect.set(item, 'outsidePromotionFeeEdit', false);
      Reflect.set(item, 'regionPromotionFeeEdit', false);
      Reflect.set(item, 'budgetDeptEdit', false);
    });
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text = row?.fbtPushInfo?.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financeBasicSyncThirdSystemBill({ billNo: row?.deptId, billTypes: [5], systemCode: 'fbt' })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      code.value = row?.deptId;
      detailVisible.value = true;
    }
  };
  const autoFocus = ref(null);
  // 编辑状态
  const changeEditStatus = (row) => {
    row.edit = true;
    kingdeeNumber.value = JSON.parse(JSON.stringify(row?.kingdeePushInfo?.number));
    nextTick(() => {
      if (autoFocus.value) {
        autoFocus.value.focus();
      }
    });
  };
  // 金蝶编码修改
  const changeKingdeeNumber = async (row) => {
    const param = {
      kingdeeNumber: kingdeeNumber.value,
      billType: 5, // -1不存在，1客户，2供应商，3产品资料，4员工，5部门，6仓库
      billNo: row.deptId,
    };
    const res = await financeSystemApi.financeBasicUpdateKingdeeNumber(param).catch(() => {
      row.edit = false;
      kingdeeNumber.value = '';
    });
    if (res) {
      ElMessage.success('修改成功');
      row.edit = false;
      kingdeeNumber.value = '';
      runQuery();
    }
  };
  // 编辑预算管理部门状态
  const changeBudgetDeptEditStatus = (row) => {
    if (row.budgetDeptEdit) {
      row.budgetDeptEdit = false;
    } else {
      row.budgetDeptEdit = true;
      budgetDeptId.value = row.budgetDeptId && row.budgetDeptId !== '0' ? row.budgetDeptId : '';
      listData.value?.departmentList?.forEach((item) => {
        if (item.deptId == row.deptId) {
          item.budgetDeptEdit = true;
        } else {
          item.budgetDeptEdit = false;
        }
      });
    }
  };
  // 预算管理部门修改
  const changeBudgetDept = async (row) => {
    const param = {
      deptId: row.deptId,
      budgetDeptId: budgetDeptId.value,
    };
    const res = await financeSystemApi.financeBasicUpdateBudgetDept(param).catch(() => {
      row.budgetDeptEdit = false;
    });
    if (res) {
      ElMessage.success('修改成功');
      row.budgetDeptEdit = false;
      runQuery();
    }
  };
  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await financeSystemApi.financeBasicQueryDepartmentList({
      pageNum: 1,
      pageSize: 1000,
    });
    deptTreeData.value = res.departmentList;
  };
  queryDeptTree();
  // 选择部门
  const tableRef = ref();
  const selectedList = ref([]);
  const handleSelectionChange = (list) => {
    selectedList.value = [];
    selectedList.value = list;
  };

  // 批量操作
  const handleCommand = async (command: string | number | object) => {
    if (selectedList.value?.length) {
      const arr = [];
      selectedList.value.forEach((row) => {
        arr.push(row.deptId);
      });
      const param = {
        budgetStatus: Number(command), // 预算状态：0-普通部门 1-预算部门
        listDeptId: arr,
      };
      const res = await financeSystemApi.financeBasicBatchSetBudgetDept(param);
      if (res) {
        ElMessage.success('操作成功');
        tableRef.value?.clearSelection();
        runQuery();
      }
    } else {
      ElMessage.error('请勾选批量操作数据');
    }
  };
  // 编辑状态
  const changeEditFeeStatus = (row, type) => {
    if (row[`${type}Edit`]) {
      row[`${type}Edit`] = false;
      return;
    }
    listData.value?.departmentList?.forEach((item) => {
      if (item.deptId == row.deptId) {
        item[`${type}Edit`] = true;
      } else {
        item[`${type}Edit`] = false;
      }
    });
  };
  const getFeeTypeName = (status) => {
    if (status == 'Y') {
      return '是';
    } else if (status == 'N') {
      return '否';
    } else {
      return '待分配';
    }
  };
  const changeUpdateDeptFee = (row, type) => {
    let param = {
      deptId: row.deptId,
    };
    param[type] = row[type];
    financeSystemApi.financeBasicUpdateDeptFee(param);
    row[`${type}Edit`] = false;
    ElMessage.success('操作成功');
    // setTimeout(() => {
    //   runQuery();
    // }, 800);
  };
  const saveLoading = ref(false);
  // 匹配金蝶编码
  const batchUpdateData = async () => {
    const isConfirmed = await swal.confirm('确认要匹配金蝶编码吗？');
    if (!isConfirmed) return;
    // saveLoading.value = true;
    ElMessage.warning(`数据匹配中，请稍后刷新查看最新数据`);
    const res = await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'dept_kingdee_number_refresh',
      // param: {...search},
    });
  };
</script>

<style scoped lang="scss">
  .page-top-box {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    .text-num {
      font-weight: 500;
    }

    .divider-margin {
      margin: 2px 15px;
    }

    .mr15 {
      margin-right: 15px;
    }

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
    }

    .text-grey {
      color: #b6b6b6;
    }
  }

  .icon {
    display: inline-block;
    cursor: pointer;
    float: right;
    margin-top: 5px;
  }
  .select-edit {
    width: 110px;
  }
  .icon2 {
    display: inline-block;
    cursor: pointer;
    float: right;
    margin-right: 15px;
  }
  .mt5 {
    margin-top: 5px;
  }
  .mt0 {
    margin-top: 0;
  }

  .ml156 {
    margin-left: 108px;
  }
</style>
