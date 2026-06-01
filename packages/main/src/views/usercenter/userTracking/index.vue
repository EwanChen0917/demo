<template>
  <KeenList
    @refresh="searchData"
    @reset-search="reset"
    @reset-search-by-key="(key) => (searchParams[key] = undefined)"
  >
    <template #search>
      <!-- <el-input v-model="search.keyWord" placeholder="产品SKU名称/产品SKU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input> -->
    </template>
    <template #filters>
      <el-select
        v-model="department"
        placeholder="一级部门"
        filterable
        @change="getDepartMentAllMembers"
      >
        <el-option
          v-for="item in departmentList"
          :key="item.deptId"
          :label="item.deptName"
          :value="item.deptId"
        />
      </el-select>
      <el-select v-model="searchParams.operator" filterable placeholder="操作人" @change="search">
        <el-option
          v-for="item in operatorList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
      <el-select
        v-model="searchParams.platform"
        placeholder="操作系统"
        filterable
        clearable
        @change="searchData"
      >
        <el-option label="路特创新RPE系统" value="rpe" />
        <el-option label="钉钉" value="dingTalk" />
        <el-option label="钉钉管理后台" value="dingTalkAdmin" />
      </el-select>
      <el-date-picker
        :clearable="false"
        unlink-panels
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD"
        :shortcuts="shortcuts"
        @change="
          (dateArr) => {
            searchParams.startTime = dateArr ? dateArr[0] : '';
            searchParams.endTime = dateArr ? dateArr[1] : '';
            searchData();
          }
        "
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="searchData">查询</el-button>
      <!-- <ExportBtn
        :disabled="!(department && searchParams.operator && tableList.length)"
        :service="platformApi.platformExportPlatformLogList"
        :params="{ ...searchParams }"
      >
        导出
      </ExportBtn> -->
    </template>
    <div>
      <template v-if="department && searchParams.operator && tableList.length">
        <vxe-table ref="tableRef" border="inner" v-loading="tableLoading" :data="tableList">
          <vxe-table-column field="operatorName" title="操作人" width="160px" />
          <vxe-table-column field="operateTime" title="操作时间" width="180px" />
          <vxe-table-column field="platformDesc" title="操作系统" width="140px" />
          <vxe-table-column field="moduleDesc" title="模块" width="140px" />
          <vxe-table-column field="content" title="详情" :min-width="300" />
        </vxe-table>
        <KeenPagination
          :current="pagination.pageNum"
          :page-size="pagination.pageSize"
          :page-size-option="pagination.pageSizes"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
      <el-empty v-else description="请先选择一级部门和对应操作人" />
    </div>
  </KeenList>
</template>

<script lang="ts" setup name="userTracking">
  import useTable from '@/hooks/list/useTable';
  import { platformApi, memberApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  import dayjs from 'dayjs';

  const time = ref<any>([dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
  const department = ref('');
  const operatorList = ref<any[]>();
  const departmentList = ref<any[]>();
  const shortcuts = [
    {
      text: '当天',
      value: () => {
        const end = new Date();
        return [end, end];
      },
    },
    {
      text: '昨天',
      value: () => {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
        return [start, start];
      },
    },
    {
      text: '最近7天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
        return [start, end];
      },
    },
    {
      text: '最近30天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
        return [start, end];
      },
    },
    {
      text: '最近3个月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
        return [start, end];
      },
    },
  ];
  const tableList = ref<any[]>([]);
  const getDataList = async () => {
    const params = {
      ...searchParams.value,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    };
    tableLoading.value = true;
    const res: any = await platformApi
      .platformQueryPlatformLogList(params)
      .catch(() => {
        tableList.value = [];
        pagination.total = 0;
      })
      .finally(() => {
        tableLoading.value = false;
      });
    if (res && +res.code === 200) {
      tableList.value = res.logList;
      pagination.total = res.total;
    } else {
      tableList.value = [];
      pagination.total = 0;
    }
  };
  const {
    searchParams,
    tableLoading,
    tableTotal,
    pagination,
    search,
    resetParams,
    handleSizeChange,
    handleCurrentChange,
  } = useTable(
    getDataList,
    {
      operator: undefined,
      startTime: time.value[0],
      endTime: time.value[1],
    },
    10
  );
  const getDepartmentList = async () => {
    const res = await platformApi.platformQueryCommonDept({
      deptId: 1,
      type: 2,
    });
    departmentList.value = res.deptAllList;
  };
  getDepartmentList();
  const getDepartMentAllMembers = async () => {
    searchParams.value.operator = undefined;
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      deptId: department.value,
    });
    operatorList.value = res.memberList;
  };
  const searchData = () => {
    if (searchParams.value.operator) {
      search();
    } else {
      ElMessage.warning('请先选择一级部门和对应操作人');
    }
  };
  const reset = () => {
    time.value = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    department.value = '';
    searchData();
  };
</script>
