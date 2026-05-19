<template>
  <div v-if="detail.traineeName">
    <div class="header-title">
      <div>
        尊敬的【{{
          detail.traineeName
        }}】您好！欢迎加入路特创新，为帮您尽快熟悉公司文化、产品、业务，快速适应岗位，高效实现职场转身，特为您定制试用期应知应会学习清单，
      </div>
      <div>请按照要求完成各项学习任务，如有任何疑问，请联系人力资源部-组织发展组-童厦洁。</div>
    </div>
    <KeenList>
      <template #search>
        <div class="d-flex introduce-wrap">
          <span>【基本信息】</span>
          <span class="introduce">姓名：{{ detail.traineeName || '' }}</span>
          <span class="introduce">部门：{{ detail.deptName }}</span>
          <span class="introduce">岗位：{{ detail.chargeTitle }}</span>
          <span class="introduce">入职日期：{{ detail.startTime }}</span>
          <span class="introduce">转正日期：{{ detail.endTime }}</span>
          <span class="introduce">直接上级：{{ detail.leaderName }}</span>
          <span class="introduce">导师：{{ detail.mentorName }}</span>
        </div>
        <div class="d-flex introduce-wrap">
          <span>【学习目标】</span>
          <span class="introduce">1. 理解公司文化并执行</span>
          <span class="introduce">2. 熟悉各种制度，并遵守执行落实</span>
          <span class="introduce">3. 熟悉岗位工作流程、知识、工具、试用期规范高效上岗</span>
        </div>
      </template>
      <template #buttons>
        <!-- <el-button
          :disabled="isDisabledCompleteBtn"
          type="primary"
          size="small"
          @click="handleComplete"
        >
          结业申请
        </el-button> -->
      </template>
      <el-table ref="tableRef" :data="taskList" row-key="code" class-name="table-row-dashed">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="任务类型" prop="taskTypeDesc" />
        <el-table-column label="课程内容" prop="contentList">
          <template #default="{ row }">
            <div
              v-if="[1, 3, 4].includes(+row.contentType)"
              @click="handleContent(row.contentList[0]?.content)"
              :class="[row.contentList[0]?.content?.startsWith('http') ? 'text-hover-primary' : '']"
            >
              <OverflowTooltip :content="row.contentList[0]?.content" :line="1" />
            </div>
            <div v-else>
              <div v-for="(item, index) in row.contentList" :key="index">
                <div class="text-hover-primary" @click="handleDownloadUrl(item)">
                  <OverflowTooltip :content="item?.fileName" :line="1" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" prop="courseName" />
        <el-table-column label="学习方式" prop="studyMethodDesc" />
        <el-table-column label="核验方式" prop="courseTypeDesc" />
        <el-table-column label="完成凭证" prop="uploadFileList">
          <template #default="{ row }">
            <div
              v-if="row.courseType !== 2"
              @click="handleContent(row.completionCertificate)"
              :class="[row.completionCertificate?.startsWith('http') ? 'text-hover-primary' : '']"
            >
              <OverflowTooltip :content="row.completionCertificate" :line="1" />
            </div>
            <div v-else>
              <div v-for="(item, index) in row.uploadFileList" :key="index">
                <div class="text-hover-primary" @click="handleDownloadUrl(item)">
                  <OverflowTooltip :content="item?.fileName" :line="1" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学习状态" prop="learningStatusDesc" />
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  row,
                  hide: row.courseType !== 2, // 核验方式为考试时展示
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </KeenList>
    <CertificateGenerator class="mt-5" :taskCode="detail.taskCode" v-if="!isDisabledCompleteBtn" /> 
  </div>
  <el-empty description="暂无数据" v-else style="margin-top: 150px" />

  <UploadCredentials ref="uploadCredentialsRef" @success="queryDetail" />
  <GraduationApplyDialog ref="graduationApplyRef" @success="queryDetail" />
</template>

<script setup lang="ts" name="knowledgeManageTraineeTaskList">
    import { download } from '@/utils/download';
  import { openWindow } from '@/utils';
  import { knowledgeApi } from '@/api';
  import UploadCredentials from './Modal/uploadCredentials.vue';
  import GraduationApplyDialog from './Modal/graduationApplyDialog.vue';
  import CertificateGenerator from './components/CertificateGenerator.vue';
  const detail = ref({});
  const taskList = ref([]);
  const queryDetail = async () => {
    const res = await knowledgeApi.luteosKnowledgeQueryTrainerCourseTaskInfo();
    detail.value = res.detailInfo || {};
    taskList.value = res.taskDetailList || [];
  };
  queryDetail();

  const handleContent = (content) => {
    if (content.startsWith('http')) {
      openWindow(content);
    }
  };

  const handleDownloadUrl = (item) => {
    if (item.url) {
      download(item.url, item.fileName);
    }
  };

  const isDisabledCompleteBtn = computed(() => {
    return !taskList.value.every((item) => {
      return +item.learningStatus === 2; // 学习状态为已完成
    });
  });
  // const handleComplete = async () => {
  //   await knowledgeApi.luteosKnowledgeApplyFinish({
  //     taskCode: detail.value?.taskCode,
  //   });
  //   handleGraduationApply();
  // };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editCredentials(row);
    }
  };
  const uploadCredentialsRef = ref();
  const editCredentials = (row) => {
    uploadCredentialsRef.value.open({
      traineeCode: detail.value.traineeCode,
      ...row,
    });
  };

  const graduationApplyRef = ref();
  // const handleGraduationApply = () => {
  //   graduationApplyRef.value.open({
  //     traineeName: detail.value.traineeName,
  //     taskCode: detail.value.taskCode,
  //   });
  // };
</script>

<style scoped lang="scss">
  .header-title {
    margin: 20px 0 20px 20px;
    line-height: 25px;
  }
  .introduce {
    display: inline-block;
    margin-right: 20px;
  }
  .introduce-wrap {
    line-height: 28px;
  }
  .text-hover-primary {
    cursor: pointer;
    color: #3e97ff;
  }
</style>
