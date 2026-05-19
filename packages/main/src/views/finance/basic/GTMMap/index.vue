<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <el-divider direction="vertical" class="divider-margin" />
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
        <el-input
          v-model="search.keyword"
          placeholder="SPU编码名称/产品分类编码名称/GTM品线编码名称"
          class="w-400px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
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
        :data="listData?.gtmGroupMappingList"
        row-key="jobNumber"
        class-name="table-row-dashed"
      >
        <el-table-column label="SPU编码" prop="productSpu" min-width="90" />
        <el-table-column label="SPU名称" prop="productSpuName" />
        <el-table-column label="产品分类编码" prop="thirdCategoryCode" />
        <el-table-column label="产品分类名称" prop="thirdCategoryName" />
        <el-table-column label="GTM品线编码" prop="gtmPlCode" />
        <el-table-column label="GTM品线名称" prop="gtmPlName" />
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
        <el-table-column label="操作" fixed="right">
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

<script setup lang="ts" name="financeGTMMap">
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
    FinanceSystemContracts.GtmGroupMappingListResp
  >({
    searchDefaults: {
      keyword: undefined,
      fbtPushStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryGtmGroupMappingList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key == 'pushFBT') {
      // 第三方系统类型 kingdee->金蝶 fbt->分贝通
      const param = {
        billNo: row?.productSpu,
        billTypes: [101],
        systemCode: 'fbt',
      };
      const pushStatus = row?.fbtPushInfo?.pushStatus;
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
      code.value = row?.productSpu;
      detailVisible.value = false;
      detailVisible.value = true;
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
