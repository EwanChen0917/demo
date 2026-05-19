<template>
  <el-dialog
    title="发货通知"
    v-model="visible"
    @close="visible = false"
    width="600"
    class="editNoticeModal"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="167px" label-position="left">
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="BillOfLadingNumber：" prop="billOfLadingNumber">
            <el-input
              maxlength="255"
              show-word-limit
              v-model="form.billOfLadingNumber"
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
  <ResultDialog title="发货通知失败订单" ref="resultDialogRef" />
</template>

<script setup lang="ts">
  // import useList from '@/hooks/list/useList';
  import { erpApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';

  const visible = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    billOfLadingNumber: '',
  });

  const rules = reactive({
    billOfLadingNumber: [
      {
        required: true,
        message: '请输入',
        trigger: ['change', 'blur'],
      },
    ],
  });

  const orderCodeList: any = ref([]);
  const open = async (codeListParam) => {
    form.value.billOfLadingNumber = '';
    setTimeout(() => {
      formRef.value?.clearValidate();
    }, 0);
    // console.log(codeListParam);
    orderCodeList.value = codeListParam;
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
    const res = await erpApi.luteosErpOrderBatchSendNotice({
      billOfLadingNumber: form.value.billOfLadingNumber,
      orderCodeList: orderCodeList.value,
    });
    console.log(res);
    if (res?.failList?.length) {
      resultDialogRef.value?.open(res?.failList, '批量下单到物流');
      // const content = res.failList
      //   .map((item) => {
      //     return `订单号：${item.orderCode}，失败原因：${item.message}`;
      //   })
      //   ?.join('\n');
      // ElMessage.error(content);
    } else {
      ElMessage.success('发货通知操作成功');
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
