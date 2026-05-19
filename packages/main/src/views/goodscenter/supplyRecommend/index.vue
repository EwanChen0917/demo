<template>
  <OrderTabs
    v-model="search.status"
    :tab-status-list="tabStatusList"
    :count-map="listData?.statusStatistics"
    @tab-change="handleTabChange"
  />
  <KeenList
    :selected-num="codeList?.length"
    :params="search"
    :export-service="erpApi.luteosErpOrderOrderDownload"
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    @clear-all="() => {}"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="请输入推荐公司编号/推荐人/公司注册名称"
        clearable
        class="w-300px"
      />
    </template>
    <template #filters>
      <div class="date-picker-prepend" ref="timeTypeRef">
        <el-select
          v-model="timeType"
          style="width: 125px"
          @change="() => (search.timeRange = undefined)"
        >
          <el-option :value="0" label="创建时间" />
          <el-option :value="1" label="提交审核时间" />
        </el-select>
        <el-date-picker
          v-model="search.timeRange"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </div>
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleRecommendClick">推荐供应商</el-button>
      <ExportBtn
        :service="erpApi.luteosErpInviteSupplierExport"
        :params="{
          ...omit(search, 'timeRange'),
          startTime: search.timeRange ? `${search.timeRange[0]} 00:00:00` : undefined,
          endTime: search.timeRange ? `${search.timeRange[1]} 23:59:59` : undefined,
          selectInviteList: codeList,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.result"
      @selection-change="handleSelectionChange"
      key="inviteCode"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="inviteCode" label="code" min-width="180" />
      <el-table-column prop="supplierCode" label="推荐公司编号" width="140" />
      <el-table-column prop="companyName" label="公司注册名称" width="180" show-overflow-tooltip />
      <el-table-column prop="businessModel" label="经营模式" width="100" />
      <el-table-column prop="establishmentDate" label="成立时间" width="110">
        <template #default="{ row }">
          <span v-if="row.establishmentDate">
            {{ row.establishmentDate.replace(' 00:00:00', '') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="registeredCapital" label="注册资本（万）" width="120" align="right" />
      <el-table-column prop="isListed" label="是否上市" width="90">
        <template #default="{ row }">
          <span>{{ row.isListed ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="审核状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusColorMap[row?.auditStatus]">
            {{ row.auditStatusDesc }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="enterpriseNature" label="企业性质" width="100" />
      <el-table-column prop="website" label="供应商网址" width="160" show-overflow-tooltip />
      <el-table-column
        prop="registeredAddress"
        label="公司注册地址"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="headquartersAddress"
        label="总部地址"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column prop="productionMethod" label="生产方式" width="100">
        <template #default="{ row }">
          {{ productionMethodList[row.productionMethod] }}
        </template>
      </el-table-column>
      <el-table-column prop="recommender" label="推荐人" width="100" />
      <el-table-column
        prop="recommenderCompany"
        label="推荐供应商名称"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column prop="recommenderEmail" label="邮箱" width="180" show-overflow-tooltip />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column prop="submitAuditTime" label="提交审核时间" width="160" />
      <el-table-column prop="updateTime" label="修改时间" width="160" />
      <el-table-column prop="updater" label="修改人" width="100" />
      <el-table-column prop="auditRemark" label="审核备注" width="200" show-overflow-tooltip />
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="{ row, $index }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                row: row,
                index: $index,
              },
              {
                label: '编辑',
                key: 'edit',
                row: row,
                disabled: row.auditStatus == 'REGISTERED' || row.auditStatus == 'APPROVED',
                index: $index,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                row: row,
                disabled: row.auditStatus == 'REGISTERED' || row.auditStatus == 'APPROVED',
                index: $index,
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
    <!-- 推荐供应商 -->
    <Invitation ref="invitationRef" @success="refreshList" />
  </KeenList>
</template>

<script setup lang="ts" name="supplyRecommend">
  import { erpApi, ErpApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import * as swal from '@/utils/swal';
  import Invitation from '@/views/goodscenter/supplyRecommend/components/invitation.vue';
  import { omit } from 'lodash-es';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 'INVITED', code: 'waitInvite', statusName: '待注册', count: '' },
    { status: 'REGISTERED', code: 'waitRegistered', statusName: '待审核', count: '' },
    { status: 'APPROVED', code: 'approved', statusName: '审核成功', count: '' },
    { status: 'REJECTED', code: 'rejected', statusName: '审核拒绝', count: '' },
  ];
  const productionMethodList = ['自制', '代工', '不生产'];
  const statusColorMap = {
    INVITED: 'info',
    REGISTERED: 'warning',
    APPROVED: 'success',
    REJECTED: 'error',
  };
  const router = useRouter();

  const timeType = ref(0);
  const timeTypeRef = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref();
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
    ErpApi.LuteosErpInviteSupplierQueryList.RequestBody,
    ErpApi.LuteosErpInviteSupplierQueryList.ResponseBody
  >({
    searchDefaults: {
      endTime: undefined,
      timeRange: undefined,
      keyword: undefined,
      startTime: undefined,
      status: undefined,
      timeType: timeType.value,
    },
    interceptSearchData: (searchData) => {
      const { timeRange } = searchData;
      return {
        ...omit(searchData, 'timeRange'),
        startTime: timeRange ? `${timeRange[0]} 00:00:00` : undefined,
        endTime: timeRange ? `${timeRange[1]} 23:59:59` : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpInviteSupplierQueryList,
    onSuccess: (res) => {},
  });

  const handleTabChange = (val) => {
    search.status = val;
  };

  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((res) => {
      return res.inviteCode;
    });
  };
  const handleRecommendClick = () => {
    invitationRef.value.open();
  };
  const resetSearchData = () => {
    search.keyword = '';
    timeType.value = 0;
    resetSearch();
  };
  const invitationRef = ref();
  const handleActions = async (action) => {
    const { key, row, index } = action;
    switch (key) {
      case 'delete':
        const isConfirmed = await swal.confirm('确定要删除吗？');
        if (!isConfirmed) return;
        try {
          await erpApi.luteosErpInviteSupplierDelete({
            inviteCode: row.inviteCode,
          });
          ElMessage.success('删除成功');
          runQuery();
        } catch (error) {}
        break;
      case 'detail':
        router.push({
          name: 'supplyRecommendDetail',
          query: {
            code: row?.inviteCode,
          },
        });
        break;
      case 'edit':
        router.push({
          name: 'supplyRecommendEdit',
          query: {
            code: row?.inviteCode,
          },
        });

        break;
      default:
        break;
    }
  };
</script>
