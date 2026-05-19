<template>
  <el-dialog title="跟卖店铺" v-model="visible" width="550" @close="visible = false">
    <!-- <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    > -->
    <!-- <el-table ref="tableRef" v-loading="listLoading" :data="listData?.logList" max-height="60vh">
      <el-table-column prop="operationTypeDesc" label="店铺链接" />
      <el-table-column prop="operationTime" label="店铺名称">
        <template #default="{ row }">
          <div class="fs-7">
            <a class="link" @click="toPath(row.asinUrl)">
              {{ row?.operationTime }}
            </a>
          </div>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- <el-table ref="tableRef" v-loading="listLoading" :data="listData?.logList" max-height="60vh">
      <el-table-column prop="operationTypeDesc" label="店铺链接" />
      <el-table-column prop="operationTime" label="店铺名称">
        <template #default="{ row }">
          <div class="fs-7">
            <a class="link" @click="toPath(row.asinUrl)">
              {{ row?.operationTime }}
            </a>
          </div>
        </template>
      </el-table-column>
    </el-table> -->
    <div class="title">近7天跟卖店铺</div>
    <div v-if="shopArr?.length > 0">
      <div class="d-flex shopItem" v-for="(item, index) in shopArr" :key="index">
        <span class="left">店铺链接:</span>
        <a class="link" @click="toPath(item.url)">{{ item.shop }}</a>
      </div>
    </div>
    <div v-else class="notext">暂无</div>
    <div class="title">历史跟卖店铺</div>
    <div v-if="historicalHijackList?.length > 0">
      <div class="d-flex shopItem" v-for="(item, index) in historicalHijackList" :key="index">
        <span class="left">店铺链接:</span>
        <a class="link" @click="toPath(item.url)">{{ item.shop }}</a>
      </div>
    </div>
    <div v-else class="notext">暂无</div>
    <!-- <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <!-- </KeenList> -->
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { PlatformApi, platformApi } from '@/api';
  import { openWindow } from '@/utils';

  const PAGE_SIZE = 100;
  const toPath = (url) => {
    if (url.includes('http')) {
      openWindow(url);
    } else {
      ElMessage.warning('该链接无法跳转');
    }
  };

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
  } = useList<PlatformApi.PlatformQueryLog.RequestQuery, PlatformApi.PlatformQueryLog.ResponseBody>(
    {
      searchDefaults: {
        moduleType: 'erp',
        itemType: undefined,
        itemCode: undefined,
        transferKfOperator: true,
      },
      // eslint-disable-next-line no-shadow
      // interceptSearchData: (searchData) => searchData,
      pageSize: PAGE_SIZE,
      service: platformApi.platformQueryLog,
      serviceManual: false,
    }
  );

  const visible = ref(false);

  const getData = async (row) => {
    const res = await productApi.luteosProductMonitorQueryChartData({
      id: row?.id,
      type: 2,
    });
    // console.log(res);
    shopArr.value = res.recentHijackList;
    historicalHijackList.value = res.historicalHijackList;
  };

  const open = (row) => {
    // console.log(row, JSON.parse(row.hijackShop));
    // shopArr.value = JSON.parse(row.hijackShop);
    visible.value = true;
    getData(row);
    // refreshList();
  };
  const shopArr = ref();
  const historicalHijackList = ref();

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .shopItem {
    height: 32px;
    line-height: 32px;
    .left {
      width: 130px;
    }
  }
  .title {
    margin-bottom: 10px;
  }
  .notext {
    margin-bottom: 10px;
    color: #8492a6;
  }
</style>
