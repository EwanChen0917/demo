<template>
  <div class="d-flex justify-content-between align-items-center">
    <el-tabs v-model="search.status" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="item in tabStatusList"
        :key="item.status"
        :label="item.statusName"
        :name="item.status"
      >
        <template #label>
          {{ item.statusName }}
          <span class="tab-count">({{ listData?.missStatus[item.code] }})</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.saleSkuCode"
        style="width: 300px"
        placeholder="渠道唯一标识/产品SKU/供应链SKU"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="来源" v-model="search.source" clearable class="w-125px">
        <el-option
          v-for="item in sourceObject"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <ProductChannelSelect v-model="search.channel" clearable class="w-125px" />
      <CountrySelect v-model="search.site" placeholder="站点" clearable class="w-125px" />
      <ProductShopSelect
        v-model="search.userAccount"
        clearable
        class="w-125px"
        :platform="search.channel"
        :site="search.site"
      />
      <el-select
        placeholder="类型"
        v-model="search.type"
        clearable
        class="w-125px"
        v-if="search.status !== 1"
      >
        <el-option :value="0" label="单产品" />
        <el-option :value="1" label="组合产品" />
        <el-option :value="3" label="套装产品" />
      </el-select>
      <DeptMember
        v-model="search.operator"
        placeholder="运营"
        deptId="65717209"
        clearable
        class="w-125px"
      />
      <!--      <el-select placeholder="运营" v-model="search.operator" filterable clearable class="w-125px">
              <el-option
                v-for="person of dickbook.deptMember_list"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>-->
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        @click="addPlatformSku"
        v-permission="'skurelationAddSku'"
      >
        新增映射关系
      </el-button>
      <el-button
        v-permission="'skurelationImport'"
        class="button"
        type="primary"
        @click="batchUpdateVisible = true"
      >
        导入
      </el-button>
      <el-button v-permission="'skurelationExport'" type="primary" plain @click="exportSelect">
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.saleSkuBeanList"
      row-key="uniqueCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="渠道唯一标识" min-width="250" fixed>
        <template #header>
          渠道唯一标识
          <el-tooltip content="亚马逊为子ASIN、其他渠道为店铺SKU" placement="top" effect="dark">
            <el-icon>
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </template>
        <template #default="{ row }">
          <div class="d-flex align-items-center pe-5">
            <span class="text-gray-700 fw-bold">
              渠道唯一标识：{{ row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode }}
            </span>
            <Copy :content="row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode" />
          </div>
          <div class="d-flex align-items-center pe-5">
            <span class="text-gray-700 fw-bold">
              店铺SKU：{{ row.channel?.startsWith('amazon') ? row.msku : row.saleSkuCode }}
            </span>
            <Copy :content="row.channel?.startsWith('amazon') ? row.msku : row.saleSkuCode" />
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="店铺SKU" prop="msku" min-width="150">
        <template #default="{ row }">
          <span>{{ row.msku || '&#45;&#45;' }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="产品SKU*数量" min-width="190" v-if="search.status !== 1">
        <template #default="{ row }">
          <div v-if="[2, 3]?.includes(row.status)">--</div>
          <div
            v-else
            class="d-flex gap-2 align-items-center"
            v-for="(item, index) in row.skuRelationList"
            :key="index"
          >
            <el-button type="primary" link @click="toSkuList(item.skuCode, item.productType)">
              {{ item.skuCode }}
            </el-button>
            <Copy :content="item.skuCode" />
            <span v-if="item.skuCode">*</span>
            <span v-else>--</span>
            <span class="text-gray-400">{{ item.skuQty }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应链SKU*数量" min-width="190">
        <template #default="{ row }">
          <div
            class="d-flex gap-2 align-items-center"
            v-for="(item, index) in row.skuRelationList"
            :key="index"
          >
            <span>{{ item.productSku }}</span>
            <Copy :content="item.productSku" />
            <span v-if="item.productSku">*{{ item.skuQty }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="渠道" />
      <el-table-column prop="userAccount" label="店铺账号" min-width="190" />
      <el-table-column prop="siteName" label="站点" />
      <el-table-column prop="typeDesc" label="类型" v-if="search.status !== 1">
        <template #default="{ row }">
          <span
            class="badge"
            :class="row.relType === 1 ? 'badge-light-info' : 'badge-light-primary'"
          >
            {{ row?.typeDesc }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="运营" prop="operatorName" />
      <el-table-column label="备注" prop="remark" min-width="120">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.remark" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="sourceDesc" label="来源" />
      <el-table-column width="120px" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row,
                permissionCode: 'skurelationDetail',
                hide: [1, 2, 3]?.includes(row.status),
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
                permissionCode: 'skurelationEdit',
                disabled: row.source === 'JJ',
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                row,
              },
              {
                label: '删除',
                key: 'del',
                text: true,
                type: 'danger',
                row,
                permissionCode: 'skurelationDelete',
                disabled: row.source === 'JJ',
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
  <AddSkuModal
    :dickbook="dickbook"
    :title="skuModalTitle"
    :uniqueCode="uniqueCode"
    :detail-info="detailInfo"
    :visible="visible"
    v-if="visible"
    :platformSku="curPlatformCode || ''"
    :type="operateType"
    ref="addSkuModalRef"
    @close="visible = false"
    @save="handleAddSkuRelation"
  />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="sale_sku"
    title="导入(新增店铺SKU)"
    @close="batchUpdate"
  />

  <ExportSelectDialog ref="exportSelectRef" @success="tableRef?.clearSelection()" />
  <LogDialog ref="logDialogRef" />
</template>

<script lang="ts" setup name="skurelationnew">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import {
    dataApi,
    memberApi,
    platformApi,
    PlatformApi,
    productApi,
    ProductApi,
  } from '@/api/index';
  import * as swal from '@/utils/swal';
  // import AddSkuModal from './components/addSkuModal.vue';
  import { IDickbook } from '@/views/goodscenter/goodsmanage/skulist/data';
  import BatchUpdateModal from '@/views/goodscenter/components/BatchUpdateModal.vue';
  import ExportSelectDialog from '@/views/goodscenter/goodsmanage/skurelation/components/exportSelectDialog.vue';
  import LogDialog from '@/views/goodscenter/goodsmanage/skurelation/components/logDialog.vue';
  import AddSkuModal from '../skulist/components/addSkuModal.vue';

  const PAGE_SIZE = 10;
  const router = useRouter();
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    // searchData,
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
    ProductApi.LuteosProductSaleSkuQuerySaleSkuList.RequestQuery,
    ProductApi.LuteosProductSaleSkuQuerySaleSkuList.ResponseBody
  >({
    searchDefaults: {
      saleSkuCode: undefined,
      channel: undefined,
      type: undefined,
      userAccount: undefined,
      site: undefined,
      status: '',
      source: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuQuerySaleSkuList,
    serviceManual: true,
  });

  const tabStatusList = [
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: 0, code: 'commonCount', statusName: '正常', count: '' },
    { status: 1, code: 'missCount', statusName: '缺失映射', count: '' },
    { status: 2, code: 'ignoreCount', statusName: '忽略', count: '' },
    { status: 3, code: 'endCount', statusName: '已废弃', count: '' },
  ];

  const route = useRoute();
  if (route.query?.operator) {
    search.operator = route.query?.operator as string;
  }

  if (route.query?.status) {
    search.status = parseInt(route.query?.status, 10);
  }

  const skuModalVisible = ref(false);

  // 勾选产品
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.uniqueCode);
  };
  // 新增店铺SKU
  const addPlatformSku = () => {
    uniqueCode.value = '';
    skuModalTitle.value = '新增';
    operateType.value = 'add';
    visible.value = true;
    // curPlatformCode.value = '';
    // openDialog({});
  };

  // 按钮操作
  const rowData = ref({});
  const skuModalTitle = ref('');
  const curPlatformCode = ref('');
  const addSkuModalRef = ref();
  const openDialog = (row) => {
    const params = {
      platformSku: row.platformSku || '',
      channel: row.channel || '',
      channelName: row.channelName || '',
      operator: row.operator || '',
      saleType: row.saleType || '',
      saleTypeName: row.saleTypeName || '',
      shop: row.shop || '',
      shopName: row.shopName || '',
      site: row.site || '',
      siteName: row.siteName || '',
      skuProportion: row.skuProportion || '',
      quantity: +row.skuProportion || 0,
      skuList: row.skuRelationList || [],
      relType: +row.relType || 0,
    };

    addSkuModalRef.value.open(params);
  };

  const uniqueCode = ref();
  const visible = ref(false);
  const operateType = ref();
  const detailInfo = ref();
  const logDialogRef = ref();
  const handleActions = async (operate) => {
    const { key, row } = operate;
    if (key === 'view') {
      // curPlatformCode.value = row.platformSku;
      // skuModalVisible.value = true;
      uniqueCode.value = row.uniqueCode;
      skuModalTitle.value = '详情';
      operateType.value = 'detail';
      visible.value = true;
      // openDialog(row);
    } else if (key === 'edit') {
      skuModalTitle.value = '编辑';
      if ([1, 2, 3]?.includes(row.status)) {
        uniqueCode.value = null;
        detailInfo.value = row;
        operateType.value = 'lose';
      } else {
        uniqueCode.value = row.uniqueCode;
        detailInfo.value = null;
        operateType.value = 'edit';
      }
      visible.value = true;
    } else if (key === 'log') {
      logDialogRef.value?.open(row.uniqueCode);
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await productApi.luteosProductSaleSkuRemoveSaleSkuRelation({
        uniqueCode: row.uniqueCode,
      });
      ElMessage.success('删除成功');
      refreshList();
    }
  };
  // 关闭sku添加/编辑弹窗
  const handleSkuModalClose = () => {
    skuModalVisible.value = false;
  };

  const handleSkuModalSave = () => {
    handleSkuModalClose();
    refreshList();
  };

  const dickbook = ref<IDickbook>({
    product_shop: [],
    shop_platform: [],
    product_channel: [],
    product_site: [],
    product_saletype: [],
    product_activity: [],
    supplier_list: [],
    currency_list: [],
    deptMember_list: [],
  });
  const getSupplierList = async () => {
    const res: any = await dataApi.luteosDataQuerySupplierBaseList();
    return res.supplierList.map((item) => {
      return {
        value: item.supplierCode,
        desc: item.supplierName,
      };
    });
  };
  // 获取币种options

  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    return (res.currencyList as []).map((currency: any) => {
      return {
        value: currency.currencyCode,
        desc: `${currency.currencyCode}【${currency.currencyName}】`,
      };
    });
  };
  const queryDeptMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      deptId: 65717209,
    });
    return res.memberList?.map((item) => {
      return {
        desc: item.name,
        value: item.memberCode,
      };
    });
  };
  const getDickBook = async () => {
    const res: PlatformApi.PlatformDict.ResponseBody = await platformApi.platformDict({
      dictCodes: [
        'product_shop',
        'shop_platform',
        'product_channel',
        'product_site',
        'product_saletype',
        'product_activity',
      ],
    });
    const supplierList = await getSupplierList();
    const currencyList = await getCurrencyOptions();
    const deptMemberList = await queryDeptMemberList();

    dickbook.value = {
      ...(res.dictMap as IDickbook),
      supplier_list: supplierList,
      currency_list: currencyList,
      deptMember_list: deptMemberList,
    };
  };
  getDickBook();

  const handleAddSkuRelation = () => {
    visible.value = false;
    refreshList();
  };

  // 导入
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  const toSkuList = (code, productType) => {
    if (productType === 1) {
      router.push(`/skulist/detail?code=${code}`);
    } else {
      router.push(`/supplyGoods/detail?code=${code}`);
    }
  };

  const exportSelectRef = ref();
  const exportSelect = () => {
    exportSelectRef.value?.open({
      ...search,
      queryParam: getQueryParam(),
      uniqueCodeList: codeList,
    });
  };

  const getQueryParam = () => {
    const data: any = {
      '渠道唯一标识/产品SKU': search.saleSkuCode || '',
    };

    for (const key in data) {
      if (data[key] == '') {
        delete data[key];
      }
    }

    return data;
  };

  const sourceObject = ref([]);
  const querySourceList = () => {
    productApi.luteosProductSaleSkuQuerySource({}).then((res: any) => {
      sourceObject.value = res.sourceList || [];
    });
  };

  querySourceList();
</script>

<style scoped lang="scss">
  .old-product-sku-list {
    &:last-child {
      margin: 0;
    }
  }

  .fa-copy {
    margin-top: -4px;
    margin-left: 10px;
  }

  .platform-sku {
    color: #3e97ff;
    text-decoration: underline;
    cursor: pointer;
  }

  .text-primary {
    color: #3e97ff;
  }

  .platform-wrap {
    display: flex;
    flex-direction: row;
  }

  .path4 {
    display: inline-block;
    width: 20px;
    height: 16px;
    line-height: 8px;
    text-align: center;
    color: #999;
    border-radius: 5px;
    background: #ccc;
    margin-left: 10px;
    margin-top: 2px;
    cursor: pointer;
  }

  .sku-popover {
    padding: 20px;

    div {
      margin-bottom: 5px;
    }
  }
</style>
