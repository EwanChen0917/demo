<template>
  <el-tabs v-model="search.commandStatus" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statisticsInfo[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <!--    <div class="mb-5" v-if="listData?.noteList?.length > 1 && showTip">
          <el-tag size="large" closable type="warning" @close="showTip = false">
            <div class="d-flex align-items-center gap-2">
              <el-icon class="fs-6">
                <Warning />
              </el-icon>
              发货计划自动更新中
            </div>
          </el-tag>
        </div>-->
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 350px"
        v-model="search.keyword"
        placeholder="发货指令单号/产品名称/产品SKU/在线商品编码"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="timeType" style="width: 100px" @change="handleTimeChange(time)">
        <el-option :value="1" label="预计发货" />
        <el-option :value="2" label="预计到货" />
        <el-option :value="3" label="发货" />
      </el-select>
      <el-date-picker
        class="w-180"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="handleTimeChange"
      />
      <el-select
        style="width: 120px"
        v-model="search.operatorCode"
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
        v-model="search.plannerCode"
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
      <ProductChannelSelect
        style="width: 140px"
        v-model="search.channel"
        placeholder="渠道"
        filterable
        clearable
      />
      <ErpSiteSelect
        style="width: 120px"
        v-model="search.site"
        :channel="search.channel"
        placeholder="站点"
        filterable
        clearable
      />
    </template>
    <template #buttons>
      <!-- <el-button class="button" type="primary" @click="runQuery">查询</el-button> -->
      <!--      <el-button
        class="button"
        type="primary"
        @click="importDeliverDialogRef?.open"
        v-permission="'deliverDirectionsMultiSend'"
      >
        批量发货
      </el-button>-->
      <el-button
        class="button"
        type="primary"
        @click="importUpdateDialogRef?.open"
        v-permission="'deliverDirectionsUpdate'"
      >
        批量更新发货指令
      </el-button>
    </template>
    <el-table :data="listData?.recordList" v-loading="listLoading">
      <el-table-column label="发货指令编码" prop="commandCode" fixed="left" min-width="120" />
      <el-table-column min-width="160px" prop="salesforecastCode" label="预测编码" fixed="left">
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
      <el-table-column label="状态" fixed="left">
        <template #default="{ row }">
          <Tag :color="colorMap[row.commandStatus]">{{ row.commandStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" prop="productName" min-width="150" />
      <el-table-column label="渠道" prop="channelDesc" />
      <el-table-column label="站点" prop="siteDesc" />
      <el-table-column label="店铺账号" min-width="160">
        <template #default="{ row }">
          <span v-if="row?.shopList?.length === 1">{{ row?.shopList[0] }}</span>
          <el-dropdown trigger="click" v-else-if="row?.shopList?.length > 1">
            <span class="el-dropdown-link">
              {{ row?.shopList[0] }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in row.shopList" :key="item">
                  <span v-if="index > 0">{{ item }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="seller sku" min-width="160">
        <template #default="{ row }">
          <span v-if="row?.sellerSku?.length === 1">{{ row?.sellerSku[0] }}</span>
          <el-dropdown trigger="click" v-else-if="row?.sellerSku?.length > 1">
            <span class="el-dropdown-link">
              {{ row?.sellerSku[0] }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in row.sellerSku" :key="item">
                  <span v-if="index > 0">{{ item }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="发货方式" prop="shipMethodDesc" />
      <el-table-column label="产品SKU" prop="skuCode" min-width="130" />
      <el-table-column label="供应链SKU" min-width="150">
        <template #default="{ row }">
          {{ row.supplySku }}
          <span v-if="row.moreSupplySku" style="color: #f1416c">(多)</span>
        </template>
      </el-table-column>
      <el-table-column label="默认发货SKU" prop="defaultProductSku" min-width="150" />
      <el-table-column label="品线" prop="productLine" min-width="120" />
      <el-table-column label="三级分类" prop="categoryName" min-width="120" />
      <el-table-column label="预计发货数量" prop="estimateQty" min-width="110" />
      <el-table-column label="预计发货时间" prop="estimateShipDate" min-width="110" />
      <el-table-column label="物流方式" prop="logisticMethodDesc" />
      <el-table-column label="预计到货时间" prop="estimateArriveDate" min-width="110" />
      <el-table-column label="运营" prop="operator" />
      <el-table-column label="计划" prop="planer" />
      <el-table-column label="更新时间" prop="updateTime" min-width="100" />
      <el-table-column label="发货时间" prop="shipDate" min-width="100" />
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'deliverDirectionsDetail',
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.commandStatus),
                row: row,
                permissionCode: 'deliverDirectionsDetail',
              },
              {
                label: '锁定',
                key: 'lock',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.commandStatus),
                row: row,
                permissionCode: 'deliverDirectionsLock',
              },
              {
                label: '解锁',
                key: 'unlock',
                type: 'primary',
                text: true,
                hide: ![3].includes(+row.commandStatus),
                row: row,
                permissionCode: 'deliverDirectionsLock',
              },
              /*{
                label: '发货',
                key: 'deliver',
                type: 'primary',
                text: true,
                hide: ![0, 3].includes(+row.commandStatus),
                row: row,
                permissionCode: 'deliverDirectionsSend',
              },*/
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.commandStatus),
                row: row,
                permissionCode: 'deliverDirectionsCancel',
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
  <ImportDialog :downloadParams="search" ref="importDeliverDialogRef" />
  <ImportUpdateDialog :downloadParams="search" ref="importUpdateDialogRef" />
  <AddDialog
    v-if="addVisible"
    :visible="addVisible"
    @close="addVisible = false"
    :commandCode="curCommandCode"
  />
  <!--  <DeliverDialog :dickbook="dickbook" ref="deliverDialogRef" @success="refreshList" />-->
</template>

<script lang="ts" setup name="deliverDirections">
  import { erpApi, ErpApi, platformApi, dataApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElNotification } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import AddDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/addDialog.vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import DeliverDialog from './components/deliverDialog.vue';
  import ImportDialog from './components/importDeliverDialog.vue';
  import ImportUpdateDialog from './components/imporUpdateDialog.vue';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: 'waitSend', statusName: '待发货', count: '' },
    { status: '1', code: 'send', statusName: '已发货', count: '' },
    { status: '3', code: 'lock', statusName: '锁定', count: '' },
    { status: '2', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const colorMap = {
    0: 'blue',
    1: 'green',
    2: 'gray',
    4: 'black',
  };
  const router = useRouter();
  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };
  const time = ref();

  const handleTimeChange = (val) => {
    search.estimateShipTimeStart = undefined;
    search.estimateShipTimeEnd = undefined;
    search.estimateArriveTimeStart = undefined;
    search.estimateArriveTimeEnd = undefined;
    search.shipDateStart = undefined;
    search.shipDateEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.estimateShipTimeStart = val[0] || '';
        search.estimateShipTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.estimateArriveTimeStart = val[0] || '';
        search.estimateArriveTimeEnd = val[1] || '';
      } else if (timeType.value === 3) {
        search.shipDateStart = val[0] || '';
        search.shipDateEnd = val[1] || '';
      }
    }
  };

  const PAGE_SIZE = 10;
  const timeType = ref<number>(1);
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
    ErpApi.LuteosErpPlanShipCommandV2QueryList.RequestQuery,
    ErpApi.LuteosErpPlanShipCommandV2QueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: code,
      channel: '',
      site: '',
      operatorCode: '',
      plannerCode: '',
      estimateArriveTimeStart: undefined,
      estimateArriveTimeEnd: undefined,
      estimateShipTimeStart: undefined,
      estimateShipTimeEnd: undefined,
      shipDateStart: undefined,
      shipDateEnd: undefined,
      commandStatus: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanShipCommandV2QueryList,
  });
  const handleTabChange = () => {
    nextTick(() => {
      runQuery();
    });
  };
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_operator_dept', 'supply_planer_dept'],
    });
    return {
      supply_operator_dept: res.supply_operator_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res.supply_planer_dept!.map((item) => {
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
      dictCodes: ['plan_cycle_channel'], // 'plan_cycle_channel'
    });
    const countryList = await getCountryList();
    dickbook.value = { ...res.dictMap, countryList, ...memeberList };
  };

  const addVisible = ref<boolean>(false);
  const curCommandCode = ref<string>('');
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'deliverDirectionsDetail',
        query: { code: row.commandCode },
      });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'deliverDirectionsEdit',
        query: { code: row.commandCode },
      });
      router.push(path.href);
    } else if (key === 'deliver') {
      addVisible.value = true;
      curCommandCode.value = row.commandCode;
      // deliverDialogRef.value.open(row);
    } else if (key === 'cancel') {
      changeStatus(row, 2, '作废');
    } else if (key === 'lock') {
      changeStatus(row, 3, '锁定');
    } else if (key === 'unlock') {
      changeStatus(row, 0, '解锁');
    }
  };
  const changeStatus = async (row, targetStatus = 0, title) => {
    const res = await swal.confirm({
      title: `确认${title}`,
      // html: `
      // <p>确定要${text}${row.warehouseCode}【${row.warehouseName}】归属吗？</p>
      // <p style='color:red'>${text}后将${
      //   currentStatus === 0 ? '不在' : ''
      // }进行库存统计和需求建议计算</p>
      // `,
    });
    if (res) {
      await erpApi.luteosErpPlanShipCommandV2LockCommand({
        commandCode: row.commandCode,
        type: targetStatus as number,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  const showTip = ref(true);
  watch(
    () => listData?.value?.noteList,
    (val) => {
      if (val && val.length > 0 && showTip.value) {
        ElMessage.closeAll();
        ElMessage({
          showClose: true,
          message: '发货计划自动更新中',
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
  });
  onActivated(() => {
    showTip.value = true;
  });
  onDeactivated(() => {
    ElMessage.closeAll();
  });
  const deliverDialogRef = ref();
  const importUpdateDialogRef = ref();
  const importDeliverDialogRef = ref();
</script>

<style scoped lang="scss"></style>
