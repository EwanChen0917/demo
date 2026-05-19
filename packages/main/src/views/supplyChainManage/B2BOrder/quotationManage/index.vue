<template>
  <el-tabs v-model="search.status" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statusStatistics[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 280px"
        v-model="search.keyword"
        placeholder="客户名称/客户编码/报价单"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        class="w-180"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        @change="handleTimeChange"
      />
      <el-select
        style="width: 120px"
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.memberList"
          :key="person.memberCode"
          :label="person.name"
          :value="person.memberCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增报价</el-button>
      <el-button class="button" type="primary" @click="importUpdateDialogRef?.open">
        上传报价
      </el-button>
      <ExportBtn :service="erpApi.luteosErpQuotationDownload" :params="search" :plain="false">
        导出
      </ExportBtn>
    </template>
    <vxe-table
      border="inner"
      max-height="900px"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="code" title="报价单" />
      <vxe-column field="customerCode" title="客户编码" />
      <vxe-column field="customerName" title="客户名称" />
      <vxe-column field="categoryQty" title="产品种类" />
      <vxe-column field="creatorName" title="创建人" />
      <vxe-column field="createTime" title="创建时间" width="180px" />
      <vxe-column field="shipper" title="状态">
        <template #default="{ row }">
          <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: ![4].includes(+row.status),
                row: row,
              },
              {
                label: '审核',
                key: 'audit',
                type: 'primary',
                text: true,
                hide: ![1].includes(+row.status) || !row.button?.showAuthButton,
                row: row,
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                hide: ![1, 4].includes(+row.status),
                row: row,
              },
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                text: true,
                row: row,
                hide: ![3].includes(+row.status),
              },
            ]"
            @click="handleActions"
          />
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
  <ImportUpdateDialog
    title="上传报价"
    notice="请注意标黄必填字段，未填写必填字段将上传失败"
    :downloadParams="search"
    type="quotation"
    ref="importUpdateDialogRef"
  />
</template>

<script lang="ts" setup name="quotationManage">
  import { erpApi, ErpApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';
  import ImportUpdateDialog from '@/views/supplyChainManage/B2BOrder/B2BCustomer/components/importUpdateDialog.vue';

  const time = ref();
  const handleTimeChange = (val) => {
    if (val) {
      search.createTimeStart = val[0] || '';
      search.createTimeEnd = val[1] || '';
    } else {
      search.createTimeStart = undefined;
      search.createTimeEnd = undefined;
    }
  };
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '1', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '2', code: 'authPass', statusName: '已通过', count: '' },
    { status: '4', code: 'error', statusName: '异常', count: '' },
    { status: '3', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const importUpdateDialogRef = ref();
  const store = useStore();
  const colorMap = {
    0: 'yellow',
    1: 'blue',
    2: 'green',
    3: 'gray',
    4: 'red',
  };
  const router = useRouter();
  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };

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
    ErpApi.LuteosErpQuotationQueryList.RequestBody,
    ErpApi.LuteosErpQuotationQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: code,
      creator: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      status: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpQuotationQueryList,
  });
  const dickbook: any = ref({
    memberList: [],
  });
  const initDickbook = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['all_dept'],
    });
    dickbook.value.memberList = res.all_dept;
  };
  const add = () => {
    const path = router.resolve({
      name: 'quotationManageAdd',
    });
    router.push(path.href);
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'quotationManageDetail',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'quotationManageEdit',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'audit') {
      const path = router.resolve({
        name: 'quotationManageAudit',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancel(row, '作废');
    } else if (key === 'copy') {
      const path = router.resolve({
        name: 'quotationManageAdd',
        query: { code: row.code },
      });
      router.push(path.href);
    }
  };
  const cancel = async (row, title: string) => {
    const res = await swal.confirm({
      title: `确认${title}？`,
    });
    if (res) {
      await erpApi.luteosErpQuotationAbandon({
        code: row.code,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss"></style>
