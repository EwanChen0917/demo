<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="店铺名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.platformCode" placeholder="渠道" clearable>
        <el-option
          v-for="item in platformOptions"
          :key="item.value"
          :label="item.desc || ''"
          :value="item.value!"
        />
      </el-select>
      <el-select v-model="search.shopProperty" placeholder="店铺属性" clearable>
        <el-option label="主号" :value="0" />
        <el-option label="小号" :value="1" />
        <el-option label="备用号" :value="2" />
      </el-select>
      <el-select v-model="search.errorStatus" placeholder="店铺状态" clearable>
        <el-option
          v-for="(val, key) in errorStatusMap"
          :key="key"
          :label="val || ''"
          :value="key!"
        />
      </el-select>
      <el-select v-model="search.authStatus" placeholder="授权状态" clearable>
        <el-option
          v-for="(val, key) in authStatusMap"
          :key="key"
          :label="val || ''"
          :value="key!"
        />
      </el-select>
      <el-select v-model="search.recycleLabel" placeholder="回收标签" clearable>
        <el-option label="预计回收" :value="0" />
        <el-option label="回收中" :value="1" />
        <el-option label="已回收" :value="2" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="selectDialogRef?.open">开店申请</el-button>
      <el-button class="button" type="primary" @click="add">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.shopListDetailResps"
      row-key="shopCode"
      class-name="table-row-dashed"
    >
      <el-table-column prop="shopAccount" label="店铺账号" min-width="150" />
      <el-table-column prop="name" label="店铺名称" min-width="150" />
      <el-table-column prop="platformDesc" label="渠道" />
      <el-table-column prop="site" label="站点" />
      <el-table-column prop="ecShopAccount" label="易仓店铺账号" min-width="150" />
      <el-table-column prop="ecStatusDesc" label="易仓店铺状态" min-width="120">
        <template #default="{ row }">
          <Tag v-if="row.ecStatusDesc" :color="ecColorMap[row.ecStatusDesc]">
            {{ row.ecStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="captainShopAccount" label="船长店铺账号" min-width="150" />
      <el-table-column prop="captainStatusDesc" label="船长店铺状态" min-width="120">
        <template #default="{ row }">
          <Tag v-if="row.captainStatusDesc" :color="capColorMap[row.captainStatusDesc]">
            {{ row.captainStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="recycleLabelDesc" label="回收标签" min-width="150" />
      <!-- <el-table-column prop="email" label="注册邮箱" /> -->
      <el-table-column prop="errorStatus" width="100px" label="店铺状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.errorStatus]">{{ row.errorStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="shopPropertyDesc" label="店铺属性" />
      <el-table-column prop="authStatus" label="授权状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.authStatus]">
            {{ row.authStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="192px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                shopCode: row.shopCode,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                shopCode: row.shopCode,
              },
              {
                label: '回收',
                key: 'recovery',
                type: 'primary',
                row,
              },
              /*{
                label: row.errorStatus === 2 ? '开店' : '关店',
                key: 'close',
                type: 'primary',
                errorStatus: row.errorStatus,
                shopCode: row.shopCode,
              },*/
              {
                label: '关店',
                key: 'close',
                hide: row.errorStatus === 2,
                type: 'primary',
                errorStatus: row.errorStatus,
                shopCode: row.shopCode,
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
  <RecoveryDialog ref="recoveryDialogRef" @success="runQuery" />
  <SelectDialog ref="selectDialogRef" @success="runQuery" />
</template>

<script lang="ts" setup name="shoplist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { platformApi, shopApi, ShopApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import SelectDialog from '@/views/settings/shopmanage/shoplist/components/selectDialog.vue';
  import RecoveryDialog from './components/recoveryDialog.vue';

  const authStatusMap = reactive({
    0: '未授权',
    1: '已授权',
    2: '异常',
  });

  const errorStatusMap = reactive({
    1: '正常',
    2: '异常',
  });

  const statusColorMap = reactive({
    0: 'blue',
    1: 'green',
    2: 'red',
  });

  const ecColorMap = reactive({
    启用: 'green',
    停用: 'red',
    授权中: 'purple',
    关店: 'gray',
  });
  const capColorMap = reactive({
    可用: 'green',
    不可用: 'red',
  });

  const router = useRouter();
  const PAGE_SIZE = 10;
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
    ShopApi.LuteosShopQueryShopCommonList.RequestBody,
    ShopApi.LuteosShopQueryShopCommonList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      platformCode: undefined,
      errorStatus: undefined,
      authStatus: undefined,
      shopProperty: undefined,
      recycleLabel: undefined,
    },
    pageSize: PAGE_SIZE,
    service: shopApi.luteosShopQueryShopCommonList,
  });
  const recoveryDialogRef = ref();

  const route = useRoute();
  const { params } = route;

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  const platformOptions = ref<any[]>([]);
  const getPlatformOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['shop_platform'],
    });
    platformOptions.value = res.dictMap?.shop_platform as [];
  };
  getPlatformOptions();
  // 表格操作
  const handleActions = async (item) => {
    const { key, shopCode, errorStatus, row } = item;
    if (key === 'view') {
      sessionStorage.setItem('shopSearchInfo', JSON.stringify(search));
      router.push(`/shoplist/detail?code=${shopCode}`);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'shopEdit',
        query: {
          code: shopCode,
        },
      });
      router.push(path.href);
    } else if (key === 'recovery') {
      recoveryDialogRef.value.open(row.shopCode, row);
    } else if (key === 'close') {
      // closeShop(shopCode, errorStatus);
      router.push({
        path: '/shoplist/closeApply',
        query: {
          type: 0,
          code: shopCode,
        },
      });
    }
  };
  const closeShop = async (shopCode: string, errorStatus: number) => {
    const isConfirmed = await swal.confirm(`确认要${errorStatus === 2 ? '开启' : '关闭'}店铺？`);
    if (!isConfirmed) return;
    await shopApi.luteosShopClose({
      shopCode,
      open: errorStatus === 2,
    });
    ElMessage.success('操作成功');
    refreshList();
  };

  const selectDialogRef = ref();
  const add = () => {
    const path = router.resolve({
      name: 'shopAdd',
    });
    router.push(path.href);
  };
  const toBI = () => {
    router.push('https://bi.luteos.com/#/site-view/Tn8CZdBKg2/jLcDGi1gPE');
  };
</script>

<style lang="scss">
  :deep(.el-table__expanded-cell) {
    padding: 0 !important;
  }

  .parent-row {
    --el-table-tr-bg-color: var(--bs-light);
  }
</style>
