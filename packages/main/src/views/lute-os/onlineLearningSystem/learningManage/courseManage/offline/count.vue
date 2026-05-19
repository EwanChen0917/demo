<template>
  <div class="page-title">
    <span>
      {{ decodeURIComponent(route.query.courseName as string) }}
    </span>
    <div class="member-count">
      <span style="margin-right: 16px">学员人数：{{ listData?.memberNum?.joinNum }}</span>
      <span>签到人数：{{ listData?.memberNum?.signInNum }}</span>
    </div>
  </div>
  <el-tabs v-model="search.status" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <!-- <span class="tab-count">({{ listData?.memberCourseProgress[item.code] }})</span> -->
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="请输入用户名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <!-- <DeptMember deptCode="all_dept" v-model="search.memberCode" placeholder="请选择用户" /> -->
    </template>
    <template #filters>
      <el-select style="width: 120px" v-model="search.type" placeholder="加入方式" clearable>
        <el-option label="指派" value="1" />
        <el-option label="公开报名" value="3" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">搜索</el-button>
      <ExportBtn :ignore-app-code="true"
        :plain="false"
        :service="studyApi.luteosStudyExportCourseCalculateOffLine"
        :params="search"
      >
        导出统计
      </ExportBtn>
      <el-button class="button" type="primary" @click="ding('')" v-if="route.query.status === '1'">
        DING未完成学员
      </el-button>
    </template>
    <vxe-table border="inner" :data="listData?.infoList" v-loading="listLoading">
      <vxe-column field="memberName" title="用户名" min-width="100" />
      <vxe-column field="deptName" title="所属部门" min-width="240" />
      <vxe-column field="typeDesc" title="加入方式" width="100" />
      <vxe-column field="joinTime" title="指派/报名时间" width="180" />
      <vxe-column field="studyTimeStr" title="获取学时" width="100" />
      <vxe-column field="statusDesc" title="状态" width="120" />
      <vxe-column
        field="signInTime"
        title="签到时间"
        :formatter="({ cellValue }) => cellValue || '--'"
        width="180"
      />
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

<script setup lang="ts" name="offlineCourseCount">
    import { StudyApi, memberApi, studyApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { ElMessage } from 'element-plus';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const tabStatusList = ref([
    { status: undefined, code: 'allCount', statusName: '全部', count: '' },
    { status: '1', code: 'unStartCount', statusName: '已指派未签到', count: '' },
    { status: '2', code: 'doingCount', statusName: '已指派已签到', count: '' },
    { status: '3', code: 'finishedCount', statusName: '已报名未签到', count: '' },
    { status: '4', code: 'finishedCount', statusName: '已报名已签到', count: '' },
    // { status: '逾期未完成', code: 'finishedClearCount', statusName: '完成清货', count: '' },
    // { status: '逾期完成', code: 'unKnownCount', statusName: '未知', count: '' },
  ]);
  const route = useRoute();
  const deptId = ref([]);
  const cascaderProps = {
    expandTrigger: 'hover' as const,
    label: 'deptName',
    value: 'deptId',
    multiple: false,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node, resolve) {
      const { value } = node;
      querySubDeptList(value).then((res) => {
        resolve(res);
      });
    },
  };
  const querySubDeptList = async (parentId) => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId });
    return res.deptInfoList;
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
    runQuery,
    refreshList,
  } = useList<
    StudyApi.LuteosStudyQueryCourseCalculateOffLine.RequestQuery,
    StudyApi.LuteosStudyQueryCourseCalculateOffLine.ResponseBody
  >({
    searchDefaults: {
      memberCode: '',
      courseCode: route.query.courseCode as string,
      type: undefined,
      keyword: undefined,
      creator: undefined,
      status: undefined,
    },
    pageSize: 10,
    service: studyApi.luteosStudyQueryCourseCalculateOffLine,
  });
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
  const handleActions = (item) => {
    const { key, row } = item;
    switch (key) {
      case 'ding':
        ding(row.memberCode);
        break;
      default:
        break;
    }
  };
  const ding = async (memberCode = '') => {
    const res = await studyApi.luteosStudyStudyCourseDingNotice({
      courseCode: route.query.courseCode as string,
      memberCode,
    });
    ElMessage.success('操作成功');
  };
</script>

<style scoped lang="scss">
  .page-title {
    border-top: 1px solid #eee;
    background: #fff;
    padding: 16px;
    opacity: 1;
    font-size: 15px;
    font-weight: bold;
    margin-left: -20px;
    margin-right: -20px;
    margin-top: -20px;
    z-index: 104;
    position: relative;
    display: flex;
    justify-content: space-between;
    .member-count {
      font-weight: normal;
      font-size: 14px;
    }
  }
  .course-list {
    // background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    color: rgb(96, 98, 102);
    .course-item {
      margin-bottom: 20px;
      border-bottom: 1px dashed #e5e5e5;
      padding-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      .course-title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 8px;
      }
      .course-desc {
        display: flex;
        column-gap: 80px;
        .desc {
          flex: 1;
          display: flex;
          row-gap: 4px;
          column-gap: 30px;
          flex-wrap: wrap;
        }
      }
      .operation {
        display: flex;
        align-items: center;
        gap: 10px;
        > * {
          margin: 0;
        }
        :deep(.el-dropdown) {
          outline: none;
          border-color: red;
        }
      }
    }
  }
</style>
