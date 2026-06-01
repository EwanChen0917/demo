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
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="预测审核单号" class="w-375px" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.type" placeholder="渠道类型" clearable>
        <el-option label="电商渠道" :value="1" />
        <el-option label="零售渠道" :value="2" />
      </el-select>
      <el-date-picker
        unlink-panels
        v-model="time"
        type="daterange"
        range-separator="-"
        value-format="YYYY-MM-DD"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="
          (dateArr) => {
            search.startTime = dateArr ? dateArr[0] : '';
            search.endTime = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-select
        v-if="search.status === '0'"
        style="width: 140px"
        v-model="search.meReview"
        placeholder="审核节点"
      >
        <el-option label="待我审核节点" :value="true" />
        <el-option label="全部审核节点" :value="false" />
      </el-select>
      <el-tree-select
        ref="catTreeSelectRef"
        v-model="search.deptId"
        :data="deptTree"
        filterable
        clearable
        check-strictly
        style="width: 200px"
        placeholder="部门"
        popper-class="picker-cat-tree-select"
        highlight-current
      />
      <el-select style="width: 140px" v-model="search.creator" placeholder="创建人" filterable>
        <el-option
          v-for="item of creatorList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <el-table
      class="border-table"
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column prop="code" label="预测审核单号" />
      <el-table-column prop="typeDesc" label="渠道类型" />
      <el-table-column prop="creator" label="创建人" />
      <el-table-column prop="deptName" label="部门" />
      <el-table-column prop="statusDesc" label="状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column width="180px" prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="200px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                hide: ![2, 4].includes(row.status),
                row: row,
              },
              {
                label: '审核',
                key: 'audit',
                type: 'primary',
                text: true,
                hide: !row.button.showAuthButton,
                row: row,
              },
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '作废',
                key: 'cancel',
                type: 'primary',
                text: true,
                row: row,
                hide: ![0, 4].includes(row.status),
              },
              {
                label: '下载',
                key: 'download',
                type: 'primary',
                text: true,
                disabled: !row.downloadUrl,
                row: row,
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

<script lang="ts" setup name="salesForecastingAudit">
  import { ErpApi, erpApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  const time = ref<any[]>([]);
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '0', code: 'waitAudit', statusName: '待审核', count: '' },
    { status: '1', code: 'passAudit', statusName: '审核通过', count: '' },
    { status: '2', code: 'noPassAudit', statusName: '审核不通过', count: '' },
    // { status: '5', code: 'partPassAudit', statusName: '部分审核通过', count: '' },
    { status: '4', code: 'error', statusName: '异常', count: '' },
    { status: '3', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const statusColorMap = ref({
    0: 'yellow',
    1: 'green',
    2: 'red',
    3: 'gray',
    4: 'red',
    5: 'purple',
  });
  const router = useRouter();
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
    runQuery,
  } = useList<
    ErpApi.LuteosErpSaleForecastV2AuditQueryList.RequestQuery,
    ErpApi.LuteosErpSaleForecastV2AuditQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      startTime: '',
      endTime: '',
      status: '',
      creator: '',
      deptId: '',
      meReview: false,
      type: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSaleForecastV2AuditQueryList,
  });

  const reset = () => {
    time.value = [];
    Object.keys(search).forEach((key) => {
      if (key !== 'status' && key !== 'meReview') search[key] = undefined;
    });
    runQuery();
  };

  const handleTabChange = (val) => {
    search.meReview = val === '0';
  };

  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'salesForecastingAuditDetail',
        query: { code: row.code, type: row.type },
      });
      router.push(path.href);
    } else if (key === 'audit') {
      const path = router.resolve({
        name: 'salesForecastingAuditAction',
        query: { code: row.code, type: row.type },
      });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'salesForecastingAuditEdit',
        query: { code: row.code, type: row.type },
      });
      router.push(path.href);
    } else if (key === 'download') {
      urlDownload(row.downloadUrl);
    } else if (key === 'cancel') {
      cancelOrder(row);
    }
  };
  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getCreatorList();
  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();
  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    console.log('deptTree', deptTree.value);
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  const cancelOrder = async (row) => {
    const res = await swal.confirm(`确认作废?`);
    if (res) {
      await erpApi.luteosErpSaleForecastV2AuditAbandon({
        code: row.code,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
</script>

<style scoped lang="scss"></style>
