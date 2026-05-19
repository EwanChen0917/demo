<template>
  <div class="d-flex justify-content-between align-items-center whitebg">
    <el-tabs v-model="search.platformType" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane label="独立站运营人员" v-if="checkPermission('siteOperator')" :name="1" />
      <el-tab-pane v-if="checkPermission('platformOperator')" label="新平台运营人员" :name="2" />
    </el-tabs>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch2"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <ProductShopSelect
        v-model="search.shop"
        clearable
        class="w-200px"
        :platform="search.channel"
        placeholder="请选择店铺"
        v-if="search.platformType === 1"
      />
      <ProductChannelSelect2
        v-model="search.channel"
        clearable
        class="w-200px"
        placeholder="请选择渠道"
        v-else
      />
    </template>
    <template #filters>
      <ErpSiteSelect
        v-model="search.site"
        placeholder="请选择站点"
        clearable
        :channel="search.channel"
        v-if="search.platformType === 1"
      />
      <el-input
        v-model="search.skuCode"
        style="width: 250px"
        placeholder="请输入产品SKU"
        clearable
        v-if="search.platformType === 1"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <!-- <ErpSiteSelect
        v-model="search.site"
        placeholder="请选择站点"
        clearable
        :channel="search.channel"
        v-else
      /> -->
      <CountrySelect
        v-model="search.site"
        placeholder="请选择站点"
        clearable
        filterable
        v-else
        class="w-200px"
      />
      <DeptMember
        v-model="search.operatorList"
        placeholder="请选择运营人员"
        deptId="65717209"
        clearable
        class="w-200px operatorSelect"
        multiple
      />
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="addPlatformSku"
        v-permission="'operationstaffAdd'"
        :icon="Plus"
      >
        新增
      </el-button>
      <el-button
        v-permission="'operationstaffImport'"
        type="success"
        plain
        @click="batchUpdateVisible = true"
        :icon="Upload"
      >
        导入
      </el-button>
      <el-button
        v-permission="'operationstaffExport'"
        :icon="Download"
        type="primary"
        plain
        @click="exportSelect"
      >
        导出
      </el-button>
      <el-button
        v-permission="'operationstaffDelete'"
        type="danger"
        plain
        @click="handleBatch('删除')"
        :icon="Delete"
      >
        批量删除
      </el-button>
      <el-button
        v-permission="'operationstaffDelete'"
        type="primary"
        plain
        @click="handleBatchUpdate"
        :icon="Edit"
      >
        批量编辑
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.operationQueryBeanList"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="id" label="序号" width="200" />
      <!-- prop="channelName" -->
      <el-table-column
        prop="channel"
        label="渠道"
        min-width="150"
        v-if="search.platformType === 2"
      />
      <el-table-column label="店铺" prop="shop" min-width="150" v-if="search.platformType === 1">
        <template #default="{ row }">
          <span>{{ row.shop || '&#45;&#45;' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="site" label="站点" min-width="150" />
      <el-table-column
        label="产品SKU"
        prop="skuCode"
        min-width="190"
        v-if="search.platformType === 1"
      />
      <el-table-column label="运营人员" min-width="150" prop="operatorName" />
      <el-table-column width="120px" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              // {
              //   label: '编辑',
              //   key: 'edit',
              //   type: 'primary',
              //   row,
              //   permissionCode: 'operationstaffEdit',
              //   // disabled: row.source === 'JJ',
              // },
              {
                label: '删除',
                key: 'del',
                text: true,
                type: 'danger',
                row,
                permissionCode: 'operationstaffDelete',
                // disabled: row.source === 'JJ',
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
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
  </KeenList>
  <AddSkuModal
    :title="addModalTitle"
    :id="id"
    :detail-info="detailInfo"
    :visible="visible"
    v-if="visible"
    :platformSku="''"
    :type="operateType"
    ref="addSkuModalRef"
    @close="visible = false"
    @save="handleAddOperator"
    :platformType="search.platformType"
  />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :platformType="search.platformType"
    :title="importTitle"
    @close="batchUpdate"
  />

  <!-- <ExportSelectDialog ref="exportSelectRef" @success="tableRef?.clearSelection()" /> -->
  <EditOperatorDialog
    v-if="editOperatorVisible"
    :visible="editOperatorVisible"
    :codeList="codeList"
    @close="editOperatorVisible = false"
    :platformType="search.platformType"
    @save="handleOperatorSave"
  />
  <LogDialog ref="logDialogRef" />
</template>

<script lang="ts" setup name="operationstaff">
  import { checkPermission } from '@/utils/permission';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { Plus, Delete, Edit, Upload, Download } from '@element-plus/icons-vue';
  import useList from '@/hooks/list/useList';
  import { ProductOperationApi, productOperationApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  // import { copyFn } from '@/utils/copyFn';
  // import AddSkuModal from './components/addSkuModal.vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import { openWindow } from '@/utils';
  import BatchUpdateModal from './components/BatchUpdateModal.vue';
  // import ExportSelectDialog from '../operationStaff/components/exportSelectDialog.vue';
  import AddSkuModal from './components/addSkuModal.vue';
  import LogDialog from './components/logDialog.vue';
  // import ProductChannelSelect2 from '@/components/ProductChannelSelect2/index.vue';
  import EditOperatorDialog from './components/editOperatorDialog.vue';
  import DeptMember from './components/DeptMember.vue';

  const editOperatorVisible = ref(false);
  const handleOperatorSave = async () => {
    editOperatorVisible.value = false;
    refreshList();
    tableRef.value?.clearSelection();
  };
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
    ProductOperationApi.LuteosOpetationPlatformQueryList.RequestQuery,
    ProductOperationApi.LuteosOpetationPlatformQueryList.ResponseBody
  >({
    searchDefaults: {
      skuCode: undefined,
      channel: 'shopify',
      shop: undefined,
      type: undefined,
      userAccount: undefined,
      site: undefined,
      // status: 1,
      platformType: 1,
      source: undefined,
      operatorList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productOperationApi.luteosOpetationPlatformQueryList,
    serviceManual: true,
  });
  const resetSearch2 = () => {
    const isnewP = search.platformType === 2;
    resetSearch();
    if (isnewP) {
      search.platformType = 2;
      search.channel = undefined;
    }
  };
  const importTitle = ref('导入独立站运营人员');
  const handleTabChange = (val) => {
    search.site = undefined;
    search.shop = undefined;
    search.skuCode = undefined;
    search.operatorList = undefined;
    if (val === 1) {
      addModalTitle.value = '新增独立站运营人员';
      importTitle.value = '导入独立站运营人员';
      search.channel = 'shopify';
    } else {
      importTitle.value = '导入新平台运营人员';
      addModalTitle.value = '新增新平台运营人员';
      search.channel = undefined;
    }
  };

  // const tabStatusList = [
  //   { status: 1, code: 'allCount', statusName: '独立站运营人员', count: '' },
  //   { status: 2, code: 'commonCount', statusName: '新平台运营人员', count: '' },
  // ];
  // 权限校验
  const noPermission = () => {
    if (!checkPermission('siteOperator')) {
      search.platformType = 2;
      handleTabChange(2);
    }
    if (!checkPermission('siteOperator') && !checkPermission('platformOperator')) {
      router.push('/404');
    }
  };
  onMounted(() => {
    noPermission();
  });

  onActivated(() => {
    noPermission();
  });

  const route = useRoute();
  // if (route.query?.operator) {
  //   search.operator = route.query?.operator as string;
  // }

  if (route.query?.platformType) {
    search.platformType = parseInt(route.query?.platformType, 10);
  }
  // const skuModalVisible = ref(false);
  // 勾选产品
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.id);
  };
  // 新增店铺SKU
  const addPlatformSku = () => {
    id.value = '';
    // addModalTitle.value = '新增';
    operateType.value = 'add';
    visible.value = true;
    // curPlatformCode.value = '';
    // openDialog({});
  };

  // 按钮操作
  // const rowData = ref({});
  const addModalTitle = ref('新增独立站运营人员');
  const addSkuModalRef = ref();

  const id = ref();
  const visible = ref(false);
  const operateType = ref();
  const detailInfo = ref();
  const logDialogRef = ref();
  const handleActions = async (operate) => {
    const { key, row } = operate;
    if (key === 'log') {
      logDialogRef.value?.open(row.id);
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await productOperationApi.luteosOpetationPlatformBatchDeleteByIds({
        idList: [row.id],
        platformType: search.platformType,
      });
      ElMessage.success('删除成功');
      refreshList();
    }
  };

  const handleAddOperator = () => {
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

  // const exportSelectRef = ref();
  const params = ref();
  const exportSelect = async () => {
    // exportSelectRef.value?.open({
    //   ...search,
    //   queryParam: getQueryParam(),
    //   idList: codeList,
    // });
    // console.log(search, getQueryParam());
    params.value = {
      ...search,
      queryParam: getQueryParam(),
      idList: codeList,
    };
    // console.log(params.value);
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    try {
      const res = await productOperationApi.luteosOpetationPlatformExportList({
        ...params.value,
        exportType: 1,
      });
      // emit('success');
      visible.value = false;
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;
      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      openWindow(path.href);
    } catch (e) {
      swal.error(`导出失败: ${e.message}`);
    }
  };
  // 批量删除/下载数据
  const handleBatch = async (type: '删除') => {
    // console.log(codeList.value, codeList.value[0]);
    if (codeList.value.length === 0) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const confirmed = await swal.confirm(`请确认是否${type}选中数据吗？`);
    if (!confirmed) return;
    await productOperationApi.luteosOpetationPlatformBatchDeleteByIds({
      idList: codeList.value,
      platformType: search.platformType,
    });
    swal.success('批量删除成功');
    codeList.value = [];
    refreshList();
  };
  // 批量删除/下载数据
  const handleBatchUpdate = async () => {
    // console.log(codeList.value, codeList.value[0]);
    if (codeList.value.length === 0) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    editOperatorVisible.value = true;
    // const confirmed = await swal.confirm(`请确认是否${type}选中数据吗？`);
    // if (!confirmed) return;
    // await productOperationApi.luteosOpetationPlatformBatchDeleteByIds({
    //   idList: codeList.value,
    // });
    // swal.success('批量编辑成功');
    // refreshList();
  };

  const getQueryParam = () => {
    const data: any = {
      '渠道唯一标识/产品SKU': search.skuCode || '',
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
  .whitebg {
    background-color: white;
    border-bottom: 1px solid #f4f4f4;
  }
  .operatorSelect:hover {
    // overflow: hidden;
  }
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
