<template>
  <el-radio-group v-model="search.type" size="large">
    <el-radio-button label="必修设置" :value="1" />
    <el-radio-button label="选修设置" :value="2" />
  </el-radio-group>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="搜索用户">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters v-if="mode !== 'detail'">
      <DeptMember deptCode="all_dept" v-model="search.operator" placeholder="操作人" />
    </template>
    <template #buttons v-if="mode !== 'detail'">
      <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
      <el-button type="primary" @click="assignMember">
        {{ search.type === 1 ? '必修指派' : '选修指派' }}
      </el-button>
    </template>
    <vxe-table
      ref="chooseFileRef"
      max-height="400px"
      border="inner"
      :data="listData?.courseMembersList"
      v-loading="listLoading"
    >
      <!-- <vxe-column type="checkbox" width="60px" /> -->
      <vxe-column field="memberName" title="指派人" min-width="120px" />
      <vxe-column field="deptName" title="所属部门" min-width="180px" />
      <vxe-column field="updateTime" title="最后操作时间" min-width="180px" />
      <vxe-column field="operatorName" title="最后操作人" min-width="120px" />
      <vxe-column field="statusDesc" title="状态" min-width="100px" />
      <vxe-column field="fileSize" title="操作" width="100" v-if="mode !== 'detail'">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              { label: '取消', key: 'cancel', row: row, hide: row.status === 0 },
              { label: '重新指派', key: 'assign', row: row, hide: row.status === 1 },
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
  <Assgin ref="assginRef" :type="search.type" @success="runQuery" />
</template>

<script setup lang="ts">
    import { StudyApi, studyApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import Assgin from './assgin.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const route = useRoute();
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
    StudyApi.LuteosStudyQueryStudyCourseMembers.RequestQuery,
    StudyApi.LuteosStudyQueryStudyCourseMembers.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      operator: undefined,
      courseCode: route.query.courseCode as string,
      type: 1,
    },
    pageSize: PAGE_SIZE,
    service: studyApi.luteosStudyQueryStudyCourseMembers,
  });
  const assignMember = () => {
    assginRef.value?.open(search.type);
  };
  const assginRef = ref();
  const handleActions = async (item: any) => {
    const { row } = item;
    await studyApi.luteosStudyOperateStudyCourseMembers({
      memberCode: row.memberCode,
      courseCode: route.query.courseCode as string,
      operateType: row.status === 1 ? 1 : 2,
      type: search.type,
    });
    ElMessage.success('操作成功');
    runQuery();
  };
  const hasChange = () => {
    return false;
  };
  defineExpose({ hasChange });
  // import mammoth from 'mammoth';

  // const fileRef = ref();
  // const uploadData = () => {
  //   const file = fileRef.value.files[0];
  //   console.log(file);
  //   if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(file);
  //     reader.onload = function (e) {
  //       const arrayBuffer = e.target.result;
  //       mammoth
  //         .extractRawText({ arrayBuffer })
  //         .then(function (result) {
  //           console.log(result.value);
  //         })
  //         .catch(function (error) {
  //           console.error(error);
  //         });
  //     };
  //   } else if (file.type === 'text/plain') {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const contents = e.target.result;
  //       console.log(contents);
  //     };
  //     reader.readAsText(file);
  //   } else if (['video/mp4', 'video/ogg', 'audio/mpeg', 'video/x-matroska'].includes(file.type)) {
  //     const path = URL.createObjectURL(file);
  //     const video = document.createElement('video');

  //     video.addEventListener('loadedmetadata', function () {
  //       console.log(video);
  //       const { duration } = video;
  //       const minutes = Math.floor(duration / 60);
  //       const seconds = Math.floor(duration % 60);
  //       console.log(`视频时长: ${minutes}分${seconds}秒`);
  //       URL.revokeObjectURL(path);
  //     });
  //     video.addEventListener('error', (e) => {
  //       // 加载失败也需要回收一下
  //       URL.revokeObjectURL(path);
  //     });
  //     video.src = path;
  //     video.load();
  //   }
  // };
</script>

<style scoped lang="scss"></style>
