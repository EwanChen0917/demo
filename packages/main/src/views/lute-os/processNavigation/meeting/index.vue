<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.summary" placeholder="会议主题">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="effectiveTime"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        type="datetimerange"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (dateArr) => {
            search.startTime = dateArr ? dateArr[0] : undefined;
            search.endTime = dateArr ? dateArr[1] : undefined;
          }
        "
      />
      <el-select
        v-model="bookerList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="预订人"
        style="width: 180px"
        @change="
          (val) => {
            search.bookerList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in memberList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
      <el-tree-select
        :v-loading="loading"
        clearable
        node-key="deptId"
        show-checkbox
        multiple
        collapse-tags
        collapse-tags-tooltip
        v-model="departIdList"
        :data="treeData"
        :render-after-expand="false"
        placeholder="所属部门"
        style="width: 180px"
        @change="
          () => {
            search.departIdList = departIdList.join(',');
          }
        "
      />
      <el-select
        v-model="participantList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="参会人"
        style="width: 180px"
        @change="
          (val) => {
            search.participantList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in memberList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <ExportBtn :ignore-app-code="true" :service="evaluateApi.luteosEvaluateDownload" :params="exportParams">
        导出
      </ExportBtn>
    </template>
    <el-table :data="listData?.fileCenterBeanList" v-loading="listLoading">
      <el-table-column label="会议主题" prop="summary" min-width="200" />
      <el-table-column label="会议日期" prop="startDate" />
      <el-table-column label="会议开始时间" prop="startDatetime">
        <template #default="{ row }">
          {{ getHms(row.startDatetime) }}
        </template>
      </el-table-column>
      <el-table-column label="会议结束时间" prop="endDatetime">
        <template #default="{ row }">
          {{ getHms(row.endDatetime) }}
        </template>
      </el-table-column>
      <el-table-column label="预定人" prop="organizerDisplayName" />
      <el-table-column label="预订人部门" prop="deptName" />
      <el-table-column label="参会人" prop="calendarList">
        <template #default="{ row }">
          <ElTooltip
            popper-class="action_tool_tip"
            placement="top"
            effect="light"
            :content="row.calendarList"
          >
            <div class="calendar-list">
              {{ row.calendarList }}
            </div>
          </ElTooltip>
        </template>
      </el-table-column>
      <el-table-column label="会议时长（分）" prop="meetingDuration" align="center" />
      <el-table-column label="操作" prop="">
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
                permissionCode: 'meetingdetail',
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

<script setup lang="ts" name="meeting">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { memberApi, evaluateApi, EvaluateApi } from '@/api';

  const router = useRouter();

  function formatDateTime(dateObj) {
    const yyyy = dateObj.getFullYear();
    const MM = `00${dateObj.getMonth() + 1}`.slice(-2); // 月份是从0开始的，所以要加1
    const dd = `00${dateObj.getDate()}`.slice(-2);
    const HH = `00${dateObj.getHours()}`.slice(-2);
    const mm = `00${dateObj.getMinutes()}`.slice(-2);
    const ss = `00${dateObj.getSeconds()}`.slice(-2);
    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
  }

  const endTime = new Date(); // 定义结束时间为今天
  const startTime = new Date();
  startTime.setDate(endTime.getDate() - 15);

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
    resetSearch,
    runQuery,
  } = useList<
    EvaluateApi.LuteosEvaluateQueryEvaluateList.RequestBody,
    EvaluateApi.LuteosEvaluateQueryEvaluateList.ResponseBody
  >({
    searchDefaults: {
      summary: undefined,
      bookerList: undefined,
      participantList: undefined,
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
      departIdList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: evaluateApi.luteosEvaluateQueryEvaluateList,
  });

  const bookerList = ref([]);
  const participantList = ref([]);
  const departIdList = ref([]);
  const effectiveTime = ref([formatDateTime(startTime), formatDateTime(endTime)]);

  const exportParams = computed(() => {
    return {
      summary: search.summary,
      bookerList: bookerList.value.length ? bookerList.value : undefined,
      participantList: participantList.value.length ? participantList.value : undefined,
      departIdList: departIdList.value.length ? departIdList.value : undefined,
      startTime: search.startTime,
      endTime: search.endTime,
    };
  });

  const treeData = ref();
  const querySubDeptList = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    const data = res.deptInfoList;
    deepTree(res.deptInfoList);
    treeData.value = data;
  };
  querySubDeptList();
  const deepTree = (data) => {
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.deptName;
      item.value = item.deptId;
    });
  };

  const reset = () => {
    resetSearch();
    bookerList.value = [];
    participantList.value = [];
    departIdList.value = [];
    effectiveTime.value = [formatDateTime(startTime), formatDateTime(endTime)];
    search.startTime = formatDateTime(startTime);
    search.endTime = formatDateTime(endTime);
  };

  const memberList = ref([]);
  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'all_dept' })
      .then((res: any) => {
        memberList.value = res.memberList || [];
      });
  };
  queryDeptMemberOption();

  const getHms = (time) => {
    const date = new Date(time);

    // 使用 getHours, getMinutes 和 getSeconds 方法获取时分秒
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // 创建一个函数来在数值小于10时在前面添加"0"
    function formatTime(i) {
      if (i < 10) {
        i = `0${i}`;
      }
      return i;
    }

    // 使用formatTime函数对时分秒进行格式化
    hours = formatTime(hours);
    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    // 将时分秒组合成一个字符串
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'view':
        router.push(`/meeting/detail?id=${row.calendarId}`);
        break;
      default:
        break;
    }
  };
</script>

<style scoped lang="scss">
  .calendar-list {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px !important;
  }
</style>
