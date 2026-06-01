<template>
  <el-tabs v-model="search.statusVal" tab-position="top" @tab-change="handleTabChange(item)">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.code"
      :label="item.statusName"
      :name="item.code"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="searchType" style="width: 100px" @change="handleSearchTypeChange">
        <el-option
          v-for="(item, key) in searchTypeMap"
          :value="key"
          :label="item.label"
          :key="key"
        />
      </el-select>
      <el-input
        v-model="search[searchTypeMap[searchType].key]"
        :placeholder="searchTypeMap[searchType]?.placeholder"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductShopSelect v-model="search.shopAccountName" placeholder="店铺名称" clearable />
      <CountrySelect v-model="search.countryCodeName" placeholder="国家" clearable />

      <el-date-picker
        v-model="search.createTime"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
      />
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        @click="router.push('/removeOrder/add')"
        v-permission="'removeOrderAdd'"
      >
        新增
      </el-button>
      <ExportBtn :service="erpApi.luteosErpRemovalExport" :params="exportParams">导出</ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column prop="orderId" label="移仓单号" />
      <el-table-column prop="shopAccount" label="店铺" min-width="130px">
        <template #default="{ row }">
          {{ row.shopAccount }}
          <p class="red" v-if="row.errorMessage">异常信息：{{ row.errorMessage }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="countryName" label="国家" />
      <el-table-column prop="shipmentDate" label="发货日期" />
      <el-table-column prop="shipWarehouseName" label="发货仓库" />
      <el-table-column prop="receiveWarehouseName" label="收货仓库" />
      <el-table-column prop="address1" label="收货地址" />
      <el-table-column prop="creator" label="创建人" />
      <el-table-column prop="createTime" label="创建日期" />
      <el-table-column width="140px" label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: 'removeOrderEdit',
                hide: !['Draft', 'PushFailed', 'AuditApproved', 'PendingAudit'].some(
                  (val) => val === row.status
                ),
                row,
              },
              {
                label: '提交审批',
                key: 'submit',
                type: 'primary',
                permissionCode: 'submitApproval',
                hide: !['Draft', 'PendingAudit'].some((val) => val === row.status),
                row,
              },
              {
                label: '生成FBA移除订单',
                key: 'generateFBA',
                type: 'primary',
                permissionCode: 'removeFBAorder',
                hide: !['PushFailed', 'AuditApproved'].some((val) => val === row.status),
                row,
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                row,
              },
              {
                label: '作废',
                key: 'abandon',
                type: 'primary',
                permissionCode: 'cancelOrder',
                hide: ['Completed', 'Cancelled'].some((val) => val === row.status),
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
</template>

<script lang="ts" setup name="removeOrder">
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, dataApi } from '@/api';
  import { omit } from 'lodash-es';
  import { ElMessage, ElMessageBox, ElTable as ElTableType } from 'element-plus';

  const tabStatusList = [
    { code: 'total', statusName: '全部', count: '' },
    // { code: 'draft', statusName: '草稿', count: '' },
    { code: 'pendingAudit', statusName: '待提交审核', count: '' },
    { code: 'auditing', statusName: '审核中', count: '' },
    { code: 'auditApproved', statusName: '审核完成', count: '' },
    { code: 'pushing', statusName: '推送中', count: '' },
    { code: 'pending', statusName: '推送完成', count: '' },
    { code: 'completed', statusName: '已完成', count: '' },
    { code: 'cancelled', statusName: '已作废', count: '' },
    { code: 'pushFailed', statusName: '异常', count: '' },
  ];

  const searchType = ref('0');

  const searchTypeMap = {
    0: {
      key: 'orderId',
      label: '移仓单号',
      placeholder: '移仓单号',
    },
    1: {
      key: 'receiveWarehouseCode',
      label: '仓库代码',
      placeholder: '仓库代码',
    },
  };

  const router = useRouter();
  const route = useRoute();
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();

  const {
    search,
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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpRemovalQueryList.RequestQuery,
    ErpApi.LuteosErpRemovalQueryList.ResponseBody
  >({
    searchDefaults: {
      createTime: undefined,
      createTimeEnd: undefined,
      createTimeStart: undefined,
      orderId: undefined,
      countryCode: undefined,
      countryCodeName: undefined,
      shopAccount: [],
      shopAccountName: undefined,
      status: undefined,
      statusVal: 'total',
    },
    interceptSearchData: (searchData) => {
      const { createTime, shopAccountName, countryCodeName, statusVal } = searchData;
      return {
        ...omit(searchData, 'createTime', 'shopAccountName', 'statusVal'),
        createTimeStart: createTime ? `${createTime[0]} 00:00:00` : undefined,
        createTimeEnd: createTime ? `${createTime[1]} 23:59:59` : undefined,
        shopAccount: shopAccountName ? [shopAccountName] : undefined,
        countryCode: countryCodeName ? [countryCodeName] : undefined,
        status: statusVal === 'total' ? undefined : statusVal,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpRemovalQueryList,
    serviceManual: true,
  });

  const exportParams = computed(() => {
    return {
      ...omit(search, 'createTime', 'shopAccountName', 'statusVal'),
      createTimeStart: search?.createTime ? `${search?.createTime[0]} 00:00:00` : undefined,
      createTimeEnd: search?.createTime ? `${search?.createTime[1]} 23:59:59` : undefined,
      shopAccount: search?.shopAccountName ? [search?.shopAccountName] : undefined,
      countryCode: search?.countryCodeName ? [search?.countryCodeName] : undefined,
      status: search?.statusVal === 'total' ? undefined : search?.statusVal,
    };
  });
  //   tab切换
  const handleTabChange = (label) => {
    // if (search.status === label.code) {
    //   return;
    // }
    // runQuery();
  };

  const getQueryParam = () => {};

  const codeType = ref(0);
  const logRef = ref();
  const submitRepeat = ref(false);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'detail':
        router.push(`/removeOrder/detail?orderId=${row.orderId}&look=1`);
        break;
      case 'edit':
        if (row.status == 'AuditApproved') {
          // 审核完成后的编辑只能编辑地址信息
          router.push(`/removeOrder/edit?orderId=${row.orderId}&edit=1`);
        } else {
          router.push({
            path: '/removeOrder/edit',
            query: {
              orderId: row.orderId,
            },
          });
        }
        break;
      case 'submit':
        router.push(`/removeOrder/detail?orderId=${row.orderId}&look=0`);
        break;
      case 'generateFBA':
        await ElMessageBox.confirm('确认生成FBA移除订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        if (submitRepeat.value) {
          return;
        }
        submitRepeat.value = true;
        setTimeout(() => {
          submitRepeat.value = false;
        }, 2000);
        await erpApi.luteosErpRemovalPush({ orderIdList: [row?.orderId] });
        ElMessage.success('已推送亚马逊，稍后查看结果');
        runQuery();
        break;
      case 'abandon':
        try {
          await ElMessageBox.confirm('确认作废该移仓单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          });
          await erpApi.luteosErpRemovalAbandon({
            orderIdList: [row.orderId],
          });
          ElMessage.success('作废成功');
          runQuery();
        } catch (error) {
          if (error !== 'cancel') {
            console.error(error);
          }
        }
        break;

      default:
        break;
    }
    // logRef.value?.open(row?.skuList);
  };

  const handleTimeChange = (val) => {
    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;

    search.createTimeStart = val[0] || '';
    search.createTimeEnd = val[1] || '';
  };

  const handleSearchTypeChange = () => {
    for (const index in searchTypeMap) {
      if (index !== searchType.value) {
        search[searchTypeMap[index].key] = undefined;
      }
    }
  };
  // 监听 query 变化,新增，编辑自动刷新列表
  watch(
    () => route.query,
    (newQuery) => {
      if (newQuery && newQuery?.refresh === '1') {
        console.log(222);
        runQuery();
        router.replace({ path: route.path, query: {} });
        setTimeout(() => {
          const scrollElem = document.querySelector('.el-main');
          if (scrollElem) {
            scrollElem.scrollTo({ top: 0, behavior: 'smooth' });
          }
          // 获取表格滚动容器
          const scrollWrapper = tableRef.value?.$el?.querySelector(
            '.table-coll .el-scrollbar__wrap'
          );
          if (scrollWrapper) {
            // 滚动到表格顶部
            scrollWrapper.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        }, 500);
      }
    }
  );
  onMounted(() => {
    runQuery();
  });
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

  .red {
    color: #f1416c;
    margin-top: 4px;
  }
  .align-items-center {
    background-color: #fff;
  }
</style>
