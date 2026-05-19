<template>
  <div class="shop-performance">
    <KeenList
      @refresh="refreshList"
      @reset-search="reset"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <div class="date-picker-prepend" style="display: flex">
          <el-select v-model="search.searchType" class="w-100px">
            <el-option
              v-for="(val, key) in searchTypeMap"
              :value="Number(key)"
              :label="val"
              :key="key"
            />
          </el-select>
          <el-input
            class="w-200px"
            v-model="search.keyWord"
            placeholder="请输入"
            clearable
            suffix-icon="search"
          />
        </div>
        <el-select
          v-model="search.riskCategories"
          placeholder="风险大类"
          :clearable="true"
          collapse-tags
          multiple
          collapse-tags-tooltip
        >
          <el-option
            v-for="item in riskList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <CountrySelect
          v-model="search.sites"
          placeholder="站点"
          clearable
          teleported
          multiple
          class="w-200px"
        />
        <ProductShopSelect
          v-model="search.shopCodes"
          clearable
          teleported
          multiple
          class="w-200px"
          :siteList="search.sites"
        />
        <DeptMember
          v-model="search.operatorCodes"
          placeholder="运营"
          deptId="65717209"
          clearable
          teleported
          multiple
          class="w-200px"
        />
        <div class="date-picker-prepend">
          <el-select v-model="search.timeType" style="width: 100px">
            <el-option
              v-for="(val, key) in searchTimeTypeMap"
              :value="Number(key)"
              :label="val"
              :key="key"
            />
          </el-select>
          <el-date-picker
            v-model="time"
            class="w-225px"
            type="daterange"
            @change="handleChangeTime"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </div>
      </template>
      <template #search-actions>
        <div class="status-card d-flex flex-wrap gap-2">
          <div class="d-flex gap-10 card-row">
            <template v-for="item in statusMap" :key="item.key">
              <div class="card-item" @click="handleStatusClick(item)">
                <div class="card-item-title">
                  <div class="d-flex align-items-center gap-1">
                    <i class="Root-tyicon" :class="[item.color, item.icon]"></i>
                    <span>{{ item.label }}</span>
                  </div>
                </div>
                <div class="card-item-qty" :class="item.color">
                  {{ statisticsInfo?.[item.count] ?? 0 }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template #buttons>
        <el-button
          :loading="buttonOneLoading"
          type="primary"
          @click="handleClickBtns(1)"
          :disabled="!checkList.length"
        >
          标记为处理中
        </el-button>
        <el-button
          type="primary"
          :loading="buttonTwoLoading"
          @click="handleClickBtns(2)"
          :disabled="!checkList.length"
        >
          标记为已处理
        </el-button>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="code"
        class-name="table-row-dashed"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column label="风险大类" prop="riskCategory" width="120" />
        <el-table-column label="具体原因" prop="specificReason" />
        <el-table-column label="店铺" prop="shopCode" width="200" />
        <el-table-column label="站点" prop="site" width="100" />
        <el-table-column label="ASIN" prop="asin" width="160">
          <template #default="{ row }">
            {{ row.asin }}
            <Copy :content="row.asin" />
          </template>
        </el-table-column>
        <el-table-column label="运营" prop="operatorName" width="100">
          <template #default="{ row }">
            <span class="span-break">{{ row.operatorName }}</span>
            <i class="iconfont icon-bianji" @click="handleOpenDialog(row, 1)"></i>
          </template>
        </el-table-column>
        <el-table-column label="出现时间" prop="occurrenceTime" width="120" />
        <el-table-column label="截止时间" prop="deadlineTime" width="120" />
        <el-table-column label="处理状态" prop="statusName" width="100">
          <template #default="{ row }">
              <Tag :color="statusTag[row.status]" size="small">
                <span class="span-break">{{ row.statusName }}</span>
              </Tag>
            <i class="iconfont icon-bianji" @click="handleOpenDialog(row, 2)"></i>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="170" />
        <el-table-column label="备注" prop="remark">
          <template #default="{ row }">
            <div style="display: flex; align-items: flex-end">
              <OverflowTooltip :content="row.remark" :line="2" />
              <i class="iconfont icon-bianji" @click="handleOpenDialog(row, 3)"></i>
            </div>
            <span v-if="row.noHandlerReason" style="color: #BEC0BF;">无需处理的原因：</span>
            <OverflowTooltip :content="row.noHandlerReason" :line="2" />
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
    <EditDialog ref="EditDialogRef" :type="dialogType" @success="refreshList"></EditDialog>
  </div>
</template>

<script setup lang="ts" name="shopPerformance">
  import useList from '@/hooks/list/useList';
  import EditDialog from './components/EditDialog.vue';
  import { shopApi, ShopApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  const statusMap = [
    {
      key: 0,
      label: '待处理',
      count: 'waitHandleCount',
      color: 'text-danger',
      icon: 'icon-Root-tyshijian',
    },
    {
      key: 1,
      label: '处理中',
      count: 'processingCount',
      color: 'text-warning',
      icon: 'icon-Root-tyshijian-mianxing',
    },
    {
      key: 2,
      label: '已处理',
      count: 'handleCompletedCount',
      color: 'text-success',
      icon: 'icon-Root-tychenggongzhuangtai',
    },
    {
      key: 3,
      label: '即将到期',
      count: 'noNeedHandleCount',
      color: 'text-danger',
      icon: 'icon-Root-tyshijian',
    },
  ];

  const statusTag = {
    0: 'red',
    1: 'yellow',
    2: 'green',
    3: 'blue'
  }

  const EditDialogRef = ref();

  const time: any = ref([]);
  const PAGE_SIZE = 10;

  const riskList = [
    { label: '政策合规性', value: 0 },
    { label: '业绩通知', value: 1 },
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
    refreshList,
    resetSearch,
  } = useList<
    ShopApi.luteosShopPerformanceQueryList.RequestQuery,
    ShopApi.LuteosShopPerformanceQueryList.ResponseBody
  >({
    searchDefaults: {
      riskCategories: undefined,
      sites: undefined,
      shopCodes: undefined,
      operatorCodes: undefined,
      keyWord: undefined,
      timeType: 0,
      startTime: undefined,
      endTime: undefined,
      searchType: 0,
      willExpire: undefined,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: shopApi.luteosShopPerformanceQueryList,
  });

  const searchTimeTypeMap = {
    0: '出现时间',
    1: '截止时间',
    2: '更新时间',
  };

  const searchTypeMap = {
    0: 'ASIN',
    1: '具体原因',
  };

  const statisticsInfo = ref({});

  const getStateStatisticsList = async () => {
    let res: any = await shopApi.luteosShopPerformanceStateStatistics();
    statisticsInfo.value = res;
  };
  getStateStatisticsList();

  const reset = () => {
    search.code = undefined;
    time.value = [];
    resetSearch();
  };

  const checkList = ref([]);
  const handleSelectionChange = (list) => {
    checkList.value = list.map((item) => item.code);
  };

  // 批量标记
  const buttonOneLoading = ref(false);
  const buttonTwoLoading = ref(false);
  const handleClickBtns = async (type) => {
    if (!checkList.value.length) ElMessage.warning('请选择数据');
    try {
      type == 1 ? (buttonOneLoading.value = true) : (buttonTwoLoading.value = true);
      await shopApi.luteosShopPerformanceMarkStatus({
        codes: [...checkList.value],
        status: type,
      });
      ElMessage.success('标记成功');
      refreshList();
      getStateStatisticsList();
    } finally {
      type == 1 ? (buttonOneLoading.value = false) : (buttonTwoLoading.value = false);
    }
  };

  onMounted(() => {
    // 钉钉待办查看详情 展示当前数据
    if (route.query) {
      search.code = route.query?.code;
    }
  });

  const handleChangeTime = (value) => {
    if (value?.length) {
      search.startTime = value[0];
      search.endTime = value[1];
      return;
    }
    search.startTime = undefined;
    search.endTime = undefined;
  };

  const handleStatusClick = (item) => {
    if (item.key == 3) {
      search.willExpire = true;
      search.status = undefined;
      return;
    }
    search.status = item.key;
    search.willExpire = undefined;
  };

  const dialogType = ref(-1);
  const handleOpenDialog = (row, type) => {
    dialogType.value = type;
    EditDialogRef.value?.open(row);
  };
</script>

<style scoped lang="scss">
  .icon-bianji {
    cursor: pointer;
    margin-left: 2px;
    &:hover {
      color: var(--el-color-primary);
    }
  }

  .span-break {
    word-break: break-all;
  }

  .text-success {
    color: #02b96b !important;
  }
  .text-warning {
    color: #ff9f22 !important;
  }
  .text-danger {
    color: #f53f3f !important;
  }

  .status-card {
    margin: 10px 0;
    width: 100%;
    .card-row {
      // min-width: 740px;
      flex-grow: 1;
      flex-wrap: wrap;
    }
    .card-item {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      // flex-direction: column;
      // justify-content: space-around;
      // width: 25%;
      min-width: 134px;
      height: 4vw;
      min-height: 90px;
      background: #ffffff;
      padding: 0.75vw;
      border-radius: 5px;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
      transition: transform 0.3s ease;
      position: relative;
      cursor: pointer;
      &-title {
        font-size: 14px;
        font-weight: 400;
      }
      &-qty {
        font-size: 32px;
        margin-left: 14px;
        display: flex;
        margin-top: -10px;
      }
      &-rate {
        font-size: 12px;
        color: var(--el-color-info);
      }
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
        //box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1);
      }
      i {
        width: 32px;
        height: 32px;
        font-size: 32px;
        margin-right: 3px;
      }
      .icon-Root-tyshijian-mianxing {
        transform: scale(0.9);
      }
      .icon-Root-tychenggongzhuangtai {
        transform: scale(1.1);
      }
    }
  }

  .shop-performance {
    min-width: 360px;
  }
</style>
