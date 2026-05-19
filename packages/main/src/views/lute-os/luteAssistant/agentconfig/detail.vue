<template>
  <el-form
    ref="formRef"
    :rules="rules"
    require-asterisk-position="right"
    :model="data"
    label-position="left"
    label-width="120px"
    scroll-to-error
    v-loading="loading"
  >
    <KeenFlex>
      <FromItem :form="data" />
      <div class="d-flex flex-row justify-content-end">
        <el-button @click="handleCancel" text>取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
      </div>
    </KeenFlex>
  </el-form>
</template>

<script lang="ts" setup name="LuteAssistantAgentConfigDetail">
  import { useRequest } from 'vue-request';
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

  import * as swal from '@/utils/swal';
  import { aiApi } from '@/api/index';
  import FromItem from './components/FromItem.vue';

  const router = useRouter();
  const route = useRoute();
  const code = route.query.agentCode as string;

  const formRef = ref<FormInstance>();

  const rules = reactive<FormRules>({
    agentName: [
      {
        required: true,
        message: '请填写智能体岗位',
      },
      {
        max: 15,
        message: '智能体名称长度不能超过15',
      },
    ],
    nickname: [
      {
        required: true,
        message: '请填写智能体名称',
      },
      {
        max: 15,
        message: '智能体名称长度不能超过15',
      },
    ],
    description: [
      {
        required: true,
        message: '请填写智能体简介',
      },
    ],
    cover: [
      {
        required: true,
        message: '请上传智能体封面图像',
      },
    ],
    logo: [
      {
        required: true,
        message: '请上传智能体封面logo',
      },
    ],
    difyUrl: [
      {
        required: true,
        message: '请填写智能体链接',
      },
      {
        type: 'url',
        message: '请填写正确的链接',
      },
    ],
    difyApiKey: [
      {
        required: true,
        message: '请填写智能体API密钥',
      },
    ],
    department: [
      {
        required: true,
        message: '请选择智能体部门',
      },
    ],
    members: [
      {
        required: true,
        message: '请选择智能体成员',
      },
    ],
  });

  const { loading, data } = useRequest(aiApi.luteosAiAgentAdminDetail, {
    defaultParams: [{ agentCode: code }],
    onSuccess: (res) => {
      if (res.scope === 'all') {
        res.members = ['-1'];
      }
      if (!res.skills) {
        res.skills = [{}];
      }
      if (!res.suggestedQuestions) {
        res.suggestedQuestions = [''];
      }
      data.value = res;
    },
  });

  // 返回
  const goBack = () => {
    router.push({ name: 'LuteAssistantAgentConfig' });
  };

  // 提交
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    const valid = await formRef.value?.validate();
    if (!valid) return;
    try {
      saveLoading.value = true;
      if (data.value?.scope === 'all') {
        data.value.members = [];
      }
      if (data.value?.agentCode) {
        await aiApi.luteosAiAgentAdminUpdate(data.value!);
      } else {
        // await aiApi.luteosAiAgentAdminSave(data.value!);
      }
      ElMessage.success('保存成功');
      goBack();
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    goBack();
  };
</script>
