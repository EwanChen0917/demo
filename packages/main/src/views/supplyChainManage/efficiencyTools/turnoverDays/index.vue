<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="codeType" style="width: 100px" @change="selectCode">
        <el-option :value="0" label="预测编码" />
        <el-option :value="1" label="产品SKU" />
        <el-option :value="2" label="产品名称" />
        <el-option :value="3" label="渠道唯一标识" />
      </el-select>
      <el-input
        v-model="search[codeMap[codeType]]"
        placeholder="批量搜索请用空格或‘,’隔开"
        class="w-275px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductChannelSelect
        style="width: 120px"
        v-model="search.channel"
        placeholder="渠道"
        filterable
        clearable
      />
      <ErpSiteSelect
        style="width: 120px"
        v-model="search.country"
        placeholder="站点"
        :channel="search.channel"
        filterable
        clearable
      />
      <el-select
        style="width: 120px"
        v-model="search.operator"
        placeholder="运营"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.supply_operator_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.planer"
        placeholder="计划"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.supply_planer_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.status"
        placeholder="周转状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="安全" :value="0" />
        <el-option label="呆滞" :value="1" />
        <el-option label="预警" :value="2" />
      </el-select>
      <el-select
        v-model="search.forecastStatus"
        placeholder="预测状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="开启" :value="0" />
        <el-option label="关闭" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        :loading="!!store.taskMap.turnoverSync"
        class="button"
        @click="handerRefresh"
        type="primary"
      >
        {{ !!store.taskMap.turnoverSync ? '刷新中' : '手动刷新' }}
      </el-button>
      <el-button class="button" @click="goStockLead" type="primary">备货时效</el-button>
      <!-- <el-button
        class="button"
        @click="logisticsDialogRef?.open"
        type="primary"
        v-permission="'turnoverDaysLogisticsWay'"
      >
        物流方式
      </el-button> -->
      <el-button type="primary" @click="goTurnoverAdjust">备货调整</el-button>
      <el-button
        class="button"
        @click="goTurnoverStrategy"
        type="primary"
        v-permission="'turnoverStrategyTemplate'"
      >
        周转策略模板
      </el-button>

      <el-button
        class="button"
        type="primary"
        plain
        @click="
          handleExport({
            // codeList,
            ...search,
            pageNum: current,
            pageSize,
          })
        "
        v-permission="'turnoverDaysExport'"
      >
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      max-height="65vh"
    >
      <el-table-column min-width="160px" prop="code" label="预测编码" fixed="left">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>预测编码</span>
            <el-tooltip placement="top">
              <template #content>
                <div>预测按在线商品预测：预测编码=在线商品编码</div>
                <div>预测按产品SKU预测：预测编码=产品SKU</div>
              </template>
              <el-icon size="16" color="var(--el-color-primary)">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <div>{{ row.salesforecastCode }}</div>
        </template>
      </el-table-column>

      <!--      <el-table-column min-width="160px" prop="skuCode" label="产品SKU" />-->
      <el-table-column min-width="100px" prop="channelDesc" label="渠道" />
      <el-table-column min-width="100px" prop="countryDesc" label="站点" />
      <el-table-column prop="skuName" min-width="200px" label="产品信息">
        <template #default="{ row }">
          <GoodsInfo :title="row?.skuName" :subtitle="row?.skuCode" hide-image />
        </template>
      </el-table-column>
      <el-table-column min-width="140px" prop="originalPlatformMark" label="渠道唯一标识" />
      <el-table-column prop="currentWeek" min-width="140px" label="当前周数" />
      <el-table-column prop="warningRange" min-width="140px" label="周转预警范围" />
      <el-table-column prop="operator" label="运营" />
      <el-table-column prop="planer" label="计划" />
      <el-table-column prop="forecastStatusDesc" label="预测状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.forecastStatus]">{{ row.forecastStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="statusDesc" label="周转状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                hide: row.forecastStatus === 1,
                row,
                permissionCode: 'turnoverDaysDetail',
              },
              /*{
                label: '发货指令',
                key: 'deliver',
                type: 'primary',
                text: true,
                hide: row.forecastStatus !== 0,
                row,
                permissionCode: 'turnoverDaysSend',
              },*/
              {
                label: '周转策略',
                key: 'turnoverStrategy',
                type: 'primary',
                hide: row.forecastStatus !== 0,
                text: true,
                row,
                permissionCode: 'turnoverStrategy',
              },
              {
                label: '预测日志',
                key: 'log',
                type: 'primary',
                hide: row.forecastStatus !== 0,
                text: true,
                row,
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
    <LogisticsDialog ref="logisticsDialogRef" @success="runQuery" />
    <!-- <TurnoverStrategyDialog
      :edit-template="false"
      ref="turnoverStrategyDialogRef"
      @success="runQuery"
    /> -->
    <DeliverDialog ref="deliverDialogRef" @success="runQuery" />
  </KeenList>
  <LogDialog ref="logDialogRef" />
</template>

<script lang="ts" setup name="turnoverDays">
  import { erpApi, ErpApi, memberApi, platformApi, dataApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useExport from '@/hooks/list/useExport';
  import useTask from '@/store/modules/task';
  import { turnoverRefresh, stopTurnoverRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage, ElNotification } from 'element-plus';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import LogisticsDialog from './components/logisticsDialog.vue';
  // import TurnoverStrategyDialog from './components/turnoverStrategyDialog.vue';
  import DeliverDialog from './components/deliverDialog.vue';
  import LogDialog from './components/logDialog.vue';

  const store = useTask();
  const user = useStore();
  const handerRefresh = async () => {
    await erpApi.luteosErpPlanTurnoverRefresh();
    store.taskMap.turnoverSync = true;
    turnoverRefresh(user.token as string);
  };
  const router = useRouter();
  const PAGE_SIZE = 10;
  const statusColorMap = ref({
    0: 'green',
    1: 'red',
    2: 'yellow',
  });
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
    runQuery,
  } = useList<
    ErpApi.LuteosErpPlanTurnoverQueryList.RequestQuery,
    ErpApi.LuteosErpPlanTurnoverQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: '',
      operator: '',
      channel: '',
      planer: '',
      country: '',
      forecastStatus: undefined,
      uniqueCode: undefined,
      skuCode: undefined,
      productName: undefined,
      platformSkuIdentify: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanTurnoverQueryList,
  });
  const { handleExport, exportLoading } = useExport(erpApi.luteosErpPlanTurnoverExportList);
  const getCreatorList = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_operator_dept', 'supply_planer_dept'],
    });
    return {
      supply_operator_dept: res.supply_operator_dept.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res.supply_planer_dept.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
    };
  };
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    return res.countryList!.map((item) => {
      return {
        label: item.countryName,
        value: item.countryCode,
      };
    });
  };
  const dickbook: any = ref({
    sales_forecast_channel: [],
    countryList: [],
    supply_operator_dept: [],
    supply_planer_dept: [],
  });
  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    const res = await platformApi.platformDict({
      dictCodes: ['sales_forecast_channel'],
    });
    const countryList = await getCountryList();
    dickbook.value = { ...res.dictMap, countryList, ...memeberList };
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'view') {
      const path = router.resolve({
        name: 'turnoverDaysDetail',
        query: {
          code: row.code,
        },
      });
      router.push(path.href);
    } else if (key === 'turnoverStrategy') {
      console.log('row.strategy', row.strategy);
      const path = router.resolve({
        name: 'turnoverStrategyTemplate',
        query: {
          // code: row.strategy.strategyTemplateCode,
          turnoverCode: row.strategy.turnoverCode,
        },
      });
      router.push(path.href);
    } else if (key === 'deliver') {
      deliverDialogRef.value.open(row);
    } else if (key === 'log') {
      logDialogRef.value.open(row.code);
    }
  };

  const goTurnoverStrategy = () => {
    const path = router.resolve({
      name: 'turnoverStrategy',
    });
    router.push(path.href);
  };
  const goStockLead = () => {
    const path = router.resolve({
      name: 'turnoverDaysStockLead',
    });
    router.push(path.href);
  };
  const goTurnoverAdjust = () => {
    const path = router.resolve({
      name: 'turnoverAdjust',
    });
    window.open(path.href, '_blank');
  };

  const showTip = ref(true);
  watch(
    () => listData?.value?.noteList,
    (val) => {
      if (val && val.length > 0 && showTip.value) {
        ElMessage.closeAll();
        ElMessage({
          showClose: true,
          message: '周转天数自动更新中',
          type: 'warning',
          duration: 0,
          onClose: () => {
            showTip.value = false;
          },
        });
      }
    }
  );

  onMounted(() => {
    initDickbook();
    turnoverRefresh(user.token as string);
  });
  onActivated(() => {
    showTip.value = true;
  });
  onDeactivated(() => {
    ElMessage.closeAll();
  });
  onBeforeUnmount(() => {
    stopTurnoverRefresh();
  });
  const logisticsDialogRef = ref();
  // const turnoverStrategyDialogRef = ref();
  const deliverDialogRef = ref();
  const logDialogRef = ref();

  const codeType = ref(0);
  const codeMap = { 0: 'uniqueCode', 1: 'skuCode', 2: 'productName', 3: 'platformSkuIdentify' };

  const selectCode = () => {
    const arr = ['uniqueCode', 'skuCode', 'productName', 'platformSkuIdentify'];
    arr.forEach((i) => {
      if (i !== codeMap[codeType.value]) {
        search[i] = undefined;
      }
    });
  };
</script>

<style scoped lang="scss"></style>
