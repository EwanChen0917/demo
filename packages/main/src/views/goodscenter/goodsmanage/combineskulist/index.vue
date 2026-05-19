<template>
  <div class="card card-flush">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title">
        <el-space>
          <el-input v-model="search.keyword" placeholder="组合编码/SKU">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </el-space>
      </div>
      <div class="card-toolbar">
        <el-space>
          <el-button class="button" type="primary" @click="runQuery">查询</el-button>
          <el-button class="button" type="primary" @click="addSkuProduct">添加组合产品</el-button>
          <el-button
            class="button"
            @click="handleExport"
            :loading="exportLoading"
            type="primary"
            plain
          >
            导出
          </el-button>
        </el-space>
      </div>
    </div>
    <div class="card-body pt-0">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.productList"
        row-key="productSku"
        @selection-change="handleSelectionChange"
        class-name="table-row-dashed"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column label="组合编码" min-width="150">
          <template #default="{ row }">
            <div class="d-flex align-items-center pe-5">
              {{ row.combineSku }}
              <i
                class="fas fa-copy text-hover-primary cursor-pointer"
                @click="copyFn(row.combineSku, '组合编码')"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="skuList" min-width="150" label="产品中心SKU">
          <template #default="{ row }">
            <div class="text-primary old-product-sku-list" v-for="sku of row.skuList" :key="sku">
              {{ sku.skuCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="skuList" label="数量">
          <template #default="{ row }">
            <div class="old-product-sku-list" v-for="sku of row.skuList" :key="sku">
              {{ sku.quantity }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="skuList" label="建议销售价">
          <template #default="{ row }">
            <div class="old-product-sku-list" v-for="sku of row.skuList" :key="sku">
              <template v-if="sku.suggestSellPrice">
                {{ sku.currencyCode }}
                {{ sku.suggestSellPrice }}
              </template>
              <span v-else>--</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="platformSkuCodeList" min-width="150" label="店铺SKU">
          <template #default="{ row }">
            <div v-for="(sku, index) of row.platformSkuCodeList" :key="sku">
              <p class="old-product-sku-list" v-if="index < 2">
                {{ sku }}
                <i
                  class="fas fa-copy text-hover-primary cursor-pointer"
                  @click="copyFn(sku, '店铺SKU')"
                ></i>
              </p>
            </div>
            <div class="platform-wrap">
              <span class="platform-sku" @click="generatePlatformSku(row.combineSku)">
                生成店铺组合产品SKU
              </span>
              <el-popover
                popper-class="rt_el_pop"
                :offset="0"
                :hide-after="0"
                :width="330"
                placement="bottom"
                trigger="hover"
                v-if="row.platformSkuCodeList.length > 2"
              >
                <div class="sku-popover">
                  <div v-for="sku of row.platformSkuCodeList" :key="sku">
                    <p class="old-product-sku-list">
                      {{ sku }}
                      <i
                        class="fas fa-copy text-hover-primary cursor-pointer"
                        @click="copyFn(sku, '店铺SKU')"
                      ></i>
                    </p>
                  </div>
                </div>
                <template #reference>
                  <span class="path4">...</span>
                </template>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="140px" label="操作">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  text: true,
                  editData: row,
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
    </div>
    <AddSkuModal
      v-if="skuModalVisible"
      :title="skuModalTitle"
      :combineSku="rowData.combineSku"
      :skuList="rowData.skuList"
      :visible="skuModalVisible"
      @close="handleSkuModalClose"
      @save="handleSkuModalSave"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { copyFn } from '@/utils/copyFn';
  // import { fa } from 'element-plus/es/locale';
  import AddSkuModal from './components/addSkuModal.vue';

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
    ProductApi.LuteosProductSkuQueryCombineProductList.RequestQuery,
    ProductApi.LuteosProductSkuQueryCombineProductList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQueryCombineProductList,
  });

  const skuModalVisible = ref(false);

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
      pageNum: current.value,
      pageSize: pageSize.value,
      codeList: codeList.value,
      ...search,
    });
  };

  // 勾选产品
  const codeList = reactive([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.combineSku);
  };
  // 添加组合产品
  const addSkuProduct = () => {
    skuModalTitle.value = '添加组合产品';
    rowData.value.skuList = [];
    rowData.value.combineSku = '';
    skuModalVisible.value = true;
  };

  // 按钮操作
  const rowData = ref({});
  const skuModalTitle = ref('');
  const handleActions = (operate) => {
    const { key, editData } = operate;
    if (key === 'edit') {
      const skuList: any = [];
      editData.skuList.forEach((item) => {
        skuList.push({
          productSku: item.skuCode,
          productTitle: item.skuName,
          quantity: item.quantity,
          productImageUrl: item.skuImage,
          suggestSellPrice: item.suggestSellPrice,
          currencyCode: item.currencyCode,
        });
      });
      rowData.value.combineSku = editData.combineSku;
      rowData.value.skuList = skuList;
      skuModalVisible.value = true;
      skuModalTitle.value = '编辑组合产品';
    }
  };

  // 生成店铺SKU
  const generatePlatformSku = async (combineSku) => {
    const res = await productApi.luteosProductSkuGeneratePlatformSkuCode({
      codeType: 2,
      sourceCode: combineSku,
    });

    if (res.code) {
      ElMessage.success({
        message: '生成店铺组合产品SKU成功',
        duration: 3 * 1000,
      });
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
