<template>
  <div class="box-top-message" :class="{ 'message-h p-4': showFlag }">
    <el-row v-if="showFlag">
      <el-col :span="6" v-for="item in mesaageData">
        <span>{{ item.name }}</span>
        <el-popover placement="top">
          <template #reference>
            <QuestionFilled class="question-icon ms-2" />
          </template>
          <div class="p-2 tip-box">
            <div>{{ item.tip }}</div>
            <el-link type="primary" :href="dictUrl" target="_blank">{{ dictUrlName }}</el-link>
          </div>
        </el-popover>
        <span class="ms-4">{{ perfectionBeanData?.[item.key]?.percentage || '--' }}</span>
      </el-col>
    </el-row>
  </div>
  <KeenList
    @refresh="refreshListData"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="供应链产品名称/供应链SKU"
        clearable
        style="width: 300px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.productStatus" placeholder="产品状态" clearable>
        <el-option
          v-for="(item, key) in productStatusMap"
          :value="key"
          :label="item.desc"
          :key="key"
        />
      </el-select>
      <el-select v-model="search.saleStatus" placeholder="销售状态" clearable>
        <el-option
          v-for="(item, key) in saleStatusMap"
          :value="key"
          :label="item.desc"
          :key="key"
        />
      </el-select>
      <el-select v-model="search.productType" placeholder="产品类型" clearable>
        <el-option label="产品" :value="1" />
        <el-option label="物料" :value="2" />
        <el-option label="配件" :value="12" />
        <el-option label="用研产品" :value="3" />
        <el-option label="虚拟产品" :value="14" />
        <el-option label="组合产品" :value="13" />
      </el-select>
      <PurchaserSelect v-model="search.purchaser" placeholder="执行采购" clearable filterable />
      <el-select
        v-if="userInfo?.superAdminInRoleManagerMenu"
        class="w-200px"
        v-model="search.supplierCode"
        clearable
        filterable
        placeholder="供应商名称/供应商代码"
      >
        <el-option
          v-for="item in supplierList"
          :label="`${item.supplierCode} - ${item.supplierName}`"
          :value="item.supplierCode"
          :key="item.supplierCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="$router.push('/supplyGoods/add')"
        v-permission="'supplyGoodsAdd'"
      >
        新增供应链产品
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="
          () => {
            batchType = 'import';
            batchTitle = '导入';
            batchUpdateVisible = true;
          }
        "
      >
        导入
      </el-button>
      <!--      <ExportBtn :service="productApi.luteosProductSupplySkuExportSupplySkuList" :params="search">
        导出
      </ExportBtn>-->
      <el-button
        @click="
          () => {
            batchType = 'export';
            batchTitle = '导出';
            batchUpdateVisible = true;
          }
        "
        type="primary"
        plain
      >
        导出
      </el-button>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div>查看完整度统计</div>
        </template>
        <i class="iconfont icon-shujutongji icon-show-message" @click="showFlagData"></i>
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.supplySkuList"
      row-key="supplierSku"
      class-name="table-row-dashed"
      v-if="tableShow"
    >
      <el-table-column label="供应链产品信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.productImage"
            :title="row.productTitle"
            :subtitle="row.productSku"
            copy-title
            copy-subtitle
            :url="`/supplyGoods/detail?code=${row.productSku}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="产品类型">
        <template #default="{ row }">
          <span>{{ productTypeMap[row?.productType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品属性" min-width="120">
        <template #default="{ row }">
          <div class="fs-7">
            <div>
              产品状态：
              <Tag :color="productStatusMap[row?.productStatus]?.color">
                {{ productStatusMap[row?.productStatus]?.desc }}
              </Tag>
            </div>
            <div>
              销售状态：
              <Tag :color="saleStatusMap[row?.saleStatus]?.color">
                {{ saleStatusMap[row?.saleStatus]?.desc }}
              </Tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商信息"
        min-width="120"
        v-if="userInfo?.superAdminInRoleManagerMenu"
      >
        <template #default="{ row }">
          <div class="fs-7">{{ row?.supplierCode }}</div>
          <div class="fs-7">{{ row?.supplierName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="采购信息" min-width="120">
        <template #default="{ row }">
          <div>执行采购：{{ row?.purchaserName || '--' }}</div>
          <div>战略采购：{{ row?.strategicPurchaserName || '--' }}</div>
          <div>
            采购价：{{ row?.purchasePrice }}
            <span class="text-gray-500">{{ row?.purchaseCurrencyCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: 'supplyGoodsEdit',
                row,
              },
              {
                label: '设为默认',
                key: 'default',
                type: 'primary',
                permissionCode: '',
                hide: row.productType !== 1,
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
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :title="batchTitle"
    @close="batchUpdate"
    :type="batchType"
    :search="search"
  />
</template>

<script setup lang="ts" name="supplyGoods">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, supplierApi, financeApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import BatchUpdateModal from '@/views/goodscenter/supplyGoods/components/BatchUpdateModal.vue';
  import { useStore } from '@/store/modules/useStore';

  const store = useStore();
  const { getInfo } = store;
  const userInfo = getInfo;
  const mesaageData = ref([
    {
      name: '供应链SKU信息完整度',
      tip: '指重要属性都有值的SKU数量占比，计算口径见：',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      key: 'skuPerfectionBean',
    },
    {
      name: '报关/清关信息完整度',
      tip: '指报关/清关信息都有值的SKU数量占比，计算口径见：',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      value: null,
      key: 'skuDeclarePerfectionBean',
    },
    {
      name: '包装信息完整度',
      tip: '指包装信息都有值的SKU数量占比，计算口径见：',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      key: 'skuSpecPerfectionBean',
    },
    {
      name: '采购信息完整度',
      tip: '指采购信息都有值的SKU数量占比，计算口径见：',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      key: 'skuPurchasePerfectionBean',
    },
  ]);
  const showFlag = ref(true);
  const tableShow = ref(true);
  const productTypeMap = {
    1: '产品',
    2: '物料',
    3: '用研产品',
    12: '配件',
    13: '组合产品',
    14: '虚拟产品',
  };

  const productStatusMap = {
    0: {
      desc: '不可用',
      color: 'red',
    },
    1: {
      desc: '可用',
      color: 'green',
    },
    2: {
      desc: '开发产品',
      color: 'blue',
    },
  };
  const saleStatusMap = {
    18: {
      desc: '待上架',
      color: 'blue',
    },
    2: {
      desc: '在销售',
      color: 'green',
    },
    1: {
      desc: '清仓中',
      color: 'gray',
    },
    6: {
      desc: '已退市',
      color: 'red',
    },
  };

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
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.RequestQuery,
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      productStatus: undefined,
      saleStatus: undefined,
      productType: undefined,
      purchaser: undefined,
      supplierCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSupplySkuQuerySupplySkuList,
  });
  watch(
    () => current.value,
    () => {
      if (current.value !== 1 && showFlag.value) {
        showFlag.value = false;
        // 解决表格高度问题
        tableShow.value = false;
        setTimeout(() => {
          tableShow.value = true;
        }, 10);
      }
    },
    {
      immediate: true,
    }
  );
  const perfectionBeanData = ref();
  // 信息完整度
  const messageRefresh = async () => {
    const res = await productApi.luteosProductSupplySkuQuerySupplySkuPerfection();
    perfectionBeanData.value = res;
  };
  messageRefresh();
  // 刷新
  const refreshListData = async () => {
    refreshList();
    messageRefresh();
  };
  // 控制信息完整度信息显示
  const showFlagData = async () => {
    showFlag.value = !showFlag.value;
    // 解决表格高度问题
    tableShow.value = false;
    setTimeout(() => {
      tableShow.value = true;
    }, 10);
  };
  // 获取业务字典,文档url
  const dictUrl = ref('');
  const dictUrlName = ref('产品信息完整性说明文档');
  const getDictList = async () => {
    const res = await financeApi.luteosFinanceBusinessDictList({
      code: 'product_info_perfection_url',
    });
    dictUrl.value =
      res.list?.[0]?.remark ||
      'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space';
    dictUrlName.value = res.list?.[0]?.name || '产品信息完整性说明文档';
  };
  getDictList();

  const route = useRoute();
  const router = useRouter();

  if (route.query.keyword) {
    search.keyword = route.query.keyword as string;
  }
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      router.push({
        path: '/supplyGoods/detail',
        query: {
          code: row?.productSku,
        },
      });
    } else if (key === 'edit') {
      router.push({
        path: '/supplyGoods/edit',
        query: {
          code: row?.productSku,
        },
      });
    } else if (key === 'default') {
      const isConfirmed = await swal.confirm('是否将该供应链SKU设为产品SKU的默认供应链SKU？');
      if (!isConfirmed) return;
      await productApi.luteosProductSupplySkuOperateSupplySku({
        productSku: row?.productSku,
        operateType: 1,
      });
      ElMessage.success('设置成功');
      refreshList();
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

  const supplierList = ref([]);
  const querySupplierList = async () => {
    const res = await supplierApi.luteosSupplierQuerySupplierList();
    supplierList.value = res?.encryptSupplierList;
  };

  querySupplierList();
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
    color: var(--el-color-primary);
  }
  .tip-box {
    font-size: 10px;
    color: #999;
    a {
      overflow-wrap: anywhere;
      font-size: 10px;
    }
    div {
      display: inline-block;
    }
  }
  .icon-show-message {
    color: #666666;
    cursor: pointer;
  }
  .box-top-message {
    background-color: #fff;
    height: 0;
  }
  .message-h {
    height: auto;
    margin-bottom: 10px;
  }
  .dropdown {
    transition: height 0.5s ease; /* 定义高度变化的过渡效果 */
  }
</style>
