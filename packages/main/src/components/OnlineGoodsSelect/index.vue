<template>
  <el-dialog :model-value="visible" @close="handleCancel" width="80%" top="1vh" @open="runQuery">
    <KeenList
      @refresh="runQuery"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (searchParams[key] = undefined)"
    >
      <template #search>
        <el-space>
          <el-input v-model="searchParams.keyword" :placeholder="searchPlaceholder">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <OnlineSiteSelect
            v-model="searchParams.siteList"
            clearable
            multiple
            placeholder="站点"
            @change="runQuery"
            style="width: 260px"
          />
          <ProductShopSelect
            v-model="searchParams.shopList"
            clearable
            multiple
            :platform="channel"
            :site-list="searchParams.siteList"
            style="width: 260px"
          />
        </el-space>
      </template>
      <template #filters>
        <DeptMember
          placeholder="运营"
          v-model="searchParams.operatorIdList"
          clearable
          multiple
          deptId="65717209"
        />
      </template>
      <template #buttons>
        <el-button class="button" type="primary" @click="runQuery">搜索</el-button>
      </template>
      <el-table
        max-height="400px"
        ref="tableRef"
        class-name="table-row-dashed"
        v-loading="loading"
        :data="dataList"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="55" align="center" v-if="selectOne">
          <template #default="scope">
            <el-radio
              v-model="currentRow"
              :label="scope.row"
              :disabled="scope.row.msku && selectedRow?.msku === scope.row.msku"
            >
              {{}}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column v-else type="selection" width="55" reserve-selection />
        <el-table-column label="店铺SKU" min-width="150">
          <template #default="{ row }">
            <div>
              {{ row?.msku }}
              <Copy :content="row.msku" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="店铺信息" prop="channel" min-width="150px">
          <template #default="{ row }">
            <div>{{ row?.shop }}</div>
          </template>
        </el-table-column>
        <template v-if="channel === 'amazon'">
          <el-table-column label="ASIN" min-width="170">
            <template #default="{ row }">
              <div class="fs-7">
                父：
                <a class="link" @click="toPath(row.parentAsinUrl)">
                  {{ row?.parentAsin }}
                  <Copy :content="row.parentAsin" />
                </a>
              </div>
              <div class="fs-7">
                子：
                <a class="link" @click="toPath(row.asinUrl)">
                  {{ row?.asin }}
                  <Copy :content="row.asin" />
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="120" v-if="channel === 'amazon'">
            <template #default="{ row }">
              <div class="fs-7">
                <Tag :color="upStatusColorMap[row.upStatus]" size="small">
                  {{ row.upStatusDesc }}
                </Tag>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-if="channel === 'shopify'">
          <el-table-column label="商品ID" min-width="220">
            <template #default="{ row }">
              <div class="fs-7">
                productId： {{ row?.productId }}
                <Copy :content="row.productId" />
              </div>
              <div class="fs-7">
                variantId： {{ row?.variantId }}
                <Copy :content="row.variantId" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="120">
            <template #default="{ row }">
              <div class="fs-7">
                <Tag :color="shopifyStatusColorMap[row.status]" size="small">
                  {{ row.statusDesc }}
                </Tag>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-if="channel === 'walmart'">
          <el-table-column label="商品ID" min-width="270">
            <template #default="{ row }">
              <div class="fs-7">
                Item ID： {{ row?.itemId }}
                <Copy :content="row.itemId" />
              </div>
              <div class="fs-7">
                Product ID： {{ row?.wpId }}
                <Copy :content="row.wpId" />
              </div>
              <div class="fs-7">
                UPC： {{ row?.upc }}
                <Copy :content="row.upc" />
              </div>
              <div class="fs-7">
                GTIN： {{ row?.gtin }}
                <Copy :content="row.gtin" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="120">
            <template #default="{ row }">
              <div class="fs-7">
                <Tag :color="statusColorMap[row.status]" size="small">{{ row.statusDesc }}</Tag>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="当前售价" prop="currPrice">
          <template #default="{ row }">
            <span v-if="row?.currPrice">{{ row?.currPrice }} {{ row?.currency }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="MSRP" prop="msrpList">
          <template #default="{ row }">
            <div v-for="item in row.msrpList" :key="item.skuCode">{{ item.msrpPriceStr }}</div>
          </template>
        </el-table-column>
        <el-table-column label="运营" prop="operatorName" />
      </el-table>
      <KeenPagination
        :current="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-size-option="[10, 20, 50, 100]"
        :total="pagination.total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { debounce } from 'lodash-es';
  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import { openWindow } from '@/utils';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      channel?: string;
    }>(),
    {
      selectOne: false,
      confirmText: '保存',
    }
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const statusColorMap = {
    ACTIVE: 'green',
    ARCHIVED: 'blue',
    RETIRED: 'red',
    ERROR: 'red',
  };

  const shopifyStatusColorMap = {
    active: 'green',
    draft: 'blue',
  };

  const upStatusColorMap = {
    1: 'green',
    2: 'red',
  };

  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const searchParams = ref({
    keyword: '',
    shopList: [],
    siteList: [],
    operatorIdList: [],
  });

  const searchPlaceholder = computed(() => {
    const placeholderMap = {
      amazon: '店铺SKU/子ASIN/父ASIN',
      shopify: '店铺SKU/商品ID',
      walmart: '店铺SKU/商品ID',
    };
    return placeholderMap[props.channel] || '店铺SKU/商品ID';
  });

  watch(
    Object.keys(searchParams.value).map((key) => () => (searchParams.value as any)[key]),
    debounce(() => {
      runQuery();
    }, 300)
  );

  const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.pageNum = 1;
    runQuery();
  };
  const handleCurrentChange = (page) => {
    pagination.value.pageNum = page;
    runQuery();
  };

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const loading = ref(false);
  const dataList = ref<any[]>([]);
  const apiFn = computed(() => {
    const apiConfig = {
      amazon: productApi.luteosProductAmazonListingQueryAsinPage,
      shopify: productApi.luteosProductShopifyListingQueryProductListingPage,
      walmart: productApi.luteosProductWalmartListingQueryProductListingPage,
    };
    if (props.channel) {
      return apiConfig[props.channel] || '';
    }
    return '';
  });

  const runQuery = async () => {
    if (!props.channel) {
      ElMessage.warning('请选择渠道：亚马逊、独立站、沃尔玛');
      return;
    }
    if (apiFn.value) {
      try {
        loading.value = true;
        const res = await apiFn
          .value({
            ...searchParams.value,
            pageSize: pagination.value.pageSize,
            pageNum: pagination.value.pageNum,
          })
          .catch(() => {
            dataList.value = [];
            pagination.value.total = 0;
          });
        if (res) {
          dataList.value = res?.resultList || [];
          pagination.value.total = res.total;
          setDataId();
        } else {
          dataList.value = [];
          pagination.value.total = 0;
        }
      } finally {
        loading.value = false;
      }
    } else {
      dataList.value = [];
      pagination.value.total = 0;
    }
    setTimeout(() => {
      setSelectedRows();
    }, 500);
  };

  const currentRow = ref<any[]>([]);
  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        dataList.value.forEach((item) => {
          if (item.id === row.id) {
            console.log(row.id);
            tableRef.value!.toggleRowSelection(item, true);
          }
        });
      });
    }
  };
  const setDataId = () => {
    dataList.value.forEach((item) => {
      if (item.channel === 'amazon') {
        item.id = item.id;
      } else if (item.channel === 'shopify') {
        item.id = `${item.msku}_${item.shop}_${item.productId}_${item.variantId}`;
      } else if (item.channel === 'walmart') {
        item.id = `${item.msku}_${item.shop}_${item.wpId}_${item.upc}`;
      }
    });
  };
  // 勾选产品
  const totalList = reactive([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 选择产品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个产品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit('close', true, props.selectOne ? totalList.value[0] : totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择产品',
        duration: 5 * 1000,
      });
    }
  };
  const toPath = (url) => {
    if (url.includes('http')) {
      openWindow(url);
    } else {
      ElMessage.warning('该链接无法跳转');
    }
  };
  // 取消
  const handleCancel = () => {
    tableRef.value?.clearSelection();
    emit('close');
  };

  const resetSearch = () => {
    searchParams.value.keyword = '';
    searchParams.value.shopList = [];
    searchParams.value.siteList = [];
    searchParams.value.operatorIdList = [];
    pagination.value.pageNum = 1;
    pagination.value.pageSize = 10;
    pagination.value.total = 0;
  };

  const open = () => {
    resetSearch();
    runQuery();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
