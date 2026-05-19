<template>
  <KeenList>
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="店铺SKU/产品SKU/供应链SKU"
        style="width: 300px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductChannelSelect v-model="search.channel" clearable class="w-125px" />
      <ProductSiteSelect v-model="search.site" clearable class="w-125px" />
      <ProductShopSelect
        v-model="search.shop"
        clearable
        class="w-125px"
        :platform="search.channel"
        :site="search.site"
      />
      <el-select placeholder="类型" v-model="search.relType" clearable class="w-125px">
        <el-option :value="0" label="单产品" />
        <el-option :value="1" label="组合产品" />
        <el-option :value="3" label="套装产品" />
      </el-select>
      <el-select placeholder="运营" v-model="search.operator" filterable clearable class="w-125px">
        <el-option
          v-for="person of dickbook.deptMember_list"
          :key="person.value"
          :label="person.desc"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery()">查询</el-button>
      <el-button
        class="button"
        type="primary"
        @click="addPlatformSku"
        v-permission="'skurelationOldAddSku'"
      >
        新增店铺SKU
      </el-button>
      <el-button
        v-permission="'skurelationOldImport'"
        class="button"
        type="primary"
        @click="batchUpdateVisible = true"
      >
        导入
      </el-button>
      <el-button
        v-permission="'skurelationOldExport'"
        class="button"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.platformSkuList"
      row-key="productSku"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="店铺SKU" min-width="250" fixed>
        <template #default="{ row }">
          <div class="d-flex align-items-center pe-5">
            <span class="text-gray-800 fw-bold">{{ row.platformSku }}</span>
            <i
              class="fas fa-copy text-hover-primary cursor-pointer"
              @click="copyFn(row.platformSku, '店铺SKU')"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品SKU*数量" min-width="190">
        <template #default="{ row }">
          <el-space v-for="(item, index) in row.skuRelationList" :key="index" size="small">
            <el-button type="text" @click="toSkuList(item.skuCode)">
              {{ item.skuCode }}
            </el-button>
            <span class="text-gray-400">* {{ item.quantity }}</span>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="建议销售价" min-width="120">
        <template #default="{ row }">
          <div v-for="(item, index) in row.skuRelationList" :key="index">
            <el-space v-if="item.price">
              <span>{{ item.price }}</span>
              <span class="text-gray-400">{{ item.currency }}</span>
            </el-space>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="skuProportion" label="费用比例">
        <template #default="{ row }">
          <div v-for="(item, index) in row.skuRelationList" :key="index">
            <span v-if="item.skuProportion">{{ item.skuProportion }}%</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="渠道">
        <template #default="{ row }">
          <span class="fs-7">{{ row.channelName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shop" label="店铺">
        <template #default="{ row }">
          <span class="fs-7">{{ row.shop }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="siteName" label="站点">
        <template #default="{ row }">
          <span class="fs-7">{{ row.siteName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operatorName" label="运营人">
        <template #default="{ row }">
          <span class="fs-7">{{ row.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="relType" label="类型">
        <template #default="{ row }">
          <!--            <span v-if="row.relType === 1" class="badge badge-light-info">组合产品</span>
          <span v-else class="badge badge-light-primary">{{ row.relTypeDesc }}</span>-->
          <span
            class="badge"
            :class="row.relType === 1 ? 'badge-light-info' : 'badge-light-primary'"
          >
            {{ row?.relTypeDesc }}
          </span>
        </template>
      </el-table-column>

      <el-table-column width="80px" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row,
                permissionCode: 'skurelationOldDetail',
              },
              /*{
                  label: '删除',
                  key: 'del',
                  text: true,
                  type: 'danger',
                  row,
                },*/
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
  <AddSkuModalOld
    :dickbook="dickbook"
    :title="skuModalTitle"
    :platformSku="curPlatformCode || ''"
    type="addPlatformSku"
    ref="addSkuModalRef"
    @close="() => {}"
    @save="handleAddSkuRelation"
  />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="platform_sku"
    title="导入(新增店铺SKU)"
    @close="batchUpdate"
  />
</template>

<script lang="ts" setup name="skurelation">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/views/lute-os/hooks/list/useList';
  import {
    dataApi,
    memberApi,
    platformApi,
    PlatformApi,
    productApi,
    ProductApi,
  } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { copyFn } from '@/utils/copyFn';
  // import AddSkuModal from './components/addSkuModal.vue';
  import { IDickbook } from '@/views/lute-os/goodscenter/goodsmanage/skulist/data';
  import BatchUpdateModal from '@/views/lute-os/goodscenter/components/BatchUpdateModal.vue';
  import AddSkuModalOld from '../skulist/components/addSkuModalOld.vue';

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
    runQuery,
  } = useList<
    ProductApi.LuteosProductSkuQueryPlatformSkuList.RequestQuery,
    ProductApi.LuteosProductSkuQueryPlatformSkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: undefined,
      operator: undefined,
      relType: undefined,
      shop: undefined,
      site: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQueryPlatformSkuList,
  });

  const skuModalVisible = ref(false);

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductSkuExportPlatformSku,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    exportRun({
      ...search,
      pageNum: current.value,
      pageSize: pageSize.value,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };

  // 勾选产品
  const codeList = reactive([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.platformSku);
  };
  // 新增店铺SKU
  const addPlatformSku = () => {
    skuModalTitle.value = '新增';
    curPlatformCode.value = '';
    openDialog({
      shop: 'Momcozy',
      saleType: '01',
    });
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
  const handleActions = async (operate) => {
    const { key, row } = operate;
    if (key === 'view') {
      curPlatformCode.value = row.platformSku;
      // skuModalVisible.value = true;
      openDialog(row);
      skuModalTitle.value = '详情';
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await productApi.luteosProductSkuOperatePlatformSku({
        channel: row.channel,
        operateType: 1,
        platformSku: row.platformSku,
        saleType: row.saleType,
        shop: row.shop,
        site: row.site,
        relType: row.relType,
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
    console.log('deptMemberList', deptMemberList);
    dickbook.value = {
      ...(res.dictMap as IDickbook),
      supplier_list: supplierList,
      currency_list: currencyList,
      deptMember_list: deptMemberList,
    };
  };
  getDickBook();

  const handleAddSkuRelation = async (data) => {
    console.log(data);
    await productApi.luteosProductSkuSavePlatformSkuRelation({ ...data });
    ElMessage.success('新增成功');
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

  const toSkuList = (code) => {
    router.push(`/skulist/detail?code=${code}`);
  };

  const getQueryParam = () => {
    const data: any = {
      '店铺SKU/产品SKU': search.keyword || '',
    };

    for (const key in data) {
      if (data[key] == '') {
        delete data[key];
      }
    }

    return data;
  };
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
