<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyWord" placeholder="产品名称/产品SPU" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <ProductLineSelect v-model="search.productLine" placeholder="产品品线" clearable filterable />
      <CategoryCascader
        v-model="search.categoryCode"
        placeholder="产品分类"
        :emitPath="false"
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      />
      <el-select
        v-model="search.tagCode"
        style="width: 200px"
        placeholder="产品/产品分类标签"
        clearable
      >
        <el-option
          v-for="item in labelOptions"
          :label="item.tagName"
          :value="item.tagCode"
          :key="item.tagCode"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.state"
        placeholder="产品状态"
        clearable
        :teleported="false"
      >
        <el-option v-for="(val, key) in stateMap" :key="key" :label="val || ''" :value="key!" />
      </el-select>
      <el-select
        v-model="search.productManagerCode"
        placeholder="产品经理"
        clearable
        filterable
        :teleported="false"
        style="width: 120px"
      >
        <el-option
          v-for="item in memberOptions.value"
          :key="item.memberCode"
          :label="item.name || ''"
          :value="item.memberCode!"
        />
      </el-select>
      <DeptMember
        style="width: 120px"
        v-model="search.gtm"
        placeholder="GTM经理"
        title="gtm"
        clearable
        filterable
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="toBI">产品分析</el-button>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button
        class="button"
        type="primary"
        @click="batchOperate"
        v-permission="'spuBatchOperate'"
      >
        批量操作
      </el-button>
      <el-button
        class="button"
        v-permission="'spuUpdate'"
        type="primary"
        @click="batchUpdateVisible = true"
      >
        导入
      </el-button>
      <el-button
        class="button"
        v-permission="'goodsAdd'"
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
      :data="listData?.productBeanList"
      row-key="productSpu"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
      max-height="57vh"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品信息" min-width="350" fixed>
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImage"
            :title="scope.row.name"
            :titleEn="scope.row.nameEn"
            :subtitle="scope.row.productSpu"
            copy-title
            copy-subtitle
            permission="goodsdetail"
            :url="`/goodslist/detail?code=${scope.row.productSpu}`"
          />
        </template>
      </el-table-column>

      <el-table-column label="产品SKU数量" min-width="120">
        <template #default="scope">
          <el-button type="text" @click="toSkuList(scope.row.productSpu)">
            {{ scope.row.productSkuCount }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="productLevelDesc" label="产品级别" min-width="120" />
      <el-table-column prop="productTypeDesc" label="产品属性" min-width="120" />
      <el-table-column prop="productLineName" label="产品品线" min-width="120" />
      <el-table-column prop="categoryLevel" label="产品分类" min-width="280">
        <template #default="{ row }">
          <div class="pe-9">{{ row.categoryLevel }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="categoryLabelName" label="分类标签" min-width="120" />
      <el-table-column prop="stateName" label="产品状态" min-width="120">
        <template #default="scope">
          <span class="badge" :class="statusColorMap[scope.row.state]">
            {{ scope.row.stateDesc }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="productManagerName" label="产品经理" min-width="100">
        <template #default="scope">
          <span class="fs-7">{{ scope.row.productManagerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="GTM经理" min-width="100">
        <template #default="scope">
          <span class="fs-7">{{ scope.row.gtmName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
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
              /*{
                label: '上架',
                key: 'launch',
                type: 'primary',
                hide: scope.row.state !== 1,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsLaunch',
              },*/
              /*{
                label: '取消上架',
                key: 'cancelLaunch',
                type: 'primary',
                hide: scope.row.state !== 1,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'cancelLaunch',
              },*/
              {
                label: '废弃',
                key: 'quit',
                type: 'primary',
                hide: ![0, 1].includes(scope.row.state),
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsQuit',
              },
              {
                label: '下架',
                key: 'remove',
                type: 'primary',
                hide: scope.row.state !== 2,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsCancel',
              },
              {
                label: '启用',
                key: 'enable',
                type: 'primary',
                hide: scope.row.state !== 5,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsEnable',
              },
              {
                label: '开发中',
                key: 'develop',
                type: 'primary',
                hide: scope.row.state !== 1,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsDevelop',
              },
              {
                label: '待上架',
                key: 'waitLaunch',
                type: 'primary',
                hide: scope.row.state !== 0,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsWaitLaunch',
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                hide: scope.row.state !== 0 || scope.row.productSkuCount > 0,
                curProductSpu: scope.row.productSpu,
                permissionCode: 'goodsDelete',
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

  <el-dialog
    v-if="addVisible"
    :model-value="addVisible"
    :title="operateTypeMap[operateType]['title']"
    align-center
    :width="operateTypeMap[operateType]['width']"
    @close="
      () => {
        addVisible = false;
      }
    "
    :before-close="beforeClose"
  >
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <h2>{{ operateTypeMap[operateType]['title'] }}</h2>
        <div
          v-if="
            operateType === GoodsOperateType.添加采购信息 ||
            operateType === GoodsOperateType.添加申报信息
          "
        >
          <span class="badge badge-light-primary">工单状态：待提交</span>
        </div>
      </div>
    </template>
    <ProductLevel
      ref="addFormRefs"
      v-if="operateType === GoodsOperateType.添加产品等级"
      :form="addForm"
    />
    <SpecificationsInfo
      ref="addFormRefs"
      v-if="operateType === GoodsOperateType.添加规格信息"
      :form="addForm"
    />
    <PurchaseInfo
      ref="addFormRefs"
      v-if="operateType === GoodsOperateType.添加采购信息"
      :form="addForm"
    />
    <DeclareInfo
      ref="addFormRefs"
      v-if="operateType === GoodsOperateType.添加申报信息"
      :form="addForm"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="beforeClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <CategoryModal v-if="visible" :visible="visible" title="选择关联的分类" @close="closeModal" />
  <BindGoods
    :select-one="true"
    confirm-text="确认合并"
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-row="selectedRow"
  >
    <template #default>
      <div class="mx-9 mb-5 px-9 py-5 bg-light-primary rounded border-primary border border-dashed">
        <div class="mb-3">
          <span class="ext-gray-900 fw-bold">{{ selectedRow?.productSpu || '' }}</span>
          <span class="badge ms-2" :class="statusColorMap[selectedRow.state]">
            {{ selectedRow?.stateDesc || '' }}
          </span>
        </div>
        <div class="d-flex align-items-center mb-2">
          <KeenImagePreview
            :src="selectedRow.productImage"
            :src-list="[selectedRow.productImage]"
            size="75"
          />
          <div class="h-75px ms-5 d-flex flex-column justify-content-between">
            <div class="text-gray-900 fw-bold">
              {{ selectedRow.name }}
            </div>
            <!--            <div>
                          <span>{{ selectedRow?.productSpu || '' }}</span>
                          <span class="badge ms-2" :class="statusColorMap[selectedRow.state]">
                            {{ selectedRow?.stateDesc || '' }}
                          </span>
                        </div>-->
            <div>sku数量：{{ selectedRow?.productSkuCount || 0 }}</div>
            <div class="text-gray-500">{{ selectedRow?.categoryLevel || '' }}</div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center text-primary ps-9">
        <i class="ki-duotone ki-information fs-1 me-1">
          <i class="path1"></i>
          <i class="path2"></i>
          <i class="path3"></i>
        </i>
        <span>请选择一个产品进行合并，将合并至所选产品</span>
      </div>
    </template>
  </BindGoods>
  <BatchOperateDialog ref="batchOperateDialogRef" title="批量操作" @success="handleSuccess" />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    @close="batchUpdate"
    @export="handleExport"
    type="import"
    title="导入"
  />
</template>

<script lang="ts" setup name="goodslist">
    import { ElMessage, ElPopover, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { pdtApi, productApi, ProductApi, ProductContracts } from '@/api/index';
  import type { FormInstance } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { GoodsOperateType } from '@/types/api';
  import BindGoods from '@/views/lute-os/goodscenter/bindGoods/Modal/bindGoods.vue';
  import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { openWindow } from '@/utils';
  import BatchOperateDialog from '@/views/lute-os/goodscenter/goodsmanage/goodslist/components/batchOperateDialog.vue';
  import BatchUpdateModal from '@/views/lute-os/goodscenter/goodsmanage/goodslist/components/batchUpdateModal.vue';
  import CategoryModal from './Modal/categoryModal.vue';
  import ProductLevel from '../../components/productLevel.vue';
  import SpecificationsInfo from '../../components/specificationsInfo.vue';
  import PurchaseInfo from '../../components/purchaseInfo.vue';
  import DeclareInfo from '../../components/declareInfo.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const operateTypeMap = {
    2: {
      width: 700,
      title: '产品等级',
    },
    3: {
      width: 1100,
      title: '规格信息',
    },
    4: {
      width: 1000,
      title: '采购信息',
    },
    5: {
      width: 900,
      title: '申报信息',
    },
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
    ProductApi.LuteosProductQueryProductList.RequestQuery,
    ProductApi.LuteosProductQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      productSpu: undefined,
      productManagerCode: undefined,
      state: route.query.tagCode || route.query.productLine ? undefined : '2',
      categoryCode: route.query.code,
      level: route.query.level,
      itemCode: route.query.itemCode,
      itemType: route.query.itemType,
      tagCode: route.query.tagCode,
      productLine: route.query.productLine,
      gtm: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductQueryProductList,
  });
  const categoryCodeList = ref<any>('');
  //   watchEffect(() => {
  //     const { code, level, itemCode, itemType, tagCode, productLine } = route.query as {
  //       code: '';
  //       level: '';
  //       itemCode: '';
  //       itemType: '';
  //       tagCode: '';
  //     };
  //     search.categoryCode = code;
  //     search.level = level;
  //     search.itemCode = itemCode;
  //     search.itemType = itemType;
  //     if (tagCode) {
  //       search.tagCode = tagCode;
  //       search.state = undefined;
  //     }
  //     if (productLine) {
  //       search.productLine = productLine;
  //       search.state = undefined;
  //     }
  //   });

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
    /* else if (key === 'merge') {
const { row } = item;
currentProductSpu.value = row?.productSpu;
currentName.value = row?.name;
selectedRow = row;
bindGoodsVisible.value = true;
} */
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

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoodsClose = async (reload = false, row) => {
    if (reload) {
      const isConfirmed = await swal.confirm({
        width: '54em',
        html: `
            <p>请确认是否将<span style="color:rgb(62, 151, 255)">${currentProductSpu.value} ${currentName.value}</span> 合并至 <span  style="color:rgb(62, 151, 255)">${row.productSpu} ${row.name}</span>！</p>
            <p>${currentProductSpu.value}将被废弃</p>
          `,
      });
      if (isConfirmed) {
        await productApi.luteosProductOperateProduct({
          operateType: 1,
          mergeProductSpu: row.productSpu,
          productSpu: currentProductSpu.value,
        });
        ElMessage.success('操作成功');
        bindGoodsVisible.value = false;
        runQuery();
      }
    } else {
      bindGoodsVisible.value = false;
    }
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductExportProduct,
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
  const totalList = ref([]);
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
    codeList.value = list.map((item) => item.productSpu);
  };

  const batchOperateDialogRef = ref(null);
  const batchOperate = () => {
    if (!totalList.value.length) {
      ElMessage.warning('请先勾选产品');
    } else {
      batchOperateDialogRef.value?.open(totalList.value);
    }
  };

  const closeModal = async (reload = false, val) => {
    if (reload) {
      try {
        const spuList = [];
        totalList.value.forEach((item) => {
          spuList.push(item.productSpu);
        });
        await productApi.luteosProductConnectCategory({
          categoryCode: val,
          productSpuList: spuList,
        });
        // FIXME 修改交互
        ElMessage.success({
          message: '关联成功',
          duration: 5 * 1000,
        });
        await refreshList();
      } catch (e) {
        // do nothing
      } finally {
        visible.value = false;
      }
    } else {
      visible.value = false;
    }
  };

  const showDialog = (type, spu) => {
    operateType.value = type;
    productSpu.value = spu;
    addVisible.value = true;
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
    const valid = await addFormRefs.value.formRef.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
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
      '产品名称/产品SPU': search.keyWord || '',
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
    categoryCodeList.value = '';
    resetSearch();
  };

  const toBI = () => {
    openWindow('https://bi.luteos.com/#/site-view/Tn8CZdBKg2/H5ALzrtIIy');
  };

  const labelOptions = ref<any[]>([]);
  const queryLabelOptions = async () => {
    const res = await productApi.luteosProductTagQueryTagList({
      tagTypeList: 'spu,category',
      pageNum: 1,
      pageSize: 500,
    });
    labelOptions.value = res?.tagBeanList || [];
  };
  queryLabelOptions();
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
</style>
