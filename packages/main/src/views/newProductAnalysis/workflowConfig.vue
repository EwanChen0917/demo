<template>
  <KeenCard title="工作流参数配置">
    <el-form :model="form" ref="formRef" label-width="180px">
      <el-form-item
        v-for="item in variables"
        :key="item.variable"
        :label="item.label"
        :prop="item.variable"
        :rules="[
          {
            required: item?.required,
            message: '请输入',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input
          :type="item?.type === 'paragraph' ? 'textarea' : 'text'"
          v-model="form[item.variable]"
          :maxlength="item?.maxLength"
          show-word-limit
          clearable
        />
      </el-form-item>
    </el-form>
    <div class="d-flex justify-content-center footer fixed">
      <el-button @click="run(0)" :loading="loading">保存</el-button>
      <el-button type="primary" @click="run(1)" :loading="loading">启动工作流</el-button>
    </div>
  </KeenCard>
</template>

<script setup lang="ts" name="workflowConfig">
  import { newProductApi } from '@/api';
  import { useTabs } from '@/hooks/tabs';
  import { ElMessage } from 'element-plus';

  const { refreshTab, closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const form = ref({});
  const formRef = ref();

  const variables = ref([]);
  const queryVariables = async (workflowCode) => {
    if (!workflowCode) return;
    const res = await newProductApi.luteosAiNpoWorkflowVariables({
      workflowCode,
    });
    variables.value = res.variables || [];
  };

  queryVariables(route.query?.workflowCode);

  const queryConfig = async () => {
    if (!route.query?.instanceCode) return;
    const res = await newProductApi.luteosAiNpoProjectDetail({
      instanceCode: route.query?.instanceCode as string,
    });
    for (const key in res.inputVariables) {
      form.value[key] = res.inputVariables[key];
    }
    queryVariables(res?.workflowCode);
  };
  queryConfig();

  const loading = ref(false);
  const run = async (mode) => {
    if (mode) {
      // 运行前校验
      const isValid = await formRef.value?.validate().catch(() => {
        return false; // 校验失败返回 false，不继续执行
      });
      if (!isValid) return;
    }
    try {
      loading.value = true;
      const res = await newProductApi.luteosAiNpoWorkflowRun({
        workflowCode: route.query?.workflowCode as string,
        instanceCode: route.query?.instanceCode as string,
        mode,
        inputs: form.value,
      });
      if (mode) {
        setTimeout(() => {
          loading.value = false;
          closeTabAndRefresh('newProductAnalysis');
          router.push({
            path: '/newProductAnalysis/detail',
            query: {
              instanceCode: res.instanceCode,
            },
          });
        }, 1000);
      } else {
        loading.value = false;
        ElMessage.success('保存成功');
        refreshTab('newProductAnalysis');
      }
      /* closeTabAndRefresh('newProductAnalysis');
      router.push({ name: 'newProductAnalysis' }); */
    } catch (e) {
      loading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .fixed {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 2000;
  }
  .footer {
    padding: 12px 0;
    background: #fff;
    box-shadow: 0px -3px 16px 0px rgba(0, 0, 0, 0.04);
    font-size: 13px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    align-items: center;
    height: 56px;

    :deep(.el-button) {
      span {
        font-size: 13px !important;
      }
    }
  }
</style>
