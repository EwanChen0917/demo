<template>
  <el-dialog title="结业凭证" v-model="visible" @close="visible = false" width="700">
    <div class="content">
      <h3 class="title">尊敬的{{ traineeName }}同学</h3>
      <div class="ml-5">
        在试用期期间，你以积极的态度和出色的学习能力，投入到公司组织的各项培训与学习任务中。
      </div>
      <div class="ml-15">恭喜你顺利完成全部试用期学习任务！！</div>
      <div class="ml-15">
        期待在未来的工作中，能与你继续共同成长。愿你在路特的平台上继续绽放光彩！
      </div>
      <div class="ml-40 mt-30">深圳市路特创新科技有限公司-人力行政中心</div>
      <div class="ml-40 mt-20">{{ formattedDate }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">下载凭证</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { knowledgeApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { download } from '@/utils/download';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const traineeName = ref('');
  const taskCode = ref('');
  const formattedDate = ref('');

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    formattedDate.value = `${year}年${month}月${day}日`;
  };
  getCurrentDate();

  const save = async () => {
    try {
      saveLoading.value = true;
      const res: any = await knowledgeApi.luteosKnowledgeDownloadCredentials({
        taskCode: taskCode.value,
      });
      if (res.url) {
        download(res.url, '结业凭证.pdf');
        ElMessage.success(`下载成功`);
      }
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    visible.value = true;
    traineeName.value = row.traineeName;
    taskCode.value = row.taskCode;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .title {
    margin-bottom: 20px;
    margin-left: -25px;
  }
  .content {
    line-height: 30px;
  }
  .ml-5 {
    margin-left: -5px;
  }
  .ml-15 {
    margin-left: 20px;
  }
  .ml-40 {
    margin-left: 40px;
  }
  .mt-30 {
    margin-top: 30px !important;
  }
  .mt-20 {
    margin-top: 20px !important;
  }
</style>
