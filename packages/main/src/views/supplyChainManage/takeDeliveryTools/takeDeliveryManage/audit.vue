<template>
  <KeenCard title="提货信息" position="start">
    <template #operation>
      <div class="d-flex gap-10 ms-20">
        <span>提货时间 {{ detailInfo?.baseInfo?.pickTime }}</span>
        <span>提货方式 {{ detailInfo?.baseInfo?.pickTypeDesc }}</span>
      </div>
    </template>
    <ItemInfo :data="detailInfo?.itemList || []" />
  </KeenCard>
  <KeenCard title="审核信息">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="150" label-position="left">
      <el-form-item label="审核结果" prop="status">
        <el-radio-group v-model="form.status" class="ml-4">
          <el-radio :label="0">审核通过</el-radio>
          <el-radio :label="1">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" />
      </el-form-item>
    </el-form>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <!--    <el-button @click="cancel">取消</el-button>-->
    <el-button type="primary" @click="audit" v-loading="loading">确定</el-button>
  </div>
</template>

<script setup lang="ts" name="takeDeliveryManageAudit">
  import ItemInfo from '@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/component/itemInfo.vue';
  import { PlanBillLadingAuthReq, PlanBillLadingDetailQueryResp } from '@/api/erp/data-contracts';
  import { erpApi } from '@/api';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const code = route.query.code as string;

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<PlanBillLadingAuthReq>({
    code,
    remark: '',
    status: undefined,
  });

  const rules = reactive<FormRules>({
    remark: [
      {
        required: true,
        message: '请输入备注',
        trigger: ['blur', 'change'],
      },
    ],
    status: [
      {
        required: true,
        message: '请选择审核结果',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const detailInfo = ref<PlanBillLadingDetailQueryResp>({});
  const getDetailInfo = async () => {
    detailInfo.value = await erpApi.luteosErpPlanBillLadingQueryDetail({
      code,
    });
  };
  getDetailInfo();

  const loading = ref<boolean>(false);
  const audit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        loading.value = true;
        await erpApi.luteosErpPlanBillLadingAuth(form);
        ElMessage.success('审核成功');
        closeTabAndRefresh(`takeDeliveryManageDetail?code=${code}`);
        router.push({
          name: 'takeDeliveryManageDetail',
          query: {
            code,
          },
        });
      } finally {
        loading.value = false;
      }
    }
  };

  const cancel = () => {
    window.close();
  };
</script>

<style scoped lang="scss">
  :deep(.el-descriptions__cell) {
    padding-bottom: 0 !important;
  }
</style>
