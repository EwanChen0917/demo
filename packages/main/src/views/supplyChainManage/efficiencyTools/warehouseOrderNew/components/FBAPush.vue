<template>
  <KeenCard>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="left"
      :disabled="mode === 'detail'"
    >
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
    </el-form>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save" v-loading="saveLoading">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { erpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  const router = useRouter();

  const props = defineProps<{
    code: string;
    mode?: string;
  }>();

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

  const getDetailData = async () => {
    const res = await omsApi.omsWarehouseOrderQueryDetail({
      code: props.code,
    });
    erpCode.value = res.orderDetailResp?.baseInfo?.erpCode;
    form.value.itemInfoList = res.orderDetailResp?.itemInfoList?.map((item) => {
      return {
        ...item,
        fnSKU: item?.upcCode || '',
      };
    });
  };

  getDetailData();

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await omsApi.omsWarehouseOrderPushGcFba({
        pushDetailList: [
          {
            code: props.code,
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
    } finally {
      saveLoading.value = false;
    }
  };

  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/warehouseOrderNew');
  };
</script>

<style scoped lang="scss"></style>
