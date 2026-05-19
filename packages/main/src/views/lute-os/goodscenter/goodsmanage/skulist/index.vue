<template>
  <KeenList>
    <template #search>
      <div class="h-100 d-flex flex-column justify-content-between">
        <el-input
          v-model="search.keyWord"
          placeholder="产品SKU名称/产品SKU/产品SPU"
          clearable
          style="width: 275px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <div>已选择{{ tableRef?.getSelectionRows()?.length }}个SKU</div>
      </div>
    </template>
    <template #filters>
      <ProductLineSelect v-model="search.productLine" placeholder="产品品线" clearable filterable />
      <el-select
        v-model="search.productSpu"
        clearable
        filterable
        remote
        reserve-keyword
        placeholder="产品名称"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
        @clear="spuList = []"
      >
        <el-option
          v-for="item in spuList"
          :key="item.productSpu"
          :label="item.name"
          :value="item.productSpu"
        />
      </el-select>
      <CategoryCascader
        v-model="search.categoryCode"
        placeholder="产品分类"
        :emit-path="false"
        style="min-width: 180px"
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      />
      <el-select
        v-model="search.tagCode"
        style="width: 200px"
        placeholder="SKU/产品分类标签"
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
        v-model="search.status"
        placeholder="状态"
        clearable
        :teleported="false"
      >
        <el-option v-for="(val, key) in statusMap" :key="key" :label="val || ''" :value="key!" />
      </el-select>
      <OperatorSelect style="width: 120px" v-model="search.productManagerCode" />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="batchOperate" v-permission="'skuBatchOperate'">
        批量操作
      </el-button>
      <el-button
        class="button"
        v-permission="'skuUpdate'"
        type="primary"
        @click="
          () => {
            batchType = 'import';
            batchTitle = '导入(更新SKU信息)';
            batchUpdateVisible = true;
          }
        "
      >
        导入
      </el-button>
      <el-button class="button" v-permission="'skuRemind'" type="primary" @click="batchRemind">
        提醒
      </el-button>
      <el-button
        v-permission="'skuExport'"
        class="button"
        @click="
          () => {
            batchType = 'export';
            batchTitle = '导出';
            batchUpdateVisible = true;
          }
        "
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
      :data="listData?.productSkuBeanList"
      row-key="skuCode"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
      max-height="57vh"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="产品SKU信息" min-width="350">
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImageUrl"
            :title="scope.row.productTitle"
            :subtitle="scope.row.skuCode"
            permission="skuDetail"
            :url="`/skulist/detail?code=${scope.row.skuCode}`"
            copy-subtitle
          />
        </template>
      </el-table-column>
      <!--        <el-table-column prop="skuCode" min-width="150" label="产品SKU">
                <template #default="{ row }">
                  <div class="d-flex align-items-center pe-5">
                    {{ row.skuCode }}
                    <i
                      v-if="row.skuCode"
                      class="fas fa-copy text-hover-primary cursor-pointer"
                      @click="copyFn(row.skuCode, '产品SKU')"
                    ></i>
                  </div>
                </template>
              </el-table-column>-->
      <el-table-column prop="productLineName" label="产品品线" min-width="120" />
      <el-table-column prop="categoryName" label="产品分类" min-width="140" />
      <el-table-column prop="categoryLabelName" label="分类标签" min-width="120" />
      <el-table-column prop="productSpu" label="产品SPU" min-width="140" />
      <el-table-column label="建议零售价" min-width="140">
        <template #default="{ row }">
          <span v-if="row.price">{{ row.price }}{{ row.currency }}【{{ row.currencyDesc }}】</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="productSkuList" label="供应链SKU" min-width="120">
        <template #header>
          <div class="d-flex align-items-center">
            <span class="me-3">供应链SKU</span>
            <el-tooltip content="供应链SKU，以及对应的旧编码">
              <el-icon>
                <WarningFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <div>{{ row?.productSku }}</div>
          <div
            class="fs-7 text-gray-500"
            v-for="item in row?.eccangSkuList?.filter((sku) => sku !== row?.productSku)"
            :key="item"
          >
            {{ item }}
          </div>
        </template>
      </el-table-column> -->

      <!--        <el-table-column prop="productSpu" label="归属SPU" min-width="120" />-->
      <el-table-column prop="stateDesc" min-width="120" label="状态">
        <template #default="{ row }">
          <span class="badge" :class="statusColorMap[row.state]">
            {{ row.stateDesc }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createByName" min-width="100" label="产品经理" />
      <el-table-column min-width="140" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                skuCode: row.skuCode,
                permissionCode: 'skuEdit',
              },
              /*{
                label: '详情',
                key: 'view',
                type: 'primary',
                skuCode: row.skuCode,
                permissionCode: 'skuDetail',
              },*/
              {
                label: '上架',
                key: 'shelves',
                type: 'primary',
                hide: ![1].includes(+row.state),
                skuCode: row.skuCode,
                permissionCode: 'skuShelves',
              },
              {
                label: '清仓',
                key: 'clearance',
                type: 'primary',
                hide: ![2].includes(+row.state),
                skuCode: row.skuCode,
                permissionCode: 'skuClearance',
              },
              {
                label: '退市',
                key: 'delisted',
                type: 'primary',
                disabled: [2].includes(+row.state),
                hide: ![2, 3].includes(+row.state),
                skuCode: row.skuCode,
                permissionCode: 'skuDelisted',
              },
              {
                label: '启用',
                key: 'enable',
                type: 'primary',
                hide: row.state !== 4,
                skuCode: row.skuCode,
                permissionCode: 'skuDelisted',
              },
              {
                label: '归属SPU',
                key: 'bind',
                type: 'primary',
                hide: !!row.productSpu,
                productTitle: row.productTitle,
                skuCode: row.skuCode,
                permissionCode: 'skuBind',
              },
              {
                label: '提醒',
                key: 'remind',
                type: 'primary',
                hide: ![1, 2, 3].includes(+row.state),
                skuCode: row.skuCode,
                permissionCode: 'skuRemind',
                icon: 'bell',
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
  <BindModal
    :select-one="true"
    @close="confirmBindSpu"
    confirm-text="确认归属SPU"
    v-if="confirmBindSpuVisible"
    :visible="confirmBindSpuVisible"
    :selectedRows="[]"
  />
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :title="batchTitle"
    @close="batchUpdate"
    @export="handleExport"
    :type="batchType"
  />
  <RemindDialog :visible="remindVisible" :skuCodes="remindSkuList" @close="remindVisible = false" />
  <BatchOperateDialog ref="batchOperateDialogRef" title="批量操作" @success="handleSuccess" />
</template>

<script lang="ts" setup name="skulist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';
  import { decryptByBase64 } from '@/utils/aesTils';
  import RemindDialog from '@/views/lute-os/goodscenter/goodsmanage/skulist/components/remindDialog.vue';
  import BatchOperateDialog from '@/views/lute-os/goodscenter/goodsmanage/skulist/components/batchOperateDialog.vue';
  import BatchUpdateModal from './components/BatchUpdateModal.vue';
  import BindModal from '../../bindGoods/Modal/bindGoods.vue';

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
    ProductApi.LuteosProductSkuQueryProductSkuList.RequestQuery,
    ProductApi.LuteosProductSkuQueryProductSkuList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      categoryCode: undefined,
      productManagerCode: undefined,
      level: undefined,
      productSpu: undefined,
      status: '2',
      codeList: undefined,
      tagCode: undefined,
      productLine: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQueryProductSkuList,
  });

  const route = useRoute();
  const { productSpu, skuList, tagCode } = route.query as {
    productSpu?: string;
    tagCode?: string;
    skuList?: string[];
  };
  if (skuList) {
    search.codeList = decryptByBase64(skuList);
  }
  if (tagCode) {
    search.tagCode = tagCode;
    search.status = undefined;
  }
  console.log('query', route.query);
  if (route.query.productSpu) {
    search.status = '';
    search.keyWord = productSpu;
  }

  const categoryCodeList = ref<any>('');

  const statusMap = {
    // '-1': '未知',
    '1': '待上架',
    '2': '在销售',
    '3': '清仓中',
    '4': '已退市',
    '0': '已取消',
  };
  const statusColorMap = reactive({
    // '-1': 'badge badge-light-danger',
    1: 'badge-light-primary',
    2: 'badge-light-success',
    3: 'badge-light-info',
    4: 'badge-light-danger',
    0: 'badge-light-gray',
  });
  // spu查询
  const spuList = ref<any>([]);
  const loading = ref(false);
  const remoteMethod = async (query: string) => {
    if (query.trim()) {
      loading.value = true;
      spuList.value = [];
      const res: any = await productApi
        .luteosProductQueryProductList({
          keyWord: query,
          pageSize: 30,
          pageNum: 1,
        })
        .finally(() => {
          loading.value = false;
        });
      if (res) {
        spuList.value = res.productBeanList || [];
      }
    }
  };
  // 勾选产品
  const totalList = ref([]);
  const codeList = ref([]);
  const validSkuList = ref([]);
  const invalidSkuList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
    codeList.value = list?.map((item) => item.skuCode);
    invalidSkuList.value = list
      ?.filter((item) => item.stateDesc === '已退市')
      ?.map((item) => item.skuCode);
    validSkuList.value = list
      ?.filter((item) => item.stateDesc !== '已退市')
      ?.map((item) => item.skuCode);
  };

  const batchOperateDialogRef = ref(null);
  const batchOperate = () => {
    if (!codeList.value.length) {
      ElMessage.warning('请先勾选产品');
    } else {
      batchOperateDialogRef.value?.open(totalList.value);
    }
  };

  const handleSuccess = () => {
    refreshList();
    tableRef.value?.clearSelection();
  };

  const getQueryParam = () => {
    const data: any = {
      '产品SKU名称/产品SKU': search.keyWord || '',
      状态: statusMap[search.status] || '',
    };

    for (const key in data) {
      if (data[key] == '') {
        delete data[key];
      }
    }

    return data;
  };

  const currentSkuCode = ref('');

  const confirmBindSpuVisible = ref(false);
  const confirmBindSpu = async (reload, row) => {
    if (reload) {
      const isConfirmed = await swal.confirm({
        html: `
            <p>请确认是否将</p>
            <p><span style="color:rgb(62, 151, 255)">${currentSkuCode.value} ${currentProductTitle.value}</span> 归属至 <span  style="color:rgb(62, 151, 255)">${row.productSpu} ${row.name}</span></p>
          `,
      });
      if (isConfirmed) {
        await productApi.luteosProductSkuProductSkuOperate({
          operateType: 1,
          productSpu: row.productSpu,
          skuCode: currentSkuCode.value,
        });
        ElMessage.success('操作成功');
        confirmBindSpuVisible.value = false;
        runQuery();
      }
    } else {
      confirmBindSpuVisible.value = false;
    }
  };
  const currentProductTitle = ref('');
  const remindVisible = ref<boolean>(false);
  const remindSkuList = ref<string[]>([]);
  const handleActions = (operate) => {
    // eslint-disable-next-line no-shadow
    const { key, skuCode, productTitle } = operate;
    switch (key) {
      case 'view':
        viewProductDetail(skuCode);
        break;
      case 'edit':
        editProductDetail(skuCode);
        break;
      case 'bind':
        // 绑定SPU
        currentSkuCode.value = skuCode;
        currentProductTitle.value = productTitle;
        confirmBindSpuVisible.value = true;
        break;
      case 'shelves':
        confirmOperation('上架', 2, skuCode);
        break;
      case 'clearance':
        confirmOperation('清仓', 3, skuCode);
        break;
      case 'delisted':
        confirmOperation('退市', 4, skuCode);
        break;
      case 'enable':
        confirmOperation('启用', 2, skuCode);
        break;
      case 'remind':
        remindVisible.value = true;
        remindSkuList.value = [skuCode];
        break;
      default:
        break;
    }
  };
  const confirmOperation = async (title, type, skuCode) => {
    const isConfirmed = await swal.confirm(`确定要${title}吗？`);
    if (isConfirmed) {
      await productApi.luteosProductSkuProductSkuOperate({
        operateType: type,
        skuCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  const batchType = ref<string>('');
  const batchTitle = ref<string>('');
  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    productApi.luteosProductSkuExportProduct,
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
  const handleExport = async (exportType: number) => {
    exportRun({
      ...search,
      pageNum: current.value,
      pageSize: pageSize.value,
      exportType,
      queryParam: getQueryParam(),
      codeList: codeList.value,
    });
  };
  // 批量提醒
  const batchRemind = async () => {
    if (codeList.value?.length === 0) {
      ElMessage.warning('请选择要提醒的产品');
      return;
    }
    if (validSkuList.value.length === 0) {
      ElMessage.warning('请选择未上架、在销售、清仓中的产品');
      return;
    }
    if (invalidSkuList.value.length > 0) {
      const isConfirmed = await swal.confirm(
        `${invalidSkuList.value}已退市，将不会发起提醒，是否继续？`
      );
      if (!isConfirmed) return;
    }
    remindSkuList.value = validSkuList.value;
    remindVisible.value = true;
  };

  const viewProductDetail = (code: string) => {
    if (code) {
      router.push(`/skulist/detail?code=${code}`);
    }
  };
  const editProductDetail = (code: string) => {
    if (code) {
      router.push(`/skulist/edit?code=${code}`);
    }
  };
  const reset = () => {
    categoryCodeList.value = '';
    resetSearch();
  };

  const labelOptions = ref<any[]>([]);
  const queryLabelOptions = async () => {
    const res = await productApi.luteosProductTagQueryTagList({
      tagTypeList: 'sku,category',
      pageNum: 1,
      pageSize: 500,
    });
    labelOptions.value = res?.tagBeanList;
  };
  queryLabelOptions();
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

  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }
</style>
