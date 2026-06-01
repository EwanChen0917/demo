<template>
  <el-dialog
    title="更新物流跟踪号"
    v-model="visible"
    @close="visible = false"
    width="600"
    class="editNoticeModal"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="167px" label-position="left">
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="物流跟踪号：" prop="saleCodeTrackNum">
            <el-input
              maxlength="255"
              show-word-limit
              v-model="form.saleCodeTrackNum"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" :loading="loading">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog title="更新物流跟踪号订单" ref="resultDialogRef" />
</template>

<script setup lang="ts">
  // import useList from '@/hooks/list/useList';
  import { omsApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';

  const visible = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    saleCodeTrackNum: '',
  });

  const rules = reactive({
    saleCodeTrackNum: [
      {
        required: true,
        message: '请输入',
        trigger: ['change', 'blur'],
      },
    ],
  });

  const orderInfo: any = ref();
  const open = async (param) => {
    form.value.saleCodeTrackNum = param.saleCodeTrackNum;
    setTimeout(() => {
      formRef.value?.clearValidate();
    }, 0);
    orderInfo.value = param;
    visible.value = true;
    // await queryShopList(item.shopName);
  };
  const close = () => {
    visible.value = false;
    // resetData();
  };
  // 确定按钮状态
  const resultDialogRef = ref();
  const loading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => false);
    if (!isValid) return;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 5000);
    const res = await omsApi.omsWarehouseOrderUpdateTrackingNum({
      trackingNum: form.value.saleCodeTrackNum,
      code: orderInfo.value?.code,
    });
    console.log(res);
    if (res?.failList?.length) {
      // resultDialogRef.value?.open(res?.failList, '更新物流跟踪号流失败订单');
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('更新物流跟踪号成功');
    }
    loading.value = false;
    close();
  };
  const emits = defineEmits<{
    (success: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped>
  :global(.keen-ui .editNoticeModal .el-dialog__body) {
    height: 340px;
  }
</style>
