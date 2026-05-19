<template>
  <el-tabs v-model="status" tab-position="top" @tab-change="resetSearch">
    <el-tab-pane
      v-for="item in statusList"
      :key="item.value"
      :label="item.label"
      :name="item.value"
    >
      <template #label>
        {{ item.label }}
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="课程名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 120px"
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of creatorList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-tree-select
        clearable
        node-key="categoryCode"
        style="width: 300px"
        v-model="search.categoryCode"
        :data="treeData"
        check-strictly
        :render-after-expand="false"
        placeholder="所属分类"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="addCourse" v-permission="'onlineCourseAdd'">
        添加课程
      </el-button>
    </template>
    <div class="course-list" v-loading="listLoading">
      <template v-if="listData?.studyCourseList?.length">
        <div
          class="course-item"
          :class="{ top: search.status === 1 && item.status === 1 && item.sortFlag === 1 }"
          v-for="(item, index) of listData?.studyCourseList"
          :key="index"
        >
          <div class="course-title">{{ item.title }}</div>
          <div class="course-desc">
            <div class="desc">
              <span>{{ item.courseNum }}节课件</span>
              <span>{{ item.studyNum }}人学习</span>
              <span>分类：{{ item.categoryName }}</span>
              <span>创建人：{{ item.creatorName }}</span>
              <span>创建时间：{{ item.createTime }}</span>
              <span v-if="item.status === 1">发布时间：{{ item.publishTime || '--' }}</span>
              <span v-if="item.status === 2">关闭时间：{{ item.closeTime || '--' }}</span>
              <span v-if="item.status !== 2">截止时间：{{ item.endTime || '--' }}</span>
            </div>
            <div class="operation">
              <el-button
                type="primary"
                link
                @click="edit(item)"
                v-if="item.status === 0"
                v-permission="'onlineCourseEdit'"
              >
                编辑
              </el-button>
              <el-button
                type="primary"
                link
                @click="view(item)"
                v-if="item.status !== 0"
                v-permission="'onlineCourseDetail'"
              >
                查看
              </el-button>
              <el-button
                type="primary"
                link
                @click="count(item)"
                v-if="item.status !== 0"
                v-permission="'onlineCourseCount'"
              >
                统计
              </el-button>
              <el-button type="primary" link @click="assign(item)" v-if="item.status !== 2">
                指派
              </el-button>
              <el-button
                type="primary"
                link
                @click="top(item)"
                v-if="item.status === 1 && item.sortFlag === 0"
              >
                置顶
              </el-button>
              <el-button
                type="primary"
                link
                @click="top(item)"
                v-if="item.status === 1 && item.sortFlag === 1"
              >
                取消置顶
              </el-button>
              <el-button type="primary" link v-if="item.status !== 1" @click="publish(item)">
                发布
              </el-button>
              <el-dropdown
                @command="
                  (command) => {
                    handleCommand(command, item);
                  }
                "
              >
                <el-button type="primary" link>
                  更多
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="remove" v-if="item.status !== 1">
                      删除
                    </el-dropdown-item>
                    <el-dropdown-item command="close" v-if="item.status === 1">
                      关闭
                    </el-dropdown-item>
                    <el-dropdown-item command="log">日志</el-dropdown-item>
                    <el-dropdown-item command="copy" v-if="item.status !== 0">
                      复制
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <el-empty description="暂无数据" />
      </template>
    </div>
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

<script setup lang="ts" name="onlineCourse">
    import { StudyApi, fccApi, memberApi, studyApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const statusList = [
    {
      label: '未发布',
      value: 0,
    },
    {
      label: '已发布',
      value: 1,
    },
    {
      label: '已关闭',
      value: 2,
    },
  ];

  const treeData = ref();
  const queryCategoryList = async () => {
    const res = await fccApi.luteosFccCategoryQueryFccCategoryList({ pageNum: 1, pageSize: 1000 });
    const data = res.fileCategoryList;
    deepTree(res.fileCategoryList);
    treeData.value = data;
  };
  const deepTree = (data) => {
    data.forEach((item) => {
      item.children = item.categoryBeanList;
      item.label = item.categoryName;
      item.value = item.categoryCode;
      if (item.categoryBeanList && item.categoryBeanList.length > 0) {
        deepTree(item.categoryBeanList);
      }
    });
  };
  queryCategoryList();
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
    StudyApi.LuteosStudyQueryStudyCourseList.RequestQuery,
    StudyApi.LuteosStudyQueryStudyCourseList.ResponseBody
  >({
    searchDefaults: {
      categoryCode: undefined,
      keyword: undefined,
      creator: undefined,
      status: 0,
      scene: 'online',
    },
    pageSize: 10,
    service: studyApi.luteosStudyQueryStudyCourseList,
  });
  const status = ref(0);
  const resetSearch = () => {
    search.status = status.value;
    search.keyword = undefined;
    search.creator = undefined;
    search.categoryCode = undefined;
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
  const router = useRouter();
  const viewLog = (item: any) => {
    router.push({
      name: 'onlineCourseLog',
      query: {
        courseCode: item.courseCode,
      },
    });
  };
  const addCourse = () => {
    router.push({
      name: 'onlineCourseAdd',
    });
  };
  const assign = (item: any) => {
    router.push({
      name: 'onlineCourseEdit',
      query: {
        courseCode: item.courseCode,
        currentTab: 4,
      },
    });
  };
  const edit = (item: any) => {
    router.push({
      name: 'onlineCourseEdit',
      query: {
        courseCode: item.courseCode,
        currentTab: 1,
      },
    });
  };
  const view = (item: any) => {
    router.push({
      name: 'onlineCourseDetail',
      query: {
        courseCode: item.courseCode,
        currentTab: 1,
      },
    });
  };
  const publish = async (item: any) => {
    const isConfirmed = await swal.confirm('请确认是否要发布该课程？');
    if (!isConfirmed) return;
    handleOperate(1, item.courseCode);
  };
  const close = async (item: any) => {
    const isConfirmed = await swal.confirm('请确认是否要发关闭该课程？');
    if (!isConfirmed) return;
    handleOperate(2, item.courseCode);
  };
  const remove = async (item: any) => {
    const isConfirmed = await swal.confirm('请确认是否要删除该课程？');
    if (!isConfirmed) return;
    handleOperate(3, item.courseCode);
  };
  const count = (item: any) => {
    router.push({
      name: 'onlineCourseCount',
      query: {
        courseCode: item.courseCode,
        status: item.status,
        courseName: encodeURIComponent(item.title),
      },
    });
  };
  const top = async (item: any) => {
    const isConfirmed = await swal.confirm('请确认是否置顶该课程？');
    if (!isConfirmed) return;
    handleOperate(item.sortFlag === 1 ? 6 : 5, item.courseCode);
  };
  const handleCommand = async (command: string, item: any) => {
    switch (command) {
      case 'remove':
        remove(item);
        break;
      case 'log':
        viewLog(item);
        break;
      case 'copy':
        handleOperate(4, item.courseCode);
        break;
      case 'close':
        close(item);
        break;
      default:
        break;
    }
  };
  const handleOperate = async (operateType: number, courseCode: string) => {
    const res = await studyApi.luteosStudyOperateStudyCourse({
      operateType,
      courseCode,
    });
    ElMessage.success('操作成功');
    if (operateType === 4) {
      search.status = 0;
      status.value = 0;
    } else {
      runQuery();
    }
  };
</script>

<style scoped lang="scss">
  .course-list {
    // background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    color: rgb(96, 98, 102);
    .course-item {
      margin-bottom: 10px;
      border-bottom: 1px dashed #e5e5e5;
      padding: 12px;
      border-radius: 8px;
      &.top {
        background-color: #eee;
      }
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
