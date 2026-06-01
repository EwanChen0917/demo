<template>
  <keenList
    @reset-search="reset"
    @refresh="runQuery"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 350px"
        placeholder="请输入"
        v-model="searchValue"
        clearable
        @change="handleBlur"
        @blur="handleBlur"
      >
        <template #prepend>
          <el-select style="width: 100px" v-model="searchType">
            <el-option
              v-for="item in searchBasicTypeMap"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append v-if="searchType === 'orderCode'">
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="站点" v-model="search.sites" multiple collapse-tags clearable>
        <el-option
          v-for="item in siteList"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <ProductShopSelect
        v-model="search.shopNames"
        :clearable="true"
        :multiple="true"
        platform="shopify"
      />
      <el-select
        placeholder="付款状态"
        v-model="search.financialStatusList"
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :options="shopifyOrderFinancialStatusMap"
      >
        <!-- <el-option
          v-for="item in platFormOrderTypeMap"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option> -->
      </el-select>
      <el-select
        placeholder="订单风险标识"
        v-model="search.orderRisks"
        multiple
        collapse-tags
        collapse-tags-tooltip
        clearable
      >
        <el-option
          v-for="item in shopifyOrderRiskMap"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        placeholder="发货状态"
        clearable
        :options="shopifyOrderFulfillmentStatusMap"
        v-model="search.fulfillmentStatusList"
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <!-- <el-option
          v-for="item in orderCancelTypeMap"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option> -->
      </el-select>
      <!-- <el-select placeholder="履约类型">
        <el-option
          v-for="item in fullfillMentTypeMap"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select> -->
      <el-select placeholder="MSKU为空" v-model="search.mskuIsNull" clearable>
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
      <el-select placeholder="推送状态" v-model="search.pushStatus" clearable>
        <el-option
          v-for="item in shopifyOrderPushStatusMap"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="付款时间开始"
        format="YYYY-MM-DD"
        end-placeholder="付款时间结束"
      />
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="handlePullOrder"
        v-permission="'salesOrderPull'"
        :loading="pullOrderLoading"
      >
        手动拉取销售订单
      </el-button>
    </template>
    <salesOrderTable
      :data="listData?.records || []"
      @refund="handleRefund"
      @refresh="runQuery"
      @export="exportRows"
      :loading="listLoading"
    />
    <keen-pagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </keenList>
  <!-- 手动修改收件人信息弹窗 -->
  <!-- <salesOrderLocation
    v-model:visible="editLocationVisible"
    :info="editLocationInfo"
    @close="editLocationVisible = false"
    @success="handleEditLocationSuccess"
  /> -->
</template>
<script lang="ts" setup name="salesOrderManagement">
  import useList from '@/hooks/list/useList';
  import {
    currencyTypeMap,
    orderCancelTypeMap,
    platFormOrderTypeMap,
    searchBasicTypeMap,
    pushTypeMap,
    emptMSKUTypeMap,
    fullfillMentTypeMap,
    searchBasicTypeValueList,
    platformOrderRiskMap,
  } from './config';
  import salesOrderTable from './components/salesOrderTable.vue';
  import salesOrderLocation from './components/salesOrderLocation.vue';
  import { omsApi, OmsApi } from '@/api';
  import { ShopifyOrderDetailResp } from '@/api/oms/data-contracts';
  import { EditLocationInfo } from './type';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { useSalesOrder } from './hooks/useSalesOrder';
  import dayjs from 'dayjs';

  const router = useRouter();
  const {
    siteList,
    getSiteList,
    getAllMap,
    shopifyOrderPushStatusMap,
    shopifyOrderRiskMap,
    shopifyOrderFinancialStatusMap,
    shopifyOrderFulfillmentStatusMap,
  } = useSalesOrder();
  const PAGE_SIZE = 10;
  const batchSearchRef = ref();
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
    OmsApi.OmsShopifyOrderQueryList.RequestBody,
    OmsApi.OmsShopifyOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      msku: undefined,
      mskuIsNull: undefined,
      orderCodes: undefined,
      shopNames: undefined,
      sites: undefined,
      financialStatusList: undefined,
      fulfillmentStatusList: undefined,
      // paymentTimeEnd: undefined,
      // paymentTimeStart: undefined,
      paymentTimeStart: dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD'),
      paymentTimeEnd: dayjs().endOf('day').format('YYYY-MM-DD'),
      pushStatus: undefined,
      supplySku: undefined,
      orderRisks: undefined,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsShopifyOrderQueryList,
  });

  // 日期格式化函数：将 Date 对象转换为 yyyy-mm-dd 格式
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const time = computed<[Date, Date] | null>({
    get() {
      // 如果 search 中有值，返回日期数组
      if (search.paymentTimeStart && search.paymentTimeEnd) {
        return [new Date(search.paymentTimeStart), new Date(search.paymentTimeEnd)];
      }
      return null;
    },
    set(value) {
      // 当用户选择日期时，更新 search 对象
      if (value && Array.isArray(value)) {
        search.paymentTimeStart = formatDate(value[0]);
        search.paymentTimeEnd = formatDate(value[1]);
      } else {
        // 清空时
        search.paymentTimeStart = undefined;
        search.paymentTimeEnd = undefined;
      }
    },
  });

  // 平台订单状态：将逗号分隔的字符串转为数组
  const orderDeliveryStatusArray = computed({
    get() {
      return search.orderDeliveryStatus ? search.orderDeliveryStatus.split(',') : [];
    },
    set(value: string[]) {
      search.orderDeliveryStatus = value.length > 0 ? value.join(',') : undefined;
    },
  });

  const searchType = ref('orderCode');
  const searchValue = ref('');
  const clearAll = () => {
    batchSearchRef.value?.clear();
  };
  const handleBlur = (e) => {
    if (e.target?.value) {
      batchSearchRef.value?.clear();
    }
  };
  const reset = () => {
    resetSearch();
    const start = dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD');
    const end = dayjs().endOf('day').format('YYYY-MM-DD');
    // time.value = [start, end]; // 设置默认的日期范围
    search.paymentTimeStart = start;
    search.paymentTimeEnd = end;
    searchValue.value = '';
    clearAll();
  };
  const handleBatchSearch = (val) => {
    search.orderCodes = val?.replace(/\n/g, ',').split(',');
  };
  const handleBatchClear = () => {
    search.orderCodes = undefined;
  };
  watch(searchValue, () => {
    searchBasicTypeValueList.forEach((item) => {
      if (item !== searchType.value) {
        search[item] = undefined;
      }
    });
    // 2. 对 msku 和 supplySku 进行长度校验
    const currentType = searchType.value;

    const currentValue = searchValue.value;
    console.log(`currentValue: `, currentValue);
    // 如果是 msku 或 supplySku，且有值但长度不足3
    if (
      (currentType === 'msku' || currentType === 'supplySku') &&
      currentValue &&
      currentValue.trim().length < 3
    ) {
      search[currentType] = undefined; // 不赋值，不触发查询
      return;
    } else if (currentType === 'orderCode') {
      // 如果是 orderCode 类型，清空批量输入框
      batchSearchRef.value?.clear();
      search.orderCodes = currentValue ? [currentValue] : undefined;
    } else {
      // 3. 正常赋值（包括清空的情况）
      search[currentType] = currentValue ? currentValue : undefined;
    }
  });
  watch(searchType, () => {
    if (!searchType.value) return;
    searchBasicTypeValueList.forEach((item) => {
      if (item !== searchType.value) {
        search[item] = undefined;
      }
    });
    if (searchType.value) {
      search[searchType.value] = searchValue.value;
    }
  });
  onMounted(() => {
    getAllMap();
    getSiteList();
  });
  const pullOrderLoading = ref(false);
  const exportRows = async (_rows: ShopifyOrderDetailResp[], callback?: () => void) => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) {
      callback?.();
      return;
    }
    try {
      const res = await omsApi.omsShopifyOrderExport({
        msku: search.msku || undefined,
        pushStatus: search.pushStatus || undefined,
        mskuIsNull: search.mskuIsNull || undefined,
        orderCodes: search.orderCodes || undefined,
        orderDeliveryStatus: search.orderDeliveryStatus || undefined,
        paymentTimeEnd: search.paymentTimeEnd || undefined,
        paymentTimeStart: search.paymentTimeStart || undefined,
        shopNames: search.shopNames || undefined,
        sites: search.sites || undefined,
        supplySku: search.supplySku || undefined,
        orderRisks: search.orderRisks || undefined,
        financialStatusList: search.financialStatusList || undefined,
        fulfillmentStatusList: search.fulfillmentStatusList || undefined,
        pageNum: current.value,
        pageSize: pageSize.value,
      });

      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) {
        callback?.();
        return;
      }
      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      router.push(path);
    } catch (error) {
      console.log(`error: `, error);
    } finally {
      callback?.();
    }
  };
  // 弹窗相关状态
  // const editLocationVisible = ref(false);
  // const editLocationInfo = ref<EditLocationInfo>({
  //   orderCode: '',
  //   receiverAddressArea: '',
  //   receiverAddressCity: '',
  //   receiverAddressCountry: '',
  //   receiverAddressCountryCode: '',
  //   receiverAddressDetail1: '',
  //   receiverAddressHouseNumber: '',
  //   receiverAddressPostCode: '',
  //   receiverAddressState: '',
  //   receiverAddressStreet: '',
  //   receiverMobilePhone: '',
  //   receiverName: '',
  //   receiverPhone: '',
  // });

  // // 重置编辑信息
  // const resetEditLocationInfo = () => {
  //   editLocationInfo.value = {
  //     orderCode: '',
  //     receiverAddressArea: '',
  //     receiverAddressCity: '',
  //     receiverAddressCountry: '',
  //     receiverAddressCountryCode: '',
  //     receiverAddressDetail1: '',
  //     receiverAddressHouseNumber: '',
  //     receiverAddressPostCode: '',
  //     receiverAddressState: '',
  //     receiverAddressStreet: '',
  //     receiverMobilePhone: '',
  //     receiverName: '',
  //     receiverPhone: '',
  //   };
  // };
  // // 处理编辑收件人信息
  // const handleEditLocation = (row: ShopifyOrderDetailResp) => {
  //   editLocationVisible.value = true;
  //   resetEditLocationInfo();
  //   // 使用循环处理赋值，有值就赋值，没值就跳过
  //   Object.keys(editLocationInfo.value).forEach((key) => {
  //     const value = row.order?.[key as keyof typeof row.order];
  //     if (value !== undefined && value !== null && value !== '') {
  //       (editLocationInfo.value as any)[key] = value;
  //     }
  //   });
  // };

  // // 编辑成功后刷新列表
  // const handleEditLocationSuccess = () => {
  //   editLocationVisible.value = false;
  //   refreshList();
  // };

  // 处理补推自发货
  const handleRefund = async (rows: ShopifyOrderDetailResp[], callback?: () => void) => {
    try {
      const res = await ElMessageBox.confirm(
        h(
          'div',
          {
            style: {
              display: 'flex',
              'flex-direction': 'column', // 使用 kebab-case
              gap: '10px', // 添加间距
            },
          },
          [
            h('span', '数据执行大概1~5分钟，请耐心等待，请勿重复操作'),
            h(
              'span',
              { style: { color: '#a594a6' } },
              '只对自发货的待发货且未推送/推送失败的订单生效'
            ),
          ]
        ),
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      );

      const submitArray = rows
        .map((item) => {
          return {
            code: item.order?.orderCode,
            shop: item.order?.shopName,
          };
        })
        .filter((item) => item.code !== undefined && item.code !== null && item.code !== '');
      if (!submitArray.length) {
        callback?.();
        return;
      }
      await omsApi.omsShopifyOrderRePushFoOrder({
        orderBeanList: submitArray,
      });
      ElMessage.success('补推自发货成功');
      runQuery();
    } catch (error) {
      console.log(`error: `, error);
    } finally {
      callback?.();
    }
  };

  // 处理手动拉取销售订单
  const handlePullOrder = async () => {
    pullOrderLoading.value = true;
    try {
      await omsApi.omsShopifyOrderFetchOrder({});
      ElMessage.success('手动拉取销售订单成功');
      runQuery();
    } catch (error) {
      console.log(`error: `, error);
    } finally {
      pullOrderLoading.value = false;
    }
  };
  onActivated(() => {
    runQuery();
  });
</script>
<style lang="scss" scoped>
  .icon-bianji {
    margin-left: 4px;
    font-size: 12px;
    cursor: pointer;
    color: #999999;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  :deep(.el-table__body) {
    -webkit-border-vertical-spacing: 20px;
  }
</style>
