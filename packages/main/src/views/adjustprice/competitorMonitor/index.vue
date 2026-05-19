<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.remark"
          placeholder="请输入备注"
          style="width: 200px"
          clearable
          maxLength="50"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
      <!-- <CountrySelect v-model="search.siteList" placeholder="站点" multiple clearable class="w-250px" /> -->
    </template>
    <template #filters>
      <CountrySelect
        v-model="search.siteList"
        placeholder="站点"
        multiple
        clearable
        class="w-200px"
      />
      <DeptMember
        v-model="search.operatorList"
        placeholder="运营"
        deptId="65717209"
        multiple
        clearable
        class="w-200px"
      />
      <el-select
        v-model="search.gtmGroupList"
        :options="gtmList"
        :props="{ label: 'deptName', value: 'deptId' }"
        placeholder="亚马逊运营组"
        style="width: 180px"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      />
      <el-date-picker
        class="w-120"
        style="width: 250px"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="添加开始时间"
        end-placeholder="添加结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date()]"
        @change="handleTimeChange"
      />
      <CategoryCascader
        v-model="search.categoryLevelCode"
        placeholder="产品分类"
        :emit-path="false"
        style="min-width: 180px"
        filterable
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="addMonitor">添加监控</el-button>
      <el-button
        class="button"
        type="primary"
        @click="batchOperate"
        :disabled="totalList.length === 0"
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
      <!-- <el-button
        class="button"
        v-permission="'goodsAdd'"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button> -->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="id"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="gtmGroupDesc" label="亚马逊运营组" min-width="130" />
      <el-table-column prop="operatorDesc" label="运营" min-width="100">
        <template #default="{ row }">
          <span class="span-break">{{ row.operatorDesc }}</span>
          <i class="iconfont icon-bianji" @click="handleOpenDialog(row, 1)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="leaderDesc" label="组长" min-width="100">
        <template #default="{ row }">
          <span class="span-break">{{ row.leaderDesc }}</span>
          <i class="iconfont icon-bianji" @click="handleOpenDialog(row, 2)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="siteDesc" label="站点" min-width="100" />
      <el-table-column prop="categoryLevelDesc" label="品类层级" min-width="72" />
      <el-table-column prop="categoryLevelCodeDesc" label="产品分类" min-width="120" />
      <el-table-column prop="url" label="监控链接" min-width="300">
        <template #default="{ row }">
          <el-link type="primary" :href="row.url" target="_blank" style="max-width: 290px">
            <OverflowTooltip :content="row?.url" :line="1" />
          </el-link>
          <!-- <Copy :content="row.certificatePath" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" min-width="120" />
      <el-table-column prop="remark" label="备注" min-width="130">
        <template #default="{ row }">
          <div class="span-break d-flex">
            <OverflowTooltip
              :content="row?.remark"
              :line="1"
              :font-size="12"
              style="flex: 1; flex-shrink: 0"
            />
            <i
              class="iconfont icon-bianji"
              @click="handleOpenDialog(row, 3)"
              style="flex-shrink: 0"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="详情分析" min-width="160">
        <template #default="{ row }">
          <img
            alt="img"
            class="rounded w-150px"
            style="cursor: pointer"
            :src="getImg('line.png')"
            @click="handleImgClick(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                row: scope.row,
              },
              // {
              //   label: '日志',
              //   key: 'log',
              //   type: 'primary',
              //   row: scope.row,
              // },
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

  <!-- <BatchOperateDialog ref="batchOperateDialogRef" title="批量操作" @success="handleSuccess" /> -->
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    @close="batchUpdate"
    @export="handleExport"
    type="import"
    title="导入"
  />
  <!-- <LogDialog ref="logDialogRef" /> -->
  <BatchSetModal title="批量编辑" ref="batchSetRef" @close="handleClose" />
  <AddModal title="添加监控" ref="addModal" @close="handleClose" />
  <EditDialog ref="EditDialogRef" :type="dialogType" @success="refreshList" />
</template>

<script lang="ts" setup name="competitorMonitor">
  import { ElMessage, ElPopover, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/hooks/list/useList';
  import { memberApi, pdtApi, productApi, ProductApi, ProductContracts } from '@/api/index';
  import type { FormInstance } from 'element-plus';
  import * as swal from '@/utils/swal';
  import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { openWindow } from '@/utils';
  // import BatchOperateDialog from '@/views/goodscenter/goodsmanage/goodslist/components/batchOperateDialog.vue';
  // import LogDialog from './components/logDialog.vue';
  // import { omit } from 'lodash-es';
  import { onMounted } from 'vue';
  import dayjs from 'dayjs';
  import BatchUpdateModal from './components/batchUpdateModal.vue';
  import BatchSetModal from './components/BatchSetModal.vue';
  import AddModal from './components/addModal.vue';
  import EditDialog from './components/EditDialog.vue';

  const batchSetRef = ref(null);
  const addModal = ref(null);
  // 发货仓库
  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    // const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 990904670 });
    const res = await memberApi.luteosMemberQuerySubDeptListV2({
      parentIdList: [990904670, 991399017, 1000296332],
    });
    // console.log('res', res);
    // gtmList.value = res?.deptInfoList?.map((item) => item.deptName) || [];
    gtmList.value = res?.deptInfoList || [];
  };
  queryGtmList();

  const handleClose = () => {
    refreshList();
  };
  // 导入成功
  const handleImportSuccess = () => {
    refreshList();
    // clearCheckBoxSelection();
  };

  // const logDialogRef = ref();

  // const time = ref();
  const time = ref<any[]>([]);
  onMounted(() => {
    // const start = dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD');
    // const end = dayjs().endOf('day').format('YYYY-MM-DD');
    // time.value = [start, end]; // 设置默认的日期范围
  });
  const handleTimeChange = (val) => {
    search.startDate = undefined;
    search.endDate = undefined;
    if (val) {
      search.startDate = val[0] || '';
      search.endDate = val[1] || '';
    } else {
      search.startDate = undefined;
      search.endDate = undefined;
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
    ProductApi.LuteosProductRankingListQueryList.RequestQuery,
    ProductApi.LuteosProductRankingListQueryList.ResponseBody
  >({
    searchDefaults: {
      // keyword: undefined,
      // startDate: dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD'),
      // endDate: dayjs().endOf('day').format('YYYY-MM-DD'),
      startDate: undefined,
      endDate: undefined,
      siteList: undefined,
      gtmGroupList: undefined,
      remark: undefined,
      // 运营
      operatorList: undefined,
      categoryLevelCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => {
    //   const { saleRegionListSelect } = searchData;
    //   const areaCountryList1 = saleRegionListSelect || [];
    //   const countryList = [...new Set(areaCountryList1.map((x) => x[1]).filter(Boolean))];
    //   return {
    //     ...omit(searchData, 'saleRegionListSelect'),
    //     saleRegionList: countryList,
    //   };
    // },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductRankingListQueryList,
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

  const stateMap = reactive({
    0: '开发中',
    1: '待上架',
    2: '可销售',
    3: '已下架',
    5: '已取消',
  });

  const addFormRefs = ref<FormInstance>();
  const operateType = ref<number>(0);
  const productSpu = ref<string>('');

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
  const dialogType = ref(-1);
  const EditDialogRef = ref();
  const handleOpenDialog = (row, type) => {
    dialogType.value = type;
    EditDialogRef.value?.open(row);
  };
  const getImg = (name: string) => {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href;
  };
  const handleImgClick = (row: any) => {
    // console.log(row);
    const url = `https://finebi.luteos.com/webroot/decision/v5/design/report/c09af889cd91477f9364d94c2e7b90f1/view?运营=${row?.operatorDesc}`;
    console.log(url);
    openWindow(url);
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    // console.log('item', item);
    if (key === 'view') {
      toDetail(row);
    } else if (key === 'edit') {
      toEdit(row);
    } else if (key === 'log') {
      // console.log(item.row, item.row.productSpu);
      // logDialogRef.value?.open(item.row);
    } else if (key === 'delete') {
      const isConfirmed = await swal.confirm(`确认删除该条监控吗？删除后，停止监控`);
      // return;
      if (isConfirmed) {
        await productApi.luteosProductRankingListBatchDeleted({
          idList: [row.id],
        });
        ElMessage.success('删除成功');
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
    codeList.value = list.map((item) => item.id);
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

  // const batchOperateDialogRef = ref(null);
  const batchOperate = () => {
    if (!totalList.value.length) {
      ElMessage.warning('请先勾选产品');
    } else {
      // batchOperateDialogRef.value?.open(totalList.value);
      batchSetRef.value?.open(codeList.value);
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

  const toSkuList = (productSpu) => {
    router.push(`/skulist?productSpu=${productSpu}`);
  };

  const handleSuccess = () => {
    refreshList();
    tableRef.value?.clearSelection();
  };

  const getQueryParam = () => {
    // const data: any = {
    //   '产品名称/产品SPU': search.keyword || '',
    //   产品经理:
    //     memberOptions.value.find((item) => item.memberCode === search.productManagerCode)?.name ||
    //     '',
    //   产品状态: stateMap[search.state] || '',
    // };
    const data: any = {
      '产品名称/产品SPU': search.keyword || '',
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
    time.value = [];
    // const start = dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD');
    // const end = dayjs().endOf('day').format('YYYY-MM-DD');
    // time.value = [start, end]; // 设置默认的日期范围
    resetSearch();
  };

  const addMonitor = async () => {
    // console.log(gtmList.value);
    addModal.value?.open({ gtmArr: gtmList.value });
  };
</script>

<style scoped lang="scss">
  .span-break {
    word-break: break-all;
  }
  .svg-icon {
    fill: var(--el-color-primary);
  }

  .svg-icon:hover {
    fill: var(--el-color-primary-light-3);
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
