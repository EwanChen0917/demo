<template>
  <KeenList
    :resetBtnOptions="{
      size: 'small',
    }"
    @refresh="refreshListData"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    :selected-num="totalList.length"
  >
    <template #search>
      <el-input
        v-model="search.keyWord"
        size="small"
        placeholder="产品SKU名称/产品SKU/产品SPU"
        clearable
        style="width: 255px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductLineSelect
        v-model="search.productLineListWeb"
        size="small"
        teleported
        placeholder="产品品线"
        multiple
        clearable
        filterable
      />
      <el-select
        v-model="search.productSpu"
        size="small"
        clearable
        filterable
        remote
        reserve-keyword
        placeholder="产品名称"
        :remote-method="remoteMethod"
        :loading="loading"
        @clear="spuList = []"
      >
        <el-option
          v-for="item in spuList"
          :key="item.productSpu"
          :label="item.name"
          :value="item.productSpu"
        />
      </el-select>
      <div ref="areaCountryContainerRef">
        <el-cascader
          v-model="search.saleRegionListSelect"
          size="small"
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
      <el-select v-model="search.brandListWeb" size="small" placeholder="品牌"
                 multiple filterable clearable>
        <el-option
          v-for="item in brandList"
          :key="item.brandCode"
          :label="item.brandNameEn"
          :value="item.brandCode"
        />
      </el-select>
      <CategoryCascader
        v-model="search.categoryListWeb"
        size="small"
        placeholder="产品分类"
        multiple
        :emit-path="false"
        @change="
          (val) => {
            search.level = val.level;
          }
        "
      />
      <el-select v-model="search.tagListWeb" size="small"
                 multiple placeholder="SKU/产品分类标签" clearable>
        <el-option
          v-for="item in labelOptions"
          :label="item.tagName"
          :value="item.tagCode"
          :key="item.tagCode"
        />
      </el-select>
      <el-select
        v-model="search.statusListWeb"
        size="small"
        placeholder="状态"
        clearable
        multiple
        :teleported="false"
      >
        <el-option v-for="(val, key) in statusMap" :key="key" :label="val || ''" :value="key!" />
      </el-select>
      <OperatorSelect size="small"
                      multiple teleported v-model="search.productManagerListWeb" />
      <el-date-picker
        size="small"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        format="YYYY/MM/DD"
        teleported
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="handleTimeChange"
      />
      <el-select
        v-model="hasMissingArr"
        size="small"
        placeholder="SKU缺失字段"
        filterable
        multiple
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      >
        <el-option label="缺失图片" :value="0" />
        <el-option label="是否含有电池为空" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        :disabled="!codeList.length"
        @click="batchOperate"
        v-permission="'skuBatchOperate'"
      >
        批量操作
      </el-button>
      <el-button class="button" v-permission="'skuRemind'" plain @click="batchRemind">
        提醒
      </el-button>
      <el-button
        class="button"
        v-permission="'skuUpdate'"
        plain
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

      <el-button
        v-permission="'skuExport'"
        class="button"
        plain
        @click="
          () => {
            batchType = 'export';
            batchTitle = '导出';
            batchUpdateVisible = true;
          }
        "
        :loading="exportLoading"
      >
        导出
      </el-button>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top" trigger="click">
        <template #content>
          <div class="message-box">
            <div v-for="item in mesaageData">
              <span>{{ item.name }}</span>
              <span class="ms-4">{{ perfectionBeanData?.[item.key]?.percentage || '--' }}</span>
            </div>
            <div class="ext-info">
              <div>SPU重要属性都有值的数量占比，详见：</div>
              <el-link type="primary" :href="dictUrl" target="_blank" underline="always">
                {{ dictUrlName }}
              </el-link>
            </div>
          </div>
        </template>
        <div class="icon-show-message">查看完整统计</div>
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.productSkuBeanList"
      row-key="skuCode"
      @selection-change="handleSelectionChange"
      class-name="table-row-dashed"
      @sort-change="handleSortChange"
      v-if="tableShow"
    >
      <el-table-column type="selection" width="50" reserve-selection />
      <el-table-column label="产品信息" min-width="400" fixed="left">
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImageUrl"
            :title="scope.row.productTitle"
            :subtitle="scope.row.skuCode"
            :imgOptions="{
              style: {
                border: '1px solid #02B96B',
                borderRadius: '8px',
              },
            }"
            permission="skuDetail"
            copyTitle
            copy-subtitle
            :no-url-click="true"
            @click="skuEditDrawerRef?.open({ code: scope.row.skuCode, type: 'detail' })"
          />
        </template>
      </el-table-column>
      <el-table-column prop="stateDesc" min-width="100" label="状态">
        <template #default="{ row }">
          <span class="badge" :class="statusColorMap[row.state]">
            {{ row.stateDesc }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="productLineName" label="产品品线" min-width="100" />
      <el-table-column prop="categoryName" label="产品品类" min-width="120" />
      <el-table-column prop="categoryLabelName" label="产品分类标签" min-width="100">
        <template #default="{ row }">
          <el-tag type="info">{{ row.categoryLabelName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="productSpu" label="产品SPU" min-width="150" />
      <el-table-column label="建议零售价" min-width="180">
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

      <el-table-column prop="createByName" min-width="150" label="产品经理">
        <template #default="scope">
          <el-tag v-if="scope.row.createByName" round type="info">
            <SvgIcon icon="fullUser" class="me-1" />
            <span>{{ scope.row.createByName }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="plannerName" min-width="150" label="计划专员">
        <template #default="scope">
          <el-tag v-if="scope.row.plannerName" round type="info">
            <SvgIcon icon="fullUser" class="me-1" />
            <span>{{ scope.row.plannerName }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" min-width="100" label="创建时间" sortable="true" />
      <el-table-column prop="updateTime" min-width="100" label="更新时间" sortable="true" />
      <el-table-column prop="saleRegionList" min-width="150" label="销售地区">
        <template #default="{ row }">
          <span v-html="getSaleRegionList(row?.saleRegionList, 2)" class="saleRegionList"></span>
          <el-tooltip placement="top" effect="light">
            <template #content>
              <div
                style="margin-right: 10px"
                v-html="getSaleRegionList(row?.saleRegionList, 0)"
              ></div>
            </template>
            <el-icon class="MoreFilled" v-if="row?.saleRegionList?.length > 2">
              <MoreFilled />
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>

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
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                skuCode: row.skuCode,
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
  <LogDialog ref="logDialogRef" itemType="product_sku" />
  <SkuEditDrawer ref="skuEditDrawerRef" @success="handleSuccess" />
</template>

<script lang="ts" setup name="skulist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, financeApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import { decryptByBase64 } from '@/utils/aesTils';
  import RemindDialog from '@/views/goodscenter/goodsmanage/skulist/components/remindDialog.vue';
  import BatchOperateDialog from '@/views/goodscenter/goodsmanage/skulist/components/batchOperateDialog.vue';
  import { omit } from 'lodash-es';
  import BatchUpdateModal from './components/BatchUpdateModal.vue';
  import BindModal from '../../bindGoods/Modal/bindGoods.vue';
  import LogDialog from '../goodslist/components/logDialog.vue';
  import SkuEditDrawer from './components/SkuEditDrawer.vue';

  const mesaageData = ref([
    {
      name: 'SKU信息完整度',
      tip: '指重要属性都有值的SKU数量占比',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      key: 'skuPerfectionBean',
    },
    {
      name: '产品基本信息完整度',
      tip: '指产品基本属性都有值的SKU数量占比',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      key: 'productPerfectionBean',
    },
    {
      name: '产品供应链属性完整度',
      tip: '指产品供应链属性都有值的SKU数量占比',
      url: 'https://alidocs.dingtalk.com/i/nodes/Gl6Pm2Db8DeyqqXjuYDmDPpxWxLq0Ee4?utm_scene=team_space',
      key: 'supplyPerfectionBean',
    },
  ]);
  const showFlag = ref(true);
  const tableShow = ref(true);
  const time = ref<any>([]);
  const handleTimeChange = (val) => {
    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    if (val) {
      search.createTimeStart = val[0] || '';
      search.createTimeEnd = val[1] || '';
    } else {
      search.createTimeStart = undefined;
      search.createTimeEnd = undefined;
    }
  };
  const logDialogRef = ref();
  const PAGE_SIZE = 10;
  const router = useRouter();
  const skuEditDrawerRef = ref();
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
      categoryListWeb: [],
      productManagerListWeb: [],
      level: undefined,
      productSpu: undefined,
      statusListWeb: ['2'],
      codeList: undefined,
      tagListWeb: [],
      productLineListWeb: [],
      brandListWeb: [],
      createTimeStart: undefined,
      createTimeEnd: undefined,
      orderBy: undefined,
      asc: undefined, // 默认降序
      saleRegionListSelect: undefined,
      saleRegionList: undefined,
      hasMissing: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      searchData = {...searchData};
      if (searchData.categoryListWeb?.length) {
        searchData.categoryListWeb = searchData.categoryListWeb.join(',');
      }
      if (searchData.productManagerListWeb?.length) {
        searchData.productManagerListWeb = searchData.productManagerListWeb.join(',');
      }
      if (searchData.statusListWeb?.length) {
        searchData.statusListWeb = searchData.statusListWeb.join(',');
      }
      if (searchData.tagListWeb?.length) {
        searchData.tagListWeb = searchData.tagListWeb.join(',');
      }
      if (searchData.productLineListWeb?.length) {
        searchData.productLineListWeb = searchData.productLineListWeb.join(',');
      }
      if (searchData.brandListWeb?.length) {
        searchData.brandListWeb = searchData.brandListWeb.join(',');
      }

      const { saleRegionListSelect } = searchData;
      const areaCountryList = saleRegionListSelect || [];
      const countryList = [...new Set(areaCountryList.map((x) => x[1]).filter(Boolean))];
      return {
        ...omit(searchData, 'saleRegionListSelect'),
        saleRegionList: countryList.join(','),
      };
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSkuQueryProductSkuList,
  });
  const hasMissingArr = ref([]);
  watchEffect(() => {
    if (hasMissingArr.value.length > 0) {
      search.hasMissing = hasMissingArr.value.toString();
    } else {
      search.hasMissing = undefined;
    }
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
    const res = await productApi.luteosProductSkuQueryProductSkuPerfection();
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
  const { productSpu, skuList, tagCode } = route.query as {
    productSpu?: string;
    tagCode?: string;
    skuList?: string[];
  };
  if (skuList) {
    search.codeList = decryptByBase64(skuList);
  }
  if (tagCode) {
    search.tagListWeb = [tagCode];
    search.statusListWeb = [];
  }
  console.log('query', route.query);
  if (route.query.productSpu) {
    search.statusListWeb = [];
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
  // 查询品牌
  const brandList = ref<any[]>([]);
  const queryBrandList = () => {
    productApi
      .luteosProductBrandQueryBrandList({
        pageNum: 1,
        pageSize: 100,
      })
      .then((res: any) => {
        if (+res.code === 200) {
          brandList.value = res.brandBeanList || [];
        }
      });
  };

  queryBrandList();
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

  // 销售区域
  const areaCountryList = ref([]);
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
        children: (area.countryList || []).map((c) => {
          return {
            label: c,
            value: c,
          };
        }),
      };
    });
  });

  const getSaleRegionList = (list, num) => {
    if (list) {
      let areaCountryList = JSON.parse(JSON.stringify(list));
      if (num && areaCountryList.length > num) {
        areaCountryList = areaCountryList.splice(0, num);
      }
      const areaList = [...new Set(areaCountryList.map((x) => x[0]).filter(Boolean))];
      let text = '';
      if (areaList.length) {
        areaList.forEach((res) => {
          const countryList = [
            ...new Set(areaCountryList.map((x) => x[0] === res && x[1]).filter(Boolean)),
          ];
          text += `<span style='font-weight: bold;'>${res}</span>：${countryList.join('，')}</br>`;
        });
        return text;
      }
    }
  };
  // 勾选产品
  const totalList = ref([]);
  const codeList = ref([]);
  const validSkuList = ref([]);
  const invalidSkuList = ref([]);
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
      状态: search.statusListWeb.map(x=>{
        return statusMap[x] || ''
      }).filter(Boolean).join(', '),
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
        title: '请确认',
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
      case 'log':
        logDialogRef.value?.open(skuCode);
        break;
      case 'edit':
        // editProductDetail(skuCode);
        skuEditDrawerRef.value?.open({ code: skuCode, type: 'edit' });
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
    hasMissingArr.value = [];
    categoryCodeList.value = '';
    time.value = [];
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
  .message-box {
    color: var(---N0, #fff);

    /* 常规/Medium 14 */
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    .ext-info {
      color: #f0f2f5;

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
    .el-link {
      --el-link-font-size: 12px;
    }
  }
  .icon-show-message {
    color: var(--el-color-primary);
    cursor: pointer;
  }
  :deep(.goods-info-text) {
    .info-title {
      color: var(---P6, #02b96b);

      /* 较弱/Medium 12 */
      font-family: 'PingFang SC Medium';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 166.667% */
    }
    span.link {
      color: var(---P6, #02b96b) !important;
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

  :deep(.el-cascader) {
    .el-cascader__tags {
      top: 0;
      transform: translateY(0);

      .el-tag {
        max-width: 100px;
      }
    }
  }
  .saleRegionList {
    float: left;
    margin-right: 5px;
  }
  .MoreFilled {
    color: var(--el-color-primary);
    cursor: pointer;
  }
</style>

<style lang="scss">
  .popper-class-sku-area {
    max-height: 600px;
    overflow-y: auto;
  }
</style>
