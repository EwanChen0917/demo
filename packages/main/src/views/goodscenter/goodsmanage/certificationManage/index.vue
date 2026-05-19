<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="产品SKU/产品SKU名称/型号/认证项目"
          style="width: 300px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <div ref="areaCountryContainerRef">
        <el-cascader
          v-model="search.saleRegionListSelect"
          :options="areaOptions"
          :props="{
            expandTrigger: 'hover',
            multiple: true,
            checkStrictly: false,
          }"
          placeholder="区域/国家"
          filterable
          clearable
          collapse-tags
          collapse-tags-tooltip
          popper-class="popper-class-sku-area"
        />
      </div>

      <el-select
        style="width: 200px"
        v-model="search.statusList"
        placeholder="认证状态"
        multiple
        clearable
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option v-for="(val, key) in cerMap" :key="key" :label="val || ''" :value="key!" />
      </el-select>
      <DeptMember
        v-model="search.updaterCodeList"
        placeholder="更新人"
        filterable
        multiple
        clearable
        style="width: 200px"
      />
      <el-date-picker
        class="w-120"
        style="width: 240px"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="更新开始时间"
        end-placeholder="更新结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date()]"
        @change="handleTimeChange"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="updateSku">更新数据</el-button>
      <!-- <el-button
        class="button"
        type="primary"
        @click="batchOperate"
        v-permission="'spuBatchOperate'"
      >
        批量操作
      </el-button> -->
      <el-button class="button" type="primary" @click="batchUpdateVisible = true">导入</el-button>
      <el-button class="button" @click="handleExport" :loading="exportLoading" type="primary" plain>
        导出
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.list"
      row-key="certificationId"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="skuCode" label="产品SKU" min-width="120" />
      <el-table-column prop="skuName" label="产品SKU名称" min-width="170" />
      <el-table-column prop="model" label="型号" min-width="100" />
      <el-table-column prop="certificationItem" label="认证项目" min-width="120" />
      <el-table-column prop="complianceCountryName" label="合规覆盖的国家" min-width="140" />
      <el-table-column prop="certificatePath" label="认证证书报告路径" min-width="150">
        <template #default="{ row }">
          <el-link
            type="primary"
            :href="row.certificatePath"
            target="_blank"
            style="max-width: 100px"
          >
            <el-icon v-if="row.certificatePath">
              <Link />
            </el-icon>
            <!-- {{ row.certificationItem }} -->
            <!-- {{ row.certificatePath }} -->
            <OverflowTooltip :content="row?.certificatePath" :line="1" />
          </el-link>
          <Copy :content="row.certificatePath" />
        </template>
      </el-table-column>
      <el-table-column prop="certificationStatusDesc" label="认证状态" min-width="120" />
      <el-table-column prop="effectiveDate" label="生效日期" min-width="120" />
      <el-table-column prop="expiryDate" label="失效日期" min-width="120" />
      <el-table-column prop="updater" label="更新人" min-width="120" />
      <el-table-column prop="updateTime" label="更新时间" min-width="120" />
      <!-- <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                curProductSpu: scope.row.productSpu,
                hide: scope.row.state === 3,
                permissionCode: 'goodsEdit',
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                row: scope.row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column> -->
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

  <!-- <BatchOperateDialog ref="batchOperateDialogRef" title="批量操作" @success="handleSuccess" /> -->
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    @close="batchUpdate"
    @export="handleExport"
    type="import"
    title="导入"
  />
  <LogDialog ref="logDialogRef" />
</template>

<script lang="ts" setup name="certificationlist">
  import { ElMessage, ElPopover, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { pdtApi, productApi, ProductApi, ProductContracts } from '@/api/index';
  import type { FormInstance } from 'element-plus';
  import * as swal from '@/utils/swal';
  // import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  // import { openWindow } from '@/utils';
  // import BatchOperateDialog from '@/views/goodscenter/goodsmanage/goodslist/components/batchOperateDialog.vue';
  import BatchUpdateModal from '@/views/goodscenter/goodsmanage/certificationManage/components/batchUpdateModal.vue';
  // import CategoryModal from './Modal/categoryModal.vue';
  // import ProductLevel from '../../components/productLevel.vue';
  // import SpecificationsInfo from '../../components/specificationsInfo.vue';
  // import PurchaseInfo from '../../components/purchaseInfo.vue';
  // import DeclareInfo from '../../components/declareInfo.vue';
  import { omit } from 'lodash-es';
  import { onMounted } from 'vue';
  import dayjs from 'dayjs';
  import LogDialog from './components/logDialog.vue';

  // 导入成功
  const handleImportSuccess = () => {
    refreshList();
    // clearCheckBoxSelection();
  };

  const logDialogRef = ref();

  // 销售区域
  const areaCountryList = ref<any[]>([]);
  const getAreaCountryList = async () => {
    const res = await productApi.luteosProductSkuQueryCountry();
    if (res) {
      areaCountryList.value = res;
    }
  };

  getAreaCountryList();
  const areaOptions = computed(() => {
    return (areaCountryList.value || []).map((area) => {
      return {
        label: area.area,
        value: area.area,
        children: (area.countryInfoList || []).map((c) => {
          return {
            label: c.countryName,
            value: c.countryCode,
          };
        }),
      };
    });
  });

  // const time = ref();
  const time = ref<any[]>([]);
  onMounted(() => {
    const start = dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    time.value = [start, end]; // 设置默认的日期范围
  });
  const handleTimeChange = (val) => {
    search.updateTimeStart = undefined;
    search.updateTimeEnd = undefined;
    if (val) {
      search.updateTimeStart = val[0] || '';
      search.updateTimeEnd = val[1] || '';
    } else {
      search.updateTimeStart = undefined;
      search.updateTimeEnd = undefined;
    }
  };
  const route = useRoute();
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
    resetSearch,
    // selectedKeys,
  } = useList<
    ProductApi.ProductSkuCertificationListReq.RequestQuery,
    ProductApi.ProductSkuCertificationListResp.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      saleRegionListSelect: undefined,
      saleRegionList: undefined,
      statusList: undefined,
      updaterCodeList: undefined,
      updateTimeStart: dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      updateTimeEnd: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { saleRegionListSelect } = searchData;
      const areaCountryList1 = saleRegionListSelect || [];
      const countryList = [...new Set(areaCountryList1.map((x) => x[1]).filter(Boolean))];
      return {
        ...omit(searchData, 'saleRegionListSelect'),
        saleRegionList: countryList,
      };
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQuerySkuCertificationList,
  });

  // 表单定义
  const formRef = ref<FormInstance>();

  const optionsMap = reactive({
    options1: [],
    options2: [],
    options3: [],
    options4: [],
    options5: [],
  });
  const memberOptions = reactive([]);
  const cerMap = reactive({
    0: '无需认证',
    1: '待认证',
    2: '已认证',
    3: '即将失效',
    4: '已失效',
  });
  const stateMap = reactive({
    0: '开发中',
    1: '待上架',
    2: '可销售',
    3: '已下架',
    5: '已取消',
  });
  const statusColorMap = reactive({
    0: 'badge-light-primary',
    1: 'badge-light-info',
    2: 'badge-light-success',
    3: 'badge-light-danger',
    5: 'badge-light-gray',
  });

  const addFormRefs = ref<FormInstance>();
  const operateType = ref<number>(0);
  const productSpu = ref<string>('');
  const addForm = reactive<ProductApi.LuteosProductOperateProduct.RequestBody>({
    /** 采购信息：采购币种 */
    purchaseCurrencyCode: 'CNY',
    /** 申报信息：申报编码 */
    declareCode: '',
    /** 申报信息：申报品名CN */
    declareName: '',
    /** 申报信息：申报品名EN */
    declareNameEn: '',
    /** 合并产品spu */
    mergeProductSpu: '',
    /**
     * 操作类型 1：合并spu 2：添加产品等级 3：添加规格信息 4：添加采购信息 5：添加申报信息
     * @format int32
     */
    operateType: '',
    /**
     * 规格信息：产品高度cm
     * @format double
     */
    productHeight: '',
    /**
     * 规格信息：产品长度cm
     * @format double
     */
    productLength: '',
    /**
     * 产品等级 1-正常 2-淘汰 3-侵权
     * @format int32
     */
    productLevel: 0,
    /** 申报信息：产品材质及成分含量 */
    productMaterialIngredient: '',
    /**
     * 规格信息：产品净高度cm
     * @format double
     */
    productNetHeight: '',
    /**
     * 规格信息：产品净长度cm
     * @format double
     */
    productNetLength: '',
    /**
     * 规格信息：净重kg
     * @format double
     */
    productNetWeight: '',
    /**
     * 规格信息：产品净宽度cm
     * @format double
     */
    productNetWidth: '',
    /** 产品spu */
    productSpu: '',
    /**
     * 规格信息：毛重kg
     * @format double
     */
    productWeight: '',
    /**
     * 规格信息：产品宽度cm
     * @format double
     */
    productWidth: '',
    /** 采购信息：采购编码 */
    purchaseCode: '',
    /** 采购信息：采购负责人 */
    purchaseOperator: '',
    /** 采购信息：默认采购单价 */
    purchasePrice: '',
    /**
     * 产品质检 0-不需要 1-需要
     * @format int32
     */
    qualityCheck: 0,
    /** 敏感类型 */
    sensitiveTypeCodeList: [],
    /** 采购信息：供应商代码 */
    supplierCode: '',
  });

  // 关联分类操作
  const visible = ref(false);
  // 新增操作
  const addVisible = ref(false);

  const currentProductSpu = ref('');
  const currentName = ref('');
  const selectedRow = reactive<ProductContracts.ProductBean>({});

  const operateMap = {
    /* launch: {
    type: 6,
    desc: '上架',
  }, */
    remove: {
      type: 7,
      desc: '下架',
    },
    /* cancelLaunch: {
    type: 8,
    desc: '取消上架',
  }, */
    enable: {
      type: 9,
      desc: '启用',
    },
    develop: {
      type: 10,
      tips: '变更为开发中',
    },
    waitLaunch: {
      type: 11,
      tips: '变更为待上架',
    },
    quit: {
      type: 12,
      desc: '废弃',
    },
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, curProductSpu } = item;
    if (key === 'view') {
      // sessionStorage.setItem('brandSearchInfo', JSON.stringify(search));
      // router.push(`/goodsmanage/goodsdetail?code=${curProductSpu}`);
      toDetail(curProductSpu);
    } else if (key === 'edit') {
      toEdit(curProductSpu);
    } else if (key === 'log') {
      // console.log(item.row, item.row.productSpu);
      logDialogRef.value?.open(item.row.productSpu);
    } else if (key === 'delete') {
      const isConfirmed = await swal.confirm(`确定删除${curProductSpu}吗？`);
      if (isConfirmed) {
        await productApi.luteosProductRemoveProduct({
          productSpu: curProductSpu,
        });
        ElMessage.success('删除成功');
        refreshList();
      }
    } else if (Object.keys(operateMap)?.includes(key)) {
      const { type, desc, tips } = operateMap[key];
      const isConfirmed = await swal.confirm(
        `确定${desc || '将'} ${curProductSpu} ${tips ?? ''}吗？`
      );
      if (isConfirmed) {
        await productApi.luteosProductOperateProduct({
          operateType: type,
          productSpu: curProductSpu,
        });
        ElMessage.success(`${curProductSpu} ${tips || desc}成功`);
        refreshList();
      }
    }
  };

  const toEdit = (curProductSpu) => {
    router.push(`/goodslist/edit?code=${curProductSpu}`);
  };
  const toDetail = (curProductSpu) => {
    // router.push(`/goodslist/detail?code=${curProductSpu}`);
    router.push({
      path: '/goodslist/detail',
      query: {
        code: curProductSpu,
      },
    });
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductSkuExportProductSkuCertification,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            app_code: d?.appCode,
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
      certificationIdList: codeList.value,
    });
  };

  // 勾选sku
  const totalList = ref([]);
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
    codeList.value = list.map((item) => item.certificationId);
  };
  const handleSortChange = (sort) => {
    // console.log(sort);
    if (sort.order) {
      search.orderBy = sort.prop;
      search.asc = sort.order === 'ascending';
    } else {
      search.orderBy = undefined;
      search.asc = undefined;
    }
  };

  const batchOperateDialogRef = ref(null);
  const batchOperate = () => {
    if (!totalList.value.length) {
      ElMessage.warning('请先勾选产品');
    } else {
      batchOperateDialogRef.value?.open(totalList.value);
    }
  };

  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 保存操作
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (!addFormRefs.value) return;
    const valid = await addFormRefs.value.formRef.validate();
    if (!valid) return;
    try {
      saveLoading.value = true;
      await productApi.luteosProductOperateProduct({
        ...addFormRefs.value.form,
        productSpu: productSpu.value,
        operateType: operateType.value,
      });
      addFormRefs.value.formRef.resetFields();
      addVisible.value = false;
      swal.success('保存成功');
      refreshList();
    } finally {
      saveLoading.value = false;
    }
  };

  const getOptions = async (categoryCode: string, level: number) => {
    const res = await productApi.luteosProductCategoryQueryCategoryLevelList({
      categoryCode,
    });
    optionsMap[`options${level}`] = res.categoryLevelBeanList;
  };
  getOptions('', 1);

  const getOperatorOptions = async () => {
    const res = await pdtApi.luteosPdtQueryOperatorList({
      operatorType: 1,
    });
    memberOptions.value = res.memberList;
    console.log(memberOptions);
  };
  getOperatorOptions();

  const toSkuList = (productSpu) => {
    router.push(`/skulist?productSpu=${productSpu}`);
  };

  const handleSuccess = () => {
    refreshList();
    tableRef.value?.clearSelection();
  };

  const getQueryParam = () => {
    const data: any = {
      '产品名称/产品SPU': search.keyword || '',
      产品经理:
        memberOptions.value.find((item) => item.memberCode === search.productManagerCode)?.name ||
        '',
      产品状态: stateMap[search.state] || '',
    };

    for (const key in data) {
      if (data[key] == '') {
        delete data[key];
      }
    }

    return data;
  };
  const beforeClose = (done: () => void) => {
    try {
      addFormRefs.value.formRef.resetFields();
      done();
    } catch (e) {
      addVisible.value = false;
    }
  };

  const reset = () => {
    // time.value = [];
    const start = dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    time.value = [start, end]; // 设置默认的日期范围
    resetSearch();
  };

  const updateSku = async () => {
    // openWindow('https://bi.luteos.com/#/site-view/Tn8CZdBKg2/H5ALzrtIIy');
    const res: any = await productApi.luteosProductSkuProductSkuCertificationSyncJob();
    if (res) {
      ElMessage.success('同步成功');
    }
  };
</script>

<style scoped lang="scss">
  /*:deep(.el-table-fixed-column--left) {
background-color: white !important;
}

:deep(.el-table-fixed-column--right) {
background-color: white !important;
padding-left: 1.5rem;
}*/
  .svg-icon {
    fill: var(--el-color-primary);
  }

  .svg-icon:hover {
    fill: var(--el-color-primary-light-3);
  }
  .popper-class-sku-area {
    max-height: 600px;
    overflow-y: auto;
  }
  :deep(.el-cascader) {
    .el-cascader__tags {
      top: 0;
      transform: translateY(0);

      .el-tag {
        max-width: 100px;
      }
    }
  }
</style>
