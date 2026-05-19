<template>
  <el-dialog
    class="batchSetStockModal1"
    :title="title"
    v-model="visible"
    @close="close"
    width="435px"
    align-center
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="62px" label-position="left">
      <el-form-item label="运营：" prop="">
        <DeptMember v-model="form.operator" placeholder="请选择" deptId="65717209" clearable />
      </el-form-item>
      <el-form-item label="组长：" prop="">
        <DeptMember v-model="form.leader" placeholder="请选择" deptId="65717209" clearable />
      </el-form-item>
      <!-- <el-form-item label="物流渠道：" prop="shippingCode" required>
        <el-row :gutter="16" style="width: 100%">
          <el-col :span="16">
            <el-select
              v-model="form.shippingCode"
              filterable
              :placeholder="!form.warehouseCode && !form.shippingCode ? '请先选择仓库' : '请选择'"
            >
              <el-option
                v-for="item in shippingList"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="7">
            <div class="text-warning fontcolor d-flex flex-align timeicon">
              <i class="iconfont icon-shijian" style="font-size: 12px"></i>
              预估时效：{{
                shippingList?.find((v) => v.value === form.shippingCode)?.params?.timeliness
              }}
            </div>
          </el-col>
        </el-row>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- <ResultDialog ref="resultDialogRef" /> -->
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { productApi } from '@/api/index';
  // import * as swal from '@/utils/swal';
  import { useStore } from '@/store/modules/useStore';
  // import { cloneDeep } from 'lodash-es';
  // import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ResultDialog.vue';

  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const props = defineProps<{
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save'): void;
  }>();

  const visible = ref(false);

  const open = (codeList) => {
    // console.log(userInfo, userInfo?.memberCode);
    // console.log('codeList', codeList);
    orderList.value = codeList;
    visible.value = true;
    form.value = {
      // deliveryCode: '',
      // operator: 'M02192555256437291108',
      operator: userInfo?.memberCode,
      leader: userInfo?.managerUserid,
      idList: codeList,
    };
    formRef.value?.clearValidate();
  };

  const close = () => {
    // remark.value = '';
    form.value = {
      deliveryCode: '',
      warehouseCode: '',
      shippingCode: '',
    };
    visible.value = false;
  };

  defineExpose({
    open,
  });

  // 表单定义
  const formRef = ref<FormInstance>();
  const form: any = ref({
    operator: '',
    leader: '',
    idList: [],
  });
  const rules = reactive<FormRules>({
    deliveryCode: [
      {
        required: true,
        message: '请选择发货方式',
        trigger: ['blur', 'change'],
      },
    ],
  });
  // 选中

  const orderList: any = ref([]);

  const resultDialogRef = ref();
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    // console.log(valid);
    if (valid) {
      try {
        saveLoading.value = true;
        // console.log(orderList.value, {
        //   ...form.value,
        //   erpCodeList: orderList.value,
        // });
        // console.log(form.value);
        // return;
        const res = await productApi.luteosProductRankingListBatchOperation({
          ...form.value,
        });
        if (res?.failList?.length) {
          // resultDialogRef.value?.open(res?.failList, '批量设置仓库物流失败订单');
        } else {
          ElMessage.success('批量编辑成功');
        }
        emit('close');
        visible.value = false;
        // form.value = {
        //   operator: '',
        //   leader: '',
        //   idList: [],
        // };
      } finally {
        saveLoading.value = false;
      }
    }
  };
</script>

<style scoped>
  :global(.keen-ui .batchSetStockModal .el-form-item__content) {
    margin: 0 !important;
    line-height: 32px !important;
  }

  :global(.keen-ui .batchSetStockModal .el-dialog__body) {
    height: 340px;
  }
  .fontcolor {
    font-size: 12px;
    color: #ff9f22 !important;

    i {
      margin-right: 4px;
    }
  }
  .textStyle {
    font-size: 12px !important;
    line-height: 20px;
    width: 100%;
    margin-top: 4px;
  }
  .timeicon {
    height: 20px;
    line-height: 20px;
    margin-top: 6px;
  }
</style>
