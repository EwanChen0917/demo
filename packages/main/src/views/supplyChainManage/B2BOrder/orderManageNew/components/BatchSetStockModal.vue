<template>
  <el-dialog
    class="batchSetStockModal"
    :title="title"
    v-model="visible"
    @close="close"
    width="700px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="发货方式：" prop="deliveryCode">
        <el-select
          placeholder="请选择发货方式"
          v-model="form.deliveryCode"
          filterable
          @change="handleDeliveryCodeChange($event)"
        >
          <el-option
            v-for="item in listData"
            :key="item.deliveryCode"
            :label="item.deliveryName"
            :value="item.deliveryCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发货仓库：" prop="warehouseCode" required>
        <el-select
          style="width: 100%"
          v-model="form.warehouseCode"
          filterable
          :placeholder="!form.deliveryCode && !form.warehouseCode ? '请先选择发货方式' : '请选择'"
          @change="handleWarehouseCodeChange($event)"
        >
          <el-option
            v-for="item in warehouseList"
            :key="item.warehouseCode"
            :label="item.warehouseName"
            :value="item.warehouseCode"
          />
        </el-select>
        <!-- </el-form-item> -->
      </el-form-item>
      <el-form-item label="物流渠道：" prop="shippingCode" required>
        <el-row :gutter="16" style="width: 100%">
          <el-col :span="16">
            <el-select
              v-model="form.shippingCode"
              filterable
              :placeholder="!form.warehouseCode && !form.shippingCode ? '请先选择仓库' : '请选择'"
            >
              <!-- <el-option
                v-for="item in shippingList"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              /> -->
              <el-option-group v-for="item in spList" :label="item?.spName" :key="item?.spCode">
                <el-option
                  v-for="shipping of item.shippingList"
                  :key="item.spCode + ',' + shipping.value"
                  :label="shipping.desc"
                  :value="item.spCode + ',' + shipping.value"
                />
              </el-option-group>
            </el-select>
          </el-col>
          <el-col :span="7">
            <div class="text-warning fontcolor d-flex flex-align timeicon">
              <i class="iconfont icon-shijian" style="font-size: 12px"></i>
              预估时效：
              <!-- {{
                shippingList?.find((v) => v.value === form.shippingCode)?.params?.timeliness
              }} -->
              {{
                spList?.find((v) => v.spCode === form.shippingCode.split(',')[0]) &&
                spList
                  ?.find((v) => v.spCode === form.shippingCode.split(',')[0])
                  .shippingList?.find((v) => v.value === form.shippingCode.split(',')[1])?.params
                  ?.timeliness
              }}
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef" />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { omsApi } from '@/api/index';
  // import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ResultDialog.vue';
  import { parse } from '../../../../../components/PPTist/utils/htmlParser/parser';

  const props = defineProps<{
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save'): void;
  }>();

  const route = useRoute();
  const visible = ref(false);

  const open = (codeList) => {
    orderList.value = codeList;
    queryList(codeList);
    visible.value = true;
    form.value = {
      deliveryCode: '',
      warehouseCode: '',
      shippingCode: '',
    };
    warehouseList.value = [];
    shippingList.value = [];
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
    deliveryCode: '',
    warehouseCode: '',
    shippingCode: '',
    spCode: '', //物流承运商
  });
  const listData = ref([]);
  const rules = reactive<FormRules>({
    deliveryCode: [
      {
        required: true,
        message: '请选择发货方式',
        trigger: ['blur', 'change'],
      },
    ],
    warehouseCode: [
      {
        required: true,
        message: '请选择发货仓库',
        trigger: ['blur', 'change'],
      },
    ],
    shippingCode: [
      {
        required: true,
        message: '请选择物流渠道',
        trigger: ['blur', 'change'],
      },
    ],
  });
  // 选中

  const orderList: any = ref([]);
  const queryList = async (orderCodeList) => {
    // console.log(orderCodeList);
    try {
      orderList.value = orderCodeList;
      const res = await omsApi.omsOrderQueryWarehouseLogistics({
        erpCodeList: orderCodeList,
      });
      // console.log(res);
      const dataArr = [];
      let allArr = [];
      res.forEach((item) => {
        const obj: any = item.paramMap;
        Object.values(obj).forEach((item2) => {
          allArr = allArr.concat(...item2);
        });
      });
      // console.log('allArr', allArr);
      for (let i = 0; i < allArr.length; i += 1) {
        const found = dataArr.find((item: any) => item.deliveryCode === allArr[i]?.deliveryCode);
        if (!found) {
          dataArr.push(allArr[i]);
        }
      }
      // console.log('dataArr', dataArr);
      listData.value = dataArr;
    } finally {
      // listLoading.value = false;
    }
  };
  const warehouseList = ref();
  const spList = ref();
  const shippingList = ref();
  // 发货方式改变
  const handleDeliveryCodeChange = (val: string) => {
    // console.log(val);
    const result = listData.value.find((item) => item.deliveryCode === val);
    warehouseList.value = result ? cloneDeep(result.warehouseList) : [];
    // console.log(result, warehouseList.value);
    // 清空
    form.value.warehouseCode = '';
    form.value.shippingCode = '';
  };
  // 仓库发生改变
  const handleWarehouseCodeChange = async (val: string) => {
    // console.log(val, warehouseList.value);
    const result = warehouseList.value.find((item) => item.warehouseCode === val);
    console.log('result', result);
    // shippingList.value = result ? cloneDeep(result.shippingList) : [];
    // form.value.shippingCode = shippingList.value.length > 0 ? shippingList.value[0].value : '';
    spList.value = result ? cloneDeep(result.spList) : [];
    form.value.shippingCode =
      spList.value[0].shippingList.length > 0
        ? spList.value[0].spCode + ',' + spList.value[0].shippingList[0].value
        : '';
    // form.value.shippingCode = '';
  };
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
        let params = JSON.parse(
          JSON.stringify({
            ...form.value,
            erpCodeList: orderList.value,
          })
        );
        let arr = form.value.shippingCode.split(',');
        if (arr?.length == 2) {
          params.spCode = arr[0];
          params.shippingCode = arr[1];
        }
        // console.log(params);
        // return;
        const res = await omsApi.omsOrderModifyWarehouseLogistics(params);
        if (res?.failList?.length) {
          resultDialogRef.value?.open(res?.failList, '批量设置仓库物流失败订单');
        } else {
          ElMessage.success('批量设置仓库物流成功');
        }
        emit('close');
        visible.value = false;
        form.value = {
          deliveryCode: '',
          warehouseCode: '',
          shippingCode: '',
        };
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
    height: 540px;
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
