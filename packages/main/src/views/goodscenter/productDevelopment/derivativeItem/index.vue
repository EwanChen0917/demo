<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input style="width: 280px" v-model="search.standardSku" placeholder="基准SKU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select style="width: 140px" v-model="search.status" clearable placeholder="状态">
        <el-option label="取消" :value="1" />
        <el-option label="进行中" :value="2" />
        <el-option label="已完成" :value="3" />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.productLine"
        clearable
        filterable
        placeholder="品线"
      >
        <el-option
          v-for="item in dictionaries.productLineList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.priority"
        clearable
        filterable
        placeholder="优先级"
      >
        <el-option
          v-for="item in dictionaries.priorityList"
          :key="item.key"
          :label="item.key"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="search.creator"
        placeholder="申请人"
        :teleported="false"
        filterable
        clearable
        style="width: 140px"
      >
        <el-option
          v-for="item in creatorList"
          :label="item.name"
          :value="item.memberCode"
          :key="item.memberCode"
        />
      </el-select>
      <DeptMember
        class="form-item"
        v-model="search.gtmCode"
        placeholder="GTM负责人"
        deptCode="gtm"
        :searchChildDept="false"
      />
      <el-select
        v-model="search.pmCode"
        placeholder="项目经理"
        :teleported="false"
        filterable
        clearable
        style="width: 140px"
      >
        <el-option
          v-for="item in projectOwnerList"
          :label="item.name"
          :value="item.memberCode"
          :key="item.memberCode"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.applyReason"
        clearable
        filterable
        placeholder="申请原因"
      >
        <el-option
          v-for="item in dictionaries.applyReasonList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.changeField"
        clearable
        filterable
        placeholder="变更领域"
      >
        <el-option
          v-for="item in dictionaries.changeFieldList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
    </template>
    <template #buttons>
      <ExportBtn :service="productApi.luteosProductDeriveDownload" :params="search">导出</ExportBtn>
    </template>
    <vxe-table
      :column-config="{ resizable: true }"
      v-loading="listLoading"
      :data="listData?.productList"
      border="inner"
    >
      <vxe-column field="standardSku" title="基准SKU" min-width="300px">
        <template #default="scope">
          <OverflowTooltip :content="scope.row?.standardSku" />
        </template>
      </vxe-column>
      <vxe-column field="productLineDesc" title="品线" width="160px" />
      <vxe-column field="country" title="上市区域/国家" width="220px">
        <template #default="scope">
          <OverflowTooltip :content="scope.row?.country" />
        </template>
      </vxe-column>
      <vxe-column field="forecastNum" title="Forcast数量" min-width="200px">
        <template #default="scope">
          <OverflowTooltip :content="scope.row?.forecastNum" />
        </template>
      </vxe-column>
      <vxe-column field="firstNumDemand" title="首单数量需求" min-width="160px">
        <template #default="scope">
          <OverflowTooltip :content="scope.row?.firstNumDemand" />
        </template>
      </vxe-column>
      <vxe-column field="expectDeliveryTime" title="期望首单交付时间" width="180px" />
      <vxe-column field="statusDesc" title="状态" width="80px">
        <template #default="{ row }">
          <Tag :color="{ 1: 'gray', 2: 'blue', 3: 'green' }[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column field="priority" title="优先级" width="80px">
        <template #default="{ row }">
          <Tag :color="priorityMap[row.priority]">{{ row.priority }}</Tag>
        </template>
      </vxe-column>
      <vxe-column field="applyReason" title="申请原因" min-width="180px" />
      <vxe-column field="changeField" title="变更领域" width="180px" />
      <vxe-column field="projectBackground" title="项目背景描述" min-width="300px">
        <template #default="scope">
          <OverflowTooltip :content="scope.row?.projectBackground" />
        </template>
      </vxe-column>
      <vxe-column field="creatorName" title="申请人" min-width="100px" />
      <vxe-column field="gtmList" title="GTM负责人" min-width="150px">
        <template #default="scope">
          <OverflowTooltip :content="getMemberName(scope.row?.gtmList)" />
        </template>
      </vxe-column>
      <vxe-column field="pmList" title="项目经理" min-width="150px">
        <template #default="scope">
          <OverflowTooltip :content="getMemberName(scope.row?.pmList)" />
        </template>
      </vxe-column>
    </vxe-table>
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

<script lang="ts" setup name="derivativeItem">
import { ProductApi, productApi, pdtApi, memberApi } from '@/api';
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';

  const priorityMap = ref({
    P0: 'red',
    P1: 'yellow',
    P2: 'blue',
  });
  const router = useRouter();
  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };
  const dictionaries: any = ref({
    productLineList: [],
    applyReasonList: [],
    changeFieldList: [],
    priorityList: [],
  });
  const PAGE_SIZE = 10;
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ProductApi.LuteosProductDeriveQueryDeriveList.RequestQuery,
    ProductApi.LuteosProductDeriveQueryDeriveList.ResponseBody
  >({
    searchDefaults: {
      status: undefined,
      country: undefined,
      standardSku: undefined,
      productLine: undefined,
      applyReason: undefined,
      changeField: undefined,
      priority: undefined,
      gtmCode: undefined,
      pmCode: undefined,
      creator: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductDeriveQueryDeriveList,
  });
  const initDickbook = async () => {
    const res: any = await productApi.luteosProductDeriveQueryDeriveListParam();
    dictionaries.value = res;
  };
  const projectOwnerList = ref([]);
  const queryPdtProjectOwner = async () => {
    const res = await pdtApi.luteosPdtQueryOperatorList({
      operatorType: 2,
    });
    projectOwnerList.value = res.memberList;
  };
  const creatorList = ref<any[]>([]);
  const queryCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList || [];
  };
  const getMemberName = (list) => {
    if (!list || !list.length) {
      return '--';
    }
    return list?.map((item) => item.memberName).join('，');
  };
  onMounted(() => {
    initDickbook();
    queryPdtProjectOwner();
    queryCreatorList();
  });
</script>

<style scoped lang="scss">
  :deep(
      .vxe-table--render-default.border--default .vxe-table--header-wrapper,
      .vxe-table--render-default.border--full .vxe-table--header-wrapper,
      .vxe-table--render-default.border--outer .vxe-table--header-wrapper
    ) {
    background-color: #fff;
  }

  .line-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>
