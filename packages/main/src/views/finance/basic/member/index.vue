<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <el-divider direction="vertical" class="divider-margin" />
      <span>
        已推送金蝶：
        <span class="text-green text-num mr15">
          {{ listData?.relateSystemStatics?.totalRelateNumKingdee }}
        </span>
      </span>
      <span>
        推送金蝶失败：
        <span class="text-red text-num mr15">
          {{ listData?.relateSystemStatics?.totalFailRelatedNumKingdee }}
        </span>
      </span>
      <span>
        未推送金蝶：
        <span class="text-grey text-num">
          {{ listData?.relateSystemStatics?.totalNotRelateNumKingdee }}
        </span>
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
        <el-input v-model="search.keyword" placeholder="名称/工号/金蝶人员编码" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.pushStatus" clearable placeholder="金蝶推送状态">
          <el-option
            v-for="item in pushList"
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
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.memberList"
        row-key="jobNumber"
        class-name="table-row-dashed"
      >
        <el-table-column label="姓名" prop="name" min-width="90" />
        <el-table-column label="工号" prop="jobNumber" />
        <el-table-column label="所属部门" prop="deptName" />
        <el-table-column label="金蝶人员编码" min-width="200">
          <!-- 如推送金蝶成功，则把金蝶的编码记录下来；如未推送、或推送失败，则未空值，也只在未推送或推送失败状态下，可编辑金蝶编码 -->
          <template #default="{ row }">
            <el-input
              v-model.trim="kingdeeNumber"
              ref="autoFocus"
              @blur="changeKingdeeNumber(row, 1)"
              clearable
              placeholder="请输入金蝶编码"
              style="width: 150px"
              v-if="row.editJD"
            />
            <span v-else>{{ row?.kingdeePushInfo?.number }}</span>
            <el-icon
              style="color: var(--bs-success)"
              :size="20"
              class="icon"
              :class="{
                ml156: !row?.kingdeePushInfo?.number && !row.editJD,
                ml60: row?.kingdeePushInfo?.number && !row.editJD,
              }"
              @click="changeEditStatus(row, 1)"
              v-if="row?.kingdeePushInfo?.pushStatus !== 1"
            >
              <Edit />
            </el-icon>
          </template>
        </el-table-column>
        <!-- <el-table-column label="分贝通编码" min-width="200">
          <template #default="{ row }">
            <el-input v-model.trim="kingdeeNumber" ref="autoFocus" @blur="changeKingdeeNumber(row, 2)" clearable
              placeholder="请输入分贝通编码" style="width: 150px" v-if="row.editFBT"> </el-input>
            <span v-else>{{ row?.fbtPushInfo?.number }}</span>
            <el-icon style="color:var(--bs-success)" :size="20" class="icon"
              :class="{ 'ml156': !row?.fbtPushInfo?.number && !row.editFBT, 'ml60': row?.fbtPushInfo?.number && !row.editFBT }"
              @click="changeEditStatus(row, 2)" v-if="row?.fbtPushInfo?.pushStatus !== 1">
              <Edit />
            </el-icon>
          </template>
        </el-table-column> -->
        <el-table-column label="推送金蝶" prop="kingdeePushInfo">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row?.kingdeePushInfo?.pushStatus == 2"
                >
                  {{ `推送失败：${row.kingdeePushInfo.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.kingdeePushInfo?.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row.kingdeePushInfo.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.kingdeePushInfo?.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row?.kingdeePushInfo?.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row?.kingdeePushInfo?.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon
                style="color: #b6b6b6"
                :size="20"
                v-if="row?.kingdeePushInfo?.pushStatus == 0"
              >
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="推送分贝通" prop="fbtPushInfo">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row?.fbtPushInfo?.pushStatus == 2"
                >
                  {{ `推送失败：${row.fbtPushInfo.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row?.fbtPushInfo?.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row.fbtPushInfo.pushTime}` }}
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
        <el-table-column label="操作" fixed="right" min-width="220">
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
                  label: '推送金蝶',
                  key: 'pushJD',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '推送分贝通',
                  key: 'pushFBT',
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

<script setup lang="ts" name="financeMember">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api';
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
  const detailVisible = ref(false);
  const kingdeeNumber = ref('');
  const code = ref('');
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
    FinanceSystemContracts.MemberListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
      fbtPushStatus: undefined,
      pushStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryMemberList,
  });
  watch(listData, () => {
    listData.value?.memberList?.forEach((item) => {
      Reflect.set(item, 'editJD', false);
      Reflect.set(item, 'editFBT', false);
    });
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'pushJD' || key == 'pushFBT') {
      // 第三方系统类型 kingdee->金蝶 fbt->分贝通
      let param = {
        billNo: row?.jobNumber,
        billTypes: [4, 14],
        systemCode: 'kingdee',
      };
      if (key === 'pushFBT') {
        param = {
          billNo: row?.userId,
          billTypes: [4],
          systemCode: 'fbt',
        };
      }
      const pushStatus =
        key === 'pushJD' ? row?.kingdeePushInfo?.pushStatus : row?.fbtPushInfo?.pushStatus;
      const text = pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi.financeBasicSyncThirdSystemBill(param).catch(() => {
        runQuery();
      });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      code.value = row?.memberCode;
      detailVisible.value = false;
      detailVisible.value = true;
    }
  };
  const autoFocus = ref(null);
  // 编辑状态
  const changeEditStatus = (row, type) => {
    if (type == 1) {
      row.editJD = true;
      kingdeeNumber.value = JSON.parse(JSON.stringify(row?.kingdeePushInfo?.number));
    } else {
      row.editFBT = true;
      kingdeeNumber.value = JSON.parse(JSON.stringify(row?.fbtPushInfo?.number));
    }
    nextTick(() => {
      if (autoFocus.value) {
        autoFocus.value.focus();
      }
    });
  };
  // 金蝶编码，分贝通编码修改
  const changeKingdeeNumber = async (row, type) => {
    const param = {
      number: kingdeeNumber.value,
      billType: 4, // -1不存在，1客户，2供应商，3产品资料，4员工，5部门，6仓库
      billNo: type == 1 ? row.jobNumber : row.userId,
      systemCode: type == 1 ? 'kingdee' : 'fbt', // 系统编码, kingdee ->金蝶 fbt->分贝通
    };
    if (kingdeeNumber.value) {
      const res = await financeSystemApi.financeBasicUpdateThirdSystemNumber(param).catch(() => {
        row.editJD = false;
        row.editFBT = false;
        kingdeeNumber.value = '';
      });
      if (res) {
        ElMessage.success('修改成功');
        row.editJD = false;
        row.editFBT = false;
        kingdeeNumber.value = '';
        runQuery();
      }
    } else {
      row.editJD = false;
      row.editFBT = false;
    }
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
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
  }

  .ml60 {
    margin-left: 49px;
  }

  .ml156 {
    margin-left: 156px;
  }

  @media screen and (max-width: 1700px) {
    .ml60 {
      margin-left: 60px;
    }
  }
</style>
