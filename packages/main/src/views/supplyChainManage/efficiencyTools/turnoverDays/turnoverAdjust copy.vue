<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="预测编码/产品名称/产品SKU"
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
      <!-- <el-select
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
      </el-select> -->
      <DeptMember v-model="search.planer" placeholder="计划" deptCode="supply_planer_dept" />
      <third-category
        v-model="search.thirdLevelCategoryCodeList"
        placeholder="三级分类"
        collapse-tags
        clearable
        :multiple="true"
      />
      <el-select
        style="width: 120px"
        v-model="search.supplierCodeList"
        placeholder="供应商"
        filterable
        clearable
        :teleported="false"
        multiple
        :options="supplierList"
      />
    </template>
    <template #buttons>
      <el-dropdown
        split-button
        type="primary"
        trigger="click"
        @click="onTextClick"
        @command="handleCommand"
      >
        保存视图
        <template #dropdown>
          <el-dropdown-menu>
            <template v-if="adjustSearchViewList.length">
              <el-dropdown-item
                v-for="item in adjustSearchViewList"
                :key="item.id"
                :command="item.id"
                class="dropdown-item"
              >
                <div class="dropdown-content">
                  <div class="item-name">
                    <el-icon v-if="item.isDefault"><Lock /></el-icon>
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="item-actions">
                    <el-button
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="editView(item)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      link
                      v-if="!item.isDefault"
                      @click.stop.prevent="setDefaultView(item)"
                    >
                      设置为默认
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="onDelete(item)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>
              </el-dropdown-item>
            </template>
            <el-dropdown-item class="text-center" v-else>
              <span>暂无数据</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="primary" @click="update" v-loading="updateLoading">更新发货计划</el-button>
      <el-button
        type="primary"
        @click="() => update2('predict')"
        :v-loading="loadingMap['predict']"
      >
        更新预测
      </el-button>
      <el-button
        type="primary"
        @click="() => update2('transit')"
        :v-loading="loadingMap['transit']"
      >
        更新在途在制
      </el-button>
      <el-button @click="router.push('/turnoverDays')">返回</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
      max-height="65vh"
    >
      <!--      <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column prop="code" label="预测编码" min-width="120px" fixed="left">
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
      <el-table-column prop="channelDesc" label="渠道/站点" min-width="100px" fixed="left">
        <template #default="{ row }">
          <div>{{ row?.channelDesc || '--' }}</div>
          <div>{{ row?.countryDesc || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="skuName" label="产品信息" min-width="180px" fixed="left">
        <template #default="{ row }">
          <GoodsInfo :title="row?.skuName" :subtitle="row?.skuCode" hide-image />
        </template>
      </el-table-column>
      <el-table-column prop="thirdCategoryDesc" label="三级分类" fixed="left" />
      <el-table-column
        prop="originalPlatformMark"
        label="渠道唯一标识"
        min-width="140px"
        fixed="left"
      />
      <el-table-column prop="planer" label="计划" />
      <el-table-column prop="qty" label="中仓库存">
        <template #default="{ row }">
          <span>{{ row?.planTurnOverCacuBean?.qty }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="onWayQty" label="采购在途">
        <template #default="{ row }">
          <span>{{ row?.planTurnOverCacuBean?.onWayQty }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productSkuList" label="默认发货SKU" min-width="180">
        <template #default="{ row }">
          <el-select
            v-if="row?.planTurnOverCacuBean && row.hasOpPermission"
            style="width: 90%"
            v-model="row.planTurnOverCacuBean.defaultProductSku"
            @change="changeDetail(row)"
          >
            <el-option
              v-for="item in row?.planTurnOverCacuBean?.productSkuList"
              :key="item"
              :value="item"
            />
          </el-select>
          <span v-else>{{ row.planTurnOverCacuBean?.defaultProductSku || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="supplier" label="供应商名称" min-width="150px" />
      <el-table-column
        prop="planTurnOverCacuBean.softDay"
        label="安全周转最小天数"
        min-width="140px"
      />
      <el-table-column min-width="100px" prop="supplyCycle" label="总供应周期">
        <template #default="scope">
          <el-tooltip>
            <template #content>
              <div>供应商交期：{{ scope.row?.planCycle.supplierHandleOverDay || '--' }}</div>
              <div>订单处理时间：{{ scope.row?.planCycle.orderHandleOverDay || '--' }}</div>
              <div>国内运输时间：{{ scope.row?.planCycle.domesticShipDay || '--' }}</div>
              <div>验货+入库时间：{{ scope.row?.planCycle.qcHandleDay || '--' }}</div>
              <div>海外物流时间：{{ scope.row?.planCycle.seaOverDay || '--' }}</div>
              <div>接收上架时间：{{ scope.row?.planCycle.receiveListingDay || '--' }}</div>
              <div>周转+安全库存：{{ scope.row?.planCycle.trunOverDay || '--' }}</div>
            </template>
            <span>{{ scope.row?.planCycle.totalCycle }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="logisticMethod" label="物流方式" />
      <el-table-column prop="platformInitialInventory" label="平台期初库存" min-width="120px" />
      <template v-if="listData?.recentFiveWeekSalesMap?.length">
        <el-table-column
          v-for="col of listData?.recentFiveWeekSalesMap"
          :label="col"
          :key="col"
          min-width="200px"
        >
          <template #default="{ row }">
            <span>{{ row?.recentWeeklySales?.[col] }}</span>
          </template>
        </el-table-column>
      </template>
      <template v-if="listData?.recordList?.length">
        <el-table-column
          width="260px"
          :label="column.value"
          :key="column.value"
          v-for="(column, index) of listData?.recordList[0].planTurnOverCacuBean?.extHeadList
            ?.items"
        >
          <template #default="{ row, $index }">
            <div
              class="child-item"
              v-for="(item, idx) in row?.planTurnOverCacuBean?.detailList"
              :key="idx"
            >
              <el-tooltip
                v-if="item?.items[index]?.edit"
                :disabled="item?.items[0]?.value === '预测销量'"
              >
                <template #content>
                  <div>
                    预计发货时间：{{ item?.items[index]?.extMap?.estimateShipDate || '&#45;&#45;' }}
                  </div>
                  <div>
                    预计到货时间：{{
                      item?.items[index]?.extMap?.estimateArriveDate || '&#45;&#45;'
                    }}
                  </div>
                  <div>
                    物流方式：{{ item?.items[index]?.extMap?.logisticMethod || '&#45;&#45;' }}
                  </div>
                </template>
                <div class="d-flex align-items-center gap-2">
                  <!-- :max="row?.planTurnOverCacuBean?.maxQty" -->
                  <NumberInput
                    v-if="row.hasOpPermission"
                    style="width: 60%"
                    v-model="item.items[index].value"
                    :precision="0"
                    :min="0"
                    @blur-handler="
                      calcuTurnDayList(row?.planTurnOverCacuBean, $index, item?.items[0]?.value)
                    "
                    @keydown.enter="
                      calcuTurnDayList(row?.planTurnOverCacuBean, $index, item?.items[0]?.value)
                    "
                  />
                  <span v-else>{{ item?.items[index]?.value }}</span>
                  <!-- <div class="fs-8 text-gray-500" v-show="item?.items[0]?.value !== '预测销量'">
                    {{ `(最大值${row?.planTurnOverCacuBean?.maxQty})` }}
                  </div> -->
                </div>
              </el-tooltip>
              <el-popover
                visible="true"
                width="400"
                trigger="hover"
                v-else-if="
                  ['在制库存', '货件在途库存'].includes(item?.items[0]?.value) &&
                  item?.items[index].value > 0
                "
              >
                <template #reference>
                  <div>{{ item?.items[index]?.value }}</div>
                </template>
                <el-table
                  :data="item?.items?.[index]?.extMap.order || []"
                  row-key="index"
                  max-height="30vh"
                  :header-cell-style="{ padding: '4px 0', height: '24px' }"
                  :cell-style="{ padding: '4px 0', height: '24px' }"
                  style="--el-table-row-height: 24px"
                >
                  <el-table-column prop="shippingOrderCode" label="发货单号" width="120" />
                  <el-table-column prop="transferOrderCode" label="调拨单号" min-width="120" />
                  <el-table-column prop="quantity" label="数量" min-width="90" />
                </el-table>
              </el-popover>
              <span v-else :class="[colorMap[item?.items[index]?.color]]">
                {{ item?.items[index]?.value }}
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
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
  <!-- 视图弹窗 -->
  <SearchViewModal ref="searchViewModalRef" :searchValue="search" @save-view-success="saveView" />
</template>

<script setup lang="ts" name="turnoverAdjust">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, platformApi, dataApi } from '@/api';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { useCache } from '@/hooks/web/useCache';
  import * as swal from '@/utils/swal';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import ThirdCategory from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/components/thirdCategory.vue';
  import { cloneDeep } from 'lodash-es';
  import SearchViewModal from './components/searchViewModal.vue';

  const router = useRouter();
  const changeList = ref([]);
  const PAGE_SIZE = 10;
  const { wsCache } = useCache('localStorage');
  const adjustSearchViewList = ref(wsCache.get('adjustSearchViewList') || []);
  const loadingMap = ref({
    predict: false,
    transit: false,
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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpPlanTurnoverQueryList.RequestBody,
    ErpApi.LuteosErpPlanTurnoverQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: '',
      planer: '',
      country: '',
      thirdLevelCategoryCodeList: [],
      supplierCodeList: [],
    },
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanTurnoverQueryList,
    onSuccess: (data) => {
      listData.value = cloneDeep(data);
      listData.value?.recordList?.forEach((item) => {
        const curInfo = changeList.value?.find((change) => change.code === item.code);
        if (curInfo) {
          item.planTurnOverCacuBean = curInfo;
        } else {
          item.planTurnOverCacuBean = item?.planTurnOverCacuBean ?? {};
        }
        item.planTurnOverCacuBean.defaultProductSku =
          item?.planTurnOverCacuBean?.defaultProductSku ?? '';
      });
    },
  });

  // 按照视图列表的默认视图进行查询
  const setDefaultSearch = () => {
    const defaultSearchView = adjustSearchViewList.value.find(
      (item) => item.isDefault
    )?.searchValue;
    if (adjustSearchViewList.value.length) {
      adjustSearchViewList.value.forEach((item) => {
        item.searchValue = { ...item.searchValue };
      });
    }

    Object.keys(search).forEach((key) => {
      if (!defaultSearchView?.[key]) {
        search[key] = undefined;
      } else {
        search[key] = defaultSearchView?.[key];
      }
    });
  };

  onMounted(() => {
    // 初始化时设置默认搜索条件
    setDefaultSearch();
  });

  const colorMap = {
    0: 'black',
    1: 'text-danger',
    2: 'text-warning',
    3: 'text-success',
  };

  const dickbook: any = ref({
    sales_forecast_channel: [],
  });

  const initDickbook = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['sales_forecast_channel'],
    });
    dickbook.value = res?.dictMap;
  };
  initDickbook();
  const searchViewModalRef = ref();

  // 添加或编辑视图
  const saveView = (view, isEdit?: Boolean) => {
    if (view.isDefault) {
      adjustSearchViewList.value.forEach((item: any) => {
        item.isDefault = false; // 取消其他视图的默认状态
      });
    }

    if (isEdit) {
      const newList = adjustSearchViewList.value.map((item: any) => {
        return {
          id: item.id,
          name: item.id === view.id ? view.name : item.name, // 更新视图名称
          isDefault: item.id === view.id ? view.isDefault : item.isDefault, // 更新是否默认状态
          searchValue: { ...search }, // 保持其他视图的搜索条件不变
        };
      });
      adjustSearchViewList.value = newList; // 更新视图列表
    } else {
      adjustSearchViewList.value.unshift({ ...view, searchValue: { ...search } });
    }
    wsCache.set('adjustSearchViewList', adjustSearchViewList.value); // 更新缓存
    ElMessage.success('视图保存成功');
  };

  // 编辑视图
  const editView = (item: { id: number; name: string }) => {
    searchViewModalRef.value.open(item);
  };
  // 设置为默认操作
  const setDefaultView = (item: { id: number; name: string }) => {
    adjustSearchViewList.value.forEach((i) => {
      i.isDefault = i.id === item.id; // 将当前项设置为默认
    });
    setDefaultSearch(); // 设置默认搜索条件
    wsCache.set('adjustSearchViewList', adjustSearchViewList.value); // 更新缓存
  };

  // 删除操作
  const onDelete = (item: { id: number; name: string }) => {
    adjustSearchViewList.value = adjustSearchViewList.value.filter((i) => i.id !== item.id); // 删除选项
    nextTick(() => {
      wsCache.set('adjustSearchViewList', adjustSearchViewList.value); // 更新缓存
      ElMessage.success('视图删除成功');
    });
  };

  // 点击视图文字
  const onTextClick = () => {
    if (adjustSearchViewList.value.length === 10) {
      ElMessage.warning('视图列表最多存10条，请先删除视图后重试');
      return;
    }
    searchViewModalRef.value.open();
  };

  // 选中下拉项
  const handleCommand = (command) => {
    const res = adjustSearchViewList.value.find((item) => item.id === command)?.searchValue;

    if (res) {
      Object.keys(search).forEach((key) => {
        if (!res[key]) {
          search[key] = undefined;
        } else {
          search[key] = res[key];
        }
      });
    }
  };

  const changeDetail = (row) => {
    const curInfo = changeList.value?.find((item) => item.code === row.code);
    if (curInfo) {
      curInfo.defaultProductSku = row.planTurnOverCacuBean?.defaultProductSku;
      curInfo.detailList = row.planTurnOverCacuBean?.detailList;
      curInfo.softDay = row.planTurnOverCacuBean?.softDay;
    } else {
      changeList.value.push(row.planTurnOverCacuBean);
    }
  };

  // 修改发货计划数量后，计算库存结余、周转天数
  const calculating = ref(false);
  const calcuTurnDayList = async (row, index, itemValue?) => {
    const params = {
      ...row,
      detailList: row?.detailList?.filter((item) => {
        return ['预测销量', 'minDay'].includes(itemValue)
          ? item?.items[0]?.value !== '发货计划数量'
          : item;
      }),
    };
    try {
      calculating.value = true;
      const res = await erpApi.luteosErpPlanTurnoverCalcuTurnDayList(params);
      listData.value.recordList[index].planTurnOverCacuBean = res;
      changeDetail(listData.value.recordList[index]);
    } finally {
      calculating.value = false;
    }
  };

  // 更新发货计划
  const updateLoading = ref(false);
  const update = async () => {
    if (calculating.value) {
      setTimeout(() => {
        update();
      }, 300);
    } else {
      if (!changeList.value?.length) return ElMessage.warning('请先修改数据');
      try {
        updateLoading.value = true;
        const res = await erpApi.luteosErpPlanTurnoverSaveCalcuTurnDayList(changeList.value);
        ElMessage.success('更新成功');
        changeList.value = [];
        refreshList();
      } finally {
        updateLoading.value = false;
      }
    }
  };

  // 更新预测或在途在制数量
  // type: predict - 销售预测, transit - 在途在制数量
  const update2 = async (type: string) => {
    const str = type === 'predict' ? '销售预测' : '在途在制数量';
    const currentCodes = listData.value?.recordList
      ?.filter((item) => item.hasOpPermission) // 过滤当前账号有权限操作的数据
      ?.map((item) => ({
        code: item.code,
      }));
    if (!currentCodes?.length) return ElMessage.warning('请先修改数据');
    const isConfirmed = await swal.confirm({
      title: `确定要更新${str}？`,
      icon: undefined,
    });
    if (!isConfirmed) return;
    loadingMap.value = {
      ...loadingMap.value,
      [type]: true,
    };
    const api =
      type === 'predict'
        ? erpApi.luteosErpPlanTurnoverManualSyncForecast
        : erpApi.luteosErpPlanTurnoverManualSnapOnWay;
    await api(currentCodes);
    ElMessage.success(`${str}更新成功`);
    loadingMap.value = {
      ...loadingMap.value,
      [type]: false,
    };
    setTimeout(() => {
      refreshList();
    }, 300);
  };

  const supplierList = ref<any>([]);
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierList.value = res.supplierList!.map((item) => {
      return {
        label: item.supplierName,
        value: item.supplierCode,
      };
    });
  };
  getSupplierList();

  const oldSoftMinDay = ref();
  const calcuMinDay = async (row, index) => {
    if (oldSoftMinDay.value === row.planTurnOverCacuBean.softDay) {
      return;
    }
    await calcuTurnDayList(
      {
        ...row.planTurnOverCacuBean,
        // detailList: row.planTurnOverCacuBean?.detailList?.filter(
        //   (item) => item?.items[0]?.value !== '发货计划数量'
        // ),
      },
      index,
      'minDay'
    );
    oldSoftMinDay.value = row.planTurnOverCacuBean.softDay;
  };
  const recordOldSoftMinDay = (val) => {
    oldSoftMinDay.value = val;
  };
</script>

<style scoped lang="scss">
  :deep(.el-table__cell) {
    vertical-align: top !important;
  }
  .detail-table {
    :deep(.el-table__row:first-child) {
      .el-table__cell {
        padding-top: 0;
      }
    }
    :deep(.el-table__row:last-child) {
      .el-table__cell {
        padding-bottom: 0;
      }
    }
    :deep(.el-table__cell:has(.el-input)) {
      padding: 8px 0;
      .el-input__inner {
        height: 36px;
      }
    }
  }
  :deep(.vxe-cell) {
    white-space: normal !important;
  }
  .child-item {
    height: 48px;
    line-height: 48px;
  }

  .dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    .dropdown-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
  .item-actions {
    margin-left: 14px;
    display: flex;
  }
  .pseudo-input {
    width: 100%;
    padding: 0 10px;
    height: 42px;
    line-height: 40px;
    border-radius: 4px;
    background: #f5f7fa;
    color: #c0c4cc;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
  .pseudo-input.can-edit {
    cursor: pointer;
  }
  .pseudo-input:not(.can-edit) {
    cursor: not-allowed;
    background: #f0f0f0;
    color: #bfbfbf;
  }
  .input-edit-wrapper {
    width: 100%;
    position: relative;
    display: inline-block;
  }
  .input-suffix-icon {
    display: flex;
    align-items: center;
    position: absolute;
    right: 8px;
    top: 0;
    height: 100%;
    color: #c0c4cc;
    cursor: pointer;
    z-index: 2;
    transition: color 0.2s;
  }
  .input-suffix-icon:hover {
    color: #409eff;
  }
  .item-name {
    display: flex;
    align-items: center;
  }
</style>
