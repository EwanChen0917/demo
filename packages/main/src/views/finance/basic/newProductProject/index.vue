<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
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
        <el-input v-model="search.keyword" placeholder="名称/编码/分贝通编码" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.fbtPushStatus" clearable placeholder="推送状态">
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
        :data="listData?.recordList"
        row-key="productCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="编码" prop="productCode" />
        <el-table-column label="名称" prop="productName" />
        <el-table-column label="分贝通编码" prop="kingdeeNumber">
          <!-- 如推送分贝通成功，则把分贝通的编码记录下来；如未推送、或推送失败，则未空值，也只在未推送或推送失败状态下，可编辑分贝通编码 -->
          <template #default="{ row }">
            <span>{{ row?.fbtPushInfo?.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据源" prop="dataSource" />
        <el-table-column label="推送分贝通" prop="fbtPushInfo">
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
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '推送',
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
  </div>
</template>

<script setup lang="ts" name="newProductProject">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const PAGE_SIZE = 10;
  const pushList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
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
    FinanceSystemContracts.ProductListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
      fbtPushStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryNewProductList,
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text = row?.fbtPushInfo?.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financeBasicSyncThirdSystemBill({
          billNo: row?.productCode,
          billTypes: [26],
          systemCode: 'fbt',
        })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
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
      margin-right: 30px;
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
  }
</style>
