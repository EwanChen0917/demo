<template>
  <div class="page-title">{{ decodeURIComponent(route.query.courseName as string) }}</div>
  <el-tabs v-model="search.status" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.memberCourseProgress[item.code] }})</span>
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
      <el-cascader
        :show-all-levels="false"
        v-model="deptId"
        :props="cascaderProps"
        clearable
        placeholder="请选择所属部门"
        separator=" / "
        @change="
          () => {
            search.deptId = deptId && deptId[deptId.length - 1];
          }
        "
      />
      <el-select style="width: 120px" v-model="search.type" placeholder="全部类型" clearable>
        <el-option label="必修" value="1" />
        <el-option label="选修" value="2" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">搜索</el-button>
      <ExportBtn :ignore-app-code="true"
        :plain="false"
        :service="studyApi.luteosStudyExportCourseCalculateInfo"
        :params="search"
      >
        导出统计
      </ExportBtn>
      <el-button class="button" type="primary" @click="ding('')" v-if="route.query.status !== '2'">
        DING未完成学员
      </el-button>
    </template>
    <vxe-table border="inner" :data="listData?.courseCalculateList" v-loading="listLoading">
      <vxe-column field="memberName" title="姓名" min-width="100" />
      <vxe-column field="deptName" title="所在部门" min-width="220" />
      <vxe-column field="typeDesc" title="类型" width="100" />
      <vxe-column field="learningStatusDesc" title="状态" width="120" />
      <vxe-column
        field="finishedTime"
        title="完成时间"
        :formatter="({ cellValue }) => cellValue || '--'"
        width="180"
      />
      <vxe-column field="endTime" title="截止时间" width="180" />
      <vxe-column field="initiator" title="操作" width="80" v-if="route.query.status !== '2'">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              { label: 'DING', key: 'ding', row: row, hide: ![0, 1].includes(+row.learningStatus) },
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
</template>

<script setup lang="ts" name="onlineCourseCount">
    import { StudyApi, memberApi, studyApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { ElMessage } from 'element-plus';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const tabStatusList = ref([
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: '0', code: 'unStartCount', statusName: '未开始', count: '' },
    { status: '1', code: 'doingCount', statusName: '学习中', count: '' },
    { status: '2', code: 'finishedCount', statusName: '已完成', count: '' },
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
    StudyApi.LuteosStudyQueryCourseCalculateInfo.RequestQuery,
    StudyApi.LuteosStudyQueryCourseCalculateInfo.ResponseBody
  >({
    searchDefaults: {
      deptId: '',
      memberCode: '',
      courseCode: route.query.courseCode as string,
      type: undefined,
      categoryCode: undefined,
      keyword: undefined,
      creator: undefined,
      status: '',
    },
    pageSize: 10,
    service: studyApi.luteosStudyQueryCourseCalculateInfo,
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
