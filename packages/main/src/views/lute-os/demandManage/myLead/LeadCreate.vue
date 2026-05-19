<template>
  <KeenCard title="用户需求提案提交">
    <el-steps :active="0" finish-status="success" class="lead-process-steps">
      <el-step v-for="step in PROCESS_STEPS" :key="step.code" :title="step.name" />
    </el-steps>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="lead-create-form">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="需求名称" prop="demandName">
            <el-input v-model="form.demandName" placeholder="请输入需求名称" maxlength="50" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需求类型" prop="demandType">
            <el-select v-model="form.demandType" placeholder="请选择" style="width: 100%">
              <el-option v-for="opt in DEMAND_TYPE_OPTIONS" :key="opt.value" :label="opt.label" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务线" prop="bizLine">
            <DeptCascaderTwoLevel v-model="form.bizLine" placeholder="可选一级或二级部门" :check-strictly="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急程度" prop="urgency">
            <el-select v-model="form.urgency" placeholder="请选择" style="width: 100%">
              <el-option v-for="opt in URGENCY_OPTIONS" :key="opt.value" :label="opt.label" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预期交付时间" prop="expectDeliveryTime">
            <el-date-picker v-model="form.expectDeliveryTime" type="date" placeholder="请选择" value-format="YYYY-MM-DD" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="影响人数" prop="impactPeopleRange">
            <el-select v-model="form.impactPeopleRange" placeholder="请选择" style="width: 100%">
              <el-option v-for="opt in IMPACT_OPTIONS" :key="opt.value" :label="opt.label" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="需求背景" prop="demandBackground">
            <el-input v-model="form.demandBackground" type="textarea" :rows="4" placeholder="你碰到了什么问题？" maxlength="500" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="需求内容" prop="demandContent">
            <el-input v-model="form.demandContent" type="textarea" :rows="4" placeholder="希望变成什么样？" maxlength="500" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="价值评估" prop="demandValue">
            <el-input v-model="form.demandValue" type="textarea" :rows="4" placeholder="描述合规/提效/降本/人天等价值" maxlength="500" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件">
            <div class="upload-wrap">
              <KeenFileUpload
                v-model="uploadFiles"
                directory="demand_lead"
                :limit="10"
                :multiple="true"
                :size-limit="50 * 1024 * 1024"
                :show-file-list="true"
              >
                <el-button>点击上传</el-button>
              </KeenFileUpload>
              <div class="upload-tip">支持 pdf / doc / xls / ppt / 图片等，单文件 ≤ 50MB，最多 10 个</div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="form-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提交提案</el-button>
      </div>
    </el-form>
  </KeenCard>
</template>

<script lang="ts" setup name="demandLeadCreate">
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance } from 'element-plus';
  import { storeToRefs } from 'pinia';
  import KeenCard from '@/components/KeenCard/index.vue';
  import KeenFileUpload from '@/components/KeenFileUpload/index.vue';
  import DeptCascaderTwoLevel from '@/views/lute-os/components/DeptCascaderTwoLevel/index.vue';
  import { useStore } from '@/store/modules/useStore';
  import { leadValueApi, type LeadSubmitReq } from '@/api/leadValueApi';

  const router = useRouter();
  const formRef = ref<FormInstance>();
  const submitLoading = ref(false);
  const userStore = useStore();
  const { userInfo } = storeToRefs(userStore);

  const PROCESS_STEPS = [
    { code: 'submit', name: '用户需求提案' },
    { code: 'review', name: '价值评估' },
    { code: 'bp_review', name: '数字化BP承接' },
    { code: 'pm_solution', name: '需求方案' },
    { code: 'dev', name: '开发中' },
    { code: 'biz_accept', name: '业务验收' },
    { code: 'delivered', name: '已交付' },
    { code: 'value_review', name: '价值复盘' },
  ];

  const DEMAND_TYPE_OPTIONS = [
    { label: '系统建设', value: 'new_system' },
    { label: '功能增强', value: 'feature_enhance' },
    { label: '数据建设', value: 'data_build' },
    { label: '流程改善', value: 'flow_optimize' },
    { label: '问题修复', value: 'bug_fix' },
    { label: 'AI建设', value: 'ai_build' },
  ];
  const URGENCY_OPTIONS = [
    { label: '高', value: 'high' },
    { label: '中', value: 'medium' },
    { label: '低', value: 'low' },
  ];
  const IMPACT_OPTIONS = [
    { label: '1-5 人', value: '1_5' },
    { label: '5-50 人', value: '5_50' },
    { label: '50-500 人', value: '50_500' },
    { label: '500 人以上', value: '500_plus' },
  ];

  const form = reactive<LeadSubmitReq>({
    demandName: '',
    demandType: '',
    bizLine: '',
    urgency: '',
    expectDeliveryTime: '',
    impactPeopleRange: '',
    demandBackground: '',
    demandContent: '',
    demandValue: '',
    attachments: [],
  });

  const uploadFiles = ref<Array<{ name: string; ossKey?: string }>>([]);

  const rules = {
    demandName: [{ required: true, message: '请输入需求名称', trigger: 'blur' }],
    demandType: [{ required: true, message: '请选择需求类型', trigger: 'change' }],
    bizLine: [{ required: true, message: '请选择业务线', trigger: 'change' }],
    urgency: [{ required: true, message: '请选择紧急程度', trigger: 'change' }],
    expectDeliveryTime: [{ required: true, message: '请选择预期交付时间', trigger: 'change' }],
    impactPeopleRange: [{ required: true, message: '请选择影响人数范围', trigger: 'change' }],
    demandBackground: [{ required: true, message: '请填写需求背景', trigger: 'blur' }],
    demandContent: [{ required: true, message: '请填写需求内容', trigger: 'blur' }],
    demandValue: [{ required: true, message: '请填写价值评估', trigger: 'blur' }],
  };

  function resetForm() {
    Object.assign(form, {
      demandName: '',
      demandType: '',
      bizLine: '',
      urgency: '',
      expectDeliveryTime: '',
      impactPeopleRange: '',
      demandBackground: '',
      demandContent: '',
      demandValue: '',
      attachments: [],
    });
    uploadFiles.value = [];
  }

  onMounted(() => {
    const info = (userInfo.value || {}) as Record<string, any>;
    const { rootDeptId, deptInfo } = info;
    const fallback = deptInfo?.secondDeptId ?? deptInfo?.deptId;
    const target = rootDeptId ?? fallback;
    if (target !== undefined && target !== null && target !== '') {
      form.bizLine = String(target);
    }
  });

  function handleCancel() {
    router.push({ name: 'myDemandLeadList' });
  }

  async function handleSubmit() {
    if (!formRef.value) return;
    await formRef.value.validate(async (valid) => {
      if (!valid) return;
      const pending = uploadFiles.value.filter((f) => !f.ossKey);
      if (pending.length) {
        ElMessage.warning('附件还在上传中，请稍候再提交');
        return;
      }
      submitLoading.value = true;
      try {
        form.attachments = uploadFiles.value
          .filter((f) => !!f.ossKey)
          .map((f) => ({ ossKey: f.ossKey as string, name: f.name }));
        await leadValueApi.submitLead(form);
        ElMessage.success('提案提交成功');
        resetForm();
        router.push({ name: 'myDemandLeadList', query: { _t: String(Date.now()) } });
      } catch (err: unknown) {
        ElMessage.error((err as { message?: string })?.message || '提交失败');
      } finally {
        submitLoading.value = false;
      }
    });
  }
</script>

<style scoped lang="scss">
  .lead-process-steps {
    margin-bottom: 24px;
    padding: 16px 8px;
    overflow-x: auto;
  }

  .lead-create-form {
    padding: 0 16px;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 0;
    border-top: 1px solid #edf0f5;
    margin-top: 8px;
  }

  .upload-wrap {
    width: 100%;
  }

  .upload-tip {
    font-size: 12px;
    color: #8a94a6;
    margin-top: 4px;
  }
</style>
