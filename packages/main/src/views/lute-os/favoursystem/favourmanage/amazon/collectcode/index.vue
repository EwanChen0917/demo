<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="请输入红人/折扣码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!-- TODO: 亚马逊折扣码查询添加合作商品，折扣码创建时间折、扣码时效时间 -->
      <DeptMember v-model="search.operator" placeholder="运营人员" />
      <el-select
        v-model="search.spuCode"
        placeholder="请选择合作产品"
        clearable
        filterable
        :remote-method="productRemoteMethod"
        :remote="true"
      >
        <el-option
          v-for="item in productList"
          :key="item.productCode"
          :label="item.productFormatName"
          :value="item.productCode"
        />
      </el-select>
      <el-date-picker
        v-model="search.codeCreateTime"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="折扣码创建时间"
        format="YYYY-MM-DD"
      />
      <el-date-picker
        v-model="search.codeDisableTime"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="折扣码失效时间"
        format="YYYY-MM-DD"
      />
      <el-select
        style="width: 120px"
        v-model="search.channelCode"
        clearable
        filterable
        placeholder="渠道"
      >
        <el-option
          v-for="item in channelList"
          :key="item.channelCode"
          :label="item.name"
          :value="item.channelCode"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.lineCode"
        clearable
        filterable
        placeholder="品线"
      >
        <el-option
          v-for="item in lineCodeList"
          :key="item.lineCode"
          :label="item.lineName"
          :value="item.lineCode"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.markStatus"
        clearable
        filterable
        placeholder="折扣码状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.creatorCode"
        clearable
        filterable
        placeholder="推广人"
      >
        <el-option
          v-for="item in creatorList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button :loading="exportLoading" class="button" type="primary" @click="exportFn">
        导出
      </el-button>
    </template>

    <Table :listData="listData?.metaMarkList" :listLoading="listLoading" @refresh="runQuery" />

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

<script setup lang="ts" name="amazoncollectcode">
    import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { metaApi, MetaApi, memberApi, dataApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import useExport from '@/hooks/list/useExport';
  import Table from './components/table.vue';

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
  } = useList<
    MetaApi.LuteosMetaQueryMetaMarkList.RequestQuery,
    MetaApi.LuteosMetaQueryMetaMarkList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      spuCode: undefined,
      codeCreateTime: undefined,
      codeDisableTime: undefined,
      channelCode: undefined,
      lineCode: undefined,
      markStatus: undefined,
      creatorCode: undefined,
      platformCode: 'amazon',
      operator: undefined,
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryMetaMarkList,
  });

  const statusList = ref([
    { label: '待生效', value: 1 },
    { label: '生效中', value: 2 },
    { label: '已到期', value: 3 },
    { label: '已取消', value: 4 },
  ]);

  const channelList = ref([]);
  const queryChannelList = () => {
    metaApi.luteosMetaQueryChannelList({ pageNum: 1, pageSize: 500 }).then((res: any) => {
      channelList.value = res.channelList || [];
    });
  };
  queryChannelList();
  const productList = ref<any>([]);
  const productRemoteMethod = (val: string) => {
    dataApi.luteosDataQueryProductList({ pageNum: 1, pageSize: 100, keyword: val }).then((res) => {
      const list = res.productInfoList || [];
      formatProductList(list);
    });
  };
  const formatProductList = (list) => {
    productList.value = [];
    list.forEach((item: any) => {
      // 兼容列表数据没有productType的情况
      if (!item.productType || item.productType === 1) {
        const data: any = {
          productFormatName: `${item.productName}，${item.productCode}`,
          productName: item.productName,
          productCode: item.productCode,
          productType: 1,
        };
        productList.value.push(data);
        // cacheProductList.value.push(data);
      }
    });
  };
  productRemoteMethod();
  const lineCodeList = ref([]);
  const queryProductLineList = () => {
    metaApi.luteosMetaQueryProductLineList({ pageNum: 1, pageSize: 500 }).then((res: any) => {
      lineCodeList.value = res.productLineList || [];
    });
  };

  queryProductLineList();

  const creatorList = ref([]);

  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'red_promoter' })
      .then((res: any) => {
        creatorList.value = res.memberList || [];
      });
  };
  queryDeptMemberOption();

  // Export
  const { handleExport, exportLoading } = useExport(metaApi.luteosMetaExportAmazonMetaMarkList);

  function exportFn() {
    handleExport(search);
  }
</script>

<style lang="scss" scoped>
  .wid_240 {
    width: 240px;
    flex: 0 0 240px;
  }
</style>
