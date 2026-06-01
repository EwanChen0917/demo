<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="left">
    <el-dialog v-model="visible" title="推送谷仓" width="1350px">
      <el-form-item label="是否贴标">
        <el-radio-group v-model="form.guChangeLabel">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="换标要求" v-if="form.guChangeLabel">
        <el-radio-group v-model="form.guChangeLabelReplacementOption">
          <el-radio :label="1">外箱</el-radio>
          <el-radio :label="2">内箱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-table :data="form.itemInfoList">
        <el-table-column prop="productName" min-width="240px" label="产品名称" />
        <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
        <template v-if="form.guChangeLabel">
          <el-table-column label="FNSKU" min-width="200px">
            <template #default="{ row, $index }">
              <el-form-item
                label-width="0"
                :prop="`itemInfoList[${$index}].fnSKU`"
                :rules="rules.fnSKU"
              >
                <el-input v-model="row.fnSKU" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="换标数量" min-width="140px">
            <template #default="{ row, $index }">
              <el-form-item
                label-width="0"
                :prop="`itemInfoList[${$index}].labelNum`"
                :rules="rules.labelNum"
              >
                <NumberInput v-model="row.labelNum" :precision="0" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="内件货物总数量"
            min-width="140px"
            v-if="form.guChangeLabelReplacementOption === 2"
          >
            <template #default="{ row, $index }">
              <el-form-item
                label-width="0"
                :prop="`itemInfoList[${$index}].labelReplacementQty`"
                :rules="rules.labelReplacementQty"
              >
                <NumberInput v-model="row.labelReplacementQty" :precision="0" />
              </el-form-item>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="suggestPrice" min-width="200px" label="建议售价" />
        <el-table-column prop="postalPrice" min-width="150" label="报价" />
        <el-table-column prop="price" label="销售单价" />
        <el-table-column prop="deliveryDesc" label="发货方式" width="180px" />
        <el-table-column prop="warehouseDesc" width="220px" label="发货仓库" />
        <el-table-column prop="supplySku" label="供应链SKU" width="220px" />
        <el-table-column prop="num" label="数量" width="100px" />
        <el-table-column label="单位">
          <template #default="{ row }">
            <span>{{ row?.unitDesc || '件' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shippingDesc" min-width="100px" width="220px" label="配送方式" />
      </el-table>
      <!--      </el-form-item>-->
      <template #footer>
        <span>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="save" v-loading="saveLoading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-form>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';

  const emit = defineEmits('success');

  const visible = ref(false);
  const code = ref('');
  const erpCode = ref('');

  const formRef = ref();
  const form = ref({
    guChangeLabel: 1,
    guChangeLabelReplacementOption: 1,
    itemInfoList: [],
  });

  const rules = reactive({
    fnSKU: [
      { required: true, message: '请输入FNSKU', trigger: 'blur' },
      {
        pattern: /^[a-zA-Z0-9]{1,20}$/,
        message: '数字、字母组成,不能超过20个字符',
      },
    ],
    labelNum: [{ required: true, message: '请输入换标数量', trigger: 'blur' }],
    labelReplacementQty: [{ required: true, message: '请输入内件货物总数量', trigger: 'blur' }],
  });

  const open = (orderCode) => {
    code.value = orderCode;
    getDetailData(orderCode);
    visible.value = true;
  };

  const getDetailData = async (orderCode) => {
    const res = await erpApi.luteosErpWarehouseOrderQueryDetail({
      code: orderCode,
    });
    erpCode.value = res.orderDetailResp.baseInfo.erpCode;
    form.value.itemInfoList = res.orderDetailResp.itemInfoList?.map((item) => {
      return {
        ...item,
        fnSKU: item?.upcCode || '',
      };
    });
  };

  const close = () => {
    formRef.value.clearValidate();
    visible.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    saveLoading.value = true;
    const res = await erpApi.luteosErpWarehouseOrderPushGc({
      pushDetailList: [
        {
          code: code.value,
          erpCode: erpCode.value,
          guChangeLabel: form.value.guChangeLabel,
          guChangeLabelReplacementOption: form.value.guChangeLabelReplacementOption,
          itemInfoList: form.value.itemInfoList?.map((item) => {
            return {
              fnSku: item.fnSKU,
              id: item.id,
              labelNum: item.labelNum,
              labelReplacementQty: item.labelReplacementQty,
            };
          }),
        },
      ],
    });
    if (res?.failList.length > 0) {
      const content = res.failList
        .map((fail) => {
          return `订单号：${fail.orderCode}，失败原因：${fail.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('推送成功');
    }
    saveLoading.value = false;
    emit('success');
    close();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__row .cell) {
    padding-bottom: 1.75rem;
  }
  :deep(.el-table__row .cell > .el-form-item) {
    margin-bottom: 0;
  }
</style>
