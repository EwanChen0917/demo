<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="140px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item label="星级评估" prop="starRating">
        <el-rate v-model="form.starRating" allow-half />
        <span class="reset-txt" v-if="form.starRating" @click="form.starRating = ''">重置</span>
      </el-form-item>

      <el-form-item label="评估反馈" prop="feedBack">
        <el-input type="textarea" :rows="3" v-model="form.feedBack" maxlength="2000" />
      </el-form-item>
    </el-form>
    <div class="info-tip-wrap" v-if="form.finishReason">
      <div class="info-label">完结原因</div>
      <div class="info-tip">{{ form.finishReason }}</div>
    </div>
    <div class="info-tip-wrap" v-if="form.remark">
      <div class="info-label">备注</div>
      <div class="info-tip">{{ form.remark }}</div>
    </div>
    <div class="form-save">
      <el-button type="primary" @click="save">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { metaApi, MetaApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    projectDetail: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'refresh', reload?: boolean): void;
  }>();
  const router = useRouter();
  const route = useRoute();

  const formRef = ref();
  const form: any = reactive<MetaApi.LuteosMetaOperateMetaProject.RequestBody>({
    starRating: '',
    feedBack: '',
  });

  onMounted(async () => {});

  const saveLoading = ref(false);
  const save = () => {
    formRef.value.validate((isvalid) => {
      if (isvalid) {
        saveLoading.value = true;
        metaApi
          .luteosMetaOperateMetaProject({
            starRating: form.starRating,
            feedBack: form.feedBack,
            operateType: 3,
            projectCode: route.query.projectCode,
          })
          .then((res) => {
            ElMessage.success('提交成功');
            emit('refresh', true);
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };
  const reasonDesc = {
    0: '异常原因',
    1: '正常原因',
  };
  watch(
    () => props.projectDetail,
    (val) => {
      if (val) {
        form.starRating = val.starRating || '';
        form.feedBack = val.feedBack || '';
        form.finishReason = reasonDesc[val.finishReason] || '';
        form.remark = val.remark || '';
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }
  .form-flex {
    display: flex;
  }
  .form-border {
    width: 100%;
    padding: 20px;
    border: 1px dashed #ddd;
    margin-bottom: 20px;
  }
  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
  .reset-txt {
    height: 30px;
    font-size: 12px;
    color: #3e97ff;
    margin-top: -8px;
    margin-left: 5px;
    cursor: pointer;
  }
  .form-save {
    text-align: center;
    margin-top: 40px;
  }
  .info-tip-wrap {
    padding-left: 10px;
    display: flex;
    margin-bottom: 10px;
    margin-top: 40px;
  }
  .info-label {
    min-width: 130px;
  }
</style>
