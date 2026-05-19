<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <span>
        已关联金蝶编码：
        <span class="text-green text-num">{{ listData?.totalRelateNum }}</span>
      </span>
      <span>
        未关联金蝶编码：
        <span class="text-red text-num">{{ listData?.totalNotRelateNum }}</span>
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
          placeholder="客户名称/客户编码/金蝶编码/积加店铺站点名称"
          class="w-350px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          v-model="search.marketNames"
          :options="marketNamesList.map(x=>{
            return {
              label: x,
              value: x,
            }
          })"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="站点"
        />
        <el-select v-model="search.pushStatus" clearable placeholder="推送状态">
          <el-option
            v-for="item in pushList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select v-model="search.relateStatus" clearable placeholder="金蝶编码状态">
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="search.customerSources"
          :options="customerList"
          :props="{label: 'name', value: 'code'}"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="客户来源"
        />
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.customerList"
        row-key="customerCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="客户编码" prop="customerCode" min-width="120" />
        <el-table-column label="积加ID" prop="jijiaCustomerId" width="100" />
        <el-table-column label="客户名称" prop="customerName" min-width="120" />
        <el-table-column label="站点" prop="marketName" />
        <el-table-column label="客户来源" prop="customerSourceName" min-width="100" />
        <el-table-column label="积加店铺站点名称" prop="shopName" min-width="130" />
        <el-table-column label="创建时间" prop="createTime" min-width="150" />
        <el-table-column label="更新时间" prop="updateTime" min-width="150" />
        <el-table-column label="金蝶编码" prop="kingdeeNumber" width="200">
          <!-- 如推送金蝶成功，则把金蝶的编码记录下来；如未推送、或推送失败，则未空值，也只在未推送或推送失败状态下，可编辑金蝶编码 -->
          <template #default="{ row }">
            <el-input
              v-model.trim="kingdeeNumber"
              ref="autoFocus"
              @blur="changeKingdeeNumber(row)"
              clearable
              placeholder="请输入金蝶编码"
              style="width: 150px"
              v-if="row.edit"
            />
            <span v-else>{{ row.kingdeeNumber }}</span>
            <el-icon
              style="color: var(--bs-success)"
              :size="20"
              class="icon"
              :class="{
                ml156: !row.kingdeeNumber && !row.edit,
                ml60: row.kingdeeNumber && !row.edit,
              }"
              @click="changeEditStatus(row)"
              v-if="row.pushStatus !== 1"
            >
              <Edit />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="推送金蝶" prop="pushStatusDesc" width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div style="max-width: 600px; color: var(--bs-danger)" v-if="row.pushStatus == 2">
                  {{ `推送失败：${row.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon style="color: var(--bs-danger)" :size="20" v-if="row.pushStatus == 2">
                <WarningFilled />
              </el-icon>
              <el-icon style="color: var(--bs-success)" :size="20" v-if="row.pushStatus == 1">
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
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

<script setup lang="ts" name="financeCustomer">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, financeApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const PAGE_SIZE = 10;
  const pushList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const statusList = [
    { name: '已关联', code: 1 },
    { name: '未关联', code: 0 },
  ];
  const kingdeeNumber = ref('');
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
    FinanceSystemContracts.CustomerListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
      relateStatus: undefined,
      marketNames: undefined,
      pushStatus: undefined,
      customerSources: [],
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryCustomerList,
  });
  watch(listData, () => {
    listData.value?.customerList?.forEach((item) => {
      Reflect.set(item, 'edit', false);
    });
  });

  const customerList = ref<any[]>([]);
  const marketNamesList = ref<any[]>([]);
  const getCustomerList = async () => {
    const res = await financeApi.luteosFinanceBusinessDictItemBatchQuery({
      dictCodes: 'customer_data_source',
    });
    customerList.value = res?.dictItemMap?.customer_data_source;
  };
  const getMarketNameList = async () => {
    const res = await financeSystemApi.financeBasicQueryMarketNameList();
    marketNamesList.value = res;
  };
  getCustomerList();
  getMarketNameList();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text = row.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financeBasicSyncKingdeeBill({ billNo: row?.customerCode, billType: 1 })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    }
  };
  const autoFocus = ref(null);
  // 编辑状态
  const changeEditStatus = (row) => {
    row.edit = true;
    kingdeeNumber.value = JSON.parse(JSON.stringify(row.kingdeeNumber));
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
      billType: 1, // -1不存在，1客户，2供应商，3产品资料，4员工，5部门，6仓库
      billNo: row.customerCode,
    };
    if (kingdeeNumber.value) {
      const res = await financeSystemApi.financeBasicUpdateKingdeeNumber(param).catch(() => {
        row.edit = false;
        kingdeeNumber.value = '';
        // if (autoFocus.value) {
        //   autoFocus.value.focus();
        // }
      });
      if (res) {
        ElMessage.success('修改成功');
        row.edit = false;
        kingdeeNumber.value = '';
        runQuery();
      }
    } else {
      row.edit = false;
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
