<template>
  <el-tabs v-model="search.orderBigStatus" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statusStatistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="订单号/产品名称/产品SKU/供应链SKU/红人账号/红人邮箱"
        class="w-450px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始日期"
        end-placeholder="创建结束日期"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (dateArr) => {
            search.createTimeStart = dateArr ? dateArr[0] : '';
            search.createTimeEnd = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-select
        style="width: 120px"
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of creatorList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        @click="router.push('/samplesend/influencerSend')"
        v-permission="'influencerSend'"
      >
        新增红人发样
      </el-button>
      <el-button
        v-permission="'samplesendRefresh'"
        :loading="!!store.taskMap.samplesendSync"
        class="button"
        @click="handerRefresh"
        type="primary"
      >
        {{ !!store.taskMap.samplesendSync ? '刷新中' : '手动刷新' }}
      </el-button>
      <el-button
        type="primary"
        :disabled="codeList.length === 0"
        @click="retrtFba"
        v-permission="'SampleToFBA'"
      >
        转FBA配送
      </el-button>
      <ExportBtn :service="erpApi.luteosErpOrderOrderDownload" :params="search" :plain="false">
        导出
      </ExportBtn>
    </template>
    <el-table
      class="border-table"
      border
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
      max-height="900px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column min-width="340px" label="订单详情">
        <template #default="{ row }">
          <p>
            订单号：{{ row.sampleCode }}
            <Tag :color="statusColorMap[row.orderStatus]">{{ row.orderStatusDesc }}</Tag>
          </p>
          <p>易仓订单号：{{ row.orderCode || '-' }}</p>
          <p>红人账号：{{ row.metaAccount || '-' }}</p>
          <p>卖家账号：{{ row.shopAccount || '-' }}</p>
          <p>创建人：{{ row.creator || '-' }}</p>
          <p>原订单：{{ row.psampleCode || '-' }}</p>
          <p>订单来源：{{ row.sourceDesc || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="660px" label="订单明细">
        <template #default="{ row }">
          <el-row
            :gutter="20"
            style="margin-bottom: 8px"
            v-for="product of row.itemBeanList"
            :key="product.skuCode"
          >
            <el-col :span="18">产品名称：{{ product.productName }}</el-col>
            <el-col :span="6">运营人员：{{ product.operatorName || '-' }}</el-col>
            <el-col :span="12">供应链SKU：{{ product.supplySku }}</el-col>
            <el-col :span="6">数量：{{ product.num }}</el-col>
            <el-col :span="6">单价：{{ product.price }}</el-col>
          </el-row>
          <!-- <el-table :data="row.itemBeanList">
            <el-table-column prop="productName" label="产品名称" />
            <el-table-column prop="supplySku" label="供应链SKU" />
            <el-table-column prop="num" label="数量" />
            <el-table-column prop="price" label="单价" />
          </el-table> -->
          <p class="red" v-if="row.systemRemark">系统备注：{{ row.systemRemark }}</p>
          <p class="red" v-if="row.dingRemark">钉钉审核备注：{{ row.dingRemark }}</p>
          <p class="red" v-if="row.errorRemark">异常信息：{{ row.errorRemark }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" min-width="140px" label="订单金额">
        <template #default="{ row }">
          <p>总金额：{{ row.amount }}</p>
          <p>运费：{{ row.freightAmount }}</p>
          <p>交易额：{{ row.transactionAmount }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="productBarcode" min-width="260px" label="发货信息">
        <template #default="{ row }">
          <p>收件人：{{ row.buyerName }}</p>
          <p>收件人电话：{{ row.buyerPhone }}</p>
          <p>国家或地区：{{ row.buyerCountryDesc }}</p>
          <p>发货仓库：{{ row.warehouseDesc }}</p>
          <p>仓库配送：{{ row.shippingDesc }}</p>
          <p>
            跟踪号：
            <a v-if="row.trackOrderCode" target="_blank" :href="row.trackOrderCodeUrl">
              {{ row.trackOrderCode }}
            </a>
            <template v-else>-</template>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="estimateShipDate" min-width="240px" label="日期">
        <template #default="{ row }">
          <p>创建：{{ row.createTime }}</p>
          <p>审核：{{ row.dingAuthTime }}</p>
          <p>发货：{{ row.sendTime }}</p>
          <p>预计到货：{{ row.expectedArrivalTime }}</p>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" min-width="170px" fixed="right">
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
                permissionCode: 'samplesendDetail',
              },
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'samplesendCopy',
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: [400, 600].includes(+row.orderStatus),
                row: row,
                permissionCode: 'samplesendCancel',
              },
              {
                label: '重推',
                key: 'push',
                type: 'primary',
                text: true,
                hide: !row.button.showRetrtFba,
                row: row,
                permissionCode: 'SampleToFBA',
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
</template>

<script lang="ts" setup name="samplesend">
  import { metaApi, MetaApi, erpApi, platformApi, dataApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useTask from '@/store/modules/task';
  import { sampleorderRefresh, stopSampleorderRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import { encryptByBase64 } from '@/utils/aesTils';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '200', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '300', code: 'waitSend', statusName: '待发货', count: '' },
    { status: '400', code: 'send', statusName: '已发货', count: '' },
    { status: '500', code: 'error', statusName: '异常', count: '' },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const store = useTask();
  const user = useStore();
  const statusColorMap = {
    200: 'purple',
    201: 'purple',
    300: 'yellow',
    400: 'green',
    500: 'red',
    504: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    600: 'gray',
  };
  const time = ref<any>([]);
  const router = useRouter();
  const PAGE_SIZE = 10;
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
    MetaApi.LuteosMetaV3SampleorderQueryList.RequestBody,
    MetaApi.LuteosMetaV3SampleorderQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      creator: '',
      orderBigStatus: '',
      createTimeEnd: '',
      createTimeStart: '',
      type: 0 /* 类型：0-红人发样单 1-线下订单 */,
    },
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaV3SampleorderQueryList,
  });
  const handleTabChange = () => {
    nextTick(() => {
      runQuery();
    });
  };

  // 表格选择
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.sampleCode);
  };

  const tableRef = ref(null);
  // 批量转RBA配送
  const retrtFba = async () => {
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => !item.button?.showFba)
      ?.map((item) => item.sampleCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}不能转FBA，请重新选择`);
      return;
    }
    router.push({
      path: '/samplesend/toFBA',
      query: {
        codeList: encryptByBase64(JSON.stringify(codeList.value)),
        type: 0,
      },
    });
  };

  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const initDickbook = async () => {
    await getCreatorList();
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'samplesendDetail',
        query: { code: row.sampleCode },
      });
      router.push(path.href);
    } else if (key === 'copy') {
      const path = router.resolve({
        name: 'influencerSend',
        query: { code: row.sampleCode },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancelOrder(row);
    } else if (key === 'push') {
      const isConfirmed = await swal.confirm('确定重推订单吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpOrderFbaRetry({
        orderCode: row.sampleCode,
      });
      ElMessage.success('重推成功');
      refreshList();
    }
  };
  const cancelOrder = async (row) => {
    const res = await swal.confirm({
      title: `确认作废`,
    });
    if (res) {
      await metaApi.luteosMetaV3SampleorderAbandon({
        orderCode: row.sampleCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  onMounted(() => {
    initDickbook();
    sampleorderRefresh(user.token as string);
  });
  onBeforeUnmount(() => {
    stopSampleorderRefresh();
  });
  const handerRefresh = async () => {
    await erpApi.luteosErpPlatformRefresh({
      modelCode: 'ERP_ORDER',
      forceRefresh: true,
      param: {
        type: 0,
      },
    });
    store.taskMap.samplesendSync = true;
    sampleorderRefresh(user.token as string);
  };

  onActivated(() => {
    tableRef.value.clearSelection();
  });
</script>

<style scoped lang="scss"></style>
