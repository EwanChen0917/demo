<template>
  <KeenList
    :resetBtnOptions="{
      size: 'small',
    }"
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <!-- <el-select v-model="search.keywordType" style="width: 110px">
        <el-option label="SPU" :value="1" />
        <el-option label="SKU" :value="2" />
        <el-option label="产品名称" :value="3" />
      </el-select>
      <el-input v-model="search.keyword" placeholder="请输入" clearable class="ml-10">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input> -->
      <el-input
        v-model="search.spuCode"
        size="small"
        style="width: 208px"
        placeholder="产品SPU,批量搜索请用英文逗号隔开"
        clearable
      />
      <el-input
        v-model="search.skuCode"
        size="small"
        style="margin-left: 8px; width: 208px"
        placeholder="产品SKU,批量搜索请用英文逗号隔开"
        clearable
      />
      <el-input
        v-model="search.productName"
        size="small"
        style="margin-left: 8px; width: 160px"
        placeholder="产品名称"
        clearable
      />
      <!-- <CategoryCascader
        v-model="search.categoryCode"
        placeholder="产品分类"
        style="margin-left: 10px"
        :emitPath="false"
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      /> -->
    </template>
    <template #filters>
      <!-- :options="gtmList" -->
      <el-select
        v-model="search.gtmList"
        size="small"
        :options="(dict.gtmProductLineList || []).map((x) => ({ name: x }))"
        :props="{
          label: 'name',
          value: 'name',
        }"
        multiple
        placeholder="GTM组"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
      />
      <DeptMember
        v-model="search.gtmManagerList"
        placeholder="GTM经理"
        size="small"
        title="gtm"
        multiple
        clearable
        filterable
        teleported
      />
      <div ref="areaCountryContainerRef">
        <el-cascader
          size="small"
          v-model="search.areaCountryList"
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
          @change="handlerAreaChange"
        />
      </div>
      <el-select
        v-model="search.category3List"
        size="small"
        placeholder="三级类目"
        :options="(dict.category3List || []).map((x) => ({ name: x }))"
        multiple
        :props="{
          label: 'name',
          value: 'name',
        }"
        :clearable="true"
        filterable
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
      <el-select
        v-model="search.category4List"
        size="small"
        placeholder="四级类目"
        :options="(dict.category4List || []).map((x) => ({ name: x }))"
        multiple
        :props="{
          label: 'name',
          value: 'name',
        }"
        :clearable="true"
        filterable
        collapse-tags
        collapse-tags-tooltip
        @change="initData"
      />
    </template>
    <template #buttons>
      <el-button type="primary" v-permission="'msrpManageAdd'" @click="addDialogRef?.open">
        新增
      </el-button>
      <el-button plain v-permission="'msrpManageImport'" @click="batchUpdateVisible = true">
        导入
      </el-button>
      <ExportBtn
        plain
        v-permission="'msrpManageExport'"
        :service="productApi.luteosProductMsrpExportMsrp"
        :params="search"
      >
        导出
      </ExportBtn>
      <!-- <el-button
        type="primary"
        v-permission="'msrpManageBatchEdit'"
        :disabled="selectedList?.length === 0"
        @click="batchEditDialogRef?.open(selectedList?.map((item) => item?.code))"
      >
        批量编辑
      </el-button> -->
      <!--      <ExportBtn :service="exportService" :params="search">导出</ExportBtn>-->
    </template>
    <el-table
      ref="tableRef"
      border
      v-loading="listLoading"
      :data="listData?.resultList"
      row-key="code"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="40"
        reserve-selection
        :selectable="
          (row) =>
            row?.productType === 1 &&
            (selectedList?.length === 0 ||
              row.countryCode === selectedList?.[0]?.countryCode ||
              row.countryCode === listData?.resultList?.[0]?.countryCode)
        "
      />
      <el-table-column type="expand" width="30">
        <template #expand="{ expanded }">
          <i class="iconfont icon-xiangxia icon-expand" :class="expanded ? 'row-open' : ''"></i>
        </template>
        <template #default="{ row }">
          <div class="expand-container">
            <el-table :data="row?.skuBeanList">
              <el-table-column label="产品名称/产品SKU" min-width="500">
                <template #default="{ row }">
                  <div v-if="row?.skuCode">
                    <el-link
                      type="primary"
                      underline="never"
                      class="product-name"
                      @click="handleActions({ key: 'view', row: row })"
                    >
                      {{ row?.skuName }}
                    </el-link>
                    <Copy v-if="row?.skuName" :content="row.skuName" />
                    <div>
                      <span>{{ row?.skuCode }}</span>
                      <Copy v-if="row?.skuCode" :content="row.skuCode" />
                    </div>
                  </div>
                  <div v-else>--</div>
                </template>
              </el-table-column>
              <el-table-column label="国家" prop="countryCode" min-width="80">
                <template #default="{ row }">
                  <el-tag type="info">
                    {{ row.countryCode }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="币种" prop="currencyCode" min-width="120">
                <template #default="{ row }">
                  <div>
                    {{
                      row?.currencyName
                        ? `${row?.currencyCode}【${row?.currencyName}】`
                        : `${row?.currencyCode}`
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="MSRP（全渠道）" align="right" prop="msrp" min-width="120px">
                <template #default="{ row }">
                  <div class="d-flex justify-content-end">
                    <div class="d-flex">
                      <div>{{ row?.minSalePrice }}</div>
                      <!-- <div class="fs-7 text-gray-600">{{ row?.currencyCode }}</div> -->
                      <div
                        style="padding: 0 2px"
                        v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
                      >
                        -
                      </div>
                    </div>
                    <div
                      v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
                      class="d-flex gap-2"
                    >
                      <div>{{ row?.maxSalePrice }}</div>
                      <div
                        class="fs-7 text-gray-600"
                        v-if="row?.minSalePrice !== null && row?.minSalePrice !== ''"
                      >
                        <!-- {{ row?.currencyCode }} -->
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="平销红线价（折扣率）" align="right" min-width="150">
                <template #default="{ row }">
                  <div style="width: 100%; text-align: right">
                    <div class="d-flex justify-content-end price">
                      {{ row?.normalRedlinePrice ?? '' }}
                    </div>
                    <div class="d-flex justify-content-end percent">
                      {{
                        row?.normalRedlineDiscountRate ? `${row?.normalRedlineDiscountRate}%` : ''
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小促红线价（折扣率）" align="right" min-width="150">
                <template #default="{ row }">
                  <div style="width: 100%">
                    <div class="d-flex justify-content-end price">
                      {{ row?.smallPromotionRedlinePrice ?? '' }}
                    </div>
                    <div class="d-flex justify-content-end percent">
                      {{
                        row?.smallPromotionRedlineDiscountRate
                          ? `${row?.smallPromotionRedlineDiscountRate}%`
                          : ''
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="大促红线价（折扣率）" align="right" min-width="150">
                <template #default="{ row }">
                  <div style="width: 100%">
                    <div class="d-flex justify-content-end price">
                      {{ row?.bigPromotionRedlinePrice ?? '' }}
                    </div>
                    <div class="d-flex justify-content-end percent">
                      {{
                        row?.bigPromotionRedlineDiscountRate
                          ? `${row?.bigPromotionRedlineDiscountRate}%`
                          : ''
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="120">
                <template #default="{ row }">
                  <KeenActions
                    display-style="buttons"
                    :actions="[
                      {
                        label: '编辑',
                        key: 'edit',
                        type: 'primary',
                        permissionCode: 'msrpManageEdit',
                        row,
                      },
                      {
                        label: '详情',
                        key: 'view',
                        type: 'primary',
                        permissionCode: 'msrpManageDetail',
                        row,
                      },
                      {
                        label: '删除',
                        key: 'delete',
                        type: 'danger',
                        row,
                      },
                    ]"
                    @click="handleActions"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品名称/产品SPU" min-width="250">
        <template #default="{ row }">
          <div v-if="row?.spuName">
            <el-link
              type="primary"
              underline="never"
              class="product-name"
              @click="handleActions({ key: 'view', row: row })"
            >
              {{ row?.spuName }}
            </el-link>
            <Copy v-if="row?.spuName" :content="row.spuName" />
            <div>
              <span>{{ row?.spuCode }}</span>
              <Copy v-if="row?.spuCode" :content="row.spuCode" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品分类" prop="categoryLevel" min-width="250">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.categoryLevel" :line="1" />
        </template>
      </el-table-column>
      <el-table-column label="国家" prop="countryCode" min-width="80">
        <template #default="{ row }">
          <el-tag type="info">
            {{ row.countryCode }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="币种" prop="currencyCode" min-width="120">
        <template #default="{ row }">
          <div>
            {{
              row?.currencyName
                ? `${row?.currencyCode}【${row?.currencyName}】`
                : `${row?.currencyCode}`
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="MSRP（全渠道）" align="right" prop="msrp" min-width="120px">
        <template #default="{ row }">
          <div class="d-flex justify-content-end">
            <div class="d-flex">
              <div>{{ row?.minSalePrice }}</div>
              <!-- <div class="fs-7 text-gray-600">{{ row?.currencyCode }}</div> -->
              <div
                style="padding: 0 2px"
                v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
              >
                -
              </div>
            </div>
            <div
              v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
              class="d-flex gap-2"
            >
              <div>{{ row?.maxSalePrice }}</div>
              <div
                class="fs-7 text-gray-600"
                v-if="row?.minSalePrice !== null && row?.minSalePrice !== ''"
              >
                <!-- {{ row?.currencyCode }} -->
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="MSRP（亚马逊-VC）" prop="msrp" min-width="150px">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            <div>{{ row?.minVcSalePrice }}</div>
            <div class="fs-7 text-gray-600">{{ row?.currencyCodeVc }}</div>
            <div v-if="row?.maxVcSalePrice && row?.maxVcSalePrice !== row?.minVcSalePrice">-</div>
          </div>
          <div
            v-if="row?.maxVcSalePrice && row?.maxVcSalePrice !== row?.minVcSalePrice"
            class="d-flex gap-2"
          >
            <div>{{ row?.maxVcSalePrice }}</div>
            <div
              class="fs-7 text-gray-600"
              v-if="row?.minVcSalePrice !== null && row?.minVcSalePrice !== ''"
            >
              {{ row?.currencyCodeVc }}
            </div>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="平销红线价（折扣率）" align="right" prop="msrp" min-width="150">
        <template #default="{ row }">
          <!-- <div class="d-flex menu-column center">
            <div>{{ `${row?.normalRedlinePrice ?? ''} ` }}</div>
            <div class="d-flex center">
              {{ row?.normalRedlineDiscountRate ? `${row?.normalRedlineDiscountRate}%` : '' }}
            </div>
          </div>
          <br /> -->
          <div style="width: 100%">
            <div class="d-flex justify-content-end price">{{ row?.normalRedlinePrice ?? '' }}</div>
            <div class="d-flex justify-content-end percent">
              {{ row?.normalRedlineDiscountRate ? `${row?.normalRedlineDiscountRate}%` : '' }}
            </div>
          </div>
          <!-- <div class="d-flex gap-2">{{ `${row?.normalRedlineDiscountRate}%` }}</div> -->
        </template>
      </el-table-column>
      <el-table-column label="小促红线价（折扣率）" align="right" prop="msrp" min-width="150">
        <template #default="{ row }">
          <div style="width: 100%">
            <div class="d-flex justify-content-end price">
              {{ row?.smallPromotionRedlinePrice ?? '' }}
            </div>
            <div class="d-flex justify-content-end percent">
              {{
                row?.smallPromotionRedlineDiscountRate
                  ? `${row?.smallPromotionRedlineDiscountRate}%`
                  : ''
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="大促红线价（折扣率）" align="right" prop="msrp" min-width="150">
        <template #default="{ row }">
          <div style="width: 100%">
            <div class="d-flex justify-content-end price">
              {{ row?.bigPromotionRedlinePrice ?? '' }}
            </div>
            <div class="d-flex justify-content-end percent">
              {{
                row?.bigPromotionRedlineDiscountRate
                  ? `${row?.bigPromotionRedlineDiscountRate}%`
                  : ''
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: 'msrpManageEdit',
                row,
              },
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: 'msrpManageDetail',
                row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'primary',
                hide: !(row.productType === 2),
                row,
              },
              // {
              //   label: '日志',
              //   key: 'log',
              //   type: 'primary',
              //   hide: !(row.productType === 2),
              //   row,
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
  <AddDialog ref="addDialogRef" @success="refreshList" />
  <SpuEditDialog ref="spuEditDialogRef" @success="refreshList" />
  <SkuEditDialog ref="skuEditDialogRef" @success="refreshList" />
  <SpuDetailDialog ref="spuDetailDialogRef" />
  <SkuDetailDialog ref="skuDetailDialogRef" />
  <BatchEditDialog
    ref="batchEditDialogRef"
    @success="
      () => {
        refreshList();
        tableRef?.clearSelection();
      }
    "
  />
  <BatchUpdateModal v-if="batchUpdateVisible" :visible="batchUpdateVisible" @close="batchUpdate" />
  <LogDialog ref="logDialogRef" />
</template>

<script setup lang="ts" name="msrpManage">
  import useList from '@/hooks/list/useList';
  import { ProductApi, productApi, memberApi, biApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import SpuEditDialog from '@/views/msrpManage/msrp/components/spuEditDialog.vue';
  // import { ElSelect } from 'element-plus';
  import BatchUpdateModal from '@/views/msrpManage/msrp/components/importDialog.vue';
  import SpuDetailDialog from '@/views/msrpManage/msrp/components/spuDetailDialog.vue';
  import SkuEditDialog from '@/views/msrpManage/msrp/components/skuEditDialog.vue';
  import SkuDetailDialog from '@/views/msrpManage/msrp/components/skuDetailDialog.vue';
  import BatchEditDialog from '@/views/msrpManage/msrp/components/batchEditDialog.vue';
  import AddDialog from '@/views/msrpManage/msrp/components/addDialog.vue';
  // import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import LogDialog from './components/logDialog.vue';

  // const gtmList: any = ref<any[]>([]);
  // const queryGtmList = async () => {
  //   const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
  //   gtmList.value = res?.deptInfoList;
  // };
  // queryGtmList();
  const initData = async () => {
    await getDict();
    // await getData();
  };

  const areaOptions = computed(() => {
    //  return (dict.value.areaCountryList || []).map((area) => {
    return (areaCountryList.value || []).map((area) => {
      return {
        label: area.area,
        value: area.area,
        children: (area.countryInfoList || []).map((c) => {
          return {
            label: `${c.countryName}【${c.countryCode}】`,
            value: c.countryCode,
          };
        }),
      };
    });
  });

  const dict: any = ref({
    areaList: [],
    categoryList: [],
    countryList: [],
    platformList: [],
  });
  const areaCountryList = ref();
  const countryAll = ref([]);
  const getAreaCountryList = async () => {
    const res = await productApi.luteosProductSkuQueryCountry();
    if (res) {
      areaCountryList.value = res;
      (areaCountryList.value || []).map((area) => {
        return {
          children: (area.countryInfoList || []).map((c) => {
            countryAll.value.push(c);
            return '';
          }),
        };
      });
    }
  };
  // 区域国家
  getAreaCountryList();

  const getDict = async () => {
    const res = await biApi.biFrontpageQueryEnums(buildQuery());
    if (res) {
      dict.value = res;
    }
  };
  const handlerAreaChange = async () => {
    initData();
    // await nextTick();
    // const els = areaCountryContainerRef.value.querySelectorAll('.el-cascader__tags .el-tag');
    // let width = 0;
    // els.forEach((el) => {
    //   width += el.clientWidth;
    // });
    // width += 55;
    // if (width < 110) {
    //   width = 110;
    // }
    // areaCountrySelectorWidth.value = width;
  };

  const countryCodeList = ref([]);
  const channelCodeList = ref([]);
  const tableRef = ref();
  const PAGE_SIZE = 10;
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
    ProductApi.LuteosProductMsrpQueryList.RequestQuery,
    ProductApi.LuteosProductMsrpQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      // keywordType: 1,
      countryCodeList: undefined,
      channelCodeList: undefined,
      categoryCode: undefined,
      level: undefined,
      spuCode: undefined,
      skuCode: undefined,
      spuCodeList: undefined,
      skuCodeList: undefined,
      productName: undefined,
      gtmList: undefined,
      gtmManagerList: undefined,
      category3List: undefined,
      category4List: undefined,
      areaCountryList: undefined,
      areaList: undefined,
      countryList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMsrpQueryList,
  });
  watchEffect(() => {
    if (search.spuCode) {
      // 去空格
      search.spuCodeList = search.spuCode
        ?.trim()
        .split(',')
        .map((item) => item.trim());
    } else {
      search.spuCodeList = undefined;
    }
    if (search.skuCode) {
      search.skuCodeList = search.skuCode
        ?.trim()
        .split(',')
        .map((item) => item.trim());
    } else {
      search.skuCodeList = undefined;
    }
    // search.countryList = search.skuCode?.split(',');
    search.productName = search.productName?.trim();
    search.countryList = [...new Set(search?.areaCountryList?.map((x) => x[1]).filter(Boolean))];
  });
  const buildQuery = () => {
    const areaCountryList = search.areaCountryList || [];
    const areaList = [...new Set(areaCountryList.map((x) => x[0]).filter(Boolean))];
    const countryList = [...new Set(areaCountryList.map((x) => x[1]).filter(Boolean))];
    return {
      ...search,
      areaCountryList: undefined,
      areaList,
      countryList,
    };
  };
  initData();

  const addDialogRef = ref();
  const logDialogRef = ref();
  const spuEditDialogRef = ref();
  const skuEditDialogRef = ref();
  const spuDetailDialogRef = ref();
  const skuDetailDialogRef = ref();
  const batchEditDialogRef = ref();

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      if (row?.productType === 1) spuEditDialogRef.value?.open(row?.code);
      else skuEditDialogRef.value?.open(row?.code);
    } else if (key === 'delete') {
      // 删除
      const isConfirmed = await swal.confirm('确认删除当前sku的MSRP数据吗');
      if (!isConfirmed) return;
      const res = await productApi.luteosProductMsrpDeleteSkuDetail({ code: row.code });
      if (res) {
        ElMessage.success('删除成功');
        refreshList();
      } else {
        ElMessage.error('删除失败，请稍后再试');
      }
    } else if (key === 'log') {
      if (row.productType === 1) {
        logDialogRef.value?.open(row?.spuCode);
      }
      if (row.productType === 2) {
        logDialogRef.value?.open(row?.skuCode);
      }
    }
    if (key === 'view') {
      if (row?.productType === 1) spuDetailDialogRef.value?.open(row?.code);
      else skuDetailDialogRef.value?.open(row?.code);
    }
  };

  // 导入
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 批量编辑
  const selectedList = ref([]);
  const handleSelectionChange = async (list) => {
    selectedList.value = [];
    if (list.length) {
      list.forEach((item) => {
        if (item.productType === 1 && item.countryCode === list[0].countryCode) {
          selectedList.value.push(item);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
  };
  // const handleCountryChange = (val) => {
  //   // search.countryCodeList = val.join(',');
  //   search.countryCodeList = val;
  // };
  // const handleChannelChange = (val) => {
  //   search.channelCodeList = val.join(',');
  // };

  const reset = () => {
    countryCodeList.value = [];
    channelCodeList.value = [];
    search.spuCodeList = [];
    search.skuCodeList = [];
    search.areaCountryList = [];
    resetSearch();
  };

  onActivated(() => {
    tableRef.value?.clearSelection();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__expand-column) {
    .cell {
      padding: 0;
    }
  }

  :deep(.el-table__expanded-cell) {
    background-color: #f5f7fa !important;
    padding: 8px !important;
  }

  .icon-expand {
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #1e2226;
    transform: rotate(-90deg);

    &.row-open {
      transform: rotate(0deg);
    }
  }
  .expand-container {
    padding-left: 38px;
    .product-name {
      font-weight: 400;
      font-size: 12px;
    }
    .el-table {
      border-radius: 8px;
      border: 1px solid #dfe2e6;
      border-bottom: none;
      --el-table-border: 1px solid #dfe2e6;
      --el-table-border-color: #dfe2e6;
      --el-table-header-bg-color: #f5f7fa;
      --el-table-bg-color: #f5f7fa;
      --el-table-tr-bg-color: #f5f7fa;
    }
  }
  .product-name {
    font-family: 'PingFang SC Medium';
    font-size: 14px;
  }
  .ml-10 {
    margin-left: 10px;
  }

  .w-200 {
    width: 200px;
  }
  .price {
    font-size: 12px;
    font-family: 'PingFang SC Medium';
    font-weight: 500;
    color: #1e2226;
  }
  .percent {
    font-size: 12px;
    color: #8a9099;
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

  .popper-class-sku-area {
    max-height: 600px;
    overflow-y: auto;
  }
</style>
